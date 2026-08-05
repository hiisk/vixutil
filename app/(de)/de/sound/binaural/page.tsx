import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'binaural');

export default function DeSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="de">
      <BinauralTool lang="de" />
    </SoundShellIntl>
  );
}
