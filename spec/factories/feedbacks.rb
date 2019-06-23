FactoryBot.define do
  factory :feedback do
    employee
    performance_review
    comment { Faker::Lorem.paragraph }
    rating { (1..5).to_a.sample }
  end
end
