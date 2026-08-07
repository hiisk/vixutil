import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  ear, headPose, eyeOpenness, realSmile, smileCurve, idPhoto, framing,
  shootDistance, lighting, sharpness, whiteBalance, backdrop, mirrorFace,
  HEAD_WIDTH_MM, type Face, type PixelStats,
} from '../lib/snap/measures.ts';

/**
 * 스냅테스트가 재는 값이 실제로 그것을 재는지 본다.
 *
 * 이 섹션의 규칙은 "재는 것은 진짜, 풀이는 재미"다. 그 앞쪽이 무너지면 남는
 * 것이 없으므로, **얼굴을 지어 넣고 되묻는다** — 오른쪽으로 기울인 얼굴에서
 * roll이 양수로 나오는지, 눈을 감긴 얼굴에서 blinked가 서는지.
 * 부호 하나만 뒤집혀도 화면에는 그럴듯한 숫자가 그대로 나오므로
 * 사람이 사진을 넣어 보기 전에는 모른다.
 */

/** 정면·무표정·눈을 뜬 기준 얼굴. 좌표는 400×500 사진 기준이다. */
function baseFace(): Face {
  const eye = (cx: number, cy: number, w: number, h: number) => [
    { x: cx - w / 2, y: cy },
    { x: cx - w / 6, y: cy - h / 2 },
    { x: cx + w / 6, y: cy - h / 2 },
    { x: cx + w / 2, y: cy },
    { x: cx + w / 6, y: cy + h / 2 },
    { x: cx - w / 6, y: cy + h / 2 },
  ];
  // 입: [왼꼬리, ×2, 위중앙, ×2, 오른꼬리, ×2, 아래중앙, ×2]
  const mouth = (cy: number, corner: number) => [
    { x: 160, y: corner }, { x: 175, y: cy - 8 }, { x: 190, y: cy - 10 },
    { x: 200, y: cy - 10 }, { x: 210, y: cy - 10 }, { x: 225, y: cy - 8 },
    { x: 240, y: corner }, { x: 225, y: cy + 8 }, { x: 210, y: cy + 10 },
    { x: 200, y: cy + 10 }, { x: 190, y: cy + 10 }, { x: 175, y: cy + 8 },
  ];
  const jaw = Array.from({ length: 17 }, (_, i) => ({
    x: 120 + i * 10,
    y: 260 + Math.sin((i / 16) * Math.PI) * 90,
  }));
  return {
    jaw,
    mouth: mouth(300, 300),
    leftEye: eye(165, 210, 34, 12),
    rightEye: eye(235, 210, 34, 12),
    // 코 일곱 점: 콧대 위에서 코끝까지
    nose: [
      { x: 200, y: 210 }, { x: 200, y: 225 }, { x: 200, y: 240 },
      { x: 200, y: 255 }, { x: 188, y: 262 }, { x: 194, y: 264 },
      { x: 200, y: 265 },
    ],
    leftBrow: [{ x: 148, y: 190 }, { x: 165, y: 184 }, { x: 182, y: 188 }],
    rightBrow: [{ x: 218, y: 188 }, { x: 235, y: 184 }, { x: 252, y: 190 }],
    box: { x: 110, y: 120, width: 180, height: 260 },
    imageWidth: 400,
    imageHeight: 500,
  };
}

/** 얼굴 전체를 중심으로 도는 회전 — 기울인 사진을 만든다 */
function rotate(f: Face, deg: number): Face {
  const a = (deg * Math.PI) / 180;
  const cx = 200, cy = 250;
  const turn = (p: { x: number; y: number }) => ({
    x: cx + (p.x - cx) * Math.cos(a) - (p.y - cy) * Math.sin(a),
    y: cy + (p.x - cx) * Math.sin(a) + (p.y - cy) * Math.cos(a),
  });
  return {
    ...f,
    jaw: f.jaw.map(turn), mouth: f.mouth.map(turn),
    leftEye: f.leftEye.map(turn), rightEye: f.rightEye.map(turn),
    nose: f.nose.map(turn), leftBrow: f.leftBrow.map(turn), rightBrow: f.rightBrow.map(turn),
  };
}

/**
 * 얼굴을 사진 안에 **놓는다** — 좌표에서 구도를 거꾸로 계산한다.
 *
 * 처음에는 box와 이미지 크기를 손으로 적었는데, 그러다 보니 기준 얼굴이
 * 얼굴 52%·머리 위 여백 24%짜리 사진이 됐다. 증명사진 검사가 "규격에 맞다"고
 * 하는 자리가 애초에 규격이 아니었던 것이다 — 검사가 그걸 잡아 줬다.
 *
 * 머리 꼭대기는 랜드마크에 없으므로 눈썹 위로 (눈썹~턱)의 0.4배를 잡는다.
 * 머리 높이의 대략 4할이 눈썹 위라는 흔한 어림이다.
 */
