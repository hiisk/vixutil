'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, TableWrap } from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';

interface ExtraItem {
  id: number;
  name: string;
  amount: number;
  payer: string; // 'all' or person index string
}

const w = (n: number) => Math.round(n).toLocaleString();

let nextId = 1;

export default function DutchPayPage() {
  const [total, setTotal] = useState(80_000);
  const [people, setPeople] = useState('4');
  const [extras, setExtras] = useState<ExtraItem[]>([]);

  const peopleCount = Math.max(2, Math.min(20, Number(people) || 2));

  const [result, setResult] = useState<Array<{
    name: string;
    base: number;
    extra: number;
    total: number;
  }> | null>(null);

  function calculate() {
    if (!total || peopleCount < 2) return;
    const base = total / peopleCount;
    const rows = Array.from({ length: peopleCount }, (_, i) => ({
      name: `참여자 ${i + 1}`,
      base,
      extra: 0,
      total: base,
    }));

    extras.forEach(ex => {
      const amt = ex.amount;
      if (!amt) return;
      if (ex.payer === 'all') {
        const perPerson = amt / peopleCount;
        rows.forEach(r => { r.extra += perPerson; r.total += perPerson; });
      } else {
        const idx = Number(ex.payer);
        if (idx >= 0 && idx < peopleCount) {
          rows[idx].extra += amt;
          rows[idx].total += amt;
        }
      }
    });

    setResult(rows);
  }

  function addExtra() {
    setExtras(prev => [...prev, { id: nextId++, name: '', amount: 0, payer: 'all' }]);
  }

  function updateExtraText(id: number, field: 'name' | 'payer', value: string) {
    setExtras(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  }

  function updateExtraAmount(id: number, value: number) {
    setExtras(prev => prev.map(e => e.id === id ? { ...e, amount: value } : e));
  }

  function removeExtra(id: number) {
    setExtras(prev => prev.filter(e => e.id !== id));
  }

  return (
    <CalcShell title="더치페이 계산기" description="총 금액과 인원수, 추가 항목을 입력하면 각자 부담할 금액을 계산합니다">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">기본 정보</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label>총 금액 (원)</Label>
              <CommaInput value={total} onChange={setTotal} placeholder="예: 80,000" />
            </div>
            <div className="col-span-2">
              <Label>인원수 (2~20명)</Label>
              <div className="flex flex-wrap gap-2">
                {[2, 3, 4, 5, 6, 8, 10].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPeople(String(n))}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                      people === String(n)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300'
                    }`}
                  >
                    {n}명
                  </button>
                ))}
                <input
                  type="number"
                  value={![2,3,4,5,6,8,10].includes(Number(people)) ? people : ''}
                  onChange={e => setPeople(e.target.value)}
                  placeholder="직접 입력"
                  min={2}
                  max={20}
                  className={`${inputCls} w-24`}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {/* 추가 항목 */}
        <Card className="p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">추가 항목</p>
            <button
              type="button"
              onClick={addExtra}
              className="text-xs font-semibold text-blue-600 border border-blue-200 dark:border-blue-900/50 rounded-lg px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
            >
              + 항목 추가
            </button>
          </div>
          {extras.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">추가 항목 없음 (음료, 주차비 등)</p>
          )}
          <div className="flex flex-col gap-3">
            {extras.map(ex => (
              <div key={ex.id} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>항목명</Label>
                    <input
                      type="text"
                      value={ex.name}
                      onChange={e => updateExtraText(ex.id, 'name', e.target.value)}
                      placeholder="예: 음료수"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <Label>금액 (원)</Label>
                    <CommaInput
                      value={ex.amount}
                      onChange={v => updateExtraAmount(ex.id, v)}
                      placeholder="예: 5,000"
                    />
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label>부담자</Label>
                    <select
                      value={ex.payer}
                      onChange={e => updateExtraText(ex.id, 'payer', e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="all">전원 균등 분담</option>
                      {Array.from({ length: peopleCount }, (_, i) => (
                        <option key={i} value={String(i)}>참여자 {i + 1}만 부담</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExtra(ex.id)}
                    className="py-3 px-3 text-sm text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {result && (
          <Card>
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">각자 부담 금액</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">기본 {w(total / peopleCount)}원 + 추가 항목</p>
            </div>
            <TableWrap>
              <table className="calc-table">
                <thead>
                  <tr>
                    <th>참여자</th>
                    <th>기본 금액</th>
                    <th>추가 부담</th>
                    <th>최종 금액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((r, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-slate-700 dark:text-slate-200">{r.name}</td>
                      <td>{w(r.base)}원</td>
                      <td className={r.extra > 0 ? 'text-orange-600 font-semibold' : 'text-slate-400 dark:text-slate-500'}>
                        {r.extra > 0 ? `+${w(r.extra)}원` : '-'}
                      </td>
                      <td className="font-black text-slate-900 dark:text-slate-100">{w(r.total)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 rounded-b-2xl flex justify-between items-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">총합 확인</span>
              <span className="text-sm font-black text-slate-900 dark:text-slate-100">
                {w(result.reduce((s, r) => s + r.total, 0))}원
              </span>
            </div>
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
