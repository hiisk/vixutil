'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { drawCards, TAROT_CARDS, MINOR_ARCANA, SUIT_INFO, type AnyTarotCard } from '@/lib/fortune-data';

/* ───── 공유 버튼 ───── */
function ShareBtn() {
  const [copied, setCopied] = useState(false);
  async function handleShare() {
    const url = window.location.href;
    const title = '타로 카드 뽑기 — vixutil.com';
    if (navigator.share) { try { await navigator.share({ title, url }); return; } catch {} }
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }
  return (
    <button onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-600 border border-slate-200 hover:border-amber-300 rounded-xl px-3 py-1.5 transition-all bg-white">
      {copied
        ? <><svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-amber-500">복사됨</span></>
        : <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>공유</>}
    </button>
  );
}

/* ───── 개별 카드 UI ───── */
function CardFace({ card, reversed, size = 'md' }: { card: AnyTarotCard; reversed: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'lg' ? 'h-64' : size === 'sm' ? 'h-36' : 'h-52';
  const w = size === 'lg' ? 'w-44' : size === 'sm' ? 'w-24' : 'w-36';
  const emojiSz = size === 'lg' ? 'text-5xl' : size === 'sm' ? 'text-2xl' : 'text-4xl';
  const nameSz  = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-[10px]' : 'text-sm';
  return (
    <div className={`${w} ${h} rounded-2xl flex flex-col items-center justify-center text-white border-4 border-white shadow-lg flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${card.color}cc, ${card.color})`, transform: reversed ? 'rotate(180deg)' : undefined }}>
      <div className={`${emojiSz} mb-2`}>{card.emoji}</div>
      <p className={`${nameSz} font-black text-center px-2 leading-tight`}>{card.name}</p>
      <span className={`mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${reversed ? 'bg-black/30' : 'bg-white/25'}`}>
        {reversed ? '역방향' : '정방향'}
      </span>
    </div>
  );
}

