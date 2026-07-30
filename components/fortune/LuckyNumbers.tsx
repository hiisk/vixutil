'use client';
import ToolIcon from '@/components/ToolIcon';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { getLuckyLotto, ballColor, ymdOf } from '@/lib/lucky-lotto';
import { LOTTO_EN } from '@/lib/fortune-en';
import { LOTTO_ZH } from '@/lib/fortune-zh';
import { t, type Lang } from '@/lib/fortune-intl';

type IntlLang = Exclude<Lang, 'ko'>;

/*
  한국어판은 "행운의 로또 번호"지만 여기서는 특정 복권을 지칭하지 않는다.
  6/45 형식은 나라마다 달라서, 영어로 "lotto numbers"라고 하면 어느 나라
  기준인지 알 수 없는 틀린 안내가 된다. 숫자 자체는 같은 로직으로 뽑되
  "행운의 숫자"로만 제시하고, 구매를 권하는 표현은 넣지 않는다.
*/
const COPY = {
  en: {
    title: 'Today’s Lucky Numbers',
    lead: 'Six lucky numbers from 1–45, generated from your date of birth and today’s date',
    birthLabel: 'Date of birth',
    yearPh: 'e.g. 1995', monthPh: 'Month', dayPh: 'Day',
    submit: 'Show my numbers',
    empty: 'Enter your date of birth to see today’s numbers',
    bonus: 'Bonus',
    direction: 'Lucky direction',
    weekday: 'Lucky day',
    timeSlot: 'Lucky hours',
    errAll: 'Please fill in the full date of birth.',
    errMonth: 'Month must be between 1 and 12.',
    errDay: 'Day must be between 1 and 31.',
    errInvalid: 'That date does not exist.',
    errFuture: 'Your date of birth is in the future.',
    note: 'These numbers are generated from your birth date and today’s date. They are for fun — they cannot improve the odds of any lottery, and this page is not a suggestion to buy tickets.',
  },
  zh: {
    title: '今日幸运数字',
    lead: '根据出生日期与当天日期，从 1~45 中生成 6 个幸运数字',
    birthLabel: '出生日期',
    yearPh: '例) 1995', monthPh: '月', dayPh: '日',
    submit: '查看幸运数字',
    empty: '输入出生日期即可查看今日数字',
    bonus: '特别号',
    direction: '幸运方位',
    weekday: '幸运日',
    timeSlot: '幸运时段',
    errAll: '请填写完整的出生日期。',
    errMonth: '月份请填 1~12 之间。',
    errDay: '日期请填 1~31 之间。',
    errInvalid: '该日期不存在。',
    errFuture: '出生日期晚于今天。',
    note: '这些数字由出生日期与当天日期生成，仅供娱乐。它无法提高任何彩票的中奖概率，本页也不建议购买彩票。',
  },
} as const;

export default function LuckyNumbers({ lang }: { lang: IntlLang }) {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [result, setResult] = useState<ReturnType<typeof getLuckyLotto> | null>(null);
  const [error, setError] = useState('');
  const c = COPY[lang];
  const labels = lang === 'zh' ? LOTTO_ZH : LOTTO_EN;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(form.year), m = Number(form.month), d = Number(form.day);

    if (!y || !m || !d) { setError(c.errAll); return; }
    if (m < 1 || m > 12) { setError(c.errMonth); return; }
    if (d < 1 || d > 31) { setError(c.errDay); return; }

    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      setError(c.errInvalid); return;
    }
    if (date > new Date()) { setError(c.errFuture); return; }

    setError('');
    const raw = getLuckyLotto(y, m, d, ymdOf(new Date()));
    // 요일·시간대는 한국어 문자열로 나오므로 인덱스를 다시 계산해 언어별 라벨로 바꾼다.
    setResult({
      ...raw,
      weekday: labels.weekdays[weekdayIndex(raw.weekday)],
      timeSlot: labels.timeSlots[timeSlotIndex(raw.timeSlot)],
      direction: directionLabel(raw.direction, lang),
    });
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('fortuneOf', lang)}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{c.title}</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <ToolIcon emoji="🍀" className="w-12 h-12 mx-auto mb-2 text-slate-800 dark:text-slate-100" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{c.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.lead}</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{c.birthLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder={c.yearPh} value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.monthPh} min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.dayPh} min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-emerald-400 focus:outline-none" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black py-3 transition-colors">
            {c.submit}
          </button>
        </form>

        {result ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {result.numbers.map(n => (
                  <span key={n} className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base font-black shadow-sm"
                    style={{ background: ballColor(n) }}>
                    {n}
                  </span>
                ))}
                <span className="text-slate-300 dark:text-slate-600 font-black px-1">+</span>
                <span className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base font-black shadow-sm ring-2 ring-offset-2 ring-slate-300 dark:ring-offset-slate-900"
                  style={{ background: ballColor(result.bonus) }}>
                  {result.bonus}
                </span>
              </div>
              <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-3">{c.bonus}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: c.direction, value: result.direction, icon: '🧭' },
                { label: c.weekday, value: result.weekday, icon: '📅' },
                { label: c.timeSlot, value: result.timeSlot, icon: '⏰' },
              ].map(item => (
                <div key={item.label} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-center">
                  <ToolIcon emoji={item.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">{item.label}</div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>

            <ReferralCards lang="en" placement="result" />
          </div>
        ) : (
          <div className="text-center py-12 text-slate-300 dark:text-slate-600">
            <ToolIcon emoji="☝️" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm">{c.empty}</p>
          </div>
        )}

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">{c.note}</p>
      </div>
    </div>
  );
}

/* ── 한국어 결과 문자열 → 인덱스 ── */
const KO_WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const KO_TIME_SLOTS = ['이른 아침(6~9시)', '오전(9~12시)', '점심 무렵(12~14시)', '오후(14~18시)', '저녁(18~21시)', '늦은 밤(21~24시)'];
const KO_DIRECTIONS = ['동쪽', '서쪽', '남쪽', '북쪽', '동남쪽', '서남쪽'];
const DIRECTIONS_EN = ['East', 'West', 'South', 'North', 'Southeast', 'Southwest'];
const DIRECTIONS_ZH = ['东方', '西方', '南方', '北方', '东南', '西南'];

function weekdayIndex(ko: string): number {
  const i = KO_WEEKDAYS.indexOf(ko);
  return i < 0 ? 0 : i;
}
function timeSlotIndex(ko: string): number {
  const i = KO_TIME_SLOTS.indexOf(ko);
  return i < 0 ? 0 : i;
}
function directionLabel(ko: string, lang: IntlLang): string {
  const i = KO_DIRECTIONS.indexOf(ko);
  const table = lang === 'zh' ? DIRECTIONS_ZH : DIRECTIONS_EN;
  return table[i < 0 ? 0 : i];
}
