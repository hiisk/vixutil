import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'tuner');

export default function JaSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="ja">
      <TunerTool lang="ja" />
    </SoundShellIntl>
  );
}
