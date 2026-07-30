/**
 * 이미지 도구 화면에 뜨는 문구의 세 언어 사전.
 *
 * 계산·canvas 처리는 한국어 구현을 그대로 쓴다 — 여기서 갈리는 건 문구뿐이다.
 * 도구가 프리셋 배열을 들고 있는 경우(규격, 비율 등) 배열에서 label을 떼어내고
 * 여기 이름 배열을 인덱스로 참조한다. 픽셀·비율은 언어와 무관하기 때문이다.
 */
export type ImageLang = 'ko' | 'en';

/** 여덟 도구가 공통으로 쓰는 조각 — 입구, 결과 요약, 저장 버튼 */
export const IMAGE_COMMON: Record<ImageLang, {
  dropOne: string; dropMany: string; dropHow: string; notImage: string;
  original: string; result: string; saved: string; grew: string;
  otherPhoto: string; save: string; working: string;
  quality: string; smaller: string; sharper: string;
  bgFill: string; pickBg: string; bgColor: string;
}> = {
  ko: {
    dropOne: '사진을 올려주세요', dropMany: '사진 여러 장을 올려주세요',
    dropHow: '여기를 누르거나 끌어다 놓으세요',
    notImage: '이미지 파일이 아닙니다. JPG·PNG·WebP·GIF 등을 올려주세요.',
    original: '원본', result: '결과', saved: '절감', grew: '증가',
    otherPhoto: '다른 사진', save: '저장하기', working: '처리 중…',
    quality: '화질', smaller: '작게', sharper: '선명하게',
    bgFill: '투명 배경을 채울 색', pickBg: '배경색 직접 고르기', bgColor: '배경색',
  },
  en: {
    dropOne: 'Drop a photo here', dropMany: 'Drop several photos here',
    dropHow: 'Click here or drag a file in',
    notImage: 'That is not an image file. Try a JPG, PNG, WebP or GIF.',
    original: 'Original', result: 'Result', saved: 'saved', grew: 'larger',
    otherPhoto: 'New photo', save: 'Save', working: 'Working…',
    quality: 'Quality', smaller: 'Smaller', sharper: 'Sharper',
    bgFill: 'Colour to fill transparency', pickBg: 'Pick a background colour', bgColor: 'Background',
  },
};

/** 붙여넣기 안내 — kbd 태그가 끼어 있어 앞뒤를 나눈다 */
export const PASTE_HINT: Record<ImageLang, { before: string; after: string }> = {
  ko: { before: ' · ', after: '로 붙여넣기도 됩니다' },
  en: { before: ' · or paste with ', after: '' },
};

export const COMPRESS_UI: Record<ImageLang, {
  hint: string; formats: string[]; formatHints: string[]; saveAs: string;
  altOriginal: string; altResult: string; viewingOriginal: string; tapForOriginal: string;
  note: string; noteLink: string;
}> = {
  ko: {
    hint: 'JPG·PNG·WebP 모두 됩니다',
    formats: ['JPG', 'WebP'], formatHints: ['사진에 가장 무난', '같은 화질에 더 작음'],
    saveAs: '저장 형식',
    altOriginal: '원본 사진', altResult: '압축 결과 미리보기',
    viewingOriginal: '원본 보는 중', tapForOriginal: '누르면 원본',
    note: '크기(픽셀)는 그대로 두고 화질만 낮춥니다. 더 줄이려면 ',
    noteLink: '이미지 크기 조절',
  },
  en: {
    hint: 'JPG, PNG and WebP all work',
    formats: ['JPG', 'WebP'], formatHints: ['Safest for photos', 'Smaller at the same quality'],
    saveAs: 'Save as',
    altOriginal: 'The original photo', altResult: 'Preview of the compressed result',
    viewingOriginal: 'Showing original', tapForOriginal: 'Tap for original',
    note: 'The pixel dimensions stay the same — only quality comes down. To go smaller, also use ',
    noteLink: 'Image Resizer',
  },
};

