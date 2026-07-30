import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'tuner');

export default function HiSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="hi">
      <TunerTool lang="hi" />
    </SoundShellIntl>
  );
}
