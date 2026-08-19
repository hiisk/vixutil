'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import {
  BENEFIT_RULES, amountOfMedian, calcMedianIncome, medianFor,
} from '@/lib/median-income';

const fmt = (n: number) => Math.round(n).toLocaleString();

/** 고시표의 칸 이름 — 마지막 칸은 "그 인원 이상"이다 */
const SIZE_LABELS = ['1인', '2인', '3인', '4인', '5인', '6인', '7인 이상'];

export default function MedianIncomePage() {
  const [table, setTable] = useState<string[]>(Array(SIZE_LABELS.length).fill(''));
  const [size, setSize] = useState(1);
  const [incomeValue, setIncomeValue] = useState('0');
  const [assetValue, setAssetValue] = useState('0');
  const [pct, setPct] = useState('100');
  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcMedianIncome>;
    size: number;
    custom: { percent: number; amount: number } | null;
  }>(null);

  function setCell(i: number, v: string) {
    setTable(prev => prev.map((x, j) => (i === j ? v : x)));
  }

  function calculate() {
    const medianBySize = table.map(v => Number(v || 0));
    if (medianFor(medianBySize, size) <= 0) return;
    const r = calcMedianIncome({
      medianBySize,
      size,
      incomeValue: Number(incomeValue || 0),
      assetValue: Number(assetValue || 0),
    });
    const p = Number(pct);
    setResult({
      r,
      size,
      custom: p > 0 ? { percent: p, amount: amountOfMedian(p, r.median) } : null,
    });
  }

  return (
    <CalcShell
      path="/calculator/median-income"
      title="기준 중위소득 계산기"
      description="복지 급여 선정기준액과 내 소득이 중위소득의 몇 %인지 계산합니다"
      intro={
        <>
          <h2>중위소득은 평균이 아닙니다</h2>
          <p>
            모든 가구를 소득 순으로 줄 세웠을 때 <strong>정확히 가운데 서 있는 가구</strong>의 소득입니다.
            평균은 위쪽 소수의 큰 소득이 끌어올리지만 가운데 값은 그 영향을 받지 않습니다. 그래서
            &ldquo;보통 가구의 형편&rdquo;을 나타내는 값으로 쓰이고, 여기에 정부가 정한 계수를 반영해
            해마다 고시하는 것이 <strong>기준 중위소득</strong>입니다.
          </p>
          <h2>왜 이 숫자가 복지 자격을 정하나</h2>
          <p>
            국민기초생활보장의 네 급여는 금액을 따로 정해 두지 않고 모두{' '}
            <strong>&ldquo;기준 중위소득의 몇 % 이하&rdquo;</strong>로 대상을 고릅니다. 그래서 내 소득이
            중위소득의 몇 %인지만 알면 어디까지 해당하는지가 정해집니다.
          </p>
          <p>
            {BENEFIT_RULES.map(r => `${r.label} ${r.percent}%`).join(' · ')}
          </p>
          <p>
            퍼센트는 법령·고시로 정해져 금액처럼 해마다 바뀌지는 않습니다. 반대로{' '}
            <strong>금액은 해마다 바뀝니다</strong> — 그리고 가구원 수별 금액이 서로 정비례가 아닙니다.
            2인 가구는 1인의 두 배가 아니고, 가구원이 한 명 늘 때 붙는 폭도 일정하지 않아 배수로 짐작할
            수 없습니다. 그래서 이 계산기는 금액을 넣어 두지 않고 <strong>가구원 수별 고시액을 각각</strong>
            {' '}받습니다. 그 해 값은 보건복지부 고시나 복지로에서 확인해 넣으세요.
          </p>
          <h2>생계급여는 차액을 줍니다</h2>
          <p>
            네 급여 중 생계급여만 <strong>기준액에서 소득인정액을 뺀 만큼</strong>을 줍니다. 정액을 주는
            것이 아니라 모자란 만큼을 채워 주는 것이라, 소득이 한 푼도 없으면 기준액 전액이 나오고 소득이
            기준액에 닿으면 선정은 되어도 받는 돈은 0이 됩니다. 나머지 셋은 성격이 다릅니다 — 의료급여는
            진료비 본인부담 체계이고, 주거급여는 지역별 기준임대료와 자기부담분으로 따로 셈하며, 교육급여는
            정액으로 줍니다. 그래서 이 계산기는 <strong>생계급여만 금액을 내고</strong> 나머지는 자격 판정만
            합니다.
          </p>
          <h2>소득인정액은 기초연금과 기준이 다릅니다</h2>
          <p>
            이름이 같고 뼈대도 같습니다 — <strong>소득인정액 = 소득평가액 + 재산의 소득환산액</strong>.
            그러나 환산율과 공제가 제도마다 다릅니다.{' '}
            <Link href="/calculator/basic-pension" className="underline">기초연금</Link>은 재산에 연 4%를
            매겨 12로 나누는 한 가지 비율을 쓰는데, 기초생활보장은 주거용재산·일반재산·금융재산·자동차에
            각각 다른 월 환산율을 고시로 씁니다. <strong>같은 집과 같은 예금으로 두 제도의 소득인정액이
            다르게 나옵니다.</strong> 여기서 그 환산을 대신 해 주면 남의 제도 숫자를 이 제도의 답처럼
            내놓게 되므로, 소득평가액과 재산의 소득환산액을 <strong>각각 받아 더하기만</strong> 합니다.
            정확한 환산액은 복지로 모의계산이나 주민센터 상담에서 확인하세요.
          </p>
          <h2>이 계산이 답하지 못하는 것</h2>
          <p>
            여기서 보는 것은 <strong>소득 기준 한 가지</strong>입니다. 부양의무자 기준(의료급여에 남아
            있습니다)·근로능력 판정·자동차 보유·가구 구성 인정 범위 같은 별도 요건은 보지 않습니다. 그래서
            여기서 &ldquo;해당&rdquo;이 나와도 실제로는 탈락할 수 있고, 반대로 소득이 조금 넘어도 공제와
            특례로 선정되는 경우가 있습니다.{' '}
            <strong>이 판정은 참고이고 실제 결정은 주민센터 신청과 복지로 조사로 정해집니다.</strong>
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              그 해 고시표 — 가구원 수별 기준 중위소득 (월, 원)
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {SIZE_LABELS.map((label, i) => (
                <div key={label}>
                  <Label>{label} 가구</Label>
                  <input type="number" value={table[i]} onChange={e => setCell(i, e.target.value)}
                    placeholder="고시액" className={inputCls} min="0" />
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              고른 가구원 수의 칸만 채워도 계산됩니다. 배수로 짐작하지 않으려고 칸을 각각 두었습니다.
            </p>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">우리 가구</p>
            <div className="grid grid-cols-4 gap-2">
              {SIZE_LABELS.map((label, i) => (
                <button key={label} onClick={() => setSize(i + 1)}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    size === i + 1
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              소득인정액 (기초생활보장 기준)
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>소득평가액 (월, 원)</Label>
                <MoneyInput value={incomeValue} onChange={setIncomeValue} />
              </div>
              <div>
                <Label>재산의 소득환산액 (월, 원)</Label>
                <MoneyInput value={assetValue} onChange={setAssetValue} />
              </div>
            </div>
            <div>
              <Label>따로 볼 퍼센트 <span className="dial-opt">%, 비우면 생략</span></Label>
              <input type="number" value={pct} onChange={e => setPct(e.target.value)}
                placeholder="예: 100" className={inputCls} min="0" step="1" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-lg p-5 ${result.r.eligible.length > 0 ? 'bg-blue-600' : 'bg-slate-600'}`}>
              <p className="text-blue-200 text-xs mb-1">내 소득인정액은 기준 중위소득의</p>
              <p className="text-white text-3xl font-bold">{result.r.percent.toFixed(1)}%</p>
              <p className="text-blue-200 text-xs mt-1">
                {SIZE_LABELS[result.size - 1]} 가구 기준 중위소득 {fmt(result.r.median)}원 ·
                소득인정액 {fmt(result.r.recognized)}원
              </p>
            </div>

            <Card className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {result.r.eligible.length > 0 ? (
                  <>
                    소득 기준으로는 <strong>{result.r.eligible.join(' · ')}</strong>의 선정기준 안에
                    들어옵니다. 다른 요건은 보지 않은 값입니다.
                  </>
                ) : (
                  <>
                    소득인정액이 <strong>네 급여의 선정기준을 모두 넘었습니다.</strong> 기준이 가장 높은{' '}
                    {result.r.lines[result.r.lines.length - 1].label} 기준액{' '}
                    {fmt(result.r.lines[result.r.lines.length - 1].threshold)}원을{' '}
                    {fmt(-result.r.lines[result.r.lines.length - 1].headroom)}원 초과합니다.
                  </>
                )}
              </p>
            </Card>

            <Card>
              <CardHeader title="급여별 선정기준과 판정" sub={`${SIZE_LABELS[result.size - 1]} 가구`} />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.r.lines.map(l => (
                  <div key={l.label} className="px-5 py-3 flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {l.label} <span className="text-slate-400 dark:text-slate-500">{l.percent}%</span>
                    </span>
                    <span className="text-right">
                      <span className="font-semibold">{fmt(l.threshold)}원</span>
                      <span className={`ml-2 text-xs font-bold ${l.eligible ? 'text-blue-600' : 'text-slate-400 dark:text-slate-500'}`}>
                        {l.eligible ? '해당' : '초과'}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="생계급여는 차액을 준다" sub="기준액 − 소득인정액" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  [`${result.r.lines[0].label} 기준액 (${result.r.lines[0].percent}%)`, `${fmt(result.r.lines[0].threshold)}원`],
                  ['소득인정액', `−${fmt(result.r.recognized)}원`],
                  ['예상 월 지급액', `${fmt(result.r.livelihood)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              {result.r.livelihood === 0 && (
                <p className="px-5 pb-4 text-xs text-slate-400 dark:text-slate-500">
                  소득인정액이 기준액에 닿거나 넘어 채워 줄 차액이 없습니다.
                </p>
              )}
            </Card>

            {result.custom && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {SIZE_LABELS[result.size - 1]} 가구 기준 중위소득의{' '}
                  <strong>{result.custom.percent}%</strong>는{' '}
                  <strong>{fmt(result.custom.amount)}원</strong>입니다. 한부모·차상위·청년 지원처럼 다른
                  퍼센트를 쓰는 제도의 기준액을 볼 때 쓰세요.
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 고시액은 입력한 것을 그대로 씁니다 · 소득 기준 한 가지만 본 판정이라 부양의무자·근로능력·
                자동차 등 다른 요건은 반영하지 않았습니다 · 실제 결정은 주민센터 신청과 복지로 조사로
                정해집니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
