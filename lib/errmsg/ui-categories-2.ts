/**
 * python·docker·js·build 갈래마다 "그 도구의 오류는 무엇이 닮았고 어떻게 읽는가"
 * 한 문장 — 열 언어.
 *
 * ui-categories.ts와 같은 자리를 채운다. 거기에 git·npm이 있고 여기에 나머지
 * 넷이 있다. 갈래가 늘면 이 파일에 한 줄을 더하거나 파일을 새로 만들고
 * notes.ts에서 합친다 — 화면 틀을 두는 ui.ts는 건드리지 않는다.
 *
 * 오류 문구와 도구 이름, 옵션은 어느 언어 안에서도 라틴 글자 그대로 둔다.
 * 열 칸은 ko·en·es·pt·ja·de·fr·hi·zh·tw 순서다.
 */
import type { Ten } from './types.ts';

export const ERR_CAT_NOTES_2: Record<string, Ten> = {
  python: [
    "파이썬의 오류는 Traceback의 마지막 한 줄에 무엇이 틀렸는지, 그 위의 프레임들에 어디서 틀렸는지가 나뉘어 적혀 있어서 마지막 줄만 읽으면 이름은 알고 자리는 놓치게 되고, 특히 NoneType과 KeyError처럼 값이 없어서 나는 오류는 터진 자리보다 그 값을 만들어 준 위쪽 프레임에 원인이 있습니다.",
    "A Python traceback splits the answer in two — the last line says what went wrong, the frames above it say where — so reading only the last line gives you the name and loses the place, and for the value-is-missing errors such as NoneType and KeyError the cause almost always sits in a frame above the one that crashed.",
    "Un traceback de Python divide la respuesta en dos: la última línea dice qué falló y los marcos de arriba dicen dónde, así que leer solo la última línea te da el nombre y te quita el lugar; y en los errores por valor ausente, como NoneType y KeyError, la causa casi siempre está en un marco superior al que se rompió.",
    "Um traceback do Python divide a resposta em duas partes — a última linha diz o que deu errado e os quadros acima dizem onde — então ler só a última linha dá o nome e perde o lugar; e nos erros de valor ausente, como NoneType e KeyError, a causa quase sempre está num quadro acima daquele que quebrou.",
    "Python のトレースバックは答えを二つに分けて置きます — 最後の一行が何が誤りかを、その上のフレームがどこで誤ったかを示すので、最後の行だけ読むと名前は分かって場所を落とします。とくに NoneType や KeyError のように値が無くて出る誤りは、落ちた場所より、その値を作った上のフレームに原因があります。",
    "Ein Python-Traceback teilt die Antwort in zwei Hälften — die letzte Zeile sagt, was schiefging, die Rahmen darüber sagen, wo — wer also nur die letzte Zeile liest, kennt den Namen und verliert den Ort; und bei den „Wert fehlt“-Fehlern wie NoneType und KeyError liegt die Ursache fast immer in einem Rahmen über dem abgestürzten.",
    "Une trace Python coupe la réponse en deux : la dernière ligne dit ce qui a échoué, les cadres au-dessus disent où — ne lire que la dernière ligne donne le nom et fait perdre l'endroit ; et pour les erreurs de valeur absente comme NoneType et KeyError, la cause siège presque toujours dans un cadre au-dessus de celui qui a planté.",
    "Python का traceback उत्तर को दो हिस्सों में बाँटता है — अंतिम पंक्ति बताती है कि क्या ग़लत हुआ, और उसके ऊपर के frames बताते हैं कि कहाँ — इसलिए केवल अंतिम पंक्ति पढ़ने पर नाम मिलता है और जगह छूट जाती है; और NoneType तथा KeyError जैसी \"मान नहीं है\" वाली त्रुटियों में कारण लगभग हमेशा उस frame से ऊपर होता है जहाँ गिरा।",
    "Python 的 traceback 把答案劈成两半——最后一行说「错了什么」，上面的帧说「错在哪里」——所以只读最后一行，你会拿到名字却丢掉位置；而 NoneType、KeyError 这类「值不存在」的错误，原因几乎总在崩溃那一帧的上面。",
    "Python 的 traceback 把答案劈成兩半——最後一行說「錯了什麼」，上面的框說「錯在哪裡」——所以只讀最後一行，你會拿到名字卻丟掉位置；而 NoneType、KeyError 這類「值不存在」的錯誤，原因幾乎總在崩潰那一框的上面。",
  ],
  docker: [
    "docker의 오류는 어느 층에서 났는지를 먼저 갈라야 읽히는데 — 클라이언트가 데몬에 닿지 못한 것, 레지스트리가 거절한 것, 빌드 중에 RUN이 실패한 것, 컨테이너가 뜨자마자 죽은 것이 서로 다른 문제입니다 — 특히 빌드와 실행 단계의 오류는 문구 자체가 이유가 아니라 그 안에서 돌던 명령이 남긴 출력에 이유가 있고, 고치는 명령의 값도 층마다 다릅니다.",
    "Docker errors only become readable once you place them in a layer — the client failing to reach the daemon, the registry refusing you, a RUN failing during the build, and a container dying the instant it starts are four different problems — and for the build and run layers the line itself is not the reason: the reason is in the output of the command that was running inside, while the cost of each fix differs by layer too.",
    "Los errores de Docker solo se vuelven legibles cuando los sitúas en una capa —el cliente que no alcanza al demonio, el registro que te rechaza, un RUN que falla durante la compilación y un contenedor que muere al arrancar son cuatro problemas distintos— y en las capas de compilación y ejecución la línea en sí no es el motivo: el motivo está en la salida del comando que corría dentro, y el precio de cada arreglo también cambia según la capa.",
    "Os erros do Docker só ficam legíveis quando você os coloca numa camada — o cliente que não alcança o daemon, o registro que te recusa, um RUN que falha durante o build e um contêiner que morre ao subir são quatro problemas diferentes — e nas camadas de build e execução a linha em si não é o motivo: o motivo está na saída do comando que rodava dentro, e o preço de cada correção também muda por camada.",
    "docker の誤りは、まずどの層で起きたかを分けないと読めません — クライアントがデーモンに届かない、レジストリが拒む、ビルド中に RUN が失敗する、コンテナが起動した途端に死ぬ、はそれぞれ別の問題です。とくにビルドと実行の層では文言そのものが理由ではなく、中で動いていた命令が残した出力に理由があり、直す命令の代償も層ごとに違います。",
    "Docker-Fehler werden erst lesbar, wenn man sie einer Schicht zuordnet — der Client erreicht den Daemon nicht, die Registry verweigert, ein RUN scheitert im Build, ein Container stirbt sofort beim Start: das sind vier verschiedene Probleme — und in der Build- und Laufzeitschicht ist die Zeile selbst nicht der Grund: der Grund steht in der Ausgabe des Befehls, der darin lief, und auch der Preis jeder Behebung unterscheidet sich je Schicht.",
    "Les erreurs de Docker ne deviennent lisibles qu'une fois rangées par couche — le client qui n'atteint pas le démon, le registre qui refuse, un RUN qui échoue au build, un conteneur qui meurt dès son démarrage sont quatre problèmes distincts — et pour les couches build et exécution, la ligne n'est pas la raison : la raison est dans la sortie de la commande qui tournait à l'intérieur, tandis que le coût de chaque correctif varie aussi selon la couche.",
    "docker की त्रुटियाँ तभी पढ़ी जाती हैं जब आप उन्हें परत के हिसाब से बाँट लें — client का daemon तक न पहुँचना, registry का मना करना, build के दौरान किसी RUN का विफल होना, और container का चालू होते ही मर जाना — ये चार अलग समस्याएँ हैं; और build तथा चलने की परतों में पंक्ति स्वयं कारण नहीं होती: कारण उस आदेश के output में होता है जो भीतर चल रहा था, और हर उपाय की क़ीमत भी परत के अनुसार बदलती है।",
    "docker 的错误要先归到某一层才读得懂——客户端连不上守护进程、镜像仓库拒绝你、构建过程中某条 RUN 失败、容器一起来就死掉，是四种不同的问题——而在构建和运行这两层，那行字本身并不是原因：原因在里面那条命令留下的输出里，各层修复的代价也不一样。",
    "docker 的錯誤要先歸到某一層才讀得懂——用戶端連不上守護行程、映像檔倉庫拒絕你、建置過程中某條 RUN 失敗、容器一起來就死掉，是四種不同的問題——而在建置和執行這兩層，那行字本身並不是原因：原因在裡面那條命令留下的輸出裡，各層修復的代價也不一樣。",
  ],
  js: [
    "브라우저와 node의 오류는 대개 무엇이 잘못되었는지만 알려 주고 왜 그 값이 그렇게 되었는지는 알려 주지 않아서 — undefined를 읽었다, 함수가 아니었다, JSON이 아니었다 — 고칠 자리는 터진 줄이 아니라 그 값을 만든 위쪽에 있고, ?.와 기본값으로 그 줄만 조용하게 만들면 같은 문제가 더 먼 곳에서 더 알아보기 어려운 꼴로 다시 나타납니다.",
    "Browser and Node errors usually tell you what broke and not why the value became what it was — you read undefined, it was not a function, it was not JSON — so the place to fix is upstream of the line that threw, and silencing just that line with ?. and default values makes the same problem reappear further away in a form that is harder to recognise.",
    "Los errores del navegador y de Node suelen decirte qué se rompió y no por qué el valor llegó a ser así —leíste undefined, no era una función, no era JSON—, así que el lugar del arreglo está aguas arriba de la línea que lanzó el error, y silenciar solo esa línea con ?. y valores por defecto hace que el mismo problema reaparezca más lejos y con una forma más difícil de reconocer.",
    "Erros de navegador e de Node costumam dizer o que quebrou e não por que o valor ficou assim — você leu undefined, não era uma função, não era JSON — então o lugar de corrigir está acima da linha que estourou, e calar só aquela linha com ?. e valores padrão faz o mesmo problema reaparecer mais longe, numa forma mais difícil de reconhecer.",
    "ブラウザと node の誤りは、たいてい何が壊れたかだけを告げ、なぜその値がそうなったかは告げません — undefined を読んだ、関数ではなかった、JSON ではなかった。ですから直す場所は投げた行ではなくその値を作った上流であり、?. や既定値でその行だけ黙らせると、同じ問題がもっと遠くで、もっと分かりにくい形で戻ってきます。",
    "Browser- und Node-Fehler nennen meist, was kaputtging, aber nicht, warum der Wert so wurde — Sie haben undefined gelesen, es war keine Funktion, es war kein JSON — die Stelle zum Reparieren liegt also stromaufwärts der werfenden Zeile, und nur diese Zeile mit ?. und Standardwerten stillzulegen lässt dasselbe Problem weiter entfernt und in schwerer erkennbarer Gestalt wiederkehren.",
    "Les erreurs du navigateur et de Node disent d'ordinaire ce qui a cassé et non pourquoi la valeur est devenue telle — vous avez lu undefined, ce n'était pas une fonction, ce n'était pas du JSON — l'endroit à corriger se trouve donc en amont de la ligne qui a levé l'erreur, et faire taire cette seule ligne avec ?. et des valeurs par défaut fait revenir le même problème plus loin, sous une forme plus difficile à reconnaître.",
    "browser और node की त्रुटियाँ आमतौर पर यही बताती हैं कि क्या टूटा, यह नहीं कि वह मान ऐसा क्यों बना — आपने undefined पढ़ा, वह function नहीं था, वह JSON नहीं था — इसलिए सुधार की जगह उस पंक्ति से ऊपर है जिसने त्रुटि फेंकी, और ?. तथा डिफ़ॉल्ट मानों से केवल उस पंक्ति को चुप कराने पर वही समस्या और दूर जाकर, और कठिन रूप में लौट आती है।",
    "浏览器和 node 的错误通常只告诉你什么坏了，不告诉你那个值为什么变成这样——你读了 undefined、它不是函数、它不是 JSON——所以该修的地方在抛错那一行的上游；只用 ?. 和默认值把那一行按住，同样的问题会在更远的地方、以更难辨认的样子回来。",
    "瀏覽器和 node 的錯誤通常只告訴你什麼壞了，不告訴你那個值為什麼變成這樣——你讀了 undefined、它不是函式、它不是 JSON——所以該修的地方在拋錯那一行的上游；只用 ?. 和預設值把那一行按住，同樣的問題會在更遠的地方、以更難辨認的樣子回來。",
  ],
  build: [
    "빌드가 내는 오류는 실행 전에 도구가 거절한 것이라 그 자리에서 프로그램을 망가뜨리지는 않지만 대신 두 가지를 물어봅니다 — 타입이나 경로를 실제 모양에 맞게 고칠 것인가, 아니면 as any나 인용 부호 하나로 그 줄만 통과시킬 것인가 — 그리고 대소문자와 확장자, 환경 변수처럼 내 컴퓨터에서만 맞는 것들은 여기서 처음 드러납니다.",
    "Build errors are a tool refusing before anything runs, so they break nothing at the moment they appear — but they do ask two questions: will you fix the type or the path to match the real shape, or will you push that one line through with an as any or a suppression comment — and it is here that the things which are only true on your own machine, letter case, extensions and environment variables, show themselves for the first time.",
    "Los errores de compilación son una herramienta que se niega antes de que nada se ejecute, así que no rompen nada en el momento en que aparecen, pero plantean dos preguntas: ¿arreglarás el tipo o la ruta para que coincidan con la forma real, o empujarás esa única línea con un as any o un comentario de supresión? Y es aquí donde las cosas que solo son ciertas en tu máquina —mayúsculas, extensiones y variables de entorno— se muestran por primera vez.",
    "Erros de build são uma ferramenta recusando antes de qualquer execução, então não quebram nada no momento em que aparecem — mas fazem duas perguntas: você vai corrigir o tipo ou o caminho para bater com a forma real, ou vai empurrar aquela linha com um as any ou um comentário de supressão? E é aqui que as coisas verdadeiras só na sua máquina — caixa das letras, extensões e variáveis de ambiente — aparecem pela primeira vez.",
    "ビルドの誤りは実行前に道具が拒んだものなので、その場で何かを壊すわけではありません。代わりに二つを問います — 型や経路を実際の形に合わせて直すのか、それとも as any や抑制のコメント一つでその行だけ通すのか。そして大文字小文字や拡張子、環境変数のように自分の環境でだけ正しいものは、ここで初めて姿を見せます。",
    "Build-Fehler sind ein Werkzeug, das verweigert, bevor irgendetwas läuft — sie zerbrechen im Moment ihres Auftretens nichts, stellen aber zwei Fragen: reparieren Sie Typ oder Pfad passend zur echten Form, oder schieben Sie diese eine Zeile mit einem as any oder einem Unterdrückungskommentar durch? Und genau hier zeigen sich erstmals die Dinge, die nur auf dem eigenen Rechner stimmen: Groß-/Kleinschreibung, Endungen und Umgebungsvariablen.",
    "Les erreurs de build sont un outil qui refuse avant toute exécution : elles ne cassent rien à l'instant où elles surgissent, mais elles posent deux questions — corrigerez-vous le type ou le chemin pour coller à la forme réelle, ou ferez-vous passer cette seule ligne avec un as any ou un commentaire de suppression ? Et c'est ici que se révèlent pour la première fois les choses qui ne sont vraies que sur votre machine : la casse, les extensions et les variables d'environnement.",
    "build की त्रुटियाँ किसी औज़ार का चलने से पहले मना कर देना हैं, इसलिए प्रकट होते समय वे कुछ तोड़ती नहीं — पर वे दो सवाल पूछती हैं: क्या आप type या रास्ता असली रूप के अनुसार सुधारेंगे, या as any अथवा दमन-टिप्पणी से उस एक पंक्ति को पार करा देंगे — और यहीं पहली बार वे चीज़ें सामने आती हैं जो केवल आपकी मशीन पर सही हैं: अक्षरों के बड़े-छोटे रूप, extension, और environment variables।",
    "构建阶段的错误是工具在运行之前就先拒绝了，所以它们出现的那一刻并不弄坏什么——但它们问你两个问题：你要把类型或路径改成和真实结构一致，还是用一个 as any、一条抑制注释让那一行过去？也正是在这里，那些只在你自己机器上成立的事情——大小写、扩展名、环境变量——第一次显形。",
    "建置階段的錯誤是工具在執行之前就先拒絕了，所以它們出現的那一刻並不弄壞什麼——但它們問你兩個問題：你要把型別或路徑改成和真實結構一致，還是用一個 as any、一條抑制註解讓那一行過去？也正是在這裡，那些只在你自己機器上成立的事情——大小寫、副檔名、環境變數——第一次顯形。",
  ],
};
