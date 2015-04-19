var formatters = require('./formatters');
var util = require('util');

function validateFormatter(formatter) {
  if (procrastinate.formatters.indexOf(formatter) === -1) {
    throw new Error('Invalid formatter ' + formatter);
  }
}

function format(formatter, line, type) {
  validateFormatter(formatter);

  var matches = /^((?:  )*)(\S.*)$/.exec(line);
  var whitespace = matches[1];
  var text = matches[2];

  if (type === 'end') {
    var newText = formatters[formatter].end;
  } else {
    var newText = util.format(formatters[formatter][type], text);
  }
  return whitespace + newText;
}

function unindent(line) {
  return line.replace(/^ {2}/, '');
}

function getIndentLength(line) {
  return (line.match(/ {2}/g) || []).length;
}

function procrastinate(formatter, input) {
  validateFormatter(formatter);

  var newline = '\n';
  var inputLines = input.split(newline);
  var outputLines = [];

  inputLines.forEach(function (line, index) {
    var indentLength = getIndentLength(line);
    var nextLine = inputLines[index + 1];
    var nextIndentLength = nextLine === undefined ? 0 : getIndentLength(nextLine);

    if (line.length === 0) {
      outputLines.push('');
    } else if (nextLine === undefined || indentLength >= nextIndentLength) {
      outputLines.push(format(formatter, line, 'test'));
      if (indentLength > nextIndentLength) {
        for (var i = 0; i < indentLength - nextIndentLength; i++) {
          line = unindent(line);
          outputLines.push(format(formatter, line, 'end'));
        }
      }
    } else {
      outputLines.push(format(formatter, line, 'suite'));
    }
  });

  return outputLines.join(newline);
}

procrastinate.formatters = Object.keys(formatters);

module.exports = procrastinate;
