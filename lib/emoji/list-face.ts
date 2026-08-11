/**
 * 얼굴 120개와 손·몸 80개 — 이모지 글자와 공식 이름, 사람들이 치는 이름만 적는다.
 *
 * 이모지는 그림이라 언어를 가리지 않는다. 🙏는 어느 나라에서 보내도 같은 U+1F64F이고,
 * 옮길 것은 "그래서 무슨 뜻으로 보내는가" 한 문장뿐이다 — 그 열 언어는 desc-face.ts에
 * 있다. /cmd가 명령 이름을, /http가 상태 코드를 그렇게 다룬다.
 *
 * ── 공식 이름은 답이 아니다 ──────────────────────────────
 * unicodeName은 유니코드가 붙인 영어 이름이고, 사람들이 그 뜻으로 보내지 않는다.
 * 💀는 skull이지만 죽음이 아니라 웃겨 죽는다는 뜻이고, 😭는 loudly crying face이지만
 * 대개 기뻐서 보내며, 😤는 face with steam from nose지만 원래는 득의양양이다.
 * 그래서 이 파일에는 공식 이름(unicodeName)과 사람들이 치는 이름(common)을 나란히 둔다 —
 * 둘이 어긋나는 자리가 이 페이지에서 가장 도움이 되는 곳이다.
 *
 * ── 글자와 코드포인트 ────────────────────────────────────
 * char는 이모지 글자 그대로이고 code는 그 글자의 코드포인트다. 둘 다 유니코드가 배포하는
 * emoji-test.txt(15.1)의 fully-qualified 줄에서 그대로 옮겨 왔다. ☹️·☠️·✌️·☝️·✍️·🖐️·👁️
 * 일곱은 뒤에 U+FE0F가 붙어야 그림으로 나오고, 없으면 흑백 글자로 떨어진다 — 그 일곱은
 * 설명에도 그 말을 적었다. 피부색을 바꾸는 U+1F3FB~U+1F3FF는 싣지 않는다.
 *
 * slug는 주소에 쓰는 열쇠다. 이모지는 URL에 넣을 수 없으니 슬러그가 유일한 주소이고,
 * 공식 이름이 아니라 사람들이 치는 말에서 만든다 — 🥺는 pleading-face가 아니라 pleading,
 * 🤣는 rolling-on-the-floor-laughing이 아니라 rofl이다.
 *
 * 갈래는 둘이다 — face(얼굴)·hand(손과 몸).
 */
import type { EmojiItem, EmojiGroup } from './types.ts';

/** 적는 순서 — slug, 글자, 갈래, 코드포인트, 공식 이름, 사람들이 치는 이름, 같이 볼 것 */
const e = (
  slug: string,
  char: string,
  group: EmojiGroup,
  code: string,
  unicodeName: string,
  common: string,
  see?: string[],
): EmojiItem => ({
  slug,
  char,
  group,
  unicodeName,
  code,
  common,
  ...(see ? { see } : {}),
});

