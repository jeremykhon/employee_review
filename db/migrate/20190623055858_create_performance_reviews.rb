class CreatePerformanceReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :performance_reviews do |t|
      t.references :employee, foreign_key: true
      t.string :title
      t.text :final_comment
      t.integer :final_rating

      t.timestamps
    end
  end
end
