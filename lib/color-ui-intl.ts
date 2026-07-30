/**
 * 색상 도구 화면 문구 — 세 언어.
 *
 * time-ui-intl.ts와 같은 방침 — 문구만 여기 모으고 컴포넌트는 lang으로 골라 쓴다.
 * 색 계산(HSL 변환·대비비·색각 변환)은 컴포넌트와 lib에 그대로 둔다.
 */
export type ColorLang = 'ko' | 'en';

type L<T> = Record<ColorLang, T>;

/* ── 공통 ── */
export const COLOR_COMMON: L<{ copy: string; copied: string }> = {
  ko: { copy: '복사', copied: '복사됨' },
  en: { copy: 'Copy', copied: 'Copied' },
};

/* ── 팔레트 생성기 ── */
export const PALETTE_UI: L<{
  baseColor: string; copyCss: string; copiedCss: string; ratioNote: string; ratioBody: string;
  schemes: { complementary: string; analogous: string; triadic: string; tetradic: string; monochrome: string };
  notes: { complementary: string; analogous: string; triadic: string; tetradic: string; monochrome: string };
}> = {
  ko: {
    baseColor: '기준 색', copyCss: 'CSS 변수로 한 번에 복사', copiedCss: '✅ CSS 변수로 복사했습니다',
    ratioNote: '배색 비율 60:30:10',
    ratioBody: '색을 고른 다음이 더 중요합니다. 넓은 배경에 60%, 보조 색에 30%, 강조에 10%로 쓰면 같은 색 조합이라도 훨씬 정돈돼 보입니다. 강조색을 30% 넘게 쓰면 강조가 아니게 됩니다.',
    schemes: { complementary: '보색', analogous: '유사색', triadic: '삼각 배색', tetradic: '사각 배색', monochrome: '단색' },
    notes: {
      complementary: '색상환에서 정반대에 있는 색입니다. 대비가 가장 강해 강조색으로 좋지만, 넓은 면적에 반반 쓰면 눈이 피로합니다.',
      analogous: '색상환에서 이웃한 색입니다. 자연스럽고 편안해 배경과 본문처럼 넓은 면적에 어울립니다.',
      triadic: '색상환을 셋으로 나눈 색입니다. 화사하면서 균형이 잡혀 일러스트나 브랜드 배색에 자주 쓰입니다.',
      tetradic: '색상환을 넷으로 나눈 색입니다. 쓸 수 있는 색이 많지만 그만큼 어수선해지기 쉬워 한 색을 주인공으로 정해야 합니다.',
      monochrome: '색상은 그대로 두고 밝기만 바꾼 것입니다. 실패할 일이 거의 없어 화면 하나를 한 색 계열로 묶을 때 씁니다.',
    },
  },
  en: {
    baseColor: 'Base colour', copyCss: 'Copy all as CSS variables', copiedCss: '✅ Copied as CSS variables',
    ratioNote: 'Use them roughly 60:30:10',
    ratioBody: 'What you do after picking the colours matters more. Give 60% to the broad background, 30% to the secondary and 10% to the accent, and the same set of colours reads as far more composed. Push the accent past 30% and it stops being an accent.',
    schemes: { complementary: 'Complementary', analogous: 'Analogous', triadic: 'Triadic', tetradic: 'Tetradic', monochrome: 'Monochrome' },
    notes: {
      complementary: 'Directly opposite on the colour wheel. The strongest contrast available, which makes it a good accent — but splitting a large area fifty-fifty between them is tiring to look at.',
      analogous: 'Neighbours on the colour wheel. Natural and easy, which suits large areas like a background and its body text.',
      triadic: 'The wheel divided in three. Bright but still balanced, which is why it turns up often in illustration and brand palettes.',
      tetradic: 'The wheel divided in four. Plenty of colours to work with, and correspondingly easy to make a mess — pick one to lead and keep the rest subordinate.',
      monochrome: 'The same hue with only the lightness changed. Almost impossible to get wrong, and the usual choice when you want one screen to read as a single colour family.',
    },
  },
};

