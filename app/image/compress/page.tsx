import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import CompressTool from '@/components/image/CompressTool';

export const metadata: Metadata = {
  title: '이미지 용량 줄이기 - 사진 파일 크기 압축',
  description: '첨부 용량 제한에 걸릴 때 쓰세요. 화질을 조금씩 낮춰가며 원본과 결과를 나란히 비교하고, 몇 %가 줄었는지 바로 확인할 수 있습니다. 사진은 브라우저 안에서만 처리되고 서버로 올라가지 않습니다.',
  alternates: {
    canonical: '/image/compress',
    languages: alternateLanguages10('/image/compress'),
  },
};

export default function Page() {
  return (
    <ImageShell slug="compress">
      <CompressTool />
    </ImageShell>
  );
}
