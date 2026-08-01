import type { Metadata } from 'next';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from './locales.ts';
import type { SnapIntlLang } from './snap-intl.ts';

/**
 * 스냅테스트(/snap) 섹션의 라우트 메타데이터·허브 카드·공유 카드 문구.
 *
 * 결과 문장은 [[lib/snap-l10n/index.ts]]에, 화면 안의 UI 문구는 각
 * components/snap/* 안에 있다. 여기 모은 것은 페이지 밖에서 쓰이는 문구다 —
 * 검색 결과 제목, 허브 카드, 공유 카드. 세 자리가 서로 다른 말을 하면 목록에서
 * 보고 눌렀는데 다른 도구처럼 읽히므로 한 곳에 둔다.
 *
 * slug·아이콘·색은 언어와 무관하니 SNAP_TOOLS에 한 번만 적고, 언어별로는
 * 사람이 읽는 네 문장(title·desc·metaTitle·metaDesc)만 갈아 끼운다.
 */
export const SNAP_TOOLS = [
  { slug: 'smile-score', icon: '😊', color: 'from-amber-400 to-rose-500', eyebrow: 'Smile Score', from: '#fbbf24', to: '#f43f5e' },
  { slug: 'face-symmetry', icon: '⚖️', color: 'from-violet-500 to-fuchsia-600', eyebrow: 'Face Symmetry', from: '#6366f1', to: '#06b6d4' },
  { slug: 'golden-ratio', icon: '📐', color: 'from-amber-400 to-orange-500', eyebrow: 'Golden Ratio', from: '#f59e0b', to: '#ea580c' },
  { slug: 'photo-mood', icon: '🎨', color: 'from-sky-400 to-violet-500', eyebrow: 'Photo Mood', from: '#d946ef', to: '#0ea5e9' },
  { slug: 'expression', icon: '🎭', color: 'from-indigo-500 to-purple-500', eyebrow: 'Expression', from: '#ec4899', to: '#7c3aed' },
  { slug: 'first-impression', icon: '✨', color: 'from-fuchsia-500 to-violet-600', eyebrow: 'First Impression', from: '#d946ef', to: '#7c3aed' },
  { slug: 'handwriting', icon: '✍️', color: 'from-teal-400 to-cyan-500', eyebrow: 'Handwriting', from: '#475569', to: '#4338ca' },
  { slug: 'face-reading', icon: '🔮', color: 'from-amber-500 to-red-500', eyebrow: 'Face Reading', from: '#0d9488', to: '#0369a1' },
  { slug: 'animal-face', icon: '🐾', color: 'from-orange-400 to-rose-500', eyebrow: 'Animal Face', from: '#f97316', to: '#db2777' },
  { slug: 'personal-color', icon: '🎨', color: 'from-pink-400 to-violet-500', eyebrow: 'Personal Color', from: '#fb923c', to: '#6366f1' },
  { slug: 'couple-match', icon: '💞', color: 'from-rose-400 to-fuchsia-500', eyebrow: 'Couple Match', from: '#f43f5e', to: '#db2777' },
] as const;

export type SnapToolSlug = typeof SNAP_TOOLS[number]['slug'];

interface ToolCopy {
  /** 허브 카드와 공유 카드에 쓰는 짧은 이름 */
  title: string;
  /** 허브 카드와 공유 카드에 쓰는 한 줄 설명 */
  desc: string;
  /** <title> — 검색어에 맞춘 긴 제목 */
  metaTitle: string;
  metaDesc: string;
}

interface HubCopy {
  title: string; lead: string; kicker: string;
  metaTitle: string; metaDesc: string;
  privacy: string; footer: string;
}

