import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'monitor');

export default function EnDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="en">
      <MonitorTest lang="en" />
    </DeviceShellIntl>
  );
}
