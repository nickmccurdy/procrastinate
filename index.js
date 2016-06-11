var formatters = require('./formatters');
var util = require('util');

module.exports = {
  convert: function (formatter, input) {
    this.validateFormatter(formatter);

    var newline = '\n';
    var inputLines = input.split(newline);
    var outputLines = [];

    inputLines.forEach(function (line, index) {
      var indentLength = this.getIndentLength(line);
      var nextLine = inputLines[index + 1];
      var nextIndentLength = nextLine === undefined ? 0 : this.getIndentLength(nextLine);

      if (line.length === 0) {
        outputLines.push('');
      } else if (nextLine === undefined || indentLength >= nextIndentLength) {
        outputLines.push(this.format(formatter, line, 'test'));
        if (indentLength > nextIndentLength) {
          for (var i = 0; i < indentLength - nextIndentLength; i++) {
            line = this.unindent(line);
            outputLines.push(this.format(formatter, line, 'end'));
          }
        }
      } else {
        outputLines.push(this.format(formatter, line, 'suite'));
      }
    }.bind(this));

    return outputLines.join(newline);
  },

  format: function (formatter, line, type) {
    this.validateFormatter(formatter);

    var parsed = this.parseLine(line);
    var newText;

    if (type === 'end') {
      newText = formatters[formatter].end;
    } else {
      newText = util.format(formatters[formatter][type], parsed.content);
    }

    return parsed.indent + newText;
  },

  formatters: Object.keys(formatters),

  getIndentLength: function (line) {
    return (line.match(/ {2}/g) || []).length;
  },

  parseLine: function (line) {
    var matches = /^((?: {2})*)(\S.*)$/.exec(line);

    return {
      indent: matches[1],
      content: matches[2]
    };
  },

  unindent: function (line) {
    return line.replace(/^ {2}/, '');
  },

  validateFormatter: function (formatter) {
    if (this.formatters.indexOf(formatter) === -1) {
      throw new Error('Invalid formatter ' + formatter);
    }
  }
};
