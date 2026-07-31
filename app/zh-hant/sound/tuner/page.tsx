import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hant', 'tuner');

export default function ZhHantSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="zh-hant">
      <TunerTool lang="zh-hant" />
    </SoundShellIntl>
  );
}
