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
        ? { ko: `남은 시험을 모두 100점 받아도 목표 평균에 닿지 않습니다. 필요 점수가 ${n}점입니다.`, en: `Even perfect scores fall short — you would need ${n}.`, zh: `即使剩余科目全部满分也达不到目标，所需分数为${n}。`, tone: 'bad' }
        : n <= 0
          ? { ko: '이미 목표 평균을 넘겼습니다.', en: 'You are already above the target average.', zh: '已经超过目标平均分。', tone: 'good' }
          : { ko: `남은 시험에서 평균 ${n}점을 받으면 목표에 닿습니다.`, en: `Average ${n} across the remaining tests and you hit the target.`, zh: `剩余科目平均得${n}分即可达成目标。`, tone: 'warn' };
    },
    ko: { title: '목표 평균 필요 점수 계산기', desc: '남은 시험에서 몇 점을 받아야 목표 평균이 되는지 계산합니다.',
      long: '목표 평균에 전체 과목 수를 곱해 필요한 총점을 만들고, 이미 받은 총점을 뺀 뒤 남은 과목 수로 나눕니다. 필요 점수가 100점을 넘으면 목표가 수학적으로 불가능하다는 뜻입니다.',
      note: '과목마다 학점 비중이 다르면 단순 평균으로는 맞지 않습니다. 그때는 가중 성적 계산을 쓰세요.' },
    en: { title: 'Score Needed for a Target Average', desc: 'What you must average on the remaining tests to reach your goal.',
      long: 'Multiply the target average by all the tests to get the total points needed, subtract what you already have, and divide by the tests left. A figure above 100 means the goal is mathematically out of reach.',
      note: 'If courses carry different credit weights a plain average misleads — use the weighted grade calculator instead.' },
    zh: { title: '达到目标平均分所需分数', desc: '算出剩余科目要考多少分才能达到目标平均分。',
      long: '把目标平均分乘以全部科目数得到所需总分，减去已得总分，再除以剩余科目数。若所需分数超过100，说明目标在数学上已无法达成。',
      note: '若各科学分权重不同，简单平均并不准确，请改用加权成绩计算。' },
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
    zh: { title: '加权成绩计算器', desc: '按期中、期末、作业的权重算出最终成绩。',
      long: '把各项分数乘以权重相加后除以100。作业权重由100减去期中和期末权重自动得出，同时显示与简单平均的差异。',
      note: '若填入的权重之和已超过100，作业权重会归零。请先核对教学大纲中的权重。' },
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
        ? { ko: `합격선을 ${Math.abs(out[0].value)}점 넘겼습니다.`, en: `You are ${Math.abs(out[0].value)} points clear of the pass mark.`, zh: `已超过合格线${Math.abs(out[0].value)}分。`, tone: 'good' }
        : { ko: `합격선까지 ${out[0].value}점 남았습니다. 만점 대비 ${out[2].value}%입니다.`, en: `${out[0].value} points short — that is ${out[2].value}% of the total marks.`, zh: `距合格线还差${out[0].value}分，相当于满分的${out[2].value}%。`, tone: 'warn' },
    ko: { title: '합격선까지 남은 점수', desc: '지금 점수와 합격선의 거리를 점수와 비율로 함께 봅니다.',
      long: '합격선에서 지금 점수를 뺀 값이 남은 점수입니다. 그 값을 만점으로 나누면 전체에서 몇 %를 더 채워야 하는지 보이고, 남은 시간에 어디를 파야 할지 판단하기 쉬워집니다.',
      note: '과목별 과락이 있는 시험은 총점만으로 판단할 수 없습니다. 과락 기준을 먼저 확인하세요.' },
    en: { title: 'Points to the Pass Mark', desc: 'The distance from where you are to the pass mark, in points and percent.',
      long: 'Subtract your score from the pass mark. Dividing that by the total shows what share of the paper you still need, which makes it easier to decide where to spend the remaining time.',
      note: 'Exams with a minimum on each section cannot be judged on the total alone. Check the per-section floor first.' },
    zh: { title: '距合格线还差多少分', desc: '用分数和百分比同时呈现当前成绩与合格线的差距。',
      long: '用合格线减去当前分数即为还差的分数。再除以满分，就能看出还需补上整份试卷的百分之几，便于安排剩余时间的复习重点。',
      note: '设有单科最低分的考试不能只看总分，请先确认单科合格标准。' },
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
        ? { ko: '목표를 이미 채웠습니다.', en: 'The goal is already met.', zh: '目标已经完成。', tone: 'good' }
        : { ko: `하루 ${out[0].value}씩 하면 기한 안에 끝납니다. 지금 진도는 ${out[2].value}%입니다.`, en: `Do ${out[0].value} a day and you finish on time; you are ${out[2].value}% through.`, zh: `每天完成${out[0].value}即可按期完成，目前进度${out[2].value}%。`, tone: 'warn' },
    ko: { title: '하루치 진도 계산기', desc: '남은 기간에 목표를 채우려면 하루에 얼마씩 해야 하는지 계산합니다.',
      long: '목표에서 지금까지 한 양을 빼고 남은 일수로 나눕니다. 페이지 수, 문제 수, 저축액처럼 쌓아 가는 것이면 무엇이든 같은 계산입니다.',
      note: '하루도 빠지지 않는다는 가정입니다. 주 1회 쉬려면 남은 일수에서 쉬는 날을 먼저 빼고 넣으세요.' },
    en: { title: 'Daily Pace to Finish', desc: 'How much to get through each day to hit the goal in time.',
      long: 'Take what you have done off the goal and divide by the days left. Pages, practice questions, savings — anything cumulative works the same way.',
      note: 'This assumes no days off. If you want one rest day a week, subtract those days before entering the number.' },
    zh: { title: '每日进度计算器', desc: '算出在剩余时间内完成目标，每天需要做多少。',
      long: '用目标减去已完成量，再除以剩余天数。页数、题量、储蓄额等任何累积型目标都适用同一算法。',
      note: '该计算假设一天不落。若每周想休息一天，请先从剩余天数中扣除休息日。' },
  },
];
