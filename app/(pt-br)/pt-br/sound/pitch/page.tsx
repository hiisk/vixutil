import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'pitch');

export default function PtBrSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="pt-br">
      <PitchTool lang="pt-br" />
    </SoundShellIntl>
  );
}
