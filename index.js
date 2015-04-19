var util = require('util');

var mochaFormatter = {
  suite: "describe('%s', function () {",
  test:  "it('%s');",
  end:   '});'
};

function format(line, type) {
  // var match = line.replace(, "$1describe('$2', function () {");
  var matches = /^((?:  )*)(\S.*)$/.exec(line);
  var whitespace = matches[1];
  var text = matches[2];

  if (type === 'end') {
    var newText = mochaFormatter.end;
  } else {
    var newText = util.format(mochaFormatter[type], text);
  }
  return whitespace + newText;
}

function unindent(line) {
  return line.replace(/^  /, '');
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
          line = unindent(line);
          outputLines.push(format(line, 'end'));
        }
      }
    } else {
      outputLines.push(format(line, 'suite'));
    }
  });

  return outputLines.join(newline);
};
