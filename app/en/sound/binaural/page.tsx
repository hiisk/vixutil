import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import BinauralTool from '@/components/sound/BinauralTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'binaural');

export default function EnSoundBinauralPage() {
  return (
    <SoundShellIntl slug="binaural" lang="en">
      <BinauralTool lang="en" />
    </SoundShellIntl>
  );
}
