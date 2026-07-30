import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'カラーツール — 配色・コントラスト・CSSグラデーション',
  description: '無料のカラーツール：カラーパレット作成、色段階、コントラスト比チェック、色覚シミュレーター、CSSグラデーションと影。ブラウザで動き、インストールは不要です。',
  alternates: {
    canonical: '/ja/color',
    languages: alternateLanguages('/color'),
  },
};

export default function JaColorHub() {
  return <ColorHubIntl lang="ja" />;
}
