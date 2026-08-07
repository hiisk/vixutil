/**
 * 이미지 도구 여섯(워터마크·보정·테두리·모서리·분할·파비콘)의 화면 문구.
 *
 * lib/image-ui-intl.ts가 이미 길어서 새 도구는 여기 따로 둔다 — 계산을
 * lib/image-canvas.ts와 lib/image-more.ts로 나눈 것과 같은 이유다.
 */
import type { ImageLang } from './image-ui-intl.ts';

export const MARK_UI: Record<ImageLang, {
  hint: string;
  alt: string;
  markText: string;
  position: string;
  size: string;
  opacity: string;
  markColor: string;
  tile: string;
  tileHint: string;
}> = {
  ko: {
    hint: "워터마크를 넣을 사진",
    alt: "워터마크를 넣은 사진",
    markText: "넣을 글",
    position: "자리",
    size: "크기",
    opacity: "투명도",
    markColor: "글자 색",
    tile: "바둑판으로 반복",
    tileHint: "지우기 어렵게 사진 전체에 깝니다",
  },
  en: {
    hint: "Photo to watermark",
    alt: "Watermarked photo",
    markText: "Watermark text",
    position: "Position",
    size: "Size",
    opacity: "Opacity",
    markColor: "Text colour",
    tile: "Repeat across the photo",
    tileHint: "Harder to crop out than a single mark",
  },
  es: {
    hint: "Foto para marcar",
    alt: "Foto con marca de agua",
    markText: "Texto de la marca",
    position: "Posición",
    size: "Tamaño",
    opacity: "Opacidad",
    markColor: "Color del texto",
    tile: "Repetir por toda la foto",
    tileHint: "Más difícil de recortar que una sola marca",
  },
  'pt-br': {
    hint: "Foto para marcar",
    alt: "Foto com marca d’água",
    markText: "Texto da marca",
    position: "Posição",
    size: "Tamanho",
    opacity: "Opacidade",
    markColor: "Cor do texto",
    tile: "Repetir por toda a foto",
    tileHint: "Mais difícil de recortar que uma marca só",
  },
  ja: {
    hint: "透かしを入れる写真",
    alt: "透かし入りの写真",
    markText: "入れる文字",
    position: "位置",
    size: "大きさ",
    opacity: "不透明度",
    markColor: "文字の色",
    tile: "写真全体に繰り返す",
    tileHint: "一つだけより切り取られにくくなります",
  },
  de: {
    hint: "Foto für das Wasserzeichen",
    alt: "Foto mit Wasserzeichen",
    markText: "Text des Wasserzeichens",
    position: "Position",
    size: "Größe",
    opacity: "Deckkraft",
    markColor: "Textfarbe",
    tile: "Über das ganze Foto wiederholen",
    tileHint: "Schwerer wegzuschneiden als ein einzelnes Zeichen",
  },
  fr: {
    hint: "Photo à filigraner",
    alt: "Photo filigranée",
    markText: "Texte du filigrane",
    position: "Position",
    size: "Taille",
    opacity: "Opacité",
    markColor: "Couleur du texte",
    tile: "Répéter sur toute la photo",
    tileHint: "Plus difficile à rogner qu’une seule marque",
  },
  hi: {
    hint: "वॉटरमार्क वाली फ़ोटो",
    alt: "वॉटरमार्क लगी फ़ोटो",
    markText: "वॉटरमार्क का पाठ",
    position: "स्थान",
    size: "आकार",
    opacity: "अपारदर्शिता",
    markColor: "पाठ का रंग",
    tile: "पूरी फ़ोटो पर दोहराएँ",
    tileHint: "एक ही निशान से ज़्यादा मुश्किल से कटता है",
  },
  'zh-hans': {
    hint: "要加水印的照片",
    alt: "加了水印的照片",
    markText: "水印文字",
    position: "位置",
    size: "大小",
    opacity: "不透明度",
    markColor: "文字颜色",
    tile: "铺满整张照片",
    tileHint: "比单个水印更难被裁掉",
  },
  'zh-hant': {
    hint: "要加浮水印的照片",
    alt: "加了浮水印的照片",
    markText: "浮水印文字",
    position: "位置",
    size: "大小",
    opacity: "不透明度",
    markColor: "文字顏色",
    tile: "鋪滿整張照片",
    tileHint: "比單個浮水印更難被裁掉",
  },
};

