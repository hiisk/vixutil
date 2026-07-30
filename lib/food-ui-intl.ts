/**
 * 요리 도구 화면 문구의 세 언어 사전.
 *
 * 데이터 이름표는 lib/food-intl.ts, 계산은 lib/food.ts에 있다. 여기에는
 * 라벨·버튼·설명 문단만 둔다.
 */
import type { FoodLang } from './food-intl.ts';
export type { FoodLang };

export const MEASURE_UI: Record<FoodLang, {
  ingredient: string; modes: string[];
  cup: string; cupUnit: string; tbsp: string; tsp: string; weight: string;
  basedOn: (name: string, ml: number) => string;
  cupStandard: string; standards: string[];
  whyTitle: string; why: string; standardNote: (cupMl: number) => string;
}> = {
  ko: {
    ingredient: '재료', modes: ['계량도구 → 그램', '그램 → 계량도구'],
    cup: '컵', cupUnit: '컵', tbsp: '큰술', tsp: '작은술', weight: '무게',
    basedOn: (name, ml) => `${name} 기준 · 부피 ${ml}ml`,
    cupStandard: '컵 기준', standards: ['한국·유럽 200ml', '미국 240ml'],
    whyTitle: '왜 재료를 골라야 하나요',
    why: '같은 1컵이라도 밀가루는 120g, 설탕은 200g, 꿀은 284g입니다. 부피가 같아도 밀도가 다르기 때문입니다. ‘1컵 = 200g’으로 퉁치면 베이킹은 거의 실패합니다.',
    standardNote: cupMl => `지금은 1컵 ${cupMl}ml, 1큰술 15ml, 1작은술 5ml 기준입니다. 레시피 출처의 컵 기준과 맞는지 확인하세요.`,
  },
  en: {
    ingredient: 'Ingredient', modes: ['Measures → grams', 'Grams → measures'],
    cup: 'Cups', cupUnit: 'cup', tbsp: 'Tbsp', tsp: 'tsp', weight: 'Weight',
    basedOn: (name, ml) => `${name} · volume ${ml}ml`,
    cupStandard: 'Cup standard', standards: ['Metric 200ml', 'US 240ml'],
    whyTitle: 'Why the ingredient matters',
    why: 'A cup of flour is 120g, a cup of sugar is 200g, a cup of honey is 284g. Same volume, different density. Treat every cup as the same weight and your baking will almost certainly fail.',
    standardNote: cupMl => `Currently using a ${cupMl}ml cup, 15ml tablespoon and 5ml teaspoon. Check which cup your recipe was written with — the two differ by 20%.`,
  },
};

export const RECIPE_SCALE_UI: Record<FoodLang, {
  /** 곱하지 않고 그대로 둘 단위 — 온도·시간·인분 */
  keepUnits: RegExp;
  fromLabel: string; toLabel: string; servingUnit: string;
  scaleUp: (f: number) => string; scaleDown: (f: number) => string;
  pasteLabel: string; placeholder: string;
  resultLabel: (n: number) => string; copy: string; copied: string; empty: string;
  noteTitle: string; note: string;
}> = {
  ko: {
    keepUnits: /^(도|℃|°C|분|초|시간|인분|%|번|회|cm|mm)/,
    fromLabel: '원래 레시피', toLabel: '만들 양', servingUnit: '인분',
    scaleUp: f => `${f}배로 늘립니다`, scaleDown: f => `${f}배로 줄입니다`,
    pasteLabel: '레시피 붙여넣기',
    placeholder: '돼지고기 300g\n양파 1개\n간장 2큰술\n설탕 1/2큰술\n180도로 20분',
    resultLabel: n => `${n}인분 재료`, copy: '복사하기', copied: '✅ 복사했습니다',
    empty: '위에 레시피를 붙여 넣으세요',
    noteTitle: '온도와 시간은 바꾸지 않습니다',
    note: '‘180도로 20분’의 숫자까지 곱하면 오븐이 360도가 됩니다. 도·분·초·인분이 붙은 숫자는 그대로 둡니다. 다만 양이 두 배가 되면 익는 데 시간이 더 걸리므로, 오븐 요리는 시간을 조금 늘리고 중간에 확인하세요. 소금·향신료는 배율대로 넣으면 짜질 수 있어 조금 적게 시작하는 편이 안전합니다.',
  },
  en: {
    keepUnits: /^(°C|°F|℃|C\b|F\b|min|minute|minutes|sec|second|seconds|hour|hours|hr|serving|servings|%|cm|mm|inch|in\b)/i,
    fromLabel: 'Original recipe', toLabel: 'Making', servingUnit: 'servings',
    scaleUp: f => `scaling everything up ${f}×`, scaleDown: f => `scaling everything down to ${f}×`,
    pasteLabel: 'Paste the recipe',
    placeholder: '300g pork\n1 onion\n2 tbsp soy sauce\n1/2 tbsp sugar\n20 minutes at 180°C',
    resultLabel: n => `Ingredients for ${n}`, copy: 'Copy', copied: '✅ Copied',
    empty: 'Paste a recipe above',
    noteTitle: 'Temperatures and times are left alone',
    note: 'Multiply the numbers in ‘20 minutes at 180°C’ and you end up with a 360°C oven. Anything attached to a degree, a minute, a second or a serving count stays as it is. Do bear in mind that double the quantity takes longer to cook, so add a little time for anything in the oven and check partway. Salt and spices scaled exactly can come out too strong — start slightly under.',
  },
};

