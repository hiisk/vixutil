// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { FoodTool } from './food-tools.ts';
import { FOOD_TOOLS } from './food-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type IntlLocale } from './locales.ts';

/**
 * 요리 도구(/food) 섹션의 번역 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는 문구만 갈아 끼운다.
 *
 * 이 섹션은 계량 문화가 언어마다 달라 문구를 그대로 옮기면 어색해진다.
 * 영어권은 컵·큰술이 주력 단위이므로 그램 변환을 앞세운다. 반대로 스페인어·독일어·
 * 프랑스어·일본어권은 그램이 기본이고 컵은 "미국 레시피에 나오는 단위"라서, 컵을
 * 그램으로 읽어 주는 쪽으로 방향을 뒤집었다. 밥물·김장 염도처럼 한국 요리에서 온
 * 계산은 어느 언어에서도 그 맥락을 그대로 밝힌다.
 */
/**
 * 요리 도구 허브가 쓰는 언어 — 공용 IntlLocale에 중국어 둘을 더한다.
 *
 * IntlLocale 자체를 넓히지 않는 이유는 그 타입을 convert(도구 100개)를 비롯한
 * 열 몇 개 층이 함께 쓰고 있어서다. 섹션이 하나씩 넘어올 때 그 섹션만 넓힌다.
 */
