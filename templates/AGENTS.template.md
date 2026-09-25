# REPO

（1行説明）公開URL: https://edi-tool.github.io/REPO/

## 実行コマンド

- プレビュー: `python -m http.server 8000`
- テスト: `npm test`（Node.js 22 以上、依存なし）
- HTML 静的チェック: `npm run check`

## 守ること

- [edi-tool 開発原則](https://github.com/edi-tool/.github/blob/main/PRINCIPLES.md) に従う。
- ファイルを外部送信しない設計を崩さない。外部依存を増やしたら README の「データの扱い」を更新する。
- 判定データを変えたら、出典と照合し、テストの期待値と README の件数を同時に更新する。
- `scripts/check-static.mjs` と `tests/helpers.js` は edi-tool/.github の原本からのコピー。直すときは原本も直し、`node tools/check-template-sync.mjs ../各リポジトリ` で一致を確認する。
