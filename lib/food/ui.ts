/**
 * 재료 무게 환산 화면의 문구 — 여덟 언어.
 *
 * 125가지 × 8언어 = 1000벌의 설명을 손으로 쓸 수 없다. 재료마다 다른 것은 이름과
 * 숫자뿐이므로 문장 틀을 한 벌만 두고 계산된 값을 끼워 넣는다.
 */
import { alternates8, type L8, type Lang8 } from '../i18n/lang.ts';
import type { FoodFacts } from './facts.ts';
import type { FoodCategory } from './ingredients8.ts';

export interface FaqItem { q: string; a: string }

export interface FoodUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  cupUs: string;
  cupMetric: string;
  cupUk: string;
  tbsp: string;
  tsp: string;
  gram: string;
  densityLabel: string;
  per100gTitle: string;
  cupTableTitle: string;
  /** "1컵" 같은 분량 표기 */
  cupOf: (label: string) => string;
  similarTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  categoryLabel: Record<FoodCategory, string>;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string, grams: number) => string;
  metaDesc: (name: string, f: FoodFacts) => string;
  hubFaq: FaqItem[];
  itemFaq: (name: string, f: FoodFacts) => FaqItem[];
}

const CAT = (
  flour: string, sugar: string, grain: string, dairy: string, fat: string, nut: string,
  legume: string, spice: string, liquid: string, vegetable: string, other: string,
): Record<FoodCategory, string> =>
  ({ flour, sugar, grain, dairy, fat, nut, legume, spice, liquid, vegetable, other });

const ko: FoodUI = {
  home: '홈',
  section: '재료 무게 환산',
  hubTitle: '재료 125가지 컵·큰술 무게 환산',
  hubLead: '밀가루 1컵은 125g, 설탕은 200g입니다. 재료마다 다른 무게를 미국컵·한국컵·큰술·작은술로 한 번에 확인하세요',
  cupUs: '미국 컵 (240ml)',
  cupMetric: '한국·일본 컵 (200ml)',
  cupUk: '영국 컵 (284ml)',
  tbsp: '큰술 (15ml)',
  tsp: '작은술 (5ml)',
  gram: 'g',
  densityLabel: '밀도',
  per100gTitle: '100g은 얼마인가',
  cupTableTitle: '컵 분량표',
  cupOf: label => `${label}컵`,
  similarTitle: '무게가 비슷한 재료',
  howTitle: '읽는 방법',
  how: [
    '컵은 나라마다 다릅니다. 미국은 240ml, 한국과 일본은 200ml, 옛 영국 레시피는 284ml입니다. 그래서 같은 "1컵"이 20%까지 달라집니다.',
    '이 표는 퍼서 담고 위를 깎은 상태 기준입니다. 밀가루를 컵으로 꾹 눌러 담으면 같은 1컵에 30g이 더 들어갑니다.',
    '제과는 무게로 재는 편이 훨씬 정확합니다. 반죽의 수분 비율이 몇 g 차이로 갈리기 때문입니다.',
    '큰술은 15ml, 작은술은 5ml로 계산했습니다. 밥숟가락은 그보다 크므로 계량스푼을 쓰세요.',
  ],
  faqTitle: '자주 묻는 질문',
  categoryLabel: CAT('가루', '당류', '곡물', '유제품', '지방·기름', '견과·씨앗', '콩류', '양념·향신료', '액체', '채소', '기타'),
  hubMetaTitle: '재료 무게 환산 125가지 — 1컵·1큰술이 몇 g인가',
  hubMetaDesc: '밀가루·설탕·버터·쌀·꿀 등 재료 125가지의 1컵·1큰술·1작은술 무게를 미국컵(240ml)과 한국컵(200ml) 기준으로 함께 보여 줍니다. 100g이 몇 컵인지도 계산합니다.',
  metaTitle: (name, grams) => `${name} 1컵 ${grams}g — 무게 환산`,
  metaDesc: (name, f) =>
    `${name} 1컵은 미국컵(240ml) 기준 ${f.grams.cupUs}g, 한국컵(200ml) 기준 ${f.grams.cupMetric}g입니다. 큰술 ${f.grams.tbsp}g, 작은술 ${f.grams.tsp}g이고 100g은 약 ${f.cupsPer100g}컵(${f.mlPer100g}ml)입니다.`,
  hubFaq: [
    {
      q: '같은 1컵인데 재료마다 무게가 왜 다른가요?',
      a: '컵은 부피를 재는 그릇이고 재료마다 밀도가 다릅니다. 밀가루는 입자 사이에 공기가 많아 1컵에 125g이지만, 꿀은 빈틈이 없어 340g입니다. 부피가 같아도 무게는 세 배 가까이 차이 납니다.',
    },
    {
      q: '어느 나라 컵으로 봐야 하나요?',
      a: '레시피의 출처를 따릅니다. 미국·캐나다 레시피는 240ml, 한국과 일본은 200ml, 오래된 영국 레시피는 284ml입니다. 출처를 모른다면 이 페이지의 g 값으로 재는 편이 안전합니다.',
    },
    {
      q: '왜 제과는 무게로 재라고 하나요?',
      a: '가루를 어떻게 담느냐에 따라 같은 1컵이 120g에서 150g까지 갑니다. 반죽의 수분 비율이 그만큼 흔들리면 빵은 안 부풀고 쿠키는 퍼집니다. 저울은 그 변수를 없앱니다.',
    },
    {
      q: '큰술은 밥숟가락과 같나요?',
      a: '다릅니다. 계량 큰술은 15ml, 작은술은 5ml로 정해져 있지만 밥숟가락은 10~18ml까지 제각각입니다. 양념이 짜거나 싱거워지는 대부분의 원인이 이것입니다.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name} 1컵은 몇 g인가요?`,
      a: `미국컵(240ml)으로 ${f.grams.cupUs}g, 한국·일본 컵(200ml)으로 ${f.grams.cupMetric}g입니다. 퍼서 담고 위를 깎은 기준입니다.`,
    },
    {
      q: `${name} 1큰술과 1작은술은 몇 g인가요?`,
      a: `큰술(15ml)은 ${f.grams.tbsp}g, 작은술(5ml)은 ${f.grams.tsp}g입니다. 계량스푼 기준이고 밥숟가락은 이보다 큽니다.`,
    },
    {
      q: `${name} 100g은 몇 컵인가요?`,
      a: `약 ${f.cupsPer100g}컵(미국컵 기준)이고 부피로는 ${f.mlPer100g}ml입니다. 레시피가 g으로 적혀 있고 저울이 없을 때 이 값을 쓰세요.`,
    },
    {
      q: '왜 무게로 재는 편이 나은가요?',
      a: `${name}은 1L에 ${f.gPerL}g입니다. 담는 방식에 따라 같은 컵에 들어가는 양이 달라지므로, 정확해야 하는 반죽이라면 저울을 쓰는 편이 실패를 줄입니다.`,
    },
    {
      q: '물과 비교하면 무거운가요?',
      a: f.denserThanWater
        ? `물보다 무겁습니다(물은 1L에 1000g). 그래서 같은 부피를 담으면 물보다 무게가 더 나갑니다.`
        : `물보다 가볍습니다(물은 1L에 1000g). 입자 사이의 공기나 지방 때문이고, 같은 부피여도 무게는 물보다 적습니다.`,
    },
  ],
};

