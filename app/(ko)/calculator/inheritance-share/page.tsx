'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import {
  RANK_LABEL, SPOUSE_WEIGHT, divide, shareOfKind, type Family,
} from '@/lib/inheritance-share';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;
/** 33.333…% 같은 값을 읽을 수 있게 — 뒤의 0은 떼고 소수 둘째 자리까지 */
const pct = (n: number) => `${Number((n * 100).toFixed(2))}%`;
/** 몫 단위(1.5 · 1 · 1/3)를 짧게 — 1/3은 0.333으로 보여 준다 */
const unit = (n: number) => String(Number(n.toFixed(3)));

/** 먼저 숨진 자녀는 최대 이 수까지만 받는다 — 더 늘리면 입력이 화면을 덮는다 */
const MAX_PREDECEASED = 3;

export default function InheritanceSharePage() {
  const [estate, setEstate] = useState('');
  const [spouse, setSpouse] = useState(true);
  const [children, setChildren] = useState('2');
  const [deadCount, setDeadCount] = useState('0');
  const [grandkids, setGrandkids] = useState<string[]>(Array(MAX_PREDECEASED).fill('1'));
  const [parents, setParents] = useState('0');
  const [siblings, setSiblings] = useState('0');
  const [collaterals, setCollaterals] = useState('0');
  const [result, setResult] = useState<null | {
    d: ReturnType<typeof divide>;
    family: Family;
  }>(null);

  const dead = Number(deadCount || 0);

  function calculate() {
    const family: Family = {
      spouse,
      children: Number(children || 0),
      predeceased: grandkids.slice(0, dead).map(g => Number(g || 0)),
      parents: Number(parents || 0),
      siblings: Number(siblings || 0),
      collaterals: Number(collaterals || 0),
    };
    /*
     * 이르게 되돌아가지 않는다 — 상속인이 아무도 없는 것도 답이다(국가 귀속).
     * 상속재산을 비워 둬도 비율은 그대로 나온다.
     */
    setResult({ d: divide(family, Number(estate || 0)), family });
  }

  /* 순위에 막혀 상속인이 못 된 사람 — "왜 0원인가"를 화면에서 짚어 준다 */
  const blocked: string[] = [];
  if (result) {
    const { d, family } = result;
    if (family.parents > 0 && shareOfKind(d, 'ascendant') === 0) blocked.push(`직계존속 ${family.parents}명`);
    if (family.siblings > 0 && shareOfKind(d, 'sibling') === 0) blocked.push(`형제자매 ${family.siblings}명`);
    if (family.collaterals > 0 && shareOfKind(d, 'collateral') === 0) blocked.push(`4촌 이내 방계혈족 ${family.collaterals}명`);
  }

  return (
    <CalcShell
      path="/calculator/inheritance-share"
      title="법정상속분 계산기"
      description="민법이 정한 상속 순위·배우자 가산에 따른 각자의 몫과 유류분"
      intro={
        <>
          <h2>순위가 앞을 막습니다</h2>
          <p>
            민법은 상속인을 순위로 세워 둡니다. <strong>1순위 직계비속(자녀·손자녀)</strong>,{' '}
            <strong>2순위 직계존속(부모·조부모)</strong>, <strong>3순위 형제자매</strong>,{' '}
            <strong>4순위 4촌 이내 방계혈족</strong>입니다. 여기서 가장 많이 오해하는 대목은
            순위가 <em>나누는 비율</em>이 아니라 <em>차례</em>라는 점입니다. 앞 순위가 한 사람이라도
            있으면 뒤 순위는 <strong>한 푼도 받지 못합니다.</strong> 자녀가 있으면 부모와 형제자매의
            몫은 조금 줄어드는 것이 아니라 0입니다 — 아예 상속인이 아닙니다.
          </p>
          <p>
            같은 순위 안에서도 촌수가 가까운 쪽이 먼저입니다. 자녀가 살아 있으면 손자녀는
            상속하지 않습니다.
          </p>
          <h2>배우자는 순위 밖에서 1.5배를 받습니다</h2>
          <p>
            배우자는 순위표에 들어가지 않고 <strong>1·2순위와 늘 함께 상속</strong>합니다.
            1·2순위가 아무도 없으면 <strong>단독상속</strong>하고, 이때 형제자매는 상속인이
            아닙니다 — 배우자가 있으면 3·4순위는 열리지 않습니다.
          </p>
          <p>
            같은 순위 상속인끼리는 균등하고, 배우자만 그 몫의 5할을 더 받습니다. 그래서
            배우자와 자녀 둘이면 <strong>1.5 : 1 : 1</strong>이 되어 <strong>3.5로 나눕니다.</strong>
          </p>
          <p>
            <strong>배우자 = 1.5 ÷ 3.5 = 3/7 ≒ 42.86%</strong><br />
            <strong>자녀 각 = 1 ÷ 3.5 = 2/7 ≒ 28.57%</strong>
          </p>
          <p>
            자녀가 한 명이면 배우자가 3/5, 둘이면 3/7, 셋이면 3/9, 넷이면 3/11입니다.
            자녀가 늘수록 배우자 몫은 줄지만 절반 아래로 떨어져도 <strong>언제나 자녀 한 명의
            1.5배</strong>입니다.
          </p>
          <h2>먼저 숨진 자녀의 몫은 그 자녀에게 갑니다</h2>
          <p>
            자녀가 부모보다 먼저 숨졌다면 그 자녀의 자녀(손자녀)가 <strong>그 몫을 그대로
            이어받습니다.</strong> 대습상속이라고 합니다. 이때 손자녀가 셋이라고 그 집 몫이 세 배가
            되지는 않습니다 — <strong>자녀 한 명분을 손자녀끼리 나눕니다.</strong> 그래서 형제가
            많은 집의 손자녀는 외동인 집의 손자녀보다 적게 받습니다. 손자녀를 남기지 않고 숨진
            자녀의 몫은 남은 상속인들이 나눠 갖습니다.
          </p>
          <h2>유류분 — 유언으로 다 줘 버려도 남는 몫</h2>
          <p>
            유언이 있으면 원칙적으로 유언대로 갑니다. 재산 전부를 자녀 한 명이나 남에게 주는
            유언도 가능합니다. 그런데 그렇게 되면 남은 가족의 생활이 무너지므로, 민법은 상속인이
            최소한 돌려 달라고 청구할 수 있는 몫을 정해 두었습니다. 이것이 <strong>유류분</strong>입니다.
          </p>
          <p>
            <strong>직계비속·배우자 → 법정상속분의 1/2</strong><br />
            <strong>직계존속 → 법정상속분의 1/3</strong>
          </p>
          <p>
            배우자와 자녀 둘이라면 배우자의 법정상속분 3/7의 절반인 <strong>3/14</strong>,
            자녀는 각각 2/7의 절반인 <strong>1/7</strong>이 유류분입니다. 유언으로 한 푼도
            못 받게 되었더라도 이만큼은 청구할 수 있습니다.
          </p>
          <p>
            <strong>형제자매의 유류분은 없습니다.</strong> 2024년 4월 헌법재판소가 형제자매의
            유류분을 정한 조항(민법 제1112조 제4호)을 위헌으로 결정해 효력을 잃었습니다.
            그래서 이 계산기는 형제자매가 상속인일 때 법정상속분은 내지만 유류분은 0으로 둡니다.
          </p>
          <h2>유언이 있으면 어떻게 되나</h2>
          <p>
            이 계산기가 내는 값은 <strong>유언이 없을 때의 몫</strong>입니다. 유언이 있으면 그
            내용이 먼저이고, 법정상속분은 유언이 닿지 않은 재산에만 적용됩니다. 유언 때문에
            받는 몫이 유류분보다 적어졌다면 그 차액을 <strong>유류분 반환청구</strong>로 되돌려
            받을 수 있는데, 이 청구에는 기간 제한이 있습니다(침해를 안 날부터 1년, 상속개시부터
            10년). 유언 자체가 법이 정한 방식을 지키지 않아 무효가 되는 경우도 많습니다.
          </p>
          <h2>이 계산기의 한계</h2>
          <p>
            법률 상담이 아니라 <strong>민법이 정한 비율의 계산</strong>입니다. 실제로 손에 들어오는
            금액은 여기서 다루지 않는 것들 때문에 달라집니다 — 부모를 특별히 부양했거나 재산을
            늘리는 데 기여한 몫(<strong>기여분</strong>), 생전에 미리 받아 간 증여를 상속분에서
            빼는 <strong>특별수익</strong>, <strong>상속포기와 한정승인</strong>, 상속결격,
            상속채무, 재산 평가 방법이 모두 그렇습니다. 먼저 숨진 자녀의 배우자(사위·며느리)의
            대습상속과 형제자매의 대습(조카)도 넣지 않았습니다. 다투는 일이 잦은 대목이라 금액이
            크면 변호사 상담을 받는 것이 확실합니다.
          </p>
          <p>
            세금은 여기서 계산하지 않습니다. 재산을 이 비율로 나눈 뒤 얼마를 세금으로 내는지는{' '}
            <Link href="/calculator/inheritance-tax" className="underline">상속세 계산기</Link>에서,
            살아 있는 동안 미리 물려줄 때의 세금은{' '}
            <Link href="/calculator/gift-tax" className="underline">증여세 계산기</Link>에서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>상속재산 <span className="dial-opt">원, 비우면 비율만</span></Label>
              <MoneyInput value={estate} onChange={setEstate} placeholder="예: 700000000" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>자녀 수 (살아 있는)</Label>
                <select value={children} onChange={e => setChildren(e.target.value)} className={inputCls}>
                  {[0, 1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}명</option>)}
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 py-3 cursor-pointer select-none">
                  <input type="checkbox" checked={spouse} onChange={e => setSpouse(e.target.checked)}
                    className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">배우자 있음</span>
                </label>
              </div>
            </div>

            <div>
              <Label>먼저 숨진 자녀 수 (대습상속)</Label>
              <select value={deadCount} onChange={e => setDeadCount(e.target.value)} className={inputCls}>
                {Array.from({ length: MAX_PREDECEASED + 1 }, (_, n) => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
              {dead > 0 && (
                <div className="mt-2 flex flex-col gap-2">
                  {Array.from({ length: dead }, (_, i) => (
                    <div key={i}>
                      <Label>{i + 1}번째 자녀가 남긴 자녀(손자녀) 수</Label>
                      <input type="number" value={grandkids[i]}
                        onChange={e => setGrandkids(g => g.map((v, j) => (j === i ? e.target.value : v)))}
                        className={inputCls} min="0" max="10" />
                    </div>
                  ))}
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    손자녀는 그 자녀 한 명분을 나눠 받습니다. 0명이면 그 몫은 남은 상속인이 나눕니다.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              <div>
                <Label>직계존속</Label>
                <select value={parents} onChange={e => setParents(e.target.value)} className={inputCls}>
                  {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}명</option>)}
                </select>
              </div>
              <div>
                <Label>형제자매</Label>
                <select value={siblings} onChange={e => setSiblings(e.target.value)} className={inputCls}>
                  {[0, 1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}명</option>)}
                </select>
              </div>
              <div>
                <Label>방계혈족</Label>
                <select value={collaterals} onChange={e => setCollaterals(e.target.value)} className={inputCls}>
                  {[0, 1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}명</option>)}
                </select>
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              부모·형제자매·방계혈족은 앞 순위가 없을 때만 상속인이 됩니다. 그래도 넣어 두면
              누가 순위에 막혔는지 아래에서 알려 줍니다.
            </p>

            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {result.d.escheat ? (
              <div className="stat-pri">
                <p className="stat-label">법정상속인</p>
                <p className="stat-value">없음</p>
                <p className="text-slate-300 text-xs mt-1">
                  4순위까지 상속인이 없으면 상속재산은 특별연고자 분여 절차를 거쳐 국가에 귀속됩니다
                </p>
              </div>
            ) : (
              <div className="stat-pri">
                <p className="stat-label">{result.d.heirs[0].label}의 법정상속분</p>
                <p className="stat-value">
                  {result.d.estate > 0
                    ? man(result.d.heirs[0].amount)
                    : pct(result.d.heirs[0].share)}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  {result.d.estate > 0 && `${pct(result.d.heirs[0].share)} · `}
                  {RANK_LABEL[result.d.rank]} · 상속인 {result.d.heirs.length}명
                </p>
              </div>
            )}

            {!result.d.escheat && (
              <>
                <Card>
                  <CardHeader
                    title="상속인별 법정상속분"
                    sub={result.d.estate > 0 ? `상속재산 ${man(result.d.estate)}` : '금액을 넣으면 각자의 몫까지'}
                  />
                  <div className="divide-y divide-slate-100">
                    {result.d.heirs.map(h => (
                      <div key={h.label} className="px-5 py-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">
                            {h.label}
                            {h.substituted && (
                              <span className="text-slate-400 text-xs ml-1">대습상속</span>
                            )}
                          </span>
                          <span className="font-semibold">
                            {pct(h.share)}
                            {result.d.estate > 0 && (
                              <span className="text-slate-400 font-normal"> · {fmt(h.amount)}원</span>
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                          몫 단위 {unit(h.unit)} ÷ {unit(result.d.totalUnit)}
                          {' · 유류분 '}
                          {h.reserveRatio > 0
                            ? `${pct(h.reserve)}${result.d.estate > 0 ? ` (${fmt(h.reserveAmount)}원)` : ''}`
                            : '없음'}
                        </p>
                      </div>
                    ))}
                    <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 flex justify-between font-bold text-sm">
                      <span>합계</span>
                      <span className="text-blue-600">
                        100%
                        {result.d.estate > 0 && (
                          <span className="font-normal"> · {fmt(result.d.estate)}원</span>
                        )}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <CardHeader title="식이 어떻게 풀렸나" sub={`${unit(result.d.totalUnit)}로 나눔`} />
                  <div className="divide-y divide-slate-100">
                    {[
                      ['상속이 열린 순위', RANK_LABEL[result.d.rank]],
                      ['몫 단위', result.d.heirs.map(h => unit(h.unit)).join(' : ')],
                      ['단위 합계', unit(result.d.totalUnit)],
                      ['배우자 가산', shareOfKind(result.d, 'spouse') > 0 ? `${SPOUSE_WEIGHT}배` : '해당 없음'],
                    ].map(([k, v]) => (
                      <div key={k} className="px-5 py-3 flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">{k}</span>
                        <span className="font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      같은 순위끼리는 1씩 균등하게 세고 배우자만 1.5로 셉니다. 그 단위를 모두
                      더한 값으로 나눈 것이 각자의 법정상속분입니다.
                    </p>
                  </div>
                </Card>
              </>
            )}

            {blocked.length > 0 && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong>순위에 막혀 상속인이 아닙니다 — {blocked.join(', ')}.</strong>{' '}
                  앞 순위 상속인이 있으면 뒤 순위는 조금 줄어드는 것이 아니라 몫이 0입니다.
                  {result.d.estate > 0 && ' 받을 금액도 0원입니다.'}
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                * 유언이 없을 때 민법이 정한 법정상속분 계산이며 법률 상담이 아닙니다<br />
                * 기여분·특별수익(생전 증여)·상속포기·한정승인·상속채무는 반영하지 않습니다<br />
                * 형제자매의 유류분은 2024년 헌법재판소 위헌 결정으로 없어져 0으로 둡니다<br />
                * 세금은 별도입니다 —{' '}
                <Link href="/calculator/inheritance-tax" className="underline">상속세 계산기</Link>에서 보세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
