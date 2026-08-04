/**
 * 프리픽스 화면의 문구 — 열 언어.
 *
 * 이 섹션에서 언어마다 갈리는 것은 **큰 수를 어떻게 읽어 주는가**뿐이다.
 * 4,294,967,296은 독일어로 4.294.967.296이고, 2^64쯤 되면 어느 언어에서도
 * 자릿수를 세는 것이 무의미해 거듭제곱으로 적는 편이 낫다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { CidrFacts } from './facts.ts';
import type { Family } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface CidrUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 주소 개수 — 32비트를 넘으면 자릿수를 세는 대신 거듭제곱으로 적는다 */
  count: (v: bigint, bits: number) => string;
  familyLabel: Record<Family, string>;
  familyNote: Record<Family, string>;
  prefixLabel: string;
  maskLabel: string;
  wildcardLabel: string;
  maskHexLabel: string;
  addressesLabel: string;
  usableLabel: string;
  subnetsLabel: (family: Family) => string;
  hostBitsLabel: string;
  classfulLabel: string;
  nibbleLabel: string;
  yes: string;
  no: string;
  noneLabel: string;
  binTitle: string;
  binNote: string;
  blocksTitle: string;
  blocksNote: string;
  exceptionNote: string;
  neighbourTitle: string;
  desc: (f: CidrFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: CidrFacts) => string;
  metaDesc: (f: CidrFacts) => string;
  hubFaq: FaqItem[];
  prefixFaq: (f: CidrFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/**
 * 큰 수 읽기.
 *
 * 32비트까지는 자릿수를 끊어 적는다(4,294,967,296). 그보다 크면 2^64처럼 적는다 —
 * 열아홉 자리 수를 끊어 놓아도 읽히지 않고, 자릿수 구분 기호만 언어마다 달라진다.
 */
const counter = (tag: string) => (v: bigint, bits: number): string =>
  (bits <= 32 ? Number(v).toLocaleString(tag) : `2^${bits}`);

const COUNT: L<(v: bigint, bits: number) => string> = {
  ko: counter('ko'), en: counter('en'), es: counter('es'), pt: counter('pt-BR'), ja: counter('ja'),
  de: counter('de'), fr: counter('fr'), hi: counter('en'), zh: counter('zh'), tw: counter('zh-Hant'),
};

type Spec = { [K in keyof CidrUI]: L<CidrUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('서브넷', 'Subnets', 'Subredes', 'Sub-redes', 'サブネット', 'Subnetze', 'Sous-réseaux', 'सबनेट', '子网', '子網路'),

  count: COUNT,

  hubTitle: T(
    'CIDR 프리픽스 162가지',
    'All 162 CIDR prefixes',
    'Los 162 prefijos CIDR',
    'Os 162 prefixos CIDR',
    'CIDRプレフィックス162種',
    'Alle 162 CIDR-Präfixe',
    'Les 162 préfixes CIDR',
    'सभी 162 CIDR प्रीफ़िक्स',
    '162 个 CIDR 前缀',
    '162 個 CIDR 前綴',
  ),

  hubLead: T(
    '/0부터 /32까지, IPv6는 /128까지. 마스크와 주소 개수, 쓸 수 있는 호스트 수를 프리픽스 하나에서 계산했습니다.',
    'From /0 to /32, and to /128 for IPv6. The mask, the address count and the usable hosts all follow from that one number.',
    'De /0 a /32, y hasta /128 en IPv6. La máscara, el número de direcciones y los hosts utilizables salen de ese único número.',
    'De /0 a /32, e até /128 no IPv6. A máscara, a contagem de endereços e os hosts utilizáveis saem desse único número.',
    '/0から/32まで、IPv6は/128まで。マスクもアドレス数も使えるホスト数も、その数字ひとつから計算しています。',
    'Von /0 bis /32, bei IPv6 bis /128. Maske, Adressanzahl und nutzbare Hosts folgen alle aus dieser einen Zahl.',
    'De /0 à /32, et jusqu’à /128 pour IPv6. Le masque, le nombre d’adresses et les hôtes utilisables découlent de ce seul nombre.',
    '/0 से /32 तक, और IPv6 में /128 तक। मास्क, पतों की संख्या और उपयोग योग्य होस्ट — सब उसी एक संख्या से।',
    '从 /0 到 /32，IPv6 到 /128。掩码、地址数量和可用主机数，全部由这一个数字算出。',
    '從 /0 到 /32，IPv6 到 /128。遮罩、位址數量和可用主機數，全部由這一個數字算出。',
  ),

  familyLabel: T(
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
    { v4: 'IPv4', v6: 'IPv6' },
  ),

  familyNote: T(
    {
      v4: '주소가 32비트라 마스크를 255.255.255.0처럼 점 넷으로 적습니다.',
      v6: '주소가 128비트라 마스크를 적지 않고 프리픽스 길이만 씁니다. 한 집에 /56, 한 망에 /64가 관례입니다.',
    },
    {
      v4: 'Addresses are 32 bits, so the mask is written in four dotted parts: 255.255.255.0.',
      v6: 'Addresses are 128 bits, so nobody writes a mask — only the prefix length. A home gets a /56, a single network a /64.',
    },
    {
      v4: 'Las direcciones son de 32 bits, así que la máscara se escribe en cuatro partes: 255.255.255.0.',
      v6: 'Las direcciones son de 128 bits, así que no se escribe máscara, solo la longitud. Una casa recibe un /56 y una red un /64.',
    },
    {
      v4: 'Os endereços têm 32 bits, então a máscara se escreve em quatro partes: 255.255.255.0.',
      v6: 'Os endereços têm 128 bits, então não se escreve máscara, só o comprimento. Uma casa recebe um /56 e uma rede um /64.',
    },
    {
      v4: 'アドレスが32ビットなので、マスクを255.255.255.0のように四つに区切って書きます。',
      v6: 'アドレスが128ビットなのでマスクは書かず、プレフィックス長だけを使います。家庭に/56、一つの網に/64が通例です。',
    },
    {
      v4: 'Adressen sind 32 Bit lang, daher schreibt man die Maske in vier Teilen: 255.255.255.0.',
      v6: 'Adressen sind 128 Bit lang; man schreibt keine Maske, nur die Präfixlänge. Ein Haushalt bekommt ein /56, ein Netz ein /64.',
    },
    {
      v4: 'Les adresses font 32 bits : le masque s’écrit en quatre parties, 255.255.255.0.',
      v6: 'Les adresses font 128 bits ; on n’écrit pas de masque, seulement la longueur. Un foyer reçoit un /56, un réseau un /64.',
    },
    {
      v4: 'पते 32 बिट के हैं, इसलिए मास्क 255.255.255.0 की तरह चार हिस्सों में लिखा जाता है।',
      v6: 'पते 128 बिट के हैं, इसलिए मास्क नहीं लिखा जाता, केवल प्रीफ़िक्स लंबाई। एक घर को /56 और एक नेटवर्क को /64 मिलता है।',
    },
    {
      v4: '地址是 32 位，所以掩码写成 255.255.255.0 这样的四段。',
      v6: '地址是 128 位，所以不写掩码，只写前缀长度。一户人家给 /56，一个网段给 /64。',
    },
    {
      v4: '位址是 32 位，所以遮罩寫成 255.255.255.0 這樣的四段。',
      v6: '位址是 128 位，所以不寫遮罩，只寫前綴長度。一戶人家給 /56，一個網段給 /64。',
    },
  ),

  prefixLabel: T('프리픽스', 'Prefix', 'Prefijo', 'Prefixo', 'プレフィックス', 'Präfix', 'Préfixe', 'प्रीफ़िक्स', '前缀', '前綴'),
  maskLabel: T('서브넷 마스크', 'Subnet mask', 'Máscara de subred', 'Máscara de sub-rede', 'サブネットマスク', 'Subnetzmaske', 'Masque de sous-réseau', 'सबनेट मास्क', '子网掩码', '子網路遮罩'),
  wildcardLabel: T('와일드카드', 'Wildcard', 'Comodín', 'Curinga', 'ワイルドカード', 'Wildcard', 'Masque générique', 'वाइल्डकार्ड', '通配符掩码', '萬用遮罩'),
  maskHexLabel: T('16진수 마스크', 'Mask in hex', 'Máscara en hex', 'Máscara em hex', '16進数マスク', 'Maske hexadezimal', 'Masque en hex', 'हेक्स में मास्क', '十六进制掩码', '十六進位遮罩'),
  addressesLabel: T('주소 개수', 'Addresses', 'Direcciones', 'Endereços', 'アドレス数', 'Adressen', 'Adresses', 'पते', '地址数', '位址數'),
  usableLabel: T('쓸 수 있는 주소', 'Usable hosts', 'Hosts utilizables', 'Hosts utilizáveis', '使えるホスト数', 'Nutzbare Hosts', 'Hôtes utilisables', 'उपयोग योग्य होस्ट', '可用主机数', '可用主機數'),

  subnetsLabel: T<(family: Family) => string>(
    f => (f === 'v4' ? '안에 드는 /24' : '안에 드는 /64'),
    f => (f === 'v4' ? '/24 networks inside' : '/64 networks inside'),
    f => (f === 'v4' ? 'Redes /24 dentro' : 'Redes /64 dentro'),
    f => (f === 'v4' ? 'Redes /24 dentro' : 'Redes /64 dentro'),
    f => (f === 'v4' ? '中に入る/24' : '中に入る/64'),
    f => (f === 'v4' ? 'Enthaltene /24' : 'Enthaltene /64'),
    f => (f === 'v4' ? 'Réseaux /24 contenus' : 'Réseaux /64 contenus'),
    f => (f === 'v4' ? 'भीतर के /24' : 'भीतर के /64'),
    f => (f === 'v4' ? '内含 /24 个数' : '内含 /64 个数'),
    f => (f === 'v4' ? '內含 /24 個數' : '內含 /64 個數'),
  ),

  hostBitsLabel: T('호스트 비트', 'Host bits', 'Bits de host', 'Bits de host', 'ホストビット', 'Host-Bits', 'Bits d’hôte', 'होस्ट बिट', '主机位', '主機位'),
  classfulLabel: T('예전 분류', 'Old class', 'Clase antigua', 'Classe antiga', '旧クラス', 'Alte Klasse', 'Ancienne classe', 'पुरानी श्रेणी', '旧的类', '舊的類'),
  nibbleLabel: T('16진수 경계', 'Nibble boundary', 'Límite de nibble', 'Limite de nibble', '16進数の区切り', 'Nibble-Grenze', 'Limite de quartet', 'निबल सीमा', '半字节边界', '半位元組邊界'),
  yes: T('네', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '是', '是'),
  no: T('아니요', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '否', '否'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  binTitle: T('비트로 보기', 'Seen as bits', 'Visto en bits', 'Visto em bits', 'ビットで見る', 'Als Bits gesehen', 'Vu en bits', 'बिट में', '用比特看', '用位元看'),

  binNote: T(
    '앞의 1이 망 자리이고 뒤의 0이 호스트 자리입니다. 1을 하나 늘리면 망이 둘로 갈리고 주소는 반이 됩니다.',
    'The leading ones are the network part and the trailing zeros the host part. Add one more one and the network splits in two, halving the addresses.',
    'Los unos iniciales son la parte de red y los ceros finales la de host. Añade un uno más y la red se parte en dos: las direcciones se reducen a la mitad.',
    'Os uns iniciais são a parte de rede e os zeros finais a de host. Acrescente mais um e a rede se parte em duas, com metade dos endereços.',
    '前の1が網の部分、後ろの0がホストの部分です。1を一つ増やすと網が二つに割れ、アドレスは半分になります。',
    'Die führenden Einsen sind der Netzanteil, die nachfolgenden Nullen der Hostanteil. Eine Eins mehr teilt das Netz in zwei — halb so viele Adressen.',
    'Les uns du début forment la partie réseau, les zéros de la fin la partie hôte. Un un de plus coupe le réseau en deux : moitié moins d’adresses.',
    'आगे के 1 नेटवर्क का हिस्सा हैं और पीछे के 0 होस्ट का। एक 1 और जोड़ें तो नेटवर्क दो में बँट जाता है और पते आधे रह जाते हैं।',
    '前面的 1 是网络部分，后面的 0 是主机部分。多加一个 1，网络就一分为二，地址数减半。',
    '前面的 1 是網路部分，後面的 0 是主機部分。多加一個 1，網路就一分為二，位址數減半。',
  ),

  blocksTitle: T('이 프리픽스로 쓰이는 대역', 'Blocks reserved at this length', 'Bloques reservados con esta longitud', 'Blocos reservados neste comprimento', 'この長さで使われる帯域', 'Blöcke mit dieser Länge', 'Blocs réservés à cette longueur', 'इस लंबाई पर आरक्षित ब्लॉक', '这个长度上的保留地址块', '這個長度上的保留位址區塊'),

  blocksNote: T(
    '표준이 따로 정해 둔 대역입니다. 주소 자체는 어느 나라에서나 같은 값이라 옮기지 않습니다.',
    'Blocks the standards set aside. The addresses themselves are the same everywhere, so they are left as they are.',
    'Bloques que los estándares reservan. Las direcciones son iguales en todas partes, así que se dejan tal cual.',
    'Blocos que os padrões reservam. Os endereços são os mesmos em toda parte, então ficam como estão.',
    '標準が別に取り置いた帯域です。アドレス自体はどの国でも同じ値なので訳しません。',
    'Blöcke, die die Standards reserviert haben. Die Adressen selbst sind überall gleich und bleiben unübersetzt.',
    'Des blocs que les normes réservent. Les adresses elles-mêmes sont identiques partout et restent telles quelles.',
    'मानकों द्वारा अलग रखे गए ब्लॉक। पते हर जगह एक जैसे हैं, इसलिए ज्यों के त्यों रखे गए हैं।',
    '标准另行保留的地址块。地址本身在哪儿都一样，所以原样保留。',
    '標準另行保留的位址區塊。位址本身在哪兒都一樣，所以原樣保留。',
  ),

  exceptionNote: T(
    '/31과 /32는 예외입니다. 보통은 망 주소와 브로드캐스트를 빼지만, /31은 라우터 둘을 잇는 자리라 두 주소를 다 쓰고(RFC 3021) /32는 주소 하나짜리 경로입니다.',
    '/31 and /32 are the exceptions. Normally the network and broadcast addresses are subtracted, but a /31 links two routers and uses both (RFC 3021), and a /32 is a single-address route.',
    '/31 y /32 son la excepción. Normalmente se restan la dirección de red y la de difusión, pero un /31 une dos routers y usa las dos (RFC 3021), y un /32 es una ruta de una sola dirección.',
    '/31 e /32 são exceções. Normalmente subtraem-se o endereço de rede e o de broadcast, mas um /31 liga dois roteadores e usa os dois (RFC 3021), e um /32 é uma rota de um único endereço.',
    '/31と/32は例外です。ふつうは網アドレスとブロードキャストを引きますが、/31はルータ二台をつなぐ区間なので両方使い(RFC 3021)、/32はアドレス一つの経路です。',
    '/31 und /32 sind Ausnahmen. Sonst zieht man Netz- und Broadcast-Adresse ab, doch ein /31 verbindet zwei Router und nutzt beide (RFC 3021), und ein /32 ist eine Route mit einer einzigen Adresse.',
    '/31 et /32 font exception. On retranche d’ordinaire l’adresse réseau et la diffusion, mais un /31 relie deux routeurs et utilise les deux (RFC 3021), et un /32 est une route à une seule adresse.',
    '/31 और /32 अपवाद हैं। सामान्यतः नेटवर्क और ब्रॉडकास्ट पते घटाए जाते हैं, पर /31 दो राउटर जोड़ता है और दोनों पते काम आते हैं (RFC 3021), और /32 एक ही पते का मार्ग है।',
    '/31 和 /32 是例外。通常要减去网络地址和广播地址，但 /31 用来连接两台路由器，两个地址都能用（RFC 3021），/32 则是只有一个地址的路由。',
    '/31 和 /32 是例外。通常要減去網路位址和廣播位址，但 /31 用來連接兩台路由器，兩個位址都能用（RFC 3021），/32 則是只有一個位址的路由。',
  ),

  neighbourTitle: T('가까운 프리픽스', 'Prefixes either side', 'Prefijos vecinos', 'Prefixos vizinhos', '近いプレフィックス', 'Präfixe daneben', 'Préfixes voisins', 'पास के प्रीफ़िक्स', '相邻的前缀', '相鄰的前綴'),

  desc: T<(f: CidrFacts) => string>(
    f => `/${f.bits}는 앞의 ${f.bits}비트가 망 주소이고 ${f.hostBits}비트가 호스트 자리입니다. 주소는 ${COUNT.ko(f.addresses, f.hostBits)}개${f.family === 'v4' ? `, 마스크는 ${f.mask}입니다` : '입니다'}.`,
    f => `/${f.bits} means the first ${f.bits} bits are the network and ${f.hostBits} are left for hosts. That is ${COUNT.en(f.addresses, f.hostBits)} addresses${f.family === 'v4' ? `, with mask ${f.mask}` : ''}.`,
    f => `/${f.bits} significa que los primeros ${f.bits} bits son de red y quedan ${f.hostBits} para hosts. Son ${COUNT.es(f.addresses, f.hostBits)} direcciones${f.family === 'v4' ? `, con máscara ${f.mask}` : ''}.`,
    f => `/${f.bits} significa que os primeiros ${f.bits} bits são de rede e sobram ${f.hostBits} para hosts. São ${COUNT.pt(f.addresses, f.hostBits)} endereços${f.family === 'v4' ? `, com máscara ${f.mask}` : ''}.`,
    f => `/${f.bits}は前の${f.bits}ビットが網、残り${f.hostBits}ビットがホストの部分です。アドレスは${COUNT.ja(f.addresses, f.hostBits)}個${f.family === 'v4' ? `、マスクは${f.mask}です` : 'です'}。`,
    f => `/${f.bits} heißt: die ersten ${f.bits} Bit sind das Netz, ${f.hostBits} bleiben für Hosts. Das sind ${COUNT.de(f.addresses, f.hostBits)} Adressen${f.family === 'v4' ? `, Maske ${f.mask}` : ''}.`,
    f => `/${f.bits} signifie que les ${f.bits} premiers bits sont le réseau et qu’il reste ${f.hostBits} bits pour les hôtes. Cela fait ${COUNT.fr(f.addresses, f.hostBits)} adresses${f.family === 'v4' ? `, masque ${f.mask}` : ''}.`,
    f => `/${f.bits} का अर्थ है कि पहले ${f.bits} बिट नेटवर्क हैं और ${f.hostBits} बिट होस्ट के लिए बचते हैं। यानी ${COUNT.hi(f.addresses, f.hostBits)} पते${f.family === 'v4' ? `, मास्क ${f.mask}` : ''}।`,
    f => `/${f.bits} 表示前 ${f.bits} 位是网络部分，剩下 ${f.hostBits} 位留给主机。共 ${COUNT.zh(f.addresses, f.hostBits)} 个地址${f.family === 'v4' ? `，掩码是 ${f.mask}` : ''}。`,
    f => `/${f.bits} 表示前 ${f.bits} 位是網路部分，剩下 ${f.hostBits} 位留給主機。共 ${COUNT.tw(f.addresses, f.hostBits)} 個位址${f.family === 'v4' ? `，遮罩是 ${f.mask}` : ''}。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '/24는 앞의 24비트가 망이라는 뜻입니다. 남은 8비트가 그 안의 주소가 됩니다.',
      '한 비트가 늘 때마다 망은 둘로 갈리고 주소는 반으로 줍니다.',
      '쓸 수 있는 주소는 보통 전체에서 둘(망 주소·브로드캐스트)을 뺀 값입니다.',
      'IPv6에는 브로드캐스트가 없어 뺄 것이 없습니다. 한 망은 /64가 관례입니다.',
    ],
    [
      '/24 means the first 24 bits are the network; the remaining 8 hold the addresses inside it.',
      'Each extra bit splits the network in two and halves the addresses.',
      'Usable addresses are normally the total minus two — the network and broadcast addresses.',
      'IPv6 has no broadcast, so nothing is subtracted. One network is conventionally a /64.',
    ],
    [
      '/24 significa que los primeros 24 bits son la red; los 8 restantes guardan las direcciones de dentro.',
      'Cada bit de más parte la red en dos y reduce las direcciones a la mitad.',
      'Las direcciones utilizables son normalmente el total menos dos: la de red y la de difusión.',
      'IPv6 no tiene difusión, así que no se resta nada. Una red suele ser un /64.',
    ],
    [
      '/24 significa que os primeiros 24 bits são a rede; os 8 restantes guardam os endereços de dentro.',
      'Cada bit a mais parte a rede em duas e reduz os endereços à metade.',
      'Os endereços utilizáveis são normalmente o total menos dois: o de rede e o de broadcast.',
      'O IPv6 não tem broadcast, então nada é subtraído. Uma rede costuma ser um /64.',
    ],
    [
      '/24は前の24ビットが網という意味です。残り8ビットがその中のアドレスになります。',
      'ビットが一つ増えるたびに網は二つに割れ、アドレスは半分になります。',
      '使えるアドレスはふつう全体から二つ（網アドレスとブロードキャスト）を引いた数です。',
      'IPv6にはブロードキャストがないので引くものがありません。一つの網は/64が通例です。',
    ],
    [
      '/24 heißt: die ersten 24 Bit sind das Netz; die übrigen 8 tragen die Adressen darin.',
      'Jedes zusätzliche Bit teilt das Netz in zwei und halbiert die Adressen.',
      'Nutzbare Adressen sind normalerweise die Gesamtzahl minus zwei — Netz- und Broadcast-Adresse.',
      'IPv6 kennt kein Broadcast, es wird nichts abgezogen. Ein Netz ist üblicherweise ein /64.',
    ],
    [
      '/24 signifie que les 24 premiers bits sont le réseau ; les 8 restants portent les adresses.',
      'Chaque bit supplémentaire coupe le réseau en deux et divise les adresses par deux.',
      'Les adresses utilisables sont d’ordinaire le total moins deux : réseau et diffusion.',
      'IPv6 n’a pas de diffusion : rien n’est retranché. Un réseau vaut par convention un /64.',
    ],
    [
      '/24 का अर्थ है पहले 24 बिट नेटवर्क; बचे 8 बिट भीतर के पते रखते हैं।',
      'हर अतिरिक्त बिट नेटवर्क को दो में बाँटता है और पते आधे कर देता है।',
      'उपयोग योग्य पते सामान्यतः कुल में से दो घटाकर मिलते हैं — नेटवर्क और ब्रॉडकास्ट।',
      'IPv6 में ब्रॉडकास्ट नहीं है, इसलिए कुछ घटाना नहीं पड़ता। एक नेटवर्क आमतौर पर /64 होता है।',
    ],
    [
      '/24 表示前 24 位是网络，剩下 8 位放里面的地址。',
      '每多一位，网络就一分为二，地址数减半。',
      '可用地址通常是总数减二——网络地址和广播地址。',
      'IPv6 没有广播，不用减。一个网段习惯上就是 /64。',
    ],
    [
      '/24 表示前 24 位是網路，剩下 8 位放裡面的位址。',
      '每多一位，網路就一分為二，位址數減半。',
      '可用位址通常是總數減二——網路位址和廣播位址。',
      'IPv6 沒有廣播，不用減。一個網段習慣上就是 /64。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'CIDR 서브넷 표 — 프리픽스별 마스크와 호스트 수',
    'CIDR subnet table — mask and host count for every prefix',
    'Tabla de subredes CIDR — máscara y hosts de cada prefijo',
    'Tabela de sub-redes CIDR — máscara e hosts de cada prefixo',
    'CIDRサブネット表 — プレフィックスごとのマスクとホスト数',
    'CIDR-Subnetztabelle — Maske und Hostzahl je Präfix',
    'Table des sous-réseaux CIDR — masque et nombre d’hôtes par préfixe',
    'CIDR सबनेट तालिका — हर प्रीफ़िक्स का मास्क और होस्ट संख्या',
    'CIDR 子网表 — 每个前缀的掩码与主机数',
    'CIDR 子網路表 — 每個前綴的遮罩與主機數',
  ),

  hubMetaDesc: T(
    '/0부터 /32까지와 IPv6 /128까지, 프리픽스 162가지를 한 장씩. 서브넷 마스크·와일드카드·주소 개수·쓸 수 있는 호스트 수를 계산했습니다.',
    'All 162 prefixes, /0 to /32 and IPv6 to /128, one page each: subnet mask, wildcard, address count and usable hosts.',
    'Los 162 prefijos, de /0 a /32 y hasta /128 en IPv6, uno por página: máscara, comodín, número de direcciones y hosts utilizables.',
    'Os 162 prefixos, de /0 a /32 e até /128 no IPv6, um por página: máscara, curinga, contagem de endereços e hosts utilizáveis.',
    '/0から/32、IPv6は/128まで、プレフィックス162種を1ページずつ。マスク・ワイルドカード・アドレス数・使えるホスト数を計算しました。',
    'Alle 162 Präfixe, /0 bis /32 und bei IPv6 bis /128, je eine Seite: Subnetzmaske, Wildcard, Adressanzahl und nutzbare Hosts.',
    'Les 162 préfixes, de /0 à /32 et jusqu’à /128 en IPv6, une page chacun : masque, masque générique, nombre d’adresses et hôtes utilisables.',
    'सभी 162 प्रीफ़िक्स — /0 से /32 और IPv6 में /128 तक — एक-एक पृष्ठ: मास्क, वाइल्डकार्ड, पतों की संख्या और उपयोग योग्य होस्ट।',
    '162 个前缀，从 /0 到 /32、IPv6 到 /128，各一页：子网掩码、通配符掩码、地址数与可用主机数。',
    '162 個前綴，從 /0 到 /32、IPv6 到 /128，各一頁：子網路遮罩、萬用遮罩、位址數與可用主機數。',
  ),

  metaTitle: T<(f: CidrFacts) => string>(
    f => (f.family === 'v4' ? `/${f.bits} 서브넷 — 마스크 ${f.mask}` : `IPv6 /${f.bits} 프리픽스`),
    f => (f.family === 'v4' ? `/${f.bits} subnet — mask ${f.mask}` : `IPv6 /${f.bits} prefix`),
    f => (f.family === 'v4' ? `Subred /${f.bits} — máscara ${f.mask}` : `Prefijo IPv6 /${f.bits}`),
    f => (f.family === 'v4' ? `Sub-rede /${f.bits} — máscara ${f.mask}` : `Prefixo IPv6 /${f.bits}`),
    f => (f.family === 'v4' ? `/${f.bits} サブネット — マスク ${f.mask}` : `IPv6 /${f.bits} プレフィックス`),
    f => (f.family === 'v4' ? `/${f.bits} Subnetz — Maske ${f.mask}` : `IPv6-Präfix /${f.bits}`),
    f => (f.family === 'v4' ? `Sous-réseau /${f.bits} — masque ${f.mask}` : `Préfixe IPv6 /${f.bits}`),
    f => (f.family === 'v4' ? `/${f.bits} सबनेट — मास्क ${f.mask}` : `IPv6 /${f.bits} प्रीफ़िक्स`),
    f => (f.family === 'v4' ? `/${f.bits} 子网 — 掩码 ${f.mask}` : `IPv6 /${f.bits} 前缀`),
    f => (f.family === 'v4' ? `/${f.bits} 子網路 — 遮罩 ${f.mask}` : `IPv6 /${f.bits} 前綴`),
  ),

  metaDesc: T<(f: CidrFacts) => string>(
    f => `/${f.bits}의 주소는 ${COUNT.ko(f.addresses, f.hostBits)}개, 쓸 수 있는 주소는 ${COUNT.ko(f.usable, f.hostBits)}개입니다.${f.mask ? ` 마스크 ${f.mask}, 와일드카드 ${f.wildcard}.` : ` 호스트 자리는 ${f.hostBits}비트입니다.`}`,
    f => `A /${f.bits} holds ${COUNT.en(f.addresses, f.hostBits)} addresses, of which ${COUNT.en(f.usable, f.hostBits)} are usable.${f.mask ? ` Mask ${f.mask}, wildcard ${f.wildcard}.` : ` That leaves ${f.hostBits} host bits.`}`,
    f => `Un /${f.bits} tiene ${COUNT.es(f.addresses, f.hostBits)} direcciones, de las que ${COUNT.es(f.usable, f.hostBits)} son utilizables.${f.mask ? ` Máscara ${f.mask}, comodín ${f.wildcard}.` : ` Quedan ${f.hostBits} bits de host.`}`,
    f => `Um /${f.bits} tem ${COUNT.pt(f.addresses, f.hostBits)} endereços, dos quais ${COUNT.pt(f.usable, f.hostBits)} são utilizáveis.${f.mask ? ` Máscara ${f.mask}, curinga ${f.wildcard}.` : ` Sobram ${f.hostBits} bits de host.`}`,
    f => `/${f.bits}のアドレスは${COUNT.ja(f.addresses, f.hostBits)}個、使えるのは${COUNT.ja(f.usable, f.hostBits)}個です。${f.mask ? `マスク ${f.mask}、ワイルドカード ${f.wildcard}。` : `ホストのビットは${f.hostBits}ビットです。`}`,
    f => `Ein /${f.bits} fasst ${COUNT.de(f.addresses, f.hostBits)} Adressen, davon ${COUNT.de(f.usable, f.hostBits)} nutzbar.${f.mask ? ` Maske ${f.mask}, Wildcard ${f.wildcard}.` : ` Es bleiben ${f.hostBits} Host-Bits.`}`,
    f => `Un /${f.bits} contient ${COUNT.fr(f.addresses, f.hostBits)} adresses, dont ${COUNT.fr(f.usable, f.hostBits)} utilisables.${f.mask ? ` Masque ${f.mask}, générique ${f.wildcard}.` : ` Il reste ${f.hostBits} bits d’hôte.`}`,
    f => `/${f.bits} में ${COUNT.hi(f.addresses, f.hostBits)} पते हैं, जिनमें ${COUNT.hi(f.usable, f.hostBits)} उपयोग योग्य हैं।${f.mask ? ` मास्क ${f.mask}, वाइल्डकार्ड ${f.wildcard}।` : ` होस्ट के ${f.hostBits} बिट बचते हैं।`}`,
    f => `/${f.bits} 有 ${COUNT.zh(f.addresses, f.hostBits)} 个地址，其中 ${COUNT.zh(f.usable, f.hostBits)} 个可用。${f.mask ? `掩码 ${f.mask}，通配符 ${f.wildcard}。` : `主机部分有 ${f.hostBits} 位。`}`,
    f => `/${f.bits} 有 ${COUNT.tw(f.addresses, f.hostBits)} 個位址，其中 ${COUNT.tw(f.usable, f.hostBits)} 個可用。${f.mask ? `遮罩 ${f.mask}，萬用遮罩 ${f.wildcard}。` : `主機部分有 ${f.hostBits} 位。`}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '255.255.255.0은 몇 비트인가요?', a: '/24입니다. 마스크의 1을 세면 24개입니다.' },
      { q: '/24에는 주소가 몇 개인가요?', a: '256개이고, 그중 쓸 수 있는 것은 254개입니다. 망 주소와 브로드캐스트를 빼기 때문입니다.' },
      { q: '/31을 왜 쓰나요?', a: '라우터 둘을 잇는 자리입니다. 그 자리에는 브로드캐스트가 필요 없어 두 주소를 다 씁니다(RFC 3021).' },
      { q: 'IPv6에서 /64가 왜 기본인가요?', a: '주소 뒷부분 64비트를 기기가 스스로 만들도록 정해 두었기 때문입니다. 한 망을 /64보다 잘게 쪼개면 그 기능이 어긋납니다.' },
      { q: '와일드카드 마스크는 무엇인가요?', a: '마스크를 뒤집은 값입니다. 라우터 설정에서 "이 자리는 아무 값이어도 된다"를 적을 때 씁니다.' },
    ],
    [
      { q: 'How many bits is 255.255.255.0?', a: 'A /24 — count the ones in the mask and you get 24.' },
      { q: 'How many addresses in a /24?', a: '256, of which 254 are usable: the network and broadcast addresses are taken out.' },
      { q: 'Why would anyone use a /31?', a: 'To link two routers. Such a link needs no broadcast address, so both addresses are used (RFC 3021).' },
      { q: 'Why is /64 the default in IPv6?', a: 'Because the lower 64 bits are meant to be formed by the device itself. Splitting a network smaller than /64 breaks that.' },
      { q: 'What is a wildcard mask?', a: 'The mask inverted. Router configurations use it to say "any value is fine in these positions".' },
    ],
    [
      { q: '¿Cuántos bits son 255.255.255.0?', a: 'Un /24: cuenta los unos de la máscara y salen 24.' },
      { q: '¿Cuántas direcciones tiene un /24?', a: '256, de las que 254 son utilizables: se apartan la de red y la de difusión.' },
      { q: '¿Para qué sirve un /31?', a: 'Para unir dos routers. Ese enlace no necesita dirección de difusión, así que se usan las dos (RFC 3021).' },
      { q: '¿Por qué /64 es lo normal en IPv6?', a: 'Porque los 64 bits bajos están pensados para que el propio equipo los forme. Partir una red por debajo de /64 rompe eso.' },
      { q: '¿Qué es la máscara comodín?', a: 'La máscara invertida. Se usa en la configuración de routers para decir "en estas posiciones vale cualquier valor".' },
    ],
    [
      { q: 'Quantos bits são 255.255.255.0?', a: 'Um /24: conte os uns da máscara e dá 24.' },
      { q: 'Quantos endereços tem um /24?', a: '256, dos quais 254 utilizáveis: tiram-se o de rede e o de broadcast.' },
      { q: 'Para que serve um /31?', a: 'Para ligar dois roteadores. Esse enlace não precisa de broadcast, então os dois endereços são usados (RFC 3021).' },
      { q: 'Por que /64 é o padrão no IPv6?', a: 'Porque os 64 bits de baixo devem ser formados pelo próprio equipamento. Partir uma rede abaixo de /64 quebra isso.' },
      { q: 'O que é a máscara curinga?', a: 'A máscara invertida. A configuração de roteadores usa isso para dizer "aqui qualquer valor serve".' },
    ],
    [
      { q: '255.255.255.0は何ビットですか？', a: '/24です。マスクの1を数えると24個あります。' },
      { q: '/24にはアドレスが何個ありますか？', a: '256個で、そのうち使えるのは254個です。網アドレスとブロードキャストを引くからです。' },
      { q: '/31は何のために使いますか？', a: 'ルータ二台をつなぐためです。その区間にはブロードキャストが要らないので二つとも使います(RFC 3021)。' },
      { q: 'IPv6でなぜ/64が既定なのですか？', a: '下位64ビットを機器が自分で作る決まりだからです。/64より細かく割ると、その仕組みが壊れます。' },
      { q: 'ワイルドカードマスクとは？', a: 'マスクを反転した値です。ルータの設定で「ここは何でもよい」と書くときに使います。' },
    ],
    [
      { q: 'Wie viele Bits sind 255.255.255.0?', a: 'Ein /24 — zählt man die Einsen der Maske, sind es 24.' },
      { q: 'Wie viele Adressen hat ein /24?', a: '256, davon 254 nutzbar: Netz- und Broadcast-Adresse fallen weg.' },
      { q: 'Wozu ein /31?', a: 'Um zwei Router zu verbinden. Diese Strecke braucht kein Broadcast, also werden beide Adressen genutzt (RFC 3021).' },
      { q: 'Warum ist /64 der Standard in IPv6?', a: 'Weil die unteren 64 Bit vom Gerät selbst gebildet werden sollen. Ein Netz kleiner als /64 zerstört das.' },
      { q: 'Was ist eine Wildcard-Maske?', a: 'Die umgedrehte Maske. In Router-Konfigurationen sagt sie: „an diesen Stellen ist jeder Wert recht.“' },
    ],
    [
      { q: 'Combien de bits font 255.255.255.0 ?', a: 'Un /24 : comptez les uns du masque, il y en a 24.' },
      { q: 'Combien d’adresses dans un /24 ?', a: '256, dont 254 utilisables : on retire l’adresse réseau et celle de diffusion.' },
      { q: 'À quoi sert un /31 ?', a: 'À relier deux routeurs. Ce lien n’a pas besoin d’adresse de diffusion : les deux adresses servent (RFC 3021).' },
      { q: 'Pourquoi /64 par défaut en IPv6 ?', a: 'Parce que les 64 bits bas doivent être formés par la machine elle-même. Découper plus fin qu’un /64 casse ce mécanisme.' },
      { q: 'Qu’est-ce qu’un masque générique ?', a: 'Le masque inversé. Les configurations de routeurs s’en servent pour dire « ici, n’importe quelle valeur convient ».' },
    ],
    [
      { q: '255.255.255.0 कितने बिट है?', a: '/24। मास्क में 1 गिनिए तो 24 मिलते हैं।' },
      { q: '/24 में कितने पते होते हैं?', a: '256, जिनमें 254 उपयोग योग्य हैं — नेटवर्क और ब्रॉडकास्ट पते निकाल दिए जाते हैं।' },
      { q: '/31 का उपयोग क्यों?', a: 'दो राउटर जोड़ने के लिए। वहाँ ब्रॉडकास्ट की ज़रूरत नहीं, इसलिए दोनों पते काम आते हैं (RFC 3021)।' },
      { q: 'IPv6 में /64 ही क्यों?', a: 'क्योंकि निचले 64 बिट उपकरण स्वयं बनाता है। /64 से छोटा बाँटने पर वह व्यवस्था टूट जाती है।' },
      { q: 'वाइल्डकार्ड मास्क क्या है?', a: 'मास्क का उल्टा। राउटर सेटिंग में "यहाँ कोई भी मान चलेगा" कहने के लिए।' },
    ],
    [
      { q: '255.255.255.0 是多少位？', a: '是 /24。数一下掩码里的 1，正好 24 个。' },
      { q: '/24 里有多少地址？', a: '256 个，可用的是 254 个——要去掉网络地址和广播地址。' },
      { q: '为什么会用 /31？', a: '用来连接两台路由器。这种链路不需要广播地址，所以两个地址都能用（RFC 3021）。' },
      { q: 'IPv6 为什么默认 /64？', a: '因为低 64 位是留给设备自己生成的。把网段切得比 /64 还小，这套机制就坏了。' },
      { q: '通配符掩码是什么？', a: '就是掩码取反。路由器配置里用它表示“这些位上什么值都行”。' },
    ],
    [
      { q: '255.255.255.0 是多少位？', a: '是 /24。數一下遮罩裡的 1，正好 24 個。' },
      { q: '/24 裡有多少位址？', a: '256 個，可用的是 254 個——要去掉網路位址和廣播位址。' },
      { q: '為什麼會用 /31？', a: '用來連接兩台路由器。這種連線不需要廣播位址，所以兩個位址都能用（RFC 3021）。' },
      { q: 'IPv6 為什麼預設 /64？', a: '因為低 64 位是留給裝置自己產生的。把網段切得比 /64 還小，這套機制就壞了。' },
      { q: '萬用遮罩是什麼？', a: '就是遮罩取反。路由器設定裡用它表示「這些位上什麼值都行」。' },
    ],
  ),

  prefixFaq: T<(f: CidrFacts) => FaqItem[]>(
    f => [
      { q: `/${f.bits}에는 주소가 몇 개인가요?`, a: `${COUNT.ko(f.addresses, f.hostBits)}개입니다. 그중 실제로 쓸 수 있는 것은 ${COUNT.ko(f.usable, f.hostBits)}개입니다.` },
      { q: f.family === 'v4' ? `/${f.bits}의 서브넷 마스크는 무엇인가요?` : `/${f.bits}는 어떻게 적나요?`, a: f.family === 'v4' ? `${f.mask}입니다. 와일드카드는 ${f.wildcard}입니다.` : `IPv6에서는 마스크를 적지 않고 /${f.bits}만 씁니다.` },
      { q: `/${f.bits} 안에 ${f.family === 'v4' ? '/24' : '/64'}가 몇 개 드나요?`, a: f.subnets > BigInt(0) ? `${COUNT.ko(f.subnets, f.hostBits)}개입니다.` : `${f.family === 'v4' ? '/24' : '/64'}보다 좁아서 들어가지 않습니다.` },
      { q: `호스트 자리는 몇 비트인가요?`, a: `${f.hostBits}비트입니다. 한 비트가 늘 때마다 주소는 반이 됩니다.` },
    ],
    f => [
      { q: `How many addresses are in a /${f.bits}?`, a: `${COUNT.en(f.addresses, f.hostBits)}, of which ${COUNT.en(f.usable, f.hostBits)} can actually be handed out.` },
      { q: f.family === 'v4' ? `What is the subnet mask for /${f.bits}?` : `How is a /${f.bits} written?`, a: f.family === 'v4' ? `${f.mask}, with wildcard ${f.wildcard}.` : `IPv6 uses no mask — you simply write /${f.bits}.` },
      { q: `How many ${f.family === 'v4' ? '/24' : '/64'} networks fit in a /${f.bits}?`, a: f.subnets > BigInt(0) ? `${COUNT.en(f.subnets, f.hostBits)}.` : `None — it is narrower than a ${f.family === 'v4' ? '/24' : '/64'}.` },
      { q: `How many host bits are there?`, a: `${f.hostBits}. Each extra network bit halves the addresses.` },
    ],
    f => [
      { q: `¿Cuántas direcciones hay en un /${f.bits}?`, a: `${COUNT.es(f.addresses, f.hostBits)}, de las que ${COUNT.es(f.usable, f.hostBits)} se pueden repartir.` },
      { q: f.family === 'v4' ? `¿Cuál es la máscara de /${f.bits}?` : `¿Cómo se escribe un /${f.bits}?`, a: f.family === 'v4' ? `${f.mask}, con comodín ${f.wildcard}.` : `IPv6 no usa máscara: se escribe simplemente /${f.bits}.` },
      { q: `¿Cuántas redes ${f.family === 'v4' ? '/24' : '/64'} caben en un /${f.bits}?`, a: f.subnets > BigInt(0) ? `${COUNT.es(f.subnets, f.hostBits)}.` : `Ninguna: es más estrecho que un ${f.family === 'v4' ? '/24' : '/64'}.` },
      { q: `¿Cuántos bits de host quedan?`, a: `${f.hostBits}. Cada bit de red de más reduce las direcciones a la mitad.` },
    ],
    f => [
      { q: `Quantos endereços há num /${f.bits}?`, a: `${COUNT.pt(f.addresses, f.hostBits)}, dos quais ${COUNT.pt(f.usable, f.hostBits)} podem ser distribuídos.` },
      { q: f.family === 'v4' ? `Qual é a máscara de /${f.bits}?` : `Como se escreve um /${f.bits}?`, a: f.family === 'v4' ? `${f.mask}, com curinga ${f.wildcard}.` : `O IPv6 não usa máscara: escreve-se apenas /${f.bits}.` },
      { q: `Quantas redes ${f.family === 'v4' ? '/24' : '/64'} cabem num /${f.bits}?`, a: f.subnets > BigInt(0) ? `${COUNT.pt(f.subnets, f.hostBits)}.` : `Nenhuma: é mais estreito que um ${f.family === 'v4' ? '/24' : '/64'}.` },
      { q: `Quantos bits de host sobram?`, a: `${f.hostBits}. Cada bit de rede a mais corta os endereços pela metade.` },
    ],
    f => [
      { q: `/${f.bits}にはアドレスが何個ありますか？`, a: `${COUNT.ja(f.addresses, f.hostBits)}個で、実際に配れるのは${COUNT.ja(f.usable, f.hostBits)}個です。` },
      { q: f.family === 'v4' ? `/${f.bits}のサブネットマスクは？` : `/${f.bits}はどう書きますか？`, a: f.family === 'v4' ? `${f.mask}です。ワイルドカードは${f.wildcard}です。` : `IPv6ではマスクを書かず、/${f.bits}とだけ書きます。` },
      { q: `/${f.bits}の中に${f.family === 'v4' ? '/24' : '/64'}はいくつ入りますか？`, a: f.subnets > BigInt(0) ? `${COUNT.ja(f.subnets, f.hostBits)}個です。` : `${f.family === 'v4' ? '/24' : '/64'}より狭いので入りません。` },
      { q: `ホストのビットは何ビットですか？`, a: `${f.hostBits}ビットです。網のビットが一つ増えるたびにアドレスは半分になります。` },
    ],
    f => [
      { q: `Wie viele Adressen hat ein /${f.bits}?`, a: `${COUNT.de(f.addresses, f.hostBits)}, davon ${COUNT.de(f.usable, f.hostBits)} tatsächlich vergebbar.` },
      { q: f.family === 'v4' ? `Welche Maske hat /${f.bits}?` : `Wie schreibt man ein /${f.bits}?`, a: f.family === 'v4' ? `${f.mask}, Wildcard ${f.wildcard}.` : `IPv6 kennt keine Maske — man schreibt einfach /${f.bits}.` },
      { q: `Wie viele ${f.family === 'v4' ? '/24' : '/64'} passen in ein /${f.bits}?`, a: f.subnets > BigInt(0) ? `${COUNT.de(f.subnets, f.hostBits)}.` : `Keines — es ist schmaler als ein ${f.family === 'v4' ? '/24' : '/64'}.` },
      { q: `Wie viele Host-Bits bleiben?`, a: `${f.hostBits}. Jedes zusätzliche Netz-Bit halbiert die Adressen.` },
    ],
    f => [
      { q: `Combien d’adresses dans un /${f.bits} ?`, a: `${COUNT.fr(f.addresses, f.hostBits)}, dont ${COUNT.fr(f.usable, f.hostBits)} réellement attribuables.` },
      { q: f.family === 'v4' ? `Quel masque pour /${f.bits} ?` : `Comment écrit-on un /${f.bits} ?`, a: f.family === 'v4' ? `${f.mask}, avec le générique ${f.wildcard}.` : `IPv6 n’utilise pas de masque : on écrit simplement /${f.bits}.` },
      { q: `Combien de ${f.family === 'v4' ? '/24' : '/64'} tiennent dans un /${f.bits} ?`, a: f.subnets > BigInt(0) ? `${COUNT.fr(f.subnets, f.hostBits)}.` : `Aucun : il est plus étroit qu’un ${f.family === 'v4' ? '/24' : '/64'}.` },
      { q: `Combien de bits d’hôte restent ?`, a: `${f.hostBits}. Chaque bit de réseau supplémentaire divise les adresses par deux.` },
    ],
    f => [
      { q: `/${f.bits} में कितने पते हैं?`, a: `${COUNT.hi(f.addresses, f.hostBits)}, जिनमें ${COUNT.hi(f.usable, f.hostBits)} वास्तव में बाँटे जा सकते हैं।` },
      { q: f.family === 'v4' ? `/${f.bits} का सबनेट मास्क क्या है?` : `/${f.bits} कैसे लिखा जाता है?`, a: f.family === 'v4' ? `${f.mask}, वाइल्डकार्ड ${f.wildcard}।` : `IPv6 में मास्क नहीं लिखा जाता — केवल /${f.bits}।` },
      { q: `/${f.bits} में कितने ${f.family === 'v4' ? '/24' : '/64'} समाते हैं?`, a: f.subnets > BigInt(0) ? `${COUNT.hi(f.subnets, f.hostBits)}।` : `कोई नहीं — यह ${f.family === 'v4' ? '/24' : '/64'} से छोटा है।` },
      { q: `होस्ट के कितने बिट बचते हैं?`, a: `${f.hostBits}। हर अतिरिक्त नेटवर्क बिट पते आधे कर देता है।` },
    ],
    f => [
      { q: `/${f.bits} 有多少个地址？`, a: `${COUNT.zh(f.addresses, f.hostBits)} 个，其中 ${COUNT.zh(f.usable, f.hostBits)} 个能真正分出去。` },
      { q: f.family === 'v4' ? `/${f.bits} 的子网掩码是什么？` : `/${f.bits} 怎么写？`, a: f.family === 'v4' ? `是 ${f.mask}，通配符掩码是 ${f.wildcard}。` : `IPv6 不写掩码，直接写 /${f.bits}。` },
      { q: `/${f.bits} 里能装下多少个 ${f.family === 'v4' ? '/24' : '/64'}？`, a: f.subnets > BigInt(0) ? `${COUNT.zh(f.subnets, f.hostBits)} 个。` : `装不下——它比 ${f.family === 'v4' ? '/24' : '/64'} 还窄。` },
      { q: `主机部分有多少位？`, a: `${f.hostBits} 位。网络部分每多一位，地址数就减半。` },
    ],
    f => [
      { q: `/${f.bits} 有多少個位址？`, a: `${COUNT.tw(f.addresses, f.hostBits)} 個，其中 ${COUNT.tw(f.usable, f.hostBits)} 個能真正分出去。` },
      { q: f.family === 'v4' ? `/${f.bits} 的子網路遮罩是什麼？` : `/${f.bits} 怎麼寫？`, a: f.family === 'v4' ? `是 ${f.mask}，萬用遮罩是 ${f.wildcard}。` : `IPv6 不寫遮罩，直接寫 /${f.bits}。` },
      { q: `/${f.bits} 裡能裝下多少個 ${f.family === 'v4' ? '/24' : '/64'}？`, a: f.subnets > BigInt(0) ? `${COUNT.tw(f.subnets, f.hostBits)} 個。` : `裝不下——它比 ${f.family === 'v4' ? '/24' : '/64'} 還窄。` },
      { q: `主機部分有多少位？`, a: `${f.hostBits} 位。網路部分每多一位，位址數就減半。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const CIDR_UI: L<CidrUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<CidrUI>;
