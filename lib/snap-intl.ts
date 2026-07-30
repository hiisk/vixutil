/* ────────────────────────────────────────────────
   스냅테스트 영어·중국어 문구.

   측정 자체(랜드마크 계산)는 언어와 무관하므로 한국어 lib의 순수 함수를 그대로
   쓰고, 결과 문장 풀만 언어별로 갈아 끼운다. 같은 사진이면 세 언어가 같은
   퍼센트를 낸다.

   무표정 사진이 나와도 부정적으로 읽히지 않게 모든 구간을 긍정적으로 서술하는
   한국어 쪽 원칙을 en/zh에도 그대로 지켰다.
──────────────────────────────────────────────── */
export type SnapIntlLang = 'en';

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
};

export const SMILE_LABELS: Record<SnapIntlLang, { curve: string; openness: string; balance: string }> = {
  en: { curve: 'Corner lift', openness: 'Mouth opening', balance: 'Left–right balance' },
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
};

export const SYMMETRY_REGION_LABELS: Record<SnapIntlLang, Record<string, string>> = {
  en: { eye: 'Eye level', brow: 'Eyebrows', mouth: 'Mouth corners', jaw: 'Jawline' },
};

export const SYMMETRY_REGION_COMMENT: Record<SnapIntlLang, { min: number; text: string }[]> = {
  en: [
    { min: 85, text: 'almost perfectly even' },
    { min: 70, text: 'well matched' },
    { min: 55, text: 'reasonably even' },
    { min: 40, text: 'slightly uneven' },
    { min: 0, text: 'distinctively uneven' },
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
};

export const GOLDEN_METRIC_LABELS: Record<SnapIntlLang, Record<string, { label: string; desc: string }>> = {
  en: {
    faceThirds: { label: 'Vertical proportion', desc: 'brow-to-nose versus nose-to-chin' },
    faceWidth:  { label: 'Length to width',    desc: 'face length versus cheekbone width' },
    eyeMouth:   { label: 'Eye–mouth balance',  desc: 'inner eye spacing versus mouth width' },
    noseMouth:  { label: 'Nose–mouth balance', desc: 'nose width versus mouth width' },
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
};

/* ── 손글씨 심리 ──
   기울기는 구조텐서로 실제 획 방향을 구하고, 필압은 어두운 픽셀 비율로 잰다.
   측정은 진짜지만 거기 붙는 성격 해석은 필적학 기반의 오락 콘텐츠다. */
export const SLANT_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Strongly left-leaning writing. In graphology this is read as holding feeling back and thinking a situation through before acting.',
    'Slightly left-leaning. Read as stepping back to read the room rather than moving on impulse.',
    'Gently left of vertical. Taken to mean a busy inner life and a habit of turning decisions over more than once.',
    'Near-vertical with a slight left lean. Read as valuing the balance between feeling and reason, and judging calmly.',
    'Almost perfectly upright. Read as even-handed — deciding on reason rather than being carried by emotion.',
    'Near-vertical with a slight right lean. Read as balanced, able to show feeling when it is called for.',
    'Gently right-leaning. Read as moving from thought to action without much friction, and enjoying company.',
    'Slightly right-leaning. Read as open about feelings and comfortable meeting new people.',
    'Clearly right-leaning. Read as warm and forward-moving, saying what is on your mind as it arrives.',
    'Strongly right-leaning. Read as expressive and sociable, acting the moment a thought lands.',
  ],
};

export const PRESSURE_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Very light pressure. Read as delicate and composed, expressing feeling with restraint.',
    'Light pressure. Read as gentle and careful, with a habit of not wanting to impose.',
    'Soft pressure. Read as steady energy with little emotional swing.',
    'Moderate pressure. Read as stable and balanced, adapting to what a situation needs.',
    'Firm pressure. Read as having clear opinions and acting on them with conviction.',
    'Heavy pressure. Read as energetic and driven, pushing hard at what matters to you.',
    'Very heavy pressure. Read as expressing strongly and having a definite presence.',
    'Pressed hard into the page. Read as strong will and focus — once decided, carried through.',
  ],
};

