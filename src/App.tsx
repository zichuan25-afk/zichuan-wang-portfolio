import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Menu, Mail, MessageSquare } from 'lucide-react';

// --- DATA ---
const portfolioData = [
  // 一、舞台美术设计 (Independent Design)
  { 
    id: "WS", title: "缘·白蛇", titleEn: "WHITE SNAKE", year: "2025", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "本设计致力于用极简且充满隐喻的现代剧场语汇，重新解构这段带有残缺美的东方爱情神话。舞台最核心的视觉符号是一个巨大的“半圆”，它直白地宣告了这段情感的残缺与遗憾，营造出一种求而不得的凄美宿命感。在局部造景上，我从宋代古典绘画中汲取灵感，将西湖断桥的传统意象提炼为具有视错觉效果的几何栏杆。这种“断裂”与“错位”的物理结构，完美契合了故事中人妖殊途的拉扯感。",
    descEn: "This design aims to deconstruct the traditional oriental love myth with minimalist and metaphorical modern theatrical language. The core symbol is a giant 'semi-circle', declaring regret and creating a sense of tragic fate.",
    images: ["https://i.postimg.cc/3x7L0fgQ/3651.jpg", "https://i.postimg.cc/jSK8n3zt/3654.jpg", "https://i.postimg.cc/Qds6KYp8/3655.jpg", "https://i.postimg.cc/QMv11VRg/3653.jpg", "https://i.postimg.cc/4dTm8HsR/IMG-0130.jpg", "https://i.postimg.cc/mDGtd1BG/IMG-0131.jpg", "https://i.postimg.cc/RVwkXfN1/83a723ce94780a4ca74cb14b990ced.jpg", "https://i.postimg.cc/65CkYRyL/f2f61f762c1c4c96744e1f031d61b3.jpg"] 
  },
  { 
    id: "NS_GRAND", title: "无影", subTitle: "大剧场版", titleEn: "NO SHADOW", subTitleEn: "GRAND THEATRE", year: "2025", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "在《无影》的大剧场版本中，舞台被打造为一个充满隐喻的“心理祭台”。故事核心聚焦于个体在漫长人生中面对自我幻影的挣扎，空间被赋予了强烈的“献祭感”与内省氛围。中央极简的三角形祭台，不仅暗示着原始幽暗的洞穴，更隐喻着人类灵魂试图向上攀登、追寻更高自我境界的艰难跋涉。在舞美理念上，我极致地追求“景与人的绝对互动”，所有的布景都必须被演员高强度地使用，让空间参与叙事。",
    descEn: "In the Grand Theatre version, the stage is a metaphorical 'psychological altar'. The triangular altar suggests a primitive cave and the journey of the human soul seeking a higher self. The design pursues absolute interaction between scenery and actors.",
    images: ["https://i.postimg.cc/jdypZNDx/dc7280405048bbf8bf0c607d7fc6ac.jpg", "https://i.postimg.cc/L8RygQzM/IMG-0597.jpg", "https://i.postimg.cc/3xBtXjBv/3660.jpg", "https://i.postimg.cc/rF5BQWKP/91ac2449b36a073429304413584ba5.jpg", "https://i.postimg.cc/J4jfPJs8/afc88cb2e620fcb2a6c7ffe8e06a74.jpg", "https://i.postimg.cc/Dy19Bs8p/bff6883f99b75e2d7e04d20a1d5082.jpg", "https://i.postimg.cc/L6jcNfn7/39c305955e36a99fea52c432c6fcf2.jpg"]
  },
  { 
    id: "NS_GUILIN", title: "无影", subTitle: "桂林艺术节版", titleEn: "NO SHADOW", subTitleEn: "GUILIN FESTIVAL", year: "2026", location: "场域定制 / Site-Specific", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "桂林艺术节版的《无影》是一次绝无仅有的场域定制体验，我们将演出搬进了天然溶洞之中。面对大自然亿万年雕琢的宏伟岩壁，我摒弃了常规的人生造景思维，转而以“敬畏”与“对话”的姿态介入。设计核心是在天然洞穴中建构一座直指内心的新道场，利用有限的灯光勾勒岩石的动态张力，使环境本身成为最强大的视觉表达，探讨自然造化与人工痕迹的边界。",
    descEn: "A site-specific experience in a natural karst cave. Forgoing artificial scenery to interact with the million-year-old rock walls, constructing a new 'dojo' pointing to the heart within natural creation.",
    images: ["https://i.postimg.cc/fR8mB806/ff6c374effb426221c54877b8fa134.jpg", "https://i.postimg.cc/52sLnsFT/7f52f82e9aa63f662bf720dd3d2e77.jpg", "https://i.postimg.cc/nh3B03QN/706e8764355c54b3dacff7d70c7e76.jpg", "https://i.postimg.cc/rm0Vmmgn/a78a22b3bk4be0803caca2895a3f7fc2.jpg", "https://i.postimg.cc/q7ZB4ncm/7bcf72728kad8810578379516f8894d5.jpg", "https://i.postimg.cc/FRdrRRGP/74dad3d05ue42c052b47c2084909ac38.jpg", "https://i.postimg.cc/PxpXxxKF/62afc21f2mbc5cbc53cd2aa5259babfc.jpg", "https://i.postimg.cc/3xYxB3Jd/538da53bd3369a5ca0f13addfbb8cb.jpg"]
  },
  { 
    id: "FS_GRAND", title: "命若琴弦", subTitle: "大剧场版", titleEn: "FATE LIKE A STRING", subTitleEn: "GRAND THEATRE", year: "2025", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "基于史铁生先生经典原著，大剧场版试图将抽象命运具象化为充满阻碍的物理地貌。提取黄土高原的地域特色肌理，打造了一个集台阶与斜坡于一体的巨大组合式车台装置。这个庞然大物不仅是视觉主体，更是剧中盲人师徒一生命运的隐喻——他们终生困在起伏不定的沟壑中，在寻找与失重之间轮回。灯光在肌理上的游走，强化了空间的孤独感与生命的壮阔。",
    descEn: "Consistently based on Shi Tiesheng's masterpiece. The design concretizes abstract fate into obstructive topography. A massive moving platform with steps and slopes symbolizes the inevitable entrapment within life's uneven structures.",
    images: ["https://i.postimg.cc/qMcwrcWW/3667.jpg", "https://i.postimg.cc/jdYcB33w/3668.jpg", "https://i.postimg.cc/sgVcgQrQ/3666.jpg", "https://i.postimg.cc/vTfzc5TZ/3665.jpg", "https://i.postimg.cc/L6jcNfnz/2b67cc0a376db6b77632730065b373.jpg"] 
  },
  { 
    id: "FS_SMALL", title: "命若琴弦", subTitle: "小剧场版", titleEn: "FATE LIKE A STRING", subTitleEn: "SMALL THEATRE", year: "2026", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "小剧场版转向极致极简与哲学思辨。舞台仅由一叶轻盈小坡和孤零零的秋千构成。秋千在这里是悬荡在时间长河中的叹息，承载着主人公对命运的终极拷问。我利用幕布构建出连接天地的交界线，形成极具天地苍茫感的框景。通过极简的符号，探讨微观个体生命与宏大天地宇宙之间的张力，营造出空灵而深沉的视觉语境。",
    descEn: "Focusing on minimalist philosophy. A single slope and a swing represent a sigh in the river of time. The horizon line between heaven and earth creates a sense of vastness and cosmic dialogue.",
    images: ["https://i.postimg.cc/XXS6MKGx/665026ec3d859a8c0c55cf8a23603a.jpg", "https://i.postimg.cc/MX2Jk0M9/6923b4188367459556fbaa1e14daad.jpg", "https://i.postimg.cc/z3ZYmwb0/e4f1af01b133453d67326edd335998.jpg", "https://i.postimg.cc/4NCC6wNp/cd7950a60233b3621e19cfb196b387.jpg", "https://i.postimg.cc/L6ddtv6L/376d5c13b1f36f92249bf9913527ad.jpg", "https://i.postimg.cc/CLyyGJLG/6ce7b9a06d8f1151e57eef8919bec4.jpg"] 
  },
  { 
    id: "DW_PROJECT", title: "梅边梦柳", titleEn: "MEI BIAN MENG LIU", year: "2026", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design", 
    desc: "《梅边梦柳》的舞台设计灵感，源自对“断壁残云”这一意象的深度心理学解构。我并未将其具象化为废墟 or 衰败的实体，而是将其理解为一种悬置的“状态”——人际关系的隐秘断裂、毕生理想的不可逆残缺。整个舞台被定调为一种褪色的黑白水墨质感，后景悬挂着一幅未完成的山水亭台巨幅图卷。",
    descEn: "Inspired by 'broken walls and clouds' as a psychological state. A faded ink wash texture with an unfinished landscape scroll, representing memory's fragility.", 
    images: ["https://i.postimg.cc/6TJxsV2h/fddb7b7b37eb4f0f4c492746a55ef3.jpg", "https://i.postimg.cc/44KKgJHh/6c203c81d60578719c99409a3d4fe0.jpg", "https://i.postimg.cc/T2yy6R5s/f54f94c22a36388c4e017aed3890a0.jpg", "https://i.postimg.cc/jjSBxFvv/IMG-3506.jpg", "https://i.postimg.cc/d0VgsxnB/IMG-3507.jpg", "https://i.postimg.cc/8zHqVSdn/IMG-3508.jpg"] 
  },
  { 
    id: "WK", title: "悟空", titleEn: "WUKONG", year: "2026", location: "数字戏剧 / Digital Theatre", tag: "舞台美术设计", tagEn: "Independent Design", 
    desc: "《悟空》是中央戏剧学院数字戏剧系的前沿探索。我挑战了传统物理舞美的边界，尝试用最少的实体元素去撑起一个最为宏大的神话宇宙。视觉奇观、场景更迭以及情绪渲染，全部交由顶部的“天屏”与地面的“地屏”来完成。天与地两块巨型数字屏幕构成了整个演出的视觉呼吸系统，打破了传统镜框式舞台的景深限制。",
    descEn: "Exploring boundaries of physical stagecraft. Using digital screens as sky and ground to create the mythical universe.", 
    images: ["https://i.postimg.cc/ZRGdYXP1/IMG-3533.jpg", "https://i.postimg.cc/nzyDVNY8/IMG-3534.jpg", "https://i.postimg.cc/vBJV8C7C/IMG-3532.jpg", "https://i.postimg.cc/rs5tDggH/002ec67bb1239159e66bbde713ce4e.jpg", "https://i.postimg.cc/90yqD11n/e0da986d1552dd45a87e73af4fabbd.jpg"] 
  },
  { 
    id: "MSP", title: "在桑树坪上", titleEn: "ON THE MULBERRY PLATEAU", year: "2025", location: "案头作业 / Conceptual Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "我提取了“历史的来信”这一核心意象，并将其无限放大。在舞台地面上，我用成吨的真实稻谷与无数泛黄的旧信件，编织铺设成了一张巨大而厚重的“时间地毯”。演员在这张巨大的地毯上行走、翻找，他的每一步不仅是踩在物理的稻谷上，更是切切实实地穿梭在厚重的历史尘埃之中。",
    descEn: "Using tons of real grain and yellowed letters to form a 'time carpet'. Every step the actor takes is through the dust of history, concretizing the dialogue across generations.",
    images: ["https://i.postimg.cc/bJHd4YwG/IMG-0139.jpg", "https://i.postimg.cc/dtjDyhmR/image-20260510035612-5210a61bdb74d0adb6cb585d4f390db1.jpg", "https://i.postimg.cc/jd4C7DQH/image-20260510035347-b929ebe2207aaf7a492138cd00de008c.jpg", "https://i.postimg.cc/RFzNPJ4w/IMG-0140.jpg"] 
  },

  // 二、儿童剧部分 (Children's Theatre)
  { 
    id: "CHILD_GENTLE", title: "儿童剧部分", subTitle: "温柔的体贴的", titleEn: "Children's Theatre", subTitleEn: "GENTLE & KIND", year: "2024", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "改编自宫西达也绘本。设计核心在于空间的雕塑性：将舞台底座改造成四面坡度的半山腰结构。演员在不规则、倾斜的斜坡上攀登，通过真实的物理阻力展现生命的顽强与柔软。",
    descEn: "Based on Miyanishi's illustration. Transforming the stage into a steep landscape, forcing physical interaction and climbing as a metaphor for life's journey.",
    images: ["https://i.postimg.cc/mkncyXrj/6a5491e1a34800706cf99d3b06ed70.jpg", "https://i.postimg.cc/D0NWPjz5/d58a949fdad06ed7e8711ed52d936f.jpg", "https://i.postimg.cc/L5Wq3CsN/efe8252f76fba04aaf8256deb1758c.jpg"]
  },
  { 
    id: "CHILD_TRUST", title: "儿童剧部分", subTitle: "我相信你", titleEn: "Children's Theatre", subTitleEn: "I TRUST YOU", year: "2025", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "采用模块化重组策略。通过三种景块组合系统，实现峡谷、平原与险峻山崖的快速切换。灵活的齿轮咬合逻辑，让寻觅之旅在视觉上得到最大化的张力延展。",
    descEn: "Modular landscape systems switching between canyons and cliffs, extending the visual tension of the protagonist's quest through flexible geometric logic.",
    images: ["https://i.postimg.cc/bJjs6SpN/IMG-0137.jpg", "https://i.postimg.cc/pXwRGRW7/f3e4c0dcb59dd8cfa4be9c0c3840f5.jpg", "https://i.postimg.cc/bN7pCpy4/56372ceb2b0ff67f96c5c865dcc451.jpg", "https://i.postimg.cc/7YFwswHR/34bbdcec9d44ad75863d055df0545d.jpg"]
  },
  { 
    id: "CHILD_WOLF", title: "儿童剧部分", subTitle: "笨狼的故事", titleEn: "Children's Theatre", subTitleEn: "STORY OF THE SILLY WOLF", year: "2023", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "华丽的色彩结合流动的空间调度。树木与岩石均为底部带滑轮的可移动装置，构建出充满活力、瞬间切换场景的奇思妙想童话森林，契合低幼观众视觉偏好。",
    descEn: "Vibrant fairy-tale forest with mobile scenery on wheels, allowing fluid transitions and dynamic spatial play for young audiences.",
    images: ["https://i.postimg.cc/V6cd7012/IMG-0132.jpg", "https://i.postimg.cc/9MjrxwV6/IMG-0133.jpg", "https://i.postimg.cc/gkCmSmcb/20d1b83cd33cfcc746c2d497e2678a.jpg", "https://i.postimg.cc/ZKG474Yk/c5c48035421455a155e3c41c11b55a.jpg", "https://i.postimg.cc/yYMsQs6H/1eb1f081024a6a602bf4c60b4d7c81.jpg"]
  },
  { 
    id: "CHILD_PUPPET", title: "儿童剧部分", subTitle: "玻璃木偶", titleEn: "Children's Theatre", subTitleEn: "GLASS PUPPET", year: "2024", location: "舞台美术设计 / Stage Design", tag: "舞台美术设计", tagEn: "Independent Design",
    desc: "黑色童话语境。冰冷光泽的“玻璃房子”既是无菌舱也是笼。并置柔软枕头与冷感玻璃，通过极端材质冲突隐喻内心的脆弱。光影在透明媒介上的折射强化了疏离感。",
    descEn: "A 'glass box' cabin vs soft pillows. Exploring material conflict as a metaphor for psychological fragility and the crystalline confinement of the self.",
    images: ["https://i.postimg.cc/c1YSvPMX/IMG-3556.jpg", "https://i.postimg.cc/G21HMTd9/IMG-0136.jpg", "https://i.postimg.cc/9XThDstb/IMG-3558.jpg"]
  },

  // 三、参与舞美设计 (Project Assistant)
  { 
    id: "4D_ASSIST", title: "四十天", titleEn: "40 DAYS", year: "2025", location: "设计助理 / Project Assistant", tag: "参与舞美设计", tagEn: "Project Assistant", 
    desc: "作为本剧的设计助理，我全程深度参与了这部讲述“中国敦刻尔克”——重庆大撤退史诗巨作的视觉构建。舞台设计的核心支点是一个巨大的机械转盘，它不仅是物理意义上的空间调度工具，更是“江水”与“时间”的象征。转盘的持续转动，精准地营造出长江航道上那种波涛汹涌、生死时速的紧迫感。舞台上通过可分隔、可合并的船体结构，灵动地切割出甲板、舱室与码头等多重空间，象征着那场关乎民族命脉的迁徙。而散布于空间内的“箱子”元素，既是难民随身携带的生存重负，也是城市记忆的碎片，通过演员与箱子的高频互动，将宏大叙事解构为具体的个体痛感。在执行过程中，我侧重于机械结构与叙事节奏的配合，确保沉重的历史质感在流动的机械系统中得到最震撼的呈现。", 
    descEn: "As a design assistant, I deeply participated in the visual construction of '40 Days', an epic describing the grand retreat in Chongqing. The core is a massive mechanical turntable symbolizing the river and time. Mobile ship structures create versatile spaces for decks and cabins. I focused on the coordination of mechanical structure and narrative rhythm to ensure the historical texture is powerfully presented.", 
    images: ["https://i.postimg.cc/WzKgszs2/0bb725873ba790d2110621724cfe92-livephoto.jpg", "https://i.postimg.cc/2yJhCyCD/f56cca0431f0a1256966b754982002.jpg", "https://i.postimg.cc/8c3MTcTG/fb6e6854f31083f65c3b11e205061f.jpg", "https://i.postimg.cc/x87M989Y/9c95695e5eae8acddc4a650f5cb006-livephoto.jpg", "https://i.postimg.cc/G2cf7SsR/IMG-3538.jpg", "https://i.postimg.cc/B6MVdc2y/IMG-3542.jpg", "https://i.postimg.cc/XJVPHDy4/IMG-3541.jpg", "https://i.postimg.cc/9MWk8Nqh/IMG-3539.jpg"] 
  },
  { 
    id: "TC_ASSIST", title: "潮汐图", titleEn: "TIDE CHART", year: "2025", location: "设计助理 / Project Assistant", tag: "参与舞美设计", tagEn: "Project Assistant", 
    desc: "《潮汐图》是一部极具意识流色彩的剧作，本设计的视觉核心在于构建一个“既人工又自然”的潮汐场。舞台由地面的可旋转线条结构与上方的电机螺旋线条共同构成一个复杂的流动系统。作为助理，我协助主创实现了这种“被卷入的潮汐”感：上方多组独立电机悬挂的金属线，在静止时如理性的语言线条，旋转时则化作吞噬时间的涡流。地面散布的铁丝“水草”随机械转动而摆动，在身体与机械的纠缠中呈现个体的漂移。当上方线条、地面转盘与中央漂浮的演员身体同时处于不同速率的旋转中，舞台便形成了一种“恒定的流动”，记忆、语言与存在在此被拉伸与重组。深灰色的金属冷感与流体的柔性对比，使舞台成为一个深邃的哲学场域，探讨了身份在时间潮流中的消解与重塑。", 
    descEn: "A stream-of-consciousness work constructing an 'artificial yet natural' tidal field. The stage features rotating ground lines and overhead motor-driven spirals to create a complex flow system. I assisted in achieving this 'swallowed tide' sensation using independent motors and metallic cables. The contrast between cold metal and fluid movement transforms the stage into a philosophical space exploring identity.", 
    images: ["https://i.postimg.cc/qv09YRKJ/IMG-3512.png", "https://i.postimg.cc/bYGGhzSW/54856cbb48f1906d60cecc555199ad-livephoto.jpg", "https://i.postimg.cc/zDPnCtTZ/6f1c0ccc269b6e449d034c3f6d91be-livephoto.jpg", "https://i.postimg.cc/FHZ2Q4b1/IMG-3513.png", "https://i.postimg.cc/523ZMV5G/IMG-3510.png"] 
  },
  { 
    id: "WFG", title: "等待戈多", titleEn: "WAITING FOR GODOT", year: "2024", location: "设计助理 / Project Assistant", tag: "参与舞美设计", tagEn: "Project Assistant", 
    desc: "在孟京辉导演的先锋语境下，2024版《等待戈多》的舞台被设定为一个具有强烈政治与哲学隐喻的“柏林墙”空间。我的助理工作重点在于实现舞美的“去中心化”与“实时交互”。舞台打破了传统的观看边界，整面象征隔阂与禁锢的“柏林墙”成为了观众共创的画布。全员参与、全场观众实时在舞美装置上进行绘画与涂鸦，使舞台成为了一个随演出进程不断生长、变化的公共艺术场域。这种设定消解了设计者的绝对权威，让原本荒诞、虚无的文本在观众的即兴创作中获得了极具当下感的生命力。通过这种空间处理，原本冰冷的“墙”变成了流动的对话媒介，深刻地探讨了现代人在隔绝中寻求连接、在等待中寻找意义的生存境遇。", 
    descEn: "Under Meng Jinghui's avant-garde direction, the 2024 'Waiting for Godot' is set within a 'Berlin Wall' space filled with political and philosophical metaphors. My focus was on achieving a 'decentralized' and 'real-time interactive' stagecraft. The 'wall' became a canvas for audience co-creation, where everyone could paint and graffiti. This approach dissolved the designer's absolute authority.", 
    images: ["https://i.postimg.cc/PxkP6vTX/IMG-0134.jpg", "https://i.postimg.cc/k4dBjRqG/IMG-0135.jpg", "https://i.postimg.cc/TYzf7f2M/IMG-3548.jpg", "https://i.postimg.cc/t4Fy8w7H/IMG-3544.jpg", "https://i.postimg.cc/8zLDx9c3/IMG-3547.jpg"] 
  },
  { 
    id: "WD", title: "原野", titleEn: "WILDERNESS", year: "2025", location: "设计助理 / Project Assistant", tag: "参与舞美设计", tagEn: "Project Assistant", 
    desc: "本版《原野》的视觉逻辑建立在“旧原野消亡，新世界待续”的宏大语境下。设计方案通过极具质感对比的材质——后景巨大的“绳木”屏障与前景冰冷的“铁板”平台，构建出了一个荒凉、压抑且充满张力的生存困境。我的工作核心在于执行这一解构后的空间布局：绳木象征着原始、纠缠的血缘与命运枷锁，而铁板则带有某种工业文明的无情与坚硬。舞台上大量使用了颜料喷涂与实时作画，将仇虎与金子内心的愤怒与欲望直接泼洒在空间中。棺材作为核心道具在铁板与绳木间沉重地移动，不仅是物理位移，更是生命在死亡与复仇缝隙中的挣扎。这种对经典文本的写意处理，呈现了一场关于灵魂自我救赎与毁灭的残酷祭奠。", 
    descEn: "Based on the context 'old plains perish, new worlds await'. The visual logic utilizes a stark material contrast between massive 'rope-wood' barriers and cold iron platforms. Ropes symbolize destiny's shackles while iron represents industrial coldness. Live painting and spray-painting directly externalize the characters' inner rage. This expressionistic approach presents a cruel ritual of soul redemption.", 
    images: ["https://i.postimg.cc/DzpH8PMh/IMG-3499.jpg", "https://i.postimg.cc/rpZ3KNPk/IMG-3500.jpg", "https://i.postimg.cc/d0NpLjx1/IMG-3498.jpg", "https://i.postimg.cc/FKC87VBY/IMG-3496.jpg"] 
  },
  { 
    id: "EP", title: "折子戏", titleEn: "EXCERPTS", year: "2024", location: "设计助理 / Project Assistant", tag: "参与舞美设计", tagEn: "Project Assistant", 
    desc: "参与《折子戏》汇编演出的经历，是我作为舞美设计者回归传统、致敬经典的重要里程碑。京剧舞美有着极其严苛的“态势”与“样式”规范，本项目的核心不在于“创造新物”，而在于对“传统制式”的极致尊重与精确控制。作为设计助理，我负责了全部的平面图绘制、CAD 技术建模以及对京剧传统道具摆放位置的数字化精确管理。在这个过程中，我深度研习了京剧舞台的空间美学——那种在极简的程式化道具中包罗万象的“写意性”。通过对制式道具与传统美学语法的精准协调，我不仅理解了京剧行业对于舞台空间利用的严谨逻辑，更掌握了如何在现代剧场技术支撑下，去完美呈现那份沉淀百年的古典韵律。", 
    descEn: "A milestone of returning to tradition. The project focused on the extreme respect and precise control of 'traditional formats'. I was responsible for all drafting and CAD modeling, as well as digital management of traditional props. I deeply studied Jingju's spatial aesthetics—its 'imagery' that encompasses everything within minimal props. This experience laid a foundation for understanding theatrical ritual.", 
    images: ["https://i.postimg.cc/N0jZszpM/IMG-3504.jpg", "https://i.postimg.cc/1z3bmjJZ/IMG-3503.jpg", "https://i.postimg.cc/XvYtjzxT/IMG-3501.jpg", "https://i.postimg.cc/wBjnqG0Y/IMG-3502.jpg"] 
  },

  // 四、案头阶段 (Conceptual Design)
  { 
    id: "KL", title: "李尔王", titleEn: "KING LEAR", year: "2024", location: "案头作业 / Conceptual Design", tag: "案头设计", tagEn: "Conceptual Design", 
    desc: "设计以'倒悬的巴别塔'作为一切的出发点，回应《李尔王》中权力的崩塌与理解的幻灭。全部设计都由AI对剧本进行结构分析，给我对应的'它'所理解的李尔王，再生成图片，AI继续生成建模，五层结构对应莎士比亚原剧的五幕起伏，最终以3D打印完成制作。\n\n人类曾为彼此理解而登塔，如今，我们被理性倒置在原地。\n理性已极，情感无解。我们在崩塌之中追问，什么还存在呢", 
    descEn: "Design starts with an 'inverted Tower of Babel', responding to the collapse of power and the disillusionment of understanding in 'King Lear'. The entire design is based on AI's structural analysis of the script, generating images and 3D models with five layers corresponding to the play's five acts.", 
    images: ["https://i.postimg.cc/nz62F3Ff/3661.jpg", "https://i.postimg.cc/zB97zxzz/3662.jpg", "https://i.postimg.cc/GtGQHvtq/3663.jpg", "https://i.postimg.cc/J42cSYvp/IMG-1253.jpg", "https://i.postimg.cc/vHNLC2kq/DSC03399.jpg", "https://i.postimg.cc/yYbX2ptb/IMG-1242.jpg", "https://i.postimg.cc/kXpFLYzf/IMG-5929.jpg"] 
  },
  { 
    id: "DJ", title: "唐璜", titleEn: "DON GIOVANNI", year: "2024", location: "案头作业 / Conceptual Design", tag: "案头设计", tagEn: "Conceptual Design", 
    desc: "莫扎特经典歌剧《唐璜》的舞台设计，从“Something for nothing（我们用什么去交换虚无？）”这一深刻的哲学命题切入。唐璜看似在无休止地通过征服女性获取满足，实则内里是巨大的精神空洞。为了外化这种状态，我选用了“透明充气薄膜人体”作为核心视觉象征。在造型动态上，我致敬了贝尼尼的经典雕塑《被劫持的普罗赛庇娜》，将其对肉体强力剥夺与权力控制的张力，转化为充气人形的撕裂感。舞台基座采用了冰冷的金属机械平台，揭示了唐璜将人际关系工具化的冷漠本质。红色连接处象征着其危险激情，蓝色的平台代表着女性角色的理智、冷静与忧郁。在全剧终局唐璜拒绝悔改时，红色的缝隙中如气囊爆裂般涌出无数充气雕塑，形成极具血腥感与灵魂惩罚意味的终极视觉高潮。", 
    descEn: "Starting from 'Something for nothing', exploring Don Giovanni's spiritual emptiness. Using transparent inflatable human figures as visual symbols, paying homage to Bernini's 'The Rape of Proserpina'. The cold metallic platform reveals the instrumentalization of relationships. The final climax features a burst of inflatable sculptures symbolizing soul punishment.", 
    images: ["https://i.postimg.cc/qvW2c7F6/zi-chuan-ge-ren-zuo-pin-ji-fu-ben-32.jpg", "https://i.postimg.cc/9Mm0y5cP/IMG-9250.png", "https://i.postimg.cc/pr7dNmzg/IMG-0143.png", "https://i.postimg.cc/P515crx1/IMG-0144.png"] 
  },
  { 
    id: "NTG", title: "闹天宫", titleEn: "HEAVENLY PALACE", year: "2024", location: "案头作业 / Conceptual Design", tag: "案头设计", tagEn: "Conceptual Design", 
    desc: "针对经典京剧《闹天宫》的舞台转化，我大胆摒弃了传统戏曲中对天庭金厅煌的具象描摹，转而确立了“陶瓷碎片”与“入窑重构”这一极具东方隐喻的破坏性美学概念。孙悟空大闹天宫的核心驱动力，本质上是对旧有绝对秩序的打破与天地规则的彻底搅碎。为了将这种反叛精神视觉化，我将整个舞台想象为一件被猛力砸碎的精美瓷器。设计中大量借用了中国传统陶瓷工艺与釉上彩的视觉肌理，当孙悟空与天兵天将展开激战时，这些代表着天庭威严的“陶瓷结构”在视觉上呈现出被震碎、解体并重新在空间中流转的宏大动态。", 
    descEn: "Abandoning traditional concrete portrayals for the aesthetic of 'ceramic fragments' and 'kiln reconstruction'. Imagining the stage as a shattered fine porcelain, symbolizing the destruction of old absolute orders. The UI patterns of traditional ceramics turn into a grand dynamic flow as they disintegrate during the battle.", 
    images: ["https://i.postimg.cc/NfJ6MDkq/IMG-0151.jpg", "https://i.postimg.cc/3xkgDGtY/IMG-0152.jpg", "https://i.postimg.cc/JzsbBXpD/IMG-0153.jpg", "https://i.postimg.cc/FHYjJST3/zi-chuan-ge-ren-zuo-pin-ji-fu-ben-33.jpg"] 
  },
  { 
    id: "JGB", title: "约翰·盖布里尔·博克曼", titleEn: "BORKMAN", year: "2024", location: "案头作业 / Conceptual Design", tag: "案头设计", tagEn: "Conceptual Design", 
    desc: "本次《约翰·盖布里尔·博克曼》的舞台设计以“等待的人和被冻结的系统”为核心概念展开。剧中人物始终处于一种漫长而无法结束的等待之中。舞台空间采用灰黑色体块、平台与阶梯结构进行组合，形成一个不断向上、向前延伸却始终无法抵达终点的空间。舞台中央的几何结构如同一个被卡住的机械装置，象征博克曼曾经相信的上升逻辑与资本神话。它看似仍在运转，却早已失效并持困住所有人物。通过两侧可左右移动的阶梯与后部可向前推进的平台，空间在剧情中不断压缩、打开与重组。整个舞台最终呈现为一座关于等待、控制与失败的精神废墟。", 
    descEn: "The core concept is 'Waiting People and Frozen Systems'. Characters are trapped in an endless wait, visualized through grey-black blocks and stairs that never reach a destination. The central geometry acts as a jammed mechanism symbolizing the failed capitalist myth and environmental oppression.", 
    images: ["https://i.postimg.cc/nzFrqbnQ/IMG-0145.jpg", "https://i.postimg.cc/MGbXcKJV/IMG-0147.jpg", "https://i.postimg.cc/mrNhc2W9/IMG-0148.jpg", "https://i.postimg.cc/k5FDVXPy/IMG-0150.jpg"] 
  },
];

