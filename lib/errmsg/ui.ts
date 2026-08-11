/**
 * 오류 화면의 문구 — 열 언어.
 *
 * 오류마다 다른 설명은 desc.ts에, 갈래마다 다른 안내는 notes.ts에 있다. 여기에는
 * 화면 틀만 둔다.
 *
 * 오류 문구와 고치는 명령은 옮기지 않는다. 번역한 오류 문구로는 아무것도 검색할
 * 수 없고, 번역한 플래그는 존재하지 않는 플래그다 — /cmd가 명령 이름을 두는
 * 이유와 같다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ErrCategory } from './types.ts';
import type { ErrFacts } from './facts.ts';
import { ERR_NOTES } from './notes.ts';

export interface FaqItem { q: string; a: string }

export interface ErrUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  hubNotice: string;
  catLabel: Record<ErrCategory, string>;
  catNote: Record<ErrCategory, string>;
  messageTitle: string;
  meaningTitle: string;
  fixTitle: string;
  noFixNote: string;
  toolLabel: string;
  copyLabel: string;
  copiedLabel: string;
  relatedTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (msg: string) => string;
  metaDesc: (msg: string, desc: string) => string;
  hubFaq: FaqItem[];
  itemFaq: (f: ErrFacts, desc: string, cat: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof ErrUI]: L<ErrUI[K]> };

const SLOT = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

/** 그 언어 칸의 갈래별 안내문을 한 벌로 모은다 */
const catNotesAt = (i: number): Record<ErrCategory, string> =>
  Object.fromEntries(Object.entries(ERR_NOTES).map(([c, ten]) => [c, ten[i]])) as Record<ErrCategory, string>;

