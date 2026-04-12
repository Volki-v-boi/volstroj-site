import styles from "./About.module.css";

const team = [
  {
    name: "Vasyl",
    specialization: "Specjalista ds. glazury i spieków",
    image: "https://placeholder.com", // Заменишь на реальное фото
  },
  {
    name: "Dmytro",
    specialization: "Mistrz wykończeń i gładzi",
    image: "https://placeholder.com", // Заменишь на реальное фото
  },
  {
    name: "Oleh",
    specialization: "Instalacje elektryczne i wod-kan",
    image: "https://placeholder.com", // Заменишь на реальное фото
  },
];

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Верхняя часть: Твое общее фото и текст */}
        <div className={styles.mainInfo}>
          <div className={styles.imageSide}>
            <img
              src="https://placeholder.com"
              alt="Nasz zespół przy pracy"
              className={styles.mainImg}
            />
          </div>
          <div className={styles.textSide}>
            <h2 className={styles.title}>O nas</h2>
            <p className={styles.highlight}>
              Doświadczona ekipa, której możesz zaufać.
            </p>
            <p className={styles.description}>
              Jesteśmy zespołem fachowców, dla których wykończenia wnętrz to nie
              tylko praca, ale rzemiosło. Pracujemy czysto, terminowo i zgodnie
              ze sztuką budowlaną.
            </p>
          </div>
        </div>

        {/* Нижняя часть: Карточки сотрудников */}
        <div className={styles.teamSection}>
          <h3 className={styles.teamTitle}>Naszy Specjaliści</h3>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <img src={member.image} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
