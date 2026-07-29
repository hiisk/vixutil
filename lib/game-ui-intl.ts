/**
 * 게임 화면 문구의 세 언어 사전.
 *
 * 점수·판정 로직은 한국어 구현을 그대로 쓴다. 등급 문구만 언어별로 갈린다.
 *
 * 타자 게임은 예외적으로 데이터까지 갈린다 — 한국어 문장을 영어권 사용자에게
 * 치라고 할 수는 없고, 재는 단위도 다르다(타/분 vs WPM vs 字/分).
 */
export type GameLang = 'ko' | 'en' | 'zh';

/** 열 게임이 공통으로 쓰는 라벨 */
export const GAME_COMMON: Record<GameLang, {
  start: string; retry: string; running: string; again: string; fromStart: string;
  best: string; level: string; accuracy: string; secLeft: (s: string) => string;
}> = {
  ko: {
    start: '시작하기', retry: '다시 도전', running: '진행 중…', again: '다시 하기', fromStart: '처음부터 다시',
    best: '최고 기록', level: '단계', accuracy: '정확도', secLeft: s => `${s}초 남음`,
  },
  en: {
    start: 'Start', retry: 'Try again', running: 'Running…', again: 'Go again', fromStart: 'Start over',
    best: 'Best', level: 'Level', accuracy: 'Accuracy', secLeft: s => `${s}s left`,
  },
  zh: {
    start: '开始', retry: '再挑战', running: '进行中…', again: '再来一次', fromStart: '重新开始',
    best: '最高记录', level: '关卡', accuracy: '正确率', secLeft: s => `剩余 ${s} 秒`,
  },
};

export const REACTION_UI: Record<GameLang, {
  idleTitle: string; idleSub: string; waitTitle: string; waitSub: string; nowTitle: string;
  resultSub: string; roundSub: (n: number, total: number) => string;
  earlyTitle: string; earlySub: string;
  thisRound: string; avgOf: (n: number) => string; fastest: string;
  gradeTop: (ms: number) => string; gradeFast: (ms: number) => string;
  gradeNormal: (ms: number) => string; gradeSlow: (ms: number) => string;
  noteTitle: string; note: string;
}> = {
  ko: {
    idleTitle: '준비되면 누르세요', idleSub: '초록으로 바뀌는 순간 다시 누르면 됩니다',
    waitTitle: '기다리세요…', waitSub: '초록이 되기 전에 누르면 무효입니다',
    nowTitle: '지금!',
    resultSub: '아래에서 결과를 확인하세요', roundSub: (n, total) => `${n}/${total}회 — 눌러서 계속`,
    earlyTitle: '너무 빨랐습니다', earlySub: '초록이 된 뒤에 누르세요 — 눌러서 다시',
    thisRound: '이번 기록', avgOf: n => `평균 (${n}회)`, fastest: '가장 빠름',
    gradeTop: ms => `평균 ${ms}ms — 상위권입니다`,
    gradeFast: ms => `평균 ${ms}ms — 평균보다 빠릅니다`,
    gradeNormal: ms => `평균 ${ms}ms — 보통입니다`,
    gradeSlow: ms => `평균 ${ms}ms — 조금 느립니다. 화면을 응시하고 다시 해보세요`,
    noteTitle: '사람의 반응속도는',
    note: '빛을 보고 반응하는 데는 보통 200~250ms가 걸립니다. 눈이 신호를 받아 뇌가 판단하고 손가락까지 명령이 가는 시간이라, 아무리 연습해도 100ms 아래로는 내려가기 어렵습니다. 화면 주사율과 마우스 지연도 20~30ms쯤 더해집니다.',
  },
  en: {
    idleTitle: 'Click when you are ready', idleSub: 'Then click again the moment it turns green',
    waitTitle: 'Wait…', waitSub: 'Clicking before green does not count',
    nowTitle: 'Now!',
    resultSub: 'See your results below', roundSub: (n, total) => `${n}/${total} — click to continue`,
    earlyTitle: 'Too early', earlySub: 'Wait for green — click to try again',
    thisRound: 'This round', avgOf: n => `Average (${n})`, fastest: 'Fastest',
    gradeTop: ms => `${ms}ms average — that is up there`,
    gradeFast: ms => `${ms}ms average — faster than most`,
    gradeNormal: ms => `${ms}ms average — about typical`,
    gradeSlow: ms => `${ms}ms average — a little slow. Keep your eyes on the screen and try again`,
    noteTitle: 'About human reaction time',
    note: 'Reacting to light usually takes 200–250ms. That is the eye receiving the signal, the brain deciding, and the command reaching your finger — which is why practice rarely gets anyone below 100ms. Your screen refresh rate and mouse latency add another 20–30ms on top.',
  },
  zh: {
    idleTitle: '准备好就点一下', idleSub: '然后在变绿的那一刻再点一次',
    waitTitle: '等一下…', waitSub: '变绿之前点击不算',
    nowTitle: '现在！',
    resultSub: '结果在下面', roundSub: (n, total) => `${n}/${total} 次 —— 点击继续`,
    earlyTitle: '太早了', earlySub: '要等变绿之后再点 —— 点击重来',
    thisRound: '本次成绩', avgOf: n => `平均（${n} 次）`, fastest: '最快',
    gradeTop: ms => `平均 ${ms}ms —— 属于前列`,
    gradeFast: ms => `平均 ${ms}ms —— 比平均更快`,
    gradeNormal: ms => `平均 ${ms}ms —— 属于普通水平`,
    gradeSlow: ms => `平均 ${ms}ms —— 稍慢。盯住屏幕再试一次`,
    noteTitle: '关于人的反应速度',
    note: '看到光并作出反应通常要 200~250ms。这段时间里眼睛收到信号、大脑判断、指令再传到手指 —— 所以再怎么练也很难降到 100ms 以下。屏幕刷新率和鼠标延迟还会再加上 20~30ms。',
  },
};

