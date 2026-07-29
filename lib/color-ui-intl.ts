/**
 * 색상 도구 화면 문구 — 세 언어.
 *
 * time-ui-intl.ts와 같은 방침 — 문구만 여기 모으고 컴포넌트는 lang으로 골라 쓴다.
 * 색 계산(HSL 변환·대비비·색각 변환)은 컴포넌트와 lib에 그대로 둔다.
 */
export type ColorLang = 'ko' | 'en' | 'zh';

type L<T> = Record<ColorLang, T>;

/* ── 공통 ── */
export const COLOR_COMMON: L<{ copy: string; copied: string }> = {
  ko: { copy: '복사', copied: '복사됨' },
  en: { copy: 'Copy', copied: 'Copied' },
  zh: { copy: '复制', copied: '已复制' },
};

/* ── 팔레트 생성기 ── */
export const PALETTE_UI: L<{
  baseColor: string; copyCss: string; copiedCss: string; ratioNote: string;
  schemes: { complementary: string; analogous: string; triadic: string; tetradic: string; monochrome: string };
  notes: { complementary: string; analogous: string; triadic: string; tetradic: string; monochrome: string };
}> = {
  ko: {
    baseColor: '기준 색', copyCss: 'CSS 변수로 한 번에 복사', copiedCss: '✅ CSS 변수로 복사했습니다',
    ratioNote: '배색 비율 60:30:10',
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
    schemes: { complementary: 'Complementary', analogous: 'Analogous', triadic: 'Triadic', tetradic: 'Tetradic', monochrome: 'Monochrome' },
    notes: {
      complementary: 'Directly opposite on the colour wheel. The strongest contrast available, which makes it a good accent — but splitting a large area fifty-fifty between them is tiring to look at.',
      analogous: 'Neighbours on the colour wheel. Natural and easy, which suits large areas like a background and its body text.',
      triadic: 'The wheel divided in three. Bright but still balanced, which is why it turns up often in illustration and brand palettes.',
      tetradic: 'The wheel divided in four. Plenty of colours to work with, and correspondingly easy to make a mess — pick one to lead and keep the rest subordinate.',
      monochrome: 'The same hue with only the lightness changed. Almost impossible to get wrong, and the usual choice when you want one screen to read as a single colour family.',
    },
  },
  zh: {
    baseColor: '基准色', copyCss: '整套复制为 CSS 变量', copiedCss: '✅ 已复制为 CSS 变量',
    ratioNote: '配色比例约 60:30:10',
    schemes: { complementary: '互补色', analogous: '类似色', triadic: '三角配色', tetradic: '四角配色', monochrome: '单色' },
    notes: {
      complementary: '色轮上正对面的颜色。对比最强，很适合做强调色；但在大面积上五五对分会看得很累。',
      analogous: '色轮上相邻的颜色。自然舒适，适合背景与正文这类大面积区域。',
      triadic: '把色轮三等分得到的颜色。鲜亮又不失平衡，插画与品牌配色里很常见。',
      tetradic: '把色轮四等分得到的颜色。可用的颜色多，也因此容易显乱 —— 要定一个主角，其余压住。',
      monochrome: '只改明度、不改色相。几乎不会出错，想让整个画面读起来是同一个色系时就用它。',
    },
  },
};

