#!/usr/bin/env node

var fs = require('fs')
var org2html = require('../index')

var stream = (process.argv.length < 3) ? process.stdin : fs.createReadStream(process.argv[2])

stream
  .pipe(org2html())
  .pipe(process.stdout)
