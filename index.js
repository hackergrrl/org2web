var linestream = require('line-stream')
var through = require('through2')
var pumpify = require('pumpify')

var doneKeywords = ['DONE']
var notDoneKeywords = ['TODO', 'WAITING', 'STARTED']

module.exports = function () {
  var firstLine = true
  var depth = 0
  var transform = through(function(chunk, enc, cb) {
    if (firstLine) {
      this.push('<html><meta name="viewport" content="width=device-width, initial-scale=1"><code>\n')
      firstLine = false
    }

    // newlines to br
    var line = chunk.toString()
    line = line.replace(/\n/g, '<br/>')

    // done/not-done keywords
    for (var i in notDoneKeywords) {
      line = line.replace(new RegExp(notDoneKeywords[i]), '<b><font color=red>' + notDoneKeywords[i] + '</font></b>')
    }
    for (var i in doneKeywords) {
      line = line.replace(new RegExp(doneKeywords[i]), '<b><font color=green>' + doneKeywords[i] + '</font></b>')
    }

    // color or indent based on item depth
    if (/^\* /.test(line)) {
      depth = 1
      this.push('<font color=blue>')
    }
    else if (/^\*\* /.test(line)) {
      depth = 2
      this.push('<font color=green>')
    }
    else {
      for (var i=0; i < depth + 2; i++) {
        this.push('&nbsp;')
      }
    }

    // tags
    var tagRegex = /:(\S+):/g
    line = line.replace(tagRegex, '<b style="float:right">:$1:</b>')

    // the final line
    this.push(line)

    // close font changes
    this.push('</font>')

    // push a newline. not needed for html, but it makes human interactive use more pleasant.
    this.push('\n')

    cb()
  },
  function flush(cb) {
    this.push('</code></html>')
  })

  return pumpify([
    linestream(),
    transform
  ])
}
