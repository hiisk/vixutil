'use client';
/* 값 낱장과 같은 까닭으로 클라이언트 컴포넌트다 — 마크업을 요청마다 두 번
   보내지 않으려는 것이다. 넘어가는 props는 height·weight·lang 셋뿐이고 표와
   이웃 링크는 안에서 계산한다(components/ValueLeaf.tsx 머리말에 실측이 있다). */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { bmiCell, cellSlug, neighborCells, sameBmiCells } from '@/lib/body/bmi-grid';
import { BMI_GRID_UI } from '@/lib/body/bmi-grid-ui';
import { localeHref, localePrefix, localeTag, type AnyLocale10 } from '@/lib/locales';

/**
 * 키 × 몸무게 낱장 — "키 170 몸무게 70"이라는 질문 하나에 답한다.
 *
 * 칸마다 달라지는 것: BMI와 두 기준의 구간 이름, 표준 체중, 정상 범위와 거리,
 * 같은 BMI가 되는 다른 조합, 가까운 칸. 전부 키·몸무게에서 계산된다.
 */
export default function BmiGridLeaf({ height, weight, lang }: { height: number; weight: number; lang: AnyLocale10 }) {
  const t = BMI_GRID_UI[lang];
  const c = bmiCell(height, weight);
  const prefix = localePrefix(lang);
  const toolHref = `${prefix}/body/bmi`;
  const path = `${toolHref}/${cellSlug(height, weight)}`;
  const tag = localeTag(lang);
  const n = (x: number) => x.toLocaleString(tag, { maximumFractionDigits: 1 });

  const same = sameBmiCells(height, weight);
  const near = neighborCells(height, weight);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'BMI', path: toolHref },
          { name: t.h1(String(height), String(weight)), path },
        ])}
      />
      <PageGlow accent="emerald" />
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={localeHref(lang, '/')} className="page-back hover:text-emerald-600 shrink-0">
            ←
          </Link>
          <Link prefetch={false} href={toolHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors font-medium truncate">
            BMI
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/body/bmi/${cellSlug(height, weight)}`} />
          </span>
        </div>
      </header>

      <main className="page-main">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">
          {t.h1(String(height), String(weight))}
        </h1>

        {/* ① BMI와 두 기준의 판정 — 기준이 갈리므로 둘 다 낸다 */}
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
          <p className="text-4xl font-black leading-none tabular-nums">BMI {n(c.bmi)}</p>
          <div className="mt-3 grid gap-1 text-sm">
            <p><span className="text-emerald-100">{t.apLabel}</span> · <b>{t.ap[c.ap]}</b></p>
            <p><span className="text-emerald-100">{t.whoLabel}</span> · <b>{t.who[c.who]}</b></p>
          </div>
        </div>

        {/* ② 표준 체중과 정상 범위 — 칸마다 다른 숫자다 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.idealTitle}</h2>
          <div className="rounded-2xl border chip-off p-5 space-y-2">
            <p className="text-sm text-slate-700 dark:text-slate-200">{t.ideal(n(c.ideal))}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200">{t.healthy(n(c.healthy[0]), n(c.healthy[1]))}</p>
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {c.toHealthy === 0 ? t.inRange
                : weight > c.healthy[1] ? t.toLose(n(c.toHealthy)) : t.toGain(n(c.toHealthy))}
            </p>
          </div>
        </section>

        {/* ③ 같은 BMI가 되는 다른 조합 — 칸마다 목록이 다르다 */}
        {same.length > 0 && (
          <section className="mt-6">
            <h2 className="sec-h2">{t.sameTitle(n(c.bmi))}</h2>
            <div className="flex flex-wrap gap-1.5">
              {same.map(s => (
                <Link prefetch={false} key={cellSlug(s.height, s.weight)} href={`${toolHref}/${cellSlug(s.height, s.weight)}`}
                  className="chip chip-off hover:border-emerald-300 text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                  {s.height} · {s.weight}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ④ 가까운 칸 — 상하좌우라 서로 가리켜 고아가 생기지 않는다 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.nearbyTitle}</h2>
          <div className="flex flex-wrap gap-1.5">
            {near.map(s => (
              <Link prefetch={false} key={cellSlug(s.height, s.weight)} href={`${toolHref}/${cellSlug(s.height, s.weight)}`}
                className="chip chip-off hover:border-emerald-300 text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                {s.height}cm · {s.weight}kg
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
