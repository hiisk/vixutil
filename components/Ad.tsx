import CoupangAd from '@/components/CoupangAd';
import ReferralCards from '@/components/ReferralCards';
import type { AnyLocale10 } from '@/lib/locales';

/**
 * 화면에 붙는 광고 — 언어가 무엇을 낼지 정한다.
 *
 * ── 왜 갈랐나 (2026-08-20) ─────────────────────────────────
 * 전에는 어느 언어에나 코인 선물 거래소 카드 하나였다. 제휴 카드가 붙은 화면이
 * 일흔 곳인데 내주는 것이 그 둘뿐이라, 실수령액·BMI·사주를 보러 온 한국 사람에게
 * 선물 거래소를 내미는 꼴이었다.
 *
 * 한국은 쿠팡 파트너스로 바꾼다 — 계산기·운세를 쓰는 사람이 실제로 사는 곳이다.
 * **나머지 아홉 언어는 거래소를 그대로 둔다.** 쿠팡은 한국에서만 사고, 거래소
 * 쪽은 이미 열 언어 문구를 갖고 있다. 어느 쪽도 버릴 이유가 없다.
 *
 * ── 여기 한 곳에서만 가른다 ────────────────────────────────
 * 화면마다 `lang === 'ko' ? … : …`를 적으면 서른 곳이 되고, 곧 몇 곳만 고쳐진
 * 채로 남는다. 부르는 쪽은 <Ad lang={lang} /> 하나만 안다.
 */
export default function Ad({
  lang = 'ko',
  placement,
  className,
}: {
  lang?: AnyLocale10;
  /** 거래소 카드가 머리글을 고르는 데 쓴다 — 결과 화면은 문구가 다르다 */
  placement?: 'result';
  className?: string;
}) {
  if (lang === 'ko') return <CoupangAd lang={lang} className={className} />;
  return <ReferralCards lang={lang} placement={placement} />;
}
