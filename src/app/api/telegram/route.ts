import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";

const BOT_ID = process.env.TELEGRAM_BOT_ID || "";

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  if (request.method === "POST") {
    try {
      const { text, qrLink } = await request.json();
      
      // Відправляємо текстове повідомлення
      await axios.post(`https://api.telegram.org/bot${BOT_ID}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: text,
      });

      // Якщо є посилання для QR-коду, генеруємо та відправляємо його
      if (qrLink && qrLink !== "Не доступно") {
        try {
          // Динамічний імпорт для qrcode (тільки на сервері)
          const QRCode = (await import("qrcode")).default;
          
          // Генеруємо QR-код як Buffer
          const qrCodeBuffer = await QRCode.toBuffer(qrLink, {
            errorCorrectionLevel: "M",
            type: "png",
            width: 300,
            margin: 1,
          });

          // Створюємо FormData для відправки фото
          const formData = new FormData();
          formData.append("chat_id", CHAT_ID || "");
          formData.append("photo", qrCodeBuffer, {
            filename: "qrcode.png",
            contentType: "image/png",
          });
          formData.append("caption", `QR-код для екстреної сторінки:\n${qrLink}`);

          // Відправляємо фото в Telegram
          await axios.post(
            `https://api.telegram.org/bot${BOT_ID}/sendPhoto`,
            formData,
            {
              headers: formData.getHeaders(),
            }
          );
        } catch (qrError) {
          console.error("Помилка генерації або відправки QR-коду:", qrError);
          // Не зупиняємо виконання, якщо QR-код не вдалося відправити
        }
      }

      return NextResponse.json({ message: "Data sent successfully" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Помилка відправки в Telegram:", error);
      return NextResponse.json(
        { error: "Failed to send data to the telegram" },
        { status: 500 }
      );
    }
  }
}
