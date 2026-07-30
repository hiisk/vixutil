/**
 * HTML 태그 화면의 문구 — 여덟 언어.
 *
 * 태그마다 다른 설명은 desc.ts에 있고, 여기에는 화면 틀과 갈래 이름만 둔다.
 * 태그 이름과 속성 이름은 표준이 정한 영어라 옮기지 않는다.
 */
import { LANG8_CODES, type L8, type Lang8 } from '../i18n/lang8.ts';
import type { TagKind } from './tags.ts';
import type { TagFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface HtmlUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<TagKind, string>;
  kindNote: Record<TagKind, string>;
  writeLabel: string;
  closeLabel: string;
  voidLabel: string;
  voidYes: string;
  voidNo: string;
  attrsLabel: string;
  attrsNone: string;
  kindTitle: string;
  deprecatedWarn: string;
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
  tagFaq: (f: TagFacts, desc: string, kind: string) => FaqItem[];
}

/** 여덟 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V): L8<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi });

type Spec = { [K in keyof HtmlUI]: L8<HtmlUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम'),
  section: T('HTML 태그', 'HTML tags', 'Etiquetas HTML', 'Tags HTML', 'HTMLタグ', 'HTML-Tags', 'Balises HTML', 'HTML टैग'),

  hubTitle: T(
    'HTML 태그 126개 사전',
    'A reference of 126 HTML tags',
    'Referencia de 126 etiquetas HTML',
    'Referência de 126 tags HTML',
    'HTMLタグ126個の辞典',
    'Nachschlagewerk mit 126 HTML-Tags',
    'Référence de 126 balises HTML',
    '126 HTML टैग की संदर्भ सूची',
  ),

  hubLead: T(
    '태그마다 무엇을 하는지, 닫는 태그가 필요한지, 자주 쓰는 속성이 무엇인지 한 줄로 정리했습니다.',
    'What each tag does, whether it needs a closing tag, and the attributes you actually use — one line each.',
    'Qué hace cada etiqueta, si necesita cierre y qué atributos se usan de verdad, en una línea.',
    'O que cada tag faz, se precisa de fechamento e quais atributos se usam de fato, em uma linha.',
    'それぞれのタグが何をするか、閉じタグが要るか、よく使う属性は何かを一行でまとめました。',
    'Was jedes Tag tut, ob es ein End-Tag braucht und welche Attribute man wirklich nutzt — je eine Zeile.',
    "Ce que fait chaque balise, si elle exige une fermeture et quels attributs servent vraiment — une ligne chacune.",
    'हर टैग क्या करता है, बंद टैग चाहिए या नहीं, और कौन-से विशेषण असल में काम आते हैं — एक-एक पंक्ति में।',
  ),

  kindLabel: T(
    { structure: '문서 뼈대', section: '구획', text: '글', inline: '문장 안 표시', list: '목록', table: '표', form: '입력', media: '그림·소리·영상', embed: '끼워넣기', script: '스크립트·스타일', meta: '문서 정보', interactive: '여닫기', deprecated: '더 쓰지 않음' },
    { structure: 'Document skeleton', section: 'Sections', text: 'Text blocks', inline: 'Inline markup', list: 'Lists', table: 'Tables', form: 'Forms', media: 'Media', embed: 'Embedding', script: 'Script and style', meta: 'Document info', interactive: 'Disclosure', deprecated: 'Obsolete' },
    { structure: 'Esqueleto', section: 'Secciones', text: 'Bloques de texto', inline: 'Marcado en línea', list: 'Listas', table: 'Tablas', form: 'Formularios', media: 'Multimedia', embed: 'Incrustación', script: 'Script y estilo', meta: 'Info del documento', interactive: 'Desplegables', deprecated: 'Obsoletas' },
    { structure: 'Esqueleto', section: 'Seções', text: 'Blocos de texto', inline: 'Marcação em linha', list: 'Listas', table: 'Tabelas', form: 'Formulários', media: 'Mídia', embed: 'Incorporação', script: 'Script e estilo', meta: 'Info do documento', interactive: 'Sanfonas', deprecated: 'Obsoletas' },
    { structure: '文書の骨組み', section: '区画', text: '文章のかたまり', inline: '文中の表示', list: '一覧', table: '表', form: '入力', media: '画像・音声・動画', embed: '埋め込み', script: 'スクリプトとスタイル', meta: '文書情報', interactive: '開閉', deprecated: '非推奨' },
    { structure: 'Grundgerüst', section: 'Abschnitte', text: 'Textblöcke', inline: 'Inline-Auszeichnung', list: 'Listen', table: 'Tabellen', form: 'Formulare', media: 'Medien', embed: 'Einbettung', script: 'Skript und Stil', meta: 'Dokumentinfo', interactive: 'Aufklappbares', deprecated: 'Veraltet' },
    { structure: 'Squelette', section: 'Sections', text: 'Blocs de texte', inline: 'Balisage en ligne', list: 'Listes', table: 'Tableaux', form: 'Formulaires', media: 'Médias', embed: 'Intégration', script: 'Script et style', meta: 'Infos du document', interactive: 'Dépliables', deprecated: 'Obsolètes' },
    { structure: 'दस्तावेज़ ढाँचा', section: 'खंड', text: 'पाठ खंड', inline: 'पंक्ति-अंतर्गत चिह्न', list: 'सूचियाँ', table: 'तालिकाएँ', form: 'फ़ॉर्म', media: 'मीडिया', embed: 'एम्बेड', script: 'स्क्रिप्ट और स्टाइल', meta: 'दस्तावेज़ जानकारी', interactive: 'खुलने-बंद होने वाले', deprecated: 'अप्रचलित' },
  ),

  kindNote: T(
    {
      structure: '모든 문서가 갖는 뼈대입니다. 순서와 자리가 정해져 있습니다.',
      section: '문서를 뜻 있는 덩어리로 나눕니다. 검색과 화면 낭독이 이 구조를 따라갑니다.',
      text: '문단과 인용, 코드 블록처럼 한 덩어리로 흐르는 글입니다.',
      inline: '문장 안에서 일부만 표시합니다. 줄을 새로 시작하지 않습니다.',
      list: '순서가 있거나 없는 목록, 용어 풀이입니다.',
      table: '가로세로로 짜인 자료입니다. 화면 배치용이 아닙니다.',
      form: '값을 받아 보내는 입력들입니다.',
      media: '그림과 소리, 영상, 그리고 직접 그리는 화면입니다.',
      embed: '다른 문서나 자원을 문서 안에 끼워 넣습니다.',
      script: '동작과 모양을 문서에 붙입니다.',
      meta: '사람이 아니라 브라우저와 검색엔진이 읽는 정보입니다.',
      interactive: '자바스크립트 없이 눌러서 여닫는 것들입니다.',
      deprecated: '표준에서 물러난 태그입니다. 옛 문서를 읽을 때만 만납니다.',
    },
    {
      structure: 'The skeleton every document has, with a fixed order and place.',
      section: 'Divides a page into meaningful blocks; search engines and screen readers follow this structure.',
      text: 'Text that flows as a block — paragraphs, quotations, code listings.',
      inline: 'Marks up part of a line without starting a new one.',
      list: 'Ordered and unordered lists, plus term-and-definition lists.',
      table: 'Data arranged in rows and columns — not a layout device.',
      form: 'Controls that take a value and send it somewhere.',
      media: 'Images, audio, video, and surfaces you draw on.',
      embed: 'Puts another document or resource inside this one.',
      script: 'Attaches behaviour and appearance to the document.',
      meta: 'Information read by browsers and search engines rather than people.',
      interactive: 'Things that open and close on a click, with no JavaScript.',
      deprecated: 'Tags the standard has retired; you meet them only in old documents.',
    },
    {
      structure: 'El esqueleto que tiene todo documento, con orden y lugar fijos.',
      section: 'Divide la página en bloques con sentido; buscadores y lectores de pantalla siguen esta estructura.',
      text: 'Texto que fluye como bloque: párrafos, citas, listados de código.',
      inline: 'Marca parte de una línea sin empezar otra.',
      list: 'Listas ordenadas y sin ordenar, más listas de términos.',
      table: 'Datos en filas y columnas; no es un recurso de maquetación.',
      form: 'Controles que toman un valor y lo envían.',
      media: 'Imágenes, audio, vídeo y superficies para dibujar.',
      embed: 'Mete otro documento o recurso dentro de este.',
      script: 'Añade comportamiento y aspecto al documento.',
      meta: 'Información que leen navegadores y buscadores, no personas.',
      interactive: 'Cosas que se abren y cierran al pulsar, sin JavaScript.',
      deprecated: 'Etiquetas retiradas del estándar; solo aparecen en documentos antiguos.',
    },
    {
      structure: 'O esqueleto que todo documento tem, com ordem e lugar fixos.',
      section: 'Divide a página em blocos com sentido; buscadores e leitores de tela seguem essa estrutura.',
      text: 'Texto que flui em bloco: parágrafos, citações, listagens de código.',
      inline: 'Marca parte de uma linha sem começar outra.',
      list: 'Listas ordenadas e não ordenadas, além de listas de termos.',
      table: 'Dados em linhas e colunas; não é recurso de layout.',
      form: 'Controles que recebem um valor e o enviam.',
      media: 'Imagens, áudio, vídeo e superfícies para desenhar.',
      embed: 'Coloca outro documento ou recurso dentro deste.',
      script: 'Acrescenta comportamento e aparência ao documento.',
      meta: 'Informação lida por navegadores e buscadores, não por pessoas.',
      interactive: 'Coisas que abrem e fecham ao clique, sem JavaScript.',
      deprecated: 'Tags aposentadas pelo padrão; aparecem só em documentos antigos.',
    },
    {
      structure: 'どの文書も持つ骨組みです。順序と置き場所が決まっています。',
      section: '文書を意味のあるかたまりに分けます。検索や読み上げはこの構造をたどります。',
      text: '段落や引用、コードのように一つのかたまりで流れる文章です。',
      inline: '行を改めずに文中の一部だけを示します。',
      list: '順序のある一覧、ない一覧、用語の解説です。',
      table: '縦横に並ぶデータです。画面の配置用ではありません。',
      form: '値を受け取って送る入力たちです。',
      media: '画像と音声、動画、そして自分で描く画面です。',
      embed: 'ほかの文書や資源をこの文書に埋め込みます。',
      script: '動きと見た目を文書に付けます。',
      meta: '人ではなくブラウザーや検索エンジンが読む情報です。',
      interactive: 'JavaScriptなしで押して開閉するものです。',
      deprecated: '標準から退いたタグです。古い文書を読むときにだけ出会います。',
    },
    {
      structure: 'Das Grundgerüst jedes Dokuments, mit fester Reihenfolge und Position.',
      section: 'Teilt die Seite in sinnvolle Blöcke; Suchmaschinen und Screenreader folgen dieser Struktur.',
      text: 'Text, der als Block fließt — Absätze, Zitate, Codelistings.',
      inline: 'Zeichnet einen Teil der Zeile aus, ohne eine neue zu beginnen.',
      list: 'Geordnete und ungeordnete Listen sowie Begriffslisten.',
      table: 'Daten in Zeilen und Spalten — kein Layout-Mittel.',
      form: 'Steuerelemente, die einen Wert aufnehmen und verschicken.',
      media: 'Bilder, Audio, Video und Flächen zum Zeichnen.',
      embed: 'Setzt ein anderes Dokument oder eine Ressource in dieses ein.',
      script: 'Verleiht dem Dokument Verhalten und Aussehen.',
      meta: 'Angaben für Browser und Suchmaschinen, nicht für Menschen.',
      interactive: 'Dinge, die sich per Klick öffnen und schließen — ohne JavaScript.',
      deprecated: 'Vom Standard ausgemusterte Tags; man trifft sie nur in alten Dokumenten.',
    },
    {
      structure: "Le squelette que possède tout document, à l'ordre et à la place fixes.",
      section: 'Découpe la page en blocs porteurs de sens ; moteurs et lecteurs d’écran suivent cette structure.',
      text: 'Du texte qui coule en bloc : paragraphes, citations, listings de code.',
      inline: "Balise une partie de ligne sans en commencer une nouvelle.",
      list: 'Listes ordonnées, non ordonnées et listes de définitions.',
      table: "Des données en lignes et colonnes, pas un outil de mise en page.",
      form: 'Des contrôles qui reçoivent une valeur et l’envoient.',
      media: 'Images, audio, vidéo et surfaces de dessin.',
      embed: 'Place un autre document ou une ressource dans celui-ci.',
      script: 'Ajoute comportement et apparence au document.',
      meta: 'Informations lues par les navigateurs et les moteurs, pas par les gens.',
      interactive: 'Ce qui s’ouvre et se ferme au clic, sans JavaScript.',
      deprecated: "Balises retirées de la norme ; on ne les croise que dans d'anciens documents.",
    },
    {
      structure: 'हर दस्तावेज़ का ढाँचा — क्रम और स्थान तय।',
      section: 'पन्ने को अर्थपूर्ण खंडों में बाँटता है; खोज इंजन और स्क्रीन रीडर इसी संरचना का अनुसरण करते हैं।',
      text: 'ब्लॉक की तरह बहने वाला पाठ — अनुच्छेद, उद्धरण, कोड सूची।',
      inline: 'नई पंक्ति शुरू किए बिना पंक्ति के हिस्से को चिह्नित करता है।',
      list: 'क्रमित और अक्रमित सूचियाँ, साथ ही शब्द-परिभाषा सूचियाँ।',
      table: 'पंक्तियों और स्तंभों में डेटा — लेआउट का साधन नहीं।',
      form: 'ऐसे नियंत्रण जो मान लेकर भेजते हैं।',
      media: 'चित्र, ऑडियो, वीडियो और चित्र बनाने के पटल।',
      embed: 'किसी और दस्तावेज़ या संसाधन को इसमें रखता है।',
      script: 'दस्तावेज़ को व्यवहार और रूप देता है।',
      meta: 'ब्राउज़र और खोज इंजन पढ़ते हैं, लोग नहीं।',
      interactive: 'बिना जावास्क्रिप्ट क्लिक पर खुलने-बंद होने वाली चीज़ें।',
      deprecated: 'मानक से हटाए गए टैग; ये केवल पुराने दस्तावेज़ों में मिलते हैं।',
    },
  ),

  writeLabel: T('쓰는 법', 'How to write it', 'Cómo se escribe', 'Como escrever', '書き方', 'Schreibweise', 'Écriture', 'कैसे लिखें'),
  closeLabel: T('닫는 태그', 'Closing tag', 'Etiqueta de cierre', 'Tag de fechamento', '閉じタグ', 'End-Tag', 'Balise fermante', 'बंद टैग'),
  voidLabel: T('닫지 않는 태그', 'Void element', 'Elemento vacío', 'Elemento vazio', '空要素', 'Leeres Element', 'Élément vide', 'रिक्त तत्व'),
  voidYes: T('맞음 — 닫지 않습니다', 'Yes — no closing tag', 'Sí, sin cierre', 'Sim, sem fechamento', 'はい — 閉じません', 'Ja — kein End-Tag', 'Oui — pas de fermeture', 'हाँ — बंद टैग नहीं'),
  voidNo: T('아님 — 닫아야 합니다', 'No — it must be closed', 'No, debe cerrarse', 'Não, precisa fechar', 'いいえ — 閉じます', 'Nein — muss geschlossen werden', 'Non — doit être fermée', 'नहीं — बंद करना होगा'),
  attrsLabel: T('자주 쓰는 속성', 'Common attributes', 'Atributos habituales', 'Atributos comuns', 'よく使う属性', 'Gängige Attribute', 'Attributs courants', 'सामान्य विशेषण'),
  attrsNone: T('특별히 없음', 'None in particular', 'Ninguno en especial', 'Nenhum em especial', '特にありません', 'Keine besonderen', 'Aucun en particulier', 'कोई विशेष नहीं'),
  kindTitle: T('갈래', 'Category', 'Categoría', 'Categoria', '分類', 'Kategorie', 'Catégorie', 'श्रेणी'),

  deprecatedWarn: T(
    '표준에서 물러난 태그입니다. 새로 쓰지 말고, 옛 문서를 고칠 때만 참고하세요.',
    'This tag has been retired from the standard. Do not use it in new pages — it is here for reading old ones.',
    'Esta etiqueta se retiró del estándar. No la uses en páginas nuevas: está aquí para leer las antiguas.',
    'Esta tag foi aposentada do padrão. Não use em páginas novas: ela está aqui para ler as antigas.',
    '標準から退いたタグです。新しく使わず、古い文書を読むときの参考にしてください。',
    'Dieses Tag wurde aus dem Standard entfernt. Nicht mehr verwenden — es steht hier fürs Lesen alter Seiten.',
    "Cette balise a été retirée de la norme. Ne l'utilisez plus : elle figure ici pour lire d'anciennes pages.",
    'यह टैग मानक से हटाया जा चुका है। नए पन्नों में इसका प्रयोग न करें — यह पुराने पढ़ने के लिए है।',
  ),

  docLabel: T('표준 문서', 'Reference docs', 'Documentación', 'Documentação', '標準ドキュメント', 'Referenzdoku', 'Documentation', 'संदर्भ दस्तावेज़'),
  relatedTitle: T('같은 갈래의 태그', 'Tags in the same group', 'Etiquetas del mismo grupo', 'Tags do mesmo grupo', '同じ分類のタグ', 'Tags derselben Gruppe', 'Balises du même groupe', 'उसी समूह के टैग'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें'),

  how: T(
    [
      '태그는 대개 여는 것과 닫는 것이 짝을 이룹니다. img나 br처럼 내용이 없는 태그만 닫지 않습니다.',
      '닫지 않는 태그에 </br>을 붙이면 브라우저가 무시하거나 빈 줄이 하나 더 생깁니다.',
      '보이는 모양은 CSS가 정합니다. 태그는 "이것이 무엇인가"를 말하고, 굵게·기울임은 그 결과일 뿐입니다.',
      '뜻이 맞는 태그를 고르면 검색과 화면 낭독이 함께 좋아집니다. div로 다 감싸면 그 정보가 사라집니다.',
    ],
    [
      'Most tags come in pairs, opening and closing. Only tags with no content — img, br — are left unclosed.',
      'Writing </br> for a void element does nothing useful; the browser ignores it or adds an empty line.',
      'Appearance is CSS’s job. A tag says what something is; bold or italic is only the consequence.',
      'Choosing the tag that matches the meaning helps search engines and screen readers alike. Wrapping everything in div throws that information away.',
    ],
    [
      'La mayoría de etiquetas van en pareja, apertura y cierre. Solo las que no tienen contenido —img, br— quedan sin cerrar.',
      'Escribir </br> en un elemento vacío no sirve de nada: el navegador lo ignora o añade una línea en blanco.',
      'La apariencia es cosa del CSS. La etiqueta dice qué es algo; la negrita o la cursiva son la consecuencia.',
      'Elegir la etiqueta que encaja con el significado ayuda a buscadores y lectores de pantalla. Envolverlo todo en div tira esa información.',
    ],
    [
      'A maioria das tags vem em par, abrindo e fechando. Só as que não têm conteúdo — img, br — ficam sem fechamento.',
      'Escrever </br> num elemento vazio não adianta: o navegador ignora ou acrescenta uma linha em branco.',
      'A aparência é tarefa do CSS. A tag diz o que algo é; negrito ou itálico é só a consequência.',
      'Escolher a tag que combina com o significado ajuda buscadores e leitores de tela. Embrulhar tudo em div joga fora essa informação.',
    ],
    [
      'タグはたいてい開くものと閉じるものが対になります。imgやbrのように内容のないタグだけ閉じません。',
      '閉じない要素に</br>と書いても意味はなく、ブラウザーは無視するか空行を一つ増やします。',
      '見た目はCSSの仕事です。タグは「これが何か」を語り、太字や斜体はその結果にすぎません。',
      '意味に合うタグを選べば検索も読み上げも良くなります。何でもdivで包むとその情報が失われます。',
    ],
    [
      'Die meisten Tags treten paarweise auf, öffnend und schließend. Nur inhaltslose Tags wie img oder br bleiben offen.',
      'Ein </br> bei einem leeren Element nützt nichts: Der Browser ignoriert es oder fügt eine Leerzeile ein.',
      'Das Aussehen ist Sache des CSS. Ein Tag sagt, was etwas ist; fett oder kursiv ist nur die Folge.',
      'Das passende Tag hilft Suchmaschinen und Screenreadern gleichermaßen. Alles in div zu packen wirft diese Information weg.',
    ],
    [
      "La plupart des balises vont par paire, ouvrante et fermante. Seules celles sans contenu — img, br — restent non fermées.",
      "Écrire </br> pour un élément vide ne sert à rien : le navigateur l'ignore ou ajoute une ligne vide.",
      "L'apparence relève du CSS. Une balise dit ce qu'est une chose ; le gras ou l'italique n'en est que la conséquence.",
      "Choisir la balise qui correspond au sens profite aux moteurs comme aux lecteurs d'écran. Tout envelopper dans des div jette cette information.",
    ],
    [
      'ज़्यादातर टैग जोड़े में आते हैं — खुलने और बंद होने वाले। सिर्फ़ बिना सामग्री वाले टैग (img, br) बंद नहीं होते।',
      'रिक्त तत्व के लिए </br> लिखना बेकार है: ब्राउज़र या तो अनदेखा करता है या एक खाली पंक्ति जोड़ देता है।',
      'दिखावट CSS का काम है। टैग बताता है कि चीज़ क्या है; मोटा या तिरछा होना उसका परिणाम भर है।',
      'अर्थ से मेल खाता टैग चुनना खोज इंजन और स्क्रीन रीडर दोनों के लिए अच्छा है। सब कुछ div में लपेटना यह जानकारी फेंक देता है।',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल'),

  hubMetaTitle: T(
    'HTML 태그 126개 사전 — 쓰임과 닫는 태그, 속성',
    'HTML tag reference — 126 tags with usage, closing rules and attributes',
    'Referencia de etiquetas HTML — 126 etiquetas con uso, cierre y atributos',
    'Referência de tags HTML — 126 tags com uso, fechamento e atributos',
    'HTMLタグ辞典126個 — 用途・閉じタグ・属性',
    'HTML-Tag-Referenz — 126 Tags mit Zweck, Schließregel und Attributen',
    'Référence des balises HTML — 126 balises : usage, fermeture, attributs',
    'HTML टैग संदर्भ — 126 टैग, उनका उपयोग, बंद नियम और विशेषण',
  ),
  hubMetaDesc: T(
    'div·section·input·img 등 HTML 태그 126개를 갈래별로 정리했습니다. 태그마다 무엇을 하는지, 닫는 태그가 필요한지, 자주 쓰는 속성과 같은 갈래의 다른 태그를 함께 볼 수 있습니다.',
    'A reference to 126 HTML tags grouped by purpose — div, section, input, img and the rest — with what each does, whether it needs closing, its common attributes and its neighbours.',
    'Referencia de 126 etiquetas HTML agrupadas por propósito —div, section, input, img y demás— con qué hace cada una, si necesita cierre, sus atributos y sus vecinas.',
    'Referência de 126 tags HTML agrupadas por propósito — div, section, input, img e as demais — com o que cada uma faz, se precisa fechar, seus atributos e suas vizinhas.',
    'div・section・input・imgなどHTMLタグ126個を分類ごとにまとめました。各タグの役割、閉じタグの要否、よく使う属性、同じ分類の仲間を確認できます。',
    'Eine Referenz zu 126 HTML-Tags nach Zweck geordnet — div, section, input, img und mehr — mit Aufgabe, Schließregel, gängigen Attributen und Verwandten.',
    "Une référence de 126 balises HTML classées par usage — div, section, input, img et les autres — avec leur rôle, la règle de fermeture, les attributs courants et les balises voisines.",
    '126 HTML टैग उद्देश्य के अनुसार — div, section, input, img और बाक़ी — हर एक का काम, बंद नियम, सामान्य विशेषण और सहवर्ती टैग।',
  ),

  metaTitle: T(
    (n: string) => `<${n}> 태그 — 쓰임과 속성`,
    (n: string) => `The <${n}> tag — what it does and its attributes`,
    (n: string) => `La etiqueta <${n}> — para qué sirve y sus atributos`,
    (n: string) => `A tag <${n}> — para que serve e seus atributos`,
    (n: string) => `<${n}> タグ — 役割と属性`,
    (n: string) => `Das <${n}>-Tag — Aufgabe und Attribute`,
    (n: string) => `La balise <${n}> — rôle et attributs`,
    (n: string) => `<${n}> टैग — काम और विशेषण`,
  ),

  metaDesc: T(
    (n: string, d: string) => `HTML <${n}> 태그의 뜻과 쓰는 법입니다. ${d}`,
    (n: string, d: string) => `What the HTML <${n}> tag means and how to write it. ${d}`,
    (n: string, d: string) => `Qué significa la etiqueta HTML <${n}> y cómo se escribe. ${d}`,
    (n: string, d: string) => `O que significa a tag HTML <${n}> e como escrevê-la. ${d}`,
    (n: string, d: string) => `HTMLの <${n}> タグの意味と書き方です。${d}`,
    (n: string, d: string) => `Was das HTML-Tag <${n}> bedeutet und wie man es schreibt. ${d}`,
    (n: string, d: string) => `Ce que signifie la balise HTML <${n}> et comment l'écrire. ${d}`,
    (n: string, d: string) => `HTML <${n}> टैग का अर्थ और उसे लिखने का तरीक़ा। ${d}`,
  ),

  hubFaq: T(
    [
      { q: 'HTML 태그는 모두 몇 개인가요?', a: '표준에 살아 있는 태그는 110개 안팎이고, 폐기된 것까지 더하면 130개쯤 됩니다. 여기에는 지금 쓰는 태그와 옛 문서에서 만나는 태그를 함께 126개 실었습니다.' },
      { q: '닫는 태그가 없는 태그는 무엇인가요?', a: 'img·br·hr·input·meta·link처럼 안에 내용이 없는 태그들입니다. 이런 태그에 </img>를 붙이면 브라우저가 무시합니다. XHTML 시절 습관대로 <br />처럼 슬래시를 넣어도 되지만, HTML에서는 없어도 같습니다.' },
      { q: 'div와 section은 뭐가 다른가요?', a: 'div는 아무 뜻이 없는 상자이고, section은 제목을 가진 하나의 주제 묶음입니다. 그 자리에 제목을 붙일 수 있으면 section, 그저 묶어서 스타일만 주려는 것이면 div가 맞습니다.' },
      { q: '태그 이름은 대문자로 써도 되나요?', a: 'HTML에서는 대소문자를 가리지 않아 <DIV>도 동작합니다. 다만 관행은 소문자이고, XHTML이나 SVG처럼 XML 규칙을 따르는 곳에서는 소문자만 유효합니다.' },
      { q: '폐기된 태그를 쓰면 어떻게 되나요?', a: '브라우저 대부분이 아직 그려 주기는 합니다. 다만 표준에서 물러난 태그라 언제 사라져도 이상하지 않고, 대체 수단이 이미 있습니다 — center는 CSS로, font도 CSS로, marquee는 CSS 애니메이션으로 대신합니다.' },
    ],
    [
      { q: 'How many HTML tags are there?', a: 'Around 110 remain in the living standard, and roughly 130 counting the obsolete ones. This reference lists 126 — the ones in use today plus those you still meet in old documents.' },
      { q: 'Which tags have no closing tag?', a: 'Those with no content: img, br, hr, input, meta, link and a few more. Writing </img> does nothing. The XHTML-style slash in <br /> is allowed but changes nothing in HTML.' },
      { q: 'What is the difference between div and section?', a: 'A div is a box with no meaning; a section is a thematic group that has a heading. If a heading would fit there, use section; if you only need something to hang styles on, div is the honest choice.' },
      { q: 'Can tag names be uppercase?', a: 'HTML is case-insensitive, so <DIV> works. Lowercase is the convention, and in XML-based contexts such as XHTML or SVG only lowercase is valid.' },
      { q: 'What happens if I use an obsolete tag?', a: 'Most browsers still render it. But the standard has dropped it, so it may disappear at any time — and the replacements already exist: CSS for center and font, CSS animation for marquee.' },
    ],
    [
      { q: '¿Cuántas etiquetas HTML hay?', a: 'Unas 110 siguen vivas en el estándar y alrededor de 130 contando las obsoletas. Esta referencia recoge 126: las que se usan hoy y las que aún aparecen en documentos antiguos.' },
      { q: '¿Qué etiquetas no llevan cierre?', a: 'Las que no tienen contenido: img, br, hr, input, meta, link y alguna más. Escribir </img> no hace nada. La barra al estilo XHTML de <br /> se permite, pero en HTML no cambia nada.' },
      { q: '¿En qué se diferencian div y section?', a: 'Un div es una caja sin significado; una section es un grupo temático con encabezado. Si cabría un título ahí, usa section; si solo necesitas algo donde colgar estilos, div es lo honesto.' },
      { q: '¿Se pueden escribir en mayúsculas?', a: 'HTML no distingue mayúsculas, así que <DIV> funciona. La convención es minúscula, y en contextos XML como XHTML o SVG solo la minúscula es válida.' },
      { q: '¿Qué pasa si uso una etiqueta obsoleta?', a: 'La mayoría de navegadores todavía la dibuja. Pero el estándar la retiró, así que puede desaparecer en cualquier momento, y ya existen sustitutos: CSS para center y font, animación CSS para marquee.' },
    ],
    [
      { q: 'Quantas tags HTML existem?', a: 'Cerca de 110 seguem vivas no padrão e por volta de 130 contando as obsoletas. Esta referência traz 126: as usadas hoje e as que ainda aparecem em documentos antigos.' },
      { q: 'Quais tags não têm fechamento?', a: 'As sem conteúdo: img, br, hr, input, meta, link e algumas outras. Escrever </img> não faz nada. A barra no estilo XHTML de <br /> é permitida, mas em HTML não muda nada.' },
      { q: 'Qual a diferença entre div e section?', a: 'Div é uma caixa sem significado; section é um grupo temático com título. Se um título caberia ali, use section; se você só precisa de algo para pendurar estilos, div é a escolha honesta.' },
      { q: 'Posso escrever os nomes em maiúsculas?', a: 'HTML não diferencia maiúsculas, então <DIV> funciona. A convenção é minúscula, e em contextos XML como XHTML ou SVG só a minúscula vale.' },
      { q: 'O que acontece se eu usar uma tag obsoleta?', a: 'A maioria dos navegadores ainda desenha. Mas o padrão a aposentou, então ela pode sumir a qualquer momento — e já há substitutos: CSS para center e font, animação CSS para marquee.' },
    ],
    [
      { q: 'HTMLタグは全部でいくつありますか。', a: '現行の標準に残っているのは110ほど、廃止されたものを含めると130前後です。ここでは今使うタグと古い文書で出会うタグを合わせて126個を載せています。' },
      { q: '閉じタグがないタグはどれですか。', a: '中身を持たないタグ、img・br・hr・input・meta・linkなどです。</img>と書いても何も起きません。XHTML風に<br />とスラッシュを入れても構いませんが、HTMLでは同じです。' },
      { q: 'divとsectionは何が違いますか。', a: 'divは意味のない箱で、sectionは見出しを持つ一つの主題のまとまりです。そこに見出しを付けられるならsection、まとめてスタイルを当てたいだけならdivが正直な選択です。' },
      { q: 'タグ名は大文字でもよいですか。', a: 'HTMLは大文字小文字を区別しないので<DIV>でも動きます。慣習は小文字で、XHTMLやSVGのようにXMLの規則に従う場所では小文字だけが有効です。' },
      { q: '廃止されたタグを使うとどうなりますか。', a: 'ほとんどのブラウザーはまだ描画します。ただし標準から外れているのでいつ消えてもおかしくなく、代わりの手段はすでにあります — centerもfontもCSSで、marqueeはCSSアニメーションで置き換えます。' },
    ],
    [
      { q: 'Wie viele HTML-Tags gibt es?', a: 'Rund 110 leben im aktuellen Standard, mit den veralteten etwa 130. Diese Referenz führt 126 — die heute gebräuchlichen und jene, die einem in alten Dokumenten begegnen.' },
      { q: 'Welche Tags haben kein End-Tag?', a: 'Die inhaltslosen: img, br, hr, input, meta, link und einige mehr. Ein </img> bewirkt nichts. Der XHTML-Schrägstrich in <br /> ist erlaubt, ändert in HTML aber nichts.' },
      { q: 'Worin unterscheiden sich div und section?', a: 'Ein div ist ein bedeutungsloser Kasten, eine section eine thematische Gruppe mit Überschrift. Passt dort eine Überschrift, nimm section; brauchst du nur etwas für Styles, ist div ehrlich.' },
      { q: 'Dürfen Tag-Namen groß geschrieben werden?', a: 'HTML unterscheidet keine Groß- und Kleinschreibung, <DIV> funktioniert also. Üblich ist Kleinschreibung, und in XML-Kontexten wie XHTML oder SVG ist nur sie gültig.' },
      { q: 'Was passiert bei veralteten Tags?', a: 'Die meisten Browser stellen sie noch dar. Der Standard hat sie jedoch fallen gelassen, sie können jederzeit verschwinden — und Ersatz gibt es längst: CSS für center und font, CSS-Animation für marquee.' },
    ],
    [
      { q: 'Combien y a-t-il de balises HTML ?', a: "Environ 110 subsistent dans la norme vivante, et près de 130 en comptant les obsolètes. Cette référence en liste 126 : celles d'aujourd'hui et celles que l'on croise encore dans d'anciens documents." },
      { q: 'Quelles balises ne se ferment pas ?', a: "Celles sans contenu : img, br, hr, input, meta, link et quelques autres. Écrire </img> ne fait rien. La barre à la XHTML dans <br /> est tolérée mais ne change rien en HTML." },
      { q: 'Quelle différence entre div et section ?', a: "Un div est une boîte sans signification ; une section est un groupe thématique doté d'un titre. Si un titre aurait sa place, prenez section ; s'il ne s'agit que d'accrocher des styles, div est honnête." },
      { q: 'Les noms de balises peuvent-ils être en majuscules ?', a: "HTML ne distingue pas la casse, <DIV> fonctionne donc. L'usage est la minuscule, et dans les contextes XML comme XHTML ou SVG, seule la minuscule est valide." },
      { q: "Que se passe-t-il si j'utilise une balise obsolète ?", a: "La plupart des navigateurs l'affichent encore. Mais la norme l'a retirée : elle peut disparaître à tout moment, et les remplaçants existent déjà — CSS pour center et font, animation CSS pour marquee." },
    ],
    [
      { q: 'HTML टैग कुल कितने हैं?', a: 'मौजूदा मानक में लगभग 110 जीवित हैं, और अप्रचलित मिलाकर करीब 130। यह संदर्भ 126 देता है — आज इस्तेमाल होने वाले और वे जो पुराने दस्तावेज़ों में मिलते हैं।' },
      { q: 'किन टैग का बंद टैग नहीं होता?', a: 'जिनमें सामग्री नहीं होती: img, br, hr, input, meta, link और कुछ और। </img> लिखने से कुछ नहीं होता। <br /> में XHTML शैली की स्लैश मान्य है, पर HTML में कोई फ़र्क नहीं पड़ता।' },
      { q: 'div और section में क्या अंतर है?', a: 'div बिना अर्थ का डिब्बा है; section शीर्षक वाला विषयगत समूह है। यदि वहाँ शीर्षक बैठ सकता हो तो section लें; केवल स्टाइल टाँगनी हो तो div ही ईमानदार विकल्प है।' },
      { q: 'क्या टैग नाम बड़े अक्षरों में लिख सकते हैं?', a: 'HTML में अक्षर-भेद नहीं है, इसलिए <DIV> भी चलता है। प्रचलन छोटे अक्षरों का है, और XHTML या SVG जैसे XML संदर्भों में केवल छोटे अक्षर मान्य हैं।' },
      { q: 'अप्रचलित टैग इस्तेमाल करने पर क्या होता है?', a: 'ज़्यादातर ब्राउज़र अब भी उन्हें दिखाते हैं। पर मानक ने उन्हें हटा दिया है, वे कभी भी ग़ायब हो सकते हैं — और विकल्प पहले से हैं: center और font के लिए CSS, marquee के लिए CSS एनिमेशन।' },
    ],
  ),

  tagFaq: T(
    (f: TagFacts, d: string, kind: string) => [
      { q: `HTML <${f.name}> 태그는 무엇인가요?`, a: d },
      { q: `<${f.name}>는 어떻게 쓰나요?`, a: `${f.example} 꼴로 씁니다. ${f.isVoid ? '내용이 없는 태그라 닫는 태그를 붙이지 않습니다.' : `여는 ${f.open}와 닫는 ${f.close}가 짝을 이룹니다.`}` },
      { q: `<${f.name}>에 자주 쓰는 속성은?`, a: f.attrs.length ? `${f.attrs.join(', ')} 등을 함께 씁니다.` : '이 태그에는 특별히 자주 쓰는 속성이 없습니다. 모든 태그가 공통으로 갖는 class·id·style은 쓸 수 있습니다.' },
      { q: `<${f.name}>는 어느 갈래인가요?`, a: `${kind} 갈래입니다.${f.deprecated ? ' 표준에서 물러난 태그라 새 문서에는 쓰지 않습니다.' : ''}` },
    ],
    (f: TagFacts, d: string, kind: string) => [
      { q: `What is the HTML <${f.name}> tag?`, a: d },
      { q: `How do you write <${f.name}>?`, a: `As ${f.example}. ${f.isVoid ? 'It has no content, so there is no closing tag.' : `The opening ${f.open} pairs with the closing ${f.close}.`}` },
      { q: `Which attributes are common on <${f.name}>?`, a: f.attrs.length ? `${f.attrs.join(', ')} are the usual ones.` : 'None in particular. The global attributes every element has — class, id, style — still apply.' },
      { q: `What group does <${f.name}> belong to?`, a: `The ${kind.toLowerCase()} group.${f.deprecated ? ' It has been retired from the standard, so it does not belong in new pages.' : ''}` },
    ],
    (f: TagFacts, d: string, kind: string) => [
      { q: `¿Qué es la etiqueta HTML <${f.name}>?`, a: d },
      { q: `¿Cómo se escribe <${f.name}>?`, a: `Así: ${f.example}. ${f.isVoid ? 'No tiene contenido, por eso no lleva cierre.' : `La apertura ${f.open} se empareja con el cierre ${f.close}.`}` },
      { q: `¿Qué atributos son habituales en <${f.name}>?`, a: f.attrs.length ? `Los habituales son ${f.attrs.join(', ')}.` : 'Ninguno en especial. Siguen valiendo los atributos globales: class, id, style.' },
      { q: `¿A qué grupo pertenece <${f.name}>?`, a: `Al grupo ${kind.toLowerCase()}.${f.deprecated ? ' Se retiró del estándar, así que no cabe en páginas nuevas.' : ''}` },
    ],
    (f: TagFacts, d: string, kind: string) => [
      { q: `O que é a tag HTML <${f.name}>?`, a: d },
      { q: `Como se escreve <${f.name}>?`, a: `Assim: ${f.example}. ${f.isVoid ? 'Não tem conteúdo, por isso não leva fechamento.' : `A abertura ${f.open} forma par com o fechamento ${f.close}.`}` },
      { q: `Quais atributos são comuns em <${f.name}>?`, a: f.attrs.length ? `Os comuns são ${f.attrs.join(', ')}.` : 'Nenhum em especial. Os atributos globais continuam valendo: class, id, style.' },
      { q: `A que grupo pertence <${f.name}>?`, a: `Ao grupo ${kind.toLowerCase()}.${f.deprecated ? ' Foi aposentada do padrão, então não cabe em páginas novas.' : ''}` },
    ],
    (f: TagFacts, d: string, kind: string) => [
      { q: `HTMLの <${f.name}> タグとは何ですか。`, a: d },
      { q: `<${f.name}> はどう書きますか。`, a: `${f.example} のように書きます。${f.isVoid ? '内容がないタグなので閉じタグは付けません。' : `開く ${f.open} と閉じる ${f.close} が対になります。`}` },
      { q: `<${f.name}> でよく使う属性は。`, a: f.attrs.length ? `${f.attrs.join('、')} などを一緒に使います。` : 'とくに決まった属性はありません。すべての要素が持つ class・id・style は使えます。' },
      { q: `<${f.name}> はどの分類ですか。`, a: `${kind}の分類です。${f.deprecated ? ' 標準から退いたタグなので、新しい文書では使いません。' : ''}` },
    ],
    (f: TagFacts, d: string, kind: string) => [
      { q: `Was ist das HTML-Tag <${f.name}>?`, a: d },
      { q: `Wie schreibt man <${f.name}>?`, a: `Als ${f.example}. ${f.isVoid ? 'Es hat keinen Inhalt, deshalb gibt es kein End-Tag.' : `Das öffnende ${f.open} bildet ein Paar mit dem schließenden ${f.close}.`}` },
      { q: `Welche Attribute sind bei <${f.name}> üblich?`, a: f.attrs.length ? `Üblich sind ${f.attrs.join(', ')}.` : 'Keine besonderen. Die globalen Attribute class, id und style gelten weiterhin.' },
      { q: `Zu welcher Gruppe gehört <${f.name}>?`, a: `Zur Gruppe ${kind}.${f.deprecated ? ' Es wurde aus dem Standard entfernt und gehört nicht in neue Seiten.' : ''}` },
    ],
    (f: TagFacts, d: string, kind: string) => [
      { q: `Qu'est-ce que la balise HTML <${f.name}> ?`, a: d },
      { q: `Comment écrire <${f.name}> ?`, a: `Sous la forme ${f.example}. ${f.isVoid ? "Elle n'a pas de contenu, donc pas de balise fermante." : `L'ouvrante ${f.open} va de pair avec la fermante ${f.close}.`}` },
      { q: `Quels attributs sont courants sur <${f.name}> ?`, a: f.attrs.length ? `Les plus courants sont ${f.attrs.join(', ')}.` : "Aucun en particulier. Les attributs globaux class, id et style restent utilisables." },
      { q: `À quel groupe appartient <${f.name}> ?`, a: `Au groupe ${kind.toLowerCase()}.${f.deprecated ? " Elle a été retirée de la norme : elle n'a pas sa place dans une page neuve." : ''}` },
    ],
    (f: TagFacts, d: string, kind: string) => [
      { q: `HTML <${f.name}> टैग क्या है?`, a: d },
      { q: `<${f.name}> कैसे लिखें?`, a: `इस तरह: ${f.example}। ${f.isVoid ? 'इसमें सामग्री नहीं होती, इसलिए बंद टैग नहीं लगता।' : `खुलने वाला ${f.open} और बंद होने वाला ${f.close} जोड़ा बनाते हैं।`}` },
      { q: `<${f.name}> पर कौन-से विशेषण आम हैं?`, a: f.attrs.length ? `आम तौर पर ${f.attrs.join(', ')} इस्तेमाल होते हैं।` : 'कोई विशेष नहीं। हर तत्व के वैश्विक विशेषण — class, id, style — फिर भी लागू होते हैं।' },
      { q: `<${f.name}> किस समूह का है?`, a: `${kind} समूह का।${f.deprecated ? ' यह मानक से हटाया जा चुका है, इसलिए नए पन्नों में इसका स्थान नहीं।' : ''}` },
    ],
  ),
};

/** 항목별 여덟 언어 표를 언어별 한 벌로 뒤집는다 */
export const HTML_UI: L8<HtmlUI> = Object.fromEntries(
  LANG8_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L8<unknown>)[lang as Lang8]])),
  ]),
) as unknown as L8<HtmlUI>;
