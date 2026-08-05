import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'decibel');

export default function ZhHansSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="zh-hans">
      <DecibelTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
