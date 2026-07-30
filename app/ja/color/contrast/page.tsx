import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'コントラスト比チェック — WCAG AA・AAA判定',
  description: '背景色と文字色のコントラスト比を計算し、ウェブアクセシビリティの基準（WCAG AA・AAA）を満たすかを判定します。実際の文字プレビューも出るので目でも確かめられます。',
  alternates: {
    canonical: '/ja/color/contrast',
    languages: alternateLanguages('/color/contrast'),
  },
};

export default function JaColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="ja">
      <ContrastTool lang="ja" />
    </ColorShellIntl>
  );
}
