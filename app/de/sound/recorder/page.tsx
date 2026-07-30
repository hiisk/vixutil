import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'recorder');

export default function DeSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="de">
      <RecorderTool lang="de" />
    </SoundShellIntl>
  );
}
