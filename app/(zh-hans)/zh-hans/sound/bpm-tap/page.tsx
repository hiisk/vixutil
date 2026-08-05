import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'bpm-tap');

export default function ZhHansSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="zh-hans">
      <BpmTapTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