export const SALT_UI: Record<FoodLang, {
  presets: string[]; presetNotes: string[];
  modes: string[]; water: string; targetPct: string; saltAdded: string;
  subSalt: string; subPct: string; saltWord: string;
  byTotalExact: (pct: number, g: number) => string; byTotalPct: (p: number) => string;
  presetTitle: string; note: string;
}> = {
  ko: {
    presets: ['겉절이·즉석', '배추 절이기', '장아찌', '염장'],
    presetNotes: ['살짝만 절일 때', '김장 기본', '오래 두고 먹을 때', '아주 오래 보관'],
    modes: ['소금량 구하기', '염도 구하기'],
    water: '물', targetPct: '원하는 염도', saltAdded: '넣은 소금',
    subSalt: '물 무게 기준 · 총량 기준으로는 아래 참고', subPct: '물 대비 / 총량 대비',
    saltWord: '소금',
    byTotalExact: (pct, g) => `총량(물+소금) 기준으로 정확히 ${pct}%를 맞추려면 ${g}g`,
    byTotalPct: p => `총량(물+소금) 기준으로는 ${p}%`,
    presetTitle: '용도별 권장 염도',
    note: '소금 종류에 따라 같은 부피라도 무게가 다릅니다. 굵은 소금은 알갱이 사이 공간이 많아 같은 컵에 담아도 가볍고, 맛소금은 첨가물이 있어 더 짜게 느껴집니다. 저울로 무게를 재는 편이 확실합니다.',
  },
  en: {
    presets: ['Quick pickle', 'Salting cabbage', 'Long pickle', 'Curing'],
    presetNotes: ['A light salting only', 'The kimchi standard', 'To keep for a while', 'For very long storage'],
    modes: ['Find the salt', 'Find the salinity'],
    water: 'Water', targetPct: 'Target salinity', saltAdded: 'Salt added',
    subSalt: 'By weight of water · see below for by total weight', subPct: 'Of water / of total',
    saltWord: 'Salt',
    byTotalExact: (pct, g) => `For exactly ${pct}% of the total (water + salt), use ${g}g`,
    byTotalPct: p => `${p}% of the total weight (water + salt)`,
    presetTitle: 'Suggested salinity by purpose',
    note: 'The same volume of different salts weighs a different amount. Coarse salt has air between the grains, so a cup of it weighs less, and table salt with additives tastes saltier. Weighing on a scale is the reliable way.',
  },
};

