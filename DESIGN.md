# edi-tool 共通デザイン

edi-tool の各ツール・ハブ（edi-tool.github.io）で共通にする見た目の正本。`PRINCIPLES.md` の「4. 画面」を具体化したもの。
各ツールは下の `:root` を自分の `styles.css`（または `<style>`）の先頭に写し、ツール固有の値はその後ろに足す。
版: 2026-11-06（案C「ソフト面×蛍光オレンジ」を採用。生成りと淡オレンジの面をやめ、角丸・ボタン・アイコン・動作の決まりを追加）
前版: 2026-11-05（配色さんのデザイン指針づくりで共通部分を切り出した初版。根拠と画面案は edi-tool/color-palette の `docs/design-guidelines.md`）

## 1. 方針

- **白と薄灰の中立な UI、蛍光オレンジは一点**: 背景はごく薄い灰（`--bg`）、パネルは白（`--surface`）、文字は墨。`--accent`（`#ff6a00`）は主操作ボタンの塗り、ロゴ印、アイコンの地色、進み具合のバーだけに使う。
- **蛍光オレンジを文字・枠に使わない**: 白地で 2.87:1 しかないため。リンク・小さな強調・フォーカス枠は `--accent-ink`（`#c2410c`）を使う。
- **面は線と灰の差で分ける**: パネル・カードは 1px の線と `--bg` との明度差で区切る。影はシート・トースト・浮いたボタンに限る。ダークは面の明度差で重なりを示す。
- **淡オレンジを使わない**: `--accent-soft` は無彩の薄灰（`--surface-2` と同じ値）。選択中・hover・注意の地に使い、オレンジらしさは `--accent` の枠・アイコン・塗りだけで出す。
- **数字を主役にする**: 集計・計算の結果は大きく、太く（800）、等幅数字（`font-variant-numeric: tabular-nums`）で、字間を少し詰める（`letter-spacing: -0.04em`）。
- **状態は色だけで示さない**: 選択・固定・エラー・成功は、形（枠・塗り反転・点線）／文字／アイコンのうち2つ以上で表す。
- **外部フォントを使わない**: システムフォントのみ。

## 2. トークン

```css
:root {
  --bg: #f5f5f7;              /* ページの地（ごく薄い灰） */
  --surface: #fff;            /* パネル・カード・入力欄 */
  --surface-2: #f0f0f3;       /* 区切り線の内側・hover の地・札 */
  --border: #e5e5ea;          /* 装飾の区切り線。情報を持たせない */
  --control-border: #8a8a93;  /* 入力欄・通常ボタンの輪郭（白地 3.42:1・背景上 3.14:1） */
  --text: #0a0a0a;            /* 背景上 18.18:1 */
  --text-sub: #52525b;        /* 白地 7.73:1・背景上 7.10:1 */
  --accent: #ff6a00;          /* 塗りだけ。上に載せる文字は --on-accent（6.90:1） */
  --on-accent: #0a0a0a;
  --accent-soft: #f0f0f3;     /* 選択中・hover・注意の地（無彩。淡オレンジは使わない） */
  --accent-ink: #c2410c;      /* リンク・小さな強調（白地 5.18:1・背景上 4.76:1・薄灰上 4.55:1） */
  --accent-text: var(--accent-ink); /* 旧名。新規には使わない */
  --focus: #c2410c;
  --danger: #c62828;          /* 白地 5.62:1・背景上 5.16:1 */
  --danger-soft: #fdf0ef;
  --ok: #2e7d32;              /* 白地 5.13:1・背景上 4.71:1 */

  --radius-sm: 8px;           /* 上部バーの項目・小さな部品 */
  --radius-md: 12px;          /* 入力欄・ボタン・パネル内の小箱 */
  --radius-lg: 16px;          /* パネル・カード */
  --radius-xl: 24px;          /* シート上端・ダイアログ */
  --radius-full: 999px;       /* チップ・札・進み具合のバー */

  --ease: cubic-bezier(.2, .8, .2, 1);
  --dur-fast: 120ms;          /* hover・押下・フォーカス */
  --dur-base: 200ms;          /* 開閉・バーの伸縮・トースト */
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0b0b0c; --surface: #161618; --surface-2: #222225;
    --border: #2a2a2e; --control-border: #71717a;   /* 面上 3.74:1 */
    --text: #f4f4f5; --text-sub: #a1a1aa;            /* 面上 16.44:1／7.05:1 */
    --accent-soft: #222225;
    --accent-ink: #ff8a3d; --focus: #ff8a3d;         /* 面上 7.71:1 */
    --danger: #ff8a80; --danger-soft: #3a2120; --ok: #81c784;
  }
}
:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0ms !important; animation-duration: 0ms !important; }
}
```

