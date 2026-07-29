/* ────────────────────────────────────────────────
   스냅테스트 영어·중국어 문구.

   측정 자체(랜드마크 계산)는 언어와 무관하므로 한국어 lib의 순수 함수를 그대로
   쓰고, 결과 문장 풀만 언어별로 갈아 끼운다. 같은 사진이면 세 언어가 같은
   퍼센트를 낸다.

   무표정 사진이 나와도 부정적으로 읽히지 않게 모든 구간을 긍정적으로 서술하는
   한국어 쪽 원칙을 en/zh에도 그대로 지켰다.
──────────────────────────────────────────────── */
export type SnapIntlLang = 'en' | 'zh';

/* ── 미소 지수 ── */
export const SMILE_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'A calm, unforced expression. The corners of the mouth sit close to level, which reads as composed and quietly stylish. Near-neutral faces often photograph as the most modern and self-possessed — good for a profile or a concept shot.',
    'Relaxed and easy, with the tension let out of the mouth. Nothing is being performed here, and that plainness usually comes across as honest and comfortable to be around.',
    'A quiet expression with a hint of ease in it. The corners lift very slightly, making a smile that never tips into too much — the kind of face that stays pleasant on a long look.',
    'A soft smile spreading gently. The corners curve up just enough to read as warm without being intense, which tends to lower other people’s guard naturally.',
    'A clear, natural smile. The corners lift in a way that looks genuinely felt rather than held for the camera — widely considered the most likeable expression in a photo.',
    'A happy smile with real warmth in it. The corners lift generously and the whole face follows, the sort of expression that makes the viewer smile back.',
    'A bright, open smile. The corners pull up decisively and the positive energy carries past the frame. Smiling photos like this measurably lift first impressions.',
    'A big, confident smile. The corners lift wide and the expression reads as energetic and self-assured — the kind that draws the eye in a group photo.',
    'A wide, warm smile that has spread across the whole face. There is something contagious about it: it is hard to look at this photo without smiling.',
    'The brightest, fullest smile of the range. The corners are at their highest and the entire expression is given over to it — a single photo like this lifts the mood of a whole album.',
  ],
  zh: [
    '一张沉静克制的表情。嘴角接近水平，透着收敛情绪的高冷氛围。接近无表情的脸反而显得都市感、有质感，很适合用作头像或概念照。',
    '轻松自然、卸下力气的表情。嘴角只是稍稍放松，露出不加修饰的清爽魅力。没有硬挤出笑容的这种表情，往往反而给人真诚而舒服的印象。',
    '带着几分从容的平静表情。嘴角微微上扬，形成不过分的笑意，是那种看久了也不会觉得累的脸。',
    '笑意轻轻漾开的舒服表情。嘴角柔和上扬，温柔又不张扬，自然而然让人放下戒备。',
    '自然笑容清晰可见的表情。嘴角舒服地上扬，不刻意、像是真的高兴，被认为是照片里最讨喜的表情之一。',
    '满是好心情的笑容。嘴角舒展上扬，那份温和的能量会让看的人也跟着笑起来，显得明亮而好接近。',
    '灿烂开朗的笑容。嘴角确实往上提，积极的能量透出画面。这样的笑脸照片能明显提升第一印象。',
    '爽朗有魅力的笑容。嘴角大幅上扬，显得自信而有活力，在合照里也很吸引视线。',
    '笑得开怀又可爱的表情。嘴角舒展，笑意铺满整张脸，有种会传染的感染力，看着就想跟着笑。',
    '最灿烂、最舒展的满开笑容。嘴角上扬到最高，整张脸都是笑意，光靠一张照片就能把气氛点亮。',
  ],
};

export const SMILE_TIP_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Smile with the eyes first — it produces a far more natural expression than the mouth alone.',
    'Breathe out briefly just before the shutter; the tension leaves your face and it comes out easier.',
    'Practise the smile that feels most natural to you once in a mirror beforehand.',
    'Rather than lifting only the corners, think about lifting the whole cheek — it reads as more genuine.',
    'Look away from the lens and then back just as the photo is taken; the expression stays looser.',
    'Shoot a burst and pick the natural moment rather than trying to hold one pose.',
    'Have someone you are comfortable with talk to you while shooting — the smile relaxes noticeably.',
    'Parting the lips slightly gives a more open, brighter impression.',
    'A neutral expression has its own appeal, so there is no need to force the face into anything.',
    'Think of something you like as the photo is taken — the expression loosens on its own.',
  ],
  zh: [
    '先用眼睛笑，会比只动嘴自然得多。',
    '按快门前短短呼一口气，脸上的力气会卸掉，出来更放松。',
    '事先对着镜子练一次你觉得最自然的笑容。',
    '与其只提嘴角，不如想着把整个脸颊往上提，会更自然。',
    '别一直盯着镜头，先看向别处再回来，那一瞬的表情更松弛。',
    '用连拍多拍几张，再从中挑最自然的一刻。',
    '让熟悉的人一边聊天一边拍，笑容会放松很多。',
    '嘴唇稍微张开一点笑，会显得更开朗明亮。',
    '无表情的照片也有它的氛围感，不必在表情上太用力。',
    '拍照时想一件你喜欢的事，表情会自己松下来。',
  ],
};

