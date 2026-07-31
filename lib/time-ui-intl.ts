// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { AnyLocale } from './locales.ts';

/**
 * 시간 도구 화면 문구 — 여덟 언어.
 *
 * 도구 컴포넌트가 직접 한국어를 들고 있으면 언어를 늘릴 때마다 11개 파일을
 * 다 열어야 한다. 문구만 여기로 모아 두고 컴포넌트는 lang으로 골라 쓴다.
 *
 * 계산·타이밍 로직은 컴포넌트에 그대로 둔다 — 문구와 동작을 같은 파일에서
 * 섞으면 번역이 동작을 건드릴 위험이 생긴다.
 */
/**
 * 시간 도구가 쓰는 언어 — AnyLocale에 중국어 둘을 더한다.
 * 공용 IntlLocale을 넓히지 않는 이유는 lib/food-intl.ts에 적어 두었다.
 */
export type TimeLang = AnyLocale | 'zh-hans' | 'zh-hant';

type L<T> = Record<TimeLang, T>;

export const TIMER_UI: L<{
  tabTitle: string; tabDone: string;
  done: string; running: string; paused: string; idle: string;
  min: string; sec: string;
  start: string; resume: string; pause: string; reset: string;
  presets: string; minSuffix: (m: number) => string;
  note: string;
}> = {
  ko: {
    tabTitle: '타이머 | vixutil', tabDone: '⏰ 시간 종료! | vixutil',
    done: '시간이 다 됐습니다', running: '진행 중', paused: '일시정지', idle: '시작을 누르세요',
    min: '분', sec: '초',
    start: '▶ 시작', resume: '▶ 이어서', pause: '⏸ 일시정지', reset: '처음으로',
    presets: '빠른 설정', minSuffix: m => `${m}분`,
    note: '남은 시간은 끝나는 시각을 기준으로 다시 계산합니다. 다른 탭을 보다가 돌아와도 시간이 밀리지 않고, 브라우저 탭 제목에도 남은 시간이 표시돼 창을 바꿔도 확인할 수 있습니다. 다만 탭을 완전히 닫으면 알림음은 울리지 않습니다.',
  },
  en: {
    tabTitle: 'Timer | vixutil', tabDone: '⏰ Time up! | vixutil',
    done: 'Time is up', running: 'Running', paused: 'Paused', idle: 'Press start',
    min: 'Min', sec: 'Sec',
    start: '▶ Start', resume: '▶ Resume', pause: '⏸ Pause', reset: 'Reset',
    presets: 'Quick set', minSuffix: m => `${m} min`,
    note: 'The remaining time is recalculated against the finish time rather than counted down, so switching tabs and coming back does not make it drift. The countdown also appears in the tab title. If you close the tab entirely, the sound will not fire.',
  },
  es: {
    tabTitle: 'Temporizador | vixutil', tabDone: '⏰ ¡Tiempo! | vixutil',
    done: 'Se acabó el tiempo', running: 'En marcha', paused: 'En pausa', idle: 'Pulsa empezar',
    min: 'Min', sec: 'Seg',
    start: '▶ Empezar', resume: '▶ Continuar', pause: '⏸ Pausa', reset: 'Reiniciar',
    presets: 'Ajuste rápido', minSuffix: m => `${m} min`,
    note: 'El tiempo restante se recalcula contra la hora de fin en lugar de irse descontando, así que cambiar de pestaña y volver no lo desfasa. La cuenta atrás también sale en el título de la pestaña. Si cierras la pestaña del todo, el sonido no se dispara.',
  },
  'pt-br': {
    tabTitle: 'Timer | vixutil', tabDone: '⏰ Acabou o tempo! | vixutil',
    done: 'O tempo acabou', running: 'Em andamento', paused: 'Pausado', idle: 'Aperte começar',
    min: 'Min', sec: 'Seg',
    start: '▶ Começar', resume: '▶ Continuar', pause: '⏸ Pausar', reset: 'Reiniciar',
    presets: 'Ajuste rápido', minSuffix: m => `${m} min`,
    note: 'O tempo restante é recalculado contra a hora de término em vez de ser descontado, então trocar de aba e voltar não faz ele atrasar. A contagem também aparece no título da aba. Se fechar a aba de vez, o som não toca.',
  },
  ja: {
    tabTitle: 'タイマー | vixutil', tabDone: '⏰ 時間終了！ | vixutil',
    done: '時間になりました', running: '進行中', paused: '一時停止', idle: '開始を押してください',
    min: '分', sec: '秒',
    start: '▶ 開始', resume: '▶ 続ける', pause: '⏸ 一時停止', reset: '最初から',
    presets: 'かんたん設定', minSuffix: m => `${m}分`,
    note: '残り時間は終わる時刻を基準に計算し直します。別のタブを見て戻ってきても時間がずれません。ブラウザのタブのタイトルにも残り時間が出るので、窓を切り替えても確認できます。ただしタブを完全に閉じると通知音は鳴りません。',
  },
  de: {
    tabTitle: 'Timer | vixutil', tabDone: '⏰ Zeit um! | vixutil',
    done: 'Die Zeit ist um', running: 'Läuft', paused: 'Pausiert', idle: 'Drück Start',
    min: 'Min', sec: 'Sek',
    start: '▶ Start', resume: '▶ Weiter', pause: '⏸ Pause', reset: 'Zurücksetzen',
    presets: 'Schnell einstellen', minSuffix: m => `${m} Min.`,
    note: 'Die Restzeit wird gegen den Endzeitpunkt neu berechnet, nicht heruntergezählt — ein Tabwechsel und zurück lässt sie also nicht abdriften. Der Countdown steht auch im Tab-Titel. Schließt du den Tab ganz, kommt kein Ton.',
  },
  fr: {
    tabTitle: 'Minuteur | vixutil', tabDone: '⏰ Temps écoulé ! | vixutil',
    done: 'Le temps est écoulé', running: 'En cours', paused: 'En pause', idle: 'Appuie sur démarrer',
    min: 'Min', sec: 'Sec',
    start: '▶ Démarrer', resume: '▶ Reprendre', pause: '⏸ Pause', reset: 'Réinitialiser',
    presets: 'Réglage rapide', minSuffix: m => `${m} min`,
    note: 'Le temps restant est recalculé par rapport à l’heure de fin plutôt que décompté : changer d’onglet et revenir ne le décale pas. Le compte à rebours apparaît aussi dans le titre de l’onglet. Si tu fermes complètement l’onglet, le son ne se déclenchera pas.',
  },
  hi: {
    tabTitle: 'टाइमर | vixutil', tabDone: '⏰ समय पूरा! | vixutil',
    done: 'समय पूरा हो गया', running: 'चल रहा है', paused: 'रुका हुआ', idle: 'शुरू दबाएँ',
    min: 'मिनट', sec: 'सेकंड',
    start: '▶ शुरू', resume: '▶ आगे', pause: '⏸ रोकें', reset: 'शुरू से',
    presets: 'तुरंत सेटिंग', minSuffix: m => `${m} मिनट`,
    note: 'बचा समय ख़त्म होने के समय के हिसाब से फिर गिना जाता है, घटाकर नहीं। इसलिए दूसरी टैब देखकर लौटने पर समय नहीं खिसकता। उल्टी गिनती टैब के शीर्षक में भी दिखती है, तो खिड़की बदलने पर भी पता चलता है। पर टैब पूरी तरह बंद कर दें तो आवाज़ नहीं बजेगी।',
  },
  'zh-hans': {
    tabTitle: '计时器 | vixutil', tabDone: '⏰ 时间到！| vixutil',
    done: '时间到了', running: '进行中', paused: '已暂停', idle: '请按开始',
    min: '分', sec: '秒',
    start: '▶ 开始', resume: '▶ 继续', pause: '⏸ 暂停', reset: '回到开头',
    presets: '快捷设定', minSuffix: m => `${m} 分钟`,
    note: '剩余时间是照结束时刻反推出来的，所以你去别的标签页转一圈回来，时间也不会走偏。浏览器标签标题上也会显示剩余时间，换窗口照样看得到。不过把标签整个关掉，提示音就不会响了。',
  },
  'zh-hant': {
    tabTitle: '計時器 | vixutil', tabDone: '⏰ 時間到！| vixutil',
    done: '時間到了', running: '進行中', paused: '已暫停', idle: '請按開始',
    min: '分', sec: '秒',
    start: '▶ 開始', resume: '▶ 繼續', pause: '⏸ 暫停', reset: '回到開頭',
    presets: '快捷設定', minSuffix: m => `${m} 分鐘`,
    note: '剩餘時間是照結束時刻反推出來的，所以你去別的分頁轉一圈回來，時間也不會走偏。瀏覽器分頁標題上也會顯示剩餘時間，換視窗照樣看得到。不過把分頁整個關掉，提示音就不會響了。',
  },
};

