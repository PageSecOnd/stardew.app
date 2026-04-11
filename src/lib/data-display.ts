import objects from "@/data/objects.json";
import type { AppLocale } from "@/i18n/config";

const objectNamesByLocale: Partial<Record<AppLocale, Record<string, string>>> = {
	en: Object.fromEntries(
		Object.entries(objects).map(([id, value]) => [id, value.name]),
	),
};

export function getObjectDisplayName(itemId: string, locale: AppLocale): string {
	return objectNamesByLocale[locale]?.[itemId] ?? objects[itemId as keyof typeof objects]?.name ?? itemId;
}
