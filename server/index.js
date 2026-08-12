import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import TelegramBot from "node-telegram-bot-api"; // Новый импорт
import Lead from "./models/Lead.js";
import Project from "./models/Project.js";
import Review from "./models/Reviews.js";

const app = express();
app.use(cors());
app.use(express.json());

// Инициализация бота (токен берем из .env)
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Połączono z MongoDB"))
  .catch((err) => console.error("❌ Błąd:", err));

// ВАЖНО: раньше пароль проверялся ТОЛЬКО на фронтенде и был виден всем
// в исходном коде страницы, а сам сервер принимал запросы на изменение
// данных вообще без проверки. Теперь любое админское действие (добавить/
// удалить проект, одобрить/удалить отзыв) требует правильный секретный
// ключ в заголовке запроса — сервер сам его проверяет, а не доверяет фронту.
function requireAdmin(req, res, next) {
  const secret = req.headers["x-admin-secret"];
  if (!process.env.ADMIN_SECRET) {
    console.error("ADMIN_SECRET nie jest ustawiony na serwerze!");
    return res.status(500).json({ error: "Serwer nie skonfigurowany" });
  }
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Brak uprawnień" });
  }
  next();
}

// Логин админки: фронтенд отправляет введённый пароль сюда, сервер сам
// сверяет его с ADMIN_SECRET — сам пароль никогда не попадает в JS-бандл.
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password && password === process.env.ADMIN_SECRET) {
    return res.json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: "Błędne hasło" });
});

app.post("/api/leads", async (req, res) => {
  try {
    // 1. Сохраняем в базу данных
    const newLead = new Lead(req.body);
    await newLead.save();

    // 2. Отправляем сообщение в Telegram
    const message = `
🚀 *Nowe zlecenie!*
👤 *Klient:* ${req.body.name}
📞 *Tel:* ${req.body.phone}
📧 *Email:* ${req.body.email || "Nie podano"}
🛠️ *Usługa:* ${req.body.service}
📝 *Opis:* ${req.body.message || "Brak"}
    `;

    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, {
      parse_mode: "Markdown",
    });

    res.status(201).json({ message: "Zgłoszenie wysłane!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Получить все проекты
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Свежие сверху
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas pobierania projektów" });
  }
});
// Добавь это в server/index.js, если еще не сделал
app.post("/api/projects", requireAdmin, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Błąd dodawania projektu" });
  }
});
// Редактирование существующего проекта (название, описание, список фото —
// включая порядок: первое фото в массиве = обложка на сайте)
app.patch("/api/projects/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
      },
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas edycji projektu" });
  }
});
// Удаление проекта
app.delete("/api/projects/:id", requireAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Projekt usunięty!" });
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas usuwania" });
  }
});
app.post("/api/reviews", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: "Opinia wysłana do moderacji!" });
  } catch (error) {
    res.status(500).json({ error: "Błąd wysyłania opinii" });
  }
});

// 2. Получить только одобренные отзывы (для сайта)
app.get("/api/reviews", async (req, res) => {
  try {
    const approvedReviews = await Review.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    res.json(approvedReviews);
  } catch (error) {
    res.status(500).json({ error: "Błąd pobierania opinii" });
  }
});
app.get("/api/admin/reviews", requireAdmin, async (req, res) => {
  try {
    const allReviews = await Review.find().sort({ createdAt: -1 });
    res.json(allReviews);
  } catch (error) {
    res.status(500).json({ error: "Błąd pobierania wszystkich opinii" });
  }
});

// 2. Одобрить отзыв (изменить статус с pending на approved)
app.patch("/api/reviews/:id/approve", requireAdmin, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas zatwierdzania opinii" });
  }
});

// 3. Удалить отзыв (если это спам)
app.delete("/api/reviews/:id", requireAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Opinia usunięta" });
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas usuwania opinii" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serwer na porcie ${PORT}`));
