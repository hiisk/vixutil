/**
 * 단위 변환의 번역 문구.
 *
 * 계수(factor)는 여기 두지 않는다. 1인치는 어느 언어에서도 2.54cm이므로 숫자는
 * lib/convert-tools.ts 한 곳에만 있어야 한다 — 언어별로 복사하면 한쪽만 고쳐지는
 * 날이 반드시 온다. 여기에는 제목·설명·주의사항과 단위 표기만 둔다.
 *
 * 전통 단위는 그대로 옮기면 위험하다. 한국의 1근(600g)과 중국의 1斤(500g)은
 * 다른 값이고, 평(坪)은 일본·대만에서도 쓰지만 우리와 같은 3.3058㎡다.
 * 그런 차이는 note에 적어 둔다.
 */
import { CONVERT_EN2 } from './convert-i18n2.ts';
import { CONVERT_EN3 } from './convert-i18n3.ts';
import { CONVERT_ES } from './convert-l10n/es.ts';
import { CONVERT_PT_BR } from './convert-l10n/pt-br.ts';
import { CONVERT_JA } from './convert-l10n/ja.ts';
import { CONVERT_ZH_HANS } from './convert-l10n/zh-hans.ts';
import { CONVERT_ZH_HANT } from './convert-l10n/zh-hant.ts';
import { CONVERT_DE } from './convert-l10n/de.ts';
import { CONVERT_FR } from './convert-l10n/fr.ts';
import { CONVERT_HI } from './convert-l10n/hi.ts';
import type { AnyLocale, AnyLocale10 } from './locales.ts';

export interface ConvertL10n {
  title: string;
  desc: string;
  long: string;
  note: string;
  /** 단위 표기를 그 언어 관례로 바꿔야 할 때만 */
  from?: string;
  to?: string;
}

export const CONVERT_CATEGORY_EN: Record<string, string> = {
  '길이': 'Length', '무게': 'Weight', '부피': 'Volume', '넓이': 'Area',
  '온도': 'Temperature', '속도': 'Speed', '데이터': 'Data', '에너지': 'Energy', '압력·기타': 'Pressure & more',
  '시간': 'Time', '각도': 'Angle',
};

/**
 * 분류 이름의 열 언어 표.
 *
 * 열쇠는 lib/convert-tools.ts의 category 문자열 그대로다 — 한 글자만 달라도 그 묶음이
 * 허브에서 조용히 사라진다(라벨이 빈 문자열이 되는 게 아니라 그룹이 안 잡힌다).
 */
export const CONVERT_CATEGORY: Record<AnyLocale10, Record<string, string>> = {
  ko: {
    '길이': '길이', '무게': '무게', '부피': '부피', '넓이': '넓이', '온도': '온도',
    '속도': '속도', '데이터': '데이터', '에너지': '에너지', '압력·기타': '압력·기타',
    '시간': '시간', '각도': '각도',
  },
  en: CONVERT_CATEGORY_EN,
  es: {
    '길이': 'Longitud', '무게': 'Peso', '부피': 'Volumen', '넓이': 'Superficie', '온도': 'Temperatura',
    '속도': 'Velocidad', '데이터': 'Datos', '에너지': 'Energía', '압력·기타': 'Presión y más',
    '시간': 'Tiempo', '각도': 'Ángulo',
  },
  'pt-br': {
    '길이': 'Comprimento', '무게': 'Peso', '부피': 'Volume', '넓이': 'Área', '온도': 'Temperatura',
    '속도': 'Velocidade', '데이터': 'Dados', '에너지': 'Energia', '압력·기타': 'Pressão e mais',
    '시간': 'Tempo', '각도': 'Ângulo',
  },
  ja: {
    '길이': '長さ', '무게': '重さ', '부피': '体積', '넓이': '面積', '온도': '温度',
    '속도': '速さ', '데이터': 'データ', '에너지': 'エネルギー', '압력·기타': '圧力・その他',
    '시간': '時間', '각도': '角度',
  },
  de: {
    '길이': 'Länge', '무게': 'Gewicht', '부피': 'Volumen', '넓이': 'Fläche', '온도': 'Temperatur',
    '속도': 'Geschwindigkeit', '데이터': 'Daten', '에너지': 'Energie', '압력·기타': 'Druck und mehr',
    '시간': 'Zeit', '각도': 'Winkel',
  },
  fr: {
    '길이': 'Longueur', '무게': 'Poids', '부피': 'Volume', '넓이': 'Surface', '온도': 'Température',
    '속도': 'Vitesse', '데이터': 'Données', '에너지': 'Énergie', '압력·기타': 'Pression et autres',
    '시간': 'Temps', '각도': 'Angle',
  },
  hi: {
    '길이': 'लंबाई', '무게': 'वज़न', '부피': 'आयतन', '넓이': 'क्षेत्रफल', '온도': 'तापमान',
    '속도': 'गति', '데이터': 'डेटा', '에너지': 'ऊर्जा', '압력·기타': 'दबाव और अन्य',
    '시간': 'समय', '각도': 'कोण',
  },
  'zh-hans': {
    '길이': '长度', '무게': '重量', '부피': '体积', '넓이': '面积',
    '온도': '温度', '속도': '速度', '데이터': '数据', '에너지': '能量', '압력·기타': '压力·其他',
    '시간': '时间', '각도': '角度',
  },
  'zh-hant': {
    '길이': '長度', '무게': '重量', '부피': '體積', '넓이': '面積',
    '온도': '溫度', '속도': '速度', '데이터': '資料', '에너지': '能量', '압력·기타': '壓力·其他',
    '시간': '時間', '각도': '角度',
  },
};

