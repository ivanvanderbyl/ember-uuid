# ember-uuid

[![Build Status](https://travis-ci.org/ivanvanderbyl/ember-uuid.svg?branch=master)](https://travis-ci.org/ivanvanderbyl/ember-uuid)

A simple addon for generating v1 and v4 UUIDs in your Ember app. Uses `window.crypto` if available.

## Installation

* `ember install ember-uuid`

## Usage

```js
import { v1, v4 } from "ember-uuid";

// Generate a v1 (time-based) id
v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
```

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
