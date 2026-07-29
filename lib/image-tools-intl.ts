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
export type ImageIntlLang = 'en' | 'zh';

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
  zh: {
    compress: {
      title: '图片压缩', desc: '调整画质来减小照片文件大小', category: '大小',
      metaTitle: '图片压缩 — 免费减小照片文件大小',
      long: '附件超过大小限制时用它。一点点降低画质，把原图与结果并排对比，还能立刻看到减小了百分之几。照片只在浏览器内处理，不会上传。',
      features: ['用画质滑块调节压缩强度', '立即显示相对原图的减小比例', '原图与结果并排对比', '保存为 JPG 或 WebP'],
    },
    resize: {
      title: '图片尺寸调整', desc: '把宽高改成想要的像素尺寸', category: '大小',
      metaTitle: '图片尺寸调整 — 修改照片宽高像素',
      long: '可以直接输入宽高，也可以按百分比缩小；打开等比锁定，照片就不会被拉变形。Instagram、YouTube 缩略图、头像这些常用尺寸按一下就能套用。',
      features: ['直接输入像素或按百分比缩小', '锁定宽高比', '常用规格预设', '预览结果文件大小'],
    },
    convert: {
      title: '图片格式转换', desc: '在 JPG、PNG、WebP 之间转换', category: '大小',
      metaTitle: '图片格式转换 — JPG、PNG、WebP 互转',
      long: '要上传到不支持 WebP 的地方时用它，反过来想减小体积时也一样。带透明背景的 PNG 转成 JPG 时背景会被填色，所以可以顺便选好填充色。',
      features: ['JPG、PNG、WebP 任意互转', '有损格式可调画质', '选择填充透明背景的颜色', '对比转换前后的体积'],
    },
    crop: {
      title: '图片裁剪', desc: '只留下需要的部分', category: '编辑',
      metaTitle: '图片裁剪 — 按任意区域或比例裁照片',
      long: '在照片上拖动，只保留想要的部分。锁定 1:1、16:9 或头像比例就能按规格裁切，留成自由比例则可以随意框选。',
      features: ['拖动指定裁剪区域', '可锁定 1:1、4:3、16:9 等比例', '实时显示裁剪后的尺寸', '按原画质保存'],
    },
    rotate: {
      title: '图片旋转与翻转', desc: '把躺着的照片扶正，左右镜像翻转', category: '编辑',
      metaTitle: '图片旋转与翻转 — 转动照片、左右镜像',
      long: '把存成横躺的照片按 90 度扶正，把镜像反了的自拍用左右翻转还原。还能以 1 度为单位微调角度，把地平线调平。',
      features: ['向左／向右 90 度旋转', '左右翻转与上下翻转', '以 1 度为单位微调角度', '选择旋转后空白处的底色'],
    },
    mosaic: {
      title: '照片打码', desc: '涂抹遮住人脸、地址等信息', category: '编辑',
      metaTitle: '照片打码 — 遮住照片里的人脸与个人信息',
      long: '二手交易实拍里的地址、合照里别人的脸，用手指或鼠标涂过去，只有涂到的地方会被打码。照片不会上传服务器，所以含个人信息的截图也能放心处理。',
      features: ['只对涂过的位置打码', '可调节涂抹粗细', '也可以用纯黑完全遮盖', '只撤销涂错的部分'],
    },
    merge: {
      title: '图片拼接', desc: '把多张照片纵向或横向拼成一张', category: '编辑',
      metaTitle: '图片拼接 — 把多张照片合成一张',
      long: '把聊天截图接成一张，或者把前后对比并排放在一起。宽度不同的照片会自动对齐，照片之间的间距和底色也可以自己选。',
      features: ['选择纵向或横向', '宽度不同的照片自动对齐', '指定间距与背景色', '调整排列顺序'],
    },
    palette: {
      title: '图片取色', desc: '提取照片里用得最多的颜色并给出 HEX', category: '分析',
      metaTitle: '图片取色 — 从照片中提取 HEX 色值',
      long: '想沿用某张喜欢的照片的氛围时，它会把那张照片里用得最多的颜色提取出来，给出 HEX 与 RGB 值。在照片上任意一点点一下，也能立刻知道那个位置的颜色。',
      features: ['自动提取代表色配色', '显示每个颜色的占比', '取色吸管可点任意位置', 'HEX 色值点一下就复制'],
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
  zh: {
    home: '首页', section: '图片工具',
    canDo: '这个工具能做什么', others: '其他图片工具',
    notice: '🔒 照片在浏览器内处理，不会上传。',
    footNote: '照片过大时处理会慢一些，旧手机上可能比较吃力。',
  },
};
