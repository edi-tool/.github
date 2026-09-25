#!/usr/bin/env node
// 各ツールのリポジトリにコピーした共通ファイルが、templates/ の原本と一致しているかを確認する（ローカル用）。
// 使い方: node tools/check-template-sync.mjs ../kanji-checker ../page-count ...
// 改行コードの違い（CRLF / LF）は無視する。
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TEMPLATES = join(dirname(fileURLToPath(import.meta.url)), '..', 'templates');
const FILES = { 'scripts/check-static.mjs': 'scripts/check-static.mjs', 'tests/helpers.js': 'tests/helpers.js' };
const norm = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

let drift = 0;
for (const repo of process.argv.slice(2)) {
  for (const [copy, original] of Object.entries(FILES)) {
    const target = join(repo, copy);
    if (!existsSync(target)) continue; // 使っていないリポジトリもある
    if (norm(target) !== norm(join(TEMPLATES, original))) {
      console.error(`差分あり: ${target}（原本: templates/${original}）`);
      drift++;
    }
  }
}
console.log(drift ? `${drift} 件のファイルが原本と異なります` : '共通ファイルはすべて原本と一致しています');
process.exit(drift ? 1 : 0);
