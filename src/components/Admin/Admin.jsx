import { useState } from "react";
import styles from "./Admin.module.css";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = [];

      // 1. Отправка фото в Cloudinary
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        // ВСТАВЬ СВОЙ ПРЕСЕТ (например: 'ml_default')
        formData.append("upload_preset", "volstroj_preset");

        // ВСТАВЬ СВОЙ CLOUD NAME в ссылку
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dljagiktx/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await res.json();
        if (data.secure_url) {
          imageUrls.push(data.secure_url);
        }
      }

      // 2. Сохранение проекта в MongoDB через твой сервер
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          images: imageUrls,
        }),
      });

      if (response.ok) {
        alert("Projekt Volstroj dodany!");
        setTitle("");
        setDescription("");
        setFiles([]);
      }
    } catch (error) {
      console.error("Błąd:", error);
      alert("Coś poszło nie tak...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Panel Administratora Volstroj</h1>
      <form onSubmit={handleSubmit} className={styles.adminForm}>
        <input
          type="text"
          placeholder="Nazwa projektu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Opis projektu"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Wybierz zdjęcia (możesz kilka naraz):</label>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Wysyłanie..." : "Dodaj realizację"}
        </button>
      </form>
    </div>
  );
}
