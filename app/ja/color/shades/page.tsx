import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'カラースケール生成 — 一色から50〜900の色段階',
  description: 'ブランドカラーを一つ渡すと、明るい側（tint）と暗い側（shade）に十段階を作ります。出力はTailwindや多くのデザインシステムが前提にしている 50・100・…・900 の形です。',
  alternates: {
    canonical: '/ja/color/shades',
    languages: alternateLanguages('/color/shades'),
  },
};

export default function JaColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="ja">
      <ShadesTool lang="ja" />
    </ColorShellIntl>
  );
}
