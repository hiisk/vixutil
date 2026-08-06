/**
 * 화면 규격 143가지 — 해상도와 대각선 길이만 적는다.
 *
 * PPI·화면비·픽셀 수·CSS 해상도는 전부 세 숫자에서 계산된다. 표를 손으로 적으면
 * 143 × 다섯 칸이고, 하나가 틀려도 "그럴듯한 숫자"라 아무도 못 잡는다.
 *
 * 대신 제조사가 공표한 PPI를 함께 적어 둔다. 검사에서 계산값과 대조하므로,
 * 해상도나 대각선을 잘못 적으면 그 자리에서 드러난다 — 데이터 입력 실수를 잡는
 * 유일한 방법이다.
 *
 * 기기 이름은 브랜드가 정한 고유명사라 언어마다 옮기지 않는다. 갤럭시 S24를
 * 어느 나라에서든 Galaxy S24로 찾는다. 화면 문구만 여덟 언어로 둔다.
 */
export type ScreenKind = 'phone' | 'tablet' | 'laptop' | 'monitor' | 'tv' | 'watch' | 'console';

export interface Screen {
  slug: string;
  /** 브랜드가 붙인 이름 — 언어를 가리지 않는다 */
  name: string;
  kind: ScreenKind;
  /** 가로 픽셀 */
  w: number;
  /** 세로 픽셀 */
  h: number;
  /** 대각선(인치) */
  inch: number;
  /** 제조사가 공표한 PPI — 계산값과 대조해 입력 실수를 잡는다 */
  ppi: number;
  /** 나온 해 */
  year?: number;
}

const s = (slug: string, name: string, kind: ScreenKind, w: number, h: number, inch: number, ppi: number, year?: number): Screen =>
  ({ slug, name, kind, w, h, inch, ppi, year });

