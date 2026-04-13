import styles from "./Services.module.css";

const servicesData = [
  {
    title: "Wykończenia pod klucz",
    description:
      "Kompleksowa realizacja wnętrz od stanu deweloperskiego do zamieszkania.",
    icon: "🏠",
  },
  {
    title: "Układanie płytek",
    description:
      "Profesjonalne układanie glazury, terakoty oraz gresu w łazienkach i kuchniach.",
    icon: "🧱",
  },
  {
    title: "Malowanie i gładzie",
    description:
      "Idealnie gładkie ściany i precyzyjne malowanie z dbałością o detale.",
    icon: "🎨",
  },
  {
    title: "Instalacje",
    description:
      "Przeróbki instalacji elektrycznych i wodno-kanalizacyjnych pod projekt.",
    icon: "⚡",
  },
  {
    title: "Zabudowy G-K",
    description:
      "Montaż sufitów podwieszanych, ścianek działowych i nowoczesnych zabudów dekoracyjnych.",
    icon: "🏗️",
  },
  {
    title: "Montaż podłóg",
    description:
      "Układanie paneli, deski barlineckiej oraz montaż listew przypodłogowych.",
    icon: "🪵",
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <h2 className={styles.title}>Nasze Usługi</h2>
      <div className={styles.grid}>
        {servicesData.map((service, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.icon}>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