/* ── 명도 단계 ── */
export const SHADES_UI: L<{
  baseColor: string; whereTitle: string; contrastNote: string;
  whiteOk: string; blackOk: string; bothOk: string; lowContrast: string;
  useLight: string; useMid: string; useDark: string; copyAllCss: string;
}> = {
  ko: {
    baseColor: '기준 색 (브랜드 색)', whereTitle: '어디에 쓰나요',
    contrastNote: '각 줄 오른쪽의 안내는 그 색을 배경으로 썼을 때 흰/검은 글씨가 접근성 기준(4.5:1)을 넘는지입니다.',
    whiteOk: '흰 글씨 OK', blackOk: '검은 글씨 OK', bothOk: '흰·검 모두 OK', lowContrast: '글씨 대비 부족',
    useLight: '배경, 연한 강조, 비활성 상태', useMid: '버튼, 링크 — 브랜드 색의 본체', useDark: '눌린 상태, 어두운 배경 위 글자',
    copyAllCss: 'CSS 변수 전체 복사',
  },
  en: {
    baseColor: 'Base colour (your brand colour)', whereTitle: 'Where each step goes',
    contrastNote: 'The note on the right of each row says whether white or black text clears the accessibility threshold (4.5:1) on that background.',
    whiteOk: 'White text OK', blackOk: 'Black text OK', bothOk: 'Both OK', lowContrast: 'Too little contrast for text',
    useLight: 'Backgrounds, soft highlights, disabled states', useMid: 'Buttons and links — the brand colour proper', useDark: 'Pressed states, and text on dark backgrounds',
    copyAllCss: 'Copy all as CSS variables',
  },
};

/* ── 색 섞기 ── */
export const MIXER_UI: L<{
  first: string; second: string; ratio: string; stepsNote: string; note: (c: string) => string;
}> = {
  ko: {
    first: '첫 번째 색', second: '두 번째 색', ratio: '섞는 비율', stepsNote: '10% 간격 중간 단계',
    note: c => `섞인 색은 흰 배경에서 대비 ${c}:1입니다. 두 색을 반씩 섞으면 채도가 떨어져 탁해지는 경우가 많은데, 이때는 한쪽을 70% 이상으로 기울이면 색이 살아납니다.`,
  },
  en: {
    first: 'First colour', second: 'Second colour', ratio: 'Blend ratio', stepsNote: 'Steps at 10% intervals',
    note: c => `The blend sits at ${c}:1 contrast on white. An even fifty-fifty mix often loses saturation and turns muddy — tipping one side past 70% usually brings the colour back.`,
  },
};

/* ── 랜덤 색 ── */
export const RANDOM_UI: L<{ copyAll: string; copiedAll: string; reroll: string; note: string }> = {
  ko: {
    copyAll: 'HEX 다섯 개 한 번에 복사', copiedAll: '✅ 다섯 색을 복사했습니다',
    reroll: '🎲 다시 뽑기 (스페이스바)',
    note: '마음에 드는 색이 나오면 자물쇠로 잠그고 나머지만 다시 뽑으세요. 완전 무작위 대신 채도 45~85%, 명도 35~70% 범위에서 뽑기 때문에 화면에 바로 쓸 수 있는 색이 나옵니다.',
  },
  en: {
    copyAll: 'Copy all five HEX values', copiedAll: '✅ Copied all five',
    reroll: '🎲 Reroll (spacebar)',
    note: 'When a colour you like comes up, lock it and reroll the rest. Rather than being fully random, colours are drawn from 45–85% saturation and 35–70% lightness, so what comes out is usable on a screen straight away.',
  },
};

