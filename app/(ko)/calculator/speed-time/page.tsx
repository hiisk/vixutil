'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

/**
 * 거리 = 속도 × 시간. 셋 중 둘을 넣으면 나머지 하나가 정해진다.
 *
 * 안쪽 셈은 모두 km와 시간으로 한다. m/s·mph·페이스는 결과에서 환산한다 —
 * 입력마다 단위를 두면 고를 것만 늘고 틀릴 자리도 늘어난다.
 */
const KM_PER_MILE = 1.609344;

const fmtTime = (hours: number) => {
  const total = Math.round(hours * 3600);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}시간 ${m}분${s ? ` ${s}초` : ''}`;
  if (m > 0) return `${m}분${s ? ` ${s}초` : ''}`;
  return `${s}초`;
};

const fmtPace = (minPerKm: number) => {
  const m = Math.floor(minPerKm);
  const s = Math.round((minPerKm - m) * 60);
  return s === 60 ? `${m + 1}'00"` : `${m}'${String(s).padStart(2, '0')}"`;
};

const num = (s: string) => {
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : null;
};

export default function SpeedTimePage() {
  const [solve, setSolve] = useState<'speed' | 'time' | 'distance'>('time');
  const [dist, setDist] = useState('');
  const [speed, setSpeed] = useState('');
  const [h, setH] = useState('');
  const [m, setM] = useState('');

  const d = num(dist);
  const v = num(speed);
  const t = (() => {
    const hh = Number(h) || 0;
    const mm = Number(m) || 0;
    const total = hh + mm / 60;
    return total > 0 ? total : null;
  })();

  const answer = (() => {
    if (solve === 'speed' && d && t) return { kind: 'speed' as const, v: d / t, d, t: t };
    if (solve === 'time' && d && v) return { kind: 'time' as const, v, d, t: d / v };
    if (solve === 'distance' && v && t) return { kind: 'distance' as const, v, d: v * t, t };
    return null;
  })();

  const inputCls =
    'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500';

  return (
    <CalcShell
      path="/calculator/speed-time"
      title="속도 거리 시간 계산기"
      description="거리·속도·시간 중 둘을 넣으면 나머지 하나를 계산합니다"
      intro={
        <>
          <h2>식은 하나뿐입니다</h2>
          <p>
            <strong>거리 = 속도 × 시간</strong> 하나면 셋 중 무엇이든 구할 수 있습니다. 양쪽을 나누면
            속도 = 거리 ÷ 시간, 시간 = 거리 ÷ 속도가 됩니다. 외울 것은 곱셈 하나이고 나머지는
            옮기기입니다.
          </p>
          <h2>단위를 맞추는 것이 절반입니다</h2>
          <p>
            시속 60km로 30<strong>분</strong> 가면 30km입니다. 30을 그대로 곱해 1,800km가 나왔다면
            시간 단위를 안 맞춘 것입니다. 이 계산기는 안에서 모두 km와 시간으로 바꿔 셈하고,
            결과만 m/s·mph·페이스로 함께 보여 줍니다.
          </p>
          <h2>시속과 초속</h2>
          <p>
            km/h를 m/s로 바꾸려면 <strong>3.6으로 나눕니다</strong>. 1km는 1,000m이고 1시간은
            3,600초이니 1000/3600 = 1/3.6입니다. 시속 36km가 초속 10m입니다. 물리 문제는 m/s,
            자동차는 km/h를 쓰기 때문에 자주 오가는 환산입니다.
          </p>
          <h2>페이스는 속도의 역수입니다</h2>
          <p>
            달리기에서 쓰는 페이스는 1km를 몇 분에 가는지입니다. 속도와 뒤집힌 관계라{' '}
            <strong>페이스가 작을수록 빠릅니다</strong>. 시속 12km는 5분/km, 시속 10km는 6분/km입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'time', label: '시간 구하기' },
            { value: 'speed', label: '속도 구하기' },
            { value: 'distance', label: '거리 구하기' },
          ]}
          value={solve}
          onChange={v2 => setSolve(v2 as 'speed' | 'time' | 'distance')}
        />

        <Card className="p-5 flex flex-col gap-4">
          {solve !== 'distance' && (
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">거리 (km)</label>
              <input type="number" value={dist} onChange={e => setDist(e.target.value)} placeholder="예: 42.195" min={0} className={inputCls} />
            </div>
          )}
          {solve !== 'speed' && (
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">속도 (km/h)</label>
              <input type="number" value={speed} onChange={e => setSpeed(e.target.value)} placeholder="예: 60" min={0} className={inputCls} />
            </div>
          )}
          {solve !== 'time' && (
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">시간</label>
              <div className="flex gap-2 items-center">
                <input type="number" value={h} onChange={e => setH(e.target.value)} placeholder="0" min={0} className={inputCls} />
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 shrink-0">시간</span>
                <input type="number" value={m} onChange={e => setM(e.target.value)} placeholder="0" min={0} className={inputCls} />
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 shrink-0">분</span>
              </div>
            </div>
          )}
        </Card>

        {answer && (
          <>
            <div className="bg-rose-600 rounded-2xl p-6 text-center">
              <p className="text-rose-200 text-sm mb-2">
                {answer.kind === 'speed' ? '속도' : answer.kind === 'time' ? '걸리는 시간' : '거리'}
              </p>
              <p className="text-white text-5xl font-black">
                {answer.kind === 'speed'
                  ? answer.v.toFixed(2)
                  : answer.kind === 'distance'
                    ? answer.d.toFixed(2)
                    : fmtTime(answer.t)}
              </p>
              {answer.kind !== 'time' && (
                <p className="text-rose-200 text-xl mt-1">{answer.kind === 'speed' ? 'km/h' : 'km'}</p>
              )}
            </div>

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="label-caps">다른 단위로</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">속도</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{answer.v.toFixed(2)} km/h</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">초속</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{(answer.v / 3.6).toFixed(2)} m/s</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">마일 기준</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{(answer.v / KM_PER_MILE).toFixed(2)} mph</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">페이스</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmtPace(60 / answer.v)} / km</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">거리 · 시간</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {answer.d.toFixed(2)}km · {fmtTime(answer.t)}
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="label-caps">
                  이 속도로 가면 (시속 {answer.v.toFixed(1)}km)
                </p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 5, 10, 42.195, 100].map(km => (
                  <div key={km} className="px-5 py-2.5 flex justify-between text-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {km}km{km === 42.195 ? ' (마라톤)' : ''}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">{fmtTime(km / answer.v)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