export const SMILE_LABELS: Record<SnapIntlLang, { curve: string; openness: string; balance: string }> = {
  en: { curve: 'Corner lift', openness: 'Mouth opening', balance: 'Left–right balance' },
  zh: { curve: '嘴角上扬', openness: '嘴部张开', balance: '左右平衡' },
};

export const SMILE_COMMENTS: Record<SnapIntlLang, {
  curve: (p: number) => string;
  openness: (p: number) => string;
  balance: (p: number) => string;
}> = {
  en: {
    curve: p => p >= 75 ? 'corners lifted generously' : p >= 55 ? 'corners lifted slightly' : p >= 40 ? 'close to level' : 'a calm, closed mouth',
    openness: p => p >= 65 ? 'a wide, open smile' : p >= 35 ? 'naturally parted' : 'a quiet closed-mouth smile',
    balance: p => p >= 80 ? 'well balanced' : p >= 60 ? 'broadly even' : 'one side lifts a little more — a distinctive smile',
  },
  zh: {
    curve: p => p >= 75 ? '嘴角舒展上扬' : p >= 55 ? '嘴角略微上扬' : p >= 40 ? '接近水平' : '沉静的闭唇线条',
    openness: p => p >= 65 ? '开怀张开的笑' : p >= 35 ? '自然微启' : '闭唇的浅笑',
    balance: p => p >= 80 ? '左右很均衡' : p >= 60 ? '大致均衡' : '一侧略高，是有个性的笑容',
  },
};

/* ── 얼굴 대칭 ──
   완벽한 좌우 대칭인 얼굴은 거의 없고 자연스러운 비대칭이 오히려 개성이 된다는
   한국어 쪽 서술 방침을 그대로 지킨다. 낮은 점수도 부정적으로 읽히면 안 된다. */
export const SYMMETRY_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'A face with a distinct, natural asymmetry. Perfectly matched halves tend to read as artificial; differences like these add movement and depth to an expression. Plenty of actors and models count asymmetry among their strongest features.',
    'A gentle asymmetry that reads as character. Your face shifts slightly between smiling and neutral, so different photos bring out different sides — the range of impressions you can give is wide.',
    'Slight left–right difference that actually adds life. There is research suggesting fine asymmetry makes a person look more natural and approachable than perfect symmetry does. You tend to photograph well from either side.',
    'Balanced overall, with natural individuality alongside it. The two sides are close without being identical, which keeps the expression soft rather than rigid — a comfortable balance in photographs.',
    'A generally well-balanced impression. Stable left to right, so the face holds up from most angles and photographs consistently. It reads as composed and trustworthy.',
    'Good balance giving a settled impression. Particularly comfortable and neat in front-on photos, with the features sitting evenly across the midline.',
    'Quite well matched left to right. Photos come out consistently whichever side they are taken from, whether a selfie or someone else’s shot — that consistency is what people mean by photographing well.',
    'Well-matched symmetry giving a tidy impression. The even balance reads as dependable and neat, and it is a particular strength in front-facing photos like ID or profile shots.',
    'Notably strong symmetry. The features sit almost evenly on both sides, which is why photos of this kind tend to come out especially stable and composed.',
    'Unusually strong symmetry. The balance holds from any angle — the kind of face people describe as photogenic, and one that sits comfortably with almost any hairstyle or framing.',
  ],
  zh: [
    '一张自然不对称很鲜明的脸。左右完全一样反而容易显得刻意，这种自然的左右差异会给表情增加灵动与立体感。演员、模特里以不对称为魅力点的也不少。',
    '淡淡的不对称成了个性的脸。笑起来和无表情时的感觉略有不同，所以每张照片都能拍出不同的味道，能表现的印象范围比较宽。',
    '一点点左右差异反而带来生气。也有研究认为，细微的不对称比完美对称更让人显得自然亲切。从哪一侧拍都各有各的好看。',
    '在适度的均衡里保留着自然个性。左右差别不大又不是完全一致，所以表情不僵硬，显得柔和，是照片里让人放松的那种平衡。',
    '整体上均衡得很稳妥。左右平衡稳定，从各种角度拍都不会有太大出入，读起来是让人有信任感的整齐脸型。',
    '均衡感好、给人安定印象的脸。正面照尤其显得舒服端正，五官在中线两侧分布均匀，透着沉稳。',
    '左右相当对称的脸。不管从哪一侧拍，印象都不会差太多，自拍还是别人拍结果都稳定 —— 这就是所谓上镜的底子。',
    '对称度好、显得干净利落的脸。左右均匀，给人可靠端正的感觉，在证件照、头像这类强调正面的照片里特别有优势。',
    '对称度相当高的脸。左右五官像镜像一样分布均匀，所以照片格外稳定协调，透着一种标准的和谐。',
    '对称度非常高、相当少见的脸。无论从哪个角度拍都保持均衡，是典型的上镜类型，换发型或换角度也都稳稳撑得住。',
  ],
};

