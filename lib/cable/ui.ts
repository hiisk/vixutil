/**
 * 케이블 대역폭 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { CableFacts, Verdict } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface CableUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  resName: (key: string) => string;
  specName: (key: string) => string;
  verdictName: (v: Verdict) => string;
  rateLabel: string;
  pixelLabel: string;
  rawLabel: string;
  raw10Label: string;
  lowestLabel: string;
  usedLabel: string;
  noneLabel: string;
  mathTitle: string;
  mathNote: string;
  encodingTitle: string;
  encodingNote: string;
  blankingTitle: string;
  blankingNote: string;
  dscTitle: string;
  dscNote: string;
  cableTitle: string;
  cableNote: string;
  tableTitle: string;
  neighbourTitle: string;
  resRowTitle: string;
  rateRowTitle: string;
  desc: (f: CableFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: CableFacts) => string;
  metaDesc: (f: CableFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: CableFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 해상도와 규격 이름은 어느 언어에서나 같은 약칭을 쓴다 */
const RES: Record<string, string> = {
  '720p': '720p (1280×720)', '1080p': 'FHD (1920×1080)', uw1080: 'UW (2560×1080)',
  '1440p': 'QHD (2560×1440)', uw1440: 'UWQHD (3440×1440)', uw1600: 'UW (3840×1600)',
  '4k': '4K (3840×2160)', '5k2k': '5K2K (5120×2160)', '5k': '5K (5120×2880)', '8k': '8K (7680×4320)',
};
const SPECN: Record<string, string> = {
  hdmi14: 'HDMI 1.4', dp12: 'DisplayPort 1.2', hdmi20: 'HDMI 2.0',
  dp14: 'DisplayPort 1.4', hdmi21: 'HDMI 2.1', dp21: 'DisplayPort 2.1',
};
const resName = (k: string) => RES[k] ?? k;
const specName = (k: string) => SPECN[k] ?? k;

const verd = (pass: string, tight: string, fail: string) => (v: Verdict) =>
  ({ pass, tight, fail })[v];

