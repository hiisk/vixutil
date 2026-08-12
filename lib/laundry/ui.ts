/**
 * 세탁 기호 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "라벨의 그림은 외우는 표가 아니라 읽는 규칙이다"이다.
 * 바탕 도형이 손질의 종류를 정하고, 점 개수가 온도를, 밑줄 개수가 세기를 정하고,
 * ×표는 하지 말라는 뜻이다.
 *
 * ── 낱말표와 조립 ───────────────────────────────────────
 * 칸이 86개라 낱장 문장을 손으로 적으면 열 언어에 860줄이 된다. 그래서 언어마다
 * **낱말표(Pack) 하나**를 두고 이름과 뜻은 nameOf·meanOf가 조립한다. 어느 언어에
 * 낱말이 빠지면 열 언어를 가로질러 세는 검사가 잡는다 — 폴백이 없으므로 빈 칸은
 * 빈 문장으로 드러난다.
 *
 * ── 금지 표지(ban) ──────────────────────────────────────
 * 금지와 허용이 뒤바뀌면 옷을 망친다. 그래서 언어마다 "하지 마라"를 뜻하는 말을
 * ban에 적어 두고, 금지 칸의 이름과 뜻에는 **반드시** 그 말이 들어가게 조립하고
 * 허용 칸에는 **한 번도** 안 들어가게 낱말을 골랐다(그래서 스팀을 못 쓰는 자리를
 * '스팀 금지'가 아니라 '스팀 없이'로 적는다). 양쪽을 다 세는 검사가
 * tests/laundry-symbol.test.ts에 있다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { Family, Notation } from './list.ts';
import type { Kind, LaundryFacts, NaturalWay, Strength } from './facts.ts';

export interface FaqItem { q: string; a: string }

/** 뜻 문장을 조립할 때 넘기는 조각 — 어느 요소가 그림에 얹혀 있는지 */
export interface Bits {
  act: string;
  shape: string;
  /** 최고 온도(°C) */
  temp?: number;
  /** 온도를 점으로 적었나 */
  dot: boolean;
  dots: number;
  /** 기계건조 온도 단계 이름 */
  level?: string;
  /** 자연건조 방식 이름 */
  way?: string;
  shade: boolean;
  oxygen: boolean;
  noSteam: boolean;
  /** 통 안의 손 */
  hand: boolean;
  /** 아무것도 안 얹힌 삼각형 — 표백제를 가리지 않는다 */
  plainBleach: boolean;
  /** 도형 안의 용제 글자와 그 뜻 */
  letter?: string;
  solvent?: string;
  /** 원 안에 글자가 없다 — 용제를 따로 가리지 않았다는 뜻이다 */
  noLetter: boolean;
  /** 온도가 안 적혀 있다 */
  anyTemp: boolean;
  bars: number;
  strength: string;
  /** 이 갈래에 밑줄 축이 있나 — 표백·다림질·자연건조에는 없다 */
  showBars: boolean;
}

/** 한 언어의 낱말표 */
export interface Pack {
  /** 손질 이름 — 갈래보다 잘다(사각형 하나가 기계건조와 자연건조로 갈린다) */
  act: Record<Kind, string>;
  /**
   * 금지 문장에 넣는 꼴 — "Do not wash"처럼 시키는 말이 따로 필요한 언어가 있다.
   * 이름 그대로 써도 되는 언어(한국어·일본어·독일어·프랑스어·힌디·중국어)는 비워 둔다.
   */
  verb: Partial<Record<Kind, string>>;
  /** 바탕 도형의 이름 */
  shape: Record<Family, string>;
  /** 비틀린 천 — 짜기 기호는 통이 없다 */
  twist: string;
  /** 자연건조 네 가지 — 이름이 곧 뜻이다 */
  way: Record<NaturalWay, string>;
  strength: Record<Strength, string>;
  /** 기계건조 온도 단계 — 점 1·2·3개 */
  level: string[];
  dots: (n: number) => string;
  maxTemp: (t: number) => string;
  anyTemp: string;
  anyBleach: string;
  oxygenOnly: string;
  noSteam: string;
  shade: string;
  /** 자연건조 이름에 그늘을 붙이는 자리 — 앞에 붙는 언어와 뒤에 붙는 언어가 있다 */
  shadeName: (way: string) => string;
  /** 용제 글자의 뜻 */
  solvent: Record<string, string>;
  /** 이름 조각을 잇는다 — 낱말 사이를 무엇으로 띄우는지가 언어마다 다르다 */
  join: (bits: string[]) => string;
  banName: (act: string) => string;
  banBody: (act: string, shape: string) => string;
  body: (b: Bits) => string;
  /** 금지 표지 — 이 말이 있으면 하지 말라는 뜻이다 */
  ban: string;
}

/* ── 조립 ─────────────────────────────────────────────── */

/** 칸 하나의 이름 — 목록과 제목이 쓴다 */
export function nameOf(p: Pack, f: LaundryFacts): string {
  const act = p.act[f.kind];
  if (f.forbidden) return p.banName(p.verb[f.kind] ?? act);

  const bits: string[] = [];
  switch (f.kind) {
    /* 조각이 하나뿐인 이름도 join을 거친다 — 첫 글자를 올리는 규칙이 그 안에 있다 */
    case 'hand':
      return p.join([act]);
    case 'bleach':
      return p.join([p.anyBleach]);
    case 'bleach-oxygen':
      return p.join([p.oxygenOnly]);
    case 'natural': {
      const way = p.way[f.natural!];
      return p.join([f.shade ? p.shadeName(way) : way]);
    }
    case 'wash':
      if (f.notation === 'dot') bits.push(p.dots(f.dots));
      bits.push(f.temp === undefined ? p.anyTemp : p.maxTemp(f.temp));
      break;
    case 'tumble':
      bits.push(f.tumbleLevel ? p.level[f.tumbleLevel - 1] : p.anyTemp);
      break;
    case 'iron':
      bits.push(f.temp === undefined ? p.anyTemp : p.maxTemp(f.temp));
      if (f.noSteam) bits.push(p.noSteam);
      break;
    case 'dryclean':
      if (f.solvent) bits.push(p.solvent[f.solvent]);
      break;
    case 'wetclean':
    case 'wring':
      break;
  }
  /* 밑줄이 없으면 이름에 세기를 안 붙인다 — 보통이라는 말은 그림에 없는 말이다 */
  if (f.bars > 0) bits.push(p.strength[f.strength]);
  return p.join([act, ...bits]);
}

/** 밑줄 축이 있는 갈래 — 물세탁·기계건조·전문 관리에만 밑줄이 붙는다 */
const HAS_BARS: ReadonlySet<Kind> = new Set<Kind>(['wash', 'tumble', 'dryclean', 'wetclean']);

/** 그림이 말하는 뜻 — 요소를 하나씩 풀어 적는다 */
export function meanOf(p: Pack, f: LaundryFacts): string {
  const act = p.act[f.kind];
  /* 짜기 기호에는 통이 없다 — 그림에 없는 도형을 말하면 안 된다 */
  const shape = f.kind === 'wring' ? p.twist : p.shape[f.family];
  if (f.forbidden) return p.banBody(p.verb[f.kind] ?? act, shape);
  return p.body({
    act,
    shape,
    temp: f.temp,
    dot: f.notation === 'dot',
    dots: f.dots,
    level: f.tumbleLevel ? p.level[f.tumbleLevel - 1] : undefined,
    way: f.natural ? p.way[f.natural] : undefined,
    shade: f.shade,
    oxygen: f.kind === 'bleach-oxygen',
    noSteam: f.noSteam,
    hand: f.kind === 'hand',
    plainBleach: f.kind === 'bleach',
    letter: f.solvent,
    solvent: f.solvent ? p.solvent[f.solvent] : undefined,
    noLetter: f.kind === 'dryclean' && !f.solvent,
    /* 온도를 말할 자리인데 안 적혀 있는 경우만 — 표백·전문 관리에는 온도 축이 없다 */
    anyTemp: f.temp === undefined && !f.tumbleLevel
      && (f.kind === 'wash' || f.kind === 'tumble' || f.kind === 'iron'),
    bars: f.bars,
    strength: p.strength[f.strength],
    showBars: HAS_BARS.has(f.kind),
  });
}

/** 첫 글자만 크게 — 낱말표는 소문자로 두고 이름에서만 올린다 */
const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/* ── 낱말표 ────────────────────────────────────────────── */

const KO: Pack = {
  act: {
    wash: '물세탁', hand: '손세탁', wring: '비틀어 짜기', bleach: '표백', 'bleach-oxygen': '표백',
    tumble: '기계건조', natural: '자연건조', iron: '다림질', dryclean: '드라이클리닝', wetclean: '웨트클리닝',
  },
  verb: {},
  shape: { wash: '통', bleach: '삼각형', dry: '사각형', iron: '다리미', dryclean: '원' },
  twist: '비틀린 천',
  way: {
    line: '줄에 걸어 건조', 'drip-line': '물을 빼며 줄에 걸어 건조',
    flat: '눕혀서 건조', 'drip-flat': '물을 빼며 눕혀서 건조',
  },
  strength: { normal: '보통', mild: '약하게', 'very-mild': '아주 약하게' },
  level: ['저온', '중온', '고온'],
  dots: n => `점 ${n}개`,
  maxTemp: t => `최고 ${t}°C`,
  anyTemp: '온도 표시 없음',
  anyBleach: '표백 가능',
  oxygenOnly: '산소계 표백만',
  noSteam: '스팀 없이',
  shade: '그늘에서',
  shadeName: w => `그늘에서 ${w}`,
  solvent: { P: '퍼클로로에틸렌 용제', F: '탄화수소계 용제만', A: '모든 용제' },
  join: b => b.filter(Boolean).join(' '),
  banName: a => `${a} 금지`,
  banBody: (a, s) => `${s}에 ×표가 얹혀 있으면 ${a} 금지입니다. 규격이 막아 둔 자리라, 그대로 하면 옷이 상합니다.`,
  body: b => {
    const out = [`${b.shape}: ${b.act} 자리입니다.`];
    if (b.temp !== undefined) out.push(b.dot
      ? `점 ${b.dots}개는 온도 줄의 ${b.dots}번째 — 최고 ${b.temp}°C입니다.`
      : `안에 적힌 숫자가 최고 온도입니다 — 최고 ${b.temp}°C입니다.`);
    if (b.level) out.push(`점 ${b.dots}개는 ${b.level}입니다.`);
    if (b.anyTemp) out.push('온도가 안 적혀 있으니 그림이 온도를 자르지 않습니다.');
    if (b.way) out.push(`${b.way}하라는 뜻입니다.`);
    if (b.hand) out.push('통 안의 손은 손으로 빨라는 뜻입니다 — 세탁기에는 넣지 않습니다.');
    if (b.plainBleach) out.push('빈 삼각형은 표백제를 가리지 않습니다 — 염소계도 산소계도 쓸 수 있습니다.');
    if (b.shade) out.push('왼쪽 위 사선 둘은 그늘에서 말리라는 뜻입니다.');
    if (b.oxygen) out.push('사선 두 줄은 산소계 표백만 된다는 뜻입니다 — 염소계는 쓸 수 없습니다.');
    if (b.noSteam) out.push('아래 사선은 스팀을 쓰지 말라는 뜻입니다.');
    if (b.letter === 'W') out.push('안의 글자 W는 물을 쓰는 전문 세탁을 뜻합니다.');
    if (b.solvent) out.push(`안의 글자 ${b.letter} — ${b.solvent}를 쓸 수 있습니다.`);
    if (b.noLetter) out.push('글자가 없으니 용제를 따로 가리지 않았습니다.');
    if (b.showBars) out.push(b.bars === 0
      ? '밑줄이 없으니 세기는 보통입니다.'
      : `밑줄 ${b.bars}줄이니 ${b.strength} 해야 합니다.`);
    return out.join(' ');
  },
  ban: '금지',
};

