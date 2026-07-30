import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Colour Contrast Checker — WCAG AA and AAA Ratio',
  description: 'Calculates the contrast ratio between a background and a text colour and tells you whether it passes the web accessibility thresholds (WCAG AA and AAA), with a live text preview so you can judge it by eye too.',
  alternates: {
    canonical: '/en/color/contrast',
    languages: alternateLanguages('/color/contrast'),
  },
};

export default function EnColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="en">
      <ContrastTool lang="en" />
    </ColorShellIntl>
  );
}
