/**
 * 놀이와 장소 이모지 132개 — 운동·놀이·소리·상, 그리고 타는 것·건물·풍경.
 *
 * 여기도 글자와 코드포인트, 이름만 적는다. ⛩️는 어느 자판에서 쳐도 ⛩️이고
 * U+26E9 U+FE0F라서 옮길 것이 없다 — 열 언어로 쓸 한 문장은 desc-place.ts에 있다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 공식 이름이나 첫인상과 실제 쓰임이 어긋나는 것만 싣는다. 🎪의 공식 이름은
 * circus tent이지만 사람들이 보내는 뜻은 난장판이고, 🏩은 hospital처럼 보이지만
 * 러브호텔이다. 🚀는 로켓이 아니라 값이 오른다는 말로 훨씬 많이 쓰인다.
 *
 * 뺀 것도 규칙이 있다 — 나라 깃발은 이 섹션 밖이고, 살색 수정자가 붙는 글자는
 * 붙지 않은 기본형만 둔다. ⚽·🏀·🏆·🥇·🎯·🎲·🎮·🎰·🎭·🎬·🎤·🎧·🎸는
 * 이미 list-thing.ts의 object 갈래에 있어 여기 다시 넣지 않았다 — 같은 글자가
 * 두 주소를 가지면 안 된다.
 *
 * ── 코드포인트를 적는 규칙 ────────────────────────────────
 * 기본이 글자 모양인 이모지는 U+FE0F를 붙여야 색이 나온다 — ⛩️·🕹️·🎗️·🏔️가
 * 그렇다. 붙이지 않은 ⛩와 붙인 ⛩️는 눈에는 같아 보여도 다른 문자열이라, 이것이
 * 검색과 문자열 비교를 조용히 어긋나게 한다. 붙는 것과 안 붙는 것을 그대로 적는다.
 *
 * 갈래는 둘이다 — activity(운동·놀이·소리·상·잔치)·place(타는 것·건물·풍경).
 */
import type { EmojiItem, EmojiGroup } from './types.ts';

const e = (
  slug: string,
  char: string,
  group: EmojiGroup,
  code: string,
  unicodeName: string,
  common: string,
  see?: string[],
): EmojiItem => ({ slug, char, group, code, unicodeName, common, ...(see ? { see } : {}) });

