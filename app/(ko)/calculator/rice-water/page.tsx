'use client';
import { useState } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';

/**
 * 쌀 부피에 곱하는 물의 배수만 적는다. 나머지는 곱셈이다.
 *
 * 이 배수는 법으로 정해진 값이 아니라 널리 쓰이는 어림이다. 쌀의 묵은 정도와
 * 불린 시간에 따라 달라지므로 범위를 함께 보여 준다.
 */
const RICE = [
  { id: 'white', label: '백미', mult: 1.2, soak: '30분', note: '햅쌀은 물을 조금 줄이고 묵은쌀은 조금 늘립니다.' },
  { id: 'brown', label: '현미', mult: 1.5, soak: '2시간 이상', note: '겉껍질이 남아 있어 물과 시간이 더 듭니다.' },
  { id: 'mixed', label: '잡곡밥', mult: 1.3, soak: '1시간', note: '잡곡 비율이 높을수록 물을 늘리세요.' },
  { id: 'porridge', label: '죽', mult: 5, soak: '30분', note: '되기를 보고 끓이는 중에 더 부어도 됩니다.' },
] as const;

/** 밥 한 공기는 쌀 약 0.5컵(불리기 전) */
const CUP_ML = 180;

export default function RiceWaterPage() {
  const [kind, setKind] = useState<(typeof RICE)[number]['id']>('white');
  const [cups, setCups] = useState('');

  const r = RICE.find(x => x.id === kind)!;
  const c = Number(cups);
  const water = c > 0 ? c * CUP_ML * r.mult : null;
  const bowls = c > 0 ? c * 2 : null;

  return (
    <CalcShell
      path="/calculator/rice-water"
      title="밥물 계산기"
      description="쌀 양에 맞는 물 양을 계산합니다"
      intro={
        <>
          <h2>손등이 아니라 배수로</h2>
          <p>
            물을 손등까지 맞추는 방법은 냄비 크기가 바뀌면 어긋납니다. 쌀 부피에 일정한 배수를 곱하는
            쪽이 어디서든 같은 밥이 나옵니다. 백미는 <strong>쌀 부피의 1.2배</strong>가 기준입니다.
          </p>
          <h2>계량컵 한 컵은 180ml</h2>
          <p>
            밥솥에 딸려 오는 컵은 보통 <strong>180ml</strong>입니다. 요리용 계량컵(200ml)이나 미국식
            컵(240ml)과 다르므로 섞어 쓰면 물이 어긋납니다. 이 계산기는 180ml 기준입니다.
          </p>
          <h2>불리는 시간이 물 양을 바꿉니다</h2>
          <p>
            불린 쌀은 이미 물을 머금고 있어 배수를 조금 낮춰야 합니다. 반대로 안 불린 쌀은 물을 조금
            늘립니다. 현미와 잡곡은 겉껍질이 남아 있어 더 오래 불리고 물도 더 넣습니다.
          </p>
          <h2>어림값입니다</h2>
          <p>
            묵은쌀은 수분이 빠져 물을 더 먹고, 햅쌀은 덜 먹습니다. 처음에는 기준대로 하고 다음번에
            한 숟갈씩 옮겨 잡으세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-2">
          {RICE.map(x => (
            <button
              key={x.id}
              onClick={() => setKind(x.id)}
              className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                kind === x.id
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`block text-sm font-bold ${kind === x.id ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-200'}`}>
                {x.label}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">×{x.mult}</span>
            </button>
          ))}
        </div>

        <Card className="p-5">
          <div className="relative">
            <input
              type="number"
              value={cups}
              onChange={e => setCups(e.target.value)}
              placeholder="쌀 몇 컵"
              min={0}
              step={0.5}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">컵</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">밥솥 계량컵 1컵 = 180ml 기준</p>
        </Card>

        {water !== null && (
          <>
            <div className="stat-pri text-center">
              <p className="stat-sub mb-2">물</p>
              <p className="text-slate-900 dark:text-slate-50 text-5xl font-bold">{Math.round(water)}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xl mt-1">ml</p>
              <p className="stat-sub mt-3 opacity-90">
                계량컵으로 약 {(water / CUP_ML).toFixed(1)}컵 · 밥 약 {bowls}공기
              </p>
            </div>

            <Card className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-100">{r.label}</strong>은 {r.soak} 정도 불리는 것을 권합니다. {r.note}
              </p>
            </Card>

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="label-caps">컵 수별 물 양</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setCups(String(n))}
                    className={`w-full px-5 py-3 flex justify-between items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      c === n ? 'bg-emerald-50 dark:bg-emerald-950/30' : ''
                    }`}
                  >
                    <span className={`font-semibold ${c === n ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-200'}`}>
                      쌀 {n}컵
                    </span>
                    <span className="text-slate-400 dark:text-slate-500">물 {Math.round(n * CUP_ML * r.mult)}ml</span>
                  </button>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
