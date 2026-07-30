/**
 * 단위 변환 둘째 묶음의 영어·중국어 문구.
 *
 * 계수는 여기 두지 않는다 — lib/convert-tools2.ts 한 곳에만 있어야 한다.
 * 전통 단위는 문화권마다 값이 달라서 note가 언어별로 갈린다. 중국어 페이지에서
 * "중국 근은 한국 근과 다르다"고 쓰면 어색하므로 그쪽에서는 반대로 적는다.
 */
import type { ConvertL10n } from './convert-i18n.ts';

export const CONVERT_EN2: Record<string, ConvertL10n> = {
  'lightyear-km': {
    title: 'Light Years to km', desc: 'Convert light years to kilometres',
    long: 'A light year is how far light travels in a vacuum in one year — about 9.461 trillion kilometres. Proxima Centauri, the nearest star, sits 4.2 light years away.',
    note: 'A light year measures distance, not time. Saying something happens “a few light years from now” is simply wrong.',
    from: 'light years', to: 'km',
  },
  'au-km': {
    title: 'Astronomical Units to km', desc: 'Convert the Earth–Sun distance unit to kilometres',
    long: 'One astronomical unit is the mean Earth–Sun distance, defined as exactly 149,597,870.7 km. Mars sits at 1.5 AU, Jupiter at 5.2 and Neptune at 30.',
    note: 'AU suits distances inside the solar system; light years take over between stars. One light year is about 63,241 AU.',
  },
  'fathom-m': {
    title: 'Fathoms to Metres', desc: 'Convert the nautical depth unit to metres',
    long: 'A fathom is exactly six feet, 1.8288 m. It began as the span of outstretched arms and still marks depths on charts and lengths of rope.',
    note: 'British and US charts use fathoms while international charts use metres. If the same waters read three times deeper, check the unit first.',
    from: 'fathoms', to: 'm',
  },
  'furlong-m': {
    title: 'Furlongs to Metres', desc: 'Convert the horse-racing distance unit to metres',
    long: 'A furlong is an eighth of a mile, 201.168 m. It came from the length a team of oxen could plough without resting and survives almost only in racing.',
    note: 'When a commentator calls “the last furlong”, roughly 200 m remain to the finish line.',
    from: 'furlongs', to: 'm',
  },
  'chi-cm': {
    title: 'Chinese Chi (尺) to cm', desc: 'Convert the Chinese market foot to centimetres',
    long: 'The Chinese market chi is one third of a metre, about 33.33 cm. It is still used for cloth and timber, and one chi divides into ten cun.',
    note: 'The Korean ja and Japanese shaku are both 30.3 cm, not the same as the Chinese chi. Three countries, three different “feet”.',
  },
  'sun-cm': {
    title: 'Japanese Sun (寸) to cm', desc: 'Convert the Japanese inch to centimetres',
    long: 'One Japanese sun is a tenth of a shaku, about 3.03 cm. Carpentry and building still use it, and Japanese timber sizes and tatami dimensions follow it.',
    note: 'It matches the Korean chi. The Chinese cun, however, is 3.33 cm — ten per cent larger — so check where a drawing came from.',
  },
  'point-mm': {
    title: 'Points (pt) to mm', desc: 'Convert typographic points to millimetres',
    long: 'A point is one seventy-second of an inch, about 0.3528 mm. Font sizes, margins and rule weights are all specified in points; 12 pt is roughly 4.2 mm.',
    note: 'A 12 pt font is not 4.2 mm tall. The point size measures the box the letters sit in, and the letters themselves are smaller.',
  },
  'hand-cm': {
    title: 'Hands to cm', desc: 'Convert the horse-height unit to centimetres',
    long: 'A hand is four inches, 10.16 cm. Horses are measured to the withers, and racehorses usually stand 15 to 17 hands — sixteen hands is about 163 cm.',
    note: 'Hands use a quirky notation: “15.2 hands” means fifteen hands and two inches, not fifteen and a half.',
    from: 'hands', to: 'cm',
  },

  'troyounce-g': {
    title: 'Troy Ounces to Grams', desc: 'Convert the precious-metal unit to grams',
    long: 'Gold and silver are quoted per troy ounce. One troy ounce is 31.1035 g, about ten per cent heavier than the ordinary ounce of 28.35 g.',
    note: 'Mixing up the two ounces throws a gold price out by ten per cent. One kilogram is 32.15 troy ounces.',
    from: 'troy oz', to: 'g',
  },
  'grain-g': {
    title: 'Grains to Grams', desc: 'Convert grains to grams',
    long: 'A grain is exactly 0.06479891 g. Named after a barley seed, it still measures bullet weights, powder charges and some pharmaceutical doses.',
    note: 'The “pearl grain” used for gemstones is a quarter carat, 50 mg — a different unit entirely.',
    from: 'grains', to: 'g',
  },
  'dram-g': {
    title: 'Drams to Grams', desc: 'Convert drams to grams',
    long: 'A dram is a sixteenth of an ounce, about 1.772 g. It shows up in fragrance, small recipe quantities and cosmetic labelling in the US.',
    note: 'The weight dram is not the fluid dram of 3.7 mL. If the label says “fl”, it is a volume.',
    from: 'drams', to: 'g',
  },
  'jin-g': {
    title: 'Chinese Jin (斤) to Grams', desc: 'Convert the Chinese market catty to grams',
    long: 'The Chinese market jin is fixed at exactly 500 g. Markets and restaurants still price ingredients by it, and one jin divides into ten liang.',
    note: 'The Korean geun is 600 g for meat and 375 g for vegetables. Following a Chinese recipe with a Korean jin is a twenty per cent error.',
  },
  'momme-g': {
    title: 'Momme (匁) to Grams', desc: 'Convert the Japanese pearl weight to grams',
    long: 'One momme is 3.75 g. It is the international unit for trading pearls and also labels the weight of silk fabric. It matches the Korean don.',
    note: 'Silk described as “16 momme” refers to fabric thickness by convention, not the weight of your piece. Higher numbers mean heavier cloth.',
  },
  'longton-kg': {
    title: 'Long Tons to kg', desc: 'Convert the British ton to kilograms',
    long: 'A long ton is 2,240 pounds, 1,016.05 kg — about 1.6 per cent heavier than a metric tonne. It measures ship displacement and British bulk cargo.',
    note: 'Three tons exist: long 1,016 kg, short 907 kg and metric 1,000 kg. Check which one a contract means.',
    from: 'long tons', to: 'kg',
  },
  'shortton-kg': {
    title: 'Short Tons to kg', desc: 'Convert the US ton to kilograms',
    long: 'A short ton is 2,000 pounds, 907.18 kg — nine per cent lighter than a metric tonne. Reading US output or emissions figures as metric overstates them.',
    note: 'In US statistics “ton” almost always means the short ton. International sources writing “tonne” mean the metric 1,000 kg.',
    from: 'short tons', to: 'kg',
  },
  'mcg-mg': {
    title: 'μg to mg', desc: 'Convert micrograms to milligrams',
    long: 'A thousand micrograms make one milligram. Nutrients needed in tiny amounts — vitamin D, folate, B12 — are labelled in μg, while vitamin C and magnesium use mg.',
    note: 'mcg and μg are the same unit written two ways. Confusing either with mg is a thousandfold error, so read the label twice.',
  },

  'tbsp-ml': {
    title: 'Tablespoons to mL', desc: 'Convert tablespoons to millilitres',
    long: 'A tablespoon is 15 mL in Korea and most of the world. Recipes mean a level spoon; heaped, it holds about half again as much.',
    note: 'Australia uses a 20 mL tablespoon. The US spoon is 14.79 mL, close enough to 15 for cooking.',
    from: 'tbsp', to: 'mL',
  },
  'tsp-ml': {
    title: 'Teaspoons to mL', desc: 'Convert teaspoons to millilitres',
    long: 'A teaspoon is 5 mL, one third of a tablespoon. It measures salt, baking powder and anything where a small change alters the result.',
    note: 'Baking powder and soda swing a result badly at teaspoon scale. Weighing beats measuring by volume.',
    from: 'tsp', to: 'mL',
  },
  'pint-l': {
    title: 'Pints to Litres', desc: 'Convert pints to litres',
    long: 'A US pint is 473 mL and a UK pint is 568 mL; this converter uses the US liquid pint. Ice cream tubs and beer glasses both use the unit.',
    note: 'A British pub pint is 568 mL, twenty per cent more than the American one. The same word gets you a different glass.',
    from: 'pints', to: 'L',
  },
  'quart-l': {
    title: 'Quarts to Litres', desc: 'Convert quarts to litres',
    long: 'A US quart is a quarter gallon, 946 mL. Being so close to a litre, it turns up on milk cartons and engine oil bottles.',
    note: 'A quart is five per cent short of a litre. Topping up oil “by the quart” leaves you slightly under a litre-based figure.',
    from: 'quarts', to: 'L',
  },
  'cc-ml': {
    title: 'cc to mL', desc: 'See how cc and millilitres relate',
    long: 'One cc is one cubic centimetre and is exactly one millilitre. Medicine and engine displacement say cc while cooking and shopping say mL — the same volume, two habits.',
    note: 'No conversion is needed since they are equal. But 1 cc is not 1 g: that only holds for water, and oil is about 0.92 g.',
  },
  'hop-ml': {
    title: 'Hop (홉) to mL', desc: 'Convert the traditional East Asian volume unit to millilitres',
    long: 'One hop is a tenth of a doe, about 180 mL. It measured rice and liquor and matches the Japanese gō — a 720 mL bottle of sake is exactly four of them.',
    note: 'The “one cup of rice” in a rice cooker usually means a 180 mL hop cup, not a 200 mL measuring cup.',
    from: 'hop', to: 'mL',
  },
  'bushel-l': {
    title: 'Bushels to Litres', desc: 'Convert the grain trading unit to litres',
    long: 'A US bushel is 35.24 L. Grain prices are quoted per bushel, which is how corn, soybean and wheat trade on international markets.',
    note: 'A bushel is a volume, but grain trades by a standard weight per crop: 25.4 kg for corn, 27.2 kg for soybeans.',
    from: 'bushels', to: 'L',
  },

  'sqinch-cm2': {
    title: 'Square Inches to cm²', desc: 'Convert square inches to square centimetres',
    long: 'A square inch is 6.4516 cm², the square of 2.54. It is the denominator in psi (pounds per square inch) and appears in print and film formats.',
    note: 'Lengths scale by 2.54 but areas scale by 6.45. Using the length ratio on an area is off by a factor of two and a half.',
  },
  'sqyard-m2': {
    title: 'Square Yards to m²', desc: 'Convert square yards to square metres',
    long: 'A square yard is 0.8361 m². Carpet, fabric and turf sell by it in the US and UK, and one square metre is about 1.196 square yards.',
    note: 'Carpet comes in fixed widths, so it is sometimes priced per square yard but measured in running yards. Check which.',
  },
  'sqmile-km2': {
    title: 'Square Miles to km²', desc: 'Convert square miles to square kilometres',
    long: 'A square mile is 2.59 km². US state and county areas and wildfire coverage are reported in it; converting makes the size legible.',
    note: 'Lengths scale by 1.609 but areas by 2.59. Applying the length ratio to an area understates it by sixty per cent.',
  },
  'are-m2': {
    title: 'Ares (a) to m²', desc: 'Convert ares to square metres',
    long: 'One are is 10 m by 10 m, exactly 100 m². A hundred ares make a hectare. European farm and plot areas use it, and it survives in agricultural statistics.',
    note: 'An are (a) and a hectare (ha) differ by a factor of a hundred. One letter changes the value by that much.',
  },
  'mu-m2': {
    title: 'Chinese Mu (畝) to m²', desc: 'Convert the Chinese land unit to square metres',
    long: 'The Chinese market mu is fixed at 666.67 m², so fifteen mu make one hectare. Chinese farmland areas and yield statistics are given in it.',
    note: 'The Korean majigi varies regionally from 150 to 300 pyeong, but the Chinese mu is a fixed 666.67 m².',
  },

  'fahrenheit-kelvin': {
    title: '°F to Kelvin', desc: 'Convert Fahrenheit to the absolute scale',
    long: 'Subtract 32, multiply by five ninths and add 273.15. Fahrenheit 32 — the freezing point of water — is 273.15 K.',
    note: 'Kelvin takes no degree sign. It is 273.15 K, never 273.15 °K.',
  },
  'celsius-rankine': {
    title: '°C to Rankine (°R)', desc: 'Convert Celsius to the Rankine absolute scale',
    long: 'Rankine is an absolute scale on Fahrenheit-sized degrees. Zero Rankine is absolute zero and water freezes at 491.67 °R. US thermodynamics and aerospace texts use it.',
    note: 'Kelvin and Rankine are both absolute but their degrees differ in size: a change of 1 K equals a change of 1.8 °R.',
  },

  'mph-ms': {
    title: 'mph to m/s', desc: 'Convert miles per hour to metres per second',
    long: 'One mph is 0.44704 m/s. US and UK speed limits and wind speeds come in mph, so physics calculations need the conversion first.',
    note: 'A US 65 mph limit is about 105 km/h. Multiplying mph by 1.6 gives km/h closely enough for the road.',
  },
  'pace-kmh': {
    title: 'Running Pace to km/h', desc: 'Convert minutes per kilometre to speed',
    long: 'Pace is the minutes taken per kilometre; speed is the distance covered per hour. Divide 60 by the pace: a five-minute pace is 12 km/h.',
    note: 'This conversion is a division, so it runs backwards. A smaller pace is faster while a larger speed is faster.',
    from: 'min/km', to: 'km/h',
  },
  'fps-ms': {
    title: 'ft/s to m/s', desc: 'Convert feet per second to metres per second',
    long: 'One ft/s is 0.3048 m/s. Bullet velocities, pipe flow speeds and fall rates appear in ft/s in US sources; the speed of sound is about 1,125 ft/s.',
    note: '“fps” also abbreviates frames per second. Read the context to tell which one is meant.',
  },

  'tb-pb': {
    title: 'TB to PB', desc: 'Convert terabytes to petabytes',
    long: 'A thousand terabytes make one petabyte. Personal storage is counted in TB while data centres and large-scale backups work in PB.',
    note: 'Drive makers count 1 TB as a trillion bytes; operating systems count in 1,024s, which is why the displayed capacity looks about nine per cent smaller.',
  },
  'kib-kb': {
    title: 'KiB to KB', desc: 'Compare the 1024 and 1000 based units',
    long: 'A kibibyte is 1,024 bytes; a kilobyte is 1,000. Operating systems count in 1,024s while manufacturers and network providers count in 1,000s.',
    note: 'The gap is 2.4 per cent at the kilo step but widens to ten per cent by tera. That is why a hard drive looks smaller than the box claims.',
  },
  'mib-mb': {
    title: 'MiB to MB', desc: 'Convert mebibytes to megabytes',
    long: 'One MiB is 1,048,576 bytes, 4.9 per cent more than a megabyte of 1,000,000. Linux and developer tools report MiB while file sizes are usually quoted in MB.',
    note: 'The same file showing different numbers in different tools comes down to this. The file has not changed.',
  },
  'gib-gb': {
    title: 'GiB to GB', desc: 'Convert gibibytes to gigabytes',
    long: 'One GiB is 1.0737 GB. Memory is physically built in GiB, so “16 GB of RAM” is strictly 16 GiB, or 17.18 GB.',
    note: 'Fit a 256 GB SSD and it reports 238 GiB. No 18 GB went missing — the counting method changed.',
  },

  'wh-joule': {
    title: 'Wh to Joules', desc: 'Convert watt-hours to joules',
    long: 'A watt-hour is one watt for one hour, 3,600 joules. Laptop batteries hold 50–100 Wh and a typical power bank about 37 Wh (10,000 mAh at 3.7 V).',
    note: 'mAh alone says nothing about energy. Multiply by the voltage to get Wh before comparing batteries across devices.',
  },
  'btu-kj': {
    title: 'BTU to kJ', desc: 'Convert British thermal units to kilojoules',
    long: 'One BTU is the heat needed to raise a pound of water by 1 °F, about 1.055 kJ. Air conditioners and boilers are rated in BTU per hour, and 12,000 BTU/h is one ton of refrigeration.',
    note: 'An air conditioner’s “12,000 BTU” is a per-hour figure. As a rule of thumb, twenty square metres needs about 5,000 BTU/h.',
  },
  'kcal-kwh': {
    title: 'kcal to kWh', desc: 'Convert food energy to electrical energy',
    long: '860 kcal make one kilowatt-hour. Someone eating 2,000 kcal a day handles about 2.3 kWh of energy — enough to run a 60 W bulb for 39 hours.',
    note: 'The body cannot use food energy at full efficiency. Real conversion runs 20–25 per cent and the rest leaves as heat.',
  },
  'therm-kwh': {
    title: 'Therms to kWh', desc: 'Convert the gas billing unit to kilowatt-hours',
    long: 'A therm is 100,000 BTU, 29.31 kWh. US and UK gas bills are issued in therms, so comparing gas against electricity needs both on one unit.',
    note: 'Comparing heating costs also needs appliance efficiency. A gas boiler runs at 90 per cent while an electric heat pump exceeds 300.',
  },

  'atm-kpa': {
    title: 'Atmospheres to kPa', desc: 'Convert standard atmospheres to kilopascals',
    long: 'One standard atmosphere is defined as exactly 101.325 kPa. It is the average pressure at sea level, and every ten metres of water depth adds roughly another atmosphere.',
    note: 'Weather forecasts use hPa, a tenth of a kPa. 1,013 hPa is 101.3 kPa, which is one atmosphere.',
  },
  'psi-kpa': {
    title: 'psi to kPa', desc: 'Convert tyre pressure units to kilopascals',
    long: 'One psi is 6.895 kPa. Tyre pressure is labelled in psi, kPa or bar depending on the country, so the forecourt gauge and the door sticker may not match.',
    note: 'Cars usually want 32–36 psi (220–250 kPa). Pressure reads 3–5 psi high straight after driving, so measure cold.',
  },
  'torr-pa': {
    title: 'Torr to Pascals', desc: 'Convert the vacuum pressure unit to pascals',
    long: 'One torr is the pressure of a millimetre of mercury, 133.32 Pa, and 760 torr is one atmosphere. Vacuum equipment and laboratory gauges use it, essentially interchangeably with mmHg.',
    note: 'Torr and mmHg are defined slightly differently but agree to about two parts in ten million — identical for practical work.',
  },
  'inhg-hpa': {
    title: 'inHg to hPa', desc: 'Convert inches of mercury to hectopascals',
    long: 'One inHg is 33.86 hPa. US and Canadian altimeter settings are given in inHg while most of the world uses hPa; the standard 29.92 inHg is 1,013.25 hPa.',
    note: 'A wrong altimeter setting shifts your true altitude. One inHg of error is roughly a thousand feet.',
  },

  'frame-sec': {
    title: 'Frames to Seconds (30 fps)', desc: 'Convert video frame counts to seconds',
    long: 'At 30 fps one frame is a thirtieth of a second. Editing timelines show timecode in frames, so subtitle timing needs this conversion.',
    note: 'Broadcast 29.97 fps drop-frame differs subtly from 30 fps, and over a long programme that difference accumulates into whole seconds.',
    from: 'frames', to: 'sec',
  },
  'bpm-ms': {
    title: 'BPM to ms per Beat', desc: 'Convert tempo to the length of one beat',
    long: 'Divide 60,000 by the BPM for the length of a beat in milliseconds: 120 BPM gives 500 ms. Delay and reverb times are set from this figure.',
    note: 'This conversion is a division, so it runs backwards. An eighth note is half this value and a dotted eighth is 0.75 of it.',
  },
  'ms-sec': {
    title: 'ms to Seconds', desc: 'Convert milliseconds to seconds',
    long: 'A thousand milliseconds make a second. Network latency, display response and audio delay are all quoted in ms; one frame at 60 fps is about 16.7 ms.',
    note: 'People start noticing delay around 100 ms. Below 20 ms it usually goes unnoticed.',
    from: 'ms', to: 'sec',
  },

  'degree-gradian': {
    title: 'Degrees to Gradians (gon)', desc: 'Convert degrees to gradians',
    long: 'A gradian divides the right angle into 100 parts, so a full turn is 400 gradians and 90 degrees is exactly 100. Surveying and some European engineering use it.',
    note: 'This unit is why scientific calculators offer DEG, RAD and GRAD. Left on GRAD, every trigonometric answer changes.',
  },
  'arcmin-degree': {
    title: 'Arcminutes to Degrees', desc: 'Convert minutes of arc to degrees',
    long: 'A degree holds 60 arcminutes and each minute holds 60 seconds. Latitude, longitude and celestial positions are written this way; the full moon spans about 31 arcminutes.',
    note: 'Arcminutes share their symbols with time but mean something else. One minute of latitude is about 1.852 km — one nautical mile.',
  },
};

