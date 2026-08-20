import type { TestWhy as Why } from '@/lib/test-why';

/**
 * 「왜 이 결과가 나왔나」.
 *
 * 열 문항을 눌러 놓고 유형 이름 하나만 받으면 그게 내 답에서 나온 것인지 알
 * 길이 없다. 채점에 쓴 재료(축·표·점수)를 그대로 되짚어 보여 준다 — 데이터를
 * 새로 쓰지 않으므로 288종 전부에 한 번에 붙는다(lib/test-why.ts).
 *
 * 한국어에서만 낸다. 문구가 한국어라 아홉 언어에 그대로 내면 그 화면만 한국어가
 * 섞인다. 번역은 별개의 일이다.
 */
export default function TestWhy({ why }: { why: Why }) {
  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
      <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">이 결과가 나온 이유</h2>
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{why.headline}</p>

      {/* 축·표 — 어느 쪽으로 얼마나 기울었나 */}
      <div className="mt-4 flex flex-col gap-2.5">
        {why.axes.map((a, i) => (
          <div key={`${a.label}-${i}`}>
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 min-w-0 truncate">{a.label}</span>
              <span className="text-xs font-bold text-sec shrink-0">
                {a.side}
                {a.even && <span className="text-slate-500 dark:text-slate-400 font-medium"> · 반반</span>}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-sec transition-all duration-700" style={{ width: `${a.percent}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/*
        옆 결과와 얼마나 가까웠나. 「2점만 달랐어도 다른 결과였다」는 말이
        결과 자체보다 더 정직하다 — 경계에 걸린 사람에게 특히 그렇다.
      */}
      {why.margin && (
        <p className="mt-4 note-xs">
          {why.margin.gap === 0
            ? `«${why.margin.runnerUp}»와 동점이었습니다. 답 하나만 달랐어도 그쪽이 나왔을 거예요.`
            : `다음으로 가까운 결과는 «${why.margin.runnerUp}»이고 ${why.margin.gap}${why.margin.unit} 차이였습니다.`}
        </p>
      )}

      {why.swings.length > 0 && (
        <div className="mt-4">
          <p className="label-caps mb-2">결과를 크게 민 답</p>
          <div className="kv-table">
            {why.swings.map(s => (
              <div key={s.qIndex} className="kv-row">
                <span className="min-w-0">
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {s.qIndex + 1}. {s.q}
                  </span>
                  <span className="block truncate">{s.answer}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
