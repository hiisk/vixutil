import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'bpm-tap');

export default function ZhHantSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="zh-hant">
      <BpmTapTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