export const SYMMETRY_REGION_LABELS: Record<SnapIntlLang, Record<string, string>> = {
  en: { eye: 'Eye level', brow: 'Eyebrows', mouth: 'Mouth corners', jaw: 'Jawline' },
  zh: { eye: '眼睛高度', brow: '眉毛', mouth: '嘴角', jaw: '下颌线' },
};

export const SYMMETRY_REGION_COMMENT: Record<SnapIntlLang, { min: number; text: string }[]> = {
  en: [
    { min: 85, text: 'almost perfectly even' },
    { min: 70, text: 'well matched' },
    { min: 55, text: 'reasonably even' },
    { min: 40, text: 'slightly uneven' },
    { min: 0, text: 'distinctively uneven' },
  ],
  zh: [
    { min: 85, text: '几乎完全对称' },
    { min: 70, text: '相当均衡' },
    { min: 55, text: '大致均衡' },
    { min: 40, text: '略有不对称' },
    { min: 0, text: '有个性的不对称' },
  ],
};

export const SYMMETRY_TIP_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'A slight three-quarter angle often looks more natural than dead-on.',
    'Light from one side alone exaggerates asymmetry — try front-on lighting.',
    'A small smile makes the impression much warmer regardless of the balance.',
    'If one side usually photographs better for you, it is worth remembering that angle.',
    'Holding the camera slightly above eye level keeps the proportions more stable.',
    'A photo taken directly with the camera is closer to how you actually look than a mirror selfie.',
    'Shooting near a window in daylight brings the features out much more clearly.',
    'Take a burst and pick the frame where the expression is most relaxed.',
    'Tilting the head just a little can soften the whole impression.',
    'Laugh once and then let the tension go right before the shutter — the expression comes out natural.',
  ],
  zh: [
    '比起完全正面，稍微 3/4 的角度往往更自然。',
    '光只从一侧打过来会放大不对称，试试正面光。',
    '不管左右是否均衡，稍微笑一下都会让印象柔和很多。',
    '如果平时觉得某一侧更好看，把那个角度记下来是个好办法。',
    '相机放得比视线略高一点，整体比例会更稳。',
    '直接用相机拍的照片，比镜子自拍更接近你实际的样子。',
    '在有自然光的窗边拍，五官会清晰很多。',
    '用连拍多拍几张，挑表情最放松的那一张。',
    '头稍微歪一点点，整体印象就会柔和不少。',
    '按快门前先大笑一下再把力气卸掉，表情容易出来得自然。',
  ],
};

/* ── 황금비율 ── */
export const GOLDEN_OVERALL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Your feature proportions sit quite close to the golden ratio. That balance is what gives the face its settled, harmonious impression.',
    'Well-balanced proportions overall. Nothing pulls too far in one direction, and that evenness is the appeal.',
    'The features are laid out with a good sense of balance — proportions that read as stable and easy to look at.',
    'Harmonious proportions stand out here. The parts sit well together and produce a natural impression.',
    'Proportions with real individuality. The appeal here is specifically not tied to the golden ratio.',
    'Distinctive, characterful proportions. Not being standard-issue is exactly what makes this face memorable.',
  ],
  zh: [
    '五官比例相当接近黄金比。这份均衡的和谐感，正是让整张脸显得安定的原因。',
    '整体比例平衡得不错。没有哪一处特别失衡，这种协调本身就是魅力点。',
    '五官分布很有均衡感，是那种既稳定又让人看着舒服的比例。',
    '协调的比例很突出。各个部位彼此配合得好，形成自然的印象。',
    '很有个性的比例。魅力恰恰不在于贴近黄金比，而在于自己的样子。',
    '拥有独特而有个性的比例。不落俗套，反而更让人记得住。',
  ],
};

