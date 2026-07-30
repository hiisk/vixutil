import Link from 'next/link';
import ToolIcon from '@/components/ToolIcon';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';
import MusicKeyboard from '@/components/music/MusicKeyboard';
import { LANGS8, prefix8, type Lang8 } from '@/lib/i18n/lang8';
import {
  KIND_WORD, accidentalOf, colorOf, feelOf, iconOf, notesOf, relatedItems,
  symbolOf, titleOf, type MusicItem,
} from '@/lib/music/catalog';
import { degreeName } from '@/lib/music/notes';
import { frequencies, itemFacts } from '@/lib/music/facts';
import { MUSIC_UI } from '@/lib/music/ui';

/**
 * 코드·음계·음정 한 장 — 여덟 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 건반 그림이 먼저다. "C·E·G"라는 글자보다 건반에서 어디를 누르는지가 훨씬
 * 빨리 읽히고, 검은 건반이 어디에 끼는지가 코드 모양의 절반이기 때문이다.
 * 표와 문장은 그 아래에 둔다.
 */
export default function MusicPage({ item, lang }: { item: MusicItem; lang: Lang8 }) {
  const ui = MUSIC_UI[lang];
  const f = itemFacts(item, lang);
  const prefix = prefix8(lang);
  const homeHref = lang === 'ko' ? '/' : `${prefix}/music`;
  const path = `${prefix}/music/${item.slug}`;
  const color = colorOf(item);
  const base = lang === 'ko' ? 'ko' : 'en';
  const related = relatedItems(item.slug);
  const notes = notesOf(item);

  const faq = ui.itemFaq(f);

  const rows: { label: string; value: string }[] = [
    { label: ui.notesLabel, value: f.notes.join(' · ') },
    // 라벨이 이미 "반음"이라 값마다 단위를 붙이면 "0반음 · 2반음 · 4반음…"이 된다
    { label: ui.stepsLabel, value: f.steps.join(' · ') },
    { label: ui.symbolLabel, value: f.symbol },
    { label: ui.hzLabel, value: `${f.hz} Hz` },
  ];
  // 음계는 계이름을 함께 준다 — 도·레·미가 몇 번째 음인지가 음계의 내용이다
  if (item.kind === 'scale' && notes.length === 7) {
    rows.push({ label: ui.degreeLabel, value: notes.map((_, i) => degreeName(i, lang)).join(' · ') });
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: `${prefix}/music` },
          { name: f.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(f.title, ui.metaDesc(f), path)} />

      <PageGlow accent="indigo" />
      <div className="h-1" style={{ background: color }} />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={homeHref} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`${prefix}/music`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium truncate">
            {ui.section}
          </Link>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-lg"
            style={{ background: color }}
          >
            <ToolIcon emoji={iconOf(item)} accent="rgba(255,255,255,0.55)" className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1.5">{f.title}</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 tabular-nums">
            {f.symbol} · {ui.countLabel(f.notes.length)} · {KIND_WORD[lang][item.kind]}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            {feelOf(item, lang)}
          </p>
        </div>

        <section className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-4 shadow-sm">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.keyboardLabel}</p>
          <MusicKeyboard
            notes={notes}
            color={color}
            lang={lang}
            accidental={accidentalOf(item)}
            playLabel={ui.playLabel}
            stopLabel={ui.stopLabel}
            freqs={frequencies(item)}
          />
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row" className="text-left px-4 py-3 font-bold text-slate-500 dark:text-slate-400 w-2/5 bg-slate-50 dark:bg-slate-900/40">
                    {r.label}
                  </th>
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100 tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.howTitle}</h2>
          <ul className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {ui.how.map(h => (
              <li key={h} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{h}</li>
            ))}
          </ul>
        </section>

        <Faq items={faq} lang={base} title={ui.faqTitle} />

        <section className="mt-8" aria-label={ui.relatedLabel}>
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.relatedLabel}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`${prefix}/music/${r.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:shadow-sm transition-all"
              >
                <span className="w-2.5 h-8 rounded-full shrink-0" style={{ background: colorOf(r) }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                    {titleOf(r, lang)}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 tabular-nums">{symbolOf(r)}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS8.filter(l => l.lang !== lang).map(l => (
            <Link
              key={l.lang}
              href={`${l.prefix}/music/${item.slug}`}
              hrefLang={l.hreflang}
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
