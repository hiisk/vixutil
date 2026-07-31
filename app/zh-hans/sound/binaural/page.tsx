import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'binaural');

export default function ZhHansSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="zh-hans">
      <BinauralTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
