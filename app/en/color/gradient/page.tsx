import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator — linear-gradient Code',
  description: 'Set the colours and the angle and it writes the CSS linear-gradient for you. Move the colour stops to control where the transition happens, and paste the result straight in.',
  alternates: {
    canonical: '/en/color/gradient',
    languages: alternateLanguages('/color/gradient'),
  },
};

export default function EnColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="en">
      <GradientTool lang="en" />
    </ColorShellIntl>
  );
}
