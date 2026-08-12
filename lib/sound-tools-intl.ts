// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { SoundTool } from './sound-tools.ts';
import { SOUND_TOOLS } from './sound-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from './locales.ts';
import { withCard } from './og-cards/index.ts';
import { relatedBySlug } from './related-window.ts';

/**
 * 소리 도구(/sound) 섹션의 번역 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는 문구만 갈아 끼운다.
 *
 * 바이노럴 비트처럼 효과가 입증되지 않은 것은 여덟 언어 모두에서 그대로 밝힌다.
 * 과장된 검색어가 많은 주제라 오히려 여기서 물러설 이유가 없다.
 */
export type SoundIntlLang = Exclude<AnyLocale10, 'ko'>;

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<SoundIntlLang, Record<string, ToolCopy>> = {
  en: {
    metronome: {
      title: 'Metronome', desc: 'Keeps a steady beat for practice', category: 'Practice',
      metaTitle: 'Online Metronome — Free, Adjustable BPM',
      long: 'Set a BPM and it clicks at exact intervals. Choose a time signature like 4/4 and the first beat gets an accent, so you can hear which beat you are on.',
      features: ['BPM from 30 to 240', 'Accents for 2, 3, 4 and 6 beats', 'Beat shown visually', 'Tap to find the BPM'],
    },
    tuner: {
      title: 'Instrument Tuner', desc: 'Listens through the mic and names the note', category: 'Practice',
      metaTitle: 'Online Guitar Tuner — Free Tuner for Guitar and Ukulele',
      long: 'Play into the mic and it tells you which note it is and how far above or below pitch you are, in cents. You can also listen to the open-string reference notes for guitar, ukulele and bass.',
      features: ['Live note and frequency', 'Error from the reference in cents', 'Open-string references for guitar and ukulele', 'Adjustable A440 reference'],
    },
    pitch: {
      title: 'Interval Ear Training', desc: 'Name the interval between two notes', category: 'Practice',
      metaTitle: 'Interval Ear Training — Practise Relative Pitch Free',
      long: 'It plays two notes in turn and you name the interval between them — a major third, a perfect fifth. You do not need perfect pitch; once you know the distances, chords and melodies get much easier to follow.',
      features: ['Hear an interval and name it', 'Interval range by difficulty', 'Accuracy and streak tracked', 'Replay and check the reference note'],
    },
    'bpm-tap': {
      title: 'BPM Tap Counter', desc: 'Tap along and it works out the tempo', category: 'Practice',
      metaTitle: 'BPM Tap Counter — Find a Song’s Tempo by Tapping',
      long: 'Tap any key along with the music and it calculates beats per minute. About eight taps is enough to settle, and because it weights recent taps it follows a tempo that changes mid-way.',
      features: ['BPM from the gaps between your taps', 'Averaged toward your recent taps', 'Shows how steady your tapping is', 'Open the metronome at the measured BPM'],
    },
    noise: {
      title: 'White Noise Generator', desc: 'Noise to help you focus or sleep', category: 'Focus and sleep',
      metaTitle: 'White Noise Generator — White, Pink and Brown Noise Free',
      long: 'Generates and plays white, pink and brown noise. It masks the sounds around you to help with focus or sleep; brown noise, with its stronger low end, is closest to ocean waves and easiest on the ears.',
      features: ['White, pink or brown', 'Volume plus low and high adjustment', 'Stops itself after a timer', 'Plays instantly — no file to download'],
    },
    binaural: {
      title: 'Binaural Beats', desc: 'A beat made from two slightly different tones', category: 'Focus and sleep',
      metaTitle: 'Binaural Beats Generator — Delta, Theta, Alpha and Beta',
      long: 'Play slightly different frequencies into your left and right ear and you perceive a slow beat at the difference between them. Headphones are essential, and the scientific evidence for any effect is still unclear.',
      features: ['Adjustable base frequency and difference', 'Delta, theta, alpha and beta presets', 'Separate left and right channels', 'Tells you headphones are required'],
    },
    decibel: {
      title: 'Sound Level Meter', desc: 'See how loud it is around you', category: 'Measure',
      metaTitle: 'Sound Level Meter — Check Noise With Your Mic',
      long: 'Shows the level of what comes through your mic in relative decibels. Compare against references like a library, conversation or a subway to gauge where you are. Mics differ by device, so this is not an absolute measurement.',
      features: ['Live noise level', 'Peak and average recorded', 'Compared against everyday noise', 'Notes on device calibration'],
    },
    recorder: {
      title: 'Voice Recorder', desc: 'Record, listen back and save a file', category: 'Measure',
      metaTitle: 'Online Voice Recorder — Record and Save in the Browser',
      long: 'Record with nothing installed, listen back straight away and download the file. Recording happens inside the browser and is never sent to a server, so meeting notes or pronunciation practice are safe here.',
      features: ['Record, pause and play back', 'Waveform while recording', 'Save as a file', 'Choose the mic device'],
    },
    tone: {
      title: 'Tone Generator', desc: 'Make a sound at any pitch you want', category: 'Signals',
      metaTitle: 'Online Tone Generator — Play Any Hz Sine Wave',
      long: 'Generates any frequency from 20Hz to 20kHz. Sine, square and sawtooth waves are all available, which makes it useful for checking speakers, giving an instrument a reference note, or simple experiments.',
      features: ['20Hz to 20kHz slider', 'Sine, square, triangle and sawtooth', 'Choose left or right channel', 'Guidance on safe volume'],
    },
    mosquito: {
      title: 'Mosquito Tone', desc: 'High frequencies you stop hearing with age', category: 'Signals',
      metaTitle: 'Mosquito Tone — Listen to a 17kHz High Frequency',
      long: 'Frequencies around 17kHz become harder to hear as you get older. It is called a mosquito tone because supposedly only teenagers hear it — play through the frequencies and find where yours stops.',
      features: ['15k to 20kHz in steps', 'Typical range by age', 'Volume limited for safety', 'Headphones recommended'],
    },
  },

  es: {
    metronome: {
      title: 'Metrónomo', desc: 'Marca un pulso constante para practicar', category: 'Práctica',
      metaTitle: 'Metrónomo online — Gratis y con BPM ajustable',
      long: 'Fija los BPM y suena a intervalos exactos. Elige un compás como 4/4 y el primer pulso se acentúa, así oyes en qué tiempo vas.',
      features: ['BPM de 30 a 240', 'Acentos para 2, 3, 4 y 6 pulsos', 'El pulso también se ve', 'Toca para hallar los BPM'],
    },
    tuner: {
      title: 'Afinador de instrumentos', desc: 'Escucha por el micro y te dice la nota', category: 'Práctica',
      metaTitle: 'Afinador de guitarra online — Gratis, para guitarra y ukelele',
      long: 'Toca hacia el micrófono y te dice qué nota es y cuántos centésimos estás por encima o por debajo. También puedes escuchar las notas de referencia al aire de guitarra, ukelele y bajo.',
      features: ['Nota y frecuencia en vivo', 'El error respecto a la referencia en centésimos', 'Referencias al aire de guitarra y ukelele', 'Referencia A440 ajustable'],
    },
    pitch: {
      title: 'Entrenamiento de intervalos', desc: 'Reconoce el intervalo entre dos notas', category: 'Práctica',
      metaTitle: 'Entrenamiento auditivo de intervalos — Oído relativo gratis',
      long: 'Suenan dos notas seguidas y tú dices qué intervalo hay entre ellas: una tercera mayor, una quinta justa. No hace falta oído absoluto; en cuanto conoces las distancias, seguir acordes y melodías se vuelve mucho más fácil.',
      features: ['Escucha un intervalo y nómbralo', 'Rango de intervalos por dificultad', 'Acierto y racha registrados', 'Repetir y comprobar la nota de referencia'],
    },
    'bpm-tap': {
      title: 'Contador de BPM', desc: 'Marca el pulso y calcula el tempo', category: 'Práctica',
      metaTitle: 'Contador de BPM — Halla el tempo de una canción marcando',
      long: 'Pulsa cualquier tecla al ritmo de la música y calcula los pulsos por minuto. Con unas ocho pulsaciones ya se estabiliza, y como da más peso a las últimas, sigue un tempo que cambia a mitad de camino.',
      features: ['BPM a partir de los intervalos entre pulsaciones', 'Promedio inclinado a tus últimas pulsaciones', 'Muestra lo regular que eres', 'Abre el metrónomo con los BPM medidos'],
    },
    noise: {
      title: 'Generador de ruido blanco', desc: 'Ruido para concentrarte o dormir', category: 'Concentración y sueño',
      metaTitle: 'Generador de ruido blanco — Ruido blanco, rosa y marrón gratis',
      long: 'Genera y reproduce ruido blanco, rosa y marrón. Enmascara los sonidos de alrededor para ayudarte a concentrarte o dormir; el marrón, con más graves, es el más parecido a las olas y el más suave al oído.',
      features: ['Blanco, rosa o marrón', 'Volumen y ajuste de graves y agudos', 'Se detiene solo con temporizador', 'Suena al instante — sin descargar nada'],
    },
    binaural: {
      title: 'Ondas binaurales', desc: 'Un pulso que nace de dos tonos casi iguales', category: 'Concentración y sueño',
      metaTitle: 'Generador de ondas binaurales — Delta, theta, alfa y beta',
      long: 'Si suena una frecuencia algo distinta en cada oído, percibes un pulso lento igual a la diferencia entre ambas. Los auriculares son imprescindibles, y la evidencia científica de que tenga algún efecto sigue sin estar clara.',
      features: ['Frecuencia base y diferencia ajustables', 'Ajustes delta, theta, alfa y beta', 'Canales izquierdo y derecho separados', 'Te avisa de que hacen falta auriculares'],
    },
    decibel: {
      title: 'Medidor de sonido', desc: 'Mira cuánto ruido hay a tu alrededor', category: 'Medir',
      metaTitle: 'Medidor de decibelios — Mide el ruido con tu micrófono',
      long: 'Muestra en decibelios relativos el nivel de lo que entra por el micrófono. Compáralo con referencias como una biblioteca, una conversación o el metro para situarte. Los micrófonos varían según el aparato, así que no es una medida absoluta.',
      features: ['Nivel de ruido en vivo', 'Máximo y media registrados', 'Comparado con ruidos cotidianos', 'Notas sobre la calibración del aparato'],
    },
    recorder: {
      title: 'Grabadora de voz', desc: 'Graba, escúchalo y guarda el archivo', category: 'Medir',
      metaTitle: 'Grabadora de voz online — Graba y guarda en el navegador',
      long: 'Graba sin instalar nada, escúchalo al momento y descarga el archivo. La grabación ocurre dentro del navegador y nunca se envía a un servidor, así que las notas de una reunión o practicar pronunciación están seguras aquí.',
      features: ['Grabar, pausar y reproducir', 'Forma de onda mientras grabas', 'Guardar como archivo', 'Elegir el micrófono'],
    },
    tone: {
      title: 'Generador de tonos', desc: 'Produce un sonido en la frecuencia que quieras', category: 'Señales',
      metaTitle: 'Generador de tonos online — Reproduce cualquier Hz',
      long: 'Genera cualquier frecuencia de 20Hz a 20kHz. Hay ondas senoidal, cuadrada y de diente de sierra, lo que sirve para revisar altavoces, dar una nota de referencia a un instrumento o hacer experimentos sencillos.',
      features: ['Control de 20Hz a 20kHz', 'Senoidal, cuadrada, triangular y sierra', 'Elegir canal izquierdo o derecho', 'Indicaciones de volumen seguro'],
    },
    mosquito: {
      title: 'Tono mosquito', desc: 'Frecuencias altas que se dejan de oír con la edad', category: 'Señales',
      metaTitle: 'Tono mosquito — Escucha una frecuencia alta de 17kHz',
      long: 'Las frecuencias en torno a 17kHz se vuelven más difíciles de oír con los años. Se le llama tono mosquito porque supuestamente solo lo oyen los adolescentes — recorre las frecuencias y encuentra dónde se corta la tuya.',
      features: ['De 15k a 20kHz por pasos', 'Rango típico según la edad', 'Volumen limitado por seguridad', 'Se recomiendan auriculares'],
    },
  },

  'pt-br': {
    metronome: {
      title: 'Metrônomo', desc: 'Mantém um pulso firme para praticar', category: 'Prática',
      metaTitle: 'Metrônomo online — Grátis e com BPM ajustável',
      long: 'Defina o BPM e ele marca em intervalos exatos. Escolha um compasso como 4/4 e o primeiro tempo ganha acento, então você ouve em que tempo está.',
      features: ['BPM de 30 a 240', 'Acentos para 2, 3, 4 e 6 tempos', 'O tempo também aparece na tela', 'Bata para descobrir o BPM'],
    },
    tuner: {
      title: 'Afinador de instrumentos', desc: 'Ouve pelo microfone e diz a nota', category: 'Prática',
      metaTitle: 'Afinador de violão online — Grátis, para violão e ukulele',
      long: 'Toque no microfone e ele diz qual é a nota e quantos cents você está acima ou abaixo. Também dá para ouvir as notas de referência das cordas soltas de violão, ukulele e baixo.',
      features: ['Nota e frequência ao vivo', 'O erro em relação à referência em cents', 'Referências de cordas soltas de violão e ukulele', 'Referência A440 ajustável'],
    },
    pitch: {
      title: 'Treino de intervalos', desc: 'Reconheça o intervalo entre duas notas', category: 'Prática',
      metaTitle: 'Treino auditivo de intervalos — Ouvido relativo grátis',
      long: 'Duas notas tocam em sequência e você diz qual intervalo há entre elas: uma terça maior, uma quinta justa. Não precisa de ouvido absoluto; assim que você conhece as distâncias, acompanhar acordes e melodias fica muito mais fácil.',
      features: ['Ouça um intervalo e nomeie', 'Faixa de intervalos por dificuldade', 'Acerto e sequência registrados', 'Repetir e conferir a nota de referência'],
    },
    'bpm-tap': {
      title: 'Contador de BPM', desc: 'Bata no ritmo e ele calcula o tempo', category: 'Prática',
      metaTitle: 'Contador de BPM — Descubra o tempo de uma música batendo',
      long: 'Bata qualquer tecla junto com a música e ele calcula as batidas por minuto. Umas oito batidas já bastam para estabilizar, e como ele dá mais peso às últimas, acompanha um tempo que muda no meio.',
      features: ['BPM a partir dos intervalos entre as batidas', 'Média puxada para as suas últimas batidas', 'Mostra o quanto você está regular', 'Abre o metrônomo no BPM medido'],
    },
    noise: {
      title: 'Gerador de ruído branco', desc: 'Ruído para focar ou dormir', category: 'Concentração e sono',
      metaTitle: 'Gerador de ruído branco — Ruído branco, rosa e marrom grátis',
      long: 'Gera e toca ruído branco, rosa e marrom. Ele mascara os sons ao redor para ajudar a focar ou dormir; o marrom, com mais graves, é o mais parecido com ondas do mar e o mais suave no ouvido.',
      features: ['Branco, rosa ou marrom', 'Volume e ajuste de graves e agudos', 'Para sozinho com temporizador', 'Toca na hora — nada para baixar'],
    },
    binaural: {
      title: 'Batidas binaurais', desc: 'Um pulso criado por dois tons quase iguais', category: 'Concentração e sono',
      metaTitle: 'Gerador de batidas binaurais — Delta, theta, alfa e beta',
      long: 'Se toca uma frequência um pouco diferente em cada ouvido, você percebe um pulso lento igual à diferença entre as duas. Fones são indispensáveis, e a evidência científica de qualquer efeito continua incerta.',
      features: ['Frequência base e diferença ajustáveis', 'Ajustes delta, theta, alfa e beta', 'Canais esquerdo e direito separados', 'Avisa que fones são necessários'],
    },
    decibel: {
      title: 'Medidor de som', desc: 'Veja o quanto está barulhento ao seu redor', category: 'Medir',
      metaTitle: 'Medidor de decibéis — Meça o ruído com seu microfone',
      long: 'Mostra em decibéis relativos o nível do que entra pelo microfone. Compare com referências como uma biblioteca, uma conversa ou o metrô para se situar. Microfones variam de aparelho para aparelho, então não é uma medida absoluta.',
      features: ['Nível de ruído ao vivo', 'Pico e média registrados', 'Comparado com ruídos do dia a dia', 'Observações sobre calibração do aparelho'],
    },
    recorder: {
      title: 'Gravador de voz', desc: 'Grave, ouça de volta e salve o arquivo', category: 'Medir',
      metaTitle: 'Gravador de voz online — Grave e salve no navegador',
      long: 'Grave sem instalar nada, ouça na hora e baixe o arquivo. A gravação acontece dentro do navegador e nunca é enviada a um servidor, então anotações de reunião ou treino de pronúncia ficam seguros aqui.',
      features: ['Gravar, pausar e ouvir', 'Forma de onda enquanto grava', 'Salvar como arquivo', 'Escolher o microfone'],
    },
    tone: {
      title: 'Gerador de tons', desc: 'Produz um som na frequência que você quiser', category: 'Sinais',
      metaTitle: 'Gerador de tons online — Toque qualquer Hz',
      long: 'Gera qualquer frequência de 20Hz a 20kHz. Tem onda senoidal, quadrada e dente de serra, o que serve para conferir caixas de som, dar uma nota de referência a um instrumento ou fazer experimentos simples.',
      features: ['Controle de 20Hz a 20kHz', 'Senoidal, quadrada, triangular e serra', 'Escolher canal esquerdo ou direito', 'Orientação de volume seguro'],
    },
    mosquito: {
      title: 'Tom mosquito', desc: 'Frequências altas que se deixa de ouvir com a idade', category: 'Sinais',
      metaTitle: 'Tom mosquito — Ouça uma frequência alta de 17kHz',
      long: 'Frequências em torno de 17kHz vão ficando mais difíceis de ouvir com os anos. É chamado tom mosquito porque supostamente só adolescentes ouvem — passe pelas frequências e descubra onde a sua para.',
      features: ['De 15k a 20kHz em passos', 'Faixa típica por idade', 'Volume limitado por segurança', 'Fones recomendados'],
    },
  },

  ja: {
    metronome: {
      title: 'メトロノーム', desc: '練習用に一定のテンポを刻む', category: '練習',
      metaTitle: 'オンラインメトロノーム — 無料・BPM調整可',
      long: 'BPMを決めると正確な間隔で鳴ります。4分の4のように拍子を選ぶと1拍目にアクセントが付くので、いま何拍目かが耳で分かります。',
      features: ['BPMは30〜240', '2・3・4・6拍のアクセント', '拍を目でも確認できる', '叩いてBPMを合わせる'],
    },
    tuner: {
      title: '楽器チューナー', desc: 'マイクで聴いて音名を教える', category: '練習',
      metaTitle: 'オンラインギターチューナー — ギター・ウクレレ対応の無料チューナー',
      long: 'マイクに向けて弾くと、どの音か、基準からどれだけ高いか低いかをセント単位で教えます。ギター・ウクレレ・ベースの開放弦の基準音を聴くこともできます。',
      features: ['音名と周波数をその場で表示', '基準との誤差をセント単位で', 'ギター・ウクレレの開放弦の基準音', 'A440の基準を変更できる'],
    },
    pitch: {
      title: '音程当てトレーニング', desc: '二つの音の間隔を答える', category: '練習',
      metaTitle: '音程当てトレーニング — 相対音感の練習を無料で',
      long: '二つの音が続けて鳴り、その間隔を答えます — 長3度、完全5度など。絶対音感は必要ありません。距離を覚えてしまえば、和音もメロディーも追いやすくなります。',
      features: ['音程を聴いて答える', '難易度で音程の範囲が変わる', '正解数と連続正解を記録', '再生と基準音の確認'],
    },
    'bpm-tap': {
      title: 'BPMタップ計測', desc: '叩いた間隔からテンポを出す', category: '練習',
      metaTitle: 'BPMタップ計測 — 曲のテンポを叩いて調べる',
      long: '音楽に合わせてキーを叩くと1分あたりの拍数を計算します。8回ほどで値が落ち着き、直近の入力を重く見るので途中でテンポが変わってもついていきます。',
      features: ['叩いた間隔からBPMを算出', '直近の入力を重く見た平均', '叩き方のばらつきも表示', '測ったBPMでメトロノームを開く'],
    },
    noise: {
      title: 'ホワイトノイズ生成', desc: '集中や睡眠のためのノイズ', category: '集中と睡眠',
      metaTitle: 'ホワイトノイズ生成 — ホワイト・ピンク・ブラウンを無料で',
      long: 'ホワイト・ピンク・ブラウンノイズを生成して再生します。周りの音を覆って集中や睡眠を助けます。低音が強いブラウンノイズは波の音にいちばん近く、耳にやさしいです。',
      features: ['ホワイト・ピンク・ブラウン', '音量と低域・高域の調整', 'タイマーで自動停止', 'すぐ再生 — ダウンロード不要'],
    },
    binaural: {
      title: 'バイノーラルビート', desc: 'わずかに違う二つの音が作るうなり', category: '集中と睡眠',
      metaTitle: 'バイノーラルビート生成 — デルタ・シータ・アルファ・ベータ',
      long: '左右の耳にわずかに違う周波数を流すと、その差の分だけゆっくりしたうなりが聞こえます。イヤホンが必須で、効果があるかどうかの科学的な裏づけは今もはっきりしていません。',
      features: ['基準周波数と差を調整', 'デルタ・シータ・アルファ・ベータのプリセット', '左右チャンネルを分けて出力', 'イヤホンが必要だと明示'],
    },
    decibel: {
      title: '騒音計', desc: '周りがどれくらいうるさいかを見る', category: '測定',
      metaTitle: '騒音計 — マイクで周りの音の大きさを測る',
      long: 'マイクから入る音の大きさを相対デシベルで表示します。図書館、会話、地下鉄といった目安と比べて位置をつかめます。マイクの感度は機種ごとに違うので、絶対的な測定ではありません。',
      features: ['いまの騒音レベル', '最大値と平均を記録', '生活騒音と比較', '機種による誤差の説明'],
    },
    recorder: {
      title: 'ボイスレコーダー', desc: '録音して聴き返し、ファイルに保存', category: '測定',
      metaTitle: 'オンラインボイスレコーダー — ブラウザで録音して保存',
      long: '何も入れずに録音でき、その場で聴き返してファイルを保存できます。録音はブラウザの中で作られ、サーバーには送られません。会議メモや発音練習にも安心して使えます。',
      features: ['録音・一時停止・再生', '録音中の波形表示', 'ファイルとして保存', 'マイクの機器を選べる'],
    },
    tone: {
      title: 'トーンジェネレーター', desc: '好きな高さの音を出す', category: '信号音',
      metaTitle: 'オンライントーンジェネレーター — 任意のHzを再生',
      long: '20Hzから20kHzまで、どの周波数でも出せます。サイン波・矩形波・のこぎり波があるので、スピーカーの確認、楽器の基準音、簡単な実験に使えます。',
      features: ['20Hz〜20kHzのスライダー', 'サイン・矩形・三角・のこぎり', '左右チャンネルを選べる', '安全な音量の目安'],
    },
    mosquito: {
      title: 'モスキート音', desc: '年齢とともに聞こえなくなる高い音', category: '信号音',
      metaTitle: 'モスキート音 — 17kHzの高周波を聴いてみる',
      long: '17kHz付近の音は年を重ねるほど聞き取りにくくなります。十代にしか聞こえないと言われることからモスキート音と呼ばれます — 順に鳴らして自分の上限を探してみてください。',
      features: ['15k〜20kHzを段階的に', '年齢ごとの目安', '安全のため音量を制限', 'イヤホン推奨'],
    },
  },

  de: {
    metronome: {
      title: 'Metronom', desc: 'Hält beim Üben ein gleichmäßiges Tempo', category: 'Üben',
      metaTitle: 'Online-Metronom — Kostenlos, BPM einstellbar',
      long: 'Stell die BPM ein und es klickt in exakten Abständen. Wähle eine Taktart wie 4/4, dann wird die Eins betont — so hörst du, auf welchem Schlag du bist.',
      features: ['BPM von 30 bis 240', 'Betonung bei 2, 3, 4 und 6 Schlägen', 'Der Schlag ist auch sichtbar', 'Antippen, um die BPM zu finden'],
    },
    tuner: {
      title: 'Instrumentenstimmgerät', desc: 'Hört über das Mikrofon und nennt den Ton', category: 'Üben',
      metaTitle: 'Online-Gitarrenstimmgerät — Kostenlos für Gitarre und Ukulele',
      long: 'Spiel ins Mikrofon und es sagt dir, welcher Ton es ist und um wie viele Cent du darüber oder darunter liegst. Die Referenztöne der leeren Saiten von Gitarre, Ukulele und Bass kannst du dir auch anhören.',
      features: ['Ton und Frequenz in Echtzeit', 'Abweichung von der Referenz in Cent', 'Referenztöne für Gitarre und Ukulele', 'A440-Referenz einstellbar'],
    },
    pitch: {
      title: 'Intervall-Gehörtraining', desc: 'Den Abstand zwischen zwei Tönen benennen', category: 'Üben',
      metaTitle: 'Intervall-Gehörtraining — Relatives Gehör kostenlos üben',
      long: 'Zwei Töne erklingen nacheinander und du benennst das Intervall dazwischen — eine große Terz, eine reine Quinte. Absolutes Gehör brauchst du nicht; sobald du die Abstände kennst, folgst du Akkorden und Melodien deutlich leichter.',
      features: ['Intervall hören und benennen', 'Intervallumfang je Schwierigkeit', 'Treffer und Serie werden mitgezählt', 'Wiederholen und Referenzton prüfen'],
    },
    'bpm-tap': {
      title: 'BPM-Tapper', desc: 'Mittippen und das Tempo wird berechnet', category: 'Üben',
      metaTitle: 'BPM-Tapper — Das Tempo eines Songs durch Tippen finden',
      long: 'Tippe eine beliebige Taste zur Musik mit und es berechnet die Schläge pro Minute. Etwa acht Anschläge reichen, bis sich der Wert einpendelt, und weil die letzten stärker gewichtet werden, folgt er auch einem Tempo, das sich unterwegs ändert.',
      features: ['BPM aus den Abständen deiner Anschläge', 'Mittelwert zu den letzten Anschlägen hin gewichtet', 'Zeigt, wie gleichmäßig du tippst', 'Metronom mit dem gemessenen BPM öffnen'],
    },
    noise: {
      title: 'Weißes-Rauschen-Generator', desc: 'Rauschen zum Konzentrieren oder Einschlafen', category: 'Konzentration und Schlaf',
      metaTitle: 'Weißes-Rauschen-Generator — Weißes, rosa und braunes Rauschen',
      long: 'Erzeugt und spielt weißes, rosa und braunes Rauschen. Es überdeckt die Geräusche um dich herum und hilft beim Konzentrieren oder Einschlafen; braunes Rauschen mit seinem kräftigeren Bass kommt Meereswellen am nächsten und ist am angenehmsten.',
      features: ['Weiß, rosa oder braun', 'Lautstärke plus Bass- und Höhenregelung', 'Schaltet sich per Timer selbst ab', 'Spielt sofort — kein Download'],
    },
    binaural: {
      title: 'Binaurale Beats', desc: 'Ein Schweben aus zwei leicht verschiedenen Tönen', category: 'Konzentration und Schlaf',
      metaTitle: 'Binaurale Beats — Delta, Theta, Alpha und Beta',
      long: 'Spielt links und rechts leicht verschiedene Frequenzen, und du nimmst ein langsames Schweben in Höhe der Differenz wahr. Kopfhörer sind zwingend, und die wissenschaftliche Belegbarkeit einer Wirkung ist weiterhin unklar.',
      features: ['Grundfrequenz und Differenz einstellbar', 'Vorlagen für Delta, Theta, Alpha und Beta', 'Linker und rechter Kanal getrennt', 'Weist darauf hin, dass Kopfhörer nötig sind'],
    },
    decibel: {
      title: 'Schallpegelmesser', desc: 'Sieh, wie laut es um dich herum ist', category: 'Messen',
      metaTitle: 'Schallpegelmesser — Lärm mit dem Mikrofon prüfen',
      long: 'Zeigt den Pegel dessen, was durch dein Mikrofon kommt, in relativen Dezibel. Vergleiche mit Anhaltspunkten wie Bibliothek, Gespräch oder U-Bahn, um dich einzuordnen. Mikrofone unterscheiden sich je Gerät, also ist das keine absolute Messung.',
      features: ['Lärmpegel in Echtzeit', 'Spitze und Mittelwert aufgezeichnet', 'Verglichen mit Alltagsgeräuschen', 'Hinweise zur Gerätekalibrierung'],
    },
    recorder: {
      title: 'Diktiergerät', desc: 'Aufnehmen, anhören und als Datei speichern', category: 'Messen',
      metaTitle: 'Online-Diktiergerät — Im Browser aufnehmen und speichern',
      long: 'Nimm ohne Installation auf, hör es direkt ab und lade die Datei herunter. Die Aufnahme entsteht im Browser und wird nie an einen Server geschickt — Besprechungsnotizen oder Aussprachetraining sind hier also sicher.',
      features: ['Aufnehmen, pausieren und abspielen', 'Wellenform während der Aufnahme', 'Als Datei speichern', 'Mikrofon auswählen'],
    },
    tone: {
      title: 'Tongenerator', desc: 'Erzeugt einen Ton in jeder gewünschten Höhe', category: 'Signaltöne',
      metaTitle: 'Online-Tongenerator — Jede Hz-Zahl abspielen',
      long: 'Erzeugt jede Frequenz von 20Hz bis 20kHz. Sinus, Rechteck und Sägezahn stehen bereit — nützlich zum Prüfen von Lautsprechern, als Referenzton für ein Instrument oder für einfache Versuche.',
      features: ['Regler von 20Hz bis 20kHz', 'Sinus, Rechteck, Dreieck und Sägezahn', 'Linken oder rechten Kanal wählen', 'Hinweise zur sicheren Lautstärke'],
    },
    mosquito: {
      title: 'Mosquito-Ton', desc: 'Hohe Frequenzen, die man mit dem Alter verliert', category: 'Signaltöne',
      metaTitle: 'Mosquito-Ton — Eine hohe Frequenz von 17kHz hören',
      long: 'Frequenzen um 17kHz werden mit den Jahren schwerer zu hören. Mosquito-Ton heißt er, weil ihn angeblich nur Jugendliche wahrnehmen — geh die Frequenzen durch und finde, wo deine Grenze liegt.',
      features: ['15k bis 20kHz in Stufen', 'Typischer Bereich nach Alter', 'Lautstärke aus Sicherheitsgründen begrenzt', 'Kopfhörer empfohlen'],
    },
  },

  fr: {
    metronome: {
      title: 'Métronome', desc: 'Tient une pulsation régulière pour travailler', category: 'S’entraîner',
      metaTitle: 'Métronome en ligne — Gratuit, BPM réglable',
      long: 'Règle le BPM et il clique à intervalles exacts. Choisis une mesure comme 4/4 et le premier temps est accentué : tu entends sur quel temps tu es.',
      features: ['BPM de 30 à 240', 'Accents pour 2, 3, 4 et 6 temps', 'Le temps est aussi visible', 'Tape pour trouver le BPM'],
    },
    tuner: {
      title: 'Accordeur d’instrument', desc: 'Écoute par le micro et nomme la note', category: 'S’entraîner',
      metaTitle: 'Accordeur de guitare en ligne — Gratuit, guitare et ukulélé',
      long: 'Joue dans le micro et il te dit quelle note c’est et de combien de cents tu es au-dessus ou en dessous. Tu peux aussi écouter les notes de référence des cordes à vide de guitare, ukulélé et basse.',
      features: ['Note et fréquence en direct', 'L’écart à la référence en cents', 'Références à vide pour guitare et ukulélé', 'Référence A440 réglable'],
    },
    pitch: {
      title: 'Entraînement aux intervalles', desc: 'Reconnaître l’écart entre deux notes', category: 'S’entraîner',
      metaTitle: 'Entraînement de l’oreille aux intervalles — Oreille relative',
      long: 'Deux notes se succèdent et tu nommes l’intervalle entre elles — une tierce majeure, une quinte juste. Pas besoin d’oreille absolue : dès que tu connais les distances, suivre accords et mélodies devient bien plus facile.',
      features: ['Écouter un intervalle et le nommer', 'Étendue des intervalles selon la difficulté', 'Réussite et série comptées', 'Réécouter et vérifier la note de référence'],
    },
    'bpm-tap': {
      title: 'Compteur de BPM', desc: 'Tape le tempo et il le calcule', category: 'S’entraîner',
      metaTitle: 'Compteur de BPM — Trouver le tempo d’un morceau en tapant',
      long: 'Tape n’importe quelle touche avec la musique et il calcule les battements par minute. Une huitaine de frappes suffit à stabiliser la valeur, et comme les dernières comptent davantage, il suit un tempo qui change en route.',
      features: ['BPM à partir des écarts entre tes frappes', 'Moyenne penchée vers tes dernières frappes', 'Montre à quel point tu es régulier', 'Ouvre le métronome au BPM mesuré'],
    },
    noise: {
      title: 'Générateur de bruit blanc', desc: 'Du bruit pour se concentrer ou dormir', category: 'Concentration et sommeil',
      metaTitle: 'Générateur de bruit blanc — Bruit blanc, rose et brun gratuit',
      long: 'Génère et joue du bruit blanc, rose et brun. Il masque les sons autour de toi pour aider à te concentrer ou à dormir ; le brun, plus riche en graves, est le plus proche des vagues et le plus doux à l’oreille.',
      features: ['Blanc, rose ou brun', 'Volume plus réglage des graves et des aigus', 'S’arrête tout seul avec un minuteur', 'Joue tout de suite — rien à télécharger'],
    },
    binaural: {
      title: 'Sons binauraux', desc: 'Un battement né de deux tons presque identiques', category: 'Concentration et sommeil',
      metaTitle: 'Générateur de sons binauraux — Delta, thêta, alpha et bêta',
      long: 'Envoie des fréquences légèrement différentes dans chaque oreille et tu perçois un battement lent égal à leur écart. Le casque est indispensable, et les preuves scientifiques d’un quelconque effet restent floues.',
      features: ['Fréquence de base et écart réglables', 'Préréglages delta, thêta, alpha et bêta', 'Canaux gauche et droit séparés', 'Prévient qu’un casque est nécessaire'],
    },
    decibel: {
      title: 'Sonomètre', desc: 'Vois le niveau de bruit autour de toi', category: 'Mesurer',
      metaTitle: 'Sonomètre — Mesurer le bruit avec ton micro',
      long: 'Affiche en décibels relatifs le niveau de ce qui entre par le micro. Compare avec des repères comme une bibliothèque, une conversation ou le métro pour te situer. Les micros diffèrent selon l’appareil : ce n’est pas une mesure absolue.',
      features: ['Niveau de bruit en direct', 'Crête et moyenne enregistrées', 'Comparé aux bruits du quotidien', 'Notes sur le calibrage de l’appareil'],
    },
    recorder: {
      title: 'Dictaphone', desc: 'Enregistre, réécoute et sauvegarde le fichier', category: 'Mesurer',
      metaTitle: 'Dictaphone en ligne — Enregistrer et sauvegarder dans le navigateur',
      long: 'Enregistre sans rien installer, réécoute aussitôt et télécharge le fichier. L’enregistrement se fait dans le navigateur et n’est jamais envoyé à un serveur : notes de réunion ou travail de prononciation sont ici en sécurité.',
      features: ['Enregistrer, mettre en pause et réécouter', 'Forme d’onde pendant l’enregistrement', 'Sauvegarder en fichier', 'Choisir le micro'],
    },
    tone: {
      title: 'Générateur de sons', desc: 'Produit un son à la hauteur que tu veux', category: 'Signaux',
      metaTitle: 'Générateur de sons en ligne — Jouer n’importe quel Hz',
      long: 'Génère toute fréquence de 20Hz à 20kHz. Sinus, carré et dent de scie sont disponibles, ce qui sert à vérifier des enceintes, donner une note de référence à un instrument ou faire de simples expériences.',
      features: ['Curseur de 20Hz à 20kHz', 'Sinus, carré, triangle et dent de scie', 'Choisir le canal gauche ou droit', 'Conseils de volume sûr'],
    },
    mosquito: {
      title: 'Son mosquito', desc: 'Des aigus qu’on cesse d’entendre avec l’âge', category: 'Signaux',
      metaTitle: 'Son mosquito — Écouter une fréquence aiguë de 17kHz',
      long: 'Les fréquences autour de 17kHz deviennent plus difficiles à entendre avec les années. On parle de son mosquito parce que seuls les adolescents l’entendraient — parcours les fréquences et trouve où la tienne s’arrête.',
      features: ['De 15k à 20kHz par paliers', 'Plage typique selon l’âge', 'Volume limité par sécurité', 'Casque recommandé'],
    },
  },

  hi: {
    metronome: {
      title: 'मेट्रोनोम', desc: 'अभ्यास के लिए एक-सी लय बनाए रखता है', category: 'अभ्यास',
      metaTitle: 'ऑनलाइन मेट्रोनोम — मुफ़्त, BPM बदलने की सुविधा',
      long: 'BPM तय कीजिए और यह ठीक-ठीक अंतराल पर बजता है। 4/4 जैसा ताल चुनें तो पहली मात्रा पर ज़ोर पड़ता है, जिससे कान से ही पता चलता है कि आप कौन-सी मात्रा पर हैं।',
      features: ['BPM 30 से 240 तक', '2, 3, 4 और 6 मात्रा पर ज़ोर', 'मात्रा आँखों से भी दिखती है', 'थपकी देकर BPM पाएँ'],
    },
    tuner: {
      title: 'वाद्य ट्यूनर', desc: 'माइक से सुनकर सुर का नाम बताता है', category: 'अभ्यास',
      metaTitle: 'ऑनलाइन गिटार ट्यूनर — गिटार और युकुलेली के लिए मुफ़्त',
      long: 'माइक की तरफ़ बजाइए और यह बताएगा कि कौन-सा सुर है और आप कितने सेंट ऊपर या नीचे हैं। गिटार, युकुलेली और बेस की खुली तारों के आधार सुर भी सुन सकते हैं।',
      features: ['सुर और आवृत्ति तुरंत', 'आधार से अंतर सेंट में', 'गिटार-युकुलेली की खुली तारों के आधार सुर', 'A440 आधार बदला जा सकता है'],
    },
    pitch: {
      title: 'अंतराल कान-अभ्यास', desc: 'दो सुरों के बीच का अंतर पहचानें', category: 'अभ्यास',
      metaTitle: 'अंतराल कान-अभ्यास — सापेक्ष श्रवण मुफ़्त में साधें',
      long: 'दो सुर एक के बाद एक बजते हैं और आप उनके बीच का अंतराल बताते हैं — बड़ा तीसरा, पूर्ण पाँचवाँ। पूर्ण श्रवण की ज़रूरत नहीं; दूरियाँ याद हो जाएँ तो राग और धुन पकड़ना बहुत आसान हो जाता है।',
      features: ['अंतराल सुनकर नाम बताएँ', 'कठिनाई के हिसाब से अंतरालों की सीमा', 'सही जवाब और लगातार सही गिने जाते हैं', 'दोबारा सुनना और आधार सुर जाँचना'],
    },
    'bpm-tap': {
      title: 'BPM थपकी गिनती', desc: 'लय पर थपकी दें, गति निकल आती है', category: 'अभ्यास',
      metaTitle: 'BPM थपकी गिनती — थपकी देकर गाने की गति पता करें',
      long: 'संगीत के साथ कोई भी कुंजी दबाइए और यह प्रति मिनट मात्राएँ गिन लेता है। आठ-दस थपकी में मान ठहर जाता है, और चूँकि हाल की थपकियों को ज़्यादा तोलता है, बीच में गति बदले तो भी साथ चलता है।',
      features: ['थपकियों के अंतराल से BPM', 'हाल की थपकियों की ओर झुका औसत', 'आपकी थपकी कितनी एक-सी है यह भी', 'मापे गए BPM पर मेट्रोनोम खोलें'],
    },
    noise: {
      title: 'व्हाइट नॉइज़ जनरेटर', desc: 'ध्यान लगाने या सोने के लिए शोर', category: 'ध्यान और नींद',
      metaTitle: 'व्हाइट नॉइज़ जनरेटर — व्हाइट, पिंक और ब्राउन नॉइज़ मुफ़्त',
      long: 'व्हाइट, पिंक और ब्राउन नॉइज़ बनाकर बजाता है। यह आस-पास की आवाज़ों को ढक देता है जिससे ध्यान लगाने या सोने में मदद मिलती है; ब्राउन नॉइज़ में निचली आवृत्तियाँ ज़्यादा होने से वह समुद्र की लहरों के सबसे करीब और कानों को सबसे नरम लगता है।',
      features: ['व्हाइट, पिंक या ब्राउन', 'आवाज़ के साथ निचली-ऊँची आवृत्ति की सेटिंग', 'टाइमर से अपने आप बंद', 'तुरंत बजता है — कुछ डाउनलोड नहीं'],
    },
    binaural: {
      title: 'बाइनॉरल बीट्स', desc: 'ज़रा अलग दो सुरों से बनने वाली धड़कन', category: 'ध्यान और नींद',
      metaTitle: 'बाइनॉरल बीट्स जनरेटर — डेल्टा, थीटा, अल्फ़ा और बीटा',
      long: 'बाएँ और दाएँ कान में ज़रा अलग आवृत्तियाँ भेजी जाएँ तो उनके अंतर के बराबर एक धीमी धड़कन सुनाई देती है। हेडफ़ोन ज़रूरी हैं, और कोई असर होता है या नहीं इसका वैज्ञानिक आधार अब भी साफ़ नहीं है।',
      features: ['आधार आवृत्ति और अंतर बदलें', 'डेल्टा, थीटा, अल्फ़ा और बीटा प्रीसेट', 'बाएँ-दाएँ चैनल अलग', 'हेडफ़ोन ज़रूरी होने की सूचना'],
    },
    decibel: {
      title: 'ध्वनि स्तर मापक', desc: 'देखें आस-पास कितना शोर है', category: 'मापना',
      metaTitle: 'डेसिबल मीटर — अपने माइक से शोर मापें',
      long: 'माइक से आने वाली आवाज़ का स्तर सापेक्ष डेसिबल में दिखाता है। पुस्तकालय, बातचीत या मेट्रो जैसे संदर्भों से तुलना करके अंदाज़ा लगाइए। माइक हर उपकरण में अलग होता है, इसलिए यह पूर्ण माप नहीं है।',
      features: ['शोर का स्तर तुरंत', 'सर्वोच्च और औसत दर्ज', 'रोज़ के शोर से तुलना', 'उपकरण के अंतर पर टिप्पणी'],
    },
    recorder: {
      title: 'वॉइस रेकॉर्डर', desc: 'रिकॉर्ड करें, सुनें और फ़ाइल सेव करें', category: 'मापना',
      metaTitle: 'ऑनलाइन वॉइस रेकॉर्डर — ब्राउज़र में रिकॉर्ड करें और सेव करें',
      long: 'कुछ इंस्टॉल किए बिना रिकॉर्ड कीजिए, तुरंत सुनिए और फ़ाइल डाउनलोड कीजिए। रिकॉर्डिंग ब्राउज़र के अंदर बनती है और कभी सर्वर पर नहीं जाती, इसलिए बैठक के नोट या उच्चारण का अभ्यास यहाँ सुरक्षित है।',
      features: ['रिकॉर्ड, ठहराव और प्ले', 'रिकॉर्डिंग के दौरान तरंग', 'फ़ाइल के रूप में सेव', 'माइक चुनने की सुविधा'],
    },
    tone: {
      title: 'टोन जनरेटर', desc: 'मनचाही आवृत्ति पर आवाज़ बनाएँ', category: 'सिग्नल',
      metaTitle: 'ऑनलाइन टोन जनरेटर — कोई भी Hz बजाएँ',
      long: '20Hz से 20kHz तक कोई भी आवृत्ति बनाता है। साइन, स्क्वेयर और सॉटूथ तरंगें मौजूद हैं, जिससे स्पीकर जाँचने, वाद्य को आधार सुर देने या साधारण प्रयोग करने में काम आता है।',
      features: ['20Hz से 20kHz का स्लाइडर', 'साइन, स्क्वेयर, ट्रायंगल और सॉटूथ', 'बायाँ या दायाँ चैनल चुनें', 'सुरक्षित आवाज़ के बारे में सलाह'],
    },
    mosquito: {
      title: 'मॉस्किटो टोन', desc: 'ऊँची आवृत्तियाँ जो उम्र के साथ सुनाई देना बंद हो जाती हैं', category: 'सिग्नल',
      metaTitle: 'मॉस्किटो टोन — 17kHz की ऊँची आवृत्ति सुनें',
      long: '17kHz के आस-पास की आवृत्तियाँ उम्र बढ़ने के साथ सुनना कठिन हो जाता है। इसे मॉस्किटो टोन कहते हैं क्योंकि कहा जाता है कि यह सिर्फ़ किशोरों को सुनाई देती है — आवृत्तियाँ बारी-बारी बजाकर देखिए आपकी सीमा कहाँ है।',
      features: ['15k से 20kHz चरणों में', 'उम्र के हिसाब से सामान्य सीमा', 'सुरक्षा के लिए आवाज़ सीमित', 'हेडफ़ोन की सलाह'],
    },
  },
  'zh-hans': {
    metronome: {
      title: '节拍器', desc: '给练习打稳定的拍子', category: '练习',
      metaTitle: '在线节拍器 — 免费，BPM可调',
      long: '定好BPM，它就按精确的间隔打点。选4/4这样的拍号，第一拍会加重音，你就听得出现在走到第几拍。',
      features: ['BPM从30到240', '2、3、4、6拍的重音', '拍子有画面提示', '敲一敲就测出BPM'],
    },
    tuner: {
      title: '乐器调音器', desc: '从麦克风听进去，报出是哪个音', category: '练习',
      metaTitle: '在线吉他调音器 — 吉他和尤克里里免费调音',
      long: '对着麦克风弹，它会告诉你这是哪个音，以及偏高还是偏低多少音分。也能听吉他、尤克里里和贝斯的空弦参考音。',
      features: ['实时显示音名和频率', '和基准差几音分', '吉他和尤克里里的空弦参考', 'A440基准可调'],
    },
    pitch: {
      title: '音程听力训练', desc: '说出两个音之间是什么音程', category: '练习',
      metaTitle: '音程听力训练 — 免费练相对音感',
      long: '它依次弹两个音，你说出中间是什么音程 — 大三度、纯五度。不需要绝对音感；把距离认熟了，和弦和旋律都跟得容易多了。',
      features: ['听一个音程，说出它是什么', '按难度分音程范围', '记录正确率和连对次数', '可重播、可对参考音'],
    },
    'bpm-tap': {
      title: 'BPM敲击计数', desc: '跟着敲，它算出速度', category: '练习',
      metaTitle: 'BPM敲击计数 — 敲一敲测出歌曲速度',
      long: '跟着音乐随便敲哪个键，它就算出每分钟多少拍。大概敲八下就稳住了，而且它更看重最近几下，所以中途变速也跟得上。',
      features: ['从你敲的间隔算BPM', '向最近几下加权平均', '显示你敲得稳不稳', '按测出的BPM打开节拍器'],
    },
    noise: {
      title: '白噪音生成器', desc: '帮你专注或入睡的噪音', category: '专注与睡眠',
      metaTitle: '白噪音生成器 — 白噪音、粉噪音、褐噪音免费',
      long: '生成并播放白噪音、粉噪音和褐噪音。它盖住周围的声响，帮你专注或入睡；褐噪音低频更重，最接近海浪，耳朵也最舒服。',
      features: ['白噪音、粉噪音或褐噪音', '音量加上高低频调整', '定时后自动停', '立刻就响 — 不用下载文件'],
    },
    binaural: {
      title: '双耳节拍', desc: '用两个略有差别的音造出来的节拍', category: '专注与睡眠',
      metaTitle: '双耳节拍生成器 — δ、θ、α、β波',
      long: '往左右耳送进略有差别的频率，你会听到一个以两者之差为速度的慢拍。耳机是必需的，而且它到底有没有效，科学证据到现在还不清楚。',
      features: ['基础频率和差值可调', 'δ、θ、α、β的预设', '左右声道分开', '会提醒你必须戴耳机'],
    },
    decibel: {
      title: '噪音计', desc: '看看周围有多吵', category: '测量',
      metaTitle: '噪音计 — 用麦克风量周围噪音',
      long: '把麦克风收到的声音用相对分贝显示出来。拿图书馆、聊天、地铁这些参照来比，就估得出自己在什么位置。各设备的麦克风不同，所以这不是绝对测量。',
      features: ['实时噪音等级', '记录峰值和平均', '和日常噪音对照', '关于设备校准的说明'],
    },
    recorder: {
      title: '录音机', desc: '录下来、回放、存成文件', category: '测量',
      metaTitle: '在线录音机 — 在浏览器里录音并保存',
      long: '什么都不用装就能录，录完马上回放，还能把文件下载下来。录音在浏览器里完成，绝不送到服务器，所以会议记录或发音练习放在这里是安全的。',
      features: ['录音、暂停、回放', '录的时候显示波形', '存成文件', '可以挑麦克风设备'],
    },
    tone: {
      title: '信号音生成器', desc: '生成任意音高的声音', category: '信号',
      metaTitle: '在线信号音生成器 — 播放任意Hz的正弦波',
      long: '从20Hz到20kHz，任何频率都能生成。正弦波、方波和锯齿波都有，所以拿来检查音箱、给乐器一个参考音，或者做点简单的实验都合适。',
      features: ['20Hz到20kHz的滑块', '正弦波、方波、三角波、锯齿波', '可选左声道或右声道', '关于安全音量的提醒'],
    },
    mosquito: {
      title: '蚊子音', desc: '年纪一大就听不见的高频', category: '信号',
      metaTitle: '蚊子音 — 听一听17kHz的高频',
      long: '17kHz上下的频率，随着年纪变大会越来越难听见。因为据说只有青少年听得到，所以叫蚊子音 — 一档一档放过去，找出你到哪儿就断了。',
      features: ['15k到20kHz分档', '各年龄的典型范围', '音量为安全做了限制', '建议戴耳机'],
    },
  },
  'zh-hant': {
    metronome: {
      title: '節拍器', desc: '給練習打穩定的拍子', category: '練習',
      metaTitle: '線上節拍器 — 免費，BPM可調',
      long: '定好BPM，它就按精確的間隔打點。選4/4這樣的拍號，第一拍會加重音，你就聽得出現在走到第幾拍。',
      features: ['BPM從30到240', '2、3、4、6拍的重音', '拍子有畫面提示', '敲一敲就測出BPM'],
    },
    tuner: {
      title: '樂器調音器', desc: '從麥克風聽進去，報出是哪個音', category: '練習',
      metaTitle: '線上吉他調音器 — 吉他和烏克麗麗免費調音',
      long: '對著麥克風彈，它會告訴你這是哪個音，以及偏高還是偏低多少音分。也能聽吉他、烏克麗麗和貝斯的空弦參考音。',
      features: ['即時顯示音名和頻率', '和基準差幾音分', '吉他和烏克麗麗的空弦參考', 'A440基準可調'],
    },
    pitch: {
      title: '音程聽力訓練', desc: '說出兩個音之間是什麼音程', category: '練習',
      metaTitle: '音程聽力訓練 — 免費練相對音感',
      long: '它依次彈兩個音，你說出中間是什麼音程 — 大三度、純五度。不需要絕對音感；把距離認熟了，和弦和旋律都跟得容易多了。',
      features: ['聽一個音程，說出它是什麼', '按難度分音程範圍', '記錄正確率和連對次數', '可重播、可對參考音'],
    },
    'bpm-tap': {
      title: 'BPM敲擊計數', desc: '跟著敲，它算出速度', category: '練習',
      metaTitle: 'BPM敲擊計數 — 敲一敲測出歌曲速度',
      long: '跟著音樂隨便敲哪個鍵，它就算出每分鐘多少拍。大概敲八下就穩住了，而且它更看重最近幾下，所以中途變速也跟得上。',
      features: ['從你敲的間隔算BPM', '向最近幾下加權平均', '顯示你敲得穩不穩', '按測出的BPM打開節拍器'],
    },
    noise: {
      title: '白噪音產生器', desc: '幫你專注或入睡的噪音', category: '專注與睡眠',
      metaTitle: '白噪音產生器 — 白噪音、粉紅噪音、褐色噪音免費',
      long: '產生並播放白噪音、粉紅噪音和褐色噪音。它蓋住周圍的聲響，幫你專注或入睡；褐色噪音低頻更重，最接近海浪，耳朵也最舒服。',
      features: ['白噪音、粉紅噪音或褐色噪音', '音量加上高低頻調整', '定時後自動停', '立刻就響 — 不用下載檔案'],
    },
    binaural: {
      title: '雙耳節拍', desc: '用兩個略有差別的音造出來的節拍', category: '專注與睡眠',
      metaTitle: '雙耳節拍產生器 — δ、θ、α、β波',
      long: '往左右耳送進略有差別的頻率，你會聽到一個以兩者之差為速度的慢拍。耳機是必需的，而且它到底有沒有效，科學證據到現在還不清楚。',
      features: ['基礎頻率和差值可調', 'δ、θ、α、β的預設', '左右聲道分開', '會提醒你必須戴耳機'],
    },
    decibel: {
      title: '噪音計', desc: '看看周圍有多吵', category: '測量',
      metaTitle: '噪音計 — 用麥克風量周圍噪音',
      long: '把麥克風收到的聲音用相對分貝顯示出來。拿圖書館、聊天、捷運這些參照來比，就估得出自己在什麼位置。各裝置的麥克風不同，所以這不是絕對測量。',
      features: ['即時噪音等級', '記錄峰值和平均', '和日常噪音對照', '關於裝置校準的說明'],
    },
    recorder: {
      title: '錄音機', desc: '錄下來、回放、存成檔案', category: '測量',
      metaTitle: '線上錄音機 — 在瀏覽器裡錄音並儲存',
      long: '什麼都不用裝就能錄，錄完馬上回放，還能把檔案下載下來。錄音在瀏覽器裡完成，絕不送到伺服器，所以會議記錄或發音練習放在這裡是安全的。',
      features: ['錄音、暫停、回放', '錄的時候顯示波形', '存成檔案', '可以挑麥克風裝置'],
    },
    tone: {
      title: '訊號音產生器', desc: '產生任意音高的聲音', category: '訊號',
      metaTitle: '線上訊號音產生器 — 播放任意Hz的正弦波',
      long: '從20Hz到20kHz，任何頻率都能產生。正弦波、方波和鋸齒波都有，所以拿來檢查喇叭、給樂器一個參考音，或者做點簡單的實驗都合適。',
      features: ['20Hz到20kHz的滑桿', '正弦波、方波、三角波、鋸齒波', '可選左聲道或右聲道', '關於安全音量的提醒'],
    },
    mosquito: {
      title: '蚊子音', desc: '年紀一大就聽不見的高頻', category: '訊號',
      metaTitle: '蚊子音 — 聽一聽17kHz的高頻',
      long: '17kHz上下的頻率，隨著年紀變大會越來越難聽見。因為據說只有青少年聽得到，所以叫蚊子音 — 一檔一檔放過去，找出你到哪兒就斷了。',
      features: ['15k到20kHz分檔', '各年齡的典型範圍', '音量為安全做了限制', '建議戴耳機'],
    },
  },
};

