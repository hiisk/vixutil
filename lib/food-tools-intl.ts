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
export type FoodIntlLang = 'en';

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
};
