-- ================================================================
-- POPULATE LESSONS 18-25 FLASHCARDS (BASED ON lesson-data.txt)
-- ================================================================
-- This script adds flashcards for lessons 18-25 with authentic textbook vocabulary

SELECT 'Starting to populate lessons 18-25 flashcards...' as status;

-- First, create lessons 18-25 if they don't exist
INSERT INTO lessons (id, title, level, lesson_number, description, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Travel and Help', 1, 18, 'Travel arrangements and helping others', NOW(), NOW()),
  (gen_random_uuid(), 'Shopping and Clothes', 1, 19, 'Clothing, appearance and shopping', NOW(), NOW()),
  (gen_random_uuid(), 'Birthdays and Celebrations', 1, 20, 'Birthdays, age, and celebrations', NOW(), NOW()),
  (gen_random_uuid(), 'Daily Schedule', 1, 21, 'Daily routines and time management', NOW(), NOW()),
  (gen_random_uuid(), 'Hobbies and Interests', 1, 22, 'Personal interests and cultural activities', NOW(), NOW()),
  (gen_random_uuid(), 'Directions and Places', 1, 23, 'Locations, directions, and navigation', NOW(), NOW()),
  (gen_random_uuid(), 'Health and Feelings', 1, 24, 'Health conditions and physical feelings', NOW(), NOW()),
  (gen_random_uuid(), 'Performance and Progress', 1, 25, 'TV, performance, and language progress', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Lesson 18 Flashcards
DO $$
DECLARE
    lesson18_id UUID;
BEGIN
    SELECT id INTO lesson18_id FROM lessons WHERE level = 1 AND lesson_number = 18;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson18_id, '修', 'xiū', 'to repair', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '旅行', 'lǚ xíng', 'to travel', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '顺便', 'shùn biàn', 'by the way', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '替', 'tì', 'for/instead of', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '盒', 'hé', 'box', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '曲别针', 'qū bié zhēn', 'paper clip', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '拿', 'ná', 'to take', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '不用', 'bù yòng', 'no need', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '代表', 'dài biǎo', 'representative', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '团', 'tuán', 'group', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '参观', 'cān guān', 'to visit', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '当', 'dāng', 'to be/serve as', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '翻译', 'fān yì', 'to translate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '飞机', 'fēi jī', 'airplane', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '火车', 'huǒ chē', 'train', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '回来', 'huí lái', 'to come back', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '帮忙', 'bāng máng', 'to help', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '浇', 'jiāo', 'to water', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '花', 'huā', 'flower', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson18_id, '问题', 'wèn tí', 'question/problem', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 18', 20;
END $$;

-- Lesson 19 Flashcards
DO $$
DECLARE
    lesson19_id UUID;
BEGIN
    SELECT id INTO lesson19_id FROM lessons WHERE level = 1 AND lesson_number = 19;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson19_id, '光临', 'guāng lín', 'to visit (polite)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '羽绒服', 'yǔ róng fú', 'down jacket', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '好看', 'hǎo kàn', 'good-looking', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '一点儿', 'yī diǎn r', 'a little', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '长', 'cháng', 'long', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '短', 'duǎn', 'short', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '深', 'shēn', 'deep/dark (color)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '浅', 'qiǎn', 'shallow/light (color)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '试', 'shì', 'to try', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '可以', 'kě yǐ', 'can/may', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '当然', 'dāng rán', 'of course', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '肥', 'féi', 'fat/loose', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '胖', 'pàng', 'fat', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '瘦', 'shòu', 'thin', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '合适', 'hé shì', 'suitable', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '种', 'zhǒng', 'type/kind', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson19_id, '打折', 'dǎ zhé', 'to discount', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 19', 17;
END $$;

-- Lesson 20 Flashcards
DO $$
DECLARE
    lesson20_id UUID;
BEGIN
    SELECT id INTO lesson20_id FROM lessons WHERE level = 1 AND lesson_number = 20;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson20_id, '年', 'nián', 'year', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '毕业', 'bì yè', 'to graduate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '岁', 'suì', 'years old', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '属', 'shǔ', 'to belong to (zodiac)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '狗', 'gǒu', 'dog', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '猪', 'zhū', 'pig', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '生日', 'shēng rì', 'birthday', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '月', 'yuè', 'month', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '正好', 'zhèng hǎo', 'just right', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '打算', 'dǎ suàn', 'to plan', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '过', 'guò', 'to celebrate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '准备', 'zhǔn bèi', 'to prepare', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '举行', 'jǔ xíng', 'to hold (event)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '晚会', 'wǎn huì', 'evening party', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '参加', 'cān jiā', 'to participate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '时间', 'shí jiān', 'time', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '点钟', 'diǎn zhōng', 'o''clock', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '就', 'jiù', 'then', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '一定', 'yī dìng', 'definitely', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '祝', 'zhù', 'to wish', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '快乐', 'kuài lè', 'happy', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson20_id, '祝你生日快乐', 'zhù nǐ shēng rì kuài lè', 'happy birthday', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 20', 22;
END $$;

-- Lesson 21 Flashcards
DO $$
DECLARE
    lesson21_id UUID;
BEGIN
    SELECT id INTO lesson21_id FROM lessons WHERE level = 1 AND lesson_number = 21;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson21_id, '每', 'měi', 'every', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '早上', 'zǎo shang', 'morning', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '半', 'bàn', 'half', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '起床', 'qǐ chuáng', 'to get up', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '早饭', 'zǎo fàn', 'breakfast', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '分钟', 'fēn zhōng', 'minute', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '教室', 'jiào shì', 'classroom', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '上课', 'shàng kè', 'to have class', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '节', 'jié', 'period/class', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '下课', 'xià kè', 'class ends', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '以后', 'yǐ hòu', 'after', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '操场', 'cāo chǎng', 'playground', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '锻炼', 'duàn liàn', 'to exercise', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '洗澡', 'xǐ zǎo', 'to shower', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '然后', 'rán hòu', 'then', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '睡觉', 'shuì jiào', 'to sleep', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '们', 'men', 'plural marker', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '爬', 'pá', 'to climb', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '山', 'shān', 'mountain', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '年级', 'nián jí', 'grade level', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '出发', 'chū fā', 'to depart', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '前', 'qián', 'before', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '集合', 'jí hé', 'to gather', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '上车', 'shàng chē', 'to board vehicle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '刻', 'kè', 'quarter (15 min)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '准时', 'zhǔn shí', 'on time', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson21_id, '带', 'dài', 'to bring', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 21', 27;
END $$;

-- Lesson 22 Flashcards
DO $$
DECLARE
    lesson22_id UUID;
BEGIN
    SELECT id INTO lesson22_id FROM lessons WHERE level = 1 AND lesson_number = 22;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson22_id, '自己', 'zì jǐ', 'oneself', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '爱好', 'ài hào', 'hobby', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '让', 'ràng', 'to let', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '京剧', 'jīng jù', 'Beijing opera', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '喜欢', 'xǐ huan', 'to like', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '非常', 'fēi cháng', 'very', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '唱', 'chàng', 'to sing', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '完', 'wán', 'to finish', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '游戏', 'yóu xì', 'game', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '感到', 'gǎn dào', 'to feel', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '心情', 'xīn qíng', 'mood', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '愉快', 'yú kuài', 'pleasant', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '业余', 'yè yú', 'spare time', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '以前', 'yǐ qián', 'before', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '对', 'duì', 'towards', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '书法', 'shū fǎ', 'calligraphy', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '特别', 'tè bié', 'especially', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '感兴趣', 'gǎn xìng qù', 'interested', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '派', 'pài', 'school/style', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson22_id, '画', 'huà', 'to paint', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 22', 20;
END $$;

-- Lesson 23 Flashcards
DO $$
DECLARE
    lesson23_id UUID;
BEGIN
    SELECT id INTO lesson23_id FROM lessons WHERE level = 1 AND lesson_number = 23;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson23_id, '边', 'biān', 'side', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '东边', 'dōng biān', 'east side', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '西边', 'xī biān', 'west side', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '南边', 'nán biān', 'south side', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '北边', 'běi biān', 'north side', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '前边', 'qián biān', 'front', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '后边', 'hòu biān', 'back', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '左边', 'zuǒ biān', 'left side', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '右边', 'yòu biān', 'right side', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '里边', 'lǐ biān', 'inside', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '外边', 'wài biān', 'outside', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '上边', 'shàng biān', 'above', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '下边', 'xià biān', 'below', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '离', 'lí', 'distance from', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '远', 'yuǎn', 'far', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '进', 'jìn', 'to enter', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '地方', 'dì fang', 'place', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '足球场', 'zú qiú chǎng', 'soccer field', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '劳驾', 'láo jià', 'excuse me', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '打听', 'dǎ tīng', 'to inquire', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '博物馆', 'bó wù guǎn', 'museum', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '和平', 'hé píng', 'peace', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '广场', 'guǎng chǎng', 'square/plaza', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '中间', 'zhōng jiān', 'middle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '从', 'cóng', 'from', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '到', 'dào', 'to', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '米', 'mǐ', 'meter', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '一直', 'yī zhí', 'straight', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '往', 'wǎng', 'towards', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '红绿灯', 'hóng lǜ dēng', 'traffic light', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '左', 'zuǒ', 'left', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '右', 'yòu', 'right', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '拐', 'guǎi', 'to turn', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '马路', 'mǎ lù', 'road', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '座', 'zuò', 'measure word for buildings', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson23_id, '白色', 'bái sè', 'white color', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 23', 36;
END $$;

-- Lesson 24 Flashcards
DO $$
DECLARE
    lesson24_id UUID;
BEGIN
    SELECT id INTO lesson24_id FROM lessons WHERE level = 1 AND lesson_number = 24;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson24_id, '听说', 'tīng shuō', 'to hear (said)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '下', 'xià', 'next', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '报名', 'bào míng', 'to register', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '开始', 'kāi shǐ', 'to begin', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '能', 'néng', 'can/able', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '再', 'zài', 'again', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '遍', 'biàn', 'time (occurrence)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '懂', 'dǒng', 'to understand', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '意思', 'yì si', 'meaning', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '次', 'cì', 'time/occurrence', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '小时', 'xiǎo shí', 'hour', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '请假', 'qǐng jià', 'to ask for leave', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '舒服', 'shū fu', 'comfortable', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '头疼', 'tóu téng', 'headache', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '发烧', 'fā shāo', 'to have fever', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '咳嗽', 'ké sou', 'to cough', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '可能', 'kě néng', 'possible', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '感冒', 'gǎn mào', 'cold (illness)', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson24_id, '看病', 'kàn bìng', 'to see doctor', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 24', 19;
END $$;

-- Lesson 25 Flashcards
DO $$
DECLARE
    lesson25_id UUID;
BEGIN
    SELECT id INTO lesson25_id FROM lessons WHERE level = 1 AND lesson_number = 25;
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at) VALUES
    (gen_random_uuid(), lesson25_id, '电视台', 'diàn shì tái', 'TV station', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '表演', 'biǎo yǎn', 'to perform', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '节目', 'jié mù', 'program', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '愿意', 'yuàn yì', 'willing', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '为什么', 'wèi shén me', 'why', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '得', 'de', 'complement particle', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '不错', 'bù cuò', 'not bad', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '进步', 'jìn bù', 'progress', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '水平', 'shuǐ píng', 'level', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '提高', 'tí gāo', 'to improve', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '哪里', 'nǎ lǐ', 'where/modest reply', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '准', 'zhǔn', 'accurate', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '流利', 'liú lì', 'fluent', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '这么', 'zhè me', 'so/this way', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '那么', 'nà me', 'so/that way', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '努力', 'nǔ lì', 'to work hard', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '认真', 'rèn zhēn', 'serious', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '为', 'wèi', 'for', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '早', 'zǎo', 'early', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '运动', 'yùn dòng', 'sports/exercise', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '跑步', 'pǎo bù', 'to run', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '篮球', 'lán qiú', 'basketball', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '刚才', 'gāng cái', 'just now', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '坚持', 'jiān chí', 'to persist', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '因为', 'yīn wèi', 'because', 1, NOW(), NOW()),
    (gen_random_uuid(), lesson25_id, '晚', 'wǎn', 'late', 1, NOW(), NOW());
    
    RAISE NOTICE 'Inserted % flashcards for Lesson 25', 26;
END $$;

-- Final verification
SELECT 'Verification Results for Lessons 18-25:' as status;

SELECT 
  l.lesson_number,
  l.title,
  COUNT(f.id) as flashcard_count
FROM lessons l
LEFT JOIN flashcards f ON l.id = f.lesson_id
WHERE l.level = 1 AND l.lesson_number BETWEEN 18 AND 25
GROUP BY l.id, l.lesson_number, l.title
ORDER BY l.lesson_number;

SELECT 
  COUNT(*) as total_new_flashcards,
  'authentic textbook flashcards created for lessons 18-25' as note
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 18 AND 25;

-- Show overall progress for all lessons
SELECT 
  COUNT(*) as total_all_flashcards,
  'total authentic flashcards (lessons 1-25)' as note
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 25;

-- Show breakdown by lesson ranges
SELECT 'Breakdown by lesson ranges:' as status;

SELECT 
  CASE 
    WHEN l.lesson_number BETWEEN 1 AND 8 THEN 'Lessons 1-8'
    WHEN l.lesson_number BETWEEN 9 AND 17 THEN 'Lessons 9-17'
    WHEN l.lesson_number BETWEEN 18 AND 25 THEN 'Lessons 18-25'
  END as lesson_range,
  COUNT(f.id) as flashcard_count
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 25
GROUP BY 
  CASE 
    WHEN l.lesson_number BETWEEN 1 AND 8 THEN 'Lessons 1-8'
    WHEN l.lesson_number BETWEEN 9 AND 17 THEN 'Lessons 9-17'
    WHEN l.lesson_number BETWEEN 18 AND 25 THEN 'Lessons 18-25'
  END
ORDER BY lesson_range;

SELECT 'Lessons 18-25 flashcards population completed successfully!' as status;
SELECT 'Complete textbook vocabulary (Lessons 1-25) now available!' as final_status; 