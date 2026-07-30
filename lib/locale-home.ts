import type { AnyLocale } from './locales';

/**
 * 언어별 첫 화면에 무엇을 싣는지 한 곳에 모은다.
 *
 * /en/page.tsx는 섹션 21개를 그 파일 안에 배열로 들고 있었다. 언어가 둘일 때는
 * 그래도 됐지만 여덟이 되면 같은 배열이 여덟 벌 생기고, 섹션을 하나 번역할 때마다
 * 여덟 파일을 고쳐야 한다. 그중 하나를 빼먹으면 그 언어에서만 새 섹션이 보이지
 * 않는데, 링크가 깨지는 게 아니라 그냥 없어서 아무 검사에도 안 걸린다.
 *
 * 그래서 섹션마다 어느 언어에 있는지를 copy에 적는다. copy에 그 언어가 없으면
 * 첫 화면에 싣지 않는다 — 없는 페이지를 링크하면 404이자 끊어진 내부 링크다.
 * 섹션을 새 언어로 번역하면 여기 한 줄만 늘리면 그 언어의 첫 화면이 같이 자란다.
 *
 * 한국어(ko)는 app/page.tsx가 따로 있다. 원본이라 문구도 구성도 다른 길을 걸어와서
 * 여기에 억지로 맞추면 양쪽이 다 나빠진다.
 */

type Copy = { title: string; desc: string };

export type HomeSection = {
  /** 언어 접두어를 뺀 경로 */
  route: string;
  icon: string;
  /** 카드 배경 원의 그라디언트 */
  color: string;
  accent: string;
  border: string;
  bg: string;
  /** 이 섹션이 있는 언어만 적는다 */
  copy: Partial<Record<AnyLocale, Copy>>;
};

