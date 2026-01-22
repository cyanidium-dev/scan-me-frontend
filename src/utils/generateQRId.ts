/**
 * Генерує унікальний QR-ID для користувача
 * Формат: SM-XXXX-XX
 * @param userId - ID користувача з Firebase
 * @returns QR-ID у форматі SM-XXXX-XX
 */
export function generateQRId(userId: string): string {
  const prefix = "SM-";
  // Беремо перші 4 символи userId, перетворюємо на великі літери, залишаємо тільки A-Z0-9
  const hash = userId.slice(0, 4).toUpperCase().replace(/[^A-Z0-9]/g, "");
  // Якщо hash коротший за 4 символи, доповнюємо нулями
  const paddedHash = hash.padEnd(4, "0");
  // Беремо останні 2 символи userId
  const suffix = userId.slice(-2).toUpperCase().replace(/[^A-Z0-9]/g, "").padEnd(2, "0");
  return `${prefix}${paddedHash}-${suffix}`;
}
