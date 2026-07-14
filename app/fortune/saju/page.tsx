'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import {
  STEMS, BRANCHES, ELEMENT_INFO, ELEMENT_SHORTAGE, ILJU_READINGS,
  SIPSEONG_INFO, JIJANGGAN,
  type Element, type Pillar, type DaewoonEntry,
  getSipseong, getSingang, getDaewoonDirection, getDaewoonStartAge, getDaewoons,
  getYearPillar, getMonthPillar, getDayPillar, getHourPillar,
  countElements, pillarLabel, pillarHanja,
} from '@/lib/saju-data';
import FortuneDisplay from '@/components/FortuneDisplay';
import { analyzeFortune } from '@/lib/saju-fortune';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

/* ── 기둥 카드 ── */
function PillarCard({ label, pillar, isDay, ilganIdx }: {
  label: string; pillar: Pillar | null; isDay?: boolean; ilganIdx?: number;
}) {
  if (!pillar) return (
    <div className="flex-1 min-w-0 flex flex-col gap-1">
      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 text-center tracking-wider">{label}</p>
      <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 min-h-[140px] flex flex-col items-center justify-center">
        <p className="text-xs text-slate-300 dark:text-slate-600 font-bold">생략</p>
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
      <p className={`text-[10px] font-black text-center tracking-wider ${isDay ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'}`}>{label}</p>
      <div className={`rounded-xl border-2 overflow-hidden flex flex-col ${isDay ? 'border-indigo-300 shadow-md shadow-indigo-100' : 'border-slate-200 dark:border-slate-700'}`}>
        {/* 천간 */}
        <div className="p-2 flex flex-col items-center border-b border-white/50 dark:border-slate-700/50" style={{ background: stemEl.bg }}>
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
      <p className="text-[9px] text-center text-slate-300 dark:text-slate-600 font-bold">{pillarHanja(pillar)}</p>
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
            <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width:`${pct}%`, background:info.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── 색상 맵 ── */
const COLOR_MAP: Record<string, { bg: string; badge: string; dot: string; border: string; accent: string }> = {
  rose:   { bg:'bg-rose-50 dark:bg-rose-950/30',   badge:'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300',   dot:'bg-rose-400',   border:'border-rose-200 dark:border-rose-900/50',   accent:'text-rose-700 dark:text-rose-300'   },
  pink:   { bg:'bg-pink-50 dark:bg-pink-950/30',   badge:'bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300',   dot:'bg-pink-400',   border:'border-pink-200 dark:border-pink-900/50',   accent:'text-pink-700 dark:text-pink-300'   },
  blue:   { bg:'bg-blue-50 dark:bg-blue-950/30',   badge:'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300',   dot:'bg-blue-400',   border:'border-blue-200 dark:border-blue-900/50',   accent:'text-blue-700 dark:text-blue-300'   },
  amber:  { bg:'bg-amber-50 dark:bg-amber-950/30',  badge:'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300', dot:'bg-amber-400',  border:'border-amber-200 dark:border-amber-900/50',  accent:'text-amber-700 dark:text-amber-300'  },
  indigo: { bg:'bg-indigo-50 dark:bg-indigo-950/30', badge:'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300',dot:'bg-indigo-400',border:'border-indigo-200 dark:border-indigo-900/50', accent:'text-indigo-700 dark:text-indigo-300' },
  green:  { bg:'bg-green-50 dark:bg-green-950/30',  badge:'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300', dot:'bg-green-400',  border:'border-green-200 dark:border-green-900/50',  accent:'text-green-700 dark:text-green-300'  },
  teal:   { bg:'bg-teal-50 dark:bg-teal-950/30',   badge:'bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300',   dot:'bg-teal-400',   border:'border-teal-200 dark:border-teal-900/50',   accent:'text-teal-700 dark:text-teal-300'   },
  violet: { bg:'bg-violet-50 dark:bg-violet-950/30', badge:'bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300',dot:'bg-violet-400',border:'border-violet-200 dark:border-violet-900/50', accent:'text-violet-700 dark:text-violet-300' },
  purple: { bg:'bg-purple-50 dark:bg-purple-950/30', badge:'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300',dot:'bg-purple-400',border:'border-purple-200 dark:border-purple-900/50', accent:'text-purple-700 dark:text-purple-300' },
  orange: { bg:'bg-orange-50 dark:bg-orange-950/30', badge:'bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300',dot:'bg-orange-400',border:'border-orange-200 dark:border-orange-900/50', accent:'text-orange-700 dark:text-orange-300' },
};

const GRADE_BADGE: Record<string, string> = {
  '대길': 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300',
  '길':   'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
  '보통': 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
  '주의': 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300',
  '흉':   'bg-gray-200 text-gray-600',
};

/* ── 대운 카드 ── */
function DaewoonCard({ entry, isCurrent }: { entry: DaewoonEntry; isCurrent: boolean }) {
  const stem   = STEMS[entry.pillar.stemIdx];
  const branch = BRANCHES[entry.pillar.branchIdx];
  const stemEl   = ELEMENT_INFO[stem.element];
  const branchEl = ELEMENT_INFO[branch.element];
  return (
    <div className={`flex-shrink-0 w-[72px] rounded-xl border-2 overflow-hidden text-center transition-all
      ${isCurrent ? 'border-indigo-400 shadow-lg shadow-indigo-100 scale-105' : 'border-slate-200 dark:border-slate-700'}`}>
      {isCurrent && (
        <div className="bg-indigo-500 text-white text-[8px] font-black py-0.5">현재</div>
      )}
      <div className="p-1.5 border-b border-white/50 dark:border-slate-700/50" style={{ background: stemEl.bg }}>
        <p className="text-xs font-black" style={{ color:stemEl.color }}>{stem.hanja}</p>
        <p className="text-[8px] font-bold" style={{ color:stemEl.color }}>{stem.kor}({stem.element})</p>
      </div>
      <div className="p-1.5" style={{ background: branchEl.bg }}>
        <p className="text-sm">{branch.emoji}</p>
        <p className="text-xs font-black" style={{ color:branchEl.color }}>{branch.hanja}</p>
        <p className="text-[8px] font-bold" style={{ color:branchEl.color }}>{branch.kor}</p>
      </div>
      <div className={`py-1 text-[8px] font-black ${isCurrent?'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600':'bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500'}`}>
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
  const [stepIdx, setStepIdx] = useState(0);

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

  // 공유된 링크(?y=&m=&d=)로 들어온 경우 폼을 채우고 바로 계산한다.
  // runCalc은 위에서 선언돼야 한다 — 아래에 두면 여기서 TDZ로 접근하게 된다.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const y=p.get('y')??'', m=p.get('m')??'', d=p.get('d')??'', h=p.get('h')??'', g=(p.get('g')??'male') as Gender;
    // 공유 링크(?y=&m=&d=)로 들어온 경우 폼을 복원한다. URL은 프리렌더 시점에
    // 알 수 없으므로 마운트 후에 읽을 수밖에 없다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (y&&m&&d) { setForm({ year:y,month:m,day:d,hour:h,gender:g }); runCalc(y,m,d,h,g); }
  },[runCalc]);

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

  /* 세운(歲運) — 올해부터 3년간의 연간 운세 */
  const thisYear = new Date().getFullYear();
  const seunYears = result
    ? Array.from({ length: 3 }, (_, i) => {
        const y = thisYear + i;
        // 입춘(대략 2/4) 이후로 안전하게 고정한 월/일로 연주 계산
        const p = getYearPillar(y, 6, 15);
        const ss = getSipseong(result.day.stemIdx, p.stemIdx);
        return { year: y, pillar: p, sipseong: ss };
      })
    : [];

  /* 운세 도메인 분석 */
  const fortuneDomains = result && singang
    ? analyzeFortune(result.day, result.year, result.month, result.hour, result.gender, singang.strong, counts)
    : [];

  /* 스텝 목록 */
  type StepType = { key: string; emoji: string; title: string; subtitle: string; grad: string };
  const STATIC_STEPS: StepType[] = [
    { key:'pillars',  emoji:'🎴', title:'나의 사주 사주',  subtitle:'천간과 지지로 이루어진 네 기둥', grad:'from-indigo-600 to-violet-700' },
    { key:'ilju',     emoji: dayStem?.emoji??'🔯', title:'일주 심층 해석', subtitle:'나를 이루는 핵심 에너지', grad:'from-slate-700 to-slate-900' },
    { key:'singang',  emoji:'⚖️', title:'신강·신약 분석', subtitle:'일간 기운의 강약과 용신', grad:'from-rose-600 to-rose-800' },
    { key:'ohaeng',   emoji:'🌊', title:'오행 균형',       subtitle:'다섯 원소의 분포와 보완법', grad:'from-cyan-600 to-blue-700' },
    { key:'sipseong', emoji:'☯️', title:'십성(十星) 분석', subtitle:'일간과 다른 천간의 관계', grad:'from-purple-600 to-purple-800' },
  ];
  const DOMAIN_STEPS: StepType[] = fortuneDomains.map(d => ({
    key: `domain-${d.id}`, emoji: d.emoji, title: d.title,
    subtitle: `${d.grade} · ${d.score}점`,
    grad: {
      rose:'from-rose-500 to-rose-700', pink:'from-pink-500 to-pink-700',
      blue:'from-blue-500 to-blue-700', amber:'from-amber-500 to-amber-700',
      indigo:'from-indigo-500 to-indigo-700', green:'from-green-600 to-green-800',
      teal:'from-teal-500 to-teal-700', violet:'from-violet-500 to-violet-700',
      purple:'from-purple-500 to-purple-700', orange:'from-orange-500 to-orange-700',
    }[d.colorKey] ?? 'from-indigo-500 to-violet-600',
  }));
  const TAIL_STEPS: StepType[] = [
    { key:'daewoon', emoji:'⏳', title:'대운(大運) 흐름', subtitle:'10년 단위 인생의 큰 흐름', grad:'from-violet-600 to-purple-800' },
    { key:'seun', emoji:'📅', title:'세운(歲運) 연간 운세', subtitle:`${thisYear}년부터 3년간의 흐름`, grad:'from-cyan-600 to-blue-800' },
  ];
  const allSteps = [...STATIC_STEPS, ...DOMAIN_STEPS, ...TAIL_STEPS];
  const safeStep = Math.min(stepIdx, allSteps.length - 1);
  const currentStep = allSteps[safeStep];

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1 text-sm text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1">사주 분석</span>
          {result && (
            <button onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 px-3 py-1.5 rounded-full active:scale-95 transition-transform">
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
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-5 py-6 text-center text-white">
            <div className="text-4xl mb-2">🔯</div>
            <h1 className="text-xl font-black">사주 분석</h1>
            <p className="text-xs opacity-70 mt-1">생년월일과 성별로 사주 사주(四柱)를 분석합니다</p>
          </div>
          <div className="p-5 space-y-4">
            {/* 성별 */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-2">성별 * (대운 방향에 영향)</label>
              <div className="grid grid-cols-2 gap-2">
                {(['male','female'] as const).map(g => (
                  <button key={g} onClick={()=>setForm(f=>({...f,gender:g}))}
                    className={`py-3 rounded-xl text-sm font-black border-2 transition-all ${
                      form.gender===g
                        ? g==='male' ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-400 text-blue-700 dark:text-blue-300' : 'bg-pink-50 dark:bg-pink-950/30 border-pink-400 text-pink-700 dark:text-pink-300'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                    }`}>
                    {g==='male' ? '♂ 남성' : '♀ 여성'}
                  </button>
                ))}
              </div>
            </div>

            {/* 생년월일 */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-1">출생년도 *</label>
                <input type="number" placeholder="예) 1995" value={form.year}
                  onChange={e=>setForm(f=>({...f,year:e.target.value}))}
                  onKeyDown={e=>e.key==='Enter'&&handleCalc()}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-1">출생월 *</label>
                <select value={form.month} onChange={e=>setForm(f=>({...f,month:e.target.value}))}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400 bg-white dark:bg-slate-900">
                  <option value="">월</option>
                  {Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>{i+1}월</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-1">출생일 *</label>
                <input type="number" placeholder="일" min={1} max={31} value={form.day}
                  onChange={e=>setForm(f=>({...f,day:e.target.value}))}
                  onKeyDown={e=>e.key==='Enter'&&handleCalc()}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
            </div>

            {/* 시간 */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-1">태어난 시간 (선택 — 시주 계산에 필요)</label>
              <select value={form.hour} onChange={e=>setForm(f=>({...f,hour:e.target.value}))}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400 bg-white dark:bg-slate-900">
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
        {result && dayStem && (
          <div id="saju-result">

            {/* ── 스텝 목차 (미니) ── */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {safeStep + 1} <span className="text-slate-300 dark:text-slate-600">/ {allSteps.length}</span>
              </p>
              <div className="flex gap-1 overflow-hidden max-w-[200px]">
                {allSteps.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => setStepIdx(i)}
                    className={`h-1.5 rounded-full transition-all flex-shrink-0 ${
                      i === safeStep ? 'w-5 bg-indigo-500' : 'w-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── 스텝 카드 ── */}
            <div className="rounded-3xl overflow-hidden shadow-lg shadow-indigo-100/60 border border-white">

              {/* 카드 헤더 */}
              <div className={`bg-gradient-to-br ${currentStep?.grad ?? 'from-indigo-600 to-violet-700'} px-5 pt-6 pb-8 text-white relative overflow-hidden`}>
                <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none leading-none">{currentStep?.emoji}</div>
                <p className="text-[10px] font-black opacity-60 tracking-widest uppercase mb-3">
                  Step {safeStep + 1} / {allSteps.length}
                </p>
                <div className="text-5xl mb-3">{currentStep?.emoji}</div>
                <h2 className="text-2xl font-black leading-tight mb-1">{currentStep?.title}</h2>
                <p className="text-sm opacity-70">{currentStep?.subtitle}</p>
              </div>

              {/* 카드 본문 */}
              <div className="bg-white dark:bg-slate-900">

                {/* ── pillars ── */}
                {currentStep?.key === 'pillars' && (
                  <div className="p-5 space-y-5">
                    <div className="flex gap-1.5">
                      <PillarCard label="년주(年柱)" pillar={result.year}  ilganIdx={result.day.stemIdx} />
                      <PillarCard label="월주(月柱)" pillar={result.month} ilganIdx={result.day.stemIdx} />
                      <PillarCard label="일주(日柱)" pillar={result.day}   isDay />
                      <PillarCard label="시주(時柱)" pillar={result.hour}  ilganIdx={result.day.stemIdx} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label:'출생', value:`${result.inputYear}년 ${result.inputMonth}월 ${result.inputDay}일`, emoji:'📅' },
                        { label:'성별', value:result.gender==='male'?'남성':'여성', emoji:'👤' },
                        { label:'일주', value:`${pillarHanja(result.day)} 일주`, emoji:'🌟' },
                        { label:'오행', value:`${dayStem.element}(${dayStem.yinyang}) 일간`, emoji:ELEMENT_INFO[dayStem.element].emoji },
                      ].map(({ label, value, emoji }) => (
                        <div key={label} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3">
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-0.5">{emoji} {label}</p>
                          <p className="text-sm font-black text-slate-800 dark:text-slate-100">{value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center">각 기둥 천간 아래 작은 뱃지는 일간 기준 십성(十星)입니다</p>
                  </div>
                )}

                {/* ── ilju ── */}
                {currentStep?.key === 'ilju' && (
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-4xl">{dayStem.emoji}</span>
                      <div>
                        <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{pillarHanja(result.day)}</p>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{pillarLabel(result.day)} 일주 · {BRANCHES[result.day.branchIdx].animal}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-[1.9]">{iljuDesc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label:'기질', value:dayStem.nature, emoji:'🌿' },
                        { label:'행운 색상', value:dayStem.luckyColor, emoji:'🎨' },
                        { label:'행운 방향', value:dayStem.luckyDirection, emoji:'🧭' },
                        { label:'행운 숫자', value:`${dayStem.luckyNumber}`, emoji:'🔢' },
                        { label:'적성 분야', value:dayStem.aptitude, emoji:'💼' },
                        { label:'음양', value:`${dayStem.element} · ${dayStem.yinyang}`, emoji:ELEMENT_INFO[dayStem.element].emoji },
                      ].map(({ label, value, emoji }) => (
                        <div key={label} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-2.5">
                          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-0.5">{emoji} {label}</p>
                          <p className="text-xs font-black text-slate-700 dark:text-slate-200">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl p-3">
                      <p className="text-[10px] font-black text-indigo-600 mb-1">💡 오늘의 운세</p>
                      <FortuneDisplay
                        subjectId={subjectId}
                        subjectName={`${result.inputYear}년생`}
                        subjectEmoji={dayStem.emoji}
                        badge={`${pillarHanja(result.day)} 일주`}
                      />
                    </div>
                  </div>
                )}

                {/* ── singang ── */}
                {currentStep?.key === 'singang' && singang && (
                  <div className="p-5 space-y-4">
                    <div className={`rounded-2xl p-4 border-2 ${singang.strong ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30' : 'border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{singang.strong ? '💪' : '🌱'}</span>
                        <div>
                          <p className={`text-xl font-black ${singang.strong ? 'text-rose-700 dark:text-rose-300' : 'text-blue-700 dark:text-blue-300'}`}>{singang.label}</p>
                          <p className={`text-xs font-bold ${singang.strong ? 'text-rose-500' : 'text-blue-500'}`}>강약 지수 {singang.score > 0 ? '+' : ''}{singang.score}</p>
                        </div>
                      </div>
                      <p className={`text-sm leading-[1.85] ${singang.strong ? 'text-rose-800 dark:text-rose-300' : 'text-blue-800 dark:text-blue-300'}`}>{singang.desc}</p>
                    </div>
                    <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-900/50">
                      <p className="text-xs font-black text-amber-700 dark:text-amber-300 mb-2">🌟 용신(用神) — 내가 취해야 할 기운</p>
                      <p className="text-lg font-black text-amber-800 dark:text-amber-200 mb-2">{singang.yongshin}</p>
                      <p className="text-sm text-amber-700 dark:text-amber-300 leading-[1.85]">{singang.yongshinDesc}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-black text-slate-500 dark:text-slate-400">활용 방법</p>
                      {[
                        singang.strong
                          ? '신강한 사주는 에너지가 넘쳐 주변과 마찰이 생기기 쉽습니다. 이 힘을 외부 활동(운동, 사업, 창작)으로 발산하는 출구를 의식적으로 만드세요.'
                          : '신약한 사주는 좋은 환경과 지지자가 성과를 결정합니다. 혼자 모든 것을 짊어지려 하지 말고 주변의 협력을 적극적으로 활용하세요.',
                        `용신 기운(${singang.yongshin})의 색상과 방향을 생활 속에서 가까이 두면 운의 흐름이 강해집니다. 직업·주거·옷 색상 선택에 활용하세요.`,
                      ].map((t, i) => (
                        <div key={i} className="flex gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                          <span className="text-amber-500 font-black shrink-0">·</span>
                          <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── ohaeng ── */}
                {currentStep?.key === 'ohaeng' && (
                  <div className="p-5 space-y-4">
                    {dominantEl && (
                      <div className="rounded-2xl p-4 border-2" style={{ background:ELEMENT_INFO[dominantEl].bg, borderColor:ELEMENT_INFO[dominantEl].border }}>
                        <p className="text-xs font-black mb-2" style={{ color:ELEMENT_INFO[dominantEl].color }}>
                          {ELEMENT_INFO[dominantEl].emoji} {ELEMENT_INFO[dominantEl].label} 기운이 가장 강합니다
                        </p>
                        <p className="text-sm leading-[1.85]" style={{ color:ELEMENT_INFO[dominantEl].color+'dd' }}>{ELEMENT_INFO[dominantEl].advice}</p>
                      </div>
                    )}
                    <ElementBar counts={counts} total={total} />
                    {missingEls.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-black text-slate-500 dark:text-slate-400">부족한 오행 보완법</p>
                        {missingEls.map(el => (
                          <div key={el} className="flex gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-xl p-3">
                            <span className="text-2xl leading-none shrink-0">{ELEMENT_INFO[el].emoji}</span>
                            <div>
                              <p className="text-xs font-black mb-1" style={{ color:ELEMENT_INFO[el].color }}>{ELEMENT_INFO[el].label} 없음</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ELEMENT_SHORTAGE[el]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4">
                      <p className="text-xs font-black text-slate-500 dark:text-slate-400 mb-3">지장간(地藏干) — 숨겨진 기운</p>
                      <div className="space-y-2">
                        {[
                          { label:'년지', branch:result.year.branchIdx },
                          { label:'월지', branch:result.month.branchIdx },
                          { label:'일지', branch:result.day.branchIdx },
                          ...(result.hour ? [{ label:'시지', branch:result.hour.branchIdx }] : []),
                        ].map(({ label, branch }) => {
                          const b = BRANCHES[branch];
                          return (
                            <div key={label} className="flex items-center gap-2">
                              <span className="text-xs font-black w-6 text-slate-400 dark:text-slate-500">{label}</span>
                              <span className="text-base">{b.emoji}</span>
                              <span className="text-sm font-black" style={{ color:ELEMENT_INFO[b.element].color }}>{b.hanja}</span>
                              <div className="flex gap-1 flex-wrap">
                                {JIJANGGAN[branch].map(({ stemIdx, role }) => {
                                  const s = STEMS[stemIdx];
                                  const el = ELEMENT_INFO[s.element];
                                  return (
                                    <span key={stemIdx+role} className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background:el.bg, color:el.color }}>
                                      {s.hanja}{role}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── sipseong ── */}
                {currentStep?.key === 'sipseong' && (
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">일간 <span className="font-black text-slate-800 dark:text-slate-100">{dayStem.hanja}({dayStem.kor})</span> 기준으로 다른 기둥의 천간과 맺는 관계를 분석합니다. 십성은 성격·직업·재물·인연을 결정하는 핵심 키입니다.</p>
                    {[
                      { label:'년주 천간', pillar:result.year,   role:'조상·선천 기질' },
                      { label:'월주 천간', pillar:result.month,  role:'부모·직업 환경' },
                      { label:'시주 천간', pillar:result.hour,   role:'자녀·노년·결실' },
                    ].map(({ label, pillar: p, role }) => {
                      if (!p) return <div key={label} className="text-xs text-slate-400 dark:text-slate-500 text-center py-2">시주 입력 시 시주 십성도 표시됩니다</div>;
                      const ss = getSipseong(result.day.stemIdx, p.stemIdx);
                      const info = SIPSEONG_INFO[ss];
                      const stemInfo = STEMS[p.stemIdx];
                      if (!info) return null;
                      return (
                        <div key={label} className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-950">
                            <span className="text-lg font-black" style={{ color:ELEMENT_INFO[stemInfo.element].color }}>{stemInfo.hanja}</span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{label}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">({role})</span>
                            <div className="ml-auto flex items-center gap-1.5">
                              <span className="text-sm">{info.emoji}</span>
                              <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background:ELEMENT_INFO[stemInfo.element].bg, color:ELEMENT_INFO[stemInfo.element].color }}>{ss}</span>
                            </div>
                          </div>
                          <div className="px-4 py-3 space-y-2">
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-[1.85]">{result.gender==='male' ? info.male : info.female}</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-2.5">
                                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1">💼 직업 영향</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{info.career}</p>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-2.5">
                                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-1">💰 재물 영향</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{info.wealth}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── domain steps ── */}
                {currentStep?.key.startsWith('domain-') && (() => {
                  const domainId = currentStep.key.replace('domain-', '');
                  const d = fortuneDomains.find(fd => fd.id === domainId);
                  if (!d) return null;
                  const c = COLOR_MAP[d.colorKey] ?? COLOR_MAP.blue;
                  return (
                    <div className="p-5 space-y-4">
                      {/* 점수 */}
                      <div className={`rounded-2xl p-4 ${c.bg} border ${c.border}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex gap-1.5">
                            {[1,2,3,4,5].map(i => (
                              <div key={i} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i <= d.score ? c.dot + ' border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                                {i <= d.score && <div className="w-2 h-2 rounded-full bg-white dark:bg-slate-900" />}
                              </div>
                            ))}
                          </div>
                          <span className={`text-sm font-black px-3 py-1 rounded-full ${GRADE_BADGE[d.grade]}`}>{d.grade}</span>
                        </div>
                        <p className={`text-sm font-bold leading-relaxed ${c.accent}`}>{d.summary}</p>
                      </div>
                      {/* 소개 */}
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-[1.9]">{d.intro}</p>
                      {/* 포인트 */}
                      <div className="space-y-3">
                        {d.points.map((pt, i) => (
                          <div key={i} className="flex gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3.5">
                            <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white ${c.dot}`}>{i+1}</span>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-[1.85]">{pt}</p>
                          </div>
                        ))}
                      </div>
                      {/* 조언 */}
                      <div className={`rounded-2xl p-4 border-2 ${c.bg} ${c.border}`}>
                        <p className={`text-xs font-black mb-2 ${c.accent}`}>💡 핵심 조언</p>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-[1.85]">{d.advice}</p>
                      </div>
                    </div>
                  );
                })()}

                {/* ── daewoon ── */}
                {currentStep?.key === 'daewoon' && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1">대운 방향</p>
                        <p className="text-base font-black text-slate-800 dark:text-slate-100">{direction==='forward'?'순행(順行)':'역행(逆行)'}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{direction==='forward'?'시간순 진행':'시간 역방향 진행'}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1">첫 대운 시작</p>
                        <p className="text-base font-black text-slate-800 dark:text-slate-100">{startAge}세부터</p>
                      </div>
                      {currentDaewoon && (
                        <div className="col-span-2 rounded-xl p-3 border-2 border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/30">
                          <p className="text-[10px] font-bold text-indigo-500 mb-1">현재 대운 ({currentAge}세)</p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-black" style={{ color:ELEMENT_INFO[STEMS[currentDaewoon.pillar.stemIdx].element].color }}>
                              {STEMS[currentDaewoon.pillar.stemIdx].hanja}{BRANCHES[currentDaewoon.pillar.branchIdx].hanja}
                            </span>
                            <div>
                              <p className="text-sm font-black text-indigo-700 dark:text-indigo-300">{pillarHanja(currentDaewoon.pillar)} 대운</p>
                              <p className="text-xs text-indigo-500">{currentDaewoon.startAge}~{currentDaewoon.endAge}세 · {currentDaewoon.endAge-currentAge+1}년 남음</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="overflow-x-auto -mx-1 px-1 pb-2">
                      <div className="flex gap-2 w-max">
                        {daewoons.map((entry, i) => (
                          <DaewoonCard key={i} entry={entry} isCurrent={!!currentDaewoon && entry.startAge===currentDaewoon.startAge} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {daewoons.map((entry, i) => {
                        const s = STEMS[entry.pillar.stemIdx];
                        const b = BRANCHES[entry.pillar.branchIdx];
                        const se = ELEMENT_INFO[s.element];
                        const isCurrent = !!currentDaewoon && entry.startAge===currentDaewoon.startAge;
                        const ss = getSipseong(result.day.stemIdx, entry.pillar.stemIdx);
                        const ssInfo = SIPSEONG_INFO[ss];
                        return (
                          <div key={i} className={`rounded-xl border overflow-hidden ${isCurrent?'border-indigo-300':'border-slate-100 dark:border-slate-800'}`}>
                            <div className={`flex items-center gap-2 px-3 py-2 ${isCurrent?'bg-indigo-50 dark:bg-indigo-950/30':'bg-slate-50 dark:bg-slate-950'}`}>
                              <span className="text-sm font-black text-slate-700 dark:text-slate-200">{s.hanja}{b.hanja}</span>
                              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{pillarHanja(entry.pillar)}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500">{entry.startAge}~{entry.endAge}세</span>
                              {isCurrent && <span className="ml-auto text-[10px] font-black text-indigo-600 bg-indigo-100 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full">현재</span>}
                            </div>
                            <div className="px-3 py-2">
                              <div className="flex gap-1.5 flex-wrap text-[10px] mb-1.5">
                                <span className="px-2 py-0.5 rounded-full" style={{ background:se.bg, color:se.color }}>{se.emoji} {s.element}</span>
                                {ssInfo && <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{ssInfo.emoji} {ss}</span>}
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {s.nature}의 {s.element} 에너지와 {b.animal}({b.element}) 기운이 흐르는 {entry.endAge-entry.startAge+1}년입니다.
                                {ssInfo && ` ${ss}운으로 ${ssInfo.summary}의 시기입니다.`}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── seun (연간 운세) ── */}
                {currentStep?.key === 'seun' && (
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-1">
                      세운은 대운(10년 흐름) 안에서 매년 바뀌는 그해의 기운입니다. 일간과 그해 천간의 관계(십성)로 한 해의 성격을 가늠합니다.
                    </p>
                    {seunYears.map(({ year, pillar, sipseong }, i) => {
                      const s = STEMS[pillar.stemIdx];
                      const b = BRANCHES[pillar.branchIdx];
                      const se = ELEMENT_INFO[s.element];
                      const ssInfo = SIPSEONG_INFO[sipseong];
                      const isThisYear = i === 0;
                      return (
                        <div key={year} className={`rounded-xl border overflow-hidden ${isThisYear?'border-cyan-300':'border-slate-100 dark:border-slate-800'}`}>
                          <div className={`flex items-center gap-2 px-3 py-2.5 ${isThisYear?'bg-cyan-50':'bg-slate-50 dark:bg-slate-950'}`}>
                            <span className="text-lg font-black" style={{ color: se.color }}>{s.hanja}{b.hanja}</span>
                            <div>
                              <p className="text-sm font-black text-slate-800 dark:text-slate-100">{year}년 · {pillarHanja(pillar)} 세운</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500">{pillarLabel(pillar)}년</p>
                            </div>
                            {isThisYear && <span className="ml-auto text-[10px] font-black text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">올해</span>}
                          </div>
                          <div className="px-3.5 py-3 bg-white dark:bg-slate-900">
                            <div className="flex gap-1.5 flex-wrap text-[10px] mb-2">
                              <span className="px-2 py-0.5 rounded-full" style={{ background: se.bg, color: se.color }}>{se.emoji} {s.element}({s.yinyang})</span>
                              {ssInfo && <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{ssInfo.emoji} {sipseong} · {ssInfo.summary}</span>}
                            </div>
                            {ssInfo && (
                              <>
                                <p className="text-xs text-slate-700 dark:text-slate-200 leading-[1.85] mb-2">
                                  {result?.gender === 'female' ? ssInfo.female : ssInfo.male}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2.5">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1">💼 커리어</p>
                                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{ssInfo.career}</p>
                                  </div>
                                  <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-2.5">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1">💰 재물</p>
                                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{ssInfo.wealth}</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>{/* end 카드 본문 */}
            </div>{/* end 스텝 카드 */}

            {/* ── 네비게이션 ── */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setStepIdx(i => Math.max(0, i - 1))}
                disabled={safeStep === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all border-2 ${
                  safeStep === 0
                    ? 'border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 bg-white dark:bg-slate-900 cursor-not-allowed'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                이전
              </button>
              <button
                onClick={() => { setStepIdx(i => Math.min(allSteps.length - 1, i + 1)); document.getElementById('saju-result')?.scrollIntoView({ behavior:'smooth', block:'start' }); }}
                disabled={safeStep === allSteps.length - 1}
                className={`flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm transition-all ${
                  safeStep === allSteps.length - 1
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98]'
                }`}
              >
                {safeStep === allSteps.length - 1 ? '마지막 페이지' : (
                  <>
                    다음 — {allSteps[safeStep + 1]?.emoji} {allSteps[safeStep + 1]?.title}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* 공유 */}
            <div className="flex gap-2 mt-2">
              <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-2xl text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186z" />
                </svg>
                공유하기
              </button>
              <button onClick={handleCopyLink} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {copied ? <><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg><span className="text-emerald-600">복사됨!</span></> : '🔗 링크 복사'}
              </button>
            </div>

          </div>
        )}

        <Faq items={SECTION_FAQ['fortune/saju']} />
      </div>
      <SiteFooter />
    </div>
  );
}
