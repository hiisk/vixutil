/**
 * 도형 - 생활 계산 넷째 묶음 (12종) — 자재를 몇 포대·몇 장 사야 하나.
 *
 * 이 섹션에는 이미 부피와 면적을 구하는 도구가 있다(콘크리트 물량, 타일 개수,
 * 벽지 롤 수). 그런데 가게에서 파는 것은 ㎥가 아니라 포대이고, 포대 하나가 얼마를
 * 내는지는 제품마다 다르다 — 40kg 프리믹스는 18L, 20kg은 9L, 슁글 한 묶음은
 * 3.1㎡, 강화마루 한 팩은 2.2㎡. 그래서 수율(포대당 부피·묶음당 면적·㎡당 무게)을
 * 상수로 박지 않고 **입력으로 드러낸다**. 상수로 두면 그 순간 특정 브랜드 전용
 * 계산기가 되고, 사용자는 자기가 산 포대와 왜 다른지 알 수 없다.
 *
 * 같은 이유로 손실률도 입력이다. 재단이 많은 방과 네모난 방은 손실이 세 배 다르고,
 * 모르타르처럼 흘려 버리는 자재는 15%가 현장 값이다.
 *
 * 셈은 모두 올림이다. 포대·장·팩은 쪼개 팔지 않으므로 소수점은 살 수 없는 수다.
 * 0을 넣어도 유한한 값이 나와야 해서 나누기는 전부 ratio()로 막고, 나머지 연산
 * (줄 끝 조각)은 0으로 나누기를 따로 걸러 둔다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** 1스퀘어 = 100제곱피트 — 지붕 자재가 쓰는 단위 */
const SQUARE_M2 = 9.2903;

