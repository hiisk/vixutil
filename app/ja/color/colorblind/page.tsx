import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: '色覚シミュレーター — 1型・2型・3型色覚での見え方',
  description: '1型（P型）・2型（D型）・3型（T型）色覚、全色盲でどう見えるかに変換します。赤と緑だけで状態を区別する画面がなぜ問題なのか、その場で分かります。',
  alternates: {
    canonical: '/ja/color/colorblind',
    languages: alternateLanguages('/color/colorblind'),
  },
};

export default function JaColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="ja">
      <ColorblindTool lang="ja" />
    </ColorShellIntl>
  );
}
