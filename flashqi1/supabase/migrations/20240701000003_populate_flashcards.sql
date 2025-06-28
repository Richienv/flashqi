-- Create flashcards table first if it doesn't exist
CREATE TABLE IF NOT EXISTS flashcards (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  hanzi TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  english TEXT NOT NULL,
  example_sentence JSONB,
  difficulty_level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Spaced repetition columns
  last_reviewed TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'known', 'due')),
  interval_days INTEGER DEFAULT 1
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_flashcards_lesson ON flashcards(lesson_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_user ON flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_status ON flashcards(status);
CREATE INDEX IF NOT EXISTS idx_flashcards_review ON flashcards(last_reviewed);

-- Enable RLS
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- RLS policies
DROP POLICY IF EXISTS "Users can read own flashcards" ON flashcards;
CREATE POLICY "Users can read own flashcards" ON flashcards
  FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own flashcards" ON flashcards;
CREATE POLICY "Users can update own flashcards" ON flashcards
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert all flashcard data (these are shared cards available to all users)
INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, example_sentence, difficulty_level, user_id) VALUES
-- Lesson 1
('1-1', 'lesson1', '一', 'yī', 'One', '{"hanzi": "我有一个苹果。", "pinyin": "Wǒ yǒu yī gè píngguǒ.", "english": "I have one apple."}', 1, NULL),
('1-2', 'lesson1', '二', 'èr', 'Two', '{"hanzi": "我买了二本书。", "pinyin": "Wǒ mǎi le èr běn shū.", "english": "I bought two books."}', 1, NULL),
('1-3', 'lesson1', '三', 'sān', 'Three', '{"hanzi": "三点钟了。", "pinyin": "Sān diǎn zhōng le.", "english": "It''s three o''clock."}', 1, NULL),
('1-4', 'lesson1', '四', 'sì', 'Four', '{"hanzi": "我家有四口人。", "pinyin": "Wǒ jiā yǒu sì kǒu rén.", "english": "There are four people in my family."}', 1, NULL),
('1-5', 'lesson1', '五', 'wǔ', 'Five', '{"hanzi": "五个学生在教室里。", "pinyin": "Wǔ gè xuéshēng zài jiàoshì lǐ.", "english": "Five students are in the classroom."}', 1, NULL),
('1-6', 'lesson1', '八', 'bā', 'Eight', '{"hanzi": "现在是八点钟。", "pinyin": "Xiànzài shì bā diǎn zhōng.", "english": "It''s eight o''clock now."}', 1, NULL),
('1-7', 'lesson1', '大', 'dà', 'Big', '{"hanzi": "这是一个大苹果。", "pinyin": "Zhè shì yī gè dà píngguǒ.", "english": "This is a big apple."}', 1, NULL),
('1-8', 'lesson1', '不', 'bù', 'No/Not', '{"hanzi": "我不喝咖啡。", "pinyin": "Wǒ bù hē kāfēi.", "english": "I don''t drink coffee."}', 1, NULL),
('1-9', 'lesson1', '口', 'kǒu', 'Mouth', '{"hanzi": "张开你的口。", "pinyin": "Zhāng kāi nǐ de kǒu.", "english": "Open your mouth."}', 1, NULL),
('1-10', 'lesson1', '白', 'bái', 'White', '{"hanzi": "这是白色的。", "pinyin": "Zhè shì bái sè de.", "english": "This is white."}', 1, NULL),
('1-11', 'lesson1', '女', 'nǚ', 'Female', '{"hanzi": "她是女学生。", "pinyin": "Tā shì nǚ xuéshēng.", "english": "She is a female student."}', 1, NULL),

