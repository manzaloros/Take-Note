const { Pool } = require('pg');

const pool = new Pool();

const getHighScores = async () => {
  let result;
  const createTable = `CREATE TABLE IF NOT EXISTS highscores
                      (user_id SERIAL PRIMARY KEY,
                      name VARCHAR (50) NOT NULL,
                      highscore INT NOT NULL)`;
  try {
    await pool.query(createTable);
    const statement = 'SELECT * from highscores';
    result = await pool.query(statement);
    return result.rows;
  } catch (error) {
    return console.log(error.stack);
  }
};

const postHighScore = async (name, highscore) => {
  let result;
  try {
    const statement = `INSERT INTO highscores(name, highscore)
                      VALUES($1, $2)
                      RETURNING *`;
    result = await pool.query(statement, [name, highscore]);
    return result.rows;
  } catch (error) {
    return console.log(error.stack);
  }
};

module.exports = {
  getHighScores, postHighScore,
};