export const CPS_UI: Record<GameLang, {
  secSuffix: (n: number) => string; clicksSuffix: (n: number) => string;
  tapHere: string; startsOnFirst: (d: number) => string;
  clicks: string; cps: string; bestOf: (d: number) => string;
  gradeVeryFast: (c: string) => string; gradeFast: (c: string) => string;
  gradeNormal: (c: string) => string; gradeSlow: (c: string) => string;
  note: string;
}> = {
  ko: {
    secSuffix: n => `${n}초`, clicksSuffix: n => `${n}번 클릭`,
    tapHere: '여기를 계속 누르세요', startsOnFirst: d => `첫 클릭과 함께 ${d}초가 시작됩니다`,
    clicks: '클릭 수', cps: '초당 클릭(CPS)', bestOf: d => `최고 기록 (${d}초)`,
    gradeVeryFast: c => `${c} CPS — 아주 빠릅니다`,
    gradeFast: c => `${c} CPS — 빠른 편입니다`,
    gradeNormal: c => `${c} CPS — 보통입니다`,
    gradeSlow: c => `${c} CPS — 손가락 두 개를 번갈아 쓰면 더 나옵니다`,
    note: '보통 한 손가락으로는 6~8 CPS 정도가 한계입니다. 두 손가락을 번갈아 쓰거나(버터플라이) 손목을 떠는 방식으로 10 CPS를 넘기기도 하지만, 마우스와 손목에 무리가 가니 오래 하지 마세요.',
  },
  en: {
    secSuffix: n => `${n}s`, clicksSuffix: n => `${n} clicks`,
    tapHere: 'Keep clicking here', startsOnFirst: d => `The ${d} seconds start on your first click`,
    clicks: 'Clicks', cps: 'Clicks per second', bestOf: d => `Best (${d}s)`,
    gradeVeryFast: c => `${c} CPS — very fast`,
    gradeFast: c => `${c} CPS — on the fast side`,
    gradeNormal: c => `${c} CPS — about average`,
    gradeSlow: c => `${c} CPS — alternating two fingers gets you more`,
    note: 'One finger usually tops out around 6–8 CPS. Alternating two fingers (butterfly clicking) or vibrating your wrist can push past 10 CPS, but it is hard on both the mouse and your wrist — do not keep it up for long.',
  },
  zh: {
    secSuffix: n => `${n} 秒`, clicksSuffix: n => `点了 ${n} 次`,
    tapHere: '在这里一直点', startsOnFirst: d => `第一次点击时开始计 ${d} 秒`,
    clicks: '点击次数', cps: '每秒点击（CPS）', bestOf: d => `最高记录（${d} 秒）`,
    gradeVeryFast: c => `${c} CPS —— 非常快`,
    gradeFast: c => `${c} CPS —— 算快的`,
    gradeNormal: c => `${c} CPS —— 普通水平`,
    gradeSlow: c => `${c} CPS —— 两根手指交替能更快`,
    note: '单指一般在 6~8 CPS 左右到顶。用两指交替（蝴蝶点击）或抖手腕能超过 10 CPS，但对鼠标和手腕都很吃力，别长时间这么做。',
  },
};

