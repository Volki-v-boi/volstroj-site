import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import servicesData from "../../data/servicesData";
import styles from "./ServicePage.module.css";

export default function ServicePage() {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  // Неизвестный slug -> на главную, а не на пустую/битую страницу
  if (!service) {
    return <Navigate to="/" replace />;
  }

  const canonicalUrl = `https://www.volstroj.pl/usluga/${service.slug}`;

  return (
    <>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: service.title,
            name: service.metaTitle,
            description: service.metaDescription,
            areaServed: { "@type": "City", name: "Szczecin" },
            provider: {
              "@type": "HomeAndConstructionBusiness",
              name: "Volstroj",
              telephone: "+48660018024",
            },
          })}
        </script>
      </Helmet>

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link to="/">Strona główna</Link> <span>/</span>{" "}
          <span>{service.title}</span>
        </nav>

        <h1 className={styles.h1}>{service.h1}</h1>
        <p className={styles.intro}>{service.intro}</p>

        {service.paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        <div className={styles.ctaBox}>
          <p>Chcesz wycenę tej usługi w Szczecinie?</p>
          <Link to="/#contact" className={styles.ctaBtn}>
            Zamów darmową wycenę
          </Link>
        </div>

        <div className={styles.otherServices}>
          <h2>Zobacz też inne usługi</h2>
          <ul>
            {servicesData
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <li key={s.slug}>
                  <Link to={`/usluga/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </article>
    </>
  );
}
