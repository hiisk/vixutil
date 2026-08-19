'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, inputCls, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import {
  AGES, CLOSENESS, MEAL_PER_PERSON, RELATIONS, suggest,
  type AgeKey, type ClosenessKey, type RelationKey,
} from '@/lib/condolence-money';

/**
 * 만원 단위 — 8.5만원처럼 반만 남는 값이 있어 소수점을 두 자리까지 보인다.
 *
 * 한 자리로 줄이면 까닭 네 줄을 더한 값이 합계와 1,000원쯤 어긋난다(5.85를
 * 5.8로 깎으면서 잃는 만큼이다). lib이 두 자리로 맞춰 둔 값을 그대로 보인다.
 */
const man = (n: number) => `${Number(n.toFixed(2))}만원`;
/** 까닭 한 줄 — 기준액은 그대로, 증감분은 부호를 붙여 보인다 */
const signed = (n: number) => (n === 0 ? '±0' : `${n > 0 ? '+' : '−'}${man(Math.abs(n))}`);
/** 하한과 상한이 같은 조합이 있다 — 그때 "3만원~3만원"이라고 적지 않는다 */
const range = (low: number, high: number) => (low === high ? man(low) : `${man(low)}~${man(high)}`);

/** 고르는 줄 — 관계·왕래·나이대가 모양이 같아 하나로 뽑았다 */
function ChoiceRow<K extends string>({
  label, options, value, onChange,
}: {
  label: string;
  options: readonly { key: K; label: string }[];
  value: K;
  onChange: (k: K) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              value === o.key
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CondolenceMoneyPage() {
  const [relation, setRelation] = useState<RelationKey>('coworker');
  const [closeness, setCloseness] = useState<ClosenessKey>('sometimes');
  const [attend, setAttend] = useState(true);
  const [companions, setCompanions] = useState(0);
  const [age, setAge] = useState<AgeKey>('mid');
  const [received, setReceived] = useState('');

  const answers = {
    relation, closeness, attend, companions, age,
    received: Number(received) || 0,
  };
  const s = suggest(answers);
  /*
    받은 부조를 뺀 값도 한 번 더 낸다. 받은 금액이 셈으로 나온 하한보다 커서
    **하한을 끌어올린 경우**에만 그렇게 적으려는 것이다 — 그게 아닌데 "받은
    만큼 맞췄습니다"라고 쓰면 까닭이 틀린 설명이 된다.
  */
  const floorBinds = s.receivedFloor !== null && s.low > suggest({ ...answers, received: 0 }).low;

  return (
    <CalcShell
      path="/calculator/condolence-money"
      title="부의금(조의금) 계산기"
      description="관계·왕래·조문 여부로 권하는 금액대를 좁혀 봅니다 — 정해진 금액은 없습니다"
      intro={
        <>
          <h2>부의금에는 정해진 금액이 없습니다</h2>
          <p>
            세금이나 요금과 달라서 <strong>법도 고시도 표준도 없습니다.</strong>{' '}
            관습이고, 지역·집안·나이대·직장 관례마다 다릅니다. 그래서 이 계산기는
            &ldquo;정답 금액&rdquo;을 내놓지 않습니다. 널리 오가는
            단위(3·5·7·10만원)와 <strong>판단의 축</strong>을 두고, 고른 조건에 따라 범위를 좁혀 드릴 뿐입니다.
            나오는 금액은 모두 <strong>이 계산기가 정한 어림</strong>이고, 마지막은 본인 형편과 상대와의
            사이로 정하는 것이 맞습니다.
          </p>

          <h2>무엇이 금액을 가르나</h2>
          <p>
            사람들이 실제로 재는 것은 대개 이 여섯입니다. ① <strong>관계</strong>{' '}
            — 거래처인지 친척인지. ② <strong>왕래의 깊이</strong>{' '}
            — 같은 &lsquo;직장 동료&rsquo;라도 이름만 아는 사이와 매일 붙어 있는 사이가 다릅니다.
            ③ <strong>직접 조문하는지</strong>{' '}
            — 가면 식대 몫이 더 듭니다. ④ <strong>함께 가는 인원</strong>{' '}
            — 배우자·자녀와 가면 식대가 그만큼 늘어납니다. ⑤ <strong>본인 나이대</strong>{' '}
            — 사회 초년생에게 중년의 관습을 그대로 씌우지 않습니다. ⑥ <strong>전에 받은 부조</strong>{' '}
            — 받은 적이 있으면 그만큼 맞추는 것이 관습입니다.
          </p>

          <h2>3·5·7·10만원 — 홀수 단위와 4를 피하는 까닭</h2>
          <p>
            봉투에 넣는 금액은 <strong>홀수(3·5·7만원)</strong>나 <strong>10의 배수(10·20·30만원)</strong>로
            맞추는 관습이 있습니다. 음양에서 홀수를 길한 수로 본 데서 왔다고 이야기되고, 10만원을 넘어서면
            홀수보다 10만원 단위로 맞추는 쪽이 자연스러워집니다. <strong>4가 들어간 금액</strong>은
            죽을 사(死)를 떠올리게 해 피합니다 — 40만원은 10의 배수여도 쓰지 않습니다. 그래서 이 계산기는
            셈해서 나온 값을 그대로 내지 않고, 반드시 그 단위로 맞춰서 보여 줍니다.
          </p>
          <p>
            결혼식과 반대로 <strong>새 지폐는 피하는 것이 예의</strong>라는 인식이 있습니다. 부고를 미리
            준비하고 있었다는 뜻이 되기 때문입니다. 있는 지폐로 단정하게 넣으면 됩니다.
          </p>

          <h2>직접 조문하면 왜 더 드나</h2>
          <p>
            빈소에서 내는 식사는 상가가 부담합니다. 그래서 <strong>문상을 가서 식사까지 하면</strong>{' '}
            부의금에 그 몫이 얹히는 것이 자연스럽습니다. 이 계산기는 장례식장 식사 한 사람 몫을{' '}
            <strong>약 {man(MEAL_PER_PERSON)}</strong>으로 어림해 사람 수만큼 더합니다. 배우자와 둘이 가면{' '}
            {man(MEAL_PER_PERSON * 2)}, 아이까지 넷이면 {man(MEAL_PER_PERSON * 4)}입니다. 반대로
            부의금만 계좌로 보낼 때는 이 몫이 빠지므로 조금 적게 잡습니다 — 결례가 아닙니다.
          </p>

          <h2>봉투에는 뭐라고 쓰나 — 부의·근조·조의</h2>
          <p>
            흰 봉투에 세로로 씁니다. 앞면 가운데에 <strong>부의(賻儀)</strong>가 가장 무난하고,{' '}
            <strong>근조(謹弔)</strong>·<strong>조의(弔意)</strong>·<strong>추모(追慕)</strong>·
            <strong>애도(哀悼)</strong>도 씁니다. 요즘은 봉투에 이미 인쇄돼 있는 것을 장례식장에서 주는 일이
            많아, 그때는 <strong>뒷면 왼쪽 아래에 이름</strong>을, 그 옆이나 아래에 <strong>소속</strong>을
            적으면 됩니다. 이름을 빼면 누가 낸 것인지 남지 않아 상주가 나중에 답례를 못 합니다 —
            의외로 자주 빠뜨리는 부분입니다. 조의 인사는 &ldquo;삼가 고인의 명복을 빕니다&rdquo; 정도로
            충분합니다.
          </p>
          <p>
            장례 뒤 사흘째 지내는 <strong>삼우제(三虞祭)</strong>나 사십구일에 다시 찾아뵐 때는 부의금을
            새로 내지 않는 것이 보통입니다. 이미 부의를 했다면 마음만 전하면 됩니다.
          </p>

          <h2>회사 경조사비 규정이 있으면 그것이 먼저입니다</h2>
          <p>
            많은 회사가 <strong>취업규칙이나 단체협약에 경조사비 규정</strong>을 두고 있습니다.
            직원 본인·배우자·직계가족의 상에 회사가 얼마를 내고, 부서 이름으로 얼마를 모으고,
            화환을 보내는지까지 정해 둔 곳이 많습니다. 그런 규정이 있으면 개인이 따로 셈할 일이
            줄어듭니다. 부서에서 함께 모아 내기로 했다면{' '}
            <strong>이 계산기의 금액을 개인이 또 내는 것이 아닙니다</strong>{' '}
            — 총무나 선배에게 관례를 먼저 물어보는 것이 가장 빠릅니다.
          </p>

          <h2>이 계산의 한계</h2>
          <p>
            여기 쓰인 기준액과 배율은 <strong>널리 이야기되는 금액대를 우리가 어림한 값</strong>이지 조사
            결과나 고시가 아닙니다. 특히 <strong>부모·형제자매 등 직계 가족</strong>은 관습이 아예 달라
            (상주 쪽으로 들어가는 경우가 많습니다) 이 계산에 넣지 않았습니다. 결혼식 쪽 금액은{' '}
            <Link href="/calculator/wedding-gift" className="underline">축의금 계산기</Link>에서 보시고,
            복장·절하는 순서·빈소에서의 예절은{' '}
            <Link href="/checklist/condolence" className="underline">조문 예절 체크리스트</Link>에
            정리해 두었습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="label-caps mb-3">상황</p>
          <div className="flex flex-col gap-4">
            <ChoiceRow label="고인·상주와의 관계" options={RELATIONS} value={relation} onChange={setRelation} />
            <ChoiceRow label="왕래의 깊이" options={CLOSENESS} value={closeness} onChange={setCloseness} />

            <div>
              <Label>직접 조문하나요</Label>
              <div className="flex gap-2">
                {[{ v: true, label: '문상 간다' }, { v: false, label: '부의금만 보낸다' }].map(o => (
                  <button
                    key={String(o.v)}
                    type="button"
                    onClick={() => setAttend(o.v)}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                      attend === o.v
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 함께 가는 사람은 식대가 늘어나는 만큼만 셈에 들어간다 — 안 가면 물어볼 것도 없다 */}
            {attend && (
              <div>
                <Label>함께 가는 사람 (본인 제외)</Label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCompanions(n)}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-colors ${
                        companions === n
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {n === 0 ? '혼자' : `+${n}명`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ChoiceRow label="본인 나이대·형편" options={AGES} value={age} onChange={setAge} />

            <div>
              <Label>전에 받은 부조 (만원, 없으면 비움)</Label>
              <MoneyInput value={received} onChange={setReceived} placeholder="예: 10" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                내 집안 일에 이 분이 부조를 해 주셨다면, 그만큼은 맞추는 것이 관습입니다
              </p>
            </div>
          </div>
        </Card>

        <SummaryGrid>
          <SummaryCard
            label="권하는 범위"
            value={range(s.low, s.high)}
            sub={attend ? '문상 가는 경우' : '부의금만 보내는 경우'}
            variant="primary"
          />
          <SummaryCard
            label="가장 무난한 값"
            value={man(s.common)}
            sub="이 범위에서 흔히 내는 금액"
          />
        </SummaryGrid>

        <Card>
          <CardHeader title="이 중에서 고르면 됩니다" sub="관습 단위로 맞춘 값" />
          <div className="px-5 py-4 flex flex-wrap gap-2">
            {s.picks.map(p => (
              <span
                key={p}
                className={`px-3 py-2 text-sm font-bold rounded-xl border ${
                  p === s.common
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {man(p)}
              </span>
            ))}
          </div>
          <p className="px-5 pb-4 text-xs text-slate-400 dark:text-slate-500">
            홀수(3·5·7만원)나 10의 배수로 맞추고, 4가 들어간 금액(40만원 등)은 뺐습니다
          </p>
        </Card>

        <Card>
          <CardHeader title="왜 이 금액인가" sub={`합계 ${man(s.center)}`} />
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {s.reasons.map((r, i) => (
              <div key={r.label} className="px-5 py-3 flex justify-between text-sm gap-3">
                <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                <span className="font-semibold whitespace-nowrap">
                  {i === 0 ? `기준 ${man(r.amount)}` : signed(r.amount)}
                </span>
              </div>
            ))}
            {floorBinds && s.receivedFloor !== null && (
              <div className="px-5 py-3 flex justify-between text-sm gap-3">
                <span className="text-slate-600 dark:text-slate-300">받은 부조만큼 하한을 올림</span>
                <span className="font-semibold whitespace-nowrap">{man(s.receivedFloor)} 이상</span>
              </div>
            )}
          </div>
          <p className="px-5 py-3 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800">
            {floorBinds
              ? `합계 ${man(s.center)}보다 전에 받은 부조가 커서, 그것을 하한으로 잡아 ${range(s.low, s.high)}이 됐습니다`
              : `합계 ${man(s.center)}을 관습 단위로 맞춰 ${range(s.low, s.high)} 범위를 냈습니다`}
          </p>
        </Card>

        <Card>
          <CardHeader title="봉투 쓰는 법" />
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {[
              ['앞면 가운데', '부의(賻儀) · 근조(謹弔) · 조의(弔意) · 추모(追慕) · 애도(哀悼)'],
              ['뒷면 왼쪽 아래', '이름 — 빼면 누가 냈는지 남지 않습니다'],
              ['이름 옆·아래', '소속 (회사·학교·모임 이름)'],
              ['지폐', '새 지폐는 피하는 것이 예의라는 인식이 있습니다'],
              ['전할 곳', '방명록을 쓰고 호상소 또는 부의함에'],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-3">
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-0.5">{k}</p>
                <p className="text-slate-700 dark:text-slate-200">{v}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-slate-50 dark:bg-slate-950">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            💡 부의금에는 <strong>법도 고시도 표준도 없습니다.</strong>{' '}
            위 금액은 널리 오간다고 이야기되는
            금액대를 <strong>이 계산기가 어림한 참고값</strong>이며, 지역·집안·직장 관례에 따라 크게
            달라집니다. 회사 경조사비 규정이 있으면 그것이 먼저이고, 부모·형제자매 등 직계 가족은 관습이
            아예 달라 이 계산에 넣지 않았습니다.
          </p>
        </Card>
      </div>
    </CalcShell>
  );
}
