Snake Game README
==============================

Game Created by Brendan Eggers
------------------------------
### GAMEPLAY

**Start Screen:**
![alt text][start]

[start]: ./Images/StartScreen.png  "Start Screen"

**Real Gameplay Screenshot**
![alt text][gameplay]

[gameplay]: ./Images/GamePlay.png  "Game Screen Shot"

**Game Over**
![alt text][gameover]

[gameover]: ./Images/GameOver.png  "Game Over Screenshot"




### Breakdown of required items

**A Game State** - Where the Snake lives and breathes.
 _requirements_
  * Fixed Width and Height of game space
  * If player encounters the wall, they lose the game.
  * If player runs into snake body, game over
  * Wins the game if Snake fills up all of game-state and has not touched itself or the wall.
  * Random Snack Generator
  * A way to increase the size of the Snake


**A Snake!** - An array of chunks!

**Snacks** - Randomly placed div that must be eaten by the Snake/ When the Snake eats a snack, it adds one chunk to the Snake.

**Stars** - Renders the user invincible! Snake is able to venture into the lava pools safely for a limited time.


### Functionality

**Movement**

When a key is pressed, the direction of the snake will change based on the key that is pressed.

The directional function will pop the tail of the snake array and place the returned element at the front of the snake array 10 pixels in the desired direction.


### Collision Detection

The Snake is able to detect whether it has collided with the walls of the Game-State by checking every 10ms as well as every time the move function is called and when a directional key is pressed.

Additionally, the Snake will check whether it has collided with it's own body by checking to see if the Top of the Head and the Left of the Head match anyone of chunks in the body, depending on the direction that the snake is presently moving.

As long as the Snake is not under the magical spell of the invincibility star, these collision functions can occur. During the time that the Snake is invincible (after it gobbles up the star on the board) it is able to move through itself, as well as the borders.
