import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MonitorTest from '@/components/device/MonitorTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'monitor');

export default function ZhHantDeviceMonitorPage() {
  return (
    <DeviceShellIntl slug="monitor" lang="zh-hant">
      <MonitorTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}
