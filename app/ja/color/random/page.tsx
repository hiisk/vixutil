import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'ランダム配色 — 固定して引き直せる配色ガチャ',
  description: '五色をランダムに出します。気に入った色に鍵をかけて残りだけ引き直せるので、納得するまで組み合わせを素早く回せます。',
  alternates: {
    canonical: '/ja/color/random',
    languages: alternateLanguages('/color/random'),
  },
};

export default function JaColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="ja">
      <RandomTool lang="ja" />
    </ColorShellIntl>
  );
}
