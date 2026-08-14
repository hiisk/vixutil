'use client';
/*
 * ── 왜 클라이언트 컴포넌트인가 ──────────────────────────────
 * ConvertPage와 같은 까닭이다(그 파일 머리말에 실측이 있다). 서버 컴포넌트가 그린
 * 마크업은 요청마다 HTML과 RSC 짐으로 **두 번** 나간다. 값 낱장은 33,120장이라
 * 그 두 배가 그대로 전송량이 된다.
 *
 * 여기로 넘어가는 props는 셋뿐이다 — slug · value · lang. 표 스무 줄과 이웃 링크는
 * **컴포넌트 안에서 계산한다**(leafFacts는 순수 함수라 서버 렌더에서도 같은 값이
 * 나온다). 마크업은 캐시되는 JS 묶음으로 가고 HTML은 그대로 서버에서 그려진다.
 */
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import SiteFooter from '@/components/SiteFooter';
import LangPicker from '@/components/LangPicker';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { CONVERT_MAP } from '@/lib/convert-tools';
import { localized } from '@/lib/convert-localized';
import { CONVERT_UI, type ConvertLang } from '@/lib/convert-ui-intl';
import { LEAF_UI } from '@/lib/convert/leaf-ui';
import { leafFacts, roundingIsSafe } from '@/lib/convert/leaf-facts';
import { valueSlug } from '@/lib/convert/values';
import { localeHref, localePrefix, localeTag } from '@/lib/locales';

/**
 * 값 낱장 — "70kg는 몇 파운드인가" 한 질문에 답하는 화면.
 *
 * ── 네 덩이가 값에 따라 달라야 한다 ─────────────────────────
 * 같은 문장에 숫자만 바뀌면 색인이 안 되고 사이트 전체 평가를 깎는다. 그래서
 * 이 화면은 값에서 나오는 것만 싣는다 —
 *
 *   1. 답과 역방향     70kg = 154.324lb / 70lb = 31.751kg
 *   2. 어림 판정       그 값에서 반올림해도 되는지 (값마다 답이 다르다)
 *   3. 주변값 표 20줄  눈금 폭이 값의 자릿수를 따라간다
 *   4. 같은 값 다른 단위 · 이웃 값
 *
 * 넷이 모두 값의 함수라는 것은 tests/convert-values.test.ts가 본문 해시로 본다.
 */
export default function ValueLeaf({ slug, value, lang }: { slug: string; value: number; lang: ConvertLang }) {
  const tool = CONVERT_MAP[slug];
  const ui = CONVERT_UI[lang];
  const t = LEAF_UI[lang];
  const text = localized(tool, lang);
  const f = leafFacts(tool, value);

  const prefix = localePrefix(lang);
  const homeHref = localeHref(lang, '/');
  const toolHref = `${prefix}/convert/${slug}`;
  const path = `${toolHref}/${valueSlug(value)}`;

  /* 숫자 표기는 언어를 따른다 — 1,234.5와 1.234,5가 갈린다 */
  const tag = localeTag(lang);
  const num = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 6 });
  const v = num(value);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/convert` },
          { name: text.title, path: toolHref },
          { name: t.answer(v, text.from, num(f.result), text.to), path },
        ])}
      />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-blue-600 shrink-0">
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={toolHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium truncate">
            {text.title}
          </Link>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={`/convert/${slug}/${valueSlug(value)}`} />
          </span>
        </div>
      </header>

      <main className="page-main">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">
          {t.h1(v, text.from, text.to)}
        </h1>

        {/* ① 답 — 이 페이지의 존재 이유다. 가장 크게 둔다 */}
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
          <p className="text-3xl sm:text-4xl font-black leading-tight tabular-nums">
            {t.answer(v, text.from, num(f.result), text.to)}
          </p>
          <p className="mt-2 text-sm text-blue-100">
            {roundingIsSafe(f)
              ? t.roundSafe(num(f.result), num(f.rounded), text.to)
              : t.roundRough(num(f.result), num(f.rounded), text.to, num(f.roundedError))}
          </p>
        </div>

        {/* ② 역방향 — 같은 숫자를 반대쪽에서 읽는 질문도 함께 친다 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.inverseTitle(v, text.to, text.from)}</h2>
          <div className="rounded-2xl border chip-off p-5">
            <p className="text-xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
              {t.answer(v, text.to, num(f.inverse), text.from)}
            </p>
            <p className="mt-2 note-xs">
              {t.formula}: {tool.reciprocal
                ? `${text.to} = ${num(tool.factor)} ÷ ${text.from}`
                : `${text.to} = ${text.from} × ${num(tool.factor)}${tool.offset ? ` + ${num(tool.offset)}` : ''}`}
            </p>
          </div>
        </section>

        {/* ③ 주변값 표 — 눈금이 값의 자릿수를 따라간다 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.tableTitle(text.from, text.to)}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.table.map(([from, to]) => (
              <div key={from} className={`row-pair${from === value ? ' bg-blue-50 dark:bg-blue-950/30' : ''}`}>
                <span className="row-label">{num(from)} {text.from}</span>
                <span className="val">{num(to)}<span className="val-unit">{text.to}</span></span>
              </div>
            ))}
          </div>
        </section>

        {/* ④ 같은 값 다른 단위 — 왼쪽 단위가 같은 쌍만 든다 */}
        {f.otherPairs.length > 0 && (
          <section className="mt-6">
            <h2 className="sec-h2">{t.otherTitle(v, text.from)}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {f.otherPairs.map(o => (
                <Link prefetch={false} key={o.slug} href={`${prefix}/convert/${o.slug}/${valueSlug(value)}`}
                  className="rounded-xl border chip-off px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all">
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                    {num(o.result)} {localized(CONVERT_MAP[o.slug], lang).to}
                  </span>
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500">
                    {localized(CONVERT_MAP[o.slug], lang).title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 이웃 값 — 원형으로 감아 아무 값도 고아가 되지 않는다 */}
        <section className="mt-6">
          <h2 className="sec-h2">{t.neighborTitle(text.from, text.to)}</h2>
          <div className="flex flex-wrap gap-1.5">
            {f.neighbors.map(n => (
              <Link prefetch={false} key={n} href={`${toolHref}/${valueSlug(n)}`}
                className="chip chip-off hover:border-blue-300 text-sm font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                {num(n)} {text.from}
              </Link>
            ))}
          </div>
          <Link prefetch={false} href={toolHref} className="mt-4 inline-block text-sm font-bold text-blue-600 hover:text-blue-700">
            {t.openTool(text.title)} →
          </Link>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
