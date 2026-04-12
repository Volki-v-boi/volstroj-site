import Navbar from "../Navbar/Navbar";
import styles from "../App/App.module.css";
import "../../src/index.css";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
import Projects from "../Projects/Projects";
import About from "../About/About";
import ContactForm from "../ContactForm/ContactForm";
import Footer from "../Footer/Footer";

export default function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <ContactForm />
      <Footer />
    </div>
  );
}
