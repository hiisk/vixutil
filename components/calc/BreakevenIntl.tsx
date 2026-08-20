'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { BREAKEVEN } from '@/lib/calc-l10n/breakeven';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'invest' | 'biz';

export default function BreakevenIntl({ lang }: { lang: CalcLang }) {
  const c = BREAKEVEN[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('invest');

  const [buyPrice, setBuyPrice] = useState('');
  const [buyFee, setBuyFee] = useState('0.1');
  const [sellFee, setSellFee] = useState('0.1');
  const [txTax, setTxTax] = useState('0');

  const [fixedCost, setFixedCost] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unitCost, setUnitCost] = useState('');

  const [invest, setInvest] = useState<{ price: number; rise: number } | null>(null);
  const [biz, setBiz] = useState<{ qty: number; sales: number; contribution: number } | null>(null);

  const fmt = (n: number, d = 2) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    if (mode === 'invest') {
      const p = parseFloat(buyPrice);
      const bf = (parseFloat(buyFee) || 0) / 100;
      const sf = (parseFloat(sellFee) || 0) / 100;
      const tt = (parseFloat(txTax) || 0) / 100;
      // 매도 쪽 비용이 100%를 넘으면 어떤 가격에도 본전이 안 나온다.
      if (!isFinite(p) || p <= 0 || sf + tt >= 1) return;
      const price = (p * (1 + bf)) / (1 - sf - tt);
      setInvest({ price, rise: (price / p - 1) * 100 });
    } else {
      const fc = parseFloat(fixedCost);
      const sp = parseFloat(unitPrice);
      const vc = parseFloat(unitCost);
      if (!isFinite(fc) || fc <= 0 || !isFinite(sp) || !isFinite(vc) || sp <= vc) return;
      const contribution = sp - vc;
      const qty = fc / contribution;
      setBiz({ qty, sales: qty * sp, contribution });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'invest' as Mode, label: c.tabInvest },
          { value: 'biz' as Mode, label: c.tabBiz },
        ]}
        value={mode}
        onChange={m => { setMode(m); setInvest(null); setBiz(null); }}
      />

      <Card className="p-5">
        {mode === 'invest' ? (
          <div className="flex flex-col gap-3">
            <div>
              <Label>{c.buyPrice}</Label>
              <input type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              <div>
                <Label>{c.buyFee}</Label>
                <input type="number" step="0.01" value={buyFee} onChange={e => setBuyFee(e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>{c.sellFee}</Label>
                <input type="number" step="0.01" value={sellFee} onChange={e => setSellFee(e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>{c.txTax}</Label>
                <input type="number" step="0.01" value={txTax} onChange={e => setTxTax(e.target.value)} className={inputCls} />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <Label>{c.fixedCost}</Label>
              <input type="number" value={fixedCost} onChange={e => setFixedCost(e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div>
                <Label>{c.unitPrice}</Label>
                <input type="number" value={unitPrice} onChange={e => setUnitPrice(e.target.value)} className={inputCls} />
              </div>
              <div>
                <Label>{c.unitCost}</Label>
                <input type="number" value={unitCost} onChange={e => setUnitCost(e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>
        )}
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {mode === 'invest' && invest && (
        <div className="stat-pri">
          <p className="stat-label">{c.bepPrice}</p>
          <p className="stat-value">{fmt(invest.price)}</p>
          <p className="stat-sub">{c.needRise} {fmt(invest.rise)}%</p>
        </div>
      )}

      {mode === 'biz' && biz && (
        <>
          <div className="stat-pri">
            <p className="stat-label">{c.bepQty}</p>
            <p className="stat-value">{fmt(Math.ceil(biz.qty), 0)} {c.units}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard label={c.bepSales} value={fmt(Math.ceil(biz.qty) * (parseFloat(unitPrice) || 0), 0)} />
            <SummaryCard label={c.contribution} value={fmt(biz.contribution)} variant="green" />
          </div>
        </>
      )}
    </div>
  );
}
