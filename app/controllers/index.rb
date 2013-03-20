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

post '/game/results' do
  content_type :json
  game = session[:current_game]
  player = Player.find_by_name(params[:winner_name])
  time = params[:time]
  game.winner = player.id; game.winner_time = time; game.save
  status 200
  "{'success': true}"
end

get '/game/:game_id' do
  @keys = ["q", "p"]
  @game = Game.find(params[:game_id])
  @players = @game.players
  erb :game
end

get '/winner' do
  
  @game = session[:current_game]
  puts "game: #{@game}"
  puts "player id: #{@game.winner}"
  puts "*"*100
  @winner = Player.find(@game.winner)
  @winner_time = @game.winner_time
  erb :winner
end


get 'player/:id' do 
  @player = params[:id]
  erb :"player_stats"
end
