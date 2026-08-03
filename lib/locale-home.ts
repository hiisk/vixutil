import type { AnyLocale10 } from './locales';

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
  copy: Partial<Record<AnyLocale10, Copy>>;
};

const SECTIONS: HomeSection[] = [
  {
    route: '/calculator', icon: '🧮', color: 'from-blue-500 to-indigo-600',
    accent: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-900/50', bg: 'bg-blue-50 dark:bg-blue-950/30',
    copy: {
      en: { title: 'Calculators', desc: 'Health, money, dates and developer tools' },
      es: { title: 'Calculadoras', desc: 'Salud, dinero, fechas y herramientas de programación' },
      'pt-br': { title: 'Calculadoras', desc: 'Saúde, dinheiro, datas e ferramentas de desenvolvimento' },
      ja: { title: '計算機', desc: '健康・お金・日付・開発者向けツール' },
      de: { title: 'Rechner', desc: 'Gesundheit, Geld, Datum und Entwickler-Werkzeuge' },
      fr: { title: 'Calculatrices', desc: 'Santé, argent, dates et outils pour développeurs' },
      hi: { title: 'कैलकुलेटर', desc: 'सेहत, पैसा, तारीख़ें और डेवलपर टूल' },
      'zh-hans': { title: '计算器', desc: '健康、理财、日期和开发者工具' },
      'zh-hant': { title: '計算機', desc: '健康、理財、日期和開發者工具' },
    },
  },
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
      es: { title: 'Listas de comprobación', desc: 'Mudanza, viajes, entrevistas, acampada, bodas' },
      'pt-br': { title: 'Checklists', desc: 'Mudança, viagem, entrevistas, acampamento, casamento' },
      ja: { title: 'チェックリスト', desc: '引っ越し・旅行・面接・キャンプ・結婚式' },
      de: { title: 'Checklisten', desc: 'Umzug, Reise, Bewerbung, Camping, Hochzeit' },
      fr: { title: 'Checklists', desc: 'Déménagement, voyage, entretien, camping, mariage' },
      hi: { title: 'चेकलिस्ट', desc: 'घर बदलना, यात्रा, इंटरव्यू, कैंपिंग, शादी' },
      'zh-hans': { title: '清单', desc: '搬家、旅行、面试、露营、婚礼' },
      'zh-hant': { title: '清單', desc: '搬家、旅行、面試、露營、婚禮' },
    },
  },
  {
    route: '/test', icon: '🧭', color: 'from-violet-500 to-pink-600',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Personality Tests', desc: 'Social battery, stress, decisions, work style' },
      es: { title: 'Tests de personalidad', desc: 'Batería social, estrés, decisiones, forma de trabajar' },
      'pt-br': { title: 'Testes de personalidade', desc: 'Bateria social, estresse, decisões, jeito de trabalhar' },
      ja: { title: '心理テスト', desc: 'ソーシャルバッテリー・ストレス・決め方・仕事のスタイル' },
      de: { title: 'Persönlichkeitstests', desc: 'Social Battery, Stress, Entscheidungen, Arbeitsstil' },
      fr: { title: 'Tests de personnalité', desc: 'Batterie sociale, stress, décisions, façon de travailler' },
      hi: { title: 'पर्सनैलिटी टेस्ट', desc: 'सोशल बैटरी, तनाव, फ़ैसले, काम करने का तरीक़ा' },
      'zh-hans': { title: '心理测试', desc: '社交电量、压力、决策方式、工作方式' },
      'zh-hant': { title: '心理測驗', desc: '社交電量、壓力、決策方式、工作方式' },
    },
  },
  {
    route: '/quiz', icon: '🏆', color: 'from-amber-400 to-orange-500',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Quizzes', desc: 'Capitals, science, history, tech, film' },
      es: { title: 'Tests de conocimiento', desc: 'Capitales, ciencia, historia, tecnología, cine' },
      'pt-br': { title: 'Quizzes', desc: 'Capitais, ciência, história, tecnologia, cinema' },
      ja: { title: 'クイズ', desc: '首都・科学・歴史・テクノロジー・映画' },
      de: { title: 'Quiz', desc: 'Hauptstädte, Wissenschaft, Geschichte, Technik, Film' },
      fr: { title: 'Quiz', desc: 'Capitales, sciences, histoire, technologie, cinéma' },
      hi: { title: 'क्विज़', desc: 'राजधानियाँ, विज्ञान, इतिहास, तकनीक, सिनेमा' },
      'zh-hans': { title: '知识测验', desc: '首都、科学、历史、科技、电影' },
      'zh-hant': { title: '知識測驗', desc: '首都、科學、歷史、科技、電影' },
    },
  },
  {
    route: '/generator', icon: '⚙️', color: 'from-emerald-400 to-teal-600',
    accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    copy: {
      en: { title: 'Name Generators', desc: 'Fantasy, sci-fi, superhero, villain names' },
      es: { title: 'Generadores de nombres', desc: 'Fantasía, ciencia ficción, superhéroes, villanos' },
      'pt-br': { title: 'Geradores de nomes', desc: 'Fantasia, ficção científica, super-heróis, vilões' },
      ja: { title: '名前ジェネレーター', desc: 'ファンタジー・SF・ヒーロー・悪役の名前' },
      de: { title: 'Namensgeneratoren', desc: 'Fantasy, Sci-Fi, Superhelden, Schurken' },
      fr: { title: 'Générateurs de noms', desc: 'Fantasy, science-fiction, super-héros, méchants' },
      hi: { title: 'नाम जनरेटर', desc: 'फैंटेसी, साइ-फ़ाई, सुपरहीरो, विलेन' },
      'zh-hans': { title: '名字生成器', desc: '奇幻、科幻、超级英雄、反派' },
      'zh-hant': { title: '名字產生器', desc: '奇幻、科幻、超級英雄、反派' },
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
      es: { title: 'Tests de foto', desc: 'Una foto: sonrisa, simetría, lectura del rostro' },
      'pt-br': { title: 'Testes de foto', desc: 'Uma foto: sorriso, simetria, leitura de rosto' },
      ja: { title: 'スナップテスト', desc: '写真1枚でスマイル指数・左右対称・顔相' },
      de: { title: 'Foto-Tests', desc: 'Ein Foto: Lächel-Index, Symmetrie, Gesichtsdeutung' },
      fr: { title: 'Tests photo', desc: 'Une photo : sourire, symétrie, lecture du visage' },
      hi: { title: 'फ़ोटो टेस्ट', desc: 'एक फ़ोटो: मुस्कान स्कोर, समरूपता, चेहरा पढ़ना' },
      'zh-hans': { title: '拍照测验', desc: '一张照片：微笑指数、对称、面相' },
      'zh-hant': { title: '拍照測驗', desc: '一張照片：微笑指數、對稱、面相' },
    },
  },
  {
    route: '/fortune', icon: '🔮', color: 'from-violet-500 to-purple-700',
    accent: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-900/50', bg: 'bg-purple-50 dark:bg-purple-950/30',
    copy: {
      en: { title: 'Horoscopes', desc: 'Star signs, Chinese zodiac, tarot, BaZi' },
      es: { title: 'Horóscopos', desc: 'Signos, horóscopo chino, tarot, BaZi' },
      'pt-br': { title: 'Horóscopos', desc: 'Signos, horóscopo chinês, tarô, BaZi' },
      ja: { title: '占い', desc: '星座・干支・タロット・四柱推命' },
      de: { title: 'Horoskope', desc: 'Sternzeichen, chinesischer Tierkreis, Tarot, BaZi' },
      fr: { title: 'Horoscopes', desc: 'Signes, horoscope chinois, tarot, BaZi' },
      hi: { title: 'राशिफल', desc: 'राशियाँ, चीनी राशिचक्र, टैरो, बाज़ी' },
      'zh-hans': { title: '运势', desc: '星座、生肖、塔罗、八字' },
      'zh-hant': { title: '運勢', desc: '星座、生肖、塔羅、八字' },
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
      es: { title: 'Porcentajes y proporciones', desc: 'Descuentos, IVA, variación porcentual, interés compuesto' },
      'pt-br': { title: 'Porcentagem e proporção', desc: 'Descontos, impostos, variação percentual, juros compostos' },
      ja: { title: '割合の計算', desc: '割引・消費税・変化率・複利まで100種' },
      de: { title: 'Prozent und Verhältnis', desc: 'Rabatte, Mehrwertsteuer, Veränderung, Zinseszins' },
      fr: { title: 'Pourcentages et rapports', desc: 'Remises, TVA, variation, intérêts composés' },
      hi: { title: 'प्रतिशत और अनुपात', desc: 'छूट, GST, प्रतिशत बदलाव, चक्रवृद्धि ब्याज' },
    },
  },
  {
    route: '/body', icon: '🎯', color: 'from-rose-500 to-red-600',
    accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30',
    copy: {
      en: { title: 'Body Metrics', desc: 'BMI, body fat, BMR, running pace, one-rep max' },
      es: { title: 'Medidas del cuerpo', desc: 'IMC, grasa corporal, metabolismo basal, ritmo, 1RM' },
      'pt-br': { title: 'Medidas do corpo', desc: 'IMC, gordura corporal, metabolismo basal, ritmo, 1RM' },
      ja: { title: '体の数値', desc: 'BMI・体脂肪率・基礎代謝・ペース・1RM' },
      de: { title: 'Körperwerte', desc: 'BMI, Körperfett, Grundumsatz, Lauftempo, 1RM' },
      fr: { title: 'Mesures du corps', desc: 'IMC, masse grasse, métabolisme de base, allure, 1RM' },
      hi: { title: 'शरीर के आँकड़े', desc: 'BMI, शरीर की वसा, बेसल चयापचय, दौड़ की रफ़्तार, 1RM' },
    },
  },
  {
    route: '/geometry', icon: '🔵', color: 'from-cyan-500 to-blue-600',
    accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    copy: {
      en: { title: 'Geometry', desc: 'Areas, volumes, Pythagoras, angles' },
      es: { title: 'Geometría', desc: 'Áreas, volúmenes, Pitágoras, ángulos' },
      'pt-br': { title: 'Geometria', desc: 'Áreas, volumes, Pitágoras, ângulos' },
      ja: { title: '図形・数学', desc: '面積・体積・三平方の定理・角度' },
      de: { title: 'Geometrie', desc: 'Flächen, Volumen, Pythagoras, Winkel' },
      fr: { title: 'Géométrie', desc: 'Aires, volumes, Pythagore, angles' },
      hi: { title: 'ज्यामिति', desc: 'क्षेत्रफल, आयतन, पाइथागोरस, कोण' },
    },
  },
  {
    route: '/country', icon: '🪙', color: 'from-teal-500 to-emerald-600',
    accent: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-900/50', bg: 'bg-teal-50 dark:bg-teal-950/30',
    copy: {
      en: { title: 'Country Facts', desc: 'Time difference, plugs, dialling codes, currency' },
      es: { title: 'Datos por país', desc: 'Diferencia horaria, enchufes, prefijos, moneda' },
      'pt-br': { title: 'Dados por país', desc: 'Fuso, tomadas, código do país, moeda' },
      ja: { title: '国の情報', desc: '時差・プラグ・国番号・通貨' },
      de: { title: 'Länderinfos', desc: 'Zeitverschiebung, Stecker, Vorwahl, Währung' },
      fr: { title: 'Fiches pays', desc: 'Décalage horaire, prises, indicatif, monnaie' },
      hi: { title: 'देशों की जानकारी', desc: 'समय का फ़र्क़, प्लग, देश कोड, मुद्रा' },
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
    route: '/game/poker', icon: '🃏', color: 'from-emerald-600 to-teal-500',
    accent: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    copy: {
      en: { title: "Hold'em Starting Hands", desc: '169 starting hands with combinations, odds and flop chances' },
      es: { title: 'Manos iniciales de Hold’em', desc: '169 manos con combinaciones, probabilidades y chances en el flop' },
      'pt-br': { title: 'Mãos iniciais de Hold’em', desc: '169 mãos com combinações, probabilidades e chances no flop' },
      ja: { title: 'ホールデムのスターティングハンド', desc: '169種の組み合わせ・確率・フロップ確率' },
      de: { title: "Hold'em-Starthände", desc: '169 Starthände mit Kombinationen, Chancen und Flop-Wahrscheinlichkeiten' },
      fr: { title: 'Mains de départ au Hold’em', desc: '169 mains avec combinaisons, probabilités et chances au flop' },
      hi: { title: 'होल्डम शुरुआती हाथ', desc: '169 हाथ — संयोजन, संभावना और फ्लॉप चांस' },
      'zh-hans': { title: '德州扑克起手牌', desc: '169种起手牌的组合、概率与翻牌机会' },
      'zh-hant': { title: '德州撲克起手牌', desc: '169種起手牌的組合、機率與翻牌機會' },
    },
  },
  {
    route: '/game/chess', icon: '♟️', color: 'from-violet-600 to-indigo-500',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Chess Openings', desc: '174 openings with moves, board diagrams and FEN' },
      es: { title: 'Aperturas de ajedrez', desc: '174 aperturas con jugadas, diagramas y FEN' },
      'pt-br': { title: 'Aberturas de xadrez', desc: '174 aberturas com jogadas, diagramas e FEN' },
      ja: { title: 'チェス・オープニング', desc: 'オープニング174種の手順・盤面図・FEN' },
      de: { title: 'Schacheröffnungen', desc: '174 Eröffnungen mit Zügen, Diagrammen und FEN' },
      fr: { title: "Ouvertures d'échecs", desc: '174 ouvertures avec coups, diagrammes et FEN' },
      hi: { title: 'शतरंज ओपनिंग', desc: '174 ओपनिंग — चालें, बोर्ड आरेख और FEN' },
      'zh-hans': { title: '国际象棋开局', desc: '174种开局的着法、棋图与FEN' },
      'zh-hant': { title: '西洋棋開局', desc: '174種開局的著法、棋圖與FEN' },
    },
  },
  {
    route: '/element', icon: '⚛️', color: 'from-cyan-600 to-sky-500',
    accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    copy: {
      en: { title: 'Periodic Table', desc: 'All 118 elements with symbols, weights and electron configurations' },
      es: { title: 'Tabla periódica', desc: 'Los 118 elementos con símbolos, pesos y configuraciones' },
      'pt-br': { title: 'Tabela periódica', desc: 'Os 118 elementos com símbolos, pesos e configurações' },
      ja: { title: '周期表', desc: '元素118種の記号・原子量・電子配置' },
      de: { title: 'Periodensystem', desc: 'Alle 118 Elemente mit Symbol, Gewicht und Konfiguration' },
      fr: { title: 'Tableau périodique', desc: 'Les 118 éléments avec symboles, masses et configurations' },
      hi: { title: 'आवर्त सारणी', desc: 'सभी 118 तत्व — प्रतीक, द्रव्यमान और इलेक्ट्रॉन विन्यास' },
    },
  },
  {
    route: '/resistor', icon: '⚡', color: 'from-amber-500 to-yellow-400',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Resistor Colour Code', desc: '144 E24 values with four- and five-band codes and tolerance' },
      es: { title: 'Código de colores', desc: '144 valores E24 con bandas de cuatro y cinco anillos y tolerancia' },
      'pt-br': { title: 'Código de cores', desc: '144 valores E24 com faixas de quatro e cinco anéis e tolerância' },
      ja: { title: '抵抗カラーコード', desc: 'E24系列144種の4本・5本カラーコードと誤差' },
      de: { title: 'Widerstands-Farbcode', desc: '144 E24-Werte mit Vier- und Fünf-Ring-Code und Toleranz' },
      fr: { title: 'Code couleur des résistances', desc: '144 valeurs E24 avec codes à quatre et cinq anneaux et tolérance' },
      hi: { title: 'रेज़िस्टर रंग कोड', desc: '144 E24 मान — चार और पाँच बैंड कोड तथा सहनशीलता' },
      'zh-hans': { title: '电阻色环表', desc: 'E24 系列 144 个值的四环、五环写法与误差' },
      'zh-hant': { title: '電阻色環表', desc: 'E24 系列 144 個值的四環、五環寫法與誤差' },
    },
  },
  {
    route: '/chmod', icon: '🔒', color: 'from-orange-600 to-amber-500',
    accent: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-900/50', bg: 'bg-orange-50 dark:bg-orange-950/30',
    copy: {
      en: { title: 'chmod Permissions', desc: '125 modes with rwx, ls -l, umask and who can do what' },
      es: { title: 'Permisos chmod', desc: '125 modos con rwx, ls -l, umask y quién puede qué' },
      'pt-br': { title: 'Permissões chmod', desc: '125 modos com rwx, ls -l, umask e quem pode o quê' },
      ja: { title: 'chmod 権限', desc: '125種のrwx・ls -l・umask・誰が何をできるか' },
      de: { title: 'chmod-Rechte', desc: '125 Modi mit rwx, ls -l, umask und wer was darf' },
      fr: { title: 'Permissions chmod', desc: '125 modes avec rwx, ls -l, umask et qui peut quoi' },
      hi: { title: 'chmod अनुमतियाँ', desc: '125 मोड — rwx, ls -l, umask और कौन क्या कर सकता है' },
      'zh-hans': { title: 'chmod 权限', desc: '125 种模式的 rwx、ls -l、umask 与谁能做什么' },
      'zh-hant': { title: 'chmod 權限', desc: '125 種模式的 rwx、ls -l、umask 與誰能做什麼' },
    },
  },
  {
    route: '/port', icon: '🔌', color: 'from-fuchsia-600 to-purple-500',
    accent: 'text-fuchsia-700 dark:text-fuchsia-300', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    copy: {
      en: { title: 'Port Numbers', desc: '127 ports with service, protocol, range and encrypted twin' },
      es: { title: 'Números de puerto', desc: '127 puertos con servicio, protocolo, rango y puerto cifrado' },
      'pt-br': { title: 'Números de porta', desc: '127 portas com serviço, protocolo, faixa e porta cifrada' },
      ja: { title: 'ポート番号', desc: 'ポート127個のサービス・プロトコル・区分・暗号化の相方' },
      de: { title: 'Portnummern', desc: '127 Ports mit Dienst, Protokoll, Bereich und verschlüsseltem Zwilling' },
      fr: { title: 'Numéros de port', desc: '127 ports avec service, protocole, plage et jumeau chiffré' },
      hi: { title: 'पोर्ट नंबर', desc: '127 पोर्ट — सेवा, प्रोटोकॉल, रेंज और एन्क्रिप्टेड जोड़ा' },
      'zh-hans': { title: '端口号', desc: '127 个端口的服务、协议、区间与加密对应端口' },
      'zh-hant': { title: '連接埠號', desc: '127 個連接埠的服務、協定、區間與加密對應連接埠' },
    },
  },
  {
    route: '/ascii', icon: '⌨️', color: 'from-teal-600 to-emerald-500',
    accent: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-900/50', bg: 'bg-teal-50 dark:bg-teal-950/30',
    copy: {
      en: { title: 'ASCII Table', desc: 'All 128 codes with hex, binary, HTML entities and Ctrl keys' },
      es: { title: 'Tabla ASCII', desc: 'Los 128 códigos con hex, binario, entidades HTML y teclas Ctrl' },
      'pt-br': { title: 'Tabela ASCII', desc: 'Os 128 códigos com hex, binário, entidades HTML e teclas Ctrl' },
      ja: { title: 'ASCIIコード表', desc: '128字の16進数・2進数・HTMLエンティティ・Ctrl組み合わせ' },
      de: { title: 'ASCII-Tabelle', desc: 'Alle 128 Codes mit Hex, Binär, HTML-Entities und Ctrl-Tasten' },
      fr: { title: 'Table ASCII', desc: 'Les 128 codes avec hex, binaire, entités HTML et touches Ctrl' },
      hi: { title: 'ASCII तालिका', desc: 'सभी 128 कोड — हेक्स, द्विआधारी, HTML एंटिटी और Ctrl संयोजन' },
      'zh-hans': { title: 'ASCII 码表', desc: '128 个字符的十六进制、二进制、HTML 实体与 Ctrl 组合' },
      'zh-hant': { title: 'ASCII 碼表', desc: '128 個字元的十六進位、二進位、HTML 實體與 Ctrl 組合' },
    },
  },
  {
    route: '/number', icon: '🔢', color: 'from-indigo-600 to-violet-500',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Number Reference', desc: 'Factors, divisors, bases and Roman numerals for every number to 200' },
      es: { title: 'Diccionario de números', desc: 'Factores, divisores, bases y números romanos de cada número hasta 200' },
      'pt-br': { title: 'Dicionário de números', desc: 'Fatores, divisores, bases e algarismos romanos de cada número até 200' },
      ja: { title: '数の事典', desc: '200までの数ごとの素因数分解・約数・進法・ローマ数字' },
      de: { title: 'Zahlenlexikon', desc: 'Primfaktoren, Teiler, Zahlensysteme und römische Zahlen bis 200' },
      fr: { title: 'Dictionnaire des nombres', desc: 'Facteurs, diviseurs, bases et chiffres romains pour chaque nombre jusqu’à 200' },
      hi: { title: 'संख्या कोश', desc: '200 तक हर संख्या के गुणनखंड, भाजक, आधार और रोमन अंक' },
      'zh-hans': { title: '数字词典', desc: '200 以内每个数的质因数、因数、进制与罗马数字' },
      'zh-hant': { title: '數字詞典', desc: '200 以內每個數的質因數、因數、進位與羅馬數字' },
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
      en: { title: 'Four-Character Idioms', desc: 'A hundred Korean idioms with meaning and origin' },
      es: { title: 'Modismos de cuatro caracteres', desc: 'Cien modismos coreanos con su sentido y su origen' },
      'pt-br': { title: 'Expressões de quatro caracteres', desc: 'Cem expressões coreanas com sentido e origem' },
      ja: { title: '四字熟語', desc: '韓国の四字熟語100語を意味と由来つきで' },
      de: { title: 'Vier-Zeichen-Redewendungen', desc: 'Hundert koreanische Redewendungen mit Bedeutung und Herkunft' },
      fr: { title: 'Expressions à quatre caractères', desc: 'Cent expressions coréennes avec leur sens et leur origine' },
      hi: { title: 'चार-अक्षरी मुहावरे', desc: 'सौ कोरियाई मुहावरे, अर्थ और उद्गम के साथ' },
    },
  },
];

