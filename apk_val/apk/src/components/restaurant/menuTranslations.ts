export type MenuTranslationLang = "en" | "de" | "nl" | "es" | "it"

export type MenuLocalizedText = Partial<Record<MenuTranslationLang, string>>

export interface RestaurantMenuTranslationItem {
  description: MenuLocalizedText
}

export interface RestaurantMenuTranslationSection {
  title: MenuLocalizedText
  items: Record<string, RestaurantMenuTranslationItem>
}

export interface RestaurantMenuTranslations {
  sections: Record<string, RestaurantMenuTranslationSection>
}

const emptyTranslation = { en: "", de: "", nl: "", es: "", it: "" }

export const restaurantMenuGroupTranslations = {
  "petite-faim": { 
    title: { en: "Small Hunger", de: "Kleiner Hunger", nl: "Kleine Trek", es: "Poca Hambre", it: "Piccola Fame" } 
  },
  "faim-de-loup": { 
    title: { en: "Ravenous Hunger", de: "Bärenhunger", nl: "Grote Honger", es: "Hambre de Lobo", it: "Fame da Lupi" } 
  },
  "coin-des-gourmands": { 
    title: { en: "Gourmet Corner", de: "Feinschmecker-Ecke", nl: "Fijnproevershoekje", es: "Rincón del Gourmet", it: "Angolo dei Golosi" } 
  },
}