/* ── 대비 검사 ── */
export const CONTRAST_UI: L<{
  textColor: string; bgColor: string;
  aaBody: string; aaLarge: string; aaaBody: string; aaaLarge: string;
  pass: string; fail: string;
  verdictBest: string; verdictBody: string; verdictLarge: string; verdictFail: string;
  aaNote: string; aaaNote: string; largeNote: string;
  ratio: string; autoFix: string; meaningTitle: string; brightnessNote: string;
  previewH: string; previewBody: string; previewSmall: string;
}> = {
  ko: {
    textColor: '글자색', bgColor: '배경색',
    aaBody: 'AA 본문', aaLarge: 'AA 큰 글씨', aaaBody: 'AAA 본문', aaaLarge: 'AAA 큰 글씨',
    pass: '통과', fail: '미달',
    verdictBest: '가장 높은 기준(AAA)까지 통과합니다',
    verdictBody: '본문에 쓸 수 있습니다 (AA 통과)',
    verdictLarge: '큰 글씨에만 쓸 수 있습니다',
    verdictFail: '이 조합은 읽기 어렵습니다',
    aaNote: ' — 웹 접근성의 기본선입니다. 본문은 여기를 넘겨야 합니다.',
    aaaNote: ' — 더 엄격한 기준으로, 공공 사이트에서 요구하기도 합니다.',
    largeNote: ' — 18pt(굵으면 14pt) 이상이면 기준이 낮아집니다.',
    ratio: '대비비', autoFix: '색상은 그대로 두고 밝기만 조절해 AA 통과시키기',
    meaningTitle: '기준이 뜻하는 것',
    brightnessNote: '대비는 색이 아니라 밝기 차이로 정해집니다. 그래서 노랑 위 흰 글씨는 색이 달라도 안 읽힙니다.',
    previewH: '큰 제목은 이렇게 보입니다', previewBody: '본문 크기 글자는 이 정도로 읽힙니다.',
    previewSmall: '작은 글씨(캡션)는 이만큼 작아집니다 — 대비가 부족하면 여기서 먼저 티가 납니다.',
  },
  en: {
    textColor: 'Text colour', bgColor: 'Background colour',
    aaBody: 'AA body', aaLarge: 'AA large', aaaBody: 'AAA body', aaaLarge: 'AAA large',
    pass: 'Pass', fail: 'Fail',
    verdictBest: 'Clears the strictest level (AAA)',
    verdictBody: 'Usable for body text (passes AA)',
    verdictLarge: 'Only usable at large sizes',
    verdictFail: 'This combination is hard to read',
    aaNote: ' — the baseline for web accessibility. Body text has to clear this.',
    aaaNote: ' — the stricter level, sometimes required for public-sector sites.',
    largeNote: ' — from 18pt (or 14pt bold) the threshold drops.',
    ratio: 'Contrast ratio', autoFix: 'Keep the hue, adjust lightness until it passes AA',
    meaningTitle: 'What the levels mean',
    brightnessNote: 'Contrast is decided by difference in lightness, not by hue. That is why white text on yellow is unreadable even though the colours are different.',
    previewH: 'A heading looks like this', previewBody: 'Body text reads at about this weight.',
    previewSmall: 'Small text like a caption gets this small — insufficient contrast shows up here first.',
  },
};

/* ── 색맹 시뮬레이터 ── */
export const COLORBLIND_UI: L<{
  first: string; second: string; normal: string;
  distinguishable: string; hardToTell: string; adviceTitle: string; advice: string;
  types: { protanopia: string; deuteranopia: string; tritanopia: string; achromatopsia: string };
  descs: { protanopia: string; deuteranopia: string; tritanopia: string; achromatopsia: string };
  approxNote: string;
}> = {
  ko: {
    first: '첫 번째 색', second: '두 번째 색', normal: '일반 색각으로 보이는 모습',
    distinguishable: '구분됨', hardToTell: '구분 어려움', adviceTitle: '색만으로 알리지 마세요',
    advice: '남성 스무 명 중 한 명꼴로 색각 이상이 있습니다. 성공은 초록, 실패는 빨강처럼 색으로만 구분하는 화면은 그중 상당수에게 같은 색으로 보입니다. 아이콘(✓ ✕)이나 글자를 함께 쓰면 색을 못 봐도 뜻이 전달됩니다.',
    types: { protanopia: '적색맹', deuteranopia: '녹색맹', tritanopia: '청색맹', achromatopsia: '전색맹' },
    descs: {
      protanopia: '빨강을 어둡게 느껴 빨강과 초록이 비슷해 보입니다',
      deuteranopia: '가장 흔한 유형으로, 빨강과 초록이 거의 같아 보입니다',
      tritanopia: '드문 유형으로, 파랑과 초록을 구분하기 어렵습니다',
      achromatopsia: '색을 전혀 구분하지 못해 명암만 남습니다',
    },
    approxNote: '시뮬레이션은 근사 변환이라 실제로 그 사람이 보는 색과 정확히 같지는 않습니다. 조합이 위험한지 가늠하는 용도로 쓰세요.',
  },
  en: {
    first: 'First colour', second: 'Second colour', normal: 'As seen with normal colour vision',
    distinguishable: 'Distinguishable', hardToTell: 'Hard to tell apart', adviceTitle: 'Never signal with colour alone',
    advice: 'Roughly one man in twenty has some colour vision deficiency. A screen that marks success in green and failure in red looks like the same colour to a good number of them. Pair the colour with an icon (✓ ✕) or a word and the meaning survives without it.',
    types: { protanopia: 'Protanopia', deuteranopia: 'Deuteranopia', tritanopia: 'Tritanopia', achromatopsia: 'Achromatopsia' },
    descs: {
      protanopia: 'Reds appear darker, making red and green look similar',
      deuteranopia: 'The most common type — red and green look almost identical',
      tritanopia: 'A rare type, where blue and green are hard to separate',
      achromatopsia: 'No colour at all, only lightness remains',
    },
    approxNote: 'The simulation is an approximation, so it is not exactly what someone actually sees. Use it to judge whether a combination is risky, not as a precise rendering.',
  },
};

