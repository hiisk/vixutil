// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { GameTool } from './game-tools.ts';
import { GAME_TOOLS } from './game-tools.ts';
import { alternateLanguages, localeHref, openGraphFor, type IntlLocale } from './locales.ts';

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
export type GameIntlLang = IntlLocale;

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
  const all = gameToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 라우트가 그대로 쓰는 메타데이터 — 문구를 라이브러리 한 곳에만 둔다 */
export function gameMetaIntl(lang: GameIntlLang, slug: string) {
  const t = findGameToolIntl(lang, slug);
  if (!t) throw new Error(`game-tools-intl: 도구가 없다 — ${slug}`);
  return {
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/game/${slug}`),
      languages: alternateLanguages(`/game/${slug}`),
    },
  };
}

export function gameHubMetaIntl(lang: GameIntlLang) {
  const ui = GAME_SHELL_UI[lang];
  return {
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/game'),
      languages: alternateLanguages('/game'),
    },
  };
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
};
