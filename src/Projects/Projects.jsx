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
                {/* Первый Item — это наша обложка, которую видно всегда */}
                <Item
                  original={project.images[0]}
                  thumbnail={project.images[0]}
                  width="1600"
                  height="1066"
                >
                  {({ ref, open }) => (
                    <div
                      onClick={open}
                      ref={ref}
                      className={styles.coverContainer}
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
                  )}
                </Item>

                {/* Остальные фото проекта (скрыты, но доступны в галерее после клика на обложку) */}
                <div style={{ display: "none" }}>
                  {project.images.slice(1).map((img, index) => (
                    <Item
                      key={index}
                      original={img}
                      thumbnail={img}
                      width="1600"
                      height="1066"
                    >
                      {({ ref, open }) => (
                        <img ref={ref} onClick={open} src={img} />
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
