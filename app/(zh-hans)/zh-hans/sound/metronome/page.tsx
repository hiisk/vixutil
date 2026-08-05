import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'metronome');

export default function ZhHansSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="zh-hans">
      <MetronomeTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
