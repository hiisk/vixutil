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
};
