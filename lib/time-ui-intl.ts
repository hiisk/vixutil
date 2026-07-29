/**
 * 시간 도구 화면 문구 — 세 언어.
 *
 * 도구 컴포넌트가 직접 한국어를 들고 있으면 언어를 늘릴 때마다 11개 파일을
 * 다 열어야 한다. 문구만 여기로 모아 두고 컴포넌트는 lang으로 골라 쓴다.
 *
 * 계산·타이밍 로직은 컴포넌트에 그대로 둔다 — 문구와 동작을 같은 파일에서
 * 섞으면 번역이 동작을 건드릴 위험이 생긴다.
 */
export type TimeLang = 'ko' | 'en' | 'zh';

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
  zh: {
    tabTitle: '计时器 | vixutil', tabDone: '⏰ 时间到！| vixutil',
    done: '时间到了', running: '进行中', paused: '已暂停', idle: '按开始',
    min: '分', sec: '秒',
    start: '▶ 开始', resume: '▶ 继续', pause: '⏸ 暂停', reset: '重置',
    presets: '快捷设定', minSuffix: m => `${m} 分`,
    note: '剩余时间是按结束时刻反算的，而不是自己往下数，所以切到别的标签页再回来也不会走偏。标签页标题也会显示倒计时。不过完全关闭标签页后，提示音不会响。',
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
  zh: {
    measuring: '计时中', stopped: '已停止', idle: '按开始',
    start: '▶ 开始', resume: '▶ 继续', stop: '■ 停止', lap: '记分段', reset: '重置',
    lapCount: '分段数', fastest: '最快的一段', slowest: '最慢的一段', cumulative: '累计',
    note: '每一段都同时显示本段用时与累计时间，所以在重复同一件事（组数、练习、批次）时，哪一轮慢下来会立刻显现。最快的一段标绿，最慢的一段标红。',
  },
};

export const POMODORO_UI: L<{
  focus: string; shortBreak: string; longBreak: string; breakLabel: string;
  breakTime: string; focusTime: string;
  start: string; resume: string; pause: string;
  next: string; completed: string; focused: string;
  whyTitle: string; whyBody: string;
}> = {
  ko: {
    focus: '집중', shortBreak: '짧은 휴식', longBreak: '긴 휴식', breakLabel: '휴식',
    breakTime: '쉬는 시간입니다', focusTime: '다시 집중할 시간입니다',
    start: '▶ 시작', resume: '▶ 이어서', pause: '⏸ 일시정지',
    next: '다음', completed: '완료한 뽀모도로', focused: '집중한 시간',
    whyTitle: '왜 25분인가요',
    whyBody: '25분은 프란체스코 치릴로가 1980년대에 제안한 길이입니다. 특정 숫자에 과학적 근거가 있는 것은 아니고, "타이머가 도는 동안은 딴 일을 하지 않는다"는 규칙 자체가 효과의 대부분입니다. 자신에게 맞는 길이로 바꿔도 됩니다.',
  },
  en: {
    focus: 'Focus', shortBreak: 'Short break', longBreak: 'Long break', breakLabel: 'Break',
    breakTime: 'Break time', focusTime: 'Back to focus',
    start: '▶ Start', resume: '▶ Resume', pause: '⏸ Pause',
    next: 'Next', completed: 'Pomodoros done', focused: 'Time focused',
    whyTitle: 'Why 25 minutes?',
    whyBody: 'Twenty-five minutes is the length Francesco Cirillo proposed in the 1980s. There is no particular evidence behind that specific number — most of the effect comes from the rule itself, that you do not switch tasks while the timer runs. Adjust the length to whatever actually works for you.',
  },
  zh: {
    focus: '专注', shortBreak: '短休息', longBreak: '长休息', breakLabel: '休息',
    breakTime: '休息时间', focusTime: '回到专注',
    start: '▶ 开始', resume: '▶ 继续', pause: '⏸ 暂停',
    next: '下一段', completed: '完成的番茄数', focused: '专注时长',
    whyTitle: '为什么是 25 分钟？',
    whyBody: '25 分钟是弗朗切斯科·奇里洛在 1980 年代提出的长度。这个具体数字并没有特别的科学依据 —— 效果主要来自规则本身：计时器转着的时候不去做别的事。你可以改成适合自己的长度。',
  },
};

