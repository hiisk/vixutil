import type { ReactElement } from 'react';

/** 공유(OG) 이미지 공통 규격·템플릿 — next/og(Satori)로 렌더 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

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
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        padding: '60px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.12)',
          borderRadius: '32px',
          padding: '56px 72px',
          border: '1.5px solid rgba(255,255,255,0.25)',
          width: '100%',
          maxWidth: '1040px',
        }}
      >
        <div style={{ fontSize: 128, marginBottom: 24, lineHeight: 1 }}>{icon}</div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 66,
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 22,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.82)',
            textAlign: 'center',
            lineHeight: 1.45,
            maxWidth: '880px',
          }}
        >
          {desc}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 34,
          right: 52,
          display: 'flex',
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: '0.02em',
        }}
      >
        <span style={{ color: '#ffffff' }}>vix</span>
        <span style={{ color: 'rgba(255,255,255,0.55)' }}>util</span>
      </div>
    </div>
  );
}
