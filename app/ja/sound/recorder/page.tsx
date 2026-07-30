import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'recorder');

export default function JaSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="ja">
      <RecorderTool lang="ja" />
    </SoundShellIntl>
  );
}
