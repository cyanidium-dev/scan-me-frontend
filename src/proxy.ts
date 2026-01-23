import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Обробляємо /reset-password з параметром lang (для Firebase password reset)
  const isResetPassword = pathname === "/reset-password";
  const isLocalizedResetPassword = pathname === "/uk/reset-password" || 
                                   pathname === "/en/reset-password" || 
                                   pathname === "/pl/reset-password";
  
  // Якщо це /reset-password без локалі, редіректимо на локалізовану версію
  if (isResetPassword && !isLocalizedResetPassword) {
    const lang = request.nextUrl.searchParams.get("lang");
    
    // Перевіряємо, чи lang є валідною локаллю
    const locale = lang && routing.locales.includes(lang as any) 
      ? lang 
      : routing.defaultLocale;
    
    // Формуємо новий URL з локалью та всіма параметрами (крім lang)
    const newSearchParams = new URLSearchParams();
    request.nextUrl.searchParams.forEach((value, key) => {
      if (key !== "lang") {
        newSearchParams.append(key, value);
      }
    });
    
    const queryString = newSearchParams.toString();
    
    // Використовуємо повний URL з origin для уникнення циклів редіректів
    const baseUrl = new URL(request.url);
    const redirectUrl = `${baseUrl.origin}/${locale}/reset-password${queryString ? `?${queryString}` : ""}`;
    
    return NextResponse.redirect(redirectUrl, { status: 307 });
  }
  
  // Якщо це вже локалізований /reset-password, пропускаємо next-intl middleware
  // щоб уникнути циклів редіректів (оскільки localePrefix: "as-needed" може
  // перенаправляти /uk/reset-password на /reset-password)
  if (isLocalizedResetPassword) {
    // Просто додаємо pathname в заголовки і пропускаємо далі
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  // Використовуємо стандартний next-intl middleware для інших маршрутів
  const response = intlMiddleware(request);
  
  // Додаємо pathname в заголовки для використання в метаданих
  response.headers.set("x-pathname", pathname);
  
  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
