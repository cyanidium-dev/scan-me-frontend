import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BOT_ID = process.env.TELEGRAM_BOT_ID || "";

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  console.log(BOT_ID, CHAT_ID);
  if (request.method === "POST") {
    try {
      const data = await request.json();
      await axios.post(`https://api.telegram.org/bot${BOT_ID}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: data,
      });
      return NextResponse.json({ message: "Data sent successfully" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to send data to the telegram" },
        { status: 500 }
      );
    }
  }
}
