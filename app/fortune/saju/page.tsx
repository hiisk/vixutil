'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  STEMS, BRANCHES, ELEMENT_INFO, type Pillar,
  getYearPillar, getMonthPillar, getDayPillar, getHourPillar,
  countElements, pillarHanja,
} from '@/lib/saju-data';
import FortuneDisplay from '@/components/FortuneDisplay';

/* ── 사주 기둥 카드 ── */
function PillarCard({ label, pillar, isDay }: { label: string; pillar: Pillar | null; isDay?: boolean }) {
  if (!pillar) {
    return (
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-slate-400 text-center mb-1">{label}</p>
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-3 flex flex-col items-center gap-1.5 h-28 justify-center">
          <p className="text-xs text-slate-300">모름</p>
        </div>
      </div>
    );
  }
  const stem   = STEMS[pillar.stemIdx];
  const branch = BRANCHES[pillar.branchIdx];
  const stemEl   = ELEMENT_INFO[stem.element];
  const branchEl = ELEMENT_INFO[branch.element];

  return (
    <div className="flex-1 min-w-0">
      <p className={`text-[10px] font-black text-center mb-1 ${isDay ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</p>
      <div className={`rounded-xl border-2 p-2 flex flex-col items-center gap-1.5 ${isDay ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white'}`}>
        {/* 천간 */}
        <div className="w-full rounded-lg p-2 flex flex-col items-center"
          style={{ background: stemEl.bg, borderColor: stemEl.border }}>
          <span className="text-lg font-black leading-none" style={{ color: stemEl.color }}>{stem.hanja}</span>
          <span className="text-[10px] font-bold mt-0.5" style={{ color: stemEl.color }}>{stem.kor} ({stem.element})</span>
        </div>
        {/* 지지 */}
        <div className="w-full rounded-lg p-2 flex flex-col items-center"
          style={{ background: branchEl.bg, borderColor: branchEl.border }}>
          <span className="text-lg font-black leading-none" style={{ color: branchEl.color }}>{branch.hanja}</span>
          <span className="text-[10px] font-bold" style={{ color: branchEl.color }}>{branch.kor} ({branch.element})</span>
          <span className="text-base leading-none mt-0.5">{branch.emoji}</span>
        </div>
      </div>
      <p className="text-[9px] text-center text-slate-400 mt-1 font-bold">{pillarHanja(pillar)}</p>
    </div>
  );
}

/* ── 오행 바 ── */
function ElementBar({ counts, total }: { counts: Record<string, number>; total: number }) {
  const elements = ['목', '화', '토', '금', '수'] as const;
  return (
    <div className="space-y-2">
      {elements.map(el => {
        const info = ELEMENT_INFO[el];
        const count = counts[el] ?? 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={el} className="flex items-center gap-2">
            <div className="w-14 text-right">
              <span className="text-xs font-bold" style={{ color: info.color }}>{info.emoji} {el}(木/火/土/金/水의 해당字)</span>
            </div>
            <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: info.color }} />
            </div>
            <span className="text-xs font-black w-4 text-center" style={{ color: info.color }}>{count}</span>
          </div>
        );
      })}
    </div>
  );
}

// 오행 라벨 간결화
function ElementBadge({ el, count }: { el: string; count: number }) {
  const info = ELEMENT_INFO[el as keyof typeof ELEMENT_INFO];
  if (!info) return null;
  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border text-xs font-bold"
      style={{ background: info.bg, borderColor: info.border, color: info.color }}>
      <span>{info.emoji}</span>
      <span>{info.label}</span>
      <span className="bg-white/60 px-1 rounded-md">{count}개</span>
    </div>
  );
}

/* ── 메인 ── */
interface FormState { year: string; month: string; day: string; hour: string }
interface Result {
  year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null;
  inputYear: number; inputMonth: number; inputDay: number;
}

