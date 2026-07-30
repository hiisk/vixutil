import type { Metadata } from 'next';
import DeviceShell from '@/components/DeviceShell';
import MouseTest from '@/components/device/MouseTest';

export const metadata: Metadata = {
  title: '마우스 클릭 테스트 - 채터링·버튼 인식 확인',
  description: '좌클릭·우클릭·휠클릭·사이드 버튼이 제대로 인식되는지, 한 번 눌렀는데 두 번 입력되는 채터링이 있는지 클릭 간격(ms)으로 확인합니다. 스크롤 방향과 커서 이동 폴링도 함께 봅니다.',
  alternates: {
    canonical: '/device/mouse',
    languages: { 'ko': '/device/mouse', 'en': '/en/device/mouse', 'x-default': '/en/device/mouse' },
  },
};

export default function Page() {
  return (
    <DeviceShell slug="mouse">
      <MouseTest />
    </DeviceShell>
  );
}
