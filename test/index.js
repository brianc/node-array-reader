var assert = require('assert')
var reader = require('../')

describe('string-list', function() {
  beforeEach(function() {
    this.list = reader([
                       'hello ',
                       '  my name     is Brian',
                       'And\tI like to do drawings'])
  })

  it('can read current', function() {
    assert.equal(this.list.current(), 'hello')
    assert.equal(this.list.current(true), 'hello ')
  })

  it('can read next', function() {
    assert.equal(this.list.next(), 'my name is Brian')
    assert.equal(this.list.next(true), 'And\tI like to do drawings')
  })

  it('can reset', function() {
    assert.equal(this.list.current(), 'hello')
    this.list.reset()
    assert.equal(this.list.current(), 'hello')
    this.list.next()
    this.list.next()
    this.list.reset()
    assert.equal(this.list.current(), 'hello')
  })

  it('can read previous', function() {
    this.list.readTo('my')
    assert.equal(this.list.previous(), 'my name is Brian')
    assert.equal(this.list.previous(true), 'hello ')
  })

  it('can read to item', function() {
    var read = this.list.readTo('my')
    assert.equal(read.length, 1)
    assert.equal(read[0], 'hello')
  })

  it('can read dirty', function() {
    var read = this.list.readTo('and', true)
    assert.equal(read.length, 2)
    assert.equal(read[0], 'hello ')
    assert.equal(read[1], '  my name     is Brian')
  })

  it('returns false if readTo does not find a match', function() {
    var read = this.list.readTo('four score and seven years ago')
    assert.strictEqual(read, false)
  })

  it('readTo no-match resets to original position', function() {
    var read = this.list.readTo('four score and seven years ago')
    assert.strictEqual(read, false)
    assert.equal(this.list.current(), 'hello')
  })

  it('can find with regex', function() {
    var read = this.list.readTo(/BRIAN/ig)
    assert(read)
  })
})