function place(f: Face, o: { faceRatio?: number; headroom?: number; centerX?: number } = {}): Face {
  const { faceRatio = 0.75, headroom = 0.1, centerX = 0.5 } = o;
  const brow = Math.min(...f.leftBrow.concat(f.rightBrow).map(p => p.y));
  const chin = f.jaw[8].y;
  const headTop = brow - (chin - brow) * 0.4;
  const headH = chin - headTop;
  const imageHeight = headH / faceRatio;
  const imageWidth = imageHeight * 0.75;
  const dy = headroom * imageHeight - headTop;
  const faceCx = (f.jaw[0].x + f.jaw[16].x) / 2;
  const dx = centerX * imageWidth - faceCx;
  const move = (p: { x: number; y: number }) => ({ x: p.x + dx, y: p.y + dy });
  return {
    jaw: f.jaw.map(move), mouth: f.mouth.map(move),
    leftEye: f.leftEye.map(move), rightEye: f.rightEye.map(move),
    nose: f.nose.map(move), leftBrow: f.leftBrow.map(move), rightBrow: f.rightBrow.map(move),
    box: { x: f.jaw[0].x + dx, y: headTop + dy, width: f.jaw[16].x - f.jaw[0].x, height: headH },
    imageWidth, imageHeight,
  };
}

test('기준 얼굴은 정면이다', () => {
  const p = headPose(baseFace());
  assert.ok(Math.abs(p.roll) < 1, `roll ${p.roll}`);
  assert.ok(Math.abs(p.yaw) < 0.2, `yaw ${p.yaw}`);
});

test('기울인 만큼 roll이 나온다', () => {
  // 부호가 뒤집히면 "오른쪽으로 기울었다"를 왼쪽이라고 말한다
  for (const deg of [-20, -8, 5, 12, 25]) {
    const got = headPose(rotate(baseFace(), deg)).roll;
    assert.ok(Math.abs(got - deg) < 1.5, `${deg}도로 돌렸는데 roll ${got.toFixed(1)}`);
  }
});

test('고개를 돌리면 yaw가 그 쪽으로 커진다', () => {
  const f = baseFace();
  const turned = { ...f, nose: f.nose.map(p => ({ ...p, x: p.x + 22 })) };
  assert.ok(headPose(turned).yaw > 0.5, '코가 오른쪽으로 밀렸는데 yaw가 안 는다');
  const other = { ...f, nose: f.nose.map(p => ({ ...p, x: p.x - 22 })) };
  assert.ok(headPose(other).yaw < -0.5, '왼쪽으로 밀렸는데 yaw가 음수가 아니다');
});

test('EAR은 감은 눈과 뜬 눈을 가른다', () => {
  const f = baseFace();
  const open = ear(f.leftEye);
  const shut = ear(f.leftEye.map((p, i) => (i === 1 || i === 2 || i === 4 || i === 5 ? { ...p, y: p.y * 0 + f.leftEye[0].y } : p)));
  assert.ok(open > 0.25, `뜬 눈 EAR ${open}`);
  assert.ok(shut < 0.05, `감은 눈 EAR ${shut}`);
  assert.ok(eyeOpenness(f).blinked === false);
});

test('한쪽만 감아도 눈 뜸 점수가 떨어진다', () => {
  const f = baseFace();
  const winking = { ...f, rightEye: f.rightEye.map(p => ({ ...p, y: f.rightEye[0].y })) };
  assert.ok(eyeOpenness(winking).blinked, '한쪽을 감았는데 blinked가 안 선다');
  assert.ok(eyeOpenness(winking).score < eyeOpenness(f).score);
  assert.ok(eyeOpenness(winking).evenness < 0.5, '좌우가 다른데 evenness가 높다');
});

test('입꼬리가 올라가면 웃음 점수가 오른다', () => {
  const f = baseFace();
  const smiling = { ...f, mouth: f.mouth.map((p, i) => (i === 0 || i === 6 ? { ...p, y: p.y - 22 } : p)) };
  assert.ok(smileCurve(smiling.mouth) > smileCurve(f.mouth) + 0.4, '입꼬리를 올렸는데 안 오른다');
  const frowning = { ...f, mouth: f.mouth.map((p, i) => (i === 0 || i === 6 ? { ...p, y: p.y + 12 } : p)) };
  assert.ok(smileCurve(frowning.mouth) < 0.05, '입꼬리를 내렸는데 점수가 남는다');
});

