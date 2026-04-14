import { useState, useEffect } from "react";
import "photoswipe/dist/photoswipe.css"; // Важно для стилей галереи
import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./Projects.module.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.title}>Nasze Realizacje</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project._id} className={styles.card}>
            {/* Обертка для галереи конкретного проекта */}
            <Gallery>
              <div className={styles.imageWrapper}>
                {/* Чистая обложка, которая слушается только твоего CSS */}
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

                {/* Полностью скрытая галерея для Photoswipe */}
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
                          style={{ cursor: "pointer", objectFit: "contain" }}
                        />
                      )}
                    </Item>
                  ))}
                </div>
              </div>
            </Gallery>

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
