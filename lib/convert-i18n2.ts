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
  'mil-mm': {
    title: 'Mils to mm', desc: 'Convert mils (thou) and millimetres both ways',
    long: 'One mil is a thousandth of an inch, or 0.0254 mm. US drawings use it for circuit trace widths, film and sheet thickness, and coating depth.',
    note: 'It is also called a thou — the same unit. The name resembles millimetre, but a mil is under a fortieth of one.',
    from: 'mils', to: 'mm',
  },
  'angstrom-nm': {
    title: 'Angstroms to nanometres', desc: 'Convert angstroms and nanometres both ways',
    long: 'One angstrom is 0.1 nanometres. Atomic diameters and chemical bond lengths mostly fall between one and three angstroms, which is why crystallography and spectroscopy leaned on it.',
    note: 'It is not an SI unit, so journals prefer nanometres or picometres. Check which one a figure is quoting.',
    from: 'Å', to: 'nm',
  },
  'pennyweight-g': {
    title: 'Pennyweights to grams', desc: 'Convert the precious-metal pennyweight to grams',
    long: 'One pennyweight (dwt) is 1.55517384 g, and twenty of them make a troy ounce. North American jewellers and dental alloy suppliers still quote it.',
    note: 'It rests on the troy ounce (31.1035 g), not the ordinary ounce (28.35 g). Mixing the two throws the weight off by nearly ten percent.',
    from: 'dwt', to: 'g',
  },
  'tola-g': {
    title: 'Tolas to grams', desc: 'Convert the South Asian gold tola to grams',
    long: 'One tola is 11.6638038 g, taken from the weight of an old Indian silver rupee. Jewellers in India, Pakistan and Bangladesh still price gold by it.',
    note: 'Some places reckon it as 11.34 g instead, depending on country and era. Confirm the local figure before trading.',
    from: 'tola', to: 'g',
  },
  'gill-ml': {
    title: 'Gills to millilitres', desc: 'Convert the imperial gill to millilitres',
    long: 'An imperial gill is 142.0653125 mL, or five fluid ounces. It turns up in old cookbooks and in spirit measures, and British pubs still pour by it.',
    note: 'The US gill is 118.29 mL — a different quantity. With an old recipe, check which side of the Atlantic it came from.',
    from: 'gills', to: 'mL',
  },
  'impgallon-l': {
    title: 'Imperial gallons to litres', desc: 'Convert the imperial gallon to litres',
    long: 'An imperial gallon is exactly 4.54609 L. Used in the UK, Ireland and parts of the Caribbean, it runs twenty percent larger than the US gallon of 3.785 L.',
    note: 'This is where fuel economy comparisons go wrong most often. Imperial mpg always looks higher than US mpg without the car being any more efficient.',
    from: 'gal', to: 'L',
  },
  'rood-m2': {
    title: 'Roods to square metres', desc: 'Convert the imperial rood to square metres',
    long: 'One rood is 1011.7141056 m², exactly a quarter of an acre. Old British land deeds and farm records list acres, roods and perches side by side.',
    note: 'The same word means a crucifix, which confuses old documents. Only in an area context does it carry this value.',
    from: 'roods', to: 'm²',
  },
  'pace-mile-kmh': {
    title: 'Pace per mile to km/h', desc: 'Convert running pace per mile into speed',
    long: 'Turns minutes per mile into kilometres per hour. Since a mile is 1.609344 km, dividing 96.56 by the pace gives the speed: an eight-minute mile is 12.07 km/h.',
    note: 'This one divides, so the direction flips. A smaller pace number is faster; a larger speed number is faster.',
    from: 'min/mile', to: 'km/h',
  },
  'tib-tb': {
    title: 'TiB to TB', desc: 'Convert binary tebibytes and decimal terabytes',
    long: 'A TiB is two to the fortieth power of bytes while a TB is ten to the twelfth, so one TiB is about 1.0995 TB. That gap is why a 4 TB drive shows up as 3.64 TiB.',
    note: 'No capacity went missing; the two sides simply count differently. Windows labels TiB as TB, while macOS and drive makers use TB.',
    from: 'TiB', to: 'TB',
  },
  'btu-wh': {
    title: 'BTU to watt-hours', desc: 'Convert the heat unit BTU into watt-hours',
    long: 'One BTU is about 0.293071 Wh. North America rates air conditioners and boilers in BTU, so converting to electrical units lets you compare against power draw.',
    note: 'An air conditioner’s "BTU" is nearly always shorthand for BTU per hour. Twelve thousand BTU/h makes one ton of refrigeration.',
    from: 'BTU', to: 'Wh',
  },
};

