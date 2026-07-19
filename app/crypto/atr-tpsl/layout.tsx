import type { Metadata } from 'next';
import JsonLd, { webAppJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'ATR TP/SL Calculator - Crypto volatility-based take-profit & stop-loss',
  description: 'Compute the daily ATR(14) of top-volume Binance coins in real time and get take-profit (TP), stop-loss (SL) levels and risk:reward from your entry, direction and multipliers. Reference tool, not investment advice.',
  alternates: { canonical: '/crypto/atr-tpsl' },
};

const structuredData = [
  webAppJsonLd(
    'ATR TP/SL Calculator',
    'Volatility-based take-profit and stop-loss levels computed from the daily ATR(14) of Binance coins, with risk:reward for your entry and direction — calculated in your browser from public market data.',
    '/crypto/atr-tpsl',
  ),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Crypto Tools', path: '/crypto' },
    { name: 'ATR TP/SL Calculator', path: '/crypto/atr-tpsl' },
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
