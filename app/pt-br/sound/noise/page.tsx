import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'noise');

export default function PtBrSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="pt-br">
      <NoiseTool lang="pt-br" />
    </SoundShellIntl>
  );
}
