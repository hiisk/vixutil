import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';

export const metadata: Metadata = {
  title: '图片格式转换 — JPG、PNG、WebP 互转',
  description: '要上传到不支持 WebP 的地方时用它，反过来想减小体积时也一样。带透明背景的 PNG 转成 JPG 时背景会被填色，所以可以顺便选好填充色。',
  alternates: {
    canonical: '/zh/image/convert',
    languages: { 'en': '/en/image/convert', 'zh': '/zh/image/convert', 'ko': '/image/convert', 'x-default': '/en/image/convert' },
  },
};

export default function ZhImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="zh">
      <ConvertTool lang="zh" />
    </ImageShellIntl>
  );
}
