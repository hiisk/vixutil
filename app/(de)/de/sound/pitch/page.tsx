import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'pitch');

export default function DeSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="de">
      <PitchTool lang="de" />
    </SoundShellIntl>
  );
}
