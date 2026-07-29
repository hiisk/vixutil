'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Quiz } from '@/lib/types';
import ShareButton from './ShareButton';
import PageGlow from './PageGlow';
import ReferralCards from './ReferralCards';
import { thumbGradient } from '@/lib/thumbnail';

type Phase = 'start' | 'question' | 'answer' | 'result';

export type QuizLang = 'ko' | 'en' | 'zh';

/** 사용자에게 보이는 문구만 언어별로 갈라둔다. 채점·진행 로직은 세 언어가 동일하다. */
const UI: Record<QuizLang, {
  allQuizzes: string; start: string; correct: string; wrong: string;
  explanation: string; next: string; seeResult: string; retry: string; more: string;
  meta: (n: number) => string;
  score: (p: number) => string;
  wrongCount: (n: number) => string;
  grades: [string, string, string, string, string];
  msgs: [string, string, string, string, string];
}> = {
  ko: {
    allQuizzes: '전체 퀴즈', start: '퀴즈 시작하기 →', correct: '✓ 정답!', wrong: '✗ 오답',
    explanation: '{ui.explanation}', next: '다음 문제 →', seeResult: '결과 보기 →', retry: '다시 풀기', more: '다른 퀴즈 보기',
    meta: n => `${n}문항 · 4지선다 · 해설 포함`,
    score: p => `${p}점`,
    wrongCount: n => `틀린 문제 (${n}개)`,
    grades: ['만점!', '우수', '양호', '보통', '분발'],
    msgs: ['완벽해요! 모든 문제를 맞혔습니다!', '훌륭해요! 높은 점수네요!', '꽤 잘 알고 계시네요!', '조금 더 공부해봐요!', '다시 도전해봐요!'],
  },
  en: {
    allQuizzes: 'All quizzes', start: 'Start the quiz →', correct: '✓ Correct', wrong: '✗ Wrong',
    explanation: '💡 Explanation', next: 'Next question →', seeResult: 'See results →', retry: 'Try again', more: 'More quizzes',
    meta: n => `${n} questions · four choices · with explanations`,
    score: p => `${p}%`,
    wrongCount: n => `Missed (${n})`,
    grades: ['Perfect', 'Excellent', 'Good', 'Fair', 'Keep going'],
    msgs: ['Perfect — every single one right.', 'Excellent, that is a strong score.', 'You know this reasonably well.', 'Worth another look at this one.', 'Give it another go.'],
  },
  zh: {
    allQuizzes: '全部测验', start: '开始测验 →', correct: '✓ 答对了', wrong: '✗ 答错了',
    explanation: '💡 解析', next: '下一题 →', seeResult: '查看结果 →', retry: '再做一次', more: '更多测验',
    meta: n => `${n} 题 · 四选一 · 附解析`,
    score: p => `${p} 分`,
    wrongCount: n => `答错的题（${n} 题）`,
    grades: ['满分！', '优秀', '良好', '一般', '加油'],
    msgs: ['太完美了，全部答对！', '很棒，分数很高！', '掌握得还不错。', '再多看看这部分吧。', '再挑战一次吧。'],
  },
};



function medal(pct: number) {
  if (pct === 100) return '🏆';
  if (pct >= 80) return '🥇';
  if (pct >= 60) return '🥈';
  if (pct >= 40) return '🥉';
  return '📚';
}
function grade(pct: number, ui: (typeof UI)[QuizLang]) {
  if (pct === 100) return { label: ui.grades[0], color: 'from-yellow-400 to-amber-500', textColor: 'text-amber-100' };
  if (pct >= 80)  return { label: ui.grades[1], color: 'from-amber-400 to-orange-500', textColor: 'text-amber-100' };
  if (pct >= 60)  return { label: ui.grades[2], color: 'from-sky-400 to-blue-500', textColor: 'text-sky-100' };
  if (pct >= 40)  return { label: ui.grades[3], color: 'from-slate-400 to-slate-600', textColor: 'text-slate-200' };
  return { label: ui.grades[4], color: 'from-rose-400 to-red-600', textColor: 'text-rose-100' };
}

