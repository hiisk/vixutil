/**
 * 색 페이지의 화면 문구 — 열 언어.
 *
 * 110색 × 8언어 = 880벌의 설명을 손으로 쓸 수 없다. 색마다 다른 것은 이름과
 * 숫자뿐이므로, 문장 틀을 한 벌만 두고 계산된 값을 끼워 넣는다. 숫자가 계산에서
 * 오니 틀릴 수 없고, 색을 더해도 문구를 다시 쓰지 않는다.
 */
import { alternates8, type L, type Lang } from '../i18n/lang.ts';
import type { ColorFacts } from './facts.ts';
import type { ColorFamily } from './named8.ts';

export interface FaqItem { q: string; a: string }

export interface ColorUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 표의 라벨 */
  hexLabel: string;
  rgbLabel: string;
  hslLabel: string;
  cmykLabel: string;
  lumLabel: string;
  contrastLabel: string;
  onWhite: string;
  onBlack: string;
  passAa: string;
  failAa: string;
  harmonyTitle: string;
  complementLabel: string;
  analogousLabel: string;
  triadLabel: string;
  shadesTitle: string;
  cvdTitle: string;
  protan: string;
  deutan: string;
  tritan: string;
  nearbyTitle: string;
  copyHint: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  familyLabel: Record<ColorFamily, string>;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string, hex: string) => string;
  metaDesc: (name: string, f: ColorFacts) => string;
  hubFaq: FaqItem[];
  itemFaq: (name: string, f: ColorFacts) => FaqItem[];
}

const FAM = (red: string, orange: string, yellow: string, green: string, blue: string,
  purple: string, pink: string, brown: string, neutral: string, metal: string): Record<ColorFamily, string> =>
  ({ red, orange, yellow, green, blue, purple, pink, brown, neutral, metal });

const ko: ColorUI = {
  home: '홈',
  section: '색상 이름 사전',
  hubTitle: '색상 이름 110가지 — hex·RGB·대비',
  hubLead: '색 이름으로 hex 코드를 찾고, RGB·HSL·CMYK 값과 글자 대비, 보색과 명도 단계까지 한 화면에서 확인하세요',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: '상대 밝기',
  contrastLabel: '글자 대비',
  onWhite: '흰 바탕에서',
  onBlack: '검은 바탕에서',
  passAa: 'AA 통과',
  failAa: 'AA 미달',
  harmonyTitle: '어울리는 색',
  complementLabel: '보색',
  analogousLabel: '유사색',
  triadLabel: '삼각 배색',
  shadesTitle: '명도 단계',
  cvdTitle: '색약으로 보면',
  protan: '적색맹(P형)',
  deutan: '녹색맹(D형)',
  tritan: '청색맹(T형)',
  nearbyTitle: '가까운 색',
  copyHint: '코드를 눌러 복사하세요',
  howTitle: '읽는 방법',
  how: [
    'HEX는 빨강·초록·파랑을 각각 두 자리 16진수로 적은 것입니다. #ff0000은 빨강이 최대, 나머지가 0입니다.',
    'HSL은 색상(0~360°)·채도·명도로 적습니다. 색을 조금 밝게 하려면 명도만 올리면 되니 손으로 다루기 쉽습니다.',
    '글자 대비는 WCAG 기준입니다. 본문 크기 글자는 4.5:1 이상이어야 읽히고, 흰-검 대비가 최대치인 21:1입니다.',
    '색약 칸은 세 가지 색각 이상에서 이 색이 어떻게 보이는지 계산한 것입니다. 색만으로 정보를 구분하면 안 되는 이유가 여기 있습니다.',
  ],
  faqTitle: '자주 묻는 질문',
  familyLabel: FAM('빨강 계열', '주황 계열', '노랑 계열', '초록 계열', '파랑 계열', '보라 계열', '분홍 계열', '갈색 계열', '무채색', '금속색'),
  hubMetaTitle: '색상 이름 110가지 — hex 코드·RGB·CMYK·대비 사전',
  hubMetaDesc: '빨강부터 로즈골드까지 이름 있는 색 110가지의 hex 코드와 RGB·HSL·CMYK 값, WCAG 글자 대비, 보색과 명도 단계를 색마다 한 장으로 정리했습니다.',
  metaTitle: (name, hex) => `${name} 색상 코드 ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name}의 hex 코드는 ${f.hex.toUpperCase()}, RGB는 ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, HSL은 ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%입니다. 흰 바탕 대비 ${f.onWhite}:1, 보색은 ${f.complement.toUpperCase()}이고 명도 단계와 색약 시뮬레이션도 함께 볼 수 있습니다.`,
  hubFaq: [
    {
      q: 'hex 코드는 어떻게 읽나요?',
      a: '#뒤의 여섯 자리를 두 자리씩 끊어 빨강·초록·파랑의 세기로 읽습니다. 각 자리는 16진수라 00부터 ff(255)까지이고, #ff0000은 빨강만 최대인 색입니다. 세 자리로 줄여 쓴 #f00도 같은 색을 뜻합니다.',
    },
    {
      q: 'RGB와 CMYK는 왜 다른가요?',
      a: 'RGB는 빛을 더해 색을 만들고(화면), CMYK는 잉크를 겹쳐 빛을 빼며 만듭니다(인쇄). 그래서 화면에서 선명한 색이 인쇄에서는 탁해질 수 있습니다. 이 사전의 CMYK 값은 변환 공식으로 계산한 것이라 실제 인쇄기와는 차이가 납니다.',
    },
    {
      q: '글자 대비 4.5:1은 무슨 뜻인가요?',
      a: '두 색의 상대 밝기 비율입니다. WCAG는 본문 크기 글자에 4.5:1 이상, 큰 글자에 3:1 이상을 권합니다. 가장 큰 값은 흰색과 검은색의 21:1입니다. 이 값이 낮으면 눈이 좋은 사람도 작은 글자를 읽기 힘듭니다.',
    },
    {
      q: '색약 시뮬레이션은 정확한가요?',
      a: '널리 쓰이는 변환 행렬로 계산한 근사입니다. 실제로 보이는 색은 사람마다 다르지만, 두 색이 색약에서 구별되지 않는다는 사실은 이 계산으로도 충분히 드러납니다 — 색만으로 정보를 구분하지 말라는 뜻입니다.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name}의 hex 코드는 무엇인가요?`,
      a: `${f.hex.toUpperCase()}입니다. RGB로는 ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b}이고 HSL로는 색상 ${f.hsl.h}°, 채도 ${f.hsl.s}%, 명도 ${f.hsl.l}%입니다.`,
    },
    {
      q: `${name} 위에는 어떤 색 글자를 얹어야 하나요?`,
      a: `${f.textOn === 'white' ? '흰' : '검은'} 글자입니다. 이 색과 흰색의 대비는 ${f.onWhite}:1, 검은색과의 대비는 ${f.onBlack}:1이라 대비가 큰 쪽을 골라야 본문 크기 글자가 읽힙니다.`,
    },
    {
      q: `${name}의 보색은 무엇인가요?`,
      a: `색상환에서 180° 반대편인 ${f.complement.toUpperCase()}입니다. 나란히 두면 서로를 가장 강하게 밀어내므로, 강조색으로는 좋고 넓은 면적에 함께 쓰면 눈이 피로합니다.`,
    },
    {
      q: 'CMYK 값은 인쇄에 바로 쓸 수 있나요?',
      a: `계산값은 C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}%입니다. 다만 실제 인쇄는 종이와 잉크에 따라 달라지므로, 색이 중요한 인쇄물이라면 인쇄소의 색 견본으로 확인해야 합니다.`,
    },
    {
      q: '색약에서도 이 색이 구별되나요?',
      a: `적색맹에서는 ${f.cvd.protan.toUpperCase()}, 녹색맹에서는 ${f.cvd.deutan.toUpperCase()}, 청색맹에서는 ${f.cvd.tritan.toUpperCase()}로 보입니다. 이 값들이 서로 비슷해지는 색끼리는 색만으로 구분하면 안 되고 모양이나 글자를 함께 써야 합니다.`,
    },
  ],
};

