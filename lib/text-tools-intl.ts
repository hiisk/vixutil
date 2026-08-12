// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { TextTool } from './text-tools.ts';
import { TEXT_TOOLS } from './text-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from './locales.ts';
import { withCard } from './og-cards/index.ts';
import { relatedBySlug } from './related-window.ts';

/**
 * 텍스트 도구(/text) 섹션의 번역 메타데이터.
 *
 * 열두 개 중 여덟 개만 옮긴다. 한영타 변환·영문 이름 변환·초성 변환·한글 금액은
 * 한글 자판과 자모에 묶여 있어 다른 언어에서는 성립하지 않는다 — 없는 도구를
 * 억지로 만드는 대신 목록에서 빠지게 두고, 한국어 페이지에도 hreflang을 걸지 않는다.
 *
 * 원고지는 언어마다 다르게 옮긴다. 영어·스페인어·독일어·프랑스어권에서 글 분량을
 * 재는 단위는 낱말이라 낱말 수 중심으로 쓰고, 일본어권에는 실제로 원고용지가
 * 있으므로 그 말을 그대로 쓴다.
 */
export type TextIntlLang = Exclude<AnyLocale10, 'ko'>;

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

/** en/zh에 내보내는 slug — 한글 전용 네 개는 여기 없다 */
export const TEXT_INTL_SLUGS = ['clean', 'dedupe', 'case', 'special-char', 'emoticon', 'replace', 'manuscript', 'lorem', 'mask', 'wrap', 'table', 'slug', 'reverse', 'vertical', 'qr'] as const;

