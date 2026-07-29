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
  zh: {
    focus: '专注', shortBreak: '短休息', longBreak: '长休息', breakLabel: '休息',
    breakTime: '休息时间', focusTime: '回到专注',
    start: '▶ 开始', resume: '▶ 继续', pause: '⏸ 暂停',
    next: '下一段', completed: '完成的番茄数', focused: '专注时长',
    skip: '跳过这一段', minUnit: ' 分',
    whyTitle: '为什么是 25 分钟？',
    whyBody: '25 分钟是弗朗切斯科·奇里洛在 1980 年代提出的长度。这个具体数字并没有特别的科学依据 —— 效果主要来自规则本身：计时器转着的时候不去做别的事。你可以改成适合自己的长度。',
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
  zh: {
    set: '设定闹钟', reset: '重新设定', ringing: '⏰ 闹钟',
    alarmAt: '闹钟时刻', currentTime: '当前时刻', remaining: '后响',
    today: '今天', tomorrow: '明天', keepOpen: '需保持此标签页开启才会响',
    stop: '关闭闹钟',
    itIsNow: t => `已经 ${t} 了`,
    until: (day, t) => `距离${day} ${t}`,
    note: '填入今天已经过去的时刻，会自动设到明天。闹钟只在浏览器里运行，所以这个标签页要保持开启才会响，设备进入休眠时也可能没有声音。非要起来的早晨闹钟，请同时用手机闹钟。',
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
  zh: {
    manage: '增删城市', now: '现在',
    ahead: (base, h) => `比${base}快 ${h} 小时`,
    behind: (base, h) => `比${base}慢 ${h} 小时`,
    yourTime: '你所在地',
    note: '卡片颜色代表当地是什么时候 —— 绿色是工作时间，黑色是深夜。联系之前看一眼颜色，就知道现在发消息合不合适。夏令时会自动处理，因为浏览器知道各国的规则。',
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
  zh: {
    baseCity: '基准城市', targetCity: '目标城市', baseTime: '基准时刻',
    sameDay: '同一天', nextDay: '次日', prevDay: '前一天', bothWorking: '双方都在工作时间',
    note: '标绿的时段是两个城市都处在工作时间的小时。约会议时从这里面挑，就不会有人凌晨上线。夏令时会自动处理。',
    atIs: (city, t) => `${city} ${t} 是`,
    inCity: (city, rel) => `${city}的${rel}`,
    offsetLabel: (sign, h) => ` · 时差 ${sign}${h} 小时`,
    cityTime: city => `${city}时刻`,
    dayCompare: n => `全天对照 —— 标绿的是双方都在工作时间的小时（${n} 小时）`,
    dstNote: '显示的时差是包含夏令时的实际值。美国与欧洲在 3 月至 11 月之间会拨快一小时，所以一个月之后的会议，要确认这期间夏令时不会变。',
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
  zh: {
    startDate: '开始日', endDate: '结束日', workdays: '工作日', totalDays: '总天数', weekendHoliday: '周末与假日',
    addHolidays: '排除节假日', nAfterTitle: 'n 个工作日之后的日期', nAfterResult: '个工作日之后是',
    holidayNote: '各国的公共假日不同，每年日期也会变，请自行添加适用于你的假日。',
    dayUnit: n => `${n} 天`, inclusive: '起始日与结束日都计入',
    holidayPlaceholder: '按 2026-01-01, 2026-03-01 这样填写，会从工作日中扣除',
    holidaysApplied: n => `已扣除 ${n} 个假日`,
    nAfterNote: '会跳过周末以及你在上面填写的假日。计算文件处理期限时很有用。',
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
  zh: {
    baseDate: '基准日期', result: '结果', weekday: '星期', diffDays: '相差（天）', diffWeeks: '相差（周）',
    day: '天', week: '周', month: '个月', year: '年',
    negativeNote: '填负数则往过去计算',
    monthEndTitle: '月末这样处理',
    monthEndBody: '1 月 31 日加一个月得到 2 月 28 日（闰年为 29 日）。为了不跳到不存在的日期，会取该月的最后一天。',
    presets: ['100 天后', '1 年后', '2 周后', '30 天前'],
    gapAfter: n => `基准日之后 ${n} 天`, gapBefore: n => `基准日之前 ${n} 天`,
    weekUnit: n => `${n} 周`, locale: 'zh-CN',
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
  zh: {
    date: '日期', week: '第几周', quarter: '季度', dayOfYear: '年内第几天', daysLeft: '今年剩余天数',
    progress: '今年进度', rangeTitle: '这一周的起止',
    isoNote: '采用 ISO 8601 —— 含第一个星期四的那一周为该年第一周。',
    prevYearNote: '上一年的最后一周',
    weekBig: w => `第 ${w} 周`, yearQuarter: (y, q) => `${y} 年 · 第 ${q} 季度`,
    doyValue: d => `第 ${d} 天`, daysValue: d => `${d} 天`,
    isoBody: '一周从星期一开始，而这一周属于哪一年，由它的星期四落在哪一年决定。所以当 1 月 1 日是周五、周六或周日时，它属于上一年的最后一周。按周编号排期的公司多数采用这个标准。',
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
  zh: {
    birth: '出生日期', livedFor: '你已经活了', milestones: '即将到来的纪念日',
    week: '周', hour: '小时', minute: '分钟', second: '秒',
    computing: '正在计算…', futureError: '请填写今天之前的日期',
    ymd: (y, m, d) => `${y} 年 ${m} 个月 ${d} 天`, totalToday: n => `到今天是第 ${n} 天`,
    milestoneLine: (n, date) => `${n} 天 — ${date}`, milestoneLeft: n => `还有 ${n} 天`,
    beatsNote: (beats, sleepDays) => `这段时间里心脏大约跳了 ${beats} 百万次（按静息 70 次／分的粗略估算）。若每晚睡七小时，你大约有 ${sleepDays} 天是在睡眠中度过的。`,
    locale: 'zh-CN',
  },
};