export const ALARM_UI: L<{
  set: string; reset: string; ringing: string;
  alarmAt: string; currentTime: string; remaining: string;
  today: string; tomorrow: string; keepOpen: string;
}> = {
  ko: {
    set: '알람 맞추기', reset: '다시 맞추기', ringing: '⏰ 알람!',
    alarmAt: '알람 시각', currentTime: '현재 시각', remaining: '남았습니다',
    today: '오늘', tomorrow: '내일', keepOpen: '이 탭을 열어 두어야',
  },
  en: {
    set: 'Set alarm', reset: 'Set again', ringing: '⏰ Alarm',
    alarmAt: 'Alarm at', currentTime: 'Now', remaining: 'to go',
    today: 'Today', tomorrow: 'Tomorrow', keepOpen: 'keep this tab open for it to fire',
  },
  zh: {
    set: '设定闹钟', reset: '重新设定', ringing: '⏰ 闹钟',
    alarmAt: '闹钟时刻', currentTime: '当前时刻', remaining: '后响',
    today: '今天', tomorrow: '明天', keepOpen: '需保持此标签页开启才会响',
  },
};

export const WORLDCLOCK_UI: L<{ manage: string; now: string }> = {
  ko: { manage: '도시 추가·제거', now: '지금' },
  en: { manage: 'Add or remove cities', now: 'Now' },
  zh: { manage: '增删城市', now: '现在' },
};

export const TIMEZONE_UI: L<{
  baseCity: string; targetCity: string; baseTime: string;
  sameDay: string; nextDay: string; prevDay: string; bothWorking: string;
}> = {
  ko: {
    baseCity: '기준 도시', targetCity: '상대 도시', baseTime: '기준 시각',
    sameDay: '같은 날', nextDay: '다음 날', prevDay: '전날', bothWorking: '둘 다 업무 시간',
  },
  en: {
    baseCity: 'From', targetCity: 'To', baseTime: 'Time',
    sameDay: 'Same day', nextDay: 'Next day', prevDay: 'Previous day', bothWorking: 'Both in working hours',
  },
  zh: {
    baseCity: '基准城市', targetCity: '目标城市', baseTime: '基准时刻',
    sameDay: '同一天', nextDay: '次日', prevDay: '前一天', bothWorking: '双方都在工作时间',
  },
};

export const WORKDAYS_UI: L<{
  startDate: string; endDate: string; workdays: string; totalDays: string; weekendHoliday: string;
  addHolidays: string; nAfterTitle: string; nAfterResult: string; holidayNote: string;
}> = {
  ko: {
    startDate: '시작일', endDate: '종료일', workdays: '근무일', totalDays: '전체 일수', weekendHoliday: '주말·공휴일',
    addHolidays: '공휴일 빼기', nAfterTitle: '근무일 기준 n일 뒤', nAfterResult: '근무일 뒤는',
    holidayNote: '한국 공휴일은 음력과 대체공휴일 때문에 해마다 달라, 직접 넣도록 했습니다',
  },
  en: {
    startDate: 'From', endDate: 'To', workdays: 'Working days', totalDays: 'Total days', weekendHoliday: 'Weekends & holidays',
    addHolidays: 'Exclude holidays', nAfterTitle: 'Date n working days later', nAfterResult: 'working days later is',
    holidayNote: 'Public holidays differ by country and move year to year, so add the ones that apply to you.',
  },
  zh: {
    startDate: '开始日', endDate: '结束日', workdays: '工作日', totalDays: '总天数', weekendHoliday: '周末与假日',
    addHolidays: '排除节假日', nAfterTitle: 'n 个工作日之后的日期', nAfterResult: '个工作日之后是',
    holidayNote: '各国的公共假日不同，每年日期也会变，请自行添加适用于你的假日。',
  },
};

