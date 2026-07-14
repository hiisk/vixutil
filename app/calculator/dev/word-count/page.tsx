'use client';
import { useState, useMemo } from 'react';
import CalcShell, { Card } from '@/components/CalcShell';

function getByteLength(str: string): number {
  return new TextEncoder().encode(str).length;
}

function countStats(text: string) {
  const totalChars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  // 문장: .!? 로 끝나는 경우 카운트 (빈 텍스트 제외)
  const sentences = text.trim() === '' ? 0 : (text.match(/[.!?。！？]+/g) || []).length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const bytes = getByteLength(text);
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim()).length;

  return { totalChars, charsNoSpace, words, sentences, lines, bytes, paragraphs };
}

const STAT_ITEMS: { key: keyof ReturnType<typeof countStats>; label: string; sub: string; color: string }[] = [
  { key: 'totalChars',   label: '전체 글자수',    sub: '공백 포함',        color: 'text-blue-700' },
  { key: 'charsNoSpace', label: '글자수',          sub: '공백 제외',        color: 'text-indigo-700' },
  { key: 'words',        label: '단어수',          sub: '공백 기준',        color: 'text-violet-700' },
  { key: 'sentences',    label: '문장수',          sub: '.!? 기준',         color: 'text-purple-700' },
  { key: 'lines',        label: '줄 수',           sub: '개행 기준',        color: 'text-slate-700 dark:text-slate-200' },
  { key: 'paragraphs',   label: '단락수',          sub: '빈 줄 기준',       color: 'text-slate-600 dark:text-slate-300' },
  { key: 'bytes',        label: '바이트수',        sub: 'UTF-8',            color: 'text-emerald-700' },
];

export default function WordCountPage() {
  const [text, setText] = useState('');

  const stats = useMemo(() => countStats(text), [text]);

  return (
    <CalcShell title="글자수·단어수 카운터" description="전체 글자수 · 공백 제외 · 단어수 · 문장수 · 바이트 수 실시간 카운트" wide>
      <div className="flex flex-col gap-4">
        {/* 통계 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STAT_ITEMS.slice(0, 4).map(item => (
            <div key={item.key} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
              <p className={`text-2xl font-black ${item.color}`}>
                {stats[item.key].toLocaleString('ko-KR')}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {STAT_ITEMS.slice(4).map(item => (
            <div key={item.key} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
              <p className={`text-2xl font-black ${item.color}`}>
                {stats[item.key].toLocaleString('ko-KR')}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* 텍스트 입력 */}
        <Card className="p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">텍스트 입력</p>
            {text && (
              <button
                onClick={() => setText('')}
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors font-semibold"
              >
                지우기
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="여기에 텍스트를 입력하면 실시간으로 글자수가 카운트됩니다..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            rows={12}
          />
          <div className="flex justify-between items-center mt-2 text-xs text-slate-400 dark:text-slate-500">
            <span>실시간 카운트 · 입력 즉시 반영</span>
            <span>{stats.totalChars.toLocaleString('ko-KR')} 자</span>
          </div>
        </Card>

        {/* 상세 분석 */}
        {text && (
          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">상세 분석</p>
            <div className="flex flex-col divide-y divide-slate-100">
              {STAT_ITEMS.map(item => (
                <div key={item.key} className="flex justify-between items-center py-2.5">
                  <div>
                    <span className="text-sm text-slate-700 dark:text-slate-200 font-semibold">{item.label}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">{item.sub}</span>
                  </div>
                  <span className={`text-base font-black font-mono ${item.color}`}>
                    {stats[item.key].toLocaleString('ko-KR')}
                    {item.key === 'bytes' ? ' B' : ''}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
