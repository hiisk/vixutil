import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';

export const metadata: Metadata = {
  title: 'CSS Box Shadow Generator — Live Preview and Code',
  description: 'Adjust offset, blur, spread, colour and opacity while seeing the result, then take the CSS. Includes presets that layer several shadows for a more natural sense of depth.',
  alternates: {
    canonical: '/en/color/shadow',
    languages: { 'en': '/en/color/shadow', 'zh': '/zh/color/shadow', 'ko': '/color/shadow', 'x-default': '/en/color/shadow' },
  },
};

export default function EnShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="en">
      <ShadowTool lang="en" />
    </ColorShellIntl>
  );
}
