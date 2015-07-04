var assert = require('assert');
var fs = require('fs');
var procrastinate = require('..');

describe('procrastinate.convert()', function () {
  context('with an empty input', function () {
    it('returns an empty string', function () {
      assert.equal(procrastinate.convert('mocha', ''), '');
    });
  });

  var fileOptions = { encoding: 'utf-8' };
  var input = fs.readFileSync('test/data/input.txt', fileOptions);

  context('with an input representing pending Mocha specs', function () {
    var output = fs.readFileSync('test/data/mocha_output.js', fileOptions);

    it('returns pending Mocha specs', function () {
      assert.equal(procrastinate.convert('mocha', input), output);
    });
  });

  context('with an input representing pending RSpec specs', function () {
    var output = fs.readFileSync('test/data/rspec_output.rb', fileOptions);

    it('returns pending RSpec specs', function () {
      assert.equal(procrastinate.convert('rspec', input), output);
    });
  });

  context('with an invalid formatter', function () {
    it('throws an Error', function () {
      assert.throws(function () {
        procrastinate.convert('notathinglol', '');
      }, Error);
    });
  });
});

describe('procrastinate.formatters', function () {
  it('is a list of Strings representing supported formatters', function () {
    assert(Array.isArray(procrastinate.formatters));

    procrastinate.formatters.forEach(function (formatter) {
      assert.equal(typeof formatter, 'string');
      assert(/^\w+$/.test(formatter));
    });
  });
});

describe('procrastinate.validateFormatter()', function () {
  context('with a valid formatter', function () {
    it('does nothing', function () {
      procrastinate.validateFormatter('mocha');
    });
  });

  context('with an invalid formatter', function () {
    it('throws an Error', function () {
      assert.throws(function () {
        procrastinate.validateFormatter('notathinglol');
      }, Error);
    });
  });
});
