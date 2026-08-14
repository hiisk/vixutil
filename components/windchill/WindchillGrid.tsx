import { TEMPS, WINDS } from '@/lib/windchill/list';
import { feltOf, frostbiteOf } from '@/lib/windchill/facts';

/**
 * 기온 × 풍속 격자 — 위험한 칸이 저절로 드러난다.
 *
 * 210줄을 늘어놓는 대신 표로 세우면, 동상 위험 구간이 오른쪽 아래로 번져 가는
 * 모양이 한눈에 보인다. 그 모양이 이 표가 말하려는 것이다.
 *
 * 칸마다 걸려 있던 낱장 링크는 걷어냈다 — 표가 이미 답을 다 보이고 있다.
 */
export default function WindchillGrid() {
  return (
    <div className="overflow-x-auto rounded-2xl border chip-off p-2">
      <table className="w-full text-[11px] tabular-nums">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500">
            <th className="px-1 py-1 text-left">℃\km/h</th>
            {WINDS.map(v => (
              <th key={v} className="px-1 py-1 text-center font-bold">{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...TEMPS].reverse().map(t => (
            <tr key={t}>
              <th className="px-1 py-1 text-left font-bold text-slate-500 dark:text-slate-400">{t}</th>
              {WINDS.map(v => {
                const felt = feltOf(t, v);
                const risk = frostbiteOf(felt);
                return (
                  <td key={v} className="p-0.5">
                    <div
                      className={[
                        'block rounded px-1 py-1 text-center font-bold',
                        risk === 2
                          ? 'bg-rose-200 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100'
                          : risk === 10
                            ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-900 dark:text-orange-200'
                            : risk === 30
                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                              : 'text-slate-600 dark:text-slate-300',
                      ].join(' ')}
                    >
                      {felt}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
