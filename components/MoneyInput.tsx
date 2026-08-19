'use client';
import { useState } from 'react';

/**
 * 돈 칸 (2026-08-19).
 *
 * ── 왜 만들었나 ──────────────────────────────────────────────────
 * 계산기 119곳이 돈을 `<input type="number">`로 받고 있었다. 숫자 칸은 쉼표를
 * 못 넣으므로 화면에 «100000000»이 그대로 뜬다 — 1억인지 10억인지 자릿수를 세야
 * 안다. 돈을 다루는 계산기에서 이보다 크게 걸리는 것이 없다.
 *
 * 이미 CommaInput이 있지만 그쪽은 값을 **숫자**로 주고받는다. 여기 낱장들은
 * 상태가 문자열(useState(''))이라 그대로는 못 끼운다. 문자열 그대로 주고받는
 * 한 벌을 따로 두는 편이, 낱장 119곳의 상태 타입을 바꾸는 것보다 작다.
 *
 * ── 한글 단위를 함께 보여 준다 ──────────────────────────────────
 * 쉼표만으로는 «300,000,000»이 3억인지 30억인지 여전히 한 박자 걸린다. 값이 만
 * 단위를 넘으면 아래에 «3억원»을 적는다. 한국에서 큰 돈은 억·만으로 읽지
 * 자릿수로 읽지 않는다.
 */

/** 1234567890 → "12억 3456만" — 0인 자리는 건너뛴다 */
export function koreanMoney(n: number): string {
  if (!Number.isFinite(n) || n < 10000) return '';
  const 조 = Math.floor(n / 1_0000_0000_0000);
  const 억 = Math.floor((n % 1_0000_0000_0000) / 1_0000_0000);
  const 만 = Math.floor((n % 1_0000_0000) / 1_0000);
  return [
    조 && `${조}조`,
    억 && `${억}억`,
    만 && `${만.toLocaleString()}만`,
  ].filter(Boolean).join(' ') + '원';
}

export default function MoneyInput({
  value,
  onChange,
  placeholder,
  className = 'dial-input',
}: {
  /** 문자열 그대로 — 낱장의 useState('')를 그대로 쓴다 */
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  /*
   * 고쳐 쓰는 동안에는 쉼표를 넣지 않는다. 넣으면 커서가 매 글자마다 끝으로
   * 튀어서 가운데를 고칠 수가 없다. 초점을 잃을 때 정리해 보여 준다.
   */
  const [focused, setFocused] = useState(false);
  const digits = value.replace(/[^\d]/g, '');
  const n = Number(digits);
  const shown = focused || !digits ? value : n.toLocaleString('ko-KR');
  const hint = koreanMoney(n);

  return (
    <>
      <input
        type="text"
        inputMode="numeric"
        value={shown}
        onChange={e => onChange(e.target.value.replace(/[^\d]/g, ''))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={className}
      />
      {hint && <p className="money-hint">{hint}</p>}
    </>
  );
}
