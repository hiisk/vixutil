import { WHOS, type ChmodFacts } from '@/lib/chmod/facts';

/**
 * 세 줄 세 칸 — 누가 무엇을 할 수 있는지를 그대로 그린 표.
 *
 * rwxr-xr-x라는 아홉 글자를 아홉 칸으로 펴 놓으면, 어느 줄이 비어 있는지가
 * 글자를 세지 않고도 보인다. 권한 이야기에서 늘 헷갈리는 것은 "세 번째 줄이
 * 누구인가"인데, 이름을 옆에 붙여 두면 그 물음이 사라진다.
 */
export default function PermGrid({
  facts,
  whoLabel,
  cols,
}: {
  facts: ChmodFacts;
  whoLabel: Record<(typeof WHOS)[number], string>;
  /** 읽기·쓰기·실행의 이름 — 폴더에서는 실행 대신 들어가기를 넘긴다 */
  cols: [string, string, string];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center text-sm">
        <thead>
          <tr className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <th className="w-1/4 py-1 text-left" />
            {cols.map(c => <th key={c} className="py-1 font-bold">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {WHOS.map(who => {
            const p = facts.perm[who];
            return (
              <tr key={who} className="border-t border-slate-100 dark:border-slate-800">
                <th className="py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300">
                  {whoLabel[who]}
                  <span className="ml-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">{p.digit}</span>
                </th>
                {[p.read, p.write, p.exec].map((on, i) => (
                  <td key={i} className="py-2">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold ${
                        on
                          ? 'border-orange-400 bg-orange-500 text-white dark:border-orange-600'
                          : 'border-slate-200 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600'
                      }`}
                    >
                      {on ? '✓' : '·'}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
