import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('en', 'tone');

export default function EnSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="en">
      <ToneTool lang="en" />
    </SoundShellIntl>
  );
}
