var assert = require('assert');
var fs = require('fs');
var procrastinate = require('..');

describe('Procrastinate', function () {
  context('with an empty input', function () {
    it('returns an empty string', function () {
      assert.equal(procrastinate(''), '');
    });
  });

  context('with an input representing pending Mocha specs', function () {
    var fileOptions = { encoding: 'utf-8' };
    var input  = fs.readFileSync('test/data/input.txt', fileOptions);
    var output = fs.readFileSync('test/data/output.js', fileOptions);

    it('returns pending Mocha specs', function () {
      assert.equal(procrastinate(input), output);
    });
  });
});
