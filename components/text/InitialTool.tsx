'use client';
import { useMemo, useState } from 'react';
import { initials, toJamo } from '@/lib/hangul';
import { CARD, CopyBox, InputArea, Toggle } from './ui';

export default function InitialTool() {
  const [text, setText] = useState('');
  const [keepSpace, setKeepSpace] = useState(true);
  const [showJamo, setShowJamo] = useState(false);

  const result = useMemo(() => {
    if (!text) return '';
    const out = initials(text, keepSpace);
    // 띄어쓰기를 지우기로 했으면 한글이 아닌 것은 전부 뺀다
    return keepSpace ? out : out.replace(/[^ㄱ-ㅎ]/g, '');
  }, [text, keepSpace]);

  const jamo = useMemo(() => (showJamo && text ? toJamo(text).join(' ') : ''), [showJamo, text]);

  return (
    <div>
      <InputArea
        value={text}
        onChange={setText}
        rows={4}
        label="문장을 입력하세요"
        placeholder="예) 오늘도 좋은 하루 되세요"
      />

      <div className={`${CARD} mt-4`}>
        <Toggle
          checked={keepSpace}
          onChange={setKeepSpace}
          label="띄어쓰기와 문장부호 유지"
          hint="끄면 초성만 붙여서 나옵니다"
        />
        <Toggle
          checked={showJamo}
          onChange={setShowJamo}
          label="자모 분해도 함께 보기"
          hint="한 → ㅎ ㅏ ㄴ 처럼 낱자로 나눕니다"
        />
      </div>

      <CopyBox value={result} label="초성" rows={3} />

      {jamo && <CopyBox value={jamo} label="자모 분해" rows={3} mono />}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">초성 퀴즈로 쓰기</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          노래 제목이나 영화 제목을 넣고 초성만 남겨 문제로 내보세요. 띄어쓰기를 남겨 두면
          몇 글자짜리 단어인지가 힌트가 되어 난이도가 확 내려갑니다 — 어렵게 내려면 띄어쓰기를 끄세요.
        </p>
      </div>
    </div>
  );
}
