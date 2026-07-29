import type { Metadata } from 'next';
import ConvertHub from '@/components/ConvertHub';
import { convertAlternates } from '@/lib/convert-ui-intl';

export const metadata: Metadata = {
  title: '单位换算 — 50种换算，含韩国传统单位',
  description:
    '厘米换英寸、公斤换磅、摄氏换华氏、Mbps换MB/s，以及평(坪)、근(斤)、돈等韩国传统单位共50种换算。附常用数值表与计算公式，免费免注册。',
  alternates: { canonical: '/zh/convert', languages: convertAlternates() },
};

export default function ZhConvertHub() {
  return <ConvertHub lang="zh" faq={[
  { q: '应该在哪一栏输入？', a: '任意一栏都可以。左栏输入时右栏自动变化，右栏输入时左栏自动变化，无论从哪个方向查找都能直接使用。' },
  { q: '韩国传统单位的数值和我知道的不一样？', a: '근、되、마지기等单位因地区和品类而异 — 韩国肉类1근为600克，蔬菜为375克。而且中国的1斤是500克，同字不同量。每个页面都注明了这些差异。' },
  { q: '这些数值准确吗？', a: '像1英寸=2.54厘米这样国际定义的数值是精确的。马赫、传统单位等随条件变化的数值，页面上都标注了前提。' },
  { q: '硬盘容量为什么比标称的小？', a: '本站按1GB=1,024MB(二进制)计算，而硬盘厂商按1,000MB计算，所以1TB固态硬盘在电脑上显示为931GB。' },
]} />;
}
