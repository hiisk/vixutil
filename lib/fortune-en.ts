/* ────────────────────────────────────────────────
   영어 운세 데이터 — vixutil.com

   generator-en.ts와 같은 방침이다. 한국어 풀을 한 줄씩 옮기지 않고
   영어권 독자가 읽었을 때 자연스러운 문장으로 새로 썼다. 운세 문구는
   직역하면 어색해지는 대표적인 장르라, 번역보다 재작성이 품질이 높다.

   id는 한국어 데이터와 동일하게 맞춰 hreflang이 ko↔en을 짝지을 수 있게 한다.
   (예: /fortune/zodiac?id=aries ↔ /en/fortune/zodiac?id=aries)
──────────────────────────────────────────────── */

/* ── 별자리 ── */
export const ZODIAC_SIGNS_EN = [
  { id: 'aries',       name: 'Aries',       emoji: '♈', period: 'Mar 21 – Apr 19', element: 'Fire',  ruling: 'Mars' },
  { id: 'taurus',      name: 'Taurus',      emoji: '♉', period: 'Apr 20 – May 20', element: 'Earth', ruling: 'Venus' },
  { id: 'gemini',      name: 'Gemini',      emoji: '♊', period: 'May 21 – Jun 21', element: 'Air',   ruling: 'Mercury' },
  { id: 'cancer',      name: 'Cancer',      emoji: '♋', period: 'Jun 22 – Jul 22', element: 'Water', ruling: 'Moon' },
  { id: 'leo',         name: 'Leo',         emoji: '♌', period: 'Jul 23 – Aug 22', element: 'Fire',  ruling: 'Sun' },
  { id: 'virgo',       name: 'Virgo',       emoji: '♍', period: 'Aug 23 – Sep 22', element: 'Earth', ruling: 'Mercury' },
  { id: 'libra',       name: 'Libra',       emoji: '♎', period: 'Sep 23 – Oct 23', element: 'Air',   ruling: 'Venus' },
  { id: 'scorpio',     name: 'Scorpio',     emoji: '♏', period: 'Oct 24 – Nov 22', element: 'Water', ruling: 'Pluto' },
  { id: 'sagittarius', name: 'Sagittarius', emoji: '♐', period: 'Nov 23 – Dec 21', element: 'Fire',  ruling: 'Jupiter' },
  { id: 'capricorn',   name: 'Capricorn',   emoji: '♑', period: 'Dec 22 – Jan 19', element: 'Earth', ruling: 'Saturn' },
  { id: 'aquarius',    name: 'Aquarius',    emoji: '♒', period: 'Jan 20 – Feb 18', element: 'Air',   ruling: 'Uranus' },
  { id: 'pisces',      name: 'Pisces',      emoji: '♓', period: 'Feb 19 – Mar 20', element: 'Water', ruling: 'Neptune' },
] as const;

/* ── 십이지 ── */
export const ANIMALS_EN = [
  { id: 'rat',     name: 'Rat',     emoji: '🐭', trait: 'Clever · adaptable' },
  { id: 'ox',      name: 'Ox',      emoji: '🐂', trait: 'Steady · patient' },
  { id: 'tiger',   name: 'Tiger',   emoji: '🐯', trait: 'Brave · driven' },
  { id: 'rabbit',  name: 'Rabbit',  emoji: '🐰', trait: 'Gentle · perceptive' },
  { id: 'dragon',  name: 'Dragon',  emoji: '🐲', trait: 'Charismatic · ambitious' },
  { id: 'snake',   name: 'Snake',   emoji: '🐍', trait: 'Intuitive · careful' },
  { id: 'horse',   name: 'Horse',   emoji: '🐴', trait: 'Spirited · free' },
  { id: 'goat',    name: 'Goat',    emoji: '🐑', trait: 'Artistic · kind' },
  { id: 'monkey',  name: 'Monkey',  emoji: '🐒', trait: 'Witty · curious' },
  { id: 'rooster', name: 'Rooster', emoji: '🐓', trait: 'Precise · driven' },
  { id: 'dog',     name: 'Dog',     emoji: '🐕', trait: 'Loyal · principled' },
  { id: 'pig',     name: 'Pig',     emoji: '🐷', trait: 'Generous · fortunate' },
] as const;

