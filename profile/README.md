# edi-tool

教育現場や編集実務における「あったらいいな」を、シンプルなツールで解決するプロジェクトです。
主にWebブラウザ上で動作し、インストール不要ですぐに使えるツールを公開しています。
入力したファイルは外部に送信されず、すべてブラウザ内で処理が完結します。

---

## 🛠 公開中のツール

### 📚 教育・学習支援
* **[教育漢字さん: edu-kanji-checker](https://edi-tool.github.io/edu-kanji-checker/)**
    * PDF・Word 内の漢字を、小学校での学習学年別に分類して表示します。教材づくりやテキスト選定に。
* **[常用漢字さん: kanji-checker](https://edi-tool.github.io/kanji-checker/)**
    * PDF・Word 内の常用漢字外（表外漢字）を検出し、文脈つきで指摘します。人名用漢字も判別します。
* **[黒板補正さん: kokuban-adjust](https://edi-tool.github.io/kokuban-adjust/)**
    * 斜めから撮った黒板・ホワイトボードの写真を、正面から見た長方形に補正します。

### 📖 出版・編集実務
* **[表記統一さん: hyoki-checker](https://edi-tool.github.io/hyoki-checker/)**
    * 文章中の表記ゆれを検出し、統一を提案します。辞書ベースと形態素解析（Beta）に対応。
* **[ページ調整さん: page-count](https://edi-tool.github.io/page-count/)**
    * 暫定ページ数から台割りに合うページ数を提案し、背幅を概算します。入稿前の確認に。
* **[二次元コードさん: sku-to-qr](https://edi-tool.github.io/sku-to-qr/)**
    * SKU番号から商品ページの二次元コードを作成します。社内利用を想定しているため、ハブページ（edi-tool.github.io）には掲載していません。

---

## 🧪 開発中・検討中のツール

* **[作図ツール: D-shape](https://github.com/edi-tool/D-shape)**
    * 算数プリント用の図形をSVGで作成するツール。現在はリポジトリのみ公開で、Webページは未公開です。
* **印税シミュレーター**
    * 著者や版元の情報を含まない、安全な計算機。

---

## 🌐 ポータル

公開中のツールは [https://edi-tool.github.io/](https://edi-tool.github.io/) から一覧できます。

---

## 🌟 プロジェクトの指針
1.  **Low Barrier:** 専門的な知識がなくても、ブラウザがあれば誰でも使えること。
2.  **Practicality:** 実際の編集・教育のワークフローに基づいた機能であること。
3.  **Openness:** MITライセンスによるオープンソース公開を行い、知見を共有すること。

判定基準・出典の明示、取得失敗を「該当なし」と表示しないこと、外部送信の扱いなどの詳細は
[開発原則（PRINCIPLES.md）](https://github.com/edi-tool/.github/blob/main/PRINCIPLES.md) にまとめています。
誤判定や不具合は、各ツールのリポジトリの Issue からお知らせください（原稿の本文は貼らないでください）。

## 🔗 関連
* [surf90](https://github.com/surf90) — ライフセービング・海辺の安全のためのツール
* [napple02](https://github.com/napple02) — 開発者のプロフィール

## 📄 ライセンス
本組織で公開されているリポジトリは、特に指定がない限り **MIT License** の下で提供されています。