const SECTIONS: HomeSection[] = [
  {
    route: '/convert', icon: '📐', color: 'from-slate-500 to-slate-700',
    accent: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', bg: 'bg-slate-50 dark:bg-slate-800/40',
    copy: {
      en: { title: 'Unit Converter', desc: 'Length, weight, temperature, area and more' },
      es: { title: 'Conversor de unidades', desc: 'Longitud, peso, temperatura, superficie y más' },
      'pt-br': { title: 'Conversor de unidades', desc: 'Comprimento, peso, temperatura, área e mais' },
      ja: { title: '単位変換', desc: '長さ・重さ・温度・面積・データ量まで100種' },
      de: { title: 'Einheitenrechner', desc: 'Länge, Gewicht, Temperatur, Fläche und mehr' },
      fr: { title: 'Convertisseur d’unités', desc: 'Longueur, poids, température, surface et plus' },
      hi: { title: 'इकाई कनवर्टर', desc: 'लंबाई, वज़न, तापमान, क्षेत्रफल और बहुत कुछ' },
    },
  },
  {
    route: '/checklist', icon: '✅', color: 'from-sky-400 to-cyan-600',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Checklists', desc: 'Moving, travel, interviews, camping, weddings' },
    },
  },
  {
    route: '/test', icon: '🧭', color: 'from-violet-500 to-pink-600',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Personality Tests', desc: 'Social battery, stress, decisions, work style' },
    },
  },
  {
    route: '/quiz', icon: '🏆', color: 'from-amber-400 to-orange-500',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Quizzes', desc: 'Capitals, science, history, tech, film' },
    },
  },
  {
    route: '/generator', icon: '⚙️', color: 'from-emerald-400 to-teal-600',
    accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    copy: {
      en: { title: 'Name Generators', desc: 'Fantasy, sci-fi, superhero, villain names' },
    },
  },
  {
    route: '/random', icon: '🎲', color: 'from-rose-500 to-pink-600',
    accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30',
    copy: {
      en: { title: 'Random Pickers', desc: 'Wheel, name picker, teams, dice, Secret Santa' },
      es: { title: 'Sorteos al azar', desc: 'Ruleta, nombres, equipos, dados, amigo invisible' },
      'pt-br': { title: 'Sorteios aleatórios', desc: 'Roleta, nomes, times, dados, amigo secreto' },
      ja: { title: 'ランダム選び', desc: 'ルーレット、あみだくじ、チーム分け、サイコロ' },
      de: { title: 'Zufallswerkzeuge', desc: 'Glücksrad, Namen ziehen, Teams, Würfel, Wichteln' },
      fr: { title: 'Tirage au sort', desc: 'Roue, tirage de noms, équipes, dés, Père Noël secret' },
      hi: { title: 'रैंडम चुनाव', desc: 'चक्का, नाम, टीम, पासा, सीक्रेट सैंटा' },
    },
  },
  {
    route: '/snap', icon: '📸', color: 'from-fuchsia-500 to-sky-500',
    accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    copy: {
      en: { title: 'Snap Tests', desc: 'One photo: smile score, symmetry, face reading' },
    },
  },
  {
    route: '/fortune', icon: '🔮', color: 'from-violet-500 to-purple-700',
    accent: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-900/50', bg: 'bg-purple-50 dark:bg-purple-950/30',
    copy: {
      en: { title: 'Horoscopes', desc: 'Star signs, Chinese zodiac, tarot, BaZi' },
    },
  },
  {
    route: '/fortune/card', icon: '🃏', color: 'from-violet-500 to-fuchsia-500',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Tarot Card Meanings', desc: 'All 78 cards, upright and reversed, major and minor arcana' },
      es: { title: 'Significado del tarot', desc: 'Las 78 cartas al derecho y al revés, arcanos mayores y menores' },
      'pt-br': { title: 'Significado do tarô', desc: 'As 78 cartas normais e invertidas, arcanos maiores e menores' },
      ja: { title: 'タロットの意味', desc: '78枚すべての正位置・逆位置、大小アルカナ' },
      de: { title: 'Tarot-Bedeutungen', desc: 'Alle 78 Karten, aufrecht und umgekehrt, große und kleine Arkana' },
      fr: { title: 'Signification du tarot', desc: "Les 78 cartes à l'endroit et à l'envers, arcanes majeurs et mineurs" },
      hi: { title: 'टैरो कार्ड के अर्थ', desc: 'सभी 78 पत्ते — सीधे और उल्टे, बड़े और छोटे आर्काना' },
    },
  },
  {
    route: '/time', icon: '⏱️', color: 'from-sky-400 to-cyan-600',
    accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    copy: {
      en: { title: 'Time Tools', desc: 'Timer, stopwatch, world clock, date maths' },
      es: { title: 'Herramientas de tiempo', desc: 'Temporizador, cronómetro, reloj mundial, fechas' },
      'pt-br': { title: 'Ferramentas de tempo', desc: 'Timer, cronômetro, relógio mundial, datas' },
      ja: { title: '時間ツール', desc: 'タイマー・ストップウォッチ・世界時計・日付計算' },
      de: { title: 'Zeitwerkzeuge', desc: 'Timer, Stoppuhr, Weltzeituhr, Datumsrechnen' },
      fr: { title: 'Outils de temps', desc: 'Minuteur, chronomètre, horloge mondiale, dates' },
      hi: { title: 'समय उपकरण', desc: 'टाइमर, स्टॉपवॉच, विश्व घड़ी, तारीख़ गणित' },
    },
  },
  {
    route: '/color', icon: '🎨', color: 'from-fuchsia-500 to-rose-500',
    accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    copy: {
      en: { title: 'Colour Tools', desc: 'Palette, shades, contrast, CSS gradient' },
      es: { title: 'Herramientas de color', desc: 'Paletas, tonos, contraste, degradados CSS' },
      'pt-br': { title: 'Ferramentas de cor', desc: 'Paletas, tons, contraste, gradiente CSS' },
      ja: { title: 'カラーツール', desc: '配色・色段階・コントラスト比・CSSグラデーション' },
      de: { title: 'Farbwerkzeuge', desc: 'Paletten, Abstufungen, Kontrast, CSS-Verläufe' },
      fr: { title: 'Outils de couleur', desc: 'Palettes, nuances, contraste, dégradés CSS' },
      hi: { title: 'रंग उपकरण', desc: 'पैलेट, शेड, कंट्रास्ट, CSS ग्रेडिएंट' },
    },
  },
  {
    route: '/image', icon: '🖼️', color: 'from-violet-500 to-indigo-600',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Image Tools', desc: 'Compress, resize, crop, blur faces' },
      es: { title: 'Herramientas de imagen', desc: 'Comprimir, redimensionar, recortar, pixelar caras' },
      'pt-br': { title: 'Ferramentas de imagem', desc: 'Comprimir, redimensionar, recortar, pixelar rostos' },
      ja: { title: '画像ツール', desc: '圧縮・サイズ変更・切り抜き・顔のモザイク' },
      de: { title: 'Bildwerkzeuge', desc: 'Komprimieren, skalieren, zuschneiden, Gesichter verpixeln' },
      fr: { title: 'Outils d’image', desc: 'Compresser, redimensionner, recadrer, pixeliser des visages' },
      hi: { title: 'इमेज उपकरण', desc: 'कंप्रेस, आकार बदलना, क्रॉप, चेहरे पिक्सेल करना' },
    },
  },
  {
    route: '/sound', icon: '🔊', color: 'from-indigo-500 to-violet-600',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Sound Tools', desc: 'Metronome, tuner, white noise, tone' },
      es: { title: 'Herramientas de sonido', desc: 'Metrónomo, afinador, ruido blanco, tonos' },
      'pt-br': { title: 'Ferramentas de som', desc: 'Metrônomo, afinador, ruído branco, tons' },
      ja: { title: 'サウンドツール', desc: 'メトロノーム・チューナー・ホワイトノイズ・トーン' },
      de: { title: 'Klangwerkzeuge', desc: 'Metronom, Stimmgerät, Rauschen, Töne' },
      fr: { title: 'Outils de son', desc: 'Métronome, accordeur, bruit blanc, tons' },
      hi: { title: 'ध्वनि उपकरण', desc: 'मेट्रोनोम, ट्यूनर, व्हाइट नॉइज़, टोन' },
    },
  },
  {
    route: '/food', icon: '🍳', color: 'from-amber-500 to-orange-600',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Cooking Tools', desc: 'Cups to grams, oven temp, rice, coffee' },
      es: { title: 'Herramientas de cocina', desc: 'Tazas a gramos, horno, arroz, café' },
      'pt-br': { title: 'Ferramentas de cozinha', desc: 'Xícaras para gramas, forno, arroz, café' },
      ja: { title: '料理ツール', desc: 'カップ→グラム・オーブン温度・水加減・コーヒー' },
      de: { title: 'Küchenwerkzeuge', desc: 'Cups in Gramm, Ofentemperatur, Reis, Kaffee' },
      fr: { title: 'Outils de cuisine', desc: 'Tasses en grammes, four, riz, café' },
      hi: { title: 'रसोई उपकरण', desc: 'कप से ग्राम, ओवन, चावल, कॉफ़ी' },
    },
  },
  {
    route: '/game', icon: '🎮', color: 'from-emerald-500 to-teal-600',
    accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    copy: {
      en: { title: 'Brain Games', desc: 'Reaction, memory, typing, aim, mental maths' },
      es: { title: 'Juegos mentales', desc: 'Reacción, memoria, escritura, puntería, cálculo' },
      'pt-br': { title: 'Jogos mentais', desc: 'Reação, memória, digitação, mira, cálculo' },
      ja: { title: '脳トレゲーム', desc: '反応速度・記憶・タイピング・エイム・暗算' },
      de: { title: 'Denkspiele', desc: 'Reaktion, Gedächtnis, Tippen, Zielen, Kopfrechnen' },
      fr: { title: 'Jeux de cerveau', desc: 'Réaction, mémoire, frappe, visée, calcul' },
      hi: { title: 'दिमाग़ी खेल', desc: 'प्रतिक्रिया, स्मृति, टाइपिंग, निशाना, गणित' },
    },
  },
  {
    route: '/device', icon: '🔧', color: 'from-sky-500 to-blue-600',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Device Tests', desc: 'Keyboard, mouse, mic, webcam, dead pixels' },
      es: { title: 'Tests de aparatos', desc: 'Teclado, ratón, micro, webcam, píxeles muertos' },
      'pt-br': { title: 'Testes de aparelho', desc: 'Teclado, mouse, microfone, webcam, pixel morto' },
      ja: { title: '端末チェック', desc: 'キーボード・マウス・マイク・カメラ・ドット抜け' },
      de: { title: 'Gerätetests', desc: 'Tastatur, Maus, Mikrofon, Webcam, Pixelfehler' },
      fr: { title: 'Tests d’appareil', desc: 'Clavier, souris, micro, webcam, pixels morts' },
      hi: { title: 'उपकरण जाँच', desc: 'कीबोर्ड, माउस, माइक, वेबकैम, डेड पिक्सेल' },
    },
  },
  {
    route: '/text', icon: '✏️', color: 'from-indigo-500 to-violet-600',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Text Tools', desc: 'Clean up, dedupe, case convert, count' },
      es: { title: 'Herramientas de texto', desc: 'Limpiar, deduplicar, mayúsculas, contar' },
      'pt-br': { title: 'Ferramentas de texto', desc: 'Limpar, deduplicar, maiúsculas, contar' },
      ja: { title: 'テキストツール', desc: '整形・重複削除・大文字小文字・文字数' },
      de: { title: 'Textwerkzeuge', desc: 'Aufräumen, Entdoppeln, Schreibweise, Zählen' },
      fr: { title: 'Outils de texte', desc: 'Nettoyer, dédoublonner, casse, compter' },
      hi: { title: 'टेक्स्ट उपकरण', desc: 'सफ़ाई, दोहराव हटाना, अक्षर-आकार, गिनती' },
    },
  },
  {
    route: '/rate', icon: '📊', color: 'from-orange-500 to-amber-600',
    accent: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-900/50', bg: 'bg-orange-50 dark:bg-orange-950/30',
    copy: {
      en: { title: 'Percent & Rate', desc: 'Discounts, VAT, percent change, compound interest' },
    },
  },
  {
    route: '/body', icon: '🎯', color: 'from-rose-500 to-red-600',
    accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30',
    copy: {
      en: { title: 'Body Metrics', desc: 'BMI, body fat, BMR, running pace, one-rep max' },
    },
  },
  {
    route: '/geometry', icon: '🔵', color: 'from-cyan-500 to-blue-600',
    accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    copy: {
      en: { title: 'Geometry', desc: 'Areas, volumes, Pythagoras, angles' },
    },
  },
  {
    route: '/country', icon: '🪙', color: 'from-teal-500 to-emerald-600',
    accent: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-900/50', bg: 'bg-teal-50 dark:bg-teal-950/30',
    copy: {
      en: { title: 'Country Facts', desc: 'Time difference, plugs, dialling codes, currency' },
    },
  },
  {
    route: '/metro', icon: '🚇', color: 'from-blue-500 to-indigo-600',
    accent: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-900/50', bg: 'bg-blue-50 dark:bg-blue-950/30',
    copy: {
      en: { title: 'Metro Station Quiz', desc: 'Type the stations of 30 lines from Seoul to São Paulo' },
      es: { title: 'Juego de estaciones de metro', desc: 'Escribe las estaciones de 30 líneas, de Madrid a Seúl' },
      'pt-br': { title: 'Jogo das estações de metrô', desc: 'Digite as estações de 30 linhas, de São Paulo a Seul' },
      ja: { title: '駅名当てゲーム', desc: '東京から大阪まで30路線の駅名を順に入力' },
      de: { title: 'U-Bahn-Stationen-Quiz', desc: 'Stationen von 30 Linien tippen — Berlin bis Seoul' },
      fr: { title: 'Quiz des stations de métro', desc: 'Tapez les stations de 30 lignes, de Paris à Séoul' },
      hi: { title: 'मेट्रो स्टेशन क्विज़', desc: 'दिल्ली से सिओल तक 30 लाइनों के स्टेशन टाइप करें' },
    },
  },
  {
    route: '/ext', icon: '📄', color: 'from-indigo-500 to-violet-600',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'File Extensions', desc: 'What opens .hwp, .webp, .mkv — 140 extensions and their MIME types' },
      es: { title: 'Extensiones de archivo', desc: 'Con qué se abren .webp, .mkv y otras 140 extensiones, con su tipo MIME' },
      'pt-br': { title: 'Extensões de arquivo', desc: 'O que abre .webp, .mkv e outras 140 extensões, com o tipo MIME' },
      ja: { title: 'ファイル拡張子', desc: '.webp や .mkv は何で開く? 拡張子140種とMIMEタイプ' },
      de: { title: 'Dateiendungen', desc: 'Womit man .webp, .mkv und 140 weitere Endungen öffnet — samt MIME-Typ' },
      fr: { title: 'Extensions de fichier', desc: 'Avec quoi ouvrir .webp, .mkv et 140 autres extensions, avec leur type MIME' },
      hi: { title: 'फ़ाइल एक्सटेंशन', desc: '.webp, .mkv समेत 140 एक्सटेंशन किससे खुलते हैं और उनका MIME टाइप' },
    },
  },
  {
    route: '/text/regex', icon: '🔤', color: 'from-sky-500 to-indigo-500',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Regex Patterns', desc: '133 tested expressions, each with matching and non-matching examples' },
      es: { title: 'Patrones de regex', desc: '133 expresiones probadas, con ejemplos que coinciden y que no' },
      'pt-br': { title: 'Padrões de regex', desc: '133 expressões testadas, com exemplos que casam e que não casam' },
      ja: { title: '正規表現集', desc: '検査済みの式133種、合う例と合わない例つき' },
      de: { title: 'Regex-Muster', desc: '133 geprüfte Ausdrücke mit passenden und unpassenden Beispielen' },
      fr: { title: 'Motifs regex', desc: '133 expressions testées, avec exemples correspondants et non correspondants' },
      hi: { title: 'रेगेक्स पैटर्न', desc: '133 परखे हुए एक्सप्रेशन, मिलने और न मिलने वाले उदाहरणों के साथ' },
    },
  },
  {
    route: '/random/dice', icon: '🎲', color: 'from-rose-600 to-orange-500',
    accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30',
    copy: {
      en: { title: 'Dice Odds', desc: 'Every sum from one to six dice, with the ways and the odds' },
      es: { title: 'Probabilidad de dados', desc: 'Cada suma de uno a seis dados, con formas y probabilidad' },
      'pt-br': { title: 'Probabilidade dos dados', desc: 'Cada soma de um a seis dados, com formas e chance' },
      ja: { title: 'サイコロの確率', desc: '1個から6個までの合計ごとの場合の数と確率' },
      de: { title: 'Würfelwahrscheinlichkeit', desc: 'Jede Summe von einem bis sechs Würfeln, mit Wegen und Chance' },
      fr: { title: 'Probabilités aux dés', desc: 'Chaque somme de un à six dés, avec combinaisons et probabilité' },
      hi: { title: 'पासे की संभावना', desc: 'एक से छह पासों के हर जोड़ के तरीक़े और संभावना' },
    },
  },
  {
    route: '/game/cube', icon: '🧩', color: 'from-amber-500 to-rose-500',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Rubik’s Cube Algorithms', desc: 'All 119 F2L, OLL and PLL cases with diagrams' },
      es: { title: 'Algoritmos del cubo de Rubik', desc: 'Los 119 casos de F2L, OLL y PLL con diagramas' },
      'pt-br': { title: 'Algoritmos do cubo mágico', desc: 'Os 119 casos de F2L, OLL e PLL com diagramas' },
      ja: { title: 'キューブの手順', desc: 'F2L・OLL・PLL 119種を図つきで' },
      de: { title: 'Zauberwürfel-Algorithmen', desc: 'Alle 119 F2L-, OLL- und PLL-Fälle mit Diagrammen' },
      fr: { title: 'Algorithmes du Rubik’s cube', desc: 'Les 119 cas de F2L, OLL et PLL avec schémas' },
      hi: { title: 'रूबिक क्यूब एल्गोरिद्म', desc: 'F2L, OLL और PLL के सभी 119 मामले चित्रों के साथ' },
    },
  },
  {
    route: '/snap/lens', icon: '📷', color: 'from-indigo-600 to-violet-500',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Lens Angle of View', desc: 'What 104 focal length and sensor pairs actually frame' },
      es: { title: 'Ángulo de visión de objetivos', desc: 'Qué encuadran de verdad 104 pares de focal y sensor' },
      'pt-br': { title: 'Ângulo de visão das lentes', desc: 'O que 104 pares de focal e sensor realmente enquadram' },
      ja: { title: 'レンズの画角', desc: '焦点距離とセンサー104通りで実際に写る範囲' },
      de: { title: 'Bildwinkel von Objektiven', desc: 'Was 104 Kombinationen aus Brennweite und Sensor erfassen' },
      fr: { title: 'Angle de champ des objectifs', desc: 'Ce que cadrent vraiment 104 couples focale et capteur' },
      hi: { title: 'लेंस का दृश्य कोण', desc: 'फ़ोकल लंबाई और सेंसर के 104 जोड़े क्या समेटते हैं' },
    },
  },
  {
    route: '/http', icon: '🗄️', color: 'from-teal-600 to-emerald-500',
    accent: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-900/50', bg: 'bg-teal-50 dark:bg-teal-950/30',
    copy: {
      en: { title: 'HTTP Codes and Headers', desc: 'What 404, 500 and 132 codes and headers mean' },
      es: { title: 'Códigos y cabeceras HTTP', desc: 'Qué significan 404, 500 y otros 132 códigos y cabeceras' },
      'pt-br': { title: 'Códigos e cabeçalhos HTTP', desc: 'O que significam 404, 500 e outros 132 itens' },
      ja: { title: 'HTTPコードとヘッダー', desc: '404や500など132のコードとヘッダーの意味' },
      de: { title: 'HTTP-Codes und -Header', desc: 'Was 404, 500 und 132 weitere bedeuten' },
      fr: { title: 'Codes et en-têtes HTTP', desc: 'Ce que signifient 404, 500 et 132 autres' },
      hi: { title: 'HTTP कोड और हेडर', desc: '404, 500 समेत 132 कोड और हेडर का अर्थ' },
    },
  },
  {
    route: '/css', icon: '🎨', color: 'from-blue-600 to-sky-500',
    accent: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-900/50', bg: 'bg-blue-50 dark:bg-blue-950/30',
    copy: {
      en: { title: 'CSS Property Reference', desc: 'What 154 properties do, their values and whether they inherit' },
      es: { title: 'Referencia de propiedades CSS', desc: 'Qué hacen 154 propiedades, sus valores y si se heredan' },
      'pt-br': { title: 'Referência de propriedades CSS', desc: 'O que 154 propriedades fazem, seus valores e se herdam' },
      ja: { title: 'CSSプロパティ辞典', desc: '154プロパティの役割・よく使う値・継承の有無' },
      de: { title: 'CSS-Eigenschaften-Referenz', desc: 'Was 154 Eigenschaften tun, ihre Werte und ob sie vererben' },
      fr: { title: 'Référence des propriétés CSS', desc: 'Ce que font 154 propriétés, leurs valeurs et leur héritage' },
      hi: { title: 'CSS प्रॉपर्टी संदर्भ', desc: '154 प्रॉपर्टी क्या करती हैं, उनके मान और विरासत' },
    },
  },
  {
    route: '/html', icon: '🪟', color: 'from-orange-500 to-amber-500',
    accent: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-900/50', bg: 'bg-orange-50 dark:bg-orange-950/30',
    copy: {
      en: { title: 'HTML Tag Reference', desc: 'What 126 tags do, whether they close, and their attributes' },
      es: { title: 'Referencia de etiquetas HTML', desc: 'Qué hacen 126 etiquetas, si se cierran y sus atributos' },
      'pt-br': { title: 'Referência de tags HTML', desc: 'O que 126 tags fazem, se fecham e seus atributos' },
      ja: { title: 'HTMLタグ辞典', desc: '126タグの役割・閉じタグの要否・よく使う属性' },
      de: { title: 'HTML-Tag-Referenz', desc: 'Was 126 Tags tun, ob sie schließen und welche Attribute sie haben' },
      fr: { title: 'Référence des balises HTML', desc: 'Ce que font 126 balises, leur fermeture et leurs attributs' },
      hi: { title: 'HTML टैग संदर्भ', desc: '126 टैग क्या करते हैं, बंद होते हैं या नहीं, और उनके विशेषण' },
    },
  },
  {
    route: '/music', icon: '🎹', color: 'from-sky-500 to-indigo-600',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Chords and Scales', desc: 'Notes of 135 chords, scales and intervals, with sound' },
      es: { title: 'Acordes y escalas', desc: 'Notas de 135 acordes, escalas e intervalos, con sonido' },
      'pt-br': { title: 'Acordes e escalas', desc: 'Notas de 135 acordes, escalas e intervalos, com som' },
      ja: { title: 'コードとスケール', desc: 'コード・スケール・音程135種の構成音を鍵盤と音で' },
      de: { title: 'Akkorde und Tonleitern', desc: 'Töne von 135 Akkorden, Tonleitern und Intervallen, mit Klang' },
      fr: { title: 'Accords et gammes', desc: 'Notes de 135 accords, gammes et intervalles, avec le son' },
      hi: { title: 'कॉर्ड और स्केल', desc: '135 कॉर्ड, स्केल और अंतरालों के स्वर — कीबोर्ड और ध्वनि के साथ' },
    },
  },
  {
    route: '/hanja', icon: '🀄', color: 'from-amber-600 to-yellow-700',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Four-Character Idioms', desc: 'Fifty Korean idioms with meaning and origin' },
    },
  },
];

