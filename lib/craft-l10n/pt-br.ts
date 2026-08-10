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

  /* ───────── Tricô e crochê (segunda leva) ───────── */
  'row-gauge-length': {
    title: 'Calculadora de carreiras necessárias',
    desc: 'Passe da sua amostra de carreiras e do comprimento desejado para quantas carreiras tecer.',
    long: '28 carreiras em 10 cm são 2,8 por centímetro, então 60 cm dão 168 carreiras — que por sorte são exatamente 21 repetições de um motivo de 8 carreiras. Peça 63 cm e sai 176,4; carreira não se divide, então ficam 176 carreiras, que medem 62,9 cm. O milímetro não aparece, mas a repetição quebrada aparece.',
    note: 'A amostra de carreiras desanda mais que a de pontos. O meia-malha e a alpaca crescem no comprimento com o próprio peso, então pendure a amostra blocada antes de medir — é isso que a peça vai fazer.',
  },
  'yarn-substitute': {
    title: 'Calculadora de substituição de lã',
    desc: 'Quantos novelos de uma lã substituta a receita vai pedir.',
    long: 'O que se acerta ao trocar a lã é o comprimento, não o peso. Uma receita que pede oito novelos de 50 g de uma lã com 400 m por 100 g quer 1.600 m. A substituta com 320 m por 100 g carrega só 160 m por novelo, então você precisa de dez — comprando os mesmos oito, faltam 320 m.',
    note: 'Acertar o comprimento não acerta a espessura. Duas lãs com os mesmos metros por 100 g caem e esticam de formas bem diferentes quando uma é alpaca e a outra algodão, então teça uma amostra com a substituta antes de decidir. Se o novelo dela tiver outro peso, divida o total de metros acima pelo que a etiqueta diz.',
  },
  'sweater-ease': {
    title: 'Calculadora de folga do suéter',
    desc: 'Circunferência da peça pronta e pontos a montar a partir do tórax e da folga.',
    long: 'O tamanho da peça é a medida do corpo mais a folga, não a medida do corpo. Somando 8 % a um tórax de 96 cm dá uma circunferência pronta de 103,7 cm, que são 228 pontos com amostra de 22 pontos em 10 cm. Coloque a folga em −5 % e sai 91,2 cm, bem justo — o tecido de tricô estica, então folga negativa é uma escolha de verdade.',
    note: 'A tabela de tamanhos da receita costuma listar o busto pronto, não o corpo que ela veste. Misturar os dois deixa você um tamanho fora. A folga também muda por região: um suéter com 8 cm no peito raramente quer mais de 4 cm no braço.',
  },
  'sock-cast-on': {
    title: 'Calculadora de montagem de meia',
    desc: 'Pontos a montar numa meia a partir da circunferência do pé, da amostra e da folga negativa.',
    long: 'Tire 10 % de uma circunferência de pé de 22 cm e você tece para 19,8 cm, que são 59,4 pontos com amostra de 30 pontos em 10 cm. Arredonde para 60, múltiplo de quatro. O quatro importa duas vezes: um elástico 2×2 repete a cada quatro pontos, e o peito do pé e a sola têm que se dividir exatamente pela metade (30 cada) para o calcanhar e as diminuições saírem simétricos.',
    note: 'Folga negativa não é opcional em meia. Tecendo na medida crua do pé, a meia relaxa e forma dobras embaixo do pé e escorrega do calcanhar. Meça a amostra em trabalho circular também — a mesma lã e as mesmas agulhas dão outra contagem em trabalho plano.',
  },
  'stripe-repeat': {
    title: 'Calculadora de repetição de listras',
    desc: 'Quantas repetições inteiras de listra cabem e quantas carreiras sobram.',
    long: '160 carreiras com repetição de 12 dão 13 repetições (156 carreiras) e sobram 4. O que importa é onde essas 4 carreiras vão. Espalhadas de pouco em pouco, uma listra acaba visivelmente mais gorda que as outras. Junte todas num lugar já interrompido — logo acima do elástico da barra, ou debaixo do braço — e ninguém as encontra.',
    note: 'Repetição com número ímpar de carreiras faz a listra de duas cores começar na ponta oposta a cada vez, obrigando a cortar a lã. Mantenha a repetição par e a cor que descansa sobe pela lateral, o que corta pela metade os fios a arrematar.',
  },
  'colorwork-yardage': {
    title: 'Calculadora de lã para jacquard',
    desc: 'Divida o total de lã necessário em gramas de cada cor.',
    long: 'Uma peça que come 400 g com 70 % de cor principal se divide em 280 g e 120 g. A porcentagem sai do gráfico: conte os quadrados de cada cor numa repetição e essa é a proporção enquanto o motivo durar. Corpo liso e elástico entram todos na cor principal.',
    note: 'A cor minoritária raramente cai no número do gráfico. Os fios que passam por trás gastam mais comprimento que os pontos da frente, e a lã que você segura como dominante faz pontos um pouco maiores e rende menos. Compre um novelo extra da cor de contraste — igualar um lote de tingimento esgotado é a falta mais difícil de resolver.',
  },
  'yarn-per-row': {
    title: 'Calculadora de lã por carreira',
    desc: 'Metros de lã que uma carreira come, e quantas carreiras a sobra ainda dá.',
    long: 'Uma etiqueta de 200 m por 50 g é 4 m por grama. Se uma amostra de 12 g levou 40 carreiras, 48 m entraram em 40 carreiras, então uma carreira é 1,2 m. Os 60 g que sobraram são 240 m, que dão 200 carreiras a mais. A versão mais exata disto é pesar o trabalho em andamento, tecer dez carreiras e pesar de novo — assim a contagem de pontos por carreira já é a real.',
    note: 'Os metros por carreira acompanham os pontos daquela carreira. Levar 1,2 m de uma amostra de 40 pontos direto para um corpo de 200 pontos subestima cinco vezes — multiplique pela razão entre as contagens de pontos. Montagem, costura e acabamento não estão neste número.',
  },
  'blanket-size': {
    title: 'Calculadora de tamanho de manta de tricô',
    desc: 'Medidas da manta e pontos a montar a partir do colchão e da parte que cai dos lados.',
    long: 'A manta fica com o tamanho do colchão mais o que cai pelos lados, não com o tamanho do colchão. A largura leva essa queda duas vezes, uma de cada lado; o comprimento leva uma vez, no pé, porque a borda de cima para na frente dos travesseiros. Numa cama de 150 × 200 cm com 25 cm de queda, isso dá 200 × 225 cm, e com 16 pontos em 10 cm são 320 pontos a montar.',
    note: 'Segurar 200 cm de pontos pede agulha circular de 100 cm ou mais, e passando de um quilo a peça pronta estica no comprimento com o próprio peso — meça a amostra pensando nisso. Manta de bebê sai das medidas do berço ou da cadeirinha: ali não deve sobrar nada pendurado.',
  },

  /* ───────── Costura (segunda leva) ───────── */
  'zipper-length': {
    title: 'Calculadora de comprimento de zíper',
    desc: 'Qual tamanho de zíper comprar para uma abertura, arredondado para um tamanho que existe.',
    long: 'Uma abertura de 22 cm mais 2 cm de folga em cima e embaixo pede 24 cm — e ninguém vende zíper de 24 cm. Os tamanhos de prateleira pulam 10 · 12 · 15 · 18 · 20 · 23 · 25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 70 · 80 · 90 cm, então você compra o de 25. Onde se vende em polegadas, os passos são 4 · 5 · 7 · 9 · 12 · 14 · 16 · 18 · 20 · 22 · 24 pol.',
    note: 'O comprimento indicado mede o trecho de dentes por onde o cursor corre, não a fita, que continua além dele nas duas pontas. Comprar comprido e encurtar só funciona em zíper de nylon: cortando os dentes de um de metal ou de plástico injetado o cursor sai, e o zíper destacável não pode ser mexido embaixo de jeito nenhum.',
  },
  'buttonhole-spacing': {
    title: 'Calculadora de espaçamento de casas de botão',
    desc: 'Espaçamento igual entre as casas de botão ao longo da carcela.',
    long: 'Numa carcela de 60 cm com 2 cm livres em cada ponta, as casas ocupam 56 cm. Seis botões dividem isso por cinco, não por seis: a primeira e a última ficam nas pontas do trecho, então existem só cinco vãos entre elas. Isso dá 56 ÷ 5 = 11,2 cm. Dividindo por seis sai 9,3 cm, e a última casa fica sobrando bem longe da ponta.',
    note: 'Em blusa, marque primeiro uma casa no ponto mais saliente do busto e distribua as outras a partir dela — a distribuição só igual deixa esse ponto entre duas casas, que é exatamente onde a frente abre. A casa em si continua tendo que medir o diâmetro do botão mais a espessura dele.',
  },
  'pleat-fabric': {
    title: 'Calculadora de tecido para pregas',
    desc: 'Largura de tecido para um painel plissado, a partir da largura pronta e das pregas.',
    long: 'Esta conta trabalha com prega macho. Uma prega macho consome três vezes a profundidade, mas uma dessas três é a face que se vê, já contada na largura pronta — então o que você tem que somar é o dobro da profundidade por prega. Um painel pronto de 50 cm com dez pregas de 4 cm é cortado em 50 + 10 × 8 = 130 cm. Encoste-as até a face visível igualar a profundidade e cabem 12,5 pregas, deixando o tecido exatamente 3× a largura pronta, 150 cm: daí vem o "prega macho leva três vezes a profundidade". A prega caixa dobra para os dois lados e leva quatro vezes a profundidade.',
    note: 'As pregas são pespontadas dobradas junto com o cós, então três camadas de tecido se acumulam nessa costura. Em jeans ou tweed é preciso reduzir a profundidade ou o número antes de a agulha passar. Em tecido estampado, iguale a profundidade ao rapport da estampa ou as pregas picam o desenho.',
  },
  'hem-allowance': {
    title: 'Calculadora de bainha',
    desc: 'Comprimento de corte a partir do comprimento pronto, da largura da bainha e de quantas vezes você dobra.',
    long: 'O número de dobras é o número de vezes que o tecido é gasto. A dobra dupla (2) vira a mesma largura duas vezes para esconder a borda cortada, então um comprimento pronto de 70 cm com bainha de 2 cm é cortado em 70 + 2 × 2 = 74 cm. Passando um overloque na borda e virando uma vez só (1), 72 cm bastam. Ao contrário da margem de costura, a bainha fica em uma ponta só, então nada aqui é dobrado por causa da borda oposta.',
    note: 'Em bainha curva a sobra não tem para onde ir quando a dobra é larga: o lado de dentro franze e ondula. Deixe a bainha de uma saia evasê abaixo de 1 cm, ou termine com viés. Malha quer o oposto — bainha larga e agulha dupla ou ziguezague, para o ponto esticar junto com o tecido.',
  },
  'dart-intake': {
    title: 'Calculadora de pences',
    desc: 'Quanto cada pence recolhe, a partir da diferença entre duas circunferências.',
    long: 'Os 20 cm entre um busto de 96 cm e uma cintura de 76 cm são o que as pences têm que engolir. Quatro delas — duas na frente, duas nas costas — recolhem 5 cm cada, e como a pence abre para os dois lados da linha central, cada perna é traçada 2,5 cm para fora. É esse 2,5 cm que você marca de fato no molde.',
    note: 'Dividir 20 cm em quatro não quer dizer quatro pences iguais. O lado com mais curva recolhe mais, então 6 cm na frente e 4 cm nas costas é o tipo de divisão de sempre. Passando de uns 4 cm, a ponta de uma pence sozinha faz bico, e a saída são duas pences menores lado a lado.',
  },
  'fabric-nap-layout': {
    title: 'Calculadora de tecido com pelo ou sentido único',
    desc: 'Comprimento de tecido quando todas as peças precisam ficar na mesma direção.',
    long: 'Veludo, cotelê, tecido escovado e estampas de sentido único pedem todas as peças deitadas para o mesmo lado, senão a cor muda de painel para painel. Seis peças de 40 × 50 cm em pé num tecido de 110 cm cabem duas na largura, três fileiras, 150 cm. Viradas de lado ainda cabem duas na largura (110 ÷ 50) em três fileiras, mas cada fileira tem só 40 cm de comprimento, então 120 cm resolvem — e um tecido com sentido não pode reivindicar esses 30 cm. A calculadora de tecido necessário supõe que você pode virar as peças, e é por isso que ela cota menos.',
    note: 'O veludo fica mais escuro com o pelo subindo e mais claro com ele descendo; tanto faz qual, desde que a peça inteira concorde. Estampa grande de rapport longo custa mais ainda, porque cada peça precisa de até um rapport inteiro de comprimento extra para casar nas costuras.',
  },
  'sewing-thread-length': {
    title: 'Calculadora de linha de costura',
    desc: 'Linha que uma costura consome, e quantos carretéis isso dá.',
    long: 'O ponto reto de máquina entrelaça a linha da agulha e a da bobina dentro do tecido, então come muito mais linha do que a costura tem de comprimento. A 2,5×, uma costura de 200 cm leva 500 cm — 5 m. Costurar mais fino quase não muda esse total, porque o dobro de pontos usa metade da linha cada um. O que a densidade (200 × 4 = 800 pontos) realmente define é a resistência da costura e o número de furos abertos no tecido.',
    note: 'O multiplicador sobe com a espessura. Tecido fino em ponto reto fica perto de 2,5, várias camadas de jeans passam de 3, e um overloque de quatro fios vai a 12–18 vezes o comprimento da costura, porque a linha dele envolve o lado de fora do tecido em vez de travar por dentro. O comprimento do carretel também é nominal, e os últimos metros vêm enrolados frouxos demais para costurar.',
  },
  'sticker-sheet-yield': {
    title: 'Calculadora de etiquetas por folha',
    desc: 'Quantas etiquetas cabem numa folha impressa, comparando as duas orientações.',
    long: 'Em A4 (21 × 29,7 cm), uma margem de 0,5 cm em volta deixa 20 × 28,7 cm de área útil. Com etiquetas de 5 × 3 cm a 0,2 cm de distância, na largura saem (20 + 0,2) ÷ (5 + 0,2) = 3,88 → 3, e na altura (28,7 + 0,2) ÷ (3 + 0,2) = 9,03 → 9, ou seja 27 etiquetas. Soma-se um intervalo antes de dividir porque três etiquetas têm só dois intervalos entre elas. Vire as etiquetas 90° e passa a ser 6 na largura por 5 na altura — 30 etiquetas, três a mais. Conte dos dois jeitos antes de montar a folha.',
    note: 'A margem real da impressora muda por modelo e é maior no lado da alimentação, então margem zero corta a última fileira sem avisar — faça uma impressão de teste. Se uma máquina de corte vai recortar, deixe ao menos 0,2 cm de intervalo para o caminho da lâmina e some a sangria ao tamanho da etiqueta, já que a linha de corte fica um pouco fora dela.',
  },

  /* ───────── Patchwork e bordado (segunda leva) ───────── */
  'quilt-sashing': {
    title: 'Calculadora de tiras de separação do quilt',
    desc: 'Comprimento total das tiras de separação e o tecido, a partir do arranjo de blocos e da largura da tira.',
    long: 'Quatro blocos na largura por cinco no comprimento, blocos de 25 cm com tiras de 6 cm, terminam com 4 × 25 + 5 × 6 = 130 cm de largura. As tiras entram como dois tipos de peça: as curtas entre blocos somam 5 fileiras × 5 × 25 cm = 625 cm, e as longas entre as fileiras e nas bordas de cima e de baixo somam 6 × 130 cm = 780 cm, ou seja 1.405 cm no total. Um tecido de 107 cm rende 105 cm com a ourela aparada, então 14 tiras, e 14 × 6 = 84 cm de tecido a comprar.',
    note: 'A largura de tira que você coloca é a largura pronta. Para terminar com 6 cm, corte 7,2 cm — duas margens de 1/4 in. Todas as peças curtas têm que ter o mesmo comprimento, e esse comprimento é a medida de corte do bloco e não a medida pronta, porque a margem de costura da borda do bloco ainda está lá.',
  },
  'quilt-border': {
    title: 'Calculadora de bordas do quilt',
    desc: 'Comprimento das tiras de borda e o tecido para uma ou duas bordas em volta do quilt.',
    long: 'Num quilt de 150 × 200 cm, uma borda de 6 cm pede duas tiras laterais de 200 cm e duas de cima e de baixo de 150 + 12 = 162 cm, já que as laterais estão pregadas — 724 cm juntas. Uma segunda borda de 10 cm dá a volta no topo já ampliado de 162 × 212 cm: laterais de 212 e cima e baixo de 182 cada, outros 788 cm, para 1.512 cm no total. O quilt termina com 182 × 232 cm.',
    note: 'Cortando a borda externa na medida sem borda, ela fica curta pela largura da borda interna em cada canto. Esta conta segue a ordem laterais primeiro; se você pregar cima e baixo antes, troque a largura pelo comprimento. O tecido é calculado na largura pronta mais duas margens de 1/4 in (1,2 cm) — se as duas bordas são de tecidos diferentes, divida a contagem de tiras entre elas.',
  },
  'fat-quarter-yield': {
    title: 'Calculadora de fat quarter',
    desc: 'Quantas peças de um tamanho saem de um fat quarter.',
    long: 'Um fat quarter é uma jarda dividida em quatro — 18 × 22 in, uns 50 × 55 cm. Cortando quadrados de 4,5 in (11,4 cm) saem quatro na largura e quatro no comprimento, ou seja 16 quadrados, sobrando 671 cm². Quando a peça não é quadrada, virá-la pode render mais, então as duas orientações são contadas e a melhor é mostrada.',
    note: 'Coloque a medida de corte, não a medida pronta; com medidas prontas você deixa a margem de costura de fora e o rendimento sai maior do que é. Fat quarter muitas vezes vem cortado torto da loja, então trate cerca de 1 cm de uma borda como perda — se o encaixe passar raspando, compre um segundo.',
  },
  'jelly-roll-yield': {
    title: 'Calculadora de jelly roll',
    desc: 'Área aproveitável e tamanho pronto a partir de um rolo de tiras pré-cortadas.',
    long: 'Um jelly roll são 40 tiras de 2,5 in (6,4 cm) cortadas na largura de 42 in (107 cm). Costurá-las tira 1/4 in de cada borda longa, então uma tira termina com 5,2 cm de largura por 105,8 cm de comprimento. Emendadas lado a lado, 40 delas dão 208 × 105,8 cm — uma área de 2,2 m².',
    note: 'Costuradas em sequência, as tiras dão um painel curto e largo de 208 cm de largura. Para um tamanho de cama, corte-o ao meio e emende de novo (104 × 211 cm), ou monte um conjunto longo de tiras e corte no sentido oposto. Quanto mais estreita a tira, mais dela as costuras comem: 19 % a 6,4 cm, 32 % a 3,8 cm (1,5 in).',
  },
  'mitred-corner': {
    title: 'Calculadora de canto em meia-esquadria',
    desc: 'Comprimento de corte de cada tira de borda em meia-esquadria e onde cai o corte de 45°.',
    long: 'O canto em meia-esquadria é onde duas bordas se encontram a 45°, como uma moldura. Para fazer essa diagonal, a tira tem que passar da borda do quilt pela largura da borda em cada ponta, mais 5 cm de segurança. Num lado de 150 cm com borda de 15 cm, corte 150 + 2 × 20 = 190 cm, marque 20 cm para dentro de cada ponta e pesponte só entre as marcas. A diagonal a cortar mede 15 × √2 = 21,2 cm.',
    note: 'Costurando até as pontas da tira, o canto fica impossível de dobrar. Costure só entre as duas marcas e arremate nas duas. A diagonal fica no viés e estica sob o ferro, então una as duas tiras a 45° primeiro e apare a sobra depois — aparar antes não se desfaz.',
  },
  'floss-skeins': {
    title: 'Calculadora de meadas de linha de bordar',
    desc: 'Quantas meadas comprar para um comprimento de linha.',
    long: 'Uma meada são seis fios de 8 m, que desenrolados dão 48 m de fio simples. Sessenta metros de necessidade mais 10 % de folga são 66 m; divididos por 48 dá 1,4, arredondado para duas meadas, sobrando 30 m para o próximo gráfico.',
    note: 'Coloque o comprimento em fio simples. Bordar com dois fios usa o dobro do que você puxa, não o que você puxa. Se pretende comprar mais de uma cor depois, confira o lote de tingimento — o mesmo número em outro lote sai num tom levemente diferente, e a emenda aparece numa área grande preenchida.',
  },
  'hoop-size': {
    title: 'Calculadora de tamanho de bastidor',
    desc: 'O menor diâmetro de bastidor que acomoda um desenho mais a sua margem.',
    long: 'O bastidor é redondo e o desenho é retangular, então o que tem que caber não é a largura nem a altura, mas a diagonal. Um desenho de 18 × 25 cm com 2 cm de margem de trabalho vira 22 × 29 cm, e a diagonal é √(22² + 29²) = 36,4 cm, ou 14,3 pol. Escolher um bastidor de 8 pol (20 cm) porque o desenho tem só 22 cm de largura deixa parte dele fora do aro.',
    note: 'O tecido precisa de pelo menos 8 cm além do bastidor em cada lado para haver o que prender na altura do parafuso. Desenhos grandes normalmente são bordados movendo o bastidor em vez de comprando um maior, mas prender o aro sobre pontos já feitos amassa e deixa marca — um bastidor de rolo ou um chassi evita isso.',
  },
  'thread-count-convert': {
    title: 'Calculadora de contagem de tecido para ponto cruz',
    desc: 'Pontos por polegada efetivos e tamanho final quando se borda sobre mais de um fio.',
    long: 'Contagem é fios por polegada. O Aida agrupa os fios de quatro em quatro, então um ponto cobre um quadradinho, mas linho e etamine normalmente são bordados sobre dois fios. Bordar um 28 sobre dois dá 14 pontos por polegada efetivos, então um gráfico de 100 × 140 termina com 18,1 × 25,4 cm — o mesmo que um Aida 14. A escala de 200 % quer dizer que o desenho fica com o dobro do tamanho que teria sobre um fio.',
    note: 'Se o "28 fios" de um gráfico já significa 14 efetivos varia de autor para autor; um tamanho final que sai na metade ou no dobro é quase sempre isso. Bordar sobre um fio só (petit point) faz pontos miúdos que cansam a vista, e as linhas de contorno serpenteiam na diagonal conforme a trama as puxa.',
  },

  /* ───────── Velas (segunda leva) ───────── */
  'wax-topup': {
    title: 'Calculadora do segundo despejo de cera',
    desc: 'Peso do reforço e cera total a derreter a partir de uma taxa de retração.',
    long: 'A cera de soja afunda em volta do pavio ao endurecer e deixa um buraco na superfície. Um primeiro despejo de 180 g com 10 % de retração leva 18 g para preencher, então derreta 198 g desde o início. A retração depende da cera, do recipiente e da velocidade de resfriamento — a mesma cera se comporta de um jeito no vidro e de outro na lata.',
    note: 'Faça o reforço depois que a primeira camada firmou, e despeje de 5 a 10 °C mais frio que o primeiro. Cera despejada quente derrete a camada de baixo e afunda outra vez. Reaquecer a sobra na panela evapora a essência, então é melhor separar a porção do reforço à parte.',
  },
  'candle-dye-load': {
    title: 'Calculadora de corante para velas',
    desc: 'Peso de corante a partir da cera e da porcentagem, com a carga somada.',
    long: 'O corante normalmente fica entre 0,1 e 1 % do peso da cera. Meio por cento de 500 g são 2,5 g — um pedaço do tamanho de uma unha de um bloco de corante. Some 8 % de essência e a cera carrega 8,5 % no total, e é esse total que tem que ser comparado com o máximo indicado pelo fabricante.',
    note: 'Corante e essência disputam a mesma capacidade da cera. Escurecer a cor com a essência já no máximo deixa óleo suando na superfície ou entope o pavio. Não use lápis de cera — as partículas de pigmento não se dissolvem e estrangulam o pavio. Cera colorida clareia um tom ao endurecer, então julgue a cor frio e não derretido.',
  },
  'wax-blend': {
    title: 'Calculadora de mistura de ceras',
    desc: 'Divida um peso total de cera entre duas ceras na proporção escolhida.',
    long: 'Misturar uma cera dura com uma mole ajusta as propriedades. Um quilo a 7 : 3 são 700 g de A e 300 g de B. Somar de 10 a 30 % de parafina ou cera de abelha a uma soja de recipiente deixa o topo mais liso e segura a essência por mais tempo, mas a cera de abelha eleva o ponto de fusão, o que em geral significa subir um número de pavio.',
    note: 'Uma mistura fica entre as duas ceras, embora valores como o ponto de fusão não variem em linha reta. Definida a proporção, faça uma vela, deixe curar dois dias e queime — toda mudança de mistura pede o pavio testado de novo. Soja e parafina endurecem em ritmos diferentes, então a fronteira pode ficar esbranquiçada ou manchada.',
  },
  'layer-pour': {
    title: 'Calculadora de vela em camadas',
    desc: 'Cera por camada e por vela num despejo em camadas.',
    long: 'Um recipiente de 200 mL cheio até 90 % comporta 180 mL, ou 162 g de cera. Divididos em três camadas, dá 60 mL e 54 g cada. Para camadas desiguais, pegue esse número e aplique uma proporção a cada uma — uma camada de baixo mais grossa põe o peso visual embaixo e fica mais firme aos olhos.',
    note: 'Despeje a camada seguinte quando a de baixo já firmou o bastante para o dedo não deixar marca. Sobre uma camada mole as cores se misturam; sobre uma totalmente fria, as camadas não colam e se separam ao queimar. Essências diferentes por camada é má ideia — a chama esquenta as camadas de baixo e mistura tudo de todo jeito.',
  },
  'container-fill-height': {
    title: 'Calculadora de altura de cera no recipiente',
    desc: 'Até que altura um peso de cera sobe num recipiente de determinado diâmetro interno.',
    long: 'Dividindo 180 g por uma densidade de 0,9 dá 200 mL, e um diâmetro interno de 7 cm tem área de base de 38,5 cm², então a cera fica com 5,2 cm de altura. Saber essa altura antes de despejar é como você confere se o suporte do pavio ficou coberto e se o nível para abaixo do topo do rótulo.',
    note: 'O suporte do pavio tem de 3 a 6 mm de espessura; cera mais rasa que isso deixa o suporte exposto e joga o último calor no fundo de vidro. Recipiente que afina embaixo enche mais alto do que isto, e colocar um lado em vez do diâmetro num recipiente quadrado dá um valor baixo. Cole o rótulo abaixo da linha da cera — rótulo acima da superfície descola conforme a vela esquenta.',
  },
  'fragrance-max': {
    title: 'Calculadora de carga máxima de essência',
    desc: 'O teto de óleo de uma cera e quanta folga a porcentagem planejada deixa.',
    long: 'Se a cera indica 10 % de máximo, 500 g podem carregar 50 g de óleo. Planejar 8 % coloca 40 g e deixa 10 g de folga. Essa folga não é reservada só para a essência — corante e qualquer outro aditivo dividem a mesma permissão.',
    note: 'Folga negativa quer dizer que o teto já foi passado. Óleo além dele não se liga: ele sua da superfície endurecida ou empoça no fundo, e sobe pelo pavio dando uma chama grande demais. Se a vela ainda cheira pouco no máximo, a resposta está no óleo, na temperatura de adição ou na cura, não na porcentagem — a soja precisa de uma a duas semanas para liberar aroma de verdade.',
  },
  'candle-price': {
    title: 'Calculadora de preço de venda da vela',
    desc: 'Preço de venda a partir de uma margem desejada, e a margem que um preço escolhido realmente dá.',
    long: 'A margem é medida sobre o preço de venda. Para manter 60 % sobre um custo de material de 4.000, o preço é 4.000 ÷ (1 − 0,6) = 10.000. Somando 60 % ao custo você chega a 6.400, que é uma margem de 37,5 % e não de 60 %. Vendendo a 9.000 sobram 5.000 de lucro e uma margem de 55,6 %.',
    note: 'Só material entra neste número. Despejos perdidos, embalagem e enchimento, frete, taxas de plataforma (em geral 3 a 10 % do preço) e as horas gastas em fotos e rótulos ficam todos fora. Se você também vende no atacado, o preço de atacado precisa ser pelo menos o dobro deste custo de material para o preço de varejo sobreviver.',
  },
  'candles-from-wax': {
    title: 'Quantas velas dá para fazer com a cera que você tem',
    desc: 'Quantas velas de um tamanho uma quantidade de cera vai render.',
    long: 'Pegue um saco de 5 kg, perca 5 % na panela e na jarra, e 4.750 g é o que de fato é despejado. A 180 g cada, são 26 velas com 70 g de sobra. Junte os 70 g na próxima tanda ou despeje como cera aromática — sempre sobra menos de uma vela.',
    note: 'A essência não está nesta contagem. O óleo é somado sobre o peso da cera, então ele não reduz o número de velas, mas é um custo separado. A porcentagem de perda depende do tamanho da tanda: 5 % é generoso para derreter 5 kg de uma vez, mas derreter 500 g dez vezes deixa o mesmo resíduo dez vezes e passa de 10 %.',
  },

  /* ───────── Sabão e resina (segunda leva) ───────── */
  'multi-oil-lye': {
    title: 'Calculadora de soda cáustica para vários óleos',
    desc: 'Some três óleos, cada um com o seu índice SAP, e obtenha a soda cáustica que a mistura pede.',
    long: 'Uma receita com vários óleos tem que ser calculada óleo por óleo e depois somada, porque o índice SAP pertence ao óleo e não ao sabão em geral — tire cada valor dos dados daquele óleo, seja a ficha do fornecedor, seja uma tabela padrão de SAP. Oliva com 300 g (SAP 190), coco com 150 g (SAP 258) e mamona com 50 g (SAP 180) dão 300×190 + 150×258 + 50×180 = 104.700, que dividido por 1402,5 são 74,7 g de soda, e tirando 5 % de supergordura sobram 70,9 g. O SAP médio mostrado ao lado, 209,4 aqui, é a média ponderada pelo peso: é o número a usar se depois você tratar essa mistura como um único óleo. Troque um óleo e o SAP médio se move, então a soda tem que ser refeita.',
    note: 'A soda vai na água, nunca a água na soda — na ordem errada a mistura ferve e espirra em segundos. Use óculos de proteção e luvas, e misture em aço inox ou HDPE, nunca em alumínio, que a soda ataca e transforma em hidrogênio. A solução se aquece sozinha até 80–90 °C no contato, então nada de vidro nem de plástico fino. Um peso de óleo digitado errado desloca a soda: de menos deixa uma barra mole que nunca firma, de mais deixa uma barra cáustica. Deixe em zero o peso de um óleo que você não usa — um valor de SAP sobrando sozinho não muda nada.',
  },
  'water-discount': {
    title: 'Calculadora de redução de água no sabão',
    desc: 'Corte uma porcentagem da água cheia e veja o peso de água e a concentração da solução de soda que sobra.',
    long: 'A água não participa da saponificação: ela leva a soda até os óleos e vai embora enquanto a barra cura. Reduzi-la, portanto, não é economizar material, é deixar a solução de soda mais forte. Setenta e um gramas de soda a 2 : 1 são 142 g de água, uma solução de 33 %. Tire 20 % e ficam 113,6 g de água a 38,5 %. Uma solução mais forte põe menos água na massa, então o traço chega bem mais cedo — menos tempo para desenhar, mas firme o bastante para desenformar em um dia, cura mais curta e menos retração. É por isso que a redução combina com barras lisas e tandas apressadas, enquanto um redemoinho elaborado quer redução zero ou água extra.',
    note: 'Perto de 50 % é o limite prático: mais forte que isso a soda não se dissolve toda e sobram grãos que acabam dentro da barra. Quanto maior a redução, mais alto o pico de temperatura da solução, então comece com água gelada — e mantenha a ordem, soda na água, ou ela ferve e espirra. Óculos de proteção, luvas, e aço inox ou HDPE, nunca alumínio. Cortar a água nunca muda o peso da soda. Reduza a soda junto com a água e você tem uma barra mole que não firma; pese soda no campo da água por engano e tem uma barra cáustica.',
  },
  'soap-mold-fill': {
    title: 'Calculadora de volume do molde de sabão',
    desc: 'Transforme o volume do molde e a densidade da massa no peso da tanda, e no óleo dentro dela.',
    long: 'Molde se mede em volume, receita em peso, e a densidade da massa é o que liga os dois — a massa de sabão corre um pouco mais leve que a água, 0,9–1,0 g/mL, e 0,95 é o padrão aqui. Um molde de 1.200 mL comporta então cerca de 1.140 g de massa. Voltar dali para o óleo exige uma suposição: a soda é uma fração fixa do peso do óleo (13,5 % por padrão, um valor realista para misturas comuns) e a água é um múltiplo da soda (2× por padrão). A massa é então 1 + 0,135 + 0,27 = 1,405 vez o óleo, então 1.140 ÷ 1,405 = 811 g de óleo, 109,5 g de soda e 219 g de água. A fração real da soda é definida pela sua mistura de óleos, então, com a mistura fechada, coloque nesse campo o valor de soda ÷ óleo da calculadora de soda para vários óleos. Meça o molde com água, e espere um molde de silicone levar uns 5 % mais do que a aritmética, porque as paredes abaúlam sob a massa.',
    note: 'Não encha até a borda. A massa sobe conforme esquenta, e uma tanda que gelifica por cima endurece numa poça em volta do molde — deixe 1 a 1,5 cm livres. Despejando pouco demais, ao contrário, as barras saem rasas e esfarelam ao cortar. A densidade acompanha a receita: óleos duros como o de coco a deixam mais pesada, e massa batida é muito mais leve. Uma vez despejado um molde, anote o peso da massa dividido pelo volume dele e use esse valor — o seu número ganha de qualquer padrão.',
  },
  'soap-cure-progress': {
    title: 'Calculadora de tempo de cura do sabão',
    desc: 'Os dias desde que você fez, contra uma cura alvo, dão a porcentagem curada e os dias que faltam.',
    long: 'Curar é a água saindo, não saponificação. A reação em si termina em 24 a 48 horas, então a barra já é sabão nesse ponto, mas está mole e dura pouco porque a água que você misturou ainda está lá. Ao longo de quatro a seis semanas essa água evapora, a barra endurece e a espuma fica mais fina e mais duradoura. Contra uma meta de 42 dias, o dia 14 é 33 % com 28 dias por vir. A meta é uma marca, não um prazo — as barras continuam melhorando depois dos 100 %, e um sabão de Castela rico em oliva é visivelmente melhor com dois ou três meses, melhor ainda com seis. Para acompanhar de verdade, use a balança: pese uma barra, anote e repese a cada poucos dias; quando o peso para de cair, a água já saiu, tipicamente 5 a 10 % abaixo de onde começou.',
    note: 'Esta porcentagem conta dias e não sabe nada do seu ambiente. Num verão úmido o peso ainda está caindo bem depois do dia 42; no ar seco do inverno ela termina antes. Deixe as barras de lado, com espaço entre elas, numa prateleira ventilada — empilhadas ou em caixa, os dias passam e a água fica. Embalar em filme ou plástico é depois da cura, não durante. E uma barra que está mole porque faltou soda nunca endurece: a cura resolve umidade, não uma receita mal pesada.',
  },
  'resin-coverage': {
    title: 'Calculadora de resina para cobertura',
    desc: 'Descubra o volume e o peso de resina para cobrir uma área numa espessura dada.',
    long: 'Revestir é área vezes espessura, e a única armadilha são as unidades: centímetros quadrados multiplicados por milímetros precisam ser divididos por 10 para cair em centímetros cúbicos, que são mililitros. Uma bandeja de 60 × 60 cm, 3.600 cm², a 3 mm leva 1.080 mL, ou 1.188 g com densidade 1,1. Superfícies largas como tampos raramente são despejadas com mais de uns 3 mm por vez, então a espessura se divide em camadas — coloque a espessura de uma camada e repita o despejo em vez de recalcular a cada vez. Resina autonivelante se espalha sozinha numa superfície nivelada, mas meio grau de inclinação engrossa a borda baixa e deixa a alta faminta, então um nível de bolha importa mais que a aritmética.',
    note: 'Conte com o que escorre. Uma superfície sem borda — um tampo, o lado de fora de uma bandeja — perde resina pelas laterais, então reserve de 10 a 20 % acima do número e faça um dique de fita ou ponha algo embaixo para pegar os pingos. Misture sempre 5 a 10 % extra para o que fica no copo e no palito. Despejar toda a profundidade de uma vez concentra o calor e a placa amarela ou racha, então respeite a espessura máxima por camada do frasco. Superfícies porosas como madeira crua bebem a primeira camada, então sele com uma camada fina antes da definitiva.',
  },
  'resin-doming': {
    title: 'Calculadora de domo de resina',
    desc: 'Obtenha a resina de um despejo abaulado a partir do diâmetro da peça e da altura do domo.',
    long: 'Um domo é uma fatia de esfera, não um cilindro, então multiplicar diâmetro por altura exagera muito. A fórmula certa é πh(3a² + h²)/6, com a como raio. Uma base de 25 mm abaulada 3 mm comporta 750 mm³, que são 0,75 mL; dez delas são 7,5 mL, ou 8,3 g a 1,1 g/cm³. Um domo natural fica em torno de 8 a 12 % do diâmetro — 2 a 3 mm numa peça de 25 mm — e forçar além disso falha, porque a tensão superficial é a suposição que sustenta esta conta. A resina constrói a própria lente onde você a coloca, e essa altura é definida pela viscosidade e pela tensão superficial, não pela aritmética. Trate a resposta como "quanta resina um domo dessa altura contém", depois encha até a borda e acrescente gotas a olho.',
    note: 'Domo escorre. Sem um lábio na borda, a resina passa por cima, endurece no verso, e lixar aquilo demora mais que despejar de novo — passe fita por baixo ou use um engaste com aro. Resina de baixa viscosidade, vendida para camadas de cobertura, simplesmente se espalha em vez de abaular, use o quanto usar. Deixe a mistura descansar meia hora antes de despejar e a maioria das bolhas sobe sozinha; passe o maçarico rápido no que restar, porque parar com ele ali afunda a superfície.',
  },
  'resin-cups': {
    title: 'Calculadora de divisão de cores na resina',
    desc: 'Divida um peso total de resina em copos, um por cor, igualmente ou com uma cor de fundo maior.',
    long: 'Trabalhar com várias cores significa dividir a resina em copos, e a ordem importa: una A e B completamente primeiro, depois divida. Duzentos e vinte gramas em três cores são 73,3 g cada; dê 40 % à cor de fundo e passa a ser 88 g mais 66 g para cada uma das outras duas. Deixando a fração principal em zero, volta a divisão igual. Divisões iguais são raras na prática — o fundo costuma levar mais da metade e um realce precisa de poucos gramas — então definir a fração do fundo primeiro e dividir o resto corresponde a como as peças são despejadas de verdade. Misture um copo a mais do que precisa: uma cor que fica barrenta não se desfaz, e uns gramas de resina incolor guardados é o que a salva.',
    note: 'Una cada copo por completo antes de qualquer pigmento entrar. Tingindo primeiro, você não vê se A e B realmente se casaram, e um copo mal misturado fica grudento só ele. O tempo gasto repartindo também sai do tempo de trabalho: com seis copos o último já está engrossando, então, com muitas cores, misture em duas rodadas e não numa só. Cada transferência deixa 1 a 2 g na parede do copo, então chega ao molde um pouco menos do que os números dizem. Copo pequeno tem base estreita e balança na balança — apoie o copo, zere e encha um por vez.',
  },
  'silicone-ratio': {
    title: 'Calculadora de proporção A:B do silicone',
    desc: 'Divida um peso total de silicone em parte A e parte B, em peso.',
    long: 'A proporção depende da família de silicone que você tem. A cura por platina (adição) costuma ser 1 : 1, então o total simplesmente se divide ao meio; a cura por estanho (condensação) usa pouco catalisador, tipicamente 10 : 1 ou 100 : 5, que é 20 : 1. Quinhentos gramas a 10 : 1 são 454,5 g de A e 45,5 g de B, com o catalisador em 9,1 % da tanda. Os mesmos 500 g a 1 : 1 são 250 g de cada e uma fração de catalisador de 50 % — uma pesagem completamente diferente, e é por isso que dividir o total ao meio sem ler a lata é o erro clássico. Estas são proporções em peso; muitos produtos imprimem também uma proporção em volume, então use a de peso quando trabalhar na balança. A aritmética é a mesma da calculadora de proporção da resina, mas o silicone perdoa muito menos em tandas pequenas, porque o catalisador fica pesadamente de um lado.',
    note: 'Quando o lado do catalisador tem só 45 g, errar 1 g já é 2 % de erro — use balança que leia 0,1 g e nunca dose a parte B a olho. Catalisador de menos e o molde fica grudento por dentro e não solta; de mais e o material vira antes de você terminar de despejar. A cura por platina também é sensível a contaminação: massa com enxofre, luvas de látex ou um copo que teve cura por estanho deixam uma área permanentemente sem curar, então teste um canto escondido se tiver dúvida sobre o modelo. Nunca misture as duas famílias. Pese 5 % extra também — silicone despejado em duas vezes racha na junta.',
  },

  /* ───────── Miçangas e embalagem (segunda leva) ───────── */
  'necklace-length': {
    title: 'Calculadora de comprimento de colar',
    desc: 'Passe do comprimento pronto do colar e do tamanho da miçanga para a contagem de miçangas e o espaço do fecho.',
    long: 'Comprimentos de colar têm nome: choker 40 cm, princesa 45 cm, matinê 55 cm, ópera 75 cm, rope 105 cm. Um choker ainda tem que passar pelo pescoço, em geral 33 a 35 cm, enquanto o princesa cai na clavícula e o matinê abaixo do busto. Escolhido o alvo, o resto é subtração: num colar de 45 cm o fecho e as terminações levam 20 mm, deixando 430 mm para miçangas, então bolas de 8 mm dão 53 miçangas e um comprimento pronto de 44,4 cm. Pule essa subtração, divida 450 por 8, enfie 56 miçangas, e o colar fecha em 46,8 cm — passando do comprimento que você queria. O fio mostrado ao lado é o alvo mais 10 cm, as pontas que você devolve pelas terminações nas duas extremidades.',
    note: 'A contagem arredonda para baixo; os milímetros de sobra se juntam junto ao fecho e não existe meia miçanga. Os diâmetros impressos são nominais e pedra natural varia meio milímetro por peça, então espere errar uma ou duas — alinhe dez miçangas numa régua antes de enfiar e você tem o diâmetro real. O espaço do fecho varia mais que qualquer outra coisa: uma lagosta pequena são 10 mm, um fecho magnético de bola ou um com corrente extensora passa de 40 mm. Colares também caem para a frente com o próprio peso e parecem um pouco mais compridos na frente, então, na dúvida, tire um centímetro do alvo.',
  },
  'bracelet-size': {
    title: 'Calculadora de tamanho de pulseira',
    desc: 'Some folga à medida do punho para achar o comprimento do fio e a contagem de miçangas.',
    long: 'A pulseira não pode ser montada na medida crua do punho, porque o fio corre por fora das miçangas e não contra a pele — quanto maior a miçanga, maior a circunferência efetiva. A folga padrão é de 1 a 1,5 cm numa pulseira de elástico e de 1,5 a 2 cm numa com fecho, já que o fecho tem que girar em volta do punho e não fecha sem sobra. Um punho de 16 cm mais 1,5 cm dá um fio de 17,5 cm, que comporta 21 miçangas de 8 mm. Numa pulseira com fecho, tire o comprimento do fecho — em geral 10 a 15 mm — das miçangas e não do fio, ou seja, enfie umas duas menos. O fio de elástico não tem fecho, então as miçangas ocupam o fio inteiro. O cordão mostrado é o fio mais 8 cm, as pontas para dar o nó e puxá-lo para dentro.',
    note: 'O fio de elástico falha mais por arrebentar do que por desamarrar. Use 0,8 mm ou mais grosso e estique as pontas algumas vezes antes de enfiar, senão a pulseira fica folgada em poucos dias. Dê um nó de cirurgião duas vezes, ponha uma gota de cola e esconda o nó dentro do furo de uma miçanga. Pedra e metal com furo áspero serram o fio, então essas peças pedem uma pulseira com fecho. O punho também incha ao longo do dia até meio centímetro, então erre para o lado generoso quando for presente.',
  },
  'chain-links': {
    title: 'Calculadora de elos da corrente',
    desc: 'Quantos elos um comprimento de corrente leva, e o comprimento que elos inteiros realmente dão.',
    long: 'Corrente só se corta num elo. Para chegar a 45 cm com elos de 7 mm, 450 ÷ 7 é 64,3, então você fica com 64 elos — e 64 elos medem 44,8 cm. Não existe jeito de acertar 45 cm exatos; a escolha é entre 44,8 cm e 45,5 cm com 65 elos. Meça o elo deitando a corrente numa régua, contando dez elos e dividindo por dez: medindo um elo só, um erro de 0,5 mm se multiplica por 64 e vira 3 cm de diferença. As peças de acabamento também comem comprimento — um fecho mais duas argolas dão em geral 15 a 20 mm, então subtraia isso do comprimento pronto antes de usar esta conta. Correntes regulares, como cadeado e cordão, aceitam a aritmética direta; num padrão que se repete, como o fígaro, coloque o comprimento de uma repetição inteira (digamos um elo longo mais três curtos).',
    note: 'Sabendo onde cortar, importa como você corta: alguns elos abrem e fecham de novo, outros têm que ser rompidos. Corrente soldada pede alicate de corte, e o elo cortado é perda, então o comprimento real sai um elo menor. Numa corrente que vai carregar um pingente pesado, a espessura importa mais que a contagem — um elo fino abre sob carga e o pingente vai embora. Quando duas correntes têm que combinar, como em brincos, deixe-as lado a lado e conte elos em vez de medir cada uma com a trena, que estica diferente a cada vez.',
  },
  'earring-wire': {
    title: 'Calculadora de arame para brincos',
    desc: 'Arame por brinco e por par a partir do diâmetro da argola, das voltas e de uma folga para o laço.',
    long: 'Uma volta de argola é diâmetro × π. Uma argola de 20 mm são 62,8 mm, então duas voltas sobrepostas são 125,7 mm e, com 15 mm de folga para o laço, isso dá 140,7 mm por brinco e 281,3 mm para o par. A folga cobre formar o laço que pendura do gancho e arrematar a ponta: um laço simples de alicate de ponta redonda leva 8 a 10 mm, um laço enrolado de 20 a 25 mm. As voltas entram em passos de meio — 1,5 volta dá uma argola com meia sobreposição, que de frente aparece como uma linha dupla. Para um pendente em vez de uma argola, ponha a largura do pendente no campo do diâmetro e 1 no campo das voltas para uma circunferência simples. Igualar os dois é o real objetivo desta conta: medindo e cortando os dois brincos separados, eles saem 1 a 2 mm diferentes, o que se vê de frente. Corte o comprimento do par, dobre ao meio e corte uma vez.',
    note: 'Economizando na folga você não consegue arrematar a peça. Sem uma ponta para segurar, o laço não aperta, e o arame estica um pouco enquanto você o puxa, então o comprimento real passa da aritmética. Arame grosso — 0,8 mm / calibre 20 para cima — não forma um círculo limpo na mão e tem que ser enrolado num mandril, o que deixa a argola com mandril mais arame de diâmetro, maior que o calculado. O que passa pela orelha deve ser aço cirúrgico, titânio ou prata; deixe o arame de bijuteria com níquel para o corpo da argola. Some um milímetro por corte para limar as pontas.',
  },
  'bubble-wrap': {
    title: 'Calculadora de plástico bolha',
    desc: 'Descubra quanto plástico bolha uma caixa leva, a partir das medidas e do número de camadas.',
    long: 'O plástico bolha é vendido em bobina, então a resposta tem que ser um comprimento — mas o que define a quantidade é a área da superfície da caixa. Uma caixa de 20 × 15 × 8 cm tem 2 × (20×15 + 20×8 + 15×8) = 1.160 cm² de superfície. Enrole duas vezes e some 15 % pela sobreposição e pelas dobras nos cantos e chega a 2.668 cm², que numa bobina de 50 cm são 53 cm — 0,53 m. Esses 15 % são a folga da qual esta conta depende: as pontas têm que se sobrepor para a fita segurar, e os cantos consomem mais que a área plana. O número de camadas é definido pelo conteúdo: uma para algo que não quebra, três ou mais para vidro, cerâmica e eletrônicos, mais uma volta extra em cantos e alças. Para uma tiragem de 100 pacotes, multiplique o comprimento por 100 e divida pelo comprimento da bobina — uma bobina de 50 cm em geral tem 50 m.',
    note: 'Se a bobina é mais estreita que a caixa, aritmética correta não vai ajudar você a embalar: a bobina tem que cobrir a face menor — aqui os 15 cm de profundidade ou os 8 cm de altura — então confira a largura antes de comprar. Enrole com as bolhas para dentro; para fora elas nunca comprimem e simplesmente estouram, e a proteção acaba. Lembre também que o objetivo é impedir o conteúdo de se mover dentro da caixa, então embalar bem e ainda deixar vazios não resolve muito. Onde a transportadora cobra por peso cubado, engordar a caixa com camadas extras aumenta o frete, então, se você precisa de três camadas, suba um tamanho de caixa.',
  },
  'tissue-paper': {
    title: 'Calculadora de papel de seda para embalagem',
    desc: 'Dimensione a folha de papel de seda que uma caixa pede, e conte as folhas de uma tiragem de pacotes.',
    long: 'O papel de seda forra a caixa: cobre o fundo, sobe as duas paredes e se dobra sobre o conteúdo em cima. Um lado é, portanto, a largura da caixa mais duas vezes a altura, pelas duas paredes, mais uns 5 cm para sobrepor em cima — numa caixa de 20 × 15 × 8 cm isso dá 20 + 16 + 5 = 41 cm, e 15 + 16 + 5 = 36 cm no outro sentido. A folha padrão que cobre 41 × 36 cm é a de 50 × 70 cm, a mais comum; cortada ao meio ela vira 35 × 50 cm, um pouco curta para esta caixa. É isso que esta conta decide de verdade: usar folhas inteiras ou cortá-las. Duas folhas por pacote é o normal — uma atravessada para envolver a peça, uma por cima ou amassada para preencher os vazios. Dez pacotes são 20 folhas, então um pacote de 100 folhas cobre cinco tiragens como essa.',
    note: 'Papel de seda de cor forte solta tinta. Mãos úmidas ou um estoque abafado transferem corante para conteúdos claros, então use branco sem acidez para qualquer coisa que absorva, como roupa, sabonete ou vela. O papel de seda também não é proteção: ele apresenta a peça e evita que as superfícies se arranhem, mas não absorve impacto, então frágil leva plástico bolha primeiro e papel de seda por cima. Papel com fibra orientada racha na dobra se você dobrar contra a fibra, então dobre uma folha antes de cortar a pilha. E meça o lado de dentro da caixa — pegando as medidas externas, a folha fica curta pela espessura da parede.',
  },
  'ribbon-bow': {
    title: 'Calculadora de laço de fita',
    desc: 'Descubra a fita que o laço em si precisa, a partir das alças, do tamanho delas e das pontas.',
    long: 'Cada alça vai e volta, então come o dobro do próprio comprimento. Seis alças de 6 cm são 72 cm, duas pontas de 12 cm somam 24 cm, e 5 cm para amarrar o centro levam a 101 cm. O laço pronto tem mais ou menos o dobro do comprimento da alça de largura — 12 cm aqui — e cerca de um terço da largura da caixa fica bonito. O número de alças define o caráter: duas alças é o laço simples amarrado à mão, seis se constrói em camadas, e passando de dez ele se lê como uma flor pompom redonda. Esta ferramenta cobre só o laço. A fita que dá a volta na caixa é a calculadora de fita para presente, 2 × (largura + altura) + 2 × (profundidade + altura) na embalagem em cruz — some os dois valores se uma única fita envolve e amarra, ou use só este se você faz o laço à parte e prega depois.',
    note: 'A largura da fita decide como o laço se lê. A 25 mm ou mais as alças ficam em pé e uma alça de 6 cm parece generosa; a 6 mm a mesma alça cai murcha, então fita fina pede mais alças para dar volume. Fita com arame na borda mantém a forma, enquanto fita comum achata no instante em que você aperta o centro, deixando o laço menor do que os números sugerem. Fita tecida como o cetim desfia onde é cortada, então apare na diagonal ou passe rápido o fogo, e deixe um centímetro para isso. E o laço que você erra não está na aritmética — compre 20 a 30 % a mais na primeira vez que tentar um modelo.',
  },
  'mailer-size': {
    title: 'Calculadora de tamanho de envelope de envio',
    desc: 'Dimensione um envelope plástico ou com bolhas a partir da largura, do comprimento e da espessura do item.',
    long: 'O envelope é uma manga achatada, então a espessura do item sai da largura. A circunferência da manga é 2 × a largura dela, e o item precisa de 2 × (largura + espessura), o que significa que o envelope tem que ter no mínimo a largura do item mais uma espessura. Some 2 cm para conseguir pôr e tirar: um item de 25 cm de largura e 4 cm de espessura quer um envelope de 31 cm. O comprimento funciona do mesmo jeito, comprimento do item mais espessura mais folga, e depois 4 cm para a aba adesiva, dando 40 cm — a aba se dobra por cima e nenhum conteúdo pode ficar nela. Então a resposta é "31 × 40 cm ou maior", e você compra a medida de prateleira mais próxima acima, digamos 32 × 45 cm. Meça itens compressíveis, como roupa, na espessura amassada. Repare também em como o fornecedor informa as medidas: alguns listam o interno, outros o externo com a aba, e um número externo tem que ter a aba descontada antes da comparação.',
    note: 'Envelope não amortece. Mesmo o forrado com bolhas só resiste a atrito e pressão, então qualquer coisa quebrável vai em caixa. Economizando na folga, o conteúdo sobe até a aba adesiva, o lacre nunca cola bem e o envelope abre no caminho — suba um tamanho em vez de aparar a folga. Grande demais é problema próprio: o item desliza, os cantos batem, e a sobra dobra sobre a etiqueta, onde o leitor não consegue ler. Forçar um item grosso estica o filme até ele rasgar num canto, então, passando de uns 5 cm de espessura, use caixa. O tamanho do envelope ajuda no peso cubado, mas calcule o frete pelas regras da sua transportadora.',
  },
};