export const HANDWRITING_TIP_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Writing out what you want to say first tends to make the thought much clearer.',
    'A handwritten note carries further than a message today.',
    'Today is a good day to say the honest thing slightly more plainly than usual.',
    'A short daily line in a notebook is a habit worth starting.',
    'For something important, drafting it in writing before speaking is a real technique.',
    'Changing how you form letters for a page is a surprisingly effective reset.',
    'Free, aimless scribbling is genuinely good for stress.',
    'Consider leaving someone a short thank-you in your own handwriting.',
    'There is evidence that writing a goal by hand makes you more likely to act on it.',
    'Switching the pen you use can change how the whole page feels.',
  ],
};

/* ── 첫인상 분석 ──
   눈 크기·얼굴 비율·입꼬리 세 실측값의 조합으로 6유형을 정한다.
   유형 id와 판정 규칙은 한국어와 동일하다. */
export type ImpressionIdIntl = 'bright' | 'calm' | 'chic' | 'soft' | 'elegant' | 'energetic';

export const IMPRESSION_TYPES_INTL: Record<SnapIntlLang, Record<ImpressionIdIntl, {
  label: string; emoji: string; desc: string; strength: string; keywords: string[]; color: string;
}>> = {
  en: {
    bright: {
      label: 'Bright and approachable', emoji: '☀️', color: 'from-amber-400 to-orange-500',
      desc: 'Clear eyes and a relaxed mouth make this an easy face to start a conversation with. There is no guardedness in the expression, so people tend to approach you first. One photo is enough to give the impression of someone worth knowing.',
      strength: 'First hellos in interviews and first dates — anywhere you have a short window to be liked',
      keywords: ['Warm', 'Clear', 'Approachable', 'Bright'],
    },
    calm: {
      label: 'Calm and trustworthy', emoji: '🌿', color: 'from-emerald-400 to-teal-600',
      desc: 'An unforced gaze and a face with the tension let out of it, giving a settled kind of ease. Quiet at first, more comfortable the longer people know you. This is trust built through manner rather than words, so the impression improves over time.',
      strength: 'Long working relationships, and situations where the other person needs reassuring',
      keywords: ['Steady', 'Trustworthy', 'At ease', 'Grounded'],
    },
    chic: {
      label: 'Sharp and composed', emoji: '🖤', color: 'from-slate-500 to-slate-700',
      desc: 'Defined eyes and a clean facial line giving an urban quality. Because the expression is held back, you are not easy to read, and that leaves a question behind. This face lands hardest in photographs, and often looks best without a smile.',
      strength: 'Profile photos, and presentations or stages where you need to register strongly',
      keywords: ['Composed', 'Urban', 'Restrained', 'Present'],
    },
    soft: {
      label: 'Soft and warm', emoji: '🌸', color: 'from-rose-400 to-pink-500',
      desc: 'Rounded lines and naturally lifted mouth corners give off real warmth. There is something in it that lowers other people’s tension, so conversation starts easily even on a first meeting. Nothing about it tires on a long look.',
      strength: 'Work that involves meeting people constantly, and moments where someone needs to open up',
      keywords: ['Warm', 'Gentle', 'Accepting', 'Easy'],
    },
    elegant: {
      label: 'Poised and elegant', emoji: '🕊️', color: 'from-violet-400 to-purple-600',
      desc: 'A longer facial line with balanced features, giving a composed impression. Rather than standing out loudly, this face stays with people quietly. It suits formal settings particularly well, and it is the kind of appeal that deepens with age.',
      strength: 'Formal settings, and relationships where trust and bearing matter',
      keywords: ['Poised', 'Balanced', 'Elegant', 'Understated'],
    },
    energetic: {
      label: 'Lively and energetic', emoji: '⚡', color: 'from-sky-400 to-blue-600',
      desc: 'Large eyes and an animated expression mean the energy reaches people before anything else does. Even at rest there is liveliness here, so you often end up as the one who lifts the room. In a group photo the eye goes to you first.',
      strength: 'Leading the mood of a team, and any moment that needs some lift',
      keywords: ['Lively', 'Energetic', 'Animated', 'Noticed'],
    },
  },
};