export const restaurantMenuTranslations = {
  sections: {
    "nos-planches-a-partager": {
      title: { en: "Our Sharing Boards", de: "Unsere Bretter zum Teilen", nl: "Onze Deelplanken", es: "Nuestras Tablas para Compartir", it: "I Nostri Taglieri da Condividere" },
      items: {
        "la-forestiere-2": {
          description: { en: "Assortment of local cold meats and homemade terrine, walnuts, grapes and apricot chutney", de: "Sortiment an lokalen Wurstwaren und hausgemachter Terrine, Walnüssen, Trauben und Aprikosen-Chutney", nl: "Assortiment van lokale vleeswaren en huisgemaakte terrine, walnoten, druiven en abrikozenchutney", es: "Surtido de embutidos locales y terrina casera, nueces, uvas y chutney de albaricoque", it: "Assortimento di salumi locali e terrina della casa, noci, uva e chutney di albicocche" },
        },
        "la-bairsou-3": {
          description: { en: "Assortment of local cheeses, walnuts, grapes and Liège syrup", de: "Sortiment an lokalen Käsesorten, Walnüssen, Trauben und Lütticher Sirup", nl: "Assortiment van lokale kazen, walnoten, druiven en Luikse siroop", es: "Surtido de quesos locales, nueces, uvas y sirope de Lieja", it: "Assortimento di formaggi locali, noci, uva e sciroppo di Liegi" },
        },
        "la-mixed-4": {
          description: { en: "A bit of both", de: "Ein bisschen von beidem", nl: "Een beetje van beide", es: "Un poco de ambos", it: "Un po' di entrambi" },
        },
        "la-maree-5": {
          description: { en: "Smoked salmon, smoked trout and 6 grilled prawns", de: "Räucherlachs, geräucherte Forelle und 6 gegrillte Garnelen", nl: "Gerookte zalm, gerookte forel en 6 gegrilde gamba's", es: "Salmón ahumado, trucha ahumada y 6 gambas a la plancha", it: "Salmone affumicato, trota affumicata e 6 gamberi grigliati" },
        },
        "la-camembert-6": {
          description: { en: "Hot and runny Camembert, fresh salad, toast, walnuts, grapes and Liège syrup", de: "Heißer und flüssiger Camembert, frischer Salat, Toast, Walnüsse, Trauben und Lütticher Sirup", nl: "Warme en lopende Camembert, frisse salade, toast, walnoten, druiven en Luikse siroop", es: "Camembert caliente y derretido, ensalada fresca, tostadas, nueces, uvas y sirope de Lieja", it: "Camembert caldo e fuso, insalata fresca, toast, noci, uva e sciroppo di Liegi" },
        },
      },
    },
    "nos-potages": {
      title: { en: "Our Soups", de: "Unsere Suppen", nl: "Onze Soepen", es: "Nuestras Sopas", it: "Le Nostre Zuppe" },
      items: {
        "potage-du-jour-aux-legumes-7": {
          description: { ...emptyTranslation },
        },
        "potage-aux-tomates-8": {
          description: { ...emptyTranslation },
        },
      },
    },
    "nos-entrees-froides": {
      title: { en: "Our Cold Starters", de: "Unsere kalten Vorspeisen", nl: "Onze Koude Voorgerechten", es: "Nuestros Entrantes Fríos", it: "I Nostri Antipasti Freddi" },
      items: {
        "terrine-d-ete-du-val-et-son-chutney-d-abricot-9": {
          description: { en: "Served with brioche bread and a small salad", de: "Serviert mit Brioche-Brot und einem kleinen Salat", nl: "Geserveerd met briochebrood en een kleine salade", es: "Servido con pan brioche y una ensalada pequeña", it: "Servita con pan brioche e una piccola insalata" },
        },
        "foie-gras-de-nos-fourneaux-10": {
          description: { en: "Served with a small brioche bread, mesclun, walnuts and homemade apricot chutney", de: "Serviert mit einem kleinen Brioche-Brötchen, Mesclun, Walnüssen und hausgemachtem Aprikosen-Chutney", nl: "Geserveerd met een klein briochebroodje, mesclun, walnoten en huisgemaakte abrikozenchutney", es: "Servido con un pan brioche pequeño, mezclum, nueces y chutney de albaricoque casero", it: "Servito con un piccolo pan brioche, mesclun, noci e chutney di albicocche fatto in casa" },
        },
        "ardoise-de-saumon-fume-de-malmedy-11": {
          description: { en: "Artisanal Malmedy smoked salmon, shallot, capers, homemade tartare, lemon, small salad and toast", de: "Handwerklich geräucherter Lachs aus Malmedy, Schalotten, Kapern, hausgemachtes Tatar, Zitrone, kleiner Salat und Toast", nl: "Ambachtelijk gerookte zalm uit Malmedy, sjalot, kappertjes, huisgemaakte tartaar, citroen, kleine salade en toast", es: "Salmón ahumado artesanal de Malmedy, chalota, alcaparras, tartar casero, limón, ensalada pequeña y tostadas", it: "Salmone affumicato artigianale di Malmedy, scalogno, capperi, tartara della casa, limone, piccola insalata e toast" },
        },
        "carpaccio-de-buf-d-eifel-12": {
          description: { en: "Slices of Holstein beef, roasted pine nuts, sun-dried tomatoes, white mushrooms, Stavelot tomme cheese, balsamic vinegar and truffle oil and small salad", de: "Scheiben vom Holstein-Rind, geröstete Pinienkerne, getrocknete Tomaten, weiße Champignons, Tomme de Stavelot (Käse), Balsamico-Essig, Trüffelöl und kleiner Salat", nl: "Plakjes Holstein rundvlees, geroosterde pijnboompitten, zongedroogde tomaten, witte champignons, Stavelot tomme kaas, balsamicoazijn, truffelolie en kleine salade", es: "Rodajas de ternera Holstein, piñones tostados, tomates secos, champiñones blancos, queso tomme de Stavelot, vinagre balsámico, aceite de trufa y ensalada pequeña", it: "Fette di manzo Holstein, pinoli tostati, pomodori secchi, funghi prataioli, formaggio tomme di Stavelot, aceto balsamico, olio al tartufo e piccola insalata" },
        },
        "le-melon-et-jambon-italien-13": {
          description: { en: "Served with white port", de: "Serviert mit weißem Portwein", nl: "Geserveerd met witte port", es: "Servido con oporto blanco", it: "Servito con porto bianco" },
        },
      },
    },
    "nos-entrees-chaudes": {
      title: { en: "Our Hot Starters", de: "Unsere warmen Vorspeisen", nl: "Onze Warme Voorgerechten", es: "Nuestros Entrantes Calientes", it: "I Nostri Antipasti Caldi" },
      items: {
        "nos-croquettes-de-crevettes-maison-14": {
          description: { en: "Served on a bed of fresh salad, grey shrimps and lemon", de: "Serviert auf einem Bett aus frischem Salat, Nordseekrabben und Zitrone", nl: "Geserveerd op een bedje van frisse salade, grijze garnalen en citroen", es: "Servidas sobre una cama de ensalada fresca, camarones grises y limón", it: "Servite su un letto di insalata fresca, gamberetti grigi e limone" },
        },
        "les-fondus-parmesans-du-chef-15": {
          description: { en: "Served on a bed of fresh salad, parmesan shavings and lemon", de: "Serviert auf einem Bett aus frischem Salat, Parmesanspänen und Zitrone", nl: "Geserveerd op een bedje van frisse salade, parmezaanschilfers en citroen", es: "Servidos sobre una cama de ensalada fresca, virutas de parmesano y limón", it: "Serviti su un letto di insalata fresca, scaglie di parmigiano e limone" },
        },
        "le-duo-de-croquettes-de-truites-de-nos-fourneaux-16": {
          description: { en: "Served on a bed of fresh salad, smoked trout and lemon", de: "Serviert auf einem Bett aus frischem Salat, geräucherter Forelle und Zitrone", nl: "Geserveerd op een bedje van frisse salade, gerookte forel en citroen", es: "Servido sobre una cama de ensalada fresca, trucha ahumada y limón", it: "Servito su un letto di insalata fresca, trota affumicata e limone" },
        },
        "nos-veritables-fondus-ardennais-17": {
          description: { en: "Melted local cheese and Ardennes ham, served on a bed of fresh salad, parmesan shavings, sun-dried tomatoes and Ardennes ham", de: "Geschmolzener lokaler Käse und Ardenner Schinken, serviert auf einem Bett aus frischem Salat, Parmesanspänen, getrockneten Tomaten und Ardenner Schinken", nl: "Gesmolten streekkaas en Ardense ham, geserveerd op een bedje van frisse salade, parmezaanschilfers, zongedroogde tomaten en Ardense ham", es: "Queso local fundido y jamón de las Ardenas, servidos sobre una cama de ensalada fresca, virutas de parmesano, tomates secos y jamón de las Ardenas", it: "Formaggio fuso locale e prosciutto delle Ardenne, serviti su un letto di insalata fresca, scaglie di parmigiano, pomodori secchi e prosciutto delle Ardenne" },
        },
        "les-scampis-a-l-ail-persil-et-creme-18": {
          description: { en: "Can be served with or without cream, spicy or not", de: "Kann mit oder ohne Sahne serviert werden, scharf oder nicht", nl: "Kan met of zonder room geserveerd worden, pikant of niet", es: "Puede servirse con o sin crema, picante o no", it: "Possono essere serviti con o senza panna, piccanti o meno" },
        },
      },
    },
    "nos-plats-froids": {
      title: { en: "Our Cold Dishes", de: "Unsere kalten Gerichte", nl: "Onze Koude Gerechten", es: "Nuestros Platos Fríos", it: "I Nostri Piatti Freddi" },
      items: {
        "tartare-de-brassica-filet-americain-19": {
          description: { en: "Minute-minced Brassica origin beef, prepared and various accompaniments", de: "Frisch gehacktes Brassica-Rindfleisch, zubereitet mit verschiedenen Beilagen", nl: "A la minute gehakt Brassica rundvlees, bereid met diverse bijgerechten", es: "Carne de res Brassica picada al minuto, preparada con varios acompañamientos", it: "Carne di manzo Brassica tritata al momento, preparata con vari contorni" },
        },
        "carpaccio-de-buf-d-eifel-20": {
          description: { en: "Slices of Holstein beef, roasted pine nuts, sun-dried tomatoes, white mushrooms, Stavelot tomme cheese, balsamic vinegar and truffle oil and small salad", de: "Scheiben vom Holstein-Rind, geröstete Pinienkerne, getrocknete Tomaten, weiße Champignons, Tomme de Stavelot (Käse), Balsamico-Essig, Trüffelöl und kleiner Salat", nl: "Plakjes Holstein rundvlees, geroosterde pijnboompitten, zongedroogde tomaten, witte champignons, Stavelot tomme kaas, balsamicoazijn, truffelolie en kleine salade", es: "Rodajas de ternera Holstein, piñones tostados, tomates secos, champiñones blancos, queso tomme de Stavelot, vinagre balsámico, aceite de trufa y ensalada pequeña", it: "Fette di manzo Holstein, pinoli tostati, pomodori secchi, funghi prataioli, formaggio tomme di Stavelot, aceto balsamico, olio al tartufo e piccola insalata" },
        },
        "l-ardoise-de-saumon-fume-21": {
          description: { en: "Smoked salmon, shallot, capers, homemade tartare, lemon, small salad and toast", de: "Räucherlachs, Schalotte, Kapern, hausgemachtes Tatar, Zitrone, kleiner Salat und Toast", nl: "Gerookte zalm, sjalot, kappertjes, huisgemaakte tartaar, citroen, kleine salade en toast", es: "Salmón ahumado, chalota, alcaparras, tartar casero, limón, pequeña ensalada y tostadas", it: "Salmone affumicato, scalogno, capperi, tartara della casa, limone, piccola insalata e toast" },
        },
      },
    },
    "nos-pates-fraiches": {
      title: { en: "Our Fresh Pasta", de: "Unsere frischen Nudeln", nl: "Onze Verse Pasta's", es: "Nuestras Pastas Frescas", it: "Le Nostre Paste Fresche" },
      items: {
        "spaghetti-bolognaise-22": {
          description: { en: "Beef stew, tomatoes and spices", de: "Rinderragout, Tomaten und Gewürze", nl: "Runderstoofpot, tomaten en kruiden", es: "Estofado de ternera, tomates y especias", it: "Ragù di manzo, pomodori e spezie" },
        },
        "spaghetti-du-val-23": {
          description: { en: "Tomato, mushroom, cooked ham, parmesan and cream", de: "Tomate, Champignon, Kochschinken, Parmesan und Sahne", nl: "Tomaat, champignon, gekookte ham, parmezaan en room", es: "Tomate, champiñón, jamón cocido, parmesano y nata", it: "Pomodoro, funghi, prosciutto cotto, parmigiano e panna" },
        },
        "penne-des-bois-24": {
          description: { en: "Poultry, mushroom, bacon, onions, veal jus and truffle bits", de: "Geflügel, Champignons, Speckwürfel, Zwiebeln, Kalbsjus und Trüffelbruch", nl: "Gevogelte, champignon, spekjes, uien, kalfsjus en truffelstukjes", es: "Aves, champiñones, tocino, cebollas, jugo de ternera y trocitos de trufa", it: "Pollame, funghi, pancetta, cipolle, succo di vitello e scaglie di tartufo" },
        },
        "tagliatelle-au-scampis-25": {
          description: { en: "Tomato sauce with shellfish stock and scampi", de: "Tomatensauce mit Krustentierfond und Scampi", nl: "Tomatensaus met schaaldierenbouillon en scampi's", es: "Salsa de tomate con caldo de mariscos y cigalas", it: "Salsa di pomodoro con fumetto di crostacei e scampi" },
        },
        "penne-au-pesto-de-basilic-26": {
          description: { en: "Homemade basil pesto, fresh basil, garlic, pine nuts, parmesan and extra virgin olive oil", de: "Hausgemachtes Basilikumpesto, frisches Basilikum, Knoblauch, Pinienkerne, Parmesan und natives Olivenöl extra", nl: "Huisgemaakte basilicumpesto, verse basilicum, knoflook, pijnboompitten, parmezaan en extra vierge olijfolie", es: "Pesto de albahaca casero, albahaca fresca, ajo, piñones, parmesano y aceite de oliva virgen extra", it: "Pesto di basilico fatto in casa, basilico fresco, aglio, pinoli, parmigiano e olio extravergine d'oliva" },
        },
        "spaghetti-sauce-tomate-27": {
          description: { ...emptyTranslation },
        },
      },
    },
    "nos-viandes": {
      title: { en: "Our Meats", de: "Unsere Fleischgerichte", nl: "Onze Vleesgerechten", es: "Nuestras Carnes", it: "Le Nostre Carni" },
      items: {
        "steak-brassica-250-gr-28": {
          description: { ...emptyTranslation },
        },
        "entrecote-brassica-350gr-29": {
          description: { ...emptyTranslation },
        },
        "sauces-maison-30": {
          description: { en: "Mushroom cream, green pepper, Ardennes, Provencal, Bleu de Wanne (blue cheese), béarnaise and maître d'hôtel butter", de: "Champignon-Creme, grüner Pfeffer, Ardenner Art, provenzalisch, Bleu de Wanne, Béarnaise und Maître d'Hôtel-Butter", nl: "Champignonroom, groene peper, Ardense, Provençaalse, Wanne blauwe kaas, bearnaise en kruidenboter", es: "Crema de champiñones, pimienta verde, a las Ardenas, provenzal, queso azul de Wanne, bearnesa y mantequilla maître d'hôtel", it: "Crema di funghi, pepe verde, alla moda delle Ardenne, provenzale, formaggio erborinato Bleu de Wanne, bernese e burro maître d'hôtel" },
        },
        "spare-ribs-sauce-uncle-sam-31": {
          description: { en: "Served with our vegetables of the day and fries", de: "Serviert mit unserem Tagesgemüse und Pommes frites", nl: "Geserveerd met onze groenten van de dag en frieten", es: "Servidos con nuestras verduras del día y patatas fritas", it: "Serviti con le nostre verdure del giorno e patatine fritte" },
        },
        "escalope-de-veau-a-la-facon-du-chef-32": {
          description: { en: "Grilled eggplant, Ardennes ham, tomato sauce, Stavelot tomme, cherry tomatoes with fresh herbs and mozzarella with pesto, served with tagliatelle", de: "Gegrillte Aubergine, Ardenner Schinken, Tomatensauce, Tomme de Stavelot, Kirschtomaten mit frischen Kräutern und Mozzarella mit Pesto, serviert mit Tagliatelle", nl: "Gegrilde aubergine, Ardense ham, tomatensaus, Stavelot tomme, kerstomaatjes met verse kruiden en mozzarella met pesto, geserveerd met tagliatelle", es: "Berenjena asada, jamón de las Ardenas, salsa de tomate, tomme de Stavelot, tomates cherry con hierbas frescas y mozzarella con pesto, servido con tallarines", it: "Melanzane grigliate, prosciutto delle Ardenne, salsa di pomodoro, tomme di Stavelot, pomodorini alle erbe fresche e mozzarella al pesto, servita con tagliatelle" },
        },
        "le-1-2-poulet-grille-peri-peri-aux-epices-33": {
          description: { en: "Served with fries and salad", de: "Serviert mit Pommes frites und Salat", nl: "Geserveerd met frietjes en salade", es: "Servido con patatas fritas y ensalada", it: "Servito con patatine fritte e insalata" },
        },
        "gigotin-d-agneau-34": {
          description: { en: "Flavored with thyme flower and Vielsalm honey, Florenville potato pancakes and vegetable of the moment", de: "Aromatisiert mit Thymianblüten und Honig aus Vielsalm, Florenville-Kartoffelpuffer und Gemüse der Saison", nl: "Geparfumeerd met tijmbloesem en honing uit Vielsalm, aardappelpannekoekjes uit Florenville en groente van het moment", es: "Perfumado con flor de tomillo y miel de Vielsalm, tortitas de patata de Florenville y verdura del momento", it: "Profumato al fiore di timo e miele di Vielsalm, frittelle di patate di Florenville e verdura del momento" },
        },
      },
    },
    "nos-poissons": {
      title: { en: "Our Fish", de: "Unsere Fischgerichte", nl: "Onze Visgerechten", es: "Nuestros Pescados", it: "I Nostri Pesci" },
      items: {
        "meuniere-35": {
          description: { en: "Parsley, white wine, lemon and butter. Served with vegetables of the day and fries", de: "Petersilie, Weißwein, Zitrone und Butter. Serviert mit Tagesgemüse und Pommes frites", nl: "Peterselie, witte wijn, citroen en boter. Geserveerd met groenten van de dag en frieten", es: "Perejil, vino blanco, limón y mantequilla. Servido con verduras del día y patatas fritas", it: "Prezzemolo, vino bianco, limone e burro. Servito con verdure del giorno e patatine fritte" },
        },
        "amande-36": {
          description: { en: "Roasted flaked almonds, fish stock, cream and parsley. Served with vegetables of the day and fries", de: "Geröstete Mandelblättchen, Fischfond, Sahne und Petersilie. Serviert mit Tagesgemüse und Pommes frites", nl: "Geroosterde geschaafde amandelen, visbouillon, room en peterselie. Geserveerd met groenten van de dag en frieten", es: "Almendras fileteadas tostadas, caldo de pescado, nata y perejil. Servido con verduras del día y patatas fritas", it: "Mandorle a scaglie tostate, fumetto di pesce, panna e prezzemolo. Servito con verdure del giorno e patatine fritte" },
        },
        "ardennaise-37": {
          description: { en: "Bacon, Ardennes ham, mushroom and cream. Served with vegetables of the day and fries", de: "Speckwürfel, Ardenner Schinken, Champignons und Sahne. Serviert mit Tagesgemüse und Pommes frites", nl: "Spekjes, Ardense ham, champignon en room. Geserveerd met groenten van de dag en frieten", es: "Tocino, jamón de las Ardenas, champiñones y crema. Servido con verduras del día y patatas fritas", it: "Pancetta, prosciutto delle Ardenne, funghi e panna. Servito con verdure del giorno e patatine fritte" },
        },
        "du-chef-38": {
          description: { en: "Mix of fresh herbs, cherry tomatoes, shallot, garlic and extra virgin olive oil (cold sauce)", de: "Mischung aus frischen Kräutern, Kirschtomaten, Schalotten, Knoblauch und nativem Olivenöl extra (kalte Sauce)", nl: "Mix van verse kruiden, kerstomaatjes, sjalot, knoflook en extra vierge olijfolie (koude saus)", es: "Mezcla de hierbas frescas, tomates cherry, chalota, ajo y aceite de oliva virgen extra (salsa fría)", it: "Mix di erbe fresche, pomodorini, scalogno, aglio e olio extravergine di oliva (salsa fredda)" },
        },
        "le-pave-de-truite-saumonee-aux-poireaux-39": {
          description: { en: "Depending on the catch, salmon trout steak or fillet from Arimont on a bed of lightly creamed melted leeks, served with steamed baby potatoes", de: "Je nach Fang, Lachsforellensteak oder -filet aus Arimont auf einem Bett aus leicht cremigem Lauchfondue, serviert mit gedämpften Grenaille-Kartoffeln", nl: "Afhankelijk van de aanvoer, zalmforelsteak of -filet uit Arimont op een bedje van lichtgeroomde gesmolten prei, geserveerd met gestoomde krieltjes", es: "Según disponibilidad, lomo o filete de trucha asalmonada de Arimont sobre un lecho de fondue de puerros ligeramente cremosa, servido con patatas baby al vapor", it: "A seconda dell'arrivo, trancio o filetto di trota salmonata di Arimont su un letto di fonduta di porri leggermente cremosa, servito con patatine novelle al vapore" },
        },
        "les-gambas-grillees-40": {
          description: { en: "6 marinated gambas grilled on the plancha, served with a small green salad, our trio of sauces (tartare, cocktail and chili) and fries", de: "6 marinierte und auf der Plancha gegrillte Riesengarnelen, serviert mit einem kleinen grünen Salat, unserem Saucen-Trio (Tatar, Cocktail und Chili) und Pommes frites", nl: "6 gemarineerde en op de bakplaat gegrilde gamba's, geserveerd met een kleine groene salade, ons trio van sauzen (tartaar, cocktail en chili) en frieten", es: "6 gambas marinadas y asadas a la plancha, servidas con una pequeña ensalada verde, nuestro trío de salsas (tártara, cóctel y chile) y patatas fritas", it: "6 gamberoni marinati e grigliati sulla plancha, serviti con una piccola insalata verde, il nostro tris di salse (tartara, cocktail e peperoncino) e patatine fritte" },
        },
      },
    },
    "notre-cuisine-traditionnelle": {
      title: { en: "Our Traditional Cuisine", de: "Unsere traditionelle Küche", nl: "Onze Traditionele Keuken", es: "Nuestra Cocina Tradicional", it: "La Nostra Cucina Tradizionale" },
      items: {
        "la-carbonnade-de-brassica-buf-a-la-biere-de-malmedy-41": {
          description: { en: "Served with salad and fries", de: "Serviert mit Salat und Pommes frites", nl: "Geserveerd met salade en frieten", es: "Servido con ensalada y patatas fritas", it: "Servito con insalata e patatine fritte" },
        },
        "le-vol-au-vent-du-chef-a-la-volaille-d-aubel-42": {
          description: { en: "Served with salad and fries", de: "Serviert mit Salat und Pommes frites", nl: "Geserveerd met salade en frieten", es: "Servido con ensalada y patatas fritas", it: "Servito con insalata e patatine fritte" },
        },
        "les-boulets-liegeois-ou-a-la-tomate-43": {
          description: { en: "Served with salad and fries", de: "Serviert mit Salat und Pommes frites", nl: "Geserveerd met salade en frieten", es: "Servido con ensalada y patatas fritas", it: "Servito con insalata e patatine fritte" },
        },
        "tartare-de-brassica-filet-americain-44": {
          description: { en: "Minute-minced Brassica origin beef, prepared and various accompaniments", de: "Frisch gehacktes Brassica-Rindfleisch, zubereitet mit verschiedenen Beilagen", nl: "A la minute gehakt Brassica rundvlees, bereid met diverse bijgerechten", es: "Carne de res Brassica picada al minuto, preparada con varios acompañamientos", it: "Carne di manzo Brassica tritata al momento, preparata con vari contorni" },
        },
      },
    },
    "nos-burgers": {
      title: { en: "Our Burgers", de: "Unsere Burger", nl: "Onze Burgers", es: "Nuestros Hamburguesas", it: "I Nostri Hamburger" },
      items: {
        "le-brassica-45": {
          description: { en: "Brassica minced beef steak, Ardennes ham, Stavelot Tomme, fried onions and sauce. Served with salad and fries", de: "Brassica Rinderhacksteak, Ardenner Schinken, Tomme de Stavelot, Röstzwiebeln und Sauce. Serviert mit Salat und Pommes frites", nl: "Brassica gehakte biefstuk, Ardense ham, Stavelot Tomme, gefrituurde uien en saus. Geserveerd met salade en frieten", es: "Filete de ternera picada de Brassica, jamón de las Ardenas, queso Tomme de Stavelot, cebolla frita y salsa. Servido con ensalada y patatas fritas", it: "Bistecca di manzo macinata Brassica, prosciutto delle Ardenne, formaggio Tomme di Stavelot, cipolle fritte e salsa. Servito con insalata e patatine fritte" },
        },
        "le-maitre-coq-46": {
          description: { en: "Marinated and grilled poultry fillet, Stavelot Tomme, salad and tartare sauce. Served with salad and fries", de: "Mariniertes und gegrilltes Geflügelfilet, Tomme de Stavelot, Salat und Tatarsauce. Serviert mit Salat und Pommes frites", nl: "Gemarineerde en gegrilde kipfilet, Stavelot Tomme, salade en tartaarsaus. Geserveerd met salade en frieten", es: "Filete de ave marinado y a la parrilla, queso Tomme de Stavelot, ensalada y salsa tártara. Servido con ensalada y patatas fritas", it: "Filetto di pollame marinato e grigliato, formaggio Tomme di Stavelot, insalata e salsa tartara. Servito con insalata e patatine fritte" },
        },
      },
    },
    "moules-en-saison": {
      title: { en: "Mussels in season", de: "Muscheln der Saison", nl: "Mosselen in het seizoen", es: "Mejillones de temporada", it: "Cozze di stagione" },
      items: {
        "nature-47": {
          description: { en: "Served with fries", de: "Serviert mit Pommes frites", nl: "Geserveerd met frieten", es: "Servidas con patatas fritas", it: "Servite con patatine fritte" },
        },
        "vin-blanc-48": {
          description: { en: "Served with fries", de: "Serviert mit Pommes frites", nl: "Geserveerd met frieten", es: "Servidas con patatas fritas", it: "Servite con patatine fritte" },
        },
        "ail-creme-49": {
          description: { en: "Served with fries", de: "Serviert mit Pommes frites", nl: "Geserveerd met frieten", es: "Servidas con patatas fritas", it: "Servite con patatine fritte" },
        },
        "a-l-ardennaise-50": {
          description: { en: "Served with fries", de: "Serviert mit Pommes frites", nl: "Geserveerd met frieten", es: "Servidas con patatas fritas", it: "Servite con patatine fritte" },
        },
        "du-chef-51": {
          description: { en: "Cream, wild garlic, fresh spices, tomato. Served with fries", de: "Sahne, Bärlauch, frische Gewürze, Tomate. Serviert mit Pommes frites", nl: "Room, daslook, verse kruiden, tomaat. Geserveerd met frieten", es: "Nata, ajo silvestre, especias frescas, tomate. Servidas con patatas fritas", it: "Panna, aglio orsino, spezie fresche, pomodoro. Servite con patatine fritte" },
        },
      },
    },
    "nos-salades": {
      title: { en: "Our Salads", de: "Unsere Salate", nl: "Onze Salades", es: "Nuestras Ensaladas", it: "Le Nostre Insalate" },
      items: {
        "la-perigourdine-52": {
          description: { en: "Mixed green salad, smoked duck breast, foie gras, gizzards, apple, raspberries, walnuts, raspberry vinaigrette", de: "Gemischter grüner Salat, geräucherte Entenbrust, Stopfleber, Muskelmagen, Apfel, Himbeeren, Walnüsse, Himbeer-Vinaigrette", nl: "Gemengde groene salade, gerookte eendenborst, foie gras, spiermaagjes, appel, frambozen, walnoten, frambozenvinaigrette", es: "Ensalada verde mixta, pechuga de pato ahumada, foie gras, mollejas, manzana, frambuesas, nueces, vinagreta de frambuesa", it: "Insalata verde mista, petto d'anatra affumicato, foie gras, ventrigli, mela, lamponi, noci, vinaigrette al lampone" },
        },
        "la-bairsou-53": {
          description: { en: "Mixed green salad, warm goat cheese on an apple slice, bacon, apple, croutons, roasted seeds, raspberry vinaigrette and hot Liège syrup coulis (vegetarian version on request)", de: "Gemischter grüner Salat, warmer Ziegenkäse auf Apfelscheiben, Speckwürfel, Apfel, Croutons, geröstete Kerne, Himbeer-Vinaigrette und heiße Lütticher Sirup-Sauce (vegetarische Variante auf Anfrage)", nl: "Gemengde groene salade, warme geitenkaas op een appelschijfje, spekjes, appel, croutons, geroosterde zaden, frambozenvinaigrette en warme Luikse siroopcoulis (vegetarische versie op aanvraag)", es: "Ensalada verde mixta, queso de cabra caliente sobre rodaja de manzana, tocino, manzana, picatostes, semillas tostadas, vinagreta de frambuesa y coulis de sirope de Lieja caliente (versión vegetariana bajo petición)", it: "Insalata verde mista, formaggio di capra caldo su fetta di mela, pancetta, mela, crostini, semi tostati, vinaigrette al lampone e coulis di sciroppo di Liegi caldo (versione vegetariana su richiesta)" },
        },
        "l-ambleve-54": {
          description: { en: "Mixed green salad, strawberries, endive, smoked trout, homemade trout croquettes and lemon vinaigrette", de: "Gemischter grüner Salat, Erdbeeren, Chicorée, geräucherte Forelle, hausgemachte Forellenkroketten und Zitronen-Vinaigrette", nl: "Gemengde groene salade, aardbeien, witloof, gerookte forel, huisgemaakte forelkroketten en citroenvinaigrette", es: "Ensalada verde mixta, fresas, endibias, trucha ahumada, croquetas de trucha caseras y vinagreta de limón", it: "Insalata verde mista, fragole, indivia, trota affumicata, crocchette di trota fatte in casa e vinaigrette al limone" },
        },
        "l-ostendaise-55": {
          description: { en: "Mixed green salad, strawberries, endive, grey shrimps, grey shrimp croquettes and lemon vinaigrette", de: "Gemischter grüner Salat, Erdbeeren, Chicorée, Nordseekrabben, Krabbenkroketten und Zitronen-Vinaigrette", nl: "Gemengde groene salade, aardbeien, witloof, grijze garnalen, grijze garnaalkroketten en citroenvinaigrette", es: "Ensalada verde mixta, fresas, endibias, camarones grises, croquetas de camarones grises y vinagreta de limón", it: "Insalata verde mista, fragole, indivia, gamberetti grigi, crocchette di gamberetti grigi e vinaigrette al limone" },
        },
        "la-cesar-56": {
          description: { en: "Mixed green salad, poultry, bacon, croutons, parmesan, apple, Caesar sauce", de: "Gemischter grüner Salat, Geflügel, Speckwürfel, Croutons, Parmesan, Apfel, Caesar-Dressing", nl: "Gemengde groene salade, gevogelte, spekjes, croutons, parmezaan, appel, caesarsaus", es: "Ensalada verde mixta, aves, tocino, picatostes, parmesano, manzana, salsa césar", it: "Insalata verde mista, pollame, pancetta, crostini, parmigiano, mela, salsa caesar" },
        },
        "tomates-crevettes-grises-57": {
          description: { en: "2 pieces and served with french fries", de: "2 Stück, serviert mit Pommes frites", nl: "2 stuks en geserveerd met frietjes", es: "2 piezas servidas con patatas fritas", it: "2 pezzi serviti con patatine fritte" },
        },
      },
    },
    "nos-paninis": {
      title: { en: "Our Paninis", de: "Unsere Paninis", nl: "Onze Panini's", es: "Nuestros Paninis", it: "I Nostri Panini" },
      items: {
        "panini-au-bouquet-des-moines-58": {
          description: { en: "Brown bread, cheese, arugula and honey. Served with seasonal raw vegetables", de: "Graubrot, Käse, Rucola und Honig. Serviert mit saisonaler Rohkost", nl: "Grijze boterham, kaas, rucola en honing. Geserveerd met seizoensgebonden rauwkost", es: "Pan moreno, queso, rúcula y miel. Servido con crudités de temporada", it: "Pane scuro, formaggio, rucola e miele. Servito con crudités di stagione" },
        },
        "panini-a-l-italienne-59": {
          description: { en: "Ciabatta, basil, Parma ham, mozzarella. Served with seasonal raw vegetables", de: "Ciabatta, Basilikum, Parmaschinken, Mozzarella. Serviert mit saisonaler Rohkost", nl: "Ciabatta, basilicum, Parmaham, mozzarella. Geserveerd met seizoensgebonden rauwkost", es: "Ciabatta, albahaca, jamón de Parma, mozzarella. Servido con crudités de temporada", it: "Ciabatta, basilico, prosciutto di Parma, mozzarella. Servito con crudités di stagione" },
        },
      },
    },
    "nos-tapas-froids": {
      title: { en: "Our Cold Tapas", de: "Unsere kalten Tapas", nl: "Onze Koude Tapas", es: "Nuestras Tapas Frías", it: "Le Nostre Tapas Fredde" },
      items: {
        "portion-fromage-60": {
          description: { ...emptyTranslation },
        },
        "portion-salami-61": {
          description: { ...emptyTranslation },
        },
        "portion-mixte-62": {
          description: { ...emptyTranslation },
        },
      },
    },
    "tapas-chaudes-du-val": {
      title: { en: "Hot Tapas from Val", de: "Warme Tapas vom Val", nl: "Warme tapas van Val", es: "Tapas calientes del Val", it: "Tapas calde del Val" },
      items: {
        "minis-croquettes-ardennaises-6-pces-63": {
          description: { ...emptyTranslation },
        },
        "minis-croquettes-de-crevettes-6-pces-64": {
          description: { ...emptyTranslation },
        },
        "minis-croquettes-de-truites-6-pces-65": {
          description: { ...emptyTranslation },
        },
        "mini-mixte-kroketjes-6-pces-66": {
          description: { ...emptyTranslation },
        },
        "chaud-froid-de-tapas-du-chef-67": {
          description: { en: "(black pudding, pâté, cooked ham and mixed croquettes)", de: "(Blutwurst, Pastete, Kochschinken und gemischte Kroketten)", nl: "(bloedworst, paté, gekookte ham en gemengde kroketten)", es: "(morcilla, paté, jamón cocido y mezcla de croquetas)", it: "(sanguinaccio, paté, prosciutto cotto e misto di crocchette)" },
        },
      },
    },
    "le-casse-croute": {
      title: { en: "The Snack", de: "Der Snack", nl: "De Snack", es: "El Tentempié", it: "Lo Spuntino" },
      items: {
        "potage-du-jour-68": {
          description: { en: "Soup served as a main dish with bread and butter", de: "Suppe als Hauptgericht serviert mit Brot und Butter", nl: "Soep geserveerd als hoofdgerecht met brood en boter", es: "Sopa servida como plato principal con pan y mantequilla", it: "Zuppa servita come piatto principale con pane e burro" },
        },
        "potage-aux-tomates-69": {
          description: { en: "Soup served as a main dish with bread and butter", de: "Suppe als Hauptgericht serviert mit Brot und Butter", nl: "Soep geserveerd als hoofdgerecht met brood en boter", es: "Sopa servida como plato principal con pan y mantequilla", it: "Zuppa servita come piatto principale con pane e burro" },
        },
      },
    },
    "sucre-gaufre-crepes": {
      title: { en: "Sweet - Waffles & Crepes", de: "Süßes - Waffeln & Crêpes", nl: "Zoet - Wafels & Pannenkoeken", es: "Dulce - Gofres y Crepes", it: "Dolce - Waffle e Crepes" },
      items: {
        "tarte-aux-pommes-et-boule-de-glace-vanille-70": {
          description: { ...emptyTranslation },
        },
        "gaufre-chaude-au-sucre-71": {
          description: { ...emptyTranslation },
        },
        "gaufre-a-la-creme-fraiche-72": {
          description: { ...emptyTranslation },
        },
        "gaufre-aux-fruits-et-a-la-creme-fraiche-73": {
          description: { ...emptyTranslation },
        },
        "gaufre-mikado-74": {
          description: { en: "(ice cream, vanilla, hot chocolate, fresh cream)", de: "(Eis, Vanille, heiße Schokolade, frische Sahne)", nl: "(ijs, vanille, warme chocolademelk, verse room)", es: "(helado, vainilla, chocolate caliente, nata fresca)", it: "(gelato, vaniglia, cioccolata calda, panna fresca)" },
        },
        "crepe-au-sucre-75": {
          description: { ...emptyTranslation },
        },
        "crepe-a-la-cassonade-76": {
          description: { ...emptyTranslation },
        },
        "crepe-creme-fraiche-77": {
          description: { ...emptyTranslation },
        },
        "crepe-au-chocolat-78": {
          description: { ...emptyTranslation },
        },
        "crepe-confiture-79": {
          description: { ...emptyTranslation },
        },
        "crepe-normande-80": {
          description: { en: "(with apples)", de: "(mit Äpfeln)", nl: "(met appels)", es: "(con manzanas)", it: "(con mele)" },
        },
        "crepe-ardennaise-81": {
          description: { en: "(with bacon)", de: "(mit Speck)", nl: "(met spek)", es: "(con tocino)", it: "(con pancetta)" },
        },
        "crepe-flambee-grand-marnier-82": {
          description: { ...emptyTranslation },
        },
        "crepe-norvegienne-83": {
          description: { en: "(ice cream, fresh fruits, 'Grand Marnier')", de: "(Eis, frische Früchte, 'Grand Marnier')", nl: "(ijs, vers fruit, 'Grand Marnier')", es: "(helado, frutas frescas, 'Grand Marnier')", it: "(gelato, frutta fresca, 'Grand Marnier')" },
        },
        "crepe-mikado-84": {
          description: { en: "(ice cream, vanilla, fresh cream, hot chocolate)", de: "(Eis, Vanille, frische Sahne, heiße Schokolade)", nl: "(ijs, vanille, verse room, warme chocolademelk)", es: "(helado, vainilla, nata fresca, chocolate caliente)", it: "(gelato, vaniglia, panna fresca, cioccolata calda)" },
        },
      },
    },
    "glaces-maison": {
      title: { en: "Homemade Ice Cream", de: "Hausgemachtes Eis", nl: "Huisgemaakt IJs", es: "Helados Caseros", it: "Gelati Fatti in Casa" },
      items: {
        "la-coupe-enfant-85": {
          description: { en: "(vanilla, chocolate, whipped cream)", de: "(Vanille, Schokolade, Schlagsahne)", nl: "(vanille, chocolade, slagroom)", es: "(vainilla, chocolate, crema batida)", it: "(vaniglia, cioccolato, panna montata)" },
        },
        "la-coupe-panachee-86": {
          description: { en: "(vanilla, mocha, chocolate, whipped cream)", de: "(Vanille, Mokka, Schokolade, Schlagsahne)", nl: "(vanille, mokka, chocolade, slagroom)", es: "(vainilla, moca, chocolate, crema batida)", it: "(vaniglia, moka, cioccolato, panna montata)" },
        },
        "la-coupe-dame-blanche-ou-noire-87": {
          description: { en: "(vanilla, hot chocolate, whipped cream)", de: "(Vanille, heiße Schokolade, Schlagsahne)", nl: "(vanille, warme chocolademelk, slagroom)", es: "(vainilla, chocolate caliente, crema batida)", it: "(vaniglia, cioccolata calda, panna montata)" },
        },
        "la-coupe-bresilienne-au-caramel-88": {
          description: { ...emptyTranslation },
        },
        "la-coupe-maison-aux-fruits-de-saison-et-coulis-de-framboises-89": {
          description: { ...emptyTranslation },
        },
        "la-coupe-de-sorbets-et-coulis-de-framboises-90": {
          description: { ...emptyTranslation },
        },
        "le-veritable-cafe-liegeois-facon-du-val-91": {
          description: { ...emptyTranslation },
        },
      },
    },
    "les-desserts": {
      title: { en: "Desserts", de: "Desserts", nl: "Desserts", es: "Postres", it: "Dessert" },
      items: {
        "la-palette-d-assortiment-de-desserts-92": {
          description: { en: "(Min. 2 covers)", de: "(Min. 2 Gedecke)", nl: "(Min. 2 personen)", es: "(Mín. 2 cubiertos)", it: "(Min. 2 coperti)" },
        },
        "le-tiramisu-termine-aux-paillettes-de-chocolat-fondant-93": {
          description: { ...emptyTranslation },
        },
        "l-incontournable-mousse-au-chocolat-94": {
          description: { ...emptyTranslation },
        },
        "la-creme-brulee-au-sucre-vanilline-95": {
          description: { ...emptyTranslation },
        },
        "la-tartelette-au-chocolat-maison-et-glace-au-vanille-96": {
          description: { ...emptyTranslation },
        },
        "le-plateau-d-assortiment-de-fromages-regionaux-97": {
          description: { ...emptyTranslation },
        },
        "accompagnez-votre-dessert-ou-fromage-d-un-verre-de-vin-blanc-98": {
          description: { en: "Selected by the owner", de: "Ausgewählt vom Chef", nl: "Geselecteerd door de baas", es: "Seleccionado por el jefe", it: "Selezionato dal capo" },
        },
      },
    },
    "nos-propositions-vegetariennes": {
      title: { en: "Our Vegetarian Proposals", de: "Unsere vegetarischen Vorschläge", nl: "Onze Vegetarische Voorstellen", es: "Nuestras Propuestas Vegetarianas", it: "Le Nostre Proposte Vegetariane" },
      items: {
        "poelee-de-legumes-au-curry-rouge-99": {
          description: { en: "A la minute vegetable curry with spices, ginger, red curry and coconut milk, served with rice and coriander chutney", de: "À-la-minute Gemüsecurry mit Gewürzen, Ingwer, rotem Curry und Kokosmilch, serviert mit Reis und Koriander-Chutney", nl: "A la minute groentecurry met kruiden, gember, rode curry en kokosmelk, geserveerd met rijst en korianderchutney", es: "Curry de verduras al minuto con especias, jengibre, curry rojo y leche de coco, servido con arroz y chutney de cilantro", it: "Curry di verdure al momento con spezie, zenzero, curry rosso e latte di cocco, servito con riso e chutney di coriandolo" },
        },
        "la-salade-du-bairsou-vegetarienne-100": {
          description: { en: "Mixed green salad, warm goat cheese on an apple slice, apple, croutons, roasted seeds, raspberry vinaigrette and hot Liège syrup coulis", de: "Gemischter grüner Salat, warmer Ziegenkäse auf Apfelscheiben, Apfel, Croutons, geröstete Kerne, Himbeer-Vinaigrette und heiße Lütticher Sirup-Sauce", nl: "Gemengde groene salade, warme geitenkaas op een appelschijfje, appel, croutons, geroosterde zaden, frambozenvinaigrette en warme Luikse siroopcoulis", es: "Ensalada verde mixta, queso de cabra caliente sobre rodaja de manzana, manzana, picatostes, semillas tostadas, vinagreta de frambuesa y coulis de sirope de Lieja caliente", it: "Insalata verde mista, formaggio di capra caldo su fetta di mela, mela, crostini, semi tostati, vinaigrette al lampone e coulis di sciroppo di Liegi caldo" },
        },
      },
    },
    "nos-plats-friterie": {
      title: { en: "Our Fry Shop Dishes", de: "Unsere Imbissgerichte", nl: "Onze Frituur Gerechten", es: "Nuestros Platos de Freiduría", it: "I Nostri Piatti da Friggitoria" },
      items: {
        "fricandelle-frites-et-garniture-101": {
          description: { en: "1 piece", de: "1 Stück", nl: "1 stuk", es: "1 pieza", it: "1 pezzo" },
        },
        "fricandelle-frites-et-garniture-102": {
          description: { en: "2 pieces", de: "2 Stück", nl: "2 stuks", es: "2 piezas", it: "2 pezzi" },
        },
        "croquettes-de-volailles-frites-et-garniture-103": {
          description: { en: "2 pieces", de: "2 Stück", nl: "2 stuks", es: "2 piezas", it: "2 pezzi" },
        },
        "croquettes-de-volailles-frites-et-garniture-104": {
          description: { en: "3 pieces", de: "3 Stück", nl: "3 stuks", es: "3 piezas", it: "3 pezzi" },
        },
        "assiette-de-frites-105": {
          description: { ...emptyTranslation },
        },
      },
    },
    "enfants": {
      title: { en: "Children", de: "Kinder", nl: "Kinderen", es: "Niños", it: "Bambini" },
      items: {
        "menu-enfant-106": {
          description: { en: "Small tomato soup, a dish of your choice and an ice cream cup for dessert", de: "Kleine Tomatensuppe, ein Gericht nach Wahl und ein Eisbecher als Dessert", nl: "Kleine tomatensoep, een gerecht naar keuze en een ijsbeker als dessert", es: "Pequeña sopa de tomate, un plato a elegir y una copa de helado de postre", it: "Piccola zuppa di pomodoro, un piatto a scelta e una coppa di gelato per dessert" },
        },
        "les-plats-enfants-107": {
          description: { en: "Choice of: Spaghetti bolognese, Meatball with Liège/tomato sauce, Breaded fish or Chicken drumstick with fries", de: "Zur Auswahl: Spaghetti Bolognese, Frikadelle mit Lütticher/Tomatensauce, Panierter Fisch oder Hähnchenschenkel mit Pommes frites", nl: "Naar keuze: Spaghetti bolognese, Gehaktbal met Luikse/tomatensaus, Gepaneerde vis of Kippenbout met frietjes", es: "A elegir: Espaguetis a la boloñesa, Albóndiga con salsa de Lieja/tomate, Pescado empanado o Muslo de pollo con patatas fritas", it: "A scelta: Spaghetti alla bolognese, Polpetta con salsa di Liegi/pomodoro, Pesce impanato o Cosciotto di pollo con patatine fritte" },
        },
      },
    },
    "nos-en-cas-traditionnels": {
      title: { en: "Our Traditional Snacks", de: "Unsere traditionellen Snacks", nl: "Onze Traditionele Snacks", es: "Nuestros Aperitivos Tradicionales", it: "I Nostri Spuntini Tradizionali" },
      items: {
        "omelette-nature-108": {
          description: { ...emptyTranslation },
        },
        "omelette-au-fromage-109": {
          description: { ...emptyTranslation },
        },
        "omelette-de-nos-campagnes-110": {
          description: { en: "Roasted potatoes, mushrooms, onion, bacon", de: "Röstkartoffeln, Champignons, Zwiebeln, Speckwürfel", nl: "Gebakken aardappelen, champignons, ui, spekjes", es: "Patatas salteadas, champiñones, cebolla, tocino", it: "Patate rosolate, funghi, cipolla, pancetta" },
        },
        "fricassee-au-lard-3-ufs-sur-le-plat-avec-lard-111": {
          description: { ...emptyTranslation },
        },
      },
    },
    "nos-croques": {
      title: { en: "Our Toasted Sandwiches", de: "Unsere getoasteten Sandwiches", nl: "Onze Croques", es: "Nuestros Sándwiches Tostados", it: "I Nostri Toast" },
      items: {
        "croque-monsieur-112": {
          description: { en: "White and brown bread, cooked ham, Gouda cheese", de: "Weiß- und Graubrot, Kochschinken, Gouda-Käse", nl: "Wit en bruin brood, gekookte ham, Goudakaas", es: "Pan blanco y moreno, jamón cocido, queso Gouda", it: "Pane bianco e scuro, prosciutto cotto, formaggio Gouda" },
        },
        "croque-hawai-113": {
          description: { en: "White and brown bread, cooked ham, Gouda cheese, pineapple", de: "Weiß- und Graubrot, Kochschinken, Gouda-Käse, Ananas", nl: "Wit en bruin brood, gekookte ham, Goudakaas, ananas", es: "Pan blanco y moreno, jamón cocido, queso Gouda, piña", it: "Pane bianco e scuro, prosciutto cotto, formaggio Gouda, ananas" },
        },
        "croque-boum-boum-114": {
          description: { en: "Homemade white and brown bread, cooked ham, Gouda cheese, bolognese sauce", de: "Hausgemachtes Weiß- und Graubrot, Kochschinken, Gouda-Käse, Bolognesesauce", nl: "Huisgemaakt wit en bruin brood, gekookte ham, Goudakaas, bolognesesaus", es: "Pan casero blanco y moreno, jamón cocido, queso Gouda, salsa boloñesa", it: "Pane fatto in casa bianco e scuro, prosciutto cotto, formaggio Gouda, salsa alla bolognese" },
        },
        "croque-madame-115": {
          description: { en: "Homemade white and brown bread, cooked ham, Gouda cheese, fried egg", de: "Hausgemachtes Weiß- und Graubrot, Kochschinken, Gouda-Käse, Spiegelei", nl: "Huisgemaakt wit en bruin brood, gekookte ham, Goudakaas, spiegelei", es: "Pan casero blanco y moreno, jamón cocido, queso Gouda, huevo frito", it: "Pane fatto in casa bianco e scuro, prosciutto cotto, formaggio Gouda, uovo all'occhio di bue" },
        },
        "croque-ardennais-116": {
          description: { en: "Ciabatta, Ardennes ham, apples, goat cheese, bacon, Liège syrup coulis", de: "Ciabatta, Ardenner Schinken, Äpfel, Ziegenkäse, Speckwürfel, Lütticher Sirup-Sauce", nl: "Ciabatta, Ardense ham, appels, geitenkaas, spekjes, coulis van Luikse siroop", es: "Ciabatta, jamón de las Ardenas, manzanas, queso de cabra, tocino, coulis de sirope de Lieja", it: "Ciabatta, prosciutto delle Ardenne, mele, formaggio di capra, pancetta, coulis di sciroppo di Liegi" },
        },
      },
    },
  },
} satisfies RestaurantMenuTranslations

export function getMenuTranslation(
  fallback: string,
  translations: MenuLocalizedText | undefined,
  lang: string,
) {
  if (lang === "fr" || lang === "duck") return fallback

  const translated = translations?.[lang as MenuTranslationLang]?.trim()

  return translated || fallback
}
