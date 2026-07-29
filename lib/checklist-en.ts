import type { Checklist } from './types';

/**
 * 영어 체크리스트.
 *
 * generator-en.ts와 같은 방침 — 한국어 128종을 옮기지 않고, 문화 의존이 없는
 * 주제만 골라 영어권 기준으로 새로 썼다. 연말정산·전세사기·공시처럼 한국 제도에
 * 묶인 항목은 영어로 옮겨봐야 아무 의미가 없어 제외했다.
 *
 * slug는 한국어와 같은 것만 맞춘다(moving↔moving). 한국어에 대응이 없는 항목은
 * 영어 전용 slug를 쓰고, hreflang도 걸지 않는다.
 */
export const CHECKLISTS_EN: Checklist[] = [
  {
    slug: 'moving',
    title: 'Moving House Checklist',
    desc: 'Everything from the lease to the first week in the new place',
    icon: '📦',
    category: 'Home & Life',
    sections: [
      {
        title: 'Admin & paperwork', icon: '📋',
        items: [
          { id: 'm01', text: 'Get quotes from at least three movers', note: 'Book 2–3 weeks ahead for the best rates' },
          { id: 'm02', text: 'Confirm the moving date and book it' },
          { id: 'm03', text: 'Give notice to your landlord in writing', note: 'Check the notice period in your lease' },
          { id: 'm04', text: 'Update your address with banks, employer and government' },
          { id: 'm05', text: 'Set up mail forwarding' },
          { id: 'm06', text: 'Agree the deposit return date and method' },
          { id: 'm07', text: 'Photograph the old place before you hand back the keys', note: 'Timestamped photos settle deposit disputes' },
        ],
      },
      {
        title: 'Packing', icon: '📦',
        items: [
          { id: 'm08', text: 'Collect boxes, tape and padding', note: 'Supermarkets often give boxes away free' },
          { id: 'm09', text: 'Sell, donate or bin what you will not take' },
          { id: 'm10', text: 'Put documents and valuables in one box you carry yourself' },
          { id: 'm11', text: 'Dismantle furniture and bag the screws to each piece' },
          { id: 'm12', text: 'Label every box with contents and destination room' },
          { id: 'm13', text: 'Run down the fridge and freezer', note: 'Start eating the frozen food a week out' },
          { id: 'm14', text: 'Drain the washing machine and fit the transit bolts' },
          { id: 'm15', text: 'Pack a first-night bag: bedding, towels, chargers, kettle' },
        ],
      },
      {
        title: 'The new place', icon: '🏠',
        items: [
          { id: 'm16', text: 'Check the condition of floors, walls and fittings' },
          { id: 'm17', text: 'Confirm water, electricity and gas are switched on' },
          { id: 'm18', text: 'Book the internet transfer or install', note: 'Order at least a week ahead — installs get booked up' },
          { id: 'm19', text: 'Change the locks or door codes' },
          { id: 'm20', text: 'Take meter readings on day one' },
          { id: 'm21', text: 'Photograph any existing damage before you unpack' },
        ],
      },
      {
        title: 'After moving in', icon: '✅',
        items: [
          { id: 'm22', text: 'Register with the local council or authority' },
          { id: 'm23', text: 'Find the stopcock, fuse box and bin collection day' },
          { id: 'm24', text: 'Update your driving licence and vehicle registration' },
          { id: 'm25', text: 'Test smoke and carbon monoxide alarms' },
          { id: 'm26', text: 'Introduce yourself to the neighbours' },
        ],
      },
    ],
  },
  {
    slug: 'travel-abroad',
    title: 'International Travel Checklist',
    desc: 'Documents, money, packing and the things people forget',
    icon: '✈️',
    category: 'Travel',
    sections: [
      {
        title: 'Before you book', icon: '🗓️',
        items: [
          { id: 't01', text: 'Check passport expiry', note: 'Many countries require six months validity from entry' },
          { id: 't02', text: 'Check whether you need a visa or travel authorisation' },
          { id: 't03', text: 'Check required or recommended vaccinations' },
          { id: 't04', text: 'Read the government travel advice for the country' },
          { id: 't05', text: 'Buy travel insurance that covers medical care' },
        ],
      },
      {
        title: 'Money & documents', icon: '💳',
        items: [
          { id: 't06', text: 'Tell your bank you are travelling, or check the card works abroad' },
          { id: 't07', text: 'Bring a second card kept separately from the first' },
          { id: 't08', text: 'Carry a small amount of local cash for arrival' },
          { id: 't09', text: 'Save copies of passport, insurance and bookings offline', note: 'A photo in your phone plus one printed copy' },
          { id: 't10', text: 'Check foreign transaction fees before you rely on a card' },
        ],
      },
      {
        title: 'Packing', icon: '🎒',
        items: [
          { id: 't11', text: 'Check the baggage allowance for every leg of the trip' },
          { id: 't12', text: 'Pack medication in hand luggage, in original packaging' },
          { id: 't13', text: 'Bring the right plug adapter and a power bank', note: 'Power banks must go in hand luggage' },
          { id: 't14', text: 'Keep liquids under the cabin limit in a clear bag' },
          { id: 't15', text: 'Pack one change of clothes in your hand luggage' },
        ],
      },
      {
        title: 'The day before', icon: '⏰',
        items: [
          { id: 't16', text: 'Check in online and download the boarding pass' },
          { id: 't17', text: 'Confirm airport transfer and how long it takes' },
          { id: 't18', text: 'Download offline maps and a translation pack' },
          { id: 't19', text: 'Set an out-of-office and tell someone your itinerary' },
          { id: 't20', text: 'Empty the fridge, take out the bins, unplug what you can' },
        ],
      },
    ],
  },
  {
    slug: 'job-interview',
    title: 'Job Interview Checklist',
    desc: 'Research, preparation and follow-up that actually moves the needle',
    icon: '💼',
    category: 'Work & Career',
    sections: [
      {
        title: 'Research', icon: '🔍',
        items: [
          { id: 'j01', text: 'Read the job description again and mark every requirement' },
          { id: 'j02', text: 'Prepare one concrete example for each requirement', note: 'Situation, what you did, what changed' },
          { id: 'j03', text: 'Read the company’s recent news, product and public numbers' },
          { id: 'j04', text: 'Look up who is interviewing you and what they work on' },
          { id: 'j05', text: 'Write down three questions you genuinely want answered' },
        ],
      },
      {
        title: 'Preparation', icon: '📝',
        items: [
          { id: 'j06', text: 'Rehearse your two-minute background out loud' },
          { id: 'j07', text: 'Prepare an honest answer for your biggest gap' },
          { id: 'j08', text: 'Know your salary range and the number you will not go under' },
          { id: 'j09', text: 'Test the video link, camera, mic and lighting', note: 'Do this the day before, not five minutes before' },
          { id: 'j10', text: 'Plan the route and add 30 minutes of buffer' },
        ],
      },
      {
        title: 'On the day', icon: '🎯',
        items: [
          { id: 'j11', text: 'Bring printed copies of your CV and any portfolio' },
          { id: 'j12', text: 'Arrive early enough to sit down and breathe' },
          { id: 'j13', text: 'Ask for clarification rather than guessing the question' },
          { id: 'j14', text: 'Take notes — it is not rude, it reads as engaged' },
          { id: 'j15', text: 'Ask about the next step and the timeline' },
        ],
      },
      {
        title: 'Afterwards', icon: '✉️',
        items: [
          { id: 'j16', text: 'Send a short thank-you note within 24 hours' },
          { id: 'j17', text: 'Write down the questions you fumbled while they are fresh' },
          { id: 'j18', text: 'Follow up once if the stated deadline passes' },
        ],
      },
    ],
  },
  {
    slug: 'remote-work',
    title: 'Remote Work Setup Checklist',
    desc: 'A desk, a routine and boundaries that hold',
    icon: '🏡',
    category: 'Work & Career',
    sections: [
      {
        title: 'The physical setup', icon: '🪑',
        items: [
          { id: 'r01', text: 'Get the screen to eye level', note: 'A stack of books works as well as a stand' },
          { id: 'r02', text: 'Chair height so feet are flat and elbows near 90°' },
          { id: 'r03', text: 'Put a light behind the camera, not behind you' },
          { id: 'r04', text: 'Use a separate keyboard and mouse if you are on a laptop' },
          { id: 'r05', text: 'Test your microphone — audio matters more than video' },
          { id: 'r06', text: 'Run a wired connection or sit close to the router' },
        ],
      },
      {
        title: 'Routine', icon: '⏰',
        items: [
          { id: 'r07', text: 'Set a fixed start and stop time and write it down' },
          { id: 'r08', text: 'Keep a commute substitute — a walk before and after' },
          { id: 'r09', text: 'Block focus time in the calendar so it is not eaten' },
          { id: 'r10', text: 'Take a real lunch away from the desk' },
          { id: 'r11', text: 'Get outside once during daylight' },
        ],
      },
      {
        title: 'Working with others', icon: '💬',
        items: [
          { id: 'r12', text: 'Agree response-time expectations with your team' },
          { id: 'r13', text: 'Over-share progress — visibility replaces being seen' },
          { id: 'r14', text: 'Set your working hours in the calendar and status' },
          { id: 'r15', text: 'Turn off notifications outside those hours' },
        ],
      },
    ],
  },
  {
    slug: 'gym-start',
    title: 'Starting at the Gym Checklist',
    desc: 'The first month, without the injuries or the quitting',
    icon: '💪',
    category: 'Health & Fitness',
    sections: [
      {
        title: 'Before you start', icon: '📋',
        items: [
          { id: 'g01', text: 'Decide how many days a week you can genuinely commit to', note: 'Two sustainable days beat five you abandon' },
          { id: 'g02', text: 'Pick a gym you pass anyway — distance kills adherence' },
          { id: 'g03', text: 'Check the contract length and cancellation terms' },
          { id: 'g04', text: 'See a doctor first if you have a heart, joint or blood pressure condition' },
          { id: 'g05', text: 'Take a starting photo and measurements, not just weight' },
        ],
      },
      {
        title: 'Kit', icon: '👟',
        items: [
          { id: 'g06', text: 'Proper training shoes with a flat, stable sole' },
          { id: 'g07', text: 'Clothes you can move in and are not self-conscious about' },
          { id: 'g08', text: 'Water bottle and a small towel' },
          { id: 'g09', text: 'Lock for the locker' },
        ],
      },
      {
        title: 'The first month', icon: '🏋️',
        items: [
          { id: 'g10', text: 'Learn form before load — book one induction or session' },
          { id: 'g11', text: 'Start lighter than your ego wants', note: 'Soreness for four days is a sign you overdid it' },
          { id: 'g12', text: 'Log every session — what, how much, how it felt' },
          { id: 'g13', text: 'Warm up five minutes before, stretch after' },
          { id: 'g14', text: 'Rest at least one full day between hard sessions' },
          { id: 'g15', text: 'Eat enough protein and sleep enough — that is where the change happens' },
        ],
      },
    ],
  },
  {
    slug: 'online-security',
    title: 'Online Security Checklist',
    desc: 'The account hygiene that actually prevents a bad day',
    icon: '🔐',
    category: 'Digital',
    sections: [
      {
        title: 'Passwords', icon: '🔑',
        items: [
          { id: 's01', text: 'Install a password manager and let it generate everything' },
          { id: 's02', text: 'Change any password reused across more than one site', note: 'Reuse is what turns one breach into ten' },
          { id: 's03', text: 'Make the email password the strongest one you have' },
          { id: 's04', text: 'Check your addresses on a breach notification service' },
        ],
      },
      {
        title: 'Two-factor', icon: '📱',
        items: [
          { id: 's05', text: 'Turn on two-factor for email, banking and cloud storage' },
          { id: 's06', text: 'Prefer an authenticator app over SMS', note: 'SIM swapping defeats SMS codes' },
          { id: 's07', text: 'Save the backup codes somewhere offline' },
          { id: 's08', text: 'Register a second device so losing one phone is not a lockout' },
        ],
      },
      {
        title: 'Devices & accounts', icon: '💻',
        items: [
          { id: 's09', text: 'Turn on automatic updates for OS and browser' },
          { id: 's10', text: 'Enable full-disk encryption and a screen lock' },
          { id: 's11', text: 'Review which apps have access to your Google/Apple account' },
          { id: 's12', text: 'Remove old devices and sessions you no longer use' },
          { id: 's13', text: 'Set up device tracking and remote wipe' },
        ],
      },
      {
        title: 'Habits', icon: '🧠',
        items: [
          { id: 's14', text: 'Type the address yourself for anything involving money' },
          { id: 's15', text: 'Treat urgency in a message as the warning sign it usually is' },
          { id: 's16', text: 'Back up to somewhere the computer cannot reach on its own', note: 'Ransomware encrypts connected drives too' },
        ],
      },
    ],
  },
  {
    slug: 'new-laptop',
    title: 'New Computer Setup Checklist',
    desc: 'Set it up once, properly, instead of fixing it for a month',
    icon: '💻',
    category: 'Digital',
    sections: [
      {
        title: 'First hour', icon: '⚡',
        items: [
          { id: 'n01', text: 'Run all system updates before anything else' },
          { id: 'n02', text: 'Create a non-admin account for daily use if you can' },
          { id: 'n03', text: 'Turn on disk encryption' },
          { id: 'n04', text: 'Set a screen lock and a short auto-lock timer' },
          { id: 'n05', text: 'Sign in to the password manager first — everything else needs it' },
        ],
      },
      {
        title: 'Migration', icon: '📁',
        items: [
          { id: 'n06', text: 'Verify the backup of the old machine before wiping anything' },
          { id: 'n07', text: 'Move files deliberately rather than cloning the clutter' },
          { id: 'n08', text: 'Deauthorise the old machine from licensed software' },
          { id: 'n09', text: 'Export browser bookmarks and any local app data' },
        ],
      },
      {
        title: 'Setup', icon: '⚙️',
        items: [
          { id: 'n10', text: 'Install only what you actually used on the old machine' },
          { id: 'n11', text: 'Set up cloud sync for documents' },
          { id: 'n12', text: 'Configure automatic backups and test a restore', note: 'A backup you have never restored is a guess' },
          { id: 'n13', text: 'Set display scaling, keyboard repeat and trackpad to taste' },
          { id: 'n14', text: 'Note the serial number and register the warranty' },
        ],
      },
    ],
  },
  {
    slug: 'camping',
    title: 'Camping Checklist',
    desc: 'Shelter, warmth, food and the small things that ruin a trip',
    icon: '🏕️',
    category: 'Travel',
    sections: [
      {
        title: 'Shelter & sleep', icon: '⛺',
        items: [
          { id: 'c01', text: 'Pitch the tent at home once before you go', note: 'Find the missing pole in the garden, not at dusk' },
          { id: 'c02', text: 'Sleeping bag rated for the actual night-time low' },
          { id: 'c03', text: 'Sleeping mat — the cold comes from underneath' },
          { id: 'c04', text: 'Pegs, guy lines and a mallet' },
          { id: 'c05', text: 'Tarp or footprint for under the tent' },
        ],
      },
      {
        title: 'Cooking & water', icon: '🍳',
        items: [
          { id: 'c06', text: 'Stove, fuel and a lighter plus backup matches' },
          { id: 'c07', text: 'Pan, mug, plate, cutlery, sharp knife' },
          { id: 'c08', text: 'Water containers and a way to purify if needed' },
          { id: 'c09', text: 'Cool box and ice packs for the first two days' },
          { id: 'c10', text: 'Bin bags — pack out everything you bring in' },
        ],
      },
      {
        title: 'Clothing & safety', icon: '🧥',
        items: [
          { id: 'c11', text: 'Layers, including one warm layer more than you think' },
          { id: 'c12', text: 'Waterproof jacket regardless of the forecast' },
          { id: 'c13', text: 'Head torch and spare batteries' },
          { id: 'c14', text: 'First aid kit, painkillers and any personal medication' },
          { id: 'c15', text: 'Power bank and an offline map', note: 'Assume no signal at the site' },
          { id: 'c16', text: 'Tell someone where you are going and when you are back' },
        ],
      },
    ],
  },
  {
    slug: 'sleep-better',
    title: 'Better Sleep Checklist',
    desc: 'The changes with actual evidence behind them',
    icon: '😴',
    category: 'Health & Fitness',
    sections: [
      {
        title: 'Timing', icon: '⏰',
        items: [
          { id: 'b01', text: 'Get up at the same time every day, weekends included', note: 'Wake time anchors the rhythm more than bedtime does' },
          { id: 'b02', text: 'Get daylight within an hour of waking' },
          { id: 'b03', text: 'Stop caffeine 8–10 hours before bed' },
          { id: 'b04', text: 'Keep naps under 30 minutes and before mid-afternoon' },
        ],
      },
      {
        title: 'Environment', icon: '🛏️',
        items: [
          { id: 'b05', text: 'Make the room properly dark' },
          { id: 'b06', text: 'Keep it cool — around 18°C suits most people' },
          { id: 'b07', text: 'Move the phone charger out of arm’s reach' },
          { id: 'b08', text: 'Use the bed for sleep only, not work' },
        ],
      },
      {
        title: 'Before bed', icon: '🌙',
        items: [
          { id: 'b09', text: 'Dim the lights an hour before' },
          { id: 'b10', text: 'Avoid alcohol as a sleep aid — it fragments the second half of the night' },
          { id: 'b11', text: 'Write tomorrow’s list down so you stop rehearsing it' },
          { id: 'b12', text: 'If you are awake 20 minutes, get up and do something dull in low light' },
        ],
      },
    ],
  },
  {
    slug: 'wedding',
    title: 'Wedding Planning Checklist',
    desc: 'Twelve months down to the day itself',
    icon: '💍',
    category: 'Events',
    sections: [
      {
        title: '12–9 months out', icon: '📅',
        items: [
          { id: 'w01', text: 'Agree the total budget and who is contributing' },
          { id: 'w02', text: 'Draft the guest list — it drives every other cost' },
          { id: 'w03', text: 'Book the venue and lock the date' },
          { id: 'w04', text: 'Book the officiant or registrar' },
          { id: 'w05', text: 'Book photographer and any band or DJ', note: 'These book out furthest ahead' },
        ],
      },
      {
        title: '9–3 months out', icon: '📋',
        items: [
          { id: 'w06', text: 'Order outfits and schedule fittings' },
          { id: 'w07', text: 'Confirm catering and run a tasting' },
          { id: 'w08', text: 'Send invitations and set an RSVP deadline' },
          { id: 'w09', text: 'Sort the legal paperwork and any name-change requirements' },
          { id: 'w10', text: 'Arrange transport and accommodation blocks for guests' },
        ],
      },
      {
        title: 'Final month', icon: '⏳',
        items: [
          { id: 'w11', text: 'Give final numbers to the caterer' },
          { id: 'w12', text: 'Write and share the running order with every supplier' },
          { id: 'w13', text: 'Assign someone to hold the rings, documents and payments' },
          { id: 'w14', text: 'Confirm arrival times with everyone in writing' },
          { id: 'w15', text: 'Build a wet-weather plan if anything is outdoors' },
        ],
      },
      {
        title: 'The day', icon: '💐',
        items: [
          { id: 'w16', text: 'Eat breakfast — genuinely, people forget' },
          { id: 'w17', text: 'Emergency kit: safety pins, plasters, stain remover, painkillers' },
          { id: 'w18', text: 'Hand your phone to someone else' },
          { id: 'w19', text: 'Take ten minutes alone together during the day' },
        ],
      },
    ],
  },
  {
    slug: 'language-learning',
    title: 'Learning a Language Checklist',
    desc: 'Set it up so you are still going in three months',
    icon: '🗣️',
    category: 'Learning',
    sections: [
      {
        title: 'Setting up', icon: '🎯',
        items: [
          { id: 'l01', text: 'Write down why — the specific situation you want to handle' },
          { id: 'l02', text: 'Pick a daily minimum small enough to never skip', note: 'Ten honest minutes beats a heroic hour twice' },
          { id: 'l03', text: 'Choose one main course and stop shopping for others' },
          { id: 'l04', text: 'Learn the sound system before piling on vocabulary' },
        ],
      },
      {
        title: 'Daily practice', icon: '📚',
        items: [
          { id: 'l05', text: 'Use spaced repetition for vocabulary' },
          { id: 'l06', text: 'Learn words in phrases, not as isolated pairs' },
          { id: 'l07', text: 'Listen to something every day, even passively' },
          { id: 'l08', text: 'Say things out loud from week one' },
          { id: 'l09', text: 'Keep a running list of the words you actually needed and lacked' },
        ],
      },
      {
        title: 'Making it stick', icon: '🌱',
        items: [
          { id: 'l10', text: 'Book a regular conversation partner or tutor' },
          { id: 'l11', text: 'Switch one thing you already consume into the language' },
          { id: 'l12', text: 'Track streak length, not hours' },
          { id: 'l13', text: 'Expect a plateau at the intermediate stage and plan through it' },
        ],
      },
    ],
  },
  {
    slug: 'declutter',
    title: 'Decluttering Checklist',
    desc: 'A room-by-room pass that does not stall halfway',
    icon: '🧹',
    category: 'Home & Life',
    sections: [
      {
        title: 'Before you start', icon: '📦',
        items: [
          { id: 'd01', text: 'Set out four containers: keep, donate, sell, bin' },
          { id: 'd02', text: 'Book a slot for the charity run or collection now', note: 'Bags that sit in the hall come back out of the bags' },
          { id: 'd03', text: 'Start with one drawer, not the whole house' },
          { id: 'd04', text: 'Work by category rather than by room where you can' },
        ],
      },
      {
        title: 'Room by room', icon: '🏠',
        items: [
          { id: 'd05', text: 'Wardrobe: anything unworn for a year' },
          { id: 'd06', text: 'Kitchen: duplicate utensils and expired everything' },
          { id: 'd07', text: 'Bathroom: old medication and dead cosmetics' },
          { id: 'd08', text: 'Cables and chargers with nothing left to charge' },
          { id: 'd09', text: 'Paperwork: scan what you need, shred the rest' },
          { id: 'd10', text: 'The drawer everything gets thrown into' },
        ],
      },
      {
        title: 'Keeping it that way', icon: '✅',
        items: [
          { id: 'd11', text: 'One in, one out for clothes and kitchen items' },
          { id: 'd12', text: 'Give every category a fixed home' },
          { id: 'd13', text: 'Do a ten-minute reset at the end of the day' },
          { id: 'd14', text: 'Put a 24-hour delay on non-essential purchases' },
        ],
      },
    ],
  },
];

export const CHECKLISTS_EN_MAP: Record<string, Checklist> = Object.fromEntries(
  CHECKLISTS_EN.map(c => [c.slug, c]),
);
