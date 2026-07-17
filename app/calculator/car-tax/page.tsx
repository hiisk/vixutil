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
    <CalcShell path="/calculator/car-tax" title="자동차세 계산기" description="2024년 배기량 기준 자동차세 계산">
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