export const OVEN_UI: Record<FoodLang, {
  modes: string[]; temp: string; time: string; minUnit: string;
  gasMarkSub: (mark: string, min: number) => string;
  celsius: string; fahrenheit: string; gasMark: string;
  airTitle: string; airValue: (c: number, m: number) => string; airNote: string;
  presetTitle: string; note: string;
}> = {
  ko: {
    modes: ['섭씨(℃)로 입력', '화씨(°F)로 입력'],
    temp: '오븐 온도', time: '굽는 시간', minUnit: '분',
    gasMarkSub: (mark, min) => `가스마크 ${mark} · ${min}분`,
    celsius: '섭씨', fahrenheit: '화씨', gasMark: '가스마크',
    airTitle: '에어프라이어로 만든다면', airValue: (c, m) => `${c}℃ · ${m}분`,
    airNote: '온도를 20도 낮추고 시간을 20% 줄인 값입니다. 뜨거운 바람이 재료에 직접 닿아 같은 온도라도 훨씬 빨리 익기 때문입니다. 중간에 한 번 열어 확인하는 편이 안전합니다.',
    presetTitle: '자주 쓰는 온도',
    note: '가정용 오븐은 표시 온도와 실제 온도가 20도까지 차이 나기도 합니다. 자주 쓰는 오븐이라면 오븐 온도계를 하나 두고 실제 온도를 확인해 보세요. 예열은 표시등이 꺼진 뒤에도 5분쯤 더 기다리는 편이 확실합니다.',
  },
  en: {
    modes: ['Enter °C', 'Enter °F'],
    temp: 'Oven temperature', time: 'Bake time', minUnit: 'min',
    gasMarkSub: (mark, min) => `Gas mark ${mark} · ${min} min`,
    celsius: 'Celsius', fahrenheit: 'Fahrenheit', gasMark: 'Gas mark',
    airTitle: 'If you are using an air fryer', airValue: (c, m) => `${c}°C · ${m} min`,
    airNote: 'That is 20°C lower and 20% less time. Hot air hits the food directly, so it cooks much faster at the same temperature. Open it once partway to check.',
    presetTitle: 'Common temperatures',
    note: 'A home oven can be up to 20°C away from what the dial says. If it is an oven you use often, put a thermometer in it and find out. For preheating, waiting another five minutes after the light goes out is the safer bet.',
  },
};

export const STEAK_UI: Record<FoodLang, {
  finalCenter: string; pullAt: (name: string) => string; afterRest: (t: number) => string;
  thickness: string; perSide: string; aboutMin: (m: number) => string;
  restTime: string; minSuffix: (m: number) => string; pullTemp: string;
  whyTitle: string; why: string; note: string;
}> = {
  ko: {
    finalCenter: '최종 중심', pullAt: name => `${name} — 불에서 꺼낼 때`,
    afterRest: t => `휴지 후 ${t}℃가 됩니다`,
    thickness: '고기 두께', perSide: '한 면 굽기', aboutMin: m => `약 ${m}분`,
    restTime: '휴지 시간', minSuffix: m => `${m}분`, pullTemp: '꺼내는 온도',
    whyTitle: '왜 목표보다 낮게 꺼내나요',
    why: '불에서 내린 뒤에도 겉의 열이 안으로 퍼지며 중심 온도가 3~5도 더 오릅니다. 목표 온도에서 꺼내면 한 단계 더 익은 고기가 됩니다. 꺼낸 뒤 두께의 두 배쯤 되는 시간만큼 쉬게 두면 육즙이 고기 전체로 퍼져 썰었을 때 흐르지 않습니다.',
    note: '굽는 시간은 팬 온도·고기 온도·기름 양에 따라 크게 달라지는 어림값입니다. 정확히 하려면 심부 온도계를 쓰세요. 다진 고기와 가금류는 식중독 위험 때문에 속까지 완전히 익혀야 합니다.',
  },
  en: {
    finalCenter: 'Final centre', pullAt: name => `${name} — pull it off the heat at`,
    afterRest: t => `It reaches ${t}°C after resting`,
    thickness: 'Thickness', perSide: 'Per side', aboutMin: m => `about ${m} min`,
    restTime: 'Rest', minSuffix: m => `${m} min`, pullTemp: 'Pull temperature',
    whyTitle: 'Why pull it below the target',
    why: 'Heat from the surface keeps moving inward after it leaves the pan, and the centre climbs another 3–5°C. Pull it at the target and you get meat one level more done than you wanted. Rest it for roughly twice the thickness in minutes and the juices redistribute, so they do not run out when you cut.',
    note: 'Cooking times are rough — pan temperature, meat temperature and the amount of oil all change them a lot. Use a probe thermometer if you want it exact. Minced meat and poultry must be cooked all the way through because of the food poisoning risk.',
  },
};

