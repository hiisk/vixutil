'use client';
/* 값 낱장과 같은 까닭으로 클라이언트 컴포넌트다 — props는 month·day·lang 셋뿐이고
   표와 링크는 안에서 계산한다(components/ValueLeaf.tsx 머리말에 실측이 있다). */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { birthdayFacts, daySlug, neighborDays, sameZodiacDays, AGE_REF_YEAR } from '@/lib/fortune/birthday-grid';
import { BIRTHDAY_UI } from '@/lib/fortune/birthday-ui';
import { zodiacSigns, animals } from '@/lib/fortune-intl';
import { localeHref, localePrefix, type AnyLocale10 } from '@/lib/locales';

/**
 * 생일 낱장 — "3월 15일에 태어난 사람"에 답한다.
 *
 * 별자리·띠 **이름은 기존 번역 층에서 가져온다**(zodiacSigns/animals). 여기서 또
 * 적으면 같은 이름이 두 곳에 생겨 곧 갈라진다 — 다른 섹션에서 실제로 그랬다.
 */
export default function BirthdayLeaf({ month, day, lang }: { month: number; day: number; lang: AnyLocale10 }) {
  const t = BIRTHDAY_UI[lang];
  const f = birthdayFacts(month, day);
  /* fortune-intl의 Lang은 이미 열 언어 그대로다 — langOfLocale로 접으면 pt-br이 pt가 되어 안 맞는다 */
  const signName = (id: string) => zodiacSigns(lang).find(s => s.id === id)?.name ?? id;
  const animalName = (id: string) => animals(lang).find(a => a.id === id)?.name ?? id;

  const prefix = localePrefix(lang);
  const hubHref = `${prefix}/fortune`;
  const path = `${prefix}/fortune/birthday/${daySlug(month, day)}`;
  const label = t.dateLabel(month, day);

  return (
    <div className="page-wrap">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Fortune', path: hubHref },
        { name: t.h1(label), path },
      ])} />
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={localeHref(lang, '/')} className="page-back hover:text-violet-600 shrink-0">←</Link>
          <Link prefetch={false} href={hubHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-violet-600 transition-colors font-medium truncate">
            {t.zodiacTitle}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/fortune/birthday/${daySlug(month, day)}`} />
          </span>
        </div>
      </header>

      <main className="page-main">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">{t.h1(label)}</h1>

        {/* ① 별자리 */}
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-700 p-6 text-white">
          <p className="text-4xl font-black leading-none">{f.zodiac.emoji} {signName(f.zodiac.id)}</p>
          <p className="mt-2 text-sm text-violet-100">{t.period} {f.zodiac.period} · {t.element} {f.zodiac.element}</p>
        </div>

        {/* ② 탄생석·탄생화 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.stoneTitle}</h2>
          <div className="rounded-2xl border chip-off p-5 space-y-2">
            <p className="text-sm text-slate-700 dark:text-slate-200">
              <b>{t.stone}</b> {f.birth.emoji} {f.birth.stone} ({f.birth.stoneEn}) — {f.birth.stoneMeaning}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              <b>{t.flower}</b> {f.birth.flower} — {f.birth.flowerMeaning}
            </p>
          </div>
        </section>

        {/* ③ 통산일 — 윤일은 따로 적는다 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.dayNumTitle}</h2>
          <div className="rounded-2xl border chip-off p-5">
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {t.dayNum(String(f.dayOfYearLeap), String(f.daysLeft))}
            </p>
            {f.isLeapDay && <p className="mt-2 note-xs">{t.leapNote}</p>}
          </div>
        </section>

        {/* ④ 나이표 — 기준연도를 못 박는다 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.ageTitle(String(AGE_REF_YEAR))}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden max-h-96 overflow-y-auto">
            {f.ages.slice(0, 60).map(a => (
              <div key={a.year} className="row-pair">
                <span className="row-label">{a.year}</span>
                <span className="val">{a.age}<span className="val-unit">· {a.animal.emoji} {animalName(a.animal.id)}</span></span>
              </div>
            ))}
          </div>
        </section>

        {/* ⑤ 같은 별자리 · 가까운 날 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.sameZodiacTitle(signName(f.zodiac.id))}</h2>
          <div className="flex flex-wrap gap-1.5">
            {sameZodiacDays(month, day).map(d => (
              <Link prefetch={false} key={daySlug(d.month, d.day)} href={`${prefix}/fortune/birthday/${daySlug(d.month, d.day)}`}
                className="chip-v">
                {t.dateLabel(d.month, d.day)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="sec-h2">{t.nearbyTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {neighborDays(month, day).map(d => (
              <Link prefetch={false} key={daySlug(d.month, d.day)} href={`${prefix}/fortune/birthday/${daySlug(d.month, d.day)}`}
                className="chip-v">
                {t.dateLabel(d.month, d.day)}
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
