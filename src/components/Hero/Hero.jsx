import styles from "./Hero.module.css";
import heroImg from "../../assets/heroImg.png";

export default function Hero() {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${heroImg})`,
      }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Wykończenia wnętrz pod klucz</h1>
        <p className={styles.description}>
          Profesjonalne remonty i wykończenia mieszkań oraz domów. Twoje idealne
          wnętrze bez stresu и opóźnień z VOLSTROJ.
        </p>
        <div className={styles.benefits}>
          <span>✓ Jakość</span>
          <span>✓ Terminowość</span>
          <span>✓ Gwarancja</span>
        </div>
        <a href="#contact" className={styles.btn}>
          Zamów darmową wycenę
        </a>
      </div>
    </section>
  );
}