export const EM_PLACE: EmojiItem[] = [
  /* ───────── activity — 공을 쓰는 운동 ───────── */
  e('american-football', '🏈', 'activity', 'U+1F3C8', 'american football', 'football', ['rugby', 'soccer-ball']),
  e('baseball', '⚾', 'activity', 'U+26BE', 'baseball', 'baseball', ['soccer-ball', 'stadium']),
  e('tennis', '🎾', 'activity', 'U+1F3BE', 'tennis', 'tennis ball', ['ping-pong', 'badminton']),
  e('volleyball', '🏐', 'activity', 'U+1F3D0', 'volleyball', 'volleyball', ['beach', 'basketball']),
  e('rugby', '🏉', 'activity', 'U+1F3C9', 'rugby football', 'rugby ball', ['american-football']),
  e('ping-pong', '🏓', 'activity', 'U+1F3D3', 'ping pong', 'table tennis', ['tennis', 'badminton']),
  e('badminton', '🏸', 'activity', 'U+1F3F8', 'badminton', 'shuttlecock', ['ping-pong', 'tennis']),
  e('cricket', '🏏', 'activity', 'U+1F3CF', 'cricket game', 'cricket bat', ['baseball', 'stadium']),
  e('ice-hockey', '🏒', 'activity', 'U+1F3D2', 'ice hockey', 'hockey stick', ['ice-skate']),
  e('eight-ball', '🎱', 'activity', 'U+1F3B1', 'pool 8 ball', '8 ball', ['bowling', 'crystal-ball']),
  e('bowling', '🎳', 'activity', 'U+1F3B3', 'bowling', 'bowling', ['eight-ball']),

  /* ───────── activity — 몸으로 하는 운동 ───────── */
  e('boxing', '🥊', 'activity', 'U+1F94A', 'boxing glove', 'boxing glove', ['martial-arts', 'fist-bump']),
  e('martial-arts', '🥋', 'activity', 'U+1F94B', 'martial arts uniform', 'karate gi', ['boxing']),
  e('fencing', '🤺', 'activity', 'U+1F93A', 'person fencing', 'fencing', ['martial-arts']),
  e('archery', '🏹', 'activity', 'U+1F3F9', 'bow and arrow', 'archery', ['bullseye']),
  e('running-shirt', '🎽', 'activity', 'U+1F3BD', 'running shirt', 'race bib', ['sports-medal', 'finish-line']),
  e('climbing', '🧗', 'activity', 'U+1F9D7', 'person climbing', 'rock climbing', ['snowy-mountain']),
  e('surfing', '🏄', 'activity', 'U+1F3C4', 'person surfing', 'surfing', ['water-wave', 'beach']),
  e('diving-mask', '🤿', 'activity', 'U+1F93F', 'diving mask', 'scuba diving', ['surfing', 'desert-island']),
  e('golf', '⛳', 'activity', 'U+26F3', 'flag in hole', 'golf', ['finish-line', 'bullseye']),
  e('fishing', '🎣', 'activity', 'U+1F3A3', 'fishing pole', 'fishing', ['shark']),
  e('skiing', '🎿', 'activity', 'U+1F3BF', 'skis', 'skiing', ['snowboard', 'snowy-mountain']),
  e('snowboard', '🏂', 'activity', 'U+1F3C2', 'snowboarder', 'snowboarding', ['skiing', 'snowflake']),
  e('ice-skate', '⛸️', 'activity', 'U+26F8 U+FE0F', 'ice skate', 'figure skating', ['ice-hockey', 'roller-skate']),
  e('roller-skate', '🛼', 'activity', 'U+1F6FC', 'roller skate', 'roller skating', ['ice-skate', 'skateboard']),
  e('skateboard', '🛹', 'activity', 'U+1F6F9', 'skateboard', 'skateboard', ['roller-skate', 'kick-scooter']),
  e('mountain-biking', '🚵', 'activity', 'U+1F6B5', 'person mountain biking', 'mountain biking', ['bicycle']),
  e('finish-line', '🏁', 'activity', 'U+1F3C1', 'chequered flag', 'finish line', ['running-shirt', 'trophy']),

  /* ───────── activity — 놀이와 장난감 ───────── */
  e('joystick', '🕹️', 'activity', 'U+1F579 U+FE0F', 'joystick', 'arcade joystick', ['video-game']),
  e('chess', '♟️', 'activity', 'U+265F U+FE0F', 'chess pawn', 'chess', ['game-die']),
  e('puzzle', '🧩', 'activity', 'U+1F9E9', 'puzzle piece', 'jigsaw piece', ['chess']),
  e('yo-yo', '🪀', 'activity', 'U+1FA80', 'yo-yo', 'yoyo', ['kite', 'teddy-bear']),
  e('kite', '🪁', 'activity', 'U+1FA81', 'kite', 'kite', ['yo-yo', 'dashing-away']),
  e('magic-wand', '🪄', 'activity', 'U+1FA84', 'magic wand', 'magic wand', ['sparkles', 'crystal-ball']),
  e('teddy-bear', '🧸', 'activity', 'U+1F9F8', 'teddy bear', 'teddy bear', ['bear', 'yo-yo']),
  e('pinata', '🪅', 'activity', 'U+1FA85', 'piñata', 'piñata', ['party-popper', 'balloon']),

  /* ───────── activity — 소리와 무대 ───────── */
  e('musical-note', '🎵', 'activity', 'U+1F3B5', 'musical note', 'music note', ['musical-notes', 'sheet-music']),
  e('musical-notes', '🎶', 'activity', 'U+1F3B6', 'musical notes', 'music notes', ['musical-note', 'headphone']),
  e('sheet-music', '🎼', 'activity', 'U+1F3BC', 'musical score', 'sheet music', ['musical-note', 'piano']),
  e('piano', '🎹', 'activity', 'U+1F3B9', 'musical keyboard', 'piano keys', ['sheet-music', 'saxophone']),
  e('trumpet', '🎺', 'activity', 'U+1F3BA', 'trumpet', 'trumpet', ['saxophone', 'drum']),
  e('violin', '🎻', 'activity', 'U+1F3BB', 'violin', 'violin', ['sheet-music', 'trumpet']),
  e('saxophone', '🎷', 'activity', 'U+1F3B7', 'saxophone', 'sax', ['trumpet', 'piano']),
  e('drum', '🥁', 'activity', 'U+1F941', 'drum', 'drum kit', ['long-drum', 'guitar']),
  e('long-drum', '🪘', 'activity', 'U+1FA98', 'long drum', 'djembe', ['drum']),
  e('podcast-mic', '🎙️', 'activity', 'U+1F399 U+FE0F', 'studio microphone', 'podcast mic', ['microphone', 'headphone']),
  e('disco-ball', '🪩', 'activity', 'U+1FAA9', 'mirror ball', 'disco ball', ['musical-notes']),
  e('art-palette', '🎨', 'activity', 'U+1F3A8', 'artist palette', 'art palette', ['performing-arts']),
  e('movie-camera', '🎥', 'activity', 'U+1F3A5', 'movie camera', 'film camera', ['clapper-board', 'popcorn']),
  e('circus-tent', '🎪', 'activity', 'U+1F3AA', 'circus tent', 'circus', ['performing-arts', 'tent']),

  /* ───────── activity — 상과 표 ───────── */
  e('second-place-medal', '🥈', 'activity', 'U+1F948', '2nd place medal', 'silver medal', ['first-place-medal', 'third-place-medal']),
  e('third-place-medal', '🥉', 'activity', 'U+1F949', '3rd place medal', 'bronze medal', ['second-place-medal', 'first-place-medal']),
  e('sports-medal', '🏅', 'activity', 'U+1F3C5', 'sports medal', 'medal', ['first-place-medal', 'military-medal']),
  e('military-medal', '🎖️', 'activity', 'U+1F396 U+FE0F', 'military medal', 'military medal', ['sports-medal', 'awareness-ribbon']),
  e('awareness-ribbon', '🎗️', 'activity', 'U+1F397 U+FE0F', 'reminder ribbon', 'awareness ribbon', ['military-medal', 'ribbon']),
  e('ticket', '🎫', 'activity', 'U+1F3AB', 'ticket', 'ticket', ['admission-tickets', 'movie-camera']),
  e('admission-tickets', '🎟️', 'activity', 'U+1F39F U+FE0F', 'admission tickets', 'event tickets', ['ticket']),

  /* ───────── activity — 잔치와 명절 ───────── */
  e('fireworks', '🎆', 'activity', 'U+1F386', 'fireworks', 'fireworks', ['sparkler', 'party-popper']),
  e('sparkler', '🎇', 'activity', 'U+1F387', 'sparkler', 'sparkler', ['fireworks']),
  e('red-envelope', '🧧', 'activity', 'U+1F9E7', 'red envelope', 'hongbao', ['money-bag', 'wrapped-gift']),
  e('japanese-dolls', '🎎', 'activity', 'U+1F38E', 'Japanese dolls', 'hinamatsuri dolls', ['carp-streamer', 'wind-chime']),
  e('carp-streamer', '🎏', 'activity', 'U+1F38F', 'carp streamer', 'koinobori', ['japanese-dolls', 'wind-chime']),
  e('wind-chime', '🎐', 'activity', 'U+1F390', 'wind chime', 'furin', ['carp-streamer', 'tanabata-tree']),
  e('moon-viewing', '🎑', 'activity', 'U+1F391', 'moon viewing ceremony', 'tsukimi', ['moon-cake', 'crescent-moon']),
  e('pumpkin', '🎃', 'activity', 'U+1F383', 'jack-o-lantern', 'halloween pumpkin', ['ghost', 'candle']),

  /* ───────── place — 바퀴 넷 ───────── */
  e('car', '🚗', 'place', 'U+1F697', 'automobile', 'car', ['suv', 'taxi']),
  e('suv', '🚙', 'place', 'U+1F699', 'sport utility vehicle', 'SUV', ['car', 'delivery-truck']),
  e('taxi', '🚕', 'place', 'U+1F695', 'taxi', 'taxi', ['car', 'auto-rickshaw']),
  e('bus', '🚌', 'place', 'U+1F68C', 'bus', 'bus', ['tram-car', 'subway']),
  e('police-car', '🚓', 'place', 'U+1F693', 'police car', 'police car', ['ambulance', 'fire-engine']),
  e('ambulance', '🚑', 'place', 'U+1F691', 'ambulance', 'ambulance', ['hospital', 'police-car']),
  e('fire-engine', '🚒', 'place', 'U+1F692', 'fire engine', 'fire truck', ['ambulance', 'fire']),
  e('delivery-truck', '🚚', 'place', 'U+1F69A', 'delivery truck', 'delivery truck', ['package', 'suv']),
  e('fuel-pump', '⛽', 'place', 'U+26FD', 'fuel pump', 'gas station', ['car', 'motorway']),

  /* ───────── place — 바퀴 둘 ───────── */
  e('bicycle', '🚲', 'place', 'U+1F6B2', 'bicycle', 'bike', ['mountain-biking', 'kick-scooter']),
  e('kick-scooter', '🛴', 'place', 'U+1F6F4', 'kick scooter', 'kick scooter', ['motor-scooter', 'skateboard']),
  e('motor-scooter', '🛵', 'place', 'U+1F6F5', 'motor scooter', 'moped', ['motorcycle', 'kick-scooter']),
  e('motorcycle', '🏍️', 'place', 'U+1F3CD U+FE0F', 'motorcycle', 'motorbike', ['motor-scooter']),
  e('auto-rickshaw', '🛺', 'place', 'U+1F6FA', 'auto rickshaw', 'tuk tuk', ['taxi', 'motor-scooter']),

  /* ───────── place — 철길 ───────── */
  e('locomotive', '🚂', 'place', 'U+1F682', 'locomotive', 'steam train', ['bullet-train', 'railway-car']),
  e('bullet-train', '🚄', 'place', 'U+1F684', 'high-speed train', 'bullet train', ['locomotive', 'subway']),
  e('railway-car', '🚃', 'place', 'U+1F683', 'railway car', 'train carriage', ['tram-car', 'subway']),
  e('tram-car', '🚋', 'place', 'U+1F68B', 'tram car', 'tram', ['railway-car', 'bus']),
  e('subway', '🚇', 'place', 'U+1F687', 'metro', 'subway', ['railway-car', 'bullet-train']),

  /* ───────── place — 하늘과 물 ───────── */
  e('airplane', '✈️', 'place', 'U+2708 U+FE0F', 'airplane', 'plane', ['helicopter', 'desert-island']),
  e('helicopter', '🚁', 'place', 'U+1F681', 'helicopter', 'helicopter', ['airplane']),
  e('rocket', '🚀', 'place', 'U+1F680', 'rocket', 'rocket', ['chart-increasing', 'turtle']),
  e('ship', '🚢', 'place', 'U+1F6A2', 'ship', 'cruise ship', ['motor-boat', 'sailboat']),
  e('sailboat', '⛵', 'place', 'U+26F5', 'sailboat', 'sailboat', ['motor-boat', 'ship']),
  e('motor-boat', '🛥️', 'place', 'U+1F6E5 U+FE0F', 'motor boat', 'speedboat', ['sailboat', 'ship']),

  /* ───────── place — 사는 집 ───────── */
  e('house', '🏠', 'place', 'U+1F3E0', 'house', 'house', ['house-with-garden', 'office-building']),
  e('house-with-garden', '🏡', 'place', 'U+1F3E1', 'house with garden', 'house with yard', ['house', 'camping']),
  e('office-building', '🏢', 'place', 'U+1F3E2', 'office building', 'office', ['factory', 'cityscape']),
  e('factory', '🏭', 'place', 'U+1F3ED', 'factory', 'factory', ['office-building', 'construction-worker']),

  /* ───────── place — 볼일 보는 곳 ───────── */
  e('hospital', '🏥', 'place', 'U+1F3E5', 'hospital', 'hospital', ['ambulance', 'love-hotel']),
  e('bank', '🏦', 'place', 'U+1F3E6', 'bank', 'bank', ['money-bag', 'credit-card']),
  e('hotel', '🏨', 'place', 'U+1F3E8', 'hotel', 'hotel', ['love-hotel', 'ship']),
  e('love-hotel', '🏩', 'place', 'U+1F3E9', 'love hotel', 'love hotel', ['hotel', 'hospital']),
  e('school', '🏫', 'place', 'U+1F3EB', 'school', 'school', ['books', 'japanese-post-office']),
  e('convenience-store', '🏪', 'place', 'U+1F3EA', 'convenience store', 'konbini', ['rice-ball', 'japanese-post-office']),
  e('japanese-post-office', '🏣', 'place', 'U+1F3E3', 'Japanese post office', 'Japanese post office', ['post-office', 'envelope']),
  e('post-office', '🏤', 'place', 'U+1F3E4', 'post office', 'post office', ['japanese-post-office', 'envelope']),

  /* ───────── place — 오래된 건물 ───────── */
  e('castle', '🏰', 'place', 'U+1F3F0', 'castle', 'castle', ['japanese-castle', 'gem-stone']),
  e('japanese-castle', '🏯', 'place', 'U+1F3EF', 'Japanese castle', 'Japanese castle', ['castle', 'torii']),
  e('church', '⛪', 'place', 'U+26EA', 'church', 'church', ['mosque', 'latin-cross']),
  e('mosque', '🕌', 'place', 'U+1F54C', 'mosque', 'mosque', ['church', 'star-and-crescent']),
  e('hindu-temple', '🛕', 'place', 'U+1F6D5', 'hindu temple', 'hindu temple', ['om', 'mosque']),
  e('synagogue', '🕍', 'place', 'U+1F54D', 'synagogue', 'synagogue', ['star-of-david', 'church']),
  e('torii', '⛩️', 'place', 'U+26E9 U+FE0F', 'shinto shrine', 'torii gate', ['japanese-castle', 'mount-fuji']),

  /* ───────── place — 알아보는 한 채 ───────── */
  e('tokyo-tower', '🗼', 'place', 'U+1F5FC', 'Tokyo tower', 'Tokyo Tower', ['statue-of-liberty', 'torii']),
  e('statue-of-liberty', '🗽', 'place', 'U+1F5FD', 'Statue of Liberty', 'Statue of Liberty', ['tokyo-tower', 'cityscape']),
  e('moai', '🗿', 'place', 'U+1F5FF', 'moai', 'moai statue', ['expressionless', 'tokyo-tower']),

  /* ───────── place — 놀러 가는 곳 ───────── */
  e('stadium', '🏟️', 'place', 'U+1F3DF U+FE0F', 'stadium', 'stadium', ['soccer-ball', 'baseball']),
  e('ferris-wheel', '🎡', 'place', 'U+1F3A1', 'ferris wheel', 'ferris wheel', ['roller-coaster', 'cityscape-at-dusk']),
  e('roller-coaster', '🎢', 'place', 'U+1F3A2', 'roller coaster', 'roller coaster', ['ferris-wheel', 'chart-increasing']),

  /* ───────── place — 땅과 물, 사람이 가는 곳 ───────── */
  e('beach', '🏖️', 'place', 'U+1F3D6 U+FE0F', 'beach with umbrella', 'beach', ['desert-island', 'palm-tree']),
  e('desert-island', '🏝️', 'place', 'U+1F3DD U+FE0F', 'desert island', 'desert island', ['beach', 'palm-tree']),
  e('snowy-mountain', '🏔️', 'place', 'U+1F3D4 U+FE0F', 'snow-capped mountain', 'snowy mountain', ['mount-fuji', 'climbing']),
  e('mount-fuji', '🗻', 'place', 'U+1F5FB', 'mount fuji', 'Mount Fuji', ['snowy-mountain', 'torii']),
  e('volcano', '🌋', 'place', 'U+1F30B', 'volcano', 'volcano', ['snowy-mountain', 'fire']),
  e('camping', '🏕️', 'place', 'U+1F3D5 U+FE0F', 'camping', 'camping', ['tent', 'house-with-garden']),
  e('tent', '⛺', 'place', 'U+26FA', 'tent', 'tent', ['camping', 'circus-tent']),
  e('bridge-at-night', '🌉', 'place', 'U+1F309', 'bridge at night', 'bridge at night', ['night-with-stars', 'foggy']),
  e('motorway', '🛣️', 'place', 'U+1F6E3 U+FE0F', 'motorway', 'highway', ['fuel-pump', 'car']),

  /* ───────── place — 때가 곧 장소인 것 ───────── */
  e('sunrise', '🌅', 'place', 'U+1F305', 'sunrise', 'sunrise', ['sunrise-over-mountains', 'sunset']),
  e('sunrise-over-mountains', '🌄', 'place', 'U+1F304', 'sunrise over mountains', 'sunrise over mountains', ['sunrise', 'snowy-mountain']),
  e('sunset', '🌇', 'place', 'U+1F307', 'sunset', 'sunset', ['cityscape-at-dusk', 'sunrise']),
  e('cityscape-at-dusk', '🌆', 'place', 'U+1F306', 'cityscape at dusk', 'dusk', ['sunset', 'night-with-stars']),
  e('night-with-stars', '🌃', 'place', 'U+1F303', 'night with stars', 'night city', ['cityscape-at-dusk', 'milky-way']),
  e('cityscape', '🏙️', 'place', 'U+1F3D9 U+FE0F', 'cityscape', 'city skyline', ['night-with-stars', 'office-building']),
  e('milky-way', '🌌', 'place', 'U+1F30C', 'milky way', 'milky way', ['night-with-stars', 'star']),
  e('foggy', '🌁', 'place', 'U+1F301', 'foggy', 'fog', ['bridge-at-night', 'cloud']),
];
