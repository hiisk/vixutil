import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'tuner');

export default function DeSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="de">
      <TunerTool lang="de" />
    </SoundShellIntl>
  );
}
