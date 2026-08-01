import type { ReactElement } from 'react';
import { ogCard } from './og-template';
import type { AnyLocale, IntlLocale } from './locales';
import type { ToolIntlLang } from './time-tools-intl';
import type { ImageIntlLang } from './image-tools-intl';
import type { FoodIntlLang } from './food-tools-intl';
import type { SoundIntlLang } from './sound-tools-intl';
import type { GameIntlLang } from './game-tools-intl';
import type { DeviceIntlLang } from './device-tools-intl';
import type { TextIntlLang } from './text-tools-intl';
import { findColorToolIntl, type ColorIntlLang } from './color-tools-intl';
import { findTimeToolIntl } from './time-tools-intl';
import { findImageToolIntl } from './image-tools-intl';
import { findFoodToolIntl } from './food-tools-intl';
import { findSoundToolIntl } from './sound-tools-intl';
import { findGameToolIntl } from './game-tools-intl';
import { findDeviceToolIntl } from './device-tools-intl';
import { findTextToolIntl } from './text-tools-intl';
import { COLOR_TOOLS } from './color-tools';
import { TIME_TOOLS } from './time-tools';
import { IMAGE_TOOLS } from './image-tools';
import { FOOD_TOOLS } from './food-tools';
import { SOUND_TOOLS } from './sound-tools';
import { GAME_TOOLS } from './game-tools';
import { DEVICE_TOOLS } from './device-tools';
import { TEXT_TOOLS } from './text-tools';
import { RANDOM_TOOLS_MAP, type RandomTool } from './random-tools';
import { CONVERT_MAP } from './convert-tools';
import { CONVERT_CATEGORY, convertL10n } from './convert-i18n';
import { randomL10n } from './random-ui-intl';
import { snapIntlCards } from './snap-tools-intl';
import { fortuneIntlCards } from './fortune-tools-intl';

/**
 * 다국어 공유 카드.
 *
 * 카드마다 라우트 파일에 문구를 적으면 같은 문장이 페이지·허브·카드 세 군데에
 * 흩어진다. 그래서 문구는 여기 한 곳에 두고 라우트는 키만 넘긴다.
 *
 * 문구는 허브 목록에 쓰는 문장과 같게 맞춘다 — 목록에서 보고 눌렀는데 공유
 * 카드가 다른 말을 하면 같은 도구로 안 읽힌다.
 *
 * 색은 한국어 라우트와 같은 값을 쓴다. 언어마다 색이 다르면 같은 도구의
 * 카드가 다른 도구처럼 보인다.
 *
 * 색상·시간 도구는 이미 섹션 사전(color-tools-intl·time-tools-intl)에 언어별
 * 문구가 있어서 표에 넣지 않고 그쪽을 읽는다. 단위 변환·랜덤 뽑기도 마찬가지로
 * 각 섹션 사전에서 꺼낸다 — 같은 문장을 표에 한 번 더 적으면 곧 서로 어긋난다.
 */

type Card = { icon: string; eyebrow: string; title: string; desc: string; from: string; to: string };

