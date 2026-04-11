import Document, {
	Head,
	Html,
	Main,
	NextScript,
	type DocumentContext,
	type DocumentInitialProps,
} from "next/document";
import { AppLocale, DEFAULT_LOCALE, isSupportedLocale } from "@/i18n/config";

const descriptions: Record<AppLocale, string> = {
	en: "Keep track of your Stardew Valley progression through 1.6.9. Upload your save file and track your progress towards 100% completion.",
	"zh-CN":
		"追踪你在 Stardew Valley 1.6.9 的进度。上传存档并朝 100% 完成迈进。",
	ja: "Stardew Valley 1.6.9 までの進行状況を追跡。セーブをアップロードして100%達成を目指そう。",
};

type Props = DocumentInitialProps & { locale: AppLocale };

export default class MyDocument extends Document<Props> {
	static async getInitialProps(ctx: DocumentContext): Promise<Props> {
		const initialProps = await Document.getInitialProps(ctx);
		const rawLocale = ctx.locale || ctx.defaultLocale || DEFAULT_LOCALE;
		const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

		return { ...initialProps, locale };
	}

	render() {
		const { locale } = this.props;
		const description = descriptions[locale];

		return (
			<Html lang={locale}>
				<Head>
					<script
						async
						src="https://analytics.eu.umami.is/script.js"
						data-website-id="148c90ab-aacc-40b4-b1c7-b4eee4862a7c"
					></script>
					<script
						defer
						data-domain="stardew.app"
						src="https://plausible.verbose.faith/js/script.js"
					></script>

					<meta charSet="utf-8" />
					<meta name="description" content={description} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://stardew.app" />
					<meta property="og:title" content="Stardew.app" />
					<meta property="og:description" content={description} />

					<meta property="og:thumbnail" content="/favicon.png" />
					<meta property="og:image:width" content="64" />
					<meta property="og:image:height" content="64" />

					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://stardew.app" />
					<meta name="twitter:title" content="stardew.app" />
					<meta name="twitter:description" content={description} />
					<meta name="twitter:image" content="/favicon.png" />
					<meta name="twitter:image:width" content="512" />
					<meta name="twitter:image:height" content="512" />

					<link rel="icon" href="/favicon.png" />
				</Head>
				<body className="overscroll-y-none dark:bg-neutral-950">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
