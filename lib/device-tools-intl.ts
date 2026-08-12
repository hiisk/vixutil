// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { DeviceTool } from './device-tools.ts';
import { DEVICE_TOOLS } from './device-tools.ts';
import { alternateLanguages10, localeHref, openGraphFor, type AnyLocale10 } from './locales.ts';
import { withCard } from './og-cards/index.ts';
import { relatedBySlug } from './related-window.ts';

/**
 * 기기 점검(/device) 섹션의 번역 메타데이터.
 *
 * slug·icon·gradient·og·needsPermission은 한국어와 공유하고 사람이 읽는 문구만
 * 갈아 끼운다. checks는 title/desc가 아니라 별도 키라 여기서 함께 넘긴다.
 *
 * 이 섹션은 검색어가 거의 그대로 도구 이름이다 — "keyboard test",
 * "dead pixel test", "mic test". 그래서 metaTitle을 그 말에 맞춰 짓는다.
 */
export type DeviceIntlLang = Exclude<AnyLocale10, 'ko'>;

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; checks: string[];
}

const COPY: Record<DeviceIntlLang, Record<string, ToolCopy>> = {
  en: {
    keyboard: {
      title: 'Keyboard Test', desc: 'Find dead keys and check N-key rollover', category: 'Input',
      metaTitle: 'Keyboard Test — Check Every Key and N-Key Rollover Online',
      long: 'Press a key and it lights up on the on-screen keyboard. Find keys that do not respond, keys that register twice from one press, and how many the board reads at once (N-key rollover) — all in the browser.',
      checks: ['Whether each key registers', 'The key code pressed (KeyboardEvent.code)', 'Maximum simultaneous keys', 'Which keys you have not tried yet'],
    },
    mouse: {
      title: 'Mouse Click Test', desc: 'Test left, right and wheel clicks, and check for chatter', category: 'Input',
      metaTitle: 'Mouse Click Test — Check Buttons and Double-Click Chatter',
      long: 'Check that left, right, wheel and side buttons all register, and whether one press is coming through as two — chatter — by looking at the gap in milliseconds. Scroll direction and cursor movement polling are shown alongside.',
      checks: ['Whether each button registers', 'Suspected chatter clicks (gap in ms)', 'Scroll direction and step', 'Cursor movement event rate'],
    },
    mic: {
      title: 'Microphone Test', desc: 'Live input level, plus record and listen back', category: 'Audio',
      metaTitle: 'Microphone Test — Check Input Level and Record Online',
      long: 'Watch a live level meter to confirm your mic is picking up sound, then record a few seconds and play it back to hear how you actually sound. A one-minute check before a video call or a game.',
      checks: ['Input level on a live meter', 'Frequency spectrum', 'Record and play back', 'List of connected microphones'],
    },
    webcam: {
      title: 'Webcam Test', desc: 'Check the picture, resolution and frame rate, take a snapshot', category: 'Video',
      metaTitle: 'Webcam Test — Check Your Camera Online, No Install',
      long: 'Confirm the camera turns on, see what resolution and frame rate it delivers, and take a snapshot to judge the image quality. The video plays only inside this browser and is never sent to a server.',
      checks: ['Camera picture output', 'Resolution and frame rate', 'Save a snapshot', 'Switch between connected cameras'],
    },
    speaker: {
      title: 'Speaker and Headphone Test', desc: 'Check left/right separation and which frequencies come through', category: 'Audio',
      metaTitle: 'Speaker Test — Check Left/Right Channels and Frequency Online',
      long: 'Sound the left and right sides separately to check the channels are not swapped and that neither side is silent. You can also step through 20Hz to 16kHz to find how far your headphones — and your ears — actually reach.',
      checks: ['Left and right channels separately', 'Stereo balance', 'Playback across frequency bands', 'Volume control'],
    },
    monitor: {
      title: 'Dead Pixel Test', desc: 'Full-screen solid colours to find dead pixels and patches', category: 'Display',
      metaTitle: 'Dead Pixel Test — Find Stuck Pixels and Backlight Bleed',
      long: 'Fills the screen with red, green, blue, white and black to reveal dots that stay off (dead pixels), dots that stay on (stuck pixels), and backlight bleed or patches around the edges. The first thing to do the day a new monitor arrives.',
      checks: ['Five full-screen solid colours', 'Grey gradient (banding)', 'Colour bleed and ghosting', 'Backlight bleed at the edges'],
    },
    'refresh-rate': {
      title: 'Refresh Rate Test', desc: 'Measure what Hz your screen is actually running at', category: 'Display',
      metaTitle: 'Refresh Rate Test — Measure Your Real Monitor Hz',
      long: 'Not the number in your settings — how many times per second this screen is actually drawing. Buying a 144Hz monitor and running it at 60Hz is a common mistake, and this catches it immediately.',
      checks: ['Measured refresh rate (Hz)', 'Frame interval variance (stutter)', 'Minimum and maximum frame time', 'Compare motion smoothness by eye'],
    },
    touch: {
      title: 'Touchscreen Test', desc: 'Check multi-touch count and find unresponsive areas', category: 'Input',
      metaTitle: 'Touchscreen Test — Multi-Touch and Dead Zone Check',
      long: 'Press the screen to see touch coordinates and how many points register at once, then drag a finger across to find any area that does not respond. Useful after a screen replacement, or when the display cuts out now and then.',
      checks: ['Live touch coordinates', 'Maximum simultaneous touches', 'Drag trails to find dead zones', 'Pressure and contact area (where supported)'],
    },
    gamepad: {
      title: 'Gamepad Test', desc: 'Check buttons, analogue sticks and triggers', category: 'Input',
      metaTitle: 'Gamepad Test — Check Controller Buttons and Stick Drift',
      long: 'Connect a controller, press the buttons to confirm they register, and leave the sticks alone to see whether the coordinates wander — stick drift. Xbox, PlayStation and Nintendo pads are all read through the standard browser API.',
      checks: ['Each button and its analogue value', 'Left and right stick coordinates', 'Stick drift (off-centre at rest)', 'How far the triggers are pressed'],
    },
    info: {
      title: 'My Device Info', desc: 'Resolution, browser, OS and core count at a glance', category: 'Info',
      metaTitle: 'My Device Info — Check Screen Resolution, Browser and OS',
      long: 'Your screen resolution and browser window size, pixel ratio, browser and operating system version, and CPU core count — all on one screen. Copy it straight out when you are asking for remote support or someone asks about your specs.',
      checks: ['Screen resolution and window size', 'Pixel ratio (DPR) and colour depth', 'Browser, engine and operating system', 'CPU cores, memory and touch support'],
    },
  },

  es: {
    keyboard: {
      title: 'Test de teclado', desc: 'Encuentra teclas muertas y comprueba el N-key rollover', category: 'Entrada',
      metaTitle: 'Test de teclado online — Comprueba cada tecla y el N-key rollover',
      long: 'Pulsa una tecla y se ilumina en el teclado de la pantalla. Encuentra teclas que no responden, teclas que se registran dos veces con una sola pulsación, y cuántas lee el teclado a la vez (N-key rollover) — todo en el navegador.',
      checks: ['Si cada tecla se registra', 'El código de la tecla pulsada (KeyboardEvent.code)', 'Máximo de teclas simultáneas', 'Qué teclas aún no has probado'],
    },
    mouse: {
      title: 'Test de clic del ratón', desc: 'Prueba clic izquierdo, derecho y rueda, y busca chatter', category: 'Entrada',
      metaTitle: 'Test de clic del ratón — Comprueba botones y doble clic involuntario',
      long: 'Comprueba que el izquierdo, el derecho, la rueda y los botones laterales se registran, y si una pulsación está llegando como dos — chatter — mirando el intervalo en milisegundos. Además se muestran la dirección de scroll y la frecuencia de eventos de movimiento.',
      checks: ['Si cada botón se registra', 'Clics con sospecha de chatter (intervalo en ms)', 'Dirección y paso del scroll', 'Frecuencia de eventos de movimiento del cursor'],
    },
    mic: {
      title: 'Test de micrófono', desc: 'Nivel de entrada en vivo, más grabar y escuchar', category: 'Audio',
      metaTitle: 'Test de micrófono — Comprueba el nivel de entrada y graba online',
      long: 'Mira un medidor de nivel en vivo para confirmar que tu micro capta sonido, luego graba unos segundos y reprodúcelo para oír cómo suenas de verdad. Una comprobación de un minuto antes de una videollamada o una partida.',
      checks: ['Nivel de entrada en un medidor en vivo', 'Espectro de frecuencias', 'Grabar y reproducir', 'Lista de micrófonos conectados'],
    },
    webcam: {
      title: 'Test de webcam', desc: 'Comprueba la imagen, la resolución y los fps, y saca una foto', category: 'Vídeo',
      metaTitle: 'Test de webcam — Comprueba tu cámara online, sin instalar nada',
      long: 'Confirma que la cámara se enciende, mira qué resolución y cuántos fps entrega, y saca una foto para juzgar la calidad de imagen. El vídeo se reproduce solo dentro de este navegador y nunca se envía a un servidor.',
      checks: ['Salida de imagen de la cámara', 'Resolución y fotogramas por segundo', 'Guardar una captura', 'Cambiar entre cámaras conectadas'],
    },
    speaker: {
      title: 'Test de altavoces y auriculares', desc: 'Comprueba la separación izquierda/derecha y qué frecuencias llegan', category: 'Audio',
      metaTitle: 'Test de altavoces — Comprueba canales izquierdo/derecho y frecuencias',
      long: 'Haz sonar el lado izquierdo y el derecho por separado para comprobar que los canales no están invertidos y que ninguno está en silencio. También puedes recorrer de 20Hz a 16kHz para ver hasta dónde llegan de verdad tus auriculares — y tus oídos.',
      checks: ['Canales izquierdo y derecho por separado', 'Balance estéreo', 'Reproducción por bandas de frecuencia', 'Control de volumen'],
    },
    monitor: {
      title: 'Test de píxeles muertos', desc: 'Colores sólidos a pantalla completa para encontrar píxeles muertos y manchas', category: 'Pantalla',
      metaTitle: 'Test de píxeles muertos — Encuentra píxeles atascados y fugas de retroiluminación',
      long: 'Llena la pantalla de rojo, verde, azul, blanco y negro para revelar puntos que se quedan apagados (píxeles muertos), puntos que se quedan encendidos (píxeles atascados) y fugas de retroiluminación o manchas en los bordes. Lo primero que hay que hacer el día que llega un monitor nuevo.',
      checks: ['Cinco colores sólidos a pantalla completa', 'Degradado de grises (banding)', 'Sangrado de color y estelas', 'Fugas de retroiluminación en los bordes'],
    },
    'refresh-rate': {
      title: 'Test de frecuencia de refresco', desc: 'Mide a cuántos Hz está funcionando tu pantalla de verdad', category: 'Pantalla',
      metaTitle: 'Test de frecuencia de refresco — Mide los Hz reales de tu monitor',
      long: 'No el número de tus ajustes, sino cuántas veces por segundo está dibujando esta pantalla. Comprar un monitor de 144Hz y tenerlo funcionando a 60Hz es un error muy común, y esto lo detecta al instante.',
      checks: ['Frecuencia de refresco medida (Hz)', 'Variación del intervalo entre fotogramas (tirones)', 'Tiempo de fotograma mínimo y máximo', 'Comparar a ojo la fluidez del movimiento'],
    },
    touch: {
      title: 'Test de pantalla táctil', desc: 'Comprueba el multitáctil y localiza zonas que no responden', category: 'Entrada',
      metaTitle: 'Test de pantalla táctil — Multitáctil y zonas muertas',
      long: 'Toca la pantalla para ver las coordenadas y cuántos puntos se registran a la vez, y luego arrastra un dedo para encontrar cualquier zona que no responda. Útil después de cambiar una pantalla, o cuando la imagen se corta de vez en cuando.',
      checks: ['Coordenadas del toque en vivo', 'Máximo de toques simultáneos', 'Trazos de arrastre para encontrar zonas muertas', 'Presión y área de contacto (donde se admita)'],
    },
    gamepad: {
      title: 'Test de mando', desc: 'Comprueba botones, palancas analógicas y gatillos', category: 'Entrada',
      metaTitle: 'Test de mando — Comprueba botones y deriva de las palancas',
      long: 'Conecta un mando, pulsa los botones para confirmar que se registran, y deja las palancas quietas para ver si las coordenadas se van solas — deriva de palanca. Los mandos de Xbox, PlayStation y Nintendo se leen todos por la API estándar del navegador.',
      checks: ['Cada botón y su valor analógico', 'Coordenadas de la palanca izquierda y derecha', 'Deriva de palanca (descentrada en reposo)', 'Cuánto se pulsan los gatillos'],
    },
    info: {
      title: 'Información de mi aparato', desc: 'Resolución, navegador, sistema y núcleos de un vistazo', category: 'Información',
      metaTitle: 'Información de mi aparato — Resolución de pantalla, navegador y sistema',
      long: 'La resolución de tu pantalla y el tamaño de la ventana del navegador, la relación de píxeles, la versión del navegador y del sistema operativo, y el número de núcleos de CPU — todo en una pantalla. Cópialo directamente cuando pidas soporte remoto o alguien te pregunte por tus especificaciones.',
      checks: ['Resolución de pantalla y tamaño de ventana', 'Relación de píxeles (DPR) y profundidad de color', 'Navegador, motor y sistema operativo', 'Núcleos de CPU, memoria y soporte táctil'],
    },
  },

  'pt-br': {
    keyboard: {
      title: 'Teste de teclado', desc: 'Encontre teclas mortas e confira o N-key rollover', category: 'Entrada',
      metaTitle: 'Teste de teclado online — Confira cada tecla e o N-key rollover',
      long: 'Aperte uma tecla e ela acende no teclado da tela. Encontre teclas que não respondem, teclas que registram duas vezes com um só toque, e quantas o teclado lê ao mesmo tempo (N-key rollover) — tudo no navegador.',
      checks: ['Se cada tecla registra', 'O código da tecla apertada (KeyboardEvent.code)', 'Máximo de teclas simultâneas', 'Quais teclas você ainda não testou'],
    },
    mouse: {
      title: 'Teste de clique do mouse', desc: 'Teste clique esquerdo, direito e rodinha, e procure chatter', category: 'Entrada',
      metaTitle: 'Teste de clique do mouse — Confira botões e clique duplo involuntário',
      long: 'Confira se esquerdo, direito, rodinha e botões laterais registram, e se um toque está chegando como dois — chatter — olhando o intervalo em milissegundos. Também aparecem a direção do scroll e a taxa de eventos de movimento.',
      checks: ['Se cada botão registra', 'Cliques com suspeita de chatter (intervalo em ms)', 'Direção e passo do scroll', 'Taxa de eventos de movimento do cursor'],
    },
    mic: {
      title: 'Teste de microfone', desc: 'Nível de entrada ao vivo, mais gravar e ouvir', category: 'Áudio',
      metaTitle: 'Teste de microfone — Confira o nível de entrada e grave online',
      long: 'Veja um medidor de nível ao vivo para confirmar que seu microfone está captando som, depois grave alguns segundos e ouça para saber como você soa de verdade. Uma checagem de um minuto antes de uma chamada de vídeo ou de um jogo.',
      checks: ['Nível de entrada num medidor ao vivo', 'Espectro de frequências', 'Gravar e ouvir', 'Lista de microfones conectados'],
    },
    webcam: {
      title: 'Teste de webcam', desc: 'Confira a imagem, a resolução e os fps, e tire uma foto', category: 'Vídeo',
      metaTitle: 'Teste de webcam — Confira sua câmera online, sem instalar nada',
      long: 'Confirme que a câmera liga, veja que resolução e quantos fps ela entrega, e tire uma foto para julgar a qualidade da imagem. O vídeo roda somente dentro deste navegador e nunca é enviado a um servidor.',
      checks: ['Saída de imagem da câmera', 'Resolução e quadros por segundo', 'Salvar uma captura', 'Alternar entre câmeras conectadas'],
    },
    speaker: {
      title: 'Teste de caixas e fones', desc: 'Confira a separação esquerda/direita e quais frequências chegam', category: 'Áudio',
      metaTitle: 'Teste de caixas de som — Confira canais esquerdo/direito e frequências',
      long: 'Toque o lado esquerdo e o direito separadamente para conferir se os canais não estão invertidos e se nenhum está mudo. Você também pode percorrer de 20Hz a 16kHz para descobrir até onde seus fones — e seus ouvidos — realmente chegam.',
      checks: ['Canais esquerdo e direito separadamente', 'Balanço estéreo', 'Reprodução por faixas de frequência', 'Controle de volume'],
    },
    monitor: {
      title: 'Teste de pixel morto', desc: 'Cores sólidas em tela cheia para achar pixels mortos e manchas', category: 'Tela',
      metaTitle: 'Teste de pixel morto — Ache pixels travados e vazamento de luz',
      long: 'Preenche a tela com vermelho, verde, azul, branco e preto para revelar pontos que ficam apagados (pixels mortos), pontos que ficam acesos (pixels travados) e vazamento de luz ou manchas nas bordas. A primeira coisa a fazer no dia em que chega um monitor novo.',
      checks: ['Cinco cores sólidas em tela cheia', 'Degradê de cinza (banding)', 'Sangramento de cor e rastros', 'Vazamento de luz nas bordas'],
    },
    'refresh-rate': {
      title: 'Teste de taxa de atualização', desc: 'Meça em quantos Hz sua tela está rodando de verdade', category: 'Tela',
      metaTitle: 'Teste de taxa de atualização — Meça os Hz reais do seu monitor',
      long: 'Não o número das configurações, mas quantas vezes por segundo esta tela está realmente desenhando. Comprar um monitor de 144Hz e deixá-lo rodando a 60Hz é um erro comum, e isto pega na hora.',
      checks: ['Taxa de atualização medida (Hz)', 'Variação do intervalo entre quadros (engasgos)', 'Tempo de quadro mínimo e máximo', 'Comparar a fluidez do movimento a olho'],
    },
    touch: {
      title: 'Teste de tela sensível ao toque', desc: 'Confira o multitoque e ache áreas que não respondem', category: 'Entrada',
      metaTitle: 'Teste de touchscreen — Multitoque e zonas mortas',
      long: 'Toque a tela para ver as coordenadas e quantos pontos registram ao mesmo tempo, depois arraste o dedo para achar qualquer área que não responda. Útil depois de trocar a tela, ou quando a imagem falha de vez em quando.',
      checks: ['Coordenadas do toque ao vivo', 'Máximo de toques simultâneos', 'Rastros de arrasto para achar zonas mortas', 'Pressão e área de contato (onde houver suporte)'],
    },
    gamepad: {
      title: 'Teste de controle', desc: 'Confira botões, analógicos e gatilhos', category: 'Entrada',
      metaTitle: 'Teste de controle — Confira botões e drift dos analógicos',
      long: 'Conecte um controle, aperte os botões para confirmar que registram, e deixe os analógicos parados para ver se as coordenadas andam sozinhas — stick drift. Controles de Xbox, PlayStation e Nintendo são todos lidos pela API padrão do navegador.',
      checks: ['Cada botão e seu valor analógico', 'Coordenadas do analógico esquerdo e direito', 'Drift do analógico (fora do centro em repouso)', 'Quanto os gatilhos estão pressionados'],
    },
    info: {
      title: 'Informações do meu aparelho', desc: 'Resolução, navegador, sistema e núcleos num relance', category: 'Informação',
      metaTitle: 'Informações do meu aparelho — Resolução de tela, navegador e sistema',
      long: 'A resolução da sua tela e o tamanho da janela do navegador, a proporção de pixels, a versão do navegador e do sistema operacional, e o número de núcleos da CPU — tudo numa tela. Copie direto quando for pedir suporte remoto ou alguém perguntar suas especificações.',
      checks: ['Resolução de tela e tamanho da janela', 'Proporção de pixels (DPR) e profundidade de cor', 'Navegador, motor e sistema operacional', 'Núcleos de CPU, memória e suporte a toque'],
    },
  },

  ja: {
    keyboard: {
      title: 'キーボードテスト', desc: '反応しないキーとNキーロールオーバーを調べる', category: '入力',
      metaTitle: 'キーボードテスト — 全キーとNキーロールオーバーをブラウザで確認',
      long: 'キーを押すと画面上のキーボードで光ります。反応しないキー、一度押しただけで二回入るキー、同時に何個まで読めるか（Nキーロールオーバー）を、ブラウザだけで確認できます。',
      checks: ['各キーが反応するか', '押されたキーコード（KeyboardEvent.code）', '同時押しの最大数', 'まだ試していないキー'],
    },
    mouse: {
      title: 'マウスクリックテスト', desc: '左・右・ホイールのクリックとチャタリングを調べる', category: '入力',
      metaTitle: 'マウスクリックテスト — ボタンとチャタリングを確認',
      long: '左・右・ホイール・サイドボタンがすべて反応するか、そして一度の押下が二回として入っていないか（チャタリング）を、ミリ秒の間隔で確認します。スクロール方向とカーソル移動イベントの頻度も一緒に表示します。',
      checks: ['各ボタンが反応するか', 'チャタリングの疑いがあるクリック（間隔をms表示）', 'スクロールの方向と刻み', 'カーソル移動イベントの頻度'],
    },
    mic: {
      title: 'マイクテスト', desc: '入力レベルをその場で見て、録音して聴き返す', category: '音声',
      metaTitle: 'マイクテスト — 入力レベルの確認と録音をブラウザで',
      long: 'レベルメーターでマイクが音を拾っているかを確かめ、数秒録音して再生すれば自分の声が実際にどう聞こえるか分かります。ビデオ通話やゲームの前に1分で終わる点検です。',
      checks: ['入力レベルをメーターで表示', '周波数スペクトル', '録音して再生', '接続されているマイクの一覧'],
    },
    webcam: {
      title: 'ウェブカメラテスト', desc: '映像・解像度・フレームレートを確認して静止画を撮る', category: '映像',
      metaTitle: 'ウェブカメラテスト — カメラをブラウザで確認、インストール不要',
      long: 'カメラが起動するかを確かめ、どの解像度とフレームレートで出ているかを見て、静止画を撮って画質を判断できます。映像はこのブラウザの中だけで再生され、サーバーには送られません。',
      checks: ['カメラの映像出力', '解像度とフレームレート', '静止画の保存', '接続されているカメラの切り替え'],
    },
    speaker: {
      title: 'スピーカー・イヤホンテスト', desc: '左右の分離と出ている周波数を確認する', category: '音声',
      metaTitle: 'スピーカーテスト — 左右チャンネルと周波数をブラウザで確認',
      long: '左と右を別々に鳴らして、チャンネルが入れ替わっていないか、片方が無音になっていないかを確認します。20Hzから16kHzまで順に鳴らして、イヤホンと自分の耳が実際どこまで届くかも試せます。',
      checks: ['左右チャンネルを別々に', 'ステレオバランス', '周波数帯ごとの再生', '音量調整'],
    },
    monitor: {
      title: 'ドット抜けテスト', desc: '全画面の単色でドット抜けやムラを見つける', category: '画面',
      metaTitle: 'ドット抜けテスト — 常時点灯ドットとバックライト漏れを確認',
      long: '画面を赤・緑・青・白・黒で埋めて、消えたままの点（ドット抜け）、点いたままの点（常時点灯）、端のバックライト漏れやムラを浮かび上がらせます。新しいモニターが届いた日にまずやることです。',
      checks: ['全画面の単色5色', 'グレーのグラデーション（バンディング）', '色のにじみと残像', '端のバックライト漏れ'],
    },
    'refresh-rate': {
      title: 'リフレッシュレートテスト', desc: '画面が実際に何Hzで動いているかを測る', category: '画面',
      metaTitle: 'リフレッシュレートテスト — モニターの実際のHzを測る',
      long: '設定に書かれた数字ではなく、この画面が1秒間に実際何回描いているかを測ります。144Hzのモニターを買って60Hzで動かしているのはよくある見落としで、これならすぐ気づけます。',
      checks: ['実測リフレッシュレート（Hz）', 'フレーム間隔のばらつき（引っかかり）', 'フレーム時間の最小と最大', '動きのなめらかさを目で比較'],
    },
    touch: {
      title: 'タッチパネルテスト', desc: 'マルチタッチの数と反応しない場所を調べる', category: '入力',
      metaTitle: 'タッチパネルテスト — マルチタッチと反応しない領域の確認',
      long: '画面を押すとタッチ座標と同時に認識される点の数が分かり、指を滑らせれば反応しない場所を見つけられます。画面を交換したあとや、表示がときどき途切れるときに役立ちます。',
      checks: ['タッチ座標をその場で表示', '同時タッチの最大数', 'ドラッグの軌跡で反応しない領域を探す', '圧力と接触面積（対応している場合）'],
    },
    gamepad: {
      title: 'ゲームパッドテスト', desc: 'ボタン・アナログスティック・トリガーを確認する', category: '入力',
      metaTitle: 'ゲームパッドテスト — コントローラーのボタンとスティックドリフトを確認',
      long: 'コントローラーをつないでボタンを押し、反応するかを確かめます。スティックに触れずに座標が動くかを見ればスティックドリフトが分かります。Xbox・PlayStation・Nintendoのパッドはいずれもブラウザの標準APIで読み取ります。',
      checks: ['各ボタンとそのアナログ値', '左右スティックの座標', 'スティックドリフト（放置時の中心ずれ）', 'トリガーの踏み込み量'],
    },
    info: {
      title: '自分の端末情報', desc: '解像度・ブラウザ・OS・コア数を一目で', category: '情報',
      metaTitle: '自分の端末情報 — 画面解像度・ブラウザ・OSを確認',
      long: '画面の解像度とブラウザウィンドウの大きさ、ピクセル比、ブラウザとOSのバージョン、CPUのコア数を一画面にまとめます。リモートサポートを頼むときや、スペックを聞かれたときにそのままコピーできます。',
      checks: ['画面解像度とウィンドウサイズ', 'ピクセル比（DPR）と色深度', 'ブラウザ・エンジン・OS', 'CPUコア数・メモリ・タッチ対応'],
    },
  },

  de: {
    keyboard: {
      title: 'Tastatur-Test', desc: 'Finde tote Tasten und prüfe das N-Key-Rollover', category: 'Eingabe',
      metaTitle: 'Tastatur-Test online — Jede Taste und das N-Key-Rollover prüfen',
      long: 'Drücke eine Taste und sie leuchtet auf der Tastatur am Bildschirm auf. Finde Tasten, die nicht reagieren, Tasten, die bei einem Druck doppelt auslösen, und wie viele die Tastatur gleichzeitig liest (N-Key-Rollover) — alles im Browser.',
      checks: ['Ob jede Taste auslöst', 'Der Code der gedrückten Taste (KeyboardEvent.code)', 'Maximale Zahl gleichzeitiger Tasten', 'Welche Tasten du noch nicht probiert hast'],
    },
    mouse: {
      title: 'Maus-Klick-Test', desc: 'Prüfe Links-, Rechts- und Radklick und suche Doppelklick-Fehler', category: 'Eingabe',
      metaTitle: 'Maus-Klick-Test — Tasten und Doppelklick-Fehler prüfen',
      long: 'Prüfe, ob links, rechts, Rad und Seitentasten auslösen, und ob ein Druck als zwei durchkommt — Chatter — anhand des Abstands in Millisekunden. Scrollrichtung und die Ereignisrate der Cursorbewegung stehen daneben.',
      checks: ['Ob jede Taste auslöst', 'Klicks mit Chatter-Verdacht (Abstand in ms)', 'Scrollrichtung und Schrittweite', 'Ereignisrate der Cursorbewegung'],
    },
    mic: {
      title: 'Mikrofon-Test', desc: 'Eingangspegel live, dazu aufnehmen und abhören', category: 'Audio',
      metaTitle: 'Mikrofon-Test — Eingangspegel prüfen und online aufnehmen',
      long: 'Beobachte eine Pegelanzeige, um zu bestätigen, dass dein Mikrofon Ton aufnimmt, nimm dann ein paar Sekunden auf und hör sie ab, um zu hören, wie du wirklich klingst. Eine Ein-Minuten-Prüfung vor einem Videoanruf oder einer Runde im Spiel.',
      checks: ['Eingangspegel auf einer Live-Anzeige', 'Frequenzspektrum', 'Aufnehmen und abspielen', 'Liste der angeschlossenen Mikrofone'],
    },
    webcam: {
      title: 'Webcam-Test', desc: 'Prüfe Bild, Auflösung und Bildrate, mach einen Schnappschuss', category: 'Video',
      metaTitle: 'Webcam-Test — Kamera online prüfen, ohne Installation',
      long: 'Bestätige, dass die Kamera angeht, sieh nachdem, welche Auflösung und Bildrate sie liefert, und mach einen Schnappschuss, um die Bildqualität zu beurteilen. Das Video läuft nur in diesem Browser und wird nie an einen Server geschickt.',
      checks: ['Bildausgabe der Kamera', 'Auflösung und Bilder pro Sekunde', 'Schnappschuss speichern', 'Zwischen angeschlossenen Kameras wechseln'],
    },
    speaker: {
      title: 'Lautsprecher- und Kopfhörer-Test', desc: 'Prüfe Links-Rechts-Trennung und welche Frequenzen ankommen', category: 'Audio',
      metaTitle: 'Lautsprecher-Test — Links-Rechts-Kanäle und Frequenzen prüfen',
      long: 'Lass links und rechts getrennt klingen, um zu prüfen, dass die Kanäle nicht vertauscht sind und keine Seite stumm bleibt. Du kannst außerdem von 20Hz bis 16kHz durchgehen, um zu sehen, wie weit deine Kopfhörer — und deine Ohren — tatsächlich reichen.',
      checks: ['Linker und rechter Kanal getrennt', 'Stereo-Balance', 'Wiedergabe über Frequenzbänder', 'Lautstärkeregelung'],
    },
    monitor: {
      title: 'Pixelfehler-Test', desc: 'Vollbild-Farbflächen, um tote Pixel und Flecken zu finden', category: 'Bildschirm',
      metaTitle: 'Pixelfehler-Test — Tote Pixel und Backlight-Bleeding finden',
      long: 'Füllt den Bildschirm mit Rot, Grün, Blau, Weiß und Schwarz, um Punkte zu zeigen, die aus bleiben (tote Pixel), Punkte, die an bleiben (hängende Pixel), sowie Backlight-Bleeding oder Flecken an den Rändern. Das Erste, was man am Tag eines neuen Monitors macht.',
      checks: ['Fünf Vollbild-Farbflächen', 'Grauverlauf (Banding)', 'Farbverlaufen und Schlieren', 'Backlight-Bleeding an den Rändern'],
    },
    'refresh-rate': {
      title: 'Bildwiederholrate-Test', desc: 'Miss, mit wie viel Hz dein Bildschirm wirklich läuft', category: 'Bildschirm',
      metaTitle: 'Bildwiederholrate-Test — Die echten Hz deines Monitors messen',
      long: 'Nicht die Zahl in den Einstellungen, sondern wie oft pro Sekunde dieser Bildschirm tatsächlich zeichnet. Einen 144-Hz-Monitor zu kaufen und mit 60Hz zu betreiben ist ein häufiger Fehler, und das fällt hier sofort auf.',
      checks: ['Gemessene Bildwiederholrate (Hz)', 'Streuung der Bildabstände (Ruckeln)', 'Minimale und maximale Bildzeit', 'Laufruhe mit dem Auge vergleichen'],
    },
    touch: {
      title: 'Touchscreen-Test', desc: 'Prüfe die Multitouch-Zahl und finde nicht reagierende Bereiche', category: 'Eingabe',
      metaTitle: 'Touchscreen-Test — Multitouch und tote Zonen prüfen',
      long: 'Berühre den Bildschirm, um Koordinaten und die Zahl gleichzeitig erkannter Punkte zu sehen, und zieh dann einen Finger darüber, um Bereiche zu finden, die nicht reagieren. Nützlich nach einem Displaytausch oder wenn die Anzeige gelegentlich aussetzt.',
      checks: ['Berührungskoordinaten live', 'Maximale Zahl gleichzeitiger Berührungen', 'Zieh-Spuren, um tote Zonen zu finden', 'Druck und Auflagefläche (wo unterstützt)'],
    },
    gamepad: {
      title: 'Gamepad-Test', desc: 'Prüfe Tasten, Analogsticks und Trigger', category: 'Eingabe',
      metaTitle: 'Gamepad-Test — Controller-Tasten und Stick-Drift prüfen',
      long: 'Schließ einen Controller an, drück die Tasten, um zu bestätigen, dass sie auslösen, und lass die Sticks in Ruhe, um zu sehen, ob die Koordinaten wandern — Stick-Drift. Xbox-, PlayStation- und Nintendo-Pads werden alle über die Standard-API des Browsers gelesen.',
      checks: ['Jede Taste und ihr Analogwert', 'Koordinaten von linkem und rechtem Stick', 'Stick-Drift (in Ruhe außerhalb der Mitte)', 'Wie weit die Trigger gedrückt sind'],
    },
    info: {
      title: 'Meine Geräteinfos', desc: 'Auflösung, Browser, System und Kernzahl auf einen Blick', category: 'Info',
      metaTitle: 'Meine Geräteinfos — Bildschirmauflösung, Browser und System prüfen',
      long: 'Deine Bildschirmauflösung und die Größe des Browserfensters, das Pixelverhältnis, Browser- und Betriebssystemversion sowie die Zahl der CPU-Kerne — alles auf einem Bildschirm. Kopier es direkt heraus, wenn du Fernwartung anfragst oder jemand nach deinen Daten fragt.',
      checks: ['Bildschirmauflösung und Fenstergröße', 'Pixelverhältnis (DPR) und Farbtiefe', 'Browser, Engine und Betriebssystem', 'CPU-Kerne, Speicher und Touch-Unterstützung'],
    },
  },

  fr: {
    keyboard: {
      title: 'Test de clavier', desc: 'Repère les touches mortes et vérifie le NKRO', category: 'Entrée',
      metaTitle: 'Test de clavier en ligne — Vérifie chaque touche et le NKRO',
      long: 'Appuie sur une touche et elle s’allume sur le clavier à l’écran. Trouve les touches qui ne répondent pas, celles qui s’enregistrent deux fois pour un seul appui, et combien le clavier en lit à la fois (NKRO) — tout dans le navigateur.',
      checks: ['Si chaque touche s’enregistre', 'Le code de la touche appuyée (KeyboardEvent.code)', 'Nombre maximal de touches simultanées', 'Les touches que tu n’as pas encore essayées'],
    },
    mouse: {
      title: 'Test de clic de souris', desc: 'Teste clic gauche, droit et molette, et cherche le chatter', category: 'Entrée',
      metaTitle: 'Test de clic de souris — Vérifie les boutons et le double-clic parasite',
      long: 'Vérifie que gauche, droit, molette et boutons latéraux s’enregistrent, et si un appui passe pour deux — le chatter — en regardant l’écart en millisecondes. Le sens du défilement et la fréquence des événements de déplacement s’affichent à côté.',
      checks: ['Si chaque bouton s’enregistre', 'Clics suspectés de chatter (écart en ms)', 'Sens et pas du défilement', 'Fréquence des événements de déplacement du curseur'],
    },
    mic: {
      title: 'Test de microphone', desc: 'Niveau d’entrée en direct, plus enregistrer et réécouter', category: 'Audio',
      metaTitle: 'Test de microphone — Vérifie le niveau d’entrée et enregistre en ligne',
      long: 'Regarde un vumètre en direct pour confirmer que ton micro capte le son, puis enregistre quelques secondes et réécoute pour entendre à quoi tu ressembles vraiment. Une vérification d’une minute avant un appel vidéo ou une partie.',
      checks: ['Niveau d’entrée sur un vumètre en direct', 'Spectre de fréquences', 'Enregistrer et réécouter', 'Liste des micros connectés'],
    },
    webcam: {
      title: 'Test de webcam', desc: 'Vérifie l’image, la résolution et les ips, prends une photo', category: 'Vidéo',
      metaTitle: 'Test de webcam — Vérifie ta caméra en ligne, sans installation',
      long: 'Confirme que la caméra s’allume, vois quelle résolution et combien d’images par seconde elle délivre, et prends une photo pour juger la qualité. La vidéo ne joue que dans ce navigateur et n’est jamais envoyée à un serveur.',
      checks: ['Sortie image de la caméra', 'Résolution et images par seconde', 'Enregistrer une capture', 'Basculer entre les caméras connectées'],
    },
    speaker: {
      title: 'Test d’enceintes et de casque', desc: 'Vérifie la séparation gauche/droite et les fréquences qui passent', category: 'Audio',
      metaTitle: 'Test d’enceintes — Vérifie les canaux gauche/droite et les fréquences',
      long: 'Fais sonner la gauche et la droite séparément pour vérifier que les canaux ne sont pas inversés et qu’aucun côté n’est muet. Tu peux aussi parcourir 20Hz à 16kHz pour trouver jusqu’où ton casque — et ton oreille — vont réellement.',
      checks: ['Canaux gauche et droit séparément', 'Balance stéréo', 'Lecture par bandes de fréquences', 'Réglage du volume'],
    },
    monitor: {
      title: 'Test de pixels morts', desc: 'Couleurs unies en plein écran pour repérer pixels morts et taches', category: 'Écran',
      metaTitle: 'Test de pixels morts — Repère pixels bloqués et fuites de rétroéclairage',
      long: 'Remplit l’écran de rouge, vert, bleu, blanc et noir pour révéler les points qui restent éteints (pixels morts), ceux qui restent allumés (pixels bloqués), et les fuites de rétroéclairage ou taches sur les bords. La première chose à faire le jour où arrive un écran neuf.',
      checks: ['Cinq couleurs unies en plein écran', 'Dégradé de gris (banding)', 'Bavure de couleur et rémanence', 'Fuites de rétroéclairage sur les bords'],
    },
    'refresh-rate': {
      title: 'Test de fréquence de rafraîchissement', desc: 'Mesure à combien de Hz ton écran tourne réellement', category: 'Écran',
      metaTitle: 'Test de rafraîchissement — Mesure les Hz réels de ton écran',
      long: 'Pas le chiffre de tes réglages, mais combien de fois par seconde cet écran dessine vraiment. Acheter un écran 144Hz et le faire tourner à 60Hz est une erreur courante, et cela se voit ici tout de suite.',
      checks: ['Fréquence de rafraîchissement mesurée (Hz)', 'Variation de l’intervalle entre images (saccades)', 'Temps d’image minimum et maximum', 'Comparer la fluidité à l’œil'],
    },
    touch: {
      title: 'Test d’écran tactile', desc: 'Vérifie le multitouch et trouve les zones qui ne répondent pas', category: 'Entrée',
      metaTitle: 'Test d’écran tactile — Multitouch et zones mortes',
      long: 'Touche l’écran pour voir les coordonnées et combien de points s’enregistrent en même temps, puis fais glisser un doigt pour trouver une zone qui ne répond pas. Utile après un remplacement d’écran, ou quand l’affichage coupe de temps en temps.',
      checks: ['Coordonnées du toucher en direct', 'Nombre maximal de touchers simultanés', 'Tracés de glissement pour trouver les zones mortes', 'Pression et surface de contact (là où c’est pris en charge)'],
    },
    gamepad: {
      title: 'Test de manette', desc: 'Vérifie boutons, sticks analogiques et gâchettes', category: 'Entrée',
      metaTitle: 'Test de manette — Vérifie les boutons et la dérive des sticks',
      long: 'Branche une manette, appuie sur les boutons pour confirmer qu’ils répondent, et laisse les sticks tranquilles pour voir si les coordonnées se déplacent — la dérive de stick. Les manettes Xbox, PlayStation et Nintendo se lisent toutes via l’API standard du navigateur.',
      checks: ['Chaque bouton et sa valeur analogique', 'Coordonnées des sticks gauche et droit', 'Dérive de stick (hors centre au repos)', 'À quel point les gâchettes sont enfoncées'],
    },
    info: {
      title: 'Infos de mon appareil', desc: 'Résolution, navigateur, système et cœurs d’un coup d’œil', category: 'Infos',
      metaTitle: 'Infos de mon appareil — Résolution d’écran, navigateur et système',
      long: 'La résolution de ton écran et la taille de la fenêtre du navigateur, le ratio de pixels, la version du navigateur et du système, et le nombre de cœurs du processeur — tout sur un écran. Copie-le tel quel quand tu demandes une assistance à distance ou qu’on te demande ta configuration.',
      checks: ['Résolution d’écran et taille de fenêtre', 'Ratio de pixels (DPR) et profondeur de couleur', 'Navigateur, moteur et système', 'Cœurs du processeur, mémoire et prise en charge du tactile'],
    },
  },

  hi: {
    keyboard: {
      title: 'कीबोर्ड जाँच', desc: 'बंद पड़ी कुंजियाँ और N-key rollover देखें', category: 'इनपुट',
      metaTitle: 'ऑनलाइन कीबोर्ड जाँच — हर कुंजी और N-key rollover देखें',
      long: 'कोई कुंजी दबाएँ और वह स्क्रीन के कीबोर्ड पर जल उठती है। कौन-सी कुंजी काम नहीं कर रही, कौन एक बार दबाने पर दो बार दर्ज हो रही, और कीबोर्ड एक साथ कितनी पढ़ पाता है (N-key rollover) — सब ब्राउज़र में।',
      checks: ['हर कुंजी दर्ज होती है या नहीं', 'दबाई कुंजी का कोड (KeyboardEvent.code)', 'एक साथ अधिकतम कुंजियाँ', 'कौन-सी कुंजियाँ अभी नहीं आज़माईं'],
    },
    mouse: {
      title: 'माउस क्लिक जाँच', desc: 'बायाँ, दायाँ और व्हील क्लिक जाँचें, चैटर देखें', category: 'इनपुट',
      metaTitle: 'माउस क्लिक जाँच — बटन और अनचाहा डबल क्लिक जाँचें',
      long: 'बायाँ, दायाँ, व्हील और साइड बटन दर्ज हो रहे हैं या नहीं यह देखें, और मिलीसेकंड का अंतर देखकर पता करें कि एक दबाव दो के रूप में आ रहा है (चैटर) या नहीं। स्क्रॉल की दिशा और कर्सर की गति की घटना दर भी साथ दिखती है।',
      checks: ['हर बटन दर्ज होता है या नहीं', 'चैटर के संदेह वाले क्लिक (अंतर ms में)', 'स्क्रॉल की दिशा और चरण', 'कर्सर की गति की घटना दर'],
    },
    mic: {
      title: 'माइक्रोफ़ोन जाँच', desc: 'इनपुट स्तर साथ-साथ, और रिकॉर्ड कर सुनना', category: 'ऑडियो',
      metaTitle: 'माइक्रोफ़ोन जाँच — इनपुट स्तर देखें और ऑनलाइन रिकॉर्ड करें',
      long: 'स्तर मापक देखकर पक्का करें कि माइक आवाज़ पकड़ रहा है, फिर कुछ सेकंड रिकॉर्ड कर बजाइए और सुनिए कि आप असल में कैसे सुनाई देते हैं। वीडियो कॉल या खेल से पहले एक मिनट की जाँच।',
      checks: ['इनपुट स्तर साथ-साथ मापक पर', 'आवृत्ति स्पेक्ट्रम', 'रिकॉर्ड कर बजाना', 'जुड़े माइक्रोफ़ोन की सूची'],
    },
    webcam: {
      title: 'वेबकैम जाँच', desc: 'तस्वीर, रिज़ॉल्यूशन और fps देखें, स्नैपशॉट लें', category: 'वीडियो',
      metaTitle: 'वेबकैम जाँच — कैमरा ऑनलाइन जाँचें, कुछ इंस्टॉल किए बिना',
      long: 'पक्का करें कि कैमरा चालू होता है, देखें कि वह कितना रिज़ॉल्यूशन और कितने fps देता है, और स्नैपशॉट लेकर तस्वीर की गुणवत्ता आँकें। वीडियो इसी ब्राउज़र के अंदर चलता है और कभी सर्वर पर नहीं जाता।',
      checks: ['कैमरे का चित्र आउटपुट', 'रिज़ॉल्यूशन और प्रति सेकंड फ़्रेम', 'स्नैपशॉट सेव करना', 'जुड़े कैमरों के बीच बदलना'],
    },
    speaker: {
      title: 'स्पीकर और हेडफ़ोन जाँच', desc: 'बाएँ-दाएँ अलगाव और कौन-सी आवृत्तियाँ आ रही हैं देखें', category: 'ऑडियो',
      metaTitle: 'स्पीकर जाँच — बाएँ/दाएँ चैनल और आवृत्ति ऑनलाइन जाँचें',
      long: 'बाएँ और दाएँ को अलग-अलग बजाकर देखें कि चैनल आपस में बदले नहीं हैं और कोई तरफ़ चुप नहीं है। 20Hz से 16kHz तक बारी-बारी बजाकर यह भी पता कर सकते हैं कि आपके हेडफ़ोन — और आपके कान — असल में कहाँ तक पहुँचते हैं।',
      checks: ['बायाँ और दायाँ चैनल अलग-अलग', 'स्टीरियो संतुलन', 'आवृत्ति बैंड के अनुसार बजाना', 'आवाज़ का नियंत्रण'],
    },
    monitor: {
      title: 'डेड पिक्सेल जाँच', desc: 'पूरी स्क्रीन के सादे रंगों से डेड पिक्सेल और धब्बे खोजें', category: 'स्क्रीन',
      metaTitle: 'डेड पिक्सेल जाँच — अटके पिक्सेल और बैकलाइट रिसाव खोजें',
      long: 'स्क्रीन को लाल, हरे, नीले, सफ़ेद और काले से भरकर वे बिंदु उभारता है जो बुझे रहते हैं (डेड पिक्सेल), जो जले रहते हैं (अटके पिक्सेल), और किनारों पर बैकलाइट का रिसाव या धब्बे। नया मॉनिटर आने के दिन सबसे पहले यही करना चाहिए।',
      checks: ['पूरी स्क्रीन के पाँच सादे रंग', 'सलेटी ग्रेडिएंट (बैंडिंग)', 'रंग का फैलाव और छाया', 'किनारों पर बैकलाइट रिसाव'],
    },
    'refresh-rate': {
      title: 'रिफ़्रेश दर जाँच', desc: 'मापें कि आपकी स्क्रीन असल में कितने Hz पर चल रही है', category: 'स्क्रीन',
      metaTitle: 'रिफ़्रेश दर जाँच — मॉनिटर के असली Hz मापें',
      long: 'सेटिंग में लिखा अंक नहीं, बल्कि यह स्क्रीन एक सेकंड में असल में कितनी बार बना रही है। 144Hz का मॉनिटर लेकर उसे 60Hz पर चलाते रहना आम चूक है, और यह उसे तुरंत पकड़ लेता है।',
      checks: ['मापी गई रिफ़्रेश दर (Hz)', 'फ़्रेम अंतराल का उतार-चढ़ाव (झटके)', 'न्यूनतम और अधिकतम फ़्रेम समय', 'गति की चिकनाई आँखों से मिलाना'],
    },
    touch: {
      title: 'टचस्क्रीन जाँच', desc: 'मल्टी-टच की संख्या देखें और न चलने वाले हिस्से खोजें', category: 'इनपुट',
      metaTitle: 'टचस्क्रीन जाँच — मल्टी-टच और मृत क्षेत्र',
      long: 'स्क्रीन दबाकर स्पर्श के निर्देशांक और एक साथ कितने बिंदु दर्ज होते हैं देखें, फिर उँगली घसीटकर वह हिस्सा खोजें जो जवाब नहीं देता। स्क्रीन बदलवाने के बाद, या कभी-कभी डिस्प्ले कट जाने पर काम आता है।',
      checks: ['स्पर्श के निर्देशांक साथ-साथ', 'एक साथ अधिकतम स्पर्श', 'घसीटने के निशान से मृत क्षेत्र खोजना', 'दबाव और संपर्क क्षेत्र (जहाँ समर्थन हो)'],
    },
    gamepad: {
      title: 'गेमपैड जाँच', desc: 'बटन, एनालॉग स्टिक और ट्रिगर जाँचें', category: 'इनपुट',
      metaTitle: 'गेमपैड जाँच — कंट्रोलर के बटन और स्टिक ड्रिफ़्ट जाँचें',
      long: 'कंट्रोलर जोड़ें, बटन दबाकर पक्का करें कि वे दर्ज होते हैं, और स्टिक को छोड़ देकर देखें कि निर्देशांक अपने आप खिसकते हैं या नहीं — स्टिक ड्रिफ़्ट। Xbox, PlayStation और Nintendo के पैड सब ब्राउज़र के मानक API से पढ़े जाते हैं।',
      checks: ['हर बटन और उसका एनालॉग मान', 'बाएँ और दाएँ स्टिक के निर्देशांक', 'स्टिक ड्रिफ़्ट (छोड़ने पर केंद्र से हटना)', 'ट्रिगर कितना दबा है'],
    },
    info: {
      title: 'मेरे उपकरण की जानकारी', desc: 'रिज़ॉल्यूशन, ब्राउज़र, सिस्टम और कोर एक नज़र में', category: 'जानकारी',
      metaTitle: 'मेरे उपकरण की जानकारी — स्क्रीन रिज़ॉल्यूशन, ब्राउज़र और सिस्टम',
      long: 'आपकी स्क्रीन का रिज़ॉल्यूशन और ब्राउज़र खिड़की का नाप, पिक्सेल अनुपात, ब्राउज़र और ऑपरेटिंग सिस्टम का संस्करण, और CPU कोर की संख्या — सब एक ही स्क्रीन पर। रिमोट सहायता माँगते समय या कोई आपकी विशेषताएँ पूछे तो सीधे कॉपी कर दें।',
      checks: ['स्क्रीन रिज़ॉल्यूशन और खिड़की का नाप', 'पिक्सेल अनुपात (DPR) और रंग गहराई', 'ब्राउज़र, इंजन और ऑपरेटिंग सिस्टम', 'CPU कोर, मेमोरी और टच समर्थन'],
    },
  },
  'zh-hans': {
    keyboard: {
      title: '键盘测试', desc: '找出不灵的键，顺便看N键无冲', category: '输入',
      metaTitle: '键盘测试 — 在线检查每个键和N键无冲',
      long: '按下一个键，屏幕上的键盘就亮一个。找出没反应的键、按一下却记成两下的键，以及同时能读到几个键（N键无冲）— 全在浏览器里做。',
      checks: ['每个键有没有反应', '按下去的键码（KeyboardEvent.code）', '最多能同时按几个键', '还有哪些键你没试过'],
    },
    mouse: {
      title: '鼠标点击测试', desc: '测左键、右键和滚轮，顺便看有没有连击', category: '输入',
      metaTitle: '鼠标点击测试 — 检查按键和双击连击',
      long: '确认左键、右键、滚轮和侧键都有反应，再看按一下是不是被记成了两下 — 也就是连击 — 从毫秒间隔就看得出来。滚动方向和指针的轮询率也一并显示。',
      checks: ['每个按键有没有反应', '疑似连击（间隔毫秒数）', '滚动方向和步进', '指针移动的事件频率'],
    },
    mic: {
      title: '麦克风测试', desc: '实时看输入音量，还能录下来回放', category: '音频',
      metaTitle: '麦克风测试 — 在线检查输入音量并录音',
      long: '看着实时的音量条确认麦克风收得到声音，再录几秒回放，听听自己实际是什么声音。视频会议或开黑之前，一分钟就能检查完。',
      checks: ['实时音量条上的输入电平', '频谱', '录下来再回放', '已连接的麦克风列表'],
    },
    webcam: {
      title: '摄像头测试', desc: '检查画面、分辨率和帧率，还能拍一张', category: '视频',
      metaTitle: '摄像头测试 — 在线检查相机，不用装东西',
      long: '确认相机开得起来，看它给出什么分辨率和帧率，再拍一张来判断画质。画面只在这个浏览器里播放，绝不会送到服务器。',
      checks: ['相机画面输出', '分辨率和帧率', '保存一张快照', '在已连接的相机之间切换'],
    },
    speaker: {
      title: '音箱和耳机测试', desc: '检查左右声道分离，还有哪些频率出得来', category: '音频',
      metaTitle: '音箱测试 — 在线检查左右声道和频率',
      long: '分别让左边和右边出声，确认声道没接反、也没有哪一边是哑的。还能从20Hz一路走到16kHz，看看你的耳机 — 和你的耳朵 — 实际能到哪儿。',
      checks: ['左右声道分别出声', '立体声平衡', '各频段的播放', '音量控制'],
    },
    monitor: {
      title: '坏点测试', desc: '全屏纯色，找坏点和漏光', category: '显示',
      metaTitle: '坏点测试 — 找出亮点、暗点和背光漏光',
      long: '用红、绿、蓝、白、黑铺满屏幕，把一直不亮的点（坏点）、一直亮着的点（亮点），还有边缘的背光漏光和斑块显出来。新显示器到手那天，第一件该做的事。',
      checks: ['五种全屏纯色', '灰阶渐变（色带）', '串色和残影', '边缘的背光漏光'],
    },
    'refresh-rate': {
      title: '刷新率测试', desc: '量出屏幕实际跑在多少Hz', category: '显示',
      metaTitle: '刷新率测试 — 量出显示器真正的Hz',
      long: '不是设置里写的那个数字，而是这块屏幕每秒真正画了几次。买了144Hz的显示器却跑在60Hz，是很常见的事，这里一测就露馅。',
      checks: ['实测的刷新率（Hz）', '帧间隔的抖动（卡顿）', '最小和最大帧时间', '用眼睛比动态流畅度'],
    },
    touch: {
      title: '触摸屏测试', desc: '看多点触控数，找没反应的区域', category: '输入',
      metaTitle: '触摸屏测试 — 多点触控和死区检查',
      long: '按屏幕能看到触点坐标和同时识别到几个点，再用手指划过去，找出哪一块没反应。换过屏之后，或者显示时不时断掉的时候用得上。',
      checks: ['实时触点坐标', '最多能同时触摸几点', '拖出轨迹来找死区', '压力和接触面积（支持时）'],
    },
    gamepad: {
      title: '手柄测试', desc: '检查按键、摇杆和扳机', category: '输入',
      metaTitle: '手柄测试 — 检查手柄按键和摇杆漂移',
      long: '接上手柄，按一遍按键确认都有反应，再放开摇杆不动，看坐标会不会自己跑 — 也就是摇杆漂移。Xbox、PlayStation和任天堂的手柄，都通过浏览器的标准接口读取。',
      checks: ['每个按键和它的模拟量', '左右摇杆的坐标', '摇杆漂移（静止时偏离中心）', '扳机按下去多深'],
    },
    info: {
      title: '我的设备信息', desc: '分辨率、浏览器、系统和核心数一眼看全', category: '信息',
      metaTitle: '我的设备信息 — 查看屏幕分辨率、浏览器和系统',
      long: '屏幕分辨率和浏览器窗口大小、像素比、浏览器和操作系统版本，还有CPU核心数 — 全在一屏里。要请人远程支援，或者有人问你配置时，直接复制过去就行。',
      checks: ['屏幕分辨率和窗口大小', '像素比（DPR）和色深', '浏览器、引擎和操作系统', 'CPU核心数、内存和触摸支持'],
    },
  },
  'zh-hant': {
    keyboard: {
      title: '鍵盤測試', desc: '找出不靈的鍵，順便看N鍵無衝', category: '輸入',
      metaTitle: '鍵盤測試 — 線上檢查每個鍵和N鍵無衝',
      long: '按下一個鍵，螢幕上的鍵盤就亮一個。找出沒反應的鍵、按一下卻記成兩下的鍵，以及同時能讀到幾個鍵（N鍵無衝）— 全在瀏覽器裡做。',
      checks: ['每個鍵有沒有反應', '按下去的鍵碼（KeyboardEvent.code）', '最多能同時按幾個鍵', '還有哪些鍵你沒試過'],
    },
    mouse: {
      title: '滑鼠點擊測試', desc: '測左鍵、右鍵和滾輪，順便看有沒有連擊', category: '輸入',
      metaTitle: '滑鼠點擊測試 — 檢查按鍵和雙擊連擊',
      long: '確認左鍵、右鍵、滾輪和側鍵都有反應，再看按一下是不是被記成了兩下 — 也就是連擊 — 從毫秒間隔就看得出來。捲動方向和指標的輪詢率也一併顯示。',
      checks: ['每個按鍵有沒有反應', '疑似連擊（間隔毫秒數）', '捲動方向和步進', '指標移動的事件頻率'],
    },
    mic: {
      title: '麥克風測試', desc: '即時看輸入音量，還能錄下來回放', category: '音訊',
      metaTitle: '麥克風測試 — 線上檢查輸入音量並錄音',
      long: '看著即時的音量條確認麥克風收得到聲音，再錄幾秒回放，聽聽自己實際是什麼聲音。視訊會議或開黑之前，一分鐘就能檢查完。',
      checks: ['即時音量條上的輸入電平', '頻譜', '錄下來再回放', '已連接的麥克風清單'],
    },
    webcam: {
      title: '網路攝影機測試', desc: '檢查畫面、解析度和影格率，還能拍一張', category: '視訊',
      metaTitle: '網路攝影機測試 — 線上檢查相機，不用裝東西',
      long: '確認相機開得起來，看它給出什麼解析度和影格率，再拍一張來判斷畫質。畫面只在這個瀏覽器裡播放，絕不會送到伺服器。',
      checks: ['相機畫面輸出', '解析度和影格率', '儲存一張快照', '在已連接的相機之間切換'],
    },
    speaker: {
      title: '喇叭和耳機測試', desc: '檢查左右聲道分離，還有哪些頻率出得來', category: '音訊',
      metaTitle: '喇叭測試 — 線上檢查左右聲道和頻率',
      long: '分別讓左邊和右邊出聲，確認聲道沒接反、也沒有哪一邊是啞的。還能從20Hz一路走到16kHz，看看你的耳機 — 和你的耳朵 — 實際能到哪兒。',
      checks: ['左右聲道分別出聲', '立體聲平衡', '各頻段的播放', '音量控制'],
    },
    monitor: {
      title: '壞點測試', desc: '全螢幕純色，找壞點和漏光', category: '顯示',
      metaTitle: '壞點測試 — 找出亮點、暗點和背光漏光',
      long: '用紅、綠、藍、白、黑鋪滿螢幕，把一直不亮的點（壞點）、一直亮著的點（亮點），還有邊緣的背光漏光和斑塊顯出來。新螢幕到手那天，第一件該做的事。',
      checks: ['五種全螢幕純色', '灰階漸層（色帶）', '串色和殘影', '邊緣的背光漏光'],
    },
    'refresh-rate': {
      title: '更新率測試', desc: '量出螢幕實際跑在多少Hz', category: '顯示',
      metaTitle: '更新率測試 — 量出螢幕真正的Hz',
      long: '不是設定裡寫的那個數字，而是這塊螢幕每秒真正畫了幾次。買了144Hz的螢幕卻跑在60Hz，是很常見的事，這裡一測就露餡。',
      checks: ['實測的更新率（Hz）', '影格間隔的抖動（卡頓）', '最小和最大影格時間', '用眼睛比動態流暢度'],
    },
    touch: {
      title: '觸控螢幕測試', desc: '看多點觸控數，找沒反應的區域', category: '輸入',
      metaTitle: '觸控螢幕測試 — 多點觸控和死區檢查',
      long: '按螢幕能看到觸點座標和同時識別到幾個點，再用手指劃過去，找出哪一塊沒反應。換過螢幕之後，或者顯示時不時斷掉的時候用得上。',
      checks: ['即時觸點座標', '最多能同時觸摸幾點', '拖出軌跡來找死區', '壓力和接觸面積（支援時）'],
    },
    gamepad: {
      title: '手把測試', desc: '檢查按鍵、搖桿和扳機', category: '輸入',
      metaTitle: '手把測試 — 檢查手把按鍵和搖桿漂移',
      long: '接上手把，按一遍按鍵確認都有反應，再放開搖桿不動，看座標會不會自己跑 — 也就是搖桿漂移。Xbox、PlayStation和任天堂的手把，都透過瀏覽器的標準介面讀取。',
      checks: ['每個按鍵和它的類比量', '左右搖桿的座標', '搖桿漂移（靜止時偏離中心）', '扳機按下去多深'],
    },
    info: {
      title: '我的裝置資訊', desc: '解析度、瀏覽器、系統和核心數一眼看全', category: '資訊',
      metaTitle: '我的裝置資訊 — 查看螢幕解析度、瀏覽器和系統',
      long: '螢幕解析度和瀏覽器視窗大小、像素比、瀏覽器和作業系統版本，還有CPU核心數 — 全在一畫面裡。要請人遠端支援，或者有人問你配備時，直接複製過去就行。',
      checks: ['螢幕解析度和視窗大小', '像素比（DPR）和色深', '瀏覽器、引擎和作業系統', 'CPU核心數、記憶體和觸控支援'],
    },
  },
};

