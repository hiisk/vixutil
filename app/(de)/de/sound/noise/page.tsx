import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'noise');

export default function DeSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="de">
      <NoiseTool lang="de" />
    </SoundShellIntl>
  );
}
