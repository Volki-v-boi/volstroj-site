import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"; // Современный способ подключения dotenv

import Lead from "./models/Lead.js"; // Важно: в Node.js нужно указывать расширение .js

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Połączono z MongoDB Atlas (ESM)!"))
  .catch((err) => console.error("❌ Błąd połączenia:", err));

// Роут для получения заявок
app.post("/api/leads", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json({ message: "Zgłoszenie wysłane pomyślnie!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd podczas wysyłania zgłoszenia" });
  }
});

app.get("/", (req, res) => res.send("Serwer VOLSTROY ESM działa!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serwer na porcie ${PORT}`));
