import type { Quiz } from '@/lib/types';

/**
 * 퀴즈 문항·정답·해설을 정적 HTML로 함께 내보내는 서버 컴포넌트.
 *
 * QuizEngine은 스플래시 화면에서 시작하는 위저드라, 프리렌더된 HTML에는
 * 첫 화면만 담기고 문항과 해설은 전부 빠진다. 실제 읽을거리는 해설인데
 * 그게 통째로 정적 HTML 밖에 있었다.
 *
 * 기본은 접힌 <details>다. 펼치면 정답이 보이므로 풀기 전 스포일러가 되지만,
 * 다 푼 뒤 해설만 다시 훑어보고 싶은 사람에게는 이쪽이 더 편하다.
 * 접힌 상태여도 내용은 DOM에 그대로 있어 사용자와 크롤러가 보는 것이 같다.
 */
export default function QuizContent({ quiz }: { quiz: Quiz }) {
  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="max-w-lg mx-auto px-4 pb-10 w-full" aria-label="문항 및 해설">
        <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
          {quiz.title} 문항 · 정답 해설
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
          전체 {quiz.questions.length}문항의 정답과 해설입니다. 아직 풀지 않았다면 위에서 먼저 풀어보세요.
        </p>

        <details className="group border border-slate-200 dark:border-slate-700 rounded-xl [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-slate-700 dark:text-slate-200 list-none px-4 py-3">
            <span className="flex-1 pr-2">정답 · 해설 전체 보기 (스포일러)</span>
            <svg className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>

          <ol className="px-4 pb-4 flex flex-col gap-5">
            {quiz.questions.map((q, i) => (
              <li key={i} className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Q{i + 1}. {q.q}
                </h3>
                <ul className="flex flex-col gap-1 mb-2">
                  {q.opts.map((opt, j) => {
                    const isAnswer = j === q.correct;
                    return (
                      <li
                        key={j}
                        className={`text-sm flex gap-2 ${
                          isAnswer
                            ? 'font-bold text-emerald-700 dark:text-emerald-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <span aria-hidden="true">{isAnswer ? '✓' : '·'}</span>
                        <span>
                          {opt}
                          {isAnswer && <span className="sr-only"> (정답)</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {q.explanation && (
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2">
                    {q.explanation}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </details>
      </section>
    </div>
  );
}
