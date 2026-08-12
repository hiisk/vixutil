'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import {
  GRADES, RELIEF_RATES, SERVICE_RATES,
  type Relief, type ServiceKind,
  calcCopay, maxUsableFor,
} from '@/lib/ltc-copay';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;
const pct = (n: number) => `${+(n * 100).toFixed(2)}%`;

const KINDS: { v: ServiceKind; label: string }[] = [
  { v: 'home', label: '재가급여' },
  { v: 'facility', label: '시설급여' },
];

const RELIEF_LABELS: { v: Relief; label: string }[] = [
  { v: 'none', label: '감경 없음' },
  { v: 'cut40', label: '40% 감경' },
  { v: 'cut60', label: '60% 감경' },
  { v: 'exempt', label: '면제 (기초생활수급자)' },
];

export default function LtcCopayPage() {
  const [kind, setKind] = useState<ServiceKind>('home');
  const [grade, setGrade] = useState<string>(GRADES[0]);
  const [limit, setLimit] = useState('');
  const [used, setUsed] = useState('');
  const [relief, setRelief] = useState<Relief>('none');
  const [nonBenefit, setNonBenefit] = useState('0');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcCopay>;
    grade: string;
    kind: ServiceKind;
    usable: number | null;
  }>(null);

  function calculate() {
    const u = Number(used);
    if (u <= 0) return;
    /*
     * 시설급여는 월 한도액이 아니라 등급별 1일 수가 × 이용일수로 매겨진다.
     * 그래서 한도를 비워 두면 초과분 없이(한도 = 이용액) 셈한다.
     * 재가급여는 한도액이 없으면 셈 자체가 안 되므로 넣을 때까지 기다린다.
     */
    const l = limit === '' ? (kind === 'facility' ? u : 0) : Number(limit);
    if (kind === 'home' && l <= 0) return;

    const input = { kind, used: u, limit: l, relief, nonBenefit: Number(nonBenefit || 0) };
    const b = Number(budget);
    setResult({
      r: calcCopay(input),
      grade,
      kind,
      usable: b > 0 ? maxUsableFor(input, b) : null,
    });
  }

  return (
    <CalcShell
      path="/calculator/ltc-copay"
      title="장기요양 본인부담금 계산기"
      description="재가·시설 급여의 본인부담금과 한도 초과 전액부담분을 계산합니다"
      intro={
        <>
          <h2>보험료가 아니라 급여를 쓸 때 내는 돈입니다</h2>
          <p>
            매달 건강보험료에 얹혀 나가는 <strong>장기요양보험료</strong>는 등급을 받든 안 받든 내는 돈이고,
            이 계산기가 내는 것은 등급을 받아 <strong>급여를 실제로 쓸 때 내는 몫</strong>입니다. 이름이
            닮았을 뿐 서로 다른 자리입니다. 월급에서 빠져나가는 보험료 쪽은{' '}
            <Link href="/calculator/four-insurance" className="underline">4대보험 계산기</Link>에서 보세요.
          </p>
          <h2>재가급여는 15%, 시설급여는 20%입니다</h2>
          <p>
            방문요양·방문목욕·주야간보호처럼 집에서 받는 <strong>재가급여</strong>는 급여비용의{' '}
            {pct(SERVICE_RATES.home)}, 요양원에 들어가는 <strong>시설급여</strong>는{' '}
            {pct(SERVICE_RATES.facility)}를 본인이 냅니다. 같은 금액을 쓰면 시설 쪽이 더 비싸고,
            여기에 아래 적은 비급여까지 붙어 실제 차이는 훨씬 커집니다.
          </p>
          <h2>한도를 넘기면 넘는 만큼이 전액 내 돈입니다</h2>
          <p>
            가장 많이 놓치는 자리입니다. 등급별 <strong>월 한도액</strong>까지는 15%만 내지만, 한도를 넘겨
            쓴 부분은 공단이 한 푼도 대지 않아 <strong>전액 본인 부담</strong>입니다. 한도 안에서 1원을 더
            쓰면 내 몫은 15전만 늘지만, 한도를 넘긴 뒤 1원을 더 쓰면 그 1원이 그대로 내 돈입니다. 넘는
            순간 금액이 왕창 튀는 게 아니라 <strong>그 뒤로 붙는 기울기가 바뀌는</strong> 것이라, 한도를
            조금 넘긴 달과 많이 넘긴 달의 차이가 큽니다.
          </p>
          <h2>시설은 비급여가 크게 붙습니다</h2>
          <p>
            요양원에서 나오는 청구서가 예상보다 큰 이유는 대개 비급여입니다.{' '}
            <strong>식사재료비·상급침실료·이미용비</strong> 등은 급여 항목이 아니어서 부담률을 매길 대상이
            아니고, 쓴 만큼 전액을 냅니다. 감경 대상이어도 이것은 깎이지 않습니다. 계약 전에 비급여 항목과
            단가를 받아 두는 편이 낫습니다.
          </p>
          <h2>감경 대상이면 부담률이 내려갑니다</h2>
          <p>
            소득·재산이 기준 아래면 <strong>40% 또는 60% 감경</strong>을 받아 본인부담률이 그만큼 내려가고,
            기초생활수급자는 <strong>급여 몫이 면제</strong>됩니다. 60% 감경이면 재가급여
            {' '}{pct(SERVICE_RATES.home)}가 {pct(SERVICE_RATES.home * (1 - RELIEF_RATES.cut60))}가 됩니다.
            감경 구간을 가르는 소득·재산 기준액은 고시로 정해지고 여러 번 개정돼 왔으므로 이 계산기는
            기준을 판정하지 않습니다 — <strong>내가 몇 % 감경 대상인지는 공단 통지서에 적혀 있습니다.</strong>
          </p>
          <h2>등급과 한도액은 공단이 정합니다</h2>
          <p>
            등급은 신청 뒤 <strong>등급판정위원회</strong>가 정하고, 등급별 월 한도액은{' '}
            <strong>해마다 고시되며 매년 오릅니다</strong>. 값을 박아 두면 내년에 조용히 틀린 답을 답처럼
            보여 주므로 비워 두었습니다 — 통지서나 공단 안내에서 <strong>그 해 한도액</strong>을 확인해
            넣으세요. 인지지원등급은 시설급여 대상이 아닙니다.
          </p>
          <h2>이 계산이 답하지 못하는 것</h2>
          <p>
            급여 이용액(급여비용 총액)과 한도액, 비급여는 입력한 값을 그대로 씁니다. 실제 청구서는 이용한
            서비스별 수가와 일수·횟수, 가산·감산으로 정해지므로 여기서 낸 금액과 원 단위까지 같지는
            않습니다. 월 한도액은 재가급여에서 쓰는 개념이고 시설급여는 1일 수가에 이용일수를 곱해 매기므로,
            시설이면 한도를 비워 두면 초과분 없이 셈합니다. 노후 소득 쪽은{' '}
            <Link href="/calculator/basic-pension" className="underline">기초연금 수급 자격 계산기</Link>에서
            보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              {KINDS.map(o => (
                <button key={o.v} onClick={() => setKind(o.v)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border ${
                    kind === o.v
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}>
                  {o.label} {pct(SERVICE_RATES[o.v])}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>등급</Label>
                <select value={grade} onChange={e => setGrade(e.target.value)} className={selectCls}>
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <Label>월 한도액 (원)</Label>
                <input type="number" value={limit} onChange={e => setLimit(e.target.value)}
                  placeholder={kind === 'facility' ? '비우면 초과 없음' : '그 해 고시값'}
                  className={inputCls} min="0" />
              </div>
              <div>
                <Label>이번 달 급여 이용액 (원)</Label>
                <input type="number" value={used} onChange={e => setUsed(e.target.value)}
                  placeholder="급여비용 총액" className={inputCls} min="0" />
              </div>
              <div>
                <Label>비급여 합계 (원)</Label>
                <input type="number" value={nonBenefit} onChange={e => setNonBenefit(e.target.value)}
                  placeholder="식사재료비·상급침실료 등" className={inputCls} min="0" />
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {kind === 'facility'
                ? '시설급여는 1일 수가 × 이용일수로 매겨져 월 한도액이 없습니다 — 한도를 비우면 초과분 없이 셈합니다'
                : '등급별 월 한도액은 해마다 고시됩니다 — 통지서나 공단 안내의 그 해 값을 넣으세요'}
            </p>

            <div>
              <Label>감경 구분</Label>
              <select value={relief} onChange={e => setRelief(e.target.value as Relief)} className={selectCls}>
                {RELIEF_LABELS.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <Label>한 달에 낼 수 있는 돈 (원, 비우면 생략)</Label>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)}
                placeholder="예: 400000" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">한 달에 실제로 내는 총액</p>
              <p className="text-white text-3xl font-black">{fmt(result.r.total)}원</p>
              <p className="text-blue-200 text-xs mt-1">
                {result.kind === 'home' ? '재가급여' : '시설급여'} · {result.grade} ·
                {' '}본인부담률 {pct(result.r.rate)}
              </p>
            </div>

            {result.r.excess > 0 && (
              <Card className="p-5 border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  월 한도액을 <strong>{fmt(result.r.excess)}원</strong> 넘겼습니다. 넘긴 부분은 공단이
                  대지 않아 <strong>전액 본인 부담</strong>이라, 이 금액이 그대로 총액에 얹혔습니다 —
                  한도 안에서라면 {fmt(result.r.excess * result.r.rate)}원만 낼 자리였습니다.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="어떻게 나왔나" />
              <div className="divide-y divide-slate-100">
                {[
                  ['급여 대상 금액 (한도까지)', `${fmt(result.r.covered)}원`],
                  [`본인부담금 (${pct(result.r.rate)})`, `${fmt(result.r.copay)}원`],
                  ['한도 초과 전액부담분', result.r.excess > 0 ? `${fmt(result.r.excess)}원` : '없음'],
                  ['비급여 합계', result.r.nonBenefit > 0 ? `${fmt(result.r.nonBenefit)}원` : '없음'],
                  ['감경으로 덜 낸 금액', result.r.reliefSaved > 0 ? `−${fmt(result.r.reliefSaved)}원` : '해당 없음'],
                  ['한 달 총액', `${fmt(result.r.total)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {result.usable !== null && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  낼 수 있는 돈이 <strong>{man(Number(budget))}</strong>이라면 비급여를 먼저 떼고
                  급여를 <strong>{man(result.usable)}</strong>까지 쓸 수 있습니다. 한도 안에서는
                  부담률로 나눈 금액이고, 한도를 넘는 구간은 쓴 만큼 그대로 들어간 값입니다.
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 월 한도액과 비급여는 입력한 값을 그대로 씁니다 · 실제 청구액은 서비스별 수가와 이용
                일수·횟수로 정해집니다 · 등급과 감경 구분은 공단 통지서로 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
