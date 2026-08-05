import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'pitch');

export default function FrSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="fr">
      <PitchTool lang="fr" />
    </SoundShellIntl>
  );
}