export const IMPRESSION_TIPS_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Research consistently puts expression above features for first impressions. Breathe out once and let the tension go before you walk in.',
    'Holding eye contact one second longer measurably raises how warmly you are read.',
    'In photos, looking slightly above the lens makes the eyes read as clearer.',
    'Squaring your shoulders changes the impression more than your face does — posture is seen first.',
    'Natural light softens the shadows and makes the whole impression more relaxed.',
    'Turning about fifteen degrees off square brings out the line of the face.',
    'A small nod while listening reads as attention and lifts how you come across.',
    'Saying someone’s name once on a first meeting makes the impression last considerably longer.',
    'A smile that reaches the eyes reads as real; one that only lifts the mouth does not.',
    'Resting your tongue on the roof of your mouth before a photo tidies the jawline.',
    'A light-coloured top bounces light onto the face and brightens the whole impression.',
    'If you are nervous, press through your feet rather than your hands — the face stays looser.',
  ],
};

/* ── 동물상 ──
   12개 기준 벡터와의 최근접 이웃으로 정한다. 벡터와 거리 계산은 언어와
   무관하므로 한국어 ANIMAL_ARCHETYPE을 그대로 쓰고 라벨·문장만 갈아 끼운다. */
export type AnimalKeyIntl =
  | 'dog' | 'cat' | 'fox' | 'rabbit' | 'bear' | 'deer'
  | 'squirrel' | 'tiger' | 'lamb' | 'panda' | 'wolf' | 'koala';

export const ANIMAL_LABELS_INTL: Record<SnapIntlLang, Record<AnimalKeyIntl, string>> = {
  en: {
    dog: 'Puppy type', cat: 'Cat type', fox: 'Fox type', rabbit: 'Rabbit type',
    bear: 'Bear type', deer: 'Deer type', squirrel: 'Squirrel type', tiger: 'Tiger type',
    lamb: 'Lamb type', panda: 'Panda type', wolf: 'Wolf type', koala: 'Koala type',
  },
};

export const ANIMAL_POOL_INTL: Record<SnapIntlLang, Record<AnimalKeyIntl, string[]>> = {
  en: {
    dog: [
      'Round, friendly eyes and a soft jawline — the face people describe as easy to like. There is no edge to it, so first meetings tend to go smoothly.',
      'Warm and open. The features sit in a way that reads as approachable rather than striking, which is its own kind of advantage.',
    ],
    cat: [
      'Lifted outer eye corners and a slim line — the cool, self-possessed type. Reads as independent rather than distant.',
      'Feline proportions: narrow face, tilted eyes. It photographs well and holds attention without trying.',
    ],
    fox: [
      'Sharply lifted eyes and a narrow face — the sharpest of the twelve. Reads as clever and quick.',
      'A slim, upward-tilted look. Striking rather than soft, and memorable after one meeting.',
    ],
    rabbit: [
      'Large eyes on a small, narrow face. Reads as young and open, the type people instinctively want to look after.',
      'Wide-eyed and delicate. The proportions read as gentle and slightly startled, which is exactly the appeal.',
    ],
    bear: [
      'A broad, rounded face with a solid jaw — the reassuring type. Reads as dependable and warm rather than sharp.',
      'Generous proportions that read as steady. This is the face people describe as comforting to be around.',
    ],
    deer: [
      'A long, narrow face with large eyes — elegant and slightly delicate. Reads as gentle and watchful.',
      'Fine-boned proportions with wide eyes. Quiet rather than loud, and it holds up in close-up.',
    ],
    squirrel: [
      'Small, narrow face with big lively eyes. Reads as quick and curious, the type that seems to be up to something.',
      'Compact and bright-eyed. The proportions read as energetic and youthful.',
    ],
    tiger: [
      'A broad face with a strong jaw and lifted eyes — the most commanding of the twelve. Reads as confident.',
      'Strong bone structure with intensity in the eyes. This face registers instantly in a group.',
    ],
    lamb: [
      'A soft, narrow face with gentle eyes. Reads as calm and unthreatening, and it ages beautifully.',
      'Fine features with no hard lines. Quiet, warm, and easy to be around.',
    ],
    panda: [
      'A rounded face with large, wide-set eyes. Reads as cheerful and unguarded — very hard to dislike.',
      'Round proportions with big eyes. The combination reads as friendly and a little playful.',
    ],
    wolf: [
      'A strong jaw with narrow, lifted eyes. Reads as composed and a bit unreadable, which people find compelling.',
      'Angular and intense. It holds up especially well in profile and in dramatic light.',
    ],
    koala: [
      'A wide, soft face with small calm eyes. Reads as unhurried and gentle — the most relaxed of the twelve.',
      'Rounded and quiet. The proportions read as unbothered, which is a rarer appeal than it sounds.',
    ],
  },
};

