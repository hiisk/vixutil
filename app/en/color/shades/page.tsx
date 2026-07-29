import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';

export const metadata: Metadata = {
  title: 'Colour Shades Generator — 50 to 900 Scale From One Colour',
  description: 'Give it one brand colour and it builds ten steps, lighter (tints) and darker (shades). The output comes out in the 50 · 100 · … · 900 form that Tailwind and most design systems expect.',
  alternates: {
    canonical: '/en/color/shades',
    languages: { 'en': '/en/color/shades', 'zh': '/zh/color/shades', 'ko': '/color/shades', 'x-default': '/en/color/shades' },
  },
};

export default function EnShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="en">
      <ShadesTool lang="en" />
    </ColorShellIntl>
  );
}
