import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// BudgetSMS API credentials (потрібно додати в .env)
const BUDGETSMS_USERNAME = process.env.BUDGETSMS_USERNAME || "";
const BUDGETSMS_USERID = process.env.BUDGETSMS_USERID || "";
const BUDGETSMS_HANDLE = process.env.BUDGETSMS_HANDLE || "";
const BUDGETSMS_API_URL = process.env.BUDGETSMS_API_URL || "https://api.budgetsms.net/sendsms";

interface SendSMSRequest {
  phoneNumbers: string[];
  message: string;
  qrId: string;
  ownerName: string;
}

/**
 * Відправляє SMS через BudgetSMS API
 * Документація: https://www.budgetsms.net/
 */
export async function POST(request: NextRequest) {
  try {
    const { phoneNumbers, message, qrId, ownerName }: SendSMSRequest = await request.json();

    if (!phoneNumbers || phoneNumbers.length === 0) {
      return NextResponse.json(
        { error: "Phone numbers are required" },
        { status: 400 }
      );
    }

    if (!BUDGETSMS_USERNAME || !BUDGETSMS_USERID || !BUDGETSMS_HANDLE) {
      console.error("BudgetSMS credentials are not configured");
      return NextResponse.json(
        { error: "SMS service is not configured" },
        { status: 500 }
      );
    }

    // Формуємо повідомлення
    const smsMessage = message || `QrCode ScanMe номер ${qrId}. ${ownerName} було відскановано. Ймовірно трапилась екстренна ситуація.`;

    const results = [];
    const errors = [];

    // Відправляємо SMS на кожен номер
    for (const phoneNumber of phoneNumbers) {
      try {
        // Форматуємо номер телефону (прибираємо всі символи крім цифр)
        const formattedPhone = phoneNumber.replace(/\D/g, "");

        if (!formattedPhone) {
          errors.push({ phone: phoneNumber, error: "Invalid phone number format" });
          continue;
        }

        // Параметри для BudgetSMS API
        const params = new URLSearchParams({
          username: BUDGETSMS_USERNAME,
          userid: BUDGETSMS_USERID,
          handle: BUDGETSMS_HANDLE,
          msg: smsMessage,
          to: formattedPhone,
        });

        // Відправляємо запит до BudgetSMS
        const response = await axios.get(`${BUDGETSMS_API_URL}?${params.toString()}`);

        // BudgetSMS повертає результат у форматі: OK|message_id або ERROR|error_code|error_message
        const responseText = response.data?.toString() || "";
        
        if (responseText.startsWith("OK")) {
          results.push({
            phone: phoneNumber,
            success: true,
            messageId: responseText.split("|")[1] || null,
          });
        } else {
          const errorParts = responseText.split("|");
          errors.push({
            phone: phoneNumber,
            error: errorParts[2] || errorParts[1] || "Unknown error",
          });
        }
      } catch (error) {
        console.error(`Error sending SMS to ${phoneNumber}:`, error);
        errors.push({
          phone: phoneNumber,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: results.length > 0,
      sent: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error in SMS API route:", error);
    return NextResponse.json(
      { error: "Failed to send SMS messages" },
      { status: 500 }
    );
  }
}