const HUB: Record<SnapIntlLang, HubCopy> = {
  en: {
    title: 'Snap Tests', lead: 'Real face detection, one photo, nothing uploaded', kicker: 'Snap tests',
    metaTitle: 'Snap Tests — Analyse One Photo in Your Browser',
    metaDesc: 'Free photo tests using real face detection: smile score, face symmetry and the golden ratio. Everything runs in your browser — no photo is ever uploaded.',
    privacy: 'Every test runs entirely inside your browser. Your photo is never sent to a server, and nothing is stored after you close the page.',
    footer: 'Free photo tests',
  },
  es: {
    title: 'Tests de foto', lead: 'Detección facial real, una foto, nada se sube', kicker: 'Tests de foto',
    metaTitle: 'Tests de foto — Analiza una foto en tu navegador',
    metaDesc: 'Tests de foto gratis con detección facial real: índice de sonrisa, simetría facial y proporción áurea. Todo funciona en tu navegador; ninguna foto se sube nunca.',
    privacy: 'Todos los tests funcionan por completo dentro de tu navegador. Tu foto nunca se envía a un servidor y no se guarda nada al cerrar la página.',
    footer: 'Tests de foto gratis',
  },
  'pt-br': {
    title: 'Testes de foto', lead: 'Detecção facial real, uma foto, nada é enviado', kicker: 'Testes de foto',
    metaTitle: 'Testes de foto — Analise uma foto no seu navegador',
    metaDesc: 'Testes de foto grátis com detecção facial real: índice de sorriso, simetria facial e proporção áurea. Tudo roda no seu navegador; nenhuma foto é enviada.',
    privacy: 'Todos os testes rodam inteiramente dentro do seu navegador. Sua foto nunca é enviada a um servidor e nada fica guardado depois que você fecha a página.',
    footer: 'Testes de foto grátis',
  },
  ja: {
    title: 'スナップテスト', lead: '本物の顔認識、写真1枚、アップロードなし', kicker: 'スナップテスト',
    metaTitle: 'スナップテスト — 写真1枚をブラウザで解析',
    metaDesc: '本物の顔認識を使う無料の写真テスト。スマイル指数、顔の左右対称、黄金比。すべてブラウザ内で動き、写真がアップロードされることはありません。',
    privacy: 'どのテストもすべてブラウザの中だけで動きます。写真がサーバーに送られることはなく、ページを閉じたあとに残るものもありません。',
    footer: '無料の写真テスト',
  },
  de: {
    title: 'Foto-Tests', lead: 'Echte Gesichtserkennung, ein Foto, nichts wird hochgeladen', kicker: 'Foto-Tests',
    metaTitle: 'Foto-Tests — Ein Foto im Browser auswerten',
    metaDesc: 'Kostenlose Foto-Tests mit echter Gesichtserkennung: Lächel-Index, Gesichtssymmetrie und Goldener Schnitt. Alles läuft im Browser — kein Foto wird je hochgeladen.',
    privacy: 'Jeder Test läuft vollständig in deinem Browser. Dein Foto wird nie an einen Server geschickt, und nach dem Schließen der Seite bleibt nichts gespeichert.',
    footer: 'Kostenlose Foto-Tests',
  },
  fr: {
    title: 'Tests photo', lead: 'Vraie détection de visage, une photo, rien n’est envoyé', kicker: 'Tests photo',
    metaTitle: 'Tests photo — Analysez une photo dans votre navigateur',
    metaDesc: 'Tests photo gratuits avec une vraie détection de visage : indice de sourire, symétrie du visage et nombre d’or. Tout tourne dans votre navigateur, aucune photo n’est envoyée.',
    privacy: 'Chaque test tourne entièrement dans votre navigateur. Votre photo n’est jamais envoyée à un serveur et rien n’est conservé après la fermeture de la page.',
    footer: 'Tests photo gratuits',
  },
  hi: {
    title: 'फ़ोटो टेस्ट', lead: 'असली फ़ेस डिटेक्शन, एक फ़ोटो, कुछ भी अपलोड नहीं', kicker: 'फ़ोटो टेस्ट',
    metaTitle: 'फ़ोटो टेस्ट — एक फ़ोटो को अपने ब्राउज़र में जाँचें',
    metaDesc: 'असली फ़ेस डिटेक्शन वाले मुफ़्त फ़ोटो टेस्ट: मुस्कान स्कोर, चेहरे की समरूपता और गोल्डन रेशियो। सब कुछ आपके ब्राउज़र में चलता है — कोई फ़ोटो कभी अपलोड नहीं होती।',
    privacy: 'हर टेस्ट पूरी तरह आपके ब्राउज़र के भीतर चलता है। आपकी फ़ोटो कभी सर्वर पर नहीं जाती, और पेज बंद करने के बाद कुछ भी नहीं रहता।',
    footer: 'मुफ़्त फ़ोटो टेस्ट',
  },
  'zh-hans': {
    title: '拍照测验', lead: '真实的人脸识别，一张照片，什么都不上传', kicker: '拍照测验',
    metaTitle: '拍照测验 — 在浏览器里分析一张照片',
    metaDesc: '用真实人脸识别的免费照片测验：微笑指数、面部对称、黄金比例。全部在浏览器里运行，照片永远不会被上传。',
    privacy: '每个测验都完全在你的浏览器里运行。照片不会被送到服务器，关掉页面后也不会留下任何东西。',
    footer: '免费的照片测验',
  },
  'zh-hant': {
    title: '拍照測驗', lead: '真實的人臉辨識，一張照片，什麼都不上傳', kicker: '拍照測驗',
    metaTitle: '拍照測驗 — 在瀏覽器裡分析一張照片',
    metaDesc: '用真實人臉辨識的免費照片測驗：微笑指數、臉部對稱、黃金比例。全部在瀏覽器裡執行，照片永遠不會被上傳。',
    privacy: '每個測驗都完全在你的瀏覽器裡執行。照片不會被送到伺服器，關掉頁面後也不會留下任何東西。',
    footer: '免費的照片測驗',
  },
};

