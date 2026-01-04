import { GoogleGenAI } from "@google/genai";

/**
 * Smart replies without AI
 */
function smartReply(message: string): string | null {
  const text = message.toLowerCase();

  // المتجر / الأسعار
  if (
    text.includes("سعر") ||
    text.includes("الأسعار") ||
    text.includes("متجر") ||
    text.includes("شراء") ||
    text.includes("iphone") ||
    text.includes("samsung")
  ) {
    return "🛒 لمعرفة الأسعار وأحدث المنتجات تفضلي زيارة المتجر:\nhttps://www.ek-original.com";
  }

  // فيسبوك
  if (text.includes("فيس") || text.includes("facebook")) {
    return "📘 تابعنا على فيسبوك من هنا:\nhttps://www.facebook.com/share/1WfYwyWZKw/?mibextid=wwXIfr";
  }

  // إنستجرام
  if (text.includes("انستا") || text.includes("instagram")) {
    return "📸 حسابنا على إنستجرام:\nhttps://www.instagram.com/eslam.zeeen";
  }

  // تيك توك
  if (text.includes("تيك") || text.includes("tiktok")) {
    return "🎥 تابعنا على تيك توك:\nhttps://www.tiktok.com/@eslamzeen1";
  }

  // رقم / اتصال
  if (
    text.includes("رقم") ||
    text.includes("اتصال") ||
    text.includes("كلم") ||
    text.includes("تليفون")
  ) {
    return "📞 للتواصل المباشر:\n01090305065";
  }

  // فروع
  if (
    text.includes("فرع") ||
    text.includes("عنوان") ||
    text.includes("فين")
  ) {
    return `📍 فرع EK Original:
الإسماعيلية – المرحلة السابعة – شارع إسكندرية – سرابيوم`;
  }

  // مواعيد
  if (
    text.includes("مواعيد") ||
    text.includes("يفتح") ||
    text.includes("وقت")
  ) {
    return `⏰ مواعيد العمل:
من 1 ظهراً إلى 12 ليلاً
الجمعة من 6 مساءً`;
  }

  return null;
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { message } = await req.json();

    // 🔥 1. Smart local reply
    const quickReply = smartReply(message);
    if (quickReply) {
      return Response.json({ text: quickReply });
    }

    // 🤖 2. AI fallback
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: `
أنت مساعد ذكي يعمل لدى شركة EK Original.
تتحدث باللهجة المصرية بأسلوب مهذب وواضح.
لا تخترع أسعار أو عروض.
لو السؤال غير واضح اطلب توضيح بسيط.
`,
        temperature: 0.6,
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
