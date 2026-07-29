// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { FoodTool } from './food-tools.ts';
import { FOOD_TOOLS } from './food-tools.ts';

/**
 * 요리 도구(/food) 섹션의 영어·중국어 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는 문구만 갈아 끼운다.
 *
 * 이 섹션은 계량 문화가 언어마다 달라 문구를 그대로 옮기면 어색해진다.
 * 영어권은 컵·큰술이 주력 단위이므로 그램 변환을 앞세우고, 반대로 한국식
 * 200ml 컵과 다른 미국식 240ml 컵 문제를 짚어 준다. 밥물·김장 염도처럼
 * 한국 요리에서 온 계산은 그 맥락을 그대로 밝히는 편이 오히려 잘 통한다.
 */
export type FoodIntlLang = 'en' | 'zh';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<FoodIntlLang, Record<string, ToolCopy>> = {
  en: {
    measure: {
      title: 'Cups to Grams Converter', desc: 'Cups and spoons in grams — it differs by ingredient', category: 'Measuring',
      metaTitle: 'Cups to Grams Converter — By Ingredient, Free',
      long: 'A cup of flour is 120g; a cup of sugar is 200g. The same volume weighs a different amount depending on what is in it, so you have to pick the ingredient to get this right. With no scale, you can also go the other way and turn grams into cups and spoons.',
      features: ['Density applied per ingredient', 'Cups, tablespoons and teaspoons ↔ g and ml', 'Shown as a combination of measures', 'Both 240ml US and 200ml metric cups'],
    },
    'recipe-scale': {
      title: 'Recipe Scaler', desc: 'Take a recipe for two to any number of servings', category: 'Measuring',
      metaTitle: 'Recipe Scaler — Adjust Ingredients by Servings',
      long: 'Paste a recipe, change the servings, and every ingredient amount is recalculated. It finds the numbers and units itself, so you are not multiplying line by line.',
      features: ['Paste a recipe and just change the servings', 'Numbers and fractions detected automatically', 'Copy the whole result at once', 'Decimals tidied up'],
    },
    salt: {
      title: 'Brine Salinity Calculator', desc: 'Mix a brine for pickling and fermenting', category: 'Measuring',
      metaTitle: 'Brine Calculator — Salt Percentage for Pickles and Kimchi',
      long: 'Enter the salinity you want and the amount of water, and it works out how many grams of salt you need. For salting cabbage, pickling and fermenting — anything where the salinity decides the outcome — it stops you guessing.',
      features: ['Salt weight from a target percentage', 'Suggested salinity by purpose', 'Volume conversion by salt type', 'Work backwards to find the salinity'],
    },
    oven: {
      title: 'Oven Temperature Converter', desc: 'Fahrenheit, gas mark and air fryer', category: 'Heat',
      metaTitle: 'Oven Temperature Converter — °F, °C, Gas Mark and Air Fryer',
      long: 'Turns the 350°F in a recipe into Celsius, and tells you what gas mark 4 actually is. It also works out the temperature and time to use if you are making the same thing in an air fryer.',
      features: ['Celsius ↔ Fahrenheit', 'British gas mark', 'Air fryer temperature and time', 'Presets for common temperatures'],
    },
    steak: {
      title: 'Steak Doneness Temperatures', desc: 'What internal temperature is medium rare', category: 'Heat',
      metaTitle: 'Steak Doneness Chart — Internal Temperature and Timing',
      long: 'Internal temperature for each level of doneness, and when to pull it off the heat given how much carryover cooking will happen. Enter the thickness and it estimates roughly how long per side.',
      features: ['Internal temperature for five levels', 'Pull temperature accounting for carryover', 'Rough cooking time by thickness', 'How long to rest it'],
    },
    rice: {
      title: 'Rice Water Calculator', desc: 'How much water for this much rice', category: 'Heat',
      metaTitle: 'Rice to Water Ratio Calculator — By Rice Type',
      long: 'Works out how much water to add based on how much rice you have and how soft you want it. White, brown and mixed grains all differ, and older rice needs more water — that is factored in too.',
      features: ['Water ratio for white, brown and mixed grain', 'Adjust between soft and firm', 'In cups, ml and the knuckle method', 'How long to soak'],
    },
    pasta: {
      title: 'Pasta Water and Salt', desc: 'How much water and salt for 200g of pasta', category: 'Heat',
      metaTitle: 'Pasta Water Calculator — Water and Salt Ratio',
      long: 'The base ratio is 1L of water and 10g of salt per 100g of pasta. Give it the weight of pasta and it works out both, along with cooking times by shape.',
      features: ['Water and salt for your amount of pasta', 'Cooking time by pasta shape', 'Time adjusted for al dente', 'What to do with the pasta water'],
    },
    coffee: {
      title: 'Coffee Ratio Calculator', desc: 'The golden ratio of coffee to water', category: 'Drinks',
      metaTitle: 'Coffee to Water Ratio Calculator — Pour Over, French Press, Cold Brew',
      long: 'Works out the coffee-to-water ratio for pour over, French press and cold brew, which are all different. Decide how much you want to drink and it tells you how many grams to grind.',
      features: ['Ratio per brewing method', 'Coffee weight from the cup size', 'Or work from the coffee weight instead', 'Grind size and brew time'],
    },
    'baking-pan': {
      title: 'Baking Pan Converter', desc: 'Adjust the batter when your tin is a different size', category: 'Baking',
      metaTitle: 'Baking Pan Size Converter — Scale Batter Between Tins',
      long: 'The recipe says a 15cm round tin and all you own is an 18cm square one — this works out how much to scale the batter. It compares by area, so tins of a similar depth come out right as they are.',
      features: ['Area compared across round, square and loaf tins', 'Batter scaling factor', 'How to adjust the bake time', 'Presets for common tin sizes'],
    },
    storage: {
      title: 'Food Storage Times', desc: 'How many days is it fine in the fridge or freezer', category: 'Storage',
      metaTitle: 'Food Storage Chart — Fridge and Freezer Times',
      long: 'How long meat, fish, dairy and cooked food last in the fridge and the freezer, and how to store them so they last. It cuts down on both throwing away food that was fine and eating food that was not.',
      features: ['Fridge and freezer times per ingredient', 'Storage tips', 'What should not go in the fridge', 'Browse by category'],
    },
  },
  zh: {
    measure: {
      title: '量杯换算克数', desc: '杯与勺换成克 —— 每种材料都不一样', category: '计量',
      metaTitle: '量杯换算克数 — 按材料换算，免费',
      long: '一杯面粉是 120g，一杯糖是 200g。同样的体积，材料不同重量也不同，所以必须选好材料才准。没有秤时，也可以反过来把克换成杯与勺。',
      features: ['按材料密度换算', '杯／大勺／小勺 ↔ g／ml', '以量具组合的方式显示', '支持 240ml 美式杯与 200ml 公制杯'],
    },
    'recipe-scale': {
      title: '菜谱份量换算', desc: '把两人份的菜谱换成任意份数', category: '计量',
      metaTitle: '菜谱份量换算 — 按人数调整材料用量',
      long: '把菜谱贴进来，只改份数，所有材料用量都会重新算好。它会自己找出数字和单位，不用一行行去乘。',
      features: ['贴上菜谱只改份数', '自动识别数字与分数', '结果一次复制', '小数自动整理'],
    },
    salt: {
      title: '盐水浓度计算', desc: '调腌菜、泡菜用的盐水', category: '计量',
      metaTitle: '盐水浓度计算 — 腌菜与泡菜的盐分比例',
      long: '输入想要的盐度（%）和水量，就能算出需要多少克盐。腌白菜、做酱菜、泡菜这类盐度直接决定成败的料理，不用再靠感觉。',
      features: ['按盐度（%）算盐量', '按用途给出建议盐度', '按盐的种类换算体积', '也可反推盐度'],
    },
    oven: {
      title: '烤箱温度换算', desc: '华氏、气位与空气炸锅换算', category: '加热',
      metaTitle: '烤箱温度换算 — 华氏、摄氏、Gas Mark 与空气炸锅',
      long: '把外国菜谱里的 350°F 换成摄氏，也告诉你 Gas Mark 4 到底是多少度。同一道菜改用空气炸锅时的温度和时间也一起算好。',
      features: ['摄氏 ↔ 华氏换算', '显示英式 Gas Mark', '空气炸锅温度与时间换算', '常用温度预设'],
    },
    steak: {
      title: '牛排熟度温度', desc: '五分熟的中心温度是多少', category: '加热',
      metaTitle: '牛排熟度对照 — 中心温度与时间',
      long: '给出各熟度的中心温度，以及考虑余温后应该什么时候离火。输入厚度，还能估出每面大约要煎几分钟。',
      features: ['五档熟度的中心温度', '考虑余温的离火温度', '按厚度估算煎制时间', '静置时间说明'],
    },
    rice: {
      title: '米水比例计算', desc: '这么多米该加多少水', category: '加热',
      metaTitle: '米水比例计算 — 按米种算加水量',
      long: '根据米量和你想要的软硬度，算出该加多少水。白米、糙米、杂粮各不相同，陈米要多加水这一点也考虑进去了。',
      features: ['白米／糙米／杂粮的水量比例', '软饭与硬饭可调', '按杯、ml 与手背法给出', '浸泡时间说明'],
    },
    pasta: {
      title: '意面水与盐', desc: '200g 面要多少水和盐', category: '加热',
      metaTitle: '意面水量计算 — 水与盐的黄金比例',
      long: '每 100g 面配 1L 水、10g 盐是基本比例。输入面的重量就能算出水和盐，还会给出各种面型的煮制时间。',
      features: ['按面量算水与盐', '按面型给出煮制时间', '按 al dente 调整时间', '面汤的用法'],
    },
    coffee: {
      title: '咖啡粉水比', desc: '咖啡豆与水的黄金比例', category: '饮品',
      metaTitle: '咖啡粉水比计算 — 手冲、法压、冷萃',
      long: '手冲、法压壶、冷萃各自的粉水比都不同，这里帮你算好。定好要喝多少，马上就知道该磨多少克豆子。',
      features: ['按萃取方式给出比例', '按饮用量算豆量', '也可反过来按豆量计算', '研磨度与时间说明'],
    },
    'baking-pan': {
      title: '烤模尺寸换算', desc: '模具尺寸不同时调整面糊量', category: '烘焙',
      metaTitle: '烤模尺寸换算 — 换模具时的面糊倍数',
      long: '菜谱写的是 15cm 圆模，家里只有 18cm 方模时，这里算出面糊要做几倍。按面积比例计算，所以高度接近的模具直接照着用就行。',
      features: ['圆模、方模、条形模的面积对比', '面糊倍数计算', '烘烤时间调整说明', '常用模具尺寸预设'],
    },
    storage: {
      title: '食品保存期限', desc: '冷藏、冷冻能放几天', category: '保存',
      metaTitle: '食品保存期限 — 冷藏与冷冻天数对照',
      long: '整理了肉、鱼、乳制品、熟食在冷藏和冷冻各能放几天，以及怎么放才更耐久。既少扔掉本来还好的，也少吃到已经不行的。',
      features: ['按食材给出冷藏与冷冻天数', '保存要点', '不该放冰箱的东西', '按分类查找'],
    },
  },
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function foodToolsIntl(lang: FoodIntlLang): FoodTool[] {
  return FOOD_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findFoodToolIntl(lang: FoodIntlLang, slug: string): FoodTool | undefined {
  return foodToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedFoodToolsIntl(lang: FoodIntlLang, slug: string, count = 4): FoodTool[] {
  const all = foodToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 셸 UI 문구 */
export const FOOD_SHELL_UI: Record<FoodIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Cooking tools',
    canDo: 'What this tool does', others: 'Other cooking tools',
    notice: '🍳 Numbers to start from — adjust to your own kitchen and taste.',
    footNote: 'Ovens, pans and ingredients all vary, so treat these as a starting point rather than an exact answer.',
  },
  zh: {
    home: '首页', section: '厨房工具',
    canDo: '这个工具能做什么', others: '其他厨房工具',
    notice: '🍳 这些是起点数值 —— 请按自家厨具和口味调整。',
    footNote: '烤箱、锅具与食材都有差异，请把这些当作起点，而不是精确答案。',
  },
};
