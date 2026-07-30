import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'mic');

export default function JaDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="ja">
      <MicTest lang="ja" />
    </DeviceShellIntl>
  );
}
