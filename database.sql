CREATE DATABASE mydb

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    created_date VARCHAR(255),
    updated_date VARCHAR(255)
);