-- To create the users table
CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(40) NOT NULL,
password VARCHAR(80) NOT NULL
);