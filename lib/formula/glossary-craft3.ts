/**
 * 새 공예 용어의 뜻풀이 — 퀼트 새싱·보더·프리컷, 자수 타래·수틀, 양초 붓기·허용치(ko·en).
 *
 * 이 묶음에서 답이 갈리는 자리는 거의 다 "그 값이 완성 치수인가 재단 치수인가"와
 * "무엇을 기준으로 잰 비율인가"다. 보더 폭을 재단 폭으로 넣으면 완성 크기가
 * 시접만큼 작아지고, 향 허용치를 전체 무게 기준으로 읽으면 한계를 넘긴 채
 * 통과한다. 그래서 라벨을 다시 풀어 쓰지 않고 어디를 어떻게 재는 값인지 적는다.
 */
import type { Term } from './terms.ts';

export const CRAFT3_DESC: Record<string, Term> = {
  /* 퀼트 — 새싱·보더 */
  sashingW: { ko: '블록 사이에 끼우는 띠의 완성 폭. 재단 폭은 여기에 시접 두 번을 더한 값입니다.', en: 'The finished width of the strip between blocks; cut it two seam allowances wider.' },
  sashingLen: { ko: '짧은 조각과 긴 띠를 모두 더한 길이. 원단 폭 방향으로 잘라 씁니다.', en: 'Short pieces and long strips added together, cut across the fabric width.' },
  borderW: { ko: '퀼트 바깥으로 나가는 띠의 완성 폭. 양쪽에 붙으므로 폭이 두 배로 늘어납니다.', en: 'The border\'s finished width; it lands on both edges, so the quilt grows by twice this.' },
  borderW2: { ko: '안쪽 보더 위에 한 겹 더 두르는 띠의 완성 폭. 0이면 보더가 한 겹입니다.', en: 'The finished width of a second round outside the first; zero means a single border.' },
  borderLen: { ko: '보더로 잘라야 하는 스트립 길이의 합계. 모서리에서 늘어난 몫이 들어 있습니다.', en: 'Total strip length to cut for the borders, including what the corners add.' },
  borderedW: { ko: '보더를 다 두른 뒤의 폭. 바인딩 전 치수입니다.', en: 'The width once every border is on, before binding.' },
  borderedH: { ko: '보더를 다 두른 뒤의 길이. 뒷천과 솜은 이 치수로 잡습니다.', en: 'The length once every border is on — size the backing and batting from this.' },
  mitreStripW: { ko: '위아래에 붙일 스트립을 자를 길이. 45도로 잘려 나갈 몫이 양 끝에 붙어 있습니다.', en: 'Cut length for the top and bottom strips, with the mitre waste on both ends.' },
  mitreStripH: { ko: '옆면에 붙일 스트립을 자를 길이. 위아래보다 퀼트 길이만큼 깁니다.', en: 'Cut length for the side strips, longer by the quilt\'s length.' },
  mitreMark: { ko: '스트립 양 끝에서 안쪽으로 들어와 표시하는 거리. 그 두 점 사이만 박습니다.', en: 'How far in from each strip end to mark; stitch only between the two marks.' },
  mitreDiag: { ko: '모서리에서 45도로 자를 선의 길이. 보더 폭에 √2를 곱한 값입니다.', en: 'Length of the 45° line at the corner — the border width times √2.' },

  /* 퀼트 — 프리컷 */
  fqW: { ko: '팻쿼터의 짧은 변. 1야드를 넷으로 가른 18인치 쪽입니다.', en: 'The short side of a fat quarter — the 18 in edge of a quartered yard.' },
  fqH: { ko: '팻쿼터의 긴 변. 원단 폭 절반인 22인치 쪽입니다.', en: 'The long side, the 22 in half-width edge.' },
  fqLeftover: { ko: '조각을 다 자른 뒤 남는 면적. 좁고 긴 자투리로 남습니다.', en: 'Area left after cutting, and it comes out as narrow offcuts.' },
  rollStrips: { ko: '묶음에 들어 있는 스트립 장수. 젤리롤은 대개 40장입니다.', en: 'How many strips the bundle holds; a jelly roll is usually 40.' },
  rollStripW: { ko: '프리컷 스트립의 재단 폭. 2.5인치가 젤리롤 규격입니다.', en: 'The precut strip as cut — 2.5 in is the jelly roll standard.' },
  rollStripLen: { ko: '스트립 한 장의 길이. 원단 폭에서 자르므로 42인치 안팎입니다.', en: 'One strip end to end; cut across the bolt it runs about 42 in.' },
  piecedArea: { ko: '스트립을 이었을 때 남는 면적. 시접에 먹힌 몫을 뺀 값입니다.', en: 'The area left once the strips are sewn, with the seams taken out.' },

  /* 자수 */
  flossPerSkein: { ko: '타래 라벨에 적힌 길이. 6가닥이 이 길이만큼 감겨 있습니다.', en: 'The length on the skein band; all six strands run that far.' },
  flossSpare: { ko: '실을 얼마나 넉넉히 살지. 뒷면 건너뛰기와 풀린 실을 메우는 몫입니다.', en: 'How much extra to buy, covering travels on the back and strands you lose.' },
  flossSkeins: { ko: '사야 하는 타래 수. 쪼개 팔지 않으므로 올림입니다.', en: 'Skeins to buy; they are not sold in parts, so it rounds up.' },
  flossSkeinYield: { ko: '한 타래를 단일 가닥으로 풀었을 때의 길이. 라벨 길이의 여섯 배입니다.', en: 'One skein measured as single strand — six times the label length.' },
  flossLeft: { ko: '올림으로 사고 남는 실 길이. 다음 도안으로 넘어갑니다.', en: 'Floss left over after rounding up, which carries to the next chart.' },
  hoopD: { ko: '수틀 안쪽 원의 지름. 도안 대각선이 이 안에 들어가야 합니다.', en: 'The inside diameter of the ring; the design\'s diagonal has to fit inside it.' },
  hoopInch: { ko: '같은 지름을 인치로 옮긴 값. 수틀은 인치로 팝니다.', en: 'The same diameter in inches, which is how hoops are sold.' },
  threadsPerStitch: { ko: '한 코가 덮는 원단 올 수. 아이다는 1, 린넨·이븐위브는 보통 2입니다.', en: 'Fabric threads each stitch spans — 1 on aida, usually 2 on linen and evenweave.' },
  stsPerInch: { ko: '1인치에 실제로 놓이는 코 수. 카운트를 덮는 올 수로 나눈 값입니다.', en: 'Stitches actually worked per inch — the count divided by threads per stitch.' },

  /* 양초 — 붓기·배합 */
  firstPour: { ko: '처음 부은 왁스 무게. 꺼진 자리를 메우기 전의 양입니다.', en: 'The wax poured first, before anything is added to fill the sink.' },
  topUpWt: { ko: '굳은 뒤 꺼진 자리를 메우는 데 더 붓는 무게.', en: 'Extra wax poured over the set surface to fill where it sank.' },
  waxDyePct: { ko: '왁스 무게 기준의 염료 비율. 대개 0.1~1% 사이입니다.', en: 'Dye as a share of the wax weight, normally between 0.1 and 1%.' },
  waxDyeWt: { ko: '재어 넣는 염료의 양. 블록이면 조각을 잘라 무게로 맞춥니다.', en: 'How much dye to weigh in; cut a block down to hit the weight.' },
  totalLoadPct: { ko: '향료와 염료를 합친 비율. 왁스 허용치와 견줄 숫자는 이것입니다.', en: 'Fragrance and dye together — this is the figure to compare with the wax\'s ceiling.' },
  waxA: { ko: '섞을 두 왁스 가운데 첫 번째의 무게. 보통 단단한 쪽입니다.', en: 'The weight of the first of the two waxes, usually the harder one.' },
  waxB: { ko: '두 번째 왁스의 무게. 전체에서 A를 뺀 값입니다.', en: 'The second wax by weight — the total less wax A.' },
  waxLayers: { ko: '나눠 붓는 층의 수. 층마다 굳을 때까지 기다립니다.', en: 'How many separate pours; each one waits for the last to set.' },
  waxPerLayer: { ko: '한 층에 붓는 왁스 무게. 층을 고르게 둔다고 봤을 때입니다.', en: 'Wax per pour, assuming the layers are all the same depth.' },
  layerVol: { ko: '한 층이 차지하는 부피. 계량컵에 이 눈금까지 담습니다.', en: 'The volume one layer takes, so you can pour to a mark in the jug.' },
  waxHeight: { ko: '용기 안에서 왁스가 차는 높이. 바닥에서 표면까지입니다.', en: 'How high the wax stands inside the vessel, base to surface.' },

  /* 양초 — 허용치·재고·값 */
  maxFragrancePct: { ko: '왁스 설명서에 적힌 최대 향 허용치. 왁스 무게 기준입니다.', en: 'The maximum load the wax states, measured against the wax weight.' },
  maxFragranceWt: { ko: '그 허용치까지 넣을 수 있는 향료 무게.', en: 'The most oil that load allows, by weight.' },
  fragranceHeadroom: { ko: '허용치까지 남은 몫. 음수면 이미 넘긴 것입니다.', en: 'What is left before the ceiling; negative means it is already passed.' },
  waxStock: { ko: '지금 가지고 있는 왁스 무게. 봉지에 적힌 무게입니다.', en: 'The wax you have on hand, as the bag states it.' },
  meltLossPct: { ko: '냄비와 주둥이에 남아 못 쓰는 비율. 작게 여러 번 녹이면 커집니다.', en: 'The share left in the pot and jug; melting in small batches raises it.' },
  waxLoss: { ko: '그 비율만큼 실제로 못 쓰게 되는 왁스 무게.', en: 'The wax that share actually costs you, by weight.' },
  leftoverWax: { ko: '개수를 채운 뒤 남는 왁스. 한 개 몫이 안 되는 양입니다.', en: 'Wax left after the last full candle — less than one candle\'s worth.' },
  marginAtPrice: { ko: '정한 판매가로 실제로 남는 이익률. 판매가를 기준으로 셉니다.', en: 'The margin the chosen price really gives, measured against that price.' },
};
