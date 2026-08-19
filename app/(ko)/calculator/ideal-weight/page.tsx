'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import { calcIdealWeight, type IdealWeightResult, type Sex } from '@/lib/ideal-weight';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

export default function IdealWeightPage() {
  const [height, setHeight] = useState('170');
  const [sex, setSex] = useState<Sex>('male');
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState<IdealWeightResult | null>(null);

  function calculate() {
    setResult(calcIdealWeight(Number(height) || 0, sex, Number(current) || undefined));
  }

  return (
    <CalcShell
      path="/calculator/ideal-weight"
      title="표준체중 계산기"
      description="키와 성별로 표준체중과 정상 BMI 체중 범위를 계산합니다"
      intro={
        <>
          <h2>표준체중은 「이상적인 몸」이 아닙니다</h2>
          <p>
            널리 쓰이는 네 공식은 모두 1960~80년대 미국에서 <strong>약 용량을 계산하려고</strong>{' '}
            만들어졌습니다. 「이 체중이어야 건강하다」가 아니라 「이 키라면 대개 이쯤」에
            가깝습니다. 근육량·골격·체지방 분포를 전혀 보지 않으므로, 운동을 많이 하는 사람은
            표준체중보다 무거운 것이 정상입니다.
          </p>
          <h2>그래서 범위로 봐야 합니다</h2>
          <p>
            실제 건강 판단에 쓰이는 기준은 <strong>BMI 18.5~24.9</strong>이고, 그것도 하나의 수가
            아니라 구간입니다. 이 계산기는 공식 네 개의 값과 함께 그 BMI 구간에 해당하는 체중
            범위를 냅니다. 대개 범위가 10kg 안팎으로 넓은데, 그 폭이 실제입니다.
          </p>
          <h2>키가 152cm보다 작으면 흔들립니다</h2>
          <p>
            네 공식 모두 <strong>152.4cm(5피트)를 기준</strong>으로 1인치마다 얼마씩 더하는
            꼴입니다. 그보다 작은 키에서는 빼는 방향으로 외삽되어 값이 실제와 벌어집니다.
            그 구간에서는 BMI 범위 쪽을 보세요.
          </p>
        </>
      }
    >
      <div className="flex justify-end mb-4">
        <LangPicker current="ko" route="/calculator/ideal-weight" available={ALL_LOCALES10} />
      </div>
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="내 정보" />
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>키 (cm)</Label>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} min="0" className={inputCls} />
              </div>
              <div>
                <Label>성별</Label>
                <select value={sex} onChange={e => setSex(e.target.value as Sex)} className={selectCls}>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>
            </div>
            <div>
              <Label>현재 체중 (kg) — 선택</Label>
              <input type="number" value={current} onChange={e => setCurrent(e.target.value)} min="0" placeholder="넣으면 지금 BMI도 함께 나옵니다" className={inputCls} />
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>표준체중 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="label-caps mb-3">정상 BMI 체중 범위</p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                {result.healthyMin}~{result.healthyMax}<span className="text-lg font-bold ml-1">kg</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                키 {result.heightCm}cm · BMI 18.5~24.9 기준 · 공식 평균 {result.average}kg
              </p>
              {result.belowBase && (
                <p className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  공식들이 152.4cm를 기준으로 만들어져 이보다 작은 키에서는 값이 실제와
                  벌어집니다. BMI 범위 쪽을 보세요.
                </p>
              )}

              {result.current && (
                <SummaryGrid>
                  <SummaryCard label="현재 BMI" value={String(result.current.bmi)} variant="primary" />
                  <SummaryCard
                    label={result.current.inRange ? '정상 범위' : '범위 밖'}
                    value={result.current.inRange ? '해당' : '벗어남'}
                  />
                  <SummaryCard
                    label="공식 평균과 차이"
                    value={`${result.current.diffToAverage > 0 ? '+' : ''}${result.current.diffToAverage}kg`}
                  />
                  <SummaryCard label="범위" value={`${result.healthyMin}~${result.healthyMax}kg`} />
                </SummaryGrid>
              )}
            </Card>

            <Card className="p-5">
              <CardHeader title="공식별 표준체중" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                넷이 서로 다릅니다 — 그 폭이 이 값의 정확도입니다
              </p>
              <div className="kv-table">
                {result.byFormula.map(f => (
                  <div key={f.id} className="kv-row !block">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-bold text-slate-900 dark:text-white">{f.label}</span>
                      <span className="tabular-nums font-bold text-slate-900 dark:text-white">{f.value}kg</span>
                    </span>
                    <span className="block mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.note}</span>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
