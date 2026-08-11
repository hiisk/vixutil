/**
 * 기호 84개와 사람 50개 — 이모지 글자와 공식 이름, 사람들이 치는 이름만 적는다.
 *
 * 앞의 두 파일과 같은 규칙이다. 이모지는 그림이라 언어를 가리지 않으니 여기에는
 * 언어를 타지 않는 것만 두고, 열 언어로 쓸 한 문장은 desc-symbol.ts에 있다.
 *
 * ── 기호는 얼굴보다 더 자주 잘못 읽힌다 ─────────────────────
 * 얼굴은 못 알아봐도 표정이 보이지만 기호는 아는 사람만 안다. 🈵는 満이라 '자리 없음'이고
 * 🈳는 空이라 '자리 있음'인데, 한자를 못 읽으면 정확히 거꾸로 보낸다. 🅿️는 주차장 표지라서
 * P로 시작하는 낱말을 적을 때 쓰는 글자가 아니고, ❣️는 큰 하트가 아니라 문장을 끝내는
 * 느낌표다. 💯은 백이 아니라 전적인 동의다 — 이 어긋남이 이 페이지에서 가장 값나가는 곳이다.
 *
 * ── U+FE0F가 없으면 흑백으로 떨어진다 ──────────────────────
 * 이 파일에는 뒤에 U+FE0F를 붙여야 그림이 되는 것이 많다 — ❤️·⚠️·▶️·♠️·✝️·➡️·♻️·㊗️처럼
 * 원래 인쇄 기호였던 것들이다. 붙이지 않은 ❤와 붙인 ❤️는 눈에 같아 보여도 다른 문자열이라
 * 검색과 문자열 비교가 조용히 어긋난다. 반대로 ✅·❌·⭕·♈·🀄는 기본이 그림이라 붙이지 않는다.
 * 코드에 그대로 적었고, 실제로 문제가 되는 것은 설명에도 그 말을 적었다.
 *
 * ── 앞 파일과 겹치는 것은 싣지 않는다 ──────────────────────
 * 💯과 🔥는 list-thing.ts에 hundred-points·fire로 이미 있고, 🤝·👶·🧒·🧑·🧓는
 * list-face.ts에 있다. 같은 글자를 두 번 실으면 한 이모지에 주소가 둘 생기니 뺐다.
 * 성별이 붙은 🤷‍♂️·🤦‍♀️·💁‍♀️·🙋‍♂️·🙅‍♀️·🙆‍♀️는 성별 없는 🤷·🤦·💁·🙋·🙅·🙆와
 * 다른 문자열이라 따로 싣고, 슬러그도 -man·-woman을 붙여 갈랐다.
 *
 * 갈래는 둘이다 — symbol(기호)·people(사람과 역할).
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

export const EM_SYMBOL: EmojiItem[] = [
  /* ───────── symbol — 하트의 색 ───────── */
  e('red-heart', '❤️', 'symbol', 'U+2764 U+FE0F', 'red heart', 'heart', ['pink-heart', 'broken-heart', 'heart-suit']),
  e('pink-heart', '🩷', 'symbol', 'U+1FA77', 'pink heart', 'pink heart', ['red-heart', 'white-heart']),
  e('orange-heart', '🧡', 'symbol', 'U+1F9E1', 'orange heart', 'orange heart', ['yellow-heart', 'red-heart']),
  e('yellow-heart', '💛', 'symbol', 'U+1F49B', 'yellow heart', 'yellow heart', ['orange-heart', 'green-heart']),
  e('green-heart', '💚', 'symbol', 'U+1F49A', 'green heart', 'green heart', ['yellow-heart', 'blue-heart']),
  e('blue-heart', '💙', 'symbol', 'U+1F499', 'blue heart', 'blue heart', ['light-blue-heart', 'purple-heart']),
  e('light-blue-heart', '🩵', 'symbol', 'U+1FA75', 'light blue heart', 'light blue heart', ['blue-heart', 'grey-heart']),
  e('purple-heart', '💜', 'symbol', 'U+1F49C', 'purple heart', 'purple heart', ['blue-heart', 'black-heart']),
  e('black-heart', '🖤', 'symbol', 'U+1F5A4', 'black heart', 'black heart', ['white-heart', 'grey-heart']),
  e('grey-heart', '🩶', 'symbol', 'U+1FA76', 'grey heart', 'gray heart', ['black-heart', 'light-blue-heart']),
  e('white-heart', '🤍', 'symbol', 'U+1F90D', 'white heart', 'white heart', ['black-heart', 'pink-heart']),
  e('brown-heart', '🤎', 'symbol', 'U+1F90E', 'brown heart', 'brown heart', ['black-heart', 'orange-heart']),

  /* ───────── symbol — 움직이는 하트와 깨진 하트 ───────── */
  e('broken-heart', '💔', 'symbol', 'U+1F494', 'broken heart', 'broken heart', ['red-heart', 'heart-exclamation']),
  e('heart-exclamation', '❣️', 'symbol', 'U+2763 U+FE0F', 'heart exclamation', 'heart exclamation mark', ['red-heart', 'two-hearts']),
  e('two-hearts', '💕', 'symbol', 'U+1F495', 'two hearts', 'two hearts', ['revolving-hearts', 'sparkling-heart']),
  e('revolving-hearts', '💞', 'symbol', 'U+1F49E', 'revolving hearts', 'spinning hearts', ['two-hearts', 'beating-heart']),
  e('beating-heart', '💓', 'symbol', 'U+1F493', 'beating heart', 'beating heart', ['growing-heart', 'revolving-hearts']),
  e('growing-heart', '💗', 'symbol', 'U+1F497', 'growing heart', 'growing heart', ['beating-heart', 'sparkling-heart']),
  e('sparkling-heart', '💖', 'symbol', 'U+1F496', 'sparkling heart', 'sparkling heart', ['two-hearts', 'growing-heart']),
  e('heart-arrow', '💘', 'symbol', 'U+1F498', 'heart with arrow', 'cupid heart arrow', ['heart-ribbon', 'red-heart']),
  e('heart-ribbon', '💝', 'symbol', 'U+1F49D', 'heart with ribbon', 'heart gift box', ['heart-arrow', 'sparkling-heart']),

  /* ───────── symbol — 맞다·아니다 ───────── */
  e('check', '✅', 'symbol', 'U+2705', 'check mark button', 'check mark', ['cross-mark', 'circle-mark']),
  e('cross-mark', '❌', 'symbol', 'U+274C', 'cross mark', 'x mark', ['check', 'circle-mark', 'prohibited']),
  e('circle-mark', '⭕', 'symbol', 'U+2B55', 'hollow red circle', 'red circle mark', ['check', 'cross-mark']),
  e('question', '❓', 'symbol', 'U+2753', 'red question mark', 'question mark', ['exclamation', 'exclamation-question']),
  e('exclamation', '❗', 'symbol', 'U+2757', 'red exclamation mark', 'exclamation mark', ['double-exclamation', 'question']),
  e('double-exclamation', '‼️', 'symbol', 'U+203C U+FE0F', 'double exclamation mark', 'double exclamation', ['exclamation', 'exclamation-question']),
  e('exclamation-question', '⁉️', 'symbol', 'U+2049 U+FE0F', 'exclamation question mark', 'interrobang', ['question', 'double-exclamation']),

  /* ───────── symbol — 조심하라는 표지 ───────── */
  e('warning', '⚠️', 'symbol', 'U+26A0 U+FE0F', 'warning', 'warning sign', ['prohibited', 'exclamation']),
  e('prohibited', '🚫', 'symbol', 'U+1F6AB', 'prohibited', 'no sign', ['warning', 'no-under-18', 'prohibited-kanji']),
  e('no-under-18', '🔞', 'symbol', 'U+1F51E', 'no one under eighteen', 'adults only', ['prohibited', 'prohibited-kanji']),
  e('recycle', '♻️', 'symbol', 'U+267B U+FE0F', 'recycling symbol', 'recycle', ['refresh', 'prohibited']),

  /* ───────── symbol — 네모 안의 글자 ───────── */
  e('ok-button', '🆗', 'symbol', 'U+1F197', 'OK button', 'ok sign square', ['new-button', 'cool-button']),
  e('new-button', '🆕', 'symbol', 'U+1F195', 'NEW button', 'new label', ['ok-button', 'cool-button']),
  e('cool-button', '🆒', 'symbol', 'U+1F192', 'COOL button', 'cool label', ['new-button', 'ok-button']),
  e('prohibited-kanji', '🈲', 'symbol', 'U+1F232', 'Japanese "prohibited" button', 'kanji forbidden', ['prohibited', 'no-vacancy', 'secret-kanji']),
  e('vacancy', '🈳', 'symbol', 'U+1F233', 'Japanese "vacancy" button', 'kanji vacancy empty', ['no-vacancy', 'parking']),
  e('no-vacancy', '🈵', 'symbol', 'U+1F235', 'Japanese "no vacancy" button', 'kanji full', ['vacancy', 'prohibited-kanji']),
  e('congratulations-kanji', '㊗️', 'symbol', 'U+3297 U+FE0F', 'Japanese "congratulations" button', 'kanji congratulations', ['secret-kanji', 'ok-button']),
  e('secret-kanji', '㊙️', 'symbol', 'U+3299 U+FE0F', 'Japanese "secret" button', 'kanji secret', ['congratulations-kanji', 'prohibited-kanji']),
  e('parking', '🅿️', 'symbol', 'U+1F17F U+FE0F', 'P button', 'parking sign', ['vacancy', 'beginner']),
  e('beginner', '🔰', 'symbol', 'U+1F530', 'Japanese symbol for beginner', 'beginner leaf badge', ['parking', 'ok-button']),

  /* ───────── symbol — 별자리 열둘 ───────── */
  e('aries', '♈', 'symbol', 'U+2648', 'Aries', 'aries ram', ['taurus', 'pisces']),
  e('taurus', '♉', 'symbol', 'U+2649', 'Taurus', 'taurus bull', ['aries', 'gemini']),
  e('gemini', '♊', 'symbol', 'U+264A', 'Gemini', 'gemini twins', ['taurus', 'cancer-sign']),
  e('cancer-sign', '♋', 'symbol', 'U+264B', 'Cancer', 'cancer crab', ['gemini', 'leo']),
  e('leo', '♌', 'symbol', 'U+264C', 'Leo', 'leo lion', ['cancer-sign', 'virgo']),
  e('virgo', '♍', 'symbol', 'U+264D', 'Virgo', 'virgo maiden', ['leo', 'libra']),
  e('libra', '♎', 'symbol', 'U+264E', 'Libra', 'libra scales', ['virgo', 'scorpio']),
  e('scorpio', '♏', 'symbol', 'U+264F', 'Scorpio', 'scorpio scorpion', ['libra', 'sagittarius']),
  e('sagittarius', '♐', 'symbol', 'U+2650', 'Sagittarius', 'sagittarius archer', ['scorpio', 'capricorn']),
  e('capricorn', '♑', 'symbol', 'U+2651', 'Capricorn', 'capricorn goat', ['sagittarius', 'aquarius']),
  e('aquarius', '♒', 'symbol', 'U+2652', 'Aquarius', 'aquarius water bearer', ['capricorn', 'pisces']),
  e('pisces', '♓', 'symbol', 'U+2653', 'Pisces', 'pisces fish', ['aquarius', 'aries']),

  /* ───────── symbol — 화살표 ───────── */
  e('right-arrow', '➡️', 'symbol', 'U+27A1 U+FE0F', 'right arrow', 'right arrow', ['left-arrow', 'up-arrow']),
  e('left-arrow', '⬅️', 'symbol', 'U+2B05 U+FE0F', 'left arrow', 'left arrow', ['right-arrow', 'down-arrow']),
  e('up-arrow', '⬆️', 'symbol', 'U+2B06 U+FE0F', 'up arrow', 'up arrow', ['down-arrow', 'right-arrow']),
  e('down-arrow', '⬇️', 'symbol', 'U+2B07 U+FE0F', 'down arrow', 'down arrow', ['up-arrow', 'left-arrow']),
  e('refresh', '🔄', 'symbol', 'U+1F504', 'counterclockwise arrows button', 'refresh reload', ['repeat', 'recycle']),
  e('repeat', '🔁', 'symbol', 'U+1F501', 'repeat button', 'loop repeat', ['repeat-one', 'shuffle']),
  e('repeat-one', '🔂', 'symbol', 'U+1F502', 'repeat single button', 'repeat one song', ['repeat', 'shuffle']),
  e('shuffle', '🔀', 'symbol', 'U+1F500', 'shuffle tracks button', 'shuffle', ['repeat', 'refresh']),

  /* ───────── symbol — 재생 단추 ───────── */
  e('play', '▶️', 'symbol', 'U+25B6 U+FE0F', 'play button', 'play button', ['pause', 'stop']),
  e('pause', '⏸️', 'symbol', 'U+23F8 U+FE0F', 'pause button', 'pause button', ['play', 'stop']),
  e('stop', '⏹️', 'symbol', 'U+23F9 U+FE0F', 'stop button', 'stop button', ['pause', 'play']),
  e('next-track', '⏭️', 'symbol', 'U+23ED U+FE0F', 'next track button', 'skip forward', ['previous-track', 'play']),
  e('previous-track', '⏮️', 'symbol', 'U+23EE U+FE0F', 'last track button', 'skip back', ['next-track', 'play']),

  /* ───────── symbol — 믿음의 표 ───────── */
  e('peace-symbol', '☮️', 'symbol', 'U+262E U+FE0F', 'peace symbol', 'peace sign symbol', ['yin-yang', 'latin-cross']),
  e('latin-cross', '✝️', 'symbol', 'U+271D U+FE0F', 'latin cross', 'christian cross', ['star-and-crescent', 'star-of-david']),
  e('star-and-crescent', '☪️', 'symbol', 'U+262A U+FE0F', 'star and crescent', 'islam symbol', ['latin-cross', 'star-of-david']),
  e('om', '🕉️', 'symbol', 'U+1F549 U+FE0F', 'om', 'om symbol', ['dharma-wheel', 'yin-yang']),
  e('star-of-david', '✡️', 'symbol', 'U+2721 U+FE0F', 'star of David', 'jewish star', ['menorah', 'six-pointed-star']),
  e('dharma-wheel', '☸️', 'symbol', 'U+2638 U+FE0F', 'wheel of dharma', 'buddhism wheel', ['om', 'yin-yang']),
  e('six-pointed-star', '🔯', 'symbol', 'U+1F52F', 'dotted six-pointed star', 'six pointed star with dot', ['star-of-david', 'yin-yang']),
  e('menorah', '🕎', 'symbol', 'U+1F54E', 'menorah', 'hanukkah candles', ['star-of-david', 'latin-cross']),
  e('yin-yang', '☯️', 'symbol', 'U+262F U+FE0F', 'yin yang', 'yin yang', ['dharma-wheel', 'peace-symbol']),

  /* ───────── symbol — 카드와 패 ───────── */
  e('spade', '♠️', 'symbol', 'U+2660 U+FE0F', 'spade suit', 'spades', ['heart-suit', 'club']),
  e('heart-suit', '♥️', 'symbol', 'U+2665 U+FE0F', 'heart suit', 'hearts card suit', ['spade', 'diamond-suit', 'red-heart']),
  e('diamond-suit', '♦️', 'symbol', 'U+2666 U+FE0F', 'diamond suit', 'diamonds card suit', ['heart-suit', 'club']),
  e('club', '♣️', 'symbol', 'U+2663 U+FE0F', 'club suit', 'clubs card suit', ['spade', 'diamond-suit']),
  e('mahjong', '🀄', 'symbol', 'U+1F004', 'mahjong red dragon', 'mahjong tile', ['hanafuda', 'spade']),
  e('hanafuda', '🎴', 'symbol', 'U+1F3B4', 'flower playing cards', 'hanafuda cards', ['mahjong', 'spade']),

  /* ───────── symbol — 돈에 붙는 기호 ───────── */
  e('dollar-sign', '💲', 'symbol', 'U+1F4B2', 'heavy dollar sign', 'dollar sign', ['currency-exchange', 'check']),
  e('currency-exchange', '💱', 'symbol', 'U+1F4B1', 'currency exchange', 'currency exchange', ['dollar-sign', 'refresh']),

  /* ───────── people — 일과 역할 ───────── */
  e('dev', '👨‍💻', 'people', 'U+1F468 U+200D U+1F4BB', 'man technologist', 'programmer', ['scientist', 'mechanic']),
  e('scientist', '🧑‍🔬', 'people', 'U+1F9D1 U+200D U+1F52C', 'scientist', 'scientist', ['dev', 'astronaut']),
  e('nurse', '👩‍⚕️', 'people', 'U+1F469 U+200D U+2695 U+FE0F', 'woman health worker', 'nurse', ['police', 'firefighter']),
  e('police', '👮‍♀️', 'people', 'U+1F46E U+200D U+2640 U+FE0F', 'woman police officer', 'policewoman', ['detective', 'judge']),
  e('construction-worker', '👷', 'people', 'U+1F477', 'construction worker', 'builder', ['mechanic', 'farmer']),
  e('detective', '🕵️', 'people', 'U+1F575 U+FE0F', 'detective', 'spy', ['police', 'ninja']),
  e('chef', '👨‍🍳', 'people', 'U+1F468 U+200D U+1F373', 'man cook', 'chef', ['farmer', 'dev']),
  e('teacher', '👩‍🏫', 'people', 'U+1F469 U+200D U+1F3EB', 'woman teacher', 'teacher', ['judge', 'dev']),
  e('farmer', '🧑‍🌾', 'people', 'U+1F9D1 U+200D U+1F33E', 'farmer', 'farmer', ['chef', 'construction-worker']),
  e('mechanic', '👨‍🔧', 'people', 'U+1F468 U+200D U+1F527', 'man mechanic', 'mechanic', ['construction-worker', 'dev']),
  e('astronaut', '🧑‍🚀', 'people', 'U+1F9D1 U+200D U+1F680', 'astronaut', 'astronaut', ['pilot', 'superhero']),
  e('firefighter', '🧑‍🚒', 'people', 'U+1F9D1 U+200D U+1F692', 'firefighter', 'firefighter', ['nurse', 'police']),
  e('judge', '👨‍⚖️', 'people', 'U+1F468 U+200D U+2696 U+FE0F', 'man judge', 'judge', ['police', 'teacher']),
  e('pilot', '🧑‍✈️', 'people', 'U+1F9D1 U+200D U+2708 U+FE0F', 'pilot', 'pilot', ['astronaut', 'firefighter']),
  e('singer', '👩‍🎤', 'people', 'U+1F469 U+200D U+1F3A4', 'woman singer', 'singer', ['dancing-woman', 'dev']),
  e('ninja', '🥷', 'people', 'U+1F977', 'ninja', 'ninja', ['detective', 'supervillain']),

  /* ───────── people — 가족과 짝 ───────── */
  e('family', '👪', 'people', 'U+1F46A', 'family', 'family', ['family-girl', 'people-hugging']),
  e('family-girl', '👨‍👩‍👧', 'people', 'U+1F468 U+200D U+1F469 U+200D U+1F467', 'family: man, woman, girl', 'family of three', ['family', 'couple-with-heart']),
  e('couple-with-heart', '👩‍❤️‍👨', 'people', 'U+1F469 U+200D U+2764 U+FE0F U+200D U+1F468', 'couple with heart: woman, man', 'couple in love', ['family-girl', 'red-heart']),
  e('tuxedo', '🤵', 'people', 'U+1F935', 'person in tuxedo', 'groom', ['bride', 'couple-with-heart']),
  e('bride', '👰', 'people', 'U+1F470', 'person with veil', 'bride', ['tuxedo', 'couple-with-heart']),
  e('pregnant', '🤰', 'people', 'U+1F930', 'pregnant woman', 'pregnant', ['breastfeeding', 'family']),
  e('breastfeeding', '🤱', 'people', 'U+1F931', 'breast-feeding', 'breastfeeding', ['pregnant', 'family']),
  e('people-hugging', '🫂', 'people', 'U+1FAC2', 'people hugging', 'hug someone', ['family', 'couple-with-heart']),

  /* ───────── people — 움직이는 몸 ───────── */
  e('running-woman', '🏃‍♀️', 'people', 'U+1F3C3 U+200D U+2640 U+FE0F', 'woman running', 'running', ['walking', 'cycling']),
  e('walking', '🚶', 'people', 'U+1F6B6', 'person walking', 'walking', ['running-woman', 'cycling']),
  e('dancing-woman', '💃', 'people', 'U+1F483', 'woman dancing', 'dancing woman', ['dancing-man', 'singer']),
  e('dancing-man', '🕺', 'people', 'U+1F57A', 'man dancing', 'dancing man', ['dancing-woman', 'singer']),
  e('meditating', '🧘‍♀️', 'people', 'U+1F9D8 U+200D U+2640 U+FE0F', 'woman in lotus position', 'meditation yoga', ['walking', 'peace-symbol']),
  e('weight-lifting', '🏋️', 'people', 'U+1F3CB U+FE0F', 'person lifting weights', 'gym workout', ['cartwheeling', 'running-woman']),
  e('swimming', '🏊', 'people', 'U+1F3CA', 'person swimming', 'swimming', ['cycling', 'running-woman']),
  e('cycling', '🚴', 'people', 'U+1F6B4', 'person biking', 'cycling', ['running-woman', 'swimming']),
  e('cartwheeling', '🤸', 'people', 'U+1F938', 'person doing cartwheel', 'cartwheel', ['weight-lifting', 'dancing-woman']),
  e('facepalm-woman', '🤦‍♀️', 'people', 'U+1F926 U+200D U+2640 U+FE0F', 'woman facepalming', 'facepalm', ['shrug-man', 'gesturing-no-woman']),
  e('shrug-man', '🤷‍♂️', 'people', 'U+1F937 U+200D U+2642 U+FE0F', 'man shrugging', 'shrug', ['facepalm-woman', 'tipping-hand-woman']),
  e('tipping-hand-woman', '💁‍♀️', 'people', 'U+1F481 U+200D U+2640 U+FE0F', 'woman tipping hand', 'sassy hand flip', ['shrug-man', 'raising-hand-man']),
  e('raising-hand-man', '🙋‍♂️', 'people', 'U+1F64B U+200D U+2642 U+FE0F', 'man raising hand', 'raising hand', ['tipping-hand-woman', 'gesturing-ok-woman']),
  e('gesturing-no-woman', '🙅‍♀️', 'people', 'U+1F645 U+200D U+2640 U+FE0F', 'woman gesturing NO', 'arms crossed no', ['gesturing-ok-woman', 'cross-mark']),
  e('gesturing-ok-woman', '🙆‍♀️', 'people', 'U+1F646 U+200D U+2640 U+FE0F', 'woman gesturing OK', 'arms over head ok', ['gesturing-no-woman', 'circle-mark']),
  e('bunny-ears', '👯', 'people', 'U+1F46F', 'people with bunny ears', 'bunny ears twins', ['dancing-woman', 'family']),

  /* ───────── people — 있지 않은 것들 ───────── */
  e('witch', '🧙‍♀️', 'people', 'U+1F9D9 U+200D U+2640 U+FE0F', 'woman mage', 'witch', ['fairy', 'genie']),
  e('fairy', '🧚', 'people', 'U+1F9DA', 'fairy', 'fairy', ['witch', 'mermaid']),
  e('vampire', '🧛', 'people', 'U+1F9DB', 'vampire', 'vampire', ['zombie', 'witch']),
  e('mermaid', '🧜‍♀️', 'people', 'U+1F9DC U+200D U+2640 U+FE0F', 'mermaid', 'mermaid', ['fairy', 'witch']),
  e('zombie', '🧟', 'people', 'U+1F9DF', 'zombie', 'zombie', ['vampire', 'supervillain']),
  e('superhero', '🦸‍♀️', 'people', 'U+1F9B8 U+200D U+2640 U+FE0F', 'woman superhero', 'superhero', ['supervillain', 'astronaut']),
  e('supervillain', '🦹', 'people', 'U+1F9B9', 'supervillain', 'villain', ['superhero', 'ninja']),
  e('baby-angel', '👼', 'people', 'U+1F47C', 'baby angel', 'angel baby', ['fairy', 'santa']),
  e('santa', '🎅', 'people', 'U+1F385', 'Santa Claus', 'santa', ['mrs-claus', 'baby-angel']),
  e('mrs-claus', '🤶', 'people', 'U+1F936', 'Mrs. Claus', 'mother christmas', ['santa', 'witch']),
  e('genie', '🧞', 'people', 'U+1F9DE', 'genie', 'genie', ['witch', 'fairy']),
];
