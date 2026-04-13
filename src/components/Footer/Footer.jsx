import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            VOL<span>STROY</span>
          </div>
          <p>
            Profesjonalne wykończenia wnętrz pod klucz. Realizujemy Twoje
            marzenia o idealnym domu.
          </p>
        </div>

        <div className={styles.links}>
          <h4>Nawigacja</h4>
          <ul>
            <li>
              <a href="#about">O nas</a>
            </li>
            <li>
              <a href="#services">Usługi</a>
            </li>
            <li>
              <a href="#projects">Projekty</a>
            </li>
            <li>
              <a href="#contact">Kontakt</a>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h4>Kontakt</h4>
          <p>Email: volstroj2026@gmail.com</p>
          <p>Tel: +48 660 018 024</p>
          <p>Lokalizacja: Szczecin i okolice</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {currentYear} VOLSTROJ. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
