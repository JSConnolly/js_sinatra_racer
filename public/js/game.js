function updatePlayerPostion(player_num, name, start_time){
  
  var $player_row = $("#player" + player_num);
  $player_row
    // remove "active" state from selected td
    .find("td.active")
    .removeClass('active')
    .text('')
    // add "active" state to the next td
    .next()
    .addClass('active')
    .text(name);
  checkWinner(start_time);
};

function checkWinner(start_time) {
  if ($('.active.winner').length>0) {
    var end_time = new Date().getTime();
    $(document).unbind('keyup');
    var elapsed = end_time - start_time
    $('#reset').show()
    var winner = $('.active.winner').closest(".player-row").data('player-name');
    window.location = ("/winner?time=" + elapsed +"&winner="+winner)
  };
};

function start_race() {
  var start_time = new Date().getTime();

  $(document).on('keyup', function(event) {
    var key = event.which;
    // 81 is p, 80 is q
    if (key == 81 || key == 80) {
      var player_num = key == 81 ? 1 : 2;
      var player_name = $("#player" + player_num).data("player-name");
      updatePlayerPostion(player_num, player_name, start_time);
    }
  });
}

function run_countdown() {
  setTimeout(function () {
    // find the count from the html. count down to 0, then call start_race()
    var $counter = $("#counter");
    count = parseInt($counter.text());
    count--;

    if (count == 0) {
      $counter.text("Go!");
      start_race();
    } else {
      $counter.text(count);
      run_countdown();
    }

  }, 1000);
}

$(function() {
    run_countdown();
});
