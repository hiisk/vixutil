import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'decibel');

export default function PtBrSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="pt-br">
      <DecibelTool lang="pt-br" />
    </SoundShellIntl>
  );
}
