'use client';
import { useState, useEffect } from 'react';
import { Card, Label, inputCls, selectCls } from '@/components/CalcShell';
import { EXCHANGE } from '@/lib/calc-l10n/exchange';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

const CODES = [
  'USD', 'EUR', 'JPY', 'GBP', 'CNY', 'KRW', 'INR', 'BRL',
  'CAD', 'AUD', 'CHF', 'HKD', 'SGD', 'TWD', 'MXN', 'SEK', 'ZAR', 'TRY',
];

export default function ExchangeIntl({ lang }: { lang: CalcLang }) {
  const c = EXCHANGE[lang].ui;
  const tag = localeTag(lang);
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState(c.defFrom);
  const [to, setTo] = useState(c.defTo);
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [date, setDate] = useState('');
  const [state, setState] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    // USD를 축으로 받아서 두 통화 사이를 나눠 쓴다 — 어느 쌍이든 한 번의 요청으로 끝난다.
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(r => r.json())
      .then(d => { setRates(d.rates); setDate(d.date ?? ''); setState('ready'); })
      .catch(() => setState('failed'));
  }, []);

  // 통화 이름은 브라우저가 언어별로 들고 있다 — 열여덟 개를 아홉 번 적을 이유가 없다.
  const names = (() => {
    try {
      const dn = new Intl.DisplayNames([tag], { type: 'currency' });
      return Object.fromEntries(CODES.map(code => [code, dn.of(code) ?? code]));
    } catch {
      return Object.fromEntries(CODES.map(code => [code, code]));
    }
  })();

  const rate = rates && rates[from] && rates[to] ? rates[to] / rates[from] : null;
  const value = rate !== null && amount !== '' ? Number(amount) * rate : null;

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: n < 1 ? 6 : 2 });

  return (
    <div className="flex flex-col gap-4">
      {/* 폼은 환율을 기다리지 않고 먼저 그린다 — 통화 목록만으로도 읽을 것이 있다. */}
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.amount}</Label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
            <div>
              <Label>{c.from}</Label>
              <select value={from} onChange={e => setFrom(e.target.value)} className={selectCls}>
                {CODES.map(code => <option key={code} value={code}>{code} · {names[code]}</option>)}
              </select>
            </div>
            <button
              type="button"
              onClick={() => { setFrom(to); setTo(from); }}
              aria-label={c.swap}
              className="h-[46px] px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-300 transition-colors"
            >
              ⇄
            </button>
            <div>
              <Label>{c.to}</Label>
              <select value={to} onChange={e => setTo(e.target.value)} className={selectCls}>
                {CODES.map(code => <option key={code} value={code}>{code} · {names[code]}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {state === 'loading' && (
        <Card className="p-6 text-center text-slate-400 dark:text-slate-500 text-sm">{c.loading}</Card>
      )}
      {state === 'failed' && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-4 py-3 text-red-600 text-sm">
          {c.failed}
        </div>
      )}
      {state === 'ready' && value !== null && rate !== null && (
        <div className="stat-pri">
          <p className="stat-label">{c.result}</p>
          <p className="stat-value">{fmt(value)} {to}</p>
          <p className="stat-sub">{c.rateLine} 1 {from} = {fmt(rate)} {to}</p>
          {date && <p className="text-slate-500 dark:text-slate-400/70 text-xs mt-1">{c.updated} {date}</p>}
        </div>
      )}
    </div>
  );
}
