FactoryBot.define do
  factory :performance_review do
    employee
    final_comment { Faker::Lorem.paragraph }
    final_rating { (1..5).to_a.sample }
  end
end
