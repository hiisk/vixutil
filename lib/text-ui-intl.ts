/**
 * 텍스트 도구 화면 문구의 세 언어 사전.
 *
 * 기호·이모티콘 데이터의 이름표는 lib/text-intl.ts, 정리·치환 계산은
 * lib/text-clean.ts에 있다. 여기에는 라벨·버튼·설명 문단만 둔다.
 */
import type { TextLang } from './text-intl.ts';
export type { TextLang };

/** 여러 도구가 공유하는 입력·복사 조각 */
export const TEXT_COMMON: Record<TextLang, {
  input: string; output: string; empty: string; clear: string;
  copy: string; copied: string; copiedShort: string; copyShort: string;
}> = {
  ko: {
    input: '입력', output: '결과', empty: '위에 글을 입력하면 결과가 나옵니다', clear: '지우기',
    copy: '복사하기', copied: '✅ 복사했습니다', copiedShort: '복사됨', copyShort: '복사',
  },
  en: {
    input: 'Input', output: 'Result', empty: 'Type something above and the result appears here', clear: 'Clear',
    copy: 'Copy', copied: '✅ Copied', copiedShort: 'Copied', copyShort: 'Copy',
  },
  es: {
    input: 'Entrada', output: 'Resultado', empty: 'Escribe algo arriba y el resultado aparece aquí', clear: 'Borrar',
    copy: 'Copiar', copied: '✅ Copiado', copiedShort: 'Copiado', copyShort: 'Copiar',
  },
  'pt-br': {
    input: 'Entrada', output: 'Resultado', empty: 'Escreva algo acima e o resultado aparece aqui', clear: 'Limpar',
    copy: 'Copiar', copied: '✅ Copiado', copiedShort: 'Copiado', copyShort: 'Copiar',
  },
  ja: {
    input: '入力', output: '結果', empty: '上に文章を入れると結果が出ます', clear: '消す',
    copy: 'コピー', copied: '✅ コピーしました', copiedShort: 'コピー済み', copyShort: 'コピー',
  },
  de: {
    input: 'Eingabe', output: 'Ergebnis', empty: 'Schreib oben etwas hinein und das Ergebnis erscheint hier', clear: 'Leeren',
    copy: 'Kopieren', copied: '✅ Kopiert', copiedShort: 'Kopiert', copyShort: 'Kopieren',
  },
  fr: {
    input: 'Entrée', output: 'Résultat', empty: 'Écris quelque chose au-dessus et le résultat apparaît ici', clear: 'Effacer',
    copy: 'Copier', copied: '✅ Copié', copiedShort: 'Copié', copyShort: 'Copier',
  },
  hi: {
    input: 'इनपुट', output: 'नतीजा', empty: 'ऊपर कुछ लिखें और नतीजा यहाँ आ जाएगा', clear: 'मिटाएँ',
    copy: 'कॉपी करें', copied: '✅ कॉपी हो गया', copiedShort: 'कॉपी हुआ', copyShort: 'कॉपी',
  },
};

