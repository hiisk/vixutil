'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';

// WHO/대한고혈압학회 2023 기준
interface BpLevel {
  label: string;
  desc: string;
  detail: string;
  color: string;
  bg: string;
  border: string;
  bar: string;
  systolicMin: number;
  systolicMax: number;
  diastolicMin: number;
  diastolicMax: number;
}

const LEVELS: BpLevel[] = [
  {
    label: '저혈압',
    desc: '혈압이 낮습니다',
    detail: '어지럼증, 실신 위험이 있을 수 있습니다. 수분 섭취를 늘리고 이상 증상이 지속되면 의사 상담을 권장합니다.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-900/50',
    bar: 'bg-blue-500',
    systolicMin: 0, systolicMax: 90,
    diastolicMin: 0, diastolicMax: 60,
  },
  {
    label: '정상',
    desc: '정상 혈압입니다',
    detail: '현재 혈압이 정상 범위입니다. 건강한 생활습관을 유지하세요.',
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-900/50',
    bar: 'bg-emerald-500',
    systolicMin: 90, systolicMax: 120,
    diastolicMin: 60, diastolicMax: 80,
  },
  {
    label: '주의혈압',
    desc: '주의가 필요합니다',
    detail: '정상보다 약간 높습니다. 식이요법(저염식)과 규칙적인 운동으로 관리하세요.',
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900/50',
    bar: 'bg-amber-500',
    systolicMin: 120, systolicMax: 130,
    diastolicMin: 60, diastolicMax: 80,
  },
  {
    label: '1기 고혈압',
    desc: '1기 고혈압',
    detail: '생활습관 교정과 함께 의사 진료를 권장합니다. 약물치료가 필요할 수 있습니다.',
    color: 'text-orange-700 dark:text-orange-300',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-900/50',
    bar: 'bg-orange-500',
    systolicMin: 130, systolicMax: 140,
    diastolicMin: 80, diastolicMax: 90,
  },
  {
    label: '2기 고혈압',
    desc: '2기 고혈압',
    detail: '즉시 의사 진료가 필요합니다. 생활습관 교정과 약물치료를 병행해야 합니다.',
    color: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-900/50',
    bar: 'bg-red-500',
    systolicMin: 140, systolicMax: 180,
    diastolicMin: 90, diastolicMax: 120,
  },
  {
    label: '3기 고혈압 (위기)',
    desc: '즉각 치료 필요',
    detail: '혈압이 매우 위험한 수준입니다. 즉시 응급실 방문 또는 119에 연락하세요.',
    color: 'text-red-800 dark:text-red-300',
    bg: 'bg-red-100 dark:bg-red-950/40',
    border: 'border-red-400',
    bar: 'bg-red-800',
    systolicMin: 180, systolicMax: Infinity,
    diastolicMin: 120, diastolicMax: Infinity,
  },
];

// 수축기·이완기 각각 판정 후 더 높은 등급 반환
function classify(systolic: number, diastolic: number): BpLevel {
  if (systolic < 90 || diastolic < 60) return LEVELS[0]; // 저혈압
  if (systolic >= 180 || diastolic >= 120) return LEVELS[5]; // 3기
  if (systolic >= 140 || diastolic >= 90) return LEVELS[4]; // 2기
  if (systolic >= 130 || diastolic >= 80) return LEVELS[3]; // 1기
  if (systolic >= 120) return LEVELS[2]; // 주의
  return LEVELS[1]; // 정상
}

const TABLE_ROWS = [
  { label: '저혈압', sys: '< 90', dia: '< 60' },
  { label: '정상', sys: '90 ~ 119', dia: '60 ~ 79' },
  { label: '주의혈압', sys: '120 ~ 129', dia: '60 ~ 79' },
  { label: '1기 고혈압', sys: '130 ~ 139', dia: '80 ~ 89' },
  { label: '2기 고혈압', sys: '140 ~ 179', dia: '90 ~ 119' },
  { label: '3기 고혈압 (위기)', sys: '≥ 180', dia: '≥ 120' },
];

