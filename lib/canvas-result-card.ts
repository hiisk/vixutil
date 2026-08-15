/**
 * 스냅테스트 결과를 정사각형 이미지 카드로 그리는 순수 캔버스 유틸.
 * 링크 공유보다 "예쁜 결과 카드를 캡처해서 SNS에 올리는" 방식이 이런
 * 참여형 콘텐츠의 실제 확산 경로라, 카드 자체를 이미지 파일로 만들어
 * 저장·공유할 수 있게 한다. 카드 하단의 vixutil.com 워터마크가
 * 공유될 때마다 자연스러운 유입 경로가 된다.
 */

/**
 * 캔버스는 CSS를 안 타므로 시스템 글꼴로 그린다. 크로미움은 글자마다 없는
 * 글꼴을 건너뛰고 시스템 대체 글꼴을 찾으므로 일본어·중국어·힌디어도 두부(□)가
 * 아니라 제 글자로 나온다 — 언어별로 실제 렌더해서 확인했다.
 */
const FONT = 'system-ui, sans-serif';

export interface ResultCardOptions {
  emoji: string;
  title: string;
  subtitle: string;
  body: string;
  from: string;
  to: string;
  /** 카드 위쪽 작은 머리글. 안 주면 스냅테스트용 */
  eyebrow?: string;
  /** 카드 아래 워터마크 한 줄. 안 주면 스냅테스트용 */
  footer?: string;
  /** 줄바꿈 기준 언어(BCP 47). 안 주면 한국어 */
  lang?: string;
}

/**
 * 낱말 경계로 쪼갠다 — 공백은 앞 조각에 붙여 둔다.
 *
 * 공백으로만 끊으면 영어·독일어·힌디어는 맞지만 일본어·중국어는 문장 전체가
 * 낱말 하나가 되어 한 줄이 카드를 뚫고 나간다(한국어는 공백이 있어서 지금까지
 * 티가 안 났다). Intl.Segmenter가 언어별 낱말 경계를 이미 알고 있으니 그걸
 * 쓴다 — 라틴 문자는 공백, 일본어·중국어는 사전으로 갈린다.
 */
function segment(text: string, lang: string): string[] {
  if (typeof Intl.Segmenter !== 'function') return text.split(/(?<=\s)/);
  const out: string[] = [];
  for (const { segment: s, isWordLike } of new Intl.Segmenter(lang, { granularity: 'word' }).segment(text)) {
    // 공백·구두점은 앞 조각에 붙인다. 줄 첫머리에 홀로 떨어지면 보기 나쁘다
    if (!isWordLike && out.length) out[out.length - 1] += s;
    else out.push(s);
  }
  return out;
}

function wrapText(
  ctx: CanvasRenderingContext2D, text: string, maxWidth: number, lang: string, maxLines: number,
): string[] {
  const lines: string[] = [];
  let line = '';
  for (const piece of segment(text, lang)) {
    const next = line + piece;
    if (line && ctx.measureText(next.trimEnd()).width > maxWidth) {
      lines.push(line.trimEnd());
      if (lines.length === maxLines) return ellipsize(lines);
      line = piece.trimStart();
    } else {
      line = next;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

/** 잘려 끝난 마지막 줄에 말줄임표를 붙인다 — 문장이 뚝 끊긴 것처럼 보이지 않게 */
function ellipsize(lines: string[]): string[] {
  const last = lines[lines.length - 1].replace(/[\s,·、，]+$/, '');
  return [...lines.slice(0, -1), /[.。!?！？]$/.test(last) ? last : `${last}…`];
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

  /*
   * 배경 — 공유(OG) 카드와 같은 판이다 (2026-08-15).
   *
   * 전에는 from→to를 그대로 꽉 채워서, 링크를 공유했을 때 나가는 OG 카드
   * (lib/og-template.tsx의 artwork: 거의 검은 판 + 섹션 색 판 + 후광)와 나란히
   * 놓으면 다른 사이트로 보였다. 사람이 이미지로 올리는 것과 링크를 붙였을 때
   * 나가는 것이 **같은 그림 계열**이어야 한 사이트로 읽힌다.
   *
   * 그래서 og-template의 세 겹을 그대로 옮겼다 — 색 stop 값이 같다. 섹션 색은
   * 꽉 채우는 대신 얹는 판과 후광으로 남아서, 색으로 섹션을 가리는 성질은
   * 그대로다. 글꼴은 못 맞춘다(캔버스는 CSS를 안 타서 시스템 글꼴이다).
   */
  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0, '#12142c');
  bg.addColorStop(0.6, '#06070f');
  bg.addColorStop(1, '#0a0b18');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // 섹션 색 판 — 왼쪽 아래에서 오른쪽 위로 밝아진다(og-template의 'sheet')
  const sheet = ctx.createLinearGradient(0, SIZE, SIZE, 0);
  sheet.addColorStop(0.3, 'transparent');
  sheet.addColorStop(1, opts.from);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = sheet;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // 후광 — 가운데에서 퍼진다(og-template의 'spot')
  const spot = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE * 0.55);
  spot.addColorStop(0, opts.to);
  spot.addColorStop(1, 'transparent');
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.globalAlpha = 1;

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

  const lang = opts.lang ?? 'ko';
  const maxW = SIZE - pad * 2 - 100;

  // 이모지
  ctx.font = '160px sans-serif';
  ctx.fillText(opts.emoji, SIZE / 2, 320);

  // eyebrow
  ctx.font = `700 26px ${FONT}`;
  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  ctx.fillText(opts.eyebrow ?? 'SNAP TEST · vixutil.com', SIZE / 2, 400);

  /*
   * 아래 셋은 줄 수가 언어마다 달라서 y를 흘려보낸다. 한 줄씩일 때의 값은
   * 예전 좌표(490·550·650) 그대로다 — 한국어 스냅 열한 장이 안 움직인다.
   */
  // 타이틀 — 독일어·포르투갈어 결과 이름은 한 줄에 안 들어간다
  ctx.font = `900 64px ${FONT}`;
  ctx.fillStyle = '#ffffff';
  let y = 490;
  for (const line of wrapText(ctx, opts.title, maxW, lang, 2)) {
    ctx.fillText(line, SIZE / 2, y);
    y += 72;
  }
  y -= 72;

  // 서브타이틀
  ctx.font = `600 34px ${FONT}`;
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  y += 60;
  for (const line of wrapText(ctx, opts.subtitle, maxW, lang, 2)) {
    ctx.fillText(line, SIZE / 2, y);
    y += 44;
  }
  y -= 44;

  // 본문(줄바꿈)
  ctx.font = `400 30px ${FONT}`;
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  y += 100;
  for (const line of wrapText(ctx, opts.body, maxW, lang, 5)) {
    ctx.fillText(line, SIZE / 2, y);
    y += 44;
  }

  // 하단 워터마크
  ctx.font = `700 28px ${FONT}`;
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  /* 삼항으로 안 쓴다 — tests/share-shape.test.ts가 fillText의 글자 리터럴을 읽어
     "출처가 그림에 박혀 있는가"를 지킨다. ?? 안에 넣으면 그 검사가 눈이 먼다 */
  if (opts.footer) ctx.fillText(opts.footer, SIZE / 2, SIZE - pad - 30);
  else ctx.fillText('📸 vixutil.com/snap 에서 나도 해보기', SIZE / 2, SIZE - pad - 30);
}

/** 캔버스를 PNG Blob으로 변환한다(Promise 래핑). */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}
