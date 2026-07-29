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
export type DeviceIntlLang = 'en' | 'zh';

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
  zh: {
    keyboard: {
      title: '键盘测试', desc: '找出失灵的按键，检查同时按键（N 键无冲）', category: '输入设备',
      metaTitle: '在线键盘测试 — 检查按键与 N 键无冲',
      long: '按下按键，屏幕上的虚拟键盘就会亮起。没反应的键、按一次却输入两次的键、最多能同时识别几个键（N 键无冲），都能在浏览器里直接查。',
      checks: ['各键是否被识别', '按下的键码（KeyboardEvent.code）', '最多同时识别的按键数', '还没按过的键列表'],
    },
    mouse: {
      title: '鼠标点击测试', desc: '测左键、右键、中键与连击（双击误触）', category: '输入设备',
      metaTitle: '鼠标点击测试 — 检查按键与双击连击问题',
      long: '检查左键、右键、中键、侧键是否都能识别，以及按一次是否变成了两次（连击），依据是点击间隔（毫秒）。滚轮方向和光标移动的轮询频率也一并显示。',
      checks: ['各按键是否被识别', '疑似连击的点击（间隔 ms）', '滚轮方向与步进', '光标移动事件频率'],
    },
    mic: {
      title: '麦克风测试', desc: '实时查看输入音量，并录下来回放', category: '音频',
      metaTitle: '在线麦克风测试 — 检查输入音量并录音',
      long: '用实时电平表确认麦克风有没有收到声音，再录几秒回放，听听实际听起来是什么样。视频会议或开游戏前一分钟的检查。',
      checks: ['实时电平表显示输入音量', '频谱', '录音后回放确认', '已连接的麦克风设备列表'],
    },
    webcam: {
      title: '摄像头测试', desc: '检查画面、分辨率与帧率，并拍快照', category: '视频',
      metaTitle: '在线摄像头测试 — 免安装检查相机',
      long: '确认摄像头能开、看它输出的分辨率和帧率，再拍张快照看画质。视频只在这个浏览器内播放，不会发送到服务器。',
      checks: ['摄像头画面输出', '分辨率与帧率', '保存快照', '在已连接的摄像头之间切换'],
    },
    speaker: {
      title: '音箱与耳机测试', desc: '检查左右声道分离和能听到的频段', category: '音频',
      metaTitle: '音箱测试 — 在线检查左右声道与频率',
      long: '分别让左右两边发声，确认声道没有对调、也没有哪一边不出声。还可以从 20Hz 一路调到 16kHz，看看自己的耳机和耳朵到底能到哪。',
      checks: ['左右声道分别播放', '立体声左右平衡', '按频段播放', '音量调节'],
    },
    monitor: {
      title: '坏点检测', desc: '全屏纯色找死点、亮点与斑块', category: '屏幕',
      metaTitle: '屏幕坏点检测 — 查死点、亮点与漏光',
      long: '用红、绿、蓝、白、黑铺满全屏，找出一直不亮的点（死点）、一直亮着的点（亮点），以及边缘的漏光和斑块。新显示器到手那天最该先做的检查。',
      checks: ['五种全屏纯色', '灰阶渐变（色带）', '串色与残影确认', '边缘漏光确认'],
    },
    'refresh-rate': {
      title: '刷新率测试', desc: '测你的屏幕实际跑在多少 Hz', category: '屏幕',
      metaTitle: '刷新率测试 — 测显示器的真实 Hz',
      long: '不是看设置里写的数字，而是测这块屏幕现在每秒实际画了多少次。买了 144Hz 却一直用在 60Hz 是很常见的事，这里能立刻查出来。',
      checks: ['实测刷新率（Hz）', '帧间隔偏差（卡顿）', '最短与最长帧时间', '用眼睛对比运动流畅度'],
    },
    touch: {
      title: '触摸屏测试', desc: '检查多点触控数量与失灵区域', category: '输入设备',
      metaTitle: '触摸屏测试 — 多点触控与失灵区域检查',
      long: '按屏幕查看触摸坐标和同时识别的点数，再用手指划过去，找出有没有没反应的区域。换过屏幕、或者屏幕偶尔失灵时用它。',
      checks: ['实时显示触摸坐标', '最多同时触摸点数', '用拖动轨迹找失灵区', '压力与接触面积（支持的设备）'],
    },
    gamepad: {
      title: '手柄测试', desc: '检查按键、摇杆与扳机输入', category: '输入设备',
      metaTitle: '手柄测试 — 检查按键与摇杆漂移',
      long: '连上手柄按按键确认能否识别，再松开摇杆看坐标会不会自己乱动（摇杆漂移）。Xbox、PlayStation、任天堂系列手柄都通过浏览器标准 API 识别。',
      checks: ['各按键与其模拟值', '左右摇杆坐标', '摇杆漂移（静止时偏离中心）', '扳机的按下深度'],
    },
    info: {
      title: '我的设备信息', desc: '分辨率、浏览器、系统、核心数一览', category: '信息',
      metaTitle: '我的设备信息 — 查看分辨率、浏览器与操作系统',
      long: '当前的屏幕分辨率与浏览器窗口大小、像素比、浏览器与操作系统版本，还有 CPU 核心数，全在一个页面上。要请人远程协助或被问配置时，直接复制发过去就行。',
      checks: ['屏幕分辨率与窗口大小', '像素比（DPR）与色深', '浏览器、引擎与操作系统', 'CPU 核心、内存与触控支持'],
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
  zh: {
    home: '首页', section: '设备检测',
    whatItChecks: '这个检测查什么', others: '其他设备检测',
    notice: '🔧 在浏览器内运行。无需安装，也不会上传。',
    permission: '🔒 浏览器询问权限时请允许。摄像头和麦克风的数据只在这个浏览器内处理，不会发送到任何地方。',
    footNote: '结果会受浏览器和驱动影响。如果这里显示异常，先换个浏览器做同样的检测，再判断是不是硬件问题。',
  },
};
