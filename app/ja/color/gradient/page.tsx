import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'CSSグラデーション生成 — linear-gradientのコード',
  description: '色と角度を決めるとCSSのlinear-gradientを書き出します。カラーストップを動かせば変化の位置も調整でき、そのまま貼り付けられます。',
  alternates: {
    canonical: '/ja/color/gradient',
    languages: alternateLanguages('/color/gradient'),
  },
};

export default function JaColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="ja">
      <GradientTool lang="ja" />
    </ColorShellIntl>
  );
}
