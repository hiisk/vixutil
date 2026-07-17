'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';

type Base = 2 | 8 | 10 | 16;

const BASE_OPTIONS: { value: Base; label: string; prefix: string }[] = [
  { value: 2,  label: '2진수 (Binary)',      prefix: '0b' },
  { value: 8,  label: '8진수 (Octal)',       prefix: '0o' },
  { value: 10, label: '10진수 (Decimal)',    prefix: '' },
  { value: 16, label: '16진수 (Hexadecimal)', prefix: '0x' },
];

// 2진수를 4자리씩 띄어쓰기
function formatBinary(bin: string): string {
  const padded = bin.padStart(Math.ceil(bin.length / 4) * 4, '0');
  return padded.match(/.{1,4}/g)?.join(' ') ?? padded;
}

function validateInput(val: string, base: Base): boolean {
  if (!val) return false;
  const patterns: Record<Base, RegExp> = {
    2:  /^[01]+$/,
    8:  /^[0-7]+$/,
    10: /^-?\d+$/,
    16: /^[0-9a-fA-F]+$/,
  };
  return patterns[base].test(val.trim());
}

interface ConvertResult {
  bin: string;
  oct: string;
  dec: string;
  hex: string;
  binFormatted: string;
}

export default function BinaryPage() {
  const [value, setValue] = useState('');
  const [base, setBase] = useState<Base>(10);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    const trimmed = value.trim();
    if (!trimmed) { setError('값을 입력해주세요.'); return; }
    if (!validateInput(trimmed, base)) {
      setError(`${base}진수에 유효하지 않은 문자가 포함되어 있습니다.`);
      return;
    }
    const decimal = parseInt(trimmed, base);
    if (!isFinite(decimal)) { setError('변환할 수 없는 값입니다.'); return; }

    const bin = decimal >= 0 ? decimal.toString(2) : '-' + Math.abs(decimal).toString(2);
    setResult({
      bin,
      oct: decimal.toString(8),
      dec: decimal.toString(10),
      hex: decimal.toString(16).toUpperCase(),
      binFormatted: decimal >= 0
        ? formatBinary(decimal.toString(2))
        : '-' + formatBinary(Math.abs(decimal).toString(2)),
    });
  }

  const rows: { base: Base; label: string; value: string; display: string }[] = result
    ? [
        { base: 2,  label: '2진수 (Binary)',      value: result.bin, display: result.binFormatted },
        { base: 8,  label: '8진수 (Octal)',       value: result.oct, display: '0o' + result.oct },
        { base: 10, label: '10진수 (Decimal)',    value: result.dec, display: result.dec },
        { base: 16, label: '16진수 (Hexadecimal)', value: result.hex, display: '0x' + result.hex },
      ]
    : [];

  return (
    <CalcShell path="/calculator/binary" title="진수 변환기" description="2진수 · 8진수 · 10진수 · 16진수 상호 변환">
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">입력</p>
          <div className="flex flex-col gap-3">
            <div>
              <Label>진수 선택</Label>
              <select
                value={base}
                onChange={e => { setBase(Number(e.target.value) as Base); setResult(null); setError(''); }}
                className={selectCls}
              >
                {BASE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>값 입력
                {base === 16 && <span className="normal-case text-blue-400 font-normal ml-1">(0x 제외, 숫자+A-F)</span>}
                {base === 2  && <span className="normal-case text-blue-400 font-normal ml-1">(0과 1만 입력)</span>}
              </Label>
              <input
                type="text"
                value={value}
                onChange={e => { setValue(e.target.value); setResult(null); setError(''); }}
                placeholder={base === 16 ? 'FF' : base === 2 ? '1010' : base === 8 ? '77' : '255'}
                className={inputCls}
              />
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={calculate}>변환하기</PrimaryBtn>
          </div>
        </Card>

        {result && (
          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">변환 결과</p>
            <div className="flex flex-col divide-y divide-slate-100">
              {rows.map(r => (
                <div
                  key={r.base}
                  className={`py-4 ${r.base === base ? '' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm ${r.base === base ? 'text-blue-600 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                      {r.label}
                      {r.base === base && <span className="ml-1 text-xs text-blue-400">(입력)</span>}
                    </span>
                  </div>
                  <p className={`text-sm font-mono mt-1 break-all leading-relaxed ${r.base === base ? 'text-blue-700 dark:text-blue-300 font-bold' : 'text-slate-900 dark:text-slate-100 font-semibold'}`}>
                    {r.display}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 진수 빠른 참고표 */}
        <Card className="p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">빠른 참고표 (0 – 15)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-2 text-slate-400 dark:text-slate-500 font-semibold">DEC</th>
                  <th className="py-2 text-slate-400 dark:text-slate-500 font-semibold">HEX</th>
                  <th className="py-2 text-slate-400 dark:text-slate-500 font-semibold">OCT</th>
                  <th className="py-2 text-slate-400 dark:text-slate-500 font-semibold">BIN</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 16 }, (_, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="py-1.5 font-mono text-slate-700 dark:text-slate-200">{i}</td>
                    <td className="py-1.5 font-mono text-blue-600">0x{i.toString(16).toUpperCase()}</td>
                    <td className="py-1.5 font-mono text-slate-600 dark:text-slate-300">0o{i.toString(8)}</td>
                    <td className="py-1.5 font-mono text-slate-600 dark:text-slate-300">{formatBinary(i.toString(2))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </CalcShell>
  );
}
