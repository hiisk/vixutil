import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('pt-br', 'speaker');

export default function PtBrDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="pt-br">
      <SpeakerTest lang="pt-br" />
    </DeviceShellIntl>
  );
}
