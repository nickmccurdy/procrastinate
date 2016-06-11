var formatters = require('./formatters');
var util = require('util');

function validateFormatter (formatter) {
  if (procrastinate.formatters.indexOf(formatter) === -1) {
    throw new Error('Invalid formatter ' + formatter);
  }
}

function parseLine (line) {
  var matches = /^((?: {2})*)(\S.*)$/.exec(line);

  return {
    indent: matches[1],
    content: matches[2]
  };
}

function format (formatter, line, type) {
  validateFormatter(formatter);

  var parsed = parseLine(line);
  var newText;

  if (type === 'end') {
    newText = formatters[formatter].end;
  } else {
    newText = util.format(formatters[formatter][type], parsed.content);
  }

  return parsed.indent + newText;
}

function unindent (line) {
  return line.replace(/^ {2}/, '');
}

function getIndentLength (line) {
  return (line.match(/ {2}/g) || []).length;
}

function procrastinate (formatter, input) {
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
procrastinate.validateFormatter = validateFormatter;

module.exports = procrastinate;
