'use client';
import { useState } from 'react';
import MoneyInput from '@/components/MoneyInput';
import Link from 'next/link';
import CalcShell, { Card, CardHeader, Label, TabBar, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import {
  MOVE_TYPES, OFTEN_MISSED, calcMovingCost, sqmToPyeong,
  type MoveType, type MovingResult,
} from '@/lib/moving-cost';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

export default function MovingCostPage() {
  // 짐의 양 — 평으로도 ㎡로도 넣을 수 있게 단위를 따로 둔다
  const [unit, setUnit] = useState<'pyeong' | 'sqm'>('pyeong');
  const [area, setArea] = useState('');
  const [perPyeong, setPerPyeong] = useState('');
  const [moveType, setMoveType] = useState<MoveType>('packing');

  const [sameCity, setSameCity] = useState(false);
  const [distanceKm, setDistanceKm] = useState('');
  const [perKm, setPerKm] = useState('');

  const [fromFloor, setFromFloor] = useState('');
  const [fromElevator, setFromElevator] = useState(true);
  const [fromLadder, setFromLadder] = useState(false);
  const [toFloor, setToFloor] = useState('');
  const [toElevator, setToElevator] = useState(true);
  const [toLadder, setToLadder] = useState(false);
  const [perFloorFee, setPerFloorFee] = useState('');
  const [ladderFee, setLadderFee] = useState('');

  const [peak, setPeak] = useState('1');

  const [airconUnits, setAirconUnits] = useState('');
  const [airconPerUnit, setAirconPerUnit] = useState('');
  const [specialItemFee, setSpecialItemFee] = useState('');
  const [storageFee, setStorageFee] = useState('');
  const [disposalFee, setDisposalFee] = useState('');
  const [cleaningFee, setCleaningFee] = useState('');

  const [vat, setVat] = useState(false);
  const [discount, setDiscount] = useState('');

  const [result, setResult] = useState<MovingResult | null>(null);

  const pyeong = unit === 'pyeong' ? Number(area || 0) : sqmToPyeong(Number(area || 0));

  function calculate() {
    const r = calcMovingCost({
      pyeong,
      perPyeong: Number(perPyeong || 0),
      moveType,
      sameCity,
      distanceKm: Number(distanceKm || 0),
      perKm: Number(perKm || 0),
      sites: [
        { floor: Number(fromFloor || 1), elevator: fromElevator, ladder: fromLadder },
        { floor: Number(toFloor || 1), elevator: toElevator, ladder: toLadder },
      ],
      perFloorFee: Number(perFloorFee || 0),
      ladderFee: Number(ladderFee || 0),
      peakMultiplier: Number(peak || 1),
      airconUnits: Number(airconUnits || 0),
      airconPerUnit: Number(airconPerUnit || 0),
      specialItemFee: Number(specialItemFee || 0),
      storageFee: Number(storageFee || 0),
      disposalFee: Number(disposalFee || 0),
      cleaningFee: Number(cleaningFee || 0),
      vat,
      discount: Number(discount || 0),
    });
    // 아무 단가도 안 넣었으면 0원이 크게 뜨는 대신 아무 일도 일어나지 않게 둔다
    if (r.total <= 0) return;
    setResult(r);
  }

  return (
    <CalcShell
      path="/calculator/moving-cost"
      title="이사 비용 계산기"
      description="평수·이사 종류·층수·거리에 사다리차와 추가 항목까지 — 견적서와 맞춰 보는 항목별 내역"
      intro={
        <>
          <h2>이사비에는 정해진 요금표가 없습니다</h2>
          <p>
            취득세는 법이 세율을 정해 두었고 수도요금은 조례에 표가 있습니다. 이사비에는
            그런 것이 <strong>없습니다.</strong> 같은 25평 포장이사가 업체와 지역과 날짜에
            따라 두 배로 갈리고, 금액은 결국 현장을 보고 나온 견적으로 정해집니다. 그래서
            이 계산기는 시세를 넣어 두지 않았습니다 — 그럴듯한 숫자를 기본값으로 깔아 두면
            사람들이 견적서를 그 숫자에 맞춰 읽게 됩니다. <strong>업체에서 받은 단가를
            넣으세요.</strong> 이 계산기가 하는 일은 금액을 알려 주는 것이 아니라, 무엇이
            금액을 가르는지를 항목으로 벌려 놓는 것입니다.
          </p>
          <h2>포장·반포장·일반은 사람 손이 다릅니다</h2>
          <p>
            <strong>일반이사</strong>는 차와 인력만 부르고 싸고 푸는 것은 내가 합니다.
            <strong>반포장이사</strong>는 짐을 싸는 것은 내가 하고 옮기기와 배치를 업체가
            합니다. <strong>포장이사</strong>는 싸고 옮기고 풀어 정리까지 업체가 합니다.
            값이 갈리는 이유는 하나입니다 — 사람이 몇 명 더 붙고 포장재가 얼마나 들어가나.
            그래서 이 계산기는 <strong>평당 단가를 일반이사 기준</strong>으로 받고 종류 때문에
            붇는 몫을 내역에 따로 세웁니다. 이미 포장이사 금액으로 견적을 받았다면 종류를
            &lsquo;일반이사&rsquo;로 두고 그 단가를 그대로 넣으세요. 그러지 않으면 같은 몫을
            두 번 세게 됩니다.
          </p>
          <h2>사다리차가 견적에서 빠지는 까닭</h2>
          <p>
            전화 견적은 평수와 날짜만 묻고 끝나는 일이 많습니다. 그런데 엘리베이터가 없는
            집이거나, 있어도 짐이 안 들어가는 집이면 <strong>사다리차</strong>가 그날 현장에서
            붙습니다. 계단으로 지어 올리면 <strong>층당 계단 이용료</strong>가 붙고, 층수가
            높아질수록 커집니다. 이 계산기가 층수를 <strong>두 집 모두</strong> 받는 것도 그
            때문입니다 — 3층에서 5층으로 가는 이사는 엘리베이터 없는 층을 두 번 겪습니다.
            이사 다툼의 대부분은 금액이 비싸서가 아니라 <strong>견적서에 없던 줄</strong>이
            당일에 생겨서 일어납니다.
          </p>
          <h2>손 없는 날은 왜 비싼가</h2>
          <p>
            예부터 이사와 개업을 <strong>손 없는 날</strong>에 맞추는 풍습이 있습니다. 좋은
            날이라 값이 오르는 것이 아니라, <strong>그날에 수요가 몰려서</strong> 오릅니다.
            차와 인력의 수가 정해져 있으니 같은 이사가 평일보다 비싸집니다. 주말과 월말,
            봄가을 이사철도 같은 이유로 오릅니다. 이 배수가 얼마인지는 업체와 그 주의 예약
            상황이 정하는 것이라 <strong>값을 넣어 두지 않고 배수를 입력</strong>받습니다.
            평상시 견적과 그날 견적을 각각 받아 나눠 보면 그 배수가 나옵니다. 날짜를 옮길 수
            있다면 그 줄이 얼마인지 보고 결정하세요.
          </p>
          <h2>견적을 비교할 때 물어볼 것</h2>
          <p>
            업체 셋에서 받은 총액만 나란히 놓으면 어느 쪽이 싼지 알 수 없습니다. 싼 견적은
            대개 무언가가 빠져 있습니다. <strong>부가세가 포함인지 별도인지</strong>,
            <strong>사다리차가 들어 있는지</strong>, 에어컨 탈부착과 폐기물 처리가 누구 일인지,
            보관이 필요하면 보관료와 두 번째 운송비가 들어 있는지를 물어야 같은 조건이 됩니다.
            아래 <strong>견적서에서 빠지기 쉬운 항목</strong> 목록을 종이 옆에 놓고 하나씩
            짚으세요. 이사 전체 준비는{' '}
            <Link href="/checklist/moving" className="underline">이사 체크리스트</Link>에
            정리해 두었습니다.
          </p>
          <h2>이 계산의 한계</h2>
          <p>
            평수에서 짐의 양을 어림하지만 <strong>같은 평수라도 짐은 사람마다 다릅니다.</strong>{' '}
            방 수를 평수로 바꿔 주는 표는 두지 않았습니다 — &lsquo;원룸은 몇 평&rsquo;을 저희가
            정할 수는 없습니다. 평수를 모르면 단위를 ㎡로 바꿔 넣으면 되고, 면적 환산만 따로
            보려면{' '}
            <Link href="/calculator/pyeong" className="underline">평수 계산기</Link>를 쓰세요.
            이사 종류의 배수는 법이나 요금표가 아니라 <strong>순서를 나타내는 어림</strong>이며,
            확실한 것은 일반 ≤ 반포장 ≤ 포장이라는 부등호뿐입니다. 지하층·복층처럼 현장에서만
            드러나는 조건도 담지 못합니다. <strong>실측 견적을 대신하는 도구가 아닙니다.</strong>{' '}
            집을 사면서 드는 돈 전체를 보려면{' '}
            <Link href="/calculator/home-buying-cost" className="underline">집 살 때 부대비용 계산기</Link>{' '}
            쪽입니다. 그 계산기는 이사비를 한 칸으로 받는데, 그 칸에 넣을 값이 여기서 나옵니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader title="짐의 양과 이사 종류" sub="가장 큰 축입니다" />
          <div className="p-5 flex flex-col gap-3">
            <div>
              <Label>집 면적</Label>
              <div className="flex flex-col gap-2">
                <TabBar
                  options={[{ value: 'pyeong', label: '평' }, { value: 'sqm', label: '㎡' }]}
                  value={unit}
                  onChange={v => setUnit(v as 'pyeong' | 'sqm')}
                />
                <input type="number" value={area} onChange={e => setArea(e.target.value)}
                  placeholder={unit === 'pyeong' ? '예: 25' : '예: 84'} className={inputCls} min="0" step="0.1" />
              </div>
              {unit === 'sqm' && Number(area) > 0 && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                  약 {pyeong.toFixed(1)}평으로 셉니다
                </p>
              )}
            </div>

            <div>
              <Label>평당 단가 (원/평, 일반이사 기준)</Label>
              <MoneyInput value={perPyeong} onChange={setPerPyeong} placeholder="업체 견적에서 받은 값" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                시세를 넣어 두지 않았습니다 — 견적 총액을 평수로 나눈 값을 넣으세요.
                포장이사 견적이라면 종류를 &lsquo;일반이사&rsquo;로 두어야 두 번 세지 않습니다
              </p>
            </div>

            <div>
              <Label>이사 종류</Label>
              <TabBar
                options={MOVE_TYPES.map(m => ({ value: m.key, label: m.label }))}
                value={moveType}
                onChange={v => setMoveType(v as MoveType)}
              />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                {MOVE_TYPES.find(m => m.key === moveType)!.note}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="거리" sub="차량과 시간" />
          <div className="p-5 flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={sameCity} onChange={e => setSameCity(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">
                같은 시·군 안 이동 (거리 가산 없음)
              </span>
            </label>
            {!sameCity && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>편도 거리 (km)</Label>
                  <input type="number" value={distanceKm} onChange={e => setDistanceKm(e.target.value)}
                    placeholder="예: 120" className={inputCls} min="0" />
                </div>
                <div>
                  <Label>km당 가산 (원)</Label>
                  <MoneyInput value={perKm} onChange={setPerKm} placeholder="견적에서 받은 값" />
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="층수와 사다리차" sub="견적에서 가장 자주 빠집니다" />
          <div className="p-5 flex flex-col gap-4">
            {[
              {
                title: '지금 집 (짐을 내리는 곳)', floor: fromFloor, setFloor: setFromFloor,
                elevator: fromElevator, setElevator: setFromElevator, ladder: fromLadder, setLadder: setFromLadder,
              },
              {
                title: '새 집 (짐을 올리는 곳)', floor: toFloor, setFloor: setToFloor,
                elevator: toElevator, setElevator: setToElevator, ladder: toLadder, setLadder: setToLadder,
              },
            ].map(s => (
              <div key={s.title} className="flex flex-col gap-2">
                <Label>{s.title}</Label>
                <input type="number" value={s.floor} onChange={e => s.setFloor(e.target.value)}
                  placeholder="층수 (예: 3)" className={inputCls} min="0" />
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={s.elevator} onChange={e => s.setElevator(e.target.checked)}
                      className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">엘리베이터 있음</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={s.ladder} onChange={e => s.setLadder(e.target.checked)}
                      className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">사다리차 사용</span>
                  </label>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>층당 계단 이용료 (원)</Label>
                <MoneyInput value={perFloorFee} onChange={setPerFloorFee} placeholder="견적에서 받은 값" />
              </div>
              <div>
                <Label>사다리차 1대 (원)</Label>
                <MoneyInput value={ladderFee} onChange={setLadderFee} placeholder="견적에서 받은 값" />
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              1층은 가산이 없고, 엘리베이터가 있으면 계단 이용료가 붙지 않습니다.
              사다리차를 쓰는 집은 계단으로 지지 않으므로 층수를 세지 않습니다
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader title="날짜" sub="수요가 몰리는 날은 비쌉니다" />
          <div className="p-5">
            <Label>손 없는 날·주말·월말 배수 (1이면 평상시)</Label>
            <input type="number" value={peak} onChange={e => setPeak(e.target.value)}
              placeholder="예: 1.2" className={inputCls} min="1" step="0.05" />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
              평상시 견적과 그날 견적을 나눠 보면 이 배수가 나옵니다. 사람과 차가 움직이는
              몫에만 걸리고, 아래 추가 항목에는 곱하지 않습니다
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader title="추가 항목" sub="따로 청구되는 것들" />
          <div className="p-5 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>에어컨 대수</Label>
                <input type="number" value={airconUnits} onChange={e => setAirconUnits(e.target.value)}
                  placeholder="예: 2" className={inputCls} min="0" />
              </div>
              <div>
                <Label>1대 탈부착 (원)</Label>
                <MoneyInput value={airconPerUnit} onChange={setAirconPerUnit} placeholder="배관·가스 별도 확인" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>피아노·금고 등 (원)</Label>
                <MoneyInput value={specialItemFee} onChange={setSpecialItemFee} placeholder="특수 물품" />
              </div>
              <div>
                <Label>보관이사 보관료 (원)</Label>
                <MoneyInput value={storageFee} onChange={setStorageFee} placeholder="재배송비 포함해 적으세요" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>폐기물 처리 (원)</Label>
                <MoneyInput value={disposalFee} onChange={setDisposalFee} placeholder="대형폐기물 스티커 등" />
              </div>
              <div>
                <Label>입주 청소 (원)</Label>
                <MoneyInput value={cleaningFee} onChange={setCleaningFee} placeholder="예: 250000" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="부가세와 할인" sub="섞어 적지 않습니다" />
          <div className="p-5 flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={vat} onChange={e => setVat(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">
                견적 금액이 부가세 별도 (업체 몫에 10% 추가)
              </span>
            </label>
            <div>
              <Label>협의 할인 (원)</Label>
              <MoneyInput value={discount} onChange={setDiscount} placeholder="깎은 금액" />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              &ldquo;현금으로 하면 부가세 빼 준다&rdquo;는 세금계산서를 받지 않는다는 뜻입니다 —
              그때는 위 체크를 끄는 것이 맞습니다. 협의로 깎은 금액은 부가세를 계산한 뒤에 빼므로
              둘이 섞이지 않습니다
            </p>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">넣은 단가로 낸 이사비 합계</p>
              <p className="stat-value">{man(result.total)}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {fmt(result.total)}원 · 요금표가 아니라 <strong>견적 비교용 내역</strong>입니다
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SummaryCard label="이사업체 몫" value={man(result.companyTotal)} sub="부가세가 붙는 대상" />
              <SummaryCard label="추가 항목" value={man(result.extrasTotal)} sub="따로 청구되는 몫" />
            </div>

            <Card>
              <CardHeader title="항목별 내역" sub="0원인 항목은 표시하지 않습니다" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.items.map(i => (
                  <div key={i.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{i.label}</span>
                    <span className={`font-semibold ${i.amount < 0 ? 'text-emerald-600' : ''}`}>
                      {fmt(i.amount)}원
                    </span>
                  </div>
                ))}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 flex justify-between font-bold text-sm">
                  <span>합계</span>
                  <span className="text-blue-600">{fmt(result.total)}원</span>
                </div>
              </div>
            </Card>

            {(result.stairFloors > 0 || result.ladderCount > 0) && (
              <Card className="p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  계단으로 오르내리는 층이 <strong>{result.stairFloors}개 층</strong>,
                  사다리차가 <strong>{result.ladderCount}대</strong>입니다. 이 두 줄이 견적서에
                  적혀 있는지 먼저 확인하세요 — 당일 현장에서 붙는 일이 가장 많은 항목입니다.
                </p>
              </Card>
            )}
          </>
        )}

        <Card>
          <CardHeader title="견적서에서 빠지기 쉬운 항목" sub="종이 옆에 놓고 짚어 보세요" />
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {OFTEN_MISSED.map(m => (
              <div key={m.label} className="px-5 py-3">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{m.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{m.why}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            * 이사비에는 법정 요금표가 없습니다 · 이 결과는 <strong>넣은 단가로 낸 합계</strong>이며
            시세가 아닙니다 · 실제 금액은 업체 셋 이상에서 방문 견적을 받아 비교하세요
          </p>
        </Card>
      </div>
    </CalcShell>
  );
}
