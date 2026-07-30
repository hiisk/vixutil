import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';

export const metadata: Metadata = {
  title: 'BPM Tap Counter — Find a Song’s Tempo by Tapping',
  description: 'Tap any key along with the music and it calculates beats per minute. About eight taps is enough to settle, and because it weights recent taps it follows a tempo that changes mid-way.',
  alternates: {
    canonical: '/en/sound/bpm-tap',
    languages: { 'en': '/en/sound/bpm-tap', 'ko': '/sound/bpm-tap', 'x-default': '/en/sound/bpm-tap' },
  },
};

export default function EnSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="en">
      <BpmTapTool lang="en" />
    </SoundShellIntl>
  );
}
