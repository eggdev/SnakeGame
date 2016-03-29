//Move the snake


function renderSnake(){
  var chunk = $('<div class="chunk">');
  var newSnake = $('<div id="snake">').css({'left':300,'top':300});

  $('#game-state').append(newSnake);
  $('#snake').append(chunk);
}


function moveLeft(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;


  var chunk = $('<div class="chunk">');
  chunk.css('position','absolute');
  chunk.css('top',top);
  chunk.css('left',left-5);

  $('#snake').append(chunk);

  $('#snake').children().eq($('#snake').children().length-1).remove();

  $('#snake').css('left',left-5);

}
function moveUp(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;


  var chunk = $('<div class="chunk">');
  chunk.css('position','absolute');
  chunk.css('top',top-5);
  chunk.css('left',left);


  $('#snake').append(chunk);

  $('#snake').children().eq($('#snake').children().length-1).remove();

  $('#snake').css('top',top-5);



}

function moveRight(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;


  var chunk = $('<div class="chunk">');
  chunk.css('position','absolute');
  chunk.css('top',top);
  chunk.css('left',left+5);


  $('#snake').prepend(chunk);

  $('#snake').children().eq($('#snake').children()[0]).remove();

  $('#snake').css('left',left+5);




}

function moveDown(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;

  var chunk = $('<div class="chunk">');
  chunk.css('position','absolute');
  chunk.css('top',top+5);
  chunk.css('left',left);


  $('#snake').prepend(chunk);

  $('#snake').children().eq($('#snake').children()[0]).remove();

  $('#snake').css('top',top+5);

}



function arrowKeys(){




  $('body').keydown(function(e){
      //If left arrow is pressed
      if(e.keyCode === 37){


        moveLeft();

      }
      //If up arrow key is pressed
      else if(e.keyCode === 38){

        moveUp();


      }
      //If right arrow is pressed
      else if(e.keyCode === 39){

        moveRight();


      }

      //If down arrow is pressed
      else if(e.keyCode === 40){

        moveDown();
      }
    checkChanges();
  });
}


function disablePlay() {
  $('body').unbind('keydown');
}

function checkChanges(){
  var $snakeHeadTop = $('#snake').position().top;
  var $snakeHeadLeft = $('#snake').position().left;

  var lastTop = $('#snake').css('top');
  var lastLeft = $('#snake').css('left');

  var snackTop = $('#snack').position().top;
  var snackLeft = $('#snack').position().left;

  var chunk = $('<div class="chunk">');


  if($($snakeHeadTop !== lastTop)){
    lastTop = $snakeHeadTop;

    if($($snakeHeadLeft !== lastLeft)){
      lastLeft = $snakeHeadLeft;

      if(lastTop === snackTop && lastLeft===snackLeft){
        $('#snack').remove();
        $('#snake').append(chunk);
        placeSnack();
      }

      else if((lastTop <= -1) || (lastTop >= 591)){
        alert("You Lose!");
        disablePlay();
      }
      else if((lastLeft <= -1) || (lastLeft >= 591)){
        alert("You Lose!");
        disablePlay();
      }
    }
  }
}


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



$(document).ready(function(){
  arrowKeys();
  placeSnack();
  renderSnake();
});
