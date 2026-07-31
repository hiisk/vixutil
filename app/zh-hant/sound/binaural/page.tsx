import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'binaural');

export default function ZhHantSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="zh-hant">
      <BinauralTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
