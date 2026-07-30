import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('en', 'keyboard');

export default function EnDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="en">
      <KeyboardTest lang="en" />
    </DeviceShellIntl>
  );
}
