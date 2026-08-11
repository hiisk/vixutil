/**
 * 일러스트레이터·프리미어 안내문 — 앱마다 한 문장, 열 언어.
 *
 * 앱을 열었을 때 가장 먼저 알면 나머지가 쉬워지는 것 하나만 적는다. 일러스트레이터는
 * 도구가 글자 하나씩이라는 것이고, 프리미어는 초점(focus)이 어느 칸에 있느냐다 —
 * 프리미어에서 "눌러도 아무 일이 없다"는 말의 거의 전부가 초점이다.
 *
 * 열 칸은 ko·en·es·pt·ja·de·fr·hi·zh·tw 순서다.
 */
import type { Ten } from './types.ts';

export const SC_NOTES_ADOBE: Record<string, Ten> = {
  illustrator: [
    "일러스트레이터는 도구마다 글자 하나가 걸려 있어 그 글자들만 익혀도 가장 많이 남습니다 — 다만 글자를 고치는 중에는 그대로 입력되니 Esc로 먼저 빠져나옵니다.",
    "Illustrator gives each tool a single letter, and learning those letters is the biggest win — but while you are editing type they simply get typed, so press Esc first.",
    "Illustrator asigna una sola letra a cada herramienta, y aprender esas letras es lo que más ahorra tiempo; pero mientras editas texto se escriben tal cual, así que pulsa Esc antes.",
    "O Illustrator dá uma única letra a cada ferramenta, e decorar essas letras é o que rende mais; só que, ao editar texto, elas são digitadas, então aperte Esc antes.",
    "Illustrator は道具ごとに一文字が割り当てられていて、その文字を覚えるのが一番得です — ただし文字を編集している間はそのまま入力されるので、先に Esc を押します。",
    "Illustrator gibt jedem Werkzeug einen einzelnen Buchstaben, und diese Buchstaben zu lernen bringt am meisten — beim Bearbeiten von Text werden sie aber einfach geschrieben, also vorher Esc drücken.",
    "Illustrator attribue une seule lettre à chaque outil, et retenir ces lettres est ce qui fait gagner le plus de temps ; en revanche, pendant la saisie de texte elles s’écrivent, donc appuyez d’abord sur Esc.",
    "Illustrator में हर tool को एक ही अक्षर मिलता है, और सबसे ज़्यादा फ़ायदा उन्हीं अक्षरों से होता है — पर text लिखते समय वे सीधे टाइप हो जाते हैं, इसलिए पहले Esc दबाइए।",
    "Illustrator 的每个工具都只对应一个字母，把这些字母记熟最省事；不过在编辑文字时它们会直接打进文本里，所以要先按 Esc。",
    "Illustrator 每個工具都只對應一個字母，把這些字母記熟最划算；但在編輯文字時它們會直接打進文字裡，所以要先按 Esc。",
  ],
  premiere: [
    "프리미어에서는 같은 키가 초점을 가진 칸에 따라 다른 일을 합니다 — 눌러도 아무 일이 없으면 타임라인이 아니라 Program Monitor나 Project 칸에 초점이 있는 경우가 대부분입니다.",
    "In Premiere Pro the same key does different things depending on which panel holds focus — when a shortcut seems to do nothing, focus is usually on the Program Monitor or the Project panel rather than the timeline.",
    "En Premiere Pro la misma tecla hace cosas distintas según el panel que tenga el foco: si un atajo parece no hacer nada, el foco casi siempre está en el Program Monitor o en el panel Project, no en la línea de tiempo.",
    "No Premiere Pro a mesma tecla faz coisas diferentes conforme o painel que está com o foco: quando um atalho parece não fazer nada, o foco quase sempre está no Program Monitor ou no painel Project, não na linha de tempo.",
    "Premiere Pro では同じキーが、どのパネルに焦点があるかで違う働きをします — 押しても何も起きないときは、タイムラインではなく Program Monitor か Project パネルに焦点があることがほとんどです。",
    "In Premiere Pro tut dieselbe Taste je nach fokussiertem Bedienfeld etwas anderes — wenn ein Kürzel scheinbar nichts macht, liegt der Fokus meist auf dem Program Monitor oder dem Project-Bedienfeld statt auf der Timeline.",
    "Dans Premiere Pro, la même touche agit différemment selon le panneau qui a le focus : quand un raccourci ne fait rien, le focus est presque toujours sur le Program Monitor ou le panneau Project, pas sur la timeline.",
    "Premiere Pro में एक ही कुंजी का काम इस पर बदलता है कि focus किस panel पर है — शॉर्टकट से कुछ न हो, तो अक्सर focus timeline पर नहीं, Program Monitor या Project panel पर होता है।",
    "在 Premiere Pro 里，同一个键会因为焦点落在哪个面板而做不同的事——按了没反应，通常是焦点在 Program Monitor 或 Project 面板上，而不在时间轴上。",
    "在 Premiere Pro 裡，同一個鍵的作用會隨著焦點落在哪個面板而變——按了沒反應，多半是焦點在 Program Monitor 或 Project 面板，而不是時間軸。",
  ],
};
