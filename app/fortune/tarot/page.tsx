'use client';
import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { drawCards, TAROT_CARDS, MINOR_ARCANA, SUIT_INFO, type AnyTarotCard } from '@/lib/fortune-data';
import Faq from '@/components/Faq';
import ReferralCards from '@/components/ReferralCards';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';

/* ═══════════════════════════════════════════
   스프레드 정의
═══════════════════════════════════════════ */
const SPREADS = [
  {
    id: 'one' as const,
    label: '한 장',
    icon: '✦',
    count: 1,
    desc: '오늘의 메시지 한 장',
    positions: ['오늘의 메시지'],
    posDesc: ['지금 당신에게 필요한 단 하나의 메시지'],
  },
  {
    id: 'three' as const,
    label: '과거·현재·미래',
    icon: '⏳',
    count: 3,
    desc: '시간의 흐름으로 보는 3장',
    positions: ['과거', '현재', '미래'],
    posDesc: ['지금 상황에 영향을 준 과거', '현재 처한 상황의 핵심', '이 흐름이 향하는 방향'],
  },
  {
    id: 'relationship' as const,
    label: '관계 타로',
    icon: '💕',
    count: 5,
    desc: '관계를 다각도로 보는 5장',
    positions: ['나의 상황', '상대의 상황', '관계의 핵심', '장애물', '앞으로의 결과'],
    posDesc: ['나 자신의 감정과 현재 상태', '상대방의 감정과 현재 상태', '이 관계에서 가장 중요한 에너지', '두 사람 사이를 가로막는 것', '이 관계가 나아갈 방향'],
  },
  {
    id: 'celtic' as const,
    label: '켈틱 크로스',
    icon: '✝️',
    count: 10,
    desc: '10장 풀 켈틱 크로스',
    positions: [
      '현재 상황', '가로막는 것', '의식·목표', '무의식·기반',
      '지나온 과거', '다가올 미래', '나의 태도',
      '외부 환경', '희망과 두려움', '최종 결과',
    ],
    posDesc: [
      '지금 이 순간 당신이 처한 핵심 상황',
      '당신의 길을 가로막거나 도전하는 에너지',
      '당신이 의식적으로 바라고 생각하는 것',
      '무의식 속 깔려있는 감정과 기반',
      '이 상황에 영향을 준 최근 과거',
      '조만간 다가올 가능성 있는 사건',
      '이 상황에서 당신이 취하는 태도·입장',
      '주변 환경과 외부 요인의 영향',
      '당신이 품고 있는 희망 또는 두려움',
      '모든 흐름이 향하는 최종 결과',
    ],
  },
] as const;
type SpreadId = typeof SPREADS[number]['id'];
type Spread = typeof SPREADS[number];
type DrawnSet = { card: AnyTarotCard; reversed: boolean }[];

/* ═══════════════════════════════════════════
   카드 컴포넌트
═══════════════════════════════════════════ */
type CardSize = 'xs' | 'sm' | 'md' | 'lg';

const CARD_DIMS: Record<CardSize, { w: number; h: number; emoji: string; name: string }> = {
  xs: { w: 52,  h: 84,  emoji: 'text-xl',   name: 'text-[9px]' },
  sm: { w: 68,  h: 108, emoji: 'text-2xl',  name: 'text-[10px]' },
  md: { w: 96,  h: 152, emoji: 'text-4xl',  name: 'text-xs' },
  lg: { w: 148, h: 236, emoji: 'text-6xl',  name: 'text-base' },
};