/* ── 혈액형 ── */
export const BLOOD_TYPES_EN = [
  { id: 'A',  name: 'Type A',  emoji: '🅰️', nickname: 'The Careful Planner',  trait: 'Thoughtful · precise' },
  { id: 'B',  name: 'Type B',  emoji: '🅱️', nickname: 'The Free Spirit',      trait: 'Curious · independent' },
  { id: 'O',  name: 'Type O',  emoji: '🅾️', nickname: 'The Natural Leader',   trait: 'Warm · decisive' },
  { id: 'AB', name: 'Type AB', emoji: '🆎', nickname: 'The Quiet Strategist', trait: 'Rational · original' },
] as const;

/* ── 운세 텍스트 풀 ── */
export const FORTUNE_POOL_EN = {
  overall: [
    'Your energy peaks today. Whatever you have been putting off, this is the moment to take the first step without overthinking it.',
    'Luck arrives through other people today. Reach out to someone you have lost touch with — the reply may carry better news than you expect.',
    'This is a day for looking around rather than rushing forward. Decisions made after a pause will hold up far better than quick ones.',
    'A door is open just a crack today. Pay attention to the small signal you would normally walk past; the answer you want is hiding inside it.',
    'Ideas come easily today. Write them down the moment they arrive — one of them will matter more than it seems right now.',
    'Small things bring disproportionate satisfaction today. Noticing what is already good will make the whole day feel richer.',
    'What you planned moves smoothly today. If you prepared carefully, the results start showing now. Go in with confidence.',
    'Unexpected help or information reaches you today. Listen with an open mind and the knot you have been stuck on will loosen.',
    'Patience is the theme today. Results may not appear immediately, but steady steps compound into something worth having.',
    'Looking after yourself matters more than usual today. Even a short pause inside a busy day will refill the tank.',
    'Communication is the key to everything today. If a misunderstanding has formed, address it directly and honestly — clarity comes quickly.',
    'Courage in the face of change is what today asks for. Stepping outside the familiar leads somewhere better than staying put.',
    'Today’s effort always comes back as tomorrow’s result. Keep your eyes on the goal rather than the obstacle in front of it.',
    'Collaboration shines today. Accepting help instead of doing it all alone gets you a noticeably better outcome.',
    'Trust your instincts today. Even if you cannot explain the reasoning, follow the direction your gut is pointing.',
    'Flexibility beats the plan today. The variable you did not expect may steer you somewhere better than the original route.',
    'Focus comes easily today. Cut the distractions, sink into the one task that matters, and you will outperform a normal day.',
    'A small kindness creates a large change today. One warm sentence to someone nearby will find its way back to you.',
    'Today is good for closing the old and preparing the new. Clearing out a stale feeling or relationship lets fresh energy in.',
    'Humility drives growth today. Approaching things as a learner rather than an expert will teach you something unexpected.',
    'The mood today is one of finishing. Tie off the loose ends you have been leaving open and a real lightness follows.',
    'Recognition finds you today. The work you have quietly been doing is finally becoming visible — let yourself feel it.',
    'Handle small expenses and small promises carefully today. Attention to detail is what keeps the day clean.',
    'Standing back serves you better than stepping forward today. Read the current quietly and the opening will show itself.',
    'Body and mind are in sync today. Whatever you have been wanting to do, doing it now will feel satisfying.',
    'Welcome news may arrive from an unexpected direction. Start the day with an open mind.',
    'Your mood may swing today, so push important conversations and decisions to a calmer hour.',
    'A small act of courage today creates a large change tomorrow. Take the step you have been deferring.',
    'Working with someone else is the lucky key today. Together you will get further than alone.',
    'A decisive signal arrives on something you have prepared for a long time. Do not hesitate — take hold of it.',
  ],
  love: [
    'Honest words land well today. Saying the thing you have been holding back will bring you closer, not further apart.',
    'A small gesture matters more than a grand one today. Being remembered is what makes someone feel loved.',
    'Listening is worth more than speaking today. Hearing what is underneath the words will change how the day goes.',
    'A new connection may begin somewhere ordinary. Stay open in the places you pass through without thinking.',
    'If tension has been building, today is a good day to address it gently rather than let it settle further.',
    'Time spent together matters more than money spent today. Presence is the gift.',
    'Give the other person room today. Space, offered generously, often brings someone closer than pressure does.',
    'An old feeling may resurface. Look at it honestly, then decide whether it belongs in your present.',
    'Warmth you show without expecting anything back comes home to you today, sometimes from a different direction.',
    'Do not read too much into a short reply today. Assume the kinder explanation and you will usually be right.',
    'Today is good for saying the ordinary thing out loud — thank you, I noticed, I am glad you are here.',
    'If you have been waiting for the other person to move first, today rewards the one who moves.',
    'Shared laughter does more repair work than a serious conversation today.',
    'Someone is paying more attention to you than they let on. Give them an easy opening.',
    'Protect your own limits today, even in a relationship that matters. Honesty about capacity is a kind of care.',
    'A plan made together today will be remembered longer than the day itself.',
    'Do not compare your relationship to anyone else’s today. The measure that matters is your own.',
    'If distance has crept in quietly, one small deliberate contact is enough to close it.',
    'Being understood matters more than being agreed with today. Aim for the first.',
    'A moment of patience today prevents a week of repair. Let the sharp reply go unsaid.',
    'Affection expressed in your own natural way lands better today than any borrowed script.',
    'Someone may need reassurance they are not asking for. Offer it before it is requested.',
    'Today favours starting slow. A connection built without rushing holds its shape.',
    'Forgiveness offered today costs less than it will next week.',
  ],
  money: [
    'Money flows steadily today, but the small leaks are what deserve attention. Check what renews automatically.',
    'An unexpected expense may appear. It will feel smaller if you meet it calmly rather than resisting it.',
    'Today is good for planning rather than spending. An hour with the numbers is worth more than a bargain.',
    'A source of income you had not counted on shows a first sign today. Follow it with curiosity, not urgency.',
    'Resist the purchase you can picture regretting. If it will still make sense next week, buy it next week.',
    'Lending or borrowing today is best documented clearly, even between people who trust each other.',
    'A long-term decision beats a quick gain today. Ask what this looks like in a year.',
    'Comparing prices pays off today more than usual. A few minutes of checking saves a real amount.',
    'Money spent on something that lasts feels better today than money spent on something that impresses.',
    'A small, boring, automatic habit started today compounds into something that matters.',
    'Review a subscription or fee you have stopped noticing. It is quietly costing more than you think.',
    'Advice about money today should be weighed, not swallowed. Check who benefits from you following it.',
    'Today favours patience over timing. Waiting is a position too.',
    'A shared cost is worth settling today rather than letting it drift into awkwardness.',
    'Spending on health or rest today returns more than it costs.',
    'If a deal feels rushed, the rush is the warning. Slow it down and the truth surfaces.',
    'Today is good for asking about something you have been assuming — a rate, a fee, a condition.',
    'Set aside a small amount today without a destination for it. Optionality has value.',
    'A gift or treat within your means lifts the whole day. Generosity does not require excess.',
    'Reviewing what you already own may remove the need to buy anything at all today.',
    'Income arrives more reliably than expected today. Do not spend it in advance.',
    'The cheapest option is not the least expensive one today. Weigh how long it lasts.',
  ],
  health: [
    'Sleep is the lever today. One earlier night resets more than any supplement.',
    'Your body has been sending a small signal for a while. Today is a good day to stop ignoring it.',
    'Movement matters more than intensity today. A walk counts.',
    'Hydration and daylight will do more for your mood today than caffeine will.',
    'Tension is collecting in your shoulders and jaw. Notice it, release it, repeat.',
    'Eat something that takes a little effort to prepare today. It changes how the meal feels.',
    'A short break taken deliberately beats a long one taken in collapse.',
    'Today favours gentle consistency over ambitious plans you will abandon by Thursday.',
    'Screens are draining you more than the work is. Put distance between you and the glow.',
    'Stretching for five minutes today will feel disproportionately good.',
    'Your energy dips mid-afternoon today. Plan the demanding thing for the morning.',
    'Fresh air changes your thinking today, not just your lungs. Step outside.',
    'Do not push through pain today. Rest is the productive choice.',
    'A regular meal schedule steadies your mood today more than the food itself does.',
    'Today is good for booking the appointment you have been postponing.',
    'Breathing slowly for one minute resets your nervous system faster than you expect.',
    'Alcohol or sugar will cost more than they give today. Keep them light.',
    'Company is good for your health today. Do the exercise with someone.',
    'Warmth helps today — a bath, a blanket, a hot drink. Let your body soften.',
    'Rest without guilt today. Recovery is part of the work, not a break from it.',
    'Posture is quietly affecting your energy today. Sit up, unclench, breathe out.',
  ],
  work: [
    'Deep focus is available today. Protect a block of time and use it on the thing that actually matters.',
    'A colleague’s perspective saves you time today. Ask before you build.',
    'Today favours finishing over starting. Close something.',
    'Your work is being noticed by someone who has not said so yet. Keep the standard up.',
    'Say no to one thing today so you can say yes properly to another.',
    'A problem you have been circling will yield if you break it into smaller pieces.',
    'Write it down today. The clarity comes from the writing, not before it.',
    'A difficult conversation at work goes better today than it will if you keep delaying it.',
    'Today is good for cleaning up — files, tabs, the list you stopped trusting.',
    'Do not take on the extra task today. Capacity is a resource, not a character flaw.',
    'Ask the question you think is too basic. Half the room is wondering the same thing.',
    'A small process improvement today saves you hours over the coming weeks.',
    'Your judgement is sharper than your confidence today. Trust the first one.',
    'Credit shared generously today comes back to you with interest.',
    'Today rewards preparation over improvisation. Do the reading.',
    'A setback today is information, not a verdict. Adjust and continue.',
    'Momentum matters more than perfection today. Ship the good version.',
    'Someone junior to you needs ten minutes. Those ten minutes will pay off.',
    'Check the assumption everyone is working from today. It may have quietly expired.',
    'A new opportunity appears in a conversation rather than a posting today. Stay curious.',
    'Set the boundary now rather than after it has been crossed twice.',
  ],
};

