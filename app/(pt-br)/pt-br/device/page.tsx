import type { Metadata } from 'next';
import DeviceHubIntl from '@/components/DeviceHubIntl';
import { deviceHubMetaIntl } from '@/lib/device-tools-intl';

/* 화면은 components/DeviceHubIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = deviceHubMetaIntl('pt-br');

export default function PtBrDeviceHub() {
  return <DeviceHubIntl lang="pt-br" />;
}
