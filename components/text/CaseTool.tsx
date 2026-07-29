'use client';
import { useMemo, useState } from 'react';
import { convertCase } from '@/lib/text-clean';
import { CARD, CopyRow, InputArea } from './ui';

const ROWS: { key: keyof ReturnType<typeof convertCase>; label: string; hint?: string }[] = [
  { key: 'upper', label: '전부 대문자 (UPPERCASE)' },
  { key: 'lower', label: '전부 소문자 (lowercase)' },
  { key: 'title', label: '단어 첫 글자만 대문자 (Title Case)', hint: '제목·이름에 씁니다' },
  { key: 'sentence', label: '문장 첫 글자만 대문자 (Sentence case)' },
  { key: 'camel', label: 'camelCase', hint: '변수 이름' },
  { key: 'pascal', label: 'PascalCase', hint: '클래스·컴포넌트 이름' },
  { key: 'snake', label: 'snake_case', hint: 'DB 컬럼·파이썬' },
  { key: 'kebab', label: 'kebab-case', hint: 'URL·CSS 클래스' },
  { key: 'constant', label: 'CONSTANT_CASE', hint: '환경변수·상수' },
  { key: 'toggle', label: '대소문자 뒤집기' },
];

export default function CaseTool() {
  const [text, setText] = useState('');
  const result = useMemo(() => convertCase(text), [text]);

  return (
    <div>
      <InputArea
        value={text}
        onChange={setText}
        rows={4}
        label="영문 텍스트를 입력하세요"
        placeholder="예) hello world example"
      />

      <div className="flex flex-col gap-2 mt-4">
        {ROWS.map(r => (
          <CopyRow key={r.key} label={r.label} value={text ? result[r.key] : ''} hint={r.hint} />
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">한글은 어떻게 되나요?</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          한글에는 대문자와 소문자가 없어서 그대로 남습니다. 영문과 한글이 섞인 문장을 넣으면
          영문 부분만 바뀝니다.
        </p>
      </div>
    </div>
  );
}