test('입만 웃으면 뒤센 지수가 낮다', () => {
  const f = baseFace();
  const corners = (g: Face) => ({ ...g, mouth: g.mouth.map((p, i) => (i === 0 || i === 6 ? { ...p, y: p.y - 22 } : p)) });
  const mouthOnly = corners(f);
  // 눈까지 웃으면 눈이 좁아진다
  const withEyes = corners({
    ...f,
    leftEye: f.leftEye.map(p => ({ ...p, y: (p.y + 210) / 2 })),
    rightEye: f.rightEye.map(p => ({ ...p, y: (p.y + 210) / 2 })),
  });
  assert.ok(realSmile(withEyes).score > realSmile(mouthOnly).score + 0.1,
    '눈이 함께 웃는데 뒤센 지수가 안 오른다');
  assert.ok(realSmile(mouthOnly).eyes < realSmile(withEyes).eyes);
});

test('무표정에서는 눈이 좁아도 눈웃음으로 안 친다', () => {
  // 눈이 작은 사람이 무표정으로 찍으면 "눈으로 웃었다"가 되면 안 된다
  const f = baseFace();
  const narrow = {
    ...f,
    leftEye: f.leftEye.map(p => ({ ...p, y: (p.y + 210) / 2 })),
    rightEye: f.rightEye.map(p => ({ ...p, y: (p.y + 210) / 2 })),
  };
  assert.ok(realSmile(narrow).eyes < 0.15, `무표정인데 눈웃음 ${realSmile(narrow).eyes}`);
});

test('증명사진 규격은 맞을 때 높고 어긋나면 그 항목이 떨어진다', () => {
  const ok = place(baseFace());          // 얼굴 75%·여백 10%·가운데 = 규격대로
  const good = idPhoto(ok);
  assert.ok(good.score > 0.85, `규격대로인데 점수 ${good.score.toFixed(2)}`);
  assert.equal(new Set(good.checks.map(c => c.key)).size, good.checks.length, '항목 이름이 겹친다');

  // 어긋난 곳을 하나씩 만들어, 그 항목이 가장 낮게 나오는지 본다
  const worstOf = (g: Face) => idPhoto(g).worst;
  assert.equal(worstOf(place(rotate(baseFace(), 25))), 'level', '기울인 사진');
  assert.equal(worstOf(place(baseFace(), { centerX: 0.15 })), 'centered', '한쪽으로 치우친 사진');
  assert.equal(worstOf(place(baseFace(), { faceRatio: 0.3 })), 'faceSize', '멀리서 찍은 사진');

  const shut = place({ ...baseFace(), rightEye: baseFace().rightEye.map(p => ({ ...p, y: baseFace().rightEye[0].y })) });
  assert.equal(worstOf(shut), 'eyesOpen', '눈을 감은 사진');
  assert.ok(idPhoto(shut).score < good.score);
});

test('머리 위 여백이 너무 많거나 없으면 구도 점수가 떨어진다', () => {
  const ok = framing(place(baseFace(), { headroom: 0.12 })).score;
  assert.ok(ok > 0.9, `알맞은 여백인데 ${ok.toFixed(2)}`);
  assert.ok(framing(place(baseFace(), { headroom: 0 })).score < ok, '머리가 붙었는데 점수가 안 떨어진다');
  assert.ok(framing(place(baseFace(), { headroom: 0.4 })).score < ok, '여백이 과한데 점수가 안 떨어진다');
});

test('삼분할선과 정중앙은 둘 다 만점으로 친다', () => {
  const f = baseFace();
  const at = (cx: number) => framing(place(f, { centerX: cx })).thirds;
  for (const line of [1 / 3, 0.5, 2 / 3]) assert.ok(at(line) > 0.95, `${line}에서 ${at(line)}`);
  assert.ok(at(0.08) < 0.3, '구석인데 만점이다');
});

test('얼굴이 클수록 가까이서 찍은 것으로 나온다', () => {
  const f = baseFace();
  const near = shootDistance(f).cm;
  const far = shootDistance({ ...f, imageWidth: 1600 }).cm;
  assert.ok(far > near * 3, `가까움 ${near.toFixed(0)}cm · 멂 ${far.toFixed(0)}cm`);
  assert.ok(shootDistance(f).distortion > shootDistance({ ...f, imageWidth: 1600 }).distortion);
});

