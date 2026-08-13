'use client';
/*
 * ── 왜 클라이언트 컴포넌트인가 (2026-08-13) ──────────────────
 * 서버 컴포넌트가 그린 마크업은 **요청마다 두 번** 나간다 — 브라우저가 볼 HTML과,
 * 그 옆에 인라인으로 붙는 RSC 짐(직렬화된 트리)이다. 클래스 문자열까지 두 번
 * 실린다. 재 보니 낱장 한 장에서 RSC 짐이 61%였고 보이는 글자는 6%였다.
 *
 * Hobby의 Fast Origin Transfer 한도가 30일에 10GB인데, 주소 20만 개를 한 번 훑는
 * 데만 6GB가 들어 사이트가 실제로 멈췄다(한도의 348%).
 *
 * 마크업을 클라이언트 컴포넌트로 옮기면 그 마크업은 **캐시되는 JS 묶음**으로
 * 가고, 요청마다 넘어가는 것은 props(slug·lang) 둘뿐이다. HTML은 그대로 서버에서
 * 그려지므로 크롤러가 읽는 내용은 하나도 줄지 않는다. 게다가 JS는 Fast Data
 * Transfer(한도 100GB, 여유 많음)로 세어지고 크롤러는 애초에 받아 가지 않는다.
 *
 * 실측: /laundry 낱장이 gzip 27.8KB → 14.0KB (RSC 61% → 17%).
 */
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { emojiItem } from '@/lib/emoji/list';
import { emojiFacts } from '@/lib/emoji/facts';
import { emojiDesc } from '@/lib/emoji/desc';
import { EMOJI_UI } from '@/lib/emoji/ui';
import CopyChar from '@/components/emoji/CopyChar';
import LangPicker from '@/components/LangPicker';

/**
 * 이모지 한 장 — 열 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 맨 위가 글자다. 복사하러 온 사람이 절반이고, 뜻을 보러 온 사람이 절반이다.
 * 그 다음이 뜻이고, 공식 이름과 코드포인트는 그 아래다 — 순서를 뒤집으면
 * 유니코드 이름을 먼저 보고 "내가 아는 뜻과 다르네" 하고 떠난다.
 */
export default function EmojiPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = emojiItem(slug);
  if (!x) return null;

  const ui = EMOJI_UI[lang];
  const f = emojiFacts(x);
  const desc = emojiDesc(slug, lang);
  const group = ui.groupLabel[x.group];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/emoji`;
  const path = `${prefix}/emoji/${slug}`;
  const base = localeOfLang(lang);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/emoji` },
          { name: `${x.char} ${x.common}`, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(`${x.char} ${x.common}`, ui.metaDesc(x.char, desc), path)} />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-700 to-amber-400" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={homeHref} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link prefetch={false} href={`${prefix}/emoji`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/emoji/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        {/* 글자가 먼저다 — 눌러서 복사하러 온 사람이 절반이다 */}
        <CopyChar char={x.char} label={ui.copyLabel} copiedLabel={ui.copiedLabel} />

        <div className="text-center mt-5 mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">{x.common}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">{group}</p>
        </div>

        <section className="mb-6" aria-label={ui.meaningTitle}>
          <p className="label-caps mb-2">{ui.meaningTitle}</p>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed rounded-2xl border chip-off px-4 py-4">
            {desc}
          </p>
        </section>

        {f.nameDiffers && (
          <section className="mb-6 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 px-4 py-4">
            <p className="label-caps mb-2">{ui.nameGapTitle}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{ui.nameGapNote}</p>
            <dl className="text-sm">
              <dt className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{ui.officialLabel}</dt>
              <dd className="mb-2 font-mono text-slate-700 dark:text-slate-200">{x.unicodeName}</dd>
              <dt className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{ui.commonLabel}</dt>
              <dd className="font-black text-slate-900 dark:text-slate-100">{x.common}</dd>
            </dl>
          </section>
        )}

        <dl className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
            <dt className="label-caps mb-1">{ui.codeLabel}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono break-all">{x.code}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
            <dt className="label-caps mb-1">{ui.cpLabel}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{f.cpCount}</dd>
          </div>
        </dl>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3">
          {ui.cpNote(f.cpCount)}
        </p>

        {f.vs16 && (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3">
            {ui.vs16Note}
          </p>
        )}
        {f.zwj && (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 px-4 py-3">
            {ui.zwjNote}
          </p>
        )}

        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed rounded-2xl border chip-off px-4 py-3">
          {ui.groupNote[x.group]}
        </p>

        <section className="mt-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.itemFaq(f, desc, group)} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.relatedTitle}>
          <h2 className="sec-h2">{ui.relatedTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {f.related.map(s => {
              const o = emojiItem(s);
              if (!o) return null;
              return (
                <Link prefetch={false}
                  key={s}
                  href={`${prefix}/emoji/${s}`}
                  className="flex items-center gap-2 rounded-xl border chip-off px-3 py-2 hover:border-amber-300 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-xl leading-none">{o.char}</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{o.common}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/emoji/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
