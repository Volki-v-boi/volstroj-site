import styles from "./Navbar.module.css";
// import logoImg from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        VOL<span>STROJ</span>
      </div>
      <ul className={styles.menu}>
        <li>
          <a href="#projects">Projekty</a>
        </li>
        <li>
          <a href="#services">Usługi</a>
        </li>
        <li>
          <a href="#about">O nas</a>
        </li>
      </ul>
      <a href="tel:+48660018024" className={styles.phone}>
        +48 660-018-024
      </a>
    </nav>
  );
}
