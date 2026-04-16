import { useState, useEffect } from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./Projects.module.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Состояние раскрытия

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
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
                          alt="projekt volstroj"
                        />
                      )}
                    </Item>
                  ))}
                </div>
              </div>
            </Gallery>

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
