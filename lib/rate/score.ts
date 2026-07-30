/** 비율 섹션 - 점수·달성 (4종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const SCORE_TOOLS: FormulaTool[] = [
  {
    slug: 'score-percent',
    icon: '🎓',
    category: '점수·달성',
    fields: [
      { key: 'score', term: 'score', def: 43, min: 0 },
      { key: 'max', term: 'maxScore', def: 55, min: 0.01 },
    ],
    formula: '{percent} = {score} ÷ {maxScore} × 100',
    compute: v => [
      { term: 'percent', unit: 'percent', value: round(ratio(v.score, v.max) * 100, 1), digits: 1, primary: true },
      { term: 'diff', value: round(v.max - v.score, 1), digits: 1 },
    ],
    verdict: (v, out) => {
      const p = out[0].value;
      const label = p >= 90 ? ['A', 'A', 'A'] : p >= 80 ? ['B', 'B', 'B'] : p >= 70 ? ['C', 'C', 'C'] : p >= 60 ? ['D', 'D', 'D'] : ['F', 'F', 'F'];
      return {
        ko: `100점 환산 ${p}점, 통상 기준 ${label[0]} 구간입니다.`,
        en: `That is ${p} out of 100, which usually falls in the ${label[1]} range.`,
        l10n: {
          es: `Son ${p} sobre 100, lo que suele caer en la franja ${label[1]}.`,
          'pt-br': `São ${p} de 100, o que costuma cair na faixa ${label[1]}.`,
          ja: `100点換算で${p}点、通常の基準では${label[1]}の区間です。`,
          de: `Das sind ${p} von 100 und liegt üblicherweise im Bereich ${label[1]}.`,
          fr: `Cela fait ${p} sur 100, ce qui tombe d’ordinaire dans la tranche ${label[1]}.`,
          hi: `100 में से ${p} अंक, जो आम तौर पर ${label[1]} श्रेणी में आता है।`,
        },
        tone: p >= 70 ? 'good' : p >= 60 ? 'warn' : 'bad',
      };
    },
    ko: { title: '점수 백분율 계산기', desc: '만점이 100이 아닌 시험 점수를 100점 기준으로 환산합니다.',
      long: '점수를 만점으로 나눠 100을 곱합니다. 55점 만점에 43점은 78.2점입니다.',
      note: '과목마다 만점이 다르면 백분율로 바꿔야 비교할 수 있습니다. 원점수끼리는 비교가 되지 않습니다.' },
    en: { title: 'Score to Percentage', desc: 'Convert a mark out of any total onto a 100-point scale.',
      long: 'Divide the score by the total and multiply by 100. 43 out of 55 is 78.2.',
      note: 'When subjects have different totals you must convert to percentages first — raw scores are not comparable.' },
  },
  {
    slug: 'attendance',
    icon: '✅',
    category: '점수·달성',
    fields: [
      { key: 'total', term: 'sessions', def: 16, min: 1 },
      { key: 'attended', term: 'attended', def: 13, min: 0 },
      { key: 'need', term: 'targetConc', unit: 'percent', def: 75, min: 0, max: 100 },
    ],
    formula: '{attendRate} = {attended} ÷ {sessions} × 100',
    compute: v => {
      const rate = ratio(v.attended, v.total) * 100;
      const minNeeded = Math.ceil(v.total * (v.need / 100));
      return [
        { term: 'attendRate', unit: 'percent', value: round(rate, 1), digits: 1, primary: true },
        { term: 'canMiss', value: Math.max(0, v.attended - minNeeded), digits: 0 },
        { term: 'result', value: minNeeded, digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const ok = out[0].value >= v.need;
      const short = Math.max(0, out[2].value - v.attended);
      return {
        ko: ok ? `기준 ${v.need}%를 넘었습니다. ${out[1].value}번 더 빠져도 유지됩니다.` : `기준에 ${short}번 모자랍니다.`,
        en: ok ? `Above the ${v.need}% requirement — you can miss ${out[1].value} more and still qualify.` : `You are ${short} sessions short of the requirement.`,
        l10n: {
          es: ok ? `Por encima del ${v.need} % exigido: puedes faltar ${out[1].value} veces más y seguir cumpliendo.` : `Te faltan ${short} sesiones para llegar al mínimo.`,
          'pt-br': ok ? `Acima dos ${v.need} % exigidos: dá para faltar mais ${out[1].value} vezes e ainda cumprir.` : `Faltam ${short} encontros para bater o mínimo.`,
          ja: ok ? `基準の${v.need}%を超えています。あと${out[1].value}回休んでも維持できます。` : `基準まであと${short}回足りません。`,
          de: ok ? `Über den geforderten ${v.need} % — du darfst noch ${out[1].value} Mal fehlen und erfüllst es weiterhin.` : `Dir fehlen ${short} Termine bis zur Anforderung.`,
          fr: ok ? `Au-dessus des ${v.need} % exigés : tu peux encore manquer ${out[1].value} séances et rester dans les clous.` : `Il te manque ${short} séances pour atteindre le minimum.`,
          hi: ok ? `${v.need}% की सीमा पार है — ${out[1].value} बार और छूटे तब भी पूरा रहेगा।` : `सीमा तक ${short} कक्षाएँ कम पड़ रही हैं।`,
        },
        tone: ok ? 'good' : 'bad',
      };
    },
    ko: { title: '출석률 계산기', desc: '출석 횟수로 출석률과 앞으로 빠질 수 있는 횟수를 구합니다.',
      long: '출석률은 참석 횟수를 전체 횟수로 나눈 값입니다. 기준선을 넣으면 통과에 필요한 최소 출석 횟수와 여유분을 함께 보여줍니다.',
      note: '학교마다 지각 몇 회를 결석 1회로 셈하는 규정이 다릅니다. 규정을 먼저 확인하고 횟수를 넣으세요.' },
    en: { title: 'Attendance Calculator', desc: 'Get your attendance rate and how many more sessions you can miss.',
      long: 'Attendance is sessions attended over total sessions. Enter the required threshold and it also shows the minimum needed and your remaining slack.',
      note: 'Institutions differ on how many late arrivals count as one absence — check the rule before entering counts.' },
  },
  {
    slug: 'achieve-rate',
    icon: '🎯',
    category: '점수·달성',
    fields: [
      { key: 'target', term: 'target', def: 5000000, min: 0.01 },
      { key: 'actual', term: 'actual', def: 3850000, min: 0 },
    ],
    formula: '{achieved} = {actual} ÷ {target} × 100',
    compute: v => [
      { term: 'achieved', unit: 'percent', value: round(ratio(v.actual, v.target) * 100, 1), digits: 1, primary: true },
      { term: 'remaining', value: round(Math.max(0, v.target - v.actual), 0), digits: 0 },
    ],
    verdict: (v, out) => {
      const done = out[0].value >= 100;
      return {
        ko: done ? `목표를 ${round(out[0].value - 100, 1)}% 초과 달성했습니다.` : `목표까지 ${round(100 - out[0].value, 1)}% 남았습니다.`,
        en: done ? `You are ${round(out[0].value - 100, 1)}% over target.` : `${round(100 - out[0].value, 1)}% left to reach the target.`,
        l10n: {
          es: done ? `Has superado el objetivo en un ${round(out[0].value - 100, 1)} %.` : `Te queda un ${round(100 - out[0].value, 1)} % para llegar al objetivo.`,
          'pt-br': done ? `Você passou da meta em ${round(out[0].value - 100, 1)} %.` : `Falta ${round(100 - out[0].value, 1)} % para bater a meta.`,
          ja: done ? `目標を${round(out[0].value - 100, 1)}%超えて達成しました。` : `目標まであと${round(100 - out[0].value, 1)}%です。`,
          de: done ? `Du liegst ${round(out[0].value - 100, 1)} % über dem Ziel.` : `Bis zum Ziel fehlen noch ${round(100 - out[0].value, 1)} %.`,
          fr: done ? `Tu dépasses l’objectif de ${round(out[0].value - 100, 1)} %.` : `Il reste ${round(100 - out[0].value, 1)} % pour atteindre l’objectif.`,
          hi: done ? `आपने लक्ष्य ${round(out[0].value - 100, 1)}% ज़्यादा पूरा किया।` : `लक्ष्य तक ${round(100 - out[0].value, 1)}% बाक़ी है।`,
        },
        tone: done ? 'good' : 'warn',
      };
    },
    ko: { title: '달성률 계산기', desc: '목표와 실적으로 달성률과 남은 양을 구합니다.',
      long: '실적을 목표로 나눠 100을 곱합니다. 목표를 넘으면 100%를 넘고, 그 초과분이 초과 달성률입니다.',
      note: '기간이 절반 지났을 때 달성률이 50%면 정상 속도입니다. 달성률만 보고 판단하면 진도를 놓칩니다.' },
    en: { title: 'Achievement Rate', desc: 'Compare actual results against a target and see what is left.',
      long: 'Divide actual by target and multiply by 100. Anything past 100% is over-achievement.',
      note: 'Halfway through a period, 50% is on pace. Reading the rate without the elapsed time hides whether you are behind.' },
  },
  {
    slug: 'win-rate',
    icon: '🏆',
    category: '점수·달성',
    fields: [
      { key: 'wins', term: 'wins', def: 27, min: 0 },
      { key: 'losses', term: 'losses', def: 18, min: 0 },
    ],
    formula: '{winRate} = {wins} ÷ ({wins} + {losses}) × 100',
    compute: v => {
      const games = v.wins + v.losses;
      return [
        { term: 'winRate', unit: 'percent', value: round(ratio(v.wins, games) * 100, 1), digits: 1, primary: true },
        { term: 'games', value: games, digits: 0 },
        { term: 'diff', value: v.wins - v.losses, digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const r = out[0].value;
      const needed = r >= 50 ? 0 : Math.ceil((v.losses - v.wins));
      return {
        ko: r >= 50 ? `승률 5할을 넘었습니다.` : `5할까지 ${needed}승이 더 필요합니다.`,
        en: r >= 50 ? `Above a .500 record.` : `${needed} more wins to reach .500.`,
        l10n: {
          es: r >= 50 ? `Por encima del 50 % de victorias.` : `Faltan ${needed} victorias para llegar al 50 %.`,
          'pt-br': r >= 50 ? `Acima dos 50 % de aproveitamento.` : `Faltam ${needed} vitórias para chegar aos 50 %.`,
          ja: r >= 50 ? `勝率5割を超えています。` : `5割まであと${needed}勝必要です。`,
          de: r >= 50 ? `Über einer Bilanz von 50 %.` : `Noch ${needed} Siege bis zu 50 %.`,
          fr: r >= 50 ? `Au-dessus de 50 % de victoires.` : `Encore ${needed} victoires pour atteindre 50 %.`,
          hi: r >= 50 ? `जीत दर 50% से ऊपर है।` : `50% तक ${needed} जीत और चाहिए।`,
        },
        tone: r >= 50 ? 'good' : 'warn',
      };
    },
    ko: { title: '승률 계산기', desc: '승과 패로 승률과 승차를 구합니다.',
      long: '승을 전체 경기 수로 나눕니다. 무승부가 있는 종목은 보통 무승부를 제외하고 계산합니다.',
      note: '야구의 5할 승률은 승과 패가 같을 때입니다. 승차는 (승−패)를 2로 나눈 값으로 계산합니다.' },
    en: { title: 'Win Rate Calculator', desc: 'Get win percentage and the win-loss gap from a record.',
      long: 'Divide wins by total games. In sports with draws, ties are usually excluded from the denominator.',
      note: 'A .500 record means equal wins and losses. Games behind is normally the win-loss gap divided by two.' },
  },
];
