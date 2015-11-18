var util = require('util');
var count = 0;
var hasQueued = [];
var maxMoves = 0;
var states = [];
var startTime = new Date().getTime();
var Column = require('./column');
var State = require('./state');

const DEPTH = false;
const WHITE = 1;
const BLUE = 2;
const ORANGE = 3;
const BROWN = 4;
const RED = 5;
const PURPLE = 6;
const YELLOW = 7;
const DARKGREEN = 8;
const LIGHTGREEN = 9;
const LIGHTPINK = 10;
const BRIGHTPINK = 11
const ONEEYE = 12;
const CYAN = 13;

// Bottom left
var start = [
];

var columns = [
  new Column([BROWN, ORANGE, BLUE, WHITE]),
  new Column([RED, YELLOW, PURPLE, RED]),
  new Column([ORANGE, WHITE, LIGHTGREEN, DARKGREEN]),
  new Column([LIGHTGREEN, BROWN, LIGHTPINK, LIGHTPINK]),
  new Column([LIGHTGREEN, BLUE, YELLOW, ORANGE]),
  new Column([CYAN, BROWN, ONEEYE, PURPLE]),
  new Column([DARKGREEN, ONEEYE, WHITE, BRIGHTPINK]),
  new Column([DARKGREEN, ONEEYE, CYAN, LIGHTPINK]),
  new Column([DARKGREEN, RED, BRIGHTPINK, CYAN]),
  new Column([WHITE, ONEEYE, PURPLE, RED]),
  new Column([LIGHTGREEN, PURPLE, BRIGHTPINK, BLUE]),
  new Column([YELLOW, BROWN, BLUE, ORANGE]),
  new Column([BRIGHTPINK, YELLOW, LIGHTPINK, CYAN]),
  new Column([]),
  new Column([]),
];

var state = new State(columns, []);
states.push(state);

function startSearch() {
  if (states.length >= 1) {
    state = states.pop();
    count++;

    count++;
    if (state.moves.length > maxMoves) {
      var end = new Date().getTime();
      var time = end - startTime;
      maxMoves = state.moves.length;
      console.log(util.format('%d:%d:%d', state.moves.length, states.length, time/60000));
    }

    moves = state.nextMoves();
    for (var i in moves) {
      nextState = state.move(moves[i][0], moves[i][1]);
      if (nextState.isDone()) {
        console.log('Found solution with ' + nextState.moves.length + ' moves');
        console.log(util.format('%s', util.inspect(nextState.moves, {colors: true})));
        process.exit(0);
      }

      if (hasQueued.indexOf(nextState.toString()) === -1) {

        hasQueued.push(nextState.toString());
        if (DEPTH) {
          // DepthFirst
          states.push(nextState);
        }
        else {
          // BreadthFirst
          states.unshift(nextState);
        }
      }
    }
    process.nextTick(startSearch);
  }
  else {
    console.log('Out of states');
  }
}

console.log('Starting');
startSearch();

