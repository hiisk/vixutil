'use client';
import { useMemo, useState } from 'react';
import { countText } from '@/lib/text-clean';
import { CARD, InputArea, Stat } from './ui';

/** 자기소개서에서 흔히 요구하는 글자 수 */
const TARGETS = [500, 800, 1000, 1500];

export default function ManuscriptTool() {
  const [text, setText] = useState('');
  const [target, setTarget] = useState(1000);
  const [countSpace, setCountSpace] = useState(true);

  const stats = useMemo(() => countText(text), [text]);
  const used = countSpace ? stats.chars : stats.charsNoSpace;
  const left = target - used;
  const ratio = Math.min(100, Math.round((used / target) * 100));

  return (
    <div>
      <InputArea value={text} onChange={setText} rows={9} label="글을 붙여 넣으세요" placeholder="자기소개서나 원고를 그대로 붙여 넣으면 됩니다" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        <Stat label="공백 포함" value={stats.chars} accent="text-indigo-600" />
        <Stat label="공백 제외" value={stats.charsNoSpace} accent="text-violet-600" />
        <Stat label="200자 원고지" value={`${stats.sheets200}매`} />
        <Stat label="400자 원고지" value={`${stats.sheets400}매`} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
        <Stat label="단어" value={stats.words} />
        <Stat label="줄" value={stats.lines} />
        <Stat label="문단" value={stats.paragraphs} />
        <Stat label="바이트(UTF-8)" value={stats.bytes} />
      </div>

      <div className={`${CARD} mt-4`}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">목표 글자수</p>
          <button
            onClick={() => setCountSpace(v => !v)}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            {countSpace ? '공백 포함으로 세는 중' : '공백 제외로 세는 중'}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {TARGETS.map(t => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors tabular-nums ${
                target === t
                  ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200'
              }`}
            >
              {t}자
            </button>
          ))}
        </div>

        <div className="mt-4 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-[width] ${left < 0 ? 'bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-violet-600'}`}
            style={{ width: `${ratio}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-bold text-center">
          {text === '' ? (
            <span className="text-slate-400 dark:text-slate-500">글을 넣으면 남은 글자수를 세어 드립니다</span>
          ) : left >= 0 ? (
            <span className="text-slate-600 dark:text-slate-300">
              {used}자 / {target}자 · <span className="text-indigo-600">{left}자 더 쓸 수 있습니다</span>
            </span>
          ) : (
            <span className="text-rose-500">{used}자 / {target}자 · {-left}자 초과했습니다</span>
          )}
        </p>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">기준이 헷갈릴 때</p>
        <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <li>· 자기소개서는 대개 <b className="text-slate-800 dark:text-slate-100">공백 포함</b>으로 셉니다. 채용 공고에 명시가 없으면 공백 포함으로 맞추는 편이 안전합니다.</li>
          <li>· 원고지는 칸을 세므로 띄어쓰기도 한 칸을 차지합니다. 그래서 원고지 매수는 공백 포함 글자수로 계산합니다.</li>
          <li>· 입력창에 글자수 제한이 걸린 사이트는 대부분 공백을 포함해 셉니다.</li>
        </ul>
      </div>
    </div>
  );
}
