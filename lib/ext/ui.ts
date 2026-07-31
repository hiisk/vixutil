/**
 * 확장자 화면의 문구 — 열 언어.
 *
 * 140가지 × 8언어를 손으로 쓸 수 없다. 확장자마다 다른 것은 이름과 MIME과 여는
 * 프로그램인데 셋 다 만국 공통이라, 문장 틀만 여덟 벌 두면 된다.
 *
 * 항목마다 열 언어를 나란히 적는다. 한 언어씩 통째로 적으면 어느 항목이
 * 빠졌는지 눈으로 못 찾는데, 이렇게 두면 열 칸 중 빈 칸이 바로 보인다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ExtKind } from './list.ts';
import type { ExtFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ExtUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<ExtKind, string>;
  kindNote: Record<ExtKind, string>;
  mimeLabel: string;
  kindTitle: string;
  openWith: string;
  textLabel: string;
  textYes: string;
  textNo: string;
  webLabel: string;
  webYes: string;
  webNo: string;
  officialLabel: string;
  officialYes: string;
  officialNo: string;
  twinsTitle: string;
  twinsNote: string;
  relatedTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (ext: string) => string;
  metaDesc: (f: ExtFacts, kind: string) => string;
  hubFaq: FaqItem[];
  extFaq: (f: ExtFacts, kind: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof ExtUI]: L<ExtUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('파일 확장자', 'File extensions', 'Extensiones de archivo', 'Extensões de arquivo', 'ファイル拡張子', 'Dateiendungen', 'Extensions de fichier', 'फ़ाइल एक्सटेंशन', '文件扩展名', '檔案副檔名'),

  hubTitle: T(
    '파일 확장자 140가지',
    '140 file extensions',
    '140 extensiones de archivo',
    '140 extensões de arquivo',
    'ファイル拡張子140種',
    '140 Dateiendungen',
    '140 extensions de fichier',
    '140 फ़ाइल एक्सटेंशन',
    '文件扩展名 140 种',
    '檔案副檔名 140 種',
  ),

  hubLead: T(
    '이 파일이 무엇이고 무엇으로 여는지 확장자 하나로 찾아보세요. MIME 타입과 브라우저에서 바로 열리는지까지 함께 정리했습니다.',
    'Find out what a file is and what opens it, starting from the extension — with its MIME type and whether a browser can open it directly.',
    'Averigua qué es un archivo y con qué se abre partiendo de su extensión, con el tipo MIME y si el navegador puede abrirlo directamente.',
    'Descubra o que é um arquivo e o que o abre a partir da extensão, com o tipo MIME e se o navegador consegue abri-lo direto.',
    '拡張子から、そのファイルが何で、何で開くのかを調べられます。MIMEタイプとブラウザーでそのまま開けるかどうかもまとめました。',
    'Finden Sie über die Endung heraus, was eine Datei ist und womit man sie öffnet — samt MIME-Typ und der Frage, ob ein Browser sie direkt anzeigt.',
    "Découvrez à partir de l'extension ce qu'est un fichier et avec quoi l'ouvrir, avec son type MIME et la possibilité de l'ouvrir directement dans un navigateur.",
    'एक्सटेंशन से जानें कि फ़ाइल क्या है और किससे खुलती है — साथ में MIME टाइप और यह भी कि ब्राउज़र इसे सीधे खोल सकता है या नहीं।',
    '从扩展名入手，查这是什么文件、拿什么打开。MIME 类型和浏览器能不能直接打开，也一并列出。',
    '從副檔名入手，查這是什麼檔案、拿什麼開啟。MIME 類型和瀏覽器能不能直接開啟，也一併列出。',
  ),

  kindLabel: T(
    { image: '이미지', video: '영상', audio: '소리', doc: '문서', archive: '압축', code: '코드', data: '데이터', subtitle: '자막', font: '글꼴', ebook: '전자책', model: '3D', disk: '디스크 이미지', exec: '실행·설치' },
    { image: 'Images', video: 'Video', audio: 'Audio', doc: 'Documents', archive: 'Archives', code: 'Code', data: 'Data', subtitle: 'Subtitles', font: 'Fonts', ebook: 'E-books', model: '3D models', disk: 'Disk images', exec: 'Programs' },
    { image: 'Imágenes', video: 'Vídeo', audio: 'Audio', doc: 'Documentos', archive: 'Comprimidos', code: 'Código', data: 'Datos', subtitle: 'Subtítulos', font: 'Fuentes', ebook: 'Libros electrónicos', model: 'Modelos 3D', disk: 'Imágenes de disco', exec: 'Programas' },
    { image: 'Imagens', video: 'Vídeo', audio: 'Áudio', doc: 'Documentos', archive: 'Compactados', code: 'Código', data: 'Dados', subtitle: 'Legendas', font: 'Fontes', ebook: 'E-books', model: 'Modelos 3D', disk: 'Imagens de disco', exec: 'Programas' },
    { image: '画像', video: '動画', audio: '音声', doc: '文書', archive: '圧縮', code: 'コード', data: 'データ', subtitle: '字幕', font: 'フォント', ebook: '電子書籍', model: '3Dモデル', disk: 'ディスクイメージ', exec: '実行・インストール' },
    { image: 'Bilder', video: 'Video', audio: 'Audio', doc: 'Dokumente', archive: 'Archive', code: 'Code', data: 'Daten', subtitle: 'Untertitel', font: 'Schriften', ebook: 'E-Books', model: '3D-Modelle', disk: 'Datenträgerabbilder', exec: 'Programme' },
    { image: 'Images', video: 'Vidéo', audio: 'Audio', doc: 'Documents', archive: 'Archives', code: 'Code', data: 'Données', subtitle: 'Sous-titres', font: 'Polices', ebook: 'Livres numériques', model: 'Modèles 3D', disk: 'Images disque', exec: 'Programmes' },
    { image: 'छवियाँ', video: 'वीडियो', audio: 'ऑडियो', doc: 'दस्तावेज़', archive: 'संग्रह', code: 'कोड', data: 'डेटा', subtitle: 'सबटाइटल', font: 'फ़ॉन्ट', ebook: 'ई-बुक', model: '3D मॉडल', disk: 'डिस्क इमेज', exec: 'प्रोग्राम' },
    { image: '图像', video: '视频', audio: '音频', doc: '文档', archive: '压缩', code: '代码', data: '数据', subtitle: '字幕', font: '字体', ebook: '电子书', model: '3D 模型', disk: '磁盘映像', exec: '程序与安装' },
    { image: '影像', video: '影片', audio: '音訊', doc: '文件', archive: '壓縮', code: '程式碼', data: '資料', subtitle: '字幕', font: '字型', ebook: '電子書', model: '3D 模型', disk: '磁碟映像', exec: '程式與安裝' },
  ),

  kindNote: T(
    {
      image: '사진과 그림을 담는 형식입니다. 같은 그림도 형식에 따라 용량과 화질이 크게 달라집니다.',
      video: '움직이는 그림과 소리를 함께 담습니다. 확장자는 그릇 이름일 뿐이고, 안에 든 코덱이 실제 재생 여부를 가릅니다.',
      audio: '소리만 담는 형식입니다. 압축하면서 소리를 버리는 것과 그대로 두는 것으로 나뉩니다.',
      doc: '글과 표, 발표 자료를 담습니다. 만든 프로그램이 아니어도 열리도록 표준이 마련된 것이 많습니다.',
      archive: '파일 여럿을 하나로 묶고 크기를 줄입니다. 풀기 전에는 안에 무엇이 들었는지 목록만 보입니다.',
      code: '사람이 읽고 쓰는 소스 파일입니다. 안은 그냥 글자라 메모장으로도 열립니다.',
      data: '표와 기록을 담는 형식입니다. 프로그램 사이에 값을 옮길 때 씁니다.',
      subtitle: '영상에 얹는 자막입니다. 시간과 대사가 짝을 이룬 글자 파일이라 직접 고칠 수 있습니다.',
      font: '글자 모양을 담습니다. 설치하면 모든 프로그램에서 쓸 수 있습니다.',
      ebook: '전자책 형식입니다. 화면 크기에 맞춰 글이 다시 흐르는 것이 종이책과 다른 점입니다.',
      model: '입체 모양을 담습니다. 3D 프린터와 게임 엔진이 읽는 형식입니다.',
      disk: '디스크 한 장을 통째로 담은 파일입니다. 열면 원래 디스크처럼 마운트됩니다.',
      exec: '프로그램 자체이거나 설치 파일입니다. 출처를 모르면 열지 않는 것이 안전합니다.',
    },
    {
      image: 'Formats that hold photos and drawings. The same picture can differ hugely in size and quality depending on the format.',
      video: 'Moving pictures with sound. The extension only names the container — what actually plays depends on the codec inside.',
      audio: 'Sound only. These split into formats that throw audio away to shrink the file and formats that keep every sample.',
      doc: 'Text, tables and slides. Many have open standards so they can be read outside the program that made them.',
      archive: 'Several files bundled into one and squeezed smaller. Until you extract it, you only see the list of what is inside.',
      code: 'Source files people read and write. Inside they are plain text, so even Notepad opens them.',
      data: 'Tables and records. These are what you use to move values between programs.',
      subtitle: 'Captions laid over video. They are text files pairing timestamps with lines, so you can edit them yourself.',
      font: 'The shapes of letters. Install one and every program on the machine can use it.',
      ebook: 'E-book formats. Unlike paper, the text reflows to fit whatever screen you read it on.',
      model: 'Three-dimensional shapes — the formats 3D printers and game engines read.',
      disk: 'A whole disc captured as one file. Open it and it mounts just like the original disc.',
      exec: 'Programs themselves, or their installers. If you do not know where one came from, do not open it.',
    },
    {
      image: 'Formatos para fotos y dibujos. La misma imagen puede variar muchísimo en tamaño y calidad según el formato.',
      video: 'Imágenes en movimiento con sonido. La extensión solo nombra el contenedor: lo que se reproduce depende del códec de dentro.',
      audio: 'Solo sonido. Se dividen entre los que tiran información para ocupar menos y los que conservan cada muestra.',
      doc: 'Texto, tablas y presentaciones. Muchos tienen estándares abiertos para poder leerse fuera del programa que los creó.',
      archive: 'Varios archivos agrupados en uno y reducidos de tamaño. Hasta que no lo extraes, solo ves la lista de lo que contiene.',
      code: 'Archivos fuente que la gente lee y escribe. Por dentro son texto plano, así que hasta el Bloc de notas los abre.',
      data: 'Tablas y registros. Son lo que se usa para llevar valores de un programa a otro.',
      subtitle: 'Subtítulos superpuestos al vídeo. Son archivos de texto que emparejan tiempos con frases, así que puedes editarlos tú.',
      font: 'La forma de las letras. Basta instalar una para que cualquier programa pueda usarla.',
      ebook: 'Formatos de libro electrónico. A diferencia del papel, el texto se recoloca según la pantalla.',
      model: 'Formas tridimensionales: los formatos que leen las impresoras 3D y los motores de juego.',
      disk: 'Un disco entero guardado como un solo archivo. Al abrirlo se monta igual que el disco original.',
      exec: 'Los programas mismos o sus instaladores. Si no sabes de dónde vienen, no los abras.',
    },
    {
      image: 'Formatos para fotos e desenhos. A mesma imagem muda muito de tamanho e qualidade conforme o formato.',
      video: 'Imagens em movimento com som. A extensão só dá nome ao contêiner: o que toca de fato depende do codec de dentro.',
      audio: 'Só som. Dividem-se entre os que jogam informação fora para ocupar menos e os que guardam cada amostra.',
      doc: 'Texto, tabelas e apresentações. Muitos têm padrões abertos para serem lidos fora do programa que os criou.',
      archive: 'Vários arquivos reunidos em um só e comprimidos. Até extrair, você só vê a lista do que há dentro.',
      code: 'Arquivos-fonte que pessoas leem e escrevem. Por dentro são texto puro, então até o Bloco de Notas abre.',
      data: 'Tabelas e registros. É o que se usa para levar valores de um programa a outro.',
      subtitle: 'Legendas sobrepostas ao vídeo. São arquivos de texto que juntam tempos e falas, então dá para editar você mesmo.',
      font: 'O desenho das letras. Instale uma e qualquer programa da máquina pode usá-la.',
      ebook: 'Formatos de livro digital. Diferente do papel, o texto se reorganiza conforme a tela.',
      model: 'Formas tridimensionais — os formatos que impressoras 3D e motores de jogo leem.',
      disk: 'Um disco inteiro guardado como um arquivo só. Ao abrir, ele monta como o disco original.',
      exec: 'Os próprios programas ou seus instaladores. Se não souber de onde veio, não abra.',
    },
    {
      image: '写真や絵を収める形式です。同じ絵でも形式によって容量と画質が大きく変わります。',
      video: '動く絵と音をまとめて収めます。拡張子は入れ物の名前にすぎず、実際に再生できるかは中のコーデックが決めます。',
      audio: '音だけを収める形式です。小さくするために音を捨てるものと、そのまま残すものに分かれます。',
      doc: '文章や表、発表資料を収めます。作ったソフト以外でも開けるよう標準が用意されているものが多くあります。',
      archive: '複数のファイルを一つにまとめて小さくします。展開するまでは中身の一覧しか見えません。',
      code: '人が読み書きするソースファイルです。中身はただの文字なのでメモ帳でも開けます。',
      data: '表や記録を収める形式です。プログラム間で値を移すときに使います。',
      subtitle: '動画に重ねる字幕です。時刻とせりふが対になった文字ファイルなので、自分で直せます。',
      font: '文字の形を収めます。入れておけばどのソフトからでも使えます。',
      ebook: '電子書籍の形式です。紙と違って画面の大きさに合わせて文章が流れ直します。',
      model: '立体の形を収めます。3Dプリンターやゲームエンジンが読む形式です。',
      disk: 'ディスク一枚をまるごと収めたファイルです。開くと元のディスクのようにマウントされます。',
      exec: 'プログラムそのもの、またはインストーラーです。出どころが分からないものは開かないのが安全です。',
    },
    {
      image: 'Formate für Fotos und Zeichnungen. Dasselbe Bild unterscheidet sich je nach Format enorm in Größe und Qualität.',
      video: 'Bewegte Bilder mit Ton. Die Endung benennt nur den Container — ob etwas abspielt, entscheidet der Codec darin.',
      audio: 'Nur Ton. Sie teilen sich in Formate, die zum Verkleinern Information wegwerfen, und solche, die jedes Sample behalten.',
      doc: 'Text, Tabellen und Folien. Viele haben offene Standards, damit sie sich auch außerhalb des Erstellerprogramms lesen lassen.',
      archive: 'Mehrere Dateien in einer gebündelt und verkleinert. Vor dem Entpacken sieht man nur die Liste des Inhalts.',
      code: 'Quelldateien, die Menschen lesen und schreiben. Innen ist reiner Text, selbst Notepad öffnet sie.',
      data: 'Tabellen und Datensätze — damit bewegt man Werte zwischen Programmen.',
      subtitle: 'Untertitel über dem Video. Es sind Textdateien mit Zeitmarken und Sätzen, man kann sie selbst bearbeiten.',
      font: 'Die Form der Buchstaben. Einmal installiert, kann jedes Programm sie nutzen.',
      ebook: 'E-Book-Formate. Anders als auf Papier fließt der Text neu, passend zum Bildschirm.',
      model: 'Dreidimensionale Formen — die Formate, die 3D-Drucker und Spiel-Engines lesen.',
      disk: 'Ein ganzer Datenträger als eine Datei. Beim Öffnen wird sie wie das Original eingebunden.',
      exec: 'Programme selbst oder deren Installer. Bei unbekannter Herkunft besser nicht öffnen.',
    },
    {
      image: 'Formats pour les photos et les dessins. Une même image varie énormément en poids et en qualité selon le format.',
      video: "Images animées avec le son. L'extension ne nomme que le conteneur : ce qui se lit dépend du codec à l'intérieur.",
      audio: "Le son seul. Ils se divisent entre ceux qui jettent de l'information pour peser moins et ceux qui gardent chaque échantillon.",
      doc: "Texte, tableaux et diapositives. Beaucoup reposent sur des normes ouvertes pour être lus hors du logiciel d'origine.",
      archive: "Plusieurs fichiers réunis en un seul et compressés. Avant extraction, on ne voit que la liste du contenu.",
      code: 'Fichiers sources que les gens lisent et écrivent. À l’intérieur, du texte brut : même le Bloc-notes les ouvre.',
      data: "Tableaux et enregistrements — ce qui sert à transporter des valeurs d'un logiciel à l'autre.",
      subtitle: 'Sous-titres posés sur la vidéo. Ce sont des fichiers texte associant horodatages et répliques, donc modifiables à la main.',
      font: 'La forme des lettres. Une fois installée, tous les logiciels peuvent en profiter.',
      ebook: "Formats de livre numérique. Contrairement au papier, le texte se recompose selon l'écran.",
      model: 'Formes en trois dimensions — les formats que lisent les imprimantes 3D et les moteurs de jeu.',
      disk: "Un disque entier enregistré dans un seul fichier. À l'ouverture, il se monte comme le disque d'origine.",
      exec: "Les programmes eux-mêmes ou leurs installeurs. Si vous ignorez d'où vient le fichier, ne l'ouvrez pas.",
    },
    {
      image: 'तस्वीरें और चित्र रखने वाले फ़ॉर्मैट। एक ही तस्वीर फ़ॉर्मैट के हिसाब से आकार और गुणवत्ता में बहुत बदल जाती है।',
      video: 'चलती तस्वीरें और आवाज़ साथ में। एक्सटेंशन सिर्फ़ डिब्बे का नाम है — असल में क्या चलेगा यह अंदर के कोडेक पर निर्भर है।',
      audio: 'सिर्फ़ आवाज़। ये उनमें बँटते हैं जो आकार घटाने के लिए जानकारी छोड़ देते हैं और जो हर नमूना सहेजते हैं।',
      doc: 'लेख, तालिकाएँ और प्रस्तुतियाँ। कई के खुले मानक हैं ताकि बनाने वाले प्रोग्राम के बाहर भी पढ़े जा सकें।',
      archive: 'कई फ़ाइलें एक में बाँधकर छोटी की जाती हैं। खोलने से पहले सिर्फ़ अंदर की सूची दिखती है।',
      code: 'स्रोत फ़ाइलें जिन्हें लोग पढ़ते-लिखते हैं। अंदर सादा टेक्स्ट होता है, इसलिए नोटपैड भी खोल लेता है।',
      data: 'तालिकाएँ और रिकॉर्ड — प्रोग्रामों के बीच मान ले जाने के लिए यही इस्तेमाल होते हैं।',
      subtitle: 'वीडियो पर लगने वाले सबटाइटल। ये समय और संवाद जोड़ने वाली टेक्स्ट फ़ाइलें हैं, इसलिए खुद सुधारी जा सकती हैं।',
      font: 'अक्षरों की आकृति। एक बार इंस्टॉल करने पर हर प्रोग्राम इसे इस्तेमाल कर सकता है।',
      ebook: 'ई-बुक फ़ॉर्मैट। कागज़ से अलग, लेख स्क्रीन के हिसाब से फिर से बहता है।',
      model: 'त्रिआयामी आकृतियाँ — वही फ़ॉर्मैट जिन्हें 3D प्रिंटर और गेम इंजन पढ़ते हैं।',
      disk: 'पूरी डिस्क एक फ़ाइल में। खोलने पर वह असली डिस्क की तरह माउंट हो जाती है।',
      exec: 'प्रोग्राम खुद या उनके इंस्टॉलर। स्रोत पता न हो तो न खोलना ही सुरक्षित है।',
    },
    {
      image: '装照片和图画的格式。同一张图换个格式，大小和画质会差很多。',
      video: '把动起来的画面和声音装在一起。扩展名只是容器的名字，真正能不能播由里面的编码决定。',
      audio: '只装声音的格式。分成压缩时丢掉一部分声音的，和一点不丢的两类。',
      doc: '装文字、表格和演示稿。很多都定了标准，不是原来那个软件也打得开。',
      archive: '把多个文件捆成一个并缩小体积。解开之前只看得到里面的清单。',
      code: '人读人写的源码文件。里面就是纯文字，记事本也打得开。',
      data: '装表格和记录的格式，用来在程序之间搬运数据。',
      subtitle: '叠在视频上的字幕。就是时间配台词的文本文件，可以直接改。',
      font: '装字形的文件。装上之后所有程序都能用。',
      ebook: '电子书格式。文字会跟着屏幕大小重新排流，这是它和纸书最大的不同。',
      model: '装立体形状的文件，3D 打印机和游戏引擎读的就是它。',
      disk: '把一整张盘原样装成一个文件。打开后会像原来的盘一样挂载上去。',
      exec: '程序本身或者安装包。来路不明就别打开，这样最稳妥。',
    },
    {
      image: '裝照片和圖畫的格式。同一張圖換個格式，大小和畫質會差很多。',
      video: '把動起來的畫面和聲音裝在一起。副檔名只是容器的名字，真正能不能播由裡面的編碼決定。',
      audio: '只裝聲音的格式。分成壓縮時丟掉一部分聲音的，和一點不丟的兩類。',
      doc: '裝文字、表格和簡報。很多都定了標準，不是原來那個軟體也打得開。',
      archive: '把多個檔案綁成一個並縮小體積。解開之前只看得到裡面的清單。',
      code: '人讀人寫的原始碼檔案。裡面就是純文字，記事本也打得開。',
      data: '裝表格和紀錄的格式，用來在程式之間搬運資料。',
      subtitle: '疊在影片上的字幕。就是時間配台詞的文字檔，可以直接改。',
      font: '裝字形的檔案。裝上之後所有程式都能用。',
      ebook: '電子書格式。文字會跟著螢幕大小重新排流，這是它和紙本書最大的不同。',
      model: '裝立體形狀的檔案，3D 列印機和遊戲引擎讀的就是它。',
      disk: '把一整張碟原樣裝成一個檔案。開啟後會像原來的碟一樣掛載上去。',
      exec: '程式本身或者安裝檔。來路不明就別開啟，這樣最穩妥。',
    },
  ),

  mimeLabel: T('MIME 타입', 'MIME type', 'Tipo MIME', 'Tipo MIME', 'MIMEタイプ', 'MIME-Typ', 'Type MIME', 'MIME टाइप', 'MIME 类型', 'MIME 類型'),
  kindTitle: T('갈래', 'Category', 'Categoría', 'Categoria', '分類', 'Kategorie', 'Catégorie', 'श्रेणी', '分类', '分類'),
  openWith: T('여는 프로그램', 'Opens with', 'Se abre con', 'Abre com', '開くプログラム', 'Öffnen mit', 'Ouvrir avec', 'किससे खुलती है', '用什么打开', '用什麼開啟'),
  textLabel: T('글자 파일', 'Plain text', 'Texto plano', 'Texto simples', '文字ファイル', 'Reiner Text', 'Texte brut', 'सादा टेक्स्ट', '纯文本', '純文字'),
  textYes: T('맞음', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '是', '是'),
  textNo: T('아님', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '不是', '不是'),
  webLabel: T('브라우저에서 열림', 'Opens in a browser', 'Se abre en el navegador', 'Abre no navegador', 'ブラウザーで開く', 'Im Browser', 'Dans le navigateur', 'ब्राउज़र में खुलती है', '浏览器能打开', '瀏覽器能開啟'),
  webYes: T('바로 열림', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '能直接打开', '能直接開啟'),
  webNo: T('안 열림', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '打不开', '開不了'),
  officialLabel: T('표준 등록', 'Registered type', 'Tipo registrado', 'Tipo registrado', '標準登録', 'Registriert', 'Type enregistré', 'पंजीकृत टाइप', '标准登记', '標準登記'),
  officialYes: T('등록됨', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '已登记', '已登記'),
  officialNo: T('비공식 (x-)', 'Unofficial (x-)', 'No oficial (x-)', 'Não oficial (x-)', '非公式 (x-)', 'Inoffiziell (x-)', 'Non officiel (x-)', 'अनौपचारिक (x-)', '非正式（x-）', '非正式（x-）'),

  twinsTitle: T('사실상 같은 파일', 'The same file, another name', 'El mismo archivo con otro nombre', 'O mesmo arquivo com outro nome', '中身が同じ拡張子', 'Dieselbe Datei, andere Endung', 'Le même fichier, autre nom', 'वही फ़ाइल, दूसरा नाम', '其实是同一种文件', '其實是同一種檔案'),
  twinsNote: T(
    'MIME 타입이 같습니다. 확장자만 바꿔도 대부분 그대로 열립니다.',
    'These share a MIME type. Renaming between them usually just works.',
    'Comparten el tipo MIME. Cambiar la extensión entre ellos suele funcionar sin más.',
    'Compartilham o tipo MIME. Trocar a extensão entre eles costuma funcionar.',
    'MIMEタイプが同じです。拡張子を変えるだけでたいていそのまま開きます。',
    'Sie teilen denselben MIME-Typ. Ein Umbenennen genügt meist.',
    'Ils partagent le même type MIME : renommer de l’un à l’autre suffit généralement.',
    'इनका MIME टाइप एक ही है। एक्सटेंशन बदल देने भर से आमतौर पर काम चल जाता है।',
    '它们的 MIME 类型相同。互相改个扩展名，多半照样打得开。',
    '它們的 MIME 類型相同。互相改個副檔名，多半照樣打得開。',
  ),

  relatedTitle: T('같은 갈래', 'Same group', 'Mismo grupo', 'Mesmo grupo', '同じ分類', 'Gleiche Gruppe', 'Même groupe', 'वही समूह', '同一分类', '同一分類'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T(
    [
      '확장자는 이름표일 뿐 파일의 내용이 아닙니다. 이름을 .png로 바꿔도 안에 든 것이 JPEG이면 그대로 JPEG입니다.',
      'MIME 타입은 인터넷에서 파일 종류를 알리는 이름입니다. 브라우저는 확장자가 아니라 이 값을 보고 열지 내려받을지 정합니다.',
      'x-로 시작하는 MIME은 표준에 등록되지 않았다는 뜻입니다. 널리 쓰이지만 공식 이름은 아닙니다.',
      '영상 확장자는 그릇 이름입니다. 같은 .mp4라도 안의 코덱에 따라 어떤 기기에서는 재생되고 어떤 기기에서는 안 됩니다.',
    ],
    [
      'An extension is a label, not the contents. Rename a file to .png and if the bytes inside are JPEG, it is still a JPEG.',
      'A MIME type is how the internet names a file kind. Browsers look at that value, not the extension, to decide whether to display or download.',
      'A MIME type starting with x- was never registered as a standard. Plenty are in wide use, but they are not official names.',
      'Video extensions name a container. The same .mp4 may play on one device and not another, depending on the codec inside.',
    ],
    [
      'La extensión es una etiqueta, no el contenido. Si renombras a .png un archivo cuyos bytes son JPEG, sigue siendo un JPEG.',
      'El tipo MIME es como internet nombra la clase de archivo. El navegador mira ese valor, no la extensión, para decidir si mostrarlo o descargarlo.',
      'Un tipo MIME que empieza por x- nunca se registró como estándar. Muchos se usan mucho, pero no son nombres oficiales.',
      'Las extensiones de vídeo nombran un contenedor. El mismo .mp4 puede reproducirse en un aparato y no en otro según el códec de dentro.',
    ],
    [
      'A extensão é um rótulo, não o conteúdo. Renomeie para .png um arquivo cujos bytes são JPEG e ele continua sendo JPEG.',
      'O tipo MIME é como a internet nomeia a espécie de arquivo. O navegador olha esse valor, não a extensão, para decidir entre exibir e baixar.',
      'Um tipo MIME começado por x- nunca foi registrado como padrão. Muitos são bastante usados, mas não são nomes oficiais.',
      'Extensões de vídeo nomeiam um contêiner. O mesmo .mp4 pode tocar num aparelho e não em outro, conforme o codec de dentro.',
    ],
    [
      '拡張子は名札にすぎず、中身そのものではありません。名前を .png に変えても、中がJPEGならJPEGのままです。',
      'MIMEタイプはインターネット上でファイルの種類を伝える名前です。ブラウザーは拡張子ではなくこの値を見て、表示するか保存するかを決めます。',
      'x- で始まるMIMEは標準に登録されていないという意味です。広く使われていても公式な名前ではありません。',
      '動画の拡張子は入れ物の名前です。同じ .mp4 でも中のコーデック次第で、ある機器では再生できて別の機器ではできません。',
    ],
    [
      'Eine Endung ist ein Etikett, nicht der Inhalt. Benennen Sie eine Datei in .png um — sind die Bytes darin JPEG, bleibt es ein JPEG.',
      'Der MIME-Typ ist der Name, mit dem das Internet eine Dateiart bezeichnet. Browser sehen auf diesen Wert, nicht auf die Endung, um anzuzeigen oder herunterzuladen.',
      'Ein MIME-Typ mit x- am Anfang wurde nie als Standard registriert. Viele sind verbreitet, offiziell sind sie deshalb nicht.',
      'Videoendungen benennen einen Container. Dieselbe .mp4 läuft je nach Codec auf einem Gerät und auf einem anderen nicht.',
    ],
    [
      "Une extension est une étiquette, pas le contenu. Renommez un fichier en .png : si les octets sont du JPEG, c'est toujours du JPEG.",
      "Le type MIME est le nom que l'internet donne à une sorte de fichier. Le navigateur regarde cette valeur, pas l'extension, pour afficher ou télécharger.",
      "Un type MIME commençant par x- n'a jamais été enregistré comme norme. Beaucoup sont très répandus, sans être officiels pour autant.",
      "Les extensions vidéo nomment un conteneur. Le même .mp4 se lit sur un appareil et pas sur un autre, selon le codec qu'il contient.",
    ],
    [
      'एक्सटेंशन सिर्फ़ लेबल है, फ़ाइल की सामग्री नहीं। नाम बदलकर .png कर दें, पर अंदर के बाइट JPEG हैं तो वह JPEG ही रहेगी।',
      'MIME टाइप वह नाम है जिससे इंटरनेट फ़ाइल की किस्म बताता है। ब्राउज़र दिखाने या डाउनलोड करने का फ़ैसला एक्सटेंशन से नहीं, इसी मान से करता है।',
      'x- से शुरू होने वाला MIME टाइप कभी मानक के रूप में दर्ज नहीं हुआ। बहुत चलन में होने के बावजूद वे आधिकारिक नाम नहीं हैं।',
      'वीडियो एक्सटेंशन कंटेनर का नाम होते हैं। वही .mp4 अंदर के कोडेक के अनुसार किसी डिवाइस पर चलती है और किसी पर नहीं।',
    ],
    [
      '扩展名只是个名牌，不是文件的内容。把名字改成 .png，里面装的要是 JPEG，那它还是 JPEG。',
      'MIME 类型是互联网上告知文件种类的名字。浏览器看的是这个值而不是扩展名，据此决定打开还是下载。',
      '以 x- 开头的 MIME 表示没在标准里登记过。用的人很多，但不是官方名字。',
      '视频扩展名是容器的名字。同样是 .mp4，里面的编码不同，有的设备能播，有的播不了。',
    ],
    [
      '副檔名只是個名牌，不是檔案的內容。把名字改成 .png，裡面裝的要是 JPEG，那它還是 JPEG。',
      'MIME 類型是網際網路上告知檔案種類的名字。瀏覽器看的是這個值而不是副檔名，據此決定開啟還是下載。',
      '以 x- 開頭的 MIME 表示沒在標準裡登記過。用的人很多，但不是官方名字。',
      '影片副檔名是容器的名字。同樣是 .mp4，裡面的編碼不同，有的裝置能播，有的播不了。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '파일 확장자 140가지 — 무엇으로 여는지, MIME 타입',
    '140 file extensions — what opens them and their MIME types',
    '140 extensiones de archivo — con qué se abren y su tipo MIME',
    '140 extensões de arquivo — o que as abre e seus tipos MIME',
    'ファイル拡張子140種 — 開くプログラムとMIMEタイプ',
    '140 Dateiendungen — womit man sie öffnet und ihr MIME-Typ',
    '140 extensions de fichier — avec quoi les ouvrir et leur type MIME',
    '140 फ़ाइल एक्सटेंशन — किससे खुलती हैं और उनका MIME टाइप',
    '文件扩展名 140 种 — 用什么打开、MIME 类型',
    '檔案副檔名 140 種 — 用什麼開啟、MIME 類型',
  ),
  hubMetaDesc: T(
    'jpg·webp·hwp·mkv 등 확장자 140가지를 갈래별로 정리했습니다. 각 확장자의 MIME 타입, 여는 프로그램, 브라우저에서 바로 열리는지, 이름만 다른 같은 형식까지 확인하세요.',
    'A sorted list of 140 extensions — jpg, webp, mkv, epub and more — with the MIME type, the programs that open each one, whether a browser shows it directly, and which extensions are the same format under another name.',
    'Una lista ordenada de 140 extensiones (jpg, webp, mkv, epub y más) con su tipo MIME, los programas que las abren, si el navegador las muestra y qué extensiones son el mismo formato con otro nombre.',
    'Uma lista organizada de 140 extensões — jpg, webp, mkv, epub e outras — com o tipo MIME, os programas que abrem cada uma, se o navegador exibe direto e quais extensões são o mesmo formato com outro nome.',
    'jpg・webp・mkv・epubなど拡張子140種を種類別にまとめました。MIMEタイプ、開くプログラム、ブラウザーでそのまま開けるか、名前だけ違う同じ形式まで確認できます。',
    'Eine geordnete Liste von 140 Endungen — jpg, webp, mkv, epub und mehr — mit MIME-Typ, den öffnenden Programmen, der Browser-Anzeige und den Endungen, die dasselbe Format anders benennen.',
    "Une liste classée de 140 extensions — jpg, webp, mkv, epub et d'autres — avec le type MIME, les logiciels qui les ouvrent, l'affichage direct dans le navigateur et les extensions qui désignent le même format.",
    'jpg, webp, mkv, epub समेत 140 एक्सटेंशन श्रेणीवार — हर एक का MIME टाइप, खोलने वाले प्रोग्राम, ब्राउज़र में सीधे खुलती है या नहीं, और कौन-से एक्सटेंशन एक ही फ़ॉर्मैट के दूसरे नाम हैं।',
    'jpg、webp、mkv、epub 等 140 种扩展名，按分类整理好。每一种的 MIME 类型、能打开它的程序、浏览器会不会直接显示，以及哪些扩展名其实是同一种格式的另一个名字，全都能查到。',
    'jpg、webp、mkv、epub 等 140 種副檔名，按分類整理好。每一種的 MIME 類型、能開啟它的程式、瀏覽器會不會直接顯示，以及哪些副檔名其實是同一種格式的另一個名字，全都能查到。',
  ),

  metaTitle: T(
    (x: string) => `.${x} 파일이란 — 여는 방법과 MIME 타입`,
    (x: string) => `.${x} file — what it is and how to open it`,
    (x: string) => `Archivo .${x} — qué es y cómo abrirlo`,
    (x: string) => `Arquivo .${x} — o que é e como abrir`,
    (x: string) => `.${x} ファイルとは — 開き方とMIMEタイプ`,
    (x: string) => `.${x}-Datei — was das ist und wie man sie öffnet`,
    (x: string) => `Fichier .${x} — ce que c'est et comment l'ouvrir`,
    (x: string) => `.${x} फ़ाइल — यह क्या है और कैसे खोलें`,
    (x: string) => `.${x} 文件是什么 — 怎么打开和 MIME 类型`,
    (x: string) => `.${x} 檔案是什麼 — 怎麼開啟和 MIME 類型`,
  ),

  metaDesc: T(
    (f: ExtFacts, kind: string) => `.${f.ext}는 ${kind} 파일이고 MIME 타입은 ${f.mime}입니다. ${f.apps.slice(0, 3).join(', ')}에서 열 수 있으며, 브라우저에서는 ${f.web ? '바로 열립니다' : '내려받아야 합니다'}.`,
    (f: ExtFacts, kind: string) => `.${f.ext} is a ${kind.toLowerCase()} file with the MIME type ${f.mime}. You can open it with ${f.apps.slice(0, 3).join(', ')}, and a browser ${f.web ? 'displays it directly' : 'downloads it instead of showing it'}.`,
    (f: ExtFacts, kind: string) => `.${f.ext} es un archivo de ${kind.toLowerCase()} con el tipo MIME ${f.mime}. Se abre con ${f.apps.slice(0, 3).join(', ')}, y el navegador ${f.web ? 'lo muestra directamente' : 'lo descarga en vez de mostrarlo'}.`,
    (f: ExtFacts, kind: string) => `.${f.ext} é um arquivo de ${kind.toLowerCase()} com o tipo MIME ${f.mime}. Abre com ${f.apps.slice(0, 3).join(', ')}, e o navegador ${f.web ? 'exibe direto' : 'baixa em vez de exibir'}.`,
    (f: ExtFacts, kind: string) => `.${f.ext} は${kind}ファイルで、MIMEタイプは ${f.mime} です。${f.apps.slice(0, 3).join('、')}で開けます。ブラウザーでは${f.web ? 'そのまま開きます' : 'ダウンロードされます'}。`,
    (f: ExtFacts, kind: string) => `.${f.ext} ist eine Datei der Kategorie ${kind} mit dem MIME-Typ ${f.mime}. Öffnen lässt sie sich mit ${f.apps.slice(0, 3).join(', ')}; ein Browser ${f.web ? 'zeigt sie direkt an' : 'lädt sie herunter, statt sie anzuzeigen'}.`,
    (f: ExtFacts, kind: string) => `.${f.ext} est un fichier de type ${kind.toLowerCase()}, dont le type MIME est ${f.mime}. Il s'ouvre avec ${f.apps.slice(0, 3).join(', ')}, et le navigateur ${f.web ? "l'affiche directement" : 'le télécharge au lieu de l\'afficher'}.`,
    (f: ExtFacts, kind: string) => `.${f.ext} एक ${kind} फ़ाइल है और इसका MIME टाइप ${f.mime} है। इसे ${f.apps.slice(0, 3).join(', ')} से खोला जा सकता है, और ब्राउज़र इसे ${f.web ? 'सीधे दिखा देता है' : 'दिखाने के बजाय डाउनलोड करता है'}।`,
    (f: ExtFacts, kind: string) => `.${f.ext} 是${kind}文件，MIME 类型为 ${f.mime}。可以用 ${f.apps.slice(0, 3).join('、')} 打开，浏览器${f.web ? '能直接显示' : '不显示，会直接下载'}。`,
    (f: ExtFacts, kind: string) => `.${f.ext} 是${kind}檔案，MIME 類型為 ${f.mime}。可以用 ${f.apps.slice(0, 3).join('、')} 開啟，瀏覽器${f.web ? '能直接顯示' : '不顯示，會直接下載'}。`,
  ),

  hubFaq: T(
    [
      { q: '확장자를 바꾸면 파일 형식도 바뀌나요?', a: '아닙니다. 확장자는 이름표일 뿐이고 파일 안의 내용은 그대로입니다. JPEG 파일 이름을 .png로 바꿔도 여전히 JPEG이라, 형식을 확인하는 프로그램은 오히려 열지 못합니다. 진짜로 바꾸려면 변환 프로그램으로 다시 저장해야 합니다.' },
      { q: '확장자가 안 보이는데 어떻게 확인하나요?', a: '윈도우 탐색기는 보기 메뉴에서 "파일 확장명"을 켜면 되고, 맥 파인더는 설정에서 "모든 파일 확장자 보기"를 켜면 됩니다. 기본으로 숨겨져 있어서 사진.jpg.exe 같은 이름에 속기 쉽습니다.' },
      { q: '모르는 확장자 파일을 열어도 되나요?', a: '실행 파일(.exe·.msi·.apk·.jar)은 출처를 모르면 열지 않는 것이 안전합니다. 문서나 압축 파일도 안에 실행 파일이 들어 있을 수 있으니, 받은 곳이 분명하지 않으면 먼저 백신으로 검사하세요.' },
      { q: 'MIME 타입은 어디에 쓰나요?', a: '웹 서버가 파일을 보낼 때 "이건 image/png야"라고 함께 알려 주는 이름입니다. 브라우저는 확장자가 아니라 이 값을 보고 화면에 그릴지 내려받을지 정하기 때문에, 값이 잘못되면 이미지가 글자로 보이거나 그냥 내려받아집니다.' },
      { q: '같은 파일인데 확장자가 여러 개인 경우가 있나요?', a: '있습니다. .jpg와 .jpeg는 완전히 같은 형식이고 MIME도 image/jpeg로 같습니다. 옛 도스가 확장자를 세 글자까지만 허용해서 갈라진 흔적입니다. .sqlite와 .db, .mpg와 .mpeg도 마찬가지입니다.' },
    ],
    [
      { q: 'Does renaming the extension change the format?', a: 'No. The extension is only a label; the bytes inside stay exactly as they were. Rename a JPEG to .png and it is still a JPEG — and programs that check the real format may now refuse to open it. To truly change format you have to convert and re-save.' },
      { q: 'My extensions are hidden — how do I see them?', a: 'In Windows Explorer, turn on "File name extensions" in the View menu. On macOS, tick "Show all filename extensions" in Finder settings. They are hidden by default, which is exactly how names like photo.jpg.exe fool people.' },
      { q: 'Is it safe to open a file type I do not recognise?', a: 'Treat executables (.exe, .msi, .apk, .jar) as unsafe unless you know where they came from. Documents and archives can carry executables inside too, so scan anything whose source you cannot vouch for.' },
      { q: 'What is a MIME type for?', a: 'It is the label a web server sends along with a file to say "this is image/png". Browsers trust that value rather than the extension when deciding whether to render or download, so a wrong MIME type shows an image as garbled text or forces a download.' },
      { q: 'Why do some formats have two extensions?', a: 'Because of history. .jpg and .jpeg are the same format with the same MIME type, image/jpeg — the short form exists because early DOS allowed only three letters. The same goes for .sqlite and .db, or .mpg and .mpeg.' },
    ],
    [
      { q: '¿Cambiar la extensión cambia el formato?', a: 'No. La extensión es solo una etiqueta; los bytes de dentro siguen igual. Si renombras un JPEG a .png sigue siendo JPEG, y los programas que comprueban el formato real pueden negarse a abrirlo. Para cambiarlo de verdad hay que convertirlo y volver a guardarlo.' },
      { q: 'No veo las extensiones, ¿cómo las muestro?', a: 'En el Explorador de Windows, activa "Extensiones de nombre de archivo" en el menú Ver. En macOS, marca "Mostrar todas las extensiones" en los ajustes del Finder. Vienen ocultas, y así es como engañan nombres del tipo foto.jpg.exe.' },
      { q: '¿Es seguro abrir un tipo de archivo que no conozco?', a: 'Los ejecutables (.exe, .msi, .apk, .jar) no deberían abrirse si no sabes de dónde vienen. Los documentos y comprimidos también pueden llevar ejecutables dentro, así que analiza con antivirus lo que no puedas garantizar.' },
      { q: '¿Para qué sirve el tipo MIME?', a: 'Es la etiqueta que el servidor web envía junto al archivo para decir "esto es image/png". El navegador se fía de ese valor, no de la extensión, al decidir entre mostrar y descargar; si es incorrecto, una imagen aparece como texto ilegible o se descarga sin más.' },
      { q: '¿Por qué algunos formatos tienen dos extensiones?', a: 'Por historia. .jpg y .jpeg son el mismo formato con el mismo tipo MIME, image/jpeg: la forma corta existe porque el viejo DOS solo admitía tres letras. Lo mismo pasa con .sqlite y .db, o .mpg y .mpeg.' },
    ],
    [
      { q: 'Renomear a extensão muda o formato?', a: 'Não. A extensão é só um rótulo; os bytes de dentro continuam iguais. Renomeie um JPEG para .png e ele segue JPEG — e programas que checam o formato real podem passar a recusá-lo. Para mudar de verdade, é preciso converter e salvar de novo.' },
      { q: 'As extensões estão ocultas — como exibir?', a: 'No Explorador do Windows, ligue "Extensões de nomes de arquivos" no menu Exibir. No macOS, marque "Mostrar todas as extensões" nas preferências do Finder. Vêm ocultas, e é assim que nomes como foto.jpg.exe enganam.' },
      { q: 'É seguro abrir um tipo de arquivo desconhecido?', a: 'Trate executáveis (.exe, .msi, .apk, .jar) como inseguros se não souber a origem. Documentos e compactados também podem carregar executáveis dentro, então examine com antivírus tudo cuja procedência você não garante.' },
      { q: 'Para que serve o tipo MIME?', a: 'É o rótulo que o servidor web manda junto com o arquivo para dizer "isto é image/png". O navegador confia nesse valor, não na extensão, ao decidir entre exibir e baixar; se estiver errado, uma imagem aparece como texto embaralhado ou é baixada.' },
      { q: 'Por que alguns formatos têm duas extensões?', a: 'Por história. .jpg e .jpeg são o mesmo formato com o mesmo tipo MIME, image/jpeg — a forma curta existe porque o DOS antigo só permitia três letras. O mesmo vale para .sqlite e .db, ou .mpg e .mpeg.' },
    ],
    [
      { q: '拡張子を変えるとファイル形式も変わりますか。', a: '変わりません。拡張子は名札にすぎず、中の中身はそのままです。JPEGファイルの名前を .png にしても中身はJPEGのままで、形式を確かめるソフトはかえって開けなくなります。本当に変えるには変換して保存し直す必要があります。' },
      { q: '拡張子が表示されません。どうすれば見られますか。', a: 'Windowsのエクスプローラーでは「表示」メニューの「ファイル名拡張子」を、macOSのFinderでは設定の「すべてのファイル名拡張子を表示」をオンにします。既定で隠れているため、写真.jpg.exe のような名前にだまされやすくなります。' },
      { q: '知らない拡張子のファイルを開いても大丈夫ですか。', a: '実行ファイル（.exe・.msi・.apk・.jar）は出どころが分からなければ開かないでください。文書や圧縮ファイルの中に実行ファイルが入っていることもあるので、入手元が不確かならまずウイルス対策ソフトで調べてください。' },
      { q: 'MIMEタイプは何に使いますか。', a: 'ウェブサーバーがファイルを送るときに「これは image/png です」と添える名前です。ブラウザーは拡張子ではなくこの値を見て表示するか保存するかを決めるので、値が誤っていると画像が文字化けして見えたり、そのまま保存されたりします。' },
      { q: '同じ形式なのに拡張子が二つあるのはなぜですか。', a: '歴史の名残です。.jpg と .jpeg はまったく同じ形式で、MIMEも image/jpeg で同じです。昔のDOSが拡張子を三文字までしか許さなかったために短い形が生まれました。.sqlite と .db、.mpg と .mpeg も同じです。' },
    ],
    [
      { q: 'Ändert das Umbenennen der Endung das Format?', a: 'Nein. Die Endung ist nur ein Etikett, die Bytes bleiben dieselben. Ein JPEG in .png umbenannt bleibt ein JPEG — Programme, die das echte Format prüfen, verweigern es dann sogar. Für einen echten Wechsel muss man konvertieren und neu speichern.' },
      { q: 'Die Endungen sind ausgeblendet — wie zeige ich sie an?', a: 'Im Windows-Explorer im Menü „Ansicht" die „Dateinamenerweiterungen" einschalten, unter macOS in den Finder-Einstellungen „Alle Dateinamensuffixe einblenden". Standardmäßig sind sie versteckt — genau damit täuschen Namen wie foto.jpg.exe.' },
      { q: 'Darf man unbekannte Dateitypen öffnen?', a: 'Ausführbare Dateien (.exe, .msi, .apk, .jar) sollte man ohne bekannte Herkunft nicht öffnen. Auch Dokumente und Archive können ausführbaren Code enthalten — prüfen Sie im Zweifel erst mit einem Virenscanner.' },
      { q: 'Wozu dient der MIME-Typ?', a: 'Er ist das Etikett, das ein Webserver mitschickt: „Das hier ist image/png." Browser richten sich nach diesem Wert statt nach der Endung, wenn sie zwischen Anzeigen und Herunterladen wählen. Ist er falsch, erscheint ein Bild als Zeichensalat oder landet im Download-Ordner.' },
      { q: 'Warum haben manche Formate zwei Endungen?', a: 'Aus historischen Gründen. .jpg und .jpeg sind dasselbe Format mit demselben MIME-Typ image/jpeg — die Kurzform entstand, weil das alte DOS nur drei Zeichen erlaubte. Ebenso bei .sqlite und .db oder .mpg und .mpeg.' },
    ],
    [
      { q: "Renommer l'extension change-t-il le format ?", a: "Non. L'extension n'est qu'une étiquette : les octets restent identiques. Renommez un JPEG en .png et c'est toujours un JPEG — les logiciels qui vérifient le vrai format risquent même de le refuser. Pour changer réellement, il faut convertir et réenregistrer." },
      { q: 'Mes extensions sont masquées, comment les afficher ?', a: "Dans l'Explorateur Windows, activez « Extensions de noms de fichiers » dans le menu Affichage. Sur macOS, cochez « Afficher toutes les extensions » dans les réglages du Finder. Elles sont masquées par défaut, et c'est ainsi que des noms comme photo.jpg.exe trompent." },
      { q: "Peut-on ouvrir un type de fichier inconnu ?", a: "Considérez les exécutables (.exe, .msi, .apk, .jar) comme dangereux si vous ignorez leur provenance. Documents et archives peuvent aussi contenir des exécutables : analysez tout fichier dont vous ne pouvez pas garantir l'origine." },
      { q: 'À quoi sert le type MIME ?', a: "C'est l'étiquette qu'un serveur web joint au fichier pour dire « ceci est image/png ». Le navigateur se fie à cette valeur, et non à l'extension, pour choisir entre afficher et télécharger : une valeur erronée transforme une image en charabia ou force le téléchargement." },
      { q: 'Pourquoi certains formats ont-ils deux extensions ?', a: "Pour des raisons historiques. .jpg et .jpeg désignent le même format, avec le même type MIME image/jpeg ; la forme courte vient du DOS, limité à trois lettres. Idem pour .sqlite et .db, ou .mpg et .mpeg." },
    ],
    [
      { q: 'क्या एक्सटेंशन बदलने से फ़ॉर्मैट बदल जाता है?', a: 'नहीं। एक्सटेंशन सिर्फ़ लेबल है; अंदर के बाइट वैसे ही रहते हैं। JPEG का नाम .png कर दें तो भी वह JPEG ही रहेगी — और असली फ़ॉर्मैट जाँचने वाले प्रोग्राम उसे खोलने से मना कर सकते हैं। सचमुच बदलने के लिए कन्वर्ट करके दोबारा सहेजना पड़ता है।' },
      { q: 'एक्सटेंशन दिख नहीं रहे, कैसे दिखाएँ?', a: 'विंडोज़ एक्सप्लोरर में व्यू मेन्यू खोलकर फ़ाइल नाम एक्सटेंशन दिखाने वाला विकल्प चालू करें; macOS के फ़ाइंडर सेटिंग्स में सभी एक्सटेंशन दिखाने वाला विकल्प चुनें। ये पहले से छिपे रहते हैं, और इसी से फ़ोटो.jpg.exe जैसे नाम धोखा देते हैं।' },
      { q: 'क्या अनजान किस्म की फ़ाइल खोलना सुरक्षित है?', a: 'एग्ज़ीक्यूटेबल (.exe, .msi, .apk, .jar) तब तक न खोलें जब तक स्रोत पता न हो। दस्तावेज़ और संग्रह फ़ाइलों के भीतर भी एग्ज़ीक्यूटेबल हो सकते हैं, इसलिए जिसकी उत्पत्ति की गारंटी न हो उसे पहले एंटीवायरस से जाँचें।' },
      { q: 'MIME टाइप किस काम आता है?', a: 'यह वह लेबल है जो वेब सर्वर फ़ाइल के साथ भेजता है — "यह image/png है"। ब्राउज़र दिखाने या डाउनलोड करने का फ़ैसला एक्सटेंशन से नहीं, इसी मान से करता है; मान ग़लत हो तो छवि अटपटे अक्षरों में दिखती है या सीधे डाउनलोड हो जाती है।' },
      { q: 'कुछ फ़ॉर्मैट के दो एक्सटेंशन क्यों होते हैं?', a: 'इतिहास की वजह से। .jpg और .jpeg एक ही फ़ॉर्मैट हैं और MIME टाइप भी एक ही, image/jpeg — छोटा रूप इसलिए बना कि पुराना DOS सिर्फ़ तीन अक्षर मानता था। यही बात .sqlite और .db, या .mpg और .mpeg पर लागू होती है।' },
    ],
    [
      { q: '改了扩展名，文件格式也跟着变吗？', a: '不会。扩展名只是个名牌，文件里的内容原封不动。把 JPEG 的名字改成 .png，它依旧是 JPEG，会查格式的程序反而打不开了。真要转格式，得用转换软件重新存一遍。' },
      { q: '看不到扩展名，该怎么显示出来？', a: 'Windows 在资源管理器的「查看」里勾上「文件扩展名」；Mac 在访达设置里勾上「显示所有文件扩展名」。默认是藏起来的，所以「照片.jpg.exe」这种名字很容易骗到人。' },
      { q: '不认识的扩展名文件能打开吗？', a: '可执行文件（.exe、.msi、.apk、.jar）来路不明就别打开，这样最稳妥。文档和压缩包里也可能夹着可执行文件，来源不明的话先用杀毒软件扫一遍。' },
      { q: 'MIME 类型是用在哪里的？', a: '它是网页服务器送文件时一并告知的名字 ——「这是 image/png」。浏览器看的是这个值而不是扩展名，据此决定画在页面上还是下载下来；值写错了，图片就会变成一堆乱码，或者干脆被下载走。' },
      { q: '同一种文件会有好几个扩展名吗？', a: '会。.jpg 和 .jpeg 完全是同一种格式，MIME 也同为 image/jpeg。这是当年 DOS 只允许三个字母的扩展名留下的分岔。.sqlite 和 .db、.mpg 和 .mpeg 也是一样的情况。' },
    ],
    [
      { q: '改了副檔名，檔案格式也跟著變嗎？', a: '不會。副檔名只是個名牌，檔案裡的內容原封不動。把 JPEG 的名字改成 .png，它依舊是 JPEG，會查格式的程式反而打不開了。真要轉格式，得用轉換軟體重新存一遍。' },
      { q: '看不到副檔名，該怎麼顯示出來？', a: 'Windows 在檔案總管的「檢視」裡勾上「副檔名」；Mac 在 Finder 設定裡勾上「顯示所有檔案副檔名」。預設是藏起來的，所以「照片.jpg.exe」這種名字很容易騙到人。' },
      { q: '不認識的副檔名檔案能開嗎？', a: '可執行檔（.exe、.msi、.apk、.jar）來路不明就別開，這樣最穩妥。文件和壓縮檔裡也可能夾著可執行檔，來源不明的話先用防毒軟體掃一遍。' },
      { q: 'MIME 類型是用在哪裡的？', a: '它是網頁伺服器送檔案時一併告知的名字 ——「這是 image/png」。瀏覽器看的是這個值而不是副檔名，據此決定畫在頁面上還是下載下來；值寫錯了，圖片就會變成一堆亂碼，或者乾脆被下載走。' },
      { q: '同一種檔案會有好幾個副檔名嗎？', a: '會。.jpg 和 .jpeg 完全是同一種格式，MIME 也同為 image/jpeg。這是當年 DOS 只允許三個字母的副檔名留下的分岔。.sqlite 和 .db、.mpg 和 .mpeg 也是一樣的情況。' },
    ],
  ),

  extFaq: T(
    (f: ExtFacts, kind: string) => [
      { q: `.${f.ext} 파일은 무엇인가요?`, a: `${kind} 갈래의 파일이고 MIME 타입은 ${f.mime}입니다. ${f.text ? '안이 글자로 되어 있어 메모장으로 열어 볼 수도 있습니다.' : '안이 이진 데이터라 메모장으로 열면 깨져 보입니다.'}` },
      { q: `.${f.ext} 파일은 무엇으로 여나요?`, a: `${f.apps.join(', ')}에서 열립니다. 브라우저에서는 ${f.web ? '따로 프로그램 없이 바로 열립니다.' : '바로 열리지 않고 내려받아집니다.'}` },
      { q: `.${f.ext}의 MIME 타입은 무엇인가요?`, a: `${f.mime}입니다. 앞 토막 ${f.mimeType}은 큰 갈래를, 뒤 토막 ${f.mimeSubtype}은 정확한 형식을 가리킵니다. ${f.official ? '표준에 등록된 이름입니다.' : 'x-로 시작하므로 표준에 등록되지 않은 이름입니다.'}` },
      { q: f.twins.length > 0 ? `.${f.ext}와 같은 형식인 확장자가 있나요?` : `.${f.ext} 파일을 다른 형식으로 바꿀 수 있나요?`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join(', ')}이(가) MIME 타입까지 같습니다. 이름만 바꿔도 대부분 그대로 열립니다.` : `변환 프로그램으로 다시 저장하면 됩니다. 이름만 바꾸면 겉만 달라지고 안은 그대로라, 형식을 확인하는 프로그램은 오히려 열지 못합니다.` },
      { q: `.${f.ext} 파일이 안 열립니다.`, a: `먼저 ${f.apps[0]}이(가) 설치되어 있는지 확인하세요. 그래도 안 열리면 파일이 받다가 끊겼거나, 이름만 .${f.ext}이고 안은 다른 형식일 수 있습니다.` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `What is a .${f.ext} file?`, a: `It belongs to the ${kind.toLowerCase()} category and its MIME type is ${f.mime}. ${f.text ? 'The contents are plain text, so you can even open it in Notepad and read it.' : 'The contents are binary, so opening it in a text editor shows garbage.'}` },
      { q: `What opens a .${f.ext} file?`, a: `${f.apps.join(', ')} all handle it. In a browser it ${f.web ? 'opens directly, with no extra software.' : 'does not display — the browser downloads it instead.'}` },
      { q: `What is the MIME type of .${f.ext}?`, a: `${f.mime}. The first half, ${f.mimeType}, names the broad kind; the second half, ${f.mimeSubtype}, names the exact format. ${f.official ? 'It is a registered standard name.' : 'It starts with x-, which means it was never registered as a standard.'}` },
      { q: f.twins.length > 0 ? `Is any other extension the same format as .${f.ext}?` : `Can I convert a .${f.ext} file to another format?`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join(', ')} share the very same MIME type. Renaming between them usually just works.` : `Yes — open it and re-save through a converter. Renaming alone changes only the label; the bytes stay put, and programs that check the real format may refuse to open it.` },
      { q: `My .${f.ext} file will not open.`, a: `First check that ${f.apps[0]} is installed. If it still fails, the download may have been cut short, or the file may only be named .${f.ext} while holding a different format inside.` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `¿Qué es un archivo .${f.ext}?`, a: `Pertenece a la categoría ${kind.toLowerCase()} y su tipo MIME es ${f.mime}. ${f.text ? 'El contenido es texto plano, así que hasta el Bloc de notas lo muestra legible.' : 'El contenido es binario, así que abrirlo en un editor de texto solo muestra caracteres ilegibles.'}` },
      { q: `¿Con qué se abre un archivo .${f.ext}?`, a: `Lo abren ${f.apps.join(', ')}. En el navegador ${f.web ? 'se abre directamente, sin instalar nada.' : 'no se muestra: el navegador lo descarga.'}` },
      { q: `¿Cuál es el tipo MIME de .${f.ext}?`, a: `${f.mime}. La primera mitad, ${f.mimeType}, indica la clase general; la segunda, ${f.mimeSubtype}, el formato exacto. ${f.official ? 'Es un nombre registrado como estándar.' : 'Empieza por x-, señal de que nunca se registró como estándar.'}` },
      { q: f.twins.length > 0 ? `¿Hay otra extensión con el mismo formato que .${f.ext}?` : `¿Puedo convertir un archivo .${f.ext} a otro formato?`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join(', ')} comparten exactamente el mismo tipo MIME. Cambiar el nombre entre ellos suele bastar.` : `Sí: ábrelo y vuelve a guardarlo con un conversor. Renombrar solo cambia la etiqueta; los bytes siguen igual y los programas que comprueban el formato pueden rechazarlo.` },
      { q: `Mi archivo .${f.ext} no se abre.`, a: `Comprueba primero que tienes ${f.apps[0]} instalado. Si aun así falla, puede que la descarga se cortara o que el archivo solo se llame .${f.ext} y por dentro sea otro formato.` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `O que é um arquivo .${f.ext}?`, a: `Ele é da categoria ${kind.toLowerCase()} e seu tipo MIME é ${f.mime}. ${f.text ? 'O conteúdo é texto puro, então até o Bloco de Notas mostra legível.' : 'O conteúdo é binário, então abrir num editor de texto só mostra caracteres embaralhados.'}` },
      { q: `Com o que abrir um arquivo .${f.ext}?`, a: `${f.apps.join(', ')} dão conta dele. No navegador ele ${f.web ? 'abre direto, sem instalar nada.' : 'não aparece — o navegador baixa o arquivo.'}` },
      { q: `Qual é o tipo MIME de .${f.ext}?`, a: `${f.mime}. A primeira metade, ${f.mimeType}, diz a espécie geral; a segunda, ${f.mimeSubtype}, o formato exato. ${f.official ? 'É um nome registrado como padrão.' : 'Começa com x-, sinal de que nunca foi registrado como padrão.'}` },
      { q: f.twins.length > 0 ? `Existe outra extensão igual a .${f.ext}?` : `Dá para converter um arquivo .${f.ext} para outro formato?`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join(', ')} têm exatamente o mesmo tipo MIME. Renomear entre eles costuma bastar.` : `Sim: abra e salve de novo por um conversor. Renomear muda só o rótulo; os bytes ficam iguais e programas que checam o formato podem recusar.` },
      { q: `Meu arquivo .${f.ext} não abre.`, a: `Confira primeiro se ${f.apps[0]} está instalado. Se ainda assim falhar, o download pode ter sido interrompido, ou o arquivo pode só se chamar .${f.ext} e ter outro formato dentro.` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `.${f.ext} ファイルとは何ですか。`, a: `${kind}の仲間で、MIMEタイプは ${f.mime} です。${f.text ? '中身は文字なのでメモ帳でも読めます。' : '中身はバイナリなので、テキストエディターで開くと文字化けします。'}` },
      { q: `.${f.ext} ファイルは何で開きますか。`, a: `${f.apps.join('、')}で開けます。ブラウザーでは${f.web ? '追加のソフトなしでそのまま開きます。' : '表示されず、ダウンロードされます。'}` },
      { q: `.${f.ext} のMIMEタイプは何ですか。`, a: `${f.mime} です。前半の ${f.mimeType} が大きな種類を、後半の ${f.mimeSubtype} が正確な形式を表します。${f.official ? '標準に登録された名前です。' : 'x- で始まるので、標準には登録されていない名前です。'}` },
      { q: f.twins.length > 0 ? `.${f.ext} と同じ形式の拡張子はありますか。` : `.${f.ext} ファイルを別の形式に変換できますか。`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join('、')}がMIMEタイプまで同じです。名前を変えるだけでたいていそのまま開きます。` : `変換ソフトで開いて保存し直せば変えられます。名前だけ変えても中身は同じままで、形式を確かめるソフトはかえって開けなくなります。` },
      { q: `.${f.ext} ファイルが開きません。`, a: `まず ${f.apps[0]} が入っているか確かめてください。それでも開かない場合は、ダウンロードが途中で切れているか、名前だけ .${f.ext} で中身が別の形式かもしれません。` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `Was ist eine .${f.ext}-Datei?`, a: `Sie gehört zur Kategorie ${kind} und trägt den MIME-Typ ${f.mime}. ${f.text ? 'Der Inhalt ist reiner Text — selbst Notepad zeigt ihn lesbar an.' : 'Der Inhalt ist binär; in einem Texteditor erscheint nur Zeichensalat.'}` },
      { q: `Womit öffnet man eine .${f.ext}-Datei?`, a: `${f.apps.join(', ')} kommen damit zurecht. Im Browser ${f.web ? 'öffnet sie sich direkt, ohne Zusatzsoftware.' : 'wird sie nicht angezeigt, sondern heruntergeladen.'}` },
      { q: `Welchen MIME-Typ hat .${f.ext}?`, a: `${f.mime}. Der vordere Teil ${f.mimeType} nennt die grobe Art, der hintere ${f.mimeSubtype} das genaue Format. ${f.official ? 'Der Name ist als Standard registriert.' : 'Er beginnt mit x- und wurde nie als Standard registriert.'}` },
      { q: f.twins.length > 0 ? `Gibt es eine Endung mit demselben Format wie .${f.ext}?` : `Lässt sich eine .${f.ext}-Datei umwandeln?`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join(', ')} tragen exakt denselben MIME-Typ. Ein Umbenennen genügt meist.` : `Ja — öffnen und über einen Konverter neu speichern. Bloßes Umbenennen ändert nur das Etikett; Programme, die das echte Format prüfen, verweigern die Datei dann sogar.` },
      { q: `Meine .${f.ext}-Datei lässt sich nicht öffnen.`, a: `Prüfen Sie zuerst, ob ${f.apps[0]} installiert ist. Klappt es dann noch nicht, war der Download vielleicht unvollständig, oder die Datei heißt nur .${f.ext} und enthält ein anderes Format.` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `Qu'est-ce qu'un fichier .${f.ext} ?`, a: `Il appartient à la catégorie ${kind.toLowerCase()} et son type MIME est ${f.mime}. ${f.text ? "Son contenu est du texte brut : même le Bloc-notes l'affiche lisiblement." : "Son contenu est binaire : ouvert dans un éditeur de texte, il n'affiche que des caractères illisibles."}` },
      { q: `Avec quoi ouvrir un fichier .${f.ext} ?`, a: `${f.apps.join(', ')} le prennent en charge. Dans un navigateur, il ${f.web ? "s'ouvre directement, sans logiciel supplémentaire." : "ne s'affiche pas : le navigateur le télécharge."}` },
      { q: `Quel est le type MIME de .${f.ext} ?`, a: `${f.mime}. La première partie, ${f.mimeType}, désigne la grande famille ; la seconde, ${f.mimeSubtype}, le format exact. ${f.official ? "C'est un nom enregistré comme norme." : "Il commence par x- : il n'a jamais été enregistré comme norme."}` },
      { q: f.twins.length > 0 ? `Une autre extension correspond-elle au même format que .${f.ext} ?` : `Peut-on convertir un fichier .${f.ext} ?`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join(', ')} partagent exactement le même type MIME : renommer suffit généralement.` : `Oui : ouvrez-le et réenregistrez-le via un convertisseur. Renommer ne change que l'étiquette ; les octets restent les mêmes et les logiciels qui vérifient le format peuvent alors le refuser.` },
      { q: `Mon fichier .${f.ext} ne s'ouvre pas.`, a: `Vérifiez d'abord que ${f.apps[0]} est installé. Si cela échoue encore, le téléchargement a peut-être été interrompu, ou le fichier porte seulement l'extension .${f.ext} tout en contenant un autre format.` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `.${f.ext} फ़ाइल क्या है?`, a: `यह ${kind} श्रेणी की फ़ाइल है और इसका MIME टाइप ${f.mime} है। ${f.text ? 'इसकी सामग्री सादा टेक्स्ट है, इसलिए नोटपैड में भी पढ़ी जा सकती है।' : 'इसकी सामग्री बाइनरी है, इसलिए टेक्स्ट एडिटर में खोलने पर अटपटे अक्षर दिखते हैं।'}` },
      { q: `.${f.ext} फ़ाइल किससे खुलती है?`, a: `${f.apps.join(', ')} इसे संभाल लेते हैं। ब्राउज़र में यह ${f.web ? 'बिना किसी अतिरिक्त सॉफ़्टवेयर के सीधे खुल जाती है।' : 'दिखती नहीं — ब्राउज़र इसे डाउनलोड कर देता है।'}` },
      { q: `.${f.ext} का MIME टाइप क्या है?`, a: `${f.mime}। पहला हिस्सा ${f.mimeType} बड़ी किस्म बताता है और दूसरा ${f.mimeSubtype} सटीक फ़ॉर्मैट। ${f.official ? 'यह मानक के रूप में दर्ज नाम है।' : 'यह x- से शुरू होता है, यानी कभी मानक के रूप में दर्ज नहीं हुआ।'}` },
      { q: f.twins.length > 0 ? `क्या .${f.ext} जैसा ही कोई और एक्सटेंशन है?` : `क्या .${f.ext} फ़ाइल को दूसरे फ़ॉर्मैट में बदला जा सकता है?`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join(', ')} का MIME टाइप बिल्कुल यही है। आपस में नाम बदल देने भर से आमतौर पर काम चल जाता है।` : `हाँ — कन्वर्टर में खोलकर दोबारा सहेजें। सिर्फ़ नाम बदलने से लेबल बदलता है, बाइट वही रहते हैं, और असली फ़ॉर्मैट जाँचने वाले प्रोग्राम फिर मना कर सकते हैं।` },
      { q: `मेरी .${f.ext} फ़ाइल नहीं खुल रही।`, a: `पहले देखें कि ${f.apps[0]} इंस्टॉल है या नहीं। फिर भी न खुले तो डाउनलोड बीच में टूटा हो सकता है, या नाम भर .${f.ext} हो और अंदर कोई और फ़ॉर्मैट हो।` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `.${f.ext} 是什么文件？`, a: `属于${kind}这一类，MIME 类型为 ${f.mime}。${f.text ? '里面是纯文字，用记事本也能打开来看。' : '里面是二进制数据，用记事本打开会是一堆乱码。'}` },
      { q: `.${f.ext} 文件用什么打开？`, a: `${f.apps.join('、')} 都能打开。浏览器${f.web ? '不用另装程序就能直接打开。' : '打不开，会直接下载下来。'}` },
      { q: `.${f.ext} 的 MIME 类型是什么？`, a: `是 ${f.mime}。前半段 ${f.mimeType} 指大类，后半段 ${f.mimeSubtype} 指具体格式。${f.official ? '这是在标准里登记过的名字。' : '它以 x- 开头，说明没在标准里登记过。'}` },
      { q: f.twins.length > 0 ? `有没有和 .${f.ext} 同一种格式的扩展名？` : `.${f.ext} 文件能转成别的格式吗？`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join('、')} 连 MIME 类型都一样。只改名字，多半照样打得开。` : `用转换软件重新存一遍就行。单改扩展名不管用 —— 文件内容一点没变。` },
      { q: `.${f.ext} 文件打不开怎么办？`, a: `先确认装没装 ${f.apps[0]}。装了还打不开，可能是下载时断了，或者名字虽是 .${f.ext}、里面装的却是别的格式。` },
    ],
    (f: ExtFacts, kind: string) => [
      { q: `.${f.ext} 是什麼檔案？`, a: `屬於${kind}這一類，MIME 類型為 ${f.mime}。${f.text ? '裡面是純文字，用記事本也能開來看。' : '裡面是二進位資料，用記事本開會是一堆亂碼。'}` },
      { q: `.${f.ext} 檔案用什麼開？`, a: `${f.apps.join('、')} 都能開。瀏覽器${f.web ? '不用另裝程式就能直接開。' : '開不了，會直接下載下來。'}` },
      { q: `.${f.ext} 的 MIME 類型是什麼？`, a: `是 ${f.mime}。前半段 ${f.mimeType} 指大類，後半段 ${f.mimeSubtype} 指具體格式。${f.official ? '這是在標準裡登記過的名字。' : '它以 x- 開頭，說明沒在標準裡登記過。'}` },
      { q: f.twins.length > 0 ? `有沒有和 .${f.ext} 同一種格式的副檔名？` : `.${f.ext} 檔案能轉成別的格式嗎？`, a: f.twins.length > 0 ? `${f.twins.map(t => `.${t}`).join('、')} 連 MIME 類型都一樣。只改名字，多半照樣打得開。` : `用轉換軟體重新存一遍就行。單改副檔名不管用 —— 檔案內容一點沒變。` },
      { q: `.${f.ext} 檔案開不了怎麼辦？`, a: `先確認裝沒裝 ${f.apps[0]}。裝了還開不了，可能是下載時斷了，或者名字雖是 .${f.ext}、裡面裝的卻是別的格式。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const EXT_UI: L<ExtUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<ExtUI>;
