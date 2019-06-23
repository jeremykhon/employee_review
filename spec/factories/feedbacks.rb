FactoryBot.define do
  factory :feedback do
    employee
    performance_review
    comment { Faker::Lorem.paragraph }
    rating { [1..5].sample }
  end
end
