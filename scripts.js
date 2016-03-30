
console.log('loaded');

var direction='';
var snake = [];


var snakeTop;
var snakeLeft;


function renderSnake(){
  $chunk = $('<div class="chunk">');
  snake.push($chunk);
}

function appendSnake(){
  renderSnake();
  renderSnake();
  renderSnake();
  renderSnake();
  $('#game-state').append(snake);
}

appendSnake();

function moveRight(){
  var oldTop = snake[0].position().top;
  var oldLeft= snake[0].position().left;
  snake.unshift(snake.pop());
  snake[0].css('left',oldLeft+10);
  snake[0].css('top',oldTop);
}

function moveLeft(){
  var oldTop = snake[0].position().top;
  var oldLeft = snake[0].position().left;
  snake.unshift(snake.pop());
  snake[0].css('left',oldLeft-10);
  snake[0].css('top',oldTop);
}

function moveUp(){
  var oldTop = snake[0].position().top;
  var oldLeft = snake[0].position().left;
  snake.unshift(snake.pop());
  snake[0].css('top',oldTop-10);
  snake[0].css('left',oldLeft);
}

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
    if(direction != 'up'){
      direction = 'down';
      moveDown();
      checkSnack();
    }
  }
});

/// Place Snack function

function getRandomHeight(){
  var randomHeight = Math.floor(Math.random()*$('#game-state').height());

  randomHeight = Math.floor(randomHeight/10)*10;

  return randomHeight;
}
function getRandomWidth(){
  var randomWidth = Math.floor(Math.random()*$('#game-state').width());

  randomWidth = Math.floor(randomWidth/10)*10;

  return randomWidth;

}

function placeSnack(){
  var snack = $("<div id='snack'>");
  snack.css({
    'top': getRandomHeight(),
    'left': getRandomWidth()
  });
  $('#game-state').append(snack);
}

function checkSnack(){

  snakeTop = snake[0].position().top;
  snakeLeft = snake[0].position().left;

  var fruitTop = $('#snack').position().top;
  var fruitLeft = $('#snack').position().left;
  var chunk = $('<div class="chunk">');

  if(snakeTop == fruitTop && snakeLeft == fruitLeft){

    $('#snack').remove();
    chunk.css('top',snakeTop);
    chunk.css('left',snakeLeft);
    snake.push(chunk);
    //snake.unshift(chunk); was really cool. Made it start at the top again. Could have some wormhole functionality
    $('#game-state').append(snake);
    placeSnack();
  }
}

function move(){

  switch(direction){
    case 'right':

      moveRight();
      direction = 'right';
      checkSnack();
      break

    case 'left':

      moveLeft();
      direction = 'left';
      checkSnack();
      break

    case 'down':

      moveDown();
      direction = 'down';
      checkSnack();
      break

    case 'up':

      moveUp();
      direction = 'up';
      checkSnack();
      break

    }
}

// I need it to be 765.5 height and 765.5 width so that it fits all the colors. Talk to teachers...


function colorSnake(){
  for(var i=0;i<snake.length;i++){
    snake[i].css('background','rgb('+r+',0,0)');
    r+=10;
  }
}


$(document).ready(function(){
  placeSnack();
  setInterval(function(){
    move();
    colorSnake();
    checkSnack();
  }, 80);

  setInterval(function(){
    checkSnack();
  }, 10);
});