export const STOPWATCH_UI: L<{
  measuring: string; stopped: string; idle: string;
  start: string; resume: string; stop: string; lap: string; reset: string;
  lapCount: string; fastest: string; slowest: string; cumulative: string;
  note: string;
}> = {
  ko: {
    measuring: '측정 중', stopped: '멈춤', idle: '시작을 누르세요',
    start: '▶ 시작', resume: '▶ 이어서', stop: '■ 정지', lap: '랩 기록', reset: '초기화',
    lapCount: '랩 수', fastest: '가장 빠른 구간', slowest: '가장 느린 구간', cumulative: '누적',
    note: '랩은 구간 시간과 누적 시간을 함께 보여줍니다. 운동 세트나 반복 작업처럼 같은 일을 여러 번 할 때 어느 구간이 느려졌는지 바로 드러납니다. 가장 빠른 구간은 초록, 가장 느린 구간은 붉게 표시됩니다.',
  },
  en: {
    measuring: 'Running', stopped: 'Stopped', idle: 'Press start',
    start: '▶ Start', resume: '▶ Resume', stop: '■ Stop', lap: 'Lap', reset: 'Reset',
    lapCount: 'Laps', fastest: 'Fastest lap', slowest: 'Slowest lap', cumulative: 'Total',
    note: 'Each lap shows both the split and the running total, so when you repeat the same thing — sets, drills, batches — it is immediately clear which round slowed down. The fastest lap is marked green and the slowest red.',
  },
  es: {
    measuring: 'En marcha', stopped: 'Parado', idle: 'Pulsa empezar',
    start: '▶ Empezar', resume: '▶ Continuar', stop: '■ Parar', lap: 'Vuelta', reset: 'Reiniciar',
    lapCount: 'Vueltas', fastest: 'Vuelta más rápida', slowest: 'Vuelta más lenta', cumulative: 'Total',
    note: 'Cada vuelta muestra el parcial y el acumulado, así que cuando repites lo mismo — series, ejercicios, lotes — se ve enseguida qué ronda se ralentizó. La vuelta más rápida sale en verde y la más lenta en rojo.',
  },
  'pt-br': {
    measuring: 'Em andamento', stopped: 'Parado', idle: 'Aperte começar',
    start: '▶ Começar', resume: '▶ Continuar', stop: '■ Parar', lap: 'Volta', reset: 'Zerar',
    lapCount: 'Voltas', fastest: 'Volta mais rápida', slowest: 'Volta mais lenta', cumulative: 'Total',
    note: 'Cada volta mostra o parcial e o acumulado, então quando você repete a mesma coisa — séries, exercícios, lotes — fica na hora claro qual rodada ficou mais lenta. A volta mais rápida sai em verde e a mais lenta em vermelho.',
  },
  ja: {
    measuring: '測定中', stopped: '停止', idle: '開始を押してください',
    start: '▶ 開始', resume: '▶ 続ける', stop: '■ 停止', lap: 'ラップ記録', reset: 'リセット',
    lapCount: 'ラップ数', fastest: 'もっとも速い区間', slowest: 'もっとも遅い区間', cumulative: '累計',
    note: 'ラップは区間の時間と累計を並べて表示します。トレーニングのセットや繰り返しの作業のように同じことを何度もするとき、どの回で遅くなったかがすぐ分かります。もっとも速い区間は緑、もっとも遅い区間は赤で示します。',
  },
  de: {
    measuring: 'Läuft', stopped: 'Gestoppt', idle: 'Drück Start',
    start: '▶ Start', resume: '▶ Weiter', stop: '■ Stopp', lap: 'Runde', reset: 'Zurücksetzen',
    lapCount: 'Runden', fastest: 'Schnellste Runde', slowest: 'Langsamste Runde', cumulative: 'Gesamt',
    note: 'Jede Runde zeigt sowohl die Zwischenzeit als auch die laufende Summe. Wenn du dasselbe wiederholst — Sätze, Übungen, Chargen — siehst du sofort, welcher Durchgang langsamer wurde. Die schnellste Runde ist grün markiert, die langsamste rot.',
  },
  fr: {
    measuring: 'En cours', stopped: 'Arrêté', idle: 'Appuie sur démarrer',
    start: '▶ Démarrer', resume: '▶ Reprendre', stop: '■ Arrêt', lap: 'Tour', reset: 'Réinitialiser',
    lapCount: 'Tours', fastest: 'Tour le plus rapide', slowest: 'Tour le plus lent', cumulative: 'Total',
    note: 'Chaque tour affiche l’intermédiaire et le cumul, donc quand tu répètes la même chose — séries, exercices, lots — on voit tout de suite quelle manche a ralenti. Le tour le plus rapide est marqué en vert et le plus lent en rouge.',
  },
  hi: {
    measuring: 'माप जारी', stopped: 'रुका', idle: 'शुरू दबाएँ',
    start: '▶ शुरू', resume: '▶ आगे', stop: '■ रोकें', lap: 'लैप दर्ज करें', reset: 'शुरू से',
    lapCount: 'लैप', fastest: 'सबसे तेज़ हिस्सा', slowest: 'सबसे धीमा हिस्सा', cumulative: 'कुल',
    note: 'हर लैप हिस्से का समय और कुल समय दोनों दिखाता है, तो जब आप एक ही काम बार-बार करते हैं — कसरत के सेट, दोहराए काम — तो साफ़ पता चलता है कि कौन-सा दौर धीमा पड़ा। सबसे तेज़ हिस्सा हरे और सबसे धीमा लाल रंग में दिखता है।',
  },
  'zh-hans': {
    measuring: '计时中', stopped: '已停止', idle: '请按开始',
    start: '▶ 开始', resume: '▶ 继续', stop: '■ 停止', lap: '记一圈', reset: '清零',
    lapCount: '圈数', fastest: '最快的一段', slowest: '最慢的一段', cumulative: '累计',
    note: '每一圈会同时显示这一段的时间和累计时间。做运动组数或重复性工作时，哪一段慢下来一眼就看得出。最快的一段标绿，最慢的标红。',
  },
  'zh-hant': {
    measuring: '計時中', stopped: '已停止', idle: '請按開始',
    start: '▶ 開始', resume: '▶ 繼續', stop: '■ 停止', lap: '記一圈', reset: '歸零',
    lapCount: '圈數', fastest: '最快的一段', slowest: '最慢的一段', cumulative: '累計',
    note: '每一圈會同時顯示這一段的時間和累計時間。做運動組數或重複性工作時，哪一段慢下來一眼就看得出。最快的一段標綠，最慢的標紅。',
  },
};

export const POMODORO_UI: L<{
  focus: string; shortBreak: string; longBreak: string; breakLabel: string;
  breakTime: string; focusTime: string;
  start: string; resume: string; pause: string;
  next: string; completed: string; focused: string;
  skip: string; minUnit: string;
  whyTitle: string; whyBody: string;
}> = {
  ko: {
    focus: '집중', shortBreak: '짧은 휴식', longBreak: '긴 휴식', breakLabel: '휴식',
    breakTime: '쉬는 시간입니다', focusTime: '다시 집중할 시간입니다',
    start: '▶ 시작', resume: '▶ 이어서', pause: '⏸ 일시정지',
    next: '다음', completed: '완료한 뽀모도로', focused: '집중한 시간',
    skip: '이 단계 건너뛰기', minUnit: '분',
    whyTitle: '왜 25분인가요',
    whyBody: '25분은 프란체스코 치릴로가 1980년대에 제안한 길이입니다. 특정 숫자에 과학적 근거가 있는 것은 아니고, "타이머가 도는 동안은 딴 일을 하지 않는다"는 규칙 자체가 효과의 대부분입니다. 자신에게 맞는 길이로 바꿔도 됩니다.',
  },
  en: {
    focus: 'Focus', shortBreak: 'Short break', longBreak: 'Long break', breakLabel: 'Break',
    breakTime: 'Break time', focusTime: 'Back to focus',
    start: '▶ Start', resume: '▶ Resume', pause: '⏸ Pause',
    next: 'Next', completed: 'Pomodoros done', focused: 'Time focused',
    skip: 'Skip this phase', minUnit: ' min',
    whyTitle: 'Why 25 minutes?',
    whyBody: 'Twenty-five minutes is the length Francesco Cirillo proposed in the 1980s. There is no particular evidence behind that specific number — most of the effect comes from the rule itself, that you do not switch tasks while the timer runs. Adjust the length to whatever actually works for you.',
  },
  es: {
    focus: 'Concentración', shortBreak: 'Descanso corto', longBreak: 'Descanso largo', breakLabel: 'Descanso',
    breakTime: 'Toca descansar', focusTime: 'Vuelta a concentrarse',
    start: '▶ Empezar', resume: '▶ Continuar', pause: '⏸ Pausa',
    next: 'Siguiente', completed: 'Pomodoros hechos', focused: 'Tiempo concentrado',
    skip: 'Saltar esta fase', minUnit: ' min',
    whyTitle: '¿Por qué 25 minutos?',
    whyBody: 'Veinticinco minutos es la duración que propuso Francesco Cirillo en los años ochenta. No hay ninguna evidencia particular detrás de ese número — la mayor parte del efecto viene de la regla en sí, la de no cambiar de tarea mientras el temporizador corre. Ajusta la duración a lo que de verdad te funcione.',
  },
  'pt-br': {
    focus: 'Foco', shortBreak: 'Pausa curta', longBreak: 'Pausa longa', breakLabel: 'Pausa',
    breakTime: 'Hora de descansar', focusTime: 'De volta ao foco',
    start: '▶ Começar', resume: '▶ Continuar', pause: '⏸ Pausar',
    next: 'Próximo', completed: 'Pomodoros concluídos', focused: 'Tempo focado',
    skip: 'Pular esta fase', minUnit: ' min',
    whyTitle: 'Por que 25 minutos?',
    whyBody: 'Vinte e cinco minutos é a duração que Francesco Cirillo propôs nos anos 1980. Não há nenhuma evidência específica atrás desse número — a maior parte do efeito vem da regra em si, a de não trocar de tarefa enquanto o timer corre. Ajuste a duração para o que realmente funciona para você.',
  },
  ja: {
    focus: '集中', shortBreak: '短い休憩', longBreak: '長い休憩', breakLabel: '休憩',
    breakTime: '休む時間です', focusTime: 'また集中する時間です',
    start: '▶ 開始', resume: '▶ 続ける', pause: '⏸ 一時停止',
    next: '次', completed: 'こなしたポモドーロ', focused: '集中した時間',
    skip: 'この段階を飛ばす', minUnit: '分',
    whyTitle: 'なぜ25分なのか',
    whyBody: '25分はフランチェスコ・シリロが1980年代に提案した長さです。この数字そのものに科学的な裏づけがあるわけではなく、「タイマーが回っているあいだはほかのことをしない」という決まり自体が効果のほとんどです。自分に合う長さに変えてかまいません。',
  },
  de: {
    focus: 'Fokus', shortBreak: 'Kurze Pause', longBreak: 'Lange Pause', breakLabel: 'Pause',
    breakTime: 'Zeit für eine Pause', focusTime: 'Zurück zum Fokus',
    start: '▶ Start', resume: '▶ Weiter', pause: '⏸ Pause',
    next: 'Weiter', completed: 'Erledigte Pomodoros', focused: 'Fokuszeit',
    skip: 'Diese Phase überspringen', minUnit: ' Min.',
    whyTitle: 'Warum 25 Minuten?',
    whyBody: 'Fünfundzwanzig Minuten ist die Länge, die Francesco Cirillo in den 1980ern vorgeschlagen hat. Für diese Zahl selbst gibt es keinen besonderen Beleg — der Effekt kommt vor allem von der Regel: während der Timer läuft, wechselst du die Aufgabe nicht. Passe die Länge an, was bei dir tatsächlich funktioniert.',
  },
  fr: {
    focus: 'Concentration', shortBreak: 'Courte pause', longBreak: 'Longue pause', breakLabel: 'Pause',
    breakTime: 'C’est la pause', focusTime: 'Retour à la concentration',
    start: '▶ Démarrer', resume: '▶ Reprendre', pause: '⏸ Pause',
    next: 'Suivant', completed: 'Pomodoros faits', focused: 'Temps de concentration',
    skip: 'Passer cette phase', minUnit: ' min',
    whyTitle: 'Pourquoi 25 minutes ?',
    whyBody: 'Vingt-cinq minutes est la durée que Francesco Cirillo a proposée dans les années 1980. Rien ne justifie particulièrement ce chiffre — l’essentiel de l’effet vient de la règle elle-même : tant que le minuteur tourne, tu ne changes pas de tâche. Ajuste la durée à ce qui marche vraiment pour toi.',
  },
  hi: {
    focus: 'एकाग्रता', shortBreak: 'छोटा विश्राम', longBreak: 'लंबा विश्राम', breakLabel: 'विश्राम',
    breakTime: 'विश्राम का समय है', focusTime: 'फिर ध्यान लगाने का समय',
    start: '▶ शुरू', resume: '▶ आगे', pause: '⏸ रोकें',
    next: 'अगला', completed: 'पूरे हुए पोमोडोरो', focused: 'एकाग्र समय',
    skip: 'यह चरण छोड़ें', minUnit: ' मिनट',
    whyTitle: '25 मिनट क्यों?',
    whyBody: 'पच्चीस मिनट वह अवधि है जो फ़्रांचेस्को चिरिलो ने 1980 के दशक में सुझाई थी। इस अंक के पीछे कोई ख़ास प्रमाण नहीं है — असर का ज़्यादातर हिस्सा नियम से ही आता है, कि जब तक टाइमर चल रहा है तब तक काम नहीं बदलना। अपने हिसाब से अवधि बदल लीजिए।',
  },
  'zh-hans': {
    focus: '专注', shortBreak: '短休息', longBreak: '长休息', breakLabel: '休息',
    breakTime: '该休息了', focusTime: '该继续专注了',
    start: '▶ 开始', resume: '▶ 继续', pause: '⏸ 暂停',
    next: '下一段', completed: '完成的番茄钟', focused: '专注的时间',
    skip: '跳过这一段', minUnit: '分钟',
    whyTitle: '为什么是 25 分钟',
    whyBody: '25 分钟是弗朗切斯科·西里洛在 1980 年代提出的长度。这个数字本身并没有什么科学依据，真正起作用的是「计时器在转的时候不干别的」这条规则。你完全可以改成适合自己的长度。',
  },
  'zh-hant': {
    focus: '專注', shortBreak: '短休息', longBreak: '長休息', breakLabel: '休息',
    breakTime: '該休息了', focusTime: '該繼續專注了',
    start: '▶ 開始', resume: '▶ 繼續', pause: '⏸ 暫停',
    next: '下一段', completed: '完成的番茄鐘', focused: '專注的時間',
    skip: '跳過這一段', minUnit: '分鐘',
    whyTitle: '為什麼是 25 分鐘',
    whyBody: '25 分鐘是弗朗切斯科·西里洛在 1980 年代提出的長度。這個數字本身並沒有什麼科學依據，真正起作用的是「計時器在轉的時候不幹別的」這條規則。你完全可以改成適合自己的長度。',
  },
};

