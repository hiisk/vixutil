'use client';
import { useState } from 'react';
import CalcShell, { Card, PrimaryBtn } from '@/components/CalcShell';

// LCS 기반 줄 단위 diff 알고리즘 (외부 라이브러리 없이 직접 구현)
type DiffLine =
  | { type: 'equal';   value: string; leftNo: number; rightNo: number }
  | { type: 'insert';  value: string; leftNo: null;   rightNo: number }
  | { type: 'delete';  value: string; leftNo: number; rightNo: null };

function computeLCS(a: string[], b: string[]): number[][] {
  // 메모리 절약: 최대 1000줄 × 1000줄 = 100만 셀
  const MAX = 1000;
  const aSlice = a.slice(0, MAX);
  const bSlice = b.slice(0, MAX);
  const dp: number[][] = Array.from({ length: aSlice.length + 1 }, () =>
    new Array(bSlice.length + 1).fill(0)
  );

  for (let i = 1; i <= aSlice.length; i++) {
    for (let j = 1; j <= bSlice.length; j++) {
      if (aSlice[i - 1] === bSlice[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

function diffLines(original: string, modified: string): DiffLine[] {
  const a = original.split('\n');
  const b = modified.split('\n');
  const MAX = 1000;
  const aSlice = a.slice(0, MAX);
  const bSlice = b.slice(0, MAX);

  const dp = computeLCS(aSlice, bSlice);
  const result: DiffLine[] = [];

  let i = aSlice.length;
  let j = bSlice.length;
  const ops: Array<{ type: 'equal' | 'insert' | 'delete'; a?: number; b?: number }> = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aSlice[i - 1] === bSlice[j - 1]) {
      ops.push({ type: 'equal', a: i - 1, b: j - 1 });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: 'insert', b: j - 1 });
      j--;
    } else {
      ops.push({ type: 'delete', a: i - 1 });
      i--;
    }
  }

  ops.reverse();

  // 줄 번호 부여
  let leftNo = 1;
  let rightNo = 1;
  for (const op of ops) {
    if (op.type === 'equal') {
      result.push({ type: 'equal', value: aSlice[op.a!], leftNo: leftNo++, rightNo: rightNo++ });
    } else if (op.type === 'insert') {
      result.push({ type: 'insert', value: bSlice[op.b!], leftNo: null, rightNo: rightNo++ });
    } else {
      result.push({ type: 'delete', value: aSlice[op.a!], leftNo: leftNo++, rightNo: null });
    }
  }

  // MAX 초과분 처리 (단순 추가)
  if (a.length > MAX) {
    for (let k = MAX; k < a.length; k++) {
      result.push({ type: 'delete', value: a[k], leftNo: leftNo++, rightNo: null });
    }
  }
  if (b.length > MAX) {
    for (let k = MAX; k < b.length; k++) {
      result.push({ type: 'insert', value: b[k], leftNo: null, rightNo: rightNo++ });
    }
  }

  return result;
}

const textareaClass =
  'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none font-mono';

export default function DiffPage() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffResult, setDiffResult] = useState<DiffLine[] | null>(null);

  function compare() {
    setDiffResult(diffLines(original, modified));
  }

  const stats = diffResult
    ? {
        added:   diffResult.filter(d => d.type === 'insert').length,
        deleted: diffResult.filter(d => d.type === 'delete').length,
        equal:   diffResult.filter(d => d.type === 'equal').length,
      }
    : null;

  return (
    <CalcShell title="텍스트 비교 (Diff)" description="줄 단위 LCS 알고리즘 · 추가(녹색) · 삭제(빨간색) · 동일(회색)" wide>
      <div className="flex flex-col gap-4">
        {/* 입력 영역 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">원본 (Original)</p>
              <span className="text-xs text-slate-400">{original.split('\n').length}줄</span>
            </div>
            <textarea
              value={original}
              onChange={e => { setOriginal(e.target.value); setDiffResult(null); }}
              placeholder="원본 텍스트를 입력하세요..."
              className={textareaClass}
              rows={10}
            />
          </Card>
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">변경본 (Modified)</p>
              <span className="text-xs text-slate-400">{modified.split('\n').length}줄</span>
            </div>
            <textarea
              value={modified}
              onChange={e => { setModified(e.target.value); setDiffResult(null); }}
              placeholder="변경된 텍스트를 입력하세요..."
              className={textareaClass}
              rows={10}
            />
          </Card>
        </div>

        <PrimaryBtn onClick={compare}>비교하기</PrimaryBtn>

        {diffResult && stats && (
          <>
            {/* 통계 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-emerald-700">+{stats.added}</p>
                <p className="text-xs text-emerald-600 mt-1">추가된 줄</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-red-600">-{stats.deleted}</p>
                <p className="text-xs text-red-500 mt-1">삭제된 줄</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-slate-500">{stats.equal}</p>
                <p className="text-xs text-slate-400 mt-1">동일한 줄</p>
              </div>
            </div>

            {/* Diff 결과 */}
            {stats.added === 0 && stats.deleted === 0 ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                <p className="text-emerald-700 font-bold text-sm">두 텍스트가 완전히 동일합니다.</p>
              </div>
            ) : (
              <Card className="p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Diff 결과</p>
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="w-10 py-2 px-2 text-center text-slate-400 font-semibold border-r border-slate-100">원본</th>
                        <th className="w-10 py-2 px-2 text-center text-slate-400 font-semibold border-r border-slate-100">변경</th>
                        <th className="w-8 py-2 px-2 text-center text-slate-400 font-semibold border-r border-slate-100"></th>
                        <th className="py-2 px-3 text-left text-slate-400 font-semibold">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diffResult.map((line, idx) => {
                        const isInsert = line.type === 'insert';
                        const isDelete = line.type === 'delete';
                        const rowCls = isInsert
                          ? 'bg-emerald-50'
                          : isDelete
                          ? 'bg-red-50'
                          : '';
                        const textCls = isInsert
                          ? 'text-emerald-700'
                          : isDelete
                          ? 'text-red-600'
                          : 'text-slate-500';
                        const marker = isInsert ? '+' : isDelete ? '-' : ' ';
                        const markerCls = isInsert
                          ? 'text-emerald-600 font-bold bg-emerald-100'
                          : isDelete
                          ? 'text-red-500 font-bold bg-red-100'
                          : 'text-slate-300';

                        return (
                          <tr key={idx} className={`border-b border-slate-50 ${rowCls}`}>
                            <td className="py-1 px-2 text-center text-slate-300 border-r border-slate-100 select-none">
                              {line.leftNo ?? ''}
                            </td>
                            <td className="py-1 px-2 text-center text-slate-300 border-r border-slate-100 select-none">
                              {line.rightNo ?? ''}
                            </td>
                            <td className={`py-1 px-2 text-center border-r border-slate-100 select-none ${markerCls}`}>
                              {marker}
                            </td>
                            <td className={`py-1 px-3 whitespace-pre-wrap break-all ${textCls}`}>
                              {line.value}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-4 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-emerald-200 inline-block" />
                    추가
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-red-200 inline-block" />
                    삭제
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-slate-100 inline-block" />
                    동일
                  </span>
                  <span className="ml-auto">최대 1,000줄 지원</span>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </CalcShell>
  );
}
