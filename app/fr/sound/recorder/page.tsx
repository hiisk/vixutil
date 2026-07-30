import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('fr', 'recorder');

export default function FrSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="fr">
      <RecorderTool lang="fr" />
    </SoundShellIntl>
  );
}
