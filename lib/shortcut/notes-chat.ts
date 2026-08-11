/**
 * Discord·Zoom 안내문 — 앱마다 한 문장, 열 언어.
 *
 * 두 앱이 어긋나는 지점이 서로 다르다. Discord는 판(앱과 브라우저)마다 먹는
 * 키가 달라서 앱이 스스로 보여 주는 목록이 가장 정확하고, Zoom은 창이 앞에
 * 있어야 하느냐가 갈림길이다 — 그래서 한 문장씩 그것을 적는다.
 *
 * 열 칸은 ko·en·es·pt·ja·de·fr·hi·zh·tw 순서다.
 */
import type { Ten } from './types.ts';

export const SC_NOTES_CHAT: Record<string, Ten> = {
  discord: [
    "Ctrl+/ (맥은 Cmd+/)를 누르면 지금 쓰는 판에서 실제로 먹는 목록이 그대로 나옵니다 — 데스크톱 앱과 브라우저가 서로 다른 키를 쓰기 때문에 이 목록이 가장 믿을 만합니다.",
    "Press Ctrl+/ (Cmd+/ on a Mac) and Discord lists the shortcuts that actually work in the build you are running — the desktop app and the browser differ, so that list is the one to trust.",
    "Pulsa Ctrl+/ (Cmd+/ en Mac) y Discord muestra los atajos que de verdad funcionan en tu versión: la app de escritorio y el navegador no coinciden, así que esa lista es la fiable.",
    "Aperte Ctrl+/ (Cmd+/ no Mac) e o Discord lista os atalhos que realmente funcionam na sua versão: o aplicativo e o navegador não batem, então é nessa lista que se confia.",
    "Ctrl+/（Mac は Cmd+/）を押すと、今使っている版で実際に効く一覧がそのまま出ます — desktop の app と browser でキーが違うので、この一覧がいちばん確かです。",
    "Mit Ctrl+/ (am Mac Cmd+/) listet Discord die Kürzel auf, die in Ihrer Version wirklich greifen — Desktop-App und Browser weichen voneinander ab, deshalb gilt diese Liste.",
    "Avec Ctrl+/ (Cmd+/ sur Mac), Discord affiche les raccourcis qui fonctionnent vraiment dans votre version : l'application et le navigateur diffèrent, c'est donc cette liste qui fait foi.",
    "Ctrl+/ (Mac पर Cmd+/) दबाइए और Discord वही shortcuts दिखा देता है जो आपके संस्करण में असल में चलते हैं — desktop app और browser अलग हैं, इसलिए भरोसा उसी सूची पर है।",
    "按 Ctrl+/（Mac 是 Cmd+/），Discord 就把你这个版本里真正生效的快捷键列出来——桌面客户端和浏览器的键不一样，这份清单最可信。",
    "按 Ctrl+/（Mac 是 Cmd+/），Discord 就把你這個版本裡真正生效的快速鍵列出來——桌面版和瀏覽器的鍵不一樣，這份清單最可信。",
  ],
  zoom: [
    "Zoom의 단축키는 기본적으로 Zoom 창이 앞에 있을 때만 듣습니다 — Settings의 Keyboard Shortcuts에서 항목마다 Enable Global Shortcut을 켜 두면 다른 창을 보고 있어도 먹습니다.",
    "Zoom shortcuts are heard only while the Zoom window has focus — tick Enable Global Shortcut next to an action under Settings and Keyboard Shortcuts and that one works from any other window.",
    "Los atajos de Zoom solo se oyen mientras la ventana de Zoom tiene el foco: marca Enable Global Shortcut junto a una acción en Settings y Keyboard Shortcuts y esa funcionará desde cualquier otra ventana.",
    "Os atalhos do Zoom só valem enquanto a janela do Zoom está em foco: marque Enable Global Shortcut ao lado de uma ação em Settings e Keyboard Shortcuts e ela passa a funcionar de qualquer outra janela.",
    "Zoom のショートカットは、Zoom の窓が前にあるあいだだけ効きます — Settings の Keyboard Shortcuts で項目ごとに Enable Global Shortcut を入れると、別の窓を見ていても効きます。",
    "Zoom-Kürzel greifen nur, solange das Zoom-Fenster im Vordergrund ist — setzen Sie unter Settings und Keyboard Shortcuts bei einer Aktion Enable Global Shortcut, wirkt sie aus jedem anderen Fenster.",
    "Les raccourcis Zoom ne sont entendus que si la fenêtre Zoom a le focus — cochez Enable Global Shortcut en face d'une action dans Settings puis Keyboard Shortcuts et elle agira depuis n'importe quelle autre fenêtre.",
    "Zoom के shortcuts तभी सुने जाते हैं जब Zoom की खिड़की सामने हो — Settings के Keyboard Shortcuts में किसी क्रिया के आगे Enable Global Shortcut चुन दें, तो वह किसी भी दूसरी खिड़की से चलेगी।",
    "Zoom 的快捷键默认只在 Zoom 窗口在前台时才听得见——到 Settings 的 Keyboard Shortcuts 里给某一项勾上 Enable Global Shortcut，它在别的窗口里也照样管用。",
    "Zoom 的快速鍵預設只在 Zoom 視窗在前景時才聽得見——到 Settings 的 Keyboard Shortcuts 裡給某一項勾上 Enable Global Shortcut，它在別的視窗裡也照樣有效。",
  ],
};
