'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';

// MET 값 (Compendium of Physical Activities, Ainsworth et al. 2011)
const EXERCISES: { key: string; label: string; met: number; emoji: string }[] = [
  { key: 'walk_slow',   label: '걷기 (천천히, 4km/h)',    met: 2.8,  emoji: '🚶' },
  { key: 'walk_fast',   label: '걷기 (빠르게, 6km/h)',    met: 3.8,  emoji: '🚶' },
  { key: 'run_slow',    label: '달리기 (느리게, 8km/h)',   met: 8.0,  emoji: '🏃' },
  { key: 'run_fast',    label: '달리기 (빠르게, 12km/h)', met: 11.5, emoji: '🏃' },
  { key: 'bicycle',     label: '자전거 (보통 속도)',        met: 7.5,  emoji: '🚴' },
  { key: 'bicycle_fast',label: '자전거 (빠른 속도)',        met: 12.0, emoji: '🚴' },
  { key: 'swim',        label: '수영 (일반)',               met: 6.0,  emoji: '🏊' },
  { key: 'swim_fast',   label: '수영 (빠르게)',             met: 9.8,  emoji: '🏊' },
  { key: 'jump_rope',   label: '줄넘기',                   met: 11.0, emoji: '⏭️' },
  { key: 'yoga',        label: '요가',                     met: 2.5,  emoji: '🧘' },
  { key: 'pilates',     label: '필라테스',                  met: 3.0,  emoji: '🤸' },
  { key: 'tennis',      label: '테니스 (단식)',             met: 8.0,  emoji: '🎾' },
  { key: 'hiking',      label: '등산 (오르막)',             met: 6.0,  emoji: '⛰️' },
  { key: 'weight',      label: '웨이트 트레이닝 (일반)',    met: 3.5,  emoji: '🏋️' },
  { key: 'weight_hard', label: '웨이트 트레이닝 (고강도)', met: 6.0,  emoji: '🏋️' },
  { key: 'basketball',  label: '농구',                     met: 8.0,  emoji: '🏀' },
  { key: 'soccer',      label: '축구',                     met: 10.0, emoji: '⚽' },
  { key: 'badminton',   label: '배드민턴',                  met: 5.5,  emoji: '🏸' },
  { key: 'golf',        label: '골프 (걸어서)',             met: 4.8,  emoji: '⛳' },
  { key: 'dance',       label: '댄스 (에어로빅)',           met: 7.3,  emoji: '💃' },
  { key: 'housework',   label: '청소·집안일',               met: 3.3,  emoji: '🧹' },
];

// 음식 칼로리 비교 (kcal)
const FOOD_COMPARISON: { name: string; kcal: number }[] = [
  { name: '밥 한 공기 (210g)', kcal: 313 },
  { name: '라면 1개', kcal: 500 },
  { name: '삼겹살 200g', kcal: 594 },
  { name: '초콜릿 1개 (50g)', kcal: 270 },
  { name: '아이스크림 1개', kcal: 200 },
  { name: '콜라 1캔 (355ml)', kcal: 150 },
  { name: '치킨 1조각', kcal: 240 },
  { name: '빅맥 1개', kcal: 550 },
];

