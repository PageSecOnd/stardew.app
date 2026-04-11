export const SUPPORTED_LOCALES = ["en", "zh-CN", "ja"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";
export const LOCALE_COOKIE_KEY = "stardew_locale";
export const LOCALE_STORAGE_KEY = "stardew_locale";

export function isSupportedLocale(value: string | undefined): value is AppLocale {
	return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
