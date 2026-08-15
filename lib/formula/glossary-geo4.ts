/**
 * 자재 수량 용어의 뜻풀이(ko·en).
 *
 * 여기 나오는 값은 대부분 자기 집에서 재는 것이 아니라 **포대에 적혀 있는 것**이다 —
 * 수율, 묶음당 면적, 팩당 면적, 한 포대 몇 L. 어디를 보고 옮겨 적어야 하는지를
 * 적어 두지 않으면 사람들은 그럴듯한 숫자를 지어 넣고, 답은 조용히 틀린다.
 * 재는 것(줄눈 폭, 능선 길이, 깔 두께)은 어디에 자를 대는지를 적는다.
 */
import type { Term } from './terms.ts';

export const GEO4_DESC: Record<string, Term> = {
  /* ───────── 포대·수율 ───────── */
  bagCount: { ko: '사야 하는 포대 수. 쪼개 팔지 않으므로 소수점은 올림합니다.', en: 'How many bags to buy; they are not sold in fractions, so this rounds up.' },
  bagYieldL: { ko: '한 포대를 물과 섞었을 때 나오는 부피. 포대의 산출량(yield) 표시를 그대로 옮겨 적습니다.', en: 'The volume one bag makes once mixed — copy the yield printed on the bag.' },
  bagWeight: { ko: '한 포대의 무게. 20·25·40kg이 흔하고 포대 앞면에 적혀 있습니다.', en: 'The weight of one bag; 20, 25 and 40 kg are common and printed on the front.' },
  bagVolume: { ko: '한 포대에 들어 있는 부피(L). 멀칭재와 흙은 무게가 아니라 L로 팝니다.', en: 'The litres in one bag; mulch and compost are sold by volume, not weight.' },
  bagCover: { ko: '그 도포량으로 한 포대가 덮는 면적. 몇 포대가 필요한지 감을 잡는 값입니다.', en: 'How much area one bag covers at that spread rate — a sanity check on the count.' },

  /* ───────── 모르타르·줄눈·접착제 ───────── */
  mortarPerBrick: { ko: '벽돌 한 장을 붙이는 데 드는 모르타르. 줄눈 10mm 반장 쌓기가 약 0.3L, 온장 쌓기는 0.5~0.6L입니다.', en: 'Mortar to bed one brick: about 0.3 L for a half-brick skin with 10 mm joints, 0.5–0.6 L for a solid wall.' },
  mortarVol: { ko: '손실을 더해 개야 하는 모르타르의 부피.', en: 'The volume of mortar to gauge, waste included.' },
  jointWidth: { ko: '타일 사이 틈의 폭. 스페이서 규격이 그 값입니다.', en: 'The gap between tiles — the size of the spacers you use.' },
  jointDepth: { ko: '줄눈이 채워지는 깊이. 보통 타일 두께와 같습니다.', en: 'How deep the joint fills, normally the same as the tile thickness.' },
  groutDensity: { ko: '줄눈재의 굳은 밀도. 시멘트계는 1,500~1,700kg/㎥이고 봉지에 적혀 있습니다.', en: 'The set density of the grout; cement-based runs 1,500–1,700 kg/m³ and is on the bag.' },
  groutKg: { ko: '손실을 더해 사야 하는 줄눈재의 무게.', en: 'The weight of grout to buy, waste included.' },
  groutRate: { ko: '1㎡를 메우는 데 드는 줄눈재. 타일이 작을수록 커집니다.', en: 'Grout to fill one square metre; smaller tiles push it up.' },
  adhesiveRate: { ko: '1㎡에 바르는 접착제 무게. 흙손 빗살 깊이가 정합니다 — 6mm는 3kg, 10mm는 4.5kg쯤입니다.', en: 'Adhesive spread on one square metre, set by the trowel notch — about 3 kg at 6 mm, 4.5 kg at 10 mm.' },
  adhesiveKg: { ko: '손실을 더해 사야 하는 접착제의 무게.', en: 'The weight of adhesive to buy, waste included.' },

  /* ───────── 벽지 무늬 ───────── */
  patternRepeat: { ko: '같은 무늬가 다시 나오기까지의 길이. 롤 라벨의 repeat 값이고, 하프 드롭 무늬는 그 두 배로 잡습니다.', en: 'The distance before the pattern repeats — the repeat on the roll label; double it for a half-drop.' },
  dropsPerRoll: { ko: '한 롤에서 잘라 낼 수 있는 폭의 수. 무늬를 맞추면 줄어듭니다.', en: 'How many drops you can cut from one roll; matching a pattern lowers it.' },
  extraRolls: { ko: '무늬가 없는 벽지와 비교해 무늬 때문에 더 사야 하는 롤 수.', en: 'The rolls the repeat costs you compared with a plain paper.' },

  /* ───────── 지붕 슁글 ───────── */
  bundleCover: { ko: '슁글 한 묶음이 덮는 면적. 대개 1/3스퀘어, 곧 3.1㎡ 안팎이고 포장에 적혀 있습니다.', en: 'The area one bundle covers — usually a third of a square, about 3.1 m², printed on the wrapper.' },
  bundleCount: { ko: '사야 하는 묶음 수. 올림이며 여유와 능선 캡이 포함된 값입니다.', en: 'Bundles to buy, rounded up, with waste and ridge caps already inside.' },
  ridgeLen: { ko: '지붕 꼭대기와 귀마루를 따라 잰 길이. 캡을 두 겹으로 덮어야 하는 구간입니다.', en: 'The length along the top ridge and the hips — the runs that need a double layer of caps.' },
  squares: { ko: '지붕 자재의 거래 단위. 1스퀘어는 100제곱피트, 곧 9.29㎡입니다.', en: 'The roofing trade unit; one square is 100 square feet, or 9.29 m².' },

  /* ───────── 바닥·판재 ───────── */
  packCover: { ko: '한 팩이 덮는 면적. 팩 옆면에 ㎡로 적혀 있고 대개 1.9~2.5㎡입니다.', en: 'The area one pack covers, printed in m² on the side of the box — usually 1.9–2.5 m².' },
  packCount: { ko: '사야 하는 팩 수. 팩은 쪼개 팔지 않아 올림합니다.', en: 'Packs to buy; boxes are not split, so this rounds up.' },
  plankLen: { ko: '판 한 장의 길이. 강화마루는 120~130cm가 흔합니다.', en: 'The length of one plank; 120–130 cm is common for laminate.' },
  offcut: { ko: '줄 끝에서 잘라 낸 조각의 길이. 30cm보다 길면 다음 줄의 첫 장으로 씁니다.', en: 'The piece left at the end of a row; over about 30 cm it starts the next row.' },
  sheetWidth: { ko: '판 한 장의 짧은 쪽 길이. 이음선 간격을 정하는 값입니다.', en: 'The short side of one sheet — it sets how often joints fall.' },
  sheetLength: { ko: '판 한 장의 긴 쪽 길이. 천장 높이에 맞춰 고릅니다.', en: 'The long side of one sheet, usually chosen to match the ceiling height.' },
  sheetCount: { ko: '사야 하는 판의 장수. 장은 잘라 팔지 않아 올림합니다.', en: 'Sheets to buy; they are not cut down at the till, so this rounds up.' },
  compoundRate: { ko: '이음선 1m를 테이핑하고 마감하는 데 드는 퍼티. 세 번 바르면 0.5kg까지 올라갑니다.', en: 'Compound to tape and finish one metre of joint; three coats can reach 0.5 kg.' },
  compoundKg: { ko: '이음선 전체에 드는 퍼티의 무게.', en: 'The total weight of joint compound for every joint.' },
  tapeLen: { ko: '이음선 길이에 겹치는 여유를 더한 조인트 테이프 길이.', en: 'Joint tape length — the joints plus an allowance for overlaps.' },

  /* ───────── 걸레받이 ───────── */
  doorWidth: { ko: '걸레받이를 두르지 않는 문틀 안쪽 폭. 문짝이 아니라 개구부를 잽니다.', en: 'The clear width of a door opening, measured at the frame rather than the door.' },
  doorCount: { ko: '그 방에 있는 문 개구부의 수. 붙박이장 앞면도 뺄지 먼저 정하세요.', en: 'How many openings the room has; decide up front whether fitted units count too.' },
  stockLen: { ko: '가게에서 파는 자루 하나의 길이. 2.4m와 3.6m가 흔합니다.', en: 'The length of one length as sold; 2.4 m and 3.6 m are the usual sizes.' },
  stockCount: { ko: '사야 하는 자루 수. 남은 토막이 짧으면 못 쓰므로 올림합니다.', en: 'Lengths to buy, rounded up, because short leftover ends are unusable.' },
  skirtLen: { ko: '손실을 더해 필요한 걸레받이의 총 길이.', en: 'The total metres of skirting needed, waste included.' },

  /* ───────── 모래 ───────── */
  sandDensity: { ko: '모래 1㎥의 무게. 마른 모래 1,500, 젖은 모래 1,900kg/㎥ 정도입니다.', en: 'The weight of a cubic metre of sand: about 1,500 kg/m³ dry, 1,900 kg/m³ wet.' },
  sandKg: { ko: '손실을 더해 주문해야 하는 모래의 무게. 모래는 무게로 팝니다.', en: 'The weight of sand to order, waste included — sand is sold by weight.' },

  /* ───────── 수영장 난방·순환 ───────── */
  tempRise: { ko: '지금 수온에서 올리려는 도수. 목표 온도가 아니라 차이를 넣습니다.', en: 'The number of degrees to gain — enter the difference, not the target temperature.' },
  heaterKw: { ko: '히터가 물에 실제로 넣는 열출력. 히트펌프는 소비전력이 아니라 이 값입니다.', en: 'The heat the unit puts into the water; for a heat pump this is output, not input.' },
  heatLossPct: { ko: '데우는 동안 수면으로 달아나는 열의 비율. 덮개가 이 값을 절반 아래로 낮춥니다.', en: 'The share lost from the surface while heating; a cover typically more than halves it.' },
  heatHours: { ko: '쉬지 않고 돌렸을 때 목표 온도에 닿는 시간. 낮에만 켜면 그보다 길어집니다.', en: 'Hours to reach target running non-stop; heating only by day takes longer than this.' },
  heatKwh: { ko: '손실까지 포함해 실제로 넣어야 하는 열의 양.', en: 'The energy actually needed once the losses while heating are included.' },
  kwhPerDeg: { ko: '이 수영장을 1도 올리는 데 드는 전력량. 목표를 바꿔도 곱하기만 하면 됩니다.', en: 'The energy this pool needs per degree — change the target and just multiply.' },
  turnoverHours: { ko: '물 전체가 여과기를 한 번 지나가는 데 걸리는 시간.', en: 'How long the whole body of water takes to pass through the filter once.' },
  turnoverPerDay: { ko: '하루에 물을 몇 바퀴 돌릴지 정한 목표. 시간이 아니라 이 횟수가 기준입니다.', en: 'How many turnovers a day you are aiming for — the real standard, not hours.' },
  runHours: { ko: '그 순환 횟수를 채우려면 하루에 돌려야 하는 시간.', en: 'The hours a day the pump must run to deliver that many turnovers.' },
  pumpKw: { ko: '펌프가 쓰는 전력. 유량을 낮추면 세제곱에 가깝게 떨어집니다.', en: 'The pump draw; it falls with roughly the cube of flow when you slow it down.' },
  monthKwh: { ko: '그 가동 시간으로 한 달에 쓰는 전력량. 자기 단가를 곱하면 요금이 됩니다.', en: 'A month of running at that schedule; multiply by your own tariff for the cost.' },

  /* ───────── 잔디 파종 ───────── */
  seedRate: { ko: '1㎡에 뿌리는 씨앗 무게. 봉지에 적힌 값이 종마다 두세 배씩 다릅니다.', en: 'Grams sown per square metre; the figure on the bag varies two- or three-fold by species.' },
  seedKg: { ko: '여유를 더해 사야 하는 씨앗 무게. 남은 씨앗은 해마다 발아율이 떨어집니다.', en: 'The seed to buy with waste added; leftovers lose germination every year they sit.' },
};