test('거리 어림이 식과 맞는다', () => {
  /*
   * 되짚어 본다 — 화면 가로가 담는 폭이 머리너비의 (1/fill)배이고,
   * 거리는 그 폭을 2·tan(화각/2)로 나눈 값이다. 상수를 잘못 넣으면 어긋난다.
   */
  const f = baseFace();
  const { cm, fill } = shootDistance(f, 70);
  const want = (HEAD_WIDTH_MM / fill) / (2 * Math.tan((70 * Math.PI) / 360)) / 10;
  assert.ok(Math.abs(cm - want) < 0.01, `${cm} vs ${want}`);
});

test('거리 어림이 바깥 기준과 맞는다', () => {
  /*
   * 위 검사는 같은 상수로 되짚으므로 HEAD_WIDTH_MM을 바꿔도 안 걸린다 —
   * 자기 자신으로 검증하는 셈이다. 그래서 바깥 기준을 하나 건다.
   *
   *  · 성인 머리 너비의 대표값은 145mm 안팎이다(인체 계측 자료의 평균대).
   *  · 팔을 뻗어 찍는 셀카는 40~50cm쯤이고, 그때 얼굴은 가로의 4분의 1을
   *    차지한다. 상수나 식이 어긋나면 이 숫자가 엉뚱해진다.
   */
  assert.ok(HEAD_WIDTH_MM >= 130 && HEAD_WIDTH_MM <= 160, `머리 너비 ${HEAD_WIDTH_MM}mm는 사람 머리가 아니다`);

  const f = baseFace();
  const w = f.jaw[16].x - f.jaw[0].x;
  const selfie = shootDistance({ ...f, imageWidth: w * 4 }, 70);   // 얼굴이 가로의 1/4
  assert.ok(selfie.cm > 35 && selfie.cm < 55, `팔 뻗은 셀카가 ${selfie.cm.toFixed(0)}cm로 나온다`);

  /*
   * 얼굴이 가로의 1/10이면 화면이 담는 폭은 1.45m다. 70도에서 폭 1.4m는
   * 대략 1m 거리다(2·1000·tan35 = 1400mm). 반신 인물 사진의 거리다.
   */
  const portrait = shootDistance({ ...f, imageWidth: w * 10 }, 70);
  assert.ok(portrait.cm > 85 && portrait.cm < 125, `반신 인물이 ${portrait.cm.toFixed(0)}cm로 나온다`);
  assert.ok(selfie.distortion > portrait.distortion, '가까이서 찍었는데 왜곡이 덜하다');
});

const flatPixels = (): PixelStats => ({
  faceLuma: 145, backLuma: 150, leftLuma: 145, rightLuma: 145,
  topLuma: 145, bottomLuma: 145, laplacianVar: 900, r: 128, g: 128, b: 128, backStd: 10,
});

test('한쪽만 밝으면 빛의 방향을 그쪽으로 짚는다', () => {
  const p = flatPixels();
  assert.equal(lighting(p).from, 'even');
  assert.equal(lighting({ ...p, leftLuma: 200, rightLuma: 110 }).from, 'left');
  assert.equal(lighting({ ...p, leftLuma: 110, rightLuma: 200 }).from, 'right');
  assert.equal(lighting({ ...p, topLuma: 205, bottomLuma: 110 }).from, 'above');
  assert.equal(lighting({ ...p, topLuma: 110, bottomLuma: 205 }).from, 'below');
});

test('배경이 얼굴보다 밝으면 역광으로 잡힌다', () => {
  const p = flatPixels();
  assert.ok(lighting(p).backlit < 0.2);
  assert.ok(lighting({ ...p, faceLuma: 70, backLuma: 230 }).backlit > 0.9, '역광인데 안 잡힌다');
  assert.ok(lighting({ ...p, faceLuma: 70, backLuma: 230 }).score < lighting(p).score);
});

test('어둡거나 날아간 얼굴은 노출 점수가 떨어진다', () => {
  const p = flatPixels();
  assert.ok(lighting(p).exposure > 0.9);
  assert.ok(lighting({ ...p, faceLuma: 40 }).exposure < 0.3, '너무 어두운데 통과한다');
  assert.ok(lighting({ ...p, faceLuma: 250 }).exposure < 0.3, '날아갔는데 통과한다');
});

test('라플라시안 분산이 낮으면 흔들린 사진이다', () => {
  const p = flatPixels();
  assert.ok(!sharpness(p).blurry);
  assert.ok(sharpness({ ...p, laplacianVar: 20 }).blurry, '흐린데 안 잡힌다');
  assert.ok(sharpness({ ...p, laplacianVar: 5000 }).score > sharpness(p).score);
});

