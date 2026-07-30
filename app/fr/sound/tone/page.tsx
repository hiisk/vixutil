import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'tone');

export default function FrSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="fr">
      <ToneTool lang="fr" />
    </SoundShellIntl>
  );
}