export const ANIMAL_TIP_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Animal-face typing is a game, not a measurement of attractiveness — every one of the twelve has its own appeal.',
    'The result shifts with angle and expression. Try a different photo and see which type you land on.',
    'The runner-up type is often the one people actually say you resemble.',
    'Hairstyle changes the face-shape ratio more than anything else — the result can move with a haircut.',
    'A smiling photo and a neutral one from the same day can give different types. Both are you.',
    'Lighting from below widens the jaw in the measurement. Front light gives the most representative result.',
  ],
};

/* ── 관상 ──
   중화권에서는 面相으로 본토 문화라 zh 수요가 크다. 7개 부위의 실측 비율을
   구간별 해석에 매핑하는 구조는 한국어와 동일하고, 문장만 각 언어로 새로 썼다.
   배열 길이가 곧 구간 수라 언어별로 길이가 달라도 동작에는 문제가 없다. */
export type FeatureKeyIntl = 'faceShape' | 'eyebrow' | 'eye' | 'eyeTilt' | 'nose' | 'mouth' | 'chin';

export const FEATURE_LABELS_INTL: Record<SnapIntlLang, Record<FeatureKeyIntl, string>> = {
  en: {
    faceShape: 'Face shape', eyebrow: 'Eyebrows', eye: 'Eye size', eyeTilt: 'Eye tilt',
    nose: 'Nose', mouth: 'Mouth', chin: 'Jawline',
  },
};

