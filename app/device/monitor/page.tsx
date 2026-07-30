import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import DeviceShell from '@/components/DeviceShell';
import MonitorTest from '@/components/device/MonitorTest';

export const metadata: Metadata = {
  title: '모니터 불량화소 테스트 - 죽은 픽셀·빛샘 확인',
  description: '빨강·초록·파랑·흰색·검정을 전체화면으로 띄워 늘 꺼져 있는 점(데드 픽셀), 늘 켜져 있는 점(스턱 픽셀), 가장자리 빛샘과 얼룩을 찾습니다. 새 모니터를 받은 날 가장 먼저 해야 하는 점검입니다.',
  alternates: {
    canonical: '/device/monitor',
    languages: alternateLanguages('/device/monitor'),
  },
};

export default function Page() {
  return (
    <DeviceShell slug="monitor">
      <MonitorTest />
    </DeviceShell>
  );
}
