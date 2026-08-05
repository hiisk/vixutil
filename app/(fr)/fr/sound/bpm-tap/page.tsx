import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'bpm-tap');

export default function FrSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="fr">
      <BpmTapTool lang="fr" />
    </SoundShellIntl>
  );
}
