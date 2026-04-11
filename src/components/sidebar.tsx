import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/contexts/locale-context";

import { Button } from "@/components/ui/button";

import {
	IconAward,
	IconBook,
	IconBox,
	IconBrandDiscord,
	IconBrandGithub,
	IconBuildingWarehouse,
	IconCarrot,
	IconEgg,
	IconFishHook,
	IconFlameFilled,
	IconGardenCart,
	IconHammer,
	IconHeart,
	IconHome2,
	IconId,
	IconNote,
	IconPaw,
	IconPencilUp,
	IconProgress,
	IconSettings,
	IconShirt,
	IconSparkles,
	IconStars,
} from "@tabler/icons-react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export const miscNavigation = [
	{ labelKey: "nav.misc.bundles", fallback: "Bundles", href: "/bundles", icon: IconBox },
	{ labelKey: "nav.misc.notes", fallback: "Secret Notes", href: "/notes", icon: IconNote },
	{ labelKey: "nav.misc.rarecrows", fallback: "Rarecrows", href: "/rarecrows", icon: IconCarrot },
	{ labelKey: "nav.misc.account", fallback: "Account Settings", href: "/account", icon: IconSettings },
];

export const playerNavigation = [
	{ labelKey: "nav.player.home", fallback: "Home", href: "/", icon: IconHome2 },
	{ labelKey: "nav.player.farmer", fallback: "Farmer", href: "/farmer", icon: IconId },
	{ labelKey: "nav.player.skills", fallback: "Skills & Mastery", href: "/skills", icon: IconStars },
	{ labelKey: "nav.player.relationships", fallback: "Relationships", href: "/relationships", icon: IconHeart },
	{ labelKey: "nav.player.animals", fallback: "Animals", href: "/animals", icon: IconPaw },
	{ labelKey: "nav.player.perfection", fallback: "Perfection", href: "/perfection", icon: IconAward },
	{ labelKey: "nav.player.grandpa", fallback: "Grandpa's Evaluation", href: "/grandpa", icon: IconFlameFilled },
];

export const collectionsNavigation = [
	{ labelKey: "nav.collections.cooking", fallback: "Cooking", href: "/cooking", icon: IconEgg },
	{ labelKey: "nav.collections.crafting", fallback: "Crafting", href: "/crafting", icon: IconHammer },
	{ labelKey: "nav.collections.fishing", fallback: "Fishing", href: "/fishing", icon: IconFishHook },
	{ labelKey: "nav.collections.shipping", fallback: "Shipping", href: "/shipping", icon: IconGardenCart },
	{ labelKey: "nav.collections.museum", fallback: "Museum", href: "/museum", icon: IconBuildingWarehouse },
];

export const islandNavigation = [
	{ labelKey: "nav.island.walnuts", fallback: "Golden Walnuts", href: "/island/walnuts", icon: IconProgress },
	{ labelKey: "nav.island.scraps", fallback: "Journal Scraps", href: "/island/scraps", icon: IconBook },
	{ labelKey: "nav.island.upgrades", fallback: "Island Upgrades", href: "/island/upgrades", icon: IconPencilUp },
];

export const linksNavigation = [
	{ labelKey: "nav.links.discord", fallback: "Discord", href: "/discord", icon: DiscordLogoIcon },
	{ labelKey: "nav.links.github", fallback: "GitHub", href: "/github", icon: GitHubLogoIcon },
	{
		labelKey: "nav.links.stardewme",
		fallback: "stardew.me",
		href: "https://stardew.me/?utm_campaign=StardewApp&utm_source=Beta&utm_medium=Button",
		icon: IconShirt,
	},
];

export const SidebarCategory = ({ children }: { children: string }) => (
	<h2 className="mb-2 mt-4 px-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300">
		{children}
	</h2>
);

