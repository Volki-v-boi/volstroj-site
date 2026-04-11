import Navbar from "../Navbar/Navbar";
import styles from "../App/App.module.css";
import "../../src/index.css";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";

export default function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Hero />
      <Services />
    </div>
  );
}
