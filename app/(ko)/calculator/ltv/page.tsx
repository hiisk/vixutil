'use client';
import { useState } from 'react';

/*
 * 첫 값은 플레이스홀더에 적혀 있던 예시다(«예: 175»). 버튼을 없애 실시간이
 * 되면서 빈 칸으로 열면 폼만 있고 결과가 없는 화면이 된다 — 무엇을 보여 주는
 * 계산기인지 열어 보고도 모른다. 값을 미리 넣어 두면 열자마자 한 벌이 돌아가고
 * 사람은 그 위에 자기 숫자를 덮어쓴다. 값은 내가 지어내지 않고 저자가 이미
 * 골라 둔 예시를 그대로 올렸다.
 */
import CalcShell, { Card, Label, inputCls, SummaryCard } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

const fmt = (n: number) => Math.round(n).toLocaleString();

type Zone = 'speculative' | 'regulated' | 'metro' | 'local';
type Owner = 'none' | 'one' | 'multi';

const LTV_LIMIT: Record<Zone, Record<Owner, number>> = {
  speculative: { none: 50, one: 50, multi: 30 },
  regulated:   { none: 70, one: 60, multi: 50 },
  metro:       { none: 80, one: 70, multi: 60 },
  local:       { none: 80, one: 80, multi: 80 },
};

const ZONE_LABEL: Record<Zone, string> = {
  speculative: '투기과열지구',
  regulated: '조정대상지역',
  metro: '수도권 (비규제)',
  local: '지방 (비규제)',
};

export default function LtvPage() {
  const [propertyValue, setPropertyValue] = useState('500000000');
  const [loanAmount, setLoanAmount] = useState('300000000');
  const [zone, setZone] = useState<Zone>('metro');
  const [owner, setOwner] = useState<Owner>('none');
  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | {
    ltv: number; limit: number; maxLoan: number; addable: number;
  } = ((): null | {
    ltv: number; limit: number; maxLoan: number; addable: number;
  } => {
    const pv = Number(propertyValue);
    const la = Number(loanAmount);
    if (pv <= 0) return null;

    const ltv = la > 0 ? (la / pv) * 100 : 0;
    const limit = LTV_LIMIT[zone][owner];
    const maxLoan = pv * limit / 100;
    const addable = Math.max(0, maxLoan - la);
    return ({ ltv, limit, maxLoan, addable });
  
    return null;
  })();



  return (
    <CalcShell
      path="/calculator/ltv"
      title="LTV 계산기"
      description="담보인정비율 — 지역·주택수 기준 LTV 한도 확인"
      intro={
        <>
          <h2>LTV가 뭔가요</h2>
          <p>
            <strong>담보인정비율(Loan To Value)</strong>은 집값 대비 얼마까지 빌려주느냐입니다.
            LTV 70%에 10억 집이면 최대 7억까지입니다. 집이라는 담보를 기준으로 하는 한도라서,
            내 소득이 얼마인지는 여기에 반영되지 않습니다.
          </p>
          <h2>LTV만 통과해서는 대출이 안 나옵니다</h2>
          <p>
            실제 한도는 <strong>LTV와 DSR 중 더 낮은 쪽</strong>으로 정해집니다. LTV로 7억이 가능해도
            소득 대비 상환 부담이 크면 DSR에서 막힙니다. 집값이 비쌀수록 LTV보다 DSR이 먼저 걸리는
            경우가 많으므로 <strong>DSR 계산기</strong>도 함께 돌려보세요.
          </p>
          <h2>규제지역 지정은 자주 바뀝니다</h2>
          <p>
            LTV 한도는 <strong>지역(투기과열지구·조정대상지역·비규제)</strong>과{' '}
            <strong>보유 주택 수</strong>로 갈립니다. 문제는 어느 지역이 어디에 해당하는지가 정부 정책에 따라
            수시로 바뀐다는 점입니다. 생애최초 구입, 신혼부부, 서민·실수요자 요건에 해당하면 우대 한도가
            따로 적용되기도 합니다. 이 계산기는 일반적인 기준을 적용한 <strong>참고용</strong>이며,
            실제 한도는 대출받을 금융사에서 확인해야 합니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/ltv" available={ALL_LOCALES10} />
        </div>
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>부동산 시세 / 감정가 (원)</Label>
              <input type="number" value={propertyValue} onChange={e => setPropertyValue(e.target.value)}
                placeholder="예: 500,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>대출 금액 (원)</Label>
              <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)}
                placeholder="예: 300,000,000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>지역 구분</Label>
              <select value={zone} onChange={e => setZone(e.target.value as Zone)} className={inputCls}>
                {(Object.keys(ZONE_LABEL) as Zone[]).map(k => (
                  <option key={k} value={k}>{ZONE_LABEL[k]}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>주택 소유 현황</Label>
              <select value={owner} onChange={e => setOwner(e.target.value as Owner)} className={inputCls}>
                <option value="none">무주택자</option>
                <option value="one">1주택자</option>
                <option value="multi">다주택자</option>
              </select>
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-2xl p-5 ${result.ltv <= result.limit ? 'bg-blue-600' : 'bg-rose-500'}`}>
              <p className="text-white/70 text-xs mb-1">현재 LTV</p>
              <p className="text-white text-3xl font-black">{result.ltv.toFixed(1)}%</p>
              <p className="text-white/70 text-sm mt-1">
                {ZONE_LABEL[zone]} 한도 {result.limit}% ·{' '}
                {result.ltv <= result.limit ? '한도 이하 ✓' : '한도 초과 ✕'}
              </p>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all ${result.ltv <= result.limit ? 'bg-blue-500' : 'bg-rose-500'}`}
                style={{ width: `${Math.min(100, result.ltv)}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="규제 LTV 한도" value={`${result.limit}%`} />
              <SummaryCard label="최대 대출 가능" value={`${fmt(result.maxLoan)}원`} />
              <SummaryCard label="추가 대출 가능" value={`${fmt(result.addable)}원`} variant={result.addable > 0 ? 'green' : 'red'} />
            </div>
          </>
        )}
      </div>
    </CalcShell>
  );
}
