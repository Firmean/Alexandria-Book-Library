const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project_alexandria'
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!');
  }
});

module.exports = db;