/**
 * 언어별 분류 순서.
 *
 * 분류 이름을 번역했으니 순서 배열도 언어마다 있어야 한다 — 여기 문자열은 위
 * category와 글자까지 같아야 하고, 하나라도 다르면 그 묶음이 허브에서 사라진다.
 */
export const SOUND_CATEGORY_ORDER: Record<SoundIntlLang, string[]> = {
  en: ['Practice', 'Focus and sleep', 'Measure', 'Signals'],
  es: ['Práctica', 'Concentración y sueño', 'Medir', 'Señales'],
  'pt-br': ['Prática', 'Concentração e sono', 'Medir', 'Sinais'],
  ja: ['練習', '集中と睡眠', '測定', '信号音'],
  de: ['Üben', 'Konzentration und Schlaf', 'Messen', 'Signaltöne'],
  fr: ['S’entraîner', 'Concentration et sommeil', 'Mesurer', 'Signaux'],
  hi: ['अभ्यास', 'ध्यान और नींद', 'मापना', 'सिग्नल'],
  'zh-hans': ['练习', '专注与睡眠', '测量', '信号'],
  'zh-hant': ['練習', '專注與睡眠', '測量', '訊號'],
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function soundToolsIntl(lang: SoundIntlLang): SoundTool[] {
  return SOUND_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findSoundToolIntl(lang: SoundIntlLang, slug: string): SoundTool | undefined {
  return soundToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedSoundToolsIntl(lang: SoundIntlLang, slug: string, count = 4): SoundTool[] {
  /*
   * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
   * 전에는 `[...same, ...rest].slice(0, count)`였고, 그러면 갈래의 앞에서
   * 넉 개만 뽑혀 뒤쪽 도구에 **들어오는 링크가 0**이 됐다 — 여덟 섹션에서
   * 열두 도구가 그 상태였고 열 언어이므로 120쪽이었다.
   */
  return relatedBySlug(soundToolsIntl(lang), slug, count, (a, b) => a.category === b.category);
}

/**
 * 라우트가 그대로 쓰는 메타데이터 — 문구를 라이브러리 한 곳에만 둔다.
 */
export function soundMetaIntl(lang: SoundIntlLang, slug: string) {
  const t = findSoundToolIntl(lang, slug);
  if (!t) throw new Error(`sound-tools-intl: 도구가 없다 — ${slug}`);
  return withCard({
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/sound/${slug}`),
      languages: alternateLanguages10(`/sound/${slug}`),
    },
  });
}

export function soundHubMetaIntl(lang: SoundIntlLang) {
  const ui = SOUND_SHELL_UI[lang];
  return withCard({
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/sound'),
      languages: alternateLanguages10('/sound'),
    },
  });
}

/** 셸·허브 UI 문구 */
export const SOUND_SHELL_UI: Record<SoundIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Sound tools',
    canDo: 'What this tool does', others: 'Other sound tools',
    notice: '🔊 Sound is generated in the browser. Mic audio is never uploaded.',
    footNote: 'Start at a low volume — high frequencies and loud tones can damage your hearing.',
    hubTitle: 'Sound Tools — Metronome, Tuner, White Noise, Tone',
    hubDesc: 'Free sound tools that run in your browser: metronome, instrument tuner, ear training, BPM tapper, white noise, binaural beats, sound level meter, voice recorder and tone generator.',
    hubLead: 'Everything is generated in the browser, and mic audio is never uploaded.',
    hubFoot: 'Free sound tools', eyebrow: 'Sound',
  },
  es: {
    home: 'Inicio', section: 'Herramientas de sonido',
    canDo: 'Qué hace esta herramienta', others: 'Otras herramientas de sonido',
    notice: '🔊 El sonido se genera en el navegador. El audio del micro no se sube nunca.',
    footNote: 'Empieza con volumen bajo — las frecuencias altas y los tonos fuertes pueden dañar tu oído.',
    hubTitle: 'Herramientas de sonido — Metrónomo, afinador, ruido blanco, tonos',
    hubDesc: 'Herramientas de sonido gratis que funcionan en tu navegador: metrónomo, afinador de instrumentos, entrenamiento auditivo, contador de BPM, ruido blanco, ondas binaurales, medidor de sonido, grabadora de voz y generador de tonos.',
    hubLead: 'Todo se genera en el navegador, y el audio del micro no se sube nunca.',
    hubFoot: 'Herramientas de sonido gratis', eyebrow: 'Sonido',
  },
  'pt-br': {
    home: 'Início', section: 'Ferramentas de som',
    canDo: 'O que esta ferramenta faz', others: 'Outras ferramentas de som',
    notice: '🔊 O som é gerado no navegador. O áudio do microfone nunca é enviado.',
    footNote: 'Comece com o volume baixo — frequências altas e tons fortes podem danificar sua audição.',
    hubTitle: 'Ferramentas de som — Metrônomo, afinador, ruído branco, tons',
    hubDesc: 'Ferramentas de som grátis que rodam no navegador: metrônomo, afinador de instrumentos, treino auditivo, contador de BPM, ruído branco, batidas binaurais, medidor de som, gravador de voz e gerador de tons.',
    hubLead: 'Tudo é gerado no navegador, e o áudio do microfone nunca é enviado.',
    hubFoot: 'Ferramentas de som grátis', eyebrow: 'Som',
  },
  ja: {
    home: 'ホーム', section: 'サウンドツール',
    canDo: 'このツールでできること', others: 'ほかのサウンドツール',
    notice: '🔊 音はブラウザの中で作られます。マイクの音がアップロードされることはありません。',
    footNote: '音量は小さめから。高い周波数や大きな音は聴力を損なうことがあります。',
    hubTitle: 'サウンドツール — メトロノーム・チューナー・ホワイトノイズ・トーン',
    hubDesc: 'ブラウザで動く無料のサウンドツール：メトロノーム、楽器チューナー、音程当て、BPMタップ、ホワイトノイズ、バイノーラルビート、騒音計、ボイスレコーダー、トーンジェネレーター。',
    hubLead: 'すべてブラウザの中で作られ、マイクの音は外に出ません。',
    hubFoot: '無料のサウンドツール', eyebrow: 'Sound',
  },
  de: {
    home: 'Start', section: 'Klangwerkzeuge',
    canDo: 'Was dieses Werkzeug macht', others: 'Weitere Klangwerkzeuge',
    notice: '🔊 Der Klang entsteht im Browser. Mikrofon-Audio wird nie hochgeladen.',
    footNote: 'Fang leise an — hohe Frequenzen und laute Töne können das Gehör schädigen.',
    hubTitle: 'Klangwerkzeuge — Metronom, Stimmgerät, Rauschen, Töne',
    hubDesc: 'Kostenlose Klangwerkzeuge direkt im Browser: Metronom, Instrumentenstimmgerät, Gehörtraining, BPM-Tapper, weißes Rauschen, binaurale Beats, Schallpegelmesser, Diktiergerät und Tongenerator.',
    hubLead: 'Alles entsteht im Browser, und Mikrofon-Audio wird nie hochgeladen.',
    hubFoot: 'Kostenlose Klangwerkzeuge', eyebrow: 'Klang',
  },
  fr: {
    home: 'Accueil', section: 'Outils de son',
    canDo: 'Ce que fait cet outil', others: 'Autres outils de son',
    notice: '🔊 Le son est généré dans le navigateur. L’audio du micro n’est jamais envoyé.',
    footNote: 'Commence à faible volume — les aigus et les tons forts peuvent abîmer l’audition.',
    hubTitle: 'Outils de son — Métronome, accordeur, bruit blanc, tons',
    hubDesc: 'Outils de son gratuits qui tournent dans le navigateur : métronome, accordeur d’instrument, entraînement de l’oreille, compteur de BPM, bruit blanc, sons binauraux, sonomètre, dictaphone et générateur de sons.',
    hubLead: 'Tout est généré dans le navigateur, et l’audio du micro n’est jamais envoyé.',
    hubFoot: 'Outils de son gratuits', eyebrow: 'Son',
  },
  hi: {
    home: 'होम', section: 'ध्वनि उपकरण',
    canDo: 'यह उपकरण क्या करता है', others: 'अन्य ध्वनि उपकरण',
    notice: '🔊 आवाज़ ब्राउज़र में ही बनती है। माइक का ऑडियो कभी अपलोड नहीं होता।',
    footNote: 'आवाज़ धीमी से शुरू करें — ऊँची आवृत्तियाँ और तेज़ सुर सुनने की क्षमता को नुकसान पहुँचा सकते हैं।',
    hubTitle: 'ध्वनि उपकरण — मेट्रोनोम, ट्यूनर, व्हाइट नॉइज़, टोन',
    hubDesc: 'ब्राउज़र में चलने वाले मुफ़्त ध्वनि उपकरण: मेट्रोनोम, वाद्य ट्यूनर, कान-अभ्यास, BPM थपकी, व्हाइट नॉइज़, बाइनॉरल बीट्स, ध्वनि स्तर मापक, वॉइस रेकॉर्डर और टोन जनरेटर।',
    hubLead: 'सब कुछ ब्राउज़र में बनता है, और माइक का ऑडियो बाहर नहीं जाता।',
    hubFoot: 'मुफ़्त ध्वनि उपकरण', eyebrow: 'ध्वनि',
  },
  'zh-hans': {
    home: '首页',
    section: '声音工具',
    canDo: '这个工具做什么',
    others: '其他声音工具',
    notice: '🔊 声音在浏览器里生成。麦克风的音频绝不上传。',
    footNote: '先把音量调小再开始 — 高频和大音量会伤听力。',
    hubTitle: '声音工具 — 节拍器、调音器、白噪音、信号音',
    hubDesc: '在浏览器里跑的免费声音工具：节拍器、乐器调音器、听力训练、BPM敲击、白噪音、双耳节拍、噪音计、录音机和信号音生成器。',
    hubLead: '全部在浏览器里生成，麦克风的音频绝不上传。',
    hubFoot: '免费声音工具',
    eyebrow: '声音',
  },
  'zh-hant': {
    home: '首頁',
    section: '聲音工具',
    canDo: '這個工具做什麼',
    others: '其他聲音工具',
    notice: '🔊 聲音在瀏覽器裡產生。麥克風的音訊絕不上傳。',
    footNote: '先把音量調小再開始 — 高頻和大音量會傷聽力。',
    hubTitle: '聲音工具 — 節拍器、調音器、白噪音、訊號音',
    hubDesc: '在瀏覽器裡跑的免費聲音工具：節拍器、樂器調音器、聽力訓練、BPM敲擊、白噪音、雙耳節拍、噪音計、錄音機和訊號音產生器。',
    hubLead: '全部在瀏覽器裡產生，麥克風的音訊絕不上傳。',
    hubFoot: '免費聲音工具',
    eyebrow: '聲音',
  },
};