export function Sidebar({ className }: SidebarProps) {
	const pathname = usePathname();
	const { t } = useLocale();

	return (
		<div className={className}>
			<div className="grid w-72 grid-cols-3 gap-2 px-3 pt-4">
				<div className="relative col-span-3">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="outline"
									className="relative w-full overflow-hidden hover:bg-green-500 hover:text-neutral-50 dark:hover:bg-green-500"
									asChild
								>
									<a
										href={"https://feedback.stardew.app"}
										target="_blank"
										rel="noreferrer"
										className="flex items-center gap-2"
									>
										<IconSparkles size={20} />
										<span>{t("topbar.feedbackRoadmap", "Feedback & Roadmap")}</span>
									</a>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="left">
								<p>{t("topbar.shareThoughts", "Share your thoughts with us!")}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								className="w-full hover:bg-[#5865F2] hover:text-neutral-50 dark:hover:bg-[#5865F2]"
								asChild
							>
								<a href={"/discord"} target="_blank" rel="noreferrer">
									<IconBrandDiscord size={20} />
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>{t("topbar.joinDiscord", "Join our Discord!")}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								className="w-full hover:bg-neutral-800 hover:text-neutral-50"
								asChild
							>
								<a href={"/github"} target="_blank" rel="noreferrer">
									<IconBrandGithub size={20} />
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>{t("topbar.sourceTooltip", "stardew.app's source!")}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								className="w-full hover:bg-[#FFD282] hover:text-neutral-50 dark:hover:bg-[#FFD282]"
								asChild
							>
								<a
									href={
										"https://stardew.me/?utm_campaign=StardewApp&utm_source=Beta&utm_medium=Button"
									}
									target="_blank"
									rel="noreferrer"
								>
									<IconShirt size={20} />
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>{t("topbar.avatarTooltip", "Generate a Stardew avatar!")}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<nav className="px-3 pb-2">
				<SidebarCategory>{t("nav.category.player", "Player")}</SidebarCategory>
				<div className="space-y-1">
					{playerNavigation.map((item) => (
						<Button
							key={item.href}
							variant={pathname === item.href ? "secondary" : "ghost"}
							className={cn(
								"w-full justify-start",
								item.href === pathname
									? ""
									: "text-neutral-600 dark:text-neutral-400",
							)}
							asChild
						>
							<Link href={item.href}>
								<item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
								{t(item.labelKey, item.fallback)}
							</Link>
						</Button>
					))}
				</div>
				<SidebarCategory>{t("nav.category.collections", "Collections")}</SidebarCategory>
				<div className="space-y-1">
					{collectionsNavigation.map((item) => (
						<Button
							key={item.href}
							variant={pathname === item.href ? "secondary" : "ghost"}
							className={cn(
								"w-full justify-start",
								item.href === pathname
									? ""
									: "text-neutral-600 dark:text-neutral-400",
							)}
							asChild
						>
							<Link href={item.href}>
								<item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
								{t(item.labelKey, item.fallback)}
							</Link>
						</Button>
					))}
				</div>

				<SidebarCategory>{t("nav.category.gingerIsland", "Ginger Island")}</SidebarCategory>
				<div className="space-y-1">
					{islandNavigation.map((item) => (
						<Button
							key={item.href}
							variant={pathname === item.href ? "secondary" : "ghost"}
							className={cn(
								"w-full justify-start",
								item.href === pathname
									? ""
									: "text-neutral-600 dark:text-neutral-400",
							)}
							asChild
						>
							<Link href={item.href}>
								<item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
								{t(item.labelKey, item.fallback)}
							</Link>
						</Button>
					))}
				</div>

				<SidebarCategory>{t("nav.category.misc", "Misc")}</SidebarCategory>
				<div className="space-y-1">
					{miscNavigation.map((item) => (
						<Button
							key={item.href}
							variant={pathname === item.href ? "secondary" : "ghost"}
							className={cn(
								"w-full justify-start",
								item.href === pathname
									? ""
									: "text-neutral-600 dark:text-neutral-400",
							)}
							asChild
						>
							<Link href={item.href}>
								<item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
								{t(item.labelKey, item.fallback)}
							</Link>
						</Button>
					))}
				</div>
			</nav>
		</div>
	);
}
