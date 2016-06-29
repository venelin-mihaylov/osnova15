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
insert into competitor("firstName", "lastName", email) values('Ivelin', 'Dobrev', 'ivelin@enforcer.bg');
insert into competitor("firstName", "lastName", email) values('Georgi', 'Ivanov', 'georgi@enforcer.bg');

drop table tournament CASCADE;
create table tournament (id serial PRIMARY KEY, name varchar(255), description varchar(2048), notes jsonb);
insert into tournament (name) values('tournament 1');

drop table matches CASCADE;
create table matches (
  id serial PRIMARY KEY,
  name varchar(255),
  description varchar(2048),
  "tournamentId" integer references tournament(id) ON DELETE CASCADE ON UPDATE CASCADE,
  notes jsonb
  );
insert into matches(name, "tournamentId", notes) values('match1', 1, '[{"text": "note1"}, {"text": "note2"}]');
insert into matches(name, "tournamentId", notes) values('match2', 1, '[{"text": "note1"}, {"text": "note2"}]');

drop table competitor_match CASCADE;
create table competitor_match(
  id serial PRIMARY KEY,
  "competitorId" INTEGER REFERENCES competitor(id) ON DELETE CASCADE ON UPDATE CASCADE,
  "matchId" INTEGER REFERENCES matches(id) ON DELETE CASCADE ON UPDATE CASCADE,
  "disqualified" BOOLEAN DEFAULT FALSE
);
insert into competitor_match ("competitorId", "matchId") values(1,1);
insert into competitor_match ("competitorId", "matchId") values(2,1);