const en: FoodUI = {
  home: 'Home',
  section: 'Ingredient weights',
  hubTitle: 'Cup and Spoon Weights for 125 Ingredients',
  hubLead: 'A cup of flour is 125 g; a cup of sugar is 200 g. See the weight of each ingredient in US cups, metric cups, tablespoons and teaspoons',
  cupUs: 'US cup (240 ml)',
  cupMetric: 'Metric cup (200 ml)',
  cupUk: 'Imperial cup (284 ml)',
  tbsp: 'Tablespoon (15 ml)',
  tsp: 'Teaspoon (5 ml)',
  gram: 'g',
  densityLabel: 'Density',
  per100gTitle: 'What 100 g looks like',
  cupTableTitle: 'Cup measures',
  cupOf: label => `${label} cup`,
  similarTitle: 'Ingredients of similar weight',
  howTitle: 'How to read this',
  how: [
    'A cup is not one size. The US cup is 240 ml, the metric cup used in Korea and Japan is 200 ml, and older British recipes mean 284 ml — the same "1 cup" can differ by 20%.',
    'These figures assume spoon-and-level: scooped in and struck flat. Packing flour into the cup adds about 30 g to the same cup.',
    'Baking is far more reliable by weight, because the hydration of a dough turns on a few grams either way.',
    'Tablespoon means 15 ml and teaspoon 5 ml here. Cutlery spoons are bigger, so use measuring spoons.',
  ],
  faqTitle: 'Frequently asked questions',
  categoryLabel: CAT('Flours', 'Sugars and syrups', 'Grains', 'Dairy', 'Fats and oils', 'Nuts and seeds', 'Legumes', 'Seasonings', 'Liquids', 'Vegetables', 'Other'),
  hubMetaTitle: 'Ingredient Weight Converter — what 1 cup and 1 tbsp weigh',
  hubMetaDesc: 'Cup, tablespoon and teaspoon weights for 125 ingredients — flour, sugar, butter, rice, honey and more — in both US cups (240 ml) and metric cups (200 ml), plus how many cups make 100 g.',
  metaTitle: (name, grams) => `${name}: 1 cup = ${grams} g`,
  metaDesc: (name, f) =>
    `One cup of ${name} weighs ${f.grams.cupUs} g in a US cup (240 ml) and ${f.grams.cupMetric} g in a metric cup (200 ml). A tablespoon is ${f.grams.tbsp} g, a teaspoon ${f.grams.tsp} g, and 100 g is about ${f.cupsPer100g} cups (${f.mlPer100g} ml).`,
  hubFaq: [
    {
      q: 'Why does one cup weigh different amounts for different ingredients?',
      a: 'A cup measures volume, and every ingredient has its own density. Flour holds air between its particles, so a cup is 125 g; honey has no gaps, so a cup is 340 g. Same volume, nearly three times the weight.',
    },
    {
      q: 'Which country’s cup should I use?',
      a: 'Follow the recipe’s origin: 240 ml for US and Canadian recipes, 200 ml in Korea and Japan, 284 ml in older British books. If you cannot tell, weigh in grams using the figures here.',
    },
    {
      q: 'Why do bakers insist on weighing?',
      a: 'Depending on how you fill it, the same cup of flour ranges from 120 g to 150 g. That swing changes a dough’s hydration enough to stop bread rising or make cookies spread. A scale removes the variable.',
    },
    {
      q: 'Is a tablespoon the same as a soup spoon?',
      a: 'No. A measuring tablespoon is 15 ml and a teaspoon 5 ml, while cutlery spoons run anywhere from 10 to 18 ml. That difference is behind most over- and under-seasoned dishes.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `How many grams is a cup of ${name}?`,
      a: `${f.grams.cupUs} g in a US cup (240 ml) and ${f.grams.cupMetric} g in a metric cup (200 ml), measured spoon-and-level.`,
    },
    {
      q: `How much does a tablespoon of ${name} weigh?`,
      a: `A tablespoon (15 ml) is ${f.grams.tbsp} g and a teaspoon (5 ml) is ${f.grams.tsp} g. These are measuring spoons; cutlery is larger.`,
    },
    {
      q: `How many cups is 100 g of ${name}?`,
      a: `About ${f.cupsPer100g} cups by the US cup, or ${f.mlPer100g} ml by volume. Use this when the recipe is in grams and you have no scale.`,
    },
    {
      q: 'Why weigh it instead?',
      a: `${name} runs ${f.gPerL} g per litre. How you fill the cup changes how much fits, so for a dough that has to be right, a scale saves the bake.`,
    },
    {
      q: 'Is it heavier than water?',
      a: f.denserThanWater
        ? 'Yes — water is 1000 g per litre, so the same volume of this weighs more.'
        : 'No — water is 1000 g per litre. Air between particles, or fat, makes this lighter for the same volume.',
    },
  ],
};