export const RESIZE_UI: Record<ImageLang, {
  hint: string; alt: string; width: string; height: string;
  lockOn: string; lockOff: string; byRatio: string; originalLabel: string;
  presetsTitle: string; presets: string[]; note: string;
}> = {
  ko: {
    hint: '가로·세로를 원하는 픽셀로 맞춥니다', alt: '크기 조절 결과 미리보기',
    width: '가로 (px)', height: '세로 (px)',
    lockOn: '비율 고정을 풉니다', lockOff: '비율을 고정합니다',
    byRatio: '비율로 줄이기', originalLabel: '원본',
    presetsTitle: '자주 쓰는 규격',
    presets: ['인스타 정사각', '유튜브 썸네일', '프로필 512'],
    note: '원본보다 크게 늘리면 화질이 좋아지지는 않고 흐릿해집니다.',
  },
  en: {
    hint: 'Set the width and height in pixels', alt: 'Preview of the resized result',
    width: 'Width (px)', height: 'Height (px)',
    lockOn: 'Unlock the aspect ratio', lockOff: 'Lock the aspect ratio',
    byRatio: 'Scale by percentage', originalLabel: 'Original',
    presetsTitle: 'Common sizes',
    presets: ['Instagram square', 'YouTube thumbnail', 'Profile 512'],
    note: 'Enlarging past the original does not add detail — it just gets blurry.',
  },
};

export const CONVERT_UI: Record<ImageLang, {
  hint: string; alt: string; targetFormat: string; note: string;
}> = {
  ko: {
    hint: 'GIF·BMP·HEIC 등도 읽어서 변환합니다', alt: '변환 결과 미리보기',
    targetFormat: '바꿀 형식',
    note: 'JPG·WebP(품질 지정)에는 투명이 없어 원래 투명했던 부분이 이 색으로 채워집니다.',
  },
  en: {
    hint: 'GIF, BMP and HEIC can be read and converted too', alt: 'Preview of the converted result',
    targetFormat: 'Convert to',
    note: 'JPG and quality-set WebP have no transparency, so anything that was transparent gets filled with this colour.',
  },
};

export const CROP_UI: Record<ImageLang, {
  hint: string; alt: string; ratioTitle: string; ratios: string[];
  how: string; keeps: (ow: number, oh: number, w: number, h: number) => string;
}> = {
  ko: {
    hint: '필요한 부분만 남깁니다', alt: '자를 사진',
    ratioTitle: '비율 고정', ratios: ['자유', '1:1', '4:3', '3:4', '16:9', '9:16'],
    how: '사진 위에서 끌어 영역을 새로 그리거나, 네 모서리를 잡아 크기를 바꾸세요. 가운데를 끌면 위치가 움직입니다.',
    keeps: (ow, oh, w, h) => `원본 ${ow} × ${oh}px에서 ${w} × ${h}px만 남깁니다.`,
  },
  en: {
    hint: 'Keep only the part you need', alt: 'The photo to crop',
    ratioTitle: 'Lock ratio', ratios: ['Free', '1:1', '4:3', '3:4', '16:9', '9:16'],
    how: 'Drag on the photo to draw a new area, or grab a corner to resize. Drag the middle to move it.',
    keeps: (ow, oh, w, h) => `Keeping ${w} × ${h}px out of the original ${ow} × ${oh}px.`,
  },
};

export const ROTATE_UI: Record<ImageLang, {
  hint: string; alt: string; left: string; right: string; flipH: string; flipV: string;
  fineAngle: string; angleAria: string; toZero: string;
  cornerColor: string; cornerNote: string; dimension: (a: number) => string;
}> = {
  ko: {
    hint: '옆으로 누워 저장된 사진을 바로 세울 때', alt: '회전 결과 미리보기',
    left: '↺ 왼쪽', right: '↻ 오른쪽', flipH: '↔ 좌우', flipV: '↕ 상하',
    fineAngle: '각도 미세 조정', angleAria: '회전 각도', toZero: '0°로',
    cornerColor: '빈 구석을 채울 색',
    cornerNote: '90의 배수가 아닌 각도에서는 모서리에 빈 곳이 생깁니다',
    dimension: a => `${a}° 회전`,
  },
  en: {
    hint: 'For a photo that saved sideways', alt: 'Preview of the rotated result',
    left: '↺ Left', right: '↻ Right', flipH: '↔ Flip', flipV: '↕ Flip',
    fineAngle: 'Fine angle', angleAria: 'Rotation angle', toZero: 'To 0°',
    cornerColor: 'Colour to fill the corners',
    cornerNote: 'Any angle that is not a multiple of 90° leaves gaps at the corners',
    dimension: a => `Rotated ${a}°`,
  },
};