export const CLEAN_UI: Record<TextLang, {
  labels: string[]; hints: string[];
  inputLabel: string; placeholder: string; whatTitle: string;
  nothing: string; shrunk: (n: number) => string; cleaned: string; outputLabel: string;
}> = {
  ko: {
    labels: ['보이지 않는 문자 제거', '특수 공백을 일반 공백으로', '중복 공백 하나로', '줄 앞뒤 공백 제거', '연속 빈 줄 줄이기', '끊긴 줄 이어 붙이기', '굽은 따옴표를 일반 따옴표로', 'HTML 태그 제거'],
    hints: ['폭 없는 공백·BOM 등 — 글자 수만 늘리고 검색을 망칩니다', '공백처럼 보이지만 다른 문자(NBSP 등)', '두 칸 이상 띄어진 곳을 한 칸으로', '', '세 줄 이상 비어 있으면 한 줄만 남깁니다', 'PDF에서 복사하면 문장 중간에서 줄이 끊깁니다', '“ ” ‘ ’ → " \'', '<p> 같은 태그를 지웁니다'],
    inputLabel: '정리할 글을 붙여 넣으세요',
    placeholder: 'PDF·웹·워드에서 복사한 글을 그대로 붙여 넣으면 됩니다',
    whatTitle: '무엇을 정리할까요',
    nothing: '고칠 것이 없습니다 — 이미 깨끗한 글입니다',
    shrunk: n => `${n}자 줄었습니다`, cleaned: '정리했습니다', outputLabel: '정리된 글',
  },
  en: {
    labels: ['Remove invisible characters', 'Odd spaces to normal spaces', 'Collapse repeated spaces', 'Trim each line', 'Reduce consecutive blank lines', 'Join broken lines', 'Curly quotes to straight quotes', 'Strip HTML tags'],
    hints: ['Zero-width spaces, BOM and the like — they inflate counts and break search', 'Characters that look like a space but are not (NBSP and friends)', 'Two or more spaces become one', '', 'Three or more blank lines become one', 'Copying from a PDF breaks lines mid-sentence', '“ ” ‘ ’ → " \'', 'Removes tags like <p>'],
    inputLabel: 'Paste the text you want cleaned',
    placeholder: 'Paste text copied from a PDF, a web page or Word, exactly as it came',
    whatTitle: 'What to clean',
    nothing: 'Nothing to fix — this text is already clean',
    shrunk: n => `${n} characters removed`, cleaned: 'Cleaned', outputLabel: 'Cleaned text',
  },
  es: {
    labels: ['Quitar caracteres invisibles', 'Espacios raros a espacios normales', 'Reducir espacios repetidos', 'Recortar cada línea', 'Reducir líneas en blanco seguidas', 'Unir líneas cortadas', 'Comillas tipográficas a rectas', 'Quitar etiquetas HTML'],
    hints: ['Espacios de ancho cero, BOM y similares — inflan el recuento y estropean las búsquedas', 'Caracteres que parecen un espacio pero no lo son (NBSP y compañía)', 'Dos o más espacios pasan a uno', '', 'Tres o más líneas en blanco pasan a una', 'Copiar de un PDF corta las líneas a mitad de frase', '“ ” ‘ ’ → " \'', 'Elimina etiquetas como <p>'],
    inputLabel: 'Pega el texto que quieres limpiar',
    placeholder: 'Pega texto copiado de un PDF, una página web o Word, tal como venga',
    whatTitle: 'Qué limpiar',
    nothing: 'No hay nada que arreglar — este texto ya está limpio',
    shrunk: n => `${n} caracteres eliminados`, cleaned: 'Limpiado', outputLabel: 'Texto limpio',
  },
  'pt-br': {
    labels: ['Tirar caracteres invisíveis', 'Espaços estranhos para espaços normais', 'Reduzir espaços repetidos', 'Aparar cada linha', 'Reduzir linhas em branco seguidas', 'Juntar linhas cortadas', 'Aspas tipográficas para retas', 'Tirar etiquetas HTML'],
    hints: ['Espaços de largura zero, BOM e afins — inflam a contagem e atrapalham a busca', 'Caracteres que parecem espaço mas não são (NBSP e companhia)', 'Dois ou mais espaços viram um', '', 'Três ou mais linhas em branco viram uma', 'Copiar de um PDF corta as linhas no meio da frase', '“ ” ‘ ’ → " \'', 'Remove etiquetas como <p>'],
    inputLabel: 'Cole o texto que você quer limpar',
    placeholder: 'Cole texto copiado de um PDF, de uma página web ou do Word, do jeito que veio',
    whatTitle: 'O que limpar',
    nothing: 'Não há nada para corrigir — este texto já está limpo',
    shrunk: n => `${n} caracteres removidos`, cleaned: 'Limpo', outputLabel: 'Texto limpo',
  },
  ja: {
    labels: ['見えない文字を取り除く', '特殊な空白をふつうの空白に', '連続した空白をまとめる', '各行の前後の空白を取る', '連続した空行を減らす', '途中で切れた行をつなぐ', '曲がった引用符を直線に', 'HTMLタグを取り除く'],
    hints: ['ゼロ幅スペースやBOMなど — 文字数だけ増やして検索を壊します', '空白のように見えて実は違う文字（NBSPなど）', '二つ以上の空白を一つに', '', '三行以上空いていたら一行だけ残します', 'PDFからコピーすると文の途中で行が切れます', '“ ” ‘ ’ → " \'', '<p>のようなタグを消します'],
    inputLabel: '整えたい文章を貼り付けてください',
    placeholder: 'PDF・ウェブ・Wordからコピーした文章をそのまま貼り付けてください',
    whatTitle: '何を整えますか',
    nothing: '直すところがありません — すでにきれいな文章です',
    shrunk: n => `${n}文字減りました`, cleaned: '整えました', outputLabel: '整えた文章',
  },
  de: {
    labels: ['Unsichtbare Zeichen entfernen', 'Schräge Leerzeichen zu normalen', 'Mehrfache Leerzeichen zusammenfassen', 'Jede Zeile trimmen', 'Aufeinanderfolgende Leerzeilen reduzieren', 'Abgebrochene Zeilen zusammenziehen', 'Typografische Anführungszeichen zu geraden', 'HTML-Tags entfernen'],
    hints: ['Nullbreite Leerzeichen, BOM und Ähnliches — sie blähen die Zählung auf und brechen die Suche', 'Zeichen, die wie ein Leerzeichen aussehen, aber keines sind (NBSP und Verwandte)', 'Zwei oder mehr Leerzeichen werden eines', '', 'Drei oder mehr Leerzeilen werden eine', 'Beim Kopieren aus einem PDF brechen Zeilen mitten im Satz', '“ ” ‘ ’ → " \'', 'Entfernt Tags wie <p>'],
    inputLabel: 'Füg den Text ein, den du aufräumen willst',
    placeholder: 'Füg Text aus einem PDF, einer Webseite oder Word ein, genau so, wie er kam',
    whatTitle: 'Was aufgeräumt wird',
    nothing: 'Es gibt nichts zu richten — dieser Text ist schon sauber',
    shrunk: n => `${n} Zeichen entfernt`, cleaned: 'Aufgeräumt', outputLabel: 'Aufgeräumter Text',
  },
  fr: {
    labels: ['Supprimer les caractères invisibles', 'Espaces bizarres en espaces normaux', 'Réduire les espaces répétés', 'Rogner chaque ligne', 'Réduire les lignes vides consécutives', 'Recoller les lignes coupées', 'Guillemets typographiques en droits', 'Supprimer les balises HTML'],
    hints: ['Espaces de largeur nulle, BOM et compagnie — ils gonflent le compte et cassent la recherche', 'Des caractères qui ressemblent à un espace sans en être (NBSP et cie)', 'Deux espaces ou plus deviennent un', '', 'Trois lignes vides ou plus deviennent une', 'Copier depuis un PDF coupe les lignes au milieu des phrases', '“ ” ‘ ’ → " \'', 'Retire les balises comme <p>'],
    inputLabel: 'Colle le texte que tu veux nettoyer',
    placeholder: 'Colle du texte copié d’un PDF, d’une page web ou de Word, tel quel',
    whatTitle: 'Ce qu’on nettoie',
    nothing: 'Rien à corriger — ce texte est déjà propre',
    shrunk: n => `${n} caractères supprimés`, cleaned: 'Nettoyé', outputLabel: 'Texte nettoyé',
  },
  hi: {
    labels: ['अदृश्य अक्षर हटाएँ', 'अजीब स्पेस को सामान्य स्पेस में', 'दोहराए स्पेस समेटें', 'हर पंक्ति के किनारे छाँटें', 'लगातार खाली पंक्तियाँ घटाएँ', 'टूटी पंक्तियाँ जोड़ें', 'घुमावदार उद्धरण चिह्न सीधे करें', 'HTML टैग हटाएँ'],
    hints: ['शून्य-चौड़ाई स्पेस, BOM आदि — गिनती बढ़ाते हैं और खोज बिगाड़ते हैं', 'दिखने में स्पेस पर असल में अलग अक्षर (NBSP आदि)', 'दो या ज़्यादा स्पेस एक हो जाते हैं', '', 'तीन या ज़्यादा खाली पंक्तियाँ एक रह जाती हैं', 'PDF से कॉपी करने पर पंक्तियाँ वाक्य के बीच टूट जाती हैं', '“ ” ‘ ’ → " \'', '<p> जैसे टैग हटाता है'],
    inputLabel: 'जो पाठ साफ़ करना है वह चिपकाएँ',
    placeholder: 'PDF, वेब पेज या Word से कॉपी किया पाठ जैसा है वैसा चिपका दें',
    whatTitle: 'क्या-क्या साफ़ करें',
    nothing: 'ठीक करने को कुछ नहीं — यह पाठ पहले से साफ़ है',
    shrunk: n => `${n} अक्षर हटे`, cleaned: 'साफ़ कर दिया', outputLabel: 'साफ़ किया पाठ',
  },
};

