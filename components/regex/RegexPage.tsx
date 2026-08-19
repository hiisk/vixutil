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
import ToolIcon from '@/components/ToolIcon';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import RegexTry from '@/components/regex/RegexTry';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { REGEX_ICON, patternOf } from '@/lib/regex/list';
import { regexFacts, siblingPatterns } from '@/lib/regex/facts';
import { whatOf } from '@/lib/regex/desc';
import { REGEX_UI } from '@/lib/regex/ui';
import LangPicker from '@/components/LangPicker';

/**
 * 보기를 화면에 적을 때 — 눈에 보이지 않는 글자를 보이게 한다.
 * 빈 문자열은 따옴표 두 개로 적는다. 어느 언어에서도 같은 뜻이 되기 때문이다.
 */
const show = (s: string): string =>
  s === '' ? '""' : s.replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/\u0000/g, '\\0');

/**
 * 식 한 장 — 식, 보기, 그리고 직접 넣어 보는 칸.
 *
 * 정규식 페이지에서 가장 아쉬운 것은 "내 글에도 되나"를 확인할 수 없다는 점이다.
 * 그래서 보기를 넣어 둔 입력칸을 함께 둔다. 앞뒤가 묶인 식에는 한 줄만 넣는다 —
 * 여러 줄을 넣으면 ^와 $가 글 전체를 가리켜 하나도 맞지 않게 되기 때문이다.
 */
export default function RegexPage({ slug, lang }: { slug: string; lang: Lang }) {
  const x = patternOf(slug);
  if (!x) return null;
  const f = regexFacts(x);
  const ui = REGEX_UI[lang];
  const what = whatOf(slug, lang);
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/text/regex`;
  const path = `${hub}/${slug}`;
  /*
    푸터와 FAQ에 실제 언어를 그대로 넘긴다.
    예전에는 여기서 ko와 en 둘로 좁혔다. 두 컴포넌트가 그 둘만 알던 시절의
    흔적인데, 지금은 둘 다 열 언어를 받는다. 좁혀 둔 채로 두면 중국어 화면
    아래에 영어 푸터와 영어 제휴 카드가 붙는다 — 실제로 그 상태였다.
  */
  const base = localeOfLang(lang);
  const faq = ui.patternFaq(f, what, show(x.ok[0]), show(x.no[0]));
  const flagNames = [...x.flags].map(c => ui.flagLabel[c] ?? c).join(' · ');

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: what, path },
        ])}
      />

      <PageGlow accent="sky" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="page-bar">
          <Link prefetch={false} href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{what}</span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/text/regex/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg bg-sec-soft">
            <ToolIcon emoji={REGEX_ICON} className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">{what}</h1>
          <p className="note-sm">{ui.desc(f, what)}</p>
        </div>

        <div className="rounded-2xl border-2 border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-4 py-4 mb-4">
          <div className="text-[11px] font-bold text-sky-700 dark:text-sky-400 mb-1">{ui.patternLabel}</div>
          <code className="block text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 font-mono leading-snug break-all">
            /{x.re}/{x.flags}
          </code>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-4">
          <div className="row-pair">
            <dt className="text-xs text-slate-500 dark:text-slate-400">{ui.anchoredLabel}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right">{f.anchored ? ui.anchoredYes : ui.anchoredNo}</dd>
          </div>
          <div className="row-pair">
            <dt className="text-xs text-slate-500 dark:text-slate-400">{ui.groupsLabel}</dt>
            <dd className="cell-num text-right">
              {f.groups}
              {f.names.length ? ` · ${f.names.join(', ')}` : ''}
            </dd>
          </div>
          {x.flags ? (
            <div className="row-pair">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{ui.flagsLabel}</dt>
              <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right">
                <span className="font-mono">{x.flags}</span> · {flagNames}
              </dd>
            </div>
          ) : null}
          <div className="row-pair">
            <dt className="text-xs text-slate-500 dark:text-slate-400">{ui.sampleLabel}</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono text-right break-all">{show(f.sample)}</dd>
          </div>
        </dl>

        <div className="rounded-2xl border chip-off p-4 mb-8">
          <h2 className="sec-h2-tight">{ui.tryTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.tryNote}</p>
          <RegexTry
            re={x.re}
            flags={x.flags}
            initial={f.anchored ? x.ok[0] : x.ok.join('\n')}
            placeholder={ui.tryPlaceholder}
            hitOne={ui.tryHitOne}
            hitMany={ui.tryHitMany}
            missLabel={ui.tryMiss}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <section>
            <h2 className="text-sm font-black text-emerald-700 dark:text-emerald-400 mb-2">{ui.okTitle}</h2>
            <ul className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 divide-y divide-emerald-100 dark:divide-emerald-900/40 overflow-hidden">
              {x.ok.map(s => (
                <li key={s} className="px-3 py-2 bg-emerald-50/60 dark:bg-emerald-950/20 text-xs font-mono text-slate-700 dark:text-slate-200 break-all">{show(s)}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-black text-rose-700 dark:text-rose-400 mb-2">{ui.noTitle}</h2>
            <ul className="rounded-2xl border border-rose-200 dark:border-rose-900/60 divide-y divide-rose-100 dark:divide-rose-900/40 overflow-hidden">
              {x.no.map(s => (
                <li key={s} className="px-3 py-2 bg-rose-50/60 dark:bg-rose-950/20 text-xs font-mono text-slate-700 dark:text-slate-200 break-all">{show(s)}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.siblingTitle}</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {siblingPatterns(slug).map(o => (
              <Link prefetch={false}
                key={o.slug}
                href={`${hub}/${o.slug}`}
                className="block px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <code className="block text-xs font-black text-sky-700 dark:text-sky-400 font-mono break-all">{o.re}</code>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{whatOf(o.slug, lang)}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link prefetch={false} key={l.lang} href={`${l.prefix}/text/regex/${slug}`} hrefLang={l.hreflang} className="dim-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