export default function BloodPressurePage() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [result, setResult] = useState<{ level: BpLevel; systolic: number; diastolic: number } | null>(null);

  function calculate() {
    const s = Number(systolic);
    const d = Number(diastolic);
    if (!s || !d || s < 40 || s > 300 || d < 20 || d > 200) return;
    setResult({ level: classify(s, d), systolic: s, diastolic: d });
  }

  // 수축기 게이지: 60~200 범위
  const sysPct = result ? Math.min(100, Math.max(0, (result.systolic - 60) / (200 - 60) * 100)) : 0;
  const diaPct = result ? Math.min(100, Math.max(0, (result.diastolic - 40) / (130 - 40) * 100)) : 0;

  return (
    <CalcShell path="/calculator/blood-pressure" title="혈압 체크기" description="WHO 기준으로 수축기·이완기 혈압 등급을 판정합니다">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">혈압 입력</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>수축기 혈압 (최고, mmHg)</Label>
              <input type="number" value={systolic} onChange={e => setSystolic(e.target.value)}
                placeholder="예: 120" className={inputCls} />
            </div>
            <div>
              <Label>이완기 혈압 (최저, mmHg)</Label>
              <input type="number" value={diastolic} onChange={e => setDiastolic(e.target.value)}
                placeholder="예: 80" className={inputCls} />
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">* 수축기 ÷ 이완기 순서로 입력 (예: 120/80)</p>
          <div className="mt-4"><PrimaryBtn onClick={calculate}>판정하기</PrimaryBtn></div>
        </Card>

        {result && (
          <>
            {/* 결과 카드 */}
            <div className={`rounded-2xl border p-5 ${result.level.bg} ${result.level.border}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">혈압 판정</p>
                  <p className={`text-4xl font-black ${result.level.color}`}>
                    {result.systolic} / {result.diastolic}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">mmHg (수축기 / 이완기)</p>
                </div>
                <span className={`text-sm font-black px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border ${result.level.color} ${result.level.border}`}>
                  {result.level.label}
                </span>
              </div>

              {/* 수축기 게이지 */}
              <div className="mb-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">수축기 ({result.systolic} mmHg)</p>
                <div className="relative h-2.5 rounded-full overflow-hidden flex">
                  {[{w:21.4,c:'bg-blue-300'},{w:21.4,c:'bg-emerald-300'},{w:7.1,c:'bg-amber-300'},{w:7.1,c:'bg-orange-300'},{w:28.6,c:'bg-red-400'},{w:14.4,c:'bg-red-700'}].map((s,i)=>(
                    <div key={i} className={`h-full ${s.c}`} style={{width:`${s.w}%`}} />
                  ))}
                  <div className="absolute top-0 w-3 h-3 bg-slate-800 rounded-full border-2 border-white shadow -translate-y-0.5 -translate-x-1.5"
                    style={{left:`${sysPct}%`}} />
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                  {['60','90','120','130','140','180','200'].map(v=><span key={v}>{v}</span>)}
                </div>
              </div>

              {/* 이완기 게이지 */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">이완기 ({result.diastolic} mmHg)</p>
                <div className="relative h-2.5 rounded-full overflow-hidden flex">
                  {[{w:22.2,c:'bg-blue-300'},{w:22.2,c:'bg-emerald-300'},{w:11.1,c:'bg-orange-300'},{w:33.3,c:'bg-red-400'},{w:11.2,c:'bg-red-700'}].map((s,i)=>(
                    <div key={i} className={`h-full ${s.c}`} style={{width:`${s.w}%`}} />
                  ))}
                  <div className="absolute top-0 w-3 h-3 bg-slate-800 rounded-full border-2 border-white shadow -translate-y-0.5 -translate-x-1.5"
                    style={{left:`${diaPct}%`}} />
                </div>
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                  {['40','60','80','90','120','130'].map(v=><span key={v}>{v}</span>)}
                </div>
              </div>

              <div className={`text-sm font-medium ${result.level.color} bg-white dark:bg-slate-900 rounded-xl p-3 border ${result.level.border}`}>
                {result.level.detail}
              </div>
            </div>

            {/* 기준표 */}
            <Card className="p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">혈압 기준표 (WHO · 대한고혈압학회 2023)</p>
              <div className="flex flex-col gap-1.5">
                {TABLE_ROWS.map((row, i) => {
                  const active = result.level.label === row.label;
                  return (
                    <div key={i} className={`flex justify-between items-center text-xs px-3.5 py-2.5 rounded-xl border ${
                      active ? `${LEVELS[i].bg} ${LEVELS[i].border} font-bold` : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${LEVELS[i].bar}`} />
                        <span className={active ? LEVELS[i].color : ''}>{row.label}</span>
                      </div>
                      <div className={`text-right ${active ? LEVELS[i].color : ''}`}>
                        수축기 {row.sys} / 이완기 {row.dia}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">* 수축기와 이완기 중 한쪽이라도 해당되면 높은 등급 적용</p>
            </Card>
          </>
        )}
      </div>
    </CalcShell>
  );
}
