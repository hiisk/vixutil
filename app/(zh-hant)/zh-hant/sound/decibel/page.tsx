import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'decibel');

export default function ZhHantSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="zh-hant">
      <DecibelTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
