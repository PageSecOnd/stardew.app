import type { AppLocale } from "@/i18n/config";

const seasonLabels: Record<string, Record<AppLocale, string>> = {
	Spring: { en: "Spring", "zh-CN": "春季", ja: "春" },
	Summer: { en: "Summer", "zh-CN": "夏季", ja: "夏" },
	Fall: { en: "Fall", "zh-CN": "秋季", ja: "秋" },
	Winter: { en: "Winter", "zh-CN": "冬季", ja: "冬" },
};

export function formatSeason(season: string, locale: AppLocale): string {
	return seasonLabels[season]?.[locale] ?? season;
}

export function formatNumber(value: number, locale: AppLocale): string {
	return new Intl.NumberFormat(locale).format(value);
}

export function localeSort(a: string, b: string, locale: AppLocale): number {
	return a.localeCompare(b, locale);
}
