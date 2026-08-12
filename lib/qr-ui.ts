/**
 * QR 코드 생성기 화면 문구 — 열 언어.
 *
 * 계산은 lib/qr.ts, 문자열 꼴은 lib/qr-format.ts에 있다. 여기에는 라벨과
 * 안내 문장만 둔다 (lib/text-more-ui.ts와 같은 갈라놓기다).
 *
 * ── 이 도구가 열 언어에 다 나가는 이유 ──────────────────────
 * 옮길 것이 화면 문구뿐이다. 인코딩은 만국 공통이라 언어마다 다르게 나올 것이
 * 하나도 없다 — 한글 자판에 묶인 한영타 변환·초성 변환과 정반대다.
 *
 * 등급 이름(L·M·Q·H)은 규격이 정한 글자라 어느 언어에서도 그대로 쓴다.
 * 옮기면 다른 도구·설명서와 말이 안 맞는다.
 */
import type { TextLang } from './text-intl.ts';
import type { Mode } from './qr.ts';
import type { QrFormat } from './qr-format.ts';

export interface QrUi {
  /* 꼴 고르기 */
  formatTitle: string;
  formats: Record<QrFormat, string>;

  /* 입력 — 고른 꼴에 쓰이는 칸만 보인다 */
  textLabel: string;
  textPlaceholder: string;
  urlLabel: string;
  ssid: string;
  password: string;
  authTitle: string;
  /** WPA/WPA2 · WEP · 비밀번호 없음 */
  auths: [string, string, string];
  hidden: string;
  lastName: string;
  firstName: string;
  org: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  subject: string;
  body: string;
  message: string;
  lat: string;
  lon: string;

  /* 설정 */
  eclTitle: string;
  eclHint: string;
  /** 등급 넷의 한 줄 설명 — 이름은 L·M·Q·H 그대로 쓴다 */
  ecls: [string, string, string, string];
  sizeTitle: string;
  marginTitle: string;
  colorTitle: string;
  darkColor: string;
  lightColor: string;

  /* 결과 */
  empty: string;
  /** 담을 수 없을 때 — 자르지 않고 이렇게 말한다 */
  tooLong: (used: number, limit: number) => string;
  lowContrast: string;
  version: string;
  mode: string;
  mask: string;
  size: string;
  modes: Record<Mode, string>;
  payloadTitle: string;
  savePng: string;
  saveSvg: string;
  note: string;
}