export const MATERIAL_TOOLS: FormulaTool[] = [
  {
    slug: 'concrete-bags',
    icon: '🏗️',
    category: '생활 계산',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'm', def: 4, min: 0, step: 0.1 },
      { key: 'w', term: 'widthCm', unit: 'm', def: 3, min: 0, step: 0.1 },
      { key: 't', term: 'thickness', unit: 'cm', def: 10, min: 0, step: 0.5 },
      { key: 'y', term: 'bagYieldL', def: 18, min: 0, step: 0.5 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{bagCount} = ⌈{lengthCm} × {widthCm} × {thickness} ÷ 100 × 1000 × (1 + {extraPct} ÷ 100) ÷ {bagYieldL}⌉',
    compute: v => {
      const m3 = v.l * v.w * (v.t / 100);
      const need = m3 * 1000 * (1 + v.extra / 100);
      return [
        { term: 'bagCount', unit: 'bag', value: Math.ceil(ratio(need, v.y)), digits: 0, primary: true },
        { term: 'volume', unit: 'm3', value: round(m3, 3), digits: 3 },
        { term: 'liters', unit: 'liter', value: Math.round(need), digits: 0 },
      ];
    },
    ko: { title: '콘크리트 포대 수 계산기', desc: '면적과 두께, 포대당 나오는 부피로 필요한 포대 수를 구합니다.',
      long: '부피만 구하고 멈추는 것이 이 계산의 함정입니다. 포대당 나오는 부피는 제품마다 달라 상수로 둘 수 없으므로 직접 넣습니다 — 40kg 프리믹스 한 포대가 약 18L, 20kg은 약 9L입니다. 4×3m 자리에 10cm를 부으면 1.2㎥, 곧 1,200L이고 여유 10%를 더한 1,320L을 18L로 나누면 73.3포대이므로 74포대를 사야 합니다. 포대는 쪼개 팔지 않으니 항상 올림합니다.',
      note: '수율은 브랜드마다 다릅니다. 포대에 적힌 산출량(yield)을 그대로 넣으세요. 굳기 시작한 콘크리트는 물을 더 넣어도 되살아나지 않아서, 한 번에 붓는 슬래브에서는 모자라는 쪽이 남는 쪽보다 훨씬 비쌉니다.' },
    en: { title: 'Concrete Bag Calculator', desc: 'Bags of premix needed from area, slab thickness and the yield per bag.',
      long: 'Stopping at the volume is where these jobs go wrong. Yield per bag differs by product, so it is an input here instead of a constant — a 40 kg premix bag gives about 18 L, a 20 kg bag about 9 L. A 4 × 3 m pad at 10 cm is 1.2 m³, or 1,200 L; add 10% waste for 1,320 L and divide by 18 L to get 73.3, so you buy 74 bags. Bags are not sold in fractions, so the count always rounds up.',
      note: 'Yields vary between brands — copy the figure printed on the bag. Concrete cannot be revived once it starts to set, so on a slab poured in one go, running short costs far more than a spare bag does.' },
  },
  {
    slug: 'mortar-bricks',
    icon: '🧱',
    category: '생활 계산',
    fields: [
      { key: 'n', term: 'brickCount', unit: 'piece', def: 500, min: 0, step: 10 },
      { key: 'per', term: 'mortarPerBrick', unit: 'liter', def: 0.3, min: 0, step: 0.05 },
      { key: 'y', term: 'bagYieldL', def: 13, min: 0, step: 0.5 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 15, min: 0, max: 50 },
    ],
    formula: '{mortarVol} = {brickCount} × {mortarPerBrick} × (1 + {extraPct} ÷ 100),  {bagCount} = ⌈{mortarVol} ÷ {bagYieldL}⌉',
    compute: v => {
      const liters = v.n * v.per * (1 + v.extra / 100);
      return [
        { term: 'bagCount', unit: 'bag', value: Math.ceil(ratio(liters, v.y)), digits: 0, primary: true },
        { term: 'mortarVol', unit: 'liter', value: round(liters, 1), digits: 1 },
        { term: 'volume', unit: 'm3', value: round(liters / 1000, 4), digits: 4 },
      ];
    },
    ko: { title: '벽돌 모르타르 양 계산기', desc: '벽돌 수와 1장당 모르타르 양으로 모르타르 부피와 포대 수를 구합니다.',
      long: '벽돌 개수는 이 섹션의 벽돌 개수 계산기로 먼저 구하고, 그 수를 여기 넣어 붙일 모르타르를 셉니다. 1장당 양은 벽 두께와 줄눈 폭이 정하므로 입력으로 둡니다 — 10mm 줄눈으로 반장 쌓기가 약 0.3L, 온장 쌓기는 0.5~0.6L입니다. 벽돌 500장 × 0.3L = 150L이고, 흘리고 굳는 손실 15%를 더하면 172.5L입니다. 한 포대가 13L을 낸다면 13.3포대이므로 14포대입니다.',
      note: '모르타르는 흙손에서 떨어지고 판 위에서 굳는 양이 많아 여유 5%로는 모자랍니다. 15%가 현장에 가까운 값입니다. 배합한 모르타르는 2시간 안에 다 써야 하므로 한 번에 너무 많이 개지 마세요.' },
    en: { title: 'Mortar Calculator for Bricklaying', desc: 'Mortar volume and bags from a brick count and the mortar each brick takes.',
      long: 'Get the brick count from the brick calculator in this section first, then use it here for the mortar that beds them. How much each brick takes depends on wall thickness and joint width, so it is an input: about 0.3 L per brick for a half-brick skin with 10 mm joints, 0.5–0.6 L for a solid wall. 500 bricks × 0.3 L is 150 L, and 15% for droppings brings it to 172.5 L — at 13 L a bag that is 13.3, so 14 bags.',
      note: 'Mortar falls off the trowel and goes off on the spot board, so a 5% allowance is not enough; 15% is closer to site reality. Mixed mortar has to be used within about two hours, so do not gauge more than you can lay.' },
  },
  {
    slug: 'tile-grout',
    icon: '🪣',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 10, min: 0, step: 0.5 },
      { key: 'size', term: 'tileSize', unit: 'cm', def: 30, min: 0, step: 0.5 },
      { key: 'jw', term: 'jointWidth', def: 3, min: 0, step: 0.5 },
      { key: 'jd', term: 'jointDepth', def: 8, min: 0, step: 0.5 },
      { key: 'dens', term: 'groutDensity', unit: 'kgPerM3', def: 1600, min: 0, step: 50 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{groutRate} = 2 ÷ ({tileSize} ÷ 100) × {jointWidth} ÷ 1000 × {jointDepth} ÷ 1000 × {groutDensity},  {groutKg} = {area} × {groutRate} × (1 + {extraPct} ÷ 100)',
    compute: v => {
      // 1㎡에 생기는 줄눈 부피 — 타일 한 변이 짧아질수록 반비례로 늘어난다
      const perM2 = ratio(2, v.size / 100) * (v.jw / 1000) * (v.jd / 1000);
      const rate = perM2 * v.dens;
      return [
        { term: 'groutKg', unit: 'kg', value: round(v.area * rate * (1 + v.extra / 100), 2), digits: 2, primary: true },
        { term: 'groutRate', unit: 'kg', value: round(rate, 3), digits: 3 },
        { term: 'liters', unit: 'liter', value: round(perM2 * v.area * 1000, 2), digits: 2 },
      ];
    },
    ko: { title: '타일 줄눈재 양 계산기', desc: '타일 크기와 줄눈 폭·깊이, 줄눈재 밀도로 필요한 무게를 구합니다.',
      long: '줄눈은 얇은 틈이지만 그 총 길이는 타일이 작을수록 반비례로 늘어납니다. 1㎡에 생기는 줄눈 부피는 (2 ÷ 타일 한 변) × 줄눈 폭 × 줄눈 깊이이고, 여기에 밀도(보통 1,600kg/㎥)를 곱하면 ㎡당 무게가 됩니다. 30cm 타일에 3mm 폭·8mm 깊이면 ㎡당 0.26kg인데, 2.5cm 모자이크는 줄눈을 2mm 폭·4mm 깊이로 얇게 잡아도 ㎡당 1.02kg이 듭니다 — 딱 네 배입니다. 줄눈 폭과 타일 크기가 함께 결과를 정합니다.',
      note: '줄눈 깊이는 대개 타일 두께와 같습니다. 제조사의 소요량 표는 특정 타일 규격을 가정한 값이라 모자이크나 대형 타일에 그대로 옮기면 크게 틀립니다. 배합한 줄눈재는 굳으니 한 번에 쓸 만큼만 나눠 개세요.' },
    en: { title: 'Grout Calculator', desc: 'Grout weight from tile size, joint width and depth, and grout density.',
      long: 'Grout lives in thin gaps, but the total length of those gaps grows inversely with tile size. The joint volume in one square metre is (2 ÷ tile side) × joint width × joint depth; multiply by density, typically 1,600 kg/m³, for the weight per square metre. A 30 cm tile with 3 mm joints 8 mm deep takes 0.26 kg/m²; 2.5 cm mosaic still needs 1.02 kg/m² even with thinner 2 mm joints only 4 mm deep — exactly four times as much. Joint width and tile size set the answer together.',
      note: 'Joint depth is normally the tile thickness. Manufacturer coverage tables assume one tile format, so carrying them across to mosaic or large-format tile is badly wrong. Mixed grout stiffens, so gauge only what you can use.' },
  },
  {
    slug: 'tile-adhesive',
    icon: '🧴',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 10, min: 0, step: 0.5 },
      { key: 'rate', term: 'adhesiveRate', unit: 'kg', def: 4.5, min: 0, step: 0.5 },
      { key: 'bag', term: 'bagWeight', def: 25, min: 0, step: 1 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{adhesiveKg} = {area} × {adhesiveRate} × (1 + {extraPct} ÷ 100),  {bagCount} = ⌈{adhesiveKg} ÷ {bagWeight}⌉',
    compute: v => {
      const kg = v.area * v.rate * (1 + v.extra / 100);
      return [
        { term: 'bagCount', unit: 'bag', value: Math.ceil(ratio(kg, v.bag)), digits: 0, primary: true },
        { term: 'adhesiveKg', unit: 'kg', value: round(kg, 1), digits: 1 },
        { term: 'bagCover', unit: 'm2', value: round(ratio(v.bag, v.rate), 2), digits: 2 },
      ];
    },
    ko: { title: '타일 접착제 양 계산기', desc: '면적과 ㎡당 도포량으로 접착제 무게와 포대 수를 구합니다.',
      long: '도포량은 브랜드가 아니라 흙손 빗살 깊이가 정합니다 — 6mm 빗살이 ㎡당 약 3kg, 10mm가 4.5kg, 12mm가 5.5kg이고, 대형 타일을 뒷면까지 바르거나(백버터링) 바닥이 울면 두 배로 뜁니다. 그래서 제품을 가정하지 않고 도포량을 직접 넣습니다. 10㎡를 10mm 빗살로 붙이면 45kg, 여유 10%를 더해 49.5kg이므로 25kg 포대로 두 포대입니다 — 한 포대가 5.6㎡를 덮습니다.',
      note: '얇게 펴 바르면 타일 뒷면이 다 붙지 않아 몇 달 뒤 깨집니다. 아낄 자리가 아닙니다. 개봉한 시멘트계 접착제는 습기를 먹고 굳으므로 남은 포대를 다음 공사까지 두기 어렵습니다.' },
    en: { title: 'Tile Adhesive Calculator', desc: 'Adhesive weight and bags from the area and the spread rate per m².',
      long: 'The spread rate is set by the trowel notch, not by the brand — roughly 3 kg/m² with a 6 mm notch, 4.5 kg/m² at 10 mm and 5.5 kg/m² at 12 mm, and double that if you back-butter large tiles or work over an uneven floor. That is why the rate is an input rather than a built-in product. Ten square metres at a 10 mm notch is 45 kg; add 10% waste for 49.5 kg, which is two 25 kg bags, since one bag covers 5.6 m².',
      note: 'Spread it thin and the tile is only partly bedded — the cracks appear months later, so this is not the place to economise. Opened cement-based adhesive hardens with humidity, so a part bag rarely lasts until the next job.' },
  },
  {
    slug: 'wallpaper-repeat-waste',
    icon: '📜',
    category: '생활 계산',
    fields: [
      { key: 'run', term: 'lengthCm', unit: 'm', def: 16, min: 0, step: 0.1 },
      { key: 'h', term: 'heightGeo', unit: 'm', def: 2.4, min: 0, step: 0.1 },
      { key: 'rw', term: 'rollWidth', def: 106, min: 0 },
      { key: 'rl', term: 'rollLength', def: 15.6, min: 0, step: 0.1 },
      { key: 'rep', term: 'patternRepeat', def: 53, min: 0, step: 1 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 5, min: 0, max: 50 },
    ],
    formula: '{dropsPerRoll} = ⌊{rollLength} ÷ (⌈{heightGeo} × (1 + {extraPct} ÷ 100) × 100 ÷ {patternRepeat}⌉ × {patternRepeat} ÷ 100)⌋,  {rolls} = ⌈{lengthCm} × 100 ÷ {rollWidth} ÷ {dropsPerRoll}⌉',
    compute: v => {
      const raw = v.h * (1 + v.extra / 100);
      const rep = v.rep / 100;
      // 무늬를 맞추려면 한 폭을 반복 길이의 배수로 올려 잘라야 한다
      const drop = rep > 0 && raw > 0 ? Math.ceil(raw / rep) * rep : raw;
      const perRoll = Math.floor(ratio(v.rl, drop));
      const plainPerRoll = Math.floor(ratio(v.rl, raw));
      const drops = Math.ceil(ratio(v.run * 100, v.rw));
      // 한 롤에서 한 폭도 안 나오면 폭마다 롤을 하나씩 쓴다
      const rolls = perRoll > 0 ? Math.ceil(ratio(drops, perRoll)) : drops;
      const plainRolls = plainPerRoll > 0 ? Math.ceil(ratio(drops, plainPerRoll)) : drops;
      return [
        { term: 'rolls', unit: 'roll', value: rolls, digits: 0, primary: true },
        { term: 'dropsPerRoll', unit: 'piece', value: perRoll, digits: 0 },
        { term: 'extraRolls', unit: 'roll', value: rolls - plainRolls, digits: 0 },
      ];
    },
    ko: { title: '벽지 무늬 반복 손실 계산기', desc: '무늬 반복 길이를 반영해 롤당 나오는 폭 수와 더 드는 롤을 구합니다.',
      long: '이 섹션의 벽지 롤 수 계산기는 면적만 봅니다. 여기는 무늬 반복을 한 겹 더 얹습니다 — 무늬가 있으면 폭마다 무늬를 맞춰야 하므로 한 폭을 반복 길이의 배수로 올려 잘라야 하고, 그 올림이 손실의 정체입니다. 천장 2.4m에 재단 여유 5%를 더하면 2.52m인데 반복이 53cm면 다섯 칸, 곧 2.65m로 잘라야 합니다. 15.6m 롤에서 무늬 없는 벽지는 여섯 폭이 나오지만 이 경우는 다섯 폭입니다. 둘레 16m를 106cm 폭으로 덮으려면 16폭이 필요하니 4롤 대 3롤 — 무늬가 한 롤을 더 먹습니다.',
      note: '반복 길이는 롤 라벨의 repeat에 적혀 있고, 하프 드롭(엇갈림) 무늬는 그 두 배로 잡아야 맞습니다. 롤 번호(배치)가 다르면 색이 미묘하게 갈리므로, 나중에 한 롤을 더 사면 그 폭만 눈에 띕니다.' },
    en: { title: 'Wallpaper Pattern Repeat Calculator', desc: 'Drops per roll once the pattern repeat is counted, and the rolls it costs.',
      long: 'The roll calculator in this section works from area alone; this one adds the repeat. With a patterned paper every drop has to line up, so each drop is cut to a whole number of repeats — and that rounding up is the waste. A 2.4 m ceiling plus 5% trim is 2.52 m, but with a 53 cm repeat you must cut five repeats, or 2.65 m. A 15.6 m roll yields six plain drops and only five patterned ones. Covering a 16 m run at 106 cm wide takes 16 drops, so four rolls instead of three — the repeat costs a whole roll.',
      note: 'The repeat is printed on the roll label, and a half-drop (offset) pattern needs twice that figure. Buy the rolls together: a different batch number shifts the colour just enough that a later roll shows as one odd drop.' },
  },
  {
    slug: 'roof-shingles',
    icon: '🏠',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'roofArea', unit: 'm2', def: 100, min: 0, step: 0.5 },
      { key: 'cover', term: 'bundleCover', unit: 'm2', def: 3.1, min: 0, step: 0.1 },
      { key: 'ridge', term: 'ridgeLen', unit: 'm', def: 12, min: 0, step: 0.5 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{bundleCount} = ⌈({roofArea} × (1 + {extraPct} ÷ 100) + {ridgeLen} × 0.3) ÷ {bundleCover}⌉,  {squares} = {area} ÷ 9.2903',
    compute: v => {
      // 능선 캡은 폭 30cm쯤 되는 띠를 두 겹으로 덮는 셈이다
      const total = v.area * (1 + v.extra / 100) + v.ridge * 0.3;
      return [
        { term: 'bundleCount', unit: 'bundle', value: Math.ceil(ratio(total, v.cover)), digits: 0, primary: true },
        { term: 'squares', unit: 'square', value: round(total / SQUARE_M2, 2), digits: 2 },
        { term: 'area', unit: 'm2', value: round(total, 2), digits: 2 },
      ];
    },
    ko: { title: '아스팔트 슁글 묶음 수 계산기', desc: '지붕 면적과 묶음당 시공 면적으로 필요한 묶음 수와 스퀘어를 구합니다.',
      long: '지붕 자재는 스퀘어로 셉니다 — 100제곱피트, 곧 9.29㎡입니다. 슁글 한 묶음이 대개 1/3스퀘어(약 3.1㎡)라서 세 묶음이 한 스퀘어지만 제품마다 달라 묶음당 면적을 직접 넣습니다. 100㎡ 지붕에 여유 10%면 110㎡이고, 능선 12m는 캡을 두 겹으로 덮으니 1m당 0.3㎡씩 3.6㎡를 더해 113.6㎡입니다. 3.1로 나누면 36.6이므로 37묶음, 스퀘어로는 12.2입니다.',
      note: '넣는 면적은 경사를 반영한 실제 지붕 면적입니다. 위에서 본 바닥 면적을 넣으면 모자라니 경사 지붕 면적 계산기로 먼저 바꾸세요. 골짜기와 끝단 재단이 많은 지붕은 여유 10%로 부족합니다.' },
    en: { title: 'Roof Shingle Calculator', desc: 'Bundles and squares from the roof area and the coverage of one bundle.',
      long: 'Roofing is counted in squares — 100 square feet, or 9.29 m². A bundle of three-tab shingles usually covers a third of a square, about 3.1 m², so three bundles make a square, but it varies by product, which is why coverage per bundle is an input. A 100 m² roof with 10% waste is 110 m²; 12 m of ridge, capped in a double layer, adds about 0.3 m² per metre for another 3.6 m², giving 113.6 m². Divided by 3.1 that is 36.6, so 37 bundles, or 12.2 squares.',
      note: 'Enter the true sloped roof area, not the footprint — convert it with the pitched roof calculator first or you will come up short. Roofs with many valleys and cut edges need more than a 10% allowance.' },
  },
  {
    slug: 'laminate-packs',
    icon: '📦',
    category: '생활 계산',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'm', def: 5, min: 0, step: 0.1 },
      { key: 'w', term: 'widthCm', unit: 'm', def: 4, min: 0, step: 0.1 },
      { key: 'plank', term: 'plankLen', unit: 'cm', def: 128, min: 0 },
      { key: 'cover', term: 'packCover', unit: 'm2', def: 2.2, min: 0, step: 0.05 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 8, min: 0, max: 50 },
    ],
    formula: '{packCount} = ⌈{lengthCm} × {widthCm} × (1 + {extraPct} ÷ 100) ÷ {packCover}⌉,  {offcut} = ({lengthCm} × 100) mod {plankLen}',
    compute: v => {
      const area = v.l * v.w;
      const need = area * (1 + v.extra / 100);
      // 0으로 나머지를 구하면 NaN이 된다
      const offcut = v.plank > 0 ? (v.l * 100) % v.plank : 0;
      return [
        { term: 'packCount', unit: 'pack', value: Math.ceil(ratio(need, v.cover)), digits: 0, primary: true },
        { term: 'offcut', unit: 'cm', value: round(offcut, 1), digits: 1 },
        { term: 'area', unit: 'm2', value: round(area, 2), digits: 2 },
      ];
    },
    ko: { title: '강화마루 팩 수 계산기', desc: '방 크기와 팩당 시공 면적으로 필요한 팩 수와 줄 끝 조각을 구합니다.',
      long: '팩당 면적은 판 규격과 한 팩에 든 장수가 정하므로 제품 라벨의 값을 그대로 넣습니다 — 대개 1.9~2.5㎡입니다. 5×4m 방은 20㎡, 여유 8%를 더하면 21.6㎡이고 2.2㎡ 팩이면 9.8이므로 10팩입니다. 팩은 쪼개 팔지 않아 올림입니다. 줄 끝에서 잘라 낸 조각은 다음 줄의 첫 장으로 씁니다 — 5m 줄에 128cm 판이면 116cm가 남고, 30cm보다 길어서 버리지 않습니다.',
      note: '줄 끝 조각이 30cm보다 짧으면 이음선이 몰려 보기 나쁘고 밟으면 들립니다. 그럴 때는 그 줄을 반 장에서 시작해 이음선을 어긋나게 놓으세요. 로트가 다르면 색이 갈리니 여유분은 처음에 한꺼번에 사는 편이 낫습니다.' },
    en: { title: 'Laminate Flooring Pack Calculator', desc: 'Packs from room size and pack coverage, plus the offcut you can reuse.',
      long: 'Coverage per pack depends on the plank size and how many planks are boxed, so take it from the label — usually 1.9–2.5 m². A 5 × 4 m room is 20 m²; add 8% waste for 21.6 m², and at 2.2 m² a pack that is 9.8, so 10 packs, because packs are not split. The piece cut off at the end of a row starts the next row: a 5 m row of 128 cm planks leaves 116 cm, comfortably over the 30 cm minimum, so nothing is thrown away.',
      note: 'Offcuts under about 30 cm bunch the end joints together and lift underfoot — start that row with a half plank instead to stagger them. Buy the spare packs with the first order, because a later production lot will not match the shade.' },
  },
  {
    slug: 'drywall-sheets',
    icon: '🔲',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 60, min: 0, step: 0.5 },
      { key: 'sw', term: 'sheetWidth', def: 900, min: 0, step: 10 },
      { key: 'sl', term: 'sheetLength', def: 2400, min: 0, step: 10 },
      { key: 'rate', term: 'compoundRate', unit: 'kg', def: 0.35, min: 0, step: 0.05 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{sheetCount} = ⌈{area} × (1 + {extraPct} ÷ 100) ÷ ({sheetWidth} ÷ 1000 × {sheetLength} ÷ 1000)⌉,  {compoundKg} = {area} ÷ ({sheetWidth} ÷ 1000) × {compoundRate}',
    compute: v => {
      const per = (v.sw / 1000) * (v.sl / 1000);
      // 폭 방향으로 한 장마다 이음선이 하나 생긴다
      const joint = ratio(v.area, v.sw / 1000);
      return [
        { term: 'sheetCount', unit: 'sheet', value: Math.ceil(ratio(v.area * (1 + v.extra / 100), per)), digits: 0, primary: true },
        { term: 'compoundKg', unit: 'kg', value: round(joint * v.rate, 1), digits: 1 },
        { term: 'tapeLen', unit: 'm', value: round(joint * 1.05, 1), digits: 1 },
      ];
    },
    ko: { title: '석고보드 장수 계산기', desc: '면적과 보드 규격으로 장수와 이음선 퍼티·테이프 양을 구합니다.',
      long: '보드 규격은 나라마다 다릅니다 — 국내는 900×1800·900×2400mm, 북미는 1220×2440mm가 표준이라 판 크기를 입력으로 둡니다. 60㎡에 여유 10%면 66㎡이고 900×2400(2.16㎡)이면 30.6장이므로 31장입니다. 이음선은 폭 방향으로 한 장마다 하나씩 생기니 면적을 보드 폭으로 나누면 총 길이가 나옵니다 — 60 ÷ 0.9 = 66.7m입니다. 1m당 퍼티 0.35kg이면 23kg, 테이프는 겹치는 여유를 더해 70m입니다.',
      note: '장수보다 퍼티가 먼저 모자랍니다. 테이핑에 초벌·재벌·마감을 더하면 1m당 0.5kg까지 올라갑니다. 천장은 12.5mm 이상을 쓰고 장수를 넉넉히 잡으세요 — 머리 위 작업은 잘라 버리는 조각이 훨씬 많습니다.' },
    en: { title: 'Drywall Sheet Calculator', desc: 'Sheets from wall and ceiling area, plus joint compound and tape per metre.',
      long: 'Sheet sizes differ by market — 900 × 1800 and 900 × 2400 mm in Korea, 1220 × 2440 mm in North America — so the sheet size is an input. 60 m² with 10% waste is 66 m², and at 2.16 m² a sheet (900 × 2400) that is 30.6, so 31 sheets. One joint appears per sheet width across the run, so area divided by sheet width gives the joint length: 60 ÷ 0.9 = 66.7 m. At 0.35 kg of compound per metre that is 23 kg, with 70 m of tape once the overlaps are counted.',
      note: 'You run out of compound before you run out of board — taping plus a fill and a finish coat can reach 0.5 kg per metre. On ceilings use 12.5 mm board or thicker and buy sheets generously, since overhead work produces far more offcuts.' },
  },
  {
    slug: 'plywood-sheets',
    icon: '🪵',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 24, min: 0, step: 0.5 },
      { key: 'sw', term: 'sheetWidth', def: 1220, min: 0, step: 10 },
      { key: 'sl', term: 'sheetLength', def: 2440, min: 0, step: 10 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{sheetCount} = ⌈{area} × (1 + {extraPct} ÷ 100) ÷ ({sheetWidth} ÷ 1000 × {sheetLength} ÷ 1000)⌉',
    compute: v => {
      const per = (v.sw / 1000) * (v.sl / 1000);
      const n = Math.ceil(ratio(v.area * (1 + v.extra / 100), per));
      return [
        { term: 'sheetCount', unit: 'sheet', value: n, digits: 0, primary: true },
        { term: 'remaining', unit: 'm2', value: round(n * per - v.area, 2), digits: 2 },
        { term: 'area', unit: 'm2', value: round(per, 3), digits: 3 },
      ];
    },
    ko: { title: '합판 장수 계산기', desc: '면적과 합판 규격으로 필요한 장수와 남는 면적을 구합니다.',
      long: '합판은 규격 한 장이 통째로 팔리고, 방은 그 배수로 생기지 않습니다. 24㎡에 여유 10%면 26.4㎡이고 1220×2440(2.977㎡) 한 장으로 나누면 8.9장이므로 9장입니다. 9장은 26.8㎡라서 2.8㎡가 남는데, 이 남는 면적이 "고정 규격은 어정쩡한 방을 딱 나누지 못한다"는 말의 실제 크기입니다. 규격을 바꿔 넣어 보면 남는 양이 줄어드는 조합이 보입니다.',
      note: '장수가 맞아도 조각이 안 맞을 수 있습니다. 재단 배치를 먼저 그려 긴 쪽을 어느 방향으로 놓을지 정하세요. 구조용으로 쓸 때는 이음선이 장선 위에 오도록 배치해야 해서 손실이 10%를 넘습니다.' },
    en: { title: 'Plywood Sheet Calculator', desc: 'Sheets needed from the area and sheet size, with the leftover you will hold.',
      long: 'Plywood sells as whole sheets, and rooms never come in multiples of one. 24 m² with 10% waste is 26.4 m²; divided by a 1220 × 2440 sheet (2.977 m²) that is 8.9, so 9 sheets. Nine sheets are 26.8 m², leaving 2.8 m² over — and that leftover is the real size of the fact that a fixed sheet size rarely tiles an odd room. Try other sheet sizes and you will see the leftover shrink.',
      note: 'The count can be right while the pieces still do not fit; sketch the cutting layout and decide which way the long edge runs first. For structural work the joints have to land on joists, which pushes waste past 10%.' },
  },
  {
    slug: 'skirting-length',
    icon: '📏',
    category: '생활 계산',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'm', def: 4.2, min: 0, step: 0.1 },
      { key: 'w', term: 'widthCm', unit: 'm', def: 3.4, min: 0, step: 0.1 },
      { key: 'dw', term: 'doorWidth', unit: 'm', def: 0.9, min: 0, step: 0.05 },
      { key: 'dn', term: 'doorCount', unit: 'ea', def: 1, min: 0, max: 10, step: 1 },
      { key: 'stock', term: 'stockLen', unit: 'm', def: 2.4, min: 0, step: 0.1 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{skirtLen} = (2 × ({lengthCm} + {widthCm}) − {doorWidth} × {doorCount}) × (1 + {extraPct} ÷ 100),  {stockCount} = ⌈{skirtLen} ÷ {stockLen}⌉',
    compute: v => {
      const peri = 2 * (v.l + v.w);
      const net = Math.max(0, peri - v.dw * v.dn);
      const need = net * (1 + v.extra / 100);
      return [
        { term: 'skirtLen', unit: 'm', value: round(need, 2), digits: 2, primary: true },
        { term: 'stockCount', unit: 'piece', value: Math.ceil(ratio(need, v.stock)), digits: 0 },
        { term: 'perimeter', unit: 'm', value: round(peri, 2), digits: 2 },
      ];
    },
    ko: { title: '걸레받이 길이 계산기', desc: '방 둘레에서 문 폭을 빼고 여유를 더해 길이와 자루 수를 구합니다.',
      long: '둘레는 2×(가로+세로)이고 여기서 문 개구부를 뺍니다 — 4.2×3.4m 방이면 15.2m, 문 하나(0.9m)를 빼면 14.3m입니다. 이음과 45° 재단 손실로 10%를 더하면 15.7m이고, 2.4m 자루로 나누면 6.55이므로 7자루를 사야 합니다. 자루는 잘라 쓰지만 남은 토막이 짧으면 못 쓰니 올림합니다.',
      note: '모서리를 45°로 맞물리면 한 변마다 자루 하나를 통째로 써야 해서 길이 계산보다 더 듭니다. 벽이 휘어 있으면 이음선이 벌어지므로 긴 벽은 이어 붙이지 않고 한 자루로 덮는 편이 낫습니다.' },
    en: { title: 'Skirting Board Length Calculator', desc: 'Skirting metres and lengths to buy from the perimeter minus door openings.',
      long: 'The perimeter is 2 × (length + width), less the door openings: a 4.2 × 3.4 m room is 15.2 m, and one 0.9 m door leaves 14.3 m. Add 10% for joints and mitre cuts to reach 15.7 m, then divide by a 2.4 m stock length for 6.55 — so you buy 7 lengths, rounded up because short ends are unusable.',
      note: 'Mitred corners often mean one whole length per wall, which is more than the metres suggest. Where walls bow, a single uncut length across the long wall hides the gap better than two pieces joined in the middle.' },
  },
  {
    slug: 'mulch-bags',
    icon: '🌿',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 20, min: 0, step: 0.5 },
      { key: 'depth', term: 'gravelDepth', unit: 'cm', def: 7, min: 0, step: 0.5 },
      { key: 'bv', term: 'bagVolume', def: 50, min: 0, step: 5 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{bagCount} = ⌈{area} × {gravelDepth} ÷ 100 × 1000 × (1 + {extraPct} ÷ 100) ÷ {bagVolume}⌉',
    compute: v => {
      const m3 = v.area * (v.depth / 100);
      const need = m3 * 1000 * (1 + v.extra / 100);
      return [
        { term: 'bagCount', unit: 'bag', value: Math.ceil(ratio(need, v.bv)), digits: 0, primary: true },
        { term: 'volume', unit: 'm3', value: round(m3, 3), digits: 3 },
        { term: 'liters', unit: 'liter', value: Math.round(need), digits: 0 },
      ];
    },
    ko: { title: '멀칭재 포대 수 계산기', desc: '화단 면적과 깔 두께, 한 포대 부피로 필요한 포대 수를 구합니다.',
      long: '멀칭은 면적이 아니라 두께가 일을 합니다 — 7cm는 깔아야 빛이 막혀 잡초가 올라오지 못하고, 2~3cm는 보기만 좋습니다. 20㎡에 7cm면 1.4㎥, 곧 1,400L이고 여유 10%를 더해 1,540L입니다. 한 포대가 50L(약 2세제곱피트)이면 30.8이므로 31포대입니다. 포대 부피는 제품마다 달라 라벨의 L 표시를 그대로 넣습니다.',
      note: '나무껍질 멀칭은 한 해에 두께가 절반으로 삭습니다. 매년 절반씩 다시 채운다고 보면 됩니다. 줄기에 바로 붙여 쌓으면 습기가 갇혀 뿌리목이 썩으니 그 자리는 비워 두세요.' },
    en: { title: 'Mulch Calculator', desc: 'Bags of mulch from bed area, spread depth and the litres in one bag.',
      long: 'With mulch it is depth, not area, that does the work — about 7 cm blocks the light so weed seeds never get away, while 2–3 cm only looks tidy. A 20 m² bed at 7 cm is 1.4 m³, or 1,400 L; add 10% for 1,540 L, and at 50 L a bag (roughly 2 cubic feet) that is 30.8, so 31 bags. Bag volumes differ by product, so take the litres from the label.',
      note: 'Bark mulch loses about half its depth in a year, so budget on topping it up annually. Keep it off the stems: piled against a trunk it traps moisture and rots the collar.' },
  },
  {
    slug: 'paver-sand',
    icon: '🪨',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 20, min: 0, step: 0.5 },
      { key: 'depth', term: 'gravelDepth', unit: 'cm', def: 3, min: 0, step: 0.5 },
      { key: 'dens', term: 'sandDensity', unit: 'kgPerM3', def: 1500, min: 0, step: 50 },
      { key: 'bag', term: 'bagWeight', def: 25, min: 0, step: 1 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{sandKg} = {area} × {gravelDepth} ÷ 100 × (1 + {extraPct} ÷ 100) × {sandDensity},  {bagCount} = ⌈{sandKg} ÷ {bagWeight}⌉',
    compute: v => {
      const m3 = v.area * (v.depth / 100) * (1 + v.extra / 100);
      const kg = m3 * v.dens;
      return [
        { term: 'sandKg', unit: 'kg', value: Math.round(kg), digits: 0, primary: true },
        { term: 'bagCount', unit: 'bag', value: Math.ceil(ratio(kg, v.bag)), digits: 0 },
        { term: 'volume', unit: 'm3', value: round(m3, 3), digits: 3 },
      ];
    },
    ko: { title: '포장 블록 모래 양 계산기', desc: '포장 면적과 깔 두께, 모래 밀도로 필요한 무게와 포대 수를 구합니다.',
      long: '모래는 부피로 재고 무게로 팝니다. 그 사이를 잇는 것이 밀도이므로 밀도를 입력으로 둡니다 — 마른 모래 1,500, 젖은 모래 1,900kg/㎥입니다. 20㎡에 3cm를 깔면 0.6㎥, 여유 10%를 더한 0.66㎥에 1,500을 곱해 990kg이고, 25kg 포대로 39.6이므로 40포대입니다. 1톤 벌크백 하나가 25kg 포대 40개와 비슷하니 이 정도 규모면 벌크가 싸집니다.',
      note: '깔고 다지면 두께가 10~15% 줍니다. 여기 넣는 값은 다진 뒤의 두께라야 하고, 부으면서 재면 모자랍니다. 줄눈에 쓸어 넣는 규사는 이 계산과 별개로 1㎡당 1~2kg 더 듭니다.' },
    en: { title: 'Paver Sand Calculator', desc: 'Bedding sand weight and bags from the paved area, depth and sand density.',
      long: 'Sand is measured by volume and sold by weight, and density is what bridges the two, so it is an input: about 1,500 kg/m³ dry and 1,900 kg/m³ wet. A 20 m² patio bedded 3 cm deep is 0.6 m³; with 10% waste that is 0.66 m³, which at 1,500 kg/m³ weighs 990 kg — 39.6 bags of 25 kg, so 40 bags. One tonne bulk bag holds about the same, and at this size bulk works out cheaper.',
      note: 'Sand loses 10–15% of its depth once compacted, so enter the finished depth rather than what you measure while spreading. Joint sand swept in afterwards is separate and adds another 1–2 kg per square metre.' },
  },
];