export const FEATURE_POOL_INTL: Record<SnapIntlLang, Record<FeatureKeyIntl, string[]>> = {
  en: {
    faceShape: [
      'A long, slim face. Traditionally read as composed and thoughtful — someone who thinks before moving rather than leading with feeling. May seem hard to approach at first, but is usually described as having depth once known.',
      'Slightly elongated. Read as calm and considered, with a preference for weighing things up over reacting quickly.',
      'Balanced proportions, neither long nor round. Read as adaptable — able to shift register depending on who is in the room.',
      'Softly rounded. Read as warm and sociable, the sort of face that makes other people relax first.',
      'Broad and rounded. Read as generous and dependable, with a tendency to be the one others rely on.',
      'Wide with a strong structure. Read as decisive and grounded, comfortable taking responsibility.',
    ],
    eyebrow: [
      'Flat, level brows. Read as steady and unhurried — someone whose mood is hard to read from a distance.',
      'Gently arched. Read as balanced between reason and feeling, adjusting to what a situation asks for.',
      'A clear, moderate arch. Read as expressive without being volatile — the middle ground most faces sit in.',
      'A defined arch. Read as having strong opinions and being willing to voice them.',
      'A high, pronounced arch. Read as ambitious and quick to react, with visible feeling.',
      'A sharply lifted arch. Read as intense and driven, with little patience for delay.',
    ],
    eye: [
      'Narrow eyes. Read as observant and private — noticing more than is let on.',
      'Slightly narrow. Read as measured, someone who watches before joining in.',
      'Average size. Read as approachable without being unguarded.',
      'Slightly large. Read as open and curious, quick to engage.',
      'Large eyes. Read as expressive and warm, with feeling that shows clearly.',
      'Very large eyes. Read as unguarded and vivid — what is felt is visible immediately.',
    ],
    eyeTilt: [
      'Distinctly downturned. Read as gentle and unthreatening, the sort of gaze people find easy to meet.',
      'Slightly downturned. Read as soft and approachable, with a kind quality to the expression.',
      'Close to level. Read as even-tempered and steady, giving nothing away either direction.',
      'Slightly upturned. Read as alert and confident, with some sharpness to the look.',
      'Clearly upturned. Read as self-possessed and striking, the classic composed gaze.',
      'Strongly upturned. Read as intense and commanding — a gaze that registers immediately.',
    ],
    nose: [
      'A narrow nose. Read as refined and careful, with attention to detail.',
      'Slightly narrow. Read as considered, preferring precision to broad strokes.',
      'Moderate width. Read as balanced — practical without being rigid.',
      'Slightly broad. Read as generous and grounded, comfortable with people.',
      'A broad nose. Read as open-handed and resilient, traditionally linked to steady fortune.',
      'Notably broad. Read as expansive and confident, with an appetite for scale.',
    ],
    mouth: [
      'A small mouth. Read as reserved and careful with words — saying less than is thought.',
      'Slightly small. Read as measured in speech, choosing words deliberately.',
      'Average width. Read as balanced — able to speak up or hold back as needed.',
      'Slightly wide. Read as sociable and expressive, comfortable in conversation.',
      'A wide mouth. Read as generous and outgoing, traditionally linked to good fortune in relationships.',
      'Notably wide. Read as expressive and warm, the person who carries the conversation.',
    ],
    chin: [
      'A narrow jawline. Read as delicate and sensitive, with a refined quality.',
      'Slightly narrow. Read as gentle, with an unforced kind of presence.',
      'Moderate width. Read as balanced — neither soft nor severe.',
      'Slightly broad. Read as steady and reliable, someone who follows through.',
      'A broad jawline. Read as determined and grounded, traditionally linked to persistence.',
      'A strong, wide jaw. Read as resolute — the classic mark of someone who finishes what they start.',
    ],
  },
};

export const FACE_READING_OVERALL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Taken together, the proportions read as balanced — no single feature dominates, which traditionally suggests someone who adapts well.',
    'The features complement each other, giving an impression of steadiness. Traditional reading links this to relationships that last.',
    'There is contrast between the features here, which is read as range: different sides showing in different situations.',
    'The overall arrangement reads as composed. Traditionally associated with people who are trusted with responsibility.',
    'Distinctive proportions with clear character. Read as someone who leaves a definite impression rather than blending in.',
    'A harmonious arrangement overall — the kind of face traditional reading calls fortunate simply for being at ease with itself.',
  ],
};

export const FACE_READING_LUCK_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Today favours saying the thing you have been holding back.',
    'A good day for the conversation you have been putting off.',
    'Money matters go better with a second look today than a quick decision.',
    'Today rewards listening more than speaking.',
    'A small kindness today comes back sooner than you expect.',
    'Today is better for finishing than for starting.',
    'Someone will be glad you reached out first today.',
    'Trust the first instinct today; the second-guessing is what costs you.',
  ],
};

/* ── 퍼스널컬러 ──
   12개 세부 타입 이름은 한국어판이 이미 영어 차용어(웜 스프링 등)라 영어는
   그대로 옮기면 되고, 중국어는 중화권에서 통용되는 표현을 쓴다.
   팔레트 색은 계산으로 생성되므로 색 이름만 번역한다. */