const en: ColorUI = {
  home: 'Home',
  section: 'Colour name reference',
  hubTitle: '110 Named Colours — hex, RGB, contrast',
  hubLead: 'Look up a colour by name and get its hex code, RGB, HSL and CMYK values, text contrast, complement and shade scale on one page',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: 'Relative luminance',
  contrastLabel: 'Text contrast',
  onWhite: 'On white',
  onBlack: 'On black',
  passAa: 'Passes AA',
  failAa: 'Below AA',
  harmonyTitle: 'Colours that work with it',
  complementLabel: 'Complement',
  analogousLabel: 'Analogous',
  triadLabel: 'Triadic',
  shadesTitle: 'Shade scale',
  cvdTitle: 'Seen with colour blindness',
  protan: 'Protanopia',
  deutan: 'Deuteranopia',
  tritan: 'Tritanopia',
  nearbyTitle: 'Nearby colours',
  copyHint: 'Tap a code to copy it',
  howTitle: 'How to read this',
  how: [
    'A hex code writes red, green and blue as two hexadecimal digits each. #ff0000 is red at full strength and the others at zero.',
    'HSL states hue (0–360°), saturation and lightness. Nudging a colour brighter means changing one number, which is why it is easier to work with by hand.',
    'Text contrast follows WCAG. Body-size text needs 4.5:1 or better, and 21:1 between white and black is the maximum possible.',
    'The colour-blindness row computes how this colour appears under three types of colour vision deficiency — the reason never to encode information in colour alone.',
  ],
  faqTitle: 'Frequently asked questions',
  familyLabel: FAM('Reds', 'Oranges', 'Yellows', 'Greens', 'Blues', 'Purples', 'Pinks', 'Browns', 'Neutrals', 'Metallics'),
  hubMetaTitle: '110 Named Colours — hex codes, RGB, CMYK and contrast',
  hubMetaDesc: 'From red to rose gold: hex codes, RGB, HSL and CMYK values, WCAG text contrast, complements and shade scales for 110 named colours, one page each.',
  metaTitle: (name, hex) => `${name} colour code ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name} is ${f.hex.toUpperCase()} in hex, ${f.rgb.r}·${f.rgb.g}·${f.rgb.b} in RGB and ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}% in HSL. Contrast on white is ${f.onWhite}:1, its complement is ${f.complement.toUpperCase()}, and the page includes a shade scale and colour-blindness simulation.`,
  hubFaq: [
    {
      q: 'How do I read a hex code?',
      a: 'Split the six digits after # into three pairs — red, green and blue. Each pair is hexadecimal, from 00 to ff (255), so #ff0000 is red at full strength. The short form #f00 means the same colour.',
    },
    {
      q: 'Why do RGB and CMYK differ?',
      a: 'RGB adds light (screens) while CMYK stacks ink to subtract it (print). A colour that looks vivid on screen can turn muddy in print. The CMYK values here come from the conversion formula, so a real press will differ.',
    },
    {
      q: 'What does a contrast of 4.5:1 mean?',
      a: 'It is the ratio between two relative luminances. WCAG asks for 4.5:1 on body-size text and 3:1 on large text; the largest possible value is 21:1, between white and black. Below that, even sharp eyes struggle with small type.',
    },
    {
      q: 'Is the colour-blindness simulation accurate?',
      a: 'It is an approximation from the widely used conversion matrices. What people actually see varies, but the useful fact still shows: if two colours converge here, they cannot be told apart by colour alone.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `What is the hex code for ${name}?`,
      a: `${f.hex.toUpperCase()}. That is ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b} in RGB, and hue ${f.hsl.h}°, saturation ${f.hsl.s}%, lightness ${f.hsl.l}% in HSL.`,
    },
    {
      q: `Should text on ${name} be white or black?`,
      a: `${f.textOn === 'white' ? 'White' : 'Black'}. Contrast against white is ${f.onWhite}:1 and against black ${f.onBlack}:1, so take the higher one if body-size text has to be readable.`,
    },
    {
      q: `What is the complement of ${name}?`,
      a: `${f.complement.toUpperCase()}, sitting 180° across the colour wheel. Side by side the two push against each other hardest, which makes it a good accent but tiring over large areas.`,
    },
    {
      q: 'Can I send these CMYK values straight to print?',
      a: `The computed values are C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}%. Real printing depends on paper and ink, so check against the printer's swatch book when the colour matters.`,
    },
    {
      q: 'Is this colour distinguishable with colour blindness?',
      a: `It appears as ${f.cvd.protan.toUpperCase()} with protanopia, ${f.cvd.deutan.toUpperCase()} with deuteranopia and ${f.cvd.tritan.toUpperCase()} with tritanopia. Where those values converge with another colour, add a shape or a label instead of relying on hue.`,
    },
  ],
};

