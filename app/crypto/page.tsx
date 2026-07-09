import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Crypto Trading Tools',
  description: 'Crypto trading tools built on Binance public market data — ATR volatility, TP/SL levels, and a real-time signal board. Everything is computed in your browser.',
};

const structuredData = [
  webAppJsonLd(
    'Crypto Trading Tools',
    'Binance-based crypto trading tools: ATR volatility, TP/SL levels and a multi-strategy real-time signal board, all computed in your browser.',
    '/crypto',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
  ]),
];

const TOOLS = [
  { href: '/crypto/predictions', icon: '🔮', title: 'Price Predictions', desc: '1D to 3Y projection ranges for 86 coins — median + 80% confidence band', badge: 'NEW', color: 'from-amber-400 to-orange-600' },
  { href: '/crypto/signals', icon: '📈', title: 'Signal Board', desc: 'Multi-strategy (Trend/BB/RSI/ATR) entry, TP, SL & live P&L for all coins', badge: 'Live', color: 'from-amber-400 to-orange-600' },
  { href: '/crypto/atr-tpsl', icon: '📊', title: 'ATR TP/SL Calculator', desc: 'Pick a coin, set entry and multipliers, get take-profit & stop-loss', badge: 'Calc', color: 'from-yellow-400 to-amber-600' },
];

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={structuredData} />
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Home
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">Crypto Tools</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🪙</div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Crypto Trading Tools</h1>
          <p className="text-slate-500 text-sm">Volatility & TP/SL from Binance public market data</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TOOLS.map(t => (
            <Link key={t.href} href={t.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md hover:border-amber-200 transition-all">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">{t.badge}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 mb-1">{t.title}</h2>
                <p className="text-sm text-slate-500 mb-4">{t.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                  Open tool
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-300 mt-10">Prices via Binance public API · all calculations are for reference only, not investment advice</p>
      </div>
      <SiteFooter />
    </div>
  );
}
