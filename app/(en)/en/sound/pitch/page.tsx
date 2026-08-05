import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'pitch');

export default function EnSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="en">
      <PitchTool lang="en" />
    </SoundShellIntl>
  );
}
