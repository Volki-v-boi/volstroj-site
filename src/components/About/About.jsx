import styles from "./About.module.css";

// Компетенции без привязки к конкретным людям и их количеству —
// специалисты, с которыми сотрудничаем, ведут деятельность самостоятельно,
// поэтому не подаём их как штат компании.
const skills = [
  "Glazura i gres",
  "Gładzie i malowanie",
  "Elektryka",
  "Instalacje wod-kan",
  "Zabudowy G-K",
  "Montaż podłóg",
];

// Цифры доверия. ЗАМЕНИ значения на реальные перед публикацией —
// это должна быть правда, иначе теряется весь смысл (и это легко проверить).
const trustStats = [
  { value: "5+", label: "lat na rynku" },       // TODO: впиши реальное число лет
  { value: "40+", label: "zrealizowanych projektów" }, // TODO: реальное число
  { value: "24", label: "miesiące gwarancji" },
  { value: "OC", label: "Ubezpieczona działalność" },
];

// TODO: import mainPhoto from "../../assets/team-photo.jpg" когда будет готово
const mainPhoto = null;

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.mainInfo}>
          {mainPhoto && (
            <div className={styles.imageSide}>
              <img
                src={mainPhoto}
                alt="Realizacja remontu wnętrza w Szczecinie przez Volstroj"
                className={styles.mainImg}
              />
            </div>
          )}
          <div className={styles.textSide}>
            <h2 className={styles.title}>O nas</h2>
            <p className={styles.highlight}>
              Sprawdzeni fachowcy, którym możesz zaufać.
            </p>
            <p className={styles.description}>
              Współpracujemy ze sprawdzonymi fachowcami z wieloletnim
              doświadczeniem, dla których wykończenia wnętrz to rzemiosło,
              nie tylko praca. Pracujemy czysto, terminowo i zgodnie ze
              sztuką budowlaną — a każdą realizację objęte jest ubezpieczenie
              OC działalności, więc jesteś zabezpieczony na każdym etapie
              remontu.
            </p>
          </div>
        </div>

        {/* Цифры доверия — заменяют упоминание конкретного числа людей */}
        <div className={styles.statsRow}>
          {trustStats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Компетенции команды — без персональных карточек */}
        <div className={styles.skillsSection}>
          <h3 className={styles.skillsTitle}>Co robimy</h3>
          <div className={styles.skillsTags}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
