import type { Metadata } from 'next';
import SoundHubIntl from '@/components/SoundHubIntl';
import { soundHubMetaIntl } from '@/lib/sound-tools-intl';

/* 화면은 components/SoundHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = soundHubMetaIntl('ja');

export default function JaSoundHub() {
  return <SoundHubIntl lang="ja" />;
}
