var assert = require('assert');
var fs = require('fs');
var procrastinate = require('..');

describe('procrastinate', function () {
  describe('.convert()', function () {
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

  describe('.format()', function () {
    context('with an invalid formatter', function () {
      it('throws an Error');
    });

    context('with a line of type "suite"', function () {
      context('with no indents or text', function () {
        it('returns null');
      });

      context('with no indents', function () {
        it('returns the start of a suite');
      });

      context('with one indent', function () {
        it('returns the start of a suite with one indent');
      });

      context('with two indents', function () {
        it('returns the start of a suite with two indents');
      });
    });

    context('with a line of type "test"', function () {
      context('with no indents or text', function () {
        it('returns null');
      });

      context('with no indents', function () {
        it('returns the start of a test');
      });

      context('with one indent', function () {
        it('returns the start of a test with one indent');
      });

      context('with two indents', function () {
        it('returns the start of a test with two indents');
      });
    });

    context('with a line of type "end"', function () {
      context('with no indents', function () {
        it('returns the end of a suite or test');
      });

      context('with one indent', function () {
        it('returns the end of a suite or test with one indent');
      });

      context('with two indents', function () {
        it('returns the end of a suite or test with two indents');
      });
    });
  });

  describe('.formatters', function () {
    it('is a list of Strings representing supported formatters', function () {
      assert(Array.isArray(procrastinate.formatters));

      procrastinate.formatters.forEach(function (formatter) {
        assert.equal(typeof formatter, 'string');
        assert(/^\w+$/.test(formatter));
      });
    });
  });

  describe('.getIndentLength()', function () {
    context('given an empty line', function () {
      it('returns 0', function () {
        assert.equal(procrastinate.getIndentLength(''), 0);
      });
    });

    context('given a line with no indents', function () {
      it('returns 0', function () {
        assert.equal(procrastinate.getIndentLength('example'), 0);
      });
    });

    context('given a line with one indent', function () {
      it('returns 1', function () {
        assert.equal(procrastinate.getIndentLength('  example'), 1);
      });
    });

    context('given a line with two indents', function () {
      it('returns 2', function () {
        assert.equal(procrastinate.getIndentLength('    example'), 2);
      });
    });
  });

  describe('.unindent()', function () {
    context('given an empty line', function () {
      it('returns an empty String', function () {
        assert.equal(procrastinate.unindent(''), '');
      });
    });

    context('given a line with no indents', function () {
      it('returns the same line', function () {
        assert.equal(procrastinate.unindent('example'), 'example');
      });
    });

    context('given a line with one indent', function () {
      it('returns the same line with no indents', function () {
        assert.equal(procrastinate.unindent('  example'), 'example');
      });
    });

    context('given a line with two indents', function () {
      it('returns the same line with only one indent', function () {
        assert.equal(procrastinate.unindent('    example'), '  example');
      });
    });
  });

  describe('.validateFormatter()', function () {
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
});
