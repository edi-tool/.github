# ツール名（愛称：〇〇さん）

一文で価値を書く（誰が・何を・どうできるか）。

🔗 https://edi-tool.github.io/REPO/

![画面例](docs/screenshot.png)

## 使い方

1. …
2. …

## データの扱い

- 読み込んだファイルは **ブラウザ内で処理し、外部へ送信しません**。
- 外部から読み込むもの：（例）[PDF.js](https://mozilla.github.io/pdf.js/) 6.x.x（cdn.jsdelivr.net）
- 例外的に送信するもの：（ある場合のみ。送信先・送信内容・送信のきっかけ）

## 判定基準・計算根拠と出典

- 基準：（告示名・版・字数など）
- 出典：（URL）

## 制限事項・よくある質問

- 自動判定には誤検知・見落としがあります。最終確認は利用者が行ってください。
- …

## 開発

ビルド工程はありません。`index.html` をそのまま GitHub Pages が配信します。

```bash
python -m http.server 8000   # プレビュー
npm test                     # テスト（Node.js 22 以上、依存パッケージなし）
npm run check                # HTML の静的チェック
```

変更履歴は [CHANGELOG.md](CHANGELOG.md) を参照してください。

## 関連ツール

- [edi-tool](https://edi-tool.github.io/) の他のツール

## ライセンス

MIT License © 2026 ISHIKAWA, Natsuki
第三者ライブラリはそれぞれのライセンスに従います（…）。
