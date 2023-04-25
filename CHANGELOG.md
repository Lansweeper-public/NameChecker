## [1.3.3](https://github.com/Lansweeper-public/NameChecker/compare/v1.3.2...v1.3.3) (2023-04-25)


### :bug:

* fix dockerfile ([34c52e8](https://github.com/Lansweeper-public/NameChecker/commit/34c52e82c814604e1955644689870193af27b6fb))
* missing custom server dockerfile ([fda71e9](https://github.com/Lansweeper-public/NameChecker/commit/fda71e9df912ec12ac8121fe58b927bada226e24))
* missing tsconfig.server.json configuration file ([6b01680](https://github.com/Lansweeper-public/NameChecker/commit/6b01680910ddc97f22b462016522c04bca95b211))

## [1.3.2](https://github.com/Lansweeper-public/NameChecker/compare/v1.3.1...v1.3.2) (2023-04-25)


### :bug:

* improve dockerfile ([98e78ba](https://github.com/Lansweeper-public/NameChecker/commit/98e78bae4a10430a388052a6eb3ff13aab4f40b0))

## [1.3.1](https://github.com/Lansweeper-public/NameChecker/compare/v1.3.0...v1.3.1) (2023-04-25)


### :bug:

* change start dockerfile ([e6d0463](https://github.com/Lansweeper-public/NameChecker/commit/e6d0463b7407199f3bf4de61bc9bcbd5440592b5))

# [1.3.0](https://github.com/Lansweeper-public/NameChecker/compare/v1.2.0...v1.3.0) (2023-01-26)


### :bug:

* change dockerimage to bullseye slim without vulnerabilities ([5fdd8f5](https://github.com/Lansweeper-public/NameChecker/commit/5fdd8f5ab838db071fd61a300843cc43e438b733))
* change node base image ([110bd65](https://github.com/Lansweeper-public/NameChecker/commit/110bd6574836d6689a89576af75ce041208a56fd))

### :sparkles:

* upgrade to node 18 ([edf7ec3](https://github.com/Lansweeper-public/NameChecker/commit/edf7ec3f19f5605fef47e6207197ffdc7bbddf1c))

# [1.2.0](https://github.com/Lansweeper-public/NameChecker/compare/v1.1.3...v1.2.0) (2022-05-11)


### :bug:

* fix skip dirs folder trivy ([f02a6c5](https://github.com/Lansweeper-public/NameChecker/commit/f02a6c56ae6983ff74aa2beadf42c85d2f4b50eb))
* fixing vulnerabilities ([b935346](https://github.com/Lansweeper-public/NameChecker/commit/b9353467b97ef5080635918de9acd1ffdfbb1301))
* node modules should be ignored in trivy ([55cff58](https://github.com/Lansweeper-public/NameChecker/commit/55cff589f1ffd4b4b9a3e269290bd66e76679f4b))
* remove trivy ignore file ([d3f1bf8](https://github.com/Lansweeper-public/NameChecker/commit/d3f1bf8877f99278d37c13371f528542bcfabb34))
* remove trivyignore docker ([844b9de](https://github.com/Lansweeper-public/NameChecker/commit/844b9de90d3b255b706b6c5e6c125ce471cbb46c))

### :green_heart:

* add trivyignore file ([9ef073c](https://github.com/Lansweeper-public/NameChecker/commit/9ef073c07bc539b3d5c169c184f0ddc0fdbdc125))
* skip node modules folder in trivy ([4c25bf1](https://github.com/Lansweeper-public/NameChecker/commit/4c25bf1d012e372e1fad982c0c70a37fe2c69cae))

### :sparkles:

* transform regexp filter into lucene filters ([d94b31a](https://github.com/Lansweeper-public/NameChecker/commit/d94b31ae8bd8e1c381d3fc3aeeb435c197033d45))

## [1.1.3](https://github.com/Lansweeper-public/NameChecker/compare/v1.1.2...v1.1.3) (2022-03-31)


### :bug:

* change docker image upgrade npm packages ([d9169ad](https://github.com/Lansweeper-public/NameChecker/commit/d9169adecc1601498e89327c7d174b3c0666d349))
* reset filters when last tag removed ([6f909ca](https://github.com/Lansweeper-public/NameChecker/commit/6f909ca9c22acdfb3540042732499f6e21653b30))
* reset filters when last tag removed ([a520110](https://github.com/Lansweeper-public/NameChecker/commit/a5201104c8263132d8f9c6c9d327cb945f9e7caa))
* upgrade docker image ([47a7e42](https://github.com/Lansweeper-public/NameChecker/commit/47a7e42be39defad87c28843a184bcb07dcaf9df))
* upgrade namechecker image ([899b953](https://github.com/Lansweeper-public/NameChecker/commit/899b953ab8cd57bf1a736df46cdaea3755970270))

## [1.1.2](https://github.com/Lansweeper-public/NameChecker/compare/v1.1.1...v1.1.2) (2022-03-14)


### :bug:

* fixing filter behaviour ([3f234a3](https://github.com/Lansweeper-public/NameChecker/commit/3f234a34f3ee3184f9519e1a432a008a29a87855))
* limit numbers in filter ([aeeab1b](https://github.com/Lansweeper-public/NameChecker/commit/aeeab1b509670d2ea45a7d6019f56f78d0355024))
* new fix on filters ([e8af74f](https://github.com/Lansweeper-public/NameChecker/commit/e8af74f59bf6e87855fa35d140b09089b92c31ac))
* remove log ([61bec44](https://github.com/Lansweeper-public/NameChecker/commit/61bec446be912465adf010dbd0fe0c5684b4a9c5))

## [1.1.1](https://github.com/Lansweeper-public/NameChecker/compare/v1.1.0...v1.1.1) (2022-03-11)


### :bookmark:

* Release 1.1.1 [skip ci] ([26e46fc](https://github.com/Lansweeper-public/NameChecker/commit/26e46fce412b55915eda918264e3d28143412d9f))

### :bug:

* manage empty and number filters ([d437818](https://github.com/Lansweeper-public/NameChecker/commit/d437818fc7b24141c5d9306868c1a6283ef81329))
* wrong filter behaviour ([d123ae7](https://github.com/Lansweeper-public/NameChecker/commit/d123ae751407313890254ab48fbaa8fed26a7bc5))
* wrong filters behaviour ([c1ab2b9](https://github.com/Lansweeper-public/NameChecker/commit/c1ab2b9572117e1a5476691b0ca49bb146c44ada))

## [1.1.1](https://github.com/Lansweeper-public/NameChecker/compare/v1.1.0...v1.1.1) (2022-03-09)


### :bug:

* manage empty and number filters ([d437818](https://github.com/Lansweeper-public/NameChecker/commit/d437818fc7b24141c5d9306868c1a6283ef81329))

# [1.1.0](https://github.com/Lansweeper-public/NameChecker/compare/v1.0.4...v1.1.0) (2022-03-09)


### :bookmark:

* Release 1.1.0 [skip ci] ([a749a60](https://github.com/Lansweeper-public/NameChecker/commit/a749a6024d384b452998cb0653f7ec3e09cfc055))
* Release 1.1.0 [skip ci] ([fa17dc0](https://github.com/Lansweeper-public/NameChecker/commit/fa17dc05b18d51a6b28d24f12155d6994762699d))

### :bug:

* fix emojis semantic release ([121841a](https://github.com/Lansweeper-public/NameChecker/commit/121841ad7b24b888aaacf3dfb5df3495c8065fc7))
* fix release protected branch ([4cadd19](https://github.com/Lansweeper-public/NameChecker/commit/4cadd19320a91563b1c166859dc042b0b19b68bf))
* remove persist credentials ([7044da7](https://github.com/Lansweeper-public/NameChecker/commit/7044da78b45f9937caf40b8e7750f57643a6f252))
* test ([99e2497](https://github.com/Lansweeper-public/NameChecker/commit/99e2497107136840929a0f4b19ba0fb824998adc))

### :pencil:

* add image ([f45d08d](https://github.com/Lansweeper-public/NameChecker/commit/f45d08d804c6bdf876fdf2309bd03b9ca8babbdf))
* emoji bug ([7c808a1](https://github.com/Lansweeper-public/NameChecker/commit/7c808a13b2620ef6ea564401526038d63d4f3a4b))
* fix typo ([16186fb](https://github.com/Lansweeper-public/NameChecker/commit/16186fbcce300a29f0018a2d8c20b833802793de))
* improve readme ([e3efc35](https://github.com/Lansweeper-public/NameChecker/commit/e3efc3535f113a25a8bd23983c2ab9ea6196efab))
* readme fixes ([8f2e43d](https://github.com/Lansweeper-public/NameChecker/commit/8f2e43d80eb83375e979a84c0edc8c19763048b5))
* reduce image size ([cd5fa64](https://github.com/Lansweeper-public/NameChecker/commit/cd5fa645cc353b91a5a6a04e097fbb74e15c7ec3))
* replace links ([828bc9a](https://github.com/Lansweeper-public/NameChecker/commit/828bc9ad5bf5ece7398c25bf6d430470d88987b6))

### :sparkles:

* protect branch ([02e02c6](https://github.com/Lansweeper-public/NameChecker/commit/02e02c6d73b5492263dea9da84f240f174e13995))

# [1.1.0](https://github.com/Lansweeper-public/NameChecker/compare/v1.0.4...v1.1.0) (2022-03-09)

### :bookmark:

- Release 1.1.0 [skip ci] ([fa17dc0](https://github.com/Lansweeper-public/NameChecker/commit/fa17dc05b18d51a6b28d24f12155d6994762699d))

### :bug:

- fix emojis semantic release ([121841a](https://github.com/Lansweeper-public/NameChecker/commit/121841ad7b24b888aaacf3dfb5df3495c8065fc7))
- test ([99e2497](https://github.com/Lansweeper-public/NameChecker/commit/99e2497107136840929a0f4b19ba0fb824998adc))

### :pencil:

- add image ([f45d08d](https://github.com/Lansweeper-public/NameChecker/commit/f45d08d804c6bdf876fdf2309bd03b9ca8babbdf))
- emoji bug ([7c808a1](https://github.com/Lansweeper-public/NameChecker/commit/7c808a13b2620ef6ea564401526038d63d4f3a4b))
- fix typo ([16186fb](https://github.com/Lansweeper-public/NameChecker/commit/16186fbcce300a29f0018a2d8c20b833802793de))
- improve readme ([e3efc35](https://github.com/Lansweeper-public/NameChecker/commit/e3efc3535f113a25a8bd23983c2ab9ea6196efab))
- readme fixes ([8f2e43d](https://github.com/Lansweeper-public/NameChecker/commit/8f2e43d80eb83375e979a84c0edc8c19763048b5))
- reduce image size ([cd5fa64](https://github.com/Lansweeper-public/NameChecker/commit/cd5fa645cc353b91a5a6a04e097fbb74e15c7ec3))
- replace links ([828bc9a](https://github.com/Lansweeper-public/NameChecker/commit/828bc9ad5bf5ece7398c25bf6d430470d88987b6))

### :sparkles:

- protect branch ([02e02c6](https://github.com/Lansweeper-public/NameChecker/commit/02e02c6d73b5492263dea9da84f240f174e13995))

# [1.1.0](https://github.com/Lansweeper-public/NameChecker/compare/v1.0.4...v1.1.0) (2022-03-09)

### :bug:

- fix emojis semantic release ([121841a](https://github.com/Lansweeper-public/NameChecker/commit/121841ad7b24b888aaacf3dfb5df3495c8065fc7))
- test ([99e2497](https://github.com/Lansweeper-public/NameChecker/commit/99e2497107136840929a0f4b19ba0fb824998adc))

### :pencil:

- add image ([f45d08d](https://github.com/Lansweeper-public/NameChecker/commit/f45d08d804c6bdf876fdf2309bd03b9ca8babbdf))
- emoji bug ([7c808a1](https://github.com/Lansweeper-public/NameChecker/commit/7c808a13b2620ef6ea564401526038d63d4f3a4b))
- fix typo ([16186fb](https://github.com/Lansweeper-public/NameChecker/commit/16186fbcce300a29f0018a2d8c20b833802793de))
- improve readme ([e3efc35](https://github.com/Lansweeper-public/NameChecker/commit/e3efc3535f113a25a8bd23983c2ab9ea6196efab))
- readme fixes ([8f2e43d](https://github.com/Lansweeper-public/NameChecker/commit/8f2e43d80eb83375e979a84c0edc8c19763048b5))
- reduce image size ([cd5fa64](https://github.com/Lansweeper-public/NameChecker/commit/cd5fa645cc353b91a5a6a04e097fbb74e15c7ec3))
- replace links ([828bc9a](https://github.com/Lansweeper-public/NameChecker/commit/828bc9ad5bf5ece7398c25bf6d430470d88987b6))

### :sparkles:

- protect branch ([02e02c6](https://github.com/Lansweeper-public/NameChecker/commit/02e02c6d73b5492263dea9da84f240f174e13995))

## [1.0.4](https://github.com/Lansweeper-public/NameChecker/compare/v1.0.3...v1.0.4) (2022-03-08)

### :bug:

- fixing lint issues ([b2e5c80](https://github.com/Lansweeper-public/NameChecker/commit/b2e5c80417b5114cc11888cae757f7d04f97da07))
- fixing tooltip styles ([6b1db51](https://github.com/Lansweeper-public/NameChecker/commit/6b1db512e9352821e92fe44de3b5abf34e0034f3))

### :green_heart:

- fix lint issues ([6d4cea2](https://github.com/Lansweeper-public/NameChecker/commit/6d4cea2481ff8e1ae840b26dabf88b2a326239ad))
- fix lint issues ([c0103ce](https://github.com/Lansweeper-public/NameChecker/commit/c0103ced445133653092b3ac8513fe7f21b8db90))

## [1.0.3](https://github.com/Lansweeper-public/NameChecker/compare/v1.0.2...v1.0.3) (2022-03-07)

### :bug:

- another approach launch cypress ([6733528](https://github.com/Lansweeper-public/NameChecker/commit/673352804a6ba5c4df23e13010c7562b69858efc))
- cypress env vars ([e315d54](https://github.com/Lansweeper-public/NameChecker/commit/e315d54fe44ecff592d15ece3b9f5135c476145c))
- missing action version ([40c9f5a](https://github.com/Lansweeper-public/NameChecker/commit/40c9f5ac1cb0f8c5de35c3482831cdbd3690ab03))
- missing secret ([f303b8e](https://github.com/Lansweeper-public/NameChecker/commit/f303b8ed43ce249f4d031cc81deac262b433d7c4))
- remove one server start ([366c884](https://github.com/Lansweeper-public/NameChecker/commit/366c884f07d8d5b74f13e8587736fe81b2b00f18))
- wrong place env ([c95a463](https://github.com/Lansweeper-public/NameChecker/commit/c95a463ac6ed5b7122da40ff243062e63d3c99bd))
- yaml syntax error ([3b6e80d](https://github.com/Lansweeper-public/NameChecker/commit/3b6e80d5574e83b0616c69d69c89a2a0a31ef47d))

### :recycle:

- new way execute cypress ([3c559d2](https://github.com/Lansweeper-public/NameChecker/commit/3c559d2c3bf93d5bf2b97b3d52a2c611ee44bb92))

## [1.0.2](https://github.com/Lansweeper-public/NameChecker/compare/v1.0.1...v1.0.2) (2022-03-07)

### :bug:

- dockerimage ([0c94b4d](https://github.com/Lansweeper-public/NameChecker/commit/0c94b4d7200f633487f2d1a41d4af61e6cf615e5))

## [1.0.1](https://github.com/Lansweeper-public/NameChecker/compare/v1.0.0...v1.0.1) (2022-03-07)

### :bug:

- adapt nextjs start ([db93f22](https://github.com/Lansweeper-public/NameChecker/commit/db93f221ddd9b4ae5f570b3462b66e7d2280d42a))

# 1.0.0 (2022-03-07)

### :bug:

- define branches release ([03ee714](https://github.com/Lansweeper-public/NameChecker/commit/03ee714d308dc5139dd8637d9c25fbc1609cd9e3))
- duplicate select property ([d125d13](https://github.com/Lansweeper-public/NameChecker/commit/d125d1388808c69c51c0c7eecdea0191d8e21ee2))
- fix border color ([218ae23](https://github.com/Lansweeper-public/NameChecker/commit/218ae23c09ffd89f16fe105ed1de938e5b7f28e4))
- fix vulnerabilities ([123942d](https://github.com/Lansweeper-public/NameChecker/commit/123942db6e5a2c4133c60bf73e12c13ece420f0f))
- fix vulnerability node-fetch ([a7c8c3c](https://github.com/Lansweeper-public/NameChecker/commit/a7c8c3cee0a90f497b38e5e81bedfe9db2b87dfc))
- fixing on main action ([d105608](https://github.com/Lansweeper-public/NameChecker/commit/d105608ca2c43da550c07f657311be3a5a6ed78f))
- fixing overflow dropdown filters ([6be1d6f](https://github.com/Lansweeper-public/NameChecker/commit/6be1d6fbe193816c193d83f2fb463371e5363074))
- fixing select styles ([9dea25e](https://github.com/Lansweeper-public/NameChecker/commit/9dea25e623e0e0251451187931bd95a071a5e5ec))
- missing humanize component and wrong styles ([6dff878](https://github.com/Lansweeper-public/NameChecker/commit/6dff87861c5828e1ebafb316f0918b1d83a4df2c))
- remove main ([699f560](https://github.com/Lansweeper-public/NameChecker/commit/699f5603f5c6b3a86433dafdc488b09b36c0d27a))
- remove private dependencies ([5155d87](https://github.com/Lansweeper-public/NameChecker/commit/5155d87c31030d35cb2db44a12c45a9cceeffea4))
- required github token ([d422056](https://github.com/Lansweeper-public/NameChecker/commit/d422056d4ff055ff98645da7754ee3028107b67d))
- unify set version variable ([0ffc7f0](https://github.com/Lansweeper-public/NameChecker/commit/0ffc7f0664b22f7792c72f9c6703f0fa29e9a00d))
- upgrade antd ([b479fa2](https://github.com/Lansweeper-public/NameChecker/commit/b479fa2f913180d5c814b30f7336f5384de20569))
- use jq action ([467e5f3](https://github.com/Lansweeper-public/NameChecker/commit/467e5f345fd8c69b5fc188b769eba521904418c9))
- wrong behaviour filters ([80cdecb](https://github.com/Lansweeper-public/NameChecker/commit/80cdecbd20677234b853a44d3c510d00b2a021c9))
- wrong repository package json ([9813f22](https://github.com/Lansweeper-public/NameChecker/commit/9813f2246ecfb574965a1de4c4b479e832fa4e81))

### :construction_worker:

- Add main workflow ([da3ed93](https://github.com/Lansweeper-public/NameChecker/commit/da3ed93abf8e9510439d3267f51eee14419cbc65))
- change docker build tag ([0680529](https://github.com/Lansweeper-public/NameChecker/commit/06805297f005d87feeb076c4cb359c2f9fae726e))

### :construction:

- initial commit workflows ([398dddc](https://github.com/Lansweeper-public/NameChecker/commit/398dddce882434c1cf4c4bf6ed4aa4d4edeb2fa5))

### :fire:

- Delete .npmrc as NPM_TOKEN is not used anymore ([e385d68](https://github.com/Lansweeper-public/NameChecker/commit/e385d681b933d1d83593667fd5f29fe6dc65897e))
- Remove dist reference in docker ([908f9a1](https://github.com/Lansweeper-public/NameChecker/commit/908f9a1c6a191706ef4b7030551b80d8e38b5fb4))

### :green_heart:

- Fix DockerFile ([20f2170](https://github.com/Lansweeper-public/NameChecker/commit/20f217063231c31d68fb56a55982e2dd809add7e))
- Fix DockerFile again ([8e1701c](https://github.com/Lansweeper-public/NameChecker/commit/8e1701ce904e3e93c2656e88f9280e50b198e981))

### :lock:

- Use trivy github action ([4c526f4](https://github.com/Lansweeper-public/NameChecker/commit/4c526f4776cd64b2477b2c139e6c7fcba10e8f8f))

### :recycle:

- avoid dependencies front components ([3c543eb](https://github.com/Lansweeper-public/NameChecker/commit/3c543ebc07dc5b7ae1d9c58a3463ac5d453c4ed7))
- branch naming not needed in public namechecker ([0892040](https://github.com/Lansweeper-public/NameChecker/commit/08920405b7dc080b3ef7a407f2f2d3bbfafb0a55))
- improve project structure ([f375d6c](https://github.com/Lansweeper-public/NameChecker/commit/f375d6c54b36795ac908bf4073a39c36c7da8ace))
- migrate all components ([0aa0281](https://github.com/Lansweeper-public/NameChecker/commit/0aa0281ee6e0f5dc0f5bd56239cdb619f6a082e7))
- migrate more components ([73941b1](https://github.com/Lansweeper-public/NameChecker/commit/73941b1e11df6b1d386d998ecf83006bf7fec37c))
- Reestructure a bit Dockerfile ([4d604e3](https://github.com/Lansweeper-public/NameChecker/commit/4d604e3dc20c581674c88de8c0ddb0bb1e63d659))
- remove semantic release dependency ([89a873b](https://github.com/Lansweeper-public/NameChecker/commit/89a873bc7ccf4431905843ef6b4a1106ac2a5e97))
- removed unecessary api requests ([d1deb87](https://github.com/Lansweeper-public/NameChecker/commit/d1deb870eef2d788455dc44adf0cd7630919a3a6))
- unused cookies ([62d263f](https://github.com/Lansweeper-public/NameChecker/commit/62d263f85ef42d79fa4fe0dbbfbb044a4ecd14a2))
- unused parameters and vars ([8ead032](https://github.com/Lansweeper-public/NameChecker/commit/8ead032d0e6b2db34ed9987b5bf6b0c5f4c558e3))

### :rocket:

- add pr gh action ([26fb7de](https://github.com/Lansweeper-public/NameChecker/commit/26fb7de48cfa5d6b752cce06cf9183041187f967))
- initial code migration ([e185460](https://github.com/Lansweeper-public/NameChecker/commit/e185460160b17e4e95c2b0f2b88b7e7b8de173f6))
- remove wrong with parameters gh action ([e31d469](https://github.com/Lansweeper-public/NameChecker/commit/e31d469abf4cb9740edf7d84027f7788987afce4))
- unify release config ([bae47c9](https://github.com/Lansweeper-public/NameChecker/commit/bae47c9cf75139beebc0afaf7e14865e4f9e54dc))
- upgrade main github action ([8b1aa6c](https://github.com/Lansweeper-public/NameChecker/commit/8b1aa6cc45046783f46a00c577f3b1b7f43a2d4d))

### :see_no_evil:

- Ignore hadolint rules ([0ffe144](https://github.com/Lansweeper-public/NameChecker/commit/0ffe1446b988750789c163cbce28cfbfbf47cbec))

### :whale:

- Fix hadlint ([fb76c3c](https://github.com/Lansweeper-public/NameChecker/commit/fb76c3cdf0de84b293d86c8f96c1584c28596bca))
- Remove production flag from yarn install ([f8a5c9f](https://github.com/Lansweeper-public/NameChecker/commit/f8a5c9f461c3d377ea3e0c2b11b879ba357f5867))
- Remove pure-lockfile flag from yarn install ([1fbed0b](https://github.com/Lansweeper-public/NameChecker/commit/1fbed0bdefb12a9e2cb8683a1aa85128e3b5379d))