export const RICE_UI: Record<FoodLang, {
  grains: string[]; grainNotes: string[]; soaks: string[];
  textures: string[]; riceCups: string; cupUnit: string;
  grainTitle: string; textureTitle: string;
  ratioSub: (ratio: number, cups: number) => string; waterWord: string;
  riceLabel: string; waterLabel: string; soakLabel: string;
  tipTitle: (grain: string) => string; knuckle: string; rinseNote: string;
  waterTimes: (r: number) => string;
}> = {
  ko: {
    grains: ['백미', '현미', '잡곡'],
    grainNotes: ['햅쌀은 1.1, 묵은쌀은 1.3', '겨층이 물을 잘 안 먹습니다', '콩은 따로 더 불리세요'],
    soaks: ['30분', '2시간 이상', '1시간'],
    textures: ['고슬', '보통', '진밥'],
    riceCups: '쌀 (계량컵)', cupUnit: '컵',
    grainTitle: '쌀 종류', textureTitle: '밥의 질기',
    ratioSub: (ratio, cups) => `쌀 : 물 = 1 : ${ratio} · 물 ${cups}컵`, waterWord: '물',
    riceLabel: '쌀', waterLabel: '물', soakLabel: '불리는 시간',
    tipTitle: grain => `${grain} 요령`,
    knuckle: '손등 기준으로는 쌀을 평평하게 고른 뒤 손등이 잠길 정도(약 1.5cm)가 백미 보통입니다. 다만 냄비 지름에 따라 크게 달라지므로, 같은 냄비를 쓸 때만 믿을 만한 기준입니다.',
    rinseNote: '쌀을 씻은 뒤 체에 밭쳐 물기를 빼고 재야 정확합니다. 젖은 쌀은 이미 물을 먹은 상태입니다.',
    waterTimes: r => `물 ${r}배`,
  },
  en: {
    grains: ['White rice', 'Brown rice', 'Mixed grain'],
    grainNotes: ['1.1 for new-crop rice, 1.3 for older rice', 'The bran layer resists water', 'Soak any beans separately, for longer'],
    soaks: ['30 min', '2 hours or more', '1 hour'],
    textures: ['Firm', 'Normal', 'Soft'],
    riceCups: 'Rice (cups)', cupUnit: 'cups',
    grainTitle: 'Type of rice', textureTitle: 'How soft you want it',
    ratioSub: (ratio, cups) => `rice : water = 1 : ${ratio} · ${cups} cups of water`, waterWord: 'Water',
    riceLabel: 'Rice', waterLabel: 'Water', soakLabel: 'Soak',
    tipTitle: grain => `${grain} — how to get it right`,
    knuckle: 'By the knuckle method, level the rice out and add water until it just covers your knuckle, about 1.5cm — that is normal white rice. It depends heavily on the diameter of the pot, so it is only reliable when you always use the same one.',
    rinseNote: 'Rinse the rice, drain it in a sieve, then measure — wet rice has already taken on water.',
    waterTimes: r => `${r}× water`,
  },
};

