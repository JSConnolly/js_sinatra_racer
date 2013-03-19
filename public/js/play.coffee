hi = ->
  alert "hi"

$ ->
  updatePlayerPosition = (player_num, name, start_time)->
    $player_row = $("#player" + player_num)
    $player_row.find("td.active")
               .removeClass('active')
               .text('')
               .next()
               .addClass('active')
               .text(name)
    checkWinner(start_time)

  checkWinner = (start_time) ->
    if $('.active.winner').length > 0
      end_time = new Date().getTime()
      $(document).unbind('keyup')
      elapsed = end_time - start_time
      console.log(elapsed)
      winner = $('.active.winner').closest(".player-row").data('player-name')
      console.log(winner)
      window.location= "/winner?time=#{elapsed}&winner=#{winner}"

  start_race = ->
    start_time = new Date().getTime()

    $(document).on 'keyup', (event) ->
      key = event.which

      if key == 81 or key == 80
        player_num = if key == 81 then 1 else 2
        player_name = $("#player" + player_num).data("player-name")
        updatePlayerPosition(player_num, player_name, start_time)


  run_countdown = ->
    run = ->
      $counter = $("#counter")
      count = parseInt($counter.text())
      count--

      if count == 0
        $counter.text("Go!")
        start_race()
      else
        $counter.text(count)
        run_countdown()

    setTimeout(run, 1000)

  run_countdown()
