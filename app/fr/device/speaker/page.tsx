import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('fr', 'speaker');

export default function FrDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="fr">
      <SpeakerTest lang="fr" />
    </DeviceShellIntl>
  );
}
