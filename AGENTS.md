# AGENTS.md

## 報告のルール
- 応答・説明・コメント・docstringは日本語で書く
- 作業完了時の報告は簡潔に、日本語で
- コード、コマンド、ファイル名、エラーメッセージの原文はそのまま残す

## 守ること
- このリポジトリは edi-tool 共通の原則（`PRINCIPLES.md`）とテンプレート（`templates/`）の原本。テンプレートを直したら `node tools/check-template-sync.mjs ../各リポジトリ` で各ツールとの一致を確認する。
- テスト: `npm test`（Node.js 22 以上、依存なし）
