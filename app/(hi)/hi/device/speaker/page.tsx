import type { Metadata } from 'next';
import DeviceShellIntl from '@/components/DeviceShellIntl';
import SpeakerTest from '@/components/device/SpeakerTest';
import { deviceMetaIntl } from '@/lib/device-tools-intl';

export const metadata: Metadata = deviceMetaIntl('hi', 'speaker');

export default function HiDeviceSpeakerPage() {
  return (
    <DeviceShellIntl slug="speaker" lang="hi">
      <SpeakerTest lang="hi" />
    </DeviceShellIntl>
  );
}
