create user tcs with password 'tcs';
create database tcs;
grant all privileges on database tcs to tcs;

drop table users;
create table users (id serial PRIMARY KEY, email varchar(255), password varchar(32));
insert into users (email, password) values('v@v.com', '123asd');

drop table competitor CASCADE;
create table competitor(
  id serial PRIMARY KEY,
  "firstName" varchar(255),
  "lastName" varchar(255),
  email varchar(255)
);
insert into competitor("firstName", "lastName", email) values('Venelin', 'Mihaylov', 'venelin@enforcer.bg');

drop table competitor_matches CASCADE;
create table competitor_matches(
  id serial PRIMARY KEY,
  competitor_id INTEGER REFERENCES competitor(id) ON DELETE CASCADE ON UPDATE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE ON UPDATE CASCADE
);

drop table tournament CASCADE;
create table tournament (id serial PRIMARY KEY, name varchar(255), description varchar(2048), notes jsonb);
insert into tournament (name) values('tournament 1');

drop table matches CASCADE;
create table matches (
  id serial PRIMARY KEY,
  name varchar(255),
  description varchar(2048),
  tournament_id integer,
  notes jsonb,
  foreign key (tournament_id) references tournament(id) ON DELETE CASCADE ON UPDATE CASCADE
  );
insert into matches(name, tournament_id, notes) values('match1', 1, '[{"text": "note1"}, {"text": "note2"}]');

