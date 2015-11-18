# lyfoes-solver
Solver for the puzzle game lyfoes.

https://play.google.com/store/apps/details?id=by.ai91.lyfoes

I got stuck on the hard level 4.58 and after too many attempts decided that I could write a program to solve lyfoes level 58.

Here it is.

This can actually solve any of the puzzles you just need to change the column declarations in lyfoes.js. This currently looks like the following for level 4:58;

````
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
````

There is a variable at the top called DEPTH which changes the search from depth first to breadth first. Breadth first will find an optimal solution whereas depth first will find *a* solution. In the case of level 58 switching between depth or breadth gives the following;

Depth: 81 move solution found in ~0.5 second.
Breadth: 56 move solution in ~2 minutes.

Run this with 

````
node lyfoes
````

You should expect output like the following;

````
Starting
1:12:0.00025
2:107:0.0006333333333333333
3:239:0.0015666666666666667
4:421:0.0037
5:620:0.007016666666666667
6:834:0.012183333333333332
7:998:0.019416666666666665
8:1049:0.029366666666666666
9:1041:0.0402
10:1012:0.05235
11:1011:0.06343333333333333
12:1005:0.07576666666666666
13:1020:0.09055
14:1038:0.10613333333333333
15:991:0.12243333333333334
16:906:0.13906666666666667
17:886:0.15693333333333334
18:836:0.17365
19:750:0.1903
````

What this means is that after one move there are 12 states in the queue and an elapsed time of 0.00025 minutes. Similarly after 14 moves there are 1038 states in the queue and an elapsed time of 0.09055 minutes.

The final output will be something like the following;

````
Found solution with 56 moves
[ [ '1', '13' ],
  [ '9', '13' ],
  [ '1', '9' ],
  [ '3', '14' ],
  [ '3', '14' ],
  [ '7', '14' ],
  [ '12', '7' ],
  [ '12', '14' ],
  [ '1', '12' ],
  [ '1', '13' ],
  [ '10', '1' ],
  [ '6', '10' ],
  [ '0', '6' ],
  [ '0', '1' ],
  [ '4', '0' ],
  [ '11', '0' ],
  [ '11', '1' ],
  [ '3', '11' ],
  [ '4', '12' ],
  [ '4', '1' ],
  [ '4', '3' ],
  [ '5', '4' ],
  [ '9', '4' ],
  [ '9', '4' ],
  [ '5', '9' ],
  [ '11', '5' ],
  [ '11', '5' ],
  [ '12', '11' ],
  [ '12', '11' ],
  [ '12', '11' ],
  [ '10', '12' ],
  [ '10', '12' ],
  [ '10', '4' ],
  [ '10', '3' ],
  [ '9', '10' ],
  [ '9', '10' ],
  [ '6', '9' ],
  [ '6', '9' ],
  [ '6', '10' ],
  [ '2', '6' ],
  [ '2', '3' ],
  [ '2', '9' ],
  [ '0', '2' ],
  [ '0', '2' ],
  [ '0', '2' ],
  [ '5', '0' ],
  [ '5', '0' ],
  [ '5', '0' ],
  [ '7', '5' ],
  [ '7', '5' ],
  [ '8', '5' ],
  [ '7', '10' ],
  [ '7', '6' ],
  [ '8', '12' ],
  [ '8', '13' ],
  [ '8', '6' ] ]
````

Which is the solution for 4.58. **Note that these values are 0 based** and represent a move [ FROM, TO ] so the first few moves are;

1. move column 1 to column 13. (Move column 2 to column 14 for 1-based)
1. move column 9 to 13. 
1. move column 1 to 9
1. etc.
