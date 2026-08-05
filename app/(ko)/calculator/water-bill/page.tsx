'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const PIPE_BASIC: Record<string, number> = {
  '13': 690, '15': 750, '20': 1010, '25': 2080,
};

function calcWaterFee(usage: number): number {
  if (usage <= 30) return usage * 690;
  if (usage <= 50) return 30 * 690 + (usage - 30) * 870;
  return 30 * 690 + 20 * 870 + (usage - 50) * 1250;
}

export default function WaterBillPage() {
  const [usage, setUsage] = useState('');
  const [pipe, setPipe] = useState('15');
  const [result, setResult] = useState<null | {
    basicFee: number; waterFee: number; sewerFee: number; envFee: number; total: number;
  }>(null);

  function calculate() {
    const u = Number(usage);
    if (u <= 0) return;
    const basicFee = PIPE_BASIC[pipe];
    const waterFee = calcWaterFee(u);
    const sewerFee = Math.round((basicFee + waterFee) * 0.69);
    const envFee = u * 170;
    setResult({ basicFee, waterFee, sewerFee, envFee, total: basicFee + waterFee + sewerFee + envFee });
  }

  return (
    <CalcShell
      path="/calculator/water-bill"
      title="수도요금 계산기"
      description="서울시 상수도 기준 수도·하수도요금 계산"
      intro={
        <>
          <h2>수도요금은 세 가지가 합쳐진 금액입니다</h2>
          <p>
            고지서에 찍히는 금액은 <strong>상수도요금 + 하수도요금 + 물이용부담금</strong>입니다.
            하수도요금은 쓴 물을 버리는 값이라 상수도요금에 연동해서 붙고, 물이용부담금은 사용량에 비례해
            따로 매겨집니다. 상수도요금만 계산하면 실제 고지서의 절반쯤밖에 안 나옵니다.
          </p>
          <h2>상수도도 누진 구간이 있습니다</h2>
          <p>
            가정용은 <strong>30㎥까지</strong>, <strong>50㎥까지</strong>, 그 이상으로 구간이 나뉘고 단가가
            올라갑니다. 전기와 마찬가지로 넘긴 만큼만 비싼 단가가 붙지, 전체가 비싸지는 게 아닙니다.
            기본요금은 <strong>계량기 구경</strong>에 따라 정해져서 사용량과 무관하게 붙습니다.
          </p>
          <h2>부가세가 없습니다</h2>
          <p>
            수도요금은 <strong>부가가치세 면세</strong> 대상이라 전기·가스와 달리 10%가 붙지 않습니다.
          </p>
          <h2>서울시 기준입니다</h2>
          <p>
            수도요금은 <strong>지방자치단체가 정하기 때문에 지역마다 다릅니다</strong>. 이 계산기는 서울시
            가정용 기준이므로 다른 지역은 참고만 하세요. 아파트는 단지 전체 사용량을 세대별로 나누는 방식이
            섞여 있어 개별 고지서와 차이가 날 수 있습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>이번 달 사용량 (m³)</Label>
              <input type="number" value={usage} onChange={e => setUsage(e.target.value)}
                placeholder="예: 20" className={inputCls} min="0" />
            </div>
            <div>
              <Label>계량기 구경</Label>
              <select value={pipe} onChange={e => setPipe(e.target.value)} className={inputCls}>
                <option value="13">13mm (기본요금 690원)</option>
                <option value="15">15mm (기본요금 750원)</option>
                <option value="20">20mm (기본요금 1,010원)</option>
                <option value="25">25mm (기본요금 2,080원)</option>
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">이번 달 수도요금</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <Card>
              <CardHeader title="요금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '기본요금', value: result.basicFee },
                  { label: '상수도 사용요금', value: result.waterFee },
                  { label: '하수도요금 (상수도×69%)', value: result.sewerFee },
                  { label: '물이용부담금 (170원/m³)', value: result.envFee },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 수도요금은 부가세 면세 · 서울시 기준 (지역에 따라 다를 수 있음)</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
