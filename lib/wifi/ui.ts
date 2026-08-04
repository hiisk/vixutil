/**
 * 무선랜 채널 화면의 문구 — 열 언어.
 *
 * 이 표를 찾는 자리는 대개 공유기 설정 화면 앞이다. "채널 자동으로 두면 되나,
 * 1·6·11 중에 골라야 하나"가 그 자리의 물음이고, 문구도 거기서 시작한다.
 *
 * 어느 채널을 쓸 수 있는지는 나라마다 다르다. 12·13번은 한국·유럽·일본에서 쓰지만
 * 미국에서는 못 쓰고, 14번은 일본뿐이다. 그 사실을 낱장마다 밝혀 둔다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { WifiFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface WifiUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  bandName: (band: string) => string;
  centerLabel: string;
  spanLabel: string;
  overlapLabel: string;
  pairLabel: string;
  dfsLabel: string;
  restrictedLabel: string;
  noneTag: string;
  yesTag: string;
  overlapTitle: string;
  overlapNote: string;
  cleanTitle: string;
  cleanNote: string;
  dfsTitle: string;
  dfsNote: string;
  bandTitle: string;
  bandNote: string;
  neighbourTitle: string;
  caution: string;
  desc: (f: WifiFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: WifiFacts) => string;
  metaDesc: (f: WifiFacts) => string;
  hubFaq: FaqItem[];
  wifiFaq: (f: WifiFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 대역 이름 — 숫자는 어디서나 같고 붙는 말만 다르다 */
const band = (ghz: string) => (key: string): string =>
  ({ '2g': `2.4${ghz}`, '5g': `5${ghz}`, '6g': `6${ghz}` }[key] ?? key);

