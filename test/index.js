/* eslint-env mocha */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var procrastinate = require('..');

describe('procrastinate()', function () {
  function getData (filename) {
    var file = path.join('test/data', filename);
    return fs.readFileSync(file, { encoding: 'utf-8' });
  }

  var input = getData('input.txt');

  it('returns pending Mocha specs', function () {
    assert.equal(procrastinate('mocha', input), getData('mocha_output.js'));
  });

  it('returns pending RSpec specs', function () {
    assert.equal(procrastinate('rspec', input), getData('rspec_output.rb'));
  });

  context('with an empty input', function () {
    it('returns an empty string', function () {
      assert.equal(procrastinate('mocha', ''), '');
    });
  });

  context('with an invalid formatter', function () {
    it('throws an Error', function () {
      assert.throws(function () {
        procrastinate('notathinglol', '');
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