export const AIM_UI: Record<GameLang, {
  sizes: string[]; targetPrefix: string; targetAria: string;
  hitsSub: (acc: number) => string; introTitle: (d: number) => string; introSub: string;
  hits: string; misses: string;
  gradeFast: (h: number) => string; gradeGood: (h: number) => string; gradeSlow: (h: number) => string;
  note: string;
}> = {
  ko: {
    sizes: ['큼', '보통', '작음'], targetPrefix: '과녁', targetAria: '과녁',
    hitsSub: acc => `명중 · 정확도 ${acc}%`,
    introTitle: d => `${d}초 동안 과녁 맞히기`, introSub: '빗나간 클릭도 셉니다 — 마구 누르면 정확도가 떨어집니다',
    hits: '명중', misses: '빗나감',
    gradeFast: h => `${h}개 명중 — 아주 빠릅니다`,
    gradeGood: h => `${h}개 명중 — 좋은 편입니다`,
    gradeSlow: h => `${h}개 명중 — 과녁을 크게 두고 감을 잡아보세요`,
    note: '정확도가 낮다면 마우스 감도(DPI)가 너무 높은 경우가 많습니다. 감도를 낮추고 팔로 크게 움직이면 작은 과녁에서 명중률이 올라갑니다. 휴대폰에서는 손가락 크기 때문에 작은 과녁이 불리합니다.',
  },
  en: {
    sizes: ['Large', 'Medium', 'Small'], targetPrefix: 'Target', targetAria: 'Target',
    hitsSub: acc => `hits · ${acc}% accuracy`,
    introTitle: d => `Hit targets for ${d} seconds`, introSub: 'Misses count too — spamming clicks drops your accuracy',
    hits: 'Hits', misses: 'Misses',
    gradeFast: h => `${h} hits — very fast`,
    gradeGood: h => `${h} hits — good going`,
    gradeSlow: h => `${h} hits — try the large targets first to get a feel for it`,
    note: 'Low accuracy usually means your mouse DPI is too high. Turn the sensitivity down and move from the arm, and your hit rate on small targets goes up. On a phone, small targets are unfair simply because of finger size.',
  },
  zh: {
    sizes: ['大', '中', '小'], targetPrefix: '靶子', targetAria: '靶子',
    hitsSub: acc => `命中 · 正确率 ${acc}%`,
    introTitle: d => `${d} 秒内打靶`, introSub: '打空也会计数 —— 乱点会拉低命中率',
    hits: '命中', misses: '打空',
    gradeFast: h => `命中 ${h} 个 —— 非常快`,
    gradeGood: h => `命中 ${h} 个 —— 相当不错`,
    gradeSlow: h => `命中 ${h} 个 —— 先用大靶子找找感觉`,
    note: '命中率低，多半是鼠标灵敏度（DPI）太高。把灵敏度降下来、用手臂大幅移动，小靶子的命中率就会上来。手机上因为手指粗细的关系，小靶子本来就吃亏。',
  },
};

