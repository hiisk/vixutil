/**
 * 명령어 화면의 문구 — 열 언어.
 *
 * 명령마다 다른 설명은 desc.ts에 있고, 여기에는 화면 틀과 갈래 이름만 둔다.
 * 명령 이름·옵션·예시는 프로그램이 정한 것이라 옮기지 않는다 — `ls -la`를
 * 번역하면 그대로 치면 안 되는 문자열이 된다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { CmdCategory } from './types.ts';
import type { CmdFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface CmdUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  hubNotice: string;
  catLabel: Record<CmdCategory, string>;
  catNote: Record<CmdCategory, string>;
  usageTitle: string;
  flagsTitle: string;
  flagCol: string;
  meaningCol: string;
  examplesTitle: string;
  relatedTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  copyLabel: string;
  copiedLabel: string;
  manLabel: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string) => string;
  metaDesc: (name: string, desc: string) => string;
  hubFaq: FaqItem[];
  itemFaq: (f: CmdFacts, desc: string, cat: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof CmdUI]: L<CmdUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T(
    '터미널 명령어', 'Terminal commands', 'Comandos de terminal', 'Comandos de terminal',
    'ターミナルのコマンド', 'Terminal-Befehle', 'Commandes du terminal',
    'टर्मिनल कमांड', '终端命令', '終端機命令',
  ),

  hubTitle: T(
    '터미널 명령어 사전',
    'Terminal command reference',
    'Referencia de comandos de terminal',
    'Referência de comandos de terminal',
    'ターミナルコマンド事典',
    'Terminal-Befehle im Überblick',
    'Répertoire des commandes du terminal',
    'टर्मिनल कमांड की सूची',
    '终端命令速查',
    '終端機命令速查',
  ),

  hubLead: T(
    '파일·텍스트·git·프로세스·네트워크까지, 옵션과 예시를 함께 보는 명령어 {n}가지',
    '{n} commands with the flags people actually reach for and a worked example each',
    '{n} comandos con las opciones que de verdad se usan y un ejemplo de cada uno',
    '{n} comandos com as opções que se usam de verdade e um exemplo de cada',
    'ファイル・テキスト・git・プロセス・ネットワークまで、よく使うオプションと例つきで{n}件',
    '{n} Befehle mit den Optionen, die man wirklich braucht, und je einem Beispiel',
    '{n} commandes avec les options qu’on utilise vraiment et un exemple pour chacune',
    'फ़ाइल, टेक्स्ट, git, प्रोसेस और नेटवर्क — काम आने वाले विकल्पों और उदाहरण के साथ {n} कमांड',
    '文件、文本、git、进程、网络——{n} 条命令，附常用选项和示例',
    '檔案、文字、git、行程、網路——{n} 條命令，附常用選項和範例',
  ),

  hubNotice: T(
    '⌨️ 명령과 옵션은 그대로 치는 것이라 번역하지 않습니다. 설명만 언어를 따릅니다.',
    '⌨️ Commands and flags are typed as-is, so they are never translated — only the explanations follow your language.',
    '⌨️ Los comandos y las opciones se escriben tal cual, así que no se traducen: solo las explicaciones cambian de idioma.',
    '⌨️ Comandos e opções são digitados como estão, então não se traduzem: só as explicações mudam de idioma.',
    '⌨️ コマンドとオプションはそのまま打つものなので訳しません。説明だけが言語に合わせて変わります。',
    '⌨️ Befehle und Optionen werden so eingegeben, wie sie stehen, und deshalb nicht übersetzt — nur die Erklärungen folgen deiner Sprache.',
    '⌨️ Les commandes et les options se tapent telles quelles : elles ne sont pas traduites, seules les explications suivent votre langue.',
    '⌨️ कमांड और विकल्प जैसे हैं वैसे ही टाइप होते हैं, इसलिए उनका अनुवाद नहीं होता — सिर्फ़ व्याख्या आपकी भाषा में है।',
    '⌨️ 命令和选项要照原样敲，所以不翻译，只有说明跟着你的语言变。',
    '⌨️ 命令和選項要照原樣打，所以不翻譯，只有說明跟著你的語言變。',
  ),

  catLabel: T(
    { file: '파일·디렉터리', text: '텍스트 처리', perm: '권한·소유', proc: '프로세스·시스템', net: '네트워크', archive: '압축·전송', git: 'git', pkg: '패키지·런타임' },
    { file: 'Files and directories', text: 'Text processing', perm: 'Permissions', proc: 'Processes and system', net: 'Networking', archive: 'Archives', git: 'git', pkg: 'Packages and runtimes' },
    { file: 'Archivos y directorios', text: 'Procesado de texto', perm: 'Permisos', proc: 'Procesos y sistema', net: 'Red', archive: 'Comprimidos', git: 'git', pkg: 'Paquetes y entornos' },
    { file: 'Arquivos e diretórios', text: 'Processamento de texto', perm: 'Permissões', proc: 'Processos e sistema', net: 'Rede', archive: 'Compactação', git: 'git', pkg: 'Pacotes e runtimes' },
    { file: 'ファイルとディレクトリ', text: 'テキスト処理', perm: 'パーミッション', proc: 'プロセスとシステム', net: 'ネットワーク', archive: '圧縮と転送', git: 'git', pkg: 'パッケージと実行環境' },
    { file: 'Dateien und Verzeichnisse', text: 'Textverarbeitung', perm: 'Rechte', proc: 'Prozesse und System', net: 'Netzwerk', archive: 'Archive', git: 'git', pkg: 'Pakete und Laufzeiten' },
    { file: 'Fichiers et répertoires', text: 'Traitement de texte', perm: 'Droits', proc: 'Processus et système', net: 'Réseau', archive: 'Archives', git: 'git', pkg: 'Paquets et runtimes' },
    { file: 'फ़ाइल और डायरेक्टरी', text: 'टेक्स्ट प्रोसेसिंग', perm: 'अनुमतियाँ', proc: 'प्रोसेस और सिस्टम', net: 'नेटवर्क', archive: 'आर्काइव', git: 'git', pkg: 'पैकेज और रनटाइम' },
    { file: '文件与目录', text: '文本处理', perm: '权限与归属', proc: '进程与系统', net: '网络', archive: '压缩与传输', git: 'git', pkg: '包与运行时' },
    { file: '檔案與目錄', text: '文字處理', perm: '權限與擁有者', proc: '行程與系統', net: '網路', archive: '壓縮與傳輸', git: 'git', pkg: '套件與執行環境' },
  ),

  catNote: T(
    {
      file: '옮기고 지우고 찾는 것들. 되돌릴 수 없는 명령이 섞여 있어 -i를 붙이는 습관이 손을 구합니다.',
      text: '파이프로 이어 쓰는 것이 본래 용도입니다. 한 명령이 다 하는 것보다 셋을 잇는 편이 짧습니다.',
      perm: '숫자 모드와 문자 모드가 같은 것을 가리킵니다. 755와 u=rwx,go=rx는 같은 뜻입니다.',
      proc: '무엇이 돌고 있고 무엇이 자원을 먹는지 봅니다. 죽이기 전에 무엇인지 확인하는 것이 순서입니다.',
      net: '연결이 안 될 때 어디까지 갔는지 좁혀 갑니다 — 이름이 안 풀리는지, 길이 없는지, 포트가 막혔는지.',
      archive: '압축과 묶음은 다른 일입니다. tar가 묶고 gzip이 줄이며, .tar.gz는 그 둘을 겹친 것입니다.',
      git: '되돌리는 방법이 여럿이라 헷갈립니다 — 가리키는 곳을 옮기는 것과 새 커밋을 얹는 것은 다릅니다.',
      pkg: '무엇을 어디에 넣는지가 문제입니다. 프로젝트 안인지 시스템 전체인지 먼저 정하세요.',
    },
    {
      file: 'Moving, deleting and finding. Some of these do not ask twice, which is why -i becomes a habit.',
      text: 'These were built to be piped together. Three joined commands are usually shorter than one that does everything.',
      perm: 'Numeric and symbolic modes name the same thing: 755 and u=rwx,go=rx are the same permission.',
      proc: 'What is running and what is eating the machine. Identifying it comes before killing it.',
      net: 'When a connection fails, these narrow down how far it got — name not resolving, no route, or a blocked port.',
      archive: 'Bundling and compressing are separate jobs: tar bundles, gzip shrinks, and .tar.gz is both.',
      git: 'The confusion is that undo has several shapes — moving where a branch points is not the same as adding a commit that reverses it.',
      pkg: 'The question is always what goes where: inside this project, or on the whole machine.',
    },
    {
      file: 'Mover, borrar y buscar. Algunos no preguntan dos veces, y por eso -i se vuelve costumbre.',
      text: 'Están hechos para encadenarse con tuberías. Tres comandos unidos suelen ser más cortos que uno que lo haga todo.',
      perm: 'El modo numérico y el simbólico nombran lo mismo: 755 y u=rwx,go=rx son el mismo permiso.',
      proc: 'Qué se está ejecutando y qué se come la máquina. Identificarlo va antes de matarlo.',
      net: 'Cuando falla una conexión, estos acotan hasta dónde llegó: el nombre no resuelve, no hay ruta o el puerto está cerrado.',
      archive: 'Empaquetar y comprimir son tareas distintas: tar empaqueta, gzip reduce y .tar.gz es lo uno y lo otro.',
      git: 'Lo confuso es que deshacer tiene varias formas: mover a dónde apunta una rama no es lo mismo que añadir un commit que la revierte.',
      pkg: 'La pregunta siempre es qué va dónde: dentro de este proyecto o en todo el sistema.',
    },
    {
      file: 'Mover, apagar e encontrar. Alguns não perguntam duas vezes, e é por isso que -i vira hábito.',
      text: 'Foram feitos para serem encadeados com pipes. Três comandos ligados costumam ser mais curtos que um que faça tudo.',
      perm: 'Modo numérico e simbólico dizem a mesma coisa: 755 e u=rwx,go=rx são a mesma permissão.',
      proc: 'O que está rodando e o que está comendo a máquina. Identificar vem antes de matar.',
      net: 'Quando a conexão falha, estes mostram até onde ela chegou: o nome não resolve, não há rota ou a porta está fechada.',
      archive: 'Empacotar e compactar são coisas diferentes: tar empacota, gzip encolhe e .tar.gz é os dois.',
      git: 'O confuso é que desfazer tem várias formas: mover para onde um branch aponta não é o mesmo que criar um commit que reverte.',
      pkg: 'A pergunta é sempre o que vai onde: dentro deste projeto ou na máquina toda.',
    },
    {
      file: '移したり消したり探したりするものです。聞き返してくれない命令が混ざっているので、-i を付ける癖が手を守ります。',
      text: 'パイプでつないで使うのが本来の形です。ひとつで全部やるより、三つつないだ方が短くなります。',
      perm: '数字モードと記号モードは同じものを指します。755 と u=rwx,go=rx は同じ意味です。',
      proc: '何が動いていて何が資源を食っているかを見ます。止める前に何なのかを確かめるのが順番です。',
      net: 'つながらないとき、どこまで行けたのかを絞ります — 名前が引けないのか、経路がないのか、ポートが閉じているのか。',
      archive: 'まとめることと縮めることは別の仕事です。tar がまとめ、gzip が縮め、.tar.gz はその両方です。',
      git: '取り消しに何通りもあるのが混乱のもとです — ブランチの指す先を動かすのと、打ち消すコミットを積むのは別です。',
      pkg: '何をどこに入れるかが問題です。このプロジェクトの中か、マシン全体かを先に決めてください。',
    },
    {
      file: 'Verschieben, löschen, finden. Manches fragt nicht zweimal — deshalb wird -i zur Gewohnheit.',
      text: 'Sie sind fürs Zusammenstecken mit Pipes gebaut. Drei verkettete Befehle sind meist kürzer als einer, der alles macht.',
      perm: 'Numerischer und symbolischer Modus benennen dasselbe: 755 und u=rwx,go=rx sind dieselbe Berechtigung.',
      proc: 'Was läuft und was die Maschine frisst. Erst herausfinden, was es ist, dann beenden.',
      net: 'Wenn eine Verbindung scheitert, grenzen diese ein, wie weit sie kam — Name löst nicht auf, keine Route, oder der Port ist zu.',
      archive: 'Bündeln und Komprimieren sind zwei Aufgaben: tar bündelt, gzip verkleinert, .tar.gz ist beides.',
      git: 'Verwirrend ist, dass Rückgängig mehrere Formen hat — den Zeiger eines Branch zu verschieben ist nicht dasselbe wie einen Gegen-Commit zu setzen.',
      pkg: 'Die Frage ist immer, was wohin gehört: in dieses Projekt oder auf die ganze Maschine.',
    },
    {
      file: 'Déplacer, supprimer, trouver. Certains ne demandent pas confirmation, et c’est pour ça que -i devient un réflexe.',
      text: 'Ils sont faits pour être chaînés avec des tubes. Trois commandes reliées sont souvent plus courtes qu’une seule qui fait tout.',
      perm: 'Le mode numérique et le mode symbolique désignent la même chose : 755 et u=rwx,go=rx sont le même droit.',
      proc: 'Ce qui tourne et ce qui mange la machine. Identifier vient avant tuer.',
      net: 'Quand une connexion échoue, ceux-ci délimitent jusqu’où elle est allée : le nom ne se résout pas, pas de route, ou le port est fermé.',
      archive: 'Regrouper et compresser sont deux gestes : tar regroupe, gzip réduit, et .tar.gz fait les deux.',
      git: 'Ce qui embrouille, c’est qu’annuler a plusieurs formes : déplacer là où pointe une branche n’est pas ajouter un commit qui l’inverse.',
      pkg: 'La question est toujours quoi va où : dans ce projet, ou sur la machine entière.',
    },
    {
      file: 'हटाना, मिटाना और ढूँढना। कुछ कमांड दोबारा नहीं पूछते, इसीलिए -i लगाने की आदत हाथ बचाती है।',
      text: 'ये पाइप से जोड़कर चलाने के लिए बने हैं। एक ही कमांड से सब करवाने के बजाय तीन जोड़ना छोटा पड़ता है।',
      perm: 'संख्या मोड और अक्षर मोड एक ही चीज़ कहते हैं: 755 और u=rwx,go=rx एक ही अनुमति है।',
      proc: 'क्या चल रहा है और क्या मशीन खा रहा है। मारने से पहले पहचानना क्रम है।',
      net: 'कनेक्शन न बने तो ये बताते हैं कि बात कहाँ तक पहुँची — नाम हल नहीं हुआ, रास्ता नहीं, या पोर्ट बंद है।',
      archive: 'बाँधना और दबाना अलग काम हैं: tar बाँधता है, gzip छोटा करता है, और .tar.gz दोनों है।',
      git: 'उलझन यह है कि पीछे लौटने के कई रूप हैं — ब्रांच का इशारा हटाना और उलटने वाला कमिट जोड़ना एक बात नहीं।',
      pkg: 'सवाल हमेशा यही है कि क्या कहाँ जाए: इस प्रोजेक्ट के भीतर, या पूरी मशीन पर।',
    },
    {
      file: '移动、删除和查找。有些命令不会再问一遍，所以顺手加 -i 是在救自己。',
      text: '它们本来就是用管道串起来用的。串三条往往比让一条命令做完所有事更短。',
      perm: '数字模式和符号模式说的是同一件事：755 和 u=rwx,go=rx 是同一个权限。',
      proc: '看什么在跑、什么在吃机器。先弄清是什么，再决定杀不杀。',
      net: '连不上的时候，这些能把范围缩小——是名字解析不了、没有路由，还是端口被挡。',
      archive: '打包和压缩是两件事：tar 打包，gzip 压小，.tar.gz 是两样一起。',
      git: '难的地方在于撤销有好几种：把分支的指向挪走，和补一个反向提交，不是一回事。',
      pkg: '问题永远是什么装到哪里：装进这个项目，还是装到整台机器上。',
    },
    {
      file: '搬移、刪除和尋找。有些命令不會再問一次，所以順手加 -i 是在救自己。',
      text: '它們本來就是用管線串起來用的。串三條往往比讓一條命令做完所有事更短。',
      perm: '數字模式和符號模式說的是同一件事：755 和 u=rwx,go=rx 是同一個權限。',
      proc: '看什麼在跑、什麼在吃機器。先弄清是什麼，再決定殺不殺。',
      net: '連不上的時候，這些能把範圍縮小——是名稱解析不了、沒有路由，還是連接埠被擋。',
      archive: '打包和壓縮是兩件事：tar 打包，gzip 壓小，.tar.gz 是兩樣一起。',
      git: '難的地方在於復原有好幾種：把分支的指向挪走，和補一個反向提交，不是一回事。',
      pkg: '問題永遠是什麼裝到哪裡：裝進這個專案，還是裝到整台機器上。',
    },
  ),

  usageTitle: T('쓰는 꼴', 'Usage', 'Uso', 'Uso', '書き方', 'Aufruf', 'Syntaxe', 'इस्तेमाल', '用法', '用法'),
  flagsTitle: T('자주 쓰는 옵션', 'Common flags', 'Opciones habituales', 'Opções comuns', 'よく使うオプション', 'Häufige Optionen', 'Options courantes', 'आम विकल्प', '常用选项', '常用選項'),
  flagCol: T('옵션', 'Flag', 'Opción', 'Opção', 'オプション', 'Option', 'Option', 'विकल्प', '选项', '選項'),
  meaningCol: T('뜻', 'Meaning', 'Significado', 'Significado', '意味', 'Bedeutung', 'Signification', 'अर्थ', '含义', '含義'),
  examplesTitle: T('예시', 'Examples', 'Ejemplos', 'Exemplos', '例', 'Beispiele', 'Exemples', 'उदाहरण', '示例', '範例'),
  relatedTitle: T('같이 보는 명령', 'Related commands', 'Comandos relacionados', 'Comandos relacionados', '関連するコマンド', 'Verwandte Befehle', 'Commandes liées', 'मिलती-जुलती कमांड', '相关命令', '相關命令'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看', '怎麼看'),

  how: T(
    ['대괄호 [ ]는 넣어도 되고 안 넣어도 되는 자리입니다.', '점 셋 …은 여러 개를 이어 쓸 수 있다는 뜻입니다.', '옵션은 대소문자를 가립니다 — -r과 -R이 다른 명령도 있습니다.'],
    ['Square brackets [ ] mark a part you may leave out.', 'An ellipsis … means you can list more than one.', 'Flags are case-sensitive — in some commands -r and -R do different things.'],
    ['Los corchetes [ ] marcan una parte que puedes omitir.', 'Los puntos suspensivos … indican que puedes poner varios.', 'Las opciones distinguen mayúsculas: en algunos comandos -r y -R no hacen lo mismo.'],
    ['Os colchetes [ ] marcam uma parte que você pode omitir.', 'As reticências … indicam que você pode listar vários.', 'As opções diferenciam maiúsculas: em alguns comandos -r e -R fazem coisas diferentes.'],
    ['角括弧 [ ] は省いてよい部分です。', '三点 … は複数並べられるという意味です。', 'オプションは大文字小文字を区別します — -r と -R が別物のコマンドもあります。'],
    ['Eckige Klammern [ ] markieren einen Teil, den man weglassen kann.', 'Drei Punkte … heißen: mehrere sind erlaubt.', 'Optionen achten auf Groß- und Kleinschreibung — bei manchen Befehlen sind -r und -R verschieden.'],
    ['Les crochets [ ] marquent une partie facultative.', 'Les points de suspension … signifient qu’on peut en mettre plusieurs.', 'Les options sont sensibles à la casse : sur certaines commandes, -r et -R ne font pas la même chose.'],
    ['बड़े कोष्ठक [ ] उस हिस्से को दिखाते हैं जिसे छोड़ा जा सकता है।', 'तीन बिंदु … का मतलब है एक से ज़्यादा दिए जा सकते हैं।', 'विकल्पों में बड़े-छोटे अक्षर मायने रखते हैं — कुछ कमांड में -r और -R अलग काम करते हैं।'],
    ['方括号 [ ] 表示这部分可以不写。', '省略号 … 表示可以写多个。', '选项区分大小写——有些命令里 -r 和 -R 不是一回事。'],
    ['方括號 [ ] 表示這部分可以不寫。', '省略號 … 表示可以寫多個。', '選項區分大小寫——有些命令裡 -r 和 -R 不是一回事。'],
  ),

  faqTitle: T('자주 묻는 것', 'Questions', 'Preguntas', 'Perguntas', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'आम सवाल', '常见问题', '常見問題'),
  copyLabel: T('복사', 'Copy', 'Copiar', 'Copiar', 'コピー', 'Kopieren', 'Copier', 'कॉपी', '复制', '複製'),
  copiedLabel: T('복사했습니다', 'Copied', 'Copiado', 'Copiado', 'コピーしました', 'Kopiert', 'Copié', 'कॉपी हो गया', '已复制', '已複製'),
  manLabel: T('man 페이지', 'man page', 'página man', 'página man', 'man ページ', 'man-Seite', 'page man', 'man पेज', 'man 手册', 'man 手冊'),

  hubMetaTitle: T(
    '터미널 명령어 사전 — 옵션과 예시로 보는 {n}가지',
    'Terminal Command Reference — {n} Commands with Flags and Examples',
    'Comandos de terminal — {n} con opciones y ejemplos',
    'Comandos de terminal — {n} com opções e exemplos',
    'ターミナルコマンド事典 — オプションと例で見る{n}種',
    'Terminal-Befehle — {n} mit Optionen und Beispielen',
    'Commandes du terminal — {n} avec options et exemples',
    'टर्मिनल कमांड सूची — विकल्प और उदाहरण के साथ {n}',
    '终端命令速查 — {n} 条，附选项和示例',
    '終端機命令速查 — {n} 條，附選項和範例',
  ),

  hubMetaDesc: T(
    'ls·grep·tar·chmod부터 git reset·docker run까지 명령어 {n}가지를 쓰는 꼴, 자주 쓰는 옵션, 실제 예시와 함께 봅니다. 되돌릴 수 없는 명령은 무엇이 위험한지 함께 적었습니다.',
    'From ls, grep, tar and chmod to git reset and docker run: {n} commands with the usage line, the flags people actually reach for, and real examples. The ones that cannot be undone say so.',
    'De ls, grep, tar y chmod a git reset y docker run: {n} comandos con su sintaxis, las opciones que de verdad se usan y ejemplos reales. Los que no se pueden deshacer lo advierten.',
    'De ls, grep, tar e chmod a git reset e docker run: {n} comandos com a sintaxe, as opções que se usam de verdade e exemplos reais. Os que não dão para desfazer avisam.',
    'ls・grep・tar・chmod から git reset・docker run まで、{n}件のコマンドを書き方・よく使うオプション・実際の例とともに。取り消せないものはその危険も書いてあります。',
    'Von ls, grep, tar und chmod bis git reset und docker run: {n} Befehle mit Aufruf, den Optionen, die man wirklich braucht, und echten Beispielen. Was sich nicht zurücknehmen lässt, sagt es.',
    'De ls, grep, tar et chmod à git reset et docker run : {n} commandes avec leur syntaxe, les options qu’on utilise vraiment et de vrais exemples. Celles qu’on ne peut pas annuler le disent.',
    'ls, grep, tar और chmod से लेकर git reset और docker run तक — {n} कमांड, उनका इस्तेमाल, काम आने वाले विकल्प और असली उदाहरण। जो पलटी नहीं जा सकतीं, वे बता देती हैं।',
    '从 ls、grep、tar、chmod 到 git reset、docker run：{n} 条命令的用法、常用选项和真实示例。不能撤销的命令会说清楚。',
    '從 ls、grep、tar、chmod 到 git reset、docker run：{n} 條命令的用法、常用選項和真實範例。不能復原的命令會說清楚。',
  ),

  metaTitle: T(
    (n: string) => `${n} 명령어 — 옵션과 예시`,
    (n: string) => `${n} command — flags and examples`,
    (n: string) => `Comando ${n} — opciones y ejemplos`,
    (n: string) => `Comando ${n} — opções e exemplos`,
    (n: string) => `${n} コマンド — オプションと例`,
    (n: string) => `Befehl ${n} — Optionen und Beispiele`,
    (n: string) => `Commande ${n} — options et exemples`,
    (n: string) => `${n} कमांड — विकल्प और उदाहरण`,
    (n: string) => `${n} 命令 — 选项和示例`,
    (n: string) => `${n} 命令 — 選項和範例`,
  ),

  metaDesc: T(
    (n: string, d: string) => `${n}: ${d} 쓰는 꼴과 자주 쓰는 옵션, 실제로 치는 예시를 함께 봅니다.`,
    (n: string, d: string) => `${n}: ${d} The usage line, the flags people reach for, and examples you can paste.`,
    (n: string, d: string) => `${n}: ${d} La sintaxis, las opciones que se usan y ejemplos que puedes pegar.`,
    (n: string, d: string) => `${n}: ${d} A sintaxe, as opções que se usam e exemplos para copiar.`,
    (n: string, d: string) => `${n}: ${d} 書き方とよく使うオプション、そのまま打てる例つき。`,
    (n: string, d: string) => `${n}: ${d} Aufruf, gängige Optionen und Beispiele zum Einfügen.`,
    (n: string, d: string) => `${n} : ${d} La syntaxe, les options courantes et des exemples à coller.`,
    (n: string, d: string) => `${n}: ${d} इस्तेमाल का तरीक़ा, आम विकल्प और चिपकाने लायक़ उदाहरण।`,
    (n: string, d: string) => `${n}：${d} 用法、常用选项，以及可以直接粘贴的示例。`,
    (n: string, d: string) => `${n}：${d} 用法、常用選項，以及可以直接貼上的範例。`,
  ),

  hubFaq: T(
    [
      { q: '명령 이름은 왜 번역하지 않나요?', a: '그대로 쳐야 동작하기 때문입니다. ls를 옮기면 옮긴 말은 셸이 모르는 이름이 됩니다. 옵션도 같은 이유로 그대로 둡니다 — 설명만 언어를 따릅니다.' },
      { q: '맥과 리눅스에서 옵션이 다르던데요.', a: '다릅니다. macOS는 BSD 계열이라 GNU 옵션이 없는 경우가 있습니다 — sed -i가 인자를 요구하거나 ps가 -ef를 안 받는 식입니다. 갈리는 자리는 설명에 어느 쪽인지 적어 두었습니다.' },
      { q: '되돌릴 수 없는 명령은 어떻게 알아보나요?', a: '설명에 그 사실을 적었습니다. rm은 휴지통을 거치지 않고, dd는 of=를 잘못 쓰면 디스크를 덮어쓰며, git reset --hard와 git clean -fd는 저장 안 한 작업을 버립니다.' },
    ],
    [
      { q: 'Why are the command names not translated?', a: 'Because you type them as they are. A translated ls is a name the shell does not know. Flags stay for the same reason — only the explanations follow your language.' },
      { q: 'The flags differ between macOS and Linux.', a: 'They do. macOS ships BSD tools, so some GNU flags are missing — sed -i wants an argument, ps does not take -ef. Where they diverge, the description says which platform it belongs to.' },
      { q: 'How do I spot the commands that cannot be undone?', a: 'Their descriptions say so. rm does not use a trash can, dd overwrites a disk if of= is wrong, and git reset --hard and git clean -fd throw away uncommitted work.' },
    ],
    [
      { q: '¿Por qué no se traducen los nombres de los comandos?', a: 'Porque se escriben tal cual. Un ls traducido es un nombre que la shell no conoce. Las opciones quedan igual por lo mismo: solo cambian de idioma las explicaciones.' },
      { q: 'Las opciones no son iguales en macOS y en Linux.', a: 'No lo son. macOS trae herramientas BSD, así que faltan opciones de GNU: sed -i pide un argumento y ps no acepta -ef. Donde se separan, la explicación dice de qué sistema es.' },
      { q: '¿Cómo reconozco los comandos que no se pueden deshacer?', a: 'Su explicación lo dice. rm no pasa por la papelera, dd sobrescribe un disco si of= está mal, y git reset --hard y git clean -fd tiran el trabajo sin confirmar.' },
    ],
    [
      { q: 'Por que os nomes dos comandos não são traduzidos?', a: 'Porque você digita como está. Um ls traduzido é um nome que o shell não conhece. As opções ficam pelo mesmo motivo: só as explicações mudam de idioma.' },
      { q: 'As opções são diferentes no macOS e no Linux.', a: 'São. O macOS traz ferramentas BSD, então faltam opções do GNU: sed -i pede um argumento e ps não aceita -ef. Onde divergem, a descrição diz de qual sistema é.' },
      { q: 'Como identifico os comandos que não dão para desfazer?', a: 'A descrição diz. rm não passa pela lixeira, dd sobrescreve um disco se o of= estiver errado, e git reset --hard e git clean -fd jogam fora trabalho não comitado.' },
    ],
    [
      { q: 'コマンド名を訳さないのはなぜですか。', a: 'そのまま打つものだからです。ls を訳したら、シェルが知らない名前になります。オプションも同じ理由でそのままにし、説明だけを言語に合わせています。' },
      { q: 'macOS と Linux でオプションが違います。', a: '違います。macOS は BSD 系なので GNU のオプションがないことがあります — sed -i が引数を要求したり、ps が -ef を受けなかったりします。分かれる箇所は説明にどちらかを書いてあります。' },
      { q: '取り消せないコマンドはどう見分けますか。', a: '説明に書いてあります。rm はゴミ箱を通らず、dd は of= を間違えるとディスクを上書きし、git reset --hard と git clean -fd はコミットしていない作業を捨てます。' },
    ],
    [
      { q: 'Warum werden die Befehlsnamen nicht übersetzt?', a: 'Weil man sie so eingibt. Ein übersetztes ls ist ein Name, den die Shell nicht kennt. Optionen bleiben aus demselben Grund — nur die Erklärungen folgen der Sprache.' },
      { q: 'Unter macOS und Linux unterscheiden sich die Optionen.', a: 'Ja. macOS bringt BSD-Werkzeuge mit, deshalb fehlen manche GNU-Optionen — sed -i will ein Argument, ps nimmt kein -ef. Wo es auseinandergeht, nennt die Beschreibung die Plattform.' },
      { q: 'Woran erkenne ich Befehle, die man nicht zurücknehmen kann?', a: 'Ihre Beschreibung sagt es. rm nutzt keinen Papierkorb, dd überschreibt bei falschem of= eine Platte, und git reset --hard sowie git clean -fd verwerfen nicht committete Arbeit.' },
    ],
    [
      { q: 'Pourquoi les noms de commandes ne sont-ils pas traduits ?', a: 'Parce qu’on les tape tels quels. Un ls traduit est un nom que le shell ne connaît pas. Les options restent pour la même raison : seules les explications suivent la langue.' },
      { q: 'Les options diffèrent entre macOS et Linux.', a: 'Oui. macOS embarque les outils BSD, donc certaines options GNU manquent : sed -i réclame un argument, ps n’accepte pas -ef. Là où ça diverge, la description précise la plateforme.' },
      { q: 'Comment repérer les commandes irréversibles ?', a: 'Leur description le dit. rm ne passe pas par la corbeille, dd écrase un disque si of= est faux, et git reset --hard comme git clean -fd jettent le travail non validé.' },
    ],
    [
      { q: 'कमांड के नाम का अनुवाद क्यों नहीं होता?', a: 'क्योंकि उन्हें वैसे ही टाइप करना होता है। अनुवाद किया हुआ ls शेल के लिए अजनबी नाम है। विकल्प भी इसी वजह से वैसे ही रहते हैं — भाषा सिर्फ़ व्याख्या की बदलती है।' },
      { q: 'macOS और Linux में विकल्प अलग दिखते हैं।', a: 'अलग हैं। macOS में BSD टूल आते हैं, इसलिए कुछ GNU विकल्प नहीं होते — sed -i को एक आर्गुमेंट चाहिए, ps -ef नहीं लेता। जहाँ फ़र्क़ है, वहाँ व्याख्या में लिखा है कि किस सिस्टम का है।' },
      { q: 'जो कमांड पलटी नहीं जा सकतीं, उन्हें कैसे पहचानूँ?', a: 'उनकी व्याख्या में लिखा है। rm कूड़ेदान से नहीं जाता, of= ग़लत हो तो dd डिस्क पर लिख देता है, और git reset --hard तथा git clean -fd बिना कमिट किया काम फेंक देते हैं।' },
    ],
    [
      { q: '为什么命令名不翻译？', a: '因为要照原样敲。翻译过的 ls 是 shell 不认识的名字。选项同理，只有说明跟着语言变。' },
      { q: 'macOS 和 Linux 的选项不一样。', a: '确实不一样。macOS 用的是 BSD 工具，有些 GNU 选项没有——sed -i 要带参数，ps 不接受 -ef。分歧的地方，说明里写了属于哪一边。' },
      { q: '怎么看出哪些命令不能撤销？', a: '说明里写了。rm 不经过回收站，of= 写错时 dd 会覆盖整块磁盘，git reset --hard 和 git clean -fd 会丢掉没提交的工作。' },
    ],
    [
      { q: '為什麼命令名不翻譯？', a: '因為要照原樣打。翻譯過的 ls 是 shell 不認識的名字。選項同理，只有說明跟著語言變。' },
      { q: 'macOS 和 Linux 的選項不一樣。', a: '確實不一樣。macOS 用的是 BSD 工具，有些 GNU 選項沒有——sed -i 要帶參數，ps 不接受 -ef。分歧的地方，說明裡寫了屬於哪一邊。' },
      { q: '怎麼看出哪些命令不能復原？', a: '說明裡寫了。rm 不經過垃圾桶，of= 寫錯時 dd 會覆蓋整顆磁碟，git reset --hard 和 git clean -fd 會丟掉沒提交的工作。' },
    ],
  ),

  itemFaq: T(
    (f: CmdFacts, d: string, cat: string) => [
      { q: `${f.item.name}은 무엇을 하나요?`, a: d },
      { q: '어떻게 치나요?', a: `${f.item.usage} — 대괄호는 생략할 수 있는 자리입니다.` },
      { q: '옵션은 몇 개나 자주 쓰나요?', a: `여기 정리한 것은 ${f.flagCount}개입니다. 전체 목록은 man ${f.item.name.split(' ')[0]}에 있습니다. 이 명령은 ${cat} 갈래입니다.` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `What does ${f.item.name} do?`, a: d },
      { q: 'How do I type it?', a: `${f.item.usage} — square brackets mark the parts you can leave out.` },
      { q: 'How many flags are worth knowing?', a: `${f.flagCount} are listed here; the full set is in man ${f.item.name.split(' ')[0]}. This command sits under ${cat}.` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `¿Qué hace ${f.item.name}?`, a: d },
      { q: '¿Cómo se escribe?', a: `${f.item.usage} — los corchetes marcan lo que puedes omitir.` },
      { q: '¿Cuántas opciones vale la pena saber?', a: `Aquí van ${f.flagCount}; la lista completa está en man ${f.item.name.split(' ')[0]}. Este comando está en ${cat}.` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `O que ${f.item.name} faz?`, a: d },
      { q: 'Como se digita?', a: `${f.item.usage} — os colchetes marcam o que você pode omitir.` },
      { q: 'Quantas opções vale a pena saber?', a: `Aqui estão ${f.flagCount}; a lista completa está em man ${f.item.name.split(' ')[0]}. Este comando fica em ${cat}.` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `${f.item.name} は何をしますか。`, a: d },
      { q: 'どう打ちますか。', a: `${f.item.usage} — 角括弧は省いてよい部分です。` },
      { q: 'よく使うオプションはいくつですか。', a: `ここにまとめたのは${f.flagCount}個です。全部は man ${f.item.name.split(' ')[0]} にあります。このコマンドは${cat}の仲間です。` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `Was macht ${f.item.name}?`, a: d },
      { q: 'Wie gibt man ihn ein?', a: `${f.item.usage} — eckige Klammern markieren, was wegfallen darf.` },
      { q: 'Wie viele Optionen lohnen sich?', a: `Hier stehen ${f.flagCount}; die vollständige Liste steht in man ${f.item.name.split(' ')[0]}. Der Befehl gehört zu ${cat}.` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `Que fait ${f.item.name} ?`, a: d },
      { q: 'Comment l’écrire ?', a: `${f.item.usage} — les crochets marquent ce qui est facultatif.` },
      { q: 'Combien d’options valent la peine ?', a: `Il y en a ${f.flagCount} ici ; la liste complète est dans man ${f.item.name.split(' ')[0]}. Cette commande relève de ${cat}.` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `${f.item.name} क्या करता है?`, a: d },
      { q: 'इसे कैसे लिखें?', a: `${f.item.usage} — बड़े कोष्ठक वह हिस्सा दिखाते हैं जो छोड़ा जा सकता है।` },
      { q: 'कितने विकल्प जानने लायक़ हैं?', a: `यहाँ ${f.flagCount} दिए हैं; पूरी सूची man ${f.item.name.split(' ')[0]} में है। यह कमांड ${cat} में आती है।` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `${f.item.name} 是做什么的？`, a: d },
      { q: '怎么写？', a: `${f.item.usage} —— 方括号表示可以省略的部分。` },
      { q: '值得记的选项有几个？', a: `这里列了 ${f.flagCount} 个，完整列表在 man ${f.item.name.split(' ')[0]}。这条命令属于${cat}。` },
    ],
    (f: CmdFacts, d: string, cat: string) => [
      { q: `${f.item.name} 是做什麼的？`, a: d },
      { q: '怎麼寫？', a: `${f.item.usage} —— 方括號表示可以省略的部分。` },
      { q: '值得記的選項有幾個？', a: `這裡列了 ${f.flagCount} 個，完整列表在 man ${f.item.name.split(' ')[0]}。這條命令屬於${cat}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const CMD_UI: L<CmdUI> = Object.fromEntries(LANG_CODES.map(lang => [lang,
  Object.fromEntries(Object.entries(SPEC).map(([k, byLang]) => [k, (byLang as L<unknown>)[lang as Lang]])),
])) as unknown as L<CmdUI>;
