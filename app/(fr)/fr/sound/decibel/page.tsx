import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'decibel');

export default function FrSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="fr">
      <DecibelTool lang="fr" />
    </SoundShellIntl>
  );
}
