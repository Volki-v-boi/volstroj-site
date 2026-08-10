import { useState, useEffect } from "react";
import styles from "./Admin.module.css";

export default function Admin() {
  // Состояния для авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [allReviews, setAllReviews] = useState([]);

  // Секретный ключ держим ТОЛЬКО в памяти этой сессии браузера —
  // он больше не встроен в JS-бандл сайта (раньше был виден всем через
  // "просмотр кода страницы", даже без входа в админку).
  const [adminSecret, setAdminSecret] = useState("");

  // Состояния для формы и данных
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        },
      );
      if (res.ok) {
        setAdminSecret(password);
        setIsAuthenticated(true);
      } else {
        setLoginError("Błędne hasło!");
      }
    } catch {
      setLoginError("Błąd połączenia z serwerem");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Функция загрузки ВСЕХ отзывов (и плохих, и хороших, и новых) —
  // требует ключ, т.к. это админский эндпоинт
  const fetchAllReviews = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/reviews`,
        { headers: { "x-admin-secret": adminSecret } },
      );
      const data = await res.json();
      if (Array.isArray(data)) setAllReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchAllReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": adminSecret,
          },
          body: JSON.stringify({
            title,
            description,
            images: imageUrls,
          }),
        },
      );

      if (response.ok) {
        alert("Projekt Volstroj dodany!");
        setTitle("");
        setDescription("");
        setFiles([]);
        fetchProjects(); // Обновляем список сразу
      } else {
        alert("Nie udało się dodać projektu (błąd autoryzacji lub serwera)");
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          headers: { "x-admin-secret": adminSecret },
        },
      );
      if (res.ok) {
        fetchProjects();
      }
    }
  };

  const handleApproveReview = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reviews/${id}/approve`,
      {
        method: "PATCH",
        headers: { "x-admin-secret": adminSecret },
      },
    );
    if (res.ok) fetchAllReviews(); // Обновляем список
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Usunąć tę opinię?")) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reviews/${id}`,
        {
          method: "DELETE",
          headers: { "x-admin-secret": adminSecret },
        },
      );
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
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
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
        {projects.length === 0 && <p>Brak projektów w bazie.</p>}
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
