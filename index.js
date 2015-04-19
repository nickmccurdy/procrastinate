var assert = require('assert');
var util = require('util');

var mochaFormatter = {
  suite: "describe('%s', function () {",
  test:  "it('%s');",
  end:   '});'
};

function format(line, type) {
  if (type === 'end') {
    return mochaFormatter.end;
  } else {
    return util.format(mochaFormatter[type], line.trim());
  }
}

function getIndentLength(line) {
  return (line.match(/ {2}/g) || []).length;
}

module.exports = function (input) {
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
      outputLines.push(format(line, 'test'));
      if (indentLength > nextIndentLength) {
        for (var i = 0; i < indentLength - nextIndentLength; i++) {
          outputLines.push(format(line, 'end'));
        }
      }
    } else {
      outputLines.push(format(line, 'suite'));
    }
  });

  return outputLines.join(newline);
};
