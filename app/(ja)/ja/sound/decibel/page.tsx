import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import DecibelTool from '@/components/sound/DecibelTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'decibel');

export default function JaSoundDecibelPage() {
  return (
    <SoundShellIntl slug="decibel" lang="ja">
      <DecibelTool lang="ja" />
    </SoundShellIntl>
  );
}