export const ADJUST_UI: Record<ImageLang, {
  hint: string;
  alt: string;
  preset: string;
  brightness: string;
  contrast: string;
  saturate: string;
  grayscale: string;
  sepia: string;
  blur: string;
  reset: string;
  presets: string[];
}> = {
  ko: {
    hint: "보정할 사진",
    alt: "보정한 사진",
    preset: "미리 맞춰 둔 값",
    brightness: "밝기",
    contrast: "대비",
    saturate: "채도",
    grayscale: "흑백",
    sepia: "세피아",
    blur: "흐리게",
    reset: "되돌리기",
    presets: ["원본", "흑백", "따뜻하게", "차갑게", "쨍하게", "바랜 느낌"],
  },
  en: {
    hint: "Photo to adjust",
    alt: "Adjusted photo",
    preset: "Presets",
    brightness: "Brightness",
    contrast: "Contrast",
    saturate: "Saturation",
    grayscale: "Black and white",
    sepia: "Sepia",
    blur: "Blur",
    reset: "Reset",
    presets: ["Original", "Mono", "Warm", "Cool", "Punchy", "Faded"],
  },
  es: {
    hint: "Foto para ajustar",
    alt: "Foto ajustada",
    preset: "Ajustes rápidos",
    brightness: "Brillo",
    contrast: "Contraste",
    saturate: "Saturación",
    grayscale: "Blanco y negro",
    sepia: "Sepia",
    blur: "Desenfoque",
    reset: "Restablecer",
    presets: ["Original", "Mono", "Cálido", "Frío", "Intenso", "Desvaído"],
  },
  'pt-br': {
    hint: "Foto para ajustar",
    alt: "Foto ajustada",
    preset: "Predefinições",
    brightness: "Brilho",
    contrast: "Contraste",
    saturate: "Saturação",
    grayscale: "Preto e branco",
    sepia: "Sépia",
    blur: "Desfoque",
    reset: "Redefinir",
    presets: ["Original", "Mono", "Quente", "Frio", "Intenso", "Desbotado"],
  },
  ja: {
    hint: "補正する写真",
    alt: "補正した写真",
    preset: "プリセット",
    brightness: "明るさ",
    contrast: "コントラスト",
    saturate: "彩度",
    grayscale: "白黒",
    sepia: "セピア",
    blur: "ぼかし",
    reset: "元に戻す",
    presets: ["元のまま", "モノクロ", "暖かく", "涼しく", "鮮やかに", "色あせ"],
  },
  de: {
    hint: "Foto zum Anpassen",
    alt: "Angepasstes Foto",
    preset: "Voreinstellungen",
    brightness: "Helligkeit",
    contrast: "Kontrast",
    saturate: "Sättigung",
    grayscale: "Schwarzweiß",
    sepia: "Sepia",
    blur: "Weichzeichnen",
    reset: "Zurücksetzen",
    presets: ["Original", "Mono", "Warm", "Kühl", "Kräftig", "Verblasst"],
  },
  fr: {
    hint: "Photo à ajuster",
    alt: "Photo ajustée",
    preset: "Préréglages",
    brightness: "Luminosité",
    contrast: "Contraste",
    saturate: "Saturation",
    grayscale: "Noir et blanc",
    sepia: "Sépia",
    blur: "Flou",
    reset: "Réinitialiser",
    presets: ["Original", "Mono", "Chaud", "Froid", "Éclatant", "Délavé"],
  },
  hi: {
    hint: "समायोजित करने वाली फ़ोटो",
    alt: "समायोजित फ़ोटो",
    preset: "पूर्व-निर्धारित",
    brightness: "चमक",
    contrast: "कंट्रास्ट",
    saturate: "संतृप्ति",
    grayscale: "श्वेत-श्याम",
    sepia: "सेपिया",
    blur: "धुंधलापन",
    reset: "रीसेट",
    presets: ["मूल", "श्वेत-श्याम", "गर्म", "ठंडा", "चटख", "फीका"],
  },
  'zh-hans': {
    hint: "要调整的照片",
    alt: "调整后的照片",
    preset: "预设",
    brightness: "亮度",
    contrast: "对比度",
    saturate: "饱和度",
    grayscale: "黑白",
    sepia: "棕褐",
    blur: "模糊",
    reset: "重置",
    presets: ["原图", "黑白", "暖调", "冷调", "浓郁", "褪色"],
  },
  'zh-hant': {
    hint: "要調整的照片",
    alt: "調整後的照片",
    preset: "預設",
    brightness: "亮度",
    contrast: "對比度",
    saturate: "飽和度",
    grayscale: "黑白",
    sepia: "棕褐",
    blur: "模糊",
    reset: "重設",
    presets: ["原圖", "黑白", "暖調", "冷調", "濃郁", "褪色"],
  },
};

