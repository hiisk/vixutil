'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

const fmt = (n: number) => Math.round(n).toLocaleString();
const UNIT_PRICE = 805; // 서울 가정용 원/m³

export default function GasBillPage() {
  const [usage, setUsage] = useState('');
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
    <CalcShell title="가스요금 계산기" description="도시가스 주택용 요금 계산 (서울 기준)">
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
              <input type="number" value={customPrice} onChange={e => setCustomPrice(e.target.value)}
                placeholder="805" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">이번 달 가스요금</p>
              <p className="text-white text-3xl font-black">{fmt(result.total)}원</p>
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
                    <span className="text-slate-600">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-400">* 서울 기준 가정용 단가 805원/m³ · 지역에 따라 다름</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
