// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { TimeTool } from './time-tools.ts';
import { TIME_TOOLS } from './time-tools.ts';

/**
 * 시간 도구(/time) 섹션의 영어·중국어 메타데이터.
 *
 * slug·icon·gradient·og는 한국어와 공유한다. 언어별로 갈라지는 건 사람이 읽는
 * 문구뿐이라, 여기에는 그것만 둔다 — slug를 공유해야 hreflang이 세 언어를
 * 짝지을 수 있고, 도구가 추가돼도 한 곳만 채우면 된다.
 */
export type ToolIntlLang = 'en' | 'zh';

interface ToolCopy {
  title: string;
  desc: string;
  category: string;
  metaTitle: string;
  long: string;
  features: string[];
}

const COPY: Record<ToolIntlLang, Record<string, ToolCopy>> = {
  en: {
    timer: {
      title: 'Timer', desc: 'Set a time and get a sound when it runs out', category: 'Measure',
      metaTitle: 'Online Timer — Free Countdown With Alarm',
      long: 'Set minutes and seconds, watch the remaining time in large digits, and get a sound when it finishes. Common lengths like three minutes or ten are one button away.',
      features: ['Quick 1, 3, 5 and 10 minute presets', 'Remaining time in large digits', 'Sound on finish', 'Countdown mirrored in the tab title'],
    },
    stopwatch: {
      title: 'Stopwatch', desc: 'Time something to the hundredth of a second', category: 'Measure',
      metaTitle: 'Online Stopwatch — Free, With Lap Times',
      long: 'Times to a hundredth of a second and records laps, so you can compare each split and see which was quickest.',
      features: ['Hundredth-of-a-second precision', 'Lap recording', 'Compare time per split', 'Fastest and slowest laps marked'],
    },
    pomodoro: {
      title: 'Pomodoro Timer', desc: 'Focus and break cycles, switched automatically', category: 'Measure',
      metaTitle: 'Pomodoro Timer — Free 25/5 Focus Cycles',
      long: 'Runs focus and break periods and switches between them for you, with a longer break every fourth round.',
      features: ['Automatic focus and break switching', 'Longer break every fourth round', 'Screen colour per phase', 'Completed pomodoros counted'],
    },
    alarm: {
      title: 'Alarm Clock', desc: 'Set a clock time and get a sound then', category: 'Measure',
      metaTitle: 'Online Alarm Clock — Free, Set Any Time',
      long: 'Set an hour and minute and the alarm sounds at that time, with the remaining wait shown alongside.',
      features: ['Set by hour and minute', 'Remaining time shown', 'Choose the alarm sound', 'Runs while the tab stays open'],
    },
    worldclock: {
      title: 'World Clock', desc: 'Current time in cities around the world', category: 'World time',
      metaTitle: 'World Clock — Current Time in Major Cities',
      long: 'Shows the current time in major cities at a glance, marking which are on a different date and which are inside working hours.',
      features: ['Current time in major cities', 'Different-date cities marked', 'Working hours and night marked', 'Add and remove cities'],
    },
    timezone: {
      title: 'Time Zone Converter', desc: 'Convert a time between two cities', category: 'World time',
      metaTitle: 'Time Zone Converter — Compare Two Cities Hour by Hour',
      long: 'Converts a time between two cities in both directions and lays the whole day out side by side, so the overlap in working hours is obvious.',
      features: ['Convert both directions', 'Whole-day comparison table', 'Overlapping working hours highlighted', 'Daylight saving applied automatically'],
    },
    workdays: {
      title: 'Working Days Calculator', desc: 'Count days excluding weekends', category: 'Date counting',
      metaTitle: 'Working Days Calculator — Business Days Between Dates',
      long: 'Counts working days between two dates with weekends excluded, and can also give the date a set number of working days ahead.',
      features: ['Working days excluding weekends', 'Add your own holidays', 'Date n working days later', 'Shown alongside total days'],
    },
    'date-add': {
      title: 'Date Calculator', desc: 'Add or subtract days, weeks, months and years', category: 'Date counting',
      metaTitle: 'Date Calculator — Add or Subtract From Any Date',
      long: 'Adds or subtracts days, weeks, months or years from a date, handling month-end properly and showing the resulting weekday.',
      features: ['Add or subtract days, weeks, months, years', 'Correct month-end handling (31 Jan + 1 month)', 'Resulting weekday shown', 'Quick 100-day and 1-year buttons'],
    },
    weeknumber: {
      title: 'Week Number', desc: 'Which ISO week and quarter a date falls in', category: 'Date counting',
      metaTitle: 'Week Number Calculator — ISO 8601 Week and Quarter',
      long: 'Gives the ISO 8601 week number for any date, along with the quarter, the day of the year and that week’s Monday to Sunday.',
      features: ['ISO 8601 week number', 'Quarter and day of year', 'Monday to Sunday of that week', 'Days remaining and progress'],
    },
    lived: {
      title: 'Time Lived Calculator', desc: 'How long you have been alive, in every unit', category: 'Date counting',
      metaTitle: 'Time Lived Calculator — Days, Hours and Minutes Since Birth',
      long: 'Converts your date of birth into years, months and days, then into total days, hours, minutes and seconds — with the next thousand-day milestone.',
      features: ['Years, months, days and total days', 'Converted to hours, minutes and seconds', 'Next 1,000-day milestone', 'Estimated heartbeats so far'],
    },
  },
  zh: {
    timer: {
      title: '计时器', desc: '设定时间，结束时用声音提醒', category: '计时',
      metaTitle: '在线计时器 — 免费倒计时闹铃',
      long: '设定分秒后，剩余时间会以大字显示，结束时用声音提醒。三分钟、十分钟这类常用时长按一下就能设好。',
      features: ['1／3／5／10 分钟快捷设定', '剩余时间大字显示', '结束提示音', '标签页标题也显示剩余时间'],
    },
    stopwatch: {
      title: '秒表', desc: '精确到百分之一秒的计时', category: '计时',
      metaTitle: '在线秒表 — 免费，支持分段计时',
      long: '精确到百分之一秒，并可记录分段，方便比较每一段用了多久、哪一段最快。',
      features: ['百分之一秒精度', '分段（Lap）记录', '各段耗时对比', '标出最快与最慢的一段'],
    },
    pomodoro: {
      title: '番茄钟', desc: '专注与休息自动切换', category: '计时',
      metaTitle: '番茄钟 — 免费 25／5 专注循环',
      long: '自动在专注与休息之间切换，每四轮安排一次较长的休息。',
      features: ['专注与休息自动切换', '每四轮一次长休息', '各阶段用不同画面颜色区分', '记录完成的番茄数'],
    },
    alarm: {
      title: '闹钟', desc: '指定时刻，到点用声音提醒', category: '计时',
      metaTitle: '在线闹钟 — 免费，可设定任意时刻',
      long: '设定时与分，到点响铃，同时显示还要等多久。',
      features: ['按时:分设定', '同时显示剩余时间', '可选择提示音', '保持标签页开启即可运行'],
    },
    worldclock: {
      title: '世界时钟', desc: '世界各地城市的当前时间', category: '世界时间',
      metaTitle: '世界时钟 — 主要城市当前时间',
      long: '一眼看清主要城市的当前时间，并标出日期不同的城市，以及哪些正处在工作时间。',
      features: ['主要城市当前时间', '标出日期不同的城市', '区分工作时间与深夜', '可增删城市'],
    },
    timezone: {
      title: '时区换算', desc: '在两个城市之间换算时间', category: '世界时间',
      metaTitle: '时区换算 — 两城市逐小时对照',
      long: '在两个城市之间双向换算时间，并把一整天并排列出，工作时间的重叠区间一目了然。',
      features: ['两个城市双向换算', '整日时区对照表', '标出双方工作时间重叠区间', '自动处理夏令时'],
    },
    workdays: {
      title: '工作日计算', desc: '不含周末的天数计算', category: '日期计算',
      metaTitle: '工作日计算器 — 两个日期之间的工作日',
      long: '计算两个日期之间不含周末的工作日天数，也可以求出「n 个工作日之后」是哪一天。',
      features: ['不含周末的工作日数', '可自行添加节假日', '按工作日推算 n 天后的日期', '与总天数并列对比'],
    },
    'date-add': {
      title: '日期加减', desc: '按日、周、月、年加减日期', category: '日期计算',
      metaTitle: '日期加减计算器 — 从任意日期加减',
      long: '在某个日期上加减日、周、月或年，正确处理月末情况，并显示结果是星期几。',
      features: ['按日／周／月／年加减', '正确处理月末（1月31日 + 1个月）', '同时显示结果的星期', '常用的 100 天、1 年快捷按钮'],
    },
    weeknumber: {
      title: '周数查询', desc: '某个日期属于第几周、第几季度', category: '日期计算',
      metaTitle: '周数计算器 — ISO 8601 周数与季度',
      long: '给出任意日期的 ISO 8601 周数，以及所属季度、年内第几天，还有那一周的周一到周日。',
      features: ['ISO 8601 周数计算', '季度与年内天数', '该周的周一至周日日期', '剩余天数与进度'],
    },
    lived: {
      title: '已活时间', desc: '你活了多久，换算成各种单位', category: '日期计算',
      metaTitle: '已活时间计算器 — 出生至今的天数、小时与分钟',
      long: '把出生日期换算成年月日与总天数，再换算成小时、分钟、秒 —— 并给出下一个千日纪念日。',
      features: ['年月日与总天数', '换算成小时、分钟、秒', '下一个 1000 天纪念日', '估算至今的心跳次数'],
    },
  },
};

