Snake Game README
==============================

Game Created by Brendan Eggers
------------------------------
### GAMEPLAY

**Start Screen:**
![alt text][start]

[start]: ./Screenshots/StartScreen.png  "Start Screen"

**Real Gameplay Screenshot**
![alt text][gameplay]

[gameplay]: ./Screenshots/GamePlay.png  "Game Screen Shot"

**Game Over**
![alt text][gameover]

[gameover]: ./Screenshots/GameOver.png  "Game Over Screenshot"




### Breakdown of required items

**A Game State** - Where the Snake lives and breathes.
 _requirements_
  * Fixed Width and Height of game space
  * If player encounters the wall, they lose the game.
  * If player runs into snake body, game over
  * Wins the game if Snake fills up all of game-state and has not touched itself or the wall.


**A Snake!** - An array of chunks!

**Snacks** - Randomly placed div that must be eaten by the Snake/ When the Snake eats a snack, it adds one chunk to the Snake.

**Stars** - Renders the user invincible! Snake is able to venture into the lava pools safely for a limited time.


### Functionality

**Movement**

When a key is pressed, the direction of the snake will change based on the key that is pressed.

The directional function will pop the tail of the snake array and place the returned element at the front of the snake array 10 pixels in the desired direction.
