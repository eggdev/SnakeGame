
console.log('loaded');

var direction='';
var snake = [];

var invincible = false;

var snakeTop;
var snakeLeft;

// Sets up the Snake with 1 chunk
function renderSnake(){
  $chunk = $('<div class="chunk">');
  snake.push($chunk);
}

//Appends the snake to the GameState
function appendSnake(){
  renderSnake();
  $('#game-state').append(snake);
}

//Calls the append Snake
appendSnake();



//Movement functions remove the last 'chunk' in the snake array and positions it at the front of the snake array, 10 pixels ahead of the current snake position based on the direction selected.

//Function to move the snake one position to the right
function moveRight(){
  var oldTop = snake[0].position().top;
  var oldLeft= snake[0].position().left;
  snake.unshift(snake.pop());
  snake[0].css('left',oldLeft+10);
  snake[0].css('top',oldTop);
}
//Function to move the snake one position to the left
function moveLeft(){
  var oldTop = snake[0].position().top;
  var oldLeft = snake[0].position().left;
  snake.unshift(snake.pop());
  snake[0].css('left',oldLeft-10);
  snake[0].css('top',oldTop);
}

//Function to move the snake one position to the top
function moveUp(){
  var oldTop = snake[0].position().top;
  var oldLeft = snake[0].position().left;
  snake.unshift(snake.pop());
  snake[0].css('top',oldTop-10);
  snake[0].css('left',oldLeft);
}

//Function to move the snake one position to the bottom

function moveDown(){
  var oldTop = snake[0].position().top;
  var oldLeft = snake[0].position().left;
  snake.unshift(snake.pop());
  snake[0].css('top',oldTop+10);
  snake[0].css('left',oldLeft);
}


$(document).keydown(function(e){
  //Left Key
  if(e.keyCode === 37){
    if(direction != 'right'){
      direction = 'left';
      moveLeft();
      checkSnack();
    }
  }
  //Up Key
  else if(e.keyCode === 38){
    if(direction !='down'){
      direction = 'up';
      moveUp();
      checkSnack();
    }
  }
  //Right Key
  else if(e.keyCode === 39){
    if(direction !='left'){
      direction = 'right';
      moveRight();
      checkSnack();
    }
  }
  //Down Key
  else if(e.keyCode === 40){
    //Makes sure that the direction is not up
    if(direction != 'up'){
      //changes
      direction = 'down';
      moveDown();
      checkSnack();
    }
  }
});

/// Place Snack function

function getRandomHeight(){

  //Grabs a random height that is within the game-state
  var randomHeight = Math.floor(Math.random()*$('#game-state').height());

  randomHeight = Math.floor(randomHeight/10)*10;

  return randomHeight;
}
function getRandomWidth(){

  //Grabs a random number that is within the width of the game-state
  var randomWidth = Math.floor(Math.random()*$('#game-state').width());

  randomWidth = Math.floor(randomWidth/10)*10;

  return randomWidth;

}

function placeSnack(){
  //This funciton will get a random position and will place a snack on the game-state
  var snack = $("<div id='snack'>");
  snack.css({
    'top': getRandomHeight(),
    'left': getRandomWidth()
  });
  $('#game-state').append(snack);
}


function placeStar(){
  //This funciton will get a random position and will place a star on the game-state
  var star = $('<svg id="star" width="10px" height="10px" viewBox="0 0 10 10"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><polygon id="Star-1" stroke="#979797" fill="#D8D8D8" sketch:type="MSShapeGroup" points="5 7.5 2.06107374 9.04508497 2.62235871 5.77254249 0.244717419 3.45491503 3.53053687 2.97745751 5 0 6.46946313 2.97745751 9.75528258 3.45491503 7.37764129 5.77254249 7.93892626 9.04508497 "></polygon></g></svg>');

  star.css({
    'top': getRandomHeight(),
    'left': getRandomWidth()
  });
  $('#game-state').append(star);
}



function checkSnack(){

  //This function checks to see if a snack has been eaten

  snakeTop = snake[0].position().top;
  snakeLeft = snake[0].position().left;

  var fruitTop = $('#snack').position().top;
  var fruitLeft = $('#snack').position().left;
  var chunk = $('<div class="chunk">');


  if(snakeTop == fruitTop && snakeLeft == fruitLeft){
    //If it has been eaten, it removes the snack, and pushes a new chunk into the snake at the proper position of the snake, then re-appends the snake to the game-state
    $('#snack').remove();
    chunk.css('top',snakeTop);
    chunk.css('left',snakeLeft);
    snake.push(chunk);
    //snake.unshift(chunk); //was really cool. Made it start at the top again. Could have some wormhole functionality
    $('#game-state').append(snake);

    //Places a new snack on the board
    placeSnack();
  }

}

function checkStar(){

  //This function checks to see if a star has been eaten

  snakeTop = snake[0].position().top;
  snakeLeft = snake[0].position().left;

  var starTop = $('#star').position().top;
  var starLeft = $('#star').position().left;

  if(snakeTop == starTop && snakeLeft == starLeft){
    $('#star').remove();
    invincible = true;
    setTimeout(function(){
      invincible = false;
    }, 7000);
    setTimeout(function(){
      placeStar();
    }, 20000);
  }
}

