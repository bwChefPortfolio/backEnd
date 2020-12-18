# Backend for Chef Portfoilo App
An app that allows chefs to exhibit, share and show off their signature recipes.

### Tech Stack: NodeJS, Express, Knex, SQLite3, JWT, BcryptJS

hosted at
https://chef-portfolio-backend.herokuapp.com/

#### API

| Method | Endpoint                    | Need Auth? | Description                                             | Notes                                                                                                                  |
| ------ | --------------------------- | ---------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| GET    | /                           | no         | API functional sanity check                             |                                                                                                                        |
| GET    | /home                       | no         | returns a list of all recipes in database               | can include optional recipes search in req.body, eg: .get('/home', {chef_id: 1}) or .get('/home', {meal_type: "dinner"}) |
| POST   | /auth/register              | no         | returns new chef info (see chefs schema below)          |                                                                                                                        |
| POST   | /auth/login                 | no         | returns token                                           |                                                                                                                        |
| GET    | /chefs                      | yes        | returns data for given chef(s) (see chefs schema below) |       can include optional chefs search in req.body, eg: .get('/chefs', {id: 1}) or .get('/chefs', {last_name: "Lagase"})                                                                                                                  |
| GET    | /chefs/:username            | yes        | returns all recipes for chef with given username                     |    |
| POST   | /chefs/:username            | yes        | returns added recipe                                    |                                                                                                                        |
| PUT    | /chefs/:username/:recipe_id | yes        | returns the number of edited records                    |                                                                                                                        |
| DELETE | /chefs/:username/:recipe_id | yes        | returns the number of deleted records                   |                                                                                                                        |

#### Chefs Schema

| field      | data type        | metadata                                            |
| :--------- | :--------------- | :-------------------------------------------------- |
| id         | unsigned integer | primary key, auto-increments, generated by database |
| first_name | string           | required                                            |
| last_name  | string           | required                                            |
| username   | string           | required, unique                                    |
| email      | string           | required, unique                                    |
| password   | string           | required                                            |
| location   | string           | required                                            |

#### Recipes Schema

| field       | data type        | metadata                                            |
| :---------- | :--------------- | :-------------------------------------------------- |
| id          | unsigned integer | primary key, auto-increments, generated by database |
| chef_id     | unsigned integer | foreign key referencing chefs.id, required          |
| title       | string           | required                                            |
| meal_type   | string           | required                                            |
| image_url   | string           | required                                            |
| ingredients | string           | required                                            |
| directions  | string           | required                                            |
