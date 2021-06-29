CREATE TABLE users(
    id serial PRIMARY KEY,
    first_name text,
    last_name text,
    email varchar(200),
    password varchar(2000),
    UNIQUE(email)
);

CREATE TABLE videogames (
    id serial PRIMARY KEY,
    name text,
    slug text,
    description text,
    backgroundImage text,
    metacritic text,
    UNIQUE(slug)
);

CREATE TABLE reviews(
    id serial PRIMARY KEY,
    userID integer REFERENCES users(id),
    gameID integer REFERENCES videogames(id),
    content text
);