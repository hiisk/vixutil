import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'noise');

export default function EnSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="en">
      <NoiseTool lang="en" />
    </SoundShellIntl>
  );
}
