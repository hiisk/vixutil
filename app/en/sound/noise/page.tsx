import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';

export const metadata: Metadata = {
  title: 'White Noise Generator — White, Pink and Brown Noise Free',
  description: 'Generates and plays white, pink and brown noise. It masks the sounds around you to help with focus or sleep; brown noise, with its stronger low end, is closest to ocean waves and easiest on the ears.',
  alternates: {
    canonical: '/en/sound/noise',
    languages: { 'en': '/en/sound/noise', 'ko': '/sound/noise', 'x-default': '/en/sound/noise' },
  },
};

export default function EnSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="en">
      <NoiseTool lang="en" />
    </SoundShellIntl>
  );
}
