import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import MouseTest from '@/components/device/MouseTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'mouse');

export default function FrDeviceMousePage() {
  return (
    <DeviceShellIntl slug="mouse" lang="fr">
      <MouseTest lang="fr" />
    </DeviceShellIntl>
  );
}
