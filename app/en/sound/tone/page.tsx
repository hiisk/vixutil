import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';

export const metadata: Metadata = {
  title: 'Online Tone Generator — Play Any Hz Sine Wave',
  description: 'Generates any frequency from 20Hz to 20kHz. Sine, square and sawtooth waves are all available, which makes it useful for checking speakers, giving an instrument a reference note, or simple experiments.',
  alternates: {
    canonical: '/en/sound/tone',
    languages: { 'en': '/en/sound/tone', 'ko': '/sound/tone', 'x-default': '/en/sound/tone' },
  },
};

export default function EnSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="en">
      <ToneTool lang="en" />
    </SoundShellIntl>
  );
}
