'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import { calcOneRm, plateRound, RM_PERCENTS, type OneRmResult } from '@/lib/one-rep-max';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

export default function OneRepMaxPage() {
  const [weight, setWeight] = useState('80');
  const [reps, setReps] = useState('5');
  const [result, setResult] = useState<OneRmResult | null>(null);

  function calculate() {
    setResult(calcOneRm(Number(weight) || 0, Math.floor(Number(reps) || 0)));
  }

  return (
    <CalcShell
      path="/calculator/one-rep-max"
      title="1RM 계산기"
      description="든 무게와 횟수로 1회 최대 중량과 훈련 강도별 무게를 계산합니다"
      intro={
        <>
          <h2>1RM은 재지 않고 되짚는 편이 안전합니다</h2>
          <p>
            1RM은 한 번에 들 수 있는 최대 무게입니다. 직접 재려면 실패 지점까지 밀어붙여야 해서
            부상 위험이 크고 회복에도 며칠이 걸립니다. 그래서 <strong>여러 번 든 무게로
            역산하는 공식</strong>을 씁니다. 5회 든 무게가 있으면 그것으로 충분합니다.
          </p>
          <h2>공식마다 값이 다릅니다</h2>
          <p>
            에플리·브르지키·롬바르디는 각각 다른 자료에서 나온 근사식이라 같은 입력에도
            몇 kg씩 벌어집니다. 하나만 보면 그 수가 정답처럼 보이므로 이 계산기는 셋을 함께
            보여주고 <strong>가운데 값</strong>을 권장값으로 씁니다. 횟수가 10회를 넘으면
            공식끼리 크게 갈리니 5~8회로 잰 기록을 넣는 편이 정확합니다.
          </p>
          <h2>실제로 쓰는 건 % 표입니다</h2>
          <p>
            프로그램은 대개 「1RM의 80%로 5회 5세트」처럼 적힙니다. 아래 표는 1RM에서
            강도별 무게를 <strong>2.5kg 단위</strong>로 떨어뜨린 것입니다 — 원판이 그 단위라
            바로 끼울 수 있습니다.
          </p>
        </>
      }
    >
      <div className="flex justify-end mb-4">
        <LangPicker current="ko" route="/calculator/one-rep-max" available={ALL_LOCALES10} />
      </div>
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="든 기록" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>무게 (kg)</Label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="0" step="0.5" className={inputCls} />
            </div>
            <div>
              <Label>반복 횟수</Label>
              <input type="number" value={reps} onChange={e => setReps(e.target.value)} min="1" max="20" className={inputCls} />
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>1RM 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="label-caps mb-3">예상 1RM</p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100 tabular-nums">
                {result.best}<span className="text-lg font-bold ml-1">kg</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {result.weight}kg × {result.reps}회 기준 · 공식별 {result.min}~{result.max}kg
              </p>
              {result.wideRange && (
                <p className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  10회를 넘기면 공식끼리 크게 갈립니다. 5~8회로 잰 기록을 넣으면 훨씬 정확합니다.
                </p>
              )}

              <SummaryGrid>
                {result.byFormula.map(f => (
                  <SummaryCard key={f.id} label={f.label} value={`${f.value}kg`} />
                ))}
                <SummaryCard label="권장" value={`${result.best}kg`} variant="primary" />
              </SummaryGrid>
            </Card>

            <Card className="p-5">
              <CardHeader title="강도별 무게" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                2.5kg 단위로 떨어뜨렸습니다 — 원판 규격에 맞춰 바로 끼울 수 있게
              </p>
              <div className="kv-table">
                {RM_PERCENTS.map(p => (
                  <div key={p.pct} className="kv-row">
                    <span>
                      {p.pct}%
                      <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">{p.reps} · {p.use}</span>
                    </span>
                    <span className="tabular-nums font-bold">{plateRound(result.best * p.pct / 100)}kg</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <CardHeader title="공식이 다른 이유" />
              <div className="kv-table">
                {result.byFormula.map(f => (
                  <div key={f.id} className="kv-row !block">
                    <span className="block font-bold text-slate-900 dark:text-white">{f.label} — {f.value}kg</span>
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
