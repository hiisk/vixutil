import { colorToolsIntl } from './color-tools-intl.ts';
import { timeToolsIntl } from './time-tools-intl.ts';
import { imageToolsIntl } from './image-tools-intl.ts';
import { soundToolsIntl } from './sound-tools-intl.ts';
import { foodToolsIntl } from './food-tools-intl.ts';
import { gameToolsIntl } from './game-tools-intl.ts';
import { deviceToolsIntl } from './device-tools-intl.ts';
import { textToolsIntl } from './text-tools-intl.ts';
import { CHECKLISTS_EN } from './checklist-en.ts';
import { QUIZZES_EN } from './quiz-en.ts';
import { TESTS_EN } from './test-en.ts';
import { CONVERT_TOOLS } from './convert-tools.ts';
import { convertL10n } from './convert-i18n.ts';
import { alternateLanguagesFor, ALL_LOCALES10, localeHref, type AnyLocale10 } from './locales.ts';

/**
 * 번역 언어 통합 검색의 목록.
 *
 * 한국어 SEARCH_INDEX를 그대로 쓸 수 없다. 그쪽에는 계산기 107종과 크립토처럼
 * 번역하지 않은 것이 들어 있고, 체크리스트·퀴즈·심리테스트는 언어별로 항목
 * 자체가 다르다. 없는 페이지를 검색 결과로 내보내면 누르는 사람이 404를 본다.
 *
 * 그래서 언어별 도구 목록을 그대로 세어 만든다 — 어느 언어에 항목이 추가되면
 * 여기를 고치지 않아도 검색에 함께 잡힌다.
 *
 * 영어에만 있는 섹션은 영어에만 싣는다. 체크리스트·퀴즈·심리테스트·운세·스냅은
 * 아직 영어까지만 있어서 스페인어 검색에 넣으면 결과가 전부 404가 된다. 그 섹션을
 * 번역하면 아래 조건만 지우면 된다.
 */
export type SearchIntlLang = Exclude<AnyLocale10, 'ko'>;

export interface SearchIntlItem {
  href: string;
  title: string;
  desc: string;
  section: string;
  icon: string;
}

type Entry = { slug: string; title: string; desc: string; icon: string };