const CONVERT_EN_1: Record<string, ConvertL10n> = {
  'cm-inch': {
    title: 'cm to Inches', desc: 'Convert centimeters and inches both ways',
    long: 'Convert centimeters to inches and back. Useful for screen sizes, clothing measurements and wheel diameters that are labeled in inches.',
    note: 'One inch is defined as exactly 2.54 cm. A monitor’s "inches" measure the diagonal, not the width.',
  },
  'm-feet': {
    title: 'Meters to Feet', desc: 'Convert meters and feet both ways',
    long: 'Convert meters to feet and back. Comes up with aircraft altitude, building height and property listings abroad.',
    note: 'One foot is exactly 0.3048 m. The "35,000 feet" in a cabin announcement is about 10.7 km.',
  },
  'km-mile': {
    title: 'Kilometers to Miles', desc: 'Convert km and miles both ways',
    long: 'Convert kilometers to miles and back. For road signs abroad, running and cycling logs, and car odometers.',
    note: 'One mile is 1.609344 km. A marathon (42.195 km) is about 26.2 miles; a half is about 13.1 miles.',
  },
  'mm-inch': {
    title: 'mm to Inches', desc: 'Convert millimeters and inches',
    long: 'Convert millimeters to inches and back. Screws, tools and hardware are often specified in inches.',
    note: 'A 1/2 inch is 12.7 mm and 3/8 inch is 9.525 mm. Imperial and metric threads do not fit each other.',
  },
  'yard-m': {
    title: 'Yards to Meters', desc: 'Golf and field distances',
    long: 'Convert yards to meters and back. Golf courses and American football use yards, so this is how you picture the real distance.',
    note: 'One yard is exactly 0.9144 m. A 200-yard shot is about 183 m — mixing the two changes your club choice.',
  },
  'nautical-mile-km': {
    title: 'Nautical Miles to km', desc: 'Distances at sea and in the air',
    long: 'Convert nautical miles to kilometers and back. Ships, aircraft and territorial waters are measured in nautical miles.',
    note: 'One nautical mile is exactly 1.852 km — originally one minute of latitude. A 12-nautical-mile limit is about 22 km.',
  },
  'foot-cm': {
    title: 'Feet to cm', desc: 'Height in feet and centimeters',
    long: 'Convert feet to centimeters and back. Handy when a form asks for your height in feet and inches.',
    note: 'Height is usually written like 5′9″. Five feet nine inches is 175.3 cm.',
  },
  'micron-mm': {
    title: 'Microns to mm', desc: 'Very small lengths',
    long: 'Convert micrometers (microns) to millimeters and back. Used for filter ratings, plating thickness and particulate sizes.',
    note: 'A human hair is about 70 µm thick. PM10 means particles under 10 µm; PM2.5 means under 2.5 µm.',
  },
  'ri-km': {
    title: 'Ri (里) to km', desc: 'A traditional East Asian distance unit',
    long: 'Convert the traditional Korean ri to kilometers. Old sayings and place names still use it.',
    note: 'In late-Joseon Korea one ri was about 392.7 m — so "ten ri" is roughly 3.9 km. The Chinese li (500 m) and Japanese ri (3.9 km) are different units with the same character.',
    from: 'ri',
  },
  'ja-cm': {
    title: 'Ja (자/尺) to cm', desc: 'A traditional Korean length unit',
    long: 'Convert the Korean ja (chi/shaku family) to centimeters. Still used for fabric, traditional furniture and bedding sizes.',
    note: 'One ja is about 30.3 cm. The separate cloth-measuring ja used in Korean markets is about 55 cm, so ask which one is meant.',
    from: 'ja',
  },
  'kg-lb': {
    title: 'kg to Pounds', desc: 'Body weight and luggage limits',
    long: 'Convert kilograms to pounds and back. For airline baggage limits, gym plates and weight given in pounds.',
    note: 'One pound is exactly 0.45359237 kg. A 23 kg bag is about 50.7 lb, which already exceeds a 50 lb limit.',
  },
  'g-oz': {
    title: 'Grams to Ounces', desc: 'Small weights',
    long: 'Convert grams to ounces and back. Comes up in recipes, cosmetics and postage.',
    note: 'One ounce is 28.3495 g. A fluid ounce (fl oz) measures volume and is a different unit entirely.',
  },
  'ton-kg': {
    title: 'Tonnes to kg', desc: 'Large weights',
    long: 'Convert metric tonnes to kilograms and back. For cargo capacity, vehicle weight ratings and building materials.',
    note: 'This is the metric tonne (1,000 kg). A US short ton is 907 kg and a UK long ton is 1,016 kg — check which one a source means.',
  },
  'don-g': {
    title: 'Don (돈) to Grams', desc: 'Korean unit for gold and silver',
    long: 'Convert the Korean don to grams. Gold is quoted per gram, so you need this to price gold bought by the don.',
    note: 'One don is 3.75 g. A baby’s first-birthday gold ring is traditionally one don; ten don make one nyang (37.5 g).',
    from: 'don',
  },
  'nyang-g': {
    title: 'Nyang (냥) to Grams', desc: 'Ten don make one nyang',
    long: 'Convert the Korean nyang to grams. Still used at jewellers and in herbal medicine.',
    note: 'One Korean nyang is 37.5 g. The Chinese/Hong Kong tael (also 兩) is about 37.8 g — close but not identical.',
    from: 'nyang',
  },
  'geun-g': {
    title: 'Geun (근) to Grams', desc: 'Korean market unit for meat',
    long: 'Convert the Korean geun to grams. Butchers and markets still price by the geun.',
    note: 'A geun of meat is 600 g, but a geun of vegetables is 375 g. The Chinese jin (斤) is 500 g — the same character, a different weight.',
    from: 'geun',
  },
  'kwan-kg': {
    title: 'Kwan (관) to kg', desc: 'Wholesale unit for produce and seafood',
    long: 'Convert the Korean kwan to kilograms. Used at wholesale fish and produce markets.',
    note: 'One kwan is 3.75 kg, equal to one hundred don. The Korean series don → nyang → geun → kwan each step up by about ten.',
    from: 'kwan',
  },
  'carat-g': {
    title: 'Carats to Grams', desc: 'Gemstone weight',
    long: 'Convert carats to grams and back. Diamonds are priced by carat, so this is how you picture the actual size.',
    note: 'One carat is exactly 0.2 g. Gold purity is also called karat (K) but that is a completely different measure.',
  },
  'stone-kg': {
    title: 'Stone to kg', desc: 'British body-weight unit',
    long: 'Convert stone to kilograms and back. British sources still give body weight in stone.',
    note: 'One stone is 14 pounds, about 6.35 kg. "Eleven stone" is roughly 70 kg.',
  },
  'l-gallon': {
    title: 'Liters to Gallons', desc: 'Fuel and beverage volume',
    long: 'Convert liters to US gallons and back. For fuel prices abroad and imported product sizes.',
    note: 'A US gallon is 3.785 L but an imperial (UK) gallon is 4.546 L — a 20% difference. This page uses US gallons.',
  },
  'ml-floz': {
    title: 'mL to Fluid Ounces', desc: 'Recipes and cosmetics',
    long: 'Convert milliliters to US fluid ounces and back. Common on imported cosmetics, drinks and in recipes.',
    note: 'A US fluid ounce is 29.57 mL. Do not confuse it with the weight ounce (28.35 g).',
  },
  'doe-l': {
    title: 'Doe (되) to Liters', desc: 'Traditional Korean grain measure',
    long: 'Convert the Korean doe to liters. Rice, beans and sesame oil are still sold by the doe in some markets.',
    note: 'One doe is about 1.8 L. A doe of rice weighs roughly 1.6 kg, but weight varies with the grain.',
    from: 'doe',
  },
  'mal-l': {
    title: 'Mal (말) to Liters', desc: 'Ten doe make one mal',
    long: 'Convert the Korean mal to liters. Used for rice, makgeolli and salted seafood.',
    note: 'One mal is ten doe, about 18 L. A mal of rice weighs around 16 kg.',
    from: 'mal',
  },
  'cup-ml': {
    title: 'Cups to mL', desc: 'Cooking cup measures',
    long: 'Convert cups to milliliters and back. Recipe "cups" differ by country, so check which one you are following.',
    note: 'A Korean cup is 200 mL, a US cup is 240 mL and a metric cup is 250 mL. This page uses the Korean 200 mL cup.',
    from: 'cup',
  },
  'barrel-l': {
    title: 'Barrels to Liters', desc: 'Crude oil volume',
    long: 'Convert oil barrels to liters and back, so "dollars per barrel" in the news becomes a real quantity.',
    note: 'One oil barrel is 158.987 L (42 US gallons). Beer and other barrels hold different amounts.',
  },
  'cubicm-l': {
    title: 'Cubic Meters to Liters', desc: 'Water and gas bills',
    long: 'Convert cubic meters to liters and back. Water and gas are billed per cubic meter.',
    note: 'One cubic meter is exactly 1,000 L. A household of four uses roughly 20 m³ of water a month.',
  },
  'pyeong-m2': {
    title: 'Pyeong (평) to m²', desc: 'Korean floor-area unit',
    long: 'Convert pyeong to square meters and back. Korean listings are legally in square meters but everyone still talks in pyeong.',
    note: 'One pyeong is about 3.3058 m², so an "84 m²" apartment is roughly 25.4 pyeong. The same unit is the Japanese tsubo and Taiwanese ping.',
    from: 'pyeong',
  },
  'm2-sqft': {
    title: 'm² to Square Feet', desc: 'Property area abroad',
    long: 'Convert square meters to square feet and back. Overseas listings and office leases are quoted in square feet.',
    note: 'One m² is about 10.76 sq ft. A "500 sqft" studio is about 46 m².',
  },
  'acre-m2': {
    title: 'Acres to m²', desc: 'Land area',
    long: 'Convert acres to square meters and back. Farmland and lots abroad are measured in acres.',
    note: 'One acre is about 4,047 m². A football (soccer) pitch is roughly 1.8 acres.',
  },
  'hectare-m2': {
    title: 'Hectares to m²', desc: 'Forest and farmland area',
    long: 'Convert hectares to square meters and back. Wildfire damage, farm size and park area are reported in hectares.',
    note: 'One hectare is 10,000 m² (100 m × 100 m). A football pitch is about 0.7 hectares.',
  },
  'danbo-m2': {
    title: 'Danbo (단보) to m²', desc: 'Korean farmland unit',
    long: 'Convert the Korean danbo to square meters. Still used in land deals and crop statistics.',
    note: 'One danbo is 300 pyeong, about 991.7 m². Ten danbo make one jeongbo, close to a hectare.',
    from: 'danbo',
  },
  'majigi-pyeong': {
    title: 'Majigi (마지기) to Pyeong', desc: 'Korean rice-paddy unit',
    long: 'Convert majigi to pyeong. It is still the most common way to talk about paddy size in Korea.',
    note: 'A paddy majigi is usually 200 pyeong but ranges from 150 to 300 by region, and a field majigi is often 100 pyeong.',
    from: 'majigi',
    to: 'pyeong',
  },
  'celsius-fahrenheit': {
    title: 'Celsius to Fahrenheit', desc: 'Temperature both ways',
    long: 'Convert Celsius to Fahrenheit and back. For weather abroad and oven temperatures in foreign recipes.',
    note: 'Fahrenheit = Celsius × 1.8 + 32. Water freezes at 32 °F and boils at 212 °F; body temperature 36.5 °C is 97.7 °F.',
    from: '°C',
    to: '°F',
  },
  'celsius-kelvin': {
    title: 'Celsius to Kelvin', desc: 'Absolute temperature',
    long: 'Convert Celsius to Kelvin and back. Used in science and for light colour temperature.',
    note: 'Kelvin is Celsius plus 273.15. Nothing is colder than 0 K (−273.15 °C).',
    from: '°C',
  },
  'kmh-mph': {
    title: 'km/h to mph', desc: 'Vehicle speed',
    long: 'Convert km/h to mph and back. For speed limits abroad and imported dashboards.',
    note: 'A US highway 65 mph is about 105 km/h. If your rental car reads in mph, it is easy to speed without noticing.',
  },
  'ms-kmh': {
    title: 'm/s to km/h', desc: 'Wind speed and pace',
    long: 'Convert meters per second to km/h and back. Weather services report wind in m/s, which is hard to feel.',
    note: 'Multiply m/s by 3.6 to get km/h. A 17 m/s wind (typhoon threshold) is 61 km/h; 30 m/s is 108 km/h.',
  },
  'knot-kmh': {
    title: 'Knots to km/h', desc: 'Ships and aircraft',
    long: 'Convert knots to km/h and back. Used for vessels, aircraft and marine wind forecasts.',
    note: 'One knot is 1.852 km/h — one nautical mile per hour. Airliners cruise near 470 knots, about 870 km/h.',
  },
  'mach-kmh': {
    title: 'Mach to km/h', desc: 'Multiples of the speed of sound',
    long: 'Convert Mach numbers to km/h and back, so supersonic figures become real speeds.',
    note: 'Mach 1 is about 1,225 km/h at sea level and 15 °C. The speed of sound falls with temperature, so Mach 1 is slower at altitude.',
  },
  'mb-gb': {
    title: 'MB to GB', desc: 'File size',
    long: 'Convert megabytes to gigabytes and back. For file sizes, data caps and storage.',
    note: 'This page uses 1 GB = 1,024 MB (binary). Drive makers count 1 GB as 1,000 MB, which is why a 1 TB SSD shows as 931 GB.',
  },
  'gb-tb': {
    title: 'GB to TB', desc: 'Storage capacity',
    long: 'Convert gigabytes to terabytes and back when comparing drives and cloud plans.',
    note: 'Uses 1 TB = 1,024 GB (binary). The advertised capacity uses 1,000, so the number your computer shows is smaller.',
  },
  'mbps-mbs': {
    title: 'Mbps to MB/s', desc: 'What your connection really downloads',
    long: 'Convert the Mbps your provider advertises into real download speed in MB/s. The 8× gap causes a lot of "my internet is slow" confusion.',
    note: 'Lowercase b is bits, uppercase B is bytes, and one byte is eight bits. A 100 Mbps line tops out at 12.5 MB/s.',
  },
  'kb-mb': {
    title: 'KB to MB', desc: 'Small file sizes',
    long: 'Convert kilobytes to megabytes and back, most often to check an attachment limit.',
    note: 'Uses 1 MB = 1,024 KB. A common 25 MB email limit is 25,600 KB.',
  },
  'byte-bit': {
    title: 'Bytes to Bits', desc: 'The smallest data units',
    long: 'Convert bytes to bits and back. Network speed is counted in bits while file size is counted in bytes.',
    note: 'One byte is eight bits. A Latin character takes one byte; a Korean or Chinese character takes three in UTF-8.',
  },
  'kcal-kj': {
    title: 'Calories to Kilojoules', desc: 'Food energy',
    long: 'Convert kilocalories to kilojoules and back. European and Australian labels use kilojoules.',
    note: 'One kcal is 4.184 kJ, so a 2,000 kcal daily intake is about 8,368 kJ. The "calories" on a label are really kilocalories.',
  },
  'kw-hp': {
    title: 'kW to Horsepower', desc: 'Engine and motor output',
    long: 'Convert kilowatts to horsepower and back. EVs are rated in kW while combustion cars are quoted in horsepower.',
    note: 'This page uses metric horsepower (PS): 1 kW = 1.36 PS. Mechanical horsepower (HP) is 1 kW = 1.341 HP.',
  },
  'kwh-mj': {
    title: 'kWh to Megajoules', desc: 'Electric energy',
    long: 'Convert kilowatt-hours to megajoules and back to compare electricity with other energy sources.',
    note: 'One kWh is 3.6 MJ. A household using 300 kWh a month uses about 1,080 MJ.',
  },
  'joule-cal': {
    title: 'Joules to Calories', desc: 'Basic energy units',
    long: 'Convert joules to calories and back, bridging physics problems and nutrition labels.',
    note: 'One calorie is 4.184 J — the heat to raise 1 g of water by 1 °C. A food "Calorie" is 1,000 of these.',
  },
  'bar-psi': {
    title: 'bar to psi', desc: 'Tire pressure',
    long: 'Convert bar to psi and back. Tire pressure is given in either unit depending on the country and maker.',
    note: 'Passenger cars usually run 2.2–2.5 bar (32–36 psi). The sticker inside the driver’s door is the authority.',
  },
  'hpa-mmhg': {
    title: 'hPa to mmHg', desc: 'Atmospheric pressure',
    long: 'Convert hectopascals to millimeters of mercury and back. Forecasts use hPa while blood-pressure cuffs use mmHg.',
    note: 'Standard pressure is 1,013 hPa (760 mmHg). A typhoon below 950 hPa at the centre is very strong.',
  },
  'mpg-kmpl': {
    title: 'mpg to km/L', desc: 'Fuel economy',
    long: 'Convert US miles per gallon to km/L and back when reading car reviews from abroad.',
    note: 'Uses US gallons: 30 mpg is about 12.8 km/L. UK mpg figures run roughly 20% higher, so check the source.',
  },
};


