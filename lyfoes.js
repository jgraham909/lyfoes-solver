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
const LIGHTBLUE = 3;
const LIGHTGREEN = 4;
const YELLOW = 5;
const BRIGHTPINK = 6;
const RED = 7;
const GREEN = 8;
const GREY = 9;
const PURPLE = 10;
const PINK = 11
const CYAN = 12;
const ORANGE = 13;

// Bottom left
var start = [
];

var columns = [
  new Column([LIGHTGREEN, LIGHTBLUE, BLUE, WHITE]),
  new Column([YELLOW, RED, BRIGHTPINK, YELLOW]),
  new Column([LIGHTBLUE, WHITE, GREY, GREEN]),
  new Column([GREY, LIGHTGREEN, PURPLE, PURPLE]),
  new Column([GREY, BLUE, RED, LIGHTBLUE]),
  new Column([CYAN, LIGHTGREEN, PINK, BRIGHTPINK]),
  new Column([GREEN, PINK, WHITE, ORANGE]),
  new Column([GREEN, PINK, CYAN, PURPLE]),
  new Column([GREEN, YELLOW, ORANGE, CYAN]),
  new Column([WHITE, PINK, BRIGHTPINK, YELLOW]),
  new Column([GREY, BRIGHTPINK, ORANGE, BLUE]),
  new Column([RED, LIGHTGREEN, BLUE, LIGHTBLUE]),
  new Column([ORANGE, RED, PURPLE, CYAN]),
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

