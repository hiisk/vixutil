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
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import {
  AREA_LIMIT, calcHomeBuyingCost, housingTaxRates, type HomeBuyingResult,
} from '@/lib/home-buying-cost';

const fmt = (n: number) => Math.round(n).toLocaleString();
const man = (n: number) => `${fmt(n / 10_000)}만원`;

export default function HomeBuyingCostPage() {
  const [price, setPrice] = useState('700000000');
  const [over85, setOver85] = useState(false);
  // 중과 대상이면 표준세율 대신 직접 넣는다 — 세율이 정책으로 바뀌어 왔다
  const [manualRate, setManualRate] = useState(false);
  const [acqRate, setAcqRate] = useState('');
  const [eduRate, setEduRate] = useState('');
  const [ruralRate, setRuralRate] = useState('');
  const [brokerRate, setBrokerRate] = useState('0.4');
  const [brokerVat, setBrokerVat] = useState(true);
  const [bondRate, setBondRate] = useState('1.3');
  const [bondDiscountRate, setBondDiscountRate] = useState('8');
  const [legalFee, setLegalFee] = useState('600000');
  const [movingFee, setMovingFee] = useState('800000');
  const [interiorFee, setInteriorFee] = useState('10000000');
  const [loanFee, setLoanFee] = useState('400000');
  const [result, setResult] = useState<HomeBuyingResult | null>(null);

  function calculate() {
    const p = Number(price);
    if (p <= 0) return;
    setResult(calcHomeBuyingCost({
      price: p,
      taxRates: manualRate
        ? {
            acquisition: Number(acqRate || 0) / 100,
            eduLocal: Number(eduRate || 0) / 100,
            rural: Number(ruralRate || 0) / 100,
          }
        : housingTaxRates(p, over85),
      brokerRate: Number(brokerRate || 0),
      brokerVat,
      bondRate: Number(bondRate || 0),
      bondDiscountRate: Number(bondDiscountRate || 0),
      legalFee: Number(legalFee || 0),
      movingFee: Number(movingFee || 0),
      interiorFee: Number(interiorFee || 0),
      loanFee: Number(loanFee || 0),
    }));
  }

  return (
    <CalcShell
      path="/calculator/home-buying-cost"
      title="집 살 때 부대비용 계산기"
      description="집값 외에 더 드는 돈 — 세금·중개보수·이사비까지 합친 총 필요자금"
      intro={
        <>
          <h2>예산이 어긋나는 곳은 집값이 아닙니다</h2>
          <p>
            집값은 계약서에 적혀 있어 틀릴 수가 없습니다. 어긋나는 것은 그 위에 얹히는
            돈입니다. 취득세, 중개보수, 인지세, 채권, 법무사 보수, 이사비, 도배·장판,
            근저당 설정비 — 하나하나는 작아 보이는데 합치면 <strong>집값의 몇 퍼센트</strong>가
            됩니다. 그래서 이 계산기가 크게 보여주는 값은 합계가 아니라 <strong>집값 대비
            비율</strong>입니다. 잔금 날 모자라는 돈이 대부분 여기서 나옵니다.
          </p>
          <h2>가장 자주 빠뜨리는 항목</h2>
          <p>
            <strong>취득세에 딸려 오는 두 가지</strong>가 첫 번째입니다. 취득세만 계산해 두면
            지방교육세와 농어촌특별세가 빠집니다. <strong>국민주택채권</strong>이 두 번째입니다.
            등기할 때 사야 하는데, 대개 그 자리에서 바로 되팔기 때문에 실제로 잃는 돈은
            매입액이 아니라 <strong>매도 할인손실</strong>뿐입니다. 이 계산기가 합계에 넣는 것도
            손실 쪽입니다. 세 번째는 <strong>대출 부대비용</strong>입니다. 근저당 설정비와
            감정료는 대출 이자와 따로 나갑니다. 여기에 이사비와 최소한의 수리비까지 넣어야
            비로소 실제로 준비해야 할 금액이 나옵니다.
          </p>
          <h2>취득세율이 갈리는 기준</h2>
          <p>
            주택 유상거래는 <strong>6억원 이하 1%</strong>, <strong>9억원 초과 3%</strong>이고,
            그 사이 6~9억 구간은 계단이 아니라 1%에서 3%로 매끄럽게 올라가는 산식을 씁니다.
            6억원에서 1원만 넘어도 세율이 뛰던 문제를 없앤 구조라, 경계에서 값이 정확히
            이어집니다. 여기에 <strong>전용면적 85㎡</strong>가 또 하나의 갈림길입니다 —
            국민주택규모 이하면 농어촌특별세가 아예 붙지 않아 9억 초과 주택이 3.5%가 아니라
            3.3%가 됩니다. 세율만 따로 보려면{' '}
            <Link href="/calculator/acquisition-tax" className="underline">취득세 계산기</Link>를
            쓰세요.
          </p>
          <h2>중개보수는 상한이지 정찰가가 아닙니다</h2>
          <p>
            법이 정한 것은 &ldquo;최대 이만큼까지&rdquo;라는 상한선이고, 그 안에서는 협의로
            정합니다. 그래서 이 계산기는 요율을 넣어 두지 않고 <strong>직접 입력</strong>받습니다 —
            상한을 기본값으로 박아 두면 깎을 수 있는 것을 못 깎게 됩니다. 구간별 상한요율과
            부가세는{' '}
            <Link href="/calculator/broker-fee" className="underline">중개수수료 계산기</Link>에서
            확인하고, 그 값을 여기에 옮겨 적으면 됩니다.
          </p>
          <h2>이 계산의 한계</h2>
          <p>
            표준세율은 <strong>취득 후 1주택인 경우</strong>만 자동으로 계산합니다.
            다주택·조정대상지역 중과는 세율 자체가 정책에 따라 바뀌어 왔기 때문에 확인하지 못한
            숫자를 넣어 두지 않았습니다 — <strong>세율 직접 입력</strong>을 켜서 그 시점의 세율을
            넣으세요. 생애최초 감면처럼 소득·가격 요건이 붙는 감면도 반영하지 않았습니다.
            국민주택채권 매입비율과 할인율은 지역과 조례, 그날의 채권 시세로 달라져 입력으로
            받습니다. 결과는 <strong>예산을 짜기 위한 추정치</strong>이며, 실제 세액은 관할
            지방자치단체에, 등기 비용은 법무사에게 확인해야 합니다. 대출 원리금 부담은{' '}
            <Link href="/calculator/loan" className="underline">대출 이자 계산기</Link>에서 따로
            보세요.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>집값 · 취득가액 (원)</Label>
              <MoneyInput value={price} onChange={setPrice} placeholder="예: 700000000" />
            </div>

            {!manualRate ? (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={over85} onChange={e => setOver85(e.target.checked)}
                  className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  전용면적 {AREA_LIMIT}㎡ 초과 (농어촌특별세 0.2% 추가)
                </span>
              </label>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>취득세율 (%)</Label>
                  <input type="number" value={acqRate} onChange={e => setAcqRate(e.target.value)}
                    placeholder="8" className={inputCls} min="0" step="0.1" />
                </div>
                <div>
                  <Label>지방교육세율 (%)</Label>
                  <input type="number" value={eduRate} onChange={e => setEduRate(e.target.value)}
                    placeholder="0.4" className={inputCls} min="0" step="0.1" />
                </div>
                <div>
                  <Label>농특세율 (%)</Label>
                  <input type="number" value={ruralRate} onChange={e => setRuralRate(e.target.value)}
                    placeholder="0.2" className={inputCls} min="0" step="0.1" />
                </div>
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={manualRate}
                onChange={e => { setManualRate(e.target.checked); setResult(null); }}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">
                세율 직접 입력 (다주택·조정대상지역 중과)
              </span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>중개보수 요율 (%)</Label>
                <input type="number" value={brokerRate} onChange={e => setBrokerRate(e.target.value)}
                  placeholder="0.4" className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>법무사·등기 대행 (원)</Label>
                <MoneyInput value={legalFee} onChange={setLegalFee} placeholder="예: 600000" />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={brokerVat} onChange={e => setBrokerVat(e.target.checked)}
                className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">중개보수에 부가세 10% 포함</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>채권 매입비율 (%)</Label>
                <input type="number" value={bondRate} onChange={e => setBondRate(e.target.value)}
                  placeholder="예: 1.3" className={inputCls} min="0" step="0.1" />
              </div>
              <div>
                <Label>채권 매도 할인율 (%)</Label>
                <input type="number" value={bondDiscountRate} onChange={e => setBondDiscountRate(e.target.value)}
                  placeholder="예: 8" className={inputCls} min="0" step="0.1" />
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              채권은 사서 바로 되팔면 할인율만큼만 손실입니다 — 지역·조례·시세로 달라 직접 넣습니다
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>이사비 (원)</Label>
                <MoneyInput value={movingFee} onChange={setMovingFee} placeholder="예: 800000" />
              </div>
              <div>
                <Label>인테리어·수리 (원)</Label>
                <MoneyInput value={interiorFee} onChange={setInteriorFee} placeholder="예: 10000000" />
              </div>
            </div>
            <div>
              <Label>대출 부대비용 (원, 근저당 설정비·감정료 등)</Label>
              <MoneyInput value={loanFee} onChange={setLoanFee} placeholder="예: 400000" />
            </div>

            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="stat-pri">
              <p className="stat-label">집값 외에 더 드는 돈</p>
              <p className="stat-value">{man(result.extraTotal)}</p>
              <p className="stat-sub">
                집값의 {result.extraRate.toFixed(2)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SummaryCard label="총 필요자금" value={man(result.grandTotal)} />
              <SummaryCard label="세금 합계" value={man(result.taxTotal)} />
            </div>

            <Card>
              <CardHeader title="부대비용 내역" sub="0원인 항목은 표시하지 않습니다" />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.items.map(i => (
                  <div key={i.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{i.label}</span>
                    <span className="font-semibold">{fmt(i.amount)}원</span>
                  </div>
                ))}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 flex justify-between font-bold text-sm">
                  <span>부대비용 합계</span>
                  <span className="text-blue-600">{fmt(result.extraTotal)}원</span>
                </div>
              </div>
            </Card>

            {result.bondPurchase > 0 && (
              <Card className="p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  채권 매입액 {fmt(result.bondPurchase)}원 중 실제 손실은{' '}
                  {fmt(result.bondCost)}원입니다. 매입액은 잔금 날 <strong>한 번은 있어야 하는
                  돈</strong>이니 현금 흐름은 따로 챙기세요.
                </p>
              </Card>
            )}

            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 예산용 추정치 · 표준세율은 취득 후 1주택 기준이며 감면은 반영하지 않았습니다 ·
                실제 세액은 관할 지방자치단체, 등기 비용은 법무사에게 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
