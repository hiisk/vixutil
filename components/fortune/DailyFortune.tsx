'use client';
import { useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import FortuneDisplayIntl from './FortuneDisplayIntl';
import { t, type Lang } from '@/lib/fortune-intl';

type IntlLang = Exclude<Lang, 'ko'>;

const COPY = {
  en: {
    title: 'Today’s Horoscope by Birth Date',
    lead: 'Your overall, love, money, work and health reading for today',
    birthLabel: 'Date of birth',
    yearPh: 'e.g. 1995', monthPh: 'Month', dayPh: 'Day',
    submit: 'Read today’s fortune',
    empty: 'Enter your date of birth to see today’s reading',
    bornOn: (y: number, m: number, d: number) => `Born ${new Date(y, m - 1, d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    basis: 'For today',
    badge: 'Today’s reading',
    howQ: 'How is this decided?',
    howA: 'Your birth date and today’s date are mixed into a single value that picks one of the prepared readings. That means the same birthday on the same day gives the same result no matter how many times you refresh, and a new day gives a new reading. The date you enter is used for the calculation in your browser only and is never sent to a server. Treat it as entertainment — make the decisions that matter with real information and your own judgement.',
    errAll: 'Please fill in the full date of birth.',
    errMonth: 'Month must be between 1 and 12.',
    errDay: 'Day must be between 1 and 31.',
    errInvalid: 'That date does not exist.',
    errFuture: 'Your date of birth is in the future.',
  },
  zh: {
    title: '今日综合运势',
    lead: '按出生日期查看今天的总运、爱情、财运、事业与健康',
    birthLabel: '出生日期',
    yearPh: '例) 1995', monthPh: '月', dayPh: '日',
    submit: '查看今日运势',
    empty: '输入出生日期即可查看今日运势',
    bornOn: (y: number, m: number, d: number) => `${y}年${m}月${d}日生`,
    basis: '以今天为准',
    badge: '今日综合运势',
    howQ: '运势是怎么定的？',
    howA: '把出生日期与当天日期混合成一个值，用它从准备好的运势文句中挑一条。所以同一天、同一个生日，刷新多少次结果都一样，日期一变才会换新的。你输入的出生日期只在浏览器里参与计算，不会传送到服务器。运势仅供娱乐与自省，重要的决定请用充分的信息和自己的判断来做。',
    errAll: '请填写完整的出生日期。',
    errMonth: '月份请填 1~12 之间。',
    errDay: '日期请填 1~31 之间。',
    errInvalid: '该日期不存在。',
    errFuture: '出生日期晚于今天。',
  },
} as const;

export default function DailyFortune({ lang }: { lang: IntlLang }) {
  const [form, setForm] = useState({ year: '', month: '', day: '' });
  const [birth, setBirth] = useState<{ y: number; m: number; d: number } | null>(null);
  const [error, setError] = useState('');
  const c = COPY[lang];

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
    setBirth({ y, m, d });
    setTimeout(() => document.getElementById('daily-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/fortune`} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium">
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
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">🔮 {c.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{c.lead}</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-6">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{c.birthLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" inputMode="numeric" placeholder={c.yearPh} value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.monthPh} min={1} max={12} value={form.month}
              onChange={e => setForm({ ...form, month: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none" />
            <input type="number" inputMode="numeric" placeholder={c.dayPh} min={1} max={31} value={form.day}
              onChange={e => setForm({ ...form, day: e.target.value })}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:border-violet-400 focus:outline-none" />
          </div>
          {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">{error}</p>}
          <button type="submit" className="w-full mt-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-black py-3.5 transition-all active:scale-[0.99] shadow-md shadow-violet-200 dark:shadow-none">
            {c.submit}
          </button>
        </form>

        {birth ? (
          <div id="daily-result">
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200">{c.bornOn(birth.y, birth.m, birth.d)}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span>{c.basis}</span>
            </div>
            {/* subjectId는 한국어와 같은 형식이라 같은 생일이면 세 언어가 같은 운세 등급을 받는다 */}
            <FortuneDisplayIntl
              subjectId={`daily-${birth.y}-${birth.m}-${birth.d}`}
              subjectName={c.bornOn(birth.y, birth.m, birth.d)}
              subjectEmoji="🔮"
              badge={c.badge}
              lang={lang}
            />
          </div>
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <div className="text-5xl mb-3">☝️</div>
            <p className="text-sm">{c.empty}</p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-2">{c.howQ}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.howA}</p>
        </div>
      </div>
    </div>
  );
}
