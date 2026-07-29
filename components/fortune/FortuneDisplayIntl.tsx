'use client';
import { useMemo, useState, useCallback } from 'react';
import { getTodayFortuneIntl, formatToday, t, type Lang } from '@/lib/fortune-intl';
import ReferralCards from '@/components/ReferralCards';

/**
 * en/zh 운세 표시 컴포넌트.
 *
 * 한국어용 FortuneDisplay와 레이아웃은 같지만 별도 파일로 둔다. 한국어 쪽은
 * ShareButton 등 한국어 전용 컴포넌트에 묶여 있어서, 하나로 합치려면 그쪽까지
 * 건드려야 한다. 지금은 한국어 경로를 전혀 손대지 않는 편이 안전하다.
 */
interface Props {
  subjectId: string;
  subjectName: string;
  subjectEmoji: string;
  badge?: string;
  lang: Lang;
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} aria-hidden="true" className={`w-4 h-4 ${i <= n ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function ShareBtn({ name, lang }: { name: string; lang: Lang }) {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = `${name} — ${formatToday(lang)} · vixutil.com`;
    if (navigator.share) {
      try { await navigator.share({ title: text, url }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch {}
  }, [name, lang]);

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 border-white/30 text-white hover:bg-white/30"
    >
      {state === 'copied' ? (
        <>
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {t('copied', lang)}
        </>
      ) : (
        <>
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          {t('share', lang)}
        </>
      )}
    </button>
  );
}

export default function FortuneDisplayIntl({ subjectId, subjectName, subjectEmoji, badge, lang }: Props) {
  const f = useMemo(() => getTodayFortuneIntl(subjectId, lang), [subjectId, lang]);
  const today = useMemo(() => formatToday(lang), [lang]);

  const domains = [
    { key: 'love'   as const, label: t('love', lang),   icon: '💕' },
    { key: 'money'  as const, label: t('money', lang),  icon: '💰' },
    { key: 'work'   as const, label: t('work', lang),   icon: '💼' },
    { key: 'health' as const, label: t('health', lang), icon: '💪' },
  ];

  const overallAvg = Math.round(
    (f.stars.overall + f.stars.love + f.stars.money + f.stars.health + f.stars.work) / 5
  );

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl p-6 text-white text-center">
        <div className="flex justify-end mb-2">
          <ShareBtn name={subjectName} lang={lang} />
        </div>
        <p className="text-sm font-semibold text-purple-200 mb-2">{today}</p>
        <div className="text-6xl mb-3">{subjectEmoji}</div>
        <h2 className="text-2xl font-black mb-1">{subjectName}</h2>
        {badge && <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">{badge}</span>}
        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="text-xs text-purple-200">{t('todaysFortune', lang)}</p>
          <Stars n={overallAvg} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {domains.map(d => (
          <div key={d.key} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1.5">{d.icon} {d.label}</p>
            <Stars n={f.stars[d.key]} />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-violet-100 dark:border-violet-900/40 rounded-2xl p-5">
        <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-2">{t('overall', lang)}</p>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{f.overall}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {f.keywords.map(k => (
            <span key={k} className="text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 px-2.5 py-1 rounded-full">
              #{k}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-5">
        <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">{t('advice', lang)}</p>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{f.advice}</p>
      </div>

      {domains.map(d => (
        <div key={d.key} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{d.icon} {d.label}</p>
          <div className="mb-2"><Stars n={f.stars[d.key]} /></div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{f[d.key]}</p>
        </div>
      ))}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{t('luck', lang)}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full mx-auto mb-1 border-2 border-white shadow-sm" style={{ background: f.luckyColorHex }} />
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyColor', lang)}</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{f.luckyColor}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center mx-auto mb-1">
              <span className="text-lg font-black text-violet-600">{f.luckyNumber}</span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyNumber', lang)}</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{f.luckyNumber}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center mx-auto mb-1">
              <span className="text-base">🧭</span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyDirection', lang)}</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{f.luckyDirection}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center mx-auto mb-1">
              <span className="text-base">🎁</span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('luckyItem', lang)}</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{f.luckyItem}</p>
          </div>
        </div>
      </div>

      <ReferralCards lang={lang === 'ko' ? 'ko' : 'en'} placement="result" />
    </div>
  );
}
