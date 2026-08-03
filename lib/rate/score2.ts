/**
 * 비율 섹션 - 점수·달성 둘째 묶음 (4종)
 *
 * 점수는 "지금 몇 점"보다 "앞으로 몇 점을 받아야 하나"가 궁금한 쪽이 많다.
 * 남은 시험, 가중 성적, 합격선까지의 거리, 하루치 진도를 다룬다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const SCORE2_TOOLS: FormulaTool[] = [
  {
    slug: 'grade-needed',
    icon: '📝',
    category: '점수·달성',
    fields: [
      { key: 'now', term: 'currentAvg', unit: 'point', def: 78, min: 0, max: 100 },
      { key: 'done', term: 'examsDone', unit: 'none', def: 3, min: 1 },
      { key: 'left', term: 'examsLeft', unit: 'none', def: 2, min: 1 },
      { key: 'goal', term: 'targetAvg', unit: 'point', def: 85, min: 0, max: 100 },
    ],
    formula: '{neededScore} = ({targetAvg} × ({examsDone} + {examsLeft}) − {currentAvg} × {examsDone}) ÷ {examsLeft}',
    compute: v => {
      const all = v.done + v.left;
      const need = ratio(v.goal * all - v.now * v.done, v.left);
      return [
        { term: 'neededScore', unit: 'point', value: round(need, 1), digits: 1, primary: true },
        { term: 'gapScore', unit: 'point', value: round(need - v.now, 1), digits: 1 },
        { term: 'target', unit: 'point', value: round(v.goal * all, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const n = out[0].value;
      return n > 100
        ? { ko: `남은 시험을 모두 100점 받아도 목표 평균에 닿지 않습니다. 필요 점수가 ${n}점입니다.`, en: `Even perfect scores fall short — you would need ${n}.`,
            l10n: {
              es: `Ni sacando el máximo llegas: harían falta ${n}.`,
              'pt-br': `Nem tirando nota máxima dá: seriam necessários ${n}.`,
              ja: `残りを全部満点にしても目標平均に届きません。必要な点は${n}点です。`,
              de: `Selbst mit voller Punktzahl reicht es nicht — nötig wären ${n}.`,
              fr: `Même avec des notes maximales, c’est hors d’atteinte : il faudrait ${n}.`,
              hi: `बची परीक्षाओं में पूरे अंक लाकर भी लक्ष्य नहीं मिलेगा — ${n} अंक चाहिए होते।`,
            }, tone: 'bad' }
        : n <= 0
          ? { ko: '이미 목표 평균을 넘겼습니다.', en: 'You are already above the target average.',
              l10n: {
                es: 'Ya estás por encima de la media que buscabas.',
                'pt-br': 'Você já está acima da média que queria.',
                ja: 'すでに目標の平均を超えています。',
                de: 'Du liegst schon über dem gewünschten Schnitt.',
                fr: 'Tu es déjà au-dessus de la moyenne visée.',
                hi: 'आप पहले ही चाहिए औसत से ऊपर हैं।',
              }, tone: 'good' }
          : { ko: `남은 시험에서 평균 ${n}점을 받으면 목표에 닿습니다.`, en: `Average ${n} across the remaining tests and you hit the target.`,
              l10n: {
                es: `Saca una media de ${n} en lo que queda y llegas al objetivo.`,
                'pt-br': `Tire média ${n} no que falta e você bate a meta.`,
                ja: `残りの試験で平均${n}点を取れば目標に届きます。`,
                de: `Schaff im Rest einen Schnitt von ${n}, dann erreichst du das Ziel.`,
                fr: `Fais une moyenne de ${n} sur ce qui reste et tu atteins l’objectif.`,
                hi: `बची परीक्षाओं में औसत ${n} अंक लाएँ तो लक्ष्य मिल जाएगा।`,
              }, tone: 'warn' };
    },
    ko: { title: '목표 평균 필요 점수 계산기', desc: '남은 시험에서 몇 점을 받아야 목표 평균이 되는지 계산합니다.',
      long: '목표 평균에 전체 과목 수를 곱해 필요한 총점을 만들고, 이미 받은 총점을 뺀 뒤 남은 과목 수로 나눕니다. 필요 점수가 100점을 넘으면 목표가 수학적으로 불가능하다는 뜻입니다.',
      note: '과목마다 학점 비중이 다르면 단순 평균으로는 맞지 않습니다. 그때는 가중 성적 계산을 쓰세요.' },
    en: { title: 'Score Needed for a Target Average', desc: 'What you must average on the remaining tests to reach your goal.',
      long: 'Multiply the target average by all the tests to get the total points needed, subtract what you already have, and divide by the tests left. A figure above 100 means the goal is mathematically out of reach.',
      note: 'If courses carry different credit weights a plain average misleads — use the weighted grade calculator instead.' },
  },
  {
    slug: 'weighted-grade',
    icon: '⚖️',
    category: '점수·달성',
    fields: [
      { key: 'mid', term: 'midScore', unit: 'point', def: 82, min: 0, max: 100 },
      { key: 'midW', term: 'midWeight', unit: 'percent', def: 30, min: 0, max: 100 },
      { key: 'fin', term: 'finalScoreV', unit: 'point', def: 74, min: 0, max: 100 },
      { key: 'finW', term: 'finalWeight', unit: 'percent', def: 40, min: 0, max: 100 },
      { key: 'hw', term: 'hwScore', unit: 'point', def: 95, min: 0, max: 100 },
    ],
    formula: '{weightedScore} = {midScore} × {midWeight} ÷ 100 + {finalScoreV} × {finalWeight} ÷ 100 + {hwScore} × (100 − {midWeight} − {finalWeight}) ÷ 100',
    compute: v => {
      const hwW = Math.max(0, 100 - v.midW - v.finW);
      const total = (v.mid * v.midW + v.fin * v.finW + v.hw * hwW) / 100;
      return [
        { term: 'weightedScore', unit: 'point', value: round(total, 2), digits: 2, primary: true },
        { term: 'hwScore', unit: 'percent', value: round(hwW, 1), digits: 1 },
        { term: 'diff', unit: 'point', value: round(total - (v.mid + v.fin + v.hw) / 3, 2), digits: 2 },
      ];
    },
    ko: { title: '가중 성적 계산기', desc: '중간·기말·과제의 비중을 반영한 최종 점수를 계산합니다.',
      long: '점수마다 비중을 곱해 더하고 100으로 나눕니다. 과제 비중은 100에서 중간·기말 비중을 뺀 나머지로 자동 계산됩니다. 단순 평균과의 차이도 함께 보여 줍니다.',
      note: '비중의 합이 100을 넘으면 과제 비중이 0으로 잡힙니다. 강의계획서의 비중을 먼저 확인하세요.' },
    en: { title: 'Weighted Grade Calculator', desc: 'Your final mark once midterm, final and coursework weights are applied.',
      long: 'Multiply each score by its weight, add them up and divide by 100. The coursework weight fills whatever is left of the 100. The gap against a plain average is shown too.',
      note: 'If the weights you enter already exceed 100, coursework drops to zero. Check the syllabus for the real split.' },
  },
  {
    slug: 'pass-margin',
    icon: '🚦',
    category: '점수·달성',
    fields: [
      { key: 'score', term: 'score', unit: 'point', def: 62, min: 0 },
      { key: 'pass', term: 'passScore', unit: 'point', def: 70, min: 0 },
      { key: 'max', term: 'maxScore', unit: 'point', def: 100, min: 1 },
    ],
    formula: '{gapScore} = {passScore} − {score}',
    compute: v => {
      const gap = v.pass - v.score;
      return [
        { term: 'gapScore', unit: 'point', value: round(gap, 1), digits: 1, primary: true },
        { term: 'percent', unit: 'percent', value: round(ratio(v.score, v.max) * 100, 1), digits: 1 },
        { term: 'remainPct', unit: 'percent', value: round(ratio(gap, v.max) * 100, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) =>
      out[0].value <= 0
        ? { ko: `합격선을 ${Math.abs(out[0].value)}점 넘겼습니다.`, en: `You are ${Math.abs(out[0].value)} points clear of the pass mark.`,
            l10n: {
              es: `Superas el aprobado por ${Math.abs(out[0].value)} puntos.`,
              'pt-br': `Você passou da nota de corte por ${Math.abs(out[0].value)} pontos.`,
              ja: `合格ラインを${Math.abs(out[0].value)}点上回っています。`,
              de: `Du liegst ${Math.abs(out[0].value)} Punkte über der Bestehensgrenze.`,
              fr: `Tu es à ${Math.abs(out[0].value)} points au-dessus du seuil de réussite.`,
              hi: `आप उत्तीर्ण अंक से ${Math.abs(out[0].value)} अंक ऊपर हैं।`,
            }, tone: 'good' }
        : { ko: `합격선까지 ${out[0].value}점 남았습니다. 만점 대비 ${out[2].value}%입니다.`, en: `${out[0].value} points short — that is ${out[2].value}% of the total marks.`,
            l10n: {
              es: `Te faltan ${out[0].value} puntos, o sea el ${out[2].value} % del total.`,
              'pt-br': `Faltam ${out[0].value} pontos, ou seja ${out[2].value} % do total.`,
              ja: `合格ラインまで${out[0].value}点足りません。満点に対して${out[2].value}%です。`,
              de: `Dir fehlen ${out[0].value} Punkte — das sind ${out[2].value} % der Gesamtpunktzahl.`,
              fr: `Il te manque ${out[0].value} points, soit ${out[2].value} % du barème.`,
              hi: `उत्तीर्ण अंक तक ${out[0].value} अंक बाक़ी हैं — पूर्णांक का ${out[2].value}%।`,
            }, tone: 'warn' },
    ko: { title: '합격선까지 남은 점수', desc: '지금 점수와 합격선의 거리를 점수와 비율로 함께 봅니다.',
      long: '합격선에서 지금 점수를 뺀 값이 남은 점수입니다. 그 값을 만점으로 나누면 전체에서 몇 %를 더 채워야 하는지 보이고, 남은 시간에 어디를 파야 할지 판단하기 쉬워집니다.',
      note: '과목별 과락이 있는 시험은 총점만으로 판단할 수 없습니다. 과락 기준을 먼저 확인하세요.' },
    en: { title: 'Points to the Pass Mark', desc: 'The distance from where you are to the pass mark, in points and percent.',
      long: 'Subtract your score from the pass mark. Dividing that by the total shows what share of the paper you still need, which makes it easier to decide where to spend the remaining time.',
      note: 'Exams with a minimum on each section cannot be judged on the total alone. Check the per-section floor first.' },
  },
  {
    slug: 'progress-pace',
    icon: '🏃',
    category: '점수·달성',
    fields: [
      { key: 'goal', term: 'target', unit: 'none', def: 1200, min: 0 },
      { key: 'done', term: 'achieved', unit: 'none', def: 430, min: 0 },
      { key: 'days', term: 'daysLeft', unit: 'day', def: 21, min: 1 },
    ],
    formula: '{perDay} = ({target} − {achieved}) ÷ {daysLeft}',
    compute: v => {
      const left = Math.max(0, v.goal - v.done);
      return [
        { term: 'perDay', unit: 'none', value: round(ratio(left, v.days), 1), digits: 1, primary: true },
        { term: 'remaining', unit: 'none', value: round(left, 1), digits: 1 },
        { term: 'achieved', unit: 'percent', value: round(ratio(v.done, v.goal) * 100, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) =>
      out[1].value === 0
        ? { ko: '목표를 이미 채웠습니다.', en: 'The goal is already met.',
            l10n: {
              es: 'El objetivo ya está cumplido.',
              'pt-br': 'A meta já foi cumprida.',
              ja: '目標はすでに達成しています。',
              de: 'Das Ziel ist bereits erreicht.',
              fr: 'L’objectif est déjà atteint.',
              hi: 'लक्ष्य पहले ही पूरा हो चुका है।',
            }, tone: 'good' }
        : { ko: `하루 ${out[0].value}씩 하면 기한 안에 끝납니다. 지금 진도는 ${out[2].value}%입니다.`, en: `Do ${out[0].value} a day and you finish on time; you are ${out[2].value}% through.`,
            l10n: {
              es: `Haz ${out[0].value} al día y terminas a tiempo; llevas el ${out[2].value} %.`,
              'pt-br': `Faça ${out[0].value} por dia e você termina no prazo; já andou ${out[2].value} %.`,
              ja: `1日${out[0].value}ずつ進めれば期限に間に合います。今の進み具合は${out[2].value}%です。`,
              de: `Schaff ${out[0].value} pro Tag, dann wirst du rechtzeitig fertig; du bist bei ${out[2].value} %.`,
              fr: `Fais ${out[0].value} par jour et tu finis à temps ; tu en es à ${out[2].value} %.`,
              hi: `रोज़ ${out[0].value} करें तो समय पर पूरा हो जाएगा; अभी ${out[2].value}% हुआ है।`,
            }, tone: 'warn' },
    ko: { title: '하루치 진도 계산기', desc: '남은 기간에 목표를 채우려면 하루에 얼마씩 해야 하는지 계산합니다.',
      long: '목표에서 지금까지 한 양을 빼고 남은 일수로 나눕니다. 페이지 수, 문제 수, 저축액처럼 쌓아 가는 것이면 무엇이든 같은 계산입니다.',
      note: '하루도 빠지지 않는다는 가정입니다. 주 1회 쉬려면 남은 일수에서 쉬는 날을 먼저 빼고 넣으세요.' },
    en: { title: 'Daily Pace to Finish', desc: 'How much to get through each day to hit the goal in time.',
      long: 'Take what you have done off the goal and divide by the days left. Pages, practice questions, savings — anything cumulative works the same way.',
      note: 'This assumes no days off. If you want one rest day a week, subtract those days before entering the number.' },
  },
  {
    slug: 'score-from-percent',
    icon: '🎯',
    category: '점수·달성',
    fields: [
      { key: 'pct', term: 'percent', unit: 'percent', def: 85, min: 0, max: 100 },
      { key: 'max', term: 'maxScore', unit: 'point', def: 100, min: 0 },
    ],
    formula: '{score} = {maxScore} × {percent} ÷ 100',
    compute: v => {
      const s = (v.max * v.pct) / 100;
      return [
        { term: 'score', unit: 'point', value: round(s, 1), digits: 1, primary: true },
        { term: 'diff', unit: 'point', value: round(v.max - s, 1), digits: 1 },
      ];
    },
    ko: { title: '백분율로 원점수 구하기', desc: '만점과 백분율을 알 때 실제로 몇 점인지 되돌립니다.',
      long: '만점에 백분율을 곱하고 100으로 나눕니다. 만점이 100이 아닌 시험에서는 백분율과 점수가 다른 수가 되므로 헷갈리기 쉽습니다.',
      note: '만점이 40점인 시험의 85%는 34점입니다. 85점이 아닙니다.' },
    en: { title: 'Raw Score from Percentage', desc: 'Turn a percentage back into the actual mark when you know the maximum.',
      long: 'Multiply the maximum by the percentage and divide by 100. Whenever a test is not out of 100, the percentage and the score are different numbers — an easy place to slip.',
      note: '85% of a test marked out of 40 is 34 points, not 85.' },
  },
  {
    slug: 'attendance-needed',
    icon: '📋',
    category: '점수·달성',
    fields: [
      { key: 'total', term: 'sessions', unit: 'times', def: 30, min: 0 },
      { key: 'done', term: 'attended', unit: 'times', def: 18, min: 0 },
      { key: 'goal', term: 'attendRate', unit: 'percent', def: 80, min: 0, max: 100 },
    ],
    formula: '{remaining} = {sessions} × {attendRate} ÷ 100 − {attended}',
    compute: v => {
      // 반 번 나갈 수는 없으니 올림한다. 이미 채웠으면 음수 대신 0이다
      const need = Math.ceil((v.total * v.goal) / 100 - v.done);
      return [
        { term: 'remaining', unit: 'times', value: Math.max(need, 0), digits: 0, primary: true },
        { term: 'percent', unit: 'percent', value: round(ratio(v.done, v.total) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '목표 출석률까지 몇 번 더', desc: '지금까지의 출석으로 목표에 닿으려면 앞으로 몇 번 더 나가야 하는지 셉니다.',
      long: '전체 횟수에 목표 출석률을 곱해 필요한 출석 수를 구하고, 이미 나간 횟수를 뺍니다. 반 번은 없으므로 올림합니다.',
      note: '0이 나오면 이미 목표를 채운 것입니다. 남은 횟수보다 더 나가야 한다고 나오면 이번 학기에는 닿을 수 없습니다.' },
    en: { title: 'Sessions Still Needed', desc: 'Count how many more times you must show up to hit an attendance target.',
      long: 'Multiply the total number of sessions by the target rate to get the attendances required, then subtract the ones already banked. Half a session does not exist, so the figure rounds up.',
      note: 'A zero means the target is already met. If the answer exceeds the sessions left, the target is out of reach this term.' },
  },
];
