import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'recorder');

export default function HiSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="hi">
      <RecorderTool lang="hi" />
    </SoundShellIntl>
  );
}
