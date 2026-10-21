#!/usr/bin/env node
// 各ツールのリポジトリにコピーした共通ファイルが、templates/ の原本と一致しているかを確認する（ローカル用）。
// 使い方: node tools/check-template-sync.mjs ../kanji-checker ../page-count ...
// 改行コードの違い（CRLF / LF）は無視する。
// あわせて、AGENTS.md と CLAUDE.md が両方あるリポジトリでは CLAUDE.md が `@AGENTS.md` を取り込んでいるかを見る
// （Claude Code は CLAUDE.md があると AGENTS.md を自動では読まないため、別々に書くと規則が片方にしか届かない）。
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
  const claudeMd = join(repo, 'CLAUDE.md');
  if (existsSync(claudeMd) && existsSync(join(repo, 'AGENTS.md'))) {
    const first = norm(claudeMd).split('\n').find((line) => line.trim() !== '');
    if (first?.trim() !== '@AGENTS.md') {
      console.error(`取り込みなし: ${claudeMd} の先頭行を @AGENTS.md にする（原本: templates/CLAUDE.template.md）`);
      drift++;
    }
  }
}
console.log(drift ? `${drift} 件のファイルが原本と異なります` : '共通ファイルはすべて原本と一致しています');
process.exit(drift ? 1 : 0);
