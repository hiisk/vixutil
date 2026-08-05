import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';
import { soundMetaIntl } from '@/lib/sound-tools-intl';

export const metadata: Metadata = soundMetaIntl('ja', 'mosquito');

export default function JaSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="ja">
      <MosquitoTool lang="ja" />
    </SoundShellIntl>
  );
}
