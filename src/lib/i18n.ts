import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/i18n/config";
import type { AppLocale } from "@/i18n/config";
import { getLocaleMessages } from "@/i18n/messages";
import type { TranslationTree } from "@/i18n/types";

export function getMessage(tree: TranslationTree, key: string): string | undefined {
	const parts = key.split(".");
	let current: string | TranslationTree | undefined = tree;

	for (const part of parts) {
		if (!current || typeof current === "string") return undefined;
		current = current[part];
	}

	return typeof current === "string" ? current : undefined;
}

export function tByLocale(locale: AppLocale, key: string, fallback?: string): string {
	const messages = getLocaleMessages(locale);
	return getMessage(messages, key) ?? fallback ?? key;
}

export function normalizeLocale(input?: string): AppLocale {
	if (input && (SUPPORTED_LOCALES as readonly string[]).includes(input)) {
		return input as AppLocale;
	}
	return DEFAULT_LOCALE;
}