test('색이 치우치면 그 방향을 짚는다', () => {
  const p = flatPixels();
  assert.equal(whiteBalance(p).cast, 'neutral');
  assert.equal(whiteBalance({ ...p, r: 180, b: 90 }).cast, 'warm');
  assert.equal(whiteBalance({ ...p, r: 90, b: 180 }).cast, 'cool');
  assert.equal(whiteBalance({ ...p, g: 175 }).cast, 'green');
  assert.equal(whiteBalance({ ...p, r: 165, b: 165, g: 95 }).cast, 'magenta');
  assert.ok(whiteBalance(p).score > whiteBalance({ ...p, r: 180, b: 90 }).score);
});

test('배경이 어수선하면 점수가 떨어진다', () => {
  const p = flatPixels();
  assert.ok(backdrop({ ...p, backStd: 5, backLuma: 220 }).score > backdrop({ ...p, backStd: 55, backLuma: 220 }).score);
  assert.ok(backdrop({ ...p, backStd: 5, backLuma: 220 }).evenness > 0.9);
});

test('합성 축은 콧대에 서고 좌우 폭을 가른다', () => {
  const f = baseFace();
  const m = mirrorFace(f);
  assert.ok(Math.abs(m.axis - 200) < 1, `축이 ${m.axis}`);
  assert.ok(m.balance > 0.95, `정면인데 balance ${m.balance}`);
  // 턱을 한쪽으로 늘리면 폭이 갈린다
  const skewed = { ...f, jaw: f.jaw.map((p, i) => (i === 0 ? { ...p, x: p.x - 60 } : p)) };
  assert.ok(mirrorFace(skewed).leftWidth > mirrorFace(skewed).rightWidth);
  assert.ok(mirrorFace(skewed).balance < 0.8);
});

/* ── 결과 조립 ─────────────────────────────────────────────────── */

import { analyzeSnap, NEEDS_PIXELS } from '../lib/snap/analyze.ts';
import { NEW_SNAP_SLUGS, TOOL_TEXT } from '../lib/snap/tool-text.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { VOCAB } from '../lib/snap/copy.ts';

/** 열 언어 열쇠 — 스냅은 경로형(pt-br·zh-hans)을 쓴다 */
const SNAP_LANGS = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const;

const PIXELS = {
  faceLuma: 145, backLuma: 150, leftLuma: 145, rightLuma: 145,
  topLuma: 145, bottomLuma: 145, laplacianVar: 900, r: 128, g: 128, b: 128, backStd: 10,
};

test('열 도구가 모두 결과를 낸다', () => {
  const f = baseFace();
  for (const slug of NEW_SNAP_SLUGS) {
    const r = analyzeSnap('ko', slug, f, NEEDS_PIXELS.has(slug) ? PIXELS : undefined);
    assert.ok(r.metrics.length > 0, `${slug}: 항목이 없다`);
    assert.ok(r.percent >= 0 && r.percent <= 100, `${slug}: 점수가 ${r.percent}`);
    assert.ok(r.headline.length > 0, `${slug}: 요약이 비었다`);
    assert.ok(r.band.length > 0, `${slug}: 단계 낱말이 비었다`);
    for (const m of r.metrics) {
      assert.ok(m.label.length > 0, `${slug}/${m.key}: 이름이 비었다`);
      assert.ok(m.percent >= 0 && m.percent <= 100, `${slug}/${m.key}: ${m.percent}`);
    }
  }
});

test('좌우 합성만 그림 정보를 함께 낸다', () => {
  /*
   * mirror는 점수가 아니라 그림이 결과다. 축을 안 넘기면 화면이 캔버스를
   * 못 그리고, 안내문("이미지를 뒤집어 붙인다")과 화면이 어긋난다.
   */
  const f = baseFace();
  const withMirror = NEW_SNAP_SLUGS.filter(
    s => analyzeSnap('ko', s, f, NEEDS_PIXELS.has(s) ? PIXELS : undefined).mirror,
  );
  assert.deepStrictEqual(withMirror, ['mirror']);
  const r = analyzeSnap('ko', 'mirror', f);
  assert.ok(r.mirror && Math.abs(r.mirror.axis - 200) < 1, `축이 ${r.mirror?.axis}`);
});

