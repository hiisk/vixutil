'use client';
import { SPEAKER_UI, DEVICE_COMMON, type DeviceLang } from '@/lib/device-ui-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 스피커·이어폰 테스트 — 좌우 채널과 주파수 대역을 직접 울려 본다.
 *
 * AudioContext는 사용자 제스처 없이 만들면 suspended 상태로 태어난다.
 * 그래서 첫 재생 버튼을 누른 순간에 만들고 resume한다.
 *
 * 정현파를 갑자기 켜고 끄면 "딱" 하는 클릭음이 난다(파형이 0이 아닌 지점에서
 * 잘리기 때문). 게인을 15ms에 걸쳐 올리고 내려서 그걸 없앤다.
 */
const PRESETS = [
  { hz: 60, label: '60Hz' },
  { hz: 250, label: '250Hz' },
  { hz: 1000, label: '1kHz' },
  { hz: 4000, label: '4kHz' },
  { hz: 12000, label: '12kHz' },
  { hz: 16000, label: '16kHz' },
];

type Mode = 'left' | 'right' | 'both' | 'sweep' | null;

export default function SpeakerTest({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = SPEAKER_UI[lang];
  const c = DEVICE_COMMON[lang];
  const [mode, setMode] = useState<Mode>(null);
  const [hz, setHz] = useState(440);
  const [vol, setVol] = useState(30);
  const [side, setSide] = useState<'left' | 'right' | 'both'>('both');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const panRef = useRef<StereoPannerNode | null>(null);
  const sweepRef = useRef(0);

  const stop = useCallback(() => {
    window.clearInterval(sweepRef.current);
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    const osc = oscRef.current;
    if (ctx && gain && osc) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.015);
      osc.stop(ctx.currentTime + 0.03);
    }
    oscRef.current = null;
    gainRef.current = null;
    panRef.current = null;
    setMode(null);
  }, []);

  useEffect(() => () => {
    window.clearInterval(sweepRef.current);
    oscRef.current?.stop();
    ctxRef.current?.close();
  }, []);

  const play = useCallback((next: Mode, frequency: number, volume: number) => {
    if (!next) return;
    window.clearInterval(sweepRef.current);
    oscRef.current?.stop();

    const Ctx: typeof AudioContext =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    if (ctx.state === 'suspended') void ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const pan = ctx.createStereoPanner();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume / 100 * 0.5, ctx.currentTime + 0.015);
    pan.pan.value = next === 'left' ? -1 : next === 'right' ? 1 : 0;
    osc.connect(gain).connect(pan).connect(ctx.destination);
    osc.start();

    oscRef.current = osc;
    gainRef.current = gain;
    panRef.current = pan;
    setMode(next);
    setSide(next === 'sweep' ? 'left' : next === 'both' ? 'both' : next);

    if (next === 'sweep') {
      // 좌 → 우로 1.2초마다 넘기며 채널이 바뀌었는지 귀로 확인시킨다
      let left = true;
      sweepRef.current = window.setInterval(() => {
        left = !left;
        pan.pan.value = left ? -1 : 1;
        setSide(left ? 'left' : 'right');
      }, 1200);
    }
  }, []);

  const toggle = (next: Exclude<Mode, null>) => {
    if (mode === next) stop();
    else play(next, hz, vol);
  };

  const setFreq = (f: number) => {
    setHz(f);
    if (oscRef.current && ctxRef.current) {
      oscRef.current.frequency.setValueAtTime(f, ctxRef.current.currentTime);
    }
  };

  const setVolume = (v: number) => {
    setVol(v);
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.setTargetAtTime(v / 100 * 0.5, ctxRef.current.currentTime, 0.02);
    }
  };

  return (
    <div>
      {/* 좌우 스피커 시각화 — 어느 쪽이 울려야 하는지를 눈으로 먼저 알려준다 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-6">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {(['left', 'right'] as const).map(s => {
            const on = mode !== null && (side === s || side === 'both');
            return (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-4xl transition-all duration-200 border-2 ${
                    on
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 text-white scale-105 shadow-lg animate-pulse'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
                  }`}
                >
                  {s === 'left' ? '🔈' : '🔊'}
                </div>
                <span className={`text-sm font-black ${on ? 'text-emerald-600' : 'text-slate-400 dark:text-slate-500'}`}>
                  {s === 'left' ? ui.leftSide : ui.rightSide}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-5 leading-relaxed">
          {mode
            ? ui.playingNote
            : ui.idleNote}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {([
          { m: 'left' as const },
          { m: 'right' as const },
          { m: 'both' as const },
          { m: 'sweep' as const },
        ] as const).map((b, i) => (
          <button
            key={b.m}
            onClick={() => toggle(b.m)}
            className={`rounded-xl font-bold py-3 text-sm border transition-colors ${
              mode === b.m
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-300'
            }`}
          >
            {mode === b.m ? c.stop : ui.modes[i]}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.freq}</span>
          <span className="text-lg font-black text-emerald-600 font-mono">
            {hz >= 1000 ? `${(hz / 1000).toFixed(hz % 1000 === 0 ? 0 : 1)}kHz` : `${hz}Hz`}
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={16000}
          step={10}
          value={hz}
          onChange={e => setFreq(Number(e.target.value))}
          className="w-full accent-emerald-500"
          aria-label={ui.freq}
        />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-3">
          {PRESETS.map((p, i) => (
            <button
              key={p.hz}
              onClick={() => setFreq(p.hz)}
              title={ui.bandDescs[i]}
              className={`rounded-lg px-1 py-2 text-[11px] font-bold border transition-colors ${
                hz === p.hz
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-emerald-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-baseline justify-between mt-5 mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.volume}</span>
          <span className="text-sm font-black text-slate-600 dark:text-slate-300 font-mono">{vol}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={vol}
          onChange={e => setVolume(Number(e.target.value))}
          className="w-full accent-emerald-500"
          aria-label={ui.volume}
        />
        <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
          {ui.hearingWarn}
        </p>
      </div>

      {/* 스스로 체크하는 항목 — 브라우저가 대신 판정할 수 없는 부분이다 */}
      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">{ui.checkTitle}</p>
        <div className="flex flex-col gap-2">
          {[
            ...ui.checkItems,
          ].map(item => (
            <label key={item} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={e => setChecked(c => ({ ...c, [item]: e.target.checked }))}
                className="w-4 h-4 accent-emerald-500"
              />
              <span className={`text-sm ${checked[item] ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-600 dark:text-slate-300'}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
        {Object.values(checked).filter(Boolean).length === 4 && (
          <p className="mt-3 text-sm font-bold text-emerald-600">{ui.allGood}</p>
        )}
      </div>
    </div>
  );
}