/* ── 명도 단계 ── */
export const SHADES_UI: L<{
  baseColor: string; whereTitle: string; contrastNote: string;
  whiteOk: string; blackOk: string; bothOk: string; lowContrast: string;
  useLight: string; useMid: string; useDark: string;
}> = {
  ko: {
    baseColor: '기준 색 (브랜드 색)', whereTitle: '어디에 쓰나요',
    contrastNote: '각 줄 오른쪽의 안내는 그 색을 배경으로 썼을 때 흰/검은 글씨가 접근성 기준(4.5:1)을 넘는지입니다.',
    whiteOk: '흰 글씨 OK', blackOk: '검은 글씨 OK', bothOk: '흰·검 모두 OK', lowContrast: '글씨 대비 부족',
    useLight: '배경, 연한 강조, 비활성 상태', useMid: '버튼, 링크 — 브랜드 색의 본체', useDark: '눌린 상태, 어두운 배경 위 글자',
  },
  en: {
    baseColor: 'Base colour (your brand colour)', whereTitle: 'Where each step goes',
    contrastNote: 'The note on the right of each row says whether white or black text clears the accessibility threshold (4.5:1) on that background.',
    whiteOk: 'White text OK', blackOk: 'Black text OK', bothOk: 'Both OK', lowContrast: 'Too little contrast for text',
    useLight: 'Backgrounds, soft highlights, disabled states', useMid: 'Buttons and links — the brand colour proper', useDark: 'Pressed states, and text on dark backgrounds',
  },
  zh: {
    baseColor: '基准色（品牌色）', whereTitle: '各阶用在哪里',
    contrastNote: '每行右侧的提示表示：以该色为背景时，白字或黑字是否达到无障碍标准（4.5:1）。',
    whiteOk: '白字可用', blackOk: '黑字可用', bothOk: '白黑都可用', lowContrast: '文字对比不足',
    useLight: '背景、浅色强调、禁用态', useMid: '按钮、链接 —— 品牌色本体', useDark: '按下态，以及深色背景上的文字',
  },
};

/* ── 색 섞기 ── */
export const MIXER_UI: L<{ first: string; second: string; ratio: string; stepsNote: string }> = {
  ko: { first: '첫 번째 색', second: '두 번째 색', ratio: '섞는 비율', stepsNote: '10% 간격 중간 단계' },
  en: { first: 'First colour', second: 'Second colour', ratio: 'Blend ratio', stepsNote: 'Steps at 10% intervals' },
  zh: { first: '第一个颜色', second: '第二个颜色', ratio: '混合比例', stepsNote: '每 10% 一个中间阶' },
};

/* ── 랜덤 색 ── */
export const RANDOM_UI: L<{ copyAll: string; copiedAll: string }> = {
  ko: { copyAll: 'HEX 다섯 개 한 번에 복사', copiedAll: '✅ 다섯 색을 복사했습니다' },
  en: { copyAll: 'Copy all five HEX values', copiedAll: '✅ Copied all five' },
  zh: { copyAll: '一次复制五个 HEX', copiedAll: '✅ 已复制五个颜色' },
};

/* ── 대비 검사 ── */
export const CONTRAST_UI: L<{
  textColor: string; bgColor: string;
  aaBody: string; aaLarge: string; aaaBody: string; aaaLarge: string;
  pass: string; fail: string;
  verdictBest: string; verdictBody: string; verdictLarge: string; verdictFail: string;
  aaNote: string; aaaNote: string; largeNote: string;
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
  },
  zh: {
    textColor: '文字颜色', bgColor: '背景颜色',
    aaBody: 'AA 正文', aaLarge: 'AA 大字', aaaBody: 'AAA 正文', aaaLarge: 'AAA 大字',
    pass: '通过', fail: '未达标',
    verdictBest: '连最严格的 AAA 也通过',
    verdictBody: '可用于正文（通过 AA）',
    verdictLarge: '只适合大字号',
    verdictFail: '这个组合很难读',
    aaNote: ' —— 无障碍的基准线。正文必须越过这条线。',
    aaaNote: ' —— 更严格的等级，公共部门网站有时会要求。',
    largeNote: ' —— 18pt（粗体 14pt）以上，门槛会降低。',
  },
};

