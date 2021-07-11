# KnowDev CDK 🌩

## 📋 Usage

``` bash
npm install --save @knowdev/cdk
```

## 📖 Reference

### Helpers 📚

#### Tagger

``` javascript
const { tagger } = require("@knowdev/cdk");

// Manually add tag (does not call addMeta)
tagger.tag(resource, key, value);

// Automatic meta
//   account: process.env.PROJECT_ACCOUNT
//   env: process.env.PROJECT_ENV
//   project: process.env.PROJECT_PROJECT
tagger.addMeta(resource);

// Convenience for role (calls addMeta)
tagger.role.api(resource);
```

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

## 💻 Developing

Current style is CommonJS (not ES6).

The `hygen` code templating system should be used for most new code:

* `hygen fabric new` for generic top-level JavaScript
* `hygen fabric newsub` for generic JavaScript in subfolders
* `hygen fabric test` for generic top-level JavaScript tests
* `hygen fabric util` for utility functions

## 📝 Changelog

N/A

## 🛣 Roadmap

* 0.1.0: Minimum Viable Something
  * 🔲 Template/Stack
  * ☑️ Tagger
  * ☑️ Constants
  * 🔲 Lambda
  * 🔲 Dynamo

### Wishlist 🌠

N/A

## 📜 License

All rights reserved. Safe for use around pets.