const COPY: Record<TextIntlLang, Record<string, ToolCopy>> = {
  en: {
    clean: {
      title: 'Text Cleaner', desc: 'Fix the odd spaces and line breaks in text you pasted', category: 'Clean up',
      metaTitle: 'Text Cleaner — Remove Invisible Characters and Fix Line Breaks',
      long: 'Text copied out of a PDF or a web page carries invisible characters, spaces that look normal but are not, and line breaks in the middle of sentences. This clears all of it in one pass and tells you how many of each it removed.',
      features: ['Remove invisible characters and odd spaces', 'Join line breaks inside sentences', 'Collapse repeated spaces and blank lines', 'Smart quotes to straight quotes'],
    },
    dedupe: {
      title: 'Remove Duplicate Lines', desc: 'Strip repeated lines from a list and sort it', category: 'Clean up',
      metaTitle: 'Remove Duplicate Lines — Dedupe and Sort a List Online',
      long: 'Paste a list and it removes the repeated lines and sorts what is left alphabetically. You can choose whether lines that differ only in surrounding whitespace or letter case count as the same, which is what real lists actually need.',
      features: ['Remove duplicates (and show how many went)', 'Sort A→Z or Z→A', 'Ignore whitespace or case', 'Drop blank lines, add line numbers'],
    },
    case: {
      title: 'Case Converter', desc: 'Convert text to any capitalisation style', category: 'Clean up',
      metaTitle: 'Case Converter — UPPERCASE, lowercase, Title Case, camelCase',
      long: 'Convert to all caps, all lowercase or title case, and to developer conventions like camelCase, snake_case and kebab-case. Each result can be copied on its own.',
      features: ['UPPERCASE, lowercase, Title Case', 'Sentence case', 'camelCase, snake_case, kebab-case', 'Copy each style separately'],
    },
    'special-char': {
      title: 'Special Characters', desc: 'Tap an arrow, shape or symbol to copy it', category: 'Symbols',
      metaTitle: 'Special Characters — Copy Arrows, Shapes and Symbols',
      long: 'Arrows (→ ⇒), shapes (★ ◆ ▶), punctuation (※ 「」), maths and units (㎡ ℃ ±), currency (€ ₩) and enclosed characters (① ㉠) — tap any of them to copy. No more hunting for a symbol your keyboard cannot type.',
      features: ['Symbols grouped by category', 'Tap to copy immediately', 'Search by name', 'Remembers the ones you used'],
    },
    emoticon: {
      title: 'Text Emoticons', desc: 'Copy kaomoji like (╯°□°）╯', category: 'Symbols',
      metaTitle: 'Text Emoticons — Copy Kaomoji and ASCII Faces',
      long: 'Emoticons built purely from characters — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — collected by mood. Because they are text and not images, they paste anywhere without breaking, and work in usernames and status messages.',
      features: ['Grouped by mood: happy, sad, angry and more', 'Kaomoji and ASCII faces', 'Tap to copy immediately', 'Remembers the ones you used'],
    },
    replace: {
      title: 'Find and Replace', desc: 'Swap a word throughout a long text at once', category: 'Clean up',
      metaTitle: 'Find and Replace Text Online — Bulk Replace, Regex Supported',
      long: 'When a name or a term changes, you do not have to fix it one instance at a time. Case sensitivity and regular expressions can both be turned on, and it counts how many places will change before you commit.',
      features: ['Counts the matches before replacing', 'Case-sensitive toggle', 'Regular expressions supported', 'Replace newlines (\\n) and tabs'],
    },
    manuscript: {
      title: 'Word and Character Counter', desc: 'Count words, characters and pages against a limit', category: 'Counting',
      metaTitle: 'Word and Character Counter — With and Without Spaces',
      long: 'Paste your text and get the word count, the character count with and without spaces, and roughly how many pages that is. Set the limit an application or a brief gives you and it shows how much you have left.',
      features: ['Words, characters with and without spaces', 'Estimated pages and reading time', 'Remaining count against your limit', 'Byte count (for upload limits)'],
    },
    lorem: {
      title: 'Lorem Ipsum Generator', desc: 'Placeholder text to fill out a layout', category: 'Counting',
      metaTitle: 'Lorem Ipsum Generator — Placeholder Text, Any Length',
      long: 'Generates the filler text you need while building a design or a screen. Set how many paragraphs and how long each one runs, or cut it to an exact character count so it fits the box you are testing.',
      features: ['Classic Latin lorem ipsum', 'Set paragraph count and length', 'Trim to an exact character count', 'Copy the whole result at once'],
    },
    mask: {
      title: "Redact Personal Data", desc: "Hide names, phone numbers and IDs in one pass", category: "Clean up",
      metaTitle: "Redact Personal Data — Mask Names, Phone Numbers and ID Numbers",
      long: "Paste text that contains names, phone numbers, national ID numbers, card numbers and email addresses, and it hides all of them at once. The last digits stay visible so you can still tell which record it was, which means the result is safe to screenshot and share. Everything runs in your browser and nothing is sent to a server.",
      features: ["Names, phones, IDs, cards and emails in one pass", "Keeps the last digits so records stay identifiable", "Turn each kind on or off", "Choose the mask character (* ● ■ X)"],
    },
    wrap: {
      title: "Reflow Line Breaks", desc: "Wrap to a width, or join lines broken mid-paragraph", category: "Clean up",
      metaTitle: "Reflow Line Breaks — Wrap to a Width or Join Broken Lines",
      long: "Text copied out of a PDF or an email breaks in the middle of a paragraph. This joins those lines back into paragraphs, or does the opposite and wraps everything to a fixed number of characters. Blank lines between paragraphs stay put, so the paragraph structure survives.",
      features: ["Join broken lines back into paragraphs", "Wrap to 40, 60, 80 or 100 characters", "Never split a word in half", "Paragraph breaks are preserved"],
    },
    table: {
      title: "Table Builder", desc: "Turn pasted data into a Markdown, CSV or HTML table", category: "Clean up",
      metaTitle: "Table Builder — Paste Spreadsheet Data as Markdown, CSV or HTML",
      long: "Paste rows copied out of a spreadsheet and it turns them into a Markdown table, CSV, TSV or an HTML table. It works out what separates the columns on its own, and when rows have different numbers of cells it pads the short ones so the table does not fall apart.",
      features: ["Markdown, CSV, TSV and HTML output", "Detects the separator (tab, comma, spaces)", "Pads short rows so the table stays square", "Optionally pad columns to equal width"],
    },
    slug: {
      title: "Slug Generator", desc: "Turn a title into something you can put in a URL", category: "Clean up",
      metaTitle: "Slug Generator — Turn a Post Title into a Clean URL Slug",
      long: "Turns a post title into a form you can put in a URL. Korean is transliterated to the Latin alphabet, spaces and punctuation become hyphens, and runs of hyphens or hyphens at either end are cleaned up. When you cap the length it cuts at a word boundary rather than mid-word.",
      features: ["Transliterates Korean into the Latin alphabet", "Hyphen or underscore as the separator", "Strips accents (café → cafe)", "Length cap cuts at word boundaries"],
    },
    reverse: {
      title: "Reverse Text", desc: "Flip text by character, by word or by line", category: "Symbols",
      metaTitle: "Reverse Text — Flip a String by Character, Word or Line",
      long: "Reverses text. You can flip it character by character, word by word, or line by line. Characters are handled by code point, so emoji and combining marks do not get split in half — and reversing twice gives you exactly what you started with.",
      features: ["Three units: characters, words, lines", "Emoji survive intact", "Each line is reversed on its own", "Copy the result in one tap"],
    },
    vertical: {
      title: "Vertical Text", desc: "Stand horizontal text up one character per line", category: "Symbols",
      metaTitle: "Vertical Text — Turn Horizontal Writing into Vertical Columns",
      long: "Stands horizontal writing up one character at a time. Give it several lines and each becomes its own vertical column; you can also read them right to left, the traditional order. Columns of different lengths are padded so the rows never drift out of line.",
      features: ["One character per line, standing up", "Several lines become side-by-side columns", "Right-to-left (traditional) order", "Adjustable gap between columns"],
    },
    qr: {
      title: "QR Code Generator", desc: "Turn a link, Wi-Fi or contact card into a QR code", category: "Symbols",
      metaTitle: "QR Code Generator — Wi-Fi, Link, vCard and SMS Codes, Free",
      long: "Turns a link, Wi-Fi login, contact card, SMS or map pin into a QR code. The encoding runs in your browser, so the Wi-Fi password you type never leaves the page, and you can download the result as SVG or PNG. If the content does not fit it tells you by how much instead of quietly truncating — a truncated code looks fine and scans as nothing.",
      features: ["Wi-Fi, contact, email, SMS and map presets", "Error correction L, M, Q or H", "SVG download stays sharp at print size", "Adjustable colours, margin and module size"],
    },
  },

  es: {
    clean: {
      title: 'Limpiar texto', desc: 'Arregla los espacios y saltos raros del texto que pegaste', category: 'Limpiar',
      metaTitle: 'Limpiar texto — Quita caracteres invisibles y arregla los saltos de línea',
      long: 'El texto copiado de un PDF o de una página web arrastra caracteres invisibles, espacios que parecen normales pero no lo son, y saltos de línea en medio de las frases. Esto lo limpia todo de una pasada y te dice cuántos ha quitado de cada tipo.',
      features: ['Quitar caracteres invisibles y espacios raros', 'Unir los saltos de línea dentro de una frase', 'Reducir espacios y líneas en blanco repetidos', 'Comillas tipográficas a comillas rectas'],
    },
    dedupe: {
      title: 'Quitar líneas duplicadas', desc: 'Elimina las líneas repetidas de una lista y ordénala', category: 'Limpiar',
      metaTitle: 'Quitar líneas duplicadas — Deduplicar y ordenar una lista online',
      long: 'Pega una lista y elimina las líneas repetidas y ordena lo que queda alfabéticamente. Puedes decidir si las líneas que solo se diferencian por espacios alrededor o por mayúsculas cuentan como iguales, que es lo que hacen falta las listas de verdad.',
      features: ['Quitar duplicados (y decir cuántos se fueron)', 'Ordenar A→Z o Z→A', 'Ignorar espacios o mayúsculas', 'Quitar líneas vacías, añadir números de línea'],
    },
    case: {
      title: 'Convertir mayúsculas y minúsculas', desc: 'Pasa el texto a cualquier estilo de capitalización', category: 'Limpiar',
      metaTitle: 'Convertir mayúsculas — MAYÚSCULAS, minúsculas, Título, camelCase',
      long: 'Pasa a todo mayúsculas, todo minúsculas o Estilo Título, y a convenciones de programación como camelCase, snake_case y kebab-case. Cada resultado se puede copiar por separado.',
      features: ['MAYÚSCULAS, minúsculas, Estilo Título', 'Estilo oración', 'camelCase, snake_case, kebab-case', 'Copiar cada estilo por separado'],
    },
    'special-char': {
      title: 'Caracteres especiales', desc: 'Toca una flecha, forma o símbolo para copiarlo', category: 'Símbolos',
      metaTitle: 'Caracteres especiales — Copia flechas, formas y símbolos',
      long: 'Flechas (→ ⇒), formas (★ ◆ ▶), puntuación (※ 「」), matemáticas y unidades (㎡ ℃ ±), monedas (€ ₩) y caracteres encerrados (① ㉠) — toca cualquiera para copiarlo. Se acabó buscar un símbolo que tu teclado no puede escribir.',
      features: ['Símbolos agrupados por categoría', 'Toca y se copia al instante', 'Búsqueda por nombre', 'Recuerda los que has usado'],
    },
    emoticon: {
      title: 'Emoticonos de texto', desc: 'Copia kaomoji como (╯°□°）╯', category: 'Símbolos',
      metaTitle: 'Emoticonos de texto — Copia kaomoji y caras ASCII',
      long: 'Emoticonos hechos solo con caracteres — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — recogidos por estado de ánimo. Al ser texto y no imágenes, se pegan en cualquier sitio sin romperse y funcionan en nombres de usuario y mensajes de estado.',
      features: ['Agrupados por ánimo: alegre, triste, enfadado y más', 'Kaomoji y caras ASCII', 'Toca y se copia al instante', 'Recuerda los que has usado'],
    },
    replace: {
      title: 'Buscar y reemplazar', desc: 'Cambia una palabra en todo un texto largo de una vez', category: 'Limpiar',
      metaTitle: 'Buscar y reemplazar texto online — Reemplazo masivo, admite regex',
      long: 'Cuando cambia un nombre o un término, no hace falta arreglarlo uno por uno. Puedes activar la distinción de mayúsculas y las expresiones regulares, y cuenta cuántos sitios van a cambiar antes de que lo confirmes.',
      features: ['Cuenta las coincidencias antes de reemplazar', 'Interruptor de mayúsculas y minúsculas', 'Admite expresiones regulares', 'Reemplaza saltos de línea (\\n) y tabulaciones'],
    },
    manuscript: {
      title: 'Contador de palabras y caracteres', desc: 'Cuenta palabras, caracteres y páginas frente a un límite', category: 'Contar',
      metaTitle: 'Contador de palabras y caracteres — Con y sin espacios',
      long: 'Pega tu texto y obtén el número de palabras, el de caracteres con y sin espacios, y aproximadamente cuántas páginas son. Pon el límite que te da una convocatoria o un encargo y te muestra cuánto te queda.',
      features: ['Palabras, caracteres con y sin espacios', 'Páginas estimadas y tiempo de lectura', 'Lo que te queda frente a tu límite', 'Recuento en bytes (para límites de subida)'],
    },
    lorem: {
      title: 'Generador de lorem ipsum', desc: 'Texto de relleno para completar un diseño', category: 'Contar',
      metaTitle: 'Generador de lorem ipsum — Texto de relleno, cualquier longitud',
      long: 'Genera el texto de relleno que necesitas mientras montas un diseño o una pantalla. Indica cuántos párrafos y cuánto ocupa cada uno, o recórtalo a un número exacto de caracteres para que quepa en la caja que estás probando.',
      features: ['Lorem ipsum latino clásico', 'Fijar número y longitud de los párrafos', 'Recortar a un número exacto de caracteres', 'Copiar todo el resultado de golpe'],
    },
    mask: {
      title: "Censurar datos personales", desc: "Oculta nombres, teléfonos e identificadores de una vez", category: "Limpiar",
      metaTitle: "Censurar datos personales — Ocultar nombres, teléfonos y números de identidad",
      long: "Pega un texto con nombres, teléfonos, números de identidad, tarjetas y correos, y los oculta todos a la vez. Los últimos dígitos quedan a la vista, así que aún puedes reconocer de qué registro se trata y el resultado se puede compartir. Todo ocurre en tu navegador y nada se envía a un servidor.",
      features: ["Nombres, teléfonos, identidades, tarjetas y correos de una vez", "Conserva los últimos dígitos para poder reconocerlos", "Activa o desactiva cada tipo", "Elige el carácter de máscara (* ● ■ X)"],
    },
    wrap: {
      title: "Reajustar saltos de línea", desc: "Ajusta a un ancho o une líneas cortadas", category: "Limpiar",
      metaTitle: "Reajustar saltos de línea — Ajustar a un ancho o unir líneas cortadas",
      long: "El texto copiado de un PDF o de un correo se corta en medio del párrafo. Esto vuelve a unir esas líneas en párrafos, o hace lo contrario y ajusta todo a un número fijo de caracteres. Las líneas en blanco entre párrafos se mantienen, así que la estructura no se pierde.",
      features: ["Une líneas cortadas en párrafos", "Ajusta a 40, 60, 80 o 100 caracteres", "Nunca parte una palabra por la mitad", "Conserva los saltos de párrafo"],
    },
    table: {
      title: "Generador de tablas", desc: "Convierte datos pegados en una tabla Markdown, CSV o HTML", category: "Limpiar",
      metaTitle: "Generador de tablas — Pega datos de hoja de cálculo como Markdown, CSV o HTML",
      long: "Pega filas copiadas de una hoja de cálculo y las convierte en una tabla Markdown, CSV, TSV o HTML. Detecta por sí solo qué separa las columnas, y cuando las filas tienen distinto número de celdas rellena las cortas para que la tabla no se descuadre.",
      features: ["Salida en Markdown, CSV, TSV y HTML", "Detecta el separador (tabulador, coma, espacios)", "Rellena las filas cortas para cuadrar la tabla", "Opción de igualar el ancho de las columnas"],
    },
    slug: {
      title: "Generador de slugs", desc: "Convierte un título en algo que cabe en una URL", category: "Limpiar",
      metaTitle: "Generador de slugs — Convierte el título de una entrada en un slug limpio",
      long: "Convierte el título de una entrada en algo que puedes poner en una URL. El coreano se translitera al alfabeto latino, los espacios y signos pasan a guiones, y se limpian los guiones repetidos o en los extremos. Al limitar la longitud corta en el límite de una palabra, no a mitad.",
      features: ["Translitera el coreano al alfabeto latino", "Guion o guion bajo como separador", "Quita los acentos (café → cafe)", "El límite de longitud corta entre palabras"],
    },
    reverse: {
      title: "Invertir texto", desc: "Da la vuelta al texto por carácter, palabra o línea", category: "Símbolos",
      metaTitle: "Invertir texto — Dar la vuelta a una cadena por carácter, palabra o línea",
      long: "Invierte el texto. Puedes darle la vuelta carácter a carácter, palabra a palabra o línea a línea. Los caracteres se tratan por punto de código, así que los emoji y los signos combinantes no se parten por la mitad, y al invertir dos veces vuelves exactamente a lo que tenías.",
      features: ["Tres unidades: caracteres, palabras, líneas", "Los emoji quedan intactos", "Cada línea se invierte por separado", "Copia el resultado de un toque"],
    },
    vertical: {
      title: "Texto vertical", desc: "Pone el texto horizontal en pie, un carácter por línea", category: "Símbolos",
      metaTitle: "Texto vertical — Convertir escritura horizontal en columnas verticales",
      long: "Pone la escritura horizontal en pie, un carácter cada vez. Si le das varias líneas, cada una se convierte en su propia columna vertical; también puedes leerlas de derecha a izquierda, el orden tradicional. Las columnas de distinta longitud se rellenan para que las filas nunca se desalineen.",
      features: ["Un carácter por línea, en vertical", "Varias líneas se vuelven columnas contiguas", "Orden de derecha a izquierda (tradicional)", "Espacio ajustable entre columnas"],
    },
    qr: {
      title: "Generador de códigos QR", desc: "Convierte un enlace, una Wi-Fi o un contacto en QR", category: "Símbolos",
      metaTitle: "Generador de códigos QR — Wi-Fi, enlaces, vCard y SMS, gratis",
      long: "Convierte un enlace, los datos de una Wi-Fi, una tarjeta de contacto, un SMS o un punto del mapa en un código QR. La codificación ocurre en tu navegador, así que la contraseña que escribes no sale de la página, y puedes descargar el resultado en SVG o PNG. Si el contenido no cabe te dice cuánto sobra en lugar de recortarlo: un código recortado se ve bien y no se lee.",
      features: ["Plantillas de Wi-Fi, contacto, correo, SMS y mapa", "Corrección de errores L, M, Q o H", "Descarga en SVG que sigue nítida al imprimir", "Colores, margen y tamaño de módulo ajustables"],
    },
  },

  'pt-br': {
    clean: {
      title: 'Limpar texto', desc: 'Corrige os espaços e quebras estranhas do texto que você colou', category: 'Limpar',
      metaTitle: 'Limpar texto — Tire caracteres invisíveis e corrija as quebras de linha',
      long: 'Texto copiado de um PDF ou de uma página web carrega caracteres invisíveis, espaços que parecem normais mas não são, e quebras de linha no meio das frases. Isto limpa tudo de uma vez e diz quantos de cada tipo foram removidos.',
      features: ['Tirar caracteres invisíveis e espaços estranhos', 'Juntar quebras de linha dentro de uma frase', 'Reduzir espaços e linhas em branco repetidos', 'Aspas tipográficas para aspas retas'],
    },
    dedupe: {
      title: 'Remover linhas duplicadas', desc: 'Tira as linhas repetidas de uma lista e ordena', category: 'Limpar',
      metaTitle: 'Remover linhas duplicadas — Deduplicar e ordenar uma lista online',
      long: 'Cole uma lista e ele remove as linhas repetidas e ordena o que sobra em ordem alfabética. Você escolhe se linhas que diferem apenas por espaços em volta ou por maiúsculas contam como iguais — que é o que listas de verdade exigem.',
      features: ['Remover duplicadas (e mostrar quantas saíram)', 'Ordenar A→Z ou Z→A', 'Ignorar espaços ou maiúsculas', 'Tirar linhas vazias, numerar linhas'],
    },
    case: {
      title: 'Converter maiúsculas e minúsculas', desc: 'Passe o texto para qualquer estilo de capitalização', category: 'Limpar',
      metaTitle: 'Converter maiúsculas — MAIÚSCULAS, minúsculas, Título, camelCase',
      long: 'Passe para tudo em maiúsculas, tudo em minúsculas ou Estilo Título, e para convenções de programação como camelCase, snake_case e kebab-case. Cada resultado pode ser copiado separadamente.',
      features: ['MAIÚSCULAS, minúsculas, Estilo Título', 'Estilo frase', 'camelCase, snake_case, kebab-case', 'Copiar cada estilo separadamente'],
    },
    'special-char': {
      title: 'Caracteres especiais', desc: 'Toque numa seta, forma ou símbolo para copiar', category: 'Símbolos',
      metaTitle: 'Caracteres especiais — Copie setas, formas e símbolos',
      long: 'Setas (→ ⇒), formas (★ ◆ ▶), pontuação (※ 「」), matemática e unidades (㎡ ℃ ±), moedas (€ ₩) e caracteres cercados (① ㉠) — toque em qualquer um para copiar. Acabou a caça ao símbolo que seu teclado não digita.',
      features: ['Símbolos agrupados por categoria', 'Toque e copia na hora', 'Busca por nome', 'Guarda os que você usou'],
    },
    emoticon: {
      title: 'Emoticons de texto', desc: 'Copie kaomoji como (╯°□°）╯', category: 'Símbolos',
      metaTitle: 'Emoticons de texto — Copie kaomoji e carinhas ASCII',
      long: 'Emoticons feitos só de caracteres — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — reunidos por humor. Como são texto e não imagens, colam em qualquer lugar sem quebrar e funcionam em nomes de usuário e mensagens de status.',
      features: ['Agrupados por humor: alegre, triste, irritado e mais', 'Kaomoji e carinhas ASCII', 'Toque e copia na hora', 'Guarda os que você usou'],
    },
    replace: {
      title: 'Localizar e substituir', desc: 'Troque uma palavra em um texto longo de uma vez', category: 'Limpar',
      metaTitle: 'Localizar e substituir texto online — Substituição em massa, com regex',
      long: 'Quando um nome ou um termo muda, você não precisa corrigir um por um. Dá para ligar a diferenciação de maiúsculas e as expressões regulares, e ele conta quantos lugares vão mudar antes de você confirmar.',
      features: ['Conta as ocorrências antes de substituir', 'Chave de maiúsculas e minúsculas', 'Aceita expressões regulares', 'Substitui quebras de linha (\\n) e tabulações'],
    },
    manuscript: {
      title: 'Contador de palavras e caracteres', desc: 'Conta palavras, caracteres e páginas contra um limite', category: 'Contar',
      metaTitle: 'Contador de palavras e caracteres — Com e sem espaços',
      long: 'Cole seu texto e receba a contagem de palavras, a de caracteres com e sem espaços, e mais ou menos quantas páginas dá. Coloque o limite que um edital ou um briefing exige e ele mostra quanto ainda sobra.',
      features: ['Palavras, caracteres com e sem espaços', 'Páginas estimadas e tempo de leitura', 'O que ainda cabe no seu limite', 'Contagem em bytes (para limites de upload)'],
    },
    lorem: {
      title: 'Gerador de lorem ipsum', desc: 'Texto de preenchimento para fechar um layout', category: 'Contar',
      metaTitle: 'Gerador de lorem ipsum — Texto de preenchimento, qualquer tamanho',
      long: 'Gera o texto de preenchimento de que você precisa enquanto monta um design ou uma tela. Defina quantos parágrafos e o tamanho de cada um, ou corte para um número exato de caracteres para caber na caixa que você está testando.',
      features: ['Lorem ipsum latino clássico', 'Definir quantidade e tamanho dos parágrafos', 'Cortar num número exato de caracteres', 'Copiar o resultado inteiro de uma vez'],
    },
    mask: {
      title: "Ocultar dados pessoais", desc: "Esconde nomes, telefones e documentos de uma só vez", category: "Limpar",
      metaTitle: "Ocultar dados pessoais — Mascarar nomes, telefones e números de documento",
      long: "Cole um texto com nomes, telefones, números de documento, cartões e e-mails e ele esconde tudo de uma vez. Os últimos dígitos continuam visíveis, então ainda dá para reconhecer o registro e o resultado pode ser compartilhado. Tudo acontece no seu navegador e nada é enviado a um servidor.",
      features: ["Nomes, telefones, documentos, cartões e e-mails de uma vez", "Mantém os últimos dígitos para reconhecer o registro", "Ligue ou desligue cada tipo", "Escolha o caractere de máscara (* ● ■ X)"],
    },
    wrap: {
      title: "Reorganizar quebras de linha", desc: "Quebre em uma largura ou junte linhas partidas", category: "Limpar",
      metaTitle: "Reorganizar quebras de linha — Quebrar em uma largura ou juntar linhas partidas",
      long: "Texto copiado de um PDF ou de um e-mail quebra no meio do parágrafo. Isto junta essas linhas de volta em parágrafos, ou faz o contrário e quebra tudo em um número fixo de caracteres. As linhas em branco entre parágrafos permanecem, então a estrutura sobrevive.",
      features: ["Junta linhas partidas de volta em parágrafos", "Quebra em 40, 60, 80 ou 100 caracteres", "Nunca divide uma palavra ao meio", "Mantém as quebras de parágrafo"],
    },
    table: {
      title: "Gerador de tabelas", desc: "Transforma dados colados em tabela Markdown, CSV ou HTML", category: "Limpar",
      metaTitle: "Gerador de tabelas — Cole dados de planilha como Markdown, CSV ou HTML",
      long: "Cole linhas copiadas de uma planilha e elas viram uma tabela Markdown, CSV, TSV ou HTML. Ele descobre sozinho o que separa as colunas e, quando as linhas têm números diferentes de células, completa as curtas para a tabela não desmontar.",
      features: ["Saída em Markdown, CSV, TSV e HTML", "Detecta o separador (tabulação, vírgula, espaços)", "Completa linhas curtas para a tabela ficar certa", "Opção de igualar a largura das colunas"],
    },
    slug: {
      title: "Gerador de slug", desc: "Transforma um título em algo que cabe numa URL", category: "Limpar",
      metaTitle: "Gerador de slug — Transforme o título do post em um slug limpo",
      long: "Transforma o título de um post em algo que você pode colocar numa URL. O coreano é transliterado para o alfabeto latino, espaços e pontuação viram hífens, e hífens repetidos ou nas pontas são limpos. Ao limitar o comprimento, ele corta no limite de uma palavra, não no meio.",
      features: ["Translitera o coreano para o alfabeto latino", "Hífen ou sublinhado como separador", "Remove acentos (café → cafe)", "O limite de comprimento corta entre palavras"],
    },
    reverse: {
      title: "Inverter texto", desc: "Vira o texto por caractere, palavra ou linha", category: "Símbolos",
      metaTitle: "Inverter texto — Virar uma cadeia por caractere, palavra ou linha",
      long: "Inverte o texto. Você pode virá-lo caractere a caractere, palavra a palavra ou linha a linha. Os caracteres são tratados por ponto de código, então emoji e marcas combinantes não são partidos ao meio — e inverter duas vezes devolve exatamente o que você tinha.",
      features: ["Três unidades: caracteres, palavras, linhas", "Os emoji permanecem inteiros", "Cada linha é invertida separadamente", "Copie o resultado com um toque"],
    },
    vertical: {
      title: "Texto vertical", desc: "Põe o texto horizontal em pé, um caractere por linha", category: "Símbolos",
      metaTitle: "Texto vertical — Transformar escrita horizontal em colunas verticais",
      long: "Põe a escrita horizontal em pé, um caractere de cada vez. Se você der várias linhas, cada uma vira sua própria coluna vertical; também dá para lê-las da direita para a esquerda, a ordem tradicional. Colunas de tamanhos diferentes são completadas para que as fileiras nunca saiam do lugar.",
      features: ["Um caractere por linha, em pé", "Várias linhas viram colunas lado a lado", "Ordem da direita para a esquerda (tradicional)", "Espaço ajustável entre colunas"],
    },
    qr: {
      title: "Gerador de QR Code", desc: "Vira link, Wi-Fi ou contato em QR Code", category: "Símbolos",
      metaTitle: "Gerador de QR Code — Wi-Fi, link, vCard e SMS, grátis",
      long: "Transforma um link, os dados de uma rede Wi-Fi, um cartão de contato, um SMS ou um ponto no mapa em QR Code. A codificação acontece no seu navegador, então a senha que você digita não sai da página, e você pode baixar o resultado em SVG ou PNG. Se o conteúdo não couber, ele diz o quanto passou em vez de cortar: um código cortado parece certo e não é lido.",
      features: ["Modelos de Wi-Fi, contato, e-mail, SMS e mapa", "Correção de erros L, M, Q ou H", "Download em SVG que continua nítido na impressão", "Cores, margem e tamanho do módulo ajustáveis"],
    },
  },

  ja: {
    clean: {
      title: 'テキスト整形', desc: '貼り付けた文章の変な空白と改行を直す', category: '整える',
      metaTitle: 'テキスト整形 — 見えない文字を取り除き改行を直す',
      long: 'PDFやウェブページからコピーした文章には、見えない文字、ふつうに見えて実は違う空白、文の途中で入った改行が混ざっています。それをまとめて取り除き、何をいくつ消したかも表示します。',
      features: ['見えない文字と変な空白を取り除く', '文中の改行をつなげる', '連続した空白と空行をまとめる', '曲がった引用符を直線の引用符に'],
    },
    dedupe: {
      title: '重複行の削除', desc: 'リストから重なった行を消して並べ替える', category: '整える',
      metaTitle: '重複行の削除 — リストの重複を消して並べ替える',
      long: 'リストを貼り付けると、重なった行を消して残りを五十音・アルファベット順に並べます。前後の空白や大文字小文字だけが違う行を同じものとして扱うかも選べます。実際のリストで必要になるのはそこです。',
      features: ['重複を削除（いくつ消えたかも表示）', '昇順・降順に並べ替え', '空白や大文字小文字を無視', '空行を削除、行番号を付ける'],
    },
    case: {
      title: '大文字・小文字変換', desc: '文字の大小をどのスタイルにも変換', category: '整える',
      metaTitle: '大文字・小文字変換 — UPPERCASE・lowercase・Title Case・camelCase',
      long: 'すべて大文字、すべて小文字、単語の頭を大文字にするタイトルケースに変換します。camelCase・snake_case・kebab-caseといった開発の慣習にも変えられ、結果はそれぞれ個別にコピーできます。',
      features: ['UPPERCASE・lowercase・Title Case', '文の先頭だけ大文字', 'camelCase・snake_case・kebab-case', 'スタイルごとにコピー'],
    },
    'special-char': {
      title: '特殊記号', desc: '矢印・図形・記号を押してコピー', category: '記号',
      metaTitle: '特殊記号 — 矢印・図形・記号をコピー',
      long: '矢印（→ ⇒）、図形（★ ◆ ▶）、約物（※ 「」）、数学と単位（㎡ ℃ ±）、通貨（€ ₩）、囲み文字（① ㉠）— どれでも押せばコピーできます。キーボードで打てない記号を探し回る必要はありません。',
      features: ['分類ごとにまとめた記号', '押すとすぐコピー', '名前で検索', '使った記号を覚えておく'],
    },
    emoticon: {
      title: '顔文字', desc: '(╯°□°）╯のような顔文字をコピー', category: '記号',
      metaTitle: '顔文字 — 顔文字とアスキーアートをコピー',
      long: '文字だけで作られた顔文字 — ¯\\_(ツ)_/¯、(╯°□°）╯、ಠ_ಠ — を気分ごとに集めました。画像ではなく文字なのでどこに貼っても崩れず、ユーザー名やひとことメッセージにも使えます。',
      features: ['うれしい・かなしい・怒りなど気分ごと', '顔文字とアスキーの顔', '押すとすぐコピー', '使ったものを覚えておく'],
    },
    replace: {
      title: '検索と置換', desc: '長い文章の語をまとめて入れ替える', category: '整える',
      metaTitle: 'テキストの検索と置換 — 一括置換、正規表現対応',
      long: '名前や用語が変わったとき、一か所ずつ直す必要はありません。大文字小文字の区別と正規表現をそれぞれ有効にでき、実行する前に何か所変わるかを数えて見せます。',
      features: ['置換する前に一致数を数える', '大文字小文字の区別を切り替え', '正規表現に対応', '改行（\\n）やタブも置換'],
    },
    manuscript: {
      title: '文字数カウント', desc: '文字数・原稿用紙の枚数を上限と見比べる', category: '数える',
      metaTitle: '文字数カウント — 空白を含む場合と含まない場合',
      long: '文章を貼り付けると、文字数（空白を含む場合と含まない場合）、単語数、400字詰め原稿用紙で何枚かが出ます。応募要項や依頼で決まっている上限を入れれば、あと何文字書けるかも分かります。',
      features: ['文字数（空白あり・なし）と単語数', '原稿用紙の枚数と読む時間の目安', '上限に対して残りいくつか', 'バイト数（アップロード制限用）'],
    },
    lorem: {
      title: 'ダミーテキスト生成', desc: 'レイアウトを埋めるための仮の文章', category: '数える',
      metaTitle: 'ダミーテキスト生成 — 好きな長さの仮の文章',
      long: 'デザインや画面を作っているあいだに必要な埋め草の文章を作ります。段落の数と一段落の長さを決められ、試している枠に収まるよう文字数をぴったりに切ることもできます。',
      features: ['古典的なラテン語のlorem ipsum', '段落の数と長さを指定', '指定した文字数でぴったり切る', '結果をまとめてコピー'],
    },
    mask: {
      title: "個人情報の伏せ字", desc: "氏名・電話番号・番号を一度に伏せます", category: "整える",
      metaTitle: "個人情報の伏せ字 — 氏名・電話番号・身分証番号をまとめてマスク",
      long: "氏名・電話番号・身分証番号・カード番号・メールアドレスが混じった文章を貼り付けると、まとめて伏せます。末尾は残るのでどの記録かは分かり、そのまま画面を共有できます。処理はブラウザの中だけで行い、サーバーには送りません。",
      features: ["氏名・電話・番号・カード・メールを一度に", "末尾を残して記録は見分けられるように", "種類ごとにオン・オフ", "伏せ字を選べます（* ● ■ X）"],
    },
    wrap: {
      title: "改行の整え直し", desc: "幅に合わせて折り返す・切れた行をつなぐ", category: "整える",
      metaTitle: "改行の整え直し — 幅に合わせて折り返す、切れた行をつなぐ",
      long: "PDFやメールから copy した文章は段落の途中で改行されています。その行をつないで段落に戻したり、逆に決まった文字数で折り返したりします。段落の間の空行はそのまま残るので、段落の区切りは失われません。",
      features: ["切れた行を段落につなぎ直す", "40・60・80・100文字で折り返す", "単語を途中で切らない", "段落の区切りはそのまま"],
    },
    table: {
      title: "表づくり", desc: "貼り付けたデータをMarkdown・CSV・HTMLの表に", category: "整える",
      metaTitle: "表づくり — 表計算からの貼り付けをMarkdown・CSV・HTMLに",
      long: "表計算ソフトから copy した行を貼り付けると、Markdownの表・CSV・TSV・HTMLの表に変えます。列の区切りは自分で判別し、行ごとにセルの数が違う場合は短い行を埋めるので表が崩れません。",
      features: ["Markdown・CSV・TSV・HTMLで出力", "区切り（タブ・カンマ・空白）を自動判別", "短い行を埋めて表が崩れないように", "桁幅をそろえる指定も可能"],
    },
    slug: {
      title: "スラッグ作成", desc: "記事の題名をURLに使える形に", category: "整える",
      metaTitle: "スラッグ作成 — 記事の題名をURL用のきれいなスラッグに",
      long: "記事の題名をURLに使える形に変えます。韓国語はラテン文字に翻字し、空白や記号はハイフンに変え、続いたハイフンや前後のハイフンを整理します。長さを制限するときは単語の途中ではなく区切りで切ります。",
      features: ["韓国語をラテン文字に翻字", "区切りはハイフンかアンダースコア", "アクセント記号を除去（café → cafe）", "長さ制限は単語の区切りで"],
    },
    reverse: {
      title: "文字の反転", desc: "文字・単語・行の単位で逆さにします", category: "記号",
      metaTitle: "文字の反転 — 文字・単語・行の単位で逆さにする",
      long: "文章を逆さにします。文字単位、単語単位、行単位から選べます。文字はコードポイント単位で扱うので絵文字や結合文字が割れることはなく、二度逆さにすると元どおりになります。",
      features: ["文字・単語・行の3つの単位", "絵文字が壊れません", "複数行は行ごとに反転", "結果をワンタップでコピー"],
    },
    vertical: {
      title: "縦書き変換", desc: "横書きの文章を1文字ずつ縦に立てます", category: "記号",
      metaTitle: "縦書き変換 — 横書きを縦の列に組み替える",
      long: "横書きの文章を1文字ずつ縦に立てます。複数行を入れるとそれぞれが1つの縦列になり、右から左へ読む伝統的な順にもできます。長さの違う列は空白で埋めるので、行がずれることはありません。",
      features: ["1文字ずつ縦に立てる", "複数行を並んだ縦列に", "右から左へ（伝統的な順）", "列の間の空きを調整"],
    },
    qr: {
      title: "QRコード作成", desc: "URL・Wi-Fi・連絡先をQRコードにします", category: "記号",
      metaTitle: "QRコード作成 — Wi-Fi・URL・連絡先・SMSを無料で",
      long: "URL、Wi-Fiの接続情報、連絡先、SMS、地図の座標をQRコードにします。エンコードはブラウザの中で行うので、入力したWi-Fiのパスワードはページの外に出ません。結果はSVGとPNGで保存できます。入りきらないときは黙って切り詰めず、どれだけ超えたかを伝えます — 切れたQRは見た目は正しく、何も読めません。",
      features: ["Wi-Fi・連絡先・メール・SMS・地図の書式", "誤り訂正レベル L・M・Q・H", "SVGで保存すれば印刷しても鮮明", "色・余白・セルの大きさを調整"],
    },
  },

  de: {
    clean: {
      title: 'Text aufräumen', desc: 'Bringt die schrägen Leerzeichen und Umbrüche in eingefügtem Text in Ordnung', category: 'Aufräumen',
      metaTitle: 'Text aufräumen — Unsichtbare Zeichen entfernen und Umbrüche reparieren',
      long: 'Text aus einem PDF oder einer Webseite schleppt unsichtbare Zeichen mit, Leerzeichen, die normal aussehen aber keine sind, und Umbrüche mitten im Satz. Das hier räumt alles in einem Durchgang auf und sagt dir, wie viel es von jeder Sorte entfernt hat.',
      features: ['Unsichtbare Zeichen und schräge Leerzeichen entfernen', 'Umbrüche innerhalb eines Satzes zusammenziehen', 'Mehrfache Leerzeichen und Leerzeilen zusammenfassen', 'Typografische Anführungszeichen zu geraden'],
    },
    dedupe: {
      title: 'Doppelte Zeilen entfernen', desc: 'Nimmt wiederholte Zeilen aus einer Liste und sortiert sie', category: 'Aufräumen',
      metaTitle: 'Doppelte Zeilen entfernen — Liste online entdoppeln und sortieren',
      long: 'Füg eine Liste ein und es entfernt die wiederholten Zeilen und sortiert den Rest alphabetisch. Du kannst festlegen, ob Zeilen, die sich nur durch umgebende Leerzeichen oder Groß- und Kleinschreibung unterscheiden, als gleich gelten — genau das brauchen echte Listen.',
      features: ['Doppelte entfernen (und zeigen, wie viele es waren)', 'A→Z oder Z→A sortieren', 'Leerzeichen oder Groß-/Kleinschreibung ignorieren', 'Leerzeilen löschen, Zeilennummern ergänzen'],
    },
    case: {
      title: 'Groß- und Kleinschreibung umwandeln', desc: 'Bringt Text in jeden Schreibstil', category: 'Aufräumen',
      metaTitle: 'Schreibweise umwandeln — GROSSBUCHSTABEN, kleinbuchstaben, Title Case, camelCase',
      long: 'Wandle in komplette Großschreibung, komplette Kleinschreibung oder Title Case um, und in Entwicklerkonventionen wie camelCase, snake_case und kebab-case. Jedes Ergebnis lässt sich einzeln kopieren.',
      features: ['GROSSBUCHSTABEN, kleinbuchstaben, Title Case', 'Satzanfang groß', 'camelCase, snake_case, kebab-case', 'Jeden Stil separat kopieren'],
    },
    'special-char': {
      title: 'Sonderzeichen', desc: 'Tipp auf einen Pfeil, eine Form oder ein Symbol, um es zu kopieren', category: 'Zeichen',
      metaTitle: 'Sonderzeichen — Pfeile, Formen und Symbole kopieren',
      long: 'Pfeile (→ ⇒), Formen (★ ◆ ▶), Satzzeichen (※ 「」), Mathematik und Einheiten (㎡ ℃ ±), Währungen (€ ₩) und eingekreiste Zeichen (① ㉠) — tipp auf eines und es ist kopiert. Kein Suchen mehr nach einem Symbol, das deine Tastatur nicht kann.',
      features: ['Symbole nach Kategorie geordnet', 'Antippen und sofort kopiert', 'Suche nach Namen', 'Merkt sich die, die du benutzt hast'],
    },
    emoticon: {
      title: 'Text-Emoticons', desc: 'Kopiere Kaomoji wie (╯°□°）╯', category: 'Zeichen',
      metaTitle: 'Text-Emoticons — Kaomoji und ASCII-Gesichter kopieren',
      long: 'Emoticons rein aus Zeichen — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — nach Stimmung gesammelt. Weil es Text ist und keine Bilder, lassen sie sich überall einfügen, ohne zu zerbrechen, und funktionieren in Nutzernamen und Statusmeldungen.',
      features: ['Nach Stimmung geordnet: froh, traurig, wütend und mehr', 'Kaomoji und ASCII-Gesichter', 'Antippen und sofort kopiert', 'Merkt sich die, die du benutzt hast'],
    },
    replace: {
      title: 'Suchen und ersetzen', desc: 'Tausch ein Wort in einem langen Text auf einmal aus', category: 'Aufräumen',
      metaTitle: 'Text suchen und ersetzen — Massenersetzung, Regex möglich',
      long: 'Wenn sich ein Name oder ein Begriff ändert, musst du es nicht Stelle für Stelle richten. Groß-/Kleinschreibung und reguläre Ausdrücke lassen sich beide einschalten, und es zählt, wie viele Stellen sich ändern werden, bevor du zusagst.',
      features: ['Zählt die Treffer vor dem Ersetzen', 'Schalter für Groß-/Kleinschreibung', 'Reguläre Ausdrücke möglich', 'Ersetzt Umbrüche (\\n) und Tabulatoren'],
    },
    manuscript: {
      title: 'Wörter- und Zeichenzähler', desc: 'Zählt Wörter, Zeichen und Seiten gegen ein Limit', category: 'Zählen',
      metaTitle: 'Wörter- und Zeichenzähler — Mit und ohne Leerzeichen',
      long: 'Füg deinen Text ein und du bekommst die Wortzahl, die Zeichenzahl mit und ohne Leerzeichen und ungefähr, wie viele Seiten das sind. Trag das Limit ein, das eine Bewerbung oder ein Auftrag vorgibt, und es zeigt, wie viel du noch hast.',
      features: ['Wörter, Zeichen mit und ohne Leerzeichen', 'Geschätzte Seiten und Lesezeit', 'Rest gegen dein Limit', 'Byte-Zahl (für Upload-Grenzen)'],
    },
    lorem: {
      title: 'Lorem-Ipsum-Generator', desc: 'Blindtext, um ein Layout zu füllen', category: 'Zählen',
      metaTitle: 'Lorem-Ipsum-Generator — Blindtext in jeder Länge',
      long: 'Erzeugt den Blindtext, den du beim Bauen eines Designs oder eines Screens brauchst. Leg fest, wie viele Absätze und wie lang jeder ist, oder kürze auf eine genaue Zeichenzahl, damit er in das Feld passt, das du testest.',
      features: ['Klassisches lateinisches Lorem ipsum', 'Absatzzahl und -länge festlegen', 'Auf eine genaue Zeichenzahl kürzen', 'Das ganze Ergebnis auf einmal kopieren'],
    },
    mask: {
      title: "Persönliche Daten schwärzen", desc: "Namen, Telefonnummern und Ausweisnummern in einem Durchgang", category: "Aufräumen",
      metaTitle: "Persönliche Daten schwärzen — Namen, Telefonnummern und Ausweisnummern maskieren",
      long: "Füge Text mit Namen, Telefonnummern, Ausweisnummern, Kartennummern und E-Mail-Adressen ein — alles wird auf einmal verdeckt. Die letzten Ziffern bleiben sichtbar, sodass sich der Datensatz noch zuordnen lässt und das Ergebnis geteilt werden kann. Alles läuft im Browser, nichts geht an einen Server.",
      features: ["Namen, Telefon, Ausweis, Karte und E-Mail auf einmal", "Letzte Ziffern bleiben zur Zuordnung stehen", "Jede Art einzeln an- und abschalten", "Platzhalterzeichen wählbar (* ● ■ X)"],
    },
    wrap: {
      title: "Zeilenumbrüche neu setzen", desc: "Auf eine Breite umbrechen oder zerrissene Zeilen zusammenfügen", category: "Aufräumen",
      metaTitle: "Zeilenumbrüche neu setzen — Auf eine Breite umbrechen oder Zeilen zusammenfügen",
      long: "Text aus einem PDF oder einer E-Mail bricht mitten im Absatz um. Das fügt diese Zeilen wieder zu Absätzen zusammen — oder macht das Gegenteil und bricht alles auf eine feste Zeichenzahl um. Leerzeilen zwischen Absätzen bleiben stehen, die Absatzstruktur überlebt also.",
      features: ["Zerrissene Zeilen wieder zu Absätzen fügen", "Auf 40, 60, 80 oder 100 Zeichen umbrechen", "Wörter werden nie getrennt", "Absatzumbrüche bleiben erhalten"],
    },
    table: {
      title: "Tabellen-Baukasten", desc: "Eingefügte Daten als Markdown-, CSV- oder HTML-Tabelle", category: "Aufräumen",
      metaTitle: "Tabellen-Baukasten — Tabellendaten als Markdown, CSV oder HTML einfügen",
      long: "Füge Zeilen aus einer Tabellenkalkulation ein, und daraus wird eine Markdown-Tabelle, CSV, TSV oder eine HTML-Tabelle. Es erkennt selbst, was die Spalten trennt, und füllt kurze Zeilen auf, wenn Zeilen unterschiedlich viele Zellen haben — so bricht die Tabelle nicht auseinander.",
      features: ["Ausgabe als Markdown, CSV, TSV und HTML", "Erkennt das Trennzeichen (Tabulator, Komma, Leerzeichen)", "Füllt kurze Zeilen auf, damit die Tabelle stimmt", "Optional Spalten auf gleiche Breite bringen"],
    },
    slug: {
      title: "Slug-Generator", desc: "Macht aus einem Titel etwas, das in eine URL passt", category: "Aufräumen",
      metaTitle: "Slug-Generator — Aus einem Beitragstitel einen sauberen URL-Slug machen",
      long: "Macht aus einem Beitragstitel etwas, das in eine URL passt. Koreanisch wird ins lateinische Alphabet umgeschrieben, Leerzeichen und Satzzeichen werden zu Bindestrichen, und mehrfache oder randständige Bindestriche werden entfernt. Bei einer Längenbegrenzung wird an einer Wortgrenze geschnitten, nicht mitten im Wort.",
      features: ["Schreibt Koreanisch ins lateinische Alphabet um", "Bindestrich oder Unterstrich als Trenner", "Entfernt Akzente (café → cafe)", "Längenbegrenzung schneidet an Wortgrenzen"],
    },
    reverse: {
      title: "Text umkehren", desc: "Dreht Text zeichen-, wort- oder zeilenweise um", category: "Zeichen",
      metaTitle: "Text umkehren — Eine Zeichenkette zeichen-, wort- oder zeilenweise umdrehen",
      long: "Kehrt Text um. Du kannst zeichenweise, wortweise oder zeilenweise umdrehen. Zeichen werden nach Codepoint behandelt, sodass Emoji und kombinierende Zeichen nicht auseinandergerissen werden — und zweimaliges Umkehren ergibt exakt den Ausgangstext.",
      features: ["Drei Einheiten: Zeichen, Wörter, Zeilen", "Emoji bleiben unversehrt", "Jede Zeile wird für sich umgekehrt", "Ergebnis mit einem Tipp kopieren"],
    },
    vertical: {
      title: "Senkrechter Text", desc: "Stellt waagerechten Text auf — ein Zeichen pro Zeile", category: "Zeichen",
      metaTitle: "Senkrechter Text — Waagerechte Schrift in senkrechte Spalten verwandeln",
      long: "Stellt waagerechte Schrift Zeichen für Zeichen auf. Gibst du mehrere Zeilen ein, wird jede zu einer eigenen senkrechten Spalte; du kannst sie auch von rechts nach links lesen, in der überlieferten Reihenfolge. Unterschiedlich lange Spalten werden aufgefüllt, damit die Reihen nie verrutschen.",
      features: ["Ein Zeichen pro Zeile, aufrecht", "Mehrere Zeilen werden nebeneinanderstehende Spalten", "Von rechts nach links (überliefert)", "Einstellbarer Abstand zwischen Spalten"],
    },
    qr: {
      title: "QR-Code-Generator", desc: "Link, WLAN oder Kontakt als QR-Code", category: "Zeichen",
      metaTitle: "QR-Code-Generator — WLAN, Link, vCard und SMS, kostenlos",
      long: "Macht aus einem Link, WLAN-Zugangsdaten, einer Kontaktkarte, einer SMS oder einem Kartenpunkt einen QR-Code. Codiert wird im Browser, das eingegebene WLAN-Passwort verlässt die Seite also nicht, und das Ergebnis gibt es als SVG oder PNG. Passt der Inhalt nicht, sagt es dir um wie viel — abgeschnitten wird nichts, denn ein abgeschnittener Code sieht richtig aus und liest sich als nichts.",
      features: ["Vorlagen für WLAN, Kontakt, E-Mail, SMS und Karte", "Fehlerkorrektur L, M, Q oder H", "SVG bleibt beim Drucken scharf", "Farben, Rand und Modulgröße einstellbar"],
    },
  },

  fr: {
    clean: {
      title: 'Nettoyer le texte', desc: 'Corrige les espaces et retours à la ligne bizarres du texte collé', category: 'Nettoyer',
      metaTitle: 'Nettoyer le texte — Supprimer les caractères invisibles et réparer les retours à la ligne',
      long: 'Un texte copié d’un PDF ou d’une page web traîne des caractères invisibles, des espaces qui ont l’air normaux mais n’en sont pas, et des retours à la ligne au milieu des phrases. Ceci nettoie tout d’un coup et te dit combien de chaque sorte a été retiré.',
      features: ['Supprimer caractères invisibles et espaces bizarres', 'Recoller les retours à la ligne dans une phrase', 'Réduire espaces et lignes vides répétés', 'Guillemets typographiques en guillemets droits'],
    },
    dedupe: {
      title: 'Supprimer les lignes en double', desc: 'Retire les lignes répétées d’une liste et la trie', category: 'Nettoyer',
      metaTitle: 'Supprimer les doublons — Dédoublonner et trier une liste en ligne',
      long: 'Colle une liste et il retire les lignes répétées et trie le reste par ordre alphabétique. Tu peux décider si des lignes qui ne diffèrent que par les espaces autour ou la casse comptent comme identiques — c’est justement ce dont les vraies listes ont besoin.',
      features: ['Supprimer les doublons (et dire combien sont partis)', 'Trier A→Z ou Z→A', 'Ignorer les espaces ou la casse', 'Retirer les lignes vides, numéroter les lignes'],
    },
    case: {
      title: 'Convertir la casse', desc: 'Passe le texte dans n’importe quel style de casse', category: 'Nettoyer',
      metaTitle: 'Convertir la casse — MAJUSCULES, minuscules, Titre, camelCase',
      long: 'Passe en tout majuscules, tout minuscules ou Style Titre, et vers les conventions de développement comme camelCase, snake_case et kebab-case. Chaque résultat se copie séparément.',
      features: ['MAJUSCULES, minuscules, Style Titre', 'Style phrase', 'camelCase, snake_case, kebab-case', 'Copier chaque style séparément'],
    },
    'special-char': {
      title: 'Caractères spéciaux', desc: 'Touche une flèche, une forme ou un symbole pour le copier', category: 'Symboles',
      metaTitle: 'Caractères spéciaux — Copier flèches, formes et symboles',
      long: 'Flèches (→ ⇒), formes (★ ◆ ▶), ponctuation (※ 「」), maths et unités (㎡ ℃ ±), monnaies (€ ₩) et caractères encerclés (① ㉠) — touche n’importe lequel pour le copier. Fini de chercher un symbole que ton clavier ne sait pas taper.',
      features: ['Symboles regroupés par catégorie', 'Touche et c’est copié', 'Recherche par nom', 'Se souvient de ceux que tu as utilisés'],
    },
    emoticon: {
      title: 'Émoticônes texte', desc: 'Copie des kaomoji comme (╯°□°）╯', category: 'Symboles',
      metaTitle: 'Émoticônes texte — Copier kaomoji et visages ASCII',
      long: 'Des émoticônes faites uniquement de caractères — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — rassemblées par humeur. Comme c’est du texte et non des images, elles se collent partout sans casser et fonctionnent dans les pseudos et les messages de statut.',
      features: ['Regroupées par humeur : joyeux, triste, fâché et plus', 'Kaomoji et visages ASCII', 'Touche et c’est copié', 'Se souvient de celles que tu as utilisées'],
    },
    replace: {
      title: 'Rechercher et remplacer', desc: 'Remplace un mot dans tout un long texte d’un coup', category: 'Nettoyer',
      metaTitle: 'Rechercher et remplacer en ligne — Remplacement en masse, regex acceptées',
      long: 'Quand un nom ou un terme change, pas besoin de corriger une occurrence à la fois. La sensibilité à la casse et les expressions régulières s’activent toutes deux, et il compte combien d’endroits vont changer avant que tu valides.',
      features: ['Compte les occurrences avant de remplacer', 'Interrupteur de sensibilité à la casse', 'Expressions régulières acceptées', 'Remplace les retours à la ligne (\\n) et les tabulations'],
    },
    manuscript: {
      title: 'Compteur de mots et de caractères', desc: 'Compte mots, caractères et pages face à une limite', category: 'Compter',
      metaTitle: 'Compteur de mots et de caractères — Avec et sans espaces',
      long: 'Colle ton texte et obtiens le nombre de mots, le nombre de caractères avec et sans espaces, et à peu près combien de pages cela fait. Indique la limite qu’impose un dossier ou une commande et il montre ce qu’il te reste.',
      features: ['Mots, caractères avec et sans espaces', 'Pages estimées et temps de lecture', 'Ce qui reste face à ta limite', 'Nombre d’octets (pour les limites d’envoi)'],
    },
    lorem: {
      title: 'Générateur de lorem ipsum', desc: 'Du faux texte pour remplir une maquette', category: 'Compter',
      metaTitle: 'Générateur de lorem ipsum — Faux texte, n’importe quelle longueur',
      long: 'Génère le faux texte dont tu as besoin pendant que tu construis une maquette ou un écran. Fixe le nombre de paragraphes et la longueur de chacun, ou coupe à un nombre exact de caractères pour que ça rentre dans la boîte que tu testes.',
      features: ['Lorem ipsum latin classique', 'Fixer le nombre et la longueur des paragraphes', 'Couper à un nombre exact de caractères', 'Copier tout le résultat d’un coup'],
    },
    mask: {
      title: "Masquer les données personnelles", desc: "Cache noms, téléphones et numéros d’identité d’un coup", category: "Nettoyer",
      metaTitle: "Masquer les données personnelles — Noms, téléphones et numéros d’identité",
      long: "Collez un texte contenant des noms, des téléphones, des numéros d’identité, des cartes et des e-mails : tout est masqué d’un coup. Les derniers chiffres restent visibles, si bien qu’on reconnaît encore l’enregistrement et que le résultat peut être partagé. Tout se passe dans votre navigateur, rien n’est envoyé à un serveur.",
      features: ["Noms, téléphones, identités, cartes et e-mails d’un coup", "Garde les derniers chiffres pour reconnaître l’enregistrement", "Activez ou désactivez chaque type", "Choisissez le caractère de masque (* ● ■ X)"],
    },
    wrap: {
      title: "Remettre en forme les retours à la ligne", desc: "Couper à une largeur ou rejoindre les lignes coupées", category: "Nettoyer",
      metaTitle: "Remettre en forme les retours à la ligne — Couper à une largeur ou rejoindre les lignes",
      long: "Le texte copié d’un PDF ou d’un e-mail se coupe au milieu d’un paragraphe. Ceci rejoint ces lignes en paragraphes, ou fait l’inverse et coupe tout à un nombre fixe de caractères. Les lignes vides entre paragraphes restent, la structure est donc préservée.",
      features: ["Rejoint les lignes coupées en paragraphes", "Coupe à 40, 60, 80 ou 100 caractères", "Ne coupe jamais un mot en deux", "Les sauts de paragraphe sont conservés"],
    },
    table: {
      title: "Constructeur de tableau", desc: "Transforme les données collées en tableau Markdown, CSV ou HTML", category: "Nettoyer",
      metaTitle: "Constructeur de tableau — Collez des données de tableur en Markdown, CSV ou HTML",
      long: "Collez des lignes copiées depuis un tableur et elles deviennent un tableau Markdown, CSV, TSV ou HTML. L’outil devine seul ce qui sépare les colonnes et, quand les lignes n’ont pas le même nombre de cellules, il complète les plus courtes pour que le tableau ne se désaligne pas.",
      features: ["Sortie Markdown, CSV, TSV et HTML", "Détecte le séparateur (tabulation, virgule, espaces)", "Complète les lignes courtes pour garder l’alignement", "Option pour égaliser la largeur des colonnes"],
    },
    slug: {
      title: "Générateur de slug", desc: "Transforme un titre en quelque chose qui tient dans une URL", category: "Nettoyer",
      metaTitle: "Générateur de slug — Transformer un titre d’article en slug propre",
      long: "Transforme un titre d’article en quelque chose que vous pouvez mettre dans une URL. Le coréen est translittéré en alphabet latin, les espaces et la ponctuation deviennent des tirets, et les tirets répétés ou en bout de chaîne sont nettoyés. Quand vous limitez la longueur, la coupe se fait à une frontière de mot.",
      features: ["Translittère le coréen en alphabet latin", "Tiret ou tiret bas comme séparateur", "Supprime les accents (café → cafe)", "La limite de longueur coupe entre les mots"],
    },
    reverse: {
      title: "Inverser le texte", desc: "Retourne le texte par caractère, par mot ou par ligne", category: "Symboles",
      metaTitle: "Inverser le texte — Retourner une chaîne par caractère, mot ou ligne",
      long: "Inverse le texte. Vous pouvez le retourner caractère par caractère, mot par mot ou ligne par ligne. Les caractères sont traités par point de code, donc les emoji et les signes combinants ne sont pas coupés en deux — et inverser deux fois redonne exactement le texte de départ.",
      features: ["Trois unités : caractères, mots, lignes", "Les emoji restent intacts", "Chaque ligne est inversée séparément", "Copiez le résultat d’un geste"],
    },
    vertical: {
      title: "Texte vertical", desc: "Dresse le texte horizontal, un caractère par ligne", category: "Symboles",
      metaTitle: "Texte vertical — Transformer l’écriture horizontale en colonnes verticales",
      long: "Dresse l’écriture horizontale caractère par caractère. Donnez-lui plusieurs lignes et chacune devient sa propre colonne verticale ; vous pouvez aussi les lire de droite à gauche, l’ordre traditionnel. Les colonnes de longueurs différentes sont complétées pour que les rangées ne se décalent jamais.",
      features: ["Un caractère par ligne, à la verticale", "Plusieurs lignes deviennent des colonnes côte à côte", "Ordre de droite à gauche (traditionnel)", "Espace réglable entre les colonnes"],
    },
    qr: {
      title: "Générateur de QR code", desc: "Un lien, un Wi-Fi ou un contact en code QR", category: "Symboles",
      metaTitle: "Générateur de QR code — Wi-Fi, lien, vCard et SMS, gratuit",
      long: "Transforme un lien, les identifiants d’un Wi-Fi, une fiche de contact, un SMS ou un point sur la carte en code QR. L’encodage se fait dans le navigateur : le mot de passe que tu saisis ne quitte pas la page, et le résultat se télécharge en SVG ou en PNG. Si le contenu ne rentre pas, on te dit de combien plutôt que de le tronquer — un code tronqué a l’air correct et ne se lit pas.",
      features: ["Modèles Wi-Fi, contact, e-mail, SMS et carte", "Correction d’erreurs L, M, Q ou H", "SVG net à l’impression", "Couleurs, marge et taille de module réglables"],
    },
  },

  hi: {
    clean: {
      title: 'टेक्स्ट साफ़ करें', desc: 'चिपकाए पाठ के अजीब स्पेस और लाइन ब्रेक ठीक करें', category: 'सफ़ाई',
      metaTitle: 'टेक्स्ट साफ़ करें — अदृश्य अक्षर हटाएँ और लाइन ब्रेक ठीक करें',
      long: 'PDF या वेब पेज से कॉपी किए पाठ में अदृश्य अक्षर, दिखने में सामान्य पर असल में अलग स्पेस, और वाक्य के बीच में पड़े लाइन ब्रेक चले आते हैं। यह सब एक ही बार में साफ़ कर देता है और बताता है कि किस तरह के कितने हटाए।',
      features: ['अदृश्य अक्षर और अजीब स्पेस हटाएँ', 'वाक्य के भीतर के लाइन ब्रेक जोड़ें', 'दोहराए स्पेस और खाली पंक्तियाँ समेटें', 'घुमावदार उद्धरण चिह्न सीधे करें'],
    },
    dedupe: {
      title: 'दोहराई पंक्तियाँ हटाएँ', desc: 'सूची से दोहराई पंक्तियाँ हटाएँ और क्रम में लगाएँ', category: 'सफ़ाई',
      metaTitle: 'दोहराई पंक्तियाँ हटाएँ — सूची से दोहराव हटाकर क्रम में लगाएँ',
      long: 'सूची चिपकाइए और यह दोहराई पंक्तियाँ हटाकर बची पंक्तियों को वर्णक्रम में लगा देता है। आप तय कर सकते हैं कि आगे-पीछे के स्पेस या बड़े-छोटे अक्षर भर से अलग दिखने वाली पंक्तियाँ एक मानी जाएँ या नहीं — असली सूचियों में यही ज़रूरत पड़ती है।',
      features: ['दोहराव हटाएँ (और कितने हटे यह भी)', 'A→Z या Z→A क्रम', 'स्पेस या अक्षर-आकार को नज़रअंदाज़ करें', 'खाली पंक्तियाँ हटाएँ, पंक्ति संख्या जोड़ें'],
    },
    case: {
      title: 'अक्षर-आकार बदलें', desc: 'पाठ को किसी भी कैपिटलाइज़ेशन शैली में लाएँ', category: 'सफ़ाई',
      metaTitle: 'अक्षर-आकार बदलें — UPPERCASE, lowercase, Title Case, camelCase',
      long: 'पूरे बड़े अक्षर, पूरे छोटे अक्षर या Title Case में बदलें, और camelCase, snake_case, kebab-case जैसी प्रोग्रामिंग शैलियों में भी। हर नतीजा अलग से कॉपी किया जा सकता है।',
      features: ['UPPERCASE, lowercase, Title Case', 'वाक्य शैली', 'camelCase, snake_case, kebab-case', 'हर शैली अलग से कॉपी करें'],
    },
    'special-char': {
      title: 'विशेष चिह्न', desc: 'तीर, आकृति या चिह्न दबाकर कॉपी करें', category: 'चिह्न',
      metaTitle: 'विशेष चिह्न — तीर, आकृतियाँ और चिह्न कॉपी करें',
      long: 'तीर (→ ⇒), आकृतियाँ (★ ◆ ▶), विराम चिह्न (※ 「」), गणित और इकाइयाँ (㎡ ℃ ±), मुद्राएँ (€ ₩) और घेरे अक्षर (① ㉠) — किसी को भी दबाकर कॉपी कीजिए। जो चिह्न कीबोर्ड से नहीं टाइप होता, उसे ढूँढते फिरने की ज़रूरत नहीं।',
      features: ['श्रेणी के अनुसार चिह्न', 'दबाते ही कॉपी', 'नाम से खोज', 'इस्तेमाल किए चिह्न याद रखता है'],
    },
    emoticon: {
      title: 'टेक्स्ट इमोटिकॉन', desc: '(╯°□°）╯ जैसे काओमोजी कॉपी करें', category: 'चिह्न',
      metaTitle: 'टेक्स्ट इमोटिकॉन — काओमोजी और ASCII चेहरे कॉपी करें',
      long: 'सिर्फ़ अक्षरों से बने इमोटिकॉन — ¯\\_(ツ)_/¯, (╯°□°）╯, ಠ_ಠ — मिज़ाज के हिसाब से जुटाए गए। ये तस्वीर नहीं, पाठ हैं, इसलिए कहीं भी चिपकाने पर टूटते नहीं और यूज़रनेम तथा स्टेटस में भी चलते हैं।',
      features: ['मिज़ाज के अनुसार: ख़ुश, दुखी, गुस्सा और अन्य', 'काओमोजी और ASCII चेहरे', 'दबाते ही कॉपी', 'इस्तेमाल किए हुए याद रखता है'],
    },
    replace: {
      title: 'खोजें और बदलें', desc: 'लंबे पाठ में कोई शब्द एक बार में बदलें', category: 'सफ़ाई',
      metaTitle: 'पाठ खोजें और बदलें — एक साथ बदलाव, regex समर्थित',
      long: 'कोई नाम या शब्द बदल जाए तो एक-एक जगह ठीक करने की ज़रूरत नहीं। अक्षर-आकार का भेद और नियमित अभिव्यक्तियाँ (regex) दोनों चालू की जा सकती हैं, और बदलने से पहले यह गिन देता है कि कितनी जगह बदलेंगी।',
      features: ['बदलने से पहले मिलान गिनता है', 'अक्षर-आकार का भेद चालू/बंद', 'नियमित अभिव्यक्तियाँ समर्थित', 'लाइन ब्रेक (\\n) और टैब भी बदलें'],
    },
    manuscript: {
      title: 'शब्द और अक्षर गिनती', desc: 'सीमा के मुक़ाबले शब्द, अक्षर और पन्ने गिनें', category: 'गिनती',
      metaTitle: 'शब्द और अक्षर गिनती — स्पेस सहित और स्पेस रहित',
      long: 'अपना पाठ चिपकाइए और शब्दों की संख्या, स्पेस सहित तथा स्पेस रहित अक्षरों की संख्या, और लगभग कितने पन्ने बनेंगे यह मिल जाता है। आवेदन या काम में तय सीमा डाल दें तो कितना बाकी है यह भी दिखता है।',
      features: ['शब्द, स्पेस सहित और रहित अक्षर', 'अनुमानित पन्ने और पढ़ने का समय', 'आपकी सीमा के मुक़ाबले शेष', 'बाइट गिनती (अपलोड सीमा के लिए)'],
    },
    lorem: {
      title: 'लोरेम इप्सम जनरेटर', desc: 'लेआउट भरने के लिए नमूना पाठ', category: 'गिनती',
      metaTitle: 'लोरेम इप्सम जनरेटर — किसी भी लंबाई का नमूना पाठ',
      long: 'डिज़ाइन या स्क्रीन बनाते समय जो भराई का पाठ चाहिए, वह बना देता है। कितने अनुच्छेद और हर एक कितना लंबा हो यह तय करें, या जिस डिब्बे में फ़िट करना है उसके हिसाब से ठीक उतने अक्षरों पर काट दें।',
      features: ['क्लासिक लैटिन लोरेम इप्सम', 'अनुच्छेदों की संख्या और लंबाई तय करें', 'ठीक उतने अक्षरों पर काटें', 'पूरा नतीजा एक बार में कॉपी करें'],
    },
    mask: {
      title: "निजी जानकारी छिपाएँ", desc: "नाम, फ़ोन नंबर और पहचान संख्या एक साथ छिपाएँ", category: "सफ़ाई",
      metaTitle: "निजी जानकारी छिपाएँ — नाम, फ़ोन नंबर और पहचान संख्या मास्क करें",
      long: "ऐसा पाठ चिपकाएँ जिसमें नाम, फ़ोन नंबर, पहचान संख्या, कार्ड नंबर और ईमेल हों — सब एक साथ छिप जाएँगे। आख़िरी अंक दिखते रहते हैं, इसलिए यह पहचाना जा सकता है कि कौन-सा रिकॉर्ड था और परिणाम साझा किया जा सकता है। सब कुछ आपके ब्राउज़र में होता है, कुछ भी सर्वर पर नहीं जाता।",
      features: ["नाम, फ़ोन, पहचान, कार्ड और ईमेल एक साथ", "आख़िरी अंक रखे जाते हैं ताकि पहचान बनी रहे", "हर प्रकार को अलग से चालू या बंद करें", "छिपाने का चिह्न चुनें (* ● ■ X)"],
    },
    wrap: {
      title: "पंक्ति-विराम व्यवस्थित करें", desc: "चौड़ाई के अनुसार तोड़ें या टूटी पंक्तियाँ जोड़ें", category: "सफ़ाई",
      metaTitle: "पंक्ति-विराम व्यवस्थित करें — चौड़ाई से तोड़ें या टूटी पंक्तियाँ जोड़ें",
      long: "PDF या ईमेल से नक़ल किया पाठ अनुच्छेद के बीच में टूट जाता है। यह उन पंक्तियों को फिर से अनुच्छेदों में जोड़ता है, या इसका उल्टा करके सब कुछ तय अक्षर-संख्या पर तोड़ता है। अनुच्छेदों के बीच की ख़ाली पंक्तियाँ बनी रहती हैं, इसलिए संरचना नहीं बिगड़ती।",
      features: ["टूटी पंक्तियों को अनुच्छेदों में जोड़ता है", "40, 60, 80 या 100 अक्षरों पर तोड़ता है", "शब्द को बीच से कभी नहीं तोड़ता", "अनुच्छेद-विराम सुरक्षित रहते हैं"],
    },
    table: {
      title: "तालिका निर्माता", desc: "चिपकाए डेटा को Markdown, CSV या HTML तालिका में बदलें", category: "सफ़ाई",
      metaTitle: "तालिका निर्माता — स्प्रेडशीट डेटा को Markdown, CSV या HTML में",
      long: "स्प्रेडशीट से नक़ल की पंक्तियाँ चिपकाएँ और वे Markdown तालिका, CSV, TSV या HTML तालिका बन जाएँगी। यह स्वयं पहचान लेता है कि स्तंभ किससे अलग हैं, और जब पंक्तियों में कोशिकाओं की संख्या अलग हो तो छोटी पंक्तियों को भर देता है ताकि तालिका बिगड़े नहीं।",
      features: ["Markdown, CSV, TSV और HTML में आउटपुट", "विभाजक पहचानता है (टैब, अल्पविराम, रिक्त स्थान)", "छोटी पंक्तियाँ भरकर तालिका सही रखता है", "स्तंभों की चौड़ाई बराबर करने का विकल्प"],
    },
    slug: {
      title: "स्लग जनरेटर", desc: "शीर्षक को URL में डालने लायक बनाएँ", category: "सफ़ाई",
      metaTitle: "स्लग जनरेटर — पोस्ट के शीर्षक को साफ़ URL स्लग में बदलें",
      long: "पोस्ट के शीर्षक को ऐसे रूप में बदलता है जिसे URL में डाला जा सके। कोरियाई को रोमन लिपि में लिखा जाता है, रिक्त स्थान और विराम-चिह्न हाइफ़न बन जाते हैं, और लगातार या किनारे के हाइफ़न साफ़ कर दिए जाते हैं। लंबाई सीमित करने पर शब्द के बीच नहीं, सीमा पर काटा जाता है।",
      features: ["कोरियाई को रोमन लिपि में लिखता है", "हाइफ़न या अंडरस्कोर विभाजक", "उच्चारण-चिह्न हटाता है (café → cafe)", "लंबाई सीमा शब्द-सीमा पर काटती है"],
    },
    reverse: {
      title: "पाठ उलटें", desc: "अक्षर, शब्द या पंक्ति के हिसाब से उलटें", category: "चिह्न",
      metaTitle: "पाठ उलटें — अक्षर, शब्द या पंक्ति के हिसाब से पलटें",
      long: "पाठ को उलटता है। आप इसे अक्षर-दर-अक्षर, शब्द-दर-शब्द या पंक्ति-दर-पंक्ति पलट सकते हैं। अक्षरों को कोड-पॉइंट के हिसाब से संभाला जाता है, इसलिए इमोजी और संयोजक चिह्न बीच से नहीं टूटते — और दो बार उलटने पर बिलकुल वही लौट आता है जो शुरू में था।",
      features: ["तीन इकाइयाँ: अक्षर, शब्द, पंक्तियाँ", "इमोजी सुरक्षित रहते हैं", "हर पंक्ति अलग से उलटती है", "एक बार में परिणाम कॉपी करें"],
    },
    vertical: {
      title: "लंबवत पाठ", desc: "क्षैतिज पाठ को प्रति पंक्ति एक अक्षर करके खड़ा करें", category: "चिह्न",
      metaTitle: "लंबवत पाठ — क्षैतिज लेखन को लंबवत स्तंभों में बदलें",
      long: "क्षैतिज लेखन को एक-एक अक्षर करके खड़ा करता है। कई पंक्तियाँ दें तो हर एक अपना लंबवत स्तंभ बन जाती है; आप उन्हें दाएँ से बाएँ, पारंपरिक क्रम में भी पढ़ सकते हैं। अलग-अलग लंबाई के स्तंभ भर दिए जाते हैं ताकि पंक्तियाँ कभी न खिसकें।",
      features: ["प्रति पंक्ति एक अक्षर, खड़ा", "कई पंक्तियाँ अगल-बगल स्तंभ बनती हैं", "दाएँ से बाएँ (पारंपरिक) क्रम", "स्तंभों के बीच समायोज्य जगह"],
    },
    qr: {
      title: "क्यूआर कोड जेनरेटर", desc: "लिंक, वाई-फ़ाई या संपर्क को क्यूआर कोड बनाएँ", category: "चिह्न",
      metaTitle: "क्यूआर कोड जेनरेटर — वाई-फ़ाई, लिंक, vCard और एसएमएस, मुफ़्त",
      long: "किसी लिंक, वाई-फ़ाई के लॉगिन, संपर्क कार्ड, एसएमएस या नक्शे के बिंदु को क्यूआर कोड में बदलता है। एन्कोडिंग आपके ब्राउज़र में ही होती है, इसलिए टाइप किया वाई-फ़ाई पासवर्ड पन्ने से बाहर नहीं जाता, और नतीजा SVG या PNG में सहेजा जा सकता है। सामग्री न समाए तो चुपचाप काटने की जगह बताता है कि कितना ज़्यादा है — कटा कोड देखने में ठीक लगता है और कुछ भी स्कैन नहीं होता।",
      features: ["वाई-फ़ाई, संपर्क, ईमेल, एसएमएस और नक्शे के प्रारूप", "त्रुटि सुधार L, M, Q या H", "SVG छापने पर भी साफ़ रहता है", "रंग, हाशिया और खाने का आकार बदलें"],
    },
  },
  'zh-hans': {
    clean: {
      title: '文本清理', desc: '把贴进来的文字里乱掉的空格和换行理干净', category: '整理',
      metaTitle: '文本清理 — 删掉看不见的字符、修好断行',
      long: '从PDF或网页复制出来的文字，带着看不见的字符、看起来正常其实不是的空格，还有句子中间断掉的换行。这里一次全清掉，并告诉你每种各删了多少。',
      features: ['删掉看不见的字符和怪空格', '把句子中间的换行接回去', '把重复的空格和空行并成一个', '智能引号换成直引号'],
    },
    dedupe: {
      title: '删除重复行', desc: '把列表里重复的行去掉再排序', category: '整理',
      metaTitle: '删除重复行 — 在线去重并排序列表',
      long: '贴一份列表进来，它会去掉重复的行，再把剩下的按字母排好。要不要把「只差首尾空格」或「只差大小写」的行当成同一行，可以自己选 — 真实的列表就是需要这个。',
      features: ['去掉重复（并显示删了几行）', '按A→Z或Z→A排序', '忽略空格或大小写', '删掉空行、加上行号'],
    },
    case: {
      title: '大小写转换', desc: '把文字转成任何一种大小写写法', category: '整理',
      metaTitle: '大小写转换 — UPPERCASE、lowercase、Title Case、camelCase',
      long: '转成全大写、全小写或标题式大写，也能转成camelCase、snake_case、kebab-case这些开发上的写法。每一种结果都能单独复制。',
      features: ['UPPERCASE、lowercase、Title Case', '句首大写', 'camelCase、snake_case、kebab-case', '每一种单独复制'],
    },
    'special-char': {
      title: '特殊符号', desc: '点一下箭头、图形或符号就复制', category: '符号',
      metaTitle: '特殊符号 — 复制箭头、图形和各种符号',
      long: '箭头（→ ⇒）、图形（★ ◆ ▶）、标点（※ 「」）、数学和单位（㎡ ℃ ±）、货币（€ ¥）还有带圈字符（① ㉠）— 点哪个就复制哪个。不用再到处找键盘打不出来的符号了。',
      features: ['按类别分好的符号', '点一下立刻复制', '按名字搜', '记住你用过的'],
    },
    emoticon: {
      title: '颜文字', desc: '复制 (╯°□°）╯ 这类颜文字', category: '符号',
      metaTitle: '颜文字 — 复制kaomoji和ASCII表情',
      long: '纯用字符搭出来的表情 — ¯\\\\_(ツ)_/¯、(╯°□°）╯、ಠ_ಠ — 按心情收好了。因为是文字不是图片，贴到哪儿都不会坏，用户名和状态栏里也能用。',
      features: ['按心情分：开心、难过、生气等等', 'kaomoji和ASCII表情', '点一下立刻复制', '记住你用过的'],
    },
    replace: {
      title: '查找替换', desc: '把长文里的某个词一次全换掉', category: '整理',
      metaTitle: '在线查找替换 — 批量替换，支持正则',
      long: '名字或术语改了，不必一处一处地改。区分大小写和正则表达式都可以打开，动手之前还会先数出有多少处会被改。',
      features: ['替换前先数出匹配数', '大小写敏感开关', '支持正则表达式', '能替换换行（\\\\n）和制表符'],
    },
    manuscript: {
      title: '字数统计', desc: '数字数、字符数和页数，还能对上限', category: '计数',
      metaTitle: '字数统计 — 含空格与不含空格',
      long: '把文字贴进来，就能拿到词数、含空格和不含空格的字符数，还有大概几页。填上申请书或稿约给的上限，它会告诉你还剩多少。',
      features: ['词数、含空格与不含空格的字符数', '估算页数和阅读时间', '对着上限算还剩多少', '字节数（给上传限制用）'],
    },
    lorem: {
      title: 'Lorem Ipsum 生成器', desc: '用来填版面的占位文字', category: '计数',
      metaTitle: 'Lorem Ipsum 生成器 — 任意长度的占位文字',
      long: '做设计或做界面时需要的填充文字，这里生成。可以定几段、每段多长，也能裁到刚好的字符数，正好塞进你要试的那个框。',
      features: ['经典的拉丁文lorem ipsum', '设定段数和每段长度', '裁到精确的字符数', '一次复制全部结果'],
    },
    mask: {
      title: "个人信息遮蔽", desc: "一次遮住姓名、电话和证件号", category: "整理",
      metaTitle: "个人信息遮蔽 — 一次遮住姓名、电话与证件号码",
      long: "把含有姓名、电话、证件号码、卡号和邮箱的文字粘贴进来，一次全部遮住。末尾几位保留，仍能分辨是哪一条记录，结果可以直接截图分享。全部在浏览器里完成，不会发送到服务器。",
      features: ["姓名、电话、证件、卡号、邮箱一次搞定", "保留末尾几位，记录仍可分辨", "每一类都能单独开关", "可选遮蔽字符（* ● ■ X）"],
    },
    wrap: {
      title: "重排换行", desc: "按宽度换行，或把断开的行接起来", category: "整理",
      metaTitle: "重排换行 — 按宽度换行或把断开的行接起来",
      long: "从 PDF 或邮件里复制的文字常在段落中间断行。这里可以把这些行重新接成段落，也可以反过来按固定字数换行。段落之间的空行会保留，所以段落结构不会丢失。",
      features: ["把断开的行接回段落", "按 40、60、80、100 字换行", "从不把词从中间切开", "保留段落之间的空行"],
    },
    table: {
      title: "表格生成器", desc: "把粘贴的数据变成 Markdown、CSV 或 HTML 表格", category: "整理",
      metaTitle: "表格生成器 — 把表格软件的数据粘贴成 Markdown、CSV 或 HTML",
      long: "把从表格软件里复制的行粘贴进来，就会变成 Markdown 表格、CSV、TSV 或 HTML 表格。它会自己判断列是用什么分隔的；当各行单元格数量不同时，会补齐较短的行，表格不会散掉。",
      features: ["输出 Markdown、CSV、TSV 和 HTML", "自动识别分隔符（制表符、逗号、空格）", "补齐短行，表格不会错位", "可选把各列补到同宽"],
    },
    slug: {
      title: "别名生成器", desc: "把标题变成能放进网址的形式", category: "整理",
      metaTitle: "别名生成器 — 把文章标题变成干净的网址别名",
      long: "把文章标题变成能放进网址的形式。韩文转写为拉丁字母，空格和标点变成连字符，连续的以及首尾的连字符都会清理掉。限制长度时会在词的边界处切开，而不是切在词中间。",
      features: ["把韩文转写成拉丁字母", "连字符或下划线作分隔", "去掉重音符号（café → cafe）", "长度限制在词边界处切开"],
    },
    reverse: {
      title: "文字倒转", desc: "按字符、词或行倒转文字", category: "符号",
      metaTitle: "文字倒转 — 按字符、词或行把文字反过来",
      long: "把文字倒过来。可以按字符、按词或按行倒转。字符按码点处理，所以表情符号和组合符号不会被切成两半——倒转两次会精确回到原样。",
      features: ["三种单位：字符、词、行", "表情符号不会损坏", "多行时每行单独倒转", "一键复制结果"],
    },
    vertical: {
      title: "竖排转换", desc: "把横排文字一个字一行地立起来", category: "符号",
      metaTitle: "竖排转换 — 把横排文字变成竖排的列",
      long: "把横排文字一个字一个字地立起来。输入多行时，每一行成为一列竖排；也可以按从右到左的传统顺序排列。长度不同的列会补空格，所以各行绝不会错位。",
      features: ["一行一个字，竖着立起来", "多行变成并排的竖列", "从右到左（传统顺序）", "列间空格可调"],
    },
    qr: {
      title: "二维码生成器", desc: "把网址、Wi-Fi、名片做成二维码", category: "符号",
      metaTitle: "二维码生成器 — Wi-Fi、网址、名片、短信，免费",
      long: "把网址、Wi-Fi的连接信息、名片、短信或地图坐标做成二维码。编码在浏览器里完成，所以你输入的Wi-Fi密码不会离开这一页，结果可以存成SVG或PNG。内容装不下时不会悄悄截断，而是告诉你超出了多少 — 截断的二维码看起来没问题，却什么都扫不出来。",
      features: ["Wi-Fi、名片、邮件、短信、地图格式", "纠错等级 L、M、Q、H", "存成SVG，打印也清晰", "颜色、边距、格子大小都可调"],
    },
  },
  'zh-hant': {
    clean: {
      title: '文字清理', desc: '把貼進來的文字裡亂掉的空格和換行理乾淨', category: '整理',
      metaTitle: '文字清理 — 刪掉看不見的字元、修好斷行',
      long: '從PDF或網頁複製出來的文字，帶著看不見的字元、看起來正常其實不是的空格，還有句子中間斷掉的換行。這裡一次全清掉，並告訴你每種各刪了多少。',
      features: ['刪掉看不見的字元和怪空格', '把句子中間的換行接回去', '把重複的空格和空行併成一個', '智慧引號換成直引號'],
    },
    dedupe: {
      title: '刪除重複行', desc: '把清單裡重複的行去掉再排序', category: '整理',
      metaTitle: '刪除重複行 — 線上去重並排序清單',
      long: '貼一份清單進來，它會去掉重複的行，再把剩下的按字母排好。要不要把「只差首尾空格」或「只差大小寫」的行當成同一行，可以自己選 — 真實的清單就是需要這個。',
      features: ['去掉重複（並顯示刪了幾行）', '按A→Z或Z→A排序', '忽略空格或大小寫', '刪掉空行、加上行號'],
    },
    case: {
      title: '大小寫轉換', desc: '把文字轉成任何一種大小寫寫法', category: '整理',
      metaTitle: '大小寫轉換 — UPPERCASE、lowercase、Title Case、camelCase',
      long: '轉成全大寫、全小寫或標題式大寫，也能轉成camelCase、snake_case、kebab-case這些開發上的寫法。每一種結果都能單獨複製。',
      features: ['UPPERCASE、lowercase、Title Case', '句首大寫', 'camelCase、snake_case、kebab-case', '每一種單獨複製'],
    },
    'special-char': {
      title: '特殊符號', desc: '點一下箭頭、圖形或符號就複製', category: '符號',
      metaTitle: '特殊符號 — 複製箭頭、圖形和各種符號',
      long: '箭頭（→ ⇒）、圖形（★ ◆ ▶）、標點（※ 「」）、數學和單位（㎡ ℃ ±）、貨幣（€ ¥）還有帶圈字元（① ㉠）— 點哪個就複製哪個。不用再到處找鍵盤打不出來的符號了。',
      features: ['按類別分好的符號', '點一下立刻複製', '按名字搜', '記住你用過的'],
    },
    emoticon: {
      title: '顏文字', desc: '複製 (╯°□°）╯ 這類顏文字', category: '符號',
      metaTitle: '顏文字 — 複製kaomoji和ASCII表情',
      long: '純用字元搭出來的表情 — ¯\\\\_(ツ)_/¯、(╯°□°）╯、ಠ_ಠ — 按心情收好了。因為是文字不是圖片，貼到哪兒都不會壞，使用者名稱和狀態欄裡也能用。',
      features: ['按心情分：開心、難過、生氣等等', 'kaomoji和ASCII表情', '點一下立刻複製', '記住你用過的'],
    },
    replace: {
      title: '尋找取代', desc: '把長文裡的某個詞一次全換掉', category: '整理',
      metaTitle: '線上尋找取代 — 批次取代，支援正規表示式',
      long: '名字或術語改了，不必一處一處地改。區分大小寫和正規表示式都可以打開，動手之前還會先數出有多少處會被改。',
      features: ['取代前先數出符合數', '大小寫敏感開關', '支援正規表示式', '能取代換行（\\\\n）和定位字元'],
    },
    manuscript: {
      title: '字數統計', desc: '數字數、字元數和頁數，還能對上限', category: '計數',
      metaTitle: '字數統計 — 含空格與不含空格',
      long: '把文字貼進來，就能拿到詞數、含空格和不含空格的字元數，還有大概幾頁。填上申請書或稿約給的上限，它會告訴你還剩多少。',
      features: ['詞數、含空格與不含空格的字元數', '估算頁數和閱讀時間', '對著上限算還剩多少', '位元組數（給上傳限制用）'],
    },
    lorem: {
      title: 'Lorem Ipsum 產生器', desc: '用來填版面的佔位文字', category: '計數',
      metaTitle: 'Lorem Ipsum 產生器 — 任意長度的佔位文字',
      long: '做設計或做介面時需要的填充文字，這裡產生。可以定幾段、每段多長，也能裁到剛好的字元數，正好塞進你要試的那個框。',
      features: ['經典的拉丁文lorem ipsum', '設定段數和每段長度', '裁到精確的字元數', '一次複製全部結果'],
    },
    mask: {
      title: "個人資料遮蔽", desc: "一次遮住姓名、電話與證件號", category: "整理",
      metaTitle: "個人資料遮蔽 — 一次遮住姓名、電話與證件號碼",
      long: "把含有姓名、電話、證件號碼、卡號與電子郵件的文字貼上，一次全部遮住。末尾幾位保留，仍能分辨是哪一筆紀錄，結果可以直接截圖分享。全部在瀏覽器裡完成，不會送到伺服器。",
      features: ["姓名、電話、證件、卡號、郵件一次搞定", "保留末尾幾位，紀錄仍可分辨", "每一類都能單獨開關", "可選遮蔽字元（* ● ■ X）"],
    },
    wrap: {
      title: "重排換行", desc: "按寬度換行，或把斷開的行接起來", category: "整理",
      metaTitle: "重排換行 — 按寬度換行或把斷開的行接起來",
      long: "從 PDF 或郵件裡複製的文字常在段落中間斷行。這裡可以把這些行重新接成段落，也可以反過來按固定字數換行。段落之間的空行會保留，所以段落結構不會遺失。",
      features: ["把斷開的行接回段落", "按 40、60、80、100 字換行", "從不把詞從中間切開", "保留段落之間的空行"],
    },
    table: {
      title: "表格產生器", desc: "把貼上的資料變成 Markdown、CSV 或 HTML 表格", category: "整理",
      metaTitle: "表格產生器 — 把試算表資料貼成 Markdown、CSV 或 HTML",
      long: "把從試算表裡複製的列貼上，就會變成 Markdown 表格、CSV、TSV 或 HTML 表格。它會自己判斷欄是用什麼分隔的；當各列儲存格數量不同時，會補齊較短的列，表格不會散掉。",
      features: ["輸出 Markdown、CSV、TSV 與 HTML", "自動辨識分隔符（定位字元、逗號、空格）", "補齊短列，表格不會錯位", "可選把各欄補到同寬"],
    },
    slug: {
      title: "別名產生器", desc: "把標題變成能放進網址的形式", category: "整理",
      metaTitle: "別名產生器 — 把文章標題變成乾淨的網址別名",
      long: "把文章標題變成能放進網址的形式。韓文轉寫為拉丁字母，空格和標點變成連字號，連續的以及首尾的連字號都會清理掉。限制長度時會在詞的邊界處切開，而不是切在詞中間。",
      features: ["把韓文轉寫成拉丁字母", "連字號或底線作分隔", "去掉重音符號（café → cafe）", "長度限制在詞邊界處切開"],
    },
    reverse: {
      title: "文字倒轉", desc: "按字元、詞或行倒轉文字", category: "符號",
      metaTitle: "文字倒轉 — 按字元、詞或行把文字反過來",
      long: "把文字倒過來。可以按字元、按詞或按行倒轉。字元按碼位處理，所以表情符號和組合符號不會被切成兩半——倒轉兩次會精確回到原樣。",
      features: ["三種單位：字元、詞、行", "表情符號不會損壞", "多行時每行單獨倒轉", "一鍵複製結果"],
    },
    vertical: {
      title: "直排轉換", desc: "把橫排文字一個字一行地立起來", category: "符號",
      metaTitle: "直排轉換 — 把橫排文字變成直排的欄",
      long: "把橫排文字一個字一個字地立起來。輸入多列時，每一列成為一欄直排；也可以按從右到左的傳統順序排列。長度不同的欄會補空格，所以各列絕不會錯位。",
      features: ["一列一個字，直著立起來", "多列變成並排的直欄", "從右到左（傳統順序）", "欄間空格可調"],
    },
    qr: {
      title: "QR Code 產生器", desc: "把網址、Wi-Fi、名片做成 QR Code", category: "符號",
      metaTitle: "QR Code 產生器 — Wi-Fi、網址、名片、簡訊，免費",
      long: "把網址、Wi-Fi 的連線資訊、名片、簡訊或地圖座標做成 QR Code。編碼在瀏覽器裡完成，所以你輸入的 Wi-Fi 密碼不會離開這一頁，結果可以存成 SVG 或 PNG。內容裝不下時不會悄悄截斷，而是告訴你超出了多少 — 截斷的 QR Code 看起來沒問題，卻什麼都掃不出來。",
      features: ["Wi-Fi、名片、郵件、簡訊、地圖格式", "錯誤修正等級 L、M、Q、H", "存成SVG，列印也清晰", "顏色、邊框、格子大小都可調"],
    },
  },
};

