import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'metronome');

export default function EnSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="en">
      <MetronomeTool lang="en" />
    </SoundShellIntl>
  );
}
