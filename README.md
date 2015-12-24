# org2web

> Transform stream that reads Emacs org data and writes desktop/mobile-friendly HTML.

![screenshot](https://github.com/noffle/noffle.github.io/raw/master/screenshots/org2web.png)


# Background

[Emacs org-mode](http://orgmode.org/) is a handy way to organize information.

I couldn't find a simple tool that would give me simple HTML from an org file
that viewed well on a mobile device, so I wrote this.

`org2web` works in strong accordance to the [unix
philosophy](https://en.wikipedia.org/wiki/Unix_philosophy): it accepts org data
on stdin and transforms it to HTML in a streaming fashion.


# Installation

## Shell Command

```
$ npm install -g org2web
```

You'll need [NodeJS](https://nodejs.org/en/) if you don't have it.


## Node Module

```
$ npm install org2web
```

# Usage

## CLI

```
$ org2web todo.org

(html output of todo.org)
```

or use standard input

```
$ org2web
* TODO write that PR for noffle/ipget
** TODO got to fix that bug in ipfs/go-ipfs first!
^D

(html output)
```

## Module

Write a simple http server that outputs org files from disk as HTML!

```js
var org2web = require('org2web')
var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
  var filename = req.url.substring(1)
  if (fs.existsSync(filename)) {
    fs.createReadStream(filename).pipe(org2web()).pipe(res)
  } else {
    res.end('no such file')
  }
}).listen(7000)
```

# API

```js
var org2web = require('org2web')
```

## org2web()

Exports itself as a single function. When called, returns a brand new transform
stream that reads Emacs org data and writes HTML.


# Contribute

Formatting and syntax highlighting is by no means complete. The full org syntax
[is pretty involved](http://orgmode.org/worg/dev/org-syntax.html). I wrote this
with the subset of org that **I** use in mind. Please send PRs to fill in the
gaps for **your** use cases!


# License

ISC
