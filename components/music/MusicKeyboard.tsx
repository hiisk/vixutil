'use client';
import { useRef, useState } from 'react';
import type { Lang8 } from '@/lib/i18n/lang';
import { isBlack, noteName, type Pc } from '@/lib/music/notes';

/**
 * 건반 그림 — 구성음을 눌러 놓은 자리로 보여 준다.
 *
 * 음 이름 세 개를 나열하는 것보다 건반에서 어디를 누르는지 보이는 편이 훨씬
 * 빠르다. 검은 건반이 어디에 끼는지가 코드 모양의 절반이기 때문이다. 그림은
 * 직접 그린 SVG다 — 사진이나 이모지를 쓰면 색이 든 건반을 표시할 수 없다.
 *
 * 검은 건반에는 이름을 얹지 않는다 — 폭이 16px이라 "Mib" 세 글자가 옆 건반을
 * 덮는다. 이름은 아래 표에 다 있고, 그림이 알려 주어야 하는 것은 "어디를
 * 누르는가"다.
 *
 * 소리는 브라우저에서 만든다. AudioContext는 누른 뒤에 만든다 — 미리 만들면
 * 브라우저가 자동재생으로 보고 막고, 서버에는 그 객체가 없어 하이드레이션도
 * 어긋난다.
 */
const WHITE = [0, 2, 4, 5, 7, 9, 11];
const W = 26;
const H = 104;
const BW = 16;
const BH = 64;

export default function MusicKeyboard({
  notes,
  color,
  lang,
  accidental,
  playLabel,
  stopLabel,
  freqs,
}: {
  /** 눌러 놓을 음들 */
  notes: Pc[];
  color: string;
  lang: Lang8;
  accidental: 'sharp' | 'flat';
  playLabel: string;
  stopLabel: string;
  /** 실제로 울릴 주파수 — 화면과 소리가 어긋나지 않게 서버에서 계산해 넘긴다 */
  freqs: number[];
}) {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  const on = (pc: Pc) => notes.some(n => ((n % 12) + 12) % 12 === pc);

  /** 두 옥타브를 그린다 — 한 옥타브만 그리면 옥타브를 넘는 코드가 잘린다 */
  const octaves = [0, 1];
  const whiteKeys = octaves.flatMap(o => WHITE.map(pc => ({ pc, o })));
  const width = whiteKeys.length * W;

  const stop = () => {
    stopRef.current?.();
    stopRef.current = null;
    setPlaying(false);
  };

  const play = () => {
    if (playing) return stop();
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    // 여러 음을 함께 울리면 소리가 커진다 — 음 수로 나눠 준다
    const peak = 0.16 / Math.max(1, Math.sqrt(freqs.length));
    const now = ctx.currentTime;
    const nodes = freqs.map((hz, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = hz;
      // 아주 조금씩 늦춰 울린다 — 동시에 때리면 화음의 각 음이 안 들린다
      const at = now + i * 0.07;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(peak, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 1.6);
      osc.connect(gain).connect(master);
      osc.start(at);
      osc.stop(at + 1.7);
      return osc;
    });
    master.gain.value = 1;
    setPlaying(true);
    const timer = window.setTimeout(() => setPlaying(false), 1800 + freqs.length * 70);
    stopRef.current = () => {
      window.clearTimeout(timer);
      for (const osc of nodes) {
        try { osc.stop(); } catch { /* 이미 끝난 음 */ }
      }
    };
  };

  return (
    <div>
      <div className="overflow-x-auto -mx-1 px-1">
        <svg
          viewBox={`0 0 ${width} ${H}`}
          className="w-full min-w-[280px] h-[120px] sm:h-[150px]"
          role="img"
          data-music-keyboard
        >
          {whiteKeys.map(({ pc, o }, i) => (
            <g key={`w${o}-${pc}`}>
              <rect
                x={i * W} y={0} width={W - 2} height={H} rx={3}
                fill={on(pc) ? color : 'white'}
                className={on(pc) ? '' : 'dark:fill-slate-200'}
                stroke="#94a3b8" strokeWidth={1}
              />
              {on(pc) && (
                <text
                  x={i * W + (W - 2) / 2} y={H - 10}
                  textAnchor="middle"
                  style={{ fontSize: 11, fontWeight: 800, fill: 'white' }}
                >
                  {noteName(pc, lang, accidental)}
                </text>
              )}
            </g>
          ))}
          {octaves.flatMap(o =>
            WHITE.map((pc, wi) => {
              const black = pc + 1;
              if (!isBlack(black)) return null;
              const i = o * WHITE.length + wi;
              return (
                <g key={`b${o}-${black}`}>
                  <rect
                    x={i * W + W - BW / 2 - 1} y={0} width={BW} height={BH} rx={2}
                    fill={on(black) ? color : '#1e293b'}
                    stroke="#0f172a" strokeWidth={1}
                  />
                </g>
              );
            }),
          )}
        </svg>
      </div>

      <button
        onClick={play}
        data-music-play
        className="mt-3 w-full rounded-2xl py-3 text-sm font-black text-white shadow-sm transition-transform active:scale-[0.99]"
        style={{ background: color }}
      >
        {playing ? stopLabel : playLabel}
      </button>
    </div>
  );
}
