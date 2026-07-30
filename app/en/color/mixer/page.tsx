import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';

export const metadata: Metadata = {
  title: 'Colour Mixer — Blend Two Colours and Find the Midpoint',
  description: 'Set two colours and move the ratio to get what sits between them. Useful for pulling the colour at a specific point in a gradient, or finding a middle tone between two brand colours.',
  alternates: {
    canonical: '/en/color/mixer',
    languages: { 'en': '/en/color/mixer', 'ko': '/color/mixer', 'x-default': '/en/color/mixer' },
  },
};

export default function EnMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="en">
      <MixerTool lang="en" />
    </ColorShellIntl>
  );
}
