import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';

export const metadata: Metadata = {
  title: 'Online Metronome — Free, Adjustable BPM',
  description: 'Set a BPM and it clicks at exact intervals. Choose a time signature like 4/4 and the first beat gets an accent, so you can hear which beat you are on.',
  alternates: {
    canonical: '/en/sound/metronome',
    languages: { 'en': '/en/sound/metronome', 'ko': '/sound/metronome', 'x-default': '/en/sound/metronome' },
  },
};

export default function EnSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="en">
      <MetronomeTool lang="en" />
    </SoundShellIntl>
  );
}
