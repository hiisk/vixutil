import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'binaural');

export default function FrSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="fr">
      <BinauralTool lang="fr" />
    </SoundShellIntl>
  );
}
