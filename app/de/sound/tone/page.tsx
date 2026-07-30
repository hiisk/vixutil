import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'tone');

export default function DeSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="de">
      <ToneTool lang="de" />
    </SoundShellIntl>
  );
}
