import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'speaker');

export default function JaDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="ja">
      <SpeakerTest lang="ja" />
    </DeviceShellIntl>
  );
}
