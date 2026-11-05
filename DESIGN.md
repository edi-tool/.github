# edi-tool 共通デザイン

edi-tool の各ツール・ハブ（edi-tool.github.io）で共通にする見た目の正本。`PRINCIPLES.md` の「4. 画面」を具体化したもの。
各ツールは下の `:root` を自分の `styles.css`（または `<style>`）の先頭に写し、ツール固有の値はその後ろに足す。
版: 2026-11-05（配色さんのデザイン指針づくりで共通部分を切り出した初版。根拠と画面案は edi-tool/color-palette の `docs/design-guidelines.md`）

## 1. 方針

- **中立な UI、オレンジは一点**: 墨・白・生成り（`--bg`）が基本。`--accent`（`#f28c06`）は主操作ボタンの塗りとアイコンの地色だけに使う。
- **影は浮いている物だけ**: カード・パネルは 1px の線で区切る。影はシート・トースト・浮いたボタンに限る。ダークは面の明度差で重なりを示す。
- **状態は色だけで示さない**: 選択・固定・エラー・成功は、形（枠・塗り反転・点線）／文字／アイコンのうち2つ以上で表す。
- **外部フォントを使わない**: 系統フォントのみ。

## 2. トークン

```css
:root {
  --bg: #f8f6f2;
  --surface: #fff;
  --surface-2: #f1eee8;
  --border: #e0e0e0;          /* 装飾の区切り線。情報を持たせない */
  --control-border: #8c877e;  /* 入力欄・ボタンの輪郭（白地 3.57:1） */
  --text: #0f0f0f;
  --text-sub: #5f5b54;        /* 背景上 6.25:1 */
  --accent: #f28c06;          /* 塗り。上に載せる文字は #1a1100（7.59:1） */
  --accent-dark: #d97a00;
  --accent-soft: #fff8f0;
  --accent-text: #b35f00;     /* 白地の太字・18px 以上だけ（白地 4.61:1） */
  --accent-ink: #9a5200;      /* 小さい文字のアクセント・リンク（背景上 5.43:1・淡色上 5.57:1） */
  --focus: #9a5200;
  --danger: #c62828;          /* 背景上 5.21:1 */
  --danger-soft: #fdf0ef;
  --ok: #2e7d32;
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1c1b19; --surface: #26241f; --surface-2: #2f2c26;
    --border: #46423a; --control-border: #8a8476;
    --text: #f3f1ec; --text-sub: #b9b4a8;
    --accent-soft: #33281a; --accent-text: #ffb24d; --accent-ink: #ffb24d; --focus: #ffb24d;
    --danger: #ff8a80; --danger-soft: #3a2120; --ok: #81c784;
  }
}
:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
```

`<head>` には `theme-color` を2つ置く:

```html
<meta name="theme-color" content="#f8f6f2" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1c1b19" media="(prefers-color-scheme: dark)">
```

### 旧トークンからの移行

| 旧 | 新 | 理由 |
|---|---|---|
| 小さい文字に `--accent-text: #b35f00` | `--accent-ink: #9a5200` | `#b35f00` は背景 `#f8f6f2` 上 4.27:1、`#fff8f0` 上 4.38:1 で 4.5:1 未満 |
| `:focus-visible { outline: 2px solid var(--accent) }` | `outline: 3px solid var(--focus)` | `#f28c06` は背景上 2.28:1 で非文字の 3:1 未満 |
| `--text-sub: #6b6b6b` | `#5f5b54` | 生成り背景になじむ暖色寄りの灰。コントラストも上がる（4.94 → 6.25:1） |
| `--danger: #e53935` | `#c62828` | `#e53935` は白地 4.23:1 で 4.5:1 未満 |
| ダークなし | 上の `@media` | OS のダークモードに追従 |

## 3. 寸法

- **文字**: 本文 1rem、補足 0.875rem。**0.8125rem（13px）未満は使わない**（13px は札・フッターだけ）。サイズは rem、見出しは `clamp()`。行間 1.6。
- **余白**: 4 の倍数（4/8/12/16/24/32/48px）。
- **角丸**: 6 / 10（入力・ボタン）/ 14（カード・パネル）/ 20（シート上端）/ 999（チップ・札）。
- **タップ領域**: 44×44 CSS px 以上。主操作ボタンは高さ 48〜52px。
- **グリッド**: `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))` のように `min(100%, …)` を入れ、320px・文字200%でも横スクロールを出さない。

## 4. 部品

| 部品 | ライト | 要点 |
|---|---|---|
| 主操作ボタン | `--accent` 地・`#1a1100` 字・`--accent-dark` 枠 | 1画面に1つ |
| 通常ボタン | `--surface` 地・`--control-border` 1.5〜2px 枠 | hover で枠を `--accent` |
| 選択中（チップ・トグル） | `--text` 地・`--surface` 字＋✓ | `aria-pressed` を正とし、CSS は属性セレクタで描く |
| 札（タグ） | `--accent-soft` 地・`--accent-ink` 字・13px 太字 | 情報の補足のみ。ハブには特長バッジを置かない（ハブの AGENTS.md） |
| 注意 | `--accent-soft` 地・`--accent` 枠・ⓘ | 誤りではない注意。赤を使わない |
| エラー | `--danger-soft` 地・`--danger` 字と 2px 枠・⚠ | `aria-invalid` と `aria-describedby` で関連付け |
| カード（一覧） | `--surface` 地・`--border` 1px 線・角丸 14・影なし | hover で枠と 1px のリングを `--accent` |

## 5. 確認方法

- コントラスト: Chrome DevTools の要素ピッカーと Lighthouse のユーザー補助を、ライトと `prefers-color-scheme: dark`（DevTools → Rendering）の両方で。
- 文字200%: ブラウザ拡大 200% と 320px 幅で `document.documentElement.scrollWidth <= innerWidth`。
- 色以外の手がかり: DevTools → Rendering → Emulate vision deficiencies → Achromatopsia で状態が判別できること。
- キーボード: Tab で全操作に届き、フォーカス枠が常に見えること。
