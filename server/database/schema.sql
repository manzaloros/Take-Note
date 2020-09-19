DROP DATABASE IF EXISTS mvp;

CREATE DATABASE mvp;

\c mvp;

CREATE TABLE IF NOT EXISTS highscores
  (user_id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  highscore INT NOT NULL
);

INSERT INTO highscores(name, highscore)
  VALUES('willie dustice', 2);