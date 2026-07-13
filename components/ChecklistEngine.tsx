'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Checklist } from '@/lib/types';

// Korean-aware text wrapping (splits by character since Korean has no spaces between words)
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines = 999): string[] {
  const lines: string[] = [];
  let current = '';
  for (const char of text) {
    const test = current + char;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = char;
      if (lines.length >= maxLines) { lines[maxLines - 1] += '…'; break; }
    } else {
      current = test;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

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

export default function ChecklistEngine({ checklist }: { checklist: Checklist }) {
  const STORAGE_KEY = `checklist-${checklist.slug}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const allItems = checklist.sections.flatMap(s => s.items);
  const total = allItems.length;
  const done = allItems.filter(i => checked.has(i.id)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isAllDone = done === total;

  useEffect(() => {
    // localStorage는 프리렌더 시점에 없다. 마운트 후 읽어 진행 상황을 복원한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(new Set(JSON.parse(saved)));
    } catch {}
  }, [STORAGE_KEY]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  async function handleSaveCard() {
    setDownloading(true);
    try {
      const W = 1080;
      const PAD = 60;
      const IW = W - PAD * 2;       // inner width
      const CB = 26;                  // checkbox size
      const TEXT_X = PAD + CB + 18;  // item text start x
      const TEXT_W = W - TEXT_X - PAD;
      const ITEM_H = 54;
      const SEC_H = 56;
      const SEC_GAP = 20;
      const HEADER_H = 288;
      const FOOTER_H = 68;

      const KR = '"Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",sans-serif';
      const font = (px: number, w = 'normal') => `${w} ${px}px -apple-system,BlinkMacSystemFont,${KR}`;

      // Pre-calculate total height using a temp canvas to measure text
      const tmp = document.createElement('canvas').getContext('2d')!;
      tmp.font = font(26, '500');
      let contentH = 0;
      for (const sec of checklist.sections) {
        contentH += SEC_H;
        for (const item of sec.items) {
          const lines = wrapText(tmp, item.text, TEXT_W, 2);
          const noteLines = item.note ? wrapText(tmp, item.note, TEXT_W, 1) : [];
          const lineH = lines.length > 1 ? 34 : 0;
          const noteH = noteLines.length > 0 ? 28 : 0;
          contentH += ITEM_H + lineH + noteH;
        }
        contentH += SEC_GAP;
      }
      const H = HEADER_H + 32 + contentH + FOOTER_H;

      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d')!;
      const cx = W / 2;

      /* ── 배경 ── */
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, W, H);

      /* ── 헤더 (sky blue 그라디언트) ── */
      const hgrad = ctx.createLinearGradient(0, 0, W, HEADER_H);
      hgrad.addColorStop(0, '#38bdf8');
      hgrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = hgrad;
      ctx.fillRect(0, 0, W, HEADER_H);

      let y = 44;

      // 카테고리 배지
      ctx.font = font(22, '700');
      const catTxt = checklist.category;
      const catW = ctx.measureText(catTxt).width + 44;
      const bH = 38;
      roundRect(ctx, cx - catW / 2, y, catW, bH, bH / 2);
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(catTxt, cx, y + bH / 2);
      y += bH + 22;

      // 제목 (이모지 + 텍스트)
      ctx.font = font(46, '900');
      ctx.fillStyle = '#fff';
      ctx.fillText(`${checklist.icon} ${checklist.title}`, cx, y + 28);
      y += 68;

      // 진행률 바
      const barX = PAD + 16, barW = IW - 32, barH = 12;
      roundRect(ctx, barX, y, barW, barH, barH / 2);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fill();
      const fw = Math.max(barW * pct / 100, pct > 0 ? barH : 0);
      if (fw > 0) {
        roundRect(ctx, barX, y, fw, barH, barH / 2);
        ctx.fillStyle = isAllDone ? '#6ee7b7' : '#fff';
        ctx.fill();
      }
      y += barH + 14;

      // 통계
      ctx.textBaseline = 'middle';
      ctx.font = font(22, '600');
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'left';
      ctx.fillText(`${done}/${total} 완료`, barX, y);
      ctx.textAlign = 'right';
      ctx.font = font(26, '900');
      ctx.fillStyle = '#fff';
      ctx.fillText(`${pct}%`, barX + barW, y);

      /* ── 섹션 & 항목 ── */
      y = HEADER_H + 32;

      for (const sec of checklist.sections) {
        const secIds = sec.items.map(i => i.id);
        const secDone = secIds.filter(id => checked.has(id)).length;
        const secAll = secDone === secIds.length;

        // 섹션 헤더 행
        ctx.fillStyle = secAll ? '#f0fdf4' : '#f1f5f9';
        ctx.fillRect(0, y, W, SEC_H);
        // 섹션 구분선
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(W, y);
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.font = font(26, '700');
        ctx.fillStyle = secAll ? '#059669' : '#334155';
        ctx.fillText(`${sec.icon}  ${sec.title}`, PAD, y + SEC_H / 2);

        // 섹션 카운트
        ctx.textAlign = 'right';
        ctx.font = font(22, '700');
        ctx.fillStyle = secAll ? '#059669' : '#0ea5e9';
        ctx.fillText(`${secDone}/${secIds.length}`, W - PAD, y + SEC_H / 2);
        y += SEC_H;

        // 항목
        for (const item of sec.items) {
          const isChecked = checked.has(item.id);

          // 항목 구분선
          ctx.strokeStyle = '#f1f5f9';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y);
          ctx.stroke();

          // 텍스트 줄 수 계산
          ctx.font = font(26, '500');
          const lines = wrapText(ctx, item.text, TEXT_W, 2);
          const noteLines = item.note ? wrapText(ctx, item.note, TEXT_W, 1) : [];
          const extraH = (lines.length > 1 ? (lines.length - 1) * 34 : 0) + (noteLines.length > 0 ? 28 : 0);
          const thisH = ITEM_H + extraH;
          const midY = y + thisH / 2;

          // 체크박스
          const cbY = y + 18;
          roundRect(ctx, PAD, cbY, CB, CB, 6);
          if (isChecked) {
            ctx.fillStyle = '#0ea5e9';
            ctx.fill();
            // 체크마크
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(PAD + 5, cbY + CB / 2);
            ctx.lineTo(PAD + CB / 2 - 1, cbY + CB - 7);
            ctx.lineTo(PAD + CB - 5, cbY + 7);
            ctx.stroke();
          } else {
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // 항목 텍스트
          ctx.font = font(26, isChecked ? '400' : '500');
          ctx.fillStyle = isChecked ? '#94a3b8' : '#1e293b';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          lines.forEach((line, i) => {
            ctx.fillText(line, TEXT_X, y + 15 + i * 34);
            // 취소선
            if (isChecked) {
              const tw = Math.min(ctx.measureText(line).width, TEXT_W);
              const ly = y + 15 + i * 34 + 14;
              ctx.strokeStyle = '#94a3b8';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(TEXT_X, ly);
              ctx.lineTo(TEXT_X + tw, ly);
              ctx.stroke();
            }
          });

          // note
          if (noteLines.length > 0) {
            const noteY = y + 15 + lines.length * 34 + 2;
            ctx.font = font(21);
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(noteLines[0], TEXT_X, noteY);
          }

          y += thisH;
        }

        y += SEC_GAP;
      }

      /* ── 푸터 ── */
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, H - FOOTER_H, W, FOOTER_H);
      ctx.font = font(24, '900');
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('vixutil.com', cx, H - FOOTER_H / 2);

      /* ── 다운로드 ── */
      canvas.toBlob(blob => {
        if (!blob) { showToast('이미지 저장에 실패했어요'); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${checklist.title}-체크리스트.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('카드 이미지가 저장됐어요!');
      }, 'image/png');

    } catch {
      showToast('이미지 저장에 실패했어요');
    } finally {
      setDownloading(false);
    }
  }

  async function handleShare() {
    const url = `https://vixutil.com/checklist/${checklist.slug}`;
    const title = checklist.title;
    const text = done > 0 ? `${checklist.title} — ${done}/${total}개 완료 중` : checklist.desc;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share({ title, text, url }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('링크가 복사됐어요!');
    } catch {
      showToast('복사에 실패했어요');
    }
  }

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function toggleSection(ids: string[]) {
    const allChecked = ids.every(id => checked.has(id));
    setChecked(prev => {
      const next = new Set(prev);
      if (allChecked) ids.forEach(id => next.delete(id));
      else ids.forEach(id => next.add(id));
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function reset() {
    setChecked(new Set());
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  if (!mounted) return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-500" />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 진행바 */}
      <div className="h-1.5 bg-sky-100">
        <div
          className={`h-full transition-all duration-500 ${isAllDone ? 'bg-emerald-400' : 'bg-gradient-to-r from-sky-400 to-cyan-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/checklist" className="text-sm text-slate-400 hover:text-sky-600 flex items-center gap-1.5 font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            전체 체크리스트
          </Link>
          <span className="flex-1" />
          <span className={`text-sm font-bold tabular-nums ${isAllDone ? 'text-emerald-600' : 'text-sky-600'}`}>
            {done} / {total}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 border border-slate-200 hover:border-sky-300 rounded-xl px-3 py-1.5 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            공유
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 w-full flex-1">
        {/* 타이틀 */}
        <div className="mb-6">
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">{checklist.category}</span>
          <h1 className="text-2xl font-black text-slate-900 mt-3 mb-1">
            {checklist.icon} {checklist.title}
          </h1>
          <p className="text-sm text-slate-500 mb-4">{checklist.desc}</p>

          <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden mb-1.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isAllDone ? 'bg-emerald-500' : 'bg-sky-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>{done}개 완료</span>
            <span className={`font-bold ${isAllDone ? 'text-emerald-600' : 'text-sky-600'}`}>{pct}%</span>
          </div>
        </div>

        {/* 완료 메시지 */}
        {isAllDone && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center mb-6">
            <p className="text-3xl mb-2">🎉</p>
            <p className="font-black text-emerald-700 text-lg">모든 항목 완료!</p>
            <p className="text-sm text-emerald-600 mt-1">수고하셨습니다. 모든 준비를 마쳤어요.</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleShare}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 border border-emerald-200 bg-white hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                링크 공유
              </button>
              <button
                onClick={handleSaveCard}
                disabled={downloading}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                카드 저장
              </button>
            </div>
          </div>
        )}

        {/* 섹션별 체크리스트 */}
        <div className="flex flex-col gap-5">
          {checklist.sections.map(section => {
            const sectionIds = section.items.map(i => i.id);
            const sectionDone = sectionIds.filter(id => checked.has(id)).length;
            const sectionAllDone = sectionDone === sectionIds.length;

            return (
              <div key={section.title} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleSection(sectionIds)}
                  className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-bold text-slate-800 text-sm">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      sectionAllDone ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-50 text-sky-600'
                    }`}>
                      {sectionDone}/{sectionIds.length}
                    </span>
                    <span className="text-xs text-slate-400">
                      {sectionAllDone ? '전체 선택 해제' : '전체 선택'}
                    </span>
                  </div>
                </button>

                <div className="divide-y divide-slate-50">
                  {section.items.map(item => {
                    const isChecked = checked.has(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className="w-full flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                          isChecked ? 'bg-sky-500 border-sky-500' : 'border-slate-300 hover:border-sky-400'
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-relaxed transition-colors ${
                            isChecked ? 'line-through text-slate-400' : 'text-slate-700'
                          }`}>
                            {item.text}
                          </p>
                          {item.note && (
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.note}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 공유 & 카드 & 초기화 */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-sky-600 border border-sky-200 hover:bg-sky-50 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              링크 공유
            </button>
            <button
              onClick={handleSaveCard}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-60"
            >
              {downloading ? (
                <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              )}
              카드 이미지 저장
            </button>
          </div>
          {done > 0 && (
            <button
              onClick={reset}
              className="w-full py-3 text-sm text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition-colors"
            >
              진행 상황 초기화
            </button>
          )}
        </div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg animate-fade-in-up">
          {toast}
        </div>
      )}
    </div>
  );
}
