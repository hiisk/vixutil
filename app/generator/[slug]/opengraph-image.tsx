import { ImageResponse } from 'next/og';
import { GENERATORS, GENERATOR_MAP } from '@/lib/generator-data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return GENERATORS.map(g => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATOR_MAP[slug];
  if (!gen) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
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
          <div style={{ fontSize: 120, marginBottom: 24, lineHeight: 1 }}>{gen.icon}</div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {gen.category}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            {gen.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: 'rgba(255,255,255,0.75)',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            {gen.desc}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 52,
            fontSize: 28,
            fontWeight: 900,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          vix.
        </div>
      </div>
    ),
    { ...size }
  );
}