const CATEGORIES = [
  { id: "舞台美术设计", en: "Stage Design", sub: "独立创作 / Independent" },
  { id: "参与舞美设计", en: "Project Assistant", sub: "设计助理 / Assistant" },
  { id: "案头设计", en: "Conceptual Design", sub: "案头作业 / Conceptual" }
];

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>({
    "命若琴弦": "FS_GRAND",
    "无影": "NS_GRAND",
    "儿童剧部分": "CHILD_GENTLE"
  });
  const [dragX, setDragX] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handle = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handle);
    return () => mql.removeEventListener('change', handle);
  }, []);

  // Auto-scroll logic for sidebar
  useEffect(() => {
    let scrollInterval: any = null;
    const scrollContainer = sidebarScrollRef.current;
    if (!scrollContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = scrollContainer.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const threshold = 100; // Bottom 100px triggers scroll

      if (relativeY > rect.height - threshold && relativeY < rect.height) {
        if (!scrollInterval) {
          scrollInterval = setInterval(() => {
            scrollContainer.scrollTop += 0.05;
          }, 16);
        }
      } else {
        if (scrollInterval) {
          clearInterval(scrollInterval);
          scrollInterval = null;
        }
      }
    };

    const handleMouseLeave = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    };

    scrollContainer.addEventListener('mousemove', handleMouseMove);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProject(entry.target.getAttribute('data-id'));
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );

    const sections = document.querySelectorAll('.project-section');
    sections.forEach((section) => observer.current?.observe(section));

    return () => observer.current?.disconnect();
  }, []);

  const scrollToProject = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToCategory = (catId: string) => {
    const firstProjectInCat = portfolioData.find(p => p.tag === catId);
    if (firstProjectInCat) {
      if (isMobile) {
        const group = mobileGroups.find(g => g.variants.some((v: any) => v.id === firstProjectInCat.id));
        if (group) scrollToProject(group.id);
      } else {
        scrollToProject(firstProjectInCat.id);
      }
    }
  };

  const mobileGroups = portfolioData.reduce((acc, p) => {
    const groupTitles = ["无影", "命若琴弦", "儿童剧部分"];
    if (groupTitles.includes(p.title)) {
      const existing = acc.find((item: any) => item.title === p.title);
      if (existing) {
        existing.variants.push(p);
      } else {
        acc.push({ ...p, variants: [p], isGroup: true });
      }
    } else {
      acc.push({ ...p, variants: [p], isGroup: false });
    }
    return acc;
  }, [] as any[]);

  const displayData = isMobile ? mobileGroups : portfolioData;
  const activeProjectIndex = displayData.findIndex(p => p.id === activeProject || (p.isGroup && p.variants.some((v: any) => v.id === activeProject))) + 1;
  const totalProjects = displayData.length;
  const activeCategory = portfolioData.find(p => p.id === activeProject)?.tag || "舞台美术设计";

    return (
        <div className="relative h-screen w-screen bg-[#050505] text-white selection:bg-accent overflow-hidden font-sans flex text-[color-scheme:dark] touch-none">
            <div className="noise-overlay" />

            {/* MOBILE FLOATING CONTACT - Always present in bottom right */}
            <div className="md:hidden fixed bottom-10 right-6 z-[300] flex flex-col items-end gap-3 pointer-events-auto">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-end bg-black/40 backdrop-blur-xl px-5 py-4 border border-white/5 rounded-sm shadow-2xl"
              >
                <a href="mailto:zichuan25@gmail.com" className="sans-meta text-[9px] tracking-[0.2em] text-accent font-bold mb-1">zichuan25@gmail.com</a>
                <span className="sans-meta text-[8px] tracking-[0.3em] opacity-40 uppercase">VX: wzc20010318</span>
              </motion.div>
            </div>

            {/* FLOATING SCROLL INDICATOR */}
            <div className="fixed right-3 md:right-10 top-1/2 -translate-y-1/2 z-[150] flex flex-col items-center gap-6 pointer-events-none">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center mb-2 bg-black/20 backdrop-blur-sm p-2 rounded-full border border-white/5">
                      <span className="sans-meta text-[12px] md:text-[14px] font-bold text-accent drop-shadow-[0_0_8px_rgba(255,50,50,0.5)] transition-all">
                          {String(activeProjectIndex).padStart(2, '0')}
                      </span>
                      <div className="h-[1px] w-4 bg-accent/30 my-1.5" />
                      <span className="sans-meta text-[8px] md:text-[10px] opacity-30 font-light">
                          {String(totalProjects).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="w-[4px] h-24 md:h-32 bg-white/5 relative rounded-full overflow-hidden">
                        <motion.div 
                            className="absolute top-0 left-0 w-full bg-accent shadow-[0_0_15px_rgba(255,50,50,1)]"
                            animate={{ height: `${(activeProjectIndex / totalProjects) * 100}%` }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* TOP FLOATING CATEGORY BAR - Current context indicator */}
            <div className="md:hidden fixed top-[110px] left-1/2 -translate-x-1/2 z-[100] pointer-events-none w-full px-6">
              <div className="flex flex-col items-center">
                <motion.span 
                  key={activeCategory}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sans-meta text-[9px] tracking-[0.5em] font-bold text-accent uppercase bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 shadow-2xl"
                >
                  {activeCategory}
                </motion.span>
              </div>
            </div>

      {/* MOBILE HEADER - Only on Small Screens */}
      <div className="md:hidden fixed top-0 left-0 w-full z-[350] flex justify-between items-center p-6 bg-gradient-to-b from-black/95 to-transparent pointer-events-none">
        <div className={`flex flex-col transition-all duration-500 ${isMenuOpen ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className="font-serif text-xl font-light tracking-[0.1em] pointer-events-auto italic text-white/95">汪子川</span>
          <span className="sans-meta text-[8px] tracking-[0.4em] opacity-30 pointer-events-auto uppercase bg-white/5 py-1 px-2 border border-white/5 inline-block w-fit mt-1">2023—2027</span>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full pointer-events-auto active:scale-90 transition-all shadow-2xl"
        >
          {isMenuOpen ? <X size={20} className="text-accent" /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE PERMANENT FLOATING CONTACT - Right Bottom */}
      <div className="md:hidden fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-3 pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-end bg-black/60 backdrop-blur-2xl border border-white/10 p-4 rounded-sm shadow-2xl"
        >
           <div className="flex flex-col items-end gap-1.5 mb-1">
             <span className="sans-meta text-[7px] tracking-[0.2em] font-bold text-accent opacity-60">CONTACT / 联系</span>
             <a href="mailto:zichuan25@gmail.com" className="sans-meta text-[9px] items-center gap-2 flex opacity-70">
               zichuan25@gmail.com <Mail size={10} className="text-accent" />
             </a>
             <div className="sans-meta text-[9px] items-center gap-2 flex opacity-70">
               wzc20010318 <MessageSquare size={10} className="text-accent" />
             </div>
           </div>
        </motion.div>
      </div>

      {/* FIXED SIDEBAR - Ultra-Compact */}
      <aside className={`
        fixed md:relative inset-0 md:inset-auto z-[340] md:z-[100]
        w-full md:w-[320px] h-screen flex flex-col px-10 pt-2 pb-10
        border-r border-white/5 bg-[#050505] shrink-0 overflow-hidden
        transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1)
        ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full md:translate-x-0 opacity-0 md:opacity-100'}
      `}>
        <header className="mb-0 md:block pt-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-2xl md:text-2xl font-light tracking-[0.1em] italic text-white/95">汪子川</h1>
            <span className="sans-meta text-[10px] md:text-[11px] tracking-[0.3em] font-light opacity-20 uppercase">Zichuan Wang</span>
          </div>
          <div className="mt-4 h-[1px] w-full bg-white/5" />
        </header>

        <div className="flex-[3] flex flex-col overflow-hidden">

          {/* Project List */}
          <div 
            ref={sidebarScrollRef}
            className="flex-1 overflow-y-auto scrollbar-hide pr-2"
          >
            <div className="flex flex-col gap-8 py-6 pb-24">
              {CATEGORIES.map((cat) => {
                const projectsInCat = portfolioData.filter(p => p.tag === cat.id);
                const groupedProjects: any[] = [];
                projectsInCat.forEach(p => {
                  const existing = groupedProjects.find(g => g.title === p.title);
                  if (existing) {
                    existing.variants.push(p);
                  } else {
                    groupedProjects.push({ ...p, variants: [p] });
                  }
                });

                return (
                  <div key={cat.id} className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 py-1 border-t border-white/5 first:border-0 pt-3">
                      <div className={`h-[1px] w-4 bg-accent transition-all ${activeCategory === cat.id ? 'opacity-100' : 'opacity-20'}`} />
                      <span className={`sans-meta text-[9px] tracking-[0.3em] font-bold transition-all ${activeCategory === cat.id ? 'text-accent' : 'opacity-30'}`}>{cat.id}</span>
                    </div>

                    {groupedProjects.map((group) => {
                      const isGroupActive = group.variants.some((v: any) => v.id === activeProject);
                      const hasMultiple = group.variants.length > 1;

                      return (
                        <div key={group.id} className="flex flex-col gap-2.5">
                          <button
                            onClick={() => scrollToProject(group.variants[0].id)}
                            className={`group text-left relative transition-all duration-700 origin-left ${isGroupActive ? 'opacity-100 -translate-y-0.5' : 'opacity-40 md:opacity-20 hover:opacity-100'}`}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className={`font-serif text-lg md:text-lg font-normal transition-all duration-700 ${isGroupActive ? 'text-white' : 'text-white/60'}`}>
                                {group.title}
                              </span>
                              <span className="sans-meta text-[7px] md:text-[8px] tracking-[0.2em] font-light uppercase opacity-20 transition-opacity group-hover:opacity-40">
                                {group.titleEn}
                              </span>
                            </div>
                          </button>

                          {/* Nested Variants */}
                          <AnimatePresence>
                            {hasMultiple && isGroupActive && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="flex flex-col gap-2 pl-3 border-l border-white/10"
                              >
                                {group.variants.map((v: any) => (
                                  <button
                                    key={v.id}
                                    onClick={() => scrollToProject(v.id)}
                                    className={`text-left transition-all duration-500 ${activeProject === v.id ? 'text-accent' : 'text-white/20 hover:text-white/40'}`}
                                  >
                                    <span className="sans-meta text-[8px] md:text-[9px] tracking-wider font-light italic">{v.subTitle}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Sidebar Contact */}
        <footer className="mt-auto pt-8 pb-4 border-t border-white/5 space-y-4">
          <div className="flex flex-col gap-4">
            <a href="mailto:zichuan25@gmail.com" className="group block">
              <span className="sans-meta text-[7px] opacity-20 block mb-0.5 tracking-widest uppercase">Email</span>
              <span className="sans-meta text-[9px] opacity-30 group-hover:text-accent group-hover:opacity-100 transition-all font-light tracking-wide italic">zichuan25@gmail.com</span>
            </a>
            <div className="group block">
              <span className="sans-meta text-[7px] opacity-20 block mb-0.5 tracking-widest uppercase">WeChat</span>
              <span className="sans-meta text-[9px] opacity-30 group-hover:text-accent group-hover:opacity-100 transition-all font-light tracking-wide italic">wzc20010318</span>
            </div>
          </div>
          <div className="pt-2 opacity-5 sans-meta text-[7px] tracking-[0.3em] font-light italic uppercase">ZC.W Portfolio 23-27</div>
        </footer>
      </aside>

      {/* MAIN CONTENT Area */}
      <div className="flex-1 relative flex flex-col overflow-hidden w-full">
        {/* Floating Category Nav - Top Right - CLEAN & COMPACT */}
        <nav className="hidden lg:flex absolute top-10 right-16 z-[100] items-center gap-10 pointer-events-auto">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className="group relative"
            >
              <div className="flex flex-col items-center gap-1 transition-all">
                <span className={`sans-meta !text-[10px] tracking-[0.4em] font-bold transition-all ${activeCategory === cat.id ? 'text-accent opacity-100' : 'opacity-20 group-hover:opacity-60'}`}>
                  {cat.id}
                </span>
                <div className={`h-[1px] bg-accent shadow-[0_0_8px_rgba(255,50,50,0.4)] transition-all duration-500 scale-x-0 ${activeCategory === cat.id ? 'scale-x-100' : ''} w-4 md:w-6`} />
              </div>
            </button>
          ))}
        </nav>

        {/* SCROLL SNAP REGION */}
        <main 
          className="w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#050505] scroll-smooth"
          ref={scrollRef}
        >
          {displayData.map((project, pIdx) => {
            const isGroup = project.isGroup;
            const currentVariantId = activeVariants[project.title] || project.id;
            const currentProject = isGroup ? project.variants.find((v: any) => v.id === currentVariantId) : project;

            return (
              <section
                key={project.id}
                id={`section-${project.id}`}
                data-id={project.id}
                className="project-section h-screen w-full snap-start relative flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#050505]" />
                
                <motion.div 
                  className="relative w-full h-full flex flex-col items-center justify-center group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {/* Project Info - Visible on Mobile Main View */}
                  <div className="md:hidden w-full mb-6 mt-8 px-5 flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h3 className="font-serif text-2xl font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        {isGroup ? currentProject.title : project.title}
                        {isGroup && (
                          <span className="ml-3 font-normal text-xs opacity-50 italic">/ {currentProject.subTitle}</span>
                        )}
                      </h3>
                      <p className="sans-meta text-[8px] tracking-[0.3em] opacity-30 uppercase font-light mt-0.5">
                        {isGroup ? `${currentProject.titleEn} - ${currentProject.subTitleEn}` : project.titleEn}
                      </p>
                    </div>
                    <p className="text-[11px] font-serif font-light text-white/40 leading-relaxed line-clamp-2 max-w-[90%] italic">
                      {currentProject.desc}
                    </p>
                  </div>

                  <div className="relative w-full h-auto md:h-full max-h-[75vh] md:max-h-[92vh] overflow-visible flex flex-col justify-center">
                    <div className="relative w-full aspect-video md:aspect-auto md:h-full overflow-hidden rounded-sm">
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentProject.id}
                          src={currentProject.images[0]} 
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="w-full h-full object-contain cursor-pointer"
                          onClick={() => setSelectedProject(currentProject)}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>
                      
                      <div className="absolute top-4 left-4 md:top-12 md:left-12 flex flex-col gap-3 md:gap-4 mix-blend-difference pointer-events-none">
                        <div className="h-[1px] md:h-[1.5px] w-10 md:w-24 bg-accent shadow-[0_0_15px_rgba(255,50,50,0.5)]" />
                        <div className="flex flex-col">
                          <span className="sans-meta text-[7px] md:text-[10px] tracking-[0.5em] md:tracking-[0.7em] opacity-80">{currentProject.year}</span>
                          <span className="sans-meta text-[5px] md:text-[8px] tracking-[0.4em] md:tracking-[0.5em] opacity-40 mt-1 md:mt-2 uppercase">{currentProject.tag}</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-8 md:-bottom-16 right-0 pointer-events-auto">
                      <button 
                        className="sans-meta text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] font-medium opacity-30 hover:opacity-100 transition-all flex items-center gap-3 md:gap-4 group/btn"
                        onClick={() => setSelectedProject(currentProject)}
                      >
                        <span className="hidden sm:inline">VIEW DETAIL / </span>
                        <span>详情</span>
                        <div className="h-[1px] w-6 md:w-8 bg-white/20 group-hover/btn:w-12 md:group-hover/btn:w-16 group-hover/btn:bg-accent transition-all" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </section>
            );
          })}
        </main>
      </div>


      {/* DETAIL VIEW OVERLAY - Continuous Scroll */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: dragX }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 35, stiffness: 300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.8, right: 0.8 }}
            onDrag={(_e, info) => {
              setDragX(info.offset.x);
            }}
            onDragEnd={(_e, info) => {
              if (Math.abs(info.offset.x) > 150 || Math.abs(info.velocity.x) > 500) {
                setSelectedProject(null);
              }
              setDragX(0);
            }}
            className="fixed inset-0 z-[500] bg-[#050505] overflow-y-auto scroll-smooth"
          >
            {/* Close Button - Sticky Fixed */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="fixed top-6 right-6 md:top-10 md:right-10 z-[600] flex items-center gap-3 md:gap-4 sans-meta text-accent hover:tracking-[0.5em] transition-all bg-black/60 backdrop-blur-2xl px-5 py-4 border border-white/10 rounded-sm shadow-2xl"
            >
              <span className="hidden sm:inline">CLOSE / </span>返回 <X size={18} />
            </button>

            <div className="w-full flex flex-col">
              {(() => {
                const startIndex = portfolioData.findIndex(p => p.id === selectedProject.id);
                const orderedList = [
                  ...portfolioData.slice(startIndex),
                  ...portfolioData.slice(0, startIndex)
                ];

                return orderedList.map((project, idx) => (
                  <div key={project.id} id={`detail-${project.id}`} className="w-full border-b border-white/5 pb-32 md:pb-64">
                    <div className="relative w-full h-[70vh] md:h-[90vh]">
                      <img src={project.images[0]} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
                      <div className="absolute bottom-12 left-8 md:bottom-24 md:left-24 max-w-4xl px-4">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="sans-meta text-accent mb-6 flex items-center gap-4 text-[10px] md:text-[12px] opacity-90">
                          <div className="h-[1.5px] w-12 md:w-20 bg-accent shadow-[0_0_15px_rgba(255,50,50,0.5)]" />
                          <span className="tracking-[0.5em] uppercase font-bold">{project.tag}</span>
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-3xl md:text-5xl font-medium italic tracking-tight mb-2 drop-shadow-2xl text-white/95">
                          {project.title}
                        </motion.h2>
                        {project.subTitle && (
                          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} transition={{ delay: 0.15 }} className="font-serif text-lg md:text-xl opacity-60 italic mb-4">
                            {project.subTitle}
                          </motion.div>
                        )}
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} transition={{ delay: 0.2 }} className="sans-meta text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-light">
                          {project.subTitleEn ? `${project.titleEn} / ${project.subTitleEn}` : project.titleEn}
                        </motion.div>
                      </div>
                    </div>
                    <div className="w-full px-8 md:px-24 py-16 md:py-32 flex flex-col lg:flex-row gap-16 md:gap-32 max-w-[2000px] mx-auto">
                      <div className="w-full lg:w-[26%] space-y-12 lg:sticky lg:top-32 lg:self-start">
                        <div className="space-y-10">
                          <p className="text-[14px] md:text-[16px] font-serif text-white/90 leading-relaxed font-light italic">{project.desc}</p>
                          <p className="text-[11px] md:text-[12px] font-sans font-light text-white/25 leading-relaxed tracking-[0.05em] uppercase italic">{project.descEn}</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-10 pt-12 border-t border-white/10">
                          <div className="space-y-3">
                            <div className="sans-meta text-accent opacity-50 text-[7px] tracking-[0.5em] font-bold">CONTEXT</div>
                            <div className="text-[8px] md:text-[9px] opacity-60 leading-relaxed tracking-wider">{project.location}</div>
                          </div>
                          <div className="space-y-3">
                            <div className="sans-meta text-accent opacity-50 text-[7px] tracking-[0.5em] font-bold">PERIOD</div>
                            <div className="text-[8px] md:text-[9px] opacity-60 tracking-wider font-light">{project.year}</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-[78%] flex flex-col gap-24 md:gap-40">
                        {project.images.map((img: string, i: number) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-5%" }} transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }} className="w-full relative shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden group/img">
                            <img src={img} className="w-full h-auto opacity-100 transition-transform duration-3000 group-hover/img:scale-105" referrerPolicy="no-referrer" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                ));
              })()}
              <div className="py-40 text-center">
                <button onClick={() => { setSelectedProject(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="sans-meta text-[10px] tracking-[1em] opacity-20 hover:opacity-100 hover:text-accent transition-all uppercase">
                  Return to Home / 返回首页
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
