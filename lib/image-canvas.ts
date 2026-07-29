/**
 * 이미지 도구(/image)가 공통으로 쓰는 canvas 유틸.
 *
 * 여덟 개 도구가 전부 "파일 → 그릴 수 있는 것 → canvas → Blob → 저장"이라는
 * 같은 길을 지난다. 그 길만 여기 모으고, 각 도구는 canvas에 무엇을 그릴지에만
 * 집중한다.
 *
 * 이미지를 <img>가 아니라 createImageBitmap으로 읽는 이유는 EXIF 방향 때문이다.
 * 세로로 찍은 폰 사진은 파일 안에 "돌려서 보여줘"라는 방향 정보가 따로 들어
 * 있는데, canvas는 그걸 알아서 적용해주지 않아 결과물만 옆으로 눕는다.
 * imageOrientation: 'from-image'가 그 회전을 미리 적용해준다.
 */

export type Drawable = ImageBitmap | HTMLImageElement;

export interface LoadedImage {
  /** drawImage에 그대로 넘길 수 있는 소스 */
  src: Drawable;
  width: number;
  height: number;
  /** 원본 파일 이름 (확장자 포함) */
  name: string;
  /** 원본 바이트 */
  size: number;
  /** 원본 MIME */
  type: string;
}

export const ACCEPT = 'image/*';

/** 파일 하나를 canvas에 그릴 수 있는 형태로 읽는다. */
export async function loadImage(file: File): Promise<LoadedImage> {
  const meta = { name: file.name, size: file.size, type: file.type };

  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return { src: bitmap, width: bitmap.width, height: bitmap.height, ...meta };
    } catch {
      // 사파리 구버전 등 옵션을 모르는 환경 — 아래 <img> 경로로 내려간다
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('이미지를 읽지 못했습니다'));
      el.src = url;
    });
    return { src: img, width: img.naturalWidth, height: img.naturalHeight, ...meta };
  } finally {
    // 이미 디코드가 끝났으므로 URL은 놓아준다
    URL.revokeObjectURL(url);
  }
}

/** 이미지 파일이 맞는지 — 드롭 영역에 폴더나 문서를 떨어뜨리는 일이 잦다. */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export interface ExportOptions {
  /** 'image/jpeg' | 'image/png' | 'image/webp' */
  mime: string;
  /** 손실 포맷에서만 의미 있다 (0~1) */
  quality?: number;
}

/** canvas를 Blob으로 굽는다. toBlob은 콜백이라 감싸 쓴다. */
export function canvasToBlob(canvas: HTMLCanvasElement, { mime, quality }: ExportOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('이미지를 만들지 못했습니다'))),
      mime,
      quality,
    );
  });
}

/** 새 캔버스에 이미지를 그려 돌려준다. 대부분의 도구가 여기서 시작한다. */
export function drawToCanvas(
  src: Drawable,
  width: number,
  height: number,
  paint?: (ctx: CanvasRenderingContext2D) => void,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas를 쓸 수 없는 브라우저입니다');
  ctx.imageSmoothingQuality = 'high';
  if (paint) paint(ctx);
  else ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/**
 * JPG에는 투명이 없다. 투명한 PNG를 그냥 JPG로 구우면 투명했던 자리가
 * 검게 나오므로, 그리기 전에 배경을 칠해준다.
 */
export function fillBackground(ctx: CanvasRenderingContext2D, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

export const MIME_LABEL: Record<string, string> = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WebP',
};

export const EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/** 손실 압축이라 화질 조절이 의미 있는 포맷 */
export function isLossy(mime: string): boolean {
  return mime === 'image/jpeg' || mime === 'image/webp';
}

/** '사진.png' + 'jpg' → '사진.jpg' */
export function withExt(name: string, ext: string): string {
  return `${name.replace(/\.[^.]+$/, '') || 'image'}.${ext}`;
}

/** 파일 이름에 접미사를 붙인다. '사진.jpg' + '-resized' → '사진-resized.jpg' */
export function suffixName(name: string, suffix: string, ext?: string): string {
  const base = name.replace(/\.[^.]+$/, '') || 'image';
  const e = ext ?? name.match(/\.([^.]+)$/)?.[1] ?? 'png';
  return `${base}${suffix}.${e}`;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / (1024 * 1024)).toFixed(2)}MB`;
}

/** Blob을 내 기기에 저장한다. */
export function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // 클릭 직후에 취소하면 사파리에서 저장이 취소되는 일이 있어 한 박자 늦춘다
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