export const EM_FACE: EmojiItem[] = [
  /* ───────── face — 웃는 얼굴 ───────── */
  e('grinning', '😀', 'face', 'U+1F600', 'grinning face', 'big grin', ['beaming', 'slight-smile']),
  e('grinning-big-eyes', '😃', 'face', 'U+1F603', 'grinning face with big eyes', 'big smile', ['grinning', 'grinning-smiling-eyes']),
  e('grinning-smiling-eyes', '😄', 'face', 'U+1F604', 'grinning face with smiling eyes', 'happy grin', ['grinning-big-eyes', 'smiling-eyes']),
  e('beaming', '😁', 'face', 'U+1F601', 'beaming face with smiling eyes', 'beaming smile', ['grinning', 'grimace']),
  e('squinting-laugh', '😆', 'face', 'U+1F606', 'grinning squinting face', 'laughing squint', ['tears-of-joy', 'rofl']),
  e('sweat-smile', '😅', 'face', 'U+1F605', 'grinning face with sweat', 'sweat smile', ['downcast-sweat', 'grimace']),
  e('rofl', '🤣', 'face', 'U+1F923', 'rolling on the floor laughing', 'rofl', ['tears-of-joy', 'skull']),
  e('tears-of-joy', '😂', 'face', 'U+1F602', 'face with tears of joy', 'laughing emoji', ['rofl', 'skull', 'loudly-crying']),
  e('slight-smile', '🙂', 'face', 'U+1F642', 'slightly smiling face', 'slight smile', ['upside-down', 'neutral']),
  e('upside-down', '🙃', 'face', 'U+1F643', 'upside-down face', 'upside-down smile', ['slight-smile', 'melting']),
  e('wink', '😉', 'face', 'U+1F609', 'winking face', 'wink', ['smirk', 'wink-tongue']),
  e('smiling-eyes', '😊', 'face', 'U+1F60A', 'smiling face with smiling eyes', 'warm smile', ['slight-smile', 'relieved']),
  e('halo', '😇', 'face', 'U+1F607', 'smiling face with halo', 'angel', ['smiling-devil', 'smiling-eyes']),
  e('hearts-smile', '🥰', 'face', 'U+1F970', 'smiling face with hearts', 'in love', ['heart-eyes', 'star-struck']),
  e('heart-eyes', '😍', 'face', 'U+1F60D', 'smiling face with heart-eyes', 'heart eyes', ['hearts-smile', 'heart-eyes-cat']),
  e('star-struck', '🤩', 'face', 'U+1F929', 'star-struck', 'star eyes', ['heart-eyes', 'partying']),

  /* ───────── face — 사랑과 입맞춤 ───────── */
  e('blowing-kiss', '😘', 'face', 'U+1F618', 'face blowing a kiss', 'kiss', ['kissing', 'kiss-mark']),
  e('kissing', '😗', 'face', 'U+1F617', 'kissing face', 'plain kiss', ['blowing-kiss', 'kissing-closed-eyes']),
  e('kissing-closed-eyes', '😚', 'face', 'U+1F61A', 'kissing face with closed eyes', 'kiss with closed eyes', ['kissing', 'kissing-smiling-eyes']),
  e('kissing-smiling-eyes', '😙', 'face', 'U+1F619', 'kissing face with smiling eyes', 'kiss with smiling eyes', ['kissing-closed-eyes', 'blowing-kiss']),
  e('smile-with-tear', '🥲', 'face', 'U+1F972', 'smiling face with tear', 'smiling tear', ['holding-back-tears', 'crying']),

  /* ───────── face — 장난과 혀 ───────── */
  e('yum', '😋', 'face', 'U+1F60B', 'face savoring food', 'yum', ['drooling', 'tongue-out']),
  e('tongue-out', '😛', 'face', 'U+1F61B', 'face with tongue', 'tongue out', ['wink-tongue', 'squinting-tongue']),
  e('wink-tongue', '😜', 'face', 'U+1F61C', 'winking face with tongue', 'playful wink', ['tongue-out', 'zany']),
  e('zany', '🤪', 'face', 'U+1F92A', 'zany face', 'goofy', ['wink-tongue', 'woozy']),
  e('squinting-tongue', '😝', 'face', 'U+1F61D', 'squinting face with tongue', 'silly tongue', ['tongue-out', 'zany']),
  e('money-mouth', '🤑', 'face', 'U+1F911', 'money-mouth face', 'money face', ['star-struck', 'smirk']),
  e('hugging', '🤗', 'face', 'U+1F917', 'smiling face with open hands', 'hug', ['open-hands', 'heart-hands']),
  e('hand-over-mouth', '🤭', 'face', 'U+1F92D', 'face with hand over mouth', 'oops giggle', ['gasp-hand-over-mouth', 'shushing']),
  e('shushing', '🤫', 'face', 'U+1F92B', 'shushing face', 'shh', ['zipper-mouth', 'hand-over-mouth']),

  /* ───────── face — 생각과 무표정 ───────── */
  e('thinking', '🤔', 'face', 'U+1F914', 'thinking face', 'thinking', ['raised-eyebrow', 'monocle']),
  e('zipper-mouth', '🤐', 'face', 'U+1F910', 'zipper-mouth face', 'zipped lips', ['shushing', 'no-mouth']),
  e('raised-eyebrow', '🤨', 'face', 'U+1F928', 'face with raised eyebrow', 'raised eyebrow', ['thinking', 'monocle']),
  e('neutral', '😐', 'face', 'U+1F610', 'neutral face', 'straight face', ['expressionless', 'diagonal-mouth']),
  e('expressionless', '😑', 'face', 'U+1F611', 'expressionless face', 'expressionless', ['neutral', 'unamused']),
  e('no-mouth', '😶', 'face', 'U+1F636', 'face without mouth', 'speechless', ['dotted-line', 'zipper-mouth']),

  /* ───────── face — 시들함과 눈흘김 ───────── */
  e('smirk', '😏', 'face', 'U+1F60F', 'smirking face', 'smirk', ['wink', 'wry-cat']),
  e('unamused', '😒', 'face', 'U+1F612', 'unamused face', 'unamused', ['eye-roll', 'expressionless']),
  e('eye-roll', '🙄', 'face', 'U+1F644', 'face with rolling eyes', 'eye roll', ['unamused', 'yawning']),
  e('grimace', '😬', 'face', 'U+1F62C', 'grimacing face', 'grimace', ['sweat-smile', 'flushed']),
  e('lying', '🤥', 'face', 'U+1F925', 'lying face', 'liar', ['crossed-fingers', 'clown']),
  e('relieved', '😌', 'face', 'U+1F60C', 'relieved face', 'relieved', ['smiling-eyes', 'pensive']),
  e('pensive', '😔', 'face', 'U+1F614', 'pensive face', 'sad pensive', ['disappointed', 'crying']),

  /* ───────── face — 졸음과 앓이 ───────── */
  e('sleepy', '😪', 'face', 'U+1F62A', 'sleepy face', 'sleepy', ['sleeping', 'yawning']),
  e('drooling', '🤤', 'face', 'U+1F924', 'drooling face', 'drooling', ['yum', 'heart-eyes']),
  e('sleeping', '😴', 'face', 'U+1F634', 'sleeping face', 'sleeping', ['sleepy', 'yawning']),
  e('mask', '😷', 'face', 'U+1F637', 'face with medical mask', 'face mask', ['thermometer-face', 'sneezing']),
  e('thermometer-face', '🤒', 'face', 'U+1F912', 'face with thermometer', 'sick', ['mask', 'head-bandage']),
  e('head-bandage', '🤕', 'face', 'U+1F915', 'face with head-bandage', 'injured', ['thermometer-face', 'drop-of-blood']),
  e('nauseated', '🤢', 'face', 'U+1F922', 'nauseated face', 'gross', ['vomiting', 'poop']),
  e('vomiting', '🤮', 'face', 'U+1F92E', 'face vomiting', 'vomit', ['nauseated', 'woozy']),
  e('sneezing', '🤧', 'face', 'U+1F927', 'sneezing face', 'sneeze', ['mask', 'thermometer-face']),
  e('hot-face', '🥵', 'face', 'U+1F975', 'hot face', 'overheated', ['cold-face', 'melting']),
  e('cold-face', '🥶', 'face', 'U+1F976', 'cold face', 'freezing', ['hot-face', 'crossed-out-eyes']),
  e('woozy', '🥴', 'face', 'U+1F974', 'woozy face', 'woozy', ['zany', 'crossed-out-eyes']),
  e('crossed-out-eyes', '😵', 'face', 'U+1F635', 'face with crossed-out eyes', 'dead x eyes', ['exploding-head', 'skull']),
  e('exploding-head', '🤯', 'face', 'U+1F92F', 'exploding head', 'mind blown', ['crossed-out-eyes', 'astonished']),
  e('cowboy', '🤠', 'face', 'U+1F920', 'cowboy hat face', 'cowboy', ['partying', 'sunglasses']),
  e('partying', '🥳', 'face', 'U+1F973', 'partying face', 'party face', ['star-struck', 'raising-hands']),
  e('disguised', '🥸', 'face', 'U+1F978', 'disguised face', 'disguise', ['monocle', 'nerd']),
  e('sunglasses', '😎', 'face', 'U+1F60E', 'smiling face with sunglasses', 'cool', ['cowboy', 'smirk']),
  e('nerd', '🤓', 'face', 'U+1F913', 'nerd face', 'nerd', ['monocle', 'disguised']),
  e('monocle', '🧐', 'face', 'U+1F9D0', 'face with monocle', 'monocle', ['nerd', 'thinking']),

  /* ───────── face — 걱정과 놀람 ───────── */
  e('confused', '😕', 'face', 'U+1F615', 'confused face', 'confused', ['diagonal-mouth', 'worried']),
  e('diagonal-mouth', '🫤', 'face', 'U+1FAE4', 'face with diagonal mouth', 'meh', ['confused', 'neutral']),
  e('worried', '😟', 'face', 'U+1F61F', 'worried face', 'worried', ['confused', 'anxious-sweat']),
  e('slight-frown', '🙁', 'face', 'U+1F641', 'slightly frowning face', 'slight frown', ['frowning', 'disappointed']),
  e('frowning', '☹️', 'face', 'U+2639 U+FE0F', 'frowning face', 'frown', ['slight-frown', 'pensive']),
  e('open-mouth', '😮', 'face', 'U+1F62E', 'face with open mouth', 'wow open mouth', ['astonished', 'hushed']),
  e('hushed', '😯', 'face', 'U+1F62F', 'hushed face', 'hushed', ['open-mouth', 'astonished']),
  e('astonished', '😲', 'face', 'U+1F632', 'astonished face', 'shocked', ['open-mouth', 'exploding-head']),
  e('flushed', '😳', 'face', 'U+1F633', 'flushed face', 'flushed', ['pleading', 'peeking-eye']),
  e('pleading', '🥺', 'face', 'U+1F97A', 'pleading face', 'puppy eyes', ['flushed', 'holding-back-tears']),
  e('frowning-open-mouth', '😦', 'face', 'U+1F626', 'frowning face with open mouth', 'frowning gasp', ['anguished', 'fearful']),
  e('anguished', '😧', 'face', 'U+1F627', 'anguished face', 'anguished', ['frowning-open-mouth', 'weary']),
  e('fearful', '😨', 'face', 'U+1F628', 'fearful face', 'scared', ['screaming', 'anxious-sweat']),
  e('anxious-sweat', '😰', 'face', 'U+1F630', 'anxious face with sweat', 'anxious', ['fearful', 'downcast-sweat']),
  e('sad-relieved', '😥', 'face', 'U+1F625', 'sad but relieved face', 'disappointed relieved', ['downcast-sweat', 'pensive']),

  /* ───────── face — 울음과 지침 ───────── */
  e('crying', '😢', 'face', 'U+1F622', 'crying face', 'crying', ['loudly-crying', 'pensive']),
  e('loudly-crying', '😭', 'face', 'U+1F62D', 'loudly crying face', 'sobbing', ['crying', 'tears-of-joy', 'holding-back-tears']),
  e('screaming', '😱', 'face', 'U+1F631', 'face screaming in fear', 'screaming', ['fearful', 'exploding-head']),
  e('confounded', '😖', 'face', 'U+1F616', 'confounded face', 'confounded', ['persevering', 'weary']),
  e('persevering', '😣', 'face', 'U+1F623', 'persevering face', 'struggling', ['confounded', 'tired']),
  e('disappointed', '😞', 'face', 'U+1F61E', 'disappointed face', 'disappointed', ['pensive', 'slight-frown']),
  e('downcast-sweat', '😓', 'face', 'U+1F613', 'downcast face with sweat', 'cold sweat', ['sweat-smile', 'anxious-sweat']),
  e('weary', '😩', 'face', 'U+1F629', 'weary face', 'weary', ['tired', 'loudly-crying']),
  e('tired', '😫', 'face', 'U+1F62B', 'tired face', 'tired', ['weary', 'yawning']),
  e('yawning', '🥱', 'face', 'U+1F971', 'yawning face', 'yawn', ['sleepy', 'unamused']),

  /* ───────── face — 화 ───────── */
  e('steam-from-nose', '😤', 'face', 'U+1F624', 'face with steam from nose', 'triumph huff', ['enraged', 'flexed-biceps']),
  e('enraged', '😡', 'face', 'U+1F621', 'enraged face', 'red angry', ['angry', 'symbols-on-mouth']),
  e('angry', '😠', 'face', 'U+1F620', 'angry face', 'angry', ['enraged', 'steam-from-nose']),
  e('symbols-on-mouth', '🤬', 'face', 'U+1F92C', 'face with symbols on mouth', 'cursing', ['enraged', 'middle-finger']),
  e('smiling-devil', '😈', 'face', 'U+1F608', 'smiling face with horns', 'devil smile', ['angry-devil', 'halo']),
  e('angry-devil', '👿', 'face', 'U+1F47F', 'angry face with horns', 'angry devil', ['smiling-devil', 'ogre']),

  /* ───────── face — 죽음과 괴물 ───────── */
  e('skull', '💀', 'face', 'U+1F480', 'skull', 'skull', ['rofl', 'skull-crossbones', 'bone']),
  e('skull-crossbones', '☠️', 'face', 'U+2620 U+FE0F', 'skull and crossbones', 'poison', ['skull', 'poop']),
  e('poop', '💩', 'face', 'U+1F4A9', 'pile of poo', 'poop', ['clown', 'nauseated']),
  e('clown', '🤡', 'face', 'U+1F921', 'clown face', 'clown', ['poop', 'lying']),
  e('ogre', '👹', 'face', 'U+1F479', 'ogre', 'oni demon', ['goblin', 'angry-devil']),
  e('goblin', '👺', 'face', 'U+1F47A', 'goblin', 'tengu mask', ['ogre', 'ghost']),
  e('ghost', '👻', 'face', 'U+1F47B', 'ghost', 'ghost', ['skull', 'alien']),
  e('alien', '👽', 'face', 'U+1F47D', 'alien', 'alien', ['alien-monster', 'robot']),
  e('alien-monster', '👾', 'face', 'U+1F47E', 'alien monster', 'space invader', ['alien', 'robot']),
  e('robot', '🤖', 'face', 'U+1F916', 'robot', 'bot', ['alien-monster', 'brain']),

  /* ───────── face — 고양이 얼굴 ───────── */
  e('grinning-cat', '😺', 'face', 'U+1F63A', 'grinning cat', 'smiling cat', ['grinning-cat-smiling-eyes', 'grinning']),
  e('grinning-cat-smiling-eyes', '😸', 'face', 'U+1F638', 'grinning cat with smiling eyes', 'happy cat', ['grinning-cat', 'beaming']),
  e('cat-tears-of-joy', '😹', 'face', 'U+1F639', 'cat with tears of joy', 'laughing cat', ['tears-of-joy', 'grinning-cat']),
  e('heart-eyes-cat', '😻', 'face', 'U+1F63B', 'smiling cat with heart-eyes', 'cat heart eyes', ['heart-eyes', 'grinning-cat']),
  e('wry-cat', '😼', 'face', 'U+1F63C', 'cat with wry smile', 'smirking cat', ['smirk', 'grinning-cat']),
  e('kissing-cat', '😽', 'face', 'U+1F63D', 'kissing cat', 'cat kiss', ['blowing-kiss', 'grinning-cat']),
  e('weary-cat', '🙀', 'face', 'U+1F640', 'weary cat', 'shocked cat', ['screaming', 'crying-cat']),
  e('crying-cat', '😿', 'face', 'U+1F63F', 'crying cat', 'sad cat', ['crying', 'weary-cat']),
  e('pouting-cat', '😾', 'face', 'U+1F63E', 'pouting cat', 'angry cat', ['angry', 'crying-cat']),

  /* ───────── face — 새로 들어온 얼굴(2021년 뒤) ───────── */
  e('melting', '🫠', 'face', 'U+1FAE0', 'melting face', 'melting face', ['hot-face', 'upside-down']),
  e('saluting', '🫡', 'face', 'U+1FAE1', 'saluting face', 'salute', ['thumbs-up', 'index-up']),
  e('dotted-line', '🫥', 'face', 'U+1FAE5', 'dotted line face', 'invisible face', ['no-mouth', 'ghost']),
  e('shaking', '🫨', 'face', 'U+1FAE8', 'shaking face', 'shook', ['exploding-head', 'astonished']),
  e('holding-back-tears', '🥹', 'face', 'U+1F979', 'face holding back tears', 'holding back tears', ['pleading', 'smile-with-tear']),
  e('peeking-eye', '🫣', 'face', 'U+1FAE3', 'face with peeking eye', 'peeking', ['flushed', 'eyes']),
  e('gasp-hand-over-mouth', '🫢', 'face', 'U+1FAE2', 'face with open eyes and hand over mouth', 'gasp', ['hand-over-mouth', 'astonished']),

  /* ───────── hand — 손바닥과 인사 ───────── */
  e('waving-hand', '👋', 'hand', 'U+1F44B', 'waving hand', 'wave', ['raised-hand', 'raised-back-of-hand']),
  e('raised-back-of-hand', '🤚', 'hand', 'U+1F91A', 'raised back of hand', 'back of hand', ['raised-hand', 'waving-hand']),
  e('fingers-splayed', '🖐️', 'hand', 'U+1F590 U+FE0F', 'hand with fingers splayed', 'open palm five fingers', ['raised-hand', 'raised-back-of-hand']),
  e('raised-hand', '✋', 'hand', 'U+270B', 'raised hand', 'high five', ['fingers-splayed', 'waving-hand']),
  e('vulcan-salute', '🖖', 'hand', 'U+1F596', 'vulcan salute', 'live long and prosper', ['fingers-splayed', 'saluting']),

  /* ───────── hand — 손가락으로 만드는 모양 ───────── */
  e('ok-hand', '👌', 'hand', 'U+1F44C', 'OK hand', 'ok hand', ['gesturing-ok', 'thumbs-up']),
  e('pinched-fingers', '🤌', 'hand', 'U+1F90C', 'pinched fingers', 'italian hand', ['pinching-hand', 'palms-up']),
  e('pinching-hand', '🤏', 'hand', 'U+1F90F', 'pinching hand', 'small amount', ['pinched-fingers', 'ok-hand']),
  e('victory-hand', '✌️', 'hand', 'U+270C U+FE0F', 'victory hand', 'peace sign', ['crossed-fingers', 'horns']),
  e('crossed-fingers', '🤞', 'hand', 'U+1F91E', 'crossed fingers', 'fingers crossed', ['victory-hand', 'folded-hands']),
  e('finger-heart', '🫰', 'hand', 'U+1FAF0', 'hand with index finger and thumb crossed', 'finger heart', ['heart-hands', 'love-you-gesture']),
  e('love-you-gesture', '🤟', 'hand', 'U+1F91F', 'love-you gesture', 'i love you sign', ['horns', 'call-me-hand']),
  e('horns', '🤘', 'hand', 'U+1F918', 'sign of the horns', 'rock on', ['love-you-gesture', 'call-me-hand']),
  e('call-me-hand', '🤙', 'hand', 'U+1F919', 'call me hand', 'shaka', ['horns', 'waving-hand']),

  /* ───────── hand — 가리키기 ───────── */
  e('point-left', '👈', 'hand', 'U+1F448', 'backhand index pointing left', 'pointing left', ['point-right', 'point-up']),
  e('point-right', '👉', 'hand', 'U+1F449', 'backhand index pointing right', 'pointing right', ['point-left', 'point-at-viewer']),
  e('point-up', '👆', 'hand', 'U+1F446', 'backhand index pointing up', 'pointing up', ['point-down', 'index-up']),
  e('middle-finger', '🖕', 'hand', 'U+1F595', 'middle finger', 'middle finger', ['symbols-on-mouth', 'thumbs-down']),
  e('point-down', '👇', 'hand', 'U+1F447', 'backhand index pointing down', 'pointing down', ['point-up', 'point-right']),
  e('index-up', '☝️', 'hand', 'U+261D U+FE0F', 'index pointing up', 'index finger up', ['point-up', 'saluting']),
  e('point-at-viewer', '🫵', 'hand', 'U+1FAF5', 'index pointing at the viewer', 'pointing at you', ['point-right', 'index-up']),

  /* ───────── hand — 엄지와 주먹 ───────── */
  e('thumbs-up', '👍', 'hand', 'U+1F44D', 'thumbs up', 'thumbs up', ['thumbs-down', 'ok-hand', 'saluting']),
  e('thumbs-down', '👎', 'hand', 'U+1F44E', 'thumbs down', 'thumbs down', ['thumbs-up', 'gesturing-no']),
  e('raised-fist', '✊', 'hand', 'U+270A', 'raised fist', 'fist up', ['fist-bump', 'left-fist']),
  e('fist-bump', '👊', 'hand', 'U+1F44A', 'oncoming fist', 'fist bump', ['raised-fist', 'left-fist']),
  e('left-fist', '🤛', 'hand', 'U+1F91B', 'left-facing fist', 'left facing fist', ['right-fist', 'fist-bump']),
  e('right-fist', '🤜', 'hand', 'U+1F91C', 'right-facing fist', 'right facing fist', ['left-fist', 'fist-bump']),

  /* ───────── hand — 두 손 ───────── */
  e('clapping', '👏', 'hand', 'U+1F44F', 'clapping hands', 'clap', ['raising-hands', 'flexed-biceps']),
  e('raising-hands', '🙌', 'hand', 'U+1F64C', 'raising hands', 'praise hands', ['clapping', 'folded-hands']),
  e('heart-hands', '🫶', 'hand', 'U+1FAF6', 'heart hands', 'heart hands', ['finger-heart', 'hugging']),
  e('open-hands', '👐', 'hand', 'U+1F450', 'open hands', 'open hands', ['palms-up', 'hugging']),
  e('palms-up', '🤲', 'hand', 'U+1F932', 'palms up together', 'cupped hands', ['open-hands', 'folded-hands']),
  e('handshake', '🤝', 'hand', 'U+1F91D', 'handshake', 'handshake', ['rightwards-hand', 'leftwards-hand']),
  e('folded-hands', '🙏', 'hand', 'U+1F64F', 'folded hands', 'prayer hands', ['palms-up', 'bowing', 'raising-hands']),

  /* ───────── hand — 손이 하는 일 ───────── */
  e('writing-hand', '✍️', 'hand', 'U+270D U+FE0F', 'writing hand', 'writing', ['point-down', 'brain']),
  e('nail-polish', '💅', 'hand', 'U+1F485', 'nail polish', 'nails done', ['smirk', 'sunglasses']),
  e('selfie', '🤳', 'hand', 'U+1F933', 'selfie', 'selfie', ['eyes', 'nail-polish']),
  e('flexed-biceps', '💪', 'hand', 'U+1F4AA', 'flexed biceps', 'muscle', ['mechanical-arm', 'clapping']),
  e('mechanical-arm', '🦾', 'hand', 'U+1F9BE', 'mechanical arm', 'robot arm', ['flexed-biceps', 'mechanical-leg']),

  /* ───────── hand — 팔다리와 발자국 ───────── */
  e('leg', '🦵', 'hand', 'U+1F9B5', 'leg', 'leg', ['foot', 'mechanical-leg']),
  e('mechanical-leg', '🦿', 'hand', 'U+1F9BF', 'mechanical leg', 'prosthetic leg', ['leg', 'mechanical-arm']),
  e('foot', '🦶', 'hand', 'U+1F9B6', 'foot', 'foot', ['leg', 'footprints']),
  e('footprints', '👣', 'hand', 'U+1F463', 'footprints', 'footprints', ['foot', 'leg']),

  /* ───────── hand — 몸과 장기 ───────── */
  e('ear', '👂', 'hand', 'U+1F442', 'ear', 'ear', ['ear-hearing-aid', 'deaf-person']),
  e('ear-hearing-aid', '🦻', 'hand', 'U+1F9BB', 'ear with hearing aid', 'hearing aid', ['ear', 'deaf-person']),
  e('nose', '👃', 'hand', 'U+1F443', 'nose', 'nose', ['ear', 'sneezing']),
  e('brain', '🧠', 'hand', 'U+1F9E0', 'brain', 'brain', ['anatomical-heart', 'exploding-head']),
  e('anatomical-heart', '🫀', 'hand', 'U+1FAC0', 'anatomical heart', 'real heart', ['lungs', 'brain']),
  e('lungs', '🫁', 'hand', 'U+1FAC1', 'lungs', 'lungs', ['anatomical-heart', 'nose']),
  e('tooth', '🦷', 'hand', 'U+1F9B7', 'tooth', 'tooth', ['bone', 'mouth']),
  e('bone', '🦴', 'hand', 'U+1F9B4', 'bone', 'bone', ['tooth', 'skull']),

  /* ───────── hand — 눈·입·피 ───────── */
  e('eyes', '👀', 'hand', 'U+1F440', 'eyes', 'eyes', ['eye', 'peeking-eye']),
  e('eye', '👁️', 'hand', 'U+1F441 U+FE0F', 'eye', 'single eye', ['eyes', 'mouth']),
  e('tongue', '👅', 'hand', 'U+1F445', 'tongue', 'tongue', ['mouth', 'yum']),
  e('mouth', '👄', 'hand', 'U+1F444', 'mouth', 'lips', ['kiss-mark', 'biting-lip']),
  e('biting-lip', '🫦', 'hand', 'U+1FAE6', 'biting lip', 'lip bite', ['mouth', 'flushed']),
  e('kiss-mark', '💋', 'hand', 'U+1F48B', 'kiss mark', 'lipstick kiss', ['mouth', 'blowing-kiss']),
  e('drop-of-blood', '🩸', 'hand', 'U+1FA78', 'drop of blood', 'blood drop', ['head-bandage', 'anatomical-heart']),

  /* ───────── hand — 온몸으로 하는 손짓 ───────── */
  e('facepalm', '🤦', 'hand', 'U+1F926', 'person facepalming', 'facepalm', ['shrug', 'eye-roll']),
  e('shrug', '🤷', 'hand', 'U+1F937', 'person shrugging', 'shrug', ['facepalm', 'palms-up']),
  e('bowing', '🙇', 'hand', 'U+1F647', 'person bowing', 'bow', ['folded-hands', 'facepalm']),
  e('tipping-hand', '💁', 'hand', 'U+1F481', 'person tipping hand', 'sassy information desk', ['nail-polish', 'shrug']),
  e('raising-hand', '🙋', 'hand', 'U+1F64B', 'person raising hand', 'raising hand', ['raising-hands', 'point-at-viewer']),
  e('deaf-person', '🧏', 'hand', 'U+1F9CF', 'deaf person', 'deaf sign', ['ear-hearing-aid', 'ear']),
  e('gesturing-no', '🙅', 'hand', 'U+1F645', 'person gesturing NO', 'no gesture x arms', ['gesturing-ok', 'thumbs-down']),
  e('gesturing-ok', '🙆', 'hand', 'U+1F646', 'person gesturing OK', 'ok gesture arms', ['gesturing-no', 'ok-hand']),

  /* ───────── hand — 내미는 손(2022년 뒤) ───────── */
  e('rightwards-hand', '🫱', 'hand', 'U+1FAF1', 'rightwards hand', 'hand offered right', ['leftwards-hand', 'handshake']),
  e('leftwards-hand', '🫲', 'hand', 'U+1FAF2', 'leftwards hand', 'hand offered left', ['rightwards-hand', 'handshake']),
  e('palm-down', '🫳', 'hand', 'U+1FAF3', 'palm down hand', 'hand facing down', ['palm-up', 'pinching-hand']),
  e('palm-up', '🫴', 'hand', 'U+1FAF4', 'palm up hand', 'gimme', ['palm-down', 'palms-up']),

  /* ───────── hand — 사람과 나이 ───────── */
  e('baby', '👶', 'hand', 'U+1F476', 'baby', 'baby', ['child', 'boy']),
  e('child', '🧒', 'hand', 'U+1F9D2', 'child', 'child', ['baby', 'person']),
  e('boy', '👦', 'hand', 'U+1F466', 'boy', 'boy', ['girl', 'child']),
  e('girl', '👧', 'hand', 'U+1F467', 'girl', 'girl', ['boy', 'child']),
  e('person', '🧑', 'hand', 'U+1F9D1', 'person', 'person', ['man', 'woman']),
  e('man', '👨', 'hand', 'U+1F468', 'man', 'man', ['woman', 'person']),
  e('woman', '👩', 'hand', 'U+1F469', 'woman', 'woman', ['man', 'person']),
  e('older-person', '🧓', 'hand', 'U+1F9D3', 'older person', 'older person', ['old-man', 'old-woman']),
  e('old-man', '👴', 'hand', 'U+1F474', 'old man', 'old man', ['old-woman', 'older-person']),
  e('old-woman', '👵', 'hand', 'U+1F475', 'old woman', 'old woman', ['old-man', 'older-person']),
];
