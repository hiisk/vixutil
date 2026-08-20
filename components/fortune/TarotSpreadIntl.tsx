'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import { drawCards, SUIT_INFO, TAROT_CARDS, MINOR_ARCANA, type AnyTarotCard } from '@/lib/fortune-data';
import { TAROT_READINGS } from '@/lib/tarot-intl';
import { SPREADS_INTL, SPREAD_SHAPE, SPREAD_UI, SUIT_INTL, type TarotSpreadLang } from '@/lib/tarot-spread-intl';

/**
 * 78장 풀덱 스프레드 리더의 번역 화면.
 *
 * 뽑기·섞기·역방향 확률은 한국어와 같은 drawCards를 쓴다. 그래야 같은 스프레드가
 * 세 언어에서 같은 성질로 돌아간다 — 여기서 갈리는 건 문구뿐이다.
 *
 * 한국어 /fortune/tarot은 SECTION_FAQ·ReferralCards·SiteFooter에 묶여 있어
 * 그대로 재사용할 수 없다. 다른 섹션의 ShellIntl과 같은 이유로 별도 파일이다.
 */
type Drawn = { card: AnyTarotCard; reversed: boolean }[];

/** 카드 이름 — 영어는 nameEn을 그대로, 중국어는 사전에서 */
function cardName(card: AnyTarotCard, lang: TarotSpreadLang): string {
  return card.nameEn;
}

export default function TarotSpreadIntl({ lang }: { lang: TarotSpreadLang }) {
  const ui = SPREAD_UI[lang];
  const spreads = SPREADS_INTL[lang];
  const suits = SUIT_INTL[lang];

  const [spreadId, setSpreadId] = useState('three');
  const [fullDeck, setFullDeck] = useState(true);
  const [drawn, setDrawn] = useState<Drawn | null>(null);
  const [shown, setShown] = useState<number[]>([]);
  const [tab, setTab] = useState<'draw' | 'list'>('draw');

  const shape = SPREAD_SHAPE.find(s => s.id === spreadId)!;
  const copy = spreads[spreadId];

  const draw = useCallback(() => {
    setDrawn(drawCards(shape.count, fullDeck));
    // 한 장 스프레드는 뒤집을 것이 하나뿐이라 바로 열어 준다
    setShown(shape.count === 1 ? [0] : []);
  }, [shape.count, fullDeck]);

  const reveal = (i: number) => setShown(prev => (prev.includes(i) ? prev : [...prev, i]));
  const revealAll = () => setShown(drawn ? drawn.map((_, i) => i) : []);
  const allShown = drawn !== null && shown.length === drawn.length;

  return (
    <div className="page-wrap">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />

      <header className="page-head">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href={`/${lang}`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 font-medium">
            {ui.home}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href={`/${lang}/fortune`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 font-medium">
            {ui.section}
          </Link>
          <span className="ml-auto flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/fortune/tarot" className="hover:text-violet-600" hrefLang="ko">한국어</Link>
          </span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route={"/fortune/tarot"} available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 text-3xl bg-sec-soft shadow-sm">
            <span>🃏</span>
          </div>
          <div className="hero-band">
            <PageHero title={ui.h1} desc={ui.lead} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {(['draw', 'list'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                tab === t
                  ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t === 'draw' ? ui.tabDraw : ui.tabList}
            </button>
          ))}
        </div>

        {tab === 'draw' ? (
          <>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">{ui.spreadTitle}</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {SPREAD_SHAPE.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSpreadId(s.id); setDrawn(null); setShown([]); }}
                  className={`rounded-xl border px-3.5 py-3 text-left transition-colors ${
                    spreadId === s.id
                      ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40'
                      : 'chip-off hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <ToolIcon emoji={s.icon} className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className={`text-sm font-bold ${spreadId === s.id ? 'text-violet-700 dark:text-violet-300' : 'text-slate-700 dark:text-slate-200'}`}>
                      {spreads[s.id].label}
                    </span>
                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {ui.cardCount(s.count)}
                    </span>
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-1">{spreads[s.id].desc}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-5">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex-1">{ui.deckTitle}</p>
              {[true, false].map(full => (
                <button
                  key={String(full)}
                  onClick={() => { setFullDeck(full); setDrawn(null); setShown([]); }}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                    fullDeck === full
                      ? 'border-violet-300 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {full ? ui.fullDeck : ui.majorOnly}
                </button>
              ))}
            </div>

            {drawn === null ? (
              <button
                onClick={draw}
                className="w-full rounded-xl bg-sec font-bold py-3.5 text-sm shadow-sm hover:opacity-90 transition-opacity"
              >
                {ui.drawBtn(copy.label, shape.count)}
              </button>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {drawn.map((d, i) => {
                    const open = shown.includes(i);
                    const reading = TAROT_READINGS[lang][d.card.id];
                    return (
                      <div key={`${d.card.id}-${i}`} className="rounded-lg border chip-off p-3.5">
                        <p className="text-[10px] font-bold text-violet-500 uppercase tracking-wide mb-1.5">{copy.positions[i]}</p>
                        {open ? (
                          <>
                            <p className="text-2xl mb-1">{d.card.emoji}</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                              {cardName(d.card, lang)}
                            </p>
                            <p className={`text-[11px] font-bold mt-0.5 ${d.reversed ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {d.reversed ? ui.reversed : ui.upright}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{copy.posDesc[i]}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                              {d.reversed ? reading.reversed : reading.upright}
                            </p>
                          </>
                        ) : (
                          <button
                            onClick={() => reveal(i)}
                            className="w-full rounded-xl bg-sec py-8 text-xs font-bold hover:opacity-90 transition-opacity"
                          >
                            {ui.tapToReveal}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  {allShown ? (
                    <p className="col-span-1 flex items-center justify-center text-xs font-medium text-slate-500 dark:text-slate-400">
                      {ui.revealed(shown.length, drawn.length)}
                    </p>
                  ) : (
                    <button
                      onClick={revealAll}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3 text-sm text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      {ui.revealAll}
                    </button>
                  )}
                  <button
                    onClick={draw}
                    className="rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 transition-opacity"
                  >
                    🔄 {ui.drawAgain}
                  </button>
                </div>
              </>
            )}

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 leading-relaxed">{ui.privacy}</p>
          </>
        ) : (
          <>
            <h2 className="sec-h2">{ui.majorHeading}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-7">
              {TAROT_CARDS.map(c => (
                <div key={c.id} className="rounded-xl border chip-off px-3 py-2.5">
                  <p className="text-lg">{c.emoji}</p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-tight">
                    {c.nameEn}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="sec-h2">{ui.minorHeading}</h2>
            {(Object.keys(SUIT_INFO) as (keyof typeof SUIT_INFO)[]).map(suit => (
              <section key={suit} className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: SUIT_INFO[suit].color }}>
                  {SUIT_INFO[suit].emoji} {suits[suit].name} — {suits[suit].theme}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MINOR_ARCANA.filter(c => c.suit === suit).map(c => {
                    // getFullDeck()이 22부터 순서대로 매기므로 배열 위치가 곧 id다
                    const id = 22 + MINOR_ARCANA.indexOf(c);
                    return (
                      <div key={id} className="rounded-xl border chip-off px-3 py-2.5">
                        <p className="text-lg">{c.emoji}</p>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-tight">
                          {c.nameEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        )}

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-9 leading-relaxed">{ui.disclaimer}</p>
      </main>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={`/${lang}`} className="text-sm font-bold text-violet-600">vixutil</Link>
      </footer>
    </div>
  );
}
