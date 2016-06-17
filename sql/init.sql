create user tcs with password 'tcs';
create database tcs;
grant all privileges on database tcs to tcs;
drop table tournament;
create table tournament (id serial, name varchar(255), description varchar(2048), notes jsonb);

drop table users;
create table users (id serial, email varchar(255), password varchar(32));
insert into users (email, password) values('v@v.com', '123asd');