const es: FoodUI = {
  home: 'Inicio',
  section: 'Peso de ingredientes',
  hubTitle: 'Peso en tazas y cucharadas de 125 ingredientes',
  hubLead: 'Una taza de harina son 125 g; de azúcar, 200 g. Consulta el peso de cada ingrediente en taza americana, taza métrica, cucharada y cucharadita',
  cupUs: 'Taza americana (240 ml)',
  cupMetric: 'Taza métrica (200 ml)',
  cupUk: 'Taza imperial (284 ml)',
  tbsp: 'Cucharada (15 ml)',
  tsp: 'Cucharadita (5 ml)',
  gram: 'g',
  densityLabel: 'Densidad',
  per100gTitle: 'Cuánto son 100 g',
  cupTableTitle: 'Medidas por taza',
  cupOf: label => `${label} taza`,
  similarTitle: 'Ingredientes de peso parecido',
  howTitle: 'Cómo se lee',
  how: [
    'La taza no es una sola medida: 240 ml en EE. UU., 200 ml en Corea y Japón, 284 ml en recetas británicas antiguas. La misma «1 taza» puede variar un 20%.',
    'Estas cifras suponen llenar con cuchara y enrasar. Si aprietas la harina en la taza, esa misma taza pesa unos 30 g más.',
    'La repostería sale mucho mejor pesando, porque la hidratación de una masa cambia con unos pocos gramos.',
    'Aquí la cucharada son 15 ml y la cucharadita 5 ml. Los cubiertos de mesa son más grandes: usa cucharas medidoras.',
  ],
  faqTitle: 'Preguntas frecuentes',
  categoryLabel: CAT('Harinas', 'Azúcares y siropes', 'Cereales', 'Lácteos', 'Grasas y aceites', 'Frutos secos y semillas', 'Legumbres', 'Condimentos', 'Líquidos', 'Verduras', 'Otros'),
  hubMetaTitle: 'Conversor de peso de ingredientes — cuánto pesa 1 taza y 1 cucharada',
  hubMetaDesc: 'Peso en taza, cucharada y cucharadita de 125 ingredientes —harina, azúcar, mantequilla, arroz, miel y más— en taza americana (240 ml) y métrica (200 ml), y cuántas tazas son 100 g.',
  metaTitle: (name, grams) => `${name}: 1 taza = ${grams} g`,
  metaDesc: (name, f) =>
    `Una taza de ${name} pesa ${f.grams.cupUs} g en taza americana (240 ml) y ${f.grams.cupMetric} g en taza métrica (200 ml). La cucharada son ${f.grams.tbsp} g, la cucharadita ${f.grams.tsp} g, y 100 g equivalen a unas ${f.cupsPer100g} tazas (${f.mlPer100g} ml).`,
  hubFaq: [
    {
      q: '¿Por qué una taza pesa distinto según el ingrediente?',
      a: 'La taza mide volumen y cada ingrediente tiene su densidad. La harina retiene aire entre sus partículas, así que una taza son 125 g; la miel no deja huecos y son 340 g. Mismo volumen, casi el triple de peso.',
    },
    {
      q: '¿Qué taza debo usar?',
      a: 'La del origen de la receta: 240 ml en EE. UU. y Canadá, 200 ml en Corea y Japón, 284 ml en libros británicos antiguos. Si no lo sabes, pesa en gramos con los datos de aquí.',
    },
    {
      q: '¿Por qué los reposteros insisten en pesar?',
      a: 'Según cómo la llenes, la misma taza de harina va de 120 g a 150 g. Ese margen cambia la hidratación de la masa lo suficiente para que el pan no suba o las galletas se extiendan. La balanza elimina la variable.',
    },
    {
      q: '¿Una cucharada es lo mismo que una cuchara de sopa?',
      a: 'No. La cucharada medidora son 15 ml y la cucharadita 5 ml, mientras que los cubiertos van de 10 a 18 ml. Esa diferencia explica la mayoría de los platos salados o sosos.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `¿Cuántos gramos son una taza de ${name}?`,
      a: `${f.grams.cupUs} g en taza americana (240 ml) y ${f.grams.cupMetric} g en taza métrica (200 ml), llenando con cuchara y enrasando.`,
    },
    {
      q: `¿Cuánto pesa una cucharada de ${name}?`,
      a: `La cucharada (15 ml) son ${f.grams.tbsp} g y la cucharadita (5 ml) ${f.grams.tsp} g. Son cucharas medidoras; los cubiertos son mayores.`,
    },
    {
      q: `¿Cuántas tazas son 100 g de ${name}?`,
      a: `Unas ${f.cupsPer100g} tazas americanas, o ${f.mlPer100g} ml de volumen. Útil cuando la receta va en gramos y no tienes balanza.`,
    },
    {
      q: '¿Por qué mejor pesarlo?',
      a: `${name} tiene ${f.gPerL} g por litro. Cómo llenes la taza cambia cuánto entra, así que en una masa que debe salir bien, la balanza salva el horneado.`,
    },
    {
      q: '¿Es más pesado que el agua?',
      a: f.denserThanWater
        ? 'Sí: el agua son 1000 g por litro, así que el mismo volumen de esto pesa más.'
        : 'No: el agua son 1000 g por litro. El aire entre partículas, o la grasa, lo hacen más ligero a igual volumen.',
    },
  ],
};