export const PASTA_UI: Record<FoodLang, {
  shapes: string[]; noodle: string; servingNote: string;
  ratioSub: string; waterWord: string; saltWord: string;
  waterLabel: string; saltLabel: string; timeLabel: string; minSuffix: (m: number) => string;
  shapeTitle: string; alDente: string; alDenteNote: string;
  saltTitle: string; saltNote: string; waterNote: string;
}> = {
  ko: {
    shapes: ['스파게티', '링귀네', '펜네', '푸실리', '파르팔레', '페투치네'],
    noodle: '면', servingNote: '1인분은 보통 80~100g입니다 (많이 먹으면 120g)',
    ratioSub: '면 100g당 물 1L · 소금 10g 기준', waterWord: '물', saltWord: '소금',
    waterLabel: '물', saltLabel: '소금', timeLabel: '삶는 시간', minSuffix: m => `${m}분`,
    shapeTitle: '면 종류',
    alDente: '알덴테로 (1분 덜 삶기)', alDenteNote: '소스와 볶을 예정이라면 켜세요',
    saltTitle: '소금을 왜 이렇게 많이 넣나요',
    saltNote: '면에 간이 배는 유일한 기회이기 때문입니다. 대부분은 물과 함께 버려지고 면에 남는 양은 적습니다. 물이 팔팔 끓은 뒤에 소금을 넣고, 면을 넣기 전에 한 번 저어 녹이세요.',
    waterNote: '면수는 버리지 말고 한 국자 남겨 두세요. 전분이 녹아 있어 소스와 면이 겉돌지 않게 잡아 줍니다.',
  },
  en: {
    shapes: ['Spaghetti', 'Linguine', 'Penne', 'Fusilli', 'Farfalle', 'Fettuccine'],
    noodle: 'Pasta', servingNote: 'A serving is usually 80–100g (120g if you are hungry)',
    ratioSub: '1L water and 10g salt per 100g of pasta', waterWord: 'Water', saltWord: 'Salt',
    waterLabel: 'Water', saltLabel: 'Salt', timeLabel: 'Cooking time', minSuffix: m => `${m} min`,
    shapeTitle: 'Pasta shape',
    alDente: 'Al dente (one minute less)', alDenteNote: 'Turn this on if it is going into a pan with sauce',
    saltTitle: 'Why so much salt',
    saltNote: 'This is the only chance the pasta itself gets seasoned. Most of the salt goes down the drain with the water and only a little stays in the pasta. Add it once the water is at a full boil, and stir before the pasta goes in.',
    waterNote: 'Do not throw all the pasta water away — keep a ladle of it. The starch in it keeps the sauce clinging to the pasta instead of sliding off.',
  },
};

export const COFFEE_UI: Record<FoodLang, {
  modes: string[]; drinkWater: string; yieldLabel: string; beanLabel: string;
  beanWord: string; waterWord: string;
  beanStat: string; waterStat: string; ratioStat: string;
  note: string;
}> = {
  ko: {
    modes: ['물 양으로 계산', '원두 양으로 계산'],
    drinkWater: '마실 물', yieldLabel: '추출할 양', beanLabel: '원두',
    beanWord: '원두', waterWord: '물',
    beanStat: '원두', waterStat: '물', ratioStat: '비율',
    note: '비율은 시작점일 뿐입니다. 같은 비율이라도 물 온도(90~95℃)와 분쇄도에 따라 맛이 크게 달라집니다. 쓰고 텁텁하면 굵게 갈거나 물 온도를 낮추고, 싱겁고 신맛만 나면 곱게 갈거나 시간을 늘리세요.',
  },
  en: {
    modes: ['Start from the water', 'Start from the coffee'],
    drinkWater: 'Water to drink', yieldLabel: 'Shot yield', beanLabel: 'Coffee',
    beanWord: 'Coffee', waterWord: 'Water',
    beanStat: 'Coffee', waterStat: 'Water', ratioStat: 'Ratio',
    note: 'The ratio is only a starting point. At the same ratio, water temperature (90–95°C) and grind size still change the taste a lot. Bitter and muddy means grind coarser or drop the temperature; thin and sour means grind finer or brew longer.',
  },
};

