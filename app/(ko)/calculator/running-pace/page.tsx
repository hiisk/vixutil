'use client';
import { useState } from 'react';
import CalcShell, {
  Card, CardHeader, Label, PrimaryBtn, inputCls, selectCls,
  SummaryCard, SummaryGrid,
} from '@/components/CalcShell';
import {
  calcPace, fmtPace, fmtTime, RACE_DISTANCES, type PaceResult,
} from '@/lib/running-pace';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';

export default function RunningPacePage() {
  const [race, setRace] = useState('10k');
  const [customKm, setCustomKm] = useState('7');
  const [h, setH] = useState('0');
  const [m, setM] = useState('55');
  const [s, setS] = useState('0');
  const [result, setResult] = useState<PaceResult | null>(null);

  function calculate() {
    const km = race === 'custom'
      ? Number(customKm) || 0
      : RACE_DISTANCES.find(r => r.id === race)?.km ?? 0;
    const total = (Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0);
    setResult(calcPace(km, total));
  }

  return (
    <CalcShell
      path="/calculator/running-pace"
      title="러닝 페이스 계산기"
      description="목표 기록으로 km당 페이스와 구간 통과 시각을 계산합니다"
      intro={
        <>
          <h2>기록을 페이스로 바꿔야 달릴 수 있습니다</h2>
          <p>
            대회 목표는 「10km 55분」처럼 <strong>기록</strong>으로 세우지만, 실제로 달리면서 보는
            것은 시계에 뜨는 <strong>km당 페이스</strong>입니다. 55분을 10으로 나눠 5분 30초가
            나와야 첫 1km에서 너무 빨리 나갔는지 알 수 있습니다. 이 계산기는 그 변환과
            구간별 통과 시각을 함께 냅니다.
          </p>
          <h2>구간 통과 시각이 실전에서 더 쓸모 있습니다</h2>
          <p>
            페이스는 오르막·신호·사람에 밀려 계속 흔들립니다. 그래서 경험 있는 러너는 페이스보다
            <strong>5km 지점에서 시계가 몇 분이어야 하는지</strong>를 외웁니다. 그 숫자 하나면
            지금 앞서는지 늦는지 바로 판단됩니다.
          </p>
          <h2>거리가 늘면 같은 페이스를 유지하기 어렵습니다</h2>
          <p>
            아래 「같은 페이스로 달린다면」 표는 페이스를 그대로 늘린 값입니다. 실제로는 거리가
            두 배가 되면 페이스가 <strong>km당 15~20초쯤 느려지는</strong> 것이 보통이라,
            10km 기록으로 마라톤을 그대로 환산하면 지나치게 낙관적인 목표가 됩니다.
            훈련 강도를 정할 때만 참고로 쓰세요.
          </p>
        </>
      }
    >
      <div className="flex justify-end mb-4">
        <LangPicker current="ko" route="/calculator/running-pace" available={ALL_LOCALES10} />
      </div>
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <CardHeader title="목표" />
          <div className="flex flex-col gap-3">
            <div>
              <Label>거리</Label>
              <select value={race} onChange={e => setRace(e.target.value)} className={selectCls}>
                {RACE_DISTANCES.map(r => (
                  <option key={r.id} value={r.id}>{r.label} — {r.km}km</option>
                ))}
                <option value="custom">직접 입력</option>
              </select>
            </div>
            {race === 'custom' && (
              <div>
                <Label>거리 (km)</Label>
                <input type="number" value={customKm} onChange={e => setCustomKm(e.target.value)} min="0" step="0.1" className={inputCls} />
              </div>
            )}
            <div>
              <Label>목표 기록</Label>
              <div className="grid grid-cols-3 gap-2">
                <input type="number" value={h} onChange={e => setH(e.target.value)} min="0" className={inputCls} aria-label="시간" />
                <input type="number" value={m} onChange={e => setM(e.target.value)} min="0" max="59" className={inputCls} aria-label="분" />
                <input type="number" value={s} onChange={e => setS(e.target.value)} min="0" max="59" className={inputCls} aria-label="초" />
              </div>
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">시 · 분 · 초</p>
            </div>
          </div>
        </Card>

        <PrimaryBtn onClick={calculate}>페이스 계산</PrimaryBtn>

        {result && (
          <>
            <Card className="p-5">
              <p className="label-caps mb-3">km당 페이스</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {fmtPace(result.paceKm)}<span className="text-lg font-bold ml-1">/km</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {result.km}km를 {fmtTime(result.totalSec)}에 — 시속 {result.speedKmh.toFixed(1)}km
              </p>

              <SummaryGrid>
                <SummaryCard label="km당" value={fmtPace(result.paceKm)} variant="primary" />
                <SummaryCard label="마일당" value={fmtPace(result.paceMile)} />
                <SummaryCard label="시속" value={`${result.speedKmh.toFixed(1)}km`} />
                <SummaryCard label="완주" value={fmtTime(result.totalSec)} />
              </SummaryGrid>
            </Card>

            <Card className="p-5">
              <CardHeader title="구간 통과 시각" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                이 시각에 지나가고 있으면 목표대로 가는 중입니다
              </p>
              <div className="kv-table">
                {result.splits.map(sp => (
                  <div key={sp.at} className="kv-row">
                    <span>{sp.at % 1 === 0 ? sp.at : sp.at.toFixed(3)}km</span>
                    <span className="tabular-nums font-bold">{fmtTime(sp.sec)}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <CardHeader title="같은 페이스로 달린다면" />
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                페이스를 그대로 늘린 값입니다 — 실제로는 거리가 길수록 느려집니다
              </p>
              <div className="kv-table">
                {result.equivalents.map(e => (
                  <div key={e.label} className="kv-row">
                    <span>{e.label} <span className="text-xs text-slate-400 dark:text-slate-500">{e.km}km</span></span>
                    <span className="tabular-nums font-bold">{fmtTime(e.sec)}</span>
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
