/**
 * 이미지 크기 156가지 — 가로세로 픽셀만 적는다.
 *
 * 화면비·메가픽셀·인쇄 크기·용량 어림은 전부 두 숫자에서 계산된다. 표를 손으로
 * 적으면 156 × 다섯 칸이고, 한 칸이 틀려도 그럴듯한 숫자라 아무도 못 잡는다.
 *
 * 이름은 플랫폼과 규격 이름이라 언어를 가리지 않는다. 어느 나라에서든
 * "YouTube thumbnail"은 1280×720이고 A4는 A4다.
 */
export type SizeKind =
  | 'social'   // 소셜 게시물
  | 'profile'  // 프로필과 배너
  | 'video'    // 영상 규격
  | 'print'    // 인쇄물
  | 'photo'    // 사진 인화
  | 'web'      // 웹 화면
  | 'icon'     // 아이콘과 파비콘
  | 'ad'       // 광고 배너
  | 'doc';     // 서류용 사진

export interface ImgSize {
  slug: string;
  /** 브랜드와 규격 이름 — 옮기지 않는다 */
  name: string;
  w: number;
  h: number;
  kind: SizeKind;
  /** 인쇄물은 실제 밀리미터가 정해져 있다 */
  mm?: [number, number];
}

const s = (slug: string, name: string, w: number, h: number, kind: SizeKind, mm?: [number, number]): ImgSize =>
  ({ slug, name, w, h, kind, ...(mm ? { mm } : {}) });

