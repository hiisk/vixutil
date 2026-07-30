import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'mosquito');

export default function FrSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="fr">
      <MosquitoTool lang="fr" />
    </SoundShellIntl>
  );
}