export default function SajuPage() {
  const [form, setForm] = useState<FormState>({ year: '', month: '', day: '', hour: '' });
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError]   = useState('');

  function handleCalc() {
    const y = parseInt(form.year);
    const m = parseInt(form.month);
    const d = parseInt(form.day);
    if (!y || !m || !d || y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) {
      setError('올바른 생년월일을 입력해 주세요.');
      return;
    }
    setError('');

    const yearP  = getYearPillar(y, m, d);
    const monthP = getMonthPillar(m, d, yearP.stemIdx);
    const dayP   = getDayPillar(new Date(y, m - 1, d));
    const hourP  = form.hour !== '' ? getHourPillar(parseInt(form.hour), dayP.stemIdx) : null;

    setResult({ year: yearP, month: monthP, day: dayP, hour: hourP, inputYear: y, inputMonth: m, inputDay: d });
    setTimeout(() => document.getElementById('saju-result')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  const pillars = result ? [result.year, result.month, result.day, result.hour] : [];
  const counts: Record<string, number> = result ? countElements(pillars) : {};
  const total   = Object.values(counts).reduce((a, b) => a + b, 0);
  const dayStem = result ? STEMS[result.day.stemIdx] : null;

  const sajuSubjectId = result
    ? `saju-${result.inputYear}-${result.inputMonth}-${result.inputDay}`
    : '';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1 text-sm text-slate-400 hover:text-indigo-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 flex-1">사주 분석</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6 pb-16 space-y-5">

        {/* 입력 폼 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2">🔯</div>
            <h1 className="text-lg font-black text-slate-900">사주 분석</h1>
            <p className="text-xs text-slate-400 mt-1">생년월일을 입력하면 사주 4주를 분석해 드립니다</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">출생년도</label>
              <input
                type="number" placeholder="예) 1995"
                value={form.year}
                onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">출생월</label>
              <select
                value={form.month}
                onChange={e => setForm(f => ({ ...f, month: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 bg-white"
              >
                <option value="">월</option>
                {Array.from({length:12},(_,i)=>(
                  <option key={i+1} value={i+1}>{i+1}월</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">출생일</label>
              <input
                type="number" placeholder="일" min={1} max={31}
                value={form.day}
                onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">태어난 시간 (선택)</label>
            <select
              value={form.hour}
              onChange={e => setForm(f => ({ ...f, hour: e.target.value }))}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 bg-white"
            >
              <option value="">모름 / 생략</option>
              <option value="23">자시 (子時, 23:00–01:00)</option>
              <option value="1">축시 (丑時, 01:00–03:00)</option>
              <option value="3">인시 (寅時, 03:00–05:00)</option>
              <option value="5">묘시 (卯時, 05:00–07:00)</option>
              <option value="7">진시 (辰時, 07:00–09:00)</option>
              <option value="9">사시 (巳時, 09:00–11:00)</option>
              <option value="11">오시 (午時, 11:00–13:00)</option>
              <option value="13">미시 (未時, 13:00–15:00)</option>
              <option value="15">신시 (申時, 15:00–17:00)</option>
              <option value="17">유시 (酉時, 17:00–19:00)</option>
              <option value="19">술시 (戌時, 19:00–21:00)</option>
              <option value="21">해시 (亥時, 21:00–23:00)</option>
            </select>
          </div>

          {error && <p className="text-xs text-rose-500 font-semibold text-center">{error}</p>}

          <button
            onClick={handleCalc}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-black rounded-xl shadow active:scale-[0.98] transition-transform text-sm"
          >
            🔯 사주 분석하기
          </button>
        </div>

        {/* 결과 */}
        {result && (
          <div id="saju-result" className="space-y-4">

            {/* 4주 표 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 text-center">사주 사주(四柱)</p>
              <div className="flex gap-2">
                <PillarCard label="년주(年柱)" pillar={result.year} />
                <PillarCard label="월주(月柱)" pillar={result.month} />
                <PillarCard label="일주(日柱)" pillar={result.day} isDay />
                <PillarCard label="시주(時柱)" pillar={result.hour} />
              </div>
              <p className="text-[10px] text-slate-300 text-center mt-3">
                일주는 계산 방식에 따라 ±1일 차이가 날 수 있습니다
              </p>
            </div>

            {/* 오행 분석 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">오행 균형</p>
              <div className="flex flex-wrap gap-1.5">
                {(['목','화','토','금','수'] as const).map(el => (
                  <ElementBadge key={el} el={el} count={counts[el] ?? 0} />
                ))}
              </div>
              <ElementBar counts={counts} total={total} />
              <p className="text-[10px] text-slate-400">천간+지지 {total}글자 기준. 많은 오행은 강점, 없는 오행은 보완이 필요한 에너지입니다.</p>
            </div>

            {/* 일간 성격 분석 */}
            {dayStem && (
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <div className="p-4 text-white" style={{ background: `linear-gradient(135deg, ${dayStem.color}dd, ${dayStem.color})` }}>
                  <p className="text-xs font-black opacity-80 mb-2">일간(日干) 성격 분석</p>
                  <div className="flex items-center gap-3">
                    <div className="text-5xl">{dayStem.emoji}</div>
                    <div>
                      <p className="text-2xl font-black">{dayStem.hanja}({dayStem.kor})</p>
                      <p className="text-sm opacity-80">{dayStem.nature} · {dayStem.element}({dayStem.yinyang})</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <p className="text-sm text-slate-700 leading-relaxed">{dayStem.personality}</p>
                </div>
              </div>
            )}

            {/* 오늘의 운세 */}
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">오늘의 운세</p>
              <FortuneDisplay
                subjectId={sajuSubjectId}
                subjectName={`${result.inputYear}년생 사주`}
                subjectEmoji={dayStem?.emoji ?? '🔯'}
                badge={dayStem ? `${dayStem.hanja}일간` : undefined}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
