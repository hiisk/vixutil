import type { Metadata } from 'next';
import JsonLd, { webAppJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Crypto Signal Board - Multi-strategy entry / TP / SL in real time',
  description: 'A dashboard that predicts direction with multiple strategies (Trend, Bollinger Bands, RSI, ATR) and computes daily entry, take-profit and stop-loss plus live P&L for all Binance spot & futures coins, right in your browser. Reference only, not investment advice.',
};

const structuredData = [
  webAppJsonLd(
    'Crypto Signal Board',
    'Multi-strategy (Trend, Bollinger, RSI, ATR) consensus direction with daily entry, TP, SL and live P&L for every Binance spot and futures coin — computed in your browser from public market data.',
    '/crypto/signals',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'Signal Board', path: '/crypto/signals' },
  ]),
  faqJsonLd([
    {
      q: 'How are the entry, take-profit and stop-loss levels calculated?',
      a: 'Entry is the last closed daily candle (00:00 UTC). Take-profit and stop-loss are set from the 14-day ATR (Average True Range): TP is 1.5× ATR and SL is 1.0× ATR from the entry, in the signal direction. Everything is computed live in your browser from Binance public market data — no account or API key needed.',
    },
    {
      q: 'What does the signal confidence percentage mean?',
      a: 'Each coin is scored by four strategies — Trend (SMA 20/50 alignment), Bollinger Bands (%B), RSI (14) and ATR trend. The scores are combined with conviction weighting, so a single strong signal can carry the direction. The confidence percentage is the strength of that combined consensus, from 0 to 100.',
    },
    {
      q: 'Does the board show long and short signals?',
      a: 'Futures show both LONG and SHORT because you can trade either direction. Spot is buy-only, so it only shows long-side levels. The board defaults to Futures and you can switch with the SPOT / FUTURES toggle.',
    },
    {
      q: 'Is this investment advice?',
      a: 'No. The Crypto Signal Board is a reference tool that mechanically applies well-known technical indicators to public price data. It is not investment advice, and all trading decisions and risks are your own.',
    },
  ]),
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={structuredData} />
      {children}
    </>
  );
}
