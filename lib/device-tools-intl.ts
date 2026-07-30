// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { DeviceTool } from './device-tools.ts';
import { DEVICE_TOOLS } from './device-tools.ts';

/**
 * 기기 점검(/device) 섹션의 영어·중국어 메타데이터.
 *
 * slug·icon·gradient·og·needsPermission은 한국어와 공유하고 사람이 읽는 문구만
 * 갈아 끼운다. checks는 title/desc가 아니라 별도 키라 여기서 함께 넘긴다.
 *
 * 이 섹션은 검색어가 거의 그대로 도구 이름이다 — "keyboard test",
 * "dead pixel test", "mic test". 그래서 metaTitle을 그 말에 맞춰 짓는다.
 */
export type DeviceIntlLang = 'en';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; checks: string[];
}

const COPY: Record<DeviceIntlLang, Record<string, ToolCopy>> = {
  en: {
    keyboard: {
      title: 'Keyboard Test', desc: 'Find dead keys and check N-key rollover', category: 'Input',
      metaTitle: 'Keyboard Test — Check Every Key and N-Key Rollover Online',
      long: 'Press a key and it lights up on the on-screen keyboard. Find keys that do not respond, keys that register twice from one press, and how many the board reads at once (N-key rollover) — all in the browser.',
      checks: ['Whether each key registers', 'The key code pressed (KeyboardEvent.code)', 'Maximum simultaneous keys', 'Which keys you have not tried yet'],
    },
    mouse: {
      title: 'Mouse Click Test', desc: 'Test left, right and wheel clicks, and check for chatter', category: 'Input',
      metaTitle: 'Mouse Click Test — Check Buttons and Double-Click Chatter',
      long: 'Check that left, right, wheel and side buttons all register, and whether one press is coming through as two — chatter — by looking at the gap in milliseconds. Scroll direction and cursor movement polling are shown alongside.',
      checks: ['Whether each button registers', 'Suspected chatter clicks (gap in ms)', 'Scroll direction and step', 'Cursor movement event rate'],
    },
    mic: {
      title: 'Microphone Test', desc: 'Live input level, plus record and listen back', category: 'Audio',
      metaTitle: 'Microphone Test — Check Input Level and Record Online',
      long: 'Watch a live level meter to confirm your mic is picking up sound, then record a few seconds and play it back to hear how you actually sound. A one-minute check before a video call or a game.',
      checks: ['Input level on a live meter', 'Frequency spectrum', 'Record and play back', 'List of connected microphones'],
    },
    webcam: {
      title: 'Webcam Test', desc: 'Check the picture, resolution and frame rate, take a snapshot', category: 'Video',
      metaTitle: 'Webcam Test — Check Your Camera Online, No Install',
      long: 'Confirm the camera turns on, see what resolution and frame rate it delivers, and take a snapshot to judge the image quality. The video plays only inside this browser and is never sent to a server.',
      checks: ['Camera picture output', 'Resolution and frame rate', 'Save a snapshot', 'Switch between connected cameras'],
    },
    speaker: {
      title: 'Speaker and Headphone Test', desc: 'Check left/right separation and which frequencies come through', category: 'Audio',
      metaTitle: 'Speaker Test — Check Left/Right Channels and Frequency Online',
      long: 'Sound the left and right sides separately to check the channels are not swapped and that neither side is silent. You can also step through 20Hz to 16kHz to find how far your headphones — and your ears — actually reach.',
      checks: ['Left and right channels separately', 'Stereo balance', 'Playback across frequency bands', 'Volume control'],
    },
    monitor: {
      title: 'Dead Pixel Test', desc: 'Full-screen solid colours to find dead pixels and patches', category: 'Display',
      metaTitle: 'Dead Pixel Test — Find Stuck Pixels and Backlight Bleed',
      long: 'Fills the screen with red, green, blue, white and black to reveal dots that stay off (dead pixels), dots that stay on (stuck pixels), and backlight bleed or patches around the edges. The first thing to do the day a new monitor arrives.',
      checks: ['Five full-screen solid colours', 'Grey gradient (banding)', 'Colour bleed and ghosting', 'Backlight bleed at the edges'],
    },
    'refresh-rate': {
      title: 'Refresh Rate Test', desc: 'Measure what Hz your screen is actually running at', category: 'Display',
      metaTitle: 'Refresh Rate Test — Measure Your Real Monitor Hz',
      long: 'Not the number in your settings — how many times per second this screen is actually drawing. Buying a 144Hz monitor and running it at 60Hz is a common mistake, and this catches it immediately.',
      checks: ['Measured refresh rate (Hz)', 'Frame interval variance (stutter)', 'Minimum and maximum frame time', 'Compare motion smoothness by eye'],
    },
    touch: {
      title: 'Touchscreen Test', desc: 'Check multi-touch count and find unresponsive areas', category: 'Input',
      metaTitle: 'Touchscreen Test — Multi-Touch and Dead Zone Check',
      long: 'Press the screen to see touch coordinates and how many points register at once, then drag a finger across to find any area that does not respond. Useful after a screen replacement, or when the display cuts out now and then.',
      checks: ['Live touch coordinates', 'Maximum simultaneous touches', 'Drag trails to find dead zones', 'Pressure and contact area (where supported)'],
    },
    gamepad: {
      title: 'Gamepad Test', desc: 'Check buttons, analogue sticks and triggers', category: 'Input',
      metaTitle: 'Gamepad Test — Check Controller Buttons and Stick Drift',
      long: 'Connect a controller, press the buttons to confirm they register, and leave the sticks alone to see whether the coordinates wander — stick drift. Xbox, PlayStation and Nintendo pads are all read through the standard browser API.',
      checks: ['Each button and its analogue value', 'Left and right stick coordinates', 'Stick drift (off-centre at rest)', 'How far the triggers are pressed'],
    },
    info: {
      title: 'My Device Info', desc: 'Resolution, browser, OS and core count at a glance', category: 'Info',
      metaTitle: 'My Device Info — Check Screen Resolution, Browser and OS',
      long: 'Your screen resolution and browser window size, pixel ratio, browser and operating system version, and CPU core count — all on one screen. Copy it straight out when you are asking for remote support or someone asks about your specs.',
      checks: ['Screen resolution and window size', 'Pixel ratio (DPR) and colour depth', 'Browser, engine and operating system', 'CPU cores, memory and touch support'],
    },
  },
};

/** 언어별 도구 목록 — 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다 */
export function deviceToolsIntl(lang: DeviceIntlLang): DeviceTool[] {
  return DEVICE_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findDeviceToolIntl(lang: DeviceIntlLang, slug: string): DeviceTool | undefined {
  return deviceToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedDeviceToolsIntl(lang: DeviceIntlLang, slug: string, count = 4): DeviceTool[] {
  const all = deviceToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  // 같은 분류를 먼저, 모자라면 나머지로 채운다
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

/** 셸 UI 문구 */
export const DEVICE_SHELL_UI: Record<DeviceIntlLang, {
  home: string; section: string; whatItChecks: string; others: string;
  notice: string; permission: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Device tests',
    whatItChecks: 'What this test checks', others: 'Other device tests',
    notice: '🔧 Runs in the browser. Nothing to install, nothing uploaded.',
    permission: '🔒 Allow it when the browser asks. Camera and microphone data is processed inside this browser only and is never sent anywhere.',
    footNote: 'Results depend on your browser and drivers. If something looks wrong here, try the same test in another browser before assuming the hardware is at fault.',
  },
};
