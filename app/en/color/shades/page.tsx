import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Colour Shades Generator — 50 to 900 Scale From One Colour',
  description: 'Give it one brand colour and it builds ten steps, lighter (tints) and darker (shades). The output comes out in the 50 · 100 · … · 900 form that Tailwind and most design systems expect.',
  alternates: {
    canonical: '/en/color/shades',
    languages: alternateLanguages('/color/shades'),
  },
};

export default function EnColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="en">
      <ShadesTool lang="en" />
    </ColorShellIntl>
  );
}
