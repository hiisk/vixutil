import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'noise');

export default function FrSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="fr">
      <NoiseTool lang="fr" />
    </SoundShellIntl>
  );
}
