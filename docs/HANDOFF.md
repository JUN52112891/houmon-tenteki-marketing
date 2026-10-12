# 引き継ぎメモ

Dr. concierge(訪問点滴)LPの作業状況まとめ(2026-10-12時点)。新しいセッション(Web版Claude Code含む)で作業を始めるときは、最初にこのファイルと `CLAUDE.md`、`lp-mobile-craft` スキル(プロジェクト横断の汎用スキル)を読むこと。完了した項目はこのファイルから削除・更新する。

## 1. 現在の状態

- リポジトリ: `JUN52112891/houmon-tenteki-marketing`、作業ブランチは`main`(院長がAI Studioで公開・確認している)
- LP本体: `src/App.tsx`(React/Vite/Tailwind v4構成)、スタイルは`src/index.css`
- ローカル確認: `npm run dev`(ポート3000が埋まっていることが多いので`-- --host 127.0.0.1 --port 3100`を使うことが多かった)。**`--host 0.0.0.0`は使わない**(サンドボックスでブロックされる)
- ブランド名は「Dr. concierge」「ドクターコンシェルジュ」に統一済み。正式名称「Dr. concierge by LIF SKIN CLINIC」はロゴ画像・フッターのみ
- ヘッダー: PC版は`position: sticky`で上部固定。スマホ版はヘッダーバー自体を非表示にし、右上に浮かせたハンバーガーメニューのみ表示
- ヒーロー(ファーストビュー): スマホ版は1枚絵の統合デザイン画像(`hero_mobile_full_v3.webp`、ロゴ・バッジ・見出し・価格カードまで全部入り)。PC版はテキスト+背景写真(`hero_scene_v3.webp`)の従来構成で別物
- 料金シミュレーターは`hidden`クラスで非表示化済み(機能・コードは温存、再表示したい場合は`src/App.tsx`内`{/* Pricing Calculator Bar */}`を検索)

## 2. 直近でやったこと(2026-10-11〜12)

- 文言・デザイン全般の初回整備(ブランド名統一、出張費→往診料表記統一、未承認医薬品の開示文など)
- セクション順の入れ替え(安全管理体制を価格オファーより前に)
- 各種画像の差し替え・バナー化・フルブリード対応
- スマホ版ヒーローの作り込み(統合画像化、ボタンを固定フッターバーと統一、花装飾のベール処理)
- ヘッダーのsticky化(実は`body`の`overflow-x: hidden`がstickyを壊すバグがあり修正済み)、スマホ版ヘッダー簡略化

## 3. 次にやること・未確定事項

- **FormSubmitのメール確認**: `src/App.tsx`の問い合わせフォームは`https://formsubmit.co/ajax/junusami1982@gmail.com`に送信する実装。本番公開後、初回送信時に届く確認メールを院長が承認する必要がある(未確認なら催促する)
- 23区外のエリア対応方針(CLAUDE.md「未確定事項」参照)
- 医療機関としての届出詳細(保健所への届出状況など)
- PC版ヘッダーの2段目ナビ(点滴という選択/使う時間の違い/メニュー・料金 等)は現状のまま。スマホ版はハンバーガー内に同じリンクがある
- `package-lock.json`は一度削除されている(Web版Claude Codeのコミットで削除)。依存関係はpackage.jsonのみで管理されている状態

## 4. 注意点(過去に起きたこと)

- **`body { overflow-x: hidden }` は `position: sticky` を壊す**。横スクロール対策は`html`側だけにすること(`src/index.css`参照)。
- **フルブリード画像の二重ラップに注意**。`-mx-6`を持つラッパーdivの中の`<img>`に重ねて`calc(100%+3rem)`を指定すると、画面幅を超えて右にずれるバグになる(実際に発生・修正済み)。ラップ構造を変えたら`getBoundingClientRect()`で左右端を確認する。
- **Windows PowerShellでnpmが実行できないことがある**(スクリプト実行ポリシー)。コマンドプロンプト(cmd)を使うか、`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`を案内する。
- **git運用**: 院長から「マージしよう」と明示されるまでmainに直接マージしない。作業は`feature/*`ブランチを切ってコミット→push、指示があったらmainにマージ→push。マージ前に`git fetch origin`で`origin/main`が進んでいないか必ず確認する(Web版セッションや院長自身が直接mainにコミットしていることがある)。

## 5. 参照先

- デザイン・検証の作法: `lp-mobile-craft` スキル(プロジェクト横断の汎用スキル。LP作業のたびに読み込む)
- ブランド情報・遵守事項・未確定事項: `CLAUDE.md`
