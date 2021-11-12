// imports sequelize constructor and dotenv for local environmental variables
const Sequelize = require('sequelize');
require('dotenv').config();

// creates connection to database
let sequelize;

// connection will use JawsDB if deployed on Heroku
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;