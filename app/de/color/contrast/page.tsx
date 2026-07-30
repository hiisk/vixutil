import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbkontrast prüfen — WCAG AA und AAA Verhältnis',
  description: 'Berechnet das Kontrastverhältnis zwischen Hintergrund- und Textfarbe und sagt, ob es die Schwellen der Web-Barrierefreiheit (WCAG AA und AAA) erreicht — mit echter Textvorschau, damit du es auch mit dem Auge beurteilen kannst.',
  alternates: {
    canonical: '/de/color/contrast',
    languages: alternateLanguages('/color/contrast'),
  },
};

export default function DeColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="de">
      <ContrastTool lang="de" />
    </ColorShellIntl>
  );
}
