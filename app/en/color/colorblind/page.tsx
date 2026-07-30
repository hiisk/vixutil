import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Colour Blindness Simulator — Preview Protanopia, Deuteranopia and More',
  description: 'Converts your colours to show how they appear to someone with protanopia, deuteranopia, tritanopia or full colour blindness. It makes immediately obvious why a screen that distinguishes states using only red and green is a problem.',
  alternates: {
    canonical: '/en/color/colorblind',
    languages: alternateLanguages('/color/colorblind'),
  },
};

export default function EnColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="en">
      <ColorblindTool lang="en" />
    </ColorShellIntl>
  );
}
