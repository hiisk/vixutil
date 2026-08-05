import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'mouse');

export default function DeDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="de">
      <MouseTest lang="de" />
    </DeviceShellIntl>
  );
}
