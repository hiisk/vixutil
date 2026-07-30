import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('hi', 'decibel');

export default function HiSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="hi">
      <DecibelTool lang="hi" />
    </SoundShellIntl>
  );
}
