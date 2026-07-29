import type { Generator } from './types';

/**
 * 영어 생성기 데이터.
 *
 * Search Console 기준 최다 유입 검색어가 "판타지 이름 생성기"이고, 영어권에서
 * "fantasy name generator" 계열 검색량이 매우 크다. 생성기는 문화색이 옅고
 * combine/pick 로직이 언어 중립이라 영어화 ROI가 가장 높다.
 *
 * slug는 한국어 생성기와 동일하게 맞춰, hreflang이 ko↔en을 slug로 짝지을 수 있게 한다.
 * (예: /generator/fantasy-name ↔ /en/generator/fantasy-name)
 */
export const GENERATORS_EN: Generator[] = [
  {
    slug: 'fantasy-name', title: 'Fantasy Name Generator',
    desc: 'Elf, mage, knight & dragon-style fantasy names.',
    icon: '🧙', category: 'Fantasy', type: 'combine', separator: ' ',
    pools: [
      ['Aeric', 'Lysandra', 'Thalor', 'Elowen', 'Kaelen', 'Seraphine', 'Draven', 'Aeliana', 'Rowan', 'Isolde', 'Fenris', 'Nimue', 'Caspian', 'Ondine', 'Alaric', 'Morgana', 'Eldrin', 'Sylvara', 'Gideon', 'Brynn'],
      ['the Bold', 'Stormborn', 'the Wise', 'Shadowbane', 'of the Vale', 'the Radiant', 'Dawnbringer', 'the Fallen', 'Ironheart', 'Nightshade', 'the Ancient', 'Frostweaver'],
    ],
  },
  {
    slug: 'sf-name', title: 'Sci-Fi Name Generator',
    desc: 'Futuristic names for space, robots & cyberpunk.',
    icon: '🤖', category: 'Sci-Fi', type: 'combine', separator: ' ',
    pools: [
      ['Neo', 'Cyra', 'Axon', 'Vex', 'Orion', 'Nova', 'Zephyr', 'Kova', 'Echo', 'Titan', 'Lyra', 'Draco', 'Astra', 'Juno', 'Ryn', 'Cael', 'Vela', 'Xander', 'Nyx', 'Halcyon'],
      ['Prime', 'Voss', 'Kane', 'Ryder', 'Solari', 'Vantar', 'Cyrex', 'Nol', 'Draykar', 'Zenith', 'Orbryn', 'Kade'],
    ],
  },
  {
    slug: 'superhero-name', title: 'Superhero Name Generator',
    desc: 'Heroic codenames for your next caped crusader.',
    icon: '🦸', category: 'Fun', type: 'combine', separator: ' ',
    pools: [
      ['Captain', 'Iron', 'Thunder', 'Shadow', 'Crimson', 'Silver', 'Night', 'Blazing', 'Cosmic', 'Ultra', 'Phantom', 'Steel', 'Golden', 'Frost', 'Mighty', 'Solar', 'Storm', 'Dark', 'Radiant', 'Vortex'],
      ['Hawk', 'Guardian', 'Falcon', 'Ranger', 'Striker', 'Saber', 'Blade', 'Bolt', 'Fury', 'Sentinel', 'Titan', 'Warden'],
    ],
  },
  {
    slug: 'villain-name', title: 'Villain Name Generator',
    desc: 'Sinister names for your story’s dark antagonist.',
    icon: '😈', category: 'Fun', type: 'combine', separator: ' ',
    pools: [
      ['Dark', 'Doom', 'Dread', 'Malice', 'Venom', 'Grim', 'Shadow', 'Vile', 'Crimson', 'Blood', 'Wicked', 'Sinister', 'Corrupt', 'Rotten', 'Cruel', 'Nether', 'Chaos', 'Plague', 'Cursed', 'Frost'],
      ['Lord', 'King', 'Reaper', 'Fang', 'Claw', 'Specter', 'Baron', 'Warlock', 'Bane', 'Serpent', 'Viper', 'Overlord'],
    ],
  },
  {
    slug: 'dragon-name', title: 'Dragon Name Generator',
    desc: 'Epic names for mighty dragons and wyrms.',
    icon: '🐉', category: 'Fantasy', type: 'combine', separator: ' ',
    pools: [
      ['Ignis', 'Frost', 'Storm', 'Shadow', 'Gold', 'Crimson', 'Obsidian', 'Ember', 'Nyx', 'Inferno', 'Scale', 'Volca', 'Onyx', 'Ruby', 'Sapphire', 'Drake', 'Tempest', 'Ash', 'Aurum', 'Glare'],
      ['the Ancient', 'Fireheart', 'Frostfang', 'Shadowwing', 'the Destroyer', 'Skyterror', 'the Eternal', 'Doombringer', 'the Wyrm', 'Emberclaw', 'the Great', 'Nightscale'],
    ],
  },
  {
    slug: 'spaceship-name', title: 'Spaceship Name Generator',
    desc: 'Names for starships, cruisers & explorers.',
    icon: '🚀', category: 'Sci-Fi', type: 'combine', separator: ' ',
    pools: [
      ['Star', 'Nova', 'Orion', 'Galaxy', 'Cosmo', 'Zero', 'Infinity', 'Odyssey', 'Valkyrie', 'Falcon', 'Astro', 'Nebula', 'Quasar', 'Titan', 'Voyager', 'Serenity', 'Aurora', 'Dark', 'Solar', 'Luna'],
      ['Cruiser', 'Starship', 'Explorer', 'Frigate', 'Carrier', 'Shuttle', 'Lancer', 'Reaper', 'Drifter', 'Ark', 'Ranger', 'Horizon'],
    ],
  },
  {
    slug: 'robot-name', title: 'Robot Name Generator',
    desc: 'Names for androids, mechs & AI units.',
    icon: '🤖', category: 'Sci-Fi', type: 'combine', separator: '',
    pools: [
      ['Alpha', 'Omega', 'Jet', 'Neo', 'Volt', 'Giga', 'Nano', 'Titan', 'Chrome', 'Cyber', 'Iron', 'Spark', 'Cobalt', 'Zero', 'Hexa', 'Opti', 'Uni', 'Delta', 'Proto', 'Max'],
      ['-7', '-X', '-9000', '-Z', '-01', '-Prime', '-Tron', '-Bot', '-Droid', '-Unit', '-Core', '-Mech'],
    ],
  },
  {
    slug: 'guild-name', title: 'Guild Name Generator',
    desc: 'Names for game guilds, clans & teams.',
    icon: '⚔️', category: 'Gaming', type: 'combine', separator: ' ',
    pools: [
      ['Crimson', 'Black', 'Azure', 'Golden', 'Silver', 'Abyssal', 'Eternal', 'Storm', 'Iron', 'Frost', 'Blazing', 'Shadow', 'Dawn', 'Judgement', 'Frenzied', 'Primal', 'Gale', 'Venom', 'Celestial', 'Doom'],
      ['Order', 'Wolves', 'Company', 'Shields', 'Blades', 'Ravens', 'Lions', 'Legion', 'Vanguard', 'Wanderers', 'Wardens', 'Outcasts'],
    ],
  },
  {
    slug: 'pirate-name', title: 'Pirate Name Generator',
    desc: 'Swashbuckling nicknames for the seven seas.',
    icon: '🏴‍☠️', category: 'Fun', type: 'combine', separator: ' ',
    pools: [
      ['Black', 'Red', 'One-Eyed', 'Iron', 'Mad', 'Ruthless', 'Cruel', 'Stormy', 'White', 'Peg-Leg', 'Golden-Hand', 'Sharktooth', 'Drunken', 'Thunder', 'Bones', 'Foggy', 'Deep', 'Cursed', 'Cannon', 'Iron-Arm'],
      ['Jack', 'Morgan', 'Drake', 'Barbarossa', 'Sawtooth', 'Hook', 'Rackham', 'Roberts', 'Kraken', 'Blackbeard', 'Silver', 'Bonney'],
    ],
  },
  {
    slug: 'magic-spell', title: 'Magic Spell Name Generator',
    desc: 'Names for spells and incantations.',
    icon: '✨', category: 'Fantasy', type: 'combine', separator: ' ',
    pools: [
      ['Flaming', 'Frozen', 'Thunder', 'Healing', 'Summoning', 'Sealing', 'Temporal', 'Abyssal', 'Radiant', 'Dark', 'Storm', 'Earthen', 'Phantom', 'Blessed', 'Cursed', 'Piercing', 'Restoring', 'Reflecting', 'Awakening', 'Explosive'],
      ['Arrow', 'Tempest', 'Barrier', 'Brand', 'Wave', 'Seal', 'Descent', 'Ward', 'Judgement', 'Pact', 'Song', 'Oath'],
    ],
  },
];

export const GENERATORS_EN_MAP: Record<string, Generator> = Object.fromEntries(
  GENERATORS_EN.map(g => [g.slug, g]),
);

/** 영어판이 존재하는 slug — 한국어 페이지의 hreflang 연결에 사용 */
export const EN_GENERATOR_SLUGS = new Set(GENERATORS_EN.map(g => g.slug));
