
# Installation #

Assuming a default postgres installation
```
psql -U postgres -h localhost < ./sql/init_db.sql
npm run knex migrate:latest
npm run fixture
psql -U tcs -h localhost -d tcs < ./node_modules/connect-pg-simple/table.sql
# separate console
npm run start-dev-api
npm run start
```

# Login
username: v@v.com
password: "123asd"

to build imagemagick-native
npm
https://github.com/elad/node-imagemagick-native/issues/69
