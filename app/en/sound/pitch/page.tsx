import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';

export const metadata: Metadata = {
  title: 'Interval Ear Training — Practise Relative Pitch Free',
  description: 'It plays two notes in turn and you name the interval between them — a major third, a perfect fifth. You do not need perfect pitch; once you know the distances, chords and melodies get much easier to follow.',
  alternates: {
    canonical: '/en/sound/pitch',
    languages: { 'en': '/en/sound/pitch', 'zh': '/zh/sound/pitch', 'ko': '/sound/pitch', 'x-default': '/en/sound/pitch' },
  },
};

export default function EnSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="en">
      <PitchTool lang="en" />
    </SoundShellIntl>
  );
}
