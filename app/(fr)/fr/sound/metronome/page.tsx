import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'metronome');

export default function FrSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="fr">
      <MetronomeTool lang="fr" />
    </SoundShellIntl>
  );
}
