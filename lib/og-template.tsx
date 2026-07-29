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

/** 왼쪽 글 영역의 안쪽 폭. 이보다 넘치면 오른쪽 아이콘을 침범한다. */
const TEXT_BOX = 624;

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
 * Satori에는 넘친 글자를 잘라낼 수단이 마땅치 않아서, 넘치면 그대로 아이콘
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
 * 공유 카드.
 *
 * 왼쪽에 글, 오른쪽에 큰 아이콘을 두는 2단 구성이다. 전에는 왼쪽에만 내용을
 * 몰아넣어 오른쪽 절반이 통째로 비어 있었는데, 링크 미리보기는 작게 잘려
 * 보이는 경우가 많아 빈 공간이 그대로 손해였다.
 *
 * 배경은 단색 그라데이션 대신 accent 두 색을 코너 글로우로 깔고 그 위에
 * 동심원 링을 얹었다. 색만 다르고 형태가 같으면 800장이 다 같아 보이므로,
 * 아이콘을 크게 키워 카드마다 형태가 달라지게 했다.
 *
 * Satori는 backdrop-filter·filter·CSS grid를 지원하지 않는다. 여기 쓰인
 * flex·radial-gradient·border-radius·box-shadow·opacity만으로 짜야 한다.
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
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        color: '#ffffff',
        background: `radial-gradient(1100px 760px at 0% 0%, ${alpha(from, 0.42)}, transparent 58%), radial-gradient(1000px 800px at 100% 100%, ${alpha(to, 0.4)}, transparent 58%), linear-gradient(145deg, #0b1020 0%, #070a14 55%, #0a0d1a 100%)`,
      }}
    >
      {/* ── 오른쪽 동심원 링. 화면 밖으로 흘려보내 잘린 원호만 남긴다 ── */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: -170,
          right: -230,
          width: 700,
          height: 700,
          borderRadius: 999,
          border: `2px solid ${alpha(from, 0.3)}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: -50,
          right: -110,
          width: 460,
          height: 460,
          borderRadius: 999,
          border: `2px solid ${alpha(to, 0.28)}`,
        }}
      />
      {/* 상단 헤어라인 — 카드 위쪽을 닫아주는 accent 선 */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          top: 0,
          left: 0,
          width: 1200,
          height: 7,
          background: `linear-gradient(90deg, ${from}, ${to})`,
        }}
      />

      {/* ── 왼쪽: 글 ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: TEXT_BOX + 76,
          padding: '64px 0 60px 76px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            padding: '10px 22px',
            borderRadius: 999,
            background: alpha(from, 0.18),
            border: `1px solid ${alpha(from, 0.55)}`,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize(title),
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              marginBottom: 24,
              // 없으면 한글이 음절 단위로 잘려 "체크리스 / 트"처럼 끊긴다
              wordBreak: 'keep-all',
            }}
          >
            {title}
          </div>
          {/* 제목과 설명 사이 짧은 accent 그어주기 */}
          <div
            style={{
              display: 'flex',
              width: 86,
              height: 6,
              borderRadius: 999,
              marginBottom: 26,
              background: `linear-gradient(90deg, ${from}, ${to})`,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 29,
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.42,
              maxWidth: TEXT_BOX,
              wordBreak: 'keep-all',
            }}
          >
            {desc}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 25, fontWeight: 800 }}>
          <span style={{ color: '#ffffff' }}>vix</span>
          <span style={{ color: alpha(to, 0.95) }}>util</span>
          <span style={{ color: 'rgba(255,255,255,0.28)', marginLeft: 14, fontWeight: 600 }}>vixutil.com</span>
        </div>
      </div>

      {/* ── 오른쪽: 큰 아이콘 타일 ── */}
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 300,
            borderRadius: 76,
            fontSize: 176,
            background: `linear-gradient(135deg, ${from}, ${to})`,
            border: '1px solid rgba(255,255,255,0.28)',
            // 아이콘이 어두운 배경에서 떠 보이도록 accent 색 글로우를 크게 준다
            boxShadow: `0 34px 110px ${alpha(from, 0.55)}, 0 0 0 18px ${alpha(to, 0.09)}`,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