const TOOLS: Record<SnapIntlLang, Record<SnapToolSlug, ToolCopy>> = {
  en: {
    'smile-score': {
      title: 'Smile Score', desc: 'How far your mouth corners lift',
      metaTitle: 'Smile Score — Measure Your Smile From One Photo',
      metaDesc: 'Upload a photo and measure how far your mouth corners lift, how open the smile is and how balanced it looks. Runs entirely in your browser — nothing is uploaded.',
    },
    'face-symmetry': {
      title: 'Face Symmetry', desc: 'Left–right balance, feature by feature',
      metaTitle: 'Face Symmetry Test — Left vs Right, Feature by Feature',
      metaDesc: 'Measure the left–right balance of your eyes, eyebrows, mouth and jawline from a single photo. Runs in your browser; nothing is uploaded to a server.',
    },
    'golden-ratio': {
      title: 'Golden Ratio Test', desc: 'How close your proportions sit to φ',
      metaTitle: 'Golden Ratio Face Test — How Close to φ 1.618',
      metaDesc: 'Measure four facial proportions against the golden ratio from one photo. Real landmark coordinates, calculated in your browser — nothing is uploaded.',
    },
    'photo-mood': {
      title: 'Photo Mood', desc: 'Colour mood from any photo',
      metaTitle: "Photo Mood Analyser — Read Any Photo's Colour Mood",
      metaDesc: 'Upload any photo and measure its brightness, saturation, warmth and contrast from the pixels, with the dominant colour palette. No face needed, nothing uploaded.',
    },
    expression: {
      title: 'Expression Analyser', desc: 'Seven emotions, inferred by a model',
      metaTitle: 'Expression Analyser — Seven Emotions From One Photo',
      metaDesc: 'A trained neural network infers seven emotion probabilities from your photo, right in your browser. Real model outputs, nothing uploaded to a server.',
    },
    'first-impression': {
      title: 'First Impression', desc: 'Which of six impressions you read as',
      metaTitle: 'First Impression Analyser — Which of Six Do You Read As',
      metaDesc: 'Eye size, face proportion and mouth lift are measured from one photo to place you in one of six first impressions. Runs in your browser, nothing uploaded.',
    },
    handwriting: {
      title: 'Handwriting', desc: 'Slant and pressure from your writing',
      metaTitle: 'Handwriting Analysis — Slant and Pressure From a Photo',
      metaDesc: 'Photograph handwriting and measure the stroke slant with a structure tensor plus the pressure from stroke darkness. Runs in your browser; nothing is uploaded.',
    },
    'face-reading': {
      title: 'Face Reading', desc: 'Seven features, traditional style',
      metaTitle: 'Face Reading — Seven Features Read in the Traditional Style',
      metaDesc: 'Seven facial proportions are measured from your photo and read in the traditional physiognomy style. Real measurements, entertainment interpretation, nothing uploaded.',
    },
    'animal-face': {
      title: 'Animal Face Type', desc: 'Which of twelve animals you match',
      metaTitle: 'Animal Face Test — Which of 12 Animals Do You Match',
      metaDesc: 'Four facial ratios are measured from your photo and matched against twelve animal archetypes. Runs in your browser; nothing is uploaded.',
    },
    'personal-color': {
      title: 'Personal Colour', desc: 'Your seasonal type and palette',
      metaTitle: 'Personal Colour Analysis — Find Your Seasonal Type',
      metaDesc: 'Your cheek tone is sampled and white-balanced in your browser to place you in one of twelve seasonal colour types, with a palette generated from your own measurements.',
    },
    'couple-match': {
      title: 'Couple Face Match', desc: 'Compare two photos',
      metaTitle: 'Couple Face Match — Compare Two Photos',
      metaDesc: 'Upload two photos and compare six measured facial proportions to get a similarity score. Both photos are analysed in your browser and never uploaded.',
    },
  },
  es: {
    'smile-score': {
      title: 'Índice de sonrisa', desc: 'Cuánto se elevan las comisuras de tu boca',
      metaTitle: 'Índice de sonrisa — Mide tu sonrisa con una foto',
      metaDesc: 'Sube una foto y mide cuánto se elevan las comisuras, cuán abierta es la sonrisa y qué tan equilibrada se ve. Todo en tu navegador: no se sube nada.',
    },
    'face-symmetry': {
      title: 'Simetría facial', desc: 'Equilibrio izquierda–derecha, rasgo a rasgo',
      metaTitle: 'Test de simetría facial — Izquierda y derecha, rasgo a rasgo',
      metaDesc: 'Mide el equilibrio izquierda–derecha de tus ojos, cejas, boca y mandíbula con una sola foto. Funciona en tu navegador; nada se envía a un servidor.',
    },
    'golden-ratio': {
      title: 'Test de proporción áurea', desc: 'Cuánto se acercan tus proporciones a φ',
      metaTitle: 'Test facial de proporción áurea — ¿Cuán cerca de φ 1,618?',
      metaDesc: 'Mide cuatro proporciones faciales frente a la proporción áurea con una sola foto. Coordenadas reales, calculadas en tu navegador; no se sube nada.',
    },
    'photo-mood': {
      title: 'Ambiente de foto', desc: 'El ambiente de color de cualquier foto',
      metaTitle: 'Analizador de ambiente de foto — Lee el color de cualquier imagen',
      metaDesc: 'Sube cualquier foto y mide su brillo, saturación, calidez y contraste desde los píxeles, con la paleta de colores dominantes. No hace falta cara ni subir nada.',
    },
    expression: {
      title: 'Analizador de expresión', desc: 'Siete emociones, inferidas por un modelo',
      metaTitle: 'Analizador de expresión — Siete emociones desde una foto',
      metaDesc: 'Una red neuronal entrenada infiere siete probabilidades de emoción a partir de tu foto, en tu propio navegador. Salidas reales del modelo, sin subir nada.',
    },
    'first-impression': {
      title: 'Primera impresión', desc: 'Cuál de seis impresiones transmites',
      metaTitle: 'Analizador de primera impresión — Cuál de las seis eres',
      metaDesc: 'El tamaño de los ojos, la proporción de la cara y la elevación de la boca se miden en una foto para situarte en una de seis primeras impresiones. Todo en tu navegador.',
    },
    handwriting: {
      title: 'Letra', desc: 'Inclinación y presión de tu escritura',
      metaTitle: 'Análisis de letra — Inclinación y presión desde una foto',
      metaDesc: 'Fotografía tu letra y mide la inclinación de los trazos con un tensor de estructura y la presión por lo oscuros que son. Funciona en tu navegador; no se sube nada.',
    },
    'face-reading': {
      title: 'Lectura del rostro', desc: 'Siete rasgos, al estilo tradicional',
      metaTitle: 'Lectura del rostro — Siete rasgos leídos al estilo tradicional',
      metaDesc: 'Siete proporciones faciales se miden en tu foto y se leen al estilo tradicional de la fisiognomía. Medidas reales, interpretación de entretenimiento, sin subir nada.',
    },
    'animal-face': {
      title: 'Tipo de cara animal', desc: 'Con cuál de doce animales coincides',
      metaTitle: 'Test de cara animal — ¿Con cuál de los 12 coincides?',
      metaDesc: 'Cuatro proporciones faciales se miden en tu foto y se comparan con doce arquetipos animales. Funciona en tu navegador; no se sube nada.',
    },
    'personal-color': {
      title: 'Color personal', desc: 'Tu tipo estacional y tu paleta',
      metaTitle: 'Análisis de color personal — Encuentra tu tipo estacional',
      metaDesc: 'El tono de tus mejillas se muestrea y equilibra en blanco dentro de tu navegador para situarte en uno de doce tipos estacionales, con una paleta hecha desde tus medidas.',
    },
    'couple-match': {
      title: 'Compatibilidad de pareja', desc: 'Compara dos fotos',
      metaTitle: 'Compatibilidad facial de pareja — Compara dos fotos',
      metaDesc: 'Sube dos fotos y compara seis proporciones faciales medidas para obtener una puntuación de parecido. Ambas se analizan en tu navegador y nunca se suben.',
    },
  },
  'pt-br': {
    'smile-score': {
      title: 'Índice de sorriso', desc: 'O quanto os cantos da sua boca sobem',
      metaTitle: 'Índice de sorriso — Meça seu sorriso com uma foto',
      metaDesc: 'Envie uma foto e meça o quanto os cantos da boca sobem, o quanto o sorriso é aberto e como ele fica equilibrado. Tudo no seu navegador: nada é enviado.',
    },
    'face-symmetry': {
      title: 'Simetria facial', desc: 'Equilíbrio esquerda–direita, traço a traço',
      metaTitle: 'Teste de simetria facial — Esquerda e direita, traço a traço',
      metaDesc: 'Meça o equilíbrio esquerda–direita dos seus olhos, sobrancelhas, boca e mandíbula com uma única foto. Roda no seu navegador; nada vai para um servidor.',
    },
    'golden-ratio': {
      title: 'Teste da proporção áurea', desc: 'O quanto suas proporções chegam perto de φ',
      metaTitle: 'Teste facial da proporção áurea — Quão perto de φ 1,618',
      metaDesc: 'Meça quatro proporções faciais contra a proporção áurea a partir de uma foto. Coordenadas reais, calculadas no seu navegador; nada é enviado.',
    },
    'photo-mood': {
      title: 'Clima da foto', desc: 'O clima de cor de qualquer foto',
      metaTitle: 'Analisador de clima da foto — Leia a cor de qualquer imagem',
      metaDesc: 'Envie qualquer foto e meça brilho, saturação, calidez e contraste a partir dos pixels, com a paleta de cores dominantes. Sem precisar de rosto e sem enviar nada.',
    },
    expression: {
      title: 'Analisador de expressão', desc: 'Sete emoções, inferidas por um modelo',
      metaTitle: 'Analisador de expressão — Sete emoções a partir de uma foto',
      metaDesc: 'Uma rede neural treinada infere sete probabilidades de emoção a partir da sua foto, no seu próprio navegador. Saídas reais do modelo, sem enviar nada.',
    },
    'first-impression': {
      title: 'Primeira impressão', desc: 'Qual das seis impressões você passa',
      metaTitle: 'Analisador de primeira impressão — Qual das seis é você',
      metaDesc: 'Tamanho dos olhos, proporção do rosto e elevação da boca são medidos em uma foto para situar você em uma de seis primeiras impressões. Tudo no navegador.',
    },
    handwriting: {
      title: 'Letra', desc: 'Inclinação e pressão da sua escrita',
      metaTitle: 'Análise de letra — Inclinação e pressão a partir de uma foto',
      metaDesc: 'Fotografe sua letra e meça a inclinação dos traços com um tensor de estrutura e a pressão pelo quanto eles são escuros. Roda no seu navegador; nada é enviado.',
    },
    'face-reading': {
      title: 'Leitura de rosto', desc: 'Sete traços, no estilo tradicional',
      metaTitle: 'Leitura de rosto — Sete traços lidos no estilo tradicional',
      metaDesc: 'Sete proporções faciais são medidas na sua foto e lidas no estilo tradicional da fisiognomia. Medidas reais, interpretação de entretenimento, nada enviado.',
    },
    'animal-face': {
      title: 'Tipo de rosto animal', desc: 'Com qual dos doze animais você combina',
      metaTitle: 'Teste de rosto animal — Com qual dos 12 você combina',
      metaDesc: 'Quatro proporções faciais são medidas na sua foto e comparadas com doze arquétipos de animais. Roda no seu navegador; nada é enviado.',
    },
    'personal-color': {
      title: 'Coloração pessoal', desc: 'Seu tipo sazonal e sua paleta',
      metaTitle: 'Análise de coloração pessoal — Descubra seu tipo sazonal',
      metaDesc: 'O tom das suas bochechas é amostrado e balanceado no seu navegador para situar você em um de doze tipos sazonais, com uma paleta feita das suas próprias medidas.',
    },
    'couple-match': {
      title: 'Combinação do casal', desc: 'Compare duas fotos',
      metaTitle: 'Combinação facial do casal — Compare duas fotos',
      metaDesc: 'Envie duas fotos e compare seis proporções faciais medidas para obter uma pontuação de semelhança. As duas são analisadas no seu navegador e nunca enviadas.',
    },
  },
  ja: {
    'smile-score': {
      title: 'スマイル指数', desc: '口角がどれだけ上がっているか',
      metaTitle: 'スマイル指数 — 写真1枚で笑顔を測る',
      metaDesc: '写真をアップして、口角の上がり方・口の開き方・左右のバランスを測ります。すべてブラウザ内で動き、写真は送信されません。',
    },
    'face-symmetry': {
      title: '顔の左右対称', desc: 'パーツごとの左右バランス',
      metaTitle: '顔の左右対称テスト — パーツごとに左右を比べる',
      metaDesc: '写真1枚から、目・眉・口・フェイスラインの左右バランスを測ります。ブラウザ内で完結し、サーバーには何も送りません。',
    },
    'golden-ratio': {
      title: '黄金比テスト', desc: '比率が φ にどれだけ近いか',
      metaTitle: '顔の黄金比テスト — φ 1.618 にどれだけ近いか',
      metaDesc: '写真1枚から4つの顔の比率を黄金比と比べます。実際のランドマーク座標をブラウザ内で計算し、何もアップロードしません。',
    },
    'photo-mood': {
      title: '写真ムード', desc: 'どんな写真からでも色のムードを',
      metaTitle: '写真ムード解析 — どんな写真の色の雰囲気も読む',
      metaDesc: 'どんな写真でもアップして、明るさ・彩度・暖かさ・コントラストをピクセルから測り、主要な色も出します。顔は不要、アップロードもなし。',
    },
    expression: {
      title: '表情アナライザー', desc: 'モデルが推定する7つの感情',
      metaTitle: '表情アナライザー — 写真1枚から7つの感情',
      metaDesc: '学習済みのニューラルネットが、ブラウザ内で写真から7つの感情確率を推定します。本物のモデル出力で、サーバーには何も送りません。',
    },
    'first-impression': {
      title: '第一印象', desc: '6つの印象のどれに近いか',
      metaTitle: '第一印象アナライザー — 6タイプのどれに読まれるか',
      metaDesc: '目の大きさ・顔の比率・口角の上がりを写真1枚から測り、6つの第一印象のどれに近いかを見ます。ブラウザ内で完結し、アップロードはありません。',
    },
    handwriting: {
      title: '筆跡', desc: '手書きの傾きと筆圧',
      metaTitle: '筆跡診断 — 写真から線の傾きと筆圧を測る',
      metaDesc: '手書きの文字を撮ると、構造テンソルで線の傾きを、濃さから筆圧を測ります。ブラウザ内で動き、何もアップロードしません。',
    },
    'face-reading': {
      title: '顔相診断', desc: '7つのパーツを伝統的な読み方で',
      metaTitle: '顔相診断 — 7つのパーツを伝統的な読み方でみる',
      metaDesc: '写真から顔の7つの比率を測り、人相学の伝統的な読み方でみます。測定は本物、解釈は遊び、アップロードはありません。',
    },
    'animal-face': {
      title: '動物顔タイプ', desc: '12の動物のどれに近いか',
      metaTitle: '動物顔テスト — 12タイプのどれに近いか',
      metaDesc: '写真から4つの顔の比率を測り、12の動物タイプと照らし合わせます。ブラウザ内で動き、何もアップロードしません。',
    },
    'personal-color': {
      title: 'パーソナルカラー', desc: 'あなたのシーズンタイプとパレット',
      metaTitle: 'パーソナルカラー診断 — 自分のシーズンタイプを知る',
      metaDesc: '頬の色をブラウザ内で取り出しホワイトバランスを取って、12のシーズンタイプのどれに近いかを判定し、その測定値からパレットを作ります。',
    },
    'couple-match': {
      title: 'カップル顔相性', desc: '写真2枚を比べる',
      metaTitle: 'カップル顔相性 — 写真2枚を比べる',
      metaDesc: '写真を2枚アップして、実測した6つの顔の比率を比べ、似ている度合いを出します。どちらもブラウザ内で解析し、アップロードはしません。',
    },
  },
  de: {
    'smile-score': {
      title: 'Lächel-Index', desc: 'Wie weit deine Mundwinkel gehen',
      metaTitle: 'Lächel-Index — Miss dein Lächeln mit einem Foto',
      metaDesc: 'Lade ein Foto hoch und miss, wie weit die Mundwinkel steigen, wie offen das Lächeln ist und wie ausgeglichen es wirkt. Alles im Browser — nichts wird hochgeladen.',
    },
    'face-symmetry': {
      title: 'Gesichtssymmetrie', desc: 'Links-rechts-Balance, Merkmal für Merkmal',
      metaTitle: 'Gesichtssymmetrie-Test — Links gegen rechts, Merkmal für Merkmal',
      metaDesc: 'Miss die Links-rechts-Balance von Augen, Brauen, Mund und Kieferlinie aus einem einzigen Foto. Läuft im Browser; nichts geht an einen Server.',
    },
    'golden-ratio': {
      title: 'Goldener-Schnitt-Test', desc: 'Wie nah deine Proportionen an φ liegen',
      metaTitle: 'Goldener-Schnitt-Test fürs Gesicht — Wie nah an φ 1,618',
      metaDesc: 'Miss vier Gesichtsproportionen gegen den Goldenen Schnitt, aus einem Foto. Echte Landmarkenkoordinaten, im Browser berechnet — nichts wird hochgeladen.',
    },
    'photo-mood': {
      title: 'Foto-Stimmung', desc: 'Farbstimmung aus jedem Foto',
      metaTitle: 'Foto-Stimmungsanalyse — Die Farbstimmung jedes Bildes lesen',
      metaDesc: 'Lade ein beliebiges Foto hoch und miss Helligkeit, Sättigung, Wärme und Kontrast aus den Pixeln, samt dominanter Farbpalette. Kein Gesicht nötig, kein Upload.',
    },
    expression: {
      title: 'Ausdrucks-Analyse', desc: 'Sieben Emotionen, von einem Modell geschätzt',
      metaTitle: 'Ausdrucks-Analyse — Sieben Emotionen aus einem Foto',
      metaDesc: 'Ein trainiertes neuronales Netz schätzt direkt in deinem Browser sieben Emotionswahrscheinlichkeiten aus deinem Foto. Echte Modellausgaben, kein Upload.',
    },
    'first-impression': {
      title: 'Erster Eindruck', desc: 'Welcher von sechs Eindrücken auf dich passt',
      metaTitle: 'Erster-Eindruck-Analyse — Welcher der sechs bist du',
      metaDesc: 'Augengröße, Gesichtsproportion und Mundwinkel werden aus einem Foto gemessen und einem von sechs ersten Eindrücken zugeordnet. Läuft im Browser, kein Upload.',
    },
    handwriting: {
      title: 'Handschrift', desc: 'Neigung und Druck deiner Schrift',
      metaTitle: 'Handschrift-Analyse — Neigung und Druck aus einem Foto',
      metaDesc: 'Fotografiere Handgeschriebenes: Die Strichneigung wird über einen Strukturtensor gemessen, der Druck über die Dunkelheit der Striche. Alles im Browser, kein Upload.',
    },
    'face-reading': {
      title: 'Gesichtsdeutung', desc: 'Sieben Merkmale, traditionell gelesen',
      metaTitle: 'Gesichtsdeutung — Sieben Merkmale traditionell gelesen',
      metaDesc: 'Sieben Gesichtsproportionen werden aus deinem Foto gemessen und im traditionellen Stil der Physiognomik gelesen. Echte Messungen, Deutung als Unterhaltung, kein Upload.',
    },
    'animal-face': {
      title: 'Tiergesichtstyp', desc: 'Zu welchem von zwölf Tieren du passt',
      metaTitle: 'Tiergesicht-Test — Zu welchem der 12 Tiere passt du',
      metaDesc: 'Vier Gesichtsverhältnisse werden aus deinem Foto gemessen und mit zwölf Tier-Archetypen abgeglichen. Läuft im Browser; nichts wird hochgeladen.',
    },
    'personal-color': {
      title: 'Personal Color', desc: 'Dein Jahreszeitentyp und deine Palette',
      metaTitle: 'Personal-Color-Analyse — Finde deinen Jahreszeitentyp',
      metaDesc: 'Dein Wangenton wird im Browser ausgelesen und weißabgeglichen, um dich einem von zwölf Jahreszeitentypen zuzuordnen — mit einer Palette aus deinen eigenen Messwerten.',
    },
    'couple-match': {
      title: 'Paar-Gesichtsvergleich', desc: 'Zwei Fotos vergleichen',
      metaTitle: 'Paar-Gesichtsvergleich — Zwei Fotos vergleichen',
      metaDesc: 'Lade zwei Fotos hoch und vergleiche sechs gemessene Gesichtsproportionen für einen Ähnlichkeitswert. Beide werden im Browser ausgewertet und nie hochgeladen.',
    },
  },
  fr: {
    'smile-score': {
      title: 'Indice de sourire', desc: 'La remontée des coins de votre bouche',
      metaTitle: 'Indice de sourire — Mesurez votre sourire sur une photo',
      metaDesc: 'Envoyez une photo et mesurez la remontée des commissures, l’ouverture du sourire et son équilibre. Tout se passe dans votre navigateur : rien n’est envoyé.',
    },
    'face-symmetry': {
      title: 'Symétrie du visage', desc: 'Équilibre gauche–droite, trait par trait',
      metaTitle: 'Test de symétrie du visage — Gauche et droite, trait par trait',
      metaDesc: 'Mesurez l’équilibre gauche–droite de vos yeux, sourcils, bouche et mâchoire à partir d’une seule photo. Tout tourne dans le navigateur ; rien ne part vers un serveur.',
    },
    'golden-ratio': {
      title: 'Test du nombre d’or', desc: 'À quel point vos proportions approchent φ',
      metaTitle: 'Test du nombre d’or sur le visage — À quel point proche de φ 1,618',
      metaDesc: 'Mesurez quatre proportions du visage face au nombre d’or à partir d’une photo. Vraies coordonnées de repères, calculées dans votre navigateur, sans aucun envoi.',
    },
    'photo-mood': {
      title: 'Ambiance photo', desc: 'L’ambiance colorée de n’importe quelle photo',
      metaTitle: 'Analyseur d’ambiance photo — Lisez la couleur de n’importe quelle image',
      metaDesc: 'Envoyez n’importe quelle photo et mesurez sa luminosité, sa saturation, sa chaleur et son contraste depuis les pixels, avec la palette dominante. Sans visage, sans envoi.',
    },
    expression: {
      title: 'Analyseur d’expression', desc: 'Sept émotions, déduites par un modèle',
      metaTitle: 'Analyseur d’expression — Sept émotions à partir d’une photo',
      metaDesc: 'Un réseau de neurones entraîné déduit sept probabilités d’émotion depuis votre photo, dans votre navigateur. De vraies sorties du modèle, sans aucun envoi.',
    },
    'first-impression': {
      title: 'Première impression', desc: 'Laquelle des six impressions vous renvoyez',
      metaTitle: 'Analyseur de première impression — Laquelle des six êtes-vous',
      metaDesc: 'La taille des yeux, la proportion du visage et la remontée de la bouche sont mesurées sur une photo pour vous situer parmi six premières impressions. Sans envoi.',
    },
    handwriting: {
      title: 'Écriture', desc: 'Inclinaison et pression de votre écriture',
      metaTitle: 'Analyse d’écriture — Inclinaison et pression à partir d’une photo',
      metaDesc: 'Photographiez de l’écriture : l’inclinaison des traits est mesurée par un tenseur de structure et la pression par leur noirceur. Tout dans le navigateur, sans envoi.',
    },
    'face-reading': {
      title: 'Lecture du visage', desc: 'Sept traits, à la manière traditionnelle',
      metaTitle: 'Lecture du visage — Sept traits lus à la manière traditionnelle',
      metaDesc: 'Sept proportions du visage sont mesurées sur votre photo et lues dans le style traditionnel de la physiognomonie. Mesures réelles, interprétation ludique, aucun envoi.',
    },
    'animal-face': {
      title: 'Type de visage animal', desc: 'Lequel des douze animaux vous correspond',
      metaTitle: 'Test du visage animal — Lequel des 12 vous correspond',
      metaDesc: 'Quatre rapports du visage sont mesurés sur votre photo et comparés à douze archétypes animaux. Tout tourne dans le navigateur ; rien n’est envoyé.',
    },
    'personal-color': {
      title: 'Colorimétrie', desc: 'Votre type saisonnier et votre palette',
      metaTitle: 'Analyse de colorimétrie — Trouvez votre type saisonnier',
      metaDesc: 'Le ton de vos joues est échantillonné et équilibré en blanc dans votre navigateur pour vous situer parmi douze types saisonniers, avec une palette issue de vos mesures.',
    },
    'couple-match': {
      title: 'Compatibilité de couple', desc: 'Comparez deux photos',
      metaTitle: 'Compatibilité des visages en couple — Comparez deux photos',
      metaDesc: 'Envoyez deux photos et comparez six proportions du visage mesurées pour obtenir un score de ressemblance. Les deux sont analysées dans votre navigateur, jamais envoyées.',
    },
  },
  hi: {
    'smile-score': {
      title: 'मुस्कान स्कोर', desc: 'आपके होंठों के कोने कितने ऊपर उठते हैं',
      metaTitle: 'मुस्कान स्कोर — एक फ़ोटो से अपनी मुस्कान नापें',
      metaDesc: 'एक फ़ोटो दीजिए और नापिए कि होंठों के कोने कितने ऊपर उठते हैं, मुस्कान कितनी खुली है और कितनी संतुलित दिखती है। सब आपके ब्राउज़र में — कुछ भी अपलोड नहीं।',
    },
    'face-symmetry': {
      title: 'चेहरे की समरूपता', desc: 'हिस्से-दर-हिस्से बाएँ–दाएँ संतुलन',
      metaTitle: 'चेहरे की समरूपता टेस्ट — बाएँ बनाम दाएँ, हिस्से-दर-हिस्से',
      metaDesc: 'एक ही फ़ोटो से अपनी आँखों, भौंहों, होंठों और जबड़े की रेखा का बाएँ–दाएँ संतुलन नापें। ब्राउज़र में चलता है; सर्वर पर कुछ नहीं जाता।',
    },
    'golden-ratio': {
      title: 'गोल्डन रेशियो टेस्ट', desc: 'आपके अनुपात φ के कितने पास हैं',
      metaTitle: 'चेहरे का गोल्डन रेशियो टेस्ट — φ 1.618 के कितने पास',
      metaDesc: 'एक फ़ोटो से चेहरे के चार अनुपात गोल्डन रेशियो से मिलाकर नापें। असली लैंडमार्क निर्देशांक, आपके ब्राउज़र में गणना — कुछ भी अपलोड नहीं।',
    },
    'photo-mood': {
      title: 'फ़ोटो मूड', desc: 'किसी भी फ़ोटो का रंग-मूड',
      metaTitle: 'फ़ोटो मूड विश्लेषक — किसी भी तस्वीर का रंग-मिज़ाज पढ़ें',
      metaDesc: 'कोई भी फ़ोटो दीजिए और पिक्सल से उसकी चमक, संतृप्ति, गरमाहट और कंट्रास्ट नापिए, साथ में प्रमुख रंगों की पट्टी। चेहरा ज़रूरी नहीं, अपलोड भी नहीं।',
    },
    expression: {
      title: 'भाव विश्लेषक', desc: 'मॉडल से निकाली सात भावनाएँ',
      metaTitle: 'भाव विश्लेषक — एक फ़ोटो से सात भावनाएँ',
      metaDesc: 'एक प्रशिक्षित न्यूरल नेटवर्क आपके ब्राउज़र में ही फ़ोटो से सात भावनाओं की संभावना निकालता है। मॉडल के असली आउटपुट, सर्वर पर कुछ नहीं जाता।',
    },
    'first-impression': {
      title: 'पहली छाप', desc: 'छह में से कौन-सी छाप आप छोड़ते हैं',
      metaTitle: 'पहली छाप विश्लेषक — छह में से आप कौन-से हैं',
      metaDesc: 'आँखों का आकार, चेहरे का अनुपात और होंठों का उठाव एक फ़ोटो से नापकर आपको छह पहली छापों में से एक में रखा जाता है। ब्राउज़र में चलता है, अपलोड नहीं।',
    },
    handwriting: {
      title: 'लिखावट', desc: 'आपकी लिखाई का झुकाव और दबाव',
      metaTitle: 'लिखावट विश्लेषण — फ़ोटो से झुकाव और दबाव',
      metaDesc: 'हाथ की लिखाई की फ़ोटो लीजिए: लकीरों का झुकाव स्ट्रक्चर टेंसर से और दबाव उनके गहरेपन से नापा जाता है। सब ब्राउज़र में, कुछ भी अपलोड नहीं।',
    },
    'face-reading': {
      title: 'चेहरा पढ़ना', desc: 'सात हिस्से, पारंपरिक तरीक़े से',
      metaTitle: 'चेहरा पढ़ना — सात हिस्से पारंपरिक तरीक़े से',
      metaDesc: 'आपकी फ़ोटो से चेहरे के सात अनुपात नापकर सामुद्रिक शास्त्र की पारंपरिक शैली में पढ़े जाते हैं। माप असली, व्याख्या मनोरंजन, अपलोड कुछ नहीं।',
    },
    'animal-face': {
      title: 'जानवर चेहरा टाइप', desc: 'बारह जानवरों में से आप किससे मिलते हैं',
      metaTitle: 'जानवर चेहरा टेस्ट — 12 में से आप किससे मिलते हैं',
      metaDesc: 'आपकी फ़ोटो से चेहरे के चार अनुपात नापकर बारह जानवर टाइपों से मिलाए जाते हैं। ब्राउज़र में चलता है; कुछ भी अपलोड नहीं होता।',
    },
    'personal-color': {
      title: 'पर्सनल कलर', desc: 'आपका मौसमी टाइप और पैलेट',
      metaTitle: 'पर्सनल कलर विश्लेषण — अपना मौसमी टाइप जानें',
      metaDesc: 'आपके गालों का रंग ब्राउज़र में लिया और व्हाइट बैलेंस किया जाता है ताकि बारह मौसमी टाइपों में से एक तय हो, और आपकी अपनी माप से पैलेट बने।',
    },
    'couple-match': {
      title: 'कपल चेहरा मिलान', desc: 'दो फ़ोटो की तुलना',
      metaTitle: 'कपल चेहरा मिलान — दो फ़ोटो की तुलना',
      metaDesc: 'दो फ़ोटो दीजिए और चेहरे के छह नापे गए अनुपात मिलाकर समानता स्कोर पाइए। दोनों आपके ब्राउज़र में जाँची जाती हैं और कभी अपलोड नहीं होतीं।',
    },
  },
  'zh-hans': {
    'smile-score': {
      title: '微笑指数', desc: '你的嘴角上扬了多少',
      metaTitle: '微笑指数 — 用一张照片测量你的笑容',
      metaDesc: '上传一张照片，测量嘴角上扬的幅度、笑容的开合和左右是否均衡。全部在你的浏览器里完成——什么都不会上传。',
    },
    'face-symmetry': {
      title: '面部对称', desc: '逐个部位的左右平衡',
      metaTitle: '面部对称测试 — 左右逐个部位比对',
      metaDesc: '用一张照片测量眼睛、眉毛、嘴和下颌线的左右平衡。在浏览器里运行，什么都不会送到服务器。',
    },
    'golden-ratio': {
      title: '黄金比例测试', desc: '你的比例离 φ 有多近',
      metaTitle: '面部黄金比例测试 — 离 φ 1.618 有多近',
      metaDesc: '用一张照片把四项面部比例和黄金比例做比较。真实的关键点坐标，在你的浏览器里计算——什么都不会上传。',
    },
    'photo-mood': {
      title: '照片氛围', desc: '任何照片的色彩氛围',
      metaTitle: '照片氛围分析 — 读出任何图片的色彩气质',
      metaDesc: '上传任何照片，从像素里测量亮度、饱和度、冷暖和对比度，并给出主色调。不需要有脸，也不需要上传。',
    },
    expression: {
      title: '表情分析', desc: '模型推断的七种情绪',
      metaTitle: '表情分析 — 从一张照片读出七种情绪',
      metaDesc: '训练好的神经网络就在你的浏览器里，从照片推断七种情绪的概率。是模型真实的输出，什么都不会送到服务器。',
    },
    'first-impression': {
      title: '第一印象', desc: '你更接近六种印象中的哪一种',
      metaTitle: '第一印象分析 — 六种里你是哪一种',
      metaDesc: '从一张照片测量眼睛大小、脸部比例和嘴角上扬，把你归入六种第一印象之一。在浏览器里运行，什么都不上传。',
    },
    handwriting: {
      title: '笔迹', desc: '你写字的倾斜和力度',
      metaTitle: '笔迹分析 — 从照片测出倾斜与力度',
      metaDesc: '拍一张手写字：笔画的倾斜用结构张量测出，力度来自笔画的深浅。全部在浏览器里完成，什么都不上传。',
    },
    'face-reading': {
      title: '面相分析', desc: '七个部位，传统读法',
      metaTitle: '面相分析 — 七个部位按传统方式解读',
      metaDesc: '从你的照片测量七项面部比例，按面相学的传统方式解读。测量是真的，解读是娱乐，什么都不上传。',
    },
    'animal-face': {
      title: '动物脸型', desc: '你更像十二种动物中的哪一种',
      metaTitle: '动物脸型测试 — 十二种里你像哪一种',
      metaDesc: '从你的照片测出四项面部比例，再和十二种动物原型比对。在浏览器里运行；什么都不会上传。',
    },
    'personal-color': {
      title: '个人色彩', desc: '你的季型和配色板',
      metaTitle: '个人色彩分析 — 找到你的四季类型',
      metaDesc: '在浏览器里取样并白平衡你脸颊的肤色，把你归入十二种季型之一，并用你自己的测量值生成配色板。',
    },
    'couple-match': {
      title: '情侣脸型契合度', desc: '比较两张照片',
      metaTitle: '情侣脸型契合度 — 比较两张照片',
      metaDesc: '上传两张照片，比较六项实测的面部比例得出相似度分数。两张都在你的浏览器里分析，永远不会上传。',
    },
  },
  'zh-hant': {
    'smile-score': {
      title: '微笑指數', desc: '你的嘴角上揚了多少',
      metaTitle: '微笑指數 — 用一張照片測量你的笑容',
      metaDesc: '上傳一張照片，測量嘴角上揚的幅度、笑容的開合和左右是否均衡。全部在你的瀏覽器裡完成——什麼都不會上傳。',
    },
    'face-symmetry': {
      title: '臉部對稱', desc: '逐個部位的左右平衡',
      metaTitle: '臉部對稱測驗 — 左右逐個部位比對',
      metaDesc: '用一張照片測量眼睛、眉毛、嘴和下顎線的左右平衡。在瀏覽器裡執行，什麼都不會送到伺服器。',
    },
    'golden-ratio': {
      title: '黃金比例測驗', desc: '你的比例離 φ 有多近',
      metaTitle: '臉部黃金比例測驗 — 離 φ 1.618 有多近',
      metaDesc: '用一張照片把四項臉部比例和黃金比例做比較。真實的關鍵點座標，在你的瀏覽器裡計算——什麼都不會上傳。',
    },
    'photo-mood': {
      title: '照片氛圍', desc: '任何照片的色彩氛圍',
      metaTitle: '照片氛圍分析 — 讀出任何圖片的色彩氣質',
      metaDesc: '上傳任何照片，從像素裡測量亮度、飽和度、冷暖和對比，並給出主色調。不需要有臉，也不需要上傳。',
    },
    expression: {
      title: '表情分析', desc: '模型推斷的七種情緒',
      metaTitle: '表情分析 — 從一張照片讀出七種情緒',
      metaDesc: '訓練好的神經網路就在你的瀏覽器裡，從照片推斷七種情緒的機率。是模型真實的輸出，什麼都不會送到伺服器。',
    },
    'first-impression': {
      title: '第一印象', desc: '你更接近六種印象中的哪一種',
      metaTitle: '第一印象分析 — 六種裡你是哪一種',
      metaDesc: '從一張照片測量眼睛大小、臉部比例和嘴角上揚，把你歸入六種第一印象之一。在瀏覽器裡執行，什麼都不上傳。',
    },
    handwriting: {
      title: '筆跡', desc: '你寫字的傾斜和力道',
      metaTitle: '筆跡分析 — 從照片測出傾斜與力道',
      metaDesc: '拍一張手寫字：筆畫的傾斜用結構張量測出，力道來自筆畫的深淺。全部在瀏覽器裡完成，什麼都不上傳。',
    },
    'face-reading': {
      title: '面相分析', desc: '七個部位，傳統讀法',
      metaTitle: '面相分析 — 七個部位按傳統方式解讀',
      metaDesc: '從你的照片測量七項臉部比例，按面相學的傳統方式解讀。測量是真的，解讀是娛樂，什麼都不上傳。',
    },
    'animal-face': {
      title: '動物臉型', desc: '你更像十二種動物中的哪一種',
      metaTitle: '動物臉型測驗 — 十二種裡你像哪一種',
      metaDesc: '從你的照片測出四項臉部比例，再和十二種動物原型比對。在瀏覽器裡執行；什麼都不會上傳。',
    },
    'personal-color': {
      title: '個人色彩', desc: '你的季型和配色板',
      metaTitle: '個人色彩分析 — 找到你的四季類型',
      metaDesc: '在瀏覽器裡取樣並白平衡你臉頰的膚色，把你歸入十二種季型之一，並用你自己的測量值產生配色板。',
    },
    'couple-match': {
      title: '情侶臉型契合度', desc: '比較兩張照片',
      metaTitle: '情侶臉型契合度 — 比較兩張照片',
      metaDesc: '上傳兩張照片，比較六項實測的臉部比例得出相似度分數。兩張都在你的瀏覽器裡分析，永遠不會上傳。',
    },
  },
};