/** 갈래 이름은 도구 이름이라 열 언어가 대체로 같다 */
const CATS = (js: string, build: string): Record<ErrCategory, string> => ({
  git: 'Git', npm: 'npm', python: 'Python', docker: 'Docker', js, build,
});

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T(
    '오류 문구 사전', 'Error messages', 'Mensajes de error', 'Mensagens de erro',
    'エラーメッセージ', 'Fehlermeldungen', 'Messages d’erreur',
    'एरर संदेश', '报错信息', '報錯訊息',
  ),

  hubTitle: T(
    '오류 문구를 그대로 찾는 사전',
    'Error messages, explained',
    'Mensajes de error, explicados',
    'Mensagens de erro, explicadas',
    'エラーメッセージの読み方事典',
    'Fehlermeldungen erklärt',
    'Les messages d’erreur, expliqués',
    'एरर संदेश, समझाए हुए',
    '报错信息逐条解释',
    '報錯訊息逐條解釋',
  ),

  hubLead: T(
    '{n}개의 오류 문구를 무슨 뜻이고 왜 났고 어떻게 하는지로 풀었습니다.',
    '{n} error messages, each with what it means, why it happened and what to do.',
    '{n} mensajes de error, con qué significan, por qué salieron y qué hacer.',
    '{n} mensagens de erro, com o que significam, por que apareceram e o que fazer.',
    '{n}件のエラーメッセージを、意味・原因・対処の順で解きました。',
    '{n} Fehlermeldungen — jeweils Bedeutung, Ursache und Vorgehen.',
    '{n} messages d’erreur : ce qu’ils veulent dire, pourquoi ils surviennent, quoi faire.',
    '{n} एरर संदेश — मतलब, कारण और क्या करें।',
    '{n} 条报错信息，逐条讲清含义、起因和处理办法。',
    '{n} 條報錯訊息，逐條講清含義、起因和處理辦法。',
  ),

  hubNotice: T(
    '고치는 명령에는 값이 따릅니다. git reset --hard는 커밋하지 않은 일을 버리고, 강제 푸시는 남의 커밋을 지우며, docker system prune은 이름 없는 볼륨을 지웁니다. 그런 자리는 설명에 그 값을 적어 두었습니다.',
    'The fixes have costs. git reset --hard discards uncommitted work, a force push can destroy a colleague’s commits, and docker system prune deletes unnamed volumes. Where that is the case, the entry says so.',
    'Los arreglos tienen coste. git reset --hard descarta trabajo sin confirmar, un force push puede destruir los commits de otra persona y docker system prune borra volúmenes sin nombre. Donde ocurre, la ficha lo dice.',
    'As correções têm custo. git reset --hard descarta trabalho não commitado, um force push pode destruir os commits de outra pessoa e docker system prune apaga volumes sem nome. Onde é o caso, a ficha avisa.',
    '直す命令には代償があります。git reset --hard はコミットしていない作業を捨て、強制プッシュは他人のコミットを消し、docker system prune は名前のないボリュームを削除します。該当する箇所には、その代償を書いてあります。',
    'Die Lösungen haben Kosten. git reset --hard verwirft nicht committete Arbeit, ein Force-Push kann Commits von Kolleginnen zerstören, und docker system prune löscht unbenannte Volumes. Wo das zutrifft, sagt der Eintrag es.',
    'Les correctifs ont un coût. git reset --hard jette le travail non validé, un push forcé peut détruire les commits d’un collègue, et docker system prune supprime les volumes sans nom. Là où c’est le cas, la fiche le dit.',
    'सुधारों की क़ीमत होती है। git reset --hard बिना कमिट किया काम फेंक देता है, force push किसी और के कमिट मिटा सकता है, और docker system prune बेनाम volumes हटा देता है। जहाँ ऐसा है, वहाँ लिखा है।',
    '修法都有代价。git reset --hard 会丢掉没提交的工作，强制推送可能毁掉同事的提交，docker system prune 会删掉未命名的卷。凡是这样的条目，里面都写明了。',
    '修法都有代價。git reset --hard 會丟掉沒提交的工作，強制推送可能毀掉同事的提交，docker system prune 會刪掉未命名的卷。凡是這樣的條目，裡面都寫明了。',
  ),

  catLabel: T(
    CATS('JavaScript', '빌드·타입'),
    CATS('JavaScript', 'Build and types'),
    CATS('JavaScript', 'Compilación y tipos'),
    CATS('JavaScript', 'Build e tipos'),
    CATS('JavaScript', 'ビルドと型'),
    CATS('JavaScript', 'Build und Typen'),
    CATS('JavaScript', 'Build et types'),
    CATS('JavaScript', 'बिल्ड और टाइप'),
    CATS('JavaScript', '构建与类型'),
    CATS('JavaScript', '建置與型別'),
  ),

  catNote: T(...(SLOT.map(i => catNotesAt(i)) as [
    Record<ErrCategory, string>, Record<ErrCategory, string>, Record<ErrCategory, string>,
    Record<ErrCategory, string>, Record<ErrCategory, string>, Record<ErrCategory, string>,
    Record<ErrCategory, string>, Record<ErrCategory, string>, Record<ErrCategory, string>,
    Record<ErrCategory, string>,
  ])),

  messageTitle: T('오류 문구', 'The message', 'El mensaje', 'A mensagem', 'メッセージ', 'Die Meldung', 'Le message', 'संदेश', '报错原文', '報錯原文'),

  meaningTitle: T('무슨 뜻인가', 'What it means', 'Qué significa', 'O que significa', '何を意味するか', 'Was es bedeutet', 'Ce que cela veut dire', 'इसका मतलब', '这是什么意思', '這是什麼意思'),

  fixTitle: T('고치는 명령', 'The fix', 'El arreglo', 'A correção', '直しかた', 'Die Lösung', 'Le correctif', 'सुधार', '怎么修', '怎麼修'),

  noFixNote: T(
    '한 줄 명령으로 끝나지 않습니다. 설명에 무엇을 봐야 하는지 적어 두었습니다.',
    'There is no one-line command for this. The explanation says what to look at instead.',
    'No hay un comando de una línea. La explicación dice qué revisar.',
    'Não há um comando de uma linha. A explicação diz o que verificar.',
    '一行の命令では終わりません。何を見るべきかを説明に書いてあります。',
    'Hier hilft kein Einzeiler. Die Erklärung sagt, worauf zu schauen ist.',
    'Pas de commande en une ligne ici. L’explication dit où regarder.',
    'इसका एक-लाइन कमांड नहीं है। व्याख्या में लिखा है कि क्या देखना है।',
    '这个没有一行命令能解决。说明里写了该看哪里。',
    '這個沒有一行命令能解決。說明裡寫了該看哪裡。',
  ),

  toolLabel: T('내는 도구', 'Printed by', 'Lo imprime', 'Impresso por', '出す道具', 'Ausgegeben von', 'Émis par', 'कौन देता है', '来自', '來自'),

  copyLabel: T('복사', 'Copy', 'Copiar', 'Copiar', 'コピー', 'Kopieren', 'Copier', 'कॉपी', '复制', '複製'),

  copiedLabel: T('복사했습니다', 'Copied', 'Copiado', 'Copiado', 'コピーしました', 'Kopiert', 'Copié', 'कॉपी हो गया', '已复制', '已複製'),

  relatedTitle: T('같이 나는 오류', 'Errors nearby', 'Errores cercanos', 'Erros próximos', '近いエラー', 'Verwandte Fehler', 'Erreurs voisines', 'साथ आने वाले एरर', '相关报错', '相關報錯'),

  howTitle: T('오류 문구를 읽는 법', 'Reading an error message', 'Cómo leer un mensaje de error', 'Como ler uma mensagem de erro', 'エラーメッセージの読み方', 'Eine Fehlermeldung lesen', 'Lire un message d’erreur', 'एरर संदेश कैसे पढ़ें', '怎么读报错', '怎麼讀報錯'),

  how: T(
    [
      '첫 줄부터 읽습니다. 아래로 갈수록 도구 내부 이야기이고, 정작 원인은 맨 위에 적혀 있습니다.',
      '파일 이름과 줄 번호가 있으면 거기가 시작점입니다 — 스택의 가장 위가 아니라, 내가 쓴 파일이 나오는 가장 위 줄입니다.',
      '문구를 그대로 검색합니다. 다만 내 경로와 변수 이름은 지웁니다 — 그 부분이 검색을 방해합니다.',
      '같은 문구가 도구 판마다 다르게 나옵니다. 검색 결과가 안 맞으면 판 번호를 함께 넣어 봅니다.',
      '고치는 명령을 붙여 넣기 전에 그 명령이 무엇을 버리는지 확인합니다. 되돌릴 수 없는 것이 섞여 있습니다.',
    ],
    [
      'Read from the first line down. The lower you go the more it is about the tool’s internals; the cause is usually at the top.',
      'If there is a file and a line number, start there — not the top stack frame, but the topmost line that names a file you wrote.',
      'Search the message verbatim, but strip your own paths and variable names first; those are what stop the search from matching.',
      'The same condition is worded differently across tool versions. If results look wrong, add the version number to the query.',
      'Before pasting a fix, check what it throws away. Some of these cannot be undone.',
    ],
    [
      'Lee desde la primera línea. Cuanto más abajo, más son las tripas de la herramienta; la causa suele estar arriba.',
      'Si hay un archivo y un número de línea, empieza ahí: no el marco superior de la pila, sino la línea más alta que nombre un archivo tuyo.',
      'Busca el mensaje literal, pero quita antes tus rutas y nombres de variables: eso es lo que impide que la búsqueda coincida.',
      'La misma condición se redacta distinto según la versión. Si los resultados no cuadran, añade el número de versión.',
      'Antes de pegar un arreglo, comprueba qué descarta. Algunos no se pueden deshacer.',
    ],
    [
      'Leia da primeira linha para baixo. Quanto mais abaixo, mais são as tripas da ferramenta; a causa costuma estar no topo.',
      'Se há arquivo e número de linha, comece ali — não o quadro superior da pilha, e sim a linha mais alta que nomeie um arquivo seu.',
      'Pesquise a mensagem literal, mas tire primeiro seus caminhos e nomes de variáveis: é isso que impede a busca de casar.',
      'A mesma condição é redigida de formas diferentes conforme a versão. Se os resultados não batem, some o número da versão.',
      'Antes de colar uma correção, veja o que ela descarta. Algumas não dá para desfazer.',
    ],
    [
      '一行目から読みます。下に行くほど道具の内部の話で、原因はたいてい一番上に書かれています。',
      'ファイル名と行番号があればそこが出発点です — スタックの最上段ではなく、自分が書いたファイルが出てくる一番上の行です。',
      '文句はそのまま検索します。ただし自分のパスや変数名は消します — その部分が検索を邪魔します。',
      '同じ事情が道具の版ごとに違う言い方で出ます。結果が合わないときは版番号も入れてみます。',
      '直す命令を貼る前に、その命令が何を捨てるかを確かめます。取り消せないものが混ざっています。',
    ],
    [
      'Von der ersten Zeile abwärts lesen. Weiter unten geht es um das Innere des Werkzeugs; die Ursache steht meist oben.',
      'Gibt es Datei und Zeilennummer, dort anfangen — nicht der oberste Stack-Frame, sondern die oberste Zeile, die eine eigene Datei nennt.',
      'Die Meldung wörtlich suchen, vorher aber eigene Pfade und Variablennamen entfernen; genau die verhindern den Treffer.',
      'Dieselbe Lage wird je Werkzeugversion anders formuliert. Passen die Treffer nicht, die Versionsnummer mit in die Suche.',
      'Vor dem Einfügen einer Lösung prüfen, was sie verwirft. Manches davon lässt sich nicht zurückholen.',
    ],
    [
      'Lisez à partir de la première ligne. Plus on descend, plus il s’agit des entrailles de l’outil ; la cause est généralement en haut.',
      'S’il y a un fichier et un numéro de ligne, commencez là — pas la première image de la pile, mais la ligne la plus haute qui nomme un fichier de vous.',
      'Cherchez le message tel quel, mais retirez d’abord vos chemins et vos noms de variables : c’est cela qui empêche la correspondance.',
      'La même situation se formule autrement selon la version de l’outil. Si les résultats sonnent faux, ajoutez le numéro de version.',
      'Avant de coller un correctif, vérifiez ce qu’il jette. Certains sont irréversibles.',
    ],
    [
      'पहली पंक्ति से पढ़ें। जितना नीचे जाएँगे उतना वह औज़ार के भीतर की बात है; कारण आम तौर पर सबसे ऊपर लिखा होता है।',
      'फ़ाइल का नाम और पंक्ति संख्या दिखे तो वहीं से शुरू करें — stack का सबसे ऊपरी frame नहीं, बल्कि वह सबसे ऊपरी पंक्ति जिसमें आपकी लिखी फ़ाइल का नाम हो।',
      'संदेश को जैसा है वैसा खोजें, पर पहले अपने paths और variable नाम हटा दें — वही खोज को अटकाते हैं।',
      'वही स्थिति औज़ार के हर संस्करण में अलग शब्दों में आती है। नतीजे बेमेल लगें तो संस्करण संख्या भी जोड़ें।',
      'कोई सुधार चिपकाने से पहले देख लें कि वह क्या फेंक देगा। इनमें कुछ पलटे नहीं जा सकते।',
    ],
    [
      '从第一行往下读。越往下越是工具内部的事，起因通常写在最上面。',
      '有文件名和行号就从那里查——不是栈顶那一帧，而是最上面那条提到你自己写的文件的行。',
      '把报错原文照样去搜，但先去掉你自己的路径和变量名，正是那些让搜索匹配不上。',
      '同一种情况在不同版本里措辞不同。结果不对头，就把版本号一起加进查询。',
      '粘贴修法之前，先确认它会丢掉什么。这里面有些是不能撤回的。',
    ],
    [
      '從第一行往下讀。越往下越是工具內部的事，起因通常寫在最上面。',
      '有檔名和行號就從那裡查——不是堆疊最上面那一格，而是最上面那條提到你自己寫的檔案的行。',
      '把報錯原文照樣去搜，但先去掉你自己的路徑和變數名，正是那些讓搜尋比對不上。',
      '同一種情況在不同版本裡措辭不同。結果不對頭，就把版本號一起加進查詢。',
      '貼上修法之前，先確認它會丟掉什麼。這裡面有些是不能收回的。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '오류 문구 사전 {n}개 — git·npm·python·docker',
    '{n} error messages explained — git, npm, Python, Docker',
    '{n} mensajes de error explicados — git, npm, Python, Docker',
    '{n} mensagens de erro explicadas — git, npm, Python, Docker',
    'エラーメッセージ事典 {n}件 — git・npm・Python・Docker',
    '{n} Fehlermeldungen erklärt — git, npm, Python, Docker',
    '{n} messages d’erreur expliqués — git, npm, Python, Docker',
    '{n} एरर संदेश समझाए — git, npm, Python, Docker',
    '{n} 条报错信息解释 — git、npm、Python、Docker',
    '{n} 條報錯訊息解釋 — git、npm、Python、Docker',
  ),

  hubMetaDesc: T(
    'git·npm·Python·Docker·JavaScript·타입 검사가 내는 오류 {n}개. 무슨 뜻이고 왜 났고 어떻게 하는지, 그리고 그 명령이 무엇을 버리는지까지 적었습니다.',
    '{n} errors from git, npm, Python, Docker, JavaScript and the type checker. What each means, why it happened, what to do — and what the fix throws away.',
    '{n} errores de git, npm, Python, Docker, JavaScript y el comprobador de tipos. Qué significan, por qué salieron, qué hacer y qué descarta el arreglo.',
    '{n} erros de git, npm, Python, Docker, JavaScript e do verificador de tipos. O que significam, por que apareceram, o que fazer e o que a correção descarta.',
    'git・npm・Python・Docker・JavaScript・型検査が出すエラー {n}件。意味と原因と対処、そしてその命令が何を捨てるかまで書きました。',
    '{n} Fehler aus git, npm, Python, Docker, JavaScript und dem Typprüfer. Bedeutung, Ursache, Vorgehen — und was die Lösung verwirft.',
    '{n} erreurs de git, npm, Python, Docker, JavaScript et du vérificateur de types. Sens, cause, marche à suivre — et ce que le correctif jette.',
    'git, npm, Python, Docker, JavaScript और type checker के {n} एरर। मतलब, कारण, क्या करें — और सुधार क्या फेंक देगा।',
    '来自 git、npm、Python、Docker、JavaScript 和类型检查的 {n} 条报错。含义、起因、处理办法，以及那条修法会丢掉什么。',
    '來自 git、npm、Python、Docker、JavaScript 和型別檢查的 {n} 條報錯。含義、起因、處理辦法，以及那條修法會丟掉什麼。',
  ),

  metaTitle: T(
    (m: string) => `${m} — 무슨 뜻인가`,
    (m: string) => `${m} — what it means`,
    (m: string) => `${m} — qué significa`,
    (m: string) => `${m} — o que significa`,
    (m: string) => `${m} — 意味と対処`,
    (m: string) => `${m} — was es bedeutet`,
    (m: string) => `${m} — ce que cela veut dire`,
    (m: string) => `${m} — इसका मतलब`,
    (m: string) => `${m} — 是什么意思`,
    (m: string) => `${m} — 是什麼意思`,
  ),

  metaDesc: T(
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
    (m: string, d: string) => `${m} — ${d}`,
  ),

  hubFaq: T(
    [
      { q: '오류 문구를 번역하지 않는 이유가 무엇인가요?', a: '검색할 것이기 때문입니다. 도구는 영어로 출력하고, 번역한 문구로는 아무것도 찾을 수 없습니다. 언어를 따르는 것은 그 뜻과 대처뿐입니다.' },
      { q: '문구가 제 화면과 조금 다릅니다.', a: '도구 판마다 표현이 바뀝니다. 경로와 변수 이름을 지운 뒤 남는 뼈대가 같으면 같은 오류입니다. 판이 다르면 검색에 판 번호를 함께 넣어 봅니다.' },
      { q: '고치는 명령을 그대로 실행해도 되나요?', a: '무엇을 버리는지 먼저 봅니다. git reset --hard와 강제 푸시, docker system prune은 되돌릴 수 없는 것을 지웁니다 — 그런 자리는 설명에 적어 두었습니다.' },
      { q: '여기 없는 오류는 어떻게 찾나요?', a: '문구에서 제 경로·이름·숫자를 지우고 남는 부분만 검색합니다. 그 뼈대가 도구가 정해 둔 문장이고, 그것으로 찾으면 결과가 맞습니다.' },
    ],
    [
      { q: 'Why aren’t the messages translated?', a: 'Because you are going to search them. The tool prints English, and a translated message finds nothing. Only the meaning and the remedy follow the language.' },
      { q: 'The wording on my screen is slightly different.', a: 'Tools reword these between versions. If the skeleton matches once you strip your paths and names, it is the same error. When versions differ, add the version number to the query.' },
      { q: 'Can I just run the fix?', a: 'Check what it discards first. git reset --hard, a force push and docker system prune all remove things you cannot get back — the entries say so where that applies.' },
      { q: 'How do I look up an error that is not here?', a: 'Strip your own paths, names and numbers out of the message and search what is left. That remainder is the sentence the tool authors wrote, and it is what matches.' },
    ],
    [
      { q: '¿Por qué no se traducen los mensajes?', a: 'Porque los vas a buscar. La herramienta imprime en inglés y un mensaje traducido no encuentra nada. Solo el significado y la solución siguen el idioma.' },
      { q: 'En mi pantalla está redactado un poco distinto.', a: 'Las herramientas cambian la redacción entre versiones. Si el esqueleto coincide tras quitar tus rutas y nombres, es el mismo error. Si la versión difiere, añádela a la búsqueda.' },
      { q: '¿Puedo ejecutar el arreglo sin más?', a: 'Comprueba antes qué descarta. git reset --hard, un force push y docker system prune quitan cosas que no vuelven; las fichas lo indican cuando aplica.' },
      { q: '¿Cómo busco un error que no está aquí?', a: 'Quita del mensaje tus rutas, nombres y números y busca lo que queda. Ese resto es la frase que escribieron los autores de la herramienta, y es lo que coincide.' },
    ],
    [
      { q: 'Por que as mensagens não são traduzidas?', a: 'Porque você vai pesquisá-las. A ferramenta imprime em inglês, e uma mensagem traduzida não acha nada. Só o sentido e a solução acompanham o idioma.' },
      { q: 'Na minha tela está escrito um pouco diferente.', a: 'As ferramentas reescrevem isso entre versões. Se o esqueleto casa depois de tirar seus caminhos e nomes, é o mesmo erro. Se a versão difere, some o número à busca.' },
      { q: 'Posso simplesmente rodar a correção?', a: 'Veja antes o que ela descarta. git reset --hard, um force push e docker system prune removem coisas que não voltam — as fichas avisam quando é o caso.' },
      { q: 'Como procuro um erro que não está aqui?', a: 'Tire da mensagem seus caminhos, nomes e números e pesquise o que sobrar. Esse resto é a frase que os autores da ferramenta escreveram, e é o que casa.' },
    ],
    [
      { q: 'エラー文句を訳さないのはなぜですか。', a: '検索するものだからです。道具は英語で出力し、訳した文句では何も見つかりません。言語に合わせるのは意味と対処だけです。' },
      { q: '手元の画面と少し違います。', a: '道具は版ごとに言い方を変えます。自分のパスや名前を消して残る骨格が同じなら同じエラーです。版が違うときは版番号も検索に入れます。' },
      { q: '直す命令をそのまま実行してよいですか。', a: '何を捨てるかを先に見ます。git reset --hard、強制プッシュ、docker system prune は戻せないものを消します — 該当する箇所には書いてあります。' },
      { q: 'ここに無いエラーはどう探しますか。', a: '文句から自分のパス・名前・数字を消し、残った部分だけを検索します。その残りが道具の作者が書いた文で、それで探すと結果が合います。' },
    ],
    [
      { q: 'Warum werden die Meldungen nicht übersetzt?', a: 'Weil man sie sucht. Das Werkzeug gibt Englisch aus, und eine übersetzte Meldung findet nichts. Nur Bedeutung und Abhilfe folgen der Sprache.' },
      { q: 'Auf meinem Bildschirm steht es etwas anders.', a: 'Werkzeuge formulieren das je Version neu. Stimmt das Skelett, nachdem eigene Pfade und Namen entfernt sind, ist es derselbe Fehler. Bei abweichender Version die Versionsnummer mitsuchen.' },
      { q: 'Darf ich die Lösung einfach ausführen?', a: 'Erst prüfen, was sie verwirft. git reset --hard, ein Force-Push und docker system prune entfernen Unwiederbringliches — die Einträge sagen es, wo es zutrifft.' },
      { q: 'Wie finde ich einen Fehler, der hier fehlt?', a: 'Eigene Pfade, Namen und Zahlen aus der Meldung streichen und den Rest suchen. Dieser Rest ist der Satz der Werkzeugautoren, und er ist es, der trifft.' },
    ],
    [
      { q: 'Pourquoi ne pas traduire les messages ?', a: 'Parce qu’on va les chercher. L’outil écrit en anglais, et un message traduit ne trouve rien. Seuls le sens et le remède suivent la langue.' },
      { q: 'Sur mon écran, la formulation diffère un peu.', a: 'Les outils reformulent d’une version à l’autre. Si le squelette correspond après avoir retiré vos chemins et vos noms, c’est la même erreur. Si la version diffère, ajoutez-la à la requête.' },
      { q: 'Puis-je exécuter le correctif tel quel ?', a: 'Vérifiez d’abord ce qu’il jette. git reset --hard, un push forcé et docker system prune retirent des choses irrécupérables ; les fiches le disent quand c’est le cas.' },
      { q: 'Comment chercher une erreur absente d’ici ?', a: 'Retirez du message vos chemins, noms et nombres, et cherchez le reste. Ce reste est la phrase écrite par les auteurs de l’outil : c’est elle qui correspond.' },
    ],
    [
      { q: 'एरर संदेशों का अनुवाद क्यों नहीं होता?', a: 'क्योंकि आप उन्हें खोजेंगे। औज़ार अंग्रेज़ी में छापता है, और अनुवाद किए संदेश से कुछ नहीं मिलता। भाषा सिर्फ़ अर्थ और उपाय की बदलती है।' },
      { q: 'मेरी स्क्रीन पर शब्द ज़रा अलग हैं।', a: 'औज़ार हर संस्करण में शब्द बदल देते हैं। अपने paths और नाम हटाने के बाद ढाँचा वही हो तो वही एरर है। संस्करण अलग हो तो खोज में उसका नंबर भी जोड़ें।' },
      { q: 'सुधार को वैसे ही चला सकते हैं?', a: 'पहले देखें कि वह क्या फेंकता है। git reset --hard, force push और docker system prune ऐसी चीज़ें हटाते हैं जो वापस नहीं आतीं — जहाँ ऐसा है वहाँ लिखा है।' },
      { q: 'जो एरर यहाँ नहीं है उसे कैसे खोजें?', a: 'संदेश से अपने paths, नाम और अंक हटाकर बाक़ी खोजें। वह बाक़ी हिस्सा औज़ार के लेखकों का लिखा वाक्य है, और वही मेल खाता है।' },
    ],
    [
      { q: '为什么报错原文不翻译？', a: '因为你要拿它去搜。工具输出的是英文，翻译过的原文什么也搜不到。跟着语言变的只有含义和处理办法。' },
      { q: '我屏幕上的措辞略有不同。', a: '工具在不同版本里会改措辞。去掉你自己的路径和名字后骨架一致，就是同一个报错。版本不同就把版本号一起加进搜索。' },
      { q: '修法可以直接跑吗？', a: '先看它会丢什么。git reset --hard、强制推送和 docker system prune 删的东西回不来——凡是这类，条目里都写了。' },
      { q: '这里没有的报错怎么查？', a: '把报错里你自己的路径、名字和数字去掉，只搜剩下的部分。那部分是工具作者写的句子，用它搜才对得上。' },
    ],
    [
      { q: '為什麼報錯原文不翻譯？', a: '因為你要拿它去搜。工具輸出的是英文，翻譯過的原文什麼也搜不到。跟著語言變的只有含義和處理辦法。' },
      { q: '我螢幕上的措辭略有不同。', a: '工具在不同版本裡會改措辭。去掉你自己的路徑和名字後骨架一致，就是同一個報錯。版本不同就把版本號一起加進搜尋。' },
      { q: '修法可以直接跑嗎？', a: '先看它會丟什麼。git reset --hard、強制推送和 docker system prune 刪的東西回不來——凡是這類，條目裡都寫了。' },
      { q: '這裡沒有的報錯怎麼查？', a: '把報錯裡你自己的路徑、名字和數字去掉，只搜剩下的部分。那部分是工具作者寫的句子，用它搜才對得上。' },
    ],
  ),

  itemFaq: T(
    (f: ErrFacts, d: string, cat: string) => [
      { q: `${f.item.message} 는 무슨 뜻인가요?`, a: d },
      { q: '어떻게 고치나요?', a: f.fixable ? `${f.item.fix} — 실행 전에 위의 설명에서 이 명령이 무엇을 버리는지 확인하세요.` : '한 줄 명령으로 끝나지 않습니다. 위 설명에서 무엇을 봐야 하는지 적어 두었습니다.' },
      { q: '어느 도구가 내는 오류인가요?', a: `${f.item.tool}입니다. ${cat} 갈래에 있고, 문구는 ${f.words}낱말입니다.` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `What does “${f.item.message}” mean?`, a: d },
      { q: 'How do I fix it?', a: f.fixable ? `${f.item.fix} — before running it, check the explanation above for what this command discards.` : 'There is no one-line command. The explanation above says what to look at instead.' },
      { q: 'Which tool prints this?', a: `${f.item.tool}. It sits under ${cat}, and the message runs to ${f.words} words.` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `¿Qué significa «${f.item.message}»?`, a: d },
      { q: '¿Cómo se arregla?', a: f.fixable ? `${f.item.fix} — antes de ejecutarlo, mira arriba qué descarta este comando.` : 'No hay comando de una línea. La explicación de arriba dice qué revisar.' },
      { q: '¿Qué herramienta lo imprime?', a: `${f.item.tool}. Está en ${cat} y el mensaje tiene ${f.words} palabras.` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `O que significa “${f.item.message}”?`, a: d },
      { q: 'Como corrigir?', a: f.fixable ? `${f.item.fix} — antes de rodar, veja acima o que este comando descarta.` : 'Não há comando de uma linha. A explicação acima diz o que verificar.' },
      { q: 'Qual ferramenta imprime isso?', a: `${f.item.tool}. Fica em ${cat} e a mensagem tem ${f.words} palavras.` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `${f.item.message} はどういう意味ですか。`, a: d },
      { q: 'どう直しますか。', a: f.fixable ? `${f.item.fix} — 実行する前に、この命令が何を捨てるかを上の説明で確かめてください。` : '一行の命令では終わりません。何を見るべきかを上の説明に書いてあります。' },
      { q: 'どの道具が出すエラーですか。', a: `${f.item.tool} です。${cat}の仲間で、文句は${f.words}語です。` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `Was bedeutet „${f.item.message}“?`, a: d },
      { q: 'Wie behebe ich das?', a: f.fixable ? `${f.item.fix} — vor dem Ausführen oben prüfen, was dieser Befehl verwirft.` : 'Es gibt keinen Einzeiler. Die Erklärung oben sagt, worauf zu schauen ist.' },
      { q: 'Welches Werkzeug gibt das aus?', a: `${f.item.tool}. Es gehört zu ${cat}, und die Meldung hat ${f.words} Wörter.` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `Que veut dire « ${f.item.message} » ?`, a: d },
      { q: 'Comment le corriger ?', a: f.fixable ? `${f.item.fix} — avant de le lancer, vérifiez plus haut ce que cette commande jette.` : 'Pas de commande en une ligne. L’explication ci-dessus dit où regarder.' },
      { q: 'Quel outil émet cela ?', a: `${f.item.tool}. Cela relève de ${cat}, et le message compte ${f.words} mots.` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `“${f.item.message}” का क्या मतलब है?`, a: d },
      { q: 'इसे कैसे ठीक करें?', a: f.fixable ? `${f.item.fix} — चलाने से पहले ऊपर देख लें कि यह कमांड क्या फेंक देता है।` : 'एक-लाइन कमांड नहीं है। ऊपर की व्याख्या में लिखा है कि क्या देखना है।' },
      { q: 'यह कौन-सा औज़ार देता है?', a: `${f.item.tool}। यह ${cat} में आता है, और संदेश ${f.words} शब्दों का है।` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `“${f.item.message}” 是什么意思？`, a: d },
      { q: '怎么修？', a: f.fixable ? `${f.item.fix} —— 执行前先看上面的说明，确认这条命令会丢掉什么。` : '没有一行命令能解决。上面的说明写了该看哪里。' },
      { q: '这是哪个工具报的？', a: `${f.item.tool}。它属于${cat}，报错原文有 ${f.words} 个词。` },
    ],
    (f: ErrFacts, d: string, cat: string) => [
      { q: `“${f.item.message}” 是什麼意思？`, a: d },
      { q: '怎麼修？', a: f.fixable ? `${f.item.fix} —— 執行前先看上面的說明，確認這條命令會丟掉什麼。` : '沒有一行命令能解決。上面的說明寫了該看哪裡。' },
      { q: '這是哪個工具報的？', a: `${f.item.tool}。它屬於${cat}，報錯原文有 ${f.words} 個詞。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const ERR_UI: L<ErrUI> = Object.fromEntries(LANG_CODES.map(lang => [lang,
  Object.fromEntries(Object.entries(SPEC).map(([k, byLang]) => [k, (byLang as L<unknown>)[lang as Lang]])),
])) as unknown as L<ErrUI>;
