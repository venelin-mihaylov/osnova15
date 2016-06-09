create user tcs with password 'tcs';
create database tcs;
grant all privileges on database tcs to tcs;
create table tournament (id serial, name varchar(255), notes jsonb);
insert into tournament (name) values("test");
