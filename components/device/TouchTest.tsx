'use client';
import ToolIcon from '@/components/ToolIcon';
import { TOUCH_UI, type DeviceLang } from '@/lib/device-ui-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 터치스크린 테스트 — 눌린 지점을 그대로 보여주고, 지나간 자리를 칠한다.
 *
 * Touch 이벤트가 아니라 Pointer 이벤트를 쓴다. 마우스·펜·손가락이 같은 코드로
 * 들어와서 노트북 터치패드나 스타일러스도 함께 확인된다.
 *
 * "안 먹는 영역"은 좌표를 아무리 찍어도 안 보인다 — 지나간 자리를 캔버스에
 * 칠해 두어야 손을 뗀 뒤에 빈 구멍으로 드러난다.
 */
type Point = { id: number; x: number; y: number; pressure: number; size: number; type: string };

const COLORS = ['#0ea5e9', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

export default function TouchTest({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = TOUCH_UI[lang];
  const [points, setPoints] = useState<Point[]>([]);
  const [maxTouch, setMaxTouch] = useState(0);
  const [total, setTotal] = useState(0);
  const [supported, setSupported] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const lastRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const activeRef = useRef<Map<number, Point>>(new Map());

  useEffect(() => {
    // 기기가 몇 점까지 지원한다고 말하는지 — 실측값과 비교할 기준이 된다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(navigator.maxTouchPoints ?? 0);
  }, []);

  // 캔버스 픽셀 크기를 실제 표시 크기(+DPR)에 맞춘다. 안 맞추면 선이 흐릿하고 어긋난다.
  const fit = useCallback(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const r = box.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx?.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [fit]);

  const relative = (e: React.PointerEvent) => {
    const r = boxRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const paint = (id: number, x: number, y: number, width: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const prev = lastRef.current.get(id);
    ctx.strokeStyle = COLORS[id % COLORS.length];
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(prev?.x ?? x, prev?.y ?? y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastRef.current.set(id, { x, y });
  };

  const upsert = (e: React.PointerEvent) => {
    const { x, y } = relative(e);
    const p: Point = {
      id: e.pointerId,
      x,
      y,
      pressure: Number(e.pressure.toFixed(2)),
      size: Math.round(Math.max(e.width, e.height)),
      type: e.pointerType,
    };
    activeRef.current.set(p.id, p);
    setPoints([...activeRef.current.values()]);
    setMaxTouch(m => Math.max(m, activeRef.current.size));
    paint(p.id, x, y, Math.max(6, Math.min(28, p.size || 10)));
  };

  const onDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    lastRef.current.delete(e.pointerId);
    setTotal(t => t + 1);
    upsert(e);
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.buttons === 0 && e.pointerType === 'mouse') return; // 마우스는 누른 채로만 그린다
    upsert(e);
  };

  const onUp = (e: React.PointerEvent) => {
    lastRef.current.delete(e.pointerId);
    activeRef.current.delete(e.pointerId);
    setPoints([...activeRef.current.values()]);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    lastRef.current.clear();
    activeRef.current.clear();
    setPoints([]);
    setMaxTouch(0);
    setTotal(0);
  };

  return (
    <div>
      <div
        ref={boxRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
        onContextMenu={e => e.preventDefault()}
        className="relative touch-none select-none h-72 sm:h-80 rounded-2xl border-2 border-dashed border-pink-200 dark:border-pink-900/60 bg-slate-50 dark:bg-slate-950 overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {points.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <ToolIcon emoji="👆" className="w-9 h-9 mb-2 text-slate-800 dark:text-slate-100" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{ui.pressHere}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{ui.multiOk}</p>
          </div>
        )}

        {points.map(p => (
          <div
            key={p.id}
            className="absolute pointer-events-none rounded-full border-2 flex items-center justify-center text-[10px] font-black text-white"
            style={{
              left: p.x,
              top: p.y,
              width: 56,
              height: 56,
              transform: 'translate(-50%, -50%)',
              background: `${COLORS[p.id % COLORS.length]}55`,
              borderColor: COLORS[p.id % COLORS.length],
            }}
          >
            {Math.round(p.x)},{Math.round(p.y)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="rounded-xl border chip-off px-3 py-3 text-center">
          <p className="text-lg font-black text-pink-600">{points.length}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{ui.nowTouching}</p>
        </div>
        <div className="rounded-xl border chip-off px-3 py-3 text-center">
          <p className="text-lg font-black text-violet-600">{maxTouch}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{ui.maxSimul}</p>
        </div>
        <div className="rounded-xl border chip-off px-3 py-3 text-center">
          <p className="text-lg font-black text-slate-700 dark:text-slate-200">{supported ?? '–'}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{ui.deviceSupports}</p>
        </div>
      </div>

      {points.length > 0 && (
        <div className="mt-3 rounded-xl border chip-off px-4 py-3">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.detailTitle}</p>
          <div className="flex flex-wrap gap-1.5">
            {points.map(p => (
              <span
                key={p.id}
                className="rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 text-[11px] font-mono text-slate-500 dark:text-slate-400"
              >
                {ui.detailLine(p.id, p.type, String(p.pressure), String(p.size))}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-3 note-xs text-center">
        {ui.rubNote}
        {supported === 0 && ui.noTouchNote}
      </p>

      <button
        onClick={clear}
        className="mt-4 w-full rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 text-sm hover:opacity-90 transition-opacity"
      >
        {ui.clearWith(total)}
      </button>
    </div>
  );
}