export const TYPING_UI: Record<GameLang, {
  sentences: string[];
  /** 한글은 자판을 누른 횟수, 나머지는 글자 수를 센다 */
  countStrokes: boolean;
  placeholder: string;
  currentSpeed: string; avgOf: (n: number) => string; bestSpeed: string;
  gradeFast: (v: number, acc: number) => string; gradeGood: (v: number, acc: number) => string;
  gradeSlow: (v: number, acc: number) => string;
  note: string;
}> = {
  ko: {
    sentences: [
      '오늘도 좋은 하루 되세요',
      '한글 타자 연습을 시작합니다',
      '천 리 길도 한 걸음부터 시작된다',
      '바람이 불어오는 곳 그곳으로 가네',
      '작은 습관이 큰 변화를 만든다',
      '노력은 배신하지 않는다고 믿는다',
      '가는 말이 고와야 오는 말이 곱다',
      '오늘 할 일을 내일로 미루지 말자',
    ],
    countStrokes: true,
    placeholder: '여기에 위 문장을 그대로 치세요',
    currentSpeed: '현재 타수', avgOf: n => `평균 (${n}문장)`, bestSpeed: '최고 타수',
    gradeFast: (v, acc) => `평균 ${v}타 · 정확도 ${acc}% — 아주 빠릅니다`,
    gradeGood: (v, acc) => `평균 ${v}타 · 정확도 ${acc}% — 평균 이상입니다`,
    gradeSlow: (v, acc) => `평균 ${v}타 · 정확도 ${acc}% — 속도보다 정확도를 먼저 올리세요`,
    note: '한글 타수는 자판을 누른 횟수로 셉니다 — ‘한’은 ㅎ·ㅏ·ㄴ 세 번이라 3타입니다. 성인 평균은 200~300타, 300타를 넘으면 빠른 편입니다. 정확도가 95% 아래라면 속도를 조금 늦추는 편이 결과적으로 더 빠릅니다.',
  },
  en: {
    sentences: [
      'The quick brown fox jumps over the lazy dog',
      'Practice makes the difference over time',
      'A journey of a thousand miles begins with one step',
      'Small habits add up to big changes',
      'Type steadily rather than quickly at first',
      'Accuracy comes before speed in typing',
      'The best time to start is right now',
      'Keep your wrists relaxed while you type',
    ],
    countStrokes: false,
    placeholder: 'Type the sentence above, exactly as it appears',
    currentSpeed: 'Current CPM', avgOf: n => `Average (${n} sentences)`, bestSpeed: 'Best CPM',
    gradeFast: (v, acc) => `${v} CPM · ${acc}% accuracy — very fast`,
    gradeGood: (v, acc) => `${v} CPM · ${acc}% accuracy — above average`,
    gradeSlow: (v, acc) => `${v} CPM · ${acc}% accuracy — get accuracy up before speed`,
    note: 'CPM counts characters per minute; divide by five for the usual WPM figure, so 250 CPM is about 50 WPM. Most adults land between 150 and 300 CPM. If your accuracy is under 95%, slowing down actually finishes the text sooner.',
  },
  zh: {
    sentences: [
      '今天也要过得好好的',
      '现在开始练习打字',
      '千里之行始于足下',
      '小小的习惯会带来大的改变',
      '一开始要稳，不要求快',
      '打字先求准，再求快',
      '开始做一件事最好的时候就是现在',
      '打字的时候手腕要放松',
    ],
    countStrokes: false,
    placeholder: '在这里照着上面的句子输入',
    currentSpeed: '当前字/分', avgOf: n => `平均（${n} 句）`, bestSpeed: '最高字/分',
    gradeFast: (v, acc) => `平均 ${v} 字/分 · 正确率 ${acc}% —— 非常快`,
    gradeGood: (v, acc) => `平均 ${v} 字/分 · 正确率 ${acc}% —— 高于平均`,
    gradeSlow: (v, acc) => `平均 ${v} 字/分 · 正确率 ${acc}% —— 先把正确率提上来再求速度`,
    note: '这里按每分钟输入的字数计算。中文输入还取决于输入法与选字，所以同样的手速数值也会不同。正确率低于 95% 时，稍微放慢反而整体更快。',
  },
};

