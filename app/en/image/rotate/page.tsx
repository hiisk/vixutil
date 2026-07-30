import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';

export const metadata: Metadata = {
  title: 'Rotate and Flip Image — Turn a Photo, Mirror It',
  description: 'Turn a photo that saved sideways back upright in 90° steps, and undo a mirrored selfie with a horizontal flip. You can also nudge the angle one degree at a time to level a horizon.',
  alternates: {
    canonical: '/en/image/rotate',
    languages: { 'en': '/en/image/rotate', 'ko': '/image/rotate', 'x-default': '/en/image/rotate' },
  },
};

export default function EnImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="en">
      <RotateTool lang="en" />
    </ImageShellIntl>
  );
}
