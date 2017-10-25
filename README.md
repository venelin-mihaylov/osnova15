# About #
postgres + node/js + react full-stack prototype based on react-boilerplate
## Features ##
 * Backend
  * Generic CRUD REST endpoints for the app db models (CrudRest)
  * docx template generation
 * Frontend
  * Generic UI pattern for CRUD for models, with ability to customize only specific fields
  * Generic UI patterns for handling 1:N N:M entity relations
  * Custom filters for lists
  * Uses redux & sagas for state management

# Installation #

Assuming a default postgres installation
```
psql -U postgres -h localhost < ./sql/init_db.sql
npm run knex migrate:latest
npm run fixture
psql -U tcs -h localhost -d tcs < ./node_modules/connect-pg-simple/table.sql
to build imagemagick-native
https://github.com/elad/node-imagemagick-native/issues/69
npm i imagemagick-native
```

# Run
npm run start-dev-api
npm run start

# Login
username: v@v.com
password: "123asd"
