import { pxFacts } from '@/lib/rem/facts';

/**
 * px·rem·pt를 한 줄에 — 옮겨 적을 값이 바로 보이게.
 *
 * 이 표를 보는 손은 대개 다른 창에 코드를 띄워 두고 있다. 세 값이 한 줄에
 * 있어야 눈이 오가지 않는다.
 */
export default function PxTable({ pixels,
  current,
  head,
}: {
  pixels: number[];
  current?: number;
  head: [string, string, string];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm tabular-nums">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <th className="px-3 py-2 text-left font-bold">{head[0]}</th>
            <th className="px-3 py-2 text-right font-bold">{head[1]}</th>
            <th className="px-3 py-2 text-right font-bold">{head[2]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {pixels.map(px => {
            const f = pxFacts(px);
            const here = px === current;
            return (
              <tr key={px} className={here ? 'bg-violet-50 dark:bg-violet-950/40' : 'bg-white dark:bg-slate-900'}>
                <td className="px-3 py-2 font-bold">
                  <span className="text-violet-700 dark:text-violet-400 hover:underline">
                    {px}px
                  </span>
                </td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.rem}rem</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-200">{f.pt}pt</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