/** 언어별 분류 순서. 여기 문자열은 위 category와 글자까지 같아야 한다 */
export const TEXT_CATEGORY_ORDER: Record<TextIntlLang, string[]> = {
  en: ['Clean up', 'Counting', 'Symbols'],
  es: ['Limpiar', 'Contar', 'Símbolos'],
  'pt-br': ['Limpar', 'Contar', 'Símbolos'],
  ja: ['整える', '数える', '記号'],
  de: ['Aufräumen', 'Zählen', 'Zeichen'],
  fr: ['Nettoyer', 'Compter', 'Symboles'],
  hi: ['सफ़ाई', 'गिनती', 'चिह्न'],
  'zh-hans': ['整理', '计数', '符号'],
  'zh-hant': ['整理', '計數', '符號'],
};

/** 언어별 도구 목록 — 한글 전용 네 개는 빠진다 */
export function textToolsIntl(lang: TextIntlLang): TextTool[] {
  return TEXT_TOOLS
    .filter(t => (TEXT_INTL_SLUGS as readonly string[]).includes(t.slug))
    .map(t => ({ ...t, ...COPY[lang][t.slug] }));
}

export function findTextToolIntl(lang: TextIntlLang, slug: string): TextTool | undefined {
  return textToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedTextToolsIntl(lang: TextIntlLang, slug: string, count = 4): TextTool[] {
  /*
   * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
   * 전에는 `[...same, ...rest].slice(0, count)`였고, 그러면 갈래의 앞에서
   * 넉 개만 뽑혀 뒤쪽 도구에 **들어오는 링크가 0**이 됐다 — 여덟 섹션에서
   * 열두 도구가 그 상태였고 열 언어이므로 120쪽이었다.
   */
  return relatedBySlug(textToolsIntl(lang), slug, count, (a, b) => a.category === b.category);
}

/** 라우트가 그대로 쓰는 메타데이터 — 문구를 라이브러리 한 곳에만 둔다 */
export function textMetaIntl(lang: TextIntlLang, slug: string) {
  const t = findTextToolIntl(lang, slug);
  if (!t) throw new Error(`text-tools-intl: 도구가 없다 — ${slug}`);
  return withCard({
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/text/${slug}`),
      languages: alternateLanguages10(`/text/${slug}`),
    },
  });
}

export function textHubMetaIntl(lang: TextIntlLang) {
  const ui = TEXT_SHELL_UI[lang];
  return withCard({
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/text'),
      languages: alternateLanguages10('/text'),
    },
  });
}

/** 셸·허브 UI 문구 */
export const TEXT_SHELL_UI: Record<TextIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Text tools',
    canDo: 'What this tool does', others: 'Other text tools',
    notice: '📝 Your text is processed in the browser. Nothing is uploaded.',
    footNote: 'Nothing you paste here leaves the page, so drafts and personal notes are safe.',
    hubTitle: 'Text Tools — Clean Up, Dedupe, Case Convert, Count',
    hubDesc: 'Free text tools in your browser: clean up pasted text, remove duplicate lines, convert case, find and replace, count words and characters, copy special characters and kaomoji, generate lorem ipsum.',
    hubLead: 'Everything is processed in the browser — nothing you paste leaves the page.',
    hubFoot: 'Free text tools', eyebrow: 'Text',
  },
  es: {
    home: 'Inicio', section: 'Herramientas de texto',
    canDo: 'Qué hace esta herramienta', others: 'Otras herramientas de texto',
    notice: '📝 Tu texto se procesa en el navegador. No se sube nada.',
    footNote: 'Nada de lo que pegues aquí sale de la página, así que los borradores y las notas personales están seguros.',
    hubTitle: 'Herramientas de texto — Limpiar, deduplicar, cambiar mayúsculas, contar',
    hubDesc: 'Herramientas de texto gratis en tu navegador: limpiar texto pegado, quitar líneas duplicadas, convertir mayúsculas, buscar y reemplazar, contar palabras y caracteres, copiar caracteres especiales y kaomoji, generar lorem ipsum.',
    hubLead: 'Todo se procesa en el navegador — nada de lo que pegues sale de la página.',
    hubFoot: 'Herramientas de texto gratis', eyebrow: 'Texto',
  },
  'pt-br': {
    home: 'Início', section: 'Ferramentas de texto',
    canDo: 'O que esta ferramenta faz', others: 'Outras ferramentas de texto',
    notice: '📝 Seu texto é processado no navegador. Nada é enviado.',
    footNote: 'Nada do que você colar aqui sai da página, então rascunhos e anotações pessoais ficam seguros.',
    hubTitle: 'Ferramentas de texto — Limpar, deduplicar, mudar maiúsculas, contar',
    hubDesc: 'Ferramentas de texto grátis no navegador: limpar texto colado, remover linhas duplicadas, converter maiúsculas, localizar e substituir, contar palavras e caracteres, copiar caracteres especiais e kaomoji, gerar lorem ipsum.',
    hubLead: 'Tudo é processado no navegador — nada do que você colar sai da página.',
    hubFoot: 'Ferramentas de texto grátis', eyebrow: 'Texto',
  },
  ja: {
    home: 'ホーム', section: 'テキストツール',
    canDo: 'このツールでできること', others: 'ほかのテキストツール',
    notice: '📝 文章はブラウザの中で処理されます。アップロードはありません。',
    footNote: 'ここに貼った文章はページの外に出ないので、下書きや個人的なメモでも安心して使えます。',
    hubTitle: 'テキストツール — 整形・重複削除・大文字小文字・文字数',
    hubDesc: 'ブラウザで動く無料のテキストツール：貼り付けた文章の整形、重複行の削除、大文字小文字変換、検索と置換、文字数カウント、特殊記号と顔文字のコピー、ダミーテキスト生成。',
    hubLead: 'すべてブラウザの中で処理され、貼った文章はページの外に出ません。',
    hubFoot: '無料のテキストツール', eyebrow: 'Text',
  },
  de: {
    home: 'Start', section: 'Textwerkzeuge',
    canDo: 'Was dieses Werkzeug macht', others: 'Weitere Textwerkzeuge',
    notice: '📝 Dein Text wird im Browser verarbeitet. Es wird nichts hochgeladen.',
    footNote: 'Nichts, was du hier einfügst, verlässt die Seite — Entwürfe und persönliche Notizen sind also sicher.',
    hubTitle: 'Textwerkzeuge — Aufräumen, Entdoppeln, Schreibweise, Zählen',
    hubDesc: 'Kostenlose Textwerkzeuge im Browser: eingefügten Text aufräumen, doppelte Zeilen entfernen, Schreibweise umwandeln, suchen und ersetzen, Wörter und Zeichen zählen, Sonderzeichen und Kaomoji kopieren, Lorem ipsum erzeugen.',
    hubLead: 'Alles wird im Browser verarbeitet — nichts, was du einfügst, verlässt die Seite.',
    hubFoot: 'Kostenlose Textwerkzeuge', eyebrow: 'Text',
  },
  fr: {
    home: 'Accueil', section: 'Outils de texte',
    canDo: 'Ce que fait cet outil', others: 'Autres outils de texte',
    notice: '📝 Ton texte est traité dans le navigateur. Rien n’est envoyé.',
    footNote: 'Rien de ce que tu colles ici ne quitte la page : brouillons et notes personnelles sont en sécurité.',
    hubTitle: 'Outils de texte — Nettoyer, dédoublonner, changer la casse, compter',
    hubDesc: 'Outils de texte gratuits dans le navigateur : nettoyer un texte collé, supprimer les lignes en double, convertir la casse, rechercher et remplacer, compter mots et caractères, copier caractères spéciaux et kaomoji, générer du lorem ipsum.',
    hubLead: 'Tout est traité dans le navigateur — rien de ce que tu colles ne quitte la page.',
    hubFoot: 'Outils de texte gratuits', eyebrow: 'Texte',
  },
  hi: {
    home: 'होम', section: 'टेक्स्ट उपकरण',
    canDo: 'यह उपकरण क्या करता है', others: 'अन्य टेक्स्ट उपकरण',
    notice: '📝 आपका पाठ ब्राउज़र में ही प्रोसेस होता है। कुछ अपलोड नहीं होता।',
    footNote: 'यहाँ चिपकाया कुछ भी पन्ने से बाहर नहीं जाता, इसलिए मसौदे और निजी नोट सुरक्षित हैं।',
    hubTitle: 'टेक्स्ट उपकरण — सफ़ाई, दोहराव हटाना, अक्षर-आकार, गिनती',
    hubDesc: 'ब्राउज़र में मुफ़्त टेक्स्ट उपकरण: चिपकाया पाठ साफ़ करना, दोहराई पंक्तियाँ हटाना, अक्षर-आकार बदलना, खोजें और बदलें, शब्द-अक्षर गिनना, विशेष चिह्न और काओमोजी कॉपी करना, लोरेम इप्सम बनाना।',
    hubLead: 'सब कुछ ब्राउज़र में प्रोसेस होता है — चिपकाया पाठ पन्ने से बाहर नहीं जाता।',
    hubFoot: 'मुफ़्त टेक्स्ट उपकरण', eyebrow: 'टेक्स्ट',
  },
  'zh-hans': {
    home: '首页',
    section: '文本工具',
    canDo: '这个工具做什么',
    others: '其他文本工具',
    notice: '📝 文字在浏览器里处理，什么都不上传。',
    footNote: '贴进来的东西不会离开这一页，草稿和私人笔记放这里是安全的。',
    hubTitle: '文本工具 — 清理、去重、大小写转换、字数统计',
    hubDesc: '浏览器里的免费文本工具：清理贴进来的文字、删除重复行、转换大小写、查找替换、统计字数和字符数、复制特殊符号和颜文字、生成lorem ipsum。',
    hubLead: '全部在浏览器里处理 — 你贴进来的东西不会离开这一页。',
    hubFoot: '免费文本工具',
    eyebrow: '文本',
  },
  'zh-hant': {
    home: '首頁',
    section: '文字工具',
    canDo: '這個工具做什麼',
    others: '其他文字工具',
    notice: '📝 文字在瀏覽器裡處理，什麼都不上傳。',
    footNote: '貼進來的東西不會離開這一頁，草稿和私人筆記放這裡是安全的。',
    hubTitle: '文字工具 — 清理、去重、大小寫轉換、字數統計',
    hubDesc: '瀏覽器裡的免費文字工具：清理貼進來的文字、刪除重複行、轉換大小寫、尋找取代、統計字數和字元數、複製特殊符號和顏文字、產生lorem ipsum。',
    hubLead: '全部在瀏覽器裡處理 — 你貼進來的東西不會離開這一頁。',
    hubFoot: '免費文字工具',
    eyebrow: '文字',
  },
};
