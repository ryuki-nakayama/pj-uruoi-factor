# shopify_v2_prestige
For Developing Shopify 2.0

## バージョン

| パッケージ | バージョン |
| ---------- | ---------- |
| NODE.js    | 16.13.2    |
| npm        | 8.1.2      |
| gulp       | 2.3.0      |

## インストール・各コマンド

### install dependencies
node_modulesのインストール
```bash
$ npm install
```
### development mode compile
メディアクエリをその場へコンパイル
```bash
$ gulp sass
```
### production mode compile
メディアクエリをファイル下部にまとめてコンパイル
```bash
$ npm run sass
```
### ★development mode
開発用 - watchでファイルの変更を監視
```bash
$ gulp
```
### create delivery file
納品用 - 納品前に実行
```bash
$ npm run build
```