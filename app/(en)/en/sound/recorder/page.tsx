import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'recorder');

export default function EnSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="en">
      <RecorderTool lang="en" />
    </SoundShellIntl>
  );
}