export function snapHubCopy(lang: SnapIntlLang): HubCopy {
  return HUB[lang];
}

export function snapToolCopy(lang: SnapIntlLang, slug: SnapToolSlug): ToolCopy {
  return TOOLS[lang][slug];
}

/** 허브 카드 — 아이콘·색은 언어와 무관하므로 SNAP_TOOLS에서 그대로 가져온다 */
export function snapHubCards(lang: SnapIntlLang) {
  return SNAP_TOOLS.map(t => ({
    href: `/${lang}/snap/${t.slug}`,
    icon: t.icon,
    color: t.color,
    title: TOOLS[lang][t.slug].title,
    desc: TOOLS[lang][t.slug].desc,
  }));
}

/**
 * 열 언어가 모두 있는 경로다 — 한국어까지 열 언어를 서로 가리키게 둔다.
 * 한쪽만 선언하면 구글이 짝으로 인정하지 않는다.
 */
export function snapHubMetadata(lang: SnapIntlLang): Metadata {
  const c = HUB[lang];
  const route = '/snap';
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    openGraph: { ...openGraphFor(lang as AnyLocale10), title: c.metaTitle, description: c.metaDesc, url: localeHref(lang, route) },
  };
}

export function snapToolMetadata(lang: SnapIntlLang, slug: SnapToolSlug): Metadata {
  const c = TOOLS[lang][slug];
  const route = `/snap/${slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    openGraph: { ...openGraphFor(lang as AnyLocale10), title: c.metaTitle, description: c.metaDesc, url: localeHref(lang, route) },
  };
}

/**
 * 공유 카드 표에 합칠 조각. 열쇠는 og-intl과 같은 "snap[/도구]/언어" 꼴이다.
 *
 * 허브 목록과 같은 title·desc를 쓴다 — 목록에서 보고 눌렀는데 카드가 다른 말을
 * 하면 같은 도구로 안 읽힌다.
 */
export function snapIntlCards(): Record<string, { icon: string; eyebrow: string; title: string; desc: string; from: string; to: string }> {
  const out: Record<string, { icon: string; eyebrow: string; title: string; desc: string; from: string; to: string }> = {};
  for (const lang of Object.keys(TOOLS) as SnapIntlLang[]) {
    out[`snap/${lang}`] = {
      icon: '📸', eyebrow: 'Snap Test', title: HUB[lang].title, desc: HUB[lang].lead,
      from: '#d946ef', to: '#0ea5e9',
    };
    for (const t of SNAP_TOOLS) {
      const c = TOOLS[lang][t.slug];
      out[`snap/${t.slug}/${lang}`] = {
        icon: t.icon, eyebrow: t.eyebrow, title: c.title, desc: c.desc, from: t.from, to: t.to,
      };
    }
  }
  return out;
}
