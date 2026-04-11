import {
	DEFAULT_LOCALE,
	LOCALE_COOKIE_KEY,
	LOCALE_STORAGE_KEY,
	isSupportedLocale,
} from "@/i18n/config";
import type { AppLocale } from "@/i18n/config";
import { normalizeLocale, tByLocale } from "@/lib/i18n";
import { useRouter } from "next/router";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface LocaleContextValue {
	locale: AppLocale;
	setLocale: (nextLocale: AppLocale) => void;
	t: (key: string, fallback?: string) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
	locale: DEFAULT_LOCALE,
	setLocale: () => undefined,
	t: (key, fallback) => fallback ?? key,
});

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [locale, setLocaleState] = useState<AppLocale>(
		normalizeLocale(router.locale || router.defaultLocale),
	);

	useEffect(() => {
		setLocaleState(normalizeLocale(router.locale || router.defaultLocale));
	}, [router.defaultLocale, router.locale]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
		document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
	}, [locale]);

	const setLocale = useCallback(
		(nextLocale: AppLocale) => {
			setLocaleState(nextLocale);
			void router.push(
				{
					pathname: router.pathname,
					query: router.query,
				},
				router.asPath,
				{ locale: nextLocale },
			);
		},
		[router],
	);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const fromStorage = window.localStorage.getItem(LOCALE_STORAGE_KEY);
		const fromCookie = document.cookie
			.split("; ")
			.find((cookie) => cookie.startsWith(`${LOCALE_COOKIE_KEY}=`))
			?.split("=")[1];
		const preferred = fromStorage ?? fromCookie;
		if (!isSupportedLocale(preferred) || preferred === locale) return;
		setLocale(preferred);
	}, [locale, setLocale]);

	const t = useCallback(
		(key: string, fallback?: string) => tByLocale(locale, key, fallback),
		[locale],
	);

	const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => useContext(LocaleContext);
