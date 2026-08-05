import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('de', 'decibel');

export default function DeSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="de">
      <DecibelTool lang="de" />
    </SoundShellIntl>
  );
}
