# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/juzraai/torn-losers-log/compare/v1.3.0...v1.4.0) (2021-04-18)


### Features

* now you can set price for losses and totals are calculated ([4f17184](https://github.com/juzraai/torn-losers-log/commit/4f1718475ee3777e9594de4ad4a40c484046b369))


### Bug Fixes

* made tabs fill the width on small screens ([8d7aa1e](https://github.com/juzraai/torn-losers-log/commit/8d7aa1e6747d76e5d61c8ff50682b1be955fb3bc))

## [1.3.0](https://github.com/juzraai/torn-losers-log/compare/v1.2.0...v1.3.0) (2021-04-15)


### Features

* added "Daily" tab where losses are aggregated by day, client and payment status ([ca3bbd5](https://github.com/juzraai/torn-losers-log/commit/ca3bbd5e4969e6e6340ecdebf3a61163fb86a623))


### Bug Fixes

* fixed chart to show last 30 days as intended ([772bd9b](https://github.com/juzraai/torn-losers-log/commit/772bd9bc636bd9b5157de94b89b9ff0dc512c2b8))
* fixed log tab buttons responsiveness ([7b253fd](https://github.com/juzraai/torn-losers-log/commit/7b253fd0f1346f07dd0254b0bff6bc845546befc))
* made storage saving more effective for better UX ([86363b1](https://github.com/juzraai/torn-losers-log/commit/86363b11413b03318c3eb8c1db90e2b136cac401))

## [1.2.0](https://github.com/juzraai/torn-losers-log/compare/v1.1.0...v1.2.0) (2021-04-07)


### Features

* added changelog view ([2af5b53](https://github.com/juzraai/torn-losers-log/commit/2af5b53ec438fbdbf6edef541e4153887b2928f5))
* added new version notification ([eb8bc3c](https://github.com/juzraai/torn-losers-log/commit/eb8bc3cd046a415b2f70c283850afe60ef6a9deb))
* losses to NPCs are now hidden from lists and stats ([dcc0811](https://github.com/juzraai/torn-losers-log/commit/dcc0811d12ff143c006a49d3a29c72971eda3d14))


### Bug Fixes

* added missing window title to import page ([727cdb9](https://github.com/juzraai/torn-losers-log/commit/727cdb920b7b3a25c9d0ea40628136d39a93fb3b))
* made initial player name label more intuitive ([7207c67](https://github.com/juzraai/torn-losers-log/commit/7207c678d0d79403651d25e64af26d13be99d7c6))

## [1.1.0](https://github.com/juzraai/torn-losers-log/compare/v1.0.2...v1.1.0) (2021-03-31)


### Features

* added export/import feature ([2c58b24](https://github.com/juzraai/torn-losers-log/commit/2c58b24dd34edac7a2f43c9f07d78a9023bb41f9))
* version in footer now links to changelog ([7a1bf48](https://github.com/juzraai/torn-losers-log/commit/7a1bf48c460e9fb76537cdd0cdbb4e219e86ab5f))


### Bug Fixes

* fixed paid button refresh on losses tab ([0bcd911](https://github.com/juzraai/torn-losers-log/commit/0bcd911b88c9607794867309f5b7937601cc0920))
* set same width for timestamp blocks in log entries ([2f636cc](https://github.com/juzraai/torn-losers-log/commit/2f636cc9ce54f1fe3cac40f2973221a22090e97d))

### [1.0.2](https://github.com/juzraai/torn-losers-log/compare/v1.0.1...v1.0.2) (2021-03-28)


### Bug Fixes

* fixed about link in navbar ([aceaae0](https://github.com/juzraai/torn-losers-log/commit/aceaae008feb013844beaa5f4207303040048d68))

### [1.0.1](https://github.com/juzraai/torn-losers-log/compare/v1.0.0...v1.0.1) (2021-03-28)


### Bug Fixes

* fixed handling empty array before first fetch ([48fedff](https://github.com/juzraai/torn-losers-log/commit/48fedffcf74792fcae51226355a209142d2c8e14))

## 1.0.0 (2021-03-28)


### Features

* added clear data function ([958a49a](https://github.com/juzraai/torn-losers-log/commit/958a49a38473a0398df920615c3a121893a2594e))
* added client view ([22aee7b](https://github.com/juzraai/torn-losers-log/commit/22aee7bf7c1035f767f1c8e66ae6051dbf71a051))
* added daily loss count chart to dashboard ([7f91146](https://github.com/juzraai/torn-losers-log/commit/7f91146b18ac71656acf0f10944b72fe4fc4b0da))
* added dashboard look & feel with 2 KPI widgets ([1f917a5](https://github.com/juzraai/torn-losers-log/commit/1f917a5f2dbdcfbf4b0b2b81e4fe20a42e92465b))
* added full readable timestamps ([af6c633](https://github.com/juzraai/torn-losers-log/commit/af6c6332c7daecbbf4fa25475b30759efc713149))
* added hide clients feature ([e1d61da](https://github.com/juzraai/torn-losers-log/commit/e1d61da97b97859a006e79e7eea706e75c421f9d))
* added limit settings to losses list ([644c530](https://github.com/juzraai/torn-losers-log/commit/644c53008d9406deb51b4d06c37087bb644b3a80))
* added loading effect (greyed, blurred, disabled) ([d473c1d](https://github.com/juzraai/torn-losers-log/commit/d473c1de2b541dc7094cb64f75e2c10f888ce15e))
* added login feature which fetches current player's ID and name ([d5c1dab](https://github.com/juzraai/torn-losers-log/commit/d5c1dab8642810850e8ac2649394088ad01cfcb8))
* added LZ-string compression to local storage ([8a57f8c](https://github.com/juzraai/torn-losers-log/commit/8a57f8c8fb1238e1cbf7035d8ebfcedd33bfa473))
* added mark as paid/unpaid button ([f3359e6](https://github.com/juzraai/torn-losers-log/commit/f3359e612f1e88a689a8d1ca56632ab44733b9ff))
* added marker for last items in lists ([6cbb53b](https://github.com/juzraai/torn-losers-log/commit/6cbb53b81e3354856d5cd206ed4d611c8e7fde67))
* added name resolving ([f2e3467](https://github.com/juzraai/torn-losers-log/commit/f2e34673f9ec1b1a6bb260c6cab959e3ffb710b2))
* added navbar with player menu ([dd33021](https://github.com/juzraai/torn-losers-log/commit/dd33021d39cb426387faa3ca2d1fb3ac3f220aa2))
* added pagination to losses list ([fd0c9ac](https://github.com/juzraai/torn-losers-log/commit/fd0c9ac4cf1dfe768e72c2ee9c77da413e7c34f6))
* added proof feature with attack log list ([f64dfc3](https://github.com/juzraai/torn-losers-log/commit/f64dfc32053cfd8d356d7efdb61c2844bf855df7))
* added refresh losses button with last update indicator ([8001fad](https://github.com/juzraai/torn-losers-log/commit/8001fade9d29c84586eb50ecc27ad190329cbd33))
* added saving selected tab index ([ddc1a18](https://github.com/juzraai/torn-losers-log/commit/ddc1a189dc768803a5ca919cfe8acdc2ed1f524c))
* added session view ([d631cef](https://github.com/juzraai/torn-losers-log/commit/d631cefeb98e23f4984ed7e8a03725cc69ad1699))
* added TCT clock ([5d7b0cc](https://github.com/juzraai/torn-losers-log/commit/5d7b0ccd494bda8a8850a96ea4298e9b8d8960fc))
* added unpaid clients tab ([dd912cc](https://github.com/juzraai/torn-losers-log/commit/dd912cc70bc9fd434f756c095ee52899ea1af872))
* implemented incremental update with cap of 5000 losses ([429b731](https://github.com/juzraai/torn-losers-log/commit/429b731dfc028add041f501da2bd0c01ce996554))
* save/load API key from/to local storage ([e312377](https://github.com/juzraai/torn-losers-log/commit/e312377197d3d04129a69b4aa657a82e89f345d8))