export const FRAME_UI: Record<ImageLang, {
  hint: string;
  alt: string;
  ratio: string;
  ratioOrig: string;
  thickness: string;
  frameColor: string;
  noUpscale: string;
}> = {
  ko: {
    hint: "테두리를 두를 사진",
    alt: "테두리를 두른 사진",
    ratio: "비율",
    ratioOrig: "원본",
    thickness: "테두리 두께",
    frameColor: "테두리 색",
    noUpscale: "사진은 늘어나지 않습니다",
  },
  en: {
    hint: "Photo to frame",
    alt: "Framed photo",
    ratio: "Aspect ratio",
    ratioOrig: "Original",
    thickness: "Border thickness",
    frameColor: "Border colour",
    noUpscale: "The photo is never enlarged",
  },
  es: {
    hint: "Foto para enmarcar",
    alt: "Foto enmarcada",
    ratio: "Proporción",
    ratioOrig: "Original",
    thickness: "Grosor del borde",
    frameColor: "Color del borde",
    noUpscale: "La foto nunca se agranda",
  },
  'pt-br': {
    hint: "Foto para emoldurar",
    alt: "Foto emoldurada",
    ratio: "Proporção",
    ratioOrig: "Original",
    thickness: "Espessura da borda",
    frameColor: "Cor da borda",
    noUpscale: "A foto nunca é ampliada",
  },
  ja: {
    hint: "枠をつける写真",
    alt: "枠をつけた写真",
    ratio: "比率",
    ratioOrig: "元のまま",
    thickness: "枠の太さ",
    frameColor: "枠の色",
    noUpscale: "写真は拡大されません",
  },
  de: {
    hint: "Foto zum Rahmen",
    alt: "Gerahmtes Foto",
    ratio: "Seitenverhältnis",
    ratioOrig: "Original",
    thickness: "Rahmenstärke",
    frameColor: "Rahmenfarbe",
    noUpscale: "Das Foto wird nie vergrößert",
  },
  fr: {
    hint: "Photo à encadrer",
    alt: "Photo encadrée",
    ratio: "Format",
    ratioOrig: "Original",
    thickness: "Épaisseur du cadre",
    frameColor: "Couleur du cadre",
    noUpscale: "La photo n’est jamais agrandie",
  },
  hi: {
    hint: "फ़्रेम करने वाली फ़ोटो",
    alt: "फ़्रेम की गई फ़ोटो",
    ratio: "अनुपात",
    ratioOrig: "मूल",
    thickness: "बॉर्डर की मोटाई",
    frameColor: "बॉर्डर का रंग",
    noUpscale: "फ़ोटो कभी बड़ी नहीं की जाती",
  },
  'zh-hans': {
    hint: "要加边框的照片",
    alt: "加了边框的照片",
    ratio: "比例",
    ratioOrig: "原始",
    thickness: "边框粗细",
    frameColor: "边框颜色",
    noUpscale: "照片不会被放大",
  },
  'zh-hant': {
    hint: "要加邊框的照片",
    alt: "加了邊框的照片",
    ratio: "比例",
    ratioOrig: "原始",
    thickness: "邊框粗細",
    frameColor: "邊框顏色",
    noUpscale: "照片不會被放大",
  },
};

