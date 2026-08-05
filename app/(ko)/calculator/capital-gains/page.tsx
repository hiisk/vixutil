'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';

const BRACKETS = [
  { limit: 1400, rate: 0.06, deduct: 0 },
  { limit: 5000, rate: 0.15, deduct: 126 },
  { limit: 8800, rate: 0.24, deduct: 576 },
  { limit: 15000, rate: 0.35, deduct: 1544 },
  { limit: 30000, rate: 0.38, deduct: 1994 },
  { limit: 50000, rate: 0.40, deduct: 2594 },
  { limit: 100000, rate: 0.42, deduct: 3594 },
  { limit: Infinity, rate: 0.45, deduct: 6594 },
];

function calcNormalTax(taxableManwon: number) {
  const b = BRACKETS.find(br => taxableManwon <= br.limit)!;
  return Math.max(0, taxableManwon * b.rate - b.deduct) * 10000;
}

function longTermDeductRate(years: number, isOne: boolean) {
  if (years < 3) return 0;
  if (isOne) return Math.min(0.8, (years - 2) * 0.08);
  return Math.min(0.3, (years - 2) * 0.05);
}

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function CapitalGainsPage() {
  const [acquire, setAcquire] = useState('');
  const [transfer, setTransfer] = useState('');
  const [years, setYears] = useState('3');
  const [houseType, setHouseType] = useState<'one' | 'multi' | 'non'>('one');
  const [result, setResult] = useState<null | {
    gain: number; ltdRate: number; ltd: number; basic: number;
    taxBase: number; tax: number; local: number; total: number;
  }>(null);

  function calculate() {
    const acq = Number(acquire);
    const tra = Number(transfer);
    if (acq <= 0 || tra <= 0) return;

    const expense = acq * 0.03;
    const gain = tra - acq - expense;
    if (gain <= 0) { setResult(null); return; }

    const y = Number(years);
    const isOne = houseType === 'one';
    const ltdRate = longTermDeductRate(y, isOne);
    const ltd = gain * ltdRate;
    const basic = 2_500_000;
    const taxBase = Math.max(0, gain - ltd - basic);

    let tax = 0;
    if (y < 2 && houseType !== 'non') {
      tax = taxBase * 0.7;
    } else {
      tax = calcNormalTax(taxBase / 10000);
    }

    const local = tax * 0.1;
    setResult({ gain, ltdRate, ltd, basic, taxBase, tax, local, total: tax + local });
  }

  return (
    <CalcShell
      path="/calculator/capital-gains"
      title="양도소득세 간편 계산기"
      description="취득가·양도가·보유기간 기준 예상 양도소득세"
      intro={
        <>
          <h2>차익에만 세금이 붙습니다</h2>
          <p>
            판 금액 전체가 아니라 <strong>양도가 − 취득가 − 필요경비</strong>가 과세 대상입니다.
            이 계산기는 필요경비를 취득가의 3%로 잡습니다. 실제로는 취득세·중개수수료·법무비용과
            자본적 지출(샷시·확장 등 가치를 올린 공사)이 경비로 들어가므로, 영수증을 모아두면 세금이
            줄어듭니다. 여기에 <strong>기본공제 250만원</strong>과 <strong>지방소득세 10%</strong>가
            반영됩니다.
          </p>
          <h2>오래 보유할수록 깎입니다</h2>
          <p>
            <strong>장기보유특별공제</strong>는 3년 이상부터 적용됩니다. 1주택자는 연 8%씩{' '}
            <strong>최대 80%</strong>까지, 그 외에는 연 5%씩 <strong>최대 30%</strong>까지입니다.
            1주택자 공제 폭이 훨씬 큰데, 실제로는 보유기간과 거주기간을 나눠 계산하므로 살지 않고
            보유만 한 경우에는 이보다 적습니다.
          </p>
          <h2>2년을 못 채우면 70%입니다</h2>
          <p>
            보유기간 <strong>2년 미만</strong>이면 누진세율이 아니라 <strong>단일 70%</strong>가
            적용됩니다(주택 기준). 단기 매매를 막기 위한 중과세율이라, 며칠 차이로 세금이 몇 배가 됩니다.
            매도 시점을 정할 때 취득일부터 며칠이 지났는지 세어볼 값어치가 있습니다.
          </p>
          <h2>1세대 1주택 비과세는 반영되지 않았습니다</h2>
          <p>
            <strong>이 계산기의 가장 큰 한계입니다.</strong> 1세대 1주택으로 요건(보유·거주기간 등)을
            갖추면 양도가 12억원까지 비과세인데, 여기서는 그 판정을 하지 않고 세금을 계산합니다.
            해당된다면 실제 세금은 0이거나 훨씬 적습니다. 다주택 중과, 조정대상지역 여부, 일시적 2주택
            특례도 반영되지 않습니다. 양도세는 사안마다 결론이 갈리고 금액이 크므로 반드시 세무 상담을
            받으세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>취득가액 (원)</Label>
              <input type="number" value={acquire} onChange={e => setAcquire(e.target.value)}
                placeholder="예: 300,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>양도가액 (원)</Label>
              <input type="number" value={transfer} onChange={e => setTransfer(e.target.value)}
                placeholder="예: 500,000,000" className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>보유기간</Label>
                <select value={years} onChange={e => setYears(e.target.value)} className={inputCls}>
                  {[1,2,3,4,5,6,7,8,10,12,15].map(n => (
                    <option key={n} value={n}>{n}년</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>구분</Label>
                <select value={houseType} onChange={e => setHouseType(e.target.value as 'one' | 'multi' | 'non')} className={inputCls}>
                  <option value="one">1가구 1주택</option>
                  <option value="multi">다주택</option>
                  <option value="non">비주택 (토지·상가)</option>
                </select>
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">예상 양도소득세 (지방세 포함)</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="양도차익" value={`${fmt(result.gain)}원`} />
              <SummaryCard label="과세표준" value={`${fmt(result.taxBase)}원`} />
              <SummaryCard label="양도소득세" value={`${fmt(result.tax)}원`} variant="red" />
              <SummaryCard label="지방소득세 (10%)" value={`${fmt(result.local)}원`} variant="red" />
            </div>
            <Card>
              <CardHeader title="계산 과정" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '양도차익', value: fmt(result.gain) + '원' },
                  { label: `장기보유특별공제 (${(result.ltdRate * 100).toFixed(0)}%)`, value: `-${fmt(result.ltd)}원` },
                  { label: '기본공제', value: `-${fmt(result.basic)}원` },
                  { label: '과세표준', value: fmt(result.taxBase) + '원', bold: true },
                ].map(row => (
                  <div key={row.label} className={`px-5 py-3 flex justify-between text-sm ${(row as {bold?:boolean}).bold ? 'bg-slate-50 dark:bg-slate-950 font-bold' : ''}`}>
                    <span className="text-slate-600 dark:text-slate-300">{row.label}</span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">* 필요경비 취득가 3% 적용. 실제 영수증 경비가 있으면 세무사 상담 권장.</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