export const ALARM_UI: L<{
  set: string; reset: string; ringing: string;
  alarmAt: string; currentTime: string; remaining: string;
  today: string; tomorrow: string; keepOpen: string;
  stop: string; itIsNow: (t: string) => string; until: (day: string, t: string) => string;
  note: string;
}> = {
  ko: {
    set: '알람 맞추기', reset: '다시 맞추기', ringing: '⏰ 알람!',
    alarmAt: '알람 시각', currentTime: '현재 시각', remaining: '남았습니다',
    today: '오늘', tomorrow: '내일', keepOpen: '이 탭을 열어 두어야',
    stop: '알람 끄기',
    itIsNow: t => `${t}이 되었습니다`,
    until: (day, t) => `${day} ${t}까지`,
    note: '이미 지난 시각을 넣으면 내일 그 시각으로 잡힙니다. 브라우저 안에서만 도는 알람이라 이 탭을 열어 두어야 울립니다. 기기를 재우면 소리가 나지 않을 수 있으니, 꼭 일어나야 하는 아침 알람은 휴대폰 알람을 함께 쓰세요.',
  },
  en: {
    set: 'Set alarm', reset: 'Set again', ringing: '⏰ Alarm',
    alarmAt: 'Alarm at', currentTime: 'Now', remaining: 'to go',
    today: 'Today', tomorrow: 'Tomorrow', keepOpen: 'keep this tab open for it to fire',
    stop: 'Stop alarm',
    itIsNow: t => `It is ${t}`,
    until: (day, t) => `until ${day} ${t}`,
    note: 'A time already past today is set for tomorrow instead. The alarm runs inside the browser, so this tab has to stay open for it to fire, and a sleeping device may not play the sound. For a morning alarm you actually need to wake up to, use your phone alarm as well.',
  },
  es: {
    set: 'Poner la alarma', reset: 'Volver a ponerla', ringing: '⏰ ¡Alarma!',
    alarmAt: 'Alarma a las', currentTime: 'Ahora', remaining: 'para que suene',
    today: 'Hoy', tomorrow: 'Mañana', keepOpen: 'deja esta pestaña abierta para que suene',
    stop: 'Parar la alarma',
    itIsNow: t => `Son las ${t}`,
    until: (day, t) => `hasta ${day} a las ${t}`,
    note: 'Si pones una hora que ya pasó hoy, se ajusta para mañana. La alarma corre dentro del navegador, así que esta pestaña tiene que quedarse abierta para que suene, y un aparato dormido puede no reproducir el sonido. Para una alarma de la mañana que de verdad necesitas, usa también la del móvil.',
  },
  'pt-br': {
    set: 'Definir o alarme', reset: 'Definir de novo', ringing: '⏰ Alarme!',
    alarmAt: 'Alarme às', currentTime: 'Agora', remaining: 'para tocar',
    today: 'Hoje', tomorrow: 'Amanhã', keepOpen: 'deixe esta aba aberta para tocar',
    stop: 'Parar o alarme',
    itIsNow: t => `Já são ${t}`,
    until: (day, t) => `até ${day} às ${t}`,
    note: 'Se você colocar um horário que já passou hoje, ele vai para amanhã. O alarme roda dentro do navegador, então esta aba precisa ficar aberta para tocar, e um aparelho em repouso pode não reproduzir o som. Para um alarme da manhã que você realmente precisa, use também o do celular.',
  },
  ja: {
    set: 'アラームを設定', reset: '設定し直す', ringing: '⏰ アラーム！',
    alarmAt: 'アラームの時刻', currentTime: '現在の時刻', remaining: '残っています',
    today: '今日', tomorrow: '明日', keepOpen: 'このタブを開いておいてください',
    stop: 'アラームを止める',
    itIsNow: t => `${t}になりました`,
    until: (day, t) => `${day} ${t}まで`,
    note: 'すでに過ぎた時刻を入れると、明日のその時刻に設定されます。ブラウザの中だけで動くアラームなので、このタブを開いておかないと鳴りません。端末をスリープさせると音が出ないこともあるので、どうしても起きなければならない朝のアラームは携帯のアラームも併せて使ってください。',
  },
  de: {
    set: 'Wecker stellen', reset: 'Neu stellen', ringing: '⏰ Alarm!',
    alarmAt: 'Wecker um', currentTime: 'Jetzt', remaining: 'bis es klingelt',
    today: 'Heute', tomorrow: 'Morgen', keepOpen: 'lass diesen Tab offen, damit er klingelt',
    stop: 'Alarm ausschalten',
    itIsNow: t => `Es ist ${t}`,
    until: (day, t) => `bis ${day} ${t}`,
    note: 'Eine Uhrzeit, die heute schon vorbei ist, wird stattdessen auf morgen gelegt. Der Wecker läuft im Browser, dieser Tab muss also offen bleiben, und ein schlafendes Gerät spielt den Ton womöglich nicht ab. Für einen Morgenwecker, auf den du dich verlassen musst, nimm zusätzlich den Handywecker.',
  },
  fr: {
    set: 'Régler le réveil', reset: 'Régler à nouveau', ringing: '⏰ Alarme !',
    alarmAt: 'Réveil à', currentTime: 'Maintenant', remaining: 'avant la sonnerie',
    today: 'Aujourd’hui', tomorrow: 'Demain', keepOpen: 'laisse cet onglet ouvert pour qu’il sonne',
    stop: 'Arrêter l’alarme',
    itIsNow: t => `Il est ${t}`,
    until: (day, t) => `jusqu’à ${day} ${t}`,
    note: 'Une heure déjà passée aujourd’hui est reportée à demain. L’alarme tourne dans le navigateur : cet onglet doit rester ouvert pour qu’elle sonne, et un appareil en veille peut ne pas jouer le son. Pour un réveil du matin dont tu as vraiment besoin, utilise aussi celui de ton téléphone.',
  },
  hi: {
    set: 'अलार्म लगाएँ', reset: 'फिर से लगाएँ', ringing: '⏰ अलार्म!',
    alarmAt: 'अलार्म का समय', currentTime: 'अभी का समय', remaining: 'बाकी है',
    today: 'आज', tomorrow: 'कल', keepOpen: 'बजने के लिए यह टैब खुला रखें',
    stop: 'अलार्म बंद करें',
    itIsNow: t => `${t} हो गया है`,
    until: (day, t) => `${day} ${t} तक`,
    note: 'आज बीत चुका समय डालें तो वह कल के उसी समय पर लग जाता है। अलार्म ब्राउज़र के भीतर ही चलता है, इसलिए बजने के लिए यह टैब खुला रहना चाहिए, और उपकरण सो जाए तो आवाज़ न आए। जिस सुबह के अलार्म पर आपको भरोसा करना है, उसके लिए फ़ोन का अलार्म भी लगा लें।',
  },
  'zh-hans': {
    set: '设定闹钟', reset: '重新设定', ringing: '⏰ 闹钟响了！',
    alarmAt: '闹钟时刻', currentTime: '当前时间', remaining: '还剩',
    today: '今天', tomorrow: '明天', keepOpen: '这个标签页得开着',
    stop: '关掉闹钟',
    itIsNow: t => `${t} 到了`,
    until: (day, t) => `到${day} ${t} 为止`,
    note: '填一个已经过去的时刻，它会自动排到明天的那个点。这个闹钟只在浏览器里跑，所以标签页得一直开着才响。设备一睡下就可能没声音，非起不可的早晨闹钟，请同时用手机的。',
  },
  'zh-hant': {
    set: '設定鬧鐘', reset: '重新設定', ringing: '⏰ 鬧鐘響了！',
    alarmAt: '鬧鐘時刻', currentTime: '目前時間', remaining: '還剩',
    today: '今天', tomorrow: '明天', keepOpen: '這個分頁得開著',
    stop: '關掉鬧鐘',
    itIsNow: t => `${t} 到了`,
    until: (day, t) => `到${day} ${t} 為止`,
    note: '填一個已經過去的時刻，它會自動排到明天的那個點。這個鬧鐘只在瀏覽器裡跑，所以分頁得一直開著才響。裝置一睡下就可能沒聲音，非起不可的早晨鬧鐘，請同時用手機的。',
  },
};

