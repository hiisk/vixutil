import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: '色温度の変換 — ケルビンからRGBへ',
  description: '2700Kの電球色が実際にどんな色か、6500Kの昼光色がどれだけ青いかを見られます。照明を選ぶときや、写真のホワイトバランスの感覚をつかむのに使えます。',
  alternates: {
    canonical: '/ja/color/temperature',
    languages: alternateLanguages('/color/temperature'),
  },
};

export default function JaColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="ja">
      <TemperatureTool lang="ja" />
    </ColorShellIntl>
  );
}
