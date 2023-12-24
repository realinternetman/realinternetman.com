---
title: ConoHa VPS(Ubuntu16.04)+ApacheでLet’s Encryptの設定をした
date: 2018-01-11T13:46:52.000Z
tags:
  - ubuntu
  - ssl
slug: conoha-ubuntu-apache-lets-encrypt
---

リアルインターネットなどという大仰なブログ名を掲げておきながら、SSL に対応していないのはリアルじゃないと以前から感じていた。調べてみたところ、近年は[Let's Encrypt](https://letsencrypt.jp/)とかいうサービスを利用すれば無料で SSL 証明書を入手することができるらしい。早速導入することにした。

## 導入方法

ConoHa のサイトを見てみたら公式で Let's Encrypt のスタートアップスクリプトが配布されていたけど、動作確認表に CentOS しか載っていなかったので、大人しく手動で設定することにした。

まずは必要なパッケージをインストールする。

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-apache
```

次に以下のコマンドを叩く。

```bash
sudo certbot --apache
```

あとは表示に従って設定していけば、あっという間に HTTPS が適用される。

（参考: [https://certbot.eff.org/#ubuntuxenial-apache](https://certbot.eff.org/#ubuntuxenial-apache)）

## エラー対処

…はずだったのだが、最後に無慈悲なエラーメッセージが表示され、失敗の結果に終わってしまった。

> Client does not support any combination of challenges that will satisfy the CA

エラーメッセージで検索してみたものの、完全一致する結果はほぼ無い状況。しかし、[似たようなエラーメッセージへの対処法](https://community.letsencrypt.org/t/solution-client-with-the-currently-selected-authenticator-does-not-support-any-combination-of-challenges-that-will-satisfy-the-ca/49983)であれば引っかかったので、ひとまず試してみることに。

```bash
sudo certbot --authenticator webroot --webroot-path {ドキュメントルートのパス} --installer apache -d {ドメイン名};
```

祝福のメッセージが表示された。無事 SSL 証明書の取得に成功した模様。

> Congratulations! You have successfully enabled https://realinternetman.com

## 自動更新の設定

証明書は 3 ヶ月で期限切れになるようなので、定期的に更新する必要があるっぽい。最後に cron の設定をして、月 1 で更新コマンドを投げさせるようにした。

```bash
sudo touch /etc/cron.d/letsencrypt
```

上記ファイルを編集し、毎月 1 日の 4:00 に certbot renew を実行させるようにした。cron 使うの初めてなので、本当にこれで動いてくれるかは謎。

`00 4 1 * * root certbot renew`

## 結果

![SSL](/assets/2018-01-11_ssl.png)

これでこのブログもまた一歩、リアルなインターネットに近づいた。

余談だが、以上の設定を施したにもかかわらず、何故か最初は Google Chrome のアドレスバーに「保護された通信」の文言が表示されなかった。原因を調べてみたところ、以前貼った楽天のアフィリエイトリンクが https 非対応なせいであることが判明。別サービス経由でリンクを貼り直すことで無事対応できた。

楽天ダサいな〜と思ったけど、今月は楽天カードローンで金を借りたばかりだったので、全てを水に流すことにした。