/* 둘째 묶음 50종을 합친다 — 파일을 나눠 두지 않으면 무엇이 빠졌는지 안 보인다 */
export const CONVERT_EN: Record<string, ConvertL10n> = { ...CONVERT_EN_1, ...CONVERT_EN2, ...CONVERT_EN3 };

/**
 * 언어별 사전을 한 표로 모은다.
 *
 * 영어만 있을 때는 화면에서 `lang === 'en' ? CONVERT_EN[slug] : undefined`로 됐지만
 * 일곱 언어가 되면 그 삼항이 일곱 겹이 된다. 언어를 늘릴 때 고칠 곳은 여기 한 줄로 둔다.
 *
 * 파일을 언어마다 나눈 이유는 100종이 한 파일에 들어가면 무엇이 빠졌는지 안 보이기
 * 때문이다. 빠진 항목은 아래 convertL10n()이 조용히 한국어로 되돌린다 — 화면이
 * 깨지지는 않지만 한글이 섞이므로, tests/convert-tools.ts가 누락을 잡는다.
 */
export const CONVERT_L10N: Record<Exclude<AnyLocale10, 'ko'>, Record<string, ConvertL10n>> = {
  en: CONVERT_EN,
  es: CONVERT_ES,
  'pt-br': CONVERT_PT_BR,
  ja: CONVERT_JA,
  de: CONVERT_DE,
  fr: CONVERT_FR,
  hi: CONVERT_HI,
  'zh-hans': CONVERT_ZH_HANS,
  'zh-hant': CONVERT_ZH_HANT,
};

/** 그 언어의 문구. 한국어이거나 항목이 없으면 undefined — 부르는 쪽이 원본으로 되돌린다. */
export function convertL10n(slug: string, lang: AnyLocale10): ConvertL10n | undefined {
  return lang === 'ko' ? undefined : CONVERT_L10N[lang]?.[slug];
}
