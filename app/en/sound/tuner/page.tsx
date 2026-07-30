import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'tuner');

export default function EnSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="en">
      <TunerTool lang="en" />
    </SoundShellIntl>
  );
}
