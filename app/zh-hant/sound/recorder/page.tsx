import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'recorder');

export default function ZhHantSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="zh-hant">
      <RecorderTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
