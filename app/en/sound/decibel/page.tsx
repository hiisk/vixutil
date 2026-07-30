import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';

export const metadata: Metadata = {
  title: 'Sound Level Meter — Check Noise With Your Mic',
  description: 'Shows the level of what comes through your mic in relative decibels. Compare against references like a library, conversation or a subway to gauge where you are. Mics differ by device, so this is not an absolute measurement.',
  alternates: {
    canonical: '/en/sound/decibel',
    languages: { 'en': '/en/sound/decibel', 'ko': '/sound/decibel', 'x-default': '/en/sound/decibel' },
  },
};

export default function EnSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="en">
      <DecibelTool lang="en" />
    </SoundShellIntl>
  );
}