export const DATEADD_UI: L<{
  baseDate: string; result: string; weekday: string; diffDays: string; diffWeeks: string;
  day: string; week: string; month: string; year: string;
  negativeNote: string; monthEndTitle: string; monthEndBody: string;
  presets: [string, string, string, string];
}> = {
  ko: {
    baseDate: '기준 날짜', result: '결과', weekday: '요일', diffDays: '차이(일)', diffWeeks: '차이(주)',
    day: '일', week: '주', month: '개월', year: '년',
    negativeNote: '음수를 넣으면 과거로 계산합니다',
    monthEndTitle: '월말은 이렇게 처리합니다',
    monthEndBody: '1월 31일에 1개월을 더하면 2월 28일(윤년이면 29일)이 됩니다. 없는 날짜로 넘어가지 않도록 그 달의 마지막 날로 맞춥니다.',
    presets: ['100일 뒤', '1년 뒤', '2주 뒤', '30일 전'],
  },
  en: {
    baseDate: 'From date', result: 'Result', weekday: 'Weekday', diffDays: 'Difference (days)', diffWeeks: 'Difference (weeks)',
    day: 'Days', week: 'Weeks', month: 'Months', year: 'Years',
    negativeNote: 'Enter a negative number to go backwards',
    monthEndTitle: 'How month-end is handled',
    monthEndBody: '31 January plus one month gives 28 February (29 in a leap year). Rather than rolling over into a date that does not exist, it clamps to the last day of that month.',
    presets: ['100 days later', '1 year later', '2 weeks later', '30 days earlier'],
  },
  zh: {
    baseDate: '基准日期', result: '结果', weekday: '星期', diffDays: '相差（天）', diffWeeks: '相差（周）',
    day: '天', week: '周', month: '个月', year: '年',
    negativeNote: '填负数则往过去计算',
    monthEndTitle: '月末这样处理',
    monthEndBody: '1 月 31 日加一个月得到 2 月 28 日（闰年为 29 日）。为了不跳到不存在的日期，会取该月的最后一天。',
    presets: ['100 天后', '1 年后', '2 周后', '30 天前'],
  },
};

export const WEEKNUMBER_UI: L<{
  date: string; week: string; quarter: string; dayOfYear: string; daysLeft: string;
  progress: string; rangeTitle: string; isoNote: string; prevYearNote: string;
}> = {
  ko: {
    date: '날짜', week: '주차', quarter: '분기', dayOfYear: '연중 일수', daysLeft: '올해 남은 날',
    progress: '올해 진행률', rangeTitle: '이 주는 언제부터 언제까지',
    isoNote: 'ISO 8601 기준입니다 — 목요일이 포함된 주를 그 해의 첫 주로 봅니다.',
    prevYearNote: '전년도 마지막 주차',
  },
  en: {
    date: 'Date', week: 'Week', quarter: 'Quarter', dayOfYear: 'Day of year', daysLeft: 'Days left this year',
    progress: 'Year progress', rangeTitle: 'This week runs from',
    isoNote: 'Uses ISO 8601 — the week containing the first Thursday is week one.',
    prevYearNote: 'Last week of the previous year',
  },
  zh: {
    date: '日期', week: '第几周', quarter: '季度', dayOfYear: '年内第几天', daysLeft: '今年剩余天数',
    progress: '今年进度', rangeTitle: '这一周的起止',
    isoNote: '采用 ISO 8601 —— 含第一个星期四的那一周为该年第一周。',
    prevYearNote: '上一年的最后一周',
  },
};

export const LIVED_UI: L<{
  birth: string; livedFor: string; milestones: string;
  week: string; hour: string; minute: string; second: string;
  computing: string; futureError: string;
}> = {
  ko: {
    birth: '생년월일', livedFor: '태어난 지', milestones: '다가오는 기념일',
    week: '주', hour: '시간', minute: '분', second: '초',
    computing: '계산 준비 중…', futureError: '오늘보다 앞선 날짜를 넣어 주세요',
  },
  en: {
    birth: 'Date of birth', livedFor: 'You have been alive for', milestones: 'Upcoming milestones',
    week: 'Weeks', hour: 'Hours', minute: 'Minutes', second: 'Seconds',
    computing: 'Calculating…', futureError: 'Please enter a date in the past',
  },
  zh: {
    birth: '出生日期', livedFor: '你已经活了', milestones: '即将到来的纪念日',
    week: '周', hour: '小时', minute: '分钟', second: '秒',
    computing: '正在计算…', futureError: '请填写今天之前的日期',
  },
};
