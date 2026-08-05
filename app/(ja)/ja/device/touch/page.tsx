import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'touch');

export default function JaDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="ja">
      <TouchTest lang="ja" />
    </DeviceShellIntl>
  );
}
