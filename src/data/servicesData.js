// Единый источник данных об услугах.
// Используется и в блоке "Nasze Usługi" на главной, и на отдельных
// страницах /usluga/:slug. Меняешь текст здесь — обновляется везде.
//
// metaTitle / metaDescription / h1 / intro / paragraphs — контент для
// отдельной страницы услуги. Пиши их РАЗНЫМИ по смыслу для каждой услуги
// (не просто переставляй слова) — так у каждой страницы будет шанс
// ранжироваться по своему запросу отдельно.

const servicesData = [
  {
    slug: "wykonczenia-pod-klucz",
    icon: "🏠",
    title: "Wykończenia pod klucz",
    description:
      "Kompleksowa realizacja wnętrz od stanu deweloperskiego do zamieszkania.",
    metaTitle: "Wykończenia mieszkań pod klucz Szczecin - Volstroj",
    metaDescription:
      "Wykończenia wnętrz pod klucz w Szczecinie: od stanu deweloperskiego do gotowego mieszkania. Jedna ekipa, jeden harmonogram, gwarancja jakości.",
    h1: "Wykończenia wnętrz pod klucz w Szczecinie",
    intro:
      "Zajmujemy się kompleksowym wykończeniem mieszkań i domów w Szczecinie — od odbioru mieszkania od dewelopera do wprowadzenia się z gotowymi kluczami w ręku.",
    paragraphs: [
      "Usługa \"pod klucz\" oznacza, że nie musisz szukać osobno elektryka, glazurnika i malarza — koordynujemy wszystkie etapy sami: instalacje, gładzie, płytki, podłogi, montaż drzwi i oświetlenia.",
      "Na starcie wspólnie ustalamy harmonogram i budżet, dzięki czemu wiesz z góry, ile i kiedy zapłacisz — bez niespodzianek w trakcie remontu.",
      "Pracujemy zarówno na mieszkaniach deweloperskich w nowych osiedlach Szczecina, jak i przy generalnych remontach starszych kamienic.",
    ],
  },
  {
    slug: "uklad-plytek",
    icon: "🧱",
    title: "Układanie płytek",
    description:
      "Profesjonalne układanie glazury, terakoty oraz gresu w łazienkach i kuchniach.",
    metaTitle: "Układanie płytek i glazury Szczecin - Volstroj",
    metaDescription:
      "Układanie płytek, glazury i gresu w łazienkach i kuchniach w Szczecinie. Równe fugi, precyzyjne cięcia, hydroizolacja pod płytką.",
    h1: "Układanie płytek w Szczecinie – glazura, terakota, gres",
    intro:
      "Układamy płytki w łazienkach, kuchniach i na tarasach — z dbałością o równe fugi, dokładne cięcia przy narożnikach i prawidłową hydroizolację.",
    paragraphs: [
      "Przed ułożeniem płytek zawsze sprawdzamy i przygotowujemy podłoże: wylewki, gruntowanie, w łazienkach — dodatkowo hydroizolację, żeby zabezpieczyć ściany i podłogę przed wilgocią.",
      "Pracujemy z gresem wielkoformatowym, mozaiką i płytkami imitującymi drewno czy beton — pomagamy też dobrać wzór i sposób układania (na mijankę, jodełkę, w karo).",
      "Realizacje w Szczecinie obejmują zarówno pojedyncze łazienki, jak i całe mieszkania, gdzie płytki układane są na kilku pomieszczeniach jednocześnie.",
    ],
  },
  {
    slug: "malowanie-i-gladzie",
    icon: "🎨",
    title: "Malowanie i gładzie",
    description:
      "Idealnie gładkie ściany i precyzyjne malowanie z dbałością o detale.",
    metaTitle: "Gładzie i malowanie ścian Szczecin - Volstroj",
    metaDescription:
      "Gładzie gipsowe i malowanie ścian w Szczecinie. Idealnie gładka powierzchnia pod malowanie, tapetę lub panele dekoracyjne.",
    h1: "Gładzie i malowanie ścian w Szczecinie",
    intro:
      "Wykonujemy gładzie gipsowe i malowanie ścian tak, by powierzchnia była idealnie równa — bez smug, cieni i widocznych łączeń pod odpowiednim światłem.",
    paragraphs: [
      "Gładź nakładamy w kilku warstwach z szlifowaniem między nimi — to etap, który najbardziej wpływa na to, jak ściana będzie wyglądać po pomalowaniu.",
      "Malujemy farbami lateksowymi i akrylowymi w pełnej palecie kolorów, dobieramy też farby zmywalne do kuchni i łazienek, gdzie ściany są bardziej narażone.",
      "Usługa dostępna jako część większego remontu pod klucz albo samodzielnie — np. odświeżenie salonu czy sypialni bez ruszania innych elementów wnętrza.",
    ],
  },
  {
    slug: "instalacje",
    icon: "⚡",
    title: "Instalacje",
    description:
      "Przeróbki instalacji elektrycznych i wodno-kanalizacyjnych pod projekt.",
    metaTitle: "Instalacje elektryczne i wod-kan Szczecin - Volstroj",
    metaDescription:
      "Przeróbki instalacji elektrycznej i wodno-kanalizacyjnej w Szczecinie: nowe punkty, przeniesienie gniazd, podłączenie sprzętu pod projekt wnętrza.",
    h1: "Instalacje elektryczne i wodno-kanalizacyjne w Szczecinie",
    intro:
      "Przed gładziami i płytkami trzeba dopasować instalacje do nowego układu wnętrza — tym właśnie się zajmujemy, zgodnie z projektem i przepisami budowlanymi.",
    paragraphs: [
      "W zakresie elektryki: nowe punkty świetlne, przeniesienie gniazd, wydzielone obwody pod sprzęt kuchenny czy klimatyzację, montaż rozdzielni.",
      "W zakresie wod-kan: przeniesienie podejść pod umywalkę, wannę czy zlewozmywak, podłączenie pralki i zmywarki w nowym miejscu, wymiana starej instalacji w kamienicach.",
      "Wszystkie przeróbki robimy przed etapem gładzi i płytek, żeby później nie trzeba było kuć już wykończonych powierzchni.",
    ],
  },
  {
    slug: "zabudowy-gk",
    icon: "🏗️",
    title: "Zabudowy G-K",
    description:
      "Montaż sufitów podwieszanych, ścianek działowych i nowoczesnych zabudów dekoracyjnych.",
    metaTitle: "Zabudowy z płyt gipsowo-kartonowych Szczecin - Volstroj",
    metaDescription:
      "Sufity podwieszane, ścianki działowe i zabudowy dekoracyjne z płyt G-K w Szczecinie. Ukryte oświetlenie, wnęki, half-wall.",
    h1: "Zabudowy z płyt gipsowo-kartonowych (G-K) w Szczecinie",
    intro:
      "Płyty G-K pozwalają zmienić układ pomieszczenia bez kucia murów: nowe ścianki działowe, sufity podwieszane z ukrytym oświetleniem, dekoracyjne wnęki i półki.",
    paragraphs: [
      "Sufity podwieszane wykorzystujemy, żeby skryć instalacje (kable, klimatyzację) i wprowadzić oświetlenie LED wpuszczane lub listwy świetlne po obwodzie.",
      "Ścianki działowe z G-K są znacznie lżejsze niż murowane — dobre rozwiązanie przy wydzielaniu garderoby, biura czy dodatkowego pokoju w mieszkaniu.",
      "Robimy też zabudowy dekoracyjne: half-wall przy łóżku, wnęki pod telewizor, obniżenia sufitu podkreślające strefę kuchenną czy jadalnię.",
    ],
  },
  {
    slug: "montaz-podlog",
    icon: "🪵",
    title: "Montaż podłóg",
    description:
      "Układanie paneli, deski barlineckiej oraz montaż listew przypodłogowych.",
    metaTitle: "Montaż podłóg i paneli podłogowych Szczecin - Volstroj",
    metaDescription:
      "Montaż paneli podłogowych, deski barlineckiej i listew przypodłogowych w Szczecinie. Wypoziomowanie podłoża, podkład akustyczny, precyzyjne cięcia.",
    h1: "Montaż podłóg w Szczecinie – panele, deska, listwy",
    intro:
      "Kładziemy panele podłogowe, deskę barlinecką i inne podłogi drewnopodobne — zaczynając od wypoziomowania podłoża, żeby podłoga nie skrzypiała i nie \"chodziła\" pod nogami.",
    paragraphs: [
      "Przed montażem sprawdzamy wilgotność wylewki i dobieramy odpowiedni podkład — akustyczny, jeśli ważne jest wygłuszenie dla sąsiadów z dołu.",
      "Panele i deskę kładziemy z zachowaniem szczelin dylatacyjnych przy ścianach, dopasowujemy wzór do kształtu pomieszczenia (na przykład wzdłuż światła z okna).",
      "Na koniec montujemy listwy przypodłogowe i listwy progowe między pomieszczeniami — to detal, który mocno wpływa na ogólny, wykończony wygląd wnętrza.",
    ],
  },
];

export default servicesData;
