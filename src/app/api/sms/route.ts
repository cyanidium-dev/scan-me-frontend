import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// BudgetSMS API credentials (потрібно додати в .env)
const BUDGETSMS_USERNAME = process.env.BUDGETSMS_USERNAME || "";
const BUDGETSMS_USERID = process.env.BUDGETSMS_USERID || "";
const BUDGETSMS_HANDLE = process.env.BUDGETSMS_HANDLE || "";
const BUDGETSMS_FROM = process.env.BUDGETSMS_FROM || "ScanMe"; // Sender ID
// Важливо: використовуйте sendsms/ для реальної відправки, testsms/ тільки для тестування
const BUDGETSMS_API_URL = process.env.BUDGETSMS_API_URL || "https://api.budgetsms.net/sendsms/";

interface SendSMSRequest {
  phoneNumbers: string[];
  message: string;
  qrId: string;
  ownerName?: string; // Опціональний, використовується як fallback
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
      console.error("BudgetSMS credentials are not configured", {
        hasUsername: !!BUDGETSMS_USERNAME,
        hasUserID: !!BUDGETSMS_USERID,
        hasHandle: !!BUDGETSMS_HANDLE,
      });
      return NextResponse.json(
        { error: "SMS service is not configured" },
        { status: 500 }
      );
    }

    if (!BUDGETSMS_FROM) {
      console.error("BudgetSMS sender ID (from) is not configured");
      return NextResponse.json(
        { error: "SMS sender ID is not configured" },
        { status: 500 }
      );
    }

    // Перевіряємо та виправляємо URL якщо потрібно
    let apiBaseUrl = BUDGETSMS_API_URL.trim();
    if (!apiBaseUrl) {
      apiBaseUrl = "https://api.budgetsms.net/sendsms/";
    }
    // Переконаємося, що URL починається з https://
    if (!apiBaseUrl.startsWith("http://") && !apiBaseUrl.startsWith("https://")) {
      apiBaseUrl = `https://${apiBaseUrl}`;
    }
    // Переконаємося, що URL закінчується на /
    if (!apiBaseUrl.endsWith("/")) {
      apiBaseUrl = `${apiBaseUrl}/`;
    }

    // Перевіряємо, чи не використовується тестовий endpoint
    if (apiBaseUrl.includes("testsms")) {
      console.warn("⚠️ WARNING: Using TEST endpoint (testsms). SMS will NOT be sent!");
      console.warn("⚠️ Change BUDGETSMS_API_URL to https://api.budgetsms.net/sendsms/ for real SMS");
    }


    // Використовуємо готове повідомлення з клієнта, або формуємо fallback
    let smsMessage = message?.trim() || "";
    
    // Якщо повідомлення порожнє, формуємо fallback (для сумісності)
    if (!smsMessage && qrId && ownerName) {
      smsMessage = `QrCode ScanMe номер ${qrId}. ${ownerName} було відскановано. Ймовірно трапилась екстренна ситуація.`;
    }
    
    if (!smsMessage || smsMessage.length === 0) {
      console.error("Empty or invalid message received:", { message, length: message?.length, qrId, ownerName });
      return NextResponse.json(
        { error: "Message is required and cannot be empty" },
        { status: 400 }
      );
    }

    const results = [];
    const errors = [];

    // Відправляємо SMS на кожен номер
    for (const phoneNumber of phoneNumbers) {
      try {
        // Форматуємо номер телефону в формат E.164 (без +, 00, пробілів, дефісів)
        // Прибираємо всі символи крім цифр, включаючи + та 00 на початку
        let formattedPhone = phoneNumber.replace(/\D/g, "");
        
        // Якщо номер починається з 00, видаляємо 00
        if (formattedPhone.startsWith("00")) {
          formattedPhone = formattedPhone.substring(2);
        }

        if (!formattedPhone || formattedPhone.length < 7) {
          errors.push({ phone: phoneNumber, error: "Invalid phone number format" });
          continue;
        }

        // Перевіряємо, чи номер не занадто довгий (максимум 15 цифр для E.164)
        if (formattedPhone.length > 15) {
          errors.push({ phone: phoneNumber, error: "Phone number too long (max 15 digits)" });
          continue;
        }


        // Параметри для BudgetSMS API (згідно з документацією)
        // Перевіряємо, чи всі обов'язкові параметри заповнені
        if (!BUDGETSMS_USERNAME || !BUDGETSMS_USERID || !BUDGETSMS_HANDLE || !BUDGETSMS_FROM) {
          errors.push({ 
            phone: phoneNumber, 
            error: "Missing required API parameters" 
          });
          continue;
        }

        // Перевіряємо довжину повідомлення (SMS має обмеження)
        if (smsMessage.length > 1600) {
          console.warn(`Message too long (${smsMessage.length} chars), may be split into multiple SMS`);
        }

        // Перевіряємо, чи повідомлення не порожнє для цього номера
        if (!smsMessage || smsMessage.trim().length === 0) {
          console.error(`Empty message for phone ${formattedPhone}`);
          errors.push({ 
            phone: phoneNumber, 
            error: "ERR 2001: SMS message text is empty" 
          });
          continue;
        }

        // Формуємо параметри, використовуючи URLSearchParams для правильного кодування
        const params = new URLSearchParams();
        params.append("username", BUDGETSMS_USERNAME);
        params.append("userid", BUDGETSMS_USERID);
        params.append("handle", BUDGETSMS_HANDLE);
        params.append("msg", smsMessage); // URLSearchParams автоматично кодує кирилицю
        params.append("from", BUDGETSMS_FROM);
        params.append("to", formattedPhone);
        
        // Діагностика для проблемних номерів
        if (formattedPhone.startsWith("380")) {
          console.log(`Sending SMS to Ukrainian number ${formattedPhone}, message length: ${smsMessage.length}, first 50 chars: ${smsMessage.substring(0, 50)}`);
        }

        // Переконаємося, що URL закінчується на /
        // Формуємо повний URL з параметрами
        const apiUrl = `${apiBaseUrl}?${params.toString()}`;
        
  

        // Відправляємо запит до BudgetSMS
        const response = await axios.get(apiUrl, {
          timeout: 30000, // 30 секунд таймаут
        });

        // BudgetSMS повертає результат у форматі: OK|message_id або ERROR|error_code|error_message
        const responseText = response.data?.toString() || "";
        const responseData = response.data;
        
        // Перевіряємо різні формати відповіді
        let isSuccess = false;
        let messageId = null;
        let errorMessage = null;

        if (typeof responseData === "string") {
          if (responseData.startsWith("OK")) {
            isSuccess = true;
            const parts = responseData.split("|");
            messageId = parts[1] || null;
          } else if (responseData.startsWith("ERROR")) {
            const parts = responseData.split("|");
            const errorCode = parts[1] || "";
            const errorText = parts[2] || parts[1] || "Unknown error";
            
            // Детальна інформація про помилку ERR 2009
            if (errorCode === "2009") {
              errorMessage = `ERR 2009: Parameter issue. Check phone number format (${formattedPhone}), message encoding, or required parameters. Original: ${errorText}`;
            } else {
              errorMessage = `ERR ${errorCode}: ${errorText}`;
            }
          }
        } else if (typeof responseData === "object" && responseData !== null) {
          // Можливо, BudgetSMS повертає JSON
          if (responseData.status === "OK" || responseData.success === true) {
            isSuccess = true;
            messageId = responseData.messageId || responseData.id || null;
          } else {
            errorMessage = responseData.error || responseData.message || "Unknown error";
          }
        }

        if (isSuccess) {
          results.push({
            phone: phoneNumber,
            success: true,
            messageId: messageId,
          });
        } else {
          const finalError = errorMessage || responseText || "Unknown error";
          console.error(`❌ SMS failed for ${formattedPhone}:`, finalError);
          errors.push({
            phone: phoneNumber,
            error: finalError,
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
