/**
 * 갈래마다 "그 도구의 오류는 무엇이 닮았고 어떻게 읽는가" 한 문장 — 열 언어.
 *
 * 오류 문구 자체는 프로그램이 정한 문자열이라 나라를 가리지 않는다. 옮길 것은
 * 뜻과 읽는 법뿐이라, 화면 틀과 갈래 이름을 두는 ui.ts에서 이 한 문장만 갈라
 * 따로 둔다 — 갈래가 늘 때 고칠 파일이 하나로 좁아진다.
 *
 * 열 칸은 ko·en·es·pt·ja·de·fr·hi·zh·tw 순서다.
 */
import type { Ten } from './types.ts';

export const ERR_CAT_NOTES: Record<string, Ten> = {
  git: [
    "git의 오류는 거의 다 \"지금 상태에서 그 일을 하면 무언가 잃는다\"는 거절이고, fatal:은 아무것도 하지 않고 멈췄다는 뜻이니 첫 줄보다 그 아래 hint: 줄이 실제 해법을 담고 있는 경우가 많습니다.",
    "Almost every git error is a refusal that means \"doing that from this state would lose something\"; fatal: means git stopped without changing anything, and the hint: lines under the first line usually carry the actual remedy.",
    "Casi todos los errores de git son una negativa que significa \"hacer eso desde este estado perdería algo\"; fatal: indica que git se detuvo sin cambiar nada, y las líneas hint: bajo la primera suelen traer el remedio real.",
    "Quase todo erro do git é uma recusa que quer dizer \"fazer isso a partir deste estado perderia algo\"; fatal: significa que o git parou sem alterar nada, e as linhas hint: abaixo da primeira normalmente trazem a solução de verdade.",
    "git のエラーはほぼすべて「その状態でそれをやると何かが失われる」という拒否であり、fatal: は何も変えずに止まったという意味なので、一行目より下の hint: 行に本当の解決策が書かれていることが多いです。",
    "Fast jeder git-Fehler ist eine Verweigerung im Sinne von „das aus diesem Zustand zu tun würde etwas verlieren“; fatal: heißt, git hat ohne jede Änderung abgebrochen, und die hint:-Zeilen unter der ersten enthalten meist die eigentliche Lösung.",
    "Presque toutes les erreurs de git sont un refus qui signifie « faire cela depuis cet état ferait perdre quelque chose » ; fatal: veut dire que git s'est arrêté sans rien modifier, et les lignes hint: sous la première portent souvent le vrai remède.",
    "git की लगभग हर त्रुटि एक इनकार होती है जिसका अर्थ है \"इस स्थिति से वह काम करने पर कुछ खो जाएगा\"; fatal: का मतलब है कि git ने कुछ भी बदले बिना रुक गया, और पहली पंक्ति के नीचे की hint: पंक्तियों में असली उपाय होता है।",
    "git 的错误几乎都是一种拒绝，意思是「在当前状态下做那件事会丢掉东西」；fatal: 表示它什么都没改就停了，而真正的解决办法往往在第一行下面的 hint: 行里。",
    "git 的錯誤幾乎都是一種拒絕，意思是「在目前狀態下做那件事會丟掉東西」；fatal: 表示它什麼都沒改就停了，而真正的解決辦法往往在第一行下面的 hint: 行裡。",
  ],
  npm: [
    "npm ERR!로 시작하는 줄은 대개 마지막 여섯 줄이 아니라 첫 code XXXX 한 줄에 원인이 적혀 있고, 오류가 내 코드가 아니라 의존성 나무나 네이티브 빌드에서 온 것이면 node_modules를 지우고 다시 설치하는 것으로 절반이 풀립니다.",
    "With npm the cause sits in the first code XXXX line rather than the last six npm ERR! lines, and when the failure comes from the dependency tree or a native build instead of your own code, deleting node_modules and installing again clears about half of them.",
    "En npm la causa está en la primera línea code XXXX y no en las seis últimas líneas npm ERR!, y cuando el fallo viene del árbol de dependencias o de una compilación nativa y no de tu código, borrar node_modules y reinstalar resuelve la mitad de los casos.",
    "No npm a causa está na primeira linha code XXXX e não nas seis últimas linhas npm ERR!, e quando a falha vem da árvore de dependências ou de uma compilação nativa em vez do seu código, apagar node_modules e instalar de novo resolve metade dos casos.",
    "npm では原因は最後の六行ではなく最初の code XXXX の一行に書かれており、失敗が自分のコードではなく依存関係の木やネイティブビルドから来ている場合は、node_modules を消して入れ直すだけで半分は解けます。",
    "Bei npm steht die Ursache in der ersten code-XXXX-Zeile und nicht in den letzten sechs npm-ERR!-Zeilen, und wenn der Fehler aus dem Abhängigkeitsbaum oder einem Native-Build statt aus eigenem Code kommt, löst das Löschen von node_modules mit erneuter Installation etwa die Hälfte.",
    "Avec npm, la cause tient dans la première ligne code XXXX et non dans les six dernières lignes npm ERR!, et quand la panne vient de l'arbre de dépendances ou d'une compilation native plutôt que de votre code, supprimer node_modules puis réinstaller en règle environ la moitié.",
    "npm में कारण अंतिम छह npm ERR! पंक्तियों में नहीं, पहली code XXXX पंक्ति में लिखा होता है, और जब गड़बड़ी आपके कोड की जगह dependency के पेड़ या native build से आती है, तो node_modules मिटाकर फिर install करने से आधे मामले सुलझ जाते हैं।",
    "npm 的原因写在第一行 code XXXX 里，而不是最后那六行 npm ERR!；如果失败来自依赖树或原生编译而不是你自己的代码，删掉 node_modules 重新安装就能解决一半。",
    "npm 的原因寫在第一行 code XXXX 裡，而不是最後那六行 npm ERR!；如果失敗來自相依樹或原生編譯而不是你自己的程式碼，刪掉 node_modules 重新安裝就能解決一半。",
  ],
};