export default function CaloriesBurnPage() {
  const [weight, setWeight] = useState('');
  const [exercise, setExercise] = useState('walk_fast');
  const [duration, setDuration] = useState('');

  const [result, setResult] = useState<{
    kcal: number; fatGram: number; met: number; exerciseLabel: string;
  } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    if (!w || w <= 0) { setError('체중을 입력해주세요.'); return; }
    if (!d || d <= 0) { setError('운동 시간을 입력해주세요.'); return; }

    const ex = EXERCISES.find(e => e.key === exercise)!;
    const hours = d / 60;
    // 칼로리 = MET × 체중(kg) × 시간(h)
    const kcal = ex.met * w * hours;
    // 체지방 1kg = 7,700kcal, 1g = 7.7kcal
    const fatGram = kcal / 7.7;

    setResult({ kcal, fatGram, met: ex.met, exerciseLabel: ex.label });
  }

  return (
    <CalcShell
      path="/calculator/calories-burn"
      title="운동 칼로리 소모 계산기"
      description="MET 기반 운동별 칼로리 소모 · 지방 소모량 · 음식 비교"
      intro={
        <>
          <h2>MET로 계산합니다</h2>
          <p>
            <strong>MET</strong>는 가만히 있을 때 대비 몇 배의 에너지를 쓰는지를 나타내는 값입니다.
            소모 칼로리는 <strong>MET × 체중(kg) × 시간</strong>으로 구합니다. 같은 운동이어도
            체중이 무거울수록 더 많이 태우는 이유가 여기 있습니다. MET 값은 신체활동 개요서
            (Compendium of Physical Activities)를 따랐습니다.
          </p>
          <h2>운동으로 빼는 건 생각보다 어렵습니다</h2>
          <p>
            30분 달리기로 태우는 열량이 라면 한 그릇에도 못 미치는 경우가 흔합니다. 먹는 쪽을
            조절하는 게 훨씬 효율적이라는 이야기가 나오는 이유입니다. 그렇다고 운동이 의미 없다는
            뜻은 아닙니다. <strong>근육량과 심폐 건강</strong>은 칼로리 숫자로 환산되지 않는 값어치가
            있습니다.
          </p>
          <h2>추정치입니다</h2>
          <p>
            같은 운동이어도 강도·숙련도·개인차에 따라 실제 소모량은 달라집니다. 운동 기구나 스마트워치가
            보여주는 숫자도 마찬가지로 추정이고, 대체로 <strong>실제보다 높게</strong> 나오는 경향이
            있습니다. 하나의 기준으로 꾸준히 재면서 추세를 보는 편이 절대값보다 쓸모 있습니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">운동 정보 입력</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>체중 (kg)</Label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="예: 70"
                className={inputCls}
              />
            </div>
            <div>
              <Label>운동 종류</Label>
              <select value={exercise} onChange={e => setExercise(e.target.value)} className={selectCls}>
                {EXERCISES.map(ex => (
                  <option key={ex.key} value={ex.key}>
                    {ex.emoji} {ex.label} (MET {ex.met})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>운동 시간 (분)</Label>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="예: 30"
                className={inputCls}
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {/* 핵심 결과 */}
            <div className="rounded-2xl border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/30 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-orange-400 mb-1">소모 칼로리</p>
                  <p className="text-5xl font-black text-orange-600">{Math.round(result.kcal)}</p>
                  <p className="text-sm text-orange-400">kcal</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-orange-400 mb-1">지방 소모량</p>
                  <p className="text-3xl font-black text-orange-500">{result.fatGram.toFixed(1)}</p>
                  <p className="text-sm text-orange-400">g</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl px-4 py-2 border border-orange-100 dark:border-orange-900/40">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {result.exerciseLabel} · MET {result.met} ·
                  {' '}{duration}분 운동 기준
                </p>
              </div>
            </div>

            {/* 음식 비교 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">음식 칼로리 비교</p>
              <div className="flex flex-col gap-2">
                {FOOD_COMPARISON.map(f => {
                  const ratio = result.kcal / f.kcal;
                  const pct = Math.min(100, ratio * 100);
                  return (
                    <div key={f.name} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-300">{f.name}</span>
                        <span className={`font-semibold ${ratio >= 1 ? 'text-orange-600' : 'text-slate-500 dark:text-slate-400'}`}>
                          {ratio.toFixed(1)}개분 ({f.kcal} kcal)
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">* 100% = 해당 음식 칼로리와 동일, 그 이상은 더 많이 소모</p>
            </Card>

            {/* MET 설명 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">MET란?</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                MET(Metabolic Equivalent of Task)는 운동 강도를 나타내는 단위입니다.
                MET 1 = 안정 시 산소 소모량(3.5 mL/kg/min)을 기준으로 하며,
                MET × 체중(kg) × 시간(h) = 소모 칼로리(kcal)로 계산됩니다.
                (Ainsworth et al. 2011 Compendium of Physical Activities 기준)
              </p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
