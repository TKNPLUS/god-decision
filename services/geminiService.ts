
import { GoogleGenAI } from "@google/genai";

export async function generateReason(question: string, answer: string): Promise<string> {
  if (!process.env.API_KEY) {
    return "APIキーが設定されていません。AIによる理由の生成はできません。";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const jaAnswer: { [key: string]: string } = {
    'yes': 'はい',
    'no': 'いいえ',
    'maybe': '多分'
  };

  const prompt = `
  あなたは賢くてユーモアのある賢者です。
  以下の質問と、それに対する絶対的な答えが与えられます。
  この答えがなぜそうなったのか、創造的で面白い、あるいは説得力のある理由を1〜2文の短い日本語でっちあげてください。

  質問：「${question}」
  答え：「${jaAnswer[answer] || answer}」

  理由：
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating reason with Gemini:", error);
    return "AIが理由を考えるのに失敗しました。運命は気まぐれなようです。";
  }
}
