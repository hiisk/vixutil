'use client';
import { useMemo, useState } from 'react';
import { romanizeName, splitName } from '@/lib/romanize';
import { CARD, CopyRow, Stat } from './ui';

const EXAMPLES = ['홍길동', '이지은', '박서준', '남궁민수', '최우식'];

export default function RomanizeTool() {
  const [name, setName] = useState('');
  const [override, setOverride] = useState<number | null>(null);

  const auto = splitName(name);
  const familyLen = override ?? auto.family.length;
  const adjusted = useMemo(() => {
    const clean = name.trim().replace(/\s+/g, '');
    if (!clean) return '';
    return `${clean.slice(0, familyLen)} ${clean.slice(familyLen)}`.trim();
  }, [name, familyLen]);

  const result = adjusted ? romanizeName(adjusted) : null;

  return (
    <div>
      <label className="block">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">한글 이름</span>
        <input
          value={name}
          onChange={e => { setName(e.target.value); setOverride(null); }}
          placeholder="예) 홍길동"
          className="w-full rounded-2xl border chip-off px-4 py-3.5 text-lg font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-400 transition-colors"
        />
      </label>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {EXAMPLES.map(e => (
          <button
            key={e}
            onClick={() => { setName(e); setOverride(null); }}
            className="foot-chip"
          >
            {e}
          </button>
        ))}
      </div>

      {result && (
        <>
          {/* 성이 몇 글자인지 — 황보라(황보+라 / 황+보라)처럼 기계가 알 수 없는 경우가 있다 */}
          <div className={`${CARD} mt-4`}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">성이 몇 글자인가요?</p>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map(n => (
                <button
                  key={n}
                  onClick={() => setOverride(n)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${
                    familyLen === n
                      ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {n}글자 성
                  <span className="block text-[11px] font-normal text-slate-400 dark:text-slate-500 mt-0.5">
                    {name.trim().replace(/\s+/g, '').slice(0, n) || '—'} · {name.trim().replace(/\s+/g, '').slice(n) || '—'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Stat label="성" value={result.family || '—'} accent="text-indigo-600" />
            <Stat label="이름" value={result.given || '—'} accent="text-indigo-600" />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <CopyRow
              label="여권 표기 (가장 많이 씁니다)"
              value={result.passport}
              hint="여권 영문 이름은 대문자로 적습니다"
              accent
            />
            <CopyRow label="관용 표기" value={result.common} hint={result.familyDiffers ? `성을 관례대로 적은 형태 — 표기법대로면 ${result.standard.split(' ')[0]}` : '표기법과 같습니다'} />
            <CopyRow label="붙임표 표기" value={result.hyphen} hint="규정이 허용하는 형태로, 이름 두 음절을 구분해 줍니다" />
            <CopyRow label="국어의 로마자 표기법 그대로" value={result.standard} hint="공문서·논문에서 요구하는 표기" />
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">알아두면 좋은 것</p>
            <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <li>· 이름은 음운 변화를 반영하지 않습니다. 빛나는 [빈나]로 읽혀도 <b className="text-slate-800 dark:text-slate-100">Bitna</b>로 적습니다.</li>
              <li>· 여권을 한 번 만들면 영문 이름은 바꾸기 어렵습니다. 가족과 성 표기를 맞추는 편이 좋습니다.</li>
              <li>· 항공권 이름은 여권과 <b className="text-slate-800 dark:text-slate-100">철자까지 같아야</b> 합니다.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
