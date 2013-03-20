(function(window){

function Game (player1, player2, track_length) {
  this.players = [player1, player2];
  this.player_positions = [1, 1];
  this.track_length = track_length;
}

Game.prototype.render = function(player_index) {
  var new_pos = $this.player_positions[player_index];
  var old_pos = new_pos - 1;
  var $row = $("#player"+(player_index+1));
  $row.find("td:nth-child("+old_pos+")")
      .removeClass("active")
      .text("");
  $row.find("td:nth-child("+new_pos+")")
      .addClass("active")
      .text(this.players[player_index]);
};

Game.prototype.on_keyup = function(event){
  var key = event.which;
  // 81 is p, 80 is q
  if (key == 81 || key == 80) {
    var player_index = key == 81 ? 0 : 1;
    $this.player_positions[player_index] += 1;
    $this.checkWinner(player_index);
    $this.render(player_index);
  }
};

Game.prototype.start_race = function(){
  this.start_time = new Date().getTime();
  $this = this;
  $(document).on('keyup', this.on_keyup);
};


Game.prototype.checkWinner = function(player_index) {
  if ($this.player_positions[player_index] >= $this.track_length) {
    var end_time = new Date().getTime();
    $this.end_time = end_time
    $(document).unbind('keyup');
    $this.race_time = end_time - $this.start_time;
    console.log($this);
    console.log($this.end_time);
    $this.winner = $this.players[player_index];
    window.location = ("/winner?time=" + $this.race_time +"&winner="+this.winner);
  }
};


window.Game = Game;

}(window));