export const WORLDCLOCK_UI: L<{
  manage: string; now: string;
  ahead: (base: string, h: number) => string;
  behind: (base: string, h: number) => string;
  yourTime: string; note: string;
}> = {
  ko: {
    manage: '도시 추가·제거', now: '지금',
    ahead: (base, h) => `${base}보다 ${h}시간 빠름`,
    behind: (base, h) => `${base}보다 ${h}시간 느림`,
    yourTime: '서울',
    note: '카드 색은 그곳의 시간대를 뜻합니다 — 초록은 업무 시간, 검정은 한밤중입니다. 연락하기 전에 색만 봐도 지금 보내도 되는지 알 수 있습니다. 서머타임은 브라우저가 각 나라의 규칙을 알고 있어 자동으로 반영됩니다.',
  },
  en: {
    manage: 'Add or remove cities', now: 'Now',
    ahead: (base, h) => `${h}h ahead of ${base}`,
    behind: (base, h) => `${h}h behind ${base}`,
    yourTime: 'your time',
    note: 'The card colour tells you what time of day it is there — green is working hours, black is the middle of the night. A glance at the colour tells you whether now is a reasonable moment to message. Daylight saving is applied automatically, since the browser knows each country’s rules.',
  },
  es: {
    manage: 'Añadir o quitar ciudades', now: 'Ahora',
    ahead: (base, h) => `${h}h por delante de ${base}`,
    behind: (base, h) => `${h}h por detrás de ${base}`,
    yourTime: 'tu hora',
    note: 'El color de la tarjeta te dice qué momento del día es allí — verde es horario laboral, negro es plena noche. Un vistazo al color te dice si ahora es un momento razonable para escribir. El horario de verano se aplica solo, porque el navegador conoce las reglas de cada país.',
  },
  'pt-br': {
    manage: 'Adicionar ou remover cidades', now: 'Agora',
    ahead: (base, h) => `${h}h à frente de ${base}`,
    behind: (base, h) => `${h}h atrás de ${base}`,
    yourTime: 'sua hora',
    note: 'A cor do cartão diz que momento do dia é lá — verde é horário de trabalho, preto é madrugada. Um olhar na cor já diz se agora é uma hora razoável para mandar mensagem. O horário de verão é aplicado sozinho, porque o navegador conhece as regras de cada país.',
  },
  ja: {
    manage: '都市の追加・削除', now: '現在',
    ahead: (base, h) => `${base}より${h}時間進んでいます`,
    behind: (base, h) => `${base}より${h}時間遅れています`,
    yourTime: '現地時間',
    note: 'カードの色はその土地の時間帯を表します — 緑は勤務時間、黒は真夜中です。連絡する前に色を見るだけで、いま送っていい時間かどうか分かります。サマータイムはブラウザが各国の規則を知っているので自動で反映されます。',
  },
  de: {
    manage: 'Städte hinzufügen oder entfernen', now: 'Jetzt',
    ahead: (base, h) => `${h} Std. vor ${base}`,
    behind: (base, h) => `${h} Std. hinter ${base}`,
    yourTime: 'deine Zeit',
    note: 'Die Kartenfarbe sagt dir, welche Tageszeit dort herrscht — grün ist Arbeitszeit, schwarz ist mitten in der Nacht. Ein Blick auf die Farbe reicht, um zu wissen, ob jetzt ein vernünftiger Moment für eine Nachricht ist. Die Sommerzeit wird automatisch berücksichtigt, weil der Browser die Regeln jedes Landes kennt.',
  },
  fr: {
    manage: 'Ajouter ou retirer des villes', now: 'Maintenant',
    ahead: (base, h) => `${h}h d’avance sur ${base}`,
    behind: (base, h) => `${h}h de retard sur ${base}`,
    yourTime: 'ton heure',
    note: 'La couleur de la carte t’indique le moment de la journée là-bas — vert pour les heures de travail, noir pour le milieu de la nuit. Un coup d’œil à la couleur suffit à savoir si c’est un moment raisonnable pour écrire. L’heure d’été est appliquée automatiquement, le navigateur connaissant les règles de chaque pays.',
  },
  hi: {
    manage: 'शहर जोड़ें या हटाएँ', now: 'अभी',
    ahead: (base, h) => `${base} से ${h} घंटे आगे`,
    behind: (base, h) => `${base} से ${h} घंटे पीछे`,
    yourTime: 'आपका समय',
    note: 'कार्ड का रंग बताता है कि वहाँ दिन का कौन-सा समय है — हरा कामकाजी घंटे, काला आधी रात। संदेश भेजने से पहले सिर्फ़ रंग देख लेने से पता चल जाता है कि यह ठीक समय है या नहीं। डेलाइट सेविंग अपने आप लागू हो जाती है, क्योंकि ब्राउज़र हर देश के नियम जानता है।',
  },
  'zh-hans': {
    manage: '添加或移除城市', now: '现在',
    ahead: (base, h) => `比${base}快 ${h} 小时`,
    behind: (base, h) => `比${base}慢 ${h} 小时`,
    yourTime: '首尔',
    note: '卡片的颜色代表那边正处在一天中的什么时候 —— 绿色是上班时间，黑色是半夜。联络之前只看颜色，就知道这会儿发过去合不合适。夏令时由浏览器按各国规则自动处理。',
  },
  'zh-hant': {
    manage: '新增或移除城市', now: '現在',
    ahead: (base, h) => `比${base}快 ${h} 小時`,
    behind: (base, h) => `比${base}慢 ${h} 小時`,
    yourTime: '首爾',
    note: '卡片的顏色代表那邊正處在一天中的什麼時候 —— 綠色是上班時間，黑色是半夜。聯絡之前只看顏色，就知道這會兒發過去合不合適。日光節約時間由瀏覽器按各國規則自動處理。',
  },
};

