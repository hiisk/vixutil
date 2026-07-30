import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Colour Temperature Converter — Kelvin to RGB',
  description: 'See what 2700K warm white actually looks like, and how blue 6500K daylight really is. Useful when choosing lighting or getting a feel for white balance in photography.',
  alternates: {
    canonical: '/en/color/temperature',
    languages: alternateLanguages('/color/temperature'),
  },
};

export default function EnColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="en">
      <TemperatureTool lang="en" />
    </ColorShellIntl>
  );
}