/** 언어별 분류 순서. 여기 문자열은 위 category와 글자까지 같아야 한다 */
export const DEVICE_CATEGORY_ORDER: Record<DeviceIntlLang, string[]> = {
  en: ['Input', 'Audio', 'Video', 'Display', 'Info'],
  es: ['Entrada', 'Audio', 'Vídeo', 'Pantalla', 'Información'],
  'pt-br': ['Entrada', 'Áudio', 'Vídeo', 'Tela', 'Informação'],
  ja: ['入力', '音声', '映像', '画面', '情報'],
  de: ['Eingabe', 'Audio', 'Video', 'Bildschirm', 'Info'],
  fr: ['Entrée', 'Audio', 'Vidéo', 'Écran', 'Infos'],
  hi: ['इनपुट', 'ऑडियो', 'वीडियो', 'स्क्रीन', 'जानकारी'],
  'zh-hans': ['输入', '音频', '视频', '显示', '信息'],
  'zh-hant': ['輸入', '音訊', '視訊', '顯示', '資訊'],
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function deviceToolsIntl(lang: DeviceIntlLang): DeviceTool[] {
  return DEVICE_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findDeviceToolIntl(lang: DeviceIntlLang, slug: string): DeviceTool | undefined {
  return deviceToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedDeviceToolsIntl(lang: DeviceIntlLang, slug: string, count = 4): DeviceTool[] {
  /*
   * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
   * 전에는 `[...same, ...rest].slice(0, count)`였고, 그러면 갈래의 앞에서
   * 넉 개만 뽑혀 뒤쪽 도구에 **들어오는 링크가 0**이 됐다 — 여덟 섹션에서
   * 열두 도구가 그 상태였고 열 언어이므로 120쪽이었다.
   */
  return relatedBySlug(deviceToolsIntl(lang), slug, count, (a, b) => a.category === b.category);
}

/** 라우트가 그대로 쓰는 메타데이터 — 문구를 라이브러리 한 곳에만 둔다 */
export function deviceMetaIntl(lang: DeviceIntlLang, slug: string) {
  const t = findDeviceToolIntl(lang, slug);
  if (!t) throw new Error(`device-tools-intl: 도구가 없다 — ${slug}`);
  return withCard({
    title: t.metaTitle,
    description: t.long,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, `/device/${slug}`),
      languages: alternateLanguages10(`/device/${slug}`),
    },
  });
}

export function deviceHubMetaIntl(lang: DeviceIntlLang) {
  const ui = DEVICE_SHELL_UI[lang];
  return withCard({
    title: ui.hubTitle,
    description: ui.hubDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/device'),
      languages: alternateLanguages10('/device'),
    },
  });
}

