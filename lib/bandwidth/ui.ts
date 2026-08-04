/**
 * 다운로드 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "광고하는 속도와 실제로 쌓이는 속도는 다르다"이다.
 * 어긋나는 자리가 둘이라 둘 다 짚는다 — 비트와 바이트(8배), 그리고 조각마다
 * 붙는 주소와 순번(6% 남짓).
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BandwidthFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface BandwidthUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  sizeLabel: string;
  speedLabel: string;
  timeLabel: string;
  idealLabel: string;
  perSecondLabel: string;
  peakLabel: string;
  gibLabel: string;
  dayLabel: string;
  minuteLabel: string;
  landmarkName: (key: string) => string;
  planName: (key: string) => string;
  linkName: (key: string) => string;
  streamName: (key: string) => string;
  time: (f: BandwidthFacts) => string;
  unitTitle: string;
  unitNote: string;
  overheadTitle: string;
  overheadNote: string;
  gibTitle: string;
  gibNote: string;
  sameTitle: string;
  sameNote: string;
  bottleTitle: string;
  bottleNote: string;
  streamTitle: string;
  streamNote: string;
  tableTitle: string;
  neighbourTitle: string;
  speedTitle: string;
  sizeTitle: string;
  noneTag: string;
  desc: (f: BandwidthFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: BandwidthFacts) => string;
  metaDesc: (f: BandwidthFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: BandwidthFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** key → 이름 표를 함수로 — 모르는 열쇠는 그대로 돌려준다 */
const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/**
 * 초를 사람이 읽는 길이로 — 큰 단위 둘까지만 말한다.
 *
 * "2일 22시간 48분 37초"는 아무도 그렇게 읽지 않는다. 1분이 안 되면 잘게
 * 끊은 초를 그대로 보여 준다.
 */
const spanner = (day: string, hour: string, min: string, sec: string, join = ' ') =>
  (f: BandwidthFacts): string => {
    if (f.real < 60) return `${f.real}${sec}`;
    const p = f.parts;
    const pieces = [
      [p.days, day],
      [p.hours, hour],
      [p.minutes, min],
      [p.seconds, sec],
    ].filter(([n]) => (n as number) > 0).map(([n, u]) => `${n}${u}`);
    return pieces.slice(0, 2).join(join);
  };

const ko = spanner('일', '시간', '분', '초');
const en = spanner(' d', ' h', ' min', ' s');
const ja = spanner('日', '時間', '分', '秒', '');
const hi = spanner(' दिन', ' घंटे', ' मिनट', ' सेकंड');
const zh = spanner('天', '小时', '分', '秒', '');
const tw = spanner('天', '小時', '分', '秒', '');

