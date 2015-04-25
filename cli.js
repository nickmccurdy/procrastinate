#!/usr/bin/env node

var fs = require('fs');
var pkg = require('./package.json');
var procrastinate = require('./index');
var program = require('commander');

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('<formatter>')
  .parse(process.argv);

if (program.args.length === 1) {
  var formatter = program.args[0];
  procrastinate.validateFormatter(formatter);

  var input = fs.readFileSync('/dev/stdin').toString();
  console.log(procrastinate(formatter, input));
} else {
  program.help();
}
