import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Colour Mixer — Blend Two Colours and Find the Midpoint',
  description: 'Set two colours and move the ratio to get what sits between them. Useful for pulling the colour at a specific point in a gradient, or finding a middle tone between two brand colours.',
  alternates: {
    canonical: '/en/color/mixer',
    languages: alternateLanguages('/color/mixer'),
  },
};

export default function EnColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="en">
      <MixerTool lang="en" />
    </ColorShellIntl>
  );
}