export type FoodIntlLang = IntlLocale | 'zh-hans' | 'zh-hant';

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

  es: {
    measure: {
      title: 'Tazas a gramos', desc: 'Cuánto pesa una taza — depende del ingrediente', category: 'Medir',
      metaTitle: 'Tazas a gramos — Conversión por ingrediente, gratis',
      long: 'Una taza de harina son 120g; una taza de azúcar, 200g. El mismo volumen pesa distinto según lo que lleve dentro, así que hay que elegir el ingrediente para que salga bien. Sirve sobre todo para leer recetas estadounidenses, y también funciona al revés: de gramos a tazas y cucharadas.',
      features: ['Densidad aplicada según el ingrediente', 'Tazas, cucharadas y cucharaditas ↔ g y ml', 'Se muestra como combinación de medidas', 'Taza estadounidense de 240ml y taza métrica de 200ml'],
    },
    'recipe-scale': {
      title: 'Ajustar raciones de una receta', desc: 'Pasa una receta para dos a las raciones que quieras', category: 'Medir',
      metaTitle: 'Calculadora de raciones — Ajusta los ingredientes de una receta',
      long: 'Pega una receta, cambia las raciones y se recalculan todas las cantidades. Encuentra por su cuenta los números y las unidades, así que no tienes que multiplicar línea por línea.',
      features: ['Pega la receta y cambia solo las raciones', 'Detecta números y fracciones', 'Copiar todo el resultado de golpe', 'Decimales redondeados con criterio'],
    },
    salt: {
      title: 'Calculadora de salmuera', desc: 'Prepara la salmuera para encurtir y fermentar', category: 'Medir',
      metaTitle: 'Calculadora de salmuera — Porcentaje de sal para encurtidos y kimchi',
      long: 'Indica la salinidad que buscas y la cantidad de agua, y calcula cuántos gramos de sal hacen falta. Para salar col, encurtir y fermentar — todo aquello donde la salinidad decide el resultado — te libra de ir a ojo.',
      features: ['Peso de sal a partir de un porcentaje objetivo', 'Salinidad recomendada según el uso', 'Conversión de volumen por tipo de sal', 'También al revés: halla la salinidad'],
    },
    oven: {
      title: 'Temperatura del horno', desc: 'Fahrenheit, número de gas y freidora de aire', category: 'Calor',
      metaTitle: 'Conversor de temperatura del horno — °F, °C, gas y freidora de aire',
      long: 'Convierte los 350°F de una receta a grados centígrados y te dice qué es en realidad el número 4 de gas. También calcula la temperatura y el tiempo si vas a hacer lo mismo en la freidora de aire.',
      features: ['Centígrados ↔ Fahrenheit', 'Número de gas británico', 'Temperatura y tiempo de freidora de aire', 'Ajustes para las temperaturas más usadas'],
    },
    steak: {
      title: 'Punto de la carne', desc: 'Qué temperatura interna es al punto', category: 'Calor',
      metaTitle: 'Tabla de puntos del filete — Temperatura interna y tiempos',
      long: 'La temperatura interna de cada punto, y cuándo sacarlo del fuego contando con que seguirá cocinándose por dentro. Indica el grosor y te estima aproximadamente cuánto por cada lado.',
      features: ['Temperatura interna de cinco puntos', 'Temperatura de retirada contando la cocción residual', 'Tiempo aproximado según el grosor', 'Cuánto dejarlo reposar'],
    },
    rice: {
      title: 'Agua para el arroz', desc: 'Cuánta agua para esta cantidad de arroz', category: 'Calor',
      metaTitle: 'Calculadora de agua para arroz — Según el tipo de arroz',
      long: 'Calcula cuánta agua poner según la cantidad de arroz y lo blando que lo quieras. El blanco, el integral y las mezclas de cereales se comportan distinto, y el arroz viejo pide más agua — eso también está tenido en cuenta.',
      features: ['Proporción de agua para blanco, integral y mezclas', 'Ajuste entre blando y suelto', 'En tazas, ml y con el método del nudillo', 'Cuánto tiempo dejarlo en remojo'],
    },
    pasta: {
      title: 'Agua y sal para la pasta', desc: 'Cuánta agua y sal para 200g de pasta', category: 'Calor',
      metaTitle: 'Calculadora de agua para pasta — Proporción de agua y sal',
      long: 'La proporción base es 1L de agua y 10g de sal por cada 100g de pasta. Dale el peso de la pasta y calcula las dos cosas, junto con los tiempos de cocción según la forma.',
      features: ['Agua y sal para tu cantidad de pasta', 'Tiempo de cocción según la forma', 'Tiempo ajustado para al dente', 'Qué hacer con el agua de la pasta'],
    },
    coffee: {
      title: 'Proporción de café', desc: 'La proporción de oro entre café y agua', category: 'Bebidas',
      metaTitle: 'Calculadora de café y agua — Filtrado, prensa francesa, cold brew',
      long: 'Calcula la proporción de café y agua para filtrado, prensa francesa y cold brew, que son distintas entre sí. Decide cuánto quieres beber y te dice cuántos gramos moler.',
      features: ['Proporción según el método', 'Peso del café a partir del tamaño de la taza', 'O al contrario, partiendo del peso del café', 'Molienda y tiempo de extracción'],
    },
    'baking-pan': {
      title: 'Conversor de moldes', desc: 'Ajusta la masa cuando tu molde es de otro tamaño', category: 'Repostería',
      metaTitle: 'Conversor de tamaño de molde — Escala la masa entre moldes',
      long: 'La receta pide un molde redondo de 15cm y lo único que tienes es uno cuadrado de 18cm — esto calcula cuánto escalar la masa. Compara por superficie, así que los moldes de altura parecida salen bien tal cual.',
      features: ['Superficie comparada entre moldes redondos, cuadrados y de plum cake', 'Factor de escala de la masa', 'Cómo ajustar el tiempo de horno', 'Ajustes para los tamaños más habituales'],
    },
    storage: {
      title: 'Tiempos de conservación', desc: 'Cuántos días aguanta en la nevera o el congelador', category: 'Conservación',
      metaTitle: 'Tabla de conservación de alimentos — Nevera y congelador',
      long: 'Cuánto duran carne, pescado, lácteos y comida cocinada en la nevera y en el congelador, y cómo guardarlos para que duren. Reduce tanto lo que se tira estando bien como lo que se come sin estarlo.',
      features: ['Tiempos de nevera y congelador por ingrediente', 'Consejos de conservación', 'Qué no debe ir a la nevera', 'Consulta por categorías'],
    },
  },

  'pt-br': {
    measure: {
      title: 'Xícaras para gramas', desc: 'Quanto pesa uma xícara — depende do ingrediente', category: 'Medir',
      metaTitle: 'Xícaras para gramas — Conversão por ingrediente, grátis',
      long: 'Uma xícara de farinha dá 120g; uma de açúcar, 200g. O mesmo volume pesa diferente conforme o que está dentro, então é preciso escolher o ingrediente para acertar. Serve principalmente para ler receitas americanas, e também funciona ao contrário: de gramas para xícaras e colheres.',
      features: ['Densidade aplicada por ingrediente', 'Xícaras, colheres de sopa e de chá ↔ g e ml', 'Mostrado como combinação de medidas', 'Xícara americana de 240ml e xícara métrica de 200ml'],
    },
    'recipe-scale': {
      title: 'Ajustar porções de uma receita', desc: 'Passe uma receita para duas pessoas a quantas quiser', category: 'Medir',
      metaTitle: 'Calculadora de porções — Ajuste os ingredientes de uma receita',
      long: 'Cole uma receita, mude as porções e todas as quantidades são recalculadas. Ele acha os números e as unidades sozinho, então você não precisa multiplicar linha por linha.',
      features: ['Cole a receita e mude só as porções', 'Detecta números e frações', 'Copiar o resultado inteiro de uma vez', 'Decimais arredondados com bom senso'],
    },
    salt: {
      title: 'Calculadora de salmoura', desc: 'Prepare a salmoura para conservar e fermentar', category: 'Medir',
      metaTitle: 'Calculadora de salmoura — Porcentagem de sal para conservas e kimchi',
      long: 'Informe a salinidade desejada e a quantidade de água, e ele calcula quantos gramas de sal são necessários. Para salgar repolho, fazer conserva e fermentar — tudo em que a salinidade decide o resultado — você deixa de chutar.',
      features: ['Peso do sal a partir de uma porcentagem-alvo', 'Salinidade sugerida por finalidade', 'Conversão de volume por tipo de sal', 'Também ao contrário: descubra a salinidade'],
    },
    oven: {
      title: 'Temperatura do forno', desc: 'Fahrenheit, número do gás e air fryer', category: 'Calor',
      metaTitle: 'Conversor de temperatura do forno — °F, °C, gás e air fryer',
      long: 'Transforma os 350°F de uma receita em graus Celsius e diz o que é de fato o número 4 do gás. Também calcula a temperatura e o tempo se você for fazer a mesma coisa na air fryer.',
      features: ['Celsius ↔ Fahrenheit', 'Número do gás britânico', 'Temperatura e tempo de air fryer', 'Atalhos para as temperaturas mais usadas'],
    },
    steak: {
      title: 'Ponto da carne', desc: 'Que temperatura interna é ao ponto para mal passado', category: 'Calor',
      metaTitle: 'Tabela de pontos do bife — Temperatura interna e tempos',
      long: 'A temperatura interna de cada ponto, e quando tirar do fogo contando que o cozimento continua por dentro. Informe a espessura e ele estima mais ou menos quanto tempo de cada lado.',
      features: ['Temperatura interna de cinco pontos', 'Temperatura de retirada considerando o cozimento residual', 'Tempo aproximado pela espessura', 'Quanto tempo deixar descansar'],
    },
    rice: {
      title: 'Água para o arroz', desc: 'Quanta água para esta quantidade de arroz', category: 'Calor',
      metaTitle: 'Calculadora de água para arroz — Por tipo de arroz',
      long: 'Calcula quanta água colocar conforme a quantidade de arroz e o quanto você quer que fique macio. Branco, integral e misturas de grãos se comportam de forma diferente, e arroz velho pede mais água — isso também entra na conta.',
      features: ['Proporção de água para branco, integral e mistura de grãos', 'Ajuste entre macio e soltinho', 'Em xícaras, ml e pelo método do dedo', 'Quanto tempo deixar de molho'],
    },
    pasta: {
      title: 'Água e sal para a massa', desc: 'Quanta água e sal para 200g de massa', category: 'Calor',
      metaTitle: 'Calculadora de água para massa — Proporção de água e sal',
      long: 'A proporção base é 1L de água e 10g de sal para cada 100g de massa. Dê o peso da massa e ele calcula as duas coisas, junto com os tempos de cozimento por formato.',
      features: ['Água e sal para a sua quantidade de massa', 'Tempo de cozimento por formato', 'Tempo ajustado para al dente', 'O que fazer com a água do cozimento'],
    },
    coffee: {
      title: 'Proporção de café', desc: 'A proporção de ouro entre café e água', category: 'Bebidas',
      metaTitle: 'Calculadora de café e água — Coado, prensa francesa, cold brew',
      long: 'Calcula a proporção de café e água para coado, prensa francesa e cold brew, que são diferentes entre si. Decida quanto quer beber e ele diz quantos gramas moer.',
      features: ['Proporção por método de preparo', 'Peso do café a partir do tamanho da xícara', 'Ou o contrário, partindo do peso do café', 'Moagem e tempo de extração'],
    },
    'baking-pan': {
      title: 'Conversor de formas', desc: 'Ajuste a massa quando sua forma é de outro tamanho', category: 'Confeitaria',
      metaTitle: 'Conversor de tamanho de forma — Ajuste a massa entre formas',
      long: 'A receita pede uma forma redonda de 15cm e você só tem uma quadrada de 18cm — isto calcula o quanto ajustar a massa. Compara por área, então formas de altura parecida saem certas do jeito que estão.',
      features: ['Área comparada entre formas redondas, quadradas e de bolo inglês', 'Fator de ajuste da massa', 'Como ajustar o tempo de forno', 'Atalhos para os tamanhos mais comuns'],
    },
    storage: {
      title: 'Tempos de conservação', desc: 'Quantos dias aguenta na geladeira ou no freezer', category: 'Conservação',
      metaTitle: 'Tabela de conservação de alimentos — Geladeira e freezer',
      long: 'Quanto duram carne, peixe, lácteos e comida pronta na geladeira e no freezer, e como guardar para durar mais. Diminui tanto o que se joga fora estando bom quanto o que se come sem estar.',
      features: ['Tempos de geladeira e freezer por ingrediente', 'Dicas de armazenamento', 'O que não deve ir para a geladeira', 'Consulta por categoria'],
    },
  },

  ja: {
    measure: {
      title: 'カップをグラムに換算', desc: 'カップ1杯が何グラムか — 材料で変わる', category: '計量',
      metaTitle: 'カップをグラムに換算 — 材料別、無料',
      long: '小麦粉1カップは120g、砂糖1カップは200g。同じ体積でも中身によって重さが違うので、材料を選ばないと正しく出ません。海外レシピのカップ表記を読むときに役立ちます。グラムからカップ・大さじに戻す向きにも使えます。',
      features: ['材料ごとの比重を反映', 'カップ・大さじ・小さじ ↔ g・ml', '複数の計量器具の組み合わせで表示', '米国式240mlと日本式200mlの両方'],
    },
    'recipe-scale': {
      title: 'レシピの分量換算', desc: '2人分のレシピを好きな人数分に', category: '計量',
      metaTitle: 'レシピ分量計算 — 人数に合わせて材料を調整',
      long: 'レシピを貼って人数を変えるだけで、材料の分量が全部計算し直されます。数字と単位を自分で見つけるので、1行ずつ掛け算しなくてすみます。',
      features: ['レシピを貼って人数を変えるだけ', '数字と分数を自動で認識', '結果をまとめてコピー', '小数を扱いやすい数に整える'],
    },
    salt: {
      title: '塩分濃度の計算', desc: '漬けもの・発酵用の塩水を作る', category: '計量',
      metaTitle: '塩水濃度の計算 — 漬けものやキムチの塩分パーセント',
      long: '目指す塩分濃度と水の量を入れると、必要な塩が何グラムかを出します。白菜の塩漬け、ピクルス、発酵など、塩分濃度が仕上がりを決めるものでは目分量から抜け出せます。',
      features: ['目標のパーセントから塩の重さを出す', '用途ごとのおすすめ濃度', '塩の種類による体積換算', '逆に濃度を求めることもできる'],
    },
    oven: {
      title: 'オーブン温度の換算', desc: '華氏・ガスマーク・エアフライヤー', category: '加熱',
      metaTitle: 'オーブン温度換算 — °F・°C・ガスマーク・エアフライヤー',
      long: 'レシピの350°Fが摂氏で何度なのかを換算し、ガスマーク4が実際に何度かも教えます。同じものをエアフライヤーで作る場合の温度と時間も計算します。',
      features: ['摂氏 ↔ 華氏', '英国式ガスマーク', 'エアフライヤーの温度と時間', 'よく使う温度のプリセット'],
    },
    steak: {
      title: 'ステーキの焼き加減', desc: 'ミディアムレアは中心温度で何度か', category: '加熱',
      metaTitle: 'ステーキの焼き加減表 — 中心温度と時間の目安',
      long: '焼き加減ごとの中心温度と、余熱で進む分を見込んでいつ火から下ろすかを示します。厚みを入れれば片面あたりのおおよその時間も出ます。',
      features: ['5段階の中心温度', '余熱を見込んだ引き上げ温度', '厚みごとのおおよその加熱時間', '休ませる時間'],
    },
    rice: {
      title: 'ご飯の水加減', desc: 'この量のお米に水はどれくらいか', category: '加熱',
      metaTitle: 'ご飯の水加減計算 — 米の種類別',
      long: 'お米の量と好みのやわらかさから、加える水の量を出します。白米・玄米・雑穀米はそれぞれ違い、古いお米は水を多めに必要とします — それも織り込んであります。',
      features: ['白米・玄米・雑穀の水の割合', 'やわらかめ〜かための調整', 'カップ・ml・指の関節での測り方', '浸水させる時間'],
    },
    pasta: {
      title: 'パスタの水と塩', desc: 'パスタ200gに水と塩はどれくらいか', category: '加熱',
      metaTitle: 'パスタの湯量計算 — 水と塩の割合',
      long: '基本はパスタ100gあたり水1L・塩10gです。パスタの重さを入れれば両方を計算し、形ごとのゆで時間も出します。',
      features: ['パスタの量に合わせた水と塩', '形ごとのゆで時間', 'アルデンテ向けの時間調整', 'ゆで汁の使い道'],
    },
    coffee: {
      title: 'コーヒーの粉と湯の比率', desc: 'コーヒーと湯の黄金比', category: '飲みもの',
      metaTitle: 'コーヒーの粉と湯の計算 — ハンドドリップ・フレンチプレス・コールドブリュー',
      long: 'ハンドドリップ、フレンチプレス、コールドブリューはそれぞれ比率が違います。飲みたい量を決めれば、挽く粉が何グラム必要かを出します。',
      features: ['抽出方法ごとの比率', 'カップの量から粉の重さを出す', '逆に粉の重さから決めることもできる', '挽き方と抽出時間'],
    },
    'baking-pan': {
      title: '型のサイズ換算', desc: '型の大きさが違うとき生地の量を調整', category: '焼き菓子',
      metaTitle: '型のサイズ換算 — 違う型に生地を合わせる',
      long: 'レシピは15cmの丸型なのに、家にあるのは18cmの角型 — そんなときに生地をどれだけ増減すればいいかを出します。面積で比べるので、深さが近い型ならそのままうまくいきます。',
      features: ['丸型・角型・パウンド型の面積を比較', '生地の倍率', '焼き時間の調整のしかた', 'よく使う型のプリセット'],
    },
    storage: {
      title: '食品の保存期間', desc: '冷蔵庫や冷凍庫で何日もつか', category: '保存',
      metaTitle: '食品保存期間の目安 — 冷蔵と冷凍',
      long: '肉・魚・乳製品・作り置きが冷蔵と冷凍でどれくらいもつか、長もちさせる保存のしかたをまとめました。まだ食べられるものを捨てるのも、傷んだものを食べてしまうのも減ります。',
      features: ['食材ごとの冷蔵・冷凍期間', '保存のコツ', '冷蔵庫に入れてはいけないもの', '分類から探せる'],
    },
  },

  de: {
    measure: {
      title: 'Cups in Gramm', desc: 'Was ein Cup wiegt — je Zutat unterschiedlich', category: 'Abmessen',
      metaTitle: 'Cups in Gramm umrechnen — Nach Zutat, kostenlos',
      long: 'Ein Cup Mehl sind 120g, ein Cup Zucker 200g. Dasselbe Volumen wiegt je Inhalt anders, du musst also die Zutat wählen, damit es stimmt. Vor allem hilfreich beim Lesen amerikanischer Rezepte — und es geht auch umgekehrt, von Gramm zu Cups und Löffeln.',
      features: ['Dichte je Zutat berücksichtigt', 'Cups, Ess- und Teelöffel ↔ g und ml', 'Als Kombination von Maßen angezeigt', 'US-Cup mit 240ml und metrischer Cup mit 200ml'],
    },
    'recipe-scale': {
      title: 'Rezept auf Portionen umrechnen', desc: 'Ein Rezept für zwei auf beliebig viele Portionen', category: 'Abmessen',
      metaTitle: 'Portionsrechner — Rezeptmengen nach Portionen anpassen',
      long: 'Rezept einfügen, Portionen ändern, und alle Mengen werden neu berechnet. Zahlen und Einheiten findet es selbst, du musst also nicht Zeile für Zeile multiplizieren.',
      features: ['Rezept einfügen und nur die Portionen ändern', 'Erkennt Zahlen und Brüche', 'Ganzes Ergebnis auf einmal kopieren', 'Dezimalstellen sinnvoll gerundet'],
    },
    salt: {
      title: 'Salzlake berechnen', desc: 'Lake fürs Einlegen und Fermentieren mischen', category: 'Abmessen',
      metaTitle: 'Salzlake-Rechner — Salzanteil für Eingelegtes und Kimchi',
      long: 'Gib den gewünschten Salzgehalt und die Wassermenge an, und es rechnet aus, wie viele Gramm Salz du brauchst. Beim Salzen von Kohl, Einlegen und Fermentieren — überall, wo der Salzgehalt das Ergebnis bestimmt — musst du nicht mehr schätzen.',
      features: ['Salzgewicht aus einem Zielprozentwert', 'Empfohlener Salzgehalt je Zweck', 'Volumenumrechnung je Salzsorte', 'Auch rückwärts: den Salzgehalt finden'],
    },
    oven: {
      title: 'Backofentemperatur umrechnen', desc: 'Fahrenheit, Gasstufe und Heißluftfritteuse', category: 'Hitze',
      metaTitle: 'Backofentemperatur umrechnen — °F, °C, Gasstufe und Heißluftfritteuse',
      long: 'Rechnet die 350°F aus einem Rezept in Grad Celsius um und sagt dir, was Gasstufe 4 tatsächlich bedeutet. Es ermittelt auch Temperatur und Zeit, wenn du dasselbe in der Heißluftfritteuse machst.',
      features: ['Celsius ↔ Fahrenheit', 'Britische Gasstufe', 'Temperatur und Zeit für die Heißluftfritteuse', 'Vorlagen für gängige Temperaturen'],
    },
    steak: {
      title: 'Garstufen beim Steak', desc: 'Welche Kerntemperatur medium rare ist', category: 'Hitze',
      metaTitle: 'Steak-Garstufen — Kerntemperatur und Zeiten',
      long: 'Die Kerntemperatur jeder Garstufe und wann du das Fleisch herausnimmst, weil es innen weitergart. Gib die Dicke an und es schätzt grob, wie lange pro Seite.',
      features: ['Kerntemperatur für fünf Garstufen', 'Entnahmetemperatur mit Nachgarung eingerechnet', 'Ungefähre Garzeit nach Dicke', 'Wie lange es ruhen soll'],
    },
    rice: {
      title: 'Wassermenge für Reis', desc: 'Wie viel Wasser auf diese Menge Reis', category: 'Hitze',
      metaTitle: 'Reis-Wasser-Rechner — Nach Reissorte',
      long: 'Berechnet die Wassermenge aus der Reismenge und wie weich du ihn magst. Weißer Reis, Vollkornreis und Mischgetreide verhalten sich verschieden, und älterer Reis braucht mehr Wasser — das ist mitgerechnet.',
      features: ['Wasseranteil für weißen, Vollkorn- und Mischreis', 'Regler zwischen weich und körnig', 'In Cups, ml und per Fingerglied', 'Wie lange einweichen'],
    },
    pasta: {
      title: 'Wasser und Salz für Pasta', desc: 'Wie viel Wasser und Salz auf 200g Pasta', category: 'Hitze',
      metaTitle: 'Pastawasser-Rechner — Verhältnis von Wasser und Salz',
      long: 'Die Grundregel ist 1L Wasser und 10g Salz auf 100g Pasta. Gib das Gewicht der Pasta an und es rechnet beides aus, dazu Kochzeiten je Form.',
      features: ['Wasser und Salz für deine Pastamenge', 'Kochzeit je Pastaform', 'Zeit für al dente angepasst', 'Was du mit dem Nudelwasser machst'],
    },
    coffee: {
      title: 'Kaffee-Wasser-Verhältnis', desc: 'Das goldene Verhältnis von Kaffee zu Wasser', category: 'Getränke',
      metaTitle: 'Kaffee-Wasser-Rechner — Filter, French Press, Cold Brew',
      long: 'Berechnet das Verhältnis von Kaffee zu Wasser für Handfilter, French Press und Cold Brew, die alle unterschiedlich sind. Entscheide, wie viel du trinken willst, und es sagt dir, wie viele Gramm du mahlen musst.',
      features: ['Verhältnis je Brühmethode', 'Kaffeegewicht aus der Tassengröße', 'Oder umgekehrt vom Kaffeegewicht aus', 'Mahlgrad und Brühzeit'],
    },
    'baking-pan': {
      title: 'Backformen umrechnen', desc: 'Teigmenge anpassen, wenn die Form anders groß ist', category: 'Backen',
      metaTitle: 'Backformgrößen umrechnen — Teig zwischen Formen umrechnen',
      long: 'Das Rezept nennt eine runde Form mit 15cm und du hast nur eine eckige mit 18cm — das rechnet aus, wie stark du den Teig anpassen musst. Verglichen wird über die Fläche, also passen Formen mit ähnlicher Höhe so wie sie sind.',
      features: ['Fläche von runden, eckigen und Kastenformen verglichen', 'Umrechnungsfaktor für den Teig', 'Wie du die Backzeit anpasst', 'Vorlagen für gängige Formgrößen'],
    },
    storage: {
      title: 'Haltbarkeit von Lebensmitteln', desc: 'Wie viele Tage im Kühl- oder Gefrierschrank', category: 'Lagern',
      metaTitle: 'Haltbarkeitstabelle — Kühlschrank und Gefrierschrank',
      long: 'Wie lange Fleisch, Fisch, Milchprodukte und Gekochtes im Kühl- und im Gefrierschrank halten, und wie du sie lagerst, damit sie länger halten. Das verringert beides: Wegwerfen, was noch gut war, und Essen, was es nicht mehr war.',
      features: ['Kühl- und Gefrierzeiten je Zutat', 'Tipps zur Lagerung', 'Was nicht in den Kühlschrank gehört', 'Nach Kategorie durchsehen'],
    },
  },

  fr: {
    measure: {
      title: 'Tasses en grammes', desc: 'Ce que pèse une tasse — ça dépend de l’ingrédient', category: 'Mesurer',
      metaTitle: 'Tasses en grammes — Conversion par ingrédient, gratuit',
      long: 'Une tasse de farine fait 120g, une tasse de sucre 200g. Le même volume pèse différemment selon ce qu’il contient, il faut donc choisir l’ingrédient pour tomber juste. Utile surtout pour lire des recettes américaines — et ça marche aussi dans l’autre sens, des grammes vers les tasses et les cuillères.',
      features: ['Densité appliquée selon l’ingrédient', 'Tasses, cuillères à soupe et à café ↔ g et ml', 'Affiché comme combinaison de mesures', 'Tasse américaine de 240ml et tasse métrique de 200ml'],
    },
    'recipe-scale': {
      title: 'Ajuster les portions d’une recette', desc: 'Passe une recette pour deux au nombre de parts voulu', category: 'Mesurer',
      metaTitle: 'Calculateur de portions — Ajuste les ingrédients d’une recette',
      long: 'Colle une recette, change le nombre de parts, et toutes les quantités sont recalculées. Il repère lui-même les nombres et les unités : pas besoin de multiplier ligne par ligne.',
      features: ['Colle la recette et change juste les parts', 'Détecte les nombres et les fractions', 'Copier tout le résultat d’un coup', 'Décimales arrondies proprement'],
    },
    salt: {
      title: 'Calculateur de saumure', desc: 'Prépare la saumure pour la conservation et la fermentation', category: 'Mesurer',
      metaTitle: 'Calculateur de saumure — Taux de sel pour conserves et kimchi',
      long: 'Indique la salinité visée et la quantité d’eau, et il calcule combien de grammes de sel il faut. Pour saler du chou, faire des conserves ou fermenter — partout où la salinité décide du résultat — tu arrêtes de faire au jugé.',
      features: ['Poids de sel à partir d’un pourcentage cible', 'Salinité conseillée selon l’usage', 'Conversion de volume selon le type de sel', 'Ou l’inverse : retrouver la salinité'],
    },
    oven: {
      title: 'Température du four', desc: 'Fahrenheit, thermostat gaz et airfryer', category: 'Chaleur',
      metaTitle: 'Convertisseur de température du four — °F, °C, thermostat et airfryer',
      long: 'Convertit les 350°F d’une recette en degrés Celsius et t’indique ce qu’est réellement le thermostat 4. Il calcule aussi la température et le temps si tu fais la même chose à l’airfryer.',
      features: ['Celsius ↔ Fahrenheit', 'Thermostat gaz britannique', 'Température et temps d’airfryer', 'Préréglages pour les températures courantes'],
    },
    steak: {
      title: 'Cuisson de la viande', desc: 'Quelle température à cœur pour un saignant', category: 'Chaleur',
      metaTitle: 'Table de cuisson du steak — Température à cœur et temps',
      long: 'La température à cœur de chaque cuisson, et quand sortir la viande du feu puisqu’elle continue de cuire à l’intérieur. Donne l’épaisseur et il estime grossièrement le temps par face.',
      features: ['Température à cœur pour cinq cuissons', 'Température de sortie tenant compte de la cuisson résiduelle', 'Temps approximatif selon l’épaisseur', 'Combien de temps la laisser reposer'],
    },
    rice: {
      title: 'Eau pour le riz', desc: 'Combien d’eau pour cette quantité de riz', category: 'Chaleur',
      metaTitle: 'Calculateur d’eau pour le riz — Selon le type de riz',
      long: 'Calcule la quantité d’eau selon la quantité de riz et la tenue que tu veux. Le riz blanc, le complet et les mélanges de céréales se comportent différemment, et un riz plus vieux demande davantage d’eau — c’est pris en compte.',
      features: ['Proportion d’eau pour riz blanc, complet et mélangé', 'Réglage entre moelleux et ferme', 'En tasses, ml et à la phalange', 'Combien de temps le faire tremper'],
    },
    pasta: {
      title: 'Eau et sel pour les pâtes', desc: 'Combien d’eau et de sel pour 200g de pâtes', category: 'Chaleur',
      metaTitle: 'Calculateur d’eau pour les pâtes — Proportion d’eau et de sel',
      long: 'La règle de base est 1L d’eau et 10g de sel pour 100g de pâtes. Donne le poids des pâtes et il calcule les deux, avec les temps de cuisson selon la forme.',
      features: ['Eau et sel pour ta quantité de pâtes', 'Temps de cuisson selon la forme', 'Temps ajusté pour l’al dente', 'Quoi faire de l’eau de cuisson'],
    },
    coffee: {
      title: 'Ratio café-eau', desc: 'Le ratio d’or entre le café et l’eau', category: 'Boissons',
      metaTitle: 'Calculateur café-eau — Filtre, presse française, cold brew',
      long: 'Calcule le ratio café-eau pour le filtre, la presse française et le cold brew, qui sont tous différents. Décide combien tu veux boire et il te dit combien de grammes moudre.',
      features: ['Ratio selon la méthode d’extraction', 'Poids de café à partir de la taille de tasse', 'Ou l’inverse, en partant du poids de café', 'Mouture et temps d’extraction'],
    },
    'baking-pan': {
      title: 'Convertisseur de moules', desc: 'Ajuste la pâte quand ton moule fait une autre taille', category: 'Pâtisserie',
      metaTitle: 'Convertisseur de taille de moule — Adapter la pâte d’un moule à l’autre',
      long: 'La recette demande un moule rond de 15cm et tu n’as qu’un carré de 18cm — ceci calcule de combien ajuster la pâte. La comparaison se fait par surface, donc des moules de hauteur proche fonctionnent tels quels.',
      features: ['Surface comparée entre moules ronds, carrés et à cake', 'Facteur d’ajustement de la pâte', 'Comment ajuster le temps de cuisson', 'Préréglages pour les tailles courantes'],
    },
    storage: {
      title: 'Durées de conservation', desc: 'Combien de jours au frigo ou au congélateur', category: 'Conservation',
      metaTitle: 'Table de conservation des aliments — Frigo et congélateur',
      long: 'Combien de temps tiennent viande, poisson, produits laitiers et plats cuisinés au frigo et au congélateur, et comment les ranger pour qu’ils tiennent. Ça réduit à la fois ce qu’on jette encore bon et ce qu’on mange déjà mauvais.',
      features: ['Durées au frigo et au congélateur par ingrédient', 'Conseils de rangement', 'Ce qui ne va pas au frigo', 'Parcourir par catégorie'],
    },
  },

  hi: {
    measure: {
      title: 'कप से ग्राम', desc: 'एक कप का वज़न कितना — सामग्री पर निर्भर', category: 'नाप',
      metaTitle: 'कप से ग्राम — सामग्री के हिसाब से, मुफ़्त',
      long: 'एक कप आटा 120g होता है; एक कप चीनी 200g। एक ही मात्रा का वज़न भीतर की चीज़ पर निर्भर करता है, इसलिए सही जवाब के लिए सामग्री चुननी पड़ती है। विदेशी रेसिपी में लिखे कप पढ़ने में सबसे काम आता है, और उलटी दिशा में भी चलता है — ग्राम से कप और चम्मच।',
      features: ['हर सामग्री का घनत्व लगाया जाता है', 'कप, बड़े चम्मच और छोटे चम्मच ↔ g और ml', 'कई नापों के जोड़ के रूप में दिखता है', '240ml का अमेरिकी कप और 200ml का मीट्रिक कप दोनों'],
    },
    'recipe-scale': {
      title: 'रेसिपी की मात्रा बदलें', desc: 'दो लोगों की रेसिपी को जितने चाहें उतनों के लिए', category: 'नाप',
      metaTitle: 'रेसिपी मात्रा कैलकुलेटर — लोगों के हिसाब से सामग्री',
      long: 'रेसिपी चिपकाइए, लोगों की संख्या बदलिए, और सारी मात्राएँ फिर से गिन ली जाती हैं। यह संख्याएँ और इकाइयाँ खुद पहचान लेता है, इसलिए एक-एक पंक्ति गुणा करने की ज़रूरत नहीं।',
      features: ['रेसिपी चिपकाएँ और सिर्फ़ संख्या बदलें', 'संख्याएँ और भिन्न अपने आप पहचानी जाती हैं', 'पूरा नतीजा एक बार में कॉपी करें', 'दशमलव को साफ़ अंकों में लाया जाता है'],
    },
    salt: {
      title: 'नमक के पानी की गणना', desc: 'अचार और खमीर के लिए नमक का पानी बनाएँ', category: 'नाप',
      metaTitle: 'नमक के पानी की गणना — अचार और किमची के लिए नमक का प्रतिशत',
      long: 'चाही गई नमक की मात्रा और पानी बताइए, और यह गिन देगा कि कितने ग्राम नमक चाहिए। पत्तागोभी नमकाने, अचार डालने और खमीर उठाने जैसे कामों में — जहाँ नमक की मात्रा नतीजा तय करती है — अंदाज़े से छुटकारा मिल जाता है।',
      features: ['लक्ष्य प्रतिशत से नमक का वज़न', 'काम के हिसाब से सुझाई गई मात्रा', 'नमक के प्रकार के अनुसार मात्रा बदलना', 'उलटा भी — मात्रा से प्रतिशत निकालें'],
    },
    oven: {
      title: 'ओवन का तापमान बदलें', desc: 'फ़ारेनहाइट, गैस मार्क और एयर फ़्रायर', category: 'आँच',
      metaTitle: 'ओवन तापमान कनवर्टर — °F, °C, गैस मार्क और एयर फ़्रायर',
      long: 'रेसिपी के 350°F को सेल्सियस में बदलता है और बताता है कि गैस मार्क 4 असल में क्या है। वही चीज़ एयर फ़्रायर में बनानी हो तो उसका तापमान और समय भी निकाल देता है।',
      features: ['सेल्सियस ↔ फ़ारेनहाइट', 'ब्रिटिश गैस मार्क', 'एयर फ़्रायर का तापमान और समय', 'आम तापमानों के प्रीसेट'],
    },
    steak: {
      title: 'स्टेक कितना पका', desc: 'मीडियम रेयर के लिए भीतरी तापमान कितना', category: 'आँच',
      metaTitle: 'स्टेक पकने की तालिका — भीतरी तापमान और समय',
      long: 'हर स्तर के लिए भीतरी तापमान, और भीतर पकना जारी रहेगा यह मानकर कब आँच से उतारना है। मोटाई बताइए तो हर तरफ़ लगभग कितना समय लगेगा इसका अंदाज़ा भी मिलता है।',
      features: ['पाँच स्तरों का भीतरी तापमान', 'बची हुई गर्मी को गिनकर उतारने का तापमान', 'मोटाई के हिसाब से मोटा-मोटा समय', 'कितनी देर आराम देना है'],
    },
    rice: {
      title: 'चावल में पानी', desc: 'इतने चावल के लिए कितना पानी', category: 'आँच',
      metaTitle: 'चावल-पानी कैलकुलेटर — चावल के प्रकार के हिसाब से',
      long: 'चावल की मात्रा और आप कितना नरम चाहते हैं, इससे पानी की मात्रा निकालता है। सफ़ेद, भूरा और मिले-जुले अनाज अलग-अलग बरतते हैं, और पुराने चावल को ज़्यादा पानी चाहिए — यह भी गिना गया है।',
      features: ['सफ़ेद, भूरे और मिश्रित अनाज के लिए पानी का अनुपात', 'नरम और खिला-खिला के बीच सेटिंग', 'कप, ml और उँगली की गाँठ वाले तरीके में', 'कितनी देर भिगोना है'],
    },
    pasta: {
      title: 'पास्ता का पानी और नमक', desc: '200g पास्ता के लिए कितना पानी और नमक', category: 'आँच',
      metaTitle: 'पास्ता पानी कैलकुलेटर — पानी और नमक का अनुपात',
      long: 'बुनियादी अनुपात है हर 100g पास्ता पर 1L पानी और 10g नमक। पास्ता का वज़न दीजिए और यह दोनों निकाल देगा, साथ में आकार के हिसाब से पकाने का समय भी।',
      features: ['आपके पास्ता की मात्रा के लिए पानी और नमक', 'आकार के हिसाब से पकाने का समय', 'अल दांते के लिए समय में बदलाव', 'पास्ता के पानी का क्या करें'],
    },
    coffee: {
      title: 'कॉफ़ी का अनुपात', desc: 'कॉफ़ी और पानी का सुनहरा अनुपात', category: 'पेय',
      metaTitle: 'कॉफ़ी-पानी कैलकुलेटर — पोर ओवर, फ़्रेंच प्रेस, कोल्ड ब्रू',
      long: 'पोर ओवर, फ़्रेंच प्रेस और कोल्ड ब्रू के लिए कॉफ़ी-पानी का अनुपात निकालता है, जो तीनों में अलग होता है। कितना पीना है यह तय कीजिए और यह बताएगा कि कितने ग्राम पीसने हैं।',
      features: ['बनाने के तरीके के हिसाब से अनुपात', 'कप के आकार से कॉफ़ी का वज़न', 'या उलटा, कॉफ़ी के वज़न से शुरू', 'पीसने की बारीकी और भिगोने का समय'],
    },
    'baking-pan': {
      title: 'बेकिंग टिन कनवर्टर', desc: 'टिन का नाप अलग हो तो घोल की मात्रा बदलें', category: 'बेकिंग',
      metaTitle: 'बेकिंग टिन नाप कनवर्टर — एक टिन से दूसरे के लिए घोल',
      long: 'रेसिपी में 15cm का गोल टिन लिखा है और आपके पास सिर्फ़ 18cm का चौकोर — यह बताता है कि घोल कितना बढ़ाना या घटाना है। तुलना क्षेत्रफल से होती है, इसलिए मिलती-जुलती गहराई वाले टिन में सीधे ठीक बैठता है।',
      features: ['गोल, चौकोर और लोफ़ टिन का क्षेत्रफल तुलना', 'घोल का गुणक', 'बेक करने का समय कैसे बदलें', 'आम टिन नापों के प्रीसेट'],
    },
    storage: {
      title: 'खाने की भंडारण अवधि', desc: 'फ़्रिज या फ़्रीज़र में कितने दिन ठीक रहता है', category: 'भंडारण',
      metaTitle: 'खाद्य भंडारण तालिका — फ़्रिज और फ़्रीज़र की अवधि',
      long: 'मांस, मछली, दूध के उत्पाद और पका खाना फ़्रिज और फ़्रीज़र में कितने दिन चलते हैं, और ज़्यादा दिन चलाने के लिए कैसे रखें। इससे ठीक खाना फेंकना और बिगड़ा खाना खाना, दोनों घटते हैं।',
      features: ['हर सामग्री के लिए फ़्रिज और फ़्रीज़र की अवधि', 'रखने के सुझाव', 'क्या फ़्रिज में नहीं रखना चाहिए', 'श्रेणी से देखें'],
    },
  },
  'zh-hans': {
    measure: {
      title: '杯换克换算器', desc: '一杯、一勺是多少克 —— 每种食材都不一样', category: '计量',
      metaTitle: '杯换克换算器 — 按食材计算，免费',
      long: '一杯面粉 120 克，一杯糖 200 克。同样的体积，装的东西不同重量就不同，所以必须先选食材才算得准。手边没有秤时，也可以反过来把克数换成杯和勺。',
      features: ['按食材套用各自的密度', '杯、大勺、小勺 ↔ 克和毫升', '结果按几种量具组合显示', '美式 240ml 和公制 200ml 两种杯'],
    },
    'recipe-scale': {
      title: '食谱份量换算', desc: '把两人份的食谱改成任意人份', category: '计量',
      metaTitle: '食谱份量换算 — 按人数调整所有用量',
      long: '把食谱粘贴进去，改一下人份，每样食材的用量就跟着重算。数字和单位由程序自己找出来，不用一行一行地乘。',
      features: ['贴上食谱，只改人份就行', '自动识别数字和分数', '结果可以一次全部复制', '小数会自动收拾干净'],
    },
    salt: {
      title: '盐水浓度计算器', desc: '腌渍和发酵要配多少盐水', category: '计量',
      metaTitle: '盐水计算器 — 泡菜和腌菜的含盐百分比',
      long: '输入想要的盐度和水量，就算出需要多少克盐。腌白菜、做酱菜、发酵 —— 凡是盐度决定成败的事，都不用再靠猜。',
      features: ['从目标百分比算出盐的重量', '按用途给出建议盐度', '按盐的种类换算体积', '也能反过来求盐度'],
    },
    oven: {
      title: '烤箱温度换算', desc: '华氏、燃气刻度和空气炸锅', category: '加热',
      metaTitle: '烤箱温度换算 — °F、°C、燃气刻度与空气炸锅',
      long: '把食谱里的 350°F 换成摄氏，也告诉你燃气刻度 4 到底是多少度。同样一道菜要用空气炸锅做的话，该用什么温度、烤多久，也一并算出来。',
      features: ['摄氏 ↔ 华氏', '英式燃气刻度', '空气炸锅的温度和时间', '常用温度的预设'],
    },
    steak: {
      title: '牛排熟度温度表', desc: '三分熟的中心温度是多少', category: '加热',
      metaTitle: '牛排熟度对照表 — 中心温度与时间掌握',
      long: '每一档熟度的中心温度，以及考虑余温之后该在几度离火。输入厚度，还能大致估出每面要煎多久。',
      features: ['五档熟度的中心温度', '把余温算进去的离火温度', '按厚度估算煎的时间', '静置要放多久'],
    },
    rice: {
      title: '煮饭水量计算器', desc: '这么多米该加多少水', category: '加热',
      metaTitle: '米水比例计算器 — 按米的种类',
      long: '按米的多少和你想要的软硬，算出该加多少水。白米、糙米、杂粮各不相同，陈米还要多加水 —— 这些都算了进去。',
      features: ['白米、糙米、杂粮各自的水量比', '在偏硬和偏软之间调整', '用杯、毫升和手背法三种说法', '要泡多久'],
    },
    pasta: {
      title: '意面的水和盐', desc: '煮 200 克意面要多少水和盐', category: '加热',
      metaTitle: '意面煮水计算器 — 水和盐的比例',
      long: '基本比例是每 100 克面配 1 升水、10 克盐。给它面的重量，两样都算好，还附上各种面型的煮制时间。',
      features: ['按你的面量算水和盐', '按面型给出煮的时间', '要弹牙的话时间会调整', '煮面水该拿来做什么'],
    },
    coffee: {
      title: '咖啡粉水比计算器', desc: '咖啡和水的黄金比例', category: '饮品',
      metaTitle: '咖啡粉水比计算器 — 手冲、法压壶、冷萃',
      long: '手冲、法压壶、冷萃的粉水比各不相同，这里都算得出来。定好想喝多少，它就告诉你要磨多少克豆子。',
      features: ['各冲煮方式的比例', '从杯量反推豆量', '也可以反过来从豆量算起', '研磨粗细和萃取时间'],
    },
    'baking-pan': {
      title: '烤模尺寸换算', desc: '模具尺寸不一样时，面糊该怎么调', category: '烘焙',
      metaTitle: '烤模尺寸换算 — 在不同模具之间调整面糊量',
      long: '食谱写的是 15 公分圆模，家里只有 18 公分方模 —— 这里算出面糊该放大或缩小多少。它按面积比来算，所以深浅接近的模具直接照着做就对。',
      features: ['圆模、方模、吐司模按面积互换', '面糊的倍率', '烘烤时间该怎么跟着调', '常见模具尺寸的预设'],
    },
    storage: {
      title: '食品保存期限', desc: '放冷藏或冷冻能撑几天', category: '保存',
      metaTitle: '食品保存对照表 — 冷藏与冷冻期限',
      long: '肉、鱼、乳制品和熟食在冷藏和冷冻里各能放多久，以及怎么放才撑得久。既少扔掉还能吃的，也少吃到不该吃的。',
      features: ['每种食材的冷藏与冷冻期限', '保存的小窍门', '哪些东西不该进冰箱', '按分类浏览'],
    },
  },
  'zh-hant': {
    measure: {
      title: '杯換公克換算器', desc: '一杯、一匙是多少公克 —— 每種食材都不一樣', category: '計量',
      metaTitle: '杯換公克換算器 — 按食材計算，免費',
      long: '一杯麵粉 120 公克，一杯糖 200 公克。同樣的體積，裝的東西不同重量就不同，所以必須先選食材才算得準。手邊沒有秤時，也可以反過來把公克數換成杯和匙。',
      features: ['按食材套用各自的密度', '杯、大匙、小匙 ↔ 公克和毫升', '結果按幾種量具組合顯示', '美式 240ml 和公制 200ml 兩種杯'],
    },
    'recipe-scale': {
      title: '食譜份量換算', desc: '把兩人份的食譜改成任意人份', category: '計量',
      metaTitle: '食譜份量換算 — 按人數調整所有用量',
      long: '把食譜貼進去，改一下人份，每樣食材的用量就跟著重算。數字和單位由程式自己找出來，不用一行一行地乘。',
      features: ['貼上食譜，只改人份就行', '自動辨識數字和分數', '結果可以一次全部複製', '小數會自動收拾乾淨'],
    },
    salt: {
      title: '鹽水濃度計算器', desc: '醃漬和發酵要配多少鹽水', category: '計量',
      metaTitle: '鹽水計算器 — 泡菜和醃菜的含鹽百分比',
      long: '輸入想要的鹽度和水量，就算出需要多少公克鹽。醃白菜、做醬菜、發酵 —— 凡是鹽度決定成敗的事，都不用再靠猜。',
      features: ['從目標百分比算出鹽的重量', '按用途給出建議鹽度', '按鹽的種類換算體積', '也能反過來求鹽度'],
    },
    oven: {
      title: '烤箱溫度換算', desc: '華氏、瓦斯刻度和氣炸鍋', category: '加熱',
      metaTitle: '烤箱溫度換算 — °F、°C、瓦斯刻度與氣炸鍋',
      long: '把食譜裡的 350°F 換成攝氏，也告訴你瓦斯刻度 4 到底是多少度。同樣一道菜要用氣炸鍋做的話，該用什麼溫度、烤多久，也一併算出來。',
      features: ['攝氏 ↔ 華氏', '英式瓦斯刻度', '氣炸鍋的溫度和時間', '常用溫度的預設'],
    },
    steak: {
      title: '牛排熟度溫度表', desc: '三分熟的中心溫度是多少', category: '加熱',
      metaTitle: '牛排熟度對照表 — 中心溫度與時間掌握',
      long: '每一檔熟度的中心溫度，以及考慮餘溫之後該在幾度離火。輸入厚度，還能大致估出每面要煎多久。',
      features: ['五檔熟度的中心溫度', '把餘溫算進去的離火溫度', '按厚度估算煎的時間', '靜置要放多久'],
    },
    rice: {
      title: '煮飯水量計算器', desc: '這麼多米該加多少水', category: '加熱',
      metaTitle: '米水比例計算器 — 按米的種類',
      long: '按米的多少和你想要的軟硬，算出該加多少水。白米、糙米、雜糧各不相同，舊米還要多加水 —— 這些都算了進去。',
      features: ['白米、糙米、雜糧各自的水量比', '在偏硬和偏軟之間調整', '用杯、毫升和手背法三種說法', '要泡多久'],
    },
    pasta: {
      title: '義大利麵的水和鹽', desc: '煮 200 公克義大利麵要多少水和鹽', category: '加熱',
      metaTitle: '義大利麵煮水計算器 — 水和鹽的比例',
      long: '基本比例是每 100 公克麵配 1 公升水、10 公克鹽。給它麵的重量，兩樣都算好，還附上各種麵型的烹煮時間。',
      features: ['按你的麵量算水和鹽', '按麵型給出煮的時間', '要彈牙的話時間會調整', '煮麵水該拿來做什麼'],
    },
    coffee: {
      title: '咖啡粉水比計算器', desc: '咖啡和水的黃金比例', category: '飲品',
      metaTitle: '咖啡粉水比計算器 — 手沖、法式濾壓壺、冷萃',
      long: '手沖、法式濾壓壺、冷萃的粉水比各不相同，這裡都算得出來。定好想喝多少，它就告訴你要磨多少公克豆子。',
      features: ['各沖煮方式的比例', '從杯量反推豆量', '也可以反過來從豆量算起', '研磨粗細和萃取時間'],
    },
    'baking-pan': {
      title: '烤模尺寸換算', desc: '模具尺寸不一樣時，麵糊該怎麼調', category: '烘焙',
      metaTitle: '烤模尺寸換算 — 在不同模具之間調整麵糊量',
      long: '食譜寫的是 15 公分圓模，家裡只有 18 公分方模 —— 這裡算出麵糊該放大或縮小多少。它按面積比來算，所以深淺接近的模具直接照著做就對。',
      features: ['圓模、方模、吐司模按面積互換', '麵糊的倍率', '烘烤時間該怎麼跟著調', '常見模具尺寸的預設'],
    },
    storage: {
      title: '食品保存期限', desc: '放冷藏或冷凍能撐幾天', category: '保存',
      metaTitle: '食品保存對照表 — 冷藏與冷凍期限',
      long: '肉、魚、乳製品和熟食在冷藏和冷凍裡各能放多久，以及怎麼放才撐得久。既少扔掉還能吃的，也少吃到不該吃的。',
      features: ['每種食材的冷藏與冷凍期限', '保存的小訣竅', '哪些東西不該進冰箱', '按分類瀏覽'],
    },
  },
};

