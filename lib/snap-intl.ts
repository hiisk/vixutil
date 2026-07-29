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
