import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'recorder');

export default function ZhHansSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="zh-hans">
      <RecorderTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
