import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'metronome');

export default function ZhHantSoundMetronomePage() {
  return (
    <SoundShellIntl slug="metronome" lang="zh-hant">
      <MetronomeTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
