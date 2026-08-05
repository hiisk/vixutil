import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'keyboard');

export default function FrDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="fr">
      <KeyboardTest lang="fr" />
    </DeviceShellIntl>
  );
}