export const MEMORY_UI: Record<GameLang, {
  buttonAria: (n: number) => string;
  idle: string; show: string; input: (a: number, b: number) => string; over: (l: number) => string;
  currentLevel: string; toRemember: string; bestLevel: string;
  gradeGreat: (l: number) => string; gradeGood: (l: number) => string; gradeSlow: (l: number) => string;
  note: string;
}> = {
  ko: {
    buttonAria: n => `${n}번 단추`,
    idle: '순서를 기억했다가 그대로 누르세요', show: '잘 보세요…',
    input: (a, b) => `따라 누르세요 (${a}/${b})`, over: l => `${l}단계에서 끝났습니다`,
    currentLevel: '현재 단계', toRemember: '기억할 개수', bestLevel: '최고 단계',
    gradeGreat: l => `${l}단계 — 아주 좋은 기억력입니다`,
    gradeGood: l => `${l}단계 — 평균 이상입니다`,
    gradeSlow: l => `${l}단계 — 소리 내어 순서를 읊으면 더 오래 기억됩니다`,
    note: '사람이 한 번에 붙잡아 두는 정보는 보통 다섯에서 아홉 덩어리입니다. 순서를 ‘초록-빨강-파랑’처럼 말로 묶어 외우면 덩어리 수가 줄어 더 길게 갈 수 있습니다.',
  },
  en: {
    buttonAria: n => `Button ${n}`,
    idle: 'Remember the order, then press it back', show: 'Watch closely…',
    input: (a, b) => `Press them back (${a}/${b})`, over: l => `You reached level ${l}`,
    currentLevel: 'Current level', toRemember: 'To remember', bestLevel: 'Best level',
    gradeGreat: l => `Level ${l} — a very good memory`,
    gradeGood: l => `Level ${l} — above average`,
    gradeSlow: l => `Level ${l} — saying the order out loud makes it stick longer`,
    note: 'People hold about five to nine chunks at once. Binding the sequence into words — ‘green-red-blue’ — cuts the number of chunks, which is how you get further.',
  },
  zh: {
    buttonAria: n => `第 ${n} 个按钮`,
    idle: '记住顺序，然后照样按回去', show: '看仔细…',
    input: (a, b) => `照着按回去（${a}/${b}）`, over: l => `你走到了第 ${l} 关`,
    currentLevel: '当前关卡', toRemember: '要记的个数', bestLevel: '最高关卡',
    gradeGreat: l => `第 ${l} 关 —— 记忆力很好`,
    gradeGood: l => `第 ${l} 关 —— 高于平均`,
    gradeSlow: l => `第 ${l} 关 —— 把顺序念出声能记得更久`,
    note: '人一次能抓住的信息通常是五到九个「块」。把顺序编成话来记，比如「绿-红-蓝」，块数就少了，也就能走得更远。',
  },
};

export const NUMBER_MEMORY_UI: Record<GameLang, {
  memorise: string; briefly: string; typeBack: string;
  reached: (d: number) => string; answerVs: (a: string, i: string) => string; nothing: string;
  confirm: string; currentDigits: string; memorised: string;
  note: string;
}> = {
  ko: {
    memorise: '숫자를 외우세요', briefly: '잠깐 보였다가 사라집니다', typeBack: '방금 본 숫자를 입력하세요',
    reached: d => `${d}자리까지 외웠습니다`, answerVs: (a, i) => `정답 ${a} · 입력 ${i}`, nothing: '없음',
    confirm: '확인', currentDigits: '현재 자릿수', memorised: '외운 자릿수',
    note: '사람이 한 번에 외우는 숫자는 보통 일곱 자리 안팎입니다. 전화번호가 그 길이인 것도 우연이 아닙니다. 숫자를 두세 개씩 묶어 ‘삼사-이오’처럼 덩어리로 읽으면 열 자리를 넘기기도 합니다.',
  },
  en: {
    memorise: 'Memorise the number', briefly: 'It shows briefly, then disappears', typeBack: 'Type the number you just saw',
    reached: d => `You held ${d} digits`, answerVs: (a, i) => `Answer ${a} · you typed ${i}`, nothing: 'nothing',
    confirm: 'Check', currentDigits: 'Current digits', memorised: 'Digits held',
    note: 'People usually hold around seven digits at once — it is no coincidence that phone numbers are about that long. Reading them in chunks of two or three, ‘thirty-four, twenty-five’, gets some people past ten.',
  },
  zh: {
    memorise: '记住这个数字', briefly: '它会短暂出现后消失', typeBack: '输入你刚看到的数字',
    reached: d => `你记住了 ${d} 位`, answerVs: (a, i) => `正确答案 ${a} · 你输入的是 ${i}`, nothing: '空',
    confirm: '确认', currentDigits: '当前位数', memorised: '记住的位数',
    note: '人一次能记住的数字通常在七位左右 —— 电话号码是这个长度并非偶然。把数字按两三个一组来读，比如「三四-二五」，有人能超过十位。',
  },
};