/** 그 언어의 첫 화면에 실을 섹션. 선언 순서를 지킨다 */
export function homeSections(lang: AnyLocale10): (Omit<HomeSection, 'copy'> & Copy)[] {
  return SECTIONS.flatMap(s => {
    const c = s.copy[lang];
    if (!c) return [];
    const { copy: _copy, ...rest } = s;
    return [{ ...rest, ...c }];
  });
}

/** 그 언어에 이 섹션이 있는지 — LangPicker의 available을 만들 때 쓴다 */
export function localesWithSection(route: string): AnyLocale10[] {
  const s = SECTIONS.find(x => x.route === route);
  return s ? (Object.keys(s.copy) as AnyLocale10[]) : [];
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

export const HOME_UI: Record<Exclude<AnyLocale10, 'ko'>, HomeUi> = {
  'zh-hans': {
    metaTitle: 'vixutil — 免费的日常小工具',
    metaDesc: '在浏览器里直接用的免费工具：国际象棋开局174种、德州扑克起手牌169种，着法、棋图与概率一应俱全。无需注册。',
    srTagline: ' — 免费的日常小工具',
    tagline: '在浏览器里直接用的免费工具',
    open: '打开',
    notice: '所有内容都在你的浏览器里运行，不上传任何数据，也不需要账号。',
  },
  'zh-hant': {
    metaTitle: 'vixutil — 免費的日常小工具',
    metaDesc: '在瀏覽器裡直接用的免費工具：西洋棋開局174種、德州撲克起手牌169種，著法、棋圖與機率一應俱全。無需註冊。',
    srTagline: ' — 免費的日常小工具',
    tagline: '在瀏覽器裡直接用的免費工具',
    open: '開啟',
    notice: '所有內容都在你的瀏覽器裡執行，不上傳任何資料，也不需要帳號。',
  },
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