export const GOLDEN_METRIC_LABELS: Record<SnapIntlLang, Record<string, { label: string; desc: string }>> = {
  en: {
    faceThirds: { label: 'Vertical proportion', desc: 'brow-to-nose versus nose-to-chin' },
    faceWidth:  { label: 'Length to width',    desc: 'face length versus cheekbone width' },
    eyeMouth:   { label: 'Eye–mouth balance',  desc: 'inner eye spacing versus mouth width' },
    noseMouth:  { label: 'Nose–mouth balance', desc: 'nose width versus mouth width' },
  },
  zh: {
    faceThirds: { label: '脸部纵向比例', desc: '眉毛至鼻尖 与 鼻尖至下巴的比' },
    faceWidth:  { label: '长宽比例',     desc: '脸的长度 与 颧骨宽度的比' },
    eyeMouth:   { label: '眼—嘴均衡',    desc: '两眼内侧间距 与 嘴宽的比' },
    noseMouth:  { label: '鼻—嘴均衡',    desc: '鼻宽 与 嘴宽的比' },
  },
};

export const GOLDEN_TIP_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'The golden ratio is a reference point, not a verdict — expression and mood do far more for how you come across.',
    'Take one photo today where you are smiling with confidence. The smile moves the impression more than the proportions do.',
    'A small change of angle changes the apparent proportions. It is worth finding the one that suits you.',
    'Hairstyle changes how the proportions read too. Today might be the day to try something different.',
    'Treat the numbers as a reference; most of an impression comes from expression.',
    'A slight three-quarter angle often flatters the proportions more than straight on.',
    'Soft light from above makes the features look clearer and better balanced.',
    'Spend a minute at the mirror finding the angle you actually like best.',
  ],
  zh: [
    '黄金比只是一个参考标准，真正的魅力来自表情和氛围。',
    '今天留一张自信笑着的照片吧。比起比例，笑容更能决定印象。',
    '角度稍微一变，五官比例看起来就不一样。找到适合自己的那一个。',
    '发型不同，脸的比例看起来也会不同。今天不妨试个新造型。',
    '比例参考就好，有说法认为印象八成取决于表情管理。',
    '比起正面，略微 3/4 的角度往往比例更好看。',
    '光从上方柔和地打下来，五官会显得更清晰、更均衡。',
    '今天对着镜子花一分钟，找出你自己最满意的角度。',
  ],
};

/* ── 스냅테스트 공용 UI ── */
export const SNAP_UI: Record<SnapIntlLang, {
  hubTitle: string;
  hubLead: string;
  hubKicker: string;
  detail: string;
  overall: string;
  breakdown: string;
  tipLabel: string;
}> = {
  en: {
    hubTitle: 'Snap Tests',
    hubLead: 'Upload one photo and see what the landmarks say — nothing is uploaded to a server',
    hubKicker: 'Photo tests',
    detail: 'Detail',
    overall: 'Overall',
    breakdown: 'Breakdown',
    tipLabel: 'Photo tip',
  },
  zh: {
    hubTitle: '照片测试',
    hubLead: '上传一张照片，看看关键点怎么说 —— 照片不会上传到服务器',
    hubKicker: '照片测试',
    detail: '细项',
    overall: '综合',
    breakdown: '细项分析',
    tipLabel: '拍照建议',
  },
};

/* ── 사진 감성 ──
   얼굴 인식이 필요 없어 풍경·소품 사진도 받는다. 픽셀 통계(밝기·채도·웜쿨·대비)로
   사분면을 나누는 방식이라 계산은 언어와 무관하다. */
export type MoodKeyIntl = 'pastel' | 'vivid' | 'moody' | 'neon';

export const MOOD_META_INTL: Record<SnapIntlLang, Record<MoodKeyIntl, { label: string; vibe: string }>> = {
  en: {
    pastel: { label: 'Soft & Light', vibe: 'bright, low saturation, minimal' },
    vivid:  { label: 'Bright & Vivid', vibe: 'bright, high saturation, fresh' },
    moody:  { label: 'Moody Grey', vibe: 'dark, low saturation, cinematic' },
    neon:   { label: 'Dark Neon', vibe: 'dark, high saturation, dramatic' },
  },
  zh: {
    pastel: { label: '白调质感', vibe: '明亮、低饱和、极简' },
    vivid:  { label: '清爽鲜明', vibe: '明亮、高饱和、清新' },
    moody:  { label: '灰调氛围', vibe: '暗调、低饱和、电影感' },
    neon:   { label: '暗夜霓虹', vibe: '暗调、高饱和、戏剧感' },
  },
};

