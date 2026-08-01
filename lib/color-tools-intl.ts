// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ColorTool } from './color-tools.ts';
import { COLOR_TOOLS } from './color-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type IntlLocale } from './locales.ts';

/**
 * 색상 도구(/color) 섹션의 번역 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는 문구만 여기서 갈아 끼운다.
 * slug를 공유해야 hreflang이 여러 언어를 짝지을 수 있고, 번역이 없는 slug는
 * 한국어로 폴백해 화면이 깨지지 않는다.
 *
 * 번역이 아니라 그 언어로 새로 쓴다. 검색어가 언어마다 다르기 때문이다 —
 * 영어권은 'colour palette generator'로 찾고 독일어권은 'Farbpalette Generator'로
 * 찾는다. 직역하면 어느 쪽 검색어에도 걸리지 않는 문장이 나온다.
 */
/**
 * 색상 도구 허브가 쓰는 언어 — 공용 IntlLocale에 중국어 둘을 더한다.
 * IntlLocale 자체를 넓히지 않는 이유는 lib/food-tools-intl.ts에 적어 두었다.
 */
export type ColorIntlLang = IntlLocale | 'zh-hans' | 'zh-hant';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<ColorIntlLang, Record<string, ToolCopy>> = {
  en: {
    palette: {
      title: 'Colour Palette Generator', desc: 'Pull colours that work with a base colour, by rule', category: 'Palette',
      metaTitle: 'Colour Palette Generator — Build Matching Colour Schemes',
      long: 'Pick one colour and it derives the colours that go with it using colour-wheel rules — complementary, analogous, triadic. Choosing by rule rather than by eye keeps a scheme from going badly wrong.',
      features: ['Complementary, analogous, triadic and tetradic', 'Monochrome lightness steps', 'Copy any HEX', 'Copy the whole palette as CSS'],
    },
    shades: {
      title: 'Colour Shades Generator', desc: 'Turn one colour into a 50–900 scale', category: 'Palette',
      metaTitle: 'Colour Shades Generator — 50 to 900 Scale From One Colour',
      long: 'Give it one brand colour and it builds ten steps, lighter (tints) and darker (shades). The output comes out in the 50 · 100 · … · 900 form that Tailwind and most design systems expect.',
      features: ['Ten steps from 50 to 900', 'HEX and HSL per step', 'Marks whether white or black text reads', 'Copy the set as CSS variables'],
    },
    mixer: {
      title: 'Colour Mixer', desc: 'Find the colour between two colours', category: 'Palette',
      metaTitle: 'Colour Mixer — Blend Two Colours and Find the Midpoint',
      long: 'Set two colours and move the ratio to get what sits between them. Useful for pulling the colour at a specific point in a gradient, or finding a middle tone between two brand colours.',
      features: ['Ratio slider for the blend', 'See several intermediate steps at once', 'Copy HEX or RGB', 'Check contrast of the blend'],
    },
    random: {
      title: 'Random Colour Generator', desc: 'Lock the ones you like, reroll the rest', category: 'Palette',
      metaTitle: 'Random Colour Generator — Reroll a Palette With Locks',
      long: 'Generates five random colours. Lock the ones you like and reroll only the rest, so you can spin through combinations quickly until something works.',
      features: ['Five colours at a time', 'Lock the ones you want to keep', 'Saturation kept in a usable range', 'Copy all HEX values at once'],
    },
    contrast: {
      title: 'Colour Contrast Checker', desc: 'Check text legibility against WCAG', category: 'Accessibility',
      metaTitle: 'Colour Contrast Checker — WCAG AA and AAA Ratio',
      long: 'Calculates the contrast ratio between a background and a text colour and tells you whether it passes the web accessibility thresholds (WCAG AA and AAA), with a live text preview so you can judge it by eye too.',
      features: ['Contrast ratio from 1 to 21', 'AA and AAA pass or fail', 'Separate verdict for large text', 'Auto-adjust lightness until it passes'],
    },
    colorblind: {
      title: 'Colour Blindness Simulator', desc: 'How a colour looks with colour vision deficiency', category: 'Accessibility',
      metaTitle: 'Colour Blindness Simulator — Preview Protanopia, Deuteranopia and More',
      long: 'Converts your colours to show how they appear to someone with protanopia, deuteranopia, tritanopia or full colour blindness. It makes immediately obvious why a screen that distinguishes states using only red and green is a problem.',
      features: ['Four types of colour vision deficiency', 'Side-by-side check of whether two colours separate', 'Simulate a whole palette', 'Contrast shown alongside'],
    },
    gradient: {
      title: 'CSS Gradient Generator', desc: 'Build a CSS gradient from two or three colours', category: 'CSS',
      metaTitle: 'CSS Gradient Generator — linear-gradient Code',
      long: 'Set the colours and the angle and it writes the CSS linear-gradient for you. Move the colour stops to control where the transition happens, and paste the result straight in.',
      features: ['Two or three colours with stop positions', 'Angle or radial', 'Copy the CSS immediately', 'Tailwind class guidance'],
    },
    shadow: {
      title: 'CSS Box Shadow Generator', desc: 'Adjust box-shadow while watching the result', category: 'CSS',
      metaTitle: 'CSS Box Shadow Generator — Live Preview and Code',
      long: 'Adjust offset, blur, spread, colour and opacity while seeing the result, then take the CSS. Includes presets that layer several shadows for a more natural sense of depth.',
      features: ['Offset, blur, spread and colour', 'Inset shadows supported', 'Natural multi-layer presets', 'Copy the CSS'],
    },
    name: {
      title: 'Colour Name Finder', desc: 'What is the closest name to this colour', category: 'Convert',
      metaTitle: 'Colour Name Finder — Nearest Named Colour to Any HEX',
      long: 'Enter a colour code and it finds the closest named colour — coral, teal, crimson — and shows HEX, RGB, HSL and CMYK together. For when you have to describe a colour in words.',
      features: ['Nearest named colour', 'HEX, RGB, HSL and CMYK at once', 'Shows the difference from the named colour', 'Copy each value separately'],
    },
    temperature: {
      title: 'Colour Temperature Converter', desc: 'See what a Kelvin value actually looks like', category: 'Convert',
      metaTitle: 'Colour Temperature Converter — Kelvin to RGB',
      long: 'See what 2700K warm white actually looks like, and how blue 6500K daylight really is. Useful when choosing lighting or getting a feel for white balance in photography.',
      features: ['1000K to 12000K slider', 'Warm, neutral and daylight presets', 'RGB and HEX values', 'Compare two temperatures side by side'],
    },
  },

  es: {
    palette: {
      title: 'Generador de paletas de colores', desc: 'Saca los colores que combinan con uno base, por regla', category: 'Paleta',
      metaTitle: 'Generador de paletas de colores — Crea combinaciones que funcionan',
      long: 'Elige un color y deduce los que combinan con él según las reglas del círculo cromático: complementarios, análogos, tríada. Elegir por regla en vez de a ojo evita que una combinación se vaya de las manos.',
      features: ['Complementarios, análogos, tríada y tétrada', 'Escala monocroma de luminosidad', 'Copia cualquier HEX', 'Copia la paleta completa como CSS'],
    },
    shades: {
      title: 'Generador de tonos de color', desc: 'Convierte un color en una escala 50–900', category: 'Paleta',
      metaTitle: 'Generador de tonos — Escala 50 a 900 desde un solo color',
      long: 'Dale un color de marca y construye diez pasos, más claros (tintes) y más oscuros (sombras). La salida viene en la forma 50 · 100 · … · 900 que esperan Tailwind y la mayoría de sistemas de diseño.',
      features: ['Diez pasos del 50 al 900', 'HEX y HSL en cada paso', 'Indica si se lee mejor texto blanco o negro', 'Copia el conjunto como variables CSS'],
    },
    mixer: {
      title: 'Mezclador de colores', desc: 'Encuentra el color que está entre dos', category: 'Paleta',
      metaTitle: 'Mezclador de colores — Combina dos colores y halla el punto medio',
      long: 'Fija dos colores y mueve la proporción para obtener lo que hay entre ellos. Útil para sacar el color de un punto concreto de un degradado, o para hallar un tono intermedio entre dos colores de marca.',
      features: ['Control de proporción de la mezcla', 'Varios pasos intermedios a la vez', 'Copia HEX o RGB', 'Comprueba el contraste de la mezcla'],
    },
    random: {
      title: 'Generador de colores aleatorios', desc: 'Bloquea los que te gusten y vuelve a tirar el resto', category: 'Paleta',
      metaTitle: 'Generador de colores aleatorios — Vuelve a tirar con bloqueos',
      long: 'Genera cinco colores al azar. Bloquea los que te gusten y vuelve a tirar solo el resto, para recorrer combinaciones rápido hasta que alguna funcione.',
      features: ['Cinco colores por tirada', 'Bloquea los que quieras conservar', 'Saturación dentro de un rango usable', 'Copia todos los HEX de una vez'],
    },
    contrast: {
      title: 'Comprobador de contraste', desc: 'Comprueba la legibilidad del texto según WCAG', category: 'Accesibilidad',
      metaTitle: 'Comprobador de contraste de color — Ratio WCAG AA y AAA',
      long: 'Calcula la relación de contraste entre el fondo y el texto y te dice si supera los umbrales de accesibilidad web (WCAG AA y AAA), con una vista previa real para juzgarlo también a ojo.',
      features: ['Relación de contraste de 1 a 21', 'Aprueba o no en AA y AAA', 'Veredicto aparte para texto grande', 'Ajusta la luminosidad hasta que apruebe'],
    },
    colorblind: {
      title: 'Simulador de daltonismo', desc: 'Cómo se ve un color con deficiencia de visión cromática', category: 'Accesibilidad',
      metaTitle: 'Simulador de daltonismo — Protanopía, deuteranopía y más',
      long: 'Convierte tus colores para mostrar cómo los ve alguien con protanopía, deuteranopía, tritanopía o acromatopsia. Deja claro al instante por qué una pantalla que distingue estados solo con rojo y verde es un problema.',
      features: ['Cuatro tipos de deficiencia cromática', 'Comprueba si dos colores se distinguen', 'Simula una paleta completa', 'Muestra el contraste al lado'],
    },
    gradient: {
      title: 'Generador de degradados CSS', desc: 'Crea un degradado CSS con dos o tres colores', category: 'CSS',
      metaTitle: 'Generador de degradados CSS — Código linear-gradient',
      long: 'Fija los colores y el ángulo y te escribe el linear-gradient de CSS. Mueve las paradas de color para controlar dónde ocurre la transición y pega el resultado directamente.',
      features: ['Dos o tres colores con posición de parada', 'Angular o radial', 'Copia el CSS al momento', 'Referencia de clases Tailwind'],
    },
    shadow: {
      title: 'Generador de box-shadow CSS', desc: 'Ajusta la sombra viendo el resultado', category: 'CSS',
      metaTitle: 'Generador de box-shadow CSS — Vista previa y código',
      long: 'Ajusta desplazamiento, desenfoque, extensión, color y opacidad viendo el resultado, y llévate el CSS. Incluye ajustes que superponen varias sombras para una sensación de profundidad más natural.',
      features: ['Desplazamiento, desenfoque, extensión y color', 'Admite sombras interiores (inset)', 'Ajustes naturales de varias capas', 'Copia el CSS'],
    },
    name: {
      title: 'Buscador de nombres de color', desc: '¿Cuál es el nombre más cercano a este color?', category: 'Conversión',
      metaTitle: 'Nombre de color — El color con nombre más cercano a un HEX',
      long: 'Introduce un código de color y encuentra el color con nombre más cercano —coral, verde azulado, carmesí— y muestra HEX, RGB, HSL y CMYK juntos. Para cuando hay que describir un color con palabras.',
      features: ['Color con nombre más cercano', 'HEX, RGB, HSL y CMYK a la vez', 'Muestra la diferencia con ese color', 'Copia cada valor por separado'],
    },
    temperature: {
      title: 'Conversor de temperatura de color', desc: 'Mira qué aspecto tiene realmente un valor en kelvin', category: 'Conversión',
      metaTitle: 'Temperatura de color — Convertir kelvin a RGB',
      long: 'Mira qué aspecto tiene de verdad el blanco cálido de 2700 K y lo azul que es la luz de día de 6500 K. Útil al elegir iluminación o para hacerse una idea del balance de blancos en fotografía.',
      features: ['Control de 1000 K a 12000 K', 'Ajustes cálido, neutro y luz de día', 'Valores RGB y HEX', 'Compara dos temperaturas lado a lado'],
    },
  },

  'pt-br': {
    palette: {
      title: 'Gerador de paletas de cores', desc: 'Tire as cores que combinam com uma cor base, por regra', category: 'Paleta',
      metaTitle: 'Gerador de paletas de cores — Monte combinações que funcionam',
      long: 'Escolha uma cor e ele deduz as que combinam com ela pelas regras do círculo cromático: complementares, análogas, tríade. Escolher por regra em vez de no olho evita que a combinação saia errada.',
      features: ['Complementares, análogas, tríade e tétrade', 'Escala monocromática de luminosidade', 'Copie qualquer HEX', 'Copie a paleta inteira como CSS'],
    },
    shades: {
      title: 'Gerador de tons de cor', desc: 'Transforme uma cor numa escala 50–900', category: 'Paleta',
      metaTitle: 'Gerador de tons — Escala 50 a 900 a partir de uma cor',
      long: 'Dê uma cor de marca e ele monta dez degraus, mais claros (tints) e mais escuros (shades). A saída sai no formato 50 · 100 · … · 900 que o Tailwind e a maioria dos design systems esperam.',
      features: ['Dez degraus do 50 ao 900', 'HEX e HSL em cada degrau', 'Indica se lê melhor texto branco ou preto', 'Copie o conjunto como variáveis CSS'],
    },
    mixer: {
      title: 'Misturador de cores', desc: 'Encontre a cor que fica entre duas', category: 'Paleta',
      metaTitle: 'Misturador de cores — Misture duas cores e ache o meio',
      long: 'Defina duas cores e mova a proporção para obter o que fica entre elas. Útil para tirar a cor de um ponto específico de um gradiente, ou achar um tom intermediário entre duas cores de marca.',
      features: ['Controle de proporção da mistura', 'Vários degraus intermediários de uma vez', 'Copie HEX ou RGB', 'Verifique o contraste da mistura'],
    },
    random: {
      title: 'Gerador de cores aleatórias', desc: 'Trave as que você gostar e sorteie o resto de novo', category: 'Paleta',
      metaTitle: 'Gerador de cores aleatórias — Sorteie de novo com travas',
      long: 'Gera cinco cores aleatórias. Trave as que você gostar e sorteie só o resto, para percorrer combinações rápido até alguma funcionar.',
      features: ['Cinco cores por sorteio', 'Trave as que quiser manter', 'Saturação dentro de uma faixa usável', 'Copie todos os HEX de uma vez'],
    },
    contrast: {
      title: 'Verificador de contraste', desc: 'Verifique a legibilidade do texto pela WCAG', category: 'Acessibilidade',
      metaTitle: 'Verificador de contraste de cor — Razão WCAG AA e AAA',
      long: 'Calcula a razão de contraste entre o fundo e o texto e diz se passa dos limites de acessibilidade web (WCAG AA e AAA), com prévia de texto real para julgar também no olho.',
      features: ['Razão de contraste de 1 a 21', 'Passa ou não em AA e AAA', 'Veredito separado para texto grande', 'Ajusta a luminosidade até passar'],
    },
    colorblind: {
      title: 'Simulador de daltonismo', desc: 'Como uma cor aparece para quem tem deficiência de visão de cores', category: 'Acessibilidade',
      metaTitle: 'Simulador de daltonismo — Protanopia, deuteranopia e mais',
      long: 'Converte suas cores para mostrar como elas aparecem para quem tem protanopia, deuteranopia, tritanopia ou acromatopsia. Fica óbvio na hora por que uma tela que distingue estados só com vermelho e verde é um problema.',
      features: ['Quatro tipos de deficiência de visão de cores', 'Verifique se duas cores se separam', 'Simule uma paleta inteira', 'Contraste mostrado ao lado'],
    },
    gradient: {
      title: 'Gerador de gradiente CSS', desc: 'Monte um gradiente CSS com duas ou três cores', category: 'CSS',
      metaTitle: 'Gerador de gradiente CSS — Código linear-gradient',
      long: 'Defina as cores e o ângulo e ele escreve o linear-gradient do CSS. Mova as paradas de cor para controlar onde a transição acontece e cole o resultado direto.',
      features: ['Duas ou três cores com posição de parada', 'Angular ou radial', 'Copie o CSS na hora', 'Referência de classes Tailwind'],
    },
    shadow: {
      title: 'Gerador de box-shadow CSS', desc: 'Ajuste a sombra vendo o resultado', category: 'CSS',
      metaTitle: 'Gerador de box-shadow CSS — Prévia ao vivo e código',
      long: 'Ajuste deslocamento, desfoque, espalhamento, cor e opacidade vendo o resultado, e leve o CSS. Inclui presets que empilham várias sombras para uma sensação de profundidade mais natural.',
      features: ['Deslocamento, desfoque, espalhamento e cor', 'Suporta sombras internas (inset)', 'Presets naturais de várias camadas', 'Copie o CSS'],
    },
    name: {
      title: 'Buscador de nome de cor', desc: 'Qual é o nome mais próximo desta cor', category: 'Conversão',
      metaTitle: 'Nome de cor — A cor com nome mais próxima de um HEX',
      long: 'Digite um código de cor e ele acha a cor com nome mais próxima — coral, verde-azulado, carmim — e mostra HEX, RGB, HSL e CMYK juntos. Para quando você precisa descrever uma cor em palavras.',
      features: ['Cor com nome mais próxima', 'HEX, RGB, HSL e CMYK de uma vez', 'Mostra a diferença em relação a ela', 'Copie cada valor separadamente'],
    },
    temperature: {
      title: 'Conversor de temperatura de cor', desc: 'Veja como um valor em kelvin realmente aparece', category: 'Conversão',
      metaTitle: 'Temperatura de cor — Converter kelvin para RGB',
      long: 'Veja como o branco quente de 2700 K realmente aparece, e o quanto a luz do dia de 6500 K é azulada. Útil ao escolher iluminação ou para pegar o jeito do balanço de branco na fotografia.',
      features: ['Controle de 1000 K a 12000 K', 'Presets quente, neutro e luz do dia', 'Valores RGB e HEX', 'Compare duas temperaturas lado a lado'],
    },
  },

  ja: {
    palette: {
      title: 'カラーパレット作成', desc: '基準色に合う色を、色相環の規則で取り出す', category: 'パレット',
      metaTitle: 'カラーパレット作成 — 相性のいい配色を組む',
      long: '色を一つ選ぶと、補色・類似色・トライアドといった色相環の規則で合う色を導き出します。感覚ではなく規則で選ぶと、配色が大きく外れません。',
      features: ['補色・類似色・トライアド・テトラード', '同一色相の明度段階', 'HEXをその場でコピー', 'パレット全体をCSSでコピー'],
    },
    shades: {
      title: 'カラースケール生成', desc: '一色から50〜900の段階を作る', category: 'パレット',
      metaTitle: 'カラースケール生成 — 一色から50〜900の色段階',
      long: 'ブランドカラーを一つ渡すと、明るい側（tint）と暗い側（shade）に十段階を作ります。出力はTailwindや多くのデザインシステムが前提にしている 50・100・…・900 の形です。',
      features: ['50から900までの十段階', '各段階のHEXとHSL', '白文字と黒文字どちらが読めるか表示', 'CSS変数としてまとめてコピー'],
    },
    mixer: {
      title: 'カラーミキサー', desc: '二色のあいだの色を求める', category: 'パレット',
      metaTitle: 'カラーミキサー — 二色を混ぜて中間色を出す',
      long: '二色を決めて比率を動かすと、そのあいだの色が出ます。グラデーションの特定の位置の色を取り出したいときや、ブランドカラー二色の中間トーンを探すときに使えます。',
      features: ['比率スライダーで混色', '中間段階をまとめて確認', 'HEXまたはRGBをコピー', '混色後のコントラストも確認'],
    },
    random: {
      title: 'ランダム配色', desc: '気に入った色は固定して、残りを引き直す', category: 'パレット',
      metaTitle: 'ランダム配色 — 固定して引き直せる配色ガチャ',
      long: '五色をランダムに出します。気に入った色に鍵をかけて残りだけ引き直せるので、納得するまで組み合わせを素早く回せます。',
      features: ['一度に五色', '残したい色を固定', '彩度は使える範囲に収める', 'HEXをまとめてコピー'],
    },
    contrast: {
      title: 'コントラスト比チェック', desc: 'WCAG基準で文字の読みやすさを確認', category: 'アクセシビリティ',
      metaTitle: 'コントラスト比チェック — WCAG AA・AAA判定',
      long: '背景色と文字色のコントラスト比を計算し、ウェブアクセシビリティの基準（WCAG AA・AAA）を満たすかを判定します。実際の文字プレビューも出るので目でも確かめられます。',
      features: ['コントラスト比 1〜21', 'AA・AAAの合否', '大きい文字は別基準で判定', '合格するまで明度を自動調整'],
    },
    colorblind: {
      title: '色覚シミュレーター', desc: '色覚特性のある人にはどう見えるか', category: 'アクセシビリティ',
      metaTitle: '色覚シミュレーター — 1型・2型・3型色覚での見え方',
      long: '1型（P型）・2型（D型）・3型（T型）色覚、全色盲でどう見えるかに変換します。赤と緑だけで状態を区別する画面がなぜ問題なのか、その場で分かります。',
      features: ['四種類の色覚特性に変換', '二色が区別できるか並べて確認', 'パレット全体をまとめて変換', 'コントラスト比も併記'],
    },
    gradient: {
      title: 'CSSグラデーション生成', desc: '二〜三色からCSSのグラデーションを作る', category: 'CSS',
      metaTitle: 'CSSグラデーション生成 — linear-gradientのコード',
      long: '色と角度を決めるとCSSのlinear-gradientを書き出します。カラーストップを動かせば変化の位置も調整でき、そのまま貼り付けられます。',
      features: ['二〜三色とストップ位置', '角度指定またはradial', 'CSSをその場でコピー', 'Tailwindクラスの目安も表示'],
    },
    shadow: {
      title: 'CSS box-shadow生成', desc: '結果を見ながら影を調整する', category: 'CSS',
      metaTitle: 'CSS box-shadow生成 — プレビューとコード',
      long: 'オフセット・ぼかし・広がり・色・不透明度を見ながら調整して、CSSを持ち出せます。影を重ねて自然な奥行きを出すプリセットも入っています。',
      features: ['オフセット・ぼかし・広がり・色', 'inset（内側の影）対応', '多重影の自然なプリセット', 'CSSをコピー'],
    },
    name: {
      title: '色名を調べる', desc: 'この色にいちばん近い名前は何か', category: '変換',
      metaTitle: '色名を調べる — HEXにいちばん近い色名',
      long: 'カラーコードを入れると、いちばん近い色名（コーラル、ティール、クリムゾンなど）を探し、HEX・RGB・HSL・CMYKをまとめて表示します。色を言葉で伝えたいときに使えます。',
      features: ['いちばん近い色名', 'HEX・RGB・HSL・CMYKを同時に', 'その色名との差も表示', '各値を個別にコピー'],
    },
    temperature: {
      title: '色温度の変換', desc: 'ケルビン値が実際にどんな色か見る', category: '変換',
      metaTitle: '色温度の変換 — ケルビンからRGBへ',
      long: '2700Kの電球色が実際にどんな色か、6500Kの昼光色がどれだけ青いかを見られます。照明を選ぶときや、写真のホワイトバランスの感覚をつかむのに使えます。',
      features: ['1000K〜12000Kのスライダー', '電球色・中間・昼光色のプリセット', 'RGBとHEXの値', '二つの色温度を並べて比較'],
    },
  },

  de: {
    palette: {
      title: 'Farbpaletten-Generator', desc: 'Passende Farben zu einer Grundfarbe, nach Regel', category: 'Palette',
      metaTitle: 'Farbpaletten-Generator — Stimmige Farbschemata bauen',
      long: 'Wähle eine Farbe, und die passenden werden nach den Regeln des Farbkreises abgeleitet: Komplementär, analog, Triade. Nach Regel statt nach Gefühl zu wählen verhindert, dass ein Schema deutlich danebengeht.',
      features: ['Komplementär, analog, Triade und Tetrade', 'Monochrome Helligkeitsstufen', 'Jeden HEX-Wert kopieren', 'Ganze Palette als CSS kopieren'],
    },
    shades: {
      title: 'Farbabstufungen erzeugen', desc: 'Aus einer Farbe eine 50–900-Skala machen', category: 'Palette',
      metaTitle: 'Farbabstufungen — Skala 50 bis 900 aus einer Farbe',
      long: 'Gib eine Markenfarbe an, und es entstehen zehn Stufen, heller (Tints) und dunkler (Shades). Die Ausgabe kommt in der Form 50 · 100 · … · 900, die Tailwind und die meisten Designsysteme erwarten.',
      features: ['Zehn Stufen von 50 bis 900', 'HEX und HSL pro Stufe', 'Zeigt, ob weißer oder schwarzer Text lesbar ist', 'Satz als CSS-Variablen kopieren'],
    },
    mixer: {
      title: 'Farbmischer', desc: 'Die Farbe zwischen zwei Farben finden', category: 'Palette',
      metaTitle: 'Farbmischer — Zwei Farben mischen und die Mitte finden',
      long: 'Setze zwei Farben und verschiebe das Verhältnis, um zu sehen, was dazwischen liegt. Nützlich, um die Farbe an einer bestimmten Stelle eines Verlaufs zu greifen oder einen Mittelton zwischen zwei Markenfarben zu finden.',
      features: ['Regler für das Mischverhältnis', 'Mehrere Zwischenstufen auf einmal', 'HEX oder RGB kopieren', 'Kontrast der Mischung prüfen'],
    },
    random: {
      title: 'Zufallsfarben-Generator', desc: 'Gute Farben festhalten, den Rest neu würfeln', category: 'Palette',
      metaTitle: 'Zufallsfarben-Generator — Palette mit Sperren neu würfeln',
      long: 'Erzeugt fünf Zufallsfarben. Sperre die, die dir gefallen, und würfle nur den Rest neu — so kommst du schnell durch viele Kombinationen, bis eine passt.',
      features: ['Fünf Farben pro Durchgang', 'Farben zum Behalten sperren', 'Sättigung in nutzbarem Bereich', 'Alle HEX-Werte auf einmal kopieren'],
    },
    contrast: {
      title: 'Kontrast-Prüfer', desc: 'Lesbarkeit von Text nach WCAG prüfen', category: 'Barrierefreiheit',
      metaTitle: 'Farbkontrast prüfen — WCAG AA und AAA Verhältnis',
      long: 'Berechnet das Kontrastverhältnis zwischen Hintergrund- und Textfarbe und sagt, ob es die Schwellen der Web-Barrierefreiheit (WCAG AA und AAA) erreicht — mit echter Textvorschau, damit du es auch mit dem Auge beurteilen kannst.',
      features: ['Kontrastverhältnis von 1 bis 21', 'Bestanden oder nicht bei AA und AAA', 'Eigenes Urteil für große Schrift', 'Helligkeit automatisch anpassen, bis es passt'],
    },
    colorblind: {
      title: 'Farbenblindheit-Simulator', desc: 'Wie eine Farbe bei Farbfehlsichtigkeit aussieht', category: 'Barrierefreiheit',
      metaTitle: 'Farbenblindheit simulieren — Protanopie, Deuteranopie und mehr',
      long: 'Rechnet deine Farben so um, wie sie Menschen mit Protanopie, Deuteranopie, Tritanopie oder vollständiger Farbenblindheit sehen. Damit wird sofort deutlich, warum ein Interface, das Zustände nur über Rot und Grün trennt, ein Problem ist.',
      features: ['Vier Arten von Farbfehlsichtigkeit', 'Nebeneinander prüfen, ob zwei Farben trennbar sind', 'Ganze Palette simulieren', 'Kontrast wird mitangezeigt'],
    },
    gradient: {
      title: 'CSS-Gradient-Generator', desc: 'Einen CSS-Verlauf aus zwei oder drei Farben bauen', category: 'CSS',
      metaTitle: 'CSS-Gradient-Generator — linear-gradient Code',
      long: 'Setze Farben und Winkel, und der CSS-linear-gradient wird für dich geschrieben. Verschiebe die Farbstopps, um zu bestimmen, wo der Übergang passiert, und füge das Ergebnis direkt ein.',
      features: ['Zwei oder drei Farben mit Stopp-Position', 'Winkel oder radial', 'CSS sofort kopieren', 'Hinweise zu Tailwind-Klassen'],
    },
    shadow: {
      title: 'CSS-Box-Shadow-Generator', desc: 'Schatten einstellen und dabei zusehen', category: 'CSS',
      metaTitle: 'CSS-Box-Shadow-Generator — Live-Vorschau und Code',
      long: 'Stelle Versatz, Weichzeichnung, Ausbreitung, Farbe und Deckkraft ein, während du das Ergebnis siehst, und nimm das CSS mit. Enthält Vorlagen, die mehrere Schatten überlagern, für ein natürlicheres Tiefengefühl.',
      features: ['Versatz, Weichzeichnung, Ausbreitung und Farbe', 'Innenschatten (inset) möglich', 'Natürliche mehrlagige Vorlagen', 'CSS kopieren'],
    },
    name: {
      title: 'Farbnamen finden', desc: 'Welcher Name kommt dieser Farbe am nächsten', category: 'Umrechnung',
      metaTitle: 'Farbnamen finden — Nächstgelegener Farbname zu einem HEX',
      long: 'Gib einen Farbcode ein, und der nächstgelegene benannte Farbton wird gefunden — Koralle, Petrol, Karmesin — samt HEX, RGB, HSL und CMYK. Für den Fall, dass du eine Farbe in Worten beschreiben musst.',
      features: ['Nächstgelegener Farbname', 'HEX, RGB, HSL und CMYK zugleich', 'Zeigt den Abstand zu diesem Farbton', 'Jeden Wert einzeln kopieren'],
    },
    temperature: {
      title: 'Farbtemperatur umrechnen', desc: 'Sehen, wie ein Kelvin-Wert tatsächlich aussieht', category: 'Umrechnung',
      metaTitle: 'Farbtemperatur umrechnen — Kelvin zu RGB',
      long: 'Sieh, wie Warmweiß mit 2700 K wirklich aussieht und wie blau Tageslicht mit 6500 K tatsächlich ist. Nützlich bei der Wahl von Leuchtmitteln oder um ein Gefühl für den Weißabgleich in der Fotografie zu bekommen.',
      features: ['Regler von 1000 K bis 12000 K', 'Vorlagen für warm, neutral und Tageslicht', 'RGB- und HEX-Werte', 'Zwei Temperaturen nebeneinander vergleichen'],
    },
  },

  fr: {
    palette: {
      title: 'Générateur de palettes de couleurs', desc: 'Sortir les couleurs qui vont avec une couleur de base, par règle', category: 'Palette',
      metaTitle: 'Générateur de palettes — Construire des harmonies qui tiennent',
      long: 'Choisissez une couleur et les couleurs qui vont avec sont déduites selon les règles du cercle chromatique : complémentaires, analogues, triade. Choisir par règle plutôt qu’à l’œil évite qu’une harmonie parte franchement de travers.',
      features: ['Complémentaires, analogues, triade et tétrade', 'Paliers de luminosité monochromes', 'Copier n’importe quel HEX', 'Copier toute la palette en CSS'],
    },
    shades: {
      title: 'Générateur de nuances', desc: 'Transformer une couleur en échelle 50–900', category: 'Palette',
      metaTitle: 'Générateur de nuances — Échelle 50 à 900 depuis une couleur',
      long: 'Donnez une couleur de marque et dix paliers sont construits, plus clairs (teintes) et plus sombres (ombres). La sortie arrive sous la forme 50 · 100 · … · 900 qu’attendent Tailwind et la plupart des design systems.',
      features: ['Dix paliers de 50 à 900', 'HEX et HSL par palier', 'Indique si le texte blanc ou noir se lit', 'Copier l’ensemble en variables CSS'],
    },
    mixer: {
      title: 'Mélangeur de couleurs', desc: 'Trouver la couleur entre deux couleurs', category: 'Palette',
      metaTitle: 'Mélangeur de couleurs — Mélanger deux couleurs et trouver le milieu',
      long: 'Fixez deux couleurs et déplacez la proportion pour obtenir ce qui se trouve entre elles. Utile pour récupérer la couleur à un point précis d’un dégradé, ou trouver un ton intermédiaire entre deux couleurs de marque.',
      features: ['Curseur de proportion du mélange', 'Plusieurs paliers intermédiaires d’un coup', 'Copier en HEX ou RGB', 'Vérifier le contraste du mélange'],
    },
    random: {
      title: 'Générateur de couleurs aléatoires', desc: 'Verrouiller celles qui plaisent, relancer le reste', category: 'Palette',
      metaTitle: 'Couleurs aléatoires — Relancer une palette avec verrous',
      long: 'Génère cinq couleurs au hasard. Verrouillez celles qui vous plaisent et ne relancez que le reste, pour parcourir vite les combinaisons jusqu’à ce qu’une tienne.',
      features: ['Cinq couleurs à la fois', 'Verrouiller celles à garder', 'Saturation maintenue dans une plage utilisable', 'Copier tous les HEX d’un coup'],
    },
    contrast: {
      title: 'Vérificateur de contraste', desc: 'Vérifier la lisibilité du texte selon WCAG', category: 'Accessibilité',
      metaTitle: 'Contraste des couleurs — Ratio WCAG AA et AAA',
      long: 'Calcule le rapport de contraste entre le fond et le texte et indique s’il franchit les seuils d’accessibilité web (WCAG AA et AAA), avec un aperçu de texte réel pour juger aussi à l’œil.',
      features: ['Rapport de contraste de 1 à 21', 'Réussite ou échec en AA et AAA', 'Verdict distinct pour le grand texte', 'Ajuste la luminosité jusqu’à réussir'],
    },
    colorblind: {
      title: 'Simulateur de daltonisme', desc: 'Comment une couleur apparaît en cas de déficience visuelle', category: 'Accessibilité',
      metaTitle: 'Simulateur de daltonisme — Protanopie, deutéranopie et plus',
      long: 'Convertit vos couleurs pour montrer comment les voit une personne atteinte de protanopie, deutéranopie, tritanopie ou d’achromatopsie. On comprend immédiatement pourquoi une interface qui distingue des états uniquement par le rouge et le vert pose problème.',
      features: ['Quatre types de déficience chromatique', 'Vérifier côte à côte si deux couleurs se distinguent', 'Simuler une palette entière', 'Contraste affiché à côté'],
    },
    gradient: {
      title: 'Générateur de dégradé CSS', desc: 'Construire un dégradé CSS avec deux ou trois couleurs', category: 'CSS',
      metaTitle: 'Générateur de dégradé CSS — Code linear-gradient',
      long: 'Fixez les couleurs et l’angle et le linear-gradient CSS est écrit pour vous. Déplacez les arrêts de couleur pour choisir où se produit la transition, puis collez le résultat tel quel.',
      features: ['Deux ou trois couleurs avec position d’arrêt', 'Angulaire ou radial', 'Copier le CSS immédiatement', 'Repères de classes Tailwind'],
    },
    shadow: {
      title: 'Générateur de box-shadow CSS', desc: 'Régler l’ombre en voyant le résultat', category: 'CSS',
      metaTitle: 'Générateur de box-shadow CSS — Aperçu et code',
      long: 'Réglez décalage, flou, étalement, couleur et opacité en voyant le résultat, puis récupérez le CSS. Inclut des préréglages qui superposent plusieurs ombres pour une profondeur plus naturelle.',
      features: ['Décalage, flou, étalement et couleur', 'Ombres intérieures (inset) prises en charge', 'Préréglages naturels multicouches', 'Copier le CSS'],
    },
    name: {
      title: 'Trouver le nom d’une couleur', desc: 'Quel nom est le plus proche de cette couleur', category: 'Conversion',
      metaTitle: 'Nom de couleur — La couleur nommée la plus proche d’un HEX',
      long: 'Saisissez un code couleur et la couleur nommée la plus proche est trouvée — corail, sarcelle, cramoisi — avec HEX, RGB, HSL et CMJN ensemble. Pour quand il faut décrire une couleur avec des mots.',
      features: ['Couleur nommée la plus proche', 'HEX, RGB, HSL et CMJN à la fois', 'Montre l’écart avec cette couleur', 'Copier chaque valeur séparément'],
    },
    temperature: {
      title: 'Convertisseur de température de couleur', desc: 'Voir à quoi ressemble vraiment une valeur en kelvins', category: 'Conversion',
      metaTitle: 'Température de couleur — Convertir des kelvins en RGB',
      long: 'Voyez à quoi ressemble vraiment le blanc chaud à 2700 K, et à quel point la lumière du jour à 6500 K est bleue. Utile pour choisir un éclairage ou se faire une idée de la balance des blancs en photo.',
      features: ['Curseur de 1000 K à 12000 K', 'Préréglages chaud, neutre et lumière du jour', 'Valeurs RGB et HEX', 'Comparer deux températures côte à côte'],
    },
  },

  hi: {
    palette: {
      title: 'कलर पैलेट जनरेटर', desc: 'एक बेस रंग के साथ जमने वाले रंग, नियम से', category: 'पैलेट',
      metaTitle: 'कलर पैलेट जनरेटर — जमने वाले रंग-संयोजन बनाएँ',
      long: 'एक रंग चुनिए और कलर व्हील के नियमों — कॉम्प्लिमेंटरी, एनालॉगस, ट्रायड — से उसके साथ जमने वाले रंग निकल आएँगे। अंदाज़े से चुनने के बजाय नियम से चुनने पर संयोजन बहुत ग़लत नहीं होता।',
      features: ['कॉम्प्लिमेंटरी, एनालॉगस, ट्रायड और टेट्राड', 'एक ही रंग की चमक-श्रेणी', 'कोई भी HEX कॉपी करें', 'पूरा पैलेट CSS में कॉपी करें'],
    },
    shades: {
      title: 'कलर शेड जनरेटर', desc: 'एक रंग को 50–900 की श्रेणी में बदलें', category: 'पैलेट',
      metaTitle: 'कलर शेड जनरेटर — एक रंग से 50 से 900 तक की श्रेणी',
      long: 'एक ब्रांड रंग दीजिए और यह दस चरण बनाता है — हल्के (tints) और गहरे (shades)। आउटपुट उसी 50 · 100 · … · 900 रूप में आता है जिसकी Tailwind और अधिकतर डिज़ाइन सिस्टम अपेक्षा करते हैं।',
      features: ['50 से 900 तक दस चरण', 'हर चरण का HEX और HSL', 'सफ़ेद या काला टेक्स्ट पढ़ा जाएगा, यह बताता है', 'पूरा सेट CSS वेरिएबल में कॉपी करें'],
    },
    mixer: {
      title: 'कलर मिक्सर', desc: 'दो रंगों के बीच का रंग निकालें', category: 'पैलेट',
      metaTitle: 'कलर मिक्सर — दो रंग मिलाकर बीच का रंग निकालें',
      long: 'दो रंग तय करके अनुपात घुमाइए, बीच का रंग मिल जाएगा। किसी ग्रेडिएंट के ख़ास बिंदु का रंग निकालने या दो ब्रांड रंगों के बीच का टोन खोजने में काम आता है।',
      features: ['मिश्रण का अनुपात स्लाइडर से', 'बीच के कई चरण एक साथ', 'HEX या RGB कॉपी करें', 'मिश्रित रंग का कंट्रास्ट भी देखें'],
    },
    random: {
      title: 'रैंडम कलर जनरेटर', desc: 'पसंद वाले लॉक करें, बाक़ी दोबारा निकालें', category: 'पैलेट',
      metaTitle: 'रैंडम कलर जनरेटर — लॉक के साथ पैलेट दोबारा निकालें',
      long: 'पाँच रंग रैंडम निकालता है। जो पसंद आएँ उन्हें लॉक कर दें और बाक़ी ही दोबारा निकालें — इससे जमने वाला संयोजन मिलने तक तेज़ी से घुमाया जा सकता है।',
      features: ['एक बार में पाँच रंग', 'रखने वाले रंग लॉक करें', 'सैचुरेशन काम लायक दायरे में', 'सारे HEX एक साथ कॉपी करें'],
    },
    contrast: {
      title: 'कंट्रास्ट जाँच', desc: 'WCAG के हिसाब से टेक्स्ट की पठनीयता जाँचें', category: 'सुगम्यता',
      metaTitle: 'रंग कंट्रास्ट जाँच — WCAG AA और AAA अनुपात',
      long: 'बैकग्राउंड और टेक्स्ट के बीच कंट्रास्ट अनुपात निकालता है और बताता है कि वेब सुगम्यता की सीमा (WCAG AA और AAA) पार होती है या नहीं। असली टेक्स्ट का प्रीव्यू भी दिखता है, तो आँख से भी परखा जा सकता है।',
      features: ['1 से 21 तक कंट्रास्ट अनुपात', 'AA और AAA पास या फ़ेल', 'बड़े टेक्स्ट के लिए अलग नतीजा', 'पास होने तक चमक अपने-आप समायोजित'],
    },
    colorblind: {
      title: 'वर्णांधता सिम्युलेटर', desc: 'रंग-दृष्टि की कमी वाले व्यक्ति को रंग कैसा दिखता है', category: 'सुगम्यता',
      metaTitle: 'वर्णांधता सिम्युलेटर — प्रोटानोपिया, ड्यूटेरानोपिया और अन्य',
      long: 'आपके रंगों को बदलकर दिखाता है कि प्रोटानोपिया, ड्यूटेरानोपिया, ट्राइटानोपिया या पूर्ण वर्णांधता वाले व्यक्ति को वे कैसे दिखते हैं। सिर्फ़ लाल और हरे से स्थिति बताने वाला स्क्रीन क्यों समस्या है, यह तुरंत साफ़ हो जाता है।',
      features: ['चार तरह की रंग-दृष्टि कमी', 'दो रंग अलग दिखते हैं या नहीं, साथ रखकर जाँचें', 'पूरा पैलेट एक साथ बदलें', 'कंट्रास्ट साथ में दिखता है'],
    },
    gradient: {
      title: 'CSS ग्रेडिएंट जनरेटर', desc: 'दो-तीन रंगों से CSS ग्रेडिएंट बनाएँ', category: 'CSS',
      metaTitle: 'CSS ग्रेडिएंट जनरेटर — linear-gradient कोड',
      long: 'रंग और कोण तय कीजिए, यह CSS का linear-gradient लिख देगा। कलर स्टॉप घुमाकर तय करें कि बदलाव कहाँ हो, और नतीजा सीधे चिपका दें।',
      features: ['स्टॉप स्थिति के साथ दो-तीन रंग', 'कोण या radial', 'CSS तुरंत कॉपी करें', 'Tailwind क्लास का संकेत'],
    },
    shadow: {
      title: 'CSS box-shadow जनरेटर', desc: 'नतीजा देखते हुए छाया समायोजित करें', category: 'CSS',
      metaTitle: 'CSS box-shadow जनरेटर — लाइव प्रीव्यू और कोड',
      long: 'ऑफ़सेट, ब्लर, फैलाव, रंग और अपारदर्शिता को नतीजा देखते हुए समायोजित करें और CSS ले जाएँ। कई छायाएँ परतों में रखकर ज़्यादा स्वाभाविक गहराई देने वाले प्रीसेट भी हैं।',
      features: ['ऑफ़सेट, ब्लर, फैलाव और रंग', 'अंदर की छाया (inset) समर्थित', 'बहु-परत वाले स्वाभाविक प्रीसेट', 'CSS कॉपी करें'],
    },
    name: {
      title: 'रंग का नाम खोजें', desc: 'इस रंग के सबसे नज़दीक कौन-सा नाम है', category: 'रूपांतरण',
      metaTitle: 'रंग का नाम — किसी HEX के सबसे नज़दीक नामित रंग',
      long: 'रंग कोड डालिए और सबसे नज़दीक का नामित रंग — coral, teal, crimson — मिल जाएगा, साथ में HEX, RGB, HSL और CMYK भी। जब रंग को शब्दों में बताना हो, तब काम आता है।',
      features: ['सबसे नज़दीक का नामित रंग', 'HEX, RGB, HSL और CMYK एक साथ', 'उस रंग से अंतर भी दिखाता है', 'हर मान अलग-अलग कॉपी करें'],
    },
    temperature: {
      title: 'रंग तापमान रूपांतरण', desc: 'केल्विन मान असल में कैसा दिखता है, देखें', category: 'रूपांतरण',
      metaTitle: 'रंग तापमान — केल्विन से RGB में बदलें',
      long: '2700K का वॉर्म व्हाइट असल में कैसा दिखता है और 6500K की डेलाइट कितनी नीली है, यह देख सकते हैं। रोशनी चुनते समय या फ़ोटोग्राफ़ी में व्हाइट बैलेंस की समझ बनाने में काम आता है।',
      features: ['1000K से 12000K तक स्लाइडर', 'वॉर्म, न्यूट्रल और डेलाइट प्रीसेट', 'RGB और HEX मान', 'दो तापमान साथ रखकर तुलना करें'],
    },
  },
  'zh-hans': {
    palette: {
      title: '配色方案生成器', desc: '按色彩规则从一个基准色推出配得上的颜色', category: '配色',
      metaTitle: '配色方案生成器 — 一键生成协调的色彩组合',
      long: '选一个颜色，它就照色环规则推出跟它配得上的颜色 —— 补色、邻近色、三角配色。用规则挑而不是凭眼睛挑，方案就不至于跑偏。',
      features: ['补色、邻近色、三角与四角配色', '单色系的明度阶', '每个 HEX 都能单独复制', '整套方案可复制成 CSS'],
    },
    shades: {
      title: '色阶生成器', desc: '把一个颜色摊成 50–900 的色阶', category: '配色',
      metaTitle: '色阶生成器 — 从一个颜色生成 50 到 900',
      long: '给它一个品牌色，它就做出十档，往浅（tint）和往深（shade）各走一段。输出直接是 50 · 100 · … · 900 的写法，Tailwind 和大多数设计系统拿去就能用。',
      features: ['从 50 到 900 共十档', '每一档的 HEX 和 HSL', '标出白字还是黑字读得动', '整套复制成 CSS 变量'],
    },
    mixer: {
      title: '颜色混合器', desc: '找出两个颜色之间的那个颜色', category: '配色',
      metaTitle: '颜色混合器 — 把两色混合并取中间值',
      long: '定好两个颜色，拉一下比例就得到它们之间的色。想取渐变上某一点的颜色，或者在两个品牌色之间找个中间调，用它正合适。',
      features: ['用滑块调混合比例', '一次看到好几档中间色', '复制 HEX 或 RGB', '顺便查混出来的对比度'],
    },
    random: {
      title: '随机颜色生成器', desc: '中意的锁住，其余的重抽', category: '配色',
      metaTitle: '随机颜色生成器 — 带锁定的配色重抽',
      long: '一次抽五个随机颜色。中意的锁住，只让其余的重抽，就能飞快地翻过一组组组合，直到抽出合意的为止。',
      features: ['一次五个颜色', '想留下的可以锁住', '饱和度控制在能用的范围里', '一次复制全部 HEX'],
    },
    contrast: {
      title: '颜色对比度检查', desc: '照 WCAG 标准查文字读不读得动', category: '无障碍',
      metaTitle: '颜色对比度检查 — WCAG AA 与 AAA 比值',
      long: '算出背景色和文字色之间的对比度，告诉你有没有过网页无障碍的门槛（WCAG AA 和 AAA），还配了实时的文字预览，可以直接用眼睛判断。',
      features: ['1 到 21 的对比度', 'AA 与 AAA 是否通过', '大字另有一套判定', '自动调明度直到通过'],
    },
    colorblind: {
      title: '色盲模拟器', desc: '色觉异常的人看到的是什么颜色', category: '无障碍',
      metaTitle: '色盲模拟器 — 预览红色盲、绿色盲等',
      long: '把你的颜色换算成红色盲、绿色盲、蓝色盲和全色盲眼中的样子。一眼就能看出，为什么只靠红绿来区分状态的界面是有问题的。',
      features: ['四种色觉异常', '并排检查两色分不分得开', '整套配色一起模拟', '同时显示对比度'],
    },
    gradient: {
      title: 'CSS 渐变生成器', desc: '用两三个颜色做出 CSS 渐变', category: 'CSS',
      metaTitle: 'CSS 渐变生成器 — linear-gradient 代码',
      long: '定好颜色和角度，它就把 CSS 的 linear-gradient 写给你。拖动色标能控制过渡发生在哪儿，结果直接粘进去就行。',
      features: ['两到三个颜色，带色标位置', '可选角度或径向', '当场复制 CSS', '附 Tailwind 类名的用法'],
    },
    shadow: {
      title: 'CSS 阴影生成器', desc: '一边看效果一边调 box-shadow', category: 'CSS',
      metaTitle: 'CSS 阴影生成器 — 实时预览与代码',
      long: '一边看着结果一边调偏移、模糊、扩散、颜色和透明度，调好把 CSS 拿走。还带了几组叠多层阴影的预设，做出来的层次更自然。',
      features: ['偏移、模糊、扩散和颜色', '支持内阴影', '多层叠加的自然预设', '复制 CSS'],
    },
    name: {
      title: '颜色名称查找', desc: '这个颜色最接近哪个名字', category: '换算',
      metaTitle: '颜色名称查找 — 任意 HEX 最接近的具名颜色',
      long: '输入一个颜色代码，它就找出最接近的具名颜色 —— 珊瑚色、鸭绿、绯红 —— 并把 HEX、RGB、HSL 和 CMYK 一起列出来。需要用文字描述一个颜色时特别好使。',
      features: ['最接近的具名颜色', 'HEX、RGB、HSL、CMYK 一次看全', '显示和那个名字的颜色差多少', '每个值可单独复制'],
    },
    temperature: {
      title: '色温换算器', desc: '看看一个开尔文值到底长什么样', category: '换算',
      metaTitle: '色温换算器 — 开尔文转 RGB',
      long: '看看 2700K 的暖白到底是什么颜色，6500K 的日光又蓝到什么程度。挑照明、或者想对摄影白平衡有点手感时用得上。',
      features: ['1000K 到 12000K 的滑块', '暖光、中性、日光的预设', 'RGB 和 HEX 数值', '两个色温可并排对照'],
    },
  },
  'zh-hant': {
    palette: {
      title: '配色方案產生器', desc: '按色彩規則從一個基準色推出配得上的顏色', category: '配色',
      metaTitle: '配色方案產生器 — 一鍵產生協調的色彩組合',
      long: '選一個顏色，它就照色環規則推出跟它配得上的顏色 —— 補色、鄰近色、三角配色。用規則挑而不是憑眼睛挑，方案就不至於跑偏。',
      features: ['補色、鄰近色、三角與四角配色', '單色系的明度階', '每個 HEX 都能單獨複製', '整套方案可複製成 CSS'],
    },
    shades: {
      title: '色階產生器', desc: '把一個顏色攤成 50–900 的色階', category: '配色',
      metaTitle: '色階產生器 — 從一個顏色產生 50 到 900',
      long: '給它一個品牌色，它就做出十檔，往淺（tint）和往深（shade）各走一段。輸出直接是 50 · 100 · … · 900 的寫法，Tailwind 和大多數設計系統拿去就能用。',
      features: ['從 50 到 900 共十檔', '每一檔的 HEX 和 HSL', '標出白字還是黑字讀得動', '整套複製成 CSS 變數'],
    },
    mixer: {
      title: '顏色混合器', desc: '找出兩個顏色之間的那個顏色', category: '配色',
      metaTitle: '顏色混合器 — 把兩色混合並取中間值',
      long: '定好兩個顏色，拉一下比例就得到它們之間的色。想取漸層上某一點的顏色，或者在兩個品牌色之間找個中間調，用它正合適。',
      features: ['用滑桿調混合比例', '一次看到好幾檔中間色', '複製 HEX 或 RGB', '順便查混出來的對比度'],
    },
    random: {
      title: '隨機顏色產生器', desc: '中意的鎖住，其餘的重抽', category: '配色',
      metaTitle: '隨機顏色產生器 — 帶鎖定的配色重抽',
      long: '一次抽五個隨機顏色。中意的鎖住，只讓其餘的重抽，就能飛快地翻過一組組組合，直到抽出合意的為止。',
      features: ['一次五個顏色', '想留下的可以鎖住', '飽和度控制在能用的範圍裡', '一次複製全部 HEX'],
    },
    contrast: {
      title: '顏色對比度檢查', desc: '照 WCAG 標準查文字讀不讀得動', category: '無障礙',
      metaTitle: '顏色對比度檢查 — WCAG AA 與 AAA 比值',
      long: '算出背景色和文字色之間的對比度，告訴你有沒有過網頁無障礙的門檻（WCAG AA 和 AAA），還配了即時的文字預覽，可以直接用眼睛判斷。',
      features: ['1 到 21 的對比度', 'AA 與 AAA 是否通過', '大字另有一套判定', '自動調明度直到通過'],
    },
    colorblind: {
      title: '色盲模擬器', desc: '色覺異常的人看到的是什麼顏色', category: '無障礙',
      metaTitle: '色盲模擬器 — 預覽紅色盲、綠色盲等',
      long: '把你的顏色換算成紅色盲、綠色盲、藍色盲和全色盲眼中的樣子。一眼就能看出，為什麼只靠紅綠來區分狀態的介面是有問題的。',
      features: ['四種色覺異常', '並排檢查兩色分不分得開', '整套配色一起模擬', '同時顯示對比度'],
    },
    gradient: {
      title: 'CSS 漸層產生器', desc: '用兩三個顏色做出 CSS 漸層', category: 'CSS',
      metaTitle: 'CSS 漸層產生器 — linear-gradient 程式碼',
      long: '定好顏色和角度，它就把 CSS 的 linear-gradient 寫給你。拖動色標能控制過渡發生在哪兒，結果直接貼進去就行。',
      features: ['兩到三個顏色，帶色標位置', '可選角度或放射狀', '當場複製 CSS', '附 Tailwind 類名的用法'],
    },
    shadow: {
      title: 'CSS 陰影產生器', desc: '一邊看效果一邊調 box-shadow', category: 'CSS',
      metaTitle: 'CSS 陰影產生器 — 即時預覽與程式碼',
      long: '一邊看著結果一邊調偏移、模糊、擴散、顏色和透明度，調好把 CSS 拿走。還帶了幾組疊多層陰影的預設，做出來的層次更自然。',
      features: ['偏移、模糊、擴散和顏色', '支援內陰影', '多層疊加的自然預設', '複製 CSS'],
    },
    name: {
      title: '顏色名稱查找', desc: '這個顏色最接近哪個名字', category: '換算',
      metaTitle: '顏色名稱查找 — 任意 HEX 最接近的具名顏色',
      long: '輸入一個顏色代碼，它就找出最接近的具名顏色 —— 珊瑚色、鴨綠、緋紅 —— 並把 HEX、RGB、HSL 和 CMYK 一起列出來。需要用文字描述一個顏色時特別好使。',
      features: ['最接近的具名顏色', 'HEX、RGB、HSL、CMYK 一次看全', '顯示和那個名字的顏色差多少', '每個值可單獨複製'],
    },
    temperature: {
      title: '色溫換算器', desc: '看看一個克耳文值到底長什麼樣', category: '換算',
      metaTitle: '色溫換算器 — 克耳文轉 RGB',
      long: '看看 2700K 的暖白到底是什麼顏色，6500K 的日光又藍到什麼程度。挑照明、或者想對攝影白平衡有點手感時用得上。',
      features: ['1000K 到 12000K 的滑桿', '暖光、中性、日光的預設', 'RGB 和 HEX 數值', '兩個色溫可並排對照'],
    },
  },
};