export const TIMEZONE_UI: L<{
  baseCity: string; targetCity: string; baseTime: string;
  sameDay: string; nextDay: string; prevDay: string; bothWorking: string;
  note: string;
  atIs: (city: string, t: string) => string;
  inCity: (city: string, rel: string) => string;
  offsetLabel: (sign: string, h: number) => string;
  cityTime: (city: string) => string;
  dayCompare: (n: number) => string; dstNote: string;
}> = {
  ko: {
    baseCity: '기준 도시', targetCity: '상대 도시', baseTime: '기준 시각',
    sameDay: '같은 날', nextDay: '다음 날', prevDay: '전날', bothWorking: '둘 다 업무 시간',
    note: '초록으로 겹치는 구간이 두 도시 모두 업무 시간인 때입니다. 회의를 잡을 때 그 안에서 고르면 한쪽이 새벽에 들어오는 일이 없습니다. 서머타임은 자동으로 반영됩니다.',
    atIs: (city, t) => `${city} ${t} 은`,
    inCity: (city, rel) => `${city} 기준 ${rel}`,
    offsetLabel: (sign, h) => ` · 시차 ${sign}${h}시간`,
    cityTime: city => `${city} 시각`,
    dayCompare: n => `하루 비교 — 초록 칸은 양쪽 모두 업무 시간입니다 (${n}시간)`,
    dstNote: '시차는 서머타임이 반영된 실제 값입니다. 미국·유럽은 3월과 11월 사이에 한 시간씩 당겨지므로, 한 달 뒤 회의라면 그 사이에 서머타임이 바뀌지 않는지 확인하세요.',
  },
  en: {
    baseCity: 'From', targetCity: 'To', baseTime: 'Time',
    sameDay: 'Same day', nextDay: 'Next day', prevDay: 'Previous day', bothWorking: 'Both in working hours',
    note: 'The rows highlighted green are the hours that fall inside working hours in both cities. Pick a meeting slot from those and nobody ends up joining at dawn. Daylight saving is applied automatically.',
    atIs: (city, t) => `${city} ${t} is`,
    inCity: (city, rel) => `${rel} in ${city}`,
    offsetLabel: (sign, h) => ` · offset ${sign}${h}h`,
    cityTime: city => `Time in ${city}`,
    dayCompare: n => `Full day — green rows are working hours in both (${n}h)`,
    dstNote: 'The offset shown is the real one, with daylight saving applied. The US and Europe shift by an hour between March and November, so for a meeting a month out, check that daylight saving does not change in between.',
  },
  es: {
    baseCity: 'Desde', targetCity: 'Hasta', baseTime: 'Hora',
    sameDay: 'Mismo día', nextDay: 'Día siguiente', prevDay: 'Día anterior', bothWorking: 'Las dos en horario laboral',
    note: 'Las filas resaltadas en verde son las horas que caen dentro del horario laboral en las dos ciudades. Si eliges una franja de reunión entre ellas, nadie acaba entrando al amanecer. El horario de verano se aplica solo.',
    atIs: (city, t) => `${city} ${t} es`,
    inCity: (city, rel) => `${rel} en ${city}`,
    offsetLabel: (sign, h) => ` · diferencia ${sign}${h}h`,
    cityTime: city => `Hora en ${city}`,
    dayCompare: n => `Día completo — las filas verdes son horario laboral en las dos (${n}h)`,
    dstNote: 'La diferencia mostrada es la real, con el horario de verano aplicado. Estados Unidos y Europa se desplazan una hora entre marzo y noviembre, así que para una reunión de aquí a un mes, comprueba que el horario de verano no cambie en medio.',
  },
  'pt-br': {
    baseCity: 'De', targetCity: 'Para', baseTime: 'Hora',
    sameDay: 'Mesmo dia', nextDay: 'Dia seguinte', prevDay: 'Dia anterior', bothWorking: 'As duas em horário de trabalho',
    note: 'As linhas destacadas em verde são as horas que caem dentro do horário de trabalho nas duas cidades. Escolha um horário de reunião entre elas e ninguém entra de madrugada. O horário de verão é aplicado sozinho.',
    atIs: (city, t) => `${city} ${t} é`,
    inCity: (city, rel) => `${rel} em ${city}`,
    offsetLabel: (sign, h) => ` · diferença ${sign}${h}h`,
    cityTime: city => `Hora em ${city}`,
    dayCompare: n => `Dia inteiro — as linhas verdes são horário de trabalho nas duas (${n}h)`,
    dstNote: 'A diferença mostrada é a real, com o horário de verão aplicado. Estados Unidos e Europa mudam uma hora entre março e novembro, então para uma reunião daqui a um mês, confira se o horário de verão não muda no meio.',
  },
  ja: {
    baseCity: '基準の都市', targetCity: '相手の都市', baseTime: '基準の時刻',
    sameDay: '同じ日', nextDay: '翌日', prevDay: '前日', bothWorking: 'どちらも勤務時間',
    note: '緑で重なっている帯が、両方の都市で勤務時間にあたる時間です。会議を組むときにその中から選べば、片方が未明に入ることがありません。サマータイムは自動で反映されます。',
    atIs: (city, t) => `${city}の${t}は`,
    inCity: (city, rel) => `${city}では${rel}`,
    offsetLabel: (sign, h) => ` · 時差 ${sign}${h}時間`,
    cityTime: city => `${city}の時刻`,
    dayCompare: n => `一日の比較 — 緑のマスは両方が勤務時間です（${n}時間）`,
    dstNote: '時差はサマータイムを反映した実際の値です。米国と欧州は3月から11月のあいだで1時間ずれるので、1か月後の会議ならそのあいだにサマータイムが切り替わらないか確認してください。',
  },
  de: {
    baseCity: 'Von', targetCity: 'Nach', baseTime: 'Uhrzeit',
    sameDay: 'Gleicher Tag', nextDay: 'Nächster Tag', prevDay: 'Vortag', bothWorking: 'Beide in der Arbeitszeit',
    note: 'Die grün hervorgehobenen Zeilen sind die Stunden, die in beiden Städten in die Arbeitszeit fallen. Wähl einen Termin daraus und niemand landet mitten in der Nacht in der Besprechung. Die Sommerzeit wird automatisch berücksichtigt.',
    atIs: (city, t) => `${city} ${t} ist`,
    inCity: (city, rel) => `${rel} in ${city}`,
    offsetLabel: (sign, h) => ` · Differenz ${sign}${h} Std.`,
    cityTime: city => `Zeit in ${city}`,
    dayCompare: n => `Ganzer Tag — grüne Zeilen sind in beiden Arbeitszeit (${n} Std.)`,
    dstNote: 'Die gezeigte Differenz ist die echte, mit Sommerzeit. Die USA und Europa verschieben sich zwischen März und November um eine Stunde — bei einem Termin in einem Monat prüfe also, ob dazwischen nicht die Sommerzeit wechselt.',
  },
  fr: {
    baseCity: 'De', targetCity: 'Vers', baseTime: 'Heure',
    sameDay: 'Même jour', nextDay: 'Jour suivant', prevDay: 'Jour précédent', bothWorking: 'Les deux en heures de travail',
    note: 'Les lignes surlignées en vert sont les heures qui tombent dans les heures de travail des deux villes. Choisis un créneau de réunion parmi celles-là et personne ne se connecte à l’aube. L’heure d’été est appliquée automatiquement.',
    atIs: (city, t) => `${city} ${t}, c’est`,
    inCity: (city, rel) => `${rel} à ${city}`,
    offsetLabel: (sign, h) => ` · décalage ${sign}${h}h`,
    cityTime: city => `Heure à ${city}`,
    dayCompare: n => `Journée entière — les lignes vertes sont des heures de travail des deux côtés (${n}h)`,
    dstNote: 'Le décalage affiché est le vrai, heure d’été comprise. Les États-Unis et l’Europe décalent d’une heure entre mars et novembre : pour une réunion dans un mois, vérifie que l’heure d’été ne change pas entre-temps.',
  },
  hi: {
    baseCity: 'आधार शहर', targetCity: 'दूसरा शहर', baseTime: 'आधार समय',
    sameDay: 'उसी दिन', nextDay: 'अगला दिन', prevDay: 'पिछला दिन', bothWorking: 'दोनों कामकाजी घंटों में',
    note: 'हरे रंग में उजागर पंक्तियाँ वे घंटे हैं जो दोनों शहरों के कामकाजी समय में पड़ते हैं। बैठक उनमें से चुनें तो किसी को तड़के जुड़ना नहीं पड़ेगा। डेलाइट सेविंग अपने आप लागू होती है।',
    atIs: (city, t) => `${city} का ${t} है`,
    inCity: (city, rel) => `${city} में ${rel}`,
    offsetLabel: (sign, h) => ` · अंतर ${sign}${h} घंटे`,
    cityTime: city => `${city} का समय`,
    dayCompare: n => `पूरे दिन की तुलना — हरे खाने दोनों के कामकाजी घंटे हैं (${n} घंटे)`,
    dstNote: 'दिखाया गया अंतर असली है, जिसमें डेलाइट सेविंग शामिल है। अमेरिका और यूरोप मार्च से नवंबर के बीच एक घंटा खिसकते हैं, इसलिए एक महीने बाद की बैठक हो तो देख लें कि बीच में डेलाइट सेविंग नहीं बदल रही।',
  },
  'zh-hans': {
    baseCity: '基准城市', targetCity: '对方城市', baseTime: '基准时刻',
    sameDay: '同一天', nextDay: '第二天', prevDay: '前一天', bothWorking: '双方都在上班时间',
    note: '绿色重叠的那一段，是两座城市都在上班的时间。开会时间挑在那里面，就不会有一方要在半夜爬起来。夏令时会自动算进去。',
    atIs: (city, t) => `${city} ${t} 是`,
    inCity: (city, rel) => `${city}的${rel}`,
    offsetLabel: (sign, h) => ` · 时差 ${sign}${h} 小时`,
    cityTime: city => `${city}时间`,
    dayCompare: n => `一天的对照 —— 绿格是双方都在上班的时间（${n} 小时）`,
    dstNote: '这里的时差已经把夏令时算进去了。美国和欧洲在三月到十一月之间会往前拨一小时，所以一个月后的会议，记得确认那期间夏令时会不会变。',
  },
  'zh-hant': {
    baseCity: '基準城市', targetCity: '對方城市', baseTime: '基準時刻',
    sameDay: '同一天', nextDay: '第二天', prevDay: '前一天', bothWorking: '雙方都在上班時間',
    note: '綠色重疊的那一段，是兩座城市都在上班的時間。開會時間挑在那裡面，就不會有一方要在半夜爬起來。日光節約時間會自動算進去。',
    atIs: (city, t) => `${city} ${t} 是`,
    inCity: (city, rel) => `${city}的${rel}`,
    offsetLabel: (sign, h) => ` · 時差 ${sign}${h} 小時`,
    cityTime: city => `${city}時間`,
    dayCompare: n => `一天的對照 —— 綠格是雙方都在上班的時間（${n} 小時）`,
    dstNote: '這裡的時差已經把日光節約時間算進去了。美國和歐洲在三月到十一月之間會往前撥一小時，所以一個月後的會議，記得確認那期間日光節約時間會不會變。',
  },
};

export const WORKDAYS_UI: L<{
  startDate: string; endDate: string; workdays: string; totalDays: string; weekendHoliday: string;
  addHolidays: string; nAfterTitle: string; nAfterResult: string; holidayNote: string;
  dayUnit: (n: number) => string; inclusive: string; holidayPlaceholder: string;
  holidaysApplied: (n: number) => string; nAfterNote: string;
}> = {
  ko: {
    startDate: '시작일', endDate: '종료일', workdays: '근무일', totalDays: '전체 일수', weekendHoliday: '주말·공휴일',
    addHolidays: '공휴일 빼기', nAfterTitle: '근무일 기준 n일 뒤', nAfterResult: '근무일 뒤는',
    holidayNote: '한국 공휴일은 음력과 대체공휴일 때문에 해마다 달라, 직접 넣도록 했습니다',
    dayUnit: n => `${n}일`, inclusive: '시작일과 종료일을 모두 포함해 셉니다',
    holidayPlaceholder: '2026-01-01, 2026-03-01 처럼 날짜를 적으면 근무일에서 뺍니다',
    holidaysApplied: n => `${n}개 날짜를 공휴일로 뺐습니다`,
    nAfterNote: '주말과 위에 적은 공휴일을 건너뛴 날짜입니다. 서류 처리 기한을 셀 때 씁니다.',
  },
  en: {
    startDate: 'From', endDate: 'To', workdays: 'Working days', totalDays: 'Total days', weekendHoliday: 'Weekends & holidays',
    addHolidays: 'Exclude holidays', nAfterTitle: 'Date n working days later', nAfterResult: 'working days later is',
    holidayNote: 'Public holidays differ by country and move year to year, so add the ones that apply to you.',
    dayUnit: n => `${n} days`, inclusive: 'Both the start and end dates are counted',
    holidayPlaceholder: 'Enter dates like 2026-01-01, 2026-03-01 to exclude them',
    holidaysApplied: n => `${n} date${n === 1 ? '' : 's'} excluded as holidays`,
    nAfterNote: 'Skips weekends and any holidays you listed above. Useful for counting document or filing deadlines.',
  },
  es: {
    startDate: 'Desde', endDate: 'Hasta', workdays: 'Días laborables', totalDays: 'Días totales', weekendHoliday: 'Fines de semana y festivos',
    addHolidays: 'Excluir festivos', nAfterTitle: 'Fecha n días laborables después', nAfterResult: 'días laborables después es',
    holidayNote: 'Los festivos cambian según el país y se mueven de un año a otro, así que añade los que te apliquen.',
    dayUnit: n => `${n} días`, inclusive: 'Se cuentan tanto la fecha inicial como la final',
    holidayPlaceholder: 'Escribe fechas como 2026-01-01, 2026-03-01 para excluirlas',
    holidaysApplied: n => `${n} fecha${n === 1 ? '' : 's'} excluida${n === 1 ? '' : 's'} como festivo`,
    nAfterNote: 'Salta los fines de semana y los festivos que hayas puesto arriba. Útil para contar plazos de documentos o trámites.',
  },
  'pt-br': {
    startDate: 'De', endDate: 'Até', workdays: 'Dias úteis', totalDays: 'Total de dias', weekendHoliday: 'Fins de semana e feriados',
    addHolidays: 'Excluir feriados', nAfterTitle: 'Data n dias úteis depois', nAfterResult: 'dias úteis depois é',
    holidayNote: 'Os feriados variam por país e mudam de ano para ano, então adicione os que valem para você.',
    dayUnit: n => `${n} dias`, inclusive: 'Tanto a data inicial quanto a final são contadas',
    holidayPlaceholder: 'Escreva datas como 2026-01-01, 2026-03-01 para excluir',
    holidaysApplied: n => `${n} data${n === 1 ? '' : 's'} excluída${n === 1 ? '' : 's'} como feriado`,
    nAfterNote: 'Pula os fins de semana e os feriados que você listou acima. Útil para contar prazos de documentos ou processos.',
  },
  ja: {
    startDate: '開始日', endDate: '終了日', workdays: '営業日', totalDays: '総日数', weekendHoliday: '土日・祝日',
    addHolidays: '祝日を除く', nAfterTitle: '営業日でn日後', nAfterResult: '営業日後は',
    holidayNote: '祝日は国ごとに違い、年によっても動くので、自分に当てはまるものを入れてください。',
    dayUnit: n => `${n}日`, inclusive: '開始日と終了日の両方を含めて数えます',
    holidayPlaceholder: '2026-01-01, 2026-03-01 のように日付を書くと営業日から除きます',
    holidaysApplied: n => `${n}件の日付を祝日として除きました`,
    nAfterNote: '土日と上に書いた祝日を飛ばした日付です。書類の提出期限を数えるときに使います。',
  },
  de: {
    startDate: 'Von', endDate: 'Bis', workdays: 'Arbeitstage', totalDays: 'Tage gesamt', weekendHoliday: 'Wochenenden und Feiertage',
    addHolidays: 'Feiertage ausnehmen', nAfterTitle: 'Datum n Arbeitstage später', nAfterResult: 'Arbeitstage später ist',
    holidayNote: 'Feiertage unterscheiden sich je Land und verschieben sich von Jahr zu Jahr — trag die ein, die für dich gelten.',
    dayUnit: n => `${n} Tage`, inclusive: 'Anfangs- und Enddatum werden beide gezählt',
    holidayPlaceholder: 'Gib Daten wie 2026-01-01, 2026-03-01 ein, um sie auszunehmen',
    holidaysApplied: n => `${n} Datum${n === 1 ? '' : 'sangaben'} als Feiertag ausgenommen`,
    nAfterNote: 'Überspringt Wochenenden und alle oben eingetragenen Feiertage. Nützlich, um Fristen für Unterlagen zu zählen.',
  },
  fr: {
    startDate: 'Du', endDate: 'Au', workdays: 'Jours ouvrés', totalDays: 'Jours au total', weekendHoliday: 'Week-ends et fériés',
    addHolidays: 'Exclure les fériés', nAfterTitle: 'Date n jours ouvrés plus tard', nAfterResult: 'jours ouvrés plus tard, c’est',
    holidayNote: 'Les jours fériés diffèrent selon le pays et bougent d’une année à l’autre : ajoute ceux qui te concernent.',
    dayUnit: n => `${n} jours`, inclusive: 'La date de début et celle de fin sont toutes deux comptées',
    holidayPlaceholder: 'Saisis des dates comme 2026-01-01, 2026-03-01 pour les exclure',
    holidaysApplied: n => `${n} date${n === 1 ? '' : 's'} exclue${n === 1 ? '' : 's'} comme férié`,
    nAfterNote: 'Saute les week-ends et les fériés que tu as listés ci-dessus. Utile pour compter des délais de dossier ou de dépôt.',
  },
  hi: {
    startDate: 'शुरू तारीख़', endDate: 'अंतिम तारीख़', workdays: 'कार्यदिवस', totalDays: 'कुल दिन', weekendHoliday: 'सप्ताहांत और छुट्टियाँ',
    addHolidays: 'छुट्टियाँ हटाएँ', nAfterTitle: 'n कार्यदिवस बाद की तारीख़', nAfterResult: 'कार्यदिवस बाद है',
    holidayNote: 'छुट्टियाँ हर देश में अलग होती हैं और साल-दर-साल बदलती हैं, इसलिए जो आप पर लागू हों वही डालें।',
    dayUnit: n => `${n} दिन`, inclusive: 'शुरू और अंतिम दोनों तारीख़ें गिनी जाती हैं',
    holidayPlaceholder: '2026-01-01, 2026-03-01 जैसी तारीख़ें लिखें तो वे हटा दी जाएँगी',
    holidaysApplied: n => `${n} तारीख़ें छुट्टी मानकर हटाई गईं`,
    nAfterNote: 'सप्ताहांत और ऊपर लिखी छुट्टियाँ छोड़कर निकली तारीख़ है। काग़ज़ात की समय-सीमा गिनने में काम आता है।',
  },
  'zh-hans': {
    startDate: '开始日', endDate: '结束日', workdays: '工作日', totalDays: '总天数', weekendHoliday: '周末与节假日',
    addHolidays: '扣掉节假日', nAfterTitle: '按工作日算的 n 天后', nAfterResult: '个工作日之后是',
    holidayNote: '韩国的节假日因为农历和补休制度每年都不一样，所以做成手动填写',
    dayUnit: n => `${n} 天`, inclusive: '开始日和结束日都算在内',
    holidayPlaceholder: '照 2026-01-01, 2026-03-01 这样写上日期，就会从工作日里扣掉',
    holidaysApplied: n => `已按节假日扣掉 ${n} 个日期`,
    nAfterNote: '这是跳过周末和你上面填的节假日之后的日期。用来数公文办理的期限。',
  },
  'zh-hant': {
    startDate: '開始日', endDate: '結束日', workdays: '工作日', totalDays: '總天數', weekendHoliday: '週末與國定假日',
    addHolidays: '扣掉國定假日', nAfterTitle: '按工作日算的 n 天後', nAfterResult: '個工作日之後是',
    holidayNote: '韓國的國定假日因為農曆和補假制度每年都不一樣，所以做成手動填寫',
    dayUnit: n => `${n} 天`, inclusive: '開始日和結束日都算在內',
    holidayPlaceholder: '照 2026-01-01, 2026-03-01 這樣寫上日期，就會從工作日裡扣掉',
    holidaysApplied: n => `已按國定假日扣掉 ${n} 個日期`,
    nAfterNote: '這是跳過週末和你上面填的國定假日之後的日期。用來數公文辦理的期限。',
  },
};

