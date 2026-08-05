import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'tone');

export default function ZhHansSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="zh-hans">
      <ToneTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