export const CONVERT_ZH2: Record<string, ConvertL10n> = {
  'lightyear-km': {
    title: '光年换算公里', desc: '把光年换算成公里',
    long: '1光年是光在真空中一年走过的距离，约9.4607万亿公里。最近的恒星比邻星距我们4.2光年。',
    note: '光年是距离单位而非时间单位。说“几光年之后”是错误用法。',
    from: '光年', to: '公里',
  },
  'au-km': {
    title: '天文单位换算公里', desc: '把地日距离单位换算成公里',
    long: '1天文单位是地球到太阳的平均距离，精确定义为149,597,870.7公里。火星为1.5 AU，木星5.2 AU，海王星30 AU。',
    note: '太阳系内适合用AU，恒星之间则用光年。1光年约合63,241 AU。',
  },
  'fathom-m': {
    title: '英寻换算米', desc: '把航海水深单位换算成米',
    long: '1英寻正好是6英尺、1.8288米。它源自双臂展开的长度，至今仍用于海图水深与绳索长度。',
    note: '英美海图用英寻，国际海图用米。同一片海域数字相差三倍以上时，先确认单位。',
    from: '英寻', to: '米',
  },
  'furlong-m': {
    title: '弗隆换算米', desc: '把赛马距离单位换算成米',
    long: '1弗隆是1英里的八分之一，即201.168米。它源自一对耕牛不歇息能犁的长度，如今几乎只留在赛马中。',
    note: '解说里的“最后一弗隆”意思是距终点还剩约200米。',
    from: '弗隆', to: '米',
  },
  'chi-cm': {
    title: '市尺换算厘米', desc: '把中国市尺换算成厘米',
    long: '中国市尺1尺为三分之一米，约33.33厘米。量布料与木材时仍在使用，1尺分为10寸。',
    note: '韩国的“자”与日本的“尺”都是30.3厘米，与市尺不同。三国的“尺”各不相同。',
  },
  'sun-cm': {
    title: '日本寸换算厘米', desc: '把日本寸换算成厘米',
    long: '日本1寸为尺的十分之一，约3.03厘米。木工与建筑中仍在使用，日本木材规格与榻榻米尺寸都遵循它。',
    note: '它与韩国的“치”相同。但中国的寸为3.33厘米，大出一成，需确认图纸来源。',
  },
  'point-mm': {
    title: '磅(pt)换算毫米', desc: '把印刷磅数换算成毫米',
    long: '1磅是1英寸的七十二分之一，约0.3528毫米。字号、页边距、线宽都以磅标注，12磅约合4.2毫米。',
    note: '12磅字并不是字高4.2毫米，而是容纳字形的方框高度，实际字形要更小。',
  },
  'hand-cm': {
    title: '手(hand)换算厘米', desc: '把量马身高的单位换算成厘米',
    long: '1 hand是4英寸、10.16厘米。马的身高量到肩隆处，赛马通常为15至17 hand，16 hand约163厘米。',
    note: 'hand的小数写法特殊：“15.2 hand”指15 hand又2英寸，不是15.5 hand。',
    from: 'hand', to: '厘米',
  },

  'troyounce-g': {
    title: '金衡盎司换算克', desc: '把贵金属交易单位换算成克',
    long: '黄金与白银的国际报价以金衡盎司计。1金衡盎司为31.1035克，比常衡盎司28.35克重约一成。',
    note: '与常衡盎司混用会让金价偏差一成。1公斤等于32.15金衡盎司。',
    from: '金衡盎司', to: '克',
  },
  'grain-g': {
    title: '格林换算克', desc: '把格林换算成克',
    long: '1格林精确等于0.06479891克。它源自一粒大麦的重量，至今仍用于弹头重量、火药量与部分药剂标注。',
    note: '珠宝用的“珍珠格林”为四分之一克拉（50毫克），与此格林并非同一单位。',
    from: '格林', to: '克',
  },
  'dram-g': {
    title: '打兰换算克', desc: '把打兰换算成克',
    long: '1打兰是1盎司的十六分之一，约1.772克。用于香料、少量配料计量，在美国食谱与化妆品标注中可见。',
    note: '重量打兰与液量打兰（3.7毫升）不同。标注前带fl即为体积。',
    from: '打兰', to: '克',
  },
  'jin-g': {
    title: '市斤换算克', desc: '把中国市斤换算成克',
    long: '中国市斤1斤精确为500克。菜市场与餐馆的食材标注至今广泛使用，1斤为10两。',
    note: '韩国的“근”肉类为600克、蔬菜为375克，与市斤不同。按韩国口径做中式菜谱会差两成。',
  },
  'momme-g': {
    title: '匁换算克', desc: '把日本珍珠重量单位换算成克',
    long: '1匁为3.75克。它是珍珠交易的国际单位，也用于标注丝绸面料的重量，与韩国的“돈”相同。',
    note: '丝绸的“16匁”按惯例表示面料厚度，而非你手上那块的重量。数字越大布越厚实。',
  },
  'longton-kg': {
    title: '长吨换算公斤', desc: '把英制吨换算成公斤',
    long: '长吨（英吨）为2,240磅、1,016.05公斤，比公吨重约1.6%。用于船舶排水量与英国散货交易。',
    note: '吨有三种：长吨1,016公斤、短吨907公斤、公吨1,000公斤。合同里要写清是哪一种。',
    from: '长吨', to: '公斤',
  },
  'shortton-kg': {
    title: '短吨换算公斤', desc: '把美制吨换算成公斤',
    long: '短吨（美吨）为2,000磅、907.18公斤，比公吨轻9%。把美国的产量或排放数据当作公吨读，会高估实际值。',
    note: '美国统计中的“ton”几乎都指短吨；国际资料写“tonne”则是1,000公斤的公吨。',
    from: '短吨', to: '公斤',
  },
  'mcg-mg': {
    title: '微克换算毫克', desc: '把微克换算成毫克',
    long: '1,000微克等于1毫克。维生素D、叶酸、B12等需求量极小的营养素用微克标注，维生素C与镁则用毫克。',
    note: 'mcg与μg是同一单位的两种写法。与mg混淆会相差一千倍，标签要看两遍。',
  },

  'tbsp-ml': {
    title: '大勺换算毫升', desc: '把大勺（汤匙）换算成毫升',
    long: '韩国与多数国家的1大勺为15毫升。食谱里的“大勺”指刮平的量，堆尖则约为1.5倍。',
    note: '澳大利亚的大勺为20毫升。美国为14.79毫升，做菜时按15毫升即可。',
    from: '大勺', to: '毫升',
  },
  'tsp-ml': {
    title: '小勺换算毫升', desc: '把小勺（茶匙）换算成毫升',
    long: '1小勺为5毫升，是大勺的三分之一。用于盐、泡打粉等少放一点就会改变结果的材料。',
    note: '泡打粉与小苏打在小勺级别的差异就会明显影响成品，用秤称量比量勺更准。',
    from: '小勺', to: '毫升',
  },
  'pint-l': {
    title: '品脱换算升', desc: '把品脱换算成升',
    long: '美制品脱为473毫升，英制品脱为568毫升，本换算器采用美制液量品脱。冰淇淋桶装与啤酒杯都用这个单位。',
    note: '英国酒吧的1品脱是568毫升，比美制多两成。同样说“一品脱”，端上来的量却不同。',
    from: '品脱', to: '升',
  },
  'quart-l': {
    title: '夸脱换算升', desc: '把夸脱换算成升',
    long: '1美制夸脱为加仑的四分之一，946毫升。因为很接近1升，常见于牛奶盒与机油瓶。',
    note: '夸脱比1升少5%。按“一夸脱”添机油，会比按升计算的量略少一点。',
    from: '夸脱', to: '升',
  },
  'cc-ml': {
    title: 'cc与毫升的关系', desc: '确认cc与毫升的换算关系',
    long: '1cc是1立方厘米，精确等于1毫升。医疗现场与汽车排量说cc，烹饪与日常说毫升，只是习惯不同。',
    note: '数值相同，无需换算。但1cc不等于1克——只有水才成立，油约为0.92克。',
  },
  'hop-ml': {
    title: '合(홉)换算毫升', desc: '把东亚传统体积单位换算成毫升',
    long: '1合为1升(되)的十分之一，约180毫升。过去用于量米与酒，与日本的“合”相同，一瓶720毫升清酒正好是4合。',
    note: '电饭锅里的“一杯米”通常指180毫升的量米杯，而非200毫升的普通量杯。',
    from: '合', to: '毫升',
  },
  'bushel-l': {
    title: '蒲式耳换算升', desc: '把谷物交易单位换算成升',
    long: '1美制蒲式耳为35.24升。谷物价格按每蒲式耳报价，国际市场的玉米、大豆、小麦均采用这一单位。',
    note: '蒲式耳是体积单位，但谷物交易按品类的标准重量折算：玉米25.4公斤，大豆27.2公斤。',
    from: '蒲式耳', to: '升',
  },

  'sqinch-cm2': {
    title: '平方英寸换算平方厘米', desc: '把平方英寸换算成平方厘米',
    long: '1平方英寸为6.4516平方厘米，即2.54的平方。psi（磅每平方英寸）的分母就是它，印刷品与胶片规格也在用。',
    note: '长度是2.54倍，面积则是6.45倍。把长度比例直接用在面积上会差两倍半。',
  },
  'sqyard-m2': {
    title: '平方码换算平方米', desc: '把平方码换算成平方米',
    long: '1平方码为0.8361平方米。美英的地毯、面料、草皮按此销售，1平方米约合1.196平方码。',
    note: '地毯幅宽固定，有时按平方码计价却按延码测量，需确认是哪一种。',
  },
  'sqmile-km2': {
    title: '平方英里换算平方公里', desc: '把平方英里换算成平方公里',
    long: '1平方英里为2.59平方公里。美国的州县面积与山火过火面积都以此报道，换成平方公里更容易理解规模。',
    note: '长度是1.609倍，面积则是2.59倍。把长度比例用在面积上会低估六成。',
  },
  'are-m2': {
    title: '公亩(a)换算平方米', desc: '把公亩换算成平方米',
    long: '1公亩是10米×10米，正好100平方米。100公亩为1公顷。欧洲的农地与宅地面积常用它，农业统计中也仍保留。',
    note: '公亩(a)与公顷(ha)相差一百倍，多一个字母数值就差百倍。',
  },
  'mu-m2': {
    title: '市亩换算平方米', desc: '把中国土地单位换算成平方米',
    long: '中国市亩1亩固定为666.67平方米，15亩为1公顷。中国的耕地面积与产量统计都以亩计。',
    note: '韩国的“마지기”因地区而异，为150至300坪；而市亩是固定的666.67平方米。',
  },

  'fahrenheit-kelvin': {
    title: '华氏换算开尔文', desc: '把华氏度换算成绝对温度',
    long: '华氏转开尔文需减32、乘九分之五，再加273.15。华氏32度（水的冰点）即273.15开尔文。',
    note: '开尔文不加“度”符号：写273.15 K，而不是273.15 °K。',
  },
  'celsius-rankine': {
    title: '摄氏换算兰氏度', desc: '把摄氏度换算成兰氏绝对温度',
    long: '兰氏度是采用华氏刻度的绝对温标。0°R为绝对零度，水的冰点为491.67°R。美国热力学与航空工程资料中会用到。',
    note: '开尔文与兰氏度都是绝对温标，但刻度间隔不同：1 K的变化相当于1.8°R的变化。',
  },

  'mph-ms': {
    title: '英里每小时换算米每秒', desc: '把英里时速换算成国际单位',
    long: '1 mph为0.44704 m/s。美英的限速与风速以mph标示，代入物理计算前需换成米每秒。',
    note: '美国道路的65 mph约为105 km/h。把mph乘以1.6即可粗略得到km/h。',
  },
  'pace-kmh': {
    title: '跑步配速换算时速', desc: '把每公里用时换算成时速',
    long: '配速是走完1公里所用的分钟数，时速是每小时前进的距离。用60除以配速即得时速：配速5分等于12 km/h。',
    note: '这个换算是除法，方向相反：配速数字越小越快，时速数字越大越快。',
    from: '分/公里', to: '公里/小时',
  },
  'fps-ms': {
    title: '英尺每秒换算米每秒', desc: '把英尺每秒换算成米每秒',
    long: '1 ft/s为0.3048 m/s。子弹初速、管道流速、下落速度在美国资料中常用此单位；声速约为1,125 ft/s。',
    note: 'fps也可能是“每秒帧数”的缩写，需结合上下文判断。',
  },

  'tb-pb': {
    title: 'TB换算PB', desc: '把太字节换算成拍字节',
    long: '1,000太字节等于1拍字节。个人存储以TB计，数据中心与大规模备份则以PB计。',
    note: '硬盘厂商把1 TB算作一万亿字节，而操作系统按1,024进制计算，因此显示容量约小9%。',
  },
  'kib-kb': {
    title: 'KiB换算KB', desc: '比较1024进制与1000进制',
    long: '1 KiB（千字二进制）为1,024字节，1 KB（千字节）为1,000字节。操作系统按1,024计，厂商与运营商按1,000计。',
    note: '在千级只差2.4%，到太级就拉大到10%。这就是硬盘显示容量偏小的原因。',
  },
  'mib-mb': {
    title: 'MiB换算MB', desc: '把兆字二进制换算成兆字节',
    long: '1 MiB为1,048,576字节，比1 MB（1,000,000字节）大4.9%。Linux与开发工具多用MiB，文件大小标注多用MB。',
    note: '同一个文件在不同工具里显示不同数字，正是这个差异所致，文件本身没有变化。',
  },
  'gib-gb': {
    title: 'GiB换算GB', desc: '把吉字二进制换算成吉字节',
    long: '1 GiB为1.0737 GB。内存实际按GiB制造，所以“16GB内存”严格说是16 GiB，即17.18 GB。',
    note: '装上256GB固态硬盘后显示238 GiB。并非少了18GB，而是计数方式不同。',
  },

  'wh-joule': {
    title: '瓦时换算焦耳', desc: '把瓦时换算成焦耳',
    long: '1瓦时是以1瓦功率用1小时的能量，即3,600焦耳。笔记本电池为50至100瓦时，充电宝通常约37瓦时（10,000mAh×3.7V）。',
    note: '只看mAh无法知道能量，需乘以电压换成瓦时，才能比较不同设备的电池。',
  },
  'btu-kj': {
    title: 'BTU换算千焦', desc: '把英热单位换算成千焦',
    long: '1 BTU是把1磅水升温1华氏度所需的热量，约1.055千焦。空调与锅炉按每小时BTU标定，12,000 BTU/h为1冷吨。',
    note: '空调标的“12,000 BTU”是每小时值。粗略估算，约20平方米需要5,000 BTU/h。',
  },
  'kcal-kwh': {
    title: '千卡换算千瓦时', desc: '把食物热量换算成电能',
    long: '860千卡等于1千瓦时。每天摄入2,000千卡的人相当于处理约2.3千瓦时能量，可点亮60瓦灯泡39小时。',
    note: '人体无法百分之百利用食物能量，实际效率为20%至25%，其余以热量散出。',
  },
  'therm-kwh': {
    title: '色姆(therm)换算千瓦时', desc: '把燃气计费单位换算成千瓦时',
    long: '1色姆为100,000 BTU，即29.31千瓦时。美英的燃气账单以色姆计费，比较燃气与电力成本需统一到同一单位。',
    note: '比较采暖成本还需计入设备效率：燃气锅炉约90%，电动热泵可超过300%。',
  },

  'atm-kpa': {
    title: '标准大气压换算千帕', desc: '把标准大气压换算成千帕',
    long: '1标准大气压精确定义为101.325千帕，即海平面的平均气压。水深每增加10米，大约多加1个大气压。',
    note: '天气预报里的hPa是kPa的十分之一：1,013 hPa等于101.3 kPa，也就是1个大气压。',
  },
  'psi-kpa': {
    title: 'psi换算千帕', desc: '把轮胎气压单位换算成千帕',
    long: '1 psi为6.895千帕。各国轮胎气压分别用psi、kPa或bar标注，加油站气压表与车门贴纸的单位可能不同。',
    note: '轿车推荐气压通常为32至36 psi（220至250 kPa）。刚行驶后因受热会高出3至5 psi，应待冷却后测量。',
  },
  'torr-pa': {
    title: '托(torr)换算帕', desc: '把真空压力单位换算成帕斯卡',
    long: '1托是1毫米汞柱的压力，即133.32帕，760托为1个大气压。真空设备与实验室压力表使用它，与mmHg基本等同。',
    note: '托与mmHg的定义略有差别，但相差仅约千万分之二，实用上完全可视为相同。',
  },
  'inhg-hpa': {
    title: '英寸汞柱换算百帕', desc: '把英寸汞柱换算成百帕',
    long: '1 inHg为33.86百帕。美国与加拿大的高度表拨正值用inHg，其他地区多用hPa；标准值29.92 inHg等于1,013.25 hPa。',
    note: '高度表拨正错误会导致真实高度偏差，1 inHg的误差约相当于1,000英尺。',
  },

  'frame-sec': {
    title: '帧数换算秒（30fps）', desc: '把视频帧数换算成秒',
    long: '在30fps的视频中1帧为三十分之一秒。剪辑软件的时间码以帧为单位显示，对字幕时间轴时需要这个换算。',
    note: '广播用的29.97fps（丢帧）与30fps有细微差别，长片中这一差异会累积到秒级。',
    from: '帧', to: '秒',
  },
  'bpm-ms': {
    title: 'BPM换算每拍毫秒', desc: '把速度换算成一拍的长度',
    long: '用60,000除以BPM即得一拍的毫秒数：120 BPM时一拍为500毫秒。延迟与混响时间就按这个数值设置。',
    note: '这个换算是除法，方向相反。八分音符为该值的一半，附点八分音符为0.75倍。',
  },
  'ms-sec': {
    title: '毫秒换算秒', desc: '把毫秒换算成秒',
    long: '1,000毫秒等于1秒。网络延迟、屏幕响应、音频延迟都以毫秒标注；60fps画面的一帧约为16.7毫秒。',
    note: '人开始察觉延迟约在100毫秒。低于20毫秒时通常感觉不到。',
    from: '毫秒', to: '秒',
  },

  'degree-gradian': {
    title: '度换算百分度(gon)', desc: '把度换算成百分度',
    long: '百分度把直角分成100份，因此一整圈为400百分度，90度正好等于100百分度。测量学与部分欧洲工程资料中使用。',
    note: '工程计算器有DEG、RAD、GRAD三种角度模式，就是因为这个单位。停在GRAD时所有三角函数值都会变。',
  },
  'arcmin-degree': {
    title: '角分换算度', desc: '把角分换算成度',
    long: '1度含60角分，1角分含60角秒。经纬度与天体位置都按这种方式记录；满月的视直径约为31角分，即半度。',
    note: '角分、角秒与时间的分、秒符号相同但含义不同。纬度1角分约为1.852公里，即1海里。',
  },
};
