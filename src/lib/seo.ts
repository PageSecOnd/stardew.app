import { AppLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/i18n/config";

function stripLocalePrefix(path: string): string {
	const normalized = path.split("?")[0] || "/";
	for (const locale of SUPPORTED_LOCALES) {
		if (normalized === `/${locale}`) return "/";
		if (normalized.startsWith(`/${locale}/`)) {
			return normalized.slice(locale.length + 1) || "/";
		}
	}
	return normalized;
}

function withLocalePath(path: string, locale: AppLocale): string {
	const clean = path.startsWith("/") ? path : `/${path}`;
	if (locale === DEFAULT_LOCALE) return clean;
	return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

export function buildCanonical(baseUrl: string, asPath: string, locale: AppLocale): string {
	const plainPath = stripLocalePrefix(asPath);
	return `${baseUrl}${withLocalePath(plainPath, locale)}`;
}

export function buildHrefLangs(baseUrl: string, asPath: string) {
	const plainPath = stripLocalePrefix(asPath);
	return SUPPORTED_LOCALES.map((locale) => ({
		locale,
		href: `${baseUrl}${withLocalePath(plainPath, locale)}`,
	}));
}
