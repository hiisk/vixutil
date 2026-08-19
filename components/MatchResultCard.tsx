import ToolIcon from '@/components/ToolIcon';
import ShareButton from './ShareButton';
import ReferralCards from './ReferralCards';

/**
 * 궁합 결과 카드 — 띠·별자리·혈액형·MBTI 궁합이 공유한다.
 *
 * 네 페이지가 같은 결과 레이아웃(두 주체 이모지 + 점수 게이지 + 유형 배지 +
 * 관계 원리·연애·조언 카드)을 쓰므로 한 곳으로 모았다. 페이지마다 색만 다르게
 * 넘긴다. 점수 게이지는 채움 애니메이션을 준다.
 */

export interface MatchSubject {
  emoji: string;
  name: string;
  /** 이모지 아래 작은 라벨 (원소·성향 등, 선택) */
  sub?: string;
}

export interface MatchResultData {
  score: number;
  label: string;
  emoji: string;
  headline: string;
  reason: string;
  loveComment: string;
  adviceComment: string;
}

interface Props {
  a: MatchSubject;
  b: MatchSubject;
  result: MatchResultData;
  /** 히어로 그라데이션 (예: "from-rose-500 via-pink-500 to-red-500") */
  heroGradient: string;
  /** 강조 텍스트 색 (예: "text-rose-500") */
  accentText: string;
  shareTitle: string;
  shareDescription: string;
}

export default function MatchResultCard({
  a, b, result, heroGradient, accentText, shareTitle, shareDescription,
}: Props) {
  return (
    <div id="match-result" className="space-y-4">
      {/* 히어로 */}
      <div className={`mr-pop relative overflow-hidden rounded-xl bg-gradient-to-br ${heroGradient} p-6 text-white text-center shadow-sm`}>
        <span className="absolute -top-6 -right-4 text-[110px] opacity-15 select-none">{result.emoji}</span>
        <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-white dark:bg-slate-900/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex flex-col items-center">
              <span className="text-4xl">{a.emoji}</span>
              <span className="text-[11px] font-bold mt-1">{a.name}</span>
              {a.sub && <span className="text-[9px] opacity-80">{a.sub}</span>}
            </div>
            <ToolIcon emoji="💗" className="w-7 h-7 opacity-80 text-slate-800 dark:text-slate-100" />
            <div className="flex flex-col items-center">
              <span className="text-4xl">{b.emoji}</span>
              <span className="text-[11px] font-bold mt-1">{b.name}</span>
              {b.sub && <span className="text-[9px] opacity-80">{b.sub}</span>}
            </div>
          </div>
          <p className="text-6xl font-bold leading-none tracking-tight">{result.score}<span className="text-2xl">점</span></p>
          <div className="mt-4 max-w-[220px] mx-auto relative h-3 rounded-full bg-white/30 overflow-hidden">
            <div className="absolute inset-y-0 left-0 rounded-full bg-white dark:bg-slate-900/90 transition-all duration-700" style={{ width: `${result.score}%` }} />
          </div>
          <p className="text-base font-bold mt-4">{result.emoji} {result.label}</p>
          <p className="text-sm text-white/90 mt-1">{result.headline}</p>
        </div>
      </div>

      {/* 관계 원리 */}
      <div className="rounded-lg border chip-off p-5">
        <p className={`text-xs font-bold ${accentText} uppercase tracking-wide mb-2`}>왜 이렇게 나왔나요?</p>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.reason}</p>
      </div>

      {/* 연애·조언 */}
      <div className="grid gap-3">
        <div className="rounded-lg border border-rose-100 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 p-5">
          <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1.5">연애 궁합</p>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.loveComment}</p>
        </div>
        <div className="rounded-lg border border-amber-100 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 p-5">
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5">관계 조언</p>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.adviceComment}</p>
        </div>
      </div>

      <ShareButton title={shareTitle} description={shareDescription} type="fortune" />

      <ReferralCards placement="result" />

      <style>{`
        .mr-pop { animation: mrPop 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes mrPop { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}
