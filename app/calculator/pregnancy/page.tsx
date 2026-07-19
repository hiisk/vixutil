'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(date: Date): string {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function weekLabel(w: number, d: number): string {
  return `${w}주 ${d}일`;
}

interface PregnancyResult {
  lmp: Date;
  dueDate: Date;
  currentWeeks: number;
  currentDays: number;
  daysPassed: number;
  daysRemaining: number;
  trimester: 1 | 2 | 3;
  t1Start: Date; t1End: Date;
  t2Start: Date; t2End: Date;
  t3Start: Date;
  milestones: { week: number; label: string; date: Date }[];
}

const MILESTONES = [
  { week: 4,  label: '임신 확인 가능 (hCG 검출)' },
  { week: 8,  label: '첫 산전 검사 권장' },
  { week: 11, label: '목투명대 초음파(NT) 검사 (11~13주)' },
  { week: 12, label: '1분기 통합 선별 검사' },
  { week: 16, label: '2분기 산전 검사 / 쿼드 테스트' },
  { week: 20, label: '정밀 초음파 (20~22주)' },
  { week: 24, label: '임신성 당뇨 검사 (24~28주)' },
  { week: 28, label: '3분기 시작 / 태동 모니터링' },
  { week: 32, label: '성장 초음파 / 태아 위치 확인' },
  { week: 36, label: 'B군 연쇄상구균(GBS) 검사 (36~37주)' },
  { week: 37, label: '만삭 (37주~)' },
  { week: 40, label: '출산 예정일' },
];

