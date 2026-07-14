'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Quiz } from '@/lib/types';
import ShareButton from './ShareButton';

type Phase = 'start' | 'question' | 'answer' | 'result';


function medal(pct: number) {
  if (pct === 100) return '🏆';
  if (pct >= 80) return '🥇';
  if (pct >= 60) return '🥈';
  if (pct >= 40) return '🥉';
  return '📚';
}
function grade(pct: number) {
  if (pct === 100) return { label: '만점!', color: 'from-yellow-400 to-amber-500', textColor: 'text-amber-100' };
  if (pct >= 80)  return { label: '우수', color: 'from-amber-400 to-orange-500', textColor: 'text-amber-100' };
  if (pct >= 60)  return { label: '양호', color: 'from-sky-400 to-blue-500', textColor: 'text-sky-100' };
  if (pct >= 40)  return { label: '보통', color: 'from-slate-400 to-slate-600', textColor: 'text-slate-200' };
  return { label: '분발', color: 'from-rose-400 to-red-600', textColor: 'text-rose-100' };
}

export default function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [phase, setPhase] = useState<Phase>('start');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrongList, setWrongList] = useState<number[]>([]);

  const total = quiz.questions.length;
  const pct = Math.round((correct / total) * 100);
  const g = grade(pct);
  const q = quiz.questions[current];
  const isCorrect = selected === q?.correct;
  const progress = Math.round((current / total) * 100);

  function handleAnswer(idx: number) {
    setSelected(idx);
    setPhase('answer');
    if (idx === q.correct) {
      setCorrect(c => c + 1);
    } else {
      setWrongList(w => [...w, current]);
    }
  }

  function next() {
    if (current + 1 >= total) { setPhase('result'); }
    else { setCurrent(c => c + 1); setSelected(null); setPhase('question'); }
  }

  function restart() { setPhase('start'); setCurrent(0); setSelected(null); setCorrect(0); setWrongList([]); }

  const msg =
    pct === 100 ? '완벽해요! 모든 문제를 맞혔습니다!' :
    pct >= 80 ? '훌륭해요! 높은 점수네요!' :
    pct >= 60 ? '꽤 잘 알고 계시네요!' :
    pct >= 40 ? '조금 더 공부해봐요!' : '다시 도전해봐요!';

  /* ── START ── */
  if (phase === 'start') return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Link href="/quiz" className="text-sm text-slate-400 hover:text-amber-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            전체 퀴즈
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-14 max-w-lg mx-auto w-full text-center">
        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-3">{quiz.category}</span>
        <h1 className="text-2xl font-black text-slate-900 mb-3">{quiz.title}</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">{quiz.desc}</p>
        <p className="text-xs text-slate-400 mb-8">{quiz.questions.length}문항 · 4지선다 · 해설 포함</p>
        <button onClick={() => setPhase('question')}
          className="w-full max-w-xs bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl text-base transition-colors shadow-md shadow-amber-200">
          퀴즈 시작하기 →
        </button>
      </div>
    </div>
  );

  /* ── QUESTION / ANSWER ── */
  if (phase === 'question' || phase === 'answer') return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-1.5 bg-amber-100">
        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-sm font-bold text-amber-600 truncate mr-2">{quiz.title}</span>
          <span className="text-xs text-slate-400 shrink-0">{current + 1} / {total}</span>
        </div>
      </header>
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full">Q{current + 1}</span>
          {phase === 'answer' && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
              {isCorrect ? '✓ 정답!' : '✗ 오답'}
            </span>
          )}
        </div>
        <h2 className="text-base font-bold text-slate-900 mb-6 leading-relaxed">{q.q}</h2>
        <div className="flex flex-col gap-2.5">
          {q.opts.map((opt, i) => {
            let cls = 'w-full text-left border rounded-xl px-4 py-3.5 text-sm font-medium transition-all ';
            if (phase === 'answer') {
              if (i === q.correct) cls += 'bg-emerald-50 border-2 border-emerald-400 text-emerald-800 font-bold';
              else if (i === selected) cls += 'bg-red-50 border-2 border-red-400 text-red-700';
              else cls += 'bg-slate-50 border-slate-200 text-slate-500';
            } else {
              cls += 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50 cursor-pointer';
            }
            return (
              <button key={i} className={cls} onClick={() => phase === 'question' && handleAnswer(i)} disabled={phase === 'answer'}>
                <span className="mr-2 text-slate-400 font-normal">{['①','②','③','④'][i]}</span>{opt}
              </button>
            );
          })}
        </div>
        {phase === 'answer' && (
          <div className="mt-5 space-y-3">
            {q.explanation && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-blue-600 mb-1">💡 해설</p>
                <p className="text-sm text-blue-800 leading-relaxed">{q.explanation}</p>
              </div>
            )}
            <button onClick={next}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3.5 font-bold text-sm transition-colors">
              {current + 1 >= total ? '결과 보기 →' : '다음 문제 →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  /* ── RESULT ── */
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* Score hero card */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${g.color} p-8 text-white text-center mb-6 shadow-lg`}>
          <span className="absolute -top-6 -right-6 text-[120px] opacity-10 select-none">{medal(pct)}</span>
          <div className="text-7xl mb-3 filter drop-shadow-lg">{medal(pct)}</div>
          <div className="text-5xl font-black mb-1">{correct}<span className="text-2xl font-normal opacity-70"> / {total}</span></div>
          <div className={`text-2xl font-black ${g.textColor} mb-2`}>{pct}점 · {g.label}</div>
          <p className={`text-sm ${g.textColor}`}>{msg}</p>
          {/* progress bar */}
          <div className="mt-4 bg-black/20 rounded-full h-2 overflow-hidden">
            <div className="bg-white/80 h-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Wrong answers */}
        {wrongList.length > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-red-500 mb-2">틀린 문제 ({wrongList.length}개)</p>
            <div className="space-y-1">
              {wrongList.map(idx => (
                <p key={idx} className="text-xs text-red-700">Q{idx + 1}. {quiz.questions[idx].q.substring(0, 40)}…</p>
              ))}
            </div>
          </div>
        )}

        <ShareButton title={`${quiz.title} ${pct}점 달성!`} description={`${correct}/${total}문제 정답 · ${msg}`} type="quiz" />

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={restart} className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3.5 font-bold text-sm transition-colors">
            다시 풀기
          </button>
          <Link href="/quiz" className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl py-3.5 font-bold text-sm transition-colors">
            다른 퀴즈 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