type Spec = { [K in keyof BandwidthUI]: L<BandwidthUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('다운로드 시간', 'Download time', 'Tiempo de descarga', 'Tempo de download', 'ダウンロード時間', 'Downloadzeit', 'Temps de téléchargement', 'डाउनलोड समय', '下载时间', '下載時間'),

  time: T<(f: BandwidthFacts) => string>(ko, en, en, en, ja, en, en, hi, zh, tw),

  landmarkName: T<(key: string) => string>(
    pick({ cd: 'CD 한 장', dvd: 'DVD 한 장', bluray: '블루레이 한 장', bluray2: '블루레이 두 겹' }),
    pick({ cd: 'a CD', dvd: 'a DVD', bluray: 'a Blu-ray', bluray2: 'a dual-layer Blu-ray' }),
    pick({ cd: 'un CD', dvd: 'un DVD', bluray: 'un Blu-ray', bluray2: 'un Blu-ray de doble capa' }),
    pick({ cd: 'um CD', dvd: 'um DVD', bluray: 'um Blu-ray', bluray2: 'um Blu-ray de camada dupla' }),
    pick({ cd: 'CD 1枚', dvd: 'DVD 1枚', bluray: 'ブルーレイ 1枚', bluray2: '2層ブルーレイ' }),
    pick({ cd: 'eine CD', dvd: 'eine DVD', bluray: 'eine Blu-ray', bluray2: 'eine Dual-Layer-Blu-ray' }),
    pick({ cd: 'un CD', dvd: 'un DVD', bluray: 'un Blu-ray', bluray2: 'un Blu-ray double couche' }),
    pick({ cd: 'एक CD', dvd: 'एक DVD', bluray: 'एक ब्लू-रे', bluray2: 'दोहरी परत वाली ब्लू-रे' }),
    pick({ cd: '一张 CD', dvd: '一张 DVD', bluray: '一张蓝光', bluray2: '双层蓝光' }),
    pick({ cd: '一張 CD', dvd: '一張 DVD', bluray: '一張藍光', bluray2: '雙層藍光' }),
  ),

  planName: T<(key: string) => string>(
    pick({ mobile: '데이터 절약 구간', lte: 'LTE 평균', basic: '100메가 상품', fast: '500메가 상품', giga: '기가 인터넷', multigig: '2.5기가 상품' }),
    pick({ mobile: 'throttled data', lte: 'typical LTE', basic: '100 Mb plan', fast: '500 Mb plan', giga: 'gigabit plan', multigig: '2.5 Gb plan' }),
    pick({ mobile: 'datos limitados', lte: 'LTE típico', basic: 'plan de 100 Mb', fast: 'plan de 500 Mb', giga: 'plan gigabit', multigig: 'plan de 2,5 Gb' }),
    pick({ mobile: 'dados reduzidos', lte: 'LTE típico', basic: 'plano de 100 Mb', fast: 'plano de 500 Mb', giga: 'plano gigabit', multigig: 'plano de 2,5 Gb' }),
    pick({ mobile: '速度制限中', lte: 'LTE平均', basic: '100メガ回線', fast: '500メガ回線', giga: 'ギガ回線', multigig: '2.5ギガ回線' }),
    pick({ mobile: 'gedrosselte Daten', lte: 'typisches LTE', basic: '100-Mb-Tarif', fast: '500-Mb-Tarif', giga: 'Gigabit-Tarif', multigig: '2,5-Gb-Tarif' }),
    pick({ mobile: 'données bridées', lte: 'LTE courant', basic: 'offre 100 Mb', fast: 'offre 500 Mb', giga: 'offre gigabit', multigig: 'offre 2,5 Gb' }),
    pick({ mobile: 'सीमित डेटा', lte: 'सामान्य LTE', basic: '100 Mb प्लान', fast: '500 Mb प्लान', giga: 'गिगाबिट प्लान', multigig: '2.5 Gb प्लान' }),
    pick({ mobile: '限速流量', lte: '一般 LTE', basic: '百兆宽带', fast: '500 兆宽带', giga: '千兆宽带', multigig: '2.5 千兆宽带' }),
    pick({ mobile: '限速流量', lte: '一般 LTE', basic: '百兆寬頻', fast: '500 兆寬頻', giga: '千兆寬頻', multigig: '2.5 千兆寬頻' }),
  ),

  linkName: T<(key: string) => string>(
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'USB 2.0 랜 어댑터', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: '기가 이더넷 포트', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: 'CAT6 10기가' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'USB 2.0 adapter', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: 'gigabit Ethernet port', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: 'CAT6 at 10 Gb' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'adaptador USB 2.0', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: 'puerto Ethernet gigabit', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: 'CAT6 a 10 Gb' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'adaptador USB 2.0', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: 'porta Ethernet gigabit', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: 'CAT6 a 10 Gb' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'USB 2.0 アダプタ', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: 'ギガビットLANポート', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: 'CAT6 10ギガ' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'USB-2.0-Adapter', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: 'Gigabit-Ethernet-Port', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: 'CAT6 mit 10 Gb' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'adaptateur USB 2.0', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: 'port Ethernet gigabit', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: 'CAT6 à 10 Gb' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'USB 2.0 अडैप्टर', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: 'गिगाबिट ईथरनेट पोर्ट', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: '10 Gb पर CAT6' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'USB 2.0 网卡', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: '千兆网口', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: '万兆 CAT6' }),
    pick({ wifi4: 'Wi-Fi 4 (802.11n)', usb2: 'USB 2.0 網卡', wifi5: 'Wi-Fi 5 (802.11ac)', gigabit: '千兆網路埠', wifi6: 'Wi-Fi 6 (802.11ax)', cat6: '萬兆 CAT6' }),
  ),

  streamName: T<(key: string) => string>(
    pick({ music: '음악 스트리밍', call: '화상 통화', hd: 'HD 영상', fhd: '풀HD 영상', uhd: '4K 영상' }),
    pick({ music: 'music streaming', call: 'a video call', hd: 'HD video', fhd: 'full HD video', uhd: '4K video' }),
    pick({ music: 'música en streaming', call: 'videollamada', hd: 'vídeo HD', fhd: 'vídeo full HD', uhd: 'vídeo 4K' }),
    pick({ music: 'música em streaming', call: 'videochamada', hd: 'vídeo HD', fhd: 'vídeo full HD', uhd: 'vídeo 4K' }),
    pick({ music: '音楽ストリーミング', call: 'ビデオ通話', hd: 'HD動画', fhd: 'フルHD動画', uhd: '4K動画' }),
    pick({ music: 'Musik-Streaming', call: 'ein Videoanruf', hd: 'HD-Video', fhd: 'Full-HD-Video', uhd: '4K-Video' }),
    pick({ music: 'musique en streaming', call: 'un appel vidéo', hd: 'vidéo HD', fhd: 'vidéo full HD', uhd: 'vidéo 4K' }),
    pick({ music: 'संगीत स्ट्रीमिंग', call: 'वीडियो कॉल', hd: 'HD वीडियो', fhd: 'फुल HD वीडियो', uhd: '4K वीडियो' }),
    pick({ music: '音乐串流', call: '视频通话', hd: 'HD 视频', fhd: '全高清视频', uhd: '4K 视频' }),
    pick({ music: '音樂串流', call: '視訊通話', hd: 'HD 影片', fhd: '全高清影片', uhd: '4K 影片' }),
  ),

  hubTitle: T(
    '다운로드 240칸 — 100Mbps로 1GB는 85초',
    '240 download times — 1 GB over 100 Mbps takes 85 seconds',
    '240 tiempos de descarga — 1 GB a 100 Mbps tarda 85 segundos',
    '240 tempos de download — 1 GB a 100 Mbps leva 85 segundos',
    'ダウンロード240マス — 100Mbpsで1GBは85秒',
    '240 Downloadzeiten — 1 GB über 100 Mbit/s dauert 85 Sekunden',
    '240 temps de téléchargement — 1 Go à 100 Mb/s prend 85 secondes',
    '240 डाउनलोड समय — 100 Mbps पर 1 GB में 85 सेकंड',
    '240 个下载时间 — 100Mbps 下载 1GB 需 85 秒',
    '240 個下載時間 — 100Mbps 下載 1GB 需 85 秒',
  ),

  hubLead: T(
    '파일 크기 24가지와 회선 속도 10가지가 만나는 칸마다 걸리는 시간을 계산했습니다. 광고하는 속도를 8로 나눈 뒤, 거기서 다시 6%가 주소와 순번으로 빠집니다.',
    'A time for every meeting of 24 file sizes and 10 line speeds. Divide the advertised number by eight, then lose another 6% to addresses and sequence numbers.',
    'Un tiempo para cada cruce de 24 tamaños de archivo y 10 velocidades. Divide el número anunciado entre ocho y pierde otro 6% en direcciones y números de secuencia.',
    'Um tempo para cada cruzamento de 24 tamanhos de arquivo e 10 velocidades. Divida o número anunciado por oito e perca mais 6% em endereços e números de sequência.',
    'ファイルサイズ24通りと回線速度10通りが出会う各マスの所要時間を計算しました。広告の数字を8で割り、そこからさらに6%が宛先と順番に取られます。',
    'Eine Zeit für jede Begegnung von 24 Dateigrößen und 10 Leitungsgeschwindigkeiten. Teile die beworbene Zahl durch acht, dann gehen weitere 6 % für Adressen und Sequenznummern ab.',
    'Un temps pour chaque croisement de 24 tailles de fichier et 10 débits. Divisez le chiffre annoncé par huit, puis perdez encore 6 % en adresses et numéros de séquence.',
    '24 फ़ाइल आकार और 10 लाइन गति के हर मेल का समय। विज्ञापित संख्या को आठ से भाग दें, फिर पते और क्रम संख्या में और 6% चला जाता है।',
    '24 种文件大小与 10 种线路速度交汇的每一格都算出所需时间。把广告数字除以八，再有 6% 被地址和序号占去。',
    '24 種檔案大小與 10 種線路速度交匯的每一格都算出所需時間。把廣告數字除以八，再有 6% 被位址和序號佔去。',
  ),

  sizeLabel: T('파일 크기', 'File size', 'Tamaño del archivo', 'Tamanho do arquivo', 'ファイルサイズ', 'Dateigröße', 'Taille du fichier', 'फ़ाइल आकार', '文件大小', '檔案大小'),
  speedLabel: T('회선 속도', 'Line speed', 'Velocidad de la línea', 'Velocidade da linha', '回線速度', 'Leitungsgeschwindigkeit', 'Débit de la ligne', 'लाइन गति', '线路速度', '線路速度'),
  timeLabel: T('걸리는 시간', 'Time it takes', 'Tiempo que tarda', 'Tempo que leva', 'かかる時間', 'Benötigte Zeit', 'Temps nécessaire', 'लगने वाला समय', '所需时间', '所需時間'),
  idealLabel: T('나눗셈만 하면', 'Division alone says', 'Solo con dividir', 'Só com a divisão', '割り算だけなら', 'Reine Rechnung', 'Simple division', 'केवल भाग से', '只做除法', '只做除法'),
  perSecondLabel: T('실제 속도', 'Real speed', 'Velocidad real', 'Velocidade real', '実際の速度', 'Tatsächliches Tempo', 'Débit réel', 'वास्तविक गति', '实际速度', '實際速度'),
  peakLabel: T('광고 속도로는', 'What the ad implies', 'Lo que sugiere el anuncio', 'O que o anúncio sugere', '広告の速度なら', 'Was die Werbung nahelegt', 'Ce que la pub laisse croire', 'विज्ञापन के अनुसार', '按广告速度', '按廣告速度'),
  gibLabel: T('탐색기 표시', 'What the file browser shows', 'Lo que muestra el explorador', 'O que o explorador mostra', 'エクスプローラー表示', 'Anzeige im Datei-Explorer', 'Affichage dans l’explorateur', 'फ़ाइल ब्राउज़र में', '资源管理器显示', '檔案總管顯示'),
  dayLabel: T('하루 종일 받으면', 'A full day of this', 'Un día entero así', 'Um dia inteiro assim', '丸一日受け続けると', 'Einen ganzen Tag lang', 'Une journée entière', 'पूरे दिन में', '连续下载一天', '連續下載一天'),
  minuteLabel: T('1분 안에 받으려면', 'To finish within a minute', 'Para terminar en un minuto', 'Para terminar em um minuto', '1分で終えるには', 'Um in einer Minute fertig zu sein', 'Pour finir en une minute', 'एक मिनट में पूरा करने के लिए', '想在一分钟内下完', '想在一分鐘內下完'),

  noneTag: T('없습니다', 'None', 'Ninguno', 'Nenhum', 'ありません', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  unitTitle: T('작은 b와 큰 B', 'Small b, capital B', 'La b pequeña y la B grande', 'O b pequeno e o B grande', '小文字のbと大文字のB', 'Kleines b, großes B', 'Petit b, grand B', 'छोटा b और बड़ा B', '小写 b 与大写 B', '小寫 b 與大寫 B'),

  unitNote: T(
    '통신사가 파는 100Mbps의 b는 비트이고, 파일 크기에 붙는 B는 바이트입니다. 1바이트가 8비트라 100Mbps 회선이 낼 수 있는 최대치는 12.5MB/s입니다. "기가 인터넷인데 왜 100MB/s가 안 나오나"라는 물음의 절반은 여기서 끝납니다.',
    'The b your provider sells in 100 Mbps is a bit; the B on a file size is a byte. Eight bits to the byte, so a 100 Mbps line tops out at 12.5 MB/s. Half of every "why isn’t my gigabit line giving me 100 MB/s" ends right here.',
    'La b que tu operador vende en 100 Mbps es un bit; la B del tamaño de un archivo es un byte. Ocho bits por byte, así que una línea de 100 Mbps llega como mucho a 12,5 MB/s. La mitad de los "¿por qué mi fibra gigabit no da 100 MB/s?" termina aquí.',
    'O b que a operadora vende em 100 Mbps é um bit; o B do tamanho do arquivo é um byte. Oito bits por byte, então uma linha de 100 Mbps chega no máximo a 12,5 MB/s. Metade dos "por que minha linha gigabit não dá 100 MB/s" acaba aqui.',
    '通信会社が売る100Mbpsのbはビット、ファイルサイズにつくBはバイトです。1バイトは8ビットなので、100Mbps回線の最大は12.5MB/sです。「ギガ回線なのに100MB/s出ない」という疑問の半分はここで片づきます。',
    'Das b in den 100 Mbit/s Ihres Anbieters ist ein Bit; das B einer Dateigröße ist ein Byte. Acht Bit je Byte, also schafft eine 100-Mbit/s-Leitung höchstens 12,5 MB/s. Die Hälfte aller Fragen "warum bringt mein Gigabit-Anschluss keine 100 MB/s" endet genau hier.',
    'Le b vendu dans les 100 Mb/s est un bit ; le B d’une taille de fichier est un octet. Huit bits par octet, donc une ligne à 100 Mb/s plafonne à 12,5 Mo/s. La moitié des « pourquoi ma fibre gigabit ne donne pas 100 Mo/s » s’arrête là.',
    'आपकी कंपनी जो 100 Mbps बेचती है उसका b बिट है; फ़ाइल आकार का B बाइट है। एक बाइट में आठ बिट, इसलिए 100 Mbps लाइन की सीमा 12.5 MB/s है। "गिगाबिट लाइन पर 100 MB/s क्यों नहीं" का आधा जवाब यहीं है।',
    '运营商卖的 100Mbps 里的 b 是比特，文件大小后面的 B 是字节。一字节八比特，所以 100Mbps 线路最快只有 12.5MB/s。"千兆宽带为什么跑不到 100MB/s" 的一半答案就在这里。',
    '電信商賣的 100Mbps 裡的 b 是位元，檔案大小後面的 B 是位元組。一位元組八位元，所以 100Mbps 線路最快只有 12.5MB/s。「千兆寬頻為什麼跑不到 100MB/s」的一半答案就在這裡。',
  ),

  overheadTitle: T('나머지 6%는 포장입니다', 'The other 6% is packaging', 'El otro 6% es embalaje', 'Os outros 6% são embalagem', '残りの6%は包みです', 'Die anderen 6 % sind Verpackung', 'Les 6 % restants sont de l’emballage', 'बाकी 6% पैकिंग है', '剩下的 6% 是包装', '剩下的 6% 是包裝'),

  overheadNote: T(
    '파일은 1448바이트씩 잘려 나가고, 조각마다 보내는 곳과 받는 곳 주소, 순번, 검사 값이 붙습니다. 조각과 조각 사이에는 반드시 쉬는 틈도 둡니다. 선 위로는 한 조각에 1538바이트가 지나가는데 그중 내 파일은 1448바이트뿐이라, 광고 속도의 94.1%만 파일이 됩니다.',
    'Your file leaves in 1,448-byte slices, and each slice carries a source and destination address, a sequence number and a checksum. Between slices the wire must also idle. One slice occupies 1,538 bytes of wire for 1,448 bytes of file, so only 94.1% of the advertised speed is ever your download.',
    'El archivo sale en trozos de 1448 bytes y cada trozo lleva dirección de origen y destino, número de secuencia y suma de control. Entre trozos el cable además descansa. Un trozo ocupa 1538 bytes de cable para 1448 bytes de archivo: solo el 94,1% de la velocidad anunciada es tu descarga.',
    'O arquivo sai em pedaços de 1448 bytes, e cada pedaço leva endereço de origem e destino, número de sequência e soma de verificação. Entre pedaços o cabo ainda descansa. Um pedaço ocupa 1538 bytes de cabo para 1448 bytes de arquivo: só 94,1% da velocidade anunciada é o seu download.',
    'ファイルは1448バイトずつに切られ、切れ端ごとに送り元と送り先の宛先、順番、検査値が付きます。切れ端の間には必ず休む間も置きます。線の上では1つの切れ端が1538バイトを占め、そのうち中身は1448バイトなので、広告速度の94.1%だけがファイルになります。',
    'Die Datei geht in 1.448-Byte-Stücken hinaus, und jedes Stück trägt Quell- und Zieladresse, eine Sequenznummer und eine Prüfsumme. Zwischen den Stücken muss die Leitung außerdem pausieren. Ein Stück belegt 1.538 Byte Leitung für 1.448 Byte Datei — nur 94,1 % der beworbenen Geschwindigkeit werden zum Download.',
    'Le fichier part en tranches de 1448 octets, et chaque tranche porte une adresse source et destination, un numéro de séquence et une somme de contrôle. Entre deux tranches, le câble doit aussi se taire. Une tranche occupe 1538 octets de câble pour 1448 octets de fichier : seuls 94,1 % du débit annoncé deviennent votre téléchargement.',
    'फ़ाइल 1448 बाइट के टुकड़ों में जाती है, और हर टुकड़े पर स्रोत और गंतव्य का पता, क्रम संख्या और जाँच मान लगता है। टुकड़ों के बीच तार को रुकना भी पड़ता है। एक टुकड़ा 1448 बाइट फ़ाइल के लिए तार पर 1538 बाइट घेरता है, इसलिए विज्ञापित गति का केवल 94.1% ही आपकी फ़ाइल बनता है।',
    '文件按 1448 字节切开，每一片都带着来源和目的地址、序号与校验值，片与片之间还必须留空隙。线路上一片要占 1538 字节，其中真正的文件只有 1448 字节，所以广告速度里只有 94.1% 变成下载。',
    '檔案按 1448 位元組切開，每一片都帶著來源和目的位址、序號與檢查值，片與片之間還必須留空隙。線路上一片要佔 1538 位元組，其中真正的檔案只有 1448 位元組，所以廣告速度裡只有 94.1% 變成下載。',
  ),

  gibTitle: T('탐색기가 보여 주는 크기', 'The size your file browser shows', 'El tamaño que muestra el explorador', 'O tamanho que o explorador mostra', 'エクスプローラーが見せる大きさ', 'Die Größe im Datei-Explorer', 'La taille affichée par l’explorateur', 'फ़ाइल ब्राउज़र जो आकार दिखाता है', '资源管理器显示的大小', '檔案總管顯示的大小'),

  gibNote: T(
    '4.7GB DVD를 윈도우에 넣으면 4.38GB로 보입니다. 디스크와 통신사는 1GB를 10억 바이트로 세고, 탐색기는 2의 30제곱인 10억 7374만 바이트를 1GB로 세면서 이름은 똑같이 GB라고 붙이기 때문입니다. 7% 차이가 여기서 생깁니다.',
    'Put a 4.7 GB DVD in a Windows machine and it reads 4.38 GB. Discs and providers count a GB as a billion bytes; the file browser counts 2³⁰ — 1,073,741,824 — and still calls it GB. That is where the 7% gap comes from.',
    'Mete un DVD de 4,7 GB en Windows y verás 4,38 GB. Los discos y los operadores cuentan un GB como mil millones de bytes; el explorador cuenta 2³⁰, es decir 1 073 741 824, y lo sigue llamando GB. De ahí sale la diferencia del 7%.',
    'Coloque um DVD de 4,7 GB no Windows e ele mostra 4,38 GB. Discos e operadoras contam um GB como um bilhão de bytes; o explorador conta 2³⁰, ou seja 1 073 741 824, e ainda o chama de GB. É daí que vem a diferença de 7%.',
    '4.7GBのDVDをWindowsに入れると4.38GBと出ます。ディスクや通信会社は1GBを10億バイトと数え、エクスプローラーは2の30乗である10億7374万バイトを1GBと数えながら名前は同じGBだからです。7%の差はここから出ます。',
    'Legen Sie eine 4,7-GB-DVD in einen Windows-Rechner, zeigt er 4,38 GB. Discs und Anbieter zählen ein GB als eine Milliarde Byte; der Explorer zählt 2³⁰, also 1.073.741.824, und nennt es trotzdem GB. Daher die 7 % Unterschied.',
    'Mettez un DVD de 4,7 Go dans Windows : il affiche 4,38 Go. Les disques et les opérateurs comptent un Go comme un milliard d’octets ; l’explorateur compte 2³⁰, soit 1 073 741 824, et l’appelle quand même Go. C’est de là que vient l’écart de 7 %.',
    '4.7 GB की DVD विंडोज़ में डालें तो 4.38 GB दिखती है। डिस्क और कंपनियाँ एक GB को एक अरब बाइट मानती हैं; फ़ाइल ब्राउज़र 2³⁰ यानी 1,073,741,824 गिनता है और नाम फिर भी GB रखता है। 7% का अंतर यहीं से आता है।',
    '把 4.7GB 的 DVD 放进 Windows，会显示 4.38GB。光盘和运营商把 1GB 当作十亿字节，资源管理器按 2 的 30 次方即 1073741824 字节算，却仍叫 GB。7% 的差就出在这里。',
    '把 4.7GB 的 DVD 放進 Windows，會顯示 4.38GB。光碟和電信商把 1GB 當作十億位元組，檔案總管按 2 的 30 次方即 1073741824 位元組算，卻仍叫 GB。7% 的差就出在這裡。',
  ),

  sameTitle: T('시간이 같아지는 칸', 'Cells that take the same time', 'Casillas que tardan lo mismo', 'Células que levam o mesmo tempo', '同じ時間になるマス', 'Felder mit gleicher Dauer', 'Cases de même durée', 'समान समय वाले खाने', '用时相同的格', '用時相同的格'),

  sameNote: T(
    '크기와 속도를 같은 배로 키우면 걸리는 시간은 그대로입니다. 1GB를 100Mbps로 받는 시간은 10GB를 1000Mbps로 받는 시간과 같습니다.',
    'Scale the size and the speed by the same factor and the clock does not move. 1 GB over 100 Mbps takes exactly as long as 10 GB over 1000 Mbps.',
    'Multiplica el tamaño y la velocidad por el mismo número y el reloj no se mueve. 1 GB a 100 Mbps tarda exactamente lo mismo que 10 GB a 1000 Mbps.',
    'Multiplique o tamanho e a velocidade pelo mesmo número e o relógio não se mexe. 1 GB a 100 Mbps leva exatamente o mesmo que 10 GB a 1000 Mbps.',
    '大きさと速さを同じ倍にすると時間は変わりません。1GBを100Mbpsで受ける時間は、10GBを1000Mbpsで受ける時間と同じです。',
    'Skaliert man Größe und Geschwindigkeit um denselben Faktor, bleibt die Uhr stehen. 1 GB über 100 Mbit/s dauert genauso lang wie 10 GB über 1000 Mbit/s.',
    'Multipliez la taille et le débit par le même facteur et le chronomètre ne bouge pas. 1 Go à 100 Mb/s prend exactement le même temps que 10 Go à 1000 Mb/s.',
    'आकार और गति दोनों को समान गुणा करें तो समय वही रहता है। 100 Mbps पर 1 GB में उतना ही समय लगता है जितना 1000 Mbps पर 10 GB में।',
    '把大小和速度按同样的倍数放大，用时不变。100Mbps 下载 1GB 和 1000Mbps 下载 10GB 花的时间一样。',
    '把大小和速度按同樣的倍數放大，用時不變。100Mbps 下載 1GB 和 1000Mbps 下載 10GB 花的時間一樣。',
  ),

  bottleTitle: T('회선보다 좁은 곳', 'Narrower than the line', 'Más estrecho que la línea', 'Mais estreito que a linha', '回線より狭いところ', 'Enger als die Leitung', 'Plus étroit que la ligne', 'लाइन से संकरा हिस्सा', '比线路更窄的地方', '比線路更窄的地方'),

  bottleNote: T(
    '회선이 아무리 빨라도 공유기와 기기 사이가 좁으면 거기서 막힙니다. Wi-Fi 5는 규격상 최대 866Mbps라 기가 회선을 다 받아내지 못하고, 기가 이더넷 포트도 1000Mbps에서 끝납니다. 아래 숫자는 규격이 말하는 최대치라 실제로는 더 낮게 나옵니다.',
    'However fast the line, a narrow hop between router and device caps everything. Wi-Fi 5 tops out at 866 Mbps on paper, so it cannot carry a gigabit line, and a gigabit port ends at 1000 Mbps. The figures below are the standards’ maximums; real links run lower.',
    'Por rápida que sea la línea, un tramo estrecho entre el router y el equipo lo limita todo. El Wi-Fi 5 llega a 866 Mbps sobre el papel, así que no puede con una línea gigabit, y un puerto gigabit termina en 1000 Mbps. Las cifras de abajo son los máximos del estándar; en la práctica salen más bajas.',
    'Por mais rápida que seja a linha, um trecho estreito entre roteador e aparelho limita tudo. O Wi-Fi 5 chega a 866 Mbps no papel, então não dá conta de uma linha gigabit, e uma porta gigabit termina em 1000 Mbps. Os números abaixo são os máximos da norma; na prática saem menores.',
    '回線がいくら速くても、ルーターと機器の間が狭ければそこで詰まります。Wi-Fi 5は規格上最大866Mbpsなのでギガ回線を受けきれず、ギガビットLANポートも1000Mbpsで終わりです。下の数字は規格の最大値なので、実際にはもっと低く出ます。',
    'So schnell die Leitung auch ist — ein enger Abschnitt zwischen Router und Gerät begrenzt alles. Wi-Fi 5 schafft auf dem Papier 866 Mbit/s und trägt damit keine Gigabit-Leitung; ein Gigabit-Port endet bei 1000 Mbit/s. Die Werte unten sind Normmaxima, real liegt es darunter.',
    'Aussi rapide soit la ligne, un maillon étroit entre la box et l’appareil plafonne le tout. Le Wi-Fi 5 monte à 866 Mb/s sur le papier : il ne peut pas porter une ligne gigabit, et un port gigabit s’arrête à 1000 Mb/s. Les chiffres ci-dessous sont les maxima des normes ; en vrai c’est moins.',
    'लाइन चाहे कितनी तेज़ हो, राउटर और डिवाइस के बीच का संकरा हिस्सा सब सीमित कर देता है। Wi-Fi 5 कागज़ पर 866 Mbps तक जाता है, इसलिए गिगाबिट लाइन नहीं संभाल सकता, और गिगाबिट पोर्ट 1000 Mbps पर खत्म होता है। नीचे के आँकड़े मानक की अधिकतम सीमा हैं; असल में इससे कम मिलता है।',
    '线路再快，路由器和设备之间若有窄口，就卡在那里。Wi-Fi 5 规格上限 866Mbps，撑不起千兆线路，千兆网口也只到 1000Mbps。下面的数字是标准的最大值，实际会更低。',
    '線路再快，路由器和裝置之間若有窄口，就卡在那裡。Wi-Fi 5 規格上限 866Mbps，撐不起千兆線路，千兆網路埠也只到 1000Mbps。下面的數字是標準的最大值，實際會更低。',
  ),

  streamTitle: T('동시에 흘릴 수 있는 수', 'How many streams fit', 'Cuántas transmisiones caben', 'Quantas transmissões cabem', '同時に流せる数', 'Wie viele Streams passen', 'Combien de flux tiennent', 'एक साथ कितनी स्ट्रीम', '能同时跑几路', '能同時跑幾路'),

  streamNote: T(
    '같은 회선을 여럿이 나눠 쓸 때의 셈입니다. 서비스가 권하는 값을 기준으로, 포장 몫을 뺀 실제 속도로 나눴습니다.',
    'What happens when the line is shared. Each figure divides the real speed, packaging already removed, by what the service recommends.',
    'Lo que pasa cuando se comparte la línea. Cada cifra divide la velocidad real, ya sin el embalaje, entre lo que recomienda el servicio.',
    'O que acontece quando a linha é dividida. Cada número divide a velocidade real, já sem a embalagem, pelo que o serviço recomenda.',
    '同じ回線を分け合うときの計算です。各サービスが勧める値を基準に、包みの分を引いた実際の速度で割りました。',
    'Was passiert, wenn die Leitung geteilt wird. Jede Zahl teilt das tatsächliche Tempo — Verpackung schon abgezogen — durch die Empfehlung des Dienstes.',
    'Ce qui se passe quand la ligne est partagée. Chaque chiffre divise le débit réel, emballage déjà retiré, par ce que recommande le service.',
    'जब लाइन साझा होती है तब का हिसाब। हर आँकड़ा असली गति को, पैकिंग हटाकर, सेवा की सिफ़ारिश से भाग देता है।',
    '这是多人共用同一条线路时的算法。以各服务推荐的码率为准，用扣掉包装后的实际速度去除。',
    '這是多人共用同一條線路時的算法。以各服務建議的位元率為準，用扣掉包裝後的實際速度去除。',
  ),

  tableTitle: T('크기와 속도로 찾기', 'Find it by size and speed', 'Búscalo por tamaño y velocidad', 'Ache por tamanho e velocidade', 'サイズと速度から探す', 'Nach Größe und Geschwindigkeit suchen', 'Chercher par taille et débit', 'आकार और गति से देखें', '按大小和速度查找', '按大小和速度查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  speedTitle: T('같은 파일, 다른 회선', 'Same file, other lines', 'Mismo archivo, otras líneas', 'Mesmo arquivo, outras linhas', '同じファイル、別の回線', 'Gleiche Datei, andere Leitungen', 'Même fichier, autres lignes', 'वही फ़ाइल, दूसरी लाइनें', '同一文件，不同线路', '同一檔案，不同線路'),
  sizeTitle: T('같은 회선, 다른 파일', 'Same line, other files', 'Misma línea, otros archivos', 'Mesma linha, outros arquivos', '同じ回線、別のファイル', 'Gleiche Leitung, andere Dateien', 'Même ligne, autres fichiers', 'वही लाइन, दूसरी फ़ाइलें', '同一线路，不同文件', '同一線路，不同檔案'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '표의 시간은 회선이 처음부터 끝까지 꽉 찼을 때입니다. 주는 쪽이 느리거나 여럿이 나눠 쓰면 그만큼 늘어납니다.',
      '작은 b는 비트, 큰 B는 바이트입니다. 8로 나눠야 MB/s가 됩니다.',
      '실제로 쌓이는 속도는 광고 속도의 94.1%입니다 — 나머지는 주소와 순번이 가져갑니다.',
      '크기는 10진 단위입니다. 윈도우 탐색기가 말하는 GB와는 7% 차이가 납니다.',
    ],
    [
      'These times assume the line stays full from start to finish. A slow server or a shared connection stretches them.',
      'Small b is bits, capital B is bytes. Divide by eight to get MB/s.',
      'The speed you actually see is 94.1% of the advertised one — addresses and sequence numbers take the rest.',
      'Sizes here are decimal. Windows Explorer’s GB is 7% larger than this one.',
    ],
    [
      'Estos tiempos suponen que la línea va llena de principio a fin. Un servidor lento o una conexión compartida los alargan.',
      'La b pequeña son bits y la B grande son bytes. Divide entre ocho para obtener MB/s.',
      'La velocidad que realmente ves es el 94,1% de la anunciada; el resto se lo llevan direcciones y números de secuencia.',
      'Los tamaños son decimales. El GB del explorador de Windows es un 7% mayor que este.',
    ],
    [
      'Estes tempos supõem a linha cheia do início ao fim. Um servidor lento ou uma conexão compartilhada os alongam.',
      'O b pequeno são bits e o B grande são bytes. Divida por oito para obter MB/s.',
      'A velocidade que você realmente vê é 94,1% da anunciada; o resto fica com endereços e números de sequência.',
      'Os tamanhos são decimais. O GB do explorador do Windows é 7% maior que este.',
    ],
    [
      '表の時間は回線が最初から最後まで満杯だった場合です。相手が遅かったり分け合ったりすればその分伸びます。',
      '小文字のbはビット、大文字のBはバイトです。8で割るとMB/sになります。',
      '実際に出る速度は広告速度の94.1%です。残りは宛先と順番が持っていきます。',
      'ここでの大きさは10進です。Windowsのエクスプローラーが言うGBとは7%ずれます。',
    ],
    [
      'Diese Zeiten setzen eine von Anfang bis Ende volle Leitung voraus. Ein langsamer Server oder geteilte Nutzung dehnt sie.',
      'Kleines b sind Bit, großes B sind Byte. Durch acht teilen ergibt MB/s.',
      'Was tatsächlich ankommt, sind 94,1 % der beworbenen Geschwindigkeit — den Rest holen Adressen und Sequenznummern.',
      'Die Größen sind dezimal. Das GB im Windows-Explorer ist 7 % größer als dieses hier.',
    ],
    [
      'Ces temps supposent une ligne pleine du début à la fin. Un serveur lent ou une connexion partagée les allonge.',
      'Le petit b, ce sont des bits ; le grand B, des octets. Divisez par huit pour obtenir des Mo/s.',
      'Le débit réellement constaté vaut 94,1 % de celui annoncé — le reste part en adresses et numéros de séquence.',
      'Les tailles sont décimales. Le Go de l’explorateur Windows est 7 % plus gros que celui-ci.',
    ],
    [
      'ये समय मानते हैं कि लाइन शुरू से अंत तक भरी रहती है। धीमा सर्वर या साझा कनेक्शन इन्हें बढ़ा देता है।',
      'छोटा b बिट है, बड़ा B बाइट। आठ से भाग देने पर MB/s मिलता है।',
      'असल में दिखने वाली गति विज्ञापित गति का 94.1% है — बाकी पते और क्रम संख्या ले जाते हैं।',
      'यहाँ आकार दशमलव में हैं। विंडोज़ एक्सप्लोरर का GB इससे 7% बड़ा है।',
    ],
    [
      '表中的时间假设线路自始至终跑满。对方服务器慢或多人共用都会拉长。',
      '小写 b 是比特，大写 B 是字节。除以八才是 MB/s。',
      '真正跑出来的速度是广告速度的 94.1%，其余被地址和序号拿走。',
      '这里的大小按十进制。Windows 资源管理器说的 GB 比这个大 7%。',
    ],
    [
      '表中的時間假設線路自始至終跑滿。對方伺服器慢或多人共用都會拉長。',
      '小寫 b 是位元，大寫 B 是位元組。除以八才是 MB/s。',
      '真正跑出來的速度是廣告速度的 94.1%，其餘被位址和序號拿走。',
      '這裡的大小按十進位。Windows 檔案總管說的 GB 比這個大 7%。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '다운로드 시간 계산 — 파일 크기 24가지 × 회선 속도 10가지',
    'Download time calculator — 24 file sizes across 10 line speeds',
    'Calculadora de tiempo de descarga — 24 tamaños y 10 velocidades',
    'Calculadora de tempo de download — 24 tamanhos e 10 velocidades',
    'ダウンロード時間の計算 — サイズ24通り×回線10通り',
    'Downloadzeit berechnen — 24 Dateigrößen und 10 Geschwindigkeiten',
    'Calcul du temps de téléchargement — 24 tailles et 10 débits',
    'डाउनलोड समय कैलकुलेटर — 24 आकार और 10 गति',
    '下载时间计算 — 24 种大小 × 10 种线路速度',
    '下載時間計算 — 24 種大小 × 10 種線路速度',
  ),

  hubMetaDesc: T(
    '100Mbps로 1GB는 85초. 파일 크기와 회선 속도가 만나는 240칸마다 걸리는 시간, 실제 MB/s, 어디가 병목인지까지 계산했습니다.',
    '1 GB over 100 Mbps takes 85 seconds. For all 240 pairings of file size and line speed: the time, the real MB/s, and which hop is the bottleneck.',
    '1 GB a 100 Mbps tarda 85 segundos. Para los 240 cruces de tamaño y velocidad: el tiempo, los MB/s reales y dónde está el cuello de botella.',
    '1 GB a 100 Mbps leva 85 segundos. Para os 240 cruzamentos de tamanho e velocidade: o tempo, os MB/s reais e onde está o gargalo.',
    '100Mbpsで1GBは85秒。ファイルサイズと回線速度が出会う240マスごとの所要時間、実際のMB/s、どこが詰まるかまで計算しました。',
    '1 GB über 100 Mbit/s dauert 85 Sekunden. Für alle 240 Kombinationen aus Dateigröße und Leitung: die Zeit, die echten MB/s und wo der Engpass sitzt.',
    '1 Go à 100 Mb/s prend 85 secondes. Pour les 240 croisements taille × débit : le temps, les Mo/s réels et où se situe le goulot.',
    '100 Mbps पर 1 GB में 85 सेकंड। फ़ाइल आकार और लाइन गति के सभी 240 मेलों का समय, असली MB/s और अड़चन कहाँ है।',
    '100Mbps 下载 1GB 需 85 秒。文件大小与线路速度交汇的 240 格，每格的用时、真实 MB/s 和瓶颈在哪。',
    '100Mbps 下載 1GB 需 85 秒。檔案大小與線路速度交匯的 240 格，每格的用時、真實 MB/s 和瓶頸在哪。',
  ),

  desc: T<(f: BandwidthFacts) => string>(
    f => `광고하는 ${f.cell.mbps}Mbps는 최대 ${f.peak}MB/s이고, 주소와 순번이 가져가는 몫을 빼면 ${f.perSecond}MB/s가 남습니다.`,
    f => `The advertised ${f.cell.mbps} Mbps caps at ${f.peak} MB/s, and once addresses and sequence numbers take their share, ${f.perSecond} MB/s is left.`,
    f => `Los ${f.cell.mbps} Mbps anunciados llegan a ${f.peak} MB/s, y tras la parte que se llevan direcciones y números de secuencia quedan ${f.perSecond} MB/s.`,
    f => `Os ${f.cell.mbps} Mbps anunciados chegam a ${f.peak} MB/s, e depois da parte que endereços e números de sequência levam sobram ${f.perSecond} MB/s.`,
    f => `広告の${f.cell.mbps}Mbpsは最大${f.peak}MB/s、宛先と順番が持っていく分を引くと${f.perSecond}MB/sが残ります。`,
    f => `Die beworbenen ${f.cell.mbps} Mbit/s enden bei ${f.peak} MB/s; nach dem Anteil für Adressen und Sequenznummern bleiben ${f.perSecond} MB/s.`,
    f => `Les ${f.cell.mbps} Mb/s annoncés plafonnent à ${f.peak} Mo/s, et une fois la part des adresses et numéros de séquence retirée, il reste ${f.perSecond} Mo/s.`,
    f => `विज्ञापित ${f.cell.mbps} Mbps की सीमा ${f.peak} MB/s है, और पते व क्रम संख्या का हिस्सा हटाने पर ${f.perSecond} MB/s बचता है।`,
    f => `广告里的 ${f.cell.mbps}Mbps 最高 ${f.peak}MB/s，扣掉地址和序号占的部分后剩 ${f.perSecond}MB/s。`,
    f => `廣告裡的 ${f.cell.mbps}Mbps 最高 ${f.peak}MB/s，扣掉位址和序號佔的部分後剩 ${f.perSecond}MB/s。`,
  ),

  metaTitle: T<(f: BandwidthFacts) => string>(
    f => `${f.size} 파일을 ${f.cell.mbps}Mbps로 — ${ko(f)}`,
    f => `${f.size} over ${f.cell.mbps} Mbps — ${en(f)}`,
    f => `${f.size} a ${f.cell.mbps} Mbps — ${en(f)}`,
    f => `${f.size} a ${f.cell.mbps} Mbps — ${en(f)}`,
    f => `${f.size}を${f.cell.mbps}Mbpsで — ${ja(f)}`,
    f => `${f.size} über ${f.cell.mbps} Mbit/s — ${en(f)}`,
    f => `${f.size} à ${f.cell.mbps} Mb/s — ${en(f)}`,
    f => `${f.cell.mbps} Mbps पर ${f.size} — ${hi(f)}`,
    f => `${f.cell.mbps}Mbps 下载 ${f.size} — ${zh(f)}`,
    f => `${f.cell.mbps}Mbps 下載 ${f.size} — ${tw(f)}`,
  ),

  metaDesc: T<(f: BandwidthFacts) => string>(
    f => `${f.size} 파일을 ${f.cell.mbps}Mbps 회선으로 받으면 ${ko(f)} 걸립니다. 실제 속도는 ${f.perSecond}MB/s, 1분 안에 받으려면 ${f.minuteSpeed}Mbps가 필요합니다.`,
    f => `A ${f.size} file over a ${f.cell.mbps} Mbps line takes ${en(f)}. Real speed ${f.perSecond} MB/s; finishing within a minute would need ${f.minuteSpeed} Mbps.`,
    f => `Un archivo de ${f.size} por una línea de ${f.cell.mbps} Mbps tarda ${en(f)}. Velocidad real ${f.perSecond} MB/s; para acabar en un minuto harían falta ${f.minuteSpeed} Mbps.`,
    f => `Um arquivo de ${f.size} por uma linha de ${f.cell.mbps} Mbps leva ${en(f)}. Velocidade real ${f.perSecond} MB/s; para terminar em um minuto seriam necessários ${f.minuteSpeed} Mbps.`,
    f => `${f.size}のファイルを${f.cell.mbps}Mbps回線で受けると${ja(f)}かかります。実際の速度は${f.perSecond}MB/s、1分で終えるには${f.minuteSpeed}Mbpsが必要です。`,
    f => `Eine ${f.size}-Datei über ${f.cell.mbps} Mbit/s dauert ${en(f)}. Echtes Tempo ${f.perSecond} MB/s; für eine Minute bräuchte es ${f.minuteSpeed} Mbit/s.`,
    f => `Un fichier de ${f.size} sur une ligne à ${f.cell.mbps} Mb/s prend ${en(f)}. Débit réel ${f.perSecond} Mo/s ; finir en une minute demanderait ${f.minuteSpeed} Mb/s.`,
    f => `${f.cell.mbps} Mbps लाइन पर ${f.size} की फ़ाइल में ${hi(f)} लगते हैं। असली गति ${f.perSecond} MB/s; एक मिनट में पूरा करने के लिए ${f.minuteSpeed} Mbps चाहिए।`,
    f => `${f.cell.mbps}Mbps 线路下载 ${f.size} 文件需 ${zh(f)}。实际速度 ${f.perSecond}MB/s，想在一分钟内下完需要 ${f.minuteSpeed}Mbps。`,
    f => `${f.cell.mbps}Mbps 線路下載 ${f.size} 檔案需 ${tw(f)}。實際速度 ${f.perSecond}MB/s，想在一分鐘內下完需要 ${f.minuteSpeed}Mbps。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '100Mbps면 1GB에 얼마나 걸리나요?', a: '85초입니다. 나눗셈만 하면 80초지만, 조각마다 붙는 주소와 순번 때문에 5초가 더 붙습니다.' },
      { q: '기가 인터넷인데 왜 100MB/s가 안 나오나요?', a: '1000Mbps의 최대는 125MB/s이고 포장 몫을 빼면 117MB/s입니다. 그마저 Wi-Fi 5나 기가 이더넷 포트를 지나면 더 내려갑니다.' },
      { q: 'Mbps와 MB/s는 무엇이 다른가요?', a: '작은 b는 비트, 큰 B는 바이트입니다. 8로 나누면 MB/s가 되고, 100Mbps는 12.5MB/s입니다.' },
      { q: '4.7GB DVD가 왜 4.38GB로 보이나요?', a: '같은 파일을 다른 자로 잰 것입니다. 디스크는 10억 바이트를 1GB로 세고, 탐색기는 10억 7374만 바이트를 1GB로 셉니다.' },
      { q: '표보다 오래 걸리는데요?', a: '표는 회선이 꽉 찼을 때입니다. 주는 쪽 서버 속도, 공유기, Wi-Fi, 동시에 켜 둔 다른 기기가 모두 시간을 늘립니다.' },
    ],
    [
      { q: 'How long does 1 GB take on 100 Mbps?', a: '85 seconds. Plain division says 80, and the addresses and sequence numbers on every slice add the other five.' },
      { q: 'Why doesn’t my gigabit line give 100 MB/s?', a: '1000 Mbps caps at 125 MB/s and lands at 117 MB/s once packaging is removed. Pass it through Wi-Fi 5 or a gigabit port and it drops further.' },
      { q: 'What is the difference between Mbps and MB/s?', a: 'Small b is bits, capital B is bytes. Divide by eight: 100 Mbps is 12.5 MB/s.' },
      { q: 'Why does a 4.7 GB DVD show as 4.38 GB?', a: 'Same file, different ruler. Discs count a billion bytes to the GB; the file browser counts 1,073,741,824.' },
      { q: 'Mine is slower than the table says.', a: 'The table assumes a full line. The serving side, your router, Wi-Fi and every other device sharing the connection all add time.' },
    ],
    [
      { q: '¿Cuánto tarda 1 GB a 100 Mbps?', a: '85 segundos. La división simple dice 80; las direcciones y números de secuencia de cada trozo ponen los otros cinco.' },
      { q: '¿Por qué mi línea gigabit no da 100 MB/s?', a: '1000 Mbps llega a 125 MB/s y queda en 117 MB/s al quitar el embalaje. Si pasa por Wi-Fi 5 o un puerto gigabit, baja más.' },
      { q: '¿Qué diferencia hay entre Mbps y MB/s?', a: 'La b pequeña son bits y la B grande son bytes. Divide entre ocho: 100 Mbps son 12,5 MB/s.' },
      { q: '¿Por qué un DVD de 4,7 GB aparece como 4,38 GB?', a: 'Mismo archivo, regla distinta. Los discos cuentan mil millones de bytes por GB; el explorador cuenta 1 073 741 824.' },
      { q: 'A mí me va más lento que en la tabla.', a: 'La tabla supone la línea llena. El servidor que envía, el router, el Wi-Fi y cualquier otro equipo conectado suman tiempo.' },
    ],
    [
      { q: 'Quanto tempo leva 1 GB a 100 Mbps?', a: '85 segundos. A divisão simples diz 80; os endereços e números de sequência de cada pedaço põem os outros cinco.' },
      { q: 'Por que minha linha gigabit não dá 100 MB/s?', a: '1000 Mbps chega a 125 MB/s e fica em 117 MB/s tirando a embalagem. Passando por Wi-Fi 5 ou porta gigabit, cai mais.' },
      { q: 'Qual a diferença entre Mbps e MB/s?', a: 'O b pequeno são bits e o B grande são bytes. Divida por oito: 100 Mbps são 12,5 MB/s.' },
      { q: 'Por que um DVD de 4,7 GB aparece como 4,38 GB?', a: 'Mesmo arquivo, régua diferente. Discos contam um bilhão de bytes por GB; o explorador conta 1 073 741 824.' },
      { q: 'O meu está mais lento que a tabela.', a: 'A tabela supõe a linha cheia. O servidor que envia, o roteador, o Wi-Fi e qualquer outro aparelho conectado somam tempo.' },
    ],
    [
      { q: '100Mbpsで1GBはどれくらいかかりますか？', a: '85秒です。割り算だけなら80秒ですが、切れ端ごとに付く宛先と順番が残り5秒を足します。' },
      { q: 'ギガ回線なのになぜ100MB/s出ないのですか？', a: '1000Mbpsの最大は125MB/s、包みの分を引くと117MB/sです。Wi-Fi 5やギガビットLANポートを通ればさらに下がります。' },
      { q: 'MbpsとMB/sは何が違いますか？', a: '小文字のbはビット、大文字のBはバイトです。8で割ると100Mbpsは12.5MB/sになります。' },
      { q: '4.7GBのDVDがなぜ4.38GBと出るのですか？', a: '同じファイルを別の物差しで測ったからです。ディスクは10億バイトを1GBと数え、エクスプローラーは10億7374万バイトを1GBと数えます。' },
      { q: '表より遅いのですが。', a: '表は回線が満杯のときの値です。送る側のサーバー、ルーター、Wi-Fi、同時につないだ他の機器がすべて時間を足します。' },
    ],
    [
      { q: 'Wie lange dauert 1 GB bei 100 Mbit/s?', a: '85 Sekunden. Reines Teilen sagt 80; Adressen und Sequenznummern auf jedem Stück legen die anderen fünf drauf.' },
      { q: 'Warum bringt mein Gigabit-Anschluss keine 100 MB/s?', a: '1000 Mbit/s enden bei 125 MB/s und nach Abzug der Verpackung bei 117 MB/s. Über Wi-Fi 5 oder einen Gigabit-Port sinkt es weiter.' },
      { q: 'Was ist der Unterschied zwischen Mbit/s und MB/s?', a: 'Kleines b sind Bit, großes B sind Byte. Durch acht geteilt: 100 Mbit/s sind 12,5 MB/s.' },
      { q: 'Warum zeigt eine 4,7-GB-DVD nur 4,38 GB?', a: 'Gleiche Datei, anderes Maß. Discs zählen eine Milliarde Byte je GB, der Explorer zählt 1.073.741.824.' },
      { q: 'Bei mir dauert es länger als in der Tabelle.', a: 'Die Tabelle nimmt eine volle Leitung an. Der sendende Server, der Router, das WLAN und jedes weitere Gerät an der Leitung kosten Zeit.' },
    ],
    [
      { q: 'Combien de temps pour 1 Go à 100 Mb/s ?', a: '85 secondes. La simple division dit 80 ; les adresses et numéros de séquence de chaque tranche ajoutent les cinq autres.' },
      { q: 'Pourquoi ma ligne gigabit ne donne-t-elle pas 100 Mo/s ?', a: '1000 Mb/s plafonnent à 125 Mo/s et tombent à 117 Mo/s une fois l’emballage retiré. En passant par le Wi-Fi 5 ou un port gigabit, cela baisse encore.' },
      { q: 'Quelle différence entre Mb/s et Mo/s ?', a: 'Le petit b, ce sont des bits ; le grand B, des octets. Divisez par huit : 100 Mb/s font 12,5 Mo/s.' },
      { q: 'Pourquoi un DVD de 4,7 Go s’affiche-t-il en 4,38 Go ?', a: 'Même fichier, autre règle. Les disques comptent un milliard d’octets par Go ; l’explorateur en compte 1 073 741 824.' },
      { q: 'Chez moi c’est plus lent que le tableau.', a: 'Le tableau suppose une ligne pleine. Le serveur qui envoie, la box, le Wi-Fi et tout autre appareil connecté ajoutent du temps.' },
    ],
    [
      { q: '100 Mbps पर 1 GB में कितना समय लगता है?', a: '85 सेकंड। सीधा भाग 80 कहता है; हर टुकड़े पर लगे पते और क्रम संख्या बाकी पाँच जोड़ते हैं।' },
      { q: 'गिगाबिट लाइन पर 100 MB/s क्यों नहीं मिलता?', a: '1000 Mbps की सीमा 125 MB/s है और पैकिंग हटाने पर 117 MB/s रहती है। Wi-Fi 5 या गिगाबिट पोर्ट से गुज़रे तो और घटती है।' },
      { q: 'Mbps और MB/s में क्या अंतर है?', a: 'छोटा b बिट है, बड़ा B बाइट। आठ से भाग दें: 100 Mbps यानी 12.5 MB/s।' },
      { q: '4.7 GB की DVD 4.38 GB क्यों दिखती है?', a: 'वही फ़ाइल, अलग पैमाना। डिस्क एक अरब बाइट को 1 GB गिनती है; फ़ाइल ब्राउज़र 1,073,741,824 गिनता है।' },
      { q: 'मेरा तालिका से धीमा है।', a: 'तालिका मानती है कि लाइन भरी है। भेजने वाला सर्वर, राउटर, Wi-Fi और साथ जुड़े दूसरे उपकरण सब समय बढ़ाते हैं।' },
    ],
    [
      { q: '100Mbps 下载 1GB 要多久？', a: '85 秒。只做除法是 80 秒，每片上的地址和序号又加了五秒。' },
      { q: '千兆宽带为什么跑不到 100MB/s？', a: '1000Mbps 最高 125MB/s，扣掉包装后是 117MB/s。再经过 Wi-Fi 5 或千兆网口还会更低。' },
      { q: 'Mbps 和 MB/s 有什么不同？', a: '小写 b 是比特，大写 B 是字节。除以八：100Mbps 就是 12.5MB/s。' },
      { q: '4.7GB 的 DVD 为什么显示 4.38GB？', a: '同一个文件，两把尺子。光盘按十亿字节算 1GB，资源管理器按 1073741824 字节算。' },
      { q: '我这边比表里慢。', a: '表假设线路跑满。对方服务器、路由器、Wi-Fi 以及同时联网的其他设备都会拉长时间。' },
    ],
    [
      { q: '100Mbps 下載 1GB 要多久？', a: '85 秒。只做除法是 80 秒，每片上的位址和序號又加了五秒。' },
      { q: '千兆寬頻為什麼跑不到 100MB/s？', a: '1000Mbps 最高 125MB/s，扣掉包裝後是 117MB/s。再經過 Wi-Fi 5 或千兆網路埠還會更低。' },
      { q: 'Mbps 和 MB/s 有什麼不同？', a: '小寫 b 是位元，大寫 B 是位元組。除以八：100Mbps 就是 12.5MB/s。' },
      { q: '4.7GB 的 DVD 為什麼顯示 4.38GB？', a: '同一個檔案，兩把尺。光碟按十億位元組算 1GB，檔案總管按 1073741824 位元組算。' },
      { q: '我這邊比表裡慢。', a: '表假設線路跑滿。對方伺服器、路由器、Wi-Fi 以及同時連網的其他裝置都會拉長時間。' },
    ],
  ),

  cellFaq: T<(f: BandwidthFacts) => FaqItem[]>(
    f => [
      { q: `${f.size} 파일을 ${f.cell.mbps}Mbps로 받으면 얼마나 걸리나요?`, a: `${ko(f)} 걸립니다. 나눗셈만 하면 ${f.ideal}초지만 포장 몫이 붙습니다.` },
      { q: `실제 속도는 얼마나 나오나요?`, a: `${f.perSecond}MB/s입니다. 광고 속도를 8로 나눈 ${f.peak}MB/s에서 주소와 순번 몫이 빠진 값입니다.` },
      { q: `1분 안에 받으려면 얼마가 필요한가요?`, a: `${f.minuteSpeed}Mbps 회선이 필요합니다. 지금 회선은 ${f.cell.mbps}Mbps입니다.` },
      { q: `이 파일은 탐색기에서 몇 GB로 보이나요?`, a: `${f.gib}GB로 보입니다. 같은 파일을 2의 제곱 단위로 센 값입니다.` },
    ],
    f => [
      { q: `How long does ${f.size} take over ${f.cell.mbps} Mbps?`, a: `${en(f)}. Plain division says ${f.ideal} seconds; packaging adds the rest.` },
      { q: `What speed will I actually see?`, a: `${f.perSecond} MB/s. The advertised rate divided by eight gives ${f.peak} MB/s, and addresses and sequence numbers take their share of that.` },
      { q: `What would finish it within a minute?`, a: `A ${f.minuteSpeed} Mbps line. This one is ${f.cell.mbps} Mbps.` },
      { q: `What size does the file browser show?`, a: `${f.gib} GB — the same file counted in powers of two.` },
    ],
    f => [
      { q: `¿Cuánto tarda ${f.size} a ${f.cell.mbps} Mbps?`, a: `${en(f)}. La división simple dice ${f.ideal} segundos; el embalaje pone el resto.` },
      { q: `¿Qué velocidad veré en realidad?`, a: `${f.perSecond} MB/s. La velocidad anunciada entre ocho da ${f.peak} MB/s, y de ahí se llevan su parte las direcciones y los números de secuencia.` },
      { q: `¿Qué haría falta para acabar en un minuto?`, a: `Una línea de ${f.minuteSpeed} Mbps. Esta es de ${f.cell.mbps} Mbps.` },
      { q: `¿Qué tamaño muestra el explorador?`, a: `${f.gib} GB, el mismo archivo contado en potencias de dos.` },
    ],
    f => [
      { q: `Quanto tempo leva ${f.size} a ${f.cell.mbps} Mbps?`, a: `${en(f)}. A divisão simples diz ${f.ideal} segundos; a embalagem põe o resto.` },
      { q: `Que velocidade vou ver de verdade?`, a: `${f.perSecond} MB/s. A velocidade anunciada dividida por oito dá ${f.peak} MB/s, e daí endereços e números de sequência levam sua parte.` },
      { q: `O que seria preciso para terminar em um minuto?`, a: `Uma linha de ${f.minuteSpeed} Mbps. Esta é de ${f.cell.mbps} Mbps.` },
      { q: `Que tamanho o explorador mostra?`, a: `${f.gib} GB, o mesmo arquivo contado em potências de dois.` },
    ],
    f => [
      { q: `${f.size}のファイルを${f.cell.mbps}Mbpsで受けるとどれくらいですか？`, a: `${ja(f)}かかります。割り算だけなら${f.ideal}秒ですが、包みの分が乗ります。` },
      { q: `実際に出る速度はどれくらいですか？`, a: `${f.perSecond}MB/sです。広告速度を8で割った${f.peak}MB/sから、宛先と順番の分が引かれた値です。` },
      { q: `1分で終えるには何が必要ですか？`, a: `${f.minuteSpeed}Mbpsの回線が必要です。今は${f.cell.mbps}Mbpsです。` },
      { q: `エクスプローラーでは何GBと出ますか？`, a: `${f.gib}GBと出ます。同じファイルを2の累乗で数えた値です。` },
    ],
    f => [
      { q: `Wie lange dauert ${f.size} bei ${f.cell.mbps} Mbit/s?`, a: `${en(f)}. Reines Teilen sagt ${f.ideal} Sekunden; die Verpackung legt den Rest drauf.` },
      { q: `Welches Tempo sehe ich tatsächlich?`, a: `${f.perSecond} MB/s. Die beworbene Rate durch acht ergibt ${f.peak} MB/s, davon holen sich Adressen und Sequenznummern ihren Anteil.` },
      { q: `Was bräuchte es für eine Minute?`, a: `Eine Leitung mit ${f.minuteSpeed} Mbit/s. Diese hat ${f.cell.mbps} Mbit/s.` },
      { q: `Welche Größe zeigt der Datei-Explorer?`, a: `${f.gib} GB — dieselbe Datei in Zweierpotenzen gezählt.` },
    ],
    f => [
      { q: `Combien de temps pour ${f.size} à ${f.cell.mbps} Mb/s ?`, a: `${en(f)}. La simple division dit ${f.ideal} secondes ; l’emballage ajoute le reste.` },
      { q: `Quel débit vais-je vraiment voir ?`, a: `${f.perSecond} Mo/s. Le débit annoncé divisé par huit donne ${f.peak} Mo/s, et les adresses et numéros de séquence y prennent leur part.` },
      { q: `Que faudrait-il pour finir en une minute ?`, a: `Une ligne à ${f.minuteSpeed} Mb/s. Celle-ci est à ${f.cell.mbps} Mb/s.` },
      { q: `Quelle taille affiche l’explorateur ?`, a: `${f.gib} Go — le même fichier compté en puissances de deux.` },
    ],
    f => [
      { q: `${f.cell.mbps} Mbps पर ${f.size} में कितना समय लगेगा?`, a: `${hi(f)}। सीधा भाग ${f.ideal} सेकंड कहता है; पैकिंग बाकी जोड़ती है।` },
      { q: `असल में कितनी गति मिलेगी?`, a: `${f.perSecond} MB/s। विज्ञापित गति को आठ से भाग देने पर ${f.peak} MB/s आता है, उसमें से पते और क्रम संख्या अपना हिस्सा लेते हैं।` },
      { q: `एक मिनट में पूरा करने के लिए क्या चाहिए?`, a: `${f.minuteSpeed} Mbps की लाइन चाहिए। यह लाइन ${f.cell.mbps} Mbps की है।` },
      { q: `फ़ाइल ब्राउज़र कितना आकार दिखाएगा?`, a: `${f.gib} GB — वही फ़ाइल दो की घातों में गिनी गई।` },
    ],
    f => [
      { q: `${f.cell.mbps}Mbps 下载 ${f.size} 要多久？`, a: `需要 ${zh(f)}。只做除法是 ${f.ideal} 秒，包装占去其余。` },
      { q: `实际能跑多快？`, a: `${f.perSecond}MB/s。广告速度除以八得 ${f.peak}MB/s，地址和序号再从中拿走一部分。` },
      { q: `想在一分钟内下完需要多快？`, a: `需要 ${f.minuteSpeed}Mbps 的线路，这条是 ${f.cell.mbps}Mbps。` },
      { q: `资源管理器会显示多大？`, a: `显示 ${f.gib}GB，同一个文件按二的幂来数。` },
    ],
    f => [
      { q: `${f.cell.mbps}Mbps 下載 ${f.size} 要多久？`, a: `需要 ${tw(f)}。只做除法是 ${f.ideal} 秒，包裝佔去其餘。` },
      { q: `實際能跑多快？`, a: `${f.perSecond}MB/s。廣告速度除以八得 ${f.peak}MB/s，位址和序號再從中拿走一部分。` },
      { q: `想在一分鐘內下完需要多快？`, a: `需要 ${f.minuteSpeed}Mbps 的線路，這條是 ${f.cell.mbps}Mbps。` },
      { q: `檔案總管會顯示多大？`, a: `顯示 ${f.gib}GB，同一個檔案按二的冪來數。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const BANDWIDTH_UI: L<BandwidthUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<BandwidthUI>;
