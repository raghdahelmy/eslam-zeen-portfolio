import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY as string,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction: `
أنت روبوت ذكي يعمل لدى EK Original.

قواعد مهمة:
- لو المستخدم سأل عن السعر أو "بكام" → ابعت لينك المتجر فورًا:
https://www.ek-original.com

الفروع:
- الإسماعيلية: المرحلة السابعة
- شارع إسكندرية
- سرابيوم

المواعيد:
1 ظهرًا - 12 ليلًا
الجمعة: من 6 مساءً
`,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      text: response.text,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      text: 'حدث خطأ تقني. يرجى زيارة المتجر: https://www.ek-original.com',
    });
  }
}
