'use client';
import { useState } from 'react';

/* 사이트 공용 입력칸. 예전에는 여기에 클래스를 길게 적어 두어서 이 칸만 다른
   모양이었고, 초점 테두리도 파랑으로 박혀 있어 갈래 색을 안 따라갔다.
   className=""를 넘기면 이 기본값이 빠지고 부모가 생김새를 정한다(.dial). */
const defaultCls = 'fld w-full';

export default function CommaInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [raw, setRaw] = useState('');

  function handleFocus() {
    setFocused(true);
    setRaw(value > 0 ? String(value) : '');
  }

  function handleBlur() {
    setFocused(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.replace(/[^\d]/g, '');
    setRaw(cleaned);
    onChange(cleaned ? Number(cleaned) : 0);
  }

  const display = focused
    ? raw
    : value > 0
    ? value.toLocaleString('ko-KR')
    : '';

  return (
    <input
      type="text"
      inputMode="numeric"
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className ?? defaultCls}
    />
  );
}
