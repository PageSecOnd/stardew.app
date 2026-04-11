import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const repoRoot = "/home/runner/work/stardew.app/stardew.app";

function loadMessages(filePath, exportName) {
	const source = fs.readFileSync(filePath, "utf8");
	const transpiled = ts.transpileModule(source, {
		compilerOptions: {
			module: ts.ModuleKind.CommonJS,
			target: ts.ScriptTarget.ES2020,
		},
	}).outputText;

	const module = { exports: {} };
	vm.runInNewContext(transpiled, {
		module,
		exports: module.exports,
		require: () => ({}),
	});
	return module.exports[exportName];
}

function flattenKeys(obj, prefix = "") {
	const keys = [];
	for (const [key, value] of Object.entries(obj || {})) {
		const current = prefix ? `${prefix}.${key}` : key;
		if (value && typeof value === "object") {
			keys.push(...flattenKeys(value, current));
		} else {
			keys.push(current);
		}
	}
	return keys;
}

function walk(dir) {
	const results = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...walk(fullPath));
			continue;
		}
		if (/\.(ts|tsx)$/.test(entry.name)) results.push(fullPath);
	}
	return results;
}

const en = loadMessages(path.join(repoRoot, "src/i18n/messages/en.ts"), "enMessages");
const zh = loadMessages(path.join(repoRoot, "src/i18n/messages/zh-CN.ts"), "zhCNMessages");
const ja = loadMessages(path.join(repoRoot, "src/i18n/messages/ja.ts"), "jaMessages");

const enKeys = new Set(flattenKeys(en));
const zhKeys = new Set(flattenKeys(zh));
const jaKeys = new Set(flattenKeys(ja));

const usedKeys = new Set();
for (const file of walk(path.join(repoRoot, "src"))) {
	const source = fs.readFileSync(file, "utf8");
	for (const match of source.matchAll(/\bt\s*\(\s*["'`]([^"'`]+)["'`]/g)) {
		usedKeys.add(match[1]);
	}
}

const missingInEn = [...usedKeys].filter((key) => !enKeys.has(key)).sort();
const unusedInEn = [...enKeys].filter((key) => !usedKeys.has(key)).sort();
const missingInZh = [...enKeys].filter((key) => !zhKeys.has(key)).sort();
const missingInJa = [...enKeys].filter((key) => !jaKeys.has(key)).sort();

function printList(title, values) {
	if (!values.length) return;
	console.log(`\n${title} (${values.length})`);
	for (const value of values) console.log(` - ${value}`);
}

printList("Missing keys in en (used in code)", missingInEn);
printList("Unused keys in en", unusedInEn);
printList("Missing keys in zh-CN (falls back to en)", missingInZh);
printList("Missing keys in ja (falls back to en)", missingInJa);

if (missingInEn.length) {
	process.exitCode = 1;
} else {
	console.log("\ni18n key check passed (en coverage for all used keys is complete).");
	console.log(
		`zh-CN coverage: ${((1 - missingInZh.length / enKeys.size) * 100).toFixed(1)}%`,
	);
	console.log(
		`ja coverage: ${((1 - missingInJa.length / enKeys.size) * 100).toFixed(1)}%`,
	);
}
