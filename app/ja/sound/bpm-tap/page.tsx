import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BpmTapTool from '@/components/sound/BpmTapTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'bpm-tap');

export default function JaSoundBpmTapPage() {
  return (
    <SoundShellIntl slug="bpm-tap" lang="ja">
      <BpmTapTool lang="ja" />
    </SoundShellIntl>
  );
}
