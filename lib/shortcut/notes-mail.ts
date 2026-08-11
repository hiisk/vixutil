/**
 * 메일·메모 앱마다 "무엇을 틀리기 쉬운가" 한 문장 — 열 언어.
 *
 * 앱별로 파일을 두는 규칙을 그대로 따른다 — notes.ts에 한 줄을 더하면 끝이다.
 *
 * 열 칸은 ko·en·es·pt·ja·de·fr·hi·zh·tw 순서다.
 */
import type { Ten } from './types.ts';

export const SC_NOTES_MAIL: Record<string, Ten> = {
  gmail: [
    "Gmail 단축키는 대부분 설정에서 Keyboard shortcuts on을 켜야 살아납니다 — 꺼져 있으면 낱자 키를 눌러도 아무 일도 일어나지 않습니다.",
    "Most Gmail shortcuts do nothing until you turn Keyboard shortcuts on in Settings — while it is off, the single-letter keys simply have no effect.",
    "La mayoría de los atajos de Gmail no hacen nada hasta que activas Keyboard shortcuts on en la configuración: mientras esté apagado, las teclas de una sola letra no surten efecto.",
    "A maioria dos atalhos do Gmail não faz nada até você ativar Keyboard shortcuts on nas configurações: enquanto estiver desligado, as teclas de uma única letra não têm efeito.",
    "Gmail のショートカットは大半が、設定で Keyboard shortcuts on を有効にするまで動きません。切ったままだと一文字のキーを押しても何も起きません。",
    "Die meisten Gmail-Kürzel bleiben wirkungslos, bis man in den Einstellungen Keyboard shortcuts on aktiviert — solange es aus ist, tun die Einzelbuchstaben nichts.",
    "La plupart des raccourcis Gmail restent inertes jusqu’à ce que vous activiez Keyboard shortcuts on dans les paramètres : tant que c’est désactivé, les touches à une lettre n’ont aucun effet.",
    "Gmail के ज़्यादातर शॉर्टकट तब तक कुछ नहीं करते जब तक Settings में Keyboard shortcuts on चालू न कर लें — बंद रहने पर एक-अक्षर वाली कुंजियों का कोई असर ही नहीं होता।",
    "Gmail 的快捷键大多要先在设置里打开 Keyboard shortcuts on 才有效——没打开时，按单个字母键什么也不会发生。",
    "Gmail 的快速鍵大多要先在設定裡開啟 Keyboard shortcuts on 才有效——沒開啟時，按單一字母鍵什麼也不會發生。",
  ],
  outlook: [
    "여기 적은 조합은 설치해서 쓰는 Outlook 기준이고, 웹의 Outlook은 배치가 달라 설정에서 Outlook·Gmail·Yahoo 가운데 어느 배치를 쓸지 직접 고르게 되어 있습니다.",
    "These combinations are the installed Outlook app; Outlook on the web keys differ, and its Settings even ask you to pick between the Outlook, Gmail and Yahoo layouts.",
    "Estas combinaciones corresponden a la aplicación Outlook instalada; en Outlook en la web las teclas cambian y su configuración te pide elegir entre las distribuciones de Outlook, Gmail y Yahoo.",
    "Estas combinações são do aplicativo Outlook instalado; no Outlook na web as teclas mudam e as configurações pedem que você escolha entre os layouts Outlook, Gmail e Yahoo.",
    "ここに載せた組み合わせは、インストールして使う Outlook のものです。ブラウザの Outlook はキーが違い、設定で Outlook・Gmail・Yahoo のどの配列を使うか自分で選ぶ仕組みになっています。",
    "Diese Kombinationen gelten für das installierte Outlook; im Outlook im Browser sind die Tasten anders, und die Einstellungen lassen sogar zwischen den Belegungen von Outlook, Gmail und Yahoo wählen.",
    "Ces combinaisons concernent l’application Outlook installée ; dans Outlook sur le web, les touches diffèrent, et les paramètres vous demandent même de choisir entre les dispositions Outlook, Gmail et Yahoo.",
    "यहाँ दिए संयोजन इंस्टॉल किए गए Outlook के हैं; वेब वाले Outlook में कुंजियाँ अलग हैं और वहाँ Settings में आपको Outlook, Gmail या Yahoo — कौन-सा विन्यास चाहिए, यह ख़ुद चुनना पड़ता है।",
    "这里写的组合是装在电脑上的 Outlook；网页版 Outlook 的按键不一样，而且要在设置里自己选用 Outlook、Gmail 还是 Yahoo 的那一套。",
    "這裡寫的組合是裝在電腦上的 Outlook；網頁版 Outlook 的按鍵不一樣，而且要在設定裡自己選用 Outlook、Gmail 還是 Yahoo 的那一套。",
  ],
  notion: [
    "조합이 없는 기능은 슬래시 메뉴로 갑니다 — /를 치고 이름 몇 글자만 넣으면 콜아웃처럼 기본 키가 아예 없는 블록까지 닿습니다.",
    "Anything with no binding is reached through the slash menu — type / and a few letters of the name and you get even blocks like the callout, which has no key at all.",
    "Todo lo que no tiene atajo se alcanza por el menú de barra: escribe / y unas letras del nombre y llegas incluso a bloques como el callout, que no tiene tecla alguna.",
    "Tudo o que não tem atalho chega pelo menu de barra: digite / e algumas letras do nome e você alcança até blocos como o callout, que não tem tecla nenhuma.",
    "キーが割り当てられていない機能はスラッシュメニューから呼びます。/ に続けて名前を数文字打つだけで、キーがまったくない callout のようなブロックにも届きます。",
    "Was kein Kürzel hat, erreicht man über das Slash-Menü: / eintippen, ein paar Buchstaben des Namens dazu, und selbst Blöcke wie das Callout ohne jede Taste sind da.",
    "Tout ce qui n’a pas de raccourci passe par le menu slash : tapez / puis quelques lettres du nom, et vous atteignez même des blocs comme le callout, qui n’a aucune touche.",
    "जिस चीज़ के लिए कोई कुंजी नहीं है, वह स्लैश मेनू से मिलती है — / लिखकर नाम के दो-चार अक्षर डालिए और callout जैसे उन ब्लॉक तक भी पहुँच जाएँगे जिनकी कोई कुंजी ही नहीं है।",
    "没有绑定按键的功能都走斜杠菜单——输入 / 再加上名字的几个字母，连 callout 这种完全没有按键的块也能调出来。",
    "沒有繫結按鍵的功能都走斜線選單——輸入 / 再加上名字的幾個字母，連 callout 這種完全沒有按鍵的區塊也能叫出來。",
  ],
};
