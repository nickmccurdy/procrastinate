/* eslint-env mocha */

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var procrastinate = require('..');

describe('procrastinate', function () {
  describe('.convert()', function () {
    context('with an empty input', function () {
      it('returns an empty string', function () {
        assert.equal(procrastinate.convert('mocha', ''), '');
      });
    });

    var fileOptions = { encoding: 'utf-8' };

    function getData (filename) {
      return fs.readFileSync(path.join('test/data', filename), fileOptions);
    }

    var input = getData('input.txt');

    context('with an input representing pending Mocha specs', function () {
      var output = getData('mocha_output.js');

      it('returns pending Mocha specs', function () {
        assert.equal(procrastinate.convert('mocha', input), output);
      });
    });

    context('with an input representing pending RSpec specs', function () {
      var output = getData('rspec_output.rb');

      it('returns pending RSpec specs', function () {
        assert.equal(procrastinate.convert('rspec', input), output);
      });
    });

    xcontext('with an input containing empty lines', function () {
      it('returns pending specs with empty lines removed', function () {
        assert.equal(procrastinate.convert('rspec', 'does this\n\ndoes that'),
          "it 'does this'\nit 'does that'");
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
      it('throws an Error', function () {
        assert.throws(function () {
          procrastinate.format('notathinglol', 'example', 'suite');
        }, Error);
      });
    });

    context('with a line of type "suite"', function () {
      xcontext('with no indents or text', function () {
        it('returns null', function () {
          assert.equal(procrastinate.format('rspec', '', 'suite'), null);
        });
      });

      context('with no indents', function () {
        it('returns the start of a suite', function () {
          assert.equal(procrastinate.format('rspec', 'example', 'suite'),
            "describe 'example' do");
        });
      });

      context('with one indent', function () {
        it('returns the start of a suite with one indent', function () {
          assert.equal(procrastinate.format('rspec', '  example', 'suite'),
            "  describe 'example' do");
        });
      });

      context('with two indents', function () {
        it('returns the start of a suite with two indents', function () {
          assert.equal(procrastinate.format('rspec', '    example', 'suite'),
            "    describe 'example' do");
        });
      });
    });

    context('with a line of type "test"', function () {
      xcontext('with no indents or text', function () {
        it('returns null', function () {
          assert.equal(procrastinate.format('rspec', '', 'test'), null);
        });
      });

      context('with no indents', function () {
        it('returns the start of a test', function () {
          assert.equal(procrastinate.format('rspec', 'example', 'test'), "it 'example'");
        });
      });

      context('with one indent', function () {
        it('returns the start of a test with one indent', function () {
          assert.equal(procrastinate.format('rspec', '  example', 'test'), "  it 'example'");
        });
      });

      context('with two indents', function () {
        it('returns the start of a test with two indents', function () {
          assert.equal(procrastinate.format('rspec', '    example', 'test'), "    it 'example'");
        });
      });
    });

    context('with a line of type "end"', function () {
      xcontext('with no indents or text', function () {
        it('returns null', function () {
          assert.equal(procrastinate.format('rspec', '', 'end'), null);
        });
      });

      context('with no indents', function () {
        it('returns the end of a suite or test', function () {
          assert.equal(procrastinate.format('rspec', 'example', 'end'), 'end');
        });
      });

      context('with one indent', function () {
        it('returns the end of a suite or test with one indent', function () {
          assert.equal(procrastinate.format('rspec', '  example', 'end'), '  end');
        });
      });

      context('with two indents', function () {
        it('returns the end of a suite or test with two indents', function () {
          assert.equal(procrastinate.format('rspec', '    example', 'end'), '    end');
        });
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

  describe('.parseLine()', function () {
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
