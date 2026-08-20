'use client';
import ToolIcon from '@/components/ToolIcon';
import CoupangAd from '@/components/CoupangAd';
import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import ShareButton from '@/components/ShareButton';
import PageGlow from '@/components/PageGlow';
import { SECTION_FAQ } from '@/lib/section-faq';
import { TAROT_CARDS, LUCKY_COLORS, LUCKY_DIRECTIONS, seededInt } from '@/lib/fortune-data';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

function ymd(d: Date) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

interface DailyCard {
  card: typeof TAROT_CARDS[number];
  reversed: boolean;
  color: [string, string];
  direction: string;
  number: number;
  dateLabel: string;
}

function computeDaily(): DailyCard {
  const now = new Date();
  const key = ymd(now);
  const idx = seededInt(`daily-tarot-${key}`) % TAROT_CARDS.length;
  const reversed = seededInt(`daily-tarot-rev-${key}`) % 100 < 35;
  const color = LUCKY_COLORS[seededInt(`daily-tarot-color-${key}`) % LUCKY_COLORS.length];
  const direction = LUCKY_DIRECTIONS[seededInt(`daily-tarot-dir-${key}`) % LUCKY_DIRECTIONS.length];
  const number = (seededInt(`daily-tarot-num-${key}`) % 45) + 1;
  const dateLabel = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  return { card: TAROT_CARDS[idx], reversed, color, direction, number, dateLabel };
}

// 클라이언트에서 한 번만 계산해 캐시한다(같은 참조를 유지해 무한 루프 방지).
let cachedDaily: DailyCard | null = null;
function getClientDaily(): DailyCard {
  if (!cachedDaily) cachedDaily = computeDaily();
  return cachedDaily;
}
const emptySubscribe = () => () => {};

export default function DailyTarotPage() {
  // 빌드(서버) 시점과 열람(클라이언트) 시점의 날짜가 다를 수 있다. useSyncExternalStore로
  // 서버는 null(스켈레톤), 클라이언트는 오늘 카드를 반환해 하이드레이션 불일치를 피한다.
  const daily = useSyncExternalStore(emptySubscribe, getClientDaily, () => null);

  return (
    <div className="page-wrap">
      <PageGlow accent="violet" />
      <div className="h-1 topbar" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="font-bold text-amber-600 text-lg shrink-0">vix.</Link>
          <Link href="/fortune" className="text-sm font-bold text-slate-700 dark:text-slate-200">🃏 오늘의 타로</Link>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/fortune/daily-tarot" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-lg mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-1">Daily Tarot</p>
          <h1 className="page-h1">오늘의 타로 한 장</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            매일 자정, 당신을 위한 오늘의 카드가 바뀝니다
          </p>
        </div>

        {!daily ? (
          <div className="animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800 h-80 mb-6" />
        ) : (
          <>
            <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">{daily.dateLabel}</p>

            {/* 카드 히어로 */}
            <div
              className="dt-flip relative rounded-xl text-white p-8 mb-5 text-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${daily.card.color}, ${daily.card.color}cc)` }}
            >
              <div className="text-7xl mb-3 drop-shadow-sm" style={{ transform: daily.reversed ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>
                {daily.card.emoji}
              </div>
              <div className="text-xs font-bold text-white/80">{daily.card.nameEn}</div>
              <div className="text-3xl font-bold drop-shadow">{daily.card.name}</div>
              <div className="inline-block mt-3 text-xs font-bold bg-white dark:bg-slate-900/25 rounded-full px-3 py-1">
                {daily.reversed ? '역방향 ⟲' : '정방향 ⟰'}
              </div>
            </div>

            {/* 의미 */}
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-5 mb-4">
              <div className="text-xs font-bold text-amber-600 mb-2">오늘의 메시지</div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {daily.reversed ? daily.card.reversed : daily.card.upright}
              </p>
            </div>

            {/* 행운 요소 */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-3 text-center">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">행운의 색</div>
                <div className="w-6 h-6 rounded-full mx-auto mb-1 border border-slate-200 dark:border-slate-600" style={{ background: daily.color[1] }} />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{daily.color[0]}</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-3 text-center">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">행운의 방향</div>
                <ToolIcon emoji="🧭" className="w-7 h-7 mb-0.5 text-slate-800 dark:text-slate-100" />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{daily.direction}</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-3 text-center">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">행운의 숫자</div>
                <ToolIcon emoji="🍀" className="w-7 h-7 mb-0.5 text-slate-800 dark:text-slate-100" />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{daily.number}</div>
              </div>
            </div>

            <div className="mb-6">
              <ShareButton
                title={`오늘의 타로: ${daily.card.name} (${daily.reversed ? '역방향' : '정방향'})`}
                description="오늘 나를 위한 타로 카드 한 장 — 당신의 카드는?"
                type="fortune"
              />
            </div>

            <CoupangAd />
          </>
        )}

        <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-6">
          타로는 재미와 자기 성찰을 위한 참고용입니다. 과학적 근거가 있는 예측이 아닙니다.
        </p>

        <Faq items={SECTION_FAQ['fortune/daily-tarot']} />
      </div>
      <SiteFooter referral={false} />

      <style jsx>{`
        @keyframes dtFlip { 0% { opacity: 0; transform: rotateY(90deg) scale(0.9); } 100% { opacity: 1; transform: rotateY(0) scale(1); } }
        .dt-flip { animation: dtFlip 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
      `}</style>
    </div>
  );
}
