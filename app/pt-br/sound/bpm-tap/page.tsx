import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('pt-br', 'bpm-tap');

export default function PtBrSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="pt-br">
      <BpmTapTool lang="pt-br" />
    </SoundShellIntl>
  );
}
