export interface ReadingContent {
  id: string;
  lesson: number;
  type: 'dialogue' | 'passage';
  title: string;
  content: string;
  vocabulary: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
}

export const LEVEL1_READING_DATA: ReadingContent[] = [
  // Lesson 1 - Greetings and Introductions
  {
    id: 'l1-dialogue-1',
    lesson: 1,
    type: 'dialogue',
    title: 'Meeting for the First Time',
    content: `小明：你好！
小红：你好！
小明：我叫小明，你叫什么名字？
小红：我叫小红。很高兴认识你！
小明：我也很高兴认识你。你是学生吗？
小红：是的，我是学生。你呢？
小明：我也是学生。`,
    vocabulary: ['你好', '叫', '名字', '很', '高兴', '认识', '学生'],
    difficulty: 'beginner',
    estimatedTime: 3
  },
  {
    id: 'l1-passage-1',
    lesson: 1,
    type: 'passage',
    title: 'Self Introduction',
    content: `我叫李华，今年二十岁。我是中国人，来自北京。我在大学学习英语。我有一个妹妹和一个弟弟。我的妹妹很聪明，她喜欢读书。我的弟弟很活泼，他喜欢运动。我们全家人都很友好。周末的时候，我们常常一起去公园散步。`,
    vocabulary: ['叫', '今年', '岁', '中国人', '来自', '大学', '学习', '妹妹', '弟弟', '聪明', '喜欢', '读书', '活泼', '运动', '全家', '友好', '周末', '常常', '一起', '公园', '散步'],
    difficulty: 'beginner',
    estimatedTime: 5
  },

  // Lesson 2 - Family and Home
  {
    id: 'l1-dialogue-2',
    lesson: 2,
    type: 'dialogue',
    title: 'Talking about Family',
    content: `王老师：你家有几口人？
学生：我家有四口人。
王老师：都有谁？
学生：有爸爸、妈妈、姐姐和我。
王老师：你爸爸做什么工作？
学生：我爸爸是医生，我妈妈是老师。
王老师：你姐姐呢？
学生：我姐姐在银行工作。`,
    vocabulary: ['家', '几口人', '都', '谁', '爸爸', '妈妈', '姐姐', '做', '工作', '医生', '老师', '银行'],
    difficulty: 'beginner',
    estimatedTime: 4
  },
  {
    id: 'l1-passage-2',
    lesson: 2,
    type: 'passage',
    title: 'My Family Home',
    content: `我们家住在一个小区里。我们的房子有三个房间：客厅、卧室和厨房。客厅很大，有沙发、电视和书架。卧室里有床、衣柜和书桌。厨房里有冰箱、炉子和洗碗机。我最喜欢的地方是我的房间，因为那里很安静，我可以在那里学习和休息。每天晚上，我们全家人都在客厅看电视。`,
    vocabulary: ['住', '小区', '房子', '房间', '客厅', '卧室', '厨房', '大', '沙发', '电视', '书架', '床', '衣柜', '书桌', '冰箱', '炉子', '洗碗机', '最', '地方', '安静', '可以', '学习', '休息', '每天', '晚上', '全家人', '看'],
    difficulty: 'beginner',
    estimatedTime: 6
  },

  // Lesson 3 - Daily Activities
  {
    id: 'l1-dialogue-3',
    lesson: 3,
    type: 'dialogue',
    title: 'Daily Routine',
    content: `小李：你每天几点起床？
小张：我每天七点起床。你呢？
小李：我六点半起床。你早饭吃什么？
小张：我喝牛奶，吃面包。
小李：我也喝牛奶，但是我吃鸡蛋。
小张：你几点上班？
小李：我八点上班，你呢？
小张：我八点半上班。`,
    vocabulary: ['每天', '几点', '起床', '早饭', '吃', '喝', '牛奶', '面包', '鸡蛋', '上班'],
    difficulty: 'beginner',
    estimatedTime: 4
  },
  {
    id: 'l1-passage-3',
    lesson: 3,
    type: 'passage',
    title: 'A Typical Day',
    content: `我是一名大学生，每天的生活很规律。早上六点半起床，先洗漱，然后吃早饭。八点去教室上课。中午十二点在学校食堂吃午饭，然后午休一小时。下午继续上课到五点。晚上回到宿舍，先做作业，然后和室友聊天。十点半洗澡，十一点睡觉。周末的时候，我喜欢去图书馆看书，或者和朋友一起去商场购物。`,
    vocabulary: ['大学生', '生活', '规律', '早上', '先', '洗漱', '然后', '教室', '上课', '中午', '学校', '食堂', '午饭', '午休', '小时', '下午', '继续', '到', '晚上', '回到', '宿舍', '做作业', '室友', '聊天', '洗澡', '睡觉', '周末', '时候', '图书馆', '看书', '或者', '朋友', '一起', '商场', '购物'],
    difficulty: 'intermediate',
    estimatedTime: 7
  }
];

export const getLevel1ReadingByLesson = (lesson: number) => {
  return LEVEL1_READING_DATA.filter(item => item.lesson === lesson);
};

export const getLevel1ReadingById = (id: string) => {
  return LEVEL1_READING_DATA.find(item => item.id === id);
}; 