var assert = require('assert');
var fs = require('fs');
var procrastinate = require('..');

describe('Procrastinate', function () {
  context('with an empty input', function () {
    it('returns an empty string', function () {
      assert.equal(procrastinate('mocha', ''), '');
    });
  });

  var fileOptions = { encoding: 'utf-8' };
  var input = fs.readFileSync('test/data/input.txt', fileOptions);

  context('with an input representing pending Mocha specs', function () {
    var output = fs.readFileSync('test/data/mocha_output.js', fileOptions);

    it('returns pending Mocha specs', function () {
      assert.equal(procrastinate('mocha', input), output);
    });
  });

  context('with an input representing pending RSpec specs', function () {
    var output = fs.readFileSync('test/data/rspec_output.rb', fileOptions);

    it('returns pending RSpec specs', function () {
      assert.equal(procrastinate('rspec', input), output);
    });
  });
});
