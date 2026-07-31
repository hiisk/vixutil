import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'monitor');

export default function ZhHansDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="zh-hans">
      <MonitorTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}