export default function PregnancyPage() {
  const [lmpDate, setLmpDate] = useState('');
  const [cycle, setCycle] = useState('28');
  const [result, setResult] = useState<PregnancyResult | null>(null);

  function calculate() {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    const cycleN = Math.max(21, Math.min(45, Number(cycle) || 28));
    // 네겔레 법칙: LMP + 280일 (40주), 주기 보정
    const adjustment = cycleN - 28;
    const dueDate = addDays(lmp, 280 + adjustment);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysPassed = Math.floor((today.getTime() - lmp.getTime()) / 86400000);
    const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / 86400000));

    const totalWeeks = Math.floor(daysPassed / 7);
    const currentWeeks = Math.max(0, totalWeeks);
    const currentDays = Math.max(0, daysPassed % 7);

    const trimester: 1 | 2 | 3 = currentWeeks < 13 ? 1 : currentWeeks < 28 ? 2 : 3;

    const t1Start = lmp;
    const t1End = addDays(lmp, 7 * 13 - 1);
    const t2Start = addDays(lmp, 7 * 13);
    const t2End = addDays(lmp, 7 * 28 - 1);
    const t3Start = addDays(lmp, 7 * 28);

    const milestones = MILESTONES.map(m => ({
      week: m.week,
      label: m.label,
      date: addDays(lmp, m.week * 7 + adjustment),
    }));

    setResult({ lmp, dueDate, currentWeeks, currentDays, daysPassed, daysRemaining, trimester,
      t1Start, t1End, t2Start, t2End, t3Start, milestones });
  }

  const progressPct = result
    ? Math.min(100, Math.max(0, (result.daysPassed / (280 + (Number(cycle) - 28))) * 100))
    : 0;

  return (
    <CalcShell
      path="/calculator/pregnancy"
      title="임신 예정일 계산기"
      description="네겔레 법칙 기반 출산예정일 · 임신주수 · 검사 일정 안내"
      intro={
        <>
          <h2>마지막 생리 시작일부터 셉니다</h2>
          <p>
            임신 주수는 수정된 날이 아니라 <strong>마지막 생리 시작일(LMP)</strong>이 기준입니다.
            수정은 보통 배란 무렵에 일어나므로, 임신 4주라고 해도 실제 수정된 지는 2주쯤 됐다는
            뜻입니다. 병원에서 말하는 주수가 생각보다 앞서 있는 이유입니다.
          </p>
          <h2>출산예정일은 LMP + 280일</h2>
          <p>
            <strong>네겔레 법칙</strong>이라고 하며 40주를 기준으로 잡습니다. 이 계산기는 생리주기가
            28일이 아닌 경우 그 차이만큼 보정합니다. 주기가 길면 배란도 늦어 예정일이 뒤로 밀리기
            때문입니다.
          </p>
          <h2>예정일에 낳는 경우는 드뭅니다</h2>
          <p>
            예정일은 <strong>확정된 날짜가 아니라 중앙값</strong>에 가깝습니다. 실제로 그날 출산하는
            비율은 낮고, 대부분 그 앞뒤 몇 주 안에 태어납니다. 초음파로 잰 아기 크기에 따라 병원에서
            예정일을 조정하기도 하는데, <strong>초음파 기준이 더 정확</strong>하다고 봅니다.
          </p>
          <h2>참고용입니다</h2>
          <p>
            주기가 불규칙하거나 마지막 생리일이 확실하지 않으면 이 계산이 맞지 않습니다.
            정확한 주수와 예정일은 산부인과 진료에서 확인하세요. 이 계산기는 의학적 조언이 아닙니다.
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">정보 입력</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>마지막 생리 시작일</Label>
              <input
                type="date"
                value={lmpDate}
                onChange={e => setLmpDate(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label>생리 주기 (일, 기본 28일)</Label>
              <input
                type="number"
                value={cycle}
                onChange={e => setCycle(e.target.value)}
                min={21}
                max={45}
                placeholder="28"
                className={inputCls}
              />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">21~45일 사이로 입력하세요</p>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>계산하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <>
            {/* 핵심 결과 */}
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-rose-400 mb-1">출산 예정일</p>
                  <p className="text-3xl font-black text-rose-700 dark:text-rose-300">{formatDateShort(result.dueDate)}</p>
                  <p className="text-xs text-rose-400 mt-1">{formatDate(result.dueDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-rose-400 mb-1">현재 임신 주수</p>
                  <p className="text-2xl font-black text-rose-700 dark:text-rose-300">{weekLabel(result.currentWeeks, result.currentDays)}</p>
                  <p className="text-xs text-rose-400 mt-1">
                    {result.daysRemaining > 0 ? `D-${result.daysRemaining}` : '출산 예정일 경과'}
                  </p>
                </div>
              </div>

              {/* 진행 바 */}
              <div>
                <div className="h-3 bg-rose-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-rose-400 mt-1">
                  <span>임신 시작</span>
                  <span>{progressPct.toFixed(0)}% 경과</span>
                  <span>출산 예정일</span>
                </div>
              </div>
            </div>

            {/* 분기 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">분기별 일정</p>
              {[
                { n: 1, label: '1분기 (1~12주)', start: result.t1Start, end: result.t1End,
                  desc: '태아 기관 형성기', color: result.trimester === 1 ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50' : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800' },
                { n: 2, label: '2분기 (13~27주)', start: result.t2Start, end: result.t2End,
                  desc: '태동 시작, 안정기', color: result.trimester === 2 ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50' : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800' },
                { n: 3, label: '3분기 (28주~)', start: result.t3Start, end: result.dueDate,
                  desc: '출산 준비', color: result.trimester === 3 ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50' : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800' },
              ].map(t => (
                <div key={t.n} className={`rounded-xl border px-4 py-3 mb-2 ${t.color}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t.label}</span>
                    {result.trimester === t.n && (
                      <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full font-semibold">현재</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {formatDateShort(t.start)} ~ {formatDateShort(t.end)}
                  </p>
                </div>
              ))}
            </Card>

            {/* 중요 검사 일정 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">중요 검사 및 시기</p>
              <div className="flex flex-col divide-y divide-slate-100">
                {result.milestones.map(m => {
                  const isPast = m.date < new Date();
                  const isCurrent = result.currentWeeks >= m.week && result.currentWeeks < m.week + 2;
                  return (
                    <div key={m.week} className={`flex items-start gap-3 py-3 ${isPast ? 'opacity-50' : ''}`}>
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        isCurrent ? 'bg-rose-500 text-white' : isPast ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {m.week}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${isCurrent ? 'text-rose-600' : 'text-slate-700 dark:text-slate-200'}`}>{m.label}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{formatDateShort(m.date)} 전후</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <p className="text-xs text-slate-400 dark:text-slate-500 text-center px-4">
              * 이 계산기는 참고용입니다. 정확한 예정일은 산부인과 초음파 검사로 확인하세요.
            </p>
          </>
        )}
      </div>
    </CalcShell>
  );
}
