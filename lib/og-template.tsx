import type { ReactElement } from 'react';
import { ogGlyph } from './og-icons';

/** 공유(OG) 이미지 공통 규격·템플릿 — next/og(Satori)로 렌더 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/** #rrggbb → rgba(r,g,b,a) */
export function alpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** 왼쪽 글 영역의 안쪽 폭. 이보다 넘치면 오른쪽 그림을 침범한다. */
const TEXT_BOX = 624;

/**
 * 설명문에 섞인 이모지를 뺀다.
 *
 * 사이트 데이터의 desc는 "…탈탈 털어보자 🧓"처럼 이모지로 끝나는 게 꽤 있다.
 * 화면에서는 괜찮지만 카드에서는 컬러 이모지가 흑백 아이콘 옆에 끼어들어
 * 한 세트로 안 보인다.
 *
 * 화살표(U+2190~21FF)는 건드리지 않는다 — 계산기 설명이 "월급 → 실수령액"처럼
 * 화살표를 문장 부호로 쓴다.
 *
 * 괘선(U+2500~257F)과 도형(U+25A0~25FF)도 뺀다. 이모지가 아니라서 남겨 뒀는데,
 * 카드용 동적 폰트가 이 글자들을 받지 못해 빌드 로그에 400이 찍히고 카드에는
 * 빈 칸이 그려졌다 — 문자 이모티콘 설명의 "(╯°□°）╯"가 그랬다.
 */
