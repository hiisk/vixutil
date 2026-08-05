import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'pitch');

export default function JaSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="ja">
      <PitchTool lang="ja" />
    </SoundShellIntl>
  );
}
