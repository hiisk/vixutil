import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import KeyboardTest from '@/components/device/KeyboardTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'keyboard');

export default function PtBrDeviceKeyboardPage() {
  return (
    <DeviceShellIntl slug="keyboard" lang="pt-br">
      <KeyboardTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