/** 표의 열쇠는 "<섹션>[/<도구>]/<언어>" */
const CARDS: Record<string, Card> = {
  'home/en': { icon: '🧰', eyebrow: 'vixutil', title: 'Free Everyday Tools', desc: 'Conversion · checklists · quizzes · tests · generators · horoscopes', from: '#7c3aed', to: '#0ea5e9' },
  'home/es': { icon: '🧰', eyebrow: 'vixutil', title: 'Herramientas gratis', desc: 'Colores · paletas · contraste · degradados CSS, en el navegador', from: '#7c3aed', to: '#0ea5e9' },
  'home/pt-br': { icon: '🧰', eyebrow: 'vixutil', title: 'Ferramentas grátis', desc: 'Cores · paletas · contraste · gradiente CSS, no navegador', from: '#7c3aed', to: '#0ea5e9' },
  'home/ja': { icon: '🧰', eyebrow: 'vixutil', title: '無料の便利ツール', desc: '配色 · コントラスト比 · CSSグラデーション、ブラウザで完結', from: '#7c3aed', to: '#0ea5e9' },
  'home/de': { icon: '🧰', eyebrow: 'vixutil', title: 'Kostenlose Werkzeuge', desc: 'Farben · Paletten · Kontrast · CSS-Verläufe, im Browser', from: '#7c3aed', to: '#0ea5e9' },
  'home/fr': { icon: '🧰', eyebrow: 'vixutil', title: 'Outils gratuits', desc: 'Couleurs · palettes · contraste · dégradés CSS, dans le navigateur', from: '#7c3aed', to: '#0ea5e9' },
  'home/zh-hans': { icon: '🧰', eyebrow: 'vixutil', title: '免费的日常小工具', desc: '国际象棋开局 · 德州扑克起手牌 · 着法与概率', from: '#7c3aed', to: '#0ea5e9' },
  'home/zh-hant': { icon: '🧰', eyebrow: 'vixutil', title: '免費的日常小工具', desc: '西洋棋開局 · 德州撲克起手牌 · 著法與機率', from: '#7c3aed', to: '#0ea5e9' },
  'home/hi': { icon: '🧰', eyebrow: 'vixutil', title: 'मुफ़्त उपकरण', desc: 'रंग · पैलेट · कंट्रास्ट · CSS ग्रेडिएंट, ब्राउज़र में', from: '#7c3aed', to: '#0ea5e9' },
  'color/en': { icon: '🎨', eyebrow: 'Color Tools', title: 'Colour Tools', desc: 'Palette · contrast · CSS gradient, in the browser', from: '#8b5cf6', to: '#d946ef' },
  'color/es': { icon: '🎨', eyebrow: 'Colour', title: 'Herramientas de color', desc: 'Paletas · contraste · gradiente CSS · sombras', from: '#d946ef', to: '#f43f5e' },
  'color/pt-br': { icon: '🎨', eyebrow: 'Colour', title: 'Ferramentas de cor', desc: 'Paletas · contraste · gradiente CSS · sombras', from: '#d946ef', to: '#f43f5e' },
  'color/ja': { icon: '🎨', eyebrow: 'Colour', title: 'カラーツール', desc: '配色 · コントラスト · CSSグラデーション · 影', from: '#d946ef', to: '#f43f5e' },
  'color/de': { icon: '🎨', eyebrow: 'Colour', title: 'Farbwerkzeuge', desc: 'Paletten · Kontrast · CSS-Verlauf · Schatten', from: '#d946ef', to: '#f43f5e' },
  'color/fr': { icon: '🎨', eyebrow: 'Colour', title: 'Outils de couleur', desc: 'Palettes · contraste · dégradé CSS · ombres', from: '#d946ef', to: '#f43f5e' },
  'color/hi': { icon: '🎨', eyebrow: 'Colour', title: 'रंग उपकरण', desc: 'पैलेट · कंट्रास्ट · CSS ग्रेडिएंट · छाया', from: '#d946ef', to: '#f43f5e' },
  'convert/en': { icon: '🔄', eyebrow: 'Unit Converter', title: 'Unit Converter', desc: '100 converters incl. Korean pyeong, geun, don', from: '#3b82f6', to: '#4f46e5' },
  'convert/es': { icon: '🔄', eyebrow: 'Unit Converter', title: 'Conversor de unidades', desc: 'Longitud · peso · volumen · temperatura · datos', from: '#3b82f6', to: '#4f46e5' },
  'convert/pt-br': { icon: '🔄', eyebrow: 'Unit Converter', title: 'Conversor de unidades', desc: 'Comprimento · peso · volume · temperatura · dados', from: '#3b82f6', to: '#4f46e5' },
  'convert/ja': { icon: '🔄', eyebrow: 'Unit Converter', title: '単位変換', desc: '長さ · 重さ · 体積 · 温度 · データ', from: '#3b82f6', to: '#4f46e5' },
  'convert/de': { icon: '🔄', eyebrow: 'Unit Converter', title: 'Einheitenrechner', desc: 'Länge · Gewicht · Volumen · Temperatur · Daten', from: '#3b82f6', to: '#4f46e5' },
  'convert/fr': { icon: '🔄', eyebrow: 'Unit Converter', title: 'Convertisseur d’unités', desc: 'Longueur · poids · volume · température · données', from: '#3b82f6', to: '#4f46e5' },
  'convert/hi': { icon: '🔄', eyebrow: 'Unit Converter', title: 'इकाई कनवर्टर', desc: 'लंबाई · वज़न · आयतन · तापमान · डेटा', from: '#3b82f6', to: '#4f46e5' },
  'image/en': { icon: '🖼️', eyebrow: 'Image Tools', title: 'Image Tools', desc: 'Compress · resize · convert · crop, in the browser', from: '#8b5cf6', to: '#0ea5e9' },
  'image/es': { icon: '🖼️', eyebrow: 'Image Tools', title: 'Herramientas de imagen', desc: 'Comprimir · redimensionar · convertir · recortar, en el navegador', from: '#8b5cf6', to: '#0ea5e9' },
  'image/pt-br': { icon: '🖼️', eyebrow: 'Image Tools', title: 'Ferramentas de imagem', desc: 'Comprimir · redimensionar · converter · recortar, no navegador', from: '#8b5cf6', to: '#0ea5e9' },
  'image/ja': { icon: '🖼️', eyebrow: 'Image Tools', title: '画像ツール', desc: '圧縮 · サイズ変更 · 形式変換 · 切り抜き、ブラウザで完結', from: '#8b5cf6', to: '#0ea5e9' },
  'image/de': { icon: '🖼️', eyebrow: 'Image Tools', title: 'Bildwerkzeuge', desc: 'Komprimieren · skalieren · umwandeln · zuschneiden, im Browser', from: '#8b5cf6', to: '#0ea5e9' },
  'image/fr': { icon: '🖼️', eyebrow: 'Image Tools', title: 'Outils d’image', desc: 'Compresser · redimensionner · convertir · recadrer, dans le navigateur', from: '#8b5cf6', to: '#0ea5e9' },
  'image/hi': { icon: '🖼️', eyebrow: 'Image Tools', title: 'इमेज उपकरण', desc: 'कंप्रेस · आकार · फ़ॉर्मेट · क्रॉप, ब्राउज़र में', from: '#8b5cf6', to: '#0ea5e9' },
  'food/en': { icon: '🍳', eyebrow: 'Cooking Tools', title: 'Cooking Tools', desc: 'Cups to grams · recipe scaling · oven temperatures', from: '#f59e0b', to: '#dc2626' },
  'food/es': { icon: '🍳', eyebrow: 'Cooking Tools', title: 'Herramientas de cocina', desc: 'Tazas a gramos · horno · arroz · café', from: '#f59e0b', to: '#dc2626' },
  'food/pt-br': { icon: '🍳', eyebrow: 'Cooking Tools', title: 'Ferramentas de cozinha', desc: 'Xícaras para gramas · forno · arroz · café', from: '#f59e0b', to: '#dc2626' },
  'food/ja': { icon: '🍳', eyebrow: 'Cooking Tools', title: '料理ツール', desc: 'カップ→グラム · オーブン温度 · 水加減 · コーヒー', from: '#f59e0b', to: '#dc2626' },
  'food/de': { icon: '🍳', eyebrow: 'Cooking Tools', title: 'Küchenwerkzeuge', desc: 'Cups in Gramm · Ofentemperatur · Reis · Kaffee', from: '#f59e0b', to: '#dc2626' },
  'food/fr': { icon: '🍳', eyebrow: 'Cooking Tools', title: 'Outils de cuisine', desc: 'Tasses en grammes · four · riz · café', from: '#f59e0b', to: '#dc2626' },
  'food/hi': { icon: '🍳', eyebrow: 'Cooking Tools', title: 'रसोई उपकरण', desc: 'कप से ग्राम · ओवन · चावल · कॉफ़ी', from: '#f59e0b', to: '#dc2626' },
  'search/en': { icon: '🔍', eyebrow: 'Search', title: 'Search Every Tool', desc: 'Converters · tests · quizzes · checklists · games', from: '#6366f1', to: '#8b5cf6' },
  'search/es': { icon: '🔍', eyebrow: 'Search', title: 'Busca cualquier herramienta', desc: 'Unidades · color · imagen · sonido · cocina · juegos', from: '#6366f1', to: '#8b5cf6' },
  'search/pt-br': { icon: '🔍', eyebrow: 'Search', title: 'Busque qualquer ferramenta', desc: 'Unidades · cor · imagem · som · cozinha · jogos', from: '#6366f1', to: '#8b5cf6' },
  'search/ja': { icon: '🔍', eyebrow: 'Search', title: 'ツールをまとめて検索', desc: '単位 · 配色 · 画像 · 音 · 料理 · ゲーム', from: '#6366f1', to: '#8b5cf6' },
  'search/de': { icon: '🔍', eyebrow: 'Search', title: 'Alle Werkzeuge durchsuchen', desc: 'Einheiten · Farbe · Bild · Klang · Küche · Spiele', from: '#6366f1', to: '#8b5cf6' },
  'search/fr': { icon: '🔍', eyebrow: 'Search', title: 'Chercher tous les outils', desc: 'Unités · couleur · image · son · cuisine · jeux', from: '#6366f1', to: '#8b5cf6' },
  'search/hi': { icon: '🔍', eyebrow: 'Search', title: 'सारे उपकरण खोजें', desc: 'इकाई · रंग · इमेज · ध्वनि · रसोई · खेल', from: '#6366f1', to: '#8b5cf6' },
  'game/en': { icon: '🎮', eyebrow: 'Brain Games', title: 'Brain Games', desc: 'Reaction · memory · typing · aim · mental maths', from: '#10b981', to: '#0d9488' },
  'game/es': { icon: '🎮', eyebrow: 'Brain Games', title: 'Juegos mentales', desc: 'Reacción · memoria · escritura · puntería · cálculo', from: '#10b981', to: '#0d9488' },
  'game/pt-br': { icon: '🎮', eyebrow: 'Brain Games', title: 'Jogos mentais', desc: 'Reação · memória · digitação · mira · cálculo', from: '#10b981', to: '#0d9488' },
  'game/ja': { icon: '🎮', eyebrow: 'Brain Games', title: '脳トレゲーム', desc: '反応速度 · 記憶 · タイピング · エイム · 暗算', from: '#10b981', to: '#0d9488' },
  'game/de': { icon: '🎮', eyebrow: 'Brain Games', title: 'Denkspiele', desc: 'Reaktion · Gedächtnis · Tippen · Zielen · Kopfrechnen', from: '#10b981', to: '#0d9488' },
  'game/fr': { icon: '🎮', eyebrow: 'Brain Games', title: 'Jeux de cerveau', desc: 'Réaction · mémoire · frappe · visée · calcul', from: '#10b981', to: '#0d9488' },
  'game/hi': { icon: '🎮', eyebrow: 'Brain Games', title: 'दिमाग़ी खेल', desc: 'प्रतिक्रिया · स्मृति · टाइपिंग · निशाना · गणित', from: '#10b981', to: '#0d9488' },
  'device/en': { icon: '🔧', eyebrow: 'Device Tests', title: 'Device Tests', desc: 'Keyboard · mouse · mic · webcam · dead pixels', from: '#0ea5e9', to: '#2563eb' },
  'device/es': { icon: '🔧', eyebrow: 'Device Tests', title: 'Tests de aparatos', desc: 'Teclado · ratón · micro · webcam · píxeles muertos', from: '#0ea5e9', to: '#2563eb' },
  'device/pt-br': { icon: '🔧', eyebrow: 'Device Tests', title: 'Testes de aparelho', desc: 'Teclado · mouse · microfone · webcam · pixel morto', from: '#0ea5e9', to: '#2563eb' },
  'device/ja': { icon: '🔧', eyebrow: 'Device Tests', title: '端末チェック', desc: 'キーボード · マウス · マイク · カメラ · ドット抜け', from: '#0ea5e9', to: '#2563eb' },
  'device/de': { icon: '🔧', eyebrow: 'Device Tests', title: 'Gerätetests', desc: 'Tastatur · Maus · Mikrofon · Webcam · Pixelfehler', from: '#0ea5e9', to: '#2563eb' },
  'device/fr': { icon: '🔧', eyebrow: 'Device Tests', title: 'Tests d’appareil', desc: 'Clavier · souris · micro · webcam · pixels morts', from: '#0ea5e9', to: '#2563eb' },
  'device/hi': { icon: '🔧', eyebrow: 'Device Tests', title: 'उपकरण जाँच', desc: 'कीबोर्ड · माउस · माइक · वेबकैम · डेड पिक्सेल', from: '#0ea5e9', to: '#2563eb' },
  'text/en': { icon: '✏️', eyebrow: 'Text Tools', title: 'Text Tools', desc: 'Clean up · dedupe · case convert · count', from: '#6366f1', to: '#7c3aed' },
  'text/es': { icon: '✏️', eyebrow: 'Text Tools', title: 'Herramientas de texto', desc: 'Limpiar · deduplicar · mayúsculas · contar', from: '#6366f1', to: '#7c3aed' },
  'text/pt-br': { icon: '✏️', eyebrow: 'Text Tools', title: 'Ferramentas de texto', desc: 'Limpar · deduplicar · maiúsculas · contar', from: '#6366f1', to: '#7c3aed' },
  'text/ja': { icon: '✏️', eyebrow: 'Text Tools', title: 'テキストツール', desc: '整形 · 重複削除 · 大文字小文字 · 文字数', from: '#6366f1', to: '#7c3aed' },
  'text/de': { icon: '✏️', eyebrow: 'Text Tools', title: 'Textwerkzeuge', desc: 'Aufräumen · Entdoppeln · Schreibweise · Zählen', from: '#6366f1', to: '#7c3aed' },
  'text/fr': { icon: '✏️', eyebrow: 'Text Tools', title: 'Outils de texte', desc: 'Nettoyer · dédoublonner · casse · compter', from: '#6366f1', to: '#7c3aed' },
  'text/hi': { icon: '✏️', eyebrow: 'Text Tools', title: 'टेक्स्ट उपकरण', desc: 'सफ़ाई · दोहराव · अक्षर-आकार · गिनती', from: '#6366f1', to: '#7c3aed' },
  'tarot/en': { icon: '🎴', eyebrow: 'Tarot', title: 'Tarot Reading', desc: 'Full 78-card deck · four spreads · upright and reversed', from: '#8b5cf6', to: '#6d28d9' },
  'sound/en': { icon: '🔊', eyebrow: 'Sound Tools', title: 'Sound Tools', desc: 'Metronome · tuner · white noise, made by the browser', from: '#6366f1', to: '#0ea5e9' },
  'sound/es': { icon: '🔊', eyebrow: 'Sound Tools', title: 'Herramientas de sonido', desc: 'Metrónomo · afinador · ruido blanco · tonos', from: '#6366f1', to: '#0ea5e9' },
  'sound/pt-br': { icon: '🔊', eyebrow: 'Sound Tools', title: 'Ferramentas de som', desc: 'Metrônomo · afinador · ruído branco · tons', from: '#6366f1', to: '#0ea5e9' },
  'sound/ja': { icon: '🔊', eyebrow: 'Sound Tools', title: 'サウンドツール', desc: 'メトロノーム · チューナー · ホワイトノイズ · トーン', from: '#6366f1', to: '#0ea5e9' },
  'sound/de': { icon: '🔊', eyebrow: 'Sound Tools', title: 'Klangwerkzeuge', desc: 'Metronom · Stimmgerät · Rauschen · Töne', from: '#6366f1', to: '#0ea5e9' },
  'sound/fr': { icon: '🔊', eyebrow: 'Sound Tools', title: 'Outils de son', desc: 'Métronome · accordeur · bruit blanc · tons', from: '#6366f1', to: '#0ea5e9' },
  'sound/hi': { icon: '🔊', eyebrow: 'Sound Tools', title: 'ध्वनि उपकरण', desc: 'मेट्रोनोम · ट्यूनर · व्हाइट नॉइज़ · टोन', from: '#6366f1', to: '#0ea5e9' },
  'time/en': { icon: '⏰', eyebrow: 'Time Tools', title: 'Time Tools', desc: 'Timer · stopwatch · world clock · date maths', from: '#0ea5e9', to: '#f43f5e' },
  'time/es': { icon: '⏰', eyebrow: 'Time Tools', title: 'Herramientas de tiempo', desc: 'Temporizador · cronómetro · reloj mundial · fechas', from: '#0ea5e9', to: '#f43f5e' },
  'time/pt-br': { icon: '⏰', eyebrow: 'Time Tools', title: 'Ferramentas de tempo', desc: 'Timer · cronômetro · relógio mundial · datas', from: '#0ea5e9', to: '#f43f5e' },
  'time/ja': { icon: '⏰', eyebrow: 'Time Tools', title: '時間ツール', desc: 'タイマー · ストップウォッチ · 世界時計 · 日付計算', from: '#0ea5e9', to: '#f43f5e' },
  'time/de': { icon: '⏰', eyebrow: 'Time Tools', title: 'Zeitwerkzeuge', desc: 'Timer · Stoppuhr · Weltzeituhr · Datumsrechnen', from: '#0ea5e9', to: '#f43f5e' },
  'time/fr': { icon: '⏰', eyebrow: 'Time Tools', title: 'Outils de temps', desc: 'Minuteur · chronomètre · horloge mondiale · dates', from: '#0ea5e9', to: '#f43f5e' },
  'time/hi': { icon: '⏰', eyebrow: 'Time Tools', title: 'समय उपकरण', desc: 'टाइमर · स्टॉपवॉच · विश्व घड़ी · तारीख़', from: '#0ea5e9', to: '#f43f5e' },
  'test/en': { icon: '🧭', eyebrow: 'Personality Test', title: 'Free Personality Tests', desc: 'Social battery · stress · decisions · working style', from: '#7c3aed', to: '#db2777' },
  'test/es': { icon: '🧭', eyebrow: 'Test de personalidad', title: 'Tests de personalidad gratis', desc: 'Batería social · estrés · decisiones · forma de trabajar', from: '#7c3aed', to: '#db2777' },
  'test/pt-br': { icon: '🧭', eyebrow: 'Teste de personalidade', title: 'Testes de personalidade grátis', desc: 'Bateria social · estresse · decisões · jeito de trabalhar', from: '#7c3aed', to: '#db2777' },
  'test/ja': { icon: '🧭', eyebrow: '心理テスト', title: '無料の心理テスト', desc: 'ソーシャルバッテリー · ストレス · 決め方 · 仕事のスタイル', from: '#7c3aed', to: '#db2777' },
  'test/de': { icon: '🧭', eyebrow: 'Persönlichkeitstest', title: 'Kostenlose Persönlichkeitstests', desc: 'Social Battery · Stress · Entscheidungen · Arbeitsstil', from: '#7c3aed', to: '#db2777' },
  'test/fr': { icon: '🧭', eyebrow: 'Test de personnalité', title: 'Tests de personnalité gratuits', desc: 'Batterie sociale · stress · décisions · façon de travailler', from: '#7c3aed', to: '#db2777' },
  'test/hi': { icon: '🧭', eyebrow: 'पर्सनैलिटी टेस्ट', title: 'मुफ़्त पर्सनैलिटी टेस्ट', desc: 'सोशल बैटरी · तनाव · फ़ैसले · काम का तरीक़ा', from: '#7c3aed', to: '#db2777' },
  'test/zh-hans': { icon: '🧭', eyebrow: '心理测试', title: '免费心理测试', desc: '社交电量 · 压力 · 决策方式 · 工作方式', from: '#7c3aed', to: '#db2777' },
  'test/zh-hant': { icon: '🧭', eyebrow: '心理測驗', title: '免費心理測驗', desc: '社交電量 · 壓力 · 決策方式 · 工作方式', from: '#7c3aed', to: '#db2777' },
  'quiz/en': { icon: '🏆', eyebrow: 'Quiz', title: 'Free Quizzes', desc: 'Geography · science · history · tech — ten questions each', from: '#f59e0b', to: '#ea580c' },
  'quiz/es': { icon: '🏆', eyebrow: 'Test', title: 'Tests de conocimiento gratis', desc: 'Geografía · ciencia · historia · tecnología — diez preguntas', from: '#f59e0b', to: '#ea580c' },
  'quiz/pt-br': { icon: '🏆', eyebrow: 'Quiz', title: 'Quizzes grátis', desc: 'Geografia · ciência · história · tecnologia — dez perguntas', from: '#f59e0b', to: '#ea580c' },
  'quiz/ja': { icon: '🏆', eyebrow: 'クイズ', title: '無料のクイズ', desc: '地理 · 科学 · 歴史 · テクノロジー — 各10問', from: '#f59e0b', to: '#ea580c' },
  'quiz/de': { icon: '🏆', eyebrow: 'Quiz', title: 'Kostenlose Quiz', desc: 'Geografie · Wissenschaft · Geschichte · Technik — je zehn Fragen', from: '#f59e0b', to: '#ea580c' },
  'quiz/fr': { icon: '🏆', eyebrow: 'Quiz', title: 'Quiz gratuits', desc: 'Géographie · sciences · histoire · technologie — dix questions', from: '#f59e0b', to: '#ea580c' },
  'quiz/hi': { icon: '🏆', eyebrow: 'क्विज़', title: 'मुफ़्त क्विज़', desc: 'भूगोल · विज्ञान · इतिहास · तकनीक — दस सवाल', from: '#f59e0b', to: '#ea580c' },
  'quiz/zh-hans': { icon: '🏆', eyebrow: '知识测验', title: '免费知识测验', desc: '地理 · 科学 · 历史 · 科技 — 每个十道题', from: '#f59e0b', to: '#ea580c' },
  'quiz/zh-hant': { icon: '🏆', eyebrow: '知識測驗', title: '免費知識測驗', desc: '地理 · 科學 · 歷史 · 科技 — 每個十道題', from: '#f59e0b', to: '#ea580c' },
  'checklist/en': { icon: '✅', eyebrow: 'Checklist', title: 'Free Checklists', desc: 'Moving · travel · interviews · camping · weddings', from: '#0ea5e9', to: '#0891b2' },
  'checklist/es': { icon: '✅', eyebrow: 'Listas', title: 'Listas de comprobación gratis', desc: 'Mudanza · viajes · entrevistas · acampada · bodas', from: '#0ea5e9', to: '#0891b2' },
  'checklist/pt-br': { icon: '✅', eyebrow: 'Checklist', title: 'Checklists grátis', desc: 'Mudança · viagem · entrevistas · acampamento · casamento', from: '#0ea5e9', to: '#0891b2' },
  'checklist/ja': { icon: '✅', eyebrow: 'チェックリスト', title: '無料のチェックリスト', desc: '引っ越し · 旅行 · 面接 · キャンプ · 結婚式', from: '#0ea5e9', to: '#0891b2' },
  'checklist/de': { icon: '✅', eyebrow: 'Checkliste', title: 'Kostenlose Checklisten', desc: 'Umzug · Reise · Bewerbung · Camping · Hochzeit', from: '#0ea5e9', to: '#0891b2' },
  'checklist/fr': { icon: '✅', eyebrow: 'Checklist', title: 'Checklists gratuites', desc: 'Déménagement · voyage · entretien · camping · mariage', from: '#0ea5e9', to: '#0891b2' },
  'checklist/hi': { icon: '✅', eyebrow: 'चेकलिस्ट', title: 'मुफ़्त चेकलिस्ट', desc: 'घर बदलना · यात्रा · इंटरव्यू · कैंपिंग · शादी', from: '#0ea5e9', to: '#0891b2' },
  'checklist/zh-hans': { icon: '✅', eyebrow: '清单', title: '免费清单', desc: '搬家 · 旅行 · 面试 · 露营 · 婚礼', from: '#0ea5e9', to: '#0891b2' },
  'checklist/zh-hant': { icon: '✅', eyebrow: '清單', title: '免費清單', desc: '搬家 · 旅行 · 面試 · 露營 · 婚禮', from: '#0ea5e9', to: '#0891b2' },
  'generator/en': { icon: '⚙️', eyebrow: 'Generator', title: 'Free Name Generators', desc: 'Fantasy · sci-fi · dragon · superhero · guild names', from: '#10b981', to: '#0d9488' },
  'generator/es': { icon: '⚙️', eyebrow: 'Generadores', title: 'Generadores de nombres gratis', desc: 'Fantasía · ciencia ficción · dragones · superhéroes · gremios', from: '#10b981', to: '#0d9488' },
  'generator/pt-br': { icon: '⚙️', eyebrow: 'Geradores', title: 'Geradores de nomes grátis', desc: 'Fantasia · ficção científica · dragões · super-heróis · guildas', from: '#10b981', to: '#0d9488' },
  'generator/ja': { icon: '⚙️', eyebrow: 'ジェネレーター', title: '無料の名前ジェネレーター', desc: 'ファンタジー · SF · ドラゴン · ヒーロー · ギルド', from: '#10b981', to: '#0d9488' },
  'generator/de': { icon: '⚙️', eyebrow: 'Generatoren', title: 'Kostenlose Namensgeneratoren', desc: 'Fantasy · Sci-Fi · Drachen · Superhelden · Gilden', from: '#10b981', to: '#0d9488' },
  'generator/fr': { icon: '⚙️', eyebrow: 'Générateurs', title: 'Générateurs de noms gratuits', desc: 'Fantasy · science-fiction · dragons · super-héros · guildes', from: '#10b981', to: '#0d9488' },
  'generator/hi': { icon: '⚙️', eyebrow: 'जनरेटर', title: 'मुफ़्त नाम जनरेटर', desc: 'फैंटेसी · साइ-फ़ाई · ड्रैगन · सुपरहीरो · गिल्ड', from: '#10b981', to: '#0d9488' },
  'generator/zh-hans': { icon: '⚙️', eyebrow: '生成器', title: '免费名字生成器', desc: '奇幻 · 科幻 · 巨龙 · 超级英雄 · 公会', from: '#10b981', to: '#0d9488' },
  'generator/zh-hant': { icon: '⚙️', eyebrow: '產生器', title: '免費名字產生器', desc: '奇幻 · 科幻 · 巨龍 · 超級英雄 · 公會', from: '#10b981', to: '#0d9488' },
  'random/en': { icon: '🎲', eyebrow: 'Random Picker', title: 'Random Picker Tools', desc: 'Wheel · name picker · teams · dice · Secret Santa', from: '#6366f1', to: '#a855f7' },
  'random/ko': { icon: '🎲', eyebrow: 'Random Picker', title: '랜덤 뽑기', desc: '룰렛 · 사다리타기 · 팀 나누기 · 숫자 추첨 · 동전/주사위', from: '#6366f1', to: '#a855f7' },
  'random/es': { icon: '🎲', eyebrow: 'Random Picker', title: 'Herramientas de azar', desc: 'Ruleta · nombres · equipos · números · dados', from: '#6366f1', to: '#a855f7' },
  'random/pt-br': { icon: '🎲', eyebrow: 'Random Picker', title: 'Ferramentas de sorteio', desc: 'Roleta · nomes · times · números · dados', from: '#6366f1', to: '#a855f7' },
  'random/ja': { icon: '🎲', eyebrow: 'Random Picker', title: 'ランダム選び', desc: 'ルーレット · あみだ · チーム分け · 乱数 · サイコロ', from: '#6366f1', to: '#a855f7' },
  'random/de': { icon: '🎲', eyebrow: 'Random Picker', title: 'Zufallswerkzeuge', desc: 'Glücksrad · Namen · Teams · Zahlen · Würfel', from: '#6366f1', to: '#a855f7' },
  'random/fr': { icon: '🎲', eyebrow: 'Random Picker', title: 'Tirage au sort', desc: 'Roue · noms · équipes · nombres · dés', from: '#6366f1', to: '#a855f7' },
  'random/hi': { icon: '🎲', eyebrow: 'Random Picker', title: 'रैंडम उपकरण', desc: 'चक्का · नाम · टीम · संख्या · पासा', from: '#6366f1', to: '#a855f7' },
  'calculator/en': { icon: '🧮', eyebrow: 'Calculator', title: 'Korean Calculators', desc: 'Salary · tax · loan · property calculators for Korea', from: '#1d4ed8', to: '#3b82f6' },
  'calculator/ja': { icon: '🧮', eyebrow: 'Calculator', title: '生活計算機まとめ', desc: '給与・税金・ローン・不動産の計算機', from: '#1d4ed8', to: '#3b82f6' },
  'fortune/dream/ko': { icon: '🌙', eyebrow: 'Dream', title: '꿈 해몽', desc: '돼지·뱀·불 등 50가지 꿈의 의미 분석', from: '#334155', to: '#3730a3' },
  'fortune/saju/ko': { icon: '🔯', eyebrow: 'Saju', title: '사주 분석', desc: '생년월일로 사주 4주 분석 + 오행 균형', from: '#6366f1', to: '#6d28d9' },
  'fortune/zodiac/ko': { icon: '⭐', eyebrow: 'Zodiac', title: '별자리 운세', desc: '12개 별자리로 오늘의 운세 확인', from: '#8b5cf6', to: '#7e22ce' },
  'fortune/animal/ko': { icon: '🐉', eyebrow: 'Animal Sign', title: '띠 운세', desc: '쥐·소·범 등 12띠별 오늘의 운세', from: '#f43f5e', to: '#db2777' },
  'fortune/tarot/ko': { icon: '🃏', eyebrow: 'Tarot', title: '타로 카드', desc: '78장 풀덱에서 카드 뽑기', from: '#f59e0b', to: '#ea580c' },
  'fortune/mbti/ko': { icon: '🧠', eyebrow: 'MBTI', title: 'MBTI 운세', desc: '16가지 성격 유형별 오늘의 운세', from: '#0ea5e9', to: '#2563eb' },
  'fortune/blood-type/ko': { icon: '🩸', eyebrow: '혈액형', title: '혈액형 운세', desc: 'A·B·O·AB형 오늘의 운세', from: '#f43f5e', to: '#dc2626' },
  'fortune/biorhythm/ko': { icon: '📈', eyebrow: '바이오리듬', title: '바이오리듬', desc: '신체·감성·지성 리듬을 그래프로', from: '#10b981', to: '#0d9488' },
  'fortune/name-match/ko': { icon: '💕', eyebrow: '이름 궁합', title: '이름 궁합', desc: '두 사람 이름 획수로 보는 궁합 점수', from: '#ec4899', to: '#e11d48' },
  'fortune/zodiac-match/ko': { icon: '🐲', eyebrow: '띠 궁합', title: '띠 궁합', desc: '십이지 삼합·육합으로 보는 두 사람 궁합', from: '#f43f5e', to: '#db2777' },
  'fortune/star-match/ko': { icon: '⭐', eyebrow: '별자리 궁합', title: '별자리 궁합', desc: '12별자리 원소로 보는 두 사람 궁합', from: '#8b5cf6', to: '#c026d3' },
  'fortune/blood-match/ko': { icon: '🩸', eyebrow: '혈액형 궁합', title: '혈액형 궁합', desc: 'A·B·O·AB형으로 보는 두 사람 궁합', from: '#f43f5e', to: '#ea580c' },
  'fortune/mbti-match/ko': { icon: '🧠', eyebrow: 'MBTI 궁합', title: 'MBTI 궁합', desc: '16유형으로 보는 두 사람 궁합 점수', from: '#8b5cf6', to: '#4f46e5' },
  'fortune/daily/ko': { icon: '🔮', eyebrow: '오늘의 종합운세', title: '오늘의 종합운세', desc: '생년월일로 보는 오늘의 총운·연애·금전운', from: '#7c3aed', to: '#db2777' },
  'fortune/daily-tarot/ko': { icon: '🃏', eyebrow: 'Daily Tarot', title: '오늘의 타로', desc: '매일 자정 바뀌는 오늘의 타로 카드 한 장', from: '#f59e0b', to: '#ea580c' },
  'fortune/tarot-yesno/ko': { icon: '🔮', eyebrow: 'Tarot Yes/No', title: '타로 예스/노', desc: '질문을 떠올리고 카드로 받는 예·아니오', from: '#6366f1', to: '#6d28d9' },
  'fortune/lucky-lotto/ko': { icon: '🍀', eyebrow: 'Fortune', title: '행운의 로또 번호', desc: '생년월일로 보는 오늘의 행운 번호 6개', from: '#7c3aed', to: '#db2777' },
  'fortune/birth-stone/ko': { icon: '💎', eyebrow: 'Birth Stone', title: '탄생석·탄생화', desc: '태어난 달의 보석과 꽃, 그 의미', from: '#d946ef', to: '#7c3aed' },
  'fortune/today-color/ko': { icon: '🎨', eyebrow: 'Lucky Colour', title: '오늘의 행운 색', desc: '이름·날짜로 보는 오늘의 행운 컬러', from: '#ec4899', to: '#7c3aed' },
  'snap/first-impression/ko': { icon: '✨', eyebrow: 'First Impression', title: '첫인상 분석', desc: '눈·얼굴선·입꼬리를 실측해 보는 내 인상 유형', from: '#d946ef', to: '#7c3aed' },
  'snap/face-reading/ko': { icon: '🪞', eyebrow: 'Face Reading', title: '관상 테스트', desc: '사진 한 장으로 보는 재미있는 관상 분석', from: '#0d9488', to: '#0369a1' },
  'snap/personal-color/ko': { icon: '🎨', eyebrow: 'Personal Color', title: '퍼스널컬러 진단', desc: '사진 한 장으로 보는 웜톤·쿨톤 12타입 컬러 진단', from: '#fb923c', to: '#6366f1' },
  'snap/animal-face/ko': { icon: '🐾', eyebrow: 'Animal Face', title: '동물상 테스트', desc: '사진 한 장으로 보는 나의 동물상', from: '#f97316', to: '#db2777' },
  'snap/expression/ko': { icon: '🎭', eyebrow: 'Expression', title: '표정 감정 분석', desc: 'AI로 보는 사진 속 표정의 7가지 감정', from: '#ec4899', to: '#7c3aed' },
  'snap/golden-ratio/ko': { icon: '📐', eyebrow: 'Golden Ratio', title: '황금비율 테스트', desc: '이목구비 비례가 황금비에 얼마나 가까운지', from: '#f59e0b', to: '#ea580c' },
  'snap/couple-match/ko': { icon: '💑', eyebrow: 'Couple Match', title: '커플 관상 궁합', desc: '사진 두 장으로 보는 우리 커플 궁합', from: '#f43f5e', to: '#db2777' },
  'snap/photo-mood/ko': { icon: '🎞️', eyebrow: 'Photo Mood', title: '사진 감성 분석', desc: '아무 사진이나 올려서 보는 내 감성 타입', from: '#d946ef', to: '#0ea5e9' },
  'snap/face-symmetry/ko': { icon: '⚖️', eyebrow: 'Face Symmetry', title: '얼굴 대칭 분석', desc: '사진 한 장으로 보는 좌우 밸런스 지수', from: '#6366f1', to: '#06b6d4' },
  'snap/smile-score/ko': { icon: '😊', eyebrow: 'Smile Score', title: '미소 지수 측정', desc: '사진 한 장으로 보는 내 미소 지수', from: '#fbbf24', to: '#f43f5e' },
  'snap/handwriting/ko': { icon: '✍️', eyebrow: 'Handwriting', title: '손글씨 심리 테스트', desc: '손글씨 사진으로 보는 기울기·필압 분석', from: '#475569', to: '#4338ca' },

  // 스냅테스트는 아홉 언어 × 열두 장이라 108줄이 된다 — 섹션 사전에서 만들어 받는다
  ...snapIntlCards(),

  // 운세도 아홉 언어 × 열아홉 장이다
  ...fortuneIntlCards(),
};

