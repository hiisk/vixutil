import type { ReactElement } from 'react';

/** 공유(OG) 이미지 공통 규격·템플릿 — next/og(Satori)로 렌더 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/** #rrggbb → rgba(r,g,b,a) */
function alpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

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
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '68px 76px',
        color: '#ffffff',
        // 어두운 베이스 + 페이지 accent 색을 코너 글로우로 깔아 깊이감·통일감
        background: `radial-gradient(900px 620px at 8% -8%, ${alpha(from, 0.55)}, transparent 55%), radial-gradient(1000px 720px at 104% 112%, ${alpha(to, 0.5)}, transparent 55%), linear-gradient(140deg, #0d1224 0%, #080b16 100%)`,
      }}
    >
      {/* 상단: eyebrow 칩 + 브랜드 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '11px 24px',
            borderRadius: 999,
            background: alpha(from, 0.16),
            border: `1px solid ${alpha(from, 0.5)}`,
            fontSize: 23,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#ffffff',
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: 27, fontWeight: 800, letterSpacing: '0.01em' }}>
          <span style={{ color: '#ffffff' }}>vix</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>util</span>
        </div>
      </div>

      {/* 중앙: 아이콘 타일 + 타이틀 + 설명 */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 156,
            height: 156,
            borderRadius: 38,
            marginBottom: 42,
            fontSize: 92,
            background: `linear-gradient(135deg, ${from}, ${to})`,
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: `0 26px 80px ${alpha(from, 0.5)}`,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 80,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1.04,
            marginBottom: 26,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 31,
            color: 'rgba(255,255,255,0.66)',
            lineHeight: 1.4,
            maxWidth: 940,
          }}
        >
          {desc}
        </div>
      </div>

      {/* 하단: accent 바 + 도메인 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            width: 132,
            height: 9,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${from}, ${to})`,
          }}
        />
        <div style={{ display: 'flex', fontSize: 23, fontWeight: 600, color: 'rgba(255,255,255,0.42)' }}>
          vixutil.com
        </div>
      </div>
    </div>
  );
}
