# 相続リスク診断デモページ

会計事務所向け提案のデモとして、Web上のチェックコンテンツで点数を出し、危機感を演出しつつ自然に相談導線へ繋げる1ページ完結のSPAです。

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React 18**

## セットアップ

### WSL環境での実行について

このプロジェクトはWSL環境で実行する場合、**WSL内のターミナルから実行**する必要があります。

WindowsのPowerShellから直接実行すると、Next.jsが`app`ディレクトリを認識できない場合があります。

### 1. WSLターミナルを開く

WSL内のターミナル（Ubuntuなど）を開き、プロジェクトディレクトリに移動します：

```bash
cd ~/projects/miokaikei_souzoku_chk
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

**注意**: WindowsのPowerShellから実行する場合は、以下のようにWSLコマンドを使用してください：

```powershell
wsl -d Ubuntu -e bash -c "cd ~/projects/miokaikei_souzoku_chk && npm run dev"
```

### 3. ビルド（本番用）

```bash
npm run build
npm start
```

## GitHub Pagesへのデプロイ

このプロジェクトはGitHub Pagesで公開できます。

### 前提条件

1. GitHubリポジトリを作成していること
2. リポジトリ名が `miokaikei_souzoku_chk` であること（異なる場合は設定を変更してください）

### デプロイ手順

#### 方法1: GitHub Actionsを使用（推奨）

1. **リポジトリをGitHubにプッシュ**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[ユーザー名]/miokaikei_souzoku_chk.git
git push -u origin main
```

2. **GitHub Pagesの設定**

   - GitHubリポジトリのページを開く
   - `Settings` → `Pages` に移動
   - `Source` で `GitHub Actions` を選択
   - これで、`main`ブランチにプッシュするたびに自動的にデプロイされます

3. **basePathの設定（リポジトリ名が異なる場合）**

   リポジトリ名が `miokaikei_souzoku_chk` 以外の場合は、以下のファイルを編集してください：

   - `.github/workflows/deploy.yml` の `BASE_PATH` を変更
   - `package.json` の `build:gh-pages` スクリプトの `BASE_PATH` を変更

   例：リポジトリ名が `my-repo` の場合
   ```json
   "build:gh-pages": "BASE_PATH=/my-repo next build"
   ```

#### 方法2: 手動デプロイ

1. **静的ファイルをビルド**

```bash
npm run build:gh-pages
```

2. **`out` ディレクトリの内容をデプロイ**

   - `out` ディレクトリの内容をGitHub Pagesの公開ディレクトリにコピー
   - または、`gh-pages` ブランチにプッシュ

### アクセスURL

デプロイ後、以下のURLでアクセスできます：

```
https://[ユーザー名].github.io/miokaikei_souzoku_chk/
```

**注意**: ルートドメイン（`https://[ユーザー名].github.io/`）で公開する場合は、`next.config.js` の `basePath` を空文字または削除してください。

## プロジェクト構成

```
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # メインページ
│   └── globals.css         # グローバルスタイル
├── components/
│   ├── Hero.tsx            # ヒーローセクション
│   ├── CheckForm.tsx       # 診断フォーム
│   ├── Result.tsx          # 結果表示
│   ├── FAQ.tsx             # FAQセクション
│   ├── Footer.tsx          # フッター
│   └── ConsultationModal.tsx # 相談モーダル
└── data/
    ├── questions.json      # チェック項目（20問）
    ├── results.json        # 結果メッセージ・リスクレベル定義
    ├── faq.json           # FAQデータ
    └── office.json        # 事務所情報
```

## カスタマイズ方法

### チェック項目の編集

`data/questions.json` を編集してください。

```json
[
  {
    "id": 1,
    "text": "質問文をここに記述"
  }
]
```

### 結果メッセージの編集

`data/results.json` を編集してください。スコア範囲、メッセージ、おすすめ項目を変更できます。

### FAQの編集

`data/faq.json` を編集してください。

### 事務所情報の編集

`data/office.json` を編集してください。

### カラーの変更

`tailwind.config.ts` の `colors` セクションを編集してください。

- アクセントカラー: `accent: '#E09A00'`
- テキストカラー: `text: '#222222'`

## 動作確認手順（E2E風）

1. **初期表示確認**
   - ページを開くと「相続リスク診断」のタイトルと説明が表示される
   - 20個のチェック項目が表示される
   - 進捗バーが0%であることを確認

2. **チェック機能確認**
   - いくつかのチェック項目を選択
   - 進捗バーが更新されることを確認
   - 「回答数 / 20」が更新されることを確認

3. **診断実行確認**
   - チェック項目を選択せずに「診断する」をクリック
   - 確認ダイアログが表示されることを確認
   - いくつか選択してから「診断する」をクリック
   - 結果画面が表示されることを確認

4. **結果表示確認**
   - スコア（選択数×5点）が正しく表示されることを確認
   - リスクレベル（低/中/高）が正しく表示されることを確認
   - リスクレベルに応じた色分けがされていることを確認
   - 結果メッセージが表示されることを確認
   - 「おすすめの次の一手」が3つ表示されることを確認

5. **相談導線確認**
   - 「無料で相談する」ボタンをクリック
   - モーダルが表示されることを確認
   - フォームに情報を入力
   - 「送信する」をクリック
   - 「送信しました（ダミー）」のトーストが表示されることを確認
   - モーダルが閉じることを確認

6. **リセット機能確認**
   - 「診断をやり直す」をクリック
   - 診断フォームに戻ることを確認
   - 選択がリセットされていることを確認

7. **FAQ確認**
   - 結果画面でFAQセクションが表示されることを確認
   - 4つの質問と回答が表示されることを確認

8. **レスポンシブ確認**
   - ブラウザの幅を変更してスマホサイズに
   - レイアウトが適切に調整されることを確認
   - モーダルが適切に表示されることを確認

## スコア計算ロジック

- 1チェック項目 = 5点
- 最大スコア = 100点（20項目すべて選択時）

### リスクレベル

- **低リスク**: 0〜20点（グレー）
- **中リスク**: 25〜55点（山吹色 #E09A00）
- **高リスク**: 60〜100点（赤）

## ライセンス

このプロジェクトはデモ用途です。