export const IMG_SIZES: ImgSize[] = [
  /* ───────── 소셜 게시물 ───────── */
  s('instagram-square', 'Instagram square post', 1080, 1080, 'social'),
  s('instagram-portrait', 'Instagram portrait post', 1080, 1350, 'social'),
  s('instagram-landscape', 'Instagram landscape post', 1080, 566, 'social'),
  s('instagram-story', 'Instagram story', 1080, 1920, 'social'),
  s('instagram-reels', 'Instagram Reels cover', 1080, 1920, 'social'),
  s('facebook-post', 'Facebook post', 1200, 630, 'social'),
  s('facebook-story', 'Facebook story', 1080, 1920, 'social'),
  s('x-post', 'X post image', 1600, 900, 'social'),
  s('linkedin-post', 'LinkedIn post', 1200, 627, 'social'),
  s('pinterest-pin', 'Pinterest pin', 1000, 1500, 'social'),
  s('tiktok-video', 'TikTok video', 1080, 1920, 'social'),
  s('youtube-thumbnail', 'YouTube thumbnail', 1280, 720, 'social'),
  s('youtube-shorts', 'YouTube Shorts', 1080, 1920, 'social'),
  s('threads-post', 'Threads post', 1080, 1350, 'social'),
  s('og-image', 'Open Graph share card', 1200, 630, 'social'),
  s('twitter-card-summary', 'Summary card image', 1200, 600, 'social'),
  s('kakao-share', 'Messenger share card', 800, 400, 'social'),
  s('blog-thumbnail', 'Blog thumbnail', 1200, 800, 'social'),
  s('youtube-community-post', 'YouTube community post', 1200, 1200, 'social'),
  s('linkedin-article-cover', 'LinkedIn article cover', 1920, 1080, 'social'),
  s('naver-blog-thumbnail', 'Naver blog thumbnail', 800, 600, 'social'),
  s('whatsapp-status', 'WhatsApp status', 1080, 1920, 'social'),

  /* ───────── 프로필과 배너 ───────── */
  s('instagram-profile', 'Instagram profile photo', 320, 320, 'profile'),
  s('facebook-profile', 'Facebook profile photo', 400, 400, 'profile'),
  s('facebook-cover', 'Facebook cover', 851, 315, 'profile'),
  s('x-profile', 'X profile photo', 400, 400, 'profile'),
  s('x-header', 'X header', 1500, 500, 'profile'),
  s('linkedin-profile', 'LinkedIn profile photo', 400, 400, 'profile'),
  s('linkedin-cover', 'LinkedIn cover', 1584, 396, 'profile'),
  s('youtube-profile', 'YouTube channel photo', 800, 800, 'profile'),
  s('youtube-banner', 'YouTube channel banner', 2560, 1440, 'profile'),
  s('twitch-banner', 'Twitch profile banner', 1200, 480, 'profile'),
  s('discord-avatar', 'Discord avatar', 512, 512, 'profile'),
  s('github-avatar', 'GitHub avatar', 500, 500, 'profile'),
  s('zoom-background', 'Video call background', 1920, 1080, 'profile'),
  s('email-signature', 'Email signature image', 600, 200, 'profile'),
  s('spotify-playlist-cover', 'Spotify playlist cover', 640, 640, 'profile'),
  s('slack-avatar', 'Slack avatar', 512, 512, 'profile'),
  s('notion-cover', 'Notion page cover', 1500, 600, 'profile'),

  /* ───────── 영상 규격 ───────── */
  s('video-sd', 'SD video (480p)', 854, 480, 'video'),
  s('video-hd', 'HD video (720p)', 1280, 720, 'video'),
  s('video-fhd', 'Full HD video (1080p)', 1920, 1080, 'video'),
  s('video-qhd', 'QHD video (1440p)', 2560, 1440, 'video'),
  s('video-4k', '4K UHD video', 3840, 2160, 'video'),
  s('video-8k', '8K UHD video', 7680, 4320, 'video'),
  s('video-dci-2k', 'DCI 2K cinema', 2048, 1080, 'video'),
  s('video-dci-4k', 'DCI 4K cinema', 4096, 2160, 'video'),
  s('video-vertical-fhd', 'Vertical Full HD', 1080, 1920, 'video'),
  s('video-square', 'Square video', 1080, 1080, 'video'),
  s('video-cinemascope', 'CinemaScope 2.39:1', 1920, 803, 'video'),
  s('video-ultrawide', 'Ultrawide 21:9', 2560, 1080, 'video'),

  s('video-360p', '360p video', 640, 360, 'video'),
  s('video-480p', '480p video', 854, 480, 'video'),
  s('video-720p-vertical', '720p vertical video', 720, 1280, 'video'),
  s('video-1440p-vertical', '1440p vertical video', 1440, 2560, 'video'),
  s('video-anamorphic-4k', '4K anamorphic 2.39:1', 3840, 1608, 'video'),
  s('video-vertical-4k', '4K vertical', 2160, 3840, 'video'),
  s('video-240p', '240p', 426, 240, 'video'),

  /* ───────── 인쇄물 (300dpi) ───────── */
  s('a0-300dpi', 'A0 at 300 dpi', 9933, 14043, 'print', [841, 1189]),
  s('a1-300dpi', 'A1 at 300 dpi', 7016, 9933, 'print', [594, 841]),
  s('a2-300dpi', 'A2 at 300 dpi', 4961, 7016, 'print', [420, 594]),
  s('a3-300dpi', 'A3 at 300 dpi', 3508, 4961, 'print', [297, 420]),
  s('a4-300dpi', 'A4 at 300 dpi', 2480, 3508, 'print', [210, 297]),
  s('a5-300dpi', 'A5 at 300 dpi', 1748, 2480, 'print', [148, 210]),
  s('a6-300dpi', 'A6 at 300 dpi', 1240, 1748, 'print', [105, 148]),
  s('b4-300dpi', 'B4 at 300 dpi', 2953, 4169, 'print', [250, 353]),
  s('b5-300dpi', 'B5 at 300 dpi', 2079, 2953, 'print', [176, 250]),
  s('letter-300dpi', 'US Letter at 300 dpi', 2550, 3300, 'print', [216, 279]),
  s('legal-300dpi', 'US Legal at 300 dpi', 2550, 4200, 'print', [216, 356]),
  s('tabloid-300dpi', 'Tabloid at 300 dpi', 3300, 5100, 'print', [279, 432]),
  s('business-card-300dpi', 'Business card at 300 dpi', 1063, 650, 'print', [90, 55]),
  s('postcard-300dpi', 'Postcard at 300 dpi', 1748, 1181, 'print', [148, 100]),
  s('a4-150dpi', 'A4 at 150 dpi', 1240, 1754, 'print', [210, 297]),
  s('a4-72dpi', 'A4 at 72 dpi', 595, 842, 'print', [210, 297]),

  s('a7-300dpi', 'A7 at 300 dpi', 874, 1240, 'print', [74, 105]),
  s('a8-300dpi', 'A8 at 300 dpi', 614, 874, 'print', [52, 74]),
  s('b3-300dpi', 'B3 at 300 dpi', 4169, 5906, 'print', [353, 500]),
  s('ansi-c-300dpi', 'ANSI C at 300 dpi', 5100, 6600, 'print', [431.8, 558.8]),
  s('b2-300dpi', 'B2 at 300 dpi', 5906, 8350, 'print', [500, 707]),
  s('a3-150dpi', 'A3 at 150 dpi', 1754, 2480, 'print', [297, 420]),
  s('a5-150dpi', 'A5 at 150 dpi', 874, 1240, 'print', [148, 210]),
  s('letter-150dpi', 'US Letter at 150 dpi', 1275, 1650, 'print', [216, 279]),

  /* ───────── 사진 인화 ───────── */
  s('photo-3x5', '3×5 in print', 900, 1500, 'photo', [76, 127]),
  s('photo-4x6', '4×6 in print', 1200, 1800, 'photo', [102, 152]),
  s('photo-5x7', '5×7 in print', 1500, 2100, 'photo', [127, 178]),
  s('photo-8x10', '8×10 in print', 2400, 3000, 'photo', [203, 254]),
  s('photo-11x14', '11×14 in print', 3300, 4200, 'photo', [279, 356]),
  s('photo-16x20', '16×20 in print', 4800, 6000, 'photo', [406, 508]),
  s('photo-20x30', '20×30 in print', 6000, 9000, 'photo', [508, 762]),
  s('photo-wallet', 'Wallet print', 750, 1050, 'photo', [64, 89]),

  s('photo-2x3', '2×3 in print', 600, 900, 'photo', [51, 76]),
  s('photo-12x18', '12×18 in print', 3600, 5400, 'photo', [305, 457]),
  s('photo-6x8', '6×8 in print', 1800, 2400, 'photo', [152, 203]),
  s('photo-8x12', '8×12 in print', 2400, 3600, 'photo', [203, 305]),
  s('photo-24x36', '24×36 in print', 7200, 10800, 'photo', [610, 914]),

  /* ───────── 웹 화면 ───────── */
  s('web-hero', 'Website hero image', 1920, 1080, 'web'),
  s('web-banner-wide', 'Wide site banner', 1920, 600, 'web'),
  s('web-card', 'Card thumbnail', 600, 400, 'web'),
  s('web-mobile-hero', 'Mobile hero image', 750, 1334, 'web'),
  s('web-background-4k', '4K background', 3840, 2160, 'web'),
  s('wallpaper-fhd', 'Desktop wallpaper 1080p', 1920, 1080, 'web'),
  s('wallpaper-qhd', 'Desktop wallpaper 1440p', 2560, 1440, 'web'),
  s('wallpaper-4k', 'Desktop wallpaper 4K', 3840, 2160, 'web'),
  s('wallpaper-phone', 'Phone wallpaper', 1080, 2340, 'web'),
  s('wallpaper-tablet', 'Tablet wallpaper', 2048, 2732, 'web'),
  s('email-header', 'Email header', 600, 200, 'web'),
  s('email-body-width', 'Email body image', 600, 400, 'web'),

  s('web-1366', '1366×768 laptop viewport', 1366, 768, 'web'),
  s('web-1440', '1440×900 laptop viewport', 1440, 900, 'web'),
  s('web-tablet-portrait', 'Tablet portrait viewport', 768, 1024, 'web'),
  s('web-1280', '1280×800 laptop', 1280, 800, 'web'),
  s('web-mobile-390', '390×844 phone', 390, 844, 'web'),
  s('web-mobile-430', '430×932 phone', 430, 932, 'web'),

  /* ───────── 아이콘과 파비콘 ───────── */
  s('favicon-16', 'Favicon 16', 16, 16, 'icon'),
  s('favicon-32', 'Favicon 32', 32, 32, 'icon'),
  s('favicon-48', 'Favicon 48', 48, 48, 'icon'),
  s('favicon-96', 'Favicon 96', 96, 96, 'icon'),
  s('apple-touch-icon', 'Apple touch icon', 180, 180, 'icon'),
  s('android-icon-192', 'Android icon 192', 192, 192, 'icon'),
  s('android-icon-512', 'Android icon 512', 512, 512, 'icon'),
  s('maskable-icon', 'Maskable app icon', 512, 512, 'icon'),
  s('ios-app-icon', 'iOS app icon', 1024, 1024, 'icon'),
  s('play-store-icon', 'Play Store icon', 512, 512, 'icon'),
  s('play-store-feature', 'Play Store feature graphic', 1024, 500, 'icon'),
  s('windows-tile', 'Windows tile', 270, 270, 'icon'),
  s('ui-icon-24', 'UI icon 24', 24, 24, 'icon'),
  s('ui-icon-48', 'UI icon 48', 48, 48, 'icon'),

  s('favicon-64', 'Favicon 64', 64, 64, 'icon'),
  s('pwa-icon-384', 'PWA icon 384', 384, 384, 'icon'),
  s('mac-app-icon', 'macOS app icon', 1024, 1024, 'icon'),
  s('favicon-128', 'Favicon 128', 128, 128, 'icon'),
  s('android-icon-144', 'Android icon 144', 144, 144, 'icon'),

  /* ───────── 광고 배너 ───────── */
  s('ad-leaderboard', 'Leaderboard banner', 728, 90, 'ad'),
  s('ad-large-leaderboard', 'Large leaderboard', 970, 90, 'ad'),
  s('ad-billboard', 'Billboard banner', 970, 250, 'ad'),
  s('ad-medium-rectangle', 'Medium rectangle', 300, 250, 'ad'),
  s('ad-large-rectangle', 'Large rectangle', 336, 280, 'ad'),
  s('ad-half-page', 'Half page ad', 300, 600, 'ad'),
  s('ad-skyscraper', 'Skyscraper', 120, 600, 'ad'),
  s('ad-wide-skyscraper', 'Wide skyscraper', 160, 600, 'ad'),
  s('ad-mobile-banner', 'Mobile banner', 320, 50, 'ad'),
  s('ad-large-mobile-banner', 'Large mobile banner', 320, 100, 'ad'),
  s('ad-square', 'Square ad', 250, 250, 'ad'),
  s('ad-small-square', 'Small square ad', 200, 200, 'ad'),
  s('ad-portrait', 'Portrait ad', 300, 1050, 'ad'),
  s('ad-interstitial', 'Mobile interstitial', 320, 480, 'ad'),

  s('ad-full-banner', 'Full banner', 468, 60, 'ad'),
  s('ad-vertical-rectangle', 'Vertical rectangle', 240, 400, 'ad'),

  /* ───────── 서류용 사진 ───────── */
  s('id-photo-passport-kr', 'Passport photo 35×45 mm', 413, 531, 'doc', [35, 45]),
  s('id-photo-visa-us', 'US visa photo 51×51 mm', 600, 600, 'doc', [51, 51]),
  s('id-photo-resume', 'Résumé photo 30×40 mm', 354, 472, 'doc', [30, 40]),
  s('id-photo-half', 'Half-body photo 35×45 mm', 413, 531, 'doc', [35, 45]),
  s('id-photo-license', 'Licence photo 25×30 mm', 295, 354, 'doc', [25, 30]),
  s('id-photo-schengen', 'Schengen visa photo 35×45 mm', 413, 531, 'doc', [35, 45]),
  s('id-photo-china-visa', 'China visa photo 33×48 mm', 390, 567, 'doc', [33, 48]),
  s('id-photo-india', 'India photo 51×51 mm', 600, 600, 'doc', [51, 51]),
];

export const SIZE_KINDS: SizeKind[] = ['social', 'profile', 'video', 'print', 'photo', 'web', 'icon', 'ad', 'doc'];

export const IMG_SIZE_SLUGS = IMG_SIZES.map(x => x.slug);

export const imgSizeOf = (slug: string): ImgSize | undefined => IMG_SIZES.find(x => x.slug === slug);

export const sizesOfKind = (kind: SizeKind): ImgSize[] => IMG_SIZES.filter(x => x.kind === kind);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 액자 아이콘으로 그려진다 */
export const IMG_SIZE_ICON = '🖼️';
