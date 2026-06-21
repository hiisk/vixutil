'use client';
import { useMemo } from 'react';
import { getTodayFortune } from '@/lib/fortune-data';

interface Props {
  subjectId: string;
  subjectName: string;
  subjectEmoji: string;
  badge?: string;
}

const DOMAINS = [
  { key: 'love'  as const, label: '연애운', icon: '💕' },
  { key: 'money' as const, label: '금전운', icon: '💰' },
  { key: 'work'  as const, label: '직업운', icon: '💼' },
  { key: 'health'as const, label: '건강운', icon: '💪' },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= n ? 'text-amber-400' : 'text-slate-200'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function FortuneDisplay({ subjectId, subjectName, subjectEmoji, badge }: Props) {
  const f = useMemo(() => getTodayFortune(subjectId), [subjectId]);
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일`;
  }, []);

  const overallAvg = Math.round((f.stars.overall + f.stars.love + f.stars.money + f.stars.health + f.stars.work) / 5);

  return (
    <div className="space-y-4">
      {/* 헤더 카드 */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl p-6 text-white text-center">
        <p className="text-sm font-semibold text-purple-200 mb-2">{today} 운세</p>
        <div className="text-6xl mb-3">{subjectEmoji}</div>
        <h2 className="text-2xl font-black mb-1">{subjectName}</h2>
        {badge && <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">{badge}</span>}

        {/* 종합 별점 */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="text-xs text-purple-200">오늘의 종합운</p>
          <Stars n={overallAvg} />
        </div>
      </div>

      {/* 도메인별 별점 */}
      <div className="grid grid-cols-2 gap-3">
        {DOMAINS.map(d => (
          <div key={d.key} className="bg-white border border-slate-200 rounded-2xl p-4">
            <p className="text-sm text-slate-500 mb-1.5">{d.icon} {d.label}</p>
            <Stars n={f.stars[d.key]} />
          </div>
        ))}
      </div>

      {/* 종합운 */}
      <div className="bg-white border border-violet-100 rounded-2xl p-5">
        <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-2">✨ 오늘의 총운</p>
        <p className="text-sm text-slate-700 leading-relaxed">{f.overall}</p>
      </div>

      {/* 도메인 운세 */}
      {DOMAINS.map(d => (
        <div key={d.key} className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{d.icon} {d.label}</p>
          <div className="mb-2"><Stars n={f.stars[d.key]} /></div>
          <p className="text-sm text-slate-700 leading-relaxed">{f[d.key]}</p>
        </div>
      ))}

      {/* 행운 정보 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">🍀 오늘의 행운</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full mx-auto mb-1 border-2 border-white shadow-sm"
              style={{ background: f.luckyColorHex }} />
            <p className="text-xs text-slate-400">행운의 색</p>
            <p className="text-sm font-bold text-slate-700">{f.luckyColor}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-1">
              <span className="text-lg font-black text-violet-600">{f.luckyNumber}</span>
            </div>
            <p className="text-xs text-slate-400">행운의 숫자</p>
            <p className="text-sm font-bold text-slate-700">{f.luckyNumber}</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-1">
              <span className="text-base">🧭</span>
            </div>
            <p className="text-xs text-slate-400">행운의 방향</p>
            <p className="text-sm font-bold text-slate-700">{f.luckyDirection}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
