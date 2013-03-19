class CreateGamesplayers < ActiveRecord::Migration
  def change
    create_table :games_players do |t|
      t.integer :player_id
      t.integer :game_id
    end
  end
end
