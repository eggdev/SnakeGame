console.log('loaded');

//Grab Canvas from document!


var squares = {};



squares.renderEnemy = function(){
  var enemy = $('<div class="enemy">');

  $('#game-state').append(enemy);
  enemy.animate({
    left: '50%',
    top: '280px',

  }, 2000, function(){
    this.remove();
  });
}







var img = $('.image');
if(img.length > 0){
    var offset = img.offset();
    function mouse(evt){
        var center_x = (offset.left) + (img.width()/2);
        var center_y = (offset.top) + (img.height()/2);
        var mouse_x = evt.pageX; var mouse_y = evt.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 90;
        img.css('-moz-transform', 'rotate('+degree+'deg)');
        img.css('-webkit-transform', 'rotate('+degree+'deg)');
        img.css('-o-transform', 'rotate('+degree+'deg)');
        img.css('-ms-transform', 'rotate('+degree+'deg)');
    }
}






$(document).ready(function(){
  $(document).mousemove(mouse);
  setInterval(squares.renderEnemy(), 1000);

});
