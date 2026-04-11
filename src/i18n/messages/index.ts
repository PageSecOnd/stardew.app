import { DEFAULT_LOCALE } from "@/i18n/config";
import type { AppLocale } from "@/i18n/config";
import { enMessages } from "@/i18n/messages/en";
import { jaMessages } from "@/i18n/messages/ja";
import { zhCNMessages } from "@/i18n/messages/zh-CN";
import type { TranslationTree } from "@/i18n/types";

const localeMessages: Record<AppLocale, TranslationTree> = {
	en: enMessages,
	"zh-CN": zhCNMessages,
	ja: jaMessages,
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge(base: TranslationTree, override: TranslationTree): TranslationTree {
	const out: TranslationTree = { ...base };

	for (const [key, value] of Object.entries(override)) {
		if (isRecord(value) && isRecord(out[key])) {
			out[key] = deepMerge(
				out[key] as TranslationTree,
				value as TranslationTree,
			);
		} else {
			out[key] = value as string | TranslationTree;
		}
	}

	return out;
}

export function getLocaleMessages(locale: AppLocale): TranslationTree {
	if (locale === DEFAULT_LOCALE) return localeMessages[DEFAULT_LOCALE];
	return deepMerge(localeMessages[DEFAULT_LOCALE], localeMessages[locale]);
}