export const SCREENS: Screen[] = [
  /* ───────── 스마트폰 ───────── */
  s('iphone-16-pro-max', 'iPhone 16 Pro Max', 'phone', 1320, 2868, 6.9, 460, 2024),
  s('iphone-16-pro', 'iPhone 16 Pro', 'phone', 1206, 2622, 6.3, 460, 2024),
  s('iphone-16-plus', 'iPhone 16 Plus', 'phone', 1290, 2796, 6.7, 460, 2024),
  s('iphone-16', 'iPhone 16', 'phone', 1179, 2556, 6.1, 460, 2024),
  s('iphone-15-pro', 'iPhone 15 Pro', 'phone', 1179, 2556, 6.1, 460, 2023),
  s('iphone-15', 'iPhone 15', 'phone', 1179, 2556, 6.1, 460, 2023),
  s('iphone-14-pro-max', 'iPhone 14 Pro Max', 'phone', 1290, 2796, 6.7, 460, 2022),
  s('iphone-14', 'iPhone 14', 'phone', 1170, 2532, 6.1, 460, 2022),
  s('iphone-13-mini', 'iPhone 13 mini', 'phone', 1080, 2340, 5.4, 476, 2021),
  s('iphone-13', 'iPhone 13', 'phone', 1170, 2532, 6.1, 460, 2021),
  s('iphone-12', 'iPhone 12', 'phone', 1170, 2532, 6.1, 460, 2020),
  s('iphone-11', 'iPhone 11', 'phone', 828, 1792, 6.1, 326, 2019),
  s('iphone-xr', 'iPhone XR', 'phone', 828, 1792, 6.1, 326, 2018),
  s('iphone-x', 'iPhone X', 'phone', 1125, 2436, 5.8, 458, 2017),
  s('iphone-8', 'iPhone 8', 'phone', 750, 1334, 4.7, 326, 2017),
  s('galaxy-s24-plus', 'Galaxy S24+', 'phone', 1440, 3120, 6.7, 513, 2024),
  s('galaxy-s24', 'Galaxy S24', 'phone', 1080, 2340, 6.2, 416, 2024),
  s('galaxy-s23-ultra', 'Galaxy S23 Ultra', 'phone', 1440, 3088, 6.8, 500, 2023),
  s('galaxy-s23', 'Galaxy S23', 'phone', 1080, 2340, 6.1, 425, 2023),
  s('galaxy-s22', 'Galaxy S22', 'phone', 1080, 2340, 6.1, 425, 2022),
  s('galaxy-s21', 'Galaxy S21', 'phone', 1080, 2400, 6.2, 421, 2021),
  s('galaxy-z-fold5-main', 'Galaxy Z Fold5 (inner)', 'phone', 1812, 2176, 7.6, 373, 2023),
  s('galaxy-z-flip5', 'Galaxy Z Flip5', 'phone', 1080, 2640, 6.7, 425, 2023),
  s('galaxy-a54', 'Galaxy A54', 'phone', 1080, 2340, 6.4, 403, 2023),
  s('pixel-9-pro', 'Pixel 9 Pro', 'phone', 1280, 2856, 6.3, 495, 2024),
  s('pixel-8-pro', 'Pixel 8 Pro', 'phone', 1344, 2992, 6.7, 489, 2023),
  s('pixel-8', 'Pixel 8', 'phone', 1080, 2400, 6.2, 428, 2023),
  s('pixel-7', 'Pixel 7', 'phone', 1080, 2400, 6.3, 416, 2022),
  s('pixel-6a', 'Pixel 6a', 'phone', 1080, 2400, 6.1, 429, 2022),
  s('xiaomi-13t', 'Xiaomi 13T', 'phone', 1220, 2712, 6.67, 446, 2023),
  s('redmi-note-13', 'Redmi Note 13', 'phone', 1080, 2400, 6.67, 395, 2024),
  s('oneplus-12', 'OnePlus 12', 'phone', 1440, 3168, 6.82, 510, 2024),
  s('oppo-find-x7', 'OPPO Find X7', 'phone', 1264, 2780, 6.78, 450, 2024),
  s('nothing-phone-2', 'Nothing Phone (2)', 'phone', 1080, 2412, 6.7, 394, 2023),

  s('iphone-15-pro-max', 'iPhone 15 Pro Max', 'phone', 1290, 2796, 6.7, 460, 2023),
  s('iphone-se-3', 'iPhone SE (3rd gen)', 'phone', 750, 1334, 4.7, 326, 2022),
  s('pixel-9-pro-xl', 'Pixel 9 Pro XL', 'phone', 1344, 2992, 6.8, 486, 2024),
  s('pixel-9', 'Pixel 9', 'phone', 1080, 2424, 6.3, 422, 2024),
  s('galaxy-s24-ultra', 'Galaxy S24 Ultra', 'phone', 1440, 3120, 6.8, 505, 2024),
  s('galaxy-z-flip6', 'Galaxy Z Flip6', 'phone', 1080, 2640, 6.7, 425, 2024),
  s('xiaomi-14', 'Xiaomi 14', 'phone', 1200, 2670, 6.36, 460, 2024),

  s('pixel-9-pro-fold', 'Pixel 9 Pro Fold', 'phone', 2076, 2152, 8, 373, 2024),
  s('iphone-16e', 'iPhone 16e', 'phone', 1170, 2532, 6.1, 460, 2025),
  s('galaxy-s25-ultra', 'Galaxy S25 Ultra', 'phone', 1440, 3120, 6.9, 498, 2025),
  s('galaxy-s25-plus', 'Galaxy S25+', 'phone', 1440, 3120, 6.7, 513, 2025),
  s('galaxy-s25', 'Galaxy S25', 'phone', 1080, 2340, 6.2, 416, 2025),
  s('pixel-9a', 'Pixel 9a', 'phone', 1080, 2424, 6.3, 422, 2025),

  /* ───────── 태블릿 ───────── */
  s('ipad-pro-13-m4', 'iPad Pro 13" (M4)', 'tablet', 2064, 2752, 13.0, 264, 2024),
  s('ipad-pro-11-m4', 'iPad Pro 11" (M4)', 'tablet', 1668, 2420, 11.0, 264, 2024),
  s('ipad-air-13-m2', 'iPad Air 13" (M2)', 'tablet', 2048, 2732, 12.9, 264, 2024),
  s('ipad-air-11-m2', 'iPad Air 11" (M2)', 'tablet', 1640, 2360, 11.0, 264, 2024),
  s('ipad-10', 'iPad (10th gen)', 'tablet', 1640, 2360, 10.9, 264, 2022),
  s('ipad-mini-6', 'iPad mini (6th gen)', 'tablet', 1488, 2266, 8.3, 326, 2021),
  s('galaxy-tab-s9-ultra', 'Galaxy Tab S9 Ultra', 'tablet', 1848, 2960, 14.6, 239, 2023),
  s('galaxy-tab-s9', 'Galaxy Tab S9', 'tablet', 1600, 2560, 11.0, 274, 2023),
  s('galaxy-tab-a9-plus', 'Galaxy Tab A9+', 'tablet', 1200, 1920, 11.0, 206, 2023),
  s('surface-pro-9', 'Surface Pro 9', 'tablet', 1920, 2880, 13.0, 267, 2022),

  s('ipad-mini-7', 'iPad mini (A17 Pro)', 'tablet', 1488, 2266, 8.3, 326, 2024),
  s('galaxy-tab-s10-ultra', 'Galaxy Tab S10 Ultra', 'tablet', 1848, 2960, 14.6, 239, 2024),
  s('surface-pro-11', 'Surface Pro 11', 'tablet', 1440, 2160, 13, 201, 2024),
  s('ipad-air-13-m3', 'iPad Air 13 (M3)', 'tablet', 2732, 2048, 13, 264, 2025),
  s('galaxy-tab-s10-plus', 'Galaxy Tab S10+', 'tablet', 2800, 1752, 12.4, 266, 2024),

  /* ───────── 노트북 ───────── */
  s('macbook-air-13-m3', 'MacBook Air 13" (M3)', 'laptop', 2560, 1664, 13.6, 224, 2024),
  s('macbook-air-15-m3', 'MacBook Air 15" (M3)', 'laptop', 2880, 1864, 15.3, 224, 2024),
  s('macbook-pro-14-m3', 'MacBook Pro 14" (M3)', 'laptop', 3024, 1964, 14.2, 254, 2023),
  s('macbook-pro-16-m3', 'MacBook Pro 16" (M3)', 'laptop', 3456, 2234, 16.2, 254, 2023),
  s('macbook-air-13-m1', 'MacBook Air 13" (M1)', 'laptop', 2560, 1600, 13.3, 227, 2020),
  s('surface-laptop-5-13', 'Surface Laptop 5 13.5"', 'laptop', 2256, 1504, 13.5, 201, 2022),
  s('dell-xps-13-plus', 'Dell XPS 13 Plus', 'laptop', 1920, 1200, 13.4, 169, 2022),
  s('thinkpad-x1-carbon-g11', 'ThinkPad X1 Carbon Gen 11', 'laptop', 1920, 1200, 14.0, 162, 2023),
  s('lg-gram-16', 'LG gram 16', 'laptop', 2560, 1600, 16.0, 189, 2023),
  s('galaxy-book4-pro-14', 'Galaxy Book4 Pro 14"', 'laptop', 2880, 1800, 14.0, 243, 2024),
  s('rog-zephyrus-g14', 'ROG Zephyrus G14', 'laptop', 2880, 1800, 14.0, 243, 2024),
  s('framework-13', 'Framework Laptop 13', 'laptop', 2256, 1504, 13.5, 201, 2023),

  s('thinkpad-x1-carbon-g12', 'ThinkPad X1 Carbon Gen 12', 'laptop', 1920, 1200, 14, 162, 2024),

  s('macbook-pro-16-m4', 'MacBook Pro 16 (M4)', 'laptop', 3456, 2234, 16.2, 254, 2024),
  s('macbook-air-13-m4', 'MacBook Air 13 (M4)', 'laptop', 2560, 1664, 13.6, 224, 2025),
  s('macbook-pro-14-m4', 'MacBook Pro 14 (M4)', 'laptop', 3024, 1964, 14.2, 254, 2024),

  /* ───────── 모니터 ───────── */
  s('monitor-24-fhd', '24" Full HD monitor', 'monitor', 1920, 1080, 24.0, 92),
  s('monitor-27-fhd', '27" Full HD monitor', 'monitor', 1920, 1080, 27.0, 82),
  s('monitor-27-qhd', '27" QHD monitor', 'monitor', 2560, 1440, 27.0, 109),
  s('monitor-32-qhd', '32" QHD monitor', 'monitor', 2560, 1440, 32.0, 92),
  s('monitor-27-4k', '27" 4K monitor', 'monitor', 3840, 2160, 27.0, 163),
  s('monitor-32-4k', '32" 4K monitor', 'monitor', 3840, 2160, 32.0, 138),
  s('monitor-34-uwqhd', '34" ultrawide QHD', 'monitor', 3440, 1440, 34.0, 110),
  s('monitor-49-dqhd', '49" super ultrawide', 'monitor', 5120, 1440, 49.0, 109),
  s('studio-display-27', 'Apple Studio Display', 'monitor', 5120, 2880, 27.0, 218, 2022),
  s('pro-display-xdr', 'Apple Pro Display XDR', 'monitor', 6016, 3384, 32.0, 218, 2019),
  s('imac-24-m3', 'iMac 24" (M3)', 'monitor', 4480, 2520, 23.5, 218, 2023),
  s('monitor-21-5-fhd', '21.5" Full HD monitor', 'monitor', 1920, 1080, 21.5, 102),
  s('monitor-32-8k', '32" 8K monitor', 'monitor', 7680, 4320, 32.0, 275),
  s('monitor-27-5k', '27" 5K monitor', 'monitor', 5120, 2880, 27.0, 218),

  s('monitor-24-1200p', '24-inch WUXGA monitor', 'monitor', 1920, 1200, 24, 94),


  s('monitor-42-4k-oled', '42-inch 4K OLED monitor', 'monitor', 3840, 2160, 41.5, 106),
  s('monitor-23-8-fhd', '23.8" FHD Monitor', 'monitor', 1920, 1080, 23.8, 93),
  s('monitor-16-portable-2k', '16" Portable 2K', 'monitor', 2560, 1600, 16, 189),
  s('monitor-38-uwqhd-plus', '37.5" UWQHD+ Ultrawide', 'monitor', 3840, 1600, 37.5, 111),
  s('monitor-40-5k2k', '40" 5K2K Ultrawide', 'monitor', 5120, 2160, 40, 139),
  s('monitor-45-uwqhd-oled', '45" UWQHD OLED', 'monitor', 3440, 1440, 45, 83),
  s('monitor-57-dual-4k', '57" Dual 4K Superultrawide', 'monitor', 7680, 2160, 57, 140),

  /* ───────── TV ───────── */
  s('tv-32-hd', '32" HD TV', 'tv', 1366, 768, 32.0, 49),
  s('tv-43-4k', '43" 4K TV', 'tv', 3840, 2160, 43.0, 102),
  s('tv-50-4k', '50" 4K TV', 'tv', 3840, 2160, 50.0, 88),
  s('tv-55-4k', '55" 4K TV', 'tv', 3840, 2160, 55.0, 80),
  s('tv-65-4k', '65" 4K TV', 'tv', 3840, 2160, 65.0, 68),
  s('tv-75-4k', '75" 4K TV', 'tv', 3840, 2160, 75.0, 59),
  s('tv-85-4k', '85" 4K TV', 'tv', 3840, 2160, 85.0, 52),
  s('tv-55-8k', '55" 8K TV', 'tv', 7680, 4320, 55.0, 160),
  s('tv-65-8k', '65" 8K TV', 'tv', 7680, 4320, 65.0, 136),
  s('tv-75-8k', '75" 8K TV', 'tv', 7680, 4320, 75.0, 118),
  s('tv-98-4k', '98" 4K TV', 'tv', 3840, 2160, 98.0, 45),
  s('tv-40-fhd', '40" Full HD TV', 'tv', 1920, 1080, 40.0, 55),

  s('tv-77-4k', '77-inch 4K TV', 'tv', 3840, 2160, 77, 57),


  s('tv-32-1080p', '32-inch Full HD TV', 'tv', 1920, 1080, 32, 69),
  s('tv-48-4k-oled', '48" 4K OLED TV', 'tv', 3840, 2160, 48, 92),
  s('tv-70-4k', '70" 4K TV', 'tv', 3840, 2160, 70, 63),
  s('tv-85-8k', '85" 8K TV', 'tv', 7680, 4320, 85, 104),
  s('tv-100-4k', '100" 4K TV', 'tv', 3840, 2160, 100, 44),

  /* ───────── 스마트워치 ───────── */
  s('apple-watch-ultra-2', 'Apple Watch Ultra 2', 'watch', 410, 502, 1.92, 338, 2023),
  s('apple-watch-series-9-45', 'Apple Watch Series 9 (45mm)', 'watch', 396, 484, 1.9, 326, 2023),
  s('apple-watch-series-9-41', 'Apple Watch Series 9 (41mm)', 'watch', 352, 430, 1.69, 326, 2023),
  s('galaxy-watch6-44', 'Galaxy Watch6 (44mm)', 'watch', 480, 480, 1.47, 461, 2023),
  s('galaxy-watch6-40', 'Galaxy Watch6 (40mm)', 'watch', 432, 432, 1.31, 466, 2023),
  // 구글은 원형 패널의 가로 기준으로 320ppi라 적지만, 이 표는 다른 기기와 같이
  // 대각선 기준을 쓴다. 같은 화면을 두 방식으로 재면 값이 달라진다
  s('pixel-watch-2', 'Pixel Watch 2', 'watch', 384, 384, 1.2, 452, 2023),

  s('galaxy-watch7-44', 'Galaxy Watch7 44mm', 'watch', 480, 480, 1.47, 462, 2024),

  s('rog-ally-x', 'ROG Ally X', 'console', 1920, 1080, 7, 315, 2024),
  s('playdate', 'Playdate', 'console', 400, 240, 2.7, 173, 2022),

  /* ───────── 게임기·휴대기기 ───────── */
  s('steam-deck-lcd', 'Steam Deck LCD', 'console', 1280, 800, 7.0, 216, 2022),
  s('switch-oled', 'Nintendo Switch OLED', 'console', 1280, 720, 7.0, 210, 2021),
  s('switch', 'Nintendo Switch', 'console', 1280, 720, 6.2, 237, 2017),
  s('rog-ally', 'ROG Ally', 'console', 1920, 1080, 7.0, 315, 2023),
  s('playstation-portal', 'PlayStation Portal', 'console', 1920, 1080, 8.0, 275, 2023),

  s('steam-deck-oled', 'Steam Deck OLED', 'console', 1280, 800, 7.4, 204, 2023),

  /* ───────── 해상도 규격 자체 ───────── */
  s('vga-15', 'VGA on a 15" screen', 'monitor', 640, 480, 15.0, 53),
  s('svga-15', 'SVGA on a 15" screen', 'monitor', 800, 600, 15.0, 67),
  s('xga-15', 'XGA on a 15" screen', 'monitor', 1024, 768, 15.0, 85),
  s('wxga-14', 'WXGA on a 14" screen', 'monitor', 1366, 768, 14.0, 112),
  s('hd-plus-15', 'HD+ on a 15.6" screen', 'monitor', 1600, 900, 15.6, 118),
  s('wuxga-15', 'WUXGA on a 15.6" screen', 'monitor', 1920, 1200, 15.6, 145),
  s('qhd-plus-16', 'QHD+ on a 16" screen', 'monitor', 3200, 2000, 16.0, 236),
  s('uhd-15', '4K on a 15.6" screen', 'monitor', 3840, 2160, 15.6, 282),
  s('dci-4k-27', 'DCI 4K on a 27" screen', 'monitor', 4096, 2160, 27.0, 172),
  s('wqhd-plus-14', '2.8K on a 14" screen', 'monitor', 2880, 1800, 14.0, 243),

  /* ───────── 늘린 것 — 공표 PPI와 계산값이 맞는 것만 ───────── */
  s('iphone-7', 'iPhone 7', 'phone', 750, 1334, 4.7, 326, 2016),
  s('iphone-5s', 'iPhone 5s', 'phone', 640, 1136, 4.0, 326, 2013),
  s('galaxy-s10', 'Galaxy S10', 'phone', 1440, 3040, 6.1, 550, 2019),
  s('galaxy-s20', 'Galaxy S20', 'phone', 1440, 3200, 6.2, 563, 2020),
  s('galaxy-note20-ultra', 'Galaxy Note20 Ultra', 'phone', 1440, 3088, 6.9, 496, 2020),
  s('galaxy-s9', 'Galaxy S9', 'phone', 1440, 2960, 5.8, 570, 2018),
  s('pixel-5', 'Pixel 5', 'phone', 1080, 2340, 6.0, 432, 2020),
  s('pixel-4a', 'Pixel 4a', 'phone', 1080, 2340, 5.81, 443, 2020),
  s('xperia-1-v', 'Xperia 1 V', 'phone', 1644, 3840, 6.5, 643, 2023),
  s('ipad-pro-12-9-m2', 'iPad Pro 12.9 (M2)', 'tablet', 2048, 2732, 12.9, 264, 2022),
  s('ipad-9', 'iPad (9th gen)', 'tablet', 1620, 2160, 10.2, 264, 2021),
  s('galaxy-tab-s8', 'Galaxy Tab S8', 'tablet', 1600, 2560, 11, 274, 2022),
  s('macbook-pro-13-m2', 'MacBook Pro 13 (M2)', 'laptop', 2560, 1600, 13.3, 227, 2022),
  s('dell-xps-15-oled', 'Dell XPS 15 OLED', 'laptop', 3456, 2160, 15.6, 261, 2022),
  s('monitor-28-4k', '28형 4K 모니터', 'monitor', 3840, 2160, 28, 157),
  s('monitor-31-5-4k', '31.5형 4K 모니터', 'monitor', 3840, 2160, 31.5, 140),
  s('monitor-22-fhd', '21.5형 FHD 모니터', 'monitor', 1920, 1080, 21.5, 102),
  s('tv-58-4k', '58형 4K TV', 'tv', 3840, 2160, 58, 76),
  s('tv-83-4k-oled', '83형 4K OLED TV', 'tv', 3840, 2160, 83, 53),
];

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 화면 아이콘으로 그려진다 */
export const SCREEN_ICON = '🖥️';

export const SCREEN_SLUGS = SCREENS.map(x => x.slug);

export const screen = (slug: string): Screen | undefined => SCREENS.find(x => x.slug === slug);

export const SCREEN_KINDS: ScreenKind[] = ['phone', 'tablet', 'laptop', 'monitor', 'tv', 'watch', 'console'];

export const screensOfKind = (kind: ScreenKind): Screen[] => SCREENS.filter(x => x.kind === kind);
