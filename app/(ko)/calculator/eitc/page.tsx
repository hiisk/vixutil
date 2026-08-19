'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, TabBar, inputCls, PrimaryBtn } from '@/components/CalcShell';
import {
  HALF_RATIO, LATE_RATIO, HOUSEHOLD_LABEL,
  type Household, type Phase,
  calcEitc, marginalRate, perChild,
} from '@/lib/eitc';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

const PHASE_LABEL: Record<Phase, string> = {
  phaseIn: '점증 구간',
  plateau: '최대 정액 구간',
  phaseOut: '점감 구간',
  over: '기준금액 초과',
};

export default function EitcPage() {
  const [household, setHousehold] = useState<Household>('singleEarner');

  // 그 해 고시값 — 근로장려금 산정식의 네 점
  const [ceiling, setCeiling] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [plateauStart, setPlateauStart] = useState('');
  const [plateauEnd, setPlateauEnd] = useState('');

  // 그 해 고시값 — 자녀장려금 산정식
  const [childCeiling, setChildCeiling] = useState('');
  const [childMax, setChildMax] = useState('');
  const [childPlateauEnd, setChildPlateauEnd] = useState('');
  const [childFloor, setChildFloor] = useState('');

  // 그 해 고시값 — 재산 기준
  const [assetLimit, setAssetLimit] = useState('');
  const [assetHalfLimit, setAssetHalfLimit] = useState('');

  // 내 형편
  const [totalIncome, setTotalIncome] = useState('');
  const [earnedIncome, setEarnedIncome] = useState('');
  const [children, setChildren] = useState('0');
  const [asset, setAsset] = useState('0');
  const [lateApply, setLateApply] = useState(false);

  const [result, setResult] = useState<null | {
    r: ReturnType<typeof calcEitc>;
    /** 지금 소득에서 100만원을 더 벌면 근로장려금이 얼마 움직이나 */
    slope: number;
    /** 자녀 수를 곱한 자녀장려금 최대액 — 결과에서 견주려고 들고 있는다 */
    childCap: number;
    workCap: number;
  }>(null);

  // 자녀장려금은 홑벌이·맞벌이에만 있다 — 단독가구에서는 입력칸부터 안 보인다
  const hasChildCredit = household !== 'single';

  function calculate() {
    const work = {
      ceiling: Number(ceiling || 0),
      max: Number(maxAmount || 0),
      plateauStart: Number(plateauStart || 0),
      plateauEnd: Number(plateauEnd || 0),
      floor: 0,
    };
    if (work.ceiling <= 0 || work.max <= 0) return;

    // 자녀장려금 고시값을 안 넣었으면 근로장려금만 낸다 — 없는 값을 지어내지 않는다
    const childGiven = Number(childCeiling) > 0 && Number(childMax) > 0;
    const child = childGiven
      ? {
        ceiling: Number(childCeiling),
        max: Number(childMax),
        plateauStart: 0, // 자녀장려금은 점증 구간이 없다 — 소득 0에서도 최대액이다
        plateauEnd: Number(childPlateauEnd || 0),
        floor: Number(childFloor || 0),
      }
      : undefined;

    const input = {
      household,
      totalIncome: Number(totalIncome || 0),
      earnedIncome: Number(earnedIncome || 0),
      work,
      child,
      children: Number(children || 0),
      asset: Number(asset || 0),
      assetLimit: Number(assetLimit || 0),
      assetHalfLimit: Number(assetHalfLimit || 0),
      lateApply,
    };

    const n = Math.max(0, Math.floor(input.children));
    setResult({
      r: calcEitc(input),
      slope: marginalRate(work, input.earnedIncome) * 1_000_000,
      childCap: child && household !== 'single' ? perChild(child, n).max : 0,
      workCap: work.max,
    });
  }

  return (
    <CalcShell
      path="/calculator/eitc"
      title="근로장려금 계산기"
      description="가구 유형과 소득으로 근로장려금·자녀장려금 지급액을 계산합니다"
      intro={
        <>
          <h2>세금을 깎아 주는 게 아니라 돈을 주는 제도입니다</h2>
          <p>
            이름에 &lsquo;장려금&rsquo;이 붙어 있고 국세청이 다루지만, 근로장려금은 <strong>세금 환급이
            아니라 지급금</strong>입니다. 낸 세금을 돌려받는 것이 아니라서 <strong>낸 세금이 0원이어도
            받습니다.</strong> 연말정산 환급금과는 아무 관계가 없고, 두 개를 따로 받습니다.
            일하는 저소득 가구의 소득을 국가가 얹어 주는 제도라고 보는 것이 맞습니다.
          </p>
          <h2>왜 소득이 낮을 때 더 주다가 다시 줄어드나요</h2>
          <p>
            산정식은 <strong>세 구간으로 꺾이는 선</strong>입니다. 소득이 아주 낮은 구간은
            <strong> 점증</strong>이라 벌면 벌수록 장려금도 늘어납니다. 가운데 구간은 <strong>최대
            정액</strong>이고, 그 위는 <strong>점감</strong>이라 소득이 늘수록 줄어들어 기준금액에서 끝납니다.
          </p>
          <p>
            점증 구간을 두는 것은 이 제도가 <strong>&lsquo;일을 해야 받는&rsquo;</strong> 제도이기 때문입니다.
            소득이 0이면 근로장려금도 0입니다. 반대로 점감 구간을 두는 것은 소득이 조금 늘었을 때
            장려금이 뚝 끊기지 않게 하려는 것입니다. 계단으로 만들면 1원 더 벌어 수십만원을 잃는
            자리가 생기니까요. 그래서 이 계산기는 두 기울기를 따로 받지 않고 네 점에서 구합니다 —
            그러면 꺾인 자리에서 두 구간이 반드시 만납니다.
          </p>
          <h2>점감 구간에서는 더 벌어도 손에 남는 게 적습니다</h2>
          <p>
            점감 구간에 있으면 100만원을 더 벌 때 장려금이 그 기울기만큼 깎입니다. 소득세와는
            별개로 붙는 <strong>숨은 세율</strong>인 셈입니다. 계산 결과에 &ldquo;100만원 더 벌면
            얼마 줄어드는지&rdquo;를 함께 내는 것이 이 때문입니다. 손해라는 뜻은 아닙니다 —
            깎이는 폭이 늘어난 소득보다 작으니 벌수록 총액은 늘어납니다.
          </p>
          <h2>가구 유형은 배우자와 부양가족이 가릅니다</h2>
          <p>
            <strong>단독가구</strong>는 배우자·부양자녀·직계존속이 모두 없는 가구,
            <strong> 홑벌이가구</strong>는 배우자나 부양가족이 있지만 배우자의 총급여액 등이 기준
            미만인 가구, <strong>맞벌이가구</strong>는 부부가 둘 다 기준 이상 버는 가구입니다.
            유형에 따라 기준금액·최대 지급액·구간 경계가 모두 다르고, 대체로
            단독 &lt; 홑벌이 &lt; 맞벌이 순으로 많습니다. <strong>자녀장려금은 홑벌이·맞벌이에만</strong> 있습니다.
          </p>
          <h2>총소득과 총급여액 등은 다른 숫자입니다</h2>
          <p>
            가장 많이 헷갈리는 곳이라 입력을 둘로 나눠 두었습니다.
          </p>
          <p>
            <strong>총소득</strong>은 <em>받을 자격이 있나</em>를 볼 때 씁니다. 근로·사업소득에
            이자·배당·연금·기타소득까지 모두 더한 값이고, 이 값이 기준금액을 넘으면 못 받습니다.<br />
            <strong>총급여액 등</strong>은 <em>얼마를 받나</em>를 낼 때 씁니다. 근로소득과
            사업소득(업종별 조정률을 곱한 값), 종교인소득만 더한 값이고, 위 꺾인 선의 x축이 이것입니다.
          </p>
          <p>
            그래서 이자·배당이 많은 사람은 총소득 때문에 탈락하고, 통과한 사람은 총급여액 등으로
            금액이 정해집니다. 사업소득자는 매출이 아니라 <strong>매출에 업종별 조정률을 곱한 값</strong>을
            넣어야 합니다 — 도소매업처럼 조정률이 낮은 업종은 매출이 커도 총급여액 등이 작습니다.
          </p>
          <h2>재산이 많으면 절반만, 더 많으면 못 받습니다</h2>
          <p>
            소득 요건을 통과해도 <strong>가구원 전체의 재산 합계</strong>가 걸립니다. 상한을 넘으면
            한 푼도 못 받고, 그 아래 일정 구간에 있으면 <strong>산정액의 {HALF_RATIO * 100}%만</strong> 받습니다.
            여기서 세는 재산은 주택·토지·건물·자동차·전세금·예금 등이고,
            <strong> 부채는 빼 주지 않습니다.</strong> 전세보증금이 그대로 재산으로 잡혀 탈락하는
            경우가 흔합니다.
          </p>
          <h2>신청해야 받습니다 — 자동으로 안 들어옵니다</h2>
          <p>
            요건을 다 채워도 <strong>신청하지 않으면 한 푼도 나오지 않습니다.</strong> 국세청이
            안내문을 보내 주기는 하지만, 안내문이 안 왔다고 대상이 아닌 것도 아니고 안내문이
            왔다고 자동 지급되는 것도 아닙니다.
          </p>
          <p>
            기한을 놓쳐도 <strong>기한 후 신청</strong>으로 받을 수 있는데, 이때는
            <strong> 산정액의 {LATE_RATIO * 100}%만</strong> 줍니다. 위 계산기의 &lsquo;기한 후 신청&rsquo;을
            켜면 그 감액을 적용해 보여 줍니다. 기한 후 신청도 기간이 정해져 있어 그마저 넘기면
            아예 못 받습니다 — 신청 기간은 그 해 국세청 안내로 확인하세요.
          </p>
          <h2>해마다 바뀌는 값은 직접 넣으세요</h2>
          <p>
            기준금액·최대 지급액·구간 경계·재산 기준은 <strong>모두 해마다 고시로 바뀌고 거의
            매년 오릅니다.</strong> 박아 두면 내년에 틀린 답을 답처럼 보여 주므로 비워 두었습니다.
            바뀌지 않는 것은 <strong>꺾인 선의 구조</strong>와 법에 적힌 두 비율(재산
            {HALF_RATIO * 100}%, 기한 후 {LATE_RATIO * 100}%)뿐이고, 그것만 코드에 두었습니다.
            그 해의 숫자는 국세청 근로장려금 안내나 홈택스 산정표에서 확인해 넣으세요.
          </p>
          <h2>이 계산이 답하지 못하는 것</h2>
          <p>
            <strong>가구 유형과 가구원 판정 자체는 내지 않습니다.</strong> 배우자·부양자녀·직계존속을
            누구까지 세는지는 나이·소득·주민등록으로 갈리고, 그 판정이 틀리면 어떤 계산도 무의미합니다.
            이 계산기는 &ldquo;가구 유형을 알고 있을 때 얼마인가&rdquo;에만 답합니다.
            대한민국 국적 요건, 전문직 사업자 제외 같은 개별 배제 사유도 반영하지 않습니다.
            실제 결정액은 국세청 심사로 정해집니다.
          </p>
          <p>
            소득 쪽 숫자는{' '}
            <Link href="/calculator/salary" className="underline">연봉 실수령액 계산기</Link>와{' '}
            <Link href="/calculator/year-end-tax" className="underline">연말정산 환급금 계산기</Link>에서
            따로 보세요. 연말정산 환급금은 이 장려금과 별개로 받습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'single' as Household, label: HOUSEHOLD_LABEL.single, sub: '배우자·부양가족 없음' },
            { value: 'singleEarner' as Household, label: HOUSEHOLD_LABEL.singleEarner, sub: '한 사람이 벌어' },
            { value: 'dualEarner' as Household, label: HOUSEHOLD_LABEL.dualEarner, sub: '부부가 둘 다' },
          ]}
          value={household}
          onChange={setHousehold}
        />

        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              근로장려금 산정식 — {HOUSEHOLD_LABEL[household]}의 그 해 고시값
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>총소득 기준금액 (원)</Label>
                <MoneyInput value={ceiling} onChange={setCeiling} placeholder="가구 유형별 고시값" />
              </div>
              <div>
                <Label>최대 지급액 (원)</Label>
                <MoneyInput value={maxAmount} onChange={setMaxAmount} placeholder="가구 유형별 고시값" />
              </div>
              <div>
                <Label>점증이 끝나는 소득 (원)</Label>
                <MoneyInput value={plateauStart} onChange={setPlateauStart} placeholder="최대액이 시작하는 곳" />
              </div>
              <div>
                <Label>점감이 시작하는 소득 (원)</Label>
                <MoneyInput value={plateauEnd} onChange={setPlateauEnd} placeholder="최대액이 끝나는 곳" />
              </div>
            </div>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">재산 기준 (고시값)</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>지급 제외 기준 (원)</Label>
                <MoneyInput value={assetLimit} onChange={setAssetLimit} placeholder="이 금액 이상이면 0원" />
              </div>
              <div>
                <Label>{HALF_RATIO * 100}% 감액 기준 (원)</Label>
                <MoneyInput value={assetHalfLimit} onChange={setAssetHalfLimit} placeholder="이 금액 이상이면 절반" />
              </div>
            </div>

            {hasChildCredit && (
              <>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  자녀장려금 산정식 (고시값, 자녀 1인당) — 비우면 근로장려금만 냅니다
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div>
                    <Label>총소득 기준금액 (원)</Label>
                    <MoneyInput value={childCeiling} onChange={setChildCeiling} placeholder="근로장려금과 다릅니다" />
                  </div>
                  <div>
                    <Label>1인당 최대 지급액 (원)</Label>
                    <MoneyInput value={childMax} onChange={setChildMax} placeholder="자녀 한 명 기준" />
                  </div>
                  <div>
                    <Label>점감이 시작하는 소득 (원)</Label>
                    <MoneyInput value={childPlateauEnd} onChange={setChildPlateauEnd} placeholder="가구 유형별 고시값" />
                  </div>
                  <div>
                    <Label>1인당 최저 지급액 (원)</Label>
                    <MoneyInput value={childFloor} onChange={setChildFloor} placeholder="점감이 닿는 바닥" />
                  </div>
                </div>
              </>
            )}

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">내 소득과 재산</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>총소득 (원, 부부 합산)</Label>
                <MoneyInput value={totalIncome} onChange={setTotalIncome} placeholder="이자·배당까지 모두" />
              </div>
              <div>
                <Label>총급여액 등 (원)</Label>
                <MoneyInput value={earnedIncome} onChange={setEarnedIncome} placeholder="근로·사업(조정률)만" />
              </div>
              <div>
                <Label>가구원 재산 합계 (원)</Label>
                <MoneyInput value={asset} onChange={setAsset} />
              </div>
              {hasChildCredit && (
                <div>
                  <Label>부양자녀 수 (명)</Label>
                  <input type="number" value={children} onChange={e => setChildren(e.target.value)}
                    className={inputCls} min="0" step="1" />
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" checked={lateApply} onChange={e => setLateApply(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              신청 기한을 놓친 기한 후 신청 ({LATE_RATIO * 100}%만 지급)
            </label>

            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className={`rounded-lg p-5 ${result.r.total > 0 ? 'bg-blue-600' : 'bg-slate-600'}`}>
              <p className="text-blue-200 text-xs mb-1">
                {result.r.total > 0 ? '받을 수 있는 금액' : '지급 대상이 아닙니다'}
              </p>
              <p className="text-white text-3xl font-black">
                {result.r.total > 0 ? `${fmt(result.r.total)}원` : '0원'}
              </p>
              <p className="text-blue-200 text-xs mt-1">
                {PHASE_LABEL[result.r.phase]}
                {result.r.assetOver && ' · 재산이 지급 제외 기준을 넘었습니다'}
                {result.r.halved && ` · 재산 때문에 ${HALF_RATIO * 100}%만`}
                {result.r.ratio > 0 && lateApply && ` · 기한 후 신청 ${LATE_RATIO * 100}%`}
              </p>
            </div>

            {result.r.phase === 'phaseOut' && result.r.total > 0 && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  지금은 <strong>점감 구간</strong>입니다. 총급여액 등이 100만원 더 늘면 근로장려금이
                  <strong> 약 {fmt(Math.abs(result.slope))}원</strong> 줄어듭니다 — 소득세와 별개로
                  붙는 숨은 세율입니다. 그래도 깎이는 폭이 늘어난 소득보다 작으니 총액은 늘어납니다.
                </p>
              </Card>
            )}
            {result.r.phase === 'phaseIn' && (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  지금은 <strong>점증 구간</strong>입니다. 총급여액 등이 100만원 더 늘면 근로장려금도
                  <strong> 약 {fmt(result.slope)}원 늘어납니다.</strong> 최대액을 받으려면
                  총급여액 등이 {man(Number(plateauStart))}까지 올라야 합니다.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="금액이 어떻게 나왔나" />
              <div className="divide-y divide-slate-100">
                {[
                  ['근로장려금 산정액', `${fmt(result.r.workBase)}원`],
                  ['근로장려금 최대액', `${fmt(result.workCap)}원`],
                  ...(result.childCap > 0
                    ? [
                      ['자녀장려금 산정액', `${fmt(result.r.childBase)}원`],
                      [`자녀장려금 최대액 (${Math.max(0, Math.floor(Number(children || 0)))}명)`, `${fmt(result.childCap)}원`],
                    ]
                    : []),
                  ['재산 감액', result.r.assetOver ? '지급 제외' : result.r.halved ? `${HALF_RATIO * 100}%만 지급` : '없음'],
                  ['기한 후 신청 감액', lateApply ? `${LATE_RATIO * 100}%만 지급` : '없음'],
                  ['적용된 지급 비율', `${Math.round(result.r.ratio * 100)}%`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="최종 지급액" />
              <div className="divide-y divide-slate-100">
                {[
                  ['근로장려금', `${fmt(result.r.work)}원`],
                  ...(result.childCap > 0 ? [['자녀장려금', `${fmt(result.r.child)}원`]] : []),
                  ['합계', `${fmt(result.r.total)}원`],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <strong>신청해야 받습니다.</strong> 이 금액은 요건을 채웠을 때의 산정액이고,
                신청하지 않으면 한 푼도 나오지 않습니다. 세금 환급이 아니라 지급금이므로
                연말정산 환급금과는 별개입니다.
              </p>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 고시값은 입력한 것을 그대로 씁니다 · 가구 유형·가구원 판정과 개별 배제 사유는
                반영하지 않았습니다 · 실제 결정액은 국세청 심사로 정해집니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