/** 운세·스냅은 슬러그가 언어에 상관없이 같아 목록을 여기 둔다 */
export const FORTUNE_INTL: Partial<Record<SearchIntlLang, Entry[]>> = {
  en: [
    { slug: 'today', title: 'Today’s Fortune', desc: 'A reading for today by star sign, zodiac animal, blood type or MBTI', icon: '🔮' },
    { slug: 'daily-tarot', title: 'Today’s Tarot Card', desc: 'One card from the major arcana, the same all day', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'Tarot Yes or No', desc: 'Hold a question in mind and draw one card', icon: '🔮' },
    { slug: 'tarot', title: 'Tarot Reading', desc: 'Full 78-card deck, four spreads, upright and reversed', icon: '🎴' },
    { slug: 'saju', title: 'Saju — Korean Four Pillars', desc: 'Your four pillars, five elements, day master and luck pillars', icon: '🀄' },
    { slug: 'today-color', title: 'Today’s Lucky Colour', desc: 'A colour and a number for today', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'Lucky Numbers', desc: 'Six numbers from your date of birth, new each day', icon: '🍀' },
    { slug: 'biorhythm', title: 'Biorhythm', desc: 'Physical, emotional and intellectual cycles from your birth date', icon: '📈' },
  ],
  'es': [
    { slug: 'today', title: 'Horóscopo de hoy', desc: 'Lectura del día por signo, animal del zodiaco, grupo sanguíneo o MBTI', icon: '🔮' },
    { slug: 'daily-tarot', title: 'Carta del tarot de hoy', desc: 'Una carta de los arcanos mayores, la misma todo el día', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'Tarot sí o no', desc: 'Piensa una pregunta y saca una carta', icon: '🔮' },
    { slug: 'tarot', title: 'Lectura de tarot', desc: 'Baraja completa de 78 cartas, cuatro tiradas, derechas e invertidas', icon: '🎴' },
    { slug: 'saju', title: 'Saju — Cuatro Pilares coreanos', desc: 'Tus cuatro pilares, los cinco elementos, el pilar del día y los ciclos de suerte', icon: '🀄' },
    { slug: 'today-color', title: 'Color de la suerte de hoy', desc: 'Un color y un número para hoy', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'Números de la suerte', desc: 'Seis números a partir de tu fecha de nacimiento, nuevos cada día', icon: '🍀' },
    { slug: 'biorhythm', title: 'Biorritmo', desc: 'Ciclos físico, emocional e intelectual desde tu fecha de nacimiento', icon: '📈' },
  ],
  'pt-br': [
    { slug: 'today', title: 'Horóscopo de hoje', desc: 'Leitura do dia por signo, animal do zodíaco, tipo sanguíneo ou MBTI', icon: '🔮' },
    { slug: 'daily-tarot', title: 'Carta de tarô de hoje', desc: 'Uma carta dos arcanos maiores, a mesma o dia todo', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'Tarô sim ou não', desc: 'Pense numa pergunta e tire uma carta', icon: '🔮' },
    { slug: 'tarot', title: 'Leitura de tarô', desc: 'Baralho completo de 78 cartas, quatro tiragens, normais e invertidas', icon: '🎴' },
    { slug: 'saju', title: 'Saju — Quatro Pilares coreanos', desc: 'Seus quatro pilares, os cinco elementos, o pilar do dia e os ciclos de sorte', icon: '🀄' },
    { slug: 'today-color', title: 'Cor da sorte de hoje', desc: 'Uma cor e um número para hoje', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'Números da sorte', desc: 'Seis números a partir da sua data de nascimento, novos a cada dia', icon: '🍀' },
    { slug: 'biorhythm', title: 'Biorritmo', desc: 'Ciclos físico, emocional e intelectual a partir da sua data de nascimento', icon: '📈' },
  ],
  'ja': [
    { slug: 'today', title: '今日の運勢', desc: '星座・干支・血液型・MBTIで見る今日の運勢', icon: '🔮' },
    { slug: 'daily-tarot', title: '今日のタロット', desc: '大アルカナから一枚、その日はずっと同じ', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'タロット イエス・ノー', desc: '質問を思い浮かべて一枚引く', icon: '🔮' },
    { slug: 'tarot', title: 'タロット占い', desc: '78枚フルデッキ、4種のスプレッド、正位置と逆位置', icon: '🎴' },
    { slug: 'saju', title: '四柱推命（韓国式サジュ）', desc: '四つの柱、五行、日主、大運', icon: '🀄' },
    { slug: 'today-color', title: '今日のラッキーカラー', desc: '今日の色と数字', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'ラッキーナンバー', desc: '生年月日から6つ、毎日変わります', icon: '🍀' },
    { slug: 'biorhythm', title: 'バイオリズム', desc: '生年月日から身体・感情・知性の3つの波', icon: '📈' },
  ],
  'de': [
    { slug: 'today', title: 'Tageshoroskop', desc: 'Deutung für heute nach Sternzeichen, Tierkreiszeichen, Blutgruppe oder MBTI', icon: '🔮' },
    { slug: 'daily-tarot', title: 'Tageskarte Tarot', desc: 'Eine Karte aus der Großen Arkana, den ganzen Tag dieselbe', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'Tarot Ja oder Nein', desc: 'Denk an eine Frage und zieh eine Karte', icon: '🔮' },
    { slug: 'tarot', title: 'Tarot-Legung', desc: 'Volles Deck mit 78 Karten, vier Legesysteme, aufrecht und umgekehrt', icon: '🎴' },
    { slug: 'saju', title: 'Saju — koreanische Vier Säulen', desc: 'Deine vier Säulen, die fünf Elemente, der Tagesherr und die Glückssäulen', icon: '🀄' },
    { slug: 'today-color', title: 'Glücksfarbe des Tages', desc: 'Eine Farbe und eine Zahl für heute', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'Glückszahlen', desc: 'Sechs Zahlen aus deinem Geburtsdatum, jeden Tag neu', icon: '🍀' },
    { slug: 'biorhythm', title: 'Biorhythmus', desc: 'Körperliche, emotionale und geistige Zyklen ab deinem Geburtsdatum', icon: '📈' },
  ],
  'fr': [
    { slug: 'today', title: 'Horoscope du jour', desc: 'Lecture du jour par signe, animal du zodiaque, groupe sanguin ou MBTI', icon: '🔮' },
    { slug: 'daily-tarot', title: 'Carte de tarot du jour', desc: 'Une carte des arcanes majeurs, la même toute la journée', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'Tarot oui ou non', desc: 'Pense à une question et tire une carte', icon: '🔮' },
    { slug: 'tarot', title: 'Tirage de tarot', desc: 'Jeu complet de 78 cartes, quatre tirages, à l’endroit et à l’envers', icon: '🎴' },
    { slug: 'saju', title: 'Saju — Quatre Piliers coréens', desc: 'Tes quatre piliers, les cinq éléments, le maître du jour et les cycles de chance', icon: '🀄' },
    { slug: 'today-color', title: 'Couleur porte-bonheur du jour', desc: 'Une couleur et un chiffre pour aujourd’hui', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'Numéros porte-bonheur', desc: 'Six numéros tirés de ta date de naissance, nouveaux chaque jour', icon: '🍀' },
    { slug: 'biorhythm', title: 'Biorythme', desc: 'Cycles physique, émotionnel et intellectuel depuis ta date de naissance', icon: '📈' },
  ],
  'hi': [
    { slug: 'today', title: 'आज का राशिफल', desc: 'राशि, चीनी राशि, ब्लड ग्रुप या MBTI से आज का हाल', icon: '🔮' },
    { slug: 'daily-tarot', title: 'आज का टैरो कार्ड', desc: 'मेजर आर्काना से एक कार्ड, पूरे दिन वही', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'टैरो हाँ या ना', desc: 'मन में सवाल रखो और एक कार्ड खींचो', icon: '🔮' },
    { slug: 'tarot', title: 'टैरो रीडिंग', desc: 'पूरा 78-कार्ड डेक, चार स्प्रेड, सीधे और उलटे', icon: '🎴' },
    { slug: 'saju', title: 'साजू — कोरियाई चार स्तंभ', desc: 'तुम्हारे चार स्तंभ, पाँच तत्व, दिन का स्वामी और भाग्य-चक्र', icon: '🀄' },
    { slug: 'today-color', title: 'आज का लकी रंग', desc: 'आज के लिए एक रंग और एक अंक', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'लकी नंबर', desc: 'जन्मतिथि से छह अंक, हर दिन नए', icon: '🍀' },
    { slug: 'biorhythm', title: 'बायोरिदम', desc: 'जन्मतिथि से शारीरिक, भावनात्मक और बौद्धिक चक्र', icon: '📈' },
  ],
  'zh-hans': [
    { slug: 'today', title: '今日运势', desc: '按星座、生肖、血型或MBTI看今天', icon: '🔮' },
    { slug: 'daily-tarot', title: '今日塔罗牌', desc: '从大阿尔卡纳抽一张，一整天都是它', icon: '🃏' },
    { slug: 'tarot-yesno', title: '塔罗是或否', desc: '心里想着一个问题，抽一张牌', icon: '🔮' },
    { slug: 'tarot', title: '塔罗占卜', desc: '78张全套牌、四种牌阵、正位与逆位', icon: '🎴' },
    { slug: 'saju', title: '四柱八字（韩式四柱）', desc: '你的四柱、五行、日主和大运', icon: '🀄' },
    { slug: 'today-color', title: '今日幸运色', desc: '今天的一个颜色和一个数字', icon: '🎨' },
    { slug: 'lucky-numbers', title: '幸运数字', desc: '按出生日期出六个数字，每天都换', icon: '🍀' },
    { slug: 'biorhythm', title: '生物节律', desc: '从出生日期算体力、情绪和智力三条曲线', icon: '📈' },
  ],
  'zh-hant': [
    { slug: 'today', title: '今日運勢', desc: '按星座、生肖、血型或MBTI看今天', icon: '🔮' },
    { slug: 'daily-tarot', title: '今日塔羅牌', desc: '從大阿爾克那抽一張，一整天都是它', icon: '🃏' },
    { slug: 'tarot-yesno', title: '塔羅是或否', desc: '心裡想著一個問題，抽一張牌', icon: '🔮' },
    { slug: 'tarot', title: '塔羅占卜', desc: '78張全套牌、四種牌陣、正位與逆位', icon: '🎴' },
    { slug: 'saju', title: '四柱八字（韓式四柱）', desc: '你的四柱、五行、日主和大運', icon: '🀄' },
    { slug: 'today-color', title: '今日幸運色', desc: '今天的一個顏色和一個數字', icon: '🎨' },
    { slug: 'lucky-numbers', title: '幸運數字', desc: '按出生日期出六個數字，每天都換', icon: '🍀' },
    { slug: 'biorhythm', title: '生物節律', desc: '從出生日期算體力、情緒和智力三條曲線', icon: '📈' },
  ],
};