export function colorToolsIntl(lang: ColorIntlLang): ColorTool[] {
  return COLOR_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findColorToolIntl(lang: ColorIntlLang, slug: string): ColorTool | undefined {
  return colorToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedColorToolsIntl(lang: ColorIntlLang, slug: string, count = 4): ColorTool[] {
  const all = colorToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 허브에서 분류를 묶는 순서 — 각 언어의 category 문구와 정확히 같아야 한다 */
export const COLOR_CATEGORY_ORDER: Record<ColorIntlLang, string[]> = {
  en: ['Palette', 'Accessibility', 'CSS', 'Convert'],
  es: ['Paleta', 'Accesibilidad', 'CSS', 'Conversión'],
  'pt-br': ['Paleta', 'Acessibilidade', 'CSS', 'Conversão'],
  ja: ['パレット', 'アクセシビリティ', 'CSS', '変換'],
  de: ['Palette', 'Barrierefreiheit', 'CSS', 'Umrechnung'],
  fr: ['Palette', 'Accessibilité', 'CSS', 'Conversion'],
  hi: ['पैलेट', 'सुगम्यता', 'CSS', 'रूपांतरण'],
  'zh-hans': ['配色', '无障碍', 'CSS', '换算'],
  'zh-hant': ['配色', '無障礙', 'CSS', '換算'],
};

export const COLOR_SHELL_UI: Record<ColorIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Colour tools',
    canDo: 'What this tool does', others: 'Other colour tools',
    notice: '🎨 Everything runs in your browser. No install, no sign-up.',
    footNote: 'Colours may look slightly different depending on your screen and its colour profile.',
    hubTitle: 'Colour Tools — Palette, Contrast, CSS Gradient',
    hubDesc: 'Free colour tools: palette generator, shade scale, contrast checker, colour blindness simulator, CSS gradient and box-shadow. Runs in your browser, no install.',
    hubLead: 'Palettes, contrast and CSS code — all running in your browser.',
    hubFoot: 'Free colour tools', eyebrow: 'Colour',
  },
  es: {
    home: 'Inicio', section: 'Herramientas de color',
    canDo: 'Qué hace esta herramienta', others: 'Otras herramientas de color',
    notice: '🎨 Todo funciona en tu navegador. Sin instalar nada, sin registro.',
    footNote: 'Los colores pueden verse algo distintos según tu pantalla y su perfil de color.',
    hubTitle: 'Herramientas de color — Paletas, contraste, degradados CSS',
    hubDesc: 'Herramientas de color gratis: generador de paletas, escala de tonos, comprobador de contraste, simulador de daltonismo, degradados y sombras CSS. Funciona en el navegador, sin instalar nada.',
    hubLead: 'Paletas, contraste y código CSS, todo dentro de tu navegador.',
    hubFoot: 'Herramientas de color gratis', eyebrow: 'Color',
  },
  'pt-br': {
    home: 'Início', section: 'Ferramentas de cor',
    canDo: 'O que esta ferramenta faz', others: 'Outras ferramentas de cor',
    notice: '🎨 Tudo roda no seu navegador. Sem instalar nada, sem cadastro.',
    footNote: 'As cores podem aparecer um pouco diferentes conforme a sua tela e o perfil de cor dela.',
    hubTitle: 'Ferramentas de cor — Paletas, contraste, gradiente CSS',
    hubDesc: 'Ferramentas de cor grátis: gerador de paletas, escala de tons, verificador de contraste, simulador de daltonismo, gradiente e sombra CSS. Roda no navegador, sem instalar nada.',
    hubLead: 'Paletas, contraste e código CSS — tudo dentro do seu navegador.',
    hubFoot: 'Ferramentas de cor grátis', eyebrow: 'Cor',
  },
  ja: {
    home: 'ホーム', section: 'カラーツール',
    canDo: 'このツールでできること', others: 'ほかのカラーツール',
    notice: '🎨 すべてブラウザ内で動きます。インストールも登録も不要です。',
    footNote: '画面とそのカラープロファイルによって、色は少し違って見えることがあります。',
    hubTitle: 'カラーツール — 配色・コントラスト・CSSグラデーション',
    hubDesc: '無料のカラーツール：カラーパレット作成、色段階、コントラスト比チェック、色覚シミュレーター、CSSグラデーションと影。ブラウザで動き、インストールは不要です。',
    hubLead: '配色・コントラスト・CSSコード。すべてブラウザ内で動きます。',
    hubFoot: '無料のカラーツール', eyebrow: 'Colour',
  },
  de: {
    home: 'Start', section: 'Farbwerkzeuge',
    canDo: 'Was dieses Werkzeug macht', others: 'Weitere Farbwerkzeuge',
    notice: '🎨 Alles läuft in deinem Browser. Keine Installation, keine Anmeldung.',
    footNote: 'Farben können je nach Bildschirm und Farbprofil etwas anders aussehen.',
    hubTitle: 'Farbwerkzeuge — Paletten, Kontrast, CSS-Verläufe',
    hubDesc: 'Kostenlose Farbwerkzeuge: Palettengenerator, Farbabstufungen, Kontrast-Prüfer, Farbenblindheit-Simulator, CSS-Verlauf und Schatten. Läuft im Browser, ohne Installation.',
    hubLead: 'Paletten, Kontrast und CSS-Code — alles im Browser.',
    hubFoot: 'Kostenlose Farbwerkzeuge', eyebrow: 'Farbe',
  },
  fr: {
    home: 'Accueil', section: 'Outils de couleur',
    canDo: 'Ce que fait cet outil', others: 'Autres outils de couleur',
    notice: '🎨 Tout tourne dans votre navigateur. Rien à installer, aucun compte.',
    footNote: 'Les couleurs peuvent paraître un peu différentes selon votre écran et son profil couleur.',
    hubTitle: 'Outils de couleur — Palettes, contraste, dégradés CSS',
    hubDesc: 'Outils de couleur gratuits : générateur de palettes, échelle de nuances, vérificateur de contraste, simulateur de daltonisme, dégradé et ombre CSS. Tourne dans le navigateur, rien à installer.',
    hubLead: 'Palettes, contraste et code CSS — tout dans votre navigateur.',
    hubFoot: 'Outils de couleur gratuits', eyebrow: 'Couleur',
  },
  hi: {
    home: 'होम', section: 'रंग उपकरण',
    canDo: 'यह उपकरण क्या करता है', others: 'और रंग उपकरण',
    notice: '🎨 सब कुछ आपके ब्राउज़र में चलता है। कुछ इंस्टॉल करने या साइन-अप करने की ज़रूरत नहीं।',
    footNote: 'आपकी स्क्रीन और उसकी कलर प्रोफ़ाइल के हिसाब से रंग कुछ अलग दिख सकते हैं।',
    hubTitle: 'रंग उपकरण — पैलेट, कंट्रास्ट, CSS ग्रेडिएंट',
    hubDesc: 'मुफ़्त रंग उपकरण: पैलेट जनरेटर, शेड श्रेणी, कंट्रास्ट जाँच, वर्णांधता सिम्युलेटर, CSS ग्रेडिएंट और छाया। ब्राउज़र में चलता है, इंस्टॉल करने की ज़रूरत नहीं।',
    hubLead: 'पैलेट, कंट्रास्ट और CSS कोड — सब आपके ब्राउज़र में।',
    hubFoot: 'मुफ़्त रंग उपकरण', eyebrow: 'रंग',
  },
  'zh-hans': {
    home: '首页', section: '颜色工具',
    canDo: '这个工具能做什么', others: '其他颜色工具',
    notice: '🎨 全部在你的浏览器里运行。不用装，也不用注册。',
    footNote: '颜色会因屏幕和色彩配置文件而略有差别。',
    hubTitle: '颜色工具 — 配色方案、对比度、CSS 渐变',
    hubDesc: '免费的颜色工具：配色方案生成、色阶、对比度检查、色盲模拟、CSS 渐变和阴影。在浏览器里运行，不用安装。',
    hubLead: '配色、对比度和 CSS 代码 —— 全都在浏览器里跑。',
    hubFoot: '免费颜色工具', eyebrow: '颜色',
  },
  'zh-hant': {
    home: '首頁', section: '顏色工具',
    canDo: '這個工具能做什麼', others: '其他顏色工具',
    notice: '🎨 全部在你的瀏覽器裡執行。不用裝，也不用註冊。',
    footNote: '顏色會因螢幕和色彩描述檔而略有差別。',
    hubTitle: '顏色工具 — 配色方案、對比度、CSS 漸層',
    hubDesc: '免費的顏色工具：配色方案產生、色階、對比度檢查、色盲模擬、CSS 漸層和陰影。在瀏覽器裡執行，不用安裝。',
    hubLead: '配色、對比度和 CSS 程式碼 —— 全都在瀏覽器裡跑。',
    hubFoot: '免費顏色工具', eyebrow: '顏色',
  },
};

/**
 * 라우트가 그대로 쓰는 메타데이터.
 *
 * 문구를 page.tsx에 박아 두면 언어 일곱 개 × 도구 열 개로 일흔 벌이 생기고,
 * 여기 문구를 고쳤을 때 <title>만 옛 문구로 남는다. 페이지는 이 함수를 부른다.
 */
export function colorMetaIntl(lang: ColorIntlLang, slug: string) {
  const t = findColorToolIntl(lang, slug);
  if (!t) throw new Error(`color-tools-intl: 도구가 없다 — ${slug}`);
  return {
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/color/${slug}`),
      languages: alternateLanguages10(`/color/${slug}`),
    },
  };
}

export function colorHubMetaIntl(lang: ColorIntlLang) {
  const ui = COLOR_SHELL_UI[lang];
  return {
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/color'),
      languages: alternateLanguages10('/color'),
    },
  };
}
