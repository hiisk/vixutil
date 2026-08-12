// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { GameTool } from './game-tools.ts';
import { GAME_TOOLS } from './game-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from './locales.ts';
import { withCard } from './og-cards/index.ts';
import { relatedBySlug } from './related-window.ts';

/**
 * 두뇌 게임(/game) 섹션의 번역 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는 문구만 갈아 끼운다.
 *
 * 타자 연습은 언어마다 재는 대상이 다르다 — 한국어는 자판을 누른 횟수(타/분),
 * 로마자 언어는 분당 단어 수(WPM), 일본어는 분당 문자 수다. 문구도 그에 맞춰 쓴다.
 *
 * "청력 검사가 아니다", "색맹 검사가 아니다" 같은 단서는 어느 언어에서도 뺀다.
 * 이 화면들은 진단이 아니라 놀이이고, 그걸 흐리면 사람을 잘못 안심시킨다.
 */
export type GameIntlLang = Exclude<AnyLocale10, 'ko'>;

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<GameIntlLang, Record<string, ToolCopy>> = {
  en: {
    reaction: {
      title: 'Reaction Time Test', desc: 'How fast can you click when it turns green', category: 'Speed',
      metaTitle: 'Reaction Time Test — Measure Your Reaction in Milliseconds',
      long: 'Click the moment the screen turns green. It takes five readings, gives you the average and your best in milliseconds, and shows where you land against typical human reaction time.',
      features: ['Average and best over five rounds', 'Clicking too early is voided', 'Compared against the human average', 'Try again for a better record'],
    },
    cps: {
      title: 'Click Speed Test', desc: 'How many clicks can you get in 10 seconds', category: 'Speed',
      metaTitle: 'Click Speed Test — Measure Your CPS (Clicks Per Second)',
      long: 'Click as fast as you can for a set time to measure clicks per second. Choose 5, 10 or 30 seconds; on a phone, tapping is measured exactly the same way.',
      features: ['5, 10 or 30 seconds', 'Clicks per second calculated', 'Best score saved', 'Time remaining shown live'],
    },
    aim: {
      title: 'Aim Trainer', desc: 'How many targets can you hit in 30 seconds', category: 'Speed',
      metaTitle: 'Aim Trainer — Mouse Accuracy and Aim Practice',
      long: 'Hit as many targets as you can before time runs out, each appearing in a random spot. It counts your misses too and works out accuracy, so it works as mouse practice rather than just a score.',
      features: ['Hits counted over 30 seconds', 'Misses counted for real accuracy', 'Choose the target size', 'Average time between hits'],
    },
    typing: {
      title: 'Typing Speed Test', desc: 'Type sentences to measure WPM and accuracy', category: 'Speed',
      metaTitle: 'Typing Speed Test — Measure WPM and Accuracy Free',
      long: 'Type the sentence you are given to measure words per minute and accuracy. Mistakes are marked as you go, and the sentence changes each round so you cannot memorise your way through it.',
      features: ['Words per minute and characters per minute', 'Accuracy per character', 'Wrong characters marked immediately', 'Several sentences back to back'],
    },
    memory: {
      title: 'Sequence Memory Game', desc: 'Repeat the order the colours light up in', category: 'Memory',
      metaTitle: 'Sequence Memory Game — Test Your Short-Term Memory',
      long: 'Colour buttons light up one at a time and you have to press them back in the same order. Every correct round adds one more step, so how far you get is a short-term memory score.',
      features: ['The sequence grows every level', 'Colours distinguish it without sound', 'Best level saved', 'Shows where you went wrong'],
    },
    'number-memory': {
      title: 'Number Memory Test', desc: 'Memorise a number that keeps getting longer', category: 'Memory',
      metaTitle: 'Number Memory Test — How Many Digits Can You Hold',
      long: 'A number appears briefly, disappears, and you type it back. Get it right and it gains a digit. Most people hold around seven digits at once, so that is where it usually starts to break down.',
      features: ['One more digit on every correct answer', 'Display time adjusts automatically', 'Best digit count saved', 'Your answer compared with the number'],
    },
    sequence: {
      title: 'Pattern Memory Game', desc: 'Remember which squares in the grid lit up', category: 'Memory',
      metaTitle: 'Pattern Memory Game — Test Visual and Spatial Memory',
      long: 'A few squares in a grid flash on and off. Remember where they were and press them. Higher levels light more squares, and the grid itself gets bigger.',
      features: ['More squares light up each level', 'Starts at 3×3 and expands', 'Best level saved', 'Wrong squares shown'],
    },
    'color-blind': {
      title: 'Colour Discrimination Test', desc: 'Find the one square that is a slightly different colour', category: 'Senses',
      metaTitle: 'Colour Discrimination Test — Spot the Subtle Difference',
      long: 'Among identical squares, exactly one is a different colour. Each level shrinks the difference until you can no longer tell — and that point is the limit of your colour discrimination.',
      features: ['The difference shrinks each level', 'Your limit level saved', 'Notes on screen brightness', 'How this differs from a colour blindness test'],
    },
    hearing: {
      title: 'Hearing Frequency Test', desc: 'Find out how high a frequency you can hear', category: 'Senses',
      metaTitle: 'Hearing Test Online — How Many Hz Can You Hear',
      long: 'Steps the frequency up bit by bit to find where you stop hearing it. The upper limit of human hearing drops with age, so the frequency you reach gives a rough sense of your ear age.',
      features: ['20Hz to 20kHz in steps', 'Your upper limit recorded', 'Compared against typical ranges by age', 'Headphones recommended'],
    },
    math: {
      title: 'Mental Maths Challenge', desc: 'How many can you solve in 30 seconds', category: 'Brain',
      metaTitle: 'Mental Maths Challenge — 30 Seconds of Arithmetic',
      long: 'Solve as many arithmetic problems as you can before the clock runs out. Pick the operations and difficulty, and it reports how many you got, your accuracy and the average time per problem.',
      features: ['Choose addition, subtraction, multiplication, division', 'Easy, normal and hard', 'Average time per problem', 'Review the ones you skipped'],
    },
    stroop: {
      title: "Stroop Test", desc: "Pick the ink colour, not the word", category: "Brain",
      metaTitle: "Stroop Test — How Fast Are You When Word and Colour Disagree",
      long: "The word \"red\" is printed in blue ink. You have to pick the colour it is printed in, not what it says — and since reading happens automatically, you have to suppress it. Counts how many you get right in 45 seconds.",
      features: ["How many you get right in 45 seconds", "Matching word-and-colour trials are mixed in", "The answer is never stuck in one position", "Keeps your best score"],
    },
    'dot-count': {
      title: "Dot Estimation Test", desc: "How many dots did you just see", category: "Senses",
      metaTitle: "Dot Estimation Test — How Well Can You Judge a Number at a Glance",
      long: "Dots flash up and vanish. Do not count them — estimate. As the levels rise there are more dots and less time, until counting one by one becomes impossible. The error is measured relative to the true number, so later levels do not become unfairly generous.",
      features: ["Dot count and display time both tighten", "Error scored relative to the true number", "Points accumulate level by level", "Keeps your best score"],
    },
    nback: {
      title: "N-Back Test", desc: "Remember what was n steps back", category: "Memory",
      metaTitle: "N-Back Test — The Standard Working Memory Task",
      long: "Squares light up one at a time. Press when the current one matches the square n steps back. You have to hold the last few in mind while constantly updating them, which is why this task is widely used to measure working memory. False presses are subtracted, so pressing everything gets you nowhere.",
      features: ["1-back, 2-back and 3-back", "About 30% of trials are matches by design", "False presses are subtracted from the score", "Hits, misses and false presses shown separately"],
    },
    rotation: {
      title: "Mental Rotation Test", desc: "Are these the same shape, just turned", category: "Brain",
      metaTitle: "Mental Rotation Test — Turning a Shape in Your Head",
      long: "Two shapes appear. Decide whether one is the other rotated. The \"different\" pairs are built by mirroring, so they have the same number of cells and look alike — you really do have to turn them in your head.",
      features: ["\"Different\" pairs built by mirroring", "More cells as the levels rise", "Symmetric shapes are filtered out so answers stay correct", "Keeps your best score"],
    },
    beat: {
      title: "Rhythm Test", desc: "Keep the beat after the sound stops", category: "Senses",
      metaTitle: "Rhythm Test — Can You Hold a Tempo Once the Metronome Stops",
      long: "Four beats play, then you tap eight more in silence at the same tempo. It scores not just your average error but how even you were — being consistently a little late is better rhythm than swinging early and late.",
      features: ["80, 100 and 120 BPM", "Scores average error and evenness together", "Nothing is deducted within 25ms", "Keeps your best score"],
    },
    peripheral: {
      title: "Peripheral Vision Test", desc: "Catch the edge while looking at the centre", category: "Speed",
      metaTitle: "Peripheral Vision Test — How Wide Do You See While Looking Straight Ahead",
      long: "Keep your eyes on the centre dot and tap the target that appears at the edge. Targets only appear inside a ring with the middle left empty, and the ring moves outward as the levels rise. Miss the time limit and it ends, so there is no chance to look around.",
      features: ["Targets never appear in the centre", "The ring moves outward as levels rise", "Targets appear evenly in all directions", "Keeps your best score"],
    },
    '2048': {
      title: "2048 Game", desc: "Slide and merge matching numbers to reach 2048", category: "Brain",
      metaTitle: "2048 Game — Play the Sliding Number Puzzle Free, No Install",
      long: "Slide the board in four directions to merge matching numbers. A tile merges only once per slide, so 4·4·4·4 becomes 8·8 rather than 16, and sliding into a wall changes nothing and spawns no tile. Reach 2048 and you can keep going, with one move of undo always available.",
      features: ["Arrow keys, WASD or swipe", "Score is the sum of the tiles you merged", "Keep playing past 2048", "One-move undo, best score saved"],
    },
    minesweeper: {
      title: "Minesweeper", desc: "Narrow the mines down from the numbers alone", category: "Brain",
      metaTitle: "Minesweeper — Play Beginner, Intermediate and Expert Boards Free",
      long: "A number is how many mines touch that square, and that is the only clue you get. Your first square is always safe and always has nothing around it, so the board opens wide and you can reason from the very first move instead of guessing. Best times are kept separately for each of the three boards.",
      features: ["Beginner 9×9, intermediate 16×16, expert 30×16", "Your first click is never a mine", "Flag button or press-and-hold on a phone", "Best time saved per difficulty", "Shows the board's 3BV (minimum clicks)"],
    },
    sudoku: {
      title: "Sudoku", desc: "Fill the 9×9 grid with the digits 1 to 9", category: "Brain",
      metaTitle: "Sudoku — Easy, Medium and Hard Puzzles With Exactly One Answer",
      long: "Fill the grid so that every row, every column and every 3×3 box holds 1 to 9 exactly once. Each puzzle is dug out of a finished grid one cell at a time, checking after every removal that a single solution remains, so no puzzle here has two answers. The difficulty comes from the technique the puzzle needs, not from how many cells are blank.",
      features: ["Easy, medium and hard, set by the technique needed", "Never a puzzle with more than one answer", "Hints that give the reason, not just the digit", "Pencil-mark notes and one-move undo", "Best time saved per difficulty"],
    },
    sliding: {
      title: "Sliding Puzzle", desc: "Slide the numbers back into order", category: "Brain",
      metaTitle: "Sliding Puzzle — Play the 15 Puzzle Free in 3×3, 4×4 and 5×5",
      long: "Slide the numbers into the empty square until they run in order from the top left. Half of all arrangements of this puzzle can never be finished no matter how you slide, so every shuffle is checked by counting inversions first — the board you are given is always solvable. It also shows the Manhattan distance left, which is a lower bound on the moves you still need.",
      features: ["3×3, 4×4 and 5×5 boards", "Unsolvable boards are never dealt", "Tap further along the row to slide several tiles at once", "Undo one move at a time", "Distance left shows how far from done you are", "Best time saved per board size"],
    },
  },

  es: {
    reaction: {
      title: 'Test de tiempo de reacción', desc: 'Cuánto tardas en hacer clic al ponerse verde', category: 'Velocidad',
      metaTitle: 'Test de tiempo de reacción — Mide tu reacción en milisegundos',
      long: 'Haz clic en el momento en que la pantalla se pone verde. Toma cinco lecturas, te da la media y tu mejor marca en milisegundos, y te sitúa frente al tiempo de reacción humano habitual.',
      features: ['Media y mejor marca en cinco rondas', 'Hacer clic antes de tiempo anula la ronda', 'Comparado con la media humana', 'Repite para mejorar tu marca'],
    },
    cps: {
      title: 'Test de velocidad de clic', desc: 'Cuántos clics logras en 10 segundos', category: 'Velocidad',
      metaTitle: 'Test de velocidad de clic — Mide tus CPS (clics por segundo)',
      long: 'Haz clic lo más rápido que puedas durante un tiempo fijo para medir los clics por segundo. Elige 5, 10 o 30 segundos; en el móvil, los toques se miden exactamente igual.',
      features: ['5, 10 o 30 segundos', 'Clics por segundo calculados', 'Se guarda tu mejor marca', 'Tiempo restante en pantalla'],
    },
    aim: {
      title: 'Entrenador de puntería', desc: 'Cuántos blancos aciertas en 30 segundos', category: 'Velocidad',
      metaTitle: 'Entrenador de puntería — Precisión de ratón y práctica de apuntado',
      long: 'Acierta tantos blancos como puedas antes de que se acabe el tiempo; cada uno aparece en un sitio al azar. También cuenta los fallos y calcula la precisión, así que sirve como práctica de ratón y no solo como marcador.',
      features: ['Aciertos contados en 30 segundos', 'Fallos contados para una precisión real', 'Elige el tamaño del blanco', 'Tiempo medio entre aciertos'],
    },
    typing: {
      title: 'Test de velocidad de escritura', desc: 'Escribe frases para medir tus PPM y tu precisión', category: 'Velocidad',
      metaTitle: 'Test de velocidad de escritura — Mide PPM y precisión gratis',
      long: 'Escribe la frase que se te da para medir palabras por minuto y precisión. Los errores se marcan sobre la marcha y la frase cambia en cada ronda, así que no puedes salir del paso memorizándola.',
      features: ['Palabras por minuto y caracteres por minuto', 'Precisión por carácter', 'Los caracteres erróneos se marcan al instante', 'Varias frases seguidas'],
    },
    memory: {
      title: 'Juego de memoria de secuencias', desc: 'Repite el orden en que se iluminan los colores', category: 'Memoria',
      metaTitle: 'Juego de memoria de secuencias — Pon a prueba tu memoria a corto plazo',
      long: 'Los botones de color se iluminan de uno en uno y tienes que pulsarlos en el mismo orden. Cada ronda acertada añade un paso más, así que lo lejos que llegas es una medida de memoria a corto plazo.',
      features: ['La secuencia crece en cada nivel', 'Los colores la distinguen sin sonido', 'Se guarda tu mejor nivel', 'Te muestra dónde te equivocaste'],
    },
    'number-memory': {
      title: 'Test de memoria numérica', desc: 'Memoriza un número que se va alargando', category: 'Memoria',
      metaTitle: 'Test de memoria numérica — Cuántos dígitos puedes retener',
      long: 'Aparece un número un instante, desaparece, y tú lo escribes. Si aciertas, gana un dígito. La mayoría retiene unos siete dígitos a la vez, y ahí es donde suele empezar a fallar.',
      features: ['Un dígito más con cada acierto', 'El tiempo en pantalla se ajusta solo', 'Se guarda tu mejor número de dígitos', 'Tu respuesta comparada con el número'],
    },
    sequence: {
      title: 'Juego de memoria de patrones', desc: 'Recuerda qué casillas de la cuadrícula se iluminaron', category: 'Memoria',
      metaTitle: 'Juego de memoria de patrones — Memoria visual y espacial',
      long: 'Unas casillas de una cuadrícula se encienden y se apagan. Recuerda dónde estaban y púlsalas. En los niveles altos se iluminan más casillas, y la cuadrícula también crece.',
      features: ['Más casillas iluminadas en cada nivel', 'Empieza en 3×3 y se amplía', 'Se guarda tu mejor nivel', 'Se muestran las casillas equivocadas'],
    },
    'color-blind': {
      title: 'Test de discriminación de color', desc: 'Encuentra la casilla de un color ligeramente distinto', category: 'Sentidos',
      metaTitle: 'Test de discriminación de color — Detecta la diferencia mínima',
      long: 'Entre casillas idénticas hay exactamente una de otro color. Cada nivel reduce la diferencia hasta que ya no la distingues — y ese punto es el límite de tu discriminación de color.',
      features: ['La diferencia se reduce en cada nivel', 'Se guarda tu nivel límite', 'Notas sobre el brillo de la pantalla', 'En qué se diferencia de un test de daltonismo'],
    },
    hearing: {
      title: 'Test de frecuencia auditiva', desc: 'Averigua hasta qué frecuencia alcanzas a oír', category: 'Sentidos',
      metaTitle: 'Test de audición online — Cuántos Hz alcanzas a oír',
      long: 'Sube la frecuencia poco a poco para encontrar dónde dejas de oírla. El límite superior de la audición humana baja con la edad, así que la frecuencia a la que llegas da una idea aproximada de la edad de tu oído.',
      features: ['De 20Hz a 20kHz por pasos', 'Se registra tu límite superior', 'Comparado con los rangos típicos por edad', 'Se recomiendan auriculares'],
    },
    math: {
      title: 'Desafío de cálculo mental', desc: 'Cuántas resuelves en 30 segundos', category: 'Cerebro',
      metaTitle: 'Desafío de cálculo mental — 30 segundos de aritmética',
      long: 'Resuelve tantas operaciones como puedas antes de que se agote el reloj. Elige las operaciones y la dificultad, y te dice cuántas acertaste, tu precisión y el tiempo medio por operación.',
      features: ['Elige suma, resta, multiplicación, división', 'Fácil, normal y difícil', 'Tiempo medio por operación', 'Repasa las que te saltaste'],
    },
    stroop: {
      title: "Test de Stroop", desc: "Elige el color de la tinta, no la palabra", category: "Cerebro",
      metaTitle: "Test de Stroop — Cuánto tardas cuando palabra y color no coinciden",
      long: "La palabra \"rojo\" está escrita en tinta azul. Tienes que elegir el color en el que está impresa, no lo que dice, y como leer ocurre solo, hay que reprimirlo. Cuenta cuántos aciertas en 45 segundos.",
      features: ["Cuántos aciertas en 45 segundos", "Se mezclan casos donde palabra y color coinciden", "La respuesta nunca queda fija en una posición", "Guarda tu mejor marca"],
    },
    'dot-count': {
      title: "Test de estimación de puntos", desc: "Cuántos puntos acabas de ver", category: "Sentidos",
      metaTitle: "Test de estimación de puntos — Qué tal juzgas una cantidad de un vistazo",
      long: "Los puntos aparecen y desaparecen. No los cuentes: estima. Al subir de nivel hay más puntos y menos tiempo, hasta que contar uno a uno resulta imposible. El error se mide en relación con la cantidad real, así que los niveles altos no se vuelven demasiado generosos.",
      features: ["El número de puntos y el tiempo se aprietan a la vez", "El error se puntúa en relación con la cantidad real", "Los puntos se acumulan nivel a nivel", "Guarda tu mejor marca"],
    },
    nback: {
      title: "Test N-back", desc: "Recuerda lo que salió n pasos atrás", category: "Memoria",
      metaTitle: "Test N-back — La tarea estándar de memoria de trabajo",
      long: "Los cuadros se encienden uno a uno. Pulsa cuando el actual coincida con el de n pasos atrás. Hay que retener los últimos mientras se actualizan sin parar, por eso esta tarea se usa tanto para medir la memoria de trabajo. Los fallos se restan, así que pulsar todo no sirve.",
      features: ["1-back, 2-back y 3-back", "Cerca del 30% son coincidencias a propósito", "Los falsos pulsados se restan de la puntuación", "Aciertos, perdidos y falsos por separado"],
    },
    rotation: {
      title: "Test de rotación mental", desc: "¿Es la misma figura, solo girada?", category: "Cerebro",
      metaTitle: "Test de rotación mental — Girar una figura en la cabeza",
      long: "Aparecen dos figuras. Decide si una es la otra girada. Los pares \"distintos\" se construyen por reflejo, así que tienen el mismo número de casillas y se parecen: hay que girarlos de verdad en la cabeza.",
      features: ["Pares \"distintos\" construidos por reflejo", "Más casillas al subir de nivel", "Las figuras simétricas se filtran para que la respuesta sea correcta", "Guarda tu mejor marca"],
    },
    beat: {
      title: "Test de ritmo", desc: "Mantén el compás cuando pare el sonido", category: "Sentidos",
      metaTitle: "Test de ritmo — ¿Aguantas el tempo cuando calla el metrónomo?",
      long: "Suenan cuatro golpes y luego tienes que dar ocho en silencio al mismo tempo. Puntúa no solo el error medio sino lo regular que fuiste: ir siempre un poco tarde es mejor ritmo que oscilar entre pronto y tarde.",
      features: ["80, 100 y 120 BPM", "Puntúa error medio y regularidad a la vez", "No se descuenta nada dentro de 25 ms", "Guarda tu mejor marca"],
    },
    peripheral: {
      title: "Test de visión periférica", desc: "Atrapa el borde mirando al centro", category: "Velocidad",
      metaTitle: "Test de visión periférica — Cuánto abarcas mirando al frente",
      long: "Mantén la vista en el punto central y toca el objetivo que aparece en el borde. Los objetivos solo salen dentro de un anillo con el centro vacío, y el anillo se aleja al subir de nivel. Si se acaba el tiempo, termina: no hay margen para mirar alrededor.",
      features: ["Los objetivos nunca salen en el centro", "El anillo se aleja al subir de nivel", "Los objetivos salen por igual en todas las direcciones", "Guarda tu mejor marca"],
    },
    '2048': {
      title: "Juego 2048", desc: "Desliza y junta los números iguales hasta llegar a 2048", category: "Cerebro",
      metaTitle: "Juego 2048 — Desliza y junta números hasta 2048, gratis",
      long: "Desliza el tablero en cuatro direcciones para juntar los números iguales. Una ficha se junta una sola vez por movimiento, así que 4·4·4·4 da 8·8 y no 16, y empujar contra la pared no cambia nada ni hace aparecer fichas. Al llegar a 2048 puedes seguir jugando, y siempre tienes un movimiento para deshacer.",
      features: ["Flechas, WASD o deslizar el dedo", "Los puntos son la suma de las fichas que juntas", "Sigue jugando después de 2048", "Deshacer un movimiento y mejor marca guardada"],
    },
    minesweeper: {
      title: "Buscaminas", desc: "Acota las minas solo con los números", category: "Cerebro",
      metaTitle: "Buscaminas — Juega gratis en principiante, intermedio y experto",
      long: "El número dice cuántas minas tocan esa casilla, y esa es la única pista que tienes. La primera casilla siempre es segura y nunca tiene minas alrededor, así que el tablero se abre en grande y puedes razonar desde la primera jugada en vez de adivinar. El mejor tiempo se guarda por separado en cada uno de los tres tableros.",
      features: ["Principiante 9×9, intermedio 16×16, experto 30×16", "Tu primer clic nunca es una mina", "Botón de bandera o pulsación larga en el móvil", "Mejor tiempo guardado por dificultad", "Muestra el 3BV del tablero (clics mínimos)"],
    },
    sudoku: {
      title: "Sudoku", desc: "Rellena la cuadrícula 9×9 con los números del 1 al 9", category: "Cerebro",
      metaTitle: "Sudoku — Puzles fáciles, medios y difíciles con una sola solución",
      long: "Rellena la cuadrícula para que cada fila, cada columna y cada caja de 3×3 tengan del 1 al 9 una sola vez. Cada puzle se vacía a partir de una cuadrícula completa, casilla a casilla, comprobando tras cada borrado que sigue quedando una única solución: aquí ningún puzle tiene dos respuestas. La dificultad viene de la técnica que hace falta, no del número de casillas vacías.",
      features: ["Fácil, medio y difícil según la técnica necesaria", "Nunca un puzle con más de una solución", "Pistas que dan el motivo, no solo el número", "Notas a lápiz y deshacer una jugada", "Mejor tiempo guardado por dificultad"],
    },
    sliding: {
      title: "Puzle deslizante", desc: "Desliza los números hasta ponerlos en orden", category: "Cerebro",
      metaTitle: "Puzle deslizante — Juega al puzle del 15 en 3×3, 4×4 y 5×5",
      long: "Desliza los números hacia el hueco hasta dejarlos en orden desde arriba a la izquierda. La mitad de las posiciones de este puzle no se pueden terminar por mucho que deslices, así que cada mezcla se comprueba contando inversiones: el tablero que recibes siempre tiene solución. También muestra la distancia de Manhattan que queda, que es una cota inferior de los movimientos que te faltan.",
      features: ["Tableros de 3×3, 4×4 y 5×5", "Nunca reparte tableros sin solución", "Toca más lejos en la fila para deslizar varias casillas de golpe", "Deshacer movimiento a movimiento", "La distancia restante indica cuánto te falta", "Mejor tiempo guardado por tamaño de tablero"],
    },
  },

  'pt-br': {
    reaction: {
      title: 'Teste de tempo de reação', desc: 'Quanto você demora para clicar quando fica verde', category: 'Velocidade',
      metaTitle: 'Teste de tempo de reação — Meça sua reação em milissegundos',
      long: 'Clique no instante em que a tela fica verde. Ele faz cinco leituras, dá a média e a sua melhor marca em milissegundos, e mostra onde você se encaixa em relação ao tempo de reação humano típico.',
      features: ['Média e melhor marca em cinco rodadas', 'Clicar antes da hora anula a rodada', 'Comparado com a média humana', 'Repita para melhorar sua marca'],
    },
    cps: {
      title: 'Teste de velocidade de clique', desc: 'Quantos cliques você faz em 10 segundos', category: 'Velocidade',
      metaTitle: 'Teste de velocidade de clique — Meça seu CPS (cliques por segundo)',
      long: 'Clique o mais rápido que puder por um tempo fixo para medir cliques por segundo. Escolha 5, 10 ou 30 segundos; no celular, os toques são medidos exatamente do mesmo jeito.',
      features: ['5, 10 ou 30 segundos', 'Cliques por segundo calculados', 'Sua melhor marca é guardada', 'Tempo restante na tela'],
    },
    aim: {
      title: 'Treino de mira', desc: 'Quantos alvos você acerta em 30 segundos', category: 'Velocidade',
      metaTitle: 'Treino de mira — Precisão de mouse e prática de mira',
      long: 'Acerte quantos alvos conseguir antes de o tempo acabar; cada um aparece num lugar aleatório. Ele também conta os erros e calcula a precisão, então serve como treino de mouse e não só como pontuação.',
      features: ['Acertos contados em 30 segundos', 'Erros contados para uma precisão real', 'Escolha o tamanho do alvo', 'Tempo médio entre acertos'],
    },
    typing: {
      title: 'Teste de velocidade de digitação', desc: 'Digite frases para medir PPM e precisão', category: 'Velocidade',
      metaTitle: 'Teste de digitação — Meça PPM e precisão grátis',
      long: 'Digite a frase apresentada para medir palavras por minuto e precisão. Os erros são marcados na hora e a frase muda a cada rodada, então não dá para decorar e passar batido.',
      features: ['Palavras por minuto e caracteres por minuto', 'Precisão por caractere', 'Caracteres errados marcados na hora', 'Várias frases em sequência'],
    },
    memory: {
      title: 'Jogo de memória de sequência', desc: 'Repita a ordem em que as cores acendem', category: 'Memória',
      metaTitle: 'Jogo de memória de sequência — Teste sua memória de curto prazo',
      long: 'Os botões de cor acendem um por um e você tem que apertá-los na mesma ordem. Cada rodada certa acrescenta um passo, então o quão longe você chega é uma medida de memória de curto prazo.',
      features: ['A sequência cresce a cada nível', 'As cores distinguem sem depender de som', 'Seu melhor nível é guardado', 'Mostra onde você errou'],
    },
    'number-memory': {
      title: 'Teste de memória numérica', desc: 'Memorize um número que vai ficando mais longo', category: 'Memória',
      metaTitle: 'Teste de memória numérica — Quantos dígitos você segura',
      long: 'Um número aparece por um instante, desaparece, e você digita de volta. Se acertar, ele ganha um dígito. A maioria segura uns sete dígitos de uma vez, e é aí que costuma começar a falhar.',
      features: ['Um dígito a mais em cada acerto', 'O tempo na tela se ajusta sozinho', 'Sua melhor contagem de dígitos é guardada', 'Sua resposta comparada com o número'],
    },
    sequence: {
      title: 'Jogo de memória de padrões', desc: 'Lembre quais quadrados da grade acenderam', category: 'Memória',
      metaTitle: 'Jogo de memória de padrões — Memória visual e espacial',
      long: 'Alguns quadrados de uma grade acendem e apagam. Lembre onde estavam e aperte. Nos níveis mais altos acendem mais quadrados, e a grade também cresce.',
      features: ['Mais quadrados acendem a cada nível', 'Começa em 3×3 e vai crescendo', 'Seu melhor nível é guardado', 'Os quadrados errados são mostrados'],
    },
    'color-blind': {
      title: 'Teste de discriminação de cor', desc: 'Ache o quadrado de cor levemente diferente', category: 'Sentidos',
      metaTitle: 'Teste de discriminação de cor — Enxergue a diferença mínima',
      long: 'Entre quadrados idênticos existe exatamente um de outra cor. Cada nível diminui a diferença até você não conseguir mais distinguir — e esse ponto é o limite da sua discriminação de cor.',
      features: ['A diferença diminui a cada nível', 'Seu nível-limite é guardado', 'Observações sobre o brilho da tela', 'Em que isto difere de um teste de daltonismo'],
    },
    hearing: {
      title: 'Teste de frequência auditiva', desc: 'Descubra até que frequência você consegue ouvir', category: 'Sentidos',
      metaTitle: 'Teste de audição online — Quantos Hz você ouve',
      long: 'Sobe a frequência aos poucos para achar onde você deixa de ouvir. O limite superior da audição humana cai com a idade, então a frequência que você alcança dá uma noção aproximada da idade do seu ouvido.',
      features: ['De 20Hz a 20kHz em passos', 'Seu limite superior é registrado', 'Comparado com as faixas típicas por idade', 'Fones recomendados'],
    },
    math: {
      title: 'Desafio de cálculo mental', desc: 'Quantas você resolve em 30 segundos', category: 'Cérebro',
      metaTitle: 'Desafio de cálculo mental — 30 segundos de aritmética',
      long: 'Resolva quantas contas conseguir antes de o relógio zerar. Escolha as operações e a dificuldade, e ele informa quantas você acertou, sua precisão e o tempo médio por conta.',
      features: ['Escolha soma, subtração, multiplicação, divisão', 'Fácil, normal e difícil', 'Tempo médio por conta', 'Revise as que você pulou'],
    },
    stroop: {
      title: "Teste de Stroop", desc: "Escolha a cor da tinta, não a palavra", category: "Cérebro",
      metaTitle: "Teste de Stroop — Quanto você demora quando palavra e cor discordam",
      long: "A palavra \"vermelho\" está escrita em tinta azul. Você precisa escolher a cor em que está impressa, não o que ela diz — e como ler acontece sozinho, é preciso reprimir isso. Conta quantos você acerta em 45 segundos.",
      features: ["Quantos você acerta em 45 segundos", "Casos em que palavra e cor coincidem são misturados", "A resposta nunca fica presa numa posição", "Guarda seu melhor resultado"],
    },
    'dot-count': {
      title: "Teste de estimativa de pontos", desc: "Quantos pontos você acabou de ver", category: "Sentidos",
      metaTitle: "Teste de estimativa de pontos — Como você julga uma quantidade num relance",
      long: "Os pontos aparecem e somem. Não conte: estime. Conforme os níveis sobem há mais pontos e menos tempo, até contar um a um ficar impossível. O erro é medido em relação ao número real, então os níveis altos não ficam generosos demais.",
      features: ["A quantidade de pontos e o tempo apertam juntos", "O erro é pontuado em relação ao número real", "Os pontos se acumulam nível a nível", "Guarda seu melhor resultado"],
    },
    nback: {
      title: "Teste N-back", desc: "Lembre o que apareceu n passos atrás", category: "Memória",
      metaTitle: "Teste N-back — A tarefa padrão de memória de trabalho",
      long: "Os quadrados acendem um de cada vez. Toque quando o atual for igual ao de n passos atrás. É preciso segurar os últimos na cabeça enquanto se atualiza sem parar, e por isso essa tarefa é muito usada para medir memória de trabalho. Toques falsos são descontados, então tocar em tudo não adianta.",
      features: ["1-back, 2-back e 3-back", "Cerca de 30% são coincidências propositais", "Toques falsos são descontados da pontuação", "Acertos, perdidos e falsos mostrados à parte"],
    },
    rotation: {
      title: "Teste de rotação mental", desc: "É a mesma forma, só girada?", category: "Cérebro",
      metaTitle: "Teste de rotação mental — Girar uma forma na cabeça",
      long: "Duas formas aparecem. Decida se uma é a outra girada. Os pares \"diferentes\" são feitos por espelhamento, então têm o mesmo número de casas e se parecem — você realmente precisa girá-los na cabeça.",
      features: ["Pares \"diferentes\" feitos por espelhamento", "Mais casas conforme os níveis sobem", "Formas simétricas são filtradas para a resposta ficar correta", "Guarda seu melhor resultado"],
    },
    beat: {
      title: "Teste de ritmo", desc: "Mantenha o compasso depois que o som parar", category: "Sentidos",
      metaTitle: "Teste de ritmo — Você segura o andamento quando o metrônomo para?",
      long: "Tocam quatro batidas e depois você dá mais oito em silêncio no mesmo andamento. Pontua não só o erro médio, mas o quanto você foi regular — atrasar sempre um pouco é melhor ritmo do que oscilar entre adiantado e atrasado.",
      features: ["80, 100 e 120 BPM", "Pontua erro médio e regularidade juntos", "Nada é descontado dentro de 25 ms", "Guarda seu melhor resultado"],
    },
    peripheral: {
      title: "Teste de visão periférica", desc: "Pegue a borda olhando para o centro", category: "Velocidade",
      metaTitle: "Teste de visão periférica — Quanto você enxerga olhando para a frente",
      long: "Mantenha os olhos no ponto central e toque no alvo que aparece na borda. Os alvos só aparecem dentro de um anel com o meio vazio, e o anel se afasta conforme os níveis sobem. Se passar do tempo, acaba — não dá para olhar em volta.",
      features: ["Os alvos nunca aparecem no centro", "O anel se afasta conforme os níveis sobem", "Os alvos aparecem por igual em todas as direções", "Guarda seu melhor resultado"],
    },
    '2048': {
      title: "Jogo 2048", desc: "Deslize e junte os números iguais até chegar a 2048", category: "Cérebro",
      metaTitle: "Jogo 2048 — Deslize e junte números até 2048, de graça",
      long: "Deslize o tabuleiro em quatro direções para juntar os números iguais. Uma peça se junta só uma vez por jogada, então 4·4·4·4 vira 8·8 e não 16, e empurrar contra a parede não muda nada nem cria peças. Ao chegar a 2048 você pode continuar jogando, e sempre há uma jogada para desfazer.",
      features: ["Setas, WASD ou deslizar o dedo", "Os pontos são a soma das peças que você junta", "Continue jogando depois do 2048", "Desfazer uma jogada e melhor marca salva"],
    },
    minesweeper: {
      title: "Campo Minado", desc: "Cerque as minas só com os números", category: "Cérebro",
      metaTitle: "Campo Minado — Jogue grátis no iniciante, intermediário e especialista",
      long: "O número diz quantas minas encostam naquela casa, e é a única pista que você tem. A primeira casa é sempre segura e nunca tem minas em volta, então o tabuleiro abre uma área grande e você já raciocina na primeira jogada em vez de chutar. O melhor tempo fica guardado à parte em cada um dos três tabuleiros.",
      features: ["Iniciante 9×9, intermediário 16×16, especialista 30×16", "Seu primeiro clique nunca é uma mina", "Botão de bandeira ou toque longo no celular", "Melhor tempo guardado por dificuldade", "Mostra o 3BV do tabuleiro (cliques mínimos)"],
    },
    sudoku: {
      title: "Sudoku", desc: "Preencha a grade 9×9 com os números de 1 a 9", category: "Cérebro",
      metaTitle: "Sudoku — Jogos fácil, médio e difícil com uma única resposta",
      long: "Preencha a grade para que cada linha, cada coluna e cada bloco 3×3 tenham de 1 a 9 uma única vez. Cada jogo é cavado a partir de uma grade completa, uma casa por vez, conferindo depois de cada remoção que ainda resta uma só solução — aqui nenhum jogo tem duas respostas. A dificuldade vem da técnica necessária, não da quantidade de casas vazias.",
      features: ["Fácil, médio e difícil pela técnica necessária", "Nunca um jogo com mais de uma resposta", "Dica que dá o motivo, não só o número", "Anotações a lápis e desfazer uma jogada", "Melhor tempo guardado por dificuldade"],
    },
    sliding: {
      title: "Quebra-cabeça deslizante", desc: "Deslize os números até ficarem em ordem", category: "Cérebro",
      metaTitle: "Quebra-cabeça deslizante — Jogue o jogo do 15 em 3×3, 4×4 e 5×5",
      long: "Deslize os números para o espaço vazio até deixá-los em ordem a partir do canto superior esquerdo. Metade das posições deste quebra-cabeça não pode ser terminada, não importa quanto você deslize, então cada embaralhada é conferida contando as inversões: o tabuleiro que você recebe sempre tem solução. Também mostra a distância de Manhattan que falta, que é um limite inferior das jogadas ainda necessárias.",
      features: ["Tabuleiros de 3×3, 4×4 e 5×5", "Nunca entrega um tabuleiro sem solução", "Toque mais longe na linha para deslizar várias peças de uma vez", "Desfazer uma jogada por vez", "A distância restante mostra o quanto ainda falta", "Melhor tempo salvo por tamanho de tabuleiro"],
    },
  },

  ja: {
    reaction: {
      title: '反応速度テスト', desc: '緑になった瞬間にどれだけ早く押せるか', category: 'スピード',
      metaTitle: '反応速度テスト — 反応時間をミリ秒で測る',
      long: '画面が緑に変わった瞬間に押してください。5回測って平均と最速をミリ秒で出し、一般的な人の反応時間と比べてどのあたりかを示します。',
      features: ['5回の平均と最速', 'フライングは無効になります', '人の平均と比較', 'やり直して記録を更新'],
    },
    cps: {
      title: 'クリック速度テスト', desc: '10秒で何回クリックできるか', category: 'スピード',
      metaTitle: 'クリック速度テスト — CPS（1秒あたりのクリック数）を測る',
      long: '決めた時間のあいだ、できるだけ速くクリックして1秒あたりのクリック数を測ります。5秒・10秒・30秒から選べ、スマートフォンではタップも同じように測れます。',
      features: ['5秒・10秒・30秒', '1秒あたりのクリック数を計算', '最高記録を保存', '残り時間をその場で表示'],
    },
    aim: {
      title: 'エイム練習', desc: '30秒で標的をいくつ当てられるか', category: 'スピード',
      metaTitle: 'エイム練習 — マウスの正確さとエイムの練習',
      long: '時間が切れる前に、ランダムな場所に現れる標的をできるだけ多く当ててください。外した回数も数えて正確さを出すので、点数を出すだけでなくマウスの練習になります。',
      features: ['30秒で当てた数を集計', '外した数も数えて実際の正確さを出す', '標的の大きさを選べる', '当てるまでの平均時間'],
    },
    typing: {
      title: 'タイピング速度テスト', desc: '文章を打って分あたり文字数と正確さを測る', category: 'スピード',
      metaTitle: 'タイピング速度テスト — 文字数と正確さを無料で測る',
      long: '表示された文章を打って、1分あたりの文字数と正確さを測ります。間違いは打った瞬間に印が付き、文章は毎回変わるので覚えてしのぐことはできません。',
      features: ['1分あたりの文字数と単語数', '1文字ごとの正確さ', '間違った文字にすぐ印が付く', '文章を続けて何本も'],
    },
    memory: {
      title: '順番記憶ゲーム', desc: '色が光った順番を覚えて押す', category: '記憶',
      metaTitle: '順番記憶ゲーム — 短期記憶を試す',
      long: '色のボタンが一つずつ光るので、同じ順番で押し返してください。正解するたびに一つ増えるので、どこまで進めるかが短期記憶の目安になります。',
      features: ['レベルごとに順番が伸びる', '音がなくても色で区別できる', '最高レベルを保存', 'どこで間違えたかを表示'],
    },
    'number-memory': {
      title: '数字記憶テスト', desc: 'だんだん長くなる数字を覚える', category: '記憶',
      metaTitle: '数字記憶テスト — 何桁まで覚えていられるか',
      long: '数字が一瞬表示されて消えるので、それを打ち込みます。正解すると1桁増えます。多くの人は7桁前後までなので、そのあたりから崩れはじめます。',
      features: ['正解するたびに1桁増える', '表示時間は自動で調整', '最高桁数を保存', '答えと数字を並べて確認'],
    },
    sequence: {
      title: '位置記憶ゲーム', desc: 'マスのどこが光ったかを覚える', category: '記憶',
      metaTitle: '位置記憶ゲーム — 視覚と空間の記憶を試す',
      long: 'マスのいくつかが光って消えます。どこだったかを覚えて押してください。レベルが上がると光るマスが増え、マス自体も大きくなります。',
      features: ['レベルごとに光るマスが増える', '3×3から始まって広がる', '最高レベルを保存', '間違えたマスを表示'],
    },
    'color-blind': {
      title: '色の見分けテスト', desc: '少しだけ色が違う一つを見つける', category: '感覚',
      metaTitle: '色の見分けテスト — わずかな差を見抜く',
      long: '同じ色のマスの中に、一つだけ違う色があります。レベルが上がるほど差が小さくなり、見分けられなくなった地点があなたの色の見分けの限界です。',
      features: ['レベルごとに差が小さくなる', '限界レベルを保存', '画面の明るさについての注意', '色覚検査との違い'],
    },
    hearing: {
      title: '可聴周波数テスト', desc: 'どこまで高い音が聞こえるか', category: '感覚',
      metaTitle: 'オンライン聴力テスト — 何Hzまで聞こえるか',
      long: '周波数を少しずつ上げていき、聞こえなくなる地点を探します。人の可聴上限は年齢とともに下がるので、届いた周波数から耳の年齢のおおよその見当がつきます。',
      features: ['20Hz〜20kHzを段階的に', '可聴上限を記録', '年齢ごとの目安と比較', 'イヤホン推奨'],
    },
    math: {
      title: '暗算チャレンジ', desc: '30秒で何問解けるか', category: '計算',
      metaTitle: '暗算チャレンジ — 30秒の計算勝負',
      long: '時間が切れる前に、できるだけ多くの計算問題を解いてください。演算と難易度を選べ、正解数・正答率・1問あたりの平均時間を出します。',
      features: ['たし算・ひき算・かけ算・わり算を選べる', 'やさしい・ふつう・むずかしい', '1問あたりの平均時間', '飛ばした問題を見返せる'],
    },
    stroop: {
      title: "ストループテスト", desc: "言葉ではなく塗られた色を選ぶ", category: "計算",
      metaTitle: "ストループテスト — 言葉と色が食い違うとき、どれだけ速いか",
      long: "「あか」という言葉が青で塗られています。言葉の意味ではなく塗られた色を選ばなければならず、読むことは自動的に起きるのでそれを抑える必要があります。45秒で何問正解できるかを測ります。",
      features: ["45秒で何問正解できるか", "言葉と色が一致する問題も混ざる", "正解が特定の位置に偏らない", "ベスト記録を保存"],
    },
    'dot-count': {
      title: "個数見積もりテスト", desc: "今見えた点は何個だったか", category: "感覚",
      metaTitle: "個数見積もりテスト — 一瞬で数をつかむ力を測る",
      long: "点が一瞬だけ現れて消えます。数えずに見積もってください。レベルが上がると点は増え、見える時間は短くなり、やがて一つずつ数えられなくなります。誤差は正解に対する比率で測るので、後半が甘くなりません。",
      features: ["個数と表示時間が同時に厳しくなる", "誤差を正解に対する比率で採点", "レベルごとに点数が積み上がる", "ベスト記録を保存"],
    },
    nback: {
      title: "Nバックテスト", desc: "n個前と同じ位置を覚えておく", category: "記憶",
      metaTitle: "Nバックテスト — 作業記憶を測る標準的な課題",
      long: "マスが一つずつ光ります。今のものがn個前と同じ位置なら押してください。直前のいくつかを覚えながら常に更新し続ける必要があり、だからこそ作業記憶を測るのに広く使われます。空押しは減点されるので、全部押しても点にはなりません。",
      features: ["1-back・2-back・3-back", "約3割が意図的に一致する", "空押しは点数から引かれる", "ヒット・見逃し・空押しを別々に表示"],
    },
    rotation: {
      title: "心的回転テスト", desc: "回すと同じになる図形か", category: "計算",
      metaTitle: "心的回転テスト — 頭の中で図形を回してみる",
      long: "2つの図形が出ます。片方を回すともう片方になるかを答えてください。「違う」問題は左右反転で作るのでマス数も見た目も似ており、本当に頭の中で回してみる必要があります。",
      features: ["「違う」問題は左右反転で作る", "レベルが上がるとマスが増える", "対称な図形は除外して正解が狂わないようにした", "ベスト記録を保存"],
    },
    beat: {
      title: "リズム感テスト", desc: "音が止まっても拍を保てるか", category: "感覚",
      metaTitle: "リズム感テスト — メトロノームが止まった後も合わせられるか",
      long: "4拍だけ音が鳴り、その後は音なしで同じテンポで8回押します。平均のずれだけでなく、どれだけ一定だったかも見ます — いつも少し遅れるより、早くなったり遅くなったりする方がリズム感としては悪いからです。",
      features: ["80・100・120 BPM", "平均のずれと安定度をあわせて採点", "25msまでは減点しない", "ベスト記録を保存"],
    },
    peripheral: {
      title: "周辺視野テスト", desc: "中央を見たまま端を捉える", category: "スピード",
      metaTitle: "周辺視野テスト — 正面を見ながらどれだけ広く見えるか",
      long: "中央の点を見つめたまま、端に現れる的を押してください。的は中央を空けたリングの中にだけ現れ、レベルが上がるほど外側へ移ります。時間内に押せないと終わるので、目を動かして探す余裕はありません。",
      features: ["的は中央には現れない", "レベルが上がるほど外側へ", "四方に均等に現れる", "ベスト記録を保存"],
    },
    '2048': {
      title: "2048 ゲーム", desc: "同じ数字をくっつけて2048を作る", category: "計算",
      metaTitle: "2048 ゲーム — 数字を滑らせて合わせるパズル、無料でそのまま",
      long: "盤を四方向に動かして同じ数字をくっつけます。一回の移動で同じマスがくっつくのは一度だけなので、4・4・4・4は16ではなく8・8になります。動かない向きに入力しても盤は変わらず新しいマスも出ません。2048を作ってからも続けられ、一手戻すこともできます。",
      features: ["矢印キー・WASD・スワイプ", "くっつけた数の合計がスコア", "2048のあとも続けられる", "一手戻すとベスト記録の保存"],
    },
    minesweeper: {
      title: "マインスイーパ", desc: "数字だけを頼りに地雷の位置を絞る", category: "計算",
      metaTitle: "マインスイーパ — 初級・中級・上級の盤を無料で",
      long: "数字はそのマスに接する八マスの地雷の数で、手がかりはそれだけです。最初のマスは必ず安全で周りにも地雷がないので盤が広く開き、一手目から勘ではなく理屈で進められます。三つの盤ごとに最高記録を別に残します。",
      features: ["初級9×9・中級16×16・上級30×16", "最初のクリックが地雷になることはない", "スマートフォンでは旗ボタンか長押し", "難易度ごとに最高記録を保存", "盤の3BV（最小クリック数）も表示"],
    },
    sudoku: {
      title: "数独", desc: "9×9の盤を1〜9で埋める", category: "計算",
      metaTitle: "数独（ナンプレ）— 答えが一つだけの問題をやさしい・ふつう・むずかしいで",
      long: "どの行・どの列・どの3×3ブロックにも1から9が一度ずつ入るように埋めます。問題は完成した盤から一マスずつ消して作り、消すたびに答えが一つだけ残るかを確かめているので、答えが二つある問題は出ません。難易度は空きマスの数ではなく、解くのに必要な手筋で決まります。",
      features: ["必要な手筋で分けたやさしい・ふつう・むずかしい", "答えが二つある問題は出さない", "数字だけでなく理由まで言うヒント", "候補メモと一手戻す", "難易度ごとに最短記録を保存"],
    },
    sliding: {
      title: "スライドパズル", desc: "数字を滑らせて順番に並べる15パズル", category: "計算",
      metaTitle: "スライドパズル — 15パズルを3×3・4×4・5×5で今すぐ",
      long: "空きマスへ数字を滑らせ、左上から順に並べます。このパズルは並べ方の半分がどう動かしても完成しないので、混ぜるたびに転倒数を数えて解けるかを先に確かめます — 出てくる盤は必ず解けます。残りのマンハッタン距離も表示し、それが必要な手数の下限になります。",
      features: ["3×3・4×4・5×5の盤", "解けない盤は出さない", "同じ行の離れたマスを押せば一度に複数動く", "一手ずつ戻せる", "残り距離であとどれだけかが分かる", "盤の大きさごとに最高記録を保存"],
    },
  },

  de: {
    reaction: {
      title: 'Reaktionszeit-Test', desc: 'Wie schnell du klickst, sobald es grün wird', category: 'Schnelligkeit',
      metaTitle: 'Reaktionszeit-Test — Miss deine Reaktion in Millisekunden',
      long: 'Klick in dem Moment, in dem der Bildschirm grün wird. Es nimmt fünf Messungen, gibt dir Durchschnitt und Bestwert in Millisekunden und zeigt, wo du gegenüber der üblichen menschlichen Reaktionszeit stehst.',
      features: ['Durchschnitt und Bestwert über fünf Runden', 'Zu früh geklickt zählt nicht', 'Verglichen mit dem menschlichen Durchschnitt', 'Nochmal versuchen für einen besseren Wert'],
    },
    cps: {
      title: 'Klickgeschwindigkeits-Test', desc: 'Wie viele Klicks du in 10 Sekunden schaffst', category: 'Schnelligkeit',
      metaTitle: 'Klickgeschwindigkeits-Test — Miss deine CPS (Klicks pro Sekunde)',
      long: 'Klick so schnell du kannst über eine feste Zeit, um die Klicks pro Sekunde zu messen. Wähle 5, 10 oder 30 Sekunden; auf dem Handy werden Antippen genauso gemessen.',
      features: ['5, 10 oder 30 Sekunden', 'Klicks pro Sekunde berechnet', 'Bestwert wird gespeichert', 'Restzeit live sichtbar'],
    },
    aim: {
      title: 'Ziel-Training', desc: 'Wie viele Ziele du in 30 Sekunden treffen kannst', category: 'Schnelligkeit',
      metaTitle: 'Ziel-Training — Mausgenauigkeit und Zielübung',
      long: 'Treffe so viele Ziele wie möglich, bevor die Zeit abläuft; jedes erscheint an einer zufälligen Stelle. Es zählt auch die Fehlschüsse und errechnet die Trefferquote, taugt also als Mausübung und nicht nur als Punktestand.',
      features: ['Treffer über 30 Sekunden gezählt', 'Fehlschüsse gezählt für eine echte Trefferquote', 'Zielgröße wählbar', 'Durchschnittszeit zwischen Treffern'],
    },
    typing: {
      title: 'Tippgeschwindigkeits-Test', desc: 'Sätze tippen, um WPM und Genauigkeit zu messen', category: 'Schnelligkeit',
      metaTitle: 'Tippgeschwindigkeits-Test — WPM und Genauigkeit kostenlos messen',
      long: 'Tippe den vorgegebenen Satz, um Wörter pro Minute und Genauigkeit zu messen. Fehler werden sofort markiert, und der Satz wechselt jede Runde — auswendig lernen bringt dich also nicht durch.',
      features: ['Wörter pro Minute und Zeichen pro Minute', 'Genauigkeit je Zeichen', 'Falsche Zeichen sofort markiert', 'Mehrere Sätze hintereinander'],
    },
    memory: {
      title: 'Reihenfolge-Gedächtnisspiel', desc: 'Wiederhole die Reihenfolge, in der die Farben aufleuchten', category: 'Gedächtnis',
      metaTitle: 'Reihenfolge-Gedächtnisspiel — Teste dein Kurzzeitgedächtnis',
      long: 'Farbtasten leuchten einzeln auf und du musst sie in derselben Reihenfolge drücken. Jede richtige Runde hängt einen Schritt an, also ist die erreichte Länge ein Maß fürs Kurzzeitgedächtnis.',
      features: ['Die Folge wächst mit jeder Ebene', 'Farben unterscheiden sie ohne Ton', 'Beste Ebene wird gespeichert', 'Zeigt, wo du falsch lagst'],
    },
    'number-memory': {
      title: 'Zahlengedächtnis-Test', desc: 'Merke dir eine Zahl, die immer länger wird', category: 'Gedächtnis',
      metaTitle: 'Zahlengedächtnis-Test — Wie viele Ziffern kannst du halten',
      long: 'Eine Zahl erscheint kurz, verschwindet, und du tippst sie ein. Bei richtiger Eingabe kommt eine Ziffer dazu. Die meisten halten etwa sieben Ziffern gleichzeitig — da fängt es üblicherweise an zu bröckeln.',
      features: ['Eine Ziffer mehr bei jeder richtigen Antwort', 'Anzeigedauer passt sich automatisch an', 'Beste Ziffernzahl wird gespeichert', 'Deine Antwort neben der Zahl'],
    },
    sequence: {
      title: 'Muster-Gedächtnisspiel', desc: 'Merke dir, welche Felder im Raster aufgeleuchtet sind', category: 'Gedächtnis',
      metaTitle: 'Muster-Gedächtnisspiel — Visuelles und räumliches Gedächtnis',
      long: 'Einige Felder eines Rasters blinken auf und wieder aus. Merke dir, wo sie waren, und drücke sie. Auf höheren Ebenen leuchten mehr Felder, und das Raster selbst wird größer.',
      features: ['Mit jeder Ebene leuchten mehr Felder', 'Beginnt bei 3×3 und wächst', 'Beste Ebene wird gespeichert', 'Falsche Felder werden gezeigt'],
    },
    'color-blind': {
      title: 'Farbunterscheidungs-Test', desc: 'Finde das eine Feld mit leicht anderer Farbe', category: 'Sinne',
      metaTitle: 'Farbunterscheidungs-Test — Erkenne den feinen Unterschied',
      long: 'Unter gleichen Feldern hat genau eines eine andere Farbe. Jede Ebene verkleinert den Unterschied, bis du ihn nicht mehr erkennst — und dieser Punkt ist die Grenze deiner Farbunterscheidung.',
      features: ['Der Unterschied wird jede Ebene kleiner', 'Deine Grenzebene wird gespeichert', 'Hinweise zur Bildschirmhelligkeit', 'Worin sich das von einem Farbenblindheitstest unterscheidet'],
    },
    hearing: {
      title: 'Hörfrequenz-Test', desc: 'Finde heraus, wie hohe Frequenzen du noch hörst', category: 'Sinne',
      metaTitle: 'Online-Hörtest — Wie viele Hz hörst du noch',
      long: 'Erhöht die Frequenz schrittweise, bis du sie nicht mehr hörst. Die obere Hörgrenze sinkt mit dem Alter, die erreichte Frequenz gibt also einen grob geschätzten Eindruck vom Alter deiner Ohren.',
      features: ['20Hz bis 20kHz in Stufen', 'Deine obere Grenze wird notiert', 'Verglichen mit typischen Bereichen nach Alter', 'Kopfhörer empfohlen'],
    },
    math: {
      title: 'Kopfrechnen-Challenge', desc: 'Wie viele du in 30 Sekunden löst', category: 'Kopf',
      metaTitle: 'Kopfrechnen-Challenge — 30 Sekunden Rechnen',
      long: 'Löse so viele Rechenaufgaben wie möglich, bevor die Uhr abläuft. Wähle Rechenarten und Schwierigkeit; danach siehst du, wie viele du geschafft hast, deine Trefferquote und die Durchschnittszeit pro Aufgabe.',
      features: ['Addition, Subtraktion, Multiplikation, Division wählbar', 'Leicht, normal und schwer', 'Durchschnittszeit pro Aufgabe', 'Übersprungene Aufgaben nachsehen'],
    },
    stroop: {
      title: "Stroop-Test", desc: "Wähle die Druckfarbe, nicht das Wort", category: "Kopf",
      metaTitle: "Stroop-Test — Wie schnell bist du, wenn Wort und Farbe nicht zusammenpassen",
      long: "Das Wort „rot\" ist in blauer Tinte gedruckt. Du musst die Farbe wählen, in der es gedruckt ist — nicht, was dasteht. Da Lesen automatisch passiert, musst du es unterdrücken. Gezählt wird, wie viele du in 45 Sekunden richtig hast.",
      features: ["Wie viele du in 45 Sekunden triffst", "Übereinstimmende Wort-Farbe-Fälle sind eingestreut", "Die Antwort steckt nie an einer Position fest", "Speichert deinen Bestwert"],
    },
    'dot-count': {
      title: "Punkte-Schätztest", desc: "Wie viele Punkte hast du gerade gesehen", category: "Sinne",
      metaTitle: "Punkte-Schätztest — Wie gut schätzt du eine Menge auf einen Blick",
      long: "Punkte blitzen auf und verschwinden. Nicht zählen — schätzen. Mit steigender Stufe gibt es mehr Punkte und weniger Zeit, bis Einzelzählen unmöglich wird. Der Fehler wird relativ zur echten Zahl gemessen, damit spätere Stufen nicht unfair großzügig werden.",
      features: ["Punktzahl und Anzeigedauer ziehen gemeinsam an", "Fehler relativ zur echten Zahl bewertet", "Punkte sammeln sich Stufe für Stufe", "Speichert deinen Bestwert"],
    },
    nback: {
      title: "N-Back-Test", desc: "Merk dir, was n Schritte zurück war", category: "Gedächtnis",
      metaTitle: "N-Back-Test — Die Standardaufgabe zum Arbeitsgedächtnis",
      long: "Felder leuchten nacheinander auf. Drück, wenn das aktuelle dem Feld von vor n Schritten entspricht. Man muss die letzten im Kopf behalten und ständig aktualisieren — deshalb wird diese Aufgabe so oft zum Messen des Arbeitsgedächtnisses genutzt. Fehldrücke werden abgezogen, alles zu drücken bringt also nichts.",
      features: ["1-back, 2-back und 3-back", "Rund 30% sind absichtlich Treffer", "Fehldrücke werden vom Punktestand abgezogen", "Treffer, Verpasste und Fehldrücke getrennt"],
    },
    rotation: {
      title: "Mentale-Rotations-Test", desc: "Sind das die gleichen Formen, nur gedreht", category: "Kopf",
      metaTitle: "Mentale-Rotations-Test — Eine Form im Kopf drehen",
      long: "Zwei Formen erscheinen. Entscheide, ob die eine die gedrehte andere ist. Die „unterschiedlichen\" Paare entstehen durch Spiegelung, haben also gleich viele Felder und sehen ähnlich aus — man muss sie wirklich im Kopf drehen.",
      features: ["„Unterschiedliche\" Paare durch Spiegelung erzeugt", "Mehr Felder mit steigender Stufe", "Symmetrische Formen werden herausgefiltert, damit die Antwort stimmt", "Speichert deinen Bestwert"],
    },
    beat: {
      title: "Rhythmus-Test", desc: "Halte den Takt, wenn der Ton aufhört", category: "Sinne",
      metaTitle: "Rhythmus-Test — Hältst du das Tempo, wenn das Metronom schweigt",
      long: "Vier Schläge erklingen, dann tippst du acht weitere in Stille im selben Tempo. Bewertet wird nicht nur die mittlere Abweichung, sondern auch die Gleichmäßigkeit — durchgehend leicht zu spät ist besserer Rhythmus als zwischen zu früh und zu spät zu schwanken.",
      features: ["80, 100 und 120 BPM", "Bewertet mittlere Abweichung und Gleichmäßigkeit zusammen", "Innerhalb von 25 ms wird nichts abgezogen", "Speichert deinen Bestwert"],
    },
    peripheral: {
      title: "Test des peripheren Sehens", desc: "Fang den Rand, während du in die Mitte schaust", category: "Schnelligkeit",
      metaTitle: "Test des peripheren Sehens — Wie weit siehst du, während du geradeaus blickst",
      long: "Halte die Augen auf dem Mittelpunkt und tippe das Ziel an, das am Rand erscheint. Ziele erscheinen nur in einem Ring mit freier Mitte, und der Ring wandert mit steigender Stufe nach außen. Wer die Zeit verpasst, ist raus — zum Umherschauen bleibt keine Gelegenheit.",
      features: ["Ziele erscheinen nie in der Mitte", "Der Ring wandert mit steigender Stufe nach außen", "Ziele erscheinen gleichmäßig in alle Richtungen", "Speichert deinen Bestwert"],
    },
    '2048': {
      title: "2048 Spiel", desc: "Gleiche Zahlen zusammenschieben, bis 2048 dasteht", category: "Kopf",
      metaTitle: "2048 Spiel — Zahlen schieben und zusammenfügen, kostenlos ohne Installation",
      long: "Schiebe das Brett in vier Richtungen, um gleiche Zahlen zu verschmelzen. Ein Feld verschmilzt pro Zug nur einmal, aus 4·4·4·4 wird also 8·8 und nicht 16, und ein Zug gegen die Wand ändert nichts und setzt kein neues Feld. Nach 2048 kannst du weiterspielen, und ein Zug lässt sich immer zurücknehmen.",
      features: ["Pfeiltasten, WASD oder Wischen", "Die Punkte sind die Summe der verschmolzenen Felder", "Nach 2048 weiterspielen", "Ein Zug zurück, Bestwert wird gespeichert"],
    },
    minesweeper: {
      title: "Minesweeper", desc: "Die Minen allein aus den Zahlen einkreisen", category: "Kopf",
      metaTitle: "Minesweeper — Anfänger, Fortgeschritten und Profi kostenlos spielen",
      long: "Die Zahl sagt, wie viele Minen an dieses Feld grenzen — mehr Anhaltspunkte gibt es nicht. Das erste Feld ist immer sicher und hat nie Minen ringsum, öffnet sich also großflächig, und du kannst schon im ersten Zug schließen statt zu raten. Die Bestzeit wird für jedes der drei Felder einzeln gespeichert.",
      features: ["Anfänger 9×9, fortgeschritten 16×16, Profi 30×16", "Dein erster Klick ist nie eine Mine", "Fahnen-Knopf oder langes Drücken auf dem Handy", "Bestzeit je Schwierigkeit gespeichert", "Zeigt das 3BV des Feldes (Mindestklicks)"],
    },
    sudoku: {
      title: "Sudoku", desc: "Füll das 9×9-Gitter mit den Ziffern 1 bis 9", category: "Kopf",
      metaTitle: "Sudoku — Leichte, mittlere und schwere Rätsel mit genau einer Lösung",
      long: "Füll das Gitter so, dass in jeder Zeile, jeder Spalte und jeder 3×3-Box die 1 bis 9 genau einmal steht. Jedes Rätsel wird aus einem fertigen Gitter Feld für Feld ausgehöhlt, wobei nach jedem Entfernen geprüft wird, ob genau eine Lösung bleibt — hier hat kein Rätsel zwei Antworten. Die Schwierigkeit kommt von der nötigen Technik, nicht von der Zahl der leeren Felder.",
      features: ["Leicht, mittel und schwer nach der nötigen Technik", "Nie ein Rätsel mit mehr als einer Lösung", "Tipps, die den Grund nennen, nicht nur die Ziffer", "Notizen wie mit dem Bleistift und ein Zug zurück", "Bestzeit je Schwierigkeit gespeichert"],
    },
    sliding: {
      title: "Schiebepuzzle", desc: "Schiebe die Zahlen in die richtige Reihenfolge", category: "Kopf",
      metaTitle: "Schiebepuzzle — Das 15er-Puzzle in 3×3, 4×4 und 5×5 spielen",
      long: "Schiebe die Zahlen in die Lücke, bis sie von links oben der Reihe nach liegen. Bei der Hälfte aller Stellungen dieses Puzzles kommt man durch Schieben nie ans Ziel, deshalb wird jede Mischung vorher über die Zahl der Inversionen geprüft — das Brett, das du bekommst, ist immer lösbar. Dazu wird die verbleibende Manhattan-Distanz gezeigt, eine untere Grenze für die noch nötigen Züge.",
      features: ["Bretter in 3×3, 4×4 und 5×5", "Unlösbare Stellungen werden nie ausgegeben", "Ein Feld weiter in der Reihe antippen schiebt mehrere auf einmal", "Zug für Zug zurücknehmen", "Die Restdistanz zeigt, wie weit du noch bist", "Bestzeit pro Brettgröße gespeichert"],
    },
  },

  fr: {
    reaction: {
      title: 'Test de temps de réaction', desc: 'À quelle vitesse tu cliques quand ça passe au vert', category: 'Vitesse',
      metaTitle: 'Test de temps de réaction — Mesure ta réaction en millisecondes',
      long: 'Clique à l’instant où l’écran passe au vert. Il prend cinq mesures, te donne la moyenne et ton meilleur temps en millisecondes, et te situe par rapport au temps de réaction humain habituel.',
      features: ['Moyenne et meilleur temps sur cinq tours', 'Cliquer trop tôt annule le tour', 'Comparé à la moyenne humaine', 'Recommence pour améliorer ton score'],
    },
    cps: {
      title: 'Test de vitesse de clic', desc: 'Combien de clics tu fais en 10 secondes', category: 'Vitesse',
      metaTitle: 'Test de vitesse de clic — Mesure tes CPS (clics par seconde)',
      long: 'Clique aussi vite que possible pendant un temps donné pour mesurer les clics par seconde. Choisis 5, 10 ou 30 secondes ; sur téléphone, les taps se mesurent exactement pareil.',
      features: ['5, 10 ou 30 secondes', 'Clics par seconde calculés', 'Ton meilleur score est gardé', 'Temps restant affiché en direct'],
    },
    aim: {
      title: 'Entraînement à la visée', desc: 'Combien de cibles tu touches en 30 secondes', category: 'Vitesse',
      metaTitle: 'Entraînement à la visée — Précision de souris et exercice de visée',
      long: 'Touche le plus de cibles possible avant la fin du temps ; chacune apparaît à un endroit au hasard. Il compte aussi tes ratés et calcule la précision, ce qui en fait un exercice de souris et pas juste un score.',
      features: ['Touches comptées sur 30 secondes', 'Ratés comptés pour une précision réelle', 'Taille de cible réglable', 'Temps moyen entre deux touches'],
    },
    typing: {
      title: 'Test de vitesse de frappe', desc: 'Tape des phrases pour mesurer tes MPM et ta précision', category: 'Vitesse',
      metaTitle: 'Test de vitesse de frappe — Mesure MPM et précision gratuitement',
      long: 'Tape la phrase proposée pour mesurer les mots par minute et la précision. Les fautes sont signalées au fil de la frappe et la phrase change à chaque tour : impossible de t’en sortir en l’apprenant par cœur.',
      features: ['Mots par minute et caractères par minute', 'Précision par caractère', 'Caractères fautifs signalés aussitôt', 'Plusieurs phrases à la suite'],
    },
    memory: {
      title: 'Jeu de mémoire de séquence', desc: 'Répète l’ordre dans lequel les couleurs s’allument', category: 'Mémoire',
      metaTitle: 'Jeu de mémoire de séquence — Teste ta mémoire à court terme',
      long: 'Les boutons de couleur s’allument un par un et tu dois les rappuyer dans le même ordre. Chaque tour réussi ajoute une étape, donc la distance parcourue est une mesure de mémoire à court terme.',
      features: ['La séquence s’allonge à chaque niveau', 'Les couleurs suffisent, sans son', 'Ton meilleur niveau est gardé', 'Il te montre où tu t’es trompé'],
    },
    'number-memory': {
      title: 'Test de mémoire des chiffres', desc: 'Retiens un nombre qui s’allonge sans cesse', category: 'Mémoire',
      metaTitle: 'Test de mémoire des chiffres — Combien de chiffres tu retiens',
      long: 'Un nombre s’affiche un instant, disparaît, et tu le retapes. Si tu réussis, il gagne un chiffre. La plupart des gens en retiennent environ sept d’un coup : c’est là que ça commence à lâcher.',
      features: ['Un chiffre de plus à chaque réussite', 'La durée d’affichage s’ajuste seule', 'Ton meilleur nombre de chiffres est gardé', 'Ta réponse comparée au nombre'],
    },
    sequence: {
      title: 'Jeu de mémoire des motifs', desc: 'Retiens quelles cases de la grille se sont allumées', category: 'Mémoire',
      metaTitle: 'Jeu de mémoire des motifs — Mémoire visuelle et spatiale',
      long: 'Quelques cases d’une grille s’allument puis s’éteignent. Retiens où elles étaient et appuie dessus. Aux niveaux élevés, davantage de cases s’allument et la grille elle-même s’agrandit.',
      features: ['Plus de cases s’allument à chaque niveau', 'Commence en 3×3 puis s’étend', 'Ton meilleur niveau est gardé', 'Les cases fautives sont montrées'],
    },
    'color-blind': {
      title: 'Test de discrimination des couleurs', desc: 'Trouve la case dont la couleur diffère légèrement', category: 'Sens',
      metaTitle: 'Test de discrimination des couleurs — Repère l’écart minime',
      long: 'Parmi des cases identiques, une seule est d’une autre couleur. Chaque niveau réduit l’écart jusqu’à ce que tu ne le distingues plus — et ce point marque la limite de ta discrimination des couleurs.',
      features: ['L’écart se réduit à chaque niveau', 'Ton niveau limite est gardé', 'Remarques sur la luminosité de l’écran', 'En quoi cela diffère d’un test de daltonisme'],
    },
    hearing: {
      title: 'Test de fréquence auditive', desc: 'Découvre jusqu’à quelle fréquence tu entends', category: 'Sens',
      metaTitle: 'Test auditif en ligne — Jusqu’à combien de Hz entends-tu',
      long: 'Monte la fréquence pas à pas pour trouver l’endroit où tu cesses de l’entendre. La limite haute de l’audition humaine baisse avec l’âge, donc la fréquence atteinte donne une idée approximative de l’âge de ton oreille.',
      features: ['De 20Hz à 20kHz par paliers', 'Ta limite haute est notée', 'Comparée aux plages typiques selon l’âge', 'Casque recommandé'],
    },
    math: {
      title: 'Défi de calcul mental', desc: 'Combien tu en résous en 30 secondes', category: 'Calcul',
      metaTitle: 'Défi de calcul mental — 30 secondes de calcul',
      long: 'Résous autant d’opérations que possible avant la fin du chrono. Choisis les opérations et la difficulté, et il te dit combien tu en as réussi, ta précision et le temps moyen par opération.',
      features: ['Choisis addition, soustraction, multiplication, division', 'Facile, normal et difficile', 'Temps moyen par opération', 'Revois celles que tu as passées'],
    },
    stroop: {
      title: "Test de Stroop", desc: "Choisissez la couleur d’encre, pas le mot", category: "Calcul",
      metaTitle: "Test de Stroop — Quelle vitesse quand le mot et la couleur se contredisent",
      long: "Le mot « rouge » est imprimé en encre bleue. Vous devez choisir la couleur d’impression, pas ce qui est écrit — et comme la lecture se fait toute seule, il faut la réprimer. On compte combien vous en réussissez en 45 secondes.",
      features: ["Combien vous en réussissez en 45 secondes", "Des essais où mot et couleur coïncident sont mélangés", "La réponse n’est jamais bloquée à une position", "Garde votre meilleur score"],
    },
    'dot-count': {
      title: "Test d’estimation de points", desc: "Combien de points venez-vous de voir", category: "Sens",
      metaTitle: "Test d’estimation de points — Jugez-vous bien une quantité d’un coup d’œil",
      long: "Les points apparaissent puis disparaissent. Ne comptez pas : estimez. À mesure que les niveaux montent, il y a plus de points et moins de temps, jusqu’à ce que compter un par un devienne impossible. L’erreur est mesurée par rapport au nombre réel, pour que les niveaux élevés ne deviennent pas trop généreux.",
      features: ["Le nombre de points et la durée se resserrent ensemble", "Erreur notée par rapport au nombre réel", "Les points s’accumulent niveau après niveau", "Garde votre meilleur score"],
    },
    nback: {
      title: "Test N-back", desc: "Retenez ce qui est passé n coups plus tôt", category: "Mémoire",
      metaTitle: "Test N-back — La tâche standard de mémoire de travail",
      long: "Les cases s’allument une à une. Appuyez quand la case actuelle correspond à celle d’il y a n coups. Il faut garder les dernières en tête tout en les mettant sans cesse à jour, d’où l’usage répandu de cette tâche pour mesurer la mémoire de travail. Les fausses alertes sont retranchées : tout presser ne mène à rien.",
      features: ["1-back, 2-back et 3-back", "Environ 30 % sont des correspondances voulues", "Les fausses alertes sont retranchées du score", "Trouvés, manqués et fausses alertes séparés"],
    },
    rotation: {
      title: "Test de rotation mentale", desc: "Est-ce la même forme, simplement tournée", category: "Calcul",
      metaTitle: "Test de rotation mentale — Tourner une forme dans sa tête",
      long: "Deux formes apparaissent. Décidez si l’une est l’autre tournée. Les paires « différentes » sont construites par symétrie miroir : même nombre de cases, aspect proche — il faut vraiment les tourner dans sa tête.",
      features: ["Paires « différentes » construites par miroir", "Plus de cases à mesure que les niveaux montent", "Les formes symétriques sont écartées pour que la réponse reste juste", "Garde votre meilleur score"],
    },
    beat: {
      title: "Test de rythme", desc: "Gardez le tempo une fois le son arrêté", category: "Sens",
      metaTitle: "Test de rythme — Tenez-vous le tempo quand le métronome se tait",
      long: "Quatre temps sont joués, puis vous en tapez huit en silence au même tempo. On note non seulement l’écart moyen mais aussi la régularité : être toujours un peu en retard vaut mieux, pour le rythme, que d’osciller entre avance et retard.",
      features: ["80, 100 et 120 BPM", "Note l’écart moyen et la régularité ensemble", "Rien n’est retiré en deçà de 25 ms", "Garde votre meilleur score"],
    },
    peripheral: {
      title: "Test de vision périphérique", desc: "Attrapez le bord en fixant le centre", category: "Vitesse",
      metaTitle: "Test de vision périphérique — Quelle largeur voyez-vous en regardant droit devant",
      long: "Gardez les yeux sur le point central et touchez la cible qui apparaît sur le bord. Les cibles n’apparaissent que dans un anneau au centre vide, et l’anneau s’éloigne à mesure que les niveaux montent. Passé le délai, c’est fini : pas moyen de regarder autour.",
      features: ["Les cibles n’apparaissent jamais au centre", "L’anneau s’éloigne à mesure que les niveaux montent", "Les cibles apparaissent également dans toutes les directions", "Garde votre meilleur score"],
    },
    '2048': {
      title: "Jeu 2048", desc: "Faites glisser et fusionnez les mêmes nombres jusqu’à 2048", category: "Calcul",
      metaTitle: "Jeu 2048 — Faites glisser et fusionnez les nombres, gratuit sans installation",
      long: "Faites glisser la grille dans quatre directions pour fusionner les mêmes nombres. Une tuile ne fusionne qu’une fois par coup : 4·4·4·4 donne 8·8 et non 16, et pousser contre le mur ne change rien et ne fait apparaître aucune tuile. Après 2048, vous pouvez continuer, et un coup peut toujours être annulé.",
      features: ["Flèches, WASD ou balayage", "Le score est la somme des tuiles fusionnées", "Continuer à jouer après 2048", "Annulation d’un coup, meilleur score gardé"],
    },
    minesweeper: {
      title: "Démineur", desc: "Cerner les mines avec les seuls chiffres", category: "Calcul",
      metaTitle: "Démineur — Joue gratuitement en débutant, intermédiaire et expert",
      long: "Le chiffre dit combien de mines touchent cette case, et c’est le seul indice dont tu disposes. La première case est toujours sûre et n’a jamais de mine autour, donc la grille s’ouvre large et tu raisonnes dès le premier coup au lieu de deviner. Le meilleur temps est gardé à part pour chacune des trois grilles.",
      features: ["Débutant 9×9, intermédiaire 16×16, expert 30×16", "Ton premier clic n’est jamais une mine", "Bouton drapeau ou appui long sur téléphone", "Meilleur temps gardé par difficulté", "Affiche le 3BV de la grille (clics minimaux)"],
    },
    sudoku: {
      title: "Sudoku", desc: "Remplis la grille 9×9 avec les chiffres 1 à 9", category: "Calcul",
      metaTitle: "Sudoku — Grilles facile, moyen et difficile à solution unique",
      long: "Remplis la grille pour que chaque ligne, chaque colonne et chaque région de 3×3 contienne les chiffres 1 à 9 une seule fois. Chaque grille est creusée à partir d’une grille complète, case par case, en vérifiant après chaque retrait qu’il ne reste qu’une seule solution : ici aucune grille n’a deux réponses. La difficulté vient de la technique nécessaire, pas du nombre de cases vides.",
      features: ["Facile, moyen et difficile selon la technique nécessaire", "Jamais de grille à plusieurs solutions", "Un indice qui donne la raison, pas seulement le chiffre", "Notes au crayon et annulation d’un coup", "Meilleur temps gardé par difficulté"],
    },
    sliding: {
      title: "Jeu de taquin", desc: "Fais glisser les nombres pour les remettre en ordre", category: "Calcul",
      metaTitle: "Jeu de taquin — Le casse-tête du 15 en 3×3, 4×4 et 5×5",
      long: "Fais glisser les nombres vers le trou jusqu’à les ranger dans l’ordre depuis le coin en haut à gauche. La moitié des positions de ce casse-tête ne peut jamais être terminée, quoi que tu fasses glisser : chaque mélange est donc vérifié en comptant les inversions, et le plateau que tu reçois a toujours une solution. La distance de Manhattan restante est affichée, et elle borne par le bas les coups qu’il te faut encore.",
      features: ["Plateaux 3×3, 4×4 et 5×5", "Aucune position sans solution n’est distribuée", "Toucher plus loin sur la ligne fait glisser plusieurs cases d’un coup", "Annuler coup par coup", "La distance restante dit ce qu’il te reste à faire", "Meilleur temps gardé par taille de plateau"],
    },
  },

  hi: {
    reaction: {
      title: 'प्रतिक्रिया समय जाँच', desc: 'हरा होते ही कितनी जल्दी क्लिक कर पाते हैं', category: 'गति',
      metaTitle: 'प्रतिक्रिया समय जाँच — अपनी प्रतिक्रिया मिलीसेकंड में मापें',
      long: 'जिस पल स्क्रीन हरी हो, उसी पल क्लिक कीजिए। यह पाँच बार मापकर औसत और सबसे तेज़ समय मिलीसेकंड में देता है, और बताता है कि आम इंसानी प्रतिक्रिया समय के मुक़ाबले आप कहाँ हैं।',
      features: ['पाँच बार का औसत और सबसे तेज़', 'समय से पहले क्लिक रद्द हो जाता है', 'इंसानी औसत से तुलना', 'दोबारा कर के रिकॉर्ड सुधारें'],
    },
    cps: {
      title: 'क्लिक गति जाँच', desc: '10 सेकंड में कितने क्लिक कर पाते हैं', category: 'गति',
      metaTitle: 'क्लिक गति जाँच — अपने CPS (प्रति सेकंड क्लिक) मापें',
      long: 'तय समय तक जितनी तेज़ी से हो सके क्लिक कीजिए, और प्रति सेकंड क्लिक मापे जाएँगे। 5, 10 या 30 सेकंड चुनें; फ़ोन पर टैप भी उसी तरह गिने जाते हैं।',
      features: ['5, 10 या 30 सेकंड', 'प्रति सेकंड क्लिक की गणना', 'सबसे अच्छा अंक सहेजा जाता है', 'बचा समय साथ-साथ दिखता है'],
    },
    aim: {
      title: 'निशाना अभ्यास', desc: '30 सेकंड में कितने निशाने लगा पाते हैं', category: 'गति',
      metaTitle: 'निशाना अभ्यास — माउस की सटीकता और निशाने का अभ्यास',
      long: 'समय ख़त्म होने से पहले जितने निशाने लगा सकें लगाइए; हर निशाना कहीं भी अचानक आता है। यह चूकों को भी गिनकर सटीकता निकालता है, इसलिए यह सिर्फ़ अंक नहीं, माउस का अभ्यास भी है।',
      features: ['30 सेकंड में लगे निशाने गिने जाते हैं', 'असली सटीकता के लिए चूकें भी गिनी जाती हैं', 'निशाने का आकार चुनें', 'दो निशानों के बीच औसत समय'],
    },
    typing: {
      title: 'टाइपिंग गति जाँच', desc: 'वाक्य टाइप करके WPM और सटीकता मापें', category: 'गति',
      metaTitle: 'टाइपिंग गति जाँच — WPM और सटीकता मुफ़्त में मापें',
      long: 'दिया गया वाक्य टाइप कीजिए और प्रति मिनट शब्द तथा सटीकता मापी जाएगी। गलतियाँ साथ-साथ चिह्नित होती हैं, और हर बार वाक्य बदल जाता है, इसलिए रटकर निकल जाना संभव नहीं।',
      features: ['प्रति मिनट शब्द और प्रति मिनट अक्षर', 'हर अक्षर की सटीकता', 'गलत अक्षर तुरंत चिह्नित', 'एक के बाद एक कई वाक्य'],
    },
    memory: {
      title: 'क्रम स्मृति खेल', desc: 'रंग जिस क्रम में जले, उसी क्रम में दबाएँ', category: 'स्मृति',
      metaTitle: 'क्रम स्मृति खेल — अपनी अल्पकालिक स्मृति परखें',
      long: 'रंगीन बटन एक-एक कर जलते हैं और आपको उसी क्रम में दबाने होते हैं। हर सही दौर में एक कदम बढ़ जाता है, इसलिए आप कहाँ तक पहुँचते हैं यह अल्पकालिक स्मृति का माप बनता है।',
      features: ['हर स्तर पर क्रम लंबा होता है', 'बिना आवाज़ भी रंग से पहचान होती है', 'सबसे ऊँचा स्तर सहेजा जाता है', 'कहाँ गलती हुई यह दिखाता है'],
    },
    'number-memory': {
      title: 'अंक स्मृति जाँच', desc: 'लगातार लंबा होता जाने वाला अंक याद रखें', category: 'स्मृति',
      metaTitle: 'अंक स्मृति जाँच — कितने अंक याद रख पाते हैं',
      long: 'एक अंक क्षण भर दिखकर गायब हो जाता है, और आप उसे लिखते हैं। सही होने पर उसमें एक अंक जुड़ जाता है। ज़्यादातर लोग एक बार में सात अंक के आस-पास रख पाते हैं, और वहीं से गड़बड़ शुरू होती है।',
      features: ['हर सही जवाब पर एक अंक और', 'दिखने का समय अपने आप बदलता है', 'सबसे ज़्यादा अंकों का रिकॉर्ड सहेजा जाता है', 'आपका जवाब अंक के साथ मिलाकर दिखता है'],
    },
    sequence: {
      title: 'आकृति स्मृति खेल', desc: 'जाल में कौन-से खाने जले थे यह याद रखें', category: 'स्मृति',
      metaTitle: 'आकृति स्मृति खेल — दृश्य और स्थान की स्मृति',
      long: 'जाल के कुछ खाने जलकर बुझ जाते हैं। वे कहाँ थे यह याद रखकर दबाइए। ऊँचे स्तरों पर ज़्यादा खाने जलते हैं और जाल भी बड़ा होता जाता है।',
      features: ['हर स्तर पर ज़्यादा खाने जलते हैं', '3×3 से शुरू होकर बढ़ता है', 'सबसे ऊँचा स्तर सहेजा जाता है', 'गलत खाने दिखाए जाते हैं'],
    },
    'color-blind': {
      title: 'रंग पहचान जाँच', desc: 'ज़रा अलग रंग वाला एक खाना खोजें', category: 'इंद्रियाँ',
      metaTitle: 'रंग पहचान जाँच — बारीक अंतर पकड़ें',
      long: 'एक जैसे खानों में ठीक एक का रंग अलग होता है। हर स्तर पर अंतर घटता जाता है, और जहाँ आप उसे पहचान नहीं पाते वही आपकी रंग पहचान की सीमा है।',
      features: ['हर स्तर पर अंतर घटता है', 'आपकी सीमा वाला स्तर सहेजा जाता है', 'स्क्रीन की चमक के बारे में सूचना', 'यह वर्णांधता जाँच से कैसे अलग है'],
    },
    hearing: {
      title: 'श्रवण आवृत्ति जाँच', desc: 'कितनी ऊँची आवृत्ति तक सुन पाते हैं', category: 'इंद्रियाँ',
      metaTitle: 'ऑनलाइन श्रवण जाँच — कितने Hz तक सुन पाते हैं',
      long: 'आवृत्ति धीरे-धीरे बढ़ाकर वह बिंदु खोजता है जहाँ आपको सुनाई देना बंद हो जाए। मनुष्य की सुनने की ऊपरी सीमा उम्र के साथ घटती है, इसलिए जहाँ तक पहुँचते हैं उससे कान की उम्र का मोटा अंदाज़ा मिलता है।',
      features: ['20Hz से 20kHz तक चरणों में', 'आपकी ऊपरी सीमा दर्ज होती है', 'उम्र के हिसाब से सामान्य सीमा से तुलना', 'हेडफ़ोन की सलाह'],
    },
    math: {
      title: 'मानसिक गणित चुनौती', desc: '30 सेकंड में कितने हल कर पाते हैं', category: 'गणित',
      metaTitle: 'मानसिक गणित चुनौती — 30 सेकंड का गणित',
      long: 'घड़ी ख़त्म होने से पहले जितने सवाल हल कर सकें कीजिए। जोड़-घटाव और कठिनाई चुनें, और यह बताएगा कि कितने सही हुए, सटीकता कितनी रही और हर सवाल पर औसतन कितना समय लगा।',
      features: ['जोड़, घटाव, गुणा, भाग चुनें', 'आसान, सामान्य और कठिन', 'हर सवाल पर औसत समय', 'छोड़े गए सवाल फिर देखें'],
    },
    stroop: {
      title: "स्ट्रूप परीक्षण", desc: "शब्द नहीं, स्याही का रंग चुनें", category: "गणित",
      metaTitle: "स्ट्रूप परीक्षण — जब शब्द और रंग अलग हों तो आप कितने तेज़ हैं",
      long: "\"लाल\" शब्द नीली स्याही में छपा है। आपको वह रंग चुनना है जिसमें यह छपा है, न कि जो लिखा है — और चूँकि पढ़ना अपने आप होता है, उसे दबाना पड़ता है। 45 सेकंड में कितने सही करते हैं, यह गिना जाता है।",
      features: ["45 सेकंड में कितने सही", "शब्द और रंग मिलने वाले प्रश्न भी मिले होते हैं", "उत्तर कभी एक ही स्थान पर नहीं अटकता", "सर्वोत्तम अंक सहेजता है"],
    },
    'dot-count': {
      title: "बिंदु अनुमान परीक्षण", desc: "अभी कितने बिंदु दिखे थे", category: "इंद्रियाँ",
      metaTitle: "बिंदु अनुमान परीक्षण — एक नज़र में संख्या आँकने की क्षमता",
      long: "बिंदु चमककर ग़ायब हो जाते हैं। गिनें नहीं — अनुमान लगाएँ। स्तर बढ़ने पर बिंदु बढ़ते हैं और समय घटता है, जब तक एक-एक गिनना असंभव न हो जाए। त्रुटि असली संख्या के सापेक्ष मापी जाती है, इसलिए ऊँचे स्तर अनुचित रूप से उदार नहीं होते।",
      features: ["बिंदुओं की संख्या और समय साथ-साथ कसते हैं", "त्रुटि असली संख्या के सापेक्ष आँकी जाती है", "हर स्तर पर अंक जुड़ते हैं", "सर्वोत्तम अंक सहेजता है"],
    },
    nback: {
      title: "एन-बैक परीक्षण", desc: "याद रखें कि n क़दम पीछे क्या था", category: "स्मृति",
      metaTitle: "एन-बैक परीक्षण — कार्यशील स्मृति का मानक कार्य",
      long: "ख़ाने एक-एक करके जलते हैं। जब मौजूदा ख़ाना n क़दम पीछे वाले से मेल खाए तो दबाएँ। पिछले कुछ को याद रखते हुए लगातार अद्यतन करना पड़ता है, इसीलिए यह कार्य कार्यशील स्मृति मापने में व्यापक रूप से प्रयोग होता है। ग़लत दबाव घटाए जाते हैं, इसलिए सब दबाने से कुछ नहीं मिलता।",
      features: ["1-बैक, 2-बैक और 3-बैक", "लगभग 30% जान-बूझकर मेल खाते हैं", "ग़लत दबाव अंकों से घटाए जाते हैं", "हिट, चूक और ग़लत दबाव अलग-अलग"],
    },
    rotation: {
      title: "मानसिक घूर्णन परीक्षण", desc: "क्या ये वही आकृति है, बस घुमाई हुई", category: "गणित",
      metaTitle: "मानसिक घूर्णन परीक्षण — आकृति को दिमाग़ में घुमाना",
      long: "दो आकृतियाँ दिखती हैं। तय करें कि एक दूसरी की घुमाई हुई है या नहीं। \"अलग\" जोड़े दर्पण-छवि से बनाए जाते हैं, इसलिए उनमें ख़ानों की संख्या समान होती है और वे मिलती-जुलती दिखती हैं — सचमुच दिमाग़ में घुमाना पड़ता है।",
      features: ["\"अलग\" जोड़े दर्पण-छवि से बनते हैं", "स्तर बढ़ने पर ख़ाने बढ़ते हैं", "सममित आकृतियाँ छाँट दी जाती हैं ताकि उत्तर सही रहे", "सर्वोत्तम अंक सहेजता है"],
    },
    beat: {
      title: "लय परीक्षण", desc: "आवाज़ रुकने के बाद भी ताल बनाए रखें", category: "इंद्रियाँ",
      metaTitle: "लय परीक्षण — मेट्रोनोम रुकने पर भी गति संभाल पाते हैं?",
      long: "चार ताल बजते हैं, फिर आप उसी गति से बिना आवाज़ आठ बार दबाते हैं। यह केवल औसत त्रुटि नहीं, बल्कि आप कितने एकसमान रहे यह भी आँकता है — हमेशा थोड़ा देर से होना, जल्दी-देर में झूलने से बेहतर लय है।",
      features: ["80, 100 और 120 BPM", "औसत त्रुटि और एकरूपता दोनों आँकता है", "25ms के भीतर कोई कटौती नहीं", "सर्वोत्तम अंक सहेजता है"],
    },
    peripheral: {
      title: "परिधीय दृष्टि परीक्षण", desc: "बीच देखते हुए किनारा पकड़ें", category: "गति",
      metaTitle: "परिधीय दृष्टि परीक्षण — सामने देखते हुए आप कितना चौड़ा देखते हैं",
      long: "बीच के बिंदु पर नज़र टिकाए रखें और किनारे पर आने वाले लक्ष्य को दबाएँ। लक्ष्य केवल बीच ख़ाली छोड़े गए वलय के भीतर आते हैं, और स्तर बढ़ने पर वलय बाहर की ओर जाता है। समय चूकने पर खेल ख़त्म — इधर-उधर देखने का मौक़ा नहीं मिलता।",
      features: ["लक्ष्य कभी बीच में नहीं आते", "स्तर बढ़ने पर वलय बाहर जाता है", "लक्ष्य सभी दिशाओं में समान रूप से आते हैं", "सर्वोत्तम अंक सहेजता है"],
    },
    '2048': {
      title: "2048 खेल", desc: "एक जैसे अंकों को जोड़कर 2048 बनाएँ", category: "गणित",
      metaTitle: "2048 खेल — अंकों को खिसकाकर जोड़ने वाली पहेली, मुफ़्त और बिना इंस्टॉल",
      long: "बोर्ड को चार दिशाओं में खिसकाकर एक जैसे अंकों को जोड़ें। एक बार खिसकाने में एक खाना सिर्फ़ एक बार जुड़ता है, इसलिए 4·4·4·4 से 16 नहीं बल्कि 8·8 बनता है, और दीवार की तरफ़ खिसकाने पर कुछ नहीं बदलता और नया खाना भी नहीं आता। 2048 बनाने के बाद भी खेल जारी रह सकता है, और एक चाल कभी भी पीछे ली जा सकती है।",
      features: ["तीर कुंजियाँ, WASD या स्वाइप", "अंक जोड़े गए खानों का जोड़ हैं", "2048 के बाद भी खेलते रहें", "एक चाल पीछे और सर्वोत्तम अंक सहेजना"],
    },
    minesweeper: {
      title: "माइनस्वीपर", desc: "सिर्फ़ अंकों से माइन की जगह तय करें", category: "गणित",
      metaTitle: "माइनस्वीपर — शुरुआती, मध्यम और विशेषज्ञ बोर्ड मुफ़्त",
      long: "अंक बताता है कि उस खाने से कितनी माइन सटी हैं, और सुराग़ बस इतना ही है। पहला खाना हमेशा सुरक्षित रहता है और उसके चारों ओर कोई माइन नहीं होती, इसलिए बोर्ड का बड़ा हिस्सा खुल जाता है और आप पहली चाल से ही अंदाज़े की जगह तर्क से चल सकते हैं। तीनों बोर्ड का सबसे अच्छा समय अलग-अलग सहेजा जाता है।",
      features: ["शुरुआती 9×9, मध्यम 16×16, विशेषज्ञ 30×16", "आपका पहला क्लिक कभी माइन नहीं होता", "फ़ोन पर झंडा बटन या देर तक दबाना", "हर कठिनाई का सबसे अच्छा समय सहेजा जाता है", "बोर्ड का 3BV (न्यूनतम क्लिक) भी दिखता है"],
    },
    sudoku: {
      title: "सुडोकू", desc: "9×9 ग्रिड को 1 से 9 तक के अंकों से भरें", category: "गणित",
      metaTitle: "सुडोकू — आसान, मध्यम और कठिन पहेलियाँ, हर एक का उत्तर बस एक",
      long: "ग्रिड को इस तरह भरें कि हर पंक्ति, हर स्तंभ और हर 3×3 बक्से में 1 से 9 तक हर अंक ठीक एक बार आए। हर पहेली पूरी भरी ग्रिड से एक-एक खाना हटाकर बनाई जाती है और हर हटाने के बाद जाँचा जाता है कि हल सिर्फ़ एक बचा है — इसलिए यहाँ किसी पहेली के दो उत्तर नहीं होते। कठिनाई खाली खानों की संख्या से नहीं, ज़रूरी तरकीब से तय होती है।",
      features: ["ज़रूरी तरकीब से तय आसान, मध्यम और कठिन", "एक से ज़्यादा उत्तर वाली पहेली कभी नहीं", "सिर्फ़ अंक नहीं, वजह बताने वाला संकेत", "पेंसिल नोट और एक चाल पीछे", "हर कठिनाई का सबसे कम समय सहेजा जाता है"],
    },
    sliding: {
      title: "सरकाने वाली पहेली", desc: "अंकों को सरकाकर क्रम में लगाएँ", category: "गणित",
      metaTitle: "सरकाने वाली पहेली — 15 पहेली 3×3, 4×4 और 5×5 में",
      long: "अंकों को खाली जगह की ओर सरकाकर ऊपर बाएँ से क्रम में जमाएँ। इस पहेली की आधी सजावटें कितना भी सरकाने पर पूरी नहीं होतीं, इसलिए हर बार मिलाने के बाद उलटावों की गिनती से जाँचा जाता है — जो बोर्ड आपको मिलता है वह हमेशा हल हो सकता है। बची मैनहटन दूरी भी दिखती है, जो बाकी चालों की निचली सीमा है।",
      features: ["3×3, 4×4 और 5×5 बोर्ड", "बिना हल वाला बोर्ड कभी नहीं आता", "उसी पंक्ति में दूर दबाने से कई ख़ाने एक साथ सरकते हैं", "एक-एक चाल पीछे", "बची दूरी बताती है कितना रह गया", "हर बोर्ड आकार का सबसे कम समय सहेजा जाता है"],
    },
  },
  'zh-hans': {
    reaction: {
      title: '反应速度测试', desc: '变绿的那一刻，你能多快点下去', category: '速度',
      metaTitle: '反应速度测试 — 以毫秒量你的反应',
      long: '屏幕一变绿就点。它取五次成绩，给出平均值和最好成绩（毫秒），还会告诉你和人类一般反应时间比，你落在哪儿。',
      features: ['五轮的平均和最好成绩', '抢跑的那次不算数', '和人类平均值对照', '可以再来一次刷记录'],
    },
    cps: {
      title: '点击速度测试', desc: '10秒内你能点多少下', category: '速度',
      metaTitle: '点击速度测试 — 量你的CPS（每秒点击数）',
      long: '在设定的时间里尽量快地点，量出每秒点击数。可以选5秒、10秒或30秒；在手机上，点触的量法完全一样。',
      features: ['5秒、10秒或30秒', '算出每秒点击数', '保存最好成绩', '实时显示剩余时间'],
    },
    aim: {
      title: '瞄准训练', desc: '30秒内你能打中几个目标', category: '速度',
      metaTitle: '瞄准训练 — 鼠标准度与瞄准练习',
      long: '时间到之前尽量多打中目标，每个都出现在随机位置。它也数你打空的次数、算出准度，所以这是鼠标练习，不只是刷分。',
      features: ['30秒内的命中数', '数打空的次数，算真实准度', '可以挑目标大小', '命中之间的平均时间'],
    },
    typing: {
      title: '打字速度测试', desc: '打句子，量WPM和准确率', category: '速度',
      metaTitle: '打字速度测试 — 免费量WPM和准确率',
      long: '照着给出的句子打，量出每分钟词数和准确率。打错的地方边打边标出来，每一轮句子都换，所以背也背不下来。',
      features: ['每分钟词数和每分钟字符数', '逐字的准确率', '打错的字立刻标出来', '好几句连着打'],
    },
    memory: {
      title: '顺序记忆游戏', desc: '照颜色亮起来的顺序按回去', category: '记忆',
      metaTitle: '顺序记忆游戏 — 测你的短期记忆',
      long: '颜色按钮一个一个亮起来，你要照同样的顺序按回去。每对一轮就多加一步，所以你能走到第几关，就是一个短期记忆分数。',
      features: ['每过一关序列就变长', '靠颜色分辨，不用声音', '保存最高关卡', '告诉你错在哪一步'],
    },
    'number-memory': {
      title: '数字记忆测试', desc: '记住一个越来越长的数字', category: '记忆',
      metaTitle: '数字记忆测试 — 你一次记得住几位',
      long: '一个数字闪一下就消失，你把它打回来。对了就多一位。多数人一次记得住七位上下，所以一般也就在那儿开始撑不住。',
      features: ['每答对一次就多一位', '显示时间自动调整', '保存最高位数', '把你的答案和原数字对照'],
    },
    sequence: {
      title: '图形记忆游戏', desc: '记住格子里哪几块亮过', category: '记忆',
      metaTitle: '图形记忆游戏 — 测视觉与空间记忆',
      long: '格子里有几块闪一下就灭。记住它们在哪儿，再按回去。关卡越高亮的块越多，格子本身也会变大。',
      features: ['每过一关亮的块更多', '从3×3开始往上扩', '保存最高关卡', '标出按错的格子'],
    },
    'color-blind': {
      title: '颜色分辨测试', desc: '找出颜色略有不同的那一块', category: '感官',
      metaTitle: '颜色分辨测试 — 看出细微色差',
      long: '一堆一模一样的方块里，正好有一块颜色不同。每过一关色差就再缩小一点，直到你分不出来 — 那个点就是你颜色分辨力的极限。',
      features: ['每过一关色差更小', '保存你的极限关卡', '关于屏幕亮度的提醒', '和色盲检查有什么不同'],
    },
    hearing: {
      title: '听力频率测试', desc: '看看你能听到多高的频率', category: '感官',
      metaTitle: '在线听力测试 — 你能听到多少Hz',
      long: '频率一档一档往上走，找出你到哪儿就听不见了。人耳的上限随年龄下降，所以你能到的那个频率，能粗略看出你的「耳朵年龄」。',
      features: ['20Hz到20kHz分档', '记录你的上限', '和各年龄的典型范围对照', '建议戴耳机'],
    },
    math: {
      title: '心算挑战', desc: '30秒内你能做对几道', category: '脑力',
      metaTitle: '心算挑战 — 30秒的四则运算',
      long: '时间跑完之前，尽量多做对几道算术题。运算种类和难度可以自己挑，做完会给你做对几道、准确率，以及每道题的平均用时。',
      features: ['可选加、减、乘、除', '简单、普通、困难', '每道题的平均用时', '回顾你跳过的题'],
    },
    stroop: {
      title: "斯特鲁普测试", desc: "选出涂的颜色，不是文字", category: "脑力",
      metaTitle: "斯特鲁普测试 — 当文字与颜色矛盾时你有多快",
      long: "「红」这个字被涂成了蓝色。你要选它被涂成的颜色，而不是它写的意思——因为阅读是自动发生的，你必须压住它。测量你在 45 秒里答对多少题。",
      features: ["45 秒内答对的数量", "也混入文字与颜色一致的题", "正确答案不会固定在某个位置", "保存最佳成绩"],
    },
    'dot-count': {
      title: "数量估计测试", desc: "刚才看到几个点", category: "感官",
      metaTitle: "数量估计测试 — 一眼判断数量的能力",
      long: "圆点闪现后消失。别数，凭感觉估。关卡越高点越多、时间越短，最后根本来不及一个个数。误差按占正确数的比例计算，所以后面的关卡不会变得过于宽松。",
      features: ["点数与显示时间同时收紧", "误差按占正确数的比例计分", "每关累计分数", "保存最佳成绩"],
    },
    nback: {
      title: "N-back 测试", desc: "记住 n 步之前是哪一格", category: "记忆",
      metaTitle: "N-back 测试 — 衡量工作记忆的标准任务",
      long: "格子一个接一个亮起。当前这个与 n 步之前相同时按下。你要一边记住最近几个，一边不停更新，所以这个任务被广泛用来衡量工作记忆。误按会被扣分，全部都按是拿不到分的。",
      features: ["1-back、2-back、3-back", "约三成是刻意安排的相同", "误按会从分数中扣除", "命中、漏掉、误按分开显示"],
    },
    rotation: {
      title: "心理旋转测试", desc: "这两个图形转一下会一样吗", category: "脑力",
      metaTitle: "心理旋转测试 — 在脑中把图形转起来",
      long: "出现两个图形。判断其中一个转一下会不会变成另一个。「不一样」的题是用镜像做的，格子数相同、样子也接近——你真的得在脑子里把它转过来。",
      features: ["「不一样」的题用镜像生成", "关卡越高格子越多", "对称图形会被剔除，避免答案出错", "保存最佳成绩"],
    },
    beat: {
      title: "节奏感测试", desc: "声音停了也要保持节拍", category: "感官",
      metaTitle: "节奏感测试 — 节拍器停下后你还能稳住速度吗",
      long: "先响四拍，之后你要在无声中用同样的速度点八下。它不只看平均误差，还看你有多稳——总是慢一点点，比忽快忽慢的节奏感更好。",
      features: ["80、100、120 BPM", "平均误差与稳定度一起计分", "25 毫秒以内不扣分", "保存最佳成绩"],
    },
    peripheral: {
      title: "周边视野测试", desc: "盯着中间，抓住边缘", category: "速度",
      metaTitle: "周边视野测试 — 直视前方时你能看多宽",
      long: "眼睛盯住中间的点，点掉边缘出现的目标。目标只出现在中间留空的环形区域内，关卡越高环越往外。超时就结束，没有余地把眼睛移过去找。",
      features: ["目标绝不出现在中间", "关卡越高环越往外", "目标在各个方向均匀出现", "保存最佳成绩"],
    },
    '2048': {
      title: "2048 游戏", desc: "滑动合并相同的数字，做出 2048", category: "脑力",
      metaTitle: "2048 游戏 — 滑动合并数字的方块拼图，免费直接玩",
      long: "把棋盘往四个方向推，合并相同的数字。一次推动中同一格只合并一次，所以 4·4·4·4 推成 8·8 而不是 16；往推不动的方向推，盘面不变也不会出新格子。做出 2048 之后还能继续玩，而且随时可以退回一步。",
      features: ["方向键、WASD 或滑动", "分数是合出来的数字之和", "做出 2048 之后还能继续", "退回一步，保存最佳成绩"],
    },
    minesweeper: {
      title: "扫雷", desc: "只靠数字圈出地雷的位置", category: "脑力",
      metaTitle: "扫雷 — 初级、中级、高级棋盘，打开就能玩",
      long: "数字是紧挨着这一格的八格里有几颗地雷，线索只有这一个。第一格一定安全，周围也没有地雷，所以棋盘会开出一大片，第一手就能靠推理而不是靠猜。三种棋盘的最好成绩分别保存。",
      features: ["初级9×9、中级16×16、高级30×16", "第一次点击绝不会是地雷", "手机上用旗子按钮或长按", "按难度分别保存最好成绩", "同时显示棋盘的3BV（最少点击数）"],
    },
    sudoku: {
      title: "数独", desc: "把9×9的盘面用1到9填满", category: "脑力",
      metaTitle: "数独 — 简单、普通、困难，每道题只有一个答案",
      long: "把盘面填满，让每一行、每一列、每个3×3宫里1到9各出现一次。题目是从填满的盘面上一格一格挖出来的，每挖一格都确认答案仍然只剩一个，所以这里不会出现有两个答案的题。难度不看空格多少，只看解题要用到的方法。",
      features: ["按解题方法分的简单、普通、困难", "绝不出有多个答案的题", "提示会说出理由，不只给数字", "候选笔记和撤销一步", "按难度分别保存最快成绩"],
    },
    sliding: {
      title: "数字华容道", desc: "推动数字，按顺序排好", category: "脑力",
      metaTitle: "数字华容道 — 15 拼图，3×3、4×4、5×5 直接玩",
      long: "把数字推进空格，从左上角按顺序排好就完成。这个拼图有一半的排法无论怎么推都拼不出来，所以每次打乱都先数一遍逆序数来判断能不能解 — 给你的盘面一定能解。还会显示剩下的曼哈顿距离，那是还需要多少步的下限。",
      features: ["3×3、4×4、5×5 三种盘面", "绝不给出无解的盘面", "点同一行更远的方块可以一次推好几个", "一步一步退回", "剩余距离显示还差多少", "按盘面大小分别保存最好成绩"],
    },
  },
  'zh-hant': {
    reaction: {
      title: '反應速度測試', desc: '變綠的那一刻，你能多快點下去', category: '速度',
      metaTitle: '反應速度測試 — 以毫秒量你的反應',
      long: '螢幕一變綠就點。它取五次成績，給出平均值和最好成績（毫秒），還會告訴你和人類一般反應時間比，你落在哪兒。',
      features: ['五輪的平均和最好成績', '搶跑的那次不算數', '和人類平均值對照', '可以再來一次刷紀錄'],
    },
    cps: {
      title: '點擊速度測試', desc: '10秒內你能點多少下', category: '速度',
      metaTitle: '點擊速度測試 — 量你的CPS（每秒點擊數）',
      long: '在設定的時間裡盡量快地點，量出每秒點擊數。可以選5秒、10秒或30秒；在手機上，點觸的量法完全一樣。',
      features: ['5秒、10秒或30秒', '算出每秒點擊數', '儲存最好成績', '即時顯示剩餘時間'],
    },
    aim: {
      title: '瞄準訓練', desc: '30秒內你能打中幾個目標', category: '速度',
      metaTitle: '瞄準訓練 — 滑鼠準度與瞄準練習',
      long: '時間到之前盡量多打中目標，每個都出現在隨機位置。它也數你打空的次數、算出準度，所以這是滑鼠練習，不只是刷分。',
      features: ['30秒內的命中數', '數打空的次數，算真實準度', '可以挑目標大小', '命中之間的平均時間'],
    },
    typing: {
      title: '打字速度測試', desc: '打句子，量WPM和準確率', category: '速度',
      metaTitle: '打字速度測試 — 免費量WPM和準確率',
      long: '照著給出的句子打，量出每分鐘詞數和準確率。打錯的地方邊打邊標出來，每一輪句子都換，所以背也背不下來。',
      features: ['每分鐘詞數和每分鐘字元數', '逐字的準確率', '打錯的字立刻標出來', '好幾句連著打'],
    },
    memory: {
      title: '順序記憶遊戲', desc: '照顏色亮起來的順序按回去', category: '記憶',
      metaTitle: '順序記憶遊戲 — 測你的短期記憶',
      long: '顏色按鈕一個一個亮起來，你要照同樣的順序按回去。每對一輪就多加一步，所以你能走到第幾關，就是一個短期記憶分數。',
      features: ['每過一關序列就變長', '靠顏色分辨，不用聲音', '儲存最高關卡', '告訴你錯在哪一步'],
    },
    'number-memory': {
      title: '數字記憶測試', desc: '記住一個越來越長的數字', category: '記憶',
      metaTitle: '數字記憶測試 — 你一次記得住幾位',
      long: '一個數字閃一下就消失，你把它打回來。對了就多一位。多數人一次記得住七位上下，所以一般也就在那兒開始撐不住。',
      features: ['每答對一次就多一位', '顯示時間自動調整', '儲存最高位數', '把你的答案和原數字對照'],
    },
    sequence: {
      title: '圖形記憶遊戲', desc: '記住格子裡哪幾塊亮過', category: '記憶',
      metaTitle: '圖形記憶遊戲 — 測視覺與空間記憶',
      long: '格子裡有幾塊閃一下就滅。記住它們在哪兒，再按回去。關卡越高亮的塊越多，格子本身也會變大。',
      features: ['每過一關亮的塊更多', '從3×3開始往上擴', '儲存最高關卡', '標出按錯的格子'],
    },
    'color-blind': {
      title: '顏色分辨測試', desc: '找出顏色略有不同的那一塊', category: '感官',
      metaTitle: '顏色分辨測試 — 看出細微色差',
      long: '一堆一模一樣的方塊裡，正好有一塊顏色不同。每過一關色差就再縮小一點，直到你分不出來 — 那個點就是你顏色分辨力的極限。',
      features: ['每過一關色差更小', '儲存你的極限關卡', '關於螢幕亮度的提醒', '和色盲檢查有什麼不同'],
    },
    hearing: {
      title: '聽力頻率測試', desc: '看看你能聽到多高的頻率', category: '感官',
      metaTitle: '線上聽力測試 — 你能聽到多少Hz',
      long: '頻率一檔一檔往上走，找出你到哪兒就聽不見了。人耳的上限隨年齡下降，所以你能到的那個頻率，能粗略看出你的「耳朵年齡」。',
      features: ['20Hz到20kHz分檔', '記錄你的上限', '和各年齡的典型範圍對照', '建議戴耳機'],
    },
    math: {
      title: '心算挑戰', desc: '30秒內你能做對幾道', category: '腦力',
      metaTitle: '心算挑戰 — 30秒的四則運算',
      long: '時間跑完之前，盡量多做對幾道算術題。運算種類和難度可以自己挑，做完會給你做對幾道、準確率，以及每道題的平均用時。',
      features: ['可選加、減、乘、除', '簡單、普通、困難', '每道題的平均用時', '回顧你跳過的題'],
    },
    stroop: {
      title: "斯特魯普測試", desc: "選出塗的顏色，不是文字", category: "腦力",
      metaTitle: "斯特魯普測試 — 當文字與顏色矛盾時你有多快",
      long: "「紅」這個字被塗成了藍色。你要選它被塗成的顏色，而不是它寫的意思——因為閱讀是自動發生的，你必須壓住它。測量你在 45 秒裡答對多少題。",
      features: ["45 秒內答對的數量", "也混入文字與顏色一致的題", "正確答案不會固定在某個位置", "儲存最佳成績"],
    },
    'dot-count': {
      title: "數量估計測試", desc: "剛才看到幾個點", category: "感官",
      metaTitle: "數量估計測試 — 一眼判斷數量的能力",
      long: "圓點閃現後消失。別數，憑感覺估。關卡越高點越多、時間越短，最後根本來不及一個個數。誤差按占正確數的比例計算，所以後面的關卡不會變得過於寬鬆。",
      features: ["點數與顯示時間同時收緊", "誤差按占正確數的比例計分", "每關累計分數", "儲存最佳成績"],
    },
    nback: {
      title: "N-back 測試", desc: "記住 n 步之前是哪一格", category: "記憶",
      metaTitle: "N-back 測試 — 衡量工作記憶的標準任務",
      long: "格子一個接一個亮起。當前這個與 n 步之前相同時按下。你要一邊記住最近幾個，一邊不停更新，所以這個任務被廣泛用來衡量工作記憶。誤按會被扣分，全部都按是拿不到分的。",
      features: ["1-back、2-back、3-back", "約三成是刻意安排的相同", "誤按會從分數中扣除", "命中、漏掉、誤按分開顯示"],
    },
    rotation: {
      title: "心理旋轉測試", desc: "這兩個圖形轉一下會一樣嗎", category: "腦力",
      metaTitle: "心理旋轉測試 — 在腦中把圖形轉起來",
      long: "出現兩個圖形。判斷其中一個轉一下會不會變成另一個。「不一樣」的題是用鏡像做的，格子數相同、樣子也接近——你真的得在腦子裡把它轉過來。",
      features: ["「不一樣」的題用鏡像產生", "關卡越高格子越多", "對稱圖形會被剔除，避免答案出錯", "儲存最佳成績"],
    },
    beat: {
      title: "節奏感測試", desc: "聲音停了也要保持節拍", category: "感官",
      metaTitle: "節奏感測試 — 節拍器停下後你還能穩住速度嗎",
      long: "先響四拍，之後你要在無聲中用同樣的速度點八下。它不只看平均誤差，還看你有多穩——總是慢一點點，比忽快忽慢的節奏感更好。",
      features: ["80、100、120 BPM", "平均誤差與穩定度一起計分", "25 毫秒以內不扣分", "儲存最佳成績"],
    },
    peripheral: {
      title: "周邊視野測試", desc: "盯著中間，抓住邊緣", category: "速度",
      metaTitle: "周邊視野測試 — 直視前方時你能看多寬",
      long: "眼睛盯住中間的點，點掉邊緣出現的目標。目標只出現在中間留空的環形區域內，關卡越高環越往外。超時就結束，沒有餘地把眼睛移過去找。",
      features: ["目標絕不出現在中間", "關卡越高環越往外", "目標在各個方向均勻出現", "儲存最佳成績"],
    },
    '2048': {
      title: "2048 遊戲", desc: "滑動合併相同的數字，做出 2048", category: "腦力",
      metaTitle: "2048 遊戲 — 滑動合併數字的方塊拼圖，免費直接玩",
      long: "把棋盤往四個方向推，合併相同的數字。一次推動中同一格只合併一次，所以 4·4·4·4 推成 8·8 而不是 16；往推不動的方向推，盤面不變也不會出新格子。做出 2048 之後還能繼續玩，而且隨時可以退回一步。",
      features: ["方向鍵、WASD 或滑動", "分數是合出來的數字之和", "做出 2048 之後還能繼續", "退回一步，儲存最佳成績"],
    },
    minesweeper: {
      title: "踩地雷", desc: "只靠數字圈出地雷的位置", category: "腦力",
      metaTitle: "踩地雷 — 初級、中級、高級棋盤，打開就能玩",
      long: "數字是緊挨著這一格的八格裡有幾顆地雷，線索只有這一個。第一格一定安全，周圍也沒有地雷，所以棋盤會開出一大片，第一手就能靠推理而不是靠猜。三種棋盤的最好成績分別保存。",
      features: ["初級9×9、中級16×16、高級30×16", "第一次點擊絕不會是地雷", "手機上用旗子按鈕或長按", "按難度分別保存最好成績", "同時顯示棋盤的3BV（最少點擊數）"],
    },
    sudoku: {
      title: "數獨", desc: "把9×9的盤面用1到9填滿", category: "腦力",
      metaTitle: "數獨 — 簡單、普通、困難，每道題只有一個答案",
      long: "把盤面填滿，讓每一列、每一欄、每個3×3宮裡1到9各出現一次。題目是從填滿的盤面上一格一格挖出來的，每挖一格都確認答案仍然只剩一個，所以這裡不會出現有兩個答案的題。難度不看空格多少，只看解題要用到的方法。",
      features: ["按解題方法分的簡單、普通、困難", "絕不出有多個答案的題", "提示會說出理由，不只給數字", "候選筆記和還原一步", "按難度分別保存最快成績"],
    },
    sliding: {
      title: "數字華容道", desc: "推動數字，按順序排好", category: "腦力",
      metaTitle: "數字華容道 — 15 拼圖，3×3、4×4、5×5 直接玩",
      long: "把數字推進空格，從左上角按順序排好就完成。這個拼圖有一半的排法無論怎麼推都拼不出來，所以每次打亂都先數一遍逆序數來判斷能不能解 — 給你的盤面一定能解。還會顯示剩下的曼哈頓距離，那是還需要多少步的下限。",
      features: ["3×3、4×4、5×5 三種盤面", "絕不給出無解的盤面", "點同一行更遠的方塊可以一次推好幾個", "一步一步退回", "剩餘距離顯示還差多少", "按盤面大小分別保存最好成績"],
    },
  },
};

