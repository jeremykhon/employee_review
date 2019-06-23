FactoryBot.define do
  factory :performance_review do
    employee
    final_comment { Faker::Lorem.paragraph }
    final_rating { [1..5].sample }
  end
end
