import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Wykończenia wnętrz pod klucz</h1>
        <p className={styles.description}>
          Profesjonalne remonty i wykończenia mieszkań oraz domów. Twoje idealne
          wnętrze bez stresu и opóźnień z VOLSTROY.
        </p>
        <div className={styles.benefits}>
          <span>✓ Jakość</span>
          <span>✓ Terminowość</span>
          <span>✓ Gwarancja</span>
        </div>
        <button className={styles.btn}>Zamów darmową wycenę</button>
      </div>
    </section>
  );
}