const pt: FoodUI = {
  home: 'Início',
  section: 'Peso dos ingredientes',
  hubTitle: 'Peso em copos e colheres de 125 ingredientes',
  hubLead: 'Um copo de farinha dá 125 g; de açúcar, 200 g. Veja o peso de cada ingrediente em copo americano, copo métrico, colher de sopa e de chá',
  cupUs: 'Copo americano (240 ml)',
  cupMetric: 'Copo métrico (200 ml)',
  cupUk: 'Copo imperial (284 ml)',
  tbsp: 'Colher de sopa (15 ml)',
  tsp: 'Colher de chá (5 ml)',
  gram: 'g',
  densityLabel: 'Densidade',
  per100gTitle: 'Quanto são 100 g',
  cupTableTitle: 'Medidas por copo',
  cupOf: label => `${label} copo`,
  similarTitle: 'Ingredientes de peso parecido',
  howTitle: 'Como ler',
  how: [
    'O copo não é uma medida única: 240 ml nos EUA, 200 ml na Coreia e no Japão, 284 ml em receitas britânicas antigas. O mesmo “1 copo” varia até 20%.',
    'Estes números supõem encher com colher e nivelar. Se você compacta a farinha, o mesmo copo pesa cerca de 30 g a mais.',
    'Confeitaria sai bem melhor pesando, porque a hidratação da massa muda com poucos gramas.',
    'Aqui a colher de sopa são 15 ml e a de chá 5 ml. Os cobertos de mesa são maiores: use colheres medidoras.',
  ],
  faqTitle: 'Perguntas frequentes',
  categoryLabel: CAT('Farinhas', 'Açúcares e xaropes', 'Grãos', 'Lácteos', 'Gorduras e óleos', 'Castanhas e sementes', 'Leguminosas', 'Temperos', 'Líquidos', 'Legumes', 'Outros'),
  hubMetaTitle: 'Conversor de peso de ingredientes — quanto pesa 1 copo e 1 colher',
  hubMetaDesc: 'Peso em copo, colher de sopa e de chá de 125 ingredientes — farinha, açúcar, manteiga, arroz, mel e mais — em copo americano (240 ml) e métrico (200 ml), e quantos copos dão 100 g.',
  metaTitle: (name, grams) => `${name}: 1 copo = ${grams} g`,
  metaDesc: (name, f) =>
    `Um copo de ${name} pesa ${f.grams.cupUs} g no copo americano (240 ml) e ${f.grams.cupMetric} g no copo métrico (200 ml). A colher de sopa dá ${f.grams.tbsp} g, a de chá ${f.grams.tsp} g, e 100 g equivalem a cerca de ${f.cupsPer100g} copos (${f.mlPer100g} ml).`,
  hubFaq: [
    {
      q: 'Por que um copo pesa diferente para cada ingrediente?',
      a: 'O copo mede volume e cada ingrediente tem sua densidade. A farinha guarda ar entre as partículas, então um copo dá 125 g; o mel não deixa vãos e dá 340 g. Mesmo volume, quase três vezes o peso.',
    },
    {
      q: 'Qual copo devo usar?',
      a: 'O da origem da receita: 240 ml para EUA e Canadá, 200 ml na Coreia e no Japão, 284 ml em livros britânicos antigos. Se não souber, pese em gramas com os dados daqui.',
    },
    {
      q: 'Por que confeiteiros insistem em pesar?',
      a: 'Dependendo de como se enche, o mesmo copo de farinha vai de 120 g a 150 g. Essa variação muda a hidratação da massa o bastante para o pão não crescer ou o biscoito espalhar. A balança elimina a variável.',
    },
    {
      q: 'Colher de sopa é o mesmo que colher de mesa?',
      a: 'Não. A colher medidora de sopa são 15 ml e a de chá 5 ml, enquanto os cobertos vão de 10 a 18 ml. Essa diferença explica a maioria dos pratos salgados demais ou sem sal.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `Quantos gramas tem um copo de ${name}?`,
      a: `${f.grams.cupUs} g no copo americano (240 ml) e ${f.grams.cupMetric} g no copo métrico (200 ml), enchendo com colher e nivelando.`,
    },
    {
      q: `Quanto pesa uma colher de sopa de ${name}?`,
      a: `A colher de sopa (15 ml) dá ${f.grams.tbsp} g e a de chá (5 ml) ${f.grams.tsp} g. São colheres medidoras; os cobertos são maiores.`,
    },
    {
      q: `Quantos copos são 100 g de ${name}?`,
      a: `Cerca de ${f.cupsPer100g} copos americanos, ou ${f.mlPer100g} ml de volume. Útil quando a receita está em gramas e você não tem balança.`,
    },
    {
      q: 'Por que é melhor pesar?',
      a: `${name} tem ${f.gPerL} g por litro. Como você enche o copo muda o quanto cabe, então numa massa que precisa dar certo a balança salva o forno.`,
    },
    {
      q: 'É mais pesado que a água?',
      a: f.denserThanWater
        ? 'Sim: a água tem 1000 g por litro, então o mesmo volume disto pesa mais.'
        : 'Não: a água tem 1000 g por litro. O ar entre as partículas, ou a gordura, deixa isto mais leve no mesmo volume.',
    },
  ],
};

