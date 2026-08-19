'use client';
import { formatBytes } from '@/lib/image-canvas';
import { IMAGE_COMMON, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 결과 요약 + 저장/다시하기 버튼.
 *
 * 도구마다 조작부는 다르지만 마지막 한 줄은 늘 같다 — "원본이 얼마였고 결과가
 * 얼마인지, 그래서 저장할지". 이 부분만 모아 여덟 도구가 같은 모양으로 끝나게 한다.
 */
export default function ResultActions({
  originalSize,
  resultSize,
  dimension,
  onDownload,
  onReset,
  downloadLabel,
  busy = false,
  lang = 'ko',
}: {
  originalSize: number;
  /** 아직 계산 중이면 undefined */
  resultSize?: number;
  /** '1920 × 1080' 같은 결과 크기 표기 */
  dimension?: string;
  onDownload: () => void;
  onReset: () => void;
  downloadLabel?: string;
  busy?: boolean;
  lang?: ImageLang;
}) {
  const c = IMAGE_COMMON[lang];
  // 압축이 아니라 늘어난 경우도 있다(PNG로 변환 등). 음수 절감률은 그대로 보여준다.
  const diff = resultSize === undefined ? null : Math.round((1 - resultSize / originalSize) * 100);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border chip-off px-3 py-3 text-center">
          <p className="text-base font-bold text-slate-700 dark:text-slate-200 tabular-nums">{formatBytes(originalSize)}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{c.original}</p>
        </div>
        <div className="rounded-xl border chip-off px-3 py-3 text-center">
          <p className="text-base font-bold text-violet-600 tabular-nums">
            {resultSize === undefined ? '…' : formatBytes(resultSize)}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{dimension ?? c.result}</p>
        </div>
        <div className="rounded-xl border chip-off px-3 py-3 text-center">
          <p className={`text-base font-bold tabular-nums ${diff !== null && diff > 0 ? 'text-emerald-600' : 'text-slate-400 dark:text-slate-500'}`}>
            {diff === null ? '…' : diff > 0 ? `-${diff}%` : `+${-diff}%`}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{diff !== null && diff < 0 ? c.grew : c.saved}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <button
          onClick={onReset}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3 text-sm text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          {c.otherPhoto}
        </button>
        <button
          onClick={onDownload}
          disabled={busy || resultSize === undefined}
          className="col-span-2 rounded-xl bg-sec font-bold py-3 text-sm shadow hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {busy ? c.working : `⬇ ${downloadLabel ?? c.save}`}
        </button>
      </div>
    </div>
  );
}
