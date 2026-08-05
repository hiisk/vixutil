import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import TouchTest from '@/components/device/TouchTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'touch');

export default function DeDeviceTouchPage() {
  return (
    <DeviceShellIntl slug="touch" lang="de">
      <TouchTest lang="de" />
    </DeviceShellIntl>
  );
}
