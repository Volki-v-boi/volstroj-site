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
app.post("/api/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Błąd dodawania projektu" });
  }
});
// Удаление проекта
app.delete("/api/projects/:id", async (req, res) => {
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
app.get("/api/admin/reviews", async (req, res) => {
  try {
    const allReviews = await Review.find().sort({ createdAt: -1 });
    res.json(allReviews);
  } catch (error) {
    res.status(500).json({ error: "Błąd pobierania wszystkich opinii" });
  }
});

// 2. Одобрить отзыв (изменить статус с pending на approved)
app.patch("/api/reviews/:id/approve", async (req, res) => {
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
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Opinia usunięta" });
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas usuwania opinii" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serwer na porcie ${PORT}`));
