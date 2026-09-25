// check-static.mjs の単体テスト（node --test）
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expandFrontMatter } from './check-static.mjs';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'check-static.mjs');
const OK_HEAD = '<!DOCTYPE html><html lang="ja"><head><meta name="viewport" content="width=device-width"><meta name="description" content="x"><title>t</title>';

function run(files) {
  const dir = mkdtempSync(join(tmpdir(), 'check-static-'));
  for (const [name, body] of Object.entries(files)) writeFileSync(join(dir, name), body);
  return spawnSync(process.execPath, [SCRIPT], { cwd: dir, encoding: 'utf8' });
}

test('front matter の page 変数を展開する', () => {
  const html = '---\nlayout: null\nlang: ja\n---\n<html lang="{{ page.lang }}">';
  assert.equal(expandFrontMatter(html), '<html lang="ja">');
});

test('基本要件を満たす HTML は成功する', () => {
  const r = run({ 'index.html': `${OK_HEAD}<script src="https://cdn.jsdelivr.net/npm/mammoth@1.12.0/x.js"></script></head></html>` });
  assert.equal(r.status, 0, r.stderr);
});

test('バージョン未固定の CDN・許可外ホスト・存在しないローカル参照は失敗する', () => {
  const r = run({
    'index.html': `${OK_HEAD}<script src="https://cdn.jsdelivr.net/npm/mammoth/x.js"></script><script src="https://example.com/a.js"></script><script src="missing.js"></script></head></html>`,
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /バージョンが固定されていません/);
  assert.match(r.stderr, /許可されていない外部ホスト/);
  assert.match(r.stderr, /参照先のファイルがありません/);
});

test('alt のない img と viewport 欠落は失敗し、package.json の ignore で警告に下げられる', () => {
  const html = '<html lang="ja"><head><title>t</title></head><img src="a.png"></html>';
  assert.equal(run({ 'index.html': html, 'a.png': '' }).status, 1);
  const r = run({ 'index.html': html, 'a.png': '', 'package.json': JSON.stringify({ checkStatic: { ignore: ['viewport', 'img-alt'] } }) });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stderr, /除外中/);
});
