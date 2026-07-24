'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import {
  calcSoberTime, DRINK_PRESETS,
  type Sex, type Drink, type SoberResult,
} from '@/lib/sober-time';

/** 소수 시간을 "N시간 M분"으로 */
function fmtHours(h: number): string {
  const total = Math.round(h * 60);
  const hh = Math.floor(total / 60);
  const mm = total % 60;
  if (hh === 0) return `${mm}분`;
  if (mm === 0) return `${hh}시간`;
  return `${hh}시간 ${mm}분`;
}

export default function SoberTimePage() {
  const [presetId, setPresetId] = useState('soju-bottle');
  const [count, setCount] = useState('1');
  const [weight, setWeight] = useState('70');
  const [sex, setSex] = useState<Sex>('male');
  const [hoursSince, setHoursSince] = useState('0');
  const [result, setResult] = useState<SoberResult | null>(null);

  function calculate() {
    const preset = DRINK_PRESETS.find(p => p.id === presetId)!;
    const n = Math.max(0, Number(count) || 0);
    const drinks: Drink[] = Array.from({ length: n }, () => ({ volumeMl: preset.volumeMl, abv: preset.abv }));
    setResult(calcSoberTime({
      drinks,
      weightKg: Number(weight) || 0,
      sex,
      hoursSince: Number(hoursSince) || 0,
    }));
  }

  return (
    <CalcShell
      path="/calculator/sober-time"
      title="음주 후 운전 가능 시간 계산기"
      description="마신 술과 체중으로 혈중알코올농도와 분해에 걸리는 시간을 추정합니다"
      intro={
        <>
          <h2>이 계산기는 운전을 허락하는 도구가 아닙니다</h2>
          <p>
            위드마크 공식으로 <strong>평균적인 분해 속도</strong>를 추정할 뿐, 실제로는 위 상태,
            체질, 수면, 약물에 따라 개인차가 매우 큽니다. 계산상 기준을 밑돌아도 실제 농도는 더
            높을 수 있습니다. <strong>운전 전 안전한 음주량은 0입니다.</strong> 이 값은 술이 생각보다
            늦게 깬다는 것을 확인하는 참고용입니다.
          </p>
          <h2>다음 날 아침도 안심할 수 없습니다</h2>
          <p>
            밤늦게 많이 마셨다면 아침에도 혈중알코올농도가 단속 기준을 넘는 경우가 흔합니다.
            시간당 분해량은 약 <strong>0.015%</strong>뿐이라, 소주 한 병이 완전히 분해되는 데만도
            여섯 시간이 넘게 걸립니다. 숙취운전 단속의 상당수가 이 아침 시간대입니다.
          </p>
          <h2>기준 농도</h2>
          <p>
            도로교통법상 <strong>혈중알코올농도 0.03% 이상이면 면허정지</strong>, 0.08% 이상이면
            면허취소입니다. 이 계산기는 그 기준 아래로 내려가는 데 걸리는 시간을 추정하지만,
            거듭 강조하듯 추정치이며 안전을 보장하지 않습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="마신 술" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>종류</Label>
              <select value={presetId} onChange={e => setPresetId(e.target.value)} className={selectCls}>
                {DRINK_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.label} ({p.abv}%)</option>
                ))}
              </select>
            </div>
            <div>
              <Label>잔/병 수</Label>
              <input type="number" value={count} onChange={e => setCount(e.target.value)} min="0" step="1" className={inputCls} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="내 정보" />
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>체중 (kg)</Label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="0" className={inputCls} />
            </div>
            <div>
              <Label>성별</Label>
              <select value={sex} onChange={e => setSex(e.target.value as Sex)} className={selectCls}>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
            <div>
              <Label>마신 뒤 (시간)</Label>
              <input type="number" value={hoursSince} onChange={e => setHoursSince(e.target.value)} min="0" step="0.5" className={inputCls} />
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>혈중알코올농도 계산</PrimaryBtn>

        {result && (
          <>
            <Card className={`p-5 ${result.overSuspendNow ? 'border-red-300 dark:border-red-800 bg-red-50/60 dark:bg-red-950/20' : 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20'}`}>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                현재 추정 혈중알코올농도
              </p>
              <p className={`text-3xl font-black ${result.overSuspendNow ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {result.currentBac.toFixed(3)}%
              </p>
              <p className="text-sm font-semibold mt-2 text-slate-700 dark:text-slate-200">
                {result.overRevokeNow ? '⛔ 면허취소 기준(0.08%) 이상 — 절대 운전 금지'
                  : result.overSuspendNow ? '🚫 면허정지 기준(0.03%) 이상 — 운전하면 처벌 대상'
                  : '계산상 기준 미만 — 그래도 개인차가 크니 운전은 권하지 않습니다'}
              </p>
            </Card>

            <Card className="p-5">
              <CardHeader title="음주 종료 시점 기준 소요 시간" />
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">면허정지(0.03%) 아래까지</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{fmtHours(result.hoursToSuspendLimit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">완전 분해(0%)까지</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{fmtHours(result.hoursToZero)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>섭취한 순수 알코올</span>
                  <span className="tabular-nums">{result.alcoholGrams.toFixed(1)}g</span>
                </div>
              </div>

              <SummaryGrid>
                <SummaryCard label="최고 농도" value={`${result.peakBac.toFixed(3)}%`} />
                <SummaryCard
                  label="현재 농도"
                  value={`${result.currentBac.toFixed(3)}%`}
                  variant={result.overSuspendNow ? 'red' : 'green'}
                />
                <SummaryCard label="정지 기준까지" value={fmtHours(result.hoursToSuspendLimit)} />
                <SummaryCard label="완전 분해까지" value={fmtHours(result.hoursToZero)} />
              </SummaryGrid>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
                ⚠️ 소요 시간은 음주를 끝낸 시점부터 셉니다. 위드마크 공식의 평균 추정치일 뿐이며,
                실제 농도는 이보다 높을 수 있습니다. 안전한 유일한 기준은 마셨으면 운전하지 않는 것입니다.
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