export const PAN_UI: Record<FoodLang, {
  shapes: string[]; diameter: string; width: string; height: string;
  fromTitle: string; toTitle: string;
  areaSub: (from: number, to: number) => string; batter: string; timesUnit: string;
  fromArea: string; toArea: string; scaleStat: string; timesSuffix: (n: number) => string;
  timeTitle: string; timeBigger: string; timeSmaller: string; timeSame: string;
  note: string;
}> = {
  ko: {
    shapes: ['원형', '사각'], diameter: '지름', width: '가로', height: '세로',
    fromTitle: '레시피의 틀', toTitle: '내가 쓸 틀',
    areaSub: (from, to) => `넓이 ${from}cm² → ${to}cm²`, batter: '반죽', timesUnit: '배',
    fromArea: '레시피 틀 넓이', toArea: '내 틀 넓이', scaleStat: '반죽 배율', timesSuffix: n => `${n}배`,
    timeTitle: '굽는 시간도 조정하세요',
    timeBigger: '틀이 커져 반죽이 얇게 퍼지면 더 빨리 익습니다. 원래 시간의 80% 지점에서 확인해 보세요.',
    timeSmaller: '틀이 작아 반죽이 두꺼워지면 속이 덜 익기 쉽습니다. 온도를 10도 낮추고 시간을 늘리세요.',
    timeSame: '넓이가 비슷해 시간은 거의 그대로 두면 됩니다.',
    note: '넓이 비율로 계산하므로 틀 높이가 비슷할 때 맞습니다. 깊이가 크게 다르면 반죽 두께가 달라져 굽는 시간이 많이 바뀝니다. 반죽은 틀의 60~70%까지만 채우세요.',
  },
  en: {
    shapes: ['Round', 'Square'], diameter: 'Diameter', width: 'Width', height: 'Length',
    fromTitle: 'The recipe’s tin', toTitle: 'The tin you have',
    areaSub: (from, to) => `area ${from}cm² → ${to}cm²`, batter: 'Batter', timesUnit: '×',
    fromArea: 'Recipe tin area', toArea: 'Your tin area', scaleStat: 'Batter scale', timesSuffix: n => `${n}×`,
    timeTitle: 'Adjust the bake time too',
    timeBigger: 'A bigger tin spreads the batter thinner, so it bakes faster. Start checking at 80% of the original time.',
    timeSmaller: 'A smaller tin makes the batter deeper, which easily leaves the middle underdone. Drop the temperature 10°C and bake longer.',
    timeSame: 'The areas are close enough that you can leave the time roughly as it is.',
    note: 'This compares by area, so it is right when the tins are a similar depth. If the depths differ a lot the batter thickness changes and the bake time shifts considerably. Fill a tin only 60–70% of the way.',
  },
};

export const STORAGE_UI: Record<FoodLang, {
  searchPlaceholder: string; fridge: string; freezer: string; notFound: string;
  noteTitle: string; note: string; noteBold: string; refreeze: string;
}> = {
  ko: {
    searchPlaceholder: '재료 이름으로 찾기 — 닭, 우유, 두부…',
    fridge: '냉장', freezer: '냉동', notFound: '찾는 재료가 목록에 없습니다',
    noteTitle: '기간은 품질 기준입니다',
    note: '여기 적힌 기간은 ‘맛과 질감이 유지되는’ 기준입니다. 냉동은 그 뒤에도 상하지는 않지만 맛이 떨어집니다. 반대로 냉장은 기간 안이라도 온도가 높거나 여러 번 열었다면 더 빨리 상할 수 있으니,',
    noteBold: ' 냄새와 색을 먼저 확인하세요.',
    refreeze: '해동한 식품을 다시 얼리지 마세요. 녹는 동안 늘어난 세균이 그대로 남습니다.',
  },
  en: {
    searchPlaceholder: 'Search by name — chicken, milk, tofu…',
    fridge: 'Fridge', freezer: 'Freezer', notFound: 'That ingredient is not in the list',
    noteTitle: 'These are quality times, not safety limits',
    note: 'The times here are how long the taste and texture hold up. Frozen food does not become unsafe after that, it just gets worse. In the fridge, the opposite applies — even inside the window, a warm fridge or a door opened often can spoil things sooner, so',
    noteBold: ' check the smell and the colour first.',
    refreeze: 'Do not refreeze food you have thawed. The bacteria that multiplied while it thawed are still there.',
  },
};