/* ── 오늘의 조언 ── */
export const ADVICE_POOL_EN = [
  'Do the small thing first. Momentum is easier to borrow than to build.',
  'You do not have to answer immediately. "Let me think about it" is a full sentence.',
  'Choose the option you would still respect in a year.',
  'Say the kind thing out loud. The thought alone does not reach anyone.',
  'Not overdoing it is also an achievement today.',
  'You are doing better than you are giving yourself credit for. Say that to yourself once.',
  'If change feels large, change one very small thing instead.',
  'Effort spent today is never wasted, even when the result is delayed.',
  'Take the advice, but make the decision yourself.',
  'Rest before you are empty, not after.',
  'The person you are avoiding is usually the conversation you need.',
  'Progress that is boring is still progress.',
  'Let the small annoyance go. It is not worth today’s energy.',
  'Ask for what you want plainly. People are worse at hints than you think.',
  'Finish one open loop before opening another.',
  'Being kind to yourself is not the same as letting yourself off.',
  'The best time to start was earlier. The second best is now.',
  'Protect your attention today the way you would protect your money.',
  'Do the version you can sustain, not the version that looks impressive.',
  'If you are unsure, choose the reversible option.',
  'Someone would be glad to hear from you today.',
  'Trust the pattern, not the single data point.',
  'You are allowed to change your mind with new information.',
  'One honest sentence beats an hour of careful avoidance.',
];

