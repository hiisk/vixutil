import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'mic');

export default function DeDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="de">
      <MicTest lang="de" />
    </DeviceShellIntl>
  );
}
