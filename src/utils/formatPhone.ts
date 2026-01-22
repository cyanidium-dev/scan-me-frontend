import { contactsPhoneRegex } from "@/regex/regex";

export function formatPhone(phone: string): string {
  if (!phone) return "";
  // Прибираємо всі нецифрові символи окрім +
  const cleaned = phone.replace(/[^\d+]/g, "");
  // Форматуємо український номер телефону
  const formatted = cleaned.replace(contactsPhoneRegex, "+38 ($1) $2 $3 $4");
  // Якщо regex не спрацював, повертаємо оригінальний номер
  return formatted !== cleaned ? formatted : phone;
}
