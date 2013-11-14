//clean whitespace
var clean = function(str){
  return str.trim().replace(/\s+/g, ' ');
}

//read an array of text chunks
//and search for stuff in it too!!!!1
var ArrayReader = module.exports = function(chunks) {
  if(!(this instanceof ArrayReader)) return new ArrayReader(chunks)
  this.chunks = chunks
  this.offset = 0
}

//return array of text chunks up to
//but not including the key
//if the key is not found, throw baby
ArrayReader.prototype.readTo = function(key, dirty) {
  var offset = this.offset
  var chunk;
  var result = []
  while(chunk = this.chunks[this.offset++]) {
    if(!chunk.trim().toLowerCase().indexOf(key)) {
      return result
    }
    result.push(dirty ? chunk : clean(chunk))
  }
  this.offset = offset
  return false
}

ArrayReader.prototype.previous = function(dirty) {
  var result = this.chunks[--this.offset]
  return dirty ? result : clean(result)
}

ArrayReader.prototype.current = function(dirty) {
  var result = this.chunks[this.offset]
  return dirty ? result : clean(result)
}

ArrayReader.prototype.next = function(dirty) {
  var result = this.chunks[++this.offset]
  return dirty ? result : clean(result)
}

//dump a section out to the debug console
ArrayReader.prototype.dump = function() {
  console.error(this.chunks.slice(this.offset, this.offset + 10))
}
