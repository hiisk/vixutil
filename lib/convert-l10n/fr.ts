// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ConvertL10n } from '../convert-i18n.ts';

/**
 * 단위 변환 100종의 프랑스어 문구.
 *
 * 계수는 여기 두지 않는다 — 숫자는 lib/convert-tools.ts 한 곳에만 있어야 한다.
 *
 * 프랑스는 미터법의 본가라 야드·파운드 계열은 "어디서 마주치는가"를 앞세운다.
 * 반면 gon(그라드)은 프랑스 측량에서 실제로 쓰는 단위이므로 그 사실을 적는다.
 */
export const CONVERT_FR: Record<string, ConvertL10n> = {
  /* ───────── 길이 ───────── */
  'cm-inch': {
    title: 'cm en pouces', desc: 'Convertit centimètres et pouces dans les deux sens',
    long: 'Passe des centimètres aux pouces et inversement. Utile pour les tailles d’écran, les mesures de vêtements et les diamètres de roue, étiquetés en pouces.',
    note: 'Un pouce vaut exactement 2,54 cm. Les "pouces" d’un écran mesurent la diagonale, pas la largeur.',
  },
  'm-feet': {
    title: 'Mètres en pieds', desc: 'Convertit mètres et pieds dans les deux sens',
    long: 'Passe des mètres aux pieds et inversement. On croise ça dans les altitudes de vol, les hauteurs de bâtiments et les annonces immobilières à l’étranger.',
    note: 'Un pied vaut exactement 0,3048 m. Les "35 000 pieds" annoncés en cabine font environ 10,7 km.',
  },
  'km-mile': {
    title: 'Kilomètres en miles', desc: 'Convertit kilomètres et miles dans les deux sens',
    long: 'Passe des kilomètres aux miles et inversement. Les limitations de vitesse aux États-Unis et au Royaume-Uni sont en miles, comme beaucoup de courses sur route.',
    note: 'Un mile vaut 1,609 km. Le semi-marathon de 13,1 miles correspond à 21,1 km.',
  },
  'mm-inch': {
    title: 'mm en pouces', desc: 'Convertit millimètres et pouces dans les deux sens',
    long: 'Passe des millimètres aux pouces et inversement. Vis, tubes et mèches se vendent en fractions de pouce.',
    note: '1/4 de pouce fait 6,35 mm et 1/2 pouce 12,7 mm. Convertis d’abord les fractions en décimal, c’est plus sûr.',
  },
  'yard-m': {
    title: 'Yards en mètres', desc: 'Convertit yards et mètres dans les deux sens',
    long: 'Passe des yards aux mètres et inversement. Le terrain de football américain et les distances de golf se mesurent en yards.',
    note: 'Un yard vaut 0,9144 m, donc 100 yards restent un peu en dessous de 100 m.',
  },
  'nautical-mile-km': {
    title: 'Milles nautiques en km', desc: 'Convertit milles nautiques et kilomètres',
    long: 'Passe des milles nautiques aux kilomètres et inversement. La navigation maritime et aérienne utilise le mille nautique parce qu’il vaut une minute de latitude.',
    note: 'Un mille nautique vaut exactement 1,852 km. Un nœud, c’est un mille nautique par heure.',
  },
  'foot-cm': {
    title: 'Pieds en cm', desc: 'Convertit pieds et centimètres dans les deux sens',
    long: 'Passe des pieds aux centimètres et inversement. La taille dans les pays anglophones s’exprime en pieds et pouces : 5 pieds 9 pouces font 175 cm.',
    note: 'Un pied vaut 30,48 cm et se divise en 12 pouces. Pour une taille, il faut ajouter les pouces séparément.',
  },
  'micron-mm': {
    title: 'Micromètres en mm', desc: 'Convertit micromètres (µm) et millimètres',
    long: 'Passe des micromètres aux millimètres et inversement. La filtration d’un masque, le diamètre d’un cheveu ou la hauteur de couche d’une imprimante 3D s’expriment en micromètres.',
    note: 'Un micromètre vaut un millième de millimètre. Un cheveu fait environ 70 µm, soit 0,07 mm.',
  },
  'ri-km': {
    title: 'Ri (里) coréen en km', desc: 'Convertit le ri traditionnel coréen en kilomètres',
    long: 'Le ri est l’unité de distance de la Corée ancienne et survit dans les chansons et les proverbes. Les "dix mille ri" des expressions font environ 4 000 km.',
    note: 'Un ri coréen vaut environ 0,393 km. Le ri japonais (里) fait près de 3,9 km, dix fois plus — même caractère, autre unité.',
    from: 'ri', to: 'km',
  },
  'ja-cm': {
    title: 'Ja (자/尺) coréen en cm', desc: 'Convertit le ja traditionnel coréen en centimètres',
    long: 'Le ja est l’unité de longueur traditionnelle coréenne, encore utilisée pour les tissus et la menuiserie. Un ja fait dix chi (치).',
    note: 'Un ja vaut environ 30,3 cm, presque un pied. Le shaku japonais mesure pareil, mais le chi chinois fait 33,3 cm.',
    from: 'ja', to: 'cm',
  },
  'lightyear-km': {
    title: 'Années-lumière en km', desc: 'Convertit les années-lumière en kilomètres',
    long: 'Une année-lumière est la distance parcourue par la lumière dans le vide en un an : environ 9 461 milliards de kilomètres. Proxima du Centaure, l’étoile la plus proche, est à 4,2 années-lumière.',
    note: 'L’année-lumière mesure une distance, pas un temps. Dire "dans quelques années-lumière" n’a aucun sens.',
    from: 'années-lumière', to: 'km',
  },
  'au-km': {
    title: 'Unités astronomiques en km', desc: 'Convertit les unités astronomiques (ua) en kilomètres',
    long: 'Une unité astronomique est la distance moyenne Terre-Soleil, environ 149,6 millions de kilomètres. Les distances dans le système solaire s’expriment en ua.',
    note: 'Jupiter est à environ 5,2 ua et Neptune à 30 ua. Pour les distances entre étoiles, l’ua devient trop petite et on passe à l’année-lumière.',
    from: 'ua', to: 'km',
  },
  'fathom-m': {
    title: 'Brasses en mètres', desc: 'Convertit les brasses en mètres',
    long: 'La brasse est l’unité de profondeur de la tradition anglaise et figure encore sur les cartes marines. Elle vient de l’écartement des deux bras.',
    note: 'Une brasse vaut 1,8288 m, soit 6 pieds. Les "vingt mille lieues" de Verne sont une autre unité, pas des brasses.',
    from: 'brasses', to: 'm',
  },
  'furlong-m': {
    title: 'Furlongs en mètres', desc: 'Convertit les furlongs en mètres',
    long: 'Le furlong sert dans les courses de chevaux britanniques et américaines. Huit furlongs font un mile.',
    note: 'Un furlong vaut 201,168 m. Une course de "six furlongs" mesure environ 1 207 m.',
    from: 'furlongs', to: 'm',
  },
  'chi-cm': {
    title: 'Chi (尺) chinois en cm', desc: 'Convertit le chi chinois en centimètres',
    long: 'Le chi est l’unité de longueur traditionnelle chinoise, aujourd’hui fixée sur une valeur métrique ronde. Elle sert pour les textiles et les meubles.',
    note: 'Un chi vaut exactement 33,33 cm. Le ja coréen et le shaku japonais font 30,3 cm — même caractère, trois valeurs.',
    from: '尺', to: 'cm',
  },
  'sun-cm': {
    title: 'Sun (寸) japonais en cm', desc: 'Convertit le sun japonais en centimètres',
    long: 'Le sun est un dixième de shaku et apparaît en menuiserie et dans les tailles de couteaux japonais. Une lame "de huit sun" fait environ 24 cm.',
    note: 'Un sun vaut environ 3,03 cm. Le chi (치) coréen mesure pareil, mais le cun chinois fait 3,33 cm.',
    from: '寸', to: 'cm',
  },
  'point-mm': {
    title: 'Points (pt) en mm', desc: 'Convertit les points typographiques en millimètres',
    long: 'Le point est l’unité de corps des caractères en typographie et en imprimerie. Un texte "en 12 points" a un corps d’environ 4,2 mm.',
    note: 'Un point vaut 1/72 de pouce, soit 0,3528 mm. Le point PostScript des ordinateurs diffère légèrement de l’ancien point typographique.',
    from: 'pt', to: 'mm',
  },
  'hand-cm': {
    title: 'Mains (hands) en cm', desc: 'Convertit les hands en centimètres',
    long: 'La hand est l’unité de mesure de la taille des chevaux, prise au garrot. Un cheval "de 16 hands" fait 162,6 cm.',
    note: 'Une hand vaut 10,16 cm, soit 4 pouces. On écrit 16.2 pour 16 hands et 2 pouces — ce n’est pas un décimal.',
    from: 'hands', to: 'cm',
  },

  /* ───────── 무게 ───────── */
  'kg-lb': {
    title: 'kg en livres', desc: 'Convertit kilos et livres dans les deux sens',
    long: 'Passe des kilos aux livres et inversement. Le poids corporel, les valises et les disques de musculation sont en livres aux États-Unis.',
    note: 'Une livre vaut 0,4536 kg. Les disques "de 45 livres" en salle font environ 20,4 kg.',
  },
  'g-oz': {
    title: 'Grammes en onces', desc: 'Convertit grammes et onces dans les deux sens',
    long: 'Passe des grammes aux onces et inversement. Les recettes et les poids d’expédition venus d’ailleurs sont en onces.',
    note: 'Une once vaut 28,35 g. L’once troy de l’or pèse 31,1 g — c’est une autre unité.',
  },
  'ton-kg': {
    title: 'Tonnes en kg', desc: 'Convertit tonnes et kilogrammes',
    long: 'Passe des tonnes métriques aux kilos et inversement. Sert pour le fret, la charge utile des camions et le poids des machines.',
    note: 'Une tonne métrique vaut 1 000 kg. La tonne courte américaine (907 kg) et la tonne longue britannique (1 016 kg) sont différentes.',
  },
  'don-g': {
    title: 'Don (돈) coréen en grammes', desc: 'Convertit l’unité coréenne de bijouterie don en grammes',
    long: 'Le don est l’unité qui sert à peser l’or et l’argent en Corée. Les bagues de naissance et les alliances se vendent au don.',
    note: 'Un don vaut 3,75 g. Une bague "d’un don" contient 3,75 g d’or ; pour le prix, multiplie par le cours du gramme.',
    from: 'don', to: 'g',
  },
  'nyang-g': {
    title: 'Nyang (냥) coréen en grammes', desc: 'Convertit le nyang traditionnel coréen en grammes',
    long: 'Le nyang vaut dix don et apparaît en médecine traditionnelle coréenne et dans les textes historiques.',
    note: 'Un nyang vaut 37,5 g. Le tael chinois (兩) fait 50 g et le japonais environ 37,5 g — vérifie l’origine.',
    from: 'nyang', to: 'g',
  },
  'geun-g': {
    title: 'Geun (근) coréen en grammes', desc: 'Convertit le geun coréen en grammes',
    long: 'Le geun sert encore chez les bouchers et les primeurs coréens. Attention : la valeur n’est pas la même pour tout.',
    note: 'La viande se compte à 600 g le geun, les légumes et les fruits à 375 g. Si l’étal ne le précise pas, demande.',
    from: 'geun', to: 'g',
  },
  'kwan-kg': {
    title: 'Kwan (관) coréen en kg', desc: 'Convertit le kwan traditionnel coréen en kilogrammes',
    long: 'Le kwan est la grande unité de poids de Corée et du Japon, encore vivante sur les marchés aux poissons et en gros.',
    note: 'Un kwan vaut 3,75 kg, soit cent don. Le kan japonais (貫) a la même valeur.',
    from: 'kwan', to: 'kg',
  },
  'carat-g': {
    title: 'Carats en grammes', desc: 'Convertit les carats en grammes',
    long: 'Le carat est l’unité de poids des pierres précieuses. Un diamant "d’un carat" pèse 0,2 g.',
    note: 'Attention au mot : le carat de poids (ct) n’est pas le carat de titre de l’or (K). L’or 18 carats est une proportion, pas un poids.',
  },
  'stone-kg': {
    title: 'Stones en kg', desc: 'Convertit les stones en kilogrammes',
    long: 'Le stone est l’unité dans laquelle les Britanniques donnent leur poids. "11 stone 4" font 71,7 kg.',
    note: 'Un stone vaut 6,35 kg, soit 14 livres. Aux États-Unis on ne l’utilise pas : le poids y est en livres seules.',
  },
  'troyounce-g': {
    title: 'Onces troy en grammes', desc: 'Convertit les onces troy en grammes',
    long: 'L’once troy est l’unité de cotation de l’or, de l’argent et du platine. Le prix de l’or dans les infos est par once troy.',
    note: 'Une once troy vaut 31,1035 g, 10% de plus que l’once ordinaire (28,35 g). Les confondre fausse le prix.',
    from: 'onces troy', to: 'g',
  },
  'grain-g': {
    title: 'Grains en grammes', desc: 'Convertit les grains en grammes',
    long: 'Le grain est la plus petite unité de masse du système anglais et sert pour les munitions et les doses de médicament. Il vient du poids d’un grain d’orge.',
    note: 'Un grain vaut 0,0648 g. Une balle "de 55 grains" pèse environ 3,6 g.',
    from: 'grains', to: 'g',
  },
  'dram-g': {
    title: 'Drachmes en grammes', desc: 'Convertit les drachmes (drams) en grammes',
    long: 'Le drachme est une petite unité du système anglais, présente en parfumerie et dans les charges de poudre.',
    note: 'Un drachme vaut 1,772 g, soit 1/16 d’once. Le drachme de volume (fluid dram) est autre chose.',
    from: 'drachmes', to: 'g',
  },
  'jin-g': {
    title: 'Jin (斤) chinois en grammes', desc: 'Convertit le jin chinois en grammes',
    long: 'Le jin est l’unité de poids du quotidien en Chine : légumes et viande se vendent au jin sur les marchés.',
    note: 'Un jin chinois vaut exactement 500 g. Le geun coréen fait 600 g pour la viande — même caractère, valeurs différentes.',
    from: '斤', to: 'g',
  },
  'momme-g': {
    title: 'Momme (匁) en grammes', desc: 'Convertit le momme japonais en grammes',
    long: 'Le momme est l’unité japonaise de pesée des perles et de la soie. Le grammage de la soie s’indique en momme.',
    note: 'Un momme vaut 3,75 g, autant qu’un don coréen. Une soie "de 19 momme" désigne un poids au mètre carré.',
    from: '匁', to: 'g',
  },
  'longton-kg': {
    title: 'Tonnes longues en kg', desc: 'Convertit les tonnes longues britanniques en kilogrammes',
    long: 'La tonne longue est la grande unité de poids britannique et apparaît dans le déplacement des navires et les anciens tonnages.',
    note: 'Une tonne longue vaut 1 016 kg, un peu plus que la tonne métrique. La tonne courte américaine fait 907 kg.',
    from: 'tonnes longues', to: 'kg',
  },
  'shortton-kg': {
    title: 'Tonnes courtes en kg', desc: 'Convertit les tonnes courtes américaines en kilogrammes',
    long: 'La tonne courte, c’est ce qu’on entend par "tonne" aux États-Unis : poids de camions et de matériaux.',
    note: 'Une tonne courte vaut 907,18 kg, soit 2 000 livres — 9% de moins que la tonne métrique.',
    from: 'tonnes courtes', to: 'kg',
  },
  'mcg-mg': {
    title: 'μg en mg', desc: 'Convertit microgrammes et milligrammes',
    long: 'Passe des microgrammes aux milligrammes et inversement. Les doses de vitamines et de médicaments mélangent les deux unités.',
    note: 'Un milligramme vaut 1 000 microgrammes. Confondre mcg et mg, c’est se tromper d’un facteur mille sur la dose.',
  },

  /* ───────── 부피 ───────── */
  'l-gallon': {
    title: 'Litres en gallons', desc: 'Convertit litres et gallons dans les deux sens',
    long: 'Passe des litres aux gallons et inversement. Le carburant et les grandes boissons aux États-Unis sont en gallons.',
    note: 'On calcule avec le gallon américain : 3,785 L. Le gallon impérial britannique fait 4,546 L, 20% de plus.',
  },
  'ml-floz': {
    title: 'mL en onces liquides', desc: 'Convertit millilitres et onces liquides',
    long: 'Passe des millilitres aux onces liquides et inversement. Les cosmétiques et les boissons importées sont en fl oz.',
    note: 'On calcule avec l’once liquide américaine : 29,57 mL. La britannique fait 28,41 mL.',
  },
  'doe-l': {
    title: 'Doe (되) coréen en litres', desc: 'Convertit le doe traditionnel coréen en litres',
    long: 'Le doe est la mesure coréenne des céréales et de l’alcool. Le makgeolli et les grains se vendent encore au doe sur les marchés.',
    note: 'Un doe vaut 1,8 L. Le shō japonais (升) mesure pareil, environ 1,8 L.',
    from: 'doe', to: 'L',
  },
  'mal-l': {
    title: 'Mal (말) coréen en litres', desc: 'Convertit le mal traditionnel coréen en litres',
    long: 'Le mal vaut dix doe et sert pour les céréales en gros. "Un mal de riz" fait environ 18 L, soit 8 kg.',
    note: 'Un mal vaut 18 L. En poids, tout dépend du grain : le riz fait environ 8 kg le mal.',
    from: 'mal', to: 'L',
  },
  'cup-ml': {
    title: 'Tasses en mL', desc: 'Convertit les tasses de cuisine et les millilitres',
    long: 'Passe des tasses aux millilitres et inversement. Les recettes venues d’ailleurs sont écrites en tasses.',
    note: 'La tasse américaine fait 240 mL et la tasse métrique 200 mL. Les 20% d’écart se voient en pâtisserie.',
    from: 'tasse', to: 'mL',
  },
  'barrel-l': {
    title: 'Barils en litres', desc: 'Convertit les barils de pétrole en litres',
    long: 'Passe des barils aux litres et inversement. Le prix du pétrole dans les infos est par baril.',
    note: 'Un baril de pétrole vaut 158,99 L. Le baril de bière est une autre mesure — 117 L aux États-Unis.',
  },
  'cubicm-l': {
    title: 'Mètres cubes en litres', desc: 'Convertit mètres cubes et litres',
    long: 'Passe des mètres cubes aux litres et inversement. La consommation d’eau et de gaz sur la facture est en mètres cubes.',
    note: 'Un mètre cube vaut exactement 1 000 L. Une consommation de "15 m³" sur la facture d’eau, c’est 15 000 L.',
  },
  'tbsp-ml': {
    title: 'Cuillères à soupe en mL', desc: 'Convertit cuillères à soupe et millilitres',
    long: 'Passe des cuillères à soupe aux millilitres et inversement. Les recettes et les doses de sirop se comptent en cuillères.',
    note: 'Une cuillère à soupe fait 15 mL. La cuillère australienne fait 20 mL — regarde d’où vient la recette.',
    from: 'c. à s.', to: 'mL',
  },
  'tsp-ml': {
    title: 'Cuillères à café en mL', desc: 'Convertit cuillères à café et millilitres',
    long: 'Passe des cuillères à café aux millilitres et inversement. On croise ça dans les recettes et les petites quantités en cuisine.',
    note: 'Une cuillère à café fait 5 mL, soit un tiers de cuillère à soupe. Les couverts de table ne donnent pas la mesure exacte.',
    from: 'c. à c.', to: 'mL',
  },
  'pint-l': {
    title: 'Pintes en litres', desc: 'Convertit les pintes en litres',
    long: 'La pinte est la mesure dans laquelle on sert la bière dans les pubs britanniques et irlandais. Aux États-Unis elle sert aussi pour la glace et la crème.',
    note: 'La pinte britannique fait 568 mL et l’américaine 473 mL. Une pinte de bière à Londres, c’est 100 mL de plus.',
    from: 'pintes', to: 'L',
  },
  'quart-l': {
    title: 'Quarts en litres', desc: 'Convertit les quarts (quarts) en litres',
    long: 'Le quart vaut deux pintes et se rencontre aux États-Unis pour le lait, l’huile moteur et les casseroles.',
    note: 'Le quart américain fait 946 mL, presque un litre. Le britannique fait 1,137 L.',
    from: 'quarts', to: 'L',
  },
  'cc-ml': {
    title: 'cc en mL', desc: 'Convertit centimètres cubes et millilitres',
    long: 'Le cc et le mL sont exactement la même chose. La cylindrée des motos et le volume des seringues sont en cc.',
    note: '1 cc = 1 mL, toujours. Une moto "de 125 cc" a 125 mL de cylindrée.',
    from: 'cc', to: 'mL',
  },
  'hop-ml': {
    title: 'Hop (홉) coréen en mL', desc: 'Convertit le hop traditionnel coréen en millilitres',
    long: 'Le hop est un dixième de doe et se retrouve dans les bouteilles de soju et les mesures de riz.',
    note: 'Un hop vaut 180 mL. La bouteille de soju de 360 mL fait exactement deux hop.',
    from: 'hop', to: 'mL',
  },
  'bushel-l': {
    title: 'Boisseaux en litres', desc: 'Convertit les boisseaux (bushels) en litres',
    long: 'Le boisseau est la mesure dans laquelle on négocie le grain aux États-Unis. Les cotations du maïs et du soja sont par boisseau.',
    note: 'Un boisseau vaut 35,24 L. Comme c’est une mesure de volume, le poids dépend du grain : le maïs fait environ 25,4 kg le boisseau.',
    from: 'boisseaux', to: 'L',
  },

  /* ───────── 넓이 ───────── */
  'pyeong-m2': {
    title: 'Pyeong (평) en m²', desc: 'Convertit le pyeong coréen en mètres carrés',
    long: 'Le pyeong est l’unité dans laquelle on parle de surface de logement en Corée. Les annonces officielles sont en m², la conversation reste en pyeong.',
    note: 'Un pyeong vaut 3,3058 m². Un logement "de 84 m²" fait environ 25 pyeong. Le tsubo japonais a la même valeur.',
    from: 'pyeong', to: 'm²',
  },
  'm2-sqft': {
    title: 'm² en pieds carrés', desc: 'Convertit mètres carrés et pieds carrés',
    long: 'Passe des mètres carrés aux pieds carrés et inversement. Les annonces immobilières aux États-Unis sont en pieds carrés.',
    note: 'Un mètre carré vaut 10,764 pieds carrés. Un appartement "de 1 000 sq ft" fait environ 93 m².',
  },
  'acre-m2': {
    title: 'Acres en m²', desc: 'Convertit acres et mètres carrés',
    long: 'Passe des acres aux mètres carrés et inversement. Les fermes et les terrains dans les pays anglophones se mesurent en acres.',
    note: 'Un acre vaut 4 047 m², un peu plus d’un demi-terrain de football. Un hectare fait 2,47 acres.',
  },
  'hectare-m2': {
    title: 'Hectares en m²', desc: 'Convertit hectares et mètres carrés',
    long: 'Passe des hectares aux mètres carrés et inversement. L’hectare est l’unité internationale pour les terres agricoles et forestières.',
    note: 'Un hectare vaut 10 000 m², soit un carré de 100 mètres de côté.',
  },
  'danbo-m2': {
    title: 'Danbo (단보) en m²', desc: 'Convertit le danbo traditionnel coréen en mètres carrés',
    long: 'Le danbo est l’unité coréenne des surfaces agricoles et vaut 300 pyeong. Les rendements du riz s’expriment au danbo.',
    note: 'Un danbo vaut 991,7 m², presque un dixième d’hectare. Dix danbo font un jeongbo (정보).',
    from: 'danbo', to: 'm²',
  },
  'majigi-pyeong': {
    title: 'Majigi (마지기) en pyeong', desc: 'Convertit le majigi traditionnel coréen en pyeong',
    long: 'Le majigi est la surface qu’on ensemence avec un mal de graines : sa taille change donc selon la région et la culture.',
    note: 'On compte en général 200 pyeong pour une rizière, mais 150 dans certaines régions et 300 dans d’autres. C’est une mesure approximative.',
    from: 'majigi', to: 'pyeong',
  },
  'sqinch-cm2': {
    title: 'Pouces carrés en cm²', desc: 'Convertit les pouces carrés en centimètres carrés',
    long: 'Le pouce carré se rencontre dans les surfaces d’impression, les capteurs d’appareil photo et les surfaces de contact.',
    note: 'Un pouce carré vaut 6,4516 cm². En passant au carré, le facteur 2,54 devient 6,45.',
    from: 'po²', to: 'cm²',
  },
  'sqyard-m2': {
    title: 'Yards carrés en m²', desc: 'Convertit les yards carrés en mètres carrés',
    long: 'Le yard carré sert pour la moquette, le tissu et les surfaces de jardin dans les pays anglophones.',
    note: 'Un yard carré vaut 0,8361 m², un peu moins qu’un mètre carré.',
    from: 'yd²', to: 'm²',
  },
  'sqmile-km2': {
    title: 'Milles carrés en km²', desc: 'Convertit les milles carrés en kilomètres carrés',
    long: 'Le mille carré sert pour les superficies de villes et de comtés, et pour l’étendue des incendies.',
    note: 'Un mille carré vaut 2,59 km². En passant au carré, le facteur 1,609 devient 2,59.',
    from: 'mi²', to: 'km²',
  },
  'are-m2': {
    title: 'Ares (a) en m²', desc: 'Convertit les ares en mètres carrés',
    long: 'L’are est le centième de l’hectare et se rencontre au cadastre et pour les petites parcelles.',
    note: 'Un are vaut exactement 100 m². Cent ares font un hectare.',
    from: 'a', to: 'm²',
  },
  'mu-m2': {
    title: 'Mu (畝) chinois en m²', desc: 'Convertit le mu chinois en mètres carrés',
    long: 'Le mu est l’unité chinoise des surfaces agricoles et sert au quotidien à la campagne comme dans les statistiques.',
    note: 'Un mu vaut environ 666,7 m². Quinze mu font un hectare.',
    from: '畝', to: 'm²',
  },

  /* ───────── 온도 ───────── */
  'celsius-fahrenheit': {
    title: 'Celsius en Fahrenheit', desc: 'Convertit degrés Celsius et Fahrenheit',
    long: 'Passe des degrés Celsius aux Fahrenheit et inversement. Les bulletins météo et les fours aux États-Unis sont en Fahrenheit.',
    note: 'La formule est °F = °C × 1,8 + 32. Il y a un décalage de 32 : multiplier ne suffit pas.',
    from: '°C', to: '°F',
  },
  'celsius-kelvin': {
    title: 'Celsius en kelvin', desc: 'Convertit degrés Celsius et kelvin',
    long: 'Passe des degrés Celsius aux kelvins et inversement. La physique et la température de couleur des ampoules utilisent le kelvin.',
    note: 'K = °C + 273,15. Le zéro absolu (0 K) vaut −273,15 °C, et il n’existe rien en dessous.',
    from: '°C', to: 'K',
  },
  'fahrenheit-kelvin': {
    title: '°F en kelvin', desc: 'Convertit degrés Fahrenheit et kelvin',
    long: 'Passe des Fahrenheit aux kelvins et inversement. Nécessaire pour lire des textes techniques américains en unités absolues.',
    note: 'Convertis d’abord en Celsius, puis ajoute 273,15. L’échelle Fahrenheit avance 1,8 fois plus lentement.',
    from: '°F', to: 'K',
  },
  'celsius-rankine': {
    title: '°C en Rankine (°R)', desc: 'Convertit degrés Celsius et Rankine',
    long: 'L’échelle Rankine est l’échelle absolue avec les degrés Fahrenheit, présente en thermodynamique et dans l’ingénierie américaine.',
    note: 'Le zéro Rankine coïncide avec le zéro absolu et ses degrés valent ceux du Fahrenheit. 0 °C font 491,67 °R.',
    from: '°C', to: '°R',
  },

  /* ───────── 속도 ───────── */
  'kmh-mph': {
    title: 'km/h en mph', desc: 'Convertit kilomètres par heure et miles par heure',
    long: 'Passe des km/h aux mph et inversement. Les limitations de vitesse aux États-Unis et au Royaume-Uni sont en mph.',
    note: '60 mph font 96,6 km/h. Le "60" du compteur américain est proche de nos 100 km/h.',
  },
  'ms-kmh': {
    title: 'm/s en km/h', desc: 'Convertit mètres par seconde et kilomètres par heure',
    long: 'Passe des m/s aux km/h et inversement. La vitesse du vent dans les bulletins météo est en m/s.',
    note: 'On multiplie par 3,6. Un vent de 10 m/s fait 36 km/h — déjà un avis de vent fort.',
  },
  'knot-kmh': {
    title: 'Nœuds en km/h', desc: 'Convertit nœuds et kilomètres par heure',
    long: 'Passe des nœuds aux km/h et inversement. Bateaux, avions et alertes cycloniques utilisent le nœud.',
    note: 'Un nœud vaut 1,852 km/h, soit un mille nautique par heure.',
  },
  'mach-kmh': {
    title: 'Mach en km/h', desc: 'Convertit les nombres de Mach et les kilomètres par heure',
    long: 'Passe de Mach aux km/h et inversement. La vitesse des chasseurs s’exprime en multiples de la vitesse du son.',
    note: 'On prend Mach 1 = 1 225 km/h au niveau de la mer. En altitude l’air est plus froid et la vitesse du son baisse, la valeur réelle change donc.',
  },
  'mph-ms': {
    title: 'mph en m/s', desc: 'Convertit miles par heure et mètres par seconde',
    long: 'Passe des mph aux m/s et inversement. Nécessaire pour comparer des vitesses de vent ou de lancer entre plusieurs sources.',
    note: 'Une mph vaut 0,447 m/s. Un lancer à 100 mph fait environ 44,7 m/s.',
    from: 'mph', to: 'm/s',
  },
  'pace-kmh': {
    title: 'Allure de course en km/h', desc: 'Convertit minutes par kilomètre et km/h',
    long: 'Passe de l’allure (min/km) à la vitesse (km/h) et inversement. Les montres de sport affichent l’allure, les tapis de course la vitesse.',
    note: 'La relation est inverse : une allure de 5 min/km fait 12 km/h, et 6 min/km font 10 km/h. Plus l’allure est petite, plus la vitesse est grande.',
    from: 'min/km', to: 'km/h',
  },
  'fps-ms': {
    title: 'ft/s en m/s', desc: 'Convertit pieds par seconde et mètres par seconde',
    long: 'Passe des pieds par seconde aux mètres par seconde et inversement. On croise ça dans les vitesses de projectile et la physique américaine.',
    note: 'Un pied par seconde vaut 0,3048 m/s. Une vitesse de "1 000 ft/s" fait environ 305 m/s.',
    from: 'ft/s', to: 'm/s',
  },

  /* ───────── 데이터 ───────── */
  'mb-gb': {
    title: 'Mo en Go', desc: 'Convertit mégaoctets et gigaoctets',
    long: 'Passe des mégaoctets aux gigaoctets et inversement. Tailles de fichiers, forfaits de données mobiles et capacités de disque.',
    note: 'Ici 1 Go = 1 000 Mo (décimal). Windows compte en 1 024, et c’est pourquoi un disque "de 1 To" s’affiche en 931 Go.',
  },
  'gb-tb': {
    title: 'Go en To', desc: 'Convertit gigaoctets et téraoctets',
    long: 'Passe des gigaoctets aux téraoctets et inversement. Disques durs, SSD et stockage en ligne.',
    note: '1 To = 1 000 Go selon le décompte décimal du fabricant. Le système compte en 1 024 et affiche moins.',
  },
  'mbps-mbs': {
    title: 'Mb/s en Mo/s', desc: 'Convertit débit réseau et vitesse de téléchargement',
    long: 'Passe des Mb/s aux Mo/s et inversement. Les opérateurs annoncent des bits par seconde, les gestionnaires de téléchargement affichent des octets par seconde.',
    note: 'On divise par 8 : une ligne de 100 Mb/s télécharge au mieux à environ 12,5 Mo/s. Ce n’est pas une arnaque, juste une autre unité.',
  },
  'kb-mb': {
    title: 'Ko en Mo', desc: 'Convertit kilooctets et mégaoctets',
    long: 'Passe des kilooctets aux mégaoctets et inversement. Pièces jointes, images et limites de téléversement.',
    note: 'Ici 1 Mo = 1 000 Ko. En binaire ce serait 1 024 Ko, et sur de petits fichiers l’écart se voit à peine.',
  },
  'byte-bit': {
    title: 'Octets en bits', desc: 'Convertit octets et bits',
    long: 'Passe des octets aux bits et inversement. Le réseau se mesure en bits, le stockage en octets.',
    note: 'Un octet vaut 8 bits. Le B majuscule désigne l’octet et le b minuscule le bit : Mb/s et Mo/s ne sont pas la même chose.',
  },
  'tb-pb': {
    title: 'To en Po', desc: 'Convertit téraoctets et pétaoctets',
    long: 'Passe des téraoctets aux pétaoctets et inversement. On croise ça dans les centres de données et les volumes de sauvegarde.',
    note: '1 Po = 1 000 To en décompte décimal. Un pétaoctet tiendrait sur environ mille disques de 1 To.',
  },
  'kib-kb': {
    title: 'Kio en Ko', desc: 'Convertit kibioctets et kilooctets',
    long: 'Le Kio est l’unité binaire (1 024 octets) et le Ko la décimale (1 000 octets). C’est de là que vient l’écart entre le système et le fabricant.',
    note: '1 Kio = 1,024 Ko. L’écart est de 2,4% ici, mais il grandit à chaque palier : au Tio il dépasse 10%.',
    from: 'Kio', to: 'Ko',
  },
  'mib-mb': {
    title: 'Mio en Mo', desc: 'Convertit mébioctets et mégaoctets',
    long: 'Le Mio vaut 1 048 576 octets et le Mo 1 000 000. Linux et beaucoup d’outils affichent des Mio tout en écrivant "Mo".',
    note: '1 Mio = 1,049 Mo. Une image disque "de 700 Mo" fait en réalité souvent 700 Mio, soit 734 Mo.',
    from: 'Mio', to: 'Mo',
  },
  'gib-gb': {
    title: 'Gio en Go', desc: 'Convertit gibioctets et gigaoctets',
    long: 'Le Gio est l’unité binaire et le Go la décimale. C’est exactement la raison pour laquelle un disque de 1 To s’affiche en 931 Go.',
    note: '1 Gio = 1,074 Go, soit 7,4% d’écart. Les "931 Go" affichés par Windows sont en réalité 931 Gio.',
    from: 'Gio', to: 'Go',
  },

  /* ───────── 에너지 ───────── */
  'kcal-kj': {
    title: 'Calories en kilojoules', desc: 'Convertit kilocalories et kilojoules',
    long: 'Passe des kilocalories aux kilojoules et inversement. Les étiquettes nutritionnelles européennes donnent les deux, les australiennes seulement des kJ.',
    note: 'Une kcal vaut 4,184 kJ. Les "2 000 kcal" par jour font environ 8 370 kJ.',
  },
  'kw-hp': {
    title: 'kW en chevaux', desc: 'Convertit kilowatts et chevaux',
    long: 'Passe des kilowatts aux chevaux et inversement. La puissance des voitures est en chevaux, celle des électriques en kW.',
    note: 'On calcule avec le cheval métrique (ch) : 1 kW = 1,36 ch. Le cheval britannique (hp) est 1,4% plus grand.',
  },
  'kwh-mj': {
    title: 'kWh en mégajoules', desc: 'Convertit kilowattheures et mégajoules',
    long: 'Passe des kWh aux MJ et inversement. La facture d’électricité est en kWh, les calculs de physique en joules.',
    note: 'Un kWh vaut 3,6 MJ. C’est l’énergie de maintenir 1 000 W pendant une heure.',
  },
  'joule-cal': {
    title: 'Joules en calories', desc: 'Convertit joules et calories',
    long: 'Passe des joules aux calories et inversement. Les exercices de physique et les étiquettes alimentaires nomment la même chose autrement.',
    note: 'Un joule vaut 0,239 calorie. La "calorie" des aliments est en fait la kilocalorie, mille fois plus grande.',
  },
  'wh-joule': {
    title: 'Wh en joules', desc: 'Convertit wattheures et joules',
    long: 'Passe des wattheures aux joules et inversement. La capacité des batteries est en Wh, comme les limites des compagnies aériennes.',
    note: 'Un Wh vaut 3 600 J. Les compagnies aériennes autorisent souvent en cabine des batteries jusqu’à 100 Wh.',
    from: 'Wh', to: 'J',
  },
  'btu-kj': {
    title: 'BTU en kJ', desc: 'Convertit BTU et kilojoules',
    long: 'Le BTU est l’unité de chaleur anglo-saxonne et sert pour la puissance des climatiseurs et des chaudières.',
    note: 'Un BTU vaut 1,055 kJ. Un climatiseur "de 12 000 BTU" correspond à une tonne de froid, environ 3,5 kW.',
    from: 'BTU', to: 'kJ',
  },
  'kcal-kwh': {
    title: 'kcal en kWh', desc: 'Convertit kilocalories et kilowattheures',
    long: 'Passe des kilocalories aux kilowattheures et inversement. Permet de comparer l’énergie des aliments à la consommation électrique.',
    note: 'Une kcal vaut 0,00116 kWh. Les 2 000 kcal qu’on mange par jour ne font que 2,3 kWh — moins qu’un lave-linge.',
    from: 'kcal', to: 'kWh',
  },
  'therm-kwh': {
    title: 'Therms en kWh', desc: 'Convertit therms et kilowattheures',
    long: 'Le therm est l’unité de facturation du gaz aux États-Unis et au Royaume-Uni. Il permet de comparer la facture de gaz à celle d’électricité.',
    note: 'Un therm vaut 29,3 kWh, soit 100 000 BTU. Un therm fournit bien plus d’énergie qu’un kWh d’électricité.',
    from: 'therm', to: 'kWh',
  },

  /* ───────── 압력·기타 ───────── */
  'bar-psi': {
    title: 'bar en psi', desc: 'Convertit bar et psi',
    long: 'Passe des bars aux psi et inversement. La pression des pneus et les manomètres mélangent les deux unités.',
    note: 'Un bar vaut 14,5 psi. Les 2,2 bars recommandés pour un pneu font environ 32 psi.',
  },
  'hpa-mmhg': {
    title: 'hPa en mmHg', desc: 'Convertit hectopascals et millimètres de mercure',
    long: 'Passe des hPa aux mmHg et inversement. La météo utilise les hPa, la tension artérielle les mmHg.',
    note: 'Un hPa vaut 0,75 mmHg. La pression atmosphérique normale, 1 013 hPa, fait 760 mmHg.',
  },
  'mpg-kmpl': {
    title: 'mpg en km/L', desc: 'Convertit miles par gallon et kilomètres par litre',
    long: 'Passe des mpg américains aux km/L et inversement. Nécessaire pour lire des essais automobiles étrangers.',
    note: 'On calcule avec le gallon américain : 30 mpg font environ 12,8 km/L. Les chiffres britanniques ressortent 20% plus hauts, vérifie la source.',
  },
  'atm-kpa': {
    title: 'Atmosphères en kPa', desc: 'Convertit atmosphères et kilopascals',
    long: 'L’atmosphère est la pression au niveau de la mer et sert en plongée et en chimie.',
    note: 'Une atmosphère vaut 101,325 kPa. Sous l’eau, on ajoute une atmosphère tous les 10 m de profondeur.',
    from: 'atm', to: 'kPa',
  },
  'psi-kpa': {
    title: 'psi en kPa', desc: 'Convertit psi et kilopascals',
    long: 'Passe des psi aux kilopascals et inversement. Les manuels de voiture et les outils pneumatiques utilisent le psi.',
    note: 'Un psi vaut 6,895 kPa. Les 32 psi d’un pneu font environ 220 kPa.',
    from: 'psi', to: 'kPa',
  },
  'torr-pa': {
    title: 'Torr en pascals', desc: 'Convertit torr et pascals',
    long: 'Le torr vaut un millimètre de mercure et sert en technique du vide et au laboratoire.',
    note: 'Un torr vaut 133,3 Pa. La pression atmosphérique fait 760 torr.',
    from: 'torr', to: 'Pa',
  },
  'inhg-hpa': {
    title: 'inHg en hPa', desc: 'Convertit pouces de mercure et hectopascals',
    long: 'Le pouce de mercure est l’unité de pression des bulletins météo et de l’aviation américaine.',
    note: 'Un pouce de mercure vaut 33,86 hPa. Le calage altimétrique standard, 29,92 inHg, fait 1 013 hPa.',
    from: 'inHg', to: 'hPa',
  },

  /* ───────── 시간 ───────── */
  'frame-sec': {
    title: 'Images en secondes (30 ips)', desc: 'Convertit images vidéo et secondes',
    long: 'Passe des images aux secondes et inversement, à 30 ips. Utile pour lire un timecode au montage vidéo.',
    note: 'À 30 ips, 90 images font 3 secondes. À 24 ou 60 ips le calcul change, vérifie les ips du matériau.',
    from: 'images', to: 's',
  },
  'bpm-ms': {
    title: 'BPM en ms par temps', desc: 'Convertit tempo musical et durée d’un temps',
    long: 'Passe des battements par minute aux millisecondes par temps et inversement. Les délais et réverbes en production musicale se règlent en ms.',
    note: 'La relation est inverse : 120 BPM font 500 ms par temps. Un delay à la noire à ce tempo se règle sur 500 ms.',
    from: 'BPM', to: 'ms',
  },
  'ms-sec': {
    title: 'ms en secondes', desc: 'Convertit millisecondes et secondes',
    long: 'Passe des millisecondes aux secondes et inversement. Latence réseau, temps de réaction et réglages d’animation.',
    note: 'Une seconde vaut 1 000 ms. Un ping de 50 ms fait 0,05 seconde.',
    from: 'ms', to: 's',
  },

  /* ───────── 각도 ───────── */
  'degree-gradian': {
    title: 'Degrés en grades (gon)', desc: 'Convertit degrés et grades',
    long: 'Le grade divise l’angle droit en 100 parties et sert en topographie et en génie civil, notamment en France.',
    note: '90 degrés font 100 gon. La calculatrice a un mode GRAD pour cela — si le résultat paraît faux, vérifie le mode.',
    from: '°', to: 'gon',
  },
  'arcmin-degree': {
    title: 'Minutes d’arc en degrés', desc: 'Convertit minutes d’arc et degrés',
    long: 'La minute d’arc est le soixantième de degré et sert en astronomie, en optique et pour les coordonnées.',
    note: 'Une minute d’arc vaut 1/60 de degré. La Lune vue de la Terre mesure environ 31 minutes d’arc.',
    from: '′', to: '°',
  },
  'mil-mm': {
    title: 'Mils en mm', desc: 'Convertit les mils (thou) et les millimètres dans les deux sens',
    long: 'Un mil vaut un millième de pouce, soit 0,0254 mm. Les plans américains y expriment la largeur des pistes, l’épaisseur des films et celle des revêtements.',
    note: 'On l’appelle aussi thou : c’est la même unité. Le nom évoque le millimètre, mais un mil n’en fait pas le quarantième.',
    from: 'mils', to: 'mm',
  },
  'angstrom-nm': {
    title: 'Ångströms en nanomètres', desc: 'Convertit les ångströms et les nanomètres dans les deux sens',
    long: 'Un ångström vaut 0,1 nanomètre. Les diamètres atomiques et les longueurs de liaison tiennent presque toujours entre un et trois ångströms, d’où son usage en cristallographie.',
    note: 'Ce n’est pas une unité SI ; les revues préfèrent le nanomètre ou le picomètre. Vérifiez laquelle une figure emploie.',
    from: 'Å', to: 'nm',
  },
  'pennyweight-g': {
    title: 'Pennyweights en grammes', desc: 'Convertit le pennyweight des métaux précieux en grammes',
    long: 'Un pennyweight (dwt) vaut 1,55517384 g, et vingt font une once troy. Les joailliers nord-américains et les fournisseurs d’alliages dentaires l’emploient encore.',
    note: 'Il repose sur l’once troy (31,1035 g), pas sur l’once ordinaire (28,35 g). Les confondre fausse le poids de près de dix pour cent.',
    from: 'dwt', to: 'g',
  },
  'tola-g': {
    title: 'Tolas en grammes', desc: 'Convertit le tola de l’or sud-asiatique en grammes',
    long: 'Un tola vaut 11,6638038 g, hérités du poids d’une ancienne roupie d’argent. Les bijoutiers d’Inde, du Pakistan et du Bangladesh chiffrent encore l’or ainsi.',
    note: 'Certains lieux comptent plutôt 11,34 g selon le pays et l’époque. Confirmez la valeur locale avant toute transaction.',
    from: 'tola', to: 'g',
  },
  'gill-ml': {
    title: 'Gills en millilitres', desc: 'Convertit le gill impérial en millilitres',
    long: 'Un gill impérial vaut 142,0653125 mL, soit cinq onces liquides. Il figure dans les vieux livres de cuisine et les mesures d’alcool ; les pubs britanniques servent encore ainsi.',
    note: 'Le gill américain vaut 118,29 mL, une autre quantité. Devant une recette ancienne, regardez de quel côté de l’Atlantique elle vient.',
    from: 'gills', to: 'mL',
  },
  'impgallon-l': {
    title: 'Gallons impériaux en litres', desc: 'Convertit le gallon impérial en litres',
    long: 'Un gallon impérial vaut exactement 4,54609 L. Employé au Royaume-Uni, en Irlande et dans une partie des Caraïbes, il dépasse de vingt pour cent le gallon américain de 3,785 L.',
    note: 'C’est là que les comparaisons de consommation dérapent le plus. Les miles par gallon impérial paraissent toujours meilleurs sans que la voiture consomme moins.',
    from: 'gal', to: 'L',
  },
  'rood-m2': {
    title: 'Roods en mètres carrés', desc: 'Convertit le rood impérial en mètres carrés',
    long: 'Un rood vaut 1011,7141056 m², exactement un quart d’acre. Les vieux actes fonciers britanniques alignent acres, roods et perches.',
    note: 'Le même mot désigne un crucifix, ce qui brouille les documents anciens. Cette valeur ne vaut qu’en contexte de superficie.',
    from: 'roods', to: 'm²',
  },
  'pace-mile-kmh': {
    title: 'Allure au mile en km/h', desc: 'Convertit l’allure de course au mile en vitesse',
    long: 'Transforme les minutes au mile en kilomètres par heure. Le mile valant 1,609344 km, diviser 96,56 par l’allure donne la vitesse : huit minutes au mile font 12,07 km/h.',
    note: 'Ici on divise, le sens s’inverse. Une allure plus petite est plus rapide ; une vitesse plus grande aussi.',
    from: 'min/mile', to: 'km/h',
  },
  'tib-tb': {
    title: 'TiB en TB', desc: 'Convertit les tébioctets binaires et les téraoctets décimaux',
    long: 'Un TiB vaut deux puissance quarante octets et un TB dix puissance douze : un TiB fait donc environ 1,0995 TB. D’où un disque de 4 TB affiché en 3,64 TiB.',
    note: 'Aucune capacité ne manque, les deux camps comptent autrement. Windows note les TiB comme des TB, macOS et les fabricants utilisent les TB.',
    from: 'TiB', to: 'TB',
  },
  'btu-wh': {
    title: 'BTU en wattheures', desc: 'Convertit l’unité de chaleur BTU en wattheures',
    long: 'Un BTU vaut environ 0,293071 Wh. L’Amérique du Nord chiffre climatiseurs et chaudières en BTU ; la conversion électrique permet de comparer à la consommation.',
    note: 'Le « BTU » d’un climatiseur abrège presque toujours des BTU par heure. Douze mille BTU/h font une tonne de froid.',
    from: 'BTU', to: 'Wh',
  },
};
