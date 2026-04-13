import styles from "./Reviews.module.css";

const reviews = [
  {
    name: "Jan K.",
    text: "Ekipa Volstroj to profesjonaliści. Remont przebiegł sprawnie i bez stresu.",
    stars: 5,
  },
  {
    name: "Anna M.",
    text: "Idealnie położone płytki i porządek na budowie. Polecam każdemu!",
    stars: 5,
  },
  {
    name: "Marek W.",
    text: "Fachowe doradztwo i świetny kontakt. Współpraca wzorowa.",
    stars: 5,
  },
];

export default function Reviews() {
  return (
    <section className={styles.reviews}>
      <h2>Co mówią nasi klienci</h2>
      <div className={styles.grid}>
        {reviews.map((rev, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.stars}>{"★".repeat(rev.stars)}</div>
            <p>"{rev.text}"</p>
            <h4>{rev.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
