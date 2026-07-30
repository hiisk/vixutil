import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'noise');

export default function JaSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="ja">
      <NoiseTool lang="ja" />
    </SoundShellIntl>
  );
}
