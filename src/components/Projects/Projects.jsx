import { useState, useEffect } from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./Projects.module.css";

// SEO-фолбэк: этот текст виден в HTML СРАЗУ, до ответа бэкенда.
// Замени описания на реальные, когда занесёшь проекты через админку —
// как только API вернёт непустой массив, seed автоматически заменится.
const seedProjects = [
  {
    _id: "seed-1",
    title: "Remont łazienki pod klucz – Szczecin Pogodno",
    description:
      "Kompleksowy remont łazienki w mieszkaniu w Szczecinie: nowa hydraulika, układanie płytek gresowych, montaż baterii i oświetlenia. Realizacja od stanu deweloperskiego do gotowego wnętrza.",
    images: [],
  },
  {
    _id: "seed-2",
    title: "Wykończenie kuchni – mieszkanie deweloperskie Szczecin",
    description:
      "Wykończenie kuchni w nowym mieszkaniu: gładzie, malowanie, zabudowa G-K, montaż paneli podłogowych i listew przypodłogowych. Praca wykonana zgodnie ze sztuką budowlaną i w ustalonym terminie.",
    images: [],
  },
  {
    _id: "seed-3",
    title: "Remont mieszkania pod klucz – Szczecin Centrum",
    description:
      "Pełen remont mieszkania: przeróbki instalacji elektrycznej i wodno-kanalizacyjnej, gładzie, malowanie, układanie płytek oraz montaż podłóg. Efekt: gotowe do zamieszkania wnętrze bez ukrytych kosztów.",
    images: [],
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(seedProjects);
  const [expandedId, setExpandedId] = useState(null); // Состояние раскрытия

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // API недоступен (например, "холодный старт" бэкенда) —
        // seed остаётся на экране, страница не пустеет.
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.title}>Nasze Realizacje</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project._id} className={styles.card}>
            {project.images && project.images.length > 0 && (
              <Gallery>
                <div className={styles.imageWrapper}>
                  <div
                    className={styles.coverContainer}
                    onClick={() =>
                      document
                        .getElementById(`gallery-item-${project._id}-0`)
                        .click()
                    }
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      Zobacz zdjęcia ({project.images.length})
                    </div>
                  </div>

                  <div style={{ display: "none" }}>
                    {project.images.map((img, index) => (
                      <Item
                        key={index}
                        original={img}
                        thumbnail={img}
                        width="1800"
                        height="1800"
                      >
                        {({ ref, open }) => (
                          <img
                            id={`gallery-item-${project._id}-${index}`}
                            ref={ref}
                            onClick={open}
                            src={img}
                            alt={`${project.title} – zdjęcie ${index + 1}`}
                          />
                        )}
                      </Item>
                    ))}
                  </div>
                </div>
              </Gallery>
            )}

            <div className={styles.content}>
              <h3>{project.title}</h3>
              {/* Текст меняет класс при клике */}
              <p
                className={
                  expandedId === project._id
                    ? styles.expanded
                    : styles.collapsed
                }
              >
                {project.description}
              </p>
              <span
                className={styles.readMore}
                onClick={() => toggleExpand(project._id)}
              >
                {expandedId === project._id ? "Zwiń ▲" : "Czytaj więcej ▼"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
