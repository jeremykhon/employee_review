class CreateFeedbacks < ActiveRecord::Migration[5.2]
  def change
    create_table :feedbacks do |t|
      t.references :employee, foreign_key: true
      t.references :performance_review, foreign_key: true
      t.datetime :completed_at
      t.integer :rating
      t.text :comment

      t.timestamps
    end
  end
end