const es: ColorUI = {
  home: 'Inicio',
  section: 'Diccionario de colores',
  hubTitle: '110 colores con nombre — hex, RGB, contraste',
  hubLead: 'Busca un color por su nombre y obtén su código hex, valores RGB, HSL y CMYK, contraste de texto, complementario y escala de tonos',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: 'Luminancia relativa',
  contrastLabel: 'Contraste de texto',
  onWhite: 'Sobre blanco',
  onBlack: 'Sobre negro',
  passAa: 'Cumple AA',
  failAa: 'No cumple AA',
  harmonyTitle: 'Colores que combinan',
  complementLabel: 'Complementario',
  analogousLabel: 'Análogos',
  triadLabel: 'Tríada',
  shadesTitle: 'Escala de tonos',
  cvdTitle: 'Visto con daltonismo',
  protan: 'Protanopía',
  deutan: 'Deuteranopía',
  tritan: 'Tritanopía',
  nearbyTitle: 'Colores cercanos',
  copyHint: 'Toca un código para copiarlo',
  howTitle: 'Cómo se lee',
  how: [
    'Un código hex escribe rojo, verde y azul con dos dígitos hexadecimales cada uno. #ff0000 es rojo al máximo y el resto a cero.',
    'HSL indica tono (0–360°), saturación y luminosidad. Aclarar un color es cambiar un solo número, y por eso resulta más fácil de manejar a mano.',
    'El contraste de texto sigue la WCAG: el texto normal necesita 4.5:1 y el grande 3:1. El máximo posible es 21:1, entre blanco y negro.',
    'La fila de daltonismo calcula cómo se ve este color en tres tipos de deficiencia. Por eso nunca hay que codificar información solo con el color.',
  ],
  faqTitle: 'Preguntas frecuentes',
  familyLabel: FAM('Rojos', 'Naranjas', 'Amarillos', 'Verdes', 'Azules', 'Púrpuras', 'Rosas', 'Marrones', 'Neutros', 'Metálicos'),
  hubMetaTitle: '110 colores con nombre — códigos hex, RGB, CMYK y contraste',
  hubMetaDesc: 'Del rojo al oro rosa: códigos hex, valores RGB, HSL y CMYK, contraste WCAG, complementarios y escalas de tonos de 110 colores con nombre, uno por página.',
  metaTitle: (name, hex) => `Color ${name} código ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name} es ${f.hex.toUpperCase()} en hex, ${f.rgb.r}·${f.rgb.g}·${f.rgb.b} en RGB y ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}% en HSL. El contraste sobre blanco es ${f.onWhite}:1, su complementario es ${f.complement.toUpperCase()}, e incluye escala de tonos y simulación de daltonismo.`,
  hubFaq: [
    {
      q: '¿Cómo se lee un código hex?',
      a: 'Divide los seis dígitos tras # en tres pares: rojo, verde y azul. Cada par es hexadecimal, de 00 a ff (255), así que #ff0000 es rojo al máximo. La forma corta #f00 significa el mismo color.',
    },
    {
      q: '¿Por qué difieren RGB y CMYK?',
      a: 'RGB suma luz (pantallas) y CMYK apila tinta para restarla (impresión). Un color vivo en pantalla puede volverse apagado impreso. Los valores CMYK de aquí salen de la fórmula de conversión, así que una imprenta real dará otro resultado.',
    },
    {
      q: '¿Qué significa un contraste de 4.5:1?',
      a: 'Es la razón entre dos luminancias relativas. La WCAG pide 4.5:1 en texto normal y 3:1 en texto grande; el máximo posible es 21:1, entre blanco y negro. Por debajo, incluso una vista buena sufre con la letra pequeña.',
    },
    {
      q: '¿Es exacta la simulación de daltonismo?',
      a: 'Es una aproximación con las matrices de conversión más usadas. Lo que cada persona ve varía, pero el dato útil se mantiene: si dos colores convergen aquí, no se distinguen solo por el tono.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `¿Cuál es el código hex de ${name}?`,
      a: `${f.hex.toUpperCase()}. En RGB son ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b}, y en HSL tono ${f.hsl.h}°, saturación ${f.hsl.s}% y luminosidad ${f.hsl.l}%.`,
    },
    {
      q: `¿El texto sobre ${name} debe ser blanco o negro?`,
      a: `${f.textOn === 'white' ? 'Blanco' : 'Negro'}. El contraste con blanco es ${f.onWhite}:1 y con negro ${f.onBlack}:1, así que conviene el mayor si el texto es de tamaño normal.`,
    },
    {
      q: `¿Cuál es el complementario de ${name}?`,
      a: `${f.complement.toUpperCase()}, a 180° en el círculo cromático. Juntos se repelen con más fuerza: sirve como acento, pero cansa en superficies grandes.`,
    },
    {
      q: '¿Puedo enviar estos valores CMYK a imprenta?',
      a: `Los valores calculados son C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}%. La impresión real depende del papel y la tinta, así que compruébalo con el muestrario de la imprenta cuando el color importe.`,
    },
    {
      q: '¿Se distingue este color con daltonismo?',
      a: `Se ve como ${f.cvd.protan.toUpperCase()} en protanopía, ${f.cvd.deutan.toUpperCase()} en deuteranopía y ${f.cvd.tritan.toUpperCase()} en tritanopía. Donde esos valores se acerquen a otro color, añade una forma o una etiqueta en lugar de fiarte del tono.`,
    },
  ],
};

const pt: ColorUI = {
  home: 'Início',
  section: 'Dicionário de cores',
  hubTitle: '110 cores com nome — hex, RGB, contraste',
  hubLead: 'Procure uma cor pelo nome e veja o código hex, valores RGB, HSL e CMYK, contraste de texto, complementar e escala de tons',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: 'Luminância relativa',
  contrastLabel: 'Contraste de texto',
  onWhite: 'Sobre branco',
  onBlack: 'Sobre preto',
  passAa: 'Atende AA',
  failAa: 'Abaixo de AA',
  harmonyTitle: 'Cores que combinam',
  complementLabel: 'Complementar',
  analogousLabel: 'Análogas',
  triadLabel: 'Tríade',
  shadesTitle: 'Escala de tons',
  cvdTitle: 'Visto com daltonismo',
  protan: 'Protanopia',
  deutan: 'Deuteranopia',
  tritan: 'Tritanopia',
  nearbyTitle: 'Cores próximas',
  copyHint: 'Toque num código para copiar',
  howTitle: 'Como ler',
  how: [
    'Um código hex escreve vermelho, verde e azul com dois dígitos hexadecimais cada. #ff0000 é vermelho no máximo e o resto em zero.',
    'HSL indica matiz (0–360°), saturação e luminosidade. Clarear uma cor é mudar um único número, e por isso é mais fácil de ajustar à mão.',
    'O contraste de texto segue a WCAG: texto normal precisa de 4.5:1 e texto grande de 3:1. O máximo possível é 21:1, entre branco e preto.',
    'A linha de daltonismo calcula como esta cor aparece em três tipos de deficiência. É por isso que nunca se deve codificar informação apenas na cor.',
  ],
  faqTitle: 'Perguntas frequentes',
  familyLabel: FAM('Vermelhos', 'Laranjas', 'Amarelos', 'Verdes', 'Azuis', 'Púrpuras', 'Rosas', 'Marrons', 'Neutros', 'Metálicos'),
  hubMetaTitle: '110 cores com nome — códigos hex, RGB, CMYK e contraste',
  hubMetaDesc: 'Do vermelho ao ouro rosa: códigos hex, valores RGB, HSL e CMYK, contraste WCAG, complementares e escalas de tons de 110 cores com nome, uma por página.',
  metaTitle: (name, hex) => `Cor ${name} código ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name} é ${f.hex.toUpperCase()} em hex, ${f.rgb.r}·${f.rgb.g}·${f.rgb.b} em RGB e ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}% em HSL. O contraste sobre branco é ${f.onWhite}:1, a complementar é ${f.complement.toUpperCase()}, e há escala de tons e simulação de daltonismo.`,
  hubFaq: [
    {
      q: 'Como se lê um código hex?',
      a: 'Divida os seis dígitos depois do # em três pares: vermelho, verde e azul. Cada par é hexadecimal, de 00 a ff (255), então #ff0000 é vermelho no máximo. A forma curta #f00 significa a mesma cor.',
    },
    {
      q: 'Por que RGB e CMYK são diferentes?',
      a: 'RGB soma luz (telas) e CMYK empilha tinta para subtraí-la (impressão). Uma cor viva na tela pode ficar suja no papel. Os valores CMYK aqui vêm da fórmula de conversão, então uma gráfica real dará outro resultado.',
    },
    {
      q: 'O que significa contraste de 4.5:1?',
      a: 'É a razão entre duas luminâncias relativas. A WCAG pede 4.5:1 em texto normal e 3:1 em texto grande; o máximo possível é 21:1, entre branco e preto. Abaixo disso, até uma vista boa sofre com letra pequena.',
    },
    {
      q: 'A simulação de daltonismo é exata?',
      a: 'É uma aproximação com as matrizes de conversão mais usadas. O que cada pessoa vê varia, mas o dado útil permanece: se duas cores convergem aqui, não se distinguem apenas pelo matiz.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `Qual é o código hex de ${name}?`,
      a: `${f.hex.toUpperCase()}. Em RGB são ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b}, e em HSL matiz ${f.hsl.h}°, saturação ${f.hsl.s}% e luminosidade ${f.hsl.l}%.`,
    },
    {
      q: `O texto sobre ${name} deve ser branco ou preto?`,
      a: `${f.textOn === 'white' ? 'Branco' : 'Preto'}. O contraste com branco é ${f.onWhite}:1 e com preto ${f.onBlack}:1, então use o maior quando o texto for de tamanho normal.`,
    },
    {
      q: `Qual é a complementar de ${name}?`,
      a: `${f.complement.toUpperCase()}, a 180° no círculo cromático. Lado a lado as duas se repelem com mais força: serve como destaque, mas cansa em áreas grandes.`,
    },
    {
      q: 'Posso mandar esses valores CMYK direto para a gráfica?',
      a: `Os valores calculados são C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}%. A impressão real depende do papel e da tinta, então confira no mostruário da gráfica quando a cor importa.`,
    },
    {
      q: 'Esta cor se distingue com daltonismo?',
      a: `Aparece como ${f.cvd.protan.toUpperCase()} na protanopia, ${f.cvd.deutan.toUpperCase()} na deuteranopia e ${f.cvd.tritan.toUpperCase()} na tritanopia. Onde esses valores se aproximarem de outra cor, acrescente uma forma ou um rótulo em vez de confiar no matiz.`,
    },
  ],
};

