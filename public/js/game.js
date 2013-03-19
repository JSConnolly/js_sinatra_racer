function updatePlayerPostion(player_num, position){
  var track = "tr:nth-child("+player_num+")"
  $(track+ " td.active").removeClass('active');
  $(track + ' td:nth-child('+position+')').addClass('active');
};

function checkWinner(start_time) {
  if ($('.active.winner').length>0) {
    end_time = new Date().getTime();
    $(document).unbind('keyup');
    elapsed = end_time - start_time
    $('#reset').show()
    var winner = $('.active.winner').parent().attr('id');
    window.location = ("/winner?time=" + elapsed +"&winner="+winner)
  };
};

$(document).ready(function() {
    var p1_position = 1
    var p2_position = 1

  setTimeout( function(){
    $('.counter').text('2')
  }, 2000);
  setTimeout( function(){
    $('.counter').text('1')
  }, 3000);
  setTimeout( function(){
    $('.counter').text('Go!')
  }, 4000);

  setTimeout( function(){
    start = new Date().getTime();
    $(document).on('keyup', function(event) {
      if (event.which == 81) {
        p1_position += 1
        updatePlayerPostion(1,p1_position);
        checkWinner(start);
      }
      if (event.which == 80) {
        p2_position +=1 
        updatePlayerPostion(2, p2_position);
        checkWinner(start);
      }

    });
  }, 4000);


});