export const SNAP_INTL: Partial<Record<SearchIntlLang, Entry[]>> = {
  en: [
    { slug: 'smile-score', title: 'Smile Score', desc: 'One photo, and it scores the smile', icon: '😄' },
    { slug: 'face-symmetry', title: 'Face Symmetry', desc: 'How closely the two halves match', icon: '🪞' },
    { slug: 'face-shape', title: 'Face Shape', desc: 'Oval, round, square or heart', icon: '🥚' },
    { slug: 'golden-ratio', title: 'Golden Ratio', desc: 'Facial proportions against 1:1.618', icon: '📐' },
    { slug: 'personal-color', title: 'Personal Colour', desc: 'Warm or cool, from the photo', icon: '🎨' },
  ],
  'es': [
    { slug: 'smile-score', title: 'Puntuación de la sonrisa', desc: 'Una foto y te puntúa la sonrisa', icon: '😄' },
    { slug: 'face-symmetry', title: 'Simetría facial', desc: 'Cuánto se parecen las dos mitades', icon: '🪞' },
    { slug: 'face-shape', title: 'Forma del rostro', desc: 'Ovalada, redonda, cuadrada o de corazón', icon: '🥚' },
    { slug: 'golden-ratio', title: 'Proporción áurea', desc: 'Proporciones del rostro frente a 1:1,618', icon: '📐' },
    { slug: 'personal-color', title: 'Color personal', desc: 'Cálido o frío, a partir de la foto', icon: '🎨' },
  ],
  'pt-br': [
    { slug: 'smile-score', title: 'Nota do sorriso', desc: 'Uma foto e ele dá nota ao sorriso', icon: '😄' },
    { slug: 'face-symmetry', title: 'Simetria facial', desc: 'O quanto as duas metades combinam', icon: '🪞' },
    { slug: 'face-shape', title: 'Formato do rosto', desc: 'Oval, redondo, quadrado ou coração', icon: '🥚' },
    { slug: 'golden-ratio', title: 'Proporção áurea', desc: 'Proporções do rosto em relação a 1:1,618', icon: '📐' },
    { slug: 'personal-color', title: 'Cor pessoal', desc: 'Quente ou frio, a partir da foto', icon: '🎨' },
  ],
  'ja': [
    { slug: 'smile-score', title: 'スマイル判定', desc: '写真を1枚、笑顔を採点します', icon: '😄' },
    { slug: 'face-symmetry', title: '顔の左右対称', desc: '左右がどれだけ揃っているか', icon: '🪞' },
    { slug: 'face-shape', title: '顔型診断', desc: '卵型・丸型・四角・ハート型', icon: '🥚' },
    { slug: 'golden-ratio', title: '黄金比', desc: '顔の比率を1:1.618と見比べる', icon: '📐' },
    { slug: 'personal-color', title: 'パーソナルカラー', desc: '写真からイエベかブルベか', icon: '🎨' },
  ],
  'de': [
    { slug: 'smile-score', title: 'Lächel-Score', desc: 'Ein Foto, und es bewertet das Lächeln', icon: '😄' },
    { slug: 'face-symmetry', title: 'Gesichtssymmetrie', desc: 'Wie genau die beiden Hälften zusammenpassen', icon: '🪞' },
    { slug: 'face-shape', title: 'Gesichtsform', desc: 'Oval, rund, eckig oder herzförmig', icon: '🥚' },
    { slug: 'golden-ratio', title: 'Goldener Schnitt', desc: 'Gesichtsproportionen im Vergleich zu 1:1,618', icon: '📐' },
    { slug: 'personal-color', title: 'Personal Color', desc: 'Warm oder kühl, anhand des Fotos', icon: '🎨' },
  ],
  'fr': [
    { slug: 'smile-score', title: 'Score du sourire', desc: 'Une photo et il note le sourire', icon: '😄' },
    { slug: 'face-symmetry', title: 'Symétrie du visage', desc: 'À quel point les deux moitiés se ressemblent', icon: '🪞' },
    { slug: 'face-shape', title: 'Forme du visage', desc: 'Ovale, rond, carré ou en cœur', icon: '🥚' },
    { slug: 'golden-ratio', title: 'Nombre d’or', desc: 'Proportions du visage face à 1:1,618', icon: '📐' },
    { slug: 'personal-color', title: 'Colorimétrie personnelle', desc: 'Chaud ou froid, à partir de la photo', icon: '🎨' },
  ],
  'hi': [
    { slug: 'smile-score', title: 'स्माइल स्कोर', desc: 'एक फ़ोटो, और मुस्कान को अंक मिलते हैं', icon: '😄' },
    { slug: 'face-symmetry', title: 'चेहरे की समरूपता', desc: 'दोनों हिस्से कितने मिलते हैं', icon: '🪞' },
    { slug: 'face-shape', title: 'चेहरे का आकार', desc: 'अंडाकार, गोल, चौकोर या दिल जैसा', icon: '🥚' },
    { slug: 'golden-ratio', title: 'स्वर्ण अनुपात', desc: 'चेहरे के अनुपात 1:1.618 के मुक़ाबले', icon: '📐' },
    { slug: 'personal-color', title: 'पर्सनल कलर', desc: 'फ़ोटो से — गर्म या ठंडा टोन', icon: '🎨' },
  ],
  'zh-hans': [
    { slug: 'smile-score', title: '微笑评分', desc: '一张照片，给你的笑容打分', icon: '😄' },
    { slug: 'face-symmetry', title: '脸部对称度', desc: '左右两半有多接近', icon: '🪞' },
    { slug: 'face-shape', title: '脸型判断', desc: '鹅蛋、圆、方还是心形', icon: '🥚' },
    { slug: 'golden-ratio', title: '黄金比例', desc: '把脸部比例和1:1.618对照', icon: '📐' },
    { slug: 'personal-color', title: '个人色彩', desc: '从照片看是暖调还是冷调', icon: '🎨' },
  ],
  'zh-hant': [
    { slug: 'smile-score', title: '微笑評分', desc: '一張照片，給你的笑容打分', icon: '😄' },
    { slug: 'face-symmetry', title: '臉部對稱度', desc: '左右兩半有多接近', icon: '🪞' },
    { slug: 'face-shape', title: '臉型判斷', desc: '鵝蛋、圓、方還是心形', icon: '🥚' },
    { slug: 'golden-ratio', title: '黃金比例', desc: '把臉部比例和1:1.618對照', icon: '📐' },
    { slug: 'personal-color', title: '個人色彩', desc: '從照片看是暖調還是冷調', icon: '🎨' },
  ],
};

