'use client';
import { shareOne } from '@/lib/share/ui';
import PageHero from '@/components/PageHero';
import ToolIcon from '@/components/ToolIcon';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Checklist } from '@/lib/types';
import type { AnyLocale10 } from '@/lib/locales';
import PageGlow from './PageGlow';
import { thumbSurface } from '@/lib/thumbnail';
import ReferralCards from './ReferralCards';

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

type Lang = AnyLocale10;

/** 사용자에게 보이는 문구만 언어별로 갈라둔다. 나머지 동작은 세 언어가 동일하다. */
const UI: Record<Lang, {
  done: string; selectAll: string; deselectAll: string;
  linkCopied: string; copyFailed: string; imageSaved: string; imageFailed: string;
  progress: (done: number, total: number) => string;
  fileSuffix: string;
  allLists: string; share: string; shareLink: string; saveCard: string;
  doneCount: (n: number) => string;
}> = {
  ko: {
    done: '완료', selectAll: '전체 선택', deselectAll: '전체 선택 해제',
    linkCopied: '링크가 복사됐어요!', copyFailed: '복사에 실패했어요',
    imageSaved: '카드 이미지가 저장됐어요!', imageFailed: '이미지 저장에 실패했어요',
    progress: (d, t) => `${d}/${t}개 완료 중`,
    fileSuffix: '체크리스트',
    allLists: '전체 체크리스트', share: '공유', shareLink: '링크 공유', saveCard: '카드 이미지 저장',
    doneCount: n => `${n}개 완료`,
  },
  en: {
    done: 'done', selectAll: 'Select all', deselectAll: 'Clear all',
    linkCopied: 'Link copied', copyFailed: 'Could not copy',
    imageSaved: 'Image saved', imageFailed: 'Could not save the image',
    progress: (d, t) => `${d} of ${t} done`,
    fileSuffix: 'checklist',
    allLists: 'All checklists', share: 'Share', shareLink: 'Copy link', saveCard: 'Save as image',
    doneCount: n => `${n} done`,
  },
  es: {
    done: 'Hecho', selectAll: 'Marcar todo', deselectAll: 'Desmarcar todo',
    linkCopied: '¡Enlace copiado!', copyFailed: 'No se pudo copiar',
    imageSaved: '¡Imagen guardada!', imageFailed: 'No se pudo guardar la imagen',
    progress: (d, t) => `${d}/${t} completado`,
    fileSuffix: 'lista',
    allLists: 'Todas las listas', share: 'Compartir', shareLink: 'Compartir enlace', saveCard: 'Guardar imagen',
    doneCount: n => `${n} hechos`,
  },
  'pt-br': {
    done: 'Feito', selectAll: 'Marcar tudo', deselectAll: 'Desmarcar tudo',
    linkCopied: 'Link copiado!', copyFailed: 'Não foi possível copiar',
    imageSaved: 'Imagem salva!', imageFailed: 'Não foi possível salvar a imagem',
    progress: (d, t) => `${d}/${t} concluído`,
    fileSuffix: 'checklist',
    allLists: 'Todas as listas', share: 'Compartilhar', shareLink: 'Compartilhar link', saveCard: 'Salvar imagem',
    doneCount: n => `${n} feitos`,
  },
  ja: {
    done: '完了', selectAll: 'すべて選択', deselectAll: 'すべて解除',
    linkCopied: 'リンクをコピーしました', copyFailed: 'コピーできませんでした',
    imageSaved: '画像を保存しました', imageFailed: '画像を保存できませんでした',
    progress: (d, t) => `${t}件中${d}件`,
    fileSuffix: 'チェックリスト',
    allLists: 'チェックリスト一覧', share: '共有', shareLink: 'リンクを共有', saveCard: '画像を保存',
    doneCount: n => `${n}件完了`,
  },
  de: {
    done: 'Erledigt', selectAll: 'Alle auswählen', deselectAll: 'Auswahl aufheben',
    linkCopied: 'Link kopiert!', copyFailed: 'Kopieren fehlgeschlagen',
    imageSaved: 'Bild gespeichert!', imageFailed: 'Bild konnte nicht gespeichert werden',
    progress: (d, t) => `${d}/${t} erledigt`,
    fileSuffix: 'Checkliste',
    allLists: 'Alle Checklisten', share: 'Teilen', shareLink: 'Link teilen', saveCard: 'Bild speichern',
    doneCount: n => `${n} erledigt`,
  },
  fr: {
    done: 'Fait', selectAll: 'Tout cocher', deselectAll: 'Tout décocher',
    linkCopied: 'Lien copié !', copyFailed: 'Échec de la copie',
    imageSaved: 'Image enregistrée !', imageFailed: 'Échec de l’enregistrement',
    progress: (d, t) => `${d}/${t} fait`,
    fileSuffix: 'checklist',
    allLists: 'Toutes les listes', share: 'Partager', shareLink: 'Partager le lien', saveCard: 'Enregistrer l’image',
    doneCount: n => `${n} faits`,
  },
  hi: {
    done: 'हो गया', selectAll: 'सब चुनें', deselectAll: 'सब हटाएँ',
    linkCopied: 'लिंक कॉपी हो गया!', copyFailed: 'कॉपी नहीं हो सका',
    imageSaved: 'इमेज सेव हो गई!', imageFailed: 'इमेज सेव नहीं हो सकी',
    progress: (d, t) => `${t} में से ${d} पूरे`,
    fileSuffix: 'चेकलिस्ट',
    allLists: 'सभी चेकलिस्ट', share: 'शेयर', shareLink: 'लिंक शेयर करें', saveCard: 'इमेज सेव करें',
    doneCount: n => `${n} पूरे`,
  },
  'zh-hans': {
    done: '完成', selectAll: '全选', deselectAll: '取消全选',
    linkCopied: '链接已复制！', copyFailed: '复制失败',
    imageSaved: '图片已保存！', imageFailed: '图片保存失败',
    progress: (d, t) => `已完成 ${d}/${t}`,
    fileSuffix: '清单',
    allLists: '全部清单', share: '分享', shareLink: '分享链接', saveCard: '保存图片',
    doneCount: n => `完成${n}项`,
  },
  'zh-hant': {
    done: '完成', selectAll: '全選', deselectAll: '取消全選',
    linkCopied: '連結已複製！', copyFailed: '複製失敗',
    imageSaved: '圖片已儲存！', imageFailed: '圖片儲存失敗',
    progress: (d, t) => `已完成 ${d}/${t}`,
    fileSuffix: '清單',
    allLists: '全部清單', share: '分享', shareLink: '分享連結', saveCard: '儲存圖片',
    doneCount: n => `完成${n}項`,
  },
};

  /*
   * headerRight — 머리줄 오른쪽에 얹을 것(언어 고르개).
   * 예전에는 부르는 쪽이 이 엔진 **위에** 자기 줄을 하나 더 만들어 고르개를
   * 놓았다. 화면 위쪽 50px이 고르개 하나에 쓰였고, 머리 띠가 두 겹으로 보였다.
   * 머리줄이 이미 있으므로 그 안에 넣는다.
   */
