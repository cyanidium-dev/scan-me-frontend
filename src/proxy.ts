import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Обробляємо /reset-password з параметром lang
  if (request.nextUrl.pathname === "/reset-password") {
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
    const redirectUrl = `/${locale}/reset-password${queryString ? `?${queryString}` : ""}`;
    
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Використовуємо стандартний next-intl middleware для інших маршрутів
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
