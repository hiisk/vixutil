/**
 * 단위 변환의 영어·중국어 문구.
 *
 * 계수(factor)는 여기 두지 않는다. 1인치는 어느 언어에서도 2.54cm이므로 숫자는
 * lib/convert-tools.ts 한 곳에만 있어야 한다 — 언어별로 복사하면 한쪽만 고쳐지는
 * 날이 반드시 온다. 여기에는 제목·설명·주의사항과 단위 표기만 둔다.
 *
 * 전통 단위는 그대로 옮기면 위험하다. 한국의 1근(600g)과 중국의 1斤(500g)은
 * 다른 값이고, 평(坪)은 일본·대만에서도 쓰지만 우리와 같은 3.3058㎡다.
 * 그런 차이는 note에 적어 둔다.
 */
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
};

export const CONVERT_CATEGORY_ZH: Record<string, string> = {
  '길이': '长度', '무게': '重量', '부피': '体积', '넓이': '面积',
  '온도': '温度', '속도': '速度', '데이터': '数据', '에너지': '能量', '압력·기타': '压力及其他',
};

export const CONVERT_EN: Record<string, ConvertL10n> = {
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

export const CONVERT_ZH: Record<string, ConvertL10n> = {
  'cm-inch': {
    title: '厘米换算英寸', desc: '厘米与英寸双向换算',
    long: '厘米与英寸互相换算。显示器尺寸、衣服尺码、轮径等以英寸标注的场合都用得上。',
    note: '1英寸精确等于2.54厘米。显示器的"英寸"指的是对角线长度，不是宽度。',
  },
  'm-feet': {
    title: '米换算英尺', desc: '米与英尺双向换算',
    long: '米与英尺互相换算。飞机高度、建筑高度、海外房产标注中经常出现。',
    note: '1英尺精确等于0.3048米。机舱广播里的"三万五千英尺"约为10.7公里。',
  },
  'km-mile': {
    title: '公里换算英里', desc: '公里与英里双向换算',
    long: '公里与英里互相换算。海外路牌、跑步骑行记录、汽车里程表都会用到。',
    note: '1英里为1.609344公里。马拉松42.195公里约26.2英里，半马约13.1英里。',
  },
  'mm-inch': {
    title: '毫米换算英寸', desc: '毫米与英寸双向换算',
    long: '毫米与英寸互相换算。螺丝、工具、零件规格常以英寸标注，需要对照实际尺寸。',
    note: '常见的1/2英寸为12.7毫米，3/8英寸为9.525毫米。英制与公制螺纹不能互换。',
  },
  'yard-m': {
    title: '码换算米', desc: '高尔夫与球场距离',
    long: '码与米互相换算。高尔夫球场和美式橄榄球使用码，换成米才好判断实际距离。',
    note: '1码精确等于0.9144米。200码约183米，与以米标注的球场混淆会选错球杆。',
  },
  'nautical-mile-km': {
    title: '海里换算公里', desc: '海上与空中的距离单位',
    long: '海里与公里互相换算。船舶、飞机的航程以及领海范围都用海里表示。',
    note: '1海里精确等于1.852公里，源自地球纬度1分的长度。12海里领海约22公里。',
  },
  'foot-cm': {
    title: '英尺换算厘米', desc: '身高换算',
    long: '英尺与厘米互相换算。海外表格中需要以英尺和英寸填写身高时使用。',
    note: '身高通常写作5′9″这样的形式。5英尺9英寸为175.3厘米。',
  },
  'micron-mm': {
    title: '微米换算毫米', desc: '极小的长度单位',
    long: '微米与毫米互相换算。滤网精度、镀层厚度、颗粒物大小都以微米表示。',
    note: '头发直径约70微米。PM10指10微米以下颗粒，PM2.5指2.5微米以下。',
  },
  'ri-km': {
    title: '韩里换算公里', desc: '韩国传统距离单位',
    long: '把韩国传统距离单位"리(里)"换算成公里。谚语和地名中至今保留。',
    note: '朝鲜后期1리约392.7米，"十里"约3.9公里。请注意：中国的1里为500米，日本的1里约3.9公里 — 同一个汉字，长度完全不同。',
    from: '里(韩)',
  },
  'ja-cm': {
    title: '韩尺换算厘米', desc: '韩国传统长度单位',
    long: '把韩国的"자(尺)"换算成厘米。韩服面料、传统家具、被褥尺寸仍在使用。',
    note: '1자约30.3厘米，与中国市尺(33.3厘米)、日本尺(30.3厘米)略有不同。韩国布匹专用的布尺约55厘米，需先确认是哪一种。',
    from: '尺(韩)',
  },
  'kg-lb': {
    title: '公斤换算磅', desc: '体重与行李重量',
    long: '公斤与磅互相换算。航空行李限额、健身器械配重、以磅表示的体重都用得上。',
    note: '1磅精确等于0.45359237公斤。23公斤行李约50.7磅，在限重50磅的航空公司已经超重。',
  },
  'g-oz': {
    title: '克换算盎司', desc: '较小的重量单位',
    long: '克与盎司互相换算。海外食谱、化妆品容量、邮费计算中常见。',
    note: '1盎司为28.3495克。计量液体的液量盎司(fl oz)是体积单位，与此完全不同。',
  },
  'ton-kg': {
    title: '吨换算公斤', desc: '较大的重量单位',
    long: '吨与公斤互相换算。货物载重、车辆总重、建材重量都用得上。',
    note: '这里的吨指1,000公斤的公吨。美制短吨为907公斤，英制长吨为1,016公斤，需确认来源。',
  },
  'don-g': {
    title: '돈(钱)换算克', desc: '韩国金银重量单位',
    long: '把韩国金银重量单位"돈"换算成克。金价按克报价，所以按돈购买的黄金需要换算才能算出价值。',
    note: '1돈为3.75克。周岁金戒指传统上是一돈，十돈为一냥(37.5克)。这与中国市制的"钱"(5克)不同。',
    from: '돈(钱)',
  },
  'nyang-g': {
    title: '냥(两)换算克', desc: '十돈为一냥',
    long: '把韩国的"냥"换算成克。金店计算金银重量、韩药材配方中至今仍在使用这个单位。',
    note: '韩国1냥为37.5克。请注意：中国大陆的1两为50克，香港的1两约37.8克 — 同一个汉字，重量各不相同。',
    from: '냥(两)',
  },
  'geun-g': {
    title: '근(斤)换算克', desc: '韩国市场的肉类计量单位',
    long: '把韩国的"근"换算成克。肉铺和传统市场仍按근计价。',
    note: '韩国肉类1근为600克，蔬菜水果1근为375克。中国的1斤是500克 — 同一个汉字，重量不同，购物时务必确认。',
    from: '근(斤)',
  },
  'kwan-kg': {
    title: '관(贯)换算公斤', desc: '农水产批发单位',
    long: '把韩国的"관"换算成公斤。水产、农产品批发市场仍在使用。',
    note: '1관为3.75公斤，相当于一百돈。韩国重量单位돈→냥→근→관依次约十倍递增。',
    from: '관(贯)',
  },
  'carat-g': {
    title: '克拉换算克', desc: '宝石重量',
    long: '把宝石重量单位克拉换算成克。钻石按克拉定价，换算后更容易想象实际大小。',
    note: '1克拉精确等于0.2克。表示黄金纯度的K金与此是完全不同的概念。',
  },
  'stone-kg': {
    title: '英石换算公斤', desc: '英国的体重单位',
    long: '把英国用来表示体重的英石(stone)换算成公斤。英国新闻和影视作品中常出现。',
    note: '1英石为14磅，约6.35公斤。"11英石"约为70公斤。',
  },
  'l-gallon': {
    title: '升换算加仑', desc: '燃油与饮料容量',
    long: '升与美制加仑互相换算。海外加油站价格、进口商品容量都用得上。',
    note: '美制加仑为3.785升，英制加仑为4.546升，相差20%。本页按美制加仑计算。',
  },
  'ml-floz': {
    title: '毫升换算液量盎司', desc: '食谱与化妆品',
    long: '毫升与美制液量盎司互相换算。进口化妆品、饮料容量和海外食谱中常见。',
    note: '美制液量盎司为29.57毫升。不要与重量单位盎司(28.35克)混淆。',
  },
  'doe-l': {
    title: '되(升)换算公升', desc: '韩国传统谷物计量单位',
    long: '把韩国的"되"换算成公升。部分市场至今按되出售大米、豆类和香油。',
    note: '1되约1.8公升。一되大米约1.6公斤，不同谷物密度不同重量也不同。中国的市升(1公升)与此不同。',
    from: '되(升)',
  },
  'mal-l': {
    title: '말(斗)换算公升', desc: '十되为一말',
    long: '把韩国的"말"换算成公升。大米、马格利酒、酱菜的交易中使用。',
    note: '1말为十되，约18公升。一말大米约16公斤。中国的市斗(10公升)与此不同。',
    from: '말(斗)',
  },
  'cup-ml': {
    title: '杯换算毫升', desc: '烘焙量杯单位',
    long: '量杯与毫升互相换算。食谱里的"一杯"因国家而异，需先确认来源。',
    note: '韩国量杯为200毫升，美国为240毫升，公制量杯为250毫升。本页按韩国200毫升计算。',
    from: '杯',
  },
  'barrel-l': {
    title: '桶换算公升', desc: '原油交易单位',
    long: '把原油交易单位"桶"换算成公升。新闻里的"每桶多少美元"就有了实感。',
    note: '原油1桶为158.987公升(42美制加仑)。啤酒桶等其他桶容量不同，不可混用。',
  },
  'cubicm-l': {
    title: '立方米换算公升', desc: '水费与燃气费的㎥',
    long: '立方米与公升互相换算。自来水和燃气按立方米计费，换算后才知道实际用量。',
    note: '1立方米精确等于1,000公升。四口之家每月用水量大约20立方米。',
  },
  'pyeong-m2': {
    title: '평(坪)换算平方米', desc: '韩国住宅面积单位',
    long: '把"평"换算成平方米。韩国房产法定以平方米标注，但人们仍习惯用평交谈。',
    note: '1평约3.3058平方米，"84㎡"的公寓约25.4평。这与台湾的"坪"、日本的"坪"是同一单位。',
    from: '평(坪)',
  },
  'm2-sqft': {
    title: '平方米换算平方英尺', desc: '海外房产面积',
    long: '平方米与平方英尺互相换算。海外房产和写字楼租赁多以平方英尺标注。',
    note: '1平方米约10.76平方英尺。"500 sqft"的公寓约46平方米。',
  },
  'acre-m2': {
    title: '英亩换算平方米', desc: '土地面积',
    long: '英亩与平方米互相换算。海外农地和地块面积以英亩标注。',
    note: '1英亩约4,047平方米。一个标准足球场约1.8英亩。',
  },
  'hectare-m2': {
    title: '公顷换算平方米', desc: '林地与农地面积',
    long: '公顷与平方米互相换算。山火受灾面积、农场规模、公园大小都以公顷发布。',
    note: '1公顷为10,000平方米(100米×100米)，约15亩。一个足球场约0.7公顷。',
  },
  'danbo-m2': {
    title: '단보(段步)换算平方米', desc: '韩国农地单位',
    long: '把韩国农地单位"단보"换算成平方米。土地交易和产量统计中仍在使用。',
    note: '1단보为300평，约991.7平方米。十단보为1정보，接近1公顷。',
    from: '단보(段步)',
  },
  'majigi-pyeong': {
    title: '마지기换算평', desc: '韩国水田面积单位',
    long: '把"마지기"换算成평。这是韩国谈论农田面积时最常用的单位。',
    note: '水田一마지기通常为200평，但各地区从150평到300평不等；旱田一마지기多为100평。',
    from: '마지기(斗落)',
    to: '평(坪)',
  },
  'celsius-fahrenheit': {
    title: '摄氏换算华氏', desc: '温度双向换算',
    long: '摄氏与华氏互相换算。海外天气预报和外国食谱的烤箱温度都用得上。',
    note: '华氏 = 摄氏 × 1.8 + 32。水在32℉结冰、212℉沸腾，体温36.5℃为97.7℉。',
    from: '°C',
    to: '°F',
  },
  'celsius-kelvin': {
    title: '摄氏换算开尔文', desc: '绝对温度',
    long: '摄氏与开尔文互相换算。科学计算、照明色温以及气象数据中都会用到绝对温度。',
    note: '开尔文等于摄氏加273.15。0K为绝对零度(−273.15℃)，不存在更低的温度。',
    from: '°C',
  },
  'kmh-mph': {
    title: '公里每小时换算英里每小时', desc: '车速单位',
    long: '公里每小时与英里每小时互相换算。海外限速标志和进口车仪表盘都用得上。',
    note: '美国高速公路的65 mph约105 km/h。租车仪表若以mph显示，很容易不知不觉超速。',
  },
  'ms-kmh': {
    title: '米每秒换算公里每小时', desc: '风速与配速',
    long: '米每秒与公里每小时互相换算。气象部门以米每秒发布风速，换算后更容易体会强度。',
    note: '米每秒乘3.6即为公里每小时。台风标准17 m/s为61 km/h，30 m/s为108 km/h。',
  },
  'knot-kmh': {
    title: '节换算公里每小时', desc: '船舶与飞机速度',
    long: '节与公里每小时互相换算。船舶、飞机速度以及海上风速预报中使用。',
    note: '1节为每小时1.852公里(每小时一海里)。客机巡航约470节，即约870 km/h。',
  },
  'mach-kmh': {
    title: '马赫换算公里每小时', desc: '音速的倍数',
    long: '马赫数与公里每小时互相换算，超音速的数字就有了实感。',
    note: '海平面15℃时马赫1约为1,225 km/h。音速随气温下降，高空的马赫1实际速度更慢。',
  },
  'mb-gb': {
    title: 'MB换算GB', desc: '文件容量单位',
    long: '兆字节与吉字节互相换算。文件大小、流量套餐、存储空间比较时使用。',
    note: '本页按1GB = 1,024MB(二进制)计算。硬盘厂商按1,000MB计，所以1TB固态硬盘在电脑上显示为931GB。',
  },
  'gb-tb': {
    title: 'GB换算TB', desc: '存储容量单位',
    long: '吉字节与太字节互相换算。比较硬盘、固态硬盘和云存储容量时使用。',
    note: '按1TB = 1,024GB(二进制)计算。标称容量按1,000计，因此实际显示会偏小，这是正常现象。',
  },
  'mbps-mbs': {
    title: 'Mbps换算MB/s', desc: '宽带的实际下载速度',
    long: '把运营商宣传的Mbps换算成实际下载速度MB/s。两者相差八倍，常引起"网速太慢"的误解。',
    note: '小写b是比特，大写B是字节，1字节等于8比特。100Mbps线路的下载上限为12.5MB/s。',
  },
  'kb-mb': {
    title: 'KB换算MB', desc: '较小的文件容量',
    long: '千字节与兆字节互相换算。确认附件大小限制时最常用到。',
    note: '按1MB = 1,024KB计算。邮件附件常见的25MB上限相当于25,600KB。',
  },
  'byte-bit': {
    title: '字节换算比特', desc: '最小的数据单位',
    long: '字节与比特互相换算。网络速度以比特计，文件大小以字节计，两者需要互换。',
    note: '1字节等于8比特。一个英文字母占1字节，一个汉字或韩文字在UTF-8中占3字节。',
  },
  'kcal-kj': {
    title: '卡路里换算千焦', desc: '食品热量单位',
    long: '千卡与千焦互相换算。欧洲、澳洲的食品标签使用千焦标注。',
    note: '1千卡为4.184千焦。成人每日建议摄入2,000千卡约合8,368千焦。食品标签上的"卡路里"实际指千卡。',
  },
  'kw-hp': {
    title: '千瓦换算马力', desc: '汽车输出功率',
    long: '千瓦与马力互相换算。电动车以千瓦标注功率，燃油车以马力标注，比较时需要换算。',
    note: '本页按公制马力(PS)计算，1千瓦 = 1.36 PS。英制马力(HP)为1千瓦 = 1.341 HP，略有差异。',
  },
  'kwh-mj': {
    title: '千瓦时换算兆焦', desc: '电能单位',
    long: '千瓦时与兆焦互相换算。把电费单上的千瓦时与其他能源对比时使用。',
    note: '1千瓦时为3.6兆焦。四口之家每月用电约300千瓦时，相当于1,080兆焦。',
  },
  'joule-cal': {
    title: '焦耳换算卡', desc: '基本能量单位',
    long: '焦耳与卡互相换算。在物理计算与营养标注之间转换时使用。',
    note: '1卡为4.184焦耳，即把1克水升高1℃所需的热量。食品上的"1卡"实际是它的1,000倍(千卡)。',
  },
  'bar-psi': {
    title: 'bar换算psi', desc: '轮胎气压单位',
    long: 'bar与psi互相换算。轮胎气压因国家和厂商而使用不同单位。',
    note: '乘用车适宜气压通常为2.2~2.5 bar(32~36 psi)。以驾驶座车门内侧标签上的数值为准。',
  },
  'hpa-mmhg': {
    title: '百帕换算毫米汞柱', desc: '气压单位',
    long: '百帕与毫米汞柱互相换算。天气预报用百帕，血压计用毫米汞柱，两种单位都会遇到。',
    note: '标准大气压为1,013百帕(760毫米汞柱)。台风中心气压低于950百帕即为非常强的台风。',
  },
  'mpg-kmpl': {
    title: 'mpg换算km/L', desc: '油耗单位',
    long: '把美制油耗(mpg)换算成km/L。对比海外汽车评测的油耗数据时使用。',
    note: '按美制加仑计算，30 mpg约为12.8 km/L。英制加仑的mpg数值会高出约20%，需确认来源。',
  },
};
