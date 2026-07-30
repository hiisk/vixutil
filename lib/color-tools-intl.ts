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
export type ColorIntlLang = 'en';

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
};
