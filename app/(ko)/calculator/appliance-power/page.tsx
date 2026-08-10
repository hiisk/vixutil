'use client';
import { useState } from 'react';
import CalcShell, { Card, CardHeader, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { APPLIANCES } from '@/lib/ampere/list';
import { calcElectricity, extraCost, tierOf, toNextTier } from '@/lib/electricity-tariff';

const fmt = (n: number) => Math.round(n).toLocaleString();

/* 이름은 /ampere가 쓰는 것과 같은 표를 쓴다 — 한 가전이 두 이름을 갖지 않게 */
const NAME: Record<string, string> = {
  purifier: '공기청정기', laptop: '노트북', fan: '선풍기', tv: 'TV', fridge: '냉장고',
  blanket: '전기장판', console: '게임기', desktop: '데스크톱', washer: '세탁기',
  toaster: '토스터', rice: '전기밥솥', microwave: '전자레인지', coffee: '커피머신',
  iron: '다리미', dryer: '헤어드라이어', vacuum: '청소기', aircon: '에어컨',
  kettle: '전기포트', heater: '전기히터', induction: '인덕션',
};

export default function AppliancePowerPage() {
  const [key, setKey] = useState('aircon');
  const [watt, setWatt] = useState('');
  const [hours, setHours] = useState('8');
  const [days, setDays] = useState('30');
  const [base, setBase] = useState('300');
  const [result, setResult] = useState<null | {
    watt: number; kwh: number; extra: number;
    beforeTotal: number; afterTotal: number;
    tierBefore: number; tierAfter: number; left: number | null;
  }>(null);

  function calculate() {
    const w = Number(watt || 0) || APPLIANCES.find(a => a.key === key)!.watt;
    const h = Number(hours);
    const d = Number(days);
    const b = Number(base);
    if (w <= 0 || h <= 0 || d <= 0 || b < 0) return;
    const kwh = (w / 1000) * h * d;
    setResult({
      watt: w,
      kwh,
      extra: extraCost(b, kwh),
      beforeTotal: calcElectricity(b).total,
      afterTotal: calcElectricity(b + kwh).total,
      tierBefore: tierOf(b) + 1,
      tierAfter: tierOf(b + kwh) + 1,
      left: toNextTier(b),
    });
  }

  return (
    <CalcShell
      path="/calculator/appliance-power"
      title="가전 전기요금 계산기"
      description="소비전력과 사용 시간으로 한 달에 얼마나 더 나오는지 계산"
      intro={
        <>
          <h2>가전 하나의 전기요금은 홀로 정해지지 않습니다</h2>
          <p>
            주택용 전기요금은 <strong>누진제</strong>라서, 같은 에어컨이라도 이미 얼마를 쓰고 있느냐에 따라
            값이 두 배 넘게 달라집니다. 200kWh만 쓰던 집에 얹히는 100kWh와, 이미 450kWh를 쓰는 집에
            얹히는 100kWh는 다른 요금입니다. 그래서 이 계산기는 &ldquo;에어컨 요금&rdquo;이 아니라
            <strong> 늘어나는 금액</strong>을 답합니다.
          </p>
          <h2>기본요금이 한 번에 뜁니다</h2>
          <p>
            사용량 요금은 넘긴 만큼만 비싼 단가가 붙지만, <strong>기본요금은 최종 구간 하나로 정해집니다</strong>.
            400kWh에서 401kWh로 1kWh만 넘겨도 기본요금이 1,600원에서 7,300원으로 뜁니다. 누진이 무서운
            자리는 단가가 아니라 여기입니다.
          </p>
          <h2>소비전력은 대표값입니다</h2>
          <p>
            목록의 와트는 그 가전에서 흔한 값이고, 실제 제품은 라벨에 적힌 값이 다릅니다. 특히 에어컨과
            냉장고는 <strong>항상 그 전력을 쓰는 것이 아니라</strong> 설정 온도에 닿으면 껐다 켜기를
            되풀이하므로, 하루 8시간 켜 두었다고 8시간 내내 최대 전력을 쓰지 않습니다. 정확히 보려면
            제품 라벨의 <strong>월간 소비전력량</strong>을 보는 편이 낫습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <LangPicker current="ko" route="/calculator/appliance-power" available={ALL_LOCALES10} />
        </div>
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>가전</Label>
              <select value={key} onChange={e => { setKey(e.target.value); setWatt(''); }} className={inputCls}>
                {APPLIANCES.map(a => (
                  <option key={a.key} value={a.key}>{NAME[a.key]} ({a.watt}W)</option>
                ))}
              </select>
            </div>
            <div>
              <Label>소비전력 직접 입력 (W, 비우면 위 값)</Label>
              <input type="number" value={watt} onChange={e => setWatt(e.target.value)}
                placeholder={`예: ${APPLIANCES.find(a => a.key === key)!.watt}`} className={inputCls} min="0" />
            </div>
            <div className="grid grid-cols-2 gap-3">
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
              <Label>이 가전을 빼고 원래 쓰던 사용량 (kWh)</Label>
              <input type="number" value={base} onChange={e => setBase(e.target.value)}
                placeholder="예: 300" className={inputCls} min="0" />
            </div>
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <div className="bg-blue-600 rounded-2xl p-5">
              <p className="text-blue-200 text-xs mb-1">이 가전 때문에 더 나오는 금액</p>
              <p className="text-white text-3xl font-black">{fmt(result.extra)}원</p>
              <p className="text-blue-200 text-xs mt-1">한 달 {fmt(result.kwh)}kWh · {result.watt}W</p>
            </div>
            <Card>
              <CardHeader title="쓰기 전과 뒤" />
              <div className="divide-y divide-slate-100">
                {[
                  { label: `원래 사용량 (${result.tierBefore}구간)`, value: result.beforeTotal },
                  { label: `이 가전을 더한 뒤 (${result.tierAfter}구간)`, value: result.afterTotal },
                  { label: '차이', value: result.extra },
                ].map(r => (
                  <div key={r.label} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{fmt(r.value)}원</span>
                  </div>
                ))}
              </div>
            </Card>
            {result.tierAfter > result.tierBefore && (
              <Card className="p-4">
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  누진 구간이 {result.tierBefore}구간에서 {result.tierAfter}구간으로 올라갑니다
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {result.left !== null && `원래 사용량에서 ${fmt(result.left)}kWh만 더 쓰면 넘어갑니다. `}
                  기본요금이 함께 뛰기 때문에 사용량이 는 것보다 요금이 더 많이 늘어납니다.
                </p>
              </Card>
            )}
            <Card className="p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                * 주택용 저압 기준 · 부가세 10%와 전력산업기반기금 3.7% 포함 · 소비전력은 대표값이므로 제품 라벨을 확인하세요
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
