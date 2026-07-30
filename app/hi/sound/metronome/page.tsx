import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'metronome');

export default function HiSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="hi">
      <MetronomeTool lang="hi" />
    </SoundShellIntl>
  );
}
