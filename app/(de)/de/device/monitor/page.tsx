import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'monitor');

export default function DeDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="de">
      <MonitorTest lang="de" />
    </DeviceShellIntl>
  );
}