/** 언어별 도구 목록 — slug·icon·gradient는 한국어와 공유하고 문구만 갈아 끼운다 */
export function timeToolsIntl(lang: ToolIntlLang): TimeTool[] {
  return TIME_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    // 번역이 아직 없으면 한국어를 그대로 쓴다 — 도구가 추가돼도 화면이 깨지지 않는다
    return c ? { ...t, ...c } : t;
  });
}

export function findTimeToolIntl(lang: ToolIntlLang, slug: string): TimeTool | undefined {
  return timeToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedTimeToolsIntl(lang: ToolIntlLang, slug: string, count = 4): TimeTool[] {
  const all = timeToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 셸 UI 문구 */
export const TIME_SHELL_UI: Record<ToolIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Time tools',
    canDo: 'What this tool does', others: 'Other time tools',
    notice: '⏱️ Runs while this tab is open. No install, no sign-up.',
    footNote: 'Timer and alarm sounds may not fire if the device goes to sleep.',
  },
  zh: {
    home: '首页', section: '时间工具',
    canDo: '这个工具能做什么', others: '其他时间工具',
    notice: '⏱️ 在这个标签页打开期间运行。无需安装，也无需注册。',
    footNote: '设备进入休眠时，计时器与闹钟的声音可能不会响。',
  },
};
