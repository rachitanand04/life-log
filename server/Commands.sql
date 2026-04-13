-- To create the users table
CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(40) NOT NULL,
password VARCHAR(80) NOT NULL
);

-- To create the logs tabel
CREATE TABLE logs( 
    id SERIAL PRIMARY KEY, 
    email VARCHAR(40) NOT NULL, 
    type VARCHAR(15) NOT NULL, 
    content TEXT, 
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    status TEXT, 
    due_date TIMESTAMP 
);