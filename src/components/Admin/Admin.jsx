import { useState, useEffect } from "react";
import styles from "./Admin.module.css";

export default function Admin() {
  // Состояния для авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [allReviews, setAllReviews] = useState([]);

  // Состояния для формы и данных
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  // Твой секретный пароль (измени на свой!)
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Błędne hasło!");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Функция загрузки ВСЕХ отзывов (и плохих, и хороших, и новых)
  const fetchAllReviews = async () => {
    const res = await fetch("http://localhost:5000/api/admin/reviews");
    const data = await res.json();
    setAllReviews(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchAllReviews();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "volstroj_preset");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dljagiktx/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await res.json();
        if (data.secure_url) {
          imageUrls.push(data.secure_url);
        }
      }

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          images: imageUrls,
        }),
      });

      if (response.ok) {
        alert("Projekt Volstroj dodany!");
        setTitle("");
        setDescription("");
        setFiles([]);
        fetchProjects(); // Обновляем список сразу
      }
    } catch (error) {
      console.error("Błąd:", error);
      alert("Coś poszło nie tak...");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten projekt?")) {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProjects();
      }
    }
  };

  const handleApproveReview = async (id) => {
    const res = await fetch(`http://localhost:5000/api/reviews/${id}/approve`, {
      method: "PATCH",
    });
    if (res.ok) fetchAllReviews(); // Обновляем список
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Usunąć tę opinię?")) {
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchAllReviews();
    }
  };

  // ВАЖНО: Если не авторизован — показываем только форму входа
  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <h1>Panel Volstroj - Zaloguj się</h1>
        <form onSubmit={handleLogin} className={styles.adminForm}>
          <input
            type="password"
            placeholder="Wpisz hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Wejdź</button>
        </form>
      </div>
    );
  }

  // Если авторизован — показываем админку
  return (
    <div className={styles.adminContainer}>
      <h1>Panel Administratora Volstroj</h1>
      <form onSubmit={handleSubmit} className={styles.adminForm}>
        <input
          type="text"
          placeholder="Nazwa projektu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Opis projektu"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Wybierz zdjęcia (możesz kilka naraz):</label>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Wysyłanie..." : "Dodaj realizację"}
        </button>
      </form>

      <div className={styles.projectList}>
        <h3>Twoje Realizacje:</h3>
        {projects.length === 0 && <p>Brak projektów в bazie.</p>}
        {projects.map((project) => (
          <div key={project._id} className={styles.projectItem}>
            <span>{project.title}</span>
            <button onClick={() => handleDelete(project._id)}>Usuń</button>
          </div>
        ))}
      </div>

      <div className={styles.adminSection}>
        <h3>Moderacja Opinii</h3>
        <div className={styles.reviewList}>
          {allReviews.map((rev) => (
            <div
              key={rev._id}
              className={`${styles.reviewItem} ${rev.status === "pending" ? styles.pending : ""}`}
            >
              <div>
                <strong>{rev.name}</strong> ({rev.rating} ★)
                <p>{rev.text}</p>
                <small>Status: {rev.status}</small>
              </div>
              <div className={styles.actions}>
                {rev.status === "pending" && (
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleApproveReview(rev._id)}
                  >
                    Zatwierdź
                  </button>
                )}
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteReview(rev._id)}
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
