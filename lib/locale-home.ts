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
      'zh-hans': { title: '单位换算', desc: '长度、重量、温度、面积等' },
      'zh-hant': { title: '單位換算', desc: '長度、重量、溫度、面積等' },
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
      'zh-hans': { title: '随机抽选', desc: '转盘、抽名字、分组、骰子、交换礼物' },
      'zh-hant': { title: '隨機抽選', desc: '轉盤、抽名字、分組、骰子、交換禮物' },
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
      'zh-hans': { title: '塔罗牌牌义', desc: '78张牌的正位与逆位，大阿卡纳与小阿卡纳' },
      'zh-hant': { title: '塔羅牌牌義', desc: '78張牌的正位與逆位，大阿爾克那與小阿爾克那' },
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
      'zh-hans': { title: '时间工具', desc: '计时器、秒表、世界时钟、日期计算' },
      'zh-hant': { title: '時間工具', desc: '計時器、碼錶、世界時鐘、日期計算' },
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
      'zh-hans': { title: '颜色工具', desc: '调色板、明暗色阶、对比度、CSS渐变' },
      'zh-hant': { title: '顏色工具', desc: '調色盤、明暗色階、對比度、CSS漸層' },
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
      'zh-hans': { title: '图片工具', desc: '压缩、改尺寸、裁剪、人脸模糊' },
      'zh-hant': { title: '圖片工具', desc: '壓縮、調整尺寸、裁切、人臉模糊' },
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
      'zh-hans': { title: '声音工具', desc: '节拍器、调音器、白噪音、纯音' },
      'zh-hant': { title: '聲音工具', desc: '節拍器、調音器、白噪音、純音' },
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
      'zh-hans': { title: '烹饪工具', desc: '量杯换克、烤箱温度、米饭、咖啡' },
      'zh-hant': { title: '烹飪工具', desc: '量杯換克、烤箱溫度、米飯、咖啡' },
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
      'zh-hans': { title: '脑力小游戏', desc: '反应、记忆、打字、瞄准、心算' },
      'zh-hant': { title: '腦力小遊戲', desc: '反應、記憶、打字、瞄準、心算' },
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
      'zh-hans': { title: '设备检测', desc: '键盘、鼠标、麦克风、摄像头、坏点' },
      'zh-hant': { title: '裝置檢測', desc: '鍵盤、滑鼠、麥克風、視訊鏡頭、壞點' },
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
      'zh-hans': { title: '文本工具', desc: '清理、去重、大小写转换、字数统计' },
      'zh-hant': { title: '文字工具', desc: '清理、去除重複、大小寫轉換、字數統計' },
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
      'zh-hans': { title: '百分比与比率', desc: '折扣、增值税、增减率、复利' },
      'zh-hant': { title: '百分比與比率', desc: '折扣、營業稅、增減率、複利' },
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
      'zh-hans': { title: '身体指标', desc: 'BMI、体脂率、基础代谢、配速、最大力量' },
      'zh-hant': { title: '身體指標', desc: 'BMI、體脂率、基礎代謝、配速、最大肌力' },
    },
  },
  // 잘못 지웠던 것을 되살림 — craft는 공식 계산기 40종이다
  {
    route: '/craft', icon: '🧶', color: 'from-amber-500 to-rose-500',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Craft Calculators', desc: 'Yarn, fabric, candle wax, soap lye, resin quantities' },
      es: { title: 'Manualidades', desc: 'Lana, tela, cera de velas, sosa para jabón, resina' },
      'pt-br': { title: 'Artesanato', desc: 'Lã, tecido, cera de vela, soda para sabão, resina' },
      ja: { title: 'ハンドメイド', desc: '毛糸・生地・キャンドルのワックス・苛性ソーダ・レジン' },
      de: { title: 'Handarbeit', desc: 'Wolle, Stoff, Kerzenwachs, Seifenlauge, Resin' },
      fr: { title: 'Loisirs créatifs', desc: 'Laine, tissu, cire de bougie, soude, résine' },
      hi: { title: 'हस्तकला', desc: 'ऊन, कपड़ा, मोमबत्ती का मोम, साबुन का सोडा, रेज़िन' },
      'zh-hans': { title: '手作计算器', desc: '毛线、布料、蜡、烧碱、树脂用量' },
      'zh-hant': { title: '手作計算機', desc: '毛線、布料、蠟、鹼、樹脂用量' },
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
      'zh-hans': { title: '几何计算', desc: '面积、体积、勾股定理、角度' },
      'zh-hant': { title: '幾何計算', desc: '面積、體積、畢氏定理、角度' },
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
      'zh-hans': { title: '文件扩展名', desc: '.hwp、.webp、.mkv用什么打开——140种扩展名与MIME类型' },
      'zh-hant': { title: '副檔名', desc: '.hwp、.webp、.mkv用什麼開啟——140種副檔名與MIME類型' },
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
    route: '/times', icon: '🔢', color: 'from-teal-600 to-emerald-500',
    accent: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-900/50', bg: 'bg-teal-50 dark:bg-teal-950/30',
    copy: {
      en: { title: 'Times Tables', desc: 'Every multiplication fact to 20×20, with divisions and neighbours' },
      es: { title: 'Tablas de multiplicar', desc: 'Todos los productos hasta 20×20, con divisiones y vecinos' },
      'pt-br': { title: 'Tabuada', desc: 'Todos os produtos até 20×20, com divisões e vizinhos' },
      ja: { title: 'かけ算表', desc: '20×20までの全マスと、割り算・前後のマス' },
      de: { title: 'Einmaleins', desc: 'Alle Aufgaben bis 20×20, mit Divisionen und Nachbarn' },
      fr: { title: 'Tables de multiplication', desc: 'Tous les produits jusqu’à 20×20, avec divisions et voisins' },
      hi: { title: 'पहाड़े', desc: '20×20 तक हर गुणा, भाग और पास वाले खानों के साथ' },
      'zh-hans': { title: '乘法表', desc: '20×20 以内的每一格，附除法与相邻格' },
      'zh-hant': { title: '乘法表', desc: '20×20 以內的每一格，附除法與相鄰格' },
    },
  },
  {
    route: '/percent', icon: '％', color: 'from-sky-500 to-blue-600',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Percentages', desc: 'What X% of Y is, what X% off leaves, and what percent one is of the other' },
      es: { title: 'Porcentajes', desc: 'Cuánto es el X % de Y, cuánto queda con descuento y qué porcentaje es uno de otro' },
      'pt-br': { title: 'Porcentagens', desc: 'Quanto é X% de Y, quanto sobra com desconto e que porcentagem um é do outro' },
      ja: { title: 'パーセント計算', desc: 'YのX%はいくらか、X%引きならいくらか、何パーセントか' },
      de: { title: 'Prozentrechnung', desc: 'Wie viel X % von Y sind, was nach Rabatt bleibt und wie viel Prozent das eine vom anderen ist' },
      fr: { title: 'Pourcentages', desc: 'Combien font X % de Y, ce que laisse une remise, et quel pourcentage l’un fait de l’autre' },
      hi: { title: 'प्रतिशत', desc: 'Y का X% कितना, छूट पर कितना बचता है, और एक दूसरे का कितने प्रतिशत है' },
      'zh-hans': { title: '百分比计算', desc: 'Y 的 X% 是多少、打折后剩多少、一个是另一个的百分之几' },
      'zh-hant': { title: '百分比計算', desc: 'Y 的 X% 是多少、折扣後剩多少、一個是另一個的百分之幾' },
    },
  },
  {
    route: '/sqrt', icon: '📐', color: 'from-indigo-600 to-violet-500',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Square Roots', desc: 'Roots of 1–200 as rounded decimals and exact surds' },
      es: { title: 'Raíces cuadradas', desc: 'Raíces del 1 al 200 en decimal y en radical exacto' },
      'pt-br': { title: 'Raízes quadradas', desc: 'Raízes de 1 a 200 em decimal e em radical exato' },
      ja: { title: '平方根表', desc: '1〜200の平方根を小数と正確な根号の形で' },
      de: { title: 'Quadratwurzeln', desc: 'Wurzeln von 1 bis 200 als Dezimalzahl und exakte Wurzel' },
      fr: { title: 'Racines carrées', desc: 'Racines de 1 à 200 en décimal et en radical exact' },
      hi: { title: 'वर्गमूल', desc: '1–200 के वर्गमूल दशमलव और सटीक मूल-रूप में' },
      'zh-hans': { title: '平方根表', desc: '1–200 的平方根，小数与精确根式并列' },
      'zh-hant': { title: '平方根表', desc: '1–200 的平方根，小數與精確根式並列' },
    },
  },
  {
    route: '/roman', icon: '🏛️', color: 'from-amber-700 to-yellow-500',
    accent: 'text-amber-800 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Roman Numeral Years', desc: 'Every year from 1900 to 2100, broken into its letters' },
      es: { title: 'Años en números romanos', desc: 'Cada año de 1900 a 2100, descompuesto en sus letras' },
      'pt-br': { title: 'Anos em algarismos romanos', desc: 'Cada ano de 1900 a 2100, dividido em suas letras' },
      ja: { title: 'ローマ数字の年', desc: '1900年から2100年まで、文字を分解して' },
      de: { title: 'Römische Jahreszahlen', desc: 'Jedes Jahr von 1900 bis 2100, in seine Buchstaben zerlegt' },
      fr: { title: 'Années en chiffres romains', desc: 'Chaque année de 1900 à 2100, décomposée en lettres' },
      hi: { title: 'रोमन अंकों में वर्ष', desc: '1900 से 2100 तक हर वर्ष, अक्षरों में बँटा हुआ' },
      'zh-hans': { title: '罗马数字年份', desc: '1900 到 2100 每一年，拆成字母来看' },
      'zh-hant': { title: '羅馬數字年份', desc: '1900 到 2100 每一年，拆成字母來看' },
    },
  },
  {
    route: '/year', icon: '📅', color: 'from-rose-700 to-orange-500',
    accent: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', bg: 'bg-rose-50 dark:bg-rose-950/30',
    copy: {
      en: { title: 'Year Reference', desc: 'Leap years, weekdays, week counts and zodiac signs, 1900–2100' },
      es: { title: 'Diccionario de años', desc: 'Bisiestos, días, semanas y zodiaco, de 1900 a 2100' },
      'pt-br': { title: 'Dicionário de anos', desc: 'Bissextos, dias, semanas e zodíaco, de 1900 a 2100' },
      ja: { title: '年の事典', desc: '1900〜2100年のうるう年・曜日・週数・干支' },
      de: { title: 'Jahres-Nachschlagewerk', desc: 'Schaltjahre, Wochentage, Wochenzahl und Tierkreis, 1900–2100' },
      fr: { title: 'Dictionnaire des années', desc: 'Bissextiles, jours, semaines et zodiaque, de 1900 à 2100' },
      hi: { title: 'वर्ष कोश', desc: '1900–2100 के लीप वर्ष, वार, सप्ताह और राशिचक्र' },
      'zh-hans': { title: '年份词典', desc: '1900–2100 的闰年、星期、周数与生肖' },
      'zh-hant': { title: '年份詞典', desc: '1900–2100 的閏年、星期、週數與生肖' },
    },
  },
  {
    route: '/rem', icon: '📏', color: 'from-violet-700 to-fuchsia-500',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'px to rem Chart', desc: 'CSS units for 1–120 px: rem, pt, pc, inches and millimetres' },
      es: { title: 'Tabla px a rem', desc: 'Unidades CSS de 1 a 120 px: rem, pt, pc, pulgadas y milímetros' },
      'pt-br': { title: 'Tabela px para rem', desc: 'Unidades CSS de 1 a 120 px: rem, pt, pc, polegadas e milímetros' },
      ja: { title: 'px→rem 変換表', desc: '1〜120pxのCSS単位：rem・pt・pc・インチ・ミリ' },
      de: { title: 'px-zu-rem-Tabelle', desc: 'CSS-Einheiten für 1–120 px: rem, pt, pc, Zoll und Millimeter' },
      fr: { title: 'Table px vers rem', desc: 'Unités CSS de 1 à 120 px : rem, pt, pc, pouces et millimètres' },
      hi: { title: 'px से rem तालिका', desc: '1–120 px की CSS इकाइयाँ: rem, pt, pc, इंच और मिलीमीटर' },
      'zh-hans': { title: 'px 转 rem 换算表', desc: '1–120px 的 CSS 单位：rem、pt、pc、英寸与毫米' },
      'zh-hant': { title: 'px 轉 rem 換算表', desc: '1–120px 的 CSS 單位：rem、pt、pc、英寸與毫米' },
    },
  },
  {
    route: '/password', icon: '🔑', color: 'from-teal-600 to-emerald-400',
    accent: 'text-teal-700 dark:text-teal-200', border: 'border-teal-200 dark:border-teal-800', bg: 'bg-teal-50 dark:bg-teal-900/40',
    copy: {
      en: { title: 'Password Strength', desc: 'How it is stored changes the answer more than length does' },
      es: { title: 'Fuerza de contraseñas', desc: 'Cómo se guarda cambia la respuesta más que la longitud' },
      'pt-br': { title: 'Força de senhas', desc: 'Como é guardada muda a resposta mais que o comprimento' },
      ja: { title: 'パスワードの強さ', desc: '長さより保存方式が答えを変えます' },
      de: { title: 'Passwortstärke', desc: 'Die Speicherung ändert mehr als die Länge' },
      fr: { title: 'Force des mots de passe', desc: 'Le stockage change plus la réponse que la longueur' },
      hi: { title: 'पासवर्ड की मज़बूती', desc: 'लंबाई से ज़्यादा भंडारण तरीका उत्तर बदलता है' },
      'zh-hans': { title: '密码强度', desc: '存储方式比长度更能改变答案' },
      'zh-hant': { title: '密碼強度', desc: '儲存方式比長度更能改變答案' },
    },
  },
  {
    route: '/code', icon: '📶', color: 'from-violet-600 to-purple-500',
    accent: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900/50', bg: 'bg-violet-50 dark:bg-violet-950/30',
    copy: {
      en: { title: 'Morse, NATO, Braille', desc: '52 characters in three codes, plus all 64 braille cells' },
      es: { title: 'Morse, NATO, braille', desc: '52 caracteres en tres códigos y las 64 celdas braille' },
      'pt-br': { title: 'Morse, NATO, braille', desc: '52 caracteres em três códigos e as 64 celas braille' },
      ja: { title: 'モールス・NATO・点字', desc: '文字52種を三つの符号で、点字のセル64種も' },
      de: { title: 'Morse, NATO, Braille', desc: '52 Zeichen in drei Codes und alle 64 Braille-Zellen' },
      fr: { title: 'Morse, NATO, braille', desc: '52 caractères en trois codes et les 64 cellules braille' },
      hi: { title: 'मोर्स, NATO, ब्रेल', desc: '52 वर्ण तीन संकेतों में, और सभी 64 ब्रेल कोशिकाएँ' },
      'zh-hans': { title: '摩尔斯·NATO·盲文', desc: '52 个字符的三种编码，另有 64 个盲文方' },
      'zh-hant': { title: '摩斯·NATO·點字', desc: '52 個字元的三種編碼，另有 64 個點字方' },
    },
  },
  {
    route: '/cidr', icon: '🌐', color: 'from-cyan-600 to-blue-500',
    accent: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    copy: {
      en: { title: 'CIDR Subnet Table', desc: 'Mask, address count and usable hosts for every prefix' },
      es: { title: 'Tabla de subredes CIDR', desc: 'Máscara, direcciones y hosts utilizables de cada prefijo' },
      'pt-br': { title: 'Tabela de sub-redes CIDR', desc: 'Máscara, endereços e hosts utilizáveis de cada prefixo' },
      ja: { title: 'CIDRサブネット表', desc: 'プレフィックスごとのマスク・アドレス数・使えるホスト数' },
      de: { title: 'CIDR-Subnetztabelle', desc: 'Maske, Adressanzahl und nutzbare Hosts je Präfix' },
      fr: { title: 'Table de sous-réseaux CIDR', desc: 'Masque, nombre d’adresses et hôtes utilisables par préfixe' },
      hi: { title: 'CIDR सबनेट तालिका', desc: 'हर प्रीफ़िक्स का मास्क, पते और उपयोग योग्य होस्ट' },
      'zh-hans': { title: 'CIDR 子网表', desc: '每个前缀的掩码、地址数与可用主机数' },
      'zh-hant': { title: 'CIDR 子網路表', desc: '每個前綴的遮罩、位址數與可用主機數' },
    },
  },
  {
    route: '/keycode', icon: '🔑', color: 'from-slate-600 to-zinc-500',
    accent: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', bg: 'bg-slate-50 dark:bg-slate-800/40',
    copy: {
      en: { title: 'JavaScript Key Codes', desc: 'code, key, keyCode and location for 120 keyboard keys' },
      es: { title: 'Códigos de tecla', desc: 'code, key, keyCode y location de 120 teclas' },
      'pt-br': { title: 'Códigos de tecla', desc: 'code, key, keyCode e location de 120 teclas' },
      ja: { title: 'キーコード一覧', desc: 'キー120個のcode・key・keyCode・location' },
      de: { title: 'Tastencodes', desc: 'code, key, keyCode und location für 120 Tasten' },
      fr: { title: 'Codes de touche', desc: 'code, key, keyCode et location pour 120 touches' },
      hi: { title: 'की कोड', desc: '120 कुंजियों के code, key, keyCode और location' },
      'zh-hans': { title: '键码对照表', desc: '120 个按键的 code、key、keyCode 与 location' },
      'zh-hant': { title: '鍵碼對照表', desc: '120 個按鍵的 code、key、keyCode 與 location' },
    },
  },
  {
    route: '/fraction', icon: '➗', color: 'from-lime-600 to-emerald-500',
    accent: 'text-lime-700 dark:text-lime-300', border: 'border-lime-200 dark:border-lime-900/50', bg: 'bg-lime-50 dark:bg-lime-950/30',
    copy: {
      en: { title: 'Fraction to Decimal', desc: '127 fractions with exact decimals, percentages and equivalents' },
      es: { title: 'De fracción a decimal', desc: '127 fracciones con decimales exactos, porcentajes y equivalentes' },
      'pt-br': { title: 'De fração a decimal', desc: '127 frações com decimais exatos, porcentagens e equivalentes' },
      ja: { title: '分数を小数に', desc: '分数127種の正確な小数・パーセント・同値分数' },
      de: { title: 'Bruch in Dezimalzahl', desc: '127 Brüche mit exakten Dezimalzahlen, Prozent und gleichwertigen Brüchen' },
      fr: { title: 'Fraction en décimal', desc: '127 fractions avec décimales exactes, pourcentages et équivalents' },
      hi: { title: 'भिन्न से दशमलव', desc: '127 भिन्न — सटीक दशमलव, प्रतिशत और तुल्य भिन्न' },
      'zh-hans': { title: '分数化小数', desc: '127 个分数的精确小数、百分比与等值分数' },
      'zh-hant': { title: '分數化小數', desc: '127 個分數的精確小數、百分比與等值分數' },
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
      'zh-hans': { title: '正则表达式大全', desc: '133条经过验证的表达式，均附匹配与不匹配示例' },
      'zh-hant': { title: '正規表示式大全', desc: '133條經過驗證的表示式，均附符合與不符合範例' },
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
      'zh-hans': { title: '骰子概率', desc: '1到6颗骰子的每种点数和、组合数与概率' },
      'zh-hant': { title: '骰子機率', desc: '1到6顆骰子的每種點數和、組合數與機率' },
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
      'zh-hans': { title: '魔方公式', desc: 'F2L、OLL、PLL全部119种情况，附图示' },
      'zh-hant': { title: '魔術方塊公式', desc: 'F2L、OLL、PLL全部119種情況，附圖示' },
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
      'zh-hans': { title: '镜头视角', desc: '104组焦距×画幅组合实际能拍到的范围' },
      'zh-hant': { title: '鏡頭視角', desc: '104組焦距×片幅組合實際能拍到的範圍' },
    },
  },
  {
    route: '/shortcut', icon: '⌨️', color: 'from-slate-900 to-sky-500',
    accent: 'text-sky-700 dark:text-sky-300', border: 'border-sky-200 dark:border-sky-900/50', bg: 'bg-sky-50 dark:bg-sky-950/30',
    copy: {
      en: { title: 'Keyboard Shortcuts', desc: 'Excel, VS Code, Chrome, Figma — Windows and Mac side by side' },
      es: { title: 'Atajos de teclado', desc: 'Excel, VS Code, Chrome, Figma: Windows y Mac juntos' },
      'pt-br': { title: 'Atalhos de teclado', desc: 'Excel, VS Code, Chrome, Figma — Windows e Mac lado a lado' },
      ja: { title: 'キーボードショートカット', desc: 'Excel・VS Code・Chrome・Figma を Windows と Mac 並べて' },
      de: { title: 'Tastenkürzel', desc: 'Excel, VS Code, Chrome, Figma — Windows und Mac nebeneinander' },
      fr: { title: 'Raccourcis clavier', desc: 'Excel, VS Code, Chrome, Figma : Windows et Mac côte à côte' },
      hi: { title: 'कीबोर्ड शॉर्टकट', desc: 'Excel, VS Code, Chrome, Figma — Windows और Mac साथ-साथ' },
      'zh-hans': { title: '键盘快捷键', desc: 'Excel、VS Code、Chrome、Figma 的 Windows 与 Mac 对照' },
      'zh-hant': { title: '鍵盤快速鍵', desc: 'Excel、VS Code、Chrome、Figma 的 Windows 與 Mac 對照' },
    },
  },
  {
    route: '/emoji', icon: '😀', color: 'from-amber-700 to-amber-400',
    accent: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', bg: 'bg-amber-50 dark:bg-amber-950/30',
    copy: {
      en: { title: 'Emoji Meanings', desc: 'What 💀 🙏 😤 actually mean when someone sends them' },
      es: { title: 'Significado de emojis', desc: 'Qué quieren decir de verdad 💀 🙏 😤 cuando te los envían' },
      'pt-br': { title: 'Significado dos emojis', desc: 'O que 💀 🙏 😤 realmente querem dizer quando chegam' },
      ja: { title: '絵文字の意味', desc: '💀 🙏 😤 が実際にどんな意味で送られているか' },
      de: { title: 'Emoji-Bedeutungen', desc: 'Was 💀 🙏 😤 wirklich heißen, wenn sie ankommen' },
      fr: { title: 'Signification des emojis', desc: 'Ce que veulent vraiment dire 💀 🙏 😤 quand on les reçoit' },
      hi: { title: 'इमोजी का अर्थ', desc: '💀 🙏 😤 भेजे जाने पर असल में क्या कहते हैं' },
      'zh-hans': { title: '表情符号含义', desc: '别人发来 💀 🙏 😤 到底是什么意思' },
      'zh-hant': { title: '表情符號含義', desc: '別人發來 💀 🙏 😤 到底是什麼意思' },
    },
  },
  {
    route: '/cmd', icon: '⌨️', color: 'from-slate-700 to-indigo-500',
    accent: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-900/50', bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    copy: {
      en: { title: 'Terminal Commands', desc: 'ls, grep, tar, chmod, git reset — flags and examples' },
      es: { title: 'Comandos de terminal', desc: 'ls, grep, tar, chmod, git reset: opciones y ejemplos' },
      'pt-br': { title: 'Comandos de terminal', desc: 'ls, grep, tar, chmod, git reset — opções e exemplos' },
      ja: { title: 'ターミナルのコマンド', desc: 'ls・grep・tar・chmod・git reset のオプションと例' },
      de: { title: 'Terminal-Befehle', desc: 'ls, grep, tar, chmod, git reset — Optionen und Beispiele' },
      fr: { title: 'Commandes du terminal', desc: 'ls, grep, tar, chmod, git reset : options et exemples' },
      hi: { title: 'टर्मिनल कमांड', desc: 'ls, grep, tar, chmod, git reset — विकल्प और उदाहरण' },
      'zh-hans': { title: '终端命令', desc: 'ls、grep、tar、chmod、git reset 的选项和示例' },
      'zh-hant': { title: '終端機命令', desc: 'ls、grep、tar、chmod、git reset 的選項和範例' },
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
      'zh-hans': { title: 'HTTP状态码与标头', desc: '404、500等132个状态码与标头的含义' },
      'zh-hant': { title: 'HTTP狀態碼與標頭', desc: '404、500等132個狀態碼與標頭的意義' },
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
      'zh-hans': { title: '四字成语', desc: '100个韩国常用成语的释义与出处' },
      'zh-hant': { title: '四字成語', desc: '100個韓國常用成語的釋義與出處' },
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
