const game = {};
game.snake = [];
game.direction = '';
game.invincible = false;
game.star = true;
game.state = $('#game-state');
game.snakeTop;
game.snakeLeft;
game.starInterval = function(){
  setInterval(function(){
    game.checkStar();
  }, 1);
}


game.renderSnake = function(){
  let chunk = $('<div class="chunk">');
  chunk.css('top', (game.state.height())/2);
  chunk.css('left', (game.state.width())/2);
  game.snake.push(chunk);
  game.state.append(game.snake);
}

/// Place Snack function
game.getRandomHeight = function(){
  //Grabs a random height that is within the game-state
  let randomHeight = Math.floor(Math.random()*game.state.height());
  randomHeight = Math.floor(randomHeight/10)*10;
  return randomHeight;
}
game.getRandomWidth = function(){
  //Grabs a random number that is within the width of the game-state
  let randomWidth = Math.floor(Math.random()*game.state.width());
  randomWidth = Math.floor(randomWidth/10)*10;
  return randomWidth;
}

game.placeSnack = function(){
  //This funciton will get a random position and will place a snack on the game-state
  let snack = $("<div id='snack'>");
  snack.css({
    'top': game.getRandomHeight(),
    'left': game.getRandomWidth()
  });
  game.state.append(snack);
}

game.placeStar = function(){
  //This funciton will get a random position and will place a "star" on the game-state
  let star = $('<div id="star">');
  game.star = true;
  star.css({
    'top': game.getRandomHeight(),
    'left': game.getRandomWidth()
  });
  game.state.append(star);
}

//The default color of the snake. Gets more red as the tail grows.
//
game.randomSnake = function(){
  if(game.invincible == true){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);

    for(let i=0;i<game.snake.length;i++){
      game.snake[i].css('background','rgb('+r+','+g+','+b+')');
    }
  }
}

game.colorSnake = function(){
  let r = 0;
  for(let i=0;i<game.snake.length;i++){
    game.snake[i].css('background','rgb('+r+',0,0)');
    r+=2;
  }
}

//The star will have a random color. This is called in the 80ms interval
game.colorStar = function(){
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);
  $('#star').css('background-color','rgb('+r+','+g+','+b+')');
}


//Allows the game instructions to be removed when the game starts
game.instructions = function(){
  $('#instructions').click(function(){
    $('#instructions').fadeOut(1000);

    $('#instructions').css({
      'opacity': '0',
      'z-index': '0'
    });

    $('#start').css({
      'opacity': '1',
      'z-index': '1'
    })
    game.startGame();
    game.init();
  })

}
//Allows for the timer to start ticking down for the game to begin
game.startGame = function(){
  let timer = 5;
  $('#start').animate({
    'opacity': '0',
    'z-index': '0'
  }, 5000);

  $('body').append('<audio autoplay="autoplay" src="./Audio/Background.mp3" id="background"></audio>')

  setInterval(function(){
    timer -= 1;
    $('#timer').text(timer);
  },1000);
}
//Allows for the clicking of the lose window to reset the game
game.restart = function(){
  $('#lose').click(function(){
    location.reload();
  })
}
//Causes the player to lose, disables the keys and renders the lose condition modal
game.endGame = function(){
  $('#lose').css({
    'opacity': '1',
    'z-index': '1'
  });
  $('#score').text('Snake Length:   '+game.snake.length);
  $('#background').remove();
  $('body').append('<audio autoplay="autoplay" id="gameover" src="./Audio/GameOver.mp3"></audio>')
  game.disablePlay();
  game.restart();
}

game.disablePlay = function() {
  //Clears all intervals.
  clearInterval(game.checking);
  clearInterval(game.movement);

  let highestTimeoutId = setTimeout(";");
  for (let i = 0 ; i < highestTimeoutId ; i++) {
    clearTimeout(i);
  }
}

game.winCondition = function(){
  if(game.snake.length == $('#game-state').height() * $('#game-state').width()/100){
    alert('Holy Shit. You won');
  }
}

//Movement functions remove the last 'chunk' in the snake array and positions it at the front of the snake array, 10 pixels ahead of the current snake position based on the direction selected.

