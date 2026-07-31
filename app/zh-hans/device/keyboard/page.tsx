import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hans', 'keyboard');

export default function ZhHansDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="zh-hans">
      <KeyboardTest lang="zh-hans" />
    </DeviceShellIntl>
  );
}
