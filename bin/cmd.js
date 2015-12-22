#!/usr/bin/env node

var fs = require('fs')
var org2html = require('../index')

// TODO: accept stdin if no argv[2]
var stream = fs.createReadStream(process.argv[2])

stream
  .pipe(org2html())
  .pipe(process.stdout)
