import type { Metadata } from 'next';
import DeviceHubIntl from '@/components/DeviceHubIntl';
import { deviceHubMetaIntl } from '@/lib/device-tools-intl';

/* 화면은 components/DeviceHubIntl.tsx 하나를 열 언어가 같이 쓴다 */
export const metadata: Metadata = deviceHubMetaIntl('zh-hant');

export default function ZhHantDeviceHub() {
  return <DeviceHubIntl lang="zh-hant" />;
}
