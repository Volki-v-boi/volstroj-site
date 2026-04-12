import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import TelegramBot from "node-telegram-bot-api"; // Новый импорт
import Lead from "./models/Lead.js";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serwer na porcie ${PORT}`));
