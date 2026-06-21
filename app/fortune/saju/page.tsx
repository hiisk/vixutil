'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  STEMS, BRANCHES, ELEMENT_INFO, ELEMENT_SHORTAGE, ILJU_READINGS,
  type Element, type Pillar,
  getYearPillar, getMonthPillar, getDayPillar, getHourPillar,
  countElements, pillarLabel, pillarHanja,
} from '@/lib/saju-data';
import FortuneDisplay from '@/components/FortuneDisplay';

/* ── util ── */
function pad(n: number) { return String(n).padStart(2, '0'); }

/* ── 기둥 카드 ── */
function PillarCard({ label, pillar, isDay }: { label: string; pillar: Pillar | null; isDay?: boolean }) {
  if (!pillar) {
    return (
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-[10px] font-black text-slate-400 text-center tracking-wider">{label}</p>
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 min-h-[130px] flex flex-col items-center justify-center">
          <p className="text-xs text-slate-300 font-bold">생략</p>
        </div>
      </div>
    );
  }
  const stem   = STEMS[pillar.stemIdx];
  const branch = BRANCHES[pillar.branchIdx];
  const stemEl   = ELEMENT_INFO[stem.element];
  const branchEl = ELEMENT_INFO[branch.element];
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-1">
      <p className={`text-[10px] font-black text-center tracking-wider ${isDay ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</p>
      <div className={`rounded-xl border-2 overflow-hidden flex flex-col ${isDay ? 'border-indigo-300 shadow-md shadow-indigo-100' : 'border-slate-200'}`}>
        <div className="p-2.5 flex flex-col items-center border-b border-white/50" style={{ background: stemEl.bg }}>
          <span className="text-2xl font-black" style={{ color: stemEl.color }}>{stem.hanja}</span>
          <span className="text-[9px] font-bold mt-0.5" style={{ color: stemEl.color }}>{stem.kor}({stem.element}·{stem.yinyang})</span>
        </div>
        <div className="p-2.5 flex flex-col items-center" style={{ background: branchEl.bg }}>
          <span className="text-base leading-none">{branch.emoji}</span>
          <span className="text-2xl font-black mt-0.5" style={{ color: branchEl.color }}>{branch.hanja}</span>
          <span className="text-[9px] font-bold" style={{ color: branchEl.color }}>{branch.kor}({branch.element})</span>
        </div>
      </div>
      <p className="text-[9px] text-center text-slate-300 font-bold">{pillarHanja(pillar)} 일주</p>
    </div>
  );
}

/* ── 오행 바 ── */
function ElementBar({ counts, total }: { counts: Record<string, number>; total: number }) {
  return (
    <div className="space-y-3">
      {(['목','화','토','금','수'] as const).map(el => {
        const info  = ELEMENT_INFO[el];
        const count = counts[el] ?? 0;
        const pct   = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={el}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold" style={{ color: info.color }}>{info.emoji} {info.label}</span>
              <span className="text-xs font-black" style={{ color: count === 0 ? '#94a3b8' : info.color }}>
                {count}개{count === 0 ? ' (없음)' : ''}
              </span>
            </div>
            <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: info.color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── 캔버스 이미지 생성 ── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number, maxLines = 4) {
  const chars = Array.from(text);
  let line = '', curY = y, lines = 0;
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, curY);
      line = ch; curY += lineH; lines++;
      if (lines >= maxLines - 1) { ctx.fillText(line + '...', x, curY); return; }
    } else { line = test; }
  }
  if (line) ctx.fillText(line, x, curY);
}

function drawCard(
  canvas: HTMLCanvasElement,
  result: SajuResult,
  counts: Record<string, number>,
  iljuDesc: string,
) {
  const W = 540, H = 980;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // 배경
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0f0c29');
  bg.addColorStop(0.6, '#0d1b4b');
  bg.addColorStop(1, '#1a0a2e');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  // 반짝이는 별
  [[50,35],[130,80],[290,22],[430,60],[510,110],[85,175],[460,195],[190,240],[360,150],[480,295],[25,340],[510,390]]
    .forEach(([x,y]) => {
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI*2); ctx.fill();
    });

  // 상단 컬러 바
  const bar = ctx.createLinearGradient(0,0,W,0);
  bar.addColorStop(0,'#6366f1'); bar.addColorStop(0.5,'#8b5cf6'); bar.addColorStop(1,'#a855f7');
  ctx.fillStyle = bar; ctx.fillRect(0, 0, W, 5);

  // 헤더 카드
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  roundRect(ctx, 20, 18, W-40, 100, 16); ctx.fill();
  ctx.fillStyle = '#c4b5fd'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('🔯 사주 분석', W/2, 48);
  ctx.fillStyle = '#ffffff'; ctx.font = 'bold 28px sans-serif';
  ctx.fillText(`${result.inputYear}년 ${pad(result.inputMonth)}월 ${pad(result.inputDay)}일생`, W/2, 86);
  ctx.fillStyle = 'rgba(196,181,253,0.6)'; ctx.font = '12px sans-serif';
  ctx.fillText('vixutil.com', W/2, 108);

  // 4주 라벨
  ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('사주 사주 (四柱)', 30, 145);

  const labels = ['년주(年柱)','월주(月柱)','일주(日柱)','시주(時柱)'];
  const cW = (W - 60) / 4 - 6;
  const pillarsArr = [result.year, result.month, result.day, result.hour];
  pillarsArr.forEach((pillar, i) => {
    const cx = 30 + i*(cW+8), cy = 158, cH = 225;
    ctx.fillStyle = i===2 ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.06)';
    roundRect(ctx, cx, cy, cW, cH, 12); ctx.fill();
    if (i===2) { ctx.strokeStyle='rgba(99,102,241,0.7)'; ctx.lineWidth=1.5; roundRect(ctx,cx,cy,cW,cH,12); ctx.stroke(); }
    ctx.fillStyle = i===2?'#818cf8':'#64748b'; ctx.font='bold 8px sans-serif'; ctx.textAlign='center';
    ctx.fillText(labels[i], cx+cW/2, cy+14);
    if (!pillar) { ctx.fillStyle='#475569'; ctx.font='11px sans-serif'; ctx.fillText('모름',cx+cW/2,cy+cH/2); return; }
    const s = STEMS[pillar.stemIdx], b = BRANCHES[pillar.branchIdx];
    const sc = ELEMENT_INFO[s.element].color, bc = ELEMENT_INFO[b.element].color;
    ctx.fillStyle=`${sc}22`; roundRect(ctx,cx+4,cy+20,cW-8,97,8); ctx.fill();
    ctx.fillStyle=sc; ctx.font='bold 36px sans-serif'; ctx.fillText(s.hanja,cx+cW/2,cy+62);
    ctx.font='9px sans-serif'; ctx.fillText(`${s.kor}(${s.element})`,cx+cW/2,cy+78);
    ctx.fillStyle=`${sc}88`; ctx.font='8px sans-serif'; ctx.fillText(s.nature.slice(0,5),cx+cW/2,cy+93);
    ctx.fillStyle=`${bc}22`; roundRect(ctx,cx+4,cy+122,cW-8,91,8); ctx.fill();
    ctx.fillStyle=bc; ctx.font='18px sans-serif'; ctx.fillText(b.emoji,cx+cW/2,cy+150);
    ctx.font='bold 26px sans-serif'; ctx.fillText(b.hanja,cx+cW/2,cy+178);
    ctx.font='9px sans-serif'; ctx.fillStyle=`${bc}cc`; ctx.fillText(`${b.kor}(${b.element})`,cx+cW/2,cy+196);
  });

  // 일주 해석
  const dayS = STEMS[result.day.stemIdx];
  const iljuName = pillarHanja(result.day);
  const iy = 415;
  ctx.fillStyle = `${dayS.color}18`; roundRect(ctx,20,iy,W-40,205,16); ctx.fill();
  ctx.strokeStyle=`${dayS.color}44`; ctx.lineWidth=1.5; roundRect(ctx,20,iy,W-40,205,16); ctx.stroke();
  ctx.fillStyle=dayS.color; ctx.font='bold 11px sans-serif'; ctx.textAlign='left';
  ctx.fillText(`일주 해석 · ${iljuName} (${pillarLabel(result.day)}) 일주`, 36, iy+24);
  ctx.font='30px sans-serif'; ctx.fillText(dayS.emoji, 36, iy+68);
  ctx.fillStyle='#ffffff'; ctx.font='bold 18px sans-serif'; ctx.fillText(`${dayS.hanja}(${dayS.kor}) 일간 · ${dayS.nature}`, 80, iy+52);
  ctx.fillStyle=`${dayS.color}bb`; ctx.font='11px sans-serif'; ctx.fillText(`${dayS.element}(${dayS.yinyang}) · 행운방향: ${dayS.luckyDirection} · 행운색: ${dayS.luckyColor}`, 80, iy+70);
  ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.font='12px sans-serif';
  wrapText(ctx, iljuDesc, 36, iy+100, W-72, 20, 5);

  // 오행
  const ey = 645;
  ctx.fillStyle='#a78bfa'; ctx.font='bold 11px sans-serif'; ctx.textAlign='left';
  ctx.fillText('오행(五行) 균형', 30, ey);
  const els = ['목','화','토','금','수'] as const;
  const total = Object.values(counts).reduce((a,b) => Number(a)+Number(b),0) as number;
  els.forEach((el,i) => {
    const info=ELEMENT_INFO[el], cnt=counts[el]??0, pct=total>0?cnt/total:0;
    const ry=ey+16+i*38;
    ctx.fillStyle=info.color; ctx.font='bold 10px sans-serif'; ctx.textAlign='left';
    ctx.fillText(`${info.emoji} ${info.label}`, 30, ry+12);
    ctx.fillStyle='rgba(255,255,255,0.08)'; roundRect(ctx,110,ry,W-175,18,9); ctx.fill();
    if(pct>0){ctx.fillStyle=info.color;roundRect(ctx,110,ry,(W-175)*pct,18,9);ctx.fill();}
    ctx.fillStyle=info.color; ctx.font='bold 10px sans-serif'; ctx.textAlign='right';
    ctx.fillText(`${cnt}`, W-30, ry+12);
  });

  // 하단
  const fGrad=ctx.createLinearGradient(0,H-70,0,H);
  fGrad.addColorStop(0,'transparent'); fGrad.addColorStop(1,'rgba(0,0,0,0.5)');
  ctx.fillStyle=fGrad; ctx.fillRect(0,H-70,W,70);
  ctx.fillStyle='#818cf8'; ctx.font='bold 12px sans-serif'; ctx.textAlign='center';
  ctx.fillText('vixutil.com/fortune/saju', W/2, H-28);
  ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='10px sans-serif';
  ctx.fillText('생년월일 입력으로 무료 사주 분석', W/2, H-12);
}

/* ── 메인 ── */
interface FormState { year: string; month: string; day: string; hour: string }
interface SajuResult {
  year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null;
  inputYear: number; inputMonth: number; inputDay: number;
}

export default function SajuPage() {
  const [form, setForm]     = useState<FormState>({ year:'', month:'', day:'', hour:'' });
  const [result, setResult] = useState<SajuResult | null>(null);
  const [error, setError]   = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const y = p.get('y') ?? '', m = p.get('m') ?? '', d = p.get('d') ?? '', h = p.get('h') ?? '';
    if (y && m && d) { setForm({ year:y, month:m, day:d, hour:h }); runCalc(y, m, d, h); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runCalc = useCallback((y: string, m: string, d: string, h: string) => {
    const yi=parseInt(y), mi=parseInt(m), di=parseInt(d);
    if (!yi||!mi||!di||yi<1900||yi>2100||mi<1||mi>12||di<1||di>31) {
      setError('올바른 생년월일을 입력해 주세요.'); return;
    }
    setError('');
    const yearP  = getYearPillar(yi, mi, di);
    const monthP = getMonthPillar(mi, di, yearP.stemIdx);
    const dayP   = getDayPillar(new Date(yi, mi-1, di));
    const hourP  = h ? getHourPillar(parseInt(h), dayP.stemIdx) : null;
    setResult({ year:yearP, month:monthP, day:dayP, hour:hourP, inputYear:yi, inputMonth:mi, inputDay:di });
    const params = new URLSearchParams({ y, m, d, ...(h?{h}:{}) });
    window.history.replaceState({}, '', `?${params}`);
    setTimeout(() => document.getElementById('saju-result')?.scrollIntoView({ behavior:'smooth' }), 100);
  }, []);

  function handleCalc() { runCalc(form.year, form.month, form.day, form.hour); }

  const pillars  = result ? [result.year, result.month, result.day, result.hour] : [];
  const counts: Record<string,number> = result ? countElements(pillars) : {};
  const total    = Object.values(counts).reduce((a,b) => a+b, 0);
  const dayStem  = result ? STEMS[result.day.stemIdx] : null;
  const iljuKey  = result ? pillarLabel(result.day) : '';
  const iljuDesc = ILJU_READINGS[iljuKey] ?? dayStem?.personality ?? '';
  const subjectId = result ? `saju-${result.inputYear}-${result.inputMonth}-${result.inputDay}` : '';

  const dominantEl = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] as Element|undefined;
  const missingEls = (Object.entries(counts) as [Element,number][]).filter(([,c])=>c===0).map(([e])=>e);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleShare() {
    if (!result || !dayStem) return;
    const text = `나의 사주 일주: ${pillarHanja(result.day)} (${pillarLabel(result.day)} 일주)\n`
      + `${result.inputYear}년 ${result.inputMonth}월 ${result.inputDay}일생 · ${dayStem.element}(${dayStem.yinyang}) 일간\n`
      + `vixutil.com에서 무료 사주 분석 해보세요 →`;
    if (navigator.share) {
      await navigator.share({ title:'사주 분석 결과', text, url:window.location.href });
    } else {
      handleCopyLink();
    }
  }

  function handleSaveImage() {
    if (!result || !canvasRef.current) return;
    drawCard(canvasRef.current, result, counts, iljuDesc);
    const a = document.createElement('a');
    a.download = `사주_${result.inputYear}${pad(result.inputMonth)}${pad(result.inputDay)}.png`;
    a.href = canvasRef.current.toDataURL('image/png');
    a.click();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />
      <canvas ref={canvasRef} className="hidden" />

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
            <p className="text-xs opacity-70 mt-1">생년월일로 나의 사주 사주(四柱)를 분석합니다</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">출생년도 *</label>
                <input type="number" placeholder="예) 1995" value={form.year}
                  onChange={e => setForm(f=>({...f,year:e.target.value}))}
                  onKeyDown={e => e.key==='Enter' && handleCalc()}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">출생월 *</label>
                <select value={form.month} onChange={e=>setForm(f=>({...f,month:e.target.value}))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-400 bg-white">
                  <option value="">월</option>
                  {Array.from({length:12},(_,i)=>(
                    <option key={i+1} value={i+1}>{i+1}월</option>
                  ))}
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
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">태어난 시간 (선택 — 시주 계산)</label>
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

        {/* 결과 */}
        {result && (
          <div id="saju-result" className="space-y-4">

            {/* ① 사주 사주 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">사주 사주(四柱)</p>
                <span className="text-[10px] text-slate-300 font-mono">{result.inputYear}.{pad(result.inputMonth)}.{pad(result.inputDay)}</span>
              </div>
              <div className="flex gap-2">
                <PillarCard label="년주(年柱)" pillar={result.year} />
                <PillarCard label="월주(月柱)" pillar={result.month} />
                <PillarCard label="일주(日柱)" pillar={result.day} isDay />
                <PillarCard label="시주(時柱)" pillar={result.hour} />
              </div>
              <p className="text-[9px] text-slate-300 text-center mt-3">
                일주(日柱)가 나의 핵심 기둥입니다 · 일주는 계산법에 따라 ±1일 차이가 날 수 있습니다
              </p>
            </div>

            {/* ② 일주 상세 해석 — 핵심 콘텐츠 */}
            {dayStem && (
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                {/* 헤더 */}
                <div className="px-5 py-5 text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${dayStem.color}f0 0%, ${dayStem.color}99 100%)` }}>
                  <div className="absolute -right-4 -top-4 text-8xl opacity-10 select-none">{dayStem.emoji}</div>
                  <p className="text-[10px] font-black opacity-70 mb-3 uppercase tracking-widest">일주(日柱) · 나의 핵심 성격</p>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{dayStem.emoji}</div>
                    <div>
                      <p className="text-4xl font-black leading-none">{pillarHanja(result.day)}</p>
                      <p className="text-base font-bold mt-1 opacity-90">{pillarLabel(result.day)} 일주</p>
                      <p className="text-xs opacity-60 mt-0.5">{BRANCHES[result.day.branchIdx].animal}해 생 · {dayStem.nature} · {dayStem.element}({dayStem.yinyang})</p>
                    </div>
                  </div>
                </div>

                {/* 성격 설명 */}
                <div className="bg-white px-5 py-4 space-y-4">
                  <p className="text-sm text-slate-700 leading-[1.8]">{iljuDesc}</p>

                  {/* 세부 특성 */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: '오행', value: `${dayStem.element}(${dayStem.yinyang})`, emoji: ELEMENT_INFO[dayStem.element].emoji },
                      { label: '상징', value: dayStem.nature, emoji: dayStem.emoji },
                      { label: '행운 색상', value: dayStem.luckyColor, emoji: '🎨' },
                      { label: '행운 방향', value: dayStem.luckyDirection, emoji: '🧭' },
                      { label: '행운 숫자', value: `${dayStem.luckyNumber}`, emoji: '🔢' },
                      { label: '적성 분야', value: dayStem.aptitude, emoji: '💼' },
                    ].map(({ label, value, emoji }) => (
                      <div key={label} className="bg-slate-50 rounded-xl p-3">
                        <p className="text-[9px] font-bold text-slate-400 mb-1">{emoji} {label}</p>
                        <p className="text-xs font-black text-slate-700">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* 일간 기질 심화 */}
                  <div className="rounded-xl p-4 border"
                    style={{ background: ELEMENT_INFO[dayStem.element].bg, borderColor: ELEMENT_INFO[dayStem.element].border }}>
                    <p className="text-xs font-black mb-2" style={{ color: dayStem.color }}>
                      {dayStem.hanja}({dayStem.kor}) 일간 기질
                    </p>
                    <p className="text-xs leading-[1.8]" style={{ color: dayStem.color + 'dd' }}>
                      {dayStem.personality}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ③ 오행 분석 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">오행(五行) 분석</p>

              {dominantEl && (
                <div className="rounded-xl p-3.5 border"
                  style={{ background: ELEMENT_INFO[dominantEl].bg, borderColor: ELEMENT_INFO[dominantEl].border }}>
                  <p className="text-xs font-black mb-1" style={{ color: ELEMENT_INFO[dominantEl].color }}>
                    {ELEMENT_INFO[dominantEl].emoji} {ELEMENT_INFO[dominantEl].label} 기운이 가장 강합니다
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: ELEMENT_INFO[dominantEl].color + 'cc' }}>
                    {ELEMENT_INFO[dominantEl].advice}
                  </p>
                </div>
              )}

              <ElementBar counts={counts} total={total} />

              {missingEls.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-black text-amber-700">부족한 오행 — 보완 방법</p>
                  {missingEls.map(el => (
                    <div key={el} className="flex items-start gap-2.5">
                      <span className="text-lg leading-none">{ELEMENT_INFO[el].emoji}</span>
                      <div>
                        <p className="text-[10px] font-black" style={{ color: ELEMENT_INFO[el].color }}>{ELEMENT_INFO[el].label} 부족</p>
                        <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">{ELEMENT_SHORTAGE[el]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[10px] text-slate-300">천간+지지 {total}글자 기준 · 많을수록 강점, 없으면 보완이 필요한 에너지</p>
            </div>

            {/* ④ 기둥별 해석 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">기둥별 세부 해석</p>
              {[
                { label:'년주(年柱)', pillar:result.year,  desc:'조상·선천 기질', detail:'출생 연도가 담은 시대의 기운입니다. 어린 시절과 타고난 기질에 영향을 줍니다.' },
                { label:'월주(月柱)', pillar:result.month, desc:'부모·직업 환경',  detail:'성장 환경과 직업적 적성을 나타냅니다. 사회적 역할과 주변 환경의 영향을 봅니다.' },
                { label:'일주(日柱)', pillar:result.day,   desc:'나 자신·배우자', detail:'가장 중요한 기둥으로 나 자신을 나타냅니다. 성격과 배우자 인연에도 영향을 줍니다.' },
                { label:'시주(時柱)', pillar:result.hour,  desc:'자녀·노년·결실',  detail:'인생 후반부와 자녀, 결실의 에너지입니다. 노력이 맺는 열매를 나타냅니다.' },
              ].map(({ label, pillar, desc, detail }) => {
                if (!pillar) return (
                  <div key={label} className="flex gap-3 p-3 bg-slate-50 rounded-xl opacity-50">
                    <div className="w-10 text-center">
                      <p className="text-xs font-black text-slate-400">-</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-500">{label} — {desc}</p>
                      <p className="text-[10px] text-slate-400">생략됨</p>
                    </div>
                  </div>
                );
                const s = STEMS[pillar.stemIdx], b = BRANCHES[pillar.branchIdx];
                return (
                  <div key={label} className="flex gap-3 p-3.5 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0 flex flex-col items-center w-12">
                      <span className="text-xl font-black leading-none" style={{ color: ELEMENT_INFO[s.element].color }}>{s.hanja}</span>
                      <span className="text-sm leading-none my-0.5">{b.emoji}</span>
                      <span className="text-xl font-black leading-none" style={{ color: ELEMENT_INFO[b.element].color }}>{b.hanja}</span>
                      <span className="text-[9px] text-slate-400 font-bold mt-1">{pillarHanja(pillar)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-black text-slate-700">{label}</p>
                        <span className="text-[9px] px-1.5 py-0.5 bg-white border border-slate-200 rounded-full font-bold text-slate-400">{desc}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-1.5">{detail}</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        <span className="font-bold" style={{ color: ELEMENT_INFO[s.element].color }}>{s.kor}({s.element}·{s.yinyang})</span>의 {s.nature} 기운과{' '}
                        <span className="font-bold" style={{ color: ELEMENT_INFO[b.element].color }}>{b.kor}({b.animal}) {b.element}</span>의 에너지가 결합한 조합입니다.
                        {s.element === b.element && ` 같은 오행(${s.element})이 겹쳐 그 기운이 더욱 강합니다.`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ⑤ 오늘의 운세 */}
            <div className="space-y-3">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">오늘의 운세</p>
              <FortuneDisplay
                subjectId={subjectId}
                subjectName={`${result.inputYear}년생`}
                subjectEmoji={dayStem?.emoji ?? '🔯'}
                badge={dayStem ? `${pillarHanja(result.day)} 일주` : undefined}
              />
            </div>

            {/* ⑥ 공유 / 저장 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="text-xs font-black text-slate-500 mb-3">결과 저장 · 공유</p>
              <div className="flex gap-2">
                <button onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors active:scale-95">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186z" />
                  </svg>
                  공유하기
                </button>
                <button onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors active:scale-95">
                  {copied
                    ? <><svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg><span className="text-emerald-600">복사됨!</span></>
                    : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/></svg>링크 복사</>
                  }
                </button>
                <button onClick={handleSaveImage}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors active:scale-95">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  이미지 저장
                </button>
              </div>
              <p className="text-[10px] text-slate-300 text-center mt-2">링크를 공유하면 상대방도 결과를 바로 볼 수 있어요</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
