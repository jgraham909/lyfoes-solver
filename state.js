'use strict';
var util = require('util');
var Column = require('./column');
var State = function(columns, moves) {
  var state = {
    columns: columns,
    moves: moves
  };

  state.toString = function toString() {
    var colStrings = [];
    for (var i in this.columns) {
      colStrings.push(this.columns[i].toString());
    }
    colStrings.sort();

    return colStrings.join('::');
  }

  state.move = function move(from, to) {
    var columns = [];

    for (var i in this.columns) {
      columns.push(new Column(this.columns[i].copy()));
    }

    var newState = new State(columns, this.moves.slice());
    newState.columns[to].push(newState.columns[from].pop());
    newState.moves.push([from,to]);
    return newState;
  }

  state.isDone = function isDone() {
    for (var i in this.columns) {
      if (!this.columns[i].same()) {
        return false;
      }
    }
    return true;
  }

  state.nextMoves = function nextMoves() {
    var targets = [];
    var moves = [];
    for (var i in this.columns) {
      if (!this.columns[i].isFull()) {
        targets.push(i);
      }
    }
    for (var i in targets) {
      for (var j in this.columns) {
        if (this.columns[j].isEmpty()) {
          continue;
        }
        if (this.columns[targets[i]].isEmpty()) {
          moves.push([j, targets[i]]);
        }
        else if (targets[i] !== j && (this.columns[targets[i]].peek() === this.columns[j].peek())) {
          moves.push([j, targets[i]]);
        }
      }
    }
    return moves;
  }

  return state;
}

module.exports = State;
