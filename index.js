var http = require('http')
var fs = require('fs')

var filename = process.argv[2]

//var file = fs.readFileSync('/home/sww/Sync/athome.org').toString()
//var topReg = new RegExp('^\\* (.*)', 'gm')
//console.log(topReg.exec(file))

var res = process.stdout
res.write('<html><meta name="viewport" content="width=device-width, initial-scale=1"><code>')
var file = fs.readFileSync(filename).toString()
file = file.replace(/TODO/g, '<b><font color=red>TODO</font></b>')
file = file.replace(/DONE/g, '<b><font color=green>DONE</font></b>')
file = file.replace(/^\* /gm, '</font><font color=blue>* ')
file = file.replace(/^\*\* /gm, '</font><font color=green>** ')
file = file.replace(/^\*\*\* /gm, '</font><font color=olive>*** ')
file = file.replace(/\n/g, '<br/>')
res.write(file)
res.write('</code></html>')