-- Lesson 2
('2-1', 'lesson2', '好', 'hǎo', 'Good', '{"hanzi": "这是一个好想法。", "pinyin": "Zhè shì yī gè hǎo xiǎngfǎ.", "english": "This is a good idea."}', 1, NULL),
('2-2', 'lesson2', '你', 'nǐ', 'You', '{"hanzi": "你好吗？", "pinyin": "Nǐ hǎo ma?", "english": "How are you?"}', 1, NULL),
('2-3', 'lesson2', '我', 'wǒ', 'I/Me', '{"hanzi": "我很好。", "pinyin": "Wǒ hěn hǎo.", "english": "I am very well."}', 1, NULL),
('2-4', 'lesson2', '他', 'tā', 'He/Him', '{"hanzi": "他是我的朋友。", "pinyin": "Tā shì wǒ de péngyǒu.", "english": "He is my friend."}', 1, NULL),
('2-5', 'lesson2', '她', 'tā', 'She/Her', '{"hanzi": "她很漂亮。", "pinyin": "Tā hěn piàoliang.", "english": "She is very beautiful."}', 1, NULL),
('2-6', 'lesson2', '的', 'de', 'Possessive particle', '{"hanzi": "这是我的书。", "pinyin": "Zhè shì wǒ de shū.", "english": "This is my book."}', 1, NULL),
('2-7', 'lesson2', '是', 'shì', 'To be', '{"hanzi": "我是学生。", "pinyin": "Wǒ shì xuéshēng.", "english": "I am a student."}', 1, NULL),
('2-8', 'lesson2', '和', 'hé', 'And', '{"hanzi": "我和他是朋友。", "pinyin": "Wǒ hé tā shì péngyǒu.", "english": "He and I are friends."}', 1, NULL),
('2-9', 'lesson2', '来', 'lái', 'To come', '{"hanzi": "请你来我家。", "pinyin": "Qǐng nǐ lái wǒ jiā.", "english": "Please come to my house."}', 1, NULL),
('2-10', 'lesson2', '了', 'le', 'Completed action particle', '{"hanzi": "我吃了饭。", "pinyin": "Wǒ chī le fàn.", "english": "I have eaten."}', 1, NULL),

-- Lesson 3
('3-1', 'lesson3', '请', 'qǐng', 'Please', '{"hanzi": "请坐。", "pinyin": "Qǐng zuò.", "english": "Please sit."}', 1, NULL),
('3-2', 'lesson3', '您', 'nín', 'You (formal)', '{"hanzi": "您好！", "pinyin": "Nín hǎo!", "english": "Hello! (formal)"}', 1, NULL),
('3-3', 'lesson3', '贵', 'guì', 'Expensive/honorable', '{"hanzi": "您贵姓？", "pinyin": "Nín guì xìng?", "english": "What is your honorable surname?"}', 1, NULL),
('3-4', 'lesson3', '姓', 'xìng', 'Surname', '{"hanzi": "我姓王。", "pinyin": "Wǒ xìng Wáng.", "english": "My surname is Wang."}', 1, NULL),
('3-5', 'lesson3', '什么', 'shénme', 'What', '{"hanzi": "这是什么？", "pinyin": "Zhè shì shénme?", "english": "What is this?"}', 1, NULL),
('3-6', 'lesson3', '名字', 'míngzi', 'Name', '{"hanzi": "你叫什么名字？", "pinyin": "Nǐ jiào shénme míngzi?", "english": "What is your name?"}', 1, NULL),
('3-7', 'lesson3', '叫', 'jiào', 'To call/be called', '{"hanzi": "我叫李明。", "pinyin": "Wǒ jiào Lǐ Míng.", "english": "My name is Li Ming."}', 1, NULL),
('3-8', 'lesson3', '高兴', 'gāoxìng', 'Happy', '{"hanzi": "认识你很高兴。", "pinyin": "Rènshi nǐ hěn gāoxìng.", "english": "I''m happy to meet you."}', 1, NULL),

