import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ text: 'من فضلك اكتب سؤالك.' });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
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
أنت روبوت ذكي يعمل لدى شركة EK Original.

- لو السؤال عن السعر أو "بكام" → ابعت رابط المتجر فورًا:
https://www.ek-original.com

الفروع (الإسماعيلية):
- المرحلة السابعة
- شارع إسكندرية
- سرابيوم

المواعيد:
- يوميًا من 1 ظهرًا إلى 12 ليلًا
- الجمعة من 6 مساءً إلى 12 ليلًا
        `,
        temperature: 0.7,
      },
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      'لم أتمكن من الرد الآن، يمكنك زيارة متجرنا: https://www.ek-original.com';

    return res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      text: 'حدث خطأ تقني. يرجى زيارة المتجر: https://www.ek-original.com',
    });
  }
}
