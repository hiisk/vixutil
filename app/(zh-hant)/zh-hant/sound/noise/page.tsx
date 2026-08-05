import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import NoiseTool from '@/components/sound/NoiseTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'noise');

export default function ZhHantSoundNoisePage() {
  return (
    <SoundShellIntl slug="noise" lang="zh-hant">
      <NoiseTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
