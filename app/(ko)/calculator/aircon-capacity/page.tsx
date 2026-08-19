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
import CalcShell, { Card, CardHeader, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import {
  GRADES, USES, kwToBtu, pickGrade, pyeongLabel, requiredCapacity, runningCost,
  type Choice, type Need, type RoomUse, type RunCost,
} from '@/lib/aircon-capacity';

const fmt = (n: number) => Math.round(n).toLocaleString();
const kw1 = (n: number) => n.toFixed(1);

/** 표에 한 줄로 늘어놓는 이름·값 짝 */
type Row = [string, string];

/** 창 면적 비중(바닥면적 대비) — 눈대중으로 고를 수 있게 네 단계로 끊었다 */
const WINDOWS: { label: string; ratio: number }[] = [
  { label: '작다 — 작은 창 하나', ratio: 0.08 },
  { label: '보통', ratio: 0.15 },
  { label: '크다 — 큰 창·베란다 전면', ratio: 0.25 },
  { label: '통창', ratio: 0.4 },
];

export default function AirconCapacityPage() {
  const [area, setArea] = useState('30');
  const [unit, setUnit] = useState<'pyeong' | 'sqm'>('pyeong');
  const [use, setUse] = useState<RoomUse>('living');
  const [topFloor, setTopFloor] = useState(false);
  const [westFacing, setWestFacing] = useState(false);
  const [windowRatio, setWindowRatio] = useState('0.15');
  const [people, setPeople] = useState('2');
  const [ceiling, setCeiling] = useState('2.3');
  const [cop, setCop] = useState('4.0');
  const [hours, setHours] = useState('8');
  const [days, setDays] = useState('30');
  const [base, setBase] = useState('300');
  /*
   * 계산할 때의 입력을 결과와 함께 들고 있는다 — 결과를 띄운 뒤 용도만 바꾸면
   * 표에 적힌 계수와 숫자가 어긋나기 때문이다.
   */
  const [result, setResult] = useState<null | {
    need: Need;
    choice: Choice;
    run: RunCost | null;
    useLabel: string;
    wPerSqm: number;
    hours: number;
    days: number;
  }>(null);

  function calculate() {
    const a = Number(area);
    // 1e400 같은 값을 넣으면 Infinity가 되어 등급 계단 밖으로 나간다
    if (!(a > 0) || !Number.isFinite(a)) return;
    const h = Number(ceiling);
    const picked = USES.find(u => u.key === use)!;
    const need = requiredCapacity({
      area: a,
      unit,
      use,
      topFloor,
      westFacing,
      windowRatio: Number(windowRatio),
      people: Number(people || 0),
      ceiling: h > 0 ? h : undefined,
    });
    const choice = pickGrade(need.requiredW);
    const c = Number(cop);
    const h24 = Number(hours);
    const d = Number(days);
    setResult({
      need,
      choice,
      run: c > 0 && h24 > 0 && d > 0
        ? runningCost({ kw: choice.totalKw, cop: c, hoursPerDay: h24, days: d, baseKwh: Number(base) })
        : null,
      useLabel: picked.label,
      wPerSqm: picked.wPerSqm,
      hours: h24,
      days: d,
    });
  }

  return (
    <CalcShell
      path="/calculator/aircon-capacity"
      title="에어컨 용량 계산기"
      description="면적과 용도로 필요한 냉방능력을 내고 몇 평형을 사야 하는지 고릅니다"
      intro={
        <>
          <h2>「16평형」은 아파트 평수가 아닙니다</h2>
          <p>
            에어컨에 붙는 <strong>○평형</strong>은 그 기계가 식힐 수 있는 <strong>냉방면적</strong>입니다.
            34평 아파트라고 34평형을 달아야 하는 것이 아닙니다 — 거실에 스탠드를 놓는다면 거실과 트인
            주방까지의 면적으로 골라야 하고, 방마다 벽걸이를 단다면 그 방 면적으로 따로 골라야 합니다.
            아파트 평수는 공급면적이라 발코니·계단까지 들어 있어 실제로 식힐 방보다 훨씬 넓습니다.
          </p>
          <h2>같은 평수여도 필요한 용량이 다릅니다</h2>
          <p>
            식혀야 하는 열은 바닥 넓이에서만 오지 않습니다. <strong>최상층</strong>은 지붕이 하루치 햇빛을
            받아 천장에서 열이 내려오고, <strong>서향·남서향</strong>은 가장 더운 오후 늦게 해가 방으로
            들어옵니다. 통창은 벽과 견줄 수 없이 열이 많이 들어오고, 주방은 조리 열이 그대로 실내에 남고,
            사람이 여럿이면 한 사람에 100W가 넘는 열이 더 붙습니다. 그래서 같은 8평이라도 북향 침실과
            최상층 서향 원룸은 한 등급 이상 차이가 납니다.
          </p>
          <h2>크게 잡으면 시원한 것이 아니라 손해입니다</h2>
          <p>
            용량이 남는 에어컨은 설정 온도에 금방 닿아 <strong>짧게 돌다 멈추기를 되풀이</strong>합니다.
            공기 온도만 빨리 떨어지고 습기는 못 빼내서 &ldquo;추운데 축축한&rdquo; 상태가 됩니다.
            인버터 기종은 낮은 출력으로 길게 돌 때 가장 효율이 좋으므로, 켜고 끄기를 반복하는 쪽이
            전기도 더 먹습니다. 값도 비싸고 실외기도 커집니다. <strong>필요한 능력을 갓 덮는 등급</strong>이
            가장 좋습니다.
          </p>
          <h2>BTU 표기는 시간당 값입니다</h2>
          <p>
            해외 제품과 창문형 에어컨은 용량을 <strong>BTU</strong>로 적습니다. 이때의 BTU는 거의 언제나
            시간당(BTU/h)이고, <strong>1kW가 3,412BTU/h</strong>입니다. 흔히 보는 12,000BTU/h가 약 3.5kW로
            1냉동톤이며, 국내 표기로는 10평형 남짓입니다. 단위만 바꾸면 같은 값이니 그대로 견주면 됩니다.
          </p>
          <h2>이 계산은 어림입니다</h2>
          <p>
            제대로 된 냉방부하 계산은 벽·창의 열관류율과 방위별 일사량, 환기량까지 넣습니다. 이 계산기가
            쓰는 <strong>용도별 계수(W/㎡)와 보정계수는 흔한 값을 놓아 둔 어림</strong>이고, 국내 제조사가
            &ldquo;○평형&rdquo;이라 적을 때 쓰는 ㎡당 105W쯤을 기준으로 위아래로 옮긴 값입니다. 등급 목록도
            흔히 파는 용량이라 모든 모델을 담고 있지는 않으니, 사려는 제품 라벨의 <strong>정격 냉방능력</strong>을
            확인하세요. 전기요금은 누진제라 이미 얼마를 쓰고 있느냐에 따라 크게 달라집니다 —{' '}
            <Link href="/calculator/appliance-power" className="underline">가전 전기요금 계산기</Link>와{' '}
            <Link href="/calculator/electricity" className="underline">전기요금 계산기</Link>에서 더 자세히 볼 수 있고,
            평과 ㎡만 바꿔 보려면 <Link href="/convert/pyeong-m2" className="underline">평 ↔ 제곱미터 변환</Link>이 있습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              <div className="col-span-2">
                <Label>냉방할 면적</Label>
                <input type="number" value={area} onChange={e => setArea(e.target.value)}
                  placeholder={unit === 'pyeong' ? '예: 16' : '예: 53'} className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>단위</Label>
                <select value={unit} onChange={e => setUnit(e.target.value as 'pyeong' | 'sqm')} className={selectCls}>
                  <option value="pyeong">평</option>
                  <option value="sqm">㎡</option>
                </select>
              </div>
            </div>
            <div>
              <Label>방 용도</Label>
              <select value={use} onChange={e => setUse(e.target.value as RoomUse)} className={selectCls}>
                {USES.map(u => (
                  <option key={u.key} value={u.key}>{u.label} — {u.note} ({u.wPerSqm}W/㎡)</option>
                ))}
              </select>
            </div>
            <div>
              <Label>창 면적 비중</Label>
              <select value={windowRatio} onChange={e => setWindowRatio(e.target.value)} className={selectCls}>
                {WINDOWS.map(w => (
                  <option key={w.ratio} value={w.ratio}>{w.label}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={topFloor} onChange={e => setTopFloor(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">최상층 (지붕으로 열이 내려온다)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={westFacing} onChange={e => setWestFacing(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">서향·남서향 (오후 늦게 해가 든다)</span>
            </label>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>재실 인원</Label>
                <MoneyInput value={people} onChange={setPeople} placeholder="예: 2" />
              </div>
              <div>
                <Label>천장 높이 (m)</Label>
                <input type="number" value={ceiling} onChange={e => setCeiling(e.target.value)}
                  placeholder="예: 2.3" className={inputCls} min="0" step="0.1" />
              </div>
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        <Card>
          <CardHeader title="전기요금까지 보기" sub="효율을 비우면 생략" />
          <div className="flex flex-col gap-3 p-5">
            <div>
              <Label>냉방 효율 COP·CSPF (제품 라벨의 값)</Label>
              <input type="number" value={cop} onChange={e => setCop(e.target.value)}
                placeholder="예: 4.0" className={inputCls} min="0" step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>하루 사용 시간</Label>
                <input type="number" value={hours} onChange={e => setHours(e.target.value)}
                  placeholder="예: 8" className={inputCls} min="0" max="24" />
              </div>
              <div>
                <Label>한 달 사용 일수</Label>
                <input type="number" value={days} onChange={e => setDays(e.target.value)}
                  placeholder="예: 30" className={inputCls} min="0" max="31" />
              </div>
            </div>
            <div>
              <Label>에어컨을 빼고 원래 쓰던 사용량 (kWh)</Label>
              <MoneyInput value={base} onChange={setBase} placeholder="예: 300" />
            </div>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">
                {result.choice.grade !== null ? '이 방에 알맞은 용량' : '한 대로는 안 됩니다 — 나눠 다는 용량'}
              </p>
              <p className="stat-value">
                {kw1(result.choice.perUnit)}kW · {result.choice.label}
                {result.choice.units > 1 && ` × ${result.choice.units}대`}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                필요 냉방능력 {kw1(result.need.requiredKw)}kW ({fmt(result.need.requiredBtu)}BTU/h) ·{' '}
                {result.choice.form} · 여유 {Math.round(result.choice.margin * 100)}%
              </p>
            </div>

            <Card>
              <CardHeader title="필요 냉방능력이 어떻게 나왔나" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {([
                  ['면적', `${result.need.sqm.toFixed(1)}㎡ · ${result.need.pyeong.toFixed(1)}평`],
                  ['용도별 계수', `${result.wPerSqm}W/㎡ (${result.useLabel})`],
                  ['기본 부하', `${fmt(result.need.baseW)}W`],
                  ...result.need.factors.map(f => [f.label, `× ${f.value.toFixed(2)}`]),
                  ...(result.need.peopleW > 0 ? [['재실 인원 추가', `+ ${fmt(result.need.peopleW)}W`]] : []),
                  ['필요 냉방능력', `${fmt(result.need.requiredW)}W · ${kw1(result.need.requiredKw)}kW`],
                  ['BTU 표기', `${fmt(result.need.requiredBtu)}BTU/h`],
                ] as Row[]).map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <CardHeader title="흔히 파는 용량" sub="필요한 능력을 갓 덮는 등급을 골랐습니다" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {GRADES.map(g => {
                  const picked = g === result.choice.perUnit;
                  return (
                    <div key={g}
                      className={`px-5 py-2.5 flex justify-between text-sm ${picked ? 'bg-blue-50 dark:bg-blue-950/40' : ''}`}>
                      <span className={picked ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}>
                        {kw1(g)}kW · {pyeongLabel(g)}평형
                      </span>
                      <span className={picked ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-slate-400 dark:text-slate-500'}>
                        {fmt(kwToBtu(g))}BTU/h
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {result.choice.units > 1 && (
              <Card className="p-4">
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  흔히 파는 가장 큰 용량으로도 한 대로는 덮이지 않습니다
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {kw1(result.choice.perUnit)}kW {result.choice.units}대로 나눠 달면 합쳐서{' '}
                  {kw1(result.choice.totalKw)}kW입니다. 넓은 상가나 트인 사무실은 실제로 이렇게 나눠 답니다 —
                  한 대로 몰면 먼 자리가 안 시원해지기도 합니다. 없는 용량을 지어내지 않으려고 대수로 답합니다.
                </p>
              </Card>
            )}

            {result.run && (
              <Card>
                <CardHeader title="한 달 전기요금" sub={`${kw1(result.choice.totalKw)}kW · 하루 ${result.hours}시간 × ${result.days}일`} />
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {([
                    ['소비전력', `${fmt(result.run.inputKw * 1000)}W`],
                    ['한 달 사용량', `${fmt(result.run.kwh)}kWh`],
                    [`원래 요금 (${result.run.tierBefore}구간)`, `${fmt(result.run.beforeTotal)}원`],
                    [`에어컨을 더한 뒤 (${result.run.tierAfter}구간)`, `${fmt(result.run.afterTotal)}원`],
                    ['늘어나는 금액', `${fmt(result.run.extra)}원`],
                  ] as Row[]).map(([k, v]) => (
                    <div key={k} className="px-5 py-3 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    정격 그대로 내내 돌아간다고 본 <strong>가장 큰 값</strong>입니다. 인버터 기종은 설정 온도에
                    닿으면 출력을 낮춰 돌아가므로 실제로는 이보다 적게 나옵니다.
                  </p>
                </div>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 용도별 계수와 보정계수는 어림값입니다 · 단열·창 방향·기밀에 따라 한 등급 차이가 날 수 있습니다 ·
                등급 목록은 흔히 파는 용량이므로 제품 라벨의 정격 냉방능력을 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