/* ── 그라디언트 ── */
export const GRADIENT_UI: L<{
  startColor: string; midColor: string; endColor: string; angle: string;
  addMid: string; radial: string; presets: string; copyCss: string; copiedCss: string;
  presetNames: [string, string, string, string]; note: string;
}> = {
  ko: {
    startColor: '시작 색', midColor: '중간 색', endColor: '끝 색', angle: '각도',
    addMid: '중간 색 넣기', radial: '가운데서 퍼지는 방사형으로', presets: '프리셋',
    copyCss: 'CSS 복사하기', copiedCss: '✅ CSS를 복사했습니다',
    presetNames: ['노을', '바다', '숲', '밤'],
    note: '그라디언트 위에 글자를 얹을 때는 가장 밝은 지점과 가장 어두운 지점 양쪽에서 대비를 확인해야 합니다. 한쪽에서만 맞추면 반대쪽에서 글자가 사라집니다.',
  },
  en: {
    startColor: 'Start colour', midColor: 'Middle colour', endColor: 'End colour', angle: 'Angle',
    addMid: 'Add a middle colour', radial: 'Radial, spreading from the centre', presets: 'Presets',
    copyCss: 'Copy the CSS', copiedCss: '✅ CSS copied',
    presetNames: ['Sunset', 'Ocean', 'Forest', 'Night'],
    note: 'When you put text over a gradient, check the contrast at both the lightest and the darkest point. Tune it for one end only and the text disappears at the other.',
  },
};

/* ── 그림자 ── */
export const SHADOW_UI: L<{
  shadowColor: string; opacity: string; offsetX: string; offsetY: string; blur: string; spread: string;
  inset: string; copyCss: string; copiedCss: string;
  presets: [string, string, string, string]; note: string;
}> = {
  ko: {
    shadowColor: '그림자 색', opacity: '투명도', offsetX: '가로 위치', offsetY: '세로 위치', blur: '흐림', spread: '번짐',
    inset: '안쪽 그림자(inset) — 눌린 느낌', copyCss: 'CSS 복사하기', copiedCss: '✅ CSS를 복사했습니다',
    presets: ['얕게', '보통', '떠 있게', '깊게'],
    note: '자연스러운 그림자는 대개 아래로만 살짝 내려가고(가로 0), 색은 검정 대신 배경보다 조금 어두운 남색 계열을 옅게 씁니다. 순수한 검정 그림자는 탁해 보입니다.',
  },
  en: {
    shadowColor: 'Shadow colour', opacity: 'Opacity', offsetX: 'Offset X', offsetY: 'Offset Y', blur: 'Blur', spread: 'Spread',
    inset: 'Inset shadow — a pressed-in look', copyCss: 'Copy the CSS', copiedCss: '✅ CSS copied',
    presets: ['Subtle', 'Medium', 'Floating', 'Deep'],
    note: 'A natural shadow usually falls straight down (offset X of 0), and uses a faint navy rather than black — slightly darker than the background. Pure black shadows look muddy.',
  },
};