/** 언어별 분류 순서. 여기 문자열은 위 category와 글자까지 같아야 한다 */
export const GAME_CATEGORY_ORDER: Record<GameIntlLang, string[]> = {
  en: ['Speed', 'Memory', 'Senses', 'Brain'],
  es: ['Velocidad', 'Memoria', 'Sentidos', 'Cerebro'],
  'pt-br': ['Velocidade', 'Memória', 'Sentidos', 'Cérebro'],
  ja: ['スピード', '記憶', '感覚', '計算'],
  de: ['Schnelligkeit', 'Gedächtnis', 'Sinne', 'Kopf'],
  fr: ['Vitesse', 'Mémoire', 'Sens', 'Calcul'],
  hi: ['गति', 'स्मृति', 'इंद्रियाँ', 'गणित'],
  'zh-hans': ['速度', '记忆', '感官', '脑力'],
  'zh-hant': ['速度', '記憶', '感官', '腦力'],
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function gameToolsIntl(lang: GameIntlLang): GameTool[] {
  return GAME_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findGameToolIntl(lang: GameIntlLang, slug: string): GameTool | undefined {
  return gameToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedGameToolsIntl(lang: GameIntlLang, slug: string, count = 4): GameTool[] {
  /*
   * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
   * 전에는 `[...same, ...rest].slice(0, count)`였고, 그러면 갈래의 앞에서
   * 넉 개만 뽑혀 뒤쪽 도구에 **들어오는 링크가 0**이 됐다 — 여덟 섹션에서
   * 열두 도구가 그 상태였고 열 언어이므로 120쪽이었다.
   */
  return relatedBySlug(gameToolsIntl(lang), slug, count, (a, b) => a.category === b.category);
}

/** 라우트가 그대로 쓰는 메타데이터 — 문구를 라이브러리 한 곳에만 둔다 */
export function gameMetaIntl(lang: GameIntlLang, slug: string) {
  const t = findGameToolIntl(lang, slug);
  if (!t) throw new Error(`game-tools-intl: 도구가 없다 — ${slug}`);
  return withCard({
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/game/${slug}`),
      languages: alternateLanguages10(`/game/${slug}`),
    },
  });
}

export function gameHubMetaIntl(lang: GameIntlLang) {
  const ui = GAME_SHELL_UI[lang];
  return withCard({
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/game'),
      languages: alternateLanguages10('/game'),
    },
  });
}

/** 셸·허브 UI 문구 */
export const GAME_SHELL_UI: Record<GameIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Brain games',
    canDo: 'What this game does', others: 'Other games',
    notice: '🎮 Your best scores stay on this device. No sign-up, nothing uploaded.',
    footNote: 'These are for fun, not diagnostic tests. Scores shift with your screen, mouse and how tired you are.',
    hubTitle: 'Brain Games — Reaction, Memory, Typing, Aim, Mental Maths',
    hubDesc: 'Free brain games in your browser: reaction time, click speed, aim trainer, typing speed, sequence and number memory, colour discrimination, hearing frequency and mental maths.',
    hubLead: 'For fun, not diagnosis — and your scores stay on this device.',
    hubFoot: 'Free brain games', eyebrow: 'Games',
  },
  es: {
    home: 'Inicio', section: 'Juegos mentales',
    canDo: 'Qué hace este juego', others: 'Otros juegos',
    notice: '🎮 Tus mejores marcas se quedan en este aparato. Sin registro y sin subir nada.',
    footNote: 'Son para pasarlo bien, no pruebas diagnósticas. Las marcas cambian según tu pantalla, tu ratón y lo cansado que estés.',
    hubTitle: 'Juegos mentales — Reacción, memoria, escritura, puntería, cálculo',
    hubDesc: 'Juegos mentales gratis en tu navegador: tiempo de reacción, velocidad de clic, entrenador de puntería, velocidad de escritura, memoria de secuencias y de números, discriminación de color, frecuencia auditiva y cálculo mental.',
    hubLead: 'Para pasarlo bien, no para diagnosticar — y tus marcas se quedan en este aparato.',
    hubFoot: 'Juegos mentales gratis', eyebrow: 'Juegos',
  },
  'pt-br': {
    home: 'Início', section: 'Jogos mentais',
    canDo: 'O que este jogo faz', others: 'Outros jogos',
    notice: '🎮 Suas melhores marcas ficam neste aparelho. Sem cadastro e sem enviar nada.',
    footNote: 'São para se divertir, não testes diagnósticos. As marcas mudam conforme sua tela, seu mouse e o quanto você está cansado.',
    hubTitle: 'Jogos mentais — Reação, memória, digitação, mira, cálculo',
    hubDesc: 'Jogos mentais grátis no navegador: tempo de reação, velocidade de clique, treino de mira, velocidade de digitação, memória de sequência e de números, discriminação de cor, frequência auditiva e cálculo mental.',
    hubLead: 'Para se divertir, não para diagnosticar — e suas marcas ficam neste aparelho.',
    hubFoot: 'Jogos mentais grátis', eyebrow: 'Jogos',
  },
  ja: {
    home: 'ホーム', section: '脳トレゲーム',
    canDo: 'このゲームでできること', others: 'ほかのゲーム',
    notice: '🎮 記録はこの端末に残ります。登録もアップロードもありません。',
    footNote: '診断ではなく遊びです。画面やマウス、そのときの疲れ具合で記録は変わります。',
    hubTitle: '脳トレゲーム — 反応速度・記憶・タイピング・エイム・暗算',
    hubDesc: 'ブラウザで遊べる無料の脳トレ：反応速度、クリック速度、エイム練習、タイピング速度、順番記憶と数字記憶、色の見分け、可聴周波数、暗算。',
    hubLead: '診断ではなく遊びです。記録はこの端末に残ります。',
    hubFoot: '無料の脳トレゲーム', eyebrow: 'Games',
  },
  de: {
    home: 'Start', section: 'Denkspiele',
    canDo: 'Was dieses Spiel macht', others: 'Weitere Spiele',
    notice: '🎮 Deine Bestwerte bleiben auf diesem Gerät. Keine Anmeldung, nichts wird hochgeladen.',
    footNote: 'Das ist Spaß, keine Diagnostik. Die Werte verschieben sich mit Bildschirm, Maus und Tagesform.',
    hubTitle: 'Denkspiele — Reaktion, Gedächtnis, Tippen, Zielen, Kopfrechnen',
    hubDesc: 'Kostenlose Denkspiele im Browser: Reaktionszeit, Klickgeschwindigkeit, Ziel-Training, Tippgeschwindigkeit, Reihenfolge- und Zahlengedächtnis, Farbunterscheidung, Hörfrequenz und Kopfrechnen.',
    hubLead: 'Zum Spaß, nicht zur Diagnose — und deine Werte bleiben auf diesem Gerät.',
    hubFoot: 'Kostenlose Denkspiele', eyebrow: 'Spiele',
  },
  fr: {
    home: 'Accueil', section: 'Jeux de cerveau',
    canDo: 'Ce que fait ce jeu', others: 'Autres jeux',
    notice: '🎮 Tes meilleurs scores restent sur cet appareil. Sans inscription, rien n’est envoyé.',
    footNote: 'C’est pour s’amuser, pas des tests diagnostiques. Les scores bougent selon ton écran, ta souris et ta fatigue.',
    hubTitle: 'Jeux de cerveau — Réaction, mémoire, frappe, visée, calcul',
    hubDesc: 'Jeux de cerveau gratuits dans le navigateur : temps de réaction, vitesse de clic, entraînement à la visée, vitesse de frappe, mémoire de séquence et des chiffres, discrimination des couleurs, fréquence auditive et calcul mental.',
    hubLead: 'Pour s’amuser, pas pour diagnostiquer — et tes scores restent sur cet appareil.',
    hubFoot: 'Jeux de cerveau gratuits', eyebrow: 'Jeux',
  },
  hi: {
    home: 'होम', section: 'दिमाग़ी खेल',
    canDo: 'यह खेल क्या करता है', others: 'अन्य खेल',
    notice: '🎮 आपके सबसे अच्छे अंक इसी उपकरण में रहते हैं। कोई रजिस्ट्रेशन नहीं, कुछ अपलोड नहीं।',
    footNote: 'ये मनोरंजन के लिए हैं, कोई निदान जाँच नहीं। स्क्रीन, माउस और थकान के हिसाब से अंक बदलते हैं।',
    hubTitle: 'दिमाग़ी खेल — प्रतिक्रिया, स्मृति, टाइपिंग, निशाना, गणित',
    hubDesc: 'ब्राउज़र में मुफ़्त दिमाग़ी खेल: प्रतिक्रिया समय, क्लिक गति, निशाना अभ्यास, टाइपिंग गति, क्रम और अंक स्मृति, रंग पहचान, श्रवण आवृत्ति और मानसिक गणित।',
    hubLead: 'मनोरंजन के लिए, निदान के लिए नहीं — और अंक इसी उपकरण में रहते हैं।',
    hubFoot: 'मुफ़्त दिमाग़ी खेल', eyebrow: 'खेल',
  },
  'zh-hans': {
    home: '首页',
    section: '脑力小游戏',
    canDo: '这个游戏做什么',
    others: '其他游戏',
    notice: '🎮 最好成绩留在这台设备上。不用注册，什么都不上传。',
    footNote: '这些是玩的，不是诊断测试。成绩会随屏幕、鼠标和你累不累而变。',
    hubTitle: '脑力小游戏 — 反应、记忆、打字、瞄准、心算',
    hubDesc: '浏览器里的免费脑力小游戏：反应速度、点击速度、瞄准训练、打字速度、顺序与数字记忆、颜色分辨、听力频率和心算。',
    hubLead: '是玩不是诊断 — 成绩也只留在这台设备上。',
    hubFoot: '免费脑力小游戏',
    eyebrow: '游戏',
  },
  'zh-hant': {
    home: '首頁',
    section: '腦力小遊戲',
    canDo: '這個遊戲做什麼',
    others: '其他遊戲',
    notice: '🎮 最好成績留在這台裝置上。不用註冊，什麼都不上傳。',
    footNote: '這些是玩的，不是診斷測試。成績會隨螢幕、滑鼠和你累不累而變。',
    hubTitle: '腦力小遊戲 — 反應、記憶、打字、瞄準、心算',
    hubDesc: '瀏覽器裡的免費腦力小遊戲：反應速度、點擊速度、瞄準訓練、打字速度、順序與數字記憶、顏色分辨、聽力頻率和心算。',
    hubLead: '是玩不是診斷 — 成績也只留在這台裝置上。',
    hubFoot: '免費腦力小遊戲',
    eyebrow: '遊戲',
  },
};