export const DATEADD_UI: L<{
  baseDate: string; result: string; weekday: string; diffDays: string; diffWeeks: string;
  day: string; week: string; month: string; year: string;
  negativeNote: string; monthEndTitle: string; monthEndBody: string;
  presets: [string, string, string, string];
  gapAfter: (n: number) => string; gapBefore: (n: number) => string;
  weekUnit: (n: number) => string; locale: string;
}> = {
  ko: {
    baseDate: '기준 날짜', result: '결과', weekday: '요일', diffDays: '차이(일)', diffWeeks: '차이(주)',
    day: '일', week: '주', month: '개월', year: '년',
    negativeNote: '음수를 넣으면 과거로 계산합니다',
    monthEndTitle: '월말은 이렇게 처리합니다',
    monthEndBody: '1월 31일에 1개월을 더하면 2월 28일(윤년이면 29일)이 됩니다. 없는 날짜로 넘어가지 않도록 그 달의 마지막 날로 맞춥니다.',
    presets: ['100일 뒤', '1년 뒤', '2주 뒤', '30일 전'],
    gapAfter: n => `기준일에서 ${n}일 뒤`, gapBefore: n => `기준일에서 ${n}일 전`,
    weekUnit: n => `${n}주`, locale: 'ko-KR',
  },
  en: {
    baseDate: 'From date', result: 'Result', weekday: 'Weekday', diffDays: 'Difference (days)', diffWeeks: 'Difference (weeks)',
    day: 'Days', week: 'Weeks', month: 'Months', year: 'Years',
    negativeNote: 'Enter a negative number to go backwards',
    monthEndTitle: 'How month-end is handled',
    monthEndBody: '31 January plus one month gives 28 February (29 in a leap year). Rather than rolling over into a date that does not exist, it clamps to the last day of that month.',
    presets: ['100 days later', '1 year later', '2 weeks later', '30 days earlier'],
    gapAfter: n => `${n} days after the base date`, gapBefore: n => `${n} days before the base date`,
    weekUnit: n => `${n} weeks`, locale: 'en-US',
  },
  es: {
    baseDate: 'Fecha base', result: 'Resultado', weekday: 'Día de la semana', diffDays: 'Diferencia (días)', diffWeeks: 'Diferencia (semanas)',
    day: 'Días', week: 'Semanas', month: 'Meses', year: 'Años',
    negativeNote: 'Pon un número negativo para ir hacia atrás',
    monthEndTitle: 'Así se trata el final de mes',
    monthEndBody: 'El 31 de enero más un mes da el 28 de febrero (29 en año bisiesto). En lugar de pasar a una fecha que no existe, se ajusta al último día de ese mes.',
    presets: ['100 días después', '1 año después', '2 semanas después', '30 días antes'],
    gapAfter: n => `${n} días después de la fecha base`, gapBefore: n => `${n} días antes de la fecha base`,
    weekUnit: n => `${n} semanas`, locale: 'es-ES',
  },
  'pt-br': {
    baseDate: 'Data base', result: 'Resultado', weekday: 'Dia da semana', diffDays: 'Diferença (dias)', diffWeeks: 'Diferença (semanas)',
    day: 'Dias', week: 'Semanas', month: 'Meses', year: 'Anos',
    negativeNote: 'Coloque um número negativo para ir para trás',
    monthEndTitle: 'Como o fim de mês é tratado',
    monthEndBody: '31 de janeiro mais um mês dá 28 de fevereiro (29 em ano bissexto). Em vez de passar para uma data que não existe, ele ajusta para o último dia daquele mês.',
    presets: ['100 dias depois', '1 ano depois', '2 semanas depois', '30 dias antes'],
    gapAfter: n => `${n} dias depois da data base`, gapBefore: n => `${n} dias antes da data base`,
    weekUnit: n => `${n} semanas`, locale: 'pt-BR',
  },
  ja: {
    baseDate: '基準の日付', result: '結果', weekday: '曜日', diffDays: '差（日）', diffWeeks: '差（週）',
    day: '日', week: '週', month: 'か月', year: '年',
    negativeNote: 'マイナスを入れると過去に向かって計算します',
    monthEndTitle: '月末はこう処理します',
    monthEndBody: '1月31日に1か月を足すと2月28日（うるう年なら29日）になります。存在しない日付に飛ばないよう、その月の最後の日に合わせます。',
    presets: ['100日後', '1年後', '2週間後', '30日前'],
    gapAfter: n => `基準日から${n}日後`, gapBefore: n => `基準日から${n}日前`,
    weekUnit: n => `${n}週`, locale: 'ja-JP',
  },
  de: {
    baseDate: 'Ausgangsdatum', result: 'Ergebnis', weekday: 'Wochentag', diffDays: 'Differenz (Tage)', diffWeeks: 'Differenz (Wochen)',
    day: 'Tage', week: 'Wochen', month: 'Monate', year: 'Jahre',
    negativeNote: 'Gib eine negative Zahl ein, um zurückzurechnen',
    monthEndTitle: 'So wird das Monatsende behandelt',
    monthEndBody: 'Der 31. Januar plus ein Monat ergibt den 28. Februar (29. im Schaltjahr). Statt in ein Datum zu rutschen, das es nicht gibt, wird auf den letzten Tag dieses Monats begrenzt.',
    presets: ['100 Tage später', '1 Jahr später', '2 Wochen später', '30 Tage früher'],
    gapAfter: n => `${n} Tage nach dem Ausgangsdatum`, gapBefore: n => `${n} Tage vor dem Ausgangsdatum`,
    weekUnit: n => `${n} Wochen`, locale: 'de-DE',
  },
  fr: {
    baseDate: 'Date de départ', result: 'Résultat', weekday: 'Jour de la semaine', diffDays: 'Écart (jours)', diffWeeks: 'Écart (semaines)',
    day: 'Jours', week: 'Semaines', month: 'Mois', year: 'Années',
    negativeNote: 'Saisis un nombre négatif pour aller en arrière',
    monthEndTitle: 'Comment la fin de mois est gérée',
    monthEndBody: 'Le 31 janvier plus un mois donne le 28 février (29 en année bissextile). Plutôt que de basculer sur une date qui n’existe pas, on se cale sur le dernier jour de ce mois.',
    presets: ['100 jours plus tard', '1 an plus tard', '2 semaines plus tard', '30 jours plus tôt'],
    gapAfter: n => `${n} jours après la date de départ`, gapBefore: n => `${n} jours avant la date de départ`,
    weekUnit: n => `${n} semaines`, locale: 'fr-FR',
  },
  hi: {
    baseDate: 'आधार तारीख़', result: 'नतीजा', weekday: 'दिन', diffDays: 'अंतर (दिन)', diffWeeks: 'अंतर (सप्ताह)',
    day: 'दिन', week: 'सप्ताह', month: 'महीने', year: 'साल',
    negativeNote: 'ऋणात्मक अंक डालें तो पीछे की ओर गिना जाता है',
    monthEndTitle: 'महीने का अंत ऐसे संभाला जाता है',
    monthEndBody: '31 जनवरी में एक महीना जोड़ें तो 28 फ़रवरी (लीप वर्ष में 29) आता है। जो तारीख़ मौजूद नहीं उस पर फिसलने के बजाय उस महीने के आख़िरी दिन पर रोक दिया जाता है।',
    presets: ['100 दिन बाद', '1 साल बाद', '2 सप्ताह बाद', '30 दिन पहले'],
    gapAfter: n => `आधार तारीख़ से ${n} दिन बाद`, gapBefore: n => `आधार तारीख़ से ${n} दिन पहले`,
    weekUnit: n => `${n} सप्ताह`, locale: 'hi-IN',
  },
  'zh-hans': {
    baseDate: '基准日期', result: '结果', weekday: '星期', diffDays: '相差（天）', diffWeeks: '相差（周）',
    day: '天', week: '周', month: '个月', year: '年',
    negativeNote: '填负数就往过去算',
    monthEndTitle: '月底是这么处理的',
    monthEndBody: '1 月 31 日加一个月，得到的是 2 月 28 日（闰年则是 29 日）。为了不跑到不存在的日期上，会对齐到那个月的最后一天。',
    presets: ['100 天后', '1 年后', '2 周后', '30 天前'],
    gapAfter: n => `距基准日 ${n} 天后`, gapBefore: n => `距基准日 ${n} 天前`,
    weekUnit: n => `${n} 周`, locale: 'zh-CN',
  },
  'zh-hant': {
    baseDate: '基準日期', result: '結果', weekday: '星期', diffDays: '相差（天）', diffWeeks: '相差（週）',
    day: '天', week: '週', month: '個月', year: '年',
    negativeNote: '填負數就往過去算',
    monthEndTitle: '月底是這麼處理的',
    monthEndBody: '1 月 31 日加一個月，得到的是 2 月 28 日（閏年則是 29 日）。為了不跑到不存在的日期上，會對齊到那個月的最後一天。',
    presets: ['100 天後', '1 年後', '2 週後', '30 天前'],
    gapAfter: n => `距基準日 ${n} 天後`, gapBefore: n => `距基準日 ${n} 天前`,
    weekUnit: n => `${n} 週`, locale: 'zh-TW',
  },
};

