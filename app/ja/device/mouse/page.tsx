import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'mouse');

export default function JaDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="ja">
      <MouseTest lang="ja" />
    </DeviceShellIntl>
  );
}
