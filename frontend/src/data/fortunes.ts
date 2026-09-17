export type LuckLevel = 'great' | 'good' | 'mid' | 'plain' | 'low';

export interface Aspect {
  stars: number;
  text: string;
}

export interface Fortune {
  id: number;
  no: string;
  level: string;
  levelType: LuckLevel;
  title: string;
  poem: string[];
  interpret: string;
  aspects: {
    career: Aspect;
    wealth: Aspect;
    love: Aspect;
    health: Aspect;
  };
  goodTo: string[];
  badTo: string[];
  luckyColor: string;
  luckyNumber: string;
  luckyDirection: string;
  motto: string;
}

export const FORTUNES: Fortune[] = [
  {
    id: 1,
    no: '第一签',
    level: '上上签',
    levelType: 'great',
    title: '龙跃天门',
    poem: ['云开雾散见青天', '龙跃天门志气坚', '久困泥沙终得志', '一朝风雨化云烟'],
    interpret: '久积之志今得舒展，凡事拨云见日。谋事得贵人相助，水到渠成，宜把握时机大胆前行。',
    aspects: {
      career: { stars: 5, text: '锋芒毕露，主动争取必有回响' },
      wealth: { stars: 4, text: '正财稳进，忌贪求偏门横利' },
      love: { stars: 5, text: '良缘天定，旧情复暖新情可期' },
      health: { stars: 4, text: '精神俱佳，仍需劳逸有度' },
    },
    goodTo: ['开业立事', '签约求职', '表白结缘', '远行'],
    badTo: ['犹疑不决', '轻信小人'],
    luckyColor: '朱砂红',
    luckyNumber: '三',
    luckyDirection: '正东',
    motto: '时来运转，宜乘风而上。',
  },
  {
    id: 2,
    no: '第七签',
    level: '上吉签',
    levelType: 'good',
    title: '春回大地',
    poem: ['寒尽枝头绽早梅', '东风一夜暖春回', '前行渐入佳境处', '莫问归期只管催'],
    interpret: '困顿渐消，转机在近。所求之事初见曙光，持之以恒者得偿。宜稳中求进，不必急于求成。',
    aspects: {
      career: { stars: 4, text: '循序渐进，积累终成气候' },
      wealth: { stars: 4, text: '细水长流，理财得法可增益' },
      love: { stars: 4, text: '感情回温，真诚以待可长久' },
      health: { stars: 3, text: '换季小恙，注意保暖调息' },
    },
    goodTo: ['谋划新事', '修补旧谊', '学习进修'],
    badTo: ['急功近利', '意气用事'],
    luckyColor: '柳芽绿',
    luckyNumber: '八',
    luckyDirection: '东南',
    motto: '春种一粒粟，秋收万颗子。',
  },
  {
    id: 3,
    no: '第十二签',
    level: '中吉签',
    levelType: 'mid',
    title: '明月映江',
    poem: ['一轮明月照江心', '波静风平夜色沉', '莫向他乡寻宝物', '身边自有值千金'],
    interpret: '所求不在远，珍宝在身旁。宜静观其变，守正待时。与人为善者，福自近处来。',
    aspects: {
      career: { stars: 3, text: '安守本分，勿轻易转向' },
      wealth: { stars: 3, text: '守财为上，不宜大额投入' },
      love: { stars: 4, text: '珍惜眼前人，平淡即是真' },
      health: { stars: 4, text: '身心安宁，作息规律为要' },
    },
    goodTo: ['守成蓄势', '陪伴家人', '整理旧务'],
    badTo: ['盲目远行', '舍近求远'],
    luckyColor: '月白',
    luckyNumber: '六',
    luckyDirection: '正北',
    motto: '知足者，心常安。',
  },
  {
    id: 4,
    no: '第十八签',
    level: '中平签',
    levelType: 'plain',
    title: '行舟待风',
    poem: ['孤舟横渡水中央', '欲进无风欲退难', '且把桨橹收一收', '静待潮生再启航'],
    interpret: '时机未至，强求无益。当下宜守不宜攻，蓄养实力以待良机。忍一时之滞，方得后来之顺。',
    aspects: {
      career: { stars: 3, text: '暂遇瓶颈，宜蓄力不宜强推' },
      wealth: { stars: 2, text: '进项平平，谨防意外支出' },
      love: { stars: 3, text: '感情需耐心，勿急于表态' },
      health: { stars: 3, text: '气血略滞，宜舒缓运动' },
    },
    goodTo: ['养精蓄锐', '复盘反思', '静心读书'],
    badTo: ['冒进投资', '强行推进'],
    luckyColor: '青灰',
    luckyNumber: '四',
    luckyDirection: '西北',
    motto: '潮有涨落，静候其时。',
  },
  {
    id: 5,
    no: '第二十三签',
    level: '上吉签',
    levelType: 'good',
    title: '锦上添花',
    poem: ['喜鹊枝头报早春', '锦上添花分外新', '贵人一语点通处', '万事随心称意人'],
    interpret: '喜事将临，得贵人提携。所谋之事有人相助，事半功倍。宜广结善缘，礼尚往来。',
    aspects: {
      career: { stars: 5, text: '获赏识与助力，进阶有望' },
      wealth: { stars: 4, text: '财源渐旺，合作生利' },
      love: { stars: 4, text: '有人牵线，桃花可期' },
      health: { stars: 4, text: '状态上佳，喜事添精神' },
    },
    goodTo: ['求人办事', '合伙共事', '相亲联谊'],
    badTo: ['独断专行', '忘恩负义'],
    luckyColor: '鹅黄',
    luckyNumber: '九',
    luckyDirection: '正南',
    motto: '得道多助，善缘生福。',
  },
  {
    id: 6,
    no: '第二十九签',
    level: '中吉签',
    levelType: 'mid',
    title: '拨云见日',
    poem: ['浓云半掩日边楼', '风起云移见九州', '旧事纷纭皆散尽', '晴光一片满心头'],
    interpret: '疑虑将解，误会自消。困扰你的旧事终会明朗，宜以诚相待，主动沟通则事顺人和。',
    aspects: {
      career: { stars: 4, text: '误会冰释，合作重回正轨' },
      wealth: { stars: 3, text: '账目渐清，旧债可收' },
      love: { stars: 4, text: '坦诚化解嫌隙，感情回暖' },
      health: { stars: 3, text: '郁结渐开，心宽体安' },
    },
    goodTo: ['开诚沟通', '化解纠纷', '重启旧计划'],
    badTo: ['积怨不言', '钻牛角尖'],
    luckyColor: '天青',
    luckyNumber: '七',
    luckyDirection: '东北',
    motto: '心若晴朗，处处光明。',
  },
  {
    id: 7,
    no: '第三十四签',
    level: '中平签',
    levelType: 'plain',
    title: '守株待兔',
    poem: ['田间一兔偶相逢', '守株再待岂能同', '莫将侥幸当常事', '勤耕方保仓廪丰'],
    interpret: '一时之得非长久之计。凡事仍需脚踏实地，勿存侥幸。守正勤勉者，方得安稳福报。',
    aspects: {
      career: { stars: 3, text: '勿依赖运气，靠实力立足' },
      wealth: { stars: 3, text: '偏财难续，正业为本' },
      love: { stars: 3, text: '用心经营，勿等天赐良缘' },
      health: { stars: 3, text: '规律为要，勿仗身强透支' },
    },
    goodTo: ['踏实耕耘', '精进本业', '储蓄积累'],
    badTo: ['投机取巧', '坐等机会'],
    luckyColor: '土黄',
    luckyNumber: '五',
    luckyDirection: '正西',
    motto: '一分耕耘，一分收获。',
  },
  {
    id: 8,
    no: '第四十一签',
    level: '上上签',
    levelType: 'great',
    title: '金榜题名',
    poem: ['十年寒窗苦用功', '一举成名天下闻', '马蹄踏遍长安道', '春风得意笑谈中'],
    interpret: '苦尽甘来，功成名就。多年努力终得回报，考试、竞聘、评审皆吉。宜乘势而为，光明磊落。',
    aspects: {
      career: { stars: 5, text: '厚积薄发，晋升评优大吉' },
      wealth: { stars: 4, text: '名成则利至，收入见涨' },
      love: { stars: 4, text: '意气风发，魅力倍增' },
      health: { stars: 4, text: '精力充沛，注意庆祝有度' },
    },
    goodTo: ['考试竞聘', '发布展示', '公开表态'],
    badTo: ['骄矜自满', '得意忘形'],
    luckyColor: '正红',
    luckyNumber: '一',
    luckyDirection: '正东',
    motto: '功不唐捐，玉汝于成。',
  },
  {
    id: 9,
    no: '第四十七签',
    level: '中吉签',
    levelType: 'mid',
    title: '枯木逢春',
    poem: ['枯枝历尽雪霜寒', '一夜春回绿满山', '旧困将除新意起', '莫因往日废今欢'],
    interpret: '低谷将过，生机再现。放下过往包袱，把握眼前新机。心态转则运势转，重整旗鼓正当时。',
    aspects: {
      career: { stars: 4, text: '转岗换赛道皆有新气象' },
      wealth: { stars: 3, text: '收入回升，宜稳健规划' },
      love: { stars: 4, text: '走出阴霾，新缘悄至' },
      health: { stars: 4, text: '恢复向好，宜循序调养' },
    },
    goodTo: ['重新开始', '调整方向', '走出舒适区'],
    badTo: ['沉溺过往', '自我否定'],
    luckyColor: '嫩绿',
    luckyNumber: '二',
    luckyDirection: '东南',
    motto: '向前一步，皆是新生。',
  },
  {
    id: 10,
    no: '第五十二签',
    level: '下签',
    levelType: 'low',
    title: '逆水行舟',
    poem: ['行舟偏遇逆江流', '进寸退尺费绸缪', '若非收帆稍歇力', '恐有风浪损船头'],
    interpret: '诸事多阻，宜守不宜进。近日易生波折，切忌强求与冒险。低调收敛、谨言慎行可避祸端。',
    aspects: {
      career: { stars: 2, text: '阻力较大，暂缓重大决定' },
      wealth: { stars: 2, text: '财运不稳，严控开支借贷' },
      love: { stars: 2, text: '易生口角，宜多包容忍让' },
      health: { stars: 3, text: '易感疲惫，注意休息防病' },
    },
    goodTo: ['低调行事', '谨慎守成', '休整调养'],
    badTo: ['冒险投资', '争执冲突', '重大变动'],
    luckyColor: '玄青',
    luckyNumber: '十',
    luckyDirection: '正北',
    motto: '退一步稳，忍一时安。',
  },
  {
    id: 11,
    no: '第五十八签',
    level: '上吉签',
    levelType: 'good',
    title: '喜从天降',
    poem: ['闲庭静坐忽闻声', '喜鹊登门报好音', '意外之欢来眼底', '一家和乐笑盈盈'],
    interpret: '好事不期而至。近日多有意外之喜，人际和顺，家宅安宁。宜心存感恩，惜福纳祥。',
    aspects: {
      career: { stars: 4, text: '意外机遇，主动接住则成' },
      wealth: { stars: 4, text: '偏财小旺，或有意外进项' },
      love: { stars: 5, text: '缘分骤至，家庭和美' },
      health: { stars: 4, text: '心情舒畅，百病渐消' },
    },
    goodTo: ['聚会团圆', '接洽新缘', '置办喜事'],
    badTo: ['疑神疑鬼', '推却好意'],
    luckyColor: '桃红',
    luckyNumber: '六',
    luckyDirection: '正南',
    motto: '心怀善念，喜自天来。',
  },
  {
    id: 12,
    no: '第六十四签',
    level: '中平签',
    levelType: 'plain',
    title: '水静流深',
    poem: ['溪流无声自向东', '不争高下不争锋', '看似平淡无奇处', '积厚方能致远功'],
    interpret: '大巧若拙，大智若愚。当下宜低调沉潜，专注积累。不显山露水者，终能行稳致远。',
    aspects: {
      career: { stars: 3, text: '沉潜蓄力，厚积方能薄发' },
      wealth: { stars: 3, text: '稳中有积，长线布局为宜' },
      love: { stars: 3, text: '平淡相守，日久见真心' },
      health: { stars: 4, text: '静养得宜，气定神闲' },
    },
    goodTo: ['专注深耕', '长线布局', '修身养性'],
    badTo: ['锋芒太露', '急躁冒进'],
    luckyColor: '黛蓝',
    luckyNumber: '八',
    luckyDirection: '西北',
    motto: '静水流深，厚积致远。',
  },
];

export function pickTodayFortune(): Fortune {
  const idx = Math.floor(Math.random() * FORTUNES.length);
  return FORTUNES[idx];
}

export const LEVEL_TONE: Record<LuckLevel, string> = {
  great: 'hsl(var(--seal))',
  good: 'hsl(6 52% 48%)',
  mid: 'hsl(var(--gold))',
  plain: 'hsl(var(--wood))',
  low: 'hsl(210 12% 34%)',
};
