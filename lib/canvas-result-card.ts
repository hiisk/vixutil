/**
 * 스냅테스트 결과를 정사각형 이미지 카드로 그리는 순수 캔버스 유틸.
 * 링크 공유보다 "예쁜 결과 카드를 캡처해서 SNS에 올리는" 방식이 이런
 * 참여형 콘텐츠의 실제 확산 경로라, 카드 자체를 이미지 파일로 만들어
 * 저장·공유할 수 있게 한다. 카드 하단의 vixutil.com 워터마크가
 * 공유될 때마다 자연스러운 유입 경로가 된다.
 */

export interface ResultCardOptions {
  emoji: string;
  title: string;
  subtitle: string;
  body: string;
  from: string;
  to: string;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function drawResultCard(canvas: HTMLCanvasElement, opts: ResultCardOptions) {
  const SIZE = 1080;
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 배경 그라디언트
  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0, opts.from);
  bg.addColorStop(1, opts.to);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // 중앙 카드 패널
  const pad = 60;
  roundRect(ctx, pad, pad, SIZE - pad * 2, SIZE - pad * 2, 40);
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';

  // 이모지
  ctx.font = '160px sans-serif';
  ctx.fillText(opts.emoji, SIZE / 2, 320);

  // eyebrow
  ctx.font = '700 26px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  ctx.fillText('SNAP TEST · vixutil.com', SIZE / 2, 400);

  // 타이틀
  ctx.font = '900 64px system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(opts.title, SIZE / 2, 490);

  // 서브타이틀
  ctx.font = '600 34px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText(opts.subtitle, SIZE / 2, 550);

  // 본문(줄바꿈)
  ctx.font = '400 30px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  const lines = wrapText(ctx, opts.body, SIZE - pad * 2 - 100).slice(0, 5);
  let y = 650;
  for (const line of lines) {
    ctx.fillText(line, SIZE / 2, y);
    y += 44;
  }

  // 하단 워터마크
  ctx.font = '700 28px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.fillText('📸 vixutil.com/snap 에서 나도 해보기', SIZE / 2, SIZE - pad - 30);
}

/** 캔버스를 PNG Blob으로 변환한다(Promise 래핑). */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}
