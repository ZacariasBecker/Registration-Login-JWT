CREATE DATABASE reglog

--download extension
create extension if not exists "uuid-ossp";

CREATE TABLE t_user(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
)

-- insert fake users
-- SEMPRE ASPAS SIMPLES NO SQL
INSERT INTO t_user(user_name, user_email, user_password) VALUES ('Angela','angela@email.com','a111')