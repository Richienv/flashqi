-- ================================================================
-- POPULATE TEXTBOOK FLASHCARDS DATA (LESSONS 1-8)
-- ================================================================
-- This script populates the flashcards table with authentic textbook vocabulary
-- Run this in Supabase SQL Editor after fixing the constraint issues

-- Step 1: Create lessons entries
SELECT 'Creating lessons entries...' as status;

-- Insert lessons 1-8 if they don't exist
INSERT INTO lessons (id, title, level, lesson_number, description, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Greetings', 1, 1, 'Basic greetings and introductions', NOW(), NOW()),
  (gen_random_uuid(), 'Family', 1, 2, 'Family members and relationships', NOW(), NOW()),
  (gen_random_uuid(), 'Numbers and Time', 1, 3, 'Numbers, dates, and time expressions', NOW(), NOW()),
  (gen_random_uuid(), 'School Life', 1, 4, 'School vocabulary and classroom language', NOW(), NOW()),
  (gen_random_uuid(), 'Daily Activities', 1, 5, 'Daily routines and activities', NOW(), NOW()),
  (gen_random_uuid(), 'Food and Dining', 1, 6, 'Food vocabulary and dining expressions', NOW(), NOW()),
  (gen_random_uuid(), 'Shopping', 1, 7, 'Shopping and money expressions', NOW(), NOW()),
  (gen_random_uuid(), 'Hobbies', 1, 8, 'Hobbies and leisure activities', NOW(), NOW())
ON CONFLICT (level, lesson_number) DO NOTHING;

-- Step 2: Clear existing flashcards for lessons 1-8
SELECT 'Clearing existing flashcards for lessons 1-8...' as status;

DELETE FROM flashcards 
WHERE lesson_id IN (
  SELECT id FROM lessons WHERE level = 1 AND lesson_number BETWEEN 1 AND 8
);

-- Step 3: Insert flashcards for each lesson
SELECT 'Inserting flashcards for Lesson 1: Greetings...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('你好', 'nǐ hǎo', 'hello'),
  ('您好', 'nín hǎo', 'hello (formal)'),
  ('早上好', 'zǎo shang hǎo', 'good morning'),
  ('晚上好', 'wǎn shang hǎo', 'good evening'),
  ('再见', 'zài jiàn', 'goodbye'),
  ('明天见', 'míng tiān jiàn', 'see you tomorrow'),
  ('你叫什么名字', 'nǐ jiào shén me míng zi', 'what is your name'),
  ('我叫', 'wǒ jiào', 'my name is'),
  ('很高兴认识你', 'hěn gāo xìng rèn shi nǐ', 'nice to meet you'),
  ('谢谢', 'xiè xie', 'thank you'),
  ('不客气', 'bù kè qi', 'you''re welcome'),
  ('对不起', 'duì bu qǐ', 'sorry'),
  ('没关系', 'méi guān xi', 'it''s okay'),
  ('请问', 'qǐng wèn', 'excuse me'),
  ('你好吗', 'nǐ hǎo ma', 'how are you'),
  ('我很好', 'wǒ hěn hǎo', 'I''m fine')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 1;

SELECT 'Inserting flashcards for Lesson 2: Family...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('家人', 'jiā rén', 'family'),
  ('爸爸', 'bà ba', 'father'),
  ('妈妈', 'mā ma', 'mother'),
  ('儿子', 'ér zi', 'son'),
  ('女儿', 'nǚ ér', 'daughter'),
  ('哥哥', 'gē ge', 'older brother'),
  ('姐姐', 'jiě jie', 'older sister'),
  ('弟弟', 'dì di', 'younger brother'),
  ('妹妹', 'mèi mei', 'younger sister'),
  ('爷爷', 'yé ye', 'grandfather (paternal)'),
  ('奶奶', 'nǎi nai', 'grandmother (paternal)'),
  ('外公', 'wài gōng', 'grandfather (maternal)'),
  ('外婆', 'wài pó', 'grandmother (maternal)'),
  ('叔叔', 'shū shu', 'uncle'),
  ('阿姨', 'ā yí', 'aunt'),
  ('表哥', 'biǎo gē', 'older male cousin'),
  ('表姐', 'biǎo jiě', 'older female cousin'),
  ('有', 'yǒu', 'to have'),
  ('几个', 'jǐ ge', 'how many'),
  ('口人', 'kǒu rén', 'people (family members)')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 2;

SELECT 'Inserting flashcards for Lesson 3: Numbers and Time...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('一', 'yī', 'one'),
  ('二', 'èr', 'two'),
  ('三', 'sān', 'three'),
  ('四', 'sì', 'four'),
  ('五', 'wǔ', 'five'),
  ('六', 'liù', 'six'),
  ('七', 'qī', 'seven'),
  ('八', 'bā', 'eight'),
  ('九', 'jiǔ', 'nine'),
  ('十', 'shí', 'ten'),
  ('零', 'líng', 'zero'),
  ('百', 'bǎi', 'hundred'),
  ('千', 'qiān', 'thousand'),
  ('万', 'wàn', 'ten thousand'),
  ('年', 'nián', 'year'),
  ('月', 'yuè', 'month'),
  ('日', 'rì', 'day'),
  ('今天', 'jīn tiān', 'today'),
  ('明天', 'míng tiān', 'tomorrow'),
  ('昨天', 'zuó tiān', 'yesterday'),
  ('现在', 'xiàn zài', 'now'),
  ('点', 'diǎn', 'o''clock'),
  ('分', 'fēn', 'minute'),
  ('半', 'bàn', 'half'),
  ('刻', 'kè', 'quarter (15 minutes)')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 3;

SELECT 'Inserting flashcards for Lesson 4: School Life...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('学校', 'xué xiào', 'school'),
  ('老师', 'lǎo shī', 'teacher'),
  ('学生', 'xué sheng', 'student'),
  ('同学', 'tóng xué', 'classmate'),
  ('教室', 'jiào shì', 'classroom'),
  ('课', 'kè', 'class/lesson'),
  ('上课', 'shàng kè', 'to have class'),
  ('下课', 'xià kè', 'class is over'),
  ('书', 'shū', 'book'),
  ('笔', 'bǐ', 'pen'),
  ('纸', 'zhǐ', 'paper'),
  ('桌子', 'zhuō zi', 'desk'),
  ('椅子', 'yǐ zi', 'chair'),
  ('黑板', 'hēi bǎn', 'blackboard'),
  ('作业', 'zuò yè', 'homework'),
  ('考试', 'kǎo shì', 'exam'),
  ('学习', 'xué xí', 'to study'),
  ('读', 'dú', 'to read'),
  ('写', 'xiě', 'to write'),
  ('听', 'tīng', 'to listen')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 4;

SELECT 'Inserting flashcards for Lesson 5: Daily Activities...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('起床', 'qǐ chuáng', 'to get up'),
  ('睡觉', 'shuì jiào', 'to sleep'),
  ('吃饭', 'chī fàn', 'to eat'),
  ('喝水', 'hē shuǐ', 'to drink water'),
  ('洗澡', 'xǐ zǎo', 'to take a shower'),
  ('刷牙', 'shuā yá', 'to brush teeth'),
  ('穿衣服', 'chuān yī fu', 'to put on clothes'),
  ('工作', 'gōng zuò', 'to work'),
  ('休息', 'xiū xi', 'to rest'),
  ('看电视', 'kàn diàn shì', 'to watch TV'),
  ('听音乐', 'tīng yīn yuè', 'to listen to music'),
  ('打电话', 'dǎ diàn huà', 'to make a phone call'),
  ('做饭', 'zuò fàn', 'to cook'),
  ('洗衣服', 'xǐ yī fu', 'to wash clothes'),
  ('打扫', 'dǎ sǎo', 'to clean'),
  ('买东西', 'mǎi dōng xi', 'to go shopping'),
  ('走路', 'zǒu lù', 'to walk'),
  ('开车', 'kāi chē', 'to drive'),
  ('坐车', 'zuò chē', 'to take a vehicle'),
  ('运动', 'yùn dòng', 'to exercise')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 5;

SELECT 'Inserting flashcards for Lesson 6: Food and Dining...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('食物', 'shí wù', 'food'),
  ('米饭', 'mǐ fàn', 'rice'),
  ('面条', 'miàn tiáo', 'noodles'),
  ('饺子', 'jiǎo zi', 'dumplings'),
  ('肉', 'ròu', 'meat'),
  ('鱼', 'yú', 'fish'),
  ('鸡蛋', 'jī dàn', 'egg'),
  ('蔬菜', 'shū cài', 'vegetables'),
  ('水果', 'shuǐ guǒ', 'fruit'),
  ('苹果', 'píng guǒ', 'apple'),
  ('香蕉', 'xiāng jiāo', 'banana'),
  ('茶', 'chá', 'tea'),
  ('咖啡', 'kā fēi', 'coffee'),
  ('牛奶', 'niú nǎi', 'milk'),
  ('果汁', 'guǒ zhī', 'juice'),
  ('餐厅', 'cān tīng', 'restaurant'),
  ('菜单', 'cài dān', 'menu'),
  ('点菜', 'diǎn cài', 'to order food'),
  ('好吃', 'hǎo chī', 'delicious'),
  ('饱了', 'bǎo le', 'full (after eating)')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 6;

SELECT 'Inserting flashcards for Lesson 7: Shopping...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('买', 'mǎi', 'to buy'),
  ('卖', 'mài', 'to sell'),
  ('商店', 'shāng diàn', 'store'),
  ('超市', 'chāo shì', 'supermarket'),
  ('钱', 'qián', 'money'),
  ('块', 'kuài', 'yuan (currency)'),
  ('毛', 'máo', 'jiao (10 cents)'),
  ('分', 'fēn', 'fen (1 cent)'),
  ('便宜', 'pián yi', 'cheap'),
  ('贵', 'guì', 'expensive'),
  ('多少钱', 'duō shao qián', 'how much money'),
  ('衣服', 'yī fu', 'clothes'),
  ('裤子', 'kù zi', 'pants'),
  ('鞋子', 'xié zi', 'shoes'),
  ('帽子', 'mào zi', 'hat'),
  ('包', 'bāo', 'bag'),
  ('颜色', 'yán sè', 'color'),
  ('红色', 'hóng sè', 'red'),
  ('蓝色', 'lán sè', 'blue'),
  ('白色', 'bái sè', 'white'),
  ('黑色', 'hēi sè', 'black'),
  ('大', 'dà', 'big'),
  ('小', 'xiǎo', 'small'),
  ('新', 'xīn', 'new'),
  ('旧', 'jiù', 'old')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 7;

SELECT 'Inserting flashcards for Lesson 8: Hobbies...' as status;

INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  l.id,
  vocabulary.hanzi,
  vocabulary.pinyin,
  vocabulary.english,
  1,
  NOW(),
  NOW()
FROM lessons l,
(VALUES 
  ('爱好', 'ài hào', 'hobby'),
  ('喜欢', 'xǐ huan', 'to like'),
  ('不喜欢', 'bù xǐ huan', 'to dislike'),
  ('游戏', 'yóu xì', 'game'),
  ('电影', 'diàn yǐng', 'movie'),
  ('音乐', 'yīn yuè', 'music'),
  ('唱歌', 'chàng gē', 'to sing'),
  ('跳舞', 'tiào wǔ', 'to dance'),
  ('画画', 'huà huà', 'to draw/paint'),
  ('看书', 'kàn shū', 'to read books'),
  ('游泳', 'yóu yǒng', 'to swim'),
  ('跑步', 'pǎo bù', 'to run'),
  ('打球', 'dǎ qiú', 'to play ball'),
  ('篮球', 'lán qiú', 'basketball'),
  ('足球', 'zú qiú', 'football/soccer'),
  ('网球', 'wǎng qiú', 'tennis'),
  ('乒乓球', 'pīng pāng qiú', 'ping pong'),
  ('旅游', 'lǚ yóu', 'to travel'),
  ('拍照', 'pāi zhào', 'to take photos'),
  ('朋友', 'péng you', 'friend'),
  ('一起', 'yì qǐ', 'together'),
  ('有趣', 'yǒu qù', 'interesting'),
  ('无聊', 'wú liáo', 'boring'),
  ('忙', 'máng', 'busy'),
  ('空闲', 'kòng xián', 'free time')
) AS vocabulary(hanzi, pinyin, english)
WHERE l.level = 1 AND l.lesson_number = 8;

-- Step 4: Verification
SELECT 'Verification Results:' as status;

-- Show lesson counts
SELECT 
  l.lesson_number,
  l.title,
  COUNT(f.id) as flashcard_count
FROM lessons l
LEFT JOIN flashcards f ON l.id = f.lesson_id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 8
GROUP BY l.id, l.lesson_number, l.title
ORDER BY l.lesson_number;

-- Show total count
SELECT 
  COUNT(*) as total_flashcards_inserted,
  'across 8 lessons' as note
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 8;

-- Show sample flashcards from each lesson
SELECT 'Sample flashcards from each lesson:' as status;

SELECT 
  l.lesson_number,
  l.title,
  f.hanzi,
  f.pinyin,
  f.english
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number BETWEEN 1 AND 8
ORDER BY l.lesson_number, f.created_at
LIMIT 50;

SELECT 'Textbook flashcards population completed successfully!' as status; 