import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'pitch');

export default function ZhHansSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="zh-hans">
      <PitchTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
