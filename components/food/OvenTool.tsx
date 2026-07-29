'use client';
import { useMemo, useState } from 'react';
import { cToF, fToC, gasMark, toAirFryer } from '@/lib/food';
import { CARD, NumberField, Result, Stat } from './ui';

const PRESETS = [160, 170, 180, 190, 200, 220];

export default function OvenTool() {
  const [celsius, setCelsius] = useState(180);
  const [minutes, setMinutes] = useState(25);
  const [input, setInput] = useState<'c' | 'f'>('c');
  const [fahrenheit, setFahrenheit] = useState(350);

  const c = input === 'c' ? celsius : fToC(fahrenheit);
  const air = useMemo(() => toAirFryer(c, minutes), [c, minutes]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {([['c', '섭씨(℃)로 입력'], ['f', '화씨(°F)로 입력']] as const).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setInput(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              input === v
                ? 'border-orange-300 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {input === 'c'
          ? <NumberField label="오븐 온도" value={celsius} onChange={setCelsius} unit="℃" step={5} />
          : <NumberField label="오븐 온도" value={fahrenheit} onChange={setFahrenheit} unit="°F" step={25} />}
        <NumberField label="굽는 시간" value={minutes} onChange={setMinutes} unit="분" step={5} />
      </div>

      <Result sub={`가스마크 ${gasMark(c)} · ${minutes}분`}>
        {c}<span className="text-xl">℃</span> = {cToF(c)}<span className="text-xl">°F</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label="섭씨" value={`${c}℃`} accent="text-orange-600" />
        <Stat label="화씨" value={`${cToF(c)}°F`} />
        <Stat label="가스마크" value={gasMark(c)} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">에어프라이어로 만든다면</p>
        <p className="text-2xl font-black text-red-600">
          {air.celsius}℃ · {air.minutes}분
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          온도를 20도 낮추고 시간을 20% 줄인 값입니다. 뜨거운 바람이 재료에 직접 닿아 같은 온도라도
          훨씬 빨리 익기 때문입니다. 중간에 한 번 열어 확인하는 편이 안전합니다.
        </p>
      </div>

      <div className="grid grid-cols-6 gap-2 mt-4">
        {PRESETS.map(p => (
          <button
            key={p}
            onClick={() => { setInput('c'); setCelsius(p); }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-orange-300 transition-colors"
          >
            {p}℃
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          가정용 오븐은 표시 온도와 실제 온도가 20도까지 차이 나기도 합니다. 자주 쓰는 오븐이라면
          오븐 온도계를 하나 두고 실제 온도를 확인해 보세요. 예열은 표시등이 꺼진 뒤에도 5분쯤 더
          기다리는 편이 확실합니다.
        </p>
      </div>
    </div>
  );
}