export type OgLang = IntlLocale;

/** 표에 있는 카드 — 없는 열쇠는 빌드가 죽어야 한다(조용히 빈 카드가 나가는 것보다 낫다) */
export function intlOg(key: string): ReactElement {
  const c = CARDS[key];
  if (!c) throw new Error(`og-intl: 카드 문구가 없다 — ${key}`);
  return ogCard(c);
}

/** 색상 도구 — 사전에서 언어별 문구를, 카탈로그에서 아이콘·색을 읽는다 */
export function colorOg(slug: string, lang: ColorIntlLang): ReactElement {
  const tool = findColorToolIntl(lang, slug) ?? COLOR_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 색상 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 시간 도구 — 색상 도구와 같은 방식 */
export function timeOg(slug: string, lang: ToolIntlLang): ReactElement {
  const tool = findTimeToolIntl(lang, slug) ?? TIME_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 시간 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 이미지 도구 — 색상 도구와 같은 방식 */
export function imageOg(slug: string, lang: ImageIntlLang): ReactElement {
  const tool = findImageToolIntl(lang, slug) ?? IMAGE_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 이미지 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 계량·요리 도구 — 색상 도구와 같은 방식 */
export function foodOg(slug: string, lang: FoodIntlLang): ReactElement {
  const tool = findFoodToolIntl(lang, slug) ?? FOOD_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 요리 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 소리 도구 — 색상 도구와 같은 방식 */
export function soundOg(slug: string, lang: SoundIntlLang): ReactElement {
  const tool = findSoundToolIntl(lang, slug) ?? SOUND_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 소리 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 랜덤 뽑기 — 문구는 lib/random-ui-intl.ts의 사전에서 꺼낸다 */
export function randomOg(slug: string, lang: AnyLocale): ReactElement {
  const tool: RandomTool | undefined = RANDOM_TOOLS_MAP[slug];
  if (!tool) throw new Error(`og-intl: 랜덤 도구가 없다 — ${slug}`);
  const l = randomL10n(slug, lang);
  // 색은 여덟 언어가 같다 — 언어마다 다르면 같은 도구의 카드가 다른 도구처럼 보인다
  const hub = CARDS['random/en'];
  return ogCard({ icon: tool.icon, eyebrow: l.category, title: l.title, desc: l.desc, from: hub.from, to: hub.to });
}

/** 두뇌 게임 — 색상 도구와 같은 방식 */
export function gameOg(slug: string, lang: GameIntlLang): ReactElement {
  const tool = findGameToolIntl(lang, slug) ?? GAME_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 게임이 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/** 기기 점검 — 색상 도구와 같은 방식 */
export function deviceOg(slug: string, lang: DeviceIntlLang): ReactElement {
  const tool = findDeviceToolIntl(lang, slug) ?? DEVICE_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 기기 점검이 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}

/**
 * 단위 변환 — 도구 100종 × 여덟 언어를 한 함수로 그린다.
 *
 * 색은 여덟 언어가 같다. 언어마다 다르면 같은 도구의 카드가 다른 도구처럼 보인다.
 * eyebrow는 그 언어의 분류 이름을 쓴다 — 카드만 보고도 길이인지 무게인지 알 수 있다.
 */
export function convertOg(slug: string, lang: AnyLocale): ReactElement {
  const tool = CONVERT_MAP[slug];
  if (!tool) throw new Error(`og-intl: 단위 변환 도구가 없다 — ${slug}`);
  const l = convertL10n(slug, lang);
  return ogCard({
    icon: tool.icon,
    eyebrow: CONVERT_CATEGORY[lang][tool.category] ?? tool.category,
    title: l?.title ?? tool.title,
    desc: l?.desc ?? tool.desc,
    from: '#3b82f6',
    to: '#4f46e5',
  });
}

/** 텍스트 도구 — 한글 전용 네 종은 en/zh 목록에 없어 한국어로 폴백한다 */
export function textOg(slug: string, lang: TextIntlLang): ReactElement {
  const tool = findTextToolIntl(lang, slug) ?? TEXT_TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`og-intl: 텍스트 도구가 없다 — ${slug}`);
  return ogCard({
    icon: tool.icon, eyebrow: tool.category, title: tool.title, desc: tool.desc,
    from: tool.og[0], to: tool.og[1],
  });
}