/* ── 색맹 시뮬레이터 ── */
export const COLORBLIND_UI: L<{
  first: string; second: string; normal: string;
  distinguishable: string; hardToTell: string; adviceTitle: string; advice: string;
  types: { protanopia: string; deuteranopia: string; tritanopia: string; achromatopsia: string };
  descs: { protanopia: string; deuteranopia: string; tritanopia: string; achromatopsia: string };
}> = {
  ko: {
    first: '첫 번째 색', second: '두 번째 색', normal: '일반 색각으로 보이는 모습',
    distinguishable: '구분됨', hardToTell: '구분 어려움', adviceTitle: '색만으로 알리지 마세요',
    advice: '상태를 색으로만 구분하면 색각 이상이 있는 사람에게는 같은 화면이 됩니다. 아이콘·글자·모양을 함께 쓰면 누구에게나 전달됩니다.',
    types: { protanopia: '적색맹', deuteranopia: '녹색맹', tritanopia: '청색맹', achromatopsia: '전색맹' },
    descs: {
      protanopia: '빨강을 어둡게 느껴 빨강과 초록이 비슷해 보입니다',
      deuteranopia: '가장 흔한 유형으로, 빨강과 초록이 거의 같아 보입니다',
      tritanopia: '드문 유형으로, 파랑과 초록을 구분하기 어렵습니다',
      achromatopsia: '색을 전혀 구분하지 못해 명암만 남습니다',
    },
  },
  en: {
    first: 'First colour', second: 'Second colour', normal: 'As seen with normal colour vision',
    distinguishable: 'Distinguishable', hardToTell: 'Hard to tell apart', adviceTitle: 'Never signal with colour alone',
    advice: 'If a state is distinguished only by colour, it becomes the same screen for someone with colour vision deficiency. Pair the colour with an icon, a label or a shape and it reaches everyone.',
    types: { protanopia: 'Protanopia', deuteranopia: 'Deuteranopia', tritanopia: 'Tritanopia', achromatopsia: 'Achromatopsia' },
    descs: {
      protanopia: 'Reds appear darker, making red and green look similar',
      deuteranopia: 'The most common type — red and green look almost identical',
      tritanopia: 'A rare type, where blue and green are hard to separate',
      achromatopsia: 'No colour at all, only lightness remains',
    },
  },
  zh: {
    first: '第一个颜色', second: '第二个颜色', normal: '正常色觉下看到的样子',
    distinguishable: '可区分', hardToTell: '难以区分', adviceTitle: '不要只用颜色传达信息',
    advice: '如果状态只靠颜色区分，对色觉异常的人来说就是同一个画面。配上图标、文字或形状，信息才能传到每个人。',
    types: { protanopia: '红色盲', deuteranopia: '绿色盲', tritanopia: '蓝色盲', achromatopsia: '全色盲' },
    descs: {
      protanopia: '红色显得更暗，红与绿看起来相似',
      deuteranopia: '最常见的类型 —— 红与绿几乎一样',
      tritanopia: '较少见的类型，蓝与绿难以分辨',
      achromatopsia: '完全无法分辨颜色，只剩明暗',
    },
  },
};

/* ── 그라디언트 ── */
export const GRADIENT_UI: L<{
  startColor: string; midColor: string; endColor: string; angle: string;
  addMid: string; radial: string; presets: string; copyCss: string; copiedCss: string;
  presetNames: [string, string, string, string];
}> = {
  ko: {
    startColor: '시작 색', midColor: '중간 색', endColor: '끝 색', angle: '각도',
    addMid: '중간 색 넣기', radial: '가운데서 퍼지는 방사형으로', presets: '프리셋',
    copyCss: 'CSS 복사하기', copiedCss: '✅ CSS를 복사했습니다',
    presetNames: ['노을', '바다', '숲', '밤'],
  },
  en: {
    startColor: 'Start colour', midColor: 'Middle colour', endColor: 'End colour', angle: 'Angle',
    addMid: 'Add a middle colour', radial: 'Radial, spreading from the centre', presets: 'Presets',
    copyCss: 'Copy the CSS', copiedCss: '✅ CSS copied',
    presetNames: ['Sunset', 'Ocean', 'Forest', 'Night'],
  },
  zh: {
    startColor: '起始色', midColor: '中间色', endColor: '结束色', angle: '角度',
    addMid: '加一个中间色', radial: '从中心散开的径向渐变', presets: '预设',
    copyCss: '复制 CSS', copiedCss: '✅ 已复制 CSS',
    presetNames: ['晚霞', '海洋', '森林', '夜色'],
  },
};

