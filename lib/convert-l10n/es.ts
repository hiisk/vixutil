// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ConvertL10n } from '../convert-i18n.ts';

/**
 * 단위 변환 100종의 스페인어 문구.
 *
 * 계수는 여기 두지 않는다 — 1인치는 어느 언어에서도 2.54cm이므로 숫자는
 * lib/convert-tools.ts 한 곳에만 있어야 한다.
 *
 * 전통 단위는 그대로 옮기지 않는다. 한국의 근(600g)과 중국의 斤(500g)은 다른
 * 값이고, 스페인어권 독자에게는 "이건 한국 단위다"라는 사실 자체가 필요한 정보다.
 * 반대로 야드·파운드는 스페인에서 쓰지 않으므로 어디서 마주치는 단위인지를 적는다.
 */
export const CONVERT_ES: Record<string, ConvertL10n> = {
  /* ───────── 길이 ───────── */
  'cm-inch': {
    title: 'cm a pulgadas', desc: 'Convierte centímetros y pulgadas en los dos sentidos',
    long: 'Pasa centímetros a pulgadas y al contrario. Sirve para tamaños de pantalla, medidas de ropa y diámetros de rueda, que vienen etiquetados en pulgadas.',
    note: 'Una pulgada son exactamente 2,54 cm. Las "pulgadas" de un monitor miden la diagonal, no el ancho.',
  },
  'm-feet': {
    title: 'Metros a pies', desc: 'Convierte metros y pies en los dos sentidos',
    long: 'Pasa metros a pies y al contrario. Aparece en altitudes de vuelo, alturas de edificios y anuncios inmobiliarios en el extranjero.',
    note: 'Un pie son exactamente 0,3048 m. Los "35.000 pies" que anuncian en cabina son unos 10,7 km.',
  },
  'km-mile': {
    title: 'Kilómetros a millas', desc: 'Convierte kilómetros y millas en los dos sentidos',
    long: 'Pasa kilómetros a millas y al contrario. Los límites de velocidad en Estados Unidos y Reino Unido van en millas, igual que muchas carreras populares.',
    note: 'Una milla son 1,609 km. La media maratón de 13,1 millas equivale a 21,1 km.',
  },
  'mm-inch': {
    title: 'mm a pulgadas', desc: 'Convierte milímetros y pulgadas en los dos sentidos',
    long: 'Pasa milímetros a pulgadas y al contrario. Los tornillos, las tuberías y las brocas se venden con medidas en pulgadas fraccionarias.',
    note: '1/4 de pulgada son 6,35 mm y 1/2 pulgada son 12,7 mm. Las fracciones se convierten mejor pasándolas primero a decimal.',
  },
  'yard-m': {
    title: 'Yardas a metros', desc: 'Convierte yardas y metros en los dos sentidos',
    long: 'Pasa yardas a metros y al contrario. El campo de fútbol americano y las distancias del golf se miden en yardas.',
    note: 'Una yarda son 0,9144 m, así que 100 yardas se quedan algo por debajo de 100 m.',
  },
  'nautical-mile-km': {
    title: 'Millas náuticas a km', desc: 'Convierte millas náuticas y kilómetros',
    long: 'Pasa millas náuticas a kilómetros y al contrario. La navegación marítima y aérea usa millas náuticas porque una equivale a un minuto de latitud.',
    note: 'Una milla náutica son 1,852 km exactos. Un nudo es una milla náutica por hora.',
  },
  'foot-cm': {
    title: 'Pies a cm', desc: 'Convierte pies y centímetros en los dos sentidos',
    long: 'Pasa pies a centímetros y al contrario. La estatura en países anglosajones se da en pies y pulgadas: 5 pies 9 pulgadas son 175 cm.',
    note: 'Un pie son 30,48 cm y se divide en 12 pulgadas. Para la estatura hay que sumar las pulgadas aparte.',
  },
  'micron-mm': {
    title: 'Micrómetros a mm', desc: 'Convierte micrómetros (µm) y milímetros',
    long: 'Pasa micrómetros a milímetros y al contrario. El grosor de una mascarilla filtrante, el diámetro de un cabello o la altura de capa de una impresora 3D se dan en micrómetros.',
    note: 'Un micrómetro es una milésima de milímetro. Un cabello humano ronda los 70 µm, o 0,07 mm.',
  },
  'ri-km': {
    title: 'Ri (里) coreano a km', desc: 'Convierte el ri tradicional coreano a kilómetros',
    long: 'El ri es la unidad de distancia de la Corea antigua y aparece en canciones y refranes. "Los diez mil ri" de las expresiones hechas equivalen a unos 4.000 km.',
    note: 'Un ri son unos 0,393 km. El ri japonés (里) mide casi 3,9 km, diez veces más — no son la misma unidad.',
    from: 'ri', to: 'km',
  },
  'ja-cm': {
    title: 'Ja (자/尺) coreano a cm', desc: 'Convierte el ja tradicional coreano a centímetros',
    long: 'El ja es la unidad de longitud tradicional coreana y todavía se usa para telas y carpintería. Un ja son diez chi (치).',
    note: 'Un ja son unos 30,3 cm, casi lo mismo que un pie. El shaku japonés mide igual, pero el chi chino son 33,3 cm.',
    from: 'ja', to: 'cm',
  },
  'lightyear-km': {
    title: 'Años luz a km', desc: 'Convierte años luz a kilómetros',
    long: 'Un año luz es la distancia que recorre la luz en el vacío durante un año: unos 9,461 billones de kilómetros. Próxima Centauri, la estrella más cercana, está a 4,2 años luz.',
    note: 'El año luz mide distancia, no tiempo. Decir "dentro de unos años luz" no significa nada.',
    from: 'años luz', to: 'km',
  },
  'au-km': {
    title: 'Unidades astronómicas a km', desc: 'Convierte unidades astronómicas (UA) a kilómetros',
    long: 'Una unidad astronómica es la distancia media entre la Tierra y el Sol, unos 149,6 millones de kilómetros. Las distancias dentro del sistema solar se dan en UA.',
    note: 'Júpiter está a unas 5,2 UA y Neptuno a 30 UA. Para distancias entre estrellas la UA se queda corta y se pasa al año luz.',
    from: 'UA', to: 'km',
  },
  'fathom-m': {
    title: 'Brazas a metros', desc: 'Convierte brazas a metros',
    long: 'La braza es la unidad de profundidad marina de la tradición anglosajona y sigue apareciendo en cartas náuticas. Nació como la envergadura de los brazos abiertos.',
    note: 'Una braza son 1,8288 m, es decir 6 pies. Las "veinte mil leguas" de Verne son otra unidad, no brazas.',
    from: 'brazas', to: 'm',
  },
  'furlong-m': {
    title: 'Furlongs a metros', desc: 'Convierte furlongs a metros',
    long: 'El furlong se usa en las carreras de caballos británicas y estadounidenses. Ocho furlongs hacen una milla.',
    note: 'Un furlong son 201,168 m. Una carrera de "seis furlongs" mide unos 1.207 m.',
    from: 'furlongs', to: 'm',
  },
  'chi-cm': {
    title: 'Chi (尺) chino a cm', desc: 'Convierte el chi chino a centímetros',
    long: 'El chi es la unidad de longitud tradicional china y hoy está fijada en un valor redondo del sistema métrico. Se usa en textiles y en medidas de mobiliario.',
    note: 'Un chi son exactamente 33,33 cm. El ja coreano y el shaku japonés miden 30,3 cm — el mismo carácter, tres valores distintos.',
    from: '尺', to: 'cm',
  },
  'sun-cm': {
    title: 'Sun (寸) japonés a cm', desc: 'Convierte el sun japonés a centímetros',
    long: 'El sun es la décima parte del shaku y aparece en carpintería y en medidas de cuchillos japoneses. Una hoja "de ocho sun" mide unos 24 cm.',
    note: 'Un sun son unos 3,03 cm. El chi (치) coreano mide lo mismo, pero el cun chino son 3,33 cm.',
    from: '寸', to: 'cm',
  },
  'point-mm': {
    title: 'Puntos (pt) a mm', desc: 'Convierte puntos tipográficos a milímetros',
    long: 'El punto es la unidad de tamaño de letra en tipografía e imprenta. Un texto "de 12 puntos" mide unos 4,2 mm de altura de cuerpo.',
    note: 'Un punto es 1/72 de pulgada, o 0,3528 mm. El punto de PostScript que usan los ordenadores difiere ligeramente del punto de imprenta antiguo.',
    from: 'pt', to: 'mm',
  },
  'hand-cm': {
    title: 'Manos a cm', desc: 'Convierte manos (hands) a centímetros',
    long: 'La mano es la unidad con la que se mide la altura de los caballos, tomada a la cruz. Un caballo "de 16 manos" mide 162,6 cm.',
    note: 'Una mano son 10,16 cm, es decir 4 pulgadas. Se escribe 16.2 para decir 16 manos y 2 pulgadas — no es un decimal.',
    from: 'manos', to: 'cm',
  },

  /* ───────── 무게 ───────── */
  'kg-lb': {
    title: 'kg a libras', desc: 'Convierte kilogramos y libras en los dos sentidos',
    long: 'Pasa kilogramos a libras y al contrario. El peso corporal, las maletas y los discos de gimnasio se dan en libras en Estados Unidos.',
    note: 'Una libra son 0,4536 kg. Los discos "de 45 libras" del gimnasio son unos 20,4 kg.',
  },
  'g-oz': {
    title: 'Gramos a onzas', desc: 'Convierte gramos y onzas en los dos sentidos',
    long: 'Pasa gramos a onzas y al contrario. Las recetas y los pesos de envío de fuera vienen en onzas.',
    note: 'Una onza son 28,35 g. La onza troy del oro pesa 31,1 g — es otra unidad.',
  },
  'ton-kg': {
    title: 'Toneladas a kg', desc: 'Convierte toneladas y kilogramos',
    long: 'Pasa toneladas métricas a kilogramos y al contrario. Se usa en carga, capacidad de camiones y peso de maquinaria.',
    note: 'Una tonelada métrica son 1.000 kg. La tonelada corta estadounidense (907 kg) y la larga británica (1.016 kg) son distintas.',
  },
  'don-g': {
    title: 'Don (돈) coreano a gramos', desc: 'Convierte el don, la unidad coreana de joyería',
    long: 'El don es la unidad con la que se pesa el oro y la plata en Corea. Los anillos de bebé y las alianzas se venden por don.',
    note: 'Un don son 3,75 g. Un anillo de "un don" lleva 3,75 g de oro; para saber el precio hay que multiplicar por la cotización del gramo.',
    from: 'don', to: 'g',
  },
  'nyang-g': {
    title: 'Nyang (냥) coreano a gramos', desc: 'Convierte el nyang tradicional coreano a gramos',
    long: 'El nyang equivale a diez don y aparece en medicina tradicional y en textos históricos coreanos.',
    note: 'Un nyang son 37,5 g. El tael chino (兩) son 50 g y el japonés unos 37,5 g — conviene comprobar el origen.',
    from: 'nyang', to: 'g',
  },
  'geun-g': {
    title: 'Geun (근) coreano a gramos', desc: 'Convierte el geun coreano a gramos',
    long: 'El geun se sigue usando en las carnicerías y fruterías coreanas. Ojo: no vale lo mismo para todo.',
    note: 'La carne va a 600 g por geun, pero las verduras y la fruta a 375 g. Si el puesto no lo aclara, hay que preguntar.',
    from: 'geun', to: 'g',
  },
  'kwan-kg': {
    title: 'Kwan (관) coreano a kg', desc: 'Convierte el kwan tradicional coreano a kilogramos',
    long: 'El kwan es la unidad de peso grande de Corea y Japón, y todavía se oye en lonjas y mercados mayoristas.',
    note: 'Un kwan son 3,75 kg, es decir cien don. El kan japonés (貫) vale lo mismo.',
    from: 'kwan', to: 'kg',
  },
  'carat-g': {
    title: 'Quilates a gramos', desc: 'Convierte quilates a gramos',
    long: 'El quilate es la unidad con la que se pesan las piedras preciosas. Un diamante "de un quilate" pesa 0,2 g.',
    note: 'Ojo con la palabra: el quilate de peso (ct) no es el kilate de pureza del oro (K). El oro de 18K es una proporción, no un peso.',
  },
  'stone-kg': {
    title: 'Stones a kg', desc: 'Convierte stones a kilogramos',
    long: 'El stone es la unidad con la que los británicos dan el peso corporal. "11 stone 4" son 71,7 kg.',
    note: 'Un stone son 6,35 kg, es decir 14 libras. En Estados Unidos no se usa: allí el peso va en libras sueltas.',
  },
  'troyounce-g': {
    title: 'Onzas troy a gramos', desc: 'Convierte onzas troy a gramos',
    long: 'La onza troy es la unidad con la que se cotizan el oro, la plata y el platino. El precio del oro que sale en las noticias es por onza troy.',
    note: 'Una onza troy son 31,1035 g, un 10% más que la onza normal (28,35 g). Confundirlas altera el precio.',
    from: 'oz troy', to: 'g',
  },
  'grain-g': {
    title: 'Granos a gramos', desc: 'Convierte granos (grains) a gramos',
    long: 'El grano es la unidad de masa más pequeña de la tradición anglosajona y se usa en munición y en dosis de medicamentos. Nació como el peso de un grano de cebada.',
    note: 'Un grano son 0,0648 g. Una bala "de 55 granos" pesa unos 3,6 g.',
    from: 'granos', to: 'g',
  },
  'dram-g': {
    title: 'Dracmas a gramos', desc: 'Convierte dracmas (drams) a gramos',
    long: 'El dracma es una unidad pequeña del sistema anglosajón y aparece en perfumería y en cargas de pólvora.',
    note: 'Un dracma son 1,772 g, es decir 1/16 de onza. El dracma de volumen (fluid dram) es otra cosa.',
    from: 'dracmas', to: 'g',
  },
  'jin-g': {
    title: 'Jin (斤) chino a gramos', desc: 'Convierte el jin chino a gramos',
    long: 'El jin es la unidad de peso del día a día en China: la verdura y la carne se venden por jin en los mercados.',
    note: 'Un jin chino son exactamente 500 g. El geun coreano son 600 g para la carne — el mismo carácter, valores distintos.',
    from: '斤', to: 'g',
  },
  'momme-g': {
    title: 'Momme (匁) a gramos', desc: 'Convierte el momme japonés a gramos',
    long: 'El momme es la unidad japonesa con la que se pesan las perlas y la seda. El gramaje de la seda se indica en momme.',
    note: 'Un momme son 3,75 g, lo mismo que un don coreano. Una seda "de 19 momme" es un gramaje por metro cuadrado.',
    from: '匁', to: 'g',
  },
  'longton-kg': {
    title: 'Toneladas largas a kg', desc: 'Convierte toneladas largas británicas a kilogramos',
    long: 'La tonelada larga es la unidad de peso grande británica y aparece en desplazamiento de buques y en cargas antiguas.',
    note: 'Una tonelada larga son 1.016 kg, algo más que la métrica. La tonelada corta estadounidense son 907 kg.',
    from: 'toneladas largas', to: 'kg',
  },
  'shortton-kg': {
    title: 'Toneladas cortas a kg', desc: 'Convierte toneladas cortas estadounidenses a kilogramos',
    long: 'La tonelada corta es la que se entiende por "tonelada" en Estados Unidos: pesos de camiones y de materiales.',
    note: 'Una tonelada corta son 907,18 kg, es decir 2.000 libras — un 9% menos que la tonelada métrica.',
    from: 'toneladas cortas', to: 'kg',
  },
  'mcg-mg': {
    title: 'μg a mg', desc: 'Convierte microgramos y miligramos',
    long: 'Pasa microgramos a miligramos y al contrario. Las dosis de vitaminas y medicamentos mezclan las dos unidades.',
    note: 'Un miligramo son 1.000 microgramos. Confundir mcg con mg supone un error de mil veces en la dosis.',
  },

  /* ───────── 부피 ───────── */
  'l-gallon': {
    title: 'Litros a galones', desc: 'Convierte litros y galones en los dos sentidos',
    long: 'Pasa litros a galones y al contrario. El combustible y las bebidas grandes en Estados Unidos van en galones.',
    note: 'Se usa el galón estadounidense: 3,785 L. El galón imperial británico son 4,546 L, un 20% más.',
  },
  'ml-floz': {
    title: 'mL a onzas líquidas', desc: 'Convierte mililitros y onzas líquidas',
    long: 'Pasa mililitros a onzas líquidas y al contrario. La cosmética y las bebidas importadas vienen en fl oz.',
    note: 'Se usa la onza líquida estadounidense: 29,57 mL. La británica son 28,41 mL.',
  },
  'doe-l': {
    title: 'Doe (되) coreano a litros', desc: 'Convierte el doe tradicional coreano a litros',
    long: 'El doe es la medida de grano y licor de Corea. El makgeolli y los cereales se siguen vendiendo por doe en los mercados.',
    note: 'Un doe son 1,8 L. El shō japonés (升) mide lo mismo, unos 1,8 L.',
    from: 'doe', to: 'L',
  },
  'mal-l': {
    title: 'Mal (말) coreano a litros', desc: 'Convierte el mal tradicional coreano a litros',
    long: 'El mal equivale a diez doe y se usa para grano al por mayor. "Un mal de arroz" son unos 18 L, es decir 8 kg.',
    note: 'Un mal son 18 L. Al pasarlo a peso depende del grano: el arroz pesa unos 8 kg por mal.',
    from: 'mal', to: 'L',
  },
  'cup-ml': {
    title: 'Tazas a mL', desc: 'Convierte tazas de cocina y mililitros',
    long: 'Pasa tazas a mililitros y al contrario. Las recetas de fuera se escriben en tazas.',
    note: 'La taza estadounidense son 240 mL y la métrica 200 mL. La diferencia del 20% se nota en repostería.',
    from: 'taza', to: 'mL',
  },
  'barrel-l': {
    title: 'Barriles a litros', desc: 'Convierte barriles de petróleo a litros',
    long: 'Pasa barriles a litros y al contrario. El precio del crudo que sale en las noticias es por barril.',
    note: 'Un barril de petróleo son 158,99 L. El barril de cerveza es otra medida — 117 L en Estados Unidos.',
  },
  'cubicm-l': {
    title: 'Metros cúbicos a litros', desc: 'Convierte metros cúbicos y litros',
    long: 'Pasa metros cúbicos a litros y al contrario. El consumo de agua y de gas de la factura viene en metros cúbicos.',
    note: 'Un metro cúbico son exactamente 1.000 L. Un consumo de "15 m³" en la factura del agua son 15.000 L.',
  },
  'tbsp-ml': {
    title: 'Cucharadas a mL', desc: 'Convierte cucharadas soperas y mililitros',
    long: 'Pasa cucharadas a mililitros y al contrario. Las recetas y las dosis de jarabe usan cucharadas.',
    note: 'Una cucharada son 15 mL. La cucharada australiana son 20 mL — conviene mirar el origen de la receta.',
    from: 'cda', to: 'mL',
  },
  'tsp-ml': {
    title: 'Cucharaditas a mL', desc: 'Convierte cucharaditas y mililitros',
    long: 'Pasa cucharaditas a mililitros y al contrario. Aparece en recetas y en las cantidades pequeñas de la cocina.',
    note: 'Una cucharadita son 5 mL, es decir un tercio de cucharada. Las cucharas de la mesa no dan la medida exacta.',
    from: 'cdta', to: 'mL',
  },
  'pint-l': {
    title: 'Pintas a litros', desc: 'Convierte pintas a litros',
    long: 'La pinta es la medida con la que se sirve la cerveza en pubs británicos e irlandeses. También sale en helados y nata en Estados Unidos.',
    note: 'La pinta británica son 568 mL y la estadounidense 473 mL. Una pinta de cerveza en Londres trae 100 mL más.',
    from: 'pintas', to: 'L',
  },
  'quart-l': {
    title: 'Cuartos a litros', desc: 'Convierte cuartos (quarts) a litros',
    long: 'El cuarto son dos pintas y aparece en leche, aceite de motor y ollas en Estados Unidos.',
    note: 'El cuarto estadounidense son 946 mL, casi un litro. El británico son 1,137 L.',
    from: 'cuartos', to: 'L',
  },
  'cc-ml': {
    title: 'cc a mL', desc: 'Convierte centímetros cúbicos y mililitros',
    long: 'El cc y el mL son exactamente lo mismo. La cilindrada de las motos y los volúmenes de jeringuillas se dan en cc.',
    note: '1 cc = 1 mL, siempre. Una moto "de 125 cc" tiene 125 mL de cilindrada.',
    from: 'cc', to: 'mL',
  },
  'hop-ml': {
    title: 'Hop (홉) coreano a mL', desc: 'Convierte el hop tradicional coreano a mililitros',
    long: 'El hop es la décima parte del doe y sale en las botellas de soju y en las medidas de arroz.',
    note: 'Un hop son 180 mL. La botella de soju de 360 mL son justo dos hop.',
    from: 'hop', to: 'mL',
  },
  'bushel-l': {
    title: 'Bushels a litros', desc: 'Convierte bushels a litros',
    long: 'El bushel es la medida con la que se comercia el grano en Estados Unidos. Las cotizaciones de maíz y soja van por bushel.',
    note: 'Un bushel son 35,24 L. Como es una medida de volumen, el peso cambia según el grano: el maíz pesa unos 25,4 kg por bushel.',
    from: 'bushels', to: 'L',
  },

  /* ───────── 넓이 ───────── */
  'pyeong-m2': {
    title: 'Pyeong (평) a m²', desc: 'Convierte el pyeong coreano a metros cuadrados',
    long: 'El pyeong es la unidad con la que se habla de superficie de vivienda en Corea. Los anuncios oficiales van en m², pero la conversación sigue siendo en pyeong.',
    note: 'Un pyeong son 3,3058 m². Un piso "de 84 m²" son unos 25 pyeong. El tsubo japonés vale lo mismo.',
    from: 'pyeong', to: 'm²',
  },
  'm2-sqft': {
    title: 'm² a pies cuadrados', desc: 'Convierte metros cuadrados y pies cuadrados',
    long: 'Pasa metros cuadrados a pies cuadrados y al contrario. Los anuncios inmobiliarios en Estados Unidos van en pies cuadrados.',
    note: 'Un metro cuadrado son 10,764 pies cuadrados. Un apartamento "de 1.000 sq ft" son unos 93 m².',
  },
  'acre-m2': {
    title: 'Acres a m²', desc: 'Convierte acres y metros cuadrados',
    long: 'Pasa acres a metros cuadrados y al contrario. Las fincas y los terrenos en países anglosajones se miden en acres.',
    note: 'Un acre son 4.047 m², algo más de la mitad de un campo de fútbol. Una hectárea son 2,47 acres.',
  },
  'hectare-m2': {
    title: 'Hectáreas a m²', desc: 'Convierte hectáreas y metros cuadrados',
    long: 'Pasa hectáreas a metros cuadrados y al contrario. La hectárea es la unidad internacional para terrenos agrícolas y forestales.',
    note: 'Una hectárea son 10.000 m², es decir un cuadrado de 100 por 100 metros.',
  },
  'danbo-m2': {
    title: 'Danbo (단보) a m²', desc: 'Convierte el danbo tradicional coreano a metros cuadrados',
    long: 'El danbo es la unidad de superficie agrícola de Corea y equivale a 300 pyeong. Los rendimientos de arroz se dan por danbo.',
    note: 'Un danbo son 991,7 m², casi una décima de hectárea. Diez danbo hacen un jeongbo (정보).',
    from: 'danbo', to: 'm²',
  },
  'majigi-pyeong': {
    title: 'Majigi (마지기) a pyeong', desc: 'Convierte el majigi tradicional coreano a pyeong',
    long: 'El majigi es la superficie que se siembra con un mal de semilla, así que su tamaño cambia según la región y el cultivo.',
    note: 'Suele tomarse como 200 pyeong para arrozal, pero en algunas zonas son 150 y en otras 300. Es una medida aproximada.',
    from: 'majigi', to: 'pyeong',
  },
  'sqinch-cm2': {
    title: 'Pulgadas cuadradas a cm²', desc: 'Convierte pulgadas cuadradas a centímetros cuadrados',
    long: 'La pulgada cuadrada aparece en superficies de impresión, sensores de cámara y áreas de contacto.',
    note: 'Una pulgada cuadrada son 6,4516 cm². Al elevar al cuadrado, el factor de 2,54 se convierte en 6,45.',
    from: 'in²', to: 'cm²',
  },
  'sqyard-m2': {
    title: 'Yardas cuadradas a m²', desc: 'Convierte yardas cuadradas a metros cuadrados',
    long: 'La yarda cuadrada se usa para moqueta, tela y superficies de jardín en países anglosajones.',
    note: 'Una yarda cuadrada son 0,8361 m², algo menos que un metro cuadrado.',
    from: 'yd²', to: 'm²',
  },
  'sqmile-km2': {
    title: 'Millas cuadradas a km²', desc: 'Convierte millas cuadradas a kilómetros cuadrados',
    long: 'La milla cuadrada se usa para superficies de ciudades y condados, y para extensiones de incendios.',
    note: 'Una milla cuadrada son 2,59 km². Al elevar al cuadrado, el factor 1,609 se convierte en 2,59.',
    from: 'mi²', to: 'km²',
  },
  'are-m2': {
    title: 'Áreas (a) a m²', desc: 'Convierte áreas a metros cuadrados',
    long: 'El área es la centésima parte de la hectárea y aparece en catastros y en parcelas pequeñas.',
    note: 'Un área son exactamente 100 m². Cien áreas hacen una hectárea.',
    from: 'a', to: 'm²',
  },
  'mu-m2': {
    title: 'Mu (畝) chino a m²', desc: 'Convierte el mu chino a metros cuadrados',
    long: 'El mu es la unidad de superficie agrícola de China y se usa a diario en el campo y en las estadísticas.',
    note: 'Un mu son unos 666,7 m². Quince mu hacen una hectárea.',
    from: '畝', to: 'm²',
  },

  /* ───────── 온도 ───────── */
  'celsius-fahrenheit': {
    title: 'Celsius a Fahrenheit', desc: 'Convierte grados centígrados y Fahrenheit',
    long: 'Pasa centígrados a Fahrenheit y al contrario. Las previsiones del tiempo y los hornos en Estados Unidos van en Fahrenheit.',
    note: 'La fórmula es °F = °C × 1,8 + 32. Hay un desplazamiento de 32, así que no basta con multiplicar.',
    from: '°C', to: '°F',
  },
  'celsius-kelvin': {
    title: 'Celsius a Kelvin', desc: 'Convierte grados centígrados y kelvin',
    long: 'Pasa centígrados a kelvin y al contrario. La física y la temperatura de color de las bombillas usan kelvin.',
    note: 'K = °C + 273,15. El cero absoluto (0 K) son −273,15 °C, y por debajo no existe temperatura.',
    from: '°C', to: 'K',
  },
  'fahrenheit-kelvin': {
    title: '°F a kelvin', desc: 'Convierte grados Fahrenheit y kelvin',
    long: 'Pasa Fahrenheit a kelvin y al contrario. Hace falta al leer artículos técnicos estadounidenses en unidades absolutas.',
    note: 'Primero se pasa a centígrados y luego se suman 273,15. La escala Fahrenheit avanza 1,8 veces más despacio.',
    from: '°F', to: 'K',
  },
  'celsius-rankine': {
    title: '°C a Rankine (°R)', desc: 'Convierte grados centígrados y Rankine',
    long: 'La escala Rankine es la escala absoluta con los grados del Fahrenheit, y aparece en termodinámica e ingeniería estadounidense.',
    note: 'El cero de Rankine coincide con el cero absoluto y sus grados equivalen a los Fahrenheit. 0 °C son 491,67 °R.',
    from: '°C', to: '°R',
  },

  /* ───────── 속도 ───────── */
  'kmh-mph': {
    title: 'km/h a mph', desc: 'Convierte kilómetros por hora y millas por hora',
    long: 'Pasa km/h a mph y al contrario. Los límites de velocidad en Estados Unidos y Reino Unido van en mph.',
    note: '60 mph son 96,6 km/h. La "60" del velocímetro estadounidense está cerca de nuestros 100 km/h.',
  },
  'ms-kmh': {
    title: 'm/s a km/h', desc: 'Convierte metros por segundo y kilómetros por hora',
    long: 'Pasa m/s a km/h y al contrario. La velocidad del viento en los partes meteorológicos va en m/s.',
    note: 'Se multiplica por 3,6. Un viento de 10 m/s son 36 km/h — un aviso por viento fuerte.',
  },
  'knot-kmh': {
    title: 'Nudos a km/h', desc: 'Convierte nudos y kilómetros por hora',
    long: 'Pasa nudos a km/h y al contrario. Barcos, aviones y avisos de tifón usan nudos.',
    note: 'Un nudo son 1,852 km/h, es decir una milla náutica por hora.',
  },
  'mach-kmh': {
    title: 'Mach a km/h', desc: 'Convierte números Mach y kilómetros por hora',
    long: 'Pasa Mach a km/h y al contrario. La velocidad de los cazas se da en múltiplos de la del sonido.',
    note: 'Se toma Mach 1 = 1.225 km/h al nivel del mar. En altura el aire está más frío y la velocidad del sonido baja, así que el valor real cambia.',
  },
  'mph-ms': {
    title: 'mph a m/s', desc: 'Convierte millas por hora y metros por segundo',
    long: 'Pasa mph a m/s y al contrario. Hace falta al comparar velocidades de viento o de lanzamiento entre fuentes.',
    note: 'Una mph son 0,447 m/s. Una recta de 100 mph son unos 44,7 m/s.',
    from: 'mph', to: 'm/s',
  },
  'pace-kmh': {
    title: 'Ritmo de carrera a km/h', desc: 'Convierte minutos por kilómetro y km/h',
    long: 'Pasa el ritmo (min/km) a velocidad (km/h) y al contrario. Los relojes deportivos muestran ritmo y las cintas de correr velocidad.',
    note: 'Es una relación inversa: un ritmo de 5 min/km son 12 km/h, y de 6 min/km son 10 km/h. Cuanto menor el ritmo, mayor la velocidad.',
    from: 'min/km', to: 'km/h',
  },
  'fps-ms': {
    title: 'ft/s a m/s', desc: 'Convierte pies por segundo y metros por segundo',
    long: 'Pasa pies por segundo a metros por segundo y al contrario. Aparece en velocidad de proyectiles y en física estadounidense.',
    note: 'Un pie por segundo son 0,3048 m/s. Una velocidad de "1.000 ft/s" son unos 305 m/s.',
    from: 'ft/s', to: 'm/s',
  },

  /* ───────── 데이터 ───────── */
  'mb-gb': {
    title: 'MB a GB', desc: 'Convierte megabytes y gigabytes',
    long: 'Pasa megabytes a gigabytes y al contrario. Tamaños de archivo, cuotas de datos móviles y capacidades de disco.',
    note: 'Aquí 1 GB = 1.000 MB (decimal). Windows cuenta 1.024, y por eso un disco "de 1 TB" aparece como 931 GB.',
  },
  'gb-tb': {
    title: 'GB a TB', desc: 'Convierte gigabytes y terabytes',
    long: 'Pasa gigabytes a terabytes y al contrario. Discos duros, SSD y almacenamiento en la nube.',
    note: '1 TB = 1.000 GB en el criterio decimal del fabricante. El sistema operativo lo cuenta en 1.024 y muestra menos.',
  },
  'mbps-mbs': {
    title: 'Mbps a MB/s', desc: 'Convierte velocidad de red y velocidad de descarga',
    long: 'Pasa Mbps a MB/s y al contrario. Las operadoras anuncian bits por segundo y los gestores de descarga muestran bytes por segundo.',
    note: 'Se divide por 8: una línea de 100 Mbps descarga a unos 12,5 MB/s como máximo. No es que te estén engañando, son unidades distintas.',
  },
  'kb-mb': {
    title: 'KB a MB', desc: 'Convierte kilobytes y megabytes',
    long: 'Pasa kilobytes a megabytes y al contrario. Adjuntos de correo, imágenes y límites de subida.',
    note: 'Aquí 1 MB = 1.000 KB. En el criterio binario son 1.024 KB, y en archivos pequeños la diferencia se nota poco.',
  },
  'byte-bit': {
    title: 'Bytes a bits', desc: 'Convierte bytes y bits',
    long: 'Pasa bytes a bits y al contrario. La red se mide en bits y el almacenamiento en bytes.',
    note: 'Un byte son 8 bits. La B mayúscula es byte y la b minúscula bit: Mbps y MBps no son lo mismo.',
  },
  'tb-pb': {
    title: 'TB a PB', desc: 'Convierte terabytes y petabytes',
    long: 'Pasa terabytes a petabytes y al contrario. Aparece en centros de datos y en volúmenes de copias de seguridad.',
    note: '1 PB = 1.000 TB en criterio decimal. Un petabyte cabría en unos mil discos de 1 TB.',
  },
  'kib-kb': {
    title: 'KiB a KB', desc: 'Convierte kibibytes y kilobytes',
    long: 'El KiB es la unidad binaria (1.024 bytes) y el KB la decimal (1.000 bytes). Es la raíz de que el sistema y el fabricante den cifras distintas.',
    note: '1 KiB = 1,024 KB. La diferencia es del 2,4% aquí, pero crece con cada escalón: en TiB ya pasa del 10%.',
    from: 'KiB', to: 'KB',
  },
  'mib-mb': {
    title: 'MiB a MB', desc: 'Convierte mebibytes y megabytes',
    long: 'El MiB son 1.048.576 bytes y el MB 1.000.000. Linux y muchas herramientas muestran MiB aunque escriban "MB".',
    note: '1 MiB = 1,049 MB. Una imagen de disco "de 700 MB" suele ser en realidad 700 MiB, o 734 MB.',
    from: 'MiB', to: 'MB',
  },
  'gib-gb': {
    title: 'GiB a GB', desc: 'Convierte gibibytes y gigabytes',
    long: 'El GiB es la unidad binaria y el GB la decimal. Es la razón exacta de que un disco de 1 TB aparezca como 931 GB.',
    note: '1 GiB = 1,074 GB. La diferencia es del 7,4%: los 931 "GB" que muestra Windows son en realidad 931 GiB.',
    from: 'GiB', to: 'GB',
  },

  /* ───────── 에너지 ───────── */
  'kcal-kj': {
    title: 'Calorías a kilojulios', desc: 'Convierte kilocalorías y kilojulios',
    long: 'Pasa kilocalorías a kilojulios y al contrario. Las etiquetas nutricionales europeas y australianas dan kJ.',
    note: 'Una kcal son 4,184 kJ. Las "2.000 kcal" diarias son unos 8.370 kJ.',
  },
  'kw-hp': {
    title: 'kW a caballos', desc: 'Convierte kilovatios y caballos de vapor',
    long: 'Pasa kilovatios a caballos y al contrario. La potencia de los coches se da en caballos y la de los eléctricos en kW.',
    note: 'Se usa el caballo métrico (PS): 1 kW = 1,36 PS. El caballo británico (hp) es un 1,4% mayor.',
  },
  'kwh-mj': {
    title: 'kWh a megajulios', desc: 'Convierte kilovatios hora y megajulios',
    long: 'Pasa kWh a MJ y al contrario. La factura de la luz va en kWh y los cálculos físicos en julios.',
    note: 'Un kWh son 3,6 MJ. Es la energía de mantener 1.000 W durante una hora.',
  },
  'joule-cal': {
    title: 'Julios a calorías', desc: 'Convierte julios y calorías',
    long: 'Pasa julios a calorías y al contrario. Los ejercicios de física y las etiquetas de alimentos usan unidades distintas para lo mismo.',
    note: 'Un julio son 0,239 calorías. La "caloría" de los alimentos es en realidad la kilocaloría, mil veces mayor.',
  },
  'wh-joule': {
    title: 'Wh a julios', desc: 'Convierte vatios hora y julios',
    long: 'Pasa vatios hora a julios y al contrario. La capacidad de las baterías se da en Wh, y los límites de las aerolíneas también.',
    note: 'Un Wh son 3.600 J. Las aerolíneas suelen permitir baterías de hasta 100 Wh en cabina.',
    from: 'Wh', to: 'J',
  },
  'btu-kj': {
    title: 'BTU a kJ', desc: 'Convierte BTU y kilojulios',
    long: 'El BTU es la unidad de calor anglosajona y se usa en potencia de aires acondicionados y calderas.',
    note: 'Un BTU son 1,055 kJ. Un aire "de 12.000 BTU" equivale a una tonelada de refrigeración, unos 3,5 kW.',
    from: 'BTU', to: 'kJ',
  },
  'kcal-kwh': {
    title: 'kcal a kWh', desc: 'Convierte kilocalorías y kilovatios hora',
    long: 'Pasa kilocalorías a kilovatios hora y al contrario. Sirve para comparar la energía de los alimentos con el consumo eléctrico.',
    note: 'Una kcal son 0,00116 kWh. Las 2.000 kcal que comemos al día son solo 2,3 kWh — menos que una lavadora.',
    from: 'kcal', to: 'kWh',
  },
  'therm-kwh': {
    title: 'Therms a kWh', desc: 'Convierte therms y kilovatios hora',
    long: 'El therm es la unidad con la que se factura el gas en Estados Unidos y Reino Unido. Sirve para comparar la factura del gas con la de la luz.',
    note: 'Un therm son 29,3 kWh, es decir 100.000 BTU. Un therm da mucha más energía que un kWh de electricidad.',
    from: 'therm', to: 'kWh',
  },

  /* ───────── 압력·기타 ───────── */
  'bar-psi': {
    title: 'bar a psi', desc: 'Convierte bar y psi',
    long: 'Pasa bar a psi y al contrario. La presión de los neumáticos y los manómetros mezclan las dos unidades.',
    note: 'Un bar son 14,5 psi. Los 2,2 bar recomendados para un neumático son unos 32 psi.',
  },
  'hpa-mmhg': {
    title: 'hPa a mmHg', desc: 'Convierte hectopascales y milímetros de mercurio',
    long: 'Pasa hPa a mmHg y al contrario. Los partes meteorológicos usan hPa y la presión arterial mmHg.',
    note: 'Un hPa son 0,75 mmHg. La presión atmosférica normal, 1.013 hPa, son 760 mmHg.',
  },
  'mpg-kmpl': {
    title: 'mpg a km/L', desc: 'Convierte millas por galón y kilómetros por litro',
    long: 'Pasa mpg estadounidenses a km/L y al contrario. Hace falta al leer pruebas de coches extranjeras.',
    note: 'Se usa el galón estadounidense: 30 mpg son unos 12,8 km/L. Las cifras británicas salen un 20% más altas, así que hay que comprobar la fuente.',
  },
  'atm-kpa': {
    title: 'Atmósferas a kPa', desc: 'Convierte atmósferas y kilopascales',
    long: 'La atmósfera es la presión al nivel del mar y se usa en buceo y en química.',
    note: 'Una atmósfera son 101,325 kPa. Bajo el agua se suma una atmósfera cada 10 m de profundidad.',
    from: 'atm', to: 'kPa',
  },
  'psi-kpa': {
    title: 'psi a kPa', desc: 'Convierte psi y kilopascales',
    long: 'Pasa psi a kilopascales y al contrario. Los manuales de coches y las herramientas de aire comprimido usan psi.',
    note: 'Un psi son 6,895 kPa. Los 32 psi de un neumático son unos 220 kPa.',
    from: 'psi', to: 'kPa',
  },
  'torr-pa': {
    title: 'Torr a pascales', desc: 'Convierte torr y pascales',
    long: 'El torr equivale a un milímetro de mercurio y se usa en tecnología de vacío y en laboratorios.',
    note: 'Un torr son 133,3 Pa. La presión atmosférica son 760 torr.',
    from: 'torr', to: 'Pa',
  },
  'inhg-hpa': {
    title: 'inHg a hPa', desc: 'Convierte pulgadas de mercurio y hectopascales',
    long: 'Las pulgadas de mercurio son la unidad de presión de los partes meteorológicos y de aviación estadounidenses.',
    note: 'Una pulgada de mercurio son 33,86 hPa. El ajuste altimétrico estándar, 29,92 inHg, son 1.013 hPa.',
    from: 'inHg', to: 'hPa',
  },

  /* ───────── 시간 ───────── */
  'frame-sec': {
    title: 'Fotogramas a segundos (30 fps)', desc: 'Convierte fotogramas de vídeo y segundos',
    long: 'Pasa fotogramas a segundos y al contrario, a 30 fps. Sirve al leer códigos de tiempo en edición de vídeo.',
    note: 'A 30 fps, 90 fotogramas son 3 segundos. A 24 o 60 fps la cuenta cambia, así que hay que mirar los fps del material.',
    from: 'fotogramas', to: 's',
  },
  'bpm-ms': {
    title: 'BPM a ms por pulso', desc: 'Convierte tempo musical y duración de un pulso',
    long: 'Pasa pulsos por minuto a milisegundos por pulso y al contrario. Los tiempos de delay y reverb en producción musical se ajustan en ms.',
    note: 'Es una relación inversa: 120 BPM son 500 ms por pulso. Un delay a la negra a ese tempo se pone en 500 ms.',
    from: 'BPM', to: 'ms',
  },
  'ms-sec': {
    title: 'ms a segundos', desc: 'Convierte milisegundos y segundos',
    long: 'Pasa milisegundos a segundos y al contrario. Latencias de red, tiempos de reacción y ajustes de animación.',
    note: 'Un segundo son 1.000 ms. Un ping de 50 ms es 0,05 segundos.',
    from: 'ms', to: 's',
  },

  /* ───────── 각도 ───────── */
  'degree-gradian': {
    title: 'Grados a gradianes (gon)', desc: 'Convierte grados sexagesimales y gradianes',
    long: 'El gradián divide el ángulo recto en 100 partes y se usa en topografía e ingeniería civil europea.',
    note: '90 grados son 100 gon. La calculadora tiene un modo GRAD para esto — si el resultado sale raro, mira en qué modo está.',
    from: '°', to: 'gon',
  },
  'arcmin-degree': {
    title: 'Minutos de arco a grados', desc: 'Convierte minutos de arco y grados',
    long: 'El minuto de arco es la sexagésima parte de un grado y se usa en astronomía, óptica y coordenadas.',
    note: 'Un minuto de arco es 1/60 de grado. La Luna vista desde la Tierra mide unos 31 minutos de arco.',
    from: '′', to: '°',
  },
  'mil-mm': {
    title: 'Mils a mm', desc: 'Convierte mils (thou) y milímetros en los dos sentidos',
    long: 'Un mil es la milésima parte de una pulgada, es decir 0,0254 mm. Los planos estadounidenses lo usan para anchos de pista, espesores de lámina y capas de pintura.',
    note: 'También se llama thou: es la misma unidad. El nombre recuerda a milímetro, pero un mil no llega ni a la cuarentava parte.',
    from: 'mils', to: 'mm',
  },
  'angstrom-nm': {
    title: 'Ångströms a nanómetros', desc: 'Convierte ångströms y nanómetros en los dos sentidos',
    long: 'Un ångström son 0,1 nanómetros. Los diámetros atómicos y las longitudes de enlace caen casi siempre entre uno y tres ångströms, de ahí su uso en cristalografía.',
    note: 'No es una unidad del SI, así que las revistas prefieren nanómetros o picómetros. Comprueba cuál cita cada figura.',
    from: 'Å', to: 'nm',
  },
  'pennyweight-g': {
    title: 'Pennyweights a gramos', desc: 'Convierte el pennyweight de metales preciosos a gramos',
    long: 'Un pennyweight (dwt) son 1,55517384 g, y veinte hacen una onza troy. Joyeros norteamericanos y proveedores de aleaciones dentales aún lo citan.',
    note: 'Se apoya en la onza troy (31,1035 g), no en la onza común (28,35 g). Mezclarlas desvía el peso casi un diez por ciento.',
    from: 'dwt', to: 'g',
  },
  'tola-g': {
    title: 'Tolas a gramos', desc: 'Convierte la tola del oro surasiático a gramos',
    long: 'Una tola son 11,6638038 g, tomados del peso de una vieja rupia de plata. Los joyeros de India, Pakistán y Bangladés siguen tasando el oro con ella.',
    note: 'En algunos sitios se cuenta como 11,34 g, según el país y la época. Confirma la cifra local antes de comerciar.',
    from: 'tola', to: 'g',
  },
  'gill-ml': {
    title: 'Gills a mililitros', desc: 'Convierte el gill imperial a mililitros',
    long: 'Un gill imperial son 142,0653125 mL, o cinco onzas líquidas. Aparece en recetarios antiguos y en las medidas de licor; los pubs británicos aún sirven por él.',
    note: 'El gill estadounidense son 118,29 mL, otra cantidad. Ante una receta antigua, mira de qué lado del Atlántico viene.',
    from: 'gills', to: 'mL',
  },
  'impgallon-l': {
    title: 'Galones imperiales a litros', desc: 'Convierte el galón imperial a litros',
    long: 'Un galón imperial son exactamente 4,54609 L. Usado en el Reino Unido, Irlanda y parte del Caribe, es un veinte por ciento mayor que el galón estadounidense de 3,785 L.',
    note: 'Aquí es donde más fallan las comparaciones de consumo. Las millas por galón imperial siempre parecen mejores sin que el coche gaste menos.',
    from: 'gal', to: 'L',
  },
  'rood-m2': {
    title: 'Roods a metros cuadrados', desc: 'Convierte el rood imperial a metros cuadrados',
    long: 'Un rood son 1011,7141056 m², exactamente un cuarto de acre. Las viejas escrituras británicas listan acres, roods y perches uno al lado del otro.',
    note: 'La misma palabra designa un crucifijo, lo que confunde en documentos antiguos. Solo en contexto de superficie vale esta cifra.',
    from: 'roods', to: 'm²',
  },
  'pace-mile-kmh': {
    title: 'Ritmo por milla a km/h', desc: 'Convierte el ritmo de carrera por milla en velocidad',
    long: 'Pasa minutos por milla a kilómetros por hora. Como una milla son 1,609344 km, dividir 96,56 entre el ritmo da la velocidad: ocho minutos por milla son 12,07 km/h.',
    note: 'Esta división invierte el sentido. Cuanto menor el ritmo más rápido; cuanto mayor la velocidad más rápido.',
    from: 'min/mile', to: 'km/h',
  },
  'tib-tb': {
    title: 'TiB a TB', desc: 'Convierte tebibytes binarios y terabytes decimales',
    long: 'Un TiB son dos elevado a cuarenta bytes y un TB diez elevado a doce, así que un TiB equivale a unos 1,0995 TB. Por eso un disco de 4 TB aparece como 3,64 TiB.',
    note: 'No falta capacidad: cada lado cuenta de otra manera. Windows etiqueta los TiB como TB, mientras macOS y los fabricantes usan TB.',
    from: 'TiB', to: 'TB',
  },
  'btu-wh': {
    title: 'BTU a vatios-hora', desc: 'Convierte la unidad de calor BTU en vatios-hora',
    long: 'Un BTU son unos 0,293071 Wh. Norteamérica mide aires acondicionados y calderas en BTU, así que pasarlo a unidades eléctricas permite compararlo con el consumo.',
    note: 'El "BTU" de un aire acondicionado casi siempre abrevia BTU por hora. Doce mil BTU/h hacen una tonelada de refrigeración.',
    from: 'BTU', to: 'Wh',
  },
};