function CardBack({ onClick, size = 'md' }: { onClick?: () => void; size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'lg' ? 'h-64' : size === 'sm' ? 'h-36' : 'h-52';
  const w = size === 'lg' ? 'w-44' : size === 'sm' ? 'w-24' : 'w-36';
  return (
    <button onClick={onClick}
      className={`${w} ${h} rounded-2xl flex flex-col items-center justify-center bg-gradient-to-br from-violet-800 via-purple-900 to-slate-900 border-4 border-white/20 shadow-lg cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0`}>
      <div className="text-3xl text-purple-300 mb-2">✦</div>
      <p className="text-purple-300 text-xs font-semibold">클릭하여 뽑기</p>
    </button>
  );
}

function CardDetail({ card, reversed, position }: { card: AnyTarotCard; reversed: boolean; position?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      {position && <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">{position}</p>}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: card.color + '22' }}>
          {card.emoji}
        </div>
        <div>
          <p className="font-black text-slate-900 text-sm">{card.name}</p>
          <p className="text-xs text-slate-400">{card.nameEn}</p>
        </div>
        <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${reversed ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {reversed ? '⚠️ 역방향' : '✨ 정방향'}
        </span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{reversed ? card.reversed : card.upright}</p>
    </div>
  );
}

/* ───── 스프레드 타입 ───── */
const SPREADS = [
  { id: 'one',      label: '한 장',          icon: '🎴', desc: '오늘의 조언 한 장',       count: 1, positions: ['오늘의 메시지'] },
  { id: 'three',    label: '과거·현재·미래', icon: '⏳', desc: '시간의 흐름으로 보는 3장', count: 3, positions: ['과거', '현재', '미래'] },
  { id: 'love',     label: '연애 타로',       icon: '💕', desc: '관계의 세 가지 시선',      count: 3, positions: ['나의 감정', '상대의 감정', '우리의 결과'] },
  { id: 'decision', label: '선택·결정',       icon: '⚖️', desc: '두 가지 선택지 비교',      count: 2, positions: ['선택 A', '선택 B'] },
  { id: 'celtic',   label: '켈틱 크로스',     icon: '✝️', desc: '5장으로 보는 깊은 통찰',   count: 5, positions: ['현재 상황', '도전', '무의식', '조언', '결과'] },
] as const;

type SpreadId = typeof SPREADS[number]['id'];
type DrawnSet = { card: AnyTarotCard; reversed: boolean }[];

export default function TarotPage() {
  const [spreadId, setSpreadId]     = useState<SpreadId>('one');
  const [fullDeck, setFullDeck]     = useState(false);
  const [drawn, setDrawn]           = useState<DrawnSet | null>(null);
  const [revealed, setRevealed]     = useState<boolean[]>([]);
  const [showAllCards, setShowAllCards] = useState(false);
  const [showMinor, setShowMinor]   = useState<string | null>(null);

  const spread = SPREADS.find(s => s.id === spreadId)!;

  const handleDraw = useCallback(() => {
    const cards = drawCards(spread.count, fullDeck);
    setDrawn(cards);
    setRevealed(new Array(spread.count).fill(false));
  }, [spread.count, fullDeck]);

  const revealCard = useCallback((i: number) => {
    setRevealed(prev => { const next = [...prev]; next[i] = true; return next; });
  }, []);

  function handleSpreadChange(id: SpreadId) {
    setSpreadId(id);
    setDrawn(null);
    setRevealed([]);
  }

  const allRevealed = drawn !== null && revealed.every(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 flex-1">타로 카드</span>
          <ShareBtn />
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">🃏 타로 카드 뽑기</h1>
          <p className="text-sm text-slate-500 mt-1">스프레드를 선택하고 카드를 뽑아보세요</p>
        </div>

        {/* 스프레드 선택 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <p className="text-xs font-bold text-slate-400 mb-3">뽑기 방식</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SPREADS.map(s => (
              <button key={s.id} onClick={() => handleSpreadChange(s.id)}
                className={`rounded-xl p-3 text-left transition-all border ${
                  spreadId === s.id ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                }`}>
                <span className="text-lg">{s.icon}</span>
                <p className={`text-xs font-bold mt-1 ${spreadId === s.id ? 'text-white' : 'text-slate-700'}`}>{s.label}</p>
                <p className={`text-[10px] mt-0.5 ${spreadId === s.id ? 'text-amber-100' : 'text-slate-400'}`}>{s.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 덱 선택 */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3">
          <p className="text-xs font-bold text-slate-500 flex-1">사용할 덱</p>
          <div className="flex gap-2">
            {[false, true].map(isFull => (
              <button key={String(isFull)} onClick={() => { setFullDeck(isFull); setDrawn(null); setRevealed([]); }}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  fullDeck === isFull ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-200 text-slate-500 hover:border-amber-300'
                }`}>
                {isFull ? `전체 덱 (78장)` : `메이저 아르카나 (22장)`}
              </button>
            ))}
          </div>
        </div>

        {/* 카드 영역 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          {!drawn ? (
            <div className="flex flex-col items-center gap-5 py-4">
              <div className="flex gap-3 justify-center">
                {Array.from({ length: spread.count }).map((_, i) => (
                  <CardBack key={i} size={spread.count === 1 ? 'lg' : spread.count >= 4 ? 'sm' : 'md'} />
                ))}
              </div>
              <button onClick={handleDraw}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all text-sm">
                ✦ {spread.label} 뽑기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* 포지션 레이블 + 카드 */}
              <div className="flex gap-3 justify-center items-end flex-wrap">
                {drawn.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{spread.positions[i]}</span>
                    {revealed[i]
                      ? <CardFace card={item.card} reversed={item.reversed} size={spread.count === 1 ? 'lg' : spread.count >= 4 ? 'sm' : 'md'} />
                      : <CardBack size={spread.count === 1 ? 'lg' : spread.count >= 4 ? 'sm' : 'md'} onClick={() => revealCard(i)} />}
                  </div>
                ))}
              </div>
              {!allRevealed && (
                <p className="text-center text-xs text-slate-400">카드를 하나씩 클릭해서 뒤집어보세요</p>
              )}
              {allRevealed && (
                <button onClick={handleDraw}
                  className="w-full py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:border-amber-300 hover:text-amber-600 transition-all">
                  다시 뽑기
                </button>
              )}
            </div>
          )}
        </div>

        {/* 카드 해석 */}
        {drawn && allRevealed && (
          <div className="space-y-3">
            {drawn.map((item, i) => (
              <CardDetail key={i} card={item.card} reversed={item.reversed} position={spread.positions[i]} />
            ))}
          </div>
        )}

        {/* 전체 카드 목록 */}
        <div className="space-y-2">
          <button onClick={() => setShowAllCards(v => !v)}
            className="w-full py-3 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:border-amber-300 hover:text-amber-600 transition-all bg-white">
            {showAllCards ? '목록 닫기 ▲' : '전체 카드 목록 보기 (22 + 56 = 78장) ▼'}
          </button>

          {showAllCards && (
            <div className="space-y-3">
              {/* 메이저 아르카나 */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <p className="text-sm font-black text-slate-700 mb-3">🌟 메이저 아르카나 (22장)</p>
                <div className="grid grid-cols-2 gap-2">
                  {TAROT_CARDS.map(c => (
                    <div key={c.id} className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: c.color + '22' }}>{c.emoji}</div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700 truncate">{c.id}. {c.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{c.nameEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 마이너 아르카나 — 수트별 */}
              {(Object.keys(SUIT_INFO) as (keyof typeof SUIT_INFO)[]).map(suit => {
                const info = SUIT_INFO[suit];
                const cards = MINOR_ARCANA.filter(c => c.suit === suit);
                const open = showMinor === suit;
                return (
                  <div key={suit} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <button onClick={() => setShowMinor(open ? null : suit)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                      <span className="text-2xl">{info.emoji}</span>
                      <div className="text-left flex-1">
                        <p className="text-sm font-black text-slate-700">{info.name} ({info.nameEn})</p>
                        <p className="text-xs text-slate-400">{info.theme} · 14장</p>
                      </div>
                      <span className="text-slate-400 text-sm">{open ? '▲' : '▼'}</span>
                    </button>
                    {open && (
                      <div className="border-t border-slate-100 px-4 pb-4">
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {cards.map(c => (
                            <div key={`${c.suit}-${c.rank}`} className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: info.color + '22' }}>{c.emoji}</div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-700 truncate">{c.name}</p>
                                <p className="text-[10px] text-slate-400 truncate">{c.nameEn}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
