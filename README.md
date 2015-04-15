# Procrastinate
[![Build Status](https://travis-ci.org/nicolasmccurdy/procrastinate.svg?branch=master)](https://travis-ci.org/nicolasmccurdy/procrastinate)

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
