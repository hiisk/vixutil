'use client';
import { useMemo, useState } from 'react';
import { toKoreanAmount, toKoreanNumber, toReadable, withCommas, MAX_DIGITS } from '@/lib/korean-amount';
import { CARD, CopyRow } from './ui';

const PRESETS = [50000, 500000, 3500000, 100000000];

export default function AmountTool() {
  const [raw, setRaw] = useState('');

  const digits = raw.replace(/[^\d]/g, '');
  const tooLong = digits.length > MAX_DIGITS;

  const out = useMemo(() => {
    if (!digits || tooLong) return null;
    return {
      formal: toKoreanAmount(digits, { formal: true }),
      formalNumber: toKoreanNumber(digits, { formal: true }),
      casual: toKoreanNumber(digits, { formal: false }),
      readable: toReadable(digits),
      commas: `${withCommas(digits)}원`,
    };
  }, [digits, tooLong]);

  return (
    <div>
      <label className="block">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">금액 (숫자)</span>
        <div className="relative">
          <input
            value={withCommas(raw)}
            onChange={e => setRaw(e.target.value)}
            inputMode="numeric"
            placeholder="3500000"
            className="w-full rounded-lg border chip-off px-4 py-3.5 pr-12 text-xl font-black text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 tabular-nums focus:outline-none focus:border-indigo-400 transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 dark:text-slate-500">원</span>
        </div>
      </label>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {PRESETS.map(p => (
          <button
            key={p}
            onClick={() => setRaw(String(p))}
            className="foot-chip tabular-nums"
          >
            {withCommas(p)}
          </button>
        ))}
      </div>

      {tooLong && (
        <p className="mt-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 px-4 py-3 text-xs text-rose-700 dark:text-rose-300">
          경(京) 단위를 넘는 숫자는 표기할 단위가 없습니다. {MAX_DIGITS}자리까지 넣어주세요.
        </p>
      )}

      {out && (
        <>
          <div className="flex flex-col gap-2 mt-4">
            <CopyRow label="계약서·봉투용 (정식)" value={out.formal} hint="위조를 막으려고 십·백·천 앞의 '일'도 살립니다" accent />
            <CopyRow label="한글 수사만" value={out.formalNumber} />
            <CopyRow label="읽는 대로 (간략)" value={out.casual} hint="말할 때 쓰는 형태" />
            <CopyRow label="억·만 단위로 끊어 읽기" value={out.readable} hint="큰 금액은 이 형태가 가장 빨리 읽힙니다" />
            <CopyRow label="세 자리 쉼표" value={out.commas} />
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">왜 한글로 또 적나요?</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              숫자 3,500,000은 앞에 1을 붙이면 35,000,000이 되지만, 한글로 적힌 &lsquo;삼백오십만&rsquo;은 고치기 어렵습니다.
              계약서와 영수증이 금액을 두 번 적는 이유이고, 정식 표기에서 &lsquo;일십&rsquo;·&lsquo;일백&rsquo;처럼 앞의 일을
              생략하지 않는 이유도 빈자리를 남기지 않기 위해서입니다.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
