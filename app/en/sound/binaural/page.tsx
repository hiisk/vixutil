import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';

export const metadata: Metadata = {
  title: 'Binaural Beats Generator — Delta, Theta, Alpha and Beta',
  description: 'Play slightly different frequencies into your left and right ear and you perceive a slow beat at the difference between them. Headphones are essential, and the scientific evidence for any effect is still unclear.',
  alternates: {
    canonical: '/en/sound/binaural',
    languages: { 'en': '/en/sound/binaural', 'ko': '/sound/binaural', 'x-default': '/en/sound/binaural' },
  },
};

export default function EnSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="en">
      <BinauralTool lang="en" />
    </SoundShellIntl>
  );
}