/**
 * 단위 변환 100종.
 *
 * 사전(lib/convert-l10n/)에 이미 그 언어 제목·설명이 있으므로 여기서 다시 쓰지
 * 않고 꺼내 쓴다. 검색 결과의 문장과 페이지의 문장이 같아야 누른 사람이 같은
 * 도구로 읽는다.
 */
function convertEntries(lang: SearchIntlLang): Entry[] {
  return CONVERT_TOOLS.map(t => {
    const l = convertL10n(t.slug, lang);
    return { slug: t.slug, title: l?.title ?? t.title, desc: l?.desc ?? t.desc, icon: t.icon };
  });
}

/** 언어별 검색 목록 — 실제로 그 언어에 있는 페이지만 담는다 */
export function searchIndexIntl(lang: SearchIntlLang): SearchIntlItem[] {
  const tools = (sec: string, list: Entry[] = []) =>
    list.map(t => ({
      href: localeHref(lang, `/${sec}/${t.slug}`),
      title: t.title, desc: t.desc, section: sec, icon: t.icon,
    }));

  // 영어에만 있는 섹션 — 다른 언어에 실으면 누르는 사람이 404를 본다
  const enOnly = lang === 'en';

  return [
    ...tools('convert', convertEntries(lang)),
    ...tools('color', colorToolsIntl(lang)),
    ...tools('time', timeToolsIntl(lang)),
    ...tools('image', imageToolsIntl(lang)),
    ...tools('sound', soundToolsIntl(lang)),
    ...tools('food', foodToolsIntl(lang)),
    ...tools('game', gameToolsIntl(lang)),
    ...tools('device', deviceToolsIntl(lang)),
    ...tools('text', textToolsIntl(lang)),
    ...(enOnly ? tools('checklist', CHECKLISTS_EN) : []),
    ...(enOnly ? tools('quiz', QUIZZES_EN) : []),
    ...(enOnly ? tools('test', TESTS_EN) : []),
    ...tools('fortune', FORTUNE_INTL[lang]),
    ...tools('snap', SNAP_INTL[lang]),
  ];
}

