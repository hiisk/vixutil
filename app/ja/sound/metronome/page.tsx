import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'metronome');

export default function JaSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="ja">
      <MetronomeTool lang="ja" />
    </SoundShellIntl>
  );
}