export const MOOD_POOL_INTL: Record<SnapIntlLang, Record<MoodKeyIntl, string[]>> = {
  en: {
    pastel: [
      'A bright, softly desaturated photo. The light tone reads as calm and tidy, and it flatters people and objects alike.',
      'Gentle pastel feeling throughout. The restraint in the colour is what makes it comfortable to look at — good for everyday shots.',
      'Minimal and orderly. This mood gets stronger the more negative space and the fewer competing colours there are.',
      'Warm and easy on the eye. Pulling the saturation down even slightly is what completes this kind of mood.',
      'A calm, elegant white-and-pastel combination. A clean background doubles the effect.',
      'Bright, understated tones that read as naturally trustworthy — good for keeping a feed visually consistent.',
      'Strong ivory and beige feeling. Well suited to object photography and moodboard-style sets.',
      'Soft and slightly dreamlike. This often appears in backlit shots or on overcast days.',
      'Neat, with room to breathe. The mood comes from composition and space rather than colour.',
      'Gentle light and low saturation making a relaxed image — the effortless-looking kind of shot.',
    ],
    vivid: [
      'Fresh and full of life. The clear colour makes for a bright, open impression — especially good for summer and outdoor shots.',
      'Punchy colour that stands out. The stronger the contrast between subject and background, the better this mood works.',
      'Lively and energetic. Bright skies and strong primary colours amplify it.',
      'Crisp pop-colour feeling. Very likely a photo where the colour holds up without any filter.',
      'Bright, clear colour throughout. High saturation carries an active, positive atmosphere.',
      'A real sense of freshness. This often shows up in natural-light photos with blues and greens.',
      'Colour-forward and cheerful — the kind of frame that stops the scroll as a thumbnail.',
      'An eye-catching colour combination. Several of these together make a bright, coherent set.',
      'Full of clear, sunny energy. Particularly appealing in travel and outdoor photos.',
      'Sharp colour with bright exposure. Has pop without needing any editing.',
    ],
    moody: [
      'Calm and deep. The pulled-down tone and low saturation give it a cinematic quality.',
      'Grey and dark tones making something refined — suits photos that hold emotion back while still conveying it.',
      'Weighty and composed low-saturation mood. In portraits it reads as serious and reflective.',
      'The particular feeling of film. Slightly under-exposed, which adds depth.',
      'Restrained colour with strong shadow. Works well for quiet, indoor scenes.',
      'A settled, unhurried atmosphere. Rain and overcast light produce this reliably.',
      'Muted and textural. The mood comes from tonal range rather than colour.',
      'Deep shadows with a narrow palette — the kind of frame that rewards a second look.',
      'Quiet and cinematic. Good for photos meant to sit still rather than shout.',
      'Low-key and considered. The absence of bright colour is doing the work here.',
    ],
    neon: [
      'Dark but saturated — the night-city look, dramatic and high contrast.',
      'Strong colour against deep shadow. Signage, screens and streetlights produce this well.',
      'Vivid highlights in a dark frame. It reads as energetic even though the overall tone is low.',
      'A dramatic mix of dark base and strong accent colour, the kind that carries on a small screen.',
      'Night-time palette with real colour left in it. Neon and reflections push this further.',
      'Deep tone with saturated punctuation — visually loud without being bright.',
      'High contrast between dark surroundings and a coloured light source.',
      'Cinematic night mood. Wet ground and reflected light amplify it noticeably.',
      'Dark and vivid at once, which is exactly what makes it feel modern.',
      'Bold colour lifted out of shadow — the most graphic of the four moods.',
    ],
  },
  zh: {
    pastel: [
      '明亮柔和的白调照片。降低饱和度的浅色调让画面显得舒服而整洁，人物和静物都好看。',
      '淡雅温柔的质感很突出。不过分的色彩让人看着舒服，很适合日常记录。',
      '极简而整齐的白调照片。留白越多、颜色越克制，这种感觉就越明显。',
      '温柔可爱的照片。饱和度只要稍微降一点，氛围感就出来了。',
      '沉静优雅的白色与浅色搭配。配上干净的背景，效果会加倍。',
      '明亮内敛的色调，自然让人产生信赖感。特别适合让整个主页保持统一。',
      '米白、米色系的感觉很强。适合静物照或情绪板风格的组图。',
      '柔和带点朦胧的质感。逆光或阴天拍摄时常会出现这种氛围。',
      '干净且有留白的白调照片。氛围来自构图和留白，而不是颜色。',
      '柔光与低饱和造就的放松感 —— 那种「精心又像没打理」的调子。',
    ],
    vivid: [
      '清爽而有生气的鲜明照片。清晰的色彩带来开阔明亮的印象，特别适合夏天和户外。',
      '色彩跳脱、很抓眼。主体和背景的色差越明显，这种感觉越好。',
      '生机勃勃、充满活力。搭配通透的天空和鲜艳的原色小物，感觉会翻倍。',
      '清新明快的糖果色感觉。很可能是不用滤镜色彩也立得住的照片。',
      '明亮清晰的色彩很有存在感。高饱和带来积极活跃的氛围。',
      '清爽感扑面而来。蓝绿色系的自然光照片里常见这种调子。',
      '色彩鲜活、朝气十足。做缩略图特别抓人。',
      '跳跃的配色让人挪不开眼。几张放在一起就是明亮统一的一组。',
      '满是晴朗明亮的气息。旅行和户外照片里格外好看。',
      '清晰色彩配上明亮曝光。不修图也有跳出来的感染力。',
    ],
    moody: [
      '沉静而有深度的氛围照。压暗的色调与低饱和造出电影般的质感。',
      '灰调与暗色营造的高级氛围。适合那种克制却传达得很浓的照片。',
      '厚重沉稳的低饱和氛围。用在人像上会显得沉着、有思考感。',
      '有胶片特有的味道。稍微压暗的曝光让画面更有层次。',
      '克制的色彩配上明确的阴影。适合安静的室内场景。',
      '不慌不忙的沉静氛围。下雨天和阴天的光线很容易出这个调子。',
      '低饱和且有质感。氛围来自明暗层次，而不是颜色。',
      '深阴影配上收窄的色域 —— 值得多看一眼的那种画面。',
      '安静而有电影感。适合那些想让人停下来看的照片。',
      '低调而克制。恰恰是没有鲜艳色彩，才成就了这张照片。',
    ],
    neon: [
      '暗调却高饱和 —— 典型的夜色都市感，戏剧性强、对比大。',
      '浓烈色彩落在深阴影上。招牌、屏幕和路灯很容易拍出这种感觉。',
      '暗色画面里的鲜亮高光。整体虽暗，读起来却很有能量。',
      '深色底加上强烈的点缀色，即使在小屏幕上也很有冲击力。',
      '夜晚的色盘，但颜色都还在。霓虹与倒影会让效果更强。',
      '深色调配上高饱和的点睛 —— 不亮，却很响亮。',
      '暗环境与彩色光源之间的强对比。',
      '有电影感的夜间氛围。湿地面和反光会明显加强这种感觉。',
      '同时是暗的和鲜艳的，这正是它显得当代的原因。',
      '从阴影里提出来的大胆色彩 —— 四种氛围里最有图形感的一种。',
    ],
  },
};