/**
 * 언어별 분류 순서. 여기 문자열은 위 category와 글자까지 같아야 한다.
 */
export const FOOD_CATEGORY_ORDER: Record<FoodIntlLang, string[]> = {
  en: ['Measuring', 'Heat', 'Drinks', 'Baking', 'Storage'],
  es: ['Medir', 'Calor', 'Bebidas', 'Repostería', 'Conservación'],
  'pt-br': ['Medir', 'Calor', 'Bebidas', 'Confeitaria', 'Conservação'],
  ja: ['計量', '加熱', '飲みもの', '焼き菓子', '保存'],
  de: ['Abmessen', 'Hitze', 'Getränke', 'Backen', 'Lagern'],
  fr: ['Mesurer', 'Chaleur', 'Boissons', 'Pâtisserie', 'Conservation'],
  hi: ['नाप', 'आँच', 'पेय', 'बेकिंग', 'भंडारण'],
  'zh-hans': ['计量', '加热', '饮品', '烘焙', '保存'],
  'zh-hant': ['計量', '加熱', '飲品', '烘焙', '保存'],
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

/** 라우트가 그대로 쓰는 메타데이터 — 문구를 라이브러리 한 곳에만 둔다 */
export function foodMetaIntl(lang: FoodIntlLang, slug: string) {
  const t = findFoodToolIntl(lang, slug);
  if (!t) throw new Error(`food-tools-intl: 도구가 없다 — ${slug}`);
  return {
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/food/${slug}`),
      languages: alternateLanguages10(`/food/${slug}`),
    },
  };
}

export function foodHubMetaIntl(lang: FoodIntlLang) {
  const ui = FOOD_SHELL_UI[lang];
  return {
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/food'),
      languages: alternateLanguages10('/food'),
    },
  };
}

/** 셸·허브 UI 문구 */
export const FOOD_SHELL_UI: Record<FoodIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Cooking tools',
    canDo: 'What this tool does', others: 'Other cooking tools',
    notice: '🍳 Numbers to start from — adjust to your own kitchen and taste.',
    footNote: 'Ovens, pans and ingredients all vary, so treat these as a starting point rather than an exact answer.',
    hubTitle: 'Cooking Tools — Cups to Grams, Oven Temp, Rice, Coffee',
    hubDesc: 'Free cooking tools: cups to grams by ingredient, recipe scaling, brine salinity, oven temperature, steak doneness, rice water, pasta water, coffee ratio, baking pans and food storage times.',
    hubLead: 'Numbers to start from — then adjust to your own kitchen.',
    hubFoot: 'Free cooking tools', eyebrow: 'Cooking',
  },
  es: {
    home: 'Inicio', section: 'Herramientas de cocina',
    canDo: 'Qué hace esta herramienta', others: 'Otras herramientas de cocina',
    notice: '🍳 Cifras de partida — ajústalas a tu cocina y a tu gusto.',
    footNote: 'Hornos, sartenes e ingredientes varían, así que tómalo como punto de partida y no como respuesta exacta.',
    hubTitle: 'Herramientas de cocina — Tazas a gramos, horno, arroz, café',
    hubDesc: 'Herramientas de cocina gratis: tazas a gramos por ingrediente, ajuste de raciones, salinidad de salmuera, temperatura del horno, punto de la carne, agua para el arroz, agua para la pasta, proporción de café, moldes y tiempos de conservación.',
    hubLead: 'Cifras de partida — luego ajusta a tu cocina.',
    hubFoot: 'Herramientas de cocina gratis', eyebrow: 'Cocina',
  },
  'pt-br': {
    home: 'Início', section: 'Ferramentas de cozinha',
    canDo: 'O que esta ferramenta faz', others: 'Outras ferramentas de cozinha',
    notice: '🍳 Números de partida — ajuste à sua cozinha e ao seu gosto.',
    footNote: 'Fornos, panelas e ingredientes variam, então trate isto como ponto de partida e não como resposta exata.',
    hubTitle: 'Ferramentas de cozinha — Xícaras para gramas, forno, arroz, café',
    hubDesc: 'Ferramentas de cozinha grátis: xícaras para gramas por ingrediente, ajuste de porções, salinidade da salmoura, temperatura do forno, ponto da carne, água do arroz, água da massa, proporção de café, formas e tempos de conservação.',
    hubLead: 'Números de partida — depois ajuste à sua cozinha.',
    hubFoot: 'Ferramentas de cozinha grátis', eyebrow: 'Cozinha',
  },
  ja: {
    home: 'ホーム', section: '料理ツール',
    canDo: 'このツールでできること', others: 'ほかの料理ツール',
    notice: '🍳 出発点になる数字です — 自分の台所と好みに合わせて調整してください。',
    footNote: 'オーブンも鍋も材料もそれぞれ違うので、正確な答えではなく目安として使ってください。',
    hubTitle: '料理ツール — カップをグラムに・オーブン温度・水加減・コーヒー',
    hubDesc: '無料の料理ツール：材料別のカップ→グラム換算、レシピの分量換算、塩分濃度、オーブン温度、ステーキの焼き加減、ご飯の水加減、パスタの湯量、コーヒーの比率、型のサイズ、食品の保存期間。',
    hubLead: 'まずはこの数字から — あとは自分の台所に合わせてください。',
    hubFoot: '無料の料理ツール', eyebrow: 'Cooking',
  },
  de: {
    home: 'Start', section: 'Küchenwerkzeuge',
    canDo: 'Was dieses Werkzeug macht', others: 'Weitere Küchenwerkzeuge',
    notice: '🍳 Startwerte — passe sie an deine Küche und deinen Geschmack an.',
    footNote: 'Öfen, Pfannen und Zutaten sind alle verschieden, nimm das also als Ausgangspunkt und nicht als exakte Antwort.',
    hubTitle: 'Küchenwerkzeuge — Cups in Gramm, Ofentemperatur, Reis, Kaffee',
    hubDesc: 'Kostenlose Küchenwerkzeuge: Cups in Gramm je Zutat, Portionen umrechnen, Salzlake, Backofentemperatur, Steak-Garstufen, Wassermenge für Reis, Pastawasser, Kaffeeverhältnis, Backformen und Haltbarkeit.',
    hubLead: 'Startwerte — den Rest passt du an deine Küche an.',
    hubFoot: 'Kostenlose Küchenwerkzeuge', eyebrow: 'Küche',
  },
  fr: {
    home: 'Accueil', section: 'Outils de cuisine',
    canDo: 'Ce que fait cet outil', others: 'Autres outils de cuisine',
    notice: '🍳 Des chiffres de départ — ajuste-les à ta cuisine et à ton goût.',
    footNote: 'Les fours, les poêles et les ingrédients varient : prends cela comme un point de départ, pas comme une réponse exacte.',
    hubTitle: 'Outils de cuisine — Tasses en grammes, four, riz, café',
    hubDesc: 'Outils de cuisine gratuits : tasses en grammes par ingrédient, ajustement des portions, salinité de la saumure, température du four, cuisson du steak, eau pour le riz, eau pour les pâtes, ratio café, moules et durées de conservation.',
    hubLead: 'Des chiffres de départ — ensuite tu ajustes à ta cuisine.',
    hubFoot: 'Outils de cuisine gratuits', eyebrow: 'Cuisine',
  },
  hi: {
    home: 'होम', section: 'रसोई उपकरण',
    canDo: 'यह उपकरण क्या करता है', others: 'अन्य रसोई उपकरण',
    notice: '🍳 शुरुआत के आँकड़े — अपनी रसोई और स्वाद के हिसाब से बदल लें।',
    footNote: 'ओवन, बर्तन और सामग्री सब अलग होते हैं, इसलिए इसे ठीक जवाब नहीं, शुरुआती बिंदु मानिए।',
    hubTitle: 'रसोई उपकरण — कप से ग्राम, ओवन तापमान, चावल, कॉफ़ी',
    hubDesc: 'मुफ़्त रसोई उपकरण: सामग्री के हिसाब से कप से ग्राम, रेसिपी की मात्रा, नमक के पानी की गणना, ओवन का तापमान, स्टेक का पकना, चावल में पानी, पास्ता का पानी, कॉफ़ी का अनुपात, बेकिंग टिन और भंडारण अवधि।',
    hubLead: 'शुरुआत के आँकड़े — आगे अपनी रसोई के हिसाब से बदल लें।',
    hubFoot: 'मुफ़्त रसोई उपकरण', eyebrow: 'रसोई',
  },
  'zh-hans': {
    home: '首页', section: '料理工具',
    canDo: '这个工具能做什么', others: '其他料理工具',
    notice: '🍳 这些是起步用的数字 —— 请照自己的厨房和口味再调。',
    footNote: '烤箱、锅具和食材各不相同，请把这些当成起点，而不是标准答案。',
    hubTitle: '料理工具 — 杯换克、烤箱温度、煮饭水量、咖啡比例',
    hubDesc: '免费的料理工具：按食材换算杯与克、食谱份量换算、盐水浓度、烤箱温度、牛排熟度、煮饭水量、意面煮水、咖啡粉水比、烤模尺寸和食品保存期限。',
    hubLead: '这些是起步用的数字 —— 再照自己的厨房调一调。',
    hubFoot: '免费料理工具', eyebrow: '料理',
  },
  'zh-hant': {
    home: '首頁', section: '料理工具',
    canDo: '這個工具能做什麼', others: '其他料理工具',
    notice: '🍳 這些是起步用的數字 —— 請照自己的廚房和口味再調。',
    footNote: '烤箱、鍋具和食材各不相同，請把這些當成起點，而不是標準答案。',
    hubTitle: '料理工具 — 杯換公克、烤箱溫度、煮飯水量、咖啡比例',
    hubDesc: '免費的料理工具：按食材換算杯與公克、食譜份量換算、鹽水濃度、烤箱溫度、牛排熟度、煮飯水量、義大利麵煮水、咖啡粉水比、烤模尺寸和食品保存期限。',
    hubLead: '這些是起步用的數字 —— 再照自己的廚房調一調。',
    hubFoot: '免費料理工具', eyebrow: '料理',
  },
};
