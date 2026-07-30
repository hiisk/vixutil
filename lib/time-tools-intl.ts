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
export type ToolIntlLang = 'en';

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
};