export const DEDUPE_UI: Record<TextLang, {
  inputLabel: string; placeholder: string;
  dedupe: string; ignoreSpace: string; ignoreSpaceHint: string;
  ignoreCase: string; ignoreCaseHint: string; removeBlank: string;
  numbered: string; numberedHint: string;
  sortTitle: string; sortModes: string[];
  totalLines: string; keptLines: string; removedLines: string; outputLabel: string;
}> = {
  ko: {
    inputLabel: '목록을 붙여 넣으세요 (한 줄에 하나)', placeholder: '김철수\n이영희\n김철수\n박민수',
    dedupe: '중복 줄 제거',
    ignoreSpace: '앞뒤·중간 공백 차이는 같은 줄로', ignoreSpaceHint: "'김철수'와 '김철수 '를 하나로 봅니다",
    ignoreCase: '대소문자 차이는 같은 줄로', ignoreCaseHint: 'Apple과 apple을 하나로 봅니다',
    removeBlank: '빈 줄 제거', numbered: '번호 매기기', numberedHint: '1. 2. 3. 을 앞에 붙입니다',
    sortTitle: '정렬', sortModes: ['원래 순서', '가나다순', '역순'],
    totalLines: '원래 줄', keptLines: '남은 줄', removedLines: '지운 줄', outputLabel: '정리된 목록',
  },
  en: {
    inputLabel: 'Paste your list (one per line)', placeholder: 'Alice\nBob\nAlice\nCarol',
    dedupe: 'Remove duplicate lines',
    ignoreSpace: 'Whitespace differences count as the same line', ignoreSpaceHint: "'Alice' and 'Alice ' are treated as one",
    ignoreCase: 'Case differences count as the same line', ignoreCaseHint: 'Apple and apple are treated as one',
    removeBlank: 'Remove blank lines', numbered: 'Number the lines', numberedHint: 'Prefixes 1. 2. 3.',
    sortTitle: 'Sort', sortModes: ['Original order', 'A → Z', 'Z → A'],
    totalLines: 'Lines in', keptLines: 'Lines kept', removedLines: 'Lines removed', outputLabel: 'Tidied list',
  },
  es: {
    inputLabel: 'Pega tu lista (una por línea)', placeholder: 'Ana\nBruno\nAna\nCarla',
    dedupe: 'Quitar líneas duplicadas',
    ignoreSpace: 'Las diferencias de espacios cuentan como la misma línea', ignoreSpaceHint: "'Ana' y 'Ana ' se tratan como una",
    ignoreCase: 'Las diferencias de mayúsculas cuentan como la misma línea', ignoreCaseHint: 'Apple y apple se tratan como una',
    removeBlank: 'Quitar líneas vacías', numbered: 'Numerar las líneas', numberedHint: 'Añade 1. 2. 3. delante',
    sortTitle: 'Ordenar', sortModes: ['Orden original', 'A → Z', 'Z → A'],
    totalLines: 'Líneas de entrada', keptLines: 'Líneas que quedan', removedLines: 'Líneas eliminadas', outputLabel: 'Lista ordenada',
  },
  'pt-br': {
    inputLabel: 'Cole sua lista (uma por linha)', placeholder: 'Ana\nBruno\nAna\nCarla',
    dedupe: 'Remover linhas duplicadas',
    ignoreSpace: 'Diferenças de espaço contam como a mesma linha', ignoreSpaceHint: "'Ana' e 'Ana ' são tratadas como uma",
    ignoreCase: 'Diferenças de maiúsculas contam como a mesma linha', ignoreCaseHint: 'Apple e apple são tratadas como uma',
    removeBlank: 'Remover linhas vazias', numbered: 'Numerar as linhas', numberedHint: 'Coloca 1. 2. 3. na frente',
    sortTitle: 'Ordenar', sortModes: ['Ordem original', 'A → Z', 'Z → A'],
    totalLines: 'Linhas na entrada', keptLines: 'Linhas que sobraram', removedLines: 'Linhas removidas', outputLabel: 'Lista organizada',
  },
  ja: {
    inputLabel: 'リストを貼り付けてください（1行に1つ）', placeholder: '田中\n鈴木\n田中\n佐藤',
    dedupe: '重複行を削除',
    ignoreSpace: '前後・途中の空白の違いは同じ行とみなす', ignoreSpaceHint: '「田中」と「田中 」を一つとして扱います',
    ignoreCase: '大文字小文字の違いは同じ行とみなす', ignoreCaseHint: 'Appleとappleを一つとして扱います',
    removeBlank: '空行を削除', numbered: '番号を付ける', numberedHint: '1. 2. 3. を先頭に付けます',
    sortTitle: '並べ替え', sortModes: ['元の順番', '昇順', '降順'],
    totalLines: '元の行数', keptLines: '残った行数', removedLines: '消した行数', outputLabel: '整えたリスト',
  },
  de: {
    inputLabel: 'Füg deine Liste ein (eine pro Zeile)', placeholder: 'Anna\nBernd\nAnna\nClara',
    dedupe: 'Doppelte Zeilen entfernen',
    ignoreSpace: 'Unterschiede bei Leerzeichen gelten als dieselbe Zeile', ignoreSpaceHint: "'Anna' und 'Anna ' werden als eine behandelt",
    ignoreCase: 'Unterschiede bei Groß-/Kleinschreibung gelten als dieselbe Zeile', ignoreCaseHint: 'Apple und apple werden als eine behandelt',
    removeBlank: 'Leerzeilen entfernen', numbered: 'Zeilen numerieren', numberedHint: 'Setzt 1. 2. 3. davor',
    sortTitle: 'Sortieren', sortModes: ['Ursprüngliche Reihenfolge', 'A → Z', 'Z → A'],
    totalLines: 'Zeilen eingegeben', keptLines: 'Zeilen behalten', removedLines: 'Zeilen entfernt', outputLabel: 'Aufgeräumte Liste',
  },
  fr: {
    inputLabel: 'Colle ta liste (une par ligne)', placeholder: 'Anne\nBruno\nAnne\nClara',
    dedupe: 'Supprimer les lignes en double',
    ignoreSpace: 'Les différences d’espaces comptent comme la même ligne', ignoreSpaceHint: "'Anne' et 'Anne ' sont traitées comme une seule",
    ignoreCase: 'Les différences de casse comptent comme la même ligne', ignoreCaseHint: 'Apple et apple sont traités comme un seul',
    removeBlank: 'Supprimer les lignes vides', numbered: 'Numéroter les lignes', numberedHint: 'Ajoute 1. 2. 3. devant',
    sortTitle: 'Trier', sortModes: ['Ordre d’origine', 'A → Z', 'Z → A'],
    totalLines: 'Lignes en entrée', keptLines: 'Lignes gardées', removedLines: 'Lignes supprimées', outputLabel: 'Liste rangée',
  },
  hi: {
    inputLabel: 'अपनी सूची चिपकाएँ (एक पंक्ति में एक)', placeholder: 'अमित\nब्रिजेश\nअमित\nचारु',
    dedupe: 'दोहराई पंक्तियाँ हटाएँ',
    ignoreSpace: 'स्पेस का अंतर हो तो भी एक ही पंक्ति मानें', ignoreSpaceHint: "'अमित' और 'अमित ' को एक माना जाता है",
    ignoreCase: 'बड़े-छोटे अक्षर का अंतर हो तो भी एक ही पंक्ति मानें', ignoreCaseHint: 'Apple और apple को एक माना जाता है',
    removeBlank: 'खाली पंक्तियाँ हटाएँ', numbered: 'पंक्तियाँ गिनती में लगाएँ', numberedHint: 'आगे 1. 2. 3. जोड़ता है',
    sortTitle: 'क्रम', sortModes: ['मूल क्रम', 'अ → ह', 'ह → अ'],
    totalLines: 'दी गई पंक्तियाँ', keptLines: 'बची पंक्तियाँ', removedLines: 'हटी पंक्तियाँ', outputLabel: 'सुधरी सूची',
  },
};

