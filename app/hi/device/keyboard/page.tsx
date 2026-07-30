import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'keyboard');

export default function HiDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="hi">
      <KeyboardTest lang="hi" />
    </DeviceShellIntl>
  );
}