/* ── 행운의 아이템 ── */
export const LUCKY_ITEMS_EN = [
  'a warm coffee', 'a wristwatch', 'a green plant', 'a scented candle', 'a notebook and pen',
  'headphones', 'a small mirror', 'a tumbler', 'a ring', 'a scarf',
  'a good book', 'a leather wallet', 'running shoes', 'a handkerchief', 'a mug',
  'a hat', 'sunglasses', 'lip balm', 'a tote bag', 'a keyring',
  'a favourite perfume', 'a hot tea', 'a diary', 'wireless earbuds', 'an umbrella',
  'a bracelet', 'a reading light', 'a fountain pen', 'a calendar', 'a bluetooth speaker',
  'an aroma oil', 'a hand warmer', 'a coin purse', 'a bookmark', 'a small plant pot',
];

/* ── 오늘의 키워드 ── */
export const KEYWORD_POOL_EN = [
  'Challenge', 'Rest', 'Connection', 'Focus', 'Courage', 'Balance', 'Beginning', 'Order',
  'Gratitude', 'Ease', 'Growth', 'Trust', 'Change', 'Stability', 'Expression', 'Care',
  'Decision', 'Flow', 'Recovery', 'Anticipation', 'Freedom', 'Passion', 'Calm', 'Opportunity',
  'Patience', 'Optimism', 'Honesty', 'Flexibility', 'Warmth', 'Clarity',
];