test('열 언어에 열 도구 문구가 모두 있다', () => {
  /*
   * 한 언어에 한 도구를 빠뜨리면 그 페이지 제목이 undefined가 되는데, 빌드는
   * 통과하고 그 언어를 읽는 사람만 본다. 타입이 Record라 빠지면 tsc가 잡지만,
   * 빈 문자열이나 다른 언어 문구를 그대로 복사해 둔 것은 못 잡는다.
   */
  const bad: string[] = [];
  for (const lang of SNAP_LANGS) {
    const pack = TOOL_TEXT[lang];
    for (const slug of NEW_SNAP_SLUGS) {
      const t = pack.tools[slug];
      for (const [k, v] of Object.entries(t)) {
        if (!v || v.trim().length < 4) bad.push(`${lang}/${slug}.${k}: 너무 짧다`);
      }
      // 한국어 문구가 다른 언어에 그대로 남아 있으면 번역을 안 한 것이다
      if (lang !== 'ko' && t.title === TOOL_TEXT.ko.tools[slug].title) bad.push(`${lang}/${slug}: 한국어 제목 그대로`);
    }
    for (const [k, v] of Object.entries(pack.metric)) {
      if (!v || !v.trim()) bad.push(`${lang}.metric.${k}: 비었다`);
    }
    assert.equal(VOCAB[lang].bands.length, 5, `${lang}: 단계가 다섯이 아니다`);
  }
  assert.deepStrictEqual(bad.slice(0, 10), []);
});

test('한 언어 안에서 도구 제목이 겹치지 않는다', () => {
  // 겹치면 페이지 두 장이 같은 제목으로 색인된다
  const bad: string[] = [];
  for (const lang of SNAP_LANGS) {
    const titles = NEW_SNAP_SLUGS.map(s => TOOL_TEXT[lang].tools[s].title);
    if (new Set(titles).size !== titles.length) bad.push(`${lang}: ${titles.join(' / ')}`);
  }
  assert.deepStrictEqual(bad, []);
  assert.equal(LANG_CODES.length, SNAP_LANGS.length, '언어 수가 어긋난다');
});

/* ══════════════════════════════════════════════════════════════════
 * 새 측정 여섯 — 삼등분·눈 간격·얼굴형·눈썹·입술·대비
 *
 * 이쪽은 "미의 기준"이 아니라 **널리 쓰이는 어림**을 잰다. 그래서 검사도
 * "이 값이 아름다운가"가 아니라 **"얼굴을 그렇게 바꾸면 값이 그쪽으로
 * 움직이는가"**로 짠다 — 눈을 벌리면 간격 비율이 올라가는가, 턱을 넓히면
 * 각진형으로 가는가. 부호가 뒤집혀도 화면에는 그럴듯한 숫자가 나온다.
 * ══════════════════════════════════════════════════════════════════ */

/** face-api의 스무 점짜리 입 — 바깥 열둘 + 안쪽 여덟 */
function mouth20(cy: number, upperThick: number, lowerThick: number) {
  const outer = [
    { x: 160, y: cy }, { x: 175, y: cy - 12 }, { x: 190, y: cy - 15 },
    { x: 200, y: cy - 15 }, { x: 210, y: cy - 15 }, { x: 225, y: cy - 12 },
    { x: 240, y: cy }, { x: 225, y: cy + 12 }, { x: 210, y: cy + 15 },
    { x: 200, y: cy + 15 }, { x: 190, y: cy + 15 }, { x: 175, y: cy + 12 },
  ];
  // 안쪽 여덟: [왼, 위×3, 오른, 아래×3] — 14가 위중앙, 18이 아래중앙이다
  const inner = [
    { x: 168, y: cy }, { x: 185, y: cy - 15 + upperThick },
    { x: 200, y: cy - 15 + upperThick }, { x: 215, y: cy - 15 + upperThick },
    { x: 232, y: cy }, { x: 215, y: cy + 15 - lowerThick },
    { x: 200, y: cy + 15 - lowerThick }, { x: 185, y: cy + 15 - lowerThick },
  ];
  return [...outer, ...inner];
}

test('삼등분 비율의 합이 1이다', async () => {
  const { faceThirds } = await import('../lib/snap/measures.ts');
  const t = faceThirds(baseFace());
  assert.ok(Math.abs(t.upper + t.middle + t.lower - 1) < 1e-9, `${t.upper}+${t.middle}+${t.lower}`);
});

test('세 칸이 고르면 점수가 높고 한 칸이 길면 낮아진다', async () => {
  const { faceThirds } = await import('../lib/snap/measures.ts');
  const even = faceThirds(baseFace());
  // 턱을 아래로 늘려 아래 칸만 길게 만든다
  const f = baseFace();
  f.jaw = f.jaw.map((p, i) => (i === 8 ? { ...p, y: p.y + 140 } : p));
  const uneven = faceThirds(f);
  assert.ok(uneven.lower > even.lower, `아래 칸 ${even.lower} → ${uneven.lower}`);
  assert.ok(uneven.score < even.score, `점수 ${even.score} → ${uneven.score}`);
});