export const MOSAIC_UI: Record<ImageLang, {
  hint: string; how: string; modes: string[]; modeHints: string[];
  brush: string; cellSize: string; cellNote: string;
  undo: string; clear: string; dimension: (n: number) => string;
}> = {
  ko: {
    hint: '주소·계좌·얼굴이 담긴 캡처도 브라우저 밖으로 나가지 않습니다',
    how: '가리고 싶은 곳을 손가락이나 마우스로 문지르세요',
    modes: ['🔳 모자이크', '⬛ 검게 덮기'], modeHints: ['흐릿하게 뭉갬', '완전히 가림'],
    brush: '붓 굵기', cellSize: '모자이크 칸 크기',
    cellNote: '칸이 클수록 알아보기 어렵습니다. 글자를 가릴 때는 크게 잡으세요.',
    undo: '↩ 방금 지운 것 되돌리기', clear: '전부 지우기',
    dimension: n => `${n}번 칠함`,
  },
  en: {
    hint: 'Screenshots with addresses, account numbers or faces never leave the browser',
    how: 'Brush over anything you want hidden, with a finger or the mouse',
    modes: ['🔳 Pixelate', '⬛ Solid black'], modeHints: ['Blurs it out', 'Hides it completely'],
    brush: 'Brush size', cellSize: 'Pixel block size',
    cellNote: 'Bigger blocks are harder to read back. Go large when covering text.',
    undo: '↩ Undo the last stroke', clear: 'Clear all',
    dimension: n => `${n} strokes`,
  },
};

export const MERGE_UI: Record<ImageLang, {
  hint: string; hintMore: string; alt: string; countLine: (n: number) => string;
  up: string; down: string; remove: string;
  dirs: string[]; matchLabel: (which: string) => string; widthWord: string; heightWord: string;
  matchOff: string; gap: string; gapColor: string; gapColorAria: string; pickGapColor: string;
}> = {
  ko: {
    hint: '여러 장을 한 번에 고를 수 있습니다', hintMore: '이미 올린 사진 뒤에 이어서 붙습니다',
    alt: '이어붙인 결과 미리보기', countLine: n => `붙인 사진 ${n}장 — 순서를 바꿀 수 있어요`,
    up: '위로', down: '아래로', remove: '빼기',
    dirs: ['⬇ 세로로 잇기', '➡ 가로로 잇기'],
    matchLabel: w => `크기가 다른 사진 ${w} 맞추기`, widthWord: '폭', heightWord: '높이',
    matchOff: '끄면 원래 크기 그대로 가운데 정렬합니다',
    gap: '사진 사이 간격', gapColor: '여백 색', gapColorAria: '여백색', pickGapColor: '여백색 직접 고르기',
  },
  en: {
    hint: 'You can select several at once', hintMore: 'These get added after the photos already loaded',
    alt: 'Preview of the combined result', countLine: n => `${n} photos joined — you can reorder them`,
    up: 'Move up', down: 'Move down', remove: 'Remove',
    dirs: ['⬇ Stack vertically', '➡ Join side by side'],
    matchLabel: w => `Match the ${w} of differently sized photos`, widthWord: 'width', heightWord: 'height',
    matchOff: 'Turn this off to keep original sizes, centred',
    gap: 'Gap between photos', gapColor: 'Gap colour', gapColorAria: 'Gap colour', pickGapColor: 'Pick a gap colour',
  },
};

export const IMG_PALETTE_UI: Record<ImageLang, {
  hint: string; alt: string; how: string;
  copy: string; copied: string; copyHex: (hex: string) => string;
  pickedPoint: string; noteBefore: string; noteAfter: string;
  otherPhoto: string; savePalette: string;
}> = {
  ko: {
    hint: '사진·일러스트·스크린샷 아무거나',
    alt: '색을 추출할 사진 — 누르면 그 지점의 색을 읽습니다',
    how: '사진 위를 누르면 그 지점의 색을 정확히 집어냅니다',
    copy: '복사', copied: '복사됨', copyHex: hex => `${hex} 복사`,
    pickedPoint: ' · 찍은 지점',
    noteBefore: '가장 많이 쓰인 색은 ', noteAfter: '입니다 — 배경이나 포인트 색으로 그대로 쓰면 사진과 잘 어울립니다.',
    otherPhoto: '다른 사진', savePalette: '⬇ 팔레트 이미지로 저장',
  },
  en: {
    hint: 'A photo, an illustration, a screenshot — anything',
    alt: 'The photo to pull colours from — tap to read the colour at that point',
    how: 'Tap anywhere on the photo to pick up the exact colour there',
    copy: 'Copy', copied: 'Copied', copyHex: hex => `Copy ${hex}`,
    pickedPoint: ' · picked point',
    noteBefore: 'The most used colour is ', noteAfter: ' — use it as a background or accent and it will sit well with the photo.',
    otherPhoto: 'New photo', savePalette: '⬇ Save palette as an image',
  },
};