export const SEQUENCE_UI: Record<GameLang, {
  cellAria: (n: number) => string;
  idle: string; show: string; input: (a: number, b: number) => string; over: (l: number) => string;
  grid: string; bestLevel: string;
  gradeGood: (l: number) => string; gradeSlow: (l: number) => string;
  note: string;
}> = {
  ko: {
    cellAria: n => `${n}번 칸`,
    idle: '켜진 칸의 위치를 기억하세요', show: '잘 보세요…',
    input: (a, b) => `켜졌던 칸을 누르세요 (${a}/${b})`,
    over: l => `${l}단계에서 끝났습니다 — 빨간 칸이 틀린 곳입니다`,
    grid: '격자', bestLevel: '최고 단계',
    gradeGood: l => `${l}단계 — 공간 기억이 좋습니다`,
    gradeSlow: l => `${l}단계 — 모양으로 묶어 외우면 늘어납니다`,
    note: '칸 하나하나를 외우는 대신 켜진 칸들이 이루는 모양(ㄱ자, 대각선)으로 기억하면 훨씬 오래 갑니다. 위치 기억은 순서 기억과 다른 종류라, 한쪽을 잘해도 다른 쪽이 약할 수 있습니다.',
  },
  en: {
    cellAria: n => `Cell ${n}`,
    idle: 'Remember which cells light up', show: 'Watch closely…',
    input: (a, b) => `Press the cells that lit up (${a}/${b})`,
    over: l => `You reached level ${l} — the red cells are the ones you missed`,
    grid: 'Grid', bestLevel: 'Best level',
    gradeGood: l => `Level ${l} — good spatial memory`,
    gradeSlow: l => `Level ${l} — grouping them into a shape gets you further`,
    note: 'Instead of memorising each cell, remember the shape the lit cells make — an L, a diagonal. Spatial memory is a different faculty from sequence memory, so being good at one does not mean you are good at the other.',
  },
  zh: {
    cellAria: n => `第 ${n} 格`,
    idle: '记住亮起的格子在哪', show: '看仔细…',
    input: (a, b) => `点出亮过的格子（${a}/${b}）`,
    over: l => `你走到了第 ${l} 关 —— 红色的是点错的格子`,
    grid: '格子', bestLevel: '最高关卡',
    gradeGood: l => `第 ${l} 关 —— 空间记忆不错`,
    gradeSlow: l => `第 ${l} 关 —— 把它们当成一个形状来记会走得更远`,
    note: '不要一格一格地记，而是记亮起的格子组成的形状（L 形、对角线）。空间记忆和顺序记忆是两种不同的能力，一边强不代表另一边也强。',
  },
};

export const COLOR_BLIND_UI: Record<GameLang, {
  cellAria: (n: number) => string;
  over: (l: number) => string; idle: string;
  colorDiff: string; bestLevel: string;
  gradeSharp: (l: number) => string; gradeGood: (l: number) => string; gradeSlow: (l: number) => string;
  noteTitle: string; note: string;
}> = {
  ko: {
    cellAria: n => `${n}번 색`,
    over: l => `${l}단계에서 끝났습니다 — 정답은 표시된 칸입니다`,
    idle: '색이 다른 칸 하나를 찾아 누르세요',
    colorDiff: '색 차이', bestLevel: '최고 단계',
    gradeSharp: l => `${l}단계 — 아주 예민한 눈입니다`,
    gradeGood: l => `${l}단계 — 평균 이상입니다`,
    gradeSlow: l => `${l}단계 — 화면 밝기를 올리고 다시 해보세요`,
    noteTitle: '색약 검사가 아닙니다',
    note: '이 게임은 명도 차이를 구별하는 능력을 봅니다. 색약·색맹 여부는 이시하라 검사처럼 특정 색 조합을 쓰는 검사로만 알 수 있고, 정확한 판정은 안과에서 받아야 합니다. 결과는 화면 품질과 밝기, 주변 조명에 따라서도 크게 달라집니다.',
  },
  en: {
    cellAria: n => `Colour ${n}`,
    over: l => `You reached level ${l} — the marked square was the answer`,
    idle: 'Find and press the one square that is a different colour',
    colorDiff: 'Colour difference', bestLevel: 'Best level',
    gradeSharp: l => `Level ${l} — a very sharp eye`,
    gradeGood: l => `Level ${l} — above average`,
    gradeSlow: l => `Level ${l} — turn your screen brightness up and try again`,
    noteTitle: 'This is not a colour blindness test',
    note: 'This game measures how well you tell shades apart. Colour blindness can only be identified by a test built on specific colour combinations, like Ishihara plates, and a real diagnosis has to come from an optometrist. Results also swing considerably with screen quality, brightness and the light in the room.',
  },
  zh: {
    cellAria: n => `第 ${n} 个颜色`,
    over: l => `你走到了第 ${l} 关 —— 标出的那格才是答案`,
    idle: '找出颜色不一样的那一格并点它',
    colorDiff: '色差', bestLevel: '最高关卡',
    gradeSharp: l => `第 ${l} 关 —— 眼睛非常敏锐`,
    gradeGood: l => `第 ${l} 关 —— 高于平均`,
    gradeSlow: l => `第 ${l} 关 —— 把屏幕亮度调高再试一次`,
    noteTitle: '这不是色盲检查',
    note: '这个游戏测的是分辨明度差异的能力。是否色弱、色盲只能通过石原氏检查这类使用特定配色的检查来判断，准确诊断要去眼科。结果也会随屏幕品质、亮度和环境光变化很大。',
  },
};

