import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'tuner');

export default function PtBrSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="pt-br">
      <TunerTool lang="pt-br" />
    </SoundShellIntl>
  );
}
