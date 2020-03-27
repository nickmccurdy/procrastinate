# Procrastinate
[![NPM Version](http://img.shields.io/npm/v/procrastinate.svg?style=flat)](https://www.npmjs.org/package/procrastinate)
[![Build Status](https://travis-ci.org/nickmccurdy/procrastinate.svg?branch=master)](https://travis-ci.org/nickmccurdy/procrastinate)
[![Dependency Status](https://gemnasium.com/badges/github.com/nickmccurdy/procrastinate.svg)](https://gemnasium.com/github.com/nickmccurdy/procrastinate)
[![Code Climate](https://codeclimate.com/github/nickmccurdy/procrastinate/badges/gpa.svg)](https://codeclimate.com/github/nickmccurdy/procrastinate)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat)](https://github.com/Flet/semistandard)

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
144 characters of pending Jest specs
```javascript
describe('Array', function () {
  describe('#indexOf()', function () {
    it.todo('should return -1 when the value is not present');
  });
});
```
