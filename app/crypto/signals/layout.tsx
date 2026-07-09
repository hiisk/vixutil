import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Crypto Signal Board - Multi-strategy entry / TP / SL in real time',
  description: 'A dashboard that predicts direction with multiple strategies (Trend, Bollinger Bands, RSI, ATR) and computes daily entry, take-profit and stop-loss plus live P&L for all Binance spot & futures coins, right in your browser. Reference only, not investment advice.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
