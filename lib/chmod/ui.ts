/**
 * 파일 권한 화면의 문구 — 열 언어.
 *
 * 125가지 설명을 언어마다 적지 않는다. 모드에서 계산한 값(누가 무엇을 할 수
 * 있는가, umask, 위험 여부)에 낱말만 갈아 끼워 문장을 만든다.
 *
 * 자주 쓰는 열 가지만은 "무엇에 쓰는가"를 적는다 — 755와 644를 찾아온 사람에게
 * 계산 결과만 보여 주는 것은 답이 아니기 때문이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ChmodFacts, Who } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ChmodUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  commonTitle: string;
  commonNote: string;
  /** 자주 쓰는 모드가 무엇에 쓰이는가 */
  commonUse: Record<string, string>;
  allTitle: string;
  allNote: string;
  ownerGroupLabel: (digit: number) => string;
  whoLabel: Record<Who, string>;
  readLabel: string;
  writeLabel: string;
  execLabel: string;
  execDirLabel: string;
  noneLabel: string;
  modeLabel: string;
  symbolicLabel: string;
  lsFileLabel: string;
  lsDirLabel: string;
  assignLabel: string;
  binLabel: string;
  decimalLabel: string;
  umaskDirLabel: string;
  umaskFileLabel: string;
  umaskNone: string;
  commandLabel: string;
  gridTitle: string;
  gridNote: string;
  dangerTitle: string;
  dangerNote: string;
  fileDirNote: string;
  neighbourTitle: string;
  desc: (f: ChmodFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: ChmodFacts) => string;
  metaDesc: (f: ChmodFacts) => string;
  hubFaq: FaqItem[];
  modeFaq: (f: ChmodFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/**
 * 한국어 조사 — 모드를 읽은 소리가 정한다.
 *
 * 755는 "칠오오"라 "755는", 644는 "육사사"라 "644는", 700은 "칠공공"이라
 * "700은"이다. 끝자리가 4·5면 모음, 0·6·7이면 받침으로 끝난다.
 * ([[lib/number/ui.ts]]에서 같은 규칙을 쓴다 — 거기서는 2·9도 다룬다)
 */
const KO_OPEN = new Set([4, 5]);
const ko = (mode: string, withFinal: string, withoutFinal: string): string =>
  (KO_OPEN.has(Number(mode[2])) ? withoutFinal : withFinal);

type Spec = { [K in keyof ChmodUI]: L<ChmodUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('파일 권한', 'File permissions', 'Permisos', 'Permissões', 'ファイル権限', 'Dateirechte', 'Permissions', 'फ़ाइल अनुमतियाँ', '文件权限', '檔案權限'),

  hubTitle: T(
    'chmod 권한 모드 125가지',
    '125 chmod permission modes',
    'Los 125 modos de chmod',
    'Os 125 modos do chmod',
    'chmod 権限モード125種',
    '125 chmod-Rechtemodi',
    'Les 125 modes chmod',
    '125 chmod अनुमति मोड',
    'chmod 权限模式 125 种',
    'chmod 權限模式 125 種',
  ),

  hubLead: T(
    '755와 644가 정확히 무엇을 여는지, umask는 얼마여야 하는지까지 세 자리 숫자에서 계산했습니다.',
    'What 755 and 644 actually open up, and which umask produces them — all worked out from the three digits.',
    'Qué abren de verdad 755 y 644, y qué umask los produce: todo sale de los tres dígitos.',
    'O que 755 e 644 realmente abrem, e qual umask os produz — tudo sai dos três dígitos.',
    '755と644が何を開くのか、umaskはいくつにすべきかまで、三桁の数字から計算しました。',
    'Was 755 und 644 wirklich freigeben und welche umask sie erzeugt — alles aus den drei Ziffern berechnet.',
    'Ce que 755 et 644 ouvrent vraiment, et quel umask les produit : tout est calculé à partir des trois chiffres.',
    '755 और 644 असल में क्या खोलते हैं और कौन-सा umask उन्हें बनाता है — सब तीन अंकों से निकाला गया।',
    '755 和 644 到底放开了什么、umask 该设成多少，全部由这三位数字算出。',
    '755 和 644 到底放開了什麼、umask 該設成多少，全部由這三位數字算出。',
  ),

  commonTitle: T('자주 쓰는 모드', 'The ones you actually type', 'Los que de verdad se usan', 'Os que realmente se usam', 'よく使うモード', 'Die wirklich benutzten', 'Ceux qu’on tape vraiment', 'जो सचमुच काम आते हैं', '真正常用的模式', '真正常用的模式'),

  commonNote: T(
    '125가지 가운데 실제로 손이 가는 것은 열 가지 남짓입니다.',
    'Of the 125, about ten are the ones your fingers actually reach for.',
    'De los 125, unos diez son los que los dedos escriben de verdad.',
    'Dos 125, cerca de dez são os que os dedos realmente digitam.',
    '125種のうち、実際に手が伸びるのは十ほどです。',
    'Von den 125 sind es etwa zehn, die man wirklich tippt.',
    'Sur les 125, une dizaine seulement sont vraiment tapés.',
    '125 में से लगभग दस ही सचमुच टाइप होते हैं।',
    '125 种里，真正会去敲的大约只有十种。',
    '125 種裡，真正會去敲的大約只有十種。',
  ),

  commonUse: T(
    {
      '400': '읽기 전용 열쇠 파일. 소유자도 고칠 수 없습니다.',
      '600': '비밀 열쇠와 설정 파일. 소유자만 읽고 씁니다.',
      '640': '팀이 읽어야 하는 설정 파일.',
      '644': '보통 파일의 기본값. 누구나 읽고 소유자만 씁니다.',
      '664': '여럿이 함께 고치는 파일.',
      '666': '누구나 고칠 수 있어 거의 쓰지 않습니다.',
      '700': '나만 쓰는 폴더와 스크립트.',
      '755': '실행 파일과 웹 폴더의 기본값.',
      '775': '팀이 함께 쓰는 폴더.',
      '777': '모두에게 모두 여는 값. 급할 때 쓰고 후회합니다.',
    },
    {
      '400': 'A read-only key file — even the owner cannot edit it.',
      '600': 'Private keys and config. Only the owner reads and writes.',
      '640': 'Config the team needs to read.',
      '644': 'The default for ordinary files: everyone reads, owner writes.',
      '664': 'Files several people edit together.',
      '666': 'Anyone can edit it, so it is almost never used.',
      '700': 'A folder or script only you touch.',
      '755': 'The default for executables and web folders.',
      '775': 'A folder a team shares.',
      '777': 'Everything open to everyone. Used in a hurry, regretted later.',
    },
    {
      '400': 'Archivo de clave de solo lectura: ni el dueño puede editarlo.',
      '600': 'Claves privadas y configuración. Solo el dueño lee y escribe.',
      '640': 'Configuración que el equipo necesita leer.',
      '644': 'El valor normal de un archivo: todos leen, el dueño escribe.',
      '664': 'Archivos que varios editan juntos.',
      '666': 'Cualquiera puede editarlo, así que casi no se usa.',
      '700': 'Carpeta o script que solo tocas tú.',
      '755': 'El valor normal de ejecutables y carpetas web.',
      '775': 'Carpeta que comparte un equipo.',
      '777': 'Todo abierto para todos. Se usa con prisa y se lamenta después.',
    },
    {
      '400': 'Arquivo de chave só de leitura — nem o dono pode editar.',
      '600': 'Chaves privadas e configuração. Só o dono lê e escreve.',
      '640': 'Configuração que o time precisa ler.',
      '644': 'O padrão de arquivos comuns: todos leem, o dono escreve.',
      '664': 'Arquivos que várias pessoas editam juntas.',
      '666': 'Qualquer um pode editar, por isso quase não se usa.',
      '700': 'Pasta ou script que só você toca.',
      '755': 'O padrão de executáveis e pastas web.',
      '775': 'Pasta que um time compartilha.',
      '777': 'Tudo aberto para todos. Usa-se com pressa e se lamenta depois.',
    },
    {
      '400': '読み取り専用の鍵ファイル。持ち主でも書き換えられません。',
      '600': '秘密鍵と設定ファイル。持ち主だけが読み書きします。',
      '640': 'チームが読む必要のある設定ファイル。',
      '644': '普通のファイルの既定値。誰でも読め、持ち主だけが書けます。',
      '664': '何人かで一緒に直すファイル。',
      '666': '誰でも書き換えられるので、ほとんど使いません。',
      '700': '自分しか触らないフォルダやスクリプト。',
      '755': '実行ファイルとウェブ用フォルダの既定値。',
      '775': 'チームで共有するフォルダ。',
      '777': '全員に全部を開く値。急いで使って後悔します。',
    },
    {
      '400': 'Eine nur lesbare Schlüsseldatei — nicht einmal der Eigentümer ändert sie.',
      '600': 'Private Schlüssel und Konfiguration. Nur der Eigentümer liest und schreibt.',
      '640': 'Konfiguration, die das Team lesen muss.',
      '644': 'Der Normalfall für Dateien: alle lesen, der Eigentümer schreibt.',
      '664': 'Dateien, die mehrere gemeinsam bearbeiten.',
      '666': 'Jeder darf schreiben, deshalb kaum in Gebrauch.',
      '700': 'Ordner oder Skript, das nur du anfasst.',
      '755': 'Der Normalfall für ausführbare Dateien und Web-Ordner.',
      '775': 'Ordner, den ein Team teilt.',
      '777': 'Alles für alle offen. In Eile gesetzt, später bereut.',
    },
    {
      '400': 'Un fichier de clé en lecture seule — même le propriétaire ne l’édite pas.',
      '600': 'Clés privées et configuration. Seul le propriétaire lit et écrit.',
      '640': 'Configuration que l’équipe doit lire.',
      '644': 'Le réglage courant des fichiers : tous lisent, le propriétaire écrit.',
      '664': 'Fichiers que plusieurs personnes modifient ensemble.',
      '666': 'N’importe qui peut écrire : on ne s’en sert presque jamais.',
      '700': 'Dossier ou script que vous seul touchez.',
      '755': 'Le réglage courant des exécutables et des dossiers web.',
      '775': 'Dossier partagé par une équipe.',
      '777': 'Tout ouvert à tous. Posé dans l’urgence, regretté après.',
    },
    {
      '400': 'केवल पढ़ने योग्य कुंजी फ़ाइल — मालिक भी नहीं बदल सकता।',
      '600': 'निजी कुंजी और कॉन्फ़िग। केवल मालिक पढ़ता-लिखता है।',
      '640': 'कॉन्फ़िग जिसे टीम को पढ़ना है।',
      '644': 'सामान्य फ़ाइल का सामान्य मान: सब पढ़ें, मालिक लिखे।',
      '664': 'फ़ाइलें जिन्हें कई लोग मिलकर बदलते हैं।',
      '666': 'कोई भी बदल सकता है, इसलिए लगभग नहीं वापरा जाता।',
      '700': 'फ़ोल्डर या स्क्रिप्ट जिसे सिर्फ़ आप छूते हैं।',
      '755': 'निष्पादन योग्य फ़ाइलों और वेब फ़ोल्डर का सामान्य मान।',
      '775': 'टीम द्वारा साझा फ़ोल्डर।',
      '777': 'सबके लिए सब कुछ खुला। जल्दी में लगाया, बाद में पछताया।',
    },
    {
      '400': '只读的密钥文件——连所有者也改不了。',
      '600': '私钥和配置文件。只有所有者能读写。',
      '640': '团队需要读的配置文件。',
      '644': '普通文件的常见值：谁都能读，只有所有者能写。',
      '664': '几个人一起改的文件。',
      '666': '谁都能改，所以几乎不用。',
      '700': '只有自己动的文件夹和脚本。',
      '755': '可执行文件和网站目录的常见值。',
      '775': '团队共用的文件夹。',
      '777': '对所有人全开。急起来才用，用完后悔。',
    },
    {
      '400': '唯讀的金鑰檔案——連擁有者也改不了。',
      '600': '私鑰和設定檔。只有擁有者能讀寫。',
      '640': '團隊需要讀的設定檔。',
      '644': '一般檔案的常見值：誰都能讀，只有擁有者能寫。',
      '664': '幾個人一起改的檔案。',
      '666': '誰都能改，所以幾乎不用。',
      '700': '只有自己動的資料夾和腳本。',
      '755': '可執行檔和網站目錄的常見值。',
      '775': '團隊共用的資料夾。',
      '777': '對所有人全開。急起來才用，用完後悔。',
    },
  ),

  allTitle: T('125가지 전부', 'All 125', 'Los 125', 'Todos os 125', '125種すべて', 'Alle 125', 'Les 125', 'सभी 125', '全部 125 种', '全部 125 種'),

  allNote: T(
    '실제로 쓰이는 다섯 값(0·4·5·6·7)의 모든 조합입니다. 쓰기만 되고 읽기가 안 되는 값들은 뺐습니다.',
    'Every combination of the five values that actually get used — 0, 4, 5, 6, 7. Write-without-read and the like are left out.',
    'Todas las combinaciones de los cinco valores que se usan de verdad: 0, 4, 5, 6 y 7. Se dejan fuera los de escribir sin leer.',
    'Todas as combinações dos cinco valores que realmente se usam: 0, 4, 5, 6 e 7. Ficam de fora os de escrever sem ler.',
    '実際に使われる五つの値（0・4・5・6・7）のすべての組み合わせです。読めずに書けるだけの値は外しました。',
    'Alle Kombinationen der fünf Werte, die wirklich vorkommen: 0, 4, 5, 6, 7. Schreiben-ohne-Lesen und Ähnliches fehlen.',
    'Toutes les combinaisons des cinq valeurs réellement utilisées : 0, 4, 5, 6, 7. Écrire sans lire et compagnie sont écartés.',
    'उन पाँच मानों के सभी संयोजन जो सचमुच काम आते हैं — 0, 4, 5, 6, 7। बिना पढ़े लिखने जैसे मान छोड़ दिए हैं।',
    '实际会用到的五个值（0·4·5·6·7）的全部组合。只能写不能读那类值没有收。',
    '實際會用到的五個值（0·4·5·6·7）的全部組合。只能寫不能讀那類值沒有收。',
  ),

  ownerGroupLabel: T<(digit: number) => string>(
    d => `소유자 ${d} — ${d}xx`,
    d => `Owner ${d} — ${d}xx`,
    d => `Dueño ${d} — ${d}xx`,
    d => `Dono ${d} — ${d}xx`,
    d => `持ち主 ${d} — ${d}xx`,
    d => `Eigentümer ${d} — ${d}xx`,
    d => `Propriétaire ${d} — ${d}xx`,
    d => `मालिक ${d} — ${d}xx`,
    d => `所有者 ${d} — ${d}xx`,
    d => `擁有者 ${d} — ${d}xx`,
  ),

  whoLabel: T(
    { user: '소유자', group: '그룹', other: '기타' },
    { user: 'Owner', group: 'Group', other: 'Others' },
    { user: 'Dueño', group: 'Grupo', other: 'Otros' },
    { user: 'Dono', group: 'Grupo', other: 'Outros' },
    { user: '持ち主', group: 'グループ', other: 'その他' },
    { user: 'Eigentümer', group: 'Gruppe', other: 'Andere' },
    { user: 'Propriétaire', group: 'Groupe', other: 'Autres' },
    { user: 'मालिक', group: 'समूह', other: 'अन्य' },
    { user: '所有者', group: '组', other: '其他人' },
    { user: '擁有者', group: '群組', other: '其他人' },
  ),

  readLabel: T('읽기', 'Read', 'Leer', 'Ler', '読み取り', 'Lesen', 'Lire', 'पढ़ना', '读', '讀'),
  writeLabel: T('쓰기', 'Write', 'Escribir', 'Escrever', '書き込み', 'Schreiben', 'Écrire', 'लिखना', '写', '寫'),
  execLabel: T('실행', 'Execute', 'Ejecutar', 'Executar', '実行', 'Ausführen', 'Exécuter', 'चलाना', '执行', '執行'),
  execDirLabel: T('들어가기', 'Enter', 'Entrar', 'Entrar', '入る', 'Betreten', 'Entrer', 'भीतर जाना', '进入', '進入'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  modeLabel: T('8진수 모드', 'Octal mode', 'Modo octal', 'Modo octal', '8進数モード', 'Oktalmodus', 'Mode octal', 'अष्टाधारी मोड', '八进制模式', '八進位模式'),
  symbolicLabel: T('rwx 표기', 'Symbolic', 'Simbólico', 'Simbólico', 'rwx表記', 'Symbolisch', 'Symbolique', 'सांकेतिक', 'rwx 表示', 'rwx 表示'),
  lsFileLabel: T('ls -l (파일)', 'ls -l (file)', 'ls -l (archivo)', 'ls -l (arquivo)', 'ls -l（ファイル）', 'ls -l (Datei)', 'ls -l (fichier)', 'ls -l (फ़ाइल)', 'ls -l（文件）', 'ls -l（檔案）'),
  lsDirLabel: T('ls -l (디렉터리)', 'ls -l (directory)', 'ls -l (directorio)', 'ls -l (diretório)', 'ls -l（ディレクトリ）', 'ls -l (Verzeichnis)', 'ls -l (dossier)', 'ls -l (डायरेक्टरी)', 'ls -l（目录）', 'ls -l（目錄）'),
  assignLabel: T('chmod 표기', 'chmod symbolic form', 'Forma simbólica', 'Forma simbólica', 'chmod表記', 'chmod-Schreibweise', 'Forme symbolique', 'chmod रूप', 'chmod 符号写法', 'chmod 符號寫法'),
  binLabel: T('2진수', 'Binary', 'Binario', 'Binário', '2進数', 'Binär', 'Binaire', 'द्विआधारी', '二进制', '二進位'),
  decimalLabel: T('10진수', 'Decimal', 'Decimal', 'Decimal', '10進数', 'Dezimal', 'Décimal', 'दशमलव', '十进制', '十進位'),
  umaskDirLabel: T('umask (디렉터리)', 'umask (directory)', 'umask (directorio)', 'umask (diretório)', 'umask（ディレクトリ）', 'umask (Verzeichnis)', 'umask (dossier)', 'umask (डायरेक्टरी)', 'umask（目录）', 'umask（目錄）'),
  umaskFileLabel: T('umask (파일)', 'umask (file)', 'umask (archivo)', 'umask (arquivo)', 'umask（ファイル）', 'umask (Datei)', 'umask (fichier)', 'umask (फ़ाइल)', 'umask（文件）', 'umask（檔案）'),

  umaskNone: T(
    '실행 비트는 파일에 처음부터 없어 umask로는 낼 수 없습니다',
    'Not reachable — new files never start with the execute bit',
    'No se alcanza: los archivos nuevos nunca nacen con el bit de ejecución',
    'Não dá: arquivos novos nunca nascem com o bit de execução',
    '新しいファイルに実行ビットは付かないので出せません',
    'Nicht erreichbar — neue Dateien haben nie das Ausführungs-Bit',
    'Impossible : un fichier neuf ne reçoit jamais le bit d’exécution',
    'संभव नहीं — नई फ़ाइलों में एक्ज़ीक्यूट बिट कभी नहीं आता',
    '做不到——新文件本来就不带执行位',
    '做不到——新檔案本來就不帶執行位',
  ),

  commandLabel: T('명령', 'Command', 'Orden', 'Comando', 'コマンド', 'Befehl', 'Commande', 'कमांड', '命令', '命令'),

  gridTitle: T('누가 무엇을 할 수 있나', 'Who can do what', 'Quién puede hacer qué', 'Quem pode fazer o quê', '誰が何をできるか', 'Wer darf was', 'Qui peut faire quoi', 'कौन क्या कर सकता है', '谁能做什么', '誰能做什麼'),

  gridNote: T(
    '세 줄이 소유자·그룹·기타이고, 세 칸이 읽기·쓰기·실행입니다. 파일에서는 실행이지만 폴더에서는 안으로 들어가는 권한입니다.',
    'Three rows for owner, group and others; three columns for read, write and execute. On a folder that last one means the right to go inside.',
    'Tres filas para dueño, grupo y otros; tres columnas para leer, escribir y ejecutar. En una carpeta, la última es el derecho a entrar.',
    'Três linhas para dono, grupo e outros; três colunas para ler, escrever e executar. Numa pasta, a última é o direito de entrar.',
    '三つの行が持ち主・グループ・その他、三つの升が読み・書き・実行です。フォルダではその最後が「中に入る」権利になります。',
    'Drei Zeilen für Eigentümer, Gruppe und Andere; drei Spalten für Lesen, Schreiben, Ausführen. Bei einem Ordner heißt Letzteres: hineingehen dürfen.',
    'Trois lignes pour le propriétaire, le groupe et les autres ; trois colonnes pour lire, écrire, exécuter. Sur un dossier, la dernière donne le droit d’entrer.',
    'तीन पंक्तियाँ — मालिक, समूह, अन्य; तीन स्तंभ — पढ़ना, लिखना, चलाना। फ़ोल्डर पर आखिरी का मतलब है भीतर जाने का हक।',
    '三行是所有者、组、其他人，三列是读、写、执行。在文件夹上，最后一项是“能不能进去”。',
    '三列是擁有者、群組、其他人，三欄是讀、寫、執行。在資料夾上，最後一項是「能不能進去」。',
  ),

  dangerTitle: T('누구나 고칠 수 있습니다', 'Anyone can change it', 'Cualquiera puede cambiarlo', 'Qualquer um pode alterar', '誰でも書き換えられます', 'Jeder kann es ändern', 'N’importe qui peut le modifier', 'कोई भी बदल सकता है', '谁都能改', '誰都能改'),

  dangerNote: T(
    '기타 자리에 쓰기가 열려 있습니다. 이 서버에 들어올 수 있는 누구든 내용을 바꿀 수 있으니, 웹 폴더나 설정 파일에는 두지 않는 편이 좋습니다.',
    'The write bit is open to everyone. Anybody who reaches this machine can change the contents, so keep it away from web folders and config files.',
    'El bit de escritura está abierto a todos. Cualquiera que llegue a esta máquina puede cambiar el contenido: mejor no usarlo en carpetas web ni en configuración.',
    'O bit de escrita está aberto a todos. Qualquer um que alcance esta máquina pode mudar o conteúdo, então evite em pastas web e arquivos de configuração.',
    'その他の書き込みが開いています。この機械に届く人なら誰でも中身を変えられるので、ウェブ用フォルダや設定ファイルには使わないほうがよいです。',
    'Das Schreibrecht steht allen offen. Wer diese Maschine erreicht, kann den Inhalt ändern — für Web-Ordner und Konfigurationsdateien also ungeeignet.',
    'Le droit d’écriture est ouvert à tous. Quiconque atteint cette machine peut modifier le contenu : à éviter pour les dossiers web et les fichiers de configuration.',
    'लिखने का बिट सबके लिए खुला है। जो भी इस मशीन तक पहुँचे, सामग्री बदल सकता है — वेब फ़ोल्डर और कॉन्फ़िग के लिए ठीक नहीं।',
    '其他人的写权限是开着的。凡是能碰到这台机器的人都能改内容，网站目录和配置文件不要这么设。',
    '其他人的寫權限是開著的。凡是能碰到這台機器的人都能改內容，網站目錄和設定檔不要這麼設。',
  ),

  fileDirNote: T(
    '폴더에서는 실행 비트가 "안으로 들어가기"입니다. 읽기만 있고 실행이 없으면 목록은 보이는데 그 안의 파일은 열 수 없습니다.',
    'On a folder the execute bit means going inside. With read but no execute you can list the names yet open nothing in it.',
    'En una carpeta, el bit de ejecución significa entrar. Con lectura pero sin ejecución ves los nombres pero no abres nada.',
    'Numa pasta, o bit de execução significa entrar. Com leitura mas sem execução você vê os nomes mas não abre nada.',
    'フォルダでは実行ビットが「中に入る」ことです。読みだけあって実行がないと、名前は見えるのに中のファイルは開けません。',
    'Bei einem Ordner bedeutet das Ausführungs-Bit: hineingehen. Mit Lesen, aber ohne Ausführen, sieht man die Namen und öffnet doch nichts.',
    'Sur un dossier, le bit d’exécution veut dire y entrer. Avec la lecture mais sans l’exécution, on voit les noms sans rien pouvoir ouvrir.',
    'फ़ोल्डर पर एक्ज़ीक्यूट बिट का अर्थ है भीतर जाना। पढ़ना हो पर चलाना न हो तो नाम दिखते हैं, पर कुछ खुलता नहीं।',
    '在文件夹上，执行位的意思是“进得去”。只有读没有执行时，能看到名字却打不开里面的文件。',
    '在資料夾上，執行位的意思是「進得去」。只有讀沒有執行時，能看到名字卻打不開裡面的檔案。',
  ),

  neighbourTitle: T('한 자리만 다른 모드', 'One digit away', 'A un dígito de distancia', 'A um dígito de distância', '一桁だけ違うモード', 'Eine Ziffer entfernt', 'À un chiffre près', 'एक अंक की दूरी पर', '只差一位的模式', '只差一位的模式'),

  desc: T<(f: ChmodFacts) => string>(
    f => `${f.mode}${ko(f.mode, '은', '는')} ${f.symbolic}입니다. 소유자는 ${f.perm.user.digit === 0 ? '아무것도 할 수 없고' : `${f.perm.user.rwx.replace(/-/g, '')}를 쓸 수 있고`}, 기타 사용자는 ${f.perm.other.digit === 0 ? '접근할 수 없습니다' : `${f.perm.other.rwx.replace(/-/g, '')}까지 됩니다`}.${f.worldWritable ? ' 누구나 고칠 수 있는 값입니다.' : ''}`,
    f => `${f.mode} is ${f.symbolic}. The owner ${f.perm.user.digit === 0 ? 'can do nothing' : `gets ${f.perm.user.rwx.replace(/-/g, '')}`}, and everyone else ${f.perm.other.digit === 0 ? 'is shut out' : `gets ${f.perm.other.rwx.replace(/-/g, '')}`}.${f.worldWritable ? ' Anyone at all can change it.' : ''}`,
    f => `${f.mode} es ${f.symbolic}. El dueño ${f.perm.user.digit === 0 ? 'no puede hacer nada' : `tiene ${f.perm.user.rwx.replace(/-/g, '')}`} y los demás ${f.perm.other.digit === 0 ? 'quedan fuera' : `tienen ${f.perm.other.rwx.replace(/-/g, '')}`}.${f.worldWritable ? ' Cualquiera puede modificarlo.' : ''}`,
    f => `${f.mode} é ${f.symbolic}. O dono ${f.perm.user.digit === 0 ? 'não pode nada' : `fica com ${f.perm.user.rwx.replace(/-/g, '')}`} e os demais ${f.perm.other.digit === 0 ? 'ficam de fora' : `ficam com ${f.perm.other.rwx.replace(/-/g, '')}`}.${f.worldWritable ? ' Qualquer um pode alterar.' : ''}`,
    f => `${f.mode}は${f.symbolic}です。持ち主は${f.perm.user.digit === 0 ? '何もできず' : `${f.perm.user.rwx.replace(/-/g, '')}が使え`}、その他の人は${f.perm.other.digit === 0 ? '触れません' : `${f.perm.other.rwx.replace(/-/g, '')}まで使えます`}。${f.worldWritable ? '誰でも書き換えられる値です。' : ''}`,
    f => `${f.mode} ist ${f.symbolic}. Der Eigentümer ${f.perm.user.digit === 0 ? 'darf nichts' : `bekommt ${f.perm.user.rwx.replace(/-/g, '')}`}, alle anderen ${f.perm.other.digit === 0 ? 'bleiben ausgesperrt' : `bekommen ${f.perm.other.rwx.replace(/-/g, '')}`}.${f.worldWritable ? ' Jeder kann es ändern.' : ''}`,
    f => `${f.mode} donne ${f.symbolic}. Le propriétaire ${f.perm.user.digit === 0 ? 'ne peut rien' : `obtient ${f.perm.user.rwx.replace(/-/g, '')}`} et les autres ${f.perm.other.digit === 0 ? 'restent dehors' : `obtiennent ${f.perm.other.rwx.replace(/-/g, '')}`}.${f.worldWritable ? ' N’importe qui peut le modifier.' : ''}`,
    f => `${f.mode} का अर्थ ${f.symbolic} है। मालिक ${f.perm.user.digit === 0 ? 'कुछ नहीं कर सकता' : `${f.perm.user.rwx.replace(/-/g, '')} कर सकता है`}, और बाकी सब ${f.perm.other.digit === 0 ? 'बाहर रहते हैं' : `${f.perm.other.rwx.replace(/-/g, '')} तक कर सकते हैं`}।${f.worldWritable ? ' इसे कोई भी बदल सकता है।' : ''}`,
    f => `${f.mode} 就是 ${f.symbolic}。所有者${f.perm.user.digit === 0 ? '什么都不能做' : `可以 ${f.perm.user.rwx.replace(/-/g, '')}`}，其他人${f.perm.other.digit === 0 ? '完全进不来' : `可以 ${f.perm.other.rwx.replace(/-/g, '')}`}。${f.worldWritable ? '这是谁都能改的值。' : ''}`,
    f => `${f.mode} 就是 ${f.symbolic}。擁有者${f.perm.user.digit === 0 ? '什麼都不能做' : `可以 ${f.perm.user.rwx.replace(/-/g, '')}`}，其他人${f.perm.other.digit === 0 ? '完全進不來' : `可以 ${f.perm.other.rwx.replace(/-/g, '')}`}。${f.worldWritable ? '這是誰都能改的值。' : ''}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '읽기 4, 쓰기 2, 실행 1을 더해 한 자리를 만듭니다. 7은 4+2+1, 5는 4+1입니다.',
      '자리는 왼쪽부터 소유자·그룹·기타입니다.',
      'umask는 깎아 내는 값입니다. 디렉터리는 777에서, 파일은 666에서 깎습니다.',
      '특수 비트(setuid 4000·setgid 2000·스티키 1000)는 앞에 한 자리를 더 붙입니다 — /tmp가 1777입니다.',
    ],
    [
      'Read is 4, write 2, execute 1; add them for one digit. 7 is 4+2+1, 5 is 4+1.',
      'The digits are owner, group, others, left to right.',
      'umask is what gets taken away: from 777 for directories, from 666 for files.',
      'Special bits (setuid 4000, setgid 2000, sticky 1000) add a fourth digit in front — /tmp is 1777.',
    ],
    [
      'Leer vale 4, escribir 2, ejecutar 1; se suman para formar un dígito. 7 es 4+2+1 y 5 es 4+1.',
      'Los dígitos son dueño, grupo y otros, de izquierda a derecha.',
      'umask es lo que se quita: de 777 en directorios y de 666 en archivos.',
      'Los bits especiales (setuid 4000, setgid 2000, sticky 1000) añaden un cuarto dígito delante: /tmp es 1777.',
    ],
    [
      'Ler vale 4, escrever 2, executar 1; soma-se para formar um dígito. 7 é 4+2+1 e 5 é 4+1.',
      'Os dígitos são dono, grupo e outros, da esquerda para a direita.',
      'umask é o que se tira: de 777 em diretórios e de 666 em arquivos.',
      'Os bits especiais (setuid 4000, setgid 2000, sticky 1000) põem um quarto dígito na frente: /tmp é 1777.',
    ],
    [
      '読み4・書き2・実行1を足して一桁にします。7は4+2+1、5は4+1です。',
      '桁は左から持ち主・グループ・その他です。',
      'umaskは削る値です。ディレクトリは777から、ファイルは666から削ります。',
      '特殊ビット（setuid 4000・setgid 2000・スティッキー 1000）は前にもう一桁つきます——/tmpが1777です。',
    ],
    [
      'Lesen ist 4, Schreiben 2, Ausführen 1; addiert ergibt das eine Ziffer. 7 ist 4+2+1, 5 ist 4+1.',
      'Die Ziffern stehen von links für Eigentümer, Gruppe, Andere.',
      'umask ist das, was abgezogen wird: von 777 bei Verzeichnissen, von 666 bei Dateien.',
      'Sonderbits (setuid 4000, setgid 2000, sticky 1000) setzen eine vierte Ziffer davor — /tmp ist 1777.',
    ],
    [
      'Lire vaut 4, écrire 2, exécuter 1 ; on additionne pour un chiffre. 7 = 4+2+1, 5 = 4+1.',
      'Les chiffres sont, de gauche à droite : propriétaire, groupe, autres.',
      'umask est ce qu’on retranche : de 777 pour les dossiers, de 666 pour les fichiers.',
      'Les bits spéciaux (setuid 4000, setgid 2000, sticky 1000) ajoutent un quatrième chiffre devant — /tmp vaut 1777.',
    ],
    [
      'पढ़ना 4, लिखना 2, चलाना 1 — जोड़कर एक अंक बनता है। 7 यानी 4+2+1, 5 यानी 4+1।',
      'अंक बाएँ से दाएँ मालिक, समूह और अन्य के हैं।',
      'umask वह है जो घटाया जाता है: डायरेक्टरी में 777 से, फ़ाइल में 666 से।',
      'विशेष बिट (setuid 4000, setgid 2000, sticky 1000) आगे चौथा अंक जोड़ते हैं — /tmp 1777 है।',
    ],
    [
      '读 4、写 2、执行 1，加起来成为一位。7 是 4+2+1，5 是 4+1。',
      '三位从左到右是所有者、组、其他人。',
      'umask 是要减掉的值：目录从 777 减，文件从 666 减。',
      '特殊位（setuid 4000、setgid 2000、粘滞位 1000）会在前面多一位——/tmp 就是 1777。',
    ],
    [
      '讀 4、寫 2、執行 1，加起來成為一位。7 是 4+2+1，5 是 4+1。',
      '三位從左到右是擁有者、群組、其他人。',
      'umask 是要減掉的值：目錄從 777 減，檔案從 666 減。',
      '特殊位（setuid 4000、setgid 2000、黏著位 1000）會在前面多一位——/tmp 就是 1777。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'chmod 권한표 — 755·644가 무엇을 여는가',
    'chmod reference — what 755 and 644 actually open',
    'Tabla de chmod — qué abren 755 y 644',
    'Tabela do chmod — o que 755 e 644 abrem',
    'chmod 権限表 — 755と644が何を開くのか',
    'chmod-Tabelle — was 755 und 644 wirklich freigeben',
    'Table chmod — ce qu’ouvrent vraiment 755 et 644',
    'chmod तालिका — 755 और 644 क्या खोलते हैं',
    'chmod 权限表 — 755 和 644 到底放开了什么',
    'chmod 權限表 — 755 和 644 到底放開了什麼',
  ),

  hubMetaDesc: T(
    '권한 모드 125가지를 한 장씩. rwx 표기와 ls -l 줄, umask와 누가 무엇을 할 수 있는지를 세 자리 숫자에서 계산했습니다.',
    '125 permission modes, one page each: the rwx form, the ls -l line, the umask and who can do what — all from three digits.',
    '125 modos de permiso, uno por página: la forma rwx, la línea de ls -l, el umask y quién puede hacer qué, todo desde tres dígitos.',
    '125 modos de permissão, um por página: a forma rwx, a linha do ls -l, o umask e quem pode o quê — tudo a partir de três dígitos.',
    '権限モード125種を1ページずつ。rwx表記、ls -lの行、umask、誰が何をできるかを三桁の数字から計算しました。',
    '125 Rechtemodi, je eine Seite: die rwx-Form, die ls -l-Zeile, die umask und wer was darf — alles aus drei Ziffern.',
    '125 modes de permission, une page chacun : la forme rwx, la ligne ls -l, l’umask et qui peut quoi — le tout depuis trois chiffres.',
    '125 अनुमति मोड, एक-एक पृष्ठ: rwx रूप, ls -l की पंक्ति, umask और कौन क्या कर सकता है — सब तीन अंकों से।',
    '125 种权限模式各一页：rwx 写法、ls -l 那一行、umask，以及谁能做什么，全部由三位数字算出。',
    '125 種權限模式各一頁：rwx 寫法、ls -l 那一行、umask，以及誰能做什麼，全部由三位數字算出。',
  ),

  metaTitle: T<(f: ChmodFacts) => string>(
    f => `chmod ${f.mode} — ${f.symbolic} 권한`,
    f => `chmod ${f.mode} — the ${f.symbolic} permission`,
    f => `chmod ${f.mode} — permiso ${f.symbolic}`,
    f => `chmod ${f.mode} — permissão ${f.symbolic}`,
    f => `chmod ${f.mode} — ${f.symbolic} 権限`,
    f => `chmod ${f.mode} — Rechte ${f.symbolic}`,
    f => `chmod ${f.mode} — permission ${f.symbolic}`,
    f => `chmod ${f.mode} — ${f.symbolic} अनुमति`,
    f => `chmod ${f.mode} — ${f.symbolic} 权限`,
    f => `chmod ${f.mode} — ${f.symbolic} 權限`,
  ),

  metaDesc: T<(f: ChmodFacts) => string>(
    f => `chmod ${f.mode}은 ${f.symbolic}이고 ls -l에서는 ${f.lsFile}로 보입니다. chmod ${f.assign}과 같고, 디렉터리 umask로는 ${f.umaskDir}입니다.`,
    f => `chmod ${f.mode} is ${f.symbolic}, shown by ls -l as ${f.lsFile}. It equals chmod ${f.assign}, and as a directory umask it is ${f.umaskDir}.`,
    f => `chmod ${f.mode} es ${f.symbolic} y ls -l lo muestra como ${f.lsFile}. Equivale a chmod ${f.assign}, y como umask de directorio es ${f.umaskDir}.`,
    f => `chmod ${f.mode} é ${f.symbolic} e o ls -l mostra ${f.lsFile}. Equivale a chmod ${f.assign}, e como umask de diretório é ${f.umaskDir}.`,
    f => `chmod ${f.mode}は${f.symbolic}で、ls -lでは${f.lsFile}と出ます。chmod ${f.assign}と同じで、ディレクトリのumaskでは${f.umaskDir}です。`,
    f => `chmod ${f.mode} ist ${f.symbolic}, in ls -l als ${f.lsFile}. Es entspricht chmod ${f.assign}, als Verzeichnis-umask ${f.umaskDir}.`,
    f => `chmod ${f.mode} vaut ${f.symbolic} et ls -l affiche ${f.lsFile}. C’est chmod ${f.assign}, et en umask de dossier ${f.umaskDir}.`,
    f => `chmod ${f.mode} यानी ${f.symbolic}, ls -l में ${f.lsFile}। यह chmod ${f.assign} के बराबर है, और डायरेक्टरी umask में ${f.umaskDir}।`,
    f => `chmod ${f.mode} 就是 ${f.symbolic}，ls -l 里显示为 ${f.lsFile}。它等同于 chmod ${f.assign}，作为目录 umask 是 ${f.umaskDir}。`,
    f => `chmod ${f.mode} 就是 ${f.symbolic}，ls -l 裡顯示為 ${f.lsFile}。它等同於 chmod ${f.assign}，作為目錄 umask 是 ${f.umaskDir}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '755와 644는 무엇이 다른가요?', a: '실행 비트 하나 차이입니다. 755는 누구나 실행하거나 폴더에 들어갈 수 있고, 644는 읽기만 됩니다. 폴더에는 755, 보통 파일에는 644를 씁니다.' },
      { q: '777로 하면 왜 안 되나요?', a: '그 기계에 닿는 누구든 내용을 바꿀 수 있기 때문입니다. 권한 문제로 막힐 때 777로 여는 것은 문 자체를 떼어 내는 셈입니다.' },
      { q: 'umask 022는 무슨 뜻인가요?', a: '깎아 낼 값입니다. 디렉터리는 777에서 022를 깎아 755, 파일은 666에서 깎아 644가 됩니다.' },
      { q: '앞자리가 넷인 1777은 무엇인가요?', a: '맨 앞은 특수 비트입니다. 1은 스티키 비트로, /tmp처럼 누구나 쓸 수 있지만 남의 파일은 못 지우게 합니다.' },
      { q: '폴더에서 실행 권한은 무슨 뜻인가요?', a: '안으로 들어가는 권한입니다. 읽기만 있으면 이름 목록은 보이지만 그 안의 파일은 열 수 없습니다.' },
    ],
    [
      { q: 'What is the difference between 755 and 644?', a: 'One execute bit. 755 lets anyone run the file or step into the folder; 644 is read-only for others. Folders get 755, ordinary files 644.' },
      { q: 'Why not just use 777?', a: 'Because anyone who reaches the machine can then change the contents. Opening 777 to get past a permission error is taking the door off its hinges.' },
      { q: 'What does umask 022 mean?', a: 'It is what gets subtracted. Directories start at 777 and become 755; files start at 666 and become 644.' },
      { q: 'What is 1777, with four digits?', a: 'The leading digit is the special bits. The 1 is the sticky bit: on /tmp everyone may write, but nobody may delete another’s files.' },
      { q: 'What does execute mean on a folder?', a: 'The right to go inside. With read alone you can list the names but open nothing within.' },
    ],
    [
      { q: '¿En qué se diferencian 755 y 644?', a: 'En un bit de ejecución. Con 755 cualquiera ejecuta el archivo o entra en la carpeta; con 644 los demás solo leen. Carpetas 755, archivos normales 644.' },
      { q: '¿Por qué no usar 777?', a: 'Porque entonces cualquiera que llegue a la máquina puede cambiar el contenido. Poner 777 para saltarse un error de permisos es quitar la puerta.' },
      { q: '¿Qué significa umask 022?', a: 'Es lo que se resta. Los directorios parten de 777 y quedan en 755; los archivos parten de 666 y quedan en 644.' },
      { q: '¿Qué es 1777, con cuatro dígitos?', a: 'El primero son los bits especiales. El 1 es el sticky bit: en /tmp todos escriben, pero nadie borra los archivos de otro.' },
      { q: '¿Qué significa ejecutar en una carpeta?', a: 'El derecho a entrar. Con solo lectura ves la lista de nombres pero no abres nada dentro.' },
    ],
    [
      { q: 'Qual a diferença entre 755 e 644?', a: 'Um bit de execução. Com 755 qualquer um roda o arquivo ou entra na pasta; com 644 os outros só leem. Pastas 755, arquivos comuns 644.' },
      { q: 'Por que não usar 777?', a: 'Porque aí qualquer um que alcance a máquina muda o conteúdo. Pôr 777 para escapar de um erro de permissão é tirar a porta.' },
      { q: 'O que significa umask 022?', a: 'É o que se subtrai. Diretórios partem de 777 e ficam 755; arquivos partem de 666 e ficam 644.' },
      { q: 'O que é 1777, com quatro dígitos?', a: 'O primeiro são os bits especiais. O 1 é o sticky bit: em /tmp todos escrevem, mas ninguém apaga arquivo alheio.' },
      { q: 'O que significa executar numa pasta?', a: 'O direito de entrar. Só com leitura você vê os nomes mas não abre nada lá dentro.' },
    ],
    [
      { q: '755と644は何が違いますか？', a: '実行ビット一つの差です。755は誰でも実行でき、フォルダにも入れます。644は他人には読みだけ。フォルダは755、普通のファイルは644です。' },
      { q: '777にしてはいけないのはなぜですか？', a: 'その機械に届く人なら誰でも中身を変えられるからです。権限エラーを避けるために777にするのは、扉ごと外すようなものです。' },
      { q: 'umask 022はどういう意味ですか？', a: '削る値です。ディレクトリは777から削って755、ファイルは666から削って644になります。' },
      { q: '四桁の1777とは何ですか？', a: '先頭は特殊ビットです。1はスティッキービットで、/tmpのように誰でも書けるが他人のファイルは消せないようにします。' },
      { q: 'フォルダの実行権限とは何ですか？', a: '中に入る権利です。読みだけあると名前の一覧は見えても、中のファイルは開けません。' },
    ],
    [
      { q: 'Was unterscheidet 755 von 644?', a: 'Ein Ausführungs-Bit. Bei 755 darf jeder die Datei starten oder den Ordner betreten; bei 644 lesen die anderen nur. Ordner 755, gewöhnliche Dateien 644.' },
      { q: 'Warum nicht einfach 777?', a: 'Weil dann jeder, der die Maschine erreicht, den Inhalt ändern kann. 777 gegen einen Rechtefehler zu setzen heißt, die Tür auszuhängen.' },
      { q: 'Was bedeutet umask 022?', a: 'Es ist der Abzug. Verzeichnisse starten bei 777 und werden 755, Dateien starten bei 666 und werden 644.' },
      { q: 'Was ist 1777 mit vier Ziffern?', a: 'Die erste Ziffer sind die Sonderbits. Die 1 ist das Sticky-Bit: In /tmp darf jeder schreiben, aber niemand fremde Dateien löschen.' },
      { q: 'Was heißt Ausführen bei einem Ordner?', a: 'Das Recht hineinzugehen. Mit Lesen allein sieht man die Namen und öffnet doch nichts darin.' },
    ],
    [
      { q: 'Quelle différence entre 755 et 644 ?', a: 'Un bit d’exécution. Avec 755, chacun peut lancer le fichier ou entrer dans le dossier ; avec 644, les autres ne font que lire. Dossiers 755, fichiers ordinaires 644.' },
      { q: 'Pourquoi ne pas mettre 777 ?', a: 'Parce que quiconque atteint la machine peut alors modifier le contenu. Mettre 777 pour contourner une erreur de permission, c’est enlever la porte.' },
      { q: 'Que veut dire umask 022 ?', a: 'C’est ce qu’on retranche. Les dossiers partent de 777 et deviennent 755 ; les fichiers partent de 666 et deviennent 644.' },
      { q: 'Qu’est-ce que 1777, à quatre chiffres ?', a: 'Le premier chiffre porte les bits spéciaux. Le 1 est le sticky bit : dans /tmp tout le monde écrit, mais personne n’efface les fichiers d’autrui.' },
      { q: 'Que signifie l’exécution sur un dossier ?', a: 'Le droit d’y entrer. Avec la lecture seule, on voit la liste des noms sans rien pouvoir ouvrir.' },
    ],
    [
      { q: '755 और 644 में क्या फर्क है?', a: 'एक एक्ज़ीक्यूट बिट का। 755 में कोई भी फ़ाइल चला सकता है या फ़ोल्डर में घुस सकता है; 644 में बाकी सिर्फ़ पढ़ते हैं। फ़ोल्डर 755, सामान्य फ़ाइलें 644।' },
      { q: '777 क्यों न लगाएँ?', a: 'क्योंकि तब मशीन तक पहुँचने वाला कोई भी सामग्री बदल सकता है। अनुमति की त्रुटि से बचने को 777 लगाना दरवाज़ा ही उतार देना है।' },
      { q: 'umask 022 का क्या अर्थ है?', a: 'यह घटाने का मान है। डायरेक्टरी 777 से घटकर 755, फ़ाइल 666 से घटकर 644 हो जाती है।' },
      { q: 'चार अंकों वाला 1777 क्या है?', a: 'पहला अंक विशेष बिट है। 1 स्टिकी बिट है: /tmp में सब लिख सकते हैं, पर किसी और की फ़ाइल मिटा नहीं सकते।' },
      { q: 'फ़ोल्डर पर एक्ज़ीक्यूट का क्या अर्थ है?', a: 'भीतर जाने का हक। सिर्फ़ पढ़ने से नामों की सूची दिखती है, पर भीतर कुछ खुलता नहीं।' },
    ],
    [
      { q: '755 和 644 差在哪里？', a: '差一个执行位。755 让任何人都能运行文件或进入目录，644 对别人只是可读。目录用 755，普通文件用 644。' },
      { q: '为什么不要用 777？', a: '因为凡是能碰到这台机器的人都能改内容。为了绕过权限报错而设 777，等于把门直接拆了。' },
      { q: 'umask 022 是什么意思？', a: '它是要减掉的值。目录从 777 减成 755，文件从 666 减成 644。' },
      { q: '四位的 1777 是什么？', a: '最前面一位是特殊位。1 是粘滞位：/tmp 那样大家都能写，但谁也删不了别人的文件。' },
      { q: '目录上的执行权限是什么意思？', a: '是“能进去”的权限。只有读权限时，能列出名字却打不开里面的文件。' },
    ],
    [
      { q: '755 和 644 差在哪裡？', a: '差一個執行位。755 讓任何人都能執行檔案或進入目錄，644 對別人只是可讀。目錄用 755，一般檔案用 644。' },
      { q: '為什麼不要用 777？', a: '因為凡是能碰到這台機器的人都能改內容。為了繞過權限錯誤而設 777，等於把門直接拆了。' },
      { q: 'umask 022 是什麼意思？', a: '它是要減掉的值。目錄從 777 減成 755，檔案從 666 減成 644。' },
      { q: '四位的 1777 是什麼？', a: '最前面一位是特殊位。1 是黏著位：/tmp 那樣大家都能寫，但誰也刪不了別人的檔案。' },
      { q: '目錄上的執行權限是什麼意思？', a: '是「能進去」的權限。只有讀權限時，能列出名字卻打不開裡面的檔案。' },
    ],
  ),

  modeFaq: T<(f: ChmodFacts) => FaqItem[]>(
    f => [
      { q: `chmod ${f.mode}${ko(f.mode, '은', '는')} 무슨 뜻인가요?`, a: `${f.symbolic}입니다. ls -l에서는 파일이 ${f.lsFile}, 디렉터리가 ${f.lsDir}로 보입니다.` },
      { q: `${f.mode}${ko(f.mode, '을', '를')} rwx로 쓰면?`, a: `chmod ${f.assign} 과 같습니다.` },
      { q: `${f.mode}에서 다른 사람은 무엇을 할 수 있나요?`, a: f.perm.other.digit === 0 ? '아무것도 할 수 없습니다. 소유자와 그룹만 접근합니다.' : `${f.perm.other.rwx}만큼 됩니다${f.worldWritable ? ' — 쓰기까지 열려 있어 누구나 내용을 바꿀 수 있습니다.' : '.'}` },
      { q: `${f.mode}${ko(f.mode, '이', '가')} 되게 하려면 umask는 얼마인가요?`, a: `디렉터리는 ${f.umaskDir}입니다. ${f.umaskFile ? `파일도 ${f.umaskFile}로 같은 결과가 나옵니다.` : '파일에는 실행 비트가 처음부터 없어 umask만으로는 낼 수 없습니다.'}` },
    ],
    f => [
      { q: `What does chmod ${f.mode} mean?`, a: `It is ${f.symbolic}. ls -l shows a file as ${f.lsFile} and a directory as ${f.lsDir}.` },
      { q: `How is ${f.mode} written in rwx form?`, a: `It is the same as chmod ${f.assign}.` },
      { q: `What can other people do with ${f.mode}?`, a: f.perm.other.digit === 0 ? 'Nothing. Only the owner and the group get in.' : `They get ${f.perm.other.rwx}${f.worldWritable ? ' — write included, so anyone can change the contents.' : '.'}` },
      { q: `Which umask produces ${f.mode}?`, a: `${f.umaskDir} for directories. ${f.umaskFile ? `The same ${f.umaskFile} gives it for files too.` : 'For files it cannot be reached by umask alone, since new files never carry the execute bit.'}` },
    ],
    f => [
      { q: `¿Qué significa chmod ${f.mode}?`, a: `Es ${f.symbolic}. ls -l muestra un archivo como ${f.lsFile} y un directorio como ${f.lsDir}.` },
      { q: `¿Cómo se escribe ${f.mode} en forma rwx?`, a: `Es lo mismo que chmod ${f.assign}.` },
      { q: `¿Qué pueden hacer los demás con ${f.mode}?`, a: f.perm.other.digit === 0 ? 'Nada. Solo entran el dueño y el grupo.' : `Tienen ${f.perm.other.rwx}${f.worldWritable ? ', con escritura incluida: cualquiera puede cambiar el contenido.' : '.'}` },
      { q: `¿Qué umask produce ${f.mode}?`, a: `${f.umaskDir} para directorios. ${f.umaskFile ? `El mismo ${f.umaskFile} lo da también para archivos.` : 'En archivos no se alcanza solo con umask, porque los nuevos nunca llevan el bit de ejecución.'}` },
    ],
    f => [
      { q: `O que significa chmod ${f.mode}?`, a: `É ${f.symbolic}. O ls -l mostra um arquivo como ${f.lsFile} e um diretório como ${f.lsDir}.` },
      { q: `Como se escreve ${f.mode} na forma rwx?`, a: `É o mesmo que chmod ${f.assign}.` },
      { q: `O que os outros podem fazer com ${f.mode}?`, a: f.perm.other.digit === 0 ? 'Nada. Só o dono e o grupo entram.' : `Eles ficam com ${f.perm.other.rwx}${f.worldWritable ? ', escrita inclusive: qualquer um pode mudar o conteúdo.' : '.'}` },
      { q: `Qual umask produz ${f.mode}?`, a: `${f.umaskDir} para diretórios. ${f.umaskFile ? `O mesmo ${f.umaskFile} vale para arquivos.` : 'Em arquivos não dá só com umask, porque os novos nunca trazem o bit de execução.'}` },
    ],
    f => [
      { q: `chmod ${f.mode}はどういう意味ですか？`, a: `${f.symbolic}です。ls -lではファイルが${f.lsFile}、ディレクトリが${f.lsDir}と出ます。` },
      { q: `${f.mode}をrwxで書くと？`, a: `chmod ${f.assign} と同じです。` },
      { q: `${f.mode}で他の人は何ができますか？`, a: f.perm.other.digit === 0 ? '何もできません。持ち主とグループだけが触れます。' : `${f.perm.other.rwx}までできます${f.worldWritable ? '——書き込みまで開いているので、誰でも中身を変えられます。' : '。'}` },
      { q: `${f.mode}にするumaskはいくつですか？`, a: `ディレクトリは${f.umaskDir}です。${f.umaskFile ? `ファイルも${f.umaskFile}で同じ結果になります。` : 'ファイルには実行ビットが最初から付かないので、umaskだけでは出せません。'}` },
    ],
    f => [
      { q: `Was bedeutet chmod ${f.mode}?`, a: `Es ist ${f.symbolic}. ls -l zeigt eine Datei als ${f.lsFile}, ein Verzeichnis als ${f.lsDir}.` },
      { q: `Wie schreibt man ${f.mode} in rwx-Form?`, a: `Dasselbe wie chmod ${f.assign}.` },
      { q: `Was dürfen andere bei ${f.mode}?`, a: f.perm.other.digit === 0 ? 'Nichts. Nur Eigentümer und Gruppe kommen hinein.' : `Sie bekommen ${f.perm.other.rwx}${f.worldWritable ? ' — samt Schreiben, jeder kann also den Inhalt ändern.' : '.'}` },
      { q: `Welche umask ergibt ${f.mode}?`, a: `${f.umaskDir} bei Verzeichnissen. ${f.umaskFile ? `Dieselbe ${f.umaskFile} liefert es auch bei Dateien.` : 'Bei Dateien ist es mit umask allein nicht zu erreichen, da neue Dateien nie das Ausführungs-Bit tragen.'}` },
    ],
    f => [
      { q: `Que signifie chmod ${f.mode} ?`, a: `C’est ${f.symbolic}. ls -l affiche un fichier ${f.lsFile} et un dossier ${f.lsDir}.` },
      { q: `Comment écrit-on ${f.mode} en rwx ?`, a: `C’est équivalent à chmod ${f.assign}.` },
      { q: `Que peuvent faire les autres avec ${f.mode} ?`, a: f.perm.other.digit === 0 ? 'Rien. Seuls le propriétaire et le groupe entrent.' : `Ils obtiennent ${f.perm.other.rwx}${f.worldWritable ? ', écriture comprise : n’importe qui peut modifier le contenu.' : '.'}` },
      { q: `Quelle umask donne ${f.mode} ?`, a: `${f.umaskDir} pour les dossiers. ${f.umaskFile ? `La même ${f.umaskFile} le donne aussi pour les fichiers.` : 'Pour les fichiers, l’umask seule n’y suffit pas : un fichier neuf ne porte jamais le bit d’exécution.'}` },
    ],
    f => [
      { q: `chmod ${f.mode} का क्या अर्थ है?`, a: `यह ${f.symbolic} है। ls -l में फ़ाइल ${f.lsFile} और डायरेक्टरी ${f.lsDir} दिखती है।` },
      { q: `${f.mode} को rwx रूप में कैसे लिखें?`, a: `यह chmod ${f.assign} के बराबर है।` },
      { q: `${f.mode} में दूसरे लोग क्या कर सकते हैं?`, a: f.perm.other.digit === 0 ? 'कुछ नहीं। केवल मालिक और समूह पहुँच सकते हैं।' : `उन्हें ${f.perm.other.rwx} मिलता है${f.worldWritable ? ' — लिखना भी, यानी कोई भी सामग्री बदल सकता है।' : '।'}` },
      { q: `${f.mode} के लिए umask क्या होगा?`, a: `डायरेक्टरी के लिए ${f.umaskDir}। ${f.umaskFile ? `फ़ाइल के लिए भी ${f.umaskFile} से यही मिलता है।` : 'फ़ाइल में केवल umask से यह नहीं मिलता, क्योंकि नई फ़ाइल में एक्ज़ीक्यूट बिट होता ही नहीं।'}` },
    ],
    f => [
      { q: `chmod ${f.mode} 是什么意思？`, a: `就是 ${f.symbolic}。ls -l 里文件显示为 ${f.lsFile}，目录显示为 ${f.lsDir}。` },
      { q: `${f.mode} 用 rwx 写法怎么写？`, a: `等同于 chmod ${f.assign}。` },
      { q: `在 ${f.mode} 下别人能做什么？`, a: f.perm.other.digit === 0 ? '什么都做不了，只有所有者和组能进来。' : `他们有 ${f.perm.other.rwx}${f.worldWritable ? '——连写都开着，谁都能改内容。' : '。'}` },
      { q: `要得到 ${f.mode}，umask 设多少？`, a: `目录是 ${f.umaskDir}。${f.umaskFile ? `文件同样用 ${f.umaskFile} 就能得到。` : '文件光靠 umask 得不到，因为新文件本来就不带执行位。'}` },
    ],
    f => [
      { q: `chmod ${f.mode} 是什麼意思？`, a: `就是 ${f.symbolic}。ls -l 裡檔案顯示為 ${f.lsFile}，目錄顯示為 ${f.lsDir}。` },
      { q: `${f.mode} 用 rwx 寫法怎麼寫？`, a: `等同於 chmod ${f.assign}。` },
      { q: `在 ${f.mode} 下別人能做什麼？`, a: f.perm.other.digit === 0 ? '什麼都做不了，只有擁有者和群組能進來。' : `他們有 ${f.perm.other.rwx}${f.worldWritable ? '——連寫都開著，誰都能改內容。' : '。'}` },
      { q: `要得到 ${f.mode}，umask 設多少？`, a: `目錄是 ${f.umaskDir}。${f.umaskFile ? `檔案同樣用 ${f.umaskFile} 就能得到。` : '檔案光靠 umask 得不到，因為新檔案本來就不帶執行位。'}` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const CHMOD_UI: L<ChmodUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<ChmodUI>;
