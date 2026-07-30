import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Colour Name Finder — Nearest Named Colour to Any HEX',
  description: 'Enter a colour code and it finds the closest named colour — coral, teal, crimson — and shows HEX, RGB, HSL and CMYK together. For when you have to describe a colour in words.',
  alternates: {
    canonical: '/en/color/name',
    languages: alternateLanguages('/color/name'),
  },
};

export default function EnColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="en">
      <NameTool lang="en" />
    </ColorShellIntl>
  );
}