const EN: Pack = {
  act: {
    wash: 'washing', hand: 'hand washing', wring: 'wringing', bleach: 'bleaching', 'bleach-oxygen': 'bleaching',
    tumble: 'tumble drying', natural: 'natural drying', iron: 'ironing',
    dryclean: 'dry cleaning', wetclean: 'wet cleaning',
  },
  verb: {
    wash: 'wash', wring: 'wring', bleach: 'bleach', tumble: 'tumble dry',
    iron: 'iron', dryclean: 'dry clean', wetclean: 'wet clean',
  },
  shape: { wash: 'tub', bleach: 'triangle', dry: 'square', iron: 'iron', dryclean: 'circle' },
  twist: 'twisted cloth',
  way: { line: 'line dry', 'drip-line': 'drip line dry', flat: 'dry flat', 'drip-flat': 'drip dry flat' },
  strength: { normal: 'normal', mild: 'gentle', 'very-mild': 'very gentle' },
  level: ['low heat', 'medium heat', 'high heat'],
  dots: n => `${n} dot${n > 1 ? 's' : ''}`,
  maxTemp: t => `max ${t} °C`,
  anyTemp: 'no temperature given',
  anyBleach: 'any bleach',
  oxygenOnly: 'oxygen bleach only',
  noSteam: 'without steam',
  shade: 'in the shade',
  shadeName: w => `${w} in the shade`,
  solvent: { P: 'perchloroethylene solvent', F: 'hydrocarbon solvent only', A: 'any solvent' },
  join: b => cap(b.filter(Boolean).join(', ')),
  banName: a => `Do not ${a}`,
  banBody: (a, s) => `A cross over the ${s} means one thing: do not ${a}. The standard rules it out, and going ahead anyway is how garments get ruined.`,
  body: b => {
    const out = [`The ${b.shape} is the ${b.act} symbol.`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} dot${b.dots > 1 ? 's' : ''} put it at step ${b.dots} of the temperature scale — ${b.temp} °C at most.`
      : `The figure inside is the ceiling — ${b.temp} °C at most.`);
    if (b.level) out.push(`${b.dots} dot${b.dots > 1 ? 's' : ''} stand for ${b.level}.`);
    if (b.anyTemp) out.push('There is no figure and there are no dots, so the symbol sets no temperature.');
    if (b.way) out.push(`It asks you to ${b.way}.`);
    if (b.hand) out.push('The hand in the tub means wash it by hand, never in a machine.');
    if (b.plainBleach) out.push('An empty triangle rules out nothing: chlorine bleach and oxygen bleach are both fine.');
    if (b.shade) out.push('The two diagonal strokes in the top-left corner keep it out of the sun.');
    if (b.oxygen) out.push('The two diagonal lines allow oxygen bleach only — chlorine bleach is ruled out.');
    if (b.noSteam) out.push('The crossed strokes under the soleplate mean iron dry, with the steam off.');
    if (b.letter === 'W') out.push('The W stands for professional wet cleaning — water, at a cleaner.');
    if (b.solvent) out.push(`The ${b.letter} inside allows ${b.solvent}.`);
    if (b.noLetter) out.push('The circle carries no letter, so no solvent is singled out.');
    if (b.showBars) out.push(b.bars === 0
      ? 'There is no bar, so the process is the normal one.'
      : `${b.bars} bar${b.bars > 1 ? 's' : ''} under the symbol ${b.bars > 1 ? 'call' : 'calls'} for a ${b.strength} process.`);
    return out.join(' ');
  },
  ban: 'do not',
};

const ES: Pack = {
  act: {
    wash: 'lavado', hand: 'lavado a mano', wring: 'escurrido', bleach: 'blanqueo', 'bleach-oxygen': 'blanqueo',
    tumble: 'secado en secadora', natural: 'secado natural', iron: 'planchado',
    dryclean: 'limpieza en seco', wetclean: 'limpieza en húmedo',
  },
  verb: {
    wash: 'lavar', wring: 'escurrir', bleach: 'usar blanqueador', tumble: 'secar en secadora',
    iron: 'planchar', dryclean: 'limpiar en seco', wetclean: 'limpiar en húmedo',
  },
  shape: { wash: 'cuba', bleach: 'triángulo', dry: 'cuadrado', iron: 'plancha', dryclean: 'círculo' },
  twist: 'tela retorcida',
  way: {
    line: 'secar en tendedero', 'drip-line': 'secar en tendedero sin escurrir',
    flat: 'secar en plano', 'drip-flat': 'secar en plano sin escurrir',
  },
  strength: { normal: 'normal', mild: 'suave', 'very-mild': 'muy suave' },
  level: ['temperatura baja', 'temperatura media', 'temperatura alta'],
  dots: n => `${n} punto${n > 1 ? 's' : ''}`,
  maxTemp: t => `máx. ${t} °C`,
  anyTemp: 'sin temperatura indicada',
  anyBleach: 'cualquier blanqueador',
  oxygenOnly: 'solo blanqueador de oxígeno',
  noSteam: 'sin vapor',
  shade: 'a la sombra',
  shadeName: w => `${w} a la sombra`,
  solvent: { P: 'disolvente de percloroetileno', F: 'solo disolvente de hidrocarburos', A: 'cualquier disolvente' },
  join: b => cap(b.filter(Boolean).join(', ')),
  banName: a => `Prohibido ${a}`,
  banBody: (a, s) => `Una cruz sobre el símbolo (${s}) dice una sola cosa: está prohibido ${a}. La norma lo descarta, y hacerlo de todos modos es como se arruinan las prendas.`,
  body: b => {
    const out = [`${cap(b.shape)}: es el símbolo del ${b.act}.`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} punto${b.dots > 1 ? 's' : ''} lo sitúan en el paso ${b.dots} de la escala de temperatura: ${b.temp} °C como máximo.`
      : `La cifra del interior es el techo: ${b.temp} °C como máximo.`);
    if (b.level) out.push(`${b.dots} punto${b.dots > 1 ? 's' : ''} indican ${b.level}.`);
    if (b.anyTemp) out.push('Sin cifra ni puntos, el símbolo deja la temperatura sin limitar.');
    if (b.way) out.push(`Pide ${b.way}.`);
    if (b.hand) out.push('La mano dentro de la cuba pide lavar a mano, nunca a máquina.');
    if (b.plainBleach) out.push('El triángulo vacío deja libre el blanqueador: valen el cloro y el oxígeno.');
    if (b.shade) out.push('Las dos rayas diagonales de la esquina superior izquierda lo mantienen fuera del sol.');
    if (b.oxygen) out.push('Las dos rayas diagonales admiten solo blanqueador de oxígeno; el cloro queda descartado.');
    if (b.noSteam) out.push('Las rayas tachadas bajo la suela piden planchar en seco, sin vapor.');
    if (b.letter === 'W') out.push('La W es la limpieza profesional en húmedo: con agua, en la tintorería.');
    if (b.solvent) out.push(`La ${b.letter} del interior admite ${b.solvent}.`);
    if (b.noLetter) out.push('El círculo no lleva letra, así que ningún disolvente queda señalado.');
    if (b.showBars) out.push(b.bars === 0
      ? 'Sin barra, el proceso es el normal.'
      : `${b.bars} barra${b.bars > 1 ? 's' : ''} bajo el símbolo ${b.bars > 1 ? 'piden' : 'pide'} un proceso ${b.strength}.`);
    return out.join(' ');
  },
  ban: 'prohibido',
};

const PT: Pack = {
  act: {
    wash: 'lavagem', hand: 'lavagem à mão', wring: 'torcer', bleach: 'alvejamento', 'bleach-oxygen': 'alvejamento',
    tumble: 'secagem na secadora', natural: 'secagem natural', iron: 'passar a ferro',
    dryclean: 'limpeza a seco', wetclean: 'limpeza úmida',
  },
  verb: {
    wash: 'lavar', wring: 'torcer', bleach: 'usar alvejante', tumble: 'secar na secadora',
    iron: 'passar a ferro', dryclean: 'limpar a seco', wetclean: 'fazer limpeza úmida',
  },
  shape: { wash: 'tanque', bleach: 'triângulo', dry: 'quadrado', iron: 'ferro', dryclean: 'círculo' },
  twist: 'tecido torcido',
  way: {
    line: 'secar no varal', 'drip-line': 'secar no varal sem torcer',
    flat: 'secar na horizontal', 'drip-flat': 'secar na horizontal sem torcer',
  },
  strength: { normal: 'normal', mild: 'suave', 'very-mild': 'muito suave' },
  level: ['temperatura baixa', 'temperatura média', 'temperatura alta'],
  dots: n => `${n} ponto${n > 1 ? 's' : ''}`,
  maxTemp: t => `máx. ${t} °C`,
  anyTemp: 'sem temperatura indicada',
  anyBleach: 'qualquer alvejante',
  oxygenOnly: 'apenas alvejante de oxigênio',
  noSteam: 'sem vapor',
  shade: 'na sombra',
  shadeName: w => `${w} na sombra`,
  solvent: { P: 'solvente de percloroetileno', F: 'apenas solvente de hidrocarbonetos', A: 'qualquer solvente' },
  join: b => cap(b.filter(Boolean).join(', ')),
  banName: a => `Proibido ${a}`,
  banBody: (a, s) => `Uma cruz sobre o símbolo (${s}) diz uma coisa só: é proibido ${a}. A norma exclui esse cuidado, e insistir é o caminho para estragar a peça.`,
  body: b => {
    const out = [`${cap(b.shape)}: é o símbolo da ${b.act}.`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} ponto${b.dots > 1 ? 's' : ''} colocam a peça no passo ${b.dots} da escala de temperatura: no máximo ${b.temp} °C.`
      : `O número de dentro é o teto: no máximo ${b.temp} °C.`);
    if (b.level) out.push(`${b.dots} ponto${b.dots > 1 ? 's' : ''} indicam ${b.level}.`);
    if (b.anyTemp) out.push('Sem número e sem pontos, o símbolo deixa a temperatura sem limite.');
    if (b.way) out.push(`Pede para ${b.way}.`);
    if (b.hand) out.push('A mão dentro do tanque pede lavagem à mão, nunca na máquina.');
    if (b.plainBleach) out.push('O triângulo vazio deixa o alvejante livre: vale o de cloro e o de oxigênio.');
    if (b.shade) out.push('Os dois riscos diagonais no canto superior esquerdo mantêm a peça fora do sol.');
    if (b.oxygen) out.push('Os dois riscos diagonais aceitam apenas alvejante de oxigênio; o cloro fica de fora.');
    if (b.noSteam) out.push('Os riscos cortados sob a base pedem ferro seco, com o vapor desligado.');
    if (b.letter === 'W') out.push('O W é a limpeza profissional úmida: com água, na lavanderia.');
    if (b.solvent) out.push(`O ${b.letter} de dentro aceita ${b.solvent}.`);
    if (b.noLetter) out.push('O círculo não traz letra, então nenhum solvente fica indicado.');
    if (b.showBars) out.push(b.bars === 0
      ? 'Sem barra, o processo é o normal.'
      : `${b.bars} barra${b.bars > 1 ? 's' : ''} sob o símbolo ${b.bars > 1 ? 'pedem' : 'pede'} um processo ${b.strength}.`);
    return out.join(' ');
  },
  ban: 'proibido',
};

const JA: Pack = {
  act: {
    wash: '洗濯', hand: '手洗い', wring: '絞り', bleach: '漂白', 'bleach-oxygen': '漂白',
    tumble: 'タンブル乾燥', natural: '自然乾燥', iron: 'アイロン',
    dryclean: 'ドライクリーニング', wetclean: 'ウエットクリーニング',
  },
  verb: {},
  shape: { wash: 'おけ', bleach: '三角', dry: '四角', iron: 'アイロン', dryclean: '円' },
  twist: 'ねじれた布',
  way: { line: 'つり干し', 'drip-line': 'ぬれつり干し', flat: '平干し', 'drip-flat': 'ぬれ平干し' },
  strength: { normal: '通常', mild: '弱く', 'very-mild': 'とても弱く' },
  level: ['低温', '中温', '高温'],
  dots: n => `点${n}つ`,
  maxTemp: t => `最高${t}°C`,
  anyTemp: '温度の表示なし',
  anyBleach: 'すべての漂白剤が使える',
  oxygenOnly: '酸素系漂白剤のみ',
  noSteam: 'スチームなし',
  shade: '陰干し',
  shadeName: w => `${w}(陰干し)`,
  solvent: { P: 'パークロロエチレン系溶剤', F: '炭化水素系溶剤のみ', A: 'すべての溶剤' },
  join: b => b.filter(Boolean).join(' '),
  banName: a => `${a}禁止`,
  banBody: (a, s) => `${s}に×が重なっていれば${a}禁止です。規格が塞いだところなので、そのまま行うと衣類を傷めます。`,
  body: b => {
    const out = [`${b.shape}: ${b.act}のしるしです。`];
    if (b.temp !== undefined) out.push(b.dot
      ? `点${b.dots}つは温度の並びの${b.dots}番目 — 最高${b.temp}°Cです。`
      : `中の数字が上限です — 最高${b.temp}°Cです。`);
    if (b.level) out.push(`点${b.dots}つは${b.level}です。`);
    if (b.anyTemp) out.push('数字も点もないので、この絵は温度を区切っていません。');
    if (b.way) out.push(`${b.way}にするという意味です。`);
    if (b.hand) out.push('おけの中の手は、機械に入れず手で洗うという意味です。');
    if (b.plainBleach) out.push('何も入っていない三角は漂白剤を選びません — 塩素系も酸素系も使えます。');
    if (b.shade) out.push('左上の斜め二本は日に当てずに乾かすという意味です。');
    if (b.oxygen) out.push('斜め二本は酸素系漂白剤だけという意味です — 塩素系は使えません。');
    if (b.noSteam) out.push('下の斜線はスチームを使わないという意味です。');
    if (b.letter === 'W') out.push('中のWは水を使う専門店の洗いです。');
    if (b.solvent) out.push(`中の${b.letter} — ${b.solvent}が使えます。`);
    if (b.noLetter) out.push('文字がないので溶剤を選び分けていません。');
    if (b.showBars) out.push(b.bars === 0
      ? '下線がないので強さは通常です。'
      : `下線${b.bars}本なので${b.strength}扱います。`);
    /* 한자·가나는 마침표 뒤에 빈칸을 두지 않는다 */
    return out.join('');
  },
  ban: '禁止',
};

const DE: Pack = {
  act: {
    wash: 'Waschen', hand: 'Handwäsche', wring: 'Auswringen', bleach: 'Bleichen', 'bleach-oxygen': 'Bleichen',
    tumble: 'Trommeltrocknen', natural: 'Lufttrocknen', iron: 'Bügeln',
    dryclean: 'Chemische Reinigung', wetclean: 'Nassreinigung',
  },
  verb: {},
  shape: { wash: 'Bottich', bleach: 'Dreieck', dry: 'Quadrat', iron: 'Bügeleisen', dryclean: 'Kreis' },
  twist: 'gedrehtes Tuch',
  way: {
    line: 'auf der Leine trocknen', 'drip-line': 'tropfnass auf der Leine trocknen',
    flat: 'liegend trocknen', 'drip-flat': 'tropfnass liegend trocknen',
  },
  strength: { normal: 'normal', mild: 'schonend', 'very-mild': 'sehr schonend' },
  level: ['niedrige Hitze', 'mittlere Hitze', 'hohe Hitze'],
  dots: n => `${n} Punkt${n > 1 ? 'e' : ''}`,
  maxTemp: t => `max. ${t} °C`,
  anyTemp: 'ohne Temperaturangabe',
  anyBleach: 'jedes Bleichmittel',
  oxygenOnly: 'nur Sauerstoffbleiche',
  noSteam: 'ohne Dampf',
  shade: 'im Schatten',
  shadeName: w => `${w}, im Schatten`,
  solvent: { P: 'Perchlorethylen als Lösemittel', F: 'nur Kohlenwasserstoff-Lösemittel', A: 'alle Lösemittel' },
  join: b => cap(b.filter(Boolean).join(', ')),
  banName: a => `${a} verboten`,
  banBody: (a, s) => `Ein Kreuz über dem Zeichen (${s}) sagt nur eines: ${a} verboten. Die Norm schließt es aus, und wer es trotzdem tut, ruiniert das Stück.`,
  body: b => {
    const out = [`${b.shape}: das Zeichen für ${b.act}.`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} Punkt${b.dots > 1 ? 'e' : ''} stehen für Stufe ${b.dots} der Temperaturskala — höchstens ${b.temp} °C.`
      : `Die Zahl im Zeichen ist die Obergrenze — höchstens ${b.temp} °C.`);
    if (b.level) out.push(`${b.dots} Punkt${b.dots > 1 ? 'e' : ''} bedeuten ${b.level}.`);
    if (b.anyTemp) out.push('Ohne Zahl und ohne Punkte bleibt die Temperatur offen.');
    if (b.way) out.push(`Verlangt wird: ${b.way}.`);
    if (b.hand) out.push('Die Hand im Bottich heißt: von Hand waschen, keine Maschine.');
    if (b.plainBleach) out.push('Ein leeres Dreieck schließt kein Bleichmittel aus: Chlor und Sauerstoff gehen beide.');
    if (b.shade) out.push('Die zwei Schrägstriche in der linken oberen Ecke halten das Stück aus der Sonne.');
    if (b.oxygen) out.push('Die zwei Schrägstriche erlauben allein Sauerstoffbleiche; Chlorbleiche fällt weg.');
    if (b.noSteam) out.push('Die durchgestrichenen Striche unter der Sohle heißen: trocken bügeln, Dampf aus.');
    if (b.letter === 'W') out.push('Das W steht für professionelle Nassreinigung — mit Wasser, in der Reinigung.');
    if (b.solvent) out.push(`Das ${b.letter} im Kreis erlaubt ${b.solvent}.`);
    if (b.noLetter) out.push('Der Kreis trägt keinen Buchstaben, also ist kein Lösemittel eigens genannt.');
    if (b.showBars) out.push(b.bars === 0
      ? 'Ohne Balken gilt das normale Verfahren.'
      : `${b.bars} Balken unter dem Zeichen ${b.bars > 1 ? 'verlangen' : 'verlangt'} ein ${b.strength}es Verfahren.`);
    return out.join(' ');
  },
  ban: 'verboten',
};

