// const mysql = require('mysql2/promise');


//   const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'Booksell',
//     dateStrings: true
//   });

// module.exports = connection
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'Booksell',
  dateStrings: true
});

module.exports = connection