-- Lesson 4
('4-1', 'lesson4', '今天', 'jīntiān', 'Today', '{"hanzi": "今天是星期一。", "pinyin": "Jīntiān shì xīngqīyī.", "english": "Today is Monday."}', 1, NULL),
('4-2', 'lesson4', '明天', 'míngtiān', 'Tomorrow', '{"hanzi": "明天见！", "pinyin": "Míngtiān jiàn!", "english": "See you tomorrow!"}', 1, NULL),
('4-3', 'lesson4', '昨天', 'zuótiān', 'Yesterday', '{"hanzi": "昨天我去了图书馆。", "pinyin": "Zuótiān wǒ qù le túshūguǎn.", "english": "Yesterday I went to the library."}', 1, NULL),
('4-4', 'lesson4', '时间', 'shíjiān', 'Time', '{"hanzi": "现在几点？", "pinyin": "Xiànzài jǐ diǎn?", "english": "What time is it now?"}', 1, NULL),
('4-5', 'lesson4', '点', 'diǎn', "O'clock", '{"hanzi": "三点钟。", "pinyin": "Sān diǎn zhōng.", "english": "Three o''clock."}', 1, NULL),

-- Lesson 5
('5-1', 'lesson5', '学习', 'xuéxí', 'To study', '{"hanzi": "我在学习中文。", "pinyin": "Wǒ zài xuéxí Zhōngwén.", "english": "I am studying Chinese."}', 1, NULL),
('5-2', 'lesson5', '老师', 'lǎoshī', 'Teacher', '{"hanzi": "我的老师很好。", "pinyin": "Wǒ de lǎoshī hěn hǎo.", "english": "My teacher is very good."}', 1, NULL),
('5-3', 'lesson5', '学生', 'xuéshēng', 'Student', '{"hanzi": "我是大学生。", "pinyin": "Wǒ shì dàxuéshēng.", "english": "I am a university student."}', 1, NULL),
('5-4', 'lesson5', '学校', 'xuéxiào', 'School', '{"hanzi": "我的学校很大。", "pinyin": "Wǒ de xuéxiào hěn dà.", "english": "My school is very big."}', 1, NULL),
('5-5', 'lesson5', '中文', 'Zhōngwén', 'Chinese language', '{"hanzi": "中文很有趣。", "pinyin": "Zhōngwén hěn yǒuqù.", "english": "Chinese is very interesting."}', 1, NULL),

-- Add a function to auto-populate user-specific reviews when users interact with cards
ON CONFLICT (id) DO NOTHING;

-- Function to initialize user's card review status
CREATE OR REPLACE FUNCTION initialize_user_card_review(
  p_card_id TEXT,
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO flashcard_reviews (card_id, user_id, status, interval_days)
  VALUES (p_card_id, p_user_id, 'new', 1)
  ON CONFLICT (card_id, user_id) DO NOTHING;
  
  RETURN TRUE;
END;
$$;

-- Function to get flashcards with user review status
CREATE OR REPLACE FUNCTION get_cards_with_review_status(
  p_lesson_id TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT auth.uid(),
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE(
  id TEXT,
  lesson_id TEXT,
  hanzi TEXT,
  pinyin TEXT,
  english TEXT,
  example_sentence JSONB,
  difficulty_level INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  status TEXT,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  interval_days INTEGER,
  review_count INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.lesson_id,
    f.hanzi,
    f.pinyin,
    f.english,
    f.example_sentence,
    f.difficulty_level,
    f.created_at,
    COALESCE(fr.status, 'new'::TEXT) as status,
    fr.last_reviewed,
    COALESCE(fr.interval_days, 1) as interval_days,
    COALESCE(fr.review_count, 0) as review_count
  FROM flashcards f
  LEFT JOIN flashcard_reviews fr ON f.id = fr.card_id AND fr.user_id = p_user_id
  WHERE (p_lesson_id IS NULL OR f.lesson_id = p_lesson_id)
  ORDER BY f.lesson_id, f.id
  LIMIT p_limit;
END;
$$; 