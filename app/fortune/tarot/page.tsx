'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { drawTarotCard, TAROT_CARDS } from '@/lib/fortune-data';

type DrawnCard = ReturnType<typeof drawTarotCard>;

function ShareBtn({ cardName }: { cardName?: string }) {
  const [copied, setCopied] = useState(false);
  async function handleShare() {
    const url = window.location.href;
    const title = cardName ? `타로 카드: ${cardName} — vixutil.com` : '타로 카드 뽑기 — vixutil.com';
    if (navigator.share) { try { await navigator.share({ title, url }); return; } catch {} }
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }
  return (
    <button onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-600 border border-slate-200 hover:border-amber-300 rounded-xl px-3 py-1.5 transition-all bg-white">
      {copied ? (
        <><svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-amber-500">복사됨</span></>
      ) : (
        <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>공유</>
      )}
    </button>
  );
}

export default function TarotPage() {
  const [drawn, setDrawn] = useState<DrawnCard | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const draw = useCallback(() => {
    setFlipped(false);
    setDrawn(null);
    setTimeout(() => {
      setDrawn(drawTarotCard());
      setTimeout(() => setFlipped(true), 300);
    }, 100);
  }, []);

  const { card, reversed } = drawn ?? {};

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
          <ShareBtn cardName={card?.name} />
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-900">🃏 타로 카드 뽑기</h1>
          <p className="text-sm text-slate-500 mt-1">22장의 메이저 아르카나 중 한 장을 뽑아보세요</p>
        </div>

        {/* 뽑기 버튼 & 카드 */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* 카드 */}
          <div
            className="relative w-44 h-72 cursor-pointer select-none"
            onClick={drawn ? undefined : draw}
            style={{ perspective: '800px' }}
          >
            <div className={`relative w-full h-full transition-all duration-700`}
              style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              {/* 앞면 (뒤집히기 전) */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}>
                <div className="w-full h-full bg-gradient-to-br from-violet-800 via-purple-900 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3">✦</div>
                    <p className="text-purple-300 text-sm font-semibold">카드를 뽑으세요</p>
                  </div>
                </div>
              </div>
              {/* 뒷면 (뒤집힌 후) */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: card?.color ?? '#6366f1' }}>
                <div className={`w-full h-full flex flex-col items-center justify-center text-white p-4 ${reversed ? 'rotate-180' : ''}`}>
                  <div className="text-6xl mb-3">{card?.emoji}</div>
                  <p className="text-lg font-black text-center leading-tight">{card?.name}</p>
                  <p className="text-xs text-white/70 mt-1">{card?.nameEn}</p>
                  <p className="text-xs mt-3 px-2 py-1 rounded-full"
                    style={{ background: reversed ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)' }}>
                    {reversed ? '역방향' : '정방향'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          {!drawn ? (
            <button
              onClick={draw}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all text-sm"
            >
              ✦ 카드 뽑기
            </button>
          ) : (
            <button
              onClick={draw}
              className="px-6 py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:border-amber-300 hover:text-amber-600 transition-all"
            >
              다시 뽑기
            </button>
          )}
        </div>

        {/* 카드 해석 */}
        {card && flipped && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: card.color + '22' }}>
                  {card.emoji}
                </div>
                <div>
                  <p className="font-black text-slate-900">{card.name} {reversed ? '(역방향)' : '(정방향)'}</p>
                  <p className="text-xs text-slate-400">{card.nameEn} · {card.id}번 카드</p>
                </div>
              </div>
              <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-3 ${
                reversed ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {reversed ? '⚠️ 역방향' : '✨ 정방향'}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {reversed ? card.reversed : card.upright}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-700 mb-1">💡 오늘의 메시지</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                {reversed
                  ? `오늘은 ${card.reversed.split(',')[0].toLowerCase()}에 주의하세요. 충분히 돌아보고 신중하게 행동하면 좋은 결과를 만들 수 있습니다.`
                  : `오늘은 ${card.upright.split(',')[0].toLowerCase()}이 함께합니다. 이 기운을 잘 활용하면 하루가 더욱 빛날 것입니다.`}
              </p>
            </div>
          </div>
        )}

        {/* 전체 카드 목록 */}
        <div className="mt-8">
          <button
            onClick={() => setShowAll(v => !v)}
            className="w-full py-3 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:border-amber-300 hover:text-amber-600 transition-all"
          >
            {showAll ? '목록 닫기 ▲' : '22장 메이저 아르카나 전체 보기 ▼'}
          </button>
          {showAll && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {TAROT_CARDS.map(c => (
                <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: c.color + '22' }}>
                    {c.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">{c.id}. {c.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{c.nameEn}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
