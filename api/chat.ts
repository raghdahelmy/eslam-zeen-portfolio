import { GoogleGenAI } from "@google/genai";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { message } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: `
أنت مساعد ذكي يعمل لدى شركة EK Original.
إذا سُئلت عن الأسعار → أرسل رابط المتجر https://www.ek-original.com
الفروع: الإسماعيلية (المرحلة السابعة – شارع إسكندرية – سرابيوم)
المواعيد: 1 ظهراً - 12 ليلاً (الجمعة من 6 مساءً)
`,
        temperature: 0.7,
      },
    });

    return Response.json({
      text: response.text,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "AI Error" },
      { status: 500 }
    );
  }
}
