'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { carCost, fixedCost, type CarInput } from '@/lib/car-cost';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CarCostPage() {
  const [v, setV] = useState({
    km: '12000', kmpl: '12', fuelPrice: '1700',
    tax: '520000', insurance: '800000', maintenance: '400000', parking: '600000',
  });
  const [result, setResult] = useState<null | (ReturnType<typeof carCost> & { fixed: number })>(null);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV(prev => ({ ...prev, [k]: e.target.value }));

  function calculate() {
    const input: CarInput = {
      km: Number(v.km), kmpl: Number(v.kmpl), fuelPrice: Number(v.fuelPrice),
      tax: Number(v.tax), insurance: Number(v.insurance),
      maintenance: Number(v.maintenance), parking: Number(v.parking),
    };
    if (input.km < 0) return;
    setResult({ ...carCost(input), fixed: fixedCost(input) });
  }

  const fields: [keyof typeof v, string, string][] = [
    ['km', '연간 주행거리 (km)', '12000'],
    ['kmpl', '연비 (km/L, 전기차면 0)', '12'],
    ['fuelPrice', '연료 단가 (원/L)', '1700'],
    ['tax', '자동차세 (원/년)', '520000'],
    ['insurance', '보험료 (원/년)', '800000'],
    ['maintenance', '정비·소모품 (원/년)', '400000'],
    ['parking', '주차·통행료 (원/년)', '600000'],
  ];

  return (
    <CalcShell
      path="/calculator/car-cost"
      title="차량 유지비 계산기"
      description="연간 유지비와 월 평균, 1km당 비용"
      intro={
        <>
          <h2>차값보다 매년 나가는 돈이 큽니다</h2>
          <p>
            차를 살 때는 차값을 보지만, 실제로 손에서 빠져나가는 것은 <strong>세금·보험·연료·정비가
            해마다 되풀이되는 쪽</strong>입니다. 십 년을 타면 그 합이 차값을 넘기는 일도 흔합니다.
            한 해 얼마인지 세어 두면 &ldquo;이 차를 굴리는 데 한 달에 얼마&rdquo;가 나옵니다.
          </p>
          <h2>안 굴려도 나가는 돈이 있습니다</h2>
          <p>
            자동차세와 보험료, 주차비는 <strong>세워 두기만 해도 나갑니다</strong>. 이 고정비가 큰데
            주행거리가 적다면, 덜 타는 것으로는 줄지 않는다는 뜻입니다. 그럴 때는 차를 덜 타는 대신
            차를 두는 방식 자체를 다시 볼 자리입니다.
          </p>
          <h2>많이 탈수록 km당 비용은 싸집니다</h2>
          <p>
            고정비가 더 많은 거리로 나뉘기 때문입니다. 반대로 <strong>적게 타는 차일수록 1km가 비쌉니다</strong> —
            연간 5,000km만 타는 차는 같은 조건에서 km당 비용이 두 배 넘게 나옵니다.
            한 번의 주행에 드는 기름값만 보려면{' '}
            <Link href="/calculator/gas-cost" className="underline">주유비 계산기</Link>를 쓰세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/car-cost" available={ALL_LOCALES10} />
        </div>
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            {fields.map(([k, label, ph]) => (
              <div key={k}>
                <Label>{label}</Label>
                <input type="number" value={v[k]} onChange={set(k)} placeholder={ph} className={inputCls} min="0" />
              </div>
            ))}
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">한 해 유지비</p>
              <p className="text-white text-3xl font-black">{fmt(result.yearly)}원</p>
              <p className="text-blue-200 text-xs mt-1">
                월 {fmt(result.monthly)}원 · 1km당 {fmt(result.perKm)}원
              </p>
            </div>
            <Card>
              <CardHeader title="항목별" />
              <div className="divide-y divide-slate-100">
                {[
                  ['연료비', result.fuel],
                  ['자동차세', result.tax],
                  ['보험료', result.insurance],
                  ['정비·소모품', result.maintenance],
                  ['주차·통행료', result.parking],
                ].map(([k, val]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(val as number)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                안 굴려도 나가는 돈 {fmt(result.fixed)}원 (한 해의 {Math.round((result.fixed / result.yearly) * 100)}%)
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                연료비가 차지하는 몫은 {Math.round(result.fuelShare * 100)}%입니다.
                이 비율이 낮으면 덜 타는 것으로는 유지비가 크게 안 줄어듭니다.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
