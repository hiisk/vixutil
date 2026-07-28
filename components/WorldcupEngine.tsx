'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Worldcup, WorldcupItem } from '@/lib/worldcup-data';
import ShareButton from './ShareButton';
import PageGlow from './PageGlow';
import ReferralCards from './ReferralCards';

type Phase = 'intro' | 'play' | 'result';

function roundLabel(n: number): string {
  if (n >= 32) return `${n}강`;
  if (n === 16) return '16강';
  if (n === 8) return '8강';
  if (n === 4) return '준결승';
  if (n === 2) return '결승';
  return '결승';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GRADIENTS = [
  'from-rose-500 to-pink-600',
  'from-sky-500 to-blue-600',
  'from-amber-400 to-orange-500',
  'from-violet-500 to-purple-600',
  'from-emerald-400 to-teal-600',
  'from-fuchsia-500 to-rose-500',
];

export default function WorldcupEngine({ worldcup }: { worldcup: Worldcup }) {
  const total = worldcup.items.length;
  const [phase, setPhase] = useState<Phase>('intro');
  const [round, setRound] = useState<WorldcupItem[]>(worldcup.items);
  const [matchIndex, setMatchIndex] = useState(0);
  const [winners, setWinners] = useState<WorldcupItem[]>([]);
  const [champion, setChampion] = useState<WorldcupItem | null>(null);
  const [picked, setPicked] = useState<number | null>(null); // 선택 하이라이트용
  const [anim, setAnim] = useState(0); // 매치 전환 리렌더 키

  const matchesInRound = round.length / 2;
  const a = round[matchIndex * 2];
  const b = round[matchIndex * 2 + 1];

  function start() {
    setRound(shuffle(worldcup.items));
    setMatchIndex(0);
    setWinners([]);
    setChampion(null);
    setPicked(null);
    setAnim((n) => n + 1);
    setPhase('play');
  }

  function pick(side: 0 | 1) {
    if (picked !== null) return;
    const winner = side === 0 ? a : b;
    setPicked(side);
    // 짧은 하이라이트 후 다음 매치로
    window.setTimeout(() => {
      const nextWinners = [...winners, winner];
      const isLastMatch = matchIndex + 1 >= matchesInRound;
      if (isLastMatch) {
        if (nextWinners.length === 1) {
          setChampion(nextWinners[0]);
          setPhase('result');
        } else {
          setRound(nextWinners);
          setWinners([]);
          setMatchIndex(0);
        }
      } else {
        setWinners(nextWinners);
        setMatchIndex(matchIndex + 1);
      }
      setPicked(null);
      setAnim((n) => n + 1);
    }, 260);
  }

  const gradFor = (i: number) => GRADIENTS[i % GRADIENTS.length];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <PageGlow accent="rose" />
      <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600" />
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="font-black text-rose-600 text-lg shrink-0">vix.</Link>
          <Link href="/worldcup" className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
            {worldcup.icon} {worldcup.title}
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* ───────── 인트로 ───────── */}
        {phase === 'intro' && (
          <div className="text-center">
            <div className="text-6xl mb-4">{worldcup.icon}</div>
            <p className="text-xs font-bold text-rose-600 tracking-widest uppercase mb-2">Ideal Worldcup</p>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-3">{worldcup.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">{worldcup.desc}</p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-full px-4 py-1.5 mb-8">
              🏆 {total}강 토너먼트 · 최애 1개 가리기
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {worldcup.items.map((it) => (
                <div key={it.name} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 py-3 px-1">
                  <div className="text-2xl mb-0.5">{it.emoji}</div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{it.name}</div>
                </div>
              ))}
            </div>

            <button
              onClick={start}
              className="group w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-lg rounded-2xl py-4 shadow-lg shadow-rose-200 dark:shadow-none hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              시작하기
              <svg className="transition-transform group-hover:translate-x-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        )}

        {/* ───────── 플레이 ───────── */}
        {phase === 'play' && a && b && (
          <div>
            <div className="text-center mb-4">
              <span className="inline-block text-sm font-black text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-full px-4 py-1">
                {roundLabel(round.length)}
              </span>
              <p className="mt-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                {matchIndex + 1} / {matchesInRound} 경기
              </p>
              {/* 라운드 진행 바 */}
              <div className="mt-2 h-1.5 w-full max-w-xs mx-auto rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-300"
                  style={{ width: `${((matchIndex) / matchesInRound) * 100}%` }}
                />
              </div>
            </div>

            <div key={anim} className="wc-fade relative flex flex-col gap-2">
              {[a, b].map((it, side) => (
                <button
                  key={it.name}
                  onClick={() => pick(side as 0 | 1)}
                  disabled={picked !== null}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradFor(side === 0 ? matchIndex : matchIndex + 3)} text-white min-h-[33vh] flex flex-col items-center justify-center transition-all duration-200
                    ${picked === null ? 'hover:scale-[1.015] active:scale-95' : ''}
                    ${picked === side ? 'ring-4 ring-white scale-[1.02]' : ''}
                    ${picked !== null && picked !== side ? 'opacity-40 grayscale scale-95' : ''}`}
                >
                  <span className="text-7xl drop-shadow-lg mb-3 transition-transform group-hover:scale-110">{it.emoji}</span>
                  <span className="text-2xl font-black drop-shadow px-4 text-center">{it.name}</span>
                  {picked === side && (
                    <span className="absolute top-3 right-4 text-3xl">✅</span>
                  )}
                </button>
              ))}
              {/* VS 배지 — 두 카드 사이 정중앙 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 border-4 border-rose-500 text-rose-600 font-black text-lg shadow-lg">VS</span>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
              더 끌리는 쪽을 선택하세요
            </p>
          </div>
        )}

        {/* ───────── 결과 ───────── */}
        {phase === 'result' && champion && (
          <div className="text-center">
            <p className="text-xs font-black text-rose-600 tracking-widest uppercase mb-2">Winner 🏆</p>
            <div className="wc-pop relative rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 text-white p-10 mb-6 overflow-hidden">
              <div className="wc-shine absolute inset-0 opacity-30" />
              <div className="text-8xl mb-3 drop-shadow-lg">{champion.emoji}</div>
              <div className="text-sm font-bold text-rose-100 mb-1">{worldcup.title} 우승</div>
              <div className="text-4xl font-black drop-shadow">{champion.name}</div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              {total}강을 뚫고 살아남은 당신의 최애! 친구는 뭘 골랐을까요?
            </p>

            <div className="flex flex-col gap-3 max-w-xs mx-auto mb-8">
              <ShareButton
                title={`${worldcup.title} 우승: ${champion.emoji} ${champion.name}`}
                description={`${total}강 토너먼트 결과 — 너의 최애는?`}
                type="quiz"
              />
              <button
                onClick={start}
                className="w-full flex items-center justify-center gap-2 border-2 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 font-bold rounded-2xl py-3 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                🔄 다시 하기
              </button>
              <Link
                href="/worldcup"
                className="w-full text-center text-sm font-bold text-slate-400 dark:text-slate-500 py-2 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                다른 월드컵 보기 →
              </Link>
            </div>

            <ReferralCards placement="result" />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes wcFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .wc-fade { animation: wcFade 0.28s ease-out; }
        @keyframes wcPop { 0% { opacity: 0; transform: scale(0.8); } 60% { transform: scale(1.04); } 100% { opacity: 1; transform: scale(1); } }
        .wc-pop { animation: wcPop 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes wcShine { 0% { transform: translateX(-120%) skewX(-20deg); } 100% { transform: translateX(220%) skewX(-20deg); } }
        .wc-shine { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent); width: 60%; animation: wcShine 2.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