/** 셸·허브 UI 문구 */
export const DEVICE_SHELL_UI: Record<DeviceIntlLang, {
  home: string; section: string; whatItChecks: string; others: string;
  notice: string; permission: string; footNote: string;
  hubTitle: string; hubDesc: string; hubLead: string; hubFoot: string; eyebrow: string;
}> = {
  en: {
    home: 'Home', section: 'Device tests',
    whatItChecks: 'What this test checks', others: 'Other device tests',
    notice: '🔧 Runs in the browser. Nothing to install, nothing uploaded.',
    permission: '🔒 Allow it when the browser asks. Camera and microphone data is processed inside this browser only and is never sent anywhere.',
    footNote: 'Results depend on your browser and drivers. If something looks wrong here, try the same test in another browser before assuming the hardware is at fault.',
    hubTitle: 'Device Tests — Keyboard, Mouse, Mic, Webcam, Dead Pixels',
    hubDesc: 'Free device tests in your browser: keyboard, mouse click, microphone, webcam, speakers, dead pixels, refresh rate, touchscreen, gamepad and your device info.',
    hubLead: 'Everything runs in the browser — nothing to install and nothing uploaded.',
    hubFoot: 'Free device tests', eyebrow: 'Device',
  },
  es: {
    home: 'Inicio', section: 'Tests de aparatos',
    whatItChecks: 'Qué comprueba este test', others: 'Otros tests de aparatos',
    notice: '🔧 Funciona en el navegador. Nada que instalar y nada que se suba.',
    permission: '🔒 Dale permiso cuando el navegador lo pida. Los datos de cámara y micrófono se procesan solo dentro de este navegador y no se envían a ningún sitio.',
    footNote: 'Los resultados dependen de tu navegador y tus controladores. Si algo se ve mal aquí, prueba el mismo test en otro navegador antes de dar por hecho que el problema es del hardware.',
    hubTitle: 'Tests de aparatos — Teclado, ratón, micro, webcam, píxeles muertos',
    hubDesc: 'Tests de aparatos gratis en tu navegador: teclado, clic del ratón, micrófono, webcam, altavoces, píxeles muertos, frecuencia de refresco, pantalla táctil, mando e información de tu aparato.',
    hubLead: 'Todo funciona en el navegador — nada que instalar y nada que se suba.',
    hubFoot: 'Tests de aparatos gratis', eyebrow: 'Aparato',
  },
  'pt-br': {
    home: 'Início', section: 'Testes de aparelho',
    whatItChecks: 'O que este teste confere', others: 'Outros testes de aparelho',
    notice: '🔧 Roda no navegador. Nada para instalar e nada enviado.',
    permission: '🔒 Libere quando o navegador pedir. Os dados de câmera e microfone são processados só dentro deste navegador e não são enviados a lugar nenhum.',
    footNote: 'Os resultados dependem do seu navegador e dos drivers. Se algo parecer errado aqui, faça o mesmo teste em outro navegador antes de concluir que o problema é do hardware.',
    hubTitle: 'Testes de aparelho — Teclado, mouse, microfone, webcam, pixel morto',
    hubDesc: 'Testes de aparelho grátis no navegador: teclado, clique do mouse, microfone, webcam, caixas de som, pixel morto, taxa de atualização, tela sensível ao toque, controle e informações do seu aparelho.',
    hubLead: 'Tudo roda no navegador — nada para instalar e nada enviado.',
    hubFoot: 'Testes de aparelho grátis', eyebrow: 'Aparelho',
  },
  ja: {
    home: 'ホーム', section: '端末チェック',
    whatItChecks: 'このチェックで分かること', others: 'ほかの端末チェック',
    notice: '🔧 ブラウザで動きます。インストールもアップロードもありません。',
    permission: '🔒 ブラウザが尋ねたら許可してください。カメラとマイクのデータはこのブラウザの中だけで処理され、どこにも送られません。',
    footNote: '結果はブラウザとドライバーに左右されます。ここでおかしく見えても、機器の故障と決める前に別のブラウザで同じチェックを試してみてください。',
    hubTitle: '端末チェック — キーボード・マウス・マイク・カメラ・ドット抜け',
    hubDesc: 'ブラウザで動く無料の端末チェック：キーボード、マウスクリック、マイク、ウェブカメラ、スピーカー、ドット抜け、リフレッシュレート、タッチパネル、ゲームパッド、端末情報。',
    hubLead: 'すべてブラウザで動きます — インストールもアップロードもありません。',
    hubFoot: '無料の端末チェック', eyebrow: 'Device',
  },
  de: {
    home: 'Start', section: 'Gerätetests',
    whatItChecks: 'Was dieser Test prüft', others: 'Weitere Gerätetests',
    notice: '🔧 Läuft im Browser. Nichts zu installieren, nichts wird hochgeladen.',
    permission: '🔒 Erlaube es, wenn der Browser fragt. Kamera- und Mikrofondaten werden nur in diesem Browser verarbeitet und nirgendwohin gesendet.',
    footNote: 'Die Ergebnisse hängen von Browser und Treibern ab. Sieht hier etwas falsch aus, probier denselben Test in einem anderen Browser, bevor du auf einen Hardwaredefekt schließt.',
    hubTitle: 'Gerätetests — Tastatur, Maus, Mikrofon, Webcam, Pixelfehler',
    hubDesc: 'Kostenlose Gerätetests im Browser: Tastatur, Maus-Klick, Mikrofon, Webcam, Lautsprecher, Pixelfehler, Bildwiederholrate, Touchscreen, Gamepad und deine Geräteinfos.',
    hubLead: 'Alles läuft im Browser — nichts zu installieren, nichts wird hochgeladen.',
    hubFoot: 'Kostenlose Gerätetests', eyebrow: 'Gerät',
  },
  fr: {
    home: 'Accueil', section: 'Tests d’appareil',
    whatItChecks: 'Ce que vérifie ce test', others: 'Autres tests d’appareil',
    notice: '🔧 Tourne dans le navigateur. Rien à installer, rien d’envoyé.',
    permission: '🔒 Autorise quand le navigateur le demande. Les données de caméra et de micro sont traitées uniquement dans ce navigateur et ne sont envoyées nulle part.',
    footNote: 'Les résultats dépendent de ton navigateur et de tes pilotes. Si quelque chose paraît anormal ici, refais le même test dans un autre navigateur avant de conclure à une panne matérielle.',
    hubTitle: 'Tests d’appareil — Clavier, souris, micro, webcam, pixels morts',
    hubDesc: 'Tests d’appareil gratuits dans le navigateur : clavier, clic de souris, microphone, webcam, enceintes, pixels morts, fréquence de rafraîchissement, écran tactile, manette et infos de ton appareil.',
    hubLead: 'Tout tourne dans le navigateur — rien à installer, rien d’envoyé.',
    hubFoot: 'Tests d’appareil gratuits', eyebrow: 'Appareil',
  },
  hi: {
    home: 'होम', section: 'उपकरण जाँच',
    whatItChecks: 'यह जाँच क्या देखती है', others: 'अन्य उपकरण जाँच',
    notice: '🔧 ब्राउज़र में चलती है। कुछ इंस्टॉल करने की ज़रूरत नहीं, कुछ अपलोड नहीं होता।',
    permission: '🔒 ब्राउज़र पूछे तो अनुमति दें। कैमरा और माइक का डेटा इसी ब्राउज़र में प्रोसेस होता है और कहीं नहीं भेजा जाता।',
    footNote: 'नतीजे आपके ब्राउज़र और ड्राइवर पर निर्भर करते हैं। यहाँ कुछ गड़बड़ लगे तो हार्डवेयर की ख़राबी मान लेने से पहले वही जाँच दूसरे ब्राउज़र में कर देखें।',
    hubTitle: 'उपकरण जाँच — कीबोर्ड, माउस, माइक, वेबकैम, डेड पिक्सेल',
    hubDesc: 'ब्राउज़र में मुफ़्त उपकरण जाँच: कीबोर्ड, माउस क्लिक, माइक्रोफ़ोन, वेबकैम, स्पीकर, डेड पिक्सेल, रिफ़्रेश दर, टचस्क्रीन, गेमपैड और आपके उपकरण की जानकारी।',
    hubLead: 'सब कुछ ब्राउज़र में चलता है — कुछ इंस्टॉल नहीं, कुछ अपलोड नहीं।',
    hubFoot: 'मुफ़्त उपकरण जाँच', eyebrow: 'उपकरण',
  },
  'zh-hans': {
    home: '首页',
    section: '设备检测',
    whatItChecks: '这项检测看什么',
    others: '其他设备检测',
    notice: '🔧 在浏览器里跑。不用装东西，什么都不上传。',
    permission: '🔒 浏览器问的时候请允许。相机和麦克风的数据只在这个浏览器里处理，绝不会送到任何地方。',
    footNote: '结果会受浏览器和驱动影响。这里看着不对的话，先换个浏览器测一遍，再断定是硬件的问题。',
    hubTitle: '设备检测 — 键盘、鼠标、麦克风、摄像头、坏点',
    hubDesc: '浏览器里的免费设备检测：键盘、鼠标、麦克风、摄像头、音箱、坏点、刷新率、触摸屏、手柄，还有你的设备信息。不用装东西。',
    hubLead: '全部在浏览器里跑 — 不用装东西，也什么都不上传。',
    hubFoot: '免费设备检测',
    eyebrow: '设备',
  },
  'zh-hant': {
    home: '首頁',
    section: '裝置檢測',
    whatItChecks: '這項檢測看什麼',
    others: '其他裝置檢測',
    notice: '🔧 在瀏覽器裡跑。不用裝東西，什麼都不上傳。',
    permission: '🔒 瀏覽器問的時候請允許。相機和麥克風的資料只在這個瀏覽器裡處理，絕不會送到任何地方。',
    footNote: '結果會受瀏覽器和驅動影響。這裡看著不對的話，先換個瀏覽器測一遍，再斷定是硬體的問題。',
    hubTitle: '裝置檢測 — 鍵盤、滑鼠、麥克風、網路攝影機、壞點',
    hubDesc: '瀏覽器裡的免費裝置檢測：鍵盤、滑鼠、麥克風、網路攝影機、喇叭、壞點、更新率、觸控螢幕、手把，還有你的裝置資訊。不用裝東西。',
    hubLead: '全部在瀏覽器裡跑 — 不用裝東西，也什麼都不上傳。',
    hubFoot: '免費裝置檢測',
    eyebrow: '裝置',
  },
};
