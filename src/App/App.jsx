import Navbar from "../Navbar/Navbar";
import styles from "../App/App.module.css";
import "../../src/index.css";

export default function App() {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
}