/* ── 행운 색 ── */
export const LUCKY_COLORS_EN: [string, string][] = [
  ['Red',    '#ef4444'],
  ['Orange', '#f97316'],
  ['Yellow', '#eab308'],
  ['Green',  '#22c55e'],
  ['Blue',   '#3b82f6'],
  ['Indigo', '#6366f1'],
  ['Purple', '#a855f7'],
  ['Pink',   '#ec4899'],
  ['White',  '#f1f5f9'],
  ['Gold',   '#f59e0b'],
  ['Silver', '#94a3b8'],
  ['Mint',   '#14b8a6'],
];

export const LUCKY_DIRECTIONS_EN = ['East', 'West', 'South', 'North', 'Southeast', 'Southwest'];

/* ── 탄생석·탄생화 ──
   보석·꽃 자체는 실제로 통용되는 정보라 언어만 바꾸면 되고, blurb만 새로 썼다. */
export const BIRTH_INFO_EN = [
  { month: 1,  stone: 'Garnet',     emoji: '❤️',   color: '#9b1b30', stoneMeaning: 'Truth · friendship · a constant heart', flower: 'Carnation',   flowerMeaning: 'Love and fascination',
    blurb: 'January people tend to be steady and dependable. Once they commit to someone, they see it through — loyalty is the whole personality.' },
  { month: 2,  stone: 'Amethyst',   emoji: '🟣',   color: '#8b5cf6', stoneMeaning: 'Peace · sincerity · a settled mind',     flower: 'Freesia',     flowerMeaning: 'Innocence and joy',
    blurb: 'February people are calm on the surface and deep underneath. They rarely make noise about it, but their inner world is solidly their own.' },
  { month: 3,  stone: 'Aquamarine', emoji: '🩵',   color: '#7fd4d4', stoneMeaning: 'Youth · happiness · courage',            flower: 'Daffodil',    flowerMeaning: 'Pride and mystery',
    blurb: 'March people carry a clear, unbound energy. They have a knack for making any room feel a little lighter than it was.' },
  { month: 4,  stone: 'Diamond',    emoji: '💎',   color: '#b9f2ff', stoneMeaning: 'Forever · purity · strength',            flower: 'Daisy',       flowerMeaning: 'Purity and hope',
    blurb: 'April people have a hard core under a soft surface. Gentle most of the time, immovable when it actually counts.' },
  { month: 5,  stone: 'Emerald',    emoji: '💚',   color: '#2ecc71', stoneMeaning: 'Happiness · love · hope',                flower: 'Lily of the Valley', flowerMeaning: 'The return of happiness',
    blurb: 'May people are warm and full of life. Being near them is genuinely calming — that is the energy they give off without trying.' },
  { month: 6,  stone: 'Pearl',      emoji: '🤍',   color: '#f4f0e6', stoneMeaning: 'Health · long life · purity',            flower: 'Rose',        flowerMeaning: 'Love and passion',
    blurb: 'June people are understated but unmistakably present. Inside the soft exterior sits a quiet, elegant self-assurance.' },
  { month: 7,  stone: 'Ruby',       emoji: '❤️‍🔥', color: '#e0115f', stoneMeaning: 'Passion · courage · love',               flower: 'Lily',        flowerMeaning: 'Purity and dignity',
    blurb: 'July people run hot. When they love something they go all in, and the surrounding room tends to catch it from them.' },
  { month: 8,  stone: 'Peridot',    emoji: '🫒',   color: '#9bbb59', stoneMeaning: 'Marital happiness · peace',              flower: 'Sunflower',   flowerMeaning: 'Adoration and longing',
    blurb: 'August people are bright and forward-facing. Like the sunflower, they turn toward the good side of things and light up whatever is nearby.' },
  { month: 9,  stone: 'Sapphire',   emoji: '🔷',   color: '#0f52ba', stoneMeaning: 'Sincerity · truth · wisdom',             flower: 'Aster',       flowerMeaning: 'Memory and faith',
    blurb: 'September people are grounded and easy to trust. They prove things by doing rather than saying, and the depth shows over time.' },
  { month: 10, stone: 'Opal',       emoji: '🌈',   color: '#a8c3bc', stoneMeaning: 'Hope · purity · creativity',             flower: 'Cosmos',      flowerMeaning: 'Sincerity and harmony',
    blurb: 'October people have unusual taste and a distinct edge. Like opal, a different facet catches the light from every angle.' },
  { month: 11, stone: 'Topaz',      emoji: '🟡',   color: '#ffc87c', stoneMeaning: 'Friendship · patience · hope',           flower: 'Chrysanthemum', flowerMeaning: 'Nobility and truth',
    blurb: 'November people are warm and stubborn in the best sense. They do not rush, they simply keep walking their own road until they arrive.' },
  { month: 12, stone: 'Turquoise',  emoji: '🩵',   color: '#30d5c8', stoneMeaning: 'Success · prosperity · good fortune',    flower: 'Poinsettia',  flowerMeaning: 'Blessing and celebration',
    blurb: 'December people carry luck with them. They mix easily with others and have a way of pulling good relationships toward themselves.' },
] as const;