type Spec = { [K in keyof WifiUI]: L<WifiUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('와이파이 채널', 'Wi-Fi channels', 'Canales Wi-Fi', 'Canais Wi-Fi', 'Wi-Fiチャンネル', 'WLAN-Kanäle', 'Canaux Wi-Fi', 'वाई-फ़ाई चैनल', 'Wi-Fi 信道', 'Wi-Fi 頻道'),

  bandName: T<(key: string) => string>(
    band('GHz 대역'), band(' GHz band'), band(' GHz'), band(' GHz'), band('GHz帯'),
    band('-GHz-Band'), band(' GHz'), band(' GHz बैंड'), band('GHz 频段'), band('GHz 頻段'),
  ),

  hubTitle: T(
    '와이파이 채널 101가지 — 왜 1·6·11인가',
    '101 Wi-Fi channels — and why it is 1, 6 and 11',
    '101 canales Wi-Fi — y por qué son 1, 6 y 11',
    '101 canais Wi-Fi — e por que são 1, 6 e 11',
    'Wi-Fiチャンネル101種 — なぜ1・6・11なのか',
    '101 WLAN-Kanäle — und warum es 1, 6 und 11 sind',
    '101 canaux Wi-Fi — et pourquoi 1, 6 et 11',
    '101 वाई-फ़ाई चैनल — और 1, 6, 11 ही क्यों',
    '101 个 Wi-Fi 信道 — 为什么是 1、6、11',
    '101 個 Wi-Fi 頻道 — 為什麼是 1、6、11',
  ),

  hubLead: T(
    '채널 번호와 주파수 사이에는 정해진 식이 있습니다. 2.4GHz는 2407에 번호의 다섯 배를 더하면 중심 주파수가 나오고, 신호는 그 둘레로 22MHz를 차지합니다.',
    'Channel numbers and frequencies are tied by a formula: on 2.4 GHz the centre is 2407 plus five times the number, and the signal spreads 22 MHz around it.',
    'El número de canal y la frecuencia van unidos por una fórmula: en 2,4 GHz el centro es 2407 más cinco veces el número, y la señal ocupa 22 MHz alrededor.',
    'O número do canal e a frequência estão ligados por uma fórmula: em 2,4 GHz o centro é 2407 mais cinco vezes o número, e o sinal ocupa 22 MHz ao redor.',
    'チャンネル番号と周波数は式で結ばれています。2.4GHzでは2407に番号の5倍を足すと中心周波数になり、信号はその周りに22MHzを占めます。',
    'Kanalnummer und Frequenz hängen über eine Formel zusammen: Bei 2,4 GHz ist die Mitte 2407 plus fünfmal die Nummer, und das Signal belegt 22 MHz darum herum.',
    'Le numéro de canal et la fréquence sont liés par une formule : en 2,4 GHz, le centre vaut 2407 plus cinq fois le numéro, et le signal occupe 22 MHz autour.',
    'चैनल संख्या और आवृत्ति एक सूत्र से जुड़ी हैं: 2.4 GHz में केंद्र = 2407 + संख्या × 5, और सिग्नल उसके चारों ओर 22 MHz घेरता है।',
    '信道号和频率之间有固定公式：2.4 GHz 的中心频率是 2407 加上信道号的五倍，信号在其两侧共占 22 MHz。',
    '頻道號和頻率之間有固定公式：2.4 GHz 的中心頻率是 2407 加上頻道號的五倍，訊號在其兩側共佔 22 MHz。',
  ),

  centerLabel: T('중심 주파수', 'Centre frequency', 'Frecuencia central', 'Frequência central', '中心周波数', 'Mittenfrequenz', 'Fréquence centrale', 'केंद्र आवृत्ति', '中心频率', '中心頻率'),
  spanLabel: T('차지하는 구간', 'Occupied range', 'Rango ocupado', 'Faixa ocupada', '占有帯域', 'Belegter Bereich', 'Plage occupée', 'व्याप्त परास', '占用范围', '佔用範圍'),
  overlapLabel: T('겹치는 채널', 'Overlapping channels', 'Canales que solapan', 'Canais que sobrepõem', '重なるチャンネル', 'Überlappende Kanäle', 'Canaux qui se chevauchent', 'ओवरलैप करते चैनल', '重叠的信道', '重疊的頻道'),
  pairLabel: T('40MHz 짝', '40 MHz partner', 'Pareja de 40 MHz', 'Par de 40 MHz', '40MHzの相手', '40-MHz-Partner', 'Partenaire 40 MHz', '40 MHz साथी', '40MHz 搭档', '40MHz 搭檔'),
  dfsLabel: T('레이더 회피(DFS)', 'Radar avoidance (DFS)', 'Evitación de radar (DFS)', 'Prevenção de radar (DFS)', 'レーダー回避(DFS)', 'Radarausweichung (DFS)', 'Évitement radar (DFS)', 'रडार बचाव (DFS)', '雷达避让（DFS）', '雷達避讓（DFS）'),
  restrictedLabel: T('나라 제한', 'Country limits', 'Límites por país', 'Limites por país', '国による制限', 'Länderbeschränkung', 'Restrictions par pays', 'देश की सीमाएँ', '国家限制', '國家限制'),
  noneTag: T('없습니다', 'none', 'ninguno', 'nenhum', 'ありません', 'keine', 'aucun', 'कोई नहीं', '无', '無'),
  yesTag: T('있습니다', 'yes', 'sí', 'sim', 'あります', 'ja', 'oui', 'हाँ', '有', '有'),

  overlapTitle: T('채널은 점이 아니라 구간입니다', 'A channel is a range, not a point', 'Un canal es un rango, no un punto', 'Um canal é uma faixa, não um ponto', 'チャンネルは点ではなく帯です', 'Ein Kanal ist ein Bereich, kein Punkt', 'Un canal est une plage, pas un point', 'चैनल बिंदु नहीं, परास है', '信道是一段范围，不是一个点', '頻道是一段範圍，不是一個點'),

  overlapNote: T(
    '2.4GHz는 번호 사이가 5MHz뿐인데 신호는 22MHz를 차지합니다. 그래서 옆 번호와 구간이 겹치고, 다섯 칸을 건너뛴 1·6·11만 서로 비켜 갑니다.',
    'On 2.4 GHz the numbers sit 5 MHz apart while each signal occupies 22 MHz. Neighbours therefore overlap, and only channels five apart — 1, 6 and 11 — clear each other.',
    'En 2,4 GHz los números distan 5 MHz mientras cada señal ocupa 22 MHz. Por eso los vecinos solapan y solo los canales separados por cinco —1, 6 y 11— se libran.',
    'Em 2,4 GHz os números ficam a 5 MHz enquanto cada sinal ocupa 22 MHz. Por isso os vizinhos se sobrepõem e só canais separados por cinco — 1, 6 e 11 — se livram.',
    '2.4GHzは番号の間隔が5MHzしかないのに、信号は22MHzを占めます。だから隣の番号と重なり、5つ離れた1・6・11だけが互いを避けます。',
    'Auf 2,4 GHz liegen die Nummern 5 MHz auseinander, jedes Signal belegt aber 22 MHz. Nachbarn überlappen daher, und nur um fünf versetzte Kanäle — 1, 6 und 11 — gehen sich aus dem Weg.',
    'En 2,4 GHz, les numéros sont espacés de 5 MHz alors que chaque signal occupe 22 MHz. Les voisins se chevauchent donc, et seuls les canaux distants de cinq — 1, 6 et 11 — s’évitent.',
    '2.4 GHz में संख्याओं के बीच केवल 5 MHz है जबकि सिग्नल 22 MHz घेरता है। इसलिए पड़ोसी ओवरलैप करते हैं और पाँच के अंतर वाले 1, 6, 11 ही एक-दूसरे से बचते हैं।',
    '2.4 GHz 相邻信道只差 5 MHz，而每个信号要占 22 MHz。所以相邻信道彼此重叠，只有相隔五个的 1、6、11 才互不干扰。',
    '2.4 GHz 相鄰頻道只差 5 MHz，而每個訊號要佔 22 MHz。所以相鄰頻道彼此重疊，只有相隔五個的 1、6、11 才互不干擾。',
  ),

  cleanTitle: T('서로 비켜 가는 채널', 'The channels that clear each other', 'Los canales que no se estorban', 'Os canais que não se atrapalham', '互いを避けるチャンネル', 'Die Kanäle, die einander freilassen', 'Les canaux qui s’évitent', 'जो चैनल एक-दूसरे से बचते हैं', '互不重叠的信道', '互不重疊的頻道'),

  cleanNote: T(
    '표에서 베낀 것이 아니라 구간끼리 견주어 골라낸 것입니다. 14번은 일본에서만 쓰는 네 번째 자리입니다.',
    'These are not copied from a chart — they are picked by comparing the ranges. Channel 14 is the fourth such slot, usable only in Japan.',
    'No están copiados de una tabla: se eligen comparando los rangos. El canal 14 es el cuarto hueco, utilizable solo en Japón.',
    'Não foram copiados de uma tabela: são escolhidos comparando as faixas. O canal 14 é a quarta vaga, usável só no Japão.',
    '表から写したのではなく、帯どうしを見比べて選んだものです。14番は日本でだけ使える4つ目の枠です。',
    'Sie sind nicht aus einer Tabelle abgeschrieben, sondern durch Vergleich der Bereiche ermittelt. Kanal 14 ist der vierte solche Platz und nur in Japan nutzbar.',
    'Ils ne sont pas recopiés d’un tableau : ils sont choisis en comparant les plages. Le canal 14 est la quatrième place, utilisable au Japon seulement.',
    'ये किसी तालिका से नकल नहीं हैं — परासों की तुलना करके चुने गए हैं। चैनल 14 चौथा ऐसा स्थान है, जो केवल जापान में चलता है।',
    '这不是从表里抄来的，而是逐段比较后选出的。信道 14 是第四个这样的位置，只有日本可用。',
    '這不是從表裡抄來的，而是逐段比較後選出的。頻道 14 是第四個這樣的位置，只有日本可用。',
  ),

  dfsTitle: T('레이더와 함께 쓰는 채널', 'Channels shared with radar', 'Canales compartidos con radar', 'Canais compartilhados com radar', 'レーダーと共用するチャンネル', 'Kanäle, die sich Radar teilen', 'Canaux partagés avec les radars', 'रडार के साथ साझा चैनल', '与雷达共用的信道', '與雷達共用的頻道'),

  dfsNote: T(
    '5GHz의 52~144번은 기상·군용 레이더와 같은 대역입니다. 공유기가 레이더를 감지하면 그 채널을 비워야 해서, 연결이 잠깐 끊기거나 채널이 저절로 바뀔 수 있습니다.',
    'Channels 52 to 144 on 5 GHz share their band with weather and military radar. A router that detects radar must vacate the channel, so the link can drop for a moment or move on its own.',
    'Los canales 52 a 144 de 5 GHz comparten banda con radares meteorológicos y militares. Un router que detecta radar debe abandonar el canal, así que la conexión puede caer un momento o cambiarse sola.',
    'Os canais 52 a 144 de 5 GHz dividem a faixa com radares meteorológicos e militares. Um roteador que detecta radar precisa liberar o canal, então a conexão pode cair um instante ou mudar sozinha.',
    '5GHzの52〜144番は気象・軍用レーダーと同じ帯域です。ルーターがレーダーを検知するとその channel を空けねばならず、一瞬切れたり勝手に移ったりします。',
    'Die Kanäle 52 bis 144 auf 5 GHz teilen sich das Band mit Wetter- und Militärradar. Erkennt ein Router Radar, muss er den Kanal räumen — die Verbindung kann kurz abreißen oder von selbst wechseln.',
    'Les canaux 52 à 144 en 5 GHz partagent leur bande avec les radars météo et militaires. Un routeur qui détecte un radar doit libérer le canal : la liaison peut couper un instant ou changer d’elle-même.',
    '5 GHz के चैनल 52 से 144 मौसम और सैन्य रडार के साथ बैंड साझा करते हैं। रडार मिलते ही राउटर को चैनल छोड़ना पड़ता है, इसलिए कनेक्शन पल भर टूट सकता है या अपने आप बदल सकता है।',
    '5 GHz 的 52 到 144 信道与气象、军用雷达共用频段。路由器一旦检测到雷达就必须让出该信道，连接可能瞬断或自行换台。',
    '5 GHz 的 52 到 144 頻道與氣象、軍用雷達共用頻段。路由器一旦偵測到雷達就必須讓出該頻道，連線可能瞬斷或自行換台。',
  ),

  bandTitle: T('대역으로 찾기', 'Browse by band', 'Buscar por banda', 'Buscar por banda', '帯域から探す', 'Nach Band suchen', 'Parcourir par bande', 'बैंड से देखें', '按频段查找', '按頻段查找'),

  bandNote: T(
    '2.4GHz는 멀리 가고 벽을 잘 넘지만 겹칩니다. 5GHz는 채널이 많아 깨끗하고, 6GHz는 더 많지만 벽 하나에 크게 줄어듭니다.',
    '2.4 GHz reaches far and passes walls but crowds; 5 GHz has many clean channels; 6 GHz has more still, yet a single wall costs it dearly.',
    '2,4 GHz llega lejos y atraviesa paredes, pero se satura; 5 GHz tiene muchos canales limpios; 6 GHz tiene aún más, aunque una sola pared le cuesta mucho.',
    '2,4 GHz alcança longe e atravessa paredes, mas lota; 5 GHz tem muitos canais limpos; 6 GHz tem ainda mais, mas uma única parede custa caro.',
    '2.4GHzは遠くまで届き壁も越えますが混みます。5GHzはチャンネルが多くきれいで、6GHzはさらに多い代わりに壁一枚で大きく落ちます。',
    '2,4 GHz reicht weit und geht durch Wände, wird aber eng; 5 GHz bietet viele saubere Kanäle; 6 GHz noch mehr, doch eine einzige Wand kostet viel.',
    'Le 2,4 GHz porte loin et traverse les murs mais sature ; le 5 GHz offre beaucoup de canaux propres ; le 6 GHz davantage encore, mais un seul mur lui coûte cher.',
    '2.4 GHz दूर तक जाता है और दीवारें पार करता है पर भीड़भाड़ वाला है; 5 GHz में कई साफ़ चैनल हैं; 6 GHz में और भी, पर एक दीवार ही उसे बहुत घटा देती है।',
    '2.4 GHz 传得远、穿墙好，但拥挤；5 GHz 信道多且干净；6 GHz 更多，但一堵墙就衰减得厉害。',
    '2.4 GHz 傳得遠、穿牆好，但擁擠；5 GHz 頻道多且乾淨；6 GHz 更多，但一堵牆就衰減得厲害。',
  ),

  neighbourTitle: T('가까운 채널', 'Nearby channels', 'Canales cercanos', 'Canais próximos', '近いチャンネル', 'Kanäle daneben', 'Canaux voisins', 'पास के चैनल', '相邻信道', '相鄰頻道'),

  caution: T(
    '쓸 수 있는 채널은 나라마다 다릅니다. 12·13번은 한국·유럽·일본에서 쓰지만 미국에서는 못 쓰고, 14번은 일본에서 옛 방식으로만 쓰며, 6GHz는 아직 열리지 않은 나라도 있습니다.',
    'Which channels are legal depends on the country. 12 and 13 are allowed in Korea, Europe and Japan but not in the US; 14 is Japan-only and legacy-only; and 6 GHz is still closed in some countries.',
    'Qué canales son legales depende del país. El 12 y el 13 se permiten en Corea, Europa y Japón, pero no en EE. UU.; el 14 es solo de Japón y solo heredado; y 6 GHz sigue cerrado en algunos países.',
    'Quais canais são legais depende do país. O 12 e o 13 são permitidos na Coreia, Europa e Japão, mas não nos EUA; o 14 é só do Japão e só legado; e 6 GHz ainda é fechado em alguns países.',
    '使えるチャンネルは国によって違います。12・13番は韓国・欧州・日本では使えますが米国では使えず、14番は日本で旧方式のみ、6GHzはまだ開放されていない国もあります。',
    'Welche Kanäle erlaubt sind, hängt vom Land ab. 12 und 13 sind in Korea, Europa und Japan zulässig, in den USA nicht; 14 gibt es nur in Japan und nur für alte Verfahren; 6 GHz ist mancherorts noch nicht freigegeben.',
    'Les canaux autorisés dépendent du pays. Les 12 et 13 sont permis en Corée, en Europe et au Japon mais pas aux États-Unis ; le 14 est japonais et hérité ; et le 6 GHz n’est pas encore ouvert partout.',
    'कौन-से चैनल वैध हैं यह देश पर निर्भर है। 12 और 13 कोरिया, यूरोप और जापान में चलते हैं, अमेरिका में नहीं; 14 केवल जापान में और पुरानी पद्धति के लिए; और 6 GHz कुछ देशों में अब भी बंद है।',
    '可用信道因国家而异。12、13 在韩国、欧洲、日本可用，美国不可用；14 只在日本且仅限旧制式；6 GHz 在一些国家尚未开放。',
    '可用頻道因國家而異。12、13 在韓國、歐洲、日本可用，美國不可用；14 只在日本且僅限舊制式；6 GHz 在一些國家尚未開放。',
  ),

  desc: T<(f: WifiFacts) => string>(
    f => `${f.channel.n}번 채널의 중심 주파수는 ${f.center}MHz이고, 신호는 ${f.span.from}부터 ${f.span.to}MHz까지를 차지합니다. 같은 대역에서 ${f.overlaps.length ? `${f.overlaps.length}개 채널과 겹칩니다` : '겹치는 채널이 없습니다'}.`,
    f => `Channel ${f.channel.n} centres on ${f.center} MHz and occupies ${f.span.from}–${f.span.to} MHz. ${f.overlaps.length ? `It overlaps ${f.overlaps.length} other channels in the band.` : 'Nothing else in the band overlaps it.'}`,
    f => `El canal ${f.channel.n} se centra en ${f.center} MHz y ocupa de ${f.span.from} a ${f.span.to} MHz. ${f.overlaps.length ? `Solapa con ${f.overlaps.length} canales de la banda.` : 'Ningún otro canal de la banda lo solapa.'}`,
    f => `O canal ${f.channel.n} centra em ${f.center} MHz e ocupa de ${f.span.from} a ${f.span.to} MHz. ${f.overlaps.length ? `Sobrepõe ${f.overlaps.length} canais da banda.` : 'Nenhum outro canal da banda o sobrepõe.'}`,
    f => `${f.channel.n}番チャンネルの中心周波数は${f.center}MHzで、信号は${f.span.from}〜${f.span.to}MHzを占めます。同じ帯域で${f.overlaps.length ? `${f.overlaps.length}個のチャンネルと重なります` : '重なるチャンネルはありません'}。`,
    f => `Kanal ${f.channel.n} liegt bei ${f.center} MHz und belegt ${f.span.from}–${f.span.to} MHz. ${f.overlaps.length ? `Er überlappt ${f.overlaps.length} weitere Kanäle im Band.` : 'Kein anderer Kanal im Band überlappt ihn.'}`,
    f => `Le canal ${f.channel.n} est centré sur ${f.center} MHz et occupe ${f.span.from}–${f.span.to} MHz. ${f.overlaps.length ? `Il chevauche ${f.overlaps.length} autres canaux de la bande.` : 'Aucun autre canal de la bande ne le chevauche.'}`,
    f => `चैनल ${f.channel.n} का केंद्र ${f.center} MHz है और वह ${f.span.from}–${f.span.to} MHz घेरता है। ${f.overlaps.length ? `बैंड में ${f.overlaps.length} चैनलों से ओवरलैप करता है।` : 'बैंड में कोई और चैनल इससे ओवरलैप नहीं करता।'}`,
    f => `信道 ${f.channel.n} 的中心频率是 ${f.center} MHz，占用 ${f.span.from}–${f.span.to} MHz。${f.overlaps.length ? `在同频段与 ${f.overlaps.length} 个信道重叠。` : '同频段没有信道与它重叠。'}`,
    f => `頻道 ${f.channel.n} 的中心頻率是 ${f.center} MHz，佔用 ${f.span.from}–${f.span.to} MHz。${f.overlaps.length ? `在同頻段與 ${f.overlaps.length} 個頻道重疊。` : '同頻段沒有頻道與它重疊。'}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '2.4GHz 중심 주파수 = 2407 + 번호 × 5. 14번만 2484로 벗어납니다.',
      '5GHz는 5000 + 번호 × 5, 6GHz는 5950 + 번호 × 5입니다.',
      '2.4GHz 신호는 22MHz를 차지해 다섯 칸을 건너뛰어야 비켜 갑니다.',
      '40MHz로 묶으면 이웃한 두 채널을 함께 쓰고, 그만큼 겹칠 자리도 줄어듭니다.',
    ],
    [
      'On 2.4 GHz the centre is 2407 + number × 5; only channel 14 breaks the rule at 2484.',
      '5 GHz is 5000 + number × 5, and 6 GHz is 5950 + number × 5.',
      'A 2.4 GHz signal occupies 22 MHz, so channels must sit five apart to clear each other.',
      'Bonding to 40 MHz uses two neighbouring channels, leaving fewer places to hide.',
    ],
    [
      'En 2,4 GHz el centro es 2407 + número × 5; solo el canal 14 se sale, en 2484.',
      '5 GHz es 5000 + número × 5, y 6 GHz es 5950 + número × 5.',
      'Una señal de 2,4 GHz ocupa 22 MHz, así que los canales deben distar cinco para no estorbarse.',
      'Unir a 40 MHz usa dos canales vecinos y deja menos sitio libre.',
    ],
    [
      'Em 2,4 GHz o centro é 2407 + número × 5; só o canal 14 foge, em 2484.',
      '5 GHz é 5000 + número × 5, e 6 GHz é 5950 + número × 5.',
      'Um sinal de 2,4 GHz ocupa 22 MHz, então os canais precisam distar cinco para não se atrapalhar.',
      'Unir em 40 MHz usa dois canais vizinhos e deixa menos espaço livre.',
    ],
    [
      '2.4GHzの中心周波数 = 2407 + 番号 × 5。14番だけ2484で外れます。',
      '5GHzは5000 + 番号 × 5、6GHzは5950 + 番号 × 5です。',
      '2.4GHzの信号は22MHzを占めるので、5つ離れないと避けられません。',
      '40MHzで束ねると隣り合う2つを使い、その分だけ空き場所が減ります。',
    ],
    [
      'Bei 2,4 GHz gilt Mitte = 2407 + Nummer × 5; nur Kanal 14 fällt mit 2484 heraus.',
      '5 GHz sind 5000 + Nummer × 5, 6 GHz sind 5950 + Nummer × 5.',
      'Ein 2,4-GHz-Signal belegt 22 MHz — Kanäle müssen fünf auseinanderliegen, um sich freizulassen.',
      'Ein 40-MHz-Bündel nutzt zwei Nachbarkanäle und lässt entsprechend weniger Platz.',
    ],
    [
      'En 2,4 GHz, centre = 2407 + numéro × 5 ; seul le canal 14 déroge, à 2484.',
      'Le 5 GHz vaut 5000 + numéro × 5, et le 6 GHz 5950 + numéro × 5.',
      'Un signal 2,4 GHz occupe 22 MHz : il faut cinq crans d’écart pour s’éviter.',
      'Un groupement à 40 MHz utilise deux canaux voisins et laisse d’autant moins de place.',
    ],
    [
      '2.4 GHz में केंद्र = 2407 + संख्या × 5; केवल चैनल 14 अलग है, 2484 पर।',
      '5 GHz = 5000 + संख्या × 5, और 6 GHz = 5950 + संख्या × 5।',
      '2.4 GHz का सिग्नल 22 MHz घेरता है, इसलिए बचने के लिए पाँच का अंतर चाहिए।',
      '40 MHz में जोड़ने पर दो पड़ोसी चैनल लगते हैं और खाली जगह उतनी ही घट जाती है।',
    ],
    [
      '2.4 GHz 中心频率 = 2407 + 信道号 × 5；只有信道 14 例外，为 2484。',
      '5 GHz 是 5000 + 信道号 × 5，6 GHz 是 5950 + 信道号 × 5。',
      '2.4 GHz 信号占 22 MHz，所以信道要相隔五个才互不干扰。',
      '绑定成 40 MHz 会用掉相邻两个信道，可躲的位置也随之减少。',
    ],
    [
      '2.4 GHz 中心頻率 = 2407 + 頻道號 × 5；只有頻道 14 例外，為 2484。',
      '5 GHz 是 5000 + 頻道號 × 5，6 GHz 是 5950 + 頻道號 × 5。',
      '2.4 GHz 訊號佔 22 MHz，所以頻道要相隔五個才互不干擾。',
      '綁定成 40 MHz 會用掉相鄰兩個頻道，可躲的位置也隨之減少。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '와이파이 채널표 — 2.4·5·6GHz 주파수와 겹침',
    'Wi-Fi channel chart — frequencies and overlap on 2.4, 5 and 6 GHz',
    'Tabla de canales Wi-Fi — frecuencias y solape en 2,4, 5 y 6 GHz',
    'Tabela de canais Wi-Fi — frequências e sobreposição em 2,4, 5 e 6 GHz',
    'Wi-Fiチャンネル表 — 2.4・5・6GHzの周波数と重なり',
    'WLAN-Kanaltabelle — Frequenzen und Überlappung auf 2,4, 5 und 6 GHz',
    'Tableau des canaux Wi-Fi — fréquences et chevauchement en 2,4, 5 et 6 GHz',
    'वाई-फ़ाई चैनल चार्ट — 2.4, 5 और 6 GHz की आवृत्तियाँ और ओवरलैप',
    'Wi-Fi 信道表 — 2.4/5/6 GHz 的频率与重叠',
    'Wi-Fi 頻道表 — 2.4/5/6 GHz 的頻率與重疊',
  ),

  hubMetaDesc: T(
    '2.4GHz 14개, 5GHz 28개, 6GHz 59개 채널의 중심 주파수와 차지하는 구간을 계산하고, 어느 채널끼리 겹치는지, 왜 1·6·11을 고르는지까지 냅니다.',
    'Centre frequencies and occupied ranges for 14 channels on 2.4 GHz, 28 on 5 GHz and 59 on 6 GHz — which ones overlap, and why 1, 6 and 11 are the answer.',
    'Frecuencias centrales y rangos ocupados de 14 canales en 2,4 GHz, 28 en 5 GHz y 59 en 6 GHz: cuáles solapan y por qué la respuesta es 1, 6 y 11.',
    'Frequências centrais e faixas ocupadas de 14 canais em 2,4 GHz, 28 em 5 GHz e 59 em 6 GHz: quais se sobrepõem e por que a resposta é 1, 6 e 11.',
    '2.4GHz 14個、5GHz 28個、6GHz 59個のチャンネルの中心周波数と占有帯域を計算し、どれとどれが重なるか、なぜ1・6・11なのかまで示します。',
    'Mittenfrequenzen und belegte Bereiche für 14 Kanäle auf 2,4 GHz, 28 auf 5 GHz und 59 auf 6 GHz — welche überlappen und warum 1, 6 und 11 die Antwort sind.',
    'Fréquences centrales et plages occupées de 14 canaux en 2,4 GHz, 28 en 5 GHz et 59 en 6 GHz : lesquels se chevauchent et pourquoi 1, 6 et 11.',
    '2.4 GHz के 14, 5 GHz के 28 और 6 GHz के 59 चैनलों की केंद्र आवृत्ति और व्याप्त परास — कौन-से ओवरलैप करते हैं और 1, 6, 11 ही उत्तर क्यों है।',
    '2.4 GHz 14 个、5 GHz 28 个、6 GHz 59 个信道的中心频率与占用范围，以及哪些互相重叠、为什么答案是 1、6、11。',
    '2.4 GHz 14 個、5 GHz 28 個、6 GHz 59 個頻道的中心頻率與佔用範圍，以及哪些互相重疊、為什麼答案是 1、6、11。',
  ),

  metaTitle: T<(f: WifiFacts) => string>(
    f => `와이파이 ${f.channel.n}번 채널 — ${f.center}MHz`,
    f => `Wi-Fi channel ${f.channel.n} — ${f.center} MHz`,
    f => `Canal Wi-Fi ${f.channel.n} — ${f.center} MHz`,
    f => `Canal Wi-Fi ${f.channel.n} — ${f.center} MHz`,
    f => `Wi-Fi ${f.channel.n}番チャンネル — ${f.center}MHz`,
    f => `WLAN-Kanal ${f.channel.n} — ${f.center} MHz`,
    f => `Canal Wi-Fi ${f.channel.n} — ${f.center} MHz`,
    f => `वाई-फ़ाई चैनल ${f.channel.n} — ${f.center} MHz`,
    f => `Wi-Fi 信道 ${f.channel.n} — ${f.center} MHz`,
    f => `Wi-Fi 頻道 ${f.channel.n} — ${f.center} MHz`,
  ),

  metaDesc: T<(f: WifiFacts) => string>(
    f => `${f.channel.n}번 채널은 중심 ${f.center}MHz로 ${f.span.from}~${f.span.to}MHz를 차지합니다. 겹치는 채널 ${f.overlaps.length}개, 40MHz 짝 ${f.pair ? `${f.pair.n}번` : '없음'}${f.dfs ? ', 레이더 회피(DFS) 대상' : ''}입니다.`,
    f => `Channel ${f.channel.n} centres on ${f.center} MHz, occupying ${f.span.from}–${f.span.to} MHz. It overlaps ${f.overlaps.length} channels, bonds to ${f.pair ? `channel ${f.pair.n}` : 'nothing'} at 40 MHz${f.dfs ? ', and falls under radar avoidance (DFS)' : ''}.`,
    f => `El canal ${f.channel.n} se centra en ${f.center} MHz y ocupa ${f.span.from}–${f.span.to} MHz. Solapa con ${f.overlaps.length} canales, se une a ${f.pair ? `el canal ${f.pair.n}` : 'ninguno'} en 40 MHz${f.dfs ? ' y está sujeto a DFS' : ''}.`,
    f => `O canal ${f.channel.n} centra em ${f.center} MHz e ocupa ${f.span.from}–${f.span.to} MHz. Sobrepõe ${f.overlaps.length} canais, une-se a ${f.pair ? `canal ${f.pair.n}` : 'nenhum'} em 40 MHz${f.dfs ? ' e está sujeito a DFS' : ''}.`,
    f => `${f.channel.n}番チャンネルは中心${f.center}MHzで${f.span.from}〜${f.span.to}MHzを占めます。重なるチャンネルは${f.overlaps.length}個、40MHzの相手は${f.pair ? `${f.pair.n}番` : 'なし'}${f.dfs ? '、DFS対象です' : 'です'}。`,
    f => `Kanal ${f.channel.n} liegt bei ${f.center} MHz und belegt ${f.span.from}–${f.span.to} MHz. Er überlappt ${f.overlaps.length} Kanäle, bündelt bei 40 MHz mit ${f.pair ? `Kanal ${f.pair.n}` : 'keinem'}${f.dfs ? ' und unterliegt DFS' : ''}.`,
    f => `Le canal ${f.channel.n} est centré sur ${f.center} MHz et occupe ${f.span.from}–${f.span.to} MHz. Il chevauche ${f.overlaps.length} canaux, se groupe en 40 MHz avec ${f.pair ? `le canal ${f.pair.n}` : 'aucun'}${f.dfs ? ' et relève du DFS' : ''}.`,
    f => `चैनल ${f.channel.n} का केंद्र ${f.center} MHz है और यह ${f.span.from}–${f.span.to} MHz घेरता है। ${f.overlaps.length} चैनलों से ओवरलैप, 40 MHz साथी ${f.pair ? `चैनल ${f.pair.n}` : 'कोई नहीं'}${f.dfs ? ', और DFS के अधीन' : ''}।`,
    f => `信道 ${f.channel.n} 中心 ${f.center} MHz，占用 ${f.span.from}–${f.span.to} MHz。与 ${f.overlaps.length} 个信道重叠，40 MHz 搭档为${f.pair ? `信道 ${f.pair.n}` : '无'}${f.dfs ? '，且受 DFS 约束' : ''}。`,
    f => `頻道 ${f.channel.n} 中心 ${f.center} MHz，佔用 ${f.span.from}–${f.span.to} MHz。與 ${f.overlaps.length} 個頻道重疊，40 MHz 搭檔為${f.pair ? `頻道 ${f.pair.n}` : '無'}${f.dfs ? '，且受 DFS 約束' : ''}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '2.4GHz에서 왜 1·6·11을 쓰나요?', a: '번호 사이는 5MHz인데 신호는 22MHz를 차지해서, 다섯 칸은 떨어져야 구간이 겹치지 않습니다. 1·6·11이 그 조건을 만족하는 세 자리이고, 일본에서만 쓰는 14번이 네 번째입니다.' },
      { q: '채널을 자동으로 두면 안 되나요?', a: '대개는 자동으로 충분합니다. 이웃 공유기가 많아 계속 바뀌거나 특정 시간대에만 느려진다면 그때 고정해 봅니다.' },
      { q: '5GHz에서 채널이 저절로 바뀌는데요?', a: '52~144번을 쓰고 있다면 DFS 때문일 수 있습니다. 레이더가 감지되면 공유기가 그 채널을 비워야 합니다. 149번 이상으로 옮기면 겪지 않습니다.' },
      { q: '40MHz나 80MHz로 넓히면 빨라지나요?', a: '한 번에 보내는 양은 늘지만 겹칠 자리도 늘어납니다. 이웃이 많은 2.4GHz에서는 20MHz가 오히려 안정적입니다.' },
      { q: '6GHz는 뭐가 다른가요?', a: '채널이 훨씬 많아 깨끗하지만 벽에 크게 줄어듭니다. 기기와 공유기가 모두 Wi-Fi 6E 이상이어야 하고, 아직 열지 않은 나라도 있습니다.' },
    ],
    [
      { q: 'Why 1, 6 and 11 on 2.4 GHz?', a: 'The numbers are 5 MHz apart but each signal spans 22 MHz, so channels must be five apart to avoid overlapping. 1, 6 and 11 are the three slots that fit; channel 14, used only in Japan, is a fourth.' },
      { q: 'Should I leave the channel on auto?', a: 'Auto is fine for most homes. Pin a channel only if the router keeps hopping among crowded neighbours, or if things slow down at predictable times of day.' },
      { q: 'Why does my 5 GHz channel change by itself?', a: 'If you are on 52–144, that is DFS: when radar is detected the router must vacate the channel. Moving to 149 or above avoids it.' },
      { q: 'Does 40 or 80 MHz make it faster?', a: 'Each transmission carries more, but there is also more room to collide. On a crowded 2.4 GHz band, 20 MHz is usually steadier.' },
      { q: 'What is different about 6 GHz?', a: 'Far more channels and much less crowding, but walls hurt it badly. Both router and device need Wi-Fi 6E or newer, and some countries have not opened the band.' },
    ],
    [
      { q: '¿Por qué 1, 6 y 11 en 2,4 GHz?', a: 'Los números distan 5 MHz pero cada señal abarca 22 MHz, así que los canales deben separarse cinco para no solapar. 1, 6 y 11 son los tres huecos que encajan; el canal 14, solo en Japón, es un cuarto.' },
      { q: '¿Dejo el canal en automático?', a: 'En la mayoría de casas basta. Fíjalo solo si el router salta constantemente entre vecinos saturados o si se ralentiza a horas concretas.' },
      { q: '¿Por qué cambia solo mi canal de 5 GHz?', a: 'Si estás en 52–144 es el DFS: al detectar radar, el router debe abandonar el canal. Pasar a 149 o superior lo evita.' },
      { q: '¿40 u 80 MHz lo hacen más rápido?', a: 'Cada transmisión lleva más, pero también hay más sitio para chocar. En un 2,4 GHz concurrido, 20 MHz suele ser más estable.' },
      { q: '¿Qué tiene de distinto 6 GHz?', a: 'Muchos más canales y mucho menos ruido, pero las paredes lo castigan. Router y dispositivo necesitan Wi-Fi 6E o posterior, y algunos países no han abierto la banda.' },
    ],
    [
      { q: 'Por que 1, 6 e 11 em 2,4 GHz?', a: 'Os números distam 5 MHz, mas cada sinal abrange 22 MHz, então os canais precisam distar cinco para não se sobrepor. 1, 6 e 11 são as três vagas que servem; o canal 14, só no Japão, é uma quarta.' },
      { q: 'Devo deixar o canal em automático?', a: 'Na maioria das casas basta. Fixe um canal só se o roteador ficar pulando entre vizinhos lotados ou se cair de desempenho em horários previsíveis.' },
      { q: 'Por que meu canal de 5 GHz muda sozinho?', a: 'Se você está em 52–144, é o DFS: ao detectar radar, o roteador precisa liberar o canal. Ir para 149 ou acima evita isso.' },
      { q: '40 ou 80 MHz deixam mais rápido?', a: 'Cada transmissão leva mais, mas há mais espaço para colidir. Num 2,4 GHz lotado, 20 MHz costuma ser mais estável.' },
      { q: 'O que muda no 6 GHz?', a: 'Muito mais canais e bem menos disputa, mas paredes prejudicam bastante. Roteador e aparelho precisam de Wi-Fi 6E ou mais novo, e alguns países não abriram a faixa.' },
    ],
    [
      { q: '2.4GHzでなぜ1・6・11なのですか？', a: '番号の間隔は5MHzなのに信号は22MHzを占めるので、5つ離れないと帯が重なります。その条件に合う枠が1・6・11で、日本だけの14番が4つ目です。' },
      { q: 'チャンネルは自動のままでよいですか？', a: 'たいていは自動で十分です。近所のルーターが多くて頻繁に変わったり、特定の時間帯だけ遅くなるときに固定してみます。' },
      { q: '5GHzでチャンネルが勝手に変わります', a: '52〜144番を使っているならDFSかもしれません。レーダーを検知するとルーターはそのチャンネルを空ける必要があります。149番以上に移せば起きません。' },
      { q: '40MHzや80MHzに広げると速くなりますか？', a: '一度に運ぶ量は増えますが、ぶつかる場所も増えます。近所が多い2.4GHzでは20MHzのほうが安定します。' },
      { q: '6GHzは何が違いますか？', a: 'チャンネルがずっと多く空いていますが、壁で大きく落ちます。ルーターも機器もWi-Fi 6E以上が必要で、まだ開放していない国もあります。' },
    ],
    [
      { q: 'Warum 1, 6 und 11 auf 2,4 GHz?', a: 'Die Nummern liegen 5 MHz auseinander, jedes Signal belegt aber 22 MHz — Kanäle müssen also fünf auseinanderliegen. 1, 6 und 11 sind die drei passenden Plätze; Kanal 14, nur in Japan, ist ein vierter.' },
      { q: 'Soll ich den Kanal auf Automatik lassen?', a: 'Für die meisten Wohnungen reicht Automatik. Feste Kanäle lohnen erst, wenn der Router zwischen vollen Nachbarkanälen springt oder es zu bestimmten Tageszeiten einbricht.' },
      { q: 'Warum wechselt mein 5-GHz-Kanal von selbst?', a: 'Auf 52–144 liegt es an DFS: Erkennt der Router Radar, muss er den Kanal räumen. Ab Kanal 149 passiert das nicht.' },
      { q: 'Bringen 40 oder 80 MHz mehr Tempo?', a: 'Jede Übertragung trägt mehr, aber es gibt auch mehr Kollisionsfläche. Im vollen 2,4-GHz-Band läuft 20 MHz meist stabiler.' },
      { q: 'Was ist bei 6 GHz anders?', a: 'Viel mehr Kanäle und deutlich weniger Gedränge, doch Wände kosten stark. Router und Gerät brauchen Wi-Fi 6E oder neuer, und manche Länder haben das Band noch nicht freigegeben.' },
    ],
    [
      { q: 'Pourquoi 1, 6 et 11 en 2,4 GHz ?', a: 'Les numéros sont espacés de 5 MHz alors que chaque signal occupe 22 MHz : il faut donc cinq crans d’écart. Les trois places qui conviennent sont 1, 6 et 11 ; le canal 14, japonais, en est une quatrième.' },
      { q: 'Faut-il laisser le canal en automatique ?', a: 'L’automatique suffit dans la plupart des logements. Fixez un canal seulement si le routeur saute sans cesse entre voisins saturés ou si les ralentissements reviennent aux mêmes heures.' },
      { q: 'Pourquoi mon canal 5 GHz change-t-il tout seul ?', a: 'Sur 52–144, c’est le DFS : à la détection d’un radar, le routeur doit libérer le canal. Passer au-delà de 149 l’évite.' },
      { q: '40 ou 80 MHz accélèrent-ils vraiment ?', a: 'Chaque émission transporte plus, mais la surface de collision grandit aussi. Sur un 2,4 GHz encombré, 20 MHz reste plus stable.' },
      { q: 'Qu’apporte le 6 GHz ?', a: 'Beaucoup plus de canaux et bien moins d’encombrement, mais les murs le pénalisent fortement. Routeur et appareil doivent être Wi-Fi 6E ou plus récents, et certains pays n’ont pas ouvert la bande.' },
    ],
    [
      { q: '2.4 GHz में 1, 6, 11 ही क्यों?', a: 'संख्याओं के बीच 5 MHz है पर हर सिग्नल 22 MHz घेरता है, इसलिए ओवरलैप से बचने को पाँच का अंतर चाहिए। 1, 6 और 11 वही तीन स्थान हैं; जापान वाला चैनल 14 चौथा है।' },
      { q: 'क्या चैनल ऑटो पर छोड़ दें?', a: 'ज़्यादातर घरों में ऑटो ठीक है। तभी तय कीजिए जब राउटर भीड़भाड़ में बार-बार बदलता रहे या किसी ख़ास समय पर गति गिरे।' },
      { q: '5 GHz का चैनल अपने आप क्यों बदलता है?', a: 'यदि आप 52–144 पर हैं तो यह DFS है: रडार मिलते ही राउटर को चैनल छोड़ना पड़ता है। 149 या ऊपर जाने पर ऐसा नहीं होता।' },
      { q: 'क्या 40 या 80 MHz से तेज़ होगा?', a: 'हर प्रसारण अधिक ले जाता है, पर टकराने की जगह भी बढ़ती है। भीड़ वाले 2.4 GHz में 20 MHz अक्सर अधिक स्थिर रहता है।' },
      { q: '6 GHz में क्या अलग है?', a: 'चैनल कहीं ज़्यादा और भीड़ कम, पर दीवारें इसे बहुत घटाती हैं। राउटर और डिवाइस दोनों को Wi-Fi 6E या नया चाहिए, और कुछ देशों में यह बैंड अभी खुला नहीं है।' },
    ],
    [
      { q: '2.4 GHz 为什么用 1、6、11？', a: '信道号之间只差 5 MHz，而每个信号要占 22 MHz，所以必须相隔五个才不重叠。1、6、11 正是符合的三个位置，只有日本可用的 14 是第四个。' },
      { q: '信道保持自动可以吗？', a: '多数家庭用自动就够。只有当路由器在拥挤邻居间反复跳台，或每天固定时段变慢时，才值得手动固定。' },
      { q: '5 GHz 的信道为什么会自己变？', a: '如果用的是 52–144，多半是 DFS：检测到雷达时路由器必须让出该信道。换到 149 及以上就不会遇到。' },
      { q: '开到 40 或 80 MHz 会更快吗？', a: '单次传输携带更多，但可碰撞的范围也更大。在拥挤的 2.4 GHz 上，20 MHz 通常更稳。' },
      { q: '6 GHz 有什么不同？', a: '信道多得多、也更干净，但穿墙衰减很大。路由器和设备都要 Wi-Fi 6E 以上，而且有些国家尚未开放该频段。' },
    ],
    [
      { q: '2.4 GHz 為什麼用 1、6、11？', a: '頻道號之間只差 5 MHz，而每個訊號要佔 22 MHz，所以必須相隔五個才不重疊。1、6、11 正是符合的三個位置，只有日本可用的 14 是第四個。' },
      { q: '頻道保持自動可以嗎？', a: '多數家庭用自動就夠。只有當路由器在擁擠鄰居間反覆跳台，或每天固定時段變慢時，才值得手動固定。' },
      { q: '5 GHz 的頻道為什麼會自己變？', a: '如果用的是 52–144，多半是 DFS：偵測到雷達時路由器必須讓出該頻道。換到 149 及以上就不會遇到。' },
      { q: '開到 40 或 80 MHz 會更快嗎？', a: '單次傳輸攜帶更多，但可碰撞的範圍也更大。在擁擠的 2.4 GHz 上，20 MHz 通常更穩。' },
      { q: '6 GHz 有什麼不同？', a: '頻道多得多、也更乾淨，但穿牆衰減很大。路由器和裝置都要 Wi-Fi 6E 以上，而且有些國家尚未開放該頻段。' },
    ],
  ),

  wifiFaq: T<(f: WifiFacts) => FaqItem[]>(
    f => [
      { q: `${f.channel.n}번 채널의 주파수는 얼마인가요?`, a: `중심 ${f.center}MHz이고, 신호는 ${f.span.from}부터 ${f.span.to}MHz까지 차지합니다.` },
      { q: `어느 채널과 겹치나요?`, a: f.overlaps.length ? `${f.overlaps.map(o => `${o.n}번`).join(', ')}과 겹칩니다.` : `같은 대역에서 겹치는 채널이 없습니다.` },
      { q: `40MHz로 묶으면 어느 채널과 함께 쓰나요?`, a: f.pair ? `${f.pair.n}번과 묶여 40MHz가 됩니다.` : `이 채널은 40MHz로 묶지 않습니다.` },
      { q: `쓰는 데 걸리는 것이 있나요?`, a: f.dfs ? `레이더 회피(DFS) 대상이라 레이더가 감지되면 채널을 비워야 합니다.` : f.restricted ? `나라에 따라 못 쓰는 채널입니다 — 미국에서는 열려 있지 않습니다.` : `특별한 제한은 없습니다. 다만 나라마다 규정이 다릅니다.` },
    ],
    f => [
      { q: `What frequency is channel ${f.channel.n}?`, a: `It centres on ${f.center} MHz and occupies ${f.span.from}–${f.span.to} MHz.` },
      { q: `Which channels does it overlap?`, a: f.overlaps.length ? `Channels ${f.overlaps.map(o => o.n).join(', ')}.` : `None in the same band.` },
      { q: `What does it bond with at 40 MHz?`, a: f.pair ? `Channel ${f.pair.n}, making a 40 MHz pair.` : `This channel is not bonded to 40 MHz.` },
      { q: `Anything that limits its use?`, a: f.dfs ? `It falls under radar avoidance (DFS): the router must leave the channel when radar appears.` : f.restricted ? `It is restricted by country — it is not available in the US.` : `No special restriction, though rules differ by country.` },
    ],
    f => [
      { q: `¿Qué frecuencia tiene el canal ${f.channel.n}?`, a: `Se centra en ${f.center} MHz y ocupa de ${f.span.from} a ${f.span.to} MHz.` },
      { q: `¿Con qué canales solapa?`, a: f.overlaps.length ? `Con los canales ${f.overlaps.map(o => o.n).join(', ')}.` : `Con ninguno de la misma banda.` },
      { q: `¿Con cuál se une en 40 MHz?`, a: f.pair ? `Con el canal ${f.pair.n}, formando una pareja de 40 MHz.` : `Este canal no se une a 40 MHz.` },
      { q: `¿Hay algo que limite su uso?`, a: f.dfs ? `Está sujeto a DFS: el router debe abandonar el canal si detecta radar.` : f.restricted ? `Está restringido por país: no se puede usar en EE. UU.` : `Sin restricción especial, aunque las normas cambian según el país.` },
    ],
    f => [
      { q: `Qual a frequência do canal ${f.channel.n}?`, a: `Centra em ${f.center} MHz e ocupa de ${f.span.from} a ${f.span.to} MHz.` },
      { q: `Com quais canais ele se sobrepõe?`, a: f.overlaps.length ? `Com os canais ${f.overlaps.map(o => o.n).join(', ')}.` : `Com nenhum da mesma banda.` },
      { q: `Com qual ele se une em 40 MHz?`, a: f.pair ? `Com o canal ${f.pair.n}, formando um par de 40 MHz.` : `Este canal não é unido em 40 MHz.` },
      { q: `Há algo que limite o uso?`, a: f.dfs ? `Está sujeito a DFS: o roteador precisa deixar o canal se detectar radar.` : f.restricted ? `É restrito por país — não é liberado nos EUA.` : `Sem restrição especial, embora as regras mudem conforme o país.` },
    ],
    f => [
      { q: `${f.channel.n}番チャンネルの周波数は？`, a: `中心${f.center}MHzで、${f.span.from}〜${f.span.to}MHzを占めます。` },
      { q: `どのチャンネルと重なりますか？`, a: f.overlaps.length ? `${f.overlaps.map(o => `${o.n}番`).join('、')}と重なります。` : `同じ帯域に重なるチャンネルはありません。` },
      { q: `40MHzではどれと組みますか？`, a: f.pair ? `${f.pair.n}番と組んで40MHzになります。` : `このチャンネルは40MHzで束ねません。` },
      { q: `使うのに引っかかることはありますか？`, a: f.dfs ? `DFS対象なので、レーダーを検知するとチャンネルを空ける必要があります。` : f.restricted ? `国によって使えないチャンネルです——米国では開放されていません。` : `特別な制限はありません。ただし規定は国ごとに違います。` },
    ],
    f => [
      { q: `Welche Frequenz hat Kanal ${f.channel.n}?`, a: `Er liegt bei ${f.center} MHz und belegt ${f.span.from}–${f.span.to} MHz.` },
      { q: `Mit welchen Kanälen überlappt er?`, a: f.overlaps.length ? `Mit den Kanälen ${f.overlaps.map(o => o.n).join(', ')}.` : `Mit keinem im selben Band.` },
      { q: `Womit bündelt er bei 40 MHz?`, a: f.pair ? `Mit Kanal ${f.pair.n} zu einem 40-MHz-Paar.` : `Dieser Kanal wird nicht auf 40 MHz gebündelt.` },
      { q: `Gibt es Einschränkungen?`, a: f.dfs ? `Er unterliegt DFS: Bei Radarerkennung muss der Router den Kanal räumen.` : f.restricted ? `Er ist länderabhängig eingeschränkt — in den USA nicht freigegeben.` : `Keine besondere Einschränkung, die Regeln unterscheiden sich aber je Land.` },
    ],
    f => [
      { q: `Quelle est la fréquence du canal ${f.channel.n} ?`, a: `Il est centré sur ${f.center} MHz et occupe ${f.span.from}–${f.span.to} MHz.` },
      { q: `Quels canaux chevauche-t-il ?`, a: f.overlaps.length ? `Les canaux ${f.overlaps.map(o => o.n).join(', ')}.` : `Aucun dans la même bande.` },
      { q: `Avec quoi se groupe-t-il en 40 MHz ?`, a: f.pair ? `Avec le canal ${f.pair.n}, formant une paire de 40 MHz.` : `Ce canal n’est pas groupé en 40 MHz.` },
      { q: `Y a-t-il des limites à son usage ?`, a: f.dfs ? `Il relève du DFS : le routeur doit libérer le canal si un radar est détecté.` : f.restricted ? `Il est restreint selon les pays — non autorisé aux États-Unis.` : `Aucune restriction particulière, mais les règles varient selon les pays.` },
    ],
    f => [
      { q: `चैनल ${f.channel.n} की आवृत्ति क्या है?`, a: `केंद्र ${f.center} MHz और यह ${f.span.from}–${f.span.to} MHz घेरता है।` },
      { q: `यह किन चैनलों से ओवरलैप करता है?`, a: f.overlaps.length ? `चैनल ${f.overlaps.map(o => o.n).join(', ')} से।` : `इसी बैंड में किसी से नहीं।` },
      { q: `40 MHz में किसके साथ जुड़ता है?`, a: f.pair ? `चैनल ${f.pair.n} के साथ, जिससे 40 MHz बनता है।` : `यह चैनल 40 MHz में नहीं जुड़ता।` },
      { q: `इस्तेमाल पर कोई रोक है?`, a: f.dfs ? `यह DFS के अधीन है: रडार मिलने पर राउटर को चैनल छोड़ना होगा।` : f.restricted ? `यह देश के अनुसार सीमित है — अमेरिका में उपलब्ध नहीं।` : `कोई विशेष रोक नहीं, हालाँकि नियम देश के अनुसार बदलते हैं।` },
    ],
    f => [
      { q: `信道 ${f.channel.n} 的频率是多少？`, a: `中心 ${f.center} MHz，占用 ${f.span.from}–${f.span.to} MHz。` },
      { q: `它与哪些信道重叠？`, a: f.overlaps.length ? `与信道 ${f.overlaps.map(o => o.n).join('、')} 重叠。` : `同频段内没有重叠的信道。` },
      { q: `40 MHz 时与哪个绑定？`, a: f.pair ? `与信道 ${f.pair.n} 绑定成 40 MHz。` : `该信道不做 40 MHz 绑定。` },
      { q: `使用上有什么限制吗？`, a: f.dfs ? `受 DFS 约束：检测到雷达时路由器必须让出该信道。` : f.restricted ? `受国家限制——美国不开放该信道。` : `没有特别限制，但各国规定不同。` },
    ],
    f => [
      { q: `頻道 ${f.channel.n} 的頻率是多少？`, a: `中心 ${f.center} MHz，佔用 ${f.span.from}–${f.span.to} MHz。` },
      { q: `它與哪些頻道重疊？`, a: f.overlaps.length ? `與頻道 ${f.overlaps.map(o => o.n).join('、')} 重疊。` : `同頻段內沒有重疊的頻道。` },
      { q: `40 MHz 時與哪個綁定？`, a: f.pair ? `與頻道 ${f.pair.n} 綁定成 40 MHz。` : `該頻道不做 40 MHz 綁定。` },
      { q: `使用上有什麼限制嗎？`, a: f.dfs ? `受 DFS 約束：偵測到雷達時路由器必須讓出該頻道。` : f.restricted ? `受國家限制——美國不開放該頻道。` : `沒有特別限制，但各國規定不同。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const WIFI_UI: L<WifiUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<WifiUI>;
