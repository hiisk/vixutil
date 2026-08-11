/**
 * Word·PowerPoint 앱 안내문 한 문장 — 열 언어.
 *
 * 낱장마다 있는 설명과 달리, 여기 한 줄은 그 앱의 단축키 전체를 두고 "먼저 알아야
 * 할 하나"를 말한다. notes-core.ts가 앞선 열 앱에 그렇게 두었고, 새 앱은 파일을
 * 하나 만들어 notes.ts에 한 줄을 더한다.
 *
 * 열 칸은 ko·en·es·pt·ja·de·fr·hi·zh·tw 순서다.
 */
import type { Ten } from './types.ts';

export const SC_NOTES_OFFICE2: Record<string, Ten> = {
  word: [
    "Word for Windows는 Alt를 누르면 리본의 단추마다 글자가 떠서, 조합이 없는 기능도 차례로 눌러 부를 수 있습니다 — 맥 Office에는 그 글자 힌트가 없습니다.",
    "Press Alt in Word for Windows and every ribbon button shows a letter, so even a command with no combination is reachable as a sequence — Office for Mac has no such key tips.",
    "En Word for Windows, al pulsar Alt cada botón de la cinta muestra una letra, así que hasta un comando sin combinación se alcanza en secuencia; Office for Mac no tiene esas sugerencias.",
    "No Word for Windows, ao pressionar Alt cada botão da faixa mostra uma letra, então até um comando sem combinação é alcançado em sequência; o Office for Mac não tem essas dicas.",
    "Word for Windows は Alt を押すとリボンのボタンごとに文字が出るので、組み合わせの無い機能も順に押して呼べます — Mac の Office にはこのヒントがありません。",
    "In Word for Windows zeigt jede Menübandschaltfläche nach einem Druck auf Alt einen Buchstaben, sodass selbst ein Befehl ohne Kürzel als Folge erreichbar ist — Office for Mac kennt diese Hinweise nicht.",
    "Dans Word for Windows, une pression sur Alt affiche une lettre sur chaque bouton du ruban : même une commande sans raccourci s’atteint en séquence, ce qu’Office for Mac ne permet pas.",
    "Word for Windows में Alt दबाते ही ribbon के हर बटन पर एक अक्षर दिखता है, इसलिए जिस काम का कोई संयोजन नहीं है वह भी क्रम से दबाकर हो जाता है — Office for Mac में ऐसे संकेत नहीं हैं।",
    "在 Word for Windows 里按下 Alt，功能区每个按钮都会显出一个字母，所以连没有组合键的功能也能依次按出来——Mac 版 Office 没有这种提示。",
    "在 Word for Windows 裡按下 Alt，功能區每個按鈕都會顯出一個字母，所以連沒有組合鍵的功能也能依序按出來——Mac 版 Office 沒有這種提示。",
  ],
  powerpoint: [
    "PowerPoint 단축키의 절반은 발표가 돌고 있을 때만 듣습니다 — B로 화면을 가리고 Ctrl+L로 레이저를 켜는 것이 그렇고, 편집 화면에서 같은 키는 전혀 다른 일을 합니다.",
    "Half of PowerPoint's shortcuts only listen while the show is running — blanking the screen with B, the laser on Ctrl+L — and in edit view those same keys do something else entirely.",
    "La mitad de los atajos de PowerPoint solo responden con la presentación en marcha —oscurecer con B, el láser en Ctrl+L— y en la vista de edición esas mismas teclas hacen algo muy distinto.",
    "Metade dos atalhos do PowerPoint só responde com a apresentação rodando — escurecer com B, o laser em Ctrl+L — e na visão de edição essas mesmas teclas fazem algo bem diferente.",
    "PowerPoint のショートカットの半分は発表中だけ効きます — B で画面を隠し、Ctrl+L でレーザーを出すのがそれで、編集画面では同じキーが全く別の働きをします。",
    "Die Hälfte der PowerPoint-Kürzel hört nur während der laufenden Vorführung zu — Bildschirm schwärzen mit B, Laser auf Ctrl+L — in der Bearbeitungsansicht tun dieselben Tasten etwas völlig anderes.",
    "La moitié des raccourcis de PowerPoint n’écoutent que pendant le diaporama — écran noir avec B, laser sur Ctrl+L — et en mode édition ces mêmes touches font tout autre chose.",
    "PowerPoint के आधे शॉर्टकट केवल प्रस्तुति चलते समय सुनते हैं — B से परदा काला करना, Ctrl+L से laser — और संपादन दृश्य में वही कुंजियाँ कुछ और ही करती हैं।",
    "PowerPoint 的快捷键有一半只在放映时才管用——用 B 把屏幕变黑、用 Ctrl+L 打开激光笔——在编辑视图里同样的键做的完全是另一件事。",
    "PowerPoint 的快速鍵有一半只在放映時才管用——用 B 把螢幕變黑、用 Ctrl+L 開啟雷射筆——在編輯檢視裡同樣的鍵做的完全是另一件事。",
  ],
};
