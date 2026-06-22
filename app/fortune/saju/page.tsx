'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  STEMS, BRANCHES, ELEMENT_INFO, ELEMENT_SHORTAGE, ILJU_READINGS,
  SIPSEONG_INFO, JIJANGGAN,
  type Element, type Pillar, type DaewoonEntry,
  getSipseong, getSingang, getDaewoonDirection, getDaewoonStartAge, getDaewoons,
  getYearPillar, getMonthPillar, getDayPillar, getHourPillar,
  countElements, pillarLabel, pillarHanja,
} from '@/lib/saju-data';
import FortuneDisplay from '@/components/FortuneDisplay';

/* ── util ── */
const pad = (n: number) => String(n).padStart(2,'0');

/* ── 기둥 카드 ── */
function PillarCard({ label, pillar, isDay, ilganIdx }: {
  label: string; pillar: Pillar | null; isDay?: boolean; ilganIdx?: number;
}) {
  if (!pillar) return (
    <div className="flex-1 min-w-0 flex flex-col gap-1">
      <p className="text-[10px] font-black text-slate-400 text-center tracking-wider">{label}</p>
      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 min-h-[140px] flex flex-col items-center justify-center">
        <p className="text-xs text-slate-300 font-bold">생략</p>
      </div>
    </div>
  );
  const stem   = STEMS[pillar.stemIdx];
  const branch = BRANCHES[pillar.branchIdx];
  const stemEl   = ELEMENT_INFO[stem.element];
  const branchEl = ELEMENT_INFO[branch.element];
  const sipseong = ilganIdx !== undefined && !isDay ? getSipseong(ilganIdx, pillar.stemIdx) : null;
  const ssInfo   = sipseong ? SIPSEONG_INFO[sipseong] : null;

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-1">
      <p className={`text-[10px] font-black text-center tracking-wider ${isDay ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</p>
      <div className={`rounded-xl border-2 overflow-hidden flex flex-col ${isDay ? 'border-indigo-300 shadow-md shadow-indigo-100' : 'border-slate-200'}`}>
        {/* 천간 */}
        <div className="p-2 flex flex-col items-center border-b border-white/50" style={{ background: stemEl.bg }}>
          <span className="text-2xl font-black leading-none" style={{ color: stemEl.color }}>{stem.hanja}</span>
          <span className="text-[9px] font-bold mt-0.5" style={{ color: stemEl.color }}>{stem.kor}({stem.element}·{stem.yinyang})</span>
          {ssInfo && (
            <span className="mt-1 text-[8px] font-black px-1.5 py-0.5 rounded-full" style={{ background: stemEl.color + '22', color: stemEl.color }}>
              {ssInfo.emoji} {sipseong}
            </span>
          )}
        </div>
        {/* 지지 */}
        <div className="p-2 flex flex-col items-center" style={{ background: branchEl.bg }}>
          <span className="text-sm leading-none">{branch.emoji}</span>
          <span className="text-2xl font-black leading-none mt-0.5" style={{ color: branchEl.color }}>{branch.hanja}</span>
          <span className="text-[9px] font-bold" style={{ color: branchEl.color }}>{branch.kor}({branch.element})</span>
        </div>
      </div>
      <p className="text-[9px] text-center text-slate-300 font-bold">{pillarHanja(pillar)}</p>
    </div>
  );
}

/* ── 섹션 헤더 ── */
function SectionHeader({ emoji, title, sub }: { emoji: string; title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-2 mb-3">
      <span className="text-lg leading-none">{emoji}</span>
      <div>
        <p className="text-sm font-black text-slate-800">{title}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ── 오행 바 ── */
function ElementBar({ counts, total }: { counts: Record<string,number>; total: number }) {
  return (
    <div className="space-y-2.5">
      {(['목','화','토','금','수'] as const).map(el => {
        const info  = ELEMENT_INFO[el];
        const count = counts[el]??0;
        const pct   = total>0 ? (count/total)*100 : 0;
        return (
          <div key={el}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold" style={{ color:info.color }}>{info.emoji} {info.label}</span>
              <span className="text-xs font-black" style={{ color:count===0?'#94a3b8':info.color }}>
                {count}개{count===0?' ⚠️':''}
              </span>
            </div>
            <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width:`${pct}%`, background:info.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── 대운 카드 ── */
function DaewoonCard({ entry, currentAge, isCurrent }: { entry: DaewoonEntry; currentAge: number; isCurrent: boolean }) {
  const stem   = STEMS[entry.pillar.stemIdx];
  const branch = BRANCHES[entry.pillar.branchIdx];
  const stemEl   = ELEMENT_INFO[stem.element];
  const branchEl = ELEMENT_INFO[branch.element];
  return (
    <div className={`flex-shrink-0 w-[72px] rounded-xl border-2 overflow-hidden text-center transition-all
      ${isCurrent ? 'border-indigo-400 shadow-lg shadow-indigo-100 scale-105' : 'border-slate-200'}`}>
      {isCurrent && (
        <div className="bg-indigo-500 text-white text-[8px] font-black py-0.5">현재</div>
      )}
      <div className="p-1.5 border-b border-white/50" style={{ background: stemEl.bg }}>
        <p className="text-xs font-black" style={{ color:stemEl.color }}>{stem.hanja}</p>
        <p className="text-[8px] font-bold" style={{ color:stemEl.color }}>{stem.kor}({stem.element})</p>
      </div>
      <div className="p-1.5" style={{ background: branchEl.bg }}>
        <p className="text-sm">{branch.emoji}</p>
        <p className="text-xs font-black" style={{ color:branchEl.color }}>{branch.hanja}</p>
        <p className="text-[8px] font-bold" style={{ color:branchEl.color }}>{branch.kor}</p>
      </div>
      <div className={`py-1 text-[8px] font-black ${isCurrent?'bg-indigo-50 text-indigo-600':'bg-slate-50 text-slate-400'}`}>
        {entry.startAge}~{entry.endAge}세
      </div>
    </div>
  );
}

/* ── 메인 ── */
type Gender = 'male' | 'female';
interface FormState { year:string; month:string; day:string; hour:string; gender:Gender }
interface SajuResult {
  year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null;
  inputYear:number; inputMonth:number; inputDay:number;
  gender: Gender;
}

export default function SajuPage() {
  const [form, setForm]     = useState<FormState>({ year:'', month:'', day:'', hour:'', gender:'male' });
  const [result, setResult] = useState<SajuResult|null>(null);
  const [error, setError]   = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'analysis'|'daewoon'>('analysis');

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const y=p.get('y')??'', m=p.get('m')??'', d=p.get('d')??'', h=p.get('h')??'', g=(p.get('g')??'male') as Gender;
    if (y&&m&&d) { setForm({ year:y,month:m,day:d,hour:h,gender:g }); runCalc(y,m,d,h,g); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const runCalc = useCallback((y:string,m:string,d:string,h:string,g:Gender) => {
    const yi=parseInt(y),mi=parseInt(m),di=parseInt(d);
    if (!yi||!mi||!di||yi<1900||yi>2100||mi<1||mi>12||di<1||di>31) {
      setError('올바른 생년월일을 입력해 주세요.'); return;
    }
    setError('');
    const yearP  = getYearPillar(yi,mi,di);
    const monthP = getMonthPillar(mi,di,yearP.stemIdx);
    const dayP   = getDayPillar(yi, mi, di);
    const hourP  = h ? getHourPillar(parseInt(h),dayP.stemIdx) : null;
    setResult({ year:yearP, month:monthP, day:dayP, hour:hourP, inputYear:yi, inputMonth:mi, inputDay:di, gender:g });
    window.history.replaceState({},''  ,`?${new URLSearchParams({y,m,d,...(h?{h}:{}),g})}`);
    setTimeout(()=>document.getElementById('saju-result')?.scrollIntoView({behavior:'smooth'}),100);
  },[]);

  function handleCalc() { runCalc(form.year,form.month,form.day,form.hour,form.gender); }

  /* 파생 데이터 */
  const pillars  = result ? [result.year,result.month,result.day,result.hour] : [];
  const counts: Record<string,number> = result ? countElements(pillars) : {};
  const total    = Object.values(counts).reduce((a,b)=>a+b,0);
  const dayStem  = result ? STEMS[result.day.stemIdx] : null;
  const iljuKey  = result ? pillarLabel(result.day) : '';
  const iljuDesc = ILJU_READINGS[iljuKey] ?? dayStem?.personality ?? '';
  const singang  = result ? getSingang(result.day.stemIdx, pillars) : null;
  const subjectId = result ? `saju-${result.inputYear}-${result.inputMonth}-${result.inputDay}` : '';
  const dominantEl = (Object.entries(counts) as [Element,number][]).sort((a,b)=>b[1]-a[1])[0]?.[0];
  const missingEls = (Object.entries(counts) as [Element,number][]).filter(([,c])=>c===0).map(([e])=>e);

  /* 대운 */
  const direction   = result ? getDaewoonDirection(result.gender, result.year.stemIdx) : 'forward';
  const startAge    = result ? getDaewoonStartAge(result.inputYear, result.inputMonth, result.inputDay, direction) : 0;
  const daewoons    = result ? getDaewoons(result.month, direction, startAge) : [];
  const currentAge  = result ? (new Date().getFullYear() - result.inputYear) : 0;
  const currentDaewoon = daewoons.find(d=>currentAge>=d.startAge&&currentAge<=d.endAge);

  /* 십성 */
  const otherPillars = result
    ? [
        { label:'년주 천간', pillar:result.year,   role:'조상·선천 기질' },
        { label:'월주 천간', pillar:result.month,  role:'부모·직업 환경' },
        { label:'시주 천간', pillar:result.hour,   role:'자녀·노년·결실' },
      ]
    : [];

  /* 공유 */
  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(()=>{
      setCopied(true); setTimeout(()=>setCopied(false),2000);
    });
  }
  async function handleShare() {
    if (!result||!dayStem) return;
    const text=`나의 사주 일주: ${pillarHanja(result.day)} (${pillarLabel(result.day)} 일주)\n${result.inputYear}년 ${result.inputMonth}월 ${result.inputDay}일생 · ${dayStem.element}(${dayStem.yinyang}) 일간\nvixutil.com에서 무료 사주 분석 →`;
    if (navigator.share) await navigator.share({title:'사주 분석 결과',text,url:window.location.href});
    else handleCopyLink();
  }

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
          {result && (
            <button onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full active:scale-95 transition-transform">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186z" />
              </svg>
              공유
            </button>
          )}
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-6 pb-16 space-y-4">

        {/* 입력 폼 */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-5 py-6 text-center text-white">
            <div className="text-4xl mb-2">🔯</div>
            <h1 className="text-xl font-black">사주 분석</h1>
            <p className="text-xs opacity-70 mt-1">생년월일과 성별로 사주 사주(四柱)를 분석합니다</p>
          </div>
          <div className="p-5 space-y-4">
            {/* 성별 */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-2">성별 * (대운 방향에 영향)</label>
              <div className="grid grid-cols-2 gap-2">
                {(['male','female'] as const).map(g => (
                  <button key={g} onClick={()=>setForm(f=>({...f,gender:g}))}
                    className={`py-3 rounded-xl text-sm font-black border-2 transition-all ${
                      form.gender===g
                        ? g==='male' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-pink-50 border-pink-400 text-pink-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                    {g==='male' ? '♂ 남성' : '♀ 여성'}
                  </button>
                ))}
              </div>
            </div>

            {/* 생년월일 */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">출생년도 *</label>
                <input type="number" placeholder="예) 1995" value={form.year}
                  onChange={e=>setForm(f=>({...f,year:e.target.value}))}
                  onKeyDown={e=>e.key==='Enter'&&handleCalc()}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">출생월 *</label>
                <select value={form.month} onChange={e=>setForm(f=>({...f,month:e.target.value}))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 bg-white">
                  <option value="">월</option>
                  {Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>{i+1}월</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">출생일 *</label>
                <input type="number" placeholder="일" min={1} max={31} value={form.day}
                  onChange={e=>setForm(f=>({...f,day:e.target.value}))}
                  onKeyDown={e=>e.key==='Enter'&&handleCalc()}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
            </div>

            {/* 시간 */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">태어난 시간 (선택 — 시주 계산에 필요)</label>
              <select value={form.hour} onChange={e=>setForm(f=>({...f,hour:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 bg-white">
                <option value="">모름 / 시주 생략</option>
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

            <button onClick={handleCalc}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-black rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-transform text-sm">
              🔯 사주 분석하기
            </button>
          </div>
        </div>

        {/* ══════════════ 결과 ══════════════ */}
        {result && (
          <div id="saju-result" className="space-y-4">

            {/* 탭 */}
            <div className="flex gap-2">
              {(['analysis','daewoon'] as const).map(tab => (
                <button key={tab} onClick={()=>setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black border-2 transition-all ${
                    activeTab===tab
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}>
                  {tab==='analysis' ? '🔍 사주 분석' : '⏳ 대운 (大運)'}
                </button>
              ))}
            </div>

            {/* ─── 분석 탭 ─── */}
            {activeTab==='analysis' && (
              <div className="space-y-4">

                {/* ① 사주 사주표 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <SectionHeader emoji="🎴" title="사주 사주(四柱)" sub={`${result.inputYear}.${pad(result.inputMonth)}.${pad(result.inputDay)} · ${result.gender==='male'?'남성':'여성'}`} />
                  <div className="flex gap-1.5">
                    <PillarCard label="년주(年柱)" pillar={result.year}  ilganIdx={result.day.stemIdx} />
                    <PillarCard label="월주(月柱)" pillar={result.month} ilganIdx={result.day.stemIdx} />
                    <PillarCard label="일주(日柱)" pillar={result.day}   isDay />
                    <PillarCard label="시주(時柱)" pillar={result.hour}  ilganIdx={result.day.stemIdx} />
                  </div>
                  <p className="text-[9px] text-slate-300 text-center mt-3">각 기둥의 천간 아래 작은 뱃지가 일간 기준 십성(十星)입니다</p>
                </div>

                {/* ② 일주 해석 */}
                {dayStem && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200">
                    <div className="px-5 py-4 text-white relative overflow-hidden"
                      style={{ background:`linear-gradient(135deg,${dayStem.color}f0,${dayStem.color}88)` }}>
                      <div className="absolute -right-3 -top-3 text-7xl opacity-10 select-none">{dayStem.emoji}</div>
                      <p className="text-[10px] font-black opacity-60 mb-2 uppercase tracking-widest">일주(日柱) · 나의 핵심 에너지</p>
                      <div className="flex items-start gap-3">
                        <span className="text-5xl">{dayStem.emoji}</span>
                        <div>
                          <p className="text-4xl font-black leading-none">{pillarHanja(result.day)}</p>
                          <p className="text-sm font-bold mt-1 opacity-90">{pillarLabel(result.day)} 일주</p>
                          <p className="text-xs opacity-60">{BRANCHES[result.day.branchIdx].animal} · {dayStem.nature} · {dayStem.element}({dayStem.yinyang})</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 space-y-4">
                      <p className="text-sm text-slate-700 leading-[1.85]">{iljuDesc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label:'오행', value:`${dayStem.element}(${dayStem.yinyang})`, emoji:ELEMENT_INFO[dayStem.element].emoji },
                          { label:'상징', value:dayStem.nature, emoji:dayStem.emoji },
                          { label:'행운 색상', value:dayStem.luckyColor, emoji:'🎨' },
                          { label:'행운 방향', value:dayStem.luckyDirection, emoji:'🧭' },
                          { label:'행운 숫자', value:`${dayStem.luckyNumber}`, emoji:'🔢' },
                          { label:'적성 분야', value:dayStem.aptitude, emoji:'💼' },
                        ].map(({label,value,emoji})=>(
                          <div key={label} className="bg-slate-50 rounded-xl p-2.5">
                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">{emoji} {label}</p>
                            <p className="text-xs font-black text-slate-700">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ③ 신강신약 */}
                {singang && dayStem && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                    <SectionHeader emoji="⚖️" title="신강·신약(身强·身弱)" sub="일간 기운의 강약 판단 — 용신 결정의 기준" />
                    <div className={`rounded-xl p-4 border-2 ${singang.strong ? 'border-rose-200 bg-rose-50' : 'border-blue-200 bg-blue-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{singang.strong ? '💪' : '🌱'}</span>
                        <p className={`text-base font-black ${singang.strong ? 'text-rose-700' : 'text-blue-700'}`}>
                          {singang.label}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${singang.strong ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                          강약지수 {singang.score>0?'+':''}{singang.score}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${singang.strong ? 'text-rose-700' : 'text-blue-700'}`}>{singang.desc}</p>
                    </div>
                    <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
                      <p className="text-xs font-black text-amber-700 mb-1">🌟 용신(用神) — 내가 취해야 할 기운</p>
                      <p className="text-sm font-black text-amber-800 mb-1">{singang.yongshin}</p>
                      <p className="text-xs text-amber-700 leading-relaxed">{singang.yongshinDesc}</p>
                    </div>
                  </div>
                )}

                {/* ④ 십성 분석 */}
                {result && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                    <SectionHeader emoji="☯️" title="십성(十星) 분석" sub="일간이 다른 천간과 맺는 관계 — 성격·직업·재물·인연의 키" />
                    <div className="space-y-3">
                      {otherPillars.map(({ label, pillar, role }) => {
                        if (!pillar) return null;
                        const ss = getSipseong(result.day.stemIdx, pillar.stemIdx);
                        const info = SIPSEONG_INFO[ss];
                        const stemInfo = STEMS[pillar.stemIdx];
                        if (!info) return null;
                        return (
                          <div key={label} className="rounded-xl border border-slate-200 overflow-hidden">
                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50">
                              <span className="text-sm font-black" style={{ color: ELEMENT_INFO[stemInfo.element].color }}>{stemInfo.hanja}</span>
                              <div>
                                <span className="text-xs font-bold text-slate-600">{label}</span>
                                <span className="text-[10px] text-slate-400 ml-1">({role})</span>
                              </div>
                              <div className="ml-auto flex items-center gap-1">
                                <span className="text-sm">{info.emoji}</span>
                                <span className="text-xs font-black px-2 py-0.5 rounded-full"
                                  style={{ background: ELEMENT_INFO[stemInfo.element].bg, color: ELEMENT_INFO[stemInfo.element].color }}>
                                  {ss}
                                </span>
                                <span className="text-[10px] text-slate-400">({info.summary})</span>
                              </div>
                            </div>
                            <div className="p-3 space-y-2">
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {result.gender==='male' ? info.male : info.female}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-slate-50 rounded-lg p-2">
                                  <p className="text-[9px] font-bold text-slate-400 mb-0.5">💼 직업 영향</p>
                                  <p className="text-[10px] text-slate-600">{info.career}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-2">
                                  <p className="text-[9px] font-bold text-slate-400 mb-0.5">💰 재물 영향</p>
                                  <p className="text-[10px] text-slate-600">{info.wealth}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {result.hour === null && (
                        <p className="text-xs text-slate-400 text-center py-2">시주 입력 시 시주 천간 십성도 분석됩니다</p>
                      )}
                    </div>
                  </div>
                )}

                {/* ⑤ 오행 분석 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
                  <SectionHeader emoji="🌊" title="오행(五行) 분석" sub="천간+지지 전체의 오행 분포" />
                  {dominantEl && (
                    <div className="rounded-xl p-3 border"
                      style={{ background:ELEMENT_INFO[dominantEl].bg, borderColor:ELEMENT_INFO[dominantEl].border }}>
                      <p className="text-xs font-black mb-1" style={{ color:ELEMENT_INFO[dominantEl].color }}>
                        {ELEMENT_INFO[dominantEl].emoji} {ELEMENT_INFO[dominantEl].label} 기운이 가장 강합니다
                      </p>
                      <p className="text-[11px] leading-relaxed" style={{ color:ELEMENT_INFO[dominantEl].color+'cc' }}>
                        {ELEMENT_INFO[dominantEl].advice}
                      </p>
                    </div>
                  )}
                  <ElementBar counts={counts} total={total} />
                  {missingEls.length>0 && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 space-y-2.5">
                      <p className="text-[10px] font-black text-amber-700">부족한 오행 — 보완 방법</p>
                      {missingEls.map(el=>(
                        <div key={el} className="flex items-start gap-2">
                          <span className="text-base leading-none mt-0.5">{ELEMENT_INFO[el].emoji}</span>
                          <div>
                            <p className="text-[10px] font-black" style={{ color:ELEMENT_INFO[el].color }}>{ELEMENT_INFO[el].label} 없음</p>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{ELEMENT_SHORTAGE[el]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ⑥ 지장간 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <SectionHeader emoji="🔑" title="지장간(地藏干)" sub="지지 속에 숨겨진 천간 — 잠재된 에너지와 가능성" />
                  <div className="space-y-3">
                    {[
                      { label:'년지', branch:result.year.branchIdx },
                      { label:'월지', branch:result.month.branchIdx },
                      { label:'일지', branch:result.day.branchIdx  },
                      ...(result.hour ? [{ label:'시지', branch:result.hour.branchIdx }] : []),
                    ].map(({ label, branch }) => {
                      const b = BRANCHES[branch];
                      const jjg = JIJANGGAN[branch];
                      return (
                        <div key={label} className="flex items-start gap-3">
                          <div className="flex-shrink-0 text-center w-12">
                            <span className="text-xl">{b.emoji}</span>
                            <p className="text-[9px] font-black text-slate-400 mt-0.5">{label}</p>
                            <p className="text-xs font-black" style={{ color:ELEMENT_INFO[b.element].color }}>{b.hanja}</p>
                          </div>
                          <div className="flex-1 flex flex-wrap gap-1.5 pt-1">
                            {jjg.map(({ stemIdx, role }) => {
                              const s = STEMS[stemIdx];
                              const el = ELEMENT_INFO[s.element];
                              const ss = getSipseong(result.day.stemIdx, stemIdx);
                              const ssInfo = SIPSEONG_INFO[ss];
                              return (
                                <div key={stemIdx+role} className="flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold"
                                  style={{ background:el.bg, borderColor:el.border }}>
                                  <span style={{ color:el.color }}>{s.hanja}({s.kor})</span>
                                  <span className="text-slate-400">{role}</span>
                                  {ssInfo && <span style={{ color:el.color }}>· {ss}</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-300 mt-3">지장간 본기(本氣)가 해당 기둥의 핵심 에너지입니다</p>
                </div>

                {/* ⑦ 오늘의 운세 */}
                <div className="space-y-3">
                  <SectionHeader emoji="🌟" title="오늘의 운세" />
                  <FortuneDisplay
                    subjectId={subjectId}
                    subjectName={`${result.inputYear}년생`}
                    subjectEmoji={dayStem?.emoji??'🔯'}
                    badge={dayStem ? `${pillarHanja(result.day)} 일주` : undefined}
                  />
                </div>

                {/* ⑧ 공유 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs font-black text-slate-500 mb-3">결과 공유 · 링크 저장</p>
                  <div className="flex gap-2">
                    <button onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186z" />
                      </svg>
                      공유하기
                    </button>
                    <button onClick={handleCopyLink}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                      {copied
                        ? <><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg><span className="text-emerald-600">복사됨!</span></>
                        : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/></svg>링크 복사</>
                      }
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-300 text-center mt-2">링크 공유 시 상대방도 결과를 바로 확인할 수 있습니다</p>
                </div>
              </div>
            )}

            {/* ─── 대운 탭 ─── */}
            {activeTab==='daewoon' && (
              <div className="space-y-4">
                {/* 대운 개요 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                  <SectionHeader emoji="⏳" title="대운(大運) 분석" sub="10년 단위로 바뀌는 운의 흐름" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">대운 방향</p>
                      <p className="text-sm font-black text-slate-700">{direction==='forward'?'순행(順行)':'역행(逆行)'}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {result.gender==='male'?'남성':'여성'} · 년주 {STEMS[result.year.stemIdx].yinyang}간 →{' '}
                        {direction==='forward'?'시간순 진행':'시간 역방향 진행'}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">입운수 (대운 시작)</p>
                      <p className="text-sm font-black text-slate-700">{startAge}세부터</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">출생 후 {startAge}년째부터 첫 대운 시작</p>
                    </div>
                    {currentDaewoon && (
                      <div className="col-span-2 rounded-xl p-3 border-2 border-indigo-200 bg-indigo-50">
                        <p className="text-[10px] font-bold text-indigo-500 mb-1">현재 대운 ({currentAge}세)</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black" style={{ color:ELEMENT_INFO[STEMS[currentDaewoon.pillar.stemIdx].element].color }}>
                            {STEMS[currentDaewoon.pillar.stemIdx].hanja}{BRANCHES[currentDaewoon.pillar.branchIdx].hanja}
                          </span>
                          <div>
                            <p className="text-sm font-black text-indigo-700">
                              {pillarHanja(currentDaewoon.pillar)} 대운
                            </p>
                            <p className="text-xs text-indigo-500">
                              {currentDaewoon.startAge}세 ~ {currentDaewoon.endAge}세
                              ({currentDaewoon.endAge - currentAge + 1}년 남음)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 대운 타임라인 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs font-black text-slate-500 mb-3">대운 10개 흐름</p>
                  <div className="overflow-x-auto -mx-1 px-1 pb-2">
                    <div className="flex gap-2 w-max">
                      {daewoons.map((entry, i) => (
                        <DaewoonCard
                          key={i}
                          entry={entry}
                          currentAge={currentAge}
                          isCurrent={!!currentDaewoon && entry.startAge===currentDaewoon.startAge}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 각 대운 해석 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                  <p className="text-xs font-black text-slate-500">대운별 오행 흐름 해석</p>
                  {daewoons.map((entry, i) => {
                    const s  = STEMS[entry.pillar.stemIdx];
                    const b  = BRANCHES[entry.pillar.branchIdx];
                    const se = ELEMENT_INFO[s.element];
                    const be = ELEMENT_INFO[b.element];
                    const isCurrent = !!currentDaewoon && entry.startAge===currentDaewoon.startAge;
                    // 대운 천간과 일간의 십성 관계
                    const ss = getSipseong(result.day.stemIdx, entry.pillar.stemIdx);
                    const ssInfo = SIPSEONG_INFO[ss];
                    return (
                      <div key={i} className={`rounded-xl border overflow-hidden transition-all ${isCurrent?'border-indigo-300 shadow-md':'border-slate-200'}`}>
                        <div className={`flex items-center gap-2 px-3 py-2 ${isCurrent?'bg-indigo-50':'bg-slate-50'}`}>
                          <span className={`text-base font-black ${isCurrent?'text-indigo-600':'text-slate-600'}`}>
                            {s.hanja}{b.hanja}
                          </span>
                          <span className={`text-xs font-black ${isCurrent?'text-indigo-700':'text-slate-700'}`}>
                            {pillarHanja(entry.pillar)} 대운
                          </span>
                          <span className={`text-[10px] ${isCurrent?'text-indigo-500':'text-slate-400'}`}>
                            {entry.startAge}~{entry.endAge}세
                          </span>
                          {isCurrent && <span className="ml-auto text-[10px] font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">현재 진행중</span>}
                        </div>
                        <div className="px-3 py-2.5 space-y-1.5">
                          <div className="flex gap-2 flex-wrap text-[10px] font-bold">
                            <span className="px-2 py-0.5 rounded-full" style={{ background:se.bg, color:se.color }}>
                              {se.emoji} 천간 {s.kor}({s.element}·{s.yinyang})
                            </span>
                            <span className="px-2 py-0.5 rounded-full" style={{ background:be.bg, color:be.color }}>
                              {be.emoji} 지지 {b.kor}({b.animal})
                            </span>
                            {ssInfo && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                {ssInfo.emoji} {ss} ({ssInfo.summary})
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {s.nature}의 {s.element} 기운과 {b.animal}({b.element})의 지지 에너지가 흐르는 {entry.endAge-entry.startAge+1}년입니다.
                            {ssInfo && ` 일간 기준 ${ss}운으로, ${ssInfo.summary}의 시기입니다.`}
                            {s.element === (singang?.strong ? singang.yongshin.split('·')[0].replace(/[()]/g,'') : '') &&
                              ` 용신 오행이 강해지는 좋은 흐름입니다.`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    ※ 대운은 입운수를 기준으로 10년 단위로 바뀌며, 절기 날짜 오차로 인해 1~2년의 차이가 있을 수 있습니다.
                    실제 사주 풀이는 세운(歲運)·월운(月運)과 함께 종합적으로 해석해야 합니다.
                  </p>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