test('눈을 벌리면 간격 비율이 올라간다', async () => {
  const { eyeSpacing } = await import('../lib/snap/measures.ts');
  const near = eyeSpacing(baseFace());
  const f = baseFace();
  f.leftEye = f.leftEye.map(p => ({ ...p, x: p.x - 20 }));
  f.rightEye = f.rightEye.map(p => ({ ...p, x: p.x + 20 }));
  const far = eyeSpacing(f);
  assert.ok(far.ratio > near.ratio, `${near.ratio.toFixed(2)} → ${far.ratio.toFixed(2)}`);
});

test('눈 간격 비율이 사진 크기에 안 흔들린다', async () => {
  /*
   * 눈 너비로 나누는 까닭이 이것이다. 나누지 않으면 같은 얼굴을 두 배로
   * 크게 찍었을 때 비율도 두 배가 되어, 가까이서 찍은 사진만 "눈이 멀다"고
   * 나온다. 크기를 바꿔도 값이 같아야 한다.
   */
  const { eyeSpacing } = await import('../lib/snap/measures.ts');
  const small = baseFace();
  const big: Face = JSON.parse(JSON.stringify(small));
  for (const key of ['jaw', 'mouth', 'leftEye', 'rightEye', 'nose', 'leftBrow', 'rightBrow'] as const) {
    big[key] = big[key].map(p => ({ x: 200 + (p.x - 200) * 2, y: 260 + (p.y - 260) * 2 }));
  }
  assert.ok(Math.abs(eyeSpacing(small).ratio - eyeSpacing(big).ratio) < 1e-6,
    `작은 ${eyeSpacing(small).ratio.toFixed(3)} vs 큰 ${eyeSpacing(big).ratio.toFixed(3)}`);
});

test('한쪽 눈만 크면 고름이 떨어진다', async () => {
  const { eyeSpacing } = await import('../lib/snap/measures.ts');
  const f = baseFace();
  f.leftEye = f.leftEye.map(p => ({ ...p, x: (p.x - 165) * 1.6 + 165 }));
  const s = eyeSpacing(f);
  assert.ok(s.evenness < 0.7, `고름 ${s.evenness.toFixed(2)}`);
  assert.ok(eyeSpacing(baseFace()).evenness > 0.98, '기준 얼굴은 좌우가 같아야 한다');
});

test('턱을 넓히면 각진형이 된다', async () => {
  const { faceShape } = await import('../lib/snap/measures.ts');
  const f = baseFace();
  // 턱선 양쪽(4·12)을 바깥으로 밀어 턱을 넓힌다
  f.jaw = f.jaw.map((p, i) => (i >= 4 && i <= 12 ? { ...p, x: 200 + (p.x - 200) * 1.8 } : p));
  assert.equal(faceShape(f).kind, 'square', `턱비 ${faceShape(f).jawRatio.toFixed(2)}`);
});

test('세로로 늘이면 긴 얼굴이 된다', async () => {
  const { faceShape } = await import('../lib/snap/measures.ts');
  const f = baseFace();
  f.jaw = f.jaw.map((p, i) => (i === 8 ? { ...p, y: p.y + 120 } : p));
  const s = faceShape(f);
  assert.equal(s.kind, 'long', `세로가로비 ${s.ratio.toFixed(2)}`);
});

test('얼굴형은 언제나 다섯 중 하나다', async () => {
  const { faceShape } = await import('../lib/snap/measures.ts');
  const kinds = new Set(['oval', 'round', 'square', 'long', 'heart']);
  for (const scale of [0.6, 0.8, 1, 1.3, 1.8]) {
    const f = baseFace();
    f.jaw = f.jaw.map(p => ({ ...p, y: 260 + (p.y - 260) * scale }));
    assert.ok(kinds.has(faceShape(f).kind), `${scale}배에서 ${faceShape(f).kind}`);
  }
});

test('눈썹 한쪽을 올리면 고름이 떨어진다', async () => {
  const { brows } = await import('../lib/snap/measures.ts');
  assert.ok(brows(baseFace()).levelness > 0.99, '기준 얼굴은 좌우가 같아야 한다');
  const f = baseFace();
  f.leftBrow = f.leftBrow.map(p => ({ ...p, y: p.y - 14 }));
  assert.ok(brows(f).levelness < 0.5, `한쪽을 올렸는데 ${brows(f).levelness.toFixed(2)}`);
});

