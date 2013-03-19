class ChangeDataTypeForWinnerTime < ActiveRecord::Migration
  def change

    change_table :games do |t|
      t.change :winner_time, :integer
    end
  end
  
end
