import { useState, useEffect } from "react";
import styles from "./Reviews.module.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: "", text: "", rating: 5 });

  // 1. Загружаем одобренные отзывы из базы

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Błąd pobierania opinii:", err);
      }
    };
    fetchApprovedReviews();
  }, []);

  // 2. Функция отправки нового отзыва
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Dziękujemy! Twoja opinia została wysłana do moderacji.");
        setFormData({ name: "", text: "", rating: 5 });
      }
    } catch (error) {
      console.log(error.message);
      alert("Błąd wysyłania opinii.");
    }
  };

  return (
    <section id="reviews" className={styles.reviews}>
      <h2>Opinie naszych klientów</h2>

      {/* Список отзывов из базы */}
      <div className={styles.grid}>
        {reviews.length === 0 && <p>Brak opinii. Bądź pierwszy!</p>}
        {reviews.map((rev) => (
          <div key={rev._id} className={styles.card}>
            <div className={styles.stars}>{"★".repeat(rev.rating)}</div>
            <p>"{rev.text}"</p>
            <h4>{rev.name}</h4>
          </div>
        ))}
      </div>

      {/* ФОРМА ДОБАВЛЕНИЯ (которой не было) */}
      <div className={styles.addReview}>
        <h3>Zostaw swoją opinię</h3>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <input
            type="text"
            placeholder="Twoje Imię"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <select
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: Number(e.target.value) })
            }
          >
            <option value="5">5 Gwiazdek</option>
            <option value="4">4 Gwiazdki</option>
            <option value="3">3 Gwiazdki</option>
            <option value="2">2 Gwiazdki</option>
            <option value="1">1 Gwiazdka</option>
          </select>
          <textarea
            placeholder="Twoja opinia..."
            required
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
          <button type="submit">Wyślij opinię</button>
        </form>
      </div>
    </section>
  );
}
