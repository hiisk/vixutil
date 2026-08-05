import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'tuner');

export default function FrSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="fr">
      <TunerTool lang="fr" />
    </SoundShellIntl>
  );
}