export const MOOD_CAPTION_TIP_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'A short, plain line suits this photo better. Leave space rather than explaining.',
    'The better the colour, the shorter the caption should be — one emoji is plenty.',
    'Try describing the feeling of the moment in a single word.',
    'A sentence about the atmosphere lasts longer in memory than the date and place.',
    'Three or four hashtags is enough; more starts to look cluttered.',
    'If you want to tag someone, a comment reads more naturally than the caption.',
    'A question in the caption pulls more replies than a long description.',
    'This one would set the tone well as the first image in a set.',
    'The unedited version may feel more atmospheric than any filter today.',
    'Group it with two or three photos in the same tone for a coherent set.',
    'Sometimes posting with no caption at all is its own kind of statement.',
    'Let the strongest colour in the frame decide the mood of the caption.',
  ],
  zh: [
    '这张照片配一句简短平实的话更合适。与其解释，不如留白。',
    '色彩越好的照片，配文越要短，加一个表情就够了。',
    '试着用一个词表达此刻的心情，那就是很好的配文。',
    '写当下的氛围，会比写日期和地点更让人记得住。',
    '标签挑三四个就够，太多反而显得杂乱。',
    '想@朋友的话，写在评论里比写在配文里更自然。',
    '提问式的配文比长篇说明更容易带来互动。',
    '这张作为一组照片的第一张，很能定下整体的调子。',
    '今天也许不加滤镜的原片，比修过的更有味道。',
    '和两三张同色调的照片放在一起，会成为很统一的一组。',
    '有时候什么都不写，只放照片，本身就是一种表达。',
    '让画面里最强的那个颜色来决定配文的语气。',
  ],
};