type Spec = { [K in keyof CableUI]: L<CableUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('케이블 대역폭', 'Cable bandwidth', 'Ancho de banda del cable', 'Largura de banda do cabo', 'ケーブルの帯域', 'Kabel-Bandbreite', 'Bande passante du câble', 'केबल बैंडविड्थ', '线材带宽', '線材頻寬'),

  hubTitle: T(
    '케이블 대역폭 100칸 — 4K 120Hz는 HDMI 2.0으로 안 됩니다',
    '100 bandwidth cells — 4K at 120 Hz does not fit through HDMI 2.0',
    '100 casillas de ancho de banda — 4K a 120 Hz no cabe por HDMI 2.0',
    '100 células de largura de banda — 4K a 120 Hz não passa por HDMI 2.0',
    'ケーブル帯域100マス — 4K 120HzはHDMI 2.0では通りません',
    '100 Bandbreitenfelder — 4K mit 120 Hz passt nicht durch HDMI 2.0',
    '100 cases de bande passante — la 4K à 120 Hz ne passe pas en HDMI 2.0',
    '100 बैंडविड्थ खाने — 4K 120Hz HDMI 2.0 से नहीं जाता',
    '100 格带宽 — 4K 120Hz 走不了 HDMI 2.0',
    '100 格頻寬 — 4K 120Hz 走不了 HDMI 2.0',
  ),

  hubLead: T(
    '화면이 초당 내보내야 하는 자료는 화소 수에 주사율과 색심도를 곱한 값입니다. 해상도 열 가지와 주사율 열 가지가 만나는 칸마다 그 값을 계산하고, 규격 여섯이 각각 감당하는지 견주었습니다.',
    'What a display must push each second is its pixel count times the refresh rate times the bits per pixel. Every meeting of 10 resolutions and 10 refresh rates is worked out and checked against six published interface limits.',
    'Lo que una pantalla debe enviar cada segundo es su número de píxeles por la frecuencia y por los bits por píxel. Cada cruce de 10 resoluciones y 10 frecuencias se calcula y se compara con seis límites publicados.',
    'O que uma tela precisa enviar por segundo é a contagem de pixels vezes a taxa de atualização vezes os bits por pixel. Cada cruzamento de 10 resoluções e 10 taxas é calculado e comparado com seis limites publicados.',
    '画面が毎秒送る必要のあるデータは、画素数に主張率と色深度を掛けた値です。解像度10通りと主張率10通りが出会う各マスでその値を計算し、規格6つが通せるかを見比べました。',
    'Was ein Display pro Sekunde ausgeben muss, ist Pixelzahl mal Bildrate mal Bit pro Pixel. Jede Begegnung von 10 Auflösungen und 10 Bildraten wird berechnet und gegen sechs veröffentlichte Grenzen geprüft.',
    'Ce qu’un écran doit transmettre chaque seconde, c’est son nombre de pixels multiplié par la fréquence et par les bits par pixel. Chaque croisement de 10 définitions et 10 fréquences est calculé et confronté à six limites publiées.',
    'डिस्प्ले को हर सेकंड जितना डेटा भेजना होता है = पिक्सेल संख्या × रिफ़्रेश दर × प्रति पिक्सेल बिट। 10 रिज़ॉल्यूशन और 10 दरों के हर मेल की गणना कर छह प्रकाशित सीमाओं से मिलाया गया है।',
    '显示器每秒要送出的数据量 = 像素数 × 刷新率 × 每像素位数。10 种分辨率与 10 种刷新率交汇的每一格都算出来，并与六种规格的公开带宽对照。',
    '顯示器每秒要送出的資料量 = 像素數 × 更新率 × 每像素位元數。10 種解析度與 10 種更新率交匯的每一格都算出來，並與六種規格的公開頻寬對照。',
  ),

  resName: T<(k: string) => string>(resName, resName, resName, resName, resName, resName, resName, resName, resName, resName),
  specName: T<(k: string) => string>(specName, specName, specName, specName, specName, specName, specName, specName, specName, specName),

  verdictName: T<(v: Verdict) => string>(
    verd('지나감', '아슬아슬', '안 됨'),
    verd('fits', 'borderline', 'too much'),
    verd('cabe', 'al límite', 'no cabe'),
    verd('passa', 'no limite', 'não passa'),
    verd('通る', 'ぎりぎり', '通らない'),
    verd('passt', 'grenzwertig', 'zu viel'),
    verd('passe', 'limite', 'ne passe pas'),
    verd('जाता है', 'सीमा पर', 'नहीं जाता'),
    verd('通过', '临界', '不够'),
    verd('通過', '臨界', '不夠'),
  ),

  rateLabel: T('주사율', 'Refresh rate', 'Frecuencia', 'Taxa de atualização', '主張率', 'Bildrate', 'Fréquence', 'रिफ़्रेश दर', '刷新率', '更新率'),
  pixelLabel: T('화소 수', 'Pixel count', 'Número de píxeles', 'Contagem de pixels', '画素数', 'Pixelzahl', 'Nombre de pixels', 'पिक्सेल संख्या', '像素数', '像素數'),
  rawLabel: T('초당 자료량 (8비트)', 'Data per second (8-bit)', 'Datos por segundo (8 bits)', 'Dados por segundo (8 bits)', '毎秒のデータ量 (8ビット)', 'Daten je Sekunde (8 Bit)', 'Données par seconde (8 bits)', 'प्रति सेकंड डेटा (8-बिट)', '每秒数据量（8 位）', '每秒資料量（8 位元）'),
  raw10Label: T('10비트 색이면', 'At 10-bit colour', 'Con color de 10 bits', 'Com cor de 10 bits', '10ビット色なら', 'Bei 10-Bit-Farbe', 'En couleur 10 bits', '10-बिट रंग पर', '10 位色深时', '10 位元色深時'),
  lowestLabel: T('필요한 가장 낮은 규격', 'Lowest interface that fits', 'Interfaz mínima que sirve', 'Interface mínima que serve', '必要な最低規格', 'Niedrigste passende Schnittstelle', 'Interface minimale suffisante', 'न्यूनतम आवश्यक इंटरफ़ेस', '所需最低规格', '所需最低規格'),
  usedLabel: T('한계에 견준 쓰임', 'Share of the limit used', 'Porcentaje del límite', 'Porcentagem do limite', '限界に対する使用率', 'Anteil der Grenze', 'Part de la limite utilisée', 'सीमा का उपयोग', '占上限比例', '佔上限比例'),
  noneLabel: T('압축 없이는 안 됩니다', 'Not without compression', 'No sin compresión', 'Não sem compressão', '圧縮なしでは通りません', 'Nicht ohne Kompression', 'Impossible sans compression', 'बिना संपीड़न नहीं', '不压缩就走不了', '不壓縮就走不了'),

  mathTitle: T('곱셈 하나로 나옵니다', 'It comes from one multiplication', 'Sale de una multiplicación', 'Sai de uma multiplicação', '掛け算ひとつで出ます', 'Es folgt aus einer Multiplikation', 'Cela vient d’une multiplication', 'यह एक गुणा से निकलता है', '一次乘法就得出', '一次乘法就得出'),

  mathNote: T(
    '가로 화소 × 세로 화소 × 주사율 × 화소당 비트입니다. 8비트 색이면 화소 하나에 빨강·초록·파랑이 여덟 비트씩이라 24비트입니다. 4K를 60Hz로 내보내면 3840 × 2160 × 60 × 24 = 11.9Gbps이고, 120Hz로 올리면 그대로 두 배인 23.9Gbps가 됩니다.',
    'Width × height × refresh rate × bits per pixel. At 8-bit colour each pixel carries eight bits of red, green and blue, so 24 in total. 4K at 60 Hz is 3840 × 2160 × 60 × 24 = 11.9 Gbps; at 120 Hz it is exactly double, 23.9 Gbps.',
    'Ancho × alto × frecuencia × bits por píxel. En color de 8 bits cada píxel lleva ocho bits de rojo, verde y azul: 24 en total. 4K a 60 Hz son 3840 × 2160 × 60 × 24 = 11,9 Gbps; a 120 Hz es exactamente el doble, 23,9 Gbps.',
    'Largura × altura × taxa × bits por pixel. Em cor de 8 bits cada pixel leva oito bits de vermelho, verde e azul: 24 no total. 4K a 60 Hz dá 3840 × 2160 × 60 × 24 = 11,9 Gbps; a 120 Hz é exatamente o dobro, 23,9 Gbps.',
    '横の画素 × 縦の画素 × 主張率 × 画素あたりのビットです。8ビット色なら画素1つに赤・緑・青が8ビットずつで24ビットです。4Kを60Hzで出すと3840 × 2160 × 60 × 24 = 11.9Gbps、120Hzに上げるとちょうど2倍の23.9Gbpsになります。',
    'Breite × Höhe × Bildrate × Bit pro Pixel. Bei 8-Bit-Farbe trägt jedes Pixel acht Bit Rot, Grün und Blau, zusammen 24. 4K bei 60 Hz sind 3840 × 2160 × 60 × 24 = 11,9 Gbit/s; bei 120 Hz genau das Doppelte, 23,9 Gbit/s.',
    'Largeur × hauteur × fréquence × bits par pixel. En 8 bits, chaque pixel porte huit bits de rouge, vert et bleu, soit 24. La 4K à 60 Hz fait 3840 × 2160 × 60 × 24 = 11,9 Gb/s ; à 120 Hz, exactement le double, 23,9 Gb/s.',
    'चौड़ाई × ऊँचाई × रिफ़्रेश दर × प्रति पिक्सेल बिट। 8-बिट रंग में हर पिक्सेल लाल, हरा और नीला आठ-आठ बिट रखता है, कुल 24। 4K 60Hz पर 3840 × 2160 × 60 × 24 = 11.9 Gbps; 120Hz पर ठीक दोगुना, 23.9 Gbps।',
    '宽 × 高 × 刷新率 × 每像素位数。8 位色下每个像素的红绿蓝各占八位，共 24 位。4K 60Hz 就是 3840 × 2160 × 60 × 24 = 11.9Gbps；提到 120Hz 正好翻倍，23.9Gbps。',
    '寬 × 高 × 更新率 × 每像素位元數。8 位元色下每個像素的紅綠藍各占八位，共 24 位。4K 60Hz 就是 3840 × 2160 × 60 × 24 = 11.9Gbps；提到 120Hz 正好翻倍，23.9Gbps。',
  ),

  encodingTitle: T('규격이 내건 숫자를 다 쓰지는 못합니다', 'The headline number is not all usable', 'El número de portada no se usa entero', 'O número de capa não é todo utilizável', '規格の数字を全部は使えません', 'Die genannte Zahl steht nicht ganz zur Verfügung', 'Le chiffre annoncé n’est pas entièrement utilisable', 'विज्ञापित संख्या पूरी उपयोगी नहीं', '标称数字并不能全用上', '標稱數字並不能全用上'),

  encodingNote: T(
    'HDMI 2.0의 18Gbps 가운데 화면 자료가 쓰는 몫은 14.4Gbps입니다. 링크가 여덟 비트를 열 비트에 실어 보내기 때문입니다(8b/10b). HDMI 2.1은 16비트를 18비트에, DisplayPort 2.1은 128비트를 132비트에 싣습니다. 그래서 이 표는 총 대역폭이 아니라 화면이 실제로 쓸 수 있는 몫과 견줍니다.',
    'Of HDMI 2.0’s 18 Gbps, video gets 14.4. The link ships eight bits inside ten (8b/10b). HDMI 2.1 packs sixteen bits into eighteen, DisplayPort 2.1 packs 128 into 132. This table therefore compares against the usable video share, not the headline figure.',
    'De los 18 Gbps de HDMI 2.0, el vídeo dispone de 14,4. El enlace envía ocho bits dentro de diez (8b/10b). HDMI 2.1 mete dieciséis en dieciocho y DisplayPort 2.1, 128 en 132. Por eso aquí se compara con la parte utilizable, no con la cifra de portada.',
    'Dos 18 Gbps do HDMI 2.0, o vídeo fica com 14,4. O enlace envia oito bits dentro de dez (8b/10b). O HDMI 2.1 põe dezesseis em dezoito e o DisplayPort 2.1, 128 em 132. Por isso a comparação aqui é com a parte utilizável, não com o número de capa.',
    'HDMI 2.0の18Gbpsのうち画面データが使える分は14.4Gbpsです。リンクが8ビットを10ビットに載せて送るからです(8b/10b)。HDMI 2.1は16ビットを18ビットに、DisplayPort 2.1は128ビットを132ビットに載せます。だからこの表は総帯域ではなく実際に使える分と見比べます。',
    'Von den 18 Gbit/s bei HDMI 2.0 bleiben dem Bild 14,4. Die Verbindung verpackt acht Bit in zehn (8b/10b). HDMI 2.1 packt sechzehn in achtzehn, DisplayPort 2.1 packt 128 in 132. Verglichen wird hier deshalb mit dem nutzbaren Anteil, nicht mit der Schlagzeilenzahl.',
    'Sur les 18 Gb/s de HDMI 2.0, la vidéo dispose de 14,4. La liaison transporte huit bits dans dix (8b/10b). HDMI 2.1 loge seize bits dans dix-huit, DisplayPort 2.1 en loge 128 dans 132. La comparaison porte donc sur la part utilisable, pas sur le chiffre affiché.',
    'HDMI 2.0 के 18 Gbps में से वीडियो को 14.4 मिलते हैं। लिंक आठ बिट को दस बिट में भेजता है (8b/10b)। HDMI 2.1 सोलह को अठारह में, DisplayPort 2.1 128 को 132 में रखता है। इसलिए यहाँ तुलना उपयोगी हिस्से से है, विज्ञापित संख्या से नहीं।',
    'HDMI 2.0 的 18Gbps 里，画面数据能用的是 14.4Gbps——链路把八位塞进十位来传（8b/10b）。HDMI 2.1 是十六位装十八位，DisplayPort 2.1 是 128 位装 132 位。所以本表对照的是可用带宽，而不是标称数字。',
    'HDMI 2.0 的 18Gbps 裡，畫面資料能用的是 14.4Gbps——連結把八位塞進十位來傳（8b/10b）。HDMI 2.1 是十六位裝十八位，DisplayPort 2.1 是 128 位裝 132 位。所以本表對照的是可用頻寬，而不是標稱數字。',
  ),

  blankingTitle: T('아슬아슬한 자리는 잘라 말하지 않습니다', 'Borderline cases are not called a pass', 'Los casos al límite no se dan por buenos', 'Casos no limite não são dados como certos', 'ぎりぎりの所は断言しません', 'Grenzfälle gelten nicht als bestanden', 'Les cas limites ne sont pas donnés pour bons', 'सीमावर्ती मामलों को पास नहीं कहा गया', '临界情形不下定论', '臨界情形不下定論'),

  blankingNote: T(
    '실제 신호는 보이는 화소만 보내지 않습니다. 줄과 줄 사이, 화면과 화면 사이에 빈 구간을 함께 보내는데 요즘 규격에서 그 몫이 5% 언저리입니다. 그래서 계산한 값이 한계의 95%를 넘으면 "지나감"이라고 적지 않고 아슬아슬한 자리로 표시합니다 — 케이블 품질이나 기기에 따라 갈릴 수 있는 구간입니다.',
    'A real signal does not carry only the visible pixels: blanking intervals sit between lines and between frames, and in current timings they add about 5 %. So when a figure lands above 95 % of a limit it is marked borderline rather than a pass — that is the range where cable quality and specific hardware start to decide.',
    'Una señal real no lleva solo los píxeles visibles: hay intervalos en blanco entre líneas y entre cuadros que suman alrededor de un 5 %. Por eso, si un valor supera el 95 % del límite, se marca como al límite y no como válido: ahí empiezan a decidir el cable y el equipo.',
    'Um sinal real não leva só os pixels visíveis: há intervalos em branco entre linhas e entre quadros que somam cerca de 5 %. Por isso, se um valor passa de 95 % do limite, é marcado como no limite e não como aprovado: aí o cabo e o equipamento passam a decidir.',
    '実際の信号は見える画素だけを送りません。行と行、画面と画面の間に空き区間を一緒に送り、今の規格ではその分が5%前後です。だから計算値が限界の95%を超えたら「通る」とは書かず、ぎりぎりと表示します — ケーブルの質や機器で分かれる範囲です。',
    'Ein echtes Signal überträgt nicht nur die sichtbaren Pixel: Austastlücken zwischen Zeilen und Bildern kommen hinzu, bei heutigen Timings etwa 5 %. Liegt ein Wert über 95 % der Grenze, steht daher „grenzwertig“ statt „passt“ — ab da entscheiden Kabelqualität und Gerät.',
    'Un signal réel ne transporte pas que les pixels visibles : des intervalles de suppression s’intercalent entre lignes et entre images, soit environ 5 % en plus. Au-delà de 95 % de la limite, on n’écrit donc pas « passe » mais « limite » — c’est là que la qualité du câble et le matériel tranchent.',
    'असली सिग्नल केवल दिखने वाले पिक्सेल नहीं भेजता: पंक्तियों और फ़्रेमों के बीच ब्लैंकिंग अंतराल होते हैं, जो आज लगभग 5% जोड़ते हैं। इसलिए मान सीमा के 95% से ऊपर जाए तो «जाता है» नहीं, «सीमा पर» लिखा जाता है — वहीं से केबल की गुणवत्ता और उपकरण तय करने लगते हैं।',
    '真实信号并不只传可见像素：行与行、帧与帧之间还有消隐区间，在当下的时序里约占 5%。所以计算值超过上限的 95% 时，不写"通过"而标为"临界"——这一段要看线材质量和具体设备。',
    '真實訊號並不只傳可見像素：行與行、影格與影格之間還有消隱區間，在當下的時序裡約佔 5%。所以計算值超過上限的 95% 時，不寫「通過」而標為「臨界」——這一段要看線材品質和具體設備。',
  ),

  dscTitle: T('압축을 켜면 이야기가 달라집니다', 'Compression changes the answer', 'La compresión cambia la respuesta', 'A compressão muda a resposta', '圧縮を使うと話が変わります', 'Mit Kompression ändert sich alles', 'La compression change la donne', 'संपीड़न से उत्तर बदल जाता है', '开启压缩就是另一回事', '開啟壓縮就是另一回事'),

  dscNote: T(
    'DSC(디스플레이 스트림 압축)를 쓰면 자료량을 3분의 1 안팎으로 줄여 보냅니다. 눈에 띄지 않는 손실이라 규격에서 "시각적으로 무손실"이라고 부릅니다. 이 표는 압축을 쓰지 않은 값이므로, 여기서 안 된다고 나온 조합도 양쪽 기기가 DSC를 지원하면 될 때가 많습니다 — 다만 지원 여부는 기기마다 다릅니다.',
    'Display Stream Compression cuts the payload to roughly a third and the standards call it visually lossless. These figures assume no compression, so a combination marked as too much will often work anyway if both ends support DSC — support varies by device.',
    'La compresión DSC reduce la carga a cerca de un tercio y los estándares la llaman visualmente sin pérdidas. Estas cifras suponen que no hay compresión, así que una combinación marcada como imposible suele funcionar si ambos extremos admiten DSC — el soporte varía por equipo.',
    'A compressão DSC reduz a carga a cerca de um terço e os padrões a chamam de visualmente sem perdas. Estes números supõem que não há compressão, então uma combinação marcada como impossível costuma funcionar se ambas as pontas suportarem DSC — o suporte varia por aparelho.',
    'DSC(ディスプレイストリーム圧縮)を使うとデータ量を3分の1前後に減らして送れます。規格が「視覚的に無損失」と呼ぶ方式です。この表は圧縮なしの値なので、通らないと出た組み合わせも両端がDSCに対応していれば通ることが多いです — 対応は機器ごとに違います。',
    'Display Stream Compression drückt die Datenmenge auf etwa ein Drittel; die Normen nennen das visuell verlustfrei. Diese Zahlen gelten ohne Kompression, eine als „zu viel“ markierte Kombination läuft daher oft doch, wenn beide Seiten DSC beherrschen — das ist geräteabhängig.',
    'La compression DSC ramène la charge à environ un tiers ; les normes la disent visuellement sans perte. Ces chiffres supposent l’absence de compression : une combinaison marquée impossible passe souvent si les deux extrémités gèrent le DSC — la prise en charge varie selon les appareils.',
    'DSC (डिस्प्ले स्ट्रीम कम्प्रेशन) डेटा को लगभग एक-तिहाई कर देता है और मानक इसे «दृष्टिगत रूप से हानिरहित» कहते हैं। ये आँकड़े बिना संपीड़न के हैं, इसलिए «नहीं जाता» वाला संयोजन भी अक्सर चल जाता है यदि दोनों सिरे DSC समर्थित हों — समर्थन उपकरण पर निर्भर है।',
    'DSC（显示流压缩）能把数据量压到大约三分之一，标准称之为"视觉无损"。本表是不开压缩的数值，所以标为"不够"的组合，只要两端都支持 DSC 往往仍可点亮——支持与否因设备而异。',
    'DSC（顯示串流壓縮）能把資料量壓到大約三分之一，標準稱之為「視覺無損」。本表是不開壓縮的數值，所以標為「不夠」的組合，只要兩端都支援 DSC 往往仍可點亮——支援與否因裝置而異。',
  ),

  cableTitle: T('케이블만 바꿔서 되는 게 아닙니다', 'A new cable alone may not do it', 'Cambiar solo el cable puede no bastar', 'Trocar só o cabo pode não bastar', 'ケーブルを替えるだけでは足りません', 'Ein neues Kabel allein reicht oft nicht', 'Changer de câble ne suffit pas toujours', 'सिर्फ़ केबल बदलने से नहीं होगा', '光换线未必管用', '光換線未必管用'),

  cableNote: T(
    '대역폭은 보내는 쪽·받는 쪽·케이블 셋 가운데 가장 좁은 곳으로 정해집니다. 그래픽카드가 HDMI 2.1을 내보내도 모니터 입력이 2.0이면 2.0까지입니다. 케이블은 규격 이름이 아니라 인증 등급을 봐야 합니다 — HDMI는 Ultra High Speed, DisplayPort는 DP80 같은 표기입니다.',
    'The bandwidth you get is the narrowest of three: source, display, and cable. A graphics card that speaks HDMI 2.1 still stops at 2.0 if the monitor input is 2.0. For the cable itself, look at the certification tier rather than a version number — Ultra High Speed for HDMI, DP80 and similar for DisplayPort.',
    'El ancho de banda real es el más estrecho de tres: fuente, pantalla y cable. Una gráfica con HDMI 2.1 se queda en 2.0 si la entrada del monitor es 2.0. Para el cable, mira la certificación y no el número de versión: Ultra High Speed en HDMI, DP80 y similares en DisplayPort.',
    'A largura de banda real é a mais estreita de três: fonte, tela e cabo. Uma placa com HDMI 2.1 para em 2.0 se a entrada do monitor for 2.0. Para o cabo, veja a certificação e não o número de versão: Ultra High Speed no HDMI, DP80 e afins no DisplayPort.',
    '帯域は送る側・受ける側・ケーブルのうち一番狭い所で決まります。グラフィックカードがHDMI 2.1を出せてもモニターの入力が2.0なら2.0までです。ケーブルは規格の名前ではなく認証の等級を見ます — HDMIならUltra High Speed、DisplayPortならDP80のような表記です。',
    'Die Bandbreite bestimmt das engste der drei Glieder: Quelle, Display, Kabel. Eine Grafikkarte mit HDMI 2.1 endet bei 2.0, wenn der Monitoreingang 2.0 ist. Beim Kabel zählt die Zertifizierungsstufe statt der Versionsnummer — Ultra High Speed bei HDMI, DP80 und ähnlich bei DisplayPort.',
    'La bande passante réelle est la plus étroite des trois : source, écran, câble. Une carte graphique en HDMI 2.1 plafonne à 2.0 si l’entrée du moniteur est en 2.0. Pour le câble, regardez la certification plutôt que le numéro de version : Ultra High Speed en HDMI, DP80 et consorts en DisplayPort.',
    'बैंडविड्थ तीन में से सबसे संकरे से तय होती है: स्रोत, डिस्प्ले और केबल। HDMI 2.1 वाला ग्राफ़िक्स कार्ड भी 2.0 पर रुक जाएगा यदि मॉनिटर इनपुट 2.0 है। केबल के लिए संस्करण संख्या नहीं, प्रमाणन स्तर देखें — HDMI में Ultra High Speed, DisplayPort में DP80 जैसे।',
    '实际带宽取决于信号源、显示器、线材三者中最窄的一环。显卡支持 HDMI 2.1，但显示器输入是 2.0，那就只能到 2.0。线材要看认证等级而不是版本号——HDMI 看 Ultra High Speed，DisplayPort 看 DP80 之类。',
    '實際頻寬取決於訊號源、顯示器、線材三者中最窄的一環。顯示卡支援 HDMI 2.1，但顯示器輸入是 2.0，那就只能到 2.0。線材要看認證等級而不是版本號——HDMI 看 Ultra High Speed，DisplayPort 看 DP80 之類。',
  ),

  tableTitle: T('해상도와 주사율로 찾기', 'Find it by resolution and refresh rate', 'Búscalo por resolución y frecuencia', 'Ache por resolução e taxa', '解像度と主張率から探す', 'Nach Auflösung und Bildrate suchen', 'Chercher par définition et fréquence', 'रिज़ॉल्यूशन और दर से देखें', '按分辨率和刷新率查找', '按解析度和更新率查找'),
  neighbourTitle: T('가까운 주사율', 'Nearby refresh rates', 'Frecuencias cercanas', 'Taxas próximas', '近い主張率', 'Bildraten daneben', 'Fréquences voisines', 'पास की दरें', '相邻刷新率', '相鄰更新率'),
  resRowTitle: T('같은 해상도, 다른 주사율', 'Same resolution, other rates', 'Misma resolución, otras frecuencias', 'Mesma resolução, outras taxas', '同じ解像度、別の主張率', 'Gleiche Auflösung, andere Bildraten', 'Même définition, autres fréquences', 'वही रिज़ॉल्यूशन, दूसरी दरें', '同一分辨率，不同刷新率', '同一解析度，不同更新率'),
  rateRowTitle: T('같은 주사율, 다른 해상도', 'Same rate, other resolutions', 'Misma frecuencia, otras resoluciones', 'Mesma taxa, outras resoluções', '同じ主張率、別の解像度', 'Gleiche Bildrate, andere Auflösungen', 'Même fréquence, autres définitions', 'वही दर, दूसरे रिज़ॉल्यूशन', '同一刷新率，不同分辨率', '同一更新率，不同解析度'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '초당 자료량 = 가로 × 세로 × 주사율 × 화소당 비트(8비트 색이면 24)',
      '규격의 총 대역폭이 아니라 화면이 쓸 수 있는 몫과 견줍니다.',
      '한계의 95%를 넘으면 블랭킹까지 넣었을 때 넘을 수 있어 아슬아슬로 봅니다.',
      '압축(DSC)을 쓰지 않은 값입니다. 켜면 3분의 1 안팎으로 줄어듭니다.',
    ],
    [
      'Data per second = width × height × refresh rate × bits per pixel (24 at 8-bit).',
      'The comparison is against the usable video share, not the headline bandwidth.',
      'Above 95 % of a limit it is marked borderline, since blanking can push it over.',
      'These figures assume no DSC. With compression the payload drops to about a third.',
    ],
    [
      'Datos por segundo = ancho × alto × frecuencia × bits por píxel (24 en 8 bits).',
      'Se compara con la parte utilizable, no con el ancho de banda de portada.',
      'Por encima del 95 % del límite se marca al límite: el blanking puede pasarlo.',
      'Son cifras sin DSC. Con compresión la carga baja a alrededor de un tercio.',
    ],
    [
      'Dados por segundo = largura × altura × taxa × bits por pixel (24 em 8 bits).',
      'A comparação é com a parte utilizável, não com a largura de banda de capa.',
      'Acima de 95 % do limite marca-se no limite: o blanking pode ultrapassar.',
      'São números sem DSC. Com compressão a carga cai para cerca de um terço.',
    ],
    [
      '毎秒のデータ量 = 横 × 縦 × 主張率 × 画素あたりのビット(8ビット色なら24)',
      '規格の総帯域ではなく、画面が使える分と見比べます。',
      '限界の95%を超えるとブランキングで超えうるため、ぎりぎりと見ます。',
      '圧縮(DSC)なしの値です。使えば3分の1前後に減ります。',
    ],
    [
      'Daten je Sekunde = Breite × Höhe × Bildrate × Bit pro Pixel (24 bei 8 Bit).',
      'Verglichen wird mit dem nutzbaren Anteil, nicht mit der Schlagzeilenbandbreite.',
      'Über 95 % der Grenze gilt grenzwertig — die Austastlücke kann darüber hinausgehen.',
      'Werte ohne DSC. Mit Kompression sinkt die Datenmenge auf etwa ein Drittel.',
    ],
    [
      'Données par seconde = largeur × hauteur × fréquence × bits par pixel (24 en 8 bits).',
      'La comparaison porte sur la part utilisable, pas sur la bande passante affichée.',
      'Au-delà de 95 % de la limite, on note « limite » : la suppression peut faire déborder.',
      'Chiffres sans DSC. Avec compression, la charge tombe à environ un tiers.',
    ],
    [
      'प्रति सेकंड डेटा = चौड़ाई × ऊँचाई × दर × प्रति पिक्सेल बिट (8-बिट पर 24)।',
      'तुलना उपयोगी हिस्से से है, विज्ञापित बैंडविड्थ से नहीं।',
      'सीमा के 95% से ऊपर «सीमा पर» लिखा जाता है — ब्लैंकिंग इसे पार करा सकती है।',
      'ये आँकड़े बिना DSC के हैं। संपीड़न से भार लगभग एक-तिहाई रह जाता है।',
    ],
    [
      '每秒数据量 = 宽 × 高 × 刷新率 × 每像素位数（8 位色为 24）。',
      '对照的是可用带宽，而不是标称带宽。',
      '超过上限 95% 就标为临界，因为加上消隐可能就超了。',
      '这些数值不含 DSC 压缩。开启后数据量约降到三分之一。',
    ],
    [
      '每秒資料量 = 寬 × 高 × 更新率 × 每像素位元數（8 位元色為 24）。',
      '對照的是可用頻寬，而不是標稱頻寬。',
      '超過上限 95% 就標為臨界，因為加上消隱可能就超了。',
      '這些數值不含 DSC 壓縮。開啟後資料量約降到三分之一。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'HDMI·DisplayPort 대역폭 계산 — 이 해상도와 주사율이 지나가나',
    'HDMI and DisplayPort bandwidth — will this resolution and refresh rate fit?',
    'Ancho de banda HDMI y DisplayPort — ¿cabe esta resolución y frecuencia?',
    'Largura de banda HDMI e DisplayPort — esta resolução e taxa passam?',
    'HDMI・DisplayPortの帯域計算 — この解像度と主張率は通るか',
    'HDMI- und DisplayPort-Bandbreite — passt diese Auflösung mit dieser Bildrate?',
    'Bande passante HDMI et DisplayPort — cette définition et cette fréquence passent-elles ?',
    'HDMI और DisplayPort बैंडविड्थ — क्या यह रिज़ॉल्यूशन और दर जाएगी?',
    'HDMI 与 DisplayPort 带宽计算 — 这个分辨率和刷新率走得通吗',
    'HDMI 與 DisplayPort 頻寬計算 — 這個解析度和更新率走得通嗎',
  ),

  hubMetaDesc: T(
    '4K 60Hz는 11.9Gbps라 HDMI 2.0(화면 몫 14.4Gbps)을 지나가지만, 120Hz로 올리면 23.9Gbps가 되어 안 됩니다. 해상도 10가지 × 주사율 10가지 100칸을 규격 여섯과 견주었습니다.',
    '4K at 60 Hz needs 11.9 Gbps and fits HDMI 2.0, whose video share is 14.4. At 120 Hz it becomes 23.9 Gbps and does not. 10 resolutions × 10 refresh rates, checked against six interfaces.',
    '4K a 60 Hz necesita 11,9 Gbps y cabe en HDMI 2.0, cuya parte de vídeo es 14,4. A 120 Hz sube a 23,9 Gbps y ya no cabe. 10 resoluciones × 10 frecuencias, frente a seis interfaces.',
    '4K a 60 Hz precisa de 11,9 Gbps e cabe no HDMI 2.0, cuja parte de vídeo é 14,4. A 120 Hz sobe para 23,9 Gbps e não cabe. 10 resoluções × 10 taxas, frente a seis interfaces.',
    '4K 60Hzは11.9GbpsでHDMI 2.0(画面の分14.4Gbps)を通りますが、120Hzに上げると23.9Gbpsになり通りません。解像度10通り×主張率10通りの100マスを規格6つと見比べました。',
    '4K bei 60 Hz braucht 11,9 Gbit/s und passt durch HDMI 2.0 mit 14,4 nutzbar. Bei 120 Hz sind es 23,9 Gbit/s — dann nicht mehr. 10 Auflösungen × 10 Bildraten gegen sechs Schnittstellen.',
    'La 4K à 60 Hz demande 11,9 Gb/s et passe en HDMI 2.0 (part vidéo 14,4). À 120 Hz elle atteint 23,9 Gb/s et ne passe plus. 10 définitions × 10 fréquences, face à six interfaces.',
    '4K 60Hz को 11.9 Gbps चाहिए और वह HDMI 2.0 (वीडियो हिस्सा 14.4) से निकल जाता है; 120Hz पर 23.9 Gbps होकर नहीं निकलता। 10 रिज़ॉल्यूशन × 10 दरें, छह इंटरफ़ेस से तुलना।',
    '4K 60Hz 需要 11.9Gbps，能走 HDMI 2.0（可用 14.4Gbps）；提到 120Hz 就是 23.9Gbps，走不了。10 种分辨率 × 10 种刷新率，与六种规格逐一对照。',
    '4K 60Hz 需要 11.9Gbps，能走 HDMI 2.0（可用 14.4Gbps）；提到 120Hz 就是 23.9Gbps，走不了。10 種解析度 × 10 種更新率，與六種規格逐一對照。',
  ),

  desc: T<(f: CableFacts) => string>(
    f => `${f.w} × ${f.h} 화면을 ${f.cell.hz}Hz로 내보내면 8비트 색에서 초당 ${f.raw8}Gbps입니다. ${f.lowest ? `${specName(f.lowest)}부터 지나갑니다.` : '압축 없이는 어느 규격으로도 안 됩니다.'}`,
    f => `A ${f.w} × ${f.h} display at ${f.cell.hz} Hz pushes ${f.raw8} Gbps at 8-bit colour. ${f.lowest ? `${specName(f.lowest)} is the lowest interface that carries it.` : 'No interface here carries it without compression.'}`,
    f => `Una pantalla de ${f.w} × ${f.h} a ${f.cell.hz} Hz envía ${f.raw8} Gbps en color de 8 bits. ${f.lowest ? `${specName(f.lowest)} es la interfaz mínima que lo admite.` : 'Ninguna interfaz aquí lo admite sin compresión.'}`,
    f => `Uma tela de ${f.w} × ${f.h} a ${f.cell.hz} Hz envia ${f.raw8} Gbps em cor de 8 bits. ${f.lowest ? `${specName(f.lowest)} é a interface mínima que aguenta.` : 'Nenhuma interface aqui aguenta sem compressão.'}`,
    f => `${f.w} × ${f.h}の画面を${f.cell.hz}Hzで出すと8ビット色で毎秒${f.raw8}Gbpsです。${f.lowest ? `${specName(f.lowest)}から通ります。` : '圧縮なしではどの規格でも通りません。'}`,
    f => `Ein ${f.w} × ${f.h}-Bild mit ${f.cell.hz} Hz erzeugt bei 8-Bit-Farbe ${f.raw8} Gbit/s. ${f.lowest ? `${specName(f.lowest)} ist die niedrigste Schnittstelle, die das trägt.` : 'Ohne Kompression trägt es hier keine Schnittstelle.'}`,
    f => `Un écran ${f.w} × ${f.h} à ${f.cell.hz} Hz produit ${f.raw8} Gb/s en 8 bits. ${f.lowest ? `${specName(f.lowest)} est l’interface minimale qui le supporte.` : 'Aucune interface ici ne le supporte sans compression.'}`,
    f => `${f.w} × ${f.h} स्क्रीन ${f.cell.hz}Hz पर 8-बिट रंग में ${f.raw8} Gbps भेजती है। ${f.lowest ? `${specName(f.lowest)} सबसे कम इंटरफ़ेस है जो इसे संभालता है।` : 'बिना संपीड़न यहाँ कोई इंटरफ़ेस इसे नहीं संभालता।'}`,
    f => `${f.w} × ${f.h} 的画面以 ${f.cell.hz}Hz 输出，8 位色下每秒 ${f.raw8}Gbps。${f.lowest ? `最低要 ${specName(f.lowest)} 才走得通。` : '不压缩的话，这里任何规格都走不了。'}`,
    f => `${f.w} × ${f.h} 的畫面以 ${f.cell.hz}Hz 輸出，8 位元色下每秒 ${f.raw8}Gbps。${f.lowest ? `最低要 ${specName(f.lowest)} 才走得通。` : '不壓縮的話，這裡任何規格都走不了。'}`,
  ),

  metaTitle: T<(f: CableFacts) => string>(
    f => `${resName(f.cell.res)} ${f.cell.hz}Hz — ${f.raw8}Gbps`,
    f => `${resName(f.cell.res)} at ${f.cell.hz} Hz — ${f.raw8} Gbps`,
    f => `${resName(f.cell.res)} a ${f.cell.hz} Hz — ${f.raw8} Gbps`,
    f => `${resName(f.cell.res)} a ${f.cell.hz} Hz — ${f.raw8} Gbps`,
    f => `${resName(f.cell.res)} ${f.cell.hz}Hz — ${f.raw8}Gbps`,
    f => `${resName(f.cell.res)} mit ${f.cell.hz} Hz — ${f.raw8} Gbit/s`,
    f => `${resName(f.cell.res)} à ${f.cell.hz} Hz — ${f.raw8} Gb/s`,
    f => `${resName(f.cell.res)} ${f.cell.hz}Hz — ${f.raw8} Gbps`,
    f => `${resName(f.cell.res)} ${f.cell.hz}Hz — ${f.raw8}Gbps`,
    f => `${resName(f.cell.res)} ${f.cell.hz}Hz — ${f.raw8}Gbps`,
  ),

  metaDesc: T<(f: CableFacts) => string>(
    f => `${f.w} × ${f.h}를 ${f.cell.hz}Hz로 내보내려면 8비트 색에서 초당 ${f.raw8}Gbps, 10비트면 ${f.raw10}Gbps가 필요합니다. ${f.lowest ? `${specName(f.lowest)}부터 지나갑니다.` : '압축 없이는 어느 규격으로도 안 됩니다.'}`,
    f => `Driving ${f.w} × ${f.h} at ${f.cell.hz} Hz takes ${f.raw8} Gbps at 8-bit colour, or ${f.raw10} Gbps at 10-bit. ${f.lowest ? `${specName(f.lowest)} is the lowest interface that carries it.` : 'No interface here carries it without compression.'}`,
    f => `Mover ${f.w} × ${f.h} a ${f.cell.hz} Hz exige ${f.raw8} Gbps en 8 bits o ${f.raw10} Gbps en 10 bits. ${f.lowest ? `${specName(f.lowest)} es la interfaz mínima.` : 'Ninguna interfaz lo admite sin compresión.'}`,
    f => `Mover ${f.w} × ${f.h} a ${f.cell.hz} Hz exige ${f.raw8} Gbps em 8 bits ou ${f.raw10} Gbps em 10 bits. ${f.lowest ? `${specName(f.lowest)} é a interface mínima.` : 'Nenhuma interface aguenta sem compressão.'}`,
    f => `${f.w} × ${f.h}を${f.cell.hz}Hzで出すには8ビット色で毎秒${f.raw8}Gbps、10ビットなら${f.raw10}Gbps必要です。${f.lowest ? `${specName(f.lowest)}から通ります。` : '圧縮なしではどの規格でも通りません。'}`,
    f => `${f.w} × ${f.h} mit ${f.cell.hz} Hz braucht ${f.raw8} Gbit/s bei 8 Bit, ${f.raw10} bei 10 Bit. ${f.lowest ? `${specName(f.lowest)} ist die niedrigste passende Schnittstelle.` : 'Ohne Kompression trägt es keine Schnittstelle.'}`,
    f => `Afficher ${f.w} × ${f.h} à ${f.cell.hz} Hz demande ${f.raw8} Gb/s en 8 bits, ${f.raw10} en 10 bits. ${f.lowest ? `${specName(f.lowest)} est l’interface minimale.` : 'Aucune interface ne le supporte sans compression.'}`,
    f => `${f.w} × ${f.h} को ${f.cell.hz}Hz पर चलाने के लिए 8-बिट में ${f.raw8} Gbps, 10-बिट में ${f.raw10} Gbps चाहिए। ${f.lowest ? `${specName(f.lowest)} न्यूनतम इंटरफ़ेस है।` : 'बिना संपीड़न कोई इंटरफ़ेस इसे नहीं संभालता।'}`,
    f => `以 ${f.cell.hz}Hz 输出 ${f.w} × ${f.h}，8 位色需要每秒 ${f.raw8}Gbps，10 位色需要 ${f.raw10}Gbps。${f.lowest ? `最低要 ${specName(f.lowest)}。` : '不压缩则任何规格都走不了。'}`,
    f => `以 ${f.cell.hz}Hz 輸出 ${f.w} × ${f.h}，8 位元色需要每秒 ${f.raw8}Gbps，10 位元色需要 ${f.raw10}Gbps。${f.lowest ? `最低要 ${specName(f.lowest)}。` : '不壓縮則任何規格都走不了。'}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '4K 120Hz에는 어떤 케이블이 필요한가요?', a: '23.9Gbps가 필요해 HDMI 2.0(14.4Gbps)으로는 안 되고, HDMI 2.1이나 DisplayPort 1.4가 있어야 합니다.' },
      { q: 'HDMI 2.0은 18Gbps 아닌가요?', a: '총 대역폭이 18Gbps이고 화면 자료가 쓰는 몫은 14.4Gbps입니다. 링크가 여덟 비트를 열 비트에 실어 보내기 때문입니다.' },
      { q: 'DisplayPort 1.2가 HDMI 2.0보다 나은가요?', a: '대역폭만 보면 그렇습니다. DP 1.2의 화면 몫이 17.28Gbps로 HDMI 2.0의 14.4Gbps보다 넓습니다.' },
      { q: '8K 60Hz는 왜 대부분 안 되나요?', a: '47.8Gbps라 HDMI 2.1의 42.7Gbps도 넘어섭니다. DisplayPort 2.1이거나 압축이 필요합니다.' },
      { q: '케이블만 바꾸면 되나요?', a: '아닙니다. 보내는 쪽·받는 쪽·케이블 가운데 가장 좁은 곳이 한계입니다.' },
    ],
    [
      { q: 'What do I need for 4K at 120 Hz?', a: '23.9 Gbps, which HDMI 2.0 cannot carry at 14.4. You need HDMI 2.1 or DisplayPort 1.4.' },
      { q: 'Is HDMI 2.0 not 18 Gbps?', a: 'That is the total. Video gets 14.4 because the link ships eight bits inside ten.' },
      { q: 'Is DisplayPort 1.2 better than HDMI 2.0?', a: 'On bandwidth alone, yes: DP 1.2 gives video 17.28 Gbps against 14.4 for HDMI 2.0.' },
      { q: 'Why does 8K 60 Hz rarely work?', a: 'It needs 47.8 Gbps, past even HDMI 2.1’s 42.7. That leaves DisplayPort 2.1 or compression.' },
      { q: 'Is a new cable enough?', a: 'No. The limit is the narrowest of source, display and cable.' },
    ],
    [
      { q: '¿Qué hace falta para 4K a 120 Hz?', a: '23,9 Gbps, que HDMI 2.0 no puede con sus 14,4. Hace falta HDMI 2.1 o DisplayPort 1.4.' },
      { q: '¿HDMI 2.0 no era 18 Gbps?', a: 'Ese es el total. Al vídeo le quedan 14,4 porque el enlace envía ocho bits dentro de diez.' },
      { q: '¿DisplayPort 1.2 supera a HDMI 2.0?', a: 'En ancho de banda sí: DP 1.2 da 17,28 Gbps de vídeo frente a 14,4 de HDMI 2.0.' },
      { q: '¿Por qué casi nunca funciona 8K a 60 Hz?', a: 'Pide 47,8 Gbps, más que los 42,7 de HDMI 2.1. Quedan DisplayPort 2.1 o la compresión.' },
      { q: '¿Basta con cambiar el cable?', a: 'No. El límite lo pone el más estrecho entre fuente, pantalla y cable.' },
    ],
    [
      { q: 'O que preciso para 4K a 120 Hz?', a: '23,9 Gbps, que o HDMI 2.0 não carrega com seus 14,4. É preciso HDMI 2.1 ou DisplayPort 1.4.' },
      { q: 'HDMI 2.0 não é 18 Gbps?', a: 'Esse é o total. O vídeo fica com 14,4 porque o enlace envia oito bits dentro de dez.' },
      { q: 'DisplayPort 1.2 é melhor que HDMI 2.0?', a: 'Só em largura de banda, sim: DP 1.2 dá 17,28 Gbps de vídeo contra 14,4 do HDMI 2.0.' },
      { q: 'Por que 8K a 60 Hz quase nunca funciona?', a: 'Pede 47,8 Gbps, acima até dos 42,7 do HDMI 2.1. Restam DisplayPort 2.1 ou compressão.' },
      { q: 'Basta trocar o cabo?', a: 'Não. O limite é o mais estreito entre fonte, tela e cabo.' },
    ],
    [
      { q: '4K 120Hzにはどのケーブルが要りますか？', a: '23.9Gbps必要でHDMI 2.0(14.4Gbps)では通りません。HDMI 2.1かDisplayPort 1.4が要ります。' },
      { q: 'HDMI 2.0は18Gbpsではないのですか？', a: '総帯域が18Gbpsで、画面データが使えるのは14.4Gbpsです。8ビットを10ビットに載せて送るからです。' },
      { q: 'DisplayPort 1.2はHDMI 2.0より上ですか？', a: '帯域だけ見ればそうです。DP 1.2の画面分は17.28GbpsでHDMI 2.0の14.4Gbpsより広いです。' },
      { q: '8K 60Hzがたいてい通らないのはなぜですか？', a: '47.8Gbps必要で、HDMI 2.1の42.7Gbpsも超えるからです。DisplayPort 2.1か圧縮が要ります。' },
      { q: 'ケーブルを替えれば済みますか？', a: 'いいえ。送る側・受ける側・ケーブルのうち一番狭い所が限界です。' },
    ],
    [
      { q: 'Was brauche ich für 4K mit 120 Hz?', a: '23,9 Gbit/s — HDMI 2.0 schafft mit 14,4 nicht. Nötig sind HDMI 2.1 oder DisplayPort 1.4.' },
      { q: 'Hat HDMI 2.0 nicht 18 Gbit/s?', a: 'Das ist die Summe. Dem Bild bleiben 14,4, weil acht Bit in zehn verpackt werden.' },
      { q: 'Ist DisplayPort 1.2 besser als HDMI 2.0?', a: 'Rein nach Bandbreite ja: DP 1.2 gibt dem Bild 17,28 gegen 14,4 Gbit/s.' },
      { q: 'Warum klappt 8K mit 60 Hz selten?', a: 'Es braucht 47,8 Gbit/s, mehr als die 42,7 von HDMI 2.1. Bleiben DisplayPort 2.1 oder Kompression.' },
      { q: 'Reicht ein neues Kabel?', a: 'Nein. Es zählt das engste Glied aus Quelle, Display und Kabel.' },
    ],
    [
      { q: 'Que faut-il pour la 4K à 120 Hz ?', a: '23,9 Gb/s, hors de portée du HDMI 2.0 (14,4). Il faut du HDMI 2.1 ou du DisplayPort 1.4.' },
      { q: 'HDMI 2.0 n’est-il pas à 18 Gb/s ?', a: 'C’est le total. La vidéo dispose de 14,4, car huit bits voyagent dans dix.' },
      { q: 'DisplayPort 1.2 vaut-il mieux que HDMI 2.0 ?', a: 'En bande passante seule, oui : 17,28 Gb/s pour la vidéo contre 14,4.' },
      { q: 'Pourquoi la 8K à 60 Hz passe-t-elle rarement ?', a: 'Elle demande 47,8 Gb/s, au-delà des 42,7 du HDMI 2.1. Restent DisplayPort 2.1 ou la compression.' },
      { q: 'Changer de câble suffit-il ?', a: 'Non. La limite est le maillon le plus étroit : source, écran ou câble.' },
    ],
    [
      { q: '4K 120Hz के लिए क्या चाहिए?', a: '23.9 Gbps चाहिए, जो HDMI 2.0 (14.4) नहीं दे सकता। HDMI 2.1 या DisplayPort 1.4 चाहिए।' },
      { q: 'क्या HDMI 2.0 18 Gbps नहीं है?', a: 'वह कुल है। वीडियो को 14.4 मिलते हैं, क्योंकि लिंक आठ बिट को दस में भेजता है।' },
      { q: 'क्या DisplayPort 1.2 HDMI 2.0 से बेहतर है?', a: 'केवल बैंडविड्थ में हाँ: DP 1.2 वीडियो को 17.28 Gbps देता है, HDMI 2.0 14.4।' },
      { q: '8K 60Hz प्रायः क्यों नहीं चलता?', a: 'इसे 47.8 Gbps चाहिए, HDMI 2.1 के 42.7 से भी ऊपर। बचते हैं DisplayPort 2.1 या संपीड़न।' },
      { q: 'क्या केवल केबल बदलना काफ़ी है?', a: 'नहीं। सीमा स्रोत, डिस्प्ले और केबल में सबसे संकरे से तय होती है।' },
    ],
    [
      { q: '4K 120Hz 需要什么线？', a: '需要 23.9Gbps，HDMI 2.0 的 14.4Gbps 不够，得用 HDMI 2.1 或 DisplayPort 1.4。' },
      { q: 'HDMI 2.0 不是 18Gbps 吗？', a: '那是总带宽，画面能用的是 14.4Gbps——链路把八位塞进十位传输。' },
      { q: 'DisplayPort 1.2 比 HDMI 2.0 强吗？', a: '单看带宽是的：DP 1.2 给画面 17.28Gbps，HDMI 2.0 只有 14.4Gbps。' },
      { q: '8K 60Hz 为什么大多走不了？', a: '需要 47.8Gbps，连 HDMI 2.1 的 42.7Gbps 都超了。只能靠 DisplayPort 2.1 或压缩。' },
      { q: '只换线就行吗？', a: '不行。上限由信号源、显示器、线材中最窄的一环决定。' },
    ],
    [
      { q: '4K 120Hz 需要什麼線？', a: '需要 23.9Gbps，HDMI 2.0 的 14.4Gbps 不夠，得用 HDMI 2.1 或 DisplayPort 1.4。' },
      { q: 'HDMI 2.0 不是 18Gbps 嗎？', a: '那是總頻寬，畫面能用的是 14.4Gbps——連結把八位塞進十位傳輸。' },
      { q: 'DisplayPort 1.2 比 HDMI 2.0 強嗎？', a: '單看頻寬是的：DP 1.2 給畫面 17.28Gbps，HDMI 2.0 只有 14.4Gbps。' },
      { q: '8K 60Hz 為什麼大多走不了？', a: '需要 47.8Gbps，連 HDMI 2.1 的 42.7Gbps 都超了。只能靠 DisplayPort 2.1 或壓縮。' },
      { q: '只換線就行嗎？', a: '不行。上限由訊號源、顯示器、線材中最窄的一環決定。' },
    ],
  ),

  cellFaq: T<(f: CableFacts) => FaqItem[]>(
    f => [
      { q: `${resName(f.cell.res)}를 ${f.cell.hz}Hz로 쓰려면 얼마가 필요한가요?`, a: `8비트 색에서 초당 ${f.raw8}Gbps입니다. ${f.w} × ${f.h} × ${f.cell.hz} × 24를 계산한 값입니다.` },
      { q: `어떤 규격이면 되나요?`, a: f.lowest ? `${specName(f.lowest)}부터 지나갑니다.` : `압축 없이는 여기 있는 어느 규격으로도 안 됩니다.` },
      { q: `10비트 색으로 올리면요?`, a: `${f.raw10}Gbps가 됩니다. 화소당 비트가 24에서 30으로 늘어 정확히 1.25배입니다.` },
      { q: `압축을 쓰면 달라지나요?`, a: `DSC를 쓰면 자료량이 3분의 1 안팎으로 줄어 훨씬 낮은 규격으로도 됩니다. 다만 양쪽 기기가 모두 지원해야 합니다.` },
    ],
    f => [
      { q: `What does ${resName(f.cell.res)} at ${f.cell.hz} Hz require?`, a: `${f.raw8} Gbps at 8-bit colour — that is ${f.w} × ${f.h} × ${f.cell.hz} × 24.` },
      { q: `Which interface is enough?`, a: f.lowest ? `${specName(f.lowest)} and anything wider.` : `None of the interfaces here carry it without compression.` },
      { q: `What about 10-bit colour?`, a: `${f.raw10} Gbps. Bits per pixel go from 24 to 30, exactly 1.25 times.` },
      { q: `Does compression change it?`, a: `DSC cuts the payload to roughly a third, so a much lower interface can carry it — provided both ends support it.` },
    ],
    f => [
      { q: `¿Qué exige ${resName(f.cell.res)} a ${f.cell.hz} Hz?`, a: `${f.raw8} Gbps en color de 8 bits: ${f.w} × ${f.h} × ${f.cell.hz} × 24.` },
      { q: `¿Qué interfaz basta?`, a: f.lowest ? `${specName(f.lowest)} y cualquiera más ancha.` : `Ninguna de las de aquí sin compresión.` },
      { q: `¿Y con color de 10 bits?`, a: `${f.raw10} Gbps. Los bits por píxel pasan de 24 a 30, exactamente 1,25 veces.` },
      { q: `¿La compresión cambia algo?`, a: `DSC reduce la carga a cerca de un tercio, así que sirve una interfaz mucho menor, si ambos extremos la admiten.` },
    ],
    f => [
      { q: `O que exige ${resName(f.cell.res)} a ${f.cell.hz} Hz?`, a: `${f.raw8} Gbps em cor de 8 bits: ${f.w} × ${f.h} × ${f.cell.hz} × 24.` },
      { q: `Que interface basta?`, a: f.lowest ? `${specName(f.lowest)} e qualquer uma mais larga.` : `Nenhuma das daqui sem compressão.` },
      { q: `E com cor de 10 bits?`, a: `${f.raw10} Gbps. Os bits por pixel vão de 24 para 30, exatamente 1,25 vez.` },
      { q: `A compressão muda algo?`, a: `O DSC reduz a carga a cerca de um terço, então serve uma interface bem menor, se ambas as pontas a suportarem.` },
    ],
    f => [
      { q: `${resName(f.cell.res)}を${f.cell.hz}Hzで使うにはいくつ必要ですか？`, a: `8ビット色で毎秒${f.raw8}Gbpsです。${f.w} × ${f.h} × ${f.cell.hz} × 24を計算した値です。` },
      { q: `どの規格なら通りますか？`, a: f.lowest ? `${specName(f.lowest)}から通ります。` : `圧縮なしではここにあるどの規格でも通りません。` },
      { q: `10ビット色に上げると？`, a: `${f.raw10}Gbpsになります。画素あたりのビットが24から30になり、ちょうど1.25倍です。` },
      { q: `圧縮を使えば変わりますか？`, a: `DSCを使えばデータ量が3分の1前後に減り、ずっと低い規格でも通ります。ただし両端が対応している必要があります。` },
    ],
    f => [
      { q: `Was verlangt ${resName(f.cell.res)} mit ${f.cell.hz} Hz?`, a: `${f.raw8} Gbit/s bei 8-Bit-Farbe — also ${f.w} × ${f.h} × ${f.cell.hz} × 24.` },
      { q: `Welche Schnittstelle genügt?`, a: f.lowest ? `${specName(f.lowest)} und alles Breitere.` : `Ohne Kompression keine der hier gelisteten.` },
      { q: `Und bei 10-Bit-Farbe?`, a: `${f.raw10} Gbit/s. Die Bits pro Pixel steigen von 24 auf 30, genau das 1,25-Fache.` },
      { q: `Ändert Kompression etwas?`, a: `DSC drückt die Datenmenge auf etwa ein Drittel — dann reicht eine deutlich kleinere Schnittstelle, sofern beide Seiten sie beherrschen.` },
    ],
    f => [
      { q: `Que demande ${resName(f.cell.res)} à ${f.cell.hz} Hz ?`, a: `${f.raw8} Gb/s en 8 bits, soit ${f.w} × ${f.h} × ${f.cell.hz} × 24.` },
      { q: `Quelle interface suffit ?`, a: f.lowest ? `${specName(f.lowest)} et toute interface plus large.` : `Aucune de celles listées, sans compression.` },
      { q: `Et en couleur 10 bits ?`, a: `${f.raw10} Gb/s. Les bits par pixel passent de 24 à 30, soit exactement 1,25 fois.` },
      { q: `La compression change-t-elle la donne ?`, a: `Le DSC ramène la charge à environ un tiers : une interface bien plus modeste suffit, si les deux extrémités la gèrent.` },
    ],
    f => [
      { q: `${resName(f.cell.res)} को ${f.cell.hz}Hz पर चलाने में कितना लगता है?`, a: `8-बिट रंग में ${f.raw8} Gbps — यानी ${f.w} × ${f.h} × ${f.cell.hz} × 24।` },
      { q: `कौन सा इंटरफ़ेस काफ़ी है?`, a: f.lowest ? `${specName(f.lowest)} और उससे चौड़ा कोई भी।` : `बिना संपीड़न यहाँ का कोई नहीं।` },
      { q: `10-बिट रंग पर क्या होगा?`, a: `${f.raw10} Gbps। प्रति पिक्सेल बिट 24 से 30 हो जाते हैं, ठीक 1.25 गुना।` },
      { q: `क्या संपीड़न से फ़र्क़ पड़ता है?`, a: `DSC भार को लगभग एक-तिहाई कर देता है, तो बहुत कम इंटरफ़ेस भी चल जाता है — बशर्ते दोनों सिरे समर्थन करें।` },
    ],
    f => [
      { q: `${resName(f.cell.res)} 跑 ${f.cell.hz}Hz 需要多少带宽？`, a: `8 位色下每秒 ${f.raw8}Gbps，即 ${f.w} × ${f.h} × ${f.cell.hz} × 24。` },
      { q: `哪种规格够用？`, a: f.lowest ? `${specName(f.lowest)} 及更宽的都行。` : `不压缩的话，这里列的都不够。` },
      { q: `改成 10 位色呢？`, a: `变成 ${f.raw10}Gbps。每像素位数从 24 升到 30，正好 1.25 倍。` },
      { q: `开压缩会不一样吗？`, a: `DSC 能把数据量压到约三分之一，低不少的规格也能带动——前提是两端都支持。` },
    ],
    f => [
      { q: `${resName(f.cell.res)} 跑 ${f.cell.hz}Hz 需要多少頻寬？`, a: `8 位元色下每秒 ${f.raw8}Gbps，即 ${f.w} × ${f.h} × ${f.cell.hz} × 24。` },
      { q: `哪種規格夠用？`, a: f.lowest ? `${specName(f.lowest)} 及更寬的都行。` : `不壓縮的話，這裡列的都不夠。` },
      { q: `改成 10 位元色呢？`, a: `變成 ${f.raw10}Gbps。每像素位元數從 24 升到 30，正好 1.25 倍。` },
      { q: `開壓縮會不一樣嗎？`, a: `DSC 能把資料量壓到約三分之一，低不少的規格也能帶動——前提是兩端都支援。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const CABLE_UI: L<CableUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<CableUI>;
