const mysql = require('mysql');
const db_config = require('./db_config')

const connectDB = mysql.createConnection({
  host: db_config.HOST,
  user: db_config.USER,
  password: db_config.PASSWORD,
  database: db_config.DB
})

connectDB.connect(async (err) => {
  if (err) throw err;
  console.log("MySQL conectado!")

  const sql = "CREATE TABLE IF NOT EXISTS produtos (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, nome_do_produto VARCHAR(255) NOT NULL, fabricante VARCHAR(255) NOT NULL, quantidade_em_estoque int UNSIGNED NOT NULL, valor DECIMAL(10,2) NOT NULL)"

  connectDB.query(sql, function (err, result) {
    if (err) throw err;
  })
})

module.exports = connectDB
