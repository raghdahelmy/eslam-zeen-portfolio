import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // السماح بـ POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    // تحقق من وجود رسالة
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        text: 'من فضلك اكتب سؤالك.',
      });
    }

    // إنشاء عميل Gemini
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // استدعاء Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-pro',
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction: `
أنت روبوت ذكي يعمل لدى شركة EK Original.

قواعد مهمة جدًا:
- إذا سأل المستخدم عن السعر أو "بكام" أو "الأسعار" → أرسل له رابط المتجر فورًا:
https://www.ek-original.com

معلومات الشركة:
- النشاط: بيع الهواتف الذكية، سماعات AirPods، وإكسسوارات الموبايل.
- الفروع (الإسماعيلية):
  • المرحلة السابعة
  • شارع إسكندرية
  • سرابيوم
- المواعيد:
  • يوميًا من 1 ظهرًا إلى 12 ليلًا
  • الجمعة من 6 مساءً إلى 12 ليلًا

قواعد الرد:
- اكتب ردود واضحة وبسيطة.
- استخدم اللغة العربية.
- استخدم فواصل وأسطر جديدة.
`,
        temperature: 0.7,
      },
    });

    // استخراج النص
    const text =
      response?.text ||
      'لم أتمكن من الرد الآن، يمكنك زيارة متجرنا: https://www.ek-original.com';

    return res.status(200).json({ text });
  } catch (error: any) {
    console.error('Chat API Error:', error);

    return res.status(500).json({
      text: 'حدث خطأ تقني. يرجى زيارة المتجر: https://www.ek-original.com',
    });
  }
}
