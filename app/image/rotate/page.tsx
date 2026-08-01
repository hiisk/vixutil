import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import RotateTool from '@/components/image/RotateTool';

export const metadata: Metadata = {
  title: '이미지 회전·반전 - 사진 돌리기, 좌우 뒤집기',
  description: '옆으로 누워 저장된 사진을 90도씩 돌려 바로 세우고, 거울처럼 뒤집힌 셀카를 좌우 반전으로 되돌립니다. 회전 각도를 1도 단위로 미세 조정해 수평선을 맞출 수도 있습니다.',
  alternates: {
    canonical: '/image/rotate',
    languages: alternateLanguages10('/image/rotate'),
  },
};

export default function Page() {
  return (
    <ImageShell slug="rotate">
      <RotateTool />
    </ImageShell>
  );
}
