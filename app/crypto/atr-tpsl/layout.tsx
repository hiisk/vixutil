import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ATR TP/SL Calculator - Crypto volatility-based take-profit & stop-loss',
  description: 'Compute the daily ATR(14) of top-volume Binance coins in real time and get take-profit (TP), stop-loss (SL) levels and risk:reward from your entry, direction and multipliers. Reference tool, not investment advice.',
  alternates: { canonical: '/crypto/atr-tpsl' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