/** 그 언어의 첫 화면에 실을 섹션. 선언 순서를 지킨다 */
export function homeSections(lang: AnyLocale): (Omit<HomeSection, 'copy'> & Copy)[] {
  return SECTIONS.flatMap(s => {
    const c = s.copy[lang];
    if (!c) return [];
    const { copy: _copy, ...rest } = s;
    return [{ ...rest, ...c }];
  });
}

/** 그 언어에 이 섹션이 있는지 — LangPicker의 available을 만들 때 쓴다 */
export function localesWithSection(route: string): AnyLocale[] {
  const s = SECTIONS.find(x => x.route === route);
  return s ? (Object.keys(s.copy) as AnyLocale[]) : [];
}

export type HomeUi = {
  metaTitle: string;
  metaDesc: string;
  /** 로고 옆 스크린리더용 설명 */
  srTagline: string;
  tagline: string;
  /** 카드 안의 "열기" */
  open: string;
  /** 통합 검색이 있는 언어만. 없으면 검색 줄을 그리지 않는다 */
  search?: { placeholder: string; cta: string };
  notice: string;
};

export const HOME_UI: Record<Exclude<AnyLocale, 'ko'>, HomeUi> = {
  en: {
    metaTitle: 'vixutil — Free Everyday Tools',
    metaDesc: 'Free tools that run in your browser: unit conversion, checklists, quizzes, personality tests, name generators, random pickers, photo tests and daily horoscopes. No sign-up.',
    srTagline: ' — free everyday tools',
    tagline: 'Free tools that run in your browser',
    open: 'Open',
    search: { placeholder: 'Timer, dead pixel, cups to grams…', cta: 'Search all' },
    notice: 'Everything here runs in your browser. Nothing is uploaded, nothing needs an account.',
  },
  es: {
    metaTitle: 'vixutil — Herramientas gratis para el día a día',
    metaDesc: 'Herramientas gratis que funcionan en tu navegador: generador de paletas, escala de tonos, comprobador de contraste y degradados CSS. Sin registro.',
    srTagline: ' — herramientas gratis para el día a día',
    tagline: 'Herramientas gratis que funcionan en tu navegador',
    open: 'Abrir',
    notice: 'Todo funciona en tu navegador. No se sube nada y no hace falta cuenta.',
  },
  'pt-br': {
    metaTitle: 'vixutil — Ferramentas grátis para o dia a dia',
    metaDesc: 'Ferramentas grátis que rodam no seu navegador: gerador de paletas, escala de tons, verificador de contraste e gradiente CSS. Sem cadastro.',
    srTagline: ' — ferramentas grátis para o dia a dia',
    tagline: 'Ferramentas grátis que rodam no seu navegador',
    open: 'Abrir',
    notice: 'Tudo roda no seu navegador. Nada é enviado e não precisa de cadastro.',
  },
  ja: {
    metaTitle: 'vixutil — 無料の便利ツール',
    metaDesc: 'ブラウザで動く無料ツール：カラーパレット作成、色段階、コントラスト比チェック、CSSグラデーション。登録は不要です。',
    srTagline: '— 無料の便利ツール',
    tagline: 'ブラウザで動く無料ツール',
    open: '開く',
    notice: 'すべてブラウザの中で動きます。データはどこにも送られず、アカウントも必要ありません。',
  },
  de: {
    metaTitle: 'vixutil — Kostenlose Alltagswerkzeuge',
    metaDesc: 'Kostenlose Werkzeuge direkt im Browser: Palettengenerator, Farbabstufungen, Kontrast-Prüfer und CSS-Verläufe. Ohne Anmeldung.',
    srTagline: ' — kostenlose Alltagswerkzeuge',
    tagline: 'Kostenlose Werkzeuge, die im Browser laufen',
    open: 'Öffnen',
    notice: 'Alles läuft in deinem Browser. Nichts wird hochgeladen, ein Konto brauchst du nicht.',
  },
  fr: {
    metaTitle: 'vixutil — Outils gratuits du quotidien',
    metaDesc: 'Des outils gratuits qui tournent dans ton navigateur : générateur de palettes, échelle de nuances, vérificateur de contraste et dégradés CSS. Sans inscription.',
    srTagline: ' — outils gratuits du quotidien',
    tagline: 'Des outils gratuits qui tournent dans ton navigateur',
    open: 'Ouvrir',
    notice: 'Tout tourne dans ton navigateur. Rien n’est envoyé, aucun compte n’est nécessaire.',
  },
  hi: {
    metaTitle: 'vixutil — रोज़मर्रा के मुफ़्त उपकरण',
    metaDesc: 'ब्राउज़र में चलने वाले मुफ़्त उपकरण: पैलेट जनरेटर, शेड श्रेणी, कंट्रास्ट जाँच और CSS ग्रेडिएंट। रजिस्ट्रेशन की ज़रूरत नहीं।',
    srTagline: ' — रोज़मर्रा के मुफ़्त उपकरण',
    tagline: 'ब्राउज़र में चलने वाले मुफ़्त उपकरण',
    open: 'खोलें',
    notice: 'सब कुछ आपके ब्राउज़र में चलता है। कुछ भी अपलोड नहीं होता और खाते की ज़रूरत नहीं।',
  },
};