`--accent` はダークでもそのまま使う（ダークの面上 6.29:1、上の文字は `--on-accent` のまま）。

`<head>` には `theme-color` を2つ置く:

```html
<meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b0b0c" media="(prefers-color-scheme: dark)">
```

### 旧トークンからの移行

| 旧 | 新 | 理由 |
|---|---|---|
| `--bg: #f8f6f2`（生成り） | `#f5f5f7`（無彩の薄灰） | 生成りと淡オレンジが重なり、全体が黄ばんで見えた |
| `--surface-2: #f1eee8` | `#f0f0f3` | 同上。面は無彩色にそろえる |
| `--border: #e0e0e0` | `#e5e5ea` | 薄灰の背景になじむ明るさ |
| `--control-border: #8c877e` | `#8a8a93` | 暖色寄りの灰をやめ、無彩色で 3:1 以上を保つ |
| `--accent: #f28c06`・`--accent-dark: #d97a00` | `--accent: #ff6a00`（`--accent-dark` は新規に使わない。既存ツールは互換のため `#e85f00` で残す） | 黄土寄りで沈んで見えた。hover は `filter: brightness(1.06)` で示す |
| `--accent-line: #ffd9a8`（ツール独自） | `#ffc79e`（ダーク `#5a3216`） | 新しい淡色に合わせる |
| 主ボタンの文字 `#1a1100` | `--on-accent: #0a0a0a` | 新しい塗りの上で 6.90:1 |
| `--accent-soft: #fff8f0` | `#f0f0f3`（ダーク `#222225`） | 淡オレンジの面が古く見えたため無彩に。選択中・注意は `--accent` の枠で示す |
| `--accent-ink: #9a5200`・`--accent-text: #b35f00` | `--accent-ink: #c2410c`（`--accent-text` は別名として残す） | 茶系が古く見えた。新しい背景上でも 4.5:1 以上 |
| `--focus: #9a5200` | `#c2410c` | 新しい背景上で 4.76:1（非文字の 3:1 以上） |
| `--text: #0f0f0f`・`--text-sub: #5f5b54` | `#0a0a0a`・`#52525b` | 無彩色にそろえ、コントラストも上がる（6.25 → 7.10:1） |
| ダーク `--bg: #1c1b19` ほか暖色寄り | 上の `@media` | 無彩の黒にそろえる |
| 角丸 6 / 10 / 14 / 20 | `--radius-*` の 8 / 12 / 16 / 24 | 下の「3. 寸法」 |
| ⚠・ⓘ・✓ などの文字記号 | 線のアイコン（下の「5. アイコン」） | 表示が環境で変わらないように |

## 3. 寸法

- **文字**: 本文 1rem、補足 0.875rem。**0.8125rem（13px）未満は使わない**（13px は札・フッターだけ）。サイズは rem、見出しは `clamp()`。行間 1.6（入力欄の本文は 1.85）。
- **余白**: 4 の倍数（4/8/12/16/20/24/32/48px）。
- **角丸**: `--radius-sm` 8（上部バーの項目）／`--radius-md` 12（入力欄・ボタン・パネル内の小箱）／`--radius-lg` 16（パネル・カード）／`--radius-xl` 24（シート上端・ダイアログ）／`--radius-full`（チップ・札・バー）。**入れ子は内側を小さくする**: 内側の角丸 = 外側の角丸 − 間の余白（例: 角丸 16・余白 8 のパネルに入れるボタンは 8〜12）。
- **タップ領域**: 44×44 CSS px 以上。主操作ボタンは高さ 48px。
- **グリッド**: `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))` のように `min(100%, …)` を入れ、320px・文字200%でも横スクロールを出さない。

## 4. 部品

