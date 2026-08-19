'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 빈 칸으로 열면 무엇을
 * 보여 주는 계산기인지 눌러 보기 전에는 모른다 — 값을 미리 넣어 두면 「계산하기」
 * 한 번에 한 벌이 통째로 보이고, 사람은 그 위에 자기 숫자를 덮어쓴다.
 * 값은 내가 지어내지 않고 저자가 이미 골라 둔 예시를 그대로 올렸다.
 */
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();
const UNIT_PRICE = 805; // 서울 가정용 원/m³

export default function GasBillPage() {
  const [usage, setUsage] = useState('30');
  const [season, setSeason] = useState<'winter' | 'other'>('other');
  const [customPrice, setCustomPrice] = useState('');
  const [result, setResult] = useState<null | {
    basicFee: number; usageFee: number; vat: number; total: number;
  }>(null);

  function calculate() {
    const u = Number(usage);
    if (u <= 0) return;
    const price = Number(customPrice || 0) || UNIT_PRICE;
    const basicFee = season === 'winter' ? 1540 : 850;
    const usageFee = u * price;
    const subtotal = basicFee + usageFee;
    const vat = subtotal * 0.1;
    setResult({ basicFee, usageFee, vat, total: subtotal + vat });
  }

  return (
    <CalcShell
      path="/calculator/gas-bill"
      title="가스요금 계산기"
      description="도시가스 주택용 요금 계산 (서울 기준)"
      intro={
        <>
          <h2>가스는 누진제가 없습니다</h2>
          <p>
            전기와 달리 도시가스 주택용은 <strong>단가가 일정</strong>합니다. 쓴 만큼 곱하면 끝이라
            많이 썼다고 단가가 뛰지 않습니다. 겨울 가스요금이 무서운 건 누진 때문이 아니라 그냥 사용량이
            몇 배로 늘기 때문입니다.
          </p>
          <h2>단가는 지역과 계절에 따라 다릅니다</h2>
          <p>
            도시가스는 <strong>지역 공급사별로 요금이 다르고</strong>, 원료비 연동제라 국제 가스 가격에 따라
            주기적으로 조정됩니다. 이 계산기는 서울 가정용 <strong>805원/㎥</strong>를 기본값으로 두지만,
            고지서에 적힌 단가를 직접 넣으면 훨씬 정확합니다. 취사용과 난방용 단가가 나뉘는 경우도 있습니다.
          </p>
          <h2>㎥와 MJ</h2>
          <p>
            고지서에 <strong>MJ(메가줄)</strong>로 적혀 있다면 열량 단위입니다. 계량기는 부피(㎥)로 재고
            요금은 열량으로 매기는 곳이 있어서, 열량환산계수를 곱해 변환합니다. 이 계수도 지역·시기에 따라
            달라집니다. 여기에 <strong>부가가치세 10%</strong>가 붙어 최종 금액이 됩니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>사용량 (m³)</Label>
              <input type="number" value={usage} onChange={e => setUsage(e.target.value)}
                placeholder="예: 30" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>계절</Label>
              <select value={season} onChange={e => setSeason(e.target.value as 'winter' | 'other')} className={inputCls}>
                <option value="winter">동절기 (12~3월) — 기본요금 1,540원</option>
                <option value="other">기타 계절 — 기본요금 850원</option>
              </select>
            </div>
            <div>
              <Label>단가 (원/m³, 비워두면 서울 기준 805원 적용)</Label>
              <MoneyInput value={customPrice} onChange={setCustomPrice} placeholder="805" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">이번 달 가스요금</p>
              <p className="stat-value">{fmt(result.total)}원</p>
            </div>
            <Card>
              <CardHeader title="요금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '기본요금', value: result.basicFee },
                  { label: '사용요금', value: result.usageFee },
                  { label: '부가가치세 (10%)', value: result.vat },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 서울 기준 가정용 단가 805원/m³ · 지역에 따라 다름</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
