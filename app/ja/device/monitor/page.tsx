import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'monitor');

export default function JaDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="ja">
      <MonitorTest lang="ja" />
    </DeviceShellIntl>
  );
}