export type SubtypeKeyIntl =
  | 'warmSpring' | 'trueSpring' | 'lightSpring'
  | 'softSummer' | 'trueSummer' | 'lightSummer'
  | 'deepAutumn' | 'trueAutumn' | 'softAutumn'
  | 'deepWinter' | 'trueWinter' | 'brightWinter';

export const SUBTYPE_LABELS_INTL: Record<SnapIntlLang, Record<SubtypeKeyIntl, { label: string; vibe: string }>> = {
  en: {
    warmSpring:   { label: 'Warm Spring',   vibe: 'clear, bright warm tones' },
    trueSpring:   { label: 'True Spring',   vibe: 'fresh, lively warm tones' },
    lightSpring:  { label: 'Light Spring',  vibe: 'light, clear warm tones' },
    softSummer:   { label: 'Soft Summer',   vibe: 'muted, gentle cool tones' },
    trueSummer:   { label: 'True Summer',   vibe: 'soft, elegant cool tones' },
    lightSummer:  { label: 'Light Summer',  vibe: 'light, delicate cool tones' },
    deepAutumn:   { label: 'Deep Autumn',   vibe: 'rich, deep warm tones' },
    trueAutumn:   { label: 'True Autumn',   vibe: 'earthy, refined warm tones' },
    softAutumn:   { label: 'Soft Autumn',   vibe: 'soft, muted warm tones' },
    deepWinter:   { label: 'Deep Winter',   vibe: 'strong, deep cool tones' },
    trueWinter:   { label: 'True Winter',   vibe: 'clear, sharp cool tones' },
    brightWinter: { label: 'Bright Winter', vibe: 'bright, vivid cool tones' },
  },
};

/** 계절별 앵커 색 이름 — hex는 한국어 lib이 계산해 주므로 이름만 옮긴다 */
export const SWATCH_NAMES_INTL: Record<SnapIntlLang, Record<string, string>> = {
  en: {
    '코랄': 'Coral', '피치핑크': 'Peach pink', '아이보리': 'Ivory', '라이트카멜': 'Light camel',
    '선노랑': 'Sun yellow', '라임그린': 'Lime green',
    '머스타드': 'Mustard', '테라코타': 'Terracotta', '카키': 'Khaki', '브라운': 'Brown',
    '올리브': 'Olive', '러스트오렌지': 'Rust orange',
    '라벤더': 'Lavender', '로즈핑크': 'Rose pink', '파우더블루': 'Powder blue',
    '소프트그레이': 'Soft grey', '더스티로즈': 'Dusty rose', '라일락': 'Lilac',
    '로열블루': 'Royal blue', '퓨어화이트': 'Pure white', '버건디': 'Burgundy',
    '차콜': 'Charcoal', '푸시아': 'Fuchsia', '에메랄드': 'Emerald',
  },
};

export const PERSONAL_COLOR_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Your skin reads warm and clear, so saturated warm colours — coral, warm peach, sunny yellow — lift the face rather than washing it out. Strong colour suits you.',
    'A warm, lively reading. Yellow-based colours brighten the impression noticeably, while very dark or dulled shades tend to flatten it.',
    'Warm and light. Clear peach and soft apricot bring out colour in the face; heavy dark tones can overwhelm it.',
    'A cool, muted reading. Soft greyed colours — dusty rose, soft grey, muted blue — sit beautifully, while very bright shades compete with the face.',
    'Cool and soft. Lavender, rose pink and powder blue give an elegant, calm impression that suits you particularly well.',
    'Cool and light. Delicate pale tones suit you; heavy saturated colour tends to sit heavily against the skin.',
    'Warm and deep. Rich, grounded colours — brown, olive, rust — carry real weight on you, and pale washed-out shades read as thin.',
    'Warm and earthy. Mustard, terracotta and khaki give a refined, settled impression that lighter palettes cannot match.',
    'Warm and softly muted. Gentle earth tones suit you, with strong contrast being the thing to use sparingly.',
    'Cool and deep. Strong dark colours — charcoal, burgundy, royal blue — hold up against your colouring where softer shades disappear.',
    'Cool and clear. High-contrast combinations, true white and sharp blue give a striking, defined impression.',
    'Cool and bright. Vivid clear colours — fuchsia, emerald, pure white — read as sharp and modern on you.',
  ],
};

