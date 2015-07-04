var formatters = require('./formatters');
var util = require('util');

var procrastinate = {
  formatters: Object.keys(formatters),

  validateFormatter: function (formatter) {
    if (procrastinate.formatters.indexOf(formatter) === -1) {
      throw new Error('Invalid formatter ' + formatter);
    }
  },

  parseLine: function (line) {
    var matches = /^((?:  )*)(\S.*)$/.exec(line);

    return {
      indent: matches[1],
      content: matches[2]
    };
  },

  format: function (formatter, line, type) {
    procrastinate.validateFormatter(formatter);

    var parsed = procrastinate.parseLine(line);

    if (type === 'end') {
      var newText = formatters[formatter].end;
    } else {
      var newText = util.format(formatters[formatter][type], parsed.content);
    }

    return parsed.indent + newText;
  },

  unindent: function (line) {
    return line.replace(/^ {2}/, '');
  },

  getIndentLength: function (line) {
    return (line.match(/ {2}/g) || []).length;
  },

  convert: function (formatter, input) {
    procrastinate.validateFormatter(formatter);

    var newline = '\n';
    var inputLines = input.split(newline);
    var outputLines = [];

    inputLines.forEach(function (line, index) {
      var indentLength = procrastinate.getIndentLength(line);
      var nextLine = inputLines[index + 1];
      var nextIndentLength = nextLine === undefined ? 0 : procrastinate.getIndentLength(nextLine);

      if (line.length === 0) {
        outputLines.push('');
      } else if (nextLine === undefined || indentLength >= nextIndentLength) {
        outputLines.push(procrastinate.format(formatter, line, 'test'));
        if (indentLength > nextIndentLength) {
          for (var i = 0; i < indentLength - nextIndentLength; i++) {
            line = procrastinate.unindent(line);
            outputLines.push(procrastinate.format(formatter, line, 'end'));
          }
        }
      } else {
        outputLines.push(procrastinate.format(formatter, line, 'suite'));
      }
    });

    return outputLines.join(newline);
  }
};

module.exports = procrastinate;
