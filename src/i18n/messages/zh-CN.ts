import { TranslationTree } from "@/i18n/types";

export const zhCNMessages: TranslationTree = {
	common: {
		appName: "stardew.app",
		internal: "内部",
		close: "关闭",
		search: "搜索",
	},
	locale: {
		en: "English",
		zhCN: "简体中文",
		ja: "日本語",
		label: "语言",
	},
	nav: {
		category: {
			player: "角色",
			collections: "收集",
			gingerIsland: "姜岛",
			misc: "其他",
			links: "链接",
		},
	},
	topbar: {
		whatsNew: "新内容？",
		toggleTheme: "切换主题",
		editPlayer: "编辑角色",
		uploadSave: "上传存档",
		logInWithDiscord: "使用 Discord 登录",
		credits: "鸣谢",
		sendMessage: "给我们留言！",
		reportBug: "反馈 Bug！",
		deleteSaveData: "删除存档数据",
		logOut: "退出登录",
		feedbackRoadmap: "反馈与路线图",
		joinDiscord: "加入 Discord！",
		sourceTooltip: "stardew.app 源码",
		avatarTooltip: "生成 Stardew 头像！",
		shareThoughts: "欢迎分享你的想法！",
	},
	preset: {
		loadFarmhand: "加载农场助手...",
		searchFarmhands: "搜索农场助手...",
		noFarmhandsFound: "未找到农场助手。",
		unknownFarm: "未知农场",
		unnamedFarmhand: "未命名助手",
		newFarmhand: "新建农场助手",
	},
	home: {
		seo: {
			title: "星露谷完成度追踪器 | stardew.app",
			description:
				"上传你的星露谷存档，追踪 100% 完成进度。支持 Stardew Valley 1.6 - 1.6.9。",
			keywords: "星露谷, 存档追踪, 完成度, stardew",
		},
		hero: {
			title: "征服星露谷的最佳搭档。",
			description: "上传存档自动追踪，或手动更新进度，轻松迈向 100% 完成。",
		},
		cards: {
			loginTitle: "使用 Discord 登录",
			loginDesc: "绑定 Discord 账号，在多设备间同步数据。",
			uploadTitle: "上传存档",
			uploadDesc: "上传存档以追踪你的完美进度。",
			createTitle: "创建农场助手",
			createDesc: "创建一个农场助手来手动追踪进度。",
			githubTitle: "在 GitHub 查看",
			githubDesc: "查看本网站的开源代码。",
		},
		toast: {
			invalidType: "文件类型无效",
			invalidTypeDesc: "请上传 Stardew Valley 存档文件。",
			uploading: "正在上传存档",
			uploadingDesc: "请稍候，我们正在上传你的存档。",
			success: "上传成功",
			successDesc: "你的存档已成功上传",
			parseError: "解析存档失败",
			unknownError: "未知错误。",
		},
	},
	mobileNav: {
		upload: "上传",
		deleteSaves: "删除存档",
		editFarmer: "编辑农夫",
		playerLabel: "角色",
		collectionsLabel: "收集",
		gingerIslandLabel: "姜岛",
		miscLabel: "其他",
		linksLabel: "链接",
	},
	seo: {
		siteName: "stardew.app",
		defaultDescription:
			"追踪你在 Stardew Valley 1.6.9 的进度。上传存档并朝 100% 完成迈进。",
	},
};
