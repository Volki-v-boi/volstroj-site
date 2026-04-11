import styles from "./Projects.module.css";

const projectsData = [
  {
    id: 1,
    title: "Moderny Apartament",
    description:
      "Kompleksowe wykończenie 60m² w Warszawie. Styl minimalistyczny.",
    image: "https://unsplash.com",
  },
  {
    id: 2,
    title: "Klasyczna Łazienka",
    description: "Układanie spieków kwarcowych i montaż armatury podtynkowej.",
    image: "https://unsplash.com",
  },
  {
    id: 3,
    title: "Salon z Aneksem",
    description: "Montaż sufitów napinanych i oświetlenia szynowego.",
    image: "https://unsplash.com",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.title}>Nasze Realizacje</h2>
      <div className={styles.grid}>
        {projectsData.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
