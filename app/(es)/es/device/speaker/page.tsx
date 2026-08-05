import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('es', 'speaker');

export default function EsDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="es">
      <SpeakerTest lang="es" />
    </DeviceShellIntl>
  );
}
