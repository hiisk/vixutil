'use client';
import { useMemo, useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TabBar, SummaryGrid, SummaryCard } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

type Tab = 'calc' | 'rate' | 'reverse';

const w = (n: number) => Math.round(n).toLocaleString();

export default function DiscountPage() {
  const [tab, setTab] = useState<Tab>('calc');

  // 탭1: 할인가 계산
  const [origPrice, setOrigPrice] = useState(50_000);
  const [discRate, setDiscRate] = useState('30');

  // 탭2: 할인율 계산
  const [origPrice2, setOrigPrice2] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  // 탭3: 역산 (할인가 + 할인율 → 원가)
  const [salePrice3, setSalePrice3] = useState(0);
  const [discRate3, setDiscRate3] = useState('');

  const calcResult = useMemo(() => {
    const p = origPrice, r = Number(discRate);
    if (!p || !r || r < 0 || r > 100) return null;
    const saved = p * (r / 100);
    return { discounted: p - saved, saved, rate: r };
  }, [origPrice, discRate]);

  const rateResult = useMemo(() => {
    const p = origPrice2, s = salePrice;
    if (!p || !s || s > p) return null;
    const saved = p - s;
    return { rate: (saved / p) * 100, saved };
  }, [origPrice2, salePrice]);

  const reverseResult = useMemo(() => {
    const s = salePrice3, r = Number(discRate3);
    if (!s || !r || r >= 100) return null;
    const orig = s / (1 - r / 100);
    return { orig, saved: orig - s };
  }, [salePrice3, discRate3]);

  const QUICK_RATES = [5, 10, 15, 20, 25, 30, 50];

  return (
    <CalcShell title="할인 계산기" description="할인가 계산·할인율 계산·원가 역산 세 가지 모드를 지원합니다">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'calc', label: '할인가 계산', sub: '정가 + 할인율' },
            { value: 'rate', label: '할인율 계산', sub: '정가 + 할인가' },
            { value: 'reverse', label: '원가 역산', sub: '할인가 + 할인율' },
          ]}
          value={tab}
          onChange={v => setTab(v)}
        />

        {/* 탭1: 할인가 계산 */}
        {tab === 'calc' && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">할인가 계산</p>
              <div className="flex flex-col gap-3">
                <div>
                  <Label>정가 (원)</Label>
                  <CommaInput value={origPrice} onChange={setOrigPrice} placeholder="예: 50,000" />
                </div>
                <div>
                  <Label>할인율 (%)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_RATES.map(r => (
                      <button key={r} type="button" onClick={() => setDiscRate(String(r))}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                          discRate === String(r) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}>
                        {r}%
                      </button>
                    ))}
                  </div>
                  <input type="number" value={discRate} onChange={e => setDiscRate(e.target.value)}
                    placeholder="직접 입력 (%)" className={inputCls} />
                </div>
              </div>
            </Card>
            {calcResult && (
              <SummaryGrid>
                <SummaryCard label="할인가" value={`${w(calcResult.discounted)}원`} variant="primary" />
                <SummaryCard label="절약 금액" value={`-${w(calcResult.saved)}원`} variant="red" />
                <SummaryCard label="할인율" value={`${calcResult.rate}%`} />
                <SummaryCard label="정가" value={`${w(origPrice)}원`} />
              </SummaryGrid>
            )}
          </>
        )}

        {/* 탭2: 할인율 계산 */}
        {tab === 'rate' && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">할인율 계산</p>
              <div className="flex flex-col gap-3">
                <div>
                  <Label>정가 (원)</Label>
                  <CommaInput value={origPrice2} onChange={setOrigPrice2} placeholder="예: 100,000" />
                </div>
                <div>
                  <Label>할인가 (원)</Label>
                  <CommaInput value={salePrice} onChange={setSalePrice} placeholder="예: 75,000" />
                </div>
              </div>
              <div className="mt-4"><PrimaryBtn onClick={() => {}}>계산하기</PrimaryBtn></div>
            </Card>
            {rateResult && (
              <SummaryGrid>
                <SummaryCard label="할인율" value={`${rateResult.rate.toFixed(1)}%`} variant="primary" />
                <SummaryCard label="절약 금액" value={`-${w(rateResult.saved)}원`} variant="red" />
                <SummaryCard label="정가" value={`${w(origPrice2)}원`} />
                <SummaryCard label="할인가" value={`${w(salePrice)}원`} />
              </SummaryGrid>
            )}
          </>
        )}

        {/* 탭3: 역산 */}
        {tab === 'reverse' && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">원가 역산</p>
              <div className="flex flex-col gap-3">
                <div>
                  <Label>할인가 (원)</Label>
                  <CommaInput value={salePrice3} onChange={setSalePrice3} placeholder="예: 75,000" />
                </div>
                <div>
                  <Label>할인율 (%)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_RATES.map(r => (
                      <button key={r} type="button" onClick={() => setDiscRate3(String(r))}
                        className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                          discRate3 === String(r) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}>
                        {r}%
                      </button>
                    ))}
                  </div>
                  <input type="number" value={discRate3} onChange={e => setDiscRate3(e.target.value)}
                    placeholder="직접 입력 (%)" className={inputCls} />
                </div>
              </div>
              <div className="mt-4"><PrimaryBtn onClick={() => {}}>계산하기</PrimaryBtn></div>
            </Card>
            {reverseResult && (
              <SummaryGrid>
                <SummaryCard label="원가 (정가)" value={`${w(reverseResult.orig)}원`} variant="primary" />
                <SummaryCard label="할인 금액" value={`-${w(reverseResult.saved)}원`} variant="red" />
                <SummaryCard label="할인가" value={`${w(salePrice3)}원`} />
                <SummaryCard label="할인율" value={`${discRate3}%`} />
              </SummaryGrid>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
