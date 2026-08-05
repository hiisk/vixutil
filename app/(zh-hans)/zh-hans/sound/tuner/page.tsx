import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('zh-hans', 'tuner');

export default function ZhHansSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="zh-hans">
      <TunerTool lang="zh-hans" />
    </SoundShellIntl>
  );
}
