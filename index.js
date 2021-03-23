#!/usr/bin/env node

const { program } = require('commander');

program.version(require('./package.json').version, '-v, --version');
program.arguments('<input> [errorMessage]').description('Show Error Mapping', {
  input:
    'for simple input, the format is filePath:line:col, for multiple input, the format is filePath',
  errorMessage:
    'only for multiple input, the content is the error thrown by react native',
});

program.parse();

const simpleReg = /^(.+):(\d+):(\d+)$/;
const multipleReg = /\@(\d+):(\d+)/gm;

let filePath;
let lineCols = [];
if (program.args.length === 1) {
  const simpleMatch = simpleReg.exec(program.args[0]);
  if (simpleMatch) {
    filePath = simpleMatch[1];
    lineCols.push([simpleMatch[2], simpleMatch[3]]);
  }
} else if (program.args.length === 2) {
  filePath = program.args[0];
  let multipleMatch;
  while ((multipleMatch = multipleReg.exec(program.args[1])) !== null) {
    if (multipleMatch.index === multipleReg.lastIndex) {
      multipleReg.lastIndex++;
    }

    lineCols.push([multipleMatch[1], multipleMatch[2]]);
  }
}

if (!filePath || !lineCols.length) {
  console.error('Incorrect Input');
  program.help();
}

var fs = require('fs');
var sourceMapLib = require('source-map');
var sourceMap = fs.readFileSync(filePath).toString();

sourceMapLib.SourceMapConsumer.with(sourceMap, null, (consumer) => {
  for (const [line, col] of lineCols) {
    const result = consumer.originalPositionFor({
      line: parseInt(line),
      column: parseInt(col),
    });

    result.link = `${result.source}:${result.line}:${result.column}`;

    console.log(JSON.stringify(result, null, 2));
  }
});
