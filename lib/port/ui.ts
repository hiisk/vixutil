/**
 * 포트 사전 화면의 문구 — 열 언어.
 *
 * 서비스 이름(SSH·MySQL)은 옮기지 않는다. 번역하면 오히려 그 나라 사람이
 * 검색하는 말과 멀어지고, 문서에서도 원어 그대로 쓰인다. 대신 "무엇에 쓰는
 * 갈래인가"와 "어느 범위에 드는가"만 열 언어로 두고, 항목 설명은 계산한
 * 값에서 만든다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PortFacts, Range } from './facts.ts';
import type { PortGroup, Proto } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface PortUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  rangeTitle: string;
  rangeLabel: Record<Range, string>;
  rangeNote: Record<Range, string>;
  groupTitle: string;
  groupLabel: Record<PortGroup, string>;
  groupNote: Record<PortGroup, string>;
  protoLabel: Record<Proto, string>;
  portLabel: string;
  serviceLabel: string;
  groupRowLabel: string;
  protoRowLabel: string;
  rangeRowLabel: string;
  privilegedLabel: string;
  privilegedYes: string;
  privilegedNo: string;
  hexLabel: string;
  binLabel: string;
  bytesLabel: string;
  secureLabel: string;
  plainLabel: string;
  customLabel: string;
  customNote: string;
  barTitle: string;
  barNote: string;
  neighbourTitle: string;
  sameGroupTitle: string;
  desc: (f: PortFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PortFacts) => string;
  metaDesc: (f: PortFacts) => string;
  hubFaq: FaqItem[];
  portFaq: (f: PortFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof PortUI]: L<PortUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('포트', 'Ports', 'Puertos', 'Portas', 'ポート', 'Ports', 'Ports', 'पोर्ट', '端口', '連接埠'),

  hubTitle: T(
    '네트워크 포트 127개',
    '127 network ports',
    '127 puertos de red',
    '127 portas de rede',
    'ネットワークポート127個',
    '127 Netzwerk-Ports',
    '127 ports réseau',
    '127 नेटवर्क पोर्ट',
    '127 个网络端口',
    '127 個網路連接埠',
  ),

  hubLead: T(
    '어느 서비스가 몇 번을 쓰는지, 그 번호가 어느 범위에 들고 권한이 필요한지까지. 22번과 3306번을 찾으러 온 자리입니다.',
    'Which service uses which number, what range it falls in and whether it needs root. This is where you come to look up 22 or 3306.',
    'Qué servicio usa qué número, en qué rango cae y si hace falta root. Aquí se viene a buscar el 22 o el 3306.',
    'Qual serviço usa qual número, em que faixa ele cai e se precisa de root. É aqui que se procura a 22 ou a 3306.',
    'どのサービスが何番を使い、その番号がどの範囲に入り、権限が要るかまで。22番や3306番を調べに来る場所です。',
    'Welcher Dienst welche Nummer belegt, in welchen Bereich sie fällt und ob Root nötig ist. Hier schlägt man 22 oder 3306 nach.',
    'Quel service utilise quel numéro, dans quelle plage il tombe et s’il faut être root. C’est ici qu’on cherche le 22 ou le 3306.',
    'कौन-सी सेवा कौन-सा नंबर लेती है, वह किस रेंज में आता है और रूट चाहिए या नहीं। 22 या 3306 यहीं देखे जाते हैं।',
    '哪个服务用哪个号、这个号落在哪个区间、要不要 root 权限。查 22 或 3306 就来这里。',
    '哪個服務用哪個號、這個號落在哪個區間、要不要 root 權限。查 22 或 3306 就來這裡。',
  ),

  rangeTitle: T('번호의 세 구간', 'Three ranges', 'Los tres rangos', 'As três faixas', '番号の三区分', 'Die drei Bereiche', 'Les trois plages', 'तीन रेंज', '三个区间', '三個區間'),

  rangeLabel: T(
    { 'well-known': '잘 알려진 포트', registered: '등록 포트', dynamic: '동적 포트' },
    { 'well-known': 'Well-known', registered: 'Registered', dynamic: 'Dynamic' },
    { 'well-known': 'Bien conocidos', registered: 'Registrados', dynamic: 'Dinámicos' },
    { 'well-known': 'Bem conhecidas', registered: 'Registradas', dynamic: 'Dinâmicas' },
    { 'well-known': 'ウェルノウン', registered: '登録済み', dynamic: '動的' },
    { 'well-known': 'Well-known', registered: 'Registriert', dynamic: 'Dynamisch' },
    { 'well-known': 'Bien connus', registered: 'Enregistrés', dynamic: 'Dynamiques' },
    { 'well-known': 'सुप्रसिद्ध', registered: 'पंजीकृत', dynamic: 'गतिशील' },
    { 'well-known': '公认端口', registered: '注册端口', dynamic: '动态端口' },
    { 'well-known': '公認連接埠', registered: '註冊連接埠', dynamic: '動態連接埠' },
  ),

  rangeNote: T(
    {
      'well-known': '0~1023. 유닉스에서는 관리자만 열 수 있습니다.',
      registered: '1024~49151. 신청해 등록하는 자리지만, 관습으로 굳은 번호도 섞여 있습니다.',
      dynamic: '49152~65535. 운영체제가 접속할 때마다 골라 쓰는 자리라 정해진 주인이 없습니다.',
    },
    {
      'well-known': '0–1023. On Unix only root may open one.',
      registered: '1024–49151. Meant to be applied for, though some numbers here are custom by habit.',
      dynamic: '49152–65535. The operating system picks from here for each outgoing connection, so nobody owns them.',
    },
    {
      'well-known': '0–1023. En Unix solo root puede abrirlos.',
      registered: '1024–49151. Se solicitan por registro, aunque algunos números aquí son costumbre.',
      dynamic: '49152–65535. El sistema elige de aquí en cada conexión saliente; nadie es su dueño.',
    },
    {
      'well-known': '0–1023. No Unix, só o root pode abrir.',
      registered: '1024–49151. São pedidos por registro, embora alguns números aqui sejam só costume.',
      dynamic: '49152–65535. O sistema escolhe daqui a cada conexão de saída; ninguém é dono.',
    },
    {
      'well-known': '0〜1023。Unixでは管理者しか開けません。',
      registered: '1024〜49151。申請して登録する場所ですが、慣習で定着した番号も混じっています。',
      dynamic: '49152〜65535。接続のたびにOSが選ぶ場所なので、決まった持ち主がいません。',
    },
    {
      'well-known': '0–1023. Unter Unix darf sie nur Root öffnen.',
      registered: '1024–49151. Eigentlich zu beantragen, doch manche Nummern hier sind bloß Gewohnheit.',
      dynamic: '49152–65535. Das System greift hier für jede ausgehende Verbindung zu; niemand besitzt sie.',
    },
    {
      'well-known': '0–1023. Sous Unix, seul root peut les ouvrir.',
      registered: '1024–49151. Ils se demandent par enregistrement, mais certains numéros ne sont qu’un usage.',
      dynamic: '49152–65535. Le système en choisit un à chaque connexion sortante ; personne ne les possède.',
    },
    {
      'well-known': '0–1023। Unix में इन्हें केवल रूट खोल सकता है।',
      registered: '1024–49151। ये पंजीकरण से मिलते हैं, हालाँकि कुछ नंबर बस चलन से तय हुए हैं।',
      dynamic: '49152–65535। हर बाहर जाने वाले कनेक्शन के लिए सिस्टम यहीं से चुनता है; इनका कोई मालिक नहीं।',
    },
    {
      'well-known': '0–1023。在 Unix 上只有 root 能打开。',
      registered: '1024–49151。本该申请注册，但这里也混着约定俗成的号。',
      dynamic: '49152–65535。系统每次向外连接时临时挑一个，没有固定归属。',
    },
    {
      'well-known': '0–1023。在 Unix 上只有 root 能開啟。',
      registered: '1024–49151。本該申請註冊，但這裡也混著約定俗成的號。',
      dynamic: '49152–65535。系統每次向外連線時臨時挑一個，沒有固定歸屬。',
    },
  ),

  groupTitle: T('무엇에 쓰는가', 'What they are for', 'Para qué sirven', 'Para que servem', '何に使うか', 'Wofür sie da sind', 'À quoi ils servent', 'किस काम के लिए', '各派什么用场', '各派什麼用場'),

  groupLabel: T(
    { web: '웹', mail: '메일', file: '파일', remote: '원격 접속', db: '데이터베이스', name: '이름 찾기', auth: '인증', message: '메시지', monitor: '감시·기록', network: '네트워크', dev: '개발·운영', other: '그 밖' },
    { web: 'Web', mail: 'Mail', file: 'Files', remote: 'Remote access', db: 'Databases', name: 'Name lookup', auth: 'Authentication', message: 'Messaging', monitor: 'Monitoring', network: 'Networking', dev: 'Dev and ops', other: 'Others' },
    { web: 'Web', mail: 'Correo', file: 'Archivos', remote: 'Acceso remoto', db: 'Bases de datos', name: 'Resolución de nombres', auth: 'Autenticación', message: 'Mensajería', monitor: 'Monitorización', network: 'Red', dev: 'Desarrollo y operación', other: 'Otros' },
    { web: 'Web', mail: 'E-mail', file: 'Arquivos', remote: 'Acesso remoto', db: 'Bancos de dados', name: 'Resolução de nomes', auth: 'Autenticação', message: 'Mensageria', monitor: 'Monitoramento', network: 'Rede', dev: 'Desenvolvimento e operação', other: 'Outros' },
    { web: 'ウェブ', mail: 'メール', file: 'ファイル', remote: 'リモート接続', db: 'データベース', name: '名前解決', auth: '認証', message: 'メッセージ', monitor: '監視・記録', network: 'ネットワーク', dev: '開発・運用', other: 'その他' },
    { web: 'Web', mail: 'E-Mail', file: 'Dateien', remote: 'Fernzugriff', db: 'Datenbanken', name: 'Namensauflösung', auth: 'Authentifizierung', message: 'Messaging', monitor: 'Überwachung', network: 'Netzwerk', dev: 'Entwicklung und Betrieb', other: 'Sonstige' },
    { web: 'Web', mail: 'Courriel', file: 'Fichiers', remote: 'Accès distant', db: 'Bases de données', name: 'Résolution de noms', auth: 'Authentification', message: 'Messagerie', monitor: 'Supervision', network: 'Réseau', dev: 'Dev et exploitation', other: 'Autres' },
    { web: 'वेब', mail: 'मेल', file: 'फ़ाइलें', remote: 'रिमोट एक्सेस', db: 'डेटाबेस', name: 'नाम खोज', auth: 'प्रमाणीकरण', message: 'संदेश', monitor: 'निगरानी', network: 'नेटवर्क', dev: 'डेव और ऑप्स', other: 'अन्य' },
    { web: '网页', mail: '邮件', file: '文件', remote: '远程连接', db: '数据库', name: '名字解析', auth: '认证', message: '消息', monitor: '监控与日志', network: '网络', dev: '开发与运维', other: '其他' },
    { web: '網頁', mail: '郵件', file: '檔案', remote: '遠端連線', db: '資料庫', name: '名稱解析', auth: '認證', message: '訊息', monitor: '監控與日誌', network: '網路', dev: '開發與維運', other: '其他' },
  ),

  groupNote: T(
    {
      web: '브라우저가 말을 거는 자리입니다.',
      mail: '메일을 보내고 받아 오는 자리입니다.',
      file: '파일을 주고받거나 디스크를 나눠 쓰는 자리입니다.',
      remote: '남의 컴퓨터에서 명령을 내리거나 화면을 보는 자리입니다.',
      db: '데이터베이스가 질의를 기다리는 자리입니다.',
      name: '이름을 주소로 바꾸거나 사람·기기를 찾아보는 자리입니다.',
      auth: '누구인지 확인하고 열쇠를 나눠 주는 자리입니다.',
      message: '메시지를 주고받거나 줄지어 쌓아 두는 자리입니다.',
      monitor: '기록을 모으고 상태를 살피는 자리입니다.',
      network: '망 자체를 굴리는 자리 — 주소를 나눠 주고 길을 알리고 굴을 팝니다.',
      dev: '개발과 운영 도구가 여는 자리입니다.',
      other: '시간·인쇄·놀이처럼 어느 갈래에도 안 드는 자리입니다.',
    },
    {
      web: 'Where a browser knocks.',
      mail: 'Sending mail out and fetching it back.',
      file: 'Moving files about, or sharing a disk.',
      remote: 'Running commands or watching a screen on someone else’s machine.',
      db: 'Where a database waits for queries.',
      name: 'Turning names into addresses, or looking people and machines up.',
      auth: 'Checking who you are and handing out keys.',
      message: 'Passing messages along, or queueing them up.',
      monitor: 'Collecting logs and watching health.',
      network: 'Running the network itself — handing out addresses, announcing routes, digging tunnels.',
      dev: 'Ports that development and operations tools open.',
      other: 'Time, printing, play — the ones that fit nowhere else.',
    },
    {
      web: 'Donde llama el navegador.',
      mail: 'Enviar correo y recogerlo.',
      file: 'Mover archivos o compartir un disco.',
      remote: 'Ejecutar órdenes o ver la pantalla de otra máquina.',
      db: 'Donde una base de datos espera consultas.',
      name: 'Convertir nombres en direcciones o buscar personas y equipos.',
      auth: 'Comprobar quién eres y repartir llaves.',
      message: 'Pasar mensajes o ponerlos en cola.',
      monitor: 'Recoger registros y vigilar el estado.',
      network: 'La red misma: repartir direcciones, anunciar rutas, cavar túneles.',
      dev: 'Puertos que abren las herramientas de desarrollo y operación.',
      other: 'Hora, impresión, juego: los que no encajan en ningún grupo.',
    },
    {
      web: 'Onde o navegador bate.',
      mail: 'Enviar e-mail e buscá-lo de volta.',
      file: 'Mover arquivos ou compartilhar um disco.',
      remote: 'Rodar comandos ou ver a tela de outra máquina.',
      db: 'Onde um banco de dados espera consultas.',
      name: 'Transformar nomes em endereços ou procurar pessoas e máquinas.',
      auth: 'Conferir quem você é e distribuir chaves.',
      message: 'Passar mensagens ou enfileirá-las.',
      monitor: 'Juntar registros e observar a saúde.',
      network: 'A rede em si: distribuir endereços, anunciar rotas, cavar túneis.',
      dev: 'Portas que as ferramentas de desenvolvimento e operação abrem.',
      other: 'Hora, impressão, jogo — as que não cabem em nenhum grupo.',
    },
    {
      web: 'ブラウザが声をかける場所です。',
      mail: 'メールを送り、取りに行く場所です。',
      file: 'ファイルをやり取りしたりディスクを分け合う場所です。',
      remote: '他の機械で命令を出したり画面を見る場所です。',
      db: 'データベースが問い合わせを待つ場所です。',
      name: '名前を住所に変えたり、人や機器を探す場所です。',
      auth: '誰なのかを確かめ、鍵を配る場所です。',
      message: 'メッセージを渡したり、列に積んでおく場所です。',
      monitor: '記録を集め、様子を見る場所です。',
      network: '網そのものを回す場所——住所を配り、道を知らせ、トンネルを掘ります。',
      dev: '開発と運用の道具が開く場所です。',
      other: '時刻・印刷・遊びなど、どの仲間にも入らない場所です。',
    },
    {
      web: 'Wo der Browser anklopft.',
      mail: 'Mail hinausschicken und wieder abholen.',
      file: 'Dateien hin- und herschieben oder eine Platte teilen.',
      remote: 'Auf einem fremden Rechner Befehle geben oder den Bildschirm sehen.',
      db: 'Wo eine Datenbank auf Anfragen wartet.',
      name: 'Namen in Adressen verwandeln oder Leute und Geräte nachschlagen.',
      auth: 'Prüfen, wer du bist, und Schlüssel austeilen.',
      message: 'Nachrichten weiterreichen oder in eine Schlange legen.',
      monitor: 'Protokolle einsammeln und den Zustand beobachten.',
      network: 'Das Netz selbst — Adressen verteilen, Routen ansagen, Tunnel graben.',
      dev: 'Ports, die Entwicklungs- und Betriebswerkzeuge öffnen.',
      other: 'Zeit, Druck, Spiel — was in keine Gruppe passt.',
    },
    {
      web: 'Là où le navigateur frappe.',
      mail: 'Envoyer le courrier et aller le chercher.',
      file: 'Déplacer des fichiers ou partager un disque.',
      remote: 'Lancer des commandes ou voir l’écran d’une autre machine.',
      db: 'Là où une base de données attend les requêtes.',
      name: 'Transformer des noms en adresses, ou chercher gens et machines.',
      auth: 'Vérifier qui vous êtes et distribuer des clés.',
      message: 'Faire passer des messages ou les mettre en file.',
      monitor: 'Ramasser les journaux et surveiller l’état.',
      network: 'Le réseau lui-même : distribuer des adresses, annoncer des routes, creuser des tunnels.',
      dev: 'Les ports qu’ouvrent les outils de développement et d’exploitation.',
      other: 'Heure, impression, jeu — ceux qui n’entrent dans aucun groupe.',
    },
    {
      web: 'जहाँ ब्राउज़र दस्तक देता है।',
      mail: 'मेल भेजना और वापस लाना।',
      file: 'फ़ाइलें इधर-उधर करना या डिस्क साझा करना।',
      remote: 'दूसरी मशीन पर कमांड चलाना या स्क्रीन देखना।',
      db: 'जहाँ डेटाबेस क्वेरी का इंतज़ार करता है।',
      name: 'नामों को पते में बदलना, या लोगों और मशीनों को खोजना।',
      auth: 'यह जाँचना कि आप कौन हैं, और चाबियाँ बाँटना।',
      message: 'संदेश आगे बढ़ाना या कतार में रखना।',
      monitor: 'लॉग जमा करना और हालत देखना।',
      network: 'नेटवर्क स्वयं — पते बाँटना, रास्ते बताना, सुरंग बनाना।',
      dev: 'डेवलपमेंट और ऑपरेशंस के औज़ार जो पोर्ट खोलते हैं।',
      other: 'समय, छपाई, खेल — जो किसी वर्ग में नहीं आते।',
    },
    {
      web: '浏览器敲门的地方。',
      mail: '把邮件送出去，再取回来。',
      file: '搬文件，或者共享一块磁盘。',
      remote: '在别人的机器上敲命令或看屏幕。',
      db: '数据库等着接查询的地方。',
      name: '把名字换成地址，或查人查机器。',
      auth: '确认你是谁，并发放钥匙。',
      message: '把消息传下去，或先排成队。',
      monitor: '收集日志、盯着状态。',
      network: '网络本身——分地址、报路由、挖隧道。',
      dev: '开发和运维工具打开的端口。',
      other: '对时、打印、游戏——归不进别处的那些。',
    },
    {
      web: '瀏覽器敲門的地方。',
      mail: '把郵件送出去，再取回來。',
      file: '搬檔案，或者共用一塊磁碟。',
      remote: '在別人的機器上敲指令或看螢幕。',
      db: '資料庫等著接查詢的地方。',
      name: '把名稱換成位址，或查人查機器。',
      auth: '確認你是誰，並發放金鑰。',
      message: '把訊息傳下去，或先排成佇列。',
      monitor: '收集日誌、盯著狀態。',
      network: '網路本身——分位址、報路由、挖隧道。',
      dev: '開發和維運工具打開的連接埠。',
      other: '對時、列印、遊戲——歸不進別處的那些。',
    },
  ),

  protoLabel: T(
    { tcp: 'TCP', udp: 'UDP', both: 'TCP·UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP and UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP y UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP e UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP・UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP und UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP et UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP और UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP 与 UDP' },
    { tcp: 'TCP', udp: 'UDP', both: 'TCP 與 UDP' },
  ),

  portLabel: T('포트 번호', 'Port number', 'Número de puerto', 'Número da porta', 'ポート番号', 'Portnummer', 'Numéro de port', 'पोर्ट संख्या', '端口号', '連接埠號'),
  serviceLabel: T('서비스', 'Service', 'Servicio', 'Serviço', 'サービス', 'Dienst', 'Service', 'सेवा', '服务', '服務'),
  groupRowLabel: T('갈래', 'Kind', 'Tipo', 'Tipo', '種類', 'Art', 'Type', 'प्रकार', '类别', '類別'),
  protoRowLabel: T('프로토콜', 'Protocol', 'Protocolo', 'Protocolo', 'プロトコル', 'Protokoll', 'Protocole', 'प्रोटोकॉल', '协议', '協定'),
  rangeRowLabel: T('구간', 'Range', 'Rango', 'Faixa', '区分', 'Bereich', 'Plage', 'रेंज', '区间', '區間'),
  privilegedLabel: T('관리자 권한', 'Root needed', 'Requiere root', 'Precisa de root', '管理者権限', 'Root nötig', 'Root requis', 'रूट चाहिए', '需要 root', '需要 root'),
  privilegedYes: T('필요합니다', 'Yes', 'Sí', 'Sim', '必要です', 'Ja', 'Oui', 'हाँ', '需要', '需要'),
  privilegedNo: T('필요 없습니다', 'No', 'No', 'Não', '不要です', 'Nein', 'Non', 'नहीं', '不需要', '不需要'),
  hexLabel: T('16진수', 'Hexadecimal', 'Hexadecimal', 'Hexadecimal', '16進数', 'Hexadezimal', 'Hexadécimal', 'षोडश आधारी', '十六进制', '十六進位'),
  binLabel: T('2진수', 'Binary', 'Binario', 'Binário', '2進数', 'Binär', 'Binaire', 'द्विआधारी', '二进制', '二進位'),
  bytesLabel: T('두 바이트', 'Two bytes', 'Dos bytes', 'Dois bytes', '2バイト', 'Zwei Bytes', 'Deux octets', 'दो बाइट', '两个字节', '兩個位元組'),
  secureLabel: T('암호화된 짝', 'Encrypted twin', 'Puerto cifrado', 'Porta cifrada', '暗号化された相方', 'Verschlüsselter Zwilling', 'Jumeau chiffré', 'एन्क्रिप्टेड जोड़ा', '加密的对应端口', '加密的對應連接埠'),
  plainLabel: T('평문 짝', 'Plain twin', 'Puerto en claro', 'Porta em claro', '平文の相方', 'Unverschlüsselter Zwilling', 'Jumeau en clair', 'सादा जोड़ा', '明文的对应端口', '明文的對應連接埠'),
  customLabel: T('관습', 'By custom', 'Por costumbre', 'Por costume', '慣習', 'Gewohnheit', 'Par usage', 'चलन से', '约定俗成', '約定俗成'),

  customNote: T(
    '등록된 번호가 아니라 관습으로 굳은 자리입니다. 다른 프로그램이 먼저 잡고 있을 수 있습니다.',
    'Not a registered number but one settled by habit. Another program may well have taken it first.',
    'No es un número registrado, sino uno fijado por costumbre. Otro programa puede habérselo quedado antes.',
    'Não é um número registrado, e sim firmado pelo costume. Outro programa pode tê-lo tomado antes.',
    '登録された番号ではなく慣習で定着した場所です。別のプログラムが先に取っていることもあります。',
    'Keine registrierte Nummer, sondern eine per Gewohnheit. Ein anderes Programm kann sie längst belegen.',
    'Ce n’est pas un numéro enregistré mais un usage établi. Un autre programme peut l’avoir pris avant.',
    'यह पंजीकृत नंबर नहीं, चलन से तय हुआ है। कोई और प्रोग्राम पहले ही ले चुका हो सकता है।',
    '这不是注册号，而是约定俗成。别的程序完全可能先占了它。',
    '這不是註冊號，而是約定俗成。別的程式完全可能先佔了它。',
  ),

  barTitle: T('65535 중 어디쯤', 'Where it sits in 65535', 'Dónde cae entre 65535', 'Onde fica entre 65535', '65535のどのあたり', 'Wo sie in 65535 liegt', 'Où il tombe dans 65535', '65535 में कहाँ', '在 65535 中的位置', '在 65535 中的位置'),

  barNote: T(
    '포트 번호는 16비트라 65535에서 끝납니다. 왼쪽 끝의 좁은 칸이 1023까지입니다.',
    'A port number is 16 bits, so it stops at 65535. The narrow band at the left is everything up to 1023.',
    'Un número de puerto ocupa 16 bits, así que acaba en 65535. La franja estrecha de la izquierda llega hasta 1023.',
    'Um número de porta tem 16 bits, então termina em 65535. A faixa estreita da esquerda vai até 1023.',
    'ポート番号は16ビットなので65535で終わります。左端の狭い帯が1023までです。',
    'Eine Portnummer hat 16 Bit und endet daher bei 65535. Der schmale Streifen links reicht bis 1023.',
    'Un numéro de port tient sur 16 bits : il s’arrête à 65535. La bande étroite à gauche va jusqu’à 1023.',
    'पोर्ट संख्या 16 बिट की है, इसलिए 65535 पर रुकती है। बाईं ओर की पतली पट्टी 1023 तक है।',
    '端口号是 16 位，所以到 65535 为止。左端那条窄带是 1023 以内。',
    '連接埠號是 16 位，所以到 65535 為止。左端那條窄帶是 1023 以內。',
  ),

  neighbourTitle: T('번호가 가까운 포트', 'Ports next to it', 'Puertos vecinos', 'Portas vizinhas', '番号が近いポート', 'Ports daneben', 'Ports voisins', 'पास के पोर्ट', '号码相邻的端口', '號碼相鄰的連接埠'),
  sameGroupTitle: T('같은 갈래', 'Same kind', 'Del mismo tipo', 'Do mesmo tipo', '同じ仲間', 'Gleiche Art', 'Même type', 'उसी प्रकार के', '同类端口', '同類連接埠'),

  desc: T<(f: PortFacts) => string>(
    f => `${f.port}번은 ${f.service}가 쓰는 ${f.proto === 'both' ? 'TCP·UDP' : f.proto.toUpperCase()} 포트입니다. ${f.privileged ? '1023 이하라 유닉스에서는 관리자만 열 수 있습니다.' : '1023을 넘어 일반 사용자도 열 수 있습니다.'}${f.secure ? ` 암호화된 짝은 ${f.secure}번입니다.` : ''}`,
    f => `Port ${f.port} carries ${f.service} over ${f.proto === 'both' ? 'TCP and UDP' : f.proto.toUpperCase()}. ${f.privileged ? 'Being at or below 1023, only root may open it on Unix.' : 'Above 1023, so an ordinary user can open it.'}${f.secure ? ` Its encrypted twin is ${f.secure}.` : ''}`,
    f => `El puerto ${f.port} lleva ${f.service} sobre ${f.proto === 'both' ? 'TCP y UDP' : f.proto.toUpperCase()}. ${f.privileged ? 'Al estar en 1023 o por debajo, en Unix solo root puede abrirlo.' : 'Por encima de 1023, así que lo abre cualquier usuario.'}${f.secure ? ` Su puerto cifrado es el ${f.secure}.` : ''}`,
    f => `A porta ${f.port} leva ${f.service} sobre ${f.proto === 'both' ? 'TCP e UDP' : f.proto.toUpperCase()}. ${f.privileged ? 'Por estar em 1023 ou abaixo, no Unix só o root pode abrir.' : 'Acima de 1023, então qualquer usuário pode abrir.'}${f.secure ? ` Sua porta cifrada é a ${f.secure}.` : ''}`,
    f => `${f.port}番は${f.service}が使う${f.proto === 'both' ? 'TCP・UDP' : f.proto.toUpperCase()}ポートです。${f.privileged ? '1023以下なのでUnixでは管理者しか開けません。' : '1023を超えるので一般ユーザーでも開けます。'}${f.secure ? `暗号化された相方は${f.secure}番です。` : ''}`,
    f => `Port ${f.port} trägt ${f.service} über ${f.proto === 'both' ? 'TCP und UDP' : f.proto.toUpperCase()}. ${f.privileged ? 'Da er bei 1023 oder darunter liegt, darf ihn unter Unix nur Root öffnen.' : 'Über 1023, also kann ihn auch ein normaler Nutzer öffnen.'}${f.secure ? ` Sein verschlüsselter Zwilling ist ${f.secure}.` : ''}`,
    f => `Le port ${f.port} porte ${f.service} sur ${f.proto === 'both' ? 'TCP et UDP' : f.proto.toUpperCase()}. ${f.privileged ? 'À 1023 ou en dessous, seul root peut l’ouvrir sous Unix.' : 'Au-dessus de 1023 : un utilisateur ordinaire peut l’ouvrir.'}${f.secure ? ` Son jumeau chiffré est le ${f.secure}.` : ''}`,
    f => `पोर्ट ${f.port} पर ${f.service} ${f.proto === 'both' ? 'TCP और UDP' : f.proto.toUpperCase()} से चलती है। ${f.privileged ? '1023 या उससे नीचे होने के कारण Unix में इसे केवल रूट खोल सकता है।' : '1023 से ऊपर है, इसलिए सामान्य उपयोगकर्ता भी खोल सकता है।'}${f.secure ? ` इसका एन्क्रिप्टेड जोड़ा ${f.secure} है।` : ''}`,
    f => `${f.port} 端口跑的是 ${f.service}，走 ${f.proto === 'both' ? 'TCP 与 UDP' : f.proto.toUpperCase()}。${f.privileged ? '它在 1023 以内，所以在 Unix 上只有 root 能打开。' : '它在 1023 以上，普通用户也能打开。'}${f.secure ? `加密的对应端口是 ${f.secure}。` : ''}`,
    f => `${f.port} 連接埠跑的是 ${f.service}，走 ${f.proto === 'both' ? 'TCP 與 UDP' : f.proto.toUpperCase()}。${f.privileged ? '它在 1023 以內，所以在 Unix 上只有 root 能開啟。' : '它在 1023 以上，一般使用者也能開啟。'}${f.secure ? `加密的對應連接埠是 ${f.secure}。` : ''}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '포트 번호는 16비트라 0부터 65535까지입니다. 그래서 65536번은 없습니다.',
      '1023 이하를 열려면 유닉스에서는 관리자 권한이 필요합니다.',
      '평문과 암호화가 다른 번호를 쓰는 짝이 많습니다 — 80과 443이 그렇습니다.',
      '3000·8080처럼 등록되지 않았는데 굳어 버린 번호는 관습이라고 적어 두었습니다.',
    ],
    [
      'A port number is 16 bits, so it runs 0 to 65535. There is no port 65536.',
      'Opening anything at or below 1023 needs root on Unix.',
      'Plain and encrypted often live on different numbers — 80 and 443, for one.',
      'Numbers like 3000 and 8080 were never registered; those are marked as custom.',
    ],
    [
      'Un número de puerto ocupa 16 bits: va de 0 a 65535. No existe el puerto 65536.',
      'Abrir cualquiera en 1023 o por debajo requiere root en Unix.',
      'Lo claro y lo cifrado suelen vivir en números distintos: 80 y 443, por ejemplo.',
      'Números como 3000 y 8080 nunca se registraron; van marcados como costumbre.',
    ],
    [
      'Um número de porta tem 16 bits: vai de 0 a 65535. Não existe porta 65536.',
      'Abrir qualquer uma em 1023 ou abaixo exige root no Unix.',
      'O claro e o cifrado costumam morar em números diferentes — 80 e 443, por exemplo.',
      'Números como 3000 e 8080 nunca foram registrados; ficam marcados como costume.',
    ],
    [
      'ポート番号は16ビットなので0〜65535です。65536番は存在しません。',
      '1023以下を開くにはUnixでは管理者権限が要ります。',
      '平文と暗号化が別の番号に分かれている組が多くあります——80と443がそうです。',
      '3000や8080のように登録されていないのに定着した番号は、慣習と書いてあります。',
    ],
    [
      'Eine Portnummer hat 16 Bit: 0 bis 65535. Einen Port 65536 gibt es nicht.',
      'Alles bei 1023 oder darunter zu öffnen, verlangt unter Unix Root-Rechte.',
      'Klartext und Verschlüsselung liegen oft auf verschiedenen Nummern — etwa 80 und 443.',
      'Nummern wie 3000 und 8080 wurden nie registriert; sie sind als Gewohnheit markiert.',
    ],
    [
      'Un numéro de port tient sur 16 bits : de 0 à 65535. Le port 65536 n’existe pas.',
      'Ouvrir un port à 1023 ou en dessous demande les droits root sous Unix.',
      'Le clair et le chiffré vivent souvent sur des numéros différents — 80 et 443, par exemple.',
      'Des numéros comme 3000 et 8080 n’ont jamais été enregistrés : ils sont marqués comme usage.',
    ],
    [
      'पोर्ट संख्या 16 बिट की है: 0 से 65535 तक। पोर्ट 65536 होता ही नहीं।',
      '1023 या उससे नीचे कुछ भी खोलने के लिए Unix में रूट चाहिए।',
      'सादा और एन्क्रिप्टेड अक्सर अलग नंबरों पर रहते हैं — जैसे 80 और 443।',
      '3000 और 8080 जैसे नंबर कभी पंजीकृत नहीं हुए; उन्हें चलन के रूप में चिह्नित किया है।',
    ],
    [
      '端口号是 16 位，所以从 0 到 65535。没有 65536 号端口。',
      '要打开 1023 以内的端口，在 Unix 上需要 root 权限。',
      '明文和加密常常分在两个号上——80 和 443 就是。',
      '3000、8080 这类从未注册却固定下来的号，都标了“约定俗成”。',
    ],
    [
      '連接埠號是 16 位，所以從 0 到 65535。沒有 65536 號。',
      '要開啟 1023 以內的連接埠，在 Unix 上需要 root 權限。',
      '明文和加密常常分在兩個號上——80 和 443 就是。',
      '3000、8080 這類從未註冊卻固定下來的號，都標了「約定俗成」。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '포트 번호 사전 — 어느 서비스가 몇 번을 쓰나',
    'Port number reference — which service uses which port',
    'Diccionario de puertos — qué servicio usa cada número',
    'Dicionário de portas — qual serviço usa cada número',
    'ポート番号事典 — どのサービスが何番を使うか',
    'Portnummern-Lexikon — welcher Dienst welchen Port belegt',
    'Dictionnaire des ports — quel service utilise quel numéro',
    'पोर्ट संख्या कोश — कौन-सी सेवा कौन-सा नंबर लेती है',
    '端口号词典 — 哪个服务用哪个号',
    '連接埠號詞典 — 哪個服務用哪個號',
  ),

  hubMetaDesc: T(
    '22·80·443·3306처럼 자주 찾는 포트 127개를 한 장씩. 서비스와 프로토콜, 구간과 권한, 암호화된 짝까지 정리했습니다.',
    '127 ports you actually look up — 22, 80, 443, 3306 — one page each, with service, protocol, range, privilege and encrypted twin.',
    'Los 127 puertos que de verdad se consultan — 22, 80, 443, 3306 — uno por página, con servicio, protocolo, rango, privilegio y puerto cifrado.',
    'As 127 portas que realmente se consultam — 22, 80, 443, 3306 — uma por página, com serviço, protocolo, faixa, privilégio e porta cifrada.',
    '22・80・443・3306など、よく調べるポート127個を1ページずつ。サービスとプロトコル、区分と権限、暗号化された相方まで。',
    '127 Ports, die man wirklich nachschlägt — 22, 80, 443, 3306 — je eine Seite mit Dienst, Protokoll, Bereich, Rechten und verschlüsseltem Zwilling.',
    'Les 127 ports qu’on cherche vraiment — 22, 80, 443, 3306 — une page chacun, avec service, protocole, plage, privilège et jumeau chiffré.',
    '127 पोर्ट जो सचमुच खोजे जाते हैं — 22, 80, 443, 3306 — एक-एक पृष्ठ: सेवा, प्रोटोकॉल, रेंज, अधिकार और एन्क्रिप्टेड जोड़ा।',
    '真正会去查的 127 个端口——22、80、443、3306——各一页：服务、协议、区间、权限和加密对应端口。',
    '真正會去查的 127 個連接埠——22、80、443、3306——各一頁：服務、協定、區間、權限和加密對應連接埠。',
  ),

  metaTitle: T<(f: PortFacts) => string>(
    f => `${f.port}번 포트 — ${f.name}`,
    f => `Port ${f.port} — ${f.name}`,
    f => `Puerto ${f.port} — ${f.name}`,
    f => `Porta ${f.port} — ${f.name}`,
    f => `ポート${f.port}番 — ${f.name}`,
    f => `Port ${f.port} — ${f.name} (Netzwerk)`,
    f => `Port ${f.port} — ${f.name} (réseau)`,
    f => `पोर्ट ${f.port} — ${f.name}`,
    f => `${f.port} 端口 — ${f.name}`,
    f => `${f.port} 連接埠 — ${f.name}`,
  ),

  metaDesc: T<(f: PortFacts) => string>(
    f => `${f.port}번은 ${f.service}(${f.name})가 쓰는 포트입니다. ${f.proto === 'both' ? 'TCP·UDP' : f.proto.toUpperCase()}, 16진수 0x${f.hex}${f.secure ? `, 암호화 짝 ${f.secure}번` : ''}.`,
    f => `Port ${f.port} belongs to ${f.service} (${f.name}). ${f.proto === 'both' ? 'TCP and UDP' : f.proto.toUpperCase()}, hex 0x${f.hex}${f.secure ? `, encrypted twin ${f.secure}` : ''}.`,
    f => `El puerto ${f.port} es de ${f.service} (${f.name}). ${f.proto === 'both' ? 'TCP y UDP' : f.proto.toUpperCase()}, hex 0x${f.hex}${f.secure ? `, cifrado en el ${f.secure}` : ''}.`,
    f => `A porta ${f.port} é de ${f.service} (${f.name}). ${f.proto === 'both' ? 'TCP e UDP' : f.proto.toUpperCase()}, hex 0x${f.hex}${f.secure ? `, cifrada na ${f.secure}` : ''}.`,
    f => `${f.port}番は${f.service}（${f.name}）のポートです。${f.proto === 'both' ? 'TCP・UDP' : f.proto.toUpperCase()}、16進数 0x${f.hex}${f.secure ? `、暗号化は${f.secure}番` : ''}。`,
    f => `Port ${f.port} gehört zu ${f.service} (${f.name}). ${f.proto === 'both' ? 'TCP und UDP' : f.proto.toUpperCase()}, hex 0x${f.hex}${f.secure ? `, verschlüsselt auf ${f.secure}` : ''}.`,
    f => `Le port ${f.port} est celui de ${f.service} (${f.name}). ${f.proto === 'both' ? 'TCP et UDP' : f.proto.toUpperCase()}, hex 0x${f.hex}${f.secure ? `, chiffré sur ${f.secure}` : ''}.`,
    f => `पोर्ट ${f.port} ${f.service} (${f.name}) का है। ${f.proto === 'both' ? 'TCP और UDP' : f.proto.toUpperCase()}, हेक्स 0x${f.hex}${f.secure ? `, एन्क्रिप्टेड ${f.secure}` : ''}।`,
    f => `${f.port} 端口属于 ${f.service}（${f.name}）。${f.proto === 'both' ? 'TCP 与 UDP' : f.proto.toUpperCase()}，十六进制 0x${f.hex}${f.secure ? `，加密走 ${f.secure}` : ''}。`,
    f => `${f.port} 連接埠屬於 ${f.service}（${f.name}）。${f.proto === 'both' ? 'TCP 與 UDP' : f.proto.toUpperCase()}，十六進位 0x${f.hex}${f.secure ? `，加密走 ${f.secure}` : ''}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '포트 번호는 왜 65535까지인가요?', a: '16비트 정수로 적기 때문입니다. 2의 16제곱이 65536이고 0부터 세므로 65535가 끝입니다.' },
      { q: '1024보다 작은 포트는 왜 특별한가요?', a: '유닉스 계열에서는 관리자만 열 수 있습니다. 아무 프로그램이나 80번으로 웹 서버인 척할 수 없게 하려는 것입니다.' },
      { q: '80과 443은 무엇이 다른가요?', a: '같은 웹이지만 443은 TLS로 감싼 쪽입니다. 이런 평문·암호화 짝이 여럿 있습니다 — 21과 990, 143과 993처럼요.' },
      { q: '3000번은 등록된 포트인가요?', a: '아닙니다. 개발 서버들이 쓰다 굳은 관습입니다. 그런 번호는 목록에 관습이라고 적어 두었습니다.' },
      { q: 'TCP와 UDP가 같은 번호를 쓸 수 있나요?', a: '네. 번호 공간이 따로라 53번 TCP와 53번 UDP는 다른 자리입니다. DNS는 둘 다 씁니다.' },
    ],
    [
      { q: 'Why do port numbers stop at 65535?', a: 'They are written as a 16-bit integer. Two to the sixteenth is 65536, and counting from zero the last one is 65535.' },
      { q: 'What is special about ports below 1024?', a: 'On Unix-like systems only root may open them, so that any program cannot pretend to be the web server on port 80.' },
      { q: 'What is the difference between 80 and 443?', a: 'Both are the web; 443 is the one wrapped in TLS. Several such plain and encrypted pairs exist — 21 and 990, 143 and 993.' },
      { q: 'Is port 3000 registered?', a: 'No. It settled in by habit among development servers. Such numbers are marked as custom in the list.' },
      { q: 'Can TCP and UDP use the same number?', a: 'Yes. They have separate number spaces, so TCP 53 and UDP 53 are different places. DNS uses both.' },
    ],
    [
      { q: '¿Por qué los puertos llegan solo hasta 65535?', a: 'Se escriben como entero de 16 bits. Dos elevado a dieciséis es 65536 y, contando desde cero, el último es 65535.' },
      { q: '¿Qué tienen de especial los puertos por debajo de 1024?', a: 'En sistemas tipo Unix solo root puede abrirlos, para que cualquier programa no pueda hacerse pasar por el servidor web del puerto 80.' },
      { q: '¿En qué se diferencian 80 y 443?', a: 'Ambos son web; el 443 va envuelto en TLS. Hay varias parejas así de claro y cifrado: 21 y 990, 143 y 993.' },
      { q: '¿El puerto 3000 está registrado?', a: 'No. Se asentó por costumbre entre los servidores de desarrollo. Esos números van marcados como costumbre.' },
      { q: '¿Pueden TCP y UDP usar el mismo número?', a: 'Sí. Tienen espacios de numeración separados, así que TCP 53 y UDP 53 son sitios distintos. DNS usa los dos.' },
    ],
    [
      { q: 'Por que as portas vão só até 65535?', a: 'Elas são escritas como inteiro de 16 bits. Dois elevado a dezesseis é 65536 e, contando do zero, a última é 65535.' },
      { q: 'O que há de especial nas portas abaixo de 1024?', a: 'Em sistemas tipo Unix só o root pode abri-las, para que nenhum programa se passe pelo servidor web da porta 80.' },
      { q: 'Qual a diferença entre 80 e 443?', a: 'As duas são web; a 443 vai embrulhada em TLS. Há vários pares assim de claro e cifrado: 21 e 990, 143 e 993.' },
      { q: 'A porta 3000 é registrada?', a: 'Não. Firmou-se pelo costume entre servidores de desenvolvimento. Esses números aparecem marcados como costume.' },
      { q: 'TCP e UDP podem usar o mesmo número?', a: 'Podem. Os espaços de numeração são separados, então TCP 53 e UDP 53 são lugares diferentes. O DNS usa os dois.' },
    ],
    [
      { q: 'ポート番号はなぜ65535までですか？', a: '16ビット整数で表すからです。2の16乗が65536で、0から数えるので最後は65535になります。' },
      { q: '1024より小さいポートは何が特別ですか？', a: 'Unix系では管理者しか開けません。どんなプログラムでも80番でウェブサーバーのふりができないようにするためです。' },
      { q: '80番と443番は何が違いますか？', a: 'どちらもウェブですが、443はTLSで包んだ側です。こうした平文と暗号化の組はいくつもあります——21と990、143と993など。' },
      { q: '3000番は登録されたポートですか？', a: 'いいえ。開発サーバーが使ううちに定着した慣習です。そうした番号は一覧に慣習と書いてあります。' },
      { q: 'TCPとUDPで同じ番号を使えますか？', a: '使えます。番号の空間が別なのでTCPの53番とUDPの53番は別の場所です。DNSは両方使います。' },
    ],
    [
      { q: 'Warum enden Portnummern bei 65535?', a: 'Sie werden als 16-Bit-Zahl geschrieben. Zwei hoch sechzehn ist 65536, und ab null gezählt ist 65535 die letzte.' },
      { q: 'Was ist an Ports unter 1024 besonders?', a: 'Auf Unix-Systemen darf sie nur Root öffnen, damit nicht jedes Programm auf Port 80 den Webserver spielen kann.' },
      { q: 'Was unterscheidet 80 von 443?', a: 'Beides ist Web; 443 ist in TLS eingepackt. Solche Paare aus Klartext und Verschlüsselung gibt es mehrere — 21 und 990, 143 und 993.' },
      { q: 'Ist Port 3000 registriert?', a: 'Nein. Er hat sich unter Entwicklungsservern eingebürgert. Solche Nummern sind in der Liste als Gewohnheit markiert.' },
      { q: 'Dürfen TCP und UDP dieselbe Nummer nutzen?', a: 'Ja. Die Nummernräume sind getrennt, TCP 53 und UDP 53 sind verschiedene Stellen. DNS nutzt beide.' },
    ],
    [
      { q: 'Pourquoi les ports s’arrêtent-ils à 65535 ?', a: 'On les écrit sur un entier de 16 bits. Deux puissance seize fait 65536 et, en comptant depuis zéro, le dernier est 65535.' },
      { q: 'Qu’ont de particulier les ports sous 1024 ?', a: 'Sur les systèmes Unix, seul root peut les ouvrir, pour qu’un programme quelconque ne se fasse pas passer pour le serveur web du port 80.' },
      { q: 'Quelle différence entre 80 et 443 ?', a: 'Les deux, c’est le web ; 443 est enveloppé de TLS. Il existe plusieurs paires clair / chiffré : 21 et 990, 143 et 993.' },
      { q: 'Le port 3000 est-il enregistré ?', a: 'Non. Il s’est imposé par habitude chez les serveurs de développement. Ces numéros sont signalés comme usage.' },
      { q: 'TCP et UDP peuvent-ils partager un numéro ?', a: 'Oui. Les espaces de numérotation sont séparés : TCP 53 et UDP 53 sont deux endroits. Le DNS utilise les deux.' },
    ],
    [
      { q: 'पोर्ट संख्या 65535 पर क्यों रुकती है?', a: 'इसे 16 बिट पूर्णांक में लिखा जाता है। दो की सोलहवीं घात 65536 है और शून्य से गिनने पर आखिरी 65535 होता है।' },
      { q: '1024 से नीचे के पोर्ट में क्या खास है?', a: 'Unix जैसे सिस्टम में इन्हें केवल रूट खोल सकता है, ताकि कोई भी प्रोग्राम पोर्ट 80 पर वेब सर्वर होने का नाटक न कर सके।' },
      { q: '80 और 443 में क्या फर्क है?', a: 'दोनों वेब हैं; 443 TLS में लिपटा हुआ है। ऐसे सादा-एन्क्रिप्टेड जोड़े कई हैं — 21 और 990, 143 और 993।' },
      { q: 'क्या पोर्ट 3000 पंजीकृत है?', a: 'नहीं। यह डेवलपमेंट सर्वरों के चलन से तय हुआ। ऐसे नंबर सूची में चलन के रूप में चिह्नित हैं।' },
      { q: 'क्या TCP और UDP एक ही नंबर ले सकते हैं?', a: 'हाँ। दोनों की संख्या-जगह अलग है, इसलिए TCP 53 और UDP 53 अलग स्थान हैं। DNS दोनों का उपयोग करता है।' },
    ],
    [
      { q: '端口号为什么到 65535 为止？', a: '因为它用 16 位整数表示。2 的 16 次方是 65536，从 0 数起，最后一个就是 65535。' },
      { q: '1024 以下的端口有什么特别？', a: '在类 Unix 系统上只有 root 能打开，免得任何程序都能在 80 端口冒充网站服务器。' },
      { q: '80 和 443 有什么区别？', a: '都是网页，443 是外面裹了 TLS 的那一个。这样的明文—加密成对还有好几组：21 和 990、143 和 993。' },
      { q: '3000 端口是注册过的吗？', a: '不是。它是开发服务器用着用着固定下来的。这类号在列表里标了“约定俗成”。' },
      { q: 'TCP 和 UDP 能用同一个号吗？', a: '能。两者的号码空间是分开的，TCP 53 和 UDP 53 是两个地方。DNS 两个都用。' },
    ],
    [
      { q: '連接埠號為什麼到 65535 為止？', a: '因為它用 16 位整數表示。2 的 16 次方是 65536，從 0 數起，最後一個就是 65535。' },
      { q: '1024 以下的連接埠有什麼特別？', a: '在類 Unix 系統上只有 root 能開啟，免得任何程式都能在 80 埠冒充網站伺服器。' },
      { q: '80 和 443 有什麼區別？', a: '都是網頁，443 是外面裹了 TLS 的那一個。這樣的明文—加密成對還有好幾組：21 和 990、143 和 993。' },
      { q: '3000 埠是註冊過的嗎？', a: '不是。它是開發伺服器用著用著固定下來的。這類號在列表裡標了「約定俗成」。' },
      { q: 'TCP 和 UDP 能用同一個號嗎？', a: '能。兩者的號碼空間是分開的，TCP 53 和 UDP 53 是兩個地方。DNS 兩個都用。' },
    ],
  ),

  portFaq: T<(f: PortFacts) => FaqItem[]>(
    f => [
      { q: `${f.port}번 포트는 무엇에 쓰나요?`, a: `${f.service}(${f.name})가 씁니다. ${f.proto === 'both' ? 'TCP와 UDP 둘 다' : f.proto.toUpperCase()}로 통합니다.` },
      { q: `${f.port}번을 열려면 관리자 권한이 필요한가요?`, a: f.privileged ? '네. 1023 이하라 유닉스에서는 관리자만 열 수 있습니다.' : '아니요. 1023을 넘으므로 일반 사용자도 열 수 있습니다.' },
      { q: `${f.port}번은 어느 구간에 드나요?`, a: `${f.range === 'well-known' ? '잘 알려진 포트(0~1023)' : f.range === 'registered' ? '등록 포트(1024~49151)' : '동적 포트(49152~65535)'}입니다. 16진수로는 0x${f.hex}입니다.` },
      f.secure
        ? { q: `${f.port}번의 암호화된 짝이 있나요?`, a: `${f.secure}번입니다. 같은 일을 TLS로 감싸 주고받습니다.` }
        : f.plain
          ? { q: `${f.port}번은 무엇을 감싼 것인가요?`, a: `${f.plain}번을 TLS로 감싼 쪽입니다.` }
          : { q: `${f.port}번에 짝이 되는 포트가 있나요?`, a: '따로 없습니다. 처음부터 한 번호로 쓰거나, 암호화를 같은 번호 안에서 협상합니다.' },
    ],
    f => [
      { q: `What is port ${f.port} used for?`, a: `${f.service} (${f.name}) uses it, over ${f.proto === 'both' ? 'both TCP and UDP' : f.proto.toUpperCase()}.` },
      { q: `Does opening port ${f.port} need root?`, a: f.privileged ? 'Yes. It is at or below 1023, so on Unix only root may open it.' : 'No. It is above 1023, so an ordinary user can open it.' },
      { q: `Which range does port ${f.port} fall in?`, a: `${f.range === 'well-known' ? 'Well-known (0–1023)' : f.range === 'registered' ? 'Registered (1024–49151)' : 'Dynamic (49152–65535)'}. In hex it is 0x${f.hex}.` },
      f.secure
        ? { q: `Is there an encrypted version of port ${f.port}?`, a: `Port ${f.secure} does the same thing wrapped in TLS.` }
        : f.plain
          ? { q: `What does port ${f.port} wrap?`, a: `It is port ${f.plain} wrapped in TLS.` }
          : { q: `Does port ${f.port} have a twin?`, a: 'Not a separate one. It either was encrypted from the start or negotiates TLS on the same number.' },
    ],
    f => [
      { q: `¿Para qué sirve el puerto ${f.port}?`, a: `Lo usa ${f.service} (${f.name}), sobre ${f.proto === 'both' ? 'TCP y UDP' : f.proto.toUpperCase()}.` },
      { q: `¿Abrir el puerto ${f.port} requiere root?`, a: f.privileged ? 'Sí. Está en 1023 o por debajo, así que en Unix solo root puede abrirlo.' : 'No. Está por encima de 1023, así que lo abre cualquier usuario.' },
      { q: `¿En qué rango cae el puerto ${f.port}?`, a: `${f.range === 'well-known' ? 'Bien conocidos (0–1023)' : f.range === 'registered' ? 'Registrados (1024–49151)' : 'Dinámicos (49152–65535)'}. En hex es 0x${f.hex}.` },
      f.secure
        ? { q: `¿Hay versión cifrada del puerto ${f.port}?`, a: `El puerto ${f.secure} hace lo mismo envuelto en TLS.` }
        : f.plain
          ? { q: `¿Qué envuelve el puerto ${f.port}?`, a: `Es el puerto ${f.plain} envuelto en TLS.` }
          : { q: `¿Tiene pareja el puerto ${f.port}?`, a: 'No una aparte. O bien iba cifrado desde el principio, o negocia TLS en el mismo número.' },
    ],
    f => [
      { q: `Para que serve a porta ${f.port}?`, a: `É usada por ${f.service} (${f.name}), sobre ${f.proto === 'both' ? 'TCP e UDP' : f.proto.toUpperCase()}.` },
      { q: `Abrir a porta ${f.port} precisa de root?`, a: f.privileged ? 'Sim. Está em 1023 ou abaixo, então no Unix só o root pode abrir.' : 'Não. Está acima de 1023, então qualquer usuário pode abrir.' },
      { q: `Em que faixa cai a porta ${f.port}?`, a: `${f.range === 'well-known' ? 'Bem conhecidas (0–1023)' : f.range === 'registered' ? 'Registradas (1024–49151)' : 'Dinâmicas (49152–65535)'}. Em hex é 0x${f.hex}.` },
      f.secure
        ? { q: `Existe versão cifrada da porta ${f.port}?`, a: `A porta ${f.secure} faz o mesmo embrulhado em TLS.` }
        : f.plain
          ? { q: `O que a porta ${f.port} embrulha?`, a: `É a porta ${f.plain} embrulhada em TLS.` }
          : { q: `A porta ${f.port} tem par?`, a: 'Não um separado. Ou já era cifrada desde o início, ou negocia TLS no mesmo número.' },
    ],
    f => [
      { q: `${f.port}番ポートは何に使いますか？`, a: `${f.service}（${f.name}）が使います。${f.proto === 'both' ? 'TCPとUDPの両方' : f.proto.toUpperCase()}で通ります。` },
      { q: `${f.port}番を開くのに管理者権限は要りますか？`, a: f.privileged ? 'はい。1023以下なのでUnixでは管理者しか開けません。' : 'いいえ。1023を超えるので一般ユーザーでも開けます。' },
      { q: `${f.port}番はどの区分ですか？`, a: `${f.range === 'well-known' ? 'ウェルノウン（0〜1023）' : f.range === 'registered' ? '登録済み（1024〜49151）' : '動的（49152〜65535）'}です。16進数では0x${f.hex}です。` },
      f.secure
        ? { q: `${f.port}番に暗号化された相方はありますか？`, a: `${f.secure}番です。同じことをTLSで包んでやり取りします。` }
        : f.plain
          ? { q: `${f.port}番は何を包んだものですか？`, a: `${f.plain}番をTLSで包んだ側です。` }
          : { q: `${f.port}番に相方のポートはありますか？`, a: '別にはありません。最初から一つの番号で使うか、同じ番号の中でTLSを取り決めます。' },
    ],
    f => [
      { q: `Wofür dient Port ${f.port}?`, a: `${f.service} (${f.name}) nutzt ihn, über ${f.proto === 'both' ? 'TCP und UDP' : f.proto.toUpperCase()}.` },
      { q: `Braucht das Öffnen von Port ${f.port} Root?`, a: f.privileged ? 'Ja. Er liegt bei 1023 oder darunter, also darf ihn unter Unix nur Root öffnen.' : 'Nein. Er liegt über 1023, also kann ihn auch ein normaler Nutzer öffnen.' },
      { q: `In welchen Bereich fällt Port ${f.port}?`, a: `${f.range === 'well-known' ? 'Well-known (0–1023)' : f.range === 'registered' ? 'Registriert (1024–49151)' : 'Dynamisch (49152–65535)'}. Hex 0x${f.hex}.` },
      f.secure
        ? { q: `Gibt es Port ${f.port} auch verschlüsselt?`, a: `Port ${f.secure} macht dasselbe, in TLS verpackt.` }
        : f.plain
          ? { q: `Was verpackt Port ${f.port}?`, a: `Er ist Port ${f.plain}, in TLS verpackt.` }
          : { q: `Hat Port ${f.port} einen Zwilling?`, a: 'Keinen eigenen. Entweder war er von Anfang an verschlüsselt oder er handelt TLS auf derselben Nummer aus.' },
    ],
    f => [
      { q: `À quoi sert le port ${f.port} ?`, a: `${f.service} (${f.name}) l’utilise, sur ${f.proto === 'both' ? 'TCP et UDP' : f.proto.toUpperCase()}.` },
      { q: `Faut-il être root pour ouvrir le port ${f.port} ?`, a: f.privileged ? 'Oui. Il est à 1023 ou en dessous : sous Unix, seul root peut l’ouvrir.' : 'Non. Il est au-dessus de 1023, un utilisateur ordinaire suffit.' },
      { q: `Dans quelle plage tombe le port ${f.port} ?`, a: `${f.range === 'well-known' ? 'Bien connus (0–1023)' : f.range === 'registered' ? 'Enregistrés (1024–49151)' : 'Dynamiques (49152–65535)'}. En hexadécimal, 0x${f.hex}.` },
      f.secure
        ? { q: `Existe-t-il une version chiffrée du port ${f.port} ?`, a: `Le port ${f.secure} fait la même chose, enveloppé de TLS.` }
        : f.plain
          ? { q: `Que enveloppe le port ${f.port} ?`, a: `C’est le port ${f.plain} enveloppé de TLS.` }
          : { q: `Le port ${f.port} a-t-il un jumeau ?`, a: 'Pas de séparé. Soit il était chiffré dès l’origine, soit il négocie TLS sur le même numéro.' },
    ],
    f => [
      { q: `पोर्ट ${f.port} किस काम आता है?`, a: `इसे ${f.service} (${f.name}) उपयोग करती है, ${f.proto === 'both' ? 'TCP और UDP दोनों' : f.proto.toUpperCase()} पर।` },
      { q: `क्या पोर्ट ${f.port} खोलने के लिए रूट चाहिए?`, a: f.privileged ? 'हाँ। यह 1023 या नीचे है, इसलिए Unix में केवल रूट खोल सकता है।' : 'नहीं। यह 1023 से ऊपर है, सामान्य उपयोगकर्ता भी खोल सकता है।' },
      { q: `पोर्ट ${f.port} किस रेंज में है?`, a: `${f.range === 'well-known' ? 'सुप्रसिद्ध (0–1023)' : f.range === 'registered' ? 'पंजीकृत (1024–49151)' : 'गतिशील (49152–65535)'}। हेक्स में 0x${f.hex}।` },
      f.secure
        ? { q: `क्या पोर्ट ${f.port} का एन्क्रिप्टेड रूप है?`, a: `पोर्ट ${f.secure} वही काम TLS में लपेटकर करता है।` }
        : f.plain
          ? { q: `पोर्ट ${f.port} किसे लपेटता है?`, a: `यह पोर्ट ${f.plain} को TLS में लपेटा हुआ रूप है।` }
          : { q: `क्या पोर्ट ${f.port} का कोई जोड़ा है?`, a: 'अलग से नहीं। या तो यह शुरू से एन्क्रिप्टेड था, या उसी नंबर पर TLS तय करता है।' },
    ],
    f => [
      { q: `${f.port} 端口做什么用？`, a: `由 ${f.service}（${f.name}）使用，走 ${f.proto === 'both' ? 'TCP 和 UDP' : f.proto.toUpperCase()}。` },
      { q: `打开 ${f.port} 端口需要 root 吗？`, a: f.privileged ? '需要。它在 1023 以内，在 Unix 上只有 root 能打开。' : '不需要。它在 1023 以上，普通用户也能打开。' },
      { q: `${f.port} 端口属于哪个区间？`, a: `${f.range === 'well-known' ? '公认端口（0–1023）' : f.range === 'registered' ? '注册端口（1024–49151）' : '动态端口（49152–65535）'}。十六进制是 0x${f.hex}。` },
      f.secure
        ? { q: `${f.port} 端口有加密版本吗？`, a: `有，${f.secure} 端口做同样的事，只是外面裹了 TLS。` }
        : f.plain
          ? { q: `${f.port} 端口裹的是什么？`, a: `它就是 ${f.plain} 端口裹上 TLS 的版本。` }
          : { q: `${f.port} 端口有配对端口吗？`, a: '没有单独的。它要么一开始就是加密的，要么在同一个号上协商 TLS。' },
    ],
    f => [
      { q: `${f.port} 連接埠做什麼用？`, a: `由 ${f.service}（${f.name}）使用，走 ${f.proto === 'both' ? 'TCP 和 UDP' : f.proto.toUpperCase()}。` },
      { q: `開啟 ${f.port} 連接埠需要 root 嗎？`, a: f.privileged ? '需要。它在 1023 以內，在 Unix 上只有 root 能開啟。' : '不需要。它在 1023 以上，一般使用者也能開啟。' },
      { q: `${f.port} 連接埠屬於哪個區間？`, a: `${f.range === 'well-known' ? '公認連接埠（0–1023）' : f.range === 'registered' ? '註冊連接埠（1024–49151）' : '動態連接埠（49152–65535）'}。十六進位是 0x${f.hex}。` },
      f.secure
        ? { q: `${f.port} 連接埠有加密版本嗎？`, a: `有，${f.secure} 連接埠做同樣的事，只是外面裹了 TLS。` }
        : f.plain
          ? { q: `${f.port} 連接埠裹的是什麼？`, a: `它就是 ${f.plain} 連接埠裹上 TLS 的版本。` }
          : { q: `${f.port} 連接埠有配對嗎？`, a: '沒有單獨的。它要麼一開始就是加密的，要麼在同一個號上協商 TLS。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PORT_UI: L<PortUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PortUI>;
