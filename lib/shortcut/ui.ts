/**
 * 단축키 화면의 문구 — 열 언어.
 *
 * 단축키마다 다른 설명은 desc.ts에 있고, 여기에는 화면 틀과 앱 이름만 둔다.
 * 키 이름(Ctrl·Cmd·Shift·F4)은 자판과 프로그램이 정한 것이라 옮기지 않는다 —
 * 번역한 Ctrl은 아무 데도 눌 수 없는 글자가 된다. /cmd가 명령 이름을 두는
 * 이유와 같다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ScApp } from './types.ts';
import type { ScFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ScUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  hubNotice: string;
  appLabel: Record<ScApp, string>;
  appNote: Record<ScApp, string>;
  winTitle: string;
  macTitle: string;
  sameNote: string;
  naNote: string;
  groupLabel: string;
  keysLabel: string;
  actionCol: string;
  keysCol: string;
  relatedTitle: string;
  crossTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (action: string, app: string) => string;
  metaDesc: (win: string, mac: string, desc: string) => string;
  hubFaq: FaqItem[];
  itemFaq: (f: ScFacts, desc: string, app: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof ScUI]: L<ScUI[K]> };

/** 앱 이름은 상표라 열 언어가 대체로 같다 — 중국어권만 널리 쓰는 역명이 있다 */
const APPS = (macos: string, windows: string, terminal: string): Record<ScApp, string> => ({
  vscode: 'VS Code', excel: 'Excel', sheets: 'Google Sheets', chrome: 'Chrome',
  macos, windows, terminal, figma: 'Figma', photoshop: 'Photoshop', slack: 'Slack',
});

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T(
    '키보드 단축키', 'Keyboard shortcuts', 'Atajos de teclado', 'Atalhos de teclado',
    'キーボードショートカット', 'Tastenkürzel', 'Raccourcis clavier',
    'कीबोर्ड शॉर्टकट', '键盘快捷键', '鍵盤快速鍵',
  ),

  hubTitle: T(
    '앱별 키보드 단축키 사전',
    'Keyboard shortcuts by app',
    'Atajos de teclado por aplicación',
    'Atalhos de teclado por aplicativo',
    'アプリ別キーボードショートカット',
    'Tastenkürzel nach Programm',
    'Raccourcis clavier par application',
    'ऐप के हिसाब से कीबोर्ड शॉर्टकट',
    '各应用键盘快捷键大全',
    '各應用程式鍵盤快速鍵大全',
  ),

  hubLead: T(
    '{n}개의 단축키를 윈도우와 맥 조합을 나란히 두고 정리했습니다.',
    '{n} shortcuts, with the Windows and Mac combinations side by side.',
    '{n} atajos, con las combinaciones de Windows y Mac una al lado de la otra.',
    '{n} atalhos, com as combinações de Windows e Mac lado a lado.',
    '{n}件のショートカットを、Windows と Mac の組み合わせを並べて載せました。',
    '{n} Tastenkürzel — die Windows- und die Mac-Kombination stehen nebeneinander.',
    '{n} raccourcis, avec les combinaisons Windows et Mac côte à côte.',
    '{n} शॉर्टकट — Windows और Mac के संयोजन साथ-साथ।',
    '{n} 个快捷键，Windows 与 Mac 组合并排列出。',
    '{n} 個快速鍵，Windows 與 Mac 組合並排列出。',
  ),

  hubNotice: T(
    '노트북에서는 F1~F12가 밝기·음량으로 먼저 잡혀 있어, F 키가 들어간 조합은 Fn을 함께 눌러야 할 수 있습니다. 맥에서는 시스템 설정 › 키보드에서 이 순서를 바꿀 수 있습니다.',
    'On laptops the F1–F12 row usually acts as brightness and volume first, so combinations with an F key may need Fn held as well. On a Mac you can flip that in System Settings › Keyboard.',
    'En los portátiles la fila F1–F12 suele controlar brillo y volumen, así que las combinaciones con una tecla F pueden necesitar Fn. En Mac puedes invertirlo en Ajustes del sistema › Teclado.',
    'Em notebooks a fileira F1–F12 costuma controlar brilho e volume, então combinações com uma tecla F podem exigir Fn. No Mac isso se inverte em Ajustes do Sistema › Teclado.',
    'ノートでは F1〜F12 が明るさや音量に割り当てられていることが多く、F キーを含む組み合わせは Fn も一緒に押す必要があります。Mac ならシステム設定 › キーボードで入れ替えられます。',
    'Auf Notebooks liegt auf F1–F12 meist Helligkeit und Lautstärke; Kombinationen mit einer F-Taste brauchen dann zusätzlich Fn. Am Mac lässt sich das in den Systemeinstellungen › Tastatur umstellen.',
    'Sur un portable, la rangée F1–F12 pilote d’abord la luminosité et le volume : les combinaisons avec une touche F peuvent exiger Fn. Sur Mac, cela s’inverse dans Réglages Système › Clavier.',
    'लैपटॉप पर F1–F12 पहले चमक और आवाज़ चलाते हैं, इसलिए F कुंजी वाले संयोजनों में Fn भी दबाना पड़ सकता है। Mac पर इसे सिस्टम सेटिंग्स › कीबोर्ड में बदला जा सकता है।',
    '笔记本上 F1–F12 通常先管亮度和音量，所以含 F 键的组合可能还要按住 Fn。Mac 可在「系统设置 › 键盘」里调换。',
    '筆電上 F1–F12 通常先管亮度和音量，所以含 F 鍵的組合可能還要按住 Fn。Mac 可在「系統設定 › 鍵盤」裡調換。',
  ),

  appLabel: T(
    APPS('macOS', 'Windows', '터미널'),
    APPS('macOS', 'Windows', 'Terminal'),
    APPS('macOS', 'Windows', 'Terminal'),
    APPS('macOS', 'Windows', 'Terminal'),
    APPS('macOS', 'Windows', 'ターミナル'),
    APPS('macOS', 'Windows', 'Terminal'),
    APPS('macOS', 'Windows', 'Terminal'),
    APPS('macOS', 'Windows', 'टर्मिनल'),
    APPS('macOS', 'Windows', '终端'),
    APPS('macOS', 'Windows', '終端機'),
  ),

  appNote: T(
    {
      vscode: '명령 팔레트(Ctrl/Cmd+Shift+P)를 알면 나머지는 외우지 않아도 됩니다 — 기능 이름을 치면 그 옆에 단축키가 함께 보입니다.',
      excel: '엑셀은 맥에서 조합이 크게 다릅니다. F4(절대참조)가 맥에서는 Cmd+T이고, Ctrl 조합 일부는 맥에서도 Cmd가 아니라 Ctrl 그대로입니다.',
      sheets: '브라우저 안에서 돌기 때문에 Ctrl+W처럼 브라우저가 먼저 가져가는 조합은 시트에 닿지 않습니다. 시트 단축키는 Alt/Option 조합이 많은 이유입니다.',
      chrome: '닫은 탭 되살리기(Ctrl/Cmd+Shift+T)와 주소창 이동(Ctrl/Cmd+L)만 알아도 마우스로 가는 길이 크게 줄어듭니다.',
      macos: 'Cmd가 윈도우의 Ctrl 자리입니다. 다만 줄 끝으로 가기 같은 텍스트 이동은 Cmd가 아니라 Ctrl+A/E나 Cmd+←/→를 씁니다.',
      windows: 'Win 키 조합은 어느 프로그램에 있어도 먼저 잡힙니다 — 프로그램 단축키와 겹칠 걱정이 없는 대신, 프로그램 쪽에서 막을 수도 없습니다.',
      terminal: '터미널에서 Ctrl+C는 복사가 아니라 실행 중인 것을 끊는 신호입니다. 복사는 윈도우 터미널이 Ctrl+Shift+C, 맥이 Cmd+C입니다.',
      figma: '피그마는 도구 선택이 한 글자입니다(V·F·R·T). 텍스트를 편집하는 중에는 그 글자가 그대로 입력되니 Esc로 먼저 빠져나옵니다.',
      photoshop: '브러시 크기 조절([, ])처럼 대괄호를 쓰는 조합은 한글 자판에서도 그대로 동작하지만, 한글 입력 상태에서는 다른 단축키가 먹지 않을 때가 있습니다.',
      slack: '메시지 창에서 Enter가 보내기입니다. 줄바꿈은 Shift+Enter이고, 이 동작은 설정에서 서로 바꿀 수 있습니다.',
    },
    {
      vscode: 'Learn the command palette (Ctrl/Cmd+Shift+P) and you can skip memorising the rest — type a feature name and its shortcut is listed beside it.',
      excel: 'Excel diverges most on the Mac. F4 for absolute references is Cmd+T there, and a few Ctrl combinations stay Ctrl rather than becoming Cmd.',
      sheets: 'It runs inside the browser, so combinations the browser claims first — Ctrl+W, for one — never reach the sheet. That is why so many Sheets shortcuts use Alt/Option.',
      chrome: 'Reopening a closed tab (Ctrl/Cmd+Shift+T) and jumping to the address bar (Ctrl/Cmd+L) alone cut most of your trips to the mouse.',
      macos: 'Cmd sits where Windows puts Ctrl. Text movement is the exception: end of line is Ctrl+A/E or Cmd+←/→, not a Cmd version of the Windows key.',
      windows: 'Win-key combinations are captured before any program sees them — nothing can clash with them, and nothing can override them either.',
      terminal: 'In a terminal Ctrl+C is not copy; it interrupts whatever is running. Copy is Ctrl+Shift+C in Windows Terminal and Cmd+C on a Mac.',
      figma: 'Figma picks tools with single letters (V, F, R, T). While you are editing text those letters type themselves, so press Esc first.',
      photoshop: 'Bracket keys resize the brush ([ and ]) on every layout, but with a non-Latin input method active some other shortcuts stop responding.',
      slack: 'Enter sends the message in the composer. Shift+Enter makes a new line, and the two can be swapped in settings.',
    },
    {
      vscode: 'Aprende la paleta de comandos (Ctrl/Cmd+Shift+P) y no tendrás que memorizar el resto: escribes el nombre de la función y su atajo aparece al lado.',
      excel: 'Excel es donde más difieren Windows y Mac. F4 para referencias absolutas es Cmd+T en Mac, y algunas combinaciones siguen con Ctrl en lugar de Cmd.',
      sheets: 'Corre dentro del navegador, así que las combinaciones que el navegador toma primero —Ctrl+W, por ejemplo— nunca llegan a la hoja. Por eso tantos atajos usan Alt/Option.',
      chrome: 'Solo con reabrir la última pestaña (Ctrl/Cmd+Shift+T) e ir a la barra de direcciones (Ctrl/Cmd+L) te ahorras casi todos los viajes al ratón.',
      macos: 'Cmd ocupa el lugar del Ctrl de Windows. El movimiento por el texto es la excepción: el final de línea es Ctrl+A/E o Cmd+←/→.',
      windows: 'Las combinaciones con la tecla Win se capturan antes que cualquier programa: nada choca con ellas, y nada puede anularlas.',
      terminal: 'En una terminal Ctrl+C no copia: interrumpe lo que se esté ejecutando. Copiar es Ctrl+Shift+C en Windows Terminal y Cmd+C en Mac.',
      figma: 'Figma elige herramientas con una sola letra (V, F, R, T). Mientras editas texto esas letras se escriben, así que pulsa Esc primero.',
      photoshop: 'Los corchetes cambian el tamaño del pincel ([ y ]) en cualquier distribución, pero con un método de entrada no latino activo algunos atajos dejan de responder.',
      slack: 'En el cuadro de mensaje Enter envía. Shift+Enter hace un salto de línea, y ambos se pueden intercambiar en los ajustes.',
    },
    {
      vscode: 'Aprenda a paleta de comandos (Ctrl/Cmd+Shift+P) e não precisa decorar o resto: digite o nome do recurso e o atalho aparece ao lado.',
      excel: 'O Excel é onde Windows e Mac mais divergem. F4 para referência absoluta é Cmd+T no Mac, e algumas combinações continuam com Ctrl em vez de Cmd.',
      sheets: 'Roda dentro do navegador, então combinações que o navegador pega primeiro — Ctrl+W, por exemplo — nunca chegam à planilha. É por isso que tantos atalhos usam Alt/Option.',
      chrome: 'Só reabrir a aba fechada (Ctrl/Cmd+Shift+T) e ir para a barra de endereços (Ctrl/Cmd+L) já elimina quase toda ida ao mouse.',
      macos: 'Cmd fica onde o Windows põe Ctrl. A exceção é andar pelo texto: fim de linha é Ctrl+A/E ou Cmd+←/→.',
      windows: 'Combinações com a tecla Win são capturadas antes de qualquer programa — nada conflita com elas, e nada consegue sobrepô-las.',
      terminal: 'No terminal Ctrl+C não copia: interrompe o que está rodando. Copiar é Ctrl+Shift+C no Windows Terminal e Cmd+C no Mac.',
      figma: 'O Figma escolhe ferramentas com uma letra (V, F, R, T). Enquanto você edita texto essas letras são digitadas, então aperte Esc primeiro.',
      photoshop: 'As teclas de colchete mudam o tamanho do pincel ([ e ]) em qualquer layout, mas com um método de entrada não latino ativo alguns atalhos param de responder.',
      slack: 'No campo de mensagem Enter envia. Shift+Enter quebra a linha, e os dois podem ser trocados nas configurações.',
    },
    {
      vscode: 'コマンドパレット（Ctrl/Cmd+Shift+P）を覚えれば、あとは暗記しなくて済みます — 機能名を打つと、その横にショートカットが並びます。',
      excel: 'Excel は Mac で最も違います。絶対参照の F4 は Mac では Cmd+T で、一部の Ctrl 組み合わせは Cmd にならずそのまま Ctrl です。',
      sheets: 'ブラウザの中で動くので、Ctrl+W のようにブラウザが先に取る組み合わせはシートまで届きません。だから Alt/Option の組み合わせが多いのです。',
      chrome: '閉じたタブを戻す（Ctrl/Cmd+Shift+T）とアドレスバーへ移る（Ctrl/Cmd+L）の二つだけで、マウスに手を伸ばす回数がかなり減ります。',
      macos: 'Cmd が Windows の Ctrl の位置です。ただし行末へ移るような文字の移動は Cmd 版ではなく Ctrl+A/E か Cmd+←/→ を使います。',
      windows: 'Win キーの組み合わせはどのプログラムより先に取られます — 衝突の心配がない代わりに、プログラム側から上書きもできません。',
      terminal: 'ターミナルの Ctrl+C はコピーではなく、動いているものを中断する合図です。コピーは Windows ターミナルが Ctrl+Shift+C、Mac が Cmd+C です。',
      figma: 'Figma は道具を一文字で選びます（V・F・R・T）。テキスト編集中はその文字がそのまま入るので、まず Esc で抜けます。',
      photoshop: '角括弧はどの配列でもブラシの大きさを変えます（[ と ]）が、日本語入力が有効なときは効かないショートカットもあります。',
      slack: 'メッセージ欄では Enter が送信です。改行は Shift+Enter で、この二つは設定で入れ替えられます。',
    },
    {
      vscode: 'Wer die Befehlspalette kennt (Ctrl/Cmd+Shift+P), muss den Rest nicht auswendig lernen — man tippt den Funktionsnamen, das Kürzel steht daneben.',
      excel: 'Am Mac weicht Excel am stärksten ab. F4 für absolute Bezüge ist dort Cmd+T, und einige Ctrl-Kombinationen bleiben Ctrl statt Cmd zu werden.',
      sheets: 'Es läuft im Browser, deshalb erreichen Kombinationen, die der Browser zuerst greift — etwa Ctrl+W —, die Tabelle nie. Darum arbeiten so viele Kürzel mit Alt/Option.',
      chrome: 'Allein den geschlossenen Tab zurückholen (Ctrl/Cmd+Shift+T) und in die Adressleiste springen (Ctrl/Cmd+L) sparen die meisten Griffe zur Maus.',
      macos: 'Cmd liegt dort, wo Windows Ctrl hat. Ausnahme ist die Bewegung im Text: ans Zeilenende geht es mit Ctrl+A/E oder Cmd+←/→.',
      windows: 'Kombinationen mit der Win-Taste fängt das System vor jedem Programm ab — nichts kollidiert damit, und nichts kann sie überschreiben.',
      terminal: 'Im Terminal kopiert Ctrl+C nicht, es bricht das Laufende ab. Kopiert wird mit Ctrl+Shift+C im Windows Terminal und mit Cmd+C am Mac.',
      figma: 'Figma wählt Werkzeuge mit einzelnen Buchstaben (V, F, R, T). Beim Bearbeiten von Text schreiben sich diese Buchstaben selbst — erst Esc drücken.',
      photoshop: 'Die Klammertasten ändern auf jedem Layout die Pinselgröße ([ und ]), doch mit aktiver nichtlateinischer Eingabemethode reagieren manche Kürzel nicht.',
      slack: 'Im Nachrichtenfeld sendet Enter. Shift+Enter macht einen Zeilenumbruch; beides lässt sich in den Einstellungen tauschen.',
    },
    {
      vscode: 'Apprenez la palette de commandes (Ctrl/Cmd+Shift+P) et vous n’aurez pas à retenir le reste : tapez le nom d’une fonction, son raccourci s’affiche à côté.',
      excel: 'C’est sur Mac qu’Excel s’écarte le plus. F4 pour les références absolues devient Cmd+T, et certaines combinaisons gardent Ctrl au lieu de passer à Cmd.',
      sheets: 'Il tourne dans le navigateur : les combinaisons que celui-ci capte d’abord — Ctrl+W par exemple — n’atteignent jamais la feuille. D’où le grand nombre de raccourcis avec Alt/Option.',
      chrome: 'Rien que rouvrir l’onglet fermé (Ctrl/Cmd+Shift+T) et sauter dans la barre d’adresse (Ctrl/Cmd+L) supprime presque tous les allers-retours à la souris.',
      macos: 'Cmd occupe la place du Ctrl de Windows. Le déplacement dans le texte fait exception : la fin de ligne, c’est Ctrl+A/E ou Cmd+←/→.',
      windows: 'Les combinaisons avec la touche Win sont captées avant tout programme : rien n’entre en conflit avec elles, rien ne peut les remplacer.',
      terminal: 'Dans un terminal, Ctrl+C ne copie pas : il interrompt ce qui tourne. Pour copier, c’est Ctrl+Shift+C dans Windows Terminal et Cmd+C sur Mac.',
      figma: 'Figma choisit les outils avec une seule lettre (V, F, R, T). Pendant l’édition de texte ces lettres s’écrivent : appuyez d’abord sur Échap.',
      photoshop: 'Les crochets règlent la taille du pinceau ([ et ]) sur toutes les dispositions, mais avec une méthode de saisie non latine active, certains raccourcis ne répondent plus.',
      slack: 'Dans le champ de message, Entrée envoie. Maj+Entrée passe à la ligne, et les deux s’échangent dans les réglages.',
    },
    {
      vscode: 'कमांड पैलेट (Ctrl/Cmd+Shift+P) आ जाए तो बाक़ी रटने की ज़रूरत नहीं — फ़ीचर का नाम टाइप कीजिए, शॉर्टकट उसके बग़ल में दिख जाता है।',
      excel: 'Mac पर Excel सबसे ज़्यादा अलग है। absolute reference का F4 वहाँ Cmd+T है, और कुछ संयोजनों में Cmd नहीं, Ctrl ही रहता है।',
      sheets: 'यह ब्राउज़र के अंदर चलता है, इसलिए जो संयोजन ब्राउज़र पहले ले लेता है — जैसे Ctrl+W — वे शीट तक पहुँचते ही नहीं। इसीलिए इतने शॉर्टकट Alt/Option वाले हैं।',
      chrome: 'बंद हुआ टैब वापस लाना (Ctrl/Cmd+Shift+T) और पता-पट्टी पर जाना (Ctrl/Cmd+L) — बस ये दो माउस तक जाने के ज़्यादातर चक्कर बचा देते हैं।',
      macos: 'Windows का Ctrl जहाँ है, वहाँ Cmd है। टेक्स्ट में घूमना अपवाद है: पंक्ति के अंत में Ctrl+A/E या Cmd+←/→ से जाते हैं।',
      windows: 'Win कुंजी वाले संयोजन किसी भी प्रोग्राम से पहले पकड़ लिए जाते हैं — टकराव का डर नहीं, पर प्रोग्राम उन्हें बदल भी नहीं सकता।',
      terminal: 'टर्मिनल में Ctrl+C कॉपी नहीं है, वह चल रही चीज़ को रोकने का संकेत है। कॉपी Windows Terminal में Ctrl+Shift+C और Mac पर Cmd+C है।',
      figma: 'Figma में औज़ार एक अक्षर से चुने जाते हैं (V, F, R, T)। टेक्स्ट लिखते समय वही अक्षर टाइप हो जाते हैं, इसलिए पहले Esc दबाएँ।',
      photoshop: 'ब्रैकेट कुंजियाँ हर लेआउट पर ब्रश का आकार बदलती हैं ([ और ]), पर देवनागरी इनपुट चालू हो तो कुछ शॉर्टकट काम करना बंद कर देते हैं।',
      slack: 'संदेश बॉक्स में Enter भेजता है। नई पंक्ति Shift+Enter से बनती है, और सेटिंग्स में दोनों को बदला जा सकता है।',
    },
    {
      vscode: '记住命令面板（Ctrl/Cmd+Shift+P），其余就不用背了——输入功能名，快捷键就列在旁边。',
      excel: 'Excel 在 Mac 上差别最大。绝对引用的 F4 在 Mac 是 Cmd+T，还有几个组合仍是 Ctrl 而不是 Cmd。',
      sheets: '它跑在浏览器里，所以浏览器先抢走的组合——比如 Ctrl+W——根本到不了表格。这就是表格快捷键多用 Alt/Option 的原因。',
      chrome: '只要会恢复关掉的标签页（Ctrl/Cmd+Shift+T）和跳到地址栏（Ctrl/Cmd+L），伸手去摸鼠标的次数就少了一大半。',
      macos: 'Cmd 在 Windows 的 Ctrl 位置上。文字移动是例外：到行尾用 Ctrl+A/E 或 Cmd+←/→。',
      windows: 'Win 键组合会在任何程序之前被系统截走——不会跟程序冲突，程序也无法覆盖它。',
      terminal: '终端里的 Ctrl+C 不是复制，是中断正在运行的东西。复制在 Windows 终端是 Ctrl+Shift+C，Mac 是 Cmd+C。',
      figma: 'Figma 用单个字母选工具（V、F、R、T）。编辑文字时这些字母会直接打进去，先按 Esc 退出。',
      photoshop: '方括号在任何键盘布局下都能改笔刷大小（[ 和 ]），但开着中文输入法时，有些快捷键会没反应。',
      slack: '消息框里 Enter 是发送，换行是 Shift+Enter，这两个可以在设置里互换。',
    },
    {
      vscode: '記住命令選擇區（Ctrl/Cmd+Shift+P），其餘就不用背了——輸入功能名稱，快速鍵就列在旁邊。',
      excel: 'Excel 在 Mac 上差別最大。絕對參照的 F4 在 Mac 是 Cmd+T，還有幾個組合仍是 Ctrl 而不是 Cmd。',
      sheets: '它跑在瀏覽器裡，所以瀏覽器先搶走的組合——例如 Ctrl+W——根本到不了試算表。這就是表格快速鍵多用 Alt/Option 的原因。',
      chrome: '只要會復原關掉的分頁（Ctrl/Cmd+Shift+T）和跳到網址列（Ctrl/Cmd+L），伸手去摸滑鼠的次數就少了一大半。',
      macos: 'Cmd 在 Windows 的 Ctrl 位置上。文字移動是例外：到行尾用 Ctrl+A/E 或 Cmd+←/→。',
      windows: 'Win 鍵組合會在任何程式之前被系統攔走——不會跟程式衝突，程式也無法覆蓋它。',
      terminal: '終端機裡的 Ctrl+C 不是複製，是中斷正在執行的東西。複製在 Windows 終端機是 Ctrl+Shift+C，Mac 是 Cmd+C。',
      figma: 'Figma 用單個字母選工具（V、F、R、T）。編輯文字時這些字母會直接打進去，先按 Esc 離開。',
      photoshop: '方括號在任何鍵盤配置下都能改筆刷大小（[ 和 ]），但開著中文輸入法時，有些快速鍵會沒反應。',
      slack: '訊息框裡 Enter 是送出，換行是 Shift+Enter，這兩個可以在設定裡互換。',
    },
  ),

  winTitle: T('Windows · Linux', 'Windows · Linux', 'Windows · Linux', 'Windows · Linux', 'Windows・Linux', 'Windows · Linux', 'Windows · Linux', 'Windows · Linux', 'Windows · Linux', 'Windows · Linux'),

  macTitle: T('Mac', 'Mac', 'Mac', 'Mac', 'Mac', 'Mac', 'Mac', 'Mac', 'Mac', 'Mac'),

  sameNote: T(
    '두 운영체제가 같은 조합을 씁니다.',
    'Both systems use the same combination.',
    'Ambos sistemas usan la misma combinación.',
    'Os dois sistemas usam a mesma combinação.',
    'どちらの OS も同じ組み合わせです。',
    'Beide Systeme nutzen dieselbe Kombination.',
    'Les deux systèmes utilisent la même combinaison.',
    'दोनों सिस्टम एक ही संयोजन इस्तेमाल करते हैं।',
    '两个系统用的是同一个组合。',
    '兩個系統用的是同一個組合。',
  ),

  naNote: T(
    '이 운영체제에는 없습니다',
    'Not on this system',
    'No existe en este sistema',
    'Não existe neste sistema',
    'この OS にはありません',
    'Auf diesem System nicht vorhanden',
    'N’existe pas sur ce système',
    'इस सिस्टम पर नहीं है',
    '这个系统上没有',
    '這個系統上沒有',
  ),

  groupLabel: T('갈래', 'Group', 'Grupo', 'Grupo', '分類', 'Gruppe', 'Groupe', 'समूह', '分组', '分組'),

  keysLabel: T('누르는 키 수', 'Keys held', 'Teclas a la vez', 'Teclas juntas', '同時に押す数', 'Tasten gleichzeitig', 'Touches simultanées', 'एक साथ कुंजियाँ', '同时按几个键', '同時按幾個鍵'),

  actionCol: T('하는 일', 'Action', 'Acción', 'Ação', '動作', 'Aktion', 'Action', 'काम', '功能', '功能'),

  keysCol: T('키 조합', 'Keys', 'Teclas', 'Teclas', 'キー', 'Tasten', 'Touches', 'कुंजियाँ', '按键', '按鍵'),

  relatedTitle: T('같이 쓰는 단축키', 'Shortcuts nearby', 'Atajos cercanos', 'Atalhos próximos', '近くのショートカット', 'Verwandte Kürzel', 'Raccourcis voisins', 'साथ के शॉर्टकट', '相关快捷键', '相關快速鍵'),

  crossTitle: T('다른 앱의 같은 기능', 'The same action elsewhere', 'La misma acción en otras apps', 'A mesma ação em outros apps', '他のアプリの同じ動作', 'Dieselbe Aktion anderswo', 'La même action ailleurs', 'दूसरे ऐप में वही काम', '其他应用里的同一功能', '其他應用程式裡的同一功能'),

  howTitle: T('키 이름 읽는 법', 'Reading the key names', 'Cómo leer los nombres de teclas', 'Como ler os nomes das teclas', 'キー名の読み方', 'Die Tastennamen lesen', 'Lire les noms de touches', 'कुंजियों के नाम पढ़ना', '按键名称怎么读', '按鍵名稱怎麼讀'),

  how: T(
    [
      '+로 이은 키는 함께 누릅니다. Ctrl+Shift+P는 Ctrl과 Shift를 누른 채 P입니다.',
      '맥의 Cmd는 ⌘, Option은 ⌥(자판에 Alt로도 적혀 있습니다), Ctrl은 ⌃, Shift는 ⇧입니다.',
      '윈도우의 Ctrl은 맥에서 대개 Cmd로 옮겨지지만 늘 그렇지는 않습니다 — 이 사전은 두 조합을 따로 적어 둡니다.',
      '한글·일본어·중국어 입력 상태에서는 글자 키가 들어간 단축키가 먹지 않을 수 있습니다. 영문 입력으로 바꾸고 다시 눌러 봅니다.',
      '조합이 안 듣는다면 다른 프로그램이 전역 단축키로 먼저 잡고 있을 때가 많습니다.',
    ],
    [
      'Keys joined by + are pressed together: Ctrl+Shift+P means hold Ctrl and Shift, then P.',
      'On a Mac, Cmd is ⌘, Option is ⌥ (labelled Alt on some keyboards), Control is ⌃ and Shift is ⇧.',
      'Windows Ctrl usually becomes Cmd on a Mac, but not always — this reference lists both combinations separately.',
      'With a Korean, Japanese or Chinese input method active, shortcuts built on letter keys may not fire. Switch to Latin input and try again.',
      'When a combination does nothing, another program has often claimed it as a global shortcut first.',
    ],
    [
      'Las teclas unidas por + se pulsan juntas: Ctrl+Shift+P es mantener Ctrl y Shift y pulsar P.',
      'En Mac, Cmd es ⌘, Option es ⌥ (en algunos teclados dice Alt), Control es ⌃ y Shift es ⇧.',
      'El Ctrl de Windows suele pasar a Cmd en Mac, pero no siempre: aquí las dos combinaciones van por separado.',
      'Con un método de entrada coreano, japonés o chino activo, los atajos con letras pueden no responder. Cambia a entrada latina y prueba de nuevo.',
      'Si una combinación no hace nada, lo habitual es que otro programa la haya tomado como atajo global.',
    ],
    [
      'Teclas unidas por + são pressionadas juntas: Ctrl+Shift+P é segurar Ctrl e Shift e apertar P.',
      'No Mac, Cmd é ⌘, Option é ⌥ (em alguns teclados vem escrito Alt), Control é ⌃ e Shift é ⇧.',
      'O Ctrl do Windows geralmente vira Cmd no Mac, mas não sempre: aqui as duas combinações aparecem separadas.',
      'Com um método de entrada coreano, japonês ou chinês ativo, atalhos com letras podem não disparar. Troque para entrada latina e tente de novo.',
      'Quando uma combinação não faz nada, em geral outro programa a tomou como atalho global.',
    ],
    [
      '+ でつないだキーは同時に押します。Ctrl+Shift+P は Ctrl と Shift を押したまま P です。',
      'Mac の Cmd は ⌘、Option は ⌥（Alt と刻印された配列もあります）、Control は ⌃、Shift は ⇧ です。',
      'Windows の Ctrl は Mac ではおおむね Cmd になりますが、例外があります — この事典は両方を別に載せています。',
      '日本語・韓国語・中国語の入力が有効なとき、文字キーを使うショートカットは効かないことがあります。英数入力に切り替えて試します。',
      '組み合わせが反応しないときは、別のプログラムがグローバルショートカットとして先に取っていることが多いです。',
    ],
    [
      'Mit + verbundene Tasten drückt man zusammen: Ctrl+Shift+P heißt Ctrl und Shift halten, dann P.',
      'Am Mac ist Cmd ⌘, Option ⌥ (auf manchen Tastaturen Alt), Control ⌃ und Shift ⇧.',
      'Windows-Ctrl wird am Mac meist zu Cmd, aber nicht immer — dieses Verzeichnis nennt beide Kombinationen getrennt.',
      'Bei aktiver koreanischer, japanischer oder chinesischer Eingabemethode reagieren Kürzel mit Buchstabentasten oft nicht. Auf lateinische Eingabe wechseln und erneut drücken.',
      'Tut eine Kombination gar nichts, hat sie meist ein anderes Programm als globales Kürzel belegt.',
    ],
    [
      'Les touches reliées par + se pressent ensemble : Ctrl+Shift+P, c’est maintenir Ctrl et Shift puis appuyer sur P.',
      'Sur Mac, Cmd est ⌘, Option est ⌥ (marquée Alt sur certains claviers), Control est ⌃ et Maj est ⇧.',
      'Le Ctrl de Windows devient généralement Cmd sur Mac, mais pas toujours : ce répertoire donne les deux combinaisons séparément.',
      'Avec une méthode de saisie coréenne, japonaise ou chinoise active, les raccourcis à base de lettres peuvent rester muets. Repassez en saisie latine et réessayez.',
      'Quand une combinaison ne fait rien, c’est souvent qu’un autre programme l’a prise comme raccourci global.',
    ],
    [
      '+ से जुड़ी कुंजियाँ साथ दबाई जाती हैं। Ctrl+Shift+P का मतलब है Ctrl और Shift दबाए रखकर P।',
      'Mac पर Cmd ⌘ है, Option ⌥ (कुछ कीबोर्ड पर Alt लिखा होता है), Control ⌃ और Shift ⇧।',
      'Windows का Ctrl Mac पर आम तौर पर Cmd बन जाता है, पर हमेशा नहीं — यहाँ दोनों संयोजन अलग-अलग दिए हैं।',
      'कोरियाई, जापानी या चीनी इनपुट चालू हो तो अक्षर वाली कुंजियों के शॉर्टकट काम नहीं करते। लैटिन इनपुट पर जाकर फिर दबाएँ।',
      'कोई संयोजन कुछ न करे, तो अक्सर किसी दूसरे प्रोग्राम ने उसे ग्लोबल शॉर्टकट के तौर पर पहले ले लिया होता है।',
    ],
    [
      '用 + 连起来的键要一起按。Ctrl+Shift+P 是按住 Ctrl 和 Shift 再按 P。',
      'Mac 上 Cmd 是 ⌘，Option 是 ⌥（有些键盘上印作 Alt），Control 是 ⌃，Shift 是 ⇧。',
      'Windows 的 Ctrl 在 Mac 上大多换成 Cmd，但并非总是如此——本词典把两个组合分开列出。',
      '开着韩文、日文或中文输入法时，含字母键的快捷键可能没反应。切到英文输入再试。',
      '组合按下去毫无反应，通常是别的程序把它当全局快捷键先占了。',
    ],
    [
      '用 + 連起來的鍵要一起按。Ctrl+Shift+P 是按住 Ctrl 和 Shift 再按 P。',
      'Mac 上 Cmd 是 ⌘，Option 是 ⌥（有些鍵盤上印作 Alt），Control 是 ⌃，Shift 是 ⇧。',
      'Windows 的 Ctrl 在 Mac 上大多換成 Cmd，但並非總是如此——本詞典把兩個組合分開列出。',
      '開著韓文、日文或中文輸入法時，含字母鍵的快速鍵可能沒反應。切到英文輸入再試。',
      '組合按下去毫無反應，通常是別的程式把它當全域快速鍵先占了。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),


  hubMetaTitle: T(
    '키보드 단축키 사전 {n}개 — 윈도우·맥 한눈에',
    '{n} keyboard shortcuts — Windows and Mac side by side',
    '{n} atajos de teclado — Windows y Mac juntos',
    '{n} atalhos de teclado — Windows e Mac lado a lado',
    'キーボードショートカット事典 {n}件 — Windows と Mac を並べて',
    '{n} Tastenkürzel — Windows und Mac nebeneinander',
    '{n} raccourcis clavier — Windows et Mac côte à côte',
    '{n} कीबोर्ड शॉर्टकट — Windows और Mac साथ-साथ',
    '{n} 个键盘快捷键 — Windows 与 Mac 对照',
    '{n} 個鍵盤快速鍵 — Windows 與 Mac 對照',
  ),

  hubMetaDesc: T(
    'VS Code·엑셀·크롬·피그마 등 열 개 프로그램의 단축키 {n}개. 조합마다 무엇을 하고 무엇을 틀리기 쉬운지 함께 적었습니다.',
    '{n} shortcuts across ten programs — VS Code, Excel, Chrome, Figma and more. Each entry says what the combination does and where people trip.',
    '{n} atajos en diez programas: VS Code, Excel, Chrome, Figma y más. Cada ficha dice qué hace la combinación y dónde se tropieza.',
    '{n} atalhos em dez programas: VS Code, Excel, Chrome, Figma e outros. Cada ficha diz o que a combinação faz e onde as pessoas erram.',
    'VS Code・Excel・Chrome・Figma など十のプログラムのショートカット {n}件。何をするかと、どこでつまずくかを添えました。',
    '{n} Tastenkürzel aus zehn Programmen — VS Code, Excel, Chrome, Figma und mehr. Jeder Eintrag nennt die Wirkung und die typische Stolperstelle.',
    '{n} raccourcis dans dix programmes : VS Code, Excel, Chrome, Figma et d’autres. Chaque fiche dit ce que fait la combinaison et où l’on trébuche.',
    'VS Code, Excel, Chrome, Figma जैसे दस प्रोग्राम के {n} शॉर्टकट। हर संयोजन के साथ लिखा है वह क्या करता है और कहाँ चूक होती है।',
    'VS Code、Excel、Chrome、Figma 等十个程序共 {n} 个快捷键。每条都写了它做什么、哪里容易弄错。',
    'VS Code、Excel、Chrome、Figma 等十個程式共 {n} 個快速鍵。每條都寫了它做什麼、哪裡容易弄錯。',
  ),

  metaTitle: T(
    (a: string, app: string) => `${app} ${a} 단축키`,
    (a: string, app: string) => `${a} in ${app}`,
    (a: string, app: string) => `${a} en ${app}`,
    (a: string, app: string) => `${a} no ${app}`,
    (a: string, app: string) => `${app} の ${a} ショートカット`,
    (a: string, app: string) => `${a} in ${app}`,
    (a: string, app: string) => `${a} dans ${app}`,
    (a: string, app: string) => `${app} में ${a}`,
    (a: string, app: string) => `${app} 的 ${a} 快捷键`,
    (a: string, app: string) => `${app} 的 ${a} 快速鍵`,
  ),

  metaDesc: T(
    (w: string, m: string, d: string) => `Windows ${w}, Mac ${m}. ${d}`,
    (w: string, m: string, d: string) => `${w} on Windows, ${m} on Mac. ${d}`,
    (w: string, m: string, d: string) => `${w} en Windows, ${m} en Mac. ${d}`,
    (w: string, m: string, d: string) => `${w} no Windows, ${m} no Mac. ${d}`,
    (w: string, m: string, d: string) => `Windows は ${w}、Mac は ${m}。${d}`,
    (w: string, m: string, d: string) => `${w} unter Windows, ${m} am Mac. ${d}`,
    (w: string, m: string, d: string) => `${w} sous Windows, ${m} sur Mac. ${d}`,
    (w: string, m: string, d: string) => `Windows पर ${w}, Mac पर ${m}। ${d}`,
    (w: string, m: string, d: string) => `Windows 是 ${w}，Mac 是 ${m}。${d}`,
    (w: string, m: string, d: string) => `Windows 是 ${w}，Mac 是 ${m}。${d}`,
  ),

  hubFaq: T(
    [
      { q: '키 이름을 번역하지 않는 이유가 무엇인가요?', a: '자판에 그렇게 적혀 있기 때문입니다. Ctrl을 옮겨 적으면 어느 키를 누를지 알 수 없게 됩니다. 언어를 따르는 것은 그 조합이 무엇을 하는지에 대한 설명뿐입니다.' },
      { q: '윈도우 조합을 맥에서 그대로 쓸 수 있나요?', a: '대개 Ctrl을 Cmd로 바꾸면 맞지만 예외가 많습니다. 엑셀의 F4는 맥에서 Cmd+T이고, 줄 끝으로 가기는 맥에서 Cmd+→입니다. 그래서 두 조합을 따로 적었습니다.' },
      { q: '눌러도 아무 일이 없습니다.', a: '세 가지를 봅니다. 한글 입력 상태인지, F 키라면 Fn을 함께 눌러야 하는 노트북인지, 다른 프로그램이 전역 단축키로 먼저 가져갔는지입니다.' },
      { q: '단축키를 바꿀 수 있나요?', a: 'VS Code·피그마·포토샵은 키 지정 화면이 따로 있고, 엑셀은 매크로에 조합을 붙일 수 있습니다. 브라우저와 운영체제 조합은 대체로 바꿀 수 없습니다.' },
    ],
    [
      { q: 'Why aren’t the key names translated?', a: 'Because that is what the keyboard says. A translated Ctrl leaves you guessing which key to press. Only the explanation of what a combination does follows the language.' },
      { q: 'Can I use the Windows combination on a Mac?', a: 'Swapping Ctrl for Cmd is right most of the time, but there are plenty of exceptions — Excel’s F4 is Cmd+T on a Mac, and end of line is Cmd+→. That is why both are listed.' },
      { q: 'Nothing happens when I press it.', a: 'Check three things: whether a non-Latin input method is active, whether your laptop needs Fn for the F-key row, and whether another program has claimed the combination globally.' },
      { q: 'Can shortcuts be changed?', a: 'VS Code, Figma and Photoshop have their own key-binding screens, and Excel lets you attach a combination to a macro. Browser and operating-system combinations mostly cannot be changed.' },
    ],
    [
      { q: '¿Por qué no se traducen los nombres de las teclas?', a: 'Porque es lo que dice el teclado. Un Ctrl traducido te deja adivinando qué tecla pulsar. Solo la explicación de lo que hace la combinación sigue el idioma.' },
      { q: '¿Puedo usar la combinación de Windows en Mac?', a: 'Cambiar Ctrl por Cmd acierta casi siempre, pero hay muchas excepciones: el F4 de Excel es Cmd+T en Mac, y el final de línea es Cmd+→. Por eso aparecen las dos.' },
      { q: 'No pasa nada al pulsarla.', a: 'Revisa tres cosas: si hay activo un método de entrada no latino, si tu portátil necesita Fn para la fila de teclas F, y si otro programa se quedó con la combinación de forma global.' },
      { q: '¿Se pueden cambiar los atajos?', a: 'VS Code, Figma y Photoshop tienen su propia pantalla de asignación, y Excel permite asociar una combinación a una macro. Las del navegador y del sistema casi nunca se pueden cambiar.' },
    ],
    [
      { q: 'Por que os nomes das teclas não são traduzidos?', a: 'Porque é o que está escrito no teclado. Um Ctrl traduzido deixa você adivinhando qual tecla apertar. Só a explicação do que a combinação faz acompanha o idioma.' },
      { q: 'Posso usar a combinação do Windows no Mac?', a: 'Trocar Ctrl por Cmd acerta na maioria das vezes, mas há muitas exceções: o F4 do Excel é Cmd+T no Mac, e o fim da linha é Cmd+→. Por isso as duas estão listadas.' },
      { q: 'Não acontece nada quando eu aperto.', a: 'Veja três coisas: se há um método de entrada não latino ativo, se o notebook exige Fn na fileira de teclas F, e se outro programa tomou a combinação de forma global.' },
      { q: 'Dá para mudar os atalhos?', a: 'VS Code, Figma e Photoshop têm telas próprias de atribuição, e o Excel permite ligar uma combinação a uma macro. As do navegador e do sistema quase nunca podem ser trocadas.' },
    ],
    [
      { q: 'キー名を訳さないのはなぜですか。', a: 'キーボードにそう書いてあるからです。訳した Ctrl では、どのキーを押すのか分かりません。言語に合わせるのは、その組み合わせが何をするかの説明だけです。' },
      { q: 'Windows の組み合わせを Mac でそのまま使えますか。', a: 'Ctrl を Cmd に替えればおおむね合いますが、例外が多いです。Excel の F4 は Mac では Cmd+T、行末へは Cmd+→ です。だから両方を別に載せています。' },
      { q: '押しても何も起きません。', a: '三つ見ます。日本語入力になっていないか、F キーなら Fn が必要なノートか、別のプログラムがグローバルショートカットとして先に取っていないかです。' },
      { q: 'ショートカットは変えられますか。', a: 'VS Code・Figma・Photoshop には割り当て画面があり、Excel はマクロに組み合わせを結び付けられます。ブラウザや OS の組み合わせはたいてい変えられません。' },
    ],
    [
      { q: 'Warum werden die Tastennamen nicht übersetzt?', a: 'Weil es so auf der Tastatur steht. Ein übersetztes Ctrl lässt offen, welche Taste gemeint ist. Nur die Erklärung, was die Kombination bewirkt, folgt der Sprache.' },
      { q: 'Funktioniert die Windows-Kombination am Mac?', a: 'Ctrl durch Cmd zu ersetzen stimmt meistens, aber es gibt viele Ausnahmen: Excels F4 ist am Mac Cmd+T, und ans Zeilenende geht Cmd+→. Deshalb stehen beide da.' },
      { q: 'Beim Drücken passiert nichts.', a: 'Drei Dinge prüfen: eine aktive nichtlateinische Eingabemethode, ein Notebook, das für die F-Reihe Fn verlangt, und ein anderes Programm, das die Kombination global belegt hat.' },
      { q: 'Lassen sich Kürzel ändern?', a: 'VS Code, Figma und Photoshop haben eigene Zuweisungsdialoge, und Excel kann eine Kombination an ein Makro binden. Kombinationen von Browser und Betriebssystem sind meist fest.' },
    ],
    [
      { q: 'Pourquoi ne pas traduire les noms de touches ?', a: 'Parce que c’est ce qui est écrit sur le clavier. Un Ctrl traduit laisse deviner quelle touche presser. Seule l’explication de l’effet suit la langue.' },
      { q: 'Puis-je utiliser la combinaison Windows sur Mac ?', a: 'Remplacer Ctrl par Cmd marche le plus souvent, mais les exceptions sont nombreuses : le F4 d’Excel devient Cmd+T, et la fin de ligne c’est Cmd+→. D’où les deux entrées.' },
      { q: 'Rien ne se passe quand j’appuie.', a: 'Vérifiez trois points : une méthode de saisie non latine active, un portable qui exige Fn pour la rangée F, et un autre programme qui a pris la combinaison en global.' },
      { q: 'Peut-on modifier les raccourcis ?', a: 'VS Code, Figma et Photoshop ont leur écran d’affectation, et Excel permet d’associer une combinaison à une macro. Celles du navigateur et du système sont rarement modifiables.' },
    ],
    [
      { q: 'कुंजियों के नाम का अनुवाद क्यों नहीं होता?', a: 'क्योंकि कीबोर्ड पर वही लिखा है। अनुवाद किया Ctrl बताता ही नहीं कि कौन-सी कुंजी दबानी है। भाषा सिर्फ़ इस व्याख्या की बदलती है कि संयोजन क्या करता है।' },
      { q: 'Windows का संयोजन Mac पर चलेगा?', a: 'Ctrl की जगह Cmd रखना अक्सर सही बैठता है, पर अपवाद बहुत हैं — Excel का F4 Mac पर Cmd+T है, और पंक्ति का अंत Cmd+→। इसीलिए दोनों अलग दिए हैं।' },
      { q: 'दबाने पर कुछ नहीं होता।', a: 'तीन चीज़ें देखें: कोई ग़ैर-लैटिन इनपुट चालू है क्या, F पंक्ति के लिए लैपटॉप को Fn चाहिए क्या, और किसी दूसरे प्रोग्राम ने उस संयोजन को ग्लोबल तौर पर ले रखा है क्या।' },
      { q: 'शॉर्टकट बदले जा सकते हैं?', a: 'VS Code, Figma और Photoshop में अलग असाइनमेंट स्क्रीन है, और Excel में संयोजन को मैक्रो से जोड़ा जा सकता है। ब्राउज़र और सिस्टम के संयोजन आम तौर पर नहीं बदलते।' },
    ],
    [
      { q: '为什么按键名不翻译？', a: '因为键盘上就是这么印的。翻译过的 Ctrl 让人猜不出该按哪个键。跟着语言变的只是「这个组合做什么」的说明。' },
      { q: 'Windows 的组合能直接在 Mac 上用吗？', a: '把 Ctrl 换成 Cmd 大多数时候对，但例外不少——Excel 的 F4 在 Mac 是 Cmd+T，到行尾是 Cmd+→。所以两个都列出来了。' },
      { q: '按了没反应。', a: '看三点：是不是开着中文输入法；F 键那排在你的笔记本上要不要配 Fn；有没有别的程序把这个组合注册成全局快捷键。' },
      { q: '快捷键能改吗？', a: 'VS Code、Figma、Photoshop 都有自己的按键设置界面，Excel 可以把组合绑到宏上。浏览器和操作系统的组合基本改不了。' },
    ],
    [
      { q: '為什麼按鍵名不翻譯？', a: '因為鍵盤上就是這麼印的。翻譯過的 Ctrl 讓人猜不出該按哪個鍵。跟著語言變的只是「這個組合做什麼」的說明。' },
      { q: 'Windows 的組合能直接在 Mac 上用嗎？', a: '把 Ctrl 換成 Cmd 大多數時候對，但例外不少——Excel 的 F4 在 Mac 是 Cmd+T，到行尾是 Cmd+→。所以兩個都列出來了。' },
      { q: '按了沒反應。', a: '看三點：是不是開著中文輸入法；F 鍵那排在你的筆電上要不要配 Fn；有沒有別的程式把這個組合註冊成全域快速鍵。' },
      { q: '快速鍵能改嗎？', a: 'VS Code、Figma、Photoshop 都有自己的按鍵設定畫面，Excel 可以把組合綁到巨集上。瀏覽器和作業系統的組合基本改不了。' },
    ],
  ),

  itemFaq: T(
    (f: ScFacts, d: string, app: string) => [
      { q: `${app}에서 ${f.item.action} 단축키는 무엇인가요?`, a: `${d} Windows에서는 ${f.item.win}, Mac에서는 ${f.item.mac}입니다.` },
      { q: '윈도우와 맥이 같은가요?', a: f.differs ? `다릅니다. Windows ${f.item.win}, Mac ${f.item.mac}입니다.` : `같습니다. 두 곳 모두 ${f.item.win}입니다.` },
      { q: '키를 몇 개 눌러야 하나요?', a: `${f.keyCount}개를 함께 누릅니다. ${app}의 ${f.item.group} 갈래에 있는 조합입니다.` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `What is the shortcut for ${f.item.action} in ${app}?`, a: `${d} It is ${f.item.win} on Windows and ${f.item.mac} on a Mac.` },
      { q: 'Is it the same on Windows and Mac?', a: f.differs ? `No — ${f.item.win} on Windows, ${f.item.mac} on a Mac.` : `Yes, ${f.item.win} on both.` },
      { q: 'How many keys is that?', a: `${f.keyCount} pressed together. The combination sits under ${f.item.group} in ${app}.` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `¿Cuál es el atajo de ${f.item.action} en ${app}?`, a: `${d} Es ${f.item.win} en Windows y ${f.item.mac} en Mac.` },
      { q: '¿Es igual en Windows y Mac?', a: f.differs ? `No: ${f.item.win} en Windows, ${f.item.mac} en Mac.` : `Sí, ${f.item.win} en ambos.` },
      { q: '¿Cuántas teclas son?', a: `${f.keyCount} a la vez. La combinación está en ${f.item.group} dentro de ${app}.` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `Qual é o atalho de ${f.item.action} no ${app}?`, a: `${d} É ${f.item.win} no Windows e ${f.item.mac} no Mac.` },
      { q: 'É igual no Windows e no Mac?', a: f.differs ? `Não: ${f.item.win} no Windows, ${f.item.mac} no Mac.` : `Sim, ${f.item.win} nos dois.` },
      { q: 'Quantas teclas são?', a: `${f.keyCount} juntas. A combinação fica em ${f.item.group} dentro do ${app}.` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `${app} で ${f.item.action} のショートカットは何ですか。`, a: `${d} Windows は ${f.item.win}、Mac は ${f.item.mac} です。` },
      { q: 'Windows と Mac で同じですか。', a: f.differs ? `違います。Windows は ${f.item.win}、Mac は ${f.item.mac} です。` : `同じです。どちらも ${f.item.win} です。` },
      { q: 'キーはいくつ押しますか。', a: `${f.keyCount}つを同時に押します。${app} の ${f.item.group} にある組み合わせです。` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `Wie lautet das Kürzel für ${f.item.action} in ${app}?`, a: `${d} Unter Windows ${f.item.win}, am Mac ${f.item.mac}.` },
      { q: 'Ist es unter Windows und am Mac gleich?', a: f.differs ? `Nein — ${f.item.win} unter Windows, ${f.item.mac} am Mac.` : `Ja, beide ${f.item.win}.` },
      { q: 'Wie viele Tasten sind das?', a: `${f.keyCount} gleichzeitig. Die Kombination gehört in ${app} zu ${f.item.group}.` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `Quel est le raccourci pour ${f.item.action} dans ${app} ?`, a: `${d} C’est ${f.item.win} sous Windows et ${f.item.mac} sur Mac.` },
      { q: 'Est-ce identique sous Windows et sur Mac ?', a: f.differs ? `Non : ${f.item.win} sous Windows, ${f.item.mac} sur Mac.` : `Oui, ${f.item.win} des deux côtés.` },
      { q: 'Combien de touches ?', a: `${f.keyCount} à la fois. La combinaison relève de ${f.item.group} dans ${app}.` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `${app} में ${f.item.action} का शॉर्टकट क्या है?`, a: `${d} Windows पर ${f.item.win} और Mac पर ${f.item.mac}।` },
      { q: 'Windows और Mac पर एक ही है?', a: f.differs ? `नहीं — Windows पर ${f.item.win}, Mac पर ${f.item.mac}।` : `हाँ, दोनों पर ${f.item.win}।` },
      { q: 'कितनी कुंजियाँ दबानी हैं?', a: `${f.keyCount} एक साथ। यह संयोजन ${app} के ${f.item.group} में आता है।` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `${app} 里 ${f.item.action} 的快捷键是什么？`, a: `${d} Windows 是 ${f.item.win}，Mac 是 ${f.item.mac}。` },
      { q: 'Windows 和 Mac 一样吗？', a: f.differs ? `不一样。Windows 是 ${f.item.win}，Mac 是 ${f.item.mac}。` : `一样，都是 ${f.item.win}。` },
      { q: '要按几个键？', a: `${f.keyCount} 个同时按。这个组合属于 ${app} 的 ${f.item.group}。` },
    ],
    (f: ScFacts, d: string, app: string) => [
      { q: `${app} 裡 ${f.item.action} 的快速鍵是什麼？`, a: `${d} Windows 是 ${f.item.win}，Mac 是 ${f.item.mac}。` },
      { q: 'Windows 和 Mac 一樣嗎？', a: f.differs ? `不一樣。Windows 是 ${f.item.win}，Mac 是 ${f.item.mac}。` : `一樣，都是 ${f.item.win}。` },
      { q: '要按幾個鍵？', a: `${f.keyCount} 個同時按。這個組合屬於 ${app} 的 ${f.item.group}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const SC_UI: L<ScUI> = Object.fromEntries(LANG_CODES.map(lang => [lang,
  Object.fromEntries(Object.entries(SPEC).map(([k, byLang]) => [k, (byLang as L<unknown>)[lang as Lang]])),
])) as unknown as L<ScUI>;
