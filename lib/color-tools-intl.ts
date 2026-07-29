// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ColorTool } from './color-tools.ts';
import { COLOR_TOOLS } from './color-tools.ts';

/**
 * 색상 도구(/color) 섹션의 영어·중국어 메타데이터.
 *
 * time-tools-intl.ts와 같은 방침 — slug·icon·gradient·og는 한국어와 공유하고
 * 사람이 읽는 문구만 여기서 갈아 끼운다. slug를 공유해야 hreflang이 세 언어를
 * 짝지을 수 있고, 번역이 없는 slug는 한국어로 폴백해 화면이 깨지지 않는다.
 */
export type ColorIntlLang = 'en' | 'zh';

interface ToolCopy {
  title: string; desc: string; category: string;
  metaTitle: string; long: string; features: string[];
}

const COPY: Record<ColorIntlLang, Record<string, ToolCopy>> = {
  en: {
    palette: {
      title: 'Colour Palette Generator', desc: 'Pull colours that work with a base colour, by rule', category: 'Palette',
      metaTitle: 'Colour Palette Generator — Build Matching Colour Schemes',
      long: 'Pick one colour and it derives the colours that go with it using colour-wheel rules — complementary, analogous, triadic. Choosing by rule rather than by eye keeps a scheme from going badly wrong.',
      features: ['Complementary, analogous, triadic and tetradic', 'Monochrome lightness steps', 'Copy any HEX', 'Copy the whole palette as CSS'],
    },
    shades: {
      title: 'Colour Shades Generator', desc: 'Turn one colour into a 50–900 scale', category: 'Palette',
      metaTitle: 'Colour Shades Generator — 50 to 900 Scale From One Colour',
      long: 'Give it one brand colour and it builds ten steps, lighter (tints) and darker (shades). The output comes out in the 50 · 100 · … · 900 form that Tailwind and most design systems expect.',
      features: ['Ten steps from 50 to 900', 'HEX and HSL per step', 'Marks whether white or black text reads', 'Copy the set as CSS variables'],
    },
    mixer: {
      title: 'Colour Mixer', desc: 'Find the colour between two colours', category: 'Palette',
      metaTitle: 'Colour Mixer — Blend Two Colours and Find the Midpoint',
      long: 'Set two colours and move the ratio to get what sits between them. Useful for pulling the colour at a specific point in a gradient, or finding a middle tone between two brand colours.',
      features: ['Ratio slider for the blend', 'See several intermediate steps at once', 'Copy HEX or RGB', 'Check contrast of the blend'],
    },
    random: {
      title: 'Random Colour Generator', desc: 'Lock the ones you like, reroll the rest', category: 'Palette',
      metaTitle: 'Random Colour Generator — Reroll a Palette With Locks',
      long: 'Generates five random colours. Lock the ones you like and reroll only the rest, so you can spin through combinations quickly until something works.',
      features: ['Five colours at a time', 'Lock the ones you want to keep', 'Saturation kept in a usable range', 'Copy all HEX values at once'],
    },
    contrast: {
      title: 'Colour Contrast Checker', desc: 'Check text legibility against WCAG', category: 'Accessibility',
      metaTitle: 'Colour Contrast Checker — WCAG AA and AAA Ratio',
      long: 'Calculates the contrast ratio between a background and a text colour and tells you whether it passes the web accessibility thresholds (WCAG AA and AAA), with a live text preview so you can judge it by eye too.',
      features: ['Contrast ratio from 1 to 21', 'AA and AAA pass or fail', 'Separate verdict for large text', 'Auto-adjust lightness until it passes'],
    },
    colorblind: {
      title: 'Colour Blindness Simulator', desc: 'How a colour looks with colour vision deficiency', category: 'Accessibility',
      metaTitle: 'Colour Blindness Simulator — Preview Protanopia, Deuteranopia and More',
      long: 'Converts your colours to show how they appear to someone with protanopia, deuteranopia, tritanopia or full colour blindness. It makes immediately obvious why a screen that distinguishes states using only red and green is a problem.',
      features: ['Four types of colour vision deficiency', 'Side-by-side check of whether two colours separate', 'Simulate a whole palette', 'Contrast shown alongside'],
    },
    gradient: {
      title: 'CSS Gradient Generator', desc: 'Build a CSS gradient from two or three colours', category: 'CSS',
      metaTitle: 'CSS Gradient Generator — linear-gradient Code',
      long: 'Set the colours and the angle and it writes the CSS linear-gradient for you. Move the colour stops to control where the transition happens, and paste the result straight in.',
      features: ['Two or three colours with stop positions', 'Angle or radial', 'Copy the CSS immediately', 'Tailwind class guidance'],
    },
    shadow: {
      title: 'CSS Box Shadow Generator', desc: 'Adjust box-shadow while watching the result', category: 'CSS',
      metaTitle: 'CSS Box Shadow Generator — Live Preview and Code',
      long: 'Adjust offset, blur, spread, colour and opacity while seeing the result, then take the CSS. Includes presets that layer several shadows for a more natural sense of depth.',
      features: ['Offset, blur, spread and colour', 'Inset shadows supported', 'Natural multi-layer presets', 'Copy the CSS'],
    },
    name: {
      title: 'Colour Name Finder', desc: 'What is the closest name to this colour', category: 'Convert',
      metaTitle: 'Colour Name Finder — Nearest Named Colour to Any HEX',
      long: 'Enter a colour code and it finds the closest named colour — coral, teal, crimson — and shows HEX, RGB, HSL and CMYK together. For when you have to describe a colour in words.',
      features: ['Nearest named colour', 'HEX, RGB, HSL and CMYK at once', 'Shows the difference from the named colour', 'Copy each value separately'],
    },
    temperature: {
      title: 'Colour Temperature Converter', desc: 'See what a Kelvin value actually looks like', category: 'Convert',
      metaTitle: 'Colour Temperature Converter — Kelvin to RGB',
      long: 'See what 2700K warm white actually looks like, and how blue 6500K daylight really is. Useful when choosing lighting or getting a feel for white balance in photography.',
      features: ['1000K to 12000K slider', 'Warm, neutral and daylight presets', 'RGB and HEX values', 'Compare two temperatures side by side'],
    },
  },
  zh: {
    palette: {
      title: '配色生成器', desc: '按色轮规则取出与基准色相配的颜色', category: '配色',
      metaTitle: '配色生成器 — 生成协调的配色方案',
      long: '选一个颜色，它就按色轮规则（互补色、类似色、三角配色）取出相配的颜色。按规则挑而不是靠感觉挑，配色不容易出大错。',
      features: ['互补色、类似色、三角与四角配色', '单色明度阶梯', '每个色都能复制 HEX', '整套配色导出为 CSS'],
    },
    shades: {
      title: '色阶生成器', desc: '用一个颜色生成 50~900 色阶', category: '配色',
      metaTitle: '色阶生成器 — 一个颜色生成 50~900 色板',
      long: '输入一个品牌色，它会往亮（tint）和暗（shade）两个方向生成十个阶。输出就是 Tailwind 与多数设计系统在用的 50·100·…·900 形式。',
      features: ['50~900 共十阶', '每阶显示 HEX 与 HSL', '标出白字或黑字哪个能读', '整套复制为 CSS 变量'],
    },
    mixer: {
      title: '颜色混合器', desc: '求两个颜色之间的中间色', category: '配色',
      metaTitle: '颜色混合器 — 混合两色并取中间色',
      long: '设定两个颜色并拖动比例，就能得到它们之间的颜色。适合取渐变中某一点的颜色，或找两个品牌色的中间调。',
      features: ['用比例滑块调节混合', '一次查看多个中间阶', '复制 HEX 或 RGB', '检查混合色的对比度'],
    },
    random: {
      title: '随机配色', desc: '锁住喜欢的，其余重新抽', category: '配色',
      metaTitle: '随机配色生成器 — 可锁定的配色重抽',
      long: '一次生成五个随机颜色。喜欢的可以上锁，只重抽其余的，这样能快速换到满意的组合。',
      features: ['一次生成五个颜色', '锁定想保留的颜色', '饱和度控制在可用范围内', '一次复制全部 HEX'],
    },
    contrast: {
      title: '对比度检查', desc: '按 WCAG 标准检查文字是否易读', category: '无障碍',
      metaTitle: '颜色对比度检查 — WCAG AA／AAA 比值',
      long: '计算背景色与文字色的对比度比值，并判断是否达到无障碍标准（WCAG AA 与 AAA），同时提供真实文字预览，可以用眼睛再确认一次。',
      features: ['对比度比值 1~21', 'AA／AAA 是否通过', '大字号单独判定', '自动调整明度直到通过'],
    },
    colorblind: {
      title: '色盲模拟器', desc: '色觉异常的人看到的颜色', category: '无障碍',
      metaTitle: '色盲模拟器 — 预览红绿蓝色盲所见',
      long: '把你的颜色转换成红色盲、绿色盲、蓝色盲与全色盲所看到的样子。为什么「只靠红绿区分状态」的界面有问题，一看就明白。',
      features: ['四种色觉类型转换', '并排检查两色是否能区分', '整套配色一起模拟', '同时显示对比度'],
    },
    gradient: {
      title: 'CSS 渐变生成器', desc: '用两三个颜色生成 CSS 渐变', category: 'CSS',
      metaTitle: 'CSS 渐变生成器 — linear-gradient 代码',
      long: '设好颜色与角度，它就写出 CSS linear-gradient。可以移动色标位置控制在哪里过渡，结果可以直接粘贴使用。',
      features: ['两三个颜色与色标位置', '角度或径向可选', '即时复制 CSS 代码', '附 Tailwind 类名说明'],
    },
    shadow: {
      title: 'CSS 阴影生成器', desc: '一边看效果一边调 box-shadow', category: 'CSS',
      metaTitle: 'CSS box-shadow 生成器 — 实时预览与代码',
      long: '一边调偏移、模糊、扩散、颜色与透明度，一边看效果，然后把 CSS 拿走。还内置了叠加多层阴影、做出更自然层次的预设。',
      features: ['偏移、模糊、扩散与颜色', '支持内阴影（inset）', '自然的多层阴影预设', '复制 CSS 代码'],
    },
    name: {
      title: '颜色名称查询', desc: '和这个颜色最接近的名字是什么', category: '换算',
      metaTitle: '颜色名称查询 — 与 HEX 最接近的颜色名',
      long: '输入色值，它会找出最接近的有名颜色（珊瑚色、青绿、绯红等），并同时给出 HEX、RGB、HSL 与 CMYK。适合需要用语言描述颜色的时候。',
      features: ['最接近的有名颜色', 'HEX／RGB／HSL／CMYK 同时显示', '显示与该名色的差距', '各数值可分别复制'],
    },
    temperature: {
      title: '色温换算', desc: '看看开尔文（K）值实际是什么颜色', category: '换算',
      metaTitle: '色温换算 — 开尔文（K）转 RGB',
      long: '看看 2700K 暖白光实际是什么颜色，6500K 日光又有多蓝。选灯具或理解摄影白平衡时很有帮助。',
      features: ['1000K~12000K 滑块', '暖白、中性、日光预设', '显示 RGB 与 HEX 值', '两个色温并排对比'],
    },
  },
};

