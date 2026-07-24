'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import {
  calcProtein, PROTEIN_LEVELS, PROTEIN_FOODS, type ProteinResult,
} from '@/lib/protein-intake';

export default function ProteinPage() {
  const [weight, setWeight] = useState('70');
  const [levelId, setLevelId] = useState('active');
  const [result, setResult] = useState<ProteinResult | null>(null);

  function calculate() {
    const w = Number(weight) || 0;
    if (w <= 0) return;
    setResult(calcProtein({ weightKg: w, levelId }));
  }

  return (
    <CalcShell
      path="/calculator/protein"
      title="단백질 섭취량 계산기"
      description="체중과 활동 수준으로 하루 권장 단백질량을 계산합니다"
      intro={
        <>
          <h2>단백질은 목표에 따라 권장량이 달라집니다</h2>
          <p>
            운동을 거의 하지 않는 성인은 체중 1kg당 약 <strong>0.8g</strong>이 기준(RDA)이지만,
            규칙적으로 운동하면 <strong>1.4~1.8g</strong>, 근육을 늘리거나 다이어트 중 근손실을
            막으려면 <strong>1.6~2.2g</strong>까지 올라갑니다. 그래서 하나의 숫자보다 범위로 보는
            편이 정확합니다.
          </p>
          <h2>한 번에 몰아 먹기보다 나눠서</h2>
          <p>
            몸이 한 끼에 근육 합성에 쓰는 단백질에는 한계가 있어, 하루 권장량을 <strong>세 끼에
            나눠</strong> 먹는 편이 효율적입니다. 이 계산기는 끼니당 참고량도 함께 보여줍니다.
          </p>
          <h2>이런 경우는 다릅니다</h2>
          <p>
            <strong>신장질환이 있으면 단백질을 제한</strong>해야 할 수 있습니다. 이 계산은 건강한
            성인 기준이며, 질환이 있거나 임신·수유 중이라면 전문가와 상의하세요. 결과는 일반적인
            권장 범위를 안내하는 참고치입니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="내 정보" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>체중 (kg)</Label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="0" className={inputCls} />
            </div>
            <div>
              <Label>활동 수준</Label>
              <select value={levelId} onChange={e => setLevelId(e.target.value)} className={selectCls}>
                {PROTEIN_LEVELS.map(l => (
                  <option key={l.id} value={l.id}>{l.label} — {l.desc}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>단백질 권장량 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                하루 권장 단백질
              </p>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {result.minGrams}~{result.maxGrams}<span className="text-lg font-bold ml-1">g</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {result.level.label} · 끼니당 약 {result.perMeal}g씩 나눠서
              </p>
            </Card>

            <Card className="p-5">
              <CardHeader title="이만큼이면 이런 음식으로" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                하루 {result.midGrams}g을 채우려면 (한 가지만 먹는다는 뜻은 아닙니다)
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                {PROTEIN_FOODS.map(f => (
                  <div key={f.name} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 px-3 py-2">
                    <span className="text-slate-600 dark:text-slate-300">{f.name} <span className="text-xs text-slate-400 dark:text-slate-500">({f.per})</span></span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {Math.max(1, Math.round(result.midGrams / f.grams))}개분
                    </span>
                  </div>
                ))}
              </div>

              <SummaryGrid>
                <SummaryCard label="하한" value={`${result.minGrams}g`} />
                <SummaryCard label="권장" value={`${result.midGrams}g`} variant="primary" />
                <SummaryCard label="상한" value={`${result.maxGrams}g`} />
                <SummaryCard label="끼니당" value={`${result.perMeal}g`} />
              </SummaryGrid>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
