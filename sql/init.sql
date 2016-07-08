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
insert into tournament (name) values('tournament 2');
insert into tournament (name) values('tournament 3');

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

drop table match_competitor CASCADE;
create table match_competitor(
  id serial PRIMARY KEY,
  "competitorId" INTEGER REFERENCES competitor(id) ON DELETE CASCADE ON UPDATE CASCADE,
  "matchId" INTEGER REFERENCES matches(id) ON DELETE CASCADE ON UPDATE CASCADE,
  "disqualified" BOOLEAN DEFAULT FALSE,
  "notes" varchar(255)
);
insert into match_competitor ("competitorId", "matchId", "disqualified") values(1,1, true);
insert into match_competitor ("competitorId", "matchId", "disqualified") values(2,1, false);
insert into match_competitor ("competitorId", "matchId", "disqualified") values(1,2, false);
insert into match_competitor ("competitorId", "matchId", "disqualified") values(2,2, false);


drop table exercise CASCADE;
create table exercise (
id serial PRIMARY KEY,
name varchar(255),
notes varchar(255)
);
insert into exercise (name, notes) values('exercise 1', 'notes 1');
insert into exercise (name, notes) values('exercise 2', 'notes 2');
insert into exercise (name, notes) values('exercise 3', 'notes 3');

drop table match_exercise CASCADE;
create table match_exercise(
id serial PRIMARY KEY,
"exerciseId" INTEGER REFERENCES exercise(id) ON DELETE CASCADE ON UPDATE CASCADE,
"matchId" INTEGER REFERENCES matches(id) ON DELETE CASCADE ON UPDATE CASCADE,
"notes" varchar(255)
);
insert into match_exercise ("exerciseId", "matchId") values (1,1);
insert into match_exercise ("exerciseId", "matchId") values (2,1);
insert into match_exercise ("exerciseId", "matchId") values (3,2);