/* ── 표정 감정 분석 ──
   face-api의 감정 인식 모델이 7가지 확률을 실제로 추론한다. 무작위가 아니라
   학습된 신경망의 출력이고, 여기 붙는 코멘트만 오락용 해석이다. */
export type EmotionKeyIntl = 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised';

export const EMOTION_LABELS_INTL: Record<SnapIntlLang, Record<EmotionKeyIntl, string>> = {
  en: {
    happy: 'Happy', neutral: 'Neutral', surprised: 'Surprised',
    sad: 'Sad', angry: 'Angry', fearful: 'Fearful', disgusted: 'Displeased',
  },
  zh: {
    happy: '开心', neutral: '无表情', surprised: '惊讶',
    sad: '难过', angry: '生气', fearful: '害怕', disgusted: '不悦',
  },
};

export const EMOTION_POOL_INTL: Record<SnapIntlLang, Record<EmotionKeyIntl, string[]>> = {
  en: {
    happy: [
      'Happiness comes through most strongly here. The lift at the mouth and the crease at the eyes read as genuine, and that kind of positive expression measurably lifts a first impression.',
      'Bright, happy energy that carries past the frame. Happiness scored far above everything else, which means the smile reads as real rather than held. A good one to keep as a profile picture.',
      'The smile dominates the emotion spread. It gives the impression of someone who would be good company — open, warm and easy to approach.',
      'The highest happiness reading of the set. Nothing forced about it, so it feels like an actual moment rather than a pose. That honesty beats any filter.',
    ],
    neutral: [
      'A composed neutral expression leads the spread. Holding the emotion back reads as understated and modern — the kind of face that suits an editorial or concept shot.',
      'Calm, almost detached. Because little emotion shows on the surface, it comes across as steady and dependable, which is its own kind of appeal.',
      'Restrained and plain in the best sense. There is nothing to tire of, and the composure gives it depth on a long look.',
      'Neutral scored highest. There is something unreadable about it, and that ambiguity often leaves the stronger impression.',
    ],
    surprised: [
      'Surprise leads the spread. Wide eyes and an open expression — a photo that caught an actual moment rather than a pose.',
      'The highest surprise reading. It reads as lively and expressive, with the feeling of a real reaction rather than a held face.',
      'Wide-eyed and open. There is something curious and unguarded about it that reads as younger and more candid.',
      'The startled quality is the appeal here. It gives the photo a sense of story, and the reaction holds the eye.',
    ],
    sad: [
      'A quieter, downcast reading came out on top. Photos with this kind of tone often carry more feeling than a smiling one does.',
      'Some melancholy in the expression. That is not a flaw — softer, more contemplative faces photograph with real depth.',
      'A subdued expression leads. It reads as thoughtful rather than unhappy, the kind of frame that suits a quiet moment.',
      'A touch of wistfulness. This mood is what gives portraits their weight, and it tends to age well as an image.',
    ],
    angry: [
      'A firm, intense expression scored highest. Often this is simply concentration rather than anger — a focused face reads as strong.',
      'Strength and intensity dominate. Furrowed brows frequently register here even when the mood is just determination.',
      'A serious, unsmiling face leads the spread. It reads as decisive, which is exactly right for some kinds of portrait.',
      'The set expression came out on top. There is conviction in it, and conviction photographs well.',
    ],
    fearful: [
      'A tense reading leads. Wide eyes and raised brows register this way, and it often just means the shutter caught you mid-thought.',
      'Some apprehension in the expression. That vulnerability is often what makes a candid photo feel honest.',
      'The alert, slightly braced look scored highest. It gives the frame urgency and movement.',
      'A caught-off-guard quality leads the spread — usually the sign of a genuinely unposed photo.',
    ],
    disgusted: [
      'A scrunched, unimpressed expression scored highest. These faces are usually the funniest ones in an album.',
      'Displeasure leads — often a squint into the sun rather than an actual reaction.',
      'A wrinkled-nose expression came out on top. It is expressive, and expressive photos are memorable.',
      'The unimpressed face leads the spread. There is character in it, which is more than most posed shots manage.',
    ],
  },
  zh: {
    happy: [
      '照片里最突出的是开心。嘴角和眼角自然的笑意让人跟着心情变好，这种积极表情能明显提升第一印象。',
      '灿烂的快乐能量透出画面。开心的概率远高于其他情绪，说明这是发自内心的笑。拿来当头像好感度会直接上一个台阶。',
      '笑容在情绪分布中占比最大。满是正向的气息，给人一种在一起会很开心的印象，明亮又好接近。',
      '开心指数最高的一张。不勉强、很自然，像真的捕捉到了愉快的瞬间。这种真诚的笑比任何滤镜都好看。',
    ],
    neutral: [
      '沉静的无表情在情绪分布中最突出。不外露情绪的高冷感是它的魅力，反而显得洗练、有都市感，很适合概念照。',
      '看似无谓、实则沉稳的表情占主导。情绪起伏不写在脸上，给人稳重可靠的感觉。',
      '克制而清爽的表情。因为不过分，所以看久了也舒服，那份不轻易外露的沉静本身就很有味道。',
      '中性表情占比最高。有种看不透的神秘感，这样的氛围往往反而留下更强的印象。',
    ],
    surprised: [
      '惊讶在情绪分布里最突出。眼睛睁大、表情舒展，是抓到了真实瞬间而不是摆拍的照片。',
      '惊讶指数最高。显得生动、表现力强，情绪坦率地流露出来，很有活力。',
      '睁大眼睛的惊讶占主导。透着单纯与好奇，有种显小的可爱，也很坦诚。',
      '吓一跳般的表情正是魅力点。表现力足，照片像带着故事，反应生动、抓眼。',
    ],
    sad: [
      '偏低落的情绪排在最前。这种调子的照片，往往比笑着的更有情绪张力。',
      '表情里带着一点忧郁。这不是缺点 —— 柔软、带思绪的脸拍出来很有深度。',
      '沉静的表情占主导。读起来更像在思考而不是不开心，适合安静的瞬间。',
      '有几分怅然。人像的分量往往就来自这种情绪，而且这样的照片会越看越耐看。',
    ],
    angry: [
      '坚定而有力度的表情得分最高。很多时候这只是专注而非生气 —— 专注的脸看着就有力量。',
      '力量感与强度占主导。皱眉在模型里常被读成这一类，其实往往只是下定决心的样子。',
      '认真不笑的脸排在最前。显得果断，用在某些人像里恰到好处。',
      '绷住的表情占比最高。里面有笃定，而笃定是很上镜的。',
    ],
    fearful: [
      '紧张的读数排在最前。眼睛睁大、眉毛上扬容易被读成这一类，通常只是快门抓到了你正在想事情的瞬间。',
      '表情里有一点忐忑。这份不设防，常常正是抓拍照片显得真诚的原因。',
      '警觉、微微绷住的样子得分最高。它给画面带来紧迫感和动势。',
      '被抓个正着的感觉排在最前 —— 通常说明这是一张真正没有摆拍的照片。',
    ],
    disgusted: [
      '皱起来的、不以为然的表情得分最高。这类照片往往是相册里最好笑的几张。',
      '不悦排在最前 —— 很多时候只是被太阳晃到眯了眼，而不是真的有反应。',
      '皱鼻子的表情占比最高。表现力强，而有表现力的照片让人记得住。',
      '不买账的那张脸排在最前。里面有性格，这是大多数摆拍做不到的。',
    ],
  },
};

