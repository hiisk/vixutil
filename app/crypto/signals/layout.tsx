import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ATR Signal Board - Crypto entry / TP / SL in real time',
  description: 'A dashboard that computes daily-ATR entry, take-profit and stop-loss levels plus live P&L for all Binance spot & futures coins, right in your browser. Sort by volume or P&L. Reference only, not investment advice.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
