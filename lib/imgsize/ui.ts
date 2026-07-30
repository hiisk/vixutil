/**
 * 이미지 크기 화면의 문구 — 여덟 언어.
 *
 * 크기 이름은 플랫폼과 규격 이름이라 옮기지 않는다. 옮기는 것은 갈래 이름과
 * 설명, 화면 틀뿐이다 — 116 × 8이 아니라 9 × 8로 끝난다.
 */
import { LANG8_CODES, type L8, type Lang8 } from '../i18n/lang8.ts';
import type { SizeKind } from './list.ts';
import type { SizeFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ImgSizeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<SizeKind, string>;
  kindNote: Record<SizeKind, string>;
  pixelLabel: string;
  ratioLabel: string;
  megapixelLabel: string;
  printLabel: string;
  orientationLabel: string;
  portrait: string;
  landscape: string;
  square: string;
  rawLabel: string;
  jpegLabel: string;
  copyLabel: string;
  copiedLabel: string;
  sameRatioTitle: string;
  sameRatioNote: string;
  sameKindTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string, w: number, h: number) => string;
  metaDesc: (f: SizeFacts, kind: string) => string;
  hubFaq: FaqItem[];
  sizeFaq: (f: SizeFacts, kind: string) => FaqItem[];
}

/** 여덟 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V): L8<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi });

type Spec = { [K in keyof ImgSizeUI]: L8<ImgSizeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम'),
  section: T('이미지 크기', 'Image sizes', 'Tamaños de imagen', 'Tamanhos de imagem', '画像サイズ', 'Bildgrößen', "Tailles d'image", 'छवि आकार'),

  hubTitle: T(
    '이미지 크기 116가지',
    '116 image sizes',
    '116 tamaños de imagen',
    '116 tamanhos de imagem',
    '画像サイズ116種',
    '116 Bildgrößen',
    "116 tailles d'image",
    '116 छवि आकार',
  ),

  hubLead: T(
    '유튜브 썸네일부터 A4 인쇄, 증명사진까지 자주 쓰는 크기를 모았습니다. 화면비와 인쇄 크기, 대략의 용량까지 계산해서 보여 줍니다.',
    'From YouTube thumbnails to A4 prints and passport photos — the sizes people actually use, with aspect ratio, print size and a rough file size worked out.',
    'De miniaturas de YouTube a impresiones A4 y fotos de pasaporte: los tamaños que se usan de verdad, con relación de aspecto, medida impresa y peso aproximado.',
    'De miniaturas do YouTube a impressões A4 e fotos de passaporte: os tamanhos realmente usados, com proporção, medida impressa e peso aproximado.',
    'YouTubeのサムネイルからA4印刷、証明写真まで、よく使う寸法をまとめました。アスペクト比や印刷サイズ、おおよその容量まで計算して表示します。',
    'Von YouTube-Vorschaubildern über A4-Drucke bis zum Passfoto — die Größen, die wirklich gebraucht werden, samt Seitenverhältnis, Druckmaß und grober Dateigröße.',
    "Des miniatures YouTube aux impressions A4 et photos d'identité : les tailles réellement utilisées, avec format, dimensions à l'impression et poids approximatif.",
    'YouTube थंबनेल से A4 प्रिंट और पासपोर्ट फ़ोटो तक — असल में इस्तेमाल होने वाले आकार, आस्पेक्ट रेशियो, प्रिंट माप और अनुमानित फ़ाइल आकार के साथ।',
  ),

  kindLabel: T(
    { social: '소셜 게시물', profile: '프로필·배너', video: '영상', print: '인쇄', photo: '사진 인화', web: '웹·배경화면', icon: '아이콘', ad: '광고 배너', doc: '증명사진' },
    { social: 'Social posts', profile: 'Profiles and banners', video: 'Video', print: 'Print', photo: 'Photo prints', web: 'Web and wallpapers', icon: 'Icons', ad: 'Ad banners', doc: 'ID photos' },
    { social: 'Publicaciones', profile: 'Perfiles y portadas', video: 'Vídeo', print: 'Impresión', photo: 'Copias fotográficas', web: 'Web y fondos', icon: 'Iconos', ad: 'Banners publicitarios', doc: 'Fotos de carné' },
    { social: 'Publicações', profile: 'Perfis e capas', video: 'Vídeo', print: 'Impressão', photo: 'Cópias fotográficas', web: 'Web e papéis de parede', icon: 'Ícones', ad: 'Banners de anúncio', doc: 'Fotos de documento' },
    { social: 'SNS投稿', profile: 'プロフィールとバナー', video: '動画', print: '印刷', photo: '写真プリント', web: 'ウェブと壁紙', icon: 'アイコン', ad: '広告バナー', doc: '証明写真' },
    { social: 'Social-Media-Posts', profile: 'Profile und Banner', video: 'Video', print: 'Druck', photo: 'Fotoabzüge', web: 'Web und Hintergründe', icon: 'Symbole', ad: 'Werbebanner', doc: 'Passfotos' },
    { social: 'Publications', profile: 'Profils et bannières', video: 'Vidéo', print: 'Impression', photo: 'Tirages photo', web: 'Web et fonds d’écran', icon: 'Icônes', ad: 'Bannières publicitaires', doc: "Photos d'identité" },
    { social: 'सोशल पोस्ट', profile: 'प्रोफ़ाइल और बैनर', video: 'वीडियो', print: 'प्रिंट', photo: 'फ़ोटो प्रिंट', web: 'वेब और वॉलपेपर', icon: 'आइकन', ad: 'विज्ञापन बैनर', doc: 'पहचान फ़ोटो' },
  ),

  kindNote: T(
    {
      social: '올릴 때 잘리지 않게 맞추는 크기입니다. 정사각과 세로는 화면을 더 많이 차지합니다.',
      profile: '프로필 사진은 대개 동그랗게 잘리므로 가장자리에 중요한 것을 두지 마세요.',
      video: '영상 규격은 대부분 16:9이고, 세로 영상만 9:16으로 뒤집힙니다.',
      print: '인쇄는 300dpi가 기본입니다. 픽셀을 300으로 나누면 인치, 다시 25.4를 곱하면 밀리미터입니다.',
      photo: '사진관에서 뽑는 인화 크기입니다. 화면비가 안 맞으면 위아래나 좌우가 잘립니다.',
      web: '화면에 꽉 차게 쓰는 크기입니다. 배경화면은 기기 해상도에 맞추면 됩니다.',
      icon: '작게 줄여도 알아볼 수 있어야 하므로, 선이 가늘면 뭉개집니다.',
      ad: '광고 자리는 크기가 정해져 있습니다. 목록에 있는 값 그대로 만들어야 실립니다.',
      doc: '규격이 법으로 정해진 사진입니다. 밀리미터가 먼저이고 픽셀은 300dpi 환산값입니다.',
    },
    {
      social: 'Sizes that avoid cropping when you post. Square and portrait take up more of the screen.',
      profile: 'Profile photos are usually cropped to a circle, so keep anything important away from the edges.',
      video: 'Video formats are almost all 16:9; only vertical video flips it to 9:16.',
      print: 'Print assumes 300 dpi. Divide pixels by 300 for inches, then multiply by 25.4 for millimetres.',
      photo: 'The sizes a photo lab prints. If the aspect ratio does not match, the top and bottom or the sides get cut.',
      web: 'Sizes meant to fill the screen. For wallpapers, match your device resolution.',
      icon: 'These have to stay readable when shrunk, so thin lines turn to mush.',
      ad: 'Ad slots have fixed sizes. Build exactly the numbers on this list or the ad will not run.',
      doc: 'Photos whose size is set by regulation. The millimetres come first; the pixels are the 300 dpi equivalent.',
    },
    {
      social: 'Tamaños que evitan recortes al publicar. Los cuadrados y verticales ocupan más pantalla.',
      profile: 'Las fotos de perfil suelen recortarse en círculo: deja lo importante lejos de los bordes.',
      video: 'Casi todos los formatos de vídeo son 16:9; solo el vertical lo invierte a 9:16.',
      print: 'La impresión asume 300 ppp. Divide los píxeles entre 300 para pulgadas y multiplica por 25,4 para milímetros.',
      photo: 'Los tamaños que imprime un laboratorio. Si la proporción no coincide, se cortan los lados o el alto.',
      web: 'Tamaños pensados para llenar la pantalla. Para fondos, iguala la resolución de tu dispositivo.',
      icon: 'Tienen que seguir siendo legibles al reducirse: las líneas finas se emborronan.',
      ad: 'Los espacios publicitarios tienen medidas fijas. Hay que respetar exactamente los valores de la lista.',
      doc: 'Fotos con medidas fijadas por normativa. Los milímetros mandan; los píxeles son el equivalente a 300 ppp.',
    },
    {
      social: 'Tamanhos que evitam corte ao publicar. Quadrado e vertical ocupam mais tela.',
      profile: 'Fotos de perfil costumam ser cortadas em círculo: mantenha o importante longe das bordas.',
      video: 'Quase todos os formatos de vídeo são 16:9; só o vertical inverte para 9:16.',
      print: 'A impressão assume 300 dpi. Divida os pixels por 300 para polegadas e multiplique por 25,4 para milímetros.',
      photo: 'Os tamanhos que um laboratório imprime. Se a proporção não bate, cortam-se as laterais ou o topo.',
      web: 'Tamanhos feitos para preencher a tela. Para papel de parede, use a resolução do seu aparelho.',
      icon: 'Precisam continuar legíveis quando reduzidos: linhas finas viram borrão.',
      ad: 'Espaços de anúncio têm medidas fixas. É preciso usar exatamente os valores da lista.',
      doc: 'Fotos com medidas definidas por regulamento. Os milímetros vêm primeiro; os pixels são o equivalente a 300 dpi.',
    },
    {
      social: '投稿時に切れないように合わせる寸法です。正方形と縦長は画面をより多く占めます。',
      profile: 'プロフィール写真はたいてい円形に切り取られるので、大事なものを端に置かないでください。',
      video: '動画の規格はほとんど16:9で、縦動画だけが9:16に反転します。',
      print: '印刷は300dpiが基本です。画素数を300で割ればインチ、25.4を掛ければミリメートルです。',
      photo: '写真店でプリントする寸法です。アスペクト比が合わないと上下か左右が切れます。',
      web: '画面いっぱいに使う寸法です。壁紙は機器の解像度に合わせれば大丈夫です。',
      icon: '小さくしても分かる必要があるので、線が細いとつぶれます。',
      ad: '広告枠は寸法が決まっています。一覧の値どおりに作らないと掲載されません。',
      doc: '規格が定められた写真です。ミリメートルが先で、画素数は300dpi換算です。',
    },
    {
      social: 'Größen, bei denen beim Posten nichts abgeschnitten wird. Quadrat und Hochformat füllen mehr Bildschirm.',
      profile: 'Profilbilder werden meist rund beschnitten — Wichtiges gehört nicht an den Rand.',
      video: 'Videoformate sind fast alle 16:9; nur Hochformat dreht es auf 9:16.',
      print: 'Druck rechnet mit 300 dpi. Pixel durch 300 ergibt Zoll, mal 25,4 ergibt Millimeter.',
      photo: 'Die Formate, die ein Fotolabor druckt. Passt das Seitenverhältnis nicht, wird oben und unten oder seitlich beschnitten.',
      web: 'Größen, die den Bildschirm füllen sollen. Für Hintergründe die Geräteauflösung nehmen.',
      icon: 'Sie müssen verkleinert lesbar bleiben — dünne Linien verschwimmen.',
      ad: 'Werbeplätze haben feste Maße. Genau die Werte dieser Liste bauen, sonst läuft die Anzeige nicht.',
      doc: 'Fotos mit gesetzlich festgelegtem Maß. Die Millimeter zählen, die Pixel sind der Wert bei 300 dpi.',
    },
    {
      social: "Des tailles qui évitent le rognage à la publication. Carré et portrait occupent plus d'écran.",
      profile: 'Les photos de profil sont souvent rognées en cercle : gardez l’essentiel loin des bords.',
      video: 'Les formats vidéo sont presque tous en 16:9 ; seule la vidéo verticale passe en 9:16.',
      print: "L'impression suppose 300 ppp. Divisez les pixels par 300 pour des pouces, puis multipliez par 25,4 pour des millimètres.",
      photo: "Les formats qu'imprime un labo photo. Si le rapport ne colle pas, on coupe en haut et en bas ou sur les côtés.",
      web: "Des tailles prévues pour remplir l'écran. Pour un fond, reprenez la résolution de votre appareil.",
      icon: 'Elles doivent rester lisibles une fois réduites : les traits fins se brouillent.',
      ad: 'Les emplacements publicitaires ont des tailles fixes. Il faut respecter exactement les valeurs de la liste.',
      doc: "Photos dont la taille est fixée par la réglementation. Les millimètres priment ; les pixels sont l'équivalent à 300 ppp.",
    },
    {
      social: 'ऐसे आकार जिनसे पोस्ट करते समय कटाई न हो। वर्गाकार और लंबवत स्क्रीन ज़्यादा घेरते हैं।',
      profile: 'प्रोफ़ाइल फ़ोटो अक्सर गोल काटी जाती है — ज़रूरी हिस्सा किनारों से दूर रखें।',
      video: 'वीडियो के लगभग सभी प्रारूप 16:9 हैं; सिर्फ़ लंबवत वीडियो इसे 9:16 कर देता है।',
      print: 'प्रिंट 300 dpi मानकर चलता है। पिक्सेल को 300 से भाग दें तो इंच, फिर 25.4 से गुणा करें तो मिलीमीटर।',
      photo: 'फ़ोटो लैब जो आकार छापती है। अनुपात न मिले तो ऊपर-नीचे या दाएँ-बाएँ कट जाता है।',
      web: 'स्क्रीन भरने के लिए बने आकार। वॉलपेपर के लिए अपने डिवाइस का रिज़ॉल्यूशन लें।',
      icon: 'छोटा करने पर भी पहचान में आना चाहिए — पतली रेखाएँ धुँधली पड़ जाती हैं।',
      ad: 'विज्ञापन स्थानों के माप तय हैं। सूची के मान ठीक वैसे ही बनाएँ, वरना विज्ञापन नहीं चलेगा।',
      doc: 'ऐसे फ़ोटो जिनका माप नियम से तय है। मिलीमीटर पहले आते हैं; पिक्सेल 300 dpi के बराबर मान हैं।',
    },
  ),

  pixelLabel: T('픽셀 크기', 'Pixel size', 'Tamaño en píxeles', 'Tamanho em pixels', '画素サイズ', 'Pixelmaß', 'Taille en pixels', 'पिक्सेल आकार'),
  ratioLabel: T('화면비', 'Aspect ratio', 'Relación de aspecto', 'Proporção', 'アスペクト比', 'Seitenverhältnis', "Format d'image", 'आस्पेक्ट रेशियो'),
  megapixelLabel: T('픽셀 수', 'Total pixels', 'Píxeles totales', 'Total de pixels', '総画素数', 'Gesamtpixel', 'Nombre de pixels', 'कुल पिक्सेल'),
  printLabel: T('인쇄 크기 (300dpi)', 'Print size at 300 dpi', 'Tamaño impreso a 300 ppp', 'Tamanho impresso a 300 dpi', '印刷サイズ（300dpi）', 'Druckmaß bei 300 dpi', 'Taille imprimée à 300 ppp', '300 dpi पर प्रिंट आकार'),
  orientationLabel: T('방향', 'Orientation', 'Orientación', 'Orientação', '向き', 'Ausrichtung', 'Orientation', 'दिशा'),
  portrait: T('세로', 'Portrait', 'Vertical', 'Retrato', '縦長', 'Hochformat', 'Portrait', 'पोर्ट्रेट'),
  landscape: T('가로', 'Landscape', 'Horizontal', 'Paisagem', '横長', 'Querformat', 'Paysage', 'लैंडस्केप'),
  square: T('정사각', 'Square', 'Cuadrado', 'Quadrado', '正方形', 'Quadratisch', 'Carré', 'वर्गाकार'),
  rawLabel: T('무압축 크기', 'Uncompressed size', 'Tamaño sin comprimir', 'Tamanho sem compressão', '無圧縮サイズ', 'Unkomprimiert', 'Taille non compressée', 'बिना संपीड़न आकार'),
  jpegLabel: T('JPEG 어림', 'Rough JPEG size', 'Peso JPEG aproximado', 'Peso JPEG aproximado', 'JPEGの目安', 'JPEG etwa', 'JPEG approximatif', 'अनुमानित JPEG आकार'),
  copyLabel: T('크기 복사', 'Copy size', 'Copiar tamaño', 'Copiar tamanho', 'サイズをコピー', 'Maß kopieren', 'Copier la taille', 'आकार कॉपी करें'),
  copiedLabel: T('복사했습니다', 'Copied', 'Copiado', 'Copiado', 'コピーしました', 'Kopiert', 'Copié', 'कॉपी हो गया'),

  sameRatioTitle: T('화면비가 같은 크기', 'Same aspect ratio', 'Misma relación de aspecto', 'Mesma proporção', 'アスペクト比が同じ寸法', 'Gleiches Seitenverhältnis', 'Même format', 'वही आस्पेक्ट रेशियो'),
  sameRatioNote: T(
    '비가 같으면 잘라내지 않고 크기만 바꿔 쓸 수 있습니다.',
    'When the ratio matches you can just resize — no cropping needed.',
    'Si la proporción coincide, basta con redimensionar: no hace falta recortar.',
    'Se a proporção bate, basta redimensionar: não precisa cortar.',
    '比が同じなら切り取らずに大きさを変えるだけで使えます。',
    'Bei gleichem Verhältnis genügt Skalieren — kein Zuschnitt nötig.',
    'À format identique, il suffit de redimensionner : aucun rognage.',
    'अनुपात मिलता हो तो सिर्फ़ आकार बदलें — कटाई की ज़रूरत नहीं।',
  ),
  sameKindTitle: T('같은 갈래의 크기', 'Sizes in the same group', 'Tamaños del mismo grupo', 'Tamanhos do mesmo grupo', '同じ分類の寸法', 'Größen derselben Gruppe', 'Tailles du même groupe', 'उसी समूह के आकार'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें'),

  how: T(
    [
      '화면비가 맞지 않으면 올릴 때 잘립니다. 크기를 줄이거나 키우는 것보다 비를 맞추는 쪽이 먼저입니다.',
      '인쇄는 300dpi가 기본입니다. 픽셀 수를 300으로 나누면 인치, 거기에 25.4를 곱하면 밀리미터가 나옵니다.',
      '화면에서 보는 크기는 dpi와 상관없습니다. 웹에서는 픽셀만 맞으면 되고, dpi는 인쇄할 때만 뜻이 있습니다.',
      '작은 크기를 크게 늘리면 흐려집니다. 원본은 쓰려는 크기보다 크게 만들어 두고 줄이는 편이 안전합니다.',
    ],
    [
      'If the aspect ratio is wrong, the platform crops it. Matching the ratio matters more than matching the pixel count.',
      'Print assumes 300 dpi: divide the pixels by 300 for inches, then multiply by 25.4 for millimetres.',
      'On screen, dpi is irrelevant — only the pixel size counts. Dpi only means something when you print.',
      'Enlarging a small image makes it blurry. Start bigger than you need and scale down instead.',
    ],
    [
      'Si la proporción no cuadra, la plataforma recorta. Acertar con la relación importa más que con el número de píxeles.',
      'La impresión asume 300 ppp: divide los píxeles entre 300 para pulgadas y multiplica por 25,4 para milímetros.',
      'En pantalla, los ppp dan igual: solo cuenta el tamaño en píxeles. Los ppp solo significan algo al imprimir.',
      'Ampliar una imagen pequeña la vuelve borrosa. Es mejor partir de algo más grande y reducir.',
    ],
    [
      'Se a proporção não bate, a plataforma corta. Acertar a proporção importa mais que o número de pixels.',
      'A impressão assume 300 dpi: divida os pixels por 300 para polegadas e multiplique por 25,4 para milímetros.',
      'Na tela, o dpi não importa: conta só o tamanho em pixels. O dpi só faz sentido ao imprimir.',
      'Ampliar uma imagem pequena deixa tudo borrado. Melhor começar maior e reduzir.',
    ],
    [
      'アスペクト比が合わないと投稿時に切り取られます。画素数より先に比を合わせてください。',
      '印刷は300dpiが基本です。画素数を300で割ればインチ、25.4を掛ければミリメートルになります。',
      '画面上ではdpiは関係ありません。ウェブでは画素数だけが効き、dpiは印刷のときにだけ意味を持ちます。',
      '小さい画像を引き伸ばすとぼやけます。使う寸法より大きく作って縮めるほうが安全です。',
    ],
    [
      'Stimmt das Seitenverhältnis nicht, schneidet die Plattform zu. Das Verhältnis zählt mehr als die Pixelzahl.',
      'Druck rechnet mit 300 dpi: Pixel durch 300 ergibt Zoll, mal 25,4 ergibt Millimeter.',
      'Am Bildschirm spielt dpi keine Rolle — nur die Pixelgröße. Dpi zählt erst beim Drucken.',
      'Ein kleines Bild hochzuskalieren macht es unscharf. Lieber größer anlegen und verkleinern.',
    ],
    [
      "Si le format ne colle pas, la plateforme rogne. Respecter le rapport compte plus que le nombre de pixels.",
      "L'impression suppose 300 ppp : divisez les pixels par 300 pour des pouces, puis multipliez par 25,4 pour des millimètres.",
      "À l'écran, les ppp n'ont aucune importance : seule la taille en pixels compte. Les ppp ne servent qu'à l'impression.",
      'Agrandir une petite image la rend floue. Mieux vaut partir plus grand et réduire.',
    ],
    [
      'अनुपात ग़लत हो तो प्लेटफ़ॉर्म काट देता है। पिक्सेल गिनती से पहले अनुपात मिलाना ज़रूरी है।',
      'प्रिंट 300 dpi मानता है: पिक्सेल को 300 से भाग दें तो इंच, फिर 25.4 से गुणा करें तो मिलीमीटर।',
      'स्क्रीन पर dpi का कोई मतलब नहीं — सिर्फ़ पिक्सेल आकार गिना जाता है। dpi केवल छपाई में अर्थ रखता है।',
      'छोटी छवि को बड़ा करने पर वह धुँधली हो जाती है। ज़रूरत से बड़ा बनाकर घटाना बेहतर है।',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल'),

  hubMetaTitle: T(
    '이미지 크기 116가지 — 썸네일·인쇄·증명사진 규격',
    '116 image sizes — thumbnails, prints and ID photos',
    '116 tamaños de imagen — miniaturas, impresión y fotos de carné',
    '116 tamanhos de imagem — miniaturas, impressão e fotos de documento',
    '画像サイズ116種 — サムネイル・印刷・証明写真',
    '116 Bildgrößen — Vorschaubilder, Druck und Passfotos',
    "116 tailles d'image — miniatures, impression et photos d'identité",
    '116 छवि आकार — थंबनेल, प्रिंट और पहचान फ़ोटो',
  ),
  hubMetaDesc: T(
    '유튜브 썸네일 1280×720, 인스타 1080×1080, A4 300dpi 2480×3508처럼 자주 찾는 이미지 크기 116가지를 갈래별로 모았습니다. 화면비와 인쇄 크기, 용량 어림까지 함께 확인하세요.',
    '116 image sizes people look up — 1280×720 YouTube thumbnails, 1080×1080 Instagram posts, 2480×3508 A4 at 300 dpi — grouped by use, with aspect ratio, print size and rough file size.',
    '116 tamaños de imagen que se consultan a diario —1280×720 para YouTube, 1080×1080 para Instagram, 2480×3508 para A4 a 300 ppp— agrupados por uso, con proporción, medida impresa y peso aproximado.',
    '116 tamanhos de imagem que as pessoas procuram — 1280×720 do YouTube, 1080×1080 do Instagram, 2480×3508 do A4 a 300 dpi — agrupados por uso, com proporção, medida impressa e peso aproximado.',
    'YouTubeサムネイル1280×720、Instagram 1080×1080、A4 300dpiの2480×3508など、よく調べる画像サイズ116種を用途別にまとめました。アスペクト比や印刷サイズ、容量の目安も確認できます。',
    '116 nachgeschlagene Bildgrößen — 1280×720 für YouTube-Vorschaubilder, 1080×1080 für Instagram, 2480×3508 für A4 bei 300 dpi — nach Verwendung geordnet, mit Seitenverhältnis, Druckmaß und grober Dateigröße.',
    "116 tailles d'image souvent recherchées — 1280×720 pour YouTube, 1080×1080 pour Instagram, 2480×3508 pour un A4 à 300 ppp — classées par usage, avec format, taille imprimée et poids approximatif.",
    '116 छवि आकार जिन्हें लोग खोजते हैं — YouTube के 1280×720, Instagram के 1080×1080, 300 dpi पर A4 के 2480×3508 — उपयोग के अनुसार, आस्पेक्ट रेशियो, प्रिंट माप और अनुमानित फ़ाइल आकार के साथ।',
  ),

  metaTitle: T(
    (n: string, w: number, h: number) => `${n} 크기 — ${w}×${h} 픽셀`,
    (n: string, w: number, h: number) => `${n} size — ${w}×${h} pixels`,
    (n: string, w: number, h: number) => `Tamaño de ${n} — ${w}×${h} píxeles`,
    (n: string, w: number, h: number) => `Tamanho de ${n} — ${w}×${h} pixels`,
    (n: string, w: number, h: number) => `${n} のサイズ — ${w}×${h} ピクセル`,
    (n: string, w: number, h: number) => `${n} Größe — ${w}×${h} Pixel`,
    (n: string, w: number, h: number) => `Taille ${n} — ${w}×${h} pixels`,
    (n: string, w: number, h: number) => `${n} आकार — ${w}×${h} पिक्सेल`,
  ),

  metaDesc: T(
    (f: SizeFacts, kind: string) => `${f.name}은 ${f.w}×${f.h} 픽셀이고 화면비는 ${f.ratioLabel}입니다. 300dpi로 인쇄하면 ${f.mm[0]}×${f.mm[1]}mm이며 ${kind} 갈래에 들어갑니다.`,
    (f: SizeFacts, kind: string) => `${f.name} is ${f.w}×${f.h} pixels with a ${f.ratioLabel} aspect ratio. Printed at 300 dpi that is ${f.mm[0]}×${f.mm[1]} mm, and it belongs to the ${kind.toLowerCase()} group.`,
    (f: SizeFacts, kind: string) => `${f.name} mide ${f.w}×${f.h} píxeles con una relación de ${f.ratioLabel}. Impreso a 300 ppp son ${f.mm[0]}×${f.mm[1]} mm, y pertenece al grupo ${kind.toLowerCase()}.`,
    (f: SizeFacts, kind: string) => `${f.name} tem ${f.w}×${f.h} pixels e proporção ${f.ratioLabel}. Impresso a 300 dpi dá ${f.mm[0]}×${f.mm[1]} mm, e pertence ao grupo ${kind.toLowerCase()}.`,
    (f: SizeFacts, kind: string) => `${f.name} は ${f.w}×${f.h} ピクセルで、アスペクト比は ${f.ratioLabel} です。300dpiで印刷すると ${f.mm[0]}×${f.mm[1]}mm、${kind}の分類に入ります。`,
    (f: SizeFacts, kind: string) => `${f.name} misst ${f.w}×${f.h} Pixel bei einem Seitenverhältnis von ${f.ratioLabel}. Bei 300 dpi gedruckt sind das ${f.mm[0]}×${f.mm[1]} mm; es gehört zur Gruppe ${kind}.`,
    (f: SizeFacts, kind: string) => `${f.name} fait ${f.w}×${f.h} pixels, au format ${f.ratioLabel}. Imprimé à 300 ppp, cela donne ${f.mm[0]}×${f.mm[1]} mm ; il appartient au groupe ${kind.toLowerCase()}.`,
    (f: SizeFacts, kind: string) => `${f.name} ${f.w}×${f.h} पिक्सेल है और आस्पेक्ट रेशियो ${f.ratioLabel} है। 300 dpi पर छापने पर यह ${f.mm[0]}×${f.mm[1]} मिमी होता है और ${kind} समूह में आता है।`,
  ),

  hubFaq: T(
    [
      { q: '유튜브 썸네일 크기는 얼마인가요?', a: '1280×720 픽셀이 기준입니다. 화면비 16:9만 지키면 1920×1080으로 만들어도 같은 비율로 줄어들어 문제없습니다. 파일 크기는 2MB 아래로 맞추는 것이 안전합니다.' },
      { q: '인스타그램에 올리면 왜 잘리나요?', a: '올린 이미지의 화면비가 인스타그램이 받는 비(1:1, 4:5, 1.91:1)와 다르면 가운데를 기준으로 잘립니다. 크기보다 비를 먼저 맞추면 잘리지 않습니다.' },
      { q: 'A4 크기는 픽셀로 얼마인가요?', a: '300dpi로 인쇄하면 2480×3508 픽셀입니다. 150dpi면 절반인 1240×1754, 화면용 72dpi면 595×842입니다. A판 종이는 반으로 접어도 같은 비가 나오도록 1:√2로 정해져 있습니다.' },
      { q: 'dpi를 높이면 화질이 좋아지나요?', a: '화면에서는 아무 차이가 없습니다. dpi는 같은 픽셀을 종이에 얼마나 촘촘히 뿌릴지를 정할 뿐이라, 인쇄할 때만 뜻이 있습니다. 화면용 이미지는 픽셀 수만 맞추면 됩니다.' },
      { q: '증명사진 규격은 어떻게 되나요?', a: '여권 사진은 대체로 35×45mm이고 300dpi로 413×531 픽셀입니다. 미국 비자는 51×51mm(600×600 픽셀)로 정사각입니다. 나라마다 다르므로 제출처 기준을 먼저 확인하세요.' },
    ],
    [
      { q: 'What size is a YouTube thumbnail?', a: '1280×720 pixels is the reference. Any 16:9 image works — 1920×1080 scales down to the same shape. Keep the file under 2 MB to be safe.' },
      { q: 'Why does Instagram crop my image?', a: 'Because its aspect ratio differs from what Instagram accepts (1:1, 4:5, 1.91:1); anything else is cropped from the centre. Match the ratio first and the pixel size second.' },
      { q: 'How many pixels is A4?', a: '2480×3508 at 300 dpi. At 150 dpi it halves to 1240×1754, and at 72 dpi it is 595×842. A-series paper is 1:√2 so that folding it in half keeps the same proportions.' },
      { q: 'Does raising the dpi improve quality?', a: 'Not on screen. Dpi only decides how densely the same pixels are laid onto paper, so it matters when printing and nowhere else. For screens, only the pixel size counts.' },
      { q: 'What size is a passport photo?', a: 'Most passport photos are 35×45 mm, which is 413×531 pixels at 300 dpi. A US visa photo is square at 51×51 mm (600×600 pixels). Rules differ by country, so check the issuing office first.' },
    ],
    [
      { q: '¿Qué tamaño tiene una miniatura de YouTube?', a: 'La referencia es 1280×720 píxeles. Cualquier imagen 16:9 sirve: 1920×1080 se reduce a la misma forma. Conviene dejar el archivo por debajo de 2 MB.' },
      { q: '¿Por qué Instagram recorta mi imagen?', a: 'Porque su proporción no coincide con las que acepta (1:1, 4:5, 1,91:1); lo demás se recorta desde el centro. Primero la proporción, después los píxeles.' },
      { q: '¿Cuántos píxeles tiene un A4?', a: '2480×3508 a 300 ppp. A 150 ppp se queda en 1240×1754 y a 72 ppp en 595×842. El papel de la serie A es 1:√2 para que al doblarlo por la mitad mantenga la proporción.' },
      { q: '¿Subir los ppp mejora la calidad?', a: 'En pantalla, no. Los ppp solo deciden con qué densidad se depositan los mismos píxeles en el papel, así que solo importan al imprimir. Para pantalla basta con el tamaño en píxeles.' },
      { q: '¿Qué tamaño tiene una foto de pasaporte?', a: 'Lo habitual son 35×45 mm, es decir 413×531 píxeles a 300 ppp. La foto de visado estadounidense es cuadrada, 51×51 mm (600×600 píxeles). Las normas cambian según el país: consulta primero al organismo.' },
    ],
    [
      { q: 'Qual o tamanho de uma miniatura do YouTube?', a: 'A referência é 1280×720 pixels. Qualquer imagem 16:9 serve: 1920×1080 reduz para a mesma forma. Deixe o arquivo abaixo de 2 MB por segurança.' },
      { q: 'Por que o Instagram corta minha imagem?', a: 'Porque a proporção difere das aceitas (1:1, 4:5, 1,91:1); o resto é cortado a partir do centro. Acerte a proporção primeiro e os pixels depois.' },
      { q: 'Quantos pixels tem um A4?', a: '2480×3508 a 300 dpi. A 150 dpi cai para 1240×1754 e a 72 dpi para 595×842. O papel da série A é 1:√2 para que, dobrado ao meio, mantenha a proporção.' },
      { q: 'Aumentar o dpi melhora a qualidade?', a: 'Na tela, não. O dpi só decide com que densidade os mesmos pixels vão para o papel, então só importa na impressão. Para tela, conta apenas o tamanho em pixels.' },
      { q: 'Qual o tamanho de uma foto de passaporte?', a: 'Em geral 35×45 mm, ou 413×531 pixels a 300 dpi. A foto de visto dos EUA é quadrada, 51×51 mm (600×600 pixels). As regras mudam por país: confira antes com o órgão emissor.' },
    ],
    [
      { q: 'YouTubeのサムネイルのサイズは。', a: '基準は1280×720ピクセルです。16:9であれば1920×1080でも同じ形に縮むので問題ありません。ファイルは2MB以下に収めると安全です。' },
      { q: 'Instagramに上げると切れるのはなぜですか。', a: 'アスペクト比がInstagramの受ける比（1:1、4:5、1.91:1）と違うと、中央を基準に切り取られるためです。寸法より先に比を合わせれば切れません。' },
      { q: 'A4は何ピクセルですか。', a: '300dpiで2480×3508ピクセルです。150dpiなら半分の1240×1754、画面用の72dpiなら595×842です。A判は半分に折っても同じ比になるよう1:√2で決められています。' },
      { q: 'dpiを上げると画質は良くなりますか。', a: '画面上では何も変わりません。dpiは同じ画素を紙にどれだけ密に置くかを決めるだけで、印刷のときにしか意味がありません。画面用は画素数だけ合わせれば十分です。' },
      { q: '証明写真の規格は。', a: 'パスポート写真はおおむね35×45mmで、300dpiなら413×531ピクセルです。米国ビザは51×51mm（600×600ピクセル）の正方形です。国ごとに違うので提出先の基準を先に確かめてください。' },
    ],
    [
      { q: 'Wie groß ist ein YouTube-Vorschaubild?', a: 'Der Richtwert ist 1280×720 Pixel. Jedes 16:9-Bild passt — 1920×1080 wird auf dieselbe Form verkleinert. Die Datei sollte unter 2 MB bleiben.' },
      { q: 'Warum beschneidet Instagram mein Bild?', a: 'Weil das Seitenverhältnis nicht zu den erlaubten passt (1:1, 4:5, 1,91:1); alles andere wird aus der Mitte beschnitten. Erst das Verhältnis treffen, dann die Pixel.' },
      { q: 'Wie viele Pixel hat A4?', a: '2480×3508 bei 300 dpi. Bei 150 dpi sind es 1240×1754, bei 72 dpi 595×842. A-Formate sind 1:√2, damit sie beim Halbieren dasselbe Verhältnis behalten.' },
      { q: 'Verbessert mehr dpi die Qualität?', a: 'Am Bildschirm nicht. Dpi legt nur fest, wie dicht dieselben Pixel aufs Papier kommen — es zählt allein beim Druck. Für Bildschirme genügt die Pixelgröße.' },
      { q: 'Welche Maße hat ein Passfoto?', a: 'Meist 35×45 mm, bei 300 dpi also 413×531 Pixel. Das US-Visumfoto ist mit 51×51 mm (600×600 Pixel) quadratisch. Die Vorgaben unterscheiden sich je nach Land — prüfen Sie zuerst die Stelle, die es verlangt.' },
    ],
    [
      { q: 'Quelle taille pour une miniature YouTube ?', a: "La référence est 1280×720 pixels. Toute image en 16:9 convient : un 1920×1080 se réduit à la même forme. Gardez le fichier sous 2 Mo." },
      { q: 'Pourquoi Instagram rogne-t-il mon image ?', a: "Parce que son format diffère de ceux acceptés (1:1, 4:5, 1,91:1) ; le reste est rogné depuis le centre. Ajustez d'abord le rapport, ensuite les pixels." },
      { q: 'Combien de pixels fait un A4 ?', a: "2480×3508 à 300 ppp. À 150 ppp, 1240×1754 ; à 72 ppp, 595×842. Le papier de la série A est en 1:√2 afin de garder le même rapport une fois plié en deux." },
      { q: 'Augmenter les ppp améliore-t-il la qualité ?', a: "Pas à l'écran. Les ppp décident seulement de la densité des mêmes pixels sur le papier : cela ne compte qu'à l'impression. Pour l'écran, seule la taille en pixels importe." },
      { q: "Quelle taille pour une photo d'identité ?", a: "Le plus souvent 35×45 mm, soit 413×531 pixels à 300 ppp. La photo de visa américain est carrée, 51×51 mm (600×600 pixels). Les règles varient selon les pays : vérifiez auprès de l'organisme concerné." },
    ],
    [
      { q: 'YouTube थंबनेल का आकार क्या है?', a: '1280×720 पिक्सेल मानक है। कोई भी 16:9 छवि चलेगी — 1920×1080 भी उसी आकार में घट जाती है। फ़ाइल 2 MB से कम रखें तो सुरक्षित है।' },
      { q: 'Instagram मेरी छवि क्यों काट देता है?', a: 'क्योंकि उसका अनुपात Instagram के स्वीकार्य अनुपातों (1:1, 4:5, 1.91:1) से अलग है; बाक़ी सब बीच से काट दिया जाता है। पहले अनुपात मिलाएँ, फिर पिक्सेल।' },
      { q: 'A4 कितने पिक्सेल का होता है?', a: '300 dpi पर 2480×3508। 150 dpi पर आधा यानी 1240×1754, और 72 dpi पर 595×842। A श्रेणी का काग़ज़ 1:√2 है ताकि आधा मोड़ने पर भी वही अनुपात रहे।' },
      { q: 'क्या dpi बढ़ाने से गुणवत्ता सुधरती है?', a: 'स्क्रीन पर नहीं। dpi केवल तय करता है कि वही पिक्सेल काग़ज़ पर कितने सघन रखे जाएँ, इसलिए यह सिर्फ़ छपाई में मायने रखता है। स्क्रीन के लिए पिक्सेल आकार ही काफ़ी है।' },
      { q: 'पासपोर्ट फ़ोटो का आकार क्या है?', a: 'आमतौर पर 35×45 मिमी, यानी 300 dpi पर 413×531 पिक्सेल। अमेरिकी वीज़ा फ़ोटो वर्गाकार 51×51 मिमी (600×600 पिक्सेल) है। नियम देश के अनुसार बदलते हैं, इसलिए पहले संबंधित कार्यालय की शर्त देखें।' },
    ],
  ),

  sizeFaq: T(
    (f: SizeFacts, kind: string) => [
      { q: `${f.name} 크기는 얼마인가요?`, a: `${f.w}×${f.h} 픽셀입니다. 화면비는 ${f.ratioLabel}이고 모두 ${f.pixels.toLocaleString('ko')}개, 약 ${f.megapixels}메가픽셀입니다.` },
      { q: `${f.name}을 인쇄하면 얼마나 되나요?`, a: `300dpi로 뽑으면 ${f.mm[0]}×${f.mm[1]}mm입니다. 픽셀을 300으로 나눠 인치를 구하고 25.4를 곱한 값입니다.` },
      { q: `${f.name} 파일 용량은 어느 정도인가요?`, a: `압축하지 않으면 약 ${f.rawMb}MB이고, JPEG로 저장하면 대개 ${f.jpegKb}KB 안팎입니다. 사진이냐 단색 그림이냐에 따라 몇 배까지 달라집니다.` },
      { q: `${f.name}은 어떤 갈래인가요?`, a: `${kind} 갈래이고 ${f.square ? '정사각' : f.portrait ? '세로가 긴' : '가로가 긴'} 크기입니다. 같은 비를 쓰는 다른 크기도 이 화면 아래에 있습니다.` },
    ],
    (f: SizeFacts, kind: string) => [
      { q: `What size is ${f.name}?`, a: `${f.w}×${f.h} pixels, a ${f.ratioLabel} aspect ratio — ${f.pixels.toLocaleString('en')} pixels in all, about ${f.megapixels} megapixels.` },
      { q: `How big is ${f.name} when printed?`, a: `At 300 dpi it comes out ${f.mm[0]}×${f.mm[1]} mm — the pixels divided by 300 for inches, then multiplied by 25.4.` },
      { q: `How large is a ${f.name} file?`, a: `Uncompressed, roughly ${f.rawMb} MB; saved as JPEG, usually around ${f.jpegKb} KB. A photograph and a flat graphic can differ several times over.` },
      { q: `What group does ${f.name} belong to?`, a: `The ${kind.toLowerCase()} group, and it is ${f.square ? 'square' : f.portrait ? 'taller than it is wide' : 'wider than it is tall'}. Other sizes with the same ratio are listed below.` },
    ],
    (f: SizeFacts, kind: string) => [
      { q: `¿Qué tamaño tiene ${f.name}?`, a: `${f.w}×${f.h} píxeles, con relación ${f.ratioLabel}: ${f.pixels.toLocaleString('es')} píxeles en total, unos ${f.megapixels} megapíxeles.` },
      { q: `¿Cuánto mide ${f.name} impreso?`, a: `A 300 ppp sale ${f.mm[0]}×${f.mm[1]} mm: los píxeles entre 300 para pulgadas y por 25,4 para milímetros.` },
      { q: `¿Cuánto pesa un archivo de ${f.name}?`, a: `Sin comprimir, unos ${f.rawMb} MB; en JPEG, alrededor de ${f.jpegKb} KB. Una fotografía y un gráfico plano pueden diferir varias veces.` },
      { q: `¿A qué grupo pertenece ${f.name}?`, a: `Al grupo ${kind.toLowerCase()}, y es ${f.square ? 'cuadrado' : f.portrait ? 'más alto que ancho' : 'más ancho que alto'}. Abajo aparecen otros tamaños con la misma proporción.` },
    ],
    (f: SizeFacts, kind: string) => [
      { q: `Qual é o tamanho de ${f.name}?`, a: `${f.w}×${f.h} pixels, proporção ${f.ratioLabel} — ${f.pixels.toLocaleString('pt-BR')} pixels no total, cerca de ${f.megapixels} megapixels.` },
      { q: `Quanto mede ${f.name} impresso?`, a: `A 300 dpi dá ${f.mm[0]}×${f.mm[1]} mm: os pixels divididos por 300 para polegadas e multiplicados por 25,4.` },
      { q: `Quanto pesa um arquivo de ${f.name}?`, a: `Sem compressão, cerca de ${f.rawMb} MB; em JPEG, em torno de ${f.jpegKb} KB. Uma fotografia e um gráfico chapado podem diferir várias vezes.` },
      { q: `A que grupo pertence ${f.name}?`, a: `Ao grupo ${kind.toLowerCase()}, e é ${f.square ? 'quadrado' : f.portrait ? 'mais alto que largo' : 'mais largo que alto'}. Abaixo estão outros tamanhos com a mesma proporção.` },
    ],
    (f: SizeFacts, kind: string) => [
      { q: `${f.name} のサイズは。`, a: `${f.w}×${f.h} ピクセルで、アスペクト比は ${f.ratioLabel} です。合計 ${f.pixels.toLocaleString('ja')} 画素、約 ${f.megapixels} メガピクセルになります。` },
      { q: `${f.name} を印刷するとどれくらいですか。`, a: `300dpiで出すと ${f.mm[0]}×${f.mm[1]}mm です。画素数を300で割ってインチにし、25.4を掛けた値です。` },
      { q: `${f.name} のファイル容量はどれくらいですか。`, a: `無圧縮でおよそ ${f.rawMb}MB、JPEGで保存するとたいてい ${f.jpegKb}KB 前後です。写真か単色の図かで数倍変わります。` },
      { q: `${f.name} はどの分類ですか。`, a: `${kind}の分類で、${f.square ? '正方形' : f.portrait ? '縦長' : '横長'}の寸法です。同じ比のほかの寸法もこのページの下にあります。` },
    ],
    (f: SizeFacts, kind: string) => [
      { q: `Wie groß ist ${f.name}?`, a: `${f.w}×${f.h} Pixel bei einem Seitenverhältnis von ${f.ratioLabel} — insgesamt ${f.pixels.toLocaleString('de')} Pixel, rund ${f.megapixels} Megapixel.` },
      { q: `Wie groß ist ${f.name} im Druck?`, a: `Bei 300 dpi ergibt das ${f.mm[0]}×${f.mm[1]} mm: Pixel durch 300 für Zoll, dann mal 25,4.` },
      { q: `Wie groß wird eine ${f.name}-Datei?`, a: `Unkomprimiert etwa ${f.rawMb} MB; als JPEG meist um ${f.jpegKb} KB. Foto und flache Grafik können sich um ein Vielfaches unterscheiden.` },
      { q: `Zu welcher Gruppe gehört ${f.name}?`, a: `Zur Gruppe ${kind}; das Format ist ${f.square ? 'quadratisch' : f.portrait ? 'hochkant' : 'quer'}. Weitere Größen mit gleichem Verhältnis stehen weiter unten.` },
    ],
    (f: SizeFacts, kind: string) => [
      { q: `Quelle est la taille de ${f.name} ?`, a: `${f.w}×${f.h} pixels, au format ${f.ratioLabel} — ${f.pixels.toLocaleString('fr')} pixels au total, environ ${f.megapixels} mégapixels.` },
      { q: `Quelle taille fait ${f.name} à l'impression ?`, a: `À 300 ppp, cela donne ${f.mm[0]}×${f.mm[1]} mm : les pixels divisés par 300 pour des pouces, puis multipliés par 25,4.` },
      { q: `Quel est le poids d'un fichier ${f.name} ?`, a: `Sans compression, environ ${f.rawMb} Mo ; en JPEG, plutôt ${f.jpegKb} Ko. Une photo et un aplat graphique peuvent varier du simple au multiple.` },
      { q: `À quel groupe appartient ${f.name} ?`, a: `Au groupe ${kind.toLowerCase()} ; le format est ${f.square ? 'carré' : f.portrait ? 'plus haut que large' : 'plus large que haut'}. D'autres tailles au même format figurent plus bas.` },
    ],
    (f: SizeFacts, kind: string) => [
      { q: `${f.name} का आकार क्या है?`, a: `${f.w}×${f.h} पिक्सेल, आस्पेक्ट रेशियो ${f.ratioLabel} — कुल ${f.pixels.toLocaleString('hi')} पिक्सेल, लगभग ${f.megapixels} मेगापिक्सेल।` },
      { q: `${f.name} छापने पर कितना बड़ा होता है?`, a: `300 dpi पर यह ${f.mm[0]}×${f.mm[1]} मिमी बनता है — पिक्सेल को 300 से भाग देकर इंच, फिर 25.4 से गुणा।` },
      { q: `${f.name} फ़ाइल कितनी बड़ी होती है?`, a: `बिना संपीड़न लगभग ${f.rawMb} MB; JPEG में सहेजने पर आमतौर पर ${f.jpegKb} KB के आसपास। तस्वीर और सपाट ग्राफ़िक में कई गुना अंतर हो सकता है।` },
      { q: `${f.name} किस समूह में आता है?`, a: `${kind} समूह में, और यह ${f.square ? 'वर्गाकार' : f.portrait ? 'चौड़ाई से ऊँचा' : 'ऊँचाई से चौड़ा'} है। उसी अनुपात के अन्य आकार नीचे दिए हैं।` },
    ],
  ),
};

/** 항목별 여덟 언어 표를 언어별 한 벌로 뒤집는다 */
export const IMG_SIZE_UI: L8<ImgSizeUI> = Object.fromEntries(
  LANG8_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L8<unknown>)[lang as Lang8]])),
  ]),
) as unknown as L8<ImgSizeUI>;
