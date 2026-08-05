import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'monitor');

export default function HiDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="hi">
      <MonitorTest lang="hi" />
    </DeviceShellIntl>
  );
}
