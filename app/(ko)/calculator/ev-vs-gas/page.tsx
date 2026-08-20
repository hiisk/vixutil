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
import CalcShell, {
  Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard, SummaryGrid, TableWrap,
} from '@/components/CalcShell';
import { compareEvVsGas, type EvVsGasResult } from '@/lib/ev-vs-gas';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(Math.abs(n) / 10_000)}만원`;

export default function EvVsGasPage() {
  const [km, setKm] = useState('15000');
  const [years, setYears] = useState('5');
  // 충전 단가·유가·자동차세·정비비·감면은 기본값을 두지 않는다 — 시기와 지역에
  // 따라 갈리는 값이라, 박아 두면 그 숫자가 결론을 정해 버린다.
  const [evPrice, setEvPrice] = useState('55000000');
  const [evTaxCut, setEvTaxCut] = useState('3000000');
  const [evEff, setEvEff] = useState('5');
  const [evUnit, setEvUnit] = useState('');
  const [evTax, setEvTax] = useState('');
  const [evMaint, setEvMaint] = useState('400000');
  const [gasPrice, setGasPrice] = useState('40000000');
  const [gasEff, setGasEff] = useState('12');
  const [gasUnit, setGasUnit] = useState('');
  const [gasTax, setGasTax] = useState('');
  const [gasMaint, setGasMaint] = useState('900000');
  const [result, setResult] = useState<EvVsGasResult | null>(null);

  function calculate() {
    const y = Number(years);
    if (y < 1) return;
    if (Number(evEff) <= 0 || Number(gasEff) <= 0) return;
    if (Number(evPrice) <= 0 || Number(gasPrice) <= 0) return;
    setResult(compareEvVsGas({
      km: Number(km || 0),
      years: y,
      ev: {
        price: Number(evPrice), taxCut: Number(evTaxCut || 0),
        kmPerUnit: Number(evEff), unitPrice: Number(evUnit || 0),
        tax: Number(evTax || 0), maintenance: Number(evMaint || 0),
      },
      gas: {
        price: Number(gasPrice), taxCut: 0,
        kmPerUnit: Number(gasEff), unitPrice: Number(gasUnit || 0),
        tax: Number(gasTax || 0), maintenance: Number(gasMaint || 0),
      },
    }));
  }

  const be = result?.breakevenYears ?? null;

  return (
    <CalcShell
      path="/calculator/ev-vs-gas"
      title="전기차 vs 내연차 유지비 비교 계산기"
      description="비싼 차값을 유지비로 몇 년에 뽑는지 — 손익분기 연수와 누적 총비용"
      intro={
        <>
          <h2>전비와 연비는 같은 자로 맞댈 수 있습니다</h2>
          <p>
            단위가 달라 보이지만 둘 다 <strong>에너지 한 단위로 가는 거리</strong>입니다. 그래서
            양쪽 모두 <strong>주행거리 ÷ (한 단위로 가는 거리) × 단가</strong>로 한 해 에너지비가
            나옵니다. 전기차는 전비(km/kWh)와 원/kWh, 내연차는 연비(km/L)와 원/L을 넣으면 됩니다.
            이 계산기는 그 값을 km당 비용으로도 보여주니, 5km/kWh에 300원이면 km당 60원,
            12km/L에 1,650원이면 km당 137.5원처럼 바로 견줄 수 있습니다. 한 번의 충전비나
            주유비만 알고 싶으면{' '}
            <Link href="/calculator/ev-charge" className="underline">전기차 충전비 계산기</Link>와{' '}
            <Link href="/calculator/gas-cost" className="underline">주유비 계산기</Link>를 쓰세요.
          </p>
          <h2>손익분기 연수의 뜻</h2>
          <p>
            전기차가 비싸다면 그 차액을 해마다 아끼는 유지비로 갚아 나가는 셈입니다.
            <strong> 손익분기 연수 = 처음 더 낸 돈 ÷ 해마다 아끼는 돈</strong>이고, 그 해에
            두 차의 누적 총비용이 같아집니다. 그보다 오래 타면 이득, 그전에 팔면 손해입니다.
            반대로 감면·보조금까지 넣어 전기차가 처음부터 싸면 회수할 것이 없어 0년으로 냅니다.
            충전 단가가 비싸 유지비까지 더 든다면 두 선은 영원히 만나지 않으므로, 억지로 숫자를
            내지 않고 &ldquo;유지비로는 못 뽑는다&rdquo;고 답합니다.
          </p>
          <h2>돈으로 세지 않은 것들</h2>
          <p>
            이 표에 안 들어간 것이 결정을 뒤집을 수 있습니다. <strong>배터리 감가와 교체 비용</strong>,
            보증이 끝난 뒤의 위험, 중고로 팔 때의 잔존가치, <strong>충전에 쓰는 시간</strong>과
            집·직장에 충전기가 있느냐, 겨울에 주행거리가 줄어드는 몫, 두 차의 보험료 차이가 그렇습니다.
            특히 집에서 완속으로 충전할 수 있는지가 전기차 유지비를 가장 크게 가릅니다 — 급속만 쓰면
            단가가 몇 배로 올라 손익분기가 크게 밀립니다. 차 한 대의 한 해 유지비를 항목별로 보려면{' '}
            <Link href="/calculator/car-cost" className="underline">차량 유지비 계산기</Link>가 있습니다.
          </p>
          <h2>기본값을 두지 않은 까닭</h2>
          <p>
            충전 단가는 완속·급속과 사업자에 따라 몇 배로 갈리고 정책에 따라 자주 바뀝니다. 유가는
            주마다, 주유소마다 다릅니다. 자동차세는 전기차가 정액이라 보통 낮지만 차종과 지방세에 따라
            다르고, 정비비는 연식과 차종에 따라 몇 배씩 벌어집니다. 취득 감면과 보조금은 해마다
            지자체마다 바뀝니다. <strong>답이 뒤집히는 지점을 내는 계산이라 기본값 하나가 결론을
            바꿉니다.</strong> 그래서 확인 못 한 값은 넣어 두지 않았습니다. 또 보험료·주차비처럼 두
            차에 비슷하게 드는 항목은 차액에서 서로 지워지므로 빼 두었습니다 — 여기 나오는 총비용은
            소유에 드는 돈 전부가 아니라 <strong>두 차를 가르는 항목만 모은 비교용 금액</strong>입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>연간 주행거리 (km)</Label>
              <input type="number" value={km} onChange={e => setKm(e.target.value)}
                placeholder="예: 15000" className={inputCls} min="0" />
            </div>
            <div>
              <Label>보유 연수 (년)</Label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)}
                placeholder="예: 5" className={inputCls} min="1" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">전기차</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>차값 (원)</Label>
              <MoneyInput value={evPrice} onChange={setEvPrice} placeholder="예: 55000000" />
            </div>
            <div>
              <Label>취득 감면·보조금 (원)</Label>
              <MoneyInput value={evTaxCut} onChange={setEvTaxCut} placeholder="예: 3000000" />
            </div>
            <div>
              <Label>전비 (km/kWh)</Label>
              <input type="number" value={evEff} onChange={e => setEvEff(e.target.value)}
                placeholder="예: 5" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>충전 단가 (원/kWh)</Label>
              <MoneyInput value={evUnit} onChange={setEvUnit} placeholder="완속·급속에 따라 다름" />
            </div>
            <div>
              <Label>자동차세 (원/년)</Label>
              <MoneyInput value={evTax} onChange={setEvTax} placeholder="고지서의 연간 세액" />
            </div>
            <div>
              <Label>정비·소모품 (원/년)</Label>
              <MoneyInput value={evMaint} onChange={setEvMaint} placeholder="예: 400000" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">내연차</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>차값 (원)</Label>
              <MoneyInput value={gasPrice} onChange={setGasPrice} placeholder="예: 40000000" />
            </div>
            <div>
              <Label>연비 (km/L)</Label>
              <input type="number" value={gasEff} onChange={e => setGasEff(e.target.value)}
                placeholder="예: 12" className={inputCls} min="0" step="0.1" />
            </div>
            <div>
              <Label>유류비 (원/L)</Label>
              <MoneyInput value={gasUnit} onChange={setGasUnit} placeholder="지금 주유소 가격" />
            </div>
            <div>
              <Label>자동차세 (원/년)</Label>
              <MoneyInput value={gasTax} onChange={setGasTax} placeholder="고지서의 연간 세액" />
            </div>
            <div>
              <Label>정비·소모품 (원/년)</Label>
              <MoneyInput value={gasMaint} onChange={setGasMaint} placeholder="예: 900000" />
            </div>
            <PrimaryBtn onClick={calculate}>비교하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">차값 차이를 유지비로 회수하는 시점</p>
              {be === null ? (
                <>
                  <p className="stat-value">유지비로는 못 뽑습니다</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    전기차가 해마다 {man(result.yearlySaving)} 더 듭니다 · 타는 만큼 차이가 벌어집니다
                  </p>
                </>
              ) : be === 0 ? (
                <>
                  <p className="stat-value">처음부터 전기차가 앞섭니다</p>
                  <p className="text-blue-200 text-xs mt-1">
                    감면까지 넣으면 처음 내는 돈이 {man(result.upfrontGap)} 적어 회수할 차액이 없습니다
                  </p>
                </>
              ) : (
                <>
                  <p className="stat-value">{be.toFixed(1)}년</p>
                  <p className="text-blue-200 text-xs mt-1">
                    처음 더 내는 {man(result.upfrontGap)}을 해마다 {man(result.yearlySaving)}씩 회수
                  </p>
                </>
              )}
            </div>

            <SummaryGrid>
              <SummaryCard label="전기차 연 유지비" value={man(result.ev.yearly)}
                sub={`에너지 ${man(result.ev.energy)}`} />
              <SummaryCard label="내연차 연 유지비" value={man(result.gas.yearly)}
                sub={`에너지 ${man(result.gas.energy)}`} />
              <SummaryCard label="km당 에너지비"
                value={`${result.ev.energyPerKm.toFixed(1)} vs ${result.gas.energyPerKm.toFixed(1)}원`}
                sub="전기차 vs 내연차" />
              <SummaryCard
                label={`${result.table.length}년 뒤 차액`}
                value={man(result.netAtEnd)}
                sub={result.netAtEnd > 0 ? '전기차가 이득' : result.netAtEnd < 0 ? '내연차가 이득' : '같음'}
                variant={result.netAtEnd > 0 ? 'green' : result.netAtEnd < 0 ? 'red' : 'default'}
              />
            </SummaryGrid>

            <Card>
              <CardHeader title="해마다 드는 돈" sub="두 차를 가르는 항목만" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ['에너지비', result.ev.energy, result.gas.energy],
                  ['자동차세', result.ev.tax, result.gas.tax],
                  ['정비·소모품', result.ev.maintenance, result.gas.maintenance],
                  ['한 해 합계', result.ev.yearly, result.gas.yearly],
                  ['처음 내는 돈', result.ev.upfront, result.gas.upfront],
                ].map(([k, e, g]) => (
                  <div key={k as string} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">
                      {fmt(e as number)}원 <span className="text-slate-500 dark:text-slate-400">/</span> {fmt(g as number)}원
                    </span>
                  </div>
                ))}
              </div>
              <p className="px-5 pb-4 text-xs text-slate-500 dark:text-slate-400">전기차 / 내연차 순</p>
            </Card>

            <Card>
              <CardHeader title="보유 연수별 누적 총비용" />
              <div className="px-5 pb-5">
                <TableWrap>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 px-3 font-semibold">보유</th>
                        <th className="text-right py-2 px-3 font-semibold">전기차</th>
                        <th className="text-right py-2 px-3 font-semibold">내연차</th>
                        <th className="text-right py-2 px-3 font-semibold">차액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.table.map(row => {
                        // 손익분기를 지나 뒤집히는 첫 해를 짚어 준다
                        const flipped = be !== null && be > 0 && row.year >= be
                          && (row.year - 1 < be);
                        return (
                          <tr key={row.year}
                            className={`row-line ${flipped ? 'bg-blue-50 dark:bg-blue-950/30 font-bold text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}`}>
                            <td className="py-2 px-3">{row.year}년{flipped && ' ← 뒤집힘'}</td>
                            <td className="text-right py-2 px-3">{man(row.ev)}</td>
                            <td className="text-right py-2 px-3">{man(row.gas)}</td>
                            <td className={`text-right py-2 px-3 ${row.diff > 0 ? 'text-emerald-600' : row.diff < 0 ? 'text-red-500' : ''}`}>
                              {row.diff > 0 ? '+' : row.diff < 0 ? '−' : ''}{man(row.diff)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </TableWrap>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  차액은 내연차 − 전기차입니다. +면 그 해까지 전기차가 아낀 돈입니다.
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                * 넣은 단가·세금·정비비가 보유 기간 동안 그대로라고 보고 셈합니다 · 배터리 교체·잔존가치·보험료·충전 시간은 빠져 있습니다
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
