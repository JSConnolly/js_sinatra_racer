get '/' do
  
  erb :index
end


post '/game' do 
  player_1 = Player.find_or_create_by_name(params[:player1].upcase)
  player_2 = Player.find_or_create_by_name(params[:player2].upcase)
  @game = Game.create
  session[:current_game] = @game
  @game.players << player_1 << player_2; @game.save
  redirect ("/game/#{@game.id}")
end

get '/game/:game_id' do
  @keys = ["q", "p"]
  @game = Game.find(params[:game_id])
  @players = @game.players
  erb :game
end

get '/winner' do
  game = session[:current_game]
  @winner_time = params[:time] 
  game.winner_time = @winner_time.to_i
  game.save
  @winner = Player.find_by_name(params[:winner])
  game.winner = @winner.id
  game.save
  erb :winner
end