const FR: Pack = {
  act: {
    wash: 'lavage', hand: 'lavage à la main', wring: 'essorage à la main', bleach: 'blanchiment',
    'bleach-oxygen': 'blanchiment', tumble: 'séchage en tambour', natural: 'séchage naturel',
    iron: 'repassage', dryclean: 'nettoyage à sec', wetclean: 'nettoyage à l’eau',
  },
  verb: {},
  shape: { wash: 'cuve', bleach: 'triangle', dry: 'carré', iron: 'fer', dryclean: 'cercle' },
  twist: 'linge tordu',
  way: {
    line: 'séchage sur corde', 'drip-line': 'séchage sur corde sans essorer',
    flat: 'séchage à plat', 'drip-flat': 'séchage à plat sans essorer',
  },
  strength: { normal: 'normal', mild: 'doux', 'very-mild': 'très doux' },
  level: ['chaleur douce', 'chaleur moyenne', 'chaleur forte'],
  dots: n => `${n} point${n > 1 ? 's' : ''}`,
  maxTemp: t => `max. ${t} °C`,
  anyTemp: 'sans température indiquée',
  anyBleach: 'tout agent de blanchiment',
  oxygenOnly: 'blanchiment à l’oxygène seulement',
  noSteam: 'sans vapeur',
  shade: 'à l’ombre',
  shadeName: w => `${w}, à l’ombre`,
  solvent: { P: 'solvant perchloréthylène', F: 'solvant hydrocarbure seulement', A: 'tout solvant' },
  join: b => cap(b.filter(Boolean).join(', ')),
  banName: a => `${a} interdit`,
  banBody: (a, s) => `Une croix sur le symbole (${s}) ne dit qu’une chose : ${a} interdit. La norme l’écarte, et forcer le passage abîme le vêtement.`,
  body: b => {
    const out = [`${cap(b.shape)} : le symbole du ${b.act}.`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} point${b.dots > 1 ? 's' : ''} placent le vêtement au niveau ${b.dots} de l’échelle de température : ${b.temp} °C au plus.`
      : `Le chiffre à l’intérieur est le plafond : ${b.temp} °C au plus.`);
    if (b.level) out.push(`${b.dots} point${b.dots > 1 ? 's' : ''} veulent dire ${b.level}.`);
    if (b.anyTemp) out.push('Sans chiffre et sans point, le symbole laisse la température libre.');
    if (b.way) out.push(`Il demande un ${b.way}.`);
    if (b.hand) out.push('La main dans la cuve demande un lavage à la main, jamais en machine.');
    if (b.plainBleach) out.push('Un triangle vide ne trie pas les agents : chlore et oxygène passent tous les deux.');
    if (b.shade) out.push('Les deux traits obliques du coin supérieur gauche tiennent le vêtement hors du soleil.');
    if (b.oxygen) out.push('Les deux traits obliques n’admettent que l’oxygène ; le chlore est écarté.');
    if (b.noSteam) out.push('Les traits barrés sous la semelle demandent un repassage à sec, vapeur coupée.');
    if (b.letter === 'W') out.push('Le W désigne le nettoyage professionnel à l’eau, chez le teinturier.');
    if (b.solvent) out.push(`Le ${b.letter} du cercle autorise le ${b.solvent}.`);
    if (b.noLetter) out.push('Le cercle ne porte aucune lettre : aucun solvant n’est désigné.');
    if (b.showBars) out.push(b.bars === 0
      ? 'Sans barre, le procédé est le procédé normal.'
      : `${b.bars} barre${b.bars > 1 ? 's' : ''} sous le symbole ${b.bars > 1 ? 'appellent' : 'appelle'} un procédé ${b.strength}.`);
    return out.join(' ');
  },
  ban: 'interdit',
};

const HI: Pack = {
  act: {
    wash: 'धुलाई', hand: 'हाथ से धुलाई', wring: 'निचोड़ना', bleach: 'ब्लीच', 'bleach-oxygen': 'ब्लीच',
    tumble: 'मशीन में सुखाना', natural: 'प्राकृतिक सुखाने', iron: 'इस्त्री',
    dryclean: 'ड्राई क्लीनिंग', wetclean: 'वेट क्लीनिंग',
  },
  verb: {},
  shape: { wash: 'टब', bleach: 'त्रिकोण', dry: 'वर्ग', iron: 'इस्त्री', dryclean: 'वृत्त' },
  twist: 'मुड़ा हुआ कपड़ा',
  way: {
    line: 'रस्सी पर सुखाएँ', 'drip-line': 'निचोड़े बिना रस्सी पर सुखाएँ',
    flat: 'सपाट रखकर सुखाएँ', 'drip-flat': 'निचोड़े बिना सपाट रखकर सुखाएँ',
  },
  /* प्रक्रिया·धुलाई가 여성형이라 형용사도 여성형으로 둔다 */
  strength: { normal: 'सामान्य', mild: 'हल्की', 'very-mild': 'बहुत हल्की' },
  level: ['कम ताप', 'मध्यम ताप', 'तेज़ ताप'],
  dots: n => `${n} बिंदु`,
  maxTemp: t => `अधिकतम ${t} °C`,
  anyTemp: 'तापमान नहीं लिखा',
  anyBleach: 'कोई भी ब्लीच',
  oxygenOnly: 'केवल ऑक्सीजन ब्लीच',
  noSteam: 'भाप के बिना',
  shade: 'छाया में',
  shadeName: w => `छाया में ${w}`,
  solvent: { P: 'पर्क्लोरोएथिलीन विलायक', F: 'केवल हाइड्रोकार्बन विलायक', A: 'कोई भी विलायक' },
  join: b => b.filter(Boolean).join(', '),
  banName: a => `${a} मना है`,
  banBody: (a, s) => `${s} पर क्रॉस हो तो बात एक ही है — ${a} मना है। मानक ने इसे रोक रखा है, और फिर भी करने पर कपड़ा बिगड़ता है।`,
  body: b => {
    const out = [`${b.shape}: यह ${b.act} का चिह्न है।`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} बिंदु तापमान की सूची में ${b.dots}वाँ पायदान है — अधिकतम ${b.temp} °C।`
      : `भीतर लिखा अंक ही ऊपरी सीमा है — अधिकतम ${b.temp} °C।`);
    if (b.level) out.push(`${b.dots} बिंदु का अर्थ ${b.level} है।`);
    if (b.anyTemp) out.push('अंक भी नहीं और बिंदु भी नहीं, इसलिए यह चिह्न तापमान की सीमा नहीं बाँधता।');
    if (b.way) out.push(`इसका अर्थ है: ${b.way}।`);
    if (b.hand) out.push('टब के भीतर बना हाथ कहता है कि मशीन में नहीं, हाथ से धोएँ।');
    if (b.plainBleach) out.push('खाली त्रिकोण किसी ब्लीच को नहीं रोकता — क्लोरीन और ऑक्सीजन दोनों चलते हैं।');
    if (b.shade) out.push('ऊपर बाएँ कोने की दो तिरछी रेखाएँ कहती हैं कि धूप से बचाकर सुखाएँ।');
    if (b.oxygen) out.push('दो तिरछी रेखाएँ केवल ऑक्सीजन ब्लीच की छूट देती हैं — क्लोरीन वाला बाहर रहता है।');
    if (b.noSteam) out.push('तले के नीचे कटी रेखाएँ कहती हैं कि भाप बंद रखकर इस्त्री करें।');
    if (b.letter === 'W') out.push('W का अर्थ है पानी से होने वाली पेशेवर सफ़ाई, दुकान पर।');
    if (b.solvent) out.push(`भीतर का ${b.letter} — ${b.solvent} चल सकता है।`);
    if (b.noLetter) out.push('वृत्त में कोई अक्षर नहीं, इसलिए कोई विलायक अलग से नहीं बताया गया।');
    if (b.showBars) out.push(b.bars === 0
      ? 'नीचे रेखा नहीं है, इसलिए प्रक्रिया सामान्य है।'
      : `चिह्न के नीचे ${b.bars} रेखा होने से प्रक्रिया ${b.strength} रखनी है।`);
    return out.join(' ');
  },
  ban: 'मना',
};