| 部品 | ライト | 要点 |
|---|---|---|
| 上部バー | `--surface` 地・`--border` の下線・高さ 56px 前後 | 左に「ロゴ印＋edi-tool ＞ ツール名」、右に「ほかのツール」。項目は角丸 8・hover で `--surface-2` 地 |
| 主操作ボタン | `--accent` 地・`--on-accent` 字・枠なし・高さ 48 | 1画面に1つ。左にアイコン 18px（間 8px）。hover は `filter: brightness(1.06)` |
| 通常ボタン | `--surface` 地・`--control-border` 1px 枠・高さ 44〜48 | hover で地を `--surface-2`、枠を `--text` |
| アイコンだけのボタン | 透明地・44×44・角丸 12 | `aria-label` と `title` を必ず付ける。hover で `--surface-2` 地 |
| 押した瞬間 | すべてのボタン | `transform: scale(.98)` |
| 押した結果 | コピーなど | トーストを出さず、**ボタンの中で**アイコンと文字を「✓ コピーしました」に替え、1.5 秒で戻す。同じ文言を `role="status"` にも入れる |
| 入力欄 | `--surface` 地・`--control-border` 1px 枠・角丸 12・高さ 48 | hover で枠を `--text-sub`。フォーカスで枠を `--text`、外側に `0 0 0 3px` の `--accent` 35% のリング |
| 入力パネル（大きな入力欄） | 角丸 16 のパネルに入力欄を枠なしで入れる | 上の帯にラベルとアイコンボタン、下の帯に操作ボタンと字数。`:focus-within` でパネル全体にフォーカス表示 |
| 結果の数字 | 主数値 4rem・800・`-0.04em`、副数値 1.5rem | 副数値は 1px の線で区切った小箱（角丸 12）に並べる |
| 進み具合のバー | 高さ 8・`--surface-2` 地・`--accent` の塗り・角丸いっぱい | 超過したら `--danger` に替え、必ず文字（「12 字オーバー」）とアイコンを添える |
| 選択中（チップ・トグル） | `--text` 地・`--surface` 字＋✓アイコン | `aria-pressed` を正とし、CSS は属性セレクタで描く |
| 札（タグ） | `--surface-2` 地・`--text-sub` 字・13px 太字・角丸いっぱい | 情報の補足のみ。ハブには特長バッジを置かない（ハブの AGENTS.md） |
| 注意 | `--accent-soft` 地・`--accent` 1〜2px 枠・`--accent-ink` の字と情報アイコン | 誤りではない注意。赤を使わない |
| エラー | `--danger-soft` 地・`--danger` 字と 2px 枠・警告アイコン | `aria-invalid` と `aria-describedby` で関連付け |
| カード（一覧） | `--surface` 地・`--border` 1px 線・角丸 16・影なし | hover で枠と 1px のリングを `--text`、矢印を右へ 3px。アイコンの地は `--accent`（角丸 12・44px） |
| 開閉（`details`） | 角丸 16 のパネル | 既定の三角を消し、右端に下向きのシェブロン。開いたら 180° 回す |

## 5. アイコン

- **線のアイコン1系統だけ**: 24×24 の格子、線幅 1.75（主ボタン内とチェックは 2〜2.25）、`stroke-linecap` と `stroke-linejoin` は `round`、`fill="none"`、色は `currentColor`。各ツールで既に使っている線のアイコン（ハブの一覧と同じ形）にそろえる。
- **大きさ**: 16（補足文の頭）／18（ボタン内）／20（アイコンボタン・上部バー）／22〜24（カードの地の上）。
- **文字記号・絵文字を使わない**: ⚠・ⓘ・✓ などは SVG のアイコンに置き換える。
- **飾りのアイコンには `aria-hidden="true"`**。意味を持つアイコンだけのボタンは `aria-label` で名前を付ける。

## 6. 動作

- **速さを優先する**: 動きは操作の手応えのためだけに使い、結果の表示を待たせない。数字は入力のたびに即座に描き替え、増減のアニメーションはしない。
- **時間とイージング**: hover・押下・フォーカスは `--dur-fast`（120ms）、開閉・バーの伸縮・トーストは `--dur-base`（200ms）。イージングは `--ease`。
- **動かすのは `transform`・`opacity`・色だけ**: `width` を動かすのは進み具合のバーに限る。レイアウトがずれる動き（高さの伸縮、要素の押し出し）はしない。
- **`prefers-reduced-motion: reduce` では動きを止める**（上のトークンの `@media`）。
- **手応えはその場で返す**: 押した部品の中で結果を示す（「4. 部品」の「押した結果」）。画面の端に出るトーストは、保存・読み込みなど場所の離れた結果だけに使う。

## 7. 確認方法

- コントラスト: Chrome DevTools の要素ピッカーと Lighthouse のユーザー補助を、ライトと `prefers-color-scheme: dark`（DevTools → Rendering）の両方で。
- 文字200%: ブラウザ拡大 200% と 320px 幅で `document.documentElement.scrollWidth <= innerWidth`。
- 色以外の手がかり: DevTools → Rendering → Emulate vision deficiencies → Achromatopsia で状態が判別できること。
- キーボード: Tab で全操作に届き、フォーカス枠が常に見えること。
- 動作: DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce` で、動きが止まり操作は変わらないこと。
