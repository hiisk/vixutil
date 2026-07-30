import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbenblindheit simulieren — Protanopie, Deuteranopie und mehr',
  description: 'Rechnet deine Farben so um, wie sie Menschen mit Protanopie, Deuteranopie, Tritanopie oder vollständiger Farbenblindheit sehen. Damit wird sofort deutlich, warum ein Interface, das Zustände nur über Rot und Grün trennt, ein Problem ist.',
  alternates: {
    canonical: '/de/color/colorblind',
    languages: alternateLanguages('/color/colorblind'),
  },
};

export default function DeColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="de">
      <ColorblindTool lang="de" />
    </ColorShellIntl>
  );
}
