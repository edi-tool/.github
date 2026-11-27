# 2026-11-27 ライセンス整備・帰属表示の作業記録

## 決定事項

- ソフトウェア・ソースコード：Apache License 2.0（従来 MIT から変更）。
- 独自のマニュアル・解説記事：CC BY 4.0。
- 独自の名称・ロゴ：All Rights Reserved。出典の説明に必要な名称使用は妨げない。
- 商用利用・複製・改変・再配布を認めながら、原著作者と開発元の帰属情報を維持する。PolyForm Internal Use、独自の利用制限、CC BY のコードへの一律適用は採用しない。
- 第三者のライセンス・帰属表示を維持する。旧版の MIT 等による既存の許諾は取り消さない。
- フッターは著作権表示と Apache License 2.0 の公式リンク（https://www.apache.org/licenses/LICENSE-2.0）を基本とする。NOTICE はリポジトリ側に保持する。
- 独自 HTML・JS の冒頭に SPDX-License-Identifier、著作権者、Project、Source を記載する。混合ライセンスや外部コード・データは一律変更しない。AI による取得時に出典が伝わるようにするが、遵守や模倣防止を保証するものではない。

正式な運用ルールは [LICENSING.md](../LICENSING.md) と [PRINCIPLES.md](../PRINCIPLES.md) を参照。

## 作業・確認結果

- 組織の現行（非アーカイブ）14 リポジトリで LICENSE・NOTICE の整備と GitHub の Apache-2.0 自動認識を確認済み。アーカイブ済み 2 リポジトリは MIT のまま維持。公開・非公開設定は変更していない。
- 組織プロフィール、README テンプレート、共通開発原則、ライセンス運用方針を更新。
- sku-to-qr に node-qrcode v1.4.4 の MIT ライセンス文を追加（版は過去の CDN 参照から特定。実ファイル同一性と間接依存の調査は残る）。
- kanji-checker に人名用漢字データの CC BY 4.0 帰属情報と Unicode License v3、edu-kanji-checker に Unicode License v3 を追加。Unicode データの正確な配布版とライセンスの照合は最終確認事項。
- hyoki-checker の既存の Sudachi・JTF・文化庁資料の NOTICE を維持。book_mockup / kokuban-adjust の第三者ライセンス表記を維持。
- 次の 11 リポジトリでデフォルトブランチの index.html を再取得し、SPDX 表記、Apache 公式リンク、フッターに NOTICE・長い適用範囲の説明がないことを確認。対象 JS もコメントを追加。第三者コード（例：qrcode.min.js、kuromoji.js）、混合データ・生成辞書、参考コードの権利が混在するファイルは一律変更していない。

| リポジトリ | サイト表示・ソースコメントの変更コミット |
| --- | --- |
| edi-tool.github.io | [97e4b27](https://github.com/edi-tool/edi-tool.github.io/commit/97e4b27dd95e15164888f29a9cd937974ac6d3b1) |
| page-count | [52fb5a4](https://github.com/edi-tool/page-count/commit/52fb5a436c3f038405ef0cfb269525659ea95d5b) |
| sku-to-qr | [f3c0946](https://github.com/edi-tool/sku-to-qr/commit/f3c09467c2131da43a82faf31c857c7c454cb4c1) |
| kanji-checker | [f2beebb](https://github.com/edi-tool/kanji-checker/commit/f2beebba1643f22250ff9c8fbe09d335f637489a) |
| edu-kanji-checker | [c79f799](https://github.com/edi-tool/edu-kanji-checker/commit/c79f799ef61fda71ed6803f6646a69c5f589b40b) |
| kokuban-adjust | [33e1ee3](https://github.com/edi-tool/kokuban-adjust/commit/33e1ee3f4030cd15725ea6ed52c35a082af0b3b5) |
| moji-counter | [7704ec7](https://github.com/edi-tool/moji-counter/commit/7704ec7e9cf291ea37eac8af8a101e93b7b460c9) |
| color-palette | [533266a](https://github.com/edi-tool/color-palette/commit/533266a4bd200adec26dbcfb51bc8b882ae40644) |
| hyoki-checker | [3cce5eb](https://github.com/edi-tool/hyoki-checker/commit/3cce5ebb16c30b3bebd9c881197a7088b16bf188) |
| book_mockup | [7ab596e](https://github.com/edi-tool/book_mockup/commit/7ab596ed0d6ab522e282e2c1d915a1fa87bfc701) |
| zukei-drafter | [42379e8](https://github.com/edi-tool/zukei-drafter/commit/42379e8a600cdfc2878ca0e6368e80bcc3c7306e) |
| file-viewer | [PR #9](https://github.com/edi-tool/file-viewer/pull/9)（記録時点で未マージ） |

## 引き継ぎ事項（未完了）

- 本番 URL の HTML・フッター・ソースコメントを直接再取得し、最新コミットの配信と CI の成功を確認する。今回の最終確認は GitHub ソースの静的確認であり、全サイトの実配信・ブラウザテスト完了を意味しない。
- file-viewer の PR #9 は CI・レビュー後にマージする。配布物への LICENSE / NOTICE の収録、WASM・フォント・全依存のライセンス監査は公開受入条件として維持する。
- 同梱ライブラリの間接依存、参照／流用コード、画像・フォント・アイコンの由来を確認する。SPDX の対象を増やすときはファイル単位の権利を確認する。
- 公開ビルドに LICENSE・NOTICE と必要な第三者のライセンスが含まれ、ソースコメントが残ることの CI 自動検査は未導入。今後の保守項目とする。
- アーカイブ済みリポジトリの再公開・再開時は個別にライセンスを再確認する。

一連のライセンス変更と表示整備はこの記録をもって区切る。残課題の完了を宣言するものではない。
