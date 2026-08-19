'use client';
import { useState } from 'react';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 버튼을 없애 실시간이
 * 되면서 빈 칸으로 열면 폼만 있고 결과가 없는 화면이 된다 — 무엇을 보여 주는
 * 계산기인지 열어 보고도 모른다. 값을 미리 넣어 두면 열자마자 한 벌이 돌아가고
 * 사람은 그 위에 자기 숫자를 덮어쓴다. 값은 내가 지어내지 않고 저자가 이미
 * 골라 둔 예시를 그대로 올렸다.
 */
import CalcShell, { Card, Label, inputCls, SummaryCard, TabBar } from '@/components/CalcShell';

/*
 * 소득세 세율표는 lib/salary.ts 하나에서 온다 — 원래 이 파일에 사본이 있었다.
 * 같은 표가 다섯 곳에 적혀 있어서, 세법이 개정되면 한 곳만 고쳐질 자리였다.
 */
import { INCOME_BRACKETS as BRACKETS } from '@/lib/salary';

const fmt = (n: number) => Math.round(n).toLocaleString();

export default function LocalIncomeTaxPage() {
  const [mode, setMode] = useState<'direct' | 'calc'>('direct');
  const [incomeTaxInput, setIncomeTaxInput] = useState('5000000');
  const [taxBase, setTaxBase] = useState('50000000');

  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | { incomeTax: number; localTax: number; total: number } = ((): null | { incomeTax: number; localTax: number; total: number } => {
    if (mode === 'direct') {
      const t = Number(incomeTaxInput);
      if (t <= 0) return null;
      const localTax = t * 0.1;
      return ({ incomeTax: t, localTax, total: t + localTax });
    } else {
      const b = Number(taxBase) / 10000;
      if (b <= 0) return null;
      const br = BRACKETS.find(br => b <= br.limit)!;
      const incomeTax = Math.max(0, b * br.rate - br.deduct) * 10000;
      const localTax = incomeTax * 0.1;
      return ({ incomeTax, localTax, total: incomeTax + localTax });
    }
  
    return null;
  })();


  return (
    <CalcShell
      path="/calculator/local-income-tax"
      title="지방소득세 계산기"
      description="소득세의 10% — 지방소득세 계산"
      intro={
        <>
          <h2>소득세의 10%</h2>
          <p>
            지방소득세는 <strong>산출된 소득세의 10%</strong>입니다. 소득세가 300만원이면 30만원이
            더 붙어 총 330만원을 냅니다. 별도의 세율표가 있는 게 아니라 소득세에 연동되는 구조라,
            소득세가 줄면 지방소득세도 같이 줍니다.
          </p>
          <h2>과세표준의 10%가 아닙니다</h2>
          <p>
            흔한 오해입니다. 곱하는 대상은 <strong>과세표준이 아니라 산출세액</strong>입니다.
            과세표준 5,000만원에 소득세가 600만원 나왔다면 지방소득세는 500만원이 아니라 60만원입니다.
          </p>
          <h2>어디에 쓰이나요</h2>
          <p>
            이름 그대로 <strong>지방자치단체로 가는 세금</strong>입니다. 근로자는 급여에서 원천징수될 때
            소득세와 함께 빠져나가고, 사업자는 종합소득세를 신고할 때 함께 신고합니다.
            양도소득세·법인세에도 같은 방식으로 붙습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'direct', label: '소득세 입력' },
            { value: 'calc', label: '과세표준 입력' },
          ]}
          value={mode}
          onChange={v => { setMode(v as 'direct' | 'calc'); }}
        />
        <Card className="p-5">
          {mode === 'direct' ? (
            <div>
              <Label>이미 계산된 소득세 (원)</Label>
              <input type="number" value={incomeTaxInput} onChange={e => setIncomeTaxInput(e.target.value)}
                placeholder="예: 5,000,000" className={inputCls} min="0" />
            </div>
          ) : (
            <div>
              <Label>과세표준 (원)</Label>
              <input type="number" value={taxBase} onChange={e => setTaxBase(e.target.value)}
                placeholder="예: 50,000,000" className={inputCls} min="0" />
            </div>
          )}
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">총 납부액</p>
              <p className="stat-value">{fmt(result.total)}원</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="소득세" value={`${fmt(result.incomeTax)}원`} />
              <SummaryCard label="지방소득세 (×10%)" value={`${fmt(result.localTax)}원`} variant="red" />
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                지방소득세는 소득세의 10%로 산출됩니다.<br />
                신고 기한: 소득세 신고 다음달 말일까지 (위택스·지자체 납부)
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
