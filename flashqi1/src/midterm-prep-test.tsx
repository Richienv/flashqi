import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const MidtermPrepTest = () => {
  const [showTest, setShowTest] = useState(false);

  const generateTest = () => {
    setShowTest(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Chinese Level 1 - Midterm Prep Test</h1>
      
      {!showTest ? (
        <div className="text-center">
          <p className="mb-4">This test will help you prepare for your Level 1 Chinese midterm exam.</p>
          <p className="mb-6">It includes various exercises based on the vocabulary and grammar covered in Lessons 1-11.</p>
          <Button 
            onClick={generateTest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Test
          </Button>
        </div>
      ) : (
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 1: Pinyin for Hanzi</h2>
            <p className="mb-4 italic">Instructions: Write the Pinyin for the following Hanzi characters.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. 你好</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(nǐ hǎo)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. 中学</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(zhōng xué)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. 打电话</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(dǎ diàn huà)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. 恭喜</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(gōng xǐ)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. 比赛</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(bǐ sài)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 2: Hanzi from Radicals</h2>
            <p className="mb-4 italic">Instructions: Write the complete Hanzi character based on the provided radicals.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. 氵 + 马 = ?</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(mǎ)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. 女 + 子 = ?</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(hǎo)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. 木 + 目 = ?</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(xiāng)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. 心 + 田 = ?</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(xīn)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. 口 + 天 = ?</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(wèn)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 3: Fill in the Blanks</h2>
            <p className="mb-4 italic">Instructions: Fill in the blanks with appropriate words.</p>
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. 你 _____ 哪里 _____？</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(是, 人)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. 他 _____ 说 中文。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(会)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. 我 _____ 学习 _____。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(喜欢, 汉语)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. 明天 我们 _____ 去 _____。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(要, 中学)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. 这个 汉字 很 _____。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(难)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 4: Rearrange Words</h2>
            <p className="mb-4 italic">Instructions: Rearrange the words in brackets to their correct positions.</p>
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. A【也】, B【不】, C【是】: 他 ___ ___ ___ 学生。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(也不是)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. A【在】, B【我】, C【这里】: ___ ___ ___ 等你。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(我在这里)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. A【有】, B【没】, C【时间】: 我今天 ___ ___ ___。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(没有时间)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. A【去】, B【想】, C【图书馆】: 我 ___ ___ ___。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(想去图书馆)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. A【来】, B【中国】, C【从】: 他 ___ ___ ___ 的。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(从中国来)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 5: Opposite Words</h2>
            <p className="mb-4 italic">Instructions: Write the opposite word for each given word.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. 大 → ____</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(小)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. 热 → ____</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(冷)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. 好 → ____</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(坏)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. 快 → ____</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(慢)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. 多 → ____</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(少)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 6: Form Questions</h2>
            <p className="mb-4 italic">Instructions: Use interrogative pronouns to form questions about the underlined parts.</p>
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. <u>我叫王明</u>。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(你叫什么名字？)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. <u>我是中国人</u>。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(你是哪国人？)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. <u>他在学校</u>。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(他在哪里？)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. <u>我有三本书</u>。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(你有几本书？)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. <u>她去图书馆</u>。</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(她去哪里？)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 7: Form Sentences</h2>
            <p className="mb-4 italic">Instructions: Sort the given words to form correct sentences.</p>
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. (1) 留学生 (2) 也 (3) 我</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(我也留学生)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. (1) 不 (2) 说 (3) 英语 (4) 他</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(他不说英语)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. (1) 中国 (2) 从 (3) 来 (4) 我</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(我从中国来)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. (1) 朋友 (2) 你的 (3) 是 (4) 谁</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(你的朋友是谁)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. (1) 很 (2) 汉语 (3) 难 (4) 不</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(汉语不很难)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Section 8: Create Sentences</h2>
            <p className="mb-4 italic">Instructions: Create sentences using the provided Hanzi characters.</p>
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">1. 学习, 中文, 喜欢</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(我喜欢学习中文)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">2. 明天, 朋友, 见</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(明天见朋友)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">3. 电话, 打, 给</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(给他打电话)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">4. 吃饭, 餐厅, 在</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(在餐厅吃饭)</p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-lg font-bold mb-2">5. 中学, 老师, 是</p>
                <div className="border-b border-dashed mb-2 pb-1"></div>
                <p className="text-gray-400 italic text-sm">(是中学老师)</p>
              </div>
            </div>
          </section>

          <div className="text-center mt-8">
            <Button 
              onClick={() => setShowTest(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Hide Test
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Print Test
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MidtermPrepTest; 