test('눈썹 높이 차이를 얼굴 크기로 나눈다', async () => {
  /*
   * 픽셀 그대로 재면 가까이서 찍은 사진일수록 나쁘게 나온다. 얼굴을 통째로
   * 두 배로 키우면 픽셀 차이도 두 배가 되지만 점수는 같아야 한다.
   */
  const { brows } = await import('../lib/snap/measures.ts');
  const small = baseFace();
  small.leftBrow = small.leftBrow.map(p => ({ ...p, y: p.y - 8 }));
  const big: Face = JSON.parse(JSON.stringify(small));
  for (const key of ['jaw', 'mouth', 'leftEye', 'rightEye', 'nose', 'leftBrow', 'rightBrow'] as const) {
    big[key] = big[key].map(p => ({ x: 200 + (p.x - 200) * 2, y: 260 + (p.y - 260) * 2 }));
  }
  assert.ok(Math.abs(brows(small).levelness - brows(big).levelness) < 0.02,
    `작은 ${brows(small).levelness.toFixed(3)} vs 큰 ${brows(big).levelness.toFixed(3)}`);
});

test('안쪽 점이 없으면 입술 두께를 잴 수 없다고 말한다', async () => {
  /*
   * 없는 점을 바깥 점으로 대신하면 두께가 늘 0이 되고, 화면에는 "윗입술이
   * 없다"는 뜻의 숫자가 그럴듯하게 나온다. 모른다고 말하는 편이 낫다.
   */
  const { lips } = await import('../lib/snap/measures.ts');
  const r = lips(baseFace()); // 기준 얼굴의 입은 열두 점뿐이다
  assert.equal(r.thicknessKnown, false);
  assert.ok(r.width > 0, '너비는 잴 수 있어야 한다');
});

test('아랫입술을 두껍게 하면 비율이 내려간다', async () => {
  const { lips } = await import('../lib/snap/measures.ts');
  const f = baseFace();
  f.mouth = mouth20(300, 6, 6);
  const even = lips(f);
  assert.equal(even.thicknessKnown, true);

  const g = baseFace();
  g.mouth = mouth20(300, 6, 14);
  const thickLower = lips(g);
  assert.ok(thickLower.ratio < even.ratio, `${even.ratio.toFixed(2)} → ${thickLower.ratio.toFixed(2)}`);
});

test('입꼬리 높이가 다르면 고름이 떨어진다', async () => {
  const { lips } = await import('../lib/snap/measures.ts');
  const f = baseFace();
  f.mouth = mouth20(300, 6, 8);
  assert.ok(lips(f).evenness > 0.95, '기준은 좌우가 같아야 한다');
  const g = baseFace();
  g.mouth = mouth20(300, 6, 8).map((p, i) => (i === 0 ? { ...p, y: p.y - 18 } : p));
  assert.ok(lips(g).evenness < 0.6, `한쪽을 올렸는데 ${lips(g).evenness.toFixed(2)}`);
});

test('대비는 너무 낮아도 너무 높아도 점수가 낮다', async () => {
  /*
   * 폭이 작으면 밋밋하고 크면 한쪽이 날아간 것이라 **가운데가 가장 좋다.**
   * "클수록 좋다"로 짜면 탄 사진이 만점을 받는다.
   */
  const { faceContrast } = await import('../lib/snap/measures.ts');
  const px = (l: number, r: number): PixelStats => ({
    faceLuma: 130, backLuma: 90, leftLuma: l, rightLuma: r, topLuma: (l + r) / 2,
    bottomLuma: (l + r) / 2, laplacianVar: 200, r: 128, g: 128, b: 128, backStd: 20,
  });
  const flat = faceContrast(px(128, 128));       // 폭 0
  const good = faceContrast(px(115, 140));       // 폭 25
  const blown = faceContrast(px(40, 230));       // 폭 190
  assert.ok(good.range > flat.range, `밋밋 ${flat.range.toFixed(2)} vs 알맞음 ${good.range.toFixed(2)}`);
  assert.ok(good.range > blown.range, `탄 것 ${blown.range.toFixed(2)} vs 알맞음 ${good.range.toFixed(2)}`);
});

test('얼굴과 배경 밝기가 같으면 인물이 안 떨어져 보인다', async () => {
  const { faceContrast } = await import('../lib/snap/measures.ts');
  const px = (face: number, back: number): PixelStats => ({
    faceLuma: face, backLuma: back, leftLuma: 115, rightLuma: 140, topLuma: 128,
    bottomLuma: 128, laplacianVar: 200, r: 128, g: 128, b: 128, backStd: 20,
  });
  assert.ok(faceContrast(px(130, 128)).pop < 0.2, '같은 밝기인데 떨어져 보인다고 한다');
  assert.ok(faceContrast(px(150, 90)).pop > 0.8, '차이가 큰데 안 떨어져 보인다고 한다');
});