export const SEARCH_INTL_UI: Record<SearchIntlLang, {
  title: string; desc: string; heading: string; h1: string;
  countSuffix: (n: number) => string;
  placeholder: string; noResult: string; hint: string;
  /** 섹션 필터의 '전체' 버튼 */
  all: string;
}> = {
  en: {
    title: 'Search',
    desc: 'Search every tool on the site at once — converters, tests, quizzes, checklists, games and more. You do not need to know which section it is in.',
    heading: 'Search', h1: 'Search every tool on vixutil',
    countSuffix: n => `${n} tools`,
    placeholder: 'Search by name — timer, dead pixel, cups to grams…',
    noResult: 'Nothing matched. Try a shorter word, or the name of the thing you want to measure.',
    hint: 'Everything here runs in your browser. No sign-up, nothing uploaded.',
    all: 'All',
  },
  es: {
    title: 'Buscar herramientas',
    desc: 'Busca de una vez todas las herramientas del sitio: conversores, colores, imágenes, sonido, cocina, juegos, aparatos y texto. No hace falta saber en qué sección está.',
    heading: 'Buscar', h1: 'Busca cualquier herramienta de vixutil',
    countSuffix: n => `${n} herramientas`,
    placeholder: 'Escribe un nombre: temporizador, píxel muerto, tazas a gramos…',
    noResult: 'No hay coincidencias. Prueba con una palabra más corta, o con el nombre de lo que quieres medir.',
    hint: 'Todo funciona en tu navegador. Sin registro y sin subir nada.',
    all: 'Todo',
  },
  'pt-br': {
    title: 'Buscar ferramentas',
    desc: 'Busque de uma vez todas as ferramentas do site: conversores, cores, imagens, som, cozinha, jogos, aparelhos e texto. Você não precisa saber em qual seção está.',
    heading: 'Buscar', h1: 'Busque qualquer ferramenta do vixutil',
    countSuffix: n => `${n} ferramentas`,
    placeholder: 'Digite um nome: timer, pixel morto, xícaras para gramas…',
    noResult: 'Nada corresponde. Tente uma palavra mais curta, ou o nome do que você quer medir.',
    hint: 'Tudo roda no seu navegador. Sem cadastro e sem enviar nada.',
    all: 'Tudo',
  },
  ja: {
    title: '検索',
    desc: 'サイトのツールをまとめて検索します。単位変換・配色・画像・音・料理・ゲーム・端末チェック・テキストまで、どのセクションにあるか知らなくても見つかります。',
    heading: '検索', h1: 'vixutilのツールをまとめて検索',
    countSuffix: n => `${n}件`,
    placeholder: '名前で検索 — タイマー、ドット抜け、カップ→グラム…',
    noResult: '見つかりませんでした。短い言葉か、測りたいものの名前で試してください。',
    hint: 'すべてブラウザ上で動きます。登録も送信もありません。',
    all: 'すべて',
  },
  de: {
    title: 'Suche',
    desc: 'Durchsuche alle Werkzeuge der Seite auf einmal — Umrechner, Farben, Bilder, Klang, Küche, Spiele, Gerätetests und Text. Du musst nicht wissen, in welchem Bereich etwas steckt.',
    heading: 'Suche', h1: 'Alle Werkzeuge auf vixutil durchsuchen',
    countSuffix: n => `${n} Werkzeuge`,
    placeholder: 'Nach Namen suchen — Timer, Pixelfehler, Cups in Gramm…',
    noResult: 'Nichts gefunden. Versuch ein kürzeres Wort, oder den Namen dessen, was du messen willst.',
    hint: 'Alles läuft in deinem Browser. Keine Anmeldung, nichts wird hochgeladen.',
    all: 'Alle',
  },
  fr: {
    title: 'Recherche',
    desc: 'Cherche tous les outils du site d’un coup : convertisseurs, couleurs, images, son, cuisine, jeux, tests d’appareil et texte. Pas besoin de savoir dans quelle section ils se trouvent.',
    heading: 'Recherche', h1: 'Chercher n’importe quel outil de vixutil',
    countSuffix: n => `${n} outils`,
    placeholder: 'Cherche par nom — minuteur, pixel mort, tasses en grammes…',
    noResult: 'Aucun résultat. Essaie un mot plus court, ou le nom de ce que tu veux mesurer.',
    hint: 'Tout tourne dans ton navigateur. Sans inscription, rien n’est envoyé.',
    all: 'Tout',
  },
  hi: {
    title: 'खोज',
    desc: 'साइट के सारे उपकरण एक बार में खोजें — कनवर्टर, रंग, इमेज, ध्वनि, रसोई, खेल, उपकरण जाँच और टेक्स्ट। कौन-सा किस हिस्से में है, यह जानना ज़रूरी नहीं।',
    heading: 'खोज', h1: 'vixutil के सारे उपकरण खोजें',
    countSuffix: n => `${n} उपकरण`,
    placeholder: 'नाम से खोजें — टाइमर, डेड पिक्सेल, कप से ग्राम…',
    noResult: 'कुछ नहीं मिला। छोटा शब्द आज़माएँ, या जो नापना है उसका नाम लिखें।',
    hint: 'सब कुछ आपके ब्राउज़र में चलता है। कोई खाता नहीं, कुछ अपलोड नहीं।',
    all: 'सब',
  },
  'zh-hans': {
    title: '搜索',
    desc: '一次搜遍站内所有工具 — 换算、检测、测验、清单、小游戏都在内。不用先知道它在哪个分类。',
    heading: '搜索', h1: '搜遍 vixutil 的所有工具',
    countSuffix: n => `${n}个工具`,
    placeholder: '按名字搜 — 计时器、坏点、杯换克…',
    noResult: '没有对上的。换个更短的词，或者直接搜你想量的东西的名字。',
    hint: '这里的一切都在你的浏览器里跑。不用注册，什么都不上传。',
    all: '全部',
  },
  'zh-hant': {
    title: '搜尋',
    desc: '一次搜遍站內所有工具 — 換算、檢測、測驗、清單、小遊戲都在內。不用先知道它在哪個分類。',
    heading: '搜尋', h1: '搜遍 vixutil 的所有工具',
    countSuffix: n => `${n}個工具`,
    placeholder: '按名字搜 — 計時器、壞點、杯換公克…',
    noResult: '沒有對上的。換個更短的詞，或者直接搜你想量的東西的名字。',
    hint: '這裡的一切都在你的瀏覽器裡跑。不用註冊，什麼都不上傳。',
    all: '全部',
  },
};

/**
 * 검색 페이지의 hreflang.
 *
 * 한국어 /search는 계산기·크립토까지 담은 다른 목록이라 짝으로 맺지 않는다.
 * 번역 일곱 언어끼리는 같은 구성이므로 서로를 가리켜야 한다 — 한쪽 방향만
 * 걸린 hreflang은 구글이 짝으로 인정하지 않는다.
 */
export function searchAlternates(): Record<string, string> {
  return alternateLanguagesFor('/search', [...ALL_LOCALES10.filter(l => l !== 'ko')]);
}