export function stripForCard(text: string): string {
  return text
    .replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{23FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}]/gu, '')
    .replace(/[\u{2500}-\u{259F}\u{25A0}-\u{25FF}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** 그림의 중심과 크기 — 궤도·후광·아이콘이 모두 이 값을 기준으로 놓인다 */
const ART_X = 892;
const ART_Y = 315;
const GLYPH = 280;

/**
 * 글자 하나가 차지하는 폭을 em 단위로 어림한다.
 * 한글·한자·가나는 정사각에 가깝고 라틴·숫자·문장부호는 절반 남짓이다.
 * 글자 수만 세면 "판타지 이름 생성기"와 "Fantasy Name Generator"가 같은
 * 길이로 잡혀 한쪽은 넘치고 한쪽은 쪼그라든다.
 */
function charUnits(ch: string): number {
  const c = ch.codePointAt(0) ?? 0;
  if (c >= 0xac00 && c <= 0xd7a3) return 1;      // 한글 음절
  if (c >= 0x1100 && c <= 0x11ff) return 1;      // 한글 자모
  if (c >= 0x2e80 && c <= 0xa4cf) return 1;      // 한자·가나·부수
  if (c >= 0xf900 && c <= 0xfaff) return 1;      // 한자 호환
  if (c >= 0xff00 && c <= 0xff60) return 1;      // 전각
  if (c >= 0x1f000) return 1;                    // 이모지
  return 0.55;
}

/**
 * 제목 폰트 크기.
 *
 * Satori에는 넘친 글자를 잘라낼 수단이 마땅치 않아서, 넘치면 그대로 그림
 * 위로 올라탄다. 그래서 폭을 미리 재고 크기를 맞춘다 — 한 줄에 들어가면
 * 크게 뽑고, 안 되면 두 줄 기준으로 줄인다. 두 줄 계산에 1.15를 곱하는 건
 * 단어 단위 줄바꿈이라 줄 끝에 늘 빈 자리가 남기 때문이다.
 */
function titleSize(title: string): number {
  const units = [...title].reduce((s, c) => s + charUnits(c), 0) || 1;
  const oneLine = TEXT_BOX / units;
  if (oneLine >= 56) return Math.min(86, Math.floor(oneLine));
  return Math.max(42, Math.min(66, Math.floor((TEXT_BOX * 2) / (units * 1.15))));
}

/**
 * 카드 그림 — 1200×630 한 장을 통째로 그린 SVG.
 *
 * 배경·빛·궤도·아이콘이 전부 이 안에 있다. CSS로 배경을 깔고 그 위에 작은
 * 아이콘만 얹으면 "동그라미 안에 아이콘" 이상이 안 나오는데, 한 좌표계
 * 안에서 그리면 궤도와 아이콘 크기를 맞춰 배치할 수 있다.
 *
 * Satori가 지원하는 SVG는 제한적이다. defs·linearGradient·radialGradient·
 * g transform·path·circle·rect까지는 통과하지만 filter·mask·use·clipPath는
 * 쓰지 않는다.
 */
function artwork(glyph: ReactElement[] | null, from: string, to: string): ReactElement {
  const half = GLYPH / 2;
  return (
    <svg width={OG_SIZE.width} height={OG_SIZE.height} viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12142c" />
          <stop offset="60%" stopColor="#06070f" />
          <stop offset="100%" stopColor="#0a0b18" />
        </linearGradient>
        {/* 가로로 서서히 밝아지는 판. 왼쪽 끝을 완전 투명으로 둬야 이음선이 안 생긴다 */}
        <linearGradient id="sheet" x1="0" y1="1" x2="1" y2="0">
          <stop offset="30%" stopColor={from} stopOpacity="0" />
          <stop offset="100%" stopColor={from} stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="spot" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={to} stopOpacity="0.5" />
          <stop offset="100%" stopColor={to} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={1200} height={630} fill="url(#bg)" />
      <rect x={0} y={0} width={1200} height={630} fill="url(#sheet)" />
      <circle cx={ART_X} cy={ART_Y} r={320} fill="url(#spot)" />

      {/* 궤도 — 아이콘을 감싸 시선을 모은다 */}
      <circle cx={ART_X} cy={ART_Y} r={240} fill="none" stroke="#ffffff" strokeOpacity="0.13" strokeWidth={2} />
      <circle cx={ART_X} cy={ART_Y} r={300} fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth={2} />
      <circle cx={ART_X} cy={ART_Y - 240} r={8} fill={to} />
      <circle cx={ART_X + 300} cy={ART_Y} r={5} fill="#ffffff" fillOpacity="0.45" />

      {glyph && (
        <g
          transform={`translate(${ART_X - half} ${ART_Y - half}) scale(${GLYPH / 100})`}
          fill="none"
          stroke="#ffffff"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {glyph}
        </g>
      )}
    </svg>
  );
}

/**
 * 공유 카드.
 *
 * 왼쪽 글, 오른쪽 그림의 2단 구성이다. 색은 페이지 accent 두 개(from·to)로만
 * 만든다. 800장이 넘는 카드가 같은 형태를 쓰므로 색과 아이콘이 유일한 구분
 * 수단이다.
 *
 * icon에는 사이트 데이터의 이모지를 그대로 넘긴다. 대응하는 그린 아이콘이
 * 있으면 그걸 쓰고, 없으면 이모지를 그대로 얹는다.
 */
export function ogCard({
  icon,
  eyebrow,
  title,
  desc,
  from,
  to,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  desc: string;
  from: string;
  to: string;
}): ReactElement {
  const glyph = ogGlyph(icon, to);
  const headline = stripForCard(title);
  const sub = stripForCard(desc);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0 }}>
        {artwork(glyph, from, to)}
      </div>

      {/* 그린 아이콘이 없는 이모지는 그림 자리에 그대로 얹는다 */}
      {!glyph && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: ART_Y - GLYPH / 2,
            left: ART_X - GLYPH / 2,
            width: GLYPH,
            height: GLYPH,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 200,
          }}
        >
          {icon}
        </div>
      )}

      {/* ── 왼쪽: 글 ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: TEXT_BOX + 78,
          height: '100%',
          padding: '66px 0 62px 78px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              width: 8,
              height: 8,
              borderRadius: 999,
              marginRight: 12,
              background: to,
            }}
          />
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 900, letterSpacing: '0.2em', color: alpha(to, 0.95) }}>
            {eyebrow.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize(headline),
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: 24,
              maxWidth: TEXT_BOX,
              // 없으면 한글이 음절 단위로 잘려 "체크리스 / 트"처럼 끊긴다
              wordBreak: 'keep-all',
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 27,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 590,
              wordBreak: 'keep-all',
            }}
          >
            {sub}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 900, color: 'rgba(255,255,255,0.45)' }}>
          vixutil.com
        </div>
      </div>
    </div>
  );
}
