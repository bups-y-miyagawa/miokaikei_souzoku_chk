/** @type {import('next').NextConfig} */
// GitHub Pages用のbasePath設定
// 環境変数BASE_PATHが設定されている場合はそれを使用、なければデフォルト値を使用
// 開発環境ではbasePathを空に、本番環境（ビルド時）のみbasePathを適用
const isDev = process.env.NODE_ENV !== 'production'
const basePath = isDev ? '' : (process.env.BASE_PATH || '/miokaikei_souzoku_chk')

const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages用の静的エクスポート設定
  output: 'export',
  // basePathを設定（CSSやJSファイルのパスが正しく解決される）
  basePath: basePath,
  // 画像最適化を無効化（静的エクスポートでは使用不可）
  images: {
    unoptimized: true,
  },
  // WSL環境でのパス解決を確実にする
  experimental: {
    // App Routerを明示的に有効化
  },
}

module.exports = nextConfig
