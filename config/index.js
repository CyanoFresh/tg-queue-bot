module.exports = {
  db: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    operatorsAliases: false
  },
  doneUserAppend: ' ✅',
  buttonsInRow: 3,
};