export const WEEKNUMBER_UI: L<{
  date: string; week: string; quarter: string; dayOfYear: string; daysLeft: string;
  progress: string; rangeTitle: string; isoNote: string; prevYearNote: string;
  weekBig: (w: number) => string; yearQuarter: (y: number, q: number) => string;
  doyValue: (d: number) => string; daysValue: (d: number) => string; isoBody: string;
}> = {
  ko: {
    date: '날짜', week: '주차', quarter: '분기', dayOfYear: '연중 일수', daysLeft: '올해 남은 날',
    progress: '올해 진행률', rangeTitle: '이 주는 언제부터 언제까지',
    isoNote: 'ISO 8601 기준입니다 — 목요일이 포함된 주를 그 해의 첫 주로 봅니다.',
    prevYearNote: '전년도 마지막 주차',
    weekBig: w => `${w}주차`, yearQuarter: (y, q) => `${y}년 · ${q}분기`,
    doyValue: d => `${d}일째`, daysValue: d => `${d}일`,
    isoBody: '주는 월요일에 시작하고, 그 주의 목요일이 속한 해를 기준으로 몇 년 몇 주차인지 정합니다. 그래서 1월 1일이 금·토·일이면 전년도 마지막 주차가 됩니다. 회사에서 주차로 일정을 관리한다면 대개 이 기준을 씁니다.',
  },
  en: {
    date: 'Date', week: 'Week', quarter: 'Quarter', dayOfYear: 'Day of year', daysLeft: 'Days left this year',
    progress: 'Year progress', rangeTitle: 'This week runs from',
    isoNote: 'Uses ISO 8601 — the week containing the first Thursday is week one.',
    prevYearNote: 'Last week of the previous year',
    weekBig: w => `Week ${w}`, yearQuarter: (y, q) => `${y} · Q${q}`,
    doyValue: d => `day ${d}`, daysValue: d => `${d} days`,
    isoBody: 'Weeks start on Monday, and the year a week belongs to is decided by which year its Thursday falls in. That means when 1 January lands on a Friday, Saturday or Sunday, it belongs to the last week of the previous year. Most companies that schedule by week number use this convention.',
  },
  es: {
    date: 'Fecha', week: 'Semana', quarter: 'Trimestre', dayOfYear: 'Día del año', daysLeft: 'Días que quedan este año',
    progress: 'Avance del año', rangeTitle: 'Esta semana va de',
    isoNote: 'Sigue la ISO 8601 — la semana que contiene el primer jueves es la semana uno.',
    prevYearNote: 'Última semana del año anterior',
    weekBig: w => `Semana ${w}`, yearQuarter: (y, q) => `${y} · T${q}`,
    doyValue: d => `día ${d}`, daysValue: d => `${d} días`,
    isoBody: 'Las semanas empiezan en lunes, y el año al que pertenece una semana lo decide en qué año cae su jueves. Eso significa que cuando el 1 de enero cae en viernes, sábado o domingo, pertenece a la última semana del año anterior. La mayoría de las empresas que planifican por número de semana usan esta convención.',
  },
  'pt-br': {
    date: 'Data', week: 'Semana', quarter: 'Trimestre', dayOfYear: 'Dia do ano', daysLeft: 'Dias que faltam neste ano',
    progress: 'Progresso do ano', rangeTitle: 'Esta semana vai de',
    isoNote: 'Segue a ISO 8601 — a semana que contém a primeira quinta-feira é a semana um.',
    prevYearNote: 'Última semana do ano anterior',
    weekBig: w => `Semana ${w}`, yearQuarter: (y, q) => `${y} · T${q}`,
    doyValue: d => `dia ${d}`, daysValue: d => `${d} dias`,
    isoBody: 'As semanas começam na segunda-feira, e o ano a que uma semana pertence é decidido pelo ano em que cai a sua quinta-feira. Isso quer dizer que, quando 1º de janeiro cai numa sexta, sábado ou domingo, ele pertence à última semana do ano anterior. A maioria das empresas que planeja por número de semana usa essa convenção.',
  },
  ja: {
    date: '日付', week: '週', quarter: '四半期', dayOfYear: '年内の日数', daysLeft: '今年の残り日数',
    progress: '今年の進み具合', rangeTitle: 'この週はいつからいつまで',
    isoNote: 'ISO 8601に従います — 最初の木曜日を含む週をその年の第1週とします。',
    prevYearNote: '前年の最終週',
    weekBig: w => `第${w}週`, yearQuarter: (y, q) => `${y}年 · 第${q}四半期`,
    doyValue: d => `${d}日目`, daysValue: d => `${d}日`,
    isoBody: '週は月曜に始まり、その週の木曜がどの年に入るかで何年の第何週かを決めます。そのため1月1日が金・土・日にあたると、前年の最終週になります。会社で週番号で日程を管理している場合、たいていこの基準を使っています。',
  },
  de: {
    date: 'Datum', week: 'Kalenderwoche', quarter: 'Quartal', dayOfYear: 'Tag im Jahr', daysLeft: 'Verbleibende Tage dieses Jahr',
    progress: 'Jahresfortschritt', rangeTitle: 'Diese Woche läuft von',
    isoNote: 'Nach ISO 8601 — die Woche mit dem ersten Donnerstag ist Woche eins.',
    prevYearNote: 'Letzte Woche des Vorjahres',
    weekBig: w => `KW ${w}`, yearQuarter: (y, q) => `${y} · Q${q}`,
    doyValue: d => `Tag ${d}`, daysValue: d => `${d} Tage`,
    isoBody: 'Wochen beginnen am Montag, und zu welchem Jahr eine Woche gehört, entscheidet sich daran, in welches Jahr ihr Donnerstag fällt. Fällt der 1. Januar also auf einen Freitag, Samstag oder Sonntag, gehört er zur letzten Woche des Vorjahres. Die meisten Firmen, die nach Kalenderwoche planen, rechnen so.',
  },
  fr: {
    date: 'Date', week: 'Semaine', quarter: 'Trimestre', dayOfYear: 'Jour de l’année', daysLeft: 'Jours restants cette année',
    progress: 'Avancement de l’année', rangeTitle: 'Cette semaine va du',
    isoNote: 'Selon l’ISO 8601 — la semaine contenant le premier jeudi est la semaine un.',
    prevYearNote: 'Dernière semaine de l’année précédente',
    weekBig: w => `Semaine ${w}`, yearQuarter: (y, q) => `${y} · T${q}`,
    doyValue: d => `jour ${d}`, daysValue: d => `${d} jours`,
    isoBody: 'Les semaines commencent le lundi, et l’année à laquelle appartient une semaine se décide selon l’année où tombe son jeudi. Autrement dit, quand le 1er janvier tombe un vendredi, un samedi ou un dimanche, il appartient à la dernière semaine de l’année précédente. La plupart des entreprises qui planifient par numéro de semaine suivent cette convention.',
  },
  hi: {
    date: 'तारीख़', week: 'सप्ताह', quarter: 'तिमाही', dayOfYear: 'साल का दिन', daysLeft: 'इस साल बचे दिन',
    progress: 'साल की प्रगति', rangeTitle: 'यह सप्ताह कब से कब तक',
    isoNote: 'ISO 8601 के अनुसार — जिस सप्ताह में पहला गुरुवार पड़ता है वह पहला सप्ताह है।',
    prevYearNote: 'पिछले साल का आख़िरी सप्ताह',
    weekBig: w => `सप्ताह ${w}`, yearQuarter: (y, q) => `${y} · तिमाही ${q}`,
    doyValue: d => `${d}वाँ दिन`, daysValue: d => `${d} दिन`,
    isoBody: 'सप्ताह सोमवार से शुरू होता है, और कोई सप्ताह किस साल का है यह उसके गुरुवार से तय होता है। इसलिए 1 जनवरी शुक्र, शनि या रविवार को पड़े तो वह पिछले साल का आख़िरी सप्ताह बन जाता है। जो कंपनियाँ सप्ताह संख्या से योजना बनाती हैं, वे आम तौर पर यही मानक इस्तेमाल करती हैं।',
  },
  'zh-hans': {
    date: '日期', week: '第几周', quarter: '季度', dayOfYear: '年内第几天', daysLeft: '今年还剩',
    progress: '今年的进度', rangeTitle: '这一周从哪天到哪天',
    isoNote: '按 ISO 8601 计算 —— 含有星期四的那一周算作当年的第一周。',
    prevYearNote: '上一年的最后一周',
    weekBig: w => `第 ${w} 周`, yearQuarter: (y, q) => `${y} 年 · 第 ${q} 季度`,
    doyValue: d => `第 ${d} 天`, daysValue: d => `${d} 天`,
    isoBody: '一周从星期一开始，那一周的星期四落在哪一年，就按那一年来数第几周。所以 1 月 1 日要是碰上周五、周六或周日，它就归到上一年的最后一周。公司里用周次排进度的话，多半用的就是这套。',
  },
  'zh-hant': {
    date: '日期', week: '第幾週', quarter: '季', dayOfYear: '年內第幾天', daysLeft: '今年還剩',
    progress: '今年的進度', rangeTitle: '這一週從哪天到哪天',
    isoNote: '按 ISO 8601 計算 —— 含有星期四的那一週算作當年的第一週。',
    prevYearNote: '上一年的最後一週',
    weekBig: w => `第 ${w} 週`, yearQuarter: (y, q) => `${y} 年 · 第 ${q} 季`,
    doyValue: d => `第 ${d} 天`, daysValue: d => `${d} 天`,
    isoBody: '一週從星期一開始，那一週的星期四落在哪一年，就按那一年來數第幾週。所以 1 月 1 日要是碰上週五、週六或週日，它就歸到上一年的最後一週。公司裡用週次排進度的話，多半用的就是這套。',
  },
};

