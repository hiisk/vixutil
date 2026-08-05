import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'binaural');

export default function PtBrSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="pt-br">
      <BinauralTool lang="pt-br" />
    </SoundShellIntl>
  );
}