export const EMOTION_TIP_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'The model reads pixels, not feelings — a photo is one frozen instant, not a mood.',
    'Expression recognition is trained mostly on posed faces, so subtle expressions often land as neutral.',
    'Try the same face in different light; the reading can shift more than you would expect.',
    'A slight head tilt changes the eye and brow geometry, which is most of what the model looks at.',
    'Compare two photos from the same day — the difference is usually the light, not the mood.',
    'Neutral scoring high is extremely common. Most faces at rest are neutral.',
    'Glasses and hair over the brows can pull the reading around noticeably.',
    'Try a burst and see how much the numbers move between frames a second apart.',
  ],
  zh: [
    '模型读的是像素，不是心情 —— 一张照片只是被冻住的一瞬，不等于当时的状态。',
    '表情识别主要在摆拍数据上训练，所以细微的表情常常被读成无表情。',
    '换个光线拍同一张脸试试，结果的变化可能比你想的大。',
    '头稍微一歪，眼睛和眉毛的几何就变了，而这正是模型主要在看的地方。',
    '比较同一天的两张照片，差别通常来自光线而不是心情。',
    '无表情得分高非常常见，大多数人放松时的脸就是中性的。',
    '眼镜和盖住眉毛的头发会明显影响读数。',
    '连拍几张看看，相隔一秒的两帧数字能差多少。',
  ],
};