export const HEARING_UI: Record<GameLang, {
  ages: string[];
  nowPlaying: string; stepOf: (i: number, total: number) => string;
  stopSound: string; playThis: string; canHear: string; cannotHear: string;
  limitLabel: string; belowOne: string;
  currentStep: string; currentFreq: string; limitStat: string; measuring: string;
  tipsTitle: string; tips: string[];
}> = {
  ko: {
    ages: ['10대 후반~20대 초반 수준으로 들립니다', '20대 중반 수준입니다', '30대 수준입니다', '40대 수준입니다', '50대 수준입니다', '8kHz 이하만 들린다면 조용한 곳에서 이어폰으로 다시 해보세요'],
    nowPlaying: '지금 재생 중인 주파수', stepOf: (i, total) => `${i} / ${total}단계`,
    stopSound: '■ 소리 멈추기', playThis: '▶ 이 주파수 들어보기',
    canHear: '들려요 → 더 높게', cannotHear: '안 들려요',
    limitLabel: '들리는 한계', belowOne: '1kHz 미만',
    currentStep: '현재 단계', currentFreq: '현재 주파수', limitStat: '들리는 한계', measuring: '측정 중',
    tipsTitle: '정확히 재려면',
    tips: [
      '· 이어폰을 쓰세요. 노트북 스피커는 15kHz 위를 거의 못 냅니다 — 귀가 아니라 스피커의 한계입니다.',
      '· 조용한 곳에서 하세요. 주변 소음이 있으면 높은 소리가 묻힙니다.',
      '· 볼륨은 낮게 두세요. 크게 들어도 한계는 안 올라가고 귀만 상합니다.',
      '· 이 결과는 재미로 보는 값이며 청력 검사가 아닙니다. 한쪽만 안 들린다면 이비인후과에 가세요.',
    ],
  },
  en: {
    ages: ['That is the late-teens to early-twenties range', 'That is the mid-twenties range', 'That is the thirties range', 'That is the forties range', 'That is the fifties range', 'If you only hear below 8kHz, try again somewhere quiet with headphones'],
    nowPlaying: 'Frequency now playing', stepOf: (i, total) => `${i} / ${total}`,
    stopSound: '■ Stop the sound', playThis: '▶ Play this frequency',
    canHear: 'I hear it → go higher', cannotHear: 'I cannot hear it',
    limitLabel: 'Your upper limit', belowOne: 'below 1kHz',
    currentStep: 'Step', currentFreq: 'Frequency', limitStat: 'Upper limit', measuring: 'measuring',
    tipsTitle: 'To measure this properly',
    tips: [
      '· Use headphones. Laptop speakers barely produce anything above 15kHz — that is the speaker’s limit, not your ears.',
      '· Do it somewhere quiet. Background noise buries the high tones.',
      '· Keep the volume low. Turning it up does not raise your limit, it just damages your hearing.',
      '· This is for curiosity, not a hearing test. If one ear cannot hear it, see an audiologist.',
    ],
  },
  zh: {
    ages: ['相当于十几岁后期到二十出头的水平', '相当于二十五岁左右的水平', '相当于三十多岁的水平', '相当于四十多岁的水平', '相当于五十多岁的水平', '如果只听得到 8kHz 以下，请在安静处戴耳机重测'],
    nowPlaying: '当前播放的频率', stepOf: (i, total) => `${i} / ${total} 级`,
    stopSound: '■ 停止播放', playThis: '▶ 试听这个频率',
    canHear: '听得到 → 再高一点', cannotHear: '听不到',
    limitLabel: '能听到的上限', belowOne: '低于 1kHz',
    currentStep: '当前级别', currentFreq: '当前频率', limitStat: '能听到的上限', measuring: '测量中',
    tipsTitle: '想测得准一点',
    tips: [
      '· 请用耳机。笔记本音箱基本发不出 15kHz 以上 —— 那是音箱的极限，不是你耳朵的。',
      '· 在安静的地方测。有环境噪音时高频会被盖掉。',
      '· 音量保持小。开大并不会提高上限，只会伤耳朵。',
      '· 这个结果只是玩玩，不是听力检查。如果只有一只耳朵听不到，请去耳鼻喉科。',
    ],
  },
};

