$(document).ready(function(){
  // $.getScript('/js/player.js').fail(function(){
  //   console.log('player script not loaded');
  // });
  // $.getScript('/js/game.js').fail( function(){
  //   console.log('game script not loaded');
  // });

  // var player1 = new Player("jim");
  // var player2 = new Player("anne");
  var player1 = $('table tr:nth-child(1)').data('player-name');
  var player2 = $('table tr:nth-child(2)').data('player-name');

  console.log(typeof(player2));
  console.log(player1);

  
game = new Game(player1, player2, 25);

function run_countdown(game) {
  setTimeout(function () {
    // find the count from the html. count down to 0, then call start_race()
    var $counter = $("#counter");
    count = parseInt($counter.text(), 10);
    count--;

    if (count === 0) {
      $counter.text("Go!");
      game.start_race();
    } else {
      $counter.text(count);
      run_countdown(game);
    }

  }, 1000);
}



run_countdown(new Game(player1, player2, 25));


});