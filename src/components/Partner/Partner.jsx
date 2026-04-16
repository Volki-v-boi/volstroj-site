import styles from "./Partner.module.css";
// Импорт фото (или пути к ним)
import designer1 from "../../assets/logo.png";
// import designer2 from "../../assets/designer2.jpg";

export default function Partner() {
  // Список твоих партнеров (потом можно будет вынести в базу данных)
  const partners = [
    {
      id: 1,
      name: "Anna Nowak",
      studio: "Design Flow",
      img: designer1,
      phone: "+48 111 222 333",
      ig: "https://instagram.com",
      email: "anna@design.pl",
    },
    // {
    //   id: 2,
    //   name: "Marek Wiśniewski",
    //   studio: "Modern Arch",
    //   img: designer1,
    //   phone: "+48 444 555 666",
    //   ig: "https://instagram.com",
    //   email: "marek@arch.pl",
    // },
    // {
    //   id: 3,
    //   name: "Marek Wiśniewski",
    //   studio: "Modern Arch",
    //   img: designer1,
    //   phone: "+48 444 555 666",
    //   ig: "https://instagram.com",
    //   email: "marek@arch.pl",
    // },
    // Сюда просто добавляешь новых, и они сами появятся на сайте
  ];

  return (
    <section className={styles.partner}>
      <div className={styles.container}>
        <div className={styles.textSide}>
          <h2>Projektowanie i Wykonawstwo</h2>
          <div className={styles.line}></div>

          <p className={styles.highlight}>
            Twoja wizja, nasza precyzyjna realizacja.
          </p>

          <p className={styles.description}>
            Współpraca z profesjonalnymi architektami pozwala nam tworzyć
            wnętrza, które są nie tylko piękne, ale i funkcjonalne. Gwarantujemy
            pełną zgodność z dokumentacją techniczną oraz wsparcie przy doborze
            odpowiednich materiałów budowlanych i dekoracyjnych.
          </p>

          <p className={styles.description}>
            Niezależnie od tego, czy masz już gotowy projekt, czy dopiero
            szukasz inspiracji – jesteśmy tu, aby pomóc. Poznaj architektów, z
            którymi współpracujemy na co dzień i którym ufamy w kwestii jakości
            i stylu.
          </p>

          <ul className={styles.list}>
            <li>✅ Realizacja projektów "pod klucz"</li>
            <li>✅ Wsparcie merytoryczne na każdym etapie</li>
            <li>✅ Terminowość i dbałość o detale architektoniczne</li>
          </ul>
        </div>

        <div className={styles.imageSide}>
          {partners.map((p) => (
            <div key={p.id} className={styles.cardWrapper}>
              <img src={p.img} alt={p.name} className={styles.mainImage} />

              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <h3>{p.name}</h3>
                  <p>{p.studio}</p>
                  <div className={styles.contacts}>
                    <a href={`tel:${p.phone}`} className={styles.contactBtn}>
                      📞 {p.phone}
                    </a>
                    <a
                      href={p.ig}
                      target="_blank"
                      className={styles.contactBtn}
                    >
                      📸 Instagram
                    </a>
                    <a href={`mailto:${p.email}`} className={styles.contactBtn}>
                      ✉️ Email
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.imageLabel}>
                <span>
                  {p.name} — {p.studio}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
