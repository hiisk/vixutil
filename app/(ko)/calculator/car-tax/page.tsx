'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();

function getRate(cc: number): number {
  if (cc <= 1000) return 80;
  if (cc <= 1600) return 140;
  if (cc <= 2000) return 200;
  return 220;
}

function getAgeDiscount(years: number): number {
  if (years <= 2) return 0;
  if (years >= 12) return 0.5;
  return Math.min(0.5, (years - 2) * 0.05);
}

export default function CarTaxPage() {
  const [type, setType] = useState<'ice' | 'ev' | 'hybrid'>('ice');
  const [cc, setCc] = useState('');
  const [age, setAge] = useState('0');
  const [result, setResult] = useState<null | {
    base: number; discount: number; afterDiscount: number; eduTax: number; total: number; earlyDiscount: number;
  }>(null);

  function calculate() {
    let base = 0;
    if (type === 'ev') {
      base = 100_000;
    } else if (type === 'hybrid') {
      const c = Number(cc);
      if (c <= 0) return;
      base = c * getRate(c) * 0.85;
    } else {
      const c = Number(cc);
      if (c <= 0) return;
      base = c * getRate(c);
    }

    const discountRate = getAgeDiscount(Number(age));
    const discount = base * discountRate;
    const afterDiscount = base - discount;
    const eduTax = afterDiscount * 0.3;
    const total = afterDiscount + eduTax;
    const earlyDiscount = total * 0.0915;
    setResult({ base, discount, afterDiscount, eduTax, total, earlyDiscount });
  }

  return (
    <CalcShell
      path="/calculator/car-tax"
      title="자동차세 계산기"
      description="2024년 배기량 기준 자동차세 계산"
      intro={
        <>
          <h2>배기량 × cc당 세액</h2>
          <p>
            승용차 자동차세는 <strong>배기량(cc) × cc당 세액</strong>입니다. cc당 세액은{' '}
            <strong>1,000cc 이하 80원</strong>, <strong>1,600cc 이하 140원</strong>,{' '}
            <strong>2,000cc 이하 200원</strong>, 그 초과는 220원입니다. 구간이 바뀌는 지점에서 세금이
            껑충 뛰기 때문에, 1,599cc와 1,601cc는 배기량은 비슷해도 세금 차이가 큽니다.
            여기에 <strong>지방교육세 30%</strong>가 더 붙습니다.
          </p>
          <h2>차가 오래되면 깎아줍니다</h2>
          <p>
            차령 <strong>3년차부터 매년 5%씩</strong> 감면되고 <strong>12년 이상이면 50%</strong>에서
            멈춥니다. 오래된 차의 가치가 떨어진 것을 반영하는 것이라, 같은 차종이어도 연식에 따라 내는
            돈이 다릅니다.
          </p>
          <h2>전기차는 배기량이 없습니다</h2>
          <p>
            엔진이 없으니 배기량 기준을 쓸 수 없어서 <strong>연 10만원 정액</strong>입니다. 하이브리드는
            배기량 기준으로 계산하되 이 계산기는 <strong>15% 감면</strong>을 적용합니다. 친환경차 세제는
            제도가 계속 바뀌는 영역이라 시점에 따라 달라질 수 있습니다.
          </p>
          <h2>연납하면 할인됩니다</h2>
          <p>
            자동차세는 보통 6월과 12월에 나눠 내지만, <strong>1월에 1년치를 미리 내면</strong> 약 9.15%를
            할인받습니다(신청 시기가 늦어지면 할인율이 줄어듭니다). 이 계산기는 연납 할인 금액도 함께
            보여줍니다. 정확한 부과액은 관할 지자체 고지서를 따릅니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'ice', label: '내연기관' },
            { value: 'ev', label: '전기차' },
            { value: 'hybrid', label: '하이브리드' },
          ]}
          value={type}
          onChange={v => { setType(v as 'ice' | 'ev' | 'hybrid'); setResult(null); }}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            {type !== 'ev' && (
              <div>
                <Label>배기량 (cc)</Label>
                <input type="number" value={cc} onChange={e => setCc(e.target.value)}
                  placeholder="예: 2000" className={inputCls} min="0" />
              </div>
            )}
            {type === 'ev' && (
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 text-center">
                <p className="text-blue-600 font-bold">전기차 자동차세: 연 100,000원 (고정)</p>
              </div>
            )}
            <div>
              <Label>차량 연식 (경과 연수)</Label>
              <select value={age} onChange={e => setAge(e.target.value)} className={inputCls}>
                <option value="0">1~2년 (감면 없음)</option>
                {Array.from({ length: 10 }, (_, i) => i + 3).map(n => (
                  <option key={n} value={n}>{n}년 ({Math.min(50, (n - 2) * 5)}% 감면)</option>
                ))}
                <option value="12">12년 이상 (50% 감면)</option>
              </select>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">연간 자동차세 합계</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
              <p className="text-blue-200 text-sm mt-1">1월 연납 시 {fmt(result.earlyDiscount)}원 절약 (9.15% 할인)</p>
            </div>
            <Card>
              <CardHeader title="세금 내역" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: '자동차세 (과표)', value: result.base },
                  ...(result.discount > 0 ? [{ label: '경과연수 감면', value: -result.discount }] : []),
                  { label: '감면 후 자동차세', value: result.afterDiscount },
                  { label: '지방교육세 (자동차세×30%)', value: result.eduTax },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className={`font-semibold ${r.value < 0 ? 'text-emerald-600' : ''}`}>
                      {r.value < 0 ? '-' : ''}{fmt(Math.abs(r.value))}원
                    </span>
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
