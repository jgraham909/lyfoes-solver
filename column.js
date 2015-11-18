'use strict';

const MAXSIZE = 4;

var Column = function(contents) {
  var obj = {
    contents: []
  };

  for (var i in contents) {
    obj.contents.push(contents[i]);
  }

  obj.same = function same() {
    var last = false;
    if (this.isEmpty()) {
      return true;
    }

    if (!this.isFull()) {
      return false;
    }

    for ( var i in this.contents ) {
      if (last === false) {
        last = this.contents[i];
      }
      if (last !== this.contents[i]) {
        return false;
      }
    }
    return true;
  }

  obj.isFull = function isFull() {
    if (this.contents.length >= MAXSIZE) {
      return true;
    }
    return false;
  }

  obj.isEmpty = function isEmpty() {
    if (this.contents.length === 0) {
      return true;
    }
    return false;
  }

  obj.push = function push(value) {
    if (!this.isFull()) {
      this.contents.push(value);
      return true;
    }
    else {
      return false;
    }
  }

  obj.pop = function pop() {
    if (!this.isEmpty()) {
      return this.contents.pop();
    }
    return false;
  }

  obj.peek = function peek() {
    if (this.isEmpty()) {
      return false;
    }
    return this.contents[this.contents.length -1];
  }

  obj.toString = function toString() {
    return this.contents.join(',');
  }

  obj.copy = function copy() {
    return this.contents.slice();
  }

  return obj;
}

module.exports = Column;
