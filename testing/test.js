console.log('hello');

function keyPress(){
  $('body').keydown(function(e){
    var top = $('#snake').position().top;
    var left = $('#snake').position().left;

    var chunk = $('<div class="chunk">');

    //Left Key
    if(e.keyCode === 37){
      $('#snake').css({
        'flex-flow': 'row'
      })

      $('#snake').animate({
        'left': left -=900
      },1000)

    }
    //Up Key
    else if(e.keyCode === 38){
      $('#snake').css({
        'flex-flow': 'column'
      })


      $('#snake').animate({
        'top': top -=500

      },1000)


    }
    //Right Key
    else if(e.keyCode === 39){
      $('#snake').css({
        'flex-flow': 'row-reverse'
      })


      $('#snake').animate({
        'left': left +=900,

      },1000)

    }
    //Down Key
    else if(e.keyCode === 40){
      $('#snake').css({
        'flex-flow': 'column-reverse'
      })

      $('#snake').animate({
        'top': top+=500,
        //// DON"T FORGET ABOUT THIS!

      },1000)
    }
  });
}



$(document).ready(function(){
  keyPress();
});