export const QR_UI: Record<TextLang, QrUi> = {
  ko: {
    formatTitle: '무엇을 담을까요',
    formats: {
      text: '글', url: '주소', wifi: '와이파이', vcard: '연락처',
      email: '메일', phone: '전화', sms: '문자', geo: '위치',
    },
    textLabel: 'QR로 만들 글',
    textPlaceholder: '아무 글이나 넣으면 됩니다. 한글도 그대로 들어갑니다.',
    urlLabel: '주소',
    ssid: '네트워크 이름 (SSID)',
    password: '비밀번호',
    authTitle: '보안 방식',
    auths: ['WPA / WPA2 / WPA3', 'WEP', '비밀번호 없음'],
    hidden: '이름을 숨긴 네트워크',
    lastName: '성',
    firstName: '이름',
    org: '회사·소속',
    jobTitle: '직함',
    phone: '전화번호',
    email: '이메일',
    website: '홈페이지',
    address: '주소',
    subject: '제목',
    body: '내용',
    message: '보낼 내용',
    lat: '위도',
    lon: '경도',
    eclTitle: '오류정정 등급',
    eclHint: '등급을 올리면 찢기거나 가려져도 읽히지만, 같은 글이 더 큰 QR이 됩니다.',
    ecls: ['가장 작게 (약 7%까지 복구)', '보통 (약 15%)', '넉넉하게 (약 25%)', '가장 튼튼하게 (약 30%)'],
    sizeTitle: '칸 크기',
    marginTitle: '여백',
    colorTitle: '색',
    darkColor: '어두운 칸',
    lightColor: '바탕',
    empty: '위에 내용을 넣으면 QR이 나옵니다',
    tooLong: (used, limit) =>
      `너무 깁니다 — 이 등급에서는 ${limit}까지인데 ${used}입니다. 내용을 줄이거나 오류정정 등급을 낮추세요. 잘라서 만들지는 않습니다(잘린 QR은 읽히지 않습니다).`,
    lowContrast: '두 색이 너무 비슷해 스캐너가 못 읽을 수 있습니다. 어두운 쪽을 더 어둡게 해 보세요.',
    version: '버전',
    mode: '모드',
    mask: '마스크',
    size: '칸 수',
    modes: { numeric: '숫자', alnum: '영숫자', byte: '바이트(UTF-8)' },
    payloadTitle: '실제로 담긴 글',
    savePng: 'PNG로 저장',
    saveSvg: 'SVG로 저장',
    note: '인쇄해서 쓸 것이라면 SVG가 낫습니다 — 크게 늘려도 칸 경계가 흐려지지 않습니다.',
  },

  en: {
    formatTitle: 'What goes in the code',
    formats: {
      text: 'Text', url: 'Link', wifi: 'Wi-Fi', vcard: 'Contact',
      email: 'Email', phone: 'Phone', sms: 'SMS', geo: 'Location',
    },
    textLabel: 'Text to encode',
    textPlaceholder: 'Anything you like — accents and non-Latin scripts go in as they are.',
    urlLabel: 'Link',
    ssid: 'Network name (SSID)',
    password: 'Password',
    authTitle: 'Security',
    auths: ['WPA / WPA2 / WPA3', 'WEP', 'No password'],
    hidden: 'Hidden network',
    lastName: 'Last name',
    firstName: 'First name',
    org: 'Company',
    jobTitle: 'Job title',
    phone: 'Phone',
    email: 'Email',
    website: 'Website',
    address: 'Address',
    subject: 'Subject',
    body: 'Message',
    message: 'Message',
    lat: 'Latitude',
    lon: 'Longitude',
    eclTitle: 'Error correction',
    eclHint: 'A higher level survives more tearing and smudging, but the same text needs a bigger code.',
    ecls: ['Smallest code (recovers about 7%)', 'Normal (about 15%)', 'Generous (about 25%)', 'Toughest (about 30%)'],
    sizeTitle: 'Module size',
    marginTitle: 'Quiet zone',
    colorTitle: 'Colours',
    darkColor: 'Dark modules',
    lightColor: 'Background',
    empty: 'Fill something in above and the code appears here',
    tooLong: (used, limit) =>
      `Too long — this level holds ${limit} and you have ${used}. Shorten the content or drop the error correction level. It is never truncated to fit, because a truncated code does not scan.`,
    lowContrast: 'These two colours are too close for a scanner to separate. Make the dark one darker.',
    version: 'Version',
    mode: 'Mode',
    mask: 'Mask',
    size: 'Modules',
    modes: { numeric: 'Numeric', alnum: 'Alphanumeric', byte: 'Byte (UTF-8)' },
    payloadTitle: 'What is actually encoded',
    savePng: 'Save as PNG',
    saveSvg: 'Save as SVG',
    note: 'Use the SVG if you are going to print it — it stays sharp at any size, and blurred module edges are what stops a code scanning.',
  },

  es: {
    formatTitle: '¿Qué va en el código?',
    formats: {
      text: 'Texto', url: 'Enlace', wifi: 'Wi-Fi', vcard: 'Contacto',
      email: 'Correo', phone: 'Teléfono', sms: 'SMS', geo: 'Ubicación',
    },
    textLabel: 'Texto a codificar',
    textPlaceholder: 'Lo que quieras: los acentos y los alfabetos no latinos entran tal cual.',
    urlLabel: 'Enlace',
    ssid: 'Nombre de la red (SSID)',
    password: 'Contraseña',
    authTitle: 'Seguridad',
    auths: ['WPA / WPA2 / WPA3', 'WEP', 'Sin contraseña'],
    hidden: 'Red oculta',
    lastName: 'Apellidos',
    firstName: 'Nombre',
    org: 'Empresa',
    jobTitle: 'Cargo',
    phone: 'Teléfono',
    email: 'Correo',
    website: 'Web',
    address: 'Dirección',
    subject: 'Asunto',
    body: 'Mensaje',
    message: 'Mensaje',
    lat: 'Latitud',
    lon: 'Longitud',
    eclTitle: 'Corrección de errores',
    eclHint: 'Un nivel más alto aguanta más roces y manchas, pero el mismo texto necesita un código más grande.',
    ecls: ['Código más pequeño (recupera un 7%)', 'Normal (un 15%)', 'Amplio (un 25%)', 'El más resistente (un 30%)'],
    sizeTitle: 'Tamaño del módulo',
    marginTitle: 'Margen',
    colorTitle: 'Colores',
    darkColor: 'Módulos oscuros',
    lightColor: 'Fondo',
    empty: 'Rellena algo arriba y el código aparece aquí',
    tooLong: (used, limit) =>
      `Demasiado largo: en este nivel caben ${limit} y tienes ${used}. Acorta el contenido o baja el nivel de corrección. No se recorta para que quepa, porque un código recortado no se lee.`,
    lowContrast: 'Los dos colores están demasiado cerca para que un lector los distinga. Oscurece más el oscuro.',
    version: 'Versión',
    mode: 'Modo',
    mask: 'Máscara',
    size: 'Módulos',
    modes: { numeric: 'Numérico', alnum: 'Alfanumérico', byte: 'Byte (UTF-8)' },
    payloadTitle: 'Lo que se codifica de verdad',
    savePng: 'Guardar como PNG',
    saveSvg: 'Guardar como SVG',
    note: 'Si vas a imprimirlo, usa el SVG: se mantiene nítido a cualquier tamaño, y los bordes borrosos son justo lo que impide leer un código.',
  },

  'pt-br': {
    formatTitle: 'O que vai no código',
    formats: {
      text: 'Texto', url: 'Link', wifi: 'Wi-Fi', vcard: 'Contato',
      email: 'E-mail', phone: 'Telefone', sms: 'SMS', geo: 'Local',
    },
    textLabel: 'Texto para codificar',
    textPlaceholder: 'O que você quiser — acentos e alfabetos não latinos entram do jeito que estão.',
    urlLabel: 'Link',
    ssid: 'Nome da rede (SSID)',
    password: 'Senha',
    authTitle: 'Segurança',
    auths: ['WPA / WPA2 / WPA3', 'WEP', 'Sem senha'],
    hidden: 'Rede oculta',
    lastName: 'Sobrenome',
    firstName: 'Nome',
    org: 'Empresa',
    jobTitle: 'Cargo',
    phone: 'Telefone',
    email: 'E-mail',
    website: 'Site',
    address: 'Endereço',
    subject: 'Assunto',
    body: 'Mensagem',
    message: 'Mensagem',
    lat: 'Latitude',
    lon: 'Longitude',
    eclTitle: 'Correção de erros',
    eclHint: 'Um nível mais alto aguenta mais rasgos e borrões, mas o mesmo texto precisa de um código maior.',
    ecls: ['Código menor (recupera cerca de 7%)', 'Normal (cerca de 15%)', 'Folgado (cerca de 25%)', 'Mais resistente (cerca de 30%)'],
    sizeTitle: 'Tamanho do módulo',
    marginTitle: 'Margem',
    colorTitle: 'Cores',
    darkColor: 'Módulos escuros',
    lightColor: 'Fundo',
    empty: 'Preencha algo acima e o código aparece aqui',
    tooLong: (used, limit) =>
      `Longo demais — neste nível cabem ${limit} e você tem ${used}. Encurte o conteúdo ou baixe o nível de correção. Nada é cortado para caber, porque um código cortado não é lido.`,
    lowContrast: 'As duas cores estão perto demais para um leitor separar. Deixe a escura mais escura.',
    version: 'Versão',
    mode: 'Modo',
    mask: 'Máscara',
    size: 'Módulos',
    modes: { numeric: 'Numérico', alnum: 'Alfanumérico', byte: 'Byte (UTF-8)' },
    payloadTitle: 'O que é codificado de fato',
    savePng: 'Salvar como PNG',
    saveSvg: 'Salvar como SVG',
    note: 'Se for imprimir, use o SVG: ele fica nítido em qualquer tamanho, e borda de módulo borrada é justamente o que impede a leitura.',
  },

  ja: {
    formatTitle: '何を入れますか',
    formats: {
      text: '文字', url: 'リンク', wifi: 'Wi-Fi', vcard: '連絡先',
      email: 'メール', phone: '電話', sms: 'SMS', geo: '場所',
    },
    textLabel: 'QRにする文字',
    textPlaceholder: '何でも入れられます。日本語もそのまま入ります。',
    urlLabel: 'リンク',
    ssid: 'ネットワーク名（SSID）',
    password: 'パスワード',
    authTitle: 'セキュリティ',
    auths: ['WPA / WPA2 / WPA3', 'WEP', 'パスワードなし'],
    hidden: 'ステルス（非公開）ネットワーク',
    lastName: '姓',
    firstName: '名',
    org: '会社・所属',
    jobTitle: '役職',
    phone: '電話番号',
    email: 'メール',
    website: 'ウェブサイト',
    address: '住所',
    subject: '件名',
    body: '本文',
    message: '送る内容',
    lat: '緯度',
    lon: '経度',
    eclTitle: '誤り訂正レベル',
    eclHint: 'レベルを上げると破れや汚れに強くなりますが、同じ文字でもQRが大きくなります。',
    ecls: ['いちばん小さい（約7%まで復元）', 'ふつう（約15%）', '余裕あり（約25%）', 'いちばん丈夫（約30%）'],
    sizeTitle: 'セルの大きさ',
    marginTitle: '余白',
    colorTitle: '色',
    darkColor: '暗いセル',
    lightColor: '背景',
    empty: '上に入力するとQRが出ます',
    tooLong: (used, limit) =>
      `長すぎます — このレベルでは${limit}までですが${used}あります。内容を短くするか、誤り訂正レベルを下げてください。切り詰めて作ることはしません（切れたQRは読めません）。`,
    lowContrast: '二つの色が近すぎて読み取れないことがあります。暗い方をもっと暗くしてください。',
    version: 'バージョン',
    mode: 'モード',
    mask: 'マスク',
    size: 'セル数',
    modes: { numeric: '数字', alnum: '英数字', byte: 'バイト（UTF-8）' },
    payloadTitle: '実際に入っている文字',
    savePng: 'PNGで保存',
    saveSvg: 'SVGで保存',
    note: '印刷するならSVGが向いています — どれだけ大きくしてもセルの境目がぼやけません。',
  },

  de: {
    formatTitle: 'Was in den Code soll',
    formats: {
      text: 'Text', url: 'Link', wifi: 'WLAN', vcard: 'Kontakt',
      email: 'E-Mail', phone: 'Telefon', sms: 'SMS', geo: 'Ort',
    },
    textLabel: 'Text für den Code',
    textPlaceholder: 'Was du willst — Umlaute und andere Schriften kommen unverändert hinein.',
    urlLabel: 'Link',
    ssid: 'Netzwerkname (SSID)',
    password: 'Passwort',
    authTitle: 'Verschlüsselung',
    auths: ['WPA / WPA2 / WPA3', 'WEP', 'Ohne Passwort'],
    hidden: 'Verstecktes Netzwerk',
    lastName: 'Nachname',
    firstName: 'Vorname',
    org: 'Firma',
    jobTitle: 'Position',
    phone: 'Telefon',
    email: 'E-Mail',
    website: 'Webseite',
    address: 'Adresse',
    subject: 'Betreff',
    body: 'Nachricht',
    message: 'Nachricht',
    lat: 'Breitengrad',
    lon: 'Längengrad',
    eclTitle: 'Fehlerkorrektur',
    eclHint: 'Eine höhere Stufe übersteht mehr Risse und Flecken, aber derselbe Text braucht dann einen größeren Code.',
    ecls: ['Kleinster Code (rund 7% wiederherstellbar)', 'Normal (rund 15%)', 'Großzügig (rund 25%)', 'Robustesten (rund 30%)'],
    sizeTitle: 'Modulgröße',
    marginTitle: 'Rand',
    colorTitle: 'Farben',
    darkColor: 'Dunkle Module',
    lightColor: 'Hintergrund',
    empty: 'Trag oben etwas ein, dann erscheint der Code hier',
    tooLong: (used, limit) =>
      `Zu lang — auf dieser Stufe passen ${limit}, du hast ${used}. Kürze den Inhalt oder senke die Fehlerkorrektur. Abgeschnitten wird nichts, denn ein abgeschnittener Code lässt sich nicht scannen.`,
    lowContrast: 'Die beiden Farben liegen zu dicht beieinander, ein Scanner kann sie nicht trennen. Mach die dunkle dunkler.',
    version: 'Version',
    mode: 'Modus',
    mask: 'Maske',
    size: 'Module',
    modes: { numeric: 'Numerisch', alnum: 'Alphanumerisch', byte: 'Byte (UTF-8)' },
    payloadTitle: 'Was tatsächlich codiert wird',
    savePng: 'Als PNG speichern',
    saveSvg: 'Als SVG speichern',
    note: 'Zum Drucken nimm das SVG — es bleibt in jeder Größe scharf, und verwaschene Modulkanten sind genau das, woran ein Scan scheitert.',
  },

  fr: {
    formatTitle: 'Que met-on dans le code',
    formats: {
      text: 'Texte', url: 'Lien', wifi: 'Wi-Fi', vcard: 'Contact',
      email: 'E-mail', phone: 'Téléphone', sms: 'SMS', geo: 'Lieu',
    },
    textLabel: 'Texte à encoder',
    textPlaceholder: 'Ce que tu veux — les accents et les autres écritures passent tels quels.',
    urlLabel: 'Lien',
    ssid: 'Nom du réseau (SSID)',
    password: 'Mot de passe',
    authTitle: 'Sécurité',
    auths: ['WPA / WPA2 / WPA3', 'WEP', 'Sans mot de passe'],
    hidden: 'Réseau masqué',
    lastName: 'Nom',
    firstName: 'Prénom',
    org: 'Société',
    jobTitle: 'Fonction',
    phone: 'Téléphone',
    email: 'E-mail',
    website: 'Site web',
    address: 'Adresse',
    subject: 'Objet',
    body: 'Message',
    message: 'Message',
    lat: 'Latitude',
    lon: 'Longitude',
    eclTitle: 'Correction d’erreurs',
    eclHint: 'Un niveau plus haut résiste aux déchirures et aux taches, mais le même texte demande un code plus grand.',
    ecls: ['Code le plus petit (environ 7% récupérés)', 'Normal (environ 15%)', 'Large (environ 25%)', 'Le plus solide (environ 30%)'],
    sizeTitle: 'Taille du module',
    marginTitle: 'Marge',
    colorTitle: 'Couleurs',
    darkColor: 'Modules sombres',
    lightColor: 'Fond',
    empty: 'Remplis quelque chose au-dessus et le code apparaît ici',
    tooLong: (used, limit) =>
      `Trop long — ce niveau accepte ${limit} et tu en as ${used}. Raccourcis le contenu ou baisse le niveau de correction. Rien n’est tronqué pour rentrer : un code tronqué ne se lit pas.`,
    lowContrast: 'Les deux couleurs sont trop proches pour qu’un lecteur les sépare. Assombris la plus foncée.',
    version: 'Version',
    mode: 'Mode',
    mask: 'Masque',
    size: 'Modules',
    modes: { numeric: 'Numérique', alnum: 'Alphanumérique', byte: 'Octet (UTF-8)' },
    payloadTitle: 'Ce qui est réellement encodé',
    savePng: 'Enregistrer en PNG',
    saveSvg: 'Enregistrer en SVG',
    note: 'Pour imprimer, prends le SVG : il reste net à toute taille, et ce sont justement les bords flous qui empêchent la lecture.',
  },

  hi: {
    formatTitle: 'कोड में क्या डालना है',
    formats: {
      text: 'पाठ', url: 'लिंक', wifi: 'वाई-फ़ाई', vcard: 'संपर्क',
      email: 'ईमेल', phone: 'फ़ोन', sms: 'एसएमएस', geo: 'जगह',
    },
    textLabel: 'कोड में डालने का पाठ',
    textPlaceholder: 'जो चाहें — देवनागरी और कोई भी लिपि जैसी है वैसी ही जाती है।',
    urlLabel: 'लिंक',
    ssid: 'नेटवर्क का नाम (SSID)',
    password: 'पासवर्ड',
    authTitle: 'सुरक्षा',
    auths: ['WPA / WPA2 / WPA3', 'WEP', 'पासवर्ड नहीं'],
    hidden: 'छिपा हुआ नेटवर्क',
    lastName: 'उपनाम',
    firstName: 'नाम',
    org: 'कंपनी',
    jobTitle: 'पद',
    phone: 'फ़ोन',
    email: 'ईमेल',
    website: 'वेबसाइट',
    address: 'पता',
    subject: 'विषय',
    body: 'संदेश',
    message: 'संदेश',
    lat: 'अक्षांश',
    lon: 'देशांतर',
    eclTitle: 'त्रुटि सुधार स्तर',
    eclHint: 'ऊँचा स्तर फटने और दाग सहता है, पर उतने ही पाठ के लिए कोड बड़ा हो जाता है।',
    ecls: ['सबसे छोटा कोड (लगभग 7% तक भरपाई)', 'सामान्य (लगभग 15%)', 'खुला हाथ (लगभग 25%)', 'सबसे मज़बूत (लगभग 30%)'],
    sizeTitle: 'खाने का आकार',
    marginTitle: 'हाशिया',
    colorTitle: 'रंग',
    darkColor: 'गहरे खाने',
    lightColor: 'पृष्ठभूमि',
    empty: 'ऊपर कुछ भरें और कोड यहाँ आ जाएगा',
    tooLong: (used, limit) =>
      `बहुत लंबा है — इस स्तर पर ${limit} तक आता है और आपके पास ${used} है। सामग्री छोटी करें या त्रुटि सुधार स्तर घटाएँ। फ़िट करने के लिए काटा नहीं जाता, क्योंकि कटा कोड स्कैन नहीं होता।`,
    lowContrast: 'दोनों रंग इतने पास हैं कि स्कैनर अलग नहीं कर पाएगा। गहरे रंग को और गहरा करें।',
    version: 'संस्करण',
    mode: 'मोड',
    mask: 'मास्क',
    size: 'खाने',
    modes: { numeric: 'अंक', alnum: 'अक्षर-अंक', byte: 'बाइट (UTF-8)' },
    payloadTitle: 'असल में जो कोड हुआ',
    savePng: 'PNG में सहेजें',
    saveSvg: 'SVG में सहेजें',
    note: 'छापना है तो SVG लें — किसी भी आकार पर साफ़ रहता है, और धुँधले किनारे ही स्कैन रोकते हैं।',
  },

  'zh-hans': {
    formatTitle: '要放什么进去',
    formats: {
      text: '文字', url: '网址', wifi: 'Wi-Fi', vcard: '名片',
      email: '邮件', phone: '电话', sms: '短信', geo: '位置',
    },
    textLabel: '要生成二维码的文字',
    textPlaceholder: '随便写什么都行，中文也可以直接放进去。',
    urlLabel: '网址',
    ssid: '网络名称（SSID）',
    password: '密码',
    authTitle: '加密方式',
    auths: ['WPA / WPA2 / WPA3', 'WEP', '无密码'],
    hidden: '隐藏的网络',
    lastName: '姓',
    firstName: '名',
    org: '公司',
    jobTitle: '职位',
    phone: '电话',
    email: '邮箱',
    website: '网站',
    address: '地址',
    subject: '主题',
    body: '正文',
    message: '要发的内容',
    lat: '纬度',
    lon: '经度',
    eclTitle: '纠错等级',
    eclHint: '等级越高，破损和污渍越不怕，但同样的文字要用更大的二维码。',
    ecls: ['最小（可恢复约7%）', '普通（约15%）', '宽裕（约25%）', '最结实（约30%）'],
    sizeTitle: '格子大小',
    marginTitle: '边距',
    colorTitle: '颜色',
    darkColor: '深色格子',
    lightColor: '底色',
    empty: '在上面填点内容，二维码就出现在这里',
    tooLong: (used, limit) =>
      `太长了 — 这个等级只装得下${limit}，你有${used}。请把内容缩短，或者把纠错等级降低。我们不会为了塞进去而截断，因为截断的二维码扫不出来。`,
    lowContrast: '两种颜色太接近，扫描时可能分不开。把深色调得更深一些。',
    version: '版本',
    mode: '模式',
    mask: '掩码',
    size: '格子数',
    modes: { numeric: '数字', alnum: '字母数字', byte: '字节（UTF-8）' },
    payloadTitle: '实际写进去的内容',
    savePng: '存成 PNG',
    saveSvg: '存成 SVG',
    note: '要打印就用 SVG — 放到多大格子边缘都不会发虚，而边缘发虚正是扫不出来的原因。',
  },

  'zh-hant': {
    formatTitle: '要放什麼進去',
    formats: {
      text: '文字', url: '網址', wifi: 'Wi-Fi', vcard: '名片',
      email: '郵件', phone: '電話', sms: '簡訊', geo: '位置',
    },
    textLabel: '要產生 QR Code 的文字',
    textPlaceholder: '隨便寫什麼都行，中文也可以直接放進去。',
    urlLabel: '網址',
    ssid: '網路名稱（SSID）',
    password: '密碼',
    authTitle: '加密方式',
    auths: ['WPA / WPA2 / WPA3', 'WEP', '無密碼'],
    hidden: '隱藏的網路',
    lastName: '姓',
    firstName: '名',
    org: '公司',
    jobTitle: '職稱',
    phone: '電話',
    email: '信箱',
    website: '網站',
    address: '地址',
    subject: '主旨',
    body: '內文',
    message: '要傳的內容',
    lat: '緯度',
    lon: '經度',
    eclTitle: '錯誤修正等級',
    eclHint: '等級越高，越不怕破損和污漬，但同樣的文字要用更大的 QR Code。',
    ecls: ['最小（可修復約7%）', '普通（約15%）', '寬裕（約25%）', '最耐用（約30%）'],
    sizeTitle: '格子大小',
    marginTitle: '邊框',
    colorTitle: '顏色',
    darkColor: '深色格子',
    lightColor: '底色',
    empty: '在上面填點內容，QR Code 就出現在這裡',
    tooLong: (used, limit) =>
      `太長了 — 這個等級只裝得下${limit}，你有${used}。請把內容縮短，或者把錯誤修正等級降低。我們不會為了塞進去而截斷，因為截斷的 QR Code 掃不出來。`,
    lowContrast: '兩種顏色太接近，掃描時可能分不開。把深色調得更深一些。',
    version: '版本',
    mode: '模式',
    mask: '遮罩',
    size: '格子數',
    modes: { numeric: '數字', alnum: '字母數字', byte: '位元組（UTF-8）' },
    payloadTitle: '實際寫進去的內容',
    savePng: '存成 PNG',
    saveSvg: '存成 SVG',
    note: '要列印就用 SVG — 放到多大格子邊緣都不會模糊，而邊緣模糊正是掃不出來的原因。',
  },
};
