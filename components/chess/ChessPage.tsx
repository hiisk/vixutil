import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import PageGlow from '@/components/PageGlow';
import Faq from '@/components/Faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import StepBoard from '@/components/chess/StepBoard';
import { LANGS10, prefix10, type Lang10 } from '@/lib/i18n/lang10';
import { openingOf } from '@/lib/chess/list';
import { openingFacts } from '@/lib/chess/facts';
import { fullName } from '@/lib/chess/names';
import { chessUi, fill } from '@/lib/chess/ui';

/**
 * 오프닝 한 장 — 판, 수순, 그 자리에서 읽어낸 것들.
 *
 * 문장은 전부 계산에서 나온다. "중앙 네 칸 가운데 d4·e5에 폰이 서 있습니다"는
 * 그 자리를 세어 만든 말이라 수순이 바뀌면 문장도 함께 바뀐다. 손으로 적은
 * 소개글은 수순이 바뀌어도 그대로 남아 어긋나지만, 이쪽은 어긋날 수가 없다.
 */
export default function ChessPage({ slug, lang }: { slug: string; lang: Lang10 }) {
  const x = openingOf(slug);
  if (!x) return null;
  const f = openingFacts(x);
  const ui = chessUi(lang);
  const name = fullName(x.family, x.line, lang);
  const prefix = prefix10(lang);
  const homeHref = lang === 'ko' ? '/' : prefix || '/';
  const hub = `${prefix}/game/chess`;
  const path = `${hub}/${slug}`;
  const base = lang === 'ko' ? 'ko' : 'en';
  const side = f.turn === 'w' ? ui.white : ui.black;
  const plies = fill(f.ply === 1 ? ui.movesOne : ui.moves, { n: f.ply });

  const castleLine = f.castled.w && f.castled.b
    ? ui.castlingBoth
    : f.castled.w
      ? fill(ui.castling, { side: ui.white })
      : f.castled.b
        ? fill(ui.castling, { side: ui.black })
        : ui.castlingNone;

  const story = [
    ui.trait[f.traits[0]],
    ui.trait[f.traits[1]],
    f.centre.length ? fill(ui.centre, { sq: f.centre.join(' · ') }) : ui.centreNone,
    f.captures ? fill(ui.captures, { n: f.captures }) : ui.capturesNone,
    castleLine,
    ...(f.mate ? [ui.mate] : f.check ? [ui.check] : []),
  ];

  const rows: [string, string][] = [
    [ui.plyLabel, plies],
    [ui.turn, side],
    [ui.replies, String(f.replies)],
    [ui.developed, `${ui.white} ${f.developed.w} · ${ui.black} ${f.developed.b}`],
    [ui.material, f.material.w === f.material.b ? ui.materialEven : `${f.material.w} · ${f.material.b}`],
    [ui.rights, f.rights || ui.rightsNone],
    [ui.fen, f.fen],
  ];

  const faq = [
    { q: fill(ui.q1, { name }), a: f.line },
    { q: ui.q2, a: `${ui.group[f.group]} — ${ui.groupNote[f.group]}` },
    { q: ui.q3, a: fill(ui.a3, { n: f.ply, side }) },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.home, path: homeHref },
          { name: ui.section, path: hub },
          { name, path },
        ])}
      />

      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-violet-600 to-indigo-500" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={hub} className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 transition-colors font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.section}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{name}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-5">
          <p className="text-xs font-bold text-violet-700 dark:text-violet-400 mb-1">{ui.group[f.group]}</p>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{name}</h1>
          <p className="font-mono text-sm text-slate-600 dark:text-slate-300 break-words">{f.line}</p>
        </div>

        <section className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-4">
          <h2 className="sr-only">{ui.step}</h2>
          <StepBoard
            frames={f.frames}
            san={f.san}
            labels={{ start: ui.start, prev: ui.prev, next: ui.next, end: ui.end, hint: ui.stepHint }}
            boardLabel={fill(ui.boardAlt, { name })}
          />
        </section>

        <p className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          {story.join(' ')}
        </p>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">{ui.position}</h2>
          <dl className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
                <dt className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{k}</dt>
                <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 text-right break-all font-mono">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.movesTitle}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{ui.movesNote}</p>
          <ol className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {f.steps.map((step, i) => (
              <li key={`${step.san}-${i}`} className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900">
                <span className="shrink-0 w-14 font-mono text-xs font-bold text-slate-400 dark:text-slate-500 tabular-nums">
                  {step.no}{step.side === 'w' ? '.' : '…'}
                </span>
                <span className="shrink-0 w-16 font-mono text-sm font-black text-violet-700 dark:text-violet-400">{step.san}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {step.side === 'w' ? ui.white : ui.black}: {ui.piece[step.piece]} {step.from}→{step.to}
                  {step.castle ? ` (${ui.castleTag})` : ''}
                  {step.capture ? ` (${ui.captureTag})` : ''}
                  {step.check ? ` (${ui.checkTag})` : ''}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {f.siblings.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{ui.related}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
              {fill(ui.sharedWith, { n: f.sharedPly })}
            </p>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {f.siblings.map(kin => {
                const y = openingOf(kin);
                if (!y) return null;
                // 앞수가 같으니 그 뒤부터 보여 준다 — 같은 수를 여섯 줄 늘어놓으면
                // 무엇이 다른지가 안 보인다
                let same = 0;
                while (same < y.moves.length && y.moves[same] === x.moves[same]) same++;
                const diff = y.moves.slice(same, same + 4);
                // 앞수를 통째로 나눠 갖는 짧은 수순은 갈라지는 수가 없다 — 그때는 끝쪽을 보인다
                const preview = diff.length
                  ? `…${diff.join(' ')}`
                  : y.moves.length > 3 ? `…${y.moves.slice(-3).join(' ')}` : y.moves.join(' ');
                return (
                  <Link
                    key={kin}
                    href={`${hub}/${kin}`}
                    className="flex items-baseline gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{fullName(y.family, y.line, lang)}</span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      {preview}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <Faq items={faq} lang={base} title={ui.faq} />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs font-bold text-slate-400 dark:text-slate-500" aria-label="Language">
          {LANGS10.filter(l => l.lang !== lang).map(l => (
            <Link key={l.lang} href={`${l.prefix}/game/chess/${slug}`} hrefLang={l.hreflang} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter lang={base} />
    </div>
  );
}
