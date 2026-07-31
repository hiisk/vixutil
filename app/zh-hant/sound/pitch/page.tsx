import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'pitch');

export default function ZhHantSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="zh-hant">
      <PitchTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
