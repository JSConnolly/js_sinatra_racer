class AddTimeToGames < ActiveRecord::Migration
  def change
    add_column :games, :winner_time, :time
  end
end