//Function to move the snake one position to the right
game.moveRight = function(){
  game.snakeTop = game.snake[0].position().top;
  game.snakeLeft = game.snake[0].position().left;
  let oldTop = game.snakeTop;
  let oldLeft= game.snakeLeft;
  game.snake.unshift(game.snake.pop());
  game.snake[0].css('left',oldLeft+10);
  game.snake[0].css('top',oldTop);
}
//Function to move the snake one position to the left
game.moveLeft = function(){
  game.snakeTop = game.snake[0].position().top;
  game.snakeLeft = game.snake[0].position().left;
  let oldTop = game.snakeTop;
  let oldLeft = game.snakeLeft;
  game.snake.unshift(game.snake.pop());
  game.snake[0].css('left',oldLeft-10);
  game.snake[0].css('top',oldTop);
}

//Function to move the snake one position to the top
game.moveUp = function(){
  game.snakeTop = game.snake[0].position().top;
  game.snakeLeft = game.snake[0].position().left;
  let oldTop = game.snakeTop;
  let oldLeft = game.snakeLeft;
  game.snake.unshift(game.snake.pop());
  game.snake[0].css('top',oldTop-10);
  game.snake[0].css('left',oldLeft);
}

//Function to move the snake one position to the bottom

game.moveDown = function(){
  game.snakeTop = game.snake[0].position().top;
  game.snakeLeft = game.snake[0].position().left;
  let oldTop = game.snakeTop;
  let oldLeft = game.snakeLeft;
  game.snake.unshift(game.snake.pop());
  game.snake[0].css('top',oldTop+10);
  game.snake[0].css('left',oldLeft);
}


//Event listeners
game.movements = function(){
  $(document).keydown(function(e){
    //Left Key
    if(e.keyCode === 37){
      if(game.direction != 'right'){
        game.direction = 'left';
        game.moveLeft();
        game.checkSnack();
      }
    }
    //Up Key
    else if(e.keyCode === 38){
      if(game.direction !='down'){
        game.direction = 'up';
        game.moveUp();
        game.checkSnack();
      }
    }
    //Right Key
    else if(e.keyCode === 39){
      if(game.direction !='left'){
        game.direction = 'right';
        game.moveRight();
        game.checkSnack();
      }
    }
    //Down Key
    else if(e.keyCode === 40){
      //Makes sure that the direction is not up
      if(game.direction != 'up'){
        //changes
        game.direction = 'down';
        game.moveDown();
        game.checkSnack();
      }
    }
  });
}

//Tells the game which direction to move the snake chunk.

game.move = function(){
  switch(game.direction){
    case 'right':
    //If direction is set to right, call the move right function, and reset the direction to right
      game.direction = 'right';
      game.moveRight();
    //Also want to confirm that a snack has not been eaten.
      game.checkStar();
      game.checkSnack();
      break
    case 'left':
    //If direction is set to left, call the move left function, and reset the direction to left
      game.direction = 'left';
      game.moveLeft();
      //Also want to confirm that a snack has not been eaten.
      game.checkStar();
      game.checkSnack();
      break
    case 'down':
    //If direction is set to down, call the move down function, and reset the direction to down
      game.direction = 'down';
      game.moveDown();
      //Also want to confirm that a snack has not been eaten.
      game.checkStar();
      game.checkSnack();
      break
    case 'up':
    //If direction is set to up, call the move up function, and reset the direction to up
      game.direction = 'up';
      game.moveUp();
      //Also want to confirm that a snack has not been eaten.
      game.checkStar();
      game.checkSnack();
      break
    }
}

game.checkChanges = function(){
  //This funciton continually checks to see if the snake has run into a wall.
  game.snakeTop = game.snake[0].position().top;
  game.snakeLeft = game.snake[0].position().left;
  //If the snake is not invincible, it can lose the game
  if(game.invincible == false){
    if((game.snakeTop <= -1) || (game.snakeTop >= $('#game-state').height())){
     game.endGame();
   }
   else if((game.snakeLeft <= -1) || (game.snakeLeft >= $('#game-state').width())){
     game.endGame();
   }
  }
}


