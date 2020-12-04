#!/usr/bin/env node
const input = process.argv[2];
if (!input) {
  console.log('Please pass the path of the source-map with line and column');
  process.exit(0);
}

const info = /^(.+):(\d+):(\d+)$/.exec(input);

if (!info) {
  console.log('the input format should be $FilePath:$Line:$Column');
  process.exit(0);
}

var fs = require('fs');
var sourceMap = require('source-map');

var rawSourceMap = fs.readFileSync(info[1]).toString();
// sourceMap.SourceMapConsumer;
sourceMap.SourceMapConsumer.with(rawSourceMap, null, (consumer) => {
  console.log(
    consumer.originalPositionFor({
      line: parseInt(info[2]),
      column: parseInt(info[3]),
    })
  );
});
