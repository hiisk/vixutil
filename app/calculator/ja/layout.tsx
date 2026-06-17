import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: '生活計算機まとめ', template: '%s | 生活計算機まとめ' },
  description:
    '給与・税金・金融・不動産など日常生活に役立つ計算機をまとめたサイト — 2026年韓国基準',
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
