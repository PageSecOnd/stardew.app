import Head from "next/head";
import Image from "next/image";

import { parseSaveFile } from "@/lib/file";
import { useRef, useState, type ChangeEvent } from "react";

import { toast } from "sonner";

import { usePlayers } from "@/contexts/players-context";

import { LoginDialog } from "@/components/dialogs/login-dialog";
import Link from "next/link";
import { useLocale } from "@/contexts/locale-context";
import { buildCanonical, buildHrefLangs } from "@/lib/seo";
import { useRouter } from "next/router";

export default function Home() {
	const { uploadPlayers } = usePlayers();
	const { locale, t } = useLocale();
	const router = useRouter();
	const [loginOpen, setLoginOpen] = useState(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const file = e.target!.files![0];

		if (typeof file === "undefined" || !file) return;

		if (file.type !== "") {
			toast.error(t("home.toast.invalidType", "Invalid File Type"), {
				description: t(
					"home.toast.invalidTypeDesc",
					"Please upload a Stardew Valley save file.",
				),
			});
			return;
		}

		const reader = new FileReader();

		reader.onloadstart = () => {
			toast.loading(t("home.toast.uploading", "Uploading Save File"), {
				description: t(
					"home.toast.uploadingDesc",
					"Please wait while we upload your save file.",
				),
			});
		};

		reader.onload = async function (event) {
			try {
				const players = parseSaveFile(event.target?.result as string);
				await uploadPlayers(players);
				toast.success(t("home.toast.success", "Uploaded Save File"), {
					description: t(
						"home.toast.successDesc",
						"Your save file has been uploaded successfully",
					),
				});
			} catch (err) {
				toast.error(t("home.toast.parseError", "Error Parsing File"), {
					description:
						err instanceof Error
							? err.message
							: t("home.toast.unknownError", "Unknown error."),
				});
			}
		};
		reader.readAsText(file);
	};

	const canonical = buildCanonical("https://stardew.app", router.asPath, locale);
	const hrefLangs = buildHrefLangs("https://stardew.app", router.asPath);

	return (
		<>
			<Head>
				<title>
					{t("home.seo.title", "Stardew Valley Completion Tracker | stardew.app")}
				</title>
				<meta
					name="description"
					content={t(
						"home.seo.description",
						"Upload your Stardew Valley save file to track your progress towards 100% completion. Supports Stardew Valley 1.6 through 1.6.9.",
					)}
				/>
				<meta
					name="keywords"
					content={t(
						"home.seo.keywords",
						"stardew valley tracker, stardew tracker, stardew valley perfection tracker, stardew perfection tracker, stardew completion tracker, stardew valley collection tracker, stardew progress checker, stardew valley checklist app, stardew valley tracker app, stardew valley app, stardew app",
					)}
				/>
				<link rel="canonical" href={canonical} />
				{hrefLangs.map((item) => (
					<link
						key={item.locale}
						rel="alternate"
						hrefLang={item.locale}
						href={item.href}
					/>
				))}
				<link rel="alternate" hrefLang="x-default" href={hrefLangs[0].href} />
			</Head>
			<main
				className={`flex min-h-[calc(100vh-65px)] flex-col items-center border-neutral-200 px-5 pb-8 pt-2 dark:border-neutral-800 md:border-l md:px-8`}
			>
				<main className="flex max-w-2xl flex-grow flex-col items-center justify-center">
					<div className="mb-4 flex items-center gap-2">
						<Image
							src="/favicon.png"
							alt="stardew.app logo"
							className="rounded-sm"
							width={64}
							height={64}
						/>
						<h2 className="text-center text-3xl font-semibold">
							{t("common.appName", "stardew.app")}
						</h2>
					</div>
					<h3 className="text-center text-lg font-normal">
						{t(
							"home.hero.title",
							"Your ultimate sidekick for conquering Stardew Valley.",
						)}{" "}
						{t(
							"home.hero.description",
							"Seamlessly upload your save files and let us do the heavy lifting, or take the reins and manually update your progress.",
						)}
					</h3>
				</main>
				<footer className="w-full p-2">
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						<div
							onClick={() => {
								setLoginOpen(true);
							}}
							className="flex select-none items-center space-x-3 rounded-lg border border-neutral-200 bg-white px-5 py-4 text-neutral-950 shadow-sm transition-colors hover:cursor-pointer hover:border-blue-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:border-blue-600"
						>
							<Image
								src="/discord.png"
								alt="Log in with Discord"
								className="rounded-sm"
								width={48}
								height={48}
							/>
							<div className="min-w-0 flex-1">
								<p className="truncate font-medium">
									{t("home.cards.loginTitle", "Log in with Discord")}
								</p>
								<p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
									{t(
										"home.cards.loginDesc",
										"Link your Discord account to save your data across devices.",
									)}
								</p>
							</div>
						</div>

						<div
							className="flex select-none items-center space-x-3 rounded-lg border border-neutral-200 bg-white px-5 py-4 text-neutral-950 shadow-sm transition-colors hover:cursor-pointer hover:border-blue-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:border-blue-600"
							onClick={() => {
								inputRef.current?.click();
							}}
						>
							<Image
								src="/upload.png"
								alt="Upload a save file"
								className="rounded-sm"
								width={48}
								height={48}
							/>
							<div className="min-w-0 flex-1">
								<p className="truncate font-medium">
									{t("home.cards.uploadTitle", "Upload a save file")}
								</p>
								<p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
									{t(
										"home.cards.uploadDesc",
										"Upload your save file to track your progress towards perfection.",
									)}
								</p>
							</div>
							<input
								type="file"
								ref={inputRef}
								className="hidden"
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
							/>
						</div>
						<Link
							href="/editor/create"
							data-umami-event="Create farmhand (from home page)"
						>
							<div className="flex select-none items-center space-x-3 rounded-lg border border-neutral-200 bg-white px-5 py-4 text-neutral-950 shadow-sm transition-colors hover:cursor-pointer hover:border-blue-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:border-blue-600">
								<Image
									src="/create.png"
									alt="Create a farmhand"
									className="rounded-sm"
									width={48}
									height={48}
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium">
										{t("home.cards.createTitle", "Create a farmhand")}
									</p>
									<p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
										{t(
											"home.cards.createDesc",
											"Create a farmhand to track your progress towards perfection.",
										)}
									</p>
								</div>
							</div>
						</Link>

						<Link href="/github" data-umami-event="GitHub (from home page)">
							<div className="flex select-none items-center space-x-3 rounded-lg border border-neutral-200 bg-white px-5 py-4 text-neutral-950 shadow-sm transition-colors hover:cursor-pointer hover:border-blue-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:border-blue-600">
								<Image
									src="/github.png"
									alt="Look at GitHub"
									className="rounded-sm"
									width={48}
									height={48}
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium">
										{t("home.cards.githubTitle", "View on GitHub")}
									</p>
									<p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
										{t(
											"home.cards.githubDesc",
											"View the source code for this website on GitHub.",
										)}
									</p>
								</div>
							</div>
						</Link>
					</div>
				</footer>
			</main>
			<LoginDialog open={loginOpen} setOpen={setLoginOpen} />
		</>
	);
}
