'use client';
import { useState } from 'react';
import CalcShell, { Card, Label } from '@/components/CalcShell';

const areaCls = 'w-full bg-slate-900 text-green-400 font-mono text-sm rounded-xl p-4 resize-y min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700';

const FLAGS = ['g', 'i', 'm', 's'] as const;

export default function RegexPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState<Set<string>>(new Set(['g']));
  const [testStr, setTestStr] = useState('');

  const toggleFlag = (f: string) => {
    setFlags(prev => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f); else next.add(f);
      return next;
    });
  };

  const result = (() => {
    if (!pattern || !testStr) return null;
    try {
      const flagStr = [...flags].join('');
      const re = new RegExp(pattern, flagStr.includes('g') ? flagStr : flagStr + 'g');
      const matches = [...testStr.matchAll(re)];
      return { matches, error: null };
    } catch (e) {
      return { matches: [], error: String(e) };
    }
  })();

  return (
    <CalcShell title="Regex Tester" description="정규식 실시간 테스트 및 매치 확인" wide>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <Label>정규식 패턴 (/ 없이 입력)</Label>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-400 dark:text-slate-500 font-mono">/</span>
            <input type="text" value={pattern} onChange={e => setPattern(e.target.value)}
              placeholder="예: \d{3}-\d{4}-\d{4}" className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span className="text-slate-400 dark:text-slate-500 font-mono">/</span>
            <div className="flex gap-1">
              {FLAGS.map(f => (
                <button key={f} onClick={() => toggleFlag(f)}
                  className={`w-8 h-8 rounded-lg text-sm font-mono font-bold transition-colors ${flags.has(f) ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <Label>테스트 문자열</Label>
          <textarea value={testStr} onChange={e => setTestStr(e.target.value)}
            placeholder="정규식을 테스트할 텍스트 입력" className={areaCls} />
        </Card>

        {result && (
          <Card className="p-4">
            {result.error ? (
              <p className="text-red-500 text-sm font-mono">오류: {result.error}</p>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">매치 결과</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${result.matches.length > 0 ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                    {result.matches.length}개 매치
                  </span>
                </div>
                {result.matches.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-950">
                        <tr>
                          <th className="px-3 py-2 text-left font-bold text-slate-500 dark:text-slate-400">#</th>
                          <th className="px-3 py-2 text-left font-bold text-slate-500 dark:text-slate-400">매치값</th>
                          <th className="px-3 py-2 text-left font-bold text-slate-500 dark:text-slate-400">위치</th>
                          <th className="px-3 py-2 text-left font-bold text-slate-500 dark:text-slate-400">그룹</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.matches.slice(0, 20).map((m, i) => (
                          <tr key={i}>
                            <td className="px-3 py-2 text-slate-400 dark:text-slate-500">{i + 1}</td>
                            <td className="px-3 py-2 font-mono text-blue-600 font-bold">{m[0]}</td>
                            <td className="px-3 py-2 text-slate-500 dark:text-slate-400">{m.index}</td>
                            <td className="px-3 py-2 font-mono text-slate-500 dark:text-slate-400">
                              {m.slice(1).length > 0 ? m.slice(1).join(', ') : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-slate-400 dark:text-slate-500 text-sm">매치 없음</p>
                )}
              </>
            )}
          </Card>
        )}
      </div>
    </CalcShell>
  );
}
