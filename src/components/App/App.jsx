import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import "../../index.css";

import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
import Projects from "../Projects/Projects";
import About from "../About/About";
import ContactForm from "../ContactForm/ContactForm";
import Footer from "../Footer/Footer";
// 1. Импортируем твой новый файл админки
import Admin from "../Admin/Admin";

export default function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <About />
                <Services />
                <Projects />
                <ContactForm />
              </main>
            }
          />

          {/* 2. Заменяем AdminPlaceholder на реальный компонент Admin */}
          <Route path="/admin-volstroy" element={<Admin />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
