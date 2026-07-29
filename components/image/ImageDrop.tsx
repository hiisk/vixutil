'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { ACCEPT, isImageFile } from '@/lib/image-canvas';
import { IMAGE_COMMON, PASTE_HINT, type ImageLang } from '@/lib/image-ui-intl';

/**
 * 사진을 받는 공통 입구 — 클릭, 드래그&드롭, 붙여넣기 세 경로를 다 연다.
 *
 * 붙여넣기(Ctrl+V)를 넣은 이유: 이 도구들의 가장 흔한 입력이 "방금 찍은 화면
 * 캡처"인데, 그건 파일로 저장돼 있지 않고 클립보드에만 있다. 저장했다가 다시
 * 고르게 하면 단계가 둘 더 는다.
 */
export default function ImageDrop({
  onFiles,
  multiple = false,
  hint,
  lang = 'ko',
}: {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  hint?: string;
  lang?: ImageLang;
}) {
  const c = IMAGE_COMMON[lang];
  const paste = PASTE_HINT[lang];
  const [over, setOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();

  const take = (list: FileList | File[] | null) => {
    const files = [...(list ?? [])].filter(isImageFile);
    if (files.length === 0) {
      setError(c.notImage);
      return;
    }
    setError('');
    onFiles(multiple ? files : files.slice(0, 1));
  };

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = [...(e.clipboardData?.files ?? [])];
      if (files.length) take(files);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
    // take는 매 렌더 새로 만들어지지만 붙여넣기 처리에 필요한 건 onFiles뿐이다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFiles, multiple]);

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragOver={e => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); take(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-5 py-12 cursor-pointer transition-colors ${
          over
            ? 'border-violet-400 bg-violet-50 dark:bg-violet-950/40'
            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:border-violet-300'
        }`}
      >
        <span className="text-4xl">🖼️</span>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {multiple ? c.dropMany : c.dropOne}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
          {c.dropHow}{paste.before}<kbd className="font-sans">Ctrl</kbd>+<kbd className="font-sans">V</kbd>{paste.after}
          {hint && <><br />{hint}</>}
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPT}
          multiple={multiple}
          onChange={e => {
            take(e.target.files);
            // 같은 파일을 다시 골랐을 때도 change가 오게 비워둔다
            e.target.value = '';
          }}
          className="sr-only"
        />
      </label>
      {error && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 text-center">{error}</p>}
    </div>
  );
}
