import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';

export const metadata: Metadata = {
  title: 'Image Cropper — Crop a Photo to Any Area or Ratio',
  description: 'Drag over the photo to keep only the part you want. Lock to 1:1, 16:9 or a profile ratio to match a spec, or leave it free and take whatever shape you like.',
  alternates: {
    canonical: '/en/image/crop',
    languages: { 'en': '/en/image/crop', 'ko': '/image/crop', 'x-default': '/en/image/crop' },
  },
};

export default function EnImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="en">
      <CropTool lang="en" />
    </ImageShellIntl>
  );
}
