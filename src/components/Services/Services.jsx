import { Link } from "react-router-dom";
import styles from "./Services.module.css";
import servicesData from "../../data/servicesData";

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <h2 className={styles.title}>Nasze Usługi</h2>
      <div className={styles.grid}>
        {servicesData.map((service) => (
          <Link
            to={`/usluga/${service.slug}`}
            key={service.slug}
            className={styles.card}
          >
            <span className={styles.icon}>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className={styles.readMore}>Czytaj więcej →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
