/**
 * 키 코드 화면의 문구 — 열 언어.
 *
 * code·key·keyCode라는 이름 자체는 옮기지 않는다. 자바스크립트가 쓰는 속성
 * 이름이라 번역하면 오히려 코드와 맞춰 볼 수 없다. 옮기는 것은 "그게 무엇인가"뿐이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { KeyFacts, Location } from './facts.ts';
import type { KeyGroup } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface KeycodeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  groupLabel: Record<KeyGroup, string>;
  groupNote: Record<KeyGroup, string>;
  codeLabel: string;
  keyLabel: string;
  shiftLabel: string;
  keyCodeLabel: string;
  hexLabel: string;
  locationLabel: string;
  locationName: Record<Location, string>;
  sharesLabel: string;
  printableLabel: string;
  yes: string;
  no: string;
  noneLabel: string;
  layoutTitle: string;
  layoutNote: string;
  deprecatedNote: string;
  variesNote: (n: number) => string;
  snippetTitle: string;
  snippetNote: string;
  neighbourTitle: string;
  desc: (f: KeyFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: KeyFacts) => string;
  metaDesc: (f: KeyFacts) => string;
  hubFaq: FaqItem[];
  keyFaq: (f: KeyFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof KeycodeUI]: L<KeycodeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('키 코드', 'Key codes', 'Códigos de tecla', 'Códigos de tecla', 'キーコード', 'Tastencodes', 'Codes de touche', 'की कोड', '键码', '鍵碼'),

  hubTitle: T(
    '자판 키 120개의 code와 keyCode',
    'code and keyCode for 120 keys',
    'code y keyCode de 120 teclas',
    'code e keyCode de 120 teclas',
    'キー120個のcodeとkeyCode',
    'code und keyCode für 120 Tasten',
    'code et keyCode de 120 touches',
    '120 कुंजियों के code और keyCode',
    '120 个按键的 code 与 keyCode',
    '120 個按鍵的 code 與 keyCode',
  ),

  hubLead: T(
    'KeyboardEvent에서 나오는 값들입니다. code는 자판의 자리라 언어를 타지 않고, key는 그 순간 찍히는 글자라 자판마다 다릅니다.',
    'The values a KeyboardEvent gives you. code is the physical position and never changes with layout; key is what actually gets typed, and that does.',
    'Los valores que entrega un KeyboardEvent. code es la posición física y no cambia con la distribución; key es lo que se escribe, y eso sí cambia.',
    'Os valores que um KeyboardEvent entrega. code é a posição física e não muda com o layout; key é o que realmente se digita, e isso muda.',
    'KeyboardEventから出てくる値です。codeは自板の位置なので言語で変わらず、keyはその瞬間に打たれる文字なので配列ごとに変わります。',
    'Die Werte, die ein KeyboardEvent liefert. code ist die Position auf der Tastatur und ändert sich nie mit dem Layout; key ist das, was getippt wird — und das schon.',
    'Les valeurs que donne un KeyboardEvent. code est la position physique et ne change jamais avec la disposition ; key est ce qui est tapé, et cela change.',
    'KeyboardEvent से मिलने वाले मान। code कुंजी की भौतिक जगह है और लेआउट से नहीं बदलती; key वह है जो टाइप होता है, और वह बदलता है।',
    'KeyboardEvent 给出的那些值。code 是键盘上的物理位置，不随布局变化；key 是当下敲出来的字符，会变。',
    'KeyboardEvent 給出的那些值。code 是鍵盤上的實體位置，不隨配置變化；key 是當下敲出來的字元，會變。',
  ),

  groupLabel: T(
    { letter: '글자', digit: '숫자', punctuation: '기호', numpad: '숫자판', function: 'F키', navigation: '이동', editing: '편집', modifier: '수정 키', lock: '잠금', system: '시스템', language: '입력기' },
    { letter: 'Letters', digit: 'Digits', punctuation: 'Punctuation', numpad: 'Numpad', function: 'Function keys', navigation: 'Navigation', editing: 'Editing', modifier: 'Modifiers', lock: 'Locks', system: 'System', language: 'Input method' },
    { letter: 'Letras', digit: 'Dígitos', punctuation: 'Signos', numpad: 'Teclado numérico', function: 'Teclas F', navigation: 'Navegación', editing: 'Edición', modifier: 'Modificadoras', lock: 'Bloqueos', system: 'Sistema', language: 'Método de entrada' },
    { letter: 'Letras', digit: 'Dígitos', punctuation: 'Sinais', numpad: 'Teclado numérico', function: 'Teclas F', navigation: 'Navegação', editing: 'Edição', modifier: 'Modificadoras', lock: 'Travas', system: 'Sistema', language: 'Método de entrada' },
    { letter: '文字', digit: '数字', punctuation: '記号', numpad: 'テンキー', function: 'ファンクション', navigation: '移動', editing: '編集', modifier: '修飾キー', lock: 'ロック', system: 'システム', language: '入力方式' },
    { letter: 'Buchstaben', digit: 'Ziffern', punctuation: 'Satzzeichen', numpad: 'Ziffernblock', function: 'F-Tasten', navigation: 'Navigation', editing: 'Bearbeiten', modifier: 'Modifikatoren', lock: 'Feststelltasten', system: 'System', language: 'Eingabemethode' },
    { letter: 'Lettres', digit: 'Chiffres', punctuation: 'Ponctuation', numpad: 'Pavé numérique', function: 'Touches F', navigation: 'Navigation', editing: 'Édition', modifier: 'Modificateurs', lock: 'Verrouillage', system: 'Système', language: 'Méthode de saisie' },
    { letter: 'अक्षर', digit: 'अंक', punctuation: 'चिह्न', numpad: 'नंबरपैड', function: 'फ़ंक्शन कुंजी', navigation: 'नेविगेशन', editing: 'संपादन', modifier: 'मॉडिफ़ायर', lock: 'लॉक', system: 'सिस्टम', language: 'इनपुट विधि' },
    { letter: '字母', digit: '数字', punctuation: '符号', numpad: '小键盘', function: '功能键', navigation: '移动', editing: '编辑', modifier: '修饰键', lock: '锁定键', system: '系统', language: '输入法' },
    { letter: '字母', digit: '數字', punctuation: '符號', numpad: '數字鍵盤', function: '功能鍵', navigation: '移動', editing: '編輯', modifier: '修飾鍵', lock: '鎖定鍵', system: '系統', language: '輸入法' },
  ),

  groupNote: T(
    {
      letter: '자리는 KeyA로 고정입니다. 한글 자판에서 ㅁ이 찍혀도 code는 KeyA입니다.',
      digit: '숫자 줄입니다. 숫자판의 같은 숫자와는 keyCode가 다릅니다.',
      punctuation: 'keyCode가 브라우저마다 갈리는 자리가 여기 있습니다.',
      numpad: 'location이 3이라 숫자 줄과 구별됩니다.',
      function: 'F1은 112, F2는 113 … 차례로 이어집니다.',
      navigation: '글자를 찍지 않고 커서만 옮깁니다.',
      editing: '지우고 넣고 줄을 바꾸는 키들입니다.',
      modifier: '혼자서는 아무 일도 하지 않고 다른 키에 얹힙니다. 좌우가 같은 keyCode를 씁니다.',
      lock: '한 번 누르면 상태가 바뀌어 머무릅니다.',
      system: '창과 화면을 다루는 키들입니다.',
      language: '입력기를 바꾸는 키 — 한/영, 한자, 일본어 변환이 여기 듭니다.',
    },
    {
      letter: 'The position is fixed as KeyA. Even when a Hangul ㅁ is typed, the code is still KeyA.',
      digit: 'The number row. Its keyCodes differ from the same digits on the numpad.',
      punctuation: 'This is where keyCode values part ways between browsers.',
      numpad: 'location is 3, which is what tells it apart from the number row.',
      function: 'F1 is 112, F2 is 113, and so on in order.',
      navigation: 'They type nothing and only move the cursor.',
      editing: 'Deleting, inserting, breaking a line.',
      modifier: 'They do nothing alone and ride on other keys. Left and right share one keyCode.',
      lock: 'Press once and the state stays changed.',
      system: 'Keys that deal with windows and the screen.',
      language: 'Keys that switch the input method — Hangul, Hanja and the Japanese conversion keys.',
    },
    {
      letter: 'La posición está fijada como KeyA. Aunque se escriba un ㅁ coreano, el code sigue siendo KeyA.',
      digit: 'La fila de números. Sus keyCode difieren de los mismos dígitos del teclado numérico.',
      punctuation: 'Aquí es donde los valores de keyCode se separan entre navegadores.',
      numpad: 'location vale 3, y eso lo distingue de la fila de números.',
      function: 'F1 es 112, F2 es 113, y así en orden.',
      navigation: 'No escriben nada; solo mueven el cursor.',
      editing: 'Borrar, insertar, saltar de línea.',
      modifier: 'Solas no hacen nada y se montan sobre otras. Izquierda y derecha comparten keyCode.',
      lock: 'Se pulsan una vez y el estado queda cambiado.',
      system: 'Teclas que tratan con ventanas y pantalla.',
      language: 'Teclas que cambian el método de entrada: hangul, hanja y las de conversión japonesa.',
    },
    {
      letter: 'A posição é fixa como KeyA. Mesmo que saia um ㅁ coreano, o code continua KeyA.',
      digit: 'A linha de números. Os keyCode diferem dos mesmos dígitos no teclado numérico.',
      punctuation: 'É aqui que os valores de keyCode se separam entre navegadores.',
      numpad: 'location é 3, e é isso que o separa da linha de números.',
      function: 'F1 é 112, F2 é 113, e assim por diante.',
      navigation: 'Não digitam nada; só movem o cursor.',
      editing: 'Apagar, inserir, quebrar linha.',
      modifier: 'Sozinhas não fazem nada e se apoiam em outras. Esquerda e direita dividem o keyCode.',
      lock: 'Aperta uma vez e o estado fica trocado.',
      system: 'Teclas que lidam com janelas e tela.',
      language: 'Teclas que trocam o método de entrada — hangul, hanja e as de conversão japonesa.',
    },
    {
      letter: '位置はKeyAで固定です。ハングル配列でㅁが打たれてもcodeはKeyAのままです。',
      digit: '数字の段です。テンキーの同じ数字とはkeyCodeが違います。',
      punctuation: 'keyCodeがブラウザごとに分かれるのがこの辺りです。',
      numpad: 'locationが3なので数字の段と区別できます。',
      function: 'F1が112、F2が113…と順に続きます。',
      navigation: '文字を打たず、カーソルだけ動かします。',
      editing: '消す・入れる・行を変えるキーです。',
      modifier: '単独では何もせず、他のキーに乗ります。左右が同じkeyCodeです。',
      lock: '一度押すと状態が変わったまま残ります。',
      system: 'ウィンドウと画面を扱うキーです。',
      language: '入力方式を切り替えるキー——ハングル、漢字、日本語の変換がここです。',
    },
    {
      letter: 'Die Position ist als KeyA festgelegt. Auch wenn ein koreanisches ㅁ erscheint, bleibt der code KeyA.',
      digit: 'Die Zahlenreihe. Ihre keyCodes unterscheiden sich von denselben Ziffern auf dem Ziffernblock.',
      punctuation: 'Hier gehen die keyCode-Werte zwischen den Browsern auseinander.',
      numpad: 'location ist 3 — daran erkennt man den Ziffernblock.',
      function: 'F1 ist 112, F2 ist 113, und so weiter der Reihe nach.',
      navigation: 'Sie tippen nichts und bewegen nur den Cursor.',
      editing: 'Löschen, Einfügen, Zeilenumbruch.',
      modifier: 'Allein tun sie nichts und setzen auf anderen Tasten auf. Links und rechts teilen einen keyCode.',
      lock: 'Einmal gedrückt, bleibt der Zustand umgeschaltet.',
      system: 'Tasten für Fenster und Bildschirm.',
      language: 'Tasten, die die Eingabemethode wechseln — Hangul, Hanja und die japanischen Umwandlungstasten.',
    },
    {
      letter: 'La position est fixée à KeyA. Même si un ㅁ coréen s’affiche, le code reste KeyA.',
      digit: 'La rangée des chiffres. Leurs keyCode diffèrent de ceux du pavé numérique.',
      punctuation: 'C’est là que les valeurs de keyCode divergent selon le navigateur.',
      numpad: 'location vaut 3 : c’est ce qui le distingue de la rangée des chiffres.',
      function: 'F1 vaut 112, F2 vaut 113, et ainsi de suite.',
      navigation: 'Elles n’écrivent rien et déplacent seulement le curseur.',
      editing: 'Effacer, insérer, passer à la ligne.',
      modifier: 'Seules elles ne font rien et se posent sur d’autres touches. Gauche et droite partagent un keyCode.',
      lock: 'Une pression et l’état reste changé.',
      system: 'Des touches qui s’occupent des fenêtres et de l’écran.',
      language: 'Des touches qui changent la méthode de saisie — hangul, hanja et les touches de conversion japonaises.',
    },
    {
      letter: 'स्थान KeyA पर तय है। कोरियाई ㅁ टाइप हो तब भी code KeyA ही रहता है।',
      digit: 'संख्या पंक्ति। इनके keyCode नंबरपैड के उन्हीं अंकों से अलग हैं।',
      punctuation: 'यहीं keyCode के मान ब्राउज़रों में अलग हो जाते हैं।',
      numpad: 'location 3 होता है, इसी से यह संख्या पंक्ति से अलग पहचानी जाती है।',
      function: 'F1 यानी 112, F2 यानी 113 — क्रम से चलते हैं।',
      navigation: 'ये कुछ नहीं लिखतीं, बस कर्सर हिलाती हैं।',
      editing: 'मिटाना, जोड़ना, नई पंक्ति।',
      modifier: 'अकेले कुछ नहीं करतीं, दूसरी कुंजियों पर चढ़ती हैं। बाएँ-दाएँ एक ही keyCode साझा करती हैं।',
      lock: 'एक बार दबाइए, स्थिति बदली रह जाती है।',
      system: 'खिड़कियों और स्क्रीन से जुड़ी कुंजियाँ।',
      language: 'इनपुट विधि बदलने वाली कुंजियाँ — हंगुल, हांजा और जापानी रूपांतरण।',
    },
    {
      letter: '位置固定为 KeyA。哪怕键盘上敲出的是韩文 ㅁ，code 依然是 KeyA。',
      digit: '数字行。它们的 keyCode 与小键盘上同样的数字不同。',
      punctuation: 'keyCode 在各家浏览器里分道扬镳的，就是这一片。',
      numpad: 'location 是 3，这正是它和数字行的区别。',
      function: 'F1 是 112、F2 是 113，依次排下去。',
      navigation: '不打字，只移动光标。',
      editing: '删除、插入、换行。',
      modifier: '单按没有作用，要压在别的键上。左右共用一个 keyCode。',
      lock: '按一下，状态就一直保持。',
      system: '处理窗口和屏幕的键。',
      language: '切换输入法的键——韩/英、汉字、日语转换都在这里。',
    },
    {
      letter: '位置固定為 KeyA。哪怕鍵盤上敲出的是韓文 ㅁ，code 依然是 KeyA。',
      digit: '數字列。它們的 keyCode 與數字鍵盤上同樣的數字不同。',
      punctuation: 'keyCode 在各家瀏覽器裡分道揚鑣的，就是這一片。',
      numpad: 'location 是 3，這正是它和數字列的區別。',
      function: 'F1 是 112、F2 是 113，依序排下去。',
      navigation: '不打字，只移動游標。',
      editing: '刪除、插入、換行。',
      modifier: '單按沒有作用，要壓在別的鍵上。左右共用一個 keyCode。',
      lock: '按一下，狀態就一直保持。',
      system: '處理視窗和螢幕的鍵。',
      language: '切換輸入法的鍵——韓/英、漢字、日語轉換都在這裡。',
    },
  ),

  codeLabel: T('code (자리)', 'code (position)', 'code (posición)', 'code (posição)', 'code（位置）', 'code (Position)', 'code (position)', 'code (स्थान)', 'code（位置）', 'code（位置）'),
  keyLabel: T('key (미국 자판)', 'key (US layout)', 'key (distribución EE. UU.)', 'key (layout dos EUA)', 'key（US配列）', 'key (US-Layout)', 'key (disposition US)', 'key (US लेआउट)', 'key（美式布局）', 'key（美式配置）'),
  shiftLabel: T('Shift와 함께', 'With Shift', 'Con Shift', 'Com Shift', 'Shiftと一緒に', 'Mit Shift', 'Avec Maj', 'Shift के साथ', '按住 Shift', '按住 Shift'),
  keyCodeLabel: T('keyCode (폐기됨)', 'keyCode (deprecated)', 'keyCode (obsoleto)', 'keyCode (obsoleto)', 'keyCode（非推奨）', 'keyCode (veraltet)', 'keyCode (obsolète)', 'keyCode (अप्रचलित)', 'keyCode（已废弃）', 'keyCode（已廢棄）'),
  hexLabel: T('16진수', 'Hexadecimal', 'Hexadecimal', 'Hexadecimal', '16進数', 'Hexadezimal', 'Hexadécimal', 'षोडश आधारी', '十六进制', '十六進位'),
  locationLabel: T('location', 'location', 'location', 'location', 'location', 'location', 'location', 'location', 'location', 'location'),

  locationName: T(
    { 0: '기본', 1: '왼쪽', 2: '오른쪽', 3: '숫자판' },
    { 0: 'Standard', 1: 'Left', 2: 'Right', 3: 'Numpad' },
    { 0: 'Estándar', 1: 'Izquierda', 2: 'Derecha', 3: 'Numérico' },
    { 0: 'Padrão', 1: 'Esquerda', 2: 'Direita', 3: 'Numérico' },
    { 0: '標準', 1: '左', 2: '右', 3: 'テンキー' },
    { 0: 'Standard', 1: 'Links', 2: 'Rechts', 3: 'Ziffernblock' },
    { 0: 'Standard', 1: 'Gauche', 2: 'Droite', 3: 'Pavé numérique' },
    { 0: 'मानक', 1: 'बायाँ', 2: 'दायाँ', 3: 'नंबरपैड' },
    { 0: '标准', 1: '左', 2: '右', 3: '小键盘' },
    { 0: '標準', 1: '左', 2: '右', 3: '數字鍵盤' },
  ),

  sharesLabel: T('같은 keyCode', 'Shares keyCode with', 'Comparte keyCode con', 'Divide keyCode com', '同じkeyCode', 'Teilt keyCode mit', 'Même keyCode que', 'वही keyCode', '共用 keyCode', '共用 keyCode'),
  printableLabel: T('글자가 찍히는가', 'Types a character', 'Escribe un carácter', 'Digita um caractere', '文字が入るか', 'Tippt ein Zeichen', 'Écrit un caractère', 'क्या अक्षर टाइप होता है', '是否输入字符', '是否輸入字元'),
  yes: T('네', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '是', '是'),
  no: T('아니요', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '否', '否'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  layoutTitle: T('code와 key의 차이', 'code versus key', 'code frente a key', 'code versus key', 'codeとkeyの違い', 'code gegen key', 'code contre key', 'code बनाम key', 'code 与 key 的区别', 'code 與 key 的區別'),

  layoutNote: T(
    'code는 자판에서의 자리라 한글이든 프랑스어 자판이든 같은 값입니다. key는 그 순간 찍히는 글자라 바뀝니다 — 같은 자리를 눌러도 a·A·ㅁ가 됩니다. "이 자리를 눌렀나"를 보려면 code, "무엇이 입력됐나"를 보려면 key입니다.',
    'code is the physical position, the same on a Korean or French keyboard. key is what gets typed and changes — the same spot gives a, A or ㅁ. Use code to ask which spot was pressed, key to ask what was entered.',
    'code es la posición física, igual en un teclado coreano o francés. key es lo que se escribe y cambia: el mismo sitio da a, A o ㅁ. Usa code para saber qué sitio se pulsó y key para saber qué se escribió.',
    'code é a posição física, a mesma num teclado coreano ou francês. key é o que se digita e muda — o mesmo lugar dá a, A ou ㅁ. Use code para saber qual lugar foi pressionado e key para saber o que entrou.',
    'codeは自板の位置なので、ハングル配列でもフランス語配列でも同じ値です。keyはその瞬間に打たれる文字なので変わります——同じ場所を押してもa・A・ㅁになります。「どの場所を押したか」ならcode、「何が入ったか」ならkeyです。',
    'code ist die physische Position — auf einer koreanischen wie französischen Tastatur derselbe Wert. key ist das Getippte und ändert sich: derselbe Platz liefert a, A oder ㅁ. Für „welche Stelle wurde gedrückt“ nimmt man code, für „was wurde eingegeben“ key.',
    'code est la position physique, identique sur un clavier coréen ou français. key est ce qui est tapé et change : le même emplacement donne a, A ou ㅁ. Pour « quelle touche a été pressée », prenez code ; pour « qu’est-ce qui a été saisi », key.',
    'code कुंजी की भौतिक जगह है — कोरियाई हो या फ्रेंच कीबोर्ड, मान वही रहता है। key वह है जो टाइप होता है और बदलता है — वही जगह a, A या ㅁ देती है। "कौन-सी जगह दबी" के लिए code, "क्या टाइप हुआ" के लिए key।',
    'code 是键盘上的物理位置，韩文键盘还是法文键盘都一样。key 是当下敲出来的字符，会变——同一个位置可能是 a、A 或 ㅁ。问“按了哪个位置”用 code，问“输入了什么”用 key。',
    'code 是鍵盤上的實體位置，韓文鍵盤還是法文鍵盤都一樣。key 是當下敲出來的字元，會變——同一個位置可能是 a、A 或 ㅁ。問「按了哪個位置」用 code，問「輸入了什麼」用 key。',
  ),

  deprecatedNote: T(
    'keyCode는 표준에서 빠진 값입니다. 새로 쓰는 코드에는 code나 key를 쓰고, 여기 실은 값은 옛 코드를 읽을 때 쓰세요.',
    'keyCode has been dropped from the standard. Write new code against code or key; the numbers here are for reading old code.',
    'keyCode quedó fuera del estándar. Escribe código nuevo con code o key; los números de aquí sirven para leer código antiguo.',
    'keyCode saiu do padrão. Escreva código novo com code ou key; os números daqui servem para ler código antigo.',
    'keyCodeは標準から外れた値です。新しく書くコードではcodeかkeyを使い、ここの数字は古いコードを読むときに使ってください。',
    'keyCode ist aus dem Standard gefallen. Neuen Code schreibt man mit code oder key; die Zahlen hier helfen beim Lesen alten Codes.',
    'keyCode a été retiré du standard. Écrivez du code neuf avec code ou key ; les nombres d’ici servent à lire l’ancien code.',
    'keyCode मानक से हटा दिया गया है। नया कोड code या key से लिखें; यहाँ के अंक पुराना कोड पढ़ने के लिए हैं।',
    'keyCode 已从标准中移除。新代码请用 code 或 key，这里的数字用来读旧代码。',
    'keyCode 已從標準中移除。新程式請用 code 或 key，這裡的數字用來讀舊程式。',
  ),

  variesNote: T<(n: number) => string>(
    n => `파이어폭스는 이 키에 ${n}을 줍니다. 기호 키의 keyCode는 브라우저마다 갈립니다.`,
    n => `Firefox reports ${n} for this key. Punctuation keyCodes differ between browsers.`,
    n => `Firefox devuelve ${n} para esta tecla. Los keyCode de los signos difieren entre navegadores.`,
    n => `O Firefox devolve ${n} para esta tecla. Os keyCode dos sinais diferem entre navegadores.`,
    n => `Firefoxはこのキーに${n}を返します。記号キーのkeyCodeはブラウザごとに分かれます。`,
    n => `Firefox meldet für diese Taste ${n}. Bei Satzzeichen unterscheiden sich die keyCodes je nach Browser.`,
    n => `Firefox renvoie ${n} pour cette touche. Les keyCode de ponctuation diffèrent selon le navigateur.`,
    n => `Firefox इस कुंजी के लिए ${n} देता है। चिह्न कुंजियों के keyCode ब्राउज़र के अनुसार बदलते हैं।`,
    n => `Firefox 对这个键给的是 ${n}。符号键的 keyCode 在各家浏览器并不一致。`,
    n => `Firefox 對這個鍵給的是 ${n}。符號鍵的 keyCode 在各家瀏覽器並不一致。`,
  ),

  snippetTitle: T('코드에서', 'In code', 'En código', 'No código', 'コードでは', 'Im Code', 'Dans le code', 'कोड में', '在代码里', '在程式裡'),

  snippetNote: T(
    'code로 견주면 자판이 바뀌어도 같은 자리를 잡습니다.',
    'Comparing against code keeps working when the layout changes.',
    'Comparar contra code sigue funcionando aunque cambie la distribución.',
    'Comparar com code continua funcionando mesmo se o layout mudar.',
    'codeで比べておけば配列が変わっても同じ場所を捉えられます。',
    'Der Vergleich mit code funktioniert auch, wenn das Layout wechselt.',
    'Comparer avec code continue de marcher si la disposition change.',
    'code से मिलान करने पर लेआउट बदलने पर भी वही जगह पकड़ में रहती है।',
    '用 code 比较，换了键盘布局也还能抓住同一个位置。',
    '用 code 比較，換了鍵盤配置也還能抓住同一個位置。',
  ),

  neighbourTitle: T('같은 갈래의 키', 'Keys of the same kind', 'Teclas del mismo tipo', 'Teclas do mesmo tipo', '同じ仲間のキー', 'Tasten derselben Art', 'Touches du même type', 'उसी प्रकार की कुंजियाँ', '同类的键', '同類的鍵'),

  desc: T<(f: KeyFacts) => string>(
    f => `${f.code}의 keyCode는 ${f.keyCode}이고 key는 ${f.printable ? `"${f.label}"` : f.key}입니다. location은 ${f.location}입니다.${f.shares.length ? ` ${f.shares.join(', ')}와 같은 번호를 씁니다.` : ''}`,
    f => `${f.code} has keyCode ${f.keyCode} and key ${f.printable ? `"${f.label}"` : f.key}, at location ${f.location}.${f.shares.length ? ` It shares that number with ${f.shares.join(', ')}.` : ''}`,
    f => `${f.code} tiene keyCode ${f.keyCode} y key ${f.printable ? `"${f.label}"` : f.key}, en location ${f.location}.${f.shares.length ? ` Comparte ese número con ${f.shares.join(', ')}.` : ''}`,
    f => `${f.code} tem keyCode ${f.keyCode} e key ${f.printable ? `"${f.label}"` : f.key}, em location ${f.location}.${f.shares.length ? ` Divide esse número com ${f.shares.join(', ')}.` : ''}`,
    f => `${f.code}のkeyCodeは${f.keyCode}、keyは${f.printable ? `「${f.label}」` : f.key}、locationは${f.location}です。${f.shares.length ? `${f.shares.join('、')}と同じ番号です。` : ''}`,
    f => `${f.code} hat keyCode ${f.keyCode} und key ${f.printable ? `„${f.label}“` : f.key}, location ${f.location}.${f.shares.length ? ` Diese Nummer teilt sie mit ${f.shares.join(', ')}.` : ''}`,
    f => `${f.code} a le keyCode ${f.keyCode} et la key ${f.printable ? `« ${f.label} »` : f.key}, en location ${f.location}.${f.shares.length ? ` Elle partage ce numéro avec ${f.shares.join(', ')}.` : ''}`,
    f => `${f.code} का keyCode ${f.keyCode} है और key ${f.printable ? `"${f.label}"` : f.key}, location ${f.location}।${f.shares.length ? ` यह वही नंबर ${f.shares.join(', ')} के साथ साझा करती है।` : ''}`,
    f => `${f.code} 的 keyCode 是 ${f.keyCode}，key 是 ${f.printable ? `"${f.label}"` : f.key}，location 为 ${f.location}。${f.shares.length ? `它和 ${f.shares.join('、')} 共用这个号。` : ''}`,
    f => `${f.code} 的 keyCode 是 ${f.keyCode}，key 是 ${f.printable ? `"${f.label}"` : f.key}，location 為 ${f.location}。${f.shares.length ? `它和 ${f.shares.join('、')} 共用這個號。` : ''}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      'code는 자리, key는 찍히는 글자입니다. 단축키를 만들 때는 code로 견주세요.',
      'keyCode는 폐기됐습니다. 옛 코드를 읽을 때만 쓰세요.',
      '왼쪽과 오른쪽 Shift는 keyCode가 같고 location으로 갈립니다.',
      '숫자 줄의 1과 숫자판의 1은 다른 키입니다 — 49와 97입니다.',
    ],
    [
      'code is the position, key is the character typed. Match on code for shortcuts.',
      'keyCode is deprecated; use it only to read old code.',
      'Left and right Shift share a keyCode and are told apart by location.',
      'The 1 on the number row and the 1 on the numpad are different keys — 49 and 97.',
    ],
    [
      'code es la posición y key el carácter escrito. Para atajos, compara con code.',
      'keyCode está obsoleto; úsalo solo para leer código antiguo.',
      'Shift izquierdo y derecho comparten keyCode y se distinguen por location.',
      'El 1 de la fila y el 1 del teclado numérico son teclas distintas: 49 y 97.',
    ],
    [
      'code é a posição e key o caractere digitado. Para atalhos, compare com code.',
      'keyCode está obsoleto; use apenas para ler código antigo.',
      'Shift esquerdo e direito dividem o keyCode e se separam por location.',
      'O 1 da linha e o 1 do teclado numérico são teclas diferentes: 49 e 97.',
    ],
    [
      'codeは位置、keyは打たれる文字です。ショートカットはcodeで比べます。',
      'keyCodeは非推奨です。古いコードを読むときだけ使ってください。',
      '左右のShiftはkeyCodeが同じで、locationで分かれます。',
      '数字段の1とテンキーの1は別のキーです——49と97です。',
    ],
    [
      'code ist die Position, key das getippte Zeichen. Für Kürzel auf code vergleichen.',
      'keyCode ist veraltet; nur zum Lesen alten Codes verwenden.',
      'Linke und rechte Shift teilen den keyCode und unterscheiden sich per location.',
      'Die 1 der Zahlenreihe und die 1 des Ziffernblocks sind verschiedene Tasten — 49 und 97.',
    ],
    [
      'code, c’est la position ; key, le caractère tapé. Pour les raccourcis, comparez code.',
      'keyCode est obsolète : ne s’en servir que pour lire de l’ancien code.',
      'Maj gauche et droite partagent un keyCode et se distinguent par location.',
      'Le 1 de la rangée et le 1 du pavé numérique sont deux touches — 49 et 97.',
    ],
    [
      'code स्थान है, key टाइप हुआ अक्षर। शॉर्टकट के लिए code से मिलान करें।',
      'keyCode अप्रचलित है; केवल पुराना कोड पढ़ने के लिए।',
      'बायाँ और दायाँ Shift एक ही keyCode रखते हैं और location से अलग होते हैं।',
      'संख्या पंक्ति का 1 और नंबरपैड का 1 अलग कुंजियाँ हैं — 49 और 97।',
    ],
    [
      'code 是位置，key 是敲出来的字符。做快捷键要按 code 比较。',
      'keyCode 已废弃，只在读旧代码时用。',
      '左右 Shift 的 keyCode 相同，靠 location 区分。',
      '数字行的 1 和小键盘的 1 是两个键——49 和 97。',
    ],
    [
      'code 是位置，key 是敲出來的字元。做快速鍵要按 code 比較。',
      'keyCode 已廢棄，只在讀舊程式時用。',
      '左右 Shift 的 keyCode 相同，靠 location 區分。',
      '數字列的 1 和數字鍵盤的 1 是兩個鍵——49 和 97。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '키 코드 사전 — code·key·keyCode를 한 자리에서',
    'Key code reference — code, key and keyCode side by side',
    'Diccionario de códigos de tecla — code, key y keyCode juntos',
    'Dicionário de códigos de tecla — code, key e keyCode lado a lado',
    'キーコード事典 — code・key・keyCodeを一か所で',
    'Tastencode-Lexikon — code, key und keyCode nebeneinander',
    'Dictionnaire des codes de touche — code, key et keyCode côte à côte',
    'की कोड कोश — code, key और keyCode एक साथ',
    '键码词典 — code、key、keyCode 一处对照',
    '鍵碼詞典 — code、key、keyCode 一處對照',
  ),

  hubMetaDesc: T(
    '자판 키 120개의 KeyboardEvent 값을 한 장씩. code와 key가 어떻게 다른지, location과 폐기된 keyCode까지 정리했습니다.',
    'One page per key for 120 keys: what KeyboardEvent gives you, how code differs from key, plus location and the deprecated keyCode.',
    'Una página por tecla para 120 teclas: lo que da KeyboardEvent, en qué difieren code y key, más location y el keyCode obsoleto.',
    'Uma página por tecla para 120 teclas: o que o KeyboardEvent dá, como code difere de key, mais location e o keyCode obsoleto.',
    'キー120個のKeyboardEvent値を1ページずつ。codeとkeyの違い、locationと非推奨のkeyCodeまで。',
    'Je eine Seite für 120 Tasten: was ein KeyboardEvent liefert, wie sich code und key unterscheiden, dazu location und der veraltete keyCode.',
    'Une page par touche pour 120 touches : ce que donne KeyboardEvent, la différence entre code et key, plus location et le keyCode obsolète.',
    '120 कुंजियों में हर एक का पृष्ठ: KeyboardEvent क्या देता है, code और key में अंतर, साथ में location और अप्रचलित keyCode।',
    '120 个按键各一页：KeyboardEvent 给出什么、code 与 key 有何不同，以及 location 和已废弃的 keyCode。',
    '120 個按鍵各一頁：KeyboardEvent 給出什麼、code 與 key 有何不同，以及 location 和已廢棄的 keyCode。',
  ),

  metaTitle: T<(f: KeyFacts) => string>(
    f => `${f.code} 키 코드 — keyCode ${f.keyCode}`,
    f => `${f.code} key code — keyCode ${f.keyCode}`,
    f => `Tecla ${f.code} — keyCode ${f.keyCode}`,
    f => `Tecla ${f.code} — keyCode ${f.keyCode} (JS)`,
    f => `${f.code} キーコード — keyCode ${f.keyCode}`,
    f => `Taste ${f.code} — keyCode ${f.keyCode}`,
    f => `Touche ${f.code} — keyCode ${f.keyCode}`,
    f => `${f.code} की कोड — keyCode ${f.keyCode}`,
    f => `${f.code} 键码 — keyCode ${f.keyCode}`,
    f => `${f.code} 鍵碼 — keyCode ${f.keyCode}`,
  ),

  metaDesc: T<(f: KeyFacts) => string>(
    f => `${f.code}의 KeyboardEvent 값입니다. keyCode ${f.keyCode}(${f.hex}), key ${f.key}, location ${f.location}.`,
    f => `The KeyboardEvent values for ${f.code}: keyCode ${f.keyCode} (${f.hex}), key ${f.key}, location ${f.location}.`,
    f => `Los valores de KeyboardEvent para ${f.code}: keyCode ${f.keyCode} (${f.hex}), key ${f.key}, location ${f.location}.`,
    f => `Os valores de KeyboardEvent para ${f.code}: keyCode ${f.keyCode} (${f.hex}), key ${f.key}, location ${f.location}.`,
    f => `${f.code}のKeyboardEvent値です。keyCode ${f.keyCode}（${f.hex}）、key ${f.key}、location ${f.location}。`,
    f => `Die KeyboardEvent-Werte für ${f.code}: keyCode ${f.keyCode} (${f.hex}), key ${f.key}, location ${f.location}.`,
    f => `Les valeurs KeyboardEvent pour ${f.code} : keyCode ${f.keyCode} (${f.hex}), key ${f.key}, location ${f.location}.`,
    f => `${f.code} के KeyboardEvent मान: keyCode ${f.keyCode} (${f.hex}), key ${f.key}, location ${f.location}।`,
    f => `${f.code} 的 KeyboardEvent 值：keyCode ${f.keyCode}（${f.hex}）、key ${f.key}、location ${f.location}。`,
    f => `${f.code} 的 KeyboardEvent 值：keyCode ${f.keyCode}（${f.hex}）、key ${f.key}、location ${f.location}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'code와 key 중 무엇을 써야 하나요?', a: '단축키처럼 자리를 잡아야 하면 code, 무엇이 입력됐는지 알아야 하면 key입니다. code는 자판이 바뀌어도 그대로입니다.' },
      { q: 'keyCode는 왜 쓰지 말라고 하나요?', a: '표준에서 빠졌고 브라우저마다 값이 갈립니다. 기호 키에서 특히 그렇습니다.' },
      { q: 'Enter의 키 코드는 몇 번인가요?', a: 'keyCode는 13이고 code는 Enter입니다. 숫자판의 Enter는 code가 NumpadEnter이지만 keyCode는 똑같이 13입니다.' },
      { q: '왼쪽 Shift와 오른쪽 Shift를 어떻게 구별하나요?', a: 'keyCode는 둘 다 16이라 구별되지 않습니다. code(ShiftLeft·ShiftRight)나 location(1·2)을 보세요.' },
      { q: '한글 자판에서도 code가 같나요?', a: '같습니다. ㅁ이 찍히는 자리를 눌러도 code는 KeyA입니다 — 자리를 가리키는 값이기 때문입니다.' },
    ],
    [
      { q: 'Should I use code or key?', a: 'code when you need the position, as for shortcuts; key when you need what was typed. code survives a change of layout.' },
      { q: 'Why avoid keyCode?', a: 'It was dropped from the standard and browsers disagree on the values, especially for punctuation.' },
      { q: 'What is the key code for Enter?', a: 'keyCode 13, code Enter. The Enter on the numpad has code NumpadEnter but the same keyCode 13.' },
      { q: 'How do I tell left Shift from right Shift?', a: 'Not by keyCode — both are 16. Use code (ShiftLeft, ShiftRight) or location (1, 2).' },
      { q: 'Is code the same on a Korean keyboard?', a: 'Yes. Pressing the spot that types ㅁ still reports KeyA, because code names the position.' },
    ],
    [
      { q: '¿Debo usar code o key?', a: 'code cuando necesitas la posición, como en los atajos; key cuando necesitas lo que se escribió. code sobrevive a un cambio de distribución.' },
      { q: '¿Por qué evitar keyCode?', a: 'Se retiró del estándar y los navegadores no coinciden en los valores, sobre todo en los signos.' },
      { q: '¿Cuál es el código de Enter?', a: 'keyCode 13, code Enter. El Enter del teclado numérico tiene code NumpadEnter pero el mismo keyCode 13.' },
      { q: '¿Cómo distingo Shift izquierdo de derecho?', a: 'Por keyCode no: ambos son 16. Usa code (ShiftLeft, ShiftRight) o location (1, 2).' },
      { q: '¿El code es igual en un teclado coreano?', a: 'Sí. Pulsar el sitio que escribe ㅁ sigue dando KeyA, porque code nombra la posición.' },
    ],
    [
      { q: 'Devo usar code ou key?', a: 'code quando você precisa da posição, como em atalhos; key quando precisa do que foi digitado. code sobrevive à troca de layout.' },
      { q: 'Por que evitar keyCode?', a: 'Saiu do padrão e os navegadores discordam dos valores, sobretudo nos sinais.' },
      { q: 'Qual é o código do Enter?', a: 'keyCode 13, code Enter. O Enter do teclado numérico tem code NumpadEnter mas o mesmo keyCode 13.' },
      { q: 'Como distinguir Shift esquerdo do direito?', a: 'Pelo keyCode não dá: ambos são 16. Use code (ShiftLeft, ShiftRight) ou location (1, 2).' },
      { q: 'O code é o mesmo num teclado coreano?', a: 'É. Apertar o lugar que digita ㅁ continua dando KeyA, porque code nomeia a posição.' },
    ],
    [
      { q: 'codeとkeyのどちらを使うべきですか？', a: 'ショートカットのように場所を捉えるならcode、何が入力されたかを知るならkeyです。codeは配列が変わってもそのままです。' },
      { q: 'keyCodeを避けるのはなぜですか？', a: '標準から外れており、ブラウザごとに値が食い違うからです。特に記号キーでそうです。' },
      { q: 'Enterのキーコードは？', a: 'keyCodeは13、codeはEnterです。テンキーのEnterはcodeがNumpadEnterですが、keyCodeは同じ13です。' },
      { q: '左右のShiftはどう見分けますか？', a: 'keyCodeはどちらも16で見分けられません。code（ShiftLeft・ShiftRight）かlocation（1・2）を見てください。' },
      { q: 'ハングル配列でもcodeは同じですか？', a: '同じです。ㅁが打たれる場所を押してもcodeはKeyAです——場所を指す値だからです。' },
    ],
    [
      { q: 'code oder key — was nehmen?', a: 'code, wenn es um die Position geht, etwa bei Kürzeln; key, wenn es um das Getippte geht. code übersteht einen Layoutwechsel.' },
      { q: 'Warum keyCode meiden?', a: 'Es ist aus dem Standard gefallen, und die Browser sind sich über die Werte uneins — vor allem bei Satzzeichen.' },
      { q: 'Welchen Code hat Enter?', a: 'keyCode 13, code Enter. Das Enter am Ziffernblock hat code NumpadEnter, aber denselben keyCode 13.' },
      { q: 'Wie unterscheide ich linke und rechte Shift?', a: 'Über keyCode gar nicht — beide sind 16. Nimm code (ShiftLeft, ShiftRight) oder location (1, 2).' },
      { q: 'Ist code auf einer koreanischen Tastatur gleich?', a: 'Ja. Die Stelle, die ㅁ tippt, meldet weiterhin KeyA, denn code benennt die Position.' },
    ],
    [
      { q: 'Faut-il utiliser code ou key ?', a: 'code quand il faut la position, comme pour les raccourcis ; key quand il faut ce qui a été tapé. code résiste à un changement de disposition.' },
      { q: 'Pourquoi éviter keyCode ?', a: 'Il a été retiré du standard et les navigateurs divergent sur les valeurs, surtout pour la ponctuation.' },
      { q: 'Quel est le code de Entrée ?', a: 'keyCode 13, code Enter. L’Entrée du pavé numérique a le code NumpadEnter mais le même keyCode 13.' },
      { q: 'Comment distinguer Maj gauche et droite ?', a: 'Pas par keyCode : les deux valent 16. Utilisez code (ShiftLeft, ShiftRight) ou location (1, 2).' },
      { q: 'Le code est-il le même sur un clavier coréen ?', a: 'Oui. L’emplacement qui tape ㅁ renvoie toujours KeyA, car code désigne la position.' },
    ],
    [
      { q: 'code या key — क्या इस्तेमाल करें?', a: 'जहाँ स्थान चाहिए (जैसे शॉर्टकट) वहाँ code; जहाँ यह जानना हो कि क्या टाइप हुआ वहाँ key। लेआउट बदलने पर भी code वही रहता है।' },
      { q: 'keyCode से क्यों बचें?', a: 'यह मानक से हटा दिया गया है और ब्राउज़रों के मान अलग-अलग हैं, खासकर चिह्न कुंजियों पर।' },
      { q: 'Enter का की कोड क्या है?', a: 'keyCode 13, code Enter। नंबरपैड वाले Enter का code NumpadEnter है, पर keyCode वही 13।' },
      { q: 'बायाँ और दायाँ Shift कैसे पहचानें?', a: 'keyCode से नहीं — दोनों 16 हैं। code (ShiftLeft, ShiftRight) या location (1, 2) देखिए।' },
      { q: 'क्या कोरियाई कीबोर्ड पर भी code वही है?', a: 'हाँ। जिस जगह ㅁ टाइप होता है, वहाँ भी code KeyA ही आता है — क्योंकि code स्थान बताता है।' },
    ],
    [
      { q: '该用 code 还是 key？', a: '要抓位置（比如快捷键）用 code，要知道输入了什么用 key。换了键盘布局，code 依然不变。' },
      { q: '为什么不建议用 keyCode？', a: '它已从标准移除，而且各浏览器给的值并不一致，符号键尤其如此。' },
      { q: 'Enter 的键码是多少？', a: 'keyCode 是 13，code 是 Enter。小键盘上的 Enter，code 是 NumpadEnter，keyCode 同样是 13。' },
      { q: '怎么区分左右 Shift？', a: '靠 keyCode 分不出来，两个都是 16。看 code（ShiftLeft、ShiftRight）或 location（1、2）。' },
      { q: '韩文键盘上的 code 一样吗？', a: '一样。按下打出 ㅁ 的那个位置，code 仍然是 KeyA——因为 code 指的是位置。' },
    ],
    [
      { q: '該用 code 還是 key？', a: '要抓位置（例如快速鍵）用 code，要知道輸入了什麼用 key。換了鍵盤配置，code 依然不變。' },
      { q: '為什麼不建議用 keyCode？', a: '它已從標準移除，而且各瀏覽器給的值並不一致，符號鍵尤其如此。' },
      { q: 'Enter 的鍵碼是多少？', a: 'keyCode 是 13，code 是 Enter。數字鍵盤上的 Enter，code 是 NumpadEnter，keyCode 同樣是 13。' },
      { q: '怎麼區分左右 Shift？', a: '靠 keyCode 分不出來，兩個都是 16。看 code（ShiftLeft、ShiftRight）或 location（1、2）。' },
      { q: '韓文鍵盤上的 code 一樣嗎？', a: '一樣。按下打出 ㅁ 的那個位置，code 仍然是 KeyA——因為 code 指的是位置。' },
    ],
  ),

  keyFaq: T<(f: KeyFacts) => FaqItem[]>(
    f => [
      { q: `${f.code}의 keyCode는 몇 번인가요?`, a: `${f.keyCode}입니다. 16진수로는 ${f.hex}입니다.` },
      { q: `${f.code}를 코드에서 어떻게 잡나요?`, a: `e.code === '${f.code}'로 견주세요. keyCode를 쓰면 브라우저와 자판에 따라 흔들립니다.` },
      { q: `이 키의 location은 무엇인가요?`, a: `${f.location}입니다.${f.shares.length ? ` ${f.shares.join(', ')}와 keyCode가 같아, 구별하려면 이 값이 필요합니다.` : ''}` },
      { q: `이 키를 누르면 글자가 찍히나요?`, a: f.printable ? `네. key는 "${f.label}"입니다${f.shift ? `. Shift와 함께 누르면 "${f.shift}"입니다` : ''}.` : `아니요. key는 ${f.key}이고 글자는 입력되지 않습니다.` },
    ],
    f => [
      { q: `What is the keyCode for ${f.code}?`, a: `${f.keyCode}, or ${f.hex} in hexadecimal.` },
      { q: `How do I match ${f.code} in code?`, a: `Compare with e.code === '${f.code}'. Matching on keyCode wobbles between browsers and layouts.` },
      { q: `What is this key's location?`, a: `${f.location}.${f.shares.length ? ` It shares a keyCode with ${f.shares.join(', ')}, so you need this value to tell them apart.` : ''}` },
      { q: `Does this key type a character?`, a: f.printable ? `Yes — key is "${f.label}"${f.shift ? `, and "${f.shift}" with Shift held` : ''}.` : `No. key is ${f.key} and nothing is entered.` },
    ],
    f => [
      { q: `¿Cuál es el keyCode de ${f.code}?`, a: `${f.keyCode}, o ${f.hex} en hexadecimal.` },
      { q: `¿Cómo detecto ${f.code} en código?`, a: `Compara con e.code === '${f.code}'. Comparar con keyCode baila entre navegadores y distribuciones.` },
      { q: `¿Cuál es el location de esta tecla?`, a: `${f.location}.${f.shares.length ? ` Comparte keyCode con ${f.shares.join(', ')}, así que hace falta este valor para distinguirlas.` : ''}` },
      { q: `¿Esta tecla escribe un carácter?`, a: f.printable ? `Sí: key es "${f.label}"${f.shift ? `, y "${f.shift}" con Shift` : ''}.` : `No. key es ${f.key} y no se escribe nada.` },
    ],
    f => [
      { q: `Qual é o keyCode de ${f.code}?`, a: `${f.keyCode}, ou ${f.hex} em hexadecimal.` },
      { q: `Como detecto ${f.code} no código?`, a: `Compare com e.code === '${f.code}'. Comparar por keyCode oscila entre navegadores e layouts.` },
      { q: `Qual é o location desta tecla?`, a: `${f.location}.${f.shares.length ? ` Ela divide o keyCode com ${f.shares.join(', ')}, então esse valor é o que as separa.` : ''}` },
      { q: `Esta tecla digita um caractere?`, a: f.printable ? `Sim: key é "${f.label}"${f.shift ? `, e "${f.shift}" com Shift` : ''}.` : `Não. key é ${f.key} e nada é digitado.` },
    ],
    f => [
      { q: `${f.code}のkeyCodeは？`, a: `${f.keyCode}です。16進数では${f.hex}。` },
      { q: `${f.code}をコードでどう捉えますか？`, a: `e.code === '${f.code}' で比べてください。keyCodeで比べるとブラウザや配列で揺れます。` },
      { q: `このキーのlocationは？`, a: `${f.location}です。${f.shares.length ? `${f.shares.join('、')}とkeyCodeが同じなので、見分けるにはこの値が要ります。` : ''}` },
      { q: `このキーで文字は入りますか？`, a: f.printable ? `はい。keyは「${f.label}」です${f.shift ? `。Shiftと一緒なら「${f.shift}」です` : ''}。` : `いいえ。keyは${f.key}で、文字は入りません。` },
    ],
    f => [
      { q: `Welchen keyCode hat ${f.code}?`, a: `${f.keyCode}, hexadezimal ${f.hex}.` },
      { q: `Wie prüfe ich ${f.code} im Code?`, a: `Mit e.code === '${f.code}' vergleichen. Über keyCode schwankt es je nach Browser und Layout.` },
      { q: `Welche location hat diese Taste?`, a: `${f.location}.${f.shares.length ? ` Sie teilt den keyCode mit ${f.shares.join(', ')} — erst dieser Wert trennt sie.` : ''}` },
      { q: `Tippt diese Taste ein Zeichen?`, a: f.printable ? `Ja — key ist „${f.label}“${f.shift ? `, mit Shift „${f.shift}“` : ''}.` : `Nein. key ist ${f.key}, es wird nichts eingegeben.` },
    ],
    f => [
      { q: `Quel keyCode pour ${f.code} ?`, a: `${f.keyCode}, soit ${f.hex} en hexadécimal.` },
      { q: `Comment détecter ${f.code} dans le code ?`, a: `Comparez avec e.code === '${f.code}'. Par keyCode, cela varie selon le navigateur et la disposition.` },
      { q: `Quelle est la location de cette touche ?`, a: `${f.location}.${f.shares.length ? ` Elle partage son keyCode avec ${f.shares.join(', ')} : c’est cette valeur qui les sépare.` : ''}` },
      { q: `Cette touche écrit-elle un caractère ?`, a: f.printable ? `Oui : key vaut « ${f.label} »${f.shift ? `, et « ${f.shift} » avec Maj` : ''}.` : `Non. key vaut ${f.key} et rien n’est saisi.` },
    ],
    f => [
      { q: `${f.code} का keyCode क्या है?`, a: `${f.keyCode}, हेक्स में ${f.hex}।` },
      { q: `कोड में ${f.code} को कैसे पकड़ें?`, a: `e.code === '${f.code}' से मिलान करें। keyCode से मिलान ब्राउज़र और लेआउट के साथ डगमगाता है।` },
      { q: `इस कुंजी का location क्या है?`, a: `${f.location}।${f.shares.length ? ` इसका keyCode ${f.shares.join(', ')} के साथ साझा है, इसलिए अंतर बताने को यही मान चाहिए।` : ''}` },
      { q: `क्या इस कुंजी से अक्षर टाइप होता है?`, a: f.printable ? `हाँ — key "${f.label}" है${f.shift ? `, और Shift के साथ "${f.shift}"` : ''}।` : `नहीं। key ${f.key} है और कुछ टाइप नहीं होता।` },
    ],
    f => [
      { q: `${f.code} 的 keyCode 是多少？`, a: `${f.keyCode}，十六进制是 ${f.hex}。` },
      { q: `代码里怎么判断 ${f.code}？`, a: `用 e.code === '${f.code}' 比较。用 keyCode 判断，会随浏览器和键盘布局摇摆。` },
      { q: `这个键的 location 是多少？`, a: `${f.location}。${f.shares.length ? `它和 ${f.shares.join('、')} 共用 keyCode，要区分就得靠这个值。` : ''}` },
      { q: `按这个键会输入字符吗？`, a: f.printable ? `会，key 是 "${f.label}"${f.shift ? `，按住 Shift 则是 "${f.shift}"` : ''}。` : `不会。key 是 ${f.key}，不输入任何字符。` },
    ],
    f => [
      { q: `${f.code} 的 keyCode 是多少？`, a: `${f.keyCode}，十六進位是 ${f.hex}。` },
      { q: `程式裡怎麼判斷 ${f.code}？`, a: `用 e.code === '${f.code}' 比較。用 keyCode 判斷，會隨瀏覽器和鍵盤配置搖擺。` },
      { q: `這個鍵的 location 是多少？`, a: `${f.location}。${f.shares.length ? `它和 ${f.shares.join('、')} 共用 keyCode，要區分就得靠這個值。` : ''}` },
      { q: `按這個鍵會輸入字元嗎？`, a: f.printable ? `會，key 是 "${f.label}"${f.shift ? `，按住 Shift 則是 "${f.shift}"` : ''}。` : `不會。key 是 ${f.key}，不輸入任何字元。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const KEYCODE_UI: L<KeycodeUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<KeycodeUI>;
