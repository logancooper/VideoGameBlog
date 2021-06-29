INSERT INTO users
    (first_name, last_name, email, password)
VALUES
    ('Logan', 'Cooper', 'logancooper@bellsouth.net', 'loganpass'),
    ('Reid', 'Folkard', 'reidfolkard@comcast.com', 'reidpass'),
    ('Brandon', 'Couch', 'bcouch@windstream.com', 'brandonpass'),
    ('Athal', 'Gran', 'athal@hotmail.org', 'athalpass'),
    ('Sean', 'Edwards', 'sean@musicdaddy.hot', 'seanpass');

INSERT INTO reviews
    (userID, gameID, content)
VALUES
    (1, 1, 'I have 10,000 hours logged in World of Warcraft. Game''s okay, would not recommend.'),
    (2, 2, 'My friends keep telling me to gank bot lane but these towers keep shooting laser beams at me. Fun game 10/10.'),
    (3, 1, 'I just won my 3rd BOE epic in a normal dungeon last week and now I have over 15k gold. This game is easy.'),
    (4, 3, 'I like Rust because the only objective is to attack other people and ruin their stuff.'),
    (5, 4, 'After playing Pigs With Lasers I quit my job and left my life behind to seek true enlightenment. 11/10 good game.');