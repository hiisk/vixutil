/**
 * 공예 섹션 — 구슬·포장 확장 (8종)
 *
 * 목걸이·팔찌는 "길이를 정하고 그 안에 알을 채우는" 문제다. 그런데 채울 수 있는
 * 길이는 완성 길이가 아니다 — 잠금장치와 크림프가 1~2cm를 먼저 먹기 때문에,
 * 목표 길이에서 그 몫을 빼고 나눠야 목걸이가 표준 길이(초커 40, 프린세스 45,
 * 마티네 55, 오페라 75, 로프 105cm)에 맞는다. 그 뺄셈을 빼먹으면 알 하나가 남고
 * 클래스프가 안 닫힌다. 개수는 언제나 내림한다.
 *
 * 팔찌는 반대로 여유를 더한다. 손목둘레에 그대로 만들면 손목을 조이므로 스트레치
 * 줄은 1~1.5cm, 클래스프 줄은 1.5~2cm를 더한다 — 알이 굵어지면 줄이 손목 바깥쪽으로
 * 돌아 실효 둘레가 더 커지기 때문에 여유도 함께 커진다.
 *
 * 포장 쪽은 이미 있는 것과 겹치지 않게 자리를 나눴다. 상자를 두르는 리본과
 * 포장지는 ribbon-length·giftwrap-size가 맡고, 여기는 그 위나 그 안에 들어가는
 * 것들이다 — 겉을 감는 완충재(면적 ÷ 롤 폭), 속에 깔는 박엽지(바닥 + 양쪽 벽 +
 * 겹침), 리본과 별개로 만드는 나비 매듭(고리 × 2 + 꼬리), 상자 대신 쓰는 봉투
 * (물건 치수 + 두께 + 여유). 부피 무게와 상자 채우기는 /calculator와 /geometry에
 * 이미 있으므로 건드리지 않는다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const BEAD2_TOOLS: FormulaTool[] = [
  {
    slug: 'necklace-length',
    icon: '💎',
    category: '구슬·포장',
    fields: [
      { key: 'len', term: 'targetLength', unit: 'cm', def: 45, min: 0 },
      { key: 'd', term: 'beadD', unit: 'mm', def: 8, min: 0, step: 0.5 },
      { key: 'clasp', term: 'claspLen', unit: 'mm', def: 20, min: 0 },
    ],
    formula: '{beadCount} = ⌊({targetLength} × 10 − {claspLen}) ÷ {beadD}⌋',
    compute: v => {
      const room = Math.max(0, v.len * 10 - v.clasp); // 잠금장치가 먹는 길이를 먼저 뺀다
      const n = v.d > 0 ? Math.floor(room / v.d) : 0;
      return [
        { term: 'beadCount', unit: 'bead', value: n, digits: 0, primary: true },
        { term: 'strandLen', unit: 'cm', value: round((n * v.d + v.clasp) / 10, 1), digits: 1 },
        { term: 'wireLen', unit: 'cm', value: round(v.len + 10, 1), digits: 1 },
      ];
    },
    ko: { title: '목걸이 길이 계산기', desc: '완성 길이와 구슬 지름으로 필요한 구슬 개수와 잠금장치 몫을 구합니다.',
      long: '목걸이 길이에는 이름이 붙어 있습니다 — 초커 40cm, 프린세스 45cm, 마티네 55cm, 오페라 75cm, 로프 105cm입니다. 목에 딱 붙는 초커는 목둘레(대개 33~35cm)보다 조금 커야 하고, 셔츠 위로 늘어뜨리는 것은 프린세스, 가슴 아래는 마티네입니다. 목표 길이를 정하면 그다음은 뺄셈입니다: 45cm 목걸이에 잠금장치와 크림프가 20mm를 먹으므로 구슬이 채울 길이는 430mm이고, 8mm 구슬로는 53개가 들어가 완성 44.4cm가 됩니다. 잠금장치 몫을 빼지 않고 450 ÷ 8 = 56개로 꿰면 완성이 46.8cm가 되어 원하던 길이를 넘어섭니다. 함께 나오는 와이어 길이는 목표 길이에 10cm를 더한 값입니다 — 양쪽에서 크림프를 통과시켜 되접는 몫입니다.',
      note: '개수는 내림합니다. 남는 몇 mm는 매듭 쪽으로 모이고, 반 알은 없습니다. 지름 표기는 공칭값이라 천연석은 알마다 0.5mm씩 다르므로 실제로는 계산보다 한두 개 어긋납니다 — 꿰기 전에 자 위에 한 줄 늘어놓고 10알 길이를 재면 실제 지름이 나옵니다. 잠금장치 몫은 제품에 따라 크게 달라, 작은 랍스터 클래스프는 10mm, 마그네틱 볼 클래스프나 연장줄이 달린 것은 40mm를 넘습니다. 그리고 목걸이는 무게가 아래로 처져 앞쪽이 조금 길어 보이므로, 애매하면 목표 길이를 1cm 짧게 잡는 편이 낫습니다.' },
    en: { title: 'Necklace Length Calculator', desc: 'Turn a finished necklace length and a bead size into the bead count and the clasp allowance.',
      long: 'Necklace lengths have names: choker 40 cm, princess 45 cm, matinee 55 cm, opera 75 cm, rope 105 cm. A choker still has to clear the neck, usually 33–35 cm, while a princess sits on the collarbone and a matinee below the bust. Once the target is chosen the rest is subtraction: on a 45 cm necklace the clasp and crimps take 20 mm, leaving 430 mm for beads, so 8 mm rounds give 53 beads and a finished 44.4 cm. Skip that subtraction, divide 450 by 8, string 56 beads, and the necklace closes at 46.8 cm — past the length you wanted. The wire figure alongside is the target plus 10 cm, the tails you feed back through the crimps at each end.',
      note: 'The count rounds down; the spare millimetres gather at the clasp and there are no half beads. Printed diameters are nominal and natural stone varies by half a millimetre a bead, so expect to be one or two out — lay ten beads along a ruler before stringing and you have the real diameter. The clasp allowance varies more than anything else: a small lobster is 10 mm, a magnetic ball clasp or one with an extender chain runs past 40 mm. Necklaces also hang forward under their own weight and read slightly longer at the front, so when in doubt take a centimetre off the target.' },
  },
  {
    slug: 'bracelet-size',
    icon: '🧮',
    category: '구슬·포장',
    fields: [
      { key: 'wrist', term: 'wristCm', unit: 'cm', def: 16, min: 0, step: 0.5 },
      { key: 'ease', term: 'spare', unit: 'cm', def: 1.5, min: 0, max: 5, step: 0.5 },
      { key: 'd', term: 'beadD', unit: 'mm', def: 8, min: 0, step: 0.5 },
    ],
    formula: '{strandLen} = {wristCm} + {spare}',
    compute: v => {
      const strand = v.wrist + Math.max(0, v.ease);
      const n = v.d > 0 ? Math.floor(strand * 10 / v.d) : 0;
      return [
        { term: 'strandLen', unit: 'cm', value: round(strand, 1), digits: 1, primary: true },
        { term: 'beadCount', unit: 'bead', value: n, digits: 0 },
        { term: 'cordLen', unit: 'cm', value: round(strand + 8, 1), digits: 1 },
      ];
    },
    ko: { title: '팔찌 사이즈 계산기', desc: '손목둘레에 여유를 더해 줄 길이와 구슬 개수를 구합니다.',
      long: '팔찌는 손목둘레 그대로 만들면 안 됩니다. 줄이 손목에 닿는 것이 아니라 구슬 바깥으로 돌기 때문에, 알이 굵을수록 실효 둘레가 커집니다. 여유는 스트레치(고무줄) 팔찌면 1~1.5cm, 클래스프 팔찌면 1.5~2cm가 기준입니다 — 클래스프는 손목 위에서 돌아가야 하고 여유가 없으면 잠글 수 없습니다. 손목 16cm에 1.5cm를 더하면 줄 17.5cm이고, 8mm 구슬로 21개가 들어갑니다. 클래스프 팔찌는 여기서 잠금장치 길이(대개 10~15mm)만큼 구슬을 덜 꿰면 됩니다 — 곧 줄 길이는 그대로 두고 알을 두 개 정도 빼는 셈입니다. 스트레치 줄은 잠금장치가 없어 계산한 줄 길이를 구슬로 다 채웁니다. 함께 나오는 코드 길이는 줄 길이에 8cm를 더한 값으로, 매듭을 묶고 당겨 숨길 몫입니다.',
      note: '스트레치 줄은 매듭이 풀리는 것보다 끊어지는 쪽이 흔합니다. 0.8mm 이상 굵은 줄을 쓰고, 꿰기 전에 양쪽을 잡고 몇 번 당겨 늘려 두세요 — 그러지 않으면 며칠 쓰는 사이에 늘어나 헐거워집니다. 매듭은 서전스 노트로 두 번 묶고 접착제를 한 방울 올린 뒤 구슬 구멍 안으로 당겨 숨깁니다. 구멍이 거친 천연석이나 금속 알은 줄을 톱처럼 갉으므로 그런 팔찌는 클래스프 쪽이 안전합니다. 손목은 하루 중에도 부어서 0.5cm까지 달라지니, 선물용이라면 여유를 넉넉한 쪽으로 잡으세요.' },
    en: { title: 'Bracelet Size Calculator', desc: 'Add fit ease to a wrist measurement for the strand length and bead count.',
      long: 'A bracelet cannot be built to the bare wrist measurement, because the strand rides around the outside of the beads rather than against the skin — the bigger the bead, the larger the effective circumference. Standard ease is 1–1.5 cm for a stretch bracelet and 1.5–2 cm for a clasped one, since a clasp has to swing round the wrist and cannot be fastened without slack. A 16 cm wrist plus 1.5 cm gives a 17.5 cm strand, which holds 21 beads at 8 mm. For a clasped bracelet, take the clasp length — usually 10–15 mm — out of the beads rather than the strand, so you string about two fewer. Stretch cord has no clasp, so beads fill the whole strand. The cord figure is the strand plus 8 cm, the tails you need to tie the knot and pull it in.',
      note: 'Stretch cord fails by snapping more often than by untying. Use 0.8 mm or heavier, and pre-stretch it by pulling the ends a few times before stringing, or the bracelet goes loose within days. Tie a surgeon\'s knot twice, add a drop of glue, and draw the knot inside a bead hole. Rough-drilled stone and metal beads saw through cord, so those belong on a clasped strand instead. Wrists also swell through the day by up to half a centimetre, so err generous on ease for a gift.' },
  },
  {
    slug: 'chain-links',
    icon: '⛓️',
    category: '구슬·포장',
    fields: [
      { key: 'len', term: 'finishedLen', unit: 'cm', def: 45, min: 0 },
      { key: 'link', term: 'linkLen', unit: 'mm', def: 7, min: 0, step: 0.1 },
    ],
    formula: '{linkCount} = ⌊{finishedLen} × 10 ÷ {linkLen}⌋',
    compute: v => {
      const n = v.link > 0 ? Math.floor(v.len * 10 / v.link) : 0;
      return [
        { term: 'linkCount', unit: 'link', value: n, digits: 0, primary: true },
        { term: 'finishedLen', unit: 'cm', value: round(n * v.link / 10, 1), digits: 1 },
      ];
    },
    ko: { title: '체인 링크 개수 계산기', desc: '완성 길이와 링크 한 칸 길이로 링크 개수와 실제로 나오는 길이를 구합니다.',
      long: '체인은 링크 단위로만 자를 수 있습니다. 링크 한 칸이 7mm인 체인으로 45cm를 만들려면 450 ÷ 7 = 64.3이므로 64칸이고, 그 64칸이 실제로 주는 길이는 44.8cm입니다 — 45cm에 정확히 맞추는 방법은 없고, 44.8cm와 65칸의 45.5cm 중에 고르는 것입니다. 링크 길이는 자 위에 체인을 늘어뜨려 10칸을 재고 10으로 나누는 것이 가장 정확합니다. 링크 하나만 재면 0.5mm 오차가 그대로 64배가 되어 3cm가 어긋납니다. 연결 부품도 길이를 먹습니다: 클래스프와 점프링 두 개가 대개 15~20mm이니, 그만큼은 완성 길이에서 미리 빼고 이 계산을 하세요. 케이블·로프 체인처럼 링크가 규칙적인 것은 이 계산이 그대로 맞고, 피가로처럼 긴 칸과 짧은 칸이 반복되는 체인은 반복 한 묶음(예: 긴 1 + 짧은 3)의 길이를 링크 길이 칸에 넣어야 합니다.',
      note: '자를 자리를 정하고 나면 그 링크를 열어 빼내야 하는데, 열어서 다시 닫을 수 있는 링크와 통째로 잘라야 하는 링크가 다릅니다. 용접된 체인은 커터로 잘라야 하고 그러면 자른 링크는 버리게 되므로 실제 길이가 한 칸 짧아집니다. 무거운 펜던트를 달 체인은 링크 개수보다 굵기가 문제입니다 — 얇은 체인은 링크 하나가 벌어지면서 빠집니다. 좌우가 같아야 하는 귀걸이나 쌍으로 쓰는 체인은 두 줄을 나란히 놓고 칸을 세어 자르세요. 줄자로 각각 재면 늘어난 정도가 달라 길이가 어긋납니다.' },
    en: { title: 'Chain Link Calculator', desc: 'Work out how many links a finished chain length takes, and the length whole links actually give.',
      long: 'Chain can only be cut at a link. To reach 45 cm with 7 mm links, 450 ÷ 7 is 64.3, so you take 64 links — and 64 links measure 44.8 cm. There is no way to hit 45 cm exactly; the choice is between 44.8 cm and 45.5 cm at 65 links. Measure the link length by laying the chain along a ruler, counting ten links and dividing by ten: measure a single link and a 0.5 mm error multiplies by 64 into a 3 cm miss. Findings eat length as well — a clasp plus two jump rings is usually 15–20 mm, so subtract that from the finished length before running this. Regular chains such as cable and rope suit the arithmetic directly; on a repeating pattern such as figaro, enter the length of one full repeat (say one long link plus three short) instead.',
      note: 'Once you know where to cut, how you cut matters: some links open and close again, others have to be severed. Soldered chain needs cutters, and the cut link is scrap, so the real length comes out one link short. For a chain carrying a heavy pendant the gauge matters more than the count — a light link opens under load and the pendant leaves. When two chains have to match, as on earrings, lay them side by side and count links rather than measuring each with a tape, which stretches differently every time.' },
  },
  {
    slug: 'earring-wire',
    icon: '👂',
    category: '구슬·포장',
    fields: [
      { key: 'd', term: 'diameter', unit: 'mm', def: 20, min: 0, step: 0.5 },
      { key: 'n', term: 'wraps', unit: 'none', def: 2, min: 0, step: 0.5 },
      { key: 'loop', term: 'loopAllow', unit: 'mm', def: 15, min: 0 },
    ],
    formula: '{wireLen} = {wraps} × π × {diameter} + {loopAllow}',
    compute: v => {
      const per = v.n * Math.PI * v.d + v.loop;
      return [
        { term: 'wireLen', unit: 'mm', value: round(per, 1), digits: 1, primary: true },
        { term: 'total', unit: 'mm', value: round(per * 2, 1), digits: 1 },
      ];
    },
    ko: { title: '귀걸이 와이어 길이 계산기', desc: '후프 지름과 감는 횟수로 한 짝과 한 쌍에 드는 와이어 길이를 구합니다.',
      long: '후프 한 바퀴는 지름 × π입니다. 20mm 후프면 62.8mm이고, 두 바퀴를 감아 겹치게 만들면 125.7mm에 고리 여유 15mm를 더해 한 짝에 140.7mm, 한 쌍에 281.3mm가 듭니다. 고리 여유는 이어와이어에 걸 루프를 만들고 끝을 감아 마무리하는 몫입니다 — 단순한 라운드 노즈 루프 하나는 8~10mm, 감아서 마감하는 래핑 루프는 20~25mm가 듭니다. 감는 횟수는 0.5 단위로 넣을 수 있습니다: 1.5바퀴는 반 바퀴가 겹쳐 앞에서 봤을 때 이중선으로 보이는 후프입니다. 드롭 귀걸이라면 지름 칸에 드롭 폭을, 감는 횟수에 1을 넣으면 둘레 한 바퀴가 나옵니다. 짝을 맞추는 것이 이 계산의 목적입니다 — 두 짝을 따로 재서 자르면 1~2mm 차이가 나고, 귀걸이는 그 차이가 정면에서 보입니다. 한 쌍 길이를 반으로 접어 한 번에 자르세요.',
      note: '여유를 짜게 잡으면 마지막 마감을 못 합니다. 집게로 잡을 손잡이가 없으면 루프를 조일 수 없고, 조이는 동안 와이어가 조금 늘어나 계산보다 실제가 깁니다. 굵은 와이어(0.8mm/20게이지 이상)는 손으로 원을 만들기 어려워 심에 감아야 하고, 그러면 원 지름이 심 지름 + 와이어 지름이 되므로 후프가 계산보다 큽니다. 귀에 통과하는 부분은 반드시 서지컬 스틸·티타늄·순은처럼 알레르기가 적은 재질로 두세요 — 니켈이 든 크래프트 와이어는 후프 본체에만 씁니다. 자를 때마다 끝을 파일로 다듬는 몫으로 1mm는 더 두세요.' },
    en: { title: 'Earring Wire Length Calculator', desc: 'Get the wire per earring and per pair from a hoop diameter, the wraps and a loop allowance.',
      long: 'One turn of a hoop is diameter × π. A 20 mm hoop is 62.8 mm, so two overlapping turns are 125.7 mm, and with a 15 mm loop allowance that is 140.7 mm per earring, 281.3 mm for the pair. The loop allowance covers forming the loop that hangs from the ear wire and finishing the end: a plain round-nose loop takes 8–10 mm, a wrapped loop 20–25 mm. Wraps go in half steps — 1.5 turns gives a hoop with a half overlap that reads as a double line from the front. For a drop rather than a hoop, put the drop width in the diameter field and 1 in the wraps field for a single circumference. Matching is the real point of this calculation: measure and cut the two earrings separately and they come out 1–2 mm apart, which is visible head-on. Cut the pair length, fold it in half, and cut once.',
      note: 'Skimp on the allowance and you cannot finish the piece. Without a tail to grip you cannot tighten the loop, and the wire stretches slightly as you pull it in, so the real length exceeds the arithmetic. Heavy wire — 0.8 mm / 20 gauge and up — will not form a clean circle in the hand and has to be wound on a mandrel, which makes the hoop mandrel plus wire diameter across, larger than calculated. Whatever passes through the ear should be surgical steel, titanium or fine silver; keep nickel-bearing craft wire to the body of the hoop. Add a millimetre per cut for filing the ends smooth.' },
  },
  {
    slug: 'bubble-wrap',
    icon: '🧻',
    category: '구슬·포장',
    fields: [
      { key: 'w', term: 'boxW', unit: 'cm', def: 20, min: 0 },
      { key: 'd', term: 'boxD', unit: 'cm', def: 15, min: 0 },
      { key: 'h', term: 'boxH', unit: 'cm', def: 8, min: 0 },
      { key: 'layers', term: 'layers', unit: 'layer', def: 2, min: 0, step: 1 },
      { key: 'roll', term: 'wrapRollW', unit: 'cm', def: 50, min: 0 },
    ],
    formula: '{wrapLen} = 2 × ({boxW} × {boxD} + {boxW} × {boxH} + {boxD} × {boxH}) × {layers} × 1.15 ÷ {wrapRollW}',
    compute: v => {
      const area = 2 * (v.w * v.d + v.w * v.h + v.d * v.h);
      const need = area * Math.max(0, v.layers) * 1.15; // 겹침·모서리 몫 15%
      const len = ratio(need, v.roll);
      return [
        { term: 'wrapLen', unit: 'cm', value: round(len, 0), digits: 0, primary: true },
        { term: 'total', unit: 'm', value: round(len / 100, 2), digits: 2 },
        { term: 'surface', unit: 'cm2', value: round(area, 0), digits: 0 },
      ];
    },
    ko: { title: '에어캡 사용량 계산기', desc: '상자 치수와 감는 겹 수로 필요한 에어캡(뽁뽁이) 길이를 구합니다.',
      long: '완충재는 롤로 팔리므로 답이 길이여야 하는데, 감는 양을 정하는 것은 상자의 겉면적입니다. 20 × 15 × 8cm 상자의 겉면적은 2 × (20×15 + 20×8 + 15×8) = 1,160㎠입니다. 두 겹으로 감고 겹치는 몫과 모서리에서 접히는 몫으로 15%를 더하면 2,668㎠이고, 폭 50cm 롤에서는 53cm를 뽑으면 됩니다 — 곧 0.53m입니다. 15%가 이 계산의 여유입니다: 감으면 끝이 겹쳐야 테이프가 붙고, 모서리에서는 완충재가 접히면서 평면 면적보다 더 먹습니다. 겹 수는 물건이 정합니다. 깨지지 않는 물건은 한 겹, 유리·도자기·전자제품은 세 겹 이상이고, 모서리와 손잡이처럼 튀어나온 곳은 따로 한 겹 더 감습니다. 100개를 보내야 한다면 이 길이 × 100을 롤 길이로 나눠 롤 개수를 잡으세요 — 폭 50cm 롤이 대개 50m입니다.',
      note: '롤 폭이 상자보다 좁으면 계산이 맞아도 감을 수 없습니다. 한 바퀴 감기려면 롤 폭이 상자의 짧은 쪽(여기서는 깊이 15cm나 높이 8cm) 방향을 덮어야 하니, 폭을 먼저 확인하세요. 기포는 안쪽을 향하게 감습니다 — 겉을 향하면 기포가 눌리지 않고 터져 완충이 사라집니다. 그리고 완충재는 상자 안에서 물건이 움직이지 않게 하는 것이 목적이라, 감고도 상자에 빈틈이 남으면 안 감은 것과 비슷합니다. 부피 무게로 운임을 매기는 배송에서는 완충재를 두껍게 감아 상자를 키우는 것이 운임을 올리므로, 세 겹이 필요하면 상자를 한 치수 키우는 편이 낫습니다.' },
    en: { title: 'Bubble Wrap Calculator', desc: 'Find how much bubble wrap a box takes from its dimensions and the number of layers.',
      long: 'Bubble wrap is sold by the roll, so the answer has to be a length — but what sets the amount is the box\'s surface area. A 20 × 15 × 8 cm box has 2 × (20×15 + 20×8 + 15×8) = 1,160 cm² of surface. Wrap it twice and add 15% for the overlap and the folds at the corners and it comes to 2,668 cm², which off a 50 cm roll is 53 cm — 0.53 m. That 15% is the allowance this calculation depends on: the ends have to overlap for the tape to hold, and corners consume more than flat area. The number of layers is set by the contents: one for something unbreakable, three or more for glass, ceramics and electronics, plus an extra wrap around corners and handles. For a run of 100 parcels, multiply the length by 100 and divide by the roll length — a 50 cm roll is usually 50 m.',
      note: 'If the roll is narrower than the box, correct arithmetic will not help you wrap it: the roll has to span the shorter face — here the 15 cm depth or 8 cm height — so check the width before buying. Wrap bubbles inward; facing out they never compress and simply burst, and the cushioning is gone. Remember too that the point is to stop the contents moving inside the box, so wrapping well and still leaving voids achieves little. Where carriers charge by volumetric weight, padding the box out with extra layers raises the freight bill, so if you need three layers, step up a box size instead.' },
  },
  {
    slug: 'tissue-paper',
    icon: '🛍️',
    category: '구슬·포장',
    fields: [
      { key: 'w', term: 'boxW', unit: 'cm', def: 20, min: 0 },
      { key: 'd', term: 'boxD', unit: 'cm', def: 15, min: 0 },
      { key: 'h', term: 'boxH', unit: 'cm', def: 8, min: 0 },
      { key: 'per', term: 'sheetsPer', unit: 'sheet', def: 2, min: 0, step: 1 },
      { key: 'n', term: 'count', unit: 'ea', def: 10, min: 0, step: 1 },
    ],
    formula: '{wrapW} = {boxW} + 2 × {boxH} + 5, {wrapH} = {boxD} + 2 × {boxH} + 5',
    compute: v => {
      // 바닥을 덮고 양쪽 벽을 올라가 위에서 겹치는 몫 5cm
      const sw = v.w + 2 * v.h + 5;
      const sh = v.d + 2 * v.h + 5;
      return [
        { term: 'wrapW', unit: 'cm', value: round(sw, 0), digits: 0, primary: true },
        { term: 'wrapH', unit: 'cm', value: round(sh, 0), digits: 0 },
        { term: 'total', unit: 'sheet', value: Math.round(Math.max(0, v.per) * Math.max(0, v.n)), digits: 0 },
      ];
    },
    ko: { title: '박엽지 크기 계산기', desc: '상자 치수로 안에 깔 박엽지(속지) 크기와 여러 개 보낼 때의 총 장수를 구합니다.',
      long: '박엽지는 상자 안에 깔아 바닥을 덮고 양쪽 벽을 올라가 위에서 물건을 덮는 종이입니다. 그래서 한 변은 상자 폭에 높이를 두 번(양쪽 벽) 더하고, 위에서 겹치는 몫 5cm를 더합니다 — 20 × 15 × 8cm 상자면 20 + 16 + 5 = 41cm, 다른 방향은 15 + 16 + 5 = 36cm입니다. 41 × 36cm를 덮는 표준 규격은 50 × 70cm(가장 흔한 크기)이고, 반으로 자르면 35 × 50cm가 되어 이 상자에는 조금 짧습니다. 곧 이 계산의 실제 용도는 "표준 장을 그대로 쓸까, 반으로 자를까"를 정하는 것입니다. 상자 하나에 두 장을 쓰는 것이 보통입니다 — 한 장은 십자로 깔아 감싸고 한 장은 위에 덮거나 구겨 빈틈을 채웁니다. 열 개를 보내면 20장이니 100장 묶음 하나로 다섯 번 보낼 만큼입니다.',
      note: '색이 진한 박엽지는 물기에 물이 빠집니다. 젖은 손이나 습한 창고에서 흰 물건에 닿으면 색이 옮으므로 옷·비누·초처럼 흡수하는 물건에는 무산성 흰 종이를 쓰세요. 박엽지는 완충재가 아닙니다 — 보기 좋게 감싸고 표면 흠집을 막는 몫이지 충격을 흡수하지 못하므로, 깨질 물건은 에어캡을 따로 감고 그 위에 박엽지를 씌웁니다. 결이 있는 종이는 결 반대로 접으면 접힌 자리가 갈라지니, 자르기 전에 한 장을 접어 보세요. 그리고 상자 안쪽 치수로 재세요 — 겉치수로 재면 두께만큼 종이가 짧습니다.' },
    en: { title: 'Tissue Paper Size Calculator', desc: 'Size the tissue sheet a box needs, and count the sheets for a run of parcels.',
      long: 'Tissue paper lines the box: it covers the base, climbs both walls and folds over the contents at the top. One side is therefore the box width plus twice the height, for the two walls, plus about 5 cm to overlap on top — for a 20 × 15 × 8 cm box that is 20 + 16 + 5 = 41 cm, and 15 + 16 + 5 = 36 cm the other way. The standard sheet that covers 41 × 36 cm is 50 × 70 cm, the commonest size; halved it becomes 35 × 50 cm, which is slightly short for this box. That is really what this calculation decides: whether to use full sheets or cut them down. Two sheets per parcel is normal — one laid crosswise to wrap the item, one over the top or crushed to fill the gaps. Ten parcels is 20 sheets, so a 100-sheet pack covers five runs like it.',
      note: 'Strongly coloured tissue bleeds. Damp hands or a humid store room will transfer dye onto pale contents, so use acid-free white for anything absorbent such as clothing, soap or candles. Tissue is not cushioning either: it presents the item and keeps surfaces from rubbing, but it absorbs no shock, so fragile goods get bubble wrap first and tissue over it. Grained paper splits along the fold if you fold across the grain, so fold one sheet before cutting a stack. And measure the inside of the box — take outside dimensions and the sheet comes up short by the wall thickness.' },
  },
  {
    slug: 'ribbon-bow',
    icon: '💝',
    category: '구슬·포장',
    fields: [
      { key: 'loops', term: 'loops', unit: 'ea', def: 6, min: 0, step: 1 },
      { key: 'loopLen', term: 'loopLen', unit: 'cm', def: 6, min: 0, step: 0.5 },
      { key: 'tail', term: 'tailLen', unit: 'cm', def: 12, min: 0, step: 0.5 },
      { key: 'knot', term: 'spare', unit: 'cm', def: 5, min: 0, step: 0.5 },
    ],
    formula: '{ribbonLen} = {loops} × 2 × {loopLen} + 2 × {tailLen} + {spare}',
    compute: v => {
      const cm = v.loops * 2 * v.loopLen + 2 * v.tail + v.knot; // 고리는 나갔다 돌아오므로 두 배
      return [
        { term: 'ribbonLen', unit: 'cm', value: round(cm, 0), digits: 0, primary: true },
        { term: 'total', unit: 'm', value: round(cm / 100, 2), digits: 2 },
      ];
    },
    ko: { title: '리본 나비 매듭 길이 계산기', desc: '고리 수와 고리 길이, 꼬리 길이로 매듭 하나에 드는 리본을 구합니다.',
      long: '고리 하나는 나갔다가 돌아오므로 고리 길이의 두 배를 먹습니다. 6cm 고리 여섯 개면 72cm, 꼬리 12cm 두 줄이면 24cm, 중앙을 묶는 몫 5cm를 더해 101cm입니다. 완성된 매듭의 폭은 고리 길이의 두 배쯤이니 여기서는 12cm짜리 매듭이 됩니다 — 상자 폭의 3분의 1 정도가 보기 좋은 크기입니다. 고리 수는 모양을 정합니다: 두 개면 손으로 묶는 단순한 나비, 여섯 개면 층이 생기는 풍성한 매듭, 열 개가 넘으면 폼폼처럼 둥근 꽃 매듭입니다. 이 계산은 매듭만 다룹니다. 상자를 두르는 리본은 선물 리본 길이 계산기(십자 포장 = 2 × (폭 + 높이) + 2 × (깊이 + 높이))로 따로 구해 더하세요 — 같은 리본으로 두르고 매듭까지 만들면 두 값을 합친 길이가 필요하고, 매듭을 따로 만들어 붙이면 이 길이만 있으면 됩니다.',
      note: '리본 폭이 매듭 크기를 정합니다. 폭 25mm 이상 리본은 고리가 뻣뻣하게 서고 6cm 고리도 큼직하게 보이지만, 폭 6mm 리본은 같은 6cm 고리가 힘없이 처집니다 — 얇은 리본은 고리를 더 많이 넣어 채우세요. 와이어가 든 리본은 모양이 유지되지만 없는 리본은 중앙을 묶는 순간 고리가 눌리므로 계산보다 매듭이 작아 보입니다. 새틴처럼 짜인 리본은 자른 끝이 풀리니 끝을 사선으로 자르거나 라이터로 살짝 그슬리고, 그 몫으로 1cm는 더 두세요. 그리고 실패하는 첫 매듭 하나는 계산에 들어 있지 않습니다 — 처음 만들어 보는 모양이면 20~30%를 더 사세요.' },
    en: { title: 'Ribbon Bow Calculator', desc: 'Work out the ribbon a bow itself needs from the loops, loop length and tails.',
      long: 'Each loop goes out and comes back, so it eats twice its own length. Six loops of 6 cm is 72 cm, two 12 cm tails add 24 cm, and 5 cm to tie the centre brings it to 101 cm. The finished bow is roughly twice the loop length across — 12 cm here — and about a third of the box width looks right. The loop count sets the character: two loops is a simple hand-tied bow, six builds up in layers, and past ten it reads as a round pom-pom flower. This tool covers the bow alone. The ribbon that goes around the box is the gift ribbon length calculator, 2 × (width + height) + 2 × (depth + height) for a cross wrap — add the two figures if one length of ribbon both wraps and ties, or use this one on its own if you make the bow separately and attach it.',
      note: 'Ribbon width decides how the bow reads. At 25 mm and wider the loops stand up and a 6 cm loop looks generous; at 6 mm the same loop flops, so thin ribbon needs more loops to fill out. Wire-edged ribbon holds its shape, while plain ribbon collapses the moment you cinch the centre, making the bow look smaller than the numbers suggest. Woven ribbon such as satin frays where cut, so trim on the diagonal or singe the end, and leave a centimetre for it. And the one bow you get wrong is not in the arithmetic — buy 20–30% extra the first time you try a shape.' },
  },
  {
    slug: 'mailer-size',
    icon: '📮',
    category: '구슬·포장',
    fields: [
      { key: 'w', term: 'itemW', unit: 'cm', def: 25, min: 0 },
      { key: 'h', term: 'itemH', unit: 'cm', def: 30, min: 0 },
      { key: 't', term: 'itemD', unit: 'cm', def: 4, min: 0, step: 0.5 },
      { key: 'ease', term: 'spare', unit: 'cm', def: 2, min: 0, step: 0.5 },
    ],
    formula: '{mailerW} = {itemW} + {itemD} + {spare}, {mailerL} = {itemH} + {itemD} + {spare} + 4',
    compute: v => {
      // 봉투는 납작한 자루다 — 둘레가 2 × (가로 + 두께)여야 하므로 폭에 두께가 한 번 들어간다
      const mw = v.w + v.t + Math.max(0, v.ease);
      const ml = v.h + v.t + Math.max(0, v.ease) + 4; // 접착 봉함부 4cm
      return [
        { term: 'mailerW', unit: 'cm', value: round(mw, 1), digits: 1, primary: true },
        { term: 'mailerL', unit: 'cm', value: round(ml, 1), digits: 1 },
      ];
    },
    ko: { title: '택배 봉투 크기 계산기', desc: '물건의 가로·세로·두께로 필요한 택배 봉투(폴리백)의 안쪽 크기를 구합니다.',
      long: '봉투는 납작한 자루라서 물건의 두께가 폭을 먹습니다. 자루의 둘레가 2 × (봉투 폭)이고 물건이 차지하는 둘레가 2 × (가로 + 두께)이므로, 봉투 폭은 가로에 두께를 한 번 더한 값 이상이어야 합니다. 여기에 넣고 빼는 여유 2cm를 더합니다: 25cm 폭, 4cm 두께 물건이면 봉투 폭 31cm입니다. 길이는 같은 이유로 세로에 두께와 여유를 더하고, 접착 봉함부 4cm를 더해 40cm입니다 — 봉함부는 접어 붙이는 자리라 물건이 들어갈 수 없는 구간입니다. 그래서 "31 × 40cm 이상"이 답이고, 파는 규격 중 그보다 크고 가장 가까운 것(예: 32 × 45cm)을 고릅니다. 옷·패브릭처럼 눌리는 물건은 두께를 눌린 상태로 재세요. 판매하는 봉투의 표기가 안쪽 치수인지 봉함부를 포함한 겉치수인지는 제품마다 다릅니다 — 겉치수 표기라면 길이에서 봉함부를 빼고 비교해야 합니다.',
      note: '봉투는 완충이 없습니다. 뽁뽁이 안감이 있는 것도 눌림만 막아 주므로, 깨질 물건은 봉투가 아니라 상자로 보내세요. 여유를 짜게 잡으면 봉함부까지 물건이 밀려 접착면이 안 붙고, 배송 중에 벌어집니다 — 여유는 줄이지 말고 규격을 키우는 쪽이 안전합니다. 반대로 너무 큰 봉투는 안에서 물건이 돌아다녀 모서리가 상하고, 남은 부분이 접혀 스캐너가 라벨을 못 읽습니다. 두꺼운 물건을 억지로 넣으면 봉투가 팽팽해져 모서리에서 찢어지니, 두께가 5cm를 넘으면 봉투 대신 상자를 쓰는 편이 낫습니다. 그리고 봉투 크기는 부피 무게를 줄이는 데 도움이 되지만, 운임 계산은 계약한 배송사의 기준을 따르세요.' },
    en: { title: 'Mailer Size Calculator', desc: 'Size a poly or padded mailer from the item\'s width, length and thickness.',
      long: 'A mailer is a flat sleeve, so the item\'s thickness comes out of the width. The sleeve\'s circumference is 2 × its width, and the item needs 2 × (width + thickness), which means the mailer must be at least the item width plus one thickness. Add 2 cm to get the item in and out: a 25 cm wide item, 4 cm thick, wants a 31 cm mailer. The length works the same way, item length plus thickness plus ease, and then 4 cm for the adhesive lip, giving 40 cm — the lip folds over and no contents can sit in it. So the answer is "31 × 40 cm or bigger", and you buy the nearest stock size above it, say 32 × 45 cm. Measure compressible goods such as clothing at their squashed thickness. Watch how the supplier quotes sizes, too: some list the internal size, others the external size including the lip, and an external figure has to have the lip taken off before you compare.',
      note: 'Mailers do not cushion. Even a bubble-lined one only resists rubbing and pressure, so anything breakable belongs in a box. Skimp on ease and the contents ride up into the adhesive lip, the seal never bonds properly and the bag opens in transit — step up a size rather than trimming the allowance. Oversize is its own problem: the item slides about, corners get knocked, and the slack folds over the label where the scanner cannot read it. Forcing a thick item in stretches the film until it splits at a corner, so past about 5 cm of thickness use a box instead. Mailer size does help with volumetric weight, but price the freight against your own carrier\'s rules.' },
  },
];
