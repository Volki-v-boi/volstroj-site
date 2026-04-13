import styles from "./Partner.module.css";

export default function Partner() {
  return (
    <section className={styles.partner}>
      <div className={styles.container}>
        <div className={styles.textSide}>
          <h2>Projektowanie i Wykonawstwo</h2>
          <div className={styles.line}></div>

          <p className={styles.highlight}>
            Masz już projekt? A może dopiero szukasz architekta?
          </p>

          <p className={styles.description}>
            <strong>Pracujemy z Twoim projektantem:</strong> Jeśli masz już
            gotową dokumentację, gwarantujemy jej precyzyjną realizację.
            Współpracujemy z architektami na każdym etapie, rozwiązując kwestie
            techniczne bezpośrednio z nimi.
          </p>

          <p className={styles.description}>
            <strong>Polecamy naszych partnerów:</strong> Jeśli nie masz jeszcze
            projektu, nawiążemy dla Ciebie kontakt z naszymi sprawdzonymi
            projektantami, którzy przygotują wizję wnętrza dopasowaną do Twojego
            budżetu i stylu.
          </p>

          <ul className={styles.list}>
            <li>✅ Pełna zgodność z dokumentacją techniczną</li>
            <li>✅ Bezpośredni kontakt budowa — architekt</li>
            <li>✅ Pomoc w doborze i zakupie materiałów</li>
          </ul>
        </div>

        <div className={styles.imageSide}>
          {/* Можно заменить это фото на любое другое с чертежами и каской */}
          <img
            src="https://unsplash.com"
            alt="Współpraca z projektantem Volstroj"
          />
        </div>
      </div>
    </section>
  );
}