function TarotCardFront({ card, reversed, size = 'md', onClick }:
  { card: AnyTarotCard; reversed: boolean; size?: CardSize; onClick?: () => void }) {
  const d = CARD_DIMS[size];
  return (
    <button
      onClick={onClick}
      style={{ width: d.w, height: d.h, background: `linear-gradient(150deg, ${card.color}dd 0%, ${card.color} 100%)` }}
      className="rounded-xl border-[3px] border-white shadow-md flex flex-col items-center justify-center gap-1 text-white transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
    >
      <div className={`${d.emoji} ${reversed ? 'rotate-180' : ''} transition-transform leading-none`}>{card.emoji}</div>
      <p className={`${d.name} font-bold text-center leading-tight px-1`}>{card.name}</p>
      {size !== 'xs' && (
        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${reversed ? 'bg-black/30' : 'bg-white/25 dark:bg-slate-900/25'}`}>
          {reversed ? '역' : '정'}
        </span>
      )}
    </button>
  );
}

function TarotCardBack({ size = 'md', label, onClick }:
  { size?: CardSize; label?: string; onClick?: () => void }) {
  const d = CARD_DIMS[size];
  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
      {label && <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 text-center leading-tight">{label}</span>}
      <button
        onClick={onClick}
        style={{ width: d.w, height: d.h }}
        className="rounded-xl border-[3px] border-purple-300/30 shadow-md flex flex-col items-center justify-center gap-1 cursor-pointer hover:opacity-80 active:scale-95 transition-all flex-shrink-0 bg-gradient-to-br from-violet-900 via-purple-950 to-slate-900"
      >
        <div className="text-purple-400 text-lg leading-none">✦</div>
        {size !== 'xs' && <p className="text-[9px] text-purple-400 font-semibold text-center leading-tight px-1">클릭하여<br/>공개</p>}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   스프레드 레이아웃 컴포넌트
═══════════════════════════════════════════ */
function SlotCard({ idx, drawn, revealed, spread, onReveal, size = 'sm' }:
  { idx: number; drawn: DrawnSet | null; revealed: boolean[]; spread: Spread; onReveal: (i: number) => void; size?: CardSize }) {
  const item = drawn?.[idx];
  const isRevealed = revealed[idx];
  const label = spread.positions[idx];

  if (!drawn) {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 text-center leading-tight">{label}</span>
        <div style={{ width: CARD_DIMS[size].w, height: CARD_DIMS[size].h }}
          className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 flex-shrink-0" />
      </div>
    );
  }
  if (!isRevealed) {
    return <TarotCardBack size={size} label={label} onClick={() => onReveal(idx)} />;
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 text-center leading-tight">{label}</span>
      <TarotCardFront card={item!.card} reversed={item!.reversed} size={size} />
    </div>
  );
}

/* 한 장 */
function OneLayout({ drawn, revealed, onReveal }: LayoutProps) {
  return (
    <div className="flex justify-center py-4">
      {!drawn ? (
        <div style={{ width: CARD_DIMS.lg.w, height: CARD_DIMS.lg.h }}
          className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" />
      ) : !revealed[0] ? (
        <TarotCardBack size="lg" label="오늘의 메시지" onClick={() => onReveal(0)} />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">오늘의 메시지</p>
          <TarotCardFront card={drawn[0].card} reversed={drawn[0].reversed} size="lg" />
        </div>
      )}
    </div>
  );
}

/* 3장 */
function ThreeLayout({ drawn, revealed, spread, onReveal }: LayoutProps) {
  return (
    <div className="flex justify-center gap-3 py-4 flex-wrap">
      {[0, 1, 2].map(i => (
        <SlotCard key={i} idx={i} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size="md" />
      ))}
    </div>
  );
}

/* 5장 관계 타로: 위 2장 + 아래 3장 */
function RelationshipLayout({ drawn, revealed, spread, onReveal }: LayoutProps) {
  return (
    <div className="space-y-3 py-2">
      <div className="flex justify-center gap-3">
        {[0, 1].map(i => <SlotCard key={i} idx={i} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size="sm" />)}
      </div>
      <div className="flex justify-center gap-3">
        {[2, 3, 4].map(i => <SlotCard key={i} idx={i} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size="sm" />)}
      </div>
    </div>
  );
}

/* 켈틱 크로스 10장 */
function CelticLayout({ drawn, revealed, spread, onReveal }: LayoutProps) {
  /*
    Layout (grid col × row):
         [2]  [1]       → cross row 1: 의식(2)=col2 / 현재(0)=col3
    [4]  [0x] [5]  [9]  → cross row 2: 과거(4)=col1 / center / 미래(5)=col4 / 결과(9)=col6
         [3]            → cross row 3: 무의식(3)=col2-3
         [1]            → cross row 4: 가로막음(1)=col2-3

    Pillar (right col): bottom→top = pos6(태도=idx6), pos7(외부=idx7), pos8(희망=idx8), pos9(결과=idx9)
    ...

    Simpler: use a CSS grid
    Rows: 4 rows
    Cols: 5 cols (past, empty, center, future, gap, pillar)

    Grid areas:
    row0: .    c2  .   .  p9
    row1: c4   c0  c5  .  p8
    row2: .    c1  .   .  p7
    row3: .    c3  .   .  p6
  */

  const SIZE: CardSize = 'xs';
  const d = CARD_DIMS[SIZE];

  // Grid: 5 columns [past, center-left, center, center-right, pillar]
  // Actually simpler: explicit grid-template-areas
  return (
    <div className="py-2 overflow-x-auto">
      <div style={{
        display: 'grid',
        gridTemplateColumns: `${d.w}px ${d.w}px ${d.w}px 16px ${d.w}px`,
        gridTemplateRows: `auto auto auto auto`,
        gap: '8px',
        width: 'fit-content',
        margin: '0 auto',
      }}>
        {/* Row 0: . [의식/2] . . [결과/9] */}
        <div />
        <SlotCard idx={2} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />
        <div />
        <div />
        <SlotCard idx={9} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />

        {/* Row 1: [과거/4] [현재/0] [미래/5] . [희망/8] */}
        <SlotCard idx={4} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />
        <SlotCard idx={0} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />
        <SlotCard idx={5} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />
        <div />
        <SlotCard idx={8} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />

        {/* Row 2: . [가로막음/1] . . [외부/7] */}
        <div />
        <SlotCard idx={1} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />
        <div />
        <div />
        <SlotCard idx={7} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />

        {/* Row 3: . [무의식/3] . . [태도/6] */}
        <div />
        <SlotCard idx={3} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />
        <div />
        <div />
        <SlotCard idx={6} drawn={drawn} revealed={revealed} spread={spread} onReveal={onReveal} size={SIZE} />
      </div>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 max-w-xs mx-auto">
        {spread.positions.map((pos, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`text-[10px] font-black w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
              revealed[i] ? 'bg-amber-400 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
            }`}>{i + 1}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{pos}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type LayoutProps = {
  drawn: DrawnSet | null;
  revealed: boolean[];
  spread: Spread;
  onReveal: (i: number) => void;
};

function SpreadLayout(props: LayoutProps) {
  const id = props.spread.id;
  if (id === 'one')          return <OneLayout          {...props} />;
  if (id === 'three')        return <ThreeLayout        {...props} />;
  if (id === 'relationship') return <RelationshipLayout {...props} />;
  if (id === 'celtic')       return <CelticLayout       {...props} />;
  return null;
}

/* ═══════════════════════════════════════════
   카드 해석 섹션
═══════════════════════════════════════════ */
function CardInterpretation({ drawn, spread }: { drawn: DrawnSet; spread: Spread }) {
  return (
    <div className="space-y-3 mt-2">
      <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">카드 해석</p>
      {drawn.map((item, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-50"
            style={{ borderLeft: `4px solid ${item.card.color}` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: item.card.color + '18' }}>
              {item.card.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">#{i + 1} {spread.positions[i]}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.reversed ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500' : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600'}`}>
                  {item.reversed ? '역방향' : '정방향'}
                </span>
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-slate-100 mt-0.5">{item.card.name}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{item.card.nameEn}</p>
            </div>
          </div>
          <div className="px-4 py-3 space-y-2">
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{item.reversed ? item.card.reversed : item.card.upright}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">{spread.posDesc[i]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   카드 목록 탭
═══════════════════════════════════════════ */
function CatalogTab() {
  const [openSuit, setOpenSuit] = useState<string | null>(null);
  const [selected, setSelected] = useState<AnyTarotCard | null>(null);

  const majorCards = TAROT_CARDS.map(c => ({ ...c, suit: undefined as undefined, rank: undefined as undefined }));

  return (
    <div className="space-y-4">
      {/* 메이저 아르카나 */}
      <div>
        <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">메이저 아르카나 — 22장</p>
        <div className="grid grid-cols-3 gap-2">
          {majorCards.map(c => (
            <button key={c.id} onClick={() => setSelected(selected?.id === c.id ? null : c)}
              className={`rounded-xl p-2.5 text-left transition-all border ${
                selected?.id === c.id ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: c.color + '22' }}>{c.emoji}</div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{c.id}</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{c.name}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{c.nameEn}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 마이너 아르카나 */}
      <div>
        <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">마이너 아르카나 — 56장</p>
        <div className="space-y-2">
          {(Object.entries(SUIT_INFO) as [keyof typeof SUIT_INFO, typeof SUIT_INFO[keyof typeof SUIT_INFO]][]).map(([suit, info]) => {
            const cards = MINOR_ARCANA.filter(c => c.suit === suit);
            const open = openSuit === suit;
            return (
              <div key={suit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenSuit(open ? null : suit)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: info.color + '22' }}>{info.emoji}</div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">{info.name} <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">({info.nameEn})</span></p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{info.theme} · 14장</p>
                  </div>
                  <svg className={`w-4 h-4 text-slate-300 dark:text-slate-600 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open && (
                  <div className="border-t border-slate-100 dark:border-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {cards.map(c => (
                        <button key={`${c.suit}-${c.rank}`}
                          onClick={() => {
                            const full = { ...c, id: 22 + MINOR_ARCANA.indexOf(c), color: info.color };
                            setSelected(selected?.name === c.name ? null : full as AnyTarotCard);
                          }}
                          className={`rounded-xl p-2 text-left transition-all border ${
                            selected?.name === c.name ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30' : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-slate-200'
                          }`}>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-base">{c.emoji}</span>
                            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-tight truncate">{c.name}</p>
                          </div>
                          <p className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{c.nameEn}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 선택된 카드 상세 */}
      {selected && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden sticky bottom-4 shadow-lg">
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderLeft: `4px solid ${selected.color}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: selected.color + '22' }}>{selected.emoji}</div>
            <div className="flex-1">
              <p className="font-black text-slate-900 dark:text-slate-100 text-sm">{selected.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{selected.nameEn}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-slate-300 dark:text-slate-600 hover:text-slate-500 text-lg leading-none">×</button>
          </div>
          <div className="px-4 pb-4 space-y-2">
            <div className="flex gap-2">
              <span className="text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-bold px-2 py-1 rounded-lg">✨ 정방향</span>
              <span className="text-xs bg-rose-50 dark:bg-rose-950/30 text-rose-500 font-bold px-2 py-1 rounded-lg">⚠️ 역방향</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200">{selected.upright}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2">{selected.reversed}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   메인 페이지
═══════════════════════════════════════════ */
type Tab = 'draw' | 'catalog';

export default function TarotPage() {
  const [tab, setTab]           = useState<Tab>('draw');
  const [spreadId, setSpreadId] = useState<SpreadId>('one');
  const [fullDeck, setFullDeck] = useState(false);
  const [drawn, setDrawn]       = useState<DrawnSet | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [copied, setCopied]     = useState(false);
  const resultRef               = useRef<HTMLDivElement>(null);

  const spread = SPREADS.find(s => s.id === spreadId)!;
  const allRevealed = drawn !== null && revealed.length > 0 && revealed.every(Boolean);
  const anyRevealed = revealed.some(Boolean);

  const handleDraw = useCallback(() => {
    const cards = drawCards(spread.count, fullDeck);
    setDrawn(cards);
    setRevealed(new Array(spread.count).fill(false));
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [spread.count, fullDeck]);

  const handleReveal = useCallback((i: number) => {
    setRevealed(prev => { const n = [...prev]; n[i] = true; return n; });
  }, []);

  const handleRevealAll = useCallback(() => {
    setRevealed(new Array(drawn?.length ?? 0).fill(true));
  }, [drawn]);

  const handleReset = useCallback(() => {
    setDrawn(null);
    setRevealed([]);
  }, []);

  const handleSpreadChange = useCallback((id: SpreadId) => {
    setSpreadId(id);
    setDrawn(null);
    setRevealed([]);
  }, []);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: '타로 카드 뽑기 — vixutil.com', url }); return; } catch {} }
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="violet" />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />

      {/* 헤더 */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1 text-sm text-slate-400 dark:text-slate-500 hover:text-amber-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1">타로 카드</span>
          <button onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-amber-600 border border-slate-200 dark:border-slate-700 hover:border-amber-300 rounded-xl px-3 py-1.5 transition-all">
            {copied
              ? <><svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-amber-500">복사됨</span></>
              : <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>공유</>}
          </button>
        </div>

        {/* 탭 */}
        <div className="max-w-xl mx-auto px-4 flex border-t border-slate-100 dark:border-slate-800">
          {(['draw', 'catalog'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-bold transition-colors border-b-2 ${
                tab === t ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600'
              }`}>
              {t === 'draw' ? '🃏 뽑기' : '📚 카드 목록'}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-5 pb-16">

        {/* ── 뽑기 탭 ── */}
        {tab === 'draw' && (
          <div className="space-y-4">
            {/* 스프레드 선택 */}
            <div className="space-y-2">
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">뽑기 방식</p>
              <div className="grid grid-cols-2 gap-2">
                {SPREADS.map(s => (
                  <button key={s.id} onClick={() => handleSpreadChange(s.id)}
                    className={`rounded-xl p-3 text-left transition-all border ${
                      spreadId === s.id
                        ? 'bg-amber-500 border-amber-500 text-white'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-amber-200 text-slate-700 dark:text-slate-200'
                    }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{s.icon}</span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${spreadId === s.id ? 'bg-white/25 dark:bg-slate-900/25 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>{s.count}장</span>
                    </div>
                    <p className={`text-xs font-black leading-tight ${spreadId === s.id ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>{s.label}</p>
                    <p className={`text-[10px] mt-0.5 leading-tight ${spreadId === s.id ? 'text-amber-100' : 'text-slate-400 dark:text-slate-500'}`}>{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 덱 선택 */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex-1">덱 선택</p>
              <div className="flex gap-1.5">
                {([false, true] as const).map(isFull => (
                  <button key={String(isFull)} onClick={() => { setFullDeck(isFull); handleReset(); }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      fullDeck === isFull ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-amber-300'
                    }`}>
                    {isFull ? '전체 78장' : '메이저 22장'}
                  </button>
                ))}
              </div>
            </div>

            {/* 스프레드 영역 */}
            <div ref={resultRef} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <SpreadLayout drawn={drawn} revealed={revealed} spread={spread} onReveal={handleReveal} />

              {/* 액션 버튼 */}
              <div className="mt-4 space-y-2">
                {!drawn ? (
                  <button onClick={handleDraw}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-xl shadow active:scale-[0.98] transition-transform text-sm">
                    ✦ {spread.label} 뽑기 ({spread.count}장)
                  </button>
                ) : (
                  <div className="flex gap-2">
                    {!allRevealed && anyRevealed && (
                      <button onClick={handleRevealAll}
                        className="flex-1 py-3 text-sm font-bold text-amber-600 border border-amber-300 rounded-xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors">
                        모두 공개
                      </button>
                    )}
                    {!allRevealed && !anyRevealed && (
                      <button onClick={handleRevealAll}
                        className="flex-1 py-3 text-sm font-bold text-amber-600 border border-amber-300 rounded-xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors">
                        한 번에 모두 공개
                      </button>
                    )}
                    <button onClick={handleReset}
                      className={`${allRevealed ? 'flex-1' : 'px-4'} py-3 text-sm font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-amber-300 hover:text-amber-600 transition-colors`}>
                      다시 뽑기
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 카드 해석 */}
            {drawn && allRevealed && (
              <CardInterpretation drawn={drawn} spread={spread} />
            )}
          </div>
        )}

        {/* ── 카드 목록 탭 ── */}
        {tab === 'catalog' && <CatalogTab />}

        {/* 카드를 전부 뒤집어 해설까지 본 뒤에만 */}
        {drawn && allRevealed && <ReferralCards placement="result" />}

        <Faq items={SECTION_FAQ['fortune/tarot']} />
      </div>
      <SiteFooter />
    </div>
  );
}
