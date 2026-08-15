import type { FormulaText } from '../formula/types.ts';

/*
 * Spanish copy for the 48 craft tools.
 *
 * No arithmetic lives here: 8% of 500 g is 40 g in every language, so the
 * numbers stay in lib/craft/*.ts. This file only carries title, desc, long
 * and note.
 *
 * Vocabulary is fixed once and reused everywhere (TERMS, DESC and here):
 * lana / ovillo / muestra (gauge and swatch) / puntos / vueltas, tela /
 * margen de costura / bies, ribete / guata for a quilt, cera / fragancia /
 * mecha, sosa caustica for NaOH and potasa for KOH, resina epoxi, abalorios /
 * anillas / cordon. Money carries no currency symbol.
 */
export const CRAFT_ES: Record<string, FormulaText> = {
  /* ───────── Punto y ganchillo ───────── */
  'yarn-needed': {
    title: 'Calculadora de lana necesaria',
    desc: 'Pesa una muestra y sabrás cuánta lana necesita la prenda entera.',
    long: 'Teje un cuadrado de 10 cm y pésalo: eso te dice los gramos que cuesta cada centímetro cuadrado. Multiplica por el área de la pieza acabada y ya tienes los gramos de lana. La cantidad que trae el patrón supone la muestra del patrón, así que se desvía en cuanto la tuya es distinta.',
    note: 'Añade en torno a un 15 % de margen. Las mangas, el cuello y los remates comen más de lo que sugiere el área plana, y cuando se agota un lote de tinte ese mismo tono ya no se encuentra.',
  },
  'yarn-skeins': {
    title: 'Cuántos ovillos comprar',
    desc: 'Convierte los metros que necesitas y los metros por ovillo en ovillos a comprar.',
    long: 'Un ovillo no se vende partido, así que la división se redondea hacia arriba. Sumar el margen antes de redondear importa: si redondeas primero, un ovillo que de verdad falta desaparece del resultado.',
    note: 'Los metros de la faja son nominales. Dos ovillos del mismo peso pueden llevar varios metros de diferencia, así que comprar la cifra justa arriesga quedarte sin lana en las últimas vueltas.',
  },
  'gauge-stitches': {
    title: 'Calculadora de puntos a montar',
    desc: 'Pasa de tu muestra de puntos y del ancho que quieres al número de puntos que montar.',
    long: '22 puntos en 10 cm son 2,2 puntos por centímetro; multiplica por el ancho que buscas. Si el dibujo se repite cada cierto número de puntos, redondea al múltiplo más cercano.',
    note: 'Mide la muestra después de lavar y bloquear. El ancho recién salido de las agujas cambia en cuanto la lana se moja.',
  },
  'gauge-convert': {
    title: 'Ajustar los puntos del patrón a tu muestra',
    desc: 'Recalcula los puntos de un patrón cuando tu muestra no coincide con la suya.',
    long: 'Si un patrón escrito a 22 puntos por 10 cm te manda montar 110 y tú tejes a 20, esos 110 puntos salen más anchos de lo previsto. Escalar la cuenta por la razón entre las dos muestras devuelve el ancho original.',
    note: 'Igualar los puntos arregla el ancho, no el largo. Las vueltas se calculan aparte, con tu muestra de vueltas.',
  },
  'yarn-weight-length': {
    title: 'De peso de lana a metros',
    desc: 'Pesa la lana que te sobra para saber cuántos metros quedan.',
    long: 'Los metros y los gramos de la faja fijan los metros por gramo. Pon el resto en la balanza y sabrás lo que te queda; comparado con lo que come una vuelta, eso te dice cuántas vueltas más aguanta.',
    note: 'Resta el tubo de cartón o la faja si el ovillo sigue montado. Equivocarte en 5 g mueve la respuesta unos 20 m.',
  },
  'wpi-weight': {
    title: 'Calculadora de WPI (vueltas por pulgada)',
    desc: 'Identifica el grosor de una lana contando las vueltas que caben en una pulgada.',
    long: 'Enrolla la lana una vuelta junto a otra sobre una regla hasta llenar una pulgada: esa cuenta es el WPI y se corresponde con los números de grosor estándar. Así se clasifica una lana sin faja, o un resto — unas 12 vueltas suelen ser un grosor worsted (el 4).',
    note: 'Enrollar tirando sube el WPI y hace que la lana parezca más fina de lo que es. Junta las vueltas sin aplastarlas.',
  },
  'hat-cast-on': {
    title: 'Puntos para empezar un gorro',
    desc: 'Calcula los puntos a montar de un gorro con el perímetro de la cabeza y la holgura negativa.',
    long: 'Un gorro tiene que acabar más pequeño que la cabeza o se sube solo. Quitar en torno al 10 % del perímetro medido es el punto de partida habitual, y un elástico muy elástico admite algo más.',
    note: 'Redondea al múltiplo del dibujo: un elástico 2×2 necesita múltiplo de cuatro o la unión no queda alineada.',
  },
  'sleeve-decrease': {
    title: 'Calculadora de disminuciones de manga',
    desc: 'Reparte las disminuciones por igual entre los puntos iniciales y los finales.',
    long: 'Cada vuelta de disminución quita un punto a cada lado, o sea dos a la vez. La mitad de la diferencia es el número de disminuciones, y dividir las vueltas entre ese número da el intervalo.',
    note: 'Cuando no sale exacto, deja las vueltas sobrantes arriba, junto a la sisa. La irregularidad se nota mucho más cerca del puño.',
  },

  /* ───────── Costura ───────── */
  'fabric-yardage': {
    title: 'Cuánta tela necesito',
    desc: 'Tela a comprar a partir del tamaño de la pieza, cuántas piezas y el ancho de la tela.',
    long: 'La tela viene con un ancho fijo, así que lo primero es cuántas piezas caben a lo ancho. Una pieza de 40 cm en tela de 110 cm cabe dos veces y los 30 cm que sobran son merma: seis piezas piden tres filas y el largo sale 3 × 50 = 150 cm. Si caben tres a lo ancho, esas mismas seis piezas cuestan solo 100 cm.',
    note: 'Si la pieza es más ancha que la tela, aquí se cuenta una por fila; en la práctica habría que unirla o girar el trazado. Los estampados con dirección no se pueden girar, así que piden más de lo que dice esta cifra.',
  },
  'fabric-pieces': {
    title: 'Cuántas piezas salen de la tela',
    desc: 'Cuántas piezas iguales puedes cortar de la tela que ya tienes.',
    long: 'A lo ancho salen ⌊110 ÷ 40⌋ = 2 y a lo largo ⌊200 ÷ 50⌋ = 4 filas, o sea ocho piezas. Las dos divisiones se redondean hacia abajo, y por eso la tira de 30 cm que sobra no cuenta: aprovecharla con piezas pequeñas es otra cuenta.',
    note: 'Mete medidas de corte, con el margen de costura ya dentro. Partir de las medidas acabadas sube el número pero deja las piezas sin nada que coser. La tela sin lavar todavía tiene su encogimiento por delante: si la cortas así, se irá en el primer lavado.',
  },
  'seam-allowance': {
    title: 'Calculadora de margen de costura',
    desc: 'Pasa de la medida acabada y el margen de costura a la medida de corte.',
    long: 'El margen se añade en los dos bordes opuestos, así que cada dirección crece el doble del margen. Una pieza acabada de 40 × 50 cm con 1 cm de margen se corta a 42 × 52 cm. Si lo sumas una sola vez, la pieza acabada sale 2 cm pequeña.',
    note: 'El margen estándar cambia según la tradición: 1 cm en los patrones coreanos y japoneses, 5/8 in (1,6 cm) en los americanos y 1/4 in (0,6 cm) en patchwork. Un dobladillo de doble doblez pide además el doble del ancho del doblez.',
  },
  'bias-binding': {
    title: 'Calculadora de tira al bies',
    desc: 'Tamaño del cuadrado de tela que da una tira al bies de la longitud que necesitas.',
    long: 'El bies va a 45°, así que no puedes sacar una tira larga tirando del rollo: se corta un cuadrado en diagonal y se une, o se enrolla como un tubo continuo. Lo que la longitud fija en realidad es un área: 300 cm × 4 cm = 1.200 cm², más un 10 % para las uniones y el recorte, así que √1.320 ≈ 36,3 cm de lado.',
    note: 'Una cinta de doble doblez que acaba en 1 cm se corta cuatro veces más ancha, 4 cm. Si metes el ancho acabado no queda nada que doblar. Los géneros de punto ya estiran y casi nunca necesitan bies.',
  },
  'gather-ratio': {
    title: 'Calculadora de fruncido',
    desc: 'Largo de tela a cortar para un borde fruncido o con volante.',
    long: 'La proporción de fruncido es cuántas veces el largo acabado cortas antes de recogerlo. Dos veces una abertura de 60 cm significa cortar 120 cm y fruncirlos hasta 60, así que 60 cm desaparecen en los pliegues. Las telas finas admiten 2,5–3× y las gruesas se paran cerca de 1,5×: la misma proporción da un volumen completamente distinto según el género.',
    note: 'Decide la proporción antes de cortar: tirar del hilo de fruncir no añade largo después. Los volantes y las tiras rizadas usan la misma cuenta, normalmente a 2× o más.',
  },
  'elastic-length': {
    title: 'Calculadora de largo de elástico',
    desc: 'Cuánto elástico cortar a partir de una medida del cuerpo y del estiramiento.',
    long: 'El elástico se corta más corto que el cuerpo al que tiene que ajustar. Quita el 10 % de una cintura de 76 cm y quedan 68,4 cm; suma 2,5 cm para solapar los extremos y corta 70,9 cm. El aro resultante tiene que estirar un 11,1 % (10 ÷ 90) para llegar a 76 cm, y esa es la exigencia real que le pones.',
    note: 'Pasado un 30 % de estiramiento sigue entrando, pero deja marca todo el día. La recuperación varía mucho de un elástico a otro, así que rodear el cuerpo y buscar el largo cómodo gana a cualquier fórmula.',
  },
  'fabric-shrinkage': {
    title: 'Calculadora de encogimiento de la tela',
    desc: 'Porcentaje de encogimiento y tela extra a comprar, a partir de una prueba de lavado.',
    long: 'Mide un tramo largo, no 10 cm. Si 100 cm vuelven convertidos en 96, el encogimiento es del 4 %. Para quedarte con 200 cm después del lavado necesitas 200 ÷ 0,96 = 208,3 cm, así que 8,3 cm se van en el agua. Sumar un 4 % da 208 cm, que se queda corto: aquí se divide, no se suma.',
    note: 'El algodón y el lino pierden entre un 3 y un 10 % en el primer lavado, y el denim más. El ancho también encoge, así que compruébalo aparte cuando una pieza entra justa a lo ancho. Lavar la tela antes de cortar elimina la incógnita.',
  },
  'pattern-scale': {
    title: 'Escalar un patrón de costura',
    desc: 'Medida resultante al ampliar o reducir un patrón impreso.',
    long: 'Las longitudes crecen con el porcentaje, pero el consumo de tela crece con su cuadrado. Una línea de 20 cm al 120 % pasa a 24 cm mientras el área de la misma pieza llega al 144 %: por eso un patrón apenas ampliado se queda sin tela. El zoom de la impresora es ese mismo 120 %.',
    note: 'Desactiva el ajuste a la página al imprimir y escribe la escala a mano; luego mide el cuadrado de prueba del patrón antes de cortar nada. Los márgenes de costura se quedan en su ancho original en vez de escalarse.',
  },

  /* ───────── Patchwork y bordado ───────── */
  'quilt-binding': {
    title: 'Calculadora de ribete para quilt',
    desc: 'Largo del ribete y número de tiras a cortar para un quilt.',
    long: 'El perímetro es 2 × (150 + 200) = 700 cm. Suma un ancho de tira en cada una de las cuatro esquinas (6,4 × 4 = 25,6 cm) más 25 cm para las uniones en diagonal y el solape del cierre: 750,6 cm. Las tiras se cortan a lo ancho de la tela y, con 2 cm de orillo recortado, cada una mide 105 cm — de ahí las ocho tiras.',
    note: 'Una tira de 2,5 in (6,4 cm) doblada por la mitad y cosida con 1/4 in de margen acaba en torno a 1 cm de ancho. Une las tiras en diagonal a 45°: las uniones a escuadra acumulan grosor y abultan en las esquinas.',
  },
  'quilt-backing': {
    title: 'Calculadora de tela de trasera para quilt',
    desc: 'Tela de trasera según el tamaño del quilt, el margen por lado y el ancho de la tela.',
    long: 'Las tres capas se mueven mientras acolchas, así que la trasera se corta más grande por todos los lados. Con 10 cm por lado necesitas 170 × 220 cm, y 170 cm pasa del ancho útil (107 − 2 = 105 cm), así que hay que unir dos largos: 220 × 2 = 440 cm a comprar.',
    note: 'Recorta los orillos antes de unir: están tejidos más apretados y tiran de esa línea hasta formar una arruga. Los talleres de acolchado a máquina piden a menudo 10 cm o más por lado, así que pregunta antes de cortar. Una trasera extra ancha de 240 cm o más evita la costura del todo.',
  },
  'quilt-batting': {
    title: 'Calculadora de guata para quilt',
    desc: 'Medidas de corte y área de la guata según el tamaño del quilt y el margen.',
    long: 'La guata lleva menos margen que la trasera. Con 5 cm por lado son 160 × 210 cm, un área de 3,36 m². Cortarla tan grande como la trasera deja un pliegue gordo que se engancha bajo el prensatelas.',
    note: 'La guata se vende en tallas con nombre fijadas en pulgadas: cuna, individual, queen. Comprarla por metros permite unir recortes: junta los bordes a tope en vez de solaparlos y pásales un zigzag para que el grosor no cambie. La guata de algodón encoge un 3–5 % al lavarla.',
  },
  'quilt-blocks': {
    title: 'Calculadora de bloques de quilt',
    desc: 'Bloques a lo ancho, a lo largo y en total para un quilt de un tamaño dado.',
    long: '150 ÷ 25 = 6 a lo ancho y 200 ÷ 25 = 8 a lo largo, o sea 48 bloques. Cuando no sale exacto, usa los bloques enteros y cubre la diferencia con las tiras de separación o con los bordes: ajustar un borde es mucho más fácil que rehacer la medida de todos los bloques.',
    note: 'Aquí el tamaño del bloque es el acabado. Un bloque acabado de 25 cm se corta a 26,2 cm con 0,6 cm en cada borde, y ese margen se pierde en cada costura. Doce pulgadas (30,5 cm) es la medida de bloque más común.',
  },
  'hst-squares': {
    title: 'Calculadora de HST (triángulo medio cuadrado)',
    desc: 'Qué tamaño cortar los cuadrados de partida para un HST acabado.',
    long: 'Dos cuadrados cosidos por la diagonal y cortados dan dos HST. Ese cuadrado tiene que cargar con la medida acabada más los dos márgenes laterales (0,6 × 2 = 1,2 cm) y el de la diagonal (√2 × 0,6 ≈ 0,85 cm): 12,05 cm. Pon el margen en 1/4 in exacto (0,64 cm) y el resultado se convierte en acabado + 7/8 in (2,2 cm), la regla que en patchwork se aprende de memoria.',
    note: 'Cortar algo generoso y recortar después gana a cortar justo. La diagonal queda al bies y crece al manipularla, así que el corte exacto tiende a quedarse corto. Recorta la unidad cosida a 11,2 cm (acabado más dos márgenes) y el bloque encajará.',
  },
  'aida-size': {
    title: 'Calculadora de punto de cruz en tela Aida',
    desc: 'Tamaño final del diseño según los puntos del gráfico y la cuenta de la tela.',
    long: 'La cuenta son puntos por pulgada. En Aida de 14, cada punto mide 2,54 ÷ 14 = 0,18 cm, así que 100 puntos de ancho son 18,1 cm (7,1 in) y 140 de alto, 25,4 cm (10 in). El mismo gráfico en tela de 18 baja a 14,1 × 19,8 cm.',
    note: 'El lino y el evenweave se bordan normalmente sobre dos hilos, así que mete la mitad de la cuenta: un lino de 28 sale del mismo tamaño que una Aida de 14. Si el marco ya está elegido, cambiar la cuenta de la tela ajusta el diseño mucho mejor que redibujar el gráfico.',
  },
  'aida-fabric': {
    title: 'Tela para punto de cruz',
    desc: 'Medidas de corte de la tela a partir del tamaño del diseño y el margen.',
    long: 'La tela se corta con un margen alrededor del diseño. Con 8 cm por lado, un diseño de 18 × 25 cm pide 34 × 41 cm. Ese margen es lo que se dobla hacia atrás al enmarcar, así que recortarlo para ahorrar tela deja el bastidor sin nada que abrazar.',
    note: 'Deja 7,5 cm (3 in) por lado para enmarcar y nunca menos de 5 cm. Bordar en aro pide todavía más, porque la tela tiene que sobrar del aro. La Aida se deshilacha enseguida por el borde cortado: pásale un zigzag o cinta en cuanto la cortes.',
  },
  'floss-length': {
    title: 'Calculadora de hilo de bordar',
    desc: 'Hilo necesario según el número de puntadas, las hebras y la cuenta de la tela.',
    long: 'En tela de 14, cada punto ocupa un cuadrado de 0,18 cm y una cruz son dos diagonales suyas: 0,51 cm. Pasar por el revés y asegurar los principios y los finales se come más o menos otro tanto, así que cuenta unos 1,03 cm por puntada y por hebra. Dos hebras en 1.000 puntadas salen 20,5 m.',
    note: 'Una madeja de DMC son seis hebras de 8 m, o 48 m de hebra suelta, que cubren unas 2.300 puntadas a dos hebras. Los saltos largos por detrás y los cambios de color frecuentes lo consumen mucho más rápido, así que deja margen para un color repartido por todo el gráfico.',
  },

  /* ───────── Velas ───────── */
  'wax-weight': {
    title: 'Calculadora de cera para velas',
    desc: 'Convierte el volumen del recipiente en los gramos de cera a fundir.',
    long: 'Llena el vaso de agua y pésalo: eso te da el volumen en mililitros. La cera pesa menos que el agua, así que el mismo volumen pide menos gramos — la soja ronda 0,9 g/cm³.',
    note: 'No lo llenes hasta el borde. Dejar libre la décima parte de arriba da sitio a la mecha y al aroma, y la soja suele hundirse al enfriar, así que un segundo vertido de repaso es normal.',
  },
  'wax-multi': {
    title: 'Cera para un lote de velas',
    desc: 'Suma la cera de una tirada de recipientes iguales.',
    long: 'Toma los gramos que pide un recipiente y multiplica por el número de velas. La cifra da por hecho que llenas nueve décimos del recipiente.',
    note: 'Funde un 5 % de más. Siempre queda cera pegada en la jarra, y quedarte corto en la última vela obliga a fundir un lote entero solo por ella.',
  },
  'fragrance-load': {
    title: 'Calculadora de fragancia para velas',
    desc: 'Pasa del peso de la cera y el porcentaje de fragancia a los gramos de aceite.',
    long: 'El porcentaje de fragancia se mide sobre la cera, no sobre la vela acabada. El 8 % de 500 g son 40 g de aceite, y el lote queda en 540 g. Cada cera tiene un techo de lo que puede retener; por encima, el aceite se queda en la superficie en vez de integrarse.',
    note: 'Pesa la fragancia en vez de medirla en mililitros: su densidad no es la del agua, así que el volumen te desvía varios puntos. Sigue la temperatura de añadido que indica la cera, no la del aceite.',
  },
  'fragrance-percent': {
    title: 'Porcentaje real de fragancia',
    desc: 'Calcula hacia atrás el porcentaje real a partir del aceite que echaste.',
    long: 'Sirve para anotar una receta, o después de vaciar el final de un frasco y querer saber en qué porcentaje quedó. Algunos proveedores lo cuentan sobre el lote entero, así que el mismo número puede significar cantidades distintas: aquí se cuenta sobre la cera.',
    note: 'Pasarse del máximo que indica la cera deja el aceite sudando en la superficie o tapa la mecha. Subir el porcentaje casi nunca es la solución para una vela que huele poco.',
  },
  'candle-burn-time': {
    title: 'Calculadora de duración de una vela',
    desc: 'Estima las horas de quemado con el peso de la cera y el consumo por hora.',
    long: 'Enciéndela una vez y pésala antes y después: eso da los gramos por hora. Dividir la cera entre esa cifra da las horas que quedan. El grosor de la mecha fija el consumo, así que la misma cera con una mecha más gruesa se gasta antes.',
    note: 'No pases de unas cuatro horas por encendido. Más allá, la cera se recalienta y se acumula carbón en la mecha. La primera vez conviene dejarla hasta que toda la superficie se haya fundido.',
  },
  'container-volume': {
    title: 'Volumen de un recipiente para velas',
    desc: 'Volumen útil y cera necesaria a partir del diámetro y la altura del recipiente.',
    long: 'Un vaso de paredes rectas solo necesita su diámetro interior y su altura. Llenarlo de agua sigue siendo lo más exacto, pero así puedes calcularlo antes de que lleguen los recipientes.',
    note: 'Un vaso que se estrecha abajo cabe menos que esto. En un recipiente cuadrado, usar el lado como diámetro exagera el volumen: ese compruébalo con agua.',
  },
  'melt-pour-batch': {
    title: 'Base de jabón o cera para moldes',
    desc: 'Cuánta base fundir para una tanda de moldes.',
    long: 'Las bases de fundir y verter suelen pesar algo más que el agua, así que el valor por defecto está en 1,05. Se añade un 5 % por lo que se queda en la jarra y en el cazo.',
    note: 'La base que sobra se vuelve a fundir, así que pasarse no cuesta nada. Quedarse corto deja el último molde a medias, y eso sí cuesta.',
  },
  'wax-cost-per-candle': {
    title: 'Coste de materiales por vela',
    desc: 'Suma el precio de la cera y los consumibles en un coste de materiales por vela.',
    long: 'La cera se compra por kilo y se usa por gramo. A 9.000 el kilo, una vela de 180 g lleva 1.620 de cera. Mete el recipiente, la mecha, la fragancia y la etiqueta en el campo de consumibles.',
    note: 'Los materiales son solo una parte del coste. Si vendes, recuerda que esta cifra deja fuera las velas fallidas, el embalaje, el envío y las comisiones de la plataforma.',
  },

  /* ───────── Jabón y resina ───────── */
  'lye-naoh': {
    title: 'Calculadora de sosa cáustica (NaOH)',
    desc: 'Convierte el peso del aceite y su índice de saponificación en la sosa que necesita.',
    long: 'Los índices SAP se publican en miligramos de hidróxido de potasio por gramo de aceite, así que usarlos para NaOH implica dividir entre 1402,5: la razón molar entre el KOH (56,1) y el NaOH (40,0), ya pasada de miligramos a gramos. El aceite de oliva tiene un SAP de 190, así que 500 g con un 5 % de sobregrasa piden 64 g de sosa. El valor pertenece al aceite, no al jabón en general: esta herramienta toma un aceite a la vez, y una receta de varios aceites se calcula aceite por aceite y luego se suma la sosa. El agua se muestra al lado, al doble de la sosa, como punto de partida.',
    note: 'La sosa va sobre el agua, nunca el agua sobre la sosa: al revés puede hervir y salpicar en segundos. Ponte gafas de protección y guantes, y mezcla en acero inoxidable o HDPE, nunca en aluminio, que la sosa ataca y convierte en hidrógeno. La disolución se calienta sola hasta 80–90 °C al contacto, así que nada de cristal ni de plástico fino. Poca sosa deja una pastilla blanda que nunca endurece; demasiada deja una pastilla cáustica.',
  },
  'lye-koh': {
    title: 'Calculadora de potasa cáustica (KOH)',
    desc: 'Calcula el hidróxido de potasio para jabón líquido, con la pureza incluida.',
    long: 'Los índices SAP ya vienen en KOH, así que aquí no hay 1402,5: solo el 1000 que pasa los miligramos a gramos. Las escamas de KOH cogen humedad del aire y se venden normalmente al 90 % de pureza, así que la necesidad pura hay que dividirla entre esa pureza para saber lo que pones de verdad en la balanza. Con 500 g de aceite de SAP 190, un 3 % de sobregrasa y un 90 % de pureza salen 102 g. El SAP sigue perteneciendo al aceite: las mezclas se calculan aceite por aceite y se suman.',
    note: 'Aquí también la potasa va sobre el agua; al revés hierve y salpica. Gafas, guantes y un recipiente de acero inoxidable o HDPE; el aluminio lo ataca el álcali. El KOH calienta más que el NaOH, así que el pico de temperatura es más alto. El jabón líquido mantiene la sobregrasa baja, entre 0 y 3 %, porque el aceite sin saponificar no se disuelve y enturbia el jabón. Si falta álcali flota aceite libre; si sobra, el pH se va por encima de lo usable.',
  },
  'water-lye-ratio': {
    title: 'Proporción de agua y sosa cáustica',
    desc: 'Pasa del peso de la sosa y la proporción agua : sosa al agua y a la concentración.',
    long: 'El agua solo lleva la sosa hasta los aceites: no participa en la saponificación y se marcha mientras la pastilla cura. Por eso lo que importa es la concentración de la disolución: 2 : 1 es una disolución al 33 % y 1,5 : 1 al 40 %. Sesenta y cinco gramos de sosa a 2 : 1 piden 130 g de agua, y con 500 g de aceite la masa llega a 695 g.',
    note: 'Más agua da una masa más fluida y fácil de dibujar, pero tarda más en desmoldarse y encoge más al curar. Una disolución más concentrada calienta más, así que empieza con agua fría. Si sustituyes parte del agua por hielo, el hielo sigue contando dentro del peso del agua.',
  },
  'soap-batch-scale': {
    title: 'Escalar una receta de jabón',
    desc: 'Multiplica el aceite, la sosa y el agua de una receta para un lote mayor o menor.',
    long: 'En una receta de jabón todo se mueve junto: 1,5 veces el aceite son 1,5 veces la sosa y 1,5 veces el agua. El volumen del molde es la forma fácil de elegir el factor: pasar de un molde de 1.200 mL a uno de 1.800 mL es 1,5×. Una receta de 500 g de aceite, 65 g de sosa y 130 g de agua escalada por 1,5 queda en 750 g, 97,5 g y 195 g.',
    note: 'No recalcules la sosa desde cero, solo escálala: el SAP no ha cambiado mientras los aceites son los mismos. Lo que sí cambia es el comportamiento: un lote grande retiene el calor más tiempo y espesa antes, y los colores o las fragancias fuertes lo aceleran todavía más. Si cambias un aceite, hay que rehacer el SAP y no la escala.',
  },
  'resin-volume': {
    title: 'Calculadora de resina epoxi',
    desc: 'Gramos de resina a mezclar según las medidas del molde rectangular y la densidad.',
    long: 'Un molde rectangular es ancho × fondo × alto, y un centímetro cúbico es un mililitro. La resina pesa algo más que el agua (el epoxi ronda 1,1 g/cm³), así que un molde de posavasos de 10 × 10 × 2 cm son 200 mL y 220 g. Para un molde redondo, eleva al cuadrado la mitad del diámetro, multiplica por π y luego por la profundidad. En los dos casos, mide por dentro.',
    note: 'Mezcla un 5–10 % más de lo que sale. En el vaso y en la paleta se queda más de lo que crees, y quedarte corto a mitad de vertido deja una línea visible donde el segundo lote se encontró con el primero. Cada resina tiene además una profundidad máxima por capa, normalmente 5–10 mm: un molde hondo se vierte por capas, así que divide este peso entre el número de capas.',
  },
  'resin-mix': {
    title: 'Proporción de mezcla de la resina',
    desc: 'Reparte el peso total de resina entre la parte A y la parte B.',
    long: 'Una resina 2 : 1 divide el total en tres partes, dos de resina y una de endurecedor, así que 220 g son 146,7 g de A y 73,3 g de B. La proporción de aquí es en peso. Los productos imprimen las dos, un 2 : 1 en volumen junto a un 100 : 45 en peso, así que mira la de peso cuando trabajes con balanza.',
    note: 'Una resina fuera de proporción no cura. Más endurecedor no la deja más dura: se queda pegajosa, o el calor se concentra y se agrieta. Usa una balanza que lea 0,1 g y, para coladas pequeñas de menos de 20 g, mezcla algo de más y vierte de ahí, porque el error pesa más que la resina. Trasvasar a un segundo vaso desplaza la proporción en lo que se quedó en el primero.',
  },
  'resin-pigment': {
    title: 'Calculadora de pigmento para resina',
    desc: 'Pasa del peso de la resina y el porcentaje de pigmento a los gramos de color.',
    long: 'El pigmento se cuenta sobre el total ya mezclado, resina más endurecedor. El 3 % de 220 g son 6,6 g. La mica tiñe de sobra al 1–3 % y los colorantes líquidos colorean con unas gotas, en torno al 0,5 %: quédate por debajo de ese 0,5 % si quieres que la pieza siga siendo translúcida.',
    note: 'Demasiado pigmento impide el curado. El techo práctico está cerca del 6 % del total; por encima, el color interfiere en la reacción y la superficie se queda pegajosa. Añade el color después de unir A y B por completo: si tiñes antes, no puedes ver si las dos partes se mezclaron de verdad. Los colores con agua, como la acuarela o el acrílico, enturbian la resina y retrasan el curado.',
  },
  'silicone-mould': {
    title: 'Calculadora de silicona para moldes',
    desc: 'Resta el modelo a la caja para saber la silicona que necesitas.',
    long: 'La silicona es todo lo que el modelo no ocupa. La forma más fiable de medir el modelo es por desplazamiento: échalo en un vaso lleno de agua y mide lo que se derrama. Una caja de 500 mL alrededor de un modelo de 120 mL pide 380 mL de silicona, que a una densidad de 1,15 son 437 g. Mide la caja por dentro: ancho × fondo × alto en centímetros son mililitros.',
    note: 'Deja al menos un centímetro de silicona entre el modelo y las paredes. Con paredes finas el molde se abre y la resina se sale, y se rompe a las pocas coladas. La silicona también se mezcla A : B, así que pasa este peso por la calculadora de proporción y añade un 5 % por lo que se queda en el vaso: una colada de silicona interrumpida se parte por la junta.',
  },

  /* ───────── Abalorios y envoltura ───────── */
  'bead-count': {
    title: 'Calculadora de abalorios por hilo',
    desc: 'Cuántos abalorios llenan un hilo, según su largo y el diámetro del abalorio.',
    long: 'Cada abalorio ocupa su propio diámetro a lo largo del hilo, así que el largo dividido entre el diámetro es la cuenta. Un hilo de 45 cm con abalorios de 8 mm lleva 56 y cubre 44,8 cm. Si entre ellos van separadores o nudos, mete esa separación en el campo de margen: el paso pasa a ser diámetro más separación.',
    note: 'La división redondea hacia abajo: no hay medios abalorios, y los pocos milímetros que sobran acaban junto al cierre. Resta antes 1–2 cm del largo para el cierre y los terminales. Los diámetros impresos son nominales y la piedra natural varía de pieza a pieza, así que en la práctica cuenta con uno o dos de diferencia.',
  },
  'bead-weight': {
    title: 'Calculadora de peso de abalorios',
    desc: 'Multiplica el número de abalorios por lo que pesa uno.',
    long: 'Cuando sabes lo que pesa uno, lo demás es multiplicar: un redondo de cristal de 8 mm ronda 0,6 g, así que 100 son 60 g. Un solo abalorio marca 0,0 g en una balanza de cocina, así que pesa veinte y divide entre veinte: es la manera exacta de sacar el peso por pieza. La segunda línea dice cuántos abalorios trae una bolsa de 100 g.',
    note: 'Los abalorios se venden casi siempre al peso y no por unidades, así que convertir el peso de la bolsa en piezas es la única forma de saber si cubre el diseño. El mismo 8 mm puede triplicar su peso entre cristal, acrílico y metal, así que vuelve a pesar cuando cambies de material. El peso de la bolsa incluye además el polvo y los trozos que vienen con ella.',
  },
  'wire-length-wrap': {
    title: 'Calculadora de alambre para envolver',
    desc: 'Cuánto alambre pide un número de vueltas alrededor de un mandril.',
    long: 'El alambre enrollado alrededor de un mandril o de un abalorio sigue el círculo que dibuja su propio eje, y ese círculo mide el mandril más el alambre. Cinco vueltas de alambre de 0,8 mm sobre un mandril de 8 mm gastan 138 mm. El tramo enrollado mide de alto vueltas × grosor del alambre, aquí 4 mm, que es la cifra a mirar al dimensionar una anilla de colgar.',
    note: 'Corta 2–3 cm de más en cada punta. Sin un cabo que agarrar con los alicates no puedes apretar la última vuelta, y el alambre se estira un poco al tirar. El alambre gordo, de 0,8 mm / calibre 20 en adelante, se resiste a la mano, así que las espiras reales salen más flojas que la cuenta.',
  },
  'jump-ring': {
    title: 'Calculadora de anillas',
    desc: 'Pasa del diámetro del mandril y del alambre a las anillas que salen y al alambre por anilla.',
    long: 'Una anilla es un círculo, y el diámetro de su eje es el mandril más el alambre. Un mandril de 6 mm con alambre de 1 mm gasta 22 mm por anilla, así que un metro da 45. Enrollado en espiral, el muelle mide anillas × grosor del alambre: 45 anillas son un muelle de 45 mm, y así decides la longitud del mandril si enrollas primero y cortas después.',
    note: 'El mandril dividido entre el grosor del alambre es la relación de aspecto (AR). Por debajo de 4 la anilla queda demasiado prieta para cerrarla limpia, y los patrones de chainmail especifican un AR, así que cambiar uno solo de los dos diámetros rompe el tejido. Cada corte se lleva además el grosor de la sierra, así que el resultado real es una o dos anillas menor.',
  },
  'macrame-cord': {
    title: 'Calculadora de cordón para macramé',
    desc: 'Largo de corte por cordón y total, a partir del tramo de nudos.',
    long: 'Los nudos comen cordón. El nudo plano se rige por la regla de cuatro veces el largo acabado, así que un tramo de 30 cm de nudos significa cortar cada cordón a 120 cm; ocho cordones suman 9,6 m. Un cordón doblado sobre una anilla pierde la mitad en el doblez, así que esos se cortan a ocho veces.',
    note: 'El múltiplo depende del nudo: cuatro veces para el nudo plano, seis o más para el espiral, hasta ocho en dibujos densos. El cordón grueso come más con el mismo nudo, así que atar un tramo de prueba y medirlo es la forma fiable de fijar el múltiplo. Un cordón que se queda corto no se puede empalmar a media pieza: se empieza de nuevo.',
  },
  'ribbon-length': {
    title: 'Calculadora de cinta para regalos',
    desc: 'Cinta para un envoltorio en cruz, según la caja y el margen del lazo.',
    long: 'La cinta en cruz da dos vueltas a la caja, una a lo corto y otra a lo largo, y en cada vuelta la altura se cuenta dos veces. Una caja de 20 × 15 × 8 cm gasta 102 cm en las dos vueltas, más 30 cm para el lazo: 132 cm.',
    note: 'Lo que decide la respuesta es el margen del lazo: uno atado a mano pide 25–35 cm y uno decorativo grande pasa de 60 cm. La cinta estrecha hace un lazo más pequeño y necesita menos. El satén se deshilacha por el corte, así que deja un centímetro para recortarlo en diagonal.',
  },
  'giftwrap-size': {
    title: 'Calculadora de papel de regalo',
    desc: 'La hoja de papel que pide una caja, con el solape incluido.',
    long: 'Una dirección tiene que dar la vuelta completa a la caja, así que es (ancho + alto) × 2 más el solape: 59 cm para una sección de 20 × 8 cm. La otra es el fondo más lo necesario para doblar en cada extremo, unas tres cuartas partes de la altura por lado, o sea fondo más 1,5 × altura: 30 cm. Esos dos números son la hoja a cortar.',
    note: 'El papel de regalo viene en rollos de ancho fijo, normalmente cerca de 70 cm. Si la medida menor pasa del ancho del rollo, hay que girar la caja o unir dos hojas. Los estampados con dirección no se pueden girar, así que mira el ancho del rollo antes de comprar. Cortar al milímetro queda peor que dejar 2 cm para doblar por dentro.',
  },
  'clay-weight': {
    title: 'Calculadora de arcilla polimérica',
    desc: 'Convierte un volumen y una densidad de arcilla en la arcilla a comprar.',
    long: 'La arcilla se modela por volumen y se vende por peso. La polimérica ronda 1,7 g/cm³, así que una pieza de 60 cm³ pide 102 g, dos de los bloques estándar de 57 g. La de secado al aire es más ligera, 1,2–1,5, así que el mismo volumen pesa menos, pero pierde agua al secar y encoge más de un 10 %, y eso hay que preverlo.',
    note: 'Rellenar el interior con papel de aluminio baja el peso de arcilla a menos de la mitad, y la polimérica gruesa no cura igual por dentro, así que se agrieta al enfriar. Las piezas grandes llevan alma para evitar la grieta, no solo para ahorrar arcilla. El peso del bloque cambia según la marca: Fimo 57 g, Fimo Professional 85 g.',
  },

  /* ───────── Punto: largo, talla y color ───────── */
  'row-gauge-length': {
    title: 'Calculadora de vueltas a tejer',
    desc: 'Pasa de tu muestra de vueltas y del largo que quieres a las vueltas que hay que tejer.',
    long: '28 vueltas en 10 cm son 2,8 por centímetro, así que 60 cm son 168 vueltas — justo 21 repeticiones de un dibujo de 8 vueltas. Pide 63 cm y salen 176,4; las vueltas no se parten, así que quedan 176 y miden 62,9 cm. El milímetro no se ve, pero la repetición rota sí.',
    note: 'La muestra de vueltas se desvía más que la de puntos. El punto jersey y la alpaca crecen a lo largo con su propio peso, así que cuelga la muestra bloqueada antes de medirla: eso se parece mucho más a lo que hará la prenda.',
  },
  'yarn-substitute': {
    title: 'Calculadora de sustitución de lana',
    desc: 'Cuántos ovillos de otra lana pide un patrón cuando cambias de hilo.',
    long: 'Al cambiar de lana lo que se iguala son los metros, no los gramos. Un patrón que pide ocho ovillos de 50 g de una lana de 400 m por 100 g quiere 1.600 m. Una lana sustituta de 320 m por 100 g solo lleva 160 m por ovillo, así que necesitas diez: con los mismos ocho te faltan 320 m.',
    note: 'Igualar los metros no iguala el grosor. Dos lanas con los mismos metros por 100 g caen y estiran de forma distinta si una es alpaca y la otra algodón, así que teje una muestra con la lana nueva antes de comprometerte. Si el ovillo pesa otra cosa, divide los metros totales de arriba entre lo que diga esa faja.',
  },
  'sweater-ease': {
    title: 'Calculadora de holgura del suéter',
    desc: 'Perímetro final y puntos a montar a partir del contorno de pecho y la holgura.',
    long: 'La talla de una prenda es la medida del cuerpo más la holgura, no la medida del cuerpo. Sumar un 8 % a un pecho de 96 cm da un perímetro final de 103,7 cm, que son 228 puntos a 22 puntos por 10 cm. Pon la holgura en −5 % y salen 91,2 cm, muy ajustado: el tejido de punto estira, así que la holgura negativa es una opción real.',
    note: 'La tabla de tallas de un patrón suele dar el pecho acabado del suéter o jersey, no el cuerpo al que va. Mezclar las dos te deja una talla entera fuera. La holgura tampoco es igual en todas las zonas: una prenda con 8 cm en el pecho rara vez quiere más de 4 cm en el brazo.',
  },
  'sock-cast-on': {
    title: 'Puntos para empezar un calcetín',
    desc: 'Puntos a montar de un calcetín a partir del perímetro del pie, la muestra y la holgura negativa.',
    long: 'Quita el 10 % de un perímetro de pie de 22 cm y tejes a 19,8 cm, que son 59,4 puntos a 30 puntos por 10 cm. Redondea a 60, múltiplo de cuatro. El cuatro importa dos veces: un elástico 2×2 se repite cada cuatro puntos, y el empeine y la planta tienen que partirse exactamente por la mitad, 30 y 30, para que el talón y las cuñas salgan simétricos.',
    note: 'En un calcetín la holgura negativa no es opcional. Tejido al perímetro medido, se afloja al usarlo, hace pliegues bajo el pie y se escurre del talón. Mide también la muestra en redondo: la misma lana y las mismas agujas dan otra cuenta tejidas en plano.',
  },
  'stripe-repeat': {
    title: 'Calculadora de repetición de rayas',
    desc: 'Cuántas repeticiones completas de raya caben y cuántas vueltas sobran.',
    long: '160 vueltas con una repetición de 12 dan 13 repeticiones (156 vueltas) y sobran 4. Lo que importa es dónde van esas 4. Repartidas de a poco, una raya acaba visiblemente más gorda que las demás. Puestas todas donde ya hay algo que interrumpe — justo encima del elástico del bajo, o debajo de la manga — nadie las encuentra.',
    note: 'Un número impar de vueltas por repetición hace que en dos colores la raya empiece cada vez por el extremo contrario, y eso obliga a cortar la lana. Con la repetición par puedes subir el color que descansa por el lateral, y así se reducen a la mitad los cabos que hay que remeter.',
  },
  'colorwork-yardage': {
    title: 'Calculadora de lana por color en jacquard',
    desc: 'Reparte el total de lana en gramos de cada color.',
    long: 'Una prenda que se come 400 g con un 70 % de color principal se reparte en 280 g y 120 g. El porcentaje sale del gráfico: cuenta los cuadros de cada color en una repetición y esa es la proporción mientras el dibujo dure. El cuerpo liso y los elásticos van enteros al color principal.',
    note: 'El color minoritario casi nunca cae en la cifra del gráfico. Las hebras que pasan por el revés gastan más largo que los puntos de la cara, y la lana que llevas como dominante hace puntos algo mayores y rinde menos. Compra un ovillo extra del contraste: igualar un lote de tinte agotado es la falta más difícil de arreglar.',
  },
  'yarn-per-row': {
    title: 'Calculadora de lana por vuelta',
    desc: 'Metros que se come una vuelta, y cuántas vueltas más aguanta lo que te queda.',
    long: 'Una faja de 200 m por 50 g son 4 m por gramo. Si una muestra de 12 g te llevó 40 vueltas, entraron 48 m en 40 vueltas, así que una vuelta son 1,2 m. Los 60 g que te quedan son 240 m, que dan para 200 vueltas más. Lo más exacto es pesar la labor, tejer diez vueltas y volver a pesarla: entonces los puntos por vuelta ya son los de verdad.',
    note: 'Los metros por vuelta crecen con los puntos de esa vuelta. Llevar 1,2 m de una muestra de 40 puntos a un cuerpo de 200 puntos se queda cinco veces corto: multiplica por la razón entre las dos cuentas. El montaje, las costuras y los remates no están en esta cifra.',
  },
  'blanket-size': {
    title: 'Calculadora de tamaño de manta',
    desc: 'Medidas de la manta y puntos a montar a partir del colchón y la caída.',
    long: 'Una manta acaba en la medida del colchón más la caída por los lados, no en la del colchón. El ancho lleva la caída dos veces, una por lado; el largo, una sola, a los pies, porque el borde de arriba se queda delante de las almohadas. En una cama de 150 × 200 cm con 25 cm de caída son 200 × 225 cm, y a 16 puntos por 10 cm el montaje es de 320 puntos.',
    note: 'Sostener 200 cm de puntos pide una aguja circular de 100 cm o más, y en cuanto la pieza pasa del kilo se alarga con su propio peso: mide la muestra pensando en ese peso. Las mantas de bebé salen en cambio de las medidas de la cuna o de la silla del coche, y ahí no debe haber caída que cuelgue de nada.',
  },

  /* ───────── Costura: dobleces, pliegues y accesorios ───────── */
  'zipper-length': {
    title: 'Calculadora de largo de cremallera',
    desc: 'Qué medida de cremallera comprar para una abertura, redondeada a una que exista.',
    long: 'Una abertura de 22 cm más 2 cm de margen arriba y abajo pide 24 cm, y nadie vende una cremallera de 24 cm. Las medidas de tienda saltan 10 · 12 · 15 · 18 · 20 · 23 · 25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 70 · 80 · 90 cm, así que compras la de 25. Donde se venden en pulgadas, los pasos son 4 · 5 · 7 · 9 · 12 · 14 · 16 · 18 · 20 · 22 · 24 in.',
    note: 'El largo indicado mide el tramo de dientes que recorre el carro, no la cinta, que sigue más allá por los dos extremos. Comprar larga y acortarla solo funciona en las de espiral: si le cortas los dientes a una de metal o de vislón, el carro se sale, y una separable no se puede tocar por abajo. En buena parte de América esta pieza es el cierre o el zíper.',
  },
  'buttonhole-spacing': {
    title: 'Calculadora de separación de ojales',
    desc: 'Separación regular entre ojales a lo largo de una tapeta.',
    long: 'En una tapeta de 60 cm con 2 cm libres en cada extremo, los ojales ocupan 56 cm. Seis botones dividen eso entre cinco, no entre seis: el primero y el último están en los extremos del tramo, así que solo hay cinco huecos entre ellos. Eso da 56 ÷ 5 = 11,2 cm. Divide entre seis y salen 9,3 cm, con el último ojal a medio camino del final.',
    note: 'En una blusa, coloca primero un ojal a la altura del punto más saliente del pecho y reparte los demás desde ahí: repartir por igual deja ese punto entre dos ojales, que es justo donde el delantero se abre. El ojal en sí sigue midiendo el diámetro del botón más su grosor.',
  },
  'pleat-fabric': {
    title: 'Calculadora de tela para pliegues y tablas',
    desc: 'Tela necesaria para un panel plisado, a partir del ancho acabado y los pliegues.',
    long: 'Esta cuenta trabaja con tablas, los pliegues planos que van todos hacia el mismo lado. Una tabla se come tres veces su profundidad, pero una de esas tres es la cara que se ve, que ya está contada en el ancho acabado: lo que hay que añadir son dos veces la profundidad por pliegue. Un panel acabado de 50 cm con diez pliegues de 4 cm se corta a 50 + 10 × 8 = 130 cm. Júntalos hasta que la cara visible mida lo mismo que la profundidad y caben 12,5 pliegues, con la tela justo en el triple, 150 cm: de ahí viene el «las tablas piden tres veces la profundidad». El pliegue caja dobla hacia los dos lados y se come cuatro veces.',
    note: 'Los pliegues se cosen doblados dentro de la costura de la cintura, así que ahí se apilan tres capas de tela. En denim o en tweed hay que bajar la profundidad o el número antes de que la aguja pase. En una tela estampada, ajusta la profundidad a la repetición del dibujo o los pliegues lo cortarán en pedazos.',
  },
  'hem-allowance': {
    title: 'Calculadora de dobladillo',
    desc: 'Largo de corte a partir del largo acabado, el ancho del dobladillo y los dobleces.',
    long: 'El número de dobleces es el número de veces que se gasta la tela. Un doble doblez (2) sube dos veces el mismo ancho para esconder el borde cortado, así que un largo acabado de 70 cm con un dobladillo de 2 cm se corta a 70 + 2 × 2 = 74 cm. Remata el borde con la remalladora y súbelo una sola vez (1) y basta con 72 cm. A diferencia del margen de costura, el dobladillo está solo en un extremo, así que aquí nada se cuenta dos veces por el borde opuesto.',
    note: 'En un bajo curvo el sobrante no tiene dónde ir cuando el doblez es profundo: el interior frunce y ondula. Deja el bajo de una falda evasé por debajo de 1 cm, o remátalo con tira al bies. Los géneros de punto quieren lo contrario: dobladillo ancho y aguja doble o zigzag, para que la costura estire con la tela.',
  },
  'dart-intake': {
    title: 'Calculadora de pinzas',
    desc: 'Cuánto recoge cada pinza, a partir de la diferencia entre dos contornos.',
    long: 'Los 20 cm que hay entre un pecho de 96 cm y una cintura de 76 cm son lo que las pinzas tienen que tragarse. Cuatro pinzas — dos delante y dos detrás — recogen 5 cm cada una, y como la pinza se abre a los dos lados de su eje, cada lado se marca a 2,5 cm. Esos 2,5 cm son la línea que de verdad dibujas en el patrón.',
    note: 'Repartir 20 cm entre cuatro no significa cuatro pinzas iguales. El lado con más curva recoge más, así que 6 cm delante y 4 cm detrás es el reparto habitual. Pasada más o menos de 4 cm, la punta de una pinza abulta, y la solución son dos pinzas más pequeñas una al lado de la otra.',
  },
  'fabric-nap-layout': {
    title: 'Calculadora de tela con sentido del pelo',
    desc: 'Tela necesaria cuando todas las piezas tienen que ir en la misma dirección.',
    long: 'El terciopelo, la pana, los tejidos cepillados y los estampados con dirección piden todas las piezas colocadas hacia el mismo lado, o el color cambia de panel a panel. Seis piezas de 40 × 50 cm de pie sobre una tela de 110 cm caben dos a lo ancho en tres filas: 150 cm. Tumbadas siguen cabiendo dos (110 ÷ 50) en tres filas, pero cada fila mide solo 40 cm, así que bastan 120 cm — y una tela con pelo no puede reclamar esos 30 cm. La calculadora de tela necesaria da por hecho que puedes girar las piezas, y por eso pide menos.',
    note: 'El terciopelo se ve más oscuro con el pelo hacia arriba y más claro hacia abajo; cualquiera de las dos vale mientras toda la prenda vaya igual. Un estampado grande cuesta todavía más, porque cada pieza necesita hasta una repetición entera de largo extra para casar en las costuras.',
  },
  'sewing-thread-length': {
    title: 'Calculadora de hilo de coser',
    desc: 'Hilo que consume una costura, y cuántos carretes hacen falta.',
    long: 'La puntada recta enlaza el hilo de la aguja con el de la canilla dentro de la tela, así que gasta mucho más hilo que el largo de la costura. A 2,5×, una costura de 200 cm se lleva 500 cm, o 5 m. Coser más fino apenas cambia ese total, porque el doble de puntadas gasta la mitad de hilo cada una. Lo que la densidad (200 × 4 = 800 puntadas) fija de verdad es la resistencia de la costura y el número de agujeros que abres en la tela.',
    note: 'El múltiplo sube con el grosor. La tela fina con puntada recta ronda 2,5, varias capas de denim pasan de 3, y una remalladora de cuatro hilos llega a 12–18 veces el largo de la costura, porque su hilo envuelve la tela por fuera en vez de trabarse dentro. Los metros del carrete también son nominales, y los últimos suelen quedar demasiado flojos para coser.',
  },
  'sticker-sheet-yield': {
    title: 'Calculadora de etiquetas por hoja',
    desc: 'Cuántas etiquetas caben en una hoja impresa, comparando las dos orientaciones.',
    long: 'En un A4 (21 × 29,7 cm), un margen de 0,5 cm por los cuatro lados deja 20 × 28,7 cm útiles. Con etiquetas de 5 × 3 cm separadas 0,2 cm, a lo ancho salen (20 + 0,2) ÷ (5 + 0,2) = 3,88 → 3, y a lo alto (28,7 + 0,2) ÷ (3 + 0,2) = 9,03 → 9, o sea 27 etiquetas. Se suma una separación antes de dividir porque entre tres etiquetas solo hay dos huecos. Gíralas 90° y quedan 6 a lo ancho por 5 a lo alto: 30 etiquetas, tres más. Cuenta las dos orientaciones antes de montar la hoja.',
    note: 'Los márgenes reales de la impresora cambian con el modelo y son más anchos por el borde de arrastre, así que un margen de cero recorta la última fila sin avisar: haz una prueba de impresión. Si el corte lo hace una máquina de corte, deja al menos 0,2 cm de separación para el paso de la cuchilla y suma el sangrado a la medida de la etiqueta, porque la línea de corte cae un poco por fuera.',
  },

  /* ───────── Patchwork: separaciones, bordes y precortados ───────── */
  'quilt-sashing': {
    title: 'Calculadora de tiras de separación para quilt',
    desc: 'Largo total de separación y tela necesaria, según la retícula de bloques y el ancho de la tira.',
    long: 'Cuatro bloques a lo ancho por cinco a lo largo, bloques de 25 cm y tiras de 6 cm, dan un ancho acabado de 4 × 25 + 5 × 6 = 130 cm. La separación entra como dos tipos de pieza: las cortas entre bloques suman 5 filas × 5 × 25 cm = 625 cm, y las largas entre filas y arriba y abajo, 6 × 130 cm = 780 cm, o sea 1.405 cm en total. Una tela de 107 cm rinde 105 cm una vez recortado el orillo, así que 14 tiras, y 14 × 6 = 84 cm de tela a comprar.',
    note: 'El ancho que introduces es el acabado. Para que quede en 6 cm, corta a 7,2 cm: dos márgenes de 1/4 in. Todas las piezas cortas tienen que medir lo mismo, y esa medida es la de corte del bloque y no la acabada, porque el margen de costura del borde del bloque todavía está ahí.',
  },
  'quilt-border': {
    title: 'Calculadora de bordes de quilt',
    desc: 'Largo de las tiras y tela para uno o dos bordes alrededor de un quilt.',
    long: 'En un quilt de 150 × 200 cm, un borde de 6 cm pide dos tiras laterales de 200 cm y dos de arriba y abajo de 150 + 12 = 162 cm, porque los lados ya están puestos: 724 cm juntas. Un segundo borde de 10 cm rodea el centro ya crecido de 162 × 212 cm, con lados de 212 y tiras de 182 arriba y abajo, otros 788 cm, para un total de 1.512 cm. El quilt acaba en 182 × 232 cm.',
    note: 'Si cortas el borde exterior con la medida sin el borde interior, te falta el ancho de ese borde en cada esquina. Aquí se cuenta en el orden lados primero; si pones antes arriba y abajo, intercambia el ancho y el largo. La tela se calcula con el ancho acabado más dos márgenes de 1/4 in (1,2 cm): si los dos bordes son telas distintas, reparte el número de tiras entre ellas.',
  },
  'fat-quarter-yield': {
    title: 'Calculadora de fat quarter',
    desc: 'Cuántas piezas de una medida dada salen de un fat quarter.',
    long: 'Un fat quarter es una yarda partida en cuatro: 18 × 22 in, unos 50 × 55 cm. Cortando cuadrados de 4,5 in (11,4 cm) salen cuatro a lo ancho y cuatro a lo largo, o sea 16 cuadrados y 671 cm² de sobra. Cuando la pieza no es cuadrada, girarla puede dar más, así que se cuentan las dos orientaciones y se muestra la mejor.',
    note: 'Mete la medida de corte, no la acabada; con las acabadas falta el margen de costura y el resultado sale inflado. Los fat quarters se cortan a menudo torcidos en la tienda, así que cuenta con 1 cm de un borde como inservible, y si el trazado entra justo, compra otro.',
  },
  'jelly-roll-yield': {
    title: 'Calculadora de jelly roll',
    desc: 'Área útil y medida acabada de un rollo de tiras precortadas.',
    long: 'Un jelly roll son 40 tiras de 2,5 in (6,4 cm) cortadas a lo ancho de una tela de 42 in (107 cm). Al coserlas se pierde 1/4 in por cada borde largo, así que una tira acaba en 5,2 cm de ancho por 105,8 cm de largo. Unidas lado a lado, las 40 dan 208 × 105,8 cm: un área de 2,2 m².',
    note: 'Cosidas seguidas, las tiras dan un panel corto y ancho de 208 cm. Para una medida de cama, pártelo por la mitad y vuelve a unirlo (104 × 211 cm), o cose un juego de tiras largo y córtalo al través. Cuanto más estrecha la tira, más se lleva la costura: un 19 % a 6,4 cm y un 32 % a 3,8 cm (1,5 in).',
  },
  'mitred-corner': {
    title: 'Calculadora de esquinas en inglete para bordes',
    desc: 'Largo de corte de cada tira de borde a inglete y dónde cae el corte a 45°.',
    long: 'Una esquina en inglete es la que forman dos bordes al encontrarse a 45°, como un marco. Para trazar esa diagonal, la tira tiene que pasar del borde del quilt el ancho del borde por cada extremo, más 5 cm de seguridad. En un lado de 150 cm con un borde de 15 cm, corta 150 + 2 × 20 = 190 cm, marca a 20 cm de cada punta y cose solo entre las marcas. La diagonal que hay que cortar mide 15 × √2 = 21,2 cm.',
    note: 'Coser hasta las puntas de la tira hace imposible doblar la esquina. Cose solo entre las dos marcas y remata en las dos. La diagonal queda al bies y estira con la plancha, así que une primero las dos tiras a 45° y recorta el sobrante después: recortar antes no se puede deshacer.',
  },
  'floss-skeins': {
    title: 'Cuántas madejas de hilo de bordar comprar',
    desc: 'Madejas a comprar para un largo de hilo dado.',
    long: 'Una madeja son seis hebras de 8 m, que desenrolladas dan 48 m de hebra suelta. Sesenta metros de necesidad más un 10 % de margen son 66 m; entre 48 sale 1,4, que redondea a dos madejas y deja 30 m para el siguiente gráfico.',
    note: 'Mete el largo contado en hebra suelta. Bordar con dos hebras gasta el doble del largo que tiras, no ese largo. Si piensas comprar más de un color más adelante, mira el lote de tinte: el mismo número en otro lote cambia un poco, y la unión se ve en una zona rellena grande.',
  },
  'hoop-size': {
    title: 'Calculadora de tamaño del aro de bordado',
    desc: 'El aro más pequeño en el que cabe un diseño con su margen de trabajo.',
    long: 'El aro es redondo y el diseño es rectangular, así que lo que tiene que caber no es el ancho ni el alto: es la diagonal. Un diseño de 18 × 25 cm con 2 cm de margen de trabajo pasa a 22 × 29 cm, y la diagonal es √(22² + 29²) = 36,4 cm, o 14,3 in. Elegir un aro de 8 in (20 cm) porque el diseño solo mide 22 cm de ancho deja una parte fuera del anillo.',
    note: 'La tela tiene que sobrar al menos 8 cm del aro por todos los lados para que haya algo que sujetar en el tornillo. Los diseños grandes se bordan moviendo el aro en vez de comprando uno mayor, pero apretar el anillo sobre puntadas ya hechas las aplasta y deja marca: un bastidor de rodillos o de listones lo evita.',
  },
  'thread-count-convert': {
    title: 'Calculadora de cuenta de tela y tamaño del diseño',
    desc: 'Puntos por pulgada efectivos y medida final cuando bordas sobre más de un hilo.',
    long: 'La cuenta son hilos por pulgada. La Aida agrupa sus hilos de cuatro en cuatro, así que un punto cubre un bloque, pero el lino y el evenweave se bordan normalmente sobre dos hilos. Bordar una tela de 28 sobre dos hilos da 14 puntos por pulgada efectivos, así que un gráfico de 100 × 140 acaba en 18,1 × 25,4 cm: lo mismo que una Aida de 14. La escala del 200 % significa que el diseño sale el doble de grande que sobre un solo hilo.',
    note: 'Que el «28» de un patrón ya signifique 14 efectivos cambia según quien lo diseñe; cuando la medida final sale la mitad o el doble, casi siempre es esto. Bordar sobre un solo hilo, el petit point, hace puntadas diminutas que cansan la vista, y las líneas de pespunte se van torciendo en diagonal según las tira el tejido.',
  },

  /* ───────── Velas: vertidos, mezclas y precio ───────── */
  'wax-topup': {
    title: 'Calculadora del segundo vertido de cera',
    desc: 'Cera del repaso y cera total a fundir a partir de la contracción.',
    long: 'La soja se hunde alrededor de la mecha al cuajar y deja un hueco en la superficie. Un primer vertido de 180 g con un 10 % de contracción pide 18 g para rellenarlo, así que funde 198 g desde el principio. La contracción depende de la cera, del recipiente y de lo rápido que enfríe: la misma cera se comporta de otra forma en cristal y en lata.',
    note: 'Haz el repaso cuando la primera capa haya cuajado, y viértelo 5–10 °C más frío que el primero. La cera caliente vuelve a fundir la capa de abajo y esta se hunde otra vez. Recalentar el resto en el cazo se lleva la fragancia, así que es mejor apartar la parte del repaso desde el principio.',
  },
  'candle-dye-load': {
    title: 'Calculadora de colorante para velas',
    desc: 'Gramos de colorante a partir del peso de la cera y su porcentaje, con la carga total.',
    long: 'El colorante ronda el 0,1–1 % del peso de la cera. Medio por ciento de 500 g son 2,5 g: un trozo del tamaño de una uña de una pastilla de color. Añade un 8 % de fragancia y la cera lleva un 8,5 % en total, y es ese total el que hay que comparar con la carga máxima que indica el fabricante.',
    note: 'El colorante y la fragancia se pelean por la misma capacidad de la cera. Subir el color con la fragancia ya al máximo deja aceite sudando en la superficie o tapa la mecha. No uses lápices de cera ni crayones: el pigmento no se disuelve y ahoga la mecha. La cera con color aclara un tono al cuajar, así que juzga el color en frío y no fundido.',
  },
  'wax-blend': {
    title: 'Calculadora de mezcla de ceras',
    desc: 'Reparte un peso total de cera entre dos ceras en la proporción que elijas.',
    long: 'Mezclar una cera dura con una blanda ajusta las propiedades. Un kilo a 7 : 3 son 700 g de A y 300 g de B. Añadir un 10–30 % de parafina o de cera de abeja a una soja de recipiente alisa la superficie y retiene la fragancia más tiempo, pero la cera de abeja sube el punto de fusión, y eso normalmente significa subir una talla de mecha.',
    note: 'Una mezcla queda entre sus dos ceras, aunque valores como el punto de fusión no escalan en línea recta. Cuando fijes la proporción, cuela una vela, cúrala dos días y quémala: cada cambio de mezcla obliga a repetir la prueba de mecha. La soja y la parafina cuajan a ritmos distintos, así que la frontera puede quedar con escarcha o veteada.',
  },
  'layer-pour': {
    title: 'Calculadora de velas por capas',
    desc: 'Cera por capa y por vela en un vertido de varias capas.',
    long: 'Un recipiente de 200 mL lleno al 90 % contiene 180 mL, o 162 g de cera. Repartido en tres capas son 60 mL y 54 g cada una. Para capas desiguales, toma esta cifra y aplica una proporción a cada una: una capa de abajo más gruesa baja el peso visual y se ve más estable.',
    note: 'Vierte la capa siguiente cuando la de abajo haya cuajado lo justo para que el dedo no deje marca. Sobre una capa blanda los colores se corren; sobre una completamente fría las capas no se pegan y se separan al quemarse. Poner una fragancia distinta en cada capa es mala idea: al arder se calientan también las de abajo y se mezclan igual.',
  },
  'container-fill-height': {
    title: 'Altura de llenado de la cera',
    desc: 'A qué altura queda un peso de cera en un recipiente de un diámetro interior dado.',
    long: 'Dividir 180 g entre una densidad de 0,9 da 200 mL, y un diámetro interior de 7 cm tiene 38,5 cm² de base, así que la cera se queda a 5,2 cm de alto. Saber esa altura antes de verter es como compruebas que el pie de la mecha queda cubierto y que el llenado no pasa del borde de la etiqueta.',
    note: 'Los pies de mecha miden 3–6 mm; con menos cera que eso el pie queda al aire y el último calor se va al fondo de cristal. Un recipiente que se estrecha llena más alto que esto, y meter el lado en vez del diámetro en un recipiente cuadrado da un valor bajo. Pega la etiqueta por debajo de la línea de la cera: una etiqueta por encima de la superficie se despega al calentarse la vela.',
  },
  'fragrance-max': {
    title: 'Carga máxima de fragancia',
    desc: 'El techo de aceite de una cera y la holgura que deja la carga que planeas.',
    long: 'Si la cera indica un máximo del 10 %, 500 g pueden llevar 50 g de aceite. Planear un 8 % pone 40 g y deja 10 g de holgura. Esa holgura no está reservada solo para la fragancia: el colorante y cualquier otro aditivo comparten la misma cuota.',
    note: 'Una holgura negativa significa que el techo ya se ha pasado. El aceite que sobra no se integra: sale sudando de la superficie cuajada o se acumula en el fondo, y sube por la mecha dando una llama enorme. Si a carga máxima la vela sigue oliendo poco, la respuesta está en el aceite, en la temperatura de añadido o en el curado, no en el porcentaje: la soja necesita una o dos semanas para dar aroma.',
  },
  'candle-price': {
    title: 'Calculadora de precio de venta de una vela',
    desc: 'Precio de venta para el margen que buscas, y el margen real de un precio elegido.',
    long: 'El margen se mide sobre el precio de venta. Para quedarte con un 60 % sobre un coste de materiales de 4.000, el precio es 4.000 ÷ (1 − 0,6) = 10.000. Sumar un 60 % al coste da 6.400, que es un margen del 37,5 % y no del 60 %. Vender a 9.000 deja 5.000 de beneficio y un margen del 55,6 %.',
    note: 'En esta cifra solo están los materiales. Las velas fallidas, el embalaje y el relleno, el envío, las comisiones de la plataforma (a menudo un 3–10 % del precio) y las horas de fotos y etiquetas quedan todas fuera. Si además vendes al mayor, el precio mayorista tiene que ser al menos el doble de este coste de materiales para que el precio de tienda sobreviva.',
  },
  'candles-from-wax': {
    title: 'Cuántas velas salen de la cera que tienes',
    desc: 'Cuántas velas de un tamaño dado da una cantidad de cera.',
    long: 'Toma una bolsa de 5 kg, pierde un 5 % en el cazo y en la jarra y quedan 4.750 g para verter. A 180 g cada una son 26 velas y sobran 70 g. Junta esos 70 g con la siguiente tanda o viértelos como pastilla aromática: siempre sobra algo que no llega a una vela.',
    note: 'La fragancia no entra en esta cuenta. El aceite se añade por encima del peso de la cera, así que no reduce el número de velas, pero es un coste aparte. El porcentaje de pérdida depende del tamaño del lote: un 5 % es generoso para fundir 5 kg de una vez, pero fundir 500 g diez veces deja el mismo resto diez veces y pasa del 10 %.',
  },

  /* ───────── Jabón y resina: mezclas, moldes y curado ───────── */
  'multi-oil-lye': {
    title: 'Calculadora de sosa cáustica para varios aceites',
    desc: 'Suma tres aceites, cada uno con su índice SAP, y obtén la sosa que necesita la mezcla.',
    long: 'Una receta de varios aceites hay que resolverla aceite por aceite y sumar después, porque el índice SAP pertenece al aceite y no al jabón en general: saca cada valor de los datos de ese aceite, sea la ficha del proveedor o una tabla SAP estándar. Oliva 300 g (SAP 190), coco 150 g (SAP 258) y ricino 50 g (SAP 180) dan 300×190 + 150×258 + 50×180 = 104.700, que entre 1402,5 son 74,7 g de sosa, y quitando un 5 % de sobregrasa quedan 70,9 g. El SAP de la mezcla que aparece al lado, aquí 209,4, es la media ponderada: es el número que usarías si más adelante tratas esta mezcla como un solo aceite. Cambia un aceite y ese SAP se mueve, así que hay que rehacer la sosa.',
    note: 'La sosa va sobre el agua, nunca el agua sobre la sosa: al revés puede hervir y salpicar en segundos. Ponte gafas de protección y guantes, y mezcla en acero inoxidable o HDPE, nunca en aluminio, que la sosa ataca desprendiendo hidrógeno. La disolución se calienta sola hasta 80–90 °C al contacto, así que nada de cristal ni de plástico fino. Un solo peso de aceite mal escrito descuadra la sosa: poca deja una pastilla blanda que nunca endurece, demasiada deja una pastilla cáustica. Pon a cero el peso de un aceite que no uses; un SAP suelto ahí no cambia nada.',
  },
  'water-discount': {
    title: 'Calculadora de descuento de agua en jabón',
    desc: 'Recorta un porcentaje del agua completa y mira el agua resultante y la concentración de la sosa.',
    long: 'El agua no participa en la saponificación: lleva la sosa hasta los aceites y se marcha mientras la pastilla cura. Descontarla no es entonces gastar menos material, sino concentrar más la disolución. Setenta y un gramos de sosa a 2 : 1 son 142 g de agua, una disolución al 33 %. Quítale un 20 % y quedan 113,6 g de agua al 38,5 %. Una disolución más fuerte deja menos agua en la masa, así que la traza llega bastante antes: menos tiempo para dibujar, pero firmeza suficiente para desmoldar en un día, un curado más corto y menos encogimiento. Por eso el descuento encaja con las pastillas de un solo color y con las prisas, mientras que un veteado complicado quiere el descuento a cero, o incluso más agua.',
    note: 'El 50 % es el techo práctico: por encima la sosa no se disuelve entera y quedan granos que acaban dentro de la pastilla. Cuanto mayor el descuento, más alto el pico de temperatura, así que empieza con agua fría, y mantén el orden, la sosa sobre el agua, o hierve y salpica. Gafas, guantes y acero inoxidable o HDPE, nunca aluminio. Recortar el agua no cambia nunca el peso de la sosa: si la bajas junto con el agua sale una pastilla blanda que no cuaja, y si pesas sosa en el campo del agua sale una pastilla cáustica.',
  },
  'soap-mold-fill': {
    title: 'Calculadora de capacidad del molde de jabón',
    desc: 'Pasa del volumen del molde y la densidad de la masa al peso del lote, y al aceite que lleva dentro.',
    long: 'Los moldes se miden en volumen y las recetas en peso, y la densidad de la masa es lo que une las dos cosas: la masa de jabón pesa algo menos que el agua, 0,9–1,0 g/mL, y aquí el valor por defecto es 0,95. Un molde de 1.200 mL sostiene entonces unos 1.140 g de masa. Sacar el aceite de ahí pide un supuesto: que la sosa es una parte fija del peso del aceite (un 13,5 % por defecto, una cifra realista en mezclas corrientes) y que el agua es un múltiplo de la sosa (2× por defecto). La masa es entonces 1 + 0,135 + 0,27 = 1,405 veces el aceite, así que 1.140 ÷ 1,405 = 811 g de aceite, 109,5 g de sosa y 219 g de agua. La proporción real de sosa la fija tu mezcla de aceites, así que cuando la tengas cerrada, mete en ese campo su sosa ÷ aceite de la calculadora de sosa para varios aceites. Mide el molde con agua, y cuenta con que uno de silicona admita un 5 % más que la aritmética, porque las paredes se abomban con la masa.',
    note: 'No lo llenes hasta el borde. La masa sube al calentarse, y un lote que gelifica por encima cuaja formando un charco alrededor del molde: deja 1–1,5 cm libres. Verter demasiado poco es el otro extremo, y las pastillas salen bajas y se rompen al cortarlas. La densidad se mueve con la receta: los aceites duros como el coco la suben y una masa batida es mucho más ligera. Cuando hayas llenado un molde, anota su peso de masa dividido entre su volumen y usa eso: tu propia cifra gana a cualquier valor por defecto.',
  },
  'soap-cure-progress': {
    title: 'Calculadora de curado del jabón',
    desc: 'Los días desde que lo hiciste frente al curado objetivo dan el porcentaje curado y los días que faltan.',
    long: 'El curado es agua que se va, no saponificación. La reacción termina normalmente en 24–48 horas, así que a esas alturas el pan ya es jabón, pero está blando y dura poco porque el agua que mezclaste sigue dentro. En cuatro a seis semanas esa agua se evapora, la pastilla endurece y la espuma se vuelve más fina y duradera. Sobre un objetivo de 42 días, el día 14 es un 33 % con 28 días por delante. El objetivo es una marca, no una fecha límite: las pastillas siguen mejorando pasado el 100 %, y un castilla con mucho oliva se nota mejor a los dos o tres meses, y mejor aún a los seis. Para seguirlo de verdad usa la balanza: pesa una pastilla, apunta el dato y vuelve a pesarla cada pocos días; cuando el peso deje de bajar, el agua se ha ido, normalmente un 5–10 % por debajo del inicio.',
    note: 'Este porcentaje cuenta días y no sabe nada de tu habitación. En un verano húmedo el peso sigue cayendo mucho después del día 42; con aire seco de invierno termina antes. Pon las pastillas de canto, separadas, en un estante donde corra el aire: apiladas o en una caja pasan los días y el agua se queda. Envolver en film o en plástico va después del curado, no durante. Y una pastilla blanda porque faltó sosa no endurece nunca: el curado arregla la humedad, no una receta mal pesada.',
  },
  'resin-coverage': {
    title: 'Calculadora de resina por superficie',
    desc: 'Volumen y peso de resina para cubrir una superficie a un espesor dado.',
    long: 'Una capa es superficie por espesor, y la única trampa son las unidades: los centímetros cuadrados multiplicados por milímetros hay que dividirlos entre 10 para llegar a centímetros cúbicos, que son mililitros. Una bandeja de 60 × 60 cm, 3.600 cm², a 3 mm se lleva 1.080 mL, o 1.188 g a una densidad de 1,1. Las superficies grandes como una mesa casi nunca se vierten con más de unos 3 mm de golpe, así que el espesor se reparte en capas: mete el espesor de una capa y repite el vertido en vez de recalcular cada vez. La resina autonivelante se reparte sola en una superficie a nivel, pero medio grado de inclinación engorda el borde bajo y deja seco el alto, así que el nivel de burbuja importa más que la aritmética.',
    note: 'Cuenta con lo que se escurre. Una superficie sin canto — una mesa, el exterior de una bandeja — pierde resina por los lados, así que presupuesta un 10–20 % por encima de la cifra y pon cinta como dique o algo debajo para recoger. Mezcla siempre un 5–10 % de más por lo que se queda en el vaso y en la paleta. Verter todo el espesor de una vez concentra el calor y la plancha amarillea o se agrieta, así que respeta la profundidad máxima por capa del bote. Las superficies porosas como la madera desnuda se beben la primera capa: séllalas con una capa fina antes de la definitiva.',
  },
  'resin-doming': {
    title: 'Calculadora de resina para domo',
    desc: 'La resina de un vertido abombado, a partir del diámetro de la pieza y la altura del domo.',
    long: 'Un domo es un trozo de esfera y no un cilindro, así que multiplicar diámetro por altura se pasa mucho. La fórmula correcta es πh(3a² + h²)/6, con a como radio. Una base de 25 mm con un domo de 3 mm de alto contiene 750 mm³, que son 0,75 mL; diez de ellas son 7,5 mL, u 8,3 g a 1,1 g/cm³. Un domo natural ronda el 8–12 % del diámetro — 2–3 mm en una pieza de 25 mm — y forzarlo más falla, porque la tensión superficial es el supuesto que hay debajo de este cálculo. La resina forma su propia lente donde la pones, y esa altura la fijan la viscosidad y la tensión superficial, no la aritmética. Toma el resultado como «cuánta resina contiene un domo de esa altura», luego llena hasta el borde y añade gotas a ojo.',
    note: 'Los domos se escurren. Sin un labio en el borde, la resina se pasa por el canto, cuaja en la parte de atrás, y lijarla luego tarda más que volver a verter: pon cinta por debajo o usa un engaste con reborde. La resina de baja viscosidad, la de capas y no la de domos, se extiende en vez de abombarse por poca que pongas. Deja la mezcla reposar media hora antes de verter y la mayoría de las burbujas sube sola; a las que queden, pásales el soplete rozando, porque mantenerlo quieto hunde la superficie.',
  },
  'resin-cups': {
    title: 'Reparto de resina por colores',
    desc: 'Reparte el total de resina en vasos, uno por color, a partes iguales o con un color de fondo mayor.',
    long: 'Trabajar con varios colores significa repartir la resina en vasos, y el orden importa: primero se unen A y B por completo y después se divide. Doscientos veinte gramos entre tres colores son 73,3 g cada uno; dale al color de fondo un 40 % y pasan a ser 88 g más 66 g para cada uno de los otros dos. Dejar la parte del fondo en cero devuelve el reparto a partes iguales. Los repartos iguales son raros en la práctica — el fondo suele llevarse más de la mitad mientras un detalle necesita unos gramos —, así que fijar primero la parte del fondo y dividir el resto se parece más a cómo se vierten las piezas de verdad. Mezcla un vaso más de los que necesitas: cuando un color se ensucia no hay vuelta atrás, y unos gramos de resina transparente guardados son lo que lo salva.',
    note: 'Une cada vaso por completo antes de meter pigmento. Si tiñes primero no puedes ver si A y B se han casado de verdad, y un vaso mal mezclado se queda pegajoso él solo. El tiempo de repartir también sale del tiempo de trabajo: con seis vasos, el último ya está espesando, así que con muchos colores pesa en dos rondas en vez de una. Cada trasvase deja 1–2 g en la pared del vaso, así que al molde llega algo menos de lo que dicen los números. Los vasos pequeños tienen la base estrecha y bailan en la balanza: apoya el vaso, ponlo a cero y llena de uno en uno.',
  },
  'silicone-ratio': {
    title: 'Calculadora de proporción A : B de silicona',
    desc: 'Reparte un peso total de silicona entre la parte A y la parte B, en peso.',
    long: 'La proporción depende de la familia de silicona que tengas. La de curado por adición (platino) suele ser 1 : 1, así que el total se parte por la mitad; la de condensación (estaño) usa una carga pequeña de catalizador, normalmente 10 : 1 o 100 : 5, que es 20 : 1. Quinientos gramos a 10 : 1 son 454,5 g de A y 45,5 g de B, con el catalizador al 9,1 % del lote. Los mismos 500 g a 1 : 1 son 250 g de cada uno y un 50 % de catalizador: un pesado completamente distinto, y por eso partir el total por la mitad sin leer el bote es el error clásico. Estas son proporciones en peso; muchos productos imprimen también la de volumen, así que mira la de peso cuando trabajes con balanza. La cuenta es la misma que en la calculadora de mezcla de resina, pero la silicona perdona mucho menos en lotes pequeños porque el catalizador está cargado a un solo lado.',
    note: 'Cuando el lado del catalizador son solo 45 g, pasarse 1 g ya es un 2 % de error: usa una balanza que lea 0,1 g y no dosifiques nunca la parte B a ojo. Con poco catalizador el molde se queda pegajoso por dentro y no desmolda; con demasiado cuaja antes de que acabes de verter. El curado por platino es además sensible a la contaminación: la plastilina con azufre, los guantes de látex o un vaso que tuvo silicona de estaño dejan una zona que no cura nunca, así que prueba en un rincón escondido si dudas del modelo. No mezcles nunca las dos familias. Pesa también un 5 % de más: una silicona vertida en dos veces se parte por la junta.',
  },

  /* ───────── Abalorios y envío: largos, eslabones y embalaje ───────── */
  'necklace-length': {
    title: 'Calculadora de largo de collar',
    desc: 'Abalorios necesarios y hueco del cierre a partir del largo acabado y el diámetro del abalorio.',
    long: 'Los largos de collar tienen nombre: gargantilla 40 cm, princesa 45 cm, matiné 55 cm, ópera 75 cm y soga 105 cm. Una gargantilla todavía tiene que pasar el cuello, normalmente 33–35 cm, mientras que un princesa cae en la clavícula y un matiné por debajo del pecho. Elegido el objetivo, lo demás es una resta: en un collar de 45 cm el cierre y los terminales se llevan 20 mm, así que quedan 430 mm para abalorios, y con redondos de 8 mm salen 53 abalorios y 44,4 cm acabados. Sáltate la resta, divide 450 entre 8, ensarta 56 y el collar cierra en 46,8 cm, por encima del largo que querías. El alambre que aparece al lado es el objetivo más 10 cm: los cabos que vuelves a pasar por los terminales en cada extremo.',
    note: 'La cuenta redondea hacia abajo; los milímetros de sobra se juntan junto al cierre y no hay medios abalorios. Los diámetros impresos son nominales y la piedra natural varía medio milímetro por pieza, así que cuenta con uno o dos de diferencia: pon diez abalorios sobre una regla antes de ensartar y ya tienes el diámetro real. El hueco del cierre es lo que más varía: un mosquetón pequeño son 10 mm, y un cierre magnético de bola o uno con cadena de extensión pasa de 40 mm. Los collares también caen hacia delante con su propio peso y parecen algo más largos por el frente, así que en la duda quita un centímetro al objetivo.',
  },
  'bracelet-size': {
    title: 'Calculadora de talla de pulsera',
    desc: 'Suma la holgura de ajuste a la muñeca para obtener el largo del hilo y los abalorios.',
    long: 'Una pulsera no se puede hacer a la medida exacta de la muñeca, porque el hilo pasa por fuera de los abalorios y no contra la piel: cuanto más grueso el abalorio, mayor el perímetro efectivo. La holgura estándar es 1–1,5 cm en una pulsera de elástico y 1,5–2 cm en una con cierre, porque el cierre tiene que girar alrededor de la muñeca y sin holgura no se abrocha. Una muñeca de 16 cm más 1,5 cm da un hilo de 17,5 cm, que lleva 21 abalorios de 8 mm. En una pulsera con cierre, quita el largo del cierre — normalmente 10–15 mm — de los abalorios y no del hilo, así que ensartas unos dos menos. El elástico no lleva cierre, así que los abalorios llenan todo el hilo. La cifra del cordón es el hilo más 8 cm: los cabos para hacer el nudo y esconderlo.',
    note: 'El elástico falla más por rotura que por desatarse. Usa 0,8 mm o más grueso y pre-estíralo tirando de las puntas unas cuantas veces antes de ensartar, o la pulsera se afloja en unos días. Haz un nudo de cirujano dos veces, ponle una gota de pegamento y mete el nudo dentro del agujero de un abalorio. La piedra y el metal con el agujero mal pulido sierran el hilo, así que eso va mejor en una pulsera con cierre. La muñeca también se hincha medio centímetro a lo largo del día, así que para un regalo tira por la holgura generosa.',
  },
  'chain-links': {
    title: 'Calculadora de eslabones de cadena',
    desc: 'Cuántos eslabones pide un largo acabado, y el largo que dan los eslabones enteros.',
    long: 'La cadena solo se corta por un eslabón. Para llegar a 45 cm con eslabones de 7 mm, 450 ÷ 7 es 64,3, así que coges 64 eslabones, y 64 eslabones miden 44,8 cm. No hay forma de dar en 45 cm exactos: la elección está entre 44,8 cm y los 45,5 cm de 65 eslabones. Mide el eslabón poniendo la cadena a lo largo de una regla, contando diez y dividiendo entre diez: si mides uno solo, un error de 0,5 mm se multiplica por 64 y se convierte en 3 cm. Los accesorios también comen largo — un cierre más dos anillas son normalmente 15–20 mm —, así que réstalos del largo acabado antes de hacer esta cuenta. Las cadenas regulares, como la forzada o la de cordón, encajan directamente con la aritmética; en un dibujo que se repite, como la fígaro, mete el largo de una repetición completa, por ejemplo un eslabón largo más tres cortos.',
    note: 'Cuando sepas dónde cortar, importa cómo cortas: unos eslabones se abren y se vuelven a cerrar y otros hay que partirlos. La cadena soldada pide alicates de corte, y el eslabón cortado se tira, así que el largo real sale un eslabón más corto. En una cadena que va a llevar un colgante pesado, el grosor importa más que la cuenta: un eslabón fino se abre con la carga y el colgante se va. Cuando dos cadenas tienen que ser iguales, como en unos pendientes, ponlas una al lado de la otra y cuenta eslabones en vez de medir cada una con la cinta, que estira distinto cada vez.',
  },
  'earring-wire': {
    title: 'Calculadora de alambre para pendientes',
    desc: 'Alambre por pendiente y por par a partir del diámetro del aro, las vueltas y el margen del bucle.',
    long: 'Una vuelta de aro es diámetro × π. Un aro de 20 mm son 62,8 mm, así que dos vueltas superpuestas son 125,7 mm, y con 15 mm de margen para el bucle quedan 140,7 mm por pendiente y 281,3 mm el par. El margen del bucle cubre formar la anilla que cuelga del gancho y rematar la punta: un bucle simple con alicates de punta redonda se lleva 8–10 mm y uno envuelto, 20–25 mm. Las vueltas van de media en media: 1,5 vueltas dan un aro con medio solape que de frente se lee como una línea doble. Para una pieza colgante en vez de un aro, pon el ancho del colgante en el diámetro y 1 en las vueltas para una sola circunferencia. Lo importante de esta cuenta es que el par salga igual: si mides y cortas los dos pendientes por separado salen con 1–2 mm de diferencia, y eso se ve de frente. Corta el largo del par, dóblalo por la mitad y corta una sola vez.',
    note: 'Si escatimas el margen no puedes terminar la pieza. Sin un cabo que agarrar no se aprieta el bucle, y el alambre se estira un poco al tirar, así que el largo real supera la aritmética. El alambre gordo — 0,8 mm / calibre 20 en adelante — no forma un círculo limpio con la mano y hay que enrollarlo en un mandril, y entonces el aro mide mandril más grosor del alambre, más de lo calculado. Lo que pasa por la oreja del pendiente, o arete según el país, debe ser acero quirúrgico, titanio o plata fina; deja el alambre de bisutería con níquel para el cuerpo del aro. Suma un milímetro por corte para limar las puntas.',
  },
  'bubble-wrap': {
    title: 'Calculadora de plástico de burbujas',
    desc: 'Cuánto plástico de burbujas pide una caja, según sus medidas y las capas.',
    long: 'El plástico de burbujas se vende en rollo, así que la respuesta tiene que ser un largo, pero lo que fija la cantidad es la superficie exterior de la caja. Una caja de 20 × 15 × 8 cm tiene 2 × (20×15 + 20×8 + 15×8) = 1.160 cm² de superficie. Dale dos vueltas y suma un 15 % por el solape y los dobleces de las esquinas y salen 2.668 cm², que en un rollo de 50 cm son 53 cm: 0,53 m. Ese 15 % es el margen del que depende la cuenta: las puntas tienen que solaparse para que agarre la cinta, y las esquinas consumen más que la superficie plana. El número de capas lo fija el contenido: una para algo que no se rompe, tres o más para cristal, cerámica y electrónica, y una vuelta extra en esquinas y asas. Para una tirada de 100 paquetes, multiplica el largo por 100 y divide entre el largo del rollo: uno de 50 cm de ancho suele traer 50 m.',
    note: 'Si el rollo es más estrecho que la caja, la aritmética correcta no te ayuda a envolver: el rollo tiene que cubrir la cara más corta — aquí los 15 cm de fondo o los 8 cm de alto —, así que mira el ancho antes de comprar. Envuelve con las burbujas hacia dentro; mirando hacia fuera no se comprimen, se revientan, y el amortiguado desaparece. Recuerda también que el objetivo es que el contenido no se mueva dentro de la caja, así que envolver bien y dejar huecos sirve de poco. Donde el transportista cobra por peso volumétrico, engordar la caja con capas sube la factura, así que si necesitas tres capas, sube una talla de caja.',
  },
  'tissue-paper': {
    title: 'Calculadora de papel de seda',
    desc: 'Medida de la hoja de papel de seda que pide una caja, y las hojas de una tirada de envíos.',
    long: 'El papel de seda forra la caja: cubre el fondo, sube por las dos paredes y se dobla sobre el contenido por arriba. Un lado es entonces el ancho de la caja más dos veces el alto, por las dos paredes, más unos 5 cm para solapar arriba — en una caja de 20 × 15 × 8 cm eso es 20 + 16 + 5 = 41 cm, y 15 + 16 + 5 = 36 cm en la otra dirección. La hoja estándar que cubre 41 × 36 cm es la de 50 × 70 cm, la más común; partida por la mitad queda en 35 × 50 cm, que se queda algo corta para esta caja. Eso es en realidad lo que decide esta cuenta: si usar hojas enteras o cortarlas. Dos hojas por paquete es lo normal: una cruzada para envolver el artículo y otra por encima, o arrugada para rellenar huecos. Diez paquetes son 20 hojas, así que un paquete de 100 hojas cubre cinco envíos así.',
    note: 'El papel de seda de color fuerte destiñe. Con las manos húmedas o en un almacén cargado, el tinte pasa al contenido claro, así que usa papel blanco sin ácido para cualquier cosa absorbente como ropa, jabón o velas. Tampoco es amortiguación: presenta el artículo y evita que las superficies se rocen, pero no absorbe golpes, así que lo frágil lleva primero plástico de burbujas y el papel de seda encima. El papel con fibra se raja al doblarlo contra la fibra, así que dobla una hoja antes de cortar el montón. Y mide la caja por dentro: con las medidas exteriores la hoja se queda corta por el grosor de la pared.',
  },
  'ribbon-bow': {
    title: 'Calculadora de cinta para un lazo',
    desc: 'La cinta que pide el lazo en sí, según las lazadas, su largo y las colas.',
    long: 'Cada lazada sale y vuelve, así que se come el doble de su propio largo. Seis lazadas de 6 cm son 72 cm, dos colas de 12 cm suman 24 cm, y 5 cm para atar el centro lo dejan en 101 cm. El lazo acabado mide más o menos el doble del largo de la lazada — 12 cm aquí — y alrededor de un tercio del ancho de la caja queda bien. El número de lazadas fija el carácter: dos son un lazo sencillo atado a mano, seis se levantan en capas, y a partir de diez se lee como una flor pompón. Esta herramienta cubre solo el lazo. La cinta que da la vuelta a la caja es la calculadora de cinta para regalos, 2 × (ancho + alto) + 2 × (fondo + alto) en un envoltorio en cruz: suma las dos cifras si un mismo trozo de cinta envuelve y ata, o usa solo esta si haces el lazo aparte y lo pegas.',
    note: 'El ancho de la cinta decide cómo se lee el lazo. De 25 mm en adelante las lazadas se sostienen y una de 6 cm parece generosa; a 6 mm la misma lazada se cae, así que la cinta estrecha necesita más lazadas para rellenar. La cinta con alambre en el canto mantiene la forma, mientras que la lisa se aplasta en cuanto aprietas el centro y el lazo parece más pequeño de lo que dicen los números. La cinta tejida, como el satén, se deshilacha por el corte, así que recorta en diagonal o pasa la llama por la punta, y deja un centímetro para eso. Y el primer lazo que sale mal no está en la cuenta: compra un 20–30 % de más la primera vez que pruebes una forma.',
  },
  'mailer-size': {
    title: 'Calculadora de tamaño de sobre de envío',
    desc: 'Dimensiona un sobre de plástico o acolchado según el ancho, el largo y el grosor del artículo.',
    long: 'Un sobre de envío es una funda plana, así que el grosor del artículo sale del ancho. El perímetro de la funda es 2 × su ancho y el artículo necesita 2 × (ancho + grosor), lo que obliga a que el sobre mida al menos el ancho del artículo más un grosor. Suma 2 cm para meterlo y sacarlo: un artículo de 25 cm de ancho y 4 cm de grosor quiere un sobre de 31 cm. El largo funciona igual, largo del artículo más grosor más holgura, y después 4 cm para la solapa adhesiva, lo que da 40 cm — la solapa se dobla y ahí no puede quedar contenido. La respuesta es entonces «31 × 40 cm o más», y compras la medida de tienda más cercana por encima, por ejemplo 32 × 45 cm. Mide la ropa y otras cosas comprimibles con el grosor aplastado. Mira también cómo indica las medidas el proveedor: unos dan el interior y otros el exterior con la solapa incluida, y a una medida exterior hay que quitarle la solapa antes de comparar.',
    note: 'Los sobres no amortiguan. Incluso uno con burbujas solo aguanta el roce y la presión, así que cualquier cosa que se rompa va en caja. Si escatimas la holgura, el contenido sube hasta la solapa adhesiva, el cierre no pega bien y la bolsa se abre en el camino: sube una talla en vez de recortar el margen. Pasarse de grande es su propio problema: el artículo se mueve, las esquinas se golpean y el sobrante se dobla justo encima de la etiqueta, donde el escáner no la lee. Forzar un artículo grueso estira la lámina hasta que se raja por una esquina, así que a partir de unos 5 cm de grosor usa caja. El tamaño del sobre ayuda con el peso volumétrico, pero calcula el porte con las reglas de tu transportista.',
  },

  /* ───────── Ganchillo: cadeneta, motivos y aumentos ───────── */
  'crochet-chain': {
    title: 'Calculadora de cadeneta base (ganchillo)',
    desc: 'Largo de la cadeneta base a partir de tu muestra, el ancho que quieres y la cadeneta de subida.',
    long: '16 puntos en 10 cm son 1,6 por centímetro, así que una manta de 100 cm son 160 puntos. La cadeneta son esos puntos más la de subida: 3 en punto alto, 2 en medio punto alto, 1 en punto bajo, lo que aquí deja 163 cadenetas. La cadeneta de subida o sustituye al primer punto o solo gana altura, así que nunca cuenta para el ancho.',
    note: 'Una cadeneta es más pequeña que el punto que se teje dentro de ella, así que las mismas manos cadenean más apretado de lo que hacen ganchillo. Esas 163 cadenetas pueden dar la medida exacta en la regla y aun así meter el borde de abajo en cuanto entra la primera vuelta. Cadenea con un ganchillo un número mayor, o sáltate la cadeneta y usa una hilera de base (punto alto base). Si el dibujo se repite cada cierto número de puntos, redondea antes los 160 a ese múltiplo y suma la cadeneta de subida después.',
  },
  'crochet-gauge-rounds': {
    title: 'Calculadora de vueltas y rondas a ganchillo',
    desc: 'Vueltas o rondas a tejer, a partir de la muestra de puntos y de lo alto que sea el punto.',
    long: 'En ganchillo la altura la fija el propio punto. A 16 puntos por 10 cm un punto mide 0,625 cm de ancho, y un punto alto se levanta unas dos veces eso, así que una vuelta son 1,25 cm y 60 cm piden 48 vueltas. Pasa la misma lana a punto bajo (razón 1,1) y una vuelta baja a 0,69 cm: 87 vueltas, casi el doble de tiempo y de lana.',
    note: 'Las razones son aproximadas: punto bajo 1,0–1,2, medio punto alto 1,4–1,6, punto alto 1,9–2,1, punto alto doble 2,6–3,0, y todas se mueven con tu tensión. Para una prenda que tiene que quedar bien, teje diez vueltas, mide la altura y divide entre diez. Los puntos con textura —de V, motivos, garbanzos— no siguen la razón en absoluto, así que ahí mide una repetición completa. La cuenta es la misma en plano y en redondo: el resultado sale etiquetado como rondas, y en una labor plana se lee como vueltas.',
  },
  'granny-square-size': {
    title: 'Calculadora de tamaño del cuadrado de la abuela',
    desc: 'Tamaño acabado del motivo a partir de las rondas tejidas y de lo que crece cada ronda.',
    long: 'Un motivo crece hacia fuera por los cuatro lados, así que cada ronda añade al lado el doble de su propio ancho. Con una ronda que mide 2 cm, seis rondas dan un cuadrado de 24 cm. Pedir 30 cm exige ocho rondas (32 cm), porque siete se quedan en 28: no se puede tejer media ronda, así que un tamaño objetivo casi nunca cae exacto.',
    note: 'El ancho por ronda sale de la lana y del ganchillo. La primera ronda es un grupo apretado dentro del anillo central y queda más estrecha que las demás, y el número de cadenetas de cada esquina mueve cada ronda 2–3 mm. Teje tres rondas, mide un lado y divide entre seis —el doble del número de rondas, porque cada ronda hace crecer los dos extremos de ese lado—. Un lado de 12 cm significa 2 cm por ronda, y ese es el número que merece volver a esta calculadora.',
  },
  'granny-blanket-squares': {
    title: 'Calculadora de manta de cuadrados de la abuela',
    desc: 'Cuántos motivos pide una manta, y cuántos van a lo ancho y a lo largo.',
    long: 'Un motivo de 20 cm unido con una costura de 0,5 cm ocupa 20,5 cm, y como el último no lleva costura detrás, se suma una unión antes de dividir. A lo ancho de 120 cm eso es (120 + 0,5) ÷ 20,5 = 5,87 → 5 motivos; a lo largo de 150 cm son 7, o sea 35 cuadrados. Esos cinco dan un ancho acabado de 5 × 20 + 4 × 0,5 = 102 cm.',
    note: 'Los 102 cm se quedan 18 cm por debajo de los 120 cm que pediste, porque la división redondea hacia abajo. Hay que elegir: añadir una sexta columna y pasarse hasta 122,5 cm, o tejer un borde de 9 cm y cubrir la diferencia. Los motivos hechos a mano también varían, así que bloquéalos todos al mismo tamaño antes de unirlos. El ancho de la unión depende del método: con punto enano es casi cero, con cadeneta 0,5–1 cm y con punto bajo más de 1 cm.',
  },
  'amigurumi-increase': {
    title: 'Calculadora de aumentos para amigurumi (anillo mágico)',
    desc: 'Inicio en anillo mágico y rondas de aumento a partir del perímetro objetivo y la muestra.',
    long: 'El amigurumi empieza con 6 puntos bajos en un anillo mágico y añade 6 en cada ronda: 6, 12, 18, 24, siempre múltiplos del número inicial. Un perímetro de 30 cm a 25 puntos por 10 cm pide 75 puntos, que son 30 ÷ π = 9,5 cm de diámetro, y 75 ÷ 6 redondeado hacia arriba son 13 rondas de aumento. No se puede tejer media ronda, así que aterrizas en 78 puntos y el perímetro sube hasta 31,2 cm. Empieza con 8 y aumentas 8 por ronda, llegando a 80 puntos en 10 rondas con una base más plana.',
    note: 'La regla es que los aumentos por ronda sean iguales al número de puntos iniciales. Empieza con 6 y aumenta 8 por ronda y el círculo pasa de plano y ondula; aumenta solo 4 y se curva formando un cuenco en vez de quedarse abierto. La muestra de amigurumi es mucho más apretada que la de una prenda, porque el ganchillo es a propósito 1–1,5 números menor de lo que la lana pide para que no se vea el relleno. Si metes aquí la muestra impresa en la faja, te saldrá un muñeco mucho más grande de lo que querías.',
  },
  'crochet-yarn-per-stitch': {
    title: 'Calculadora de lana por punto a ganchillo',
    desc: 'La lana que se come un punto, y el total de una labor, a partir de una muestra.',
    long: 'Cada punto de ganchillo echa la lana sobre el ganchillo y la pasa por dentro, así que un punto se traga más largo que uno tejido a dos agujas. Si 200 puntos gastaron 12 m, un punto son 6 cm. Una manta de 200 puntos de ancho y 40 vueltas de alto son 8.000 puntos, así que 8.000 × 6 cm = 480 m, y con un 15 % de margen queda en 552 m. Los puntos se pueden contar directamente del patrón (puntos por vuelta × vueltas), lo que hace esto más fiable que medir el área.',
    note: 'Cambia el punto y este número cambia con él. Un punto alto se lleva casi el doble de lana que un punto bajo, pero también se levanta el doble, así que sobre la misma superficie el punto bajo apretado sigue ganando en lana total. Teje la muestra con el punto que vas a usar de verdad. Mídela cortando un largo conocido y gastándolo, o pesando la muestra y multiplicando por los metros por gramo; con una muestra de 3–4 g, los cabos del principio y del final son una parte real de ese peso.',
  },
  'hook-from-gauge': {
    title: 'Calculadora de número de ganchillo según la muestra',
    desc: 'Convierte la distancia entre tu muestra y la del patrón en un cambio de ganchillo.',
    long: 'El ancho del punto escala más o menos con el diámetro del ganchillo. Si un ganchillo de 5 mm te da 18 puntos por 10 cm y el patrón quiere 16, tus puntos son pequeños y el ganchillo tiene que crecer: 5 × 18 ÷ 16 = 5,63 mm, un cambio de 0,63 mm. Nadie vende un ganchillo de 5,63 mm, así que coges el de 5,5, que aterriza cerca de 16,4 puntos y nunca llega del todo a 16.',
    note: 'Los números de ganchillo van a saltos. Alrededor de 4 mm están a 0,25 mm, pero pasados los 7 mm suben de milímetro en milímetro, así que con lana gruesa un solo número puede mover la muestra dos o tres puntos y pasarse del objetivo. Llegados ahí, el arreglo es otra lana, otro punto u otra textura, no otro ganchillo. Tu propia tensión mueve la muestra tanto como un número de ganchillo: dos personas con el mismo ganchillo de 5 mm pueden estar a dos puntos de distancia. Teje la muestra con el punto del patrón, en el mismo sentido que la labor, y mídela después de bloquear.',
  },
  'crochet-vs-knit-yarn': {
    title: 'Calculadora de lana: ganchillo o dos agujas',
    desc: 'Cuánta lana más se lleva a ganchillo la misma superficie acabada.',
    long: 'Un patrón de dos agujas que pide 500 g, tejido al mismo tamaño a ganchillo con la cifra del 33 %, quiere 665 g: 165 g más, o sea más de tres ovillos extra de 50 g. Cada punto de ganchillo necesita más vueltas de lana para hacerse, y el tejido de ganchillo es más grueso y más denso, así que en el mismo metro cuadrado entra más lana.',
    note: 'El 33 % es la mitad del rango, y el punto decide dónde caes. El punto bajo apretado va del 40 al 50 % más, mientras que el punto alto abierto o los motivos de la abuela se paran en el 20–25 %, porque los huecos entre los grupos sustituyen lana. El ganchillo filet, que es mitad huecos, puede incluso salir por debajo de la cifra de dos agujas. Si tiene que ser exacto, teje la misma muestra de las dos maneras y pésalas. Y esta respuesta es un peso: pásalo a ovillos con los metros por 100 g de la faja, no contando ovillos directamente.',
  },
  'round-increase-even': {
    title: 'Calculadora de reparto de aumentos',
    desc: 'Dónde colocar los aumentos por igual en una ronda, y qué hacer con el resto.',
    long: 'Añadir 8 puntos a una ronda de 60: 60 ÷ 8 = 7,5, así que aumentas cada 7 puntos. Eso gasta 7 × 8 = 56 puntos y deja 4 de sobra. Esos 4 no se tiran: cuatro de los ocho huecos pasan a tener 8 puntos en vez de 7, y alternar 7, 8, 7, 8, 7, 8, 7, 8 los esconde por completo. Terminas la ronda con 68.',
    note: 'Junta el resto en un solo sitio y abulta como una costura. Redondea al otro lado —«cada 8 puntos»— y 8 × 8 = 64 te deja 4 puntos por debajo del último aumento. Tejiendo en redondo, los aumentos apilados en el mismo punto ronda tras ronda se alinean en radios visibles; si no es el aspecto que buscas, mueve el punto de partida unos cuantos puntos cada ronda. Para amigurumi, donde la cuenta está atada a múltiplos de los puntos iniciales, usa la calculadora de rondas de aumento.',
  },
  'crochet-border': {
    title: 'Calculadora de puntos para el borde a ganchillo',
    desc: 'Puntos de la primera ronda de un borde, esquinas incluidas.',
    long: 'Una manta de 100 × 120 cm tiene un perímetro de 2 × (100 + 120) = 440 cm. A 16 puntos por 10 cm son 704 puntos, más 2 en cada una de las cuatro esquinas, así que tejes 712 en la primera ronda. Deja fuera los puntos de las esquinas y el borde se mete en ellas hasta que la manta parece un pentágono: los bordes de punto bajo suelen querer 2–3 puntos por esquina y los de punto alto, dos cadenetas más un grupo de cinco puntos.',
    note: 'Los cantos de arriba y de abajo se cuentan de otra manera que los laterales. Arriba pones un punto en cada cabeza de punto, pero los lados son finales de vuelta, y ninguna muestra te dice cuántos caben ahí: aproximadamente 2 en el lado de una vuelta de punto alto y 1 en una de punto bajo. Trata esta cifra como el objetivo hacia el que corriges mientras tejes la primera ronda. Un remate con dibujo —conchas, picos— tiene que salir en un múltiplo de su repetición, así que redondea los 712 hacia arriba hasta ese múltiplo y absorbe la diferencia en las esquinas.',
  },
  'chain-to-length': {
    title: 'De cadeneta a largo real',
    desc: 'El largo que da de verdad una cadeneta base, comprobado contra la primera vuelta.',
    long: '163 cadenetas hechas a 20 cadenetas por 10 cm miden 81,5 cm. Teje la primera vuelta dentro de ellas a 16 puntos por 10 cm y esa vuelta quiere 101,9 cm: una diferencia de 20,4 cm. La cadeneta tiene que estirarse eso para que la vuelta quede plana, así que el borde de abajo acaba tenso y el tejido se ensancha a medida que crece — un trapecio, no un rectángulo.',
    note: 'Es el fallo más común del ganchillo, y medir la cadeneta con una regla no lo va a pillar nunca, porque la estiras mientras la mides. Haz veinte cadenetas, suéltalas y mídelas relajadas. Si la diferencia es grande, cadenea con un ganchillo uno o dos números mayor, o sáltate la cadeneta y usa una hilera de base (punto bajo base, punto alto base) que hace la cadeneta y la primera vuelta a la vez: la base sale entonces a la muestra de la vuelta y este cálculo deja de importar. Una diferencia negativa significa que la cadeneta va más suelta que la vuelta, y entonces el borde de abajo ondulará.',
  },
  'crochet-hook-yarn-match': {
    title: 'Calculadora de ganchillo según el grosor de la lana',
    desc: 'Rango de ganchillo y banda de muestra habitual para un número de grosor de lana.',
    long: 'Los números van del 0 (encaje) al 7 (gigante). El grosor 4 —worsted o aran— lleva un ganchillo de 5,5–6,5 mm a unos 11–14 puntos bajos por 10 cm, así que el centro de la banda son 6,0 mm y 12,5 puntos. El grosor 3 (DK) es 4,5–5,5 mm a 12–17, y el 5 (chunky) 6,5–9 mm a 8–11. El amigurumi baja a propósito 1–1,5 números de aquí para que el tejido quede lo bastante denso para tapar el relleno.',
    note: 'Esta correspondencia es una convención, no física. El número de grosor es una categoría que fijan las marcas y las asociaciones nacionales, no un rango medido, así que dos lanas etiquetadas como 4 pueden llevar 180 m y 230 m por 100 g. La muestra de la faja además suele ser de dos agujas, y el ganchillo usa un número mayor con puntos mayores sobre la misma lana. Toma el número de aquí como el ganchillo con el que haces la primera muestra. Cuando un patrón da su propia muestra, esa manda sobre esta tabla.',
  },

  /* ───────── Costura: mangas, cinturas, ojales y acabados ───────── */
  'sleeve-cap-ease': {
    title: 'Calculadora de embebido de la copa de manga',
    desc: 'Largo de la copa de manga y el embebido que hay que repartir, a partir de la sisa y un porcentaje.',
    long: 'Una copa de manga tiene que ser más larga que la sisa para cubrir la redondez del hombro. Sobre una sisa de 46 cm al 8 %, la copa mide 49,7 cm y hay que hacer desaparecer 3,7 cm sin un solo pliegue. Esos 3,7 cm no se reparten por igual: la mayoría va al tercio superior entre los piquetes de delante y de detrás, y nada a los 3–4 cm justo encima de la costura de la axila, donde la curva es casi recta y no hay dónde meterlo.',
    note: 'La tela fija el porcentaje. La lana y la franela dejan que 5 cm desaparezcan bajo la plancha, mientras que el algodón plastificado, el tafetán y la piel se arrugan pasado un centímetro, y los géneros de punto no admiten nada (0–2 %). Una manga de camisa montada plana quiere solo un 2–3 %; una chaqueta de sastre, con una hombrera detrás, se lleva un 8–12 %. Mide la sisa por la línea de costura con la cinta de canto: pasarla por dentro del margen da unos 2 cm de menos.',
  },
  'waistband-length': {
    title: 'Calculadora de largo de pretina',
    desc: 'Largo y ancho de corte de una pretina a partir de la cintura, la holgura, el solape y los márgenes.',
    long: 'Una cintura de 76 cm más 2 cm de holgura acaba en 78 cm. Añade 3 cm de solape para que se apoye el botón y 1 cm de margen en cada extremo y cortas 83 cm. El ancho va doblado en dos, así que es dos veces los 3,5 cm acabados más 1 cm de margen arriba y abajo: 9 cm. Córtalo al ancho acabado y no queda nada que doblar.',
    note: 'El solape lo fija dónde va el botón, no su diámetro: con 3 cm de solape y el botón a 1,5 cm del extremo, el botón cae en el centro delantero. Los 2 cm de holgura son lo que tu cintura gana al sentarte, así que no los dejes nunca en cero en un pantalón o una falda. Lleva entretela o la cintura se derrumba, y entretela solo los 3,5 cm acabados, no los márgenes. Una pretina de punto no es este cálculo en absoluto: se corta más corta que la cintura y se estira para ajustar.',
  },
  'curved-hem-facing': {
    title: 'Calculadora de vista para bajo curvo',
    desc: 'Largo de la tira de vista para un bajo curvo, y lo que sobra por culpa de la curva.',
    long: 'Un bajo curvo es parte de un círculo. Si ese círculo tiene 60 cm de radio y el arco del bajo son 200 cm, doblar hacia arriba una vista de 5 cm pone su canto libre en un radio de 55 cm. El largo del arco escala con el radio, así que el canto libre solo necesita 200 × 55 ÷ 60 = 183,3 cm. Aplica una tira recta de 200 cm y 16,7 cm no tienen otro sitio que ondularse por dentro. La tira en sí se corta a 202 cm, con 1 cm en cada punta para unirla.',
    note: 'Hay tres arreglos. Corta la vista con la misma curva —un donut, no una tira recta— y encaja exacta. Usa cinta al bies y puedes encoger su canto interior con la plancha a medida que avanzas, que es la vía más rápida en anchos estrechos. O haz la vista más estrecha: lo que sobra escala con el ancho, así que los 16,7 cm a 5 cm se convierten en 3,3 cm a 1 cm, y por eso los bajos de las faldas de vuelo se doblan tradicionalmente 1 cm o menos. Saca el radio del perímetro ÷ 2π en una falda circular, o ajustando un círculo contra la curva del bajo.',
  },
  'buttonhole-size': {
    title: 'Calculadora de tamaño del ojal',
    desc: 'Largo del ojal a partir del diámetro y el grosor del botón.',
    long: 'El botón pasa de canto, así que su diámetro por sí solo no cabe. Un botón de 1,5 cm con 0,3 cm de grosor pide 1,8 cm, más 0,3 cm de holgura, así que coses 2,1 cm. Olvidar el grosor es el error clásico: en un botón fino de camisa, de 0,15 cm, nadie lo nota, pero un botón de abrigo puede pasar de 0,5 cm de grosor y el ojal sale claramente pequeño. Un botón de bola se gobierna en cambio por media circunferencia: π × 1,5 ÷ 2 = 2,36 cm.',
    note: 'El prensatelas automático de ojales mide el botón de verdad, grosor incluido, así que suele aterrizar cerca de esta cifra. Pruébalo igualmente en un retal de la misma tela: la entretela y el número de capas lo mueven un par de milímetros. Un ojal horizontal debe empezar 2–3 mm pasado el centro delantero hacia el canto, porque el botón abrochado se va a ese extremo del ojal y tiene que acabar en el centro delantero. En géneros de punto, corta 2 mm más corto de lo calculado y refuerza la zona con entretela, porque la abertura estira.',
  },
  'interfacing-yardage': {
    title: 'Calculadora de entretela necesaria',
    desc: 'Cuánta entretela comprar a partir del área a entretelar y de su ancho.',
    long: 'Suma todas las piezas que llevan entretela: en una camisa son dos cuellos, dos tiras de cuello, dos puños y dos tapetas, unos 3.000 cm² (0,3 m²). En entretela de 90 cm, 3.000 ÷ 90 = 33,3 cm bastarían, pero las piezas no son rectángulos y dejan huecos, así que un 25 % por encima lo deja en 41,7 cm. Esos 8,3 cm de diferencia son lo que acaba en recortes.',
    note: 'Dividir por área siempre es algo optimista: las piezas curvas como los cuellos se cortan de cuadrados y se recortan, así que solo colocando el trazado sale la cifra real. La entretela termoadhesiva también encoge un 2–3 % bajo la plancha, y por eso pegarla en bloque —planchar una pieza de más y cortar después— es el orden más seguro. Respeta también el hilo: la entretela tiene uno, y aplicarla al través hace que el cuello se retuerza. Las entretelas de punto y de tejido plano vienen en anchos distintos, normalmente 90 cm y 112 cm, así que la misma área puede cambiar más de un 20 % en lo que compras.',
  },
  'french-seam-allowance': {
    title: 'Calculadora de margen para costura francesa',
    desc: 'El margen que pide una costura francesa, a partir de sus dos pasadas.',
    long: 'Una costura francesa se cose una vez con los derechos hacia fuera y luego se vuelve y se cose otra vez, de modo que la primera costura queda encerrada. La segunda línea se mide desde la primera costura, así que desde el canto original la costura acabada queda a la suma de las dos pasadas: 0,6 + 0,9 = 1,5 cm. Por eso el margen de 1,5 cm impreso en la mayoría de los patrones se convierte directamente en una costura francesa. Después de la primera pasada recortas el margen a 0,6 cm, lo que deja 0,3 cm de holgura dentro de la segunda pasada de 0,9 cm.',
    note: 'Recorta más ancho que la segunda pasada y los hilos cortados asoman por la costura acabada: ahí es donde casi siempre fallan las costuras francesas. Recorta demasiado estrecho y una tela fina se deshilacha hasta que la costura se suelta. Una costura francesa también tiene que doblarse a lo largo, lo que la hace incómoda en una curva como la copa de manga, y en tela gruesa apila cuatro capas en un bulto. La gasa, la batista y el chifón —ligeros y dados a deshilacharse— son su sitio.',
  },
  'zip-fly-length': {
    title: 'Calculadora de largo de cremallera para bragueta',
    desc: 'Largo de la abertura de la bragueta y la cremallera que hay que comprar, a partir del tiro delantero.',
    long: 'Quita la pretina de 3,5 cm a un tiro delantero de 26 cm y quedan 22,5 cm bajo la banda. La bragueta se lleva el 70 % de arriba de eso —15,8 cm— porque el 30 % de abajo es la curva de la entrepierna, donde una abertura no puede ir. Las medidas de tienda van 10 · 12 · 15 · 18 · 20 · 23 · 25 cm, así que la de 15 es la que hay que comprar: el pespunte se ajusta a la cremallera, así que no necesitas una coincidencia exacta.',
    note: 'Mide el tiro delantero por el centro delantero, de la costura de la cintura al punto de entrepierna, y no lo confundas con el tiro trasero, que es más largo. La parte varía según la prenda: 65–70 % en vaqueros y pantalones de tiro bajo, 55–60 % en pantalones de tiro alto, o la abertura llega por encima del ombligo. Si la cremallera es más larga que el cálculo, una de espiral se puede acortar por abajo con un tope cosido a mano, pero cortar los dientes de una metálica o de Vislon suelta el carro. Remata siempre el final de la abertura con presilla o pespunte de refuerzo: sentarse pone toda la carga en ese único punto.',
  },
  'bust-dart-rotation': {
    title: 'Calculadora de rotación de pinza de pecho',
    desc: 'El ángulo que representa una pinza, y cuánto se abre el bajo al rotarla.',
    long: 'Una pinza es un doblez de papel alrededor de su vértice, así que se puede manejar como un ángulo. Con 5 cm de recogido como cuerda y 12 cm hasta el vértice como radio, eso es 2 × asin(2,5 ÷ 12) = 24,0°. El ángulo no cambia por mucho que la muevas: cierra la pinza del costado y abre una en la cintura, o llévala al hombro o al escote, y viaja el mismo 24,0°. Con 30 cm del vértice al bajo, rotar la pinza abre el bajo 0,42 rad × 30 = 12,6 cm.',
    note: 'El mismo ángulo significa recogidos distintos a distintas longitudes: 24,0° tomados a 6 cm del vértice son solo 2,5 cm. Así que copiar «una pinza de 5 cm» a otra posición dobla el ángulo y hace que el pecho apunte como un cono. Para la punta de la pinza 1,5–2 cm antes del punto de pecho y no encima, o construyes ese cono a propósito. Pasados unos 30° una sola pinza no puede tragarse la forma: pártela en dos, una al lado de la otra, o pásala a un corte princesa. Rotar el papel de verdad es siempre más fiable que la aritmética.',
  },
  'grainline-shrink-adjust': {
    title: 'Calculadora de ajuste por encogimiento según el hilo',
    desc: 'Medidas de corte cuando el encogimiento a lo largo y a lo ancho no coinciden.',
    long: 'El encogimiento no es igual en las dos direcciones. En una tela que pierde un 5 % a lo largo (urdimbre) y un 3 % a lo ancho (trama), una pieza que tiene que acabar en 100 × 50 cm se corta a 100 ÷ 0,95 = 105,3 cm por 50 ÷ 0,97 = 51,5 cm. Eso son 5,3 cm que se van en el lavado a lo largo, y sumar un 5 % en su lugar, para 105 cm, sale algo corto. La operación correcta es dividir, no sumar.',
    note: 'La cifra a lo largo suele ser la mayor, porque el tejido y el acabado mantienen la urdimbre en tensión; el denim se reparte a menudo un 3–10 % a lo largo frente a un 1–2 % a lo ancho. Trata esto como el recurso para la tela que de verdad no puedes prelavar, como un género de punto que hay que cortar tal como sale del rollo. Lavar antes de cortar elimina la adivinanza y siempre es más exacto. Algunas telas siguen encogiendo en el segundo y el tercer lavado, así que fiarse de una sola prueba puede dejar la prenda otra vez más corta después.',
  },
  'thread-cone-yield': {
    title: 'Calculadora de rendimiento del cono de hilo',
    desc: 'Las prendas que cose un cono, y cuántos conos pide una tirada.',
    long: 'Un cono de 5.000 m a 60 m por prenda rinde 83 prendas —83,3, redondeado hacia abajo, porque no se puede vender una a medio coser—. Una tirada de 120 pide 7.200 m, así que compras dos conos y sobran 2.800 m. Saca los metros por prenda del largo de costura × el múltiplo del hilo: una camiseta, casi toda remallada, va de 60 a 120 m, mientras que una camisa, casi toda a pespunte, va de 100 a 150 m.',
    note: 'Cuando un cono no cubre la tirada, el color es la restricción real. Los baños de tinte se diferencian algo incluso bajo el mismo número, y cambiar de cono a mitad de prenda se ve como costuras que no coinciden — por eso el hilo se compra por lote y no por prenda. Una remalladora además alimenta tres o cuatro conos a la vez, así que la máquina necesita esos conos del mismo color esperando; eso no es esta respuesta multiplicada por tres, porque la cifra por prenda ya cuenta todos esos hilos. Deja fuera del plan las últimas decenas de metros de un cono: el bobinado se afloja y la tensión baila.',
  },
  'full-bust-adjustment': {
    title: 'Calculadora de ajuste de busto amplio (FBA)',
    desc: 'Cuánto abrir una pieza del patrón a partir de la diferencia entre tu pecho y el del patrón.',
    long: 'Elegir la talla por el pecho alto deja el pecho del patrón más pequeño que el tuyo. Con un contorno real de 104 cm frente a un pecho de patrón de 92 cm, la diferencia es de 12 cm. Pero un delantero cortado al doblez es la cuarta parte del cuerpo, así que lo que se abre en la pieza es 12 ÷ 4 = 3 cm, y el recogido de la pinza crece esos mismos 3 cm. Abre los 12 cm completos y la prenda sale cuatro veces más grande de lo debido.',
    note: 'El pecho del patrón tiene que ser la medida de cuerpo de la tabla de tallas y no el pecho acabado: la cifra acabada ya lleva dentro la holgura de diseño, así que usarla o borra el ajuste o deja la prenda nadando. Una diferencia negativa no es un FBA sino su contrario, un SBA, que se dobla hacia dentro por la misma cantidad. Por debajo de unos 2,5 cm la mayoría de la gente se salta el ajuste: el planchado y la holgura de uso absorben eso. En un patrón cuyo delantero son dos piezas en vez de cortarse al doblez —un corte princesa o una costura en el centro delantero— cada pieza es la mitad del delantero, así que se reparten 12 ÷ 2 = 6 cm.',
  },
  'piping-strip-width': {
    title: 'Calculadora de ancho de la tira para vivo',
    desc: 'Cuánto de ancho cortar la tira al bies para un cordón de vivo dado.',
    long: 'La tira envuelve el cordón por completo, así que lo que tiene que cubrir es la circunferencia, no el diámetro. Un cordón de 5 mm mide π × 0,5 = 1,57 cm de contorno, y con 1 cm de margen de costura a cada lado cortas una tira de 3,57 cm: muy cerca de la regla imperial de una tira de 1,5 in (3,8 cm) para cordón de 1/8 in con margen de 1/2 in. Para el largo, una costura de 200 cm más un 10 % por las uniones y las esquinas son 220 cm, y como el cordón se vende por metros compras 3 m.',
    note: 'Corta la tira al bies, a 45°. Una tira al hilo se quiebra en curvas y esquinas, y el vivo casi siempre va a algún sitio curvo. Pasar un largo de bies necesario a un cuadrado de tela es trabajo de la calculadora de tira al bies. Cuanto más gordo el cordón, más pesa la parte que lo envuelve frente al margen, así que recalcula en vez de reutilizar un ancho antiguo. Si compras vivo hecho, comprueba que su pestaña coincida con el margen de costura de tu patrón: si no, el grosor visible en la costura cambia. El cordón de algodón encoge, así que prelávalo también, no solo la tela.',
  },
};