/* ── 색 이름 찾기 ── */
export const NAME_UI: L<{
  colorCode: string; nearest: string;
  almostSame: (d: number) => string; differs: (d: number) => string; cmykNote: string;
}> = {
  ko: {
    colorCode: '색 코드', nearest: '가장 가까운 이름',
    almostSame: d => `거의 같은 색입니다 (차이 ${d})`,
    differs: d => `이름 색과는 차이가 있습니다 (차이 ${d}) — 비슷한 계열로만 보세요`,
    cmykNote: 'CMYK 값은 단순 변환입니다. 실제 인쇄 색은 잉크·용지·인쇄기에 따라 달라지므로, 정확한 색이 필요한 인쇄물이라면 팬톤 같은 별색 지정이나 인쇄소 교정을 거쳐야 합니다.',
  },
  en: {
    colorCode: 'Colour code', nearest: 'Nearest named colour',
    almostSame: d => `Practically the same colour (difference ${d})`,
    differs: d => `Noticeably different from the named colour (difference ${d}) — treat it as the same family only`,
    cmykNote: 'The CMYK value is a straight conversion. Printed colour depends on the ink, the paper and the press, so for print work where the colour has to be right, specify a spot colour like Pantone or get a proof from the printer.',
  },
};

/* ── 색온도 ── */
export const TEMPERATURE_UI: L<{
  left: string; right: string;
  presets: { candle: string; incandescent: string; warmWhite: string; daylight: string; overcast: string; blue: string };
  descs: { candle: string; incandescent: string; warmWhite: string; daylight: string; overcast: string; blue: string };
  rightCompare: string; commonTitle: string; colderTitle: string; colderBody: string;
}> = {
  ko: {
    left: '왼쪽 색온도', right: '오른쪽 색온도',
    presets: { candle: '촛불', incandescent: '전구색', warmWhite: '주백색', daylight: '주광색', overcast: '흐린 하늘', blue: '차가운 파랑' },
    descs: {
      candle: '아주 붉고 따뜻함', incandescent: '집 안 조명, 아늑함', warmWhite: '사무실·주방',
      daylight: '한낮 햇빛', overcast: '푸르스름한 흰빛', blue: '사진의 기준광',
    },
    rightCompare: '오른쪽 색온도 (비교용)', commonTitle: '자주 쓰는 값', colderTitle: '숫자가 클수록 차갑다',
    colderBody: '말과 반대로, 켈빈 값이 낮을수록 붉고 따뜻한 빛이고 높을수록 푸르고 차가운 빛입니다. 쇠를 달굴 때 처음엔 붉게, 더 뜨거워지면 희고 푸르게 빛나는 것을 기준으로 삼았기 때문입니다. 집 안 조명은 2700~3000K, 작업 공간은 4000~5000K가 무난합니다.',
  },
  en: {
    left: 'Left temperature', right: 'Right temperature',
    presets: { candle: 'Candlelight', incandescent: 'Incandescent', warmWhite: 'Warm white', daylight: 'Daylight', overcast: 'Overcast sky', blue: 'Cool blue' },
    descs: {
      candle: 'Very red and warm', incandescent: 'Home lighting, cosy', warmWhite: 'Offices and kitchens',
      daylight: 'Midday sun', overcast: 'A bluish white', blue: 'The reference light in photography',
    },
    rightCompare: 'Right temperature (for comparison)', commonTitle: 'Common values', colderTitle: 'Higher numbers are colder',
    colderBody: 'Counter to how it sounds, a lower Kelvin value is redder and warmer, and a higher one is bluer and colder. The scale comes from heating metal — first red, then white and bluish as it gets hotter. Home lighting sits around 2700–3000K, and a workspace around 4000–5000K.',
  },
};

/**
 * 색 이름의 언어별 표기 — NAMED_COLORS의 name을 열쇠로 쓴다.
 *
 * hex와 배열 순서는 그대로 두고 이름만 갈아 끼운다. 영어는 name을 그대로 쓰면
 * 되므로 중국어만 둔다 — 'skyblue'는 영어권에서 그 자체가 색 이름이다.
 */
export const NAMED_COLOR_ZH: Record<string, string> = {
  black: '黑',
  white: '白',
  gray: '灰',
  silver: '银',
  red: '红',
  maroon: '栗红',
  crimson: '绯红',
  tomato: '番茄红',
  coral: '珊瑚色',
  orange: '橙',
  gold: '金',
  yellow: '黄',
  olive: '橄榄绿',
  lime: '黄绿',
  green: '绿',
  seagreen: '海绿',
  teal: '青',
  cyan: '青蓝',
  skyblue: '天蓝',
  blue: '蓝',
  navy: '藏青',
  indigo: '靛',
  purple: '紫',
  violet: '紫罗兰',
  magenta: '洋红',
  pink: '粉',
  brown: '棕',
  chocolate: '巧克力色',
  tan: '茶色',
  beige: '米色',
};