export const ROUND_UI: Record<ImageLang, {
  hint: string;
  alt: string;
  radius: string;
  square: string;
  squareHint: string;
  fullRound: string;
  pngNote: string;
}> = {
  ko: {
    hint: "모서리를 둥글릴 사진",
    alt: "모서리를 둥글린 사진",
    radius: "둥글기",
    square: "정사각형으로 자르기",
    squareHint: "프로필 사진에 쓸 때 켭니다",
    fullRound: "100%면 완전한 원이 됩니다",
    pngNote: "둥근 모서리는 PNG로만 저장됩니다",
  },
  en: {
    hint: "Photo to round off",
    alt: "Rounded photo",
    radius: "Roundness",
    square: "Crop to a square first",
    squareHint: "What you want for a profile picture",
    fullRound: "At 100% it becomes a full circle",
    pngNote: "Rounded corners are saved as PNG only",
  },
  es: {
    hint: "Foto para redondear",
    alt: "Foto redondeada",
    radius: "Redondez",
    square: "Recortar a cuadrado primero",
    squareHint: "Lo que quieres para una foto de perfil",
    fullRound: "Al 100% se convierte en un círculo",
    pngNote: "Las esquinas redondeadas solo se guardan en PNG",
  },
  'pt-br': {
    hint: "Foto para arredondar",
    alt: "Foto arredondada",
    radius: "Arredondamento",
    square: "Recortar em quadrado primeiro",
    squareHint: "O que você quer para uma foto de perfil",
    fullRound: "A 100% vira um círculo completo",
    pngNote: "Cantos arredondados só são salvos em PNG",
  },
  ja: {
    hint: "角を丸くする写真",
    alt: "角を丸くした写真",
    radius: "丸み",
    square: "先に正方形に切る",
    squareHint: "プロフィール写真ならこちら",
    fullRound: "100%で完全な円になります",
    pngNote: "角丸はPNGでのみ保存されます",
  },
  de: {
    hint: "Foto zum Abrunden",
    alt: "Abgerundetes Foto",
    radius: "Rundung",
    square: "Zuerst quadratisch zuschneiden",
    squareHint: "Für ein Profilbild das Richtige",
    fullRound: "Bei 100% wird es ein voller Kreis",
    pngNote: "Abgerundete Ecken werden nur als PNG gespeichert",
  },
  fr: {
    hint: "Photo à arrondir",
    alt: "Photo arrondie",
    radius: "Arrondi",
    square: "Rogner en carré d’abord",
    squareHint: "Ce qu’il faut pour une photo de profil",
    fullRound: "À 100 %, cela devient un cercle",
    pngNote: "Les coins arrondis ne sont enregistrés qu’en PNG",
  },
  hi: {
    hint: "कोने गोल करने वाली फ़ोटो",
    alt: "गोल कोनों वाली फ़ोटो",
    radius: "गोलाई",
    square: "पहले वर्ग में काटें",
    squareHint: "प्रोफ़ाइल फ़ोटो के लिए यही चाहिए",
    fullRound: "100% पर यह पूरा वृत्त बन जाता है",
    pngNote: "गोल कोने केवल PNG में सहेजे जाते हैं",
  },
  'zh-hans': {
    hint: "要圆角的照片",
    alt: "圆角照片",
    radius: "圆角程度",
    square: "先裁成正方形",
    squareHint: "做头像时打开",
    fullRound: "100% 时变成完整的圆",
    pngNote: "圆角只能保存为 PNG",
  },
  'zh-hant': {
    hint: "要圓角的照片",
    alt: "圓角照片",
    radius: "圓角程度",
    square: "先裁成正方形",
    squareHint: "做大頭貼時開啟",
    fullRound: "100% 時變成完整的圓",
    pngNote: "圓角只能儲存為 PNG",
  },
};

