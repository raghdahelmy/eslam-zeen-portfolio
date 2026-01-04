import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ text: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      'تفضل بزيارة متجرنا: https://www.ek-original.com';

    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({
      text: 'حدث خطأ تقني. يرجى زيارة المتجر: https://www.ek-original.com',
    });
  }
}