const ja: FoodUI = {
  home: 'ホーム',
  section: '材料の重さ換算',
  hubTitle: '材料125種のカップ・大さじ重量',
  hubLead: '小麦粉1カップは125g、砂糖は200gです。材料ごとに違う重さをアメリカカップ・日本のカップ・大さじ・小さじで確かめられます',
  cupUs: 'アメリカカップ (240ml)',
  cupMetric: '日本のカップ (200ml)',
  cupUk: 'イギリスの旧カップ (284ml)',
  tbsp: '大さじ (15ml)',
  tsp: '小さじ (5ml)',
  gram: 'g',
  densityLabel: '密度',
  per100gTitle: '100gはどれくらいか',
  cupTableTitle: 'カップ分量表',
  cupOf: label => `${label}カップ`,
  similarTitle: '重さが近い材料',
  howTitle: '読み方',
  how: [
    'カップは国によって違います。アメリカは240ml、日本と韓国は200ml、古いイギリスのレシピは284mlです。同じ「1カップ」が20%まで変わります。',
    'この表はすくって入れ、すり切った状態が基準です。小麦粉をカップに押し込むと、同じ1カップで30gほど増えます。',
    '製菓は重さで量るほうがずっと正確です。生地の水分比が数gで変わってしまうからです。',
    '大さじは15ml、小さじは5mlで計算しています。食事用のスプーンはこれより大きいので計量スプーンを使ってください。',
  ],
  faqTitle: 'よくある質問',
  categoryLabel: CAT('粉類', '砂糖・シロップ', '穀物', '乳製品', '油脂', 'ナッツ・種', '豆類', '調味料', '液体', '野菜', 'その他'),
  hubMetaTitle: '材料の重さ換算125種 — 1カップ・大さじ1は何gか',
  hubMetaDesc: '小麦粉・砂糖・バター・米・はちみつなど材料125種の1カップ・大さじ1・小さじ1の重さを、アメリカカップ(240ml)と日本のカップ(200ml)の両方で示します。100gが何カップかも計算します。',
  metaTitle: (name, grams) => `${name} 1カップ ${grams}g — 重さ換算`,
  metaDesc: (name, f) =>
    `${name}1カップはアメリカカップ(240ml)で${f.grams.cupUs}g、日本のカップ(200ml)で${f.grams.cupMetric}gです。大さじ1は${f.grams.tbsp}g、小さじ1は${f.grams.tsp}gで、100gは約${f.cupsPer100g}カップ(${f.mlPer100g}ml)です。`,
  hubFaq: [
    {
      q: '同じ1カップなのに材料で重さが違うのはなぜですか。',
      a: 'カップは体積を量る器で、材料ごとに密度が違います。小麦粉は粒の間に空気が多く1カップ125gですが、はちみつは隙間がなく340gです。体積が同じでも重さは三倍近く違います。',
    },
    {
      q: 'どの国のカップで見ればよいですか。',
      a: 'レシピの出どころに合わせます。アメリカ・カナダは240ml、日本と韓国は200ml、古いイギリスの本は284mlです。分からないときはこのページのg値で量るほうが安全です。',
    },
    {
      q: 'なぜ製菓では重さを量るのですか。',
      a: '詰め方によって同じ1カップの小麦粉が120gから150gまで変わります。その幅で生地の水分比が動くと、パンは膨らまずクッキーは広がります。はかりはその変数を消します。',
    },
    {
      q: '大さじは食事用のスプーンと同じですか。',
      a: '違います。計量の大さじは15ml、小さじは5mlですが、食事用スプーンは10〜18mlとまちまちです。味が濃すぎたり薄すぎたりする原因の多くがこれです。',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name}1カップは何gですか。`,
      a: `アメリカカップ(240ml)で${f.grams.cupUs}g、日本のカップ(200ml)で${f.grams.cupMetric}gです。すくって入れ、すり切った状態が基準です。`,
    },
    {
      q: `${name}大さじ1は何gですか。`,
      a: `大さじ1(15ml)は${f.grams.tbsp}g、小さじ1(5ml)は${f.grams.tsp}gです。計量スプーン基準で、食事用スプーンはこれより大きいです。`,
    },
    {
      q: `${name}100gは何カップですか。`,
      a: `アメリカカップで約${f.cupsPer100g}カップ、体積では${f.mlPer100g}mlです。レシピがgで書かれ、はかりがないときに使ってください。`,
    },
    {
      q: 'なぜ重さで量るほうがよいのですか。',
      a: `${name}は1Lあたり${f.gPerL}gです。詰め方でカップに入る量が変わるので、きちんと仕上げたい生地ならはかりが失敗を減らします。`,
    },
    {
      q: '水より重いですか。',
      a: f.denserThanWater
        ? '水より重いです(水は1Lで1000g)。同じ体積なら水より重くなります。'
        : '水より軽いです(水は1Lで1000g)。粒の間の空気や脂のためで、同じ体積でも重さは水より少なくなります。',
    },
  ],
};

const de: FoodUI = {
  home: 'Start',
  section: 'Zutatengewichte',
  hubTitle: 'Tassen- und Löffelgewichte für 125 Zutaten',
  hubLead: 'Eine Tasse Mehl sind 125 g, eine Tasse Zucker 200 g. Sieh das Gewicht jeder Zutat in US-Tasse, metrischer Tasse, Ess- und Teelöffel',
  cupUs: 'US-Tasse (240 ml)',
  cupMetric: 'Metrische Tasse (200 ml)',
  cupUk: 'Imperiale Tasse (284 ml)',
  tbsp: 'Esslöffel (15 ml)',
  tsp: 'Teelöffel (5 ml)',
  gram: 'g',
  densityLabel: 'Dichte',
  per100gTitle: 'Wie viel 100 g sind',
  cupTableTitle: 'Tassenmaße',
  cupOf: label => `${label} Tasse`,
  similarTitle: 'Zutaten mit ähnlichem Gewicht',
  howTitle: 'So liest man das',
  how: [
    'Eine Tasse ist kein festes Maß: 240 ml in den USA, 200 ml in Korea und Japan, 284 ml in älteren britischen Rezepten. Dasselbe „1 Tasse“ schwankt um bis zu 20%.',
    'Die Werte gelten für locker eingefülltes, glatt abgestrichenes Mehl. Festgedrückt passen etwa 30 g mehr in dieselbe Tasse.',
    'Backen gelingt nach Gewicht deutlich zuverlässiger, weil ein paar Gramm die Hydration des Teigs verschieben.',
    'Esslöffel heißt hier 15 ml, Teelöffel 5 ml. Besteck ist größer — nimm Messlöffel.',
  ],
  faqTitle: 'Häufige Fragen',
  categoryLabel: CAT('Mehle', 'Zucker und Sirupe', 'Getreide', 'Milchprodukte', 'Fette und Öle', 'Nüsse und Samen', 'Hülsenfrüchte', 'Gewürze', 'Flüssigkeiten', 'Gemüse', 'Sonstiges'),
  hubMetaTitle: 'Zutaten-Gewichtsrechner — was 1 Tasse und 1 EL wiegen',
  hubMetaDesc: 'Tassen-, Esslöffel- und Teelöffelgewichte für 125 Zutaten — Mehl, Zucker, Butter, Reis, Honig und mehr — in US-Tasse (240 ml) und metrischer Tasse (200 ml), plus wie viele Tassen 100 g ergeben.',
  metaTitle: (name, grams) => `${name}: 1 Tasse = ${grams} g`,
  metaDesc: (name, f) =>
    `Eine Tasse ${name} wiegt ${f.grams.cupUs} g in der US-Tasse (240 ml) und ${f.grams.cupMetric} g in der metrischen Tasse (200 ml). Ein Esslöffel sind ${f.grams.tbsp} g, ein Teelöffel ${f.grams.tsp} g, und 100 g entsprechen etwa ${f.cupsPer100g} Tassen (${f.mlPer100g} ml).`,
  hubFaq: [
    {
      q: 'Warum wiegt eine Tasse je Zutat unterschiedlich?',
      a: 'Die Tasse misst Volumen, und jede Zutat hat ihre eigene Dichte. Mehl hält Luft zwischen den Partikeln, also 125 g pro Tasse; Honig hat keine Lücken und kommt auf 340 g. Gleiches Volumen, fast dreifaches Gewicht.',
    },
    {
      q: 'Welche Tasse soll ich nehmen?',
      a: 'Die der Rezeptherkunft: 240 ml für die USA und Kanada, 200 ml in Korea und Japan, 284 ml in alten britischen Büchern. Wenn unklar, wiege in Gramm mit den Werten hier.',
    },
    {
      q: 'Warum bestehen Bäcker auf Wiegen?',
      a: 'Je nach Füllart reicht dieselbe Tasse Mehl von 120 g bis 150 g. Diese Spanne verschiebt die Hydration so weit, dass Brot nicht aufgeht oder Plätzchen zerlaufen. Die Waage nimmt die Variable heraus.',
    },
    {
      q: 'Ist ein Esslöffel dasselbe wie ein Suppenlöffel?',
      a: 'Nein. Der Messesslöffel hat 15 ml, der Teelöffel 5 ml, während Besteck zwischen 10 und 18 ml liegt. Dieser Unterschied steckt hinter den meisten über- oder untersalzenen Gerichten.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `Wie viel Gramm sind eine Tasse ${name}?`,
      a: `${f.grams.cupUs} g in der US-Tasse (240 ml) und ${f.grams.cupMetric} g in der metrischen Tasse (200 ml), locker eingefüllt und abgestrichen.`,
    },
    {
      q: `Wie viel wiegt ein Esslöffel ${name}?`,
      a: `Ein Esslöffel (15 ml) sind ${f.grams.tbsp} g, ein Teelöffel (5 ml) ${f.grams.tsp} g. Gemeint sind Messlöffel; Besteck ist größer.`,
    },
    {
      q: `Wie viele Tassen sind 100 g ${name}?`,
      a: `Etwa ${f.cupsPer100g} US-Tassen, dem Volumen nach ${f.mlPer100g} ml. Nützlich, wenn das Rezept in Gramm steht und keine Waage da ist.`,
    },
    {
      q: 'Warum besser wiegen?',
      a: `${name} hat ${f.gPerL} g pro Liter. Wie du die Tasse füllst, ändert die Menge — bei einem Teig, der sitzen muss, rettet die Waage das Gebäck.`,
    },
    {
      q: 'Ist es schwerer als Wasser?',
      a: f.denserThanWater
        ? 'Ja — Wasser hat 1000 g pro Liter, dasselbe Volumen hiervon wiegt mehr.'
        : 'Nein — Wasser hat 1000 g pro Liter. Luft zwischen den Partikeln oder Fett macht es bei gleichem Volumen leichter.',
    },
  ],
};

const fr: FoodUI = {
  home: 'Accueil',
  section: 'Poids des ingrédients',
  hubTitle: 'Poids en tasses et cuillères de 125 ingrédients',
  hubLead: 'Une tasse de farine fait 125 g, une tasse de sucre 200 g. Voyez le poids de chaque ingrédient en tasse américaine, tasse métrique, cuillère à soupe et à café',
  cupUs: 'Tasse américaine (240 ml)',
  cupMetric: 'Tasse métrique (200 ml)',
  cupUk: 'Tasse impériale (284 ml)',
  tbsp: 'Cuillère à soupe (15 ml)',
  tsp: 'Cuillère à café (5 ml)',
  gram: 'g',
  densityLabel: 'Densité',
  per100gTitle: 'Ce que font 100 g',
  cupTableTitle: 'Mesures par tasse',
  cupOf: label => `${label} tasse`,
  similarTitle: 'Ingrédients de poids proche',
  howTitle: 'Comment lire',
  how: [
    'La tasse n’est pas une mesure unique : 240 ml aux États-Unis, 200 ml en Corée et au Japon, 284 ml dans les vieilles recettes britanniques. La même « 1 tasse » varie de 20%.',
    'Ces chiffres supposent une farine versée à la cuillère puis arasée. Tassée, la même tasse pèse environ 30 g de plus.',
    'La pâtisserie réussit bien mieux au poids, car l’hydratation d’une pâte se joue à quelques grammes.',
    'Ici la cuillère à soupe fait 15 ml et la cuillère à café 5 ml. Les couverts de table sont plus grands : prenez des cuillères doseuses.',
  ],
  faqTitle: 'Questions fréquentes',
  categoryLabel: CAT('Farines', 'Sucres et sirops', 'Céréales', 'Produits laitiers', 'Matières grasses', 'Fruits secs et graines', 'Légumineuses', 'Condiments', 'Liquides', 'Légumes', 'Autres'),
  hubMetaTitle: 'Convertisseur de poids des ingrédients — ce que pèsent 1 tasse et 1 c. à soupe',
  hubMetaDesc: 'Poids en tasse, cuillère à soupe et à café de 125 ingrédients — farine, sucre, beurre, riz, miel et plus — en tasse américaine (240 ml) et métrique (200 ml), et combien de tasses font 100 g.',
  metaTitle: (name, grams) => `${name} : 1 tasse = ${grams} g`,
  metaDesc: (name, f) =>
    `Une tasse de ${name} pèse ${f.grams.cupUs} g en tasse américaine (240 ml) et ${f.grams.cupMetric} g en tasse métrique (200 ml). La cuillère à soupe fait ${f.grams.tbsp} g, la cuillère à café ${f.grams.tsp} g, et 100 g valent environ ${f.cupsPer100g} tasses (${f.mlPer100g} ml).`,
  hubFaq: [
    {
      q: 'Pourquoi une tasse ne pèse-t-elle pas pareil selon l’ingrédient ?',
      a: 'La tasse mesure un volume, et chaque ingrédient a sa densité. La farine garde de l’air entre ses particules : 125 g la tasse ; le miel ne laisse aucun vide : 340 g. Même volume, presque le triple du poids.',
    },
    {
      q: 'Quelle tasse utiliser ?',
      a: 'Celle de l’origine de la recette : 240 ml pour les États-Unis et le Canada, 200 ml en Corée et au Japon, 284 ml dans les vieux livres britanniques. Dans le doute, pesez en grammes avec les valeurs d’ici.',
    },
    {
      q: 'Pourquoi les pâtissiers insistent-ils sur la balance ?',
      a: 'Selon le remplissage, la même tasse de farine va de 120 g à 150 g. Cet écart déplace l’hydratation de la pâte assez pour empêcher le pain de lever ou faire s’étaler les biscuits. La balance supprime la variable.',
    },
    {
      q: 'Une cuillère à soupe, est-ce la cuillère de table ?',
      a: 'Non. La cuillère doseuse fait 15 ml et la petite 5 ml, alors que les couverts vont de 10 à 18 ml. Cet écart explique la plupart des plats trop ou pas assez salés.',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `Combien de grammes dans une tasse de ${name} ?`,
      a: `${f.grams.cupUs} g en tasse américaine (240 ml) et ${f.grams.cupMetric} g en tasse métrique (200 ml), versé à la cuillère et arasé.`,
    },
    {
      q: `Combien pèse une cuillère à soupe de ${name} ?`,
      a: `La cuillère à soupe (15 ml) fait ${f.grams.tbsp} g et la cuillère à café (5 ml) ${f.grams.tsp} g. Ce sont des cuillères doseuses ; les couverts sont plus grands.`,
    },
    {
      q: `Combien de tasses font 100 g de ${name} ?`,
      a: `Environ ${f.cupsPer100g} tasses américaines, soit ${f.mlPer100g} ml en volume. Pratique quand la recette est en grammes et qu’il n’y a pas de balance.`,
    },
    {
      q: 'Pourquoi peser plutôt ?',
      a: `${name} fait ${f.gPerL} g par litre. La façon de remplir la tasse change la quantité : pour une pâte qui doit être juste, la balance sauve la cuisson.`,
    },
    {
      q: 'Est-ce plus lourd que l’eau ?',
      a: f.denserThanWater
        ? 'Oui — l’eau fait 1000 g par litre, donc le même volume de ceci pèse davantage.'
        : 'Non — l’eau fait 1000 g par litre. L’air entre les particules, ou la matière grasse, allège à volume égal.',
    },
  ],
};

const hi: FoodUI = {
  home: 'होम',
  section: 'सामग्री का वज़न',
  hubTitle: '125 सामग्रियों का कप और चम्मच वज़न',
  hubLead: 'एक कप मैदा 125 ग्राम है, चीनी 200 ग्राम। हर सामग्री का वज़न अमेरिकी कप, मीट्रिक कप, बड़े चम्मच और छोटे चम्मच में देखें',
  cupUs: 'अमेरिकी कप (240 मिली)',
  cupMetric: 'मीट्रिक कप (200 मिली)',
  cupUk: 'ब्रिटिश कप (284 मिली)',
  tbsp: 'बड़ा चम्मच (15 मिली)',
  tsp: 'छोटा चम्मच (5 मिली)',
  gram: 'ग्राम',
  densityLabel: 'घनत्व',
  per100gTitle: '100 ग्राम कितना होता है',
  cupTableTitle: 'कप के माप',
  cupOf: label => `${label} कप`,
  similarTitle: 'मिलते-जुलते वज़न की सामग्री',
  howTitle: 'कैसे पढ़ें',
  how: [
    'कप एक ही नाप नहीं है — अमेरिका में 240 मिली, कोरिया-जापान में 200 मिली, पुरानी ब्रिटिश रेसिपी में 284 मिली। वही “1 कप” 20% तक बदल जाता है।',
    'ये आंकड़े चम्मच से भरकर ऊपर से सपाट किए जाने पर हैं। मैदा दबाकर भरने पर उसी कप में लगभग 30 ग्राम ज़्यादा आ जाता है।',
    'बेकिंग वज़न से बहुत भरोसेमंद बनती है, क्योंकि कुछ ग्राम से ही आटे का पानी-अनुपात बदल जाता है।',
    'यहाँ बड़ा चम्मच 15 मिली और छोटा चम्मच 5 मिली है। खाने के चम्मच बड़े होते हैं — मापने वाले चम्मच लें।',
  ],
  faqTitle: 'आम सवाल',
  categoryLabel: CAT('आटे', 'चीनी और सिरप', 'अनाज', 'डेयरी', 'तेल और वसा', 'मेवे और बीज', 'दालें', 'मसाले', 'तरल', 'सब्ज़ियाँ', 'अन्य'),
  hubMetaTitle: 'सामग्री वज़न कनवर्टर — 1 कप और 1 बड़ा चम्मच कितने ग्राम',
  hubMetaDesc: 'मैदा, चीनी, मक्खन, चावल, शहद जैसी 125 सामग्रियों का कप, बड़े चम्मच और छोटे चम्मच का वज़न — अमेरिकी कप (240 मिली) और मीट्रिक कप (200 मिली) दोनों में, साथ ही 100 ग्राम कितने कप होते हैं।',
  metaTitle: (name, grams) => `${name} 1 कप = ${grams} ग्राम`,
  metaDesc: (name, f) =>
    `${name} का एक कप अमेरिकी कप (240 मिली) में ${f.grams.cupUs} ग्राम और मीट्रिक कप (200 मिली) में ${f.grams.cupMetric} ग्राम होता है। बड़ा चम्मच ${f.grams.tbsp} ग्राम, छोटा चम्मच ${f.grams.tsp} ग्राम, और 100 ग्राम लगभग ${f.cupsPer100g} कप (${f.mlPer100g} मिली) है।`,
  hubFaq: [
    {
      q: 'एक ही कप में हर सामग्री का वज़न अलग क्यों होता है?',
      a: 'कप आयतन नापता है और हर सामग्री का घनत्व अलग होता है। मैदे के कणों के बीच हवा रहती है, इसलिए एक कप 125 ग्राम; शहद में कोई खाली जगह नहीं, इसलिए 340 ग्राम। आयतन वही, वज़न लगभग तीन गुना।',
    },
    {
      q: 'कौन-सा कप देखना चाहिए?',
      a: 'रेसिपी कहाँ की है, उसी का — अमेरिका-कनाडा 240 मिली, कोरिया-जापान 200 मिली, पुरानी ब्रिटिश किताबें 284 मिली। पता न हो तो यहाँ दिए ग्राम से तोलना सुरक्षित है।',
    },
    {
      q: 'बेकर्स वज़न पर क्यों ज़ोर देते हैं?',
      a: 'भरने के तरीक़े से वही एक कप मैदा 120 से 150 ग्राम तक जाता है। इतना अंतर आटे का पानी-अनुपात हिला देता है — ब्रेड फूलती नहीं, कुकी फैल जाती है। तराज़ू यह अनिश्चितता हटा देता है।',
    },
    {
      q: 'बड़ा चम्मच खाने के चम्मच के बराबर है?',
      a: 'नहीं। मापने वाला बड़ा चम्मच 15 मिली और छोटा 5 मिली होता है, जबकि खाने के चम्मच 10 से 18 मिली तक होते हैं। ज़्यादातर व्यंजन इसी वजह से नमकीन या फीके पड़ते हैं।',
    },
  ],
  itemFaq: (name, f) => [
    {
      q: `${name} का एक कप कितने ग्राम है?`,
      a: `अमेरिकी कप (240 मिली) में ${f.grams.cupUs} ग्राम और मीट्रिक कप (200 मिली) में ${f.grams.cupMetric} ग्राम — चम्मच से भरकर ऊपर से सपाट किया हुआ।`,
    },
    {
      q: `${name} का एक बड़ा चम्मच कितने ग्राम है?`,
      a: `बड़ा चम्मच (15 मिली) ${f.grams.tbsp} ग्राम और छोटा चम्मच (5 मिली) ${f.grams.tsp} ग्राम। ये मापने वाले चम्मच हैं; खाने के चम्मच बड़े होते हैं।`,
    },
    {
      q: `${name} के 100 ग्राम कितने कप हैं?`,
      a: `अमेरिकी कप से लगभग ${f.cupsPer100g} कप, आयतन में ${f.mlPer100g} मिली। जब रेसिपी ग्राम में हो और तराज़ू न हो, तब यही काम आता है।`,
    },
    {
      q: 'तोलना क्यों बेहतर है?',
      a: `${name} का घनत्व प्रति लीटर ${f.gPerL} ग्राम है। कप कैसे भरा, उससे मात्रा बदलती है — जिस आटे का सही बनना ज़रूरी है, वहाँ तराज़ू बचा लेता है।`,
    },
    {
      q: 'यह पानी से भारी है?',
      a: f.denserThanWater
        ? 'हाँ — पानी प्रति लीटर 1000 ग्राम है, इसलिए उतने ही आयतन में यह भारी पड़ता है।'
        : 'नहीं — पानी प्रति लीटर 1000 ग्राम है। कणों के बीच की हवा या वसा इसे उतने ही आयतन में हल्का रखती है।',
    },
  ],
};

export const FOOD_UI: L8<FoodUI> = { ko, en, es, pt, ja, de, fr, hi };

export const foodUi = (lang: Lang8): FoodUI => FOOD_UI[lang];

/** hreflang 묶음 — 재료 slug만 넣으면 아홉 줄이 나온다 */
export const foodAlternates = (slug?: string): Record<string, string> =>
  alternates8(slug ? `/food/${slug}` : '/food');
