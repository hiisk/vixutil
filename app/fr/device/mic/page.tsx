import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MicTest from '@/components/device/MicTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'mic');

export default function FrDeviceMicPage() {
  return (
    <DeviceShellIntl slug="mic" lang="fr">
      <MicTest lang="fr" />
    </DeviceShellIntl>
  );
}
