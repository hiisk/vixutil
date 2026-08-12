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
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FretBoard from '@/components/fret/FretBoard';
import LangPicker from '@/components/LangPicker';
import { LANGS, langPrefix, type Lang, LOCALE_PATHS, localeOfLang } from '@/lib/i18n/lang';
import { MAX_FRET, slugOf, spotOf } from '@/lib/fret/list';
import { fretFacts, nameOf } from '@/lib/fret/facts';
import { FRET_UI } from '@/lib/fret/ui';

/**
 * 지판 한 자리 — 음 이름과 같은 음이 나는 다른 자리.
 *
 * 음만 크게 적으면 지판 위에서 길을 잃는다. 다른 줄의 같은 음을 함께 두면
 * "여기 말고 저기서도 잡을 수 있다"가 손에 남는다.
 */
export default function FretPage({ slug, lang }: { slug: string; lang: Lang }) {
  const p = spotOf(slug);
  if (!p) return null;
  const f = fretFacts(p);
  const note = nameOf(p, lang);
  const ui = FRET_UI[lang];
  const prefix = langPrefix(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/fret`;
  const path = `${hub}/${slug}`;
  const base = localeOfLang(lang);

  const rows: [string, string][] = [
    [ui.noteLabel, `${note}${f.octave}`],
    [ui.hzLabel, `${f.hz} Hz`],
    [ui.midiLabel, String(f.midi)],
    ...f.distances.map(d => [`${ui.distanceLabel} · ${ui.scaleName(d.key)}`, `${d.mm} mm`] as [string, string]),
    [ui.ringingLabel, `${f.distances[0].from} mm`],
  ];

  const near = Array.from({ length: 7 }, (_, i) => p.fret - 3 + i).filter(x => x >= 0 && x <= MAX_FRET && x !== p.fret);

  return (
    <div className="page-wrap">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name: `${ui.stringName(p.string)} ${ui.fretName(p.fret)}`, path },
        ])}
      />

      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-yellow-700 to-amber-500" />

      <header className="page-head">
        <div className="page-bar">
          <Link href={hub} className="page-back hover:text-slate-700 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">
            {ui.stringName(p.string)} {ui.fretName(p.fret)}
          </span>
          <div className="ml-auto shrink-0">
            <LangPicker current={localeOfLang(lang)} route={`/fret/${slug}`} available={LOCALE_PATHS} />
          </div>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="mx-auto mb-5 w-72 rounded-2xl border-2 border-amber-400 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-5 text-center shadow-lg">
          <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
            {ui.stringName(p.string)} · {ui.fretName(p.fret)}
          </div>
          <div className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight">{note}<span className="text-2xl">{f.octave}</span></div>
          <div className="mt-1 text-sm font-bold text-amber-800 dark:text-amber-300 tabular-nums">{f.hz} Hz</div>
        </div>

        <div className="text-center mb-6">
          <h1 className="page-h1">{ui.metaTitle(f, note)}</h1>
          <p className="note-sm">{ui.desc(f, note)}</p>
        </div>

        <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden mb-8">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
              <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
              <dd className="cell-num text-right break-all">{v}</dd>
            </div>
          ))}
        </dl>

        {f.sameNote.length > 0 && (
          <section className="mb-8">
            <h2 className="sec-h2-tight">{ui.sameNoteTitle}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.sameNoteNote}</p>
            <div className="flex flex-wrap gap-2">
              {f.sameNote.map(o => (
                <Link
                  key={slugOf(o)}
                  href={`${hub}/${slugOf(o)}`}
                  className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 tabular-nums hover:border-amber-500 transition-colors"
                >
                  {ui.stringName(o.string)} {ui.fretName(o.fret)}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.distanceTitle}</h2>
          <p className="note-xs">{ui.distanceNote}</p>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.neighbourTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {near.map(fret => (
              <Link
                key={fret}
                href={`${hub}/${slugOf({ string: p.string, fret })}`}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                {ui.fretName(fret)} · {nameOf({ string: p.string, fret }, lang)}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="sec-h2-tight">{ui.stringTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.stringNote}</p>
          <FretBoard path={hub} lang={lang} current={slug} />
        </section>

        <section className="mb-8">
          <h2 className="sec-h2">{ui.howTitle}</h2>
          <ul className="list-card">
            {ui.how.map(h => (
              <li key={h} className="cell-note">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={ui.fretFaq(f, note)} lang={base} title={ui.faqTitle} />

        <nav className="foot-nav" aria-label="Language">
          {LANGS.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/fret/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