export const PERSONAL_COLOR_TIP_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Changing only the lip colour is often enough to shift the whole impression. Use a lead colour from your palette.',
    'Match the metal in your accessories — gold for warm, silver for cool. The difference in how the skin reads is real.',
    'For something important, put one strong palette colour near the face rather than lower down.',
    'The colours to avoid are worth moving to the back of the wardrobe rather than throwing out.',
    'If you are being photographed, place a light palette colour near your face — it usually brightens the result.',
    'Colour analysis is a guide, not a rule. If you love a colour outside the palette, wear it away from the face.',
    'Lighting changes the reading. Try the same test in daylight and under indoor light and compare.',
    'The palette matters most for what touches your face — tops, scarves, collars. Trousers barely register.',
  ],
};

/* ── 커플 관상 궁합 ──
   두 얼굴의 인상 벡터가 얼마나 닮았는지를 거리로 점수화한다.
   "닮은 커플이 잘 어울린다"는 속설을 재미로 푼 것이고, 무작위가 아니라
   두 얼굴의 실측값 차이에 기반한다. */
export const COUPLE_LABELS_INTL: Record<SnapIntlLang, Record<string, string>> = {
  en: {
    faceShape: 'Face shape', eyeTilt: 'Eye tilt', eyeWidth: 'Eye size',
    jawWidth: 'Jawline', noseWidth: 'Nose', mouthWidth: 'Mouth',
  },
};

export const COUPLE_POOL_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'Strikingly similar impressions. The kind of pair that looks settled together from the first meeting and does not tire on a long look.',
    'A harmonious match. People probably tell you the two of you suit each other.',
    'Similar but not identical — a balance where the differences fill each other in.',
    'Two distinct personalities. The chemistry here comes from the contrast rather than the overlap.',
    'An unusual, characterful combination. Not like anyone else, which is rather the point.',
  ],
};

export const COUPLE_COMMENT_INTL: Record<SnapIntlLang, string[]> = {
  en: [
    'They say couples who look alike last. Look at each other’s faces more, and smile.',
    'Try taking a selfie from the same angle today — the result is usually funny.',
    'Couples are said to grow more alike in expression the longer they are together.',
    'Where you differ is often exactly why it stays interesting.',
    'Worth taking one photo today that is just the two of you.',
    'The thing that makes couples suit each other is less looking alike than wanting to.',
    'The more photos you take together, the more the memories and the faces converge.',
    'Take a minute today to each name one thing you find appealing about the other.',
  ],
};

export const COUPLE_UI: Record<SnapIntlLang, {
  title: string; lead: string; privacy: string;
  photoA: string; photoB: string; pickBoth: string;
  score: string; breakdown: string; comment: string;
  disclaimer: string; reset: string; noFace: string;
}> = {
  en: {
    title: 'Couple Face Match',
    lead: 'Two photos, six measured proportions, one similarity score',
    privacy: 'Both photos are measured in your browser and neither is uploaded. The score is the distance between two sets of real measurements — the idea that similar-looking couples suit each other is folklore, not a finding.',
    photoA: 'First photo', photoB: 'Second photo',
    pickBoth: 'Add both photos to see the result',
    score: 'Match score', breakdown: 'By feature', comment: '💡 Today',
    disclaimer: 'The proportions are genuinely measured; reading compatibility from them is entertainment.',
    reset: '🔄 Start over',
    noFace: 'No clear face was found in that photo. Try one in good light, facing the camera.',
  },
};
