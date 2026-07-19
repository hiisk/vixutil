import type { Test } from '@/lib/types';

/**
 * 테스트의 결과 유형 설명을 정적 HTML로 함께 내보내는 서버 컴포넌트.
 *
 * TestEngine은 스플래시 → 문항 → 결과 순의 위저드라, 프리렌더된 HTML에는
 * 첫 화면만 남는다. 정작 이 페이지에서 읽을 값어치가 있는 글은 유형 설명인데
 * 그게 통째로 정적 HTML 밖에 있었다.
 *
 * 문항과 달리 유형 설명은 미리 봐도 스포일러가 아니라(오히려 어떤 축을 재는
 * 테스트인지 알려준다) 접지 않고 그대로 펼쳐둔다.
 */
export default function TestContent({ test }: { test: Test }) {
  const isMbti = test.type === 'mbti';

  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="max-w-lg mx-auto px-4 pb-10 w-full" aria-label="결과 유형 안내">
        <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
          {test.title} 결과 유형 {test.results.length}가지
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
          {test.questions.length}문항에 답하면 아래 유형 중 하나가 나옵니다.
          {isMbti
            ? ' 각 문항은 E/I · S/N · T/F · J/P 네 축 중 하나에 배점되며, 축별 합계로 유형이 정해집니다.'
            : ' 각 선택지에 배점이 있고, 합계 점수가 속한 구간의 유형이 결과가 됩니다.'}
        </p>

        <ul className="flex flex-col gap-2.5">
          {test.results.map((r, i) => (
            <li
              key={i}
              className="border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3"
            >
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-1.5">
                <span aria-hidden="true">{r.emoji}</span>
                <span>{r.title}</span>
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{r.desc}</p>
              {r.traits && r.traits.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mt-2.5">
                  {r.traits.map(t => (
                    <li
                      key={t}
                      className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500 mt-4">
          이 테스트는 재미로 보는 참고용이며, 심리학적 진단이나 검사가 아닙니다.
        </p>
      </section>
    </div>
  );
}
