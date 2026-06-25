(() => {
  const variants = [
    {
      name: "日常",
      ratios: [44, 28, 16, 8, 4],
      reason: "比例接近 60/30/10 的生活版，主色稳定，点缀色只负责留下记忆点。",
      practice: "今天只让一个点缀色出现一次，观察它是否让整体更完整。",
      mood: ["calm", "clear"],
      energy: [2, 3]
    },
    {
      name: "清醒",
      ratios: [42, 30, 14, 9, 5],
      reason: "留白比例更高，色彩关系会更干净，适合需要清爽和秩序感的日子。",
      practice: "把最亮的颜色留给背景或大面积留白，再用深色收住边界。",
      mood: ["clear"],
      energy: [3, 4]
    },
    {
      name: "柔和",
      ratios: [48, 27, 14, 7, 4],
      reason: "主色面积更大，饱和度更低，整体会更安静，适合把注意力放在质感上。",
      practice: "找一件材质柔软的单品，让它承担今天的主色。",
      mood: ["calm", "warm"],
      energy: [1, 2]
    },
    {
      name: "精神",
      ratios: [38, 28, 18, 11, 5],
      reason: "点缀色比例略微提高，仍然不抢主色，但能让画面或穿搭更有精神。",
      practice: "让点缀色靠近脸部、标题或画面中心，看看它是否更有存在感。",
      mood: ["bold", "clear"],
      energy: [4, 5]
    },
    {
      name: "低调",
      ratios: [50, 24, 14, 6, 6],
      reason: "收边色和主色都更明确，适合把整体压稳，不让配色显得飘。",
      practice: "今天用一个深色做轮廓，比如鞋、腰带、标题或家具边线。",
      mood: ["calm"],
      energy: [1, 3]
    }
  ];

  const seeds = [
    {
      title: "雾绿与砖红",
      colors: [
        ["#d8ddcf", "雾灰绿"],
        ["#f6efe1", "温米白"],
        ["#8b9b88", "鼠尾草"],
        ["#9d4c42", "暖砖红"],
        ["#32352f", "深苔灰"]
      ],
      tags: { weather: ["cloudy", "cool"], mood: ["calm", "warm"] },
      scenes: ["米白针织、灰绿外套、砖红小包。", "绿色和米白占多数，红色只出现一次。", "标题用深灰绿，重点线条用暖砖红。", "靠垫或小花器做点缀，墙面保持安静。"]
    },
    {
      title: "晨雾蓝与柔金",
      colors: [
        ["#dfe7ea", "晨雾蓝"],
        ["#fff8ea", "奶油白"],
        ["#6e8ea5", "旧牛仔蓝"],
        ["#c5a15b", "柔金色"],
        ["#44413b", "烟灰褐"]
      ],
      tags: { weather: ["bright", "cool"], mood: ["clear", "warm"] },
      scenes: ["浅蓝衬衫、奶白裤装、金色耳饰。", "蓝白照片中插入一张暖光近景。", "正文深灰，章节标记用柔金。", "冷白蓝床品搭配暖光台灯。"]
    },
    {
      title: "淡陶土与灰蓝绿",
      colors: [
        ["#ead8cc", "淡陶土"],
        ["#f8f3eb", "纸白"],
        ["#b47b65", "玫瑰棕"],
        ["#59736d", "灰蓝绿"],
        ["#2f302b", "墨灰"]
      ],
      tags: { weather: ["bright", "cloudy"], mood: ["warm", "calm"] },
      scenes: ["陶土色上衣、米白半裙、灰绿围巾。", "暖色照片里放入一张植物或阴影图。", "封面温柔，目录和页码用墨灰。", "木色与粉棕做软装，植物降温。"]
    },
    {
      title: "雨天蓝灰",
      colors: [
        ["#cbd6df", "雨雾蓝"],
        ["#eef0ec", "浅雾白"],
        ["#748391", "蓝灰"],
        ["#a77c5b", "湿木棕"],
        ["#26313a", "深海灰"]
      ],
      tags: { weather: ["rain", "cloudy"], mood: ["calm", "clear"] },
      scenes: ["蓝灰外套、浅灰内搭、棕色皮鞋。", "照片保留雨天低对比，木色只做一格。", "图表用蓝灰，重点按钮用湿木棕。", "深蓝灰窗帘搭配浅灰织物。"]
    },
    {
      title: "晴空与柠檬",
      colors: [
        ["#d7ecff", "晴空蓝"],
        ["#fff9d7", "淡柠檬"],
        ["#7bb7d8", "浅海蓝"],
        ["#e0b84d", "蜂蜜黄"],
        ["#30445c", "夜蓝"]
      ],
      tags: { weather: ["bright", "hot"], mood: ["clear", "bold"] },
      scenes: ["浅蓝衬衫、白裤、黄色发夹或包挂。", "蓝白照片中让黄色只出现一次。", "背景浅蓝，重点数据用蜂蜜黄。", "浅蓝床品搭配一件黄色小物。"]
    },
    {
      title: "橄榄与奶油",
      colors: [
        ["#cfd5b8", "浅橄榄"],
        ["#faf3dd", "奶油米"],
        ["#7f8b5f", "橄榄绿"],
        ["#b96f4c", "陶橙"],
        ["#3d4034", "橄榄黑"]
      ],
      tags: { weather: ["cool", "cloudy"], mood: ["warm", "calm"] },
      scenes: ["奶油毛衣、橄榄裤、陶橙袜子。", "植物色为主，陶橙留给食物或小物。", "橄榄绿做小标题，陶橙做提醒。", "沙发毯用橄榄，花器用陶橙。"]
    },
    {
      title: "紫灰与月白",
      colors: [
        ["#d9d6e8", "紫雾灰"],
        ["#f6f4fb", "月白"],
        ["#8f89a8", "蓝紫灰"],
        ["#6aa5a1", "雾青"],
        ["#2f2d3b", "深紫黑"]
      ],
      tags: { weather: ["cloudy", "rain"], mood: ["calm", "bold"] },
      scenes: ["月白衬衫、紫灰半裙、雾青丝巾。", "紫灰照片中用一张青色细节提亮。", "紫灰做背景，雾青做图标和标注。", "床头小物用雾青，织物保持月白。"]
    },
    {
      title: "海盐青与珊瑚",
      colors: [
        ["#cfe8e5", "海盐青"],
        ["#fff5ee", "贝壳白"],
        ["#75aaa5", "浅青绿"],
        ["#e78d78", "软珊瑚"],
        ["#31535a", "深海青"]
      ],
      tags: { weather: ["hot", "bright"], mood: ["clear", "warm"] },
      scenes: ["贝壳白上衣、海盐青半裙、珊瑚色唇妆。", "海边感照片中只留一格珊瑚色。", "海盐青做底，珊瑚色做重点批注。", "浴室或书桌用浅青绿，花材用珊瑚。"]
    },
    {
      title: "石墨与杏桃",
      colors: [
        ["#d7d4ca", "石灰米"],
        ["#fff3e6", "杏白"],
        ["#77746b", "石墨灰"],
        ["#e2a06d", "杏桃橙"],
        ["#2f302c", "炭黑"]
      ],
      tags: { weather: ["cloudy", "cool"], mood: ["warm", "bold"] },
      scenes: ["灰米外套、杏白内搭、杏桃色围巾。", "灰白画面里保留一个杏桃近景。", "石墨灰写标题，杏桃橙做强调线。", "灰米地毯配杏桃抱枕。"]
    },
    {
      title: "冷杉与浆果",
      colors: [
        ["#d9e2dc", "冷杉雾"],
        ["#f4f1ea", "亚麻白"],
        ["#55705f", "冷杉绿"],
        ["#8d3f5f", "浆果紫"],
        ["#24332c", "深林绿"]
      ],
      tags: { weather: ["cool", "rain"], mood: ["calm", "bold"] },
      scenes: ["亚麻白衬衫、冷杉绿外套、浆果色耳饰。", "冷绿画面中放一张浆果色小物。", "冷杉绿做章节色，浆果紫做警示。", "绿植和亚麻织物中加入浆果花材。"]
    },
    {
      title: "燕麦与天青",
      colors: [
        ["#e4dccd", "燕麦米"],
        ["#f8f6ef", "软白"],
        ["#b9a98f", "麦秆色"],
        ["#7fb2cf", "天青"],
        ["#3c4b55", "蓝灰黑"]
      ],
      tags: { weather: ["bright", "cloudy"], mood: ["clear", "calm"] },
      scenes: ["燕麦针织、软白长裤、天青色包。", "米色九宫格里用一张蓝天打破单调。", "文档底色温白，链接和图标用天青。", "木色房间中加入一件天青织物。"]
    },
    {
      title: "黑茶与浅粉",
      colors: [
        ["#ded6d0", "烟粉灰"],
        ["#fbf1ed", "浅粉白"],
        ["#8b6f65", "黑茶棕"],
        ["#c9879b", "干玫瑰"],
        ["#2f2927", "浓茶黑"]
      ],
      tags: { weather: ["cool", "cloudy"], mood: ["warm", "bold"] },
      scenes: ["浅粉白内搭、黑茶棕外套、干玫瑰口红。", "粉灰画面里用深棕提高质感。", "粉白做底，黑茶棕做标题。", "卧室用烟粉灰织物，深木色收边。"]
    }
  ];

  window.DAILY_COLOR_PALETTES = seeds.flatMap((seed) =>
    variants.map((variant) => ({
      title: `${seed.title} · ${variant.name}`,
      colors: seed.colors.map(([hex, name], index) => ({
        hex,
        name,
        role: ["主色", "留白", "支撑", "点缀", "收边"][index],
        ratio: variant.ratios[index]
      })),
      reason: `${seed.title}的关系适合${variant.name}使用。${variant.reason}`,
      practice: variant.practice,
      scenes: seed.scenes,
      tags: {
        weather: seed.tags.weather,
        mood: [...new Set([...seed.tags.mood, ...variant.mood])],
        energy: variant.energy
      },
      source: "curated-v1"
    }))
  );
})();
