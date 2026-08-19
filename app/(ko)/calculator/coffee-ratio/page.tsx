'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

/**
 * 원두와 물의 비율만 정하면 나머지는 나눗셈이다.
 *
 * 추출 방식마다 흔히 쓰는 비율이 다르다. 여기 적은 값은 널리 쓰이는 범위이고
 * 정답이 아니다 — 취향과 원두 상태에 따라 옮겨 잡는 것이 정상이다.
 */
const METHODS = [
  { id: 'drip', label: '핸드드립', ratio: 16, range: '1:15~1:17', note: '가장 무난한 범위입니다. 연하면 숫자를 낮추세요.' },
  { id: 'french', label: '프렌치프레스', ratio: 15, range: '1:12~1:16', note: '굵게 갈아 4분 담가 두는 방식입니다.' },
  { id: 'cold', label: '콜드브루', ratio: 8, range: '1:5~1:10', note: '원액 기준입니다. 마실 때 물이나 우유로 희석합니다.' },
  { id: 'moka', label: '모카포트', ratio: 10, range: '1:7~1:12', note: '진하게 나옵니다. 바스켓을 꾹 누르지 마세요.' },
] as const;

export default function CoffeeRatioPage() {
  const [method, setMethod] = useState<(typeof METHODS)[number]['id']>('drip');
  const [mode, setMode] = useState<'bean' | 'water'>('bean');
  const [value, setValue] = useState('');
  const [ratio, setRatio] = useState('');

  const m = METHODS.find(x => x.id === method)!;
  const r = ratio === '' ? m.ratio : Math.max(1, Number(ratio));
  const v = Number(value);

  const result = v > 0 && r > 0
    ? mode === 'bean'
      ? { bean: v, water: v * r }
      : { bean: v / r, water: v }
    : null;

  return (
    <CalcShell
      path="/calculator/coffee-ratio"
      title="커피 비율 계산기"
      description="원두와 물의 비율로 필요한 양을 계산합니다"
      intro={
        <>
          <h2>비율 하나면 나머지는 정해집니다</h2>
          <p>
            커피는 <strong>원두 1에 물 몇</strong>으로 적습니다. 1:16이면 원두 20g에 물 320ml입니다.
            잔 수로 외우는 것보다 이 비율 하나를 잡아 두는 편이 낫습니다 — 몇 잔을 내리든 같은 맛이
            나오기 때문입니다.
          </p>
          <h2>물의 부피와 무게</h2>
          <p>
            물은 1ml가 거의 1g이라 저울 하나로 둘 다 잽니다. 그래서 커피를 내릴 때는 계량컵보다
            저울이 편합니다. 이 계산기도 ml와 g을 같은 값으로 봅니다.
          </p>
          <h2>연하거나 쓸 때</h2>
          <p>
            연하면 물 쪽 숫자를 낮추고(1:16 → 1:15), 쓰거나 텁텁하면 높입니다(1:16 → 1:17).
            비율을 그대로 두고 굵기만 바꾸는 방법도 있습니다 — 곱게 갈수록 진하고 떫어집니다.
            한 번에 하나씩만 바꿔야 무엇 때문인지 알 수 있습니다.
          </p>
          <h2>콜드브루는 원액입니다</h2>
          <p>
            콜드브루의 1:8은 마시는 농도가 아니라 <strong>원액</strong> 기준입니다. 보통 원액 1에 물이나
            우유 2~3을 더해 마십니다. 다른 방식과 같은 잣대로 보면 지나치게 진해 보입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-2">
          {METHODS.map(x => (
            <button
              key={x.id}
              onClick={() => { setMethod(x.id); setRatio(''); }}
              className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                method === x.id
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`block text-xs font-bold ${method === x.id ? 'text-amber-700 dark:text-amber-300' : 'text-slate-700 dark:text-slate-200'}`}>
                {x.label}
              </span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">1:{x.ratio}</span>
            </button>
          ))}
        </div>

        <TabBar
          options={[
            { value: 'bean', label: '원두로 물 구하기' },
            { value: 'water', label: '물로 원두 구하기' },
          ]}
          value={mode}
          onChange={v2 => { setMode(v2 as 'bean' | 'water'); setValue(''); }}
        />

        <Card className="p-5">
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={mode === 'bean' ? '원두 g 입력' : '물 ml 입력'}
              min={0}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-14"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
              {mode === 'bean' ? 'g' : 'ml'}
            </span>
          </div>
          <div className="mt-3">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              비율 1: <span className="font-normal">— 비우면 {m.label} 기본값 {m.ratio} ({m.range})</span>
            </label>
            <input
              type="number"
              value={ratio}
              onChange={e => setRatio(e.target.value)}
              placeholder={String(m.ratio)}
              min={1}
              step={0.5}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-lg font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-sub mb-3 text-center">1 : {r} 비율</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="stat-label">원두</p>
                  <p className="stat-value">{result.bean.toFixed(1)}</p>
                  <p className="stat-sub">g</p>
                </div>
                <div className="text-center">
                  <p className="stat-label">물</p>
                  <p className="stat-value">{Math.round(result.water)}</p>
                  <p className="stat-sub">ml</p>
                </div>
              </div>
            </div>

            <Card className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m.note}</p>
            </Card>

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="label-caps">잔 수로 보기 (한 잔 200ml)</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 2, 3, 4].map(cups => (
                  <button
                    key={cups}
                    onClick={() => { setMode('water'); setValue(String(cups * 200)); }}
                    className="w-full px-5 py-3 flex justify-between items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{cups}잔 ({cups * 200}ml)</span>
                    <span className="text-slate-400 dark:text-slate-500">원두 {((cups * 200) / r).toFixed(1)}g</span>
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
