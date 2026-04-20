import styles from "./Hero.module.css";
import heroImg from "../../assets/heroImg.png";

export default function Hero() {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImg})`, // Чуть темнее для читаемости
      }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        {/* Добавляем город - это КРИТИЧНО для SEO */}
        <h1 className={styles.title}>
          Wykończenia wnętrz i remonty mieszkań w Szczecinie
        </h1>

        <p className={styles.description}>
          Kompleksowe remonty pod klucz. Realizujemy Twoje marzenia o idealnym
          wnętrzu z gwarancją jakości, terminowości i bez ukrytych kosztów.
        </p>

        <div className={styles.benefits}>
          <span>✓ Bezpłatna wycena</span>{" "}
          {/* "Darmowa wycena" - сильный запрос */}
          <span>✓ Terminowość</span>
          <span>✓ Gwarancja 24 m-ce</span>{" "}
          {/* Конкретика (24 месяца) внушает больше доверия */}
        </div>

        <a href="#contact" className={styles.btn}>
          Zamów darmową wycenę
        </a>
      </div>
    </section>
  );
}
