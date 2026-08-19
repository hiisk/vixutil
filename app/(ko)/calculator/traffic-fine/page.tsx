'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import {
  CLEAR_MONTHS, CRIMINAL_OVER_SPEED, REVOKE_THRESHOLDS, SPEED_TIERS, SUSPEND_POINTS, VIOLATIONS,
  calcFine, type FineResult, type ViolationId,
} from '@/lib/traffic-fine';

const w = (n: number) => Math.round(n).toLocaleString();
/** 확신 못 해 비워 둔 칸은 숫자를 지어내지 않고 줄표로 둔다 */
const money = (n: number | null) => (n === null ? '—' : `${w(n)}원`);

export default function TrafficFinePage() {
  const [violation, setViolation] = useState<ViolationId>('speeding');
  const [overSpeed, setOverSpeed] = useState('25');
  const [schoolZone, setSchoolZone] = useState(false);
  const [zoneMoney, setZoneMoney] = useState('2');
  const [zonePoint, setZonePoint] = useState('2');

  const [fineOverride, setFineOverride] = useState(0);
  const [levyOverride, setLevyOverride] = useState(0);
  const [demeritOverride, setDemeritOverride] = useState('');

  const [daysSinceNotice, setDaysSinceNotice] = useState('0');
  const [earlyPayDays, setEarlyPayDays] = useState('20');
  const [dueDays, setDueDays] = useState('40');
  const [discountRate, setDiscountRate] = useState('20');
  const [surchargeRate, setSurchargeRate] = useState('3');
  const [monthlyRate, setMonthlyRate] = useState('1.2');
  const [maxMonths, setMaxMonths] = useState('60');

  const [accumulated, setAccumulated] = useState('0');
  const [credits, setCredits] = useState('0');

  const [result, setResult] = useState<FineResult | null>(null);

  const info = VIOLATIONS.find(v => v.id === violation)!;

  function calculate() {
    setResult(calcFine({
      violation,
      overSpeed: Number(overSpeed) || 0,
      schoolZone,
      zoneMoneyMultiplier: Number(zoneMoney) || 1,
      zoneDemeritMultiplier: Number(zonePoint) || 1,
      fineOverride: fineOverride > 0 ? fineOverride : undefined,
      levyOverride: levyOverride > 0 ? levyOverride : undefined,
      demeritOverride: demeritOverride === '' ? undefined : Number(demeritOverride),
      daysSinceNotice: Number(daysSinceNotice) || 0,
      earlyPayDays: Number(earlyPayDays) || 0,
      dueDays: Number(dueDays) || 0,
      earlyPayDiscountRate: Number(discountRate) || 0,
      surchargeRate: Number(surchargeRate) || 0,
      monthlySurchargeRate: Number(monthlyRate) || 0,
      maxSurchargeMonths: Number(maxMonths) || 0,
      accumulated: Number(accumulated) || 0,
      credits: Number(credits) || 0,
    }));
  }

  return (
    <CalcShell
      path="/calculator/traffic-fine"
      title="교통 범칙금·과태료 계산기"
      description="범칙금과 과태료 중 어느 쪽이 유리한지 벌점까지 넣어 비교합니다"
      intro={
        <>
          <h2>범칙금과 과태료는 다른 것입니다</h2>
          <p>
            같은 위반인데 이름이 둘인 이유는 <strong>누가 냈는지가 확인됐는지</strong>에 있습니다.
            경찰이 현장에서 <strong>운전자를 특정해</strong> 통고하면 <strong>범칙금</strong>이고,
            여기에는 <strong>벌점</strong>이 함께 붙습니다. 무인 카메라처럼 운전자를 특정하지 못하면
            차량 소유자에게 <strong>과태료</strong>가 부과되는데, 벌점이 없는 대신 금액이 조금 더
            비쌉니다. 무인 단속 고지서에는 보통 두 선택지가 함께 오고, 그중 하나를 골라 내게 됩니다.
          </p>
          <h2>어느 쪽을 고르는 것이 유리한가</h2>
          <p>
            금액만 보면 대개 범칙금이 몇천 원에서 1만원쯤 싸 보입니다. 그런데 범칙금을 고르면{' '}
            <strong>벌점이 남습니다.</strong> 20km/h 이하 초과처럼 벌점이 붙지 않는 구간이라면 싼 쪽을
            고르면 됩니다. 하지만 이미 벌점이 쌓여 있다면 계산이 완전히 달라집니다 — 이번 벌점 때문에
            누산 점수가 <strong>{SUSPEND_POINTS}점</strong>에 닿으면 면허가 정지되고, 그때는 1만원
            차이가 아무 의미가 없습니다. 그래서 이 계산기는 금액만 비교하지 않고{' '}
            <strong>이미 쌓인 벌점을 함께 받아</strong> &ldquo;정지 하루를 얼마에 사는 셈인지&rdquo;까지
            보여 줍니다.
          </p>
          <h2>벌점이 쌓이면 어떻게 되나</h2>
          <p>
            1년간 누산 벌점이 <strong>{SUSPEND_POINTS}점</strong>에 닿으면 면허가 정지되고,{' '}
            <strong>정지 일수는 누산 점수와 같습니다</strong> — 40점이면 40일, 65점이면 65일입니다.
            더 쌓이면 취소로 갑니다. 누산 취소 기준은 기간별로{' '}
            {REVOKE_THRESHOLDS.map(t => `${t.years}년 ${t.points}점`).join(' · ')}입니다.
            반대로 처분벌점이 {SUSPEND_POINTS}점 미만인 상태로 <strong>{CLEAR_MONTHS}개월</strong>{' '}
            동안 무위반·무사고면 소멸합니다. 착한운전 마일리지처럼 공제받을 점수가 있으면 이 계산기의
            공제 칸에 넣으세요.
          </p>
          <h2>기간 안에 내면 깎아 주고, 늦으면 붇습니다</h2>
          <p>
            과태료는 통지서에 적힌 <strong>사전납부(자진납부) 기간</strong> 안에 내면 정해진 비율만큼
            감액됩니다. 반대로 <strong>납부기한</strong>을 넘기면 첫 가산금이 한 번 붙고, 그 뒤로는 달이
            지날 때마다 중가산금이 얹힙니다. 감액률·가산금률·기간은 통지서마다 다르고 개정되기도 하므로{' '}
            <strong>이 계산기는 값을 박아 두지 않고 입력으로 받습니다</strong> — 기본값은 확인된 값이
            아니니 통지서에 적힌 숫자로 바꿔 넣으세요. 범칙금은 사전납부 감액이 없고, 기간을 넘기면
            가산 후 즉결심판 절차로 넘어갑니다.
          </p>
          <h2>이의가 있으면 기간이 정해져 있습니다</h2>
          <p>
            과태료는 부과 전에 <strong>의견진술 기간</strong>이 있고, 범칙금 통고를 받아들이지 않으면
            즉결심판을 청구할 수 있습니다. 차를 빌려준 경우나 도난 차량처럼 운전자가 다른 사정이 있으면
            그 기간 안에 밝혀야 합니다. <strong>기간을 넘기면 다투기가 훨씬 어려워지므로</strong>{' '}
            통지서에 적힌 날짜를 먼저 확인하세요. 이 계산기가 남은 날짜를 함께 보여 주는 이유입니다.
          </p>
          <h2>이 계산의 한계 — 고지서 금액이 우선입니다</h2>
          <p>
            금액과 벌점은 도로교통법 시행령·시행규칙의 표로 정해지고 <strong>개정됩니다.</strong> 그래서
            이 계산기는 널리 알려진 <strong>승용차 기준</strong> 값만 넣었고, 확인하지 못한 칸은 숫자를
            지어내지 않고 <strong>비워 둔 채 그 사실을 표시</strong>합니다. 이륜차·화물차는 금액이
            다르고, 어린이보호구역은 배수로 딱 떨어지지 않는 별도의 표라 <strong>배수를 입력으로</strong>{' '}
            받습니다. 제한속도를 {CRIMINAL_OVER_SPEED}km/h 넘게 초과하면 범칙금·과태료가 아니라 형사처벌
            대상이 될 수 있어 이 계산의 범위를 벗어납니다. <strong>고지서에 적힌 금액이 언제나 이 표보다
            우선합니다</strong> — 금액이 다르면 고지서 쪽을 직접 넣어 쓰세요. 음주운전 관련 판단은{' '}
            <Link href="/calculator/sober-time" className="underline">술 깨는 시간 계산기</Link>,
            차량 유지비는{' '}
            <Link href="/calculator/car-cost" className="underline">차량 유지비 계산기</Link>에서 보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="위반 내용" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>위반 종류</Label>
              <select
                value={violation}
                onChange={e => setViolation(e.target.value as ViolationId)}
                className={selectCls}
              >
                {VIOLATIONS.map(v => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{info.note}</p>
            </div>

            {info.tiered && (
              <div>
                <Label>제한속도를 넘은 정도 (km/h)</Label>
                <input
                  type="number" value={overSpeed} onChange={e => setOverSpeed(e.target.value)}
                  placeholder="예: 25" className={inputCls} min="0" step="1"
                />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  구간: {SPEED_TIERS.map(t => t.label).join(' / ')} · 0이면 위반이 아닙니다
                </p>
              </div>
            )}

            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input
                type="checkbox" checked={schoolZone} onChange={e => setSchoolZone(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              어린이보호구역(스쿨존)·노인보호구역에서의 위반
            </label>

            {schoolZone && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                <div>
                  <Label>금액 배수</Label>
                  <input
                    type="number" value={zoneMoney} onChange={e => setZoneMoney(e.target.value)}
                    className={inputCls} min="1" step="0.1"
                  />
                </div>
                <div>
                  <Label>벌점 배수</Label>
                  <input
                    type="number" value={zonePoint} onChange={e => setZonePoint(e.target.value)}
                    className={inputCls} min="1" step="0.1"
                  />
                </div>
                <p className="col-span-2 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  보호구역 위반은 가중되지만 <strong>배수로 딱 떨어지지 않는 별도의 표</strong>입니다.
                  그래서 배수를 코드에 넣지 않고 여기서 받습니다 — 확인된 값이 아닙니다.
                  1을 넣으면 평상시와 같아지고, 고지서가 있으면 아래에 금액을 직접 넣는 것이 정확합니다.
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="고지서 금액 (넣으면 표보다 우선)" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>범칙금 (원)</Label>
              <CommaInput value={fineOverride} onChange={setFineOverride} placeholder="비우면 표의 값" />
            </div>
            <div>
              <Label>과태료 (원)</Label>
              <CommaInput value={levyOverride} onChange={setLevyOverride} placeholder="비우면 표의 값" />
            </div>
            <div className="col-span-2">
              <Label>벌점 (점)</Label>
              <input
                type="number" value={demeritOverride} onChange={e => setDemeritOverride(e.target.value)}
                placeholder="비우면 표의 값" className={inputCls} min="0" step="1"
              />
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
            표의 금액은 승용차 기준이고 개정될 수 있습니다. <strong>고지서에 적힌 금액이 우선</strong>이니,
            받은 금액이 다르면 여기에 그대로 넣으세요.
          </p>
        </Card>

        <Card className="p-5">
          <CardHeader title="납부 시점 (과태료)" />
          <div className="grid grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <Label>통지서 받고 지난 일수</Label>
              <input type="number" value={daysSinceNotice} onChange={e => setDaysSinceNotice(e.target.value)}
                className={inputCls} min="0" step="1" />
            </div>
            <div>
              <Label>사전납부 기간 (일)</Label>
              <input type="number" value={earlyPayDays} onChange={e => setEarlyPayDays(e.target.value)}
                className={inputCls} min="0" step="1" />
            </div>
            <div>
              <Label>납부기한 (일)</Label>
              <input type="number" value={dueDays} onChange={e => setDueDays(e.target.value)}
                className={inputCls} min="0" step="1" />
            </div>
            <div>
              <Label>사전납부 감액률 (%)</Label>
              <input type="number" value={discountRate} onChange={e => setDiscountRate(e.target.value)}
                className={inputCls} min="0" max="100" step="1" />
            </div>
            <div>
              <Label>첫 가산금률 (%)</Label>
              <input type="number" value={surchargeRate} onChange={e => setSurchargeRate(e.target.value)}
                className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>월 중가산금률 (%)</Label>
              <input type="number" value={monthlyRate} onChange={e => setMonthlyRate(e.target.value)}
                className={inputCls} min="0" step="0.1" />
            </div>
            <div className="col-span-3">
              <Label>중가산금 최대 개월</Label>
              <input type="number" value={maxMonths} onChange={e => setMaxMonths(e.target.value)}
                className={inputCls} min="0" step="1" />
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
            기간과 비율은 <strong>통지서에 적힌 값</strong>으로 바꿔 넣으세요 — 기본값은 확인된 값이
            아닙니다. 기간을 0으로 두면 감액도 가산금도 계산하지 않습니다.
          </p>
        </Card>

        <Card className="p-5">
          <CardHeader title="이미 쌓인 벌점" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>지난 1년 누산 벌점 (점)</Label>
              <input type="number" value={accumulated} onChange={e => setAccumulated(e.target.value)}
                className={inputCls} min="0" step="1" />
            </div>
            <div>
              <Label>공제할 점수 (점)</Label>
              <input type="number" value={credits} onChange={e => setCredits(e.target.value)}
                className={inputCls} min="0" step="1" />
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
            이 칸이 이 계산기의 핵심입니다. 같은 위반이라도 이미 쌓인 점수에 따라{' '}
            <strong>아무 일도 아닐 수도, 면허 정지일 수도</strong> 있습니다. 착한운전 마일리지처럼
            공제받을 점수가 있으면 공제 칸에 넣으세요.
          </p>
        </Card>

        <PrimaryBtn onClick={calculate}>범칙금·과태료 계산</PrimaryBtn>

        {result && (
          <>
            {result.noViolation ? (
              <Card className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  초과 속도가 0이면 위반이 아닙니다. 넘긴 속도를 넣어 보세요.
                </p>
              </Card>
            ) : (
              <>
                <div className="stat-pri">
                  <p className="stat-label">
                    {result.choice === 'unknown'
                      ? '한쪽 금액을 몰라 비교할 수 없습니다'
                      : result.choice === 'levy'
                        ? '과태료로 내는 쪽이 낫습니다'
                        : '범칙금으로 내는 쪽이 낫습니다'}
                  </p>
                  <p className="stat-value">
                    {result.choice === 'levy' ? money(result.levyPayable)
                      : result.choice === 'fine' ? money(result.finePayable)
                      : '—'}
                  </p>
                  <p className="text-blue-200 text-xs mt-1">
                    {result.tier ? `${result.label} · ${result.tier.label}` : result.label}
                    {result.choice !== 'unknown' && result.saveByFine !== null && (
                      result.choice === 'fine'
                        ? ` · 과태료보다 ${w(result.saveByFine)}원 적습니다`
                        : ` · 범칙금보다 ${w(-result.saveByFine)}원 적습니다`
                    )}
                  </p>
                </div>

                {result.suspensionDecides && (
                  <Card className="p-5 border-red-200 dark:border-red-900/50">
                    <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">
                      범칙금을 고르면 면허가 {result.license.days}일 정지됩니다
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      벌점 {result.fineDemerit}점이 붙어 누산 {result.license.total}점이 되고,
                      정지 기준 {SUSPEND_POINTS}점을 넘깁니다. 과태료로 내면 벌점이 붙지 않아 정지가
                      아닙니다.
                      {result.savePerSuspendedDay !== null && result.savePerSuspendedDay > 0 && (
                        <> 범칙금이 {w(result.saveByFine!)}원 싸지만, 그건 <strong>정지 하루를{' '}
                        {w(result.savePerSuspendedDay)}원에 사는 셈</strong>입니다.</>
                      )}
                    </p>
                  </Card>
                )}

                <Card>
                  <CardHeader title="두 선택지" sub="같은 위반, 다른 결과" />
                  <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
                    <div className="p-5">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">범칙금 (운전자)</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {money(result.finePayable)}
                      </p>
                      <p className="text-xs mt-1 text-red-500">
                        벌점 {result.fineDemerit === null ? '—' : `${result.fineDemerit}점`}
                      </p>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">과태료 (차주)</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {money(result.levyPayable)}
                      </p>
                      <p className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">
                        벌점 {result.levyDemerit}점
                      </p>
                    </div>
                  </div>
                </Card>

                {result.levy !== null && (
                  <Card>
                    <CardHeader title="과태료 실납부액" />
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        ['기준 과태료', money(result.levy)],
                        ['사전납부 감액', result.earlyDiscount > 0 ? `−${w(result.earlyDiscount)}원` : '0원'],
                        ['가산금', result.surcharge > 0 ? `+${w(result.surcharge)}원` : '0원'],
                        ['실제 내는 금액', money(result.levyPayable)],
                      ].map(([k, v]) => (
                        <div key={k} className="px-5 py-3 flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-300">{k}</span>
                          <span className="font-semibold tabular-nums">{v}</span>
                        </div>
                      ))}
                    </div>
                    <p className="px-5 py-3 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                      {result.early
                        ? `사전납부 감액을 받으려면 ${result.earlyDaysLeft}일 남았습니다.`
                        : result.overdueDays > 0
                          ? `납부기한을 ${result.overdueDays}일 넘겼습니다 — 늦어질수록 가산금이 붇습니다.`
                          : `사전납부 기간은 지났고, 납부기한까지 ${result.dueDaysLeft}일 남았습니다.`}
                      {' '}범칙금에는 사전납부 감액이 없습니다.
                      {result.fineOverdueWarning && ' 범칙금을 기한 내에 내지 않으면 가산 후 즉결심판 절차로 넘어가며, 이 계산에는 반영되지 않습니다.'}
                    </p>
                  </Card>
                )}

                <Card>
                  <CardHeader title="벌점과 면허" sub="범칙금을 골랐을 때" />
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      ['이미 쌓인 벌점', `${Number(accumulated) || 0}점`],
                      ['이번 위반의 벌점', result.fineDemerit === null ? '—' : `${result.fineDemerit}점`],
                      ['공제', `−${Number(credits) || 0}점`],
                      ['1년 누산 벌점', `${result.license.total}점`],
                      result.license.suspended
                        ? ['면허 정지', `${result.license.days}일`]
                        : ['정지까지 남은 점수', `${result.license.toSuspension}점`],
                    ].map(([k, v]) => (
                      <div key={k} className="px-5 py-3 flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">{k}</span>
                        <span className="font-semibold tabular-nums">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="px-5 py-3 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                    정지 기준은 1년 누산 {SUSPEND_POINTS}점이고, <strong>정지 일수는 누산 점수와
                    같습니다</strong>. 취소 기준은{' '}
                    {REVOKE_THRESHOLDS.map(t => `${t.years}년 ${t.points}점`).join(' · ')}입니다.
                    {result.license.revokeRisk && ' 이번 누산이 1년 취소 기준을 넘습니다.'}
                    {' '}처분벌점이 {SUSPEND_POINTS}점 미만이면 {CLEAR_MONTHS}개월 무위반·무사고로
                    소멸합니다.
                  </p>
                </Card>

                {result.criminalRisk && (
                  <Card className="p-5 border-red-200 dark:border-red-900/50">
                    <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">
                      범칙금·과태료의 문제가 아닙니다
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      제한속도를 {CRIMINAL_OVER_SPEED}km/h 넘게 초과하면 형사처벌 대상이 될 수 있고,
                      반복되면 면허 취소로 이어집니다. 그 경우의 금액과 점수는 확인하지 못해 이 계산에
                      넣지 않았습니다 — 위 금액을 그대로 믿지 마세요.
                    </p>
                  </Card>
                )}

                {result.missing.length > 0 && (
                  <Card className="p-5">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                      비워 둔 칸: {result.missing.join(' · ')}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      이 항목은 <strong>확인하지 못해 값을 넣지 않았습니다.</strong> 그럴듯한 숫자를
                      지어내면 아무도 못 잡기 때문에 비워 둡니다. 고지서에 적힌 금액과 벌점을 위{' '}
                      &lsquo;고지서 금액&rsquo; 칸에 넣으면 그대로 계산됩니다. {info.note}
                    </p>
                  </Card>
                )}
              </>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                * 표의 금액과 벌점은 승용차 기준이며 도로교통법 시행령·시행규칙 개정으로 바뀝니다.
                <strong> 고지서에 적힌 금액이 이 계산보다 우선합니다.</strong> 이륜차·화물차는 금액이
                다르고, 보호구역 가중과 사전납부 감액·가산금은 입력한 값으로 계산한 추정치입니다.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