const ja: ColorUI = {
  home: 'ホーム',
  section: '色名辞典',
  hubTitle: '色名110色 — hex・RGB・コントラスト',
  hubLead: '色名からhexコードを引き、RGB・HSL・CMYKの値と文字コントラスト、補色や明度段階まで一画面で確認できます',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: '相対輝度',
  contrastLabel: '文字コントラスト',
  onWhite: '白地で',
  onBlack: '黒地で',
  passAa: 'AA適合',
  failAa: 'AA未満',
  harmonyTitle: '相性のよい色',
  complementLabel: '補色',
  analogousLabel: '類似色',
  triadLabel: 'トライアド',
  shadesTitle: '明度段階',
  cvdTitle: '色覚多様性での見え方',
  protan: '1型（P型）',
  deutan: '2型（D型）',
  tritan: '3型（T型）',
  nearbyTitle: '近い色',
  copyHint: 'コードを押すとコピーします',
  howTitle: '読み方',
  how: [
    'hexコードは赤・緑・青をそれぞれ16進数二桁で書いたものです。#ff0000は赤が最大でほかが0という色です。',
    'HSLは色相（0〜360°）・彩度・明度で書きます。少し明るくしたいときは明度だけ動かせばよく、手で扱いやすいです。',
    '文字コントラストはWCAG基準です。本文サイズの文字は4.5:1以上必要で、白と黒の21:1が最大値です。',
    '色覚の行は、三つの色覚特性でこの色がどう見えるかを計算したものです。色だけで情報を分けてはいけない理由がここにあります。',
  ],
  faqTitle: 'よくある質問',
  familyLabel: FAM('赤系', '橙系', '黄系', '緑系', '青系', '紫系', 'ピンク系', '茶系', '無彩色', 'メタリック'),
  hubMetaTitle: '色名110色 — hexコード・RGB・CMYK・コントラスト辞典',
  hubMetaDesc: '赤からローズゴールドまで、名前のある色110色のhexコードとRGB・HSL・CMYK値、WCAG文字コントラスト、補色と明度段階を色ごとに一ページでまとめました。',
  metaTitle: (name, hex) => `${name}の色コード ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name}のhexコードは${f.hex.toUpperCase()}、RGBは${f.rgb.r}・${f.rgb.g}・${f.rgb.b}、HSLは${f.hsl.h}°・${f.hsl.s}%・${f.hsl.l}%です。白地とのコントラストは${f.onWhite}:1、補色は${f.complement.toUpperCase()}で、明度段階と色覚シミュレーションも見られます。`,
  hubFaq: [
    {
      q: 'hexコードはどう読みますか。',
      a: '#の後の六桁を二桁ずつに区切り、赤・緑・青の強さとして読みます。各桁は16進数なので00からff（255）まであり、#ff0000は赤だけが最大の色です。三桁に縮めた#f00も同じ色を指します。',
    },
    {
      q: 'RGBとCMYKはなぜ違うのですか。',
      a: 'RGBは光を足して色を作り（画面）、CMYKはインクを重ねて光を引きます（印刷）。だから画面で鮮やかな色が印刷では濁ることがあります。ここのCMYK値は変換式による計算なので、実際の印刷機とは差が出ます。',
    },
    {
      q: 'コントラスト4.5:1とは何ですか。',
      a: '二色の相対輝度の比です。WCAGは本文サイズに4.5:1以上、大きな文字に3:1以上を求めます。最大値は白と黒の21:1です。これを下回ると、目のよい人でも小さな文字を読みにくくなります。',
    },
    {
      q: '色覚シミュレーションは正確ですか。',
      a: '広く使われる変換行列による近似です。実際の見え方は人により違いますが、二つの色がここで近づくなら色だけでは区別できない、という事実はこの計算でも十分に分かります。',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name}のhexコードは何ですか。`,
      a: `${f.hex.toUpperCase()}です。RGBでは${f.rgb.r}、${f.rgb.g}、${f.rgb.b}、HSLでは色相${f.hsl.h}°、彩度${f.hsl.s}%、明度${f.hsl.l}%です。`,
    },
    {
      q: `${name}の上に載せる文字は白と黒どちらですか。`,
      a: `${f.textOn === 'white' ? '白' : '黒'}です。白とのコントラストは${f.onWhite}:1、黒とは${f.onBlack}:1なので、本文サイズの文字を読ませるなら比の大きい方を選びます。`,
    },
    {
      q: `${name}の補色は何ですか。`,
      a: `色相環で180°反対側の${f.complement.toUpperCase()}です。並べると互いを最も強く押し合うので、アクセントには向きますが広い面積に一緒に使うと目が疲れます。`,
    },
    {
      q: 'このCMYK値はそのまま印刷に使えますか。',
      a: `計算値はC ${f.cmyk.c}%・M ${f.cmyk.m}%・Y ${f.cmyk.y}%・K ${f.cmyk.k}%です。ただし実際の印刷は紙とインクで変わるので、色が重要な印刷物では印刷所の色見本で確認してください。`,
    },
    {
      q: '色覚多様性でもこの色は区別できますか。',
      a: `1型では${f.cvd.protan.toUpperCase()}、2型では${f.cvd.deutan.toUpperCase()}、3型では${f.cvd.tritan.toUpperCase()}に見えます。これらの値が別の色と近づく組み合わせでは、色だけで分けず形や文字を添えてください。`,
    },
  ],
};

const de: ColorUI = {
  home: 'Start',
  section: 'Farbnamen-Lexikon',
  hubTitle: '110 Farbnamen — Hex, RGB, Kontrast',
  hubLead: 'Farbe über den Namen finden und Hex-Code, RGB-, HSL- und CMYK-Werte, Textkontrast, Komplementärfarbe und Helligkeitsstufen auf einer Seite sehen',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: 'Relative Leuchtdichte',
  contrastLabel: 'Textkontrast',
  onWhite: 'Auf Weiß',
  onBlack: 'Auf Schwarz',
  passAa: 'Erfüllt AA',
  failAa: 'Unter AA',
  harmonyTitle: 'Passende Farben',
  complementLabel: 'Komplementärfarbe',
  analogousLabel: 'Analoge Farben',
  triadLabel: 'Triade',
  shadesTitle: 'Helligkeitsstufen',
  cvdTitle: 'Mit Farbfehlsichtigkeit',
  protan: 'Protanopie',
  deutan: 'Deuteranopie',
  tritan: 'Tritanopie',
  nearbyTitle: 'Ähnliche Farben',
  copyHint: 'Auf einen Code tippen, um ihn zu kopieren',
  howTitle: 'So liest man das',
  how: [
    'Ein Hex-Code schreibt Rot, Grün und Blau je als zwei Hexadezimalstellen. #ff0000 heißt Rot voll, die anderen null.',
    'HSL nennt Farbton (0–360°), Sättigung und Helligkeit. Eine Farbe aufhellen heißt eine Zahl ändern — deshalb lässt sich HSL von Hand leichter steuern.',
    'Der Textkontrast folgt der WCAG: Fließtext braucht 4.5:1, große Schrift 3:1. Das Maximum sind 21:1 zwischen Weiß und Schwarz.',
    'Die Zeile zur Farbfehlsichtigkeit rechnet, wie diese Farbe bei drei Formen erscheint — der Grund, Information nie allein über Farbe zu codieren.',
  ],
  faqTitle: 'Häufige Fragen',
  familyLabel: FAM('Rottöne', 'Orangetöne', 'Gelbtöne', 'Grüntöne', 'Blautöne', 'Violetttöne', 'Rosatöne', 'Brauntöne', 'Neutrale', 'Metallic'),
  hubMetaTitle: '110 Farbnamen — Hex-Codes, RGB, CMYK und Kontrast',
  hubMetaDesc: 'Von Rot bis Roségold: Hex-Codes, RGB-, HSL- und CMYK-Werte, WCAG-Textkontrast, Komplementärfarben und Helligkeitsstufen für 110 benannte Farben, je eine Seite.',
  metaTitle: (name, hex) => `${name} Farbcode ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name} ist ${f.hex.toUpperCase()} in Hex, ${f.rgb.r}·${f.rgb.g}·${f.rgb.b} in RGB und ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}% in HSL. Der Kontrast auf Weiß liegt bei ${f.onWhite}:1, die Komplementärfarbe ist ${f.complement.toUpperCase()}, dazu Helligkeitsstufen und eine Simulation für Farbfehlsichtigkeit.`,
  hubFaq: [
    {
      q: 'Wie liest man einen Hex-Code?',
      a: 'Die sechs Stellen nach dem # in drei Paare teilen: Rot, Grün, Blau. Jedes Paar ist hexadezimal, von 00 bis ff (255) — #ff0000 ist also Rot in voller Stärke. Die Kurzform #f00 meint dieselbe Farbe.',
    },
    {
      q: 'Warum unterscheiden sich RGB und CMYK?',
      a: 'RGB addiert Licht (Bildschirm), CMYK schichtet Farbe und zieht Licht ab (Druck). Was am Schirm leuchtet, kann gedruckt stumpf werden. Die CMYK-Werte hier stammen aus der Umrechnungsformel, eine echte Maschine liefert andere.',
    },
    {
      q: 'Was bedeutet ein Kontrast von 4.5:1?',
      a: 'Das Verhältnis zweier relativer Leuchtdichten. Die WCAG verlangt 4.5:1 bei Fließtext und 3:1 bei großer Schrift; das Maximum sind 21:1 zwischen Weiß und Schwarz. Darunter kämpfen auch gute Augen mit kleiner Schrift.',
    },
    {
      q: 'Ist die Simulation der Farbfehlsichtigkeit genau?',
      a: 'Sie ist eine Näherung mit den verbreiteten Umrechnungsmatrizen. Was Menschen tatsächlich sehen, ist verschieden — die brauchbare Aussage bleibt aber: laufen zwei Farben hier zusammen, sind sie nicht per Farbton zu trennen.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `Welchen Hex-Code hat ${name}?`,
      a: `${f.hex.toUpperCase()}. In RGB sind das ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b}, in HSL Farbton ${f.hsl.h}°, Sättigung ${f.hsl.s}% und Helligkeit ${f.hsl.l}%.`,
    },
    {
      q: `Weiße oder schwarze Schrift auf ${name}?`,
      a: `${f.textOn === 'white' ? 'Weiß' : 'Schwarz'}. Der Kontrast zu Weiß beträgt ${f.onWhite}:1, zu Schwarz ${f.onBlack}:1 — nimm den höheren Wert, wenn Fließtext lesbar sein muss.`,
    },
    {
      q: `Was ist die Komplementärfarbe von ${name}?`,
      a: `${f.complement.toUpperCase()}, 180° gegenüber im Farbkreis. Nebeneinander stoßen sich beide am stärksten ab: gut als Akzent, auf großen Flächen anstrengend.`,
    },
    {
      q: 'Kann ich diese CMYK-Werte direkt in den Druck geben?',
      a: `Berechnet sind C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}%. Der echte Druck hängt von Papier und Farbe ab — bei wichtigen Farben mit dem Farbfächer der Druckerei abgleichen.`,
    },
    {
      q: 'Ist diese Farbe bei Farbfehlsichtigkeit unterscheidbar?',
      a: `Bei Protanopie erscheint sie als ${f.cvd.protan.toUpperCase()}, bei Deuteranopie als ${f.cvd.deutan.toUpperCase()}, bei Tritanopie als ${f.cvd.tritan.toUpperCase()}. Wo diese Werte einer anderen Farbe nahekommen, ergänze Form oder Beschriftung statt nur den Farbton.`,
    },
  ],
};

const fr: ColorUI = {
  home: 'Accueil',
  section: 'Dictionnaire des couleurs',
  hubTitle: '110 couleurs nommées — hex, RVB, contraste',
  hubLead: 'Cherchez une couleur par son nom et obtenez son code hex, ses valeurs RVB, TSL et CMJN, le contraste du texte, sa complémentaire et son échelle de tons',
  hexLabel: 'HEX',
  rgbLabel: 'RVB',
  hslLabel: 'TSL',
  cmykLabel: 'CMJN',
  lumLabel: 'Luminance relative',
  contrastLabel: 'Contraste du texte',
  onWhite: 'Sur blanc',
  onBlack: 'Sur noir',
  passAa: 'Conforme AA',
  failAa: 'Sous AA',
  harmonyTitle: 'Couleurs qui vont avec',
  complementLabel: 'Complémentaire',
  analogousLabel: 'Analogues',
  triadLabel: 'Triade',
  shadesTitle: 'Échelle de tons',
  cvdTitle: 'Vue avec un daltonisme',
  protan: 'Protanopie',
  deutan: 'Deutéranopie',
  tritan: 'Tritanopie',
  nearbyTitle: 'Couleurs proches',
  copyHint: 'Touchez un code pour le copier',
  howTitle: 'Comment lire',
  how: [
    'Un code hex écrit le rouge, le vert et le bleu sur deux chiffres hexadécimaux chacun. #ff0000, c’est le rouge au maximum et le reste à zéro.',
    'Le TSL donne la teinte (0–360°), la saturation et la luminosité. Éclaircir une couleur revient à changer un seul nombre : plus simple à régler à la main.',
    'Le contraste suit la WCAG : 4.5:1 pour le texte courant, 3:1 pour les grands caractères. Le maximum possible est 21:1, entre blanc et noir.',
    'La ligne daltonisme calcule l’aspect de cette couleur pour trois déficiences — la raison de ne jamais coder une information par la seule couleur.',
  ],
  faqTitle: 'Questions fréquentes',
  familyLabel: FAM('Rouges', 'Oranges', 'Jaunes', 'Verts', 'Bleus', 'Violets', 'Roses', 'Bruns', 'Neutres', 'Métalliques'),
  hubMetaTitle: '110 couleurs nommées — codes hex, RVB, CMJN et contraste',
  hubMetaDesc: 'Du rouge à l’or rose : codes hex, valeurs RVB, TSL et CMJN, contraste WCAG, complémentaires et échelles de tons pour 110 couleurs nommées, une page chacune.',
  metaTitle: (name, hex) => `Couleur ${name} code ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name} vaut ${f.hex.toUpperCase()} en hex, ${f.rgb.r}·${f.rgb.g}·${f.rgb.b} en RVB et ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}% en TSL. Le contraste sur blanc est de ${f.onWhite}:1, sa complémentaire est ${f.complement.toUpperCase()}, avec échelle de tons et simulation du daltonisme.`,
  hubFaq: [
    {
      q: 'Comment lit-on un code hex ?',
      a: 'Découpez les six chiffres après le # en trois paires : rouge, vert, bleu. Chaque paire est hexadécimale, de 00 à ff (255), donc #ff0000 est le rouge au maximum. La forme courte #f00 désigne la même couleur.',
    },
    {
      q: 'Pourquoi RVB et CMJN diffèrent-ils ?',
      a: 'Le RVB ajoute de la lumière (écrans), le CMJN empile de l’encre pour en retirer (impression). Une couleur éclatante à l’écran peut devenir terne sur papier. Les valeurs CMJN ici viennent de la formule de conversion ; une presse réelle donnera autre chose.',
    },
    {
      q: 'Que signifie un contraste de 4.5:1 ?',
      a: 'C’est le rapport entre deux luminances relatives. La WCAG demande 4.5:1 pour le texte courant et 3:1 pour les grands caractères ; le maximum est 21:1, entre blanc et noir. En dessous, même une bonne vue peine sur les petits corps.',
    },
    {
      q: 'La simulation du daltonisme est-elle exacte ?',
      a: 'C’est une approximation issue des matrices de conversion usuelles. Ce que chacun perçoit varie, mais l’essentiel tient : si deux couleurs se rejoignent ici, la teinte seule ne les distingue pas.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `Quel est le code hex de ${name} ?`,
      a: `${f.hex.toUpperCase()}. En RVB : ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b} ; en TSL : teinte ${f.hsl.h}°, saturation ${f.hsl.s}%, luminosité ${f.hsl.l}%.`,
    },
    {
      q: `Texte blanc ou noir sur ${name} ?`,
      a: `${f.textOn === 'white' ? 'Blanc' : 'Noir'}. Le contraste avec le blanc est de ${f.onWhite}:1 et avec le noir de ${f.onBlack}:1 : prenez le plus élevé si le texte est en corps normal.`,
    },
    {
      q: `Quelle est la complémentaire de ${name} ?`,
      a: `${f.complement.toUpperCase()}, à 180° sur le cercle chromatique. Côte à côte, les deux se repoussent le plus fort : parfait en accent, fatigant sur de grandes surfaces.`,
    },
    {
      q: 'Puis-je envoyer ces valeurs CMJN à l’imprimeur ?',
      a: `Les valeurs calculées sont C ${f.cmyk.c}% · M ${f.cmyk.m}% · J ${f.cmyk.y}% · N ${f.cmyk.k}%. L’impression réelle dépend du papier et de l’encre : vérifiez sur le nuancier de l’imprimeur quand la couleur compte.`,
    },
    {
      q: 'Cette couleur reste-t-elle distinguable avec un daltonisme ?',
      a: `Elle apparaît ${f.cvd.protan.toUpperCase()} en protanopie, ${f.cvd.deutan.toUpperCase()} en deutéranopie et ${f.cvd.tritan.toUpperCase()} en tritanopie. Là où ces valeurs rejoignent une autre couleur, ajoutez une forme ou un libellé au lieu de compter sur la teinte.`,
    },
  ],
};

const hi: ColorUI = {
  home: 'होम',
  section: 'रंग नाम शब्दकोश',
  hubTitle: '110 रंगों के नाम — हेक्स, RGB, कंट्रास्ट',
  hubLead: 'नाम से रंग खोजें और उसका हेक्स कोड, RGB·HSL·CMYK मान, टेक्स्ट कंट्रास्ट, पूरक रंग और शेड सीढ़ी एक ही पन्ने पर देखें',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: 'सापेक्ष चमक',
  contrastLabel: 'टेक्स्ट कंट्रास्ट',
  onWhite: 'सफ़ेद पर',
  onBlack: 'काले पर',
  passAa: 'AA पास',
  failAa: 'AA से कम',
  harmonyTitle: 'साथ जँचने वाले रंग',
  complementLabel: 'पूरक रंग',
  analogousLabel: 'समान रंग',
  triadLabel: 'त्रिकोण संयोजन',
  shadesTitle: 'शेड सीढ़ी',
  cvdTitle: 'वर्णांधता में कैसा दिखेगा',
  protan: 'प्रोटानोपिया',
  deutan: 'ड्यूटेरानोपिया',
  tritan: 'ट्राइटानोपिया',
  nearbyTitle: 'नज़दीकी रंग',
  copyHint: 'कोड दबाकर कॉपी करें',
  howTitle: 'कैसे पढ़ें',
  how: [
    'हेक्स कोड लाल, हरे और नीले को दो-दो हेक्साडेसिमल अंकों में लिखता है। #ff0000 का मतलब लाल पूरा और बाक़ी शून्य।',
    'HSL रंग-कोण (0–360°), संतृप्ति और चमक बताता है। रंग को हल्का करना एक ही संख्या बदलना है, इसलिए हाथ से सँभालना आसान रहता है।',
    'टेक्स्ट कंट्रास्ट WCAG के हिसाब से है। सामान्य आकार के अक्षरों को 4.5:1 चाहिए और सफ़ेद-काले का 21:1 अधिकतम है।',
    'वर्णांधता वाली पंक्ति तीन तरह की रंग-दृष्टि में इस रंग की गणना करती है — इसीलिए जानकारी को केवल रंग से नहीं बाँटना चाहिए।',
  ],
  faqTitle: 'आम सवाल',
  familyLabel: FAM('लाल परिवार', 'नारंगी परिवार', 'पीला परिवार', 'हरा परिवार', 'नीला परिवार', 'बैंगनी परिवार', 'गुलाबी परिवार', 'भूरा परिवार', 'तटस्थ रंग', 'धात्विक रंग'),
  hubMetaTitle: '110 रंगों के नाम — हेक्स कोड, RGB, CMYK और कंट्रास्ट',
  hubMetaDesc: 'लाल से रोज़ गोल्ड तक, नाम वाले 110 रंगों के हेक्स कोड, RGB·HSL·CMYK मान, WCAG कंट्रास्ट, पूरक रंग और शेड सीढ़ी — हर रंग का एक पन्ना।',
  metaTitle: (name, hex) => `${name} रंग कोड ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name} का हेक्स कोड ${f.hex.toUpperCase()} है, RGB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b} और HSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%। सफ़ेद पर कंट्रास्ट ${f.onWhite}:1, पूरक रंग ${f.complement.toUpperCase()}, साथ में शेड सीढ़ी और वर्णांधता सिमुलेशन भी।`,
  hubFaq: [
    {
      q: 'हेक्स कोड कैसे पढ़ें?',
      a: '# के बाद के छह अंकों को दो-दो में बाँटकर लाल, हरे और नीले की तीव्रता पढ़ें। हर जोड़ा हेक्साडेसिमल है, 00 से ff (255) तक, इसलिए #ff0000 वह रंग है जिसमें केवल लाल पूरा है। छोटा रूप #f00 भी वही रंग है।',
    },
    {
      q: 'RGB और CMYK अलग क्यों हैं?',
      a: 'RGB रोशनी जोड़कर रंग बनाता है (स्क्रीन), CMYK स्याही चढ़ाकर रोशनी घटाता है (छपाई)। इसलिए स्क्रीन पर चमकीला रंग कागज़ पर मैला पड़ सकता है। यहाँ के CMYK मान सूत्र से निकाले गए हैं, असली प्रेस का नतीजा अलग होगा।',
    },
    {
      q: '4.5:1 कंट्रास्ट का क्या अर्थ है?',
      a: 'यह दो सापेक्ष चमकों का अनुपात है। WCAG सामान्य अक्षरों के लिए 4.5:1 और बड़े अक्षरों के लिए 3:1 माँगता है; अधिकतम 21:1 है, सफ़ेद और काले के बीच। इससे नीचे अच्छी नज़र वालों को भी छोटे अक्षर पढ़ने में तकलीफ़ होती है।',
    },
    {
      q: 'वर्णांधता सिमुलेशन सटीक है?',
      a: 'यह प्रचलित रूपांतरण मैट्रिक्स से निकाला अनुमान है। हर व्यक्ति को दिखने वाला रंग अलग होता है, पर काम की बात बनी रहती है: यहाँ दो रंग पास आ जाएँ तो उन्हें सिर्फ़ रंग से अलग नहीं किया जा सकता।',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name} का हेक्स कोड क्या है?`,
      a: `${f.hex.toUpperCase()}। RGB में ${f.rgb.r}, ${f.rgb.g}, ${f.rgb.b} और HSL में रंग-कोण ${f.hsl.h}°, संतृप्ति ${f.hsl.s}%, चमक ${f.hsl.l}%।`,
    },
    {
      q: `${name} पर अक्षर सफ़ेद रखें या काले?`,
      a: `${f.textOn === 'white' ? 'सफ़ेद' : 'काले'}। सफ़ेद से कंट्रास्ट ${f.onWhite}:1 और काले से ${f.onBlack}:1 है, इसलिए सामान्य आकार के अक्षरों के लिए बड़ा वाला चुनें।`,
    },
    {
      q: `${name} का पूरक रंग कौन है?`,
      a: `रंग-चक्र में 180° सामने वाला ${f.complement.toUpperCase()}। साथ रखने पर दोनों एक-दूसरे को सबसे ज़्यादा धकेलते हैं — उभारने के लिए अच्छा, बड़ी सतहों पर आँखों को थकाने वाला।`,
    },
    {
      q: 'ये CMYK मान सीधे छपाई में दे सकते हैं?',
      a: `गणना के मान C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}% हैं। असली छपाई कागज़ और स्याही पर निर्भर करती है, इसलिए रंग ज़रूरी हो तो प्रेस के रंग-नमूने से मिलाइए।`,
    },
    {
      q: 'वर्णांधता में यह रंग पहचाना जाएगा?',
      a: `प्रोटानोपिया में ${f.cvd.protan.toUpperCase()}, ड्यूटेरानोपिया में ${f.cvd.deutan.toUpperCase()} और ट्राइटानोपिया में ${f.cvd.tritan.toUpperCase()} जैसा दिखता है। जहाँ ये मान किसी दूसरे रंग के पास आ जाएँ, वहाँ रंग के भरोसे न रहें — आकार या लेबल जोड़ें।`,
    },
  ],
};

