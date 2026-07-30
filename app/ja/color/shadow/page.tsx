import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'CSS box-shadow生成 — プレビューとコード',
  description: 'オフセット・ぼかし・広がり・色・不透明度を見ながら調整して、CSSを持ち出せます。影を重ねて自然な奥行きを出すプリセットも入っています。',
  alternates: {
    canonical: '/ja/color/shadow',
    languages: alternateLanguages('/color/shadow'),
  },
};

export default function JaColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="ja">
      <ShadowTool lang="ja" />
    </ColorShellIntl>
  );
}