export const MATH_UI: Record<GameLang, {
  levels: string[]; opTitle: string; levelTitle: string;
  timeLeft: (s: string, solved: number) => string; answerPlaceholder: string; skip: string;
  solvedIn: (d: number) => string; startIn: (d: number) => string;
  solved: string; skipped: string; perQuestion: string; secSuffix: (s: string) => string;
  gradeFast: (n: number) => string; gradeGood: (n: number) => string; gradeSlow: (n: number) => string;
  skippedTitle: string;
}> = {
  ko: {
    levels: ['쉬움', '보통', '어려움'], opTitle: '연산 고르기', levelTitle: '난이도',
    timeLeft: (s, solved) => `${s}초 남음 · ${solved}문제`, answerPlaceholder: '답', skip: '모르겠어요 — 넘기기',
    solvedIn: d => `${d}초 동안 푼 문제`, startIn: d => `${d}초 시작`,
    solved: '푼 문제', skipped: '넘긴 문제', perQuestion: '문제당 평균', secSuffix: s => `${s}초`,
    gradeFast: n => `${n}문제 — 암산이 아주 빠릅니다`,
    gradeGood: n => `${n}문제 — 평균 이상입니다`,
    gradeSlow: n => `${n}문제 — 연산을 하나씩 줄여 연습해 보세요`,
    skippedTitle: '넘긴 문제',
  },
  en: {
    levels: ['Easy', 'Normal', 'Hard'], opTitle: 'Operations', levelTitle: 'Difficulty',
    timeLeft: (s, solved) => `${s}s left · ${solved} solved`, answerPlaceholder: 'Answer', skip: 'No idea — skip it',
    solvedIn: d => `solved in ${d} seconds`, startIn: d => `Start ${d} seconds`,
    solved: 'Solved', skipped: 'Skipped', perQuestion: 'Per question', secSuffix: s => `${s}s`,
    gradeFast: n => `${n} solved — very fast mental maths`,
    gradeGood: n => `${n} solved — above average`,
    gradeSlow: n => `${n} solved — try practising with one operation at a time`,
    skippedTitle: 'The ones you skipped',
  },
  zh: {
    levels: ['简单', '普通', '困难'], opTitle: '选择运算', levelTitle: '难度',
    timeLeft: (s, solved) => `剩余 ${s} 秒 · 已做 ${solved} 题`, answerPlaceholder: '答案', skip: '不会 —— 跳过',
    solvedIn: d => `${d} 秒内做出的题数`, startIn: d => `开始 ${d} 秒`,
    solved: '做对', skipped: '跳过', perQuestion: '每题平均', secSuffix: s => `${s} 秒`,
    gradeFast: n => `${n} 题 —— 心算非常快`,
    gradeGood: n => `${n} 题 —— 高于平均`,
    gradeSlow: n => `${n} 题 —— 可以一次只练一种运算`,
    skippedTitle: '跳过的题',
  },
};
