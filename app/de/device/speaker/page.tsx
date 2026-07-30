import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('de', 'speaker');

export default function DeDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="de">
      <SpeakerTest lang="de" />
    </DeviceShellIntl>
  );
}
