// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ImageTool } from './image-tools.ts';
import { IMAGE_TOOLS } from './image-tools.ts';

/**
 * 이미지 도구(/image) 섹션의 영어·중국어 메타데이터.
 *
 * time·color와 같은 방침 — slug·icon·gradient·og는 한국어와 공유하고 사람이 읽는
 * 문구만 갈아 끼운다. slug를 공유해야 hreflang이 세 언어를 짝지을 수 있다.
 *
 * 이 섹션의 판매 포인트는 "사진이 브라우저를 떠나지 않는다"는 점인데, 그게
 * 한국어보다 영어권에서 더 잘 통하는 이야기라 문구에서 앞세운다.
 */
export type ImageIntlLang = 'en';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<ImageIntlLang, Record<string, ToolCopy>> = {
  en: {
    compress: {
      title: 'Image Compressor', desc: 'Shrink a photo file by trading off quality', category: 'Size',
      metaTitle: 'Image Compressor — Reduce Photo File Size Free',
      long: 'For when an attachment is over the size limit. Lower the quality step by step, compare the original and the result side by side, and see exactly what percentage you saved. Your photo is processed inside the browser and never uploaded.',
      features: ['Quality slider to set compression', 'Saving shown as a percentage instantly', 'Original and result side by side', 'Save as JPG or WebP'],
    },
    resize: {
      title: 'Image Resizer', desc: 'Change width and height to any pixel size', category: 'Size',
      metaTitle: 'Image Resizer — Change Photo Dimensions in Pixels',
      long: 'Type the width and height directly or scale by percentage, and lock the aspect ratio so the photo does not stretch. Common sizes — Instagram posts, YouTube thumbnails, profile pictures — are one button away.',
      features: ['Enter pixels or scale by percentage', 'Lock the aspect ratio', 'Presets for common sizes', 'Preview the resulting file size'],
    },
    convert: {
      title: 'Image Format Converter', desc: 'Convert between JPG, PNG and WebP', category: 'Size',
      metaTitle: 'Image Converter — JPG, PNG and WebP Both Ways',
      long: 'For uploading somewhere that will not take WebP, or the other way round when you want a smaller file. A PNG with a transparent background gets that background filled when it becomes a JPG, so you can pick the fill colour too.',
      features: ['JPG, PNG and WebP in any direction', 'Quality control for lossy formats', 'Choose the colour that fills transparency', 'Before and after file size'],
    },
    crop: {
      title: 'Image Cropper', desc: 'Keep only the part you need', category: 'Edit',
      metaTitle: 'Image Cropper — Crop a Photo to Any Area or Ratio',
      long: 'Drag over the photo to keep only the part you want. Lock to 1:1, 16:9 or a profile ratio to match a spec, or leave it free and take whatever shape you like.',
      features: ['Drag to set the crop area', 'Lock to 1:1, 4:3, 16:9 and more', 'Cropped size shown live', 'Saved at the original quality'],
    },
    rotate: {
      title: 'Rotate and Flip Image', desc: 'Straighten a sideways photo, mirror it left to right', category: 'Edit',
      metaTitle: 'Rotate and Flip Image — Turn a Photo, Mirror It',
      long: 'Turn a photo that saved sideways back upright in 90° steps, and undo a mirrored selfie with a horizontal flip. You can also nudge the angle one degree at a time to level a horizon.',
      features: ['Rotate 90° left or right', 'Flip horizontally or vertically', 'Fine angle adjustment by 1°', 'Pick the colour that fills the corners'],
    },
    mosaic: {
      title: 'Photo Blur and Pixelate', desc: 'Brush over faces or addresses to hide them', category: 'Edit',
      metaTitle: 'Blur or Pixelate a Photo — Hide Faces and Personal Details',
      long: 'Brush with a finger or the mouse over anything you need hidden — an address in a marketplace photo, someone else’s face in a group shot — and only that spot gets pixelated. Nothing is uploaded, so screens holding personal details are safe to work on.',
      features: ['Pixelate only where you brush', 'Adjustable brush size', 'Cover completely in solid black', 'Undo just the part you got wrong'],
    },
    merge: {
      title: 'Combine Images', desc: 'Join several photos into one, vertically or side by side', category: 'Edit',
      metaTitle: 'Combine Images — Merge Several Photos Into One',
      long: 'For stitching chat screenshots into a single image, or putting a before and after next to each other. Photos of different widths are aligned for you, and you can set the gap between them and the background colour.',
      features: ['Vertical or horizontal', 'Different widths aligned automatically', 'Set the gap and background colour', 'Reorder the photos'],
    },
    palette: {
      title: 'Image Colour Extractor', desc: 'Pull the dominant colours out of a photo as HEX', category: 'Analyse',
      metaTitle: 'Image Colour Extractor — Get HEX Codes From a Photo',
      long: 'When you want to reuse the mood of a photo you like, this pulls out the colours it uses most and gives you the HEX and RGB codes. Tap anywhere on the photo and you get the colour at that exact point.',
      features: ['Dominant colour palette extracted for you', 'Share of the image per colour', 'Eyedropper for any point you pick', 'One click to copy a HEX code'],
    },
  },
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function imageToolsIntl(lang: ImageIntlLang): ImageTool[] {
  return IMAGE_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findImageToolIntl(lang: ImageIntlLang, slug: string): ImageTool | undefined {
  return imageToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedImageToolsIntl(lang: ImageIntlLang, slug: string, count = 4): ImageTool[] {
  const all = imageToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 셸 UI 문구 */
export const IMAGE_SHELL_UI: Record<ImageIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Image tools',
    canDo: 'What this tool does', others: 'Other image tools',
    notice: '🔒 Your photo is processed in the browser and never uploaded.',
    footNote: 'Very large photos may take a moment, and can be heavy on older phones.',
  },
};