/* ── 그림자 ── */
export const SHADOW_UI: L<{
  shadowColor: string; opacity: string; offsetX: string; offsetY: string; blur: string; spread: string;
  inset: string; copyCss: string; copiedCss: string;
  presets: [string, string, string, string];
}> = {
  ko: {
    shadowColor: '그림자 색', opacity: '투명도', offsetX: '가로 위치', offsetY: '세로 위치', blur: '흐림', spread: '번짐',
    inset: '안쪽 그림자(inset) — 눌린 느낌', copyCss: 'CSS 복사하기', copiedCss: '✅ CSS를 복사했습니다',
    presets: ['얕게', '보통', '깊게', '떠 있게'],
  },
  en: {
    shadowColor: 'Shadow colour', opacity: 'Opacity', offsetX: 'Offset X', offsetY: 'Offset Y', blur: 'Blur', spread: 'Spread',
    inset: 'Inset shadow — a pressed-in look', copyCss: 'Copy the CSS', copiedCss: '✅ CSS copied',
    presets: ['Subtle', 'Medium', 'Deep', 'Floating'],
  },
  zh: {
    shadowColor: '阴影颜色', opacity: '透明度', offsetX: '水平偏移', offsetY: '垂直偏移', blur: '模糊', spread: '扩散',
    inset: '内阴影（inset）—— 按下去的感觉', copyCss: '复制 CSS', copiedCss: '✅ 已复制 CSS',
    presets: ['轻微', '适中', '深', '悬浮'],
  },
};

/* ── 색 이름 찾기 ── */
export const NAME_UI: L<{ colorCode: string; nearest: string }> = {
  ko: { colorCode: '색 코드', nearest: '가장 가까운 이름' },
  en: { colorCode: 'Colour code', nearest: 'Nearest named colour' },
  zh: { colorCode: '色值', nearest: '最接近的颜色名' },
};

/* ── 색온도 ── */
export const TEMPERATURE_UI: L<{
  left: string; right: string;
  presets: { candle: string; incandescent: string; warmWhite: string; daylight: string; overcast: string; blue: string };
  descs: { candle: string; incandescent: string; warmWhite: string; daylight: string; overcast: string; blue: string };
}> = {
  ko: {
    left: '왼쪽 색온도', right: '오른쪽 색온도',
    presets: { candle: '촛불', incandescent: '전구색', warmWhite: '주백색', daylight: '주광색', overcast: '흐린 하늘', blue: '차가운 파랑' },
    descs: {
      candle: '아주 붉고 따뜻함', incandescent: '집 안 조명, 아늑함', warmWhite: '사무실·주방',
      daylight: '한낮 햇빛', overcast: '푸르스름한 흰빛', blue: '사진의 기준광',
    },
  },
  en: {
    left: 'Left temperature', right: 'Right temperature',
    presets: { candle: 'Candlelight', incandescent: 'Incandescent', warmWhite: 'Warm white', daylight: 'Daylight', overcast: 'Overcast sky', blue: 'Cool blue' },
    descs: {
      candle: 'Very red and warm', incandescent: 'Home lighting, cosy', warmWhite: 'Offices and kitchens',
      daylight: 'Midday sun', overcast: 'A bluish white', blue: 'The reference light in photography',
    },
  },
  zh: {
    left: '左侧色温', right: '右侧色温',
    presets: { candle: '烛光', incandescent: '暖黄灯', warmWhite: '中性白', daylight: '日光色', overcast: '阴天天空', blue: '冷蓝' },
    descs: {
      candle: '非常红、非常暖', incandescent: '家用照明，温馨', warmWhite: '办公室、厨房',
      daylight: '正午阳光', overcast: '偏蓝的白', blue: '摄影的基准光',
    },
  },
};
