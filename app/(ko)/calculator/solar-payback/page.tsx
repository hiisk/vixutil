'use client';
import { useState } from 'react';
import Link from 'next/link';
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn,
  SummaryCard, SummaryGrid, TableWrap, ShowMoreBtn,
} from '@/components/CalcShell';
import CommaInput from '@/components/CommaInput';
import { solarPayback, type SolarInput, type SolarPayback } from '@/lib/solar-payback';

const w = (n: number) => Math.round(n).toLocaleString('ko-KR');
const kwh = (n: number) => n.toLocaleString('ko-KR', { maximumFractionDigits: 0 });

/** 2.7년을 "2년 9개월"로 — 소수점 년수는 읽히지 않는다 */
function yearsText(p: number): string {
  const y = Math.floor(p);
  const m = Math.round((p - y) * 12);
  if (m === 0) return `${y}년`;
  if (m === 12) return `${y + 1}년`;
  return `${y}년 ${m}개월`;
}

export default function SolarPaybackPage() {
  const [capacity, setCapacity] = useState('');
  const [cost, setCost] = useState(0);
  const [monthlyKwh, setMonthlyKwh] = useState('');
  const [sunHours, setSunHours] = useState('');
  const [degradation, setDegradation] = useState('');
  const [years, setYears] = useState('');
  // 넣은 값을 결과와 함께 붙들어 둔다 — 계산 뒤에 입력을 고쳐도 표가 딴 값을 가리키지 않게
  const [result, setResult] = useState<null | { input: SolarInput; out: SolarPayback }>(null);
  const [showAll, setShowAll] = useState(false);

  function calculate() {
    const input: SolarInput = {
      capacityKw: Number(capacity),
      installCost: cost,
      monthlyKwh: Number(monthlyKwh),
      sunHours: Number(sunHours),
      degradation: Number(degradation || 0) / 100,
      years: Number(years),
    };
    if (input.capacityKw <= 0 || input.installCost <= 0) return;
    if (input.monthlyKwh <= 0 || input.sunHours <= 0) return;
    if (input.years < 1 || input.years > 50) return;
    setShowAll(false);
    setResult({ input, out: solarPayback(input) });
  }

  const out = result?.out;
  const rows = out?.rows ?? [];
  const display = showAll ? rows : rows.slice(0, 20);
  const installCost = result?.input.installCost ?? 0;
  const degradationPct = (result?.input.degradation ?? 0) * 100;
  const wasted = rows.length > 0 ? rows[0].wastedKwh : 0;

  return (
    <CalcShell
      path="/calculator/solar-payback"
      wide
      title="태양광 발전 수익 계산기"
      description="설치비 회수 기간 · 누진 구간을 반영한 전기요금 절감액"
      intro={
        <>
          <h2>많이 쓰는 집이 훨씬 많이 아낍니다</h2>
          <p>
            태양광으로 아끼는 돈은 <strong>발전량 × 단가</strong>가 아닙니다. 주택용 전기요금은 누진제라,
            사용량이 줄면 <strong>가장 비싼 구간부터</strong> 지워집니다. 월 500kWh를 쓰는 집에서 100kWh를
            덜 쓰면 3단계 단가(307원대)가 깎이고, 월 200kWh를 쓰는 집에서 똑같이 100kWh를 덜 쓰면
            1단계 단가(120원대)가 깎입니다. <strong>같은 설비, 같은 발전량인데 절감액이 두 배 넘게
            벌어집니다.</strong> 그래서 이 계산기는 평균 단가를 곱하지 않고,{' '}
            <Link href="/calculator/electricity" className="underline">전기요금 계산기</Link>와 같은 누진표로
            태양광이 있을 때와 없을 때의 청구액을 각각 내서 그 차이를 절감액으로 봅니다.
          </p>
          <p>
            400kWh 경계를 <strong>아래로</strong> 넘기는 집은 한 번 더 이득입니다. 기본요금이 7,300원에서
            1,600원으로 내려가기 때문입니다. 내 월 사용량이 몇 kWh인지 모르겠다면 고지서 금액으로{' '}
            <Link href="/calculator/electricity-reverse" className="underline">전기요금 역산 계산기</Link>에서
            먼저 되찾아 오세요.
          </p>
          <h2>일일 발전시간은 지역마다 다릅니다</h2>
          <p>
            1kW 설비가 하루에 몇 kWh를 만드는지를 시간으로 적은 값입니다. 이 값은{' '}
            <strong>일사량(지역)과 설치 방향·경사</strong>에 따라 갈립니다. 남향 지붕과 동향 베란다 난간이
            같을 수 없고, 앞 건물 그늘이 몇 시간 지나가면 또 달라집니다. 여름에는 패널 온도가 올라가 효율이
            떨어지고, 겨울에는 해가 짧습니다. 확인 못 한 값을 미리 넣어 두면 그 값이 그대로 답처럼 보이므로
            비워 두었습니다 — 설치업체 견적서나 한국에너지공단·기상청 일사량 자료의 값을 넣어 쓰세요.
          </p>
          <h2>패널은 해마다 조금씩 덜 만듭니다</h2>
          <p>
            결정질 실리콘 패널은 시간이 지나며 출력이 내려갑니다. 제조사가 보증서에 &ldquo;몇 년 뒤 몇 %&rdquo;로
            적어 두므로 <strong>그 보증값을 연 감소율로 환산해 넣으세요.</strong> 감소율은 회수 기간보다{' '}
            <strong>그 뒤의 총 수익</strong>에 크게 작용합니다 — 회수는 앞쪽 몇 해에 끝나지만, 20년 누적은
            뒤쪽 발전량에 좌우되기 때문입니다.
          </p>
          <h2>남는 발전은 버려지는 것으로 봅니다</h2>
          <p>
            그 달 발전량이 사용량보다 많으면, 넘치는 만큼은 <strong>요금을 더 깎아 주지 않는다</strong>고
            보고 셈합니다. 베란다형·주택형 자가소비 설비는 계량기 안쪽에서 쓰는 전기를 상쇄할 뿐이고, 남는
            전기를 한전이 받아 주는 상계거래는 따로 신청해야 하기 때문입니다. 그래서 <strong>작은 집에 큰
            설비</strong>를 달면 발전량을 다 쓰지 못해 회수가 오히려 늦어집니다. 상계거래를 하고 있다면 실제
            절감액은 이 값보다 큽니다. 지붕에 패널이 몇 장 올라가고 그게 몇 kW가 되는지는{' '}
            <Link href="/geometry/solar-panel-count" className="underline">태양광 패널 개수 계산기</Link>에서
            먼저 재 보세요.
          </p>
          <h2>이 계산의 한계</h2>
          <p>
            사용량과 발전량을 <strong>열두 달에 고르게 나눠</strong> 봅니다. 실제로는 여름에 많이 쓰고 겨울에
            발전이 적어 달마다 다릅니다(누진은 달마다 따로 걸리므로, 편차가 큰 집은 실제 절감액이 이 값보다
            클 수 있습니다). <strong>인버터 교체비·청소·수리비·보험료는 빠져 있습니다</strong> — 인버터는
            패널보다 수명이 짧아 보유 기간 중 한 번 갈아야 하는 경우가 많습니다. 요금표는 주택용 저압
            기준이고, 아파트 고압 계약·계절별 누진 완화·필수사용량 보장공제·다자녀 할인이 걸리면 달라집니다.
            한전 요금은 개정되므로 정확한 금액은 고지서로 확인하세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="label-caps mb-3">설비와 우리 집 사용량</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>설치 용량 (kW)</Label>
              <input type="number" value={capacity} onChange={e => setCapacity(e.target.value)}
                placeholder="예: 3" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>설치비 (원, 보조금 뺀 실부담)</Label>
              <CommaInput value={cost} onChange={setCost} placeholder="예: 3,000,000" />
            </div>
            <div>
              <Label>월 평균 전기 사용량 (kWh)</Label>
              <input type="number" value={monthlyKwh} onChange={e => setMonthlyKwh(e.target.value)}
                placeholder="예: 450" className={inputCls} min="0" />
            </div>
            <div>
              <Label>일일 발전시간 (시간/일)</Label>
              <input type="number" value={sunHours} onChange={e => setSunHours(e.target.value)}
                placeholder="예: 3.5" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>발전량 감소율 (연 %)</Label>
              <input type="number" value={degradation} onChange={e => setDegradation(e.target.value)}
                placeholder="예: 0.5" className={inputCls} min="0" max="10" step="0.1" />
            </div>
            <div>
              <Label>보유 연수 (년)</Label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)}
                placeholder="예: 20" className={inputCls} min="1" max="50" />
            </div>
          </div>
          <p className="note-xs mt-3">
            * 일일 발전시간은 지역·설치 방향·그늘에 따라 다릅니다. 견적서나 일사량 자료의 값을 넣으세요 —
            확인 못 한 값을 미리 넣어 두지 않았습니다.
          </p>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {out && (
          <>
            {out.paybackYears !== null ? (
              <div className="stat-pri">
                <p className="stat-label">설치비 회수 기간</p>
                <p className="stat-value">{yearsText(out.paybackYears)}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  1년차 절감액 {w(out.firstYearSaving)}원 · 설치비 {w(installCost)}원
                </p>
              </div>
            ) : (
              <div className="stat-pri">
                <p className="stat-label">설치비 회수 기간</p>
                <p className="stat-value">보유 {rows.length}년 안에는 회수되지 않습니다</p>
                <p className="text-slate-300 text-xs mt-1">
                  {rows.length}년 누적 절감액 {w(out.totalSaving)}원 · 설치비 {w(installCost)}원 —
                  없는 회수 시점을 지어내지 않습니다
                </p>
              </div>
            )}

            <SummaryGrid>
              <SummaryCard label="1년차 발전량" value={`${kwh(out.annualKwh)}kWh`} sub={`월 ${kwh(out.annualKwh / 12)}kWh`} />
              <SummaryCard label="1년차 절감액" value={`${w(out.firstYearSaving)}원`} sub={`월 ${w(out.firstYearSaving / 12)}원`} variant="green" />
              <SummaryCard label="깎아 준 1kWh의 값" value={`${out.effectiveRate.toFixed(0)}원`} sub="우리 집 누진 위치" />
              <SummaryCard
                label={`${rows.length}년 순이익`}
                value={`${out.netProfit >= 0 ? '+' : '-'}${w(Math.abs(out.netProfit))}원`}
                variant={out.netProfit >= 0 ? 'green' : 'red'}
                sub={`누적 절감 ${w(out.totalSaving)}원`}
              />
            </SummaryGrid>

            <Card>
              <CardHeader title="월 전기요금이 이렇게 바뀝니다" sub="1년차 · 열두 달 평균" />
              <div className="divide-y divide-slate-100">
                {[
                  ['태양광 없을 때', w(out.billBefore)],
                  ['태양광 달았을 때', w(out.billAfter)],
                  ['월 절감액', w(out.billBefore - out.billAfter)],
                ].map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{v}원</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800">
                <p className="note-xs">
                  절감액을 실제로 쓴 발전량으로 나누면 {out.effectiveRate.toFixed(0)}원/kWh입니다. 사용량이
                  많은 집은 비싼 구간이 지워져 300원대가, 적게 쓰는 집은 100원대가 나옵니다 — 같은 설비라도
                  회수 기간이 갈리는 이유입니다.
                </p>
              </div>
            </Card>

            {wasted > 0 && (
              <Card className="p-5">
                <p className="label-caps mb-2">발전량이 사용량보다 많습니다</p>
                <p className="note-sm">
                  1년차에 <strong className="text-slate-800 dark:text-slate-100">{kwh(wasted)}kWh</strong>가
                  남습니다. 요금은 0원 밑으로 내려가지 않으므로 남는 발전은 절감액에 넣지 않았습니다. 용량을
                  줄이거나, 남는 전기를 한전이 받아 주는 상계거래를 알아보는 쪽이 낫습니다.
                </p>
              </Card>
            )}

            <Card>
              <CardHeader title="연도별 발전량과 누적 절감액" sub={`감소율 연 ${degradationPct.toFixed(1)}% 반영`} />
              <TableWrap>
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th>연차</th><th>발전량</th><th>그해 절감액</th><th>누적 절감액</th><th>설치비 대비</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display.map(r => {
                      const done = r.cumulative >= installCost;
                      return (
                        <tr key={r.year}>
                          <td>{r.year}년</td>
                          <td>{kwh(r.genKwh)}kWh</td>
                          <td className="text-emerald-700 dark:text-emerald-300 font-semibold">+{w(r.saving)}원</td>
                          <td className="font-bold text-slate-900 dark:text-slate-100">{w(r.cumulative)}원</td>
                          <td className={done ? 'text-blue-700 dark:text-blue-300 font-semibold' : 'text-slate-400 dark:text-slate-500'}>
                            {((r.cumulative / installCost) * 100).toFixed(0)}%
                            {done && ' 회수'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TableWrap>
              {!showAll && <ShowMoreBtn total={rows.length} showing={20} onClick={() => setShowAll(true)} />}
            </Card>

            <Card className="p-4">
              <p className="note-xs">
                * 주택용 저압 누진 요금표 기준 · 남는 발전은 버려지는 것으로 봄 · 사용량과 발전량을 열두 달
                평균으로 봄 · 인버터 교체비·청소·수리비 제외 · 요금표는 개정되므로 고지서로 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
