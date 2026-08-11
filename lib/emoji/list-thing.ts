/**
 * 사물 계열 이모지 200개 — 자연·먹을 것·물건. 글자와 코드포인트, 이름만 적는다.
 *
 * 이모지는 그 자체가 열쇠라서 옮길 것이 없다. 🍑은 어느 나라 자판에서 쳐도 🍑이고
 * U+1F351이다. 그래서 여기에는 언어를 가리지 않는 것만 둔다 — 열 언어로 쓸 한
 * 문장은 desc-thing.ts에 있다. /cmd가 명령 이름을, /http가 상태 코드를 그렇게 다룬다.
 *
 * ── 무엇을 싣고 무엇을 뺐나 ──────────────────────────────
 * 공식 이름과 실제로 쓰이는 뜻이 어긋나는 것만 싣는다. 🐐의 공식 이름은 goat이지만
 * 사람들이 찾는 것은 GOAT이고, 🔫은 이름이 pistol에서 water pistol로 바뀌었다.
 * 어긋남이 없는 것은 사전에 있으니 여기 있을 필요가 없다 — 🦆는 그냥 오리다.
 *
 * ── 코드포인트를 적는 규칙 ────────────────────────────────
 * 기본이 글자 모양인 이모지는 U+FE0F를 붙여야 색이 나온다 — ☘️·✂️·☀️가 그렇다.
 * 붙이지 않은 ☘와 붙인 ☘️는 눈에는 같아 보여도 다른 문자열이라, 이것이 검색과
 * 문자열 비교를 조용히 어긋나게 한다. 붙는 것과 안 붙는 것을 코드에 그대로 적는다.
 *
 * 갈래는 셋이다 — nature(동물·식물·하늘)·food(먹을 것)·object(물건).
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

export const EM_THING: EmojiItem[] = [
  /* ───────── nature — 동물 ───────── */
  e('dog', '🐶', 'nature', 'U+1F436', 'dog face', 'dog', ['cat', 'rabbit']),
  e('cat', '🐱', 'nature', 'U+1F431', 'cat face', 'cat', ['dog']),
  e('rabbit', '🐰', 'nature', 'U+1F430', 'rabbit face', 'bunny', ['dog', 'cat']),
  e('fox', '🦊', 'nature', 'U+1F98A', 'fox', 'fox', ['wolf']),
  e('bear', '🐻', 'nature', 'U+1F43B', 'bear', 'bear', ['chart-decreasing', 'panda']),
  e('panda', '🐼', 'nature', 'U+1F43C', 'panda', 'panda', ['bear']),
  e('tiger', '🐯', 'nature', 'U+1F42F', 'tiger face', 'tiger', ['lion']),
  e('lion', '🦁', 'nature', 'U+1F981', 'lion', 'lion', ['tiger']),
  e('pig', '🐷', 'nature', 'U+1F437', 'pig face', 'pig', ['money-bag']),
  e('frog', '🐸', 'nature', 'U+1F438', 'frog', 'frog', ['teacup']),
  e('monkey-face', '🐵', 'nature', 'U+1F435', 'monkey face', 'monkey', ['see-no-evil', 'hear-no-evil', 'speak-no-evil']),
  e('see-no-evil', '🙈', 'nature', 'U+1F648', 'see-no-evil monkey', 'monkey covering eyes', ['hear-no-evil', 'speak-no-evil', 'monkey-face']),
  e('hear-no-evil', '🙉', 'nature', 'U+1F649', 'hear-no-evil monkey', 'monkey covering ears', ['see-no-evil', 'speak-no-evil']),
  e('speak-no-evil', '🙊', 'nature', 'U+1F64A', 'speak-no-evil monkey', 'monkey covering mouth', ['see-no-evil', 'hear-no-evil']),
  e('owl', '🦉', 'nature', 'U+1F989', 'owl', 'owl', ['bat']),
  e('dove', '🕊️', 'nature', 'U+1F54A U+FE0F', 'dove', 'peace dove', ['rainbow']),
  e('bat', '🦇', 'nature', 'U+1F987', 'bat', 'bat', ['owl', 'coffin']),
  e('wolf', '🐺', 'nature', 'U+1F43A', 'wolf', 'wolf', ['fox', 'crescent-moon']),
  e('unicorn', '🦄', 'nature', 'U+1F984', 'unicorn', 'unicorn', ['rainbow', 'sparkles']),
  e('honeybee', '🐝', 'nature', 'U+1F41D', 'honeybee', 'bee', ['honey-pot', 'sunflower']),
  e('butterfly', '🦋', 'nature', 'U+1F98B', 'butterfly', 'butterfly', ['bug', 'cherry-blossom']),
  e('bug', '🐛', 'nature', 'U+1F41B', 'bug', 'caterpillar', ['butterfly', 'lady-beetle']),
  e('snail', '🐌', 'nature', 'U+1F40C', 'snail', 'snail', ['turtle']),
  e('lady-beetle', '🐞', 'nature', 'U+1F41E', 'lady beetle', 'ladybug', ['four-leaf-clover', 'bug']),
  e('spider', '🕷️', 'nature', 'U+1F577 U+FE0F', 'spider', 'spider', ['bat']),
  e('snake', '🐍', 'nature', 'U+1F40D', 'snake', 'snake', ['rat']),
  e('turtle', '🐢', 'nature', 'U+1F422', 'turtle', 'turtle', ['snail']),
  e('octopus', '🐙', 'nature', 'U+1F419', 'octopus', 'octopus', ['sushi']),
  e('whale', '🐳', 'nature', 'U+1F433', 'spouting whale', 'whale', ['shark', 'water-wave']),
  e('shark', '🦈', 'nature', 'U+1F988', 'shark', 'shark', ['whale']),
  e('goat', '🐐', 'nature', 'U+1F410', 'goat', 'GOAT', ['trophy', 'first-place-medal']),
  e('sloth', '🦥', 'nature', 'U+1F9A5', 'sloth', 'sloth', ['snail', 'zzz']),
  e('rat', '🐀', 'nature', 'U+1F400', 'rat', 'rat', ['snake']),

  /* ───────── nature — 식물 ───────── */
  e('cactus', '🌵', 'nature', 'U+1F335', 'cactus', 'cactus', ['sun']),
  e('christmas-tree', '🎄', 'nature', 'U+1F384', 'Christmas tree', 'Christmas tree', ['wrapped-gift', 'snowflake']),
  e('palm-tree', '🌴', 'nature', 'U+1F334', 'palm tree', 'palm tree', ['tropical-drink', 'water-wave']),
  e('seedling', '🌱', 'nature', 'U+1F331', 'seedling', 'sprout', ['herb', 'chart-increasing']),
  e('four-leaf-clover', '🍀', 'nature', 'U+1F340', 'four leaf clover', 'lucky clover', ['shamrock', 'lady-beetle']),
  e('shamrock', '☘️', 'nature', 'U+2618 U+FE0F', 'shamrock', 'Irish clover', ['four-leaf-clover']),
  e('maple-leaf', '🍁', 'nature', 'U+1F341', 'maple leaf', 'autumn leaf', ['herb']),
  e('mushroom', '🍄', 'nature', 'U+1F344', 'mushroom', 'mushroom', ['herb']),
  e('pine-decoration', '🎍', 'nature', 'U+1F38D', 'pine decoration', 'Japanese New Year pine', ['tanabata-tree', 'dango']),
  e('tanabata-tree', '🎋', 'nature', 'U+1F38B', 'tanabata tree', 'wish tree', ['pine-decoration']),
  e('bouquet', '💐', 'nature', 'U+1F490', 'bouquet', 'flower bouquet', ['rose', 'tulip', 'wilted-flower']),
  e('tulip', '🌷', 'nature', 'U+1F337', 'tulip', 'tulip', ['bouquet', 'rose']),
  e('rose', '🌹', 'nature', 'U+1F339', 'rose', 'red rose', ['wilted-flower', 'bouquet']),
  e('wilted-flower', '🥀', 'nature', 'U+1F940', 'wilted flower', 'dead rose', ['rose']),
  e('cherry-blossom', '🌸', 'nature', 'U+1F338', 'cherry blossom', 'sakura', ['sunflower', 'pine-decoration']),
  e('sunflower', '🌻', 'nature', 'U+1F33B', 'sunflower', 'sunflower', ['cherry-blossom', 'honeybee']),
  e('herb', '🌿', 'nature', 'U+1F33F', 'herb', 'leaf', ['seedling', 'mushroom']),

  /* ───────── nature — 하늘과 물 ───────── */
  e('fire', '🔥', 'nature', 'U+1F525', 'fire', 'lit', ['hundred-points', 'sparkles']),
  e('sparkles', '✨', 'nature', 'U+2728', 'sparkles', 'sparkle', ['glowing-star', 'fire']),
  e('star', '⭐', 'nature', 'U+2B50', 'star', 'star', ['glowing-star']),
  e('glowing-star', '🌟', 'nature', 'U+1F31F', 'glowing star', 'shining star', ['star', 'sparkles']),
  e('high-voltage', '⚡', 'nature', 'U+26A1', 'high voltage', 'lightning bolt', ['collision', 'cloud-with-lightning-and-rain']),
  e('collision', '💥', 'nature', 'U+1F4A5', 'collision', 'boom', ['high-voltage', 'bomb']),
  e('rainbow', '🌈', 'nature', 'U+1F308', 'rainbow', 'rainbow', ['unicorn', 'sun']),
  e('sun', '☀️', 'nature', 'U+2600 U+FE0F', 'sun', 'sunny', ['cloud', 'rainbow']),
  e('cloud', '☁️', 'nature', 'U+2601 U+FE0F', 'cloud', 'cloudy', ['sun', 'cloud-with-lightning-and-rain']),
  e('cloud-with-lightning-and-rain', '⛈️', 'nature', 'U+26C8 U+FE0F', 'cloud with lightning and rain', 'thunderstorm', ['cloud', 'umbrella-with-rain']),
  e('snowflake', '❄️', 'nature', 'U+2744 U+FE0F', 'snowflake', 'snow', ['christmas-tree']),
  e('umbrella-with-rain', '☔', 'nature', 'U+2614', 'umbrella with rain drops', 'rain', ['cloud-with-lightning-and-rain', 'droplet']),
  e('water-wave', '🌊', 'nature', 'U+1F30A', 'water wave', 'wave', ['whale', 'droplet']),
  e('sweat-droplets', '💦', 'nature', 'U+1F4A6', 'sweat droplets', 'water splash', ['droplet', 'peach', 'eggplant']),
  e('droplet', '💧', 'nature', 'U+1F4A7', 'droplet', 'water drop', ['sweat-droplets', 'water-wave']),
  e('dashing-away', '💨', 'nature', 'U+1F4A8', 'dashing away', 'gust of wind', ['tornado']),
  e('tornado', '🌪️', 'nature', 'U+1F32A U+FE0F', 'tornado', 'twister', ['dashing-away', 'cloud']),
  e('crescent-moon', '🌙', 'nature', 'U+1F319', 'crescent moon', 'moon', ['new-moon-face', 'zzz']),
  e('new-moon-face', '🌚', 'nature', 'U+1F31A', 'new moon face', 'dark moon face', ['crescent-moon']),
  e('globe-europe-africa', '🌍', 'nature', 'U+1F30D', 'globe showing Europe-Africa', 'earth', ['seedling']),

  /* ───────── food — 과일 ───────── */
  e('red-apple', '🍎', 'food', 'U+1F34E', 'red apple', 'apple', ['memo']),
  e('banana', '🍌', 'food', 'U+1F34C', 'banana', 'banana', ['monkey-face']),
  e('watermelon', '🍉', 'food', 'U+1F349', 'watermelon', 'watermelon', ['strawberry']),
  e('grapes', '🍇', 'food', 'U+1F347', 'grapes', 'grapes', ['wine-glass']),
  e('strawberry', '🍓', 'food', 'U+1F353', 'strawberry', 'strawberry', ['shortcake', 'cherries']),
  e('cherries', '🍒', 'food', 'U+1F352', 'cherries', 'cherry', ['peach', 'strawberry']),
  e('peach', '🍑', 'food', 'U+1F351', 'peach', 'peach', ['eggplant', 'sweat-droplets', 'cherries']),
  e('mango', '🥭', 'food', 'U+1F96D', 'mango', 'mango', ['pineapple']),
  e('pineapple', '🍍', 'food', 'U+1F34D', 'pineapple', 'pineapple', ['pizza', 'tropical-drink']),
  e('lemon', '🍋', 'food', 'U+1F34B', 'lemon', 'lemon', ['teacup']),

  /* ───────── food — 채소 ───────── */
  e('eggplant', '🍆', 'food', 'U+1F346', 'eggplant', 'aubergine', ['peach', 'sweat-droplets']),
  e('avocado', '🥑', 'food', 'U+1F951', 'avocado', 'avocado', ['green-salad']),
  e('broccoli', '🥦', 'food', 'U+1F966', 'broccoli', 'broccoli', ['green-salad']),
  e('hot-pepper', '🌶️', 'food', 'U+1F336 U+FE0F', 'hot pepper', 'chili', ['fire', 'curry-rice']),
  e('corn', '🌽', 'food', 'U+1F33D', 'ear of corn', 'corn', ['popcorn']),
  e('onion', '🧅', 'food', 'U+1F9C5', 'onion', 'onion', ['cooking']),
  e('bread', '🍞', 'food', 'U+1F35E', 'bread', 'loaf of bread', ['money-bag', 'cheese-wedge']),
  e('cheese-wedge', '🧀', 'food', 'U+1F9C0', 'cheese wedge', 'cheese', ['bread', 'rat']),
  e('cooking', '🍳', 'food', 'U+1F373', 'cooking', 'fried egg', ['bread']),
  e('poultry-leg', '🍗', 'food', 'U+1F357', 'poultry leg', 'chicken drumstick', ['beer-mug', 'hamburger']),

  /* ───────── food — 끼니 ───────── */
  e('hot-dog', '🌭', 'food', 'U+1F32D', 'hot dog', 'hot dog', ['hamburger', 'french-fries']),
  e('hamburger', '🍔', 'food', 'U+1F354', 'hamburger', 'burger', ['french-fries', 'hot-dog']),
  e('french-fries', '🍟', 'food', 'U+1F35F', 'french fries', 'fries', ['hamburger']),
  e('pizza', '🍕', 'food', 'U+1F355', 'pizza', 'pizza slice', ['pineapple', 'hamburger']),
  e('taco', '🌮', 'food', 'U+1F32E', 'taco', 'taco', ['hot-pepper']),
  e('green-salad', '🥗', 'food', 'U+1F957', 'green salad', 'salad', ['broccoli', 'avocado']),
  e('spaghetti', '🍝', 'food', 'U+1F35D', 'spaghetti', 'pasta', ['pizza', 'steaming-bowl']),
  e('steaming-bowl', '🍜', 'food', 'U+1F35C', 'steaming bowl', 'ramen', ['spaghetti', 'curry-rice']),
  e('curry-rice', '🍛', 'food', 'U+1F35B', 'curry rice', 'curry', ['hot-pepper', 'cooked-rice']),
  e('sushi', '🍣', 'food', 'U+1F363', 'sushi', 'sushi', ['bento-box', 'octopus']),
  e('bento-box', '🍱', 'food', 'U+1F371', 'bento box', 'lunch box', ['sushi', 'rice-ball']),
  e('dumpling', '🥟', 'food', 'U+1F95F', 'dumpling', 'dumpling', ['steaming-bowl']),
  e('fried-shrimp', '🍤', 'food', 'U+1F364', 'fried shrimp', 'tempura shrimp', ['sushi']),
  e('rice-ball', '🍙', 'food', 'U+1F359', 'rice ball', 'onigiri', ['cooked-rice', 'bento-box']),
  e('cooked-rice', '🍚', 'food', 'U+1F35A', 'cooked rice', 'bowl of rice', ['rice-ball', 'curry-rice']),
  e('fish-cake', '🍥', 'food', 'U+1F365', 'fish cake with swirl', 'narutomaki', ['steaming-bowl']),
  e('moon-cake', '🥮', 'food', 'U+1F96E', 'moon cake', 'mooncake', ['crescent-moon', 'dango']),
  e('dango', '🍡', 'food', 'U+1F361', 'dango', 'sweet rice skewer', ['moon-cake', 'pine-decoration']),

  /* ───────── food — 단것 ───────── */
  e('soft-ice-cream', '🍦', 'food', 'U+1F366', 'soft ice cream', 'ice cream cone', ['shortcake', 'doughnut']),
  e('shortcake', '🍰', 'food', 'U+1F370', 'shortcake', 'slice of cake', ['birthday-cake', 'strawberry']),
  e('birthday-cake', '🎂', 'food', 'U+1F382', 'birthday cake', 'birthday', ['party-popper', 'wrapped-gift']),
  e('cupcake', '🧁', 'food', 'U+1F9C1', 'cupcake', 'cupcake', ['shortcake']),
  e('lollipop', '🍭', 'food', 'U+1F36D', 'lollipop', 'lollipop', ['candy']),
  e('candy', '🍬', 'food', 'U+1F36C', 'candy', 'sweet', ['lollipop', 'chocolate-bar']),
  e('chocolate-bar', '🍫', 'food', 'U+1F36B', 'chocolate bar', 'chocolate', ['candy', 'love-letter']),
  e('popcorn', '🍿', 'food', 'U+1F37F', 'popcorn', 'popcorn', ['clapper-board', 'corn']),
  e('doughnut', '🍩', 'food', 'U+1F369', 'doughnut', 'donut', ['cookie', 'hot-beverage']),
  e('cookie', '🍪', 'food', 'U+1F36A', 'cookie', 'biscuit', ['doughnut', 'hot-beverage']),
  e('honey-pot', '🍯', 'food', 'U+1F36F', 'honey pot', 'honey', ['honeybee']),

  /* ───────── food — 마실 것 ───────── */
  e('baby-bottle', '🍼', 'food', 'U+1F37C', 'baby bottle', 'baby milk bottle', ['person-in-bed']),
  e('hot-beverage', '☕', 'food', 'U+2615', 'hot beverage', 'coffee', ['teacup', 'doughnut']),
  e('teacup', '🍵', 'food', 'U+1F375', 'teacup without handle', 'green tea', ['hot-beverage', 'frog']),
  e('mate', '🧉', 'food', 'U+1F9C9', 'mate', 'mate gourd', ['teacup']),
  e('bubble-tea', '🧋', 'food', 'U+1F9CB', 'bubble tea', 'boba', ['teacup']),
  e('sake', '🍶', 'food', 'U+1F376', 'sake', 'sake bottle', ['beer-mug', 'clinking-beer-mugs']),
  e('beer-mug', '🍺', 'food', 'U+1F37A', 'beer mug', 'beer', ['clinking-beer-mugs', 'poultry-leg']),
  e('clinking-beer-mugs', '🍻', 'food', 'U+1F37B', 'clinking beer mugs', 'cheers with beer', ['beer-mug', 'clinking-glasses']),
  e('clinking-glasses', '🥂', 'food', 'U+1F942', 'clinking glasses', 'cheers', ['clinking-beer-mugs', 'wine-glass']),
  e('wine-glass', '🍷', 'food', 'U+1F377', 'wine glass', 'red wine', ['clinking-glasses', 'grapes']),
  e('tropical-drink', '🍹', 'food', 'U+1F379', 'tropical drink', 'cocktail', ['palm-tree', 'clinking-glasses']),

  /* ───────── object — 말풍선과 기척 ───────── */
  e('hundred-points', '💯', 'object', 'U+1F4AF', 'hundred points', '100', ['fire', 'first-place-medal']),
  e('zzz', '💤', 'object', 'U+1F4A4', 'ZZZ', 'sleeping', ['person-in-bed', 'crescent-moon']),
  e('anger-symbol', '💢', 'object', 'U+1F4A2', 'anger symbol', 'anger vein', ['right-anger-bubble', 'collision']),
  e('speech-balloon', '💬', 'object', 'U+1F4AC', 'speech balloon', 'chat bubble', ['thought-balloon', 'right-anger-bubble']),
  e('thought-balloon', '💭', 'object', 'U+1F4AD', 'thought balloon', 'thinking bubble', ['speech-balloon']),
  e('right-anger-bubble', '🗯️', 'object', 'U+1F5EF U+FE0F', 'right anger bubble', 'shouting bubble', ['anger-symbol', 'speech-balloon']),
  e('hole', '🕳️', 'object', 'U+1F573 U+FE0F', 'hole', 'black hole', ['coffin']),
  e('person-in-bed', '🛌', 'object', 'U+1F6CC', 'person in bed', 'in bed', ['zzz', 'baby-bottle']),

  /* ───────── object — 잔치와 놀이 ───────── */
  e('party-popper', '🎉', 'object', 'U+1F389', 'party popper', 'congratulations', ['confetti-ball', 'birthday-cake']),
  e('confetti-ball', '🎊', 'object', 'U+1F38A', 'confetti ball', 'confetti', ['party-popper']),
  e('balloon', '🎈', 'object', 'U+1F388', 'balloon', 'party balloon', ['party-popper', 'birthday-cake']),
  e('wrapped-gift', '🎁', 'object', 'U+1F381', 'wrapped gift', 'present', ['ribbon', 'christmas-tree']),
  e('ribbon', '🎀', 'object', 'U+1F380', 'ribbon', 'bow', ['wrapped-gift']),
  e('firecracker', '🧨', 'object', 'U+1F9E8', 'firecracker', 'firecracker', ['bomb', 'party-popper']),
  e('bullseye', '🎯', 'object', 'U+1F3AF', 'bullseye', 'dart', ['hundred-points']),
  e('game-die', '🎲', 'object', 'U+1F3B2', 'game die', 'dice', ['slot-machine']),
  e('video-game', '🎮', 'object', 'U+1F3AE', 'video game', 'game controller', ['game-die']),
  e('slot-machine', '🎰', 'object', 'U+1F3B0', 'slot machine', 'jackpot', ['game-die', 'money-with-wings']),
  e('soccer-ball', '⚽', 'object', 'U+26BD', 'soccer ball', 'football', ['basketball', 'trophy']),
  e('basketball', '🏀', 'object', 'U+1F3C0', 'basketball', 'basketball', ['soccer-ball']),
  e('trophy', '🏆', 'object', 'U+1F3C6', 'trophy', 'trophy', ['first-place-medal', 'goat']),
  e('first-place-medal', '🥇', 'object', 'U+1F947', '1st place medal', 'gold medal', ['trophy', 'hundred-points']),

  /* ───────── object — 무대와 소리 ───────── */
  e('performing-arts', '🎭', 'object', 'U+1F3AD', 'performing arts', 'theatre masks', ['clapper-board']),
  e('clapper-board', '🎬', 'object', 'U+1F3AC', 'clapper board', 'movie clapper', ['popcorn', 'performing-arts']),
  e('microphone', '🎤', 'object', 'U+1F3A4', 'microphone', 'mic', ['headphone', 'guitar']),
  e('headphone', '🎧', 'object', 'U+1F3A7', 'headphone', 'headphones', ['microphone']),
  e('guitar', '🎸', 'object', 'U+1F3B8', 'guitar', 'electric guitar', ['microphone']),

  /* ───────── object — 기계 ───────── */
  e('mobile-phone', '📱', 'object', 'U+1F4F1', 'mobile phone', 'smartphone', ['laptop']),
  e('laptop', '💻', 'object', 'U+1F4BB', 'laptop', 'laptop computer', ['mobile-phone', 'floppy-disk']),
  e('floppy-disk', '💾', 'object', 'U+1F4BE', 'floppy disk', 'save icon', ['laptop']),
  e('camera', '📷', 'object', 'U+1F4F7', 'camera', 'camera', ['clapper-board']),
  e('television', '📺', 'object', 'U+1F4FA', 'television', 'TV', ['clapper-board']),
  e('light-bulb', '💡', 'object', 'U+1F4A1', 'light bulb', 'idea', ['thought-balloon']),
  e('candle', '🕯️', 'object', 'U+1F56F U+FE0F', 'candle', 'candle', ['coffin', 'birthday-cake']),

  /* ───────── object — 돈 ───────── */
  e('money-with-wings', '💸', 'object', 'U+1F4B8', 'money with wings', 'money flying away', ['money-bag', 'credit-card']),
  e('dollar-banknote', '💵', 'object', 'U+1F4B5', 'dollar banknote', 'dollar bill', ['money-bag', 'money-with-wings']),
  e('money-bag', '💰', 'object', 'U+1F4B0', 'money bag', 'money', ['dollar-banknote', 'gem-stone']),
  e('credit-card', '💳', 'object', 'U+1F4B3', 'credit card', 'card payment', ['receipt', 'money-with-wings']),
  e('receipt', '🧾', 'object', 'U+1F9FE', 'receipt', 'receipt', ['credit-card']),
  e('gem-stone', '💎', 'object', 'U+1F48E', 'gem stone', 'diamond', ['money-bag', 'sparkles']),

  /* ───────── object — 연장 ───────── */
  e('wrench', '🔧', 'object', 'U+1F527', 'wrench', 'spanner', ['hammer', 'gear']),
  e('hammer', '🔨', 'object', 'U+1F528', 'hammer', 'hammer', ['wrench']),
  e('gear', '⚙️', 'object', 'U+2699 U+FE0F', 'gear', 'settings cog', ['wrench']),
  e('chains', '⛓️', 'object', 'U+26D3 U+FE0F', 'chains', 'chain links', ['link', 'locked']),

  /* ───────── object — 위험한 것 ───────── */
  e('pistol', '🔫', 'object', 'U+1F52B', 'water pistol', 'gun emoji', ['bomb', 'kitchen-knife']),
  e('bomb', '💣', 'object', 'U+1F4A3', 'bomb', 'bomb', ['collision', 'firecracker']),
  e('kitchen-knife', '🔪', 'object', 'U+1F52A', 'kitchen knife', 'knife', ['pistol', 'cooking']),
  e('cigarette', '🚬', 'object', 'U+1F6AC', 'cigarette', 'smoking', ['coffin']),
  e('coffin', '⚰️', 'object', 'U+26B0 U+FE0F', 'coffin', 'casket', ['candle', 'hole']),

  /* ───────── object — 믿음과 보호 ───────── */
  e('crystal-ball', '🔮', 'object', 'U+1F52E', 'crystal ball', 'fortune telling', ['nazar-amulet', 'prayer-beads']),
  e('prayer-beads', '📿', 'object', 'U+1F4FF', 'prayer beads', 'rosary', ['nazar-amulet', 'crystal-ball']),
  e('nazar-amulet', '🧿', 'object', 'U+1F9FF', 'nazar amulet', 'evil eye', ['prayer-beads', 'crystal-ball']),

  /* ───────── object — 몸과 살림 ───────── */
  e('pill', '💊', 'object', 'U+1F48A', 'pill', 'medicine', ['syringe']),
  e('syringe', '💉', 'object', 'U+1F489', 'syringe', 'injection', ['pill']),
  e('roll-of-paper', '🧻', 'object', 'U+1F9FB', 'roll of paper', 'toilet paper', ['receipt']),

  /* ───────── object — 잠그기 ───────── */
  e('key', '🔑', 'object', 'U+1F511', 'key', 'key', ['locked', 'unlocked']),
  e('locked', '🔒', 'object', 'U+1F512', 'locked', 'lock', ['unlocked', 'key']),
  e('unlocked', '🔓', 'object', 'U+1F513', 'unlocked', 'open lock', ['locked', 'key']),

  /* ───────── object — 책상 위 ───────── */
  e('memo', '📝', 'object', 'U+1F4DD', 'memo', 'note taking', ['pencil', 'books']),
  e('pencil', '✏️', 'object', 'U+270F U+FE0F', 'pencil', 'pencil', ['memo', 'scissors']),
  e('pushpin', '📌', 'object', 'U+1F4CC', 'pushpin', 'pinned', ['memo']),
  e('scissors', '✂️', 'object', 'U+2702 U+FE0F', 'scissors', 'cut', ['pencil']),
  e('package', '📦', 'object', 'U+1F4E6', 'package', 'parcel', ['envelope']),
  e('envelope', '✉️', 'object', 'U+2709 U+FE0F', 'envelope', 'email', ['love-letter', 'package']),
  e('love-letter', '💌', 'object', 'U+1F48C', 'love letter', 'love letter', ['envelope', 'chocolate-bar']),
  e('books', '📚', 'object', 'U+1F4DA', 'books', 'studying', ['memo']),
  e('link', '🔗', 'object', 'U+1F517', 'link', 'hyperlink', ['chains']),
  e('chart-increasing', '📈', 'object', 'U+1F4C8', 'chart increasing', 'graph going up', ['chart-decreasing', 'bar-chart']),
  e('chart-decreasing', '📉', 'object', 'U+1F4C9', 'chart decreasing', 'graph going down', ['chart-increasing', 'bear']),
  e('bar-chart', '📊', 'object', 'U+1F4CA', 'bar chart', 'statistics', ['chart-increasing', 'chart-decreasing']),
];
