/**
 * 이모지 화면의 문구 — 열 언어.
 *
 * 이모지마다 다른 설명은 desc.ts에 있고, 여기에는 화면 틀과 갈래 이름만 둔다.
 * 공식 이름(unicodeName)과 코드포인트는 유니코드가 정한 것이라 옮기지 않는다 —
 * 번역한 U+1F64F는 어디서도 찾을 수 없는 글자가 된다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { EmojiGroup } from './types.ts';
import type { EmojiFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface EmojiUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  hubNotice: string;
  groupLabel: Record<EmojiGroup, string>;
  groupNote: Record<EmojiGroup, string>;
  meaningTitle: string;
  officialLabel: string;
  commonLabel: string;
  codeLabel: string;
  cpLabel: string;
  cpNote: (n: number) => string;
  vs16Note: string;
  zwjNote: string;
  nameGapTitle: string;
  nameGapNote: string;
  relatedTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  copyLabel: string;
  copiedLabel: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (char: string, common: string) => string;
  metaDesc: (char: string, desc: string) => string;
  hubFaq: FaqItem[];
  itemFaq: (f: EmojiFacts, desc: string, group: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof EmojiUI]: L<EmojiUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T(
    '이모지 뜻', 'Emoji meanings', 'Significado de emojis', 'Significado dos emojis',
    '絵文字の意味', 'Emoji-Bedeutungen', 'Signification des emojis',
    'इमोजी का अर्थ', '表情符号含义', '表情符號含義',
  ),

  hubTitle: T(
    '이모지 뜻 사전',
    'What emojis actually mean',
    'Qué significan de verdad los emojis',
    'O que os emojis realmente querem dizer',
    '絵文字の意味事典',
    'Was Emojis wirklich bedeuten',
    'Ce que veulent vraiment dire les emojis',
    'इमोजी का असली मतलब',
    '表情符号到底是什么意思',
    '表情符號到底是什麼意思',
  ),

  hubLead: T(
    '{n}개의 이모지를 공식 이름이 아니라 사람들이 실제로 보내는 뜻으로 정리했습니다.',
    '{n} emojis, described by what people actually send them to mean — not by the official Unicode name.',
    '{n} emojis, explicados por lo que la gente quiere decir al enviarlos, no por su nombre oficial.',
    '{n} emojis, explicados pelo que as pessoas querem dizer ao enviá-los, não pelo nome oficial.',
    '{n}件の絵文字を、公式名ではなく人が実際に送っている意味でまとめました。',
    '{n} Emojis — beschrieben nach dem, was Leute damit sagen, nicht nach dem Unicode-Namen.',
    '{n} emojis, décrits par ce que les gens veulent dire en les envoyant, pas par leur nom officiel.',
    '{n} इमोजी — आधिकारिक नाम से नहीं, बल्कि लोग जो मतलब लेकर भेजते हैं उससे समझाए गए।',
    '{n} 个表情符号，按人们发它时真正的意思来讲，而不是按官方名称。',
    '{n} 個表情符號，按人們發它時真正的意思來講，而不是按官方名稱。',
  ),

  hubNotice: T(
    '같은 이모지가 나라마다 다르게 읽힙니다. 🙏는 대체로 고맙다·부탁한다이지만 일본에서는 사과이기도 하고, 👍는 서구에서 좋다는 뜻이지만 중동 일부에서는 무례합니다. 뜻이 갈리는 자리는 어느 쪽 이야기인지 적어 두었습니다.',
    'The same emoji is read differently from place to place. 🙏 usually means thanks or please, but in Japan it also means sorry; 👍 is approval in the West and rude in parts of the Middle East. Where readings split, each entry says whose reading it is.',
    'El mismo emoji se lee distinto según el lugar. 🙏 suele ser gracias o por favor, pero en Japón también es perdón; 👍 es aprobación en Occidente y grosero en partes de Oriente Medio. Donde las lecturas se separan, cada ficha dice de quién es cada una.',
    'O mesmo emoji é lido de formas diferentes em cada lugar. 🙏 costuma ser obrigado ou por favor, mas no Japão também é desculpa; 👍 é aprovação no Ocidente e grosseiro em partes do Oriente Médio. Onde as leituras divergem, cada ficha diz de quem é cada uma.',
    '同じ絵文字が地域で違って読まれます。🙏 はたいてい感謝やお願いですが、日本では謝罪にもなり、👍 は欧米では了解ですが中東の一部では失礼です。読みが分かれるところは、どこの読みかを書いてあります。',
    'Dasselbe Emoji wird je nach Ort anders gelesen. 🙏 heißt meist danke oder bitte, in Japan aber auch Entschuldigung; 👍 ist im Westen Zustimmung und in Teilen des Nahen Ostens unhöflich. Wo die Lesarten auseinandergehen, nennt der Eintrag, wessen Lesart gemeint ist.',
    'Le même emoji se lit différemment selon les endroits. 🙏 veut dire merci ou s’il te plaît, mais au Japon aussi pardon ; 👍 est une approbation en Occident et une grossièreté dans une partie du Moyen-Orient. Là où les lectures diffèrent, la fiche précise de qui elle est.',
    'वही इमोजी जगह-जगह अलग पढ़ा जाता है। 🙏 आम तौर पर धन्यवाद या विनती है, पर जापान में माफ़ी भी; 👍 पश्चिम में सहमति है और मध्य पूर्व के कुछ हिस्सों में अशिष्ट। जहाँ पाठ बदलता है, वहाँ लिखा है कि वह किसका पाठ है।',
    '同一个表情符号在不同地方读法不同。🙏 大多是谢谢或拜托，在日本也用来道歉；👍 在西方是认可，在中东部分地区却很无礼。读法分歧的地方，条目里写了那是谁的读法。',
    '同一個表情符號在不同地方讀法不同。🙏 大多是謝謝或拜託，在日本也用來道歉；👍 在西方是認可，在中東部分地區卻很無禮。讀法分歧的地方，條目裡寫了那是誰的讀法。',
  ),

  groupLabel: T(
    { face: '얼굴', hand: '손·몸짓', symbol: '기호', people: '사람', nature: '자연·동물', food: '음식', object: '물건' },
    { face: 'Faces', hand: 'Hands and gestures', symbol: 'Symbols', people: 'People', nature: 'Nature and animals', food: 'Food', object: 'Objects' },
    { face: 'Caras', hand: 'Manos y gestos', symbol: 'Símbolos', people: 'Personas', nature: 'Naturaleza y animales', food: 'Comida', object: 'Objetos' },
    { face: 'Rostos', hand: 'Mãos e gestos', symbol: 'Símbolos', people: 'Pessoas', nature: 'Natureza e animais', food: 'Comida', object: 'Objetos' },
    { face: '顔', hand: '手とジェスチャー', symbol: '記号', people: '人', nature: '自然と動物', food: '食べもの', object: 'もの' },
    { face: 'Gesichter', hand: 'Hände und Gesten', symbol: 'Symbole', people: 'Menschen', nature: 'Natur und Tiere', food: 'Essen', object: 'Gegenstände' },
    { face: 'Visages', hand: 'Mains et gestes', symbol: 'Symboles', people: 'Personnes', nature: 'Nature et animaux', food: 'Nourriture', object: 'Objets' },
    { face: 'चेहरे', hand: 'हाथ और इशारे', symbol: 'चिह्न', people: 'लोग', nature: 'प्रकृति और जानवर', food: 'खाना', object: 'चीज़ें' },
    { face: '表情', hand: '手势', symbol: '符号', people: '人物', nature: '自然与动物', food: '食物', object: '物品' },
    { face: '表情', hand: '手勢', symbol: '符號', people: '人物', nature: '自然與動物', food: '食物', object: '物品' },
  ),

  groupNote: T(
    {
      face: '가장 많이 잘못 읽히는 갈래입니다. 😭는 슬픔보다 기쁨으로, 💀는 죽음보다 웃음으로 더 자주 보냅니다.',
      hand: '손짓은 나라마다 뜻이 갈립니다. 같은 그림이 어디서는 칭찬이고 어디서는 욕이 되는 자리를 적어 두었습니다.',
      symbol: '기호는 원래 뜻이 따로 있는 것이 많습니다. 💯은 백 점이 아니라 완전 동의이고, 🈵과 🈳은 만석과 빈자리로 정반대입니다.',
      people: '직업과 역할 이모지는 대개 ZWJ로 이어 붙인 글자라, 자판에 없는 기기에서는 사람 하나와 도구 하나로 갈라져 보입니다.',
      nature: '동물은 뜻이 문화마다 다릅니다. 🐷는 어디서는 귀엽고 어디서는 모욕이며, 🦊는 영리함과 능글맞음 사이입니다.',
      food: '음식 이모지는 그 나라 음식이 그림에 담기며 뜻이 좁아집니다. 🍙는 삼각김밥이고 🍘는 전병으로, 밥과 과자만큼 다릅니다.',
      object: '물건은 대개 은유로 쓰입니다. 🚩는 깃발이 아니라 경고 신호이고, 🔒은 자물쇠가 아니라 비공개라는 뜻으로 갑니다.',
    },
    {
      face: 'The most misread group. 😭 is sent for joy more often than for sorrow, and 💀 for laughter more often than for death.',
      hand: 'Gestures split by country: the same picture is praise in one place and an insult in another. Each entry says where.',
      symbol: 'Symbols usually carry an older meaning. 💯 is not the number one hundred but total agreement, and 🈵 and 🈳 are opposites — full and vacant.',
      people: 'Role emojis are mostly ZWJ sequences, so on a device without them you see a person and a tool sitting side by side instead.',
      nature: 'Animals carry different meanings by culture. 🐷 is cute in one place and an insult in another; 🦊 sits between clever and sly.',
      food: 'Food emojis narrow to the cuisine that drew them: 🍙 is a rice ball and 🍘 a rice cracker — as different as a meal and a snack.',
      object: 'Objects are mostly used as metaphors. 🚩 is not a flag but a warning sign, and 🔒 means private rather than a padlock.',
    },
    {
      face: 'El grupo peor leído. 😭 se envía más por alegría que por tristeza, y 💀 más por risa que por muerte.',
      hand: 'Los gestos cambian según el país: la misma imagen es un elogio en un sitio y un insulto en otro. Cada ficha dice dónde.',
      symbol: 'Los símbolos suelen arrastrar un significado anterior. 💯 no es el número cien sino acuerdo total, y 🈵 y 🈳 son opuestos: completo y libre.',
      people: 'Los emojis de oficio son en su mayoría secuencias ZWJ, así que en un dispositivo que no las tiene aparecen una persona y una herramienta por separado.',
      nature: 'Los animales significan cosas distintas según la cultura. 🐷 es tierno en un sitio e insultante en otro; 🦊 va de listo a astuto.',
      food: 'Los emojis de comida se estrechan a la cocina que los dibujó: 🍙 es una bola de arroz y 🍘 una galleta de arroz, tan distintas como una comida y un aperitivo.',
      object: 'Los objetos se usan casi siempre como metáfora. 🚩 no es una bandera sino una señal de alarma, y 🔒 significa privado más que candado.',
    },
    {
      face: 'O grupo mais mal lido. 😭 é enviado mais por alegria que por tristeza, e 💀 mais por riso que por morte.',
      hand: 'Os gestos mudam de país para país: a mesma figura é elogio em um lugar e insulto em outro. Cada ficha diz onde.',
      symbol: 'Os símbolos costumam carregar um sentido mais antigo. 💯 não é o número cem, e sim concordância total; 🈵 e 🈳 são opostos — lotado e vago.',
      people: 'Emojis de profissão são em geral sequências ZWJ, então num aparelho sem elas aparecem uma pessoa e uma ferramenta separadas.',
      nature: 'Animais significam coisas diferentes conforme a cultura. 🐷 é fofo em um lugar e ofensivo em outro; 🦊 fica entre esperto e ardiloso.',
      food: 'Emojis de comida se estreitam à cozinha que os desenhou: 🍙 é bolinho de arroz e 🍘 biscoito de arroz — tão diferentes como refeição e petisco.',
      object: 'Objetos são usados quase sempre como metáfora. 🚩 não é uma bandeira, é um sinal de alerta; e 🔒 quer dizer privado, não cadeado.',
    },
    {
      face: '最も読み違えられる仲間です。😭 は悲しみより喜びで、💀 は死よりも笑いで送られます。',
      hand: '手のしぐさは国で意味が分かれます。同じ絵がある所ではほめ言葉、別の所では侮辱になる場所を書いてあります。',
      symbol: '記号には元の意味があります。💯 は百点ではなく全面的な同意で、🈵 と 🈳 は満席と空きで正反対です。',
      people: '職業の絵文字はたいてい ZWJ でつないだ字なので、対応していない端末では人と道具が別々に見えます。',
      nature: '動物は文化で意味が変わります。🐷 はある所ではかわいく、別の所では侮辱で、🦊 は賢さとずるさの間にあります。',
      food: '食べものの絵文字は描いた国の料理に寄ります。🍙 はおにぎり、🍘 はせんべいで、食事と菓子ほど違います。',
      object: 'ものはたいてい喩えとして使われます。🚩 は旗ではなく警告の合図で、🔒 は錠ではなく非公開の意味になります。',
    },
    {
      face: 'Die am häufigsten falsch gelesene Gruppe. 😭 wird öfter aus Freude als aus Trauer gesendet, 💀 öfter für Lachen als für Tod.',
      hand: 'Gesten unterscheiden sich nach Land: dasselbe Bild ist hier Lob und dort Beleidigung. Jeder Eintrag sagt, wo.',
      symbol: 'Symbole tragen meist eine ältere Bedeutung. 💯 ist nicht die Zahl hundert, sondern volle Zustimmung; 🈵 und 🈳 sind Gegensätze — belegt und frei.',
      people: 'Rollen-Emojis sind meist ZWJ-Folgen; auf Geräten ohne diese Folgen erscheinen Person und Werkzeug getrennt nebeneinander.',
      nature: 'Tiere bedeuten je nach Kultur Verschiedenes. 🐷 ist hier süß und dort eine Beleidigung; 🦊 liegt zwischen klug und listig.',
      food: 'Essens-Emojis engen sich auf die Küche ein, die sie gezeichnet hat: 🍙 ist ein Reisball, 🍘 ein Reiscracker — so verschieden wie Mahlzeit und Knabberei.',
      object: 'Gegenstände dienen fast immer als Metapher. 🚩 ist keine Fahne, sondern ein Warnsignal, und 🔒 heißt privat, nicht Vorhängeschloss.',
    },
    {
      face: 'Le groupe le plus mal lu. 😭 s’envoie plus souvent par joie que par tristesse, et 💀 plus pour le rire que pour la mort.',
      hand: 'Les gestes changent selon le pays : la même image est un compliment ici et une insulte ailleurs. Chaque fiche précise où.',
      symbol: 'Les symboles portent souvent un sens antérieur. 💯 n’est pas le nombre cent mais un accord total, et 🈵 et 🈳 sont opposés : complet et libre.',
      people: 'Les emojis de métier sont surtout des séquences ZWJ : sur un appareil qui ne les gère pas, on voit une personne et un outil séparés.',
      nature: 'Les animaux ne veulent pas dire la même chose partout. 🐷 est mignon ici et insultant ailleurs ; 🦊 oscille entre malin et rusé.',
      food: 'Les emojis de nourriture se rétrécissent à la cuisine qui les a dessinés : 🍙 est une boulette de riz et 🍘 un cracker de riz — un repas et un en-cas.',
      object: 'Les objets servent presque toujours de métaphore. 🚩 n’est pas un drapeau mais un signal d’alerte, et 🔒 veut dire privé plutôt que cadenas.',
    },
    {
      face: 'सबसे ज़्यादा ग़लत पढ़ा जाने वाला समूह। 😭 दुख से ज़्यादा ख़ुशी में भेजा जाता है, और 💀 मौत से ज़्यादा हँसी में।',
      hand: 'इशारे देश-देश में बदल जाते हैं: वही तस्वीर कहीं तारीफ़ है और कहीं गाली। हर पन्ने पर लिखा है कि कहाँ।',
      symbol: 'चिह्नों का अक्सर एक पुराना अर्थ होता है। 💯 सौ की संख्या नहीं, पूरी सहमति है; और 🈵 तथा 🈳 उलटे हैं — भरा और खाली।',
      people: 'पेशे वाले इमोजी ज़्यादातर ZWJ जोड़ हैं, इसलिए जिस डिवाइस में वे नहीं हैं वहाँ एक व्यक्ति और एक औज़ार अलग-अलग दिखते हैं।',
      nature: 'जानवरों का अर्थ संस्कृति से बदलता है। 🐷 कहीं प्यारा है और कहीं अपमान; 🦊 चतुर और चालाक के बीच है।',
      food: 'खाने के इमोजी उस रसोई तक सिमट जाते हैं जिसने उन्हें बनाया: 🍙 चावल का लड्डू है और 🍘 चावल का बिस्कुट — भोजन और नाश्ते जितना फ़र्क़।',
      object: 'चीज़ें लगभग हमेशा रूपक हैं। 🚩 झंडा नहीं, चेतावनी है; और 🔒 ताला नहीं, निजी होने का मतलब देता है।',
    },
    {
      face: '最容易被误读的一类。😭 用在高兴时比伤心时多，💀 用在笑到不行时比死亡多。',
      hand: '手势的含义因国家而异：同一张图在一处是称赞，在另一处是侮辱。每条都写了是哪里的读法。',
      symbol: '符号往往有更早的含义。💯 不是数字一百，而是完全同意；🈵 和 🈳 正好相反——满和空。',
      people: '职业类表情多是 ZWJ 连起来的字，在不支持的设备上会拆成一个人加一件工具。',
      nature: '动物的含义随文化变化。🐷 在一处可爱，在另一处是骂人；🦊 在聪明与狡猾之间。',
      food: '食物表情会收窄到画它的那国菜：🍙 是饭团，🍘 是米饼——一个是饭，一个是零食。',
      object: '物品几乎都当比喻用。🚩 不是旗子而是警示，🔒 表示不公开而不是一把锁。',
    },
    {
      face: '最容易被誤讀的一類。😭 用在高興時比傷心時多，💀 用在笑到不行時比死亡多。',
      hand: '手勢的含義因國家而異：同一張圖在一處是稱讚，在另一處是侮辱。每條都寫了是哪裡的讀法。',
      symbol: '符號往往有更早的含義。💯 不是數字一百，而是完全同意；🈵 和 🈳 正好相反——滿和空。',
      people: '職業類表情多是 ZWJ 連起來的字，在不支援的裝置上會拆成一個人加一件工具。',
      nature: '動物的含義隨文化變化。🐷 在一處可愛，在另一處是罵人；🦊 在聰明與狡猾之間。',
      food: '食物表情會收窄到畫它的那國菜：🍙 是飯糰，🍘 是米餅——一個是飯，一個是零食。',
      object: '物品幾乎都當比喻用。🚩 不是旗子而是警示，🔒 表示不公開而不是一把鎖。',
    },
  ),

  meaningTitle: T('보내는 뜻', 'What it means when sent', 'Qué significa al enviarlo', 'O que significa ao enviar', '送るときの意味', 'Was es beim Senden heißt', 'Ce que ça veut dire quand on l’envoie', 'भेजने पर क्या मतलब', '发出去是什么意思', '發出去是什麼意思'),

  officialLabel: T('공식 이름', 'Official name', 'Nombre oficial', 'Nome oficial', '公式名', 'Offizieller Name', 'Nom officiel', 'आधिकारिक नाम', '官方名称', '官方名稱'),

  commonLabel: T('사람들이 부르는 이름', 'What people call it', 'Cómo lo llama la gente', 'Como as pessoas chamam', '人が呼ぶ名', 'Wie man es nennt', 'Comment on l’appelle', 'लोग क्या कहते हैं', '人们怎么叫它', '人們怎麼叫它'),

  codeLabel: T('코드포인트', 'Code point', 'Punto de código', 'Ponto de código', 'コードポイント', 'Codepoint', 'Point de code', 'कोड पॉइंट', '码位', '碼位'),

  cpLabel: T('글자 수', 'Code points', 'Puntos de código', 'Pontos de código', '文字の数', 'Codepoints', 'Points de code', 'कोड पॉइंट', '码位数', '碼位數'),

  cpNote: T(
    (n: number) => n === 1
      ? '코드포인트 하나로 된 글자입니다. 백스페이스 한 번에 지워집니다.'
      : `코드포인트 ${n}개를 이어 붙인 글자입니다. 그래서 기기에 따라 백스페이스를 여러 번 눌러야 지워지고, 글자 수를 세는 프로그램이 ${n}자로 셀 수 있습니다.`,
    (n: number) => n === 1
      ? 'A single code point. One backspace deletes it.'
      : `${n} code points joined together. That is why some devices need several backspaces to delete it, and why a character counter may score it as ${n}.`,
    (n: number) => n === 1
      ? 'Un solo punto de código. Se borra con un retroceso.'
      : `${n} puntos de código unidos. Por eso en algunos dispositivos hacen falta varios retrocesos para borrarlo, y un contador de caracteres puede contarlo como ${n}.`,
    (n: number) => n === 1
      ? 'Um único ponto de código. Um backspace apaga.'
      : `${n} pontos de código unidos. Por isso alguns aparelhos precisam de vários backspaces para apagar, e um contador de caracteres pode contá-lo como ${n}.`,
    (n: number) => n === 1
      ? 'コードポイント一つの字です。バックスペース一回で消えます。'
      : `コードポイント${n}個をつないだ字です。端末によってはバックスペースを何度も押さないと消えず、文字数を数えるプログラムが${n}文字と数えることがあります。`,
    (n: number) => n === 1
      ? 'Ein einzelner Codepoint. Eine Rücktaste löscht ihn.'
      : `${n} verbundene Codepoints. Deshalb braucht es auf manchen Geräten mehrere Rücktasten, und ein Zeichenzähler kann ${n} zählen.`,
    (n: number) => n === 1
      ? 'Un seul point de code. Une touche retour l’efface.'
      : `${n} points de code assemblés. D’où plusieurs retours arrière sur certains appareils, et un compteur de caractères qui peut afficher ${n}.`,
    (n: number) => n === 1
      ? 'एक ही कोड पॉइंट। एक बैकस्पेस से मिट जाता है।'
      : `${n} कोड पॉइंट जुड़े हुए। इसीलिए कुछ डिवाइस पर मिटाने के लिए कई बार बैकस्पेस लगता है, और कैरेक्टर गिनने वाला प्रोग्राम इसे ${n} गिन सकता है।`,
    (n: number) => n === 1
      ? '只有一个码位，一次退格就能删掉。'
      : `由 ${n} 个码位连成。所以有些设备要按好几次退格才删得掉，字数统计也可能算成 ${n} 个字。`,
    (n: number) => n === 1
      ? '只有一個碼位，一次退格就能刪掉。'
      : `由 ${n} 個碼位連成。所以有些裝置要按好幾次退格才刪得掉，字數統計也可能算成 ${n} 個字。`,
  ),

  vs16Note: T(
    '뒤에 U+FE0F가 붙어야 컬러 그림으로 나옵니다. 이것이 빠지면 흑백 글자로 떨어지는데, 복사해 붙일 때 잘리는 일이 이 자리에서 생깁니다.',
    'It needs a trailing U+FE0F to render in colour. Without it the glyph falls back to black and white — that is what gets lost when the emoji is copied and pasted.',
    'Necesita un U+FE0F al final para verse en color. Sin él cae a un glifo en blanco y negro, y eso es justo lo que se pierde al copiar y pegar.',
    'Precisa de um U+FE0F no fim para aparecer em cor. Sem ele o glifo cai para preto e branco — é isso que se perde ao copiar e colar.',
    '後ろに U+FE0F が付いて初めて色の絵になります。抜けると白黒の字に落ち、コピーして貼るときに落ちるのがここです。',
    'Erst ein angehängtes U+FE0F lässt es farbig erscheinen. Fehlt es, fällt das Zeichen auf Schwarz-Weiß zurück — genau das geht beim Kopieren verloren.',
    'Il lui faut un U+FE0F final pour s’afficher en couleur. Sans lui, le glyphe retombe en noir et blanc — et c’est ce qui disparaît au copier-coller.',
    'रंगीन दिखने के लिए अंत में U+FE0F चाहिए। वह न हो तो अक्षर काले-सफ़ेद रूप में गिर जाता है — कॉपी-पेस्ट में यही हिस्सा छूटता है।',
    '末尾要带 U+FE0F 才显示为彩色图。少了它就退成黑白字形——复制粘贴时丢的正是这一段。',
    '末尾要帶 U+FE0F 才顯示為彩色圖。少了它就退成黑白字形——複製貼上時丟的正是這一段。',
  ),

  zwjNote: T(
    'ZWJ(U+200D)로 여러 글자를 이어 붙인 이모지입니다. 이 조합을 모르는 기기에서는 이어지지 않고 사람과 물건이 나란히 둘로 보입니다.',
    'This one is joined with ZWJ (U+200D). On a device that does not know the sequence it does not merge — you see the person and the object side by side instead.',
    'Este va unido con ZWJ (U+200D). En un dispositivo que no conoce la secuencia no se fusiona: ves la persona y el objeto uno al lado del otro.',
    'Este é unido com ZWJ (U+200D). Num aparelho que não conhece a sequência ele não se junta: você vê a pessoa e o objeto lado a lado.',
    'ZWJ（U+200D）で複数の字をつないだ絵文字です。この並びを知らない端末ではつながらず、人とものが二つ並んで見えます。',
    'Dieses ist mit ZWJ (U+200D) verbunden. Kennt ein Gerät die Folge nicht, verschmilzt sie nicht — man sieht Person und Gegenstand nebeneinander.',
    'Celui-ci est assemblé avec un ZWJ (U+200D). Sur un appareil qui ignore la séquence, il ne fusionne pas : on voit la personne et l’objet côte à côte.',
    'यह ZWJ (U+200D) से जोड़ा गया है। जो डिवाइस इस क्रम को नहीं जानता, वहाँ यह जुड़ता नहीं — व्यक्ति और वस्तु अलग-अलग दिखते हैं।',
    '这个是用 ZWJ（U+200D）连起来的。不认识这个序列的设备上它不会合成，你会看到一个人和一件物品并排。',
    '這個是用 ZWJ（U+200D）連起來的。不認識這個序列的裝置上它不會合成，你會看到一個人和一件物品並排。',
  ),

  nameGapTitle: T('공식 이름과 실제 뜻', 'Official name vs. real use', 'Nombre oficial y uso real', 'Nome oficial e uso real', '公式名と実際の意味', 'Offizieller Name und echte Verwendung', 'Nom officiel et usage réel', 'आधिकारिक नाम और असली इस्तेमाल', '官方名称与实际用法', '官方名稱與實際用法'),

  nameGapNote: T(
    '유니코드가 붙인 이름과 사람들이 쓰는 뜻이 다릅니다. 검색해서 이 페이지에 온 사람이 찾던 것은 대개 아래쪽입니다.',
    'The name Unicode gave it and the way people use it are not the same. If you searched your way here, the second one is usually what you were after.',
    'El nombre que le puso Unicode y el uso real no coinciden. Si llegaste buscando, lo segundo es casi siempre lo que querías.',
    'O nome que a Unicode deu e o uso real não coincidem. Se você chegou aqui por busca, o segundo é quase sempre o que procurava.',
    'ユニコードが付けた名と、人が使う意味が違います。検索で来た人が探しているのは、たいてい後者です。',
    'Der von Unicode vergebene Name und der tatsächliche Gebrauch stimmen nicht überein. Wer über die Suche hier landet, wollte meist das Zweite.',
    'Le nom donné par Unicode et l’usage réel ne coïncident pas. Si vous êtes arrivé ici par une recherche, c’est le second que vous cherchiez.',
    'यूनिकोड ने जो नाम दिया और लोग जिस मतलब में इस्तेमाल करते हैं, वे एक नहीं हैं। खोज से यहाँ आए हैं तो आपको दूसरा ही चाहिए था।',
    'Unicode 起的名字和人们的实际用法并不一致。你是搜过来的，那要找的多半是后者。',
    'Unicode 取的名字和人們的實際用法並不一致。你是搜過來的，那要找的多半是後者。',
  ),

  relatedTitle: T('비슷한 이모지', 'Emojis nearby', 'Emojis parecidos', 'Emojis parecidos', '近い絵文字', 'Ähnliche Emojis', 'Emojis voisins', 'मिलते-जुलते इमोजी', '相近的表情', '相近的表情'),

  howTitle: T('이모지를 쓸 때', 'Using emojis', 'Al usar emojis', 'Ao usar emojis', '絵文字を使うとき', 'Emojis verwenden', 'Utiliser les emojis', 'इमोजी इस्तेमाल करते समय', '使用表情符号时', '使用表情符號時'),

  how: T(
    [
      '이모지 글자를 눌러 복사한 뒤 어디에든 붙일 수 있습니다 — 그림이 아니라 글자라서 크기가 글꼴에 따라 달라집니다.',
      '보내는 사람과 받는 사람이 다른 기기를 쓰면 그림 모양이 다릅니다. 애플·구글·삼성이 각각 다르게 그리고, 그 차이가 뜻을 바꾸는 이모지도 있습니다(🙃·😅).',
      '업무 대화에서 이모지 하나가 문장을 대신하면 오해가 생깁니다. 👍만 보낸 답장이 무성의하게 읽히는 나라가 있습니다.',
      '검색 순위에 이모지를 넣는 것은 도움이 되지 않습니다. 제목의 이모지는 대개 검색 결과에서 지워집니다.',
      '피부색을 바꾸는 변이는 이 사전에 싣지 않았습니다. 기본형만 두고, 뜻이 달라지지 않기 때문입니다.',
    ],
    [
      'Tap the character to copy it and paste it anywhere — it is text, not an image, so its size follows the font around it.',
      'Sender and receiver on different devices see different drawings. Apple, Google and Samsung each draw their own, and for some emojis that changes the meaning (🙃, 😅).',
      'At work, an emoji standing in for a sentence invites misreading. In some countries a bare 👍 reads as a brush-off.',
      'Putting emojis in a page title does not help search ranking — they are usually stripped from the result.',
      'Skin-tone variants are not listed here. Only the base form is, because the meaning does not change with them.',
    ],
    [
      'Toca el carácter para copiarlo y pégalo donde quieras: es texto, no una imagen, así que su tamaño sigue a la tipografía de al lado.',
      'Quien envía y quien recibe, en dispositivos distintos, ven dibujos distintos. Apple, Google y Samsung dibujan el suyo, y en algunos emojis eso cambia el sentido (🙃, 😅).',
      'En el trabajo, un emoji que sustituye a una frase invita al malentendido. En algunos países un 👍 a secas se lee como desdén.',
      'Poner emojis en el título no mejora el posicionamiento: suelen quitarse del resultado de búsqueda.',
      'Las variantes de tono de piel no están aquí. Solo la forma base, porque el significado no cambia con ellas.',
    ],
    [
      'Toque no caractere para copiar e cole onde quiser: é texto, não imagem, então o tamanho acompanha a fonte ao redor.',
      'Quem envia e quem recebe, em aparelhos diferentes, veem desenhos diferentes. Apple, Google e Samsung desenham o seu, e em alguns emojis isso muda o sentido (🙃, 😅).',
      'No trabalho, um emoji no lugar de uma frase abre espaço para mal-entendido. Em alguns países um 👍 sozinho soa como desdém.',
      'Colocar emoji no título não ajuda no ranking de busca — costuma ser removido do resultado.',
      'Variantes de tom de pele não entram aqui. Só a forma base, porque o significado não muda com elas.',
    ],
    [
      '字をタップすると複製でき、どこにでも貼れます — 画像ではなく文字なので、周りのフォントで大きさが変わります。',
      '送る側と受け取る側の端末が違えば絵も違います。Apple・Google・Samsung がそれぞれ描き、その差で意味が変わる絵文字もあります（🙃・😅）。',
      '仕事の会話で絵文字が一文の代わりになると誤解を招きます。👍 だけの返信が冷たく読まれる国があります。',
      '題名に絵文字を入れても検索順位は上がりません。たいてい検索結果から取り除かれます。',
      '肌の色を変える異体はこの事典に載せていません。基本形だけを置きます — 意味が変わらないからです。',
    ],
    [
      'Tippe das Zeichen an, um es zu kopieren, und füge es überall ein — es ist Text, kein Bild, also folgt die Größe der umgebenden Schrift.',
      'Auf unterschiedlichen Geräten sehen Sender und Empfänger unterschiedliche Zeichnungen. Apple, Google und Samsung zeichnen je eigene, und bei manchen Emojis ändert das die Bedeutung (🙃, 😅).',
      'Im Beruf lädt ein Emoji, das einen Satz ersetzt, zum Missverständnis ein. In manchen Ländern liest sich ein bloßes 👍 als Abfuhr.',
      'Emojis im Seitentitel helfen dem Ranking nicht — sie werden im Suchergebnis meist entfernt.',
      'Hauttonvarianten stehen hier nicht. Nur die Grundform, weil sich die Bedeutung dadurch nicht ändert.',
    ],
    [
      'Touchez le caractère pour le copier et collez-le où vous voulez : c’est du texte, pas une image, sa taille suit donc la police alentour.',
      'Sur des appareils différents, l’expéditeur et le destinataire voient des dessins différents. Apple, Google et Samsung dessinent le leur, et pour certains emojis cela change le sens (🙃, 😅).',
      'Au travail, un emoji qui remplace une phrase invite au malentendu. Dans certains pays, un 👍 seul se lit comme une fin de non-recevoir.',
      'Mettre un emoji dans un titre n’aide pas au classement : il est le plus souvent retiré du résultat de recherche.',
      'Les variantes de teint ne figurent pas ici. Seule la forme de base, car le sens ne change pas avec elles.',
    ],
    [
      'अक्षर पर टैप कर कॉपी कीजिए और कहीं भी चिपकाइए — यह चित्र नहीं, अक्षर है, इसलिए आकार आसपास के फ़ॉन्ट के साथ बदलता है।',
      'भेजने और पाने वाले के डिवाइस अलग हों तो चित्र भी अलग दिखते हैं। Apple, Google और Samsung अपना-अपना बनाते हैं, और कुछ इमोजी में इससे अर्थ बदल जाता है (🙃, 😅)।',
      'काम की बातचीत में इमोजी पूरे वाक्य की जगह ले ले तो ग़लतफ़हमी बनती है। कुछ देशों में अकेला 👍 रूखा लगता है।',
      'शीर्षक में इमोजी डालने से सर्च रैंकिंग नहीं सुधरती — नतीजे में वह आम तौर पर हटा दिया जाता है।',
      'त्वचा के रंग वाले रूप यहाँ नहीं हैं। सिर्फ़ मूल रूप है, क्योंकि उनसे अर्थ नहीं बदलता।',
    ],
    [
      '点一下字符就能复制，随处粘贴——它是文字不是图片，大小跟着周围字体走。',
      '发送方和接收方设备不同，看到的画法也不同。Apple、Google、三星各画一套，有些表情因此改变了含义（🙃、😅）。',
      '工作对话里，用一个表情代替一句话容易被误读。有些国家单发一个 👍 会显得敷衍。',
      '在标题里放表情对搜索排名没有帮助——搜索结果通常会把它去掉。',
      '肤色变体没有收录，只保留基本形，因为含义并不随之变化。',
    ],
    [
      '點一下字元就能複製，隨處貼上——它是文字不是圖片，大小跟著周圍字體走。',
      '傳送方和接收方裝置不同，看到的畫法也不同。Apple、Google、三星各畫一套，有些表情因此改變了含義（🙃、😅）。',
      '工作對話裡，用一個表情代替一句話容易被誤讀。有些國家單發一個 👍 會顯得敷衍。',
      '在標題裡放表情對搜尋排名沒有幫助——搜尋結果通常會把它去掉。',
      '膚色變體沒有收錄，只保留基本形，因為含義並不隨之變化。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  copyLabel: T('눌러 복사', 'Tap to copy', 'Toca para copiar', 'Toque para copiar', 'タップで複製', 'Zum Kopieren tippen', 'Toucher pour copier', 'कॉपी करने के लिए टैप करें', '点击复制', '點擊複製'),

  copiedLabel: T('복사했습니다', 'Copied', 'Copiado', 'Copiado', 'コピーしました', 'Kopiert', 'Copié', 'कॉपी हो गया', '已复制', '已複製'),

  hubMetaTitle: T(
    '이모지 뜻 사전 {n}개 — 공식 이름이 아니라 실제로 쓰는 뜻',
    '{n} emoji meanings — what people actually mean, not the official name',
    '{n} significados de emojis — lo que se quiere decir de verdad',
    '{n} significados de emojis — o que se quer dizer de verdade',
    '絵文字の意味事典 {n}件 — 公式名ではなく実際の意味',
    '{n} Emoji-Bedeutungen — der echte Gebrauch, nicht der offizielle Name',
    '{n} significations d’emojis — l’usage réel, pas le nom officiel',
    '{n} इमोजी के अर्थ — आधिकारिक नाम नहीं, असली मतलब',
    '{n} 个表情符号含义 — 实际用法而非官方名称',
    '{n} 個表情符號含義 — 實際用法而非官方名稱',
  ),

  hubMetaDesc: T(
    '얼굴·손짓·기호·음식 등 {n}개 이모지를 사람들이 실제로 보내는 뜻으로 정리했습니다. 나라마다 다르게 읽히는 자리도 함께 적었습니다.',
    '{n} emojis — faces, gestures, symbols, food — described by what people send them to mean, including where the reading changes by country.',
    '{n} emojis —caras, gestos, símbolos, comida— explicados por lo que se quiere decir al enviarlos, incluidas las lecturas que cambian según el país.',
    '{n} emojis — rostos, gestos, símbolos, comida — explicados pelo que se quer dizer ao enviá-los, incluindo as leituras que mudam por país.',
    '顔・手・記号・食べものなど {n}件の絵文字を、実際に送っている意味でまとめました。国で読みが変わる箇所も書いてあります。',
    '{n} Emojis — Gesichter, Gesten, Symbole, Essen — nach ihrem tatsächlichen Gebrauch beschrieben, samt der Stellen, an denen die Lesart je Land wechselt.',
    '{n} emojis — visages, gestes, symboles, nourriture — décrits par leur usage réel, y compris là où la lecture change selon le pays.',
    '{n} इमोजी — चेहरे, इशारे, चिह्न, खाना — लोग जिस मतलब से भेजते हैं उसी हिसाब से। जहाँ देश बदलने पर पाठ बदलता है, वह भी लिखा है।',
    '{n} 个表情符号——表情、手势、符号、食物——按人们实际发它的意思讲，也写了哪些读法因国家而异。',
    '{n} 個表情符號——表情、手勢、符號、食物——按人們實際發它的意思講，也寫了哪些讀法因國家而異。',
  ),

  metaTitle: T(
    (c: string, k: string) => `${c} ${k} 이모지 뜻`,
    (c: string, k: string) => `${c} ${k} emoji meaning`,
    (c: string, k: string) => `Significado del emoji ${c} ${k}`,
    (c: string, k: string) => `Significado do emoji ${c} ${k}`,
    (c: string, k: string) => `${c} ${k} 絵文字の意味`,
    (c: string, k: string) => `Bedeutung des Emojis ${c} ${k}`,
    (c: string, k: string) => `Signification de l’emoji ${c} ${k}`,
    (c: string, k: string) => `${c} ${k} इमोजी का अर्थ`,
    (c: string, k: string) => `${c} ${k} 表情含义`,
    (c: string, k: string) => `${c} ${k} 表情含義`,
  ),

  metaDesc: T(
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
    (c: string, d: string) => `${c} — ${d}`,
  ),

  hubFaq: T(
    [
      { q: '왜 공식 이름과 다르게 적었나요?', a: '유니코드 이름은 그림을 설명한 것이고, 사람들이 그 뜻으로 보내지 않습니다. 💀는 skull이지만 대화에서는 웃겨 죽는다는 뜻이고, 😤는 face with steam from nose지만 원래 뜻은 득의양양입니다. 검색해서 오는 사람이 찾는 것은 뒤쪽입니다.' },
      { q: '같은 이모지가 기기마다 다르게 보이는 이유는 무엇인가요?', a: '유니코드는 어떤 뜻의 글자인지만 정하고 그림은 각 회사가 그립니다. 그래서 애플·구글·삼성·트위터의 모양이 다르고, 웃는 정도나 눈매가 달라 뜻이 갈리는 이모지도 있습니다.' },
      { q: '이모지를 주소에 쓸 수 있나요?', a: '기술적으로는 가능하지만 이 사전은 슬러그를 씁니다. 이모지가 든 주소는 복사할 때 깨지고, 검색 결과나 채팅에서 이상한 문자열로 보입니다.' },
      { q: '피부색이나 성별이 다른 변이는 왜 없나요?', a: '뜻이 달라지지 않기 때문입니다. 변이는 같은 이모지의 표시일 뿐이라 기본형 한 장에 함께 설명합니다.' },
    ],
    [
      { q: 'Why not just use the official names?', a: 'The Unicode name describes the drawing, and that is not what people mean by it. 💀 is skull but in conversation it means dying of laughter; 😤 is face with steam from nose but was drawn as triumph. What brings people here is the second reading.' },
      { q: 'Why does the same emoji look different on different devices?', a: 'Unicode fixes what the character means, and each vendor draws its own picture. Apple, Google, Samsung and Twitter all differ, and for some emojis the eyes or the smile change enough to change the reading.' },
      { q: 'Can an emoji go in a URL?', a: 'Technically yes, but this reference uses slugs. Emoji URLs break when copied and show up as a strange string of characters in search results and chat.' },
      { q: 'Why no skin-tone or gender variants?', a: 'Because the meaning does not change. A variant is a presentation of the same emoji, so it is covered on the base entry.' },
    ],
    [
      { q: '¿Por qué no usar los nombres oficiales?', a: 'El nombre de Unicode describe el dibujo, y no es lo que la gente quiere decir. 💀 es skull, pero en una conversación es morirse de risa; 😤 es face with steam from nose, pero se dibujó como triunfo. Lo que trae aquí a la gente es la segunda lectura.' },
      { q: '¿Por qué el mismo emoji se ve distinto en cada dispositivo?', a: 'Unicode fija qué significa el carácter y cada fabricante dibuja su versión. Apple, Google, Samsung y Twitter difieren, y en algunos emojis los ojos o la sonrisa cambian lo suficiente para cambiar la lectura.' },
      { q: '¿Se puede poner un emoji en una URL?', a: 'Técnicamente sí, pero aquí usamos slugs. Las URL con emoji se rompen al copiarlas y aparecen como una cadena rara en buscadores y en el chat.' },
      { q: '¿Por qué no hay variantes de tono de piel o de género?', a: 'Porque no cambian el significado. Una variante es una presentación del mismo emoji, así que se explica en la ficha base.' },
    ],
    [
      { q: 'Por que não usar os nomes oficiais?', a: 'O nome da Unicode descreve o desenho, e não é o que as pessoas querem dizer. 💀 é skull, mas numa conversa é morrer de rir; 😤 é face with steam from nose, mas foi desenhado como triunfo. O que traz gente aqui é a segunda leitura.' },
      { q: 'Por que o mesmo emoji parece diferente em cada aparelho?', a: 'A Unicode define o que o caractere significa e cada fabricante desenha a sua versão. Apple, Google, Samsung e Twitter divergem, e em alguns emojis os olhos ou o sorriso mudam o bastante para mudar a leitura.' },
      { q: 'Dá para colocar emoji na URL?', a: 'Tecnicamente sim, mas aqui usamos slugs. URLs com emoji quebram ao serem copiadas e aparecem como uma sequência estranha em buscas e no chat.' },
      { q: 'Por que não há variantes de tom de pele ou de gênero?', a: 'Porque o significado não muda. A variante é uma apresentação do mesmo emoji, então fica explicada na ficha base.' },
    ],
    [
      { q: '公式名と違う説明にしているのはなぜですか。', a: 'ユニコードの名は絵の説明で、人はその意味で送っていません。💀 は skull ですが会話では笑い死ぬ意味で、😤 は face with steam from nose ですが元は得意の顔です。検索で来る人が探しているのは後者です。' },
      { q: '同じ絵文字が端末で違って見えるのはなぜですか。', a: 'ユニコードは字の意味だけを決め、絵は各社が描きます。Apple・Google・Samsung・Twitter で形が違い、目や笑い方の差で読みが変わる絵文字もあります。' },
      { q: '絵文字を URL に使えますか。', a: '技術的には使えますが、この事典はスラッグを使います。絵文字入りの URL は複製すると壊れ、検索結果やチャットで奇妙な文字列になります。' },
      { q: '肌の色や性別の異体がないのはなぜですか。', a: '意味が変わらないからです。異体は同じ絵文字の見せ方なので、基本形の一枚で一緒に説明します。' },
    ],
    [
      { q: 'Warum nicht einfach die offiziellen Namen?', a: 'Der Unicode-Name beschreibt die Zeichnung, nicht das Gemeinte. 💀 heißt skull, im Gespräch aber „ich lache mich tot“; 😤 heißt face with steam from nose, gezeichnet war Triumph. Hierher führt die zweite Lesart.' },
      { q: 'Warum sieht dasselbe Emoji auf jedem Gerät anders aus?', a: 'Unicode legt nur fest, was das Zeichen bedeutet; das Bild zeichnet jeder Hersteller selbst. Apple, Google, Samsung und Twitter unterscheiden sich, und bei manchen Emojis ändern Augen oder Lächeln die Lesart.' },
      { q: 'Darf ein Emoji in eine URL?', a: 'Technisch ja, aber dieses Verzeichnis nutzt Slugs. Emoji-URLs brechen beim Kopieren und erscheinen in Suchergebnissen und Chats als merkwürdige Zeichenkette.' },
      { q: 'Warum keine Hautton- oder Gendervarianten?', a: 'Weil sich die Bedeutung nicht ändert. Eine Variante ist nur eine Darstellung desselben Emojis und wird beim Grundeintrag erklärt.' },
    ],
    [
      { q: 'Pourquoi ne pas garder les noms officiels ?', a: 'Le nom Unicode décrit le dessin, pas ce que les gens veulent dire. 💀 est skull, mais en conversation c’est mourir de rire ; 😤 est face with steam from nose alors qu’il représentait le triomphe. C’est la seconde lecture qui amène ici.' },
      { q: 'Pourquoi le même emoji change-t-il d’aspect selon l’appareil ?', a: 'Unicode fixe le sens du caractère, chaque fabricant dessine le sien. Apple, Google, Samsung et Twitter diffèrent, et pour certains emojis les yeux ou le sourire suffisent à changer la lecture.' },
      { q: 'Peut-on mettre un emoji dans une URL ?', a: 'Techniquement oui, mais ce répertoire utilise des slugs. Les URL à emoji se cassent à la copie et apparaissent comme une chaîne étrange dans les résultats et les messages.' },
      { q: 'Pourquoi pas de variantes de teint ou de genre ?', a: 'Parce que le sens ne change pas. Une variante n’est qu’une présentation du même emoji : elle est traitée sur la fiche de base.' },
    ],
    [
      { q: 'आधिकारिक नाम क्यों नहीं लिए?', a: 'यूनिकोड का नाम चित्र का वर्णन है, वह मतलब नहीं जो लोग लेते हैं। 💀 skull है, पर बातचीत में हँसते-हँसते मर जाना है; 😤 face with steam from nose है, पर बनाया गया था जीत के भाव में। खोज से आने वाले को दूसरा ही चाहिए।' },
      { q: 'वही इमोजी हर डिवाइस पर अलग क्यों दिखता है?', a: 'यूनिकोड सिर्फ़ तय करता है कि अक्षर का अर्थ क्या है; चित्र हर कंपनी अपना बनाती है। Apple, Google, Samsung और Twitter अलग हैं, और कुछ इमोजी में आँखें या मुस्कान इतनी बदल जाती हैं कि अर्थ बदल जाता है।' },
      { q: 'इमोजी को URL में रख सकते हैं?', a: 'तकनीकी रूप से हाँ, पर यह सूची स्लग इस्तेमाल करती है। इमोजी वाले URL कॉपी करने पर टूट जाते हैं और खोज नतीजों तथा चैट में अजीब अक्षरों की लड़ी बन जाते हैं।' },
      { q: 'त्वचा के रंग या लिंग वाले रूप क्यों नहीं हैं?', a: 'क्योंकि अर्थ नहीं बदलता। वे उसी इमोजी की प्रस्तुति हैं, इसलिए मूल पन्ने पर ही समझाए गए हैं।' },
    ],
    [
      { q: '为什么不用官方名称？', a: 'Unicode 的名字描述的是图案，不是人们要表达的意思。💀 叫 skull，但在聊天里是笑死了；😤 叫 face with steam from nose，本意却是得意。搜过来的人要的是后一种。' },
      { q: '为什么同一个表情在不同设备上不一样？', a: 'Unicode 只规定这个字符是什么意思，画法由各家自己定。Apple、Google、三星、Twitter 各不相同，有些表情的眼神或笑法差别大到改变了读法。' },
      { q: '表情符号能放进网址吗？', a: '技术上可以，但本词典用 slug。带表情的网址复制时容易坏，在搜索结果和聊天里会显示成一串奇怪字符。' },
      { q: '为什么没有肤色或性别变体？', a: '因为含义不变。变体只是同一个表情的呈现方式，在基本条目里一起说明。' },
    ],
    [
      { q: '為什麼不用官方名稱？', a: 'Unicode 的名字描述的是圖案，不是人們要表達的意思。💀 叫 skull，但在聊天裡是笑死了；😤 叫 face with steam from nose，本意卻是得意。搜過來的人要的是後一種。' },
      { q: '為什麼同一個表情在不同裝置上不一樣？', a: 'Unicode 只規定這個字元是什麼意思，畫法由各家自己定。Apple、Google、三星、Twitter 各不相同，有些表情的眼神或笑法差別大到改變了讀法。' },
      { q: '表情符號能放進網址嗎？', a: '技術上可以，但本詞典用 slug。帶表情的網址複製時容易壞，在搜尋結果和聊天裡會顯示成一串奇怪字元。' },
      { q: '為什麼沒有膚色或性別變體？', a: '因為含義不變。變體只是同一個表情的呈現方式，在基本條目裡一起說明。' },
    ],
  ),

  itemFaq: T(
    (f: EmojiFacts, d: string, g: string) => [
      { q: `${f.item.char} 이모지는 무슨 뜻인가요?`, a: d },
      { q: '공식 이름은 무엇인가요?', a: `유니코드 이름은 ${f.item.unicodeName}이고 코드포인트는 ${f.item.code}입니다. ${g} 갈래에 있습니다.` },
      { q: '복사해서 붙이면 그대로 보이나요?', a: f.vs16 ? '뒤에 U+FE0F가 함께 복사되어야 컬러로 보입니다. 이것이 빠지면 흑백 글자로 떨어집니다.' : f.zwj ? '이 글자는 ZWJ로 이어 붙였습니다. 이 조합을 모르는 기기에서는 둘로 갈라져 보입니다.' : '대부분의 기기에서 그대로 보입니다. 다만 그림 모양은 회사마다 다릅니다.' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `What does ${f.item.char} mean?`, a: d },
      { q: 'What is its official name?', a: `Unicode calls it ${f.item.unicodeName}, code point ${f.item.code}. It sits under ${g}.` },
      { q: 'Does it survive copy and paste?', a: f.vs16 ? 'Only if the trailing U+FE0F comes along. Without it the glyph falls back to black and white.' : f.zwj ? 'This one is joined with ZWJ, so a device that does not know the sequence shows it split into pieces.' : 'On most devices, yes — though every vendor draws it slightly differently.' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `¿Qué significa ${f.item.char}?`, a: d },
      { q: '¿Cuál es su nombre oficial?', a: `Unicode lo llama ${f.item.unicodeName}, punto de código ${f.item.code}. Está en ${g}.` },
      { q: '¿Sobrevive al copiar y pegar?', a: f.vs16 ? 'Solo si va con el U+FE0F final. Sin él cae a blanco y negro.' : f.zwj ? 'Este va unido con ZWJ, así que un dispositivo que no conoce la secuencia lo muestra partido.' : 'En la mayoría de dispositivos sí, aunque cada fabricante lo dibuja algo distinto.' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `O que ${f.item.char} significa?`, a: d },
      { q: 'Qual é o nome oficial?', a: `A Unicode chama de ${f.item.unicodeName}, ponto de código ${f.item.code}. Fica em ${g}.` },
      { q: 'Sobrevive ao copiar e colar?', a: f.vs16 ? 'Só se o U+FE0F final vier junto. Sem ele cai para preto e branco.' : f.zwj ? 'Este é unido com ZWJ, então um aparelho que não conhece a sequência mostra em pedaços.' : 'Na maioria dos aparelhos sim, embora cada fabricante desenhe de um jeito.' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `${f.item.char} はどういう意味ですか。`, a: d },
      { q: '公式名は何ですか。', a: `ユニコード名は ${f.item.unicodeName}、コードポイントは ${f.item.code} です。${g}の仲間です。` },
      { q: 'コピーして貼っても同じに見えますか。', a: f.vs16 ? '後ろの U+FE0F が一緒に複製されれば色で出ます。抜けると白黒の字に落ちます。' : f.zwj ? 'この字は ZWJ でつないでいます。並びを知らない端末では分かれて見えます。' : 'ほとんどの端末では同じに見えます。ただし絵の形は会社ごとに違います。' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `Was bedeutet ${f.item.char}?`, a: d },
      { q: 'Wie lautet der offizielle Name?', a: `Unicode nennt es ${f.item.unicodeName}, Codepoint ${f.item.code}. Es gehört zu ${g}.` },
      { q: 'Übersteht es Kopieren und Einfügen?', a: f.vs16 ? 'Nur wenn das angehängte U+FE0F mitkommt. Ohne es fällt das Zeichen auf Schwarz-Weiß zurück.' : f.zwj ? 'Dieses ist mit ZWJ verbunden; ein Gerät ohne diese Folge zeigt es in Einzelteilen.' : 'Auf den meisten Geräten ja — gezeichnet wird es aber von jedem Hersteller etwas anders.' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `Que veut dire ${f.item.char} ?`, a: d },
      { q: 'Quel est son nom officiel ?', a: `Unicode l’appelle ${f.item.unicodeName}, point de code ${f.item.code}. Il relève de ${g}.` },
      { q: 'Survit-il au copier-coller ?', a: f.vs16 ? 'Seulement si le U+FE0F final suit. Sans lui, le glyphe retombe en noir et blanc.' : f.zwj ? 'Celui-ci est assemblé avec un ZWJ : un appareil qui ignore la séquence l’affiche en morceaux.' : 'Sur la plupart des appareils oui, même si chaque fabricant le dessine un peu autrement.' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `${f.item.char} का क्या मतलब है?`, a: d },
      { q: 'इसका आधिकारिक नाम क्या है?', a: `यूनिकोड इसे ${f.item.unicodeName} कहता है, कोड पॉइंट ${f.item.code}। यह ${g} में आता है।` },
      { q: 'कॉपी-पेस्ट में यह वैसा ही रहता है?', a: f.vs16 ? 'तभी, जब अंत का U+FE0F साथ आए। वह न हो तो अक्षर काले-सफ़ेद रूप में गिर जाता है।' : f.zwj ? 'यह ZWJ से जुड़ा है, इसलिए जो डिवाइस इस क्रम को नहीं जानता वहाँ टुकड़ों में दिखता है।' : 'ज़्यादातर डिवाइस पर हाँ — हालाँकि हर कंपनी इसे थोड़ा अलग बनाती है।' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `${f.item.char} 是什么意思？`, a: d },
      { q: '它的官方名称是什么？', a: `Unicode 叫它 ${f.item.unicodeName}，码位 ${f.item.code}，属于${g}。` },
      { q: '复制粘贴后还一样吗？', a: f.vs16 ? '只有末尾的 U+FE0F 一起带上才是彩色。少了它就退成黑白字形。' : f.zwj ? '这个字是用 ZWJ 连起来的，不认识这个序列的设备会拆开显示。' : '大多数设备上一样，只是各家画法略有不同。' },
    ],
    (f: EmojiFacts, d: string, g: string) => [
      { q: `${f.item.char} 是什麼意思？`, a: d },
      { q: '它的官方名稱是什麼？', a: `Unicode 叫它 ${f.item.unicodeName}，碼位 ${f.item.code}，屬於${g}。` },
      { q: '複製貼上後還一樣嗎？', a: f.vs16 ? '只有末尾的 U+FE0F 一起帶上才是彩色。少了它就退成黑白字形。' : f.zwj ? '這個字是用 ZWJ 連起來的，不認識這個序列的裝置會拆開顯示。' : '大多數裝置上一樣，只是各家畫法略有不同。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const EMOJI_UI: L<EmojiUI> = Object.fromEntries(LANG_CODES.map(lang => [lang,
  Object.fromEntries(Object.entries(SPEC).map(([k, byLang]) => [k, (byLang as L<unknown>)[lang as Lang]])),
])) as unknown as L<EmojiUI>;
