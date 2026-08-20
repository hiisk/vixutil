'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 빈 칸으로 열면 무엇을
 * 보여 주는 계산기인지 눌러 보기 전에는 모른다 — 값을 미리 넣어 두면 「계산하기」
 * 한 번에 한 벌이 통째로 보이고, 사람은 그 위에 자기 숫자를 덮어쓴다.
 * 값은 내가 지어내지 않고 저자가 이미 골라 둔 예시를 그대로 올렸다.
 */
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { afterSaving, calcHeating, type HeatingBill } from '@/lib/heating';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function HeatingBillPage() {
  const [area, setArea] = useState('84');
  const [basicRate, setBasicRate] = useState('');
  const [mcal, setMcal] = useState('700');
  const [usageRate, setUsageRate] = useState('');
  const [days, setDays] = useState('31');
  const [result, setResult] = useState<null | { bill: HeatingBill; cut10: HeatingBill; cut20: HeatingBill }>(null);

  function calculate() {
    const input = {
      area: Number(area),
      basicRate: Number(basicRate),
      mcal: Number(mcal),
      usageRate: Number(usageRate),
      days: Number(days),
    };
    if (input.area <= 0 || input.usageRate <= 0 || input.mcal < 0) return;
    setResult({
      bill: calcHeating(input),
      cut10: afterSaving(input, 0.1),
      cut20: afterSaving(input, 0.2),
    });
  }

  return (
    <CalcShell
      path="/calculator/heating-bill"
      title="난방비 계산기"
      description="지역난방 열량(Mcal) 기준 난방요금과 ㎡당 비교"
      intro={
        <>
          <h2>난방비는 기본요금과 사용요금이 더해진 값입니다</h2>
          <p>
            <strong>기본요금은 계약면적에 붙습니다.</strong> 그래서 난방을 아예 끄고 살아도 매달 나옵니다.
            <strong> 사용요금은 쓴 열량(Mcal)에 붙습니다.</strong> 여기에 부가세 10%가 얹혀 고지서 금액이
            됩니다. 난방비가 많이 나왔다고 느낄 때 어느 쪽이 큰지부터 보면 손댈 자리가 보입니다.
          </p>
          <h2>전기와 달리 누진이 없습니다</h2>
          <p>
            전기요금은 구간을 넘기면 단가가 뛰지만, 열요금은 <strong>쓴 만큼 곱하기</strong>입니다.
            그래서 열량을 절반으로 줄이면 사용요금도 정확히 절반이 됩니다. 다만 기본요금은 그대로 남으므로
            <strong> 전체 금액이 절반이 되지는 않습니다</strong>.
          </p>
          <h2>단가는 고지서에서 옮겨 적으세요</h2>
          <p>
            열요금 단가는 <strong>사업자마다 다르고 해마다 바뀝니다</strong>. 한국지역난방공사와 지역
            도시가스사, 아파트 자체 열병합이 각각 다른 단가를 씁니다. 그래서 이 계산기는 단가를 넣어
            두지 않았습니다. 고지서나 관리비 명세서의 <strong>&lsquo;기본요금 단가(원/㎡)&rsquo;</strong>와
            <strong> &lsquo;사용요금 단가(원/Mcal)&rsquo;</strong>를 그대로 옮겨 적으면 됩니다.
          </p>
          <h2>개별난방이면 도시가스 요금입니다</h2>
          <p>
            보일러가 세대마다 있는 개별난방은 열량이 아니라 도시가스 사용량(㎥)으로 매겨집니다.
            그쪽은 <Link href="/calculator/gas-bill" className="underline">가스요금 계산기</Link>에서
            계산하세요. 이 계산기는 아파트 지역난방(중앙난방 포함)용입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>계약면적 (㎡)</Label>
                <input type="number" value={area} onChange={e => setArea(e.target.value)}
                  placeholder="예: 84" className={inputCls} min="0" />
              </div>
              <div>
                <Label>기본단가 (원/㎡)</Label>
                <MoneyInput value={basicRate} onChange={setBasicRate} placeholder="고지서에서" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>사용열량 (Mcal)</Label>
                <input type="number" value={mcal} onChange={e => setMcal(e.target.value)}
                  placeholder="예: 700" className={inputCls} min="0" />
              </div>
              <div>
                <Label>사용단가 (원/Mcal)</Label>
                <MoneyInput value={usageRate} onChange={setUsageRate} placeholder="고지서에서" />
              </div>
            </div>
            <div>
              <Label>청구 일수</Label>
              <input type="number" value={days} onChange={e => setDays(e.target.value)}
                placeholder="예: 31" className={inputCls} min="0" max="62" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">이번 달 난방비</p>
              <p className="stat-value">{fmt(result.bill.total)}원</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                하루 {fmt(result.bill.perDay)}원 · ㎡당 {fmt(result.bill.perSquareMetre)}원 · 평당 {fmt(result.bill.perPyeong)}원
              </p>
            </div>
            <Card>
              <CardHeader title="요금 내역" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { label: '기본요금 (계약면적에 붙음)', value: result.bill.basicFee },
                  { label: '사용요금 (쓴 열량에 붙음)', value: result.bill.usageFee },
                  { label: '부가세 10%', value: result.bill.vat },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <CardHeader title="열량을 줄이면" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { label: '10% 덜 쓰면', bill: result.cut10 },
                  { label: '20% 덜 쓰면', bill: result.cut20 },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">
                      {fmt(r.bill.total)}원
                      <span className="ml-2 text-xs font-normal text-emerald-600 dark:text-emerald-400">
                        −{fmt(result.bill.total - r.bill.total)}원
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                * 기본요금은 열량을 줄여도 남습니다 · 단가는 사업자마다 다르므로 고지서 값을 넣으세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
