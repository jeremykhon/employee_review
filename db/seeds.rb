# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Feedback.destroy_all
PerformanceReview.destroy_all
Employee.destroy_all

Employee.create!(first_name: "Gavin", last_name: "Belson", email: "admin@hooli.com", password: "password", is_admin: true)
Employee.create!(first_name: "Richard", last_name: "Hendricks", email: "richard_hendricks@hooli.com", password: "password")
Employee.create!(first_name: "Bertram", last_name: "Gilfoyle", email: "bertram_gilfoyle@hooli.com", password: "password")
Employee.create!(first_name: "Erlich", last_name: "Bachman", email: "erlich_bachman@hooli.com", password: "password")
Employee.create!(first_name: "Jared", last_name: "Dunn", email: "jared_dunn@hooli.com", password: "password")
Employee.create!(first_name: "Jian", last_name: "Yang", email: "jian_yang@hooli.com", password: "password")
Employee.create!(first_name: "Dinesh", last_name: "Chugtai", email: "dinesh_chugtai@hooli.com", password: "password")

puts "#### employees created ####"