const zh: ColorUI = {
  home: '首页',
  section: '颜色名称词典',
  hubTitle: '110 种颜色名称 — hex、RGB 与对比度',
  hubLead: '用颜色的名字查 hex 代码，RGB、HSL、CMYK 数值，文字对比度，还有补色和明度阶，全在一屏里看完',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: '相对亮度',
  contrastLabel: '文字对比度',
  onWhite: '在白底上',
  onBlack: '在黑底上',
  passAa: '通过 AA',
  failAa: '未达 AA',
  harmonyTitle: '搭得上的颜色',
  complementLabel: '补色',
  analogousLabel: '邻近色',
  triadLabel: '三角配色',
  shadesTitle: '明度阶',
  cvdTitle: '色觉障碍下的样子',
  protan: '红色盲（P 型）',
  deutan: '绿色盲（D 型）',
  tritan: '蓝色盲（T 型）',
  nearbyTitle: '相近的颜色',
  copyHint: '点一下代码就能复制',
  howTitle: '怎么看这些数值',
  how: [
    'HEX 是把红、绿、蓝各写成两位十六进制。#ff0000 就是红色拉满、其余为 0。',
    'HSL 用色相（0~360°）、饱和度、明度来写。想让颜色稍微亮一点，只调明度就行，用手改起来最顺。',
    '文字对比度按 WCAG 标准。正文大小的字要 4.5:1 以上才读得动，黑白之间的 21:1 是上限。',
    '色觉障碍那一栏，是算出这个颜色在三种色觉异常下会变成什么样。这正是不能只靠颜色区分信息的原因。',
  ],
  faqTitle: '常见问题',
  familyLabel: FAM('红色系', '橙色系', '黄色系', '绿色系', '蓝色系', '紫色系', '粉色系', '棕色系', '无彩色', '金属色'),
  hubMetaTitle: '110 种颜色名称 — hex 代码、RGB、CMYK 与对比度词典',
  hubMetaDesc: '从红色到玫瑰金，110 种有名字的颜色，每种一页，收齐 hex 代码、RGB、HSL、CMYK 数值、WCAG 文字对比度、补色和明度阶。',
  metaTitle: (name, hex) => `${name}的颜色代码 ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name}的 hex 代码是 ${f.hex.toUpperCase()}，RGB 为 ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}，HSL 为 ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%。在白底上的对比度是 ${f.onWhite}:1，补色为 ${f.complement.toUpperCase()}，明度阶和色觉障碍模拟也一并列出。`,
  hubFaq: [
    {
      q: 'hex 代码该怎么读？',
      a: '把 # 后面的六位每两位一断，分别当作红、绿、蓝的强度。每一段是十六进制，从 00 到 ff（255），所以 #ff0000 是只有红色拉满的颜色。缩写成三位的 #f00 指的是同一个色。',
    },
    {
      q: 'RGB 和 CMYK 为什么不一样？',
      a: 'RGB 是加光造色（屏幕），CMYK 是叠油墨减光造色（印刷）。所以屏幕上鲜艳的颜色，印出来可能发闷。本词典的 CMYK 是按换算公式算的，和实际印刷机会有出入。',
    },
    {
      q: '文字对比度 4.5:1 是什么意思？',
      a: '是两个颜色相对亮度的比值。WCAG 建议正文大小的字至少 4.5:1，大字至少 3:1。最大值是黑白之间的 21:1。这个数字一低，视力好的人也会觉得小字难读。',
    },
    {
      q: '色觉障碍模拟准吗？',
      a: '它是用通行的转换矩阵算出的近似。每个人实际看到的颜色并不相同，但「这两个颜色在色觉障碍下分不开」这件事，靠这个计算就足够暴露出来 —— 意思就是别只靠颜色来区分信息。',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name}的 hex 代码是什么？`,
      a: `是 ${f.hex.toUpperCase()}。换成 RGB 是 ${f.rgb.r}、${f.rgb.g}、${f.rgb.b}，换成 HSL 是色相 ${f.hsl.h}°、饱和度 ${f.hsl.s}%、明度 ${f.hsl.l}%。`,
    },
    {
      q: `${name}上面该配什么颜色的字？`,
      a: `配${f.textOn === 'white' ? '白' : '黑'}字。这个颜色和白色的对比度是 ${f.onWhite}:1，和黑色是 ${f.onBlack}:1，得挑对比度大的那一边，正文大小的字才读得动。`,
    },
    {
      q: `${name}的补色是什么？`,
      a: `是色环上正对面 180° 的 ${f.complement.toUpperCase()}。两色并排时互相推得最开，拿来做强调色很好，但大面积一起用会让眼睛发累。`,
    },
    {
      q: 'CMYK 数值能直接拿去印刷吗？',
      a: `算出来是 C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}%。不过实际印刷会随纸张和油墨变化，颜色要紧的印刷品，还是得拿印刷厂的色样对一遍。`,
    },
    {
      q: '色觉障碍的人分得出这个颜色吗？',
      a: `红色盲看到的是 ${f.cvd.protan.toUpperCase()}，绿色盲是 ${f.cvd.deutan.toUpperCase()}，蓝色盲是 ${f.cvd.tritan.toUpperCase()}。哪两个颜色在这里变得接近，就不能只靠颜色区分，得再加上形状或文字。`,
    },
  ],
};

const tw: ColorUI = {
  home: '首頁',
  section: '顏色名稱辭典',
  hubTitle: '110 種顏色名稱 — hex、RGB 與對比度',
  hubLead: '用顏色的名字查 hex 代碼，RGB、HSL、CMYK 數值，文字對比度，還有補色和明度階，全在一屏裡看完',
  hexLabel: 'HEX',
  rgbLabel: 'RGB',
  hslLabel: 'HSL',
  cmykLabel: 'CMYK',
  lumLabel: '相對亮度',
  contrastLabel: '文字對比度',
  onWhite: '在白底上',
  onBlack: '在黑底上',
  passAa: '通過 AA',
  failAa: '未達 AA',
  harmonyTitle: '搭得上的顏色',
  complementLabel: '補色',
  analogousLabel: '鄰近色',
  triadLabel: '三角配色',
  shadesTitle: '明度階',
  cvdTitle: '色覺障礙下的樣子',
  protan: '紅色盲（P 型）',
  deutan: '綠色盲（D 型）',
  tritan: '藍色盲（T 型）',
  nearbyTitle: '相近的顏色',
  copyHint: '點一下代碼就能複製',
  howTitle: '怎麼看這些數值',
  how: [
    'HEX 是把紅、綠、藍各寫成兩位十六進位。#ff0000 就是紅色拉滿、其餘為 0。',
    'HSL 用色相（0~360°）、飽和度、明度來寫。想讓顏色稍微亮一點，只調明度就行，用手改起來最順。',
    '文字對比度按 WCAG 標準。內文大小的字要 4.5:1 以上才讀得動，黑白之間的 21:1 是上限。',
    '色覺障礙那一欄，是算出這個顏色在三種色覺異常下會變成什麼樣。這正是不能只靠顏色區分資訊的原因。',
  ],
  faqTitle: '常見問題',
  familyLabel: FAM('紅色系', '橙色系', '黃色系', '綠色系', '藍色系', '紫色系', '粉色系', '棕色系', '無彩色', '金屬色'),
  hubMetaTitle: '110 種顏色名稱 — hex 代碼、RGB、CMYK 與對比度辭典',
  hubMetaDesc: '從紅色到玫瑰金，110 種有名字的顏色，每種一頁，收齊 hex 代碼、RGB、HSL、CMYK 數值、WCAG 文字對比度、補色和明度階。',
  metaTitle: (name, hex) => `${name}的顏色代碼 ${hex.toUpperCase()}`,
  metaDesc: (name, f) =>
    `${name}的 hex 代碼是 ${f.hex.toUpperCase()}，RGB 為 ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}，HSL 為 ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%。在白底上的對比度是 ${f.onWhite}:1，補色為 ${f.complement.toUpperCase()}，明度階和色覺障礙模擬也一併列出。`,
  hubFaq: [
    {
      q: 'hex 代碼該怎麼讀？',
      a: '把 # 後面的六位每兩位一斷，分別當作紅、綠、藍的強度。每一段是十六進位，從 00 到 ff（255），所以 #ff0000 是只有紅色拉滿的顏色。縮寫成三位的 #f00 指的是同一個色。',
    },
    {
      q: 'RGB 和 CMYK 為什麼不一樣？',
      a: 'RGB 是加光造色（螢幕），CMYK 是疊油墨減光造色（印刷）。所以螢幕上鮮豔的顏色，印出來可能發悶。本辭典的 CMYK 是按換算公式算的，和實際印刷機會有出入。',
    },
    {
      q: '文字對比度 4.5:1 是什麼意思？',
      a: '是兩個顏色相對亮度的比值。WCAG 建議內文大小的字至少 4.5:1，大字至少 3:1。最大值是黑白之間的 21:1。這個數字一低，視力好的人也會覺得小字難讀。',
    },
    {
      q: '色覺障礙模擬準嗎？',
      a: '它是用通行的轉換矩陣算出的近似。每個人實際看到的顏色並不相同，但「這兩個顏色在色覺障礙下分不開」這件事，靠這個計算就足夠暴露出來 —— 意思就是別只靠顏色來區分資訊。',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name}的 hex 代碼是什麼？`,
      a: `是 ${f.hex.toUpperCase()}。換成 RGB 是 ${f.rgb.r}、${f.rgb.g}、${f.rgb.b}，換成 HSL 是色相 ${f.hsl.h}°、飽和度 ${f.hsl.s}%、明度 ${f.hsl.l}%。`,
    },
    {
      q: `${name}上面該配什麼顏色的字？`,
      a: `配${f.textOn === 'white' ? '白' : '黑'}字。這個顏色和白色的對比度是 ${f.onWhite}:1，和黑色是 ${f.onBlack}:1，得挑對比度大的那一邊，內文大小的字才讀得動。`,
    },
    {
      q: `${name}的補色是什麼？`,
      a: `是色環上正對面 180° 的 ${f.complement.toUpperCase()}。兩色並排時互相推得最開，拿來做強調色很好，但大面積一起用會讓眼睛發累。`,
    },
    {
      q: 'CMYK 數值能直接拿去印刷嗎？',
      a: `算出來是 C ${f.cmyk.c}% · M ${f.cmyk.m}% · Y ${f.cmyk.y}% · K ${f.cmyk.k}%。不過實際印刷會隨紙張和油墨變化，顏色要緊的印刷品，還是得拿印刷廠的色樣對一遍。`,
    },
    {
      q: '色覺障礙的人分得出這個顏色嗎？',
      a: `紅色盲看到的是 ${f.cvd.protan.toUpperCase()}，綠色盲是 ${f.cvd.deutan.toUpperCase()}，藍色盲是 ${f.cvd.tritan.toUpperCase()}。哪兩個顏色在這裡變得接近，就不能只靠顏色區分，得再加上形狀或文字。`,
    },
  ],
};

export const COLOR_UI: L<ColorUI> = { ko, en, es, pt, ja, de, fr, hi, zh, tw };

export const colorUi = (lang: Lang): ColorUI => COLOR_UI[lang];

/**
 * 그 색에 뜻이 있는 FAQ만 남긴다.
 *
 * 무채색에서는 보색 질문의 답이 자기 색이 된다 — 채도가 0이면 색상환을 돌려도
 * 같은 자리다. 물어봐야 알려 주는 것이 없으므로 그 항목을 뺀다.
 */
export function colorFaq(lang: Lang, name: string, f: ColorFacts): FaqItem[] {
  const all = COLOR_UI[lang].itemFaq(name, f);
  return f.chromatic ? all : all.filter((_, i) => i !== 2);
}

/** hreflang 묶음 — 색 slug만 넣으면 아홉 줄이 나온다 */
export const colorAlternates = (slug?: string): Record<string, string> =>
  alternates8(slug ? `/color/${slug}` : '/color');
