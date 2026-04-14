import { useState } from "react"; // Добавляем хук
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  // Создаем один объект для всех полей формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  // Функция для обновления полей
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Функция отправки данных на сервер
  const handleSubmit = async (e) => {
    e.preventDefault(); // Чтобы страница не перезагружалась

    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dziękujemy! Zgłoszenie zostało wysłane.");
        setFormData({ name: "", phone: "", service: "", message: "" }); // Очистка формы
      } else {
        alert("Błąd serwera. Spróbuj ponownie później.");
      }
    } catch (error) {
      console.error("Błąd:", error);
      alert("Nie udało się połączyć z serwerem.");
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Darmowa wycena</h2>
          <p>Zostaw swoje dane, a my skontaktujemy się z Tobą.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Twoje Imię"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Numer telefonu"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Twój adres e-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz usługę</option>
              <option value="Remont pod klucz">Wykończenie pod klucz</option>
              <option value="Lazienka">Remont łazienki</option>
              <option value="Malowanie">Malowanie i gładzie</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <textarea
              name="message"
              placeholder="Opisz krótko swój projekt"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Wyślij zapytanie
          </button>
        </form>
      </div>
    </section>
  );
}
