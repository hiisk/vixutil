'use client';
import { useEffect } from 'react';

/**
 * 사진을 «끌어다 놓기»와 «붙여넣기»로도 받는다.
 *
 * ── 왜 (2026-08-20) ─────────────────────────────────────────
 * 스냅은 사진을 올리는 길이 **버튼 하나뿐**이었다. 눌러 → 파일 창 → 폴더에서
 * 찾기. 그런데 데스크톱에서 사진을 다루는 사람의 손은 대개 이미 파일 위에
 * 있고(끌어다 놓기), 방금 찍은 화면은 클립보드에 있다(붙여넣기). 둘 다
 * 브라우저가 이미 주는 것인데 안 받고 있었다.
 *
 * 파일 고르기 버튼은 그대로 둔다 — 휴대폰에서는 그쪽이 유일한 길이다.
 *
 * ── 창 전체에 건다 ──────────────────────────────────────────
 * 떨구는 자리를 카드 안으로 좁히면 «어디에 떨궈야 하는지»를 사람이 맞혀야
 * 한다. 창 어디에 떨궈도 받고, 대신 끌고 들어온 동안 화면에 테두리를 띄워
 * 받는 중이라는 것을 알린다.
 *
 * dragover에서 preventDefault를 안 하면 브라우저가 그 파일로 페이지를
 * 갈아치운다 — 지금 화면이 사라지고 이미지만 남는다. 그래서 document에
 * 걸어 둔다.
 */
export function useDropPaste(onFile: (file: File) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    /* 끌고 들어온 것이 파일일 때만 반응한다 — 글자를 끌어와도 테두리가 뜨면 거짓말이다 */
    const hasFile = (e: DragEvent) =>
      Array.from(e.dataTransfer?.types ?? []).includes('Files');

    let depth = 0;   // 자식 위를 지날 때마다 enter/leave가 나므로 세어 둔다

    /*
      «받는 중»은 body의 클래스로 알린다. 값을 돌려주면 화면 열한 곳이 저마다
      그 값을 받아 테두리를 그려야 하는데, 그건 같은 마크업을 열한 번 적는 일이다.
      테두리 한 장은 app/globals.css의 `body.is-dropping::after` 하나로 끝난다.
    */
    const mark = (on: boolean) => document.body.classList.toggle('is-dropping', on);

    const onEnter = (e: DragEvent) => {
      if (!hasFile(e)) return;
      depth++;
      mark(true);
    };
    const onLeave = (e: DragEvent) => {
      if (!hasFile(e)) return;
      depth = Math.max(0, depth - 1);
      if (depth === 0) mark(false);
    };
    const onOver = (e: DragEvent) => {
      if (hasFile(e)) e.preventDefault();   // 이게 없으면 브라우저가 페이지를 갈아치운다
    };
    const onDrop = (e: DragEvent) => {
      if (!hasFile(e)) return;
      e.preventDefault();
      depth = 0;
      mark(false);
      const f = Array.from(e.dataTransfer?.files ?? []).find(x => x.type.startsWith('image/'));
      if (f) onFile(f);
    };
    const onPaste = (e: ClipboardEvent) => {
      const items = Array.from(e.clipboardData?.items ?? []);
      const it = items.find(x => x.kind === 'file' && x.type.startsWith('image/'));
      const f = it?.getAsFile();
      if (f) { e.preventDefault(); onFile(f); }
    };

    document.addEventListener('dragenter', onEnter);
    document.addEventListener('dragleave', onLeave);
    document.addEventListener('dragover', onOver);
    document.addEventListener('drop', onDrop);
    document.addEventListener('paste', onPaste);
    return () => {
      mark(false);
      document.removeEventListener('dragenter', onEnter);
      document.removeEventListener('dragleave', onLeave);
      document.removeEventListener('dragover', onOver);
      document.removeEventListener('drop', onDrop);
      document.removeEventListener('paste', onPaste);
    };
  }, [onFile, enabled]);
}
