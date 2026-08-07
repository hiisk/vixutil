import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import FaviconTool from '@/components/image/FaviconTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "파비콘 만들기 - 브라우저 탭·iOS·안드로이드 아이콘",
  description: "그림 하나를 올리면 브라우저 탭(16·32·48), iOS 홈 화면(180), 안드로이드 웹 앱(192·512) 아이콘을 한 번에 만듭니다. head에 붙여 넣을 코드와 site.webmanifest 내용도 함께 내주며, 그 파일 이름은 실제로 만드는 파일과 같습니다.",
  alternates: {
    canonical: '/image/favicon',
    languages: alternateLanguages10('/image/favicon'),
  },
});

export default function Page() {
  return (
    <ImageShell slug="favicon">
      <FaviconTool />
    </ImageShell>
  );
}