export const SPLIT_UI: Record<ImageLang, {
  hint: string;
  grid: string;
  tiles: string;
  saveAll: string;
  saveOne: string;
  splitNote: string;
}> = {
  ko: {
    hint: "나눌 사진",
    grid: "몇 칸으로 나눌까요",
    tiles: "조각",
    saveAll: "전부 저장",
    saveOne: "이 조각 저장",
    splitNote: "왼쪽 위부터 차례로 번호가 붙습니다",
  },
  en: {
    hint: "Photo to split",
    grid: "Grid",
    tiles: "Pieces",
    saveAll: "Save all",
    saveOne: "Save this piece",
    splitNote: "Numbered left to right, top row first",
  },
  es: {
    hint: "Foto para dividir",
    grid: "Cuadrícula",
    tiles: "Piezas",
    saveAll: "Guardar todo",
    saveOne: "Guardar esta pieza",
    splitNote: "Numeradas de izquierda a derecha, fila superior primero",
  },
  'pt-br': {
    hint: "Foto para dividir",
    grid: "Grade",
    tiles: "Peças",
    saveAll: "Salvar tudo",
    saveOne: "Salvar esta peça",
    splitNote: "Numeradas da esquerda para a direita, primeira linha antes",
  },
  ja: {
    hint: "分割する写真",
    grid: "何分割にしますか",
    tiles: "枚",
    saveAll: "すべて保存",
    saveOne: "この一枚を保存",
    splitNote: "左上から順に番号がつきます",
  },
  de: {
    hint: "Foto zum Zerteilen",
    grid: "Raster",
    tiles: "Teile",
    saveAll: "Alle speichern",
    saveOne: "Dieses Teil speichern",
    splitNote: "Nummeriert von links nach rechts, oberste Reihe zuerst",
  },
  fr: {
    hint: "Photo à découper",
    grid: "Grille",
    tiles: "Morceaux",
    saveAll: "Tout enregistrer",
    saveOne: "Enregistrer ce morceau",
    splitNote: "Numérotés de gauche à droite, rangée du haut d’abord",
  },
  hi: {
    hint: "बाँटने वाली फ़ोटो",
    grid: "ग्रिड",
    tiles: "टुकड़े",
    saveAll: "सब सहेजें",
    saveOne: "यह टुकड़ा सहेजें",
    splitNote: "बाएँ से दाएँ, ऊपरी पंक्ति पहले, क्रमांकित",
  },
  'zh-hans': {
    hint: "要分割的照片",
    grid: "分成几格",
    tiles: "块",
    saveAll: "全部保存",
    saveOne: "保存这一块",
    splitNote: "从左上角开始依次编号",
  },
  'zh-hant': {
    hint: "要分割的照片",
    grid: "分成幾格",
    tiles: "塊",
    saveAll: "全部儲存",
    saveOne: "儲存這一塊",
    splitNote: "從左上角開始依序編號",
  },
};

