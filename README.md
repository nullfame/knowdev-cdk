# KnowDev CDK 🌩

## 📋 Usage

``` bash
npm install --save @knowdev/cdk
```

## 📖 Reference

### Constants 💬

#### Duration ⏲

``` javascript
const { DURATION } = require("@knowdev/cdk");

DURATION = {
  THIRTY_SECONDS,
  ONE_MINUTE,
  TWO_MINUTES,
  FIVE_MINUTES,
  TEN_MINUTES,
  FIFTEEN_MINUTES,
}
```

#### Tag 🔖

``` javascript
const { TAG } = require("@knowdev/cdk");

TAG = {
  ROLE: {
    API,
    COMMAND,
    META,
    PROCESSING,
    ORCHESTRATION,
    STORAGE,
    WEB,
  }
}
```

## 💻 Developing

Current style is CommonJS (not ES6).

The `hygen` code templating system should be used for most new code:

* `hygen fabric new` for generic top-level JavaScript
* `hygen fabric newsub` for generic JavaScript in subfolders
* `hygen fabric test` for generic top-level JavaScript tests
* `hygen fabric util` for utility functions

## 📝 Changelog

## 🛣 Roadmap

* 0.1.0: Minimum Viable Something
  * Template/Stack
  * Tagger
  * Constants
  * Lambda
  * Dynamo

### Wishlist 🌠

## 📜 License

All rights reserved. Safe for use around pets.
