'use client';
/* 클라이언트 컴포넌트인 까닭은 components/ValueLeaf.tsx 머리말과 같다 */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { exerciseBySlug, relatedExercises, kcal, WEIGHTS, MINUTES } from '@/lib/body/exercise';
import { EXERCISE_UI } from '@/lib/body/exercise-ui';
import { localeHref, localePrefix, type AnyLocale10 } from '@/lib/locales';

/** 운동 낱장 — "수영 칼로리"에 답한다. 체중 × 시간 표가 본문이다 */
export default function ExerciseLeaf({ slug, lang }: { slug: string; lang: AnyLocale10 }) {
  const x = exerciseBySlug(slug)!;
  const t = EXERCISE_UI[lang];
  const name = x.name[lang];
  const prefix = localePrefix(lang);
  const path = `${prefix}/body/exercise/${slug}`;

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Body', path: `${prefix}/body` }, { name, path }])} />
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-lime-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={localeHref(lang, '/')} className="page-back hover:text-emerald-600 shrink-0">←</Link>
          <Link prefetch={false} href={`${prefix}/body`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium truncate">Body</Link>
          <span className="ml-auto shrink-0"><LangPicker current={lang} route={`/body/exercise/${slug}`} /></span>
        </div>
      </header>

      <main className="page-main">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">{t.h1(name)}</h1>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-lime-700 p-6 text-white">
          <p className="text-4xl font-black leading-none tabular-nums">{kcal(x.met, 70, 30)} kcal</p>
          <p className="mt-2 text-sm text-emerald-100">{t.lead(name, String(kcal(x.met, 70, 30)))}</p>
          <p className="mt-1 text-sm text-emerald-100">{t.metLine(String(x.met))}</p>
        </div>

        <section className="mt-6">
          <h2 className="sec-h2">{t.tableTitle}</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900">
                  <th className="px-3 py-2 text-left text-xs font-bold text-slate-500 dark:text-slate-400">{t.weight}</th>
                  {MINUTES.map(m => <th key={m} className="px-3 py-2 text-right text-xs font-bold text-slate-500 dark:text-slate-400">{m}{t.minutes}</th>)}
                </tr>
              </thead>
              <tbody>
                {WEIGHTS.map(w => (
                  <tr key={w} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400">{w}kg</td>
                    {MINUTES.map(m => <td key={m} className="px-3 py-2 text-right font-bold text-slate-800 dark:text-slate-100">{kcal(x.met, w, m)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{t.relatedTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {relatedExercises(slug).map(r => (
              <Link prefetch={false} key={r.slug} href={`${prefix}/body/exercise/${r.slug}`}
                className="chip-v">
                {r.name[lang]} · {r.met} MET
              </Link>
            ))}
          </div>
        </section>

        <p className="note-sm mt-6">{t.note}</p>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
