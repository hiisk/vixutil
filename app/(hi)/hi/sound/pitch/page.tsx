import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import PitchTool from '@/components/sound/PitchTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'pitch');

export default function HiSoundPitchPage() {
  return (
    <SoundShellIntl slug="pitch" lang="hi">
      <PitchTool lang="hi" />
    </SoundShellIntl>
  );
}