export const LIVED_UI: L<{
  birth: string; livedFor: string; milestones: string;
  week: string; hour: string; minute: string; second: string;
  computing: string; futureError: string;
  ymd: (y: number, m: number, d: number) => string; totalToday: (n: string) => string;
  milestoneLine: (n: string, date: string) => string; milestoneLeft: (n: number) => string;
  beatsNote: (beats: string, sleepDays: string) => string; locale: string;
}> = {
  ko: {
    birth: '생년월일', livedFor: '태어난 지', milestones: '다가오는 기념일',
    week: '주', hour: '시간', minute: '분', second: '초',
    computing: '계산 준비 중…', futureError: '오늘보다 앞선 날짜를 넣어 주세요',
    ymd: (y, m, d) => `${y}년 ${m}개월 ${d}일`, totalToday: n => `오늘로 ${n}일째`,
    milestoneLine: (n, date) => `${n}일 — ${date}`, milestoneLeft: n => `${n}일 남았습니다`,
    beatsNote: (beats, sleepDays) => `그동안 심장은 대략 ${beats}백만 번 뛰었습니다 (안정 시 70회/분으로 계산한 어림값입니다). 잠으로 보낸 시간은 하루 7시간이라면 약 ${sleepDays}일쯤 됩니다.`,
    locale: 'ko-KR',
  },
  en: {
    birth: 'Date of birth', livedFor: 'You have been alive for', milestones: 'Upcoming milestones',
    week: 'Weeks', hour: 'Hours', minute: 'Minutes', second: 'Seconds',
    computing: 'Calculating…', futureError: 'Please enter a date in the past',
    ymd: (y, m, d) => `${y} years ${m} months ${d} days`, totalToday: n => `${n} days as of today`,
    milestoneLine: (n, date) => `${n} days — ${date}`, milestoneLeft: n => `${n} days to go`,
    beatsNote: (beats, sleepDays) => `Your heart has beaten roughly ${beats} million times (a rough figure at 70 beats per minute at rest). At seven hours a night, you have spent about ${sleepDays} days asleep.`,
    locale: 'en-US',
  },
  es: {
    birth: 'Fecha de nacimiento', livedFor: 'Llevas vivo', milestones: 'Próximos hitos',
    week: 'Semanas', hour: 'Horas', minute: 'Minutos', second: 'Segundos',
    computing: 'Calculando…', futureError: 'Pon una fecha anterior a hoy',
    ymd: (y, m, d) => `${y} años ${m} meses ${d} días`, totalToday: n => `${n} días a día de hoy`,
    milestoneLine: (n, date) => `${n} días — ${date}`, milestoneLeft: n => `faltan ${n} días`,
    beatsNote: (beats, sleepDays) => `Tu corazón ha latido unos ${beats} millones de veces (una cifra aproximada a 70 latidos por minuto en reposo). A siete horas por noche, has pasado unos ${sleepDays} días durmiendo.`,
    locale: 'es-ES',
  },
  'pt-br': {
    birth: 'Data de nascimento', livedFor: 'Você está vivo há', milestones: 'Próximos marcos',
    week: 'Semanas', hour: 'Horas', minute: 'Minutos', second: 'Segundos',
    computing: 'Calculando…', futureError: 'Coloque uma data anterior a hoje',
    ymd: (y, m, d) => `${y} anos ${m} meses ${d} dias`, totalToday: n => `${n} dias até hoje`,
    milestoneLine: (n, date) => `${n} dias — ${date}`, milestoneLeft: n => `faltam ${n} dias`,
    beatsNote: (beats, sleepDays) => `Seu coração bateu cerca de ${beats} milhões de vezes (um número aproximado a 70 batidas por minuto em repouso). A sete horas por noite, você passou uns ${sleepDays} dias dormindo.`,
    locale: 'pt-BR',
  },
  ja: {
    birth: '生年月日', livedFor: '生まれてから', milestones: '近づいている節目',
    week: '週', hour: '時間', minute: '分', second: '秒',
    computing: '計算の準備中…', futureError: '今日より前の日付を入れてください',
    ymd: (y, m, d) => `${y}年 ${m}か月 ${d}日`, totalToday: n => `今日で${n}日目`,
    milestoneLine: (n, date) => `${n}日 — ${date}`, milestoneLeft: n => `あと${n}日`,
    beatsNote: (beats, sleepDays) => `そのあいだ心臓はおよそ${beats}百万回打ちました（安静時70回/分で計算したおおよその値です）。眠って過ごした時間は1日7時間として約${sleepDays}日ほどになります。`,
    locale: 'ja-JP',
  },
  de: {
    birth: 'Geburtsdatum', livedFor: 'Du lebst seit', milestones: 'Kommende Meilensteine',
    week: 'Wochen', hour: 'Stunden', minute: 'Minuten', second: 'Sekunden',
    computing: 'Wird berechnet…', futureError: 'Bitte gib ein Datum in der Vergangenheit ein',
    ymd: (y, m, d) => `${y} Jahre ${m} Monate ${d} Tage`, totalToday: n => `${n} Tage bis heute`,
    milestoneLine: (n, date) => `${n} Tage — ${date}`, milestoneLeft: n => `noch ${n} Tage`,
    beatsNote: (beats, sleepDays) => `Dein Herz hat etwa ${beats} Millionen Mal geschlagen (ein Näherungswert bei 70 Schlägen pro Minute in Ruhe). Bei sieben Stunden pro Nacht hast du rund ${sleepDays} Tage geschlafen.`,
    locale: 'de-DE',
  },
  fr: {
    birth: 'Date de naissance', livedFor: 'Tu vis depuis', milestones: 'Prochains paliers',
    week: 'Semaines', hour: 'Heures', minute: 'Minutes', second: 'Secondes',
    computing: 'Calcul en cours…', futureError: 'Saisis une date antérieure à aujourd’hui',
    ymd: (y, m, d) => `${y} ans ${m} mois ${d} jours`, totalToday: n => `${n} jours à ce jour`,
    milestoneLine: (n, date) => `${n} jours — ${date}`, milestoneLeft: n => `encore ${n} jours`,
    beatsNote: (beats, sleepDays) => `Ton cœur a battu environ ${beats} millions de fois (un ordre de grandeur à 70 battements par minute au repos). À sept heures par nuit, tu as passé à peu près ${sleepDays} jours à dormir.`,
    locale: 'fr-FR',
  },
  hi: {
    birth: 'जन्मतिथि', livedFor: 'आप जी रहे हैं', milestones: 'आने वाले पड़ाव',
    week: 'सप्ताह', hour: 'घंटे', minute: 'मिनट', second: 'सेकंड',
    computing: 'गिना जा रहा है…', futureError: 'आज से पहले की तारीख़ डालें',
    ymd: (y, m, d) => `${y} साल ${m} महीने ${d} दिन`, totalToday: n => `आज तक ${n} दिन`,
    milestoneLine: (n, date) => `${n} दिन — ${date}`, milestoneLeft: n => `${n} दिन बाकी`,
    beatsNote: (beats, sleepDays) => `इस बीच आपका दिल लगभग ${beats} लाख बार धड़का (आराम की स्थिति में 70 धड़कन प्रति मिनट मानकर निकाला मोटा अंदाज़ा)। रात के सात घंटे मानें तो आपने करीब ${sleepDays} दिन सोकर बिताए।`,
    locale: 'hi-IN',
  },
  'zh-hans': {
    birth: '出生日期', livedFor: '已经活了', milestones: '快到的纪念日',
    week: '周', hour: '小时', minute: '分', second: '秒',
    computing: '正在准备计算…', futureError: '请填一个不晚于今天的日期',
    ymd: (y, m, d) => `${y} 年 ${m} 个月 ${d} 天`, totalToday: n => `到今天是第 ${n} 天`,
    milestoneLine: (n, date) => `第 ${n} 天 — ${date}`, milestoneLeft: n => `还有 ${n} 天`,
    beatsNote: (beats, sleepDays) => `这段时间里，心脏大约跳了 ${beats} 百万次（按静息 70 次/分粗估）。要是每天睡 7 小时，睡掉的时间加起来约有 ${sleepDays} 天。`,
    locale: 'zh-CN',
  },
  'zh-hant': {
    birth: '出生日期', livedFor: '已經活了', milestones: '快到的紀念日',
    week: '週', hour: '小時', minute: '分', second: '秒',
    computing: '正在準備計算…', futureError: '請填一個不晚於今天的日期',
    ymd: (y, m, d) => `${y} 年 ${m} 個月 ${d} 天`, totalToday: n => `到今天是第 ${n} 天`,
    milestoneLine: (n, date) => `第 ${n} 天 — ${date}`, milestoneLeft: n => `還有 ${n} 天`,
    beatsNote: (beats, sleepDays) => `這段時間裡，心臟大約跳了 ${beats} 百萬次（按靜息 70 次/分粗估）。要是每天睡 7 小時，睡掉的時間加起來約有 ${sleepDays} 天。`,
    locale: 'zh-TW',
  },
};