game.snakeCollision = function(){
  game.snakeTop = game.snake[0].position().top;
  game.snakeLeft = game.snake[0].position().left;

  if(game.invincible === false){
    switch(game.direction){
      case 'right':
      //If the snake is moving from the left to right (direction right), it can only lose when the top positions are equal and the left of the head is 10px to the left of the left position of snake[i]
        for(let i=1; i<game.snake.length;i++){
          if(game.snakeTop == game.snake[i].position().top && game.snakeLeft+10 == game.snake[i].position().left){
            game.endGame();
          }
        }
        break
      case 'left':
      //If the snake is moving from the right to left (direction left), it can only lose when the top positions are equal and the left of the head is 10px to the right of the left position of snake[i]
        for(let i=1; i<game.snake.length;i++){
          if(game.snakeTop == game.snake[i].position().top && game.snakeLeft-10 == game.snake[i].position().left){
            game.endGame();
          }
        }
        break
      case 'up':
      //If the direction is up, the snake can only lose if the top of the head of the snake is 10px higher than the top of snake[i]. It must also have equal value of left
        for(let i=1; i<game.snake.length;i++){
          if(game.snakeTop-10 == game.snake[i].position().top && game.snakeLeft == game.snake[i].position().left){
            game.endGame();
          }
        }
        break
      case 'down':
      //If the direction is down, the snake can only lose if the top of the head of the snake is 10px lower than the top of snake[i]. It must also have equal value of left
        for(let i=1; i<game.snake.length;i++){
          if(game.snakeTop+10 == game.snake[i].position().top && game.snakeLeft == game.snake[i].position().left){
            game.endGame();
          }
        }
        break
    }
  }
}


game.checkSnack = function(){

  //This function checks to see if a snack has been eaten
  game.snakeTop = game.snake[0].position().top;
  game.snakeLeft = game.snake[0].position().left;

  let fruitTop = $('#snack').position().top;
  let fruitLeft = $('#snack').position().left;
  let chunk = $('<div class="chunk">');

  if(game.snakeTop == fruitTop && game.snakeLeft == fruitLeft){
    //If it has been eaten, it removes the snack, and pushes a new chunk into the snake at the proper position of the snake, then re-appends the snake to the game-state
    $('#snack').remove();
    chunk.css('top', game.snakeTop);
    chunk.css('left', game.snakeLeft);
    game.snake.push(chunk);
    //snake.unshift(chunk); //was really cool. Made it start at the top again. Could have some wormhole functionality
    $('#game-state').append(game.snake);

    //Places a new snack on the board
    game.placeSnack();
  }
}

game.checkStar = function(){
  //This function checks to see if a star has been eaten
  if(game.star){
    game.snakeTop = game.snake[0].position().top;
    game.snakeLeft = game.snake[0].position().left;
    let starTop = $('#star').position().top;
    let starLeft = $('#star').position().left;
    if(game.snakeTop == starTop && game.snakeLeft == starLeft){
      game.star = false;
      game.makeSnakeInvincible();
      clearInterval(game.starInterval);
    }
  }else if(!game.star){
    clearInterval(game.starInterval);
  }
}

game.makeSnakeInvincible = function(){
  $('#star').remove();
  game.star = false;
  game.invincible = true;
  setTimeout(function(){
    game.placeStar();
    game.star = true;
  }, 60000);

  $('body').append('<audio autoplay="autoplay" id="starpower" src="./Audio/Star Power.m4a"></audio>');

  setTimeout(function(){
    $('#starpower').remove();
    game.invincible = false;
    game.colorSnake();
  }, 10000);
}

game.init = function(){
  game.renderSnake();
  game.placeSnack();
  game.movements();

  // setTimeout(function(){
  game.placeStar();
 // }, 60000);


 game.movement = setInterval(function(){
   game.move();
   game.colorStar();
   game.colorSnake();
   game.randomSnake();
 }, 100);

 game.checking = setInterval(function(){
   game.checkStar();
   game.checkSnack();
   game.checkChanges();
   game.snakeCollision();
 }, 1);
}



$(document).ready(function(){
  game.instructions();
})