const ZH: Pack = {
  act: {
    wash: '水洗', hand: '手洗', wring: '拧干', bleach: '漂白', 'bleach-oxygen': '漂白',
    tumble: '机器烘干', natural: '自然干燥', iron: '熨烫', dryclean: '干洗', wetclean: '湿洗',
  },
  verb: {},
  shape: { wash: '洗衣盆', bleach: '三角形', dry: '方形', iron: '熨斗', dryclean: '圆形' },
  twist: '拧起的布',
  way: { line: '悬挂晾干', 'drip-line': '不脱水悬挂晾干', flat: '平摊晾干', 'drip-flat': '不脱水平摊晾干' },
  strength: { normal: '普通', mild: '轻柔', 'very-mild': '非常轻柔' },
  level: ['低温', '中温', '高温'],
  dots: n => `${n} 个点`,
  maxTemp: t => `最高 ${t}°C`,
  anyTemp: '未标温度',
  anyBleach: '可用任何漂白剂',
  oxygenOnly: '仅可用氧系漂白剂',
  noSteam: '不用蒸汽',
  shade: '在阴凉处',
  shadeName: w => `在阴凉处${w}`,
  solvent: { P: '四氯乙烯溶剂', F: '仅碳氢溶剂', A: '任何溶剂' },
  join: b => b.filter(Boolean).join(' '),
  banName: a => `禁止${a}`,
  banBody: (a, s) => `${s}上打了叉，就只有一个意思：禁止${a}。这是规格挡住的做法，照做只会把衣服弄坏。`,
  body: b => {
    const out = [`${b.shape}：这是${b.act}的记号。`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} 个点是温度序列的第 ${b.dots} 级 — 最高 ${b.temp}°C。`
      : `里面的数字就是上限 — 最高 ${b.temp}°C。`);
    if (b.level) out.push(`${b.dots} 个点表示${b.level}。`);
    if (b.anyTemp) out.push('既没有数字也没有点，所以这个图案没有限定温度。');
    if (b.way) out.push(`要求${b.way}。`);
    if (b.hand) out.push('盆里的手表示要用手洗，不要放进洗衣机。');
    if (b.plainBleach) out.push('空的三角形不挑漂白剂 — 含氯的和氧系的都能用。');
    if (b.shade) out.push('左上角两道斜线表示不要晒太阳。');
    if (b.oxygen) out.push('两道斜线表示只能用氧系漂白剂 — 含氯的不能用。');
    if (b.noSteam) out.push('底下的斜线表示不要用蒸汽。');
    if (b.letter === 'W') out.push('圈里的 W 是用水的专业洗涤。');
    if (b.solvent) out.push(`圈里的 ${b.letter} — 可以用${b.solvent}。`);
    if (b.noLetter) out.push('没有字母，就是没有特别指定溶剂。');
    if (b.showBars) out.push(b.bars === 0
      ? '没有下划线，强度就是普通。'
      : `下划线 ${b.bars} 条，要${b.strength}处理。`);
    /* 한자는 마침표 뒤에 빈칸을 두지 않는다 */
    return out.join('');
  },
  ban: '禁止',
};

const TW: Pack = {
  act: {
    wash: '水洗', hand: '手洗', wring: '擰乾', bleach: '漂白', 'bleach-oxygen': '漂白',
    tumble: '機器烘乾', natural: '自然乾燥', iron: '熨燙', dryclean: '乾洗', wetclean: '濕洗',
  },
  verb: {},
  shape: { wash: '洗衣盆', bleach: '三角形', dry: '方形', iron: '熨斗', dryclean: '圓形' },
  twist: '擰起的布',
  way: { line: '懸掛晾乾', 'drip-line': '不脫水懸掛晾乾', flat: '平攤晾乾', 'drip-flat': '不脫水平攤晾乾' },
  strength: { normal: '普通', mild: '輕柔', 'very-mild': '非常輕柔' },
  level: ['低溫', '中溫', '高溫'],
  dots: n => `${n} 個點`,
  maxTemp: t => `最高 ${t}°C`,
  anyTemp: '未標溫度',
  anyBleach: '可用任何漂白劑',
  oxygenOnly: '僅可用氧系漂白劑',
  noSteam: '不用蒸汽',
  shade: '在陰涼處',
  shadeName: w => `在陰涼處${w}`,
  solvent: { P: '四氯乙烯溶劑', F: '僅碳氫溶劑', A: '任何溶劑' },
  join: b => b.filter(Boolean).join(' '),
  banName: a => `禁止${a}`,
  banBody: (a, s) => `${s}上打了叉，就只有一個意思：禁止${a}。這是規格擋住的做法，照做只會把衣服弄壞。`,
  body: b => {
    const out = [`${b.shape}：這是${b.act}的記號。`];
    if (b.temp !== undefined) out.push(b.dot
      ? `${b.dots} 個點是溫度序列的第 ${b.dots} 級 — 最高 ${b.temp}°C。`
      : `裡面的數字就是上限 — 最高 ${b.temp}°C。`);
    if (b.level) out.push(`${b.dots} 個點表示${b.level}。`);
    if (b.anyTemp) out.push('既沒有數字也沒有點，所以這個圖案沒有限定溫度。');
    if (b.way) out.push(`要求${b.way}。`);
    if (b.hand) out.push('盆裡的手表示要用手洗，不要放進洗衣機。');
    if (b.plainBleach) out.push('空的三角形不挑漂白劑 — 含氯的和氧系的都能用。');
    if (b.shade) out.push('左上角兩道斜線表示不要曬太陽。');
    if (b.oxygen) out.push('兩道斜線表示只能用氧系漂白劑 — 含氯的不能用。');
    if (b.noSteam) out.push('底下的斜線表示不要用蒸汽。');
    if (b.letter === 'W') out.push('圈裡的 W 是用水的專業洗滌。');
    if (b.solvent) out.push(`圈裡的 ${b.letter} — 可以用${b.solvent}。`);
    if (b.noLetter) out.push('沒有字母，就是沒有特別指定溶劑。');
    if (b.showBars) out.push(b.bars === 0
      ? '沒有底線，強度就是普通。'
      : `底線 ${b.bars} 條，要${b.strength}處理。`);
    /* 한자는 마침표 뒤에 빈칸을 두지 않는다 */
    return out.join('');
  },
  ban: '禁止',
};

/** 언어별 낱말표 */
export const PACKS: L<Pack> = { ko: KO, en: EN, es: ES, pt: PT, ja: JA, de: DE, fr: FR, hi: HI, zh: ZH, tw: TW };

/* ── 페이지 문구 ──────────────────────────────────────── */

/** 낱장 문구를 만드는 자리 — 이름과 뜻은 낱말표가 이미 조립해 넘긴다 */
export interface Text {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  /** 갈래 이름 다섯 — 허브가 이 이름으로 나눈다 */
  family: Record<Family, string>;

  familyLabel: string;
  meaningLabel: string;
  shapeLabel: string;
  dotsLabel: string;
  barsLabel: string;
  tempLabel: string;
  strengthLabel: string;
  notationLabel: string;
  /** 온도를 적는 두 가지 표기의 이름 */
  notationName: Record<Notation, string>;

  shapeTitle: string;
  shapeNote: string;
  dotsTitle: string;
  dotsNote: string;
  barsTitle: string;
  barsNote: string;
  crossTitle: string;
  crossNote: string;
  standardTitle: string;
  standardNote: string;

  tableTitle: string;
  neighbourTitle: string;
  familyRowTitle: string;

  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  hubFaq: FaqItem[];

  metaTitleOf: (name: string) => string;
  metaDescOf: (name: string, mean: string) => string;
  cellFaqOf: (name: string, mean: string, f: LaundryFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof Text]: L<Text[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('세탁 기호', 'Laundry symbols', 'Símbolos de lavado', 'Símbolos de lavagem', '洗濯表示',
    'Pflegesymbole', 'Symboles d’entretien', 'धुलाई के चिह्न', '洗涤标志', '洗滌標誌'),

  hubTitle: T(
    '세탁 기호 86가지 — 점은 온도, 밑줄은 세기, ×는 금지',
    '86 laundry symbols — dots are heat, bars are gentleness, a cross is a no',
    '86 símbolos de lavado: los puntos son calor, las barras suavidad, la cruz una prohibición',
    '86 símbolos de lavagem: os pontos são calor, as barras suavidade, a cruz uma proibição',
    '洗濯表示86種 — 点は温度、下線は強さ、×は禁止',
    '86 Pflegesymbole — Punkte sind Hitze, Balken Schonung, ein Kreuz ist ein Verbot',
    '86 symboles d’entretien — les points font la chaleur, les barres la douceur, la croix l’interdit',
    'धुलाई के 86 चिह्न — बिंदु ताप, रेखाएँ नरमी, क्रॉस मनाही',
    '洗涤标志 86 种 — 点是温度，下划线是强度，打叉是禁止',
    '洗滌標誌 86 種 — 點是溫度，底線是強度，打叉是禁止',
  ),

  hubLead: T(
    '옷 라벨의 그림은 외우는 표가 아니라 읽는 규칙입니다. 바탕 도형이 손질의 종류를 정하고(통은 물세탁, 삼각형은 표백, 사각형은 건조, 다리미는 다림질, 원은 전문 관리), 점 개수가 온도를, 밑줄 개수가 세기를 정하며, ×표는 하지 말라는 뜻입니다. 이 규칙으로 86가지를 모두 펼쳐 두었습니다.',
    'The pictures on a care label are a rule to read, not a table to memorise. The base shape sets the treatment — tub for washing, triangle for bleaching, square for drying, iron for ironing, circle for professional care — the dots set the temperature, the bars set how gentle, and a cross means do not. All 86 combinations are laid out here from that rule.',
    'Los dibujos de una etiqueta son una regla que se lee, no una tabla que se memoriza. La forma base fija el cuidado (cuba para lavar, triángulo para blanquear, cuadrado para secar, plancha para planchar, círculo para el cuidado profesional), los puntos fijan la temperatura, las barras la suavidad y la cruz descarta el cuidado. Aquí están las 86 combinaciones que salen de esa regla.',
    'Os desenhos de uma etiqueta são uma regra que se lê, não uma tabela para decorar. A forma base fixa o cuidado (tanque para lavar, triângulo para alvejar, quadrado para secar, ferro para passar, círculo para o cuidado profissional), os pontos fixam a temperatura, as barras a suavidade e a cruz exclui o cuidado. Aqui estão as 86 combinações que saem dessa regra.',
    '衣類の表示は覚える表ではなく読む規則です。土台の形が手入れの種類を決め(おけは洗濯、三角は漂白、四角は乾燥、アイロンはアイロン、円は専門の手入れ)、点の数が温度、下線の数が強さを決め、×は「しない」を意味します。その規則で86種すべてを並べました。',
    'Die Bilder auf einem Pflegeetikett sind eine Regel zum Lesen, keine Tabelle zum Lernen. Die Grundform legt die Behandlung fest — Bottich fürs Waschen, Dreieck fürs Bleichen, Quadrat fürs Trocknen, Bügeleisen fürs Bügeln, Kreis für die professionelle Pflege —, die Punkte legen die Temperatur fest, die Balken die Schonung, und ein Kreuz heißt: gar nicht. Alle 86 Kombinationen stehen hier aus dieser Regel.',
    'Les dessins d’une étiquette forment une règle à lire, pas une table à retenir. La forme de base fixe le soin — cuve pour le lavage, triangle pour le blanchiment, carré pour le séchage, fer pour le repassage, cercle pour l’entretien professionnel —, les points fixent la température, les barres la douceur, et une croix veut dire : jamais. Les 86 combinaisons sont ici, tirées de cette règle.',
    'लेबल के चित्र रटने की तालिका नहीं, पढ़ने का नियम हैं। आधार आकृति तय करती है कि कौन-सा काम है (टब धुलाई, त्रिकोण ब्लीच, वर्ग सुखाना, इस्त्री इस्त्री, वृत्त पेशेवर देखभाल), बिंदुओं की संख्या तापमान तय करती है, नीचे की रेखाएँ नरमी, और क्रॉस का अर्थ है मनाही। उसी नियम से यहाँ सभी 86 चिह्न खोल कर रखे हैं।',
    '衣服吊牌上的图案不是要背的表，而是要读的规则。底层形状定下是哪一种打理（盆是水洗、三角形是漂白、方形是干燥、熨斗是熨烫、圆形是专业打理），点的数量定温度，下划线的数量定强度，打叉表示不要做。这里按这条规则把 86 种全部摊开。',
    '衣服吊牌上的圖案不是要背的表，而是要讀的規則。底層形狀定下是哪一種打理（盆是水洗、三角形是漂白、方形是乾燥、熨斗是熨燙、圓形是專業打理），點的數量定溫度，底線的數量定強度，打叉表示不要做。這裡按這條規則把 86 種全部攤開。',
  ),

  family: T<Record<Family, string>>(
    { wash: '물세탁', bleach: '표백', dry: '건조', iron: '다림질', dryclean: '전문 관리' },
    { wash: 'Washing', bleach: 'Bleaching', dry: 'Drying', iron: 'Ironing', dryclean: 'Professional care' },
    { wash: 'Lavado', bleach: 'Blanqueo', dry: 'Secado', iron: 'Planchado', dryclean: 'Cuidado profesional' },
    { wash: 'Lavagem', bleach: 'Alvejamento', dry: 'Secagem', iron: 'Passar a ferro', dryclean: 'Cuidado profissional' },
    { wash: '洗濯', bleach: '漂白', dry: '乾燥', iron: 'アイロン', dryclean: '専門の手入れ' },
    { wash: 'Waschen', bleach: 'Bleichen', dry: 'Trocknen', iron: 'Bügeln', dryclean: 'Professionelle Pflege' },
    { wash: 'Lavage', bleach: 'Blanchiment', dry: 'Séchage', iron: 'Repassage', dryclean: 'Entretien professionnel' },
    { wash: 'धुलाई', bleach: 'ब्लीच', dry: 'सुखाना', iron: 'इस्त्री', dryclean: 'पेशेवर देखभाल' },
    { wash: '水洗', bleach: '漂白', dry: '干燥', iron: '熨烫', dryclean: '专业打理' },
    { wash: '水洗', bleach: '漂白', dry: '乾燥', iron: '熨燙', dryclean: '專業打理' },
  ),

  familyLabel: T('갈래', 'Family', 'Familia', 'Família', '分類', 'Gruppe', 'Famille', 'वर्ग', '类别', '類別'),
  meaningLabel: T('뜻', 'Meaning', 'Significado', 'Significado', '意味', 'Bedeutung', 'Signification', 'अर्थ', '含义', '含義'),
  shapeLabel: T('바탕 도형', 'Base shape', 'Forma base', 'Forma base', '土台の形', 'Grundform', 'Forme de base', 'आधार आकृति', '底层形状', '底層形狀'),
  dotsLabel: T('점 개수', 'Dots', 'Puntos', 'Pontos', '点の数', 'Punkte', 'Points', 'बिंदु', '点数', '點數'),
  barsLabel: T('밑줄 개수', 'Bars', 'Barras', 'Barras', '下線の数', 'Balken', 'Barres', 'रेखाएँ', '下划线', '底線'),
  tempLabel: T('최고 온도', 'Max temperature', 'Temperatura máx.', 'Temperatura máx.', '最高温度', 'Höchsttemperatur', 'Température max.', 'अधिकतम तापमान', '最高温度', '最高溫度'),
  strengthLabel: T('세기', 'Process', 'Proceso', 'Processo', '強さ', 'Verfahren', 'Procédé', 'प्रक्रिया', '强度', '強度'),
  notationLabel: T('온도 표기', 'Temperature notation', 'Notación de temperatura', 'Notação de temperatura', '温度の書き方', 'Temperaturangabe', 'Notation de température', 'तापमान का अंकन', '温度写法', '溫度寫法'),

  notationName: T<Record<Notation, string>>(
    { num: '숫자', dot: '점', none: '표시 없음' },
    { num: 'figure', dot: 'dots', none: 'none' },
    { num: 'cifra', dot: 'puntos', none: 'ninguna' },
    { num: 'número', dot: 'pontos', none: 'nenhuma' },
    { num: '数字', dot: '点', none: 'なし' },
    { num: 'Zahl', dot: 'Punkte', none: 'keine' },
    { num: 'chiffre', dot: 'points', none: 'aucune' },
    { num: 'अंक', dot: 'बिंदु', none: 'कोई नहीं' },
    { num: '数字', dot: '点', none: '没有' },
    { num: '數字', dot: '點', none: '沒有' },
  ),

  shapeTitle: T(
    '바탕 도형이 손질의 종류를 정한다',
    'The base shape says which treatment',
    'La forma base dice de qué cuidado se trata',
    'A forma base diz de que cuidado se trata',
    '土台の形が手入れの種類を決める',
    'Die Grundform sagt, welche Behandlung',
    'La forme de base dit de quel soin il s’agit',
    'आधार आकृति बताती है कौन-सा काम',
    '底层形状定下是哪一种打理',
    '底層形狀定下是哪一種打理',
  ),
  shapeNote: T(
    '통은 물세탁, 삼각형은 표백, 사각형은 건조, 다리미는 다림질, 원은 세탁소가 하는 전문 관리입니다. 사각형은 안에 원이 있으면 기계건조이고, 원 없이 줄만 있으면 자연건조입니다. 라벨은 이 다섯을 왼쪽부터 이 순서로 늘어놓는 것이 보통이므로, 자리만 보아도 어느 손질을 말하는지 짐작할 수 있습니다.',
    'A tub is washing, a triangle is bleaching, a square is drying, an iron is ironing, and a circle is professional care at a cleaner. Inside the square, a circle means a tumble dryer while plain lines mean drying in the air. Labels usually run these five left to right in that order, so the position alone hints at which treatment you are looking at.',
    'La cuba es el lavado, el triángulo el blanqueo, el cuadrado el secado, la plancha el planchado y el círculo el cuidado profesional en la tintorería. Dentro del cuadrado, un círculo indica secadora y unas rayas solas, secado al aire. Las etiquetas suelen poner estos cinco de izquierda a derecha en ese orden, así que la posición ya insinúa de qué cuidado se habla.',
    'O tanque é a lavagem, o triângulo o alvejamento, o quadrado a secagem, o ferro o passar a ferro e o círculo o cuidado profissional na lavanderia. Dentro do quadrado, um círculo indica secadora e riscos sozinhos, secagem ao ar. As etiquetas costumam trazer esses cinco da esquerda para a direita nessa ordem, então a posição já indica de que cuidado se trata.',
    'おけは洗濯、三角は漂白、四角は乾燥、アイロンはアイロン、円はクリーニング店の手入れです。四角の中に円があればタンブル乾燥、円がなく線だけなら自然乾燥です。表示は左からこの五つの順に並ぶのが普通なので、位置だけでもどの手入れかの見当がつきます。',
    'Ein Bottich steht fürs Waschen, ein Dreieck fürs Bleichen, ein Quadrat fürs Trocknen, ein Bügeleisen fürs Bügeln und ein Kreis für die professionelle Pflege in der Reinigung. Im Quadrat bedeutet ein Kreis den Trockner, blanke Striche das Trocknen an der Luft. Etiketten reihen diese fünf meist von links in dieser Ordnung, sodass schon die Stelle verrät, um welche Behandlung es geht.',
    'La cuve, c’est le lavage ; le triangle, le blanchiment ; le carré, le séchage ; le fer, le repassage ; le cercle, l’entretien professionnel chez le teinturier. Dans le carré, un cercle désigne le sèche-linge, des traits seuls le séchage à l’air. Les étiquettes alignent ces cinq de gauche à droite dans cet ordre, si bien que la place indique déjà le soin visé.',
    'टब धुलाई है, त्रिकोण ब्लीच, वर्ग सुखाना, इस्त्री इस्त्री और वृत्त दुकान पर होने वाली पेशेवर देखभाल। वर्ग के भीतर वृत्त हो तो मशीन से सुखाना, और वृत्त के बिना केवल रेखाएँ हों तो हवा में सुखाना। लेबल पर ये पाँच बाएँ से इसी क्रम में आते हैं, इसलिए जगह देखकर ही अंदाज़ा हो जाता है कि बात किस काम की है।',
    '盆是水洗，三角形是漂白，方形是干燥，熨斗是熨烫，圆形是洗衣店的专业打理。方形里面有圆的是滚筒烘干，没有圆只有线的是自然干燥。吊牌上这五个通常从左到右按这个次序排列，所以看位置就能猜到说的是哪一项。',
    '盆是水洗，三角形是漂白，方形是乾燥，熨斗是熨燙，圓形是洗衣店的專業打理。方形裡面有圓的是滾筒烘乾，沒有圓只有線的是自然乾燥。吊牌上這五個通常從左到右按這個次序排列，所以看位置就能猜到說的是哪一項。',
  ),

  dotsTitle: T(
    '점 개수가 온도다',
    'The dots are the temperature',
    'Los puntos son la temperatura',
    'Os pontos são a temperatura',
    '点の数が温度',
    'Die Punkte sind die Temperatur',
    'Les points font la température',
    'बिंदुओं की संख्या ही तापमान',
    '点的数量就是温度',
    '點的數量就是溫度',
  ),
  dotsNote: T(
    '물세탁은 점 1개 30°C, 2개 40°C, 3개 50°C, 4개 60°C, 5개 70°C, 6개 95°C입니다. 다림질은 점 1개 110°C, 2개 150°C, 3개 200°C이고, 기계건조는 점이 많을수록 높은 온도입니다. 이 자리 잡기 하나만 알면 표를 찾을 일이 없습니다 — 점을 세면 온도가 나옵니다.',
    'For washing, one dot is 30 °C, two 40, three 50, four 60, five 70 and six 95. For ironing, one dot is 110 °C, two 150 and three 200. For tumble drying, more dots simply mean more heat. That single mapping replaces the chart: count the dots and you have the temperature.',
    'En el lavado, un punto es 30 °C; dos, 40; tres, 50; cuatro, 60; cinco, 70 y seis, 95. En el planchado, un punto es 110 °C; dos, 150 y tres, 200. En la secadora, más puntos son simplemente más calor. Esa única correspondencia sustituye a la tabla: cuenta los puntos y tienes la temperatura.',
    'Na lavagem, um ponto é 30 °C; dois, 40; três, 50; quatro, 60; cinco, 70 e seis, 95. Ao passar a ferro, um ponto é 110 °C; dois, 150 e três, 200. Na secadora, mais pontos são simplesmente mais calor. Essa única correspondência dispensa a tabela: conte os pontos e tem a temperatura.',
    '洗濯は点1つで30°C、2つで40°C、3つで50°C、4つで60°C、5つで70°C、6つで95°Cです。アイロンは点1つで110°C、2つで150°C、3つで200°C、タンブル乾燥は点が多いほど高温です。この対応だけ覚えれば表は要りません — 点を数えれば温度が出ます。',
    'Beim Waschen steht ein Punkt für 30 °C, zwei für 40, drei für 50, vier für 60, fünf für 70 und sechs für 95. Beim Bügeln steht ein Punkt für 110 °C, zwei für 150 und drei für 200. Beim Trommeltrocknen heißt mehr Punkte einfach mehr Hitze. Diese eine Zuordnung ersetzt die Tabelle: Punkte zählen genügt.',
    'Au lavage, un point vaut 30 °C, deux 40, trois 50, quatre 60, cinq 70 et six 95. Au repassage, un point vaut 110 °C, deux 150 et trois 200. Au sèche-linge, plus de points veut simplement dire plus de chaleur. Cette seule correspondance remplace la table : comptez les points et vous avez la température.',
    'धुलाई में एक बिंदु 30 °C, दो 40, तीन 50, चार 60, पाँच 70 और छह 95 है। इस्त्री में एक बिंदु 110 °C, दो 150 और तीन 200 है; मशीन से सुखाने में जितने ज़्यादा बिंदु, उतना ज़्यादा ताप। यही एक जोड़ तालिका की जगह ले लेता है — बिंदु गिनिए, तापमान मिल गया।',
    '水洗时一个点是 30°C，两个 40，三个 50，四个 60，五个 70，六个 95。熨烫时一个点是 110°C，两个 150，三个 200；机器烘干则是点越多温度越高。记住这一条对应就不用查表 — 数点就知道温度。',
    '水洗時一個點是 30°C，兩個 40，三個 50，四個 60，五個 70，六個 95。熨燙時一個點是 110°C，兩個 150，三個 200；機器烘乾則是點越多溫度越高。記住這一條對應就不用查表 — 數點就知道溫度。',
  ),

  barsTitle: T(
    '밑줄 개수가 세기다',
    'The bars are how gentle',
    'Las barras son la suavidad',
    'As barras são a suavidade',
    '下線の数が強さ',
    'Die Balken sind die Schonung',
    'Les barres font la douceur',
    'नीचे की रेखाएँ नरमी बताती हैं',
    '下划线的数量就是强度',
    '底線的數量就是強度',
  ),
  barsNote: T(
    '밑줄이 없으면 보통, 하나면 약하게, 둘이면 아주 약하게입니다. 세탁기에서는 물살과 탈수를 줄이라는 말이고, 건조기에서는 돌리는 힘을 줄이라는 말입니다. 밑줄은 물세탁·기계건조·전문 관리에만 붙습니다 — 표백과 다림질과 자연건조에는 붙을 자리가 없습니다.',
    'No bar is the normal process, one bar is gentle, two bars are very gentle. In a washing machine that means less agitation and a slower spin; in a dryer, less tumbling. Bars only ever appear under washing, tumble drying and professional care — bleaching, ironing and natural drying have no place for them.',
    'Sin barra, el proceso es el normal; una barra es suave y dos, muy suave. En la lavadora eso significa menos agitación y centrifugado más corto; en la secadora, menos volteo. Las barras solo aparecen bajo el lavado, la secadora y el cuidado profesional: el blanqueo, el planchado y el secado al aire no tienen sitio para ellas.',
    'Sem barra, o processo é o normal; uma barra é suave e duas, muito suave. Na máquina isso quer dizer menos agitação e centrifugação mais curta; na secadora, menos revolvimento. As barras só aparecem sob a lavagem, a secadora e o cuidado profissional: alvejamento, ferro e secagem ao ar não têm lugar para elas.',
    '下線がなければ通常、1本なら弱く、2本ならとても弱くです。洗濯機では水流と脱水を抑えること、乾燥機では回す力を抑えることを指します。下線が付くのは洗濯・タンブル乾燥・専門の手入れだけで、漂白とアイロンと自然乾燥には付く場所がありません。',
    'Kein Balken heißt normales Verfahren, ein Balken schonend, zwei Balken sehr schonend. In der Maschine bedeutet das weniger Bewegung und kürzeres Schleudern, im Trockner weniger Trommelbewegung. Balken stehen nur unter Waschen, Trommeltrocknen und professioneller Pflege — Bleichen, Bügeln und Lufttrocknen haben keinen Platz dafür.',
    'Sans barre, le procédé est normal ; une barre, c’est doux ; deux barres, très doux. En machine, cela veut dire moins d’agitation et un essorage plus court ; au sèche-linge, moins de brassage. Les barres n’apparaissent que sous le lavage, le séchage en tambour et l’entretien professionnel — le blanchiment, le repassage et le séchage à l’air n’en ont pas.',
    'कोई रेखा नहीं तो प्रक्रिया सामान्य, एक रेखा हल्की, दो रेखाएँ बहुत हल्की। मशीन में इसका अर्थ है कम हलचल और कम स्पिन; ड्रायर में कम घुमाव। रेखाएँ केवल धुलाई, मशीन से सुखाने और पेशेवर देखभाल के नीचे आती हैं — ब्लीच, इस्त्री और हवा में सुखाने में उनकी जगह ही नहीं है।',
    '没有下划线是普通，一条是轻柔，两条是非常轻柔。在洗衣机里意思是减小水流和脱水，在烘干机里是减小翻滚。下划线只会出现在水洗、机器烘干和专业打理下面 — 漂白、熨烫和自然干燥没有它的位置。',
    '沒有底線是普通，一條是輕柔，兩條是非常輕柔。在洗衣機裡意思是減小水流和脫水，在烘乾機裡是減小翻滾。底線只會出現在水洗、機器烘乾和專業打理下面 — 漂白、熨燙和自然乾燥沒有它的位置。',
  ),

  crossTitle: T(
    '×표는 하지 말라는 뜻이다',
    'A cross means do not',
    'La cruz significa que no',
    'A cruz significa que não',
    '×は「しない」という意味',
    'Ein Kreuz heißt: gar nicht',
    'Une croix veut dire : jamais',
    'क्रॉस का अर्थ है मनाही',
    '打叉表示不要做',
    '打叉表示不要做',
  ),
  crossNote: T(
    '어느 도형에든 ×표가 얹히면 그 손질을 하지 말라는 뜻입니다. 이 한 가지는 뒤바꾸면 옷을 버리는 자리이므로, 이 표에서는 금지 칸의 이름과 뜻에 반드시 금지라는 말을 넣고 허용 칸에는 한 번도 넣지 않았습니다. 그래서 스팀을 못 쓰는 자리도 "스팀 없이"로 적습니다.',
    'A cross laid over any shape rules that treatment out. This is the one reading you cannot afford to get backwards, so on this site every forbidden cell carries an explicit "do not" in its name and its meaning, and no permitted cell ever does — which is why a symbol that bars steam is written "without steam" instead.',
    'Una cruz sobre cualquier forma descarta ese cuidado. Es la lectura que no se puede invertir sin arruinar la prenda, así que aquí cada casilla prohibida lleva la palabra en su nombre y en su significado, y ninguna casilla permitida la lleva: por eso el símbolo que veta el vapor se escribe «sin vapor».',
    'Uma cruz sobre qualquer forma exclui aquele cuidado. É a leitura que não se pode inverter sem estragar a peça, então aqui cada casa proibida traz a palavra no nome e no significado, e nenhuma casa permitida a traz: por isso o símbolo que veta o vapor aparece como «sem vapor».',
    'どの形でも×が重なれば、その手入れをしないという意味です。これだけは逆に読むと衣類を捨てることになるので、この表では禁止のマスの名前と意味に必ず禁止という語を入れ、許されるマスには一度も入れていません。だからスチームが使えない表示も「スチームなし」と書きます。',
    'Ein Kreuz über einer Form schließt die Behandlung aus. Diese Lesart darf man nicht verdrehen, sonst ist das Stück hin: Darum trägt hier jedes verbotene Feld das Wort in Namen und Bedeutung, und kein erlaubtes Feld trägt es — weshalb ein Zeichen ohne Dampf auch „ohne Dampf“ heißt.',
    'Une croix posée sur n’importe quelle forme écarte le soin. C’est la lecture qu’on ne peut pas inverser sans abîmer le vêtement : chaque case interdite porte donc le mot dans son nom et dans sa signification, et aucune case autorisée ne le porte — d’où « sans vapeur » pour le symbole qui coupe la vapeur.',
    'किसी भी आकृति पर क्रॉस हो तो वह काम मना है। यही एक पाठ है जिसे उलटा पढ़ने पर कपड़ा जाता है, इसलिए यहाँ हर मना खाने के नाम और अर्थ में वह शब्द रखा गया है और किसी छूट वाले खाने में नहीं — इसीलिए भाप रोकने वाला चिह्न «भाप के बिना» लिखा जाता है।',
    '任何形状上打了叉，就是不要做那一项。这一条读反了衣服就废了，所以这里每个禁止的格子在名称和含义里都写明禁止，允许的格子一次也不写 — 因此不能用蒸汽的那一格写作「不用蒸汽」。',
    '任何形狀上打了叉，就是不要做那一項。這一條讀反了衣服就廢了，所以這裡每個禁止的格子在名稱和含義裡都寫明禁止，允許的格子一次也不寫 — 因此不能用蒸汽的那一格寫作「不用蒸汽」。',
  ),

  standardTitle: T(
    '규격마다 다른 대목이 있다',
    'The standards do not fully agree',
    'Las normas no coinciden del todo',
    'As normas não coincidem em tudo',
    '規格によって違うところがある',
    'Die Normen sind nicht deckungsgleich',
    'Les normes ne se recouvrent pas',
    'मानकों में कुछ अंतर हैं',
    '各规格之间有出入',
    '各規格之間有出入',
  ),
  standardNote: T(
    '온도를 통 안에 숫자로 적는 것이 ISO 3758·GINETEX·JIS L 0001이고, 점으로 적는 것이 북미 ASTM D5489입니다. 그래서 같은 뜻이 두 그림으로 나오고, 이 표는 둘을 따로 실었습니다. 일본은 2016년에 표기를 ISO에 맞춰 바꾸었으므로 그전에 산 옷은 그림이 다릅니다. 기계건조의 점도 규격에 따라 단계 수가 다릅니다 — ISO는 점 1개를 60°C, 2개를 80°C로 적고, 점 세 개는 북미 쪽 표기입니다. 확실하지 않은 대목은 넣지 않았습니다.',
    'ISO 3758, GINETEX and JIS L 0001 write the temperature as a figure inside the tub; North America (ASTM D5489) writes it as dots. The same instruction therefore appears as two different pictures, and both are listed here. Japan switched to the ISO set in 2016, so a garment bought before that carries different pictures. Tumble-dry dots differ too: ISO gives one dot as 60 °C and two as 80 °C, while three dots belong to the North American set. Anything we could not pin down is left out rather than guessed.',
    'ISO 3758, GINETEX y JIS L 0001 escriben la temperatura como cifra dentro de la cuba; Norteamérica (ASTM D5489) la escribe con puntos. La misma indicación aparece así en dos dibujos distintos, y aquí están los dos. Japón pasó al juego de la ISO en 2016, así que una prenda anterior lleva otros dibujos. Los puntos de la secadora también difieren: la ISO da un punto como 60 °C y dos como 80 °C, mientras que tres puntos pertenecen al juego norteamericano. Lo que no pudimos confirmar se queda fuera en vez de inventarse.',
    'A ISO 3758, a GINETEX e a JIS L 0001 escrevem a temperatura como número dentro do tanque; a América do Norte (ASTM D5489) escreve com pontos. A mesma indicação aparece então em dois desenhos, e aqui estão os dois. O Japão passou ao conjunto da ISO em 2016, então uma peça anterior traz outros desenhos. Os pontos da secadora também divergem: a ISO dá um ponto como 60 °C e dois como 80 °C, enquanto três pontos pertencem ao conjunto norte-americano. O que não pudemos confirmar fica de fora em vez de ser inventado.',
    '温度をおけの中に数字で書くのがISO 3758・GINETEX・JIS L 0001で、点で書くのが北米のASTM D5489です。同じ意味が二通りの絵になるので、この表では両方を別に載せています。日本は2016年に表示をISOに合わせて変えたため、それ以前に買った服は絵が違います。タンブル乾燥の点も規格で段の数が違い、ISOは点1つを60°C、2つを80°Cとし、点3つは北米側の書き方です。確かめられなかったところは推測せず入れていません。',
    'ISO 3758, GINETEX und JIS L 0001 schreiben die Temperatur als Zahl in den Bottich; Nordamerika (ASTM D5489) schreibt sie mit Punkten. Dieselbe Anweisung erscheint so in zwei Bildern, und beide stehen hier. Japan hat 2016 auf den ISO-Satz umgestellt, ältere Stücke tragen darum andere Bilder. Auch die Punkte am Trockner gehen auseinander: ISO nennt einen Punkt 60 °C und zwei 80 °C, drei Punkte gehören zum nordamerikanischen Satz. Was wir nicht belegen konnten, bleibt weg statt geraten zu werden.',
    'ISO 3758, GINETEX et JIS L 0001 inscrivent la température en chiffre dans la cuve ; l’Amérique du Nord (ASTM D5489) l’écrit en points. La même consigne donne donc deux dessins, et les deux figurent ici. Le Japon est passé au jeu ISO en 2016 : un vêtement plus ancien porte d’autres dessins. Les points du sèche-linge diffèrent aussi : l’ISO donne un point pour 60 °C et deux pour 80 °C, tandis que trois points relèvent du jeu nord-américain. Ce que nous n’avons pas pu établir est laissé de côté plutôt que deviné.',
    'ISO 3758, GINETEX और JIS L 0001 तापमान को टब के भीतर अंक में लिखते हैं; उत्तर अमेरिका (ASTM D5489) उसे बिंदुओं से लिखता है। इसलिए एक ही निर्देश दो चित्रों में आता है और यहाँ दोनों अलग-अलग दिए हैं। जापान ने 2016 में अपना अंकन ISO के अनुसार बदल दिया, इसलिए उससे पहले के कपड़ों पर चित्र दूसरे हैं। ड्रायर के बिंदु भी भिन्न हैं — ISO एक बिंदु को 60 °C और दो को 80 °C कहता है, और तीन बिंदु उत्तर अमेरिकी अंकन के हैं। जो पक्का नहीं हो सका, उसे अनुमान से भरने के बजाय छोड़ दिया है।',
    '把温度写成盆里数字的是 ISO 3758、GINETEX 和 JIS L 0001，写成点的是北美的 ASTM D5489。同一个意思因此有两种画法，这里两种都分开列出。日本在 2016 年把标注改成与 ISO 一致，所以更早买的衣服图案不同。烘干的点数也因规格而异 — ISO 把一个点写作 60°C、两个点写作 80°C，三个点是北美那一套的写法。拿不准的地方宁可不写，也不猜。',
    '把溫度寫成盆裡數字的是 ISO 3758、GINETEX 和 JIS L 0001，寫成點的是北美的 ASTM D5489。同一個意思因此有兩種畫法，這裡兩種都分開列出。日本在 2016 年把標註改成與 ISO 一致，所以更早買的衣服圖案不同。烘乾的點數也因規格而異 — ISO 把一個點寫作 60°C、兩個點寫作 80°C，三個點是北美那一套的寫法。拿不準的地方寧可不寫，也不猜。',
  ),

  tableTitle: T('갈래별로 보기', 'By family', 'Por familia', 'Por família', '分類ごとに見る', 'Nach Gruppe', 'Par famille', 'वर्ग के अनुसार', '按类别查看', '按類別查看'),
  neighbourTitle: T('가까운 기호', 'Nearby symbols', 'Símbolos cercanos', 'Símbolos próximos', '近い表示', 'Ähnliche Zeichen', 'Symboles voisins', 'पास के चिह्न', '相近的标志', '相近的標誌'),
  familyRowTitle: T('같은 갈래의 다른 기호', 'Others in the same family', 'Otros de la misma familia', 'Outros da mesma família', '同じ分類の他の表示', 'Andere in derselben Gruppe', 'Autres de la même famille', 'इसी वर्ग के दूसरे चिह्न', '同类别的其他标志', '同類別的其他標誌'),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '바탕 도형이 손질을 정합니다 — 통은 물세탁, 삼각형은 표백, 사각형은 건조, 다리미는 다림질, 원은 전문 관리입니다.',
      '점 개수가 온도입니다 — 물세탁은 점 1개 30°C부터 6개 95°C까지, 다림질은 1개 110°C·2개 150°C·3개 200°C입니다.',
      '밑줄 개수가 세기입니다 — 없으면 보통, 하나면 약하게, 둘이면 아주 약하게입니다.',
      '×표는 하지 말라는 뜻입니다. 금지와 허용을 뒤바꾸면 한 번 빨아서 옷이 못 쓰게 됩니다.',
    ],
    [
      'The base shape sets the treatment: tub for washing, triangle for bleaching, square for drying, iron for ironing, circle for professional care.',
      'The dots set the temperature: washing runs from one dot at 30 °C to six at 95 °C, ironing is 110 °C, 150 °C and 200 °C for one, two and three dots.',
      'The bars set how gentle: none is normal, one is gentle, two is very gentle.',
      'A cross means do not. Read a ban as permission and one wash is enough to finish the garment.',
    ],
    [
      'La forma base fija el cuidado: cuba para lavar, triángulo para blanquear, cuadrado para secar, plancha para planchar, círculo para el cuidado profesional.',
      'Los puntos fijan la temperatura: el lavado va de un punto a 30 °C hasta seis a 95 °C; el planchado es 110, 150 y 200 °C para uno, dos y tres puntos.',
      'Las barras fijan la suavidad: ninguna es normal, una es suave, dos son muy suaves.',
      'La cruz descarta el cuidado. Leer una prohibición como permiso arruina la prenda en un solo lavado.',
    ],
    [
      'A forma base fixa o cuidado: tanque para lavar, triângulo para alvejar, quadrado para secar, ferro para passar, círculo para o cuidado profissional.',
      'Os pontos fixam a temperatura: a lavagem vai de um ponto a 30 °C até seis a 95 °C; o ferro é 110, 150 e 200 °C para um, dois e três pontos.',
      'As barras fixam a suavidade: nenhuma é normal, uma é suave, duas são muito suaves.',
      'A cruz exclui o cuidado. Ler uma proibição como permissão estraga a peça em uma única lavagem.',
    ],
    [
      '土台の形が手入れを決めます — おけは洗濯、三角は漂白、四角は乾燥、アイロンはアイロン、円は専門の手入れです。',
      '点の数が温度です — 洗濯は点1つの30°Cから6つの95°Cまで、アイロンは1つ110°C・2つ150°C・3つ200°Cです。',
      '下線の数が強さです — なければ通常、1本なら弱く、2本ならとても弱くです。',
      '×は「しない」という意味です。禁止と許可を逆に読めば、一度洗っただけで衣類が使えなくなります。',
    ],
    [
      'Die Grundform legt die Behandlung fest: Bottich fürs Waschen, Dreieck fürs Bleichen, Quadrat fürs Trocknen, Bügeleisen fürs Bügeln, Kreis für die professionelle Pflege.',
      'Die Punkte legen die Temperatur fest: Waschen reicht von einem Punkt bei 30 °C bis sechs bei 95 °C, Bügeln heißt 110, 150 und 200 °C bei einem, zwei und drei Punkten.',
      'Die Balken legen die Schonung fest: keiner ist normal, einer schonend, zwei sehr schonend.',
      'Ein Kreuz heißt: gar nicht. Wer ein Verbot als Erlaubnis liest, ruiniert das Stück in einem Waschgang.',
    ],
    [
      'La forme de base fixe le soin : cuve pour le lavage, triangle pour le blanchiment, carré pour le séchage, fer pour le repassage, cercle pour l’entretien professionnel.',
      'Les points fixent la température : le lavage va d’un point à 30 °C jusqu’à six à 95 °C ; le repassage vaut 110, 150 et 200 °C pour un, deux et trois points.',
      'Les barres fixent la douceur : aucune, c’est normal ; une, c’est doux ; deux, très doux.',
      'Une croix veut dire : jamais. Lire un interdit comme une permission suffit à perdre le vêtement en un lavage.',
    ],
    [
      'आधार आकृति काम तय करती है: टब धुलाई, त्रिकोण ब्लीच, वर्ग सुखाना, इस्त्री इस्त्री, वृत्त पेशेवर देखभाल।',
      'बिंदु तापमान तय करते हैं: धुलाई एक बिंदु पर 30 °C से छह बिंदु पर 95 °C तक; इस्त्री एक, दो और तीन बिंदु पर 110, 150 और 200 °C।',
      'नीचे की रेखाएँ नरमी तय करती हैं: कोई नहीं तो सामान्य, एक तो हल्की, दो तो बहुत हल्की।',
      'क्रॉस का अर्थ है मनाही। मनाही को छूट समझ लेने पर एक ही धुलाई में कपड़ा बेकार हो जाता है।',
    ],
    [
      '底层形状定下打理的种类：盆是水洗，三角形是漂白，方形是干燥，熨斗是熨烫，圆形是专业打理。',
      '点的数量定温度：水洗从一个点 30°C 到六个点 95°C，熨烫是一个点 110°C、两个 150°C、三个 200°C。',
      '下划线的数量定强度：没有是普通，一条是轻柔，两条是非常轻柔。',
      '打叉表示不要做。把禁止读成允许，洗一次衣服就废了。',
    ],
    [
      '底層形狀定下打理的種類：盆是水洗，三角形是漂白，方形是乾燥，熨斗是熨燙，圓形是專業打理。',
      '點的數量定溫度：水洗從一個點 30°C 到六個點 95°C，熨燙是一個點 110°C、兩個 150°C、三個 200°C。',
      '底線的數量定強度：沒有是普通，一條是輕柔，兩條是非常輕柔。',
      '打叉表示不要做。把禁止讀成允許，洗一次衣服就廢了。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '세탁 기호 뜻 86가지 — 옷 라벨 그림 읽는 법',
    'Laundry symbols explained — all 86 care label pictures',
    'Símbolos de lavado explicados: las 86 imágenes de la etiqueta',
    'Símbolos de lavagem explicados: as 86 imagens da etiqueta',
    '洗濯表示の意味86種 — 衣類の絵表示の読み方',
    'Pflegesymbole erklärt — alle 86 Zeichen auf dem Etikett',
    'Symboles d’entretien expliqués — les 86 dessins de l’étiquette',
    'धुलाई के चिह्नों का अर्थ — लेबल के सभी 86 चित्र',
    '洗涤标志含义 86 种 — 衣服吊牌图案怎么读',
    '洗滌標誌含義 86 種 — 衣服吊牌圖案怎麼讀',
  ),
  hubMetaDesc: T(
    '통·삼각형·사각형·다리미·원 다섯 갈래 86가지를 그림과 함께 풀었습니다. 점 개수가 온도(물세탁 30~95°C, 다림질 110~200°C), 밑줄 개수가 세기, ×표는 금지입니다. 규격(ISO 3758·GINETEX·JIS·ASTM)마다 다른 대목도 함께 밝혔습니다.',
    'All 86 symbols across five families — tub, triangle, square, iron, circle — drawn and explained. Dots give the temperature (30–95 °C for washing, 110–200 °C for ironing), bars give how gentle, a cross forbids. Where ISO 3758, GINETEX, JIS and ASTM differ is spelled out.',
    'Los 86 símbolos de cinco familias —cuba, triángulo, cuadrado, plancha y círculo— dibujados y explicados. Los puntos dan la temperatura (30–95 °C al lavar, 110–200 °C al planchar), las barras la suavidad y la cruz prohíbe. También se explica en qué difieren ISO 3758, GINETEX, JIS y ASTM.',
    'Os 86 símbolos de cinco famílias — tanque, triângulo, quadrado, ferro e círculo — desenhados e explicados. Os pontos dão a temperatura (30–95 °C na lavagem, 110–200 °C no ferro), as barras a suavidade e a cruz proíbe. Também se explica onde ISO 3758, GINETEX, JIS e ASTM divergem.',
    'おけ・三角・四角・アイロン・円の五分類86種を絵とともに説明します。点の数が温度(洗濯30~95°C、アイロン110~200°C)、下線の数が強さ、×は禁止です。規格(ISO 3758・GINETEX・JIS・ASTM)で違うところも明記しました。',
    'Alle 86 Zeichen aus fünf Gruppen — Bottich, Dreieck, Quadrat, Bügeleisen, Kreis — gezeichnet und erklärt. Punkte geben die Temperatur (30–95 °C beim Waschen, 110–200 °C beim Bügeln), Balken die Schonung, ein Kreuz verbietet. Wo ISO 3758, GINETEX, JIS und ASTM auseinandergehen, steht dabei.',
    'Les 86 symboles de cinq familles — cuve, triangle, carré, fer, cercle — dessinés et expliqués. Les points donnent la température (30–95 °C au lavage, 110–200 °C au repassage), les barres la douceur, la croix interdit. Les écarts entre ISO 3758, GINETEX, JIS et ASTM sont précisés.',
    'पाँच वर्गों — टब, त्रिकोण, वर्ग, इस्त्री, वृत्त — के सभी 86 चिह्न चित्र के साथ समझाए गए हैं। बिंदु तापमान देते हैं (धुलाई 30–95 °C, इस्त्री 110–200 °C), रेखाएँ नरमी, और क्रॉस मनाही। ISO 3758, GINETEX, JIS और ASTM के बीच के अंतर भी बताए हैं।',
    '盆、三角形、方形、熨斗、圆形五个类别共 86 种标志，配图逐一解释。点的数量给出温度（水洗 30~95°C，熨烫 110~200°C），下划线给出强度，打叉表示禁止。ISO 3758、GINETEX、JIS 与 ASTM 之间的出入也一并写明。',
    '盆、三角形、方形、熨斗、圓形五個類別共 86 種標誌，配圖逐一解釋。點的數量給出溫度（水洗 30~95°C，熨燙 110~200°C），底線給出強度，打叉表示禁止。ISO 3758、GINETEX、JIS 與 ASTM 之間的出入也一併寫明。',
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '세탁 기호는 어떻게 읽나요?', a: '바탕 도형으로 손질의 종류를 보고, 얹힌 요소로 정도를 봅니다. 통은 물세탁, 삼각형은 표백, 사각형은 건조, 다리미는 다림질, 원은 전문 관리입니다. 점 개수가 온도, 밑줄 개수가 세기이고, ×표가 있으면 하지 말라는 뜻입니다.' },
      { q: '점 개수는 몇 도를 뜻하나요?', a: '물세탁은 점 1개 30°C, 2개 40°C, 3개 50°C, 4개 60°C, 5개 70°C, 6개 95°C입니다. 다림질은 점 1개 110°C, 2개 150°C, 3개 200°C입니다. 기계건조는 점이 많을수록 높은 온도이고, 단계 수와 실제 온도는 규격마다 다릅니다.' },
      { q: '나라마다 기호가 다른가요?', a: '온도를 통 안에 숫자로 적는 것이 ISO 3758·GINETEX·JIS L 0001이고, 점으로 적는 것이 북미 ASTM D5489입니다. 일본은 2016년에 표기를 ISO에 맞춰 바꾸었습니다. 그래서 같은 뜻이 두 그림으로 나오고, 이 표는 둘을 따로 실었습니다.' },
    ],
    [
      { q: 'How do I read a care label?', a: 'The base shape tells you which treatment, the marks on it tell you how far. Tub is washing, triangle is bleaching, square is drying, iron is ironing, circle is professional care. Dots give the temperature, bars give how gentle, and a cross means do not do it at all.' },
      { q: 'What temperature is each dot?', a: 'For washing, one dot is 30 °C, two 40, three 50, four 60, five 70 and six 95. For ironing, one dot is 110 °C, two 150 and three 200. For tumble drying, more dots mean more heat, though the number of steps and the actual degrees vary between standards.' },
      { q: 'Do the symbols differ by country?', a: 'ISO 3758, GINETEX and JIS L 0001 put the temperature in the tub as a figure; North America (ASTM D5489) uses dots instead. Japan moved to the ISO set in 2016. The same instruction therefore has two pictures, and both are listed separately here.' },
    ],
    [
      { q: '¿Cómo se lee una etiqueta de cuidado?', a: 'La forma base dice de qué cuidado se trata y las marcas encima, hasta dónde. Cuba es lavado, triángulo blanqueo, cuadrado secado, plancha planchado y círculo cuidado profesional. Los puntos dan la temperatura, las barras la suavidad y la cruz descarta el cuidado por completo.' },
      { q: '¿Qué temperatura es cada punto?', a: 'En el lavado, un punto es 30 °C; dos, 40; tres, 50; cuatro, 60; cinco, 70 y seis, 95. En el planchado, un punto es 110 °C; dos, 150 y tres, 200. En la secadora, más puntos son más calor, aunque el número de pasos y los grados varían entre normas.' },
      { q: '¿Cambian los símbolos según el país?', a: 'ISO 3758, GINETEX y JIS L 0001 ponen la temperatura como cifra dentro de la cuba; Norteamérica (ASTM D5489) usa puntos. Japón adoptó el juego de la ISO en 2016. La misma indicación tiene por eso dos dibujos, y aquí figuran los dos por separado.' },
    ],
    [
      { q: 'Como se lê uma etiqueta de cuidado?', a: 'A forma base diz de que cuidado se trata e as marcas em cima, até onde. Tanque é lavagem, triângulo alvejamento, quadrado secagem, ferro passar a ferro e círculo cuidado profissional. Os pontos dão a temperatura, as barras a suavidade e a cruz exclui o cuidado por completo.' },
      { q: 'Que temperatura é cada ponto?', a: 'Na lavagem, um ponto é 30 °C; dois, 40; três, 50; quatro, 60; cinco, 70 e seis, 95. Ao passar a ferro, um ponto é 110 °C; dois, 150 e três, 200. Na secadora, mais pontos são mais calor, embora o número de passos e os graus variem entre normas.' },
      { q: 'Os símbolos mudam de país para país?', a: 'ISO 3758, GINETEX e JIS L 0001 põem a temperatura como número dentro do tanque; a América do Norte (ASTM D5489) usa pontos. O Japão adotou o conjunto da ISO em 2016. A mesma indicação tem por isso dois desenhos, e aqui os dois aparecem separados.' },
    ],
    [
      { q: '洗濯表示はどう読みますか。', a: '土台の形で手入れの種類を見て、上に載った要素で程度を見ます。おけは洗濯、三角は漂白、四角は乾燥、アイロンはアイロン、円は専門の手入れです。点の数が温度、下線の数が強さで、×があれば行わないという意味です。' },
      { q: '点の数は何度を指しますか。', a: '洗濯は点1つで30°C、2つで40°C、3つで50°C、4つで60°C、5つで70°C、6つで95°Cです。アイロンは点1つで110°C、2つで150°C、3つで200°Cです。タンブル乾燥は点が多いほど高温ですが、段の数と実際の温度は規格で違います。' },
      { q: '国によって表示が違いますか。', a: '温度をおけの中に数字で書くのがISO 3758・GINETEX・JIS L 0001で、点で書くのが北米のASTM D5489です。日本は2016年に表示をISOに合わせて変えました。同じ意味が二通りの絵になるため、この表では両方を別に載せています。' },
    ],
    [
      { q: 'Wie liest man ein Pflegeetikett?', a: 'Die Grundform nennt die Behandlung, die Zeichen darauf das Maß. Bottich heißt Waschen, Dreieck Bleichen, Quadrat Trocknen, Bügeleisen Bügeln, Kreis professionelle Pflege. Punkte geben die Temperatur, Balken die Schonung, und ein Kreuz heißt: gar nicht.' },
      { q: 'Welche Temperatur steht hinter den Punkten?', a: 'Beim Waschen ist ein Punkt 30 °C, zwei sind 40, drei 50, vier 60, fünf 70 und sechs 95. Beim Bügeln ist ein Punkt 110 °C, zwei sind 150 und drei 200. Beim Trockner heißt mehr Punkte mehr Hitze, wobei Stufenzahl und Gradzahl je Norm abweichen.' },
      { q: 'Sind die Zeichen von Land zu Land gleich?', a: 'ISO 3758, GINETEX und JIS L 0001 setzen die Temperatur als Zahl in den Bottich, Nordamerika (ASTM D5489) nimmt Punkte. Japan ist 2016 auf den ISO-Satz umgestiegen. Dieselbe Anweisung hat darum zwei Bilder, und beide stehen hier getrennt.' },
    ],
    [
      { q: 'Comment lire une étiquette d’entretien ?', a: 'La forme de base dit quel soin, les marques posées dessus disent jusqu’où. La cuve, c’est le lavage ; le triangle, le blanchiment ; le carré, le séchage ; le fer, le repassage ; le cercle, l’entretien professionnel. Les points donnent la température, les barres la douceur, et une croix veut dire : jamais.' },
      { q: 'À quelle température correspond chaque point ?', a: 'Au lavage, un point vaut 30 °C, deux 40, trois 50, quatre 60, cinq 70 et six 95. Au repassage, un point vaut 110 °C, deux 150 et trois 200. Au sèche-linge, plus de points veut dire plus de chaleur, mais le nombre de crans et les degrés varient selon les normes.' },
      { q: 'Les symboles changent-ils selon le pays ?', a: 'ISO 3758, GINETEX et JIS L 0001 mettent la température en chiffre dans la cuve ; l’Amérique du Nord (ASTM D5489) emploie des points. Le Japon est passé au jeu ISO en 2016. La même consigne a donc deux dessins, et les deux figurent ici séparément.' },
    ],
    [
      { q: 'लेबल कैसे पढ़ें?', a: 'आधार आकृति बताती है कि कौन-सा काम है और उस पर लगे चिह्न बताते हैं कि कितना। टब धुलाई, त्रिकोण ब्लीच, वर्ग सुखाना, इस्त्री इस्त्री और वृत्त पेशेवर देखभाल है। बिंदु तापमान देते हैं, रेखाएँ नरमी, और क्रॉस हो तो वह काम बिलकुल मना है।' },
      { q: 'हर बिंदु कितने तापमान का है?', a: 'धुलाई में एक बिंदु 30 °C, दो 40, तीन 50, चार 60, पाँच 70 और छह 95 है। इस्त्री में एक बिंदु 110 °C, दो 150 और तीन 200 है। मशीन से सुखाने में जितने ज़्यादा बिंदु उतना ज़्यादा ताप, पर पायदानों की गिनती और असली डिग्री मानक के अनुसार बदलती है।' },
      { q: 'क्या देश के अनुसार चिह्न बदलते हैं?', a: 'ISO 3758, GINETEX और JIS L 0001 तापमान को टब के भीतर अंक में लिखते हैं; उत्तर अमेरिका (ASTM D5489) बिंदुओं से लिखता है। जापान ने 2016 में ISO वाला सेट अपनाया। इसलिए एक ही निर्देश के दो चित्र होते हैं और यहाँ दोनों अलग-अलग दिए गए हैं।' },
    ],
    [
      { q: '洗涤标志怎么读？', a: '先看底层形状是哪一种打理，再看上面加了什么来判断程度。盆是水洗，三角形是漂白，方形是干燥，熨斗是熨烫，圆形是专业打理。点的数量给温度，下划线的数量给强度，有打叉就是完全不要做。' },
      { q: '点的数量各是多少度？', a: '水洗时一个点 30°C，两个 40，三个 50，四个 60，五个 70，六个 95。熨烫时一个点 110°C，两个 150，三个 200。机器烘干是点越多温度越高，但分几级、实际多少度，各规格并不一致。' },
      { q: '各国的标志一样吗？', a: '把温度写成盆里数字的是 ISO 3758、GINETEX 和 JIS L 0001，写成点的是北美的 ASTM D5489。日本在 2016 年改用 ISO 那一套。同一个意思因此有两种画法，这里两种都分开列出。' },
    ],
    [
      { q: '洗滌標誌怎麼讀？', a: '先看底層形狀是哪一種打理，再看上面加了什麼來判斷程度。盆是水洗，三角形是漂白，方形是乾燥，熨斗是熨燙，圓形是專業打理。點的數量給溫度，底線的數量給強度，有打叉就是完全不要做。' },
      { q: '點的數量各是多少度？', a: '水洗時一個點 30°C，兩個 40，三個 50，四個 60，五個 70，六個 95。熨燙時一個點 110°C，兩個 150，三個 200。機器烘乾是點越多溫度越高，但分幾級、實際多少度，各規格並不一致。' },
      { q: '各國的標誌一樣嗎？', a: '把溫度寫成盆裡數字的是 ISO 3758、GINETEX 和 JIS L 0001，寫成點的是北美的 ASTM D5489。日本在 2016 年改用 ISO 那一套。同一個意思因此有兩種畫法，這裡兩種都分開列出。' },
    ],
  ),

  metaTitleOf: T<(name: string) => string>(
    n => `${n} — 세탁 기호 뜻`,
    n => `${n} — laundry symbol meaning`,
    n => `${n} — significado del símbolo de lavado`,
    n => `${n} — significado do símbolo de lavagem`,
    n => `${n} — 洗濯表示の意味`,
    n => `${n} — Bedeutung des Pflegesymbols`,
    n => `${n} — signification du symbole d’entretien`,
    n => `${n} — धुलाई चिह्न का अर्थ`,
    n => `${n} — 洗涤标志的含义`,
    n => `${n} — 洗滌標誌的含義`,
  ),

  metaDescOf: T<(name: string, mean: string) => string>(
    (n, m) => `${m} 점 개수가 온도, 밑줄 개수가 세기이고 ×표는 하지 말라는 뜻입니다. 규격(ISO 3758·GINETEX·JIS L 0001·ASTM D5489)마다 다른 대목도 함께 적었습니다.`,
    (n, m) => `${m} Dots give the temperature, bars give how gentle, and a cross rules the treatment out. Where ISO 3758, GINETEX, JIS L 0001 and ASTM D5489 differ is spelled out too.`,
    (n, m) => `${m} Los puntos dan la temperatura, las barras la suavidad y la cruz descarta el cuidado. También se indica en qué difieren ISO 3758, GINETEX, JIS L 0001 y ASTM D5489.`,
    (n, m) => `${m} Os pontos dão a temperatura, as barras a suavidade e a cruz exclui o cuidado. Também se indica onde ISO 3758, GINETEX, JIS L 0001 e ASTM D5489 divergem.`,
    (n, m) => `${m} 点の数が温度、下線の数が強さで、×はしないという意味です。規格(ISO 3758・GINETEX・JIS L 0001・ASTM D5489)で違うところも記しました。`,
    (n, m) => `${m} Punkte geben die Temperatur, Balken die Schonung, und ein Kreuz schließt die Behandlung aus. Wo ISO 3758, GINETEX, JIS L 0001 und ASTM D5489 abweichen, steht dabei.`,
    (n, m) => `${m} Les points donnent la température, les barres la douceur, et une croix écarte le soin. Les écarts entre ISO 3758, GINETEX, JIS L 0001 et ASTM D5489 sont précisés.`,
    (n, m) => `${m} बिंदु तापमान देते हैं, रेखाएँ नरमी, और क्रॉस उस काम को रोक देता है। ISO 3758, GINETEX, JIS L 0001 और ASTM D5489 के बीच के अंतर भी लिखे हैं।`,
    (n, m) => `${m} 点的数量给温度，下划线的数量给强度，打叉表示不要做。ISO 3758、GINETEX、JIS L 0001 与 ASTM D5489 之间的出入也一并写明。`,
    (n, m) => `${m} 點的數量給溫度，底線的數量給強度，打叉表示不要做。ISO 3758、GINETEX、JIS L 0001 與 ASTM D5489 之間的出入也一併寫明。`,
  ),

  cellFaqOf: T<(name: string, mean: string, f: LaundryFacts) => FaqItem[]>(
    (n, m, f) => [
      { q: `${n} 기호는 무슨 뜻인가요?`, a: m },
      { q: '이 그림의 점과 밑줄은 어떻게 읽나요?', a: `이 그림에는 점이 ${f.dots}개, 밑줄이 ${f.bars}개 있습니다. 점 개수는 온도를, 밑줄 개수는 세기를 가리킵니다 — 밑줄이 없으면 보통, 하나면 약하게, 둘이면 아주 약하게입니다.` },
      { q: '규격마다 다른가요?', a: '온도를 숫자로 적는 것이 ISO 3758·GINETEX·JIS L 0001이고, 점으로 적는 것이 북미 ASTM D5489입니다. 일본은 2016년에 표기를 ISO에 맞춰 바꾸었으므로 그전에 산 옷은 그림이 다릅니다.' },
    ],
    (n, m, f) => [
      { q: `What does ${n} mean on a label?`, a: m },
      { q: 'How do I read the dots and bars here?', a: `This symbol carries ${f.dots} dot${f.dots === 1 ? '' : 's'} and ${f.bars} bar${f.bars === 1 ? '' : 's'}. Dots stand for temperature and bars for how gentle the process must be — none is normal, one is gentle, two are very gentle.` },
      { q: 'Does it differ between standards?', a: 'ISO 3758, GINETEX and JIS L 0001 write the temperature as a figure; North America (ASTM D5489) writes it as dots. Japan switched to the ISO set in 2016, so older garments carry different pictures.' },
    ],
    (n, m, f) => [
      { q: `¿Qué significa ${n} en una etiqueta?`, a: m },
      { q: '¿Cómo se leen aquí los puntos y las barras?', a: `Este símbolo lleva ${f.dots} punto${f.dots === 1 ? '' : 's'} y ${f.bars} barra${f.bars === 1 ? '' : 's'}. Los puntos indican la temperatura y las barras cuán suave debe ser el proceso: ninguna es normal, una es suave y dos, muy suave.` },
      { q: '¿Cambia según la norma?', a: 'ISO 3758, GINETEX y JIS L 0001 escriben la temperatura como cifra; Norteamérica (ASTM D5489) la escribe con puntos. Japón adoptó el juego de la ISO en 2016, así que las prendas anteriores llevan otros dibujos.' },
    ],
    (n, m, f) => [
      { q: `O que significa ${n} numa etiqueta?`, a: m },
      { q: 'Como se leem aqui os pontos e as barras?', a: `Este símbolo traz ${f.dots} ponto${f.dots === 1 ? '' : 's'} e ${f.bars} barra${f.bars === 1 ? '' : 's'}. Os pontos indicam a temperatura e as barras o quanto o processo deve ser suave: nenhuma é normal, uma é suave e duas, muito suave.` },
      { q: 'Muda conforme a norma?', a: 'ISO 3758, GINETEX e JIS L 0001 escrevem a temperatura como número; a América do Norte (ASTM D5489) escreve com pontos. O Japão adotou o conjunto da ISO em 2016, então peças anteriores trazem outros desenhos.' },
    ],
    (n, m, f) => [
      { q: `${n}はどういう意味ですか。`, a: m },
      { q: 'この絵の点と下線はどう読みますか。', a: `この表示には点が${f.dots}つ、下線が${f.bars}本あります。点の数は温度を、下線の数は強さを指します — 下線がなければ通常、1本なら弱く、2本ならとても弱くです。` },
      { q: '規格によって違いますか。', a: '温度を数字で書くのがISO 3758・GINETEX・JIS L 0001で、点で書くのが北米のASTM D5489です。日本は2016年に表示をISOに合わせて変えたため、それ以前の服は絵が違います。' },
    ],
    (n, m, f) => [
      { q: `Was bedeutet ${n} auf dem Etikett?`, a: m },
      { q: 'Wie liest man hier Punkte und Balken?', a: `Dieses Zeichen trägt ${f.dots} Punkt${f.dots === 1 ? '' : 'e'} und ${f.bars} Balken. Punkte stehen für die Temperatur, Balken dafür, wie schonend das Verfahren sein muss — keiner ist normal, einer schonend, zwei sehr schonend.` },
      { q: 'Unterscheidet sich das je Norm?', a: 'ISO 3758, GINETEX und JIS L 0001 schreiben die Temperatur als Zahl, Nordamerika (ASTM D5489) als Punkte. Japan ist 2016 auf den ISO-Satz umgestiegen, ältere Stücke tragen darum andere Bilder.' },
    ],
    (n, m, f) => [
      { q: `Que veut dire ${n} sur une étiquette ?`, a: m },
      { q: 'Comment lire ici les points et les barres ?', a: `Ce symbole porte ${f.dots} point${f.dots === 1 ? '' : 's'} et ${f.bars} barre${f.bars === 1 ? '' : 's'}. Les points donnent la température et les barres la douceur exigée : aucune, c’est normal ; une, c’est doux ; deux, très doux.` },
      { q: 'Est-ce que cela change selon la norme ?', a: 'ISO 3758, GINETEX et JIS L 0001 écrivent la température en chiffre ; l’Amérique du Nord (ASTM D5489) l’écrit en points. Le Japon est passé au jeu ISO en 2016 : les vêtements plus anciens portent d’autres dessins.' },
    ],
    (n, m, f) => [
      { q: `लेबल पर ${n} का क्या अर्थ है?`, a: m },
      { q: 'इस चित्र के बिंदु और रेखाएँ कैसे पढ़ें?', a: `इस चिह्न पर ${f.dots} बिंदु और ${f.bars} रेखाएँ हैं। बिंदु तापमान बताते हैं और रेखाएँ यह कि प्रक्रिया कितनी नरम रखनी है — कोई रेखा नहीं तो सामान्य, एक तो हल्की, दो तो बहुत हल्की।` },
      { q: 'क्या मानक के अनुसार अंतर है?', a: 'ISO 3758, GINETEX और JIS L 0001 तापमान को अंक में लिखते हैं; उत्तर अमेरिका (ASTM D5489) बिंदुओं से। जापान ने 2016 में ISO वाला सेट अपनाया, इसलिए उससे पुराने कपड़ों पर चित्र दूसरे हैं।' },
    ],
    (n, m, f) => [
      { q: `吊牌上的${n}是什么意思？`, a: m },
      { q: '这个图案的点和下划线怎么读？', a: `这个标志上有 ${f.dots} 个点、${f.bars} 条下划线。点的数量指温度，下划线的数量指过程要多轻柔 — 没有是普通，一条是轻柔，两条是非常轻柔。` },
      { q: '各规格之间有区别吗？', a: '把温度写成数字的是 ISO 3758、GINETEX 和 JIS L 0001，写成点的是北美的 ASTM D5489。日本在 2016 年改用 ISO 那一套，所以更早的衣服图案不同。' },
    ],
    (n, m, f) => [
      { q: `吊牌上的${n}是什麼意思？`, a: m },
      { q: '這個圖案的點和底線怎麼讀？', a: `這個標誌上有 ${f.dots} 個點、${f.bars} 條底線。點的數量指溫度，底線的數量指過程要多輕柔 — 沒有是普通，一條是輕柔，兩條是非常輕柔。` },
      { q: '各規格之間有區別嗎？', a: '把溫度寫成數字的是 ISO 3758、GINETEX 和 JIS L 0001，寫成點的是北美的 ASTM D5489。日本在 2016 年改用 ISO 那一套，所以更早的衣服圖案不同。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
const TEXT: L<Text> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<Text>;

/** 화면이 쓰는 한 벌 — 페이지 문구에 낱말표가 만드는 이름·뜻이 붙는다 */
export interface LaundryUI extends Text {
  name: (f: LaundryFacts) => string;
  meaning: (f: LaundryFacts) => string;
  metaTitle: (f: LaundryFacts) => string;
  metaDesc: (f: LaundryFacts) => string;
  cellFaq: (f: LaundryFacts) => FaqItem[];
  /** 낱말표에서 그대로 오는 것들 — 낱장의 표가 쓴다 */
  shapeName: Record<Family, string>;
  strengthName: Record<Strength, string>;
  twist: string;
  /** 금지 표지 — 검사가 이 말로 금지 칸을 되짚는다 */
  ban: string;
}

export const LAUNDRY_UI: L<LaundryUI> = Object.fromEntries(
  LANG_CODES.map(lang => {
    const p = PACKS[lang];
    const t = TEXT[lang];
    const name = (f: LaundryFacts) => nameOf(p, f);
    const meaning = (f: LaundryFacts) => meanOf(p, f);
    return [lang, {
      ...t,
      name,
      meaning,
      metaTitle: (f: LaundryFacts) => t.metaTitleOf(name(f)),
      metaDesc: (f: LaundryFacts) => t.metaDescOf(name(f), meaning(f)),
      cellFaq: (f: LaundryFacts) => t.cellFaqOf(name(f), meaning(f), f),
      shapeName: p.shape,
      strengthName: p.strength,
      twist: p.twist,
      ban: p.ban,
    }];
  }),
) as unknown as L<LaundryUI>;
