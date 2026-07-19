'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

const JONGBU_BRACKETS = [
  { limit: 300_000_000,   rate: 0.005 },
  { limit: 600_000_000,   rate: 0.007 },
  { limit: 1_200_000_000, rate: 0.010 },
  { limit: 2_500_000_000, rate: 0.013 },
  { limit: 5_000_000_000, rate: 0.015 },
  { limit: 9_400_000_000, rate: 0.020 },
  { limit: Infinity,      rate: 0.027 },
];

function calcJongbu(base: number): number {
  if (base <= 0) return 0;
  const b = JONGBU_BRACKETS.find(br => base <= br.limit)!;
  return base * b.rate;
}

function calcPropertyTax2(taxBase: number): number {
  if (taxBase <= 60_000_000) return taxBase * 0.001;
  if (taxBase <= 150_000_000) return 60_000 + (taxBase - 60_000_000) * 0.0015;
  if (taxBase <= 300_000_000) return 195_000 + (taxBase - 150_000_000) * 0.0025;
  return 570_000 + (taxBase - 300_000_000) * 0.004;
}

export default function HoldingTaxPage() {
  const [publicPrice, setPublicPrice] = useState('');
  const [isOneHouse, setIsOneHouse] = useState(true);
  const [paidPropertyTax, setPaidPropertyTax] = useState('');
  const [result, setResult] = useState<null | {
    propertyTax: number; jongbuBase: number; jongbu: number; ruralTax: number;
    totalJongbu: number; totalHolding: number;
  }>(null);

  function calculate() {
    const p = Number(publicPrice);
    if (p <= 0) return;

    const fairRate = isOneHouse ? (p <= 300_000_000 ? 0.45 : p <= 600_000_000 ? 0.5 : 0.6) : 0.6;
    const propTaxBase = p * fairRate;
    const propertyTax = calcPropertyTax2(propTaxBase) * 1.2; // 포함 지방교육세
    const paidProp = Number(paidPropertyTax || 0) || propertyTax;

    const exemption = isOneHouse ? 1_200_000_000 : 900_000_000;
    const jongbuBase = Math.max(0, p * 0.6 - exemption);
    const jongbu = calcJongbu(jongbuBase);
    const credit = Math.min(paidProp, jongbu);
    const netJongbu = Math.max(0, jongbu - credit);
    const ruralTax = netJongbu * 0.2;
    setResult({
      propertyTax,
      jongbuBase,
      jongbu: netJongbu,
      ruralTax,
      totalJongbu: netJongbu + ruralTax,
      totalHolding: propertyTax + netJongbu + ruralTax,
    });
  }

  return (
    <CalcShell
      path="/calculator/holding-tax"
      title="보유세 계산기"
      description="재산세 + 종합부동산세 합계 보유세 계산"
      intro={
        <>
          <h2>보유세 = 재산세 + 종합부동산세</h2>
          <p>
            집을 가지고만 있어도 <strong>매년</strong> 내는 세금입니다. 모두가 내는 재산세에 더해,
            공시가격이 일정 기준을 넘으면 <strong>종합부동산세</strong>가 추가됩니다. 재산세는
            지방세라 지자체에, 종부세는 국세라 국가에 냅니다.
          </p>
          <h2>종부세는 누진 구간이 큽니다</h2>
          <p>
            과세표준 <strong>3억원 이하 0.5%</strong>에서 시작해 구간이 올라갈수록 세율이 붙어
            최고 <strong>2.7%</strong>까지 갑니다. 재산세 최고세율이 0.4%인 것과 비교하면 훨씬
            가파릅니다. 공시가격이 기준선 근처라면 조금 넘는 것만으로 부담이 달라집니다.
          </p>
          <h2>공제와 특례가 빠져 있습니다</h2>
          <p>
            실제 종부세에는 <strong>1세대 1주택 기본공제</strong>가 있고, 고령자·장기보유 세액공제가
            합쳐서 최대 80%까지 적용됩니다. 이미 낸 재산세와 겹치는 부분을 빼주는 공제도 있습니다.
            이 계산기는 그런 공제를 반영하지 않으므로 <strong>실제보다 크게 나올 수 있습니다</strong>.
            1주택 실거주자라면 특히 차이가 큽니다.
          </p>
          <h2>6월 1일이 기준입니다</h2>
          <p>
            재산세와 종부세 모두 <strong>매년 6월 1일 소유자</strong>에게 부과됩니다. 5월 말에 팔면
            그해 보유세는 산 사람이 내고, 6월 2일에 팔면 판 사람이 냅니다. 잔금일을 정할 때 한 번쯤
            따져볼 값어치가 있습니다. 세율과 특례는 자주 개정되므로 정확한 금액은 고지서를 따릅니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>주택 공시가격 합산 (원)</Label>
              <input type="number" value={publicPrice} onChange={e => setPublicPrice(e.target.value)}
                placeholder="예: 1,500,000,000" className={inputCls} min="0" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={isOneHouse} onChange={e => setIsOneHouse(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">1세대 1주택 (공제 12억)</span>
            </label>
            <div>
              <Label>기 납부 재산세 (자동계산 or 직접 입력)</Label>
              <input type="number" value={paidPropertyTax} onChange={e => setPaidPropertyTax(e.target.value)}
                placeholder="비워두면 자동 계산" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">총 보유세</p>
              <p className="text-white text-3xl font-black">{fmt(result.totalHolding)}원</p>
            </div>
            <Card>
              <CardHeader title="보유세 구성" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '재산세 (교육세 포함)', value: result.propertyTax },
                  { label: '종합부동산세', value: result.jongbu, note: result.jongbuBase > 0 ? `과세표준 ${fmt(result.jongbuBase)}원` : '공제 이하 — 미과세' },
                  { label: '농어촌특별세 (종부세×20%)', value: result.ruralTax },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-200">{r.label}</span>
                      <span className="font-semibold">{fmt(r.value)}원</span>
                    </div>
                    {r.note && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{r.note}</p>}
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
