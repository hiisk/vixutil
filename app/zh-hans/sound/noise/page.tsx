import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'noise');

export default function ZhHansSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="zh-hans">
      <NoiseTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
