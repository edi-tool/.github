# 改善プロジェクト ロードマップ（napple02 / edi-tool / surf90）

2026-09-25 時点。第1〜2期の実施内容は各リポジトリの CHANGELOG を参照。
方針は [PRINCIPLES.md](PRINCIPLES.md)、共通部品は `templates/`。

## 完了済み（第1〜2期）

- edi-tool 7 ツール＋ハブ：テスト・CI・HTML 静的チェック・README（データの扱い）・CHANGELOG・AGENTS.md・Pages 除外設定
- Releases：kanji-checker v1.4.0 / edu-kanji-checker v1.4.0 / page-count v1.3.0 / sku-to-qr v1.2.0 / kokuban-adjust v1.4.0 / D-shape v0.3.0
- 取得失敗を「異常なし」と見せない修正：kanji・edu-kanji（抽出失敗）、chiga-log（古い警報）、tide-PDF（架空サンプル）、chiga-bio（応急処置欠落・PR #62）
- surf90・delay-bot・プロフィールの README / CHANGELOG 整備、tide-PDF の型チェック CI

## 第3期（次にやる順）

| 優先 | リポジトリ | タスク | 完了条件 |
|---|---|---|---|
| 1 | rescue-sim | `git rm --cached claude.md` → commit・push（許可設定で Claude 不可） | `git ls-files` に claude.md がない |
| 2 | chiga-bio | PR #62 のマージ | main に反映・Pages 更新 |
| 3 | hyoki-checker | Release v1.5.0（CHANGELOG の Unreleased を確定）。`package.json` の pdfjs-dist 6.3.289 と index.html の CDN 6.1.200 の不一致を解消（CDN 更新＋PDF 実読込確認） | バージョン一致をテストで固定 |
| 4 | surf90.github.io | edi-tool ハブと同じ掲載整合テスト（index / sitemap / README）と CI を追加。tide-PDF・rescue-sim を載せない方針もテスト化 | CI 緑 |
| 5 | chiga-log | CI に「`app.min.js` / `style.min.css` が原本から再生成したものと一致するか」の検査を追加。CHANGELOG 作成（データ自動コミットは除外） | 生成漏れで CI が落ちる |
| 6 | 各ツール | スクリーンショット追加（sku-to-qr・chiga-log・chiga-bio・tide-PDF・rescue-sim）。Edge headless で公開ページを撮影 | README 冒頭に画像 |
| 7 | 実機確認 | iPhone Safari で全ツール表示、画像 PDF で抽出失敗警告、chiga-log の Worker 停止時表示 | 確認記録を progress.md に |

## 第4期（中長期）

- **データの原本と生成物の分離**：`kanji_data.js`・`jinmei-kanji-data.js` を出典 CSV から生成するスクリプト化（`scripts/build-data.mjs`）と、CI での生成差分検出
- **テンプレート同期の自動化**：`tools/check-template-sync.mjs` を各リポジトリの CI から原本（raw URL）と比較する形へ
- **Releases の定型化**：CHANGELOG の Unreleased から notes を作ってタグを打つ手順を `templates/` にスクリプト化
- **ブランチ保護**：自動 push・同期の仕組みと両立する設定を確認してから CI 必須化
- **FAQ / Examples**：各 README に誤判定の典型例と対処（mattn 流の FAQ 充実）

## 運用メモ

- 環境にコミット後の自動 push・同期があるため、コミット＝公開とみなす。
- `git rebase` / `git rm` は許可設定で Claude から実行不可。必要時はユーザーが実行する。
- chiga-bio は main 直接コミット禁止（ブランチ＋PR、`sw.js` の `CACHE_VERSION` 更新、progress.md 記録）。
