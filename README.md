# Full Stack Challenge

Design a web application that allows employees to submit feedback toward each other's performance review

#### - [Live demo ](https://360review.jeremyhon.com)

Please login with "admin@hooli.com", pw: "password"

#### - [Challenge Details](https://github.com/Pay-Baymax/FullStackEngineerChallenge)

## Tech Stack

| Tech/lib | Purpose |
|---------------|:------------------:|
| Ruby on Rails | Backend server |
| React | Frontend client |
| Database | PostgreSQL |
| Unit tests | Rspec, Jest/Enzyme (WIP) |

## Assumptions

- Admin is also an employee
- Employees can have multiple performance reviews
- A performance review can have multiple feedbacks done by the same reviewer

## Installation

Clone repo

```
$ git clone git@github.com:jehon11/employee_review.git employee_review
$ cd employee_review
```

Install dependencies
```
$ bundle
```

Create database and seed it
```
$ rails db:create
$ rails db:migrate
$ rails db:seed
```

Install frontend dependencies
```
$ yarn --cwd client
```

Start backend and frontend server
```
$ rake start
```

the backend and frontend server should now be running on localhost:3001 and localhost:3000 respectively

## Run tests

```
$ rspec
```

## Live Demo

Login here (https://employee-reviews.jeremyhon.com) with the admin account below

Please allow for a few seconds for the server on Heroku to awake from sleep

| Username 	| Password 	|
|-----------------	|:--------:	|
| admin@hooli.com 	| password 	|

## Active Functionality

- Login/logout and redirect to correct dashboard (Admin/Employee)
- Protected views for Admin/Employee
- Protected routes for Admin/Employee api requests
- Admin view all employees
- Admin create new employee
- Admin remove employee 
- Admin update employee
- Admin view performance reviews for employee
- Admin create new performance review for employee
- Admin view all feedbacks for each performance review
- Admin create new feedback for a performance review (add reviewer)
- Admin create multiple feedbacks at once (add reviewers)
- Employee view list of feedbacks assigned to them
- Employee update feedback

## Database Design

<p align="left">
  <img width="725" height="400" src="https://res.cloudinary.com/dmzwcfe2e/image/upload/v1561557847/Screen_Shot_2019-06-26_at_23.02.38.png">
</p>
