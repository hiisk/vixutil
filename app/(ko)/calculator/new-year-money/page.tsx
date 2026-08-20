'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, selectCls, inputCls } from '@/components/CalcShell';
import {
  RELATIONS, SIBLING_POLICIES, STAGES, UNITS, calcNewYearMoney, unitAt,
  type RelationId, type SiblingPolicy, type StageId,
} from '@/lib/new-year-money';

const fmt = (n: number) => n.toLocaleString();
/** 세뱃돈은 만·천 단위로 말한다 — 15만원, 5천원 */
const unit = (n: number) => (n >= 10_000 ? `${n / 10_000}만원` : `${n / 1_000}천원`);

/** 같은 번호를 고른 아이들을 한 집 형제로 본다 */
const HOUSES = ['1', '2', '3', '4'];

interface Row {
  key: number;
  stage: StageId;
  relation: RelationId;
  house: string;
}

export default function NewYearMoneyPage() {
  const [rows, setRows] = useState<Row[]>([
    { key: 1, stage: 'lower', relation: 'nephew', house: '1' },
    { key: 2, stage: 'middle', relation: 'nephew', house: '1' },
  ]);
  const [policy, setPolicy] = useState<SiblingPolicy>('byAge');
  const [received, setReceived] = useState('');

  const result = calcNewYearMoney({
    children: rows.map(r => ({ stage: r.stage, relation: r.relation, house: r.house })),
    policy,
    receivedPerChild: Number(received) || 0,
  });

  const patch = (key: number, part: Partial<Row>) =>
    setRows(rs => rs.map(r => (r.key === key ? { ...r, ...part } : r)));

  return (
    <CalcShell
      path="/calculator/new-year-money"
      title="세뱃돈 계산기"
      description="나이·관계로 금액대를 좁히고 여러 아이에게 줄 합계를 냅니다"
      intro={
        <>
          <h2>세뱃돈에는 정답 금액이 없습니다</h2>
          <p>
            세뱃돈은 법으로 정한 것도, 어디서 고시하는 것도 아닙니다. 집안·지역·형편에 따라 다르고
            해마다 조금씩 오릅니다. 그래서 이 계산기는 &ldquo;얼마가 맞다&rdquo;고 말하지 않습니다.
            대신 사람들이 실제로 쓰는 <strong>지폐 단위</strong>와, 금액을 가르는 <strong>판단의 축</strong>을
            보여 주고 조건에 따라 범위를 좁혀 줍니다. 여기 나오는 범위는 확인된 기준이 아니라
            <strong> 이 계산기가 정한 어림</strong>입니다.
          </p>

          <h2>나이가 금액을 가르는 까닭</h2>
          <p>
            아이가 그 돈으로 무엇을 할 수 있는지가 나이에 따라 달라집니다. 미취학 아이에게는 봉투를
            받는 일 자체가 행사고 돈은 대개 부모가 보관합니다. 초등학생이 되면 스스로 쓰기 시작하고,
            중·고등학생은 쓸 데가 늘어납니다. 그래서 <strong>학년이 올라가면 금액이 내려가지 않도록</strong>
            {' '}계산을 잡아 두었습니다. 다만 고등학생 위로는 더 올리지 않았습니다 — 대학생·성인이라고
            계속 오르는 관습이 아니고, 취업하면 아예 주지 않는 집도 많습니다.
          </p>

          <h2>형제간 균형을 어떻게 맞추나</h2>
          <p>
            같은 집 아이들 사이가 제일 어렵습니다. 나이대로 주면 어린 쪽이 서운해하고, 똑같이 주면
            큰 쪽이 서운해합니다. 어느 쪽도 정답이 아니라 <strong>고르는 문제</strong>라서
            세 가지를 골라 쓰게 했습니다 — 나이대로, 한 단위 차이까지만, 모두 같은 금액.
            어느 쪽을 골라도 <strong>큰 아이 금액을 깎지 않고 아래 아이를 올려</strong> 맞춥니다.
            맞추려고 맏이 금액을 내리면 그것이 다시 서운한 일이 됩니다.
          </p>

          <h2>받은 것과 맞추는 문제</h2>
          <p>
            상대 집 아이가 셋인데 우리 집은 하나인 경우가 흔합니다. 이때 <strong>총액을 맞추면 아이별
            금액이 세 배</strong>가 되고, 아이별 금액을 맞추면 총액이 어긋납니다. 이 계산기는
            <strong> 아이 한 명당</strong>으로 견줍니다 — 그 집에서 우리 아이 한 명이 받은 금액을 넣으면,
            우리 기준과 두 단위 이상 벌어졌을 때만 한 단위를 올리거나 내립니다. 한 단위 차이는 그냥
            둡니다. 그 정도는 집집마다 늘 있는 차이고, 받은 금액을 조금 바꿀 때마다 권하는 금액이
            출렁이면 쓸 수가 없습니다.
          </p>

          <h2>새 돈과 봉투</h2>
          <p>
            세뱃돈은 <strong>새 돈(신권)</strong>으로 주는 관습이 있습니다. 새해에 새 돈으로 시작하라는
            뜻이고, 아이들도 빳빳한 돈을 좋아합니다. 은행 창구에서 미리 바꿔 두어야 하는데
            <strong> 설 직전에는 신권이 금방 떨어집니다</strong> — 며칠 앞서 가거나 미리 요청해 두세요.
            봉투에는 아이 이름과 새해 인사를 적어 주면 같은 금액이어도 남는 것이 달라집니다.
            금액은 5천·1만·2만·3만·5만·10만처럼 <strong>지폐로 세어 떨어지는 단위</strong>로 맞추고,
            4가 들어가는 금액(4만원)은 관례로 피합니다.
          </p>

          <h2>세뱃돈에도 세금이 붙나요</h2>
          <p>
            흔히 궁금해하는 것인데, 세뱃돈도 원칙적으로는 <strong>증여</strong>입니다. 통상적인 용돈
            수준이면 문제가 되지 않지만, <strong>일정 금액을 넘으면 증여로 보아 신고 대상이 될 수
            있습니다.</strong> 특히 해마다 받은 세뱃돈을 아이 통장에 모아 두었다가 나중에 목돈으로
            쓰는 경우, 자금 출처를 따질 때 이야기가 됩니다. 관계별 공제 한도와 세액은 여기서 단정하지
            않겠습니다 — 기준이 바뀌기도 하고 사람마다 사정이 다릅니다.{' '}
            <Link href="/calculator/gift-tax" className="underline">증여세 계산기</Link>에서 관계별 공제를
            적용해 보고, 금액이 크면 세무서나 세무대리인에게 확인하세요.
          </p>

          <h2>이 계산의 한계</h2>
          <p>
            여기 나오는 범위는 <strong>널리 쓰이는 단위와 이 계산기가 정한 축</strong>으로 좁힌 어림입니다.
            실제 금액은 집안 관례가 이깁니다 — 형제끼리 미리 액수를 맞추기로 한 집, 아예 주지 않기로
            한 집, 통장으로 넣는 집이 다 있습니다. 하나의 숫자를 내지 않고 범위로 보여 주는 것도
            그래서입니다. 사람 사이의 관습이라 <strong>계산으로 정해질 문제가 아닙니다.</strong> 관계에 따라
            오가는 다른 돈은{' '}
            <Link href="/calculator/wedding-gift" className="underline">축의금 계산기</Link>에서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader title="세뱃돈 줄 아이" sub={`${rows.length}명`} />
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((r, i) => (
              <div key={r.key} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{i + 1}번째 아이</p>
                  <button
                    type="button"
                    onClick={() => setRows(rs => rs.filter(x => x.key !== r.key))}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
                  >
                    삭제
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <Label>나이·학년</Label>
                    <select value={r.stage} onChange={e => patch(r.key, { stage: e.target.value as StageId })} className={selectCls}>
                      {STAGES.map(s => (
                        <option key={s.id} value={s.id}>{s.label} — {s.hint}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>관계</Label>
                    <select value={r.relation} onChange={e => patch(r.key, { relation: e.target.value as RelationId })} className={selectCls}>
                      {RELATIONS.map(rel => (
                        <option key={rel.id} value={rel.id}>{rel.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>같은 집</Label>
                    <select value={r.house} onChange={e => patch(r.key, { house: e.target.value })} className={selectCls}>
                      {HOUSES.map(h => (
                        <option key={h} value={h}>{h}번 집</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            {rows.length === 0 && (
              <p className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400">아이를 추가하면 합계가 나옵니다.</p>
            )}
          </div>
          <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setRows(rs => [...rs, { key: Math.max(0, ...rs.map(r => r.key)) + 1, stage: 'upper', relation: 'nephew', house: '1' }])}
              className="w-full py-2.5 text-sm text-blue-600 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-900/50 rounded-xl bg-blue-50 dark:bg-blue-950/30 hover:bg-sec-soft transition-colors"
            >
              + 아이 추가
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              같은 번호를 고른 아이들을 한 집 형제로 봅니다
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex flex-col gap-4">
            <div>
              <Label>형제간 균형</Label>
              <div className="flex flex-wrap gap-2">
                {SIBLING_POLICIES.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPolicy(p.id)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                      policy === p.id
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {SIBLING_POLICIES.find(p => p.id === policy)!.desc} · 아래 아이를 올려서 맞춥니다
              </p>
            </div>
            <div>
              <Label>그 집에서 우리 아이가 받은 금액 (원, 한 명당)</Label>
              <MoneyInput value={received} onChange={setReceived} placeholder="예: 50000 (비우면 안 씁니다)" />
            </div>
          </div>
        </Card>

        <div className="stat-pri">
          <p className="stat-label">합계 (아이 {result.children.length}명)</p>
          <p className="stat-value">
            {fmt(result.totalMin)}
            {result.totalMax !== result.totalMin && <>~{fmt(result.totalMax)}</>}원
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            하나의 금액이 아니라 범위입니다 · 이 계산기가 정한 어림
          </p>
        </div>

        {result.children.length > 0 && (
          <Card>
            <CardHeader title="아이별 권하는 범위" sub="그 금액이 나온 까닭" />
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {result.children.map((c, i) => (
                <div key={rows[i].key} className="px-5 py-3">
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {c.stage.label} · {c.relation.label}
                      {c.house && <span className="text-slate-500 dark:text-slate-400"> · {c.house}번 집</span>}
                    </span>
                    <span className="font-semibold text-sm whitespace-nowrap">
                      {c.min === c.max ? unit(c.min) : `${unit(c.min)}~${unit(c.max)}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    나이 기준 {unit(unitAt(c.stage.rung))}~{unit(unitAt(c.stage.rung + 1))}
                    {c.reasons
                      .filter(r => r.steps !== 0)
                      .map(r => ` · ${r.axis} ${r.steps > 0 ? '+' : ''}${r.steps}단위`)
                      .join('')}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {result.received && (
          <Card className="p-5">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              받은 금액 <strong>{unit(result.received.perChild)}</strong>은 우리 기준보다{' '}
              {result.received.gap === 0
                ? '같은 자리입니다'
                : `${Math.abs(result.received.gap)}단위 ${result.received.gap > 0 ? '위' : '아래'}입니다`}
              .{' '}
              {result.received.steps === 0
                ? '두 단위 안쪽이라 금액은 그대로 두었습니다.'
                : `그래서 모든 아이를 한 단위 ${result.received.steps > 0 ? '올렸습니다' : '내렸습니다'}.`}
            </p>
          </Card>
        )}

        <Card>
          <CardHeader title="쓰는 단위" sub="지폐로 세어 떨어지는 금액" />
          <div className="px-5 py-4">
            <div className="flex flex-wrap gap-1.5">
              {UNITS.map(u => (
                <span key={u} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {unit(u)}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              이 단위 말고는 내놓지 않습니다 — 7,000원 같은 금액은 봉투에 넣지 않기 때문입니다.
              4가 들어가는 금액(4만원)은 관례로 빼 두었고, 새 돈으로 주려면 미리 은행에서 바꿔 두세요.
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            * 세뱃돈에는 법도 고시도 없습니다. 이 범위는 널리 쓰이는 단위와 이 계산기가 정한 축(나이·관계·
            형제·받은 것)으로 좁힌 <strong>어림</strong>이며, 집안·지역·형편에 따라 크게 달라집니다.
            금액이 크면 증여 문제가 걸릴 수 있으니{' '}
            <Link href="/calculator/gift-tax" className="underline">증여세 계산기</Link>도 함께 보세요.
          </p>
        </Card>
      </div>
    </CalcShell>
  );
}
