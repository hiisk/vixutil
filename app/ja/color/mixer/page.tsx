import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'カラーミキサー — 二色を混ぜて中間色を出す',
  description: '二色を決めて比率を動かすと、そのあいだの色が出ます。グラデーションの特定の位置の色を取り出したいときや、ブランドカラー二色の中間トーンを探すときに使えます。',
  alternates: {
    canonical: '/ja/color/mixer',
    languages: alternateLanguages('/color/mixer'),
  },
};

export default function JaColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="ja">
      <MixerTool lang="ja" />
    </ColorShellIntl>
  );
}