export const CASE_UI: Record<TextLang, {
  labels: string[]; hints: string[];
  inputLabel: string; placeholder: string;
  noteTitle: string; note: string;
}> = {
  ko: {
    labels: ['전부 대문자 (UPPERCASE)', '전부 소문자 (lowercase)', '단어 첫 글자만 대문자 (Title Case)', '문장 첫 글자만 대문자 (Sentence case)', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', '대소문자 뒤집기'],
    hints: ['', '', '제목·이름에 씁니다', '', '변수 이름', '클래스·컴포넌트 이름', 'DB 컬럼·파이썬', 'URL·CSS 클래스', '환경변수·상수', ''],
    inputLabel: '영문 텍스트를 입력하세요', placeholder: '예) hello world example',
    noteTitle: '한글은 어떻게 되나요?',
    note: '한글에는 대문자와 소문자가 없어서 그대로 남습니다. 영문과 한글이 섞인 문장을 넣으면 영문 부분만 바뀝니다.',
  },
  en: {
    labels: ['UPPERCASE', 'lowercase', 'Title Case', 'Sentence case', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', 'tOGGLE cASE'],
    hints: ['', '', 'For headings and names', '', 'Variable names', 'Class and component names', 'DB columns, Python', 'URLs, CSS classes', 'Environment variables, constants', ''],
    inputLabel: 'Enter your text', placeholder: 'e.g. hello world example',
    noteTitle: 'What about scripts without case?',
    note: 'Scripts like Hangul, Chinese and Japanese have no upper or lower case, so those characters pass through unchanged. In mixed text only the Latin letters change.',
  },
  es: {
    labels: ['MAYÚSCULAS', 'minúsculas', 'Estilo Título', 'Estilo oración', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', 'iNVERTIR cASE'],
    hints: ['', '', 'Para titulares y nombres', '', 'Nombres de variables', 'Nombres de clases y componentes', 'Columnas de BD, Python', 'URL, clases CSS', 'Variables de entorno, constantes', ''],
    inputLabel: 'Escribe tu texto', placeholder: 'p. ej. hola mundo ejemplo',
    noteTitle: '¿Y los alfabetos sin mayúsculas?',
    note: 'Escrituras como el hangul, el chino o el japonés no tienen mayúsculas ni minúsculas, así que esos caracteres pasan sin cambios. En un texto mezclado solo cambian las letras latinas.',
  },
  'pt-br': {
    labels: ['MAIÚSCULAS', 'minúsculas', 'Estilo Título', 'Estilo frase', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', 'iNVERTER cASE'],
    hints: ['', '', 'Para títulos e nomes', '', 'Nomes de variáveis', 'Nomes de classes e componentes', 'Colunas de banco, Python', 'URLs, classes CSS', 'Variáveis de ambiente, constantes', ''],
    inputLabel: 'Escreva seu texto', placeholder: 'ex.: olá mundo exemplo',
    noteTitle: 'E as escritas sem maiúsculas?',
    note: 'Escritas como o hangul, o chinês e o japonês não têm maiúsculas nem minúsculas, então esses caracteres passam sem mudança. Num texto misto só as letras latinas mudam.',
  },
  ja: {
    labels: ['すべて大文字（UPPERCASE）', 'すべて小文字（lowercase）', '単語の頭を大文字（Title Case）', '文の頭だけ大文字（Sentence case）', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', '大文字と小文字を入れ替え'],
    hints: ['', '', '見出しや名前に使います', '', '変数名', 'クラス・コンポーネント名', 'DBの列名・Python', 'URL・CSSクラス', '環境変数・定数', ''],
    inputLabel: '英字のテキストを入れてください', placeholder: '例）hello world example',
    noteTitle: '日本語はどうなりますか',
    note: '日本語には大文字と小文字がないのでそのまま残ります。英字と日本語が混ざった文章を入れると、英字の部分だけが変わります。',
  },
  de: {
    labels: ['GROSSBUCHSTABEN', 'kleinbuchstaben', 'Title Case', 'Satzanfang groß', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', 'gROSS uND kLEIN tAUSCHEN'],
    hints: ['', '', 'Für Überschriften und Namen', '', 'Variablennamen', 'Klassen- und Komponentennamen', 'DB-Spalten, Python', 'URLs, CSS-Klassen', 'Umgebungsvariablen, Konstanten', ''],
    inputLabel: 'Gib deinen Text ein', placeholder: 'z. B. hallo welt beispiel',
    noteTitle: 'Und Schriften ohne Groß- und Kleinschreibung?',
    note: 'Schriften wie Hangul, Chinesisch und Japanisch kennen keine Groß- und Kleinschreibung, diese Zeichen gehen also unverändert durch. In gemischtem Text ändern sich nur die lateinischen Buchstaben.',
  },
  fr: {
    labels: ['MAJUSCULES', 'minuscules', 'Style Titre', 'Style phrase', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', 'iNVERSER lA cASSE'],
    hints: ['', '', 'Pour les titres et les noms', '', 'Noms de variables', 'Noms de classes et de composants', 'Colonnes de base, Python', 'URL, classes CSS', 'Variables d’environnement, constantes', ''],
    inputLabel: 'Saisis ton texte', placeholder: 'ex. bonjour monde exemple',
    noteTitle: 'Et les écritures sans casse ?',
    note: 'Des écritures comme le hangul, le chinois et le japonais n’ont ni majuscules ni minuscules : ces caractères passent inchangés. Dans un texte mixte, seules les lettres latines changent.',
  },
  hi: {
    labels: ['UPPERCASE (सभी बड़े)', 'lowercase (सभी छोटे)', 'Title Case', 'Sentence case', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'CONSTANT_CASE', 'बड़े-छोटे उलटें'],
    hints: ['', '', 'शीर्षक और नामों के लिए', '', 'वेरिएबल के नाम', 'क्लास और कंपोनेंट के नाम', 'DB कॉलम, Python', 'URL, CSS क्लास', 'एनवायरनमेंट वेरिएबल, स्थिरांक', ''],
    inputLabel: 'अपना पाठ लिखें', placeholder: 'जैसे hello world example',
    noteTitle: 'देवनागरी का क्या होता है?',
    note: 'देवनागरी, हंगुल, चीनी और जापानी में बड़े-छोटे अक्षर नहीं होते, इसलिए वे अक्षर वैसे ही रहते हैं। मिले-जुले पाठ में सिर्फ़ रोमन अक्षर बदलते हैं।',
  },
};

export const REPLACE_UI: Record<TextLang, {
  sourceLabel: string; sourcePlaceholder: string;
  findLabel: string; findPlaceholder: string; toLabel: string; toPlaceholder: string;
  caseSensitive: string; caseSensitiveHint: string; regex: string; regexHint: string;
  escapeNoteBefore: string; escapeNoteMid: string; escapeNoteAfter: string;
  regexError: (msg: string) => string;
  willChange: (n: number) => string; noMatch: string; outputLabel: string;
}> = {
  ko: {
    sourceLabel: '원본 글', sourcePlaceholder: '바꿀 내용이 들어 있는 글을 붙여 넣으세요',
    findLabel: '찾을 내용', findPlaceholder: '바꿀 단어', toLabel: '바꿀 내용', toPlaceholder: '새 단어 (비우면 삭제)',
    caseSensitive: '대소문자 구분', caseSensitiveHint: '끄면 Apple과 apple을 모두 찾습니다',
    regex: '정규식으로 찾기', regexHint: '\\d+ 처럼 패턴으로 찾습니다',
    escapeNoteBefore: '찾을 내용에 ', escapeNoteMid: '을 넣으면 줄바꿈을, ', escapeNoteAfter: '는 탭을 찾습니다.',
    regexError: msg => `정규식 오류: ${msg}`,
    willChange: n => `${n}곳이 바뀝니다`, noMatch: '찾는 내용이 없습니다', outputLabel: '바꾼 결과',
  },
  en: {
    sourceLabel: 'Source text', sourcePlaceholder: 'Paste the text containing what you want to change',
    findLabel: 'Find', findPlaceholder: 'word to replace', toLabel: 'Replace with', toPlaceholder: 'new word (leave empty to delete)',
    caseSensitive: 'Match case', caseSensitiveHint: 'Off means Apple and apple both match',
    regex: 'Use a regular expression', regexHint: 'Match patterns like \\d+',
    escapeNoteBefore: 'Put ', escapeNoteMid: ' in the find field to match a newline, and ', escapeNoteAfter: ' for a tab.',
    regexError: msg => `Regex error: ${msg}`,
    willChange: n => `${n} matches will change`, noMatch: 'No matches found', outputLabel: 'Result',
  },
  es: {
    sourceLabel: 'Texto original', sourcePlaceholder: 'Pega el texto que contiene lo que quieres cambiar',
    findLabel: 'Buscar', findPlaceholder: 'palabra a reemplazar', toLabel: 'Reemplazar por', toPlaceholder: 'palabra nueva (déjalo vacío para borrar)',
    caseSensitive: 'Distinguir mayúsculas', caseSensitiveHint: 'Desactivado encuentra Apple y apple',
    regex: 'Buscar con expresión regular', regexHint: 'Busca patrones como \\d+',
    escapeNoteBefore: 'Pon ', escapeNoteMid: ' en el campo de búsqueda para encontrar un salto de línea, y ', escapeNoteAfter: ' para un tabulador.',
    regexError: msg => `Error de expresión regular: ${msg}`,
    willChange: n => `Van a cambiar ${n} coincidencias`, noMatch: 'No se encontró nada', outputLabel: 'Resultado',
  },
  'pt-br': {
    sourceLabel: 'Texto original', sourcePlaceholder: 'Cole o texto que contém o que você quer mudar',
    findLabel: 'Localizar', findPlaceholder: 'palavra a substituir', toLabel: 'Substituir por', toPlaceholder: 'palavra nova (deixe vazio para apagar)',
    caseSensitive: 'Diferenciar maiúsculas', caseSensitiveHint: 'Desligado acha Apple e apple',
    regex: 'Buscar com expressão regular', regexHint: 'Busca padrões como \\d+',
    escapeNoteBefore: 'Coloque ', escapeNoteMid: ' no campo de busca para achar uma quebra de linha, e ', escapeNoteAfter: ' para uma tabulação.',
    regexError: msg => `Erro na expressão regular: ${msg}`,
    willChange: n => `${n} ocorrências vão mudar`, noMatch: 'Nada encontrado', outputLabel: 'Resultado',
  },
  ja: {
    sourceLabel: '元の文章', sourcePlaceholder: '変えたい内容が入っている文章を貼り付けてください',
    findLabel: '検索する文字', findPlaceholder: '置き換える語', toLabel: '置き換える文字', toPlaceholder: '新しい語（空にすると削除）',
    caseSensitive: '大文字小文字を区別', caseSensitiveHint: 'オフにするとAppleとappleの両方を見つけます',
    regex: '正規表現で検索', regexHint: '\\d+ のようなパターンで検索します',
    escapeNoteBefore: '検索欄に ', escapeNoteMid: ' を入れると改行、', escapeNoteAfter: ' はタブを検索します。',
    regexError: msg => `正規表現のエラー: ${msg}`,
    willChange: n => `${n}か所が変わります`, noMatch: '見つかりませんでした', outputLabel: '置き換えた結果',
  },
  de: {
    sourceLabel: 'Ausgangstext', sourcePlaceholder: 'Füg den Text ein, in dem etwas geändert werden soll',
    findLabel: 'Suchen', findPlaceholder: 'zu ersetzendes Wort', toLabel: 'Ersetzen durch', toPlaceholder: 'neues Wort (leer lassen zum Löschen)',
    caseSensitive: 'Groß-/Kleinschreibung beachten', caseSensitiveHint: 'Aus findet Apple und apple',
    regex: 'Mit regulärem Ausdruck suchen', regexHint: 'Sucht Muster wie \\d+',
    escapeNoteBefore: 'Trag ', escapeNoteMid: ' im Suchfeld ein, um einen Umbruch zu finden, und ', escapeNoteAfter: ' für einen Tabulator.',
    regexError: msg => `Fehler im regulären Ausdruck: ${msg}`,
    willChange: n => `${n} Stellen werden geändert`, noMatch: 'Nichts gefunden', outputLabel: 'Ergebnis',
  },
  fr: {
    sourceLabel: 'Texte source', sourcePlaceholder: 'Colle le texte qui contient ce que tu veux changer',
    findLabel: 'Rechercher', findPlaceholder: 'mot à remplacer', toLabel: 'Remplacer par', toPlaceholder: 'nouveau mot (laisse vide pour supprimer)',
    caseSensitive: 'Respecter la casse', caseSensitiveHint: 'Désactivé, trouve Apple et apple',
    regex: 'Chercher avec une expression régulière', regexHint: 'Cherche des motifs comme \\d+',
    escapeNoteBefore: 'Mets ', escapeNoteMid: ' dans le champ de recherche pour trouver un retour à la ligne, et ', escapeNoteAfter: ' pour une tabulation.',
    regexError: msg => `Erreur d’expression régulière : ${msg}`,
    willChange: n => `${n} occurrences vont changer`, noMatch: 'Rien trouvé', outputLabel: 'Résultat',
  },
  hi: {
    sourceLabel: 'मूल पाठ', sourcePlaceholder: 'जिस पाठ में बदलाव करना है वह चिपकाएँ',
    findLabel: 'खोजें', findPlaceholder: 'जो शब्द बदलना है', toLabel: 'इससे बदलें', toPlaceholder: 'नया शब्द (खाली छोड़ें तो हट जाएगा)',
    caseSensitive: 'बड़े-छोटे अक्षर का भेद', caseSensitiveHint: 'बंद करने पर Apple और apple दोनों मिलते हैं',
    regex: 'नियमित अभिव्यक्ति से खोजें', regexHint: '\\d+ जैसे पैटर्न से खोजता है',
    escapeNoteBefore: 'खोज के खाने में ', escapeNoteMid: ' डालें तो लाइन ब्रेक मिलेगा, और ', escapeNoteAfter: ' से टैब।',
    regexError: msg => `नियमित अभिव्यक्ति में त्रुटि: ${msg}`,
    willChange: n => `${n} जगह बदलेंगी`, noMatch: 'कुछ नहीं मिला', outputLabel: 'बदला नतीजा',
  },
};

export const MANUSCRIPT_UI: Record<TextLang, {
  inputLabel: string; placeholder: string;
  withSpaces: string; withoutSpaces: string; sheets200: string; sheets400: string;
  sheetSuffix: (n: number) => string;
  words: string; lines: string; paragraphs: string; bytes: string;
  targetTitle: string; countingWith: string; countingWithout: string;
  charSuffix: (n: number) => string; emptyHint: string;
  used: (used: number, target: number, left: number) => string;
  over: (used: number, target: number, over: number) => string;
  noteTitle: string; notes: string[];
}> = {
  ko: {
    inputLabel: '글을 붙여 넣으세요', placeholder: '자기소개서나 원고를 그대로 붙여 넣으면 됩니다',
    withSpaces: '공백 포함', withoutSpaces: '공백 제외', sheets200: '200자 원고지', sheets400: '400자 원고지',
    sheetSuffix: n => `${n}매`,
    words: '단어', lines: '줄', paragraphs: '문단', bytes: '바이트(UTF-8)',
    targetTitle: '목표 글자수', countingWith: '공백 포함으로 세는 중', countingWithout: '공백 제외로 세는 중',
    charSuffix: n => `${n}자`, emptyHint: '글을 넣으면 남은 글자수를 세어 드립니다',
    used: (used, target, left) => `${used}자 / ${target}자 · ${left}자 더 쓸 수 있습니다`,
    over: (used, target, over) => `${used}자 / ${target}자 · ${over}자 초과했습니다`,
    noteTitle: '기준이 헷갈릴 때',
    notes: [
      '· 자기소개서는 대개 공백 포함으로 셉니다. 채용 공고에 명시가 없으면 공백 포함으로 맞추는 편이 안전합니다.',
      '· 원고지는 칸을 세므로 띄어쓰기도 한 칸을 차지합니다. 그래서 원고지 매수는 공백 포함 글자수로 계산합니다.',
      '· 입력창에 글자수 제한이 걸린 사이트는 대부분 공백을 포함해 셉니다.',
    ],
  },
  en: {
    inputLabel: 'Paste your text', placeholder: 'Paste an essay, an application or a draft exactly as it is',
    withSpaces: 'With spaces', withoutSpaces: 'Without spaces', sheets200: 'Pages (200 chars)', sheets400: 'Pages (400 chars)',
    sheetSuffix: n => `${n}`,
    words: 'Words', lines: 'Lines', paragraphs: 'Paragraphs', bytes: 'Bytes (UTF-8)',
    targetTitle: 'Your limit', countingWith: 'counting with spaces', countingWithout: 'counting without spaces',
    charSuffix: n => `${n}`, emptyHint: 'Add some text and it counts what you have left',
    used: (used, target, left) => `${used} / ${target} · ${left} left`,
    over: (used, target, over) => `${used} / ${target} · ${over} over`,
    noteTitle: 'Which count do you need',
    notes: [
      '· Application forms almost always count characters including spaces. When the brief does not say, assume spaces count.',
      '· Word count is the usual measure for essays and articles; character count is what forms and input fields enforce.',
      '· Sites with a character limit on the input field nearly always include spaces in it.',
    ],
  },
  es: {
    inputLabel: 'Pega tu texto', placeholder: 'Pega una redacción, una solicitud o un borrador tal como está',
    withSpaces: 'Con espacios', withoutSpaces: 'Sin espacios', sheets200: 'Páginas (200 caracteres)', sheets400: 'Páginas (400 caracteres)',
    sheetSuffix: n => `${n}`,
    words: 'Palabras', lines: 'Líneas', paragraphs: 'Párrafos', bytes: 'Bytes (UTF-8)',
    targetTitle: 'Tu límite', countingWith: 'contando con espacios', countingWithout: 'contando sin espacios',
    charSuffix: n => `${n}`, emptyHint: 'Añade texto y te cuenta lo que te queda',
    used: (used, target, left) => `${used} / ${target} · te quedan ${left}`,
    over: (used, target, over) => `${used} / ${target} · ${over} de más`,
    noteTitle: 'Qué recuento necesitas',
    notes: [
      '· Los formularios de solicitud casi siempre cuentan caracteres incluyendo los espacios. Si la convocatoria no lo dice, da por hecho que los espacios cuentan.',
      '· El recuento de palabras es la medida habitual para redacciones y artículos; el de caracteres es lo que imponen los formularios y los campos de texto.',
      '· Las webs con un límite de caracteres en el campo casi siempre incluyen los espacios.',
    ],
  },
  'pt-br': {
    inputLabel: 'Cole seu texto', placeholder: 'Cole uma redação, uma inscrição ou um rascunho do jeito que está',
    withSpaces: 'Com espaços', withoutSpaces: 'Sem espaços', sheets200: 'Páginas (200 caracteres)', sheets400: 'Páginas (400 caracteres)',
    sheetSuffix: n => `${n}`,
    words: 'Palavras', lines: 'Linhas', paragraphs: 'Parágrafos', bytes: 'Bytes (UTF-8)',
    targetTitle: 'Seu limite', countingWith: 'contando com espaços', countingWithout: 'contando sem espaços',
    charSuffix: n => `${n}`, emptyHint: 'Coloque um texto e ele conta o que ainda cabe',
    used: (used, target, left) => `${used} / ${target} · faltam ${left}`,
    over: (used, target, over) => `${used} / ${target} · ${over} a mais`,
    noteTitle: 'De qual contagem você precisa',
    notes: [
      '· Formulários de inscrição quase sempre contam caracteres incluindo os espaços. Se o edital não disser, assuma que os espaços contam.',
      '· A contagem de palavras é a medida usual para redações e artigos; a de caracteres é o que formulários e campos de texto impõem.',
      '· Sites com limite de caracteres no campo quase sempre incluem os espaços.',
    ],
  },
  ja: {
    inputLabel: '文章を貼り付けてください', placeholder: 'エントリーシートや原稿をそのまま貼り付けてください',
    withSpaces: '空白を含む', withoutSpaces: '空白を除く', sheets200: '原稿用紙（200字）', sheets400: '原稿用紙（400字）',
    sheetSuffix: n => `${n}枚`,
    words: '単語', lines: '行', paragraphs: '段落', bytes: 'バイト（UTF-8）',
    targetTitle: '上限の文字数', countingWith: '空白を含めて数えています', countingWithout: '空白を除いて数えています',
    charSuffix: n => `${n}字`, emptyHint: '文章を入れると残りの文字数を数えます',
    used: (used, target, left) => `${used}字 / ${target}字 · あと${left}字書けます`,
    over: (used, target, over) => `${used}字 / ${target}字 · ${over}字超えています`,
    noteTitle: '基準に迷ったら',
    notes: [
      '· エントリーシートはたいてい空白を含めて数えます。募集要項に明記がなければ、空白を含めて合わせるほうが安全です。',
      '· 原稿用紙はマスを数えるので、空白も1マスを占めます。だから原稿用紙の枚数は空白を含む文字数で計算します。',
      '· 入力欄に文字数制限があるサイトは、ほとんど空白を含めて数えています。',
    ],
  },
  de: {
    inputLabel: 'Füg deinen Text ein', placeholder: 'Füg einen Aufsatz, eine Bewerbung oder einen Entwurf genau so ein, wie er ist',
    withSpaces: 'Mit Leerzeichen', withoutSpaces: 'Ohne Leerzeichen', sheets200: 'Seiten (200 Zeichen)', sheets400: 'Seiten (400 Zeichen)',
    sheetSuffix: n => `${n}`,
    words: 'Wörter', lines: 'Zeilen', paragraphs: 'Absätze', bytes: 'Bytes (UTF-8)',
    targetTitle: 'Dein Limit', countingWith: 'gezählt mit Leerzeichen', countingWithout: 'gezählt ohne Leerzeichen',
    charSuffix: n => `${n}`, emptyHint: 'Füg Text ein und es zählt, was dir noch bleibt',
    used: (used, target, left) => `${used} / ${target} · ${left} übrig`,
    over: (used, target, over) => `${used} / ${target} · ${over} zu viel`,
    noteTitle: 'Welche Zählung du brauchst',
    notes: [
      '· Bewerbungsformulare zählen fast immer Zeichen inklusive Leerzeichen. Wenn die Vorgabe nichts sagt, geh davon aus, dass Leerzeichen mitzählen.',
      '· Die Wortzahl ist das übliche Maß für Aufsätze und Artikel; die Zeichenzahl ist, was Formulare und Eingabefelder erzwingen.',
      '· Seiten mit einem Zeichenlimit im Eingabefeld rechnen die Leerzeichen fast immer mit.',
    ],
  },
  fr: {
    inputLabel: 'Colle ton texte', placeholder: 'Colle une dissertation, un dossier ou un brouillon tel quel',
    withSpaces: 'Avec espaces', withoutSpaces: 'Sans espaces', sheets200: 'Pages (200 caractères)', sheets400: 'Pages (400 caractères)',
    sheetSuffix: n => `${n}`,
    words: 'Mots', lines: 'Lignes', paragraphs: 'Paragraphes', bytes: 'Octets (UTF-8)',
    targetTitle: 'Ta limite', countingWith: 'compté avec les espaces', countingWithout: 'compté sans les espaces',
    charSuffix: n => `${n}`, emptyHint: 'Ajoute du texte et il compte ce qu’il te reste',
    used: (used, target, left) => `${used} / ${target} · il te reste ${left}`,
    over: (used, target, over) => `${used} / ${target} · ${over} de trop`,
    noteTitle: 'Quel décompte te faut-il',
    notes: [
      '· Les formulaires de candidature comptent presque toujours les caractères espaces compris. Si le règlement ne le précise pas, considère que les espaces comptent.',
      '· Le nombre de mots est la mesure habituelle pour les dissertations et les articles ; le nombre de caractères est ce qu’imposent les formulaires et les champs de saisie.',
      '· Les sites avec une limite de caractères dans le champ y incluent presque toujours les espaces.',
    ],
  },
  hi: {
    inputLabel: 'अपना पाठ चिपकाएँ', placeholder: 'निबंध, आवेदन या मसौदा जैसा है वैसा चिपका दें',
    withSpaces: 'स्पेस सहित', withoutSpaces: 'स्पेस रहित', sheets200: 'पन्ने (200 अक्षर)', sheets400: 'पन्ने (400 अक्षर)',
    sheetSuffix: n => `${n}`,
    words: 'शब्द', lines: 'पंक्तियाँ', paragraphs: 'अनुच्छेद', bytes: 'बाइट (UTF-8)',
    targetTitle: 'आपकी सीमा', countingWith: 'स्पेस सहित गिना जा रहा है', countingWithout: 'स्पेस रहित गिना जा रहा है',
    charSuffix: n => `${n}`, emptyHint: 'पाठ डालें तो बचा हिस्सा गिन दिया जाएगा',
    used: (used, target, left) => `${used} / ${target} · ${left} और लिख सकते हैं`,
    over: (used, target, over) => `${used} / ${target} · ${over} ज़्यादा हो गए`,
    noteTitle: 'कौन-सी गिनती चाहिए',
    notes: [
      '· आवेदन पत्र लगभग हमेशा स्पेस सहित अक्षर गिनते हैं। नियम में साफ़ न लिखा हो तो स्पेस गिने जाते हैं यही मान लें।',
      '· निबंध और लेखों के लिए आम माप शब्दों की गिनती है; फ़ॉर्म और इनपुट खाने अक्षरों की गिनती लागू करते हैं।',
      '· जिन साइटों में इनपुट खाने पर अक्षर सीमा होती है, वे लगभग हमेशा स्पेस भी गिनती हैं।',
    ],
  },
};

export const LOREM_UI: Record<TextLang, {
  noLimit: string; langs: string[];
  paragraphCount: string; paragraphUnit: string;
  sentenceCount: string; sentenceUnit: string;
  charLimit: string; charUnit: string;
  regenerate: string; sameSeed: (seed: number) => string;
  charCount: string; paragraphs: string; words: string; outputLabel: string;
  noteTitle: string; note: string;
}> = {
  ko: {
    noLimit: '제한 없음', langs: ['한글 문장', '영문 (Lorem ipsum)'],
    paragraphCount: '문단 수', paragraphUnit: '개',
    sentenceCount: '문단당 문장 수', sentenceUnit: '문장',
    charLimit: '글자수 제한', charUnit: '자',
    regenerate: '🔄 다른 문장으로 다시 만들기', sameSeed: seed => `같은 설정이면 같은 결과가 나옵니다 (현재 ${seed}번째)`,
    charCount: '글자수', paragraphs: '문단', words: '단어', outputLabel: '생성된 텍스트',
    noteTitle: '왜 한글 더미가 필요한가요?',
    note: '영문 로렘입숨은 한글보다 글자 폭이 좁고 띄어쓰기가 잦아서, 같은 자리에 실제 한글을 넣으면 줄 수가 늘고 레이아웃이 무너집니다. 한글 화면을 만들 때는 한글 더미로 확인하세요.',
  },
  en: {
    noLimit: 'No limit', langs: ['CJK filler', 'Latin (Lorem ipsum)'],
    paragraphCount: 'Paragraphs', paragraphUnit: '',
    sentenceCount: 'Sentences per paragraph', sentenceUnit: '',
    charLimit: 'Character limit', charUnit: '',
    regenerate: '🔄 Generate different text', sameSeed: seed => `The same settings give the same output (currently #${seed})`,
    charCount: 'Characters', paragraphs: 'Paragraphs', words: 'Words', outputLabel: 'Generated text',
    noteTitle: 'Why the CJK option',
    note: 'Latin lorem ipsum has narrower glyphs and far more spaces than Chinese, Japanese or Korean text. Design a layout against Latin filler and real CJK content will run to more lines and break it. If the screen ships in a CJK language, test it with CJK filler.',
  },
  es: {
    noLimit: 'Sin límite', langs: ['Relleno CJK', 'Latín (Lorem ipsum)'],
    paragraphCount: 'Párrafos', paragraphUnit: '',
    sentenceCount: 'Frases por párrafo', sentenceUnit: '',
    charLimit: 'Límite de caracteres', charUnit: '',
    regenerate: '🔄 Generar otro texto', sameSeed: seed => `Los mismos ajustes dan el mismo resultado (ahora el nº ${seed})`,
    charCount: 'Caracteres', paragraphs: 'Párrafos', words: 'Palabras', outputLabel: 'Texto generado',
    noteTitle: 'Para qué está la opción CJK',
    note: 'El lorem ipsum latino tiene glifos más estrechos y muchos más espacios que el texto chino, japonés o coreano. Si diseñas la maqueta con relleno latino, el contenido CJK real ocupará más líneas y la romperá. Si la pantalla se publica en un idioma CJK, pruébala con relleno CJK.',
  },
  'pt-br': {
    noLimit: 'Sem limite', langs: ['Preenchimento CJK', 'Latim (Lorem ipsum)'],
    paragraphCount: 'Parágrafos', paragraphUnit: '',
    sentenceCount: 'Frases por parágrafo', sentenceUnit: '',
    charLimit: 'Limite de caracteres', charUnit: '',
    regenerate: '🔄 Gerar outro texto', sameSeed: seed => `Os mesmos ajustes dão o mesmo resultado (agora o nº ${seed})`,
    charCount: 'Caracteres', paragraphs: 'Parágrafos', words: 'Palavras', outputLabel: 'Texto gerado',
    noteTitle: 'Para que serve a opção CJK',
    note: 'O lorem ipsum latino tem glifos mais estreitos e muito mais espaços que o texto chinês, japonês ou coreano. Se você desenhar o layout com preenchimento latino, o conteúdo CJK real vai ocupar mais linhas e quebrá-lo. Se a tela sai num idioma CJK, teste com preenchimento CJK.',
  },
  ja: {
    noLimit: '制限なし', langs: ['日本語の文章', '英文（Lorem ipsum）'],
    paragraphCount: '段落の数', paragraphUnit: '',
    sentenceCount: '一段落の文の数', sentenceUnit: '',
    charLimit: '文字数の上限', charUnit: '',
    regenerate: '🔄 別の文章で作り直す', sameSeed: seed => `同じ設定なら同じ結果になります（いま${seed}番目）`,
    charCount: '文字数', paragraphs: '段落', words: '単語', outputLabel: '生成されたテキスト',
    noteTitle: 'なぜ日本語のダミーが必要か',
    note: '英文のLorem ipsumは日本語より文字の幅が狭く、空白が多く入ります。同じ場所に実際の日本語を入れると行数が増えてレイアウトが崩れます。日本語の画面を作るときは日本語のダミーで確認してください。',
  },
  de: {
    noLimit: 'Kein Limit', langs: ['CJK-Blindtext', 'Latein (Lorem ipsum)'],
    paragraphCount: 'Absätze', paragraphUnit: '',
    sentenceCount: 'Sätze pro Absatz', sentenceUnit: '',
    charLimit: 'Zeichenlimit', charUnit: '',
    regenerate: '🔄 Anderen Text erzeugen', sameSeed: seed => `Dieselben Einstellungen ergeben dasselbe Ergebnis (aktuell Nr. ${seed})`,
    charCount: 'Zeichen', paragraphs: 'Absätze', words: 'Wörter', outputLabel: 'Erzeugter Text',
    noteTitle: 'Wozu die CJK-Option',
    note: 'Lateinisches Lorem ipsum hat schmalere Zeichen und weit mehr Leerzeichen als chinesischer, japanischer oder koreanischer Text. Wer ein Layout gegen lateinischen Blindtext baut, bekommt mit echten CJK-Inhalten mehr Zeilen — und ein kaputtes Layout. Erscheint der Screen in einer CJK-Sprache, teste ihn mit CJK-Blindtext.',
  },
  fr: {
    noLimit: 'Pas de limite', langs: ['Faux texte CJK', 'Latin (Lorem ipsum)'],
    paragraphCount: 'Paragraphes', paragraphUnit: '',
    sentenceCount: 'Phrases par paragraphe', sentenceUnit: '',
    charLimit: 'Limite de caractères', charUnit: '',
    regenerate: '🔄 Générer un autre texte', sameSeed: seed => `Les mêmes réglages donnent le même résultat (actuellement le n° ${seed})`,
    charCount: 'Caractères', paragraphs: 'Paragraphes', words: 'Mots', outputLabel: 'Texte généré',
    noteTitle: 'À quoi sert l’option CJK',
    note: 'Le lorem ipsum latin a des glyphes plus étroits et bien plus d’espaces que le texte chinois, japonais ou coréen. Conçois une maquette avec du faux texte latin et le contenu CJK réel prendra plus de lignes et la fera casser. Si l’écran sort dans une langue CJK, teste-le avec du faux texte CJK.',
  },
  hi: {
    noLimit: 'कोई सीमा नहीं', langs: ['CJK भराई', 'लैटिन (Lorem ipsum)'],
    paragraphCount: 'अनुच्छेद', paragraphUnit: '',
    sentenceCount: 'हर अनुच्छेद में वाक्य', sentenceUnit: '',
    charLimit: 'अक्षर सीमा', charUnit: '',
    regenerate: '🔄 दूसरा पाठ बनाएँ', sameSeed: seed => `एक ही सेटिंग पर एक ही नतीजा आता है (अभी ${seed}वाँ)`,
    charCount: 'अक्षर', paragraphs: 'अनुच्छेद', words: 'शब्द', outputLabel: 'बनाया गया पाठ',
    noteTitle: 'CJK विकल्प किस काम का है',
    note: 'लैटिन लोरेम इप्सम के अक्षर चीनी, जापानी या कोरियाई पाठ से पतले होते हैं और स्पेस बहुत ज़्यादा। लैटिन भराई पर लेआउट बनाएँ तो असली CJK सामग्री ज़्यादा पंक्तियाँ लेकर उसे तोड़ देगी। स्क्रीन CJK भाषा में जानी हो तो CJK भराई से जाँचें।',
  },
};

export const COPY_PICKER_UI: Record<TextLang, {
  copied: string; searchPlaceholder: string; recentTitle: string;
  foundCount: (n: number) => string; notFound: string;
}> = {
  ko: {
    copied: '복사됨', searchPlaceholder: '이름으로 찾기 — 화살표, 제곱미터, 하트…',
    recentTitle: '최근에 쓴 것',
    foundCount: n => `검색 결과 ${n}개`, notFound: '찾는 기호가 없습니다. 다른 이름으로 검색해 보세요.',
  },
  en: {
    copied: 'Copied', searchPlaceholder: 'Search by name — arrow, square metre, heart…',
    recentTitle: 'Recently used',
    foundCount: n => `${n} results`, notFound: 'No symbol matches that. Try another name.',
  },
  es: {
    copied: 'Copiado', searchPlaceholder: 'Busca por nombre — flecha, metro cuadrado, corazón…',
    recentTitle: 'Usados hace poco',
    foundCount: n => `${n} resultados`, notFound: 'Ningún símbolo coincide. Prueba con otro nombre.',
  },
  'pt-br': {
    copied: 'Copiado', searchPlaceholder: 'Busque pelo nome — seta, metro quadrado, coração…',
    recentTitle: 'Usados recentemente',
    foundCount: n => `${n} resultados`, notFound: 'Nenhum símbolo corresponde. Tente outro nome.',
  },
  ja: {
    copied: 'コピー済み', searchPlaceholder: '名前で探す — 矢印、平方メートル、ハート…',
    recentTitle: '最近使ったもの',
    foundCount: n => `検索結果 ${n}件`, notFound: '該当する記号がありません。別の名前で検索してみてください。',
  },
  de: {
    copied: 'Kopiert', searchPlaceholder: 'Nach Namen suchen — Pfeil, Quadratmeter, Herz…',
    recentTitle: 'Kürzlich benutzt',
    foundCount: n => `${n} Treffer`, notFound: 'Kein Zeichen passt dazu. Versuch einen anderen Namen.',
  },
  fr: {
    copied: 'Copié', searchPlaceholder: 'Cherche par nom — flèche, mètre carré, cœur…',
    recentTitle: 'Utilisés récemment',
    foundCount: n => `${n} résultats`, notFound: 'Aucun symbole ne correspond. Essaie un autre nom.',
  },
  hi: {
    copied: 'कॉपी हुआ', searchPlaceholder: 'नाम से खोजें — तीर, वर्ग मीटर, दिल…',
    recentTitle: 'हाल में इस्तेमाल किए',
    foundCount: n => `${n} नतीजे`, notFound: 'इससे मेल खाता कोई चिह्न नहीं। दूसरे नाम से खोजें।',
  },
};

export const SYMBOL_TOOL_UI: Record<TextLang, { specialHint: string; emoticonHint: string }> = {
  ko: {
    specialHint: '누르면 클립보드에 복사됩니다. 붙여 넣을 곳의 글꼴이 그 기호를 갖고 있지 않으면 네모(□)로 보일 수 있는데, 이때는 다른 기호를 쓰거나 글꼴을 바꿔야 합니다.',
    emoticonHint: '문자로 만든 이모티콘이라 이미지가 아닙니다. 닉네임·상태 메시지처럼 그림 이모지를 못 쓰는 곳에도 들어가고, 어떤 기기에서 봐도 같은 모양으로 보입니다.',
  },
  en: {
    specialHint: 'Tap to copy to your clipboard. If the font where you paste it does not have that glyph you will see a box (□) instead — use a different symbol or change the font.',
    emoticonHint: 'These are built from characters, not images. They work in places that reject emoji, like usernames and status messages, and they look the same on every device.',
  },
  es: {
    specialHint: 'Toca para copiarlo al portapapeles. Si la fuente donde lo pegues no tiene ese glifo verás un cuadrado (□) en su lugar — usa otro símbolo o cambia la fuente.',
    emoticonHint: 'Están hechos de caracteres, no de imágenes. Funcionan en sitios que rechazan los emoji, como nombres de usuario y mensajes de estado, y se ven igual en todos los aparatos.',
  },
  'pt-br': {
    specialHint: 'Toque para copiar para a área de transferência. Se a fonte do lugar onde você colar não tiver aquele glifo, vai aparecer um quadrado (□) — use outro símbolo ou troque a fonte.',
    emoticonHint: 'São feitos de caracteres, não de imagens. Funcionam em lugares que recusam emoji, como nomes de usuário e mensagens de status, e ficam iguais em qualquer aparelho.',
  },
  ja: {
    specialHint: '押すとクリップボードにコピーされます。貼り付け先のフォントがその記号を持っていないと四角（□）に見えることがあるので、そのときは別の記号を使うかフォントを変えてください。',
    emoticonHint: '文字で作った顔文字で、画像ではありません。ニックネームやひとことメッセージのように絵文字が使えない場所にも入り、どの端末で見ても同じ形に見えます。',
  },
  de: {
    specialHint: 'Antippen und es liegt in der Zwischenablage. Hat die Schrift dort, wo du es einfügst, dieses Zeichen nicht, siehst du stattdessen ein Kästchen (□) — nimm ein anderes Symbol oder wechsle die Schrift.',
    emoticonHint: 'Die bestehen aus Zeichen, nicht aus Bildern. Sie funktionieren dort, wo Emoji abgelehnt werden, etwa in Nutzernamen und Statusmeldungen, und sehen auf jedem Gerät gleich aus.',
  },
  fr: {
    specialHint: 'Touche pour copier dans le presse-papiers. Si la police de l’endroit où tu le colles n’a pas ce glyphe, tu verras un carré (□) à la place — prends un autre symbole ou change de police.',
    emoticonHint: 'Ils sont faits de caractères, pas d’images. Ils fonctionnent là où les emoji sont refusés, comme les pseudos et les messages de statut, et s’affichent pareil sur tous les appareils.',
  },
  hi: {
    specialHint: 'दबाने पर क्लिपबोर्ड में कॉपी हो जाता है। जहाँ चिपकाएँ वहाँ के फ़ॉन्ट में वह चिह्न न हो तो उसकी जगह डिब्बा (□) दिख सकता है — तब दूसरा चिह्न लें या फ़ॉन्ट बदलें।',
    emoticonHint: 'ये अक्षरों से बने हैं, तस्वीरें नहीं। जहाँ इमोजी नहीं चलते — यूज़रनेम, स्टेटस संदेश — वहाँ भी काम करते हैं, और हर उपकरण पर एक जैसे दिखते हैं।',
  },
};
