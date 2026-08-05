import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('zh-hant', 'keyboard');

export default function ZhHantDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="zh-hant">
      <KeyboardTest lang="zh-hant" />
    </DeviceShellIntl>
  );
}
