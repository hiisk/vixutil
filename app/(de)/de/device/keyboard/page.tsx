import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'keyboard');

export default function DeDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="de">
      <KeyboardTest lang="de" />
    </DeviceShellIntl>
  );
}
