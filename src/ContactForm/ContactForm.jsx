import styles from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Darmowa wycena</h2>
          <p>
            Zostaw swoje dane, а my skontaktujemy się z Tobą w ciągu 24 godzin,
            aby omówić Twój projekt.
          </p>
          <div className={styles.phoneLink}>
            <span>Zadzwoń bezpośrednio:</span>
            <a href="tel:+48660018024">+48 660 018 024</a>
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Twoje Imię" required />
          </div>
          <div className={styles.inputGroup}>
            <input type="tel" placeholder="Numer telefonu" required />
          </div>
          <div className={styles.inputGroup}>
            <select required>
              <option value="">Wybierz usługę</option>
              <option value="remont">Wykończenie pod klucz</option>
              <option value="lazienka">Remont łazienki</option>
              <option value="malowanie">Malowanie i gładzie</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <textarea placeholder="Opisz krótko swój projekt"></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Wyślij zapytanie
          </button>
        </form>
      </div>
    </section>
  );
}