export default function QuizEngine({ quiz, lang = 'ko' }: { quiz: Quiz; lang?: QuizLang }) {
  const ui = UI[lang];
  const hubHref = lang === 'ko' ? '/quiz' : `/${lang}/quiz`;
  const [phase, setPhase] = useState<Phase>('start');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrongList, setWrongList] = useState<number[]>([]);

  const total = quiz.questions.length;
  const pct = Math.round((correct / total) * 100);
  const g = grade(pct, ui);
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
    pct === 100 ? ui.msgs[0] :
    pct >= 80 ? ui.msgs[1] :
    pct >= 60 ? ui.msgs[2] :
    pct >= 40 ? ui.msgs[3] : ui.msgs[4];

  /* ── START ── */
  if (phase === 'start') return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <PageGlow accent="amber" />
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Link href={hubHref} className="text-sm text-slate-400 dark:text-slate-500 hover:text-amber-600 flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.allQuizzes}
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-14 max-w-lg mx-auto w-full text-center">
        {/* 목록 카드와 같은 그라데이션·이모지 — 텍스트만 있으면 허전하다 */}
        <div className={`w-32 h-32 rounded-3xl mb-6 flex items-center justify-center bg-gradient-to-br ${thumbGradient(quiz.slug, 'quiz')} shadow-xl shadow-amber-500/20`}>
          <span className="text-6xl drop-shadow-md" aria-hidden="true">{quiz.icon}</span>
        </div>
        <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full mb-3">{quiz.category}</span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3">{quiz.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">{quiz.desc}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-8">{ui.meta(quiz.questions.length)}</p>
        <button onClick={() => setPhase('question')}
          className="w-full max-w-xs bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl text-base transition-colors shadow-md shadow-amber-200">
          {ui.start}
        </button>
      </div>
    </div>
  );

  /* ── QUESTION / ANSWER ── */
  if (phase === 'question' || phase === 'answer') return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <div className="h-1.5 bg-amber-100 dark:bg-amber-950/40">
        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-sm font-bold text-amber-600 truncate mr-2">{quiz.title}</span>
          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{current + 1} / {total}</span>
        </div>
      </header>
      <div key={current} className="flex-1 px-4 py-8 max-w-lg mx-auto w-full qz-fade">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">Q{current + 1}</span>
          {phase === 'answer' && (
            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' : 'bg-red-50 dark:bg-red-950/30 text-red-500'}`}>
              {isCorrect ? ui.correct : ui.wrong}
            </span>
          )}
        </div>
        <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-6 leading-relaxed tracking-tight">{q.q}</h2>
        <div className="flex flex-col gap-2.5">
          {q.opts.map((opt, i) => {
            const answered = phase === 'answer';
            const isRight = i === q.correct;
            const isChosen = i === selected;
            let cls = 'group w-full text-left flex items-center gap-3 border rounded-2xl pl-3 pr-4 py-3.5 text-sm font-medium transition-all ';
            let badgeCls = 'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ';
            if (answered) {
              if (isRight) { cls += 'bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold'; badgeCls += 'bg-emerald-500 text-white'; }
              else if (isChosen) { cls += 'bg-red-50 dark:bg-red-950/30 border-2 border-red-400 text-red-700 dark:text-red-300'; badgeCls += 'bg-red-500 text-white'; }
              else { cls += 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'; badgeCls += 'border-2 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'; }
            } else {
              cls += 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:shadow-sm active:scale-[0.99] cursor-pointer';
              badgeCls += 'border-2 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white';
            }
            return (
              <button key={i} className={cls} onClick={() => phase === 'question' && handleAnswer(i)} disabled={answered}>
                <span className={badgeCls}>
                  {answered && isRight ? '✓' : answered && isChosen ? '✕' : ['①', '②', '③', '④', '⑤'][i]}
                </span>
                <span className="flex-1 leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>
        {phase === 'answer' && (
          <div className="mt-5 space-y-3">
            {q.explanation && (
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4">
                <p className="text-xs font-bold text-blue-600 mb-1">{ui.explanation}</p>
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">{q.explanation}</p>
              </div>
            )}
            <button onClick={next}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3.5 font-bold text-sm transition-colors">
              {current + 1 >= total ? ui.seeResult : ui.next}
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .qz-fade { animation: qzFade 0.28s ease-out; }
        @keyframes qzFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );

  /* ── RESULT ── */
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* Score hero card */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${g.color} p-8 text-white text-center mb-6 shadow-lg`}>
          <span className="absolute -top-6 -right-6 text-[120px] opacity-10 select-none">{medal(pct)}</span>
          <div className="text-7xl mb-3 filter drop-shadow-lg">{medal(pct)}</div>
          <div className="text-5xl font-black mb-1">{correct}<span className="text-2xl font-normal opacity-70"> / {total}</span></div>
          <div className={`text-2xl font-black ${g.textColor} mb-2`}>{ui.score(pct)} · {g.label}</div>
          <p className={`text-sm ${g.textColor}`}>{msg}</p>
          {/* progress bar */}
          <div className="mt-4 bg-black/20 rounded-full h-2 overflow-hidden">
            <div className="bg-white/80 dark:bg-slate-900/80 h-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Wrong answers */}
        {wrongList.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 rounded-2xl p-4 mb-5">
            <p className="text-xs font-bold text-red-500 mb-2">{ui.wrongCount(wrongList.length)}</p>
            <div className="space-y-1">
              {wrongList.map(idx => (
                <p key={idx} className="text-xs text-red-700 dark:text-red-300">Q{idx + 1}. {quiz.questions[idx].q.substring(0, 40)}…</p>
              ))}
            </div>
          </div>
        )}

        <ShareButton title={`${quiz.title} ${pct}점 달성!`} description={`${correct}/${total}문제 정답 · ${msg}`} type="quiz" />

        {/* 결과 화면 노출 — 위치 선정 근거는 TestEngine의 같은 자리에 적어두었다. */}
        <ReferralCards placement="result" />

        <div className="mt-6 flex flex-col gap-3">
          <button onClick={restart} className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3.5 font-bold text-sm transition-colors">
            {ui.retry}
          </button>
          <Link href={hubHref} className="w-full block text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl py-3.5 font-bold text-sm transition-colors">
            {ui.more}
          </Link>
        </div>
      </div>
    </div>
  );
}
