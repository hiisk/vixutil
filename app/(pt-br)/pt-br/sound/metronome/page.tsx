import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'metronome');

export default function PtBrSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="pt-br">
      <MetronomeTool lang="pt-br" />
    </SoundShellIntl>
  );
}
