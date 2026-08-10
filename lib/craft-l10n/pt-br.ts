import type { FormulaText } from '../formula/types.ts';

/*
 * Brazilian Portuguese copy for the 48 craft tools.
 *
 * No arithmetic lives here: 8% of 500 g is 40 g in every language, so the
 * numbers stay in lib/craft/*.ts. This file only carries title, desc, long
 * and note.
 *
 * Brazilian usage throughout, not European: lã / novelo / amostra / pontos /
 * carreiras for tricô and crochê, tecido / margem de costura / viés, manta
 * acrílica for quilt batting, molde for a sewing pattern and receita for a
 * knitting one, cera / essência / pavio, soda cáustica for NaOH, resina
 * epóxi, miçanga / argola / cordão. Money carries no currency symbol.
 */
export const CRAFT_PT_BR: Record<string, FormulaText> = {
  /* ───────── Tricô e crochê ───────── */
  'yarn-needed': {
    title: 'Calculadora de lã necessária',
    desc: 'Pese uma amostra e descubra quanta lã a peça inteira vai levar.',
    long: 'Teça um quadrado de 10 cm e pese: isso diz quantos gramas custa cada centímetro quadrado. Multiplique pela área da peça pronta e você já tem o peso de lã. A quantidade impressa na receita vale para a amostra da receita, então ela desanda assim que a sua é diferente.',
    note: 'Deixe uns 15 % de sobra. Mangas, gola e acabamento consomem mais do que a área plana sugere, e quando um lote de tingimento acaba, o mesmo tom não se encontra mais.',
  },
  'yarn-skeins': {
    title: 'Quantos novelos comprar',
    desc: 'Transforme os metros necessários e os metros por novelo em novelos a comprar.',
    long: 'Não se compra pedaço de novelo, então a divisão arredonda para cima. Somar a sobra antes de arredondar faz diferença: arredondando primeiro, um novelo que falta de verdade desaparece da conta.',
    note: 'Os metros da etiqueta são nominais. Dois novelos do mesmo peso podem ter vários metros de diferença, então comprar a conta exata é arriscar ficar sem lã nas últimas carreiras.',
  },
  'gauge-stitches': {
    title: 'Calculadora de pontos para montar',
    desc: 'Passe da sua amostra de pontos e da largura desejada para quantos pontos montar.',
    long: '22 pontos em 10 cm são 2,2 pontos por centímetro; multiplique pela largura que você quer. Se o ponto fantasia repete a cada tantos pontos, arredonde para o múltiplo mais próximo.',
    note: 'Meça a amostra depois de lavar e blocar. A largura recém-saída da agulha muda quando a lã é molhada.',
  },
  'gauge-convert': {
    title: 'Ajustar os pontos da receita à sua amostra',
    desc: 'Recalcule os pontos de uma receita quando a sua amostra não bate com a dela.',
    long: 'Se a receita foi escrita com 22 pontos em 10 cm e manda montar 110, e você tece com 20, esses 110 pontos saem mais largos do que o previsto. Multiplicar a conta pela razão entre as duas amostras devolve a largura original.',
    note: 'Acertar os pontos resolve a largura, não o comprimento. As carreiras se calculam à parte, com a sua amostra de carreiras.',
  },
  'yarn-weight-length': {
    title: 'De peso de lã para metros',
    desc: 'Pese a lã que sobrou para saber quantos metros ainda tem.',
    long: 'Os metros e os gramas da etiqueta fixam os metros por grama. Ponha a sobra na balança e você sabe o que resta; comparado com o que uma carreira consome, isso diz quantas carreiras ainda dá.',
    note: 'Desconte o tubo de papelão ou a cinta se o novelo ainda estiver montado. Errar 5 g muda a resposta em cerca de 20 m.',
  },
  'wpi-weight': {
    title: 'Calculadora de WPI (voltas por polegada)',
    desc: 'Descubra a espessura de uma lã contando as voltas que cabem em uma polegada.',
    long: 'Enrole a lã lado a lado numa régua até completar uma polegada: essa contagem é o WPI e corresponde aos números de espessura padrão. É assim que se classifica uma lã sem etiqueta, ou uma sobra — perto de 12 voltas costuma ser worsted, o 4.',
    note: 'Enrolar apertado aumenta o WPI e faz a lã parecer mais fina do que é. Deixe as voltas encostadas sem achatar o fio.',
  },
  'hat-cast-on': {
    title: 'Pontos para começar um gorro',
    desc: 'Calcule os pontos a montar de um gorro pela circunferência da cabeça e pela folga negativa.',
    long: 'O gorro precisa ficar menor que a cabeça, senão ele sobe sozinho. Tirar uns 10 % da circunferência medida é o ponto de partida de sempre, e um ponto elástico bem elástico aceita tirar mais.',
    note: 'Arredonde para o múltiplo do ponto fantasia: um elástico 2×2 pede múltiplo de quatro, senão a emenda não fica alinhada.',
  },
  'sleeve-decrease': {
    title: 'Calculadora de diminuições da manga',
    desc: 'Distribua as diminuições por igual entre os pontos iniciais e os finais.',
    long: 'Cada carreira de diminuição tira um ponto de cada lado, ou seja, dois de uma vez. Metade da diferença é o número de diminuições, e dividir as carreiras por ele dá o intervalo.',
    note: 'Quando não dá conta exata, deixe as carreiras que sobram lá em cima, perto da cava. A irregularidade aparece muito mais perto do punho.',
  },

  /* ───────── Costura ───────── */
  'fabric-yardage': {
    title: 'Quanto de tecido eu preciso',
    desc: 'Tecido a comprar a partir do tamanho da peça, da quantidade e da largura do tecido.',
    long: 'O tecido vem com largura fixa, então a primeira coisa é quantas peças cabem na largura. Uma peça de 40 cm num tecido de 110 cm cabe duas vezes e os 30 cm que sobram são perda: seis peças pedem três fileiras e o comprimento fica 3 × 50 = 150 cm. Se couberem três na largura, essas mesmas seis peças custam só 100 cm.',
    note: 'Se a peça for mais larga que o tecido, a conta assume uma por fileira; na prática você teria que emendar ou virar o encaixe. Estampa com sentido único não pode ser virada, então ela pede mais do que este número.',
  },
  'fabric-pieces': {
    title: 'Quantas peças saem do tecido',
    desc: 'Quantas peças iguais dá para cortar do tecido que você já tem.',
    long: 'Na largura saem ⌊110 ÷ 40⌋ = 2 e no comprimento ⌊200 ÷ 50⌋ = 4 fileiras, ou seja, oito peças. As duas divisões arredondam para baixo, e é por isso que a tira de 30 cm que sobra não entra na conta — aproveitar ela com peças menores é outro cálculo.',
    note: 'Coloque medidas de corte, com a margem de costura já incluída. Partir das medidas prontas aumenta o número e deixa as peças sem nada para costurar. Tecido que não foi lavado ainda tem o encolhimento pela frente: cortando assim, ele vai embora na primeira lavagem.',
  },
  'seam-allowance': {
    title: 'Calculadora de margem de costura',
    desc: 'Passe da medida pronta e da margem de costura para a medida de corte.',
    long: 'A margem entra nas duas bordas opostas, então cada direção cresce o dobro da margem. Uma peça pronta de 40 × 50 cm com 1 cm de margem é cortada em 42 × 52 cm. Somando uma vez só, a peça pronta sai 2 cm menor.',
    note: 'A margem padrão muda conforme a escola: 1 cm nos moldes coreanos e japoneses, 5/8 in (1,6 cm) nos americanos e 1/4 in (0,6 cm) no patchwork. Bainha de dobra dupla pede ainda o dobro da largura da dobra.',
  },
  'bias-binding': {
    title: 'Calculadora de viés contínuo',
    desc: 'Tamanho do quadrado de tecido que rende o comprimento de viés que você precisa.',
    long: 'O viés é cortado a 45°, então não dá para puxar uma tira longa do rolo: corta-se um quadrado na diagonal e emenda, ou enrola como um tubo contínuo. O que o comprimento define, na verdade, é uma área: 300 cm × 4 cm = 1.200 cm², mais 10 % para as emendas e o aparo, então √1.320 ≈ 36,3 cm de lado.',
    note: 'Viés de dobra dupla que termina com 1 cm é cortado quatro vezes mais largo, 4 cm. Se você colocar a largura pronta, não sobra nada para dobrar. Malha já estica e quase nunca precisa de viés.',
  },
  'gather-ratio': {
    title: 'Calculadora de franzido',
    desc: 'Comprimento de tecido a cortar para uma barra franzida ou com babado.',
    long: 'A proporção de franzido é quantas vezes o comprimento pronto você corta antes de franzir. Duas vezes uma abertura de 60 cm quer dizer cortar 120 cm e franzir de volta para 60, então 60 cm desaparecem nas dobras. Tecido leve aceita 2,5–3× e o pesado para perto de 1,5× — a mesma proporção dá um volume completamente diferente conforme o tecido.',
    note: 'Defina a proporção antes de cortar: puxar a linha de franzir não acrescenta comprimento depois. Babado e frufru usam a mesma conta, em geral com 2× ou mais.',
  },
  'elastic-length': {
    title: 'Calculadora de comprimento de elástico',
    desc: 'Quanto de elástico cortar a partir de uma medida do corpo e do esticamento.',
    long: 'O elástico é cortado menor que o corpo que ele precisa vestir. Tire 10 % de uma cintura de 76 cm e ficam 68,4 cm; some 2,5 cm para sobrepor as pontas e corte 70,9 cm. O anel pronto tem que esticar 11,1 % (10 ÷ 90) para chegar a 76 cm, e essa é a exigência real que você faz a ele.',
    note: 'Passando de uns 30 % de esticamento ele ainda entra, mas marca a pele o dia inteiro. A recuperação varia muito entre elásticos, então dar a volta no corpo e achar o comprimento confortável ganha de qualquer fórmula.',
  },
  'fabric-shrinkage': {
    title: 'Calculadora de encolhimento do tecido',
    desc: 'Porcentagem de encolhimento e tecido extra a comprar, a partir de um teste de lavagem.',
    long: 'Meça um trecho longo, não 10 cm. Se 100 cm voltam com 96, o encolhimento é de 4 %. Para sobrarem 200 cm depois da lavagem você precisa de 200 ÷ 0,96 = 208,3 cm, então 8,3 cm vão embora na água. Somar 4 % dá 208 cm, que fica curto: aqui se divide, não se soma.',
    note: 'Algodão e linho perdem de 3 a 10 % na primeira lavagem, e o jeans perde mais. A largura encolhe também, então confira à parte quando uma peça entra justa na largura. Lavar o tecido antes de cortar tira a dúvida de vez.',
  },
  'pattern-scale': {
    title: 'Ampliar ou reduzir um molde',
    desc: 'Medida resultante ao ampliar ou reduzir um molde impresso.',
    long: 'Os comprimentos acompanham a porcentagem, mas o consumo de tecido acompanha o quadrado dela. Uma linha de 20 cm a 120 % vira 24 cm, enquanto a área da mesma peça chega a 144 % — é por isso que um molde só um pouco maior fica sem tecido. O zoom da impressora é essa mesma porcentagem de 120 %.',
    note: 'Desligue o ajuste à página ao imprimir e digite a escala na mão; depois meça o quadrado de teste do molde antes de cortar qualquer coisa. As margens de costura ficam na largura original em vez de serem ampliadas.',
  },

  /* ───────── Patchwork e bordado ───────── */
  'quilt-binding': {
    title: 'Calculadora de viés para patchwork',
    desc: 'Comprimento do viés e quantas tiras cortar para um quilt.',
    long: 'O perímetro é 2 × (150 + 200) = 700 cm. Some uma largura de tira em cada um dos quatro cantos (6,4 × 4 = 25,6 cm) mais 25 cm para as emendas na diagonal e a sobreposição do fechamento: 750,6 cm. As tiras são cortadas na largura do tecido e, com 2 cm de ourela aparada, cada uma rende 105 cm — daí as oito tiras.',
    note: 'Uma tira de 2,5 in (6,4 cm) dobrada ao meio e costurada com 1/4 in de margem termina com cerca de 1 cm. Emende as tiras na diagonal a 45°: emenda reta acumula volume e embola nos cantos.',
  },
  'quilt-backing': {
    title: 'Calculadora de tecido do forro do quilt',
    desc: 'Tecido do forro pelo tamanho do quilt, pela sobra por lado e pela largura do tecido.',
    long: 'As três camadas escorregam entre si enquanto você quilta, então o forro é cortado maior de todos os lados. Com 10 cm por lado você precisa de 170 × 220 cm, e 170 cm passa da largura útil (107 − 2 = 105 cm), então é preciso emendar dois comprimentos: 220 × 2 = 440 cm a comprar.',
    note: 'Apare as ourelas antes de emendar — elas são tecidas mais firmes e puxam aquela linha, formando uma crista. Quem faz quilting em máquina longarm costuma pedir 10 cm ou mais por lado, então pergunte antes de cortar. Forro extralargo de 240 cm ou mais dispensa a emenda.',
  },
  'quilt-batting': {
    title: 'Calculadora de manta acrílica para quilt',
    desc: 'Medidas de corte e área da manta pelo tamanho do quilt e pela sobra.',
    long: 'A manta leva menos sobra que o forro. Com 5 cm por lado dá 160 × 210 cm, uma área de 3,36 m². Cortar a manta do tamanho do forro deixa uma dobra grossa que engancha embaixo do calcador.',
    note: 'A manta é vendida em tamanhos com nome definidos em polegadas — berço, solteiro, queen. Comprando em rolo dá para juntar retalhos: encoste as bordas em vez de sobrepor e passe um ziguezague para a espessura continuar igual. Manta de algodão encolhe de 3 a 5 % na lavagem.',
  },
  'quilt-blocks': {
    title: 'Calculadora de blocos de quilt',
    desc: 'Blocos na largura, no comprimento e no total para um quilt de um tamanho dado.',
    long: '150 ÷ 25 = 6 na largura e 200 ÷ 25 = 8 no comprimento, ou seja, 48 blocos. Quando não dá conta exata, use os blocos inteiros e cubra a diferença com as tiras de separação ou com as bordas — ajustar uma borda é bem mais fácil do que refazer o tamanho de todos os blocos.',
    note: 'Aqui o tamanho do bloco é o tamanho pronto. Um bloco pronto de 25 cm é cortado com 26,2 cm, 0,6 cm em cada borda, e essa margem desaparece em cada costura. Doze polegadas (30,5 cm) é o tamanho de bloco mais comum.',
  },
  'hst-squares': {
    title: 'Calculadora de HST (triângulo meio quadrado)',
    desc: 'Que tamanho cortar os quadrados iniciais para um HST pronto.',
    long: 'Dois quadrados costurados na diagonal e cortados dão duas unidades de HST. Esse quadrado precisa carregar a medida pronta mais as duas margens laterais (0,6 × 2 = 1,2 cm) e a margem da diagonal (√2 × 0,6 ≈ 0,85 cm): 12,05 cm. Coloque a margem em 1/4 in exato (0,64 cm) e o resultado vira pronto + 7/8 in (2,2 cm), a regra que todo mundo no patchwork decora.',
    note: 'Cortar um pouco maior e aparar depois ganha de cortar na medida. A diagonal fica no viés e cresce conforme você manuseia, então o corte exato costuma terminar pequeno. Apare a unidade costurada em 11,2 cm — pronto mais duas margens — e o bloco fecha.',
  },
  'aida-size': {
    title: 'Calculadora de ponto cruz em tecido Aida',
    desc: 'Tamanho final do desenho pelos pontos do gráfico e pela contagem do tecido.',
    long: 'A contagem é de pontos por polegada. No Aida 14 cada ponto mede 2,54 ÷ 14 = 0,18 cm, então 100 pontos de largura dão 18,1 cm (7,1 in) e 140 de altura dão 25,4 cm (10 in). O mesmo gráfico num tecido 18 cai para 14,1 × 19,8 cm.',
    note: 'Linho e etamine costumam ser bordados sobre dois fios, então coloque metade da contagem — um linho 28 termina do mesmo tamanho que um Aida 14. Se a moldura já está escolhida, mudar a contagem do tecido encaixa o desenho muito melhor do que redesenhar o gráfico.',
  },
  'aida-fabric': {
    title: 'Tecido para ponto cruz',
    desc: 'Medidas de corte do tecido pelo tamanho do desenho pronto e pela margem.',
    long: 'O tecido é cortado com uma margem em volta do desenho. Com 8 cm por lado, um desenho de 18 × 25 cm pede 34 × 41 cm. Essa margem é o que dobra para trás na hora de emoldurar, então cortar rente para economizar tecido não deixa nada para esticar na base.',
    note: 'Deixe 7,5 cm (3 in) por lado para moldura e nunca menos de 5 cm. Bordar em bastidor pede mais ainda, porque o tecido tem que passar do bastidor. O Aida desfia rápido na borda cortada — passe ziguezague ou fita assim que cortar.',
  },
  'floss-length': {
    title: 'Calculadora de linha de bordar',
    desc: 'Linha necessária pelo total de pontos, pelos fios da agulha e pela contagem do tecido.',
    long: 'No tecido 14 cada ponto ocupa um quadrado de 0,18 cm, e uma cruz são duas diagonais dele: 0,51 cm. Passar por trás e prender começos e fins consome quase a mesma coisa de novo, então conte cerca de 1,03 cm por ponto e por fio. Dois fios em 1.000 pontos dão 20,5 m.',
    note: 'Uma meada de DMC tem seis fios de 8 m, ou 48 m de fio simples, o que cobre umas 2.300 cruzes com dois fios. Saltos longos por trás e troca de cor a toda hora gastam muito mais rápido, então deixe folga para uma cor espalhada pelo gráfico inteiro.',
  },

  /* ───────── Velas ───────── */
  'wax-weight': {
    title: 'Quanto de cera para vela',
    desc: 'Converta o volume do recipiente no peso de cera a derreter.',
    long: 'Encha o pote de água e pese: isso dá o volume em mililitros. A cera é mais leve que a água, então o mesmo volume pede menos peso — a de soja fica perto de 0,9 g/cm³.',
    note: 'Não encha até a boca. Deixar o décimo de cima livre dá espaço para o pavio e para o aroma, e a de soja costuma afundar ao endurecer, então um segundo despejo de acabamento é normal.',
  },
  'wax-multi': {
    title: 'Cera para um lote de velas',
    desc: 'Some a cera de uma produção de recipientes iguais.',
    long: 'Pegue o peso que um pote pede e multiplique pela quantidade de velas. A conta assume que você enche nove décimos do pote.',
    note: 'Derreta uns 5 % a mais. Sempre fica cera presa na jarra, e ficar sem cera na última vela obriga a derreter um lote inteiro só por ela.',
  },
  'fragrance-load': {
    title: 'Calculadora de essência para velas',
    desc: 'Passe do peso da cera e da porcentagem de essência para os gramas de óleo.',
    long: 'A porcentagem de essência é medida sobre a cera, não sobre a vela pronta. 8 % de 500 g são 40 g de essência, e o lote fica em 540 g. Cada cera tem um teto do que consegue segurar; acima dele o óleo fica na superfície em vez de se integrar.',
    note: 'Pese a essência em vez de medir em mililitros: a densidade dela não é a da água, então o volume erra vários pontos percentuais. Siga a temperatura de adição indicada pela cera, não pela essência.',
  },
  'fragrance-percent': {
    title: 'Porcentagem real de essência',
    desc: 'Descubra de trás para frente a porcentagem real a partir da essência que você colocou.',
    long: 'Serve para anotar uma receita, ou depois de despejar o fim de um frasco e querer saber em quantos por cento aquilo ficou. Alguns fornecedores contam sobre o lote inteiro, então o mesmo número pode significar quantidades diferentes — aqui a conta é sobre a cera.',
    note: 'Passar do máximo indicado pela cera deixa óleo suando na superfície ou entope o pavio. Aumentar a porcentagem quase nunca é a solução para uma vela com aroma fraco.',
  },
  'candle-burn-time': {
    title: 'Calculadora de tempo de queima da vela',
    desc: 'Estime as horas de queima pelo peso da cera e pelo consumo por hora.',
    long: 'Acenda uma vez e pese antes e depois: isso dá os gramas por hora. Dividir a cera por esse número dá as horas que restam. A espessura do pavio define o consumo, então a mesma cera com pavio mais grosso acaba antes.',
    note: 'Não passe de umas quatro horas por acendimento. Mais do que isso superaquece a cera e forma fuligem no pavio. Na primeira queima vale deixar acesa até a superfície toda derreter.',
  },
  'container-volume': {
    title: 'Volume do recipiente da vela',
    desc: 'Volume útil e peso de cera pelo diâmetro e pela altura do recipiente.',
    long: 'Um pote de parede reta só precisa do diâmetro interno e da altura. Encher de água continua sendo o jeito mais exato, mas assim você calcula antes de os potes chegarem.',
    note: 'Pote que afina embaixo cabe menos do que isso. Em recipiente quadrado, usar o lado como diâmetro superestima o volume — esse confira com água.',
  },
  'melt-pour-batch': {
    title: 'Base de derreter e modelar para moldes',
    desc: 'Quanta base derreter para uma tanda de moldes.',
    long: 'As bases de derreter e modelar costumam ser um pouco mais densas que a água, então o padrão fica em 1,05. São somados 5 % pelo que fica na jarra e na panela.',
    note: 'A base que sobra pode ser derretida de novo, então errar para cima não custa nada. Errar para baixo deixa o último molde pela metade, e isso custa.',
  },
  'wax-cost-per-candle': {
    title: 'Custo de material por vela',
    desc: 'Some o preço da cera e os insumos num custo de material por vela.',
    long: 'A cera é comprada por quilo e usada por grama. A 9.000 o quilo, uma vela de 180 g carrega 1.620 de cera. Coloque o pote, o pavio, a essência e o rótulo no campo de insumos.',
    note: 'Material é só parte do custo. Se você vende, lembre que este número deixa de fora as velas perdidas, a embalagem, o frete e as taxas da plataforma.',
  },

  /* ───────── Sabão e resina ───────── */
  'lye-naoh': {
    title: 'Calculadora de soda cáustica (NaOH)',
    desc: 'Converta o peso do óleo e o índice de saponificação na soda cáustica necessária.',
    long: 'Os índices SAP são publicados em miligramas de hidróxido de potássio por grama de óleo, então usar um deles para NaOH significa dividir por 1402,5 — a razão molar entre o KOH (56,1) e o NaOH (40,0), já convertida de miligramas para gramas. O óleo de oliva tem SAP 190, então 500 g com 5 % de supergordura pedem 64 g de soda. O valor pertence ao óleo, não ao sabão em geral: esta ferramenta trata um óleo por vez, e receita com vários óleos se calcula óleo por óleo, somando a soda no fim. A água aparece ao lado, no dobro da soda, como ponto de partida.',
    note: 'A soda vai na água, nunca a água na soda — na ordem errada a mistura ferve e espirra em segundos. Use óculos de proteção e luvas, e misture em aço inox ou HDPE, nunca em alumínio, que a soda ataca e transforma em hidrogênio. A solução se aquece sozinha até 80–90 °C no contato, então nada de vidro nem de plástico fino. Soda de menos deixa uma barra mole que nunca firma; soda de mais deixa uma barra cáustica.',
  },
  'lye-koh': {
    title: 'Calculadora de hidróxido de potássio (KOH)',
    desc: 'Calcule o hidróxido de potássio para sabão líquido, com a pureza incluída.',
    long: 'Os índices SAP já vêm em KOH, então aqui não existe o 1402,5 — só o 1000 que passa miligramas para gramas. As escamas de KOH puxam umidade do ar e são vendidas quase sempre com 90 % de pureza, então a necessidade pura tem que ser dividida por essa pureza para dar o peso que você de fato coloca na balança. Com 500 g de óleo de SAP 190, 3 % de supergordura e 90 % de pureza, dá 102 g. O SAP continua sendo do óleo: misturas se calculam um óleo por vez e se somam.',
    note: 'Aqui também o álcali vai na água; ao contrário, ferve e espirra. Óculos, luvas e um recipiente de aço inox ou HDPE; o alumínio é atacado pelo álcali. O KOH esquenta mais que o NaOH, então o pico de temperatura é maior. Sabão líquido mantém a supergordura baixa, de 0 a 3 %, porque óleo não saponificado não dissolve e deixa o sabão turvo. Álcali de menos e sobra óleo livre na superfície; de mais e o pH sobe além do usável.',
  },
  'water-lye-ratio': {
    title: 'Proporção de água e soda cáustica',
    desc: 'Passe do peso da soda e da proporção água : soda para a água e a concentração.',
    long: 'A água só leva a soda até os óleos: ela não entra na saponificação e vai embora enquanto a barra cura. Por isso o que importa é a concentração da solução — 2 : 1 é uma solução de 33 % e 1,5 : 1 é de 40 %. Sessenta e cinco gramas de soda a 2 : 1 pedem 130 g de água, e com 500 g de óleo a massa chega a 695 g.',
    note: 'Mais água dá uma massa mais fina, fácil de desenhar, mas demora mais para desenformar e encolhe mais na cura. Solução mais concentrada esquenta mais, então comece com água gelada. Se você trocar parte da água por gelo, o gelo continua contando no peso da água.',
  },
  'soap-batch-scale': {
    title: 'Multiplicar uma receita de sabão',
    desc: 'Multiplique óleo, soda e água de uma receita para um lote maior ou menor.',
    long: 'Numa receita de sabão tudo anda junto: 1,5 vez o óleo é 1,5 vez a soda e 1,5 vez a água. O volume do molde é o jeito fácil de escolher o fator — sair de um molde de 1.200 mL para um de 1.800 mL é 1,5×. Uma receita de 500 g de óleo, 65 g de soda e 130 g de água multiplicada por 1,5 vira 750 g, 97,5 g e 195 g.',
    note: 'Não recalcule a soda do zero, só multiplique: o SAP não mudou enquanto os óleos são os mesmos. O que muda é o comportamento — lote maior segura o calor por mais tempo e engrossa mais rápido, e cor ou essência fortes aceleram ainda mais. Se trocar um óleo, é o SAP que tem que ser refeito, não a multiplicação.',
  },
  'resin-volume': {
    title: 'Calculadora de resina epóxi',
    desc: 'Peso de resina a misturar pelas medidas do molde retangular e pela densidade.',
    long: 'Um molde retangular é largura × profundidade × altura, e um centímetro cúbico é um mililitro. A resina é um pouco mais pesada que a água — a epóxi fica perto de 1,1 g/cm³ —, então um molde de porta-copos de 10 × 10 × 2 cm dá 200 mL e 220 g. Em molde redondo, eleve ao quadrado a metade do diâmetro, multiplique por π e depois pela profundidade. Nos dois casos, meça por dentro.',
    note: 'Misture 5–10 % a mais do que a conta. Fica mais resina presa no copo e no palito do que você imagina, e ficar sem no meio do despejo deixa uma linha visível onde o segundo lote encontrou o primeiro. Cada resina também tem uma espessura máxima por camada, em geral 5–10 mm: molde fundo é despejado em camadas, então divida este peso pelo número de camadas.',
  },
  'resin-mix': {
    title: 'Proporção de mistura da resina',
    desc: 'Divida o peso total de resina entre a parte A e a parte B.',
    long: 'Uma resina 2 : 1 divide o total em três partes, duas de resina e uma de endurecedor, então 220 g são 146,7 g de A e 73,3 g de B. A proporção aqui é em peso. Os produtos imprimem as duas, um 2 : 1 em volume ao lado de um 100 : 45 em peso, então olhe a de peso quando estiver na balança.',
    note: 'Resina fora de proporção não cura. Mais endurecedor não deixa a peça mais dura: ela fica grudenta, ou o calor se concentra e ela racha. Use balança que leia 0,1 g e, para despejos pequenos de menos de 20 g, misture um pouco mais e despeje dali, porque o erro pesa mais que a resina. Passar para um segundo copo desloca a proporção no tanto que ficou no primeiro.',
  },
  'resin-pigment': {
    title: 'Calculadora de pigmento para resina epóxi',
    desc: 'Passe do peso da resina e da porcentagem de pigmento para os gramas de cor.',
    long: 'O pigmento é contado sobre o total já misturado, resina mais endurecedor. 3 % de 220 g são 6,6 g. Pó de mica já tinge forte com 1–3 %, e corante líquido colore com poucas gotas, perto de 0,5 % — fique abaixo de 0,5 % se quiser a peça translúcida.',
    note: 'Pigmento demais impede a cura. O teto prático fica perto de 6 % do total; acima dele a cor atrapalha a reação e a superfície continua grudenta. Coloque a cor depois de A e B estarem completamente unidos — tingindo antes, você não vê se as duas partes se misturaram de verdade. Cor à base de água, como aquarela ou acrílica, deixa a resina turva e atrasa a cura.',
  },
  'silicone-mould': {
    title: 'Calculadora de silicone para molde',
    desc: 'Subtraia o modelo da caixa para achar o silicone necessário.',
    long: 'O silicone é tudo o que o modelo não ocupa. O jeito mais confiável de medir o modelo é por deslocamento: afunde ele num copo cheio de água e meça o que transbordou. Uma caixa de 500 mL em volta de um modelo de 120 mL pede 380 mL de silicone, que com densidade 1,15 dão 437 g. Meça a caixa por dentro — largura × profundidade × altura em centímetros já é mililitro.',
    note: 'Deixe pelo menos um centímetro de silicone entre o modelo e as paredes. Parede fina faz o molde abrir e a resina vazar, e ele rasga depois de poucos usos. O silicone também é misturado A : B, então passe este peso pela calculadora de proporção e some 5 % pelo que fica no copo — despejo de silicone interrompido racha na junta.',
  },

  /* ───────── Miçangas e embalagem ───────── */
  'bead-count': {
    title: 'Calculadora de miçangas por fio',
    desc: 'Quantas miçangas enchem um fio, pelo comprimento dele e pelo diâmetro da miçanga.',
    long: 'Cada miçanga ocupa o próprio diâmetro ao longo do fio, então o comprimento dividido pelo diâmetro é a quantidade. Um fio de 45 cm com miçangas de 8 mm leva 56 e preenche 44,8 cm. Se entrarem separadores ou nós no meio, coloque esse espaço no campo de sobra — o passo passa a ser diâmetro mais espaço.',
    note: 'A divisão arredonda para baixo: não existe meia miçanga, e os poucos milímetros que sobram acabam junto ao fecho. Desconte antes 1–2 cm do comprimento para o fecho e as terminações. Os diâmetros impressos são nominais e pedra natural varia de peça a peça, então na prática conte uma ou duas de diferença.',
  },
  'bead-weight': {
    title: 'Calculadora de peso de miçangas',
    desc: 'Multiplique a quantidade de miçangas pelo peso de uma.',
    long: 'Sabendo quanto pesa uma, o resto é multiplicação: uma bola de vidro de 8 mm fica em torno de 0,6 g, então 100 dão 60 g. Uma miçanga sozinha marca 0,0 g na balança de cozinha, então pese vinte e divida por vinte — é o jeito exato de achar o peso por peça. A segunda linha mostra quantas miçangas cabem num pacote de 100 g.',
    note: 'Miçanga quase sempre é vendida por peso e não por quantidade, então converter o peso do pacote em peças é a única forma de saber se dá para o projeto. A mesma miçanga de 8 mm pode pesar o triplo entre vidro, acrílico e metal, então pese de novo quando trocar de material. O peso do pacote inclui ainda o pó e os pedaços que vêm junto.',
  },
  'wire-length-wrap': {
    title: 'Calculadora de arame para enrolar',
    desc: 'Quanto arame um número de voltas em volta de um mandril consome.',
    long: 'O arame enrolado num mandril ou numa miçanga segue o círculo desenhado pelo próprio eixo, e esse círculo mede o mandril mais o arame. Cinco voltas de arame de 0,8 mm num mandril de 8 mm gastam 138 mm. O trecho enrolado tem de altura voltas × espessura do arame, aqui 4 mm, que é o número a conferir ao dimensionar uma argola de pingente.',
    note: 'Corte 2–3 cm a mais em cada ponta. Sem uma sobra para segurar com o alicate você não aperta a última volta, e o arame estica um pouco ao ser puxado. Arame grosso, de 0,8 mm / calibre 20 para cima, resiste à mão, então as espirais reais saem mais frouxas que a conta.',
  },
  'jump-ring': {
    title: 'Calculadora de argolas',
    desc: 'Passe do diâmetro do mandril e do arame para a quantidade de argolas e o arame por argola.',
    long: 'Uma argola é um círculo, e o diâmetro do eixo dela é o mandril mais o arame. Um mandril de 6 mm com arame de 1 mm gasta 22 mm por argola, então um metro rende 45. Enrolado em mola, o comprimento da mola é quantidade × espessura do arame — 45 argolas dão uma mola de 45 mm, e é assim que você decide o comprimento do mandril se enrolar primeiro e cortar depois.',
    note: 'Mandril dividido pela espessura do arame é a relação de aspecto (AR). Abaixo de mais ou menos 4 a argola fica apertada demais para fechar bem, e os padrões de chainmail especificam um AR, então mudar só um dos dois diâmetros quebra o trançado. Cada corte leva ainda a espessura da serra, então o rendimento real fica uma ou duas argolas menor.',
  },
  'macrame-cord': {
    title: 'Calculadora de cordão para macramê',
    desc: 'Comprimento de corte por cordão e o total, a partir do trecho de nós.',
    long: 'Nó come cordão. O nó plano segue a regra de quatro vezes o comprimento pronto, então um trecho de 30 cm de nós quer dizer cortar cada cordão com 120 cm; oito cordões somam 9,6 m. Cordão dobrado ao meio numa argola perde metade do comprimento na dobra, então esses são cortados com oito vezes.',
    note: 'O múltiplo depende do nó: quatro vezes no nó plano, seis ou mais no espiral, até oito em padrões bem fechados. Cordão grosso come mais no mesmo nó, então amarrar um trecho de teste e medir é a forma confiável de definir o múltiplo. Cordão que fica curto não dá para emendar no meio da peça — você começa de novo.',
  },
  'ribbon-length': {
    title: 'Calculadora de fita para presente',
    desc: 'Fita para embalar em cruz, pelas medidas da caixa e pela sobra do laço.',
    long: 'A fita em cruz dá duas voltas na caixa, uma no sentido curto e outra no comprido, e em cada volta a altura entra duas vezes. Uma caixa de 20 × 15 × 8 cm gasta 102 cm nas duas voltas, mais 30 cm para o laço: 132 cm.',
    note: 'O que decide a resposta é a sobra do laço: laço feito à mão pede 25–35 cm e um laço decorativo grande passa de 60 cm. Fita estreita faz laço menor e precisa de menos. Cetim desfia no corte, então deixe um centímetro para reaparar na diagonal.',
  },
  'giftwrap-size': {
    title: 'Calculadora de papel de presente',
    desc: 'A folha de papel que uma caixa pede, já com a sobra de sobreposição.',
    long: 'Um dos sentidos precisa dar a volta completa na caixa, então é (largura + altura) × 2 mais a sobreposição — 59 cm para uma seção de 20 × 8 cm. O outro é a profundidade mais o suficiente para dobrar em cada ponta, cerca de três quartos da altura de cada lado, ou seja, profundidade mais 1,5 × altura: 30 cm. Esses dois números são a folha a cortar.',
    note: 'Papel de presente vem em rolos de largura fixa, em geral perto de 70 cm. Se a medida menor passar da largura do rolo, é preciso virar a caixa ou juntar duas folhas. Estampa com sentido único não pode ser virada, então confira a largura do rolo antes de comprar. Cortar na medida exata fica pior do que deixar 2 cm para dobrar por dentro.',
  },
  'clay-weight': {
    title: 'Calculadora de argila polimérica',
    desc: 'Converta um volume e uma densidade de argila na argila a comprar.',
    long: 'Argila é modelada por volume e vendida por peso. A polimérica fica em torno de 1,7 g/cm³, então uma peça de 60 cm³ leva 102 g — dois blocos padrão de 57 g. A que seca ao ar é mais leve, 1,2–1,5, então o mesmo volume pesa menos, mas ela perde água ao secar e encolhe mais de 10 %, e isso tem que entrar na conta.',
    note: 'Preencher o miolo com papel-alumínio corta o peso de argila em mais da metade — e argila polimérica grossa não cura por igual até o centro, então racha ao esfriar. Peça grande leva estrutura interna para não rachar, não só para economizar argila. O peso do bloco muda por marca: Fimo 57 g, Fimo Professional 85 g.',
  },
};