/* ── 바이오리듬 ── */
export const CYCLES_EN = [
  { key: 'physical',     label: 'Physical',     period: 23, emoji: '💪', desc: 'Stamina · endurance · drive' },
  { key: 'emotional',    label: 'Emotional',    period: 28, emoji: '💗', desc: 'Mood · sensitivity · creativity' },
  { key: 'intellectual', label: 'Intellectual', period: 33, emoji: '🧠', desc: 'Focus · judgement · memory' },
] as const;

export const PHASE_LABEL_EN = { high: 'High', low: 'Low', critical: 'Critical day' } as const;

export const BIORHYTHM_COMMENT_EN = {
  multiCritical: (names: string) => `${names} are both at a critical day. Your condition may swing, so postpone anything demanding and stick to your usual routine.`,
  oneCritical:   (name: string)  => `Your ${name.toLowerCase()} rhythm is at a turning point. Watch how you feel before pushing anything related to it.`,
  veryHigh: 'All three rhythms are running high. A good day to start what you have been putting off.',
  high:     'Overall the flow is steady. Keep your usual pace.',
  mid:      'Your rhythms sit around the middle. Adjust your plans to how you actually feel.',
  low:      'A somewhat flat stretch. Better to tidy up and rest than to start something new.',
  veryLow:  'All three rhythms are low. Rest properly and push important decisions back a few days.',
};
