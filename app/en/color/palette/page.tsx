import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';

export const metadata: Metadata = {
  title: 'Colour Palette Generator — Build Matching Colour Schemes',
  description: 'Pick one colour and it derives the colours that go with it using colour-wheel rules — complementary, analogous, triadic. Choosing by rule rather than by eye keeps a scheme from going badly wrong.',
  alternates: {
    canonical: '/en/color/palette',
    languages: { 'en': '/en/color/palette', 'zh': '/zh/color/palette', 'ko': '/color/palette', 'x-default': '/en/color/palette' },
  },
};

export default function EnPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="en">
      <PaletteTool lang="en" />
    </ColorShellIntl>
  );
}
