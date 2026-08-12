import { useState, useEffect } from "react";
import styles from "./Admin.module.css";

// Общая функция загрузки файлов в Cloudinary — используется и при
// создании нового проекта, и при добавлении фото к существующему.
async function uploadFilesToCloudinary(files) {
  const urls = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "volstroj_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dljagiktx/image/upload",
      { method: "POST", body: formData },
    );
    const data = await res.json();
    if (data.secure_url) {
      urls.push(data.secure_url);
    }
  }
  return urls;
}

export default function Admin() {
  // Состояния для авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [allReviews, setAllReviews] = useState([]);

  // Секретный ключ храним в localStorage, чтобы не вводить пароль заново
  // при каждом заходе в админку. Компромисс: любой, кто получит физический
  // доступ к ЭТОМУ браузеру на ЭТОМ устройстве, попадёт в админку без пароля —
  // для панели без данных клиентов/платежей это приемлемо. Разлогиниться
  // можно кнопкой "Wyloguj" — она чистит сохранённое значение.
  const [adminSecret, setAdminSecret] = useState(
    () => localStorage.getItem("volstroj_admin_secret") || "",
  );

  // Состояния для формы добавления нового проекта
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  // Состояния для РЕДАКТИРОВАНИЯ существующего проекта
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImages, setEditImages] = useState([]); // существующие URL фото
  const [editNewFiles, setEditNewFiles] = useState([]); // новые файлы для добавления
  const [editSaving, setEditSaving] = useState(false);

  // Если ключ уже сохранён с прошлого раза — пробуем войти автоматически.
  useEffect(() => {
    if (adminSecret) {
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("volstroj_admin_secret");
    setAdminSecret("");
    setIsAuthenticated(false);
    setPassword("");
  };

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
        if (rememberMe) {
          localStorage.setItem("volstroj_admin_secret", password);
        }
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

  const fetchAllReviews = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/reviews`,
        { headers: { "x-admin-secret": adminSecret } },
      );
      if (res.status === 401) {
        handleLogout();
        return;
      }
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
      const imageUrls = await uploadFilesToCloudinary(files);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": adminSecret,
          },
          body: JSON.stringify({ title, description, images: imageUrls }),
        },
      );
      if (response.ok) {
        alert("Projekt Volstroj dodany!");
        setTitle("");
        setDescription("");
        setFiles([]);
        fetchProjects();
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
        { method: "DELETE", headers: { "x-admin-secret": adminSecret } },
      );
      if (res.ok) fetchProjects();
    }
  };

  // --- Редактирование проекта ---

  const startEditing = (project) => {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditDescription(project.description || "");
    setEditImages([...(project.images || [])]);
    setEditNewFiles([]);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditImages([]);
    setEditNewFiles([]);
  };

  // Убрать конкретное фото из проекта (просто из локального списка —
  // реально удалится из базы только после "Zapisz zmiany")
  const removeEditImage = (index) => {
    setEditImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Сделать это фото обложкой — переносим его в начало массива.
  // Первое фото в массиве = то, что показывается на карточке на сайте.
  const makeCoverImage = (index) => {
    setEditImages((prev) => {
      const copy = [...prev];
      const [chosen] = copy.splice(index, 1);
      return [chosen, ...copy];
    });
  };

  const handleSaveEdit = async () => {
    setEditSaving(true);
    try {
      const newUrls = await uploadFilesToCloudinary(editNewFiles);
      const finalImages = [...editImages, ...newUrls];

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-secret": adminSecret,
          },
          body: JSON.stringify({
            title: editTitle,
            description: editDescription,
            images: finalImages,
          }),
        },
      );

      if (res.ok) {
        cancelEditing();
        fetchProjects();
      } else {
        alert("Nie udało się zapisać zmian (błąd autoryzacji lub serwera)");
      }
    } catch (error) {
      console.error("Błąd edycji:", error);
      alert("Coś poszło nie tak podczas zapisywania...");
    } finally {
      setEditSaving(false);
    }
  };

  const handleApproveReview = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reviews/${id}/approve`,
      { method: "PATCH", headers: { "x-admin-secret": adminSecret } },
    );
    if (res.ok) fetchAllReviews();
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Usunąć tę opinię?")) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reviews/${id}`,
        { method: "DELETE", headers: { "x-admin-secret": adminSecret } },
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
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.9rem",
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Zapamiętaj mnie na tym urządzeniu
          </label>
          <button type="submit">Wejdź</button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </form>
      </div>
    );
  }

  // Если авторизован — показываем админку
  return (
    <div className={styles.adminContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Panel Administratora Volstroj</h1>
        <button onClick={handleLogout} type="button">
          Wyloguj
        </button>
      </div>

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

        {projects.map((project) =>
          editingId === project._id ? (
            // --- Панель редактирования этого проекта ---
            <div key={project._id} className={styles.adminForm} style={{ marginBottom: "20px" }}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Nazwa projektu"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Opis projektu"
              />

              <label>Obecne zdjęcia (pierwsze = okładka na stronie):</label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                {editImages.map((url, index) => (
                  <div
                    key={url + index}
                    style={{
                      position: "relative",
                      border:
                        index === 0 ? "3px solid #e67e22" : "1px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      width: "120px",
                    }}
                  >
                    <img
                      src={url}
                      alt={`Zdjęcie ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "90px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {index === 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          left: 2,
                          background: "#e67e22",
                          color: "#fff",
                          fontSize: "0.65rem",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        OKŁADKA
                      </span>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "4px",
                        background: "#f5f5f5",
                      }}
                    >
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => makeCoverImage(index)}
                          style={{
                            fontSize: "0.65rem",
                            padding: "3px 6px",
                            background: "#2ecc71",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          ★ Okładka
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeEditImage(index)}
                        style={{
                          fontSize: "0.65rem",
                          padding: "3px 6px",
                          background: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginLeft: "auto",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <label>Dodaj nowe zdjęcia (opcjonalnie):</label>
              <input
                type="file"
                multiple
                onChange={(e) => setEditNewFiles(Array.from(e.target.files))}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={editSaving}
                  style={{ flex: 1 }}
                >
                  {editSaving ? "Zapisywanie..." : "Zapisz zmiany"}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  style={{ flex: 1, background: "#95a5a6" }}
                >
                  Anuluj
                </button>
              </div>
            </div>
          ) : (
            // --- Обычная строка проекта в списке ---
            <div key={project._id} className={styles.projectItem}>
              <span>{project.title}</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => startEditing(project)}
                  style={{ background: "#3498db" }}
                >
                  Edytuj
                </button>
                <button type="button" onClick={() => handleDelete(project._id)}>
                  Usuń
                </button>
              </div>
            </div>
          ),
        )}
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
