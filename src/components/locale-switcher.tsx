import { useLocale } from "@/contexts/locale-context";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import type { AppLocale } from "@/i18n/config";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const localeKeyMap: Record<AppLocale, string> = {
	en: "locale.en",
	"zh-CN": "locale.zhCN",
	ja: "locale.ja",
};

export function LocaleSwitcher() {
	const { locale, setLocale, t } = useLocale();

	return (
		<Select
			value={locale}
			onValueChange={(value) => setLocale(value as AppLocale)}
		>
			<SelectTrigger className="w-[132px]" aria-label={t("locale.label", "Language")}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{SUPPORTED_LOCALES.map((value) => (
					<SelectItem key={value} value={value}>
						{t(localeKeyMap[value], value)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
