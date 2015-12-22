var http = require('http')
var fs = require('fs')
var linestream = require('line-stream')
var through = require('through2')

var file = fs.createReadStream(process.argv[2])
var ls = linestream()
var transform = org2web()

file
  .pipe(ls)
  .pipe(transform)
  .pipe(process.stdout)

function org2web() {
  var firstLine = true
  var depth = 0
  var transform = through(function(chunk, enc, cb) {
    // process.stdout.write(chunk.toString())
    if (firstLine) {
      this.push('<html><meta name="viewport" content="width=device-width, initial-scale=1"><code>')
      firstLine = false
    }

    var line = chunk.toString()
    line = line.replace(/\n/g, '<br/>')

    line = line.replace(/TODO/g, '<b><font color=red>TODO</font></b>')
    line = line.replace(/DONE/g, '<b><font color=green>DONE</font></b>')

    if (/^\* /.test(line)) {
      depth = 1
      this.push('<font color=blue>')
    }
    if (/^\*\* /.test(line)) {
      depth = 2
      this.push('<font color=green>')
    }

    this.push(line)

    this.push('</font>')

    cb()
  })
  // transform.on('end', function () {
  //   this.push('</code></html>')
  // })
  return transform
}
