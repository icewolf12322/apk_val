export type LangCode = 'fr' | 'en' | 'de' | 'nl' | 'es' | 'it' | 'duck'

export interface MenuItem {
  nameFr: string
  names: Record<LangCode, string>
  descriptions: Record<LangCode, string>
  price: string
  emoji: string
}

export interface MenuSection {
  titleFr: string
  titles: Record<LangCode, string>
  items: MenuItem[]
}

const duck = (s: string) => `Coin ${s.split(' ').map(() => 'coin').join(' ')} ! 🦆`

export const LANGUAGES: { code: LangCode; flag: string; name: string }[] = [
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'duck', flag: '🦆', name: 'Canard' },
]

export const SUGGESTIONS: MenuItem[] = [
  {
    nameFr: "Soupe de légumes forestiers",
    names: {
      fr: "Soupe de légumes forestiers",
      en: "Forest vegetable soup",
      de: "Waldgemüsesuppe",
      nl: "Bosgroente soep",
      es: "Sopa de verduras del bosque",
      it: "Zuppa di verdure del bosco",
      duck: "Coin coin soupe 🦆",
    },
    descriptions: {
      fr: "Bouillon de saison aux champignons sauvages et herbes fraîches des Ardennes, servi avec pain de campagne",
      en: "Seasonal broth with wild mushrooms and fresh Ardennes herbs, served with country bread",
      de: "Saisonale Brühe mit Wildpilzen und frischen Kräutern aus den Ardennen, serviert mit Landbrot",
      nl: "Seizoensgebonden bouillon met wilde paddenstoelen en verse Ardense kruiden, geserveerd met boerenbrood",
      es: "Caldo de temporada con setas silvestres y hierbas frescas de las Ardenas, servido con pan de campo",
      it: "Brodo stagionale con funghi selvatici ed erbe fresche delle Ardenne, servito con pane rustico",
      duck: "Coin coin coin coin coin coin coin coin 🦆 coin coin coin coin coin coin coin",
    },
    price: "9.50",
    emoji: "🍲",
  },
  {
    nameFr: "Filet de truite de l'Our en papillote",
    names: {
      fr: "Filet de truite de l'Our en papillote",
      en: "Our River trout fillet en papillote",
      de: "Forellenfilet der Our in der Folie",
      nl: "Forelfilet van de Our en papillote",
      es: "Filete de trucha del Our al papillote",
      it: "Filetto di trota dell'Our al cartoccio",
      duck: "Coin coin truite 🦆 coin coin coin",
    },
    descriptions: {
      fr: "Truite fraîche pêchée localement, cuite en papillote avec beurre d'herbes, câpres et citron. Accompagnée de pommes de terre vapeur",
      en: "Freshly caught local trout, cooked en papillote with herb butter, capers and lemon. Served with steamed potatoes",
      de: "Frisch gefangene lokale Forelle, in Folie mit Kräuterbutter, Kapern und Zitrone gegart. Mit Dampfkartoffeln serviert",
      nl: "Vers gevangen lokale forel, bereid in papillote met kruidenboter, kappertjes en citroen. Geserveerd met gestoomde aardappelen",
      es: "Trucha fresca capturada localmente, cocinada en papillote con mantequilla de hierbas, alcaparras y limón. Acompañada de patatas al vapor",
      it: "Trota fresca pescata localmente, cotta al cartoccio con burro alle erbe, capperi e limone. Servita con patate al vapore",
      duck: "🦆 COIN COIN COIN ! coin coin coin coin coin coin coin coin coin coin coin coin",
    },
    price: "19.50",
    emoji: "🐟",
  },
  {
    nameFr: "Médaillon de chevreuil sauce poivrade",
    names: {
      fr: "Médaillon de chevreuil sauce poivrade",
      en: "Venison medallion with pepper sauce",
      de: "Rehmedaillon mit Pfeffersauce",
      nl: "Reemedaillon met peperaardensaus",
      es: "Medallón de corzo con salsa de pimienta",
      it: "Medaglione di capriolo in salsa al pepe",
      duck: "Coin coin chevreuil 🦆 coin coin sauce coin",
    },
    descriptions: {
      fr: "Chevreuil chassé dans nos forêts ardennaises, accompagné de croquettes maison et d'une compotée de myrtilles sauvages",
      en: "Deer hunted in our Ardennes forests, served with homemade croquettes and wild blueberry compote",
      de: "In unseren Ardenner Wäldern gejagtes Reh, mit hausgemachten Kroketten und Wildblaubeerkompott",
      nl: "Ree gejaagd in onze Ardense bossen, geserveerd met huisgemaakte kroketten en wilde bosbessencompote",
      es: "Corzo cazado en nuestros bosques de las Ardenas, acompañado de croquetas caseras y compota de arándanos silvestres",
      it: "Capriolo cacciato nei nostri boschi delle Ardenne, con crocchette fatte in casa e composta di mirtilli selvatici",
      duck: "coin coin coin coin coin 🦆 coin coin coin coin coin coin coin coin coin coin",
    },
    price: "26.00",
    emoji: "🦌",
  },
  {
    nameFr: "Tarte aux myrtilles des Fagnes",
    names: {
      fr: "Tarte aux myrtilles des Fagnes",
      en: "Hautes Fagnes blueberry tart",
      de: "Heidelbeertarte aus den Hohen Venn",
      nl: "Bosbessen taart van de Hoge Venen",
      es: "Tarta de arándanos de las Fagnes",
      it: "Crostata ai mirtilli delle Fagnes",
      duck: "coin coin TARTE coin 🦆 coin coin myrtilles coin",
    },
    descriptions: {
      fr: "Tarte maison aux myrtilles cueillies dans les Hautes Fagnes, servie tiède avec de la crème chantilly maison.",
      en: "Homemade tart with blueberries picked from the Hautes Fagnes, served warm with homemade whipped cream",
      de: "Hausgemachte Torte mit in den Hohen Venn gepflückten Heidelbeeren, warm serviert mit hausgemachter Schlagsahne",
      nl: "Huisgemaakte taart met bosbessen geplukt in de Hoge Venen, warm geserveerd met huisgemaakte slagroom",
      es: "Tarta casera de arándanos recogidos en las Hautes Fagnes, servida tibia con nata montada casera",
      it: "Crostata casalinga con mirtilli raccolti nelle Hautes Fagnes, servita tiepida con panna montata artigianale",
      duck: "🦆🦆🦆 COIN ! coin coin coin coin coin coin tiède coin coin coin",
    },
    price: "8.50",
    emoji: "🫐",
  },
]