export const ICON_UI: Record<ImageLang, {
  hint: string;
  sizes: string;
  useFor: string;
  useFavicon: string;
  useApple: string;
  useAndroid: string;
  snippet: string;
  headTitle: string;
  manifest: string;
  iconNote: string;
  copy: string;
  copied: string;
}> = {
  ko: {
    hint: "아이콘으로 만들 그림",
    sizes: "만들 크기",
    useFor: "어디에 쓰이나",
    useFavicon: "브라우저 탭",
    useApple: "iOS 홈 화면",
    useAndroid: "안드로이드 웹 앱",
    snippet: "붙여 넣을 코드",
    headTitle: "<head> 안에",
    manifest: "site.webmanifest",
    iconNote: "정사각형이 아니면 가운데를 잘라 씁니다",
    copy: "복사",
    copied: "복사됨",
  },
  en: {
    hint: "Image to turn into icons",
    sizes: "Sizes to make",
    useFor: "Used for",
    useFavicon: "Browser tab",
    useApple: "iOS home screen",
    useAndroid: "Android web app",
    snippet: "Code to paste in",
    headTitle: "Inside <head>",
    manifest: "site.webmanifest",
    iconNote: "Non-square images are cropped from the centre",
    copy: "Copy",
    copied: "Copied",
  },
  es: {
    hint: "Imagen para convertir en iconos",
    sizes: "Tamaños a crear",
    useFor: "Se usa para",
    useFavicon: "Pestaña del navegador",
    useApple: "Pantalla de inicio de iOS",
    useAndroid: "Aplicación web de Android",
    snippet: "Código para pegar",
    headTitle: "Dentro de <head>",
    manifest: "site.webmanifest",
    iconNote: "Las imágenes no cuadradas se recortan desde el centro",
    copy: "Copiar",
    copied: "Copiado",
  },
  'pt-br': {
    hint: "Imagem para virar ícones",
    sizes: "Tamanhos a criar",
    useFor: "Usado para",
    useFavicon: "Aba do navegador",
    useApple: "Tela inicial do iOS",
    useAndroid: "App web do Android",
    snippet: "Código para colar",
    headTitle: "Dentro de <head>",
    manifest: "site.webmanifest",
    iconNote: "Imagens não quadradas são recortadas pelo centro",
    copy: "Copiar",
    copied: "Copiado",
  },
  ja: {
    hint: "アイコンにする画像",
    sizes: "作る大きさ",
    useFor: "用途",
    useFavicon: "ブラウザのタブ",
    useApple: "iOSのホーム画面",
    useAndroid: "Androidウェブアプリ",
    snippet: "貼り付けるコード",
    headTitle: "<head>の中に",
    manifest: "site.webmanifest",
    iconNote: "正方形でない画像は中央を切り取ります",
    copy: "コピー",
    copied: "コピーしました",
  },
  de: {
    hint: "Bild für die Icons",
    sizes: "Zu erzeugende Größen",
    useFor: "Verwendet für",
    useFavicon: "Browser-Tab",
    useApple: "iOS-Startbildschirm",
    useAndroid: "Android-Web-App",
    snippet: "Einzufügender Code",
    headTitle: "In <head>",
    manifest: "site.webmanifest",
    iconNote: "Nicht quadratische Bilder werden aus der Mitte beschnitten",
    copy: "Kopieren",
    copied: "Kopiert",
  },
  fr: {
    hint: "Image à transformer en icônes",
    sizes: "Tailles à créer",
    useFor: "Utilisé pour",
    useFavicon: "Onglet du navigateur",
    useApple: "Écran d’accueil iOS",
    useAndroid: "Application web Android",
    snippet: "Code à coller",
    headTitle: "Dans <head>",
    manifest: "site.webmanifest",
    iconNote: "Les images non carrées sont rognées au centre",
    copy: "Copier",
    copied: "Copié",
  },
  hi: {
    hint: "आइकॉन बनाने वाली छवि",
    sizes: "बनाने के आकार",
    useFor: "किसके लिए",
    useFavicon: "ब्राउज़र टैब",
    useApple: "iOS होम स्क्रीन",
    useAndroid: "एंड्रॉइड वेब ऐप",
    snippet: "चिपकाने का कोड",
    headTitle: "<head> के भीतर",
    manifest: "site.webmanifest",
    iconNote: "गैर-वर्ग छवियाँ बीच से काटी जाती हैं",
    copy: "कॉपी",
    copied: "कॉपी हो गया",
  },
  'zh-hans': {
    hint: "要做成图标的图片",
    sizes: "生成的尺寸",
    useFor: "用途",
    useFavicon: "浏览器标签页",
    useApple: "iOS 主屏幕",
    useAndroid: "安卓网页应用",
    snippet: "需要粘贴的代码",
    headTitle: "放进 <head>",
    manifest: "site.webmanifest",
    iconNote: "非正方形图片会从中间裁切",
    copy: "复制",
    copied: "已复制",
  },
  'zh-hant': {
    hint: "要做成圖示的圖片",
    sizes: "產生的尺寸",
    useFor: "用途",
    useFavicon: "瀏覽器分頁",
    useApple: "iOS 主畫面",
    useAndroid: "安卓網頁應用",
    snippet: "需要貼上的程式碼",
    headTitle: "放進 <head>",
    manifest: "site.webmanifest",
    iconNote: "非正方形圖片會從中間裁切",
    copy: "複製",
    copied: "已複製",
  },
};

