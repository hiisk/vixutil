// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ConvertL10n } from '../convert-i18n.ts';

/**
 * 단위 변환 100종의 포르투갈어(브라질) 문구.
 *
 * 계수는 여기 두지 않는다 — 숫자는 lib/convert-tools.ts 한 곳에만 있어야 한다.
 *
 * 브라질에서 실제로 쓰는 말을 고른다. 미국 단위(폴레가다·리브라)를 마주치는 자리가
 * 스페인어권과 조금 다르고, 알케이리·헥타르 같은 토지 단위 감각도 다르다.
 */
export const CONVERT_PT_BR: Record<string, ConvertL10n> = {
  /* ───────── 길이 ───────── */
  'cm-inch': {
    title: 'cm para polegadas', desc: 'Converte centímetros e polegadas nos dois sentidos',
    long: 'Passa centímetros para polegadas e volta. Serve para tamanho de tela, medidas de roupa e diâmetro de roda, que vêm marcados em polegadas.',
    note: 'Uma polegada é exatamente 2,54 cm. As "polegadas" de um monitor medem a diagonal, não a largura.',
  },
  'm-feet': {
    title: 'Metros para pés', desc: 'Converte metros e pés nos dois sentidos',
    long: 'Passa metros para pés e volta. Aparece em altitude de voo, altura de prédios e anúncios de imóveis no exterior.',
    note: 'Um pé é exatamente 0,3048 m. Os "35.000 pés" anunciados no avião são cerca de 10,7 km.',
  },
  'km-mile': {
    title: 'Quilômetros para milhas', desc: 'Converte quilômetros e milhas nos dois sentidos',
    long: 'Passa quilômetros para milhas e volta. Os limites de velocidade nos Estados Unidos e no Reino Unido vêm em milhas, e muitas corridas de rua também.',
    note: 'Uma milha é 1,609 km. A meia maratona de 13,1 milhas equivale a 21,1 km.',
  },
  'mm-inch': {
    title: 'mm para polegadas', desc: 'Converte milímetros e polegadas nos dois sentidos',
    long: 'Passa milímetros para polegadas e volta. Parafusos, tubos e brocas são vendidos em polegadas fracionárias.',
    note: '1/4 de polegada é 6,35 mm e 1/2 polegada é 12,7 mm. Frações convertem melhor se você passar primeiro para decimal.',
  },
  'yard-m': {
    title: 'Jardas para metros', desc: 'Converte jardas e metros nos dois sentidos',
    long: 'Passa jardas para metros e volta. O campo de futebol americano e as distâncias do golfe são medidos em jardas.',
    note: 'Uma jarda é 0,9144 m, então 100 jardas ficam um pouco abaixo de 100 m.',
  },
  'nautical-mile-km': {
    title: 'Milhas náuticas para km', desc: 'Converte milhas náuticas e quilômetros',
    long: 'Passa milhas náuticas para quilômetros e volta. A navegação marítima e aérea usa milha náutica porque uma delas equivale a um minuto de latitude.',
    note: 'Uma milha náutica é exatamente 1,852 km. Um nó é uma milha náutica por hora.',
  },
  'foot-cm': {
    title: 'Pés para cm', desc: 'Converte pés e centímetros nos dois sentidos',
    long: 'Passa pés para centímetros e volta. A altura em países de língua inglesa vem em pés e polegadas: 5 pés e 9 polegadas são 175 cm.',
    note: 'Um pé é 30,48 cm e se divide em 12 polegadas. Para altura é preciso somar as polegadas à parte.',
  },
  'micron-mm': {
    title: 'Micrômetros para mm', desc: 'Converte micrômetros (µm) e milímetros',
    long: 'Passa micrômetros para milímetros e volta. A espessura de um filtro de máscara, o diâmetro de um fio de cabelo ou a altura de camada de uma impressora 3D vêm em micrômetros.',
    note: 'Um micrômetro é a milésima parte do milímetro. Um fio de cabelo tem cerca de 70 µm, ou 0,07 mm.',
  },
  'ri-km': {
    title: 'Ri (里) coreano para km', desc: 'Converte o ri tradicional coreano em quilômetros',
    long: 'O ri é a unidade de distância da Coreia antiga e aparece em músicas e provérbios. Os "dez mil ri" das expressões equivalem a uns 4.000 km.',
    note: 'Um ri é cerca de 0,393 km. O ri japonês (里) tem quase 3,9 km, dez vezes mais — não é a mesma unidade.',
    from: 'ri', to: 'km',
  },
  'ja-cm': {
    title: 'Ja (자/尺) coreano para cm', desc: 'Converte o ja tradicional coreano em centímetros',
    long: 'O ja é a unidade de comprimento tradicional da Coreia e ainda serve para tecidos e carpintaria. Um ja tem dez chi (치).',
    note: 'Um ja é cerca de 30,3 cm, quase o mesmo que um pé. O shaku japonês mede igual, mas o chi chinês tem 33,3 cm.',
    from: 'ja', to: 'cm',
  },
  'lightyear-km': {
    title: 'Anos-luz para km', desc: 'Converte anos-luz em quilômetros',
    long: 'Um ano-luz é a distância que a luz percorre no vácuo em um ano: cerca de 9,461 trilhões de quilômetros. Proxima Centauri, a estrela mais próxima, está a 4,2 anos-luz.',
    note: 'O ano-luz mede distância, não tempo. Dizer "daqui a alguns anos-luz" não faz sentido.',
    from: 'anos-luz', to: 'km',
  },
  'au-km': {
    title: 'Unidades astronômicas para km', desc: 'Converte unidades astronômicas (UA) em quilômetros',
    long: 'Uma unidade astronômica é a distância média entre a Terra e o Sol, cerca de 149,6 milhões de quilômetros. As distâncias dentro do sistema solar vêm em UA.',
    note: 'Júpiter está a cerca de 5,2 UA e Netuno a 30 UA. Para distâncias entre estrelas a UA fica pequena e se passa ao ano-luz.',
    from: 'UA', to: 'km',
  },
  'fathom-m': {
    title: 'Braças para metros', desc: 'Converte braças em metros',
    long: 'A braça é a unidade de profundidade do mar na tradição inglesa e continua nas cartas náuticas. Nasceu como a abertura dos dois braços.',
    note: 'Uma braça é 1,8288 m, ou seja 6 pés. As "vinte mil léguas" de Verne são outra unidade, não braças.',
    from: 'braças', to: 'm',
  },
  'furlong-m': {
    title: 'Furlongs para metros', desc: 'Converte furlongs em metros',
    long: 'O furlong é usado nas corridas de cavalos britânicas e americanas. Oito furlongs fazem uma milha.',
    note: 'Um furlong é 201,168 m. Uma corrida de "seis furlongs" tem cerca de 1.207 m.',
    from: 'furlongs', to: 'm',
  },
  'chi-cm': {
    title: 'Chi (尺) chinês para cm', desc: 'Converte o chi chinês em centímetros',
    long: 'O chi é a unidade de comprimento tradicional da China e hoje está fixada num valor redondo do sistema métrico. Serve para tecidos e medidas de móveis.',
    note: 'Um chi é exatamente 33,33 cm. O ja coreano e o shaku japonês têm 30,3 cm — o mesmo caractere, três valores diferentes.',
    from: '尺', to: 'cm',
  },
  'sun-cm': {
    title: 'Sun (寸) japonês para cm', desc: 'Converte o sun japonês em centímetros',
    long: 'O sun é a décima parte do shaku e aparece em carpintaria e em medidas de facas japonesas. Uma lâmina "de oito sun" tem cerca de 24 cm.',
    note: 'Um sun é cerca de 3,03 cm. O chi (치) coreano mede o mesmo, mas o cun chinês tem 3,33 cm.',
    from: '寸', to: 'cm',
  },
  'point-mm': {
    title: 'Pontos (pt) para mm', desc: 'Converte pontos tipográficos em milímetros',
    long: 'O ponto é a unidade de tamanho de letra na tipografia e na impressão. Um texto "de 12 pontos" tem cerca de 4,2 mm de corpo.',
    note: 'Um ponto é 1/72 de polegada, ou 0,3528 mm. O ponto PostScript dos computadores difere um pouco do ponto tipográfico antigo.',
    from: 'pt', to: 'mm',
  },
  'hand-cm': {
    title: 'Mãos (hands) para cm', desc: 'Converte hands em centímetros',
    long: 'A hand é a unidade com que se mede a altura dos cavalos, tirada na cernelha. Um cavalo "de 16 hands" tem 162,6 cm.',
    note: 'Uma hand é 10,16 cm, ou seja 4 polegadas. Escreve-se 16.2 para dizer 16 hands e 2 polegadas — não é um decimal.',
    from: 'hands', to: 'cm',
  },

  /* ───────── 무게 ───────── */
  'kg-lb': {
    title: 'kg para libras', desc: 'Converte quilos e libras nos dois sentidos',
    long: 'Passa quilos para libras e volta. Peso corporal, malas e anilhas de academia vêm em libras nos Estados Unidos.',
    note: 'Uma libra é 0,4536 kg. As anilhas "de 45 libras" da academia são cerca de 20,4 kg.',
  },
  'g-oz': {
    title: 'Gramas para onças', desc: 'Converte gramas e onças nos dois sentidos',
    long: 'Passa gramas para onças e volta. Receitas e pesos de envio de fora vêm em onças.',
    note: 'Uma onça é 28,35 g. A onça troy do ouro pesa 31,1 g — é outra unidade.',
  },
  'ton-kg': {
    title: 'Toneladas para kg', desc: 'Converte toneladas e quilos',
    long: 'Passa toneladas métricas para quilos e volta. Serve para carga, capacidade de caminhão e peso de máquinas.',
    note: 'Uma tonelada métrica é 1.000 kg. A tonelada curta americana (907 kg) e a longa britânica (1.016 kg) são diferentes.',
  },
  'don-g': {
    title: 'Don (돈) coreano para gramas', desc: 'Converte o don, a unidade coreana de joalheria',
    long: 'O don é a unidade com que se pesa ouro e prata na Coreia. Anéis de bebê e alianças são vendidos por don.',
    note: 'Um don é 3,75 g. Um anel "de um don" tem 3,75 g de ouro; para saber o preço, multiplique pela cotação do grama.',
    from: 'don', to: 'g',
  },
  'nyang-g': {
    title: 'Nyang (냥) coreano para gramas', desc: 'Converte o nyang tradicional coreano em gramas',
    long: 'O nyang equivale a dez don e aparece na medicina tradicional e em textos históricos coreanos.',
    note: 'Um nyang é 37,5 g. O tael chinês (兩) tem 50 g e o japonês cerca de 37,5 g — vale conferir a origem.',
    from: 'nyang', to: 'g',
  },
  'geun-g': {
    title: 'Geun (근) coreano para gramas', desc: 'Converte o geun coreano em gramas',
    long: 'O geun continua em uso nos açougues e quitandas da Coreia. Atenção: não vale o mesmo para tudo.',
    note: 'Carne vai a 600 g por geun, mas legumes e frutas a 375 g. Se a banca não avisar, pergunte.',
    from: 'geun', to: 'g',
  },
  'kwan-kg': {
    title: 'Kwan (관) coreano para kg', desc: 'Converte o kwan tradicional coreano em quilos',
    long: 'O kwan é a unidade de peso grande da Coreia e do Japão, e ainda se ouve em mercados de peixe e no atacado.',
    note: 'Um kwan é 3,75 kg, ou seja cem don. O kan japonês (貫) vale o mesmo.',
    from: 'kwan', to: 'kg',
  },
  'carat-g': {
    title: 'Quilates para gramas', desc: 'Converte quilates em gramas',
    long: 'O quilate é a unidade com que se pesam pedras preciosas. Um diamante "de um quilate" pesa 0,2 g.',
    note: 'Cuidado com a palavra: o quilate de peso (ct) não é o quilate de pureza do ouro (K). Ouro 18K é uma proporção, não um peso.',
  },
  'stone-kg': {
    title: 'Stones para kg', desc: 'Converte stones em quilos',
    long: 'O stone é a unidade com que os britânicos dão o peso corporal. "11 stone 4" são 71,7 kg.',
    note: 'Um stone é 6,35 kg, ou seja 14 libras. Nos Estados Unidos não se usa: lá o peso vem em libras soltas.',
  },
  'troyounce-g': {
    title: 'Onças troy para gramas', desc: 'Converte onças troy em gramas',
    long: 'A onça troy é a unidade com que se cotam ouro, prata e platina. O preço do ouro no noticiário é por onça troy.',
    note: 'Uma onça troy é 31,1035 g, 10% mais que a onça comum (28,35 g). Confundir as duas muda o preço.',
    from: 'oz troy', to: 'g',
  },
  'grain-g': {
    title: 'Grains para gramas', desc: 'Converte grains em gramas',
    long: 'O grain é a menor unidade de massa da tradição inglesa e serve para munição e doses de medicamento. Nasceu como o peso de um grão de cevada.',
    note: 'Um grain é 0,0648 g. Um projétil "de 55 grains" pesa cerca de 3,6 g.',
    from: 'grains', to: 'g',
  },
  'dram-g': {
    title: 'Dracmas para gramas', desc: 'Converte dracmas (drams) em gramas',
    long: 'O dracma é uma unidade pequena do sistema inglês e aparece em perfumaria e em cargas de pólvora.',
    note: 'Um dracma é 1,772 g, ou seja 1/16 de onça. O dracma de volume (fluid dram) é outra coisa.',
    from: 'dracmas', to: 'g',
  },
  'jin-g': {
    title: 'Jin (斤) chinês para gramas', desc: 'Converte o jin chinês em gramas',
    long: 'O jin é a unidade de peso do dia a dia na China: legumes e carne são vendidos por jin nos mercados.',
    note: 'Um jin chinês é exatamente 500 g. O geun coreano é 600 g para carne — o mesmo caractere, valores diferentes.',
    from: '斤', to: 'g',
  },
  'momme-g': {
    title: 'Momme (匁) para gramas', desc: 'Converte o momme japonês em gramas',
    long: 'O momme é a unidade japonesa com que se pesam pérolas e seda. A gramatura da seda é indicada em momme.',
    note: 'Um momme é 3,75 g, o mesmo que um don coreano. Uma seda "de 19 momme" é uma gramatura por metro quadrado.',
    from: '匁', to: 'g',
  },
  'longton-kg': {
    title: 'Toneladas longas para kg', desc: 'Converte toneladas longas britânicas em quilos',
    long: 'A tonelada longa é a unidade de peso grande britânica e aparece em deslocamento de navios e em cargas antigas.',
    note: 'Uma tonelada longa é 1.016 kg, um pouco mais que a métrica. A tonelada curta americana é 907 kg.',
    from: 'ton. longas', to: 'kg',
  },
  'shortton-kg': {
    title: 'Toneladas curtas para kg', desc: 'Converte toneladas curtas americanas em quilos',
    long: 'A tonelada curta é o que se entende por "tonelada" nos Estados Unidos: pesos de caminhão e de materiais.',
    note: 'Uma tonelada curta é 907,18 kg, ou seja 2.000 libras — 9% menos que a tonelada métrica.',
    from: 'ton. curtas', to: 'kg',
  },
  'mcg-mg': {
    title: 'μg para mg', desc: 'Converte microgramas e miligramas',
    long: 'Passa microgramas para miligramas e volta. Doses de vitaminas e medicamentos misturam as duas unidades.',
    note: 'Um miligrama é 1.000 microgramas. Confundir mcg com mg dá um erro de mil vezes na dose.',
  },

  /* ───────── 부피 ───────── */
  'l-gallon': {
    title: 'Litros para galões', desc: 'Converte litros e galões nos dois sentidos',
    long: 'Passa litros para galões e volta. Combustível e bebidas grandes nos Estados Unidos vêm em galões.',
    note: 'Usa-se o galão americano: 3,785 L. O galão imperial britânico é 4,546 L, 20% maior.',
  },
  'ml-floz': {
    title: 'mL para onças fluidas', desc: 'Converte mililitros e onças fluidas',
    long: 'Passa mililitros para onças fluidas e volta. Cosméticos e bebidas importadas vêm em fl oz.',
    note: 'Usa-se a onça fluida americana: 29,57 mL. A britânica é 28,41 mL.',
  },
  'doe-l': {
    title: 'Doe (되) coreano para litros', desc: 'Converte o doe tradicional coreano em litros',
    long: 'O doe é a medida de grãos e bebidas da Coreia. Makgeolli e cereais continuam sendo vendidos por doe nos mercados.',
    note: 'Um doe é 1,8 L. O shō japonês (升) mede o mesmo, cerca de 1,8 L.',
    from: 'doe', to: 'L',
  },
  'mal-l': {
    title: 'Mal (말) coreano para litros', desc: 'Converte o mal tradicional coreano em litros',
    long: 'O mal equivale a dez doe e serve para grãos no atacado. "Um mal de arroz" é cerca de 18 L, ou seja 8 kg.',
    note: 'Um mal é 18 L. Ao passar para peso depende do grão: arroz dá cerca de 8 kg por mal.',
    from: 'mal', to: 'L',
  },
  'cup-ml': {
    title: 'Xícaras para mL', desc: 'Converte xícaras de cozinha e mililitros',
    long: 'Passa xícaras para mililitros e volta. Receitas de fora são escritas em xícaras.',
    note: 'A xícara americana é 240 mL e a métrica 200 mL. A diferença de 20% aparece na confeitaria.',
    from: 'xícara', to: 'mL',
  },
  'barrel-l': {
    title: 'Barris para litros', desc: 'Converte barris de petróleo em litros',
    long: 'Passa barris para litros e volta. O preço do petróleo no noticiário é por barril.',
    note: 'Um barril de petróleo é 158,99 L. O barril de cerveja é outra medida — 117 L nos Estados Unidos.',
  },
  'cubicm-l': {
    title: 'Metros cúbicos para litros', desc: 'Converte metros cúbicos e litros',
    long: 'Passa metros cúbicos para litros e volta. O consumo de água e de gás na conta vem em metros cúbicos.',
    note: 'Um metro cúbico é exatamente 1.000 L. Um consumo de "15 m³" na conta de água são 15.000 L.',
  },
  'tbsp-ml': {
    title: 'Colheres de sopa para mL', desc: 'Converte colheres de sopa e mililitros',
    long: 'Passa colheres de sopa para mililitros e volta. Receitas e doses de xarope usam colheres.',
    note: 'Uma colher de sopa é 15 mL. A colher australiana é 20 mL — vale olhar a origem da receita.',
    from: 'c. sopa', to: 'mL',
  },
  'tsp-ml': {
    title: 'Colheres de chá para mL', desc: 'Converte colheres de chá e mililitros',
    long: 'Passa colheres de chá para mililitros e volta. Aparece em receitas e nas quantidades pequenas da cozinha.',
    note: 'Uma colher de chá é 5 mL, ou seja um terço da colher de sopa. As colheres da mesa não dão a medida exata.',
    from: 'c. chá', to: 'mL',
  },
  'pint-l': {
    title: 'Pints para litros', desc: 'Converte pints em litros',
    long: 'O pint é a medida com que se serve cerveja em pubs britânicos e irlandeses. Também aparece em sorvete e creme de leite nos Estados Unidos.',
    note: 'O pint britânico é 568 mL e o americano 473 mL. Um pint de cerveja em Londres vem com 100 mL a mais.',
    from: 'pints', to: 'L',
  },
  'quart-l': {
    title: 'Quarts para litros', desc: 'Converte quarts em litros',
    long: 'O quart são dois pints e aparece em leite, óleo de motor e panelas nos Estados Unidos.',
    note: 'O quart americano é 946 mL, quase um litro. O britânico é 1,137 L.',
    from: 'quarts', to: 'L',
  },
  'cc-ml': {
    title: 'cc para mL', desc: 'Converte centímetros cúbicos e mililitros',
    long: 'O cc e o mL são exatamente a mesma coisa. A cilindrada das motos e o volume de seringas vêm em cc.',
    note: '1 cc = 1 mL, sempre. Uma moto "de 125 cc" tem 125 mL de cilindrada.',
    from: 'cc', to: 'mL',
  },
  'hop-ml': {
    title: 'Hop (홉) coreano para mL', desc: 'Converte o hop tradicional coreano em mililitros',
    long: 'O hop é a décima parte do doe e aparece nas garrafas de soju e nas medidas de arroz.',
    note: 'Um hop é 180 mL. A garrafa de soju de 360 mL são exatamente dois hop.',
    from: 'hop', to: 'mL',
  },
  'bushel-l': {
    title: 'Bushels para litros', desc: 'Converte bushels em litros',
    long: 'O bushel é a medida com que se negocia grão nos Estados Unidos. As cotações de milho e soja vêm por bushel.',
    note: 'Um bushel é 35,24 L. Como é medida de volume, o peso muda com o grão: milho dá cerca de 25,4 kg por bushel.',
    from: 'bushels', to: 'L',
  },

  /* ───────── 넓이 ───────── */
  'pyeong-m2': {
    title: 'Pyeong (평) para m²', desc: 'Converte o pyeong coreano em metros quadrados',
    long: 'O pyeong é a unidade com que se fala de área de moradia na Coreia. Os anúncios oficiais vêm em m², mas a conversa continua em pyeong.',
    note: 'Um pyeong é 3,3058 m². Um apartamento "de 84 m²" tem cerca de 25 pyeong. O tsubo japonês vale o mesmo.',
    from: 'pyeong', to: 'm²',
  },
  'm2-sqft': {
    title: 'm² para pés quadrados', desc: 'Converte metros quadrados e pés quadrados',
    long: 'Passa metros quadrados para pés quadrados e volta. Anúncios de imóveis nos Estados Unidos vêm em pés quadrados.',
    note: 'Um metro quadrado é 10,764 pés quadrados. Um apartamento "de 1.000 sq ft" tem cerca de 93 m².',
  },
  'acre-m2': {
    title: 'Acres para m²', desc: 'Converte acres e metros quadrados',
    long: 'Passa acres para metros quadrados e volta. Fazendas e terrenos em países de língua inglesa são medidos em acres.',
    note: 'Um acre é 4.047 m², pouco mais que metade de um campo de futebol. Um hectare tem 2,47 acres.',
  },
  'hectare-m2': {
    title: 'Hectares para m²', desc: 'Converte hectares e metros quadrados',
    long: 'Passa hectares para metros quadrados e volta. O hectare é a unidade internacional para terras agrícolas e florestais.',
    note: 'Um hectare é 10.000 m², ou seja um quadrado de 100 por 100 metros.',
  },
  'danbo-m2': {
    title: 'Danbo (단보) para m²', desc: 'Converte o danbo tradicional coreano em metros quadrados',
    long: 'O danbo é a unidade de área agrícola da Coreia e equivale a 300 pyeong. A produtividade do arroz é dada por danbo.',
    note: 'Um danbo é 991,7 m², quase um décimo de hectare. Dez danbo fazem um jeongbo (정보).',
    from: 'danbo', to: 'm²',
  },
  'majigi-pyeong': {
    title: 'Majigi (마지기) para pyeong', desc: 'Converte o majigi tradicional coreano em pyeong',
    long: 'O majigi é a área que se semeia com um mal de semente, então o tamanho muda conforme a região e a cultura.',
    note: 'Costuma-se tomar 200 pyeong para arrozal, mas em algumas regiões são 150 e em outras 300. É uma medida aproximada.',
    from: 'majigi', to: 'pyeong',
  },
  'sqinch-cm2': {
    title: 'Polegadas quadradas para cm²', desc: 'Converte polegadas quadradas em centímetros quadrados',
    long: 'A polegada quadrada aparece em áreas de impressão, sensores de câmera e áreas de contato.',
    note: 'Uma polegada quadrada é 6,4516 cm². Ao elevar ao quadrado, o fator 2,54 vira 6,45.',
    from: 'in²', to: 'cm²',
  },
  'sqyard-m2': {
    title: 'Jardas quadradas para m²', desc: 'Converte jardas quadradas em metros quadrados',
    long: 'A jarda quadrada serve para carpete, tecido e áreas de jardim em países de língua inglesa.',
    note: 'Uma jarda quadrada é 0,8361 m², um pouco menos que um metro quadrado.',
    from: 'yd²', to: 'm²',
  },
  'sqmile-km2': {
    title: 'Milhas quadradas para km²', desc: 'Converte milhas quadradas em quilômetros quadrados',
    long: 'A milha quadrada serve para áreas de cidades e condados, e para a extensão de incêndios.',
    note: 'Uma milha quadrada é 2,59 km². Ao elevar ao quadrado, o fator 1,609 vira 2,59.',
    from: 'mi²', to: 'km²',
  },
  'are-m2': {
    title: 'Ares (a) para m²', desc: 'Converte ares em metros quadrados',
    long: 'O are é a centésima parte do hectare e aparece em cadastros e em lotes pequenos.',
    note: 'Um are é exatamente 100 m². Cem ares fazem um hectare.',
    from: 'a', to: 'm²',
  },
  'mu-m2': {
    title: 'Mu (畝) chinês para m²', desc: 'Converte o mu chinês em metros quadrados',
    long: 'O mu é a unidade de área agrícola da China e é usada no dia a dia do campo e nas estatísticas.',
    note: 'Um mu é cerca de 666,7 m². Quinze mu fazem um hectare.',
    from: '畝', to: 'm²',
  },

  /* ───────── 온도 ───────── */
  'celsius-fahrenheit': {
    title: 'Celsius para Fahrenheit', desc: 'Converte graus Celsius e Fahrenheit',
    long: 'Passa Celsius para Fahrenheit e volta. A previsão do tempo e os fornos nos Estados Unidos vêm em Fahrenheit.',
    note: 'A fórmula é °F = °C × 1,8 + 32. Há um deslocamento de 32, então não basta multiplicar.',
    from: '°C', to: '°F',
  },
  'celsius-kelvin': {
    title: 'Celsius para Kelvin', desc: 'Converte graus Celsius e kelvin',
    long: 'Passa Celsius para kelvin e volta. A física e a temperatura de cor das lâmpadas usam kelvin.',
    note: 'K = °C + 273,15. O zero absoluto (0 K) é −273,15 °C, e abaixo disso não existe temperatura.',
    from: '°C', to: 'K',
  },
  'fahrenheit-kelvin': {
    title: '°F para kelvin', desc: 'Converte graus Fahrenheit e kelvin',
    long: 'Passa Fahrenheit para kelvin e volta. Necessário ao ler artigos técnicos americanos em unidades absolutas.',
    note: 'Primeiro passe para Celsius e depois some 273,15. A escala Fahrenheit avança 1,8 vez mais devagar.',
    from: '°F', to: 'K',
  },
  'celsius-rankine': {
    title: '°C para Rankine (°R)', desc: 'Converte graus Celsius e Rankine',
    long: 'A escala Rankine é a escala absoluta com os graus do Fahrenheit, e aparece em termodinâmica e engenharia americana.',
    note: 'O zero de Rankine coincide com o zero absoluto e seus graus equivalem aos Fahrenheit. 0 °C são 491,67 °R.',
    from: '°C', to: '°R',
  },

  /* ───────── 속도 ───────── */
  'kmh-mph': {
    title: 'km/h para mph', desc: 'Converte quilômetros por hora e milhas por hora',
    long: 'Passa km/h para mph e volta. Os limites de velocidade nos Estados Unidos e no Reino Unido vêm em mph.',
    note: '60 mph são 96,6 km/h. O "60" do velocímetro americano fica perto dos nossos 100 km/h.',
  },
  'ms-kmh': {
    title: 'm/s para km/h', desc: 'Converte metros por segundo e quilômetros por hora',
    long: 'Passa m/s para km/h e volta. A velocidade do vento nos boletins meteorológicos vem em m/s.',
    note: 'Multiplica-se por 3,6. Um vento de 10 m/s são 36 km/h — alerta de vento forte.',
  },
  'knot-kmh': {
    title: 'Nós para km/h', desc: 'Converte nós e quilômetros por hora',
    long: 'Passa nós para km/h e volta. Navios, aviões e alertas de tufão usam nós.',
    note: 'Um nó é 1,852 km/h, ou seja uma milha náutica por hora.',
  },
  'mach-kmh': {
    title: 'Mach para km/h', desc: 'Converte números Mach e quilômetros por hora',
    long: 'Passa Mach para km/h e volta. A velocidade dos caças é dada em múltiplos da velocidade do som.',
    note: 'Toma-se Mach 1 = 1.225 km/h ao nível do mar. Em altitude o ar é mais frio e a velocidade do som cai, então o valor real muda.',
  },
  'mph-ms': {
    title: 'mph para m/s', desc: 'Converte milhas por hora e metros por segundo',
    long: 'Passa mph para m/s e volta. Necessário ao comparar velocidade de vento ou de arremesso entre fontes.',
    note: 'Uma mph é 0,447 m/s. Um arremesso de 100 mph é cerca de 44,7 m/s.',
    from: 'mph', to: 'm/s',
  },
  'pace-kmh': {
    title: 'Ritmo de corrida para km/h', desc: 'Converte minutos por quilômetro e km/h',
    long: 'Passa o ritmo (min/km) para velocidade (km/h) e volta. Relógios esportivos mostram ritmo e esteiras mostram velocidade.',
    note: 'É uma relação inversa: um ritmo de 5 min/km são 12 km/h, e de 6 min/km são 10 km/h. Quanto menor o ritmo, maior a velocidade.',
    from: 'min/km', to: 'km/h',
  },
  'fps-ms': {
    title: 'ft/s para m/s', desc: 'Converte pés por segundo e metros por segundo',
    long: 'Passa pés por segundo para metros por segundo e volta. Aparece em velocidade de projéteis e em física americana.',
    note: 'Um pé por segundo é 0,3048 m/s. Uma velocidade de "1.000 ft/s" é cerca de 305 m/s.',
    from: 'ft/s', to: 'm/s',
  },

  /* ───────── 데이터 ───────── */
  'mb-gb': {
    title: 'MB para GB', desc: 'Converte megabytes e gigabytes',
    long: 'Passa megabytes para gigabytes e volta. Tamanho de arquivo, franquia de dados e capacidade de disco.',
    note: 'Aqui 1 GB = 1.000 MB (decimal). O Windows conta 1.024, e por isso um disco "de 1 TB" aparece como 931 GB.',
  },
  'gb-tb': {
    title: 'GB para TB', desc: 'Converte gigabytes e terabytes',
    long: 'Passa gigabytes para terabytes e volta. HDs, SSDs e armazenamento em nuvem.',
    note: '1 TB = 1.000 GB no critério decimal do fabricante. O sistema conta em 1.024 e mostra menos.',
  },
  'mbps-mbs': {
    title: 'Mbps para MB/s', desc: 'Converte velocidade de rede e velocidade de download',
    long: 'Passa Mbps para MB/s e volta. As operadoras anunciam bits por segundo e os gerenciadores de download mostram bytes por segundo.',
    note: 'Divide-se por 8: uma linha de 100 Mbps baixa a cerca de 12,5 MB/s no máximo. Não é enganação, são unidades diferentes.',
  },
  'kb-mb': {
    title: 'KB para MB', desc: 'Converte kilobytes e megabytes',
    long: 'Passa kilobytes para megabytes e volta. Anexos de e-mail, imagens e limites de upload.',
    note: 'Aqui 1 MB = 1.000 KB. No critério binário são 1.024 KB, e em arquivos pequenos a diferença quase não aparece.',
  },
  'byte-bit': {
    title: 'Bytes para bits', desc: 'Converte bytes e bits',
    long: 'Passa bytes para bits e volta. A rede é medida em bits e o armazenamento em bytes.',
    note: 'Um byte é 8 bits. B maiúsculo é byte e b minúsculo é bit: Mbps e MBps não são a mesma coisa.',
  },
  'tb-pb': {
    title: 'TB para PB', desc: 'Converte terabytes e petabytes',
    long: 'Passa terabytes para petabytes e volta. Aparece em data centers e em volumes de backup.',
    note: '1 PB = 1.000 TB no critério decimal. Um petabyte caberia em cerca de mil discos de 1 TB.',
  },
  'kib-kb': {
    title: 'KiB para KB', desc: 'Converte kibibytes e kilobytes',
    long: 'O KiB é a unidade binária (1.024 bytes) e o KB a decimal (1.000 bytes). É a raiz de o sistema e o fabricante darem números diferentes.',
    note: '1 KiB = 1,024 KB. A diferença é de 2,4% aqui, mas cresce a cada degrau: em TiB já passa de 10%.',
    from: 'KiB', to: 'KB',
  },
  'mib-mb': {
    title: 'MiB para MB', desc: 'Converte mebibytes e megabytes',
    long: 'O MiB são 1.048.576 bytes e o MB 1.000.000. O Linux e muitas ferramentas mostram MiB mesmo escrevendo "MB".',
    note: '1 MiB = 1,049 MB. Uma imagem de disco "de 700 MB" costuma ser na verdade 700 MiB, ou 734 MB.',
    from: 'MiB', to: 'MB',
  },
  'gib-gb': {
    title: 'GiB para GB', desc: 'Converte gibibytes e gigabytes',
    long: 'O GiB é a unidade binária e o GB a decimal. É exatamente a razão de um disco de 1 TB aparecer como 931 GB.',
    note: '1 GiB = 1,074 GB. A diferença é de 7,4%: os 931 "GB" que o Windows mostra são na verdade 931 GiB.',
    from: 'GiB', to: 'GB',
  },

  /* ───────── 에너지 ───────── */
  'kcal-kj': {
    title: 'Calorias para quilojoules', desc: 'Converte quilocalorias e quilojoules',
    long: 'Passa quilocalorias para quilojoules e volta. Rótulos nutricionais europeus e australianos trazem kJ.',
    note: 'Uma kcal é 4,184 kJ. As "2.000 kcal" diárias são cerca de 8.370 kJ.',
  },
  'kw-hp': {
    title: 'kW para cavalos', desc: 'Converte quilowatts e cavalos-vapor',
    long: 'Passa quilowatts para cavalos e volta. A potência dos carros vem em cavalos e a dos elétricos em kW.',
    note: 'Usa-se o cavalo métrico (PS): 1 kW = 1,36 PS. O cavalo britânico (hp) é 1,4% maior.',
  },
  'kwh-mj': {
    title: 'kWh para megajoules', desc: 'Converte quilowatt-hora e megajoules',
    long: 'Passa kWh para MJ e volta. A conta de luz vem em kWh e os cálculos de física em joules.',
    note: 'Um kWh é 3,6 MJ. É a energia de manter 1.000 W por uma hora.',
  },
  'joule-cal': {
    title: 'Joules para calorias', desc: 'Converte joules e calorias',
    long: 'Passa joules para calorias e volta. Exercícios de física e rótulos de alimentos usam unidades diferentes para a mesma coisa.',
    note: 'Um joule é 0,239 caloria. A "caloria" dos alimentos é na verdade a quilocaloria, mil vezes maior.',
  },
  'wh-joule': {
    title: 'Wh para joules', desc: 'Converte watt-hora e joules',
    long: 'Passa watt-hora para joules e volta. A capacidade das baterias vem em Wh, e os limites das companhias aéreas também.',
    note: 'Um Wh é 3.600 J. As companhias aéreas costumam permitir baterias de até 100 Wh na cabine.',
    from: 'Wh', to: 'J',
  },
  'btu-kj': {
    title: 'BTU para kJ', desc: 'Converte BTU e quilojoules',
    long: 'O BTU é a unidade de calor da tradição inglesa e serve para potência de ar-condicionado e caldeiras.',
    note: 'Um BTU é 1,055 kJ. Um ar "de 12.000 BTU" equivale a uma tonelada de refrigeração, cerca de 3,5 kW.',
    from: 'BTU', to: 'kJ',
  },
  'kcal-kwh': {
    title: 'kcal para kWh', desc: 'Converte quilocalorias e quilowatt-hora',
    long: 'Passa quilocalorias para quilowatt-hora e volta. Serve para comparar a energia dos alimentos com o consumo elétrico.',
    note: 'Uma kcal é 0,00116 kWh. As 2.000 kcal que comemos por dia são só 2,3 kWh — menos que uma máquina de lavar.',
    from: 'kcal', to: 'kWh',
  },
  'therm-kwh': {
    title: 'Therms para kWh', desc: 'Converte therms e quilowatt-hora',
    long: 'O therm é a unidade com que se cobra o gás nos Estados Unidos e no Reino Unido. Serve para comparar a conta de gás com a de luz.',
    note: 'Um therm é 29,3 kWh, ou seja 100.000 BTU. Um therm dá muito mais energia que um kWh de eletricidade.',
    from: 'therm', to: 'kWh',
  },

  /* ───────── 압력·기타 ───────── */
  'bar-psi': {
    title: 'bar para psi', desc: 'Converte bar e psi',
    long: 'Passa bar para psi e volta. A pressão dos pneus e os manômetros misturam as duas unidades.',
    note: 'Um bar é 14,5 psi. Os 2,2 bar recomendados para um pneu são cerca de 32 psi.',
  },
  'hpa-mmhg': {
    title: 'hPa para mmHg', desc: 'Converte hectopascais e milímetros de mercúrio',
    long: 'Passa hPa para mmHg e volta. Os boletins meteorológicos usam hPa e a pressão arterial mmHg.',
    note: 'Um hPa é 0,75 mmHg. A pressão atmosférica normal, 1.013 hPa, são 760 mmHg.',
  },
  'mpg-kmpl': {
    title: 'mpg para km/L', desc: 'Converte milhas por galão e quilômetros por litro',
    long: 'Passa mpg americanos para km/L e volta. Necessário ao ler testes de carros estrangeiros.',
    note: 'Usa-se o galão americano: 30 mpg são cerca de 12,8 km/L. Os números britânicos saem 20% mais altos, então confira a fonte.',
  },
  'atm-kpa': {
    title: 'Atmosferas para kPa', desc: 'Converte atmosferas e quilopascais',
    long: 'A atmosfera é a pressão ao nível do mar e serve para mergulho e química.',
    note: 'Uma atmosfera é 101,325 kPa. Debaixo da água soma-se uma atmosfera a cada 10 m de profundidade.',
    from: 'atm', to: 'kPa',
  },
  'psi-kpa': {
    title: 'psi para kPa', desc: 'Converte psi e quilopascais',
    long: 'Passa psi para quilopascais e volta. Manuais de carro e ferramentas de ar comprimido usam psi.',
    note: 'Um psi é 6,895 kPa. Os 32 psi de um pneu são cerca de 220 kPa.',
    from: 'psi', to: 'kPa',
  },
  'torr-pa': {
    title: 'Torr para pascais', desc: 'Converte torr e pascais',
    long: 'O torr equivale a um milímetro de mercúrio e serve para tecnologia de vácuo e laboratórios.',
    note: 'Um torr é 133,3 Pa. A pressão atmosférica são 760 torr.',
    from: 'torr', to: 'Pa',
  },
  'inhg-hpa': {
    title: 'inHg para hPa', desc: 'Converte polegadas de mercúrio e hectopascais',
    long: 'Polegadas de mercúrio são a unidade de pressão dos boletins meteorológicos e da aviação americana.',
    note: 'Uma polegada de mercúrio é 33,86 hPa. O ajuste altimétrico padrão, 29,92 inHg, são 1.013 hPa.',
    from: 'inHg', to: 'hPa',
  },

  /* ───────── 시간 ───────── */
  'frame-sec': {
    title: 'Quadros para segundos (30 fps)', desc: 'Converte quadros de vídeo e segundos',
    long: 'Passa quadros para segundos e volta, a 30 fps. Serve ao ler timecode na edição de vídeo.',
    note: 'A 30 fps, 90 quadros são 3 segundos. A 24 ou 60 fps a conta muda, então confira os fps do material.',
    from: 'quadros', to: 's',
  },
  'bpm-ms': {
    title: 'BPM para ms por batida', desc: 'Converte tempo musical e duração de uma batida',
    long: 'Passa batidas por minuto para milissegundos por batida e volta. Tempos de delay e reverb na produção musical são ajustados em ms.',
    note: 'É uma relação inversa: 120 BPM são 500 ms por batida. Um delay na semínima nesse tempo se ajusta em 500 ms.',
    from: 'BPM', to: 'ms',
  },
  'ms-sec': {
    title: 'ms para segundos', desc: 'Converte milissegundos e segundos',
    long: 'Passa milissegundos para segundos e volta. Latência de rede, tempo de reação e ajustes de animação.',
    note: 'Um segundo são 1.000 ms. Um ping de 50 ms é 0,05 segundo.',
    from: 'ms', to: 's',
  },

  /* ───────── 각도 ───────── */
  'degree-gradian': {
    title: 'Graus para grados (gon)', desc: 'Converte graus sexagesimais e grados',
    long: 'O grado divide o ângulo reto em 100 partes e é usado em topografia e engenharia civil europeia.',
    note: '90 graus são 100 gon. A calculadora tem um modo GRAD para isso — se o resultado sair estranho, veja em que modo ela está.',
    from: '°', to: 'gon',
  },
  'arcmin-degree': {
    title: 'Minutos de arco para graus', desc: 'Converte minutos de arco e graus',
    long: 'O minuto de arco é a sexagésima parte de um grau e serve para astronomia, óptica e coordenadas.',
    note: 'Um minuto de arco é 1/60 de grau. A Lua vista da Terra mede cerca de 31 minutos de arco.',
    from: '′', to: '°',
  },
  'mil-mm': {
    title: 'Mils para mm', desc: 'Converte mils (thou) e milímetros nos dois sentidos',
    long: 'Um mil é a milésima parte de uma polegada, ou seja 0,0254 mm. Os desenhos norte-americanos usam-no para largura de trilhas, espessura de filmes e camadas de tinta.',
    note: 'Também se chama thou: é a mesma unidade. O nome lembra milímetro, mas um mil não chega nem a um quarenta avos.',
    from: 'mils', to: 'mm',
  },
  'angstrom-nm': {
    title: 'Ångströms para nanômetros', desc: 'Converte ångströms e nanômetros nos dois sentidos',
    long: 'Um ångström é 0,1 nanômetro. Diâmetros atômicos e comprimentos de ligação ficam quase sempre entre um e três ångströms, daí seu uso em cristalografia.',
    note: 'Não é unidade do SI, então as revistas preferem nanômetros ou picômetros. Verifique qual delas cada figura cita.',
    from: 'Å', to: 'nm',
  },
  'pennyweight-g': {
    title: 'Pennyweights para gramas', desc: 'Converte o pennyweight de metais preciosos para gramas',
    long: 'Um pennyweight (dwt) é 1,55517384 g, e vinte deles fazem uma onça troy. Joalheiros norte-americanos e fornecedores de ligas dentárias ainda o citam.',
    note: 'Ele se apoia na onça troy (31,1035 g), não na onça comum (28,35 g). Misturar as duas erra o peso em quase dez por cento.',
    from: 'dwt', to: 'g',
  },
  'tola-g': {
    title: 'Tolas para gramas', desc: 'Converte a tola do ouro sul-asiático para gramas',
    long: 'Uma tola é 11,6638038 g, tirados do peso de uma antiga rupia de prata. Joalheiros da Índia, do Paquistão e de Bangladesh ainda precificam ouro por ela.',
    note: 'Em alguns lugares conta-se 11,34 g, conforme o país e a época. Confirme o valor local antes de negociar.',
    from: 'tola', to: 'g',
  },
  'gill-ml': {
    title: 'Gills para mililitros', desc: 'Converte o gill imperial para mililitros',
    long: 'Um gill imperial é 142,0653125 mL, ou cinco onças líquidas. Aparece em livros de receitas antigos e nas medidas de destilados; os pubs britânicos ainda servem por ele.',
    note: 'O gill norte-americano é 118,29 mL — outra quantidade. Diante de uma receita antiga, veja de que lado do Atlântico ela veio.',
    from: 'gills', to: 'mL',
  },
  'impgallon-l': {
    title: 'Galões imperiais para litros', desc: 'Converte o galão imperial para litros',
    long: 'Um galão imperial é exatamente 4,54609 L. Usado no Reino Unido, na Irlanda e em parte do Caribe, é vinte por cento maior que o galão americano de 3,785 L.',
    note: 'É aqui que as comparações de consumo mais erram. As milhas por galão imperial sempre parecem melhores sem que o carro gaste menos.',
    from: 'gal', to: 'L',
  },
  'rood-m2': {
    title: 'Roods para metros quadrados', desc: 'Converte o rood imperial para metros quadrados',
    long: 'Um rood é 1011,7141056 m², exatamente um quarto de acre. Escrituras britânicas antigas listam acres, roods e perches lado a lado.',
    note: 'A mesma palavra designa um crucifixo, o que confunde em documentos antigos. Só em contexto de área ela vale esse número.',
    from: 'roods', to: 'm²',
  },
  'pace-mile-kmh': {
    title: 'Ritmo por milha para km/h', desc: 'Converte o ritmo de corrida por milha em velocidade',
    long: 'Passa minutos por milha para quilômetros por hora. Como uma milha tem 1,609344 km, dividir 96,56 pelo ritmo dá a velocidade: oito minutos por milha são 12,07 km/h.',
    note: 'Esta divisão inverte o sentido. Quanto menor o ritmo mais rápido; quanto maior a velocidade mais rápido.',
    from: 'min/mile', to: 'km/h',
  },
  'tib-tb': {
    title: 'TiB para TB', desc: 'Converte tebibytes binários e terabytes decimais',
    long: 'Um TiB é dois elevado a quarenta bytes e um TB é dez elevado a doze, então um TiB equivale a cerca de 1,0995 TB. Por isso um disco de 4 TB aparece como 3,64 TiB.',
    note: 'Não sumiu capacidade: cada lado conta de um jeito. O Windows rotula TiB como TB, enquanto o macOS e os fabricantes usam TB.',
    from: 'TiB', to: 'TB',
  },
  'btu-wh': {
    title: 'BTU para watt-hora', desc: 'Converte a unidade de calor BTU em watt-hora',
    long: 'Um BTU é cerca de 0,293071 Wh. A América do Norte mede ar-condicionado e caldeiras em BTU, então converter para unidades elétricas permite comparar com o consumo.',
    note: 'O "BTU" de um ar-condicionado quase sempre abrevia BTU por hora. Doze mil BTU/h fazem uma tonelada de refrigeração.',
    from: 'BTU', to: 'Wh',
  },

  /* ───────── 셋째 묶음 16종 ───────── */
  'chain-m': {
    title: 'Chains para metros',
    desc: 'Converte a corrente de agrimensor para metros',
    long: 'Converte chains para metros e vice-versa. A unidade sobrevive em registros de terra britânicos e americanos antigos, nos marcos ferroviários e no comprimento de um campo de críquete.',
    note: 'Um chain são 66 pés, exatamente 20,1168 m. Dez chains fazem um furlong e oitenta fazem uma milha, então ele é a régua por trás da milha.',
  },
  'rod-m': {
    title: 'Rods para metros',
    desc: 'Converte a antiga vara de medição para metros',
    long: 'Converte rods para metros e vice-versa. Também chamado de pole ou perch, aparece em escrituras inglesas e americanas antigas e em comprimentos de cercas e valas.',
    note: 'Um rod são 16,5 pés, exatamente 5,0292 m. Quatro rods fazem um chain, e uma faixa de quatro por quarenta rods dá exatamente um acre.',
  },
  'barleycorn-mm': {
    title: 'Grãos de cevada para milímetros',
    desc: 'O degrau por trás dos números de calçado britânicos',
    long: 'Batizada por um grão de cevada, esta unidade é um terço de polegada. É por isso que os números de calçado britânicos e americanos sobem cerca de 8,47 mm por vez.',
    note: 'A numeração adulta começa em doze grãos (quatro polegadas) e soma um por número. O 8 se refere à fôrma, não ao comprimento do seu pé.',
  },
  'parsec-lightyear': {
    title: 'Parsecs para anos-luz',
    desc: 'Converte entre unidades de distância astronômica',
    long: 'Converte o parsec dos artigos astronômicos para o ano-luz da divulgação. Um parsec é a distância em que o raio da órbita da Terra ocupa um segundo de arco.',
    note: 'Um parsec equivale a cerca de 3,26 anos-luz. Proxima Centauri, a estrela mais próxima, fica a 1,30 parsec — 4,24 anos-luz.',
  },
  'slug-kg': {
    title: 'Slugs para quilogramas',
    desc: 'A unidade de massa da engenharia imperial',
    long: 'Converte slugs para quilogramas e vice-versa. Um slug é a massa que uma libra-força acelera a um pé por segundo ao quadrado, usada na engenharia americana para separar massa de peso.',
    note: 'Libra é peso e slug é massa. Um slug equivale a cerca de 32,174 libras — o mesmo número da gravidade em pés por segundo ao quadrado.',
  },
  'quintal-kg': {
    title: 'Quintais para quilogramas',
    desc: 'A unidade de 100 kg do comércio de grãos',
    long: 'Converte quintais para quilogramas e vice-versa. Grãos e fertilizantes são negociados por quintal na Europa, na Índia e na América Latina, contando cem quilos como um lote.',
    note: 'O quintal métrico é exatamente 100 kg. O hundredweight, de nome parecido, é diferente: 45,36 kg nos EUA e 50,80 kg no Reino Unido.',
  },
  'peck-l': {
    title: 'Pecks para litros',
    desc: 'Uma medida de secos igual a um quarto de bushel',
    long: 'Converte pecks para litros e vice-versa. É o tamanho do cesto em que maçãs e batatas são vendidas, ainda em uso nas feiras de produtores americanas.',
    note: 'Um peck seco americano tem 8,81 L e quatro pecks fazem um bushel. O peck imperial tem 9,09 L, então o número muda.',
  },
  'dunam-m2': {
    title: 'Dunams para metros quadrados',
    desc: 'A unidade de área do Oriente Médio e dos Bálcãs',
    long: 'Converte dunams para metros quadrados e vice-versa. Herdada do Império Otomano, continua sendo a unidade de trabalho nas negociações de terra em Israel, na Turquia e nos Bálcãs.',
    note: 'O dunam métrico é 1.000 m², um décimo de hectare. O antigo dunam otomano tinha cerca de 919 m², então documentos velhos diferem.',
  },
  'celsius-reaumur': {
    title: 'Celsius para Réaumur',
    desc: 'Converte graus Celsius para a escala Réaumur',
    long: 'Converte Celsius para Réaumur e vice-versa. A escala coloca o congelamento da água em 0 e a fervura em 80, e persiste em receitas europeias de queijo e calda.',
    note: 'Multiplique os Celsius por 0,8 para obter Réaumur. As duas escalas partem do mesmo zero, então basta a multiplicação.',
  },
  'pib-tib': {
    title: 'PiB para TiB',
    desc: 'Converte pebibytes para tebibytes',
    long: 'Converte pebibytes para tebibytes e vice-versa. Essas unidades em potências de dois são as que realmente aparecem no planejamento de capacidade de data center e de backup.',
    note: 'Um PiB são 1.024 TiB. Os fabricantes anunciam PB em potências de dez, então 1 PB é só 0,888 PiB — mais de dez por cento de diferença.',
  },
  'toe-mwh': {
    title: 'Toneladas equivalentes de petróleo para MWh',
    desc: 'Converte a unidade estatística de energia para eletricidade',
    long: 'Converte toneladas equivalentes de petróleo para megawatt-hora e vice-versa. As estatísticas energéticas nacionais a usam para colocar carvão, gás e eletricidade na mesma escala.',
    note: 'Uma tep é definida como 41,868 GJ, ou 11,63 MWh. É um número contábil fixado, não o poder calorífico real de um petróleo específico.',
  },
  'tnt-gj': {
    title: 'Toneladas de TNT para gigajoules',
    desc: 'Converte poder explosivo em energia',
    long: 'Converte toneladas equivalentes de TNT para gigajoules e vice-versa. É assim que se comparam a energia de terremotos e o tamanho de explosões, e é o número por trás das manchetes que citam “tantas toneladas de TNT”.',
    note: 'Uma tonelada de TNT é definida como exatamente 4,184 GJ. É uma convenção fixa, não um calor de detonação medido.',
  },
  'ksi-mpa': {
    title: 'ksi para MPa',
    desc: 'Converte unidades de resistência de materiais',
    long: 'Converte ksi para megapascais e vice-versa. As normas americanas de materiais informam resistência à tração e limite de escoamento em ksi, então compará-las com especificações internacionais passa por esta conversão.',
    note: 'Um ksi são 1.000 psi, cerca de 6,895 MPa. Os 800 MPa de tração de um parafuso classe 8.8 dão aproximadamente 116 ksi.',
  },
  'footcandle-lux': {
    title: 'Foot-candles para lux',
    desc: 'Converte entre unidades de iluminância',
    long: 'Converte foot-candles para lux e vice-versa. As orientações americanas de iluminação são escritas em foot-candles, então compará-las com normas internacionais exige este passo.',
    note: 'Um foot-candle equivale a cerca de 10,76 lux. A razão é simplesmente a que existe entre um pé quadrado e um metro quadrado.',
  },
  'mil-degree': {
    title: 'Milésimos para graus',
    desc: 'Converte a unidade angular militar para graus',
    long: 'Converte milésimos para graus e vice-versa. Artilharia e tiro usam esta unidade, que divide a volta completa em 6.400 partes segundo a convenção da OTAN.',
    note: 'Um ângulo reto tem 1.600 milésimos. Um milésimo cobre cerca de um metro a mil metros, o que liga distância e largura de cabeça.',
  },
  'sidereal-day-hour': {
    title: 'Dia sideral para horas',
    desc: 'Quanto dura um dia medido pelas estrelas',
    long: 'Converte o dia sideral para horas. É o tempo que a Terra leva para girar uma vez em relação às estrelas, cerca de quatro minutos a menos que as 24 horas marcadas pelo Sol.',
    note: 'A Terra orbita enquanto gira, então precisa girar um pouco mais para trazer o Sol de volta. Esses 3 minutos e 56 segundos por dia somam exatamente um dia por ano.',
    from: 'dia sideral', to: 'horas',
  },

  /* ───────── 넷째 묶음 12종 ───────── */
  'radian-degree': {
    title: 'Radianos para graus',
    desc: 'Converte radianos para graus nos dois sentidos',
    long: 'Converte radianos para graus e de volta. A matemática, a física e todas as linguagens de programação fazem trigonometria em radianos, enquanto as pessoas descrevem ângulos em graus.',
    note: 'Um radiano é um comprimento de arco dividido por um raio, portanto não carrega unidade. É por isso que SIN() na planilha e math.sin() no Python leem 30 como 30 radianos e não como 30 graus: o erro mais comum em qualquer planilha com trigonometria.',
  },
  'minute-hour': {
    title: 'Minutos para horas',
    desc: 'Converte minutos em horas decimais',
    long: 'Converte minutos para horas e de volta. Necessário onde o tempo é cobrado ou registrado: folha de ponto, pagamento por hora, duração de vídeo, estacionamento e aluguel.',
    note: 'O resultado é uma hora decimal. Uma hora e quarenta e cinco minutos são 1,75 hora e não 1,45: anotar 1,45 apaga dezoito minutos, e esse é o erro clássico de folha de pagamento.',
    from: 'min', to: 'h',
  },
  'day-hour': {
    title: 'Dias para horas',
    desc: 'Converte um número de dias em horas',
    long: 'Converte dias para horas e de volta. Serve para prazos de entrega, intervalos entre doses, tempo de atividade de servidor e aluguel de equipamento, onde dias e horas se misturam no mesmo cálculo.',
    note: 'Um dia não tem sempre 24 horas. Onde existe horário de verão, o dia em que ele começa tem 23 horas e o dia em que termina tem 25, então um voo ou reunião contado sobre aquele fim de semana sai uma hora deslocado.',
    from: 'dias', to: 'horas',
  },
  'week-day': {
    title: 'Semanas para dias',
    desc: 'Converte semanas em um número de dias',
    long: 'Converte semanas para dias e de volta. Semanas de gestação, cronogramas de projeto, prazos de aviso e prazos de aplicação são contados em semanas, mas precisam ser colocados no calendário.',
    note: '"Em duas semanas" num contrato são 14 dias corridos, mas apenas 10 dias úteis. Quando o texto não diz qual dos dois, entende-se dias corridos, e planejar assim é o mais seguro.',
    from: 'semanas', to: 'dias',
  },
  'rpm-hz': {
    title: 'rpm para hertz',
    desc: 'Converte rotações por minuto em frequência',
    long: 'Converte rotações por minuto para hertz e de volta. Motores, ventiladores e furadeiras são especificados em rpm, enquanto a análise de vibração e os inversores de frequência são ajustados em hertz.',
    note: 'A frequência da rede e a rotação do eixo não são a mesma coisa. Um motor de quatro polos em 60 Hz gira a 1.800 rpm síncronas: 120 × frequência ÷ polos. Para a velocidade angular em rad/s, multiplique estes hertz por 2π.',
  },
  'tsp-tbsp': {
    title: 'Colheres de chá para colheres de sopa',
    desc: 'As duas medidas de colher das receitas',
    long: 'Converte colheres de chá para colheres de sopa e de volta. Para quando existe só uma colher medidora à mão, ou quando a receita é reduzida à metade ou dobrada.',
    note: 'Nas medidas dos EUA e da Coreia uma colher de sopa tem exatamente três colheres de chá. Só a colher de sopa australiana mede 20 mL, ou quatro colheres de chá, então converter uma receita australiana a 3:1 deixa 25% de falta.',
    from: 'c. chá', to: 'c. sopa',
  },
  'oz-lb': {
    title: 'Onças para libras',
    desc: 'Converte onças para libras nos dois sentidos',
    long: 'Converte onças para libras e de volta. Embalagens de alimentos dos EUA, tabelas de postagem e o peso de recém-nascidos ("7 lb 6 oz") usam as duas unidades lado a lado.',
    note: 'A libra avoirdupois tem 16 onças. A onça troy, usada para ouro e prata, é mais pesada (31,10 g) e a libra troy tem apenas 12 delas, então dividir o peso de uma barra por 16 dá o resultado errado.',
  },
  'newton-kgf': {
    title: 'Newtons para quilograma-força',
    desc: 'Converte newtons em quilograma-força',
    long: 'Converte newtons para quilograma-força e de volta. As normas internacionais indicam força em newtons, mas as placas de equipamentos coreanos e japoneses, as balanças de mola e as máquinas de tração ainda marcam kgf.',
    note: 'O kgf está fixado na gravidade padrão, 9,80665 m/s², então não muda com o lugar. Mas kg é massa e kgf é força: misturar os dois numa tabela estraga o cálculo de carga sem parecer errado.',
  },
  'mpg-l100km': {
    title: 'mpg para L/100 km',
    desc: 'O consumo americano no formato europeu',
    long: 'Converte milhas por galão americanas em litros por 100 km. Os dois números correm em sentidos opostos, então passos iguais em mpg não são passos iguais em combustível: de 20 para 25 mpg economiza 2,35 L/100 km e de 40 para 45 apenas 0,65.',
    note: 'A constante 235,215 é o galão americano, 3,785411784 L, multiplicado por 100 e dividido pelos 1,609344 km de uma milha. Com o galão imperial o número é 282,481, então os valores das revistas britânicas saem aqui uns 20% baixos.',
  },
  'l100km-kmpl': {
    title: 'L/100 km para km/L',
    desc: 'Converte consumo em quilômetros por litro',
    long: 'Converte litros por 100 km em quilômetros por litro. As duas são métricas, mas o numerador e o denominador estão trocados, então o número de um catálogo europeu tem de ser invertido antes de ficar ao lado de um km/L.',
    note: 'A conta toda é 100 dividido pelo valor, e por isso o mesmo passo serve nos dois sentidos. Um litro pesa muito mais na faixa eficiente: de 4 para 3 vai de 25 a 33 km/L, enquanto de 9 para 8 vai só de 11 a 12,5.',
  },
  'nm-ftlb': {
    title: 'N·m para ft·lb',
    desc: 'Converte entre unidades de torque',
    long: 'Converte torque entre newton-metro e libra-pé. Torquímetros e manuais de oficina comprados nos Estados Unidos são graduados em ft·lb, enquanto especificações internacionais e ferramentas métricas são escritas em N·m.',
    note: 'ft·lb e lb·ft são a mesma unidade escrita de dois jeitos. Torques pequenos aparecem em in·lb, um duodécimo do ft·lb: ler uma especificação de bicicleta ou de eletrônica como ft·lb aperta o parafuso doze vezes mais.',
  },
  'cfm-m3h': {
    title: 'CFM para m³/h',
    desc: 'Converte unidades de vazão de ar',
    long: 'Converte pés cúbicos por minuto em metros cúbicos por hora. Fabricantes americanos e taiwaneses especificam exaustores, coifas, purificadores e ventoinhas de PC em CFM, enquanto projetos de ventilação usam m³/h.',
    note: 'CFM é uma vazão de volume e não diz nada sobre pressão. Duas ventoinhas com o mesmo CFM se comportam de forma diferente com um filtro ou um duto longo na frente, então leia a vazão junto com a pressão estática.',
  },
};
