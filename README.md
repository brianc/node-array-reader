# string-list

A pretty basic class to make searching forward and backward in an array of strings easier.  Pairs up nicely with [pdf-text](https://github.com/brianc/node-pdf-text) for loosely structured pdf document parsing.


## install

```sh
$ npm install string-list
```

## use

```js
var StringList = require('string-list')

var strangz = ['Hello', '  MY NAME IS\tBRIAN', '  AND    I LIKE TO DO DRAWINGS!']
var list = new StringList(strangz)

var dirty = true

console.log(list.current()) //'Hello'
console.log(list.next()) //'MY NAME IS BRIAN'
console.log(list.current(dirty)) //'  MY NAME IS\tBRIAN'
console.log(list.previous()) //'Hello'
console.log(list.readTo('and')) //['MY NAME IS BRIAN']
```

## api

By default all values returned are 'cleaned' based on [this method](https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js#L216).

All methods take an optional `dirty` truthy value.  If supplied, they return the results without cleaning.

### reader.current(bool dirty)

Returns the current item within the reader.  If `dirty` is truthy, return without cleaning.

Example:

```js
var list = new StringList(['   hi!    friend '])
list.current(true) //-> '   hi!    friend '
list.current() //-> 'hi! friend'
```

### reader.next(bool dirty)

Advance the internal pointer to the next item in the array and then call and return `reader.current()`

Example:

```js
var list = new StringList([' hi! ', 'friend!'])
list.next() //-> 'friend!'
```

### reader.previous(bool dirty)

Advance the internal pointer to the current item in the array and then call and return `reader.current()`

Example:
```js
var list = new StringList([' hi! ', 'friend!'])
list.next() //-> 'friend!'
list.previous(true) //-> ' hi! '
```

### reader.readTo(string searchString, bool dirty)

Advance the reader until it encounters an internal item which `indexOf(searchString)` returns 0 case insensitive.  If the end of the list is reached and there is no matched string, return `false`.

Returns the collected list elements as an arary of cleaned strings.  Pass a truthy value to `dirty` to not clean the values.


Example:
```js
var list = new StringList(['I    like ice cream', 'I also like sleeping', 'let\'s dance!'])

var result = list.readTo('i also')
console.log(result) //['I like ice cream']


var list = new StringList(['I    like ice cream', 'I also like sleeping', 'let\'s dance!'])

var result = list.readTo('alf')
console.log(result) //false

var list = new StringList(['I    like ice cream', 'I also like sleeping', 'let\'s dance!'])

var result = list.readTo('i like')
console.log(result) //[]

var list = new StringList(['I    like ice cream', 'I also like sleeping ', 'let\'s dance!'])

var result = list.readTo('let', true)
console.log(result) //['I     like ice cream', 'I also like sleeping ']


```

## license

The MIT License (MIT)

Copyright (c) 2013 Brian M. Carlson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
