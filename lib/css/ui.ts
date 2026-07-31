/**
 * CSS 속성 화면의 문구 — 열 언어.
 *
 * 속성마다 다른 설명은 desc.ts에 있고, 여기에는 화면 틀과 갈래 이름만 둔다.
 * 속성 이름과 값은 표준이 정한 영어라 옮기지 않는다 — display: flex는 어디서나
 * display: flex다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PropKind } from './props.ts';
import type { PropFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface CssUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<PropKind, string>;
  kindNote: Record<PropKind, string>;
  writeLabel: string;
  valuesLabel: string;
  inheritLabel: string;
  inheritYes: string;
  inheritNo: string;
  shorthandLabel: string;
  partOfLabel: string;
  kindTitle: string;
  docLabel: string;
  relatedTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string) => string;
  metaDesc: (name: string, desc: string) => string;
  hubFaq: FaqItem[];
  propFaq: (f: PropFacts, desc: string, kind: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof CssUI]: L<CssUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('CSS 속성', 'CSS properties', 'Propiedades CSS', 'Propriedades CSS', 'CSSプロパティ', 'CSS-Eigenschaften', 'Propriétés CSS', 'CSS प्रॉपर्टी', 'CSS 属性', 'CSS 屬性'),

  hubTitle: T(
    'CSS 속성 154개 사전',
    'A reference of 154 CSS properties',
    'Referencia de 154 propiedades CSS',
    'Referência de 154 propriedades CSS',
    'CSSプロパティ154個の辞典',
    'Nachschlagewerk mit 154 CSS-Eigenschaften',
    'Référence de 154 propriétés CSS',
    '154 CSS प्रॉपर्टी की संदर्भ सूची',
    'CSS 属性词典 154 条',
    'CSS 屬性辭典 154 條',
  ),

  hubLead: T(
    '속성마다 무엇을 하는지, 자주 쓰는 값은 무엇인지, 자식에게 물려주는지를 한 줄로 정리했습니다.',
    'What each property does, the values people actually use, and whether it is inherited — one line each.',
    'Qué hace cada propiedad, qué valores se usan de verdad y si se hereda, en una línea.',
    'O que cada propriedade faz, quais valores se usam de fato e se é herdada, em uma linha.',
    'それぞれのプロパティが何をするか、よく使う値は何か、子に受け継がれるかを一行でまとめました。',
    'Was jede Eigenschaft tut, welche Werte man wirklich nutzt und ob sie vererbt wird — je eine Zeile.',
    "Ce que fait chaque propriété, les valeurs réellement utilisées et si elle s'hérite — une ligne chacune.",
    'हर प्रॉपर्टी क्या करती है, कौन-से मान असल में काम आते हैं और क्या वह विरासत में जाती है — एक-एक पंक्ति में।',
    '每个属性做什么、常用的值有哪些、会不会传给子元素，一行说清。',
    '每個屬性做什麼、常用的值有哪些、會不會傳給子元素，一行說清。',
  ),

  kindLabel: T(
    { layout: '배치', flexgrid: '플렉스·그리드', box: '상자와 여백', text: '글자', color: '색과 배경', border: '테두리', effect: '효과', transform: '변형과 움직임', position: '위치', table: '표', list: '목록', interaction: '조작', print: '인쇄·기타' },
    { layout: 'Layout', flexgrid: 'Flexbox and grid', box: 'Box and spacing', text: 'Text', color: 'Colour and background', border: 'Borders', effect: 'Effects', transform: 'Transform and motion', position: 'Positioning', table: 'Tables', list: 'Lists', interaction: 'Interaction', print: 'Print and misc' },
    { layout: 'Maquetación', flexgrid: 'Flexbox y grid', box: 'Caja y espaciado', text: 'Texto', color: 'Color y fondo', border: 'Bordes', effect: 'Efectos', transform: 'Transformación y movimiento', position: 'Posicionamiento', table: 'Tablas', list: 'Listas', interaction: 'Interacción', print: 'Impresión y varios' },
    { layout: 'Layout', flexgrid: 'Flexbox e grid', box: 'Caixa e espaçamento', text: 'Texto', color: 'Cor e fundo', border: 'Bordas', effect: 'Efeitos', transform: 'Transformação e movimento', position: 'Posicionamento', table: 'Tabelas', list: 'Listas', interaction: 'Interação', print: 'Impressão e diversos' },
    { layout: 'レイアウト', flexgrid: 'フレックスとグリッド', box: '箱と余白', text: '文字', color: '色と背景', border: '枠線', effect: '効果', transform: '変形と動き', position: '位置', table: '表', list: '一覧', interaction: '操作', print: '印刷とその他' },
    { layout: 'Layout', flexgrid: 'Flexbox und Grid', box: 'Box und Abstände', text: 'Text', color: 'Farbe und Hintergrund', border: 'Rahmen', effect: 'Effekte', transform: 'Transformation und Bewegung', position: 'Positionierung', table: 'Tabellen', list: 'Listen', interaction: 'Interaktion', print: 'Druck und Sonstiges' },
    { layout: 'Mise en page', flexgrid: 'Flexbox et grille', box: 'Boîte et espacements', text: 'Texte', color: 'Couleur et fond', border: 'Bordures', effect: 'Effets', transform: 'Transformations et animations', position: 'Positionnement', table: 'Tableaux', list: 'Listes', interaction: 'Interaction', print: 'Impression et divers' },
    { layout: 'लेआउट', flexgrid: 'फ़्लेक्स और ग्रिड', box: 'बॉक्स और जगह', text: 'पाठ', color: 'रंग और पृष्ठभूमि', border: 'बॉर्डर', effect: 'प्रभाव', transform: 'रूपांतरण और गति', position: 'स्थिति', table: 'तालिकाएँ', list: 'सूचियाँ', interaction: 'परस्पर क्रिया', print: 'प्रिंट और अन्य' },
    { layout: '布局', flexgrid: '弹性与网格', box: '盒子与间距', text: '文字', color: '颜色与背景', border: '边框', effect: '效果', transform: '变形与动效', position: '定位', table: '表格', list: '列表', interaction: '交互', print: '打印与其他' },
    { layout: '版面', flexgrid: '彈性與格線', box: '盒子與間距', text: '文字', color: '顏色與背景', border: '邊框', effect: '效果', transform: '變形與動效', position: '定位', table: '表格', list: '清單', interaction: '互動', print: '列印與其他' },
  ),

  kindNote: T(
    {
      layout: '요소를 어떤 상자로 다룰지, 넘칠 때 어떻게 할지 정하는 속성들입니다.',
      flexgrid: '요소를 줄 세우고 격자에 앉히는 속성들입니다. 오늘날 배치는 대부분 이 둘로 합니다.',
      box: '크기와 여백입니다. 바깥 여백은 겹쳐 합쳐지고, 안쪽 여백에는 배경색이 칠해집니다.',
      text: '글꼴과 줄 간격, 정렬처럼 읽히는 모양을 정합니다. 대부분 자식에게 물려집니다.',
      color: '글자색과 배경색, 그러데이션과 투명도입니다.',
      border: '테두리와 모서리, 그림자입니다. outline은 자리를 차지하지 않습니다.',
      effect: '흐림·자르기·채우기처럼 다 그린 뒤에 거는 효과입니다.',
      transform: '옮기고 돌리고 부드럽게 잇습니다. 배치를 건드리지 않아 화면이 덜 흔들립니다.',
      position: '요소를 흐름에서 떼어 원하는 자리에 놓습니다. 앞뒤는 z-index로 정합니다.',
      table: '표의 테두리와 칸 너비를 다루는 속성들입니다.',
      list: '목록 기호의 모양과 자리를 정합니다.',
      interaction: '마우스와 손가락, 스크롤에 어떻게 반응할지 정합니다.',
      print: '인쇄와 자동 번호 매기기처럼 나머지 쓰임입니다.',
    },
    {
      layout: 'Properties that decide what kind of box an element is and what happens when it overflows.',
      flexgrid: 'Properties that line elements up and seat them in a grid — most layout today is one of these two.',
      box: 'Size and spacing. Outer margins collapse into each other; inner padding is painted by the background.',
      text: 'Typeface, line spacing, alignment — how the text reads. Most of these are inherited.',
      color: 'Text colour, background colour, gradients and transparency.',
      border: 'Borders, corners and shadows. An outline takes up no space of its own.',
      effect: 'Effects applied after everything is painted — blurring, clipping, filling.',
      transform: 'Moving, rotating and easing. These leave the layout untouched, so nothing else jumps.',
      position: 'Lifting an element out of the flow and placing it; z-index decides what sits in front.',
      table: 'Properties for table borders and column widths.',
      list: 'The shape and placement of list markers.',
      interaction: 'How the element answers the mouse, the finger and the scroll.',
      print: 'The rest — printing, generated content and automatic numbering.',
    },
    {
      layout: 'Propiedades que deciden qué tipo de caja es un elemento y qué pasa cuando desborda.',
      flexgrid: 'Propiedades que alinean elementos y los colocan en una cuadrícula: hoy casi toda maquetación usa una de las dos.',
      box: 'Tamaño y espaciado. Los márgenes exteriores se colapsan; el relleno lo pinta el fondo.',
      text: 'Tipografía, interlineado, alineación: cómo se lee el texto. La mayoría se hereda.',
      color: 'Color de texto, color de fondo, degradados y transparencia.',
      border: 'Bordes, esquinas y sombras. El contorno no ocupa espacio propio.',
      effect: 'Efectos aplicados tras el pintado: desenfoque, recorte, relleno.',
      transform: 'Mover, girar y suavizar. No tocan la maquetación, así que nada salta.',
      position: 'Sacar un elemento del flujo y colocarlo; z-index decide qué queda delante.',
      table: 'Propiedades para bordes de tabla y ancho de columnas.',
      list: 'La forma y la posición de los marcadores de lista.',
      interaction: 'Cómo responde el elemento al ratón, al dedo y al desplazamiento.',
      print: 'El resto: impresión, contenido generado y numeración automática.',
    },
    {
      layout: 'Propriedades que decidem que tipo de caixa um elemento é e o que acontece ao transbordar.',
      flexgrid: 'Propriedades que alinham elementos e os assentam numa grade: hoje quase todo layout usa uma das duas.',
      box: 'Tamanho e espaçamento. As margens externas se colapsam; o preenchimento é pintado pelo fundo.',
      text: 'Fonte, entrelinha, alinhamento: como o texto se lê. A maioria é herdada.',
      color: 'Cor do texto, cor de fundo, gradientes e transparência.',
      border: 'Bordas, cantos e sombras. O contorno não ocupa espaço próprio.',
      effect: 'Efeitos aplicados depois da pintura: desfoque, recorte, preenchimento.',
      transform: 'Mover, girar e suavizar. Não mexem no layout, então nada salta.',
      position: 'Tirar um elemento do fluxo e posicioná-lo; z-index decide quem fica à frente.',
      table: 'Propriedades para bordas de tabela e largura de colunas.',
      list: 'A forma e a posição dos marcadores de lista.',
      interaction: 'Como o elemento responde ao mouse, ao dedo e à rolagem.',
      print: 'O resto: impressão, conteúdo gerado e numeração automática.',
    },
    {
      layout: '要素をどんな箱として扱うか、はみ出したときどうするかを決める属性です。',
      flexgrid: '要素を並べ、格子に配置する属性です。今日のレイアウトはほとんどこの二つで組みます。',
      box: '大きさと余白です。外の余白は重なって一つになり、内の余白には背景色が塗られます。',
      text: '書体や行間、揃え方など読まれる形を決めます。多くは子に受け継がれます。',
      color: '文字色と背景色、グラデーションと透明度です。',
      border: '枠線と角、影です。outlineは場所を取りません。',
      effect: '描き終えたあとにかける効果です — ぼかし、切り抜き、塗りつぶし。',
      transform: '動かし、回し、なめらかにつなぎます。レイアウトに触れないので画面が揺れにくくなります。',
      position: '要素を流れから外して置きます。前後はz-indexで決めます。',
      table: '表の枠線と列幅を扱う属性です。',
      list: '目印の形と置き場所を決めます。',
      interaction: 'マウスや指、スクロールにどう応じるかを決めます。',
      print: '印刷や自動採番など、残りの用途です。',
    },
    {
      layout: 'Eigenschaften, die bestimmen, welche Box ein Element ist und was bei Überlauf passiert.',
      flexgrid: 'Eigenschaften, die Elemente ausrichten und in ein Raster setzen — modernes Layout nutzt fast immer eines von beiden.',
      box: 'Größe und Abstände. Außenabstände fallen zusammen, Innenabstände füllt der Hintergrund.',
      text: 'Schrift, Zeilenabstand, Ausrichtung — wie sich Text liest. Das meiste davon wird vererbt.',
      color: 'Textfarbe, Hintergrundfarbe, Verläufe und Transparenz.',
      border: 'Rahmen, Ecken und Schatten. Eine Outline braucht keinen eigenen Platz.',
      effect: 'Effekte nach dem Zeichnen — Weichzeichnen, Beschneiden, Füllen.',
      transform: 'Verschieben, Drehen und weiches Überblenden. Das Layout bleibt unberührt.',
      position: 'Ein Element aus dem Fluss heben und platzieren; z-index entscheidet, was vorn liegt.',
      table: 'Eigenschaften für Tabellenrahmen und Spaltenbreiten.',
      list: 'Form und Platz der Listenmarker.',
      interaction: 'Wie das Element auf Maus, Finger und Scrollen reagiert.',
      print: 'Der Rest — Druck, erzeugter Inhalt und automatische Nummerierung.',
    },
    {
      layout: "Les propriétés qui décident du type de boîte et de ce qui arrive en cas de débordement.",
      flexgrid: 'Les propriétés qui alignent les éléments et les posent sur une grille : presque toute mise en page moderne passe par là.',
      box: "Taille et espacements. Les marges extérieures fusionnent ; la marge intérieure est peinte par le fond.",
      text: "Police, interligne, alignement : la façon dont le texte se lit. La plupart s'héritent.",
      color: 'Couleur du texte, du fond, dégradés et transparence.',
      border: "Bordures, coins et ombres. Le contour n'occupe aucune place.",
      effect: 'Des effets appliqués une fois le rendu fait : flou, découpe, remplissage.',
      transform: "Déplacer, tourner, adoucir. La mise en page reste intacte, rien ne saute.",
      position: "Sortir un élément du flux et le placer ; z-index décide qui passe devant.",
      table: 'Les propriétés des bordures de tableau et des largeurs de colonnes.',
      list: 'La forme et la place des marqueurs de liste.',
      interaction: "Comment l'élément répond à la souris, au doigt et au défilement.",
      print: "Le reste : impression, contenu généré et numérotation automatique.",
    },
    {
      layout: 'वे प्रॉपर्टी जो तय करती हैं कि तत्व किस तरह का बॉक्स है और उमड़ने पर क्या हो।',
      flexgrid: 'वे प्रॉपर्टी जो तत्वों को पंक्तिबद्ध करती और ग्रिड में बैठाती हैं — आज का अधिकांश लेआउट इन्हीं दो से बनता है।',
      box: 'आकार और जगह। बाहरी मार्जिन आपस में मिल जाते हैं; भीतरी पैडिंग पर पृष्ठभूमि का रंग चढ़ता है।',
      text: 'फ़ॉन्ट, पंक्ति अंतराल, संरेखण — पाठ कैसे पढ़ा जाए। इनमें से अधिकांश विरासत में जाती हैं।',
      color: 'पाठ का रंग, पृष्ठभूमि रंग, ग्रेडिएंट और पारदर्शिता।',
      border: 'बॉर्डर, कोने और छाया। आउटलाइन अपनी कोई जगह नहीं लेती।',
      effect: 'सब कुछ रंगने के बाद लगने वाले प्रभाव — धुँधलापन, कटाई, भराई।',
      transform: 'खिसकाना, घुमाना और सहज संक्रमण। लेआउट अछूता रहता है, इसलिए बाक़ी कुछ नहीं उछलता।',
      position: 'तत्व को प्रवाह से हटाकर रखना; z-index तय करता है कि आगे कौन रहे।',
      table: 'तालिका के बॉर्डर और स्तंभ चौड़ाई की प्रॉपर्टी।',
      list: 'सूची मार्करों का आकार और स्थान।',
      interaction: 'तत्व माउस, उँगली और स्क्रॉल पर कैसे प्रतिक्रिया दे।',
      print: 'बाक़ी सब — छपाई, उत्पन्न सामग्री और स्वतः संख्यांकन।',
    },
    {
      layout: '决定元素当作哪种盒子处理、内容溢出时怎么办的一类属性。',
      flexgrid: '把元素排成行、摆进格子的一类属性。今天的布局大半靠这两套。',
      box: '尺寸和间距。外边距上下会合并，内边距上会铺背景色。',
      text: '字体、行高、对齐这些决定读起来什么样的属性。大多会传给子元素。',
      color: '文字色、背景色、渐变和透明度。',
      border: '边框、圆角和阴影。outline 不占位置。',
      effect: '模糊、裁切、遮罩这类画完之后再加上去的效果。',
      transform: '位移、旋转和平滑过渡。不动布局，所以画面不容易抖。',
      position: '把元素从文档流里拎出来放到指定位置。前后顺序由 z-index 定。',
      table: '管表格边框和列宽的一类属性。',
      list: '决定列表标记的样子和位置。',
      interaction: '决定怎么响应鼠标、手指和滚动。',
      print: '打印和自动编号这些剩下的用途。',
    },
    {
      layout: '決定元素當作哪種盒子處理、內容溢出時怎麼辦的一類屬性。',
      flexgrid: '把元素排成行、擺進格子的一類屬性。今天的版面大半靠這兩套。',
      box: '尺寸和間距。外距上下會合併，內距上會鋪背景色。',
      text: '字型、行高、對齊這些決定讀起來什麼樣的屬性。大多會傳給子元素。',
      color: '文字色、背景色、漸層和透明度。',
      border: '邊框、圓角和陰影。outline 不占位置。',
      effect: '模糊、裁切、遮罩這類畫完之後再加上去的效果。',
      transform: '位移、旋轉和平滑過渡。不動版面，所以畫面不容易抖。',
      position: '把元素從文件流裡拎出來放到指定位置。前後順序由 z-index 定。',
      table: '管表格邊框和欄寬的一類屬性。',
      list: '決定清單標記的樣子和位置。',
      interaction: '決定怎麼回應滑鼠、手指和捲動。',
      print: '列印和自動編號這些剩下的用途。',
    },
  ),

  writeLabel: T('쓰는 법', 'How to write it', 'Cómo se escribe', 'Como escrever', '書き方', 'Schreibweise', 'Écriture', 'कैसे लिखें', '怎么写', '怎麼寫'),
  valuesLabel: T('자주 쓰는 값', 'Common values', 'Valores habituales', 'Valores comuns', 'よく使う値', 'Gängige Werte', 'Valeurs courantes', 'सामान्य मान', '常用的值', '常用的值'),
  inheritLabel: T('상속', 'Inherited', 'Se hereda', 'Herdada', '継承', 'Vererbt', 'Héritée', 'विरासत', '继承', '繼承'),
  inheritYes: T('자식에게 물려줍니다', 'Yes — children receive it', 'Sí, los hijos la reciben', 'Sim, os filhos recebem', 'はい — 子に受け継がれます', 'Ja — Kinder übernehmen sie', 'Oui — les enfants en héritent', 'हाँ — बच्चों को मिलती है', '会传给子元素', '會傳給子元素'),
  inheritNo: T('물려주지 않습니다', 'No — it stops at this element', 'No, se queda en este elemento', 'Não, para neste elemento', 'いいえ — この要素で止まります', 'Nein — sie endet hier', 'Non — elle s’arrête ici', 'नहीं — यहीं रुक जाती है', '不往下传，到这个元素为止', '不往下傳，到這個元素為止'),
  shorthandLabel: T('한꺼번에 정하는 것', 'Sets all of', 'Define a la vez', 'Define de uma vez', 'まとめて決めるもの', 'Setzt zugleich', 'Définit à la fois', 'एक साथ तय करता है', '一次设定这些', '一次設定這些'),
  partOfLabel: T('이 단축에 속함', 'Part of', 'Forma parte de', 'Faz parte de', 'この一括指定に含まれる', 'Teil von', 'Fait partie de', 'इसका हिस्सा', '属于这个简写', '屬於這個簡寫'),
  kindTitle: T('갈래', 'Category', 'Categoría', 'Categoria', '分類', 'Kategorie', 'Catégorie', 'श्रेणी', '分类', '分類'),
  docLabel: T('표준 문서', 'Reference docs', 'Documentación', 'Documentação', '標準ドキュメント', 'Referenzdoku', 'Documentation', 'संदर्भ दस्तावेज़', '标准文档', '標準文件'),
  relatedTitle: T('같은 갈래의 속성', 'Properties in the same group', 'Propiedades del mismo grupo', 'Propriedades do mesmo grupo', '同じ分類のプロパティ', 'Eigenschaften derselben Gruppe', 'Propriétés du même groupe', 'उसी समूह की प्रॉपर्टी', '同一类的属性', '同一類的屬性'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T(
    [
      '상속되는 속성은 부모에 한 번만 적으면 자식이 모두 물려받습니다. 글자에 관한 속성이 대부분 그렇습니다.',
      '단축 속성은 적지 않은 값을 기본값으로 되돌립니다. background: red만 쓰면 앞서 넣은 배경 그림도 함께 지워집니다.',
      '같은 요소에 규칙이 겹치면 더 구체적인 선택자가 이깁니다. 구체성이 같을 때만 나중에 적힌 것이 이깁니다.',
      '움직임은 transform과 opacity로 만드는 편이 부드럽습니다. width나 top을 바꾸면 배치를 다시 계산해야 합니다.',
    ],
    [
      'An inherited property only needs writing once on the parent — every child picks it up. Most text properties work this way.',
      'A shorthand resets whatever you leave out. Writing background: red alone also wipes a background image you set earlier.',
      'When rules collide, the more specific selector wins; only when specificity ties does source order decide.',
      'Animate transform and opacity for smoothness. Changing width or top forces the layout to be recalculated.',
    ],
    [
      'Una propiedad heredada basta escribirla en el padre: todos los hijos la reciben. Casi todas las de texto funcionan así.',
      'Un atajo reinicia lo que omites. Escribir solo background: red borra también la imagen de fondo puesta antes.',
      'Cuando dos reglas chocan gana el selector más específico; solo con igual especificidad decide el orden.',
      'Anima transform y opacity para que sea suave. Cambiar width o top obliga a recalcular la maquetación.',
    ],
    [
      'Uma propriedade herdada basta escrever no pai: todos os filhos recebem. Quase todas as de texto funcionam assim.',
      'Um atalho reinicia o que você omite. Escrever só background: red também apaga a imagem de fundo definida antes.',
      'Quando duas regras colidem vence o seletor mais específico; só com especificidade igual decide a ordem.',
      'Anime transform e opacity para suavidade. Mudar width ou top obriga a recalcular o layout.',
    ],
    [
      '継承する属性は親に一度書けば子がすべて受け継ぎます。文字に関する属性はたいていそうです。',
      '一括指定は書かなかった値を既定に戻します。background: red だけ書くと、先に入れた背景画像も一緒に消えます。',
      '同じ要素で規則がぶつかると、より具体的なセレクターが勝ちます。具体性が同じときにだけ後に書いたほうが勝ちます。',
      '動きはtransformとopacityで作るとなめらかです。widthやtopを変えるとレイアウトを計算し直すことになります。',
    ],
    [
      'Eine vererbte Eigenschaft schreibt man einmal am Elternelement — alle Kinder übernehmen sie. Die meisten Texteigenschaften sind so.',
      'Eine Kurzschreibweise setzt Weggelassenes zurück. Nur background: red löscht auch ein zuvor gesetztes Hintergrundbild.',
      'Kollidieren Regeln, gewinnt der spezifischere Selektor; erst bei gleicher Spezifität zählt die Reihenfolge.',
      'Animieren Sie transform und opacity — das bleibt flüssig. width oder top zwingt zur Neuberechnung des Layouts.',
    ],
    [
      "Une propriété héritée ne s'écrit qu'une fois sur le parent : tous les enfants la reprennent. C'est le cas de presque toutes les propriétés de texte.",
      "Un raccourci réinitialise ce que vous omettez. Écrire background: red efface aussi l'image de fond posée avant.",
      "Quand deux règles s'opposent, le sélecteur le plus spécifique l'emporte ; à spécificité égale seulement, l'ordre tranche.",
      "Animez transform et opacity pour la fluidité. Changer width ou top oblige à recalculer la mise en page.",
    ],
    [
      'विरासत में जाने वाली प्रॉपर्टी मूल तत्व पर एक बार लिखें — सभी बच्चे उसे पा लेते हैं। पाठ की अधिकांश प्रॉपर्टी ऐसी ही हैं।',
      'शॉर्टहैंड छोड़े गए मान रीसेट कर देता है। सिर्फ़ background: red लिखने पर पहले लगाई पृष्ठभूमि छवि भी मिट जाती है।',
      'नियम टकराएँ तो अधिक विशिष्ट सिलेक्टर जीतता है; विशिष्टता बराबर हो तभी क्रम तय करता है।',
      'सहजता के लिए transform और opacity एनिमेट करें। width या top बदलने पर लेआउट दोबारा गणना करनी पड़ती है।',
    ],
    [
      '会继承的属性，在父元素上写一次，所有子元素都跟着用。和文字有关的属性大多如此。',
      '简写属性会把你没写到的值悄悄退回默认值。只写 background: red，先前设的背景图也一并没了。',
      '同一个元素上规则撞车时，选择器越具体的赢。只有具体度一样时，才轮到写在后面的赢。',
      '做动效尽量用 transform 和 opacity，会顺滑得多。改 width 或 top 得重新算一遍布局。',
    ],
    [
      '會繼承的屬性，在父元素上寫一次，所有子元素都跟著用。和文字有關的屬性大多如此。',
      '簡寫屬性會把你沒寫到的值悄悄退回預設值。只寫 background: red，先前設的背景圖也一併沒了。',
      '同一個元素上規則撞車時，選擇器越具體的贏。只有具體度一樣時，才輪到寫在後面的贏。',
      '做動效盡量用 transform 和 opacity，會順滑得多。改 width 或 top 得重新算一遍版面。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'CSS 속성 154개 사전 — 쓰임과 값, 상속',
    'CSS property reference — 154 properties with values and inheritance',
    'Referencia de propiedades CSS — 154 con sus valores y herencia',
    'Referência de propriedades CSS — 154 com valores e herança',
    'CSSプロパティ辞典154個 — 用途・値・継承',
    'CSS-Eigenschaften-Referenz — 154 mit Werten und Vererbung',
    'Référence des propriétés CSS — 154 propriétés, valeurs et héritage',
    '154 CSS प्रॉपर्टी संदर्भ — काम, मान और विरासत',
    'CSS 属性词典 154 条 — 用途、取值与继承',
    'CSS 屬性辭典 154 條 — 用途、取值與繼承',
  ),
  hubMetaDesc: T(
    'display·flex·grid·position 등 CSS 속성 154개를 갈래별로 정리했습니다. 속성마다 무엇을 하는지, 자주 쓰는 값과 상속 여부, 단축 속성 관계를 함께 볼 수 있습니다.',
    'A reference to 154 CSS properties grouped by purpose — display, flex, grid, position and the rest — with what each does, its common values, whether it inherits and how the shorthands relate.',
    'Referencia de 154 propiedades CSS agrupadas por propósito —display, flex, grid, position y demás— con qué hace cada una, sus valores habituales, si se hereda y su relación con los atajos.',
    'Referência de 154 propriedades CSS agrupadas por propósito — display, flex, grid, position e as demais — com o que cada uma faz, valores comuns, herança e a relação com os atalhos.',
    'display・flex・grid・positionなどCSSプロパティ154個を分類ごとにまとめました。各プロパティの役割、よく使う値、継承の有無、一括指定との関係を確認できます。',
    'Eine Referenz zu 154 CSS-Eigenschaften nach Zweck geordnet — display, flex, grid, position und mehr — mit Aufgabe, gängigen Werten, Vererbung und Kurzschreibweisen.',
    "Une référence de 154 propriétés CSS classées par usage — display, flex, grid, position et les autres — avec leur rôle, leurs valeurs courantes, l'héritage et les raccourcis.",
    '154 CSS प्रॉपर्टी उद्देश्य के अनुसार — display, flex, grid, position और बाक़ी — हर एक का काम, सामान्य मान, विरासत और शॉर्टहैंड संबंध।',
    'display、flex、grid、position 等 154 个 CSS 属性，按用途分好类。每个属性做什么、常用值有哪些、会不会继承、和简写属性是什么关系，都能一起看到。',
    'display、flex、grid、position 等 154 個 CSS 屬性，按用途分好類。每個屬性做什麼、常用值有哪些、會不會繼承、和簡寫屬性是什麼關係，都能一起看到。',
  ),

  metaTitle: T(
    (n: string) => `CSS ${n} 속성 — 쓰임과 값`,
    (n: string) => `CSS ${n} — what it does and its values`,
    (n: string) => `CSS ${n} — para qué sirve y sus valores`,
    (n: string) => `CSS ${n} — para que serve e seus valores`,
    (n: string) => `CSS の ${n} — 役割と値`,
    (n: string) => `CSS ${n} — Aufgabe und Werte`,
    (n: string) => `CSS ${n} — rôle et valeurs`,
    (n: string) => `CSS ${n} — काम और मान`,
    (n: string) => `CSS ${n} 属性 — 用途与取值`,
    (n: string) => `CSS ${n} 屬性 — 用途與取值`,
  ),

  metaDesc: T(
    (n: string, d: string) => `CSS ${n} 속성의 뜻과 쓰는 법입니다. ${d}`,
    (n: string, d: string) => `What the CSS ${n} property means and how to write it. ${d}`,
    (n: string, d: string) => `Qué significa la propiedad CSS ${n} y cómo se escribe. ${d}`,
    (n: string, d: string) => `O que significa a propriedade CSS ${n} e como escrevê-la. ${d}`,
    (n: string, d: string) => `CSSの ${n} プロパティの意味と書き方です。${d}`,
    (n: string, d: string) => `Was die CSS-Eigenschaft ${n} bedeutet und wie man sie schreibt. ${d}`,
    (n: string, d: string) => `Ce que signifie la propriété CSS ${n} et comment l'écrire. ${d}`,
    (n: string, d: string) => `CSS ${n} प्रॉपर्टी का अर्थ और उसे लिखने का तरीक़ा। ${d}`,
    (n: string, d: string) => `CSS ${n} 属性的含义和写法。${d}`,
    (n: string, d: string) => `CSS ${n} 屬性的含義和寫法。${d}`,
  ),

  hubFaq: T(
    [
      { q: 'CSS 속성은 모두 몇 개인가요?', a: '표준에 올라 있는 것만 500개가 넘지만, 실제로 손이 가는 것은 그중 일부입니다. 여기에는 화면을 만들 때 반복해서 쓰게 되는 154개를 갈래별로 실었습니다.' },
      { q: '상속된다는 게 무슨 뜻인가요?', a: '부모에 적으면 자식이 따로 적지 않아도 같은 값을 쓴다는 뜻입니다. 글꼴·글자색·줄 간격처럼 글에 관한 속성이 대부분 그렇고, 여백이나 테두리는 물려주지 않습니다.' },
      { q: '단축 속성을 쓰면 뭐가 달라지나요?', a: '한 줄로 여러 값을 정할 수 있지만, 적지 않은 값은 기본값으로 되돌아갑니다. background: red만 쓰면 앞서 넣은 배경 그림이 함께 지워지는 것이 그 때문입니다.' },
      { q: '같은 속성을 두 번 적으면 어느 쪽이 이기나요?', a: '선택자가 얼마나 구체적인지를 먼저 봅니다. id가 class보다, class가 태그보다 셉니다. 구체성이 같을 때만 나중에 적힌 것이 이깁니다. !important는 그 판을 뒤집지만 쓰지 않는 편이 낫습니다.' },
      { q: 'px과 rem 중 무엇을 써야 하나요?', a: 'rem은 뿌리 글자 크기의 배수라, 사용자가 브라우저에서 글자를 키우면 함께 커집니다. 글자와 여백에는 rem이 안전하고, 얇은 테두리처럼 늘 같아야 하는 값에는 px이 낫습니다.' },
    ],
    [
      { q: 'How many CSS properties are there?', a: 'The standard lists well over 500, but only a fraction come up in daily work. This reference covers the 154 you end up writing again and again, grouped by purpose.' },
      { q: 'What does inherited mean?', a: 'It means the value passes down: set it on the parent and children use it without repeating it. Most text-related properties inherit; spacing and borders do not.' },
      { q: 'What changes when I use a shorthand?', a: 'You set several values in one line, but anything you leave out resets to its default. That is why background: red on its own also wipes a background image you had set.' },
      { q: 'If the same property is set twice, which wins?', a: 'Specificity is checked first: an id beats a class, a class beats a tag. Only when specificity ties does the later rule win. !important overrides all of that, which is why it is best avoided.' },
      { q: 'Should I use px or rem?', a: 'A rem is a multiple of the root font size, so it grows when the reader enlarges text in the browser. Use rem for type and spacing; px is fine where a value must never change, such as a hairline border.' },
    ],
    [
      { q: '¿Cuántas propiedades CSS hay?', a: 'El estándar recoge más de 500, pero solo una parte aparece en el trabajo diario. Aquí están las 154 que se acaban escribiendo una y otra vez, agrupadas por propósito.' },
      { q: '¿Qué significa que se hereda?', a: 'Que el valor pasa hacia abajo: lo pones en el padre y los hijos lo usan sin repetirlo. Casi todas las propiedades de texto se heredan; los espacios y bordes no.' },
      { q: '¿Qué cambia al usar un atajo?', a: 'Defines varios valores en una línea, pero lo que omites vuelve a su valor inicial. Por eso background: red a secas borra también la imagen de fondo anterior.' },
      { q: 'Si la misma propiedad se declara dos veces, ¿cuál gana?', a: 'Primero se mira la especificidad: un id gana a una clase y una clase a una etiqueta. Solo con igual especificidad gana la regla posterior. !important lo anula todo, y por eso conviene evitarlo.' },
      { q: '¿Debo usar px o rem?', a: 'Un rem es un múltiplo del tamaño raíz, así que crece cuando el lector amplía el texto en el navegador. Usa rem para tipografía y espacios; px va bien donde el valor nunca debe cambiar, como un borde de un píxel.' },
    ],
    [
      { q: 'Quantas propriedades CSS existem?', a: 'O padrão lista mais de 500, mas só uma parte aparece no dia a dia. Aqui estão as 154 que se acaba escrevendo sempre, agrupadas por propósito.' },
      { q: 'O que significa ser herdada?', a: 'Que o valor desce: você define no pai e os filhos usam sem repetir. Quase todas as propriedades de texto herdam; espaçamento e bordas não.' },
      { q: 'O que muda ao usar um atalho?', a: 'Você define vários valores numa linha, mas o que omite volta ao padrão. É por isso que background: red sozinho também apaga a imagem de fundo anterior.' },
      { q: 'Se a mesma propriedade aparece duas vezes, qual vence?', a: 'Primeiro conta a especificidade: id vence classe e classe vence tag. Só com especificidade igual vence a regra posterior. !important passa por cima de tudo, e por isso é melhor evitá-lo.' },
      { q: 'Devo usar px ou rem?', a: 'Um rem é múltiplo do tamanho raiz, então cresce quando o leitor amplia o texto no navegador. Use rem para tipografia e espaçamento; px serve onde o valor nunca deve mudar, como uma borda de um pixel.' },
    ],
    [
      { q: 'CSSプロパティは全部でいくつありますか。', a: '標準に載っているものだけで500を超えますが、実際に手が伸びるのはその一部です。ここでは画面を作るとき繰り返し使う154個を分類ごとに載せています。' },
      { q: '継承するとはどういう意味ですか。', a: '親に書けば子は書かなくても同じ値を使う、という意味です。書体・文字色・行間など文章に関する属性はたいてい継承し、余白や枠線は継承しません。' },
      { q: '一括指定を使うと何が変わりますか。', a: '一行で複数の値を決められますが、書かなかった値は既定に戻ります。background: red だけ書くと先に入れた背景画像も消えるのはそのためです。' },
      { q: '同じ属性を二度書いたらどちらが勝ちますか。', a: 'まずセレクターの具体性を見ます。idはclassより、classはタグより強いです。具体性が同じときにだけ後に書いたほうが勝ちます。!importantはそれを覆しますが、使わないに越したことはありません。' },
      { q: 'pxとremのどちらを使うべきですか。', a: 'remはルートの文字サイズの倍数なので、利用者がブラウザーで文字を大きくすると一緒に大きくなります。文字と余白にはremが安全で、細い枠線のように常に同じであるべき値にはpxが向きます。' },
    ],
    [
      { q: 'Wie viele CSS-Eigenschaften gibt es?', a: 'Der Standard führt über 500, doch nur ein Bruchteil begegnet einem täglich. Hier stehen die 154, die man immer wieder schreibt, nach Zweck geordnet.' },
      { q: 'Was heißt „vererbt"?', a: 'Der Wert wird weitergereicht: einmal am Elternelement gesetzt, nutzen ihn alle Kinder. Die meisten Texteigenschaften vererben, Abstände und Rahmen nicht.' },
      { q: 'Was ändert eine Kurzschreibweise?', a: 'Sie setzt mehrere Werte in einer Zeile — aber alles Weggelassene fällt auf den Standard zurück. Deshalb löscht ein bloßes background: red auch ein zuvor gesetztes Hintergrundbild.' },
      { q: 'Wenn dieselbe Eigenschaft zweimal gesetzt ist, was gilt?', a: 'Zuerst zählt die Spezifität: id schlägt Klasse, Klasse schlägt Tag. Nur bei gleicher Spezifität gewinnt die spätere Regel. !important hebelt alles aus — und sollte deshalb die Ausnahme bleiben.' },
      { q: 'Px oder rem?', a: 'Ein rem ist ein Vielfaches der Wurzelschriftgröße und wächst mit, wenn Lesende die Schrift im Browser vergrößern. Für Schrift und Abstände rem; px passt dort, wo ein Wert nie wandern darf, etwa bei einer Haarlinie.' },
    ],
    [
      { q: 'Combien y a-t-il de propriétés CSS ?', a: "La norme en compte plus de 500, mais seule une part revient au quotidien. On trouve ici les 154 que l'on finit par écrire sans cesse, classées par usage." },
      { q: 'Que veut dire « héritée » ?', a: "Que la valeur descend : posée sur le parent, les enfants l'utilisent sans la répéter. La plupart des propriétés de texte s'héritent ; les marges et bordures non." },
      { q: "Qu'est-ce qui change avec un raccourci ?", a: "On règle plusieurs valeurs en une ligne, mais tout ce qui est omis revient à sa valeur initiale. C'est pourquoi un simple background: red efface aussi l'image de fond posée avant." },
      { q: 'Si la même propriété est déclarée deux fois, laquelle gagne ?', a: "La spécificité d'abord : un id bat une classe, une classe bat une balise. À spécificité égale seulement, la règle la plus tardive l'emporte. !important renverse tout, raison de plus pour l'éviter." },
      { q: 'Faut-il utiliser px ou rem ?', a: "Un rem est un multiple de la taille racine : il grandit quand le lecteur agrandit le texte dans son navigateur. Rem pour la typographie et les espacements ; px là où la valeur ne doit jamais bouger, comme un filet d'un pixel." },
    ],
    [
      { q: 'CSS प्रॉपर्टी कुल कितनी हैं?', a: 'मानक में 500 से ऊपर हैं, पर रोज़ के काम में कुछ ही आती हैं। यहाँ वही 154 हैं जो बार-बार लिखनी पड़ती हैं, उद्देश्य के अनुसार।' },
      { q: '"विरासत में जाना" का क्या अर्थ है?', a: 'मान नीचे चला जाता है: मूल तत्व पर लिखिए और बच्चे बिना दोहराए उसे इस्तेमाल करते हैं। पाठ से जुड़ी अधिकांश प्रॉपर्टी विरासत में जाती हैं; जगह और बॉर्डर नहीं।' },
      { q: 'शॉर्टहैंड इस्तेमाल करने पर क्या बदलता है?', a: 'एक पंक्ति में कई मान तय होते हैं, पर जो छोड़ा वह डिफ़ॉल्ट पर लौट जाता है। इसीलिए अकेला background: red पहले लगाई पृष्ठभूमि छवि भी मिटा देता है।' },
      { q: 'एक ही प्रॉपर्टी दो बार लिखी हो तो कौन जीतती है?', a: 'पहले विशिष्टता देखी जाती है: id क्लास से और क्लास टैग से भारी है। विशिष्टता बराबर हो तभी बाद वाला नियम जीतता है। !important सब पलट देता है, इसीलिए उससे बचना बेहतर है।' },
      { q: 'px लें या rem?', a: 'rem मूल फ़ॉन्ट आकार का गुणक है, इसलिए पाठक द्वारा ब्राउज़र में अक्षर बड़े करने पर यह भी बढ़ता है। अक्षर और जगह के लिए rem सुरक्षित है; जहाँ मान कभी न बदले, जैसे बारीक बॉर्डर, वहाँ px ठीक है।' },
    ],
    [
      { q: 'CSS 属性一共有多少个？', a: '光是写进标准的就有五百多个，但真正常动手的只是其中一部分。这里按用途收了做页面时会反复用到的 154 个。' },
      { q: '「继承」是什么意思？', a: '意思是写在父元素上，子元素不用另写也照着用。字体、文字色、行高这些和文字有关的属性大多会继承；间距和边框则不会。' },
      { q: '用简写属性有什么不一样？', a: '一行能设好几个值，但没写到的那些会退回默认值。只写 background: red，先前设的背景图就跟着没了，原因就在这里。' },
      { q: '同一个属性写了两遍，哪个赢？', a: '先比选择器有多具体：id 强过 class，class 强过标签。具体度一样时，才轮到写在后面的赢。!important 能掀翻这套规则，但最好别用。' },
      { q: 'px 和 rem 该用哪个？', a: 'rem 是根字号的倍数，用户在浏览器里把字调大，它会跟着变大。文字和间距用 rem 更稳妥；像细边框这种必须始终一样的值，px 更合适。' },
    ],
    [
      { q: 'CSS 屬性一共有多少個？', a: '光是寫進標準的就有五百多個，但真正常動手的只是其中一部分。這裡按用途收了做頁面時會反覆用到的 154 個。' },
      { q: '「繼承」是什麼意思？', a: '意思是寫在父元素上，子元素不用另寫也照著用。字型、文字色、行高這些和文字有關的屬性大多會繼承；間距和邊框則不會。' },
      { q: '用簡寫屬性有什麼不一樣？', a: '一行能設好幾個值，但沒寫到的那些會退回預設值。只寫 background: red，先前設的背景圖就跟著沒了，原因就在這裡。' },
      { q: '同一個屬性寫了兩遍，哪個贏？', a: '先比選擇器有多具體：id 強過 class，class 強過標籤。具體度一樣時，才輪到寫在後面的贏。!important 能掀翻這套規則，但最好別用。' },
      { q: 'px 和 rem 該用哪個？', a: 'rem 是根字級的倍數，使用者在瀏覽器裡把字調大，它會跟著變大。文字和間距用 rem 更穩妥；像細邊框這種必須始終一樣的值，px 更合適。' },
    ],
  ),

  propFaq: T(
    (f: PropFacts, d: string, kind: string) => [
      { q: `CSS ${f.name} 속성은 무엇인가요?`, a: d },
      { q: `${f.name}은 어떻게 쓰나요?`, a: `${f.example} 꼴로 씁니다.${f.values.length > 1 ? ` 자주 쓰는 값으로는 ${f.values.slice(0, 4).join(', ')} 등이 있습니다.` : ''}` },
      { q: `${f.name}은 자식에게 물려주나요?`, a: f.inherited ? '물려줍니다. 부모에 한 번만 적으면 자식이 따로 적지 않아도 같은 값을 씁니다.' : '물려주지 않습니다. 필요한 요소마다 따로 적어야 합니다.' },
      { q: f.shorthandFor.length ? `${f.name}은 어떤 속성을 한꺼번에 정하나요?` : f.partOf.length ? `${f.name}을 한꺼번에 정하는 단축 속성이 있나요?` : `${f.name}은 어느 갈래인가요?`, a: f.shorthandFor.length ? `${f.shorthandFor.join(', ')}를 함께 정합니다. 적지 않은 값은 기본값으로 되돌아갑니다.` : f.partOf.length ? `${f.partOf.join(', ')}로 한꺼번에 정할 수 있습니다.` : `${kind} 갈래입니다.` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `What is the CSS ${f.name} property?`, a: d },
      { q: `How do you write ${f.name}?`, a: `As ${f.example}${f.values.length > 1 ? ` Common values include ${f.values.slice(0, 4).join(', ')}.` : ''}` },
      { q: `Is ${f.name} inherited?`, a: f.inherited ? 'Yes. Set it once on the parent and every child uses the same value without repeating it.' : 'No. It applies only where you write it, so each element needs its own declaration.' },
      { q: f.shorthandFor.length ? `What does the ${f.name} shorthand set?` : f.partOf.length ? `Which shorthand sets ${f.name}?` : `What group does ${f.name} belong to?`, a: f.shorthandFor.length ? `${f.shorthandFor.join(', ')} — and anything you leave out resets to its default.` : f.partOf.length ? `${f.partOf.join(', ')} can set it in one line.` : `The ${kind.toLowerCase()} group.` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `¿Qué es la propiedad CSS ${f.name}?`, a: d },
      { q: `¿Cómo se escribe ${f.name}?`, a: `Así: ${f.example}${f.values.length > 1 ? ` Valores habituales: ${f.values.slice(0, 4).join(', ')}.` : ''}` },
      { q: `¿Se hereda ${f.name}?`, a: f.inherited ? 'Sí. Basta ponerla en el padre y todos los hijos usan el mismo valor.' : 'No. Solo se aplica donde la escribes, así que cada elemento necesita la suya.' },
      { q: f.shorthandFor.length ? `¿Qué define el atajo ${f.name}?` : f.partOf.length ? `¿Qué atajo define ${f.name}?` : `¿A qué grupo pertenece ${f.name}?`, a: f.shorthandFor.length ? `${f.shorthandFor.join(', ')}; lo que omitas vuelve a su valor inicial.` : f.partOf.length ? `${f.partOf.join(', ')} lo define en una línea.` : `Al grupo ${kind.toLowerCase()}.` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `O que é a propriedade CSS ${f.name}?`, a: d },
      { q: `Como se escreve ${f.name}?`, a: `Assim: ${f.example}${f.values.length > 1 ? ` Valores comuns: ${f.values.slice(0, 4).join(', ')}.` : ''}` },
      { q: `${f.name} é herdada?`, a: f.inherited ? 'Sim. Basta definir no pai e todos os filhos usam o mesmo valor.' : 'Não. Vale só onde você escreve, então cada elemento precisa da sua.' },
      { q: f.shorthandFor.length ? `O que o atalho ${f.name} define?` : f.partOf.length ? `Qual atalho define ${f.name}?` : `A que grupo pertence ${f.name}?`, a: f.shorthandFor.length ? `${f.shorthandFor.join(', ')}; o que for omitido volta ao padrão.` : f.partOf.length ? `${f.partOf.join(', ')} define em uma linha.` : `Ao grupo ${kind.toLowerCase()}.` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `CSSの ${f.name} プロパティとは何ですか。`, a: d },
      { q: `${f.name} はどう書きますか。`, a: `${f.example} のように書きます。${f.values.length > 1 ? `よく使う値は ${f.values.slice(0, 4).join('、')} などです。` : ''}` },
      { q: `${f.name} は継承しますか。`, a: f.inherited ? '継承します。親に一度書けば、子は書かなくても同じ値を使います。' : '継承しません。必要な要素ごとに書く必要があります。' },
      { q: f.shorthandFor.length ? `${f.name} は何をまとめて決めますか。` : f.partOf.length ? `${f.name} をまとめて決める一括指定はありますか。` : `${f.name} はどの分類ですか。`, a: f.shorthandFor.length ? `${f.shorthandFor.join('、')}をまとめて決めます。書かなかった値は既定に戻ります。` : f.partOf.length ? `${f.partOf.join('、')}で一度に決められます。` : `${kind}の分類です。` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `Was ist die CSS-Eigenschaft ${f.name}?`, a: d },
      { q: `Wie schreibt man ${f.name}?`, a: `Als ${f.example}${f.values.length > 1 ? ` Gängige Werte sind ${f.values.slice(0, 4).join(', ')}.` : ''}` },
      { q: `Wird ${f.name} vererbt?`, a: f.inherited ? 'Ja. Einmal am Elternelement gesetzt, nutzen alle Kinder denselben Wert.' : 'Nein. Sie gilt nur dort, wo sie steht — jedes Element braucht seine eigene Angabe.' },
      { q: f.shorthandFor.length ? `Was setzt die Kurzform ${f.name}?` : f.partOf.length ? `Welche Kurzform setzt ${f.name}?` : `Zu welcher Gruppe gehört ${f.name}?`, a: f.shorthandFor.length ? `${f.shorthandFor.join(', ')} — Weggelassenes fällt auf den Standard zurück.` : f.partOf.length ? `${f.partOf.join(', ')} setzt sie in einer Zeile mit.` : `Zur Gruppe ${kind}.` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `Qu'est-ce que la propriété CSS ${f.name} ?`, a: d },
      { q: `Comment écrire ${f.name} ?`, a: `Sous la forme ${f.example}${f.values.length > 1 ? ` Valeurs courantes : ${f.values.slice(0, 4).join(', ')}.` : ''}` },
      { q: `${f.name} est-elle héritée ?`, a: f.inherited ? "Oui. Posée une fois sur le parent, tous les enfants reprennent la même valeur." : "Non. Elle ne vaut que là où elle est écrite : chaque élément a besoin de la sienne." },
      { q: f.shorthandFor.length ? `Que règle le raccourci ${f.name} ?` : f.partOf.length ? `Quel raccourci définit ${f.name} ?` : `À quel groupe appartient ${f.name} ?`, a: f.shorthandFor.length ? `${f.shorthandFor.join(', ')} — et ce qui est omis revient à sa valeur initiale.` : f.partOf.length ? `${f.partOf.join(', ')} la définit en une ligne.` : `Au groupe ${kind.toLowerCase()}.` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `CSS ${f.name} प्रॉपर्टी क्या है?`, a: d },
      { q: `${f.name} कैसे लिखें?`, a: `इस तरह: ${f.example}${f.values.length > 1 ? ` सामान्य मान: ${f.values.slice(0, 4).join(', ')}।` : ''}` },
      { q: `क्या ${f.name} विरासत में जाती है?`, a: f.inherited ? 'हाँ। मूल तत्व पर एक बार लिखिए, सभी बच्चे वही मान इस्तेमाल करते हैं।' : 'नहीं। यह वहीं लागू होती है जहाँ लिखी जाए, इसलिए हर तत्व के लिए अलग लिखनी पड़ती है।' },
      { q: f.shorthandFor.length ? `${f.name} शॉर्टहैंड क्या-क्या तय करता है?` : f.partOf.length ? `${f.name} को कौन-सा शॉर्टहैंड तय करता है?` : `${f.name} किस समूह की है?`, a: f.shorthandFor.length ? `${f.shorthandFor.join(', ')} — और जो छोड़ा जाए वह डिफ़ॉल्ट पर लौट जाता है।` : f.partOf.length ? `${f.partOf.join(', ')} इसे एक पंक्ति में तय कर देता है।` : `${kind} समूह की।` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `CSS 的 ${f.name} 属性是做什么的？`, a: d },
      { q: `${f.name} 怎么写？`, a: `写成 ${f.example} 这样。${f.values.length > 1 ? `常用的值有 ${f.values.slice(0, 4).join('、')} 等。` : ''}` },
      { q: `${f.name} 会传给子元素吗？`, a: f.inherited ? '会。在父元素上写一次，子元素不用另写也照着用。' : '不会。需要的元素得各写各的。' },
      { q: f.shorthandFor.length ? `${f.name} 一次能设定哪些属性？` : f.partOf.length ? `有没有能一次设定 ${f.name} 的简写属性？` : `${f.name} 属于哪一类？`, a: f.shorthandFor.length ? `它会一并设定 ${f.shorthandFor.join('、')}。没写到的值会退回默认值。` : f.partOf.length ? `可以用 ${f.partOf.join('、')} 一次设好。` : `属于${kind}这一类。` },
    ],
    (f: PropFacts, d: string, kind: string) => [
      { q: `CSS 的 ${f.name} 屬性是做什麼的？`, a: d },
      { q: `${f.name} 怎麼寫？`, a: `寫成 ${f.example} 這樣。${f.values.length > 1 ? `常用的值有 ${f.values.slice(0, 4).join('、')} 等。` : ''}` },
      { q: `${f.name} 會傳給子元素嗎？`, a: f.inherited ? '會。在父元素上寫一次，子元素不用另寫也照著用。' : '不會。需要的元素得各寫各的。' },
      { q: f.shorthandFor.length ? `${f.name} 一次能設定哪些屬性？` : f.partOf.length ? `有沒有能一次設定 ${f.name} 的簡寫屬性？` : `${f.name} 屬於哪一類？`, a: f.shorthandFor.length ? `它會一併設定 ${f.shorthandFor.join('、')}。沒寫到的值會退回預設值。` : f.partOf.length ? `可以用 ${f.partOf.join('、')} 一次設好。` : `屬於${kind}這一類。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const CSS_UI: L<CssUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<CssUI>;
