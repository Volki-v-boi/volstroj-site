import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
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
import Partner from "../Partner/Partner";
import Reviews from "../Reviews/Reviews";
import ServicePage from "../ServicePage/ServicePage";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className={styles.container}>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Helmet>
                    <link rel="canonical" href="https://www.volstroj.pl/" />
                    <meta property="og:url" content="https://www.volstroj.pl/" />
                  </Helmet>
                  <Hero />
                  <About />
                  <Partner />
                  <Services />
                  <ErrorBoundary>
                    <Projects />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <Reviews />
                  </ErrorBoundary>
                  <ContactForm />
                </main>
              }
            />

            {/* Отдельная страница под каждую услугу — для SEO по конкретным запросам */}
            <Route path="/usluga/:slug" element={<ServicePage />} />

            {/* 2. Заменяем AdminPlaceholder на реальный компонент Admin */}
            <Route path="/admin-volstroy" element={<Admin />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
