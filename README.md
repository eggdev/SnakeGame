Snake Game README
==============================

Game Created by Brendan Eggers
------------------------------

### Breakdown of required items

**A Game State** - Where the snake game lives and breathes.
 _requirements_
  * Fixed Width and Height of game space
  * If player encounters the wall, they lose the game.
  * If player runs into snake body, game over
  * Wins the game if Snake fills up all of game-state and has not touched itself or the wall.


**A Snake!** - A div that fills up with other divs as items (snacks) are collected
  * A head of the snake that helps direct the body
  * Chunks that add to the length of the snake
  * Must take up space inside of the div.

**Snacks** - Randomly placed div that must be eaten by the Snake


### Functionality

**Keydown**

When the user presses the left key, the snake should move towards the left of the game-state and continues moving

When the user presses the up key, the snake should move towards the top of the game-state and continues moving

When the user presses the right key, the snake should move towards the right of the game-state and continues moving

When the user presses the down key, the snake should move towards the bottom of the game-state and continues moving


The head of the snake should turn, and the body should sort of stay in the same spot.
    _could have it continually add divs to the top and remove from the back_

On the press of the key, set that position as the point when the chunks of the snake need to start to turn. Every time a chunk reaches that point, it must turn 90 degrees in that direction.


Need to keep checking the position. So as the snake changes position, check to see if it is in the same location as a snack...


Snake is moving to the right, width of 10 divs.
Player hits down. New snake is made. Previous snake has width of 9 divs, new snake has height of 1 div. As it moves, Previous snake has 8 divs, new snake has 2 divs
