import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import ToneTool from '@/components/sound/ToneTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'tone');

export default function HiSoundTonePage() {
  return (
    <SoundShellIntl slug="tone" lang="hi">
      <ToneTool lang="hi" />
    </SoundShellIntl>
  );
}
