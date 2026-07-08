'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard } from '@/components/CalcShell';
import { CALC_FAQ } from '@/lib/calc-faq';

const SOURCE_PRESETS = [
  { label: '아메리카노', mg: 150 },
  { label: '에스프레소', mg: 75 },
  { label: '커피믹스', mg: 70 },
  { label: '에너지드링크', mg: 80 },
  { label: '콜라 1캔', mg: 35 },
  { label: '녹차', mg: 30 },
  { label: '디카페인', mg: 5 },
];

const HALF_LIFE_HOURS = 5; // 카페인 반감기 평균값(개인차 1.5~9.5시간)
const SLEEP_THRESHOLD_MG = 50; // 수면에 큰 지장이 적다고 흔히 이야기되는 참고 기준(의학적 절대 기준 아님)

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function formatClock(totalMinutes: number): string {
  const m = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

function remainingAt(amount: number, hoursElapsed: number): number {
  return amount * Math.pow(0.5, hoursElapsed / HALF_LIFE_HOURS);
}

export default function CaffeinePage() {
  const [amount, setAmount] = useState<number | null>(150);
  const [customAmount, setCustomAmount] = useState('');
  const [intakeTime, setIntakeTime] = useState('09:00');
  const [hoursAfter, setHoursAfter] = useState('6');

  const [result, setResult] = useState<{
    dose: number;
    remaining: number;
    remainingPercent: number;
    milestones: { label: string; time: string }[];
    sleepSafeTime: string | null;
  } | null>(null);

  function handlePreset(mg: number) {
    setAmount(mg);
    setCustomAmount('');
  }

  function handleCustom(v: string) {
    setCustomAmount(v);
    setAmount(null);
  }

  function calculate() {
    const dose = amount !== null ? amount : Number(customAmount);
    const h = Number(hoursAfter);
    if (!dose || h < 0) return;

    const remaining = remainingAt(dose, h);
    const remainingPercent = (remaining / dose) * 100;
    const intakeMin = toMinutes(intakeTime);

    const milestones = [1, 2, 3].map(n => ({
      label: `${n}번의 반감기 (${HALF_LIFE_HOURS * n}시간 후, ${Math.round(100 / Math.pow(2, n))}% 잔존)`,
      time: formatClock(intakeMin + HALF_LIFE_HOURS * n * 60),
    }));

    // remaining(t) = dose * 0.5^(t/half) <= threshold 를 만족하는 최소 t
    let sleepSafeTime: string | null = null;
    if (dose > SLEEP_THRESHOLD_MG) {
      const tHours = HALF_LIFE_HOURS * Math.log2(dose / SLEEP_THRESHOLD_MG);
      sleepSafeTime = formatClock(intakeMin + tHours * 60);
    }

    setResult({ dose, remaining, remainingPercent, milestones, sleepSafeTime });
  }

  return (
    <CalcShell
      title="카페인 계산기"
      description="섭취한 카페인이 시간에 따라 체내에 얼마나 남아있는지 계산합니다"
      faq={CALC_FAQ['caffeine']}
      intro={
        <>
          <h2>계산 방식</h2>
          <p>
            카페인은 체내에서 <strong>반감기(half-life)</strong> 공식에 따라 서서히 분해됩니다. 평균 반감기는
            약 5시간이지만, 유전·간 기능·임신 여부 등에 따라 <strong>1.5~9.5시간까지 개인차</strong>가 큽니다.
            이 계산기는 평균값(5시간)을 기준으로 잔존량 = 섭취량 × 0.5^(경과시간 ÷ 5)로 계산합니다.
          </p>
          <h2>수면 참고 기준</h2>
          <p>
            체내 잔존 카페인이 대략 50mg 이하로 떨어지면 수면에 큰 지장이 적다는 이야기가 있지만, 이는 절대적인
            의학적 기준이 아니라 참고용 눈대중입니다. 카페인에 민감한 편이라면 더 여유 있게 잡는 것이 좋습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">섭취 정보</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>섭취한 음료</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {SOURCE_PRESETS.map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePreset(p.mg)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                      amount === p.mg
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-200 text-slate-500 hover:border-blue-300'
                    }`}
                  >
                    {p.label} ({p.mg}mg)
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={e => handleCustom(e.target.value)}
                placeholder="직접 입력 (mg)"
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>섭취 시각</Label>
                <input
                  type="time"
                  value={intakeTime}
                  onChange={e => setIntakeTime(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <Label>몇 시간 후를 확인할까요?</Label>
                <input
                  type="number"
                  step="0.5"
                  value={hoursAfter}
                  onChange={e => setHoursAfter(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            <SummaryGrid>
              <SummaryCard
                label="체내 잔존 카페인"
                value={`${result.remaining.toFixed(0)}mg`}
                sub={`섭취량의 ${result.remainingPercent.toFixed(0)}%`}
                variant="primary"
              />
              <SummaryCard
                label="섭취량"
                value={`${result.dose}mg`}
                sub={`${hoursAfter}시간 경과 기준`}
              />
            </SummaryGrid>

            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">시간대별 잔존량 예상</p>
              <div className="flex flex-col gap-2">
                {result.milestones.map((m, i) => (
                  <div key={i} className={`flex justify-between items-center py-2 ${i < result.milestones.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <span className="text-sm text-slate-500">{m.label}</span>
                    <span className="text-sm font-bold text-slate-800">약 {m.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {result.sleepSafeTime && (
              <Card className="p-5 bg-amber-50 border-amber-100">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">🌙 참고용 취침 권장 시각</p>
                <p className="text-sm text-slate-700">
                  체내 카페인이 약 {SLEEP_THRESHOLD_MG}mg 이하로 떨어지는 시각은 <strong>{result.sleepSafeTime}</strong> 무렵으로
                  추정됩니다. 개인차가 크므로 참고만 해주세요.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