function disablePlay() {
  //Clears all timeouts.
  var highestTimeoutId = setTimeout(";");
  for (var i = 0 ; i < highestTimeoutId ; i++) {
    clearTimeout(i);
  }
}

function checkChanges(){
  //This funciton continually checks to see if the snake has run into a wall.
  snakeTop = snake[0].position().top;
  snakeLeft = snake[0].position().left;
  //If the snake is not invincible, it can lose the game
  if(invincible == false){
    if((snakeTop <= -1) || (snakeTop >= 591)){
     endGame();
   }
   else if((snakeLeft <= -1) || (snakeLeft >= 591)){
     endGame();
   }
  }
}

function snakeCollision(){
  snakeTop = snake[0].position().top;
  snakeLeft = snake[0].position().left;

  if(invincible == false){
    switch(direction){
      case 'right':
      //If the snake is moving from the left to right (direction right), it can only lose when the top positions are equal and the left of the head is 10px to the left of the left position of snake[i]
        for(var i=1; i<snake.length;i++){
          if(snakeTop == snake[i].position().top && snakeLeft+10 == snake[i].position().left){
            endGame();
          }
        }
        break
      case 'left':
      //If the snake is moving from the right to left (direction left), it can only lose when the top positions are equal and the left of the head is 10px to the right of the left position of snake[i]
        for(var i=1; i<snake.length;i++){
          if(snakeTop == snake[i].position().top && snakeLeft-10 == snake[i].position().left){
            endGame();
          }
        }
        break
      case 'up':
      //If the direction is up, the snake can only lose if the top of the head of the snake is 10px higher than the top of snake[i]. It must also have equal value of left
        for(var i=1; i<snake.length;i++){
          if(snakeTop-10 == snake[i].position().top && snakeLeft == snake[i].position().left){
            endGame();
          }
        }
        break
      case 'down':
      //If the direction is down, the snake can only lose if the top of the head of the snake is 10px lower than the top of snake[i]. It must also have equal value of left
        for(var i=1; i<snake.length;i++){
          if(snakeTop+10 == snake[i].position().top && snakeLeft == snake[i].position().left){
            endGame();
          }
        }
        break
    }

  }

}

//Tells the game which direction to move the snake chunk.

function move(){

  switch(direction){
    case 'right':
    //If direction is set to right, call the move right function, and reset the direction to right
      moveRight();
      direction = 'right';
    //Also want to confirm that a snack has not been eaten.
      checkSnack();
      break

    case 'left':
    //If direction is set to left, call the move left function, and reset the direction to left

      moveLeft();
      direction = 'left';
      //Also want to confirm that a snack has not been eaten.
      checkSnack();
      break

    case 'down':

    //If direction is set to down, call the move down function, and reset the direction to down

      moveDown();
      direction = 'down';
      //Also want to confirm that a snack has not been eaten.
      checkSnack();
      break

    case 'up':

    //If direction is set to up, call the move up function, and reset the direction to up

      moveUp();
      direction = 'up';
      //Also want to confirm that a snack has not been eaten.
      checkSnack();
      break

    }
}

//The default color of the snake. Gets more red as the tail grows.

function colorSnake(){
  var r = 0;

  for(var i=0;i<snake.length;i++){
    snake[i].css('background','rgb('+r+',0,0)');
    r+=2;
  }
}

//The star will have a random color. This is called in the 80ms interval
function colorStar(){
  var r = Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*255);
  var b = Math.floor(Math.random()*255);

  $('polygon').css('fill','rgb('+r+','+g+','+b+')');
}


//When Snake is invincible, it flashes random colors;
function randomSnake(){

  if(invincible != false){
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);

    for(var i=0;i<snake.length;i++){
      snake[i].css('background','rgb('+r+','+g+','+b+')');
    }
  }
}

function winCondition(){
  if(snake.length == $('#game-state').height() * $('#game-state').width()/100){
    alert('Holy Shit. You won');
  }
}

function instructions(){
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
    startGame();
  })

}

function startGame(){
  var timer = 5;
  $('#start').animate({
    'opacity': '0',
    'z-index': '0'
  }, 5000);

  setInterval(function(){
    timer -= 1;
    $('#timer').text(timer);
  },1000);


  setTimeout(function(){
    direction = 'right';
  }, 5000);
}

function restart(){
  $('#lose').click(function(){
    location.reload();
  })
}

function endGame(){
  $('#lose').css({
    'opacity': '1',
    'z-index': '1'
  });
  $('#score').text('Snake Length:   '+snake.length);

  disablePlay();
}

$(document).ready(function(){

  instructions();

  placeSnack();

  placeStar();

  restart();

  setInterval(function(){
    move();
    colorSnake();
    randomSnake();
    colorStar();
  }, 80);

  setInterval(function(){
    checkSnack();
    checkChanges();
    snakeCollision();
    checkStar();
  }, 10);
});
