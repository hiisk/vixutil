'use client';
import { useState } from 'react';
import CalcShell, { Card, TabBar } from '@/components/CalcShell';

/**
 * 배터리 용량과 충전기 출력만 넣고 나머지는 나눈다.
 *
 * mAh는 전기량이지 에너지가 아니라 전압을 곱해야 와트시가 된다. 리튬이온
 * 셀의 공칭 전압은 3.7~3.87V 사이인데 요즘 휴대전화는 3.85V가 흔하다.
 *
 * 실효 전력을 정격보다 낮게 잡는 이유: 충전기는 정격 출력을 계속 내지 못한다.
 * 열이 오르면 스스로 낮추고, 80%가 넘으면 전압을 붙든 채 전류만 줄이는 구간
 * (CV)에 들어가 눈에 띄게 느려진다. 그래서 80%까지와 그 뒤를 나눠 보여 준다.
 */
const NOMINAL_V = 3.85;

/** 정격 대비 실제로 배터리에 들어가는 비율 — 변환 손실과 발열 조절을 함께 본다 */
const EFFICIENCY = { wired: 0.7, wireless: 0.5 } as const;

/** 80% 뒤 CV 구간은 대략 세 배 느리다 */
const CV_SLOWDOWN = 3;

const CHARGERS = [5, 10, 18, 20, 30, 45, 65, 100];

const fmt = (h: number) => {
  const mins = Math.round(h * 60);
  return mins < 60 ? `${mins}분` : `${Math.floor(mins / 60)}시간 ${mins % 60}분`;
};

export default function ChargeTimePage() {
  const [unit, setUnit] = useState<'mAh' | 'Wh'>('mAh');
  const [cap, setCap] = useState('');
  const [watt, setWatt] = useState('20');
  const [kind, setKind] = useState<'wired' | 'wireless'>('wired');

  const c = Number(cap);
  const w = Number(watt);
  const wh = unit === 'mAh' ? (c * NOMINAL_V) / 1000 : c;
  const eff = EFFICIENCY[kind];
  const effective = w * eff;

  const result =
    wh > 0 && w > 0
      ? {
          wh,
          effective,
          to80: (0.8 * wh) / effective,
          // 마지막 20%는 전류가 줄어 느려진다
          full: (0.8 * wh) / effective + (0.2 * wh) / (effective / CV_SLOWDOWN),
        }
      : null;

  return (
    <CalcShell
      path="/calculator/charge-time"
      title="충전 시간 계산기"
      description="배터리 용량과 충전기 출력으로 충전 시간을 계산합니다"
      intro={
        <>
          <h2>mAh만으로는 시간을 못 구합니다</h2>
          <p>
            배터리에 적힌 <strong>mAh는 전기량</strong>이지 에너지가 아닙니다. 충전기에 적힌 W는
            에너지를 보내는 속도라 단위가 맞지 않습니다. 전압을 곱해 와트시(Wh)로 바꿔야 나눌 수
            있습니다. 리튬이온 셀의 공칭 전압은 3.85V쯤이므로{' '}
            <strong>Wh = mAh × 3.85 ÷ 1000</strong>입니다. 5,000mAh 배터리는 약 19Wh입니다.
          </p>
          <h2>정격 출력이 그대로 들어가지 않습니다</h2>
          <p>
            20W 충전기가 계속 20W를 보내지는 않습니다. 전압을 바꾸며 열로 새는 몫이 있고, 뜨거워지면
            휴대전화가 스스로 속도를 낮춥니다. 이 계산기는 유선은 정격의 70%, 무선은 50%가 실제로
            들어간다고 봅니다. 무선이 낮은 것은 코일 사이에서 새는 몫이 크기 때문입니다.
          </p>
          <h2>80% 뒤가 오래 걸립니다</h2>
          <p>
            리튬이온 충전은 두 구간으로 나뉩니다. 처음에는 전류를 최대로 밀어 넣다가(CC), 80%쯤부터는
            전압을 붙든 채 전류를 줄입니다(CV). 그래서 <strong>0→80%보다 80→100%가 더 오래</strong>{' '}
            걸립니다. &ldquo;30분에 50%&rdquo; 같은 광고 문구가 완충 시간과 어긋나는 이유입니다.
          </p>
          <h2>어림값입니다</h2>
          <p>
            배터리 온도, 남은 잔량, 충전 중 사용 여부에 따라 크게 달라집니다. 화면을 켜 둔 채
            충전하면 들어가는 만큼 나가므로 훨씬 느립니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'wired', label: '🔌 유선' },
            { value: 'wireless', label: '📶 무선' },
          ]}
          value={kind}
          onChange={v => setKind(v as 'wired' | 'wireless')}
        />

        <Card className="p-5">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">배터리 용량</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={cap}
              onChange={e => setCap(e.target.value)}
              placeholder={unit === 'mAh' ? '예: 5000' : '예: 50'}
              min={0}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <select
              value={unit}
              onChange={e => setUnit(e.target.value as 'mAh' | 'Wh')}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="mAh">mAh</option>
              <option value="Wh">Wh</option>
            </select>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            휴대전화는 보통 mAh, 노트북은 Wh로 적혀 있습니다
          </p>

          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">충전기 출력 (W)</label>
          <input
            type="number"
            value={watt}
            onChange={e => setWatt(e.target.value)}
            min={1}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xl font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {CHARGERS.map(x => (
              <button
                key={x}
                onClick={() => setWatt(String(x))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  w === x
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {x}W
              </button>
            ))}
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-teal-600 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-teal-200 text-xs mb-1">80%까지</p>
                  <p className="text-white text-3xl font-black">{fmt(result.to80)}</p>
                </div>
                <div className="text-center">
                  <p className="text-teal-200 text-xs mb-1">100%까지</p>
                  <p className="text-white text-3xl font-black">{fmt(result.full)}</p>
                </div>
              </div>
              <p className="text-teal-100 text-xs text-center mt-4 opacity-90">
                0%에서 시작할 때 · {kind === 'wired' ? '유선' : '무선'} 기준
              </p>
            </div>

            <Card>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">배터리 에너지</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{result.wh.toFixed(1)} Wh</span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">실제 들어가는 전력</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    약 {result.effective.toFixed(1)} W <span className="text-slate-400">(정격의 {Math.round(eff * 100)}%)</span>
                  </span>
                </div>
                <div className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">80 → 100% 구간</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(result.full - result.to80)}</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="label-caps">충전기별 완충 시간</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {CHARGERS.map(x => {
                  const e2 = x * eff;
                  const full = (0.8 * wh) / e2 + (0.2 * wh) / (e2 / CV_SLOWDOWN);
                  return (
                    <button
                      key={x}
                      onClick={() => setWatt(String(x))}
                      className={`w-full px-5 py-2.5 flex justify-between items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        w === x ? 'bg-teal-50 dark:bg-teal-950/30' : ''
                      }`}
                    >
                      <span className={`font-semibold ${w === x ? 'text-teal-700 dark:text-teal-300' : 'text-slate-700 dark:text-slate-200'}`}>{x}W</span>
                      <span className="text-slate-500 dark:text-slate-400">{fmt(full)}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
