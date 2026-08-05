import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'tone');

export default function PtBrSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="pt-br">
      <ToneTool lang="pt-br" />
    </SoundShellIntl>
  );
}