export function colorToolsIntl(lang: ColorIntlLang): ColorTool[] {
  return COLOR_TOOLS.map(t => {
    const c = COPY[lang][t.slug];
    return c ? { ...t, ...c } : t;
  });
}

export function findColorToolIntl(lang: ColorIntlLang, slug: string): ColorTool | undefined {
  return colorToolsIntl(lang).find(t => t.slug === slug);
}

export function relatedColorToolsIntl(lang: ColorIntlLang, slug: string, count = 4): ColorTool[] {
  const all = colorToolsIntl(lang);
  const self = all.find(t => t.slug === slug);
  if (!self) return all.slice(0, count);
  const same = all.filter(t => t.slug !== slug && t.category === self.category);
  const rest = all.filter(t => t.slug !== slug && t.category !== self.category);
  return [...same, ...rest].slice(0, count);
}

export const COLOR_SHELL_UI: Record<ColorIntlLang, {
  home: string; section: string; canDo: string; others: string;
  notice: string; footNote: string;
}> = {
  en: {
    home: 'Home', section: 'Colour tools',
    canDo: 'What this tool does', others: 'Other colour tools',
    notice: '🎨 Everything runs in your browser. No install, no sign-up.',
    footNote: 'Colours may look slightly different depending on your screen and its colour profile.',
  },
  zh: {
    home: '首页', section: '颜色工具',
    canDo: '这个工具能做什么', others: '其他颜色工具',
    notice: '🎨 全部在你的浏览器内运行。无需安装，也无需注册。',
    footNote: '不同屏幕与色彩配置下，颜色看起来可能略有差异。',
  },
};
