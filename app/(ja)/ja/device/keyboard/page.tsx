import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('ja', 'keyboard');

export default function JaDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="ja">
      <KeyboardTest lang="ja" />
    </DeviceShellIntl>
  );
}
