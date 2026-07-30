import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'noise');

export default function HiSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="hi">
      <NoiseTool lang="hi" />
    </SoundShellIntl>
  );
}