export default function ChecklistEngine({ checklist, lang = 'ko', headerRight }: { checklist: Checklist; lang?: Lang; headerRight?: React.ReactNode }) {
  const ui = UI[lang];
  // 진행 상황은 언어별로 따로 저장한다. 같은 slug라도 항목 id가 언어마다 달라질 수 있다.
  const STORAGE_KEY = lang === 'ko' ? `checklist-${checklist.slug}` : `checklist-${lang}-${checklist.slug}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const allItems = checklist.sections.flatMap(s => s.items);
  const total = allItems.length;
  const done = allItems.filter(i => checked.has(i.id)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isAllDone = done === total;

  useEffect(() => {
    // localStorage는 프리렌더 시점에 없다. 마운트 후 읽어 진행 상황을 복원한다.
    // 목록 자체는 프리렌더 때부터 전부 그린다. checked가 빈 Set으로 시작하므로
    // 서버 HTML과 하이드레이션 직후 렌더가 일치하고, 복원은 그 다음 커밋에서 반영된다.
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // 프리렌더 HTML과 하이드레이션을 맞추려면 복원은 마운트 후여야 한다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      ctx.fillText(`${done}/${total} ${ui.done}`, barX, y);
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
        if (!blob) { showToast(ui.imageFailed); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${checklist.title}-${ui.fileSuffix}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast(ui.imageSaved);
      }, 'image/png');

    } catch {
      showToast(ui.imageFailed);
    } finally {
      setDownloading(false);
    }
  }

  async function handleShare() {
    const url = lang === 'ko'
      ? `https://vixutil.com/checklist/${checklist.slug}`
      : `https://vixutil.com/${lang}/checklist/${checklist.slug}`;
    // 제목·진행률·주소가 한 덩이로 — title 칸은 카톡이 통째로 버린다
    const text = done > 0
      ? `${checklist.title} — ${ui.progress(done, total)}`
      : `${checklist.title}\n${checklist.desc}`;
    if (await shareOne(text, url)) showToast(ui.linkCopied);
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

  return (
    <div className="page-wrap flex flex-col">
      <PageGlow accent="sky" />
      {/* 상단 진행바 */}
      <div className="h-1.5 bg-sky-100 dark:bg-sky-950/40">
        <div
          className={`h-full transition-all duration-500 ${isAllDone ? 'bg-emerald-400' : 'bg-sec'}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={lang === 'ko' ? '/checklist' : `/${lang}/checklist`} className="text-sm text-slate-400 dark:text-slate-500 hover:text-sky-600 flex items-center gap-1.5 font-medium shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {ui.allLists}
          </Link>
          <span className="flex-1" />
          <span className={`text-sm font-bold tabular-nums ${isAllDone ? 'text-emerald-600' : 'text-sky-600'}`}>
            {done} / {total}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-sky-600 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl px-3 py-1.5 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            {ui.share}
          </button>
        {headerRight && <span className="ml-auto shrink-0">{headerRight}</span>}
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 w-full flex-1">
        {/* 타이틀 */}
        <div className="mb-6">
          {/* 목록 카드와 같은 그라데이션·이모지 — 제목 옆 작은 이모지보다 눈에 들어온다 */}
          {/* 96px 아이콘 판이 화면 위쪽을 차지했다 — 칩 하나로 줄인다 */}
          <span className="bg-sec-soft mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <ToolIcon emoji={checklist.icon} className="h-5 w-5" />
          </span>
          <span className="text-xs font-bold text-sky-600 bg-sky-50 dark:bg-sky-950/30 px-3 py-1 rounded-full">{checklist.category}</span>
          <div className="hero-band">
            <PageHero title={checklist.title} desc={checklist.desc} />
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden mb-1.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isAllDone ? 'bg-emerald-500' : 'bg-sky-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>{ui.doneCount(done)}</span>
            <span className={`font-bold ${isAllDone ? 'text-emerald-600' : 'text-sky-600'}`}>{pct}%</span>
          </div>
        </div>

        {/* 완료 메시지 */}
        {isAllDone && (
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg p-5 text-center mb-6">
            <p className="text-3xl mb-2">🎉</p>
            <p className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">모든 항목 완료!</p>
            <p className="text-sm text-emerald-600 mt-1">수고하셨습니다. 모든 준비를 마쳤어요.</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleShare}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 border border-emerald-200 dark:border-emerald-900/50 bg-white dark:bg-slate-900 hover:bg-sec-soft px-4 py-2.5 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                {ui.shareLink}
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
              <div key={section.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(sectionIds)}
                  className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <ToolIcon emoji={section.icon} className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      sectionAllDone ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-sky-50 dark:bg-sky-950/30 text-sky-600'
                    }`}>
                      {sectionDone}/{sectionIds.length}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {sectionAllDone ? ui.deselectAll : ui.selectAll}
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
                        className="w-full flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
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
                            isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'
                          }`}>
                            {item.text}
                          </p>
                          {item.note && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">{item.note}</p>
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
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-sky-600 border border-sky-200 dark:border-sky-900/50 hover:bg-sec-soft rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              {ui.shareLink}
            </button>
            <button
              onClick={handleSaveCard}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-60"
            >
              {downloading ? (
                <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              )}
              {ui.saveCard}
            </button>
          </div>
          {done > 0 && (
            <button
              onClick={reset}
              className="w-full py-3 text-sm text-slate-400 dark:text-slate-500 hover:text-red-500 border border-slate-200 dark:border-slate-700 hover:border-red-200 rounded-xl transition-colors"
            >
              진행 상황 초기화
            </button>
          )}

          {/* 하나라도 체크한 뒤에 — 목록만 훑고 지나가는 사람에게는 띄우지 않는다 */}
          {done > 0 && <ReferralCards lang={lang} placement="result" />}
        </div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-sm animate-fade-in-up">
          {toast}
        </div>
      )}
    </div>
  );
}
