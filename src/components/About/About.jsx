import styles from "./About.module.css";

// ВАЖНО: как только появятся реальные фото — сохрани их в src/assets/team/
// и импортируй как в Hero.jsx (import photo from "../../assets/team/vasyl.jpg"),
// затем поставь сюда вместо null. Реальные фото людей — это доверие + они
// сами могут попасть в Google Картинки по запросам вроде "ekipa remontowa Szczecin".
const team = [
  {
    name: "Vasyl",
    specialization: "Specjalista ds. glazury i spieków",
    image: null,
  },
  {
    name: "Dmytro",
    specialization: "Mistrz wykończeń i gładzi",
    image: null,
  },
  {
    name: "Oleh",
    specialization: "Instalacje elektryczne i wod-kan",
    image: null,
  },
];

// TODO: import mainPhoto from "../../assets/team-photo.jpg" когда будет готово
const mainPhoto = null;

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Верхняя часть: Твое общее фото и текст */}
        <div className={styles.mainInfo}>
          {/* TODO: замени на import реального фото команды, когда будет готово */}
          {mainPhoto && (
            <div className={styles.imageSide}>
              <img
                src={mainPhoto}
                alt="Zespół Volstroj przy pracy na remoncie w Szczecinie"
                className={styles.mainImg}
              />
            </div>
          )}
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
          <h3 className={styles.teamTitle}>Nasi Specjaliści</h3>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                {member.image && (
                  <img
                    src={member.image}
                    alt={`${member.name} – ${member.specialization}`}
                  />
                )}
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
