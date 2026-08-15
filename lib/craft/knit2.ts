/**
 * 공예 섹션 — 뜨개 추가 8종
 *
 * 첫 여덟 개가 "폭"을 다뤘다면 여기는 "길이와 크기"다. 게이지는 코와 단으로
 * 갈리는데, 코 게이지는 대개 맞춰 놓고 뜨고 단 게이지는 안 맞은 채로 지나간다 —
 * 세로는 무늬와 무게와 블로킹으로 늘어나므로 도안의 단 수를 그대로 쓰면 길이가
 * 어긋난다. 그래서 단 게이지로 되짚는 계산을 따로 둔다.
 *
 * 옷의 크기는 몸 치수가 아니라 몸 치수 + 여유(ease)가 정한다. 여유는 양수일
 * 수도 음수일 수도 있어서 모자·양말은 몸보다 작게, 스웨터는 몸보다 크게 뜬다 —
 * 부호를 하나로 못 박으면 절반이 틀린다. 그래서 여유 비율은 음수를 허용한다.
 *
 * 실을 바꾸는 계산은 무게가 아니라 길이로 맞춘다. 같은 100g이어도 굵기에 따라
 * 길이가 두 배 차이 나므로, 무게만 맞춰 사면 도안의 절반에서 실이 끊긴다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const KNIT2_TOOLS: FormulaTool[] = [
  {
    slug: 'row-gauge-length',
    icon: '📏',
    category: '뜨개',
    fields: [
      { key: 'g', term: 'rowGauge', unit: 'rowsPer10', def: 28, min: 1 },
      { key: 'len', term: 'targetLength', unit: 'cm', def: 60, min: 1 },
    ],
    formula: '{rows} = {rowGauge} × {targetLength} ÷ 10',
    compute: v => {
      const rows = Math.round(v.g * v.len / 10);
      return [
        { term: 'rows', unit: 'row', value: rows, digits: 0, primary: true },
        { term: 'targetLength', unit: 'cm', value: v.g > 0 ? round(rows / v.g * 10, 1) : 0, digits: 1 },
      ];
    },
    ko: { title: '뜨개 단 수 계산기', desc: '단 게이지와 원하는 길이로 떠야 할 단 수를 구합니다.',
      long: '10cm에 28단이면 1cm에 2.8단이고, 60cm는 168단입니다. 168단은 8단 무늬가 정확히 21번 들어가는 수라 그대로 쓸 수 있습니다. 63cm로 늘리면 176.4단이 나오는데 단은 쪼갤 수 없어 176단으로 두고, 그 길이는 62.9cm — 1mm는 눈에 안 보이지만 무늬 반복은 깨집니다.',
      note: '단 게이지는 코 게이지보다 잘 어긋납니다. 메리야스와 알파카는 무게로 세로가 늘어나므로, 블로킹한 스와치를 세워 걸어 두고 재는 것이 실제 옷의 길이에 가깝습니다.' },
    en: { title: 'Row Gauge Calculator', desc: 'Turn your row gauge and a target length into the number of rows to work.',
      long: '28 rows over 10 cm is 2.8 per centimetre, so 60 cm is 168 rows — which happens to be exactly 21 repeats of an 8-row pattern. Ask for 63 cm and you get 176.4; rows do not split, so 176 rows it is, and that measures 62.9 cm. The millimetre does not show, but the broken repeat does.',
      note: 'Row gauge drifts more than stitch gauge. Stocking stitch and alpaca grow lengthwise under their own weight, so hang a blocked swatch before measuring it — that is closer to what the garment will do.' },
  },
  {
    slug: 'yarn-substitute',
    icon: '🔄',
    category: '뜨개',
    fields: [
      { key: 'orig', term: 'origYardage', unit: 'm', def: 400, min: 1 },
      { key: 'sub', term: 'subYardage', unit: 'm', def: 320, min: 1 },
      { key: 'pb', term: 'patternBalls', unit: 'ball', def: 8, min: 1, step: 1 },
      { key: 'bw', term: 'ballWeight', unit: 'gram', def: 50, min: 1 },
    ],
    formula: '{balls} = ⌈{patternBalls} × {origYardage} ÷ {subYardage}⌉',
    compute: v => {
      // 볼 무게가 100g이 아닐 수 있으므로 100g당 길이를 한 볼 길이로 되돌린다
      const perBallOrig = v.bw / 100 * v.orig;
      const perBallSub = v.bw / 100 * v.sub;
      const need = v.pb * perBallOrig;
      return [
        { term: 'balls', unit: 'ball', value: perBallSub > 0 ? Math.ceil(need / perBallSub) : 0, digits: 0, primary: true },
        { term: 'yarnLength', unit: 'm', value: round(need, 0), digits: 0 },
      ];
    },
    ko: { title: '실 대체 계산기', desc: '도안의 실을 다른 실로 바꿀 때 몇 볼이 필요한지 구합니다.',
      long: '실을 바꿀 때 맞춰야 하는 것은 무게가 아니라 길이입니다. 100g에 400m인 실 8볼(50g 볼)을 시키는 도안은 1,600m를 요구합니다. 100g에 320m인 실로 바꾸면 한 볼에 160m뿐이라 10볼이 필요합니다 — 같은 8볼을 사면 320m가 모자랍니다.',
      note: '길이를 맞춰도 굵기가 맞는 것은 아닙니다. 100g당 길이가 비슷해도 알파카와 면은 무게감과 늘어남이 달라, 대체 실로는 반드시 스와치를 다시 뜨고 게이지를 확인해야 합니다. 대체 실의 볼 무게가 다르면 위에 나온 총 길이를 그 실 라벨의 길이로 직접 나누세요.' },
    en: { title: 'Yarn Substitution Calculator', desc: 'How many balls of a substitute yarn a pattern needs.',
      long: 'What you match when swapping yarn is length, not weight. A pattern calling for eight 50 g balls of a yarn that runs 400 m per 100 g wants 1,600 m. A substitute at 320 m per 100 g carries only 160 m per ball, so you need ten — buy the same eight and you are 320 m short.',
      note: 'Matching length does not match thickness. Two yarns with the same metres per 100 g can drape and stretch quite differently once one is alpaca and the other cotton, so swatch the substitute before committing. If it is sold in a different ball size, divide the total metres above by that label instead.' },
  },
  {
    slug: 'sweater-ease',
    icon: '🎽',
    category: '뜨개',
    fields: [
      { key: 'chest', term: 'chestCm', def: 96, min: 40 },
      { key: 'ease', term: 'easePct', unit: 'percent', def: 8, min: -20, max: 40 },
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 22, min: 1 },
    ],
    formula: '{finishedCirc} = {chestCm} × (1 + {easePct} ÷ 100)',
    compute: v => {
      const circ = v.chest * (1 + v.ease / 100);
      return [
        { term: 'finishedCirc', unit: 'cm', value: round(circ, 1), digits: 1, primary: true },
        { term: 'stitches', unit: 'sts', value: Math.round(circ * v.g / 10), digits: 0 },
      ];
    },
    ko: { title: '스웨터 여유(이즈) 계산기', desc: '가슴둘레와 여유 비율로 완성 둘레와 코 수를 구합니다.',
      long: '옷의 크기는 몸 치수가 아니라 몸 치수 + 여유가 정합니다. 가슴 96cm에 8%를 더하면 완성 둘레 103.7cm이고, 22코 게이지에서는 228코입니다. 여유를 −5%로 주면 91.2cm가 되어 몸에 붙는데, 뜨개천은 늘어나므로 이 음수 여유가 성립합니다.',
      note: '도안의 사이즈 표는 대개 몸 치수가 아니라 완성 둘레(finished bust)로 적혀 있습니다. 그 둘을 섞으면 한 사이즈가 통째로 어긋납니다. 여유는 부위마다 다르게 줍니다 — 가슴에 8cm를 준 옷도 팔에는 4cm면 충분합니다.' },
    en: { title: 'Sweater Ease Calculator', desc: 'Finished garment circumference and stitch count from a bust measurement and ease.',
      long: 'Garment size is the body measurement plus ease, not the body measurement. Adding 8% to a 96 cm chest gives a finished circumference of 103.7 cm, which is 228 stitches at 22 sts per 10 cm. Set the ease to −5% and you get 91.2 cm, close-fitting — knitted fabric stretches, so negative ease is a real choice.',
      note: 'A pattern size chart usually lists the finished bust, not the body it is meant for. Mixing the two puts you a whole size out. Ease also varies by area: a sweater with 8 cm at the chest rarely wants more than 4 cm at the upper arm.' },
  },
  {
    slug: 'sock-cast-on',
    icon: '👟',
    category: '뜨개',
    fields: [
      { key: 'foot', term: 'footCirc', unit: 'cm', def: 22, min: 10 },
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 30, min: 1 },
      { key: 'ease', term: 'negEase', unit: 'percent', def: 10, min: 0, max: 20 },
    ],
    formula: '{castOn} = 4 × round({footCirc} × (1 − {negEase} ÷ 100) × {stitchGauge} ÷ 40)',
    compute: v => {
      const circ = v.foot * (1 - v.ease / 100);
      // 4의 배수로 맞춘다 — 2×2 고무뜨기가 4코 단위이고, 발등·발바닥을 절반씩 갈라 쓴다
      const castOn = Math.max(0, Math.round(circ * v.g / 40) * 4);
      return [
        { term: 'castOn', unit: 'sts', value: castOn, digits: 0, primary: true },
        { term: 'finishedCirc', unit: 'cm', value: round(circ, 1), digits: 1 },
      ];
    },
    ko: { title: '양말 시작 코 계산기', desc: '발둘레와 게이지, 음수 여유로 양말 시작 코 수를 구합니다.',
      long: '발볼에서 잰 둘레 22cm에서 10%를 빼면 19.8cm이고, 30코 게이지에서는 59.4코입니다. 이것을 4의 배수인 60코로 맞춥니다. 4의 배수여야 하는 이유는 두 가지입니다 — 2×2 고무뜨기가 4코 단위로 돌아가고, 발등과 발바닥을 정확히 절반(30코씩)으로 갈라야 힐 플랩과 거싯이 좌우 대칭이 됩니다.',
      note: '양말에 음수 여유는 선택이 아닙니다. 발둘레대로 뜨면 신는 동안 늘어나 발바닥에서 접히고 뒤꿈치가 흘러내립니다. 게이지도 평면 스와치가 아니라 원통으로 떠서 재세요 — 같은 실·같은 바늘이어도 돌려 뜨면 코가 달라집니다.' },
    en: { title: 'Sock Cast-On Calculator', desc: 'Cast-on stitches for socks from foot circumference, gauge and negative ease.',
      long: 'Take 10% off a 22 cm foot circumference and you are knitting to 19.8 cm, which is 59.4 stitches at 30 sts per 10 cm. Round that to 60, a multiple of four. Four matters twice over: a 2×2 rib repeats over four stitches, and the instep and sole have to split exactly in half (30 each) for the heel flap and gussets to come out symmetrical.',
      note: 'Negative ease is not optional in socks. Knit to the measured circumference and the sock relaxes into folds under the foot and slides off the heel. Measure gauge in the round as well — the same yarn and needles give a different count worked flat.' },
  },
  {
    slug: 'stripe-repeat',
    icon: '🔂',
    category: '뜨개',
    fields: [
      { key: 'rows', term: 'rows', unit: 'row', def: 160, min: 1 },
      { key: 'rep', term: 'repeatRows', unit: 'row', def: 12, min: 1 },
    ],
    formula: '{fullRepeats} = ⌊{rows} ÷ {repeatRows}⌋,  {leftoverRows} = {rows} − {fullRepeats} × {repeatRows}',
    compute: v => {
      const reps = Math.floor(ratio(v.rows, v.rep));
      return [
        { term: 'fullRepeats', unit: 'none', value: reps, digits: 0, primary: true },
        { term: 'leftoverRows', unit: 'row', value: v.rep > 0 ? v.rows - reps * v.rep : 0, digits: 0 },
      ];
    },
    ko: { title: '스트라이프 반복 계산기', desc: '전체 단 수와 무늬 반복 단 수로 반복 횟수와 남는 단을 구합니다.',
      long: '160단에 12단 반복이면 13번(156단)이 들어가고 4단이 남습니다. 중요한 것은 남는 4단을 어디 두느냐입니다. 반복마다 조금씩 나눠 넣으면 줄 하나만 두꺼워져 오히려 눈에 띕니다. 밑단 고무뜨기 바로 위나 겨드랑이 아래처럼 이미 다른 것이 끼어드는 자리에 몰아 두면 아무도 못 찾습니다.',
      note: '반복 단 수가 홀수면 두 색 스트라이프에서 매번 반대쪽 끝에서 색이 시작해 실을 자르게 됩니다. 짝수로 잡으면 안 쓰는 색을 옆에서 끌어 올릴 수 있어 실 정리가 절반으로 줄어듭니다.' },
    en: { title: 'Stripe Repeat Calculator', desc: 'How many full stripe repeats fit and how many rows are left over.',
      long: '160 rows with a 12-row repeat gives 13 repeats (156 rows) and 4 rows left. What matters is where those 4 rows go. Spread them a little at a time and one stripe ends up visibly fatter than the rest. Put them all somewhere that is already interrupted — just above the hem rib, or under the arm — and nobody finds them.',
      note: 'An odd number of rows per repeat means a two-colour stripe starts at the opposite end each time, forcing you to cut the yarn. Keep the repeat even and the resting colour can be carried up the side, which halves the ends you have to weave in.' },
  },
  {
    slug: 'colorwork-yardage',
    icon: '🌈',
    category: '뜨개',
    fields: [
      { key: 'g', term: 'yarnWeight', unit: 'gram', def: 400, min: 1 },
      { key: 'pct', term: 'mainColourPct', unit: 'percent', def: 70, min: 0, max: 100 },
    ],
    formula: '{mainColourWt} = {yarnWeight} × {mainColourPct} ÷ 100,  {contrastColourWt} = {yarnWeight} − {mainColourWt}',
    compute: v => {
      const main = v.g * v.pct / 100;
      return [
        { term: 'mainColourWt', unit: 'gram', value: round(main, 0), digits: 0, primary: true },
        { term: 'contrastColourWt', unit: 'gram', value: round(v.g - main, 0), digits: 0 },
      ];
    },
    ko: { title: '배색 실 배분 계산기', desc: '전체 실 무게와 주 색 비율로 색깔별 실 무게를 구합니다.',
      long: '전체 400g이 드는 옷에서 주 색이 70%면 280g과 120g으로 갈립니다. 비율은 차트에서 셉니다 — 배색 무늬 한 반복의 칸을 색깔별로 세어 나누면 그 무늬가 이어지는 구간의 비율이 됩니다. 무늬가 없는 몸통·고무뜨기는 전부 주 색으로 얹습니다.',
      note: '소수 색은 차트의 비율보다 더 들거나 덜 듭니다. 뒤로 지나는 실(float)은 앞의 코보다 길이를 더 먹고, 왼손에 걸어 지배색으로 쓴 실은 코가 커져 더 많이 나갑니다. 소수 색은 보통 한 볼을 더 잡아 두세요 — 모자랄 때 같은 염색 로트를 다시 구하는 것이 제일 어렵습니다.' },
    en: { title: 'Colorwork Yarn Calculator', desc: 'Split a total yarn requirement into grams of each colour.',
      long: 'A garment that eats 400 g at 70% main colour splits into 280 g and 120 g. Get the percentage off the chart: count the squares of each colour in one repeat and that is the ratio for as far as the pattern runs. Plain body and ribbing all go onto the main colour.',
      note: 'The minor colour rarely lands on the chart figure. Floats carried across the back use more length than the stitches on the front, and whichever yarn you hold as the dominant one makes slightly larger stitches and goes further. Buy one extra ball of the contrast — matching a sold-out dye lot is the hardest shortfall to fix.' },
  },
  {
    slug: 'yarn-per-row',
    icon: '🐑',
    category: '뜨개',
    fields: [
      { key: 'sw', term: 'swatchWeight', unit: 'gram', def: 12, min: 0.1 },
      { key: 'rows', term: 'rows', unit: 'row', def: 40, min: 1 },
      { key: 'mpg', term: 'metrePerGram', unit: 'm', def: 4, min: 0.1, step: 0.1 },
      { key: 'left', term: 'leftoverWt', unit: 'gram', def: 60, min: 0 },
    ],
    formula: '{metrePerRow} = {swatchWeight} × {metrePerGram} ÷ {rows},  {rowsLeft} = ⌊{leftoverWt} × {metrePerGram} ÷ {metrePerRow}⌋',
    compute: v => {
      const perRow = ratio(v.sw * v.mpg, v.rows);
      return [
        { term: 'metrePerRow', unit: 'm', value: round(perRow, 2), digits: 2, primary: true },
        { term: 'rowsLeft', unit: 'row', value: perRow > 0 ? Math.floor(v.left * v.mpg / perRow) : 0, digits: 0 },
      ];
    },
    ko: { title: '한 단에 드는 실 계산기', desc: '시험 뜨기 무게로 한 단에 드는 실 길이와 남은 단 수를 구합니다.',
      long: '라벨이 50g에 200m면 g당 4m입니다. 12g짜리 스와치가 40단이었다면 48m가 40단에 들어간 것이니 한 단은 1.2m입니다. 남은 실 60g은 240m이므로 200단을 더 뜰 수 있습니다. 가장 정확한 방법은 뜨던 것을 저울에 올리고 10단 뜬 뒤 다시 재는 것입니다 — 그러면 한 단의 코 수가 이미 실제와 같습니다.',
      note: '한 단에 드는 길이는 그 단의 코 수에 비례합니다. 40코 스와치에서 나온 1.2m를 200코 몸통에 그대로 쓰면 다섯 배를 놓칩니다 — 코 수의 비만큼 곱하세요. 마무리·코 잡기·꿰매기에 드는 몫은 여기 들어 있지 않습니다.' },
    en: { title: 'Yarn Per Row Calculator', desc: 'Metres of yarn one row eats, and how many rows the leftovers will carry.',
      long: 'A band reading 200 m per 50 g is 4 m per gram. If a 12 g swatch took 40 rows, 48 m went into 40 rows, so one row is 1.2 m. The 60 g you have left is 240 m, which carries 200 more rows. The most accurate version of this is to weigh the work in progress, knit ten rows and weigh it again — then the stitch count per row is already the real one.',
      note: 'Metres per row scale with the stitches in that row. Carrying 1.2 m from a 40-stitch swatch straight onto a 200-stitch body understates it fivefold — multiply by the ratio of the stitch counts. Cast-on, seaming and finishing are not in this figure.' },
  },
  {
    slug: 'blanket-size',
    icon: '🛋️',
    category: '뜨개',
    fields: [
      { key: 'bw', term: 'bedW', unit: 'cm', def: 150, min: 30 },
      { key: 'bl', term: 'bedLen', unit: 'cm', def: 200, min: 30 },
      { key: 'drop', term: 'dropLen', unit: 'cm', def: 25, min: 0 },
      { key: 'g', term: 'stitchGauge', unit: 'stsPer10', def: 16, min: 1 },
    ],
    formula: '{targetWidth} = {bedW} + 2 × {dropLen},  {targetLength} = {bedLen} + {dropLen}',
    compute: v => {
      const w = v.bw + 2 * v.drop;
      return [
        { term: 'targetWidth', unit: 'cm', value: round(w, 1), digits: 1, primary: true },
        { term: 'targetLength', unit: 'cm', value: round(v.bl + v.drop, 1), digits: 1 },
        { term: 'castOn', unit: 'sts', value: Math.round(w * v.g / 10), digits: 0 },
      ];
    },
    ko: { title: '담요 크기 계산기', desc: '침대 치수와 늘어뜨릴 길이로 담요 크기와 시작 코 수를 구합니다.',
      long: '담요의 완성 치수는 매트리스 치수가 아니라 매트리스 + 옆으로 늘어뜨릴 길이입니다. 폭은 양쪽에 각각 들어가니 두 번, 길이는 발끝에만 한 번 더합니다(머리 쪽은 베개 앞에서 끝냅니다). 150 × 200cm 침대에 25cm씩 늘어뜨리면 200 × 225cm이고, 16코 게이지에서 시작 코는 320코입니다.',
      note: '200cm 폭을 담으려면 100cm 이상 되는 줄바늘이 필요하고, 완성 무게가 1kg을 넘으면 담요가 제 무게로 세로로 늘어납니다. 스와치도 그만큼 무게가 실린 상태로 재야 길이가 맞습니다. 아기 담요는 이 계산이 아니라 아기 침대나 카시트 치수로 잡으세요 — 늘어뜨릴 몫이 없어야 안전합니다.' },
    en: { title: 'Blanket Size Calculator', desc: 'Blanket dimensions and cast-on stitches from a mattress size and a drop.',
      long: 'A blanket finishes at the mattress size plus the drop over the sides, not at the mattress size. The width takes the drop twice, once at each side; the length takes it once, at the foot, because the top edge stops in front of the pillows. On a 150 × 200 cm bed with a 25 cm drop that is 200 × 225 cm, and at 16 sts per 10 cm the cast-on is 320 stitches.',
      note: 'Holding 200 cm of stitches needs a circular needle of 100 cm or longer, and once the finished piece passes a kilo it stretches lengthwise under its own weight — measure your gauge swatch with that weight in mind. Baby blankets come from cot or car-seat dimensions instead: there should be no drop to hang over anything.' },
  },
];
