Hey team,

remember to run the following for your knext and sql

npm install knex mysql

if you already have knex installed globally, you can do knext init

if not, npm install knex

please also create a .env file in the root folder with the following content

PORT = 8080
DB_LOCAL_DBNAME = instock_library
DB_LOCAL_USER = <your user name>
DB_LOCAL_PASSWORD = <your pswd>

once you are done, you can enter this to your terminal:

npx knex migrate:latest 
this would create the tables in your database

npx knex seed:run
this would populate the data in your tables in the database