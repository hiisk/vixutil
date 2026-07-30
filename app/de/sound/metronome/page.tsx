import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'metronome');

export default function DeSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="de">
      <MetronomeTool lang="de" />
    </SoundShellIntl>
  );
}
