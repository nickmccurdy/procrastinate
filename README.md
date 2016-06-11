# Procrastinate
[![NPM Version](http://img.shields.io/npm/v/procrastinate.svg?style=flat)](https://www.npmjs.org/package/procrastinate)
[![Build Status](https://travis-ci.org/nicolasmccurdy/procrastinate.svg?branch=master)](https://travis-ci.org/nicolasmccurdy/procrastinate)
[![Dependency Status](https://gemnasium.com/nicolasmccurdy/procrastinate.svg)](https://gemnasium.com/nicolasmccurdy/procrastinate)
[![Code Climate](https://codeclimate.com/github/nicolasmccurdy/procrastinate/badges/gpa.svg)](https://codeclimate.com/github/nicolasmccurdy/procrastinate)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Quickly create pending specs for your favorite test frameworks.

## Example

### Input
70 characters of the Procrastinate DSL
```
Array
  #indexOf()
    should return -1 when the value is not present
```

### Output
139 characters of pending Mocha specs
```javascript
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present');
  });
});
```
