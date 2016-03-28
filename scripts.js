//Move the snake



function renderSnake(){
  var chunk = $('<div class="chunk">');
  var newSnake = $('<div id="snake">').append(chunk);

  $('#game-state').append(newSnake);
}


function moveLeft(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;



    $(newSnake).animate({
      'left': left-=10
    }, 200);

}
function moveUp(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;
    $('#snake').animate({

      'top': top-=10
    }, 200);


}

function moveRight(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;

    $('#snake').animate({

      'left': left+=10
    }, 200);


}

function moveDown(){
  var top = $('#snake').position().top;
  var left = $('#snake').position().left;

  $('#snake').animate({

    'top': top+=10
  }, 200);
}



function arrowKeys(){
  var left = setInterval(function(){moveLeft(),1000});
  var right = setInterval(function(){moveRight(),1000});
  var up = setInterval(function(){moveUp(),1000});
  var down = setInterval(function(){moveDown(),1000});


  // $('#owl').css({
  //   'position':'absolute'
  // })
  $('body').keydown(function(e){
      //If left arrow is pressed
      if(e.keyCode === 37){

        clearInterval(up);
        clearInterval(right);
        clearInterval(down);
        left;

      }
      //If up arrow key is pressed
      else if(e.keyCode === 38){
        // setInterval(function(){moveUp(),1000});
        clearInterval(left);
        clearInterval(right);
        clearInterval(down);
        up;


      }
      //If right arrow is pressed
      else if(e.keyCode === 39){
        // setInterval(function(){moveRight(),1000});
        clearInterval(up);
        clearInterval(left);
        clearInterval(down);
        right;


      }

      //If down arrow is pressed
      else if(e.keyCode === 40){
        // setInterval(function(){moveDown(),1000});
        clearInterval(up);
        clearInterval(left);
        clearInterval(right);
        down;
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


  placeSnack();
  renderSnake();
});