export const FULL_MENU: MenuSection[] = [
  {
    titleFr: "Entrées",
    titles: { fr: "Entrées", en: "Starters", de: "Vorspeisen", nl: "Voorgerechten", es: "Entrantes", it: "Antipasti", duck: "Coin coin 🦆" },
    items: [
      {
        nameFr: "Jambon d'Ardenne fumé",
        names: { fr: "Jambon d'Ardenne fumé", en: "Smoked Ardennes ham", de: "Geräucherter Ardenner Schinken", nl: "Gerookte Ardense ham", es: "Jamón ahumado de las Ardenas", it: "Prosciutto affumicato delle Ardenne", duck: "coin coin jambon 🦆" },
        descriptions: {         fr: "Jambon artisanal fumé au bois de hêtre, accompagné de cornichons et de pain grillé maison.", en: "Artisanal beechwood smoked ham with pickles and homemade toast", de: "Handwerklicher buchengeräucherter Schinken mit Gurken und hausgemachten Röstbrot", nl: "Ambachtelijke beukenhout gerookte ham met augurken en huisgemaakt geroosterd brood", es: "Jamón artesanal ahumado con madera de haya, acompañado de pepinillos y pan tostado casero", it: "Prosciutto artigianale affumicato con legno di faggio, accompagnato da cetriolini e pane tostato fatto in casa", duck: "coin coin coin coin coin coin 🦆 coin coin coin" },        price: "12.50",
        emoji: "🥩",
      },
      {
        nameFr: "Velouté de champignons sauvages",
        names: { fr: "Velouté de champignons sauvages", en: "Wild mushroom velouté", de: "Wildpilzvelouté", nl: "Wilde paddenstoelen velouté", es: "Velouté de setas silvestres", it: "Vellutata di funghi selvatici", duck: "coin coin champignons coin 🦆" },
        descriptions: { fr: "Crème onctueuse de cèpes et girolles des Ardennes, huile de truffe et croûtons.", en: "Creamy porcini and chanterelle soup from the Ardennes, truffle oil and croutons", de: "Cremige Steinpilz- und Pfifferlingssuppe aus den Ardennen, Trüffelöl und Croutons", nl: "Romige eekhoorntjesbrood en cantharellen soep uit de Ardenne, truffelolie en croutons", es: "Crema de boletus y rebozuelos de las Ardenas, aceite de trufa y picatostes", it: "Crema vellutata di porcini e finferli delle Ardenne, olio al tartufo e crostini", duck: "coin coin coin coin 🦆🦆 coin coin coin coin" },
        price: "10.00",
        emoji: "🍄",
      },
      {
        nameFr: "Salade de chèvre chaud aux noix",
        names: { fr: "Salade de chèvre chaud aux noix", en: "Warm goat cheese salad with walnuts", de: "Warmer Ziegenkäsesalat mit Walnüssen", nl: "Warme geitenkaas salade met walnoten", es: "Ensalada de queso de cabra caliente con nueces", it: "Insalata di capra calda con noci", duck: "coin chèvre coin coin 🦆" },
        descriptions: { fr: "Fromage de chèvre local gratiné sur toast, mâche des Ardennes, noix et vinaigrette au miel", en: "Local gratin goat cheese on toast, Ardennes lamb's lettuce, walnuts and honey vinaigrette", de: "Lokaler überbackener Ziegenkäse auf Toast, Ardenner Feldsalat, Walnüsse und Honigvinaigrette", nl: "Lokale gegratineerde geitenkaas op toast, Ardense veldsla, walnoten en honingvinaigrette", es: "Queso de cabra local gratinado en tostada, canónigos de las Ardenas, nueces y vinagreta de miel", it: "Formaggio di capra locale gratinato su toast, valeriana delle Ardenne, noci e vinaigrette al miele", duck: "coin coin coin 🦆 coin coin coin coin coin coin coin" },
        price: "11.50",
        emoji: "🥗",
      },
    ],
  },
  {
    titleFr: "Plats",
    titles: { fr: "Plats", en: "Main courses", de: "Hauptgerichte", nl: "Hoofdgerechten", es: "Platos principales", it: "Secondi piatti", duck: "COIN 🦆🦆" },
    items: [
      {
        nameFr: "Filet de truite de l'Our en papillote",
        names: { fr: "Filet de truite de l'Our en papillote", en: "Our River trout fillet en papillote", de: "Forellenfilet der Our in der Folie", nl: "Forelfilet van de Our en papillote", es: "Filete de trucha del Our al papillote", it: "Filetto di trota dell'Our al cartoccio", duck: "coin coin truite 🦆 coin coin" },
        descriptions: { fr: "Truite fraîche pêchée localement, beurre d'herbes, câpres, citron et pommes vapeur", en: "Fresh locally caught trout, herb butter, capers, lemon and steamed potatoes", de: "Frisch gefangene lokale Forelle, Kräuterbutter, Kapern, Zitrone und Dampfkartoffeln", nl: "Vers gevangen lokale forel, kruidenboter, kappertjes, citroen en gestoomde aardappelen", es: "Trucha fresca capturada localmente, mantequilla de hierbas, alcaparras, limón y patatas al vapor", it: "Trota fresca pescata localmente, burro alle erbe, capperi, limone e patate al vapore", duck: "coin coin coin coin 🦆 coin coin coin coin coin coin coin" },
        price: "19.50",
        emoji: "🐟",
      },
      {
        nameFr: "Côtelettes de sanglier sauce grand veneur",
        names: { fr: "Côtelettes de sanglier sauce grand veneur", en: "Wild boar chops in grand veneur sauce", de: "Wildschweinkoteletts in Grand-Veneur-Sauce", nl: "Wilde zwijnskarbonades met grand veneur saus", es: "Chuletas de jabalí con salsa gran venador", it: "Costolette di cinghiale in salsa grand veneur", duck: "coin SANGLIER coin 🦆 coin coin coin" },
        descriptions: { fr: "Sanglier des Ardennes rôti, sauce aux baies et genièvre, accompagné de croquettes maison et choux rouges braisés", en: "Roasted Ardennes boar, berry and juniper sauce, with homemade croquettes and braised red cabbage", de: "Gebratenes Ardenner Wildschwein, Beeren-Wacholdersoße, mit hausgemachten Kroketten und geschmortem Rotkohl", nl: "Geroosterd Ardens wild zwijn, bes- en jeneverbeessenaus, met huisgemaakte kroketten en gestoofde rode kool", es: "Jabalí ardennés asado, salsa de bayas y enebro, con croquetas caseras y col roja estofada", it: "Cinghiale delle Ardenne arrosto, salsa ai frutti di bosco e ginepro, con crocchette fatte in casa e cavolo rosso brasato", duck: "coin coin coin coin 🦆 coin coin coin coin coin coin coin coin coin" },
        price: "24.00",
        emoji: "🐗",
      },
      {
        nameFr: "Médaillon de chevreuil sauce poivrade",
        names: { fr: "Médaillon de chevreuil sauce poivrade", en: "Venison medallion with pepper sauce", de: "Rehmedaillon mit Pfeffersauce", nl: "Reemedaillon met peperaardensaus", es: "Medallón de corzo con salsa de pimienta", it: "Medaglione di capriolo in salsa al pepe", duck: "coin coin chevreuil 🦆 coin coin" },
        descriptions: { fr: "Chevreuil chassé dans nos forêts, croquettes maison et compotée de myrtilles sauvages", en: "Deer hunted in our forests, homemade croquettes and wild blueberry compote", de: "In unseren Wäldern gejagtes Reh, hausgemachte Kroketten und Wildblaubeerkompott", nl: "In onze bossen gejaagd ree, huisgemaakte kroketten en wilde bosbessencompote", es: "Corzo cazado en nuestros bosques, croquetas caseras y compota de arándanos silvestres", it: "Capriolo cacciato nei nostri boschi, crocchette fatte in casa e composta di mirtilli selvatici", duck: "🦆🦆 COIN COIN coin coin coin coin coin coin coin coin" },
        price: "26.00",
        emoji: "🦌",
      },
      {
        nameFr: "Carbonade flamande de bœuf",
        names: { fr: "Carbonade flamande de bœuf", en: "Flemish beef carbonade", de: "Flämische Rindfleischkarbonaden", nl: "Vlaamse rundvlees carbonade", es: "Carbonada flamenca de ternera", it: "Carbonata fiamminga di manzo", duck: "coin coin bœuf coin 🦆 coin" },
        descriptions: { fr: "Bœuf belge mijoté à la bière de Rochefort, accompagné de frites maison et salade.", en: "Belgian beef braised in Rochefort beer, with homemade fries and salad", de: "Belgisches Rindfleisch in Rochefort-Bier geschmort, mit hausgemachten Pommes frites und Salat", nl: "Belgisch rundvlees gestoofd in Rochefort bier, met huisgemaakte frieten en salade", es: "Carne de vacuno belga estofada en cerveza de Rochefort, con patatas fritas caseras y ensalada", it: "Manzo belga brasato nella birra di Rochefort, con patatine fritte fatte in casa e insalata", duck: "coin coin coin 🦆 coin coin coin coin bière coin coin coin coin" },
        price: "21.00",
        emoji: "🍺",
      },
    ],
  },
  {
    titleFr: "Desserts",
    titles: { fr: "Desserts", en: "Desserts", de: "Nachspeisen", nl: "Desserts", es: "Postres", it: "Dolci", duck: "coin coin SUCRÉ 🦆" },
    items: [
      {
        nameFr: "Tarte aux myrtilles des Fagnes",
        names: { fr: "Tarte aux myrtilles des Fagnes", en: "Hautes Fagnes blueberry tart", de: "Heidelbeertarte aus den Hohen Venn", nl: "Bosbessen taart van de Hoge Venen", es: "Tarta de arándanos de las Fagnes", it: "Crostata ai mirtilli delle Fagnes", duck: "coin coin TARTE coin 🦆" },
        descriptions: {         fr: "Myrtilles cueillies dans les Hautes Fagnes, servie tiède avec de la chantilly maison.", en: "Blueberries picked from the Hautes Fagnes, served warm with homemade whipped cream", de: "In den Hohen Venn gepflückte Heidelbeeren, warm mit hausgemachter Schlagsahne serviert", nl: "Bosbessen geplukt in de Hoge Venen, warm geserveerd met huisgemaakte slagroom", es: "Arándanos recogidos en las Hautes Fagnes, servida tibia con nata montada casera", it: "Mirtilli raccolti nelle Hautes Fagnes, servita tiepida con panna montata artigianale", duck: "coin coin coin coin 🦆🦆 coin coin coin coin tiède" },        price: "8.50",
        emoji: "🫐",
      },
      {
        nameFr: "Crème brûlée à la verveine",
        names: { fr: "Crème brûlée à la verveine", en: "Verbena crème brûlée", de: "Crème brûlée mit Eisenkraut", nl: "Citroenverbena crème brûlée", es: "Crema brulée de verbena", it: "Crema brûlée alla verbena", duck: "coin coin BRÛLÉE coin 🦆🔥" },
        descriptions: { fr: "Crème brûlée parfumée à la verveine du jardin, caramel croquant maison.", en: "Crème brûlée infused with garden verbena, homemade crunchy caramel", de: "Mit Garteneisenraute parfümierte Crème brûlée, hausgemachtes knuspriges Karamell", nl: "Crème brûlée geparfumeerd met tuinverbena, huisgemaakt knapperig karamel", es: "Crema brulée aromatizada con verbena del jardín, caramelo crujiente casero", it: "Crema brûlée profumata con verbena del giardino, caramello croccante fatto in casa", duck: "coin coin coin coin 🦆 coin coin coin coin coin brûlée" },
        price: "7.50",
        emoji: "🍮",
      },
      {
        nameFr: "Moelleux au chocolat noir de Bastogne",
        names: { fr: "Moelleux au chocolat noir de Bastogne", en: "Dark chocolate fondant from Bastogne", de: "Schokoladenfondant aus Bastogne", nl: "Pure chocolade fondant uit Bastogne", es: "Fondant de chocolate negro de Bastogne", it: "Fondente al cioccolato fondente di Bastogne", duck: "coin coin CHOCOLAT 🦆🍫 coin coin" },
        descriptions: { fr: "Cœur fondant au chocolat belge 70%, glace vanille maison et éclats de spéculoos.", en: "Melting heart with 70% Belgian chocolate, homemade vanilla ice cream and speculoos crumbles", de: "Schmelzender Kern aus 70% belgischer Schokolade, hausgemachtes Vanilleeis und Spekulaas-Stücke", nl: "Smeltend hart van 70% Belgische chocolade, huisgemaakt vanille-ijs en speculoasstukjes", es: "Corazón fundente de chocolate belga 70%, helado de vainilla casero y trozos de speculoos", it: "Cuore fondente con cioccolato belga 70%, gelato alla vaniglia fatto in casa e briciole di speculoos", duck: "coin coin coin coin 🦆 coin coin coin coin speculoos coin coin" },
        price: "9.00",
        emoji: "🍫",
      },
    ],
  },
]
