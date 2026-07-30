import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'mosquito');

export default function PtBrSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="pt-br">
      <MosquitoTool lang="pt-br" />
    </SoundShellIntl>
  );
}
