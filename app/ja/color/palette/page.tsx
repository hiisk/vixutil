import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'カラーパレット作成 — 相性のいい配色を組む',
  description: '色を一つ選ぶと、補色・類似色・トライアドといった色相環の規則で合う色を導き出します。感覚ではなく規則で選ぶと、配色が大きく外れません。',
  alternates: {
    canonical: '/ja/color/palette',
    languages: alternateLanguages('/color/palette'),
  },
};

export default function JaColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="ja">
      <PaletteTool lang="ja" />
    </ColorShellIntl>
  